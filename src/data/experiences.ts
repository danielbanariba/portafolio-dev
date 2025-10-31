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
  //       period: "1 de Noviembre - Actualidad",
  //       points: [],
  //       technologies: ["FastAPI", "Python"],
  //     },
  //   ],
  //   icon: "/icon/empresas/spicy-tocket.png",
  //   iconBg: "#383E56",
  //   date: "2025 Noviembre - Actualidad",
  // },
  {
    title: "Desarrollador de software",
    company: "Analiza Laboratorios Clínicos",
    positions: [
      {
        role: "Full Stack Developer | Migración CRM Doctores",
        period: "15 de Octubre - 31 de Octubre",
        points: [
          "Participé en proyecto de migración del sistema CRM1 al CRM2, enfocándome en el módulo de gestión de doctores.",
          "Configuré entorno de desarrollo con Flask (Python 3.10), Angular 11, PostgreSQL y VPN corporativa en Ubuntu.",
          "Resolví conflictos de dependencias en Flask-RESTPlus para compatibilidad con Python 3.10+ (modificación en collections.abc).",
          "Diseñé estructura de modal CRUD para gestión de doctores incluyendo validaciones de campos requeridos (número de colegio, teléfono, correo).",
          "Investigué arquitectura legacy del sistema para poder integrar componente doctor_backoffice con crm2_base siguiendo convenciones existentes.",
        ],
        technologies: [
          "Python",
          "Flask",
          "TypeScript",
          "Angular 11",
          "PostgreSQL",
          "Linux/Ubuntu",
          "OpenVPN",
        ],
      },
      {
        role: "DevOps & Infrastructure Engineer | Implementación Proxy Corporativo con VPN",
        period: "6 de Octubre - 14 de Octubre",
        points: [
          "Cree un servidor proxy con Docker que centraliza el acceso VPN, reduciendo la gestión de 30+ equipos a 1 servidor y eliminando configuraciones individuales.",
          "Automaticé proceso de construcción con script bash, reduciendo tiempo de setup de 30 minutos a 3 minutos con validación automática de dependencias.",
          "Solucioné problemas críticos de DNS y conflictos Docker Engine.",
          "Implementé sistema de whitelist con Squid ACLs y configuré privilegios de red avanzados para operación segura de OpenVPN en contenedores.",
          "Creé documentación técnica de 600+ líneas con diagramas de arquitectura, facilitando replicación en otras sucursales.",
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
          "Hice un diagrama de flujo de las etiquetas del código de barras para entender el proceso y la lógica de negocio del sistema.",
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
    iconBg: "#383E56",
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
