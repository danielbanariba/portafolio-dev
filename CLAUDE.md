# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Daniel Banariba, built with Astro. Hybrid architecture: static Astro components for most content, interactive React components (`.jsx`/`.tsx`) for animations and client-side behavior. All portfolio content (experiences, skills, projects, education, testimonials) is in Spanish.

## Development Commands

- `npm run dev` or `npm start` - Start development server
- `npm run build` - Build for production (runs `npm install && astro check && astro build`)
- `npm run preview` - Preview production build locally
- Requires Node.js v23.x

## Architecture

### Tech Stack
- **Framework**: Astro (^5.17.1) with React and Tailwind CSS integrations
- **Animations**: GSAP (SSR-compatible via Vite externals), Framer Motion (React components)
- **Icons**: Tabler Icons React, Astro Icon
- **Utilities**: `cn()` in `src/lib/utils.js` (clsx + tailwind-merge)

### Single-Page Layout
`src/pages/index.astro` renders sections in this order:
Navbar → Presentacion → InformationResume → AboutMe → Skills → Experience → Project → (DevelopmentToolsOrbit) → (Testimonial) → Education → BongoCat → Footer

Components in parentheses are currently commented out in the template.

### Markdown Documentation Pages
Project detail pages live as `.md` files in `src/pages/` (e.g., `sistema-contable.md`, `inventario-personal.md`). They use `MarkdownLayout.astro` (set via frontmatter `layout`) which wraps content with Navbar, Footer, and styled prose. These are linked from project cards via the `documentacionUrl` field in `proyects.ts`.

### Component Patterns
- `.astro` files for static/server-rendered content
- `.jsx`/`.tsx` for interactive client-side components (require `client:*` directives for hydration)
- `ClientTimeline.jsx` - Scroll-based timeline with Framer Motion (used by Experience section)
- `HoverEffect.tsx` - Card hover animations (React)
- `Beam.jsx` - Decorative beam animation (React)

### Data Architecture
All content lives in typed TypeScript files in `src/data/`:
- `experiences.ts` - Work history. Uses nested `Position` interface for multiple roles within one company. Technologies tracked at both position and experience levels.
- `skills.ts` - Technical skills with `Skill` interface (name, icon path, category)
- `proyects.ts` - Portfolio projects (note: intentional Spanish spelling in filename). Untyped — uses plain object array, not an exported interface.
- `testimonials.ts` - Professional testimonials
- `education.ts` - Educational background

### Path Alias
`@/*` maps to `src/*` (configured in tsconfig.json)

### Asset Organization
Assets in `public/` referenced with absolute paths (e.g., `/icon/skills/python.svg`):
- `public/icon/empresas/` - Company logos
- `public/icon/skills/` - Skill icons (referenced in `skills.ts`)
- `public/icon/education/` - Education institution logos
- `public/icon/tools/anillo-0/` through `anillo-4/` - Orbit visualization rings for DevelopmentToolsOrbit
- `public/project/` - Project screenshots

## Common Editing Tasks

### Adding New Professional Experience
1. Edit `src/data/experiences.ts`
2. Add company icon to `public/icon/empresas/`
3. Use nested `Position` objects for multiple roles at same company

### Adding New Skills
1. Edit `src/data/skills.ts`
2. Add icon to `public/icon/skills/`
3. Valid categories: `"Backend"`, `"Frameworks"`, `"Gestores de Bases de Datos"`, `"Infraestructura"`, `"QA & Testing"`, `"Datos/Analytics"`

### Adding New Projects
1. Edit `src/data/proyects.ts`
2. Add screenshot to `public/project/`
3. Optional fields: `documentacionUrl` (markdown page route), `githubUrl`, `projectUrl`
4. For documentation pages, create a `.md` file in `src/pages/` with `layout: '/src/layouts/MarkdownLayout.astro'` in frontmatter
