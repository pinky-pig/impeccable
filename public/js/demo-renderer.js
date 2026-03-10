// ============================================
// DEMO RENDERER - Generic rendering for command and skill demos
// ============================================

import { getCommandDemo } from './demos/commands/index.js';
import { getSkillDemo } from './demos/skills/index.js';

/**
 * Render a command demo with split-screen comparison
 */
export function renderCommandDemo(commandId) {
  const demo = getCommandDemo(commandId);

  if (!demo) {
    // teach-impeccable is a setup command, not a visual transform — show usage guide instead
    if (commandId === 'teach-impeccable') {
      return `
        <div class="demo-container">
          <div class="demo-viewport" style="padding: var(--spacing-lg); font-size: 13px; line-height: 1.6;">
            <div style="display: flex; flex-direction: column; gap: 12px; color: var(--color-ash);">
              <div style="font-size: 14px; color: var(--color-text); font-weight: 600;">何时运行</div>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div style="display: flex; gap: 8px; align-items: baseline;">
                  <span style="color: var(--color-accent); flex-shrink: 0;">1.</span>
                  <span>每个项目执行一次，在使用其他命令之前运行</span>
                </div>
                <div style="display: flex; gap: 8px; align-items: baseline;">
                  <span style="color: var(--color-accent); flex-shrink: 0;">2.</span>
                  <span>如果品牌或设计方向发生变化，再重新运行一次</span>
                </div>
              </div>
              <div style="font-size: 14px; color: var(--color-text); font-weight: 600; margin-top: 4px;">它会做什么</div>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div style="display: flex; gap: 8px; align-items: baseline;">
                  <span style="opacity: 0.5; flex-shrink: 0;">→</span>
                  <span>扫描代码库中已有的设计模式</span>
                </div>
                <div style="display: flex; gap: 8px; align-items: baseline;">
                  <span style="opacity: 0.5; flex-shrink: 0;">→</span>
                  <span>询问品牌、用户和审美方向</span>
                </div>
                <div style="display: flex; gap: 8px; align-items: baseline;">
                  <span style="opacity: 0.5; flex-shrink: 0;">→</span>
                  <span>将 Design Context 保存到 AI 配置文件中</span>
                </div>
              </div>
              <div style="font-size: 12px; opacity: 0.6; margin-top: 4px; font-style: italic;">其他命令都会自动复用这份上下文。</div>
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


