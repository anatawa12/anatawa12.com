const assert = require("node:assert/strict");
const test = require("node:test");
const interpolate = require("../src/utils/interpolate");

test("inserts trusted HTML at named placeholders in any order", () => {
  const links = {
    GitHub: '<a href="/github">GitHub</a>',
    MITLicense: '<a href="/license">MIT License</a>',
  };

  assert.equal(
    interpolate("also on {GitHub}; licensed under {MITLicense}.", links),
    'also on <a href="/github">GitHub</a>; licensed under <a href="/license">MIT License</a>.',
  );
  assert.equal(
    interpolate("{MITLicense} and {GitHub}", links),
    '<a href="/license">MIT License</a> and <a href="/github">GitHub</a>',
  );
});

test("supports repeated placeholders", () => {
  const link = '<a href="/github">GitHub</a>';
  assert.equal(interpolate("{GitHub} and {GitHub}", { GitHub: link }), `${link} and ${link}`);
});

test("escapes text while preserving replacement HTML", () => {
  assert.equal(
    interpolate('<script>"&\'</script> {link}', { link: "<a>trusted</a>" }),
    "&lt;script&gt;&quot;&amp;&#39;&lt;/script&gt; <a>trusted</a>",
  );
});

test("rejects unknown, malformed, and invalid placeholders", () => {
  assert.throws(() => interpolate("{Unknown}", {}), /No replacement provided/);
  assert.throws(() => interpolate("{GitHub", { GitHub: "<a>GitHub</a>" }), /Malformed placeholder/);
  assert.throws(() => interpolate("{bad name}", {}), /Invalid placeholder/);
});

test("validates template, replacements, and HTML values", () => {
  assert.throws(() => interpolate(null, {}), /template must be a string/);
  assert.throws(() => interpolate("{GitHub}", null), /replacements must be an object/);
  assert.throws(() => interpolate("{GitHub}", { GitHub: 1 }), /must be an HTML string/);
});
