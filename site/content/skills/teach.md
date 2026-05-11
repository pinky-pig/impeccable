---
tagline: "每个项目只做一次：让 Impeccable 真正理解你的产品。"
---

<div class="docs-viz-hero">
  <div class="docs-viz-file">
    <div class="docs-viz-file-header">
      <span class="docs-viz-file-name">PRODUCT.md</span>
      <span class="docs-viz-file-status">每条命令都会读取</span>
    </div>
    <div class="docs-viz-file-body">
      <div class="docs-viz-file-row">
        <span class="docs-viz-file-k">Register</span>
        <span class="docs-viz-file-v">Product。设计服务于任务。</span>
      </div>
      <div class="docs-viz-file-row">
        <span class="docs-viz-file-k">Users</span>
        <span class="docs-viz-file-v">值班中的 SRE，读得快，经常在暗环境中工作。</span>
      </div>
      <div class="docs-viz-file-row">
        <span class="docs-viz-file-k">Brand voice</span>
        <span class="docs-viz-file-v">冷静、克制、没有煽动感。</span>
      </div>
      <div class="docs-viz-file-row">
        <span class="docs-viz-file-k">Anti-references</span>
        <span class="docs-viz-file-v">紫色渐变、玻璃拟态、“Boost your productivity.”</span>
      </div>
    </div>
    <div class="docs-viz-file-footer">每条命令写代码前都会先读这份文件。</div>
  </div>
  <p class="docs-viz-caption">一份完整的 PRODUCT.md。这里只放战略信息：为谁做、做什么、为什么。不写颜色、不写字体、不写像素值，那些属于 DESIGN.md。</p>
</div>

## 适用场景

在一个项目开始时先跑一次 `/impeccable teach`。它就是入口。如果没有它，后续每条命令虽然仍能产出看起来“技术上没问题”的设计，但整体语气很容易滑向泛化的 SaaS 风格：标准企业文案、安全默认字体、AI 常见色盘。有了它之后，每条命令都会先读你的回答，再开始生成。

适合用 teach 的时候：

- **你刚在一个新项目里装好 Impeccable。** 这是第一条该跑的命令。如果你跳过，其他命令通常也会把你引回 teach。
- **项目的品牌方向变了。** 新定位、新受众、新语气。重跑一次 `teach`，新的上下文会自动渗透到所有后续命令里。
- **其他命令提示 “no design context found” 然后停下。** 这就是信号：先跑 teach，再继续。

## 工作方式

Teach 会在项目根目录写出两份互补的文件：

- **`PRODUCT.md`** 是战略文件。包括 register（brand 还是 product）、目标用户、产品目的、品牌人格、反参考、设计原则、无障碍需求。它回答“为谁做、做什么、为什么”。
- **`DESIGN.md`** 是视觉文件。包括色彩、排版、层次、组件、do's and don'ts。它回答“具体长什么样”。这份文件由被委托执行的 `/impeccable document` 在 teach 末尾生成。

整个流程会先扫描你的代码库（README、package.json、组件、tokens、品牌资产等），先形成一个 **register hypothesis**：这更像是 brand（落地页、营销页、作品集，设计本身就是产品）还是 product（App UI、后台、仪表盘、工具，设计服务于任务）。Register 会被作为第一个问题，因为它会直接影响后面所有默认值：字体气质、动效强度、色彩策略，以及 `/impeccable typeset` 之类命令会加载哪一组参考材料。确定 register 之后，teach 才继续追问那些它无法从代码里推断出来的信息：用户是谁、品牌人格用哪三个真实词来描述、参考与反参考是什么、无障碍要求有哪些。

PRODUCT.md 只承载战略，不承载视觉细节。不写颜色、不写字体、不写像素值，那些归 DESIGN.md。把两者拆开是故意的：战略可以相对稳定，而视觉系统可以继续演化。

## 试试看

```text
/impeccable teach
```

通常会经历一段 5 到 8 分钟的简短访谈。第一个问题往往就是 register；后面的问题都比较短。Teach 会把它从代码里推断出的东西先复述给你听，例如“从这些 routes 看，这看起来像 product surface，对吗？”，所以你更多是在确认，而不是从零开始填空。

在流程末尾，teach 会询问你是否要顺手跑 `/impeccable document`。除非你有非常具体的理由想先等等，否则建议直接回答 yes。一份真实的 DESIGN.md，才是后续变体、打磨和评审持续保持品牌一致性的关键。

## 常见误区

- **为了“先随便试一下命令”而跳过它。** 那样其他命令还是会在半路重新采访你。先跑 teach，反而更快。
- **给出过于泛化的回答。** “现代、简洁”几乎没有信息量；“温暖、机械感、有立场”才有用。尽量具体，也要愿意明确反对那些安全默认值。
- **把 PRODUCT.md 当成不可修改的文件。** 这份文件就是你的。如果 teach 写进去的某句话不完全对，你完全可以自己改。后续所有命令读到的，都是当前文件内容。
- **参考只写形容词，不写对象。** 参考与反参考都应该尽量具体到品牌、产品或印刷物名称。比如写 “Klim Type Foundry 的 specimen pages”，而不是只写 “technical and clean”。
