---
tagline: "把一个界面推过常规边界：shader、物理感、60fps、电影式过渡。"
---

## 适用场景

`/impeccable overdrive` 适合那些你就是想“做出惊艳感”的时刻：用 WebGL 的 hero、能吃下一百万行数据的表格、从 trigger 元素里变形长出来的 dialog、带流式反馈的实时校验表单、电影感的页面切换。只有当项目预算允许技术野心，而且结果也真的值得 extraordinary 时，才该用它。

它不适合操作型工具、dashboard，或任何“可靠性比 spectacle 更重要”的东西。Overdrive 的本质，是为效果消耗复杂度；这笔账只有在真正重要的时刻才划得来。

## 工作方式

这条 skill 不会把整站都做花，而是只挑一个时刻，把它推到真正不普通，然后围绕这个点彻底投入。它会用上大多数 AI 生成界面根本不敢碰的手段：WebGL shaders、弹簧物理、Scroll Timeline、View Transitions、canvas animation、GPU 加速滤镜。所有这些效果都必须被预算、被 profiling，也必须在 60fps 下成立，并且带上 reduced-motion fallback。

Overdrive 输出前会显式打出 `──── ⚡ OVERDRIVE ────`，提醒你接下来进入的是更激进的一种模式。你应该预期更大的 diff、新依赖，以及比其他 skill 更深的实现复杂度。

## 试试看

```text
/impeccable overdrive the landing hero
```

一次具体运行，可能会把一个静态 hero 替换成基于鼠标位置驱动的 WebGL shader 背景，再配上利用 Scroll Timeline API 做 mask reveal 的展示标题，以及一个通过 View Transition 变形进入下一页的 CTA。与此同时，还会提供 reduced-motion fallback，把所有这些都优雅地降级成一个干净的静态构图。

## 常见误区

- **到处都用。** Overdrive 之所以有效，就是因为它稀有。每页都电影化，最后就没有任何地方真的电影化。
- **上线时删掉 reduced-motion fallback。** 这是不能谈判的要求。Overdrive 会自动补上，不要把它拿掉。
- **无视性能。** 再惊人的效果也得跑到 60fps。如果它掉帧，就删掉，或者继续优化。缓慢的 spectacle 比简单但顺滑更糟。
- **在底层界面还没站稳时就跑 overdrive。** 基础都不牢，再叠 spectacle，用户只会把它看成转移注意力，而不是 delight。
