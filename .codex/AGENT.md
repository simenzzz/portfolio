# Project Agent Guide

## Project Purpose
- This repository contains a React single-page portfolio site.
- The public experience lives at `/` and showcases projects with small SVG visuals, short summaries, tags, and optional external links.
- The internal authoring helper lives at `/studio`. It is intentionally unlinked from the public interface and is not a secure admin system.

## Architecture
- Stack: Vite, React, TypeScript, React Router, CSS Modules, Vitest.
- Published portfolio content is source-controlled and stored in `src/data/projects.ts`.
- SVG visuals are stored in `src/assets/project-visuals/` and registered in `src/assets/project-visuals/index.ts`.
- The public UI reads from the typed local data file only. No backend, database, auth, or runtime persistence is part of this project.

## Content Workflow
- To add a project, open `/studio` locally and fill in the form.
- Copy the generated snippet into `src/data/projects.ts`.
- Add a matching SVG file under `src/assets/project-visuals/` and register its `visualKey`.
- Keep project entries aligned with the `Project` type in `src/types/project.ts`.

## Agent Expectations
- Preserve the split between the public portfolio and the internal studio route.
- Do not introduce a backend or fake security unless explicitly requested.
- Keep visuals lightweight and maintainable. Prefer small handcrafted SVG assets over heavy media by default.
- When changing project schema, update the `Project` type, sample data, studio form, preview behavior, and tests together.
