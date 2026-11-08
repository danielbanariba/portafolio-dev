---
layout: "/src/layouts/MarkdownLayout.astro"
title: Canal de YouTube Automatizado
---

Este proyecto es un sistema end-to-end que automatiza por completo la operacion de un canal de YouTube de musica extrema underground. Desde el descubrimiento y descarga de musica libre de derechos, hasta el renderizado de videos 4K con estetica VHS, la subida programada a YouTube, y la gestion automatizada de playlists y disputas de copyright.

El sistema esta compuesto por dos repositorios que trabajan en conjunto como un pipeline continuo:

- **scrapper-deathgrind**: Descubre, filtra y descarga musica underground
- **click-auto-editor**: Renderiza videos 4K con efectos VHS, sube a YouTube y gestiona el canal

## Arquitectura General del Pipeline

![Diagrama de arquitectura del pipeline](/project/canal-youtube-automatizado/arquitectura.svg)

---

## Parte 1: Scrapper DeathGrind

### Que hace

Scrappea la API de **DeathGrind.club** (una base de datos comunitaria de metal extremo) para descubrir musica underground, filtrarla, descargar los archivos de audio y organizarlos en carpetas listas para el editor de video.

### Pipeline de Scraping

![Pipeline de scraping](/project/canal-youtube-automatizado/pipeline-scraping.svg)

### Sistema de Filtrado Inteligente

El scraper aplica **6 filtros en cascada** para garantizar que solo se descargue musica underground libre de problemas de copyright, sin gastar creditos de mas:

1. **Filtro de sellos discograficos**: Una lista negra (`lista_sello.txt`) excluye releases de sellos conocidos como Century Media, Nuclear Blast, AFM Records, etc.

2. **Filtro de tipo de disco**: El usuario selecciona que tipos procesar (Album, EP, Demo, Split, etc.)

3. **Filtro de duplicados**: Compara contra `descargados.txt` para no re-descargar musica ya procesada

4. **Filtro de fallidos**: Un release cuyos links ya fallaron queda en `fallidos_bandas.txt` y no se vuelve a pedir, porque su credito ya se gasto.

5. **Filtro de YouTube (el mas innovador)**: Usa Playwright con stealth para buscar cada release en YouTube. Si encuentra un video "full album" facilmente disponible, el release se clasifica como mainstream y se excluye. Solo pasa musica verdaderamente underground/obscura.

6. **Filtro de ya publicados**: Antes de pedir los links, compara contra el registro de albumes que ya estan en el canal (`ya_publicados.tsv`, de click-auto-editor).

### Creditos de descarga

DeathGrind cobra **1 credito por cada album** del que se piden los links de descarga, y da 1 credito por cada like. Los likes se dan a mano: un script abre en el navegador, uno por uno, los posts de los albumes que ya estan en el canal, espera el like y pasa al siguiente. El script nunca da el like por su cuenta. Si los creditos se acaban, el paso de links se detiene en vez de seguir pidiendo.

### Tecnologias del Scraper

| Componente              | Tecnologia                                    |
| ----------------------- | --------------------------------------------- |
| Lenguaje                | Python                                        |
| Scraping/Automatizacion | Playwright + playwright-stealth               |
| HTTP                    | Requests                                      |
| Descargas Mega          | megadl (megatools)                            |
| Extraccion              | unrar, 7z, zipfile, tarfile                   |
| Deteccion de recursos   | psutil (auto-ajuste de workers segun CPU/RAM) |

---

## Parte 2: Click Auto Editor

### Que hace

Toma las carpetas de musica descargadas (audio + portada) y produce videos 4K con estetica VHS retro, los sube a YouTube con metadata auto-generada, gestiona playlists, y automatiza disputas de copyright.

### Pipeline de Renderizado

![Pipeline de renderizado](/project/canal-youtube-automatizado/pipeline-renderizado.svg)

### Cadena de Efectos VHS (CUDA)

El corazon del renderizador es una cadena de **10+ kernels CUDA** que procesan cada frame para lograr una estetica VHS autentica. Todos los efectos se controlan con un unico parametro `intensity` (0.0 - 1.0):

![Cadena de efectos VHS (CUDA)](/project/canal-youtube-automatizado/cadena-vhs.svg)

**Detalles tecnicos del renderizador C++/CUDA:**

- Decodificacion con NVDEC (GPU)
- Codificacion con NVENC: H.264, preset p1, CQ 20, 45 Mbps VBR, BT.709
- Conversiones de color en espacio NTSC YIQ para autenticidad analogica
- Double buffering (ping-pong) en memoria GPU para procesamiento eficiente
- CUDA streams para ejecucion asincrona
- NVIDIA Performance Primitives (NPP) para operaciones de imagen

### Pipeline de Subida a YouTube

![Pipeline de subida a YouTube](/project/canal-youtube-automatizado/pipeline-subida.svg)

### Publicación con aprobación por Telegram

Un servicio de systemd publica un álbum por vez, y no sube nada sin mi visto bueno:

1. Renderiza el próximo álbum de la biblioteca (álbumes y EP, el más nuevo primero). El video terminado espera en un SSD.
2. Verifica el video: que tenga audio, que dure lo mismo que el álbum y que sea 4K.
3. Me manda por Telegram una captura de la búsqueda del álbum en YouTube, para ver si ya está publicado, y un fotograma del video con tres botones: **Subir**, **Rechazar** y **Eliminar (ya está publicado)**.
4. Con **Subir**, lo sube como privado y borra la carpeta. Una hora después de que YouTube lo procesa, revisa en YouTube Studio si tiene reclamos de copyright:
   - Si tiene un reclamo, lo programa para dos años después.
   - Si no tiene, activa la monetización en Studio y lo publica en el momento. Si otro video salió o está programado a menos de una hora, lo programa para una hora después de ese.
   - Si la monetización falla, el video se publica igual y me llega un aviso con el link de Studio.

Mientras no apriete un botón, no sube ni renderiza otro álbum. Si el servicio se reinicia, las preguntas pendientes siguen ahí.

### Automatizacion de Copyright

Cuando YouTube detecta contenido con copyright, el sistema automatiza las disputas y apelaciones usando Playwright:

![Automatización de copyright](/project/canal-youtube-automatizado/automatizacion-copyright.svg)

---

## Stack Tecnologico Completo

### Scrapper DeathGrind

| Categoria              | Tecnologias                              |
| ---------------------- | ---------------------------------------- |
| Lenguaje               | Python                                   |
| Scraping               | Playwright, playwright-stealth, Requests |
| Extraccion de archivos | unrar, 7z, zipfile, tarfile              |
| Sistema                | psutil (auto-deteccion de recursos)      |

### Click Auto Editor

| Categoria       | Tecnologias                                             |
| --------------- | ------------------------------------------------------- |
| Lenguaje        | Python (orquestacion) + C++/CUDA (renderizado GPU)      |
| Renderizado GPU | CUDA Toolkit (SM 8.6), NVDEC, NVENC, NPP, cuRAND        |
| Video           | FFmpeg (libavcodec, libavformat, libavutil, libswscale) |
| Audio           | mutagen, pydub, eyed3                                   |
| Imagenes        | Pillow (sombras, tracklist overlays)                    |
| YouTube API     | google-api-python-client, google-auth-oauthlib          |
| Automatizacion  | Playwright (disputas/apelaciones de copyright)          |
| IA              | ONNX Runtime (clasificador NSFW para portadas)          |
| Publicación     | Telegram Bot API (botones de aprobación), systemd       |
| Sistema         | psutil, ramdisk tmpfs (20 GB)                           |

### Requisitos de Hardware

- **GPU**: NVIDIA con soporte NVENC/NVDEC (optimizado para RTX 3090 Ti)
- **RAM**: 64 GB (20 GB para ramdisk tmpfs)
- **CPU**: Intel i9-9900K o equivalente
- **Almacenamiento**: disco externo para la biblioteca de música, NVMe para renderizar y un SSD donde los videos esperan la aprobación
- **SO**: Linux (Arch/CachyOS)

---

## Flujo de Datos Completo

![Flujo de datos completo](/project/canal-youtube-automatizado/flujo-datos.svg)
