import { describe, expect, it } from "vitest";
import { site } from "../data/site";
import { GET } from "../pages/sitemap.xml";

const body = async () => {
  const response = await GET({} as Parameters<typeof GET>[0]);
  return response.text();
};

describe("/sitemap.xml", () => {
  // A sitemap index may only list sitemaps (<urlset> files). Listing
  // /sitemap-index.xml, itself an index, is a nested index that crawlers
  // ignore. @astrojs/sitemap writes the URLs to sitemap-0.xml.
  it("points at the urlset file, not at another sitemap index", async () => {
    const xml = await body();
    const locs = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);

    expect(locs).toEqual([`${site.url}/sitemap-0.xml`]);
  });

  it("is a sitemap index document", async () => {
    expect(await body()).toContain(
      '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    );
  });
});
