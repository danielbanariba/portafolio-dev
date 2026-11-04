import { readFileSync } from "node:fs";
import { join } from "node:path";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";

// Runs the real <script> from Project.astro against a minimal fake DOM.
const source = readFileSync(join(process.cwd(), "src/components/Project.astro"), "utf8");
const script = source.match(/<script>([\s\S]*?)<\/script>/)?.[1] ?? "";

type Listener = () => void;

const eventTarget = () => {
  const listeners: Record<string, Listener[]> = {};
  return {
    listeners,
    addEventListener(type: string, listener: Listener) {
      (listeners[type] ??= []).push(listener);
    },
    dispatch(type: string) {
      for (const listener of listeners[type] ?? []) listener();
    },
  };
};

const setup = () => {
  const button = { ...eventTarget(), style: {} as Record<string, string> };
  const removed: string[] = [];
  const hiddenProjects = {
    style: {} as Record<string, string>,
    classList: { remove: (name: string) => removed.push(name) },
  };
  const elements: Record<string, unknown> = { viewMoreBtn: button, hiddenProjects };
  const document = { ...eventTarget(), getElementById: (id: string) => elements[id] ?? null };
  const window = eventTarget();

  runInNewContext(script, {
    document,
    window,
    requestAnimationFrame: (callback: Listener) => callback(),
    setTimeout: (callback: Listener) => callback(),
  });
  document.dispatch("DOMContentLoaded");

  return { button, removed, window };
};

describe("Project 'Ver más proyectos' button", () => {
  it("binds its click handler once, however often the window is resized", () => {
    const { button, window } = setup();

    window.dispatch("resize");
    window.dispatch("resize");
    window.dispatch("resize");

    expect(button.listeners.click).toHaveLength(1);
  });

  it("reveals the hidden projects and hides itself when clicked", () => {
    const { button, removed } = setup();

    button.dispatch("click");

    expect(removed).toEqual(["hidden"]);
    expect(button.style.display).toBe("none");
  });
});
