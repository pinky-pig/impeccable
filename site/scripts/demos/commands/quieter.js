// Quieter command demo - shows loud design becoming calm
export default {
  id: 'quieter',
  caption: '过于喧闹的设计 → 更平静、更聚焦的界面',

  before: `
    <div style="width: 100%; max-width: 280px; padding: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; text-align: center;">
      <div style="font-size: 24px; margin-bottom: 8px;">🎉✨🚀</div>
      <div style="font-size: 18px; font-weight: 800; color: #ffeb3b; text-transform: uppercase; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); margin-bottom: 8px;">超值优惠！</div>
      <div style="font-size: 14px; color: white; margin-bottom: 12px;">千万别错过这个不可思议的机会！！！</div>
      <div style="display: flex; gap: 8px; justify-content: center;">
        <button style="padding: 10px 16px; background: #ff4081; color: white; border: none; border-radius: 20px; font-weight: bold; font-size: 14px; text-transform: uppercase; box-shadow: 0 4px 15px rgba(255,64,129,0.4);">马上购买！！</button>
        <button style="padding: 10px 16px; background: #00e676; color: white; border: none; border-radius: 20px; font-weight: bold; font-size: 14px; text-transform: uppercase;">了解更多</button>
      </div>
    </div>
  `,

  after: `
    <div style="width: 100%; max-width: 280px; padding: 24px; background: var(--color-paper); border: 1px solid var(--color-mist); border-radius: 8px; text-align: center;">
      <div style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 300; font-style: italic; color: var(--color-ink); margin-bottom: 8px;">限时优惠</div>
      <div style="font-size: 0.875rem; color: var(--color-ash); margin-bottom: 20px; line-height: 1.5;">年付套餐立省 20%，优惠截止到周五。</div>
      <div style="display: flex; gap: 12px; justify-content: center;">
        <button style="padding: 12px 24px; background: var(--color-ink); color: var(--color-paper); border: none; border-radius: 6px; font-size: 0.875rem; font-weight: 500;">查看套餐</button>
        <button style="padding: 12px 24px; background: transparent; color: var(--color-charcoal); border: 1px solid var(--color-mist); border-radius: 6px; font-size: 0.875rem;">稍后再说</button>
      </div>
    </div>
  `
};
