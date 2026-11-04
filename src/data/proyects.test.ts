import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { projects } from "./proyects";

const publicDir = join(process.cwd(), "public");
const withImage = projects.filter((project) => project.imageUrl);

describe.each(withImage.map((project) => [project.title, project.imageUrl]))(
  "%s",
  (_title, imageUrl) => {
    // A relative URL resolves against the current page, so "project/x.png"
    // works on / but 404s on /navidrome/. Root-relative URLs work everywhere.
    it("uses a root-relative image URL", () => {
      expect(imageUrl).toMatch(/^\/[^/]/);
    });

    it("points at a file that exists in public/", () => {
      expect(existsSync(join(publicDir, decodeURIComponent(String(imageUrl))))).toBe(true);
    });
  },
);
