/**
 * Sätteri hast plugin for the markdown case-study pages.
 *
 * Their screenshots and diagrams live in public/, so Astro does not process
 * them and they reach the browser with no width or height: the text under
 * each one jumps as it loads, and every image downloads up front.
 *
 * For each local image this reads the real size from the file and sets
 * width/height (Tailwind's preflight keeps `height: auto`, so the rendered
 * size is unchanged; the browser only reserves the box). Every image after
 * the first gets loading="lazy"; the first stays eager because it is usually
 * the hero near the top of the page. Values written by hand are kept.
 *
 * Sätteri only visits images written as Markdown; raw HTML <img> tags in a
 * page are passed through untouched.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { imageMetadata } from "astro/assets/utils";

interface Options {
  /** Absolute path of the folder that root-relative image URLs resolve to. */
  publicDir: string;
}

interface ImageNode {
  properties?: Record<string, unknown>;
}

interface VisitContext {
  setProperty(node: ImageNode, key: string, value: unknown): void;
}

type Size = { width: number; height: number };

const isLocal = (src: unknown): src is string =>
  typeof src === "string" && src.startsWith("/") && !src.startsWith("//");

// Astro's probe gives up on draw.io exports, whose root <svg> tag carries the
// whole diagram source in a `content` attribute. Read the root tag directly,
// accepting only unitless or px lengths (the ones that set the intrinsic size).
const svgSize = (data: Buffer): Size | undefined => {
  const root = data.toString("utf8").match(/<svg\b[^>]*>/)?.[0] ?? "";
  const length = (name: string) =>
    Number(root.match(new RegExp(`\\s${name}="([\\d.]+)(?:px)?"`))?.[1]);
  const width = length("width");
  const height = length("height");
  return width > 0 && height > 0 ? { width, height } : undefined;
};

async function readSize(publicDir: string, src: string): Promise<Size | undefined> {
  const file = join(publicDir, decodeURIComponent(src.split(/[?#]/)[0]));
  if (!existsSync(file)) return undefined;
  const data = readFileSync(file);
  let size: Size | undefined;
  try {
    size = await imageMetadata(data, src);
  } catch {
    size = file.endsWith(".svg") ? svgSize(data) : undefined;
  }
  return size && { width: Math.round(size.width), height: Math.round(size.height) };
}

/** Returns a plugin factory, so the "first image" count resets on every page. */
export const markdownImageAttributes =
  ({ publicDir }: Options) =>
  () => {
    let seen = 0;
    return {
      name: "image-attributes",
      element: {
        filter: ["img"],
        async visit(node: ImageNode, ctx: VisitContext) {
          const properties = node.properties ?? {};
          const isFirst = seen++ === 0;

          if (properties.decoding == null) ctx.setProperty(node, "decoding", "async");
          if (!isFirst && properties.loading == null) {
            ctx.setProperty(node, "loading", "lazy");
          }

          const { src } = properties;
          if (!isLocal(src) || properties.width != null || properties.height != null) {
            return;
          }
          const size = await readSize(publicDir, src);
          if (size) {
            ctx.setProperty(node, "width", size.width);
            ctx.setProperty(node, "height", size.height);
          }
        },
      },
    };
  };
