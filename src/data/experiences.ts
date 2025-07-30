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
        role: "Backend Developer | Integración Sistema REAL",
        period: "Julio 2025 - Actualidad",
        points: [
          "Desarrollé una API completa con FastAPI para la integración del sistema REAL (middleware VITEK) con el CRM de bacteriología, automatizando el procesamiento de resultados de cultivos que anteriormente se ingresaban manualmente.",
          "Implementé modelos de datos con SQLModel ORM para gestionar catálogos de bacterias (7,429 microorganismos), antibióticos (278 registros) y tipos de muestra, estableciendo relaciones complejas entre encabezados y detalles de antibiogramas.",
          "Diseñé endpoints RESTful para CRUD de resultados bacteriológicos, validación de cultivos y gestión de catálogos, con documentación automática en Swagger y manejo robusto de errores.",
          "Desarrollé servicios de negocio para mapeo entre códigos REAL y Analiza, conversión de protocolos ASTM/HL7, y validación de estados de tubos y pruebas en el flujo de trabajo completo.",
          "Configuré integración con PostgreSQL usando triggers para sincronización automática de estados entre tablas core_tuboprueba y core_ordentubos al validar resultados.",
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
        ],
      },
      {
        role: "Software Engineer | Modernización Sistema de Impresión",
        period: "Mayo 2025 - Julio 2025",
        points: [
          "Actualicé y refactoricé el servicio de impresión del laboratorio para compatibilidad con Windows 11, identificando incompatibilidades al integrar nuevas máquinas y corrigiendo problemas de rendering en facturas y códigos de barras.",
          "Implementé detección automática de modelos de impresoras (TSC, 3nStar, Zebra) y configuración dinámica de márgenes y posicionamiento, eliminando errores de formato en etiquetas de muestras médicas.",
          "Desarrollé conversores bidireccionales entre protocolos ESC/POS y TSPL para compatibilidad universal con impresoras térmicas y de etiquetas, soportando códigos de barras CODE39, EAN13 y comandos de formato.",
          "Configuré servidores WebSocket dual-port (9000/9001) con threading para alta disponibilidad, solucionando conflictos de puerto tras actualizaciones del sistema operativo.",
          "Corregí problemas de encoding donde algunas facturas mostraban HTML sin procesar, implementando limpieza UTF-8 y validación robusta de contenido antes del envío a impresoras.",
          "Mejoré el manejo de errores con try-catch exhaustivos y logging detallado, garantizando estabilidad del servicio ante fallos de hardware o conexión.",
        ],
        technologies: [
          "Python",
          "WebSocket",
          "win32print API",
          "Protocolos ESC/POS",
          "Protocolos TSPL",
          "Threading",
          "Windows Services",
          "Hardware Integration",
        ],
      },
      {
        role: "Backend Developer | Sistema de Comisiones",
        period: "Marzo 2025 - Mayo 2025",
        points: [
          "Implementé un sistema de comisiones para médicos referentes que automatiza el cálculo y registro del 10% sobre servicios de laboratorio referidos, mejorando la fidelización de profesionales externos.",
          "Desarrollé validaciones robustas para prevenir comisiones duplicadas y garantizar la integridad de datos en transacciones financieras.",
          "Optimicé la estructura de datos mediante SQL directo para actualizar correctamente totales de facturación, mejorando la precisión de reportes financieros.",
          "Refactoricé controladores existentes aplicando principios de código limpio y abstracción para mejorar la mantenibilidad.",
          "Hice un diagrama de flujo de las etiquetas del código de barras para entender el proceso y la lógica de negocio del sistema.",
          "Desarrollé un endpoint para automatizar el reabastecimiento de inventario entre sucursales, implementando lógica de negocio para optimizar solicitudes basadas en puntos de reorden y disponibilidad real.",
        ],
        technologies: [
          "Node.js",
          "TypeScript",
          "Express",
          "Sequelize ORM",
          "PostgreSQL",
          "Transacciones SQL",
          "Postman",
        ],
      },
    ],
    icon: "/icon/empresas/analiza.png",
    iconBg: "#383E56",
    date: "Marzo 2025 - Actualidad",
  },
  {
    title: "Practicante Ingeniería de Sistemas",
    company: "GuabaBIT",
    positions: [
      {
        role: "QA & Backend Developer | LUQA",
        period: "Octubre 2024 - Marzo 2025",
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
        period: "Octubre 2024 - Marzo 2025",
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
    date: "Octubre 2024 - Marzo 2025",
  },
  // { Agregar el proximo trabajo }
];
