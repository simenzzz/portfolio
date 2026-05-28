# Initial Scaffold (as-built)

A snapshot of how the project is put together, so changes stay consistent with
the established structure.

## Stack
| Concern | Choice | Notes |
|---|---|---|
| Build/dev server | **Vite 6** | `vite`, `vite build`, `vite preview` |
| UI | **React 19** | `react`, `react-dom` |
| Language | **TypeScript 5.8** | project refs: `tsconfig.app.json`, `tsconfig.node.json` |
| Routing | **React Router 7** | `createBrowserRouter` in `src/router.tsx` |
| Styling | **CSS Modules** | one `*.module.css` per component/page + `src/styles/global.css` |
| Testing | **Vitest 3** + Testing Library + jsdom | `src/test/` |

> Package manager: a `pnpm-lock.yaml` is checked in, but `package.json` scripts
> are invoked npm-style throughout. Pinning one is tracked in the roadmap.

## Directory layout
```
src/
  main.tsx                     # app entry, mounts the router
  router.tsx                   # routes: "/" → PortfolioPage, "/studio" → StudioPage
  pages/
    PortfolioPage.tsx          # public single-page portfolio
    StudioPage.tsx             # internal authoring helper (unlinked, no auth)
  components/
    FeaturedProject.tsx        # public alternating product "bands"
    ProjectCard.tsx            # compact product card (used by the studio preview)
    ResearchEntryCard.tsx      # research entry card
    RevealSection.tsx          # scroll-reveal wrapper (motion)
    StudioEntryPreview.tsx     # studio live preview; reuses the real cards
  data/
    projects.ts                # source-controlled content: products[], researchEntries[]
  types/
    project.ts                 # ProductEntry | ResearchEntry, isResearchEntry guard
  assets/project-visuals/      # handcrafted SVGs + index.ts registry
  styles/global.css
  test/                        # app.test.tsx, renderApp.tsx, setup.ts
```

## Conventions
- **One concern per file**, with a co-located `*.module.css` for styling.
- **Components reused across surfaces:** the studio preview renders the *same*
  `ProjectCard` / `ResearchEntryCard` the public page uses, so the preview can't
  drift from production.
- **Content is data, not markup** — add entries to `src/data/projects.ts`; never
  hardcode a project into a component.
- **Visuals are referenced by `visualKey`**, never imported directly into entries
  (see [ADR 0003](../adr/0003-svg-visual-registry.md)).

## Content workflow (add a project)
1. Run the studio (`npm run dev`, then open `/studio`).
2. Pick **Product** or **Research** mode, fill the form, review the live preview.
3. Click **Copy snippet** and paste the generated object into the matching array
   in `src/data/projects.ts`.
4. Add the SVG under `src/assets/project-visuals/` **and** register its key in
   `src/assets/project-visuals/index.ts`; use that key as the entry's `visualKey`.
5. Keep entries aligned with the types in `src/types/project.ts`.

## Commands
| Task | Command |
|---|---|
| Dev server | `npm run dev` |
| Production build (type-check + bundle) | `npm run build` (`tsc -b && vite build`) |
| Preview the build | `npm run preview` |
| Run tests | `npm test` (`vitest run`) |
| Watch tests | `npm run test:watch` |
