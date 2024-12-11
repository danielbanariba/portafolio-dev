// src/data/experiences.ts
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
        role: "Desarrollador Backend | LuQA",
        period: "Octubre 2024 - Actualmente",
        points: [
          "Desarrollé APIs utilizando el framework NestJS, siguiendo las mejores prácticas de desarrollo",
          "Gestioné la infraestructura en AWS",
          "Administré bases de datos NoSQL utilizando DynamoDB, diseñando esquemas eficientes",
          "Documenté el código y las APIs utilizando Swagger",
        ],
      },
      {
        role: "QA Tester | Choyc",
        period: "Octubre 2024 - Actualmente",
        points: [
          "Implementé test cases para garantizar la funcionalidad y confiabilidad del software usando Jira",
          "Reporté bugs y mejoras en la plataforma",
        ],
      },
    ],
    icon: "/icon/empresas/guaba-bit.png",
    iconBg: "#383E56",
    date: "Octubre 2024 - Actualmente",
  },
];
