---
layout: "/src/layouts/MarkdownLayout.astro"
title: Inventario Personal - App Movil con Flutter
---

App movil para gestionar el inventario domestico y lista de compras del hogar, desarrollada con Flutter. Diseñada para familias en Honduras, resuelve el problema de olvidar que hay en casa, comprar productos duplicados y no tener una lista de compras compartida.

Funciona 100% offline con SQLite y opcionalmente sincroniza en tiempo real entre familiares via Firebase.

## Arquitectura General

```
┌─────────────────────────────────────────────────────────────────┐
│                    INVENTARIO PERSONAL                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────┐       │
│  │  PRESENTATION (Flutter UI)                           │       │
│  │                                                      │       │
│  │  ViewModels (ChangeNotifier + Provider)              │       │
│  │  ├── InventoryViewModel                              │       │
│  │  ├── ShoppingListViewModel ◄──► InventoryViewModel   │       │
│  │  ├── FamilySyncViewModel ──► ambos VMs               │       │
│  │  ├── BudgetViewModel                                 │       │
│  │  ├── CollectionsViewModel                            │       │
│  │  └── StatisticsViewModel                             │       │
│  └────────────────────┬─────────────────────────────────┘       │
│                       │                                         │
│  ┌────────────────────▼─────────────────────────────────┐       │
│  │  DOMAIN (Logica de Negocio Pura)                     │       │
│  │                                                      │       │
│  │  Entities: Product, Expense, Income, SavingsGoal,    │       │
│  │  Achievement, FamilyGroup, PriceHistory              │       │
│  │                                                      │       │
│  │  UseCases: ManageInventory (CRUD + toggle + precio)  │       │
│  └────────────────────┬─────────────────────────────────┘       │
│                       │                                         │
│  ┌────────────────────▼─────────────────────────────────┐       │
│  │  DATA (Repositorios + Servicios)                     │       │
│  │                                                      │       │
│  │  ┌─────────────┐  ┌──────────────────────────────┐   │       │
│  │  │  LOCAL       │  │  REMOTE                     │   │       │
│  │  │             │  │                              │   │       │
│  │  │  SQLite v7  │  │  Firebase Firestore (sync)   │   │       │
│  │  │  SharedPrefs│  │  FCM (notificaciones push)   │   │       │
│  │  │  Cache imgs │  │  Open Food Facts API         │   │       │
│  │  │             │  │  Google Custom Search API    │   │       │
│  │  │             │  │  UPCItemDB API               │   │       │
│  │  │             │  │  Scrapers supermercados      │   │       │
│  │  └─────────────┘  └──────────────────────────────┘   │       │
│  └──────────────────────────────────────────────────────┘       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Patron**: Clean Architecture + MVVM + Provider. Los ViewModels se sincronizan entre si: `InventoryVM` y `ShoppingListVM` son bidireccionales, y `FamilySyncVM` empuja cambios a ambos.

---

## Sistema de Dos Listas

El nucleo de la app es un unico booleano `isAtHome` en cada producto que determina en cual lista aparece:

```
┌─────────────────────┐                    ┌─────────────────────┐
│  "TENGO EN CASA"    │                    │  "TENGO QUE COMPRAR"│
│  (isAtHome = true)  │                    │  (isAtHome = false) │
│                     │                    │                     │
│  ┌───────────────┐  │   Se acabo ──►     │  ┌───────────────┐  │
│  │ Arroz 5 lbs   │──┼──────────────────►─┼──│ Arroz         │  │
│  └───────────────┘  │                    │  └───────────────┘  │
│                     │     ◄── Comprado   │                     │
│  ┌───────────────┐  │◄───────────────────┼──┌───────────────┐  │
│  │ Leche 1 gal   │──┼─                   │  │ Leche         │  │
│  └───────────────┘  │                    │  └───────────────┘  │
│                     │                    │                     │
│  Checkbox toggle    │                    │  Checkbox toggle    │
│  con animacion      │                    │  con animacion      │
└─────────────────────┘                    └─────────────────────┘
                    │                          │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                        Historial de precios
                        registrado en cada compra
                        (graficas con fl_chart)
```

![Pantalla Principal](/project/inventario-personal/screenshot-home.png)

![Inventario del Hogar](/project/inventario-personal/screenshot-inventory.png)

![Lista de Compras](/project/inventario-personal/screenshot-shopping-list.png)

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

## Comparacion de Precios de Supermercados

Web scrapers para 3 cadenas de supermercados hondureños:

```
Busqueda de producto
        │
        ▼
┌───────────────────────────────────────────────┐
│  SupermarketAggregatorService                 │
│                                               │
│  ┌──────────────────┐                         │
│  │ Walmart Honduras  │◄── VTEX GraphQL API    │
│  │ (walmart_scraper) │                        │
│  ├──────────────────┤                         │
│  │ La Colonia        │◄── HTML scraping       │
│  │ (la_colonia)      │                        │
│  ├──────────────────┤                         │
│  │ PriceSmart        │◄── HTML scraping       │
│  │ (pricesmart)      │                        │
│  └──────────────────┘                         │
│                                               │
│  + Supermercados/pulperias personalizado      │
│    (agregados por el usuario)                 │
│                                               │
│  Cache: SharedPreferences                     │
└───────────────────────────────────────────────┘
        │
        ▼
  Tabla comparativa de precios
  por supermercado
```

El usuario tambien puede agregar sus propias pulperias o mercados locales y registrar precios manualmente para comparar.

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
│  ● 3 dias antes ──► Alerta temprana            │
│  ● 1 dia antes  ──► Recordatorio urgente       │
│  ● Dia del venc. ──► Alerta final              │
│                                                │
│  Indicadores visuales:                         │
│  🟢 Fresco  🟡 <7 dias  🟠 <3 dias  🔴 Vencido │
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

---

## Modulo de Colecciones

Para catalogar items no consumibles (videojuegos, libros, figuras, electronica):

- **Condicion**: Escala de 7 niveles (Perfecto → Pobre) con codigo de colores
- **Seguimiento de valor**: Precio de compra vs valor actual con calculo de apreciacion/depreciacion en porcentaje
- **Metadata**: Año, ubicacion, numero de serie, notas

---

## Gamificacion

Sistema de logros con 4 tipos: ahorro, actividad, hito y racha. Progreso automatico con desbloqueo al cumplir requisitos.

---

## Base de Datos (SQLite v7)

```
┌─────────────────────────────────────────────────────────────┐
│  SQLite - 10 tablas principales                             │
│                                                             │
│  products ──────────┐                                       │
│  (30+ campos)       │ FK                                    │
│  id, name, brand,   ├──► price_history                      │
│  is_at_home,        │    (precio, fecha)                    │
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
│                     │                                       │
│  cached_prices      │    (cache de scrapers)                │
└─────────────────────────────────────────────────────────────┘
```

Migraciones incrementales via `_onUpgrade()`. La app funciona en desktop usando `sqflite_common_ffi` y en movil con `sqflite` estandar.

---

## Stack Tecnologico

| Categoria    | Tecnologias                                                               |
| ------------ | ------------------------------------------------------------------------- |
| Framework    | Flutter (Dart ^3.8.1)                                                     |
| Estado       | Provider (MultiProvider + ChangeNotifier)                                 |
| DB Local     | SQLite (sqflite), SharedPreferences                                       |
| Backend      | Firebase Firestore, Firebase Cloud Messaging                              |
| APIs         | Open Food Facts, UPCItemDB, Google Custom Search                          |
| Scrapers     | Walmart Honduras (VTEX GraphQL), La Colonia, PriceSmart                   |
| Dispositivo  | mobile_scanner, speech_to_text, image_picker, flutter_local_notifications |
| UI           | fl_chart (graficas), cached_network_image, qr_flutter                     |
| IA/ML        | google_mlkit_text_recognition (OCR)                                       |
| Testing      | flutter_test, mockito, fake_cloud_firestore                               |
| Arquitectura | Clean Architecture + MVVM + TDD                                           |

---

## Donde poner las capturas

Las imagenes referenciadas en esta pagina deben colocarse en:

```
public/project/inventario-personal/
├── screenshot-home.png              # Pantalla principal con las dos tabs
├── screenshot-inventory.png         # Vista de inventario "Tengo en casa"
├── screenshot-shopping-list.png     # Vista de lista de compras
├── screenshot-family-sync.png       # Pantalla de sincronizacion familiar
```

La imagen principal del proyecto (para la card en el portafolio) va en:

```
public/project/inventario-personal.png   # Screenshot principal para la card
```
