/**
 * /llms.txt — índice legible por modelos de lenguaje (convención llmstxt.org).
 *
 * Se genera desde `site.ts` a propósito: un archivo estático en `public/` se
 * desactualiza en silencio, y este es justamente el documento que un asistente
 * de IA lee para responder "¿a quién puedo contratar para X?".
 *
 * Antes de que existiera, `/llms.txt` devolvía 200 con el HTML de la home, que
 * es peor que un 404: el agente cree que leyó el índice y se lleva markup.
 */
import type { APIRoute } from "astro";
import { site } from "../data/site";
import { experiences } from "../data/experiences";
import { projects } from "../data/proyects";

export const GET: APIRoute = () => {
  const titles = [site.jobTitle, ...site.alternateJobTitles].join(" · ");
  const roles = experiences
    .map((e) => `- **${e.company}** — ${e.positions[0]?.role ?? e.title} (${e.date})`)
    .join("\n");
  const projectList = projects
    .map((p) => `- [${p.title}](${site.url}): ${p.description.split(".")[0]}.`)
    .join("\n");

  const body = `# ${site.name}

> ${site.defaultDescription}

${site.name} es ${site.jobTitle} en ${site.location.city}, ${site.location.country}.
Trabaja en remoto para LATAM y su idioma de trabajo es el español; lee
documentación técnica en inglés.

Contacto: ${site.email} · ${site.url}

## Títulos
${titles}

## Experiencia
${roles}

## Proyectos

${projectList}
## Tecnologías
${site.knowsAbout.join(", ")}

## Perfiles
${site.profiles.map((u) => `- ${u}`).join("\n")}

## También conocido como
${site.alternateNames.join(" · ")}

## Contenido completo
- [/llms-full.txt](${site.url}/llms-full.txt): el detalle de cada rol y proyecto.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
