---
title: 用实时模式迭代界面
tagline: "选中一个元素，生成三个变体，接受一个即可。不离开代码环境，也能获得类似画布的迭代体验。"
order: 2
description: "使用 /impeccable live 在真实的 dev server 页面上迭代单个元素：选中、标注、生成三个变体，接受其中一个后直接写回源码。"
---

## 你会得到什么

你会在自己的 dev server 上使用 `/impeccable live`，围绕某一个具体的 UI 片段（hero、card、section 都可以）做迭代，并最终把 3 个 AI 变体里的其中一个写回真实源码。整个过程会完整走一遍：像画布一样选取、标注、生成 3 个方向，再接受其中一个。

总耗时大约十分钟，其中大部分时间其实是决定“到底想改哪一块”。

## 前置条件

- 已经安装好 Impeccable（如果还没有，先看 [快速开始](/tutorials/getting-started)）。如果还没跑过 `/impeccable teach`，也先跑掉：变体是否贴合品牌，依赖 `PRODUCT.md` 和 `DESIGN.md`。
- 一个正在运行且支持 HMR 的 dev server（Vite、Next.js、SvelteKit、Astro、Nuxt、Bun），或者一个直接在浏览器里打开的静态 HTML 文件。
- 页面上至少有一块你想重新探索的 UI。newsletter 卡片、hero、价格卡，或者任何足够小、你能在脑中完整 hold 住的东西。

## 第 1 步：启动实时模式

在你的 harness 里运行：

```text
/impeccable live
```

这个 skill 会先启动一个跑在 `8400` 端口的小型本地 helper server，然后把一个加载 picker 的 `<script>` 标签注入你的 dev entry 文件。如果你的项目启用了比较严格的 Content Security Policy，第一次运行时它会检测出来，并提供一个只在开发环境使用的一次性补丁，用来放行 `script-src` 和 `connect-src`。直接接受就行：这个补丁受 `NODE_ENV === "development"` 保护，随时都可以回退。

然后打开你的应用地址，注意不是 `8400` 端口，`8400` 是 helper server，不是你的 app。页面底部会出现一颗深色的小药丸按钮，默认高亮 **Pick**。

## 第 2 步：选中一个元素

<div class="docs-viz-step">
  <div class="docs-viz-picker-row">
    <div class="docs-viz-picker-target">
      <span class="docs-viz-picker-pin">1</span>
      通讯订阅
      <span class="docs-viz-picker-note">更俏皮一点</span>
    </div>
  </div>
</div>

点击你要迭代的那个元素。元素周围会出现 picker outline，旁边会弹出一条浅色的上下文条，左边是命令 chip，右边是自由输入框。

在按 **Go** 之前，你可以先做几件事：

- **点击命令 chip**。默认是 `impeccable`，也就是完全自由的动作。你也可以把它改成 `bolder`、`delight`、`layout`、`typeset` 这类更具体的动作，让 3 个变体只沿着某一个维度发散。
- **在自由输入框里写一句话。** 例如“更俏皮一点”“少一点 SaaS 味道”“像一本设计杂志寄来的 newsletter”。
- **落一个 comment pin**。直接点在被选中的元素上。pin 的位置会影响理解：钉在标题旁边，是在说标题，不一定是在说整个组件。
- **画一笔 stroke**。在元素上直接拖拽。封闭圈通常表示“这部分重要”，箭头代表方向，叉掉通常表示“删掉它”。skill 读的是形状语义，不是像素内容。

当 brief 已经足够清楚，就按 **Go**。

## 第 3 步：在三个变体之间切换

<div class="docs-viz-step">
  <div class="docs-viz-variants">
    <div class="docs-viz-variant docs-viz-variant--v1">
      <span class="docs-viz-variant-badge">1 / 3</span>
      <span class="docs-viz-variant-kicker">第 04 期</span>
      <p class="docs-viz-variant-title">偶尔来一封，<em>就好</em>。</p>
      <span class="docs-viz-variant-btn">寄给我一封</span>
    </div>
    <div class="docs-viz-variant docs-viz-variant--v2 is-active">
      <span class="docs-viz-variant-badge">2 / 3</span>
      <span class="docs-viz-variant-kicker">专递</span>
      <p class="docs-viz-variant-title">设计手记，<br>每隔一个<br>周四送达。</p>
      <span class="docs-viz-variant-btn">加入 →</span>
    </div>
    <div class="docs-viz-variant docs-viz-variant--v3">
      <span class="docs-viz-variant-badge">3 / 3</span>
      <span class="docs-viz-variant-kicker">现场札记</span>
      <p class="docs-viz-variant-title">写给仍然愿意把邮件当成阅读体验的人，一月一封。</p>
      <span class="docs-viz-variant-btn">收下 ✺</span>
    </div>
  </div>
</div>

你会先看到一个 spinner（“正在生成变体……”），几秒钟后，3 个变体会直接原地热替换进页面。不是预览，不是截图，而是在你的真实 dev server、你的真实 DOM、你的真实上下文里被渲染出来。

用方向键，或者上下文条上的 prev / next 按钮，在它们之间切换。右上角会有一个计数器显示 `1 / 3`、`2 / 3`、`3 / 3`。

这 3 个变体的目标是 **真的足够不同**，而不是一个方向的 3 次小修小补。自由模式下，它们会锚定不同的设计原型；动作模式下，则会围绕命令本身去展开：`colorize` 会给你 3 套不同色彩家族，`animate` 会给你 3 套不同动效语言，`layout` 会给你 3 种不同结构安排。

如果你感觉 3 个变体只是“有点像”，那就是 skill 的 squint test 失败了。你可以直接告诉 picker：“再来一轮，这三个太像了。”

## 第 4 步：接受一个

<div class="docs-viz-step" style="text-align:center">
  <span class="docs-viz-accept-pill">变体 2 已写回源码</span>
</div>

当你找到满意的那个后，点击上下文条上的 **Accept**，或者直接按 Enter。此时会发生三件事：

1. 页面里的那个元素，会被你接受的变体直接替换。
2. 这个变体会写回源码：要么是注入 picker 的那个文件，要么是第 1 步里 live 检测到的实际组件源码。
3. 如果接受过程涉及 CSS，相关规则会并回项目真实的样式文件，而不是以 inline style 的形式留下来。

如果 3 个都不要，按 Escape 全部丢弃即可。原始内容会原样保留，不会留下任何注释掉的残骸。

## 第 5 步：停止实时模式

当你完成这轮迭代后，可以这样停掉 helper：

- 直接在 harness 里说 **“stop live mode”**
- 点击 picker 药丸按钮上的 **×**
- 直接关掉浏览器标签页，helper 会在 8 秒内检测到连接断开并自行退出

停止流程会同时移除注入在 dev entry 文件里的 `<script>` 标签，并关闭 `8400` 端口上的 helper server。

## 接下来可以做什么

- 先跑一次 `/impeccable polish`，再用 `/impeccable live` 对其中某一块继续做 A/B/C 探索。
- 配合 [用可视覆盖层做 critique](/tutorials/critique-with-overlay) 使用：先跑 critique 找出优先级最高的问题，再用 live 针对被标记的元素做重定向探索。
- 当你想要的不只是“改单个元素”，而是“从零把一整块功能设计出来”，就换成 `/impeccable craft`。

## 常见问题

- **页面上一直没有出现 picker**：要么 helper 没有正常启动（去终端看报错），要么 CSP 阻止了注入。重新运行 `/impeccable live`，让它再次检查 CSP。如果你第一次拒绝了补丁，删掉 `.impeccable/live/config.json` 里的 `cspChecked` 再重跑。
- **点击 Go 时出现 “element lives in a generated file”**：live 检测到你选中的是编译产物，不是真实源码文件。它会自动走 fallback 流程，把接受结果落回真正的 source。照着提示走，不要强行写进 generated file。
- **变体看起来不够贴合品牌**：先确认项目根目录里已经有 `PRODUCT.md` 和 `DESIGN.md`。如果没有，live 只能退回到比较 generic 的默认值。先跑 `/impeccable teach` 和 `/impeccable document`。
- **helper 端口被占用**：通常是上一次 live 会话没有干净退出。运行 `npx impeccable live stop` 释放端口。
