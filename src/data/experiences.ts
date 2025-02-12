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
        period: "Octubre 2024 - Actualmente",
        points: [
          "Realicé pruebas de API utilizando Postman para asegurar la funcionalidad y rendimiento, creando colecciones y scripts de pruebas automatizadas.",
          "Desarrollé end-to-end un módulo de anuncios para la plataforma, incluyendo el desarrollo de la API REST en NestJS y DynamoDB",
          "Diseñé e implementé una suite completa de pruebas de API utilizando Postman, cubriendo escenarios positivos y negativos para cada endpoint",
          "Realicé pruebas exhaustivas de integración para módulos críticos como autenticación, gestión de inquilinos y reservas de áreas",
          "Implementé pruebas automatizadas detalladas para validar la lógica de negocio, manejo de errores y casos límite en cada funcionalidad",
          "Documenté APIs utilizando Swagger y creé documentación detallada de las pruebas para facilitar el mantenimiento y escalabilidad"
        ],
      },
      {
        role: "QA Tester | Choyc",
        period: "Octubre 2024 - Actualmente",
        points: [
          "Implementé test cases para garantizar la funcionalidad y confiabilidad del software usando Jira",
          "Reporté bugs y mejoras en la plataforma",
          "Cree historias de usuario para mejorar la experiencia del usuario",
          "Desarrollé e implementé pruebas automatizadas end-to-end utilizando Playwright para funcionalidades críticas como login, gestión de cotizaciones y flujos de handshake",
          "Diseñé y ejecuté casos de prueba para validar la interfaz de usuario, flujos de navegación y manejo de estados",
          "Desarrollé pruebas automatizadas para formularios, modales y tablas asegurando la integridad de los datos y la experiencia del usuario",
          "Implementé mejores prácticas de testing incluyendo page objects, fixtures y utils para mantener un código de pruebas limpio y mantenible"
        ],
      },
    ],
    icon: "/icon/empresas/guaba-bit.png",
    iconBg: "#383E56",
    date: "Octubre 2024 - Actualmente",
  },
];
