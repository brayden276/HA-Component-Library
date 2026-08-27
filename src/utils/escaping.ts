/**
 * Strict HTML escaping and string conversion primitives.
 */

export const toText = (value: unknown): string =>
  value == null ? "" : String(value);

export const escapeHtml = (value: unknown): string =>
  toText(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] || character,
  );
