export interface Position {
  role: string;
  period?: string;
  points: string[];
}

export interface Experience {
  title: string;
  company: string;
  positions: Position[];
  icon: string;
  iconBg: string;
  date: string;
}

export const experiences: Experience[] = [
  {
    title: "Practicante Ingeniería de Sistemas",
    company: "GuabaBIT",
    positions: [
      {
        role: "QA Tester & Backend Developer | LUQA",
        period: "Octubre 2024 - Marzo 2025",
        points: [
          "Diseñé e implementé la arquitectura completa de un sistema de pagos comunitarios con servicios RESTful, implementando bases de datos NoSQL (DynamoDB) y servicios de AWS (S3, SNS)",
          "Desarrollé la funcionalidad 'Announcement' para notificaciones en tiempo real y gestión de anuncios, incluyendo la creación de endpoints, modelos y servicios de backend. Lo que permitió a los usuarios recibir alertas instantáneas sobre actualizaciones relevantes en la comunidad.",
          "Elaboré un documento tecnico exhaustivo donde incluye diagramas de arquitectura, modelos de datos, definiciones de API RESTful y flujos de trabajo, para facilitar la comprensión y mantenimiento del sistema",
          "Realicé pruebas de API utilizando Postman y Apidog para asegurar la funcionalidad, creando colecciones y scripts de pruebas automatizadas.",
          "Reporté bugs detallados en los endpoints que consideraban críticos, creando reproducciones precisas en Postman y ApiDog.",
          "Documenté APIs utilizando Swagger y creé documentación detallada de las pruebas en Apidog para facilitar el mantenimiento y escalabilidad",
        ],
      },
      {
        role: "QA Tester | Choyc",
        period: "Octubre 2024 - Marzo 2025",
        points: [
          "Implementé pruebas automatizadas end-to-end con Playwright para flujos críticos (login, formularios, gestión de cotizaciones, handshake), aumentando la cobertura de pruebas en un 85% y reduciendo el tiempo de detección de errores",
          "Creé y ejecuté test cases manuales en Jira para verificar la integridad del sistema, reportando y documentando bugs críticos.",
          "Gestioné historias de usuario (user stories) en Jira, poniendo criterios de aceptacion y una descripcion detalladas, lo que contribuyó a entregas incrementales exitosas en cada sprint",
        ],
      },
    ],
    icon: "/icon/empresas/guaba-bit.png",
    iconBg: "#383E56",
    date: "Octubre 2024 - Marzo 2025",
  },
  // { Agregar el proximo trabajo }
];
