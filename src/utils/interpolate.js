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

  const placeholderPattern = /\{([^{}]*)\}/g;
  let result = "";
  let position = 0;

  for (const match of template.matchAll(placeholderPattern)) {
    const [placeholder, name] = match;
    const text = template.slice(position, match.index);

    if (/[{}]/.test(text)) {
      throw new Error("Malformed placeholder in template");
    }
    if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(name)) {
      throw new Error(`Invalid placeholder: ${placeholder}`);
    }
    if (!Object.hasOwn(replacements, name)) {
      throw new Error(`No replacement provided for placeholder: ${name}`);
    }
    if (typeof replacements[name] !== "string") {
      throw new TypeError(`Replacement for ${name} must be an HTML string`);
    }

    result += escapeHtml(text) + replacements[name];
    position = match.index + placeholder.length;
  }

  const remainingText = template.slice(position);
  if (/[{}]/.test(remainingText)) {
    throw new Error("Malformed placeholder in template");
  }

  return result + escapeHtml(remainingText);
}

module.exports = interpolate;
