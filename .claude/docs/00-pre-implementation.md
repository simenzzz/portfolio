# Pre-Implementation Brief

> Retrospective brief. The project was already scaffolded and built when this was
> written; this captures the intent the existing code and `.codex/AGENT.md`
> reflect, so future work has a stated baseline rather than an inferred one.

## Problem
A product-minded engineer needs a portfolio that reads like an editorial product
story — clear hierarchy, real project narratives, and research work presented
honestly — without the maintenance burden of a CMS or backend. Screenshot-dump
portfolios look generic and rot quickly; the goal is something maintainable that
"survives handoff."

## Goals
- A public single-page portfolio at `/` that presents **products/builds** and
  **research** entries with summaries, tags, visuals, and optional external links.
- Content that is **easy to keep correct** — typed, validated, and reviewable in
  version control.
- A low-friction **authoring workflow** for adding entries consistently.
- Lightweight, fast, on-brand visuals.

## Non-goals
- No backend, database, authentication, or runtime persistence.
- No public CMS or live in-production editing.
- No heavy media pipeline; no analytics, blog, or i18n in the initial build.

(These non-goals are recorded as decisions in
[ADR 0001](../adr/0001-spa-no-backend.md) and
[ADR 0002](../adr/0002-studio-snippet-authoring-flow.md).)

## Constraints
- **Source-controlled content** — entries live in `src/data/projects.ts`, not a
  database.
- **Handcrafted SVGs** preferred over raster/heavy media
  ([ADR 0003](../adr/0003-svg-visual-registry.md)).
- **Type safety as the guardrail** — content shape is enforced by TypeScript
  ([ADR 0004](../adr/0004-typed-local-content-model.md)).
- Preserve the split between the **public portfolio** and the **internal studio**
  route; do not introduce a backend or fake security unless explicitly requested
  (per `.codex/AGENT.md`).

## Requirements satisfied by the current build
| Requirement | Where it lives |
|---|---|
| Public portfolio page with work/research/method/contact | `src/pages/PortfolioPage.tsx` |
| Two typed entry kinds + narrowing | `src/types/project.ts` (`isResearchEntry`) |
| Source-controlled content | `src/data/projects.ts` |
| Authoring helper with validation + preview + snippet | `src/pages/StudioPage.tsx`, `src/components/StudioEntryPreview.tsx` |
| Lightweight visuals with safe fallback | `src/assets/project-visuals/index.ts` (`getProjectVisual`) |
| Scroll-reveal motion | `src/components/RevealSection.tsx` |
| Test coverage of the authoring flow | `src/test/app.test.tsx` |

## Open items intentionally deferred
Identity/contact are still placeholders, there is no lint/CI tooling, and test
coverage is scoped to the studio. These are tracked as forward work in
[`../ROADMAP.md`](../ROADMAP.md).
