// Bolder command demo - shows timid design becoming bold and confident
export default {
  id: 'bolder',
  caption: '保守设计 → 更大胆、更自信的表达',
  
  before: `
    <div style="text-align: center; padding: var(--spacing-md); max-width: 280px;">
      <div style="font-size: 1.125rem; font-weight: 500; margin-bottom: 8px; color: var(--color-charcoal);">介绍我们的产品</div>
      <div style="font-size: 0.875rem; color: var(--color-ash); margin-bottom: 16px;">面向现代团队的解决方案</div>
      <button style="padding: 8px 16px; background: var(--color-mist); color: var(--color-charcoal); border: none; border-radius: 4px; font-size: 0.875rem;">了解更多</button>
    </div>
  `,
  
  after: `
    <div style="text-align: center; padding: var(--spacing-lg); max-width: 320px;">
      <div style="font-family: var(--font-display); font-size: 2.5rem; font-weight: 300; font-style: italic; margin-bottom: 12px; color: var(--color-ink); line-height: 1;">介绍我们的产品</div>
      <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--color-accent); margin-bottom: 24px;">面向现代团队的解决方案</div>
      <button style="padding: 14px 32px; background: var(--color-ink); color: var(--color-paper); border: none; font-size: 0.9375rem; font-weight: 500; letter-spacing: 0.02em;">了解更多</button>
    </div>
  `
};


