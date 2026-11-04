import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const pagesDir = join(process.cwd(), "src/pages");
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
  // its own size and loading hint.
  it("sizes and lazy-loads every image written as raw HTML", () => {
    const images = source.match(/<img\b[^>]*>/g) ?? [];

    for (const image of images) {
      expect(image).toMatch(/\bwidth="\d+"/);
      expect(image).toMatch(/\bheight="\d+"/);
      expect(image).toContain('loading="lazy"');
    }
  });
});
