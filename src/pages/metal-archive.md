---
layout: "/src/layouts/MarkdownLayout.astro"
title: Metal Archive - Catalogo de Metal Underground
---

Catalogo web de 1300+ albums de metal underground vinculado a un canal de YouTube. Sincroniza automaticamente los videos del canal, enriquece los datos con artwork de alta calidad, normaliza generos y paises, y ofrece busqueda, descubrimiento y un reproductor integrado.

Originalmente construido con Reflex (Python full-stack). **Migrado a Astro SSG** tras un problema de rendimiento de fondo: Reflex renderiza todo via WebSocket, asi que cada pagina bajaba ~1MB de JS + 687KB de CSS y abria un WebSocket para hidratar el estado antes de pintar un solo album. Como el catalogo es contenido estatico (igual para todos, cambia cada 12h), la herramienta correcta era un sitio estatico, no una app con estado en tiempo real.

## Resultado de la migracion

| Metrica                 | Reflex (antes)                          | Astro (ahora)                |
| ----------------------- | --------------------------------------- | ---------------------------- |
| Carga de pagina         | 1MB JS + 687KB CSS + hydration ~967ms   | HTML completo en ~0.2s       |
| JS en paginas de lectura| ~1MB (socket.io + state engine)         | 0 bytes                      |
| Contenido               | shell vacio que hidrataba por WebSocket | renderizado en el HTML       |
| Build catalogo completo | n/a (todo en runtime)                   | 1679 paginas en ~3.5s        |

---

## Arquitectura (Astro hibrido)

![Diagrama de arquitectura hibrida](/project/metal-archive/arquitectura.svg)

```
┌─────────────────────────────────────────────────────────────────┐
│                      METAL ARCHIVE (Astro)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────┐       │
│  │  STATIC SSG (Astro, 0 JS por defecto)               │       │
│  │                                                      │       │
│  │  Bio en /  ──  Archive en /metal-archive/*          │       │
│  │  album/[id] (1298) ── band/[band] (92)              │       │
│  │  genre/[g] ── country/[c] ── year/[y] ── browse     │       │
│  │  submit ── promo ── newsletter                       │       │
│  │                                                      │       │
│  │  Pre-renderizado desde SQLite en build time          │       │
│  └────────────────────┬─────────────────────────────────┘       │
│                       │                                         │
│  ┌────────────────────▼─────────────────────────────────┐       │
│  │  ISLANDS (Preact, hidratan solo donde hay interaccion)│      │
│  │                                                      │       │
│  │  Player.tsx ── YouTube IFrame, now-playing,          │       │
│  │                autoplay sincronico, mini-player       │       │
│  │  Search.tsx ── filtro/orden/paginacion client-side    │       │
│  │                sobre un indice JSON (~50KB gz)         │       │
│  └────────────────────┬─────────────────────────────────┘       │
│                       │                                         │
│  ┌────────────────────▼─────────────────────────────────┐       │
│  │  DATA (build time)                                   │       │
│  │                                                      │       │
│  │  better-sqlite3 (read-only) sobre reflex.db          │       │
│  │  Albums · Tracks · SimilarBands · Submissions ·      │       │
│  │  Newsletter · ContactMessages                        │       │
│  └──────────────────────────────────────────────────────┘       │
│                                                                 │
│  ┌──────────────────────────────────────────────────────┐       │
│  │  FORMS (FastAPI en el host, no serverless)           │       │
│  │                                                      │       │
│  │  /api/metal-archive/{submit,promo,newsletter,contact}│       │
│  │  Escribe a la misma SQLite + Gmail SMTP              │       │
│  │  (serverless no puede escribir la DB local)          │       │
│  └──────────────────────────────────────────────────────┘       │
│                                                                 │
│  ┌──────────────────────────────────────────────────────┐       │
│  │  SYNC + AUTO-DEPLOY (daemon, cada 12h)               │       │
│  │                                                      │       │
│  │  YouTube API ─► DB ─► npm run build ─► vercel deploy │       │
│  └──────────────────────────────────────────────────────┘       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Decisiones tecnicas clave

**SSG puro, no ISR.** El catalogo son ~1500 paginas. Un spike midio que generarlas todas tarda ~2.5s, asi que ISR/on-demand solo agregaria complejidad (cache, cold starts) sin beneficio a esta escala. Build completo bajo 5s.

**Build local + `vercel deploy --prebuilt`.** El build necesita `reflex.db`, que vive solo en el host (gitignored). En vez de subir la DB a la nube, el build corre localmente (donde estan los datos) y se publica el output pre-construido a Vercel. Cero infra nueva.

**Theming dinamico en build time.** Cada pagina de album extrae el color dominante de su portada con node-vibrant y lo hornea como variable CSS (`--album-color`) — el fondo "se tine" del color del album sin JS en runtime. Las portadas `.webp` (que node-vibrant/Jimp no decodifica) se procesan con `sharp`; la extraccion respeta rate-limits del CDN con backoff. Resultado: 1298/1298 portadas con color real, cacheadas para builds incrementales.

**Autoplay sin perder el user-gesture.** El reproductor es un island de Preact que controla el IFrame Player de YouTube. El click en una cancion llama `seekTo` + `playVideo` de forma sincronica en el handler (sin round-trip a un backend), preservando el gesto del usuario que exigen las politicas de autoplay del navegador. Auto-avance por timestamp: como cada album es un solo video, el progreso compara contra el inicio de la siguiente pista y avanza el nombre/resaltado al cruzar cada limite.

**Solo lo interactivo lleva JS.** Astro envia 0 JS por defecto. Los unicos islands son el reproductor (en paginas de album) y el buscador (en browse). Todo lo demas — home, facetas, paginas de banda — es HTML estatico puro.

---

## Pipeline de Sincronizacion (sin cambios desde Reflex)

Un daemon thread sincroniza el canal de YouTube con la base de datos cada 12 horas:

```
YouTube Data API v3 (API Key, sin OAuth)
        │
        ▼
Uploads playlist ─► paginar videos + snippet/contentDetails/statistics
        │
        ▼
parse_title_metadata()       ─► banda, album, año, genero, pais, tipo
parse_description_metadata() ─► tracklist, links de streaming, metadata
   (soporta 2 formatos: "[00:08] > Track" y el legacy "0 - Track (00:00)")
        │
        ▼
Upsert por youtube_video_id (batch cada 50)
Cleanup de huerfanos (albums cuyo video se elimino) con umbral de seguridad
        │
        ▼
Normalizar generos/paises ─► Enriquecer artwork (DeathGrind/Metal Archives)
        │
        ▼
npm run build ─► vercel deploy --prod --prebuilt   (auto-deploy)
```

La autenticacion paso de OAuth (refresh tokens que expiraban cada pocos meses) a una **API Key** que no expira — solo lee datos publicos del canal, asi que OAuth era innecesario.

---

## Funcionalidades

- **Reproductor integrado** con tracklist navegable, now-playing bar, mini-player flotante y estados de carga/error.
- **Theming por album** — el color de cada portada tine la pagina.
- **Paginas de banda** (estilo Navidrome) — el nombre de banda es clickeable cuando tiene 2+ trabajos y lleva a su discografia.
- **Live Recordings** separadas del catalogo oficial (grabaciones personales en vivo), con portada propia.
- **Busqueda client-side** sobre un indice JSON ligero (sin llamadas al servidor).
- **Descubrimiento**: Editor's Picks, Hidden Gems, showcases por genero, rotacion por pais, boton "Surprise Me".
- **Formularios** (submit/promo/newsletter/contact) via FastAPI con notificacion por Gmail SMTP.

---

## Stack Tecnologico

| Categoria     | Tecnologias                                              |
| ------------- | ------------------------------------------------------- |
| Frontend      | Astro 6 (SSG) + islands de Preact + TypeScript          |
| Estilos       | CSS propio (design system "Xerox Underground")          |
| Datos (build) | better-sqlite3 sobre SQLite (read-only)                 |
| Theming       | node-vibrant + sharp (extraccion de color en build)     |
| Formularios   | FastAPI (host) + Gmail SMTP                              |
| Sync          | Python daemon (12h) — YouTube Data API v3 (API Key)     |
| Artwork       | DeathGrind.club API, Metal Archives API, YouTube HD     |
| Deploy        | Build local + Vercel (`--prebuilt`) + Cloudflare Tunnel |
