# ADR 0001 — Single-page app with no backend, database, or auth

- **Status:** Accepted
- **Date:** 2026-05-21 (recorded retrospectively; decision predates this record)

## Context
The project is a personal/consulting portfolio whose content changes
infrequently and is authored by a single owner. Standing up a backend, database,
or authentication layer would add hosting cost, an attack surface, and
operational overhead that the use case does not justify. The existing project
guide (`.codex/AGENT.md`) states this explicitly: "No backend, database, auth,
or runtime persistence is part of this project."

## Decision
Build the portfolio as a static client-side SPA (Vite + React + React Router).
All published content is **source-controlled** in `src/data/projects.ts` and read
directly by the UI at build time. There is no runtime data fetching, no server,
and no auth.

## Consequences
- **Positive:** trivial hosting (any static host/CDN), no server to secure or
  operate, fast loads, content is reviewable in version control with full history.
- **Negative / trade-offs:**
  - Every content change requires a code edit and a redeploy — there is no live
    editing in production.
  - Anything shipped in the bundle is public, including the `/studio` route
    (see [ADR 0002](0002-studio-snippet-authoring-flow.md)).
- **Revisit if:** content volume or contributor count grows enough that
  source-controlled editing becomes a bottleneck, or genuinely private/dynamic
  data is required — at which point a backend/CMS would be a deliberate deviation
  from this decision.
