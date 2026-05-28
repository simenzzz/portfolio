# ADR 0003 — Handcrafted SVG visuals via a typed registry with fallback

- **Status:** Accepted
- **Date:** 2026-05-21 (recorded retrospectively)

## Context
Each project needs a distinguishing visual. Photographs or large raster media
would bloat the bundle and are hard to keep on-brand. `.codex/AGENT.md` directs:
"Keep visuals lightweight and maintainable. Prefer small handcrafted SVG assets
over heavy media by default."

## Decision
Store small handcrafted SVGs in `src/assets/project-visuals/` and expose them
through a typed registry in `src/assets/project-visuals/index.ts`:
- each SVG is imported and added to `projectVisualRegistry` under a string key,
- a project references its art by `visualKey` (a field on the entry types),
- `getProjectVisual(visualKey)` resolves the asset and **falls back to the
  `deckgraph` visual** when a key is unknown,
- `projectVisualKeys` (the registry's keys) feeds the `/studio` visual-key
  dropdown so authors can only pick registered art.

## Consequences
- **Positive:** tiny, version-controlled, on-brand assets; the studio can
  only offer valid keys; a missing key degrades gracefully instead of crashing.
- **Negative / trade-offs:**
  - The fallback is **silent** — a typo'd or unregistered `visualKey` quietly
    renders the deckgraph image rather than erroring, which can hide mistakes.
  - The registry and the asset files can drift: SVGs may exist on disk without
    being registered. As of this record, `aurora-board.svg`, `cinder-ops.svg`,
    and `relay-garden.svg` are present but **unregistered/unused**.
- **Guidance:** when adding art, add the file **and** register its key in the same
  change; keep `visualKey` values in sync between `projects.ts` and the registry.
