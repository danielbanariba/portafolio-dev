---
layout: "/src/layouts/MarkdownLayout.astro"
title: Consultoría en datos
description: Daniel Banariba automatiza procesos que hoy se hacen a mano en Excel —conciliaciones, cargas de archivos y reportes— para que corran solos y avisen cuando algo no cuadra. Tres casos reales, anonimizados, con sus resultados.
---

Automatizo procesos que hoy se hacen a mano en Excel —conciliaciones, cargas de archivos
y reportes— para que corran solos y avisen cuando algo no cuadra.

Los tres casos son proyectos reales que hice en mi empleo actual como Data Engineer.
Los datos están anonimizados: sin nombres de empresas, socios ni montos.

## Cuadrar lo que pagan las apps de delivery

**El problema.** La app de delivery depositaba cada período un monto neto, y el Excel que
entregaba su portal no cuadraba con lo recibido: faltaba cerca del 3 % del pago. Con ese
archivo, Contabilidad no podía explicar la diferencia.

**Qué hice.**
- Encontré que los tres conceptos que faltaban (IVA sobre comisiones, cargo de plataforma
  y descuentos) solo aparecían en el estado de cuenta en PDF, no en el Excel.
- Construí un extractor que lee ese PDF y cuadra cada concepto contra las ventas del
  período.
- Detecté de paso que el archivo ".xls" del portal era otro formato disfrazado, que las
  herramientas estándar rechazaban.

**Resultado.**
- El período analizado cuadró a 0.00.
- La primera corrida en producción, sobre otro período, también cuadró a 0.00 y cerró
  contra el PDF en 33 segundos.
- Reproduce 5 de los 6 conceptos que Contabilidad calculaba a mano.

**A quién le sirve.** Restaurantes, farmacias y comercios que venden por apps de delivery
y no logran explicar la diferencia entre lo vendido y lo depositado.

## Pagos que llegan por correo, aplicados solos

**El problema.** Una aseguradora enviaba sus pagos por correo: un Excel con el detalle y
las imágenes de los comprobantes de transferencia. Para conciliarlos, esa información
tenía que llegar a la base de datos con las referencias bancarias correctas.

**Qué hice.**
- Un robot que revisa el buzón cada hora y carga el Excel a la base de datos sin
  duplicar nada si una corrida se repite.
- Lee las referencias bancarias de las imágenes y solo acepta una lectura cuando su suma
  coincide con el total del Excel; si ninguna coincide, abre una incidencia sin detener
  la carga.
- Dispara la conciliación tres veces por semana.

**Resultado.**
- En producción desde noviembre de 2026.
- La primera ejecución programada terminó en 11 segundos y las referencias cuadraron con
  el total del Excel.
- Una revisión independiente encontró un caso en que la conciliación se repetía tras un
  bloqueo de la base de datos; lo corregí y quedó cubierto por una prueba automática.

**A quién le sirve.** Empresas que reciben pagos o avisos de pago por correo (clientes,
aseguradoras, distribuidores) y los aplican a mano.

## Menos falsas alarmas en listas restrictivas

**El problema.** La cartera de crédito debía revisarse contra listas restrictivas
internacionales (OFAC, ONU) y de personas expuestas políticamente. Comparar nombres por
aproximación produce alertas falsas, y cada una le cuesta tiempo al Oficial de
Cumplimiento.

**Qué hice.**
- Un robot que revisa toda la cartera contra las listas con comparación aproximada de
  nombres.
- Antes de pasar a producción detecté que los alias de una sola palabra inflaban las
  alertas falsas hasta los miles, y ajusté la regla sin dejar de detectar las
  coincidencias reales.
- Alerta inmediata al Oficial de Cumplimiento cuando hay una coincidencia, y una revisión
  completa automática cada seis meses.

**Resultado.**
- Un 94 % menos de falsas alarmas, sin perder ninguna coincidencia real.
- Cumplimiento validó el tablero de resultados y cerró el requerimiento.

**A quién le sirve.** Cooperativas, financieras, remesadoras y otras instituciones que
deben revisar a sus clientes contra listas restrictivas.

## ¿Tiene un proceso así?

Escríbame a [danielbanariba@protonmail.com](mailto:danielbanariba@protonmail.com?subject=Consultor%C3%ADa) con una descripción corta del proceso: qué archivos entran, qué se hace a mano y cuánto tiempo toma cada vez. Le respondo con lo que se puede automatizar.
