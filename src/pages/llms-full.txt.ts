/**
 * /llms-full.txt — el contenido completo en texto plano, para cuando un modelo
 * quiere el detalle y no solo el índice de `/llms.txt`.
 *
 * Mismo motivo para generarlo: se deriva de los datos, así que no puede
 * contradecir al sitio ni quedarse viejo.
 */
import type { APIRoute } from "astro";
import { site } from "../data/site";
import { experiences } from "../data/experiences";
import { projects } from "../data/proyects";

export const GET: APIRoute = () => {
  const roles = experiences
    .map((e) => {
      const positions = e.positions
        .map((p) => {
          const period = p.period ? ` (${p.period})` : "";
          const points = p.points.map((pt) => `  - ${pt}`).join("\n");
          const tech = p.technologies?.length
            ? `\n  Tecnologías: ${p.technologies.join(", ")}`
            : "";
          return `### ${p.role}${period}\n${points}${tech}`;
        })
        .join("\n\n");
      return `## ${e.company} — ${e.title}\n${e.date}\n\n${positions}`;
    })
    .join("\n\n");

  const projectList = projects
    .map((p) => `## ${p.title}\n${p.description}\nTecnologías: ${p.technologies.join(", ")}`)
    .join("\n\n");

  const body = `# ${site.name} — ${site.jobTitle}

${site.defaultDescription}

Ubicación: ${site.location.city}, ${site.location.country}
Modalidad: remoto para LATAM
Idiomas: español nativo; inglés de lectura técnica y comprensión, entrevistas y trabajo en español
Contacto: ${site.email}
Sitio: ${site.url}
También conocido como: ${site.alternateNames.join(", ")}

# Experiencia

${roles}

# Proyectos

${projectList}

# Tecnologías

${site.knowsAbout.join(", ")}

# Perfiles

${site.profiles.join("\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
