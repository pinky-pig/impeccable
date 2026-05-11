---
tagline: "覆盖五个维度、带 P0 到 P3 严重级别的技术质量检查。"
---

<div class="docs-viz-hero">
  <div class="docs-viz-report">
    <div class="docs-viz-report-head">
      <div>
        <div class="docs-viz-report-title">/impeccable audit the checkout flow</div>
        <div class="docs-viz-report-target">src/checkout/**</div>
      </div>
      <div class="docs-viz-report-score">
        <span class="docs-viz-report-score-num">2.6</span>
        <span class="docs-viz-report-score-out">/ 4</span>
      </div>
    </div>
    <div class="docs-viz-report-dims">
      <div class="docs-viz-report-dim">
        <span class="docs-viz-report-dim-name">无障碍</span>
        <span class="docs-viz-report-dim-bar"><span class="docs-viz-report-dim-fill docs-viz-report-dim-fill--fail" style="width:50%"></span></span>
        <span class="docs-viz-report-dim-score">2 / 4</span>
      </div>
      <div class="docs-viz-report-dim">
        <span class="docs-viz-report-dim-name">性能</span>
        <span class="docs-viz-report-dim-bar"><span class="docs-viz-report-dim-fill" style="width:75%"></span></span>
        <span class="docs-viz-report-dim-score">3 / 4</span>
      </div>
      <div class="docs-viz-report-dim">
        <span class="docs-viz-report-dim-name">主题一致性</span>
        <span class="docs-viz-report-dim-bar"><span class="docs-viz-report-dim-fill docs-viz-report-dim-fill--warn" style="width:62%"></span></span>
        <span class="docs-viz-report-dim-score">2.5 / 4</span>
      </div>
      <div class="docs-viz-report-dim">
        <span class="docs-viz-report-dim-name">响应式</span>
        <span class="docs-viz-report-dim-bar"><span class="docs-viz-report-dim-fill" style="width:75%"></span></span>
        <span class="docs-viz-report-dim-score">3 / 4</span>
      </div>
      <div class="docs-viz-report-dim">
        <span class="docs-viz-report-dim-name">Anti-patterns</span>
        <span class="docs-viz-report-dim-bar"><span class="docs-viz-report-dim-fill docs-viz-report-dim-fill--warn" style="width:70%"></span></span>
        <span class="docs-viz-report-dim-score">2.8 / 4</span>
      </div>
    </div>
    <div class="docs-viz-report-issues">
      <span class="docs-viz-report-sev docs-viz-report-sev--p0">P0<span class="docs-viz-report-sev-n">2</span></span>
      <span class="docs-viz-report-sev docs-viz-report-sev--p1">P1<span class="docs-viz-report-sev-n">5</span></span>
      <span class="docs-viz-report-sev docs-viz-report-sev--p2">P2<span class="docs-viz-report-sev-n">8</span></span>
      <span class="docs-viz-report-sev docs-viz-report-sev--p3">P3<span class="docs-viz-report-sev-n">14</span></span>
    </div>
  </div>
  <p class="docs-viz-caption">五个维度统一按 0 到 4 评分，每个发现再标记 P0（阻塞上线）到 P3（打磨项）。Audit 只负责记录问题，不直接修复。后续可以把问题分流给 <code>/impeccable harden</code>、<code>/impeccable polish</code> 或 <code>/impeccable optimize</code>。</p>
</div>

## 适用场景

`/impeccable audit` 是 `/impeccable critique` 的技术面对应物。`critique` 问的是“感觉对不对”，而 `audit` 问的是“经不经得住”。它会对实现结果运行无障碍、性能、主题一致性、响应式与 anti-pattern 检查，分别打出 0 到 4 的分数，并产出一份按 P0 到 P3 严重级别排序的计划。

适合在上线前、质量冲刺期间，或者任何技术负责人开始说“我们确实该认真看看无障碍了”的时候使用。

## 工作方式

这条 skill 会沿着五个维度扫描你的代码：

1. **无障碍**：WCAG 对比度、ARIA、键盘导航、语义化 HTML、表单标签。
2. **性能**：布局抖动、昂贵动画、缺失的 lazy loading、bundle 体积。
3. **主题一致性**：硬编码颜色、暗色模式覆盖、token 使用是否一致。
4. **响应式**：断点行为、触控目标、移动端 viewport 处理。
5. **Anti-patterns**：检测器里那 25 条确定性检查。

每个维度都会得到一个 0 到 4 的分数；每个发现都会得到一个严重级别：P0 阻塞发布，P1 应该在本迭代修掉，P2 可以排到下一周期，P3 属于打磨项。最终你拿到的是一份可以直接贴进 ticket 系统里的统一报告。

Audit 不直接修任何东西。它负责记录问题。之后再根据问题类型，把它们转给 `/impeccable polish`、`/impeccable harden` 或 `/impeccable optimize`。

## 试试看

```text
/impeccable audit the checkout flow
```

典型输出会长这样：

```text
Accessibility: 2/4 (partial)
  P0: 4 个输入框缺少表单标签
  P1: disabled 按钮状态对比度只有 3.1:1
  P2: 自定义下拉框没有可见 focus 样式

Performance: 3/4 (good)
  P1: hero 图片没有 lazy-load（340KB）
  ...
```

通常的做法是：把 P0 交给 `/impeccable harden`，把主题和排版相关的 P1 交给 `/impeccable typeset` 与 `/impeccable polish`，其余问题继续归给 `/impeccable polish`。

## 常见误区

- **把它和 `/impeccable critique` 混为一谈。** Audit 看的是实现质量，critique 看的是设计质量。要完整判断，两者都跑。
- **先修 P3，再看 P0。** 既然有严重级别，就按它来。先从最高优先级开始。
- **把你“自认为没问题”的维度跳过。** Theming 和 responsive 往往正是大家最容易主观觉得没问题、实际上却最常出错的地方。
