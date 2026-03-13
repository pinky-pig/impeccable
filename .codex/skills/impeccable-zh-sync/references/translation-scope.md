# Translation Scope

Use this file to quickly decide what usually requires Chinese updates after upstream changes.

## Primary localization targets

- `public/index.html`
- `public/cheatsheet.html`
- `public/app.js`
- `public/js/data.js`
- `public/js/components/*.js`
- `public/js/demo-renderer.js`
- `public/js/demos/commands/*.js`
- `public/js/demos/skills/*.js`

## Secondary targets

- `source/skills/*/SKILL.md`
  - Especially frontmatter `description` if the site or API surfaces it.
- `README.md`
- `robots.txt`
- `sitemap.xml`
- `NOTICE.md` or attribution text if upstream changes licensing copy

## Usually not translated blindly

- command ids such as `/audit`, `/polish`
- skill folder names
- provider names such as `Cursor`, `Claude Code`, `Gemini CLI`, `Codex CLI`
- installation commands
- file paths, route paths, API endpoints

## Sync checklist

1. Merge `upstream/main`.
2. Diff `public/` and `source/skills/`.
3. Update Chinese copy only where upstream changed behavior or wording.
4. Re-check title, description, Open Graph, sitemap, robots metadata, canonical tags, and verification files.
5. Run `bun install` if upstream changed dependencies.
6. Run local build and verify homepage plus cheatsheet.
7. Merge back to `main`, push to `origin/main`, and report the change list.
