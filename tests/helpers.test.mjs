import assert from "node:assert/strict";
import {
  sanitizePhoneNumber,
  getProjectCategories,
  buildMailtoLink,
} from "../lib/helpers.mjs";

assert.equal(sanitizePhoneNumber("+234 708-499-2123"), "2347084992123");
assert.equal(sanitizePhoneNumber("(555) 123-4567"), "5551234567");

const categories = getProjectCategories([
  { title: "A", category: "Logo Design", description: "", images: ["a.jpg"] },
  { title: "B", category: "Brand Identity", description: "", images: ["b.jpg", "c.jpg"] },
  { title: "C", category: "Logo Design", description: "", images: ["d.jpg"] },
]);

assert.deepEqual(categories, ["All", "Logo Design", "Brand Identity"]);

const mailto = buildMailtoLink("hello@example.com", {
  name: "Judah",
  email: "judah@example.com",
  project: "Logo Design",
  message: "I need a premium logo.",
});

assert.ok(mailto.startsWith("mailto:hello@example.com?subject="));
assert.ok(mailto.includes("Judah"));
assert.ok(mailto.includes("Logo%20Design"));

const fallbackMailto = buildMailtoLink("hello@example.com", {
  name: "",
  email: "",
  project: "",
  message: "",
});

assert.ok(fallbackMailto.includes("Website%20Visitor"));
console.log("All helper tests passed.");
