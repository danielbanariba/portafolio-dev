export interface Skill {
  name: string;
  icon: string;
  category:
    | "Backend"
    | "IA & Automatización con IA"
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
  {
    name: "TypeScript",
    icon: "/icon/skills/typescript.svg",
    category: "Backend",
  },
  { name: "Java", icon: "/icon/skills/java.svg", category: "Backend" },
  { name: "C++", icon: "/icon/skills/cpp.svg", category: "Backend" },

  //---------------------------------------------IA & Automatización con IA-------------------------
  {
    name: "Claude Code",
    icon: "/icon/skills/claude.svg",
    category: "IA & Automatización con IA",
  },
  {
    name: "Codex CLI",
    icon: "/icon/skills/codex.svg",
    category: "IA & Automatización con IA",
  },
  {
    name: "OpenCode",
    icon: "/icon/skills/open-code.svg",
    category: "IA & Automatización con IA",
  },
  {
    name: "MCP",
    icon: "/icon/skills/mcp.svg",
    category: "IA & Automatización con IA",
  },

  //---------------------------------------------Frameworks-------------------------------------------
  { name: "Astro", icon: "/icon/skills/astro.svg", category: "Frameworks" },
  { name: "Reflex", icon: "/icon/skills/reflex.svg", category: "Frameworks" },
  { name: "FastAPI", icon: "/icon/skills/fastapi.svg", category: "Frameworks" },
  { name: "NestJS", icon: "/icon/skills/nestjs.svg", category: "Frameworks" },
  { name: "GraphQL", icon: "/icon/skills/graphql.svg", category: "Frameworks" },

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

  //---------------------------------------------Infraestructura---------------------------------
  {
    name: "Azure",
    icon: "/icon/skills/azure.svg",
    category: "Infraestructura",
  },
  { name: "AWS", icon: "/icon/skills/aws.svg", category: "Infraestructura" },
  {
    name: "Docker",
    icon: "/icon/skills/docker.svg",
    category: "Infraestructura",
  },
  {
    name: "Terraform",
    icon: "/icon/skills/terraform.svg",
    category: "Infraestructura",
  },
  {
    name: "GitHub Actions",
    icon: "/icon/skills/github-actions.svg",
    category: "Infraestructura",
  },

  //---------------------------------------------QA & Testing---------------------------------
  {
    name: "Selenium",
    icon: "/icon/skills/selenium.svg",
    category: "QA & Testing",
  },
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
  {
    name: "Pytest",
    icon: "/icon/skills/pytest.svg",
    category: "QA & Testing",
  },

  //---------------------------------------------Datos/Analytics---------------------------------
  {
    name: "Dagster",
    icon: "/icon/skills/dagster.svg",
    category: "Datos/Analytics",
  },
  {
    name: "Polars",
    icon: "/icon/skills/polars.svg",
    category: "Datos/Analytics",
  },
  {
    name: "Power BI",
    icon: "/icon/skills/power-bi.svg",
    category: "Datos/Analytics",
  },
];
