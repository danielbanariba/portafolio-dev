/**
 * Canonical site identity — single source of truth for SEO metadata,
 * Open Graph tags and the schema.org Person structured data.
 *
 * Search engines and AI assistants read these values literally, so keep them
 * explicit: role, country and stack should be stated as plain text, never
 * implied by design or images.
 */

export interface SiteConfig {
  /** Absolute origin, no trailing slash. Must match `site` in astro.config.mjs. */
  url: string;
  name: string;
  /** Primary job title, used in the default page title. */
  jobTitle: string;
  /** Secondary titles for schema.org — recruiters search by these terms. */
  alternateJobTitles: string[];
  defaultTitle: string;
  defaultDescription: string;
  /** Path relative to `url`, used for Open Graph / Twitter previews. */
  defaultImage: string;
  email: string;
  locale: string;
  location: {
    city: string;
    country: string;
    /** ISO 3166-1 alpha-2 country code. */
    countryCode: string;
  };
  /** Profiles the same person controls — feeds schema.org `sameAs`. */
  profiles: string[];
  /** Technologies stated explicitly — feeds schema.org `knowsAbout`. */
  knowsAbout: string[];
  /**
   * Current employer only. schema.org `worksFor` means present tense —
   * past employers belong in the Experience section, not here.
   */
  currentEmployer: string;
}

export const site: SiteConfig = {
  url: "https://www.danielbanariba.dev",
  name: "Daniel Banariba",
  // Primary title = positioning. The secondary list keeps the roles that are
  // also true and heavily searched, without diluting the headline.
  jobTitle: "Data Engineer",
  alternateJobTitles: [
    "AI Engineer",
    "Ingeniero de Software",
    "Software Engineer",
    "Backend Developer",
    "RPA Developer",
  ],
  // Both roles spelled out in full: "Data & AI Engineer" would not match an
  // exact search for "Data Engineer", the higher-volume of the two terms.
  defaultTitle: "Daniel Banariba — Data Engineer & AI Engineer en Honduras",
  defaultDescription:
    "Daniel Banariba, Data Engineer y AI Engineer en Tegucigalpa, Honduras. Construyo pipelines de datos con Dagster, dbt y SQL Server, y herramientas que permiten a la IA operar infraestructura en producción: 5 servidores MCP (Model Context Protocol), Agentic AI y Power BI as Code. Python, Rust, FastAPI y PostgreSQL.",
  defaultImage: "/img/banner.png",
  email: "danielbanariba@protonmail.com",
  locale: "es_HN",
  location: {
    city: "Tegucigalpa",
    country: "Honduras",
    countryCode: "HN",
  },
  profiles: [
    "https://github.com/danielbanariba",
    "https://www.linkedin.com/in/danielbanariba/",
  ],
  // Ordered by positioning: data and AI first, then the supporting stack.
  knowsAbout: [
    "Data Engineering",
    "Dagster",
    "dbt",
    "ETL",
    "Data Warehouse",
    "Microsoft SQL Server",
    "Polars",
    "Power BI",
    "Power BI as Code",
    "Data Quality",
    "Observabilidad",
    "AI Engineering",
    "Model Context Protocol (MCP)",
    "Agentic AI",
    "LLM",
    "Prompt Engineering",
    "Anthropic API",
    "Claude Code",
    "Automatización RPA",
    "Web Scraping",
    "Python",
    "Rust",
    "TypeScript",
    "Java",
    "SQL",
    "Backend Development",
    "FastAPI",
    "NestJS",
    "GraphQL",
    "Reflex",
    "Astro",
    "PostgreSQL",
    "MongoDB",
    "DynamoDB",
    "HashiCorp Vault",
    "Azure",
    "AWS",
    "Docker",
    "Terraform",
    "GitHub Actions",
    "Playwright",
    "Pytest",
    "Selenium",
    "Test-Driven Development (TDD)",
    "Spec-Driven Development (SDD)",
  ],
  currentEmployer: "Grupo Farinter",
};
