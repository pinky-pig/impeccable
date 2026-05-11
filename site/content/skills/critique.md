---
tagline: "带评分、persona 测试与自动检测的一次设计评审。"
---

<div class="docs-viz-hero">
  <div class="docs-viz-critique">
    <div class="docs-viz-critique-head">
      <div class="docs-viz-critique-verdict">
        <span class="docs-viz-critique-verdict-label">AI slop 判定</span>
        <span class="docs-viz-critique-verdict-value">FAIL</span>
      </div>
      <span class="docs-viz-report-target">gradient-text &middot; ai-color-palette &middot; nested-cards</span>
    </div>
    <div class="docs-viz-critique-cols">
      <div>
        <div class="docs-viz-critique-col-title">启发式（Nielsen）</div>
        <div class="docs-viz-critique-heuristics">
          <div class="docs-viz-critique-heur">
            <span>状态可见性</span>
            <span class="docs-viz-critique-heur-score docs-viz-critique-heur-score--good">3</span>
          </div>
          <div class="docs-viz-critique-heur">
            <span>符合真实世界</span>
            <span class="docs-viz-critique-heur-score docs-viz-critique-heur-score--ok">2</span>
          </div>
          <div class="docs-viz-critique-heur">
            <span>一致性与规范</span>
            <span class="docs-viz-critique-heur-score docs-viz-critique-heur-score--ok">2</span>
          </div>
          <div class="docs-viz-critique-heur">
            <span>错误预防</span>
            <span class="docs-viz-critique-heur-score docs-viz-critique-heur-score--good">3</span>
          </div>
          <div class="docs-viz-critique-heur">
            <span>识别优于回忆</span>
            <span class="docs-viz-critique-heur-score docs-viz-critique-heur-score--bad">1</span>
          </div>
        </div>
      </div>
      <div>
        <div class="docs-viz-critique-col-title">Persona</div>
        <div class="docs-viz-critique-personas">
          <div class="docs-viz-critique-persona">
            <div>
              <span class="docs-viz-critique-persona-name">评估者</span>
              <span class="docs-viz-critique-persona-note">周二晚上，在两家替代方案之间来回比较。</span>
            </div>
            <span class="docs-viz-critique-persona-score">2 / 4</span>
          </div>
          <div class="docs-viz-critique-persona">
            <div>
              <span class="docs-viz-critique-persona-name">回访用户</span>
              <span class="docs-viz-critique-persona-note">熟悉产品，正在手机上，时间很赶。</span>
            </div>
            <span class="docs-viz-critique-persona-score">3 / 4</span>
          </div>
          <div class="docs-viz-critique-persona">
            <div>
              <span class="docs-viz-critique-persona-name">怀疑者</span>
              <span class="docs-viz-critique-persona-note">看过太多 SaaS 落地页，已经审美疲劳。</span>
            </div>
            <span class="docs-viz-critique-persona-score">1 / 4</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p class="docs-viz-caption">两条评估路径（LLM 设计评审 + 确定性检测器）会最终合并成一份优先级清单：哪里做对了，哪里该改，以及上线前值得你认真回答的那些尖锐问题。</p>
</div>

## 适用场景

当你已经把一个页面做出来，但想听一次真正诚实的第二意见时，就用 `/impeccable critique`。它问的不是“能不能用”，而是“做得好不好”。这条 skill 会用 Nielsen 的 10 条启发式原则给你的界面打分，检查认知负担，从不同 persona 视角测试体验，并交叉引用自动检测器对 25 个具体 anti-pattern 的结果。

如果一个页面功能上已经完成，而你想知道它看起来究竟是“有意图的设计”，还是“AI slop”，那就是 critique 的场景。

## 工作方式

`/impeccable critique` 会并行运行两套彼此独立的评估，避免它们相互污染判断。

第一套是 **LLM design review**：模型会读取你的源码，在浏览器自动化可用时也会直接视觉检查真实页面，并对照 impeccable skill 的完整 DO / DON'T 清单逐项审视。它会给 Nielsen 启发式打分，统计认知负担问题，追踪流程中的情绪路径，并直接标记 AI slop。

第二套是 **automated detector**（`npx impeccable detect`）：它会确定性地找出 gradient text、紫色调色盘、side-tab 边框、nested cards、行长问题，以及其他 generic AI 输出的明显指纹。

两份报告最终会被合并成一份按优先级排序的结果：哪里是有效的，哪三到五件事最值得先修，以及有哪些问题是界面本身无法替你做决定、但上线前必须回答的。

## 试试看

直接把它指向某个页面：

```text
/impeccable critique the homepage hero
```

你会得到一份带评分的评审报告。常见结构大概是：

- **AI slop verdict**：通过 / 不通过，以及具体踩中了哪些 tell
- **Heuristic scores**：10 个 0 到 4 的分数
- **Cognitive load**：8 项指标中失败了几项
- **Priority issues**：三到五条高优先级问题，每条都包含是什么、为什么、怎么改
- **Questions to answer**：那些界面自己无法替你决定，但你必须表态的问题

接下来通常就可以配合 `/impeccable polish` 或 `/impeccable distill` 去执行修正。

## 常见误区

- **拿未完成的页面来跑。** Critique 面向“做完了”的页面。一个还挂着三个 TODO 的空状态分数低，不代表它设计差，只代表它根本还没完成。
- **忽略报告最后的问题。** 真正能大幅改变设计质量的，往往就是那些问题。
- **把启发式分数当成绩单。** 它们是诊断指标，不是最终裁决。某条在你当前场景里没那么重要的启发式拿到 3/4，本来就可能完全没问题。
