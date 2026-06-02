export interface Position {
  role: string;
  period?: string;
  points: string[];
  technologies?: string[];
}

export interface Experience {
  title: string;
  company: string;
  positions: Position[];
  icon: string;
  iconBg: string;
  date: string;
  technologies?: string[];
}

export const experiences: Experience[] = [
  // {
  //   title: "Ingeniero de Software",
  //   company: "Spicy Rocket",
  //   positions: [
  //     {
  //       role: "Backend Developer | Proyecto para Vargroup (España)",
  //       period: "17 de Noviembre - Actualidad",
  //       points: [],
  //       technologies: ["FastAPI", "Python"],
  //     },
  //   ],
  //   icon: "/icon/empresas/spicy-tocket.png",
  //   iconBg: "#383E56",
  //   date: "2025 Noviembre - Actualidad",
  // },
  {
    title: "Programador RPA",
    company: "Grupo Farinter",
    positions: [
      {
        role: "Desarrollador RPA & Data Engineer",
        period: "15 de Noviembre 2025 - Actualidad",
        points: [
          "Rediseñé el sistema de alertas de fallos de Dagster de arquitectura send-immediate a freshness-aware late alerts con cola de pendientes en PostgreSQL, eliminando el ruido de fallos transitorios auto-recuperados por retries automáticos. Un nuevo sensor evalúa cada 5 minutos contra un deadline configurable y solo dispara email + Discord si el asset no se recuperó.",
          "Detecté y corregí 3 bugs silenciosos en el bot Discord productivo que llevaban 2 días sin detectar (crash loop de Docker por CMD apuntando al python del sistema en vez del venv, SecretEnvVar de DagsterSettings incompatible con psycopg2.connect, y tablas de nexus nunca creadas en el entorno productivo). Agregué auto-bootstrap idempotente del schema (CREATE TABLE IF NOT EXISTS) y reemplacé los except silenciosos por logger.warning.",
          "Implementé comandos avanzados en el bot Discord: !asset con fuzzy search (normalización de separadores, multi-palabra AND, fallback con difflib) para consultar assets específicos del workspace Dagster de 1073 assets vía GraphQL, y !enable-here/!disable-here (admin-only, DB-driven) para self-service de canales sin reinicios del container.",
          "Deployé un segundo bot Discord independiente en el entorno dev/qa (server separado) apuntando al Dagster de qa, con display timezone configurable (zoneinfo, default America/Tegucigalpa) para que los timestamps coincidan con la zona del equipo lector.",
          "Integré notificaciones de fallos a Discord webhook como segundo canal al lado del email, con especificación formal (SDD), TDD estricto (13 tests unitarios e integración) y degradación graceful donde Discord funciona incluso si el SMTP falla.",
          "Construí sistema autónomo de monitoreo (watchdog) que detecta pipelines pegados comparando tiempos contra baselines aprendidos de 100+ ejecuciones, cancela y re-lanza automáticamente, y notifica vía Telegram en tiempo real como servicio systemd.",
          "Configuré timeouts nativos (dagster/max_runtime) en 27+ jobs de 3 code locations para detección automática de procesos pegados, complementando el sistema de alertas Discord.",
          "Desarrollé e integré servidores MCP (Model Context Protocol) para operaciones Dagster (materialización, runs, logs), consultas SQL Server con allowlist parametrizada, y monitoreo de Discord (lectura/envío de mensajes), habilitando un flujo completo de CI/observabilidad operado directamente desde herramientas de IA.",
          "Desarrollé pipelines de conciliación de tarjetas de crédito (Credomatic/BAC y Ficohsa) automatizando la lectura de estados de cuenta Excel vía SMB desde carpetas compartidas y cruzando contra tablas LDCOM en SQL Server.",
          "Implementé pipelines ETL para conciliación transaccional de Netflix, Tengo y Rapibac con detección automática de archivos nuevos mediante file sensors de Dagster.",
          "Automaticé el proceso de cierre de cajas consolidando archivos Excel diarios en tablas staging del DWH con detección automática de cambios mediante sensores de Dagster.",
          "Estandaricé estructuras de tablas DWH con metadatos (país, origen, versiones) para consumo en Power BI, corrigiendo bugs de datos históricos y ventanas de carga.",
          "Documenté hallazgos de seguridad en APIs internas (Kielsa) con reportes técnicos detallados, incluyendo endpoints expuestos y recomendaciones de mitigación.",
          "Evalué e integré herramientas de IA (GitHub Copilot, Claude Code, Codex) para el equipo de desarrollo, incluyendo comparativa de licenciamiento y propuesta de Claude Cowork.",
          "Construí scrapers para la extracción diaria automatizada en Dagster, incluyendo desencriptación de datos y rotación de proxies/TOR para evadir rate limiting.",
        ],
        technologies: [
          "Python",
          "Dagster",
          "SQL Server",
          "DWH",
          "PostgreSQL",
          "Discord Webhooks",
          "Discord.py",
          "Telegram Bot",
          "MCP Servers",
          "GraphQL",
          "Docker",
          "Docker Compose",
          "GitHub Actions",
          "SMB/CIFS",
          "dbt",
          "Polars",
          "Power BI",
          "Linux",
          "pytest",
          "TDD",
          "SDD",
        ],
      },
    ],
    icon: "/icon/empresas/grupo-farinter.png",
    iconBg: "#FFFFFF",
    date: "2025 Noviembre - Actualidad",
  },
  {
    title: "Desarrollador de software",
    company: "Analiza Laboratorios Clínicos",
    positions: [
      {
        role: "Full Stack Developer | Migración CRM Doctores",
        period: "15 de Octubre - 31 de Octubre",
        points: [
          "Desarrollé módulo completo de gestión de doctores implementando 8 endpoints REST con validaciones de datos únicos (email, número de colegiación) y manejo transaccional, integrando automáticamente sistema de epockets (billeteras electrónicas) al registrar nuevos doctores.",
          "Implementé sistema de encriptación para protección de datos bancarios sensibles (números de cuenta) utilizando Fernet, garantizando cumplimiento de estándares de seguridad en información financiera del personal médico.",
          "Creé funcionalidad de búsqueda y filtrado avanzado con múltiples criterios (especialidad médica, clínica, estado) y exportación a Excel, optimizando flujo de trabajo del personal administrativo.",
          "Corregí bug crítico en modelo de base de datos que impedía creación de doctores, identificando campos inexistentes que generaban errores en producción.",
          "Actualicé dependencias del proyecto de 12 a 150+ paquetes versionados (SQLAlchemy, Flask-RESTPlus, Firebase, Cryptography) para compatibilidad con Python 3.10+, resolviendo conflictos de módulos legacy.",
          "Configuré entorno de desarrollo full-stack con Flask, Angular 11, PostgreSQL y VPN corporativa en Ubuntu, investigando arquitectura legacy para integrar correctamente componentes existentes.",
        ],
        technologies: [
          "Python",
          "Flask",
          "TypeScript",
          "Angular 11",
          "PostgreSQL",
          "SQLAlchemy",
          "REST API",
          "Cryptography",
        ],
      },
      {
        role: "DevOps & Infrastructure Engineer | Implementación Proxy Corporativo con VPN",
        period: "6 de Octubre - 14 de Octubre",
        points: [
          "Cree un servidor proxy con Docker que centraliza el acceso VPN, reduciendo la gestión de 30+ equipos a 1 servidor y eliminando configuraciones individuales.",
          "Automaticé proceso de construcción con script bash, reduciendo tiempo de setup de 30 minutos a 3 minutos con validación automática de dependencias.",
          "Implementé sistema de whitelist con Squid ACLs y configuré privilegios de red avanzados para operación segura de OpenVPN en contenedores.",
          "Creé documentación técnica con diagramas de arquitectura, facilitando replicación en otras sucursales.",
        ],
        technologies: [
          "Docker",
          "Squid Proxy",
          "OpenVPN",
          "Linux Networking",
          "Bash Scripting",
        ],
      },
      {
        role: "Backend Developer | Sistema Agroservicio - Módulos Comerciales & Facturación",
        period: "21 de Agosto - 4 de Octubre",
        points: [
          "Desarrollé un sistema completo de gestión comercial con 10 módulos core (Proveedores, Categorías, Sub-categorías, Inventario, Sucursales y Lotes) aplicando arquitectura RESTful.",
          "Implementé sistema FIFO de gestión de lotes con cálculos automáticos de totales, validación de duplicados y control de inventario por vencimiento.",
          "Implementé funcionalidad CRUD completa con filtros geográficos y validaciones de negocio para la gestión de suppliers, inventario y sucursales del sector agropecuario.",
        ],
        technologies: [
          "TypeScript",
          "NestJS",
          "PostgreSQL",
          "TypeORM",
          "REST API",
        ],
      },
      {
        role: "Software Engineer | Modernización Sistema de Impresión",
        period: "12 de Julio - 20 de Agosto",
        points: [
          "Solucioné incompatibilidades críticas del sistema operativo Windows 11, implementando servidor WebSocket dual-port (9000/9001) que garantiza compatibilidad simultánea con Windows 10 y Windows 11.",
          "Automaticé completamente la instalación del servicio mediante scripts PowerShell, eliminando el proceso manual que realizaban los técnicos, reduciendo tiempo de configuración de 30 minutos a 2 minutos y eliminando el fallo humano.",
          "Desarrollé detección automática de puertos y tipos de impresoras con configuración dinámica para protocolos ESC/POS y TSPL.",
        ],
        technologies: [
          "Python",
          "WebSocket",
          "PowerShell",
          "win32print API",
          "Protocolos ESC/POS",
          "Protocolos TSPL",
          "Threading",
        ],
      },
      {
        role: "Backend Developer | Migración CRM Bacteriología",
        period: "3 de Junio - 12 de Julio",
        points: [
          "Automaticé integración VITEK-CRM con FastAPI, eliminando ingreso manual de resultados de cultivos bacteriológicos en producción.",
          "Implementé sistema de trazabilidad de protocolos médicos ASTM/HL7 con reintentos automáticos y logging para comunicación con equipos de laboratorio.",
          "Desarrollé API RESTful gestionando catálogos de 7,429 microorganismos y 278 antibióticos con relaciones complejas y validación de estados.",
          "Integré RabbitMQ para procesamiento asíncrono de mensajes y despliegue con Docker en ambiente productivo.",
        ],
        technologies: [
          "Python",
          "FastAPI",
          "SQLModel",
          "PostgreSQL",
          "RabbitMQ",
          "Protocolos ASTM/HL7",
          "Docker",
          "Swagger",
        ],
      },
      {
        role: "Backend Developer | Sistema de Facturación de Guatemala",
        period: "24 de Marzo - 2 de Junio",
        points: [
          "Implementé un sistema de comisiones automatizado para médicos referentes (10% sobre servicios), mejorando fidelización de profesionales externos.",
          "Desarrollé endpoint de reabastecimiento automático de inventario entre sucursales con lógica de puntos de reorden y disponibilidad real.",
          "Automaticé testing de API en Postman con extracción dinámica de tokens y variables de entorno multi-ambiente (dev/test/prod).",
        ],
        technologies: [
          "Node.js",
          "TypeScript",
          "Express",
          "Sequelize ORM",
          "PostgreSQL",
          "Postman",
        ],
      },
    ],
    icon: "/icon/empresas/analiza.png",
    iconBg: "#FFFFFF",
    date: "2025 Marzo - 2025 Octubre",
  },
  {
    title: "Practicante Ingeniería de Sistemas",
    company: "GuabaBIT",
    positions: [
      {
        role: "QA & Backend Developer | LUQA",
        period: "28 de Octubre - 14 de Marzo",
        points: [
          "Diseñé la documentación técnica de la arquitectura completa para un sistema de pagos comunitarios con NestJS, DynamoDB y servicios AWS (S3, SNS).",
          "Desarrollé la funcionalidad 'Announcement' para las notificaciones en tiempo real, incluyendo endpoints, modelos y servicios backend, lo que permitió a los usuarios recibir alertas instantáneas sobre actualizaciones relevantes en la comunidad.",
          "Implementé pruebas automatizadas de API con Postman/Apidog, reportando bugs críticos con reproducciones precisas.",
          "Documenté APIs con Swagger para facilitar mantenimiento y escalabilidad del sistema.",
        ],
        technologies: [
          "Node.js",
          "TypeScript",
          "NestJS",
          "DynamoDB",
          "AWS S3",
          "AWS SNS",
          "Postman",
          "Apidog",
          "Swagger",
          "API Testing",
          "API Documentation",
        ],
      },
      {
        role: "QA Tester | Choyc",
        period: "28 de Octubre - 14 de Marzo",
        points: [
          "Implementé pruebas automatizadas end-to-end con Playwright para flujos críticos (login, formularios, gestión de cotizaciones, handshake).",
          "Creé y ejecuté test cases manuales en Jira para verificar la integridad del sistema, reportando y documentando bugs críticos.",
          "Gestioné historias de usuario (user stories) en Jira, poniendo criterios de aceptacion y una descripcion detalladas, lo que contribuyó a entregas incrementales exitosas en cada sprint.",
        ],
        technologies: ["Node.js", "TypeScript", "Jest", "Playwright", "Jira"],
      },
    ],
    icon: "/icon/empresas/guaba-bit.png",
    iconBg: "#383E56",
    date: "2024 Octubre - 2025 Marzo",
  },
];
