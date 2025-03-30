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
    title: "Desarrollador de software", // orientado a probador y automatizacion de sistemas
    company: "Analiza",
    positions: [
      {
        role: "Backend Developer", //  | El nombre del proyecto
        period: "Marzo 2025 - Actualidad",
        points: [
          "Hice un diagrama de flujo de las estiquetas del codigo de barras para entender el proceso y la logica de negocio del sistema.",
          "Desarrollé un endpoint para automatizar el reabastecimiento de inventario entre sucursales, implementando lógica de negocio para optimizar solicitudes basadas en puntos de reorden y disponibilidad real.",
        ],
        technologies: [
          "Node.js",
          "TypeScript",
          "Express",
          "PostgreSQL",
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
