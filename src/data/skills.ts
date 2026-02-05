export interface Skill {
  name: string;
  icon: string;
  category:
    | "Backend"
    | "Frameworks"
    // | "Librerias"
    | "Gestores de Bases de Datos"
    | "Infraestructura"
    | "QA & Testing"
    | "Datos/Analytics";
}

export const skills: Skill[] = [
  //---------------------------------------------Backend---------------------------------------------
  { name: "Python", icon: "/icon/skills/python.svg", category: "Backend" },
  { name: "Java", icon: "/icon/skills/java.svg", category: "Backend" },
  { name: "C++", icon: "/icon/skills/cpp.svg", category: "Backend" },
  {
    name: "Typescript",
    icon: "/icon/skills/typescript.svg",
    category: "Backend",
  },

  //---------------------------------------------Frameworks-------------------------------------------
  { name: "Astro", icon: "/icon/skills/astro.svg", category: "Frameworks" },
  { name: "Reflex", icon: "/icon/skills/reflex.svg", category: "Frameworks" },
  { name: "FastAPI", icon: "/icon/skills/fastapi.svg", category: "Frameworks" },
  // { name: "Spring", icon: "/icon/skills/spring.svg", category: "Frameworks" },
  { name: "NestJS", icon: "/icon/skills/nestjs.svg", category: "Frameworks" },

  //---------------------------------------------Librerias---------------------------
  // { name: 'React', icon: '/icon/skills/react.svg', category: 'Librerias' },
  // { name: 'redux', icon: '/icon/skills/redux.svg', category: 'Librerias' },

  //---------------------------------------------Gestores de Bases de Datos---------------------------
  {
    name: "Microsoft SQL Server",
    icon: "/icon/skills/sql-server.svg",
    category: "Gestores de Bases de Datos",
  },

  {
    name: "PostgreSQL",
    icon: "/icon/skills/postgresql.svg",
    category: "Gestores de Bases de Datos",
  },
  {
    name: "MongoDB",
    icon: "/icon/skills/mongodb.svg",
    category: "Gestores de Bases de Datos",
  },
  {
    name: "DynamoDB",
    icon: "/icon/skills/aws-dynamodb.svg",
    category: "Gestores de Bases de Datos",
  },
  // { name: 'SQLite', icon: '/icon/skills/sqlite.svg', category: 'Gestores de Bases de Datos' },
  // { name: 'MySQL', icon: '/icon/skills/mysql.svg', category: 'Gestores de Bases de Datos' },
  // {
  //   name: "Oracle",
  //   icon: "/icon/skills/oracle.svg",
  //   category: "Gestores de Bases de Datos",
  // },

  //---------------------------------------------Infraestructura---------------------------------
  {
    name: "Azure",
    icon: "/icon/skills/azure.svg",
    category: "Infraestructura",
  },
  { name: "AWS", icon: "/icon/skills/aws.svg", category: "Infraestructura" },
  {
    name: "Terraform",
    icon: "/icon/skills/terraform.svg",
    category: "Infraestructura",
  },
  {
    name: "Docker",
    icon: "/icon/skills/docker.svg",
    category: "Infraestructura",
  },

  //---------------------------------------------QA & Testing---------------------------------
  // { name: "Jest", icon: "/icon/skills/jest.svg", category: "QA & Testing" },
  {
    name: "Selenium",
    icon: "/icon/skills/selenium.svg",
    category: "QA & Testing",
  },
  { name: "Jira", icon: "/icon/skills/jira.svg", category: "QA & Testing" },
  // {
  //   name: "Postman",
  //   icon: "/icon/skills/postman.svg",
  //   category: "QA & Testing",
  // },
  {
    name: "ApiDog",
    icon: "/icon/skills/apidog.svg",
    category: "QA & Testing",
  },
  {
    name: "Playwright",
    icon: "/icon/skills/playwright.svg",
    category: "QA & Testing",
  },

  //---------------------------------------------Datos/Analytics---------------------------------
  {
    name: "Dagster",
    icon: "/icon/skills/dagster.svg",
    category: "Datos/Analytics",
  },
  {
    name: "Power BI",
    icon: "/icon/skills/power-bi.svg",
    category: "Datos/Analytics",
  },
];
