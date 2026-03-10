# 中文站分支与上游同步流程

## 当前约定

- `upstream`：官方仓库 `pbakaus/impeccable`
- `origin`：你的 fork
- `main`：你的中文站正式分支，也是建议给 Netlify 部署的分支

也就是说：

- 不保留一个长期独立的 `zh-cn` 作为正式分支
- `main` 直接承载中文版本
- 每次处理上游更新时，临时拉一个同步分支来消化冲突

## 为什么这样做

这样最省事，也最稳定：

- Netlify 直接部署 `main`
- 你的默认分支就是线上中文站
- 上游同步时有冲突也只在临时分支里处理，不会把 `main` 搞乱
- 你自己的定制改动、SEO 配置、部署配置都集中在 `main`

## 初始化一次即可

检查远程：

```bash
git remote -v
```

理想结果：

```bash
origin   https://github.com/<你的用户名>/impeccable.git
upstream https://github.com/pbakaus/impeccable.git
```

如果本地当前工作在一个临时分支，比如 `codex/zh-cn`，并且确认它就是你要的中文版内容，可以这样合并进 `main`：

```bash
git checkout main
git merge codex/zh-cn
git push origin main
```

## 日常开发流程

平时你自己的中文站修改，直接在 `main` 基础上开功能分支即可，例如：

```bash
git checkout main
git pull origin main
git checkout -b feat/update-copy
```

做完后合回 `main`。

## 上游更新同步流程

每次官方仓库有更新，不要直接在 `main` 上硬合。建议固定走下面这套流程。

### 1. 切回主分支并拉取最新代码

```bash
git checkout main
git pull origin main
git fetch upstream
```

### 2. 创建一个临时同步分支

分支名按日期或版本来，方便回溯：

```bash
git checkout -b sync/2026-03-10-upstream
```

### 3. 合并官方主分支

```bash
git merge upstream/main
```

如果有冲突，就在这个临时分支里解决。

## 解决冲突的原则

冲突时按这个顺序判断：

1. 如果是结构、脚本、路由、构建逻辑的上游改动，优先保留官方实现
2. 如果是纯文案区域，保留中文版本，并把上游新增内容补翻成中文
3. 如果是 SEO、域名、robots、sitemap，保留你自己的部署配置
4. 如果是你自己的定制功能，按业务需要人工判断，不要无脑覆盖

一句话：

- 功能逻辑跟上游
- 用户文案保中文
- 部署配置跟你自己

## 同步完成后的检查

至少做这几项：

```bash
bun install
bun run dev
```

如果 `3000` 端口被占用：

```bash
PORT=3001 bun run dev
```

有条件的话再跑：

```bash
bun run build
```

重点检查：

- 首页
- `/cheatsheet`
- 下载按钮
- API 内容是否仍正常加载
- 标题、描述、robots、sitemap 是否仍指向你的中文站域名

## 合回 main

确认没问题后：

```bash
git checkout main
git merge sync/2026-03-10-upstream
git push origin main
```

如果这个同步分支以后不用了，可以删除：

```bash
git branch -d sync/2026-03-10-upstream
git push origin --delete sync/2026-03-10-upstream
```

## 推荐提交策略

为了以后更容易同步，尽量拆成几类提交：

- `sync: merge upstream main`
- `i18n: translate new upstream content`
- `feat: custom changes for Chinese site`
- `seo: update netlify domain and metadata`

这样以后看冲突来源会清楚很多。

## 配合本仓库 skill 使用

本仓库已经有一个本地 skill：

```text
.codex/skills/impeccable-zh-sync
```

它适合做这些事：

- 查看上游新增了哪些提交
- 找出这次最可能需要重新翻译的文件
- 按固定流程完成同步、翻译、验证和推送

配套脚本：

```bash
./.codex/skills/impeccable-zh-sync/scripts/report_upstream_changes.sh
```

建议每次同步前先跑一遍。
