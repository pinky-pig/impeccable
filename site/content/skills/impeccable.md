---
tagline: "每一条命令背后的设计智能。"
---

## 适用场景

`/impeccable` 是总入口命令。当你想直接做自由度更高的设计工作、不想先挑一条专门命令时，就直接调用它。它是默认兜底选项，适合那些无法被 23 条专精命令（例如 `audit`、`polish`、`critique` 等）清晰覆盖的任务。

适合直接用 `/impeccable` 的情况：

- **你不确定该用哪条命令。** 直接用自然语言描述目标，让 skill 自己选择最合适的路径。
- **工作跨越多个维度。** 比如“把这个 hero 区重新做一版”，它通常同时牵涉布局、排版、色彩和动效，一条单维度命令很难全权负责。
- **你想调用完整的设计判断，而不受某条预设流程约束。** 所有参考文件一起加载，所有 anti-pattern 一起检查，没有固定脚手架。

如果你需要更结构化的流程，请直接选侧边栏中的专门命令。新项目建议先跑 `/impeccable teach`，先把 PRODUCT.md 和 DESIGN.md 建起来。`/impeccable craft` 会把发现式访谈串成一次完整构建，并带上可视化迭代；`/impeccable shape` 只产出设计 brief，不碰代码；`/impeccable live` 则给你浏览器内选取元素、生成三种变体的工作流。评估和打磨类命令（`audit`、`critique`、`polish`、`typeset`、`layout`、`colorize` 等）则分别负责某个更窄、更明确的切面。

## 工作方式

大多数 AI 生成界面之所以显得廉价，失败方式都非常相似：普通字体、紫色渐变、卡片套卡片、玻璃拟态满天飞。`/impeccable` 的作用，就是给你的 AI 一套有立场的设计判断。它会先加载一份带观点的设计手册，再叠加长长一份 anti-pattern 清单，强迫模型在写出第一行代码之前先做出明确的审美决定。

项目根目录下有两份文件会直接塑造 skill 的全部输出：

- **`PRODUCT.md`** 负责战略层：register（brand 还是 product）、目标用户、品牌人格、反参考、设计原则。回答的是“为谁做、做什么、为什么”。
- **`DESIGN.md`** 负责视觉层：色彩、排版、层次、组件、do's and don'ts，遵循 Google Stitch 的六段格式。回答的是“它具体该长什么样”。

每条命令在生成前都会先读这两份文件。**Register** 决定默认值加载哪一套。Brand（营销页、落地页、作品集、设计本身就是产品）与 product（App UI、后台、仪表盘、工具，设计服务于任务）在字体、动效、色彩和密度上有完全不同的默认逻辑。只要在 PRODUCT.md 里写明一次，`/impeccable typeset` 就不会把杂志感字体硬塞进后台页面，也不会用过于产品化的保守默认去做活动页。两者差异可以继续看 [brand vs product 教程](/tutorials/brand-vs-product)。

第一次在项目里使用时，skill 会自动跑一遍 `teach` 流程：一段短访谈，写出 PRODUCT.md，然后再委托 `/impeccable document` 生成 DESIGN.md。之后的命令就会直接读取它们，不再重复提问。

## 试试看

```text
/impeccable redo this hero section
```

```text
/impeccable build me a pricing page for a developer tool
```

这两句提示词故意写得比较泛，因为 `/impeccable` 本来就该在不完整描述下也能主动做判断：根据你的 register 选一条明确的视觉方向，避开默认字体，绕开 AI 常见色盘，并做出像设计师而不是像模板生成器那样具体的决策。你不需要先决定命令名，也不需要自己拆流程。

如果你更想在浏览器里而不是对话里做可视化迭代：

```text
/impeccable live
```

在你运行中的 dev server 上随便选一个元素，留一句评论或画一笔标记，就能获得三个生产级变体，通过 HMR 直接热替换进页面。接受你想要的那个，它就会写回源码。

## 把命令 pin 回快捷方式

v3.0 把原来 18 个独立 skill 收拢成了一个 `/impeccable`，再挂上 23 个子命令。如果你仍然怀念某条命令的短入口，可以直接 pin 回来：

```text
/impeccable pin critique
```

从此开始，`/critique` 会直接代理到 `/impeccable critique`。它本质上会写出一个很轻的跳转 skill，委托给父 skill 执行，所以之后 skill 更新时，你不需要重新 pin。

比较值得 pin 的几条：

- `/impeccable pin polish` 适合最后一轮打磨
- `/impeccable pin audit` 适合跑确定性的 a11y / perf 检查
- `/impeccable pin live` 适合浏览器内迭代
- `/impeccable pin critique` 适合做设计评审

移除也很简单：`/impeccable unpin critique`。这些 pin 会以 `i-` 前缀目录的形式存在于你的 harness skills 文件夹里（例如 `.claude/skills/i-critique/`、`.cursor/skills/i-critique/`），你也可以手动删除。

## 常见误区

- **把它当成样式指南。** 它是一个有观点的设计搭档，不是 linter。默认值的目的，是把下限抬高，而不是替你否掉判断。如果你有真实理由要反驳它，比如品牌规范、无障碍约束、用户研究结果，那就把理由说出来，它会配合你。真正会把结果做坏的，是毫无理由地忽略它的判断。
- **期待它帮你修已有代码。** `/impeccable` 更适合“创建”。如果是细化已有页面，请直接去用 `/impeccable polish`、`/impeccable distill` 或 `/impeccable critique`。
- **在 `teach` 还没留下上下文之前就急着跑。** 在全新项目里它当然也能边问边跑，只是会慢一点。更顺的做法仍然是先显式执行一次 `/impeccable teach`。
- **跳过 register 这个问题。** Brand 和 product 的默认逻辑差异大到足以让结果“隐约不对劲”。如果你的 `PRODUCT.md` 里还没有 `## Register` 字段（旧版本遗留），先跑一遍 `/impeccable teach` 把它补上。
