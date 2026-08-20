/**
 * Serializes a value for embedding inside a `<script type="application/ld+json">`
 * block.
 *
 * `JSON.stringify` alone is not safe here: it does not escape `</script`, so any
 * string carrying that sequence would close the host tag early and let the rest
 * of the payload be parsed as markup. U+2028 and U+2029 are legal in JSON but
 * not in JavaScript string literals, so they are escaped too.
 *
 * Every replacement targets a character that `JSON.stringify` can only emit
 * inside a string - never in the structural syntax - so the escaped form still
 * parses back to the original value.
 */
const HTML_UNSAFE = /[<>&\u2028\u2029]/g;

const ESCAPES: Record<string, string> = {
  "<": "\\u003c",
  ">": "\\u003e",
  "&": "\\u0026",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029",
};

export function serializeJsonLd(value: unknown): string {
  const json = JSON.stringify(value);

  // JSON.stringify returns the primitive undefined - not a string - for
  // undefined, functions and symbols, which would make the call below throw an
  // opaque "cannot read properties of undefined". Fail loudly instead: an
  // unserializable value means the page would ship a broken or missing
  // JSON-LD block, and a failed build is better than silent invisibility.
  if (json === undefined) {
    throw new TypeError(
      `serializeJsonLd: JSON.stringify cannot represent a value of type ${typeof value}`,
    );
  }

  return json.replace(HTML_UNSAFE, (char) => ESCAPES[char]);
}
