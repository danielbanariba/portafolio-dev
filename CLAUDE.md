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
- `skills.ts` - Technical skills categorization
- `projects.ts` - Portfolio projects
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
- Animation components utilize GSAP and Framer Motion
- Responsive design with mobile-first Tailwind approach

#### Content Management
- All dynamic content lives in typed data files
- Professional experience uses nested Position interface for detailed role descriptions
- Technologies are tracked both at position and experience levels
- Static assets are organized by category in public/ directory

### Asset Organization
- Icons organized by category (education, skills, tools, companies)
- Multi-ring tool organization system for skill visualization
- Professional documents (CV) and project screenshots included
- Custom fonts and branding assets

## Requirements
- Node.js v23.x (as specified in README)
- npm for package management

## Build Process
The build command includes dependency installation, type checking via `astro check`, and production build generation.