import { readFileSync } from "node:fs";
import { join } from "node:path";
import { runInNewContext } from "node:vm";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import Footer from "../Footer.astro";

// Runs the real <script> from Footer.astro against a minimal fake DOM.
const source = readFileSync(join(process.cwd(), "src/components/Footer.astro"), "utf8");
const script = source.match(/<script>([\s\S]*?)<\/script>/)?.[1] ?? "";

type Listener = () => void;

const fakeElement = (textContent = "") => {
  const listeners: Record<string, Listener[]> = {};
  const children: Record<string, ReturnType<typeof fakeElement>> = {};
  const element = {
    textContent,
    addEventListener(type: string, listener: Listener) {
      (listeners[type] ??= []).push(listener);
    },
    dispatch(type: string) {
      for (const listener of listeners[type] ?? []) listener();
    },
    querySelector(selector: string) {
      return (children[selector] ??= fakeElement(selector === ".text" ? "COPY" : ""));
    },
  };
  return element;
};

const clickCopy = async () => {
  const elements: Record<string, ReturnType<typeof fakeElement>> = {};
  const document = {
    ...fakeElement(),
    getElementById: (id: string) => (elements[id] ??= fakeElement()),
  };
  runInNewContext(script, {
    document,
    navigator: { clipboard: { writeText: () => Promise.resolve() } },
    setTimeout: () => 0, // keep the confirmation on screen
    console,
  });
  document.dispatch("DOMContentLoaded");
  const button = document.getElementById("copyButton");
  button.dispatch("click");
  await new Promise((resolve) => setImmediate(resolve));
  return { elements, shown: button.querySelector(".text").textContent };
};

describe("Footer copy-email button", () => {
  // WCAG 4.1.3 Status Messages: the visual "copied" confirmation must also
  // reach screen readers, through a live region, without moving focus.
  it("announces the confirmation it shows through a live region", async () => {
    const container = await AstroContainer.create();
    const markup = await container.renderToString(Footer);
    const liveRegionIds = [...markup.matchAll(/<[^>]*\b(?:role="status"|aria-live="(?:polite|assertive)")[^>]*>/g)]
      .map((m) => m[0].match(/\bid="([^"]+)"/)?.[1])
      .filter((id): id is string => Boolean(id));

    const { elements, shown } = await clickCopy();
    const announced = liveRegionIds.map((id) => elements[id]?.textContent ?? "");

    expect(shown).not.toBe("COPY");
    expect(liveRegionIds.length).toBeGreaterThan(0);
    expect(announced).toContain(shown);
  });
});
