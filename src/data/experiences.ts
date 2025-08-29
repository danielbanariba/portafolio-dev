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
    title: "Desarrollador de software",
    company: "Analiza",
    positions: [
      {
        role: "Backend Developer | Sistema Agroservicio - Módulos Comerciales",
        period: "Agosto 2025 - Actualidad",
        points: [
          "Desarrollé un sistema completo de gestión comercial implementando 6 módulos core (Proveedores, Categorías, Sub-categorías, Inventario, Sucursales y Lotes) con arquitectura RESTful y relaciones en la base de datos.",
          "Implementé funcionalidad CRUD completa con filtros geográficos y validaciones de negocio para la gestión de suppliers, inventario y sucursales del sector agropecuario.",
        ],
        technologies: [
          "TypeScript",
          "NestJS",
          "PostgreSQL",
          "TypeORM",
          "JWT",
          "REST API",
        ],
      },
      {
        role: "Software Engineer | Modernización Sistema de Impresión",
        period: "12 de Julio - 20 de Agosto",
        points: [
          "Solucioné incompatibilidades críticas del sistema de impresión al migrar a Windows 11, identificando que el cambio de puerto predeterminado (9000 → 9001) causaba fallos en todas las impresoras del laboratorio.",
          "Desarrollé sistema de detección automática de puertos y tipos de impresoras, implementando configuración dinámica para compatibilidad universal entre protocolos ESC/POS y TSPL.",
          "Automaticé completamente la instalación del servicio mediante scripts PowerShell y archivos .bat, eliminando el proceso manual que realizaban los técnicos, reduciendo tiempo de configuración de 30 minutos a 2 minutos y eliminando el fallo humano.",
          "Implementé servidor WebSocket dual-port (9000/9001) con threading para garantizar compatibilidad simultánea entre Windows 10 y Windows 11, manteniendo alta disponibilidad ante fallos de red o hardware.",
          "Refactoricé el sistema de conversión de comandos de impresión, mejorando la precisión de códigos de barras CODE39 y EAN13, y optimizando el rendering de facturas médicas.",
          "Desarrollé sistema robusto de manejo de errores con logging detallado y recuperación automática, aumentando la estabilidad del servicio en un 95%.",
        ],
        technologies: [
          "Python",
          "WebSocket",
          "PowerShell",
          "win32print API",
          "Protocolos ESC/POS",
          "Protocolos TSPL",
          "Threading",
          "Windows Services",
          "Hardware Integration",
        ],
      },
      {
        role: "Backend Developer | Migración CRM Bacteriología",
        period: "3 de Junio - 12 de Julio",
        points: [
          "Desarrollé una API completa con FastAPI para la integración del sistema REAL (middleware VITEK) con el CRM de bacteriología, automatizando el procesamiento de resultados de cultivos que anteriormente se ingresaban manualmente.",
          "Implementé modelos de datos con SQLModel ORM para gestionar catálogos de bacterias (7,429 microorganismos), antibióticos (278 registros) y tipos de muestra, estableciendo relaciones complejas entre encabezados y detalles de antibiogramas.",
          "Diseñé endpoints RESTful para CRUD de resultados bacteriológicos, validación de cultivos y gestión de catálogos, con documentación automática en Swagger y manejo robusto de errores.",
          "Desarrollé servicios de negocio para mapeo entre códigos REAL y Analiza, conversión de protocolos ASTM/HL7, y validación de estados de tubos y pruebas en el flujo de trabajo completo.",
          "Implementé sistema de trazabilidad de mensajes bidireccionales ASTM/HL7 con manejo de errores, reintentos automáticos y logging para debugging de comunicación con equipos VITEK.",
        ],
        technologies: [
          "Python",
          "FastAPI",
          "SQLModel",
          "PostgreSQL",
          "RabbitMQ",
          "Protocolos ASTM/HL7",
          "Docker",
          "Postman",
          "Swagger",
          "AWS CodeCommit",
        ],
      },
      {
        role: "Backend Developer | Sistema de Facturacion de Guatemala",
        period: "24 de Marzo - 2 de Junio",
        points: [
          "Implementé un sistema de comisiones para médicos referentes que automatiza el cálculo y registro del 10% sobre servicios de laboratorio referidos, mejorando la fidelización de profesionales externos.",
          "Automaticé las pruebas de API en Postman mediante scripts de extracción automática de tokens de autenticación, eliminando el proceso manual de copiar y pegar tokens entre requests.",
          "Implementé variables de entorno en Postman utilizando configuraciones dinámicas en lugar de URLs fijas, facilitando el cambio de endpoints entre entornos de desarrollo, testing y producción sin modificar cada request individualmente.",
          "Desarrollé un endpoint para automatizar el reabastecimiento de inventario entre sucursales, implementando lógica de negocio para optimizar solicitudes basadas en puntos de reorden y disponibilidad real.",
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
    date: "2025 Marzo - Actualidad",
  },
  {
    title: "Practicante Ingeniería de Sistemas",
    company: "GuabaBIT",
    positions: [
      {
        role: "QA & Backend Developer | LUQA",
        period: "28 de Octubre - 14 de Marzo",
        points: [
          "Diseñé y elaboré un documento técnico de la arquitectura completa de un sistema de pagos comunitarios con servicios RESTful y flujos de trabajo, para facilitar la comprensión y mantenimiento del sistema, implementando bases de datos NoSQL (DynamoDB) y servicios de AWS (S3, SNS)",
          "Desarrollé la funcionalidad 'Announcement' para notificaciones en tiempo real y gestión de anuncios, incluyendo la creación de endpoints, modelos y servicios de backend. Lo que permitió a los usuarios recibir alertas instantáneas sobre actualizaciones relevantes en la comunidad.",
          "Realicé pruebas de API utilizando Postman y Apidog para asegurar la funcionalidad, creando colecciones y scripts de pruebas automatizadas.",
          "Reporté bugs detallados en los endpoints que consideraban críticos, creando reproducciones precisas en Postman y ApiDog.",
          "Documenté APIs utilizando Swagger y creé documentación detallada de las pruebas en Apidog para facilitar el mantenimiento y escalabilidad",
        ],
        technologies: [
          "Node.js",
          "TypeScript",
          "Nest.js",
          "DynamoDB",
          "AWS",
          "Amazon S3",
          "Amazon SNS",
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
          "Implementé pruebas automatizadas end-to-end con Playwright para flujos críticos (login, formularios, gestión de cotizaciones, handshake)",
          "Creé y ejecuté test cases manuales en Jira para verificar la integridad del sistema, reportando y documentando bugs críticos.",
          "Gestioné historias de usuario (user stories) en Jira, poniendo criterios de aceptacion y una descripcion detalladas, lo que contribuyó a entregas incrementales exitosas en cada sprint",
        ],
        technologies: ["Node.js", "TypeScript", "Jest", "Playwright", "Jira"],
      },
    ],
    icon: "/icon/empresas/guaba-bit.png",
    iconBg: "#383E56",
    date: "2024 Octubre - 2025 Marzo",
  },
];
