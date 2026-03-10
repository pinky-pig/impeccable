# 上游同步说明

当前仓库已经把官方项目配置为 `upstream`：

```bash
git remote -v
```

如果你已经在 GitHub 上创建了自己的 fork，请把 fork 仓库配置为 `origin`：

```bash
git remote add origin <你的-fork-url>
git push -u origin codex/zh-cn
```

后续同步官方更新时，建议使用下面的流程：

```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```

如果中文站在 `main` 之外的分支维护，例如 `zh-cn`，可以改成：

```bash
git checkout zh-cn
git fetch upstream
git merge upstream/main
git push origin zh-cn
```

推荐做法：

- 官网英文原版的结构改动，先合并 `upstream/main`
- 再处理中文文案冲突
- 你自己的定制改动，尽量单独提交，避免和纯翻译混在一起
