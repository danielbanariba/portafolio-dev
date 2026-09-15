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
  {
    title: "Programador RPA",
    company: "Grupo Farinter",
    positions: [
      {
        role: "Desarrollador RPA & Data Engineer",
        period: "Noviembre 2025 - Actualidad",
        points: [
          "Reduje un 94% los falsos positivos del control de cumplimiento de la cartera de crédito, desarrollando el RPA que la evalúa contra listas restrictivas internacionales (OFAC, ONU, PEP) con matching difuso, sin perder un solo verdadero positivo. Entregado con ciclo SDD completo y TDD estricto, y validado y cerrado por el área de Cumplimiento.",
          "Convertí la operación de la infraestructura de producción —orquestación, consultas a bases de datos, archivos y despliegues— en algo que se maneja desde un asistente de IA, construyendo un fleet de 6 servidores MCP (Model Context Protocol) propios. Endurecidos con validador SQL read-only, confirmación de dos pasos para mutaciones, políticas de blast-radius y OAuth2; optimización de tokens (~10-20x) y auditoría adversarial multiagente.",
          "Reduje un forecast mensual de demanda (~23,000 series) de ~18 horas a ~61 minutos en producción, paralelizando el loop por serie con ProcessPoolExecutor (poda de series muertas, output byte-idéntico y determinista) bajo TDD estricto y sin dependencias nuevas.",
          "Apliqué Agentic AI e IA generativa (LLMs) con orquestación de sub-agents, Anthropic Agent Skills (SKILL.md), slash commands y hooks sobre Claude Code, Codex CLI y OpenCode, bajo metodología SDD y TDD estricto, aplicando Prompt Engineering para acelerar entregas.",
          "Construí un dashboard full-stack en Python (Reflex) de inteligencia competitiva de precios con 10 vistas analíticas: detecta erosión de margen a 12 meses (histórico SCD2), clasifica la causa raíz, simula precios sugeridos e incluye homologación con checks de data quality. Lo refactoricé de mono-país a multi-país y puse un segundo país en producción. 1,790 tests y CI/CD.",
          "Construí un pipeline de Power BI as Code (PBIR/TMDL) con validador propio (bind-check contra los schemas oficiales) y CI en GitHub Actions, más un sistema de verificación agéntica: un watcher en RDP que ante cada push valida, recarga y toma screenshot para que la IA verifique el render real del tablero.",
          "Automaticé conciliaciones bancarias y transaccionales con pipelines ETL en Dagster sobre SMB y SQL Server, con detección automática de archivos nuevos mediante file sensors y carga incremental, más una integración contra la API REST H2H de pagos masivos de un banco (OAuth2 con credenciales en HashiCorp Vault).",
          "Construí un sistema autónomo de monitoreo (watchdog) que detecta pipelines pegados comparando tiempos contra baselines aprendidos de 100+ ejecuciones, cancela y re-lanza automáticamente, y notifica vía Telegram en tiempo real como servicio systemd.",
          "Eliminé el ruido de las alertas de fallos rediseñando cómo se disparan: en vez de avisar al instante, el incidente se encola en PostgreSQL y solo escala a email y Discord si el proceso no se recuperó solo dentro de un plazo configurable. Los fallos transitorios que el orquestador reintenta y resuelve dejaron de despertar a nadie.",
          "Cerré un hueco estructural de calidad de datos: existían decenas de asset checks pero nada escuchaba sus eventos, así que construí un sensor genérico de AssetCheckEvaluation que notifica solo los errores a Discord, Telegram y email con deduplicación por cursor y avisos de recuperación.",
          "Diagnostiqué y corregí una cadena de tres fallos silenciosos en un bot de alertas productivo (crash loop por entrypoint incorrecto, credencial tipada que el driver no aceptaba y schema nunca creado en el entorno), agregando auto-bootstrap idempotente y reemplazando los except silenciosos por logging visible.",
          "Implementé sensores de ingesta SFTP con validación de archivos y particiones dinámicas, más detección de bloqueos de stored procedures críticos con instrumentación de procesos lentos y alertado multicanal.",
          "Construí hvault, un servicio en Rust puro (CLI + daemon) que sincroniza certificados TLS entre nodos usando HashiCorp Vault (KV-v2), con hot-reload atómico, validación x509 sin OpenSSL y UI de administración en Leptos/WASM con OIDC.",
          "Construí scrapers para la extracción diaria automatizada en Dagster, con desencriptación de datos y rotación de proxies/TOR para evadir rate limiting.",
        ],
        technologies: [
          "Python",
          "Dagster",
          "SQL Server",
          "DWH",
          "PostgreSQL",
          "MCP Servers",
          "GraphQL",
          "Docker",
          "GitHub Actions",
          "dbt",
          "Polars",
          "Power BI",
          "pytest",
          "TDD",
          "SDD",
          "Reflex",
          "Rust",
          "HashiCorp Vault",
          "Power BI as Code",
          "Claude Code",
          "Agentic AI",
          "Anthropic API",
          "Prompt Engineering",
          "SFTP",
          "Telegram Bot",
          "SMB/CIFS",
          "Leptos",
          "statsforecast",
          "Dokploy",
          "Data Quality",
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
        role: "DevOps & Infrastructure Engineer | Implementación Proxy Corporativo con VPN",
        period: "Octubre 2025",
        points: [
          "Cree un servidor proxy con Docker que centraliza el acceso VPN, reduciendo la gestión de 30+ equipos a 1 servidor y eliminando configuraciones individuales.",
          "Automaticé proceso de construcción con script bash, reduciendo tiempo de setup de 30 minutos a 3 minutos con validación automática de dependencias.",
          "Implementé sistema de whitelist con Squid ACLs y configuré privilegios de red avanzados para operación segura de OpenVPN en contenedores.",
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
        role: "Backend Developer | Migración CRM Bacteriología",
        period: "Junio - Julio 2025",
        points: [
          "Automaticé integración VITEK-CRM con FastAPI, eliminando ingreso manual de resultados de cultivos bacteriológicos en producción.",
          "Implementé sistema de trazabilidad de protocolos médicos ASTM/HL7 con reintentos automáticos y logging para comunicación con equipos de laboratorio.",
          "Desarrollé API RESTful gestionando catálogos de 7,429 microorganismos y 278 antibióticos con relaciones complejas y validación de estados.",
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
        role: "QA & Backend Developer",
        period: "Octubre 2024 - Marzo 2025",
        points: [
          "Diseñé la documentación técnica de la arquitectura completa para un sistema de pagos comunitarios con NestJS, DynamoDB y servicios AWS (S3, SNS).",
          "Implementé pruebas automatizadas end-to-end con Playwright para flujos críticos (login, formularios, gestión de cotizaciones, handshake) y testing de API con Postman/Apidog, reportando bugs críticos con reproducciones precisas.",
        ],
        technologies: [
          "Node.js",
          "TypeScript",
          "NestJS",
          "DynamoDB",
          "AWS S3",
          "AWS SNS",
          "Playwright",
          "Postman",
          "Apidog",
        ],
      },
    ],
    icon: "/icon/empresas/guaba-bit.png",
    iconBg: "#383E56",
    date: "2024 Octubre - 2025 Marzo",
  },
];
