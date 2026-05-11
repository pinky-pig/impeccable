---
tagline: "好和很好的分界线，往往就在这一轮极细的最后打磨。"
---

## 适用场景

`/impeccable polish` 是你在上线前最后该跑的一条命令。它专门抓那些把“已经能上线”和“真的精致”区分开的小问题：半像素错位、间距不一致、忘了补的 focus 状态、会闪一下的 loading 过渡、语气逐渐跑偏的文案。它也会同时把当前功能重新拉回你的设计系统：把硬编码值替换成 tokens、把自定义组件换成共享组件、修复和既有模式之间的漂移。

当一个功能在行为上已经完成、没坏、但你还是觉得“哪里差一点”时，就该跑它。或者，当一个功能已经明显偏离设计系统，也应该用它把它拉回来。

## 工作方式

Polish 会先识别设计系统（tokens、间距刻度、共享组件），再沿着六个维度细致扫描：

1. **视觉对齐与间距**：是否严格贴合网格、间距刻度是否统一、图标是否做了光学校准。
2. **排版**：层级是否一致、行长是否合理、有没有 widow / orphan、标题字距是否需要收。
3. **颜色与对比度**：token 使用、主题一致性、WCAG 比例、focus indicator 是否清晰。
4. **交互状态**：hover、focus、active、disabled、loading、error、success 是否都齐全。
5. **过渡与动效**：easing 是否顺、有没有 layout jank、是否遵守 `prefers-reduced-motion`。
6. **文案**：语气是否一致、时态是否统一、有没有 placeholder 字符串、有没有遗漏的 TODO。

它有一个非常明确的前提：polish 是最后一步，不是第一步。如果功能本身还没做完，这时候去 polish，基本等于浪费。

## 试试看

```text
/impeccable polish the pricing page
```

一轮健康的 polish 结果通常像这样：

```text
Visual alignment: 修正 3 个脱离网格的元素（8px baseline）
Typography: 收紧 h1 字距，修掉 testimonial 最后一行寡行
Interaction: FAQ 项补上 hover，邮箱输入框补上 focus ring
Motion: modal 入场更柔和，新增 reduced-motion fallback
Copy: 删掉一处遗留的 "Lorem ipsum"，统一按钮语气
```

五六个小修正，没有大翻新。这才是一次好的 polish pass。

## 常见误区

- **在还没做完的功能上先 polish。** 如果代码里还有 TODO，你就还没到这一步。`/impeccable polish` 只适合已经完成的功能。
- **把 polish 当 redesign。** Polish 是细化已有结果。如果你发现自己开始重构布局，那说明你真正需要的是 `/impeccable critique` 或 `/impeccable layout`。
- **没跑 `/impeccable audit` 就直接 polish。** Polish 擅长抓 feel-based 的问题；audit 擅长抓可量化的问题。两者一起用，判断才完整。
