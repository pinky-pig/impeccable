---
tagline: "从 LCP 到 bundle size，定位并修掉 UI 性能问题。"
---

## 适用场景

`/impeccable optimize` 适合那些“明显很慢”的界面：首屏迟迟不出、滚动卡顿、图片晚到、交互有延迟、bundle 一上来就发 800KB JavaScript。只要 Web Vitals 很难看，或者用户已经直接开始抱怨“这东西有点拖”，就该用它。

它不适合做过早优化。如果 LCP 已经 1.1s、INP 也只有 80ms，那就别再折腾了，把时间还给设计本身更值。

## 工作方式

这条 skill 会沿着五个性能维度工作：

1. **Loading and Web Vitals**：LCP、INP、CLS。找出首屏为什么慢、交互为什么迟、布局为什么会跳。
2. **Rendering**：无意义的重复渲染、缺失的 memoization、昂贵的 reconciliation、循环中的 layout thrash。
3. **Animations**：是不是在动布局属性、是否只动了 transform 和 opacity、这里的 `will-change` 到底是在帮忙还是在添乱。
4. **Images and assets**：lazy loading、响应式图片（`srcset`、`sizes`）、现代格式（WebP、AVIF）、以及防止 CLS 的固定尺寸。
5. **Bundle size**：未使用 import、过大的依赖、缺少 code-splitting、死代码。

它要求先量化，再动手。每一个修复都应该带来一个可度量的变化。如果某个改动没有推动指标，它就应该被回滚。

## 试试看

```text
/impeccable optimize the homepage
```

典型结果大概会像这样：

```text
LCP: 3.2s → 1.4s
  - 预加载 hero 图片（-800ms）
  - 移除阻塞渲染的字体样式表（-240ms）
  - 延后 analytics 脚本（-180ms）

INP: 240ms → 90ms
  - 给 scroll handler 做 debounce
  - 给昂贵列表渲染补上 memoization
  - 移除事件循环里的同步布局读取

CLS: 0.18 → 0.02
  - 给 hero 图片和 logo 设置固定尺寸
  - 给异步 header badge 预留空间

Bundle: 340KB → 180KB
  - 移除未使用的 lodash import（52KB）
  - 给 playground route 做 code-splitting（78KB）
  - 删掉废弃 icon set（30KB）
```

## 常见误区

- **没测量就开始优化。** 没有 baseline，你根本不知道哪个修改真的有用。跑 `/impeccable optimize` 时，请带上具体 Web Vitals 数字，而不是“感觉有点慢”。
- **追逐太小的收益。** 如果一个需要一周才能落地的改动，只换来 INP 提升 20ms，大概率不值。优化收益会递减，要知道什么时候停。
- **改完以后不复测。** 你以为有帮助的改动，完全可能在别处把事情搞得更糟。每一轮都要重新验证。
