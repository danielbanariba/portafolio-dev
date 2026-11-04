import { join } from "node:path";
import { markdownToHtml } from "satteri";
import { describe, expect, it } from "vitest";
import { markdownImageAttributes } from "./markdownImageAttributes";

const publicDir = join(process.cwd(), "public");

// Run the plugin through the same Sätteri pipeline Astro uses for .md pages.
const render = async (markdown: string) => {
  const { html } = await markdownToHtml(markdown, {
    hastPlugins: [markdownImageAttributes({ publicDir })],
  });
  return html.match(/<img\b[^>]*>/g) ?? [];
};

describe("markdownImageAttributes", () => {
  it("sizes a raster image from its file in public/ so the page does not shift", async () => {
    const [banner] = await render("![b](/project/navidrome/banner.jpg)");

    expect(banner).toContain('width="1484"');
    expect(banner).toContain('height="614"');
  });

  it("sizes a draw.io SVG from the width and height on its root tag", async () => {
    const [diagram] = await render("![d](/project/sistema-contable/Vnet.drawio.svg)");

    expect(diagram).toContain('width="212"');
    expect(diagram).toContain('height="144"');
  });

  it("keeps the first image eager and lazy-loads the rest", async () => {
    const [first, second, third] = await render(
      [
        "![a](/project/navidrome/banner.jpg)",
        "![b](/project/navidrome/pr-5362-filter-menu.png)",
        "![c](/project/sistema-contable/Vnet.drawio.svg)",
      ].join("\n\n"),
    );

    expect(first).not.toContain("loading=");
    expect(second).toContain('loading="lazy"');
    expect(third).toContain('loading="lazy"');
    for (const image of [first, second, third]) {
      expect(image).toContain('decoding="async"');
    }
  });

  it("starts counting again on every page", async () => {
    await render("![a](/project/navidrome/banner.jpg)");
    const [first] = await render("![a](/project/navidrome/banner.jpg)");

    expect(first).not.toContain("loading=");
  });

  it("leaves remote and missing images unsized instead of failing the build", async () => {
    const [, remote, missing] = await render(
      [
        "![a](/project/navidrome/banner.jpg)",
        "![r](https://example.com/a.png)",
        "![m](/project/does-not-exist.png)",
      ].join("\n\n"),
    );

    expect(remote).not.toContain("width=");
    expect(missing).not.toContain("width=");
    expect(missing).toContain('loading="lazy"');
  });
});
