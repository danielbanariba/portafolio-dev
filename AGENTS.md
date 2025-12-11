# Repository Guidelines

## Project Structure & Module Organization
- Core pages live in `src/pages` (e.g., `index.astro`), sharing layout components from `src/layouts`.
- UI is split into `src/components` (Astro/React/TSX) with feature subfolders such as `components/AboutMe`. Keep new components scoped similarly.
- Data for timeline/cards sits in `src/data/*.ts`; update or extend these arrays instead of hardcoding content in views.
- Client scripts and utilities live in `src/js` and `src/lib`. Global assets and favicons belong in `public/`.
- Type helpers reside in `src/env.d.ts`; align any new types there when expanding runtime data.

## Build, Test, and Development Commands
- `npm install` — install dependencies (Node 23.x recommended per README).
- `npm run dev` or `npm start` — launch Astro dev server with hot reload.
- `npm run build` — run `astro check` then produce the static build in `dist/`. Note: this script re-runs `npm install`; avoid modifying dependencies mid-build.
- `npm run preview` — serve the built `dist/` output locally for QA.
- Linting is implicit via `astro check`; run `npm run astro -- check` directly when iterating on content/data changes.

## Coding Style & Naming Conventions
- Use 2-space indentation and keep files in ESM (`import`/`export`). Prefer PascalCase for components (`MyCard.astro`, `HoverEffect.tsx`) and camelCase for variables/props.
- Tailwind classes already follow meaningful groupings; append new classes near related behavior instead of reordering wholesale.
- Keep presentational copy in `src/data` when feasible; pages/components should stay lean and declarative.
- Type React props and data objects explicitly (see `HoverEffect.tsx`), even when optional.

## Testing Guidelines
- No automated test harness is present. Before pushing, run `npm run build` to catch Astro/TypeScript issues and then `npm run preview` for manual verification.
- When adding JS/TS helpers, include lightweight runtime guards (null checks, array length guards) to avoid client-side errors.
- If you introduce a testing library, co-locate specs under the same folder (e.g., `components/HoverEffect.test.tsx`) and document the command you add.

## Commit & Pull Request Guidelines
- Recent history uses short, descriptive Spanish titles (e.g., “Experiencia actualizada…”). Follow a concise, present-tense summary; include scope when helpful (`Component: adjust hover state`).
- Keep commits focused (content updates vs. styling vs. data). Reference issues when available.
- PRs should state intent, list key UI changes, and mention any data source touched in `src/data`. Include screenshots/GIFs for visual tweaks and note manual checks (`npm run build`, `npm run preview`).
