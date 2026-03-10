# Netlify 部署说明

## 推荐方式

直接让 Netlify 连接你的 GitHub fork，并监听 `main` 分支。

这样后续流程就是：

1. 先同步 `upstream/main`
2. 再补中文翻译
3. 最后把代码 push 到 `origin/main`
4. Netlify 自动触发部署

## 仓库准备

当前建议部署分支：

- `main`

不要让 Netlify 盯 `codex/zh-cn` 这类临时分支。

## 在 Netlify 中创建站点

在 Netlify 后台执行：

1. `Add new site`
2. `Import an existing project`
3. 选择 GitHub
4. 选择仓库 `pinky-pig/impeccable`
5. Branch 选择 `main`

## 构建设置

这个项目是静态站，但有构建步骤，建议这样填：

- Build command: `~/.bun/bin/bun run build`
- Publish directory: `build`

如果 Netlify 环境里没有 Bun，可以改成：

- Build command: `curl -fsSL https://bun.sh/install | bash && ~/.bun/bin/bun install && ~/.bun/bin/bun run build`
- Publish directory: `build`

更稳妥的做法是在 Netlify 的环境变量中确认 PATH 或 Bun 可用，但上面这条命令足够先跑起来。

## 自动部署行为

只要你后续 push 到：

```bash
origin/main
```

Netlify 就会自动重新部署。

## 推荐发布流程

每次上游更新后：

```bash
git checkout main
git pull origin main
git checkout -b sync/2026-03-10-upstream
git fetch upstream
git merge upstream/main
```

然后：

- 处理冲突
- 更新中文
- 本地预览验证

最后：

```bash
git checkout main
git merge sync/2026-03-10-upstream
git push origin main
```

这次 push 会直接触发 Netlify 部署。

## 上线前要检查

至少确认这些内容已经替换成你的正式域名或部署域名：

- `robots.txt`
- `sitemap.xml`
- 页面中的 canonical、Open Graph URL、Twitter URL

如果这些仍然指向英文官网，就会影响中文站 SEO。
