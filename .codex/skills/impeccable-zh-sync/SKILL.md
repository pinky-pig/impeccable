---
name: impeccable-zh-sync
description: Sync upstream changes for the Impeccable Chinese fork, update the localized static site, and prepare the branch for deployment. Use when upstream impeccable changes, when the Chinese translation needs refreshing, or when preparing this repo for Netlify release.
---

# Impeccable ZH Sync

Maintain the Chinese fork of `pbakaus/impeccable` without changing the site's static architecture.

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

3. Merge upstream deliberately.
   - Fetch `upstream`.
   - Merge `upstream/main` into the temporary sync branch.
   - Resolve conflicts while preserving the upstream structure whenever possible.
   - Do not migrate the project to a framework. This repo is a static `HTML + CSS + JS` site.

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

6. Finalize and publish.
   - Summarize what changed from upstream.
   - Commit translation updates and sync fixes separately when practical.
   - Merge the validated sync branch back into `main`.
   - Push `main` to `origin`.
   - If asked, prepare the repo for Netlify by confirming production URLs in `robots.txt`, sitemap, and other site metadata.

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
