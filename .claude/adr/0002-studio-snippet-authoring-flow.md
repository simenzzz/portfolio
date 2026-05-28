# ADR 0002 — Internal `/studio` snippet-generator instead of a CMS

- **Status:** Accepted
- **Date:** 2026-05-21 (recorded retrospectively)

## Context
Authoring portfolio entries by hand-editing `src/data/projects.ts` is error-prone:
entries must match the `ProductEntry` / `ResearchEntry` types (see
[ADR 0004](0004-typed-local-content-model.md)), tags need parsing, and optional
fields must be formatted consistently. A full CMS would contradict the
no-backend decision ([ADR 0001](0001-spa-no-backend.md)).

## Decision
Provide an internal authoring helper at the `/studio` route (`src/pages/StudioPage.tsx`).
It is a pure client-side form that:
- supports both **product** and **research** entry modes,
- validates required fields client-side,
- renders a **live preview** via `StudioEntryPreview` (which reuses the real
  `ProjectCard` / `ResearchEntryCard` components), and
- emits a **copy-pasteable source snippet** for the matching array in
  `src/data/projects.ts`.

The route is intentionally **unlinked** from the public portfolio navigation. It
is an authoring aid, explicitly **not** a secure admin system.

## Consequences
- **Positive:** consistent, validated entries without a backend; preview matches
  production rendering because it reuses the same components.
- **Negative / trade-offs:**
  - Publishing is still a manual copy → paste → commit → redeploy loop.
  - The route is part of the production bundle and reachable by URL with no auth.
    This is acceptable for a static authoring helper but should be a conscious
    choice before launch.
- **Follow-up / open question:** decide whether `/studio` should be
  build-time-excluded from production, gated, or left as-is. Tracked in
  `ROADMAP.md` → Future Work, Phase 5.
- **Revisit if:** authoring frequency or contributor count grows — a real CMS
  would then be the deliberate deviation (also revisits ADR 0001).
