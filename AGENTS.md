# AGENTS.md

This file is guidance for agentic coding assistants working in this repo.
Follow existing conventions and prefer minimal, focused changes.

## Project Summary
- Personal portfolio website built with Astro and React.
- Uses Tailwind CSS and custom animations (GSAP, Framer Motion).
- Content is typed and centralized in `src/data/*.ts`.
- Static assets live in `public/` and are referenced by absolute paths.

## Commands (Build/Lint/Test)

### Install
- `npm install` — install dependencies (Node 23.x required).

### Dev
- `npm run dev` — start Astro dev server.
- `npm start` — alias of `npm run dev`.

### Build
- `npm run build` — runs `npm install`, then `astro check`, then `astro build`.
- `npm run preview` — serve the production build from `dist/`.

### Lint / Typecheck
- `npm run astro -- check` — run Astro type checks directly.
- There is no dedicated ESLint or Prettier script.

### Tests
- No automated test runner is configured.
- There is no single-test command because no test framework is installed.
- If you add tests, document the new commands here.

## Repo Structure
- `src/pages/` — Astro routes (main page is `index.astro`).
- `src/layouts/` — shared layouts (Astro templates).
- `src/components/` — Astro and React components; keep feature subfolders.
- `src/data/` — typed data sources for experiences/skills/projects/etc.
- `src/lib/` — small utilities (e.g., `cn()` helper).
- `src/js/` — client scripts not tied to React components.
- `public/` — icons, images, documents; reference via `/...` paths.

## Code Style Guidelines

### General
- Use ESM (`import`/`export`) only.
- 2-space indentation across JS/TS/Astro/CSS.
- Keep changes small and aligned with existing patterns.
- Prefer clear, descriptive names over abbreviations.
- Avoid introducing new libraries unless necessary.

### Astro Components
- Use `.astro` for static or server-rendered sections.
- Keep logic minimal in templates; move data to `src/data`.
- When using React components, apply `client:*` directives explicitly.
- Preserve existing layout structure and Tailwind class ordering.

### React Components
- Use `.jsx`/`.tsx` for interactive UI and animation components.
- Keep props typed in TSX; avoid `any`.
- Prefer function components, and keep hooks at top level.
- Avoid side effects in render; place effects in `useEffect`.

### TypeScript
- Favor explicit types for props and data objects.
- Extend types in `src/env.d.ts` when new runtime globals appear.
- Use strict null checks; guard against undefined data from `src/data`.

### Data Files (`src/data/*.ts`)
- Treat data files as the source of truth for content.
- Use typed interfaces and keep structure consistent.
- Add new images to `public/` and reference with absolute paths.
- Do not hardcode copy in components when it belongs in data.

### Styling (Tailwind)
- Keep class groupings meaningful (layout -> spacing -> color -> effects).
- Append new classes near related behavior; avoid full reordering.
- Avoid global CSS additions unless necessary for a feature.
- Keep animations consistent with existing motion style.

### Imports
- Use relative imports or `@/` alias for `src/*`.
- Group imports by origin: external, internal, then styles/assets.
- Avoid unused imports; keep import lists tidy.

### Naming
- Components: PascalCase (`ProjectCard.astro`, `HoverEffect.tsx`).
- Variables/props: camelCase (`projectList`, `isVisible`).
- Files and folders: follow existing names; avoid new naming schemes.
- Data arrays: plural nouns (`experiences`, `skills`).

### Error Handling
- Add lightweight guards for optional data (null/length checks).
- Avoid throwing from UI components; degrade gracefully.
- For client-side scripts, avoid runtime errors on missing DOM nodes.

### Accessibility
- Provide alt text for images.
- Use semantic HTML where possible.
- Keep interactive elements keyboard accessible.

## Animation Guidance
- GSAP and Framer Motion are available; match existing usage.
- Avoid heavy animation on critical path; keep performance in mind.
- Respect user motion preferences if adding new animations.

## Content and Assets
- New company logos go to `public/icon/empresas/`.
- Skill icons go to `public/icon/skills/`.
- Project images go to `public/project/`.
- Use absolute paths in data (e.g., `/icon/skills/python.svg`).

## Conventions Observed
- Content updates are usually done in `src/data` not in components.
- Components stay lean, with data and copy injected.
- Tailwind and animation styles are consistent and deliberate.

## Cursor / Copilot Rules
- No Cursor rules found (`.cursor/rules/` or `.cursorrules`).
- No Copilot instructions found (`.github/copilot-instructions.md`).

## When in Doubt
- Follow existing patterns in nearby files.
- Prefer minimal changes and avoid unrelated refactors.
- Update this file if you add tools, tests, or new conventions.
