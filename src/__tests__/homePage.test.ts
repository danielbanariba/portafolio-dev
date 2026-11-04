import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { getContainerRenderer } from "@astrojs/react/container-renderer";
import { beforeAll, describe, expect, it } from "vitest";
import HomePage from "../pages/index.astro";

// Renders the real home page, React islands included, and checks properties
// of the whole document, so a regression in any section is caught no matter
// which component introduces it.
let html = "";

beforeAll(async () => {
  const renderers = await loadRenderers([getContainerRenderer()]);
  const container = await AstroContainer.create({ renderers });
  const rendered = await container.renderToString(HomePage);
  // Markup inside scripts and styles is not part of the document outline.
  html = rendered.replace(/<(script|style)\b[\s\S]*?<\/\1>/g, "");
});

describe("home page", () => {
  it("has exactly one main landmark", () => {
    const mains = html.match(/<main\b|\brole="main"/g) ?? [];

    expect(mains).toHaveLength(1);
  });

  it("starts the outline at h1 and never skips a heading level going down", () => {
    const levels = [...html.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
    const skips = levels
      .map((level, i) => [i === 0 ? 0 : levels[i - 1], level])
      .filter(([previous, level]) => level > previous + 1);

    expect(levels[0]).toBe(1);
    expect(skips).toEqual([]);
  });
});
