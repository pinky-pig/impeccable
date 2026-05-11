---
tagline: "把过于保守的设计往前推，让它更有存在感，但不滑向混乱。"
---

## 适用场景

当一个界面看起来像所有其他界面一样时，就用 `/impeccable bolder`：普通无衬线、中等字重、柔和阴影、克制强调色、规整间距，一切都“没错”，但也因此毫无记忆点。只要项目本身承受得起更强存在感，而当前版本又明显太安全，就该用它。

它不适合长时间盯着看的 dashboard。Boldness 值得留给营销页、hero 区和内容型页面，不属于操作工具。

## 工作方式

这条 skill 会沿着四个轴放大已有特征，同时尽量不破坏可用性：

1. **Scale**：展示型文字会被推到 clamp(3rem, 6vw, 6rem) 甚至更大。标题应该占领视野，而不是缩在安全区里。
2. **Weight contrast**：用 300 对 800，而不是 medium 对 regular。要真正制造张力，而不是模模糊糊地“稍微有点对比”。
3. **Color commitment**：强调色用到足够坚定，不再稀释。背景也可以明确表态，例如 ink、accent、cream，而不是永远纸白。
4. **Compositional confidence**：不对称、越网格、pullquote、悬挂标点、尺度跳跃。布局应该有声音。

它不会“加更多东西”。它做的是把你已经拥有的东西放大到足够明确。如果设计里现在有三种颜色，bolder 不会再发明第四种，它会让那三种颜色的立场更坚定。

## 试试看

```text
/impeccable bolder the landing page hero
```

常见变化：

- Hero 标题从 3rem 推到 clamp(3.5rem, 7vw, 6.5rem)，改用真正的 display font，字重 700
- 副标题从 regular 改为 1.5rem 斜体，并往左轻微悬出 8px 做光学校准
- 背景从纯纸白改成 cream-to-paper 渐层，让容器更有温度
- CTA 按钮改成实心、去掉投影、减小圆角，hover 时做反相
- 辅助图片轻微越出网格，并给一个负的上边距，制造不对称

## 常见误区

- **在错误的页面上使用它。** 产品后台、设置页、表单不应该追求 bold，它们应该首先易读。那类问题通常该交给 `/impeccable layout` 或 `/impeccable polish`。
- **把“bold”误解成“吵”。** Bold 是坚定，是自信；吵是失控。Bolder 追求的是前者。如果结果过于咄咄逼人，再跟一轮 `/impeccable quieter`。
- **在同一轮里同时叠加 `/impeccable delight`。** Delight 最好建立在一个稳定的视觉基线之上。先把 boldness 建起来，再稳定，再去加 delight。
