---
title: 快速开始
tagline: "从零开始，用五分钟跑完你的第一次 /polish。"
order: 1
description: "安装 Impeccable，先运行一次 /impeccable teach 建立项目上下文，再对已有页面跑一次 /impeccable polish。这是最快看到 Impeccable 会如何改变 AI 设计输出的路径。"
---

## 你会得到什么

完成这篇教程后，你的项目里会装好 Impeccable，根目录会有一对 `PRODUCT.md` 与 `DESIGN.md` 来记录品牌、受众和视觉系统，你还会拿到一个真正经历过 polish pass 的页面。总耗时大约十分钟。

## 前置条件

- 一款 AI coding harness：Claude Code、Cursor、Gemini CLI、Codex CLI，或其他已支持的工具。
- 一个至少有一个 HTML 文件或组件文件的项目，并且你确实想把它做得更好。拿一个刚 scaffold 出来的落地页来练手也完全可以。

## Impeccable 怎么工作

Impeccable 以单一 agent skill `impeccable` 的形式安装。23 个子命令都通过它来访问：

```text
/impeccable <command> <target>
```

例如：`/impeccable polish the pricing page`，或 `/impeccable audit the checkout`。单独输入 `/impeccable`，就能看到完整命令列表。

如果某个命令你会高频使用，可以用 `/impeccable pin <command>` 把它固定成独立快捷方式（例如 `/impeccable pin audit` 会直接给你 `/audit`）。

## 第 1 步：安装

在项目根目录运行：

```text
npx skills add pbakaus/impeccable
```

它会自动识别你正在使用的 harness，并把 skill 文件写到正确位置（例如 `.claude/skills/`、`.cursor/skills/`）。重新加载你的工具，输入 `/`，你应该能在自动补全里看到 `/impeccable`。继续输入它，参数提示里会列出全部可用命令。

## 第 2 步：让 Impeccable 理解你的项目

这是最关键的一步。没有上下文的设计，几乎一定会走向 generic output。`/impeccable teach` 会发起一轮简短的发现式问答，并在你的项目根目录写出一个 `PRODUCT.md`。

运行：

```text
/impeccable teach
```

第一个问题是 **register**：这是一个 brand surface（营销站、落地页、作品集，设计本身就是产品）还是一个 product surface（app UI、dashboard、工具，设计服务于产品）？register 会改变后续所有默认值，从 type lanes 到 motion energy 都会受影响。可以配合 [Brand 还是 Product：先定 register](/tutorials/brand-vs-product) 一起看。Teach 会先基于代码库形成一个判断，再让你确认，而不是完全从零开始问。

接下来是一小组更短的问题：

- **这个产品是给谁用的？** 尽量具体。不要说“用户”，而要说“在开会间隙用手机评估新工具的独立创始人”。
- **品牌语气用三个词描述。** 选真正有区分度的词。“温和、机械、很有主见”比“现代、简洁”更有用。
- **有没有视觉参考？** 给出命名过的品牌、产品或印刷物，不要只给形容词。说“Klim Type Foundry 的 specimen 页面”，而不是“技术感、干净”。
- **有没有 anti-reference？** 也就是明确不想像什么，同样要用具体对象来描述。

用你自己的话回答。skill 会把这些答案写入 `PRODUCT.md`。此后每次命令执行，都会自动读取这个文件。

打开 `PRODUCT.md` 看一遍它写了什么。凡是你觉得不对劲的地方，都直接改掉。这个文件是你的，不是 AI 的。

## 第 2.5 步：把视觉系统也记下来

`/impeccable teach` 的最后会询问你是否继续运行 `/impeccable document`。直接答应。它会扫描你的 tokens（CSS custom properties、Tailwind config、CSS-in-JS theme），提取颜色与排版信息，再用一组集中问题补齐那些真正需要创意判断的部分（例如 Creative North Star、颜色命名），最后输出一份遵循 [Google Stitch DESIGN.md format](https://stitch.withgoogle.com/docs/design-md/format/) 的 `DESIGN.md`。

如果项目还很新，暂时没有任何 token，document 会进入 seed mode：问你五个关于色彩策略、排版方向和动效能量的快速问题，然后先写出一份 scaffold，等代码成形后你再刷新它。

`PRODUCT.md` 负责战略层（谁、做什么、为什么），`DESIGN.md` 负责视觉层（颜色、排版、组件）。后续每个命令都会在生成之前读取这两份上下文。

## 第 3 步：先打磨一个已经存在的页面

挑一个已经存在的页面。关于页、设置页、价格页，什么都可以。运行：

```text
/impeccable polish the pricing page
```

这个 skill 会沿着对齐、留白、排版、色彩、交互状态、过渡和文案逐项走查。它做的是定点修正，不是整体重写。你应该预期看到一组不算大的 diff，但这些小 diff 叠在一起，会把页面从“做完了”抬到“做得好了”。

一次典型的 polish pass，大致会像这样：

```text
视觉对齐：修掉 3 个不在网格上的元素
排版：收紧 h1 字距，修正功能列表最后一行的孤行
色彩：把一个硬编码十六进制颜色替换成 --color-accent token
交互：给 FAQ 条目补上缺失的 hover state
动效：把模态框入场收敛到 220ms ease-out-quart
文案：移除残留的 “Lorem” 占位内容
```

看一遍 diff。如果有哪处你不认同，就让模型解释为什么这么改。如果解释完你还是不喜欢，就直接回退。Impeccable 有明确倾向，但它并不是永远都对。

## 接下来可以做什么

- [用实时模式迭代界面](/tutorials/iterate-live)：在你的 dev server 上打开浏览器选取器，对某个元素生成 3 个 production-quality 变体，并把你接受的那个写回源码。
- `/impeccable critique the landing page`：跑一份完整设计评审，带评分、persona 测试和自动检测。这通常是找出“下一个该修什么”的最快方法。
- `/impeccable audit the checkout`：对实现层做无障碍、性能、主题、一致性、响应式和 anti-pattern 检查。上线前特别有用。
- `/impeccable craft a pricing page for enterprise customers`：如果你要从零开始做一个新功能，用这条命令跑完整的 shape-then-build 流程。
- **把常用命令 pin 出来。** 如果你总在用某一个命令，`/impeccable pin audit` 就能让 `/audit` 重新成为独立快捷方式，而不用回退整套架构。
- `/impeccable redo this hero section` 也可以。只要是在 `/impeccable` 后面补充你的任务描述，skill 就会把这些设计原则应用进去。

## 常见问题

- **skill 提示 “no design context found”**：你跳过了第 2 步。先运行 `/impeccable teach`。
- **命令没有出现在 harness 里**：安装后要重新加载你的工具。如果还没有出现，检查安装器是否把文件写到了预期位置（`.claude/skills/`、`.cursor/skills/` 等），以及你的 harness 是否真的在读取那个目录。
- **polish pass 改掉了你原本喜欢的东西**：直接说出来。回退那一处，明确告诉模型要撤回哪条改动，再继续往下走。
