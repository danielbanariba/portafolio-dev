# Portafolio — Daniel Banariba

Sitio web personal de Daniel Banariba (Ingeniero de Software · Data Engineer · Backend Developer). Portafolio estático que reúne experiencia laboral, proyectos, skills, educación y un CV descargable.

🔗 **En vivo:** [danielbanariba.dev](https://danielbanariba.dev)

## Stack

- **[Astro 7](https://astro.build)** — framework principal, salida estática con arquitectura de islas
- **React 18** (`@astrojs/react`) — componentes interactivos (timeline, efectos hover)
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **GSAP** y **Framer Motion** — animaciones
- **TypeScript**
- Contenido en **Markdown** + **Astro Content Collections** (`src/content.config.ts`)

## Requisitos

- **Node.js 23.11.0** — fijado en `.nvmrc` (con nvm: `nvm use`)
- npm

## Desarrollo

```bash
npm install        # instala dependencias
npm run dev        # servidor de desarrollo → http://localhost:4321
npm run build      # build de producción (astro check + astro build) → dist/
npm run preview    # previsualiza el build de producción
```

> El script `build` corre `astro check` antes de `astro build`. **Importante:** `astro dev` no detecta todos los errores de compilación — verificá siempre con `npm run build` antes de publicar.

## Estructura

```text
src/
├── components/        # componentes Astro + islas React (.jsx / .tsx)
│   └── AboutMe/
├── data/              # ← CONTENIDO editable del sitio (ver abajo)
│   ├── experiences.ts
│   ├── proyects.ts
│   ├── skills.ts
│   ├── education.ts
│   ├── conferences.ts
│   └── testimonials.ts
├── pages/             # index.astro + detalle de proyectos en Markdown
│   ├── index.astro
│   ├── navidrome.md
│   ├── metal-archive.md
│   ├── canal-youtube-automatizado.md
│   ├── inventario-personal.md
│   └── sistema-contable.md
├── content.config.ts  # colecciones de contenido de Astro
├── layouts/
└── styles/global.css

public/
├── document/cv_daniel_banariba.pdf   # CV descargable
└── icon/skills/                      # iconos SVG de las skills
```

## Actualizar el contenido

El sitio es **data-driven**: casi todo se edita en `src/data/*.ts`, sin tocar componentes.

| Qué | Dónde |
|-----|-------|
| Experiencia laboral | `src/data/experiences.ts` |
| Proyectos (cards) | `src/data/proyects.ts` |
| Skills | `src/data/skills.ts` — cada skill necesita su ícono SVG en `public/icon/skills/` |
| Educación | `src/data/education.ts` |
| Charlas / conferencias | `src/data/conferences.ts` |
| Testimonios | `src/data/testimonials.ts` |
| Página de detalle de un proyecto | `src/pages/<slug>.md` |
| CV descargable | `public/document/cv_daniel_banariba.pdf` |

## Deploy

Build estático (`dist/`). Se despliega automáticamente al hacer **push a `main`**.
