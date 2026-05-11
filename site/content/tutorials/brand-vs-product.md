---
title: Brand 还是 Product：先定 register
tagline: "两个世界，两套默认值。register 选对了，后面每个命令都会受益。"
order: 3
description: "Impeccable 把 brand work（落地页、campaign、portfolio）和 product work（app UI、dashboard、工具）视为两种完全不同的世界。学会怎么选 register，以及它会如何改变后面每个命令的输出。"
---

## 先看一眼分叉

同一个元素，两种 register。还是同一块 newsletter signup，只是分别按两个世界去处理。

<div class="docs-viz-hero docs-viz-hero--plain">
  <div class="docs-viz-register">
    <div class="docs-viz-register-side">
      <div class="docs-viz-register-label">
        <span class="docs-viz-register-name">Brand</span>
        <span class="docs-viz-register-lane">编辑感 / 杂志感</span>
      </div>
      <div class="docs-viz-register-frame docs-viz-register-frame--brand">
        <span class="docs-viz-reg-kicker">第 04 期 &nbsp;·&nbsp; 专递</span>
        <h3 class="docs-viz-reg-title">偶尔来一封。</h3>
        <p class="docs-viz-reg-body">像编辑寄来的明信片，大概一个月一次。没有 tracking pixel，也不会假装“只是来看看你”。</p>
        <span class="docs-viz-reg-btn">寄给我一封</span>
      </div>
      <div class="docs-viz-register-notes">
        <span>衬线 display，倾斜字重承担语气</span>
        <span>主色可以大面积浸满画面</span>
        <span>等宽 kicker，整套文案更偏 editorial voice</span>
      </div>
    </div>
    <div class="docs-viz-register-side">
      <div class="docs-viz-register-label">
        <span class="docs-viz-register-name">Product</span>
        <span class="docs-viz-register-lane">工具 / app shell</span>
      </div>
      <div class="docs-viz-register-frame docs-viz-register-frame--product">
        <span class="docs-viz-reg-kicker">Newsletter</span>
        <h3 class="docs-viz-reg-title">订阅产品更新</h3>
        <p class="docs-viz-reg-body">每月一次的产品更新与 release notes，随时可以取消订阅。</p>
        <span class="docs-viz-reg-btn">立即订阅</span>
      </div>
      <div class="docs-viz-register-notes">
        <span>中性 sans，靠 semibold 建立层级</span>
        <span>默认 restrained palette，accent 只用在状态上</span>
        <span>文案短、可扫读、在移动端也容易读</span>
      </div>
    </div>
  </div>
  <p class="docs-viz-caption">下面那张对照表讲规则，这里先看像素层面的差异。</p>
</div>

## 为什么 register 很重要

每个设计任务都属于两个世界之一：

- **Brand**：设计本身就是产品。营销站、落地页、作品集、长篇内容页、campaign surface 都在这里。目标是辨识度。字体、动效、密度、色彩都会更主动地推动“这东西看起来不像同类里任何一个平均解”。
- **Product**：设计服务于产品。app UI、admin、dashboard、工具都在这里。目标是“熟悉感是被赢得的”，而不是“新奇感是被强加的”。熟悉 Linear、Figma、Notion、Raycast、Stripe 的人，应该一眼就愿意信任这个输出。

如果你让同一个 AI 在不点明这个世界观的前提下，同时设计一个 dashboard 和一个 campaign page，它最后大概率会给你两者的平均值。brand surface 会显得太谨慎，product surface 会显得太讲究、太珍贵。register 是 Impeccable 用来避免这件事的核心开关。

Impeccable 在 `PRODUCT.md` 里用一个单独字段记录 register：

```markdown
## Register

product
```

就这么简单：一个裸值，`brand` 或 `product`。所有对 register 敏感的命令（`typeset`、`animate`、`colorize`、`layout`、`bolder`、`quieter`、`delight`）都会根据这里的值，去加载不同的参考文件。

## 两个世界具体怎么分叉

下面不是完整清单，完整规则都在 `brand.md` 和 `product.md` 里。这里先抓形状：

| 维度 | Brand | Product |
|---|---|---|
| **Type lanes** | editorial-magazine、luxury、brutalist、consumer-warm、tech-minimal，全都可能。可以大幅摆动。 | 范围更收敛：中性 sans，加上可选 mono，优先服务密集阅读；fluid type 只留给营销类页面。 |
| **Motion** | 可以有编排过的入场、scroll-driven 段落、装饰性瞬间，但必须有理由。 | 更克制。主要服务状态反馈，动画不负责营造氛围。 |
| **Color** | full palette、Committed、Drenched 都可以成立。 | 默认更偏 restrained。accent 要承载意义，色彩不是装饰。 |
| **Density** | 由叙事来决定。可以很留白，也可以是密集但有规则的多栏。 | 舒适到偏紧凑。每一个像素都要有理由。 |
| **References** | 必须来自正确的现实语境。可以是 *Klim specimen pages* 或 *broadsheet masthead*，绝不能只是“modern SaaS”。 | 参考的是品类里最好的工具。比如 *Linear*、*Figma*、*Notion*、*Raycast*、*Stripe*。 |

同一条命令，比如 `/impeccable typeset`，在两个世界里会挑完全不同的字体。`/impeccable animate` 会调用不同的动效词汇表。`/impeccable layout` 会带着不同的密度默认值进入任务。你不用重新学命令，只要先把 register 这个问题答对，命令自己会跟着变。

## 第 1 步：自己决定，或者继承 Teach 的判断

如果你还没有跑过 `/impeccable teach`，现在就跑：

```text
/impeccable teach
```

Teach 会先扫描代码库，再形成一个判断：像 `/`、`/pricing`、`/blog`、hero 区、scroll-driven 内容这些信号，通常偏向 brand；像 `/app`、`/dashboard`、`/settings`、form、table 这些信号，则通常偏向 product。它会先给你一个假设，而不是完全冷启动地问：

> 从代码库看，这更像一个 product surface。这个判断符合你的意图吗，还是你想把它当成别的东西来处理？

如果项目里确实两者都有（例如产品本身加一个体量不小的营销站），Teach 会追问：哪个 register 才是 **主要表面**。register 默认是按项目设定的，而不是按页面设定，但你在必要时也可以按任务覆盖。

## 第 2 步：确认 register 已经落进 `PRODUCT.md`

打开 `PRODUCT.md`，找到 `## Register` 这一节。这里应该是一个裸值，而不是一段解释性文字：

```markdown
## Register

brand
```

如果这一节不存在，说明你手上的 `PRODUCT.md` 还是 pre-v3.0 的老文件。重新跑一次 `/impeccable teach`，它会识别这个缺口，并补上字段，而不是从头再问一遍所有问题。

## 第 3 步：有需要时再对单个任务覆盖

大多数时候，register 设一次就可以忘掉。但 product 项目偶尔也会需要某个 brand surface，比如一次版本发布的落地页、一次 investor one-pager，这时你没必要把整个项目都翻成 `brand`。

有两种做法：

- **直接在 brief 里点明。** 例如：`/impeccable craft a launch landing for v2, brand register for this one page.` 这次任务只会局部覆盖。
- **给某个 surface 单独写 override。** 如果这个覆盖会长期存在，可以在 `PRODUCT.md` 里显式补一段：`## Register overrides: /launch is brand.` 读取 `PRODUCT.md` 的命令都会尊重这条说明。

## 接下来可以做什么

- 找一条对 register 敏感的命令亲自看差异：在 brand 项目和 product 项目上分别运行 `/impeccable typeset the pricing page`，你会看到字体家族、比例和 pairing 都会明显不同。
- 如果你还没装 Impeccable，先回到 [快速开始](/tutorials/getting-started)。
- Teach 之后立刻跑 `/impeccable document`，把颜色、组件和排版的视觉层也记进 `DESIGN.md`。

## 常见问题

- **register 老是往错误的方向滑**：如果你明明设了 `product`，命令还是不断产出很 brand 的东西，先检查 `PRODUCT.md` 是否放在项目根目录，以及 `## Register` 下是不是一个裸值（不要加解释，只写那个词）。命令只能读取你真的写进去的内容。
- **Teach 的判断一开始就错了**：直接在回答里反对它。Teach 是在问你，不是在替你拍板。
- **项目真的是 50/50**：选主要 surface，再用 per-task override 处理少数例外。试图在 `PRODUCT.md` 里把两者平均掉，通常只会得到更差的结果。
