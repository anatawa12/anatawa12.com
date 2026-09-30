function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => {
    switch (character) {
      case "&": return "&amp;";
      case "<": return "&lt;";
      case ">": return "&gt;";
      case '"': return "&quot;";
      case "'": return "&#39;";
    }
  });
}

function assertNoStrayClosingBrace(value) {
  if (value.includes("}")) {
    throw new Error("Malformed placeholder in template");
  }
}

/**
 * Interpolates `{name}` placeholders, escaping literal text and inserting mapped HTML.
 * Replacement values are emitted unescaped and must only contain trusted HTML.
 *
 * @param {string} template Text containing `{Name}` placeholders whose names start with a letter and contain only letters, digits, or underscores; unmatched or malformed braces throw.
 * @param {Record<string, string>} replacements Map of placeholder names to trusted HTML strings.
 * @returns {string} HTML with escaped text and inserted replacement markup.
 * @throws {TypeError|Error} When arguments are invalid or a placeholder is malformed or unknown.
 */
function interpolate(template, replacements) {
  if (typeof template !== "string") {
    throw new TypeError("template must be a string");
  }
  if (replacements === null || typeof replacements !== "object" || Array.isArray(replacements)) {
    throw new TypeError("replacements must be an object");
  }

  let result = "";
  let position = 0;

  while (position < template.length) {
    const open = template.indexOf("{", position);

    if (open === -1) {
      const text = template.slice(position);
      assertNoStrayClosingBrace(text);
      result += escapeHtml(text);
      break;
    }
    const text = template.slice(position, open);
    assertNoStrayClosingBrace(text);
    result += escapeHtml(text);

    const end = template.indexOf("}", open + 1);
    const nested = template.indexOf("{", open + 1);
    if (end === -1 || (nested !== -1 && nested < end)) {
      throw new Error("Malformed placeholder in template");
    }

    const name = template.slice(open + 1, end);
    if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(name)) {
      throw new Error(`Invalid placeholder: {${name}}`);
    }
    if (!Object.hasOwn(replacements, name)) {
      throw new Error(`No replacement provided for placeholder: {${name}}`);
    }
    if (typeof replacements[name] !== "string") {
      throw new TypeError(`Replacement for ${name} must be an HTML string`);
    }

    // Replacement values are trusted HTML; keep them out of locale data.
    result += replacements[name];
    position = end + 1;
  }

  return result;
}

module.exports = interpolate;
