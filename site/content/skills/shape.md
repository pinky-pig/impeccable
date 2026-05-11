---
tagline: "先思考，再动手。通过发现式访谈产出设计 brief，而不是靠猜。"
---

<div class="docs-viz-hero">
  <div class="docs-viz-file">
    <div class="docs-viz-file-header">
      <span class="docs-viz-file-name">brief.md</span>
      <span class="docs-viz-file-status">/impeccable shape 的输出</span>
    </div>
    <div class="docs-viz-file-body">
      <div class="docs-viz-file-row">
        <span class="docs-viz-file-k">Purpose</span>
        <span class="docs-viz-file-v">让已经订阅的用户能改掉接收内容，而不是直接把他们逼到退订。</span>
      </div>
      <div class="docs-viz-file-row">
        <span class="docs-viz-file-k">User</span>
        <span class="docs-viz-file-v">匆忙、在手机上、会议中途。阅读速度快，耐心很低。</span>
      </div>
      <div class="docs-viz-file-row">
        <span class="docs-viz-file-k">Content</span>
        <span class="docs-viz-file-v">4 种摘要类型、2 种频率，最底部有一个全部退订入口。</span>
      </div>
      <div class="docs-viz-file-row">
        <span class="docs-viz-file-k">Feeling</span>
        <span class="docs-viz-file-v">冷静、可信、没有暗黑诱导。</span>
      </div>
      <div class="docs-viz-file-row">
        <span class="docs-viz-file-k">Constraints</span>
        <span class="docs-viz-file-v">移动优先，WCAG AA 对比度，单列布局，不用 modal。</span>
      </div>
    </div>
    <div class="docs-viz-file-footer">把它交给 <code>/impeccable</code>、<code>/impeccable craft</code>，或任何实现流程。</div>
  </div>
  <p class="docs-viz-caption">shape 产出的 brief 更像指南针，而不是规格书。它定义的是意图，不是 UI。实现类 skill 会在写第一行代码之前先读它。</p>
</div>

## 适用场景

`/impeccable shape` 是一个功能真正开始的地方。在任何人写代码之前，在任何人争论 hero 应该长什么样之前，在任何人决定用哪套字体之前，先跑它。它会强制你完成一段关于目的、用户、内容和约束的发现式对话，并把结果固化成实现类 skill 可以依赖的设计 brief。

只要符合下面任意一种情况，就适合 shape：

- 一个新功能准备开始；
- 需求单写得很模糊；
- 你发现自己已经开始写 JSX，但其实还没想清楚这个产品到底应该长成什么样。

## 工作方式

大多数 AI 生成界面失败，不是因为代码质量差，而是因为思考步骤被跳过了。模型很容易直接跳到“这里给你一个 card grid”，却从来没问过“用户到底要完成什么任务”。`/impeccable shape` 做的事，就是把这个顺序反过来。

它会在对话中运行一段结构化的发现式访谈。在这个阶段，它不会写代码。问题会覆盖四个方向：

- **Purpose and context**：这个功能是干什么的，谁来用，使用时的状态和场景是什么；
- **Content and data**：会展示什么，真实数据范围如何，边界情况有哪些，哪些内容是动态的；
- **Design goals**：最重要的一件事是什么，希望用户感受到什么，有没有参考对象；
- **Constraints**：技术约束、内容约束、无障碍要求、本地化要求。

你只需要自然回答。skill 会继续追问，而不是给你一张表格。最后，它会产出一份结构化设计 brief，你可以把它交给 `/impeccable` 或任何其他实现 skill。

补充一点：如果你想要的是“先做发现式访谈，然后立刻进入构建”的完整流程，那就直接用 `/impeccable craft`。它会在内部先跑 `/impeccable shape`，然后接着进入实现与可视化迭代。`/impeccable shape` 单独使用时，更适合你只想先得到 brief，再决定后面怎么实现。

## 试试看

```text
/impeccable shape a daily digest email preferences page
```

你通常会经历 5 到 10 个问题。skill 可能会问你类似这样的问题：“打开这个页面的人是谁？他们已经是忠实订阅者，还是只是还在犹豫？”、“如果用户把所有内容都退订了，我们是隐藏整个功能，还是清楚地告诉他接下来会发生什么？” 你回答之后，一份 brief 就会逐渐成型。

从这一步开始，你可以把它交给 `/impeccable`、`/impeccable polish`，或任何其他 skill。也可以只把它当作手工实现时的参照物。

## 常见误区

- **因为它“看起来慢”就跳过。** 访谈大概也就 5 分钟，但它能帮你省掉的返工，往往按小时算。
- **把 brief 当成规格书。** 它是指南针，不是清单。它承载的是意图，不是 UI 明细。
- **回答里只给“标准”“普通”这种词。** 具体性就是这个流程存在的意义。如果用户是“匆忙、在手机上、夹在会议之间”，就应该这样说出来。这会改变后面的一切判断。
