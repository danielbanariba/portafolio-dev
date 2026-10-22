---
layout: "/src/layouts/MarkdownLayout.astro"
title: FUNDAMUVI — Sitio web de una fundación de música
description: Sitio web de FUNDAMUVI (Fundación Música para Vivir), una fundación de Tegucigalpa que da educación musical gratuita. Hecho a partir de mi propio boceto a mano, bilingüe español e inglés, con Astro 7, CSS puro, accesibilidad y movimiento reducido.
---

Sitio web de **FUNDAMUVI** (Fundación Música para Vivir), una fundación de Tegucigalpa, Honduras, que da educación musical gratuita a niños y jóvenes en situación de vulnerabilidad. El diseño, el desarrollo y las pruebas son míos, y la vista previa corre en mi propio dominio.

**Vista previa:** [fundamuvi.danielbanariba.com](https://fundamuvi.danielbanariba.com). Es una vista previa: los formularios (donación y contacto) no envían nada.

![Portada del sitio de FUNDAMUVI en escritorio: una tarjeta amarilla con el logo, el título "La música cambia vidas" y el botón Donar, sobre una foto de estudiantes tocando guitarra con los rostros difuminados](/project/fundamuvi/hero-escritorio.jpg)

Los rostros de los niños están difuminados en todas las capturas de esta página.

---

## De dónde sale el diseño

Antes de escribir código preparé dos cosas, y el diseño sale de ellas:

- Un boceto dibujado a mano, en un PDF de 5 páginas.
- Una investigación de 11 sitios de referencia de ONG y escuelas de música.

---

## Qué hice, sección por sección

El inicio es una sola página. Estas son sus secciones, en orden:

1. **Portada.** El logo, el título y el botón Donar sobre una foto a todo el ancho.
2. **Quiénes somos.** La idea de la fundación: la música es un derecho, no un privilegio.
3. **Historia.** Una línea de tiempo, desde 2022.
4. **Estadísticas.** Cifras con contadores animados.
5. **Donación.** Una banda con un botón que abre un diálogo: donación puntual o periódica, montos en lempiras y pago con tarjeta o transferencia. Es un formulario de Netlify.
6. **Galería.** Un carrusel de fotos con visor ampliado (lightbox).
7. **Testimonios.**
8. **Ubicación.** El mapa de Google con el punto exacto y un formulario de contacto, también de Netlify.
9. **Noticias.** La última noticia destacada y un carrusel con el resto.
10. **Clases.** Cinco tarjetas de instrumentos: guitarra, piano, bajo, canto y batería.

![Sección de historia en escritorio: el título "Nuestra historia" y una línea de tiempo con los años 2022 y 2023 en cifras grandes de colores](/project/fundamuvi/historia.jpg)

![El diálogo de donación abierto sobre el sitio: tipo de donación puntual o periódico, montos de L 100 a L 1,000 u otro, nombre, correo y método de pago](/project/fundamuvi/donacion.jpg)

![Sección de clases disponibles en escritorio: tarjetas de guitarra, piano y bajo con su ilustración, y dos más debajo](/project/fundamuvi/clases.jpg)

### Una página por instrumento

Cada instrumento tiene su propia página, en español y en inglés: qué se va a aprender, una foto de las clases y una invitación a escribir o llamar a la fundación.

![Página del piano en escritorio: el título "Piano", un botón "Quiero aprender piano" y la ilustración de un piano morado sobre un fondo lila](/project/fundamuvi/piano.jpg)

### Blog

Diseñé el blog para que se vea igual que el resto del sitio. Usa colecciones de contenido con MDX y tiene un feed RSS.

![Índice del blog en escritorio: el título "Noticias" y tres tarjetas de noticias con foto, con los rostros difuminados](/project/fundamuvi/blog.jpg)

### Dos idiomas

El español está en `/` y el inglés en `/en/`. El inglés refleja el mismo sitio, y el botón de idioma te deja en la misma página al cambiar. En total se generan 20 páginas.

### En el teléfono

<img src="/project/fundamuvi/movil.webp" alt="El sitio en dos teléfonos de 390 px de ancho: a la izquierda la portada, con los rostros difuminados, y a la derecha la sección de clases con la tarjeta de guitarra" style="border: 0; box-shadow: none;" />

---

## Cómo lo probé

- `astro check` y el build, sin advertencias.
- Scripts de verificación que corrí en local contra el sitio construido, en español y en inglés: más de mil comprobaciones automáticas repartidas entre las secciones.
- Una revisión de código independiente de cada parte antes de integrarla.

## Accesibilidad

- Funciona sin JavaScript: los formularios envían y los carruseles se desplazan.
- Los carruseles y el visor de la galería se manejan con el teclado.
- Respeta `prefers-reduced-motion`: con movimiento reducido solo quedan fundidos suaves.
- El build falla si una foto de la galería no tiene texto alternativo.

---

## Stack

- **Framework:** Astro 7, con build estático y muy poco JavaScript.
- **Estilos:** CSS puro con tokens de diseño (variables CSS), sin framework de CSS.
- **Contenido:** colecciones de contenido con MDX, feed RSS y sitemap.
- **Formularios:** Netlify Forms (donación y contacto).
- **Idiomas:** español e inglés, con los textos en archivos JSON.

[Ver la vista previa](https://fundamuvi.danielbanariba.com)
