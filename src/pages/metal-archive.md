---
layout: "/src/layouts/MarkdownLayout.astro"
title: Metal Archive - Catalogo de Metal Underground
---

Catalogo web de albums de metal underground vinculado a un canal de YouTube. Sincroniza automaticamente los videos del canal, enriquece los datos con artwork de alta calidad, normaliza generos y paises, y ofrece una interfaz de busqueda y descubrimiento para los usuarios.

Construido con Reflex (Python full-stack) y desplegado en una arquitectura dual Vercel + Reflex Cloud.

## Arquitectura General

```
┌─────────────────────────────────────────────────────────────────┐
│                      METAL ARCHIVE                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────┐       │
│  │  FRONTEND (Reflex Components)                        │       │
│  │                                                      │       │
│  │  9 paginas con rutas dinamicas                       │       │
│  │  Landing ── Browse ── Album Detail                   │       │
│  │  Genre/[genre] ── Country/[country] ── Year/[year]   │       │
│  │  Submit ── Promo ── Newsletter                       │       │
│  │                                                      │       │
│  │  Estado via WebSocket (MetalArchiveState)            │       │
│  └────────────────────┬─────────────────────────────────┘       │
│                       │                                         │
│  ┌────────────────────▼─────────────────────────────────┐       │
│  │  BACKEND (Reflex State + SQLModel)                   │       │
│  │                                                      │       │
│  │  MetalArchiveState ── Busqueda, filtros, paginacion  │       │
│  │  FormState ────────── Submissions, newsletter, promo │       │
│  └────────────────────┬─────────────────────────────────┘       │
│                       │                                         │
│  ┌────────────────────▼─────────────────────────────────┐       │
│  │  DATA LAYER                                          │       │
│  │                                                      │       │
│  │  SQLite (SQLModel + Alembic migrations)              │       │
│  │  ┌────────┐ ┌───────┐ ┌─────────────┐                │       │
│  │  │ Albums │ │ Tracks│ │ SimilarBands│                │       │
│  │  └───┬────┘ └───┬───┘ └──────┬──────┘                │       │
│  │      │          │             │                      │       │
│  │      └──────────┴─────────────┘                      │       │
│  │ FK: album_id (sin relationship(), joins manuales)    │       │
│  │                                                      │       │
│  │  ┌──────────────┐ ┌────────────┐ ┌────────────────┐  │       │
│  │  │ Submissions  │ │ Newsletter │ │ ContactMessages│  │       │
│  │  └──────────────┘ └────────────┘ └────────────────┘  │       │
│  └──────────────────────────────────────────────────────┘       │
│                                                                 │
│  ┌──────────────────────────────────────────────────────┐       │
│  │  BACKGROUND SYNC (daemon thread, cada 12h)           │       │
│  │                                                      │       │
│  │  YouTube API ──► Parse ──► Upsert DB                 │       │
│  │       ──► Normalizar generos/paises                  │       │
│  │       ──► Enriquecer artwork (DeathGrind + fallback) │       │
│  └──────────────────────────────────────────────────────┘       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Pipeline de Sincronizacion

Un daemon thread sincroniza el canal de YouTube con la base de datos cada 12 horas en 3 fases:

```
┌─────────────────────────────────────────────────────────────────┐
│  DAEMON THREAD (background_sync.py)                             │
│  Inicio: 60s despues del boot (0s si DB vacia)                  │
│  Intervalo: 12 horas                                            │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐     │
│  │  FASE 1: YouTube Sync (sync_youtube_to_db.py)          │     │
│  │                                                        │     │
│  │  YouTube API v3 (OAuth2, rotacion de 7 credenciales)   │     │
│  │         │                                              │     │
│  │         ▼                                              │     │
│  │  Obtener uploads playlist del canal                    │     │
│  │         │                                              │     │
│  │         ▼                                              │     │
│  │  Paginar videos (maxResults=50)                        │     │
│  │  + enriquecer con snippet/contentDetails/statistics    │     │
│  │         │                                              │     │
│  │         ▼                                              │     │
│  │  Parsear cada video:                                   │     │
│  │                                                        │     │
│  │  Titulo: "[🇭🇳] Band - Album (2024) . [Genre] <FULL>"   │     │
│  │           │                                            │     │
│  │           ▼                                            │     │
│  │  parse_title_metadata() ──► banda, album, año,         │     │
│  │                              genero, pais, tipo        │     │
│  │                                                        │     │
│  │  Descripcion: linea por linea                          │     │
│  │           │                                            │     │
│  │           ▼                                            │     │
│  │  parse_description_metadata() ──►                      │     │
│  │    Tracks:  "[00:08] > Track Name"                     │     │
│  │    Links:   "🟢 Spotify: https://..."                  │     │
│  │    Metadata: "Country: Honduras"                       │     │
│  │                                                        │     │
│  │  Upsert por youtube_video_id (batch commit cada 50)    │     │
│  │  Top 10 por views ──► featured = True                  │     │
│  └────────────────────────┬───────────────────────────────┘     │
│                           │                                     │
│  ┌────────────────────────▼───────────────────────────────┐     │
│  │  FASE 2: Normalizacion (normalize_db.py)               │     │
│  │                                                        │     │
│  │  Generos:                                              │     │
│  │  - Quitar prefijos numericos "(9)Metal" ──► "Metal"    │     │
│  │  - Unificar separadores (,|;) ──► "/"                  │     │
│  │  - Corregir typos: "grincore" ──► "Grindcore"          │     │
│  │  - Merge inversos: "Death/Black" vs "Black/Death"      │     │
│  │                                                        │     │
│  │  Paises:                                               │     │
│  │  - Ingles ──► Español (120+ mappings)                  │     │
│  │  - "United States" ──► "Estados Unidos"                │     │
│  │  - Corregir typos: "mexic" ──► "Mexico"                │     │
│  └────────────────────────┬───────────────────────────────┘     │
│                           │                                     │
│  ┌────────────────────────▼───────────────────────────────┐     │
│  │  FASE 3: Artwork Enrichment (batch de 50)              │     │
│  │                                                        │     │
│  │  Albums con thumbnail de YouTube                       │     │
│  │  (ytimg.com o vacio)                                   │     │
│  │         │                                              │     │
│  │         ▼                                              │     │
│  │  ┌─────────────────────────────────┐                   │     │
│  │  │ 1. DeathGrind.club API          │                   │     │
│  │  │    Login ──► Search banda+album │                   │     │
│  │  │    3 niveles de matching:       │                   │     │
│  │  │    Exacto > Parcial > Solo banda│                   │     │
│  │  │    CDN: cdn.deathgrind.club     │                   │     │
│  │  └──────────┬──────────────────────┘                   │     │
│  │             │ Si no encuentra                          │     │
│  │             ▼                                          │     │
│  │  ┌─────────────────────────────────┐                   │     │
│  │  │ 2. Metal Archives API           │                   │     │
│  │  │    Busqueda avanzada de albums  │                   │     │
│  │  │    Extraer URL de portada       │                   │     │
│  │  └──────────┬──────────────────────┘                   │     │
│  │             │ Si no encuentra                          │     │
│  │             ▼                                          │     │
│  │  ┌─────────────────────────────────┐                   │     │
│  │  │ 3. YouTube HD fallback          │                   │     │
│  │  │    Upgrade a maxresdefault      │                   │     │
│  │  └─────────────────────────────────┘                   │     │
│  └────────────────────────────────────────────────────────┘     │
│                                                                 │
│  Logica incremental vs full:                                    │
│  - DB < 100 albums ──► siempre full sync                        │
│  - DB >= 100 ──► incremental (solo nuevos)                      │
│  - Cada 4to ciclo ──► full sync para llenar gaps                │
│                                                                 │
│  Credenciales YouTube: rotacion automatica en quotaExceeded     │
│  (hasta 7 sets de client_id/secret/refresh_token)               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Sistema de Busqueda y Filtrado

```
┌──────────────────────────────────────────────────────────────────┐
│  MetalArchiveState (rx.State)                                    │
│                                                                  │
│  LANDING PAGE                                                    │
│  ┌──────────────────────────────────────────────────────┐        │
│  │  featured_albums ──► Top 10 por views (featured=True)│        │
│  │  latest_albums ────► 12 mas recientes por upload_date│        │
│  │  genre_counts ─────► GROUP BY genre + COUNT          │        │
│  │  country_counts ──► GROUP BY country + COUNT         │        │
│  │  year_counts ──────► GROUP BY year + COUNT (5+ albums)│       │
│  └──────────────────────────────────────────────────────┘        │
│                                                                  │
│  LIVE SEARCH (cada keystroke)                                    │
│  ┌──────────────────────────────────────────────────────┐        │
│  │  Input >= 2 caracteres                               │        │
│  │         │                                            │        │
│  │         ▼                                            │        │
│  │  ILIKE %query% en:                                   │        │
│  │  band_name, album_title, genre                       │        │
│  │         │                                            │        │
│  │         ▼                                            │        │
│  │  Top 8 resultados por views DESC                     │        │
│  │  Dropdown con live_search_open = True                │        │
│  └──────────────────────────────────────────────────────┘        │
│                                                                  │
│  BROWSE (filtros combinables)                                    │
│  ┌──────────────────────────────────────────────────────┐        │
│  │  Filtros:                                            │        │
│  │  search_query + filter_genre + filter_country        │        │
│  │  + filter_year + filter_release_type                 │        │
│  │                                                      │        │
│  │  Orden:                                              │        │
│  │  newest | oldest | az | za | views                   │        │
│  │                                                      │        │
│  │  Paginacion:                                         │        │
│  │  offset + limit (12) ──► fetch limit+1 para has_more │        │
│  │  "Cargar mas" appends a lista existente              │        │
│  │                                                      │        │
│  │  URL-driven: /browse?genre=Death+Metal               │        │
│  │  Random filters: genero o pais aleatorio             │        │
│  └──────────────────────────────────────────────────────┘        │
│                                                                  │
│  ALBUM DETAIL (/album/[id])                                      │
│  ┌──────────────────────────────────────────────────────┐        │
│  │  Album + Tracks (ordenados por track_number)         │        │
│  │  + SimilarBands                                      │        │
│  │  + Albums similares (mismo genero, top 4 por views)  │        │
│  │  + YouTube embed + links de streaming                │        │
│  └──────────────────────────────────────────────────────┘        │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Modelo de Datos

```
┌─────────────────────────────────────────────────────────────────┐
│  SQLite (SQLModel + Alembic)                                    │
│                                                                 │
│  albums ────────────────────────────────────────────────────────│
│  │ band_name (idx)        │ album_artwork_url                │  │
│  │ album_title (idx)      │ youtube_url                      │  │
│  │ year (idx)             │ spotify_url, bandcamp_url        │  │
│  │ country (idx)          │ apple_music_url                  │  │
│  │ genre (idx)            │ metal_archives_url               │  │
│  │ release_type (idx)     │ facebook_url, instagram_url      │  │
│  │ youtube_video_id (uniq)│ description                      │  │
│  │ views (idx)            │ duration_minutes                 │  │
│  │ featured (idx)         │ upload_date (idx)                │  │
│  │                                                           │  │
│  │  FK album_id                                              │  │
│  │  ├──► tracks (track_number, track_name, timestamp)        │  │
│  │  └──► similar_bands (similar_band_name)                   │  │
│  │                                                           │  │
│  submissions ── band_name, email, genre, country, status     │  │
│  newsletter_subscribers ── email (uniq), active              │  │
│  contact_messages ── name, email, company, message           │  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Despliegue

Arquitectura dual para separar el sitio estatico del backend con estado:

```
┌──────────────────┐         ┌──────────────────────────┐
│     Vercel       │         │     Reflex Cloud         │
│                  │         │                          │
│  Portfolio       │  proxy  │  Metal Archive           │
│  estatico        │────────►│  (Python + WebSocket)    │
│                  │         │                          │
│  /metal-archive/*│ ──────► │  /metal-archive/*        │
│  (vercel.json    │         │                          │
│   redirects)     │         │  SQLite + Daemon thread  │
│                  │         │  (sync cada 12h)         │
└──────────────────┘         └──────────────────────────┘
```

Alternativa local: systemd timer (`sync_web.timer`) ejecuta la sincronizacion 2 veces al dia (06:00 y 18:00).

---

## Formularios

**Submission de bandas** (`/metal-archive/submit`): Las bandas envian su musica para ser considerada en el canal. Se guarda en DB con status "pendiente".

**Promo** (`/metal-archive/promo`): Formulario extendido con hasta 5 links adicionales y selector de genero custom. Envia notificacion por email via Gmail SMTP.

**Newsletter** (`/metal-archive/newsletter`): Registro de email para actualizaciones. Lista de suscriptores almacenada en DB.

---

## Stack Tecnologico

| Categoria     | Tecnologias                                         |
| ------------- | --------------------------------------------------- |
| Framework     | Reflex 0.8.26 (Python full-stack, WebSocket state)  |
| Base de datos | SQLite via SQLModel + Alembic migrations            |
| APIs externas | YouTube Data API v3 (OAuth2, 7 credenciales)        |
| Artwork       | DeathGrind.club API, Metal Archives API, YouTube HD |
| Email         | Gmail SMTP (notificaciones de promo)                |
| Deploy        | Vercel (static proxy) + Reflex Cloud (backend)      |
| Sync          | Daemon thread (12h) o systemd timer (2x/dia)        |
