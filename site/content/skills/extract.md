---
tagline: "把可复用组件、tokens 和模式抽回设计系统。"
---

<div class="docs-viz-hero">
  <div class="docs-viz-flow">
    <div class="docs-viz-flow-step">
      <span class="docs-viz-flow-num">01</span>
      <span class="docs-viz-flow-name">发现漂移</span>
      <span class="docs-viz-flow-hint">重复的十六进制颜色、按钮变体、间距刻度、文本样式。</span>
    </div>
    <div class="docs-viz-flow-step">
      <span class="docs-viz-flow-num">02</span>
      <span class="docs-viz-flow-name">提出 primitives</span>
      <span class="docs-viz-flow-hint">token 命名、带 variant + size 的组件 API、文本样式。</span>
    </div>
    <div class="docs-viz-flow-step docs-viz-flow-step--accent">
      <span class="docs-viz-flow-num">03</span>
      <span class="docs-viz-flow-name">迁移调用点</span>
      <span class="docs-viz-flow-hint">用新的 primitives 替换重复 CSS，不留下孤儿代码。</span>
    </div>
  </div>
  <p class="docs-viz-caption">这条 skill 只会提取那些以同一意图被使用三次以上的东西。两次还不算模式，而且迁移动作一定会在同一轮里完成。</p>
</div>

## 适用场景

`/impeccable extract` 适合那种“代码库不知不觉已经长成设计系统了”的时刻：12 个地方重复写按钮样式，同一张卡片冒出 3 个变体，十六进制颜色散落一地，手搓间距恰好又暗合某套刻度。只要你想把这种漂移收束成真正可复用的 primitives，就该用它。

最好在产品已经长出足够多功能、重复模式真的显现出来之后再用。提取得太早，只会制造和现实不匹配的抽象层。

## 工作方式

这条 skill 会先识别设计系统的当前结构，再找出真正值得提取的机会：

1. **Tokens**：找出重复出现的字面值（颜色、间距、圆角、阴影、字号），提出 token 名称，补进 token 系统，再回写替换调用。
2. **Components**：识别带少量变化的重复 UI 模式（按钮、卡片、输入框、modal），提成一个带 variants 的组件，并迁移调用方。
3. **Composition patterns**：识别那些重复出现的布局或交互模式（表单行、工具栏分组、空状态），抽成组合层 primitives。
4. **Type styles**：找出重复的字号 + 字重 + 行高组合，提炼成文本样式。
5. **Animation patterns**：识别重复的 easing、duration 或 keyframe 组合，抽成 motion tokens。

它的原则非常保守：只有那些在同一意图下被使用三次以上的东西，才值得提取。它绝不会因为“以后可能会复用”而提前抽象。过早抽象，比重复代码更糟。

## 试试看

```text
/impeccable extract the button styles
```

典型输出会像这样：

- 在 8 个文件里找到 14 处按钮实例
- 识别出 4 个明确变体：primary（实心强调）、secondary（描边）、ghost（纯文本）、destructive（红色实心）
- 4 个变体共用同一套尺寸刻度（small、default、large）
- 最终提取成 `<Button variant="primary" size="default">`，并由 tokens 驱动样式
- 迁移 14 处调用，删掉约 180 行重复 CSS
- 补上 3 个缺失 token：`--button-radius`、`--button-padding-y`、`--button-padding-x`

## 常见误区

- **提取得太早。** 两次不算模式，三次也许才算。等模式足够明确再出手。
- **过度泛化。** 抽出来的组件应该紧贴当前真实用例，而不是试图提前容纳所有未来可能。需要更多 variants 时，再加也不迟。
- **只提取，不迁移。** 只把新东西抽出来，却不把旧调用点迁过去，只会留下第三种做法。提取和迁移必须在同一轮完成。
- **把“外观相似但意图不同”的东西强行合并。** 两个长得像的按钮，如果一个是主要动作、一个本质上只是链接样式，那它们很可能就不该被并成同一个东西。
