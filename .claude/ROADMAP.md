# Portfolio — Implementation Roadmap

A single map of where this project has been and where it's going: the
pre-implementation thinking, the decisions baked into the code, the scaffold as
built, and the grounded work still ahead with its risks.

## Overview
A static **Vite + React 19 + TypeScript** single-page portfolio. The public page
(`/`) presents product/build and research entries; an internal, unlinked
authoring helper (`/studio`) generates type-safe content snippets. There is no
backend — content is source-controlled in `src/data/projects.ts`. See
[ADR 0001](adr/0001-spa-no-backend.md).

## Document map
| Document | What it covers |
|---|---|
| [docs/00-pre-implementation.md](docs/00-pre-implementation.md) | Problem, goals, non-goals, constraints, requirements satisfied |
| [docs/01-scaffold.md](docs/01-scaffold.md) | Stack, directory layout, conventions, content workflow, commands |
| [adr/0001-spa-no-backend.md](adr/0001-spa-no-backend.md) | SPA, no backend/DB/auth |
| [adr/0002-studio-snippet-authoring-flow.md](adr/0002-studio-snippet-authoring-flow.md) | `/studio` snippet generator instead of a CMS |
| [adr/0003-svg-visual-registry.md](adr/0003-svg-visual-registry.md) | Handcrafted SVG registry with fallback |
| [adr/0004-typed-local-content-model.md](adr/0004-typed-local-content-model.md) | `ProductEntry`/`ResearchEntry` discriminated union |

> Existing project guide for agents: [`../.codex/AGENT.md`](../.codex/AGENT.md).

---

## Done so far
| Milestone | Status | Evidence |
|---|---|---|
| Project scaffold (Vite/React/TS/Router/Vitest) | ✅ | `package.json`, `src/main.tsx`, `src/router.tsx` |
| Public portfolio page (hero, method, work, research, contact) | ✅ | `src/pages/PortfolioPage.tsx` |
| Scroll-reveal motion | ✅ | `src/components/RevealSection.tsx` |
| Typed content model + data | ✅ | `src/types/project.ts`, `src/data/projects.ts` |
| Project/research card components | ✅ | `FeaturedProject.tsx`, `ProjectCard.tsx`, `ResearchEntryCard.tsx` |
| SVG visual registry + fallback | ✅ | `src/assets/project-visuals/index.ts` |
| `/studio` authoring helper (form, validation, preview, snippet) | ✅ | `src/pages/StudioPage.tsx`, `StudioEntryPreview.tsx` |
| Test suite (studio form behavior) | ✅ (6 tests) | `src/test/app.test.tsx` |
| Lucubrum rename + live link (was "Learning Helper") | ✅ | `src/data/projects.ts`, `lucubrum.svg` |

---

## Future work (grounded next steps)
Phased; each item names the files it touches.

### Phase 1 — Content & identity
- Replace placeholder identity: brand `"Independent Frontend Practice"` and the
  `hello@example.com` contact links in `src/pages/PortfolioPage.tsx`.
- Add the real owner name, social/professional links, and accurate project copy
  in `src/data/projects.ts`.

### Phase 2 — Deployment & version control
- **Fix version control** — the repo's `.git` is empty/broken (see Risks); a
  working repo is a prerequisite for everything else.
- Deploy the portfolio itself (target undefined today; the Lucubrum sub-project
  already lives on Vercel).
- Pin a package manager — reconcile the `pnpm-lock.yaml` with the npm-style
  scripts in `package.json`.

### Phase 3 — Tooling & quality
- Add **ESLint + Prettier** (no config exists today) and wire them into the
  build/PR flow.
- Add a **CI workflow** (no `.github/` today) running build + tests.
- Grow tests toward the **80% coverage** standard: cover `PortfolioPage` and the
  card components, not just the studio form (`src/test/`).

### Phase 4 — Polish
- Accessibility pass (landmarks, focus order, color contrast, motion-reduce).
- SEO/meta: title/description, favicon, Open Graph tags (`index.html`).
- Asset cleanup: register or delete the unused SVGs — `aurora-board.svg`,
  `cinder-ops.svg`, `relay-garden.svg` (see [ADR 0003](adr/0003-svg-visual-registry.md)).
- Surface clipboard write failures in `src/pages/StudioPage.tsx` instead of
  swallowing them silently.

### Phase 5 — `/studio` decision
- Decide whether `/studio` should ship in the public bundle as-is, be gated, or
  be build-time-excluded. Open follow-up from
  [ADR 0002](adr/0002-studio-snippet-authoring-flow.md).

---

## Risks & deviations
| # | Risk | Severity | Mitigation |
|---|---|---|---|
| R1 | Repo `.git` is empty/broken — no version-control safety net (can't branch, commit, or `git mv`) | **High** | Re-initialise the repository before further work; commit current state. |
| R2 | Placeholder identity/contact still in the public page | **High** (pre-launch) | Phase 1 content pass before any public launch. |
| R3 | `/studio` is in the production bundle and URL-reachable with no auth | Medium | Phase 5 decision; acceptable for a static helper, not for anything private. |
| R4 | Test coverage (studio-only) is below the 80% standard | Medium | Phase 3 — extend tests to the public surface. |
| R5 | No lint/format/CI tooling | Medium | Phase 3. |
| R6 | Silent clipboard error swallow in `StudioPage.tsx` conflicts with the "never silently swallow errors" rule | Low | Phase 4 — show a user-visible failure state. |
| R7 | Unused SVG assets drift from the registry | Low | Phase 4 — register or remove. |
| R8 | Package-manager ambiguity (pnpm lockfile vs npm scripts) | Low | Phase 2 — pin one. |

### Deviation triggers
These are points where future needs would justify *consciously revisiting* a
recorded decision rather than treating it as fixed:
- **Content scale / multiple contributors** → the manual snippet → `projects.ts`
  flow may need to give way to a real CMS, revisiting
  [ADR 0002](adr/0002-studio-snippet-authoring-flow.md) (and likely
  [ADR 0001](adr/0001-spa-no-backend.md)).
- **Truly private studio** → would require deviating from the single static
  bundle (build-time route stripping or a separate authenticated app),
  revisiting [ADR 0001](adr/0001-spa-no-backend.md) / [ADR 0002](adr/0002-studio-snippet-authoring-flow.md).
- **Dynamic/real-time content** → would introduce data fetching and a backend,
  revisiting [ADR 0001](adr/0001-spa-no-backend.md).
