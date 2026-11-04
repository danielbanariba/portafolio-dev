/**
 * /sitemap.xml — la ruta convencional que prueban los crawlers.
 *
 * @astrojs/sitemap publica el índice real en `/sitemap-index.xml`. Quien
 * probara `/sitemap.xml` recibía 200 con el HTML de la home, así que el
 * crawler parseaba markup como si fuera XML. Este endpoint devuelve un
 * sitemapindex válido que apunta al real.
 *
 * Apunta a `sitemap-0.xml` (el <urlset> con las URLs) y no a
 * `/sitemap-index.xml`: un índice que lista otro índice es un índice anidado,
 * y los crawlers no lo siguen.
 */
import type { APIRoute } from "astro";
import { site } from "../data/site";

export const GET: APIRoute = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${site.url}/sitemap-0.xml</loc>
  </sitemap>
</sitemapindex>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
