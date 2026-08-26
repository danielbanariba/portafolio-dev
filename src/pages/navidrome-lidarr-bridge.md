---
layout: "/src/layouts/MarkdownLayout.astro"
title: Navidrome + Lidarr — Automatización de una biblioteca musical
---

Un sistema que convierte una biblioteca de música self-hosted en algo que se
completa y se mejora solo. Marcás una banda con una estrella en
[Navidrome](https://www.navidrome.org/) y Lidarr empieza a monitorearla. Abrís la
página del artista y los álbumes que te faltan aparecen en gris dentro de la
misma grilla, cada uno con un botón para pedirlo. Los que ya tenés pero en
formato con pérdida llevan una insignia que lo dice, y un botón para pedir una
copia mejor.

Lo que Lidarr descarga cae dentro de la carpeta de música de Navidrome, así que
se indexa solo y deja de aparecer como faltante. **El ciclo se cierra sin nadie
adentro.**

Sobre una biblioteca real de **603 artistas y 2000 álbumes**.

---

## Arquitectura

[![Arquitectura del sistema](/project/navidrome-lidarr-bridge/arquitectura.svg)](/project/navidrome-lidarr-bridge/arquitectura.svg)

*Los tres diagramas de esta página son SVG: hacé click en cualquiera para
abrirlo a tamaño real y leerlo sin perder nitidez.*

Tres piezas propias: un servicio HTTP en Python sin dependencias (~1,200 líneas),
una extensión de navegador (~1,050 líneas) y cinco herramientas de línea de
comandos (~2,600 líneas). Todo lo demás son servicios existentes conectados entre
sí.

---

## El problema real no era conectar APIs

Conectar Navidrome con Lidarr es media tarde de trabajo. Lo difícil es que
**ninguno de los dos sabe de qué banda estás hablando.**

Lidarr solo acepta identificadores de MusicBrainz. Una biblioteca etiquetada sin
esos campos obliga a resolver cada nombre. Y los nombres no son únicos: hay
**diez artistas llamados "Delirium"** en MusicBrainz, y 326 en Discogs. Elegir el
primero significa monitorear en silencio la discografía equivocada. Preguntarle
al usuario es devolverle el problema.

[![Identificación de la banda por solapamiento de catálogo](/project/navidrome-lidarr-bridge/identidad.svg)](/project/navidrome-lidarr-bridge/identidad.svg)

**La biblioteca decide.** Bandas distintas que comparten nombre no comparten
catálogo. Tener `Abismo` y `Los signos del Fauno` identifica exactamente a uno de
esos diez — la banda hondureña de metal — y ninguno de los otros nueve se le
acerca. Así que se compara la discografía de cada candidato contra lo que la
biblioteca ya tiene, y gana el que se solapa.

### Ser el único candidato no es lo mismo que ser el correcto

Esa comprobación al principio solo corría cuando varios artistas compartían
nombre. Un candidato único se aceptaba por confianza — y existe exactamente un
artista llamado "Nihilismo" en MusicBrainz: una banda de punk que **no comparte
ni un álbum** con las cuatro que hay bajo ese nombre en esta biblioteca. Se
aceptó sin preguntar y el panel ofreció ocho discos suyos.

Ahora un candidato solitario se verifica como cualquier otro, pero la
comprobación es un **veto, no un requisito**: un catálogo que no se pudo leer, o
que no lista nada, no prueba nada y deja pasar la coincidencia. Un empate tampoco
es una respuesta — si dos catálogos coinciden igual de bien, la biblioteca no
puede distinguirlos y el nombre queda sin resolver, expuesto en `/status` con
todos los candidatos y lo que cada uno tenía en común.

**Un sistema que no sabe algo tiene que decirlo, no adivinarlo.**

---

## Juzgar un release por lo que tiene adentro

Lidarr solo puede actuar sobre lo que un release dice de sí mismo. De diez
torrents de un mismo álbum, **ninguno declaraba su formato**, así que los diez
quedaron clasificados como `Unknown` — por debajo del MP3 que ya estaba en
disco, y por lo tanto nunca tomados como mejora. Es la decisión correcta de
Lidarr: no puede probar que ninguno sea mejor. El que tenía 39 seeders era MP3.

La única forma de saber qué es un archivo es mirarlo.

[![Pipeline de auditoría de releases](/project/navidrome-lidarr-bridge/auditoria.svg)](/project/navidrome-lidarr-bridge/auditoria.svg)

Se auditan varios candidatos a la vez, **de lo más barato a lo más caro**:

1. **La lista de archivos del torrent** — cuesta cero descarga y descarta todo lo
   que no lleve un archivo sin pérdida. Se obtiene con `stopCondition=MetadataReceived`
   en qBittorrent: se recibe la metadata y el torrent se detiene antes de bajar
   un solo byte de contenido.
2. **Los streams de audio** de lo que sobrevive: códec, profundidad de bits,
   frecuencia de muestreo.
3. **El espectro**, porque un FLAC decodificado desde un MP3 sigue siendo un MP3
   — solo que pesa más. Un archivo de 24 bits rellenado desde 16 es la misma
   mentira sobre la profundidad, y los ocho bits de abajo la delatan.

### Por qué el espectro se mide como un acantilado

El primer intento comparaba las frecuencias altas de cada pista contra su bin más
fuerte. Ese bin siempre es grave, cuarenta o sesenta decibeles más arriba, así
que **todos los discos honestos daban corte a 17 kHz** — incluido un 320 kbps
conocido cuyo techo real está en 20.5.

Lo que deja un codificador es un **escalón, no un nivel**: el espectro va
corriendo, se cae por una pared y se queda abajo. Medido así contra archivos de
procedencia conocida:

| archivo conocido | caída | veredicto             |
| ---------------- | ----- | --------------------- |
| MP3 320 CBR      | 57 dB | lowpass del codificador |
| MP3 V0           | 12 dB | rolloff más suave     |
| FLAC 16/44       | 13 dB | genuino               |
| FLAC 24/96       | 3 dB  | genuino               |

Un V0 deja muy poca pared para atraparlo así, y se detecta por dónde se corta:
20.0 kHz contra 20.9 de un rip genuino de la misma época. Ese margen es menor a
un kilohertz y ocasionalmente va a degradar un máster honesto pero apagado. El
costo de equivocarse en esa dirección es elegir entre dos copias sin pérdida; el
costo en la otra es quedarse con un MP3 decodificado y no enterarse nunca. **Cada
número se imprime, así que la decisión se puede revocar.**

### Un torrent no siempre es un álbum

Las discografías y los box sets son comunes, y el álbum buscado suele estar
adentro. Buscar "artista álbum" nunca los encuentra; buscar solo el artista los
encuentra y se ahoga en todo lo demás. Así que corren las dos búsquedas y decide
la lista de archivos: **un release que no contiene el álbum no es candidato, se
llame como se llame.**

Cuando el álbum está dentro de un torrent más grande, solo se bajan sus archivos
— el resto se marca como omitido antes de empezar, así que una discografía de
veinte gigabytes cuesta lo que pesa un álbum.

---

## Tener un álbum no es lo mismo que haber terminado con él

Un álbum faltante es fácil de ver: hay un hueco en la grilla. Un disco guardado
en 160 kbps se ve exactamente igual que uno en FLAC de 24 bits, así que nadie va
nunca a buscar una copia mejor — la estantería no da ningún motivo.

Por eso el panel pone una insignia (`MP3 192`) sobre cualquier portada cuyos
archivos tengan pérdida, y un botón encima para pedir una copia sin pérdida. No
se promete nada: si aparece algo mejor reemplaza a lo viejo, y si no, la copia
que ya estaba queda intacta.

**Que el botón aparezca es una cuestión de catálogo, no de calidad.** Lidarr solo
puede actuar sobre un álbum del que tenga id, y su perfil de metadata decide qué
tiene. El perfil por defecto admite un tipo primario y uno secundario — álbumes
de estudio — así que un demo o un disco en vivo guardado en 160 kbps era
invisible para él. Ampliar el perfil lo arregla, y la lista de faltantes filtra
en su lugar.

Ampliar un perfil no es gratis y **el orden importa**: Lidarr monitorea los
álbumes que descubre según el `monitorNewItems` de cada artista, así que un
perfil más amplio con ese valor en `all` habría puesto un catálogo entero a
descargar de golpe. Poner todos los artistas en `new` primero significa que solo
se toman automáticamente los lanzamientos genuinamente futuros, y todo lo que
revela la ampliación queda sin monitorear — visible, con insignia, y descargado
solo cuando alguien aprieta el botón.

### Una solicitud tiene que sobrevivir a un F5

La primera versión del botón recordaba lo pedido en el almacenamiento del propio
navegador. Es el lugar equivocado: limpiar el navegador lo olvida, un segundo
dispositivo nunca se enteró, y una solicitud hecha desde el teléfono era
invisible desde la laptop.

Lidarr ya registra ese mismo hecho, y mejor. Un álbum monitoreado sin nada en
disco es exactamente un álbum que alguien pidió y que Lidarr sigue buscando. La
respuesta es la misma en todos los dispositivos y sigue ahí después de borrar el
navegador.

---

## Herramientas de línea de comandos

Cinco programas que resuelven problemas que ninguna configuración arregla:

| Herramienta               | Qué resuelve                                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `best-release.py`         | Audiciona varios releases del mismo álbum y se queda con el mejor, midiendo el espectro para detectar transcodificaciones. |
| `tag-mbids.py`            | Escribe los ids de MusicBrainz dentro de los archivos, para que ninguna parte del sistema tenga que volver a adivinar.     |
| `metal-archives-seed.py`  | Para bandas que MusicBrainz no tiene: transcribe lo que hay en Encyclopaedia Metallum a formularios listos para revisar.   |
| `split-cue.py`            | Corta un rip de imagen (un FLAC + cue sheet) en pistas, porque Lidarr no sabe leer un cue.                                 |
| `fetch-covers.py`         | Busca portadas faltantes en tres fuentes, mejor primero, y rechaza cualquier imagen bajo 400 píxeles.                      |

`metal-archives-seed.py` merece una nota: **no envía nada**. Reúne lo que hay en
Metal Archives, cronometra cada pista contra el archivo real en disco y escribe
una página de formularios de MusicBrainz con todos los campos llenos. Una persona
revisa cada uno y aprieta el botón. Ese es el punto — la herramienta hace la
transcripción, no el juicio.

---

## Decisiones que costaron un error primero

- **`ImportListSync` con `definitionId`.** `CustomImport` declara
  `MinRefreshInterval = 6h`, así que la sincronización programada lee la lista
  como mucho cada seis horas. Marcabas una banda y se quedaba ahí, con Lidarr
  registrando `No list items to process` mientras el feed ya la servía. Mandar el
  comando con `definitionId` toma el camino de lista única, que consulta de
  inmediato.
- **Buscar por artista solo removió una garantía implícita.** Al agregar la
  búsqueda por artista para encontrar discografías, se perdió la garantía de que
  los resultados fueran del álbum buscado. Estuvo a segundos de descargar cuatro
  álbumes equivocados. Ahora se exige que el contenido contenga el álbum, o que
  el nombre coincida.
- **Fallar al marcar archivos como omitidos no puede significar bajar todo.** Un
  fallo en `filePrio` caía en tomar el torrent completo, y empezó a bajar una
  discografía de 6.4 GB. Se detectó a los 51 MB. Ahora se rechaza y se borra.
- **El emparejamiento por prefijo es codicioso.** MusicBrainz archiva el demo de
  1999 de Ultra Vomit como `Ultra Vomit`, que es prefijo de su álbum de 2024
  `Ultra Vomit et le pouvoir de la puissance`. En una sola pasada el demo
  reclamaba el álbum, y pedir mejora desde esa portada habría ido a buscar el
  disco equivocado. Ahora los títulos exactos toman su copia primero y ninguna
  copia se reclama dos veces.

---

## Resultados medidos

- **3.71 GB** de duplicados identificados y limpiados — después de encontrar
  tres bugs en el propio detector de duplicados antes de borrar nada.
- **143 portadas** recuperadas: de 166 álbumes sin ninguna imagen quedan 23,
  y los que quedan son bootlegs y grabaciones en vivo que ningún catálogo tiene.
- Transcodificaciones detectadas y reemplazadas por FLAC genuino.
- Dos importaciones trabadas de Lidarr diagnosticadas y desbloqueadas.
- Bandas ausentes de MusicBrainz documentadas y sembradas en el catálogo, para
  que el pipeline empiece a funcionar solo — y para el siguiente que las busque.

---

## Stack

**Python 3**, **JavaScript** (userscript, sin framework), **Docker Compose**, **nginx**
(inyección con `sub_filter`), **MusicBrainz / Cover Art Archive / Discogs /
Encyclopaedia Metallum** como fuentes de catálogo, **Lidarr / Prowlarr /
qBittorrent** como pipeline de adquisición, **ffmpeg** y **FFT con numpy** para
el análisis espectral.

El servicio HTTP corre solo con la librería estándar: no hay `requirements.txt`
ni un `pip install` en el Dockerfile. `numpy` y `mutagen` aparecen únicamente en
las herramientas que analizan audio.

---

## Código

- [navidrome-lidarr-bridge](https://github.com/danielbanariba/navidrome-lidarr-bridge) — el servicio y las herramientas
- [navidrome-missing-albums-userscript](https://github.com/danielbanariba/navidrome-missing-albums-userscript) — el panel dentro de Navidrome
