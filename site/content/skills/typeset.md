---
tagline: "修掉那些显得泛、乱，或像意外拼出来的排版。"
---

## 适用场景

当页面上的文字看起来更像“默认排版”，而不是“被认真设计过的排版”时，就该用 `/impeccable typeset`。层级发灰、三个字号看起来几乎一样、正文还停在 14px、所谓 display font 其实只是 Inter bold、标题完全没做 kerning，这些都属于它的典型场景。

最常见的触发语有：“层级太平了”“读起来不顺”“字体看着很泛”。

## 工作方式

这条 skill 会从五个维度审视排版：

1. **Font choices**：是不是还在用看不见的默认值（Inter、Roboto、Arial、Open Sans），字体气质是否匹配品牌，总共用了几套字体。
2. **Hierarchy**：标题、正文、caption 能不能一眼区分，尺寸之间至少有没有 1.25x 的对比，字重对比是否足够清楚。
3. **Sizing and scale**：是否存在连贯的 type scale，正文是否达到 16px 起步，当前场景到底适合 fixed rem（App UI）还是 fluid clamp（营销页）。
4. **Readability**：行长是否控制在 45 到 75 个字符之间，行高是否匹配字体与内容语境，对比度是否足够。
5. **Consistency**：同类元素是否始终用同一套做法，还是到处散落一次性的 `font-size` 覆盖。

它最后会真正动手修：挑更有辨识度的字体、建立模块化的字号刻度、拉开层级差、把行长和 leading 调整到可读状态。

## 试试看

```text
/impeccable typeset the article layout
```

常见 diff：

- 展示标题从 Inter 700 换成真正的 display face
- 重新建立 type scale：3rem / 2rem / 1.25rem / 1rem / 0.875rem，比例 1.333
- 正文字号从 14px 提到 16px
- 文章列的行长限制在 68ch
- 正文行高 1.6，display 标题行高 1.1
- 清掉零散在组件样式里的 4 处一次性 `font-size`

## 常见误区

- **在没有上下文时就让它换字体。** Typeset 会根据 `PRODUCT.md` 里的品牌语气做选择。如果你还没跑 `/impeccable teach`，建议就会更泛。
- **明明是布局问题，却来找 typeset。** 如果段落本身没问题，只是整页太挤、呼吸感不够，你真正需要的通常是 `/impeccable layout`。
- **期待在 app UI 上也全都用 fluid clamp。** Typeset 默认会在应用界面里优先选择 fixed rem 刻度；fluid typography 更适合营销页或内容页那种行长变化更大的环境。
