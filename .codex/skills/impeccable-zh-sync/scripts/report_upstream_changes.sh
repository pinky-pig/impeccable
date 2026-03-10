#!/usr/bin/env bash
set -euo pipefail

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "error: run this script inside a git repository" >&2
  exit 1
fi

current_branch="$(git branch --show-current)"

if ! git remote get-url upstream >/dev/null 2>&1; then
  echo "error: missing upstream remote" >&2
  exit 1
fi

git fetch upstream --quiet

echo "Current branch: ${current_branch}"
echo
echo "Commits in upstream/main not in ${current_branch}:"
git log --oneline --no-decorate HEAD..upstream/main || true
echo
echo "All changed files:"
git diff --name-only HEAD..upstream/main || true
echo
echo "Likely localization targets:"
git diff --name-only HEAD..upstream/main \
  | grep -E '^(public/|source/skills/|README\.md|robots\.txt|sitemap\.xml|NOTICE\.md)' \
  || true
