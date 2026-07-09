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

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   DeathGrind.club│     │    YouTube       │     │  12+ Servicios   │
│       API        │     │    Search        │     │   de Hosting     │
└────────┬─────────┘     └────────┬─────────┘     └────────┬─────────┘
         │                        │                        │
         ▼                        │                        │
┌──────────────────┐              │                        │
│  PASO 1          │              │                        │
│  Extraer Bandas  │              │                        │
│                  │              │                        │
│  - Autenticacion │              │                        │
│  - Paginar ~40   │              │                        │
│    generos       │              │                        │
│  - Filtrar por:  │              │                        │
│    * Sello       │              │                        │
│    * Tipo disco  │              │                        │
│    * Ya descarg. │              │                        │
│    * Fallidos    │              │                        │
└────────┬─────────┘              │                        │
         │                        │                        │
         ▼                        ▼                        │
┌──────────────────────────────────────┐                   │
│  PASO 2: Filtro Underground          │                   │
│                                      │                   │
│  Para cada release:                  │                   │
│  1. Buscar en YouTube                │                   │
│  2. Si hay "full album" disponible   │                   │
│     = MAINSTREAM = EXCLUIR           │                   │
│  3. Solo pasan releases underground  │                   │
│                                      │                   │
│  Usa Playwright + stealth            │                   │
│  5-12 workers paralelos              │                   │
└────────┬─────────────────────────────┘                   │
         │                                                 │
         ▼                                                 │
┌──────────────────┐                                       │
│  PASO 3          │                                       │
│  Extraer Links   │                                       │
│  de Descarga     │                                       │
│                  │                                       │
│  API DeathGrind  │                                       │
│  5 workers       │                                       │
└────────┬─────────┘                                       │
         │                                                 │
         ▼                                                 ▼
┌──────────────────────────────────────────────────────────────┐
│  PASO 4: Descargar y Organizar                               │
│                                                              │
│  Servicios soportados:                                       │
│  Mega.nz | Mediafire | Google Drive | Yandex Disk            │
│  pCloud | Mail.ru | Icedrive | Krakenfiles                   │
│  Workupload | WeTransfer | VK Docs | HTTP directo            │
│                                                              │
│  - Extrae archivos (ZIP/RAR/7z)                              │
│  - Valida audio por magic bytes                              │
│  - Organiza en: "Banda - Album (Año) [Tipo]/"                │
│  - Manejo de cuota Mega (cooldown 20min + cola)              │
└──────────────────────────────────┬───────────────────────────┘
                                   │
                                   ▼
                    /01_limpieza_de_impurezas/
                    (Carpetas listas para renderizar)
```

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

```
┌──────────────────────────────────────────────────────────────────┐
│                     PIPELINE DE RENDERIZADO                      │
│                                                                  │
│  Carpeta de album                                                │
│  ("Banda - Album/")                                              │
│   ├── cover.png                                                  │
│   ├── 01 - Track.mp3                                             │
│   ├── 02 - Track.flac                                            │
│   └── ...                                                        │
│        │                                                         │
│        ▼                                                         │
│  ┌─────────────────────────────────────────────┐                 │
│  │  FASE 0: Preparacion                        │                 │
│  │                                             │                 │
│  │  - Normalizar nombres de archivos           │                 │
│  │  - Filtrar portadas NSFW (modelo ONNX)      │                 │
│  │  - Censurar texto con profanidad            │                 │
│  └──────────────┬──────────────────────────────┘                 │
│                 │                                                │
│                 ▼                                                │
│  ┌─────────────────────────────────────────────┐                 │
│  │  FASE 1: Verificacion Previa                │                 │
│  │                                             │                 │
│  │  Busca en YouTube si el album ya            │                 │
│  │  fue subido al canal                        │                 │
│  └──────────────┬──────────────────────────────┘                 │
│                 │                                                │
│                 ▼                                                │
│  ┌─────────────────────────────────────────────┐                 │
│  │  FASE 2: Optimizacion de I/O                │                 │
│  │                                             │                 │
│  │  Copia al medio mas rapido disponible:      │                 │
│  │  Ramdisk (48GB tmpfs) > NVMe SSD > HDD      │                 │
│  │                                             │                 │
│  │  Ramdisk = ~7x mas rapido que NVMe          │                 │
│  └──────────────┬──────────────────────────────┘                 │
│                 │                                                │
│                 ▼                                                │
│  ┌─────────────────────────────────────────────┐                 │
│  │  FASE 3: Procesamiento de Portada           │                 │
│  │                                             │                 │
│  │  - Extraer portada del audio (mutagen)      │                 │
│  │  - Generar sombra (Pillow)                  │                 │
│  │  - Calcular colores dominantes              │                 │
│  │  - Generar imagen de tracklist              │                 │
│  │    (auto-dimensionado de fuente 28-90px)    │                 │
│  └──────────────┬──────────────────────────────┘                 │
│                 │                                                │
│                 ▼                                                │
│  ┌─────────────────────────────────────────────┐                 │
│  │  FASE 4: Renderizado VHS                    │                 │
│  │  (ver diagrama detallado abajo)             │                 │
│  │                                             │                 │
│  │  Ruta principal: C++/CUDA (RTX 3090 Ti)     │                 │
│  │  Fallback: FFmpeg NVENC                     │                 │
│  │  Fallback final: FFmpeg libx264             │                 │
│  │                                             │                 │
│  │  Salida: 3840x2160, 24fps, 45 Mbps          │                 │
│  └──────────────┬──────────────────────────────┘                 │
│                 │                                                │
│                 ▼                                                │
│           "Banda - Album.mp4"                                    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Cadena de Efectos VHS (CUDA)

El corazon del renderizador es una cadena de **10+ kernels CUDA** que procesan cada frame para lograr una estetica VHS autentica. Todos los efectos se controlan con un unico parametro `intensity` (0.0 - 1.0):

```
Frame Original (3840x2160)
        │
        ▼
┌───────────────────────────────────────────────────────────┐
│  1. Color Bleeding                                        │
│     Simula el sangrado de color analogico                 │
│     Blur horizontal: 5-25px segun intensidad              │
├───────────────────────────────────────────────────────────┤
│  2. Aberracion Cromatica                                  │
│     Desplazamiento de canales RGB: 2-6px                  │
├───────────────────────────────────────────────────────────┤
│  3. Horizontal Wobble                                     │
│     Desplazamiento sinusoidal por linea de escaneo        │
│     Frecuencia: 30-60, Amplitud: 0-15px                   │
├───────────────────────────────────────────────────────────┤
│  4. Tracking Errors                                       │
│     Bandas horizontales con offset aleatorio              │
│     Simula errores de tracking de cintas VHS              │
├───────────────────────────────────────────────────────────┤
│  5. Position Jitter                                       │
│     Vibracion del frame completo X/Y a 7-12 Hz            │
├───────────────────────────────────────────────────────────┤
│  6. Scanlines                                             │
│     Oscurecimiento de lineas alternas estilo CRT          │
│     Darkness: 0.7-0.85                                    │
├───────────────────────────────────────────────────────────┤
│  7. Noise / Grain                                         │
│     Ruido de luminancia (10-30) + ruido de color          │
│     Generado con cuRAND                                   │
├───────────────────────────────────────────────────────────┤
│  8. Color Grading                                         │
│     Espacio de color NTSC YIQ para colores analogicos     │
│     Desaturacion: 15-30%, elevacion de negros,            │
│     reduccion de contraste                                │
├───────────────────────────────────────────────────────────┤
│  9. VHS Overlay Blend                                     │
│     Composicion de video real de ruido VHS al 60%         │
│     (content/vhs_noise.mp4)                               │
├───────────────────────────────────────────────────────────┤
│  10. VHS Transition                                       │
│      Transiciones estilo cinta con distorsion,            │
│      arrugas y offset de croma                            │
└───────────────────────────────────┬───────────────────────┘
                                    │
                                    ▼
                          Frame VHS Procesado
                    (Double buffering en GPU)
```

**Detalles tecnicos del renderizador C++/CUDA:**

- Decodificacion con NVDEC (GPU)
- Codificacion con NVENC: H.264, preset p1, CQ 20, 45 Mbps VBR, BT.709
- Conversiones de color en espacio NTSC YIQ para autenticidad analogica
- Double buffering (ping-pong) en memoria GPU para procesamiento eficiente
- CUDA streams para ejecucion asincrona
- NVIDIA Performance Primitives (NPP) para operaciones de imagen

### Pipeline de Subida a YouTube

```
┌───────────────────────────────────────────────────────────────────┐
│                   PIPELINE DE SUBIDA                              │
│                                                                   │
│  "Banda - Album.mp4"                                              │
│        │                                                          │
│        ▼                                                          │
│  ┌──────────────────────────────────┐                             │
│  │  Generacion de Metadata          │                             │
│  │                                  │                             │
│  │  - Parsear nombre de carpeta     │                             │
│  │    (banda/album/anio)            │                             │
│  │  - Generar titulo y descripcion  │                             │
│  │  - Crear tracklist con           │                             │
│  │    timestamps                    │                             │
│  │  - Obtener generos y links       │                             │
│  │    de streaming (DeathGrind API) │                             │
│  │  - Censurar profanidad           │                             │
│  └──────────┬───────────────────────┘                             │
│             │                                                     │
│             ▼                                                     │
│  ┌──────────────────────────────────┐                             │
│  │  Autenticacion OAuth             │                             │
│  │                                  │                             │
│  │  Sistema multi-credencial:       │                             │
│  │  - 2 sets para upload            │                             │
│  │  - 8 sets para playlists         │                             │
│  │  - Rotacion automatica           │                             │
│  │    cuando se agota la cuota      │                             │
│  │    (HTTP 403/429)                │                             │
│  └──────────┬───────────────────────┘                             │
│             │                                                     │
│             ▼                                                     │
│  ┌──────────────────────────────────┐                             │
│  │  Subida Programada               │                             │
│  │                                  │                             │
│  │  Modo batch:                     │                             │
│  │  24 videos, 1 hora entre cada    │                             │
│  │  uno, privacy="private" con      │                             │
│  │  publishAt programado            │                             │
│  │                                  │                             │
│  │  Modo inmediato:                 │                             │
│  │  Publicacion directa             │                             │
│  └──────────┬───────────────────────┘                             │
│             │                                                     │
│             ▼                                                     │
│  ┌──────────────────────────────────┐                             │
│  │  Gestion de Playlists            │                             │
│  │                                  │                             │
│  │  - Playlist por banda            │                             │
│  │  - Playlist por genero           │                             │
│  │  - Servicio systemd persistente  │                             │
│  │    (mapear_playlists.service)    │                             │
│  └──────────────────────────────────┘                             │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### Automatizacion de Copyright

Cuando YouTube detecta contenido con copyright, el sistema automatiza las disputas y apelaciones usando Playwright:

```
Video con copyright claim
        │
        ▼
┌───────────────────────────────┐
│  inpunar_video.py             │
│                               │
│  Playwright + modo aprendizaje│
│  (--aprender): el usuario     │
│  demuestra el flujo y el      │
│  script graba los selectores  │
│                               │
│  Flujo automatico:            │
│  Seleccionar video ──►        │
│  Click "disputar" ──►         │
│  Razon: "licencia" ──►        │
│  Llenar info ──► Firmar ──►   │
│  Enviar                       │
└───────────┬───────────────────┘
            │
            │  Si es rechazada
            ▼
┌───────────────────────────────┐
│  apelacion.py                 │
│                               │
│  Automatiza la apelacion      │
│  con datos personales y       │
│  mensaje pre-escrito          │
└───────────────────────────────┘
```

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

```
DeathGrind.club ──► ~40 generos ──► Miles de releases
                                          │
                                    Filtro de sellos
                                          │
                                    Filtro de tipo
                                          │
                                    Filtro de duplicados
                                          │
                                    Filtro YouTube (underground)
                                          │
                                          ▼
                                    ~Cientos de releases
                                          │
                                    Descarga (12+ servicios)
                                          │
                                          ▼
                                  Carpetas organizadas
                                  "Banda - Album/"
                                   ├── audio files
                                   └── cover art
                                          │
                                    Limpieza + NSFW filter
                                          │
                                    Verificacion previa
                                          │
                                    Renderizado 4K VHS
                                    (C++/CUDA kernels)
                                          │
                                          ▼
                                    "Banda - Album.mp4"
                                    3840x2160, 24fps
                                          │
                                    Subida programada
                                    (rotacion de credenciales)
                                          │
                                    Gestion de playlists
                                    (servicio systemd)
                                          │
                                    Disputas automaticas
                                    (Playwright)
                                          │
                                          ▼
                                    Canal de YouTube
                                    funcionando 24/7
```
