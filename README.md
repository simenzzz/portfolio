# portfolio

The source of my personal site, [samibk.com](https://samibk.com).

The site has two routes. `/` is the portfolio: a set of engineering projects,
each with a summary, a stack, and links to the repository and a live demo.
`/studio` is a research dossier that presents the papers and experiments behind
the applied-ML work.

## Stack

| Concern | Choice |
|---|---|
| Framework | React 19 |
| Language | TypeScript |
| Build | Vite |
| Routing | react-router v7 |
| Styling | CSS Modules, one module per component |
| Tests | Vitest, Testing Library, jest-dom |

There is no CSS framework and no UI library. Every component carries its own
CSS Module.

## Layout

```
src/
  pages/        PortfolioPage, StudioPage
  components/   FeaturedProject, ProjectCard, ResearchDossier,
                ResearchEntryCard, RevealSection, StudioEntryPreview
  data/         projects.ts — the single source for every entry on the site
  types/        ProductEntry and ResearchEntry shapes
  router.tsx    route table
  styles/       design tokens and global styles
  test/         component and route tests
```

Content is data, not markup. To add or change a project, edit
`src/data/projects.ts`. The pages render whatever that file holds.

## Develop

```bash
pnpm install
pnpm dev        # Vite dev server
pnpm test       # Vitest, single run
pnpm build      # tsc -b, then vite build → dist/
pnpm preview    # serve the production build locally
```

## CV

`cv.tex` and `cv-frontend.tex` hold the LaTeX sources for the two CV variants
the site links to.

## License

MIT. See [LICENSE](./LICENSE).
