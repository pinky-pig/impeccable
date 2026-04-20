/**
 * Generate static HTML files for /skills, /anti-patterns, /tutorials.
 *
 * Called from both scripts/build.js (before buildStaticSite) and
 * server/index.js (at module load), so dev and prod share the same
 * code path and output shape.
 *
 * Output lives under public/skills/, public/anti-patterns/,
 * public/tutorials/, all gitignored. Bun's HTML loader picks them up
 * the same way it picks up the hand-authored pages.
 */

import fs from 'node:fs';
import path from 'node:path';
import {
  buildSubPageData,
  CATEGORY_ORDER,
  CATEGORY_LABELS,
  CATEGORY_DESCRIPTIONS,
  LAYER_LABELS,
  LAYER_DESCRIPTIONS,
  GALLERY_ITEMS,
} from './lib/sub-pages-data.js';
import { renderMarkdown, slugify } from './lib/render-markdown.js';
import { renderPage } from './lib/render-page.js';

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const RULE_SECTION_LABELS = {
  'Visual Details': '视觉细节',
  Typography: '排版',
  'Color & Contrast': '色彩与对比',
  'Layout & Space': '布局与空间',
  Motion: '动效',
  Interaction: '交互',
  Responsive: '响应式',
  'General quality': '通用质量',
};

function getRuleSectionLabel(section) {
  return RULE_SECTION_LABELS[section] || section;
}

/**
 * Render the before/after split-compare demo block for a skill.
 * Returns '' when the skill has no demo data (e.g. /shape).
 */
function renderSkillDemo(skill) {
  if (!skill.demo) return '';
  const { before, after, caption } = skill.demo;
  return `
<section class="skill-demo" aria-label="改前改后对比示例">
  <div class="split-comparison" data-demo="skill-${skill.id}">
    <p class="skill-demo-eyebrow">拖动或悬停查看对比</p>
    <div class="split-container">
      <div class="split-before">
        <div class="split-content">${before}</div>
      </div>
      <div class="split-after">
        <div class="split-content">${after || before}</div>
      </div>
      <div class="split-divider"></div>
    </div>
    <div class="split-labels">
      <span class="split-label-item" data-point="before">改前</span>
      ${caption ? `<p class="skill-demo-caption">${escapeHtml(caption)}</p>` : '<span></span>'}
      <span class="split-label-item" data-point="after">改后</span>
    </div>
  </div>
</section>`;
}

/**
 * Render one skill detail page HTML body (without the site shell).
 */
function renderSkillDetail(skill, knownSkillIds) {
  const bodyHtml = renderMarkdown(skill.body, {
    knownSkillIds,
    currentSkillId: skill.id,
  });

  const editorialHtml = skill.editorial
    ? renderMarkdown(skill.editorial.body, { knownSkillIds, currentSkillId: skill.id })
    : '';

  const demoHtml = renderSkillDemo(skill);

  const tagline = skill.editorial?.frontmatter?.tagline || skill.description;
  const categoryLabel = CATEGORY_LABELS[skill.category] || skill.category;

  // Reference files as collapsible <details> blocks
  let referencesHtml = '';
  if (skill.references && skill.references.length > 0) {
    const refs = skill.references
      .map((ref) => {
        const slug = slugify(ref.name);
        const refBody = renderMarkdown(ref.content, {
          knownSkillIds,
          currentSkillId: skill.id,
        });
        const title = ref.name
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
        return `
<details class="skill-reference" id="reference-${slug}">
  <summary><span class="skill-reference-label">参考</span><span class="skill-reference-title">${escapeHtml(title)}</span></summary>
  <div class="prose skill-reference-body">
${refBody}
  </div>
</details>`;
      })
      .join('\n');
    referencesHtml = `
<section class="skill-references" aria-label="参考资料">
  <h2 class="skill-references-heading">延伸参考</h2>
  ${refs}
</section>`;
  }

  const metaStrip = `
<div class="skill-meta-strip">
  <span class="skill-meta-chip skill-meta-category" data-category="${skill.category}">${escapeHtml(categoryLabel)}</span>
  <span class="skill-meta-chip">可直接调用</span>
  ${skill.argumentHint ? `<span class="skill-meta-chip skill-meta-args">${escapeHtml(skill.argumentHint)}</span>` : ''}
</div>`;

  const hasDemo = demoHtml.trim().length > 0;

  return `
<article class="skill-detail">
  <div class="skill-detail-hero${hasDemo ? ' skill-detail-hero--has-demo' : ''}">
    <header class="skill-detail-header">
      <p class="skill-detail-eyebrow"><a href="/skills">技能</a> / ${escapeHtml(categoryLabel)}</p>
      <h1 class="skill-detail-title"><span class="skill-detail-title-slash">/</span>${escapeHtml(skill.id)}</h1>
      <p class="skill-detail-tagline">${escapeHtml(tagline)}</p>
      ${metaStrip}
    </header>
    ${demoHtml}
  </div>

  ${editorialHtml ? `<section class="skill-detail-editorial prose">\n${editorialHtml}\n</section>` : ''}

  <section class="skill-source-card">
    <header class="skill-source-card-header">
      <span class="skill-source-card-label">SKILL.md</span>
      <span class="skill-source-card-subtitle">这里展示的是 AI harness 实际会读取的原始技能定义。</span>
    </header>
    <div class="skill-source-card-body prose">
${bodyHtml}
    </div>
  </section>

  ${referencesHtml}
</article>
`;
}

/**
 * Render the unified Docs sidebar used across /skills and /tutorials.
 * Shows every skill grouped by category, then tutorials as a final
 * group. Pass the current page identifier so we can mark it:
 *
 *   { kind: 'skill', id: 'polish' }
 *   { kind: 'tutorial', slug: 'getting-started' }
 *   null (no current page)
 */
function renderDocsSidebar(skillsByCategory, tutorials, current = null) {
  // Label the toggle button with the current page so mobile users know
  // where they are at a glance, then open the menu to switch.
  let currentLabel = '文档菜单';
  if (current?.kind === 'skill') {
    currentLabel = `/${current.id}`;
  } else if (current?.kind === 'tutorial') {
    const t = tutorials.find((x) => x.slug === current.slug);
    if (t) currentLabel = t.title;
  }

  let html = `
<aside class="skills-sidebar" aria-label="文档导航">
  <button class="skills-sidebar-toggle" type="button" aria-expanded="false" aria-controls="skills-sidebar-inner">
    <span class="skills-sidebar-toggle-label">${escapeHtml(currentLabel)}</span>
    <svg class="skills-sidebar-toggle-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
  </button>
  <div class="skills-sidebar-inner" id="skills-sidebar-inner">
    <p class="skills-sidebar-label">文档</p>
`;

  // Tutorials first: walk-throughs are the on-ramp, they go at the top.
  if (tutorials && tutorials.length > 0) {
    html += `
    <div class="skills-sidebar-group" data-category="tutorials">
      <p class="skills-sidebar-group-title">教程</p>
      <ul class="skills-sidebar-list">
${tutorials
  .map((t) => {
    const isCurrent = current?.kind === 'tutorial' && current.slug === t.slug;
    const attr = isCurrent ? ' aria-current="page"' : '';
    return `        <li><a href="/tutorials/${t.slug}"${attr}>${escapeHtml(t.title)}</a></li>`;
  })
  .join('\n')}
      </ul>
    </div>
    <hr class="skills-sidebar-divider">
`;
  }

  // Sub-command links that appear as indented entries after their parent skill.
  const SUB_COMMANDS = {
    impeccable: [
      { id: 'impeccable-craft', label: '/impeccable craft', href: '/skills/impeccable#craft' },
      { id: 'impeccable-teach', label: '/impeccable teach', href: '/skills/impeccable#teach' },
      { id: 'impeccable-extract', label: '/impeccable extract', href: '/skills/impeccable#extract' },
    ],
  };

  // Then the skills, grouped by category.
  for (const category of CATEGORY_ORDER) {
    const list = skillsByCategory[category] || [];
    if (list.length === 0) continue;
    html += `
    <div class="skills-sidebar-group" data-category="${category}">
      <p class="skills-sidebar-group-title">${escapeHtml(CATEGORY_LABELS[category])}</p>
      <ul class="skills-sidebar-list">
${list
  .flatMap((s) => {
    const isCurrent = current?.kind === 'skill' && current.id === s.id;
    const attr = isCurrent ? ' aria-current="page"' : '';
    const items = [`        <li><a href="/skills/${s.id}"${attr}>/${escapeHtml(s.id)}</a></li>`];
    const subs = SUB_COMMANDS[s.id];
    if (subs) {
      for (const sub of subs) {
        items.push(`        <li class="skills-sidebar-sub"><a href="${sub.href}">${escapeHtml(sub.label)}</a></li>`);
      }
    }
    return items;
  })
  .join('\n')}
      </ul>
    </div>
`;
  }

  html += `
  </div>
</aside>`;
  return html;
}

/**
 * Render the /skills overview main column content (not the sidebar).
 * This is the orientation piece: what skills are, how to pick one,
 * the six categories explained with inline cross-links to detail pages.
 */
function renderSkillsOverviewMain(skillsByCategory) {
  const totalSkills = Object.values(skillsByCategory).reduce(
    (sum, list) => sum + list.length,
    0,
  );

  let categoriesHtml = '';
  for (const category of CATEGORY_ORDER) {
    const list = skillsByCategory[category] || [];
    if (list.length === 0) continue;

    const skillChips = list
      .map(
        (s) =>
          `<a class="skills-overview-chip" href="/skills/${s.id}">/${escapeHtml(s.id)}</a>`,
      )
      .join('');

    categoriesHtml += `
    <section class="skills-overview-category" data-category="${category}" id="category-${category}">
      <div class="skills-overview-category-meta">
        <h2 class="skills-overview-category-title">${escapeHtml(CATEGORY_LABELS[category])}</h2>
        <p class="skills-overview-category-count">${list.length} 个技能</p>
      </div>
      <p class="skills-overview-category-desc">${escapeHtml(CATEGORY_DESCRIPTIONS[category])}</p>
      <div class="skills-overview-chips">
${skillChips}
      </div>
    </section>
`;
  }

  return `
<div class="skills-overview-content">
  <header class="skills-overview-header">
    <p class="sub-page-eyebrow">${totalSkills} 个命令</p>
    <h1 class="sub-page-title">技能</h1>
    <p class="sub-page-lede">一个 <a href="/skills/impeccable">/impeccable</a> 技能，负责把设计判断交给你的 AI；十八个命令，则分别把这套判断落实到具体动作上。每个命令只做一件事，而且都带着明确的审美立场。</p>
  </header>

  <section class="skills-overview-howto">
    <h2 class="skills-overview-howto-title">怎么选一个</h2>
    <p>技能名基本就对应你当下的意图。想做评审，就用 <a href="/skills/critique">/critique</a> 或 <a href="/skills/audit">/audit</a>；想修排版，就用 <a href="/skills/typeset">/typeset</a>；准备上线前做最后一轮收尾，就用 <a href="/skills/polish">/polish</a>。下面这些分类，按“这次要解决什么问题”来帮你挑选。</p>
  </section>

  <div class="skills-overview-categories">
${categoriesHtml}
  </div>
</div>`;
}

/**
 * Wrap sidebar + main content in the docs-browser layout shell.
 */
function wrapInDocsLayout(sidebarHtml, mainHtml) {
  return `
<div class="skills-layout">
  ${sidebarHtml}
  <div class="skills-main">
${mainHtml}
  </div>
</div>`;
}

/**
 * Group anti-pattern rules by skill section.
 * Rules without a skillSection fall into a 'General quality' bucket.
 */
function groupRulesBySection(rules) {
  // Canonical ordering. Additional sections referenced by rules (e.g.
  // 'Interaction', 'Responsive' from LLM-only entries) are appended to
  // the end, before 'General quality', so every rule renders.
  const primaryOrder = [
    'Visual Details',
    'Typography',
    'Color & Contrast',
    'Layout & Space',
    'Motion',
    'Interaction',
    'Responsive',
  ];
  const bySection = {};
  for (const name of primaryOrder) bySection[name] = [];
  bySection['General quality'] = [];

  for (const rule of rules) {
    const section = rule.skillSection || 'General quality';
    if (!bySection[section]) bySection[section] = [];
    bySection[section].push(rule);
  }

  // Sort each bucket: slop first (they're the named tells), then quality.
  for (const name of Object.keys(bySection)) {
    bySection[name].sort((a, b) => {
      if (a.category !== b.category) return a.category === 'slop' ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
  }

  // Final render order: primary sections first, then any extras that
  // rules introduced, then General quality last.
  const order = [...primaryOrder];
  for (const name of Object.keys(bySection)) {
    if (!order.includes(name) && name !== 'General quality') {
      order.push(name);
    }
  }
  order.push('General quality');

  return { order, bySection };
}

/**
 * Render the anti-patterns sidebar: a table of contents of rule sections
 * with per-section rule counts. Every entry anchor-jumps to the section
 * in the main column.
 */
function renderAntiPatternsSidebar(grouped) {
  const entries = grouped.order
    .filter((section) => grouped.bySection[section]?.length > 0)
    .map((section) => {
      const slug = slugify(section);
      const count = grouped.bySection[section].length;
      return `        <li><a href="#section-${slug}"><span>${escapeHtml(getRuleSectionLabel(section))}</span><span class="anti-patterns-sidebar-count">${count}</span></a></li>`;
    })
    .join('\n');

  return `
<aside class="skills-sidebar anti-patterns-sidebar" aria-label="反模式章节">
  <button class="skills-sidebar-toggle" type="button" aria-expanded="false" aria-controls="anti-patterns-sidebar-inner">
    <span class="skills-sidebar-toggle-label">章节</span>
    <svg class="skills-sidebar-toggle-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
  </button>
  <div class="skills-sidebar-inner" id="anti-patterns-sidebar-inner">
    <p class="skills-sidebar-label">章节</p>
    <div class="skills-sidebar-group">
      <ul class="skills-sidebar-list anti-patterns-sidebar-list">
${entries}
      </ul>
    </div>
  </div>
</aside>`;
}

/**
 * Render one rule card inside the anti-patterns main column.
 */
function renderRuleCard(rule) {
  const categoryLabel = rule.category === 'slop' ? 'AI slop' : '质量';
  const layer = rule.layer || 'cli';
  const layerLabel = LAYER_LABELS[layer] || layer;
  const layerTitle = LAYER_DESCRIPTIONS[layer] || '';
  const skillLink = rule.skillSection
    ? `<a class="rule-card-skill-link" href="/skills/impeccable#${slugify(rule.skillSection)}">去 /impeccable 看对应原则</a>`
    : '';
  const visual = rule.visual
    ? `<div class="rule-card-visual" aria-hidden="true"><div class="rule-card-visual-inner">${rule.visual}</div></div>`
    : '';
  return `
    <article class="rule-card" id="rule-${rule.id}" data-layer="${layer}">
      ${visual}
      <div class="rule-card-body">
        <div class="rule-card-head">
          <span class="rule-card-category" data-category="${rule.category}">${categoryLabel}</span>
          <span class="rule-card-layer" data-layer="${layer}" title="${escapeAttr(layerTitle)}">${escapeHtml(layerLabel)}</span>
        </div>
        <h3 class="rule-card-name">${escapeHtml(rule.name)}</h3>
        <p class="rule-card-desc">${escapeHtml(rule.description)}</p>
        ${skillLink}
      </div>
    </article>`;
}

function escapeAttr(str) {
  return String(str || '').replace(/"/g, '&quot;');
}

/**
 * Render the /tutorials index main content.
 */
function renderTutorialsIndexMain(tutorials) {
  const cards = tutorials
    .map(
      (t) => `
    <a class="tutorial-card" href="/tutorials/${t.slug}">
      <span class="tutorial-card-number">${String(t.order).padStart(2, '0')}</span>
      <div class="tutorial-card-body">
        <h2 class="tutorial-card-title">${escapeHtml(t.title)}</h2>
        <p class="tutorial-card-tagline">${escapeHtml(t.tagline || t.description)}</p>
      </div>
      <span class="tutorial-card-arrow">→</span>
    </a>`,
    )
    .join('\n');

  return `
<div class="tutorials-content">
  <header class="sub-page-header">
    <p class="sub-page-eyebrow">${tutorials.length} 篇教程</p>
    <h1 class="sub-page-title">教程</h1>
    <p class="sub-page-lede">这些简短但有立场的教程，覆盖了 Impeccable 里最值得优先掌握的高杠杆工作流。通常十分钟左右就能走完一遍，并在你的项目里拿到一个真正可用的结果。</p>
  </header>

  <div class="tutorial-cards">
${cards}
  </div>
</div>`;
}

/**
 * Render the /visual-mode page main content.
 *
 * Single-column layout, no sidebar. Editorial header, live iframe embed
 * of the detector running on a synthetic slop page, three-card section
 * explaining the invocation methods, then a grid of real specimens the
 * user can click into to see the overlay on a different page.
 */
function renderVisualModeMain() {
  const specimenCards = GALLERY_ITEMS.map(
    (item) => `
      <a class="gallery-card" href="/antipattern-examples/${item.id}.html">
        <div class="gallery-card-thumb">
          <img src="../antipattern-images/${item.id}.png" alt="${escapeAttr(item.title)} 示例" loading="lazy" width="540" height="540">
        </div>
        <div class="gallery-card-body">
          <h3 class="gallery-card-title">${escapeHtml(item.title)}</h3>
          <p class="gallery-card-desc">${escapeHtml(item.desc)}</p>
        </div>
      </a>`,
  ).join('\n');

  return `
<div class="visual-mode-page">
  <header class="visual-mode-page-header">
    <p class="sub-page-eyebrow">实时检测覆盖层</p>
    <h1 class="sub-page-title">可视模式</h1>
    <p class="sub-page-lede">把每条反模式直接标在页面上看。你不需要再对着截图或 JSON 倒推具体位置；检测器会给命中的元素画出描边和标签，让你在原位就能判断、修改、复查。</p>
  </header>

  <section class="visual-mode-demo-wrap" aria-label="可视模式演示">
    <div class="visual-mode-preview">
      <div class="visual-mode-preview-header">
        <span class="visual-mode-preview-dot red"></span>
        <span class="visual-mode-preview-dot yellow"></span>
        <span class="visual-mode-preview-dot green"></span>
        <span class="visual-mode-preview-title">合成示例页上的实时覆盖层</span>
      </div>
      <iframe src="/antipattern-examples/visual-mode-demo.html" class="visual-mode-frame" loading="lazy" title="Impeccable 覆盖层演示"></iframe>
    </div>
    <p class="visual-mode-demo-caption">悬停或点按任意被框出的元素，就能看到具体触发了哪条规则。</p>
  </section>

  <section class="visual-mode-methods" aria-label="可视模式的使用方式">
    <h2 class="visual-mode-methods-title">三种运行方式</h2>
    <div class="visual-mode-methods-grid">
      <article class="visual-mode-method">
        <p class="visual-mode-method-label">集成在 /critique 里</p>
        <h3 class="visual-mode-method-name"><a href="/skills/critique">/critique</a></h3>
        <p class="visual-mode-method-desc">设计评审技能在浏览器检查阶段会自动打开覆盖层。你会一边看到确定性检测结果被直接标在页面上，一边让 LLM 独立完成它的启发式评审。</p>
      </article>
      <article class="visual-mode-method">
        <p class="visual-mode-method-label">独立 CLI</p>
        <h3 class="visual-mode-method-name"><code>npx impeccable live</code></h3>
        <p class="visual-mode-method-desc">它会启动一个本地服务来提供检测脚本。把脚本通过 <code>&lt;script&gt;</code> 注入任意页面后，你就能看到覆盖层。无论是自己的开发环境、预发地址，还是线上页面，都能用。</p>
      </article>
      <article class="visual-mode-method">
        <p class="visual-mode-method-label">最省事</p>
        <h3 class="visual-mode-method-name">Chrome 扩展</h3>
        <p class="visual-mode-method-desc">任意标签页一键开启。<a href="https://chromewebstore.google.com/detail/impeccable/bdkgmiklpdmaojlpflclinlofgjfpabf" target="_blank" rel="noopener">前往 Chrome Web Store 安装 &rarr;</a></p>
      </article>
    </div>
  </section>

  <section class="visual-mode-gallery" id="try-it-live" aria-label="在合成示例页上体验">
    <header class="visual-mode-gallery-header">
      <h2 class="visual-mode-gallery-title">直接上手试</h2>
      <p class="visual-mode-gallery-lede">这 ${GALLERY_ITEMS.length} 个合成示例页都已经内置检测脚本。点开任意一个，就能在真实页面结构上看到覆盖层运行，再滚动、悬停，看看哪些元素被框出来。</p>
    </header>
    <div class="gallery-grid">
${specimenCards}
    </div>
  </section>
</div>`;
}

/**
 * Render a tutorial detail page main content.
 */
function renderTutorialDetail(tutorial, knownSkillIds) {
  const bodyHtml = renderMarkdown(tutorial.body, { knownSkillIds });
  return `
<article class="tutorial-detail">
  <header class="tutorial-detail-header">
    <p class="skill-detail-eyebrow"><a href="/tutorials">教程</a> / ${String(tutorial.order).padStart(2, '0')}</p>
    <h1 class="tutorial-detail-title">${escapeHtml(tutorial.title)}</h1>
    ${tutorial.tagline ? `<p class="tutorial-detail-tagline">${escapeHtml(tutorial.tagline)}</p>` : ''}
  </header>

  <section class="tutorial-detail-body prose">
${bodyHtml}
  </section>
</article>`;
}

/**
 * Render the /anti-patterns main column content.
 */
function renderAntiPatternsMain(grouped, totalRules) {
  let sectionsHtml = '';
  for (const section of grouped.order) {
    const rules = grouped.bySection[section] || [];
    if (rules.length === 0) continue;
    const slug = slugify(section);
    sectionsHtml += `
    <section class="anti-patterns-section" id="section-${slug}">
      <header class="anti-patterns-section-header">
        <h2 class="anti-patterns-section-title">${escapeHtml(getRuleSectionLabel(section))}</h2>
        <p class="anti-patterns-section-count">${rules.length} 条规则</p>
      </header>
      <div class="rule-card-grid">
${rules.map(renderRuleCard).join('\n')}
      </div>
    </section>`;
  }

  const detectedCount = grouped.order
    .flatMap((s) => grouped.bySection[s] || [])
    .filter((r) => r.layer !== 'llm').length;
  const llmCount = totalRules - detectedCount;

  return `
<div class="anti-patterns-content">
  <header class="anti-patterns-header">
    <p class="sub-page-eyebrow">${totalRules} 条规则</p>
    <h1 class="sub-page-title">反模式</h1>
    <p class="sub-page-lede">这里收录了 <a href="/skills/impeccable">/impeccable</a> 会明确反对的完整模式清单。其中 ${detectedCount} 条能被确定性检测器直接抓到，可通过 <code>npx impeccable detect</code> 或浏览器扩展运行；另外 ${llmCount} 条只能在 <a href="/skills/critique">/critique</a> 的 LLM 设计评审阶段识别。想看它们直接叠加在真实页面上的效果，可以去试试 <a href="/visual-mode">可视模式</a>。</p>
  </header>

  <details class="anti-patterns-legend">
    <summary class="anti-patterns-legend-summary">
      <span class="anti-patterns-legend-title">怎么看这页</span>
      <svg class="anti-patterns-legend-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
    </summary>
    <div class="anti-patterns-legend-body">
      <p><strong>AI slop</strong> 规则会指出 AI 生成界面最容易露馅的外显痕迹；<strong>质量</strong> 规则则覆盖那些并非 AI 专属、但同样会伤害设计质量的常见错误。每条规则还会标出它是怎么被发现的：</p>
      <dl class="anti-patterns-legend-layers">
        <div><dt><span class="rule-card-layer" data-layer="cli">CLI</span></dt><dd>确定性检测。直接用 <code>npx impeccable detect</code> 扫文件即可，不需要浏览器。</dd></div>
        <div><dt><span class="rule-card-layer" data-layer="browser">浏览器</span></dt><dd>同样是确定性检测，但必须依赖真实浏览器布局。通常通过浏览器扩展或 Puppeteer 运行，而不是纯 CLI。</dd></div>
        <div><dt><span class="rule-card-layer" data-layer="llm">仅 LLM</span></dt><dd>没有确定性检测器可抓，只能在 <a href="/skills/critique">/critique</a> 的 LLM 设计评审阶段发现。</dd></div>
      </dl>
    </div>
  </details>

  <div class="anti-patterns-sections">
${sectionsHtml}
  </div>
</div>`;
}

/**
 * Entry point. Generates all sub-page HTML files.
 *
 * @param {string} rootDir
 * @returns {Promise<{ files: string[] }>} list of generated file paths (absolute)
 */
export async function generateSubPages(rootDir) {
  const data = await buildSubPageData(rootDir);
  const outDirs = {
    skills: path.join(rootDir, 'public/skills'),
    antiPatterns: path.join(rootDir, 'public/anti-patterns'),
    tutorials: path.join(rootDir, 'public/tutorials'),
    visualMode: path.join(rootDir, 'public/visual-mode'),
  };

  // Fresh output dirs each time so stale files don't linger.
  for (const dir of Object.values(outDirs)) {
    if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
  }

  const generated = [];

  // Skills index: docs-browser layout with unified sidebar.
  {
    const sidebar = renderDocsSidebar(data.skillsByCategory, data.tutorials, null);
    const main = renderSkillsOverviewMain(data.skillsByCategory);
    const html = renderPage({
      title: '技能 | Impeccable',
      description:
        '18 个命令，帮助你的 AI 学会如何做设计。可按创建、评估、打磨、简化、补强来浏览。',
      bodyHtml: wrapInDocsLayout(sidebar, main),
      activeNav: 'docs',
      canonicalPath: '/skills',
      bodyClass: 'sub-page skills-layout-page',
    });
    const out = path.join(outDirs.skills, 'index.html');
    fs.writeFileSync(out, html, 'utf-8');
    generated.push(out);
  }

  // Skills detail pages: same docs-browser shell as the overview.
  for (const skill of data.skills) {
    const sidebar = renderDocsSidebar(data.skillsByCategory, data.tutorials, { kind: 'skill', id: skill.id });
    const main = renderSkillDetail(skill, data.knownSkillIds);
    const title = `/${skill.id} | Impeccable`;
    const description = skill.editorial?.frontmatter?.tagline || skill.description;
    const html = renderPage({
      title,
      description,
      bodyHtml: wrapInDocsLayout(sidebar, main),
      activeNav: 'docs',
      canonicalPath: `/skills/${skill.id}`,
      bodyClass: 'sub-page skills-layout-page',
    });
    const out = path.join(outDirs.skills, `${skill.id}.html`);
    fs.writeFileSync(out, html, 'utf-8');
    generated.push(out);
  }

  // Anti-patterns index: single page, docs-browser shell with TOC sidebar.
  {
    const grouped = groupRulesBySection(data.rules);
    const sidebar = renderAntiPatternsSidebar(grouped);
    const main = renderAntiPatternsMain(grouped, data.rules.length);
    const html = renderPage({
      title: '反模式 | Impeccable',
      description: `${data.rules.length} 条规则，覆盖 AI 生成界面的常见露馅痕迹与通用质量问题，可用于 npx impeccable detect 与浏览器扩展。`,
      bodyHtml: wrapInDocsLayout(sidebar, main),
      activeNav: 'anti-patterns',
      canonicalPath: '/anti-patterns',
      bodyClass: 'sub-page skills-layout-page anti-patterns-page',
    });
    const out = path.join(outDirs.antiPatterns, 'index.html');
    fs.writeFileSync(out, html, 'utf-8');
    generated.push(out);
  }

  // Tutorials index (under the unified Docs umbrella).
  if (data.tutorials.length > 0) {
    const sidebar = renderDocsSidebar(data.skillsByCategory, data.tutorials, null);
    const main = renderTutorialsIndexMain(data.tutorials);
    const html = renderPage({
      title: '教程 | Impeccable',
      description: `${data.tutorials.length} 篇简短但有立场的教程，带你走通 Impeccable 里最值得先掌握的工作流。`,
      bodyHtml: wrapInDocsLayout(sidebar, main),
      activeNav: 'docs',
      canonicalPath: '/tutorials',
      bodyClass: 'sub-page skills-layout-page tutorials-page',
    });
    const out = path.join(outDirs.tutorials, 'index.html');
    fs.writeFileSync(out, html, 'utf-8');
    generated.push(out);
  }

  // Visual Mode: single standalone page, no sidebar, single-column layout.
  {
    const html = renderPage({
      title: '可视模式 | Impeccable',
      description:
        '直接在页面上查看每条反模式命中位置。Impeccable 的实时检测覆盖层可通过 /critique、npx impeccable live 或 Chrome 扩展使用。',
      bodyHtml: renderVisualModeMain(),
      activeNav: 'visual-mode',
      canonicalPath: '/visual-mode',
      bodyClass: 'sub-page visual-mode-page-body',
    });
    const out = path.join(outDirs.visualMode, 'index.html');
    fs.writeFileSync(out, html, 'utf-8');
    generated.push(out);
  }

  // Tutorial detail pages.
  for (const tutorial of data.tutorials) {
    const sidebar = renderDocsSidebar(data.skillsByCategory, data.tutorials, { kind: 'tutorial', slug: tutorial.slug });
    const main = renderTutorialDetail(tutorial, data.knownSkillIds);
    const html = renderPage({
      title: `${tutorial.title} | 教程 | Impeccable`,
      description: tutorial.description || tutorial.tagline || '',
      bodyHtml: wrapInDocsLayout(sidebar, main),
      activeNav: 'docs',
      canonicalPath: `/tutorials/${tutorial.slug}`,
      bodyClass: 'sub-page skills-layout-page tutorials-page',
    });
    const out = path.join(outDirs.tutorials, `${tutorial.slug}.html`);
    fs.writeFileSync(out, html, 'utf-8');
    generated.push(out);
  }

  return { files: generated };
}
