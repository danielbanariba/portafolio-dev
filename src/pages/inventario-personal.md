---
layout: "/src/layouts/MarkdownLayout.astro"
title: Inventario Personal - App Movil con Flutter
---

App movil para gestionar el inventario domestico y lista de compras del hogar, desarrollada con Flutter. Diseñada para familias en Honduras, resuelve el problema de olvidar que hay en casa, comprar productos duplicados y no tener una lista de compras compartida.

Funciona 100% offline con SQLite y opcionalmente sincroniza en tiempo real entre familiares via Firebase.

## Arquitectura General

![Diagrama de arquitectura (Clean Architecture)](/project/inventario-personal/arquitectura.svg)

**Patron**: Clean Architecture + MVVM + Provider. Los ViewModels se sincronizan entre si: `InventoryVM` y `ShoppingListVM` son bidireccionales (con guards anti-loop), y `FamilySyncVM` empuja cambios a ambos.

---

## Sistema de Dos Listas con Swipe Intuitivo

El nucleo de la app es un unico booleano `isAtHome` en cada producto. La interaccion principal es deslizar:

```
┌─────────────────────┐                    ┌─────────────────────┐
│  "EN CASA"          │                    │  "COMPRAR"          │
│  (isAtHome = true)  │                    │  (isAtHome = false) │
│                     │                    │                     │
│  ┌───────────────┐  │   Deslizar ──►     │  ┌───────────────┐  │
│  │ Arroz 5 lbs   │──┼──────────────────►─┼──│ Arroz         │  │
│  └───────────────┘  │   a la derecha     │  └───────────────┘  │
│                     │                    │                     │
│  ┌───────────────┐  │   ◄── Deslizar     │  ┌───────────────┐  │
│  │ Leche 1 gal   │──┼◄───────────────────┼──│ Leche         │  │
│  └───────────────┘  │   a la izquierda   │  └───────────────┘  │
│                     │                    │                     │
│  Deslizar ◄ izq:    │                    │  Deslizar ► der:    │
│  Editar / Eliminar  │                    │  Editar / Eliminar  │
└─────────────────────┘                    └─────────────────────┘
                    │                          │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                        Historial de precios
                        registrado en cada compra
```

La direccion del swipe coincide con la posicion del tab destino: en "En Casa" (tab izquierdo) deslizar a la derecha mueve a "Comprar" (tab derecho) y viceversa. El producto sale volando en la direccion del swipe con animacion. El swipe opuesto revela "Editar" y "Eliminar". Tocar un producto abre el editor directamente.

<!-- TODO: Captura del swipe en accion -->

![Pantalla Principal](/project/inventario-personal/screenshot-home.png)

<!-- TODO: Captura del inventario "En Casa" -->

![Inventario del Hogar](/project/inventario-personal/screenshot-inventory.png)

<!-- TODO: Captura de la lista de compras con la barra de presupuesto -->

![Lista de Compras](/project/inventario-personal/screenshot-shopping-list.png)

---

## Presupuesto de Compras en Tiempo Real

La lista de compras incluye una barra de presupuesto interactiva que se descuenta automaticamente:

```
┌──────────────────────────────────────────────────────┐
│  Presupuesto de Compras                              │
│                                                      │
│  1. Tocar la barra → definir monto (ej: L. 5,000)   │
│  2. Deslizar producto a "Casa" → se descuenta        │
│  3. La barra se actualiza en tiempo real              │
│                                                      │
│  ┌────────────────────────────────────────────────┐   │
│  │  L. 3,200 disponible              36% ████░░  │   │
│  └────────────────────────────────────────────────┘   │
│                                                      │
│  Colores segun uso:                                  │
│  🟢 < 80%  →  Azul (dentro del presupuesto)         │
│  🟠 80-99% →  Naranja (acercandose al limite)        │
│  🔴 > 100% →  Rojo (excedido, muestra por cuanto)   │
│                                                      │
│  Persiste entre sesiones (SharedPreferences)         │
│  Boton para reiniciar el gasto acumulado             │
└──────────────────────────────────────────────────────┘
```

<!-- TODO: Captura de la barra de presupuesto con porcentaje -->

---

## Estadisticas de Compras Avanzadas

Modulo de analitica que transforma el historial de compras en insights accionables:

```
┌──────────────────────────────────────────────────────────┐
│  ESTADISTICAS DE COMPRAS                                 │
│                                                          │
│  Selector: [Semana] [Mes] [Año]                          │
│                                                          │
│  ┌─ Comparacion vs Periodo Anterior ──────────────────┐  │
│  │  ↓ L. 1,200 (-15%) vs periodo anterior             │  │
│  │  Proyeccion fin de mes: L. 8,500                   │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌─ Resumen ─────────────────────────────────────────┐   │
│  │  💰 Gastado: L. 4,800   💵 Ahorro: L. 1,200      │   │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌─ Grafico de Periodo (dinamico) ────────────────────┐  │
│  │  █ █ █ █ █ █ █    (7 barras semana)               │  │
│  │  ████████████████  (30 barras mes)                │  │
│  │  █ █ █ █ █ █ █ █ █ █ █ █  (12 barras año)        │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌─ Heatmap de Frecuencia ────────────────────────────┐  │
│  │  Lun  Mar  Mie  Jue  Vie  Sab  Dom               │  │
│  │  ░░░  ░░░  ███  ░░░  ░░░  ███  ░░░               │  │
│  │       (intensidad = frecuencia de compras)         │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌─ Top Productos (tappable) ─────────────────────────┐  │
│  │  1. Leche (8 veces)    → tap: ver evolucion precio │  │
│  │  2. Arroz (6 veces)    → LineChart con fl_chart    │  │
│  │  3. Huevos (5 veces)                               │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌─ Insights Accionables ─────────────────────────────┐  │
│  │  ⚠️ Leche subio 15%: L.35 → L.40                  │  │
│  │  🛒 Compraste Arroz 6 veces. ¿Agregarlo a lista?  │  │
│  │  📅 Los sabados son tu dia mas caro (L. 850)       │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  + Pie chart de categorias                              │
│  + Barras de gasto por supermercado                     │
└──────────────────────────────────────────────────────────┘
```

**Metricas calculadas**:

- Comparacion mes vs mes anterior (delta en monto y porcentaje)
- Prediccion de gasto a fin de mes (basada en ritmo actual, solo con ≥5 puntos de datos)
- Promedio de precio por producto con tendencia (subio/bajo/estable, umbral 5%)
- Dia de la semana mas caro para comprar
- Productos comprados ≥3 veces (sugerencia de agregar a lista)
- Evolucion de precio por producto (tap → LineChart historico)

<!-- TODO: Captura de la pantalla de estadisticas con el grafico y los insights -->

![Estadisticas de Compras](/project/inventario-personal/screenshot-statistics.png)

<!-- TODO: Captura de la evolucion de precio de un producto -->

---

## Sincronizacion Familiar (Firebase)

Multiples miembros de una familia comparten el mismo inventario y lista de compras en tiempo real.

```
┌──────────┐    ┌──────────┐    ┌──────────┐
│  Mama    │    │  Papa    │    │  Hijo    │
│  (App)   │    │  (App)   │    │  (App)   │
└────┬─────┘    └────┬─────┘    └────┬─────┘
     │               │               │
     │     Codigo de 6 caracteres    │
     │        o escaneo de QR        │
     │               │               │
     ▼               ▼               ▼
┌────────────────────────────────────────────┐
│         Firebase Firestore                 │
│                                            │
│  Grupo: "Familia Gonzalez" (FAM123)        │
│  ├── Miembros: [mama, papa, hijo]          │
│  ├── Productos: [...] (listeners RT)       │
│  └── Timestamps (last-write-wins)          │
│                                            │
│  Firebase Cloud Messaging (FCM)            │
│  └── Push notification cuando alguien      │
│      agrega/modifica un producto           │
└────────────────────────────────────────────┘
```

**Flujo**: Mama marca que se acabo el cafe → Firestore se actualiza → Papa y Hijo reciben push notification → Papa esta cerca del super → ve la lista → compra → marca como comprado → todos lo ven actualizado.

**Offline-first**: La app funciona completamente sin internet usando SQLite. Firebase es opcional y solo se activa cuando el usuario crea o se une a un grupo familiar.

<!-- TODO: Captura de la sincronizacion familiar -->

![Sincronizacion Familiar](/project/inventario-personal/screenshot-family-sync.png)

---

## Escaneo de Codigo de Barras

Busqueda paralela en 3 APIs simultaneamente para maxima velocidad:

```
Escaneo de codigo de barras (mobile_scanner)
                │
                ▼
┌───────────────────────────────────────┐
│  Busqueda paralela (Future.any)       │
│                                       │
│  ┌─────────────────┐                  │
│  │ Open Food Facts  │──► Prioridad    │
│  │ (Honduras)       │    local        │
│  ├─────────────────┤                  │
│  │ Open Food Facts  │──► Base global  │
│  │ (World)          │    2M+ items    │
│  ├─────────────────┤                  │
│  │ UPCItemDB        │──► Fallback     │
│  └─────────────────┘                  │
│                                       │
│  El PRIMER resultado exitoso          │
│  se muestra inmediatamente            │
└───────────────┬───────────────────────┘
                │
                ▼
┌───────────────────────────────────────┐
│  ProductNameParser                    │
│                                       │
│  "Leche Sula 1L Entera" ──►           │
│   nombre: "Leche Entera"              │
│   marca: "Sula"                       │
│   cantidad: 1                         │
│   unidad: "Litro"                     │
│   categoria: dairy                    │
│   empaque: "botella"                  │
└───────────────────────────────────────┘
                │
                ▼
         Cache local SQLite
         (funciona offline despues)
```

Si el producto no existe en ninguna base de datos, el usuario puede contribuirlo a Open Food Facts para que quede disponible globalmente.

---

## Comandos de Voz en Español

Parser de lenguaje natural (`VoiceCommandParser`) que entiende comandos hablados en español:

```
Microfono (speech_to_text)
        │
        ▼
"Agregar 2 libras de arroz"
        │
        ▼
┌───────────────────────────────────────┐
│  VoiceCommandParser                   │
│                                       │
│  1. Clasificar accion:                │
│     "agregar" → ADD                   │
│     "mover a compras" → TO_SHOPPING   │
│     "ya lo compre" → TO_HOME          │
│     "actualizar precio" → UPD_PRICE   │
│                                       │
│  2. Extraer cantidad:                 │
│     "2" → 2.0                         │
│     "media" → 0.5                     │
│     "dos y media" → 2.5               │
│                                       │
│  3. Detectar unidad:                  │
│     "libras" → lb                     │
│     "galones" → gal                   │
│     "unidades" → und                  │
│                                       │
│  4. Extraer nombre y marca            │
└───────────────────────────────────────┘
        │
        ▼
  Producto creado/modificado
  automaticamente
```

Soporta numeros en palabras ("dos", "tres"), fracciones ("y media"), y multiples formas de expresar la misma accion.

---

## Notificaciones de Vencimiento

Sistema inteligente que estima fechas de vencimiento automaticamente segun la categoria del producto:

```
Producto agregado
        │
        ▼
┌────────────────────────────────────────────────┐
│  Estimacion por categoria                      │
│                                                │
│  Categoria      │ Ambiente │ Refrig. │ Conge.  │
│  ───────────────┼──────────┼─────────┼──────── │
│  Lacteos        │   3 dias │ 14 dias │ 90 dias │
│  Carnes         │   1 dia  │  5 dias │ 180 dias│
│  Panaderia      │   3 dias │  7 dias │ 90 dias │
│  Frutas/Verdura │   5 dias │ 14 dias │ 365 dias│
│  Enlatados      │ 730 dias │     -   │    -    │
│                                                │
│  + El usuario puede poner fecha manual         │
│  + La app aprende del historial                │
└───────────────────┬────────────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────────────┐
│  Notificaciones locales programadas            │
│  (flutter_local_notifications)                 │
│  Zona horaria: America/Tegucigalpa             │
│                                                │
│  ● 3 dias antes  → Alerta temprana             │
│  ● 1 dia antes   → Recordatorio urgente        │
│  ● Dia del venc. → Alerta final                │
│                                                │
│  Indicadores visuales en las tarjetas:         │
│  Verde (fresco) → Amarillo → Naranja → Rojo   │
└────────────────────────────────────────────────┘
```

---

## Gestion de Presupuesto

Modulo completo de finanzas personales integrado con el inventario:

```
┌────────────────────────────────────────────────────────┐
│                  PRESUPUESTO                           │
│                                                        │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │  Ingresos   │  │  Gastos      │  │  Metas de     │  │
│  │             │  │              │  │  Ahorro       │  │
│  │  Primario   │  │  Manual      │  │               │  │
│  │  Secundario │  │  Por compra  │  │  Meta L.5000  │  │
│  │             │  │  Recurrente  │  │  Progreso 60% │  │
│  │  Frecuencia:│  │  (semanal,   │  │  Falta L.2000 │  │
│  │  semanal,   │  │  quincenal,  │  │  Ahorro req:  │  │
│  │  quincenal, │  │  mensual,    │  │  L.500/mes    │  │
│  │  mensual    │  │  anual)      │  │               │  │
│  └──────┬──────┘  └──────┬───────┘  └──────┬────────┘  │
│         │                │                 │           │
│         └────────┬───────┘                 │           │
│                  ▼                         │           │
│         Equivalente mensual                │           │
│         (normalizado para                  │           │
│          comparacion)                      │           │
│                  │                         │           │
│                  └──────────┬──────────────┘           │
│                             ▼                          │
│                    Dashboard mensual                   │
│                    con navegacion por mes              │
│                                                        │
│  Categorias de gasto:                                  │
│  Comida | Transporte | Servicios | Entretenimiento     │
│  Salud | Hogar | Otros (con presupuesto por cat.)      │
└────────────────────────────────────────────────────────┘
```

Los gastos de tipo `productPurchase` se vinculan automaticamente cuando compras algo de la lista, conectando el inventario con las finanzas.

<!-- TODO: Captura del dashboard de presupuesto -->

---

## Modulo de Colecciones

Para catalogar items no consumibles (videojuegos, libros, figuras, electronica):

- **Condicion**: Escala de 7 niveles (Perfecto → Pobre) con codigo de colores
- **Seguimiento de valor**: Precio de compra vs valor actual con calculo de apreciacion/depreciacion en porcentaje
- **Metadata**: Año, ubicacion, numero de serie, notas
- **Enriquecimiento automatico**: Busqueda de imagenes y datos via Google Custom Search y Pexels

<!-- TODO: Captura de la vista de colecciones -->

---

## Base de Datos (SQLite v7)

```
┌─────────────────────────────────────────────────────────────┐
│  SQLite - 9 tablas principales                              │
│                                                             │
│  products ──────────┐                                       │
│  (30+ campos)       │ FK                                    │
│  id, name, brand,   ├──► price_history                      │
│  is_at_home,        │    (precio, fecha, supermercado)       │
│  category,          │                                       │
│  storage_condition, ├──► product_tags ──► tags              │
│  product_type,      │    (many-to-many)                     │
│  is_collection_item,│                                       │
│  purchase_price,    │                                       │
│  current_value,     │                                       │
│  condition...       │                                       │
│                     │                                       │
│  expenses ──────────┼──► expense_categories                 │
│  (tipo: manual,     │    (7 default + budget)               │
│   productPurchase,  │                                       │
│   recurring)        ├──► recurring_expenses                 │
│                     │    (frecuencia + next_execution)      │
│                     │                                       │
│  income             │    savings_goals                      │
│  (is_primary,       │    (target, current, deadline)        │
│   frequency)        │                                       │
└─────────────────────────────────────────────────────────────┘
```

Migraciones incrementales via `_onUpgrade()`. La app funciona en desktop usando `sqflite_common_ffi` y en movil con `sqflite` estandar.

---

## Stack Tecnologico

| Categoria    | Tecnologias                                                               |
| ------------ | ------------------------------------------------------------------------- |
| Framework    | Flutter 3.41.6 (Dart 3.11.4)                                              |
| Estado       | Provider (MultiProvider + ChangeNotifier)                                 |
| DB Local     | SQLite (sqflite), SharedPreferences                                       |
| Backend      | Firebase Firestore, Firebase Auth, Firebase Cloud Messaging               |
| APIs         | Open Food Facts, UPCItemDB, Google Custom Search, Pexels                  |
| Dispositivo  | mobile_scanner, speech_to_text, image_picker, flutter_local_notifications |
| UI           | fl_chart (graficas), cached_network_image, qr_flutter                     |
| IA/ML        | google_mlkit_text_recognition (OCR)                                       |
| Testing      | flutter_test, mockito, fake_cloud_firestore (1553+ tests)                 |
| Arquitectura | Clean Architecture + MVVM + TDD estricto                                  |

---

## Donde Poner las Capturas

Las imagenes referenciadas en esta pagina deben colocarse en:

```
public/project/inventario-personal/
├── screenshot-home.png              # Pantalla principal con los action buttons
├── screenshot-inventory.png         # Vista "En Casa" con productos y swipe
├── screenshot-shopping-list.png     # Vista "Comprar" con barra de presupuesto
├── screenshot-family-sync.png       # Pantalla de sincronizacion familiar
├── screenshot-statistics.png        # Estadisticas con graficos e insights
```

La imagen principal del proyecto (para la card en el portafolio) va en:

```
public/project/inventario-personal.png   # Screenshot principal para la card
```

**Capturas pendientes** (busca los `<!-- TODO -->` en este archivo):

1. Pantalla principal con los botones de accion
2. Inventario "En Casa" mostrando el swipe
3. Lista de compras con la barra de presupuesto visible
4. Sincronizacion familiar
5. Estadisticas con el grafico dinamico y los insights
6. Evolucion de precio de un producto (LineChart)
7. Dashboard de presupuesto
8. Vista de colecciones
