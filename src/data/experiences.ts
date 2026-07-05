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
        period: "15 de Noviembre 2025 - Actualidad",
        points: [
          "Desarrollé servidores MCP (Model Context Protocol) que habilitan a la IA (Claude Code) operar Dagster, SQL Server, Microsoft Graph y health checks de APIs, con un flujo completo de CI/observabilidad operado directamente desde herramientas de IA; endurecidos con validador SQL read-only, políticas de blast-radius y OAuth2 (Zitadel).",
          "Apliqué Agentic AI e IA generativa (LLMs) con orquestación de sub-agents, Anthropic Agent Skills (SKILL.md), slash commands y hooks sobre Claude Code, Codex CLI y OpenCode, bajo metodología SDD y TDD estricto, aplicando Prompt Engineering para acelerar entregas.",
          "Construí un dashboard full-stack en Python (Reflex) de inteligencia competitiva de precios para Kielsa con 8 vistas que comparan los márgenes contra ~7,700 SKUs de la competencia: detecta erosión de margen a 12 meses (histórico SCD2), clasifica la causa raíz, simula precios sugeridos e incluye homologación con checks de data quality. 801 tests y CI/CD a Dokploy.",
          "Construí un pipeline de Power BI as Code (PBIR/TMDL) con validador propio (bind-check contra los schemas oficiales) y CI en GitHub Actions, más un sistema de verificación agéntica: un watcher en RDP que ante cada push valida, recarga y toma screenshot para que la IA verifique el render real del tablero.",
          "Implementé pipelines ETL en Dagster para conciliación bancaria (Credomatic/BAC, Ficohsa) y transaccional (Netflix, Tengo, Rapibac) vía SMB y SQL Server, con detección automática de archivos nuevos mediante file sensors.",
          "Construí un sistema autónomo de monitoreo (watchdog) que detecta pipelines pegados comparando tiempos contra baselines aprendidos de 100+ ejecuciones, cancela y re-lanza automáticamente, y notifica vía Telegram en tiempo real como servicio systemd.",
          "Rediseñé el sistema de alertas de fallos de Dagster de arquitectura send-immediate a freshness-aware late alerts con cola de pendientes en PostgreSQL, eliminando el ruido de fallos transitorios auto-recuperados por retries automáticos.",
          "Detecté y corregí 3 bugs silenciosos en el bot Discord productivo que llevaban 2 días sin detectar (crash loop de Docker, SecretEnvVar incompatible con psycopg2 y tablas nunca creadas en producción), agregando auto-bootstrap idempotente del schema (CREATE TABLE IF NOT EXISTS).",
          "Implementé sensores de ingesta SFTP con validación de archivos y particiones dinámicas, más un sensor de alerta de bloqueos del stored procedure SAP FlujoFacturacionResumen con instrumentación de SPs lentos.",
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
        period: "6 de Octubre - 14 de Octubre",
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
        period: "3 de Junio - 12 de Julio",
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
        period: "28 de Octubre - 14 de Marzo",
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
