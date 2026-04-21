export type Project = {
  title: string;
  category: string;
  description: string;
  images: string[];
};

export type ContactFormState = {
  name: string;
  email: string;
  project: string;
  message: string;
};

export function sanitizePhoneNumber(value: string): string {
  return value.replace(/[^0-9]/g, "");
}

export function getProjectCategories(items: Project[]): string[] {
  return ["All", ...Array.from(new Set(items.map((project) => project.category)))];
}

export function buildMailtoLink(email: string, form: ContactFormState): string {
  const subject = encodeURIComponent(
    `New Project Inquiry from ${form.name || "Website Visitor"}`
  );
  const body = encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\nProject Type: ${form.project}\n\nMessage:\n${form.message}`
  );

  return `mailto:${email}?subject=${subject}&body=${body}`;
}
