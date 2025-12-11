# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Astro, featuring a hybrid architecture with both static site generation and interactive React components. The project showcases professional experience, skills, projects, and education in an interactive format.

## Development Commands

- `npm run dev` or `npm start` - Start development server
- `npm run build` - Build for production (includes npm install, astro check, and astro build)
- `npm run preview` - Preview production build locally

## Architecture

### Tech Stack
- **Framework**: Astro 5.8.0 with React and Tailwind CSS integrations
- **Styling**: Tailwind CSS with custom animations
- **Animation Libraries**: GSAP, Framer Motion
- **Icons**: Tabler Icons React, Astro Icon
- **Languages**: TypeScript, with some JavaScript utilities

### Project Structure

#### Key Directories
- `src/components/` - Astro components and React components (.jsx/.tsx)
  - `AboutMe/` - About section components with animations
  - Mix of .astro files for static content and .jsx/.tsx for interactive elements
- `src/data/` - TypeScript data files defining structured content (experiences, skills, projects, testimonials, education)
- `src/layouts/` - Page layout templates including markdown layout
- `src/pages/` - Route pages (index.astro is main landing page)
- `public/` - Static assets organized by type (icons, images, documents, fonts)

#### Data Architecture
Content is defined in TypeScript files in `src/data/` with strongly typed interfaces:
- `experiences.ts` - Professional work history with detailed positions and technologies
  - Uses nested `Position` interface for multiple roles within same company
  - Technologies tracked at both position and experience levels
- `skills.ts` - Technical skills categorization (Backend, Frameworks, Database, Infrastructure, QA & Testing)
- `proyects.ts` - Portfolio projects (note: filename has typo, actual file is `proyects.ts`)
- `testimonials.ts` - Professional testimonials
- `education.ts` - Educational background

### Configuration Notes

#### Astro Config
- Tailwind and React integrations enabled
- Markdown configured with Dracula theme syntax highlighting
- GSAP configured as external dependency for SSR compatibility
- Path alias `@/*` maps to `src/*`

#### TypeScript
- Strict configuration with astro/tsconfigs/strict
- React JSX configured for React components
- Includes both .astro and standard React file types

### Development Patterns

#### Component Architecture
- Use .astro files for static/server-rendered content
- Use .jsx/.tsx files for interactive client-side components
  - React components require `client:*` directives in Astro for hydration
  - Example: `ClientTimeline.jsx` uses Framer Motion for scroll-based animations
- Animation components utilize GSAP and Framer Motion
- Responsive design with mobile-first Tailwind approach
- Utility functions in `src/lib/utils.js`:
  - `cn()` - Combines clsx and tailwind-merge for className merging

#### Content Management
- All dynamic content lives in typed data files
- Professional experience uses nested Position interface for detailed role descriptions
- Technologies are tracked both at position and experience levels
- Static assets are organized by category in public/ directory

### Asset Organization
Assets are located in `public/` and referenced with absolute paths (e.g., `/icon/skills/python.svg`):
- `public/icon/education/` - Educational institution logos and certificate icons
- `public/icon/empresas/` - Company logos (analiza.png, guaba-bit.png, grupo-farinter.png, etc.)
- `public/icon/skills/` - Technology and skill icons referenced in `skills.ts`
- `public/icon/tools/` - Tool icons organized by ring level for orbit visualization:
  - `anillo-0/` through `anillo-4/` - Five concentric rings for DevelopmentToolsOrbit component
- Professional documents (CV) and project screenshots in `public/project/`

## Requirements
- Node.js v23.x (as specified in README)
- npm for package management

## Build Process
The build command includes dependency installation, type checking via `astro check`, and production build generation.

## Common Editing Tasks

### Adding New Professional Experience
Edit `src/data/experiences.ts`:
- Add new entry to `experiences` array
- Include company icon in `public/icon/empresas/`
- Use nested `Position` objects for multiple roles at same company
- Specify technologies at position and/or experience level

### Adding New Skills
Edit `src/data/skills.ts`:
- Add skill with name, icon path, and category
- Categories: "Backend", "Frameworks", "Gestores de Bases de Datos", "Infraestructura", "QA & Testing"
- Add corresponding icon to `public/icon/skills/`

### Adding New Projects
Edit `src/data/proyects.ts` (note: typo in filename):
- Include title, imageUrl, description, technologies array
- Optional: documentacionUrl (markdown page), githubUrl, projectUrl
- Add project screenshots to `public/project/`