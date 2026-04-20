---
title: 快速开始
tagline: "从零开始，五分钟跑完你的第一次 /polish。"
order: 1
description: "安装 Impeccable，先运行一次 /impeccable teach 建立项目上下文，再对已有页面跑一次 /polish。这是最快看到 Impeccable 会改变什么的路径。"
---

## 你将得到什么

完成这篇教程后，你会在项目里安装好 Impeccable，生成一份记录品牌与受众的 `.impeccable.md`，并亲手跑完一次 `/polish`。整个过程大约五分钟。

## 准备条件

- 任意一款支持的 AI 编程工具：Claude Code、Cursor、Gemini CLI、Codex CLI 等。
- 一个至少已经有一个 HTML 或组件文件的项目，方便你直接拿来优化。

## 第 1 步：安装

在项目根目录运行：

```
npx skills add pbakaus/impeccable
```

它会自动识别你的工具，并把 skill 文件写进正确位置（例如 `.claude/skills/`、`.cursor/skills/`）。重新加载工具后，输入 `/`，你应该能看到 `/impeccable`、`/polish`、`/critique` 等命令。

## 第 2 步：先让 Impeccable 了解你的项目

这是最关键的一步。没有上下文的设计，几乎一定会滑向模板化输出。`/impeccable teach` 会进行一轮简短的发现式访谈，并在项目根目录写出 `.impeccable.md`。

运行：

```
/impeccable teach
```

它通常会问这些问题：

- 这个产品是给谁用的？越具体越好。
- 品牌语气用三个词怎么形容？
- 你希望界面带来什么感觉？
- 有没有喜欢的参考？有没有明确不想像的东西？

回答结束后，打开 `.impeccable.md` 看一遍，不对劲的地方直接改。那份文件属于你自己。

## 第 3 步：打磨一个已经存在的页面

选一个现成页面，比如 about、pricing、settings，运行：

```
/polish the pricing page
```

这个命令会沿着对齐、间距、排版、色彩、状态、动效和文案做有针对性的细修，而不是把整页推翻重做。

一次典型的 polish 可能长这样：

```
视觉对齐：修正 3 个脱离网格的元素
排版：收紧 h1 字距，处理特性列表里的孤行
色彩：把一个硬编码十六进制值改成 --color-accent token
交互：为 FAQ 项补齐 hover 状态
动效：把弹窗进入改为 220ms ease-out-quart
文案：移除残留的 Lorem 占位文本
```

看完 diff，如果你不认同某个改动，就直接问模型为什么这样改；仍然不认同时，回退它即可。

## 接下来可以试什么

- `/critique the landing page`：获得完整设计评审、评分与检测结果。
- `/audit the checkout`：在上线前从无障碍、性能、主题与响应式角度检查实现质量。
- `/impeccable craft a pricing page for enterprise customers`：体验从发现到实现的一整条流程。

## 常见问题

- **提示“没有设计上下文”。** 说明你跳过了第 2 步，先运行 `/impeccable teach`。
- **命令没有出现在工具里。** 重载一下工具；如果还没有，检查安装目录是不是写对了。
- **某次 polish 改掉了你喜欢的内容。** 直接说出来。撤销那个改动，再告诉模型具体哪一处不要动即可。
