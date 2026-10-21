---
layout: "/src/layouts/MarkdownLayout.astro"
title: Arsenal de Odio — Sitio web de la banda
description: Rediseño del sitio web oficial de Arsenal de Odio, banda de thrash metal de Tegucigalpa. Dirección de arte, desarrollo con Astro, animación con GSAP, pruebas con Playwright y accesibilidad.
---

Sitio web oficial de **Arsenal de Odio**, una banda de thrash metal de Tegucigalpa, Honduras. Son cinco integrantes, y su álbum debut, *Muerte en el Mosh* (2023), tiene diez temas. El diseño, el desarrollo, las pruebas y la publicación son míos.

**En vivo:** [arsenaldeodio.danielbanariba.com](https://arsenaldeodio.danielbanariba.com)

![Portada del sitio de Arsenal de Odio en escritorio: el logo de la banda sobre una foto en blanco y negro del cantante en vivo, con la frase "Thrash metal de Tegucigalpa"](/project/arsenal-de-odio/hero-escritorio.jpg)

---

## Antes y después

El sitio anterior era un port directo de uno más viejo: una tipografía de caricatura para el texto corrido, componentes de DaisyUI, secciones con el título centrado sobre una grilla y filas de tarjetas idénticas en amarillo y rojo.

![El sitio anterior: encabezado amarillo con una franja roja, menú en tipografía de caricatura y una foto de la banda con el público](/project/arsenal-de-odio/antes.jpg)

Antes de rediseñar estudié los sitios oficiales de Slayer, Cannibal Corpse y otras bandas de metal. De ahí salió la dirección de arte: **"el afiche fijado"**.

- Un solo fondo negro (`#0a0a0a`), una sola tinta hueso y un único acento rojo sangre (`#cb2c1d`), que solo se usa en la acción principal.
- Una sola tipografía, General Sans, alojada en el propio sitio, en cinco tamaños.
- Esquinas rectas. Sin degradados, sin sombras y sin líneas decorativas.

---

## Qué hice, sección por sección

1. **Inicio.** El logo de la banda es el título principal y queda a caballo sobre una franja de video en vivo a todo el ancho. Al hacer scroll, tres fotos en vivo la cubren con un barrido (GSAP ScrollTrigger). Un botón de pausa y reproducción controla el video, siguiendo la pauta WCAG 2.2.2.
2. **Canciones.** Los diez temas con el reproductor de Spotify. El reproductor se mantiene a la vista y una línea de estado anuncia el tema que suena.
3. **Fechas.** Un estado vacío digno. Las fechas que ya pasaron se ocultan solas.
4. **Mercadería.** Solo fotos reales: el CD y la camiseta "Hada de las Birrias". Sin maquetas ni precios inventados: donde no hay precio dice "Precio a consultar". Los pedidos van por Instagram y Facebook; no hay pasarela de pago, por decisión.
5. **Galería.** Fotos en vivo de Tony Ávila, que alternan un cuadro a todo el ancho con dos de medio ancho.
6. **Banda.** Los integrantes.
7. **Contacto.** El usuario de Instagram, compuesto como tipografía de exhibición.
8. **Página 404** propia.

![Sección de canciones en escritorio: el título "Muerte en el Mosh", el reproductor de Spotify y la lista de temas con su duración](/project/arsenal-de-odio/canciones.jpg)

![Sección de mercadería en escritorio: dos fichas sobre una foto en blanco y negro de un show en vivo, una con el CD "Muerte en el Mosh" y otra con la camiseta roja "Hada de las Birrias"](/project/arsenal-de-odio/mercaderia.jpg)

![Galería en escritorio: una foto de ancho completo de un guitarrista con una guitarra verde y, debajo, dos fotos de medio ancho](/project/arsenal-de-odio/galeria.jpg)

### En el teléfono

![El sitio en un teléfono de 390 px de ancho: a la izquierda la portada y a la derecha la sección de canciones con el reproductor de Spotify](/project/arsenal-de-odio/movil.jpg)

---

## Cómo lo probé

Lo probé con Playwright en 10 tamaños de pantalla, de 360x640 a 1920x1080. Además:

- solo con teclado;
- con movimiento reducido;
- sin JavaScript;
- con el texto del navegador al 200 %.

La primera pasada encontró **9 errores**. Corregí los que dependían del sitio y volví a verificar todo en el sitio publicado, en unas 100 ejecuciones de prueba. Quedan abiertos dos detalles menores: las paradas de tabulación que agrega el reproductor de Spotify y el menú del teléfono, que sin JavaScript no se cierra solo. Algunos de los errores corregidos:

- el primer click del menú caía corto de su sección;
- la portada daba un salto cuando la barra del navegador del teléfono cambiaba de tamaño;
- el reproductor se salía de la pantalla al tocar un tema;
- los títulos se recortaban con el texto al 200 %;
- los objetivos táctiles del teléfono medían menos de 44 px.

## Accesibilidad

- Enlace para saltar al contenido y foco visible.
- En el menú del teléfono el foco queda atrapado y Escape lo cierra.
- Objetivos táctiles de 44 px o más.
- Cada animación tiene una versión para movimiento reducido y otra sin JavaScript.
- `aria-current` en el tema que suena y un anuncio con `role="status"`.

## Rendimiento y SEO

- Build estático de Astro.
- Las imágenes del contenido salen en AVIF y WebP con `srcset` (sharp).
- Fuentes alojadas en el propio sitio.
- Cambio de diseño acumulado (CLS) medido en 0.001 o menos.
- SEO: canonical, Open Graph y Twitter cards, JSON-LD de la banda y del álbum, sitemap y robots.

## Publicación

El sitio corre en mi propio servidor, servido por un servicio de systemd detrás de un Cloudflare Tunnel, en un subdominio de danielbanariba.com.

---

## Stack

- **Framework:** Astro 6, con build estático.
- **Estilos:** Tailwind CSS v4 solo para el reset; los estilos van por componente.
- **Animación:** GSAP ScrollTrigger.
- **Lenguaje:** TypeScript.
- **Imágenes:** sharp.
- **Pruebas:** Playwright.

[Ver el sitio en vivo](https://arsenaldeodio.danielbanariba.com)
