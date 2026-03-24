# Contributing Guide

## Branch strategy
- `main` = stable/live.
- `preview` = integration and testing branch for upcoming releases.
- New work should branch from `preview` and merge back into `preview` first.
- Promote `preview` to `main` only after verification.

## What to optimize for
- Keep diffs focused and reviewable.
- Prefer small, safe changes over broad rewrites.
- Preserve behavior unless a change is explicitly required.

## Safety checks before opening a PR
1. Verify session audio flow (including intro and ending tracks).
2. Verify timer/session circle and pause/resume behavior.
3. Verify mode navigation and menu behavior.
4. Verify profile stats, reflection logging, and streak updates.
5. Verify mobile responsiveness for key screens.

## Implementation notes for this codebase
- The runtime app logic is currently centralized in `src/main.js`.
- Wrapper modules in `src/` proxy to `window.__ataraxia` for compatibility and gradual modularization.
- Avoid renaming/removing storage keys unless migration logic is added.
- Prefer targeted edits; avoid repository-wide formatting-only commits.
