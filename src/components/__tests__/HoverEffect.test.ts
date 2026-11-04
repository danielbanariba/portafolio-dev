import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import HoverEffect from "../HoverEffect";

const props = {
  title: "Sistema Contable",
  description: "Descripción",
  imageUrl: "/project/azure-app-service.png",
  technologies: ["Terraform"],
  documentacionUrl: "/sistema-contable",
  githubUrl: "https://github.com/danielbanariba/sistema-contable",
  projectUrl: "https://example.com",
};

const render = () => renderToStaticMarkup(createElement(HoverEffect, props));

const links = (html: string) => html.match(/<a\b[^>]*>/g) ?? [];

describe("HoverEffect", () => {
  it("gives every icon-only link an accessible name that names the project", () => {
    const anchors = links(render());

    expect(anchors).toHaveLength(3);
    for (const anchor of anchors) {
      expect(anchor).toMatch(/aria-label="[^"]*Sistema Contable[^"]*"/);
    }
  });

  it("tells each link apart by destination", () => {
    const labels = links(render()).map(
      (anchor) => anchor.match(/aria-label="([^"]*)"/)?.[1],
    );

    expect(new Set(labels).size).toBe(3);
  });

  it("hides the decorative icons from assistive technology", () => {
    const svgs = render().match(/<svg\b[^>]*>/g) ?? [];

    expect(svgs).toHaveLength(3);
    for (const svg of svgs) {
      expect(svg).toContain('aria-hidden="true"');
    }
  });

  it("titles the card one level below the section's h2", () => {
    const html = render();

    expect(html).toMatch(/<h3\b[^>]*>Sistema Contable<\/h3>/);
    expect(html).not.toMatch(/<h4\b/);
  });

  it("defers the screenshot, which sits far below the fold", () => {
    const img = render().match(/<img\b[^>]*>/)?.[0] ?? "";

    expect(img).toContain('loading="lazy"');
    expect(img).toContain('decoding="async"');
  });
});
