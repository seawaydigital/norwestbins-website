const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");

const requiredLayoutRules = [
  "--page-gap: clamp(",
  "padding: var(--page-gap)",
  "max-width: none",
  "width: 100%",
  "grid-template-columns: minmax(34rem, 1.35fr) minmax(24rem, 0.9fr)",
  "min-height: clamp(28rem, 34vw, 39rem)",
  "max-width: 48rem",
  "max-width: 44rem",
  "aspect-ratio: 16 / 9",
  "object-fit: contain",
  "background: #f8fafc",
  "padding: 0",
  "@media (max-width: 1180px)",
];

for (const rule of requiredLayoutRules) {
  assert.ok(css.includes(rule), `Missing responsive layout rule: ${rule}`);
}

assert.ok(!css.includes("max-width: 76rem"), "Main site card should no longer be capped at 76rem");
assert.ok(!css.includes("margin-left: 18rem"), "Main shell should use scalable rail width");
assert.ok(!css.includes("brand-rail"), "Sidebar CSS should be removed");
assert.ok(!css.includes("rail-"), "Rail-specific CSS should be removed");
assert.ok(!css.includes("--rail-width"), "Rail layout variable should be removed");
assert.ok(!css.includes("margin-left: var("), "Main shell should not reserve left-sidebar space");
assert.ok(!css.includes("margin-left: 18rem"), "Main shell should not reserve fixed sidebar space");
assert.ok(!html.includes("brand-rail"), "Sidebar markup should be removed");
assert.ok(!html.includes("rail-"), "Rail-specific markup should be removed");
assert.ok(!css.includes("max-width: 24rem"), "Hero headline should not be constrained to a narrow column");
assert.ok(!css.includes("object-fit: cover;\n}"), "Generic image cover rule should not apply to bin cards");
assert.ok(!css.includes("height: 7rem;\n  border-radius: 0.28rem;\n  object-fit: cover;"), "Bin card images should not crop");
assert.ok(!css.includes("padding: 0.35rem"), "Bin card images should not add visible image padding");
assert.ok(!css.includes("background: linear-gradient(180deg, #f8fafc, #eef3f8)"), "Bin card frames should not use tinted gradient padding");
assert.ok(!css.includes("linear-gradient(90deg, #f7f8fa 0, #f7f8fa 18rem"), "Body rail background should use scalable width");

console.log("Responsive layout verification passed.");
