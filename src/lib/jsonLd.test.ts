import { describe, it, expect } from "vitest";
import { serializeJsonLd } from "./jsonLd";

const LINE_SEPARATOR = String.fromCharCode(0x2028);
const PARAGRAPH_SEPARATOR = String.fromCharCode(0x2029);

describe("serializeJsonLd", () => {
  it("escapes a closing script tag so it cannot terminate the host block", () => {
    const result = serializeJsonLd({
      name: "</script><img src=x onerror=alert(1)>",
    });

    expect(result).not.toContain("</script");
    expect(result).not.toContain("<img");
  });

  it("stays valid JSON that parses back to the original value", () => {
    const input = { name: "</script>", description: "a < b && c > d" };

    expect(JSON.parse(serializeJsonLd(input))).toEqual(input);
  });

  it("escapes the line and paragraph separators", () => {
    const bio = `soft${LINE_SEPARATOR}break${PARAGRAPH_SEPARATOR}here`;
    const result = serializeJsonLd({ bio });

    expect(result).not.toContain(LINE_SEPARATOR);
    expect(result).not.toContain(PARAGRAPH_SEPARATOR);
    expect(JSON.parse(result).bio).toBe(bio);
  });

  it("leaves ordinary content byte-identical to JSON.stringify", () => {
    const input = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Daniel Banariba",
      knowsAbout: ["Dagster", "dbt", "Rust"],
    };

    expect(serializeJsonLd(input)).toBe(JSON.stringify(input));
  });

  it("escapes every occurrence, not just the first", () => {
    const input = { a: "</script>", b: "</script>" };
    const result = serializeJsonLd(input);

    expect(result).not.toContain("</script");
    expect(JSON.parse(result)).toEqual(input);
  });
});
