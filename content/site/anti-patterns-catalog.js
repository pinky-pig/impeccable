/**
 * Manual metadata for the /anti-patterns page.
 *
 * The detection rules themselves live in src/detect-antipatterns.mjs and
 * are parsed at build time. This file adds three pieces of content that
 * can't be automated:
 *
 *  1. DETECTION_LAYERS: which layer (cli, browser, or llm) catches the
 *     rule. Manually classified by reading the detector source and the
 *     browser-only test file.
 *
 *  2. VISUAL_EXAMPLES: a tiny inline HTML snippet showing what the
 *     bad pattern actually looks like. Rendered inside each rule card.
 *     Snippets should be self-contained with inline styles, use the
 *     cream/paper/ink palette when possible, and sit naturally at
 *     ~100% width by ~120px height.
 *
 *  3. LLM_ONLY_RULES: DON'T lines from source/skills/impeccable/SKILL.md
 *     that do not map to any detection rule. These can only be caught by
 *     the /critique skill's LLM pass. They appear on the /anti-patterns
 *     page alongside detected rules with an 'llm' layer badge.
 */

// ─── Detection layers ────────────────────────────────────────────────

/**
 * Which layer catches each rule.
 *
 *  'cli':     static analysis or jsdom (works with `npx impeccable detect`
 *             on files, no browser required)
 *  'browser': requires real browser layout (getBoundingClientRect with
 *             actual dimensions). Works via Puppeteer or the browser
 *             extension, NOT via the CLI on raw HTML.
 *  'llm':     no deterministic detector; only caught by /critique's LLM
 *             assessment pass.
 *
 * Per tests/detect-antipatterns-browser.test.mjs: only two rules genuinely
 * need real browser layout. Everything else is 'cli'.
 */
export const DETECTION_LAYERS = {
  'side-tab': 'cli',
  'border-accent-on-rounded': 'cli',
  'overused-font': 'cli',
  'single-font': 'cli',
  'flat-type-hierarchy': 'cli',
  'icon-tile-stack': 'cli',
  'gradient-text': 'cli',
  'ai-color-palette': 'cli',
  'dark-glow': 'cli',
  'nested-cards': 'cli',
  'monotonous-spacing': 'cli',
  'everything-centered': 'cli',
  'bounce-easing': 'cli',
  'all-caps-body': 'cli',
  'pure-black-white': 'cli',
  'gray-on-color': 'cli',
  'low-contrast': 'cli',
  'layout-transition': 'cli',
  'tight-leading': 'cli',
  'skipped-heading': 'cli',
  'justified-text': 'cli',
  'tiny-text': 'cli',
  'wide-tracking': 'cli',
  // Browser-only: need real layout measurements.
  'cramped-padding': 'browser',
  'line-length': 'browser',
};

export const LAYER_LABELS = {
  cli: 'CLI',
  browser: '浏览器',
  llm: '仅 LLM',
};

export const LAYER_DESCRIPTIONS = {
  cli: '确定性检测。可直接通过 `npx impeccable detect` 扫描文件，不需要浏览器。',
  browser: '同样是确定性检测，但需要真实浏览器布局。通过浏览器扩展或 Puppeteer 运行，不是普通 CLI 模式。',
  llm: '任何确定性检测器都抓不到，只能由 /critique 的 LLM 设计评审阶段发现。',
};

// ─── Visual examples ─────────────────────────────────────────────────

/**
 * One tiny inline HTML snippet per rule showing what the bad pattern
 * looks like. Snippets use inline styles only and are sized to fit the
 * rule card preview area (~100% wide, ~120px tall).
 */
export const VISUAL_EXAMPLES = {
  'side-tab': `<div style="background: #fff; border: 1px solid #e8e4df; border-left: 4px solid oklch(60% 0.22 265); border-radius: 6px; padding: 14px 16px; width: 220px; font-family: system-ui, sans-serif; font-size: 13px; color: #111;"><div style="font-weight: 600; margin-bottom: 4px;">提示标题</div><div style="color: #666; font-size: 12px;">单侧出现厚重彩色边条。</div></div>`,

  'border-accent-on-rounded': `<div style="background: #fff; border: 2px solid oklch(60% 0.22 290); border-radius: 16px; padding: 14px 18px; width: 220px; font-family: system-ui, sans-serif; font-size: 13px; color: #111;"><div style="font-weight: 600;">圆角卡片</div><div style="color: #666; font-size: 12px;">厚边框会和圆角互相打架。</div></div>`,

  'overused-font': `<div style="font-family: Inter, system-ui, sans-serif; font-size: 15px; color: #111; line-height: 1.4;"><div style="font-weight: 600; margin-bottom: 4px;">又一个 Inter 标题</div><div style="color: #555; font-size: 13px;">很多 SaaS 首页都长这样。</div></div>`,

  'single-font': `<div style="font-family: system-ui, sans-serif; font-size: 14px; color: #111;"><div style="font-size: 19px; font-weight: 600; margin-bottom: 6px;">标题和正文同一字体</div><div style="color: #555;">整页都一个字样，没有反差，也没有层级。</div></div>`,

  'flat-type-hierarchy': `<div style="font-family: system-ui, sans-serif; color: #111; line-height: 1.3;"><div style="font-size: 17px; font-weight: 600;">Heading</div><div style="font-size: 16px; font-weight: 500; margin: 2px 0;">Subheading</div><div style="font-size: 15px; color: #555;">Body text at almost the same size.</div></div>`,

  'icon-tile-stack': `<div style="font-family: system-ui, sans-serif; color: #111;"><div style="width: 44px; height: 44px; border-radius: 10px; background: linear-gradient(135deg, oklch(62% 0.22 265), oklch(70% 0.20 320)); display: flex; align-items: center; justify-content: center; font-size: 20px; color: #fff; margin-bottom: 10px;">✦</div><div style="font-size: 14px; font-weight: 600; margin-bottom: 2px;">功能名称</div><div style="font-size: 12px; color: #666;">标题上方再堆一个圆角图标砖块。</div></div>`,

  'gradient-text': `<div style="font-family: system-ui, sans-serif;"><div style="font-size: 28px; font-weight: 700; background: linear-gradient(135deg, oklch(65% 0.25 320), oklch(60% 0.25 265)); -webkit-background-clip: text; background-clip: text; color: transparent; line-height: 1.1;">构建未来</div><div style="font-size: 12px; color: #888; margin-top: 4px;">渐变字会明显削弱扫读效率。</div></div>`,

  'ai-color-palette': `<div style="display: flex; gap: 6px;"><div style="width: 44px; height: 44px; border-radius: 6px; background: oklch(60% 0.22 265);"></div><div style="width: 44px; height: 44px; border-radius: 6px; background: oklch(62% 0.25 300);"></div><div style="width: 44px; height: 44px; border-radius: 6px; background: oklch(64% 0.25 340);"></div><div style="width: 44px; height: 44px; border-radius: 6px; background: oklch(70% 0.20 200);"></div></div>`,

  'dark-glow': `<div style="background: #0a0b14; padding: 18px 20px; border-radius: 10px; font-family: system-ui, sans-serif;"><div style="color: oklch(78% 0.22 280); text-shadow: 0 0 12px oklch(78% 0.22 280 / 0.7); font-size: 16px; font-weight: 600;">Neon on dark</div><div style="color: oklch(60% 0.12 260); font-size: 12px; margin-top: 4px;">Cyberpunk-by-default slop.</div></div>`,

  'nested-cards': `<div style="background: #f5f3ef; border: 1px solid #e0dcd4; border-radius: 10px; padding: 10px;"><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 8px; padding: 10px;"><div style="background: #f5f3ef; border: 1px solid #e8e4df; border-radius: 6px; padding: 8px; font-size: 12px; font-family: system-ui, sans-serif; color: #555;">Card inside card inside card.</div></div></div>`,

  'monotonous-spacing': `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;"><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 6px; height: 48px;"></div><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 6px; height: 48px;"></div><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 6px; height: 48px;"></div><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 6px; height: 48px;"></div><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 6px; height: 48px;"></div><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 6px; height: 48px;"></div></div>`,

  'everything-centered': `<div style="font-family: system-ui, sans-serif; text-align: center; color: #111;"><div style="font-size: 16px; font-weight: 600; margin-bottom: 6px;">Centered headline</div><div style="font-size: 12px; color: #555; margin-bottom: 10px;">Everything centered by default.</div><div style="display: inline-block; background: #111; color: #fff; padding: 6px 14px; border-radius: 6px; font-size: 12px;">Call to action</div></div>`,

  'bounce-easing': `<div style="font-family: system-ui, sans-serif; color: #111; display: flex; align-items: center; gap: 10px;"><div style="width: 36px; height: 36px; border-radius: 50%; background: oklch(65% 0.22 265); animation: bouncey 0.9s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;"></div><div style="font-size: 12px; color: #555;">Bounce + elastic easing feels dated.</div><style>@keyframes bouncey { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }</style></div>`,

  'all-caps-body': `<div style="font-family: system-ui, sans-serif; color: #111; font-size: 12px; text-transform: uppercase; letter-spacing: 0.03em; line-height: 1.5;">整段全大写会严重拖慢阅读，因为单词轮廓被抹平了。</div>`,

  'pure-black-white': `<div style="background: #ffffff; padding: 16px 18px; color: #000000; font-family: system-ui, sans-serif; font-size: 14px;"><div style="font-weight: 600; margin-bottom: 4px;">Pure black on pure white</div><div style="font-size: 12px; color: #000;">Neither exists in nature. Always tint.</div></div>`,

  'gray-on-color': `<div style="background: oklch(60% 0.20 265); padding: 16px 18px; border-radius: 6px; font-family: system-ui, sans-serif;"><div style="color: #9ca3af; font-size: 13px;">Gray text on a colored background. Washed out and hard to read.</div></div>`,

  'low-contrast': `<div style="background: #fff; padding: 16px 18px; font-family: system-ui, sans-serif;"><div style="color: #d4d4d4; font-size: 13px;">Light gray text on a white background. 1.6:1 contrast, fails WCAG.</div></div>`,

  'layout-transition': `<div style="font-family: system-ui, sans-serif; color: #111; display: flex; align-items: center; gap: 10px;"><div style="background: oklch(65% 0.22 265); border-radius: 6px; animation: janky 1.2s ease-in-out infinite; width: 60px; height: 30px;"></div><div style="font-size: 12px; color: #555;">Animating width/height causes layout jank.</div><style>@keyframes janky { 0%,100% { width: 60px; } 50% { width: 120px; } }</style></div>`,

  'cramped-padding': `<div style="font-family: system-ui, sans-serif;"><button style="background: #111; color: #fff; border: none; border-radius: 4px; padding: 2px 6px; font-size: 13px; font-weight: 500;">Buy now</button> <span style="color: #555; font-size: 12px; margin-left: 8px;">2px vertical padding.</span></div>`,

  'tight-leading': `<div style="font-family: system-ui, sans-serif; font-size: 13px; color: #111; line-height: 1.0; max-width: 220px;">Tight leading makes multi-line body text feel crammed and hard for the eye to track between lines.</div>`,

  'skipped-heading': `<div style="font-family: system-ui, sans-serif; color: #111;"><h1 style="font-size: 20px; font-weight: 700; margin: 0 0 4px;">Page title (h1)</h1><h3 style="font-size: 13px; font-weight: 600; margin: 0; color: #555;">Subsection (h3), skipped h2</h3></div>`,

  'justified-text': `<div style="font-family: system-ui, sans-serif; font-size: 12px; color: #111; text-align: justify; max-width: 230px; line-height: 1.5;">Justified text on screens creates rivers of whitespace because browsers can't hyphenate well. Leave this for print.</div>`,

  'tiny-text': `<div style="font-family: system-ui, sans-serif; color: #111;"><div style="font-size: 15px; margin-bottom: 6px;">Regular body text</div><div style="font-size: 9px; color: #555;">And then fine print at 9 pixels that no one will ever read.</div></div>`,

  'wide-tracking': `<div style="font-family: system-ui, sans-serif; font-size: 13px; color: #111; letter-spacing: 0.22em; max-width: 230px; line-height: 1.6;">Wide tracking on body text slows reading by breaking up natural character groupings.</div>`,

  'line-length': `<div style="font-family: system-ui, sans-serif; font-size: 13px; color: #111; line-height: 1.55; max-width: 100%;">单行一旦超过大约 75 个字符，视线回扫距离就会太长，阅读会明显更累。</div>`,

  // ── LLM-only rule visuals ─────────────────────────────────────────

  'monospace-as-technical': `<div style="font-family: 'Courier New', monospace; color: #111;"><div style="font-size: 18px; font-weight: 700; margin-bottom: 6px;">TECHNICAL_TOOL</div><div style="font-size: 11px; color: #555;">Mono for "developer" vibes. Lazy.</div></div>`,

  'dark-mode-default': `<div style="background: #0f1117; padding: 18px; border-radius: 8px; font-family: system-ui, sans-serif;"><div style="color: #e5e7eb; font-size: 14px; font-weight: 600; margin-bottom: 4px;">默认暗色</div><div style="color: #9ca3af; font-size: 11px;">默认上暗色，本质上是在回避设计判断。</div></div>`,

  'everything-in-cards': `<div style="background: #fff; border: 1px solid #e8e4df; border-radius: 8px; padding: 10px;"><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 6px; padding: 8px; font-family: system-ui, sans-serif; font-size: 12px; color: #111;"><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 4px; padding: 6px;">Title</div></div><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 6px; padding: 8px; margin-top: 6px; font-family: system-ui, sans-serif; font-size: 11px; color: #555;">Card around every single thing.</div></div>`,

  'identical-card-grids': `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; font-family: system-ui, sans-serif;">${'<div style="background: #fff; border: 1px solid #e8e4df; border-radius: 6px; padding: 10px; display: flex; flex-direction: column; align-items: flex-start; gap: 4px;"><div style="width: 18px; height: 18px; background: oklch(62% 0.20 265); border-radius: 4px;"></div><div style="font-size: 10px; font-weight: 600; color: #111;">Feature</div><div style="font-size: 9px; color: #888;">Short copy.</div></div>'.repeat(6)}</div>`,

  'hero-metric-layout': `<div style="font-family: system-ui, sans-serif; text-align: left;"><div style="font-size: 42px; font-weight: 800; background: linear-gradient(135deg, oklch(65% 0.25 265), oklch(65% 0.25 340)); -webkit-background-clip: text; background-clip: text; color: transparent; line-height: 1;">10M+</div><div style="font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 2px;">Active users</div><div style="display: flex; gap: 14px; margin-top: 10px; font-size: 10px; color: #555;"><span><strong>99.9%</strong> uptime</span><span><strong>200ms</strong> p50</span></div></div>`,

  'glassmorphism': `<div style="position: relative; width: 100%; height: 100%; background: linear-gradient(135deg, oklch(70% 0.22 265), oklch(70% 0.25 340)); border-radius: 10px; overflow: hidden; display: flex; align-items: center; justify-content: center;"><div style="background: rgba(255,255,255,0.25); -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.4); border-radius: 10px; padding: 14px 18px; color: #fff; font-family: system-ui, sans-serif; font-size: 12px; font-weight: 600; box-shadow: 0 8px 30px rgba(0,0,0,0.12);">磨砂玻璃卡片</div></div>`,

  'sparkline-decoration': `<div style="background: #fff; border: 1px solid #e8e4df; border-radius: 8px; padding: 14px 16px; width: 220px; font-family: system-ui, sans-serif;"><div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;"><div><div style="font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 0.08em;">营收</div><div style="font-size: 20px; font-weight: 700; color: #111;">¥42.1k</div></div><svg width="60" height="28" viewBox="0 0 60 28" style="flex-shrink: 0;"><polyline points="0,20 10,18 20,22 30,10 40,14 50,6 60,12" stroke="oklch(62% 0.22 265)" stroke-width="2" fill="none"/></svg></div><div style="font-size: 10px; color: #888;">看着像图表，其实没传递多少信息。</div></div>`,

  'generic-drop-shadows': `<div style="display: flex; gap: 10px;"><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 10px; width: 70px; height: 70px; box-shadow: 0 10px 30px rgba(0,0,0,0.08);"></div><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 10px; width: 70px; height: 70px; box-shadow: 0 10px 30px rgba(0,0,0,0.08);"></div><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 10px; width: 70px; height: 70px; box-shadow: 0 10px 30px rgba(0,0,0,0.08);"></div></div>`,

  'modal-reflex': `<div style="position: relative; width: 100%; height: 100%; background: #f5f3ef; border-radius: 8px; overflow: hidden;"><div style="position: absolute; inset: 0; background: rgba(0,0,0,0.35);"></div><div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #fff; border-radius: 8px; padding: 14px 18px; width: 200px; font-family: system-ui, sans-serif; box-shadow: 0 20px 60px rgba(0,0,0,0.2);"><div style="font-size: 13px; font-weight: 600; color: #111; margin-bottom: 4px;">确定要继续吗？</div><div style="font-size: 11px; color: #666; margin-bottom: 8px;">真的、真的要这样做？</div><div style="display: flex; gap: 6px; justify-content: flex-end;"><div style="background: #eee; color: #555; padding: 4px 8px; border-radius: 4px; font-size: 10px;">取消</div><div style="background: oklch(60% 0.22 265); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 10px;">确定</div></div></div></div>`,

  'every-button-primary': `<div style="display: flex; flex-direction: column; gap: 6px; font-family: system-ui, sans-serif;"><div style="display: flex; gap: 6px;"><button style="background: oklch(60% 0.22 265); color: #fff; border: none; border-radius: 5px; padding: 6px 12px; font-size: 11px; font-weight: 600;">保存</button><button style="background: oklch(60% 0.22 265); color: #fff; border: none; border-radius: 5px; padding: 6px 12px; font-size: 11px; font-weight: 600;">取消</button><button style="background: oklch(60% 0.22 265); color: #fff; border: none; border-radius: 5px; padding: 6px 12px; font-size: 11px; font-weight: 600;">删除</button></div><div style="font-size: 10px; color: #888;">每个动作都在大喊自己最重要。</div></div>`,

  'redundant-headers': `<div style="font-family: system-ui, sans-serif; color: #111; max-width: 230px;"><div style="font-size: 14px; font-weight: 600; margin-bottom: 4px;">概览</div><div style="font-size: 11px; color: #555; line-height: 1.5;">这一段是概览区，用来继续解释前面那个“概览”标题。</div></div>`,

  'mobile-amputation': `<div style="font-family: system-ui, sans-serif;"><div style="display: flex; align-items: center; gap: 8px; padding: 8px 10px; background: #fff; border: 1px solid #e8e4df; border-radius: 6px; margin-bottom: 4px; font-size: 12px; color: #999; text-decoration: line-through;"><span>导出 CSV</span></div><div style="font-size: 10px; color: #888; margin-top: 4px;">“移动端暂不支持”。</div></div>`,
};

/**
 * Anti-patterns that live in the /impeccable skill's DON'T list but
 * don't have a deterministic detector. These can only be caught by
 * /critique running an LLM assessment pass.
 *
 * Each entry looks like a detection rule: id, category, name,
 * description, skillSection. The generator merges these into the
 * grouped sections alongside detected rules with an 'llm' layer badge.
 */
// ─── Gallery: real examples in the wild ──────────────────────────────

/**
 * Curated real-world examples of anti-patterns caught in the wild.
 * Each entry maps to:
 *   - public/antipattern-images/{id}.png  (preview thumbnail)
 *   - public/antipattern-examples/{id}.html  (standalone live example)
 * Rendered as a dedicated section on the /anti-patterns page, replacing
 * the old /gallery route which was confusingly labeled in the top nav.
 */
export const GALLERY_ITEMS = [
  {
    id: 'purple-gradients',
    title: '紫色渐变泛滥',
    desc:
      '典型 AI 配色病：紫到蓝的渐变到处都是。按钮、文字、背景、光球，全都在用。像把“做得更炸”误解成唯一目标。',
  },
  {
    id: 'lazy-cool',
    title: '偷懒式“酷感”',
    desc:
      '玻璃拟态、霓虹发光、模糊光球、整页 monospace。更像黑客马拉松 demo，不像真正要交付的产品。',
  },
  {
    id: 'lazy-impact',
    title: '偷懒式“冲击力”',
    desc:
      '拿不准就把一切都动起来：弹跳按钮、晃动图标、渐变文字、漂浮标签。只有动作，没有意义。',
  },
  {
    id: 'thick-border-cards',
    title: '侧条卡片',
    desc:
      '圆角卡片一侧加一条厚色边，这是 AI 生成 UI 最容易被一眼认出的信号之一。',
  },
  {
    id: 'cardocalypse',
    title: '卡片末日',
    desc:
      '卡片套卡片再套卡片，五层嵌套，每层都有自己的 padding 和阴影。',
  },
  {
    id: 'layout-templates',
    title: '复制粘贴式布局',
    desc:
      '同一种 hero + 指标 + 功能区模板，换个颜色就再来一版。每个区块都长得一样，就没有任何重点了。',
  },
  {
    id: 'inter-everywhere',
    title: '到处都是 Inter',
    desc:
      '全站只用一套字体：标题、正文、标签、按钮都是它。没有排版层级，没有个性，也没有真正的设计判断。',
  },
  {
    id: 'massive-icons',
    title: '巨大图标',
    desc:
      '图标容器比它引出的内容还大。当装饰比信息本身更抢眼时，优先级就倒过来了。',
  },
  {
    id: 'bad-contrast',
    title: '糟糕的对比度选择',
    desc:
      '彩色背景上的灰字、低对比度标签、根本读不清的配色组合。好看和可读，本来不该互相冲突。',
  },
  {
    id: 'redundant-ux-writing',
    title: '冗余 UX 文案',
    desc:
      '标签、副标题、帮助文案、提示文案都在用不同措辞重复同一件事。该说一次的内容，就别说四次。',
  },
  {
    id: 'modal-abuse',
    title: '滥用弹窗',
    desc:
      '把复杂设置硬塞进弹窗里。如果它需要滚动条和三列布局，那它就该拥有自己的一整页。',
  },
];

// ─── LLM-only rules ──────────────────────────────────────────────────

export const LLM_ONLY_RULES = [
  {
    id: 'monospace-as-technical',
    category: 'slop',
    name: '把等宽字体当成“技术感”速记',
    description:
      '靠等宽字体硬造“开发者 / 技术味”，本质上是在偷懒。真正的技术气质，应该通过更有判断的排版选择来建立。',
    skillSection: 'Typography',
  },
  {
    id: 'dark-mode-default',
    category: 'slop',
    name: '为了“保险”默认上暗色模式',
    description:
      '为了显得更酷而默认暗色，和为了求稳而默认浅色，其实都是在逃避真正的设计决定。',
    skillSection: 'Color & Contrast',
  },
  {
    id: 'everything-in-cards',
    category: 'slop',
    name: '什么都往卡片里塞',
    description:
      '不是每一块内容都需要一个带边框的卡片。很多时候，间距和对齐就足以建立分组关系，没必要把页面塞满盒子。',
    skillSection: 'Layout & Space',
  },
  {
    id: 'identical-card-grids',
    category: 'slop',
    name: '清一色卡片网格',
    description:
      '同尺寸卡片里重复摆着图标、标题、说明文，这是 AI 首页最爱输出的默认排布之一。',
    skillSection: 'Layout & Space',
  },
  {
    id: 'hero-metric-layout',
    category: 'slop',
    name: 'Hero 指标模板',
    description:
      '大数字、小标签、三条补充指标、再加一抹渐变强调，这种模板几乎哪里都见过，也因此很难再让人信服。',
    skillSection: 'Layout & Space',
  },
  {
    id: 'glassmorphism',
    category: 'slop',
    name: '到处都是玻璃拟态',
    description:
      '模糊、玻璃卡片和发光边框如果只是为了装饰，而不是为了解决真实的层级问题，就只会显得套路化。',
    skillSection: 'Visual Details',
  },
  {
    id: 'sparkline-decoration',
    category: 'slop',
    name: '把 sparkline 当装饰',
    description:
      '小火花线看起来像是“有数据支撑”，但很多时候根本没有传递有效信息。真在意数据，就给它应有的空间。',
    skillSection: 'Visual Details',
  },
  {
    id: 'generic-drop-shadows',
    category: 'slop',
    name: '圆角矩形配通用投影',
    description:
      '这是网页里最安全、也最容易被忘掉的形状组合之一，几乎任何 AI 都能吐出这一版。要么更克制，要么更有判断，不要停在模板中间。',
    skillSection: 'Visual Details',
  },
  {
    id: 'modal-reflex',
    category: 'slop',
    name: '条件反射式地用弹窗',
    description:
      '弹窗会打断用户，把它当默认解法其实是一种偷懒。只有在确实没有更合适承载位置时，才值得用。',
    skillSection: 'Visual Details',
  },
  {
    id: 'every-button-primary',
    category: 'quality',
    name: '所有按钮都像主按钮',
    description:
      '当每个按钮看起来都一样重要时，真正的主动作反而会消失。需要通过幽灵按钮、文本链接和次级样式把优先级拉开。',
    skillSection: 'Interaction',
  },
  {
    id: 'redundant-headers',
    category: 'quality',
    name: '信息重复',
    description:
      '开头重复标题，分区标签又重复页面标题，卡片内容再把自己的 caption 说一遍。让每个词都真正承担作用，而不是互相复述。',
    skillSection: 'Interaction',
  },
  {
    id: 'mobile-amputation',
    category: 'quality',
    name: '在移动端阉割功能',
    description:
      '因为实现麻烦，就在移动端把关键功能藏掉或砍掉，这不是适配，而是倒退。应该为新场景重做交互，而不是直接删能力。',
    skillSection: 'Responsive',
  },
];
