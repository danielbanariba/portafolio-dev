export interface Skill {
  name: string;
  icon: string;
  category:
    | "Backend"
    | "Frameworks"
    // | "Librerias"
    | "Gestores de Bases de Datos"
    | "Infraestructura"
    | "QA & Testing";
}

export const skills: Skill[] = [
  //---------------------------------------------Backend---------------------------------------------
  { name: "Python", icon: "/icon/python.svg", category: "Backend" },
  { name: "Java", icon: "/icon/java.svg", category: "Backend" },
  { name: "C++", icon: "/icon/cpp.svg", category: "Backend" },
  { name: "Typescript", icon: "/icon/typescript.svg", category: "Backend" },

  //---------------------------------------------Frameworks-------------------------------------------
  { name: "Astro", icon: "/icon/astro.svg", category: "Frameworks" },
  { name: "Reflex", icon: "/icon/reflex.svg", category: "Frameworks" },
  { name: "FastAPI", icon: "/icon/fastapi.svg", category: "Frameworks" },
  // { name: "Spring", icon: "/icon/spring.svg", category: "Frameworks" },
  { name: "NestJS", icon: "/icon/nestjs.svg", category: "Frameworks" },

  //---------------------------------------------Librerias---------------------------
  // { name: 'React', icon: '/icon/react.svg', category: 'Librerias' },
  // { name: 'redux', icon: '/icon/redux.svg', category: 'Librerias' },

  //---------------------------------------------Gestores de Bases de Datos---------------------------
  { name: 'Oracle', icon: '/icon/oracle.svg', category: 'Gestores de Bases de Datos' },
  // { name: 'MySQL', icon: '/icon/mysql.svg', category: 'Gestores de Bases de Datos' },
  { name: 'PostgreSQL', icon: '/icon/postgresql.svg', category: 'Gestores de Bases de Datos' },
  { name: 'MongoDB', icon: '/icon/mongodb.svg', category: 'Gestores de Bases de Datos' },
  // { name: 'SQLite', icon: '/icon/sqlite.svg', category: 'Gestores de Bases de Datos' },
  { name: 'DynamoDB', icon: '/icon/aws-dynamodb.svg', category: 'Gestores de Bases de Datos' },

  //---------------------------------------------Infraestructura---------------------------------
  { name: "Azure", icon: "/icon/azure.svg", category: "Infraestructura" },
  { name: "AWS", icon: "/icon/aws.svg", category: "Infraestructura" },
  { name: "Terraform", icon: "/icon/terraform.svg", category: "Infraestructura"},
  { name: "Docker", icon: "/icon/docker.svg", category: "Infraestructura" },

  //---------------------------------------------QA & Testing---------------------------------
  // { name: "Jest", icon: "/icon/jest.svg", category: "QA & Testing" },
  { name: "Selenium", icon: "/icon/selenium.svg", category: "QA & Testing" },
  { name: "Jira", icon: "/icon/jira.svg", category: "QA & Testing" },
  // { name: "Postman", icon: "/icon/postman.svg", category: "QA & Testing" },
  { name: "ApiDog", icon: "/icon/apidog.svg", category: "QA & Testing" },
  { name: "Playwright", icon: "/icon/playwright.svg", category: "QA & Testing" },
];
