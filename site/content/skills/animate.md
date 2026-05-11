---
tagline: "有目的的动效，用来传达状态，而不是装饰。"
---

## 适用场景

`/impeccable animate` 适合那些“界面功能上没问题，但死气沉沉”的场景：状态切换太突兀、加载像是突然弹出来、用户甚至不确定自己的点击有没有生效。它要加上的，不是花哨，而是那些真正能解释“现在发生了什么”的小动作：进入、退出、反馈、状态切换。

它不适合为了“更有活力”而强行加 bounce 或弹簧动画。那只是装饰，而不是这条 skill 要做的事。

## 工作方式

这条 skill 会先找出哪些静态时刻其实值得有动效，再用非常克制的方式补进去：

1. **进入与退出**：元素出现和离开时，用 200 到 300ms 的淡入淡出，配合轻微的 Y 轴位移或缩放，绝不动布局属性。
2. **状态反馈**：hover、active、focus、loading、success 都应该通过动效传达，而不是靠突然切换。
3. **视图切换**：合适时用 shared-element transitions，不合适时就用简单的 fade-through。
4. **进度与加载**：skeleton、确定性进度条，以及明确告诉用户“仍在工作中”的动画。
5. **Reduced motion**：每一段动画都必须带 `prefers-reduced-motion` 回退。

默认 easing 永远是指数型（ease-out-quart、quint 或 expo），因为现实物体是平滑减速的。除了进度条之外，不要用 bounce、不要用 elastic、也不要用 linear。

这条 skill 只会动 `transform` 和 `opacity`。如果你发现自己在动画 `width`、`height`、`top` 或 `left`，那就已经走偏了。做高度过渡时请改用 `grid-template-rows`。

## 试试看

```text
/impeccable animate the sign-up flow
```

常见追加内容：

- 邮箱输入框在 focus-visible 时出现柔和光晕（opacity + shadow，180ms）
- 提交按钮的 loading 态把 spinner 放进按钮内部，而不是额外塞一个 spinner 在旁边
- 成功页面用 opacity + translateY(8px) 进入，260ms，ease-out-quart
- 错误信息用 `grid-template-rows` 下滑展开，而不是直接改 `height`
- 每一段过渡都补上 `@media (prefers-reduced-motion: reduce)` 回退

## 常见误区

- **只说“我想要更多动画”。** Animate 不是一个可随便调大的旋钮。它只会在动效能传达信息的地方出手，不会到处乱加。
- **删掉 reduced-motion 回退。** 这是无障碍的硬要求。skill 会自动补，你不应该再把它删掉。
