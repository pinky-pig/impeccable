// Typeset command demo - shows flat, hierarchyless text becoming intentional typography
export default {
  id: 'typeset',
  caption: '没有文字层级 → 清晰而有判断的排版',

  before: `
    <div style="width: 100%; max-width: 240px; padding: 16px; font-family: Arial, sans-serif;">
      <div style="font-size: 14px; font-weight: bold; color: #444; margin-bottom: 8px;">项目更新</div>
      <div style="font-size: 14px; color: #444; margin-bottom: 8px;">Q1 设计冲刺</div>
      <div style="font-size: 14px; color: #444; line-height: 1.4; margin-bottom: 8px;">团队已经完成仪表盘改版，所有组件都已通过评审并获得确认。</div>
      <div style="font-size: 14px; color: #444;">2 小时前更新</div>
    </div>
  `,

  after: `
    <div style="width: 100%; max-width: 240px; padding: 16px; font-family: 'Instrument Sans', sans-serif;">
      <div style="font-size: 0.625rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-ash); margin-bottom: 6px;">项目更新</div>
      <div style="font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 600; color: var(--color-ink); line-height: 1.1; margin-bottom: 12px;">Q1 设计冲刺</div>
      <p style="font-size: 0.8125rem; color: color-mix(in oklch, var(--color-ink) 65%, transparent); line-height: 1.65; margin: 0 0 14px; max-width: 30ch;">团队已经完成仪表盘改版，核心组件已通过评审并确认上线方向。</p>
      <div style="font-size: 0.6875rem; color: var(--color-ash); font-variant-numeric: tabular-nums;">2 小时前更新</div>
    </div>
  `
};
