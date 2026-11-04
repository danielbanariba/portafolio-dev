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

  // A repeated id makes getElementById, label[for] and aria-* references
  // resolve to whichever element comes first.
  it("never repeats an id", () => {
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
    const repeated = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];

    expect(repeated).toEqual([]);
  });

  // WCAG 2.5.3 Label in Name: a voice-control user says what they see, so an
  // aria-label must contain the control's visible text.
  it("keeps each control's visible text inside its aria-label", () => {
    const controls = [...html.matchAll(/<(a|button)\b([^>]*)>([\s\S]*?)<\/\1>/g)];
    const mismatches = controls
      .map(([, , attributes, inner]) => ({
        label: attributes.match(/\baria-label="([^"]*)"/)?.[1],
        visible: inner.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
      }))
      .filter(({ label, visible }) => label !== undefined && visible !== "")
      .filter(({ label, visible }) => !label!.toLowerCase().includes(visible.toLowerCase()));

    expect(mismatches).toEqual([]);
  });
});
