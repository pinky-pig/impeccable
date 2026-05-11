---
title: 用可视覆盖层做 critique
tagline: "把 /impeccable critique 和浏览器覆盖层一起用，在真实页面上带着证据做评审。"
order: 4
description: "运行一份完整设计评审，把 LLM 判断、自动检测器和浏览器可视覆盖层合在一起，这样你能直接看到页面上到底是哪些元素触发了哪些 anti-pattern。"
---

## 你会得到什么

你会在浏览器里的真实页面上，跑完一次完整设计 critique，而且每一条被标记出来的 anti-pattern 都会直接高亮在触发它的那个元素上。没有截图，没有猜测，也不需要再把一整段 findings 手动映射回代码。

总耗时大约十分钟。

## 前置条件

- 你的项目里已经安装好 Impeccable（如果还没有，先看 [快速开始](/tutorials/getting-started)）。
- 你所用的 harness 能进行浏览器自动化（例如装了 Chrome 扩展的 Claude Code，或其他同等级能力的环境）。
- 一张你想批评的页面，本地的（如 `localhost:3000/pricing`）或已经部署上线的都可以。

## 第 1 步：运行 `/impeccable critique`

在 harness 里执行：

```text
/impeccable critique the pricing page at localhost:3000/pricing
```

这个 skill 会并行启动两套彼此独立的评估流程。它们会跑在不同的 sub-agent 里，避免一个结论提前污染另一个判断。

### LLM 评估会做什么

第一套评估会读取你的源码；如果浏览器自动化可用，还会把真实页面打开到一个新标签页里。然后它会沿着 impeccable skill 的完整 DO / DON'T catalog 逐项走查，按照 Nielsen 的 10 条启发式、8 项 cognitive load checklist，以及你在 `PRODUCT.md` 里定义的品牌适配度来评分。

它会把自己打开的标签页标题打上 `[LLM]`，方便你区分。

### 自动检测器会做什么

第二套评估会对页面运行 `npx impeccable detect`。这是确定性的：大约 30 条具体规则，要么命中，要么不命中。gradient text、紫色调色盘、side-tab 边框、nested cards、行长问题、低对比度、正文太小，以及其他一整套 tell 都在这里。

最终你会拿到一份 JSON 风格的 findings 列表，里面写着每条命中的 selector、触发的规则，以及一行简短说明。

## 第 2 步：打开可视覆盖层

Impeccable 自带 visual mode，会把每一条检测结果直接标到真实页面上。下面这个例子，跑的是一个故意做坏的 synthwave landing page：

<div class="tutorial-embed">
  <div class="tutorial-embed-header">
    <span class="tutorial-embed-dot red"></span>
    <span class="tutorial-embed-dot yellow"></span>
    <span class="tutorial-embed-dot green"></span>
    <span class="tutorial-embed-title">实时检测覆盖层</span>
  </div>
  <iframe src="/antipattern-examples/visual-mode-demo.html" class="tutorial-embed-iframe" loading="lazy" title="Impeccable visual overlay running on a demo page"></iframe>
</div>

每个被框出来的元素都会带一个浮动标签，直接写明触发了哪条规则。悬停 outline，还能看到完整 finding。你在自己的页面上看到的就是这个东西。

打开它有两种方式：

1. **[Chrome 扩展](https://chromewebstore.google.com/detail/impeccable/bdkgmiklpdmaojlpflclinlofgjfpabf)**：对任何页面一键启用。点击浏览器工具栏里的 Impeccable 图标，所有 anti-pattern 会立刻被高亮出来。
2. **直接在 `/impeccable critique` 里打开**：skill 在浏览器阶段会自动打开一个标题带 `[Human]` 的标签页，并把检测器激活。你不需要额外做任何事。

这篇教程里，最省事的做法就是直接用 Chrome 扩展。装好之后，打开你的 pricing page，点击 Impeccable 图标，覆盖层会立刻出现在真实页面上。

## 第 3 步：把两套评估合并起来读

回到 harness 里，此时 `/impeccable critique` 已经跑完，并生成了一份合并报告。结构大致像这样：

```text
AI slop 判定：FAIL
  命中的 tell：gradient-text (2)、ai-color-palette (1)、
                nested-cards (1)、side-tab (3)

启发式得分（平均 2.8 / 4）：
  状态可见性：3（好）
  系统与真实世界的匹配：2（部分成立）
  一致性与规范：2（部分成立）
  ...

认知负担：8 项里有 3 项失败（中等）
  主要决策点可见选项数：6（命中）
  关键决策点是否堆在顶部：是（命中）
  高级定价开关是否采用渐进披露：没有

做得对的地方：
  - 价格层级清晰
  - 标题力度够强

优先级问题：
  1. Hero 的主价格用了 gradient text
     原因：典型 AI tell，降低对比度，也削弱扫读效率
     修法：换成实色 ink 文本，并把字重再提一档
  2. 功能对比区叠了 4 层 nested cards
     原因：视觉噪音高，层级关系不清晰
     修法：压平成真正的表格，靠 zebra striping 建结构

需要你拍板的问题：
  - 免费版究竟是一个真实产品，还是一个 funnel？
  - 用户从广告点进来和从搜索进来，第一感受应该一样吗？
```

## 第 4 步：照着 findings 去修

报告会给你一个按优先级排序的列表。你可以一条条修，可以让模型一次性全改，也可以混着来。关键不是“怎么分批”，而是“始终把 overlay 开着验证”：

1. 保持 overlay 标签页开着。
2. 在代码里修，或者让模型去修。
3. 刷新页面。overlay 会重新扫描，已经解决的 findings 会直接消失。

这就是 overlay 真正有价值的地方。你能实时看到修正是否真的生效，不会再把一个根本没满足规则的“修复”误以为完成。

## 第 5 步：修完后再跑一次

当你把优先级列表处理完之后，再运行一遍 `/impeccable critique`。理想状态是 AI slop verdict 变成 clean，启发式平均分至少到 3.5 左右，cognitive load failures 控制在 2 条以下。

如果还有规则在触发，就继续修；如果你确定这条规则在当前上下文不适用，再加 suppression comment 解释原因（检测器支持少量 opt-out pragma，但请克制使用）。

## 接下来可以做什么

- [用实时模式继续迭代 critique 里点名的元素](/tutorials/iterate-live)：选中被 critique 标记的元素，丢一句评论，让 3 个重定向方案直接热替换进页面，再把你接受的那个写回源码。
- `/impeccable audit the same page`：抓 critique 不会覆盖的实现层问题，例如无障碍、性能、主题和响应式。
- `/impeccable polish`：如果 critique 已经很干净，但你还想做最后一轮细节打磨，就用它。
- `/impeccable distill`：如果 critique 反复指出“太忙”“认知负担太高”，distill 是更直接的下一步。

## 常见问题

- **overlay 上没有任何 findings，但 critique 明明说有问题**：检测器抓的是确定性模式，critique 抓的是判断题。它们互补，不是彼此重复。
- **LLM 评估和检测器给出的结论互相矛盾**：很正常。LLM 是主观判断，检测器是确定性规则。当它们冲突时，就把两边都看一遍，再自己做决定。
- **overlay 反而把页面布局弄坏了**：这种情况不常见，但确实可能发生，尤其是某些 CSS 会和注入层的样式冲突。优先使用 [Chrome 扩展](https://chromewebstore.google.com/detail/impeccable/bdkgmiklpdmaojlpflclinlofgjfpabf)，它通常最稳；或者直接用 CLI 跑 `npx impeccable detect`，再手动应用 findings。
