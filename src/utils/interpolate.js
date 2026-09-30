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
    const close = template.indexOf("}", position);

    if (open === -1 && close === -1) {
      break;
    }
    if (open === -1 || (close !== -1 && close < open)) {
      throw new Error("Malformed placeholder in template");
    }
    result += escapeHtml(template.slice(position, open));

    const end = template.indexOf("}", open + 1);
    const nested = template.indexOf("{", open + 1);
    if (end === -1 || (nested !== -1 && nested < end)) {
      throw new Error("Malformed placeholder in template");
    }

    const name = template.slice(open + 1, end);
    if (name.length === 0) {
      throw new Error("Empty placeholder in template");
    }
    if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(name)) {
      throw new Error(`Invalid placeholder: {${name}}`);
    }
    if (!Object.hasOwn(replacements, name)) {
      throw new Error(`No replacement provided for placeholder: ${name}`);
    }
    if (typeof replacements[name] !== "string") {
      throw new TypeError(`Replacement for ${name} must be an HTML string`);
    }

    // Replacement values are trusted HTML; keep them out of locale data.
    result += replacements[name];
    position = end + 1;
  }

  const remainingText = template.slice(position);
  if (remainingText.includes("{") || remainingText.includes("}")) {
    throw new Error("Malformed placeholder in template");
  }

  return result + escapeHtml(remainingText);
}

module.exports = interpolate;
