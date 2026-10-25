---
layout: "/src/layouts/MarkdownLayout.astro"
title: Brutal Ink — Tienda de camisetas con pedidos por WhatsApp
description: Tienda en línea de Brutal Ink, una marca hondureña de camisetas. Catálogo por temas, color y talla con existencias, carrito guardado en el navegador y pedido por WhatsApp con un enlace a una página con fotos. Sitio estático con Astro, sin servidor ni pasarela de pago.
---

Tienda en línea de **Brutal Ink**, una marca hondureña de camisetas y accesorios para juegos de cartas (@brutal_inkhn en Instagram). La gente explora el catálogo por temas, elige color y talla, arma un carrito y manda el pedido por WhatsApp. No hay cuentas ni pasarela de pago: se paga contra entrega o por transferencia bancaria. El diseño, el desarrollo y las pruebas son míos.

**Vista previa:** [brutal-ink.danielbanariba.com](https://brutal-ink.danielbanariba.com). Es una vista previa: el costo de envío y las políticas de cambios siguen pendientes de confirmar con el cliente. El botón "Pedir por WhatsApp" abre WhatsApp con el mensaje ya escrito. Si lo pruebas, no lo envíes: llegaría al WhatsApp real de la marca.

![Portada de la tienda en escritorio: el título "Camisetas con actitud propia" sobre fondo negro, el botón "Ver los temas" y cuatro camisetas con su nombre y su precio en lempiras](/project/brutal-ink/hero-escritorio.jpg)

---

## Qué necesitaba el cliente

Brutal Ink vende camisetas con diseños de rock y metal, anime, terror y cine, y caricaturas y videojuegos, y también playmats para juegos de cartas. Necesitaba una tienda simple:

- un catálogo ordenado por categorías;
- elegir color y talla;
- un carrito y el envío del pedido por WhatsApp;
- nada de cuentas ni pasarela de pago.

---

## Por qué un sitio estático y WhatsApp

- **Sin servidor.** Cada página se genera de antemano, incluida una por producto para poder compartir su enlace. No hay servidor, base de datos ni panel de administración que mantener. El catálogo es un archivo de datos del proyecto y lo edito yo, así que cambiar un precio o una existencia pasa por mí. Ese es el costo de la decisión.
- **WhatsApp como caja.** El pedido sale como un mensaje ya escrito, y la entrega y el pago se confirman en esa conversación. La gente no crea una cuenta ni llena un pago largo. En la encuesta de [Baymard sobre carritos abandonados](https://baymard.com/lists/cart-abandonment-rate), los costos extra (40%), la cuenta obligatoria (18%), un pago largo o complicado (17%) y no ver el total desde el principio (12%) están entre las razones más comunes para abandonar una compra. Por eso el carrito muestra subtotal, envío y total antes de pedir.

---

## Qué hice

El diseño es oscuro, de metal y grunge: un fondo casi negro, un solo acento rojo y títulos en una tipografía condensada y pesada (Big Shoulders Display), para que la foto de cada camiseta sea lo principal. Las fotos de las prendas salen del Instagram de la marca, y el pie de página lo acredita.

1. **Catálogo por temas.** Cuatro temas: Rock y Metal, Anime, Terror y Cine, y Caricaturas y Videojuegos. Son 17 modelos. El tipo de prenda (camiseta, oversize, manga larga u hoodie) es un dato de cada producto, no una categoría.
2. **Página de producto.** Color, talla con existencias por talla y guía de tallas. Una talla agotada se marca y no se puede agregar al carrito. Junto al botón hay una nota con el envío gratis.
3. **Carrito guardado en el navegador.** Se guarda en el propio navegador, sin cuenta. Si un producto sale del catálogo o se agota, su línea se muestra aparte y no entra al pedido, así el catálogo puede cambiar sin romper los carritos ya guardados.
4. **Accesorios de TCG.** Playmats agrupados por juego (Pokémon y Yu-Gi-Oh!). No llevan color ni talla, y el carrito y el mensaje aceptan líneas sin talla.
5. **Envío gratis desde L 1,000.** Es decisión del cliente. El carrito dice cuánto falta ("Te faltan L 550 para el envío gratis") o que el pedido ya sale gratis, y el mensaje de WhatsApp dice "Envío: Gratis". El monto vive en un solo archivo de configuración y todas las páginas lo leen de ahí.

![Categoría Rock y Metal en escritorio: el título, "8 modelos, desde L 450" y una cuadrícula con las camisetas de Def Leppard, Black Sabbath y Led Zeppelin, cada una con su precio](/project/brutal-ink/categoria.jpg)

![Página de producto en escritorio: la camiseta Kaiba Blue-Eyes White Dragon con el selector de color, las tallas S, M, XL y XXL, la talla L marcada como agotada y el botón Agregar al carrito con la nota "Envío gratis desde L 1,000"](/project/brutal-ink/producto.jpg)

![Página Accesorios de TCGs en escritorio: los playmats de Pokémon en dos filas de cuatro, cada uno con su nombre, su tamaño y su precio, y uno marcado como agotado](/project/brutal-ink/playmats.jpg)

### El pedido llega con fotos

El mensaje de WhatsApp lista cada producto con su precio, y después trae una sola línea: "Ver pedido con fotos", con un enlace.

La primera versión ponía un enlace por producto. WhatsApp solo muestra la vista previa del primero, así que quien recibe el pedido tendría que abrir enlace tras enlace para ver qué camisetas pidieron. Ahora hay **un solo enlace**, a una página que muestra cada producto con su foto, su color, su talla y su cantidad, y que lleva a la página del producto. No lleva precios (están en el mensaje) y está marcada para que los buscadores no la indexen.

El nombre de quien compra viaja en el fragmento del enlace, lo que va después del `#`. Los navegadores nunca envían el fragmento al servidor. Así la página titula "Pedido de Ana" y el vendedor sabe de quién es el pedido fuera del chat. El teléfono, la dirección y la forma de pago nunca van en el enlace. El nombre de la captura es inventado.

![Página del pedido en escritorio: el título "Pedido de Ana Pérez", un nombre inventado, y cuatro tarjetas con la foto, el color, la talla y la cantidad de una camiseta Tool oversize, un playmat Gengar rosa, una camiseta Def Leppard y una camiseta Kaiba](/project/brutal-ink/pedido.jpg)

### Sugerencias con motivo visible

- En la página de producto, una fila de hasta 4 productos relacionados, con su motivo escrito: "Para tu mazo de Yu-Gi-Oh!" (la camiseta de Kaiba con el playmat de ese juego) o "Más de Rock y Metal" (la misma categoría).
- En el carrito, debajo del formulario, la fila "Va bien con tu pedido", de hasta 3 productos.
- Nunca se sugiere el mismo producto, uno agotado ni uno que ya está en el carrito. Si nada encaja, la fila no aparece.
- La sugerencia no es una ventana ni un paso extra, y el pedido funciona igual si la ignoras.

![Parte baja de la página de producto: las secciones Detalles y Envío y pago, y la fila "Para tu mazo de Yu-Gi-Oh!" con el playmat Yu-Gi-Oh! Hechiceros](/project/brutal-ink/sugerencias.jpg)

![Carrito en escritorio con una camiseta de Def Leppard: el resumen con subtotal, envío y total, el aviso "Te faltan L 550 para el envío gratis", el formulario de datos y, debajo, la fila "Va bien con tu pedido" con tres camisetas de la misma categoría](/project/brutal-ink/carrito.jpg)

### En el teléfono

<img class="mockup" src="/project/brutal-ink/movil.webp" alt="La tienda en dos teléfonos de 390 px de ancho: a la izquierda la portada, con el título y las primeras camisetas, y a la derecha el carrito con el aviso Te faltan L 550 para el envío gratis">

---

## Vender sin trucos

Decidí qué no hacer, y quedó escrito en el proyecto. La tienda no tiene:

- cuentas regresivas;
- avisos de "quedan N", porque las existencias todavía son datos provisionales y el aviso engañaría;
- extras premarcados en el carrito;
- reseñas inventadas ni insignias de "más vendido" sin los datos reales de ventas del cliente.

La razón es que son patrones engañosos. Un estudio de unos 11,000 sitios de compras encontró 1,818 casos de este tipo de diseño, entre ellos cuentas regresivas, avisos de poco stock y testimonios de origen dudoso ([Mathur y otros, 2019](https://arxiv.org/abs/1907.07032)).

Las sugerencias siguen la investigación de [Baymard sobre recomendaciones en el carrito](https://baymard.com/blog/product-recommendations-cart): se etiquetan con su contexto y solo se muestran productos realmente relacionados, porque una sola recomendación dudosa hizo que las personas de la prueba dejaran de confiar en todas. Baymard también recomienda poner los complementos [en la página de producto](https://baymard.com/blog/product-page-suggestions), porque en el carrito pueden distraer del pago. Por eso la fila del carrito va debajo del formulario y nunca lo interrumpe.

---

## Cómo lo probé

- Pruebas unitarias con Vitest sobre la lógica de negocio: disponibilidad, carrito, totales, mensaje de WhatsApp, enlace del pedido y sugerencias. Son 318. Las de las sugerencias se escribieron primero y se vieron fallar antes de implementarlas.
- Pruebas que revisan los datos del catálogo en busca de errores de captura: una categoría que no existe, una foto que falta o una talla sin medidas.
- `astro check` y el build, sin errores: 38 páginas.
- Verificación en el navegador sobre el sitio público, a 390 y 1440 px, con las rutas de WhatsApp bloqueadas y `window.open` reemplazado, para que ninguna prueba llegue a una persona real.
- Una revisión de código independiente de la mayoría de los cambios antes de integrarlos. Lo que no cupo en la revisión se cubrió con pruebas y con la verificación en el navegador.

Algunos problemas que encontré y corregí:

- el carrito movía el contenido al cargarse; ahora el pie de página no salta;
- un teléfono mostraba el precio como "HNL 450" en lugar de "L 450", porque el formato dependía del navegador; ahora el precio se escribe igual en cualquier teléfono;
- una revisión encontró que el carrito solo arrancaba si los datos de las sugerencias cargaban bien; ahora arranca sin ellas, porque una sugerencia nunca debe impedir un pedido.

## Rendimiento

Medido con Lighthouse 12.8.2 sobre el sitio publicado, el 25 de octubre de 2026, en el inicio y en una página de producto. Las cuatro cifras son rendimiento, accesibilidad, buenas prácticas y SEO:

- **Escritorio:** 100, 100, 100 y 100 en las dos páginas.
- **Móvil, inicio:** 96, 100, 100 y 100, con el contenido más grande visible en 2.6 s.
- **Móvil, producto:** 99, 100, 100 y 100, con el contenido más grande visible en 2.0 s.
- El cambio de diseño acumulado (CLS) midió 0 en las cuatro mediciones.

---

## Stack

- **Framework:** Astro 7, con build estático.
- **Lenguaje:** TypeScript en modo estricto.
- **Estilos:** CSS puro con tokens de diseño (variables CSS), sin framework de CSS.
- **Tipografías:** Big Shoulders Display y Barlow, incluidas en el build con Fontsource.
- **Datos:** el catálogo y la configuración de la tienda son archivos del proyecto, sin base de datos.
- **Pruebas:** Vitest.

[Ver la vista previa](https://brutal-ink.danielbanariba.com)
