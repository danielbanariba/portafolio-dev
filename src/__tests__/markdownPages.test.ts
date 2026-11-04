import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { imageMetadata } from "astro/assets/utils";
import { describe, expect, it } from "vitest";

const pagesDir = join(process.cwd(), "src/pages");
const publicDir = join(process.cwd(), "public");
const markdownPages = readdirSync(pagesDir).filter((file) => file.endsWith(".md"));

describe.each(markdownPages)("%s", (file) => {
  const source = readFileSync(join(pagesDir, file), "utf8");

  it("gives every embedded iframe an accessible name", () => {
    const iframes = source.match(/<iframe\b[^>]*>/g) ?? [];

    for (const iframe of iframes) {
      expect(iframe).toMatch(/\btitle="[^"]+"/);
    }
  });

  // Markdown images are sized by the markdownImageAttributes plugin, but
  // Sätteri passes raw HTML through, so an <img> written as HTML must carry
  // its own size, and that size must be the file's real one or the box the
  // browser reserves is wrong.
  it("sizes raw HTML images to their real dimensions and lazy-loads them", async () => {
    const images = source.match(/<img\b[^>]*>/g) ?? [];

    for (const image of images) {
      const attribute = (name: string) => image.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
      const src = attribute("src") ?? "";
      const { width, height } = await imageMetadata(readFileSync(join(publicDir, src)), src);

      expect({ src, width: attribute("width"), height: attribute("height") }).toEqual({
        src,
        width: String(width),
        height: String(height),
      });
      expect(image).toContain('loading="lazy"');
    }
  });
});
