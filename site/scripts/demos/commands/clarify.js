// Clarify command demo - shows confusing UX copy becoming clear
export default {
  id: 'clarify',
  caption: '模糊文案 → 清晰且可执行的表达',

  before: `
    <div style="width: 100%; max-width: 260px; display: flex; flex-direction: column; gap: 12px;">
      <div style="padding: 12px; background: #f5f5f5; border-radius: 6px;">
        <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">处理状态</div>
        <div style="font-size: 12px; color: #666;">你的请求正在处理中，请稍候。完成时间可能会受到多种因素影响。</div>
      </div>
      <div style="padding: 12px; background: #fff8e1; border-radius: 6px;">
        <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">⚠️ 警告</div>
        <div style="font-size: 12px; color: #666;">继续执行该操作，可能会对你的数据和设置造成不可逆影响。</div>
      </div>
      <button style="padding: 10px; background: #333; color: white; border: none; border-radius: 4px; font-size: 13px;">提交请求</button>
    </div>
  `,

  after: `
    <div style="width: 100%; max-width: 260px; display: flex; flex-direction: column; gap: 12px;">
      <div style="padding: 12px; background: var(--color-paper); border: 1px solid var(--color-mist); border-radius: 6px;">
        <div style="font-size: 0.8125rem; font-weight: 600; color: var(--color-ink); margin-bottom: 4px;">正在保存更改……</div>
        <div style="font-size: 0.75rem; color: var(--color-ash);">预计还需约 10 秒</div>
        <div style="margin-top: 8px; height: 4px; background: var(--color-mist); border-radius: 2px; overflow: hidden;">
          <div style="width: 60%; height: 100%; background: var(--color-accent);"></div>
        </div>
      </div>
      <div style="padding: 12px; background: #fef3c7; border: 1px solid #fcd34d; border-radius: 6px;">
        <div style="font-size: 0.8125rem; font-weight: 600; color: #92400e; margin-bottom: 4px;">Delete this project?</div>
        <div style="font-size: 0.75rem; color: #854d0e; line-height: 1.5;">This will permanently delete 23 files. You can't undo this.</div>
      </div>
      <button style="padding: 10px; background: var(--color-ink); color: var(--color-paper); border: none; border-radius: 6px; font-size: 0.8125rem; font-weight: 500;">保存并继续 →</button>
    </div>
  `
};
