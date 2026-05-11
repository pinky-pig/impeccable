---
tagline: "先把设计方向塑出来，再一次性把它真正做出来。"
---

<div class="docs-viz-hero">
  <div class="docs-viz-flow">
    <div class="docs-viz-flow-step">
      <span class="docs-viz-flow-num">01</span>
      <span class="docs-viz-flow-name">Shape</span>
      <span class="docs-viz-flow-hint">发现式访谈：目的、用户、约束、方向。</span>
    </div>
    <div class="docs-viz-flow-step">
      <span class="docs-viz-flow-num">02</span>
      <span class="docs-viz-flow-name">Load references</span>
      <span class="docs-viz-flow-hint">空间、排版、动效、色彩、交互。</span>
    </div>
    <div class="docs-viz-flow-step">
      <span class="docs-viz-flow-num">03</span>
      <span class="docs-viz-flow-name">Build</span>
      <span class="docs-viz-flow-hint">结构、层级、字体、色彩、状态、动效、响应式。</span>
    </div>
    <div class="docs-viz-flow-step docs-viz-flow-step--accent">
      <span class="docs-viz-flow-num">04</span>
      <span class="docs-viz-flow-name">Iterate visually</span>
      <span class="docs-viz-flow-hint">进浏览器对照 brief 持续修，直到真正对上。</span>
    </div>
  </div>
  <p class="docs-viz-caption">这四个阶段都不能跳。大多数 AI 输出的失败点就卡在 discovery：一旦代码先写出来，思考就已经被锁死了。</p>
</div>

## 适用场景

`/impeccable craft` 是一条端到端的构建命令。你给它一个功能描述，它就会把整条链路跑完：结构化 discovery、参考材料加载、实现落地、可视化迭代。最适合在你从零开始做一个新功能时使用，而且你希望一次调用里把完整流程都走完。

尤其适合下面几种情况：

- **你要从零做一个新功能，而且想直接走完整流程。** 不想自己拆 discovery、设计、实现和打磨。
- **你知道要做什么，但还不知道它应该长什么样。** discovery 阶段会强迫设计判断发生在实现之前，而不是等实现写死后再返工。
- **你希望默认就带浏览器内迭代。** `craft` 会在浏览器里检查结果并继续打磨，而不是把第一个“能跑”的版本当成终稿。

如果你只想做思考、不想马上写代码，用 `/impeccable shape` 就够了。如果你已经有非常明确的视觉方向，只想快速把它做出来，可以直接调用 `/impeccable` 并附上需求描述。`craft` 的位置就在两者之间：结构化、完整、而且带明确主张。

## 工作方式

`craft` 会按顺序跑完四个阶段：

1. **Shape the design.** 在内部先调用 `/impeccable shape`：一段很短的 discovery 对话，弄清楚目的、用户、内容、约束与目标。输出是一份你可以阅读、也可以反驳的设计 brief。
2. **Load references.** 根据 brief，把正确的参考文件一起拉进上下文：空间、排版、动效、色彩、交互、响应式、UX writing，让模型在开始编码之前先拥有对应原则。
3. **Build.** 按一个有意识的顺序实现功能：先结构，再空间和层级，再排版和色彩，再状态，再动效，再响应式。每一个决策都应该能追溯回那份 brief。
4. **Visual iteration.** 把结果打开到浏览器里，对照 brief 和 anti-pattern 清单继续修，直到它真正接近原本的意图。这一步非常关键。第一个“能工作”的版本，从来都不应该直接上线。

Discovery 不能跳，这恰恰是重点。大多数 AI 界面之所以廉价，不是因为代码写错了，而是因为没有人在模型开始写 JSX 之前先问一句：用户到底要完成什么。

## 试试看

```text
/impeccable craft a pricing page for a developer tool
```

预期你会先经历 5 到 10 个 discovery 问题：受众是谁、产品人格是什么、你希望整体情绪是什么、有哪些反参考、有哪些约束。然后它会给出设计 brief，再进入实现；浏览器会在每个阶段被拉起来做可视化检查。最后在视觉打磨阶段，通常还会再来回迭代几轮。

整个执行时间会比普通命令更长，因为它把“想清楚”“做出来”“继续磨”三件事都包进了一次运行里。这就是它的 trade-off：前面更讲究结构，后面更少返工。

## 常见误区

- **拿它做小修小补。** `craft` 是给新功能用的，不是做 touch-up。已有代码要细修，请直接用 `/impeccable polish`、`/impeccable critique`，或对应的单维度命令。
- **急着跳过 discovery。** 访谈相较于“直接开写”确实显得慢，但那不是浪费。回答越认真，brief 越准，构建越准，返工越少。
- **跳过 visual iteration。** 这一步存在是有原因的。“技术上能跑”和“看起来对了”之间的差距，靠的是视觉打磨，不是单纯 code review。让它把这一轮跑完。
