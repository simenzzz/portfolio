# ADR 0004 — Typed local content model with a discriminated union

- **Status:** Accepted
- **Date:** 2026-05-21 (recorded retrospectively)

## Context
The portfolio shows two kinds of entries — shipped **products/builds** and
**research** projects — that share several fields but differ in others (research
adds `year`, `roleLabel`, `primaryUrl`). Content is stored locally
([ADR 0001](0001-spa-no-backend.md)), so TypeScript is the only guardrail
keeping entries well-formed.

## Decision
Model content with explicit types in `src/types/project.ts`:
- `ProductEntry` — `slug`, `title`, `summary`, `tags[]`, `visualKey`, optional
  `repoUrl`, optional `liveUrl`.
- `ResearchEntry` — the shared fields plus required `year`, `roleLabel`,
  `primaryUrl`, and optional `repoUrl`.
- `PortfolioEntry = ProductEntry | ResearchEntry`, narrowed by the
  `isResearchEntry` type guard (presence of `primaryUrl`).

Data lives in `src/data/projects.ts` as two typed arrays (`products`,
`researchEntries`) consumed directly by `PortfolioPage`.

## Consequences
- **Positive:** the compiler catches malformed entries; rendering code can safely
  narrow with `isResearchEntry`; the `/studio` form mirrors these exact shapes.
- **Negative / trade-offs:** a schema change is **multi-file** by nature. Per
  `.codex/AGENT.md`, changing the model means updating the type, the sample data,
  the studio form, the preview behavior, and the tests **together** — skipping any
  one of them breaks consistency.
- **Note:** `type Project = ProductEntry` is kept as a compatibility alias.
