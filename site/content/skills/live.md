---
tagline: "直接在浏览器里迭代 UI。选一个元素，留一句评论，拿到三个变体。接受其中一个后写回源码。"
---

<div class="docs-live-callout">
  <span class="docs-live-callout-icon" aria-hidden="true">▸</span>
  <span class="docs-live-callout-text">如果你想先看它实际动起来的样子，请去 <a href="/live-mode">/live-mode</a> 看带动画的演示。本页是命令运行时，你的 AI harness 实际会读取的参考说明。</span>
</div>

<div class="docs-live-callout">
  <span class="docs-live-callout-icon" aria-hidden="true">▸</span>
  <span class="docs-live-callout-text"><strong>状态：内测。</strong> 实时模式端到端已经可跑，也值得现在试，但在真实仓库和各类框架配置上的测试还不够充分。少见环境里仍可能有毛边，遇到问题请直接反馈。</span>
</div>

<div class="docs-viz-hero docs-viz-hero--plain">
  <div class="docs-viz-live-frame">
    <div class="docs-viz-live-chrome">
      <span class="docs-viz-live-dot"></span>
      <span class="docs-viz-live-dot"></span>
      <span class="docs-viz-live-dot"></span>
      <span class="docs-viz-live-url">localhost:3000</span>
    </div>
    <div class="docs-viz-live-stage docs-viz-live-stage--tall">
      <div class="docs-viz-live-target">
        <span class="docs-viz-live-kicker">第 04 期</span>
        <h3 class="docs-viz-live-title">偶尔来一封，<em>就好</em>。</h3>
        <p class="docs-viz-live-body">像编辑寄来的明信片，大约一个月一次。没有追踪像素，也没有“只是来关心一下”。</p>
        <button class="docs-viz-live-btn" type="button">寄给我一封</button>
      </div>
      <div class="docs-viz-live-outline" aria-hidden="true"></div>
      <div class="docs-viz-live-ctx" aria-hidden="true">
        <button class="docs-viz-live-ctx-nav" type="button" aria-label="上一个">‹</button>
        <span class="docs-viz-live-ctx-counter">2 / 3</span>
        <button class="docs-viz-live-ctx-nav" type="button" aria-label="下一个">›</button>
        <span class="docs-viz-live-ctx-divider"></span>
        <button class="docs-viz-live-ctx-accept" type="button">接受</button>
      </div>
      <div class="docs-viz-live-gbar" aria-hidden="true">
        <span class="docs-viz-live-gbar-brand">/</span>
        <span class="docs-viz-live-gbar-btn is-active">选取</span>
        <span class="docs-viz-live-gbar-divider"></span>
        <span class="docs-viz-live-gbar-x">✕</span>
      </div>
    </div>
  </div>
  <p class="docs-viz-caption">这是实时模式处于中途循环时的状态：picker 描边你选中的元素，context bar 显示当前正在看的变体，全局工具条固定在底部。点击这里的接受，就会把第 2 个变体写回源码。</p>
</div>

## 适用场景

当你想像在设计工具里那样直接对着界面迭代，但最终产物仍然是生产代码时，就用 `/impeccable live`。它给你的，是类似 Figma 那种“在画布上直接试”的流畅感，但省掉了从设计稿回到实现的来回折返。

它特别适合：

- **在真实元素上探索方向。** 无论是首屏、订阅卡片还是价格档位，都能在实际页面和真实上下文里并排比较三个真正不同的方案。
- **打磨一块“几乎对了，但还差点意思”的 UI。** 你知道哪里不对，但说不清。选中它，写一句“更俏皮一点”或者直接划一笔，然后点 Go。
- **快速做一次团队分歧里的 A/B。** 生成变体、一个都不接受也没关系。重点是比较。

它**不适合**拿来做全新 greenfield 功能（那是 `/impeccable craft` 的工作），也不适合整页重做（那更适合 `/impeccable` 本体或某个更专门的 refine 命令）。

## 工作方式

一条命令，会在你的运行中 dev server 上方拉起一个 picker overlay。你可以点任何一个元素，元素旁边会弹出一条小的 context bar。你可以直接输入一句自由描述，也可以选 action chip（`bolder`、`quieter`、`distill`、`polish`、`typeset`、`colorize`、`layout`、`animate`、`delight`、`overdrive`）。如果你先在元素上放几个 comment pin 或画几笔 stroke，skill 也会把它们读成意图。

点下 Go 后，系统会生成三个 **production-quality variants**。它们锚定的是三个真正不同的设计原型，而不是同一个东西换三遍颜色。生成结果会通过你的框架 HMR 直接热替换进页面。你可以用方向键切换比较。接受其中一个，它就写回源码；三个都不要，原始版本会保留。

目前支持 Vite、Next.js（包括 monorepo）、SvelteKit、Astro、Nuxt，以及纯静态 HTML。如果你的 dev server 带有严格的 Content Security Policy，第一次运行时会检测出来，并提供一个只针对本地开发的一次性补丁，让 picker 可以加载。视觉决策优先遵循 `DESIGN.md`，文案语气优先遵循 `PRODUCT.md`；如果两者都存在，变体就能在不额外提示的情况下保持品牌一致。

## 试试看

```text
/impeccable live
```

打开你的 dev server，选中订阅卡片，点击 `delight`，再点 Go。你会得到三个在人格维度上真正不同的版本：可能是邮戳和明信片气质、可能是更强调排版惊喜，也可能是更插画化的方向，而不是只在同一种处理上做三种微调。

或者，选中一个 hero，输入 “more editorial, less SaaS”，再点 Go。三种结果会分别锚定不同的 editorial archetype，例如报纸式 masthead、目录型规格排布、或巨型字形海报感，而不是同一想法的三个色号。

完成后可以直接停止 live mode：对它说 “stop live mode”、关掉页面标签，或者点击 picker 工具条上的退出按钮。

## 常见误区

- **在页面还半成品时就跑。** Live 变体生成依赖上下文。如果元素还挂着 placeholder copy、Lorem ipsum，或者连基本样式都没铺上，变体也会继承这种半成品状态。
- **期待它替你做宏观结构决策。** Live mode 只迭代你选中的那一个元素。如果目标是“把整个 pricing page 重做一遍”，请直接去用 `/impeccable` 或 `/impeccable craft`。
- **忽略 fallback 提示。** 如果元素位于生成文件里（例如编译产物、构建输出），picker 会明确告诉你，并提供把接受动作路由回真正源码的办法。不要强行把结果写进生成文件，下一次 build 会把它抹掉。
- **在你非常关心品牌匹配时，却没先准备 PRODUCT.md 或 DESIGN.md。** Live 当然也能生成，只是会更容易滑回通用默认。只要结果必须像你的产品，而不是像“某个 generic demo”，请先跑 `/impeccable teach` 和 `/impeccable document`。
