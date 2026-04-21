export function sanitizePhoneNumber(value) {
  return value.replace(/[^0-9]/g, "");
}

export function getProjectCategories(items) {
  return ["All", ...Array.from(new Set(items.map((project) => project.category)))];
}

export function buildMailtoLink(email, form) {
  const subject = encodeURIComponent(
    `New Project Inquiry from ${form.name || "Website Visitor"}`
  );
  const body = encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\nProject Type: ${form.project}\n\nMessage:\n${form.message}`
  );

  return `mailto:${email}?subject=${subject}&body=${body}`;
}
