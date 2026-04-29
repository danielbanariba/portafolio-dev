---
layout: '/src/layouts/MarkdownLayout.astro'
title: Navidrome — Open Source
---

[Navidrome](https://github.com/navidrome/navidrome) es un servidor de streaming musical self-hosted con más de **20,700 estrellas** en GitHub, escrito en Go (backend) y React (frontend). Esta página documenta mis contribuciones mergeadas al proyecto, ordenadas cronológicamente. Cada nueva contribución se agrega como una sección `### PR #` debajo.

![Navidrome — Your Personal Streaming Service](/project/navidrome/banner.jpg)

---

## Resumen

| Tipo | Número | Estado | Issue cerrado |
|------|--------|--------|---------------|
| 🟢 PR | [#5362](https://github.com/navidrome/navidrome/pull/5362) | MERGED | #5108 |
| 🟢 PR | [#5434](https://github.com/navidrome/navidrome/pull/5434) | MERGED | #4836 |
| 🟡 PR | [#5433](https://github.com/navidrome/navidrome/pull/5433) | OPEN | — |
| 🔵 Issue + workaround | [#5366](https://github.com/navidrome/navidrome/issues/5366) | CLOSED | — |
| 💬 Discussion | [#5367](https://github.com/navidrome/navidrome/discussions/5367) | OPEN | — |

---

## Contribuciones

### 🟢 PR #5362 — Filtro "Not Starred" en listas de álbumes/canciones/artistas

**Mergeado por** [@deluan](https://github.com/deluan) (maintainer principal) — cierra el [issue #5108](https://github.com/navidrome/navidrome/issues/5108) que yo mismo había abierto.

**Problema:** Navidrome ya tenía el filtro "Starred" (favoritos) en las listas de álbumes / canciones / artistas, pero no había forma de filtrar por lo opuesto (los **no favoritos**). Un usuario con biblioteca grande (1900+ álbumes en mi caso) no podía explorar lo "que todavía no marcó" sin scrollear todo.

**Solución implementada:** El primer approach que propuse era agregar un segundo `QuickFilter` con `source="notStarred"` y traducirlo en el `wrapperDataProvider` a `starred=false`. Funcionaba, pero tras el review del maintainer pivoté a una solución más limpia: usar `<NullableBooleanInput source="starred" />`, el mismo patrón que ya usa el filtro `missing`. Esto da un input tri-estado (Yes / No / Any) que cubre ambos casos en un solo filtro **sin tocar el dataProvider**.

```jsx
// ui/src/album/AlbumList.jsx (y SongList.jsx, ArtistList.jsx)
{config.enableFavourites && (
  <NullableBooleanInput
    source="starred"
    label={<FavoriteIcon fontSize="small" />}
  />
)}
```

**Diff final vs `master`:** `+3 / -9` líneas (el PR **borra más código del que agrega**).

![Menu de filtros mostrando el corazón disponible](/project/navidrome/pr-5362-filter-menu.png)

**Lección personal:** la primera solución que se te ocurre no siempre es la correcta. El maintainer vio que el patrón `NullableBooleanInput` ya existía para el filtro `missing` y propuso reusarlo — un cambio mucho más limpio y consistente con el resto del codebase. Lección: cuando un maintainer con autoridad técnica te propone otra dirección, **escuchá primero, defendé después**.

---

### 🟢 PR #5434 — Accesibilidad por teclado en la grilla de álbumes

**Mergeado por** [@deluan](https://github.com/deluan) — cierra el [issue #4836](https://github.com/navidrome/navidrome/issues/4836) (abierto desde la versión 0.59.0, ~1 año sin atención).

**Problema:** En la vista de grilla de álbumes, los botones de acción (Play, Favorito, menú contextual) viven dentro de un `GridListTileBar` con `opacity: 0`, y solo se hacían visibles con `:hover` del mouse. Esto generaba **dos problemas separados**:

1. **Accesibilidad (el bug original):** los usuarios que navegan con teclado no veían dónde estaban — la card enfocada no mostraba ningún feedback visual, y los botones eran imposibles de descubrir sin un mouse.
2. **UX pre-existente (descubierto en review):** aunque los botones fueran invisibles (`opacity: 0`), seguían siendo *clickables*. Un usuario que clickeaba "en la portada" del álbum podía accidentalmente disparar Play o el menú contextual oculto.

**Solución:** dos cambios chicos en `ui/src/album/AlbumGridView.jsx`:

```diff
     tileBar: {
       transition: 'all 150ms ease-out',
       opacity: 0,
+      pointerEvents: 'none',
       textAlign: 'left',
       background: '...',
     },
     link: {
       position: 'relative',
       display: 'block',
       textDecoration: 'none',
-      '&:hover $tileBar': {
+      '&:hover $tileBar, &:focus-within $tileBar': {
         opacity: 1,
+        pointerEvents: 'auto',
       },
     },
```

- `:focus-within` activa la visibilidad cuando el `<Link>` o cualquier descendiente recibe foco (cubre tab al tile y tab a los botones internos).
- `pointerEvents: 'none'` por defecto evita que los botones invisibles capturen clicks; se restauran a `'auto'` solo cuando el bar es visible.

**Lección personal:** el segundo cambio (`pointerEvents`) lo trajo el bot de revisión Gemini durante el review, no se me había ocurrido. **Cuando arreglás visibilidad, también pensá en interactividad** — `opacity: 0` no es lo mismo que "no interactivo". Lección incorporada para futuros fixes de a11y.

---

### 🟡 PR #5433 — Traducciones al español (en review)

**Estado:** OPEN, awaiting review humano.

Cambios mínimos a `resources/i18n/es.json`:

- Agregadas las claves faltantes `albumGain` ("Ganancia del álbum") y `trackGain` ("Ganancia de pista") — mismo gap que se había llenado para Brasileño Portugués (#aa84e64) y Ruso (#5329).
- `serverDown`: `"OFFLINE"` → `"DESCONECTADO"`.

**Decisiones de tono:** El primer push proponía traducir `playlists` a `"Listas de reproducción"`, pero después de revisarlo me di cuenta de que el archivo ya usaba `"playlist"` como préstamo en varias líneas (es como Spotify ES lo presenta), así que lo dejé como `"Playlists"`. **Lección: en traducciones, el habla viva del nativo > el diccionario formal.**

---

### 🔵 Issue #5366 — Web UI inutilizable con 7+ pestañas (CLOSED con workaround)

Reporté que al abrir más de 6 tabs de Navidrome simultáneamente, la UI se colgaba: la música se cortaba, los tabs nuevos no cargaban, los API calls quedaban bloqueados.

**Causa raíz que encontré:** cada tab abre **una conexión SSE persistente** en `/events` (`ui/src/eventStream.js:12` → `new EventSource(url)`). Chromium y Firefox imponen un límite duro de **6 conexiones HTTP/1.1 por origen**. Las 6 SSE consumen todos los slots → la 7ma tab no puede ni cargar `index.html`.

**Reproducción:** automatizada con un script Playwright. Tabs 1–6 cargan en ~1s, tab 7 timeout 30s.

**Resolución:** [@deluan](https://github.com/deluan) confirmó que la nueva UI ya está migrando a **WebSockets** y recomendó **HTTP/2** como solución correcta hoy (multiplexa requests sobre una única conexión TCP, eliminando el límite). Cerré el issue con un comentario que documenta el workaround para usuarios futuros que googleen el síntoma:

```caddy
navidrome.localhost {
    reverse_proxy localhost:4533
    tls internal
}
```

Caddy auto-genera CA local + certificado self-signed + HTTP/2. Verificado en mi setup: 10+ tabs cargando en ~1s cada uno, sin colgarse.

**Lección personal:** **Reportar un bug bien también es contribuir.** Aunque el PR para la causa raíz lo va a fijar la migración a WebSockets (no algo que yo escriba), el issue documentado queda permanentemente para cualquier usuario que tropiece con el mismo síntoma.

---

### 💬 Discussion #5367 — CUE como target del plugin system futuro

[Discussion abierto](https://github.com/navidrome/navidrome/discussions/5367) preguntando si los `.cue` files (1 archivo FLAC + 1 .cue describiendo tracks virtuales) podrían ser un target del sistema de plugins una vez que madure. Pivoteo estratégico: no pido reconsiderar el `NOT_PLANNED` previo, sino preguntar por el ángulo de plugin futuro.

Esperando respuesta de maintainers.

---

## Stack técnico aplicado

| Área | Herramientas |
|------|--------------|
| Frontend | React, react-admin v3, JavaScript, CSS, JSX |
| Accesibilidad | `:focus-within`, `pointerEvents`, WCAG AA |
| Backend (lectura/comprensión) | Go, SQLite |
| Testing & verificación | Playwright (Node), Subsonic REST API, scripts curl con auth `t=md5(pass+salt)` |
| Infraestructura local | Caddy con `tls internal` + HTTP/2 + CA local trusted |
| Workflow GitHub | DCO sign-off (`--signoff`), Conventional Commits, cross-repo PRs vía `gh` CLI, replies a inline review comments vía API |

## Métricas de las contribuciones

- **2 PRs mergeados** en menos de 36 horas desde abrir el primero
- **2 issues cerrados** vinculados a esos PRs (#5108, #4836)
- **1 issue propio cerrado con workaround documentado** (#5366)
- **1 PR open en review** (#5433)
- **1 discussion técnica abierta** (#5367)

---

## Próximas contribuciones

Esta página es un documento vivo: cada nueva contribución que sea mergeada al proyecto se agrega como una nueva sección con el formato de las anteriores — **título del PR, maintainer que lo mergeó, problema, solución con diff y lección personal**. La tabla de resumen y las métricas también se actualizan en cada release.

---

## Links

- [Mi perfil de contribuidor en Navidrome](https://github.com/navidrome/navidrome/pulls?q=is%3Apr+author%3Adanielbanariba)
- [Mis PRs mergeados](https://github.com/navidrome/navidrome/pulls?q=is%3Apr+author%3Adanielbanariba+is%3Amerged)
- [Repositorio Navidrome](https://github.com/navidrome/navidrome)
- [Mi fork](https://github.com/danielbanariba/navidrome)
