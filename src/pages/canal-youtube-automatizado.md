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

El scraper aplica **4 filtros en cascada** para garantizar que solo se descargue musica underground libre de problemas de copyright:

1. **Filtro de sellos discograficos**: Una lista negra (`lista_sello.txt`) excluye releases de sellos conocidos como Century Media, Nuclear Blast, AFM Records, etc.

2. **Filtro de tipo de disco**: El usuario selecciona que tipos procesar (Album, EP, Demo, Split, etc.)

3. **Filtro de duplicados**: Compara contra `descargados.txt` para no re-descargar musica ya procesada

4. **Filtro de YouTube (el mas innovador)**: Usa Playwright con stealth para buscar cada release en YouTube. Si encuentra un video "full album" facilmente disponible, el release se clasifica como mainstream y se excluye. Solo pasa musica verdaderamente underground/obscura.

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
| Sistema         | psutil, ramdisk tmpfs (48 GB)                           |

### Requisitos de Hardware

- **GPU**: NVIDIA con soporte NVENC/NVDEC (optimizado para RTX 3090 Ti)
- **RAM**: 64 GB (48 GB para ramdisk tmpfs)
- **CPU**: Intel i9-9900K o equivalente
- **Almacenamiento**: Disco externo para biblioteca de musica + NVMe para staging
- **SO**: Linux (Arch/CachyOS)

---

## Flujo de Datos Completo

![Flujo de datos completo](/project/canal-youtube-automatizado/flujo-datos.svg)
