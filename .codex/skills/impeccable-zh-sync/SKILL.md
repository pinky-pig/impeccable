---
name: impeccable-zh-sync
description: End-to-end upstream sync workflow for the Impeccable Chinese fork. Use when the user says to sync and translate the latest impeccable.style / pbakaus/impeccable, refresh localized site content, rebuild, push, and report what changed.
---

# Impeccable ZH Sync

Maintain the Chinese fork of `pbakaus/impeccable` without changing the site's static architecture.

## Default Trigger

If the user says anything equivalent to:

- "同步并翻译一下最新 impeccable.style"
- "拉一下最新 upstream，然后翻译"
- "源站更新了，帮我同步"

then treat that as a request to run the full workflow end-to-end:

1. inspect upstream changes
2. merge upstream into a temporary sync branch
3. update Chinese localization where upstream changed visible behavior or wording
4. run dependency install if needed
5. build locally
6. merge back to `main`
7. push `main` to `origin`
8. return a concise update list

Do not stop after analysis unless blocked by a real error or the user explicitly asks you not to push.

## Workflow

1. Confirm remotes and branch intent.
   - Keep the official repo as `upstream`.
   - Keep the user's fork as `origin`.
   - Treat `main` as the production Chinese branch.
   - When syncing upstream, create a temporary branch such as `sync/2026-03-10-upstream` from `main`.

2. Inspect upstream before merging.
   - Run `./.codex/skills/impeccable-zh-sync/scripts/report_upstream_changes.sh`.
   - Review the commit list and changed files before making translation edits.
   - Prioritize changes under `public/`, `source/skills/`, `server/`, `scripts/`, and metadata files used by the static site.
   - Identify both:
     - upstream feature/build changes that must be synced even without translation
     - user-facing wording/content changes that require Chinese updates

3. Merge upstream deliberately.
   - Fetch `upstream`.
   - Merge `upstream/main` into the temporary sync branch.
   - Resolve conflicts while preserving the upstream structure whenever possible.
   - Do not migrate the project to a framework. This repo is a static `HTML + CSS + JS` site.
   - Keep the user's production branch strategy intact:
     - `main` is the Chinese production branch
     - sync branches are temporary only

4. Refresh Chinese localization.
   - Keep layout, DOM structure, routes, and asset paths unchanged unless upstream changed them.
   - Translate user-facing copy in `public/` first.
   - Update descriptions or other surfaced metadata in `source/skills/` when the website or API reads them.
   - Preserve command names, skill names, folder names, code identifiers, and terms that should remain in English.
   - When SEO or deployment metadata points to the English site, replace it with neutral placeholders or the fork's real domain.

5. Validate locally.
   - Use `bun install` if dependencies are missing.
   - Run `bun run dev` or `PORT=3001 bun run dev` if port `3000` is busy.
   - Run `bun run build` before finalizing when Bun is available.
   - Check the homepage and `/cheatsheet` at minimum.
   - If build dependencies changed upstream, install them before judging the build result.

6. Finalize and publish.
   - Commit the sync branch once it builds.
   - Merge the validated sync branch back into `main`.
   - Push `main` to `origin`.
   - Assume Netlify auto-deploys from `main`, unless the user says otherwise.
   - If upstream touched public metadata or URLs, re-check `robots.txt`, sitemap, canonical tags, Open Graph, and verification files.

## Required Final Output

After a successful sync, always return a short update list for the user.

The list should cover:

1. upstream additions or changes that were synced
2. Chinese translation updates applied
3. build/validation result
4. push/deploy status

Preferred format:

- `上游同步`
- `中文更新`
- `验证结果`
- `已推送`

Keep the list concise and concrete. Mention actual features, files, or providers when relevant.

## Translation Guardrails

- Keep the static site architecture intact.
- Do not introduce React, Vue, Next.js, or any framework migration.
- Do not change download commands, provider names, or API paths unless upstream already changed them.
- Translate for natural Simplified Chinese, not word-for-word literal output.
- Prefer compact Chinese phrasing in UI labels to avoid layout regressions.

## Read These When Needed

- Read [references/translation-scope.md](references/translation-scope.md) when deciding which files usually need localization.

## Scripts

- `scripts/report_upstream_changes.sh`
  - Fetch `upstream`.
  - Show commits present in `upstream/main` but not in the current branch.
  - Show changed files, plus a narrowed list of likely localization targets.
