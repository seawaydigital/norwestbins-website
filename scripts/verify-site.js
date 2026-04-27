const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

assert.ok(exists("index.html"), "index.html should exist");
assert.ok(exists("styles.css"), "styles.css should exist");
assert.ok(exists("script.js"), "script.js should exist");

const html = read("index.html");
const css = read("styles.css");
const js = read("script.js");

const requiredCopy = [
  "Thunder Bay Bin Rentals Made Easy",
  "(807) 630-7593",
  "service@norwestbins.ca",
  "Locally Owned",
  "Driveway Friendly Bins",
  "Non-Hazardous Waste Only",
  "Debit / Credit Accepted",
  "Thunder Bay & Surrounding Areas Including Camps",
  "Choose Your Bin Size",
  "How It Works",
  "Snow & Ice Control",
  "Commercial Snow Plowing",
  "Snow Removal",
  "Parking Lot Sanding",
  "Driveway Sanding",
  "Winter property support for Thunder Bay homes, businesses, and lots.",
  "Keep lots, lanes, and entrances safer through heavy Thunder Bay weather.",
  "Items Not Accepted",
  "Request a Quote",
];

for (const copy of requiredCopy) {
  assert.ok(html.includes(copy), `Missing required copy: ${copy}`);
}

const binDetails = [
  ["8 YD", "8' L x 6' W x 4' H"],
  ["10 YD", "12' L x 6' W x 4' H"],
  ["14 YD", "12' L x 7' W x 4.5' H"],
  ["20 YD", "12' L x 8' W x 5.5' H"],
  ["30 YD", "14' L x 8' W x 7' H"],
];

for (const [label, dimensions] of binDetails) {
  assert.ok(html.includes(label), `Missing bin label: ${label}`);
  assert.ok(html.includes(dimensions), `Missing bin dimensions: ${dimensions}`);
}

const requiredLinks = [
  'href="tel:+18076307593"',
  'href="mailto:service@norwestbins.ca"',
  'href="#contact"',
  'href="#bin-rentals"',
  'href="#services"',
  'href="#snow"',
];

for (const link of requiredLinks) {
  assert.ok(html.includes(link), `Missing required link: ${link}`);
}

const formFields = [
  'name="name"',
  'name="phone"',
  'name="email"',
  'name="bin-size"',
  'name="project-type"',
  'name="location"',
  'name="preferred-date"',
  'name="message"',
];

for (const field of formFields) {
  assert.ok(html.includes(field), `Missing quote form field: ${field}`);
}

const localImages = [
  "assets/hero-truck.jpg",
  "assets/bin-8.jpg",
  "assets/bin-10-14-20.jpg",
  "assets/bin-30.jpg",
  "assets/bin-8-thumb.jpg",
  "assets/bin-10-14-20-thumb.jpg",
  "assets/bin-30-thumb.jpg",
  "assets/snow-service.jpg",
];

for (const image of localImages) {
  assert.ok(exists(image), `Missing local image asset: ${image}`);
}

for (const image of [
  "assets/hero-truck.jpg",
  "assets/bin-8-thumb.jpg",
  "assets/bin-10-14-20-thumb.jpg",
  "assets/bin-30-thumb.jpg",
  "assets/snow-service.jpg",
]) {
  assert.ok(html.includes(image), `HTML should reference ${image}`);
}

assert.ok(css.includes("@media (max-width: 760px)"), "Missing mobile breakpoint");
assert.ok(css.includes(".mobile-contact-bar"), "Missing sticky mobile contact styles");
assert.ok(css.includes("position: sticky"), "Expected sticky behavior for mobile contact/header");
assert.ok(css.includes(".snow-services-grid"), "Missing expanded snow service grid styles");
assert.ok(css.includes(".snow-stats"), "Missing expanded snow stats styles");
assert.ok(js.includes("navToggle"), "Missing mobile nav toggle script");
assert.ok(js.includes("navLinks"), "Missing primary nav link collection");
assert.ok(js.includes("setActiveNav"), "Missing active nav updater");
assert.ok(js.includes("IntersectionObserver"), "Missing scroll spy observer");
assert.ok(js.includes("sectionObserver"), "Missing section observer setup");
assert.ok(js.includes("mailto:service@norwestbins.ca"), "Missing quote form mailto fallback");

console.log("Static site verification passed.");
