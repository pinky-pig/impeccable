// ============================================
// DEMO RENDERER - Generic rendering for command and skill demos
// ============================================

import { getCommandDemo } from './demos/commands/index.js';
import { getSkillDemo } from './demos/skills/index.js';

/**
 * Initialize a command demo's JS after its HTML has been inserted into the DOM.
 * Call this after innerHTML is set and split compare is initialized.
 */
export function initCommandDemo(commandId, container) {
  const demo = getCommandDemo(commandId);
  if (demo && typeof demo.init === 'function') {
    const demoArea = container.querySelector('.split-after .split-content') || container;
    console.log('[initCommandDemo]', commandId, 'demoArea:', demoArea);
    demo.init(demoArea);
  }
}

/**
 * Render a command demo with split-screen comparison
 */
export function renderCommandDemo(commandId) {
  const demo = getCommandDemo(commandId);

  if (!demo) {
    // impeccable has multiple modes — show a usage guide
    if (commandId === 'impeccable') {
      return `
        <div class="demo-container">
          <div class="demo-viewport" style="padding: var(--spacing-lg); font-size: 13px; line-height: 1.6;">
            <div style="display: flex; flex-direction: column; gap: 16px; color: var(--color-ash);">
              <div style="font-size: 14px; color: var(--color-text); font-weight: 600;">/impeccable 的三种用法</div>
              <div style="display: flex; flex-direction: column; gap: 14px;">
                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <div style="display: flex; gap: 8px; align-items: baseline;">
                    <code style="font-size: 12px; color: var(--spread-accent, var(--color-accent)); font-weight: 600; white-space: nowrap;">/impeccable</code>
                    <span style="opacity: 0.4; font-size: 11px;">自由模式</span>
                  </div>
                  <span style="padding-left: 0; opacity: 0.8;">适用于任何设计任务。会把完整的设计智能、反模式规则和参考知识一起加载进当前上下文。</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <div style="display: flex; gap: 8px; align-items: baseline;">
                    <code style="font-size: 12px; color: var(--spread-accent, var(--color-accent)); font-weight: 600; white-space: nowrap;">/impeccable teach</code>
                    <span style="opacity: 0.4; font-size: 11px;">一次性设置</span>
                  </div>
                  <span style="padding-left: 0; opacity: 0.8;">扫描代码库、询问品牌与受众信息，然后保存设计上下文，供其他命令自动复用。</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <div style="display: flex; gap: 8px; align-items: baseline;">
                    <code style="font-size: 12px; color: var(--spread-accent, var(--color-accent)); font-weight: 600; white-space: nowrap;">/impeccable craft</code>
                    <span style="opacity: 0.4; font-size: 11px;">构建功能</span>
                  </div>
                  <span style="padding-left: 0; opacity: 0.8;">先通过 <code style="font-size: 11px;">/shape</code> 规划 UX，再加载合适参考，并在视觉迭代中完成实现。</span>
                </div>
              </div>
              <div style="font-size: 12px; opacity: 0.5; margin-top: 2px; font-style: italic;">每个项目先运行一次 <code style="font-size: 11px;">/impeccable teach</code>，其余模式再按需使用。</div>
            </div>
          </div>
        </div>
      `;
    }
    // craft is the full end-to-end flow, show the four stages
    if (commandId === 'craft') {
      return `
        <div class="demo-container">
          <div class="demo-viewport" style="padding: var(--spacing-lg); font-size: 13px; line-height: 1.6;">
            <div style="display: flex; flex-direction: column; gap: 16px; color: var(--color-ash);">
              <div style="font-size: 14px; color: var(--color-text); font-weight: 600;">规划、参考、构建、迭代</div>
              <div style="display: flex; flex-direction: column; gap: 14px;">
                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <div style="display: flex; gap: 8px; align-items: baseline;">
                    <span style="color: var(--spread-accent, var(--color-accent)); font-weight: 600; font-size: 12px;">1. Shape</span>
                  </div>
                  <span style="opacity: 0.8;">内部先运行 <code style="font-size: 11px;">/impeccable shape</code>，通过发现式提问生成设计 brief。此时还不会写代码。</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <div style="display: flex; gap: 8px; align-items: baseline;">
                    <span style="color: var(--spread-accent, var(--color-accent)); font-weight: 600; font-size: 12px;">2. Reference</span>
                  </div>
                  <span style="opacity: 0.8;">根据 brief 需求加载正确的参考文件，比如空间设计、排版、动效与色彩。</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <div style="display: flex; gap: 8px; align-items: baseline;">
                    <span style="color: var(--spread-accent, var(--color-accent)); font-weight: 600; font-size: 12px;">3. Build</span>
                  </div>
                  <span style="opacity: 0.8;">实现结构、间距、排版、色彩、状态、动效与响应式。每个决定都回到 brief 里找依据。</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <div style="display: flex; gap: 8px; align-items: baseline;">
                    <span style="color: var(--spread-accent, var(--color-accent)); font-weight: 600; font-size: 12px;">4. 可视化迭代</span>
                  </div>
                  <span style="opacity: 0.8;">把结果放进浏览器里，对照 brief 和反模式清单持续微调，直到完成度真正够高。</span>
                </div>
              </div>
              <div style="font-size: 12px; opacity: 0.5; margin-top: 2px; font-style: italic;">一个命令打通从 shape 到 build 的完整流程，最适合全新功能。</div>
            </div>
          </div>
        </div>
      `;
    }
    // teach sets up the project's design context, show the flow
    if (commandId === 'teach') {
      return `
        <div class="demo-container">
          <div class="demo-viewport" style="padding: var(--spacing-lg); font-size: 13px; line-height: 1.6;">
            <div style="display: flex; flex-direction: column; gap: 16px; color: var(--color-ash);">
              <div style="font-size: 14px; color: var(--color-text); font-weight: 600;">项目级一次性设置</div>
              <div style="display: flex; flex-direction: column; gap: 14px;">
                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <div style="display: flex; gap: 8px; align-items: baseline;">
                    <span style="color: var(--spread-accent, var(--color-accent)); font-weight: 600; font-size: 12px;">1. 探索</span>
                  </div>
                  <span style="opacity: 0.8;">扫描代码库里的品牌资产、现有 token、排版、组件与文档。</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <div style="display: flex; gap: 8px; align-items: baseline;">
                    <span style="color: var(--spread-accent, var(--color-accent)); font-weight: 600; font-size: 12px;">2. 访谈</span>
                  </div>
                  <span style="opacity: 0.8;">询问目标受众、品牌人格、审美方向和可访问性要求；凡是能从代码推断出来的，就不会重复问。</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <div style="display: flex; gap: 8px; align-items: baseline;">
                    <span style="color: var(--spread-accent, var(--color-accent)); font-weight: 600; font-size: 12px;">3. 保存</span>
                  </div>
                  <span style="opacity: 0.8;">写出包含用户、品牌、审美方向与设计原则的 <code style="font-size: 11px;">PRODUCT.md</code>。后续所有命令都会自动读取。</span>
                </div>
              </div>
              <div style="font-size: 12px; opacity: 0.5; margin-top: 2px; font-style: italic;">每个项目跑一次就够，之后几乎可以忘掉它的存在。</div>
            </div>
          </div>
        </div>
      `;
    }
    // shape is a planning skill — show the process
    if (commandId === 'shape') {
      return `
        <div class="demo-container">
          <div class="demo-viewport" style="padding: var(--spacing-lg); font-size: 13px; line-height: 1.6;">
            <div style="display: flex; flex-direction: column; gap: 16px; color: var(--color-ash);">
              <div style="font-size: 14px; color: var(--color-text); font-weight: 600;">先设计，再编码</div>
              <div style="display: flex; flex-direction: column; gap: 14px;">
                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <div style="display: flex; gap: 8px; align-items: baseline;">
                    <span style="color: var(--spread-accent, var(--color-accent)); font-weight: 600; font-size: 12px;">1. 发现</span>
                  </div>
                  <span style="opacity: 0.8;">围绕目标、受众、内容、约束与反目标做访谈，并根据你的回答动态调整问题。</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <div style="display: flex; gap: 8px; align-items: baseline;">
                    <span style="color: var(--spread-accent, var(--color-accent)); font-weight: 600; font-size: 12px;">2. 设计 brief</span>
                  </div>
                  <span style="opacity: 0.8;">归纳出一份 9 个部分的 brief：功能摘要、主动作、设计方向、布局策略、关键状态、交互模型、内容需求、建议参考和待确认问题。</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <div style="display: flex; gap: 8px; align-items: baseline;">
                    <span style="color: var(--spread-accent, var(--color-accent)); font-weight: 600; font-size: 12px;">3. 交接</span>
                  </div>
                  <span style="opacity: 0.8;">确认后的 brief 可以直接指导 <code style="font-size: 11px;">/impeccable craft</code> 或任何其他实现流程。这里不写代码，只把让代码变好的思考先做完。</span>
                </div>
              </div>
              <div style="font-size: 12px; opacity: 0.5; margin-top: 2px; font-style: italic;">既可单独使用，也可作为 <code style="font-size: 11px;">/impeccable craft</code> 的第一步。</div>
            </div>
          </div>
        </div>
      `;
    }
    return `
      <div class="demo-container">
        <div class="demo-viewport">
          <div style="text-align: center; color: var(--color-ash); font-style: italic; padding: var(--spacing-lg);">
            /${commandId} 的可视化演示即将上线
          </div>
        </div>
      </div>
    `;
  }

  // Use split-screen comparison
  return `
    <div class="demo-split-comparison" data-demo="command-${demo.id}">
      <div class="split-container">
        <div class="split-before">
          <div class="split-content">${demo.before}</div>
        </div>
        <div class="split-after">
          <div class="split-content">${demo.after || demo.before}</div>
        </div>
        <div class="split-divider"></div>
      </div>
      <div class="demo-caption">${demo.caption}</div>
    </div>
  `;
}

/**
 * Render a skill demo (with tabs if multiple demos)
 */
export function renderSkillDemo(skillId) {
  const skill = getSkillDemo(skillId);

  if (!skill || !skill.tabs || skill.tabs.length === 0) {
    return `
      <div class="demo-container">
        <div class="demo-viewport">
          <div style="text-align: center; color: var(--color-ash); padding: var(--spacing-xl);">
            <p>${skillId.replace(/-/g, ' ')} 的演示即将上线</p>
          </div>
        </div>
      </div>
    `;
  }

  const showTabs = skill.tabs.length > 1;

  const tabs = showTabs ? skill.tabs.map((tab, i) => `
    <button class="demo-tab ${i === 0 ? 'active' : ''}" data-demo-tab="${tab.id}" data-skill="${skillId}">
      ${tab.label}
    </button>
  `).join('') : '';

  const panels = skill.tabs.map((tab, i) => `
    <div class="demo-panel ${i === 0 ? 'active' : ''}" data-demo-panel="${tab.id}">
      ${renderSkillTabDemo(skillId, tab)}
    </div>
  `).join('');

  return `
    <div class="demo-tabbed-container">
      ${showTabs ? `<div class="demo-tabs">${tabs}</div>` : ''}
      <div class="demo-panels">
        ${panels}
      </div>
    </div>
  `;
}

/**
 * Render a single skill tab demo
 */
function renderSkillTabDemo(skillId, tab) {
  const hasToggle = tab.hasToggle !== false;
  const demoId = `${skillId}-${tab.id}`;

  return `
    <div class="demo-container">
      <div class="demo-header">
        ${hasToggle ? `
          <div class="demo-toggle">
            <span class="demo-toggle-label active" id="${demoId}-before-label">前</span>
            <button class="demo-toggle-switch" data-demo="${demoId}" role="switch" aria-checked="false" aria-labelledby="${demoId}-before-label ${demoId}-after-label"></button>
            <span class="demo-toggle-label" id="${demoId}-after-label">后</span>
          </div>
        ` : ''}
      </div>
      <div class="demo-viewport" data-state="before" id="${demoId}-viewport">
        ${tab.before}
      </div>
      <div class="demo-caption">${tab.caption}</div>
    </div>
  `;
}

/**
 * Setup demo tab switching
 */
export function setupDemoTabs() {
  document.querySelectorAll('.demo-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.demoTab;
      const container = tab.closest('.demo-tabbed-container');

      container.querySelectorAll('.demo-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      container.querySelectorAll('.demo-panel').forEach(p => p.classList.remove('active'));
      container.querySelector(`[data-demo-panel="${tabId}"]`)?.classList.add('active');
    });
  });
}

