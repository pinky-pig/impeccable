---
tagline: "生成符合规范的 DESIGN.md，把你的视觉系统固化下来，让每个 AI agent 都能保持同一设计语境。"
---

<div class="docs-viz-hero">
  <div class="docs-viz-file">
    <div class="docs-viz-file-header">
      <span class="docs-viz-file-name">DESIGN.md</span>
      <span class="docs-viz-file-status">Google Stitch 格式</span>
    </div>
    <div class="docs-viz-designmd-section">
      <div class="docs-viz-designmd-head">
        <span class="docs-viz-designmd-num">01</span>
        <span class="docs-viz-designmd-title">Overview</span>
      </div>
      <p class="docs-viz-designmd-note">Creative North Star：<em>“The Editorial Sanctuary.”</em> 安静的排版、充足的空气感、一个真正明确的强调色。</p>
    </div>
    <div class="docs-viz-designmd-section">
      <div class="docs-viz-designmd-head">
        <span class="docs-viz-designmd-num">02</span>
        <span class="docs-viz-designmd-title">Colors</span>
      </div>
      <div class="docs-viz-designmd-swatches" aria-hidden="true">
        <span class="docs-viz-designmd-swatch" style="background:#1a1a1a"></span>
        <span class="docs-viz-designmd-swatch" style="background:#f5f3ef"></span>
        <span class="docs-viz-designmd-swatch" style="background:oklch(60% 0.22 30)"></span>
        <span class="docs-viz-designmd-swatch" style="background:oklch(90% 0.02 30)"></span>
      </div>
    </div>
    <div class="docs-viz-designmd-section">
      <div class="docs-viz-designmd-head">
        <span class="docs-viz-designmd-num">03</span>
        <span class="docs-viz-designmd-title">Typography</span>
      </div>
      <div class="docs-viz-designmd-type">
        <span class="docs-viz-designmd-type-display">Aa</span>
        <span class="docs-viz-designmd-type-body">Cormorant Garamond &middot; Instrument Sans</span>
      </div>
    </div>
    <div class="docs-viz-designmd-section">
      <div class="docs-viz-designmd-head">
        <span class="docs-viz-designmd-num">04</span>
        <span class="docs-viz-designmd-title">Elevation</span>
      </div>
      <p class="docs-viz-designmd-note">默认保持平面。只有状态变化时才引入阴影。</p>
    </div>
    <div class="docs-viz-designmd-section">
      <div class="docs-viz-designmd-head">
        <span class="docs-viz-designmd-num">05</span>
        <span class="docs-viz-designmd-title">Components</span>
      </div>
      <div class="docs-viz-designmd-comps" aria-hidden="true">
        <span class="docs-viz-designmd-btn">Subscribe</span>
        <span class="docs-viz-designmd-chip">filter</span>
        <span class="docs-viz-designmd-card">card</span>
      </div>
    </div>
    <div class="docs-viz-designmd-section">
      <div class="docs-viz-designmd-head">
        <span class="docs-viz-designmd-num">06</span>
        <span class="docs-viz-designmd-title">Do's and Don'ts</span>
      </div>
      <div class="docs-viz-designmd-rules">
        <span class="docs-viz-designmd-do">让中性色轻微染上强调色的色相。</span>
        <span class="docs-viz-designmd-dont">不要用渐变文字做强调。</span>
      </div>
    </div>
  </div>
  <p class="docs-viz-caption">这六个 section 的顺序和名称都是固定的。除此之外，还会同时产出一份机器可读的 <code>DESIGN.json</code>，供 Live Mode 的设计面板直接消费。</p>
</div>

## 适用场景

当你的视觉系统已经积累到足够“值得被记录”的程度时，就跑一次 `/impeccable document`：有颜色、有排版，至少已经有按钮和卡片这类基本组件。它会扫描你的代码库，提取其中出现的 tokens 与组件模式，并在项目根目录写出一份遵循 [Google Stitch DESIGN.md format](https://stitch.withgoogle.com/docs/design-md/format/) 的 `DESIGN.md`。这份文件有六个固定 section，顺序固定，其他任何识别 DESIGN.md 的工具都能消费它。

适合使用 document 的时候：

- **你刚跑完 `/impeccable teach`**，现在已经有了 `PRODUCT.md`。Document 正好是它在视觉侧的对应文件。
- **有其他命令把你引回它。** Live、craft 和 polish 都会读取 DESIGN.md。如果它不存在，skill 通常会建议你先跑 document。
- **设计已经和旧 DESIGN.md 漂移开了。** 文件不再准确描述线上系统。
- **在一次大改版之前。** 先把当前状态完整记录下来，作为下一轮方向变化的参照。

如果项目里还没什么代码（例如刚跑完 `teach`，还没做任何实现），也可以用 seed mode：`/impeccable document --seed`。它会问你五个非常快的策略问题（色彩策略、字体方向、动效能量、参考、反参考），先写出一份骨架。等真正有代码以后，再跑一次正常 scan mode 覆盖它。

## 工作方式

扫描阶段会按优先级依次寻找设计资产：CSS custom properties、Tailwind 配置、CSS-in-JS themes、design token 文件、组件源码、全局样式表，最后如果浏览器可用，还会补抓一遍真实渲染后的 computed styles。能自动提取的内容，它都会先尽量提取；剩下那些真正需要创意判断的部分，才会集中问你一次，例如 **Creative North Star**（整个系统的一个命名隐喻，比如 “The Editorial Sanctuary”）、更具描述性的颜色名称、层次哲学，以及组件性格。

最终产物是一份严格只有六个 section 的 DESIGN.md：Overview、Colors、Typography、Elevation、Components、Do's and Don'ts。标题名称会逐字符保持固定，这样其他工具才能稳定解析。同一时间，它还会写出一份机器可读的 `DESIGN.json`。Live Mode 设计面板读取的就是这个 sidecar，因此它展示的按钮、输入框、导航和卡片，不会是 generic approximation，而会是**你这个项目真实的设计系统**。

之后每一条命令都会在启动时读取 DESIGN.md。新的变体、打磨、评审乃至新功能构建，都会在不额外提醒的情况下自动继承这套视觉系统。

## 试试看

```text
/impeccable document
```

如果项目里已经有 tokens，这个流程通常只需要两分钟左右：扫描会先找到你的色盘和字体栈，你从 2 到 3 个 North Star 选项里挑一个，再确认一下颜色命名（例如 “Deep Muted Teal-Navy”，而不是 “blue-800”），文件就会落到项目根目录。

对于一个全新项目：

```text
/impeccable document --seed
```

大概五个问题，五分钟左右。产出的文件会带一个 `<!-- SEED -->` 注释，明确说明它目前只是一份骨架。等你真正把 tokens 实现出来，再去掉 flag 重跑一次。

## 常见误区

- **跑得太早。** 如果项目里连真正实现的 tokens 都没有，那 seed mode 才是正确用法。不要伪造一份代码根本支撑不起来的完整视觉规范。假的 DESIGN.md 比没有 DESIGN.md 更糟。
- **把 DESIGN.md 当成人类文档。** 它首先是写给 AI 读的。后续每条命令都会读取它。格式里那些带强约束的措辞（例如 “never”“always” 和具名规则）本来就是故意的。
- **自己再加一个 Layout / Motion / Responsive 顶级 section。** 规范只认六个 section，名称和顺序都固定。布局或动效类内容应该折到 Overview（理念级规则）或 Components（组件级行为）里。
- **默默覆盖已有的 DESIGN.md。** Document 总会先确认。如果你真的想重新开始，先把旧文件改名挪开，或者明确告诉它允许 overwrite。
