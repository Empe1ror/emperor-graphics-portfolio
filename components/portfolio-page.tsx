"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Brush,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Mail,
  Menu,
  MessageCircle,
  Palette,
  Phone,
  Sparkles,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  buildMailtoLink,
  getProjectCategories,
  sanitizePhoneNumber,
  type ContactFormState,
  type Project,
} from "@/lib/helpers";

type Service = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

function Card({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`rounded-3xl ${className}`}>{children}</div>;
}

function CardContent({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={className}>{children}</div>;
}

function Button({
  className = "",
  children,
  asChild = false,
  size = "default",
  variant = "default",
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children: React.ReactNode;
  asChild?: boolean;
  size?: "default" | "lg";
  variant?: "default" | "outline";
}) {
  const sizeClass = size === "lg" ? "px-6 py-3 text-base" : "px-4 py-2 text-sm";
  const variantClass =
    variant === "outline"
      ? "border border-white/15 bg-transparent text-white hover:bg-white/5"
      : "bg-violet-600 text-white hover:bg-violet-500";

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      className: `${sizeClass} ${variantClass} inline-flex items-center justify-center rounded-full transition ${className} ${
        child.props.className ?? ""
      }`,
    });
  }

  return (
    <button
      type={type}
      className={`${sizeClass} ${variantClass} inline-flex items-center justify-center rounded-full transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} />;
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} />;
}

const brandLogo = "/assets/Emperor-logo.png";
const founderImage = "/assets/my-image.jpg";

const services: Service[] = [
  {
    title: "Brand Identity Design",
    description:
      "Complete visual identity systems that give businesses a clear, consistent, and memorable presence across every touchpoint.",
    icon: Palette,
  },
  {
    title: "Logo Design",
    description:
      "Unique and versatile logos crafted to communicate brand personality, build recognition, and leave a lasting impression.",
    icon: Sparkles,
  },
  {
    title: "Social Media Graphics",
    description:
      "High-impact social visuals designed to capture attention, boost engagement, and strengthen digital presence.",
    icon: LayoutGrid,
  },
  {
    title: "Event Flyers & Posters",
    description:
      "Eye-catching promotional materials built to communicate clearly, attract audiences, and elevate event visibility.",
    icon: Brush,
  },
  {
    title: "Promotional & Marketing Designs",
    description:
      "Strategic visuals for campaigns, promotions, and advertising that support growth, conversions, and brand awareness.",
    icon: ArrowRight,
  },
];

const projects: Project[] = [
  {
    title: "Tommy's Gadget",
    category: "Brand Identity",
    description:
      "A complete visual identity presentation for a modern gadget brand, built to communicate innovation, trust, and a clean tech-forward presence across multiple branded touchpoints.",
    images: [
      "/assets/Tommys-gadget-1.jpg",
      "/assets/Tommys-gadget-2.jpg",
      "/assets/Tommys-gadget-3.jpg",
      "/assets/Tommys-gadget-4.jpg",
      "/assets/Tommys-gadget-5.jpg",
      "/assets/Tommys-gadget-6.jpg",
      "/assets/Tommys-gadget-7.jpg",
      "/assets/Tommys-gadget-8.jpg",
      "/assets/Tommys-gadget-9.jpg",
      "/assets/Tommys-gadget-10.jpg",
    ],
  },
  {
    title: "FADLUX",
    category: "Brand Identity",
    description:
      "A luxury-inspired identity system with refined typography, premium visual direction, and polished presentation assets created for a sophisticated audience.",
    images: [
      "/assets/Fadlux-1.jpg",
      "/assets/Fadlux-2.jpg",
      "/assets/Fadlux-3.jpg",
      "/assets/Fadlux-4.jpg",
      "/assets/Fadlux-5.jpg",
      "/assets/Fadlux-6.jpg",
    ],
  },
  {
    title: "Adebeez Global Services",
    category: "Logo Design",
    description:
      "A clean corporate logo and supporting branding assets designed to express credibility, professionalism, and global business reach.",
    images: ["/assets/ADEBEEZ-1.jpg", "/assets/ADEBEEZ-2.jpg"],
  },
  {
    title: "Ominik Fashion",
    category: "Logo Design",
    description:
      "A bold fashion identity crafted to improve recognition and give the brand a stronger visual signature across logo and banner applications.",
    images: ["/assets/OMINIK-FASHION-1.jpg", "/assets/OMINIK-FASHION-2.jpg"],
  },
  {
    title: "Scent of Grace",
    category: "Logo Design",
    description:
      "A refined and elegant logo direction for a perfume brand, shaped to reflect luxury, softness, and premium appeal in both mark and presentation.",
    images: ["/assets/SCENTS-OF-GRACE-1.jpg", "/assets/SCENTS-OF-GRACE-2.jpg"],
  },
  {
    title: "Shegxy Footwear",
    category: "Logo Design",
    description:
      "A modern footwear identity designed to feel energetic, stylish, and commercially strong, supported by both logo and banner asset previews.",
    images: ["/assets/shegxy-footwear-1.jpg", "/assets/shegxy-footwear-2.jpg"],
  },
];

const stats = [
  { label: "Core Services", value: "5+" },
  { label: "Featured Projects", value: "6" },
  { label: "Design Direction", value: "Bold" },
  { label: "Brand Focus", value: "Premium" },
] as const;

const contactDetails = {
  phone: "+2347084992123",
  whatsapp: "+2347084992123",
  email: "omoniyijudah2123@gmail.com",
  instagram: "mperorgraphics",
  facebook: "Emperor Graphics",
} as const;

const navItems = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Services", "#services"],
  ["Portfolio", "#portfolio"],
  ["Contact", "#contact"],
] as const;

export default function PortfolioPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [selectedAssetIndex, setSelectedAssetIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    project: "",
    message: "",
  });

  const categories = useMemo(() => getProjectCategories(projects), []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const selectedProject =
    selectedProjectIndex !== null ? filteredProjects[selectedProjectIndex] : null;

  const whatsappLink = `https://wa.me/${sanitizePhoneNumber(
    contactDetails.whatsapp
  )}?text=${encodeURIComponent(
    "Hello Emperor Graphics, I would like to work with you on a design project."
  )}`;
  const instagramLink = `https://instagram.com/${contactDetails.instagram}`;
  const facebookSearchLink = `https://www.facebook.com/search/top?q=${encodeURIComponent(
    contactDetails.facebook
  )}`;

  const openModal = (projectIndex: number) => {
    setSelectedProjectIndex(projectIndex);
    setSelectedAssetIndex(0);
    setIsZoomed(false);
  };

  const closeModal = () => {
    setSelectedProjectIndex(null);
    setSelectedAssetIndex(0);
    setIsZoomed(false);
  };

  const nextProject = () => {
    if (selectedProjectIndex === null) return;
    setSelectedProjectIndex((prev) =>
      prev === null ? 0 : (prev + 1) % filteredProjects.length
    );
    setSelectedAssetIndex(0);
    setIsZoomed(false);
  };

  const prevProject = () => {
    if (selectedProjectIndex === null) return;
    setSelectedProjectIndex((prev) =>
      prev === null ? 0 : (prev - 1 + filteredProjects.length) % filteredProjects.length
    );
    setSelectedAssetIndex(0);
    setIsZoomed(false);
  };

  const nextAsset = () => {
    if (!selectedProject) return;
    setSelectedAssetIndex((prev) => (prev + 1) % selectedProject.images.length);
    setIsZoomed(false);
  };

  const prevAsset = () => {
    if (!selectedProject) return;
    setSelectedAssetIndex(
      (prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length
    );
    setIsZoomed(false);
  };

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowRight") nextAsset();
      if (event.key === "ArrowLeft") prevAsset();
      if (event.key.toLowerCase() === "z") setIsZoomed((prev) => !prev);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject, selectedAssetIndex]);

  useEffect(() => {
    if (!selectedProject) return;
    if (selectedProject.images.length <= 1) return;

    const timer = window.setInterval(() => {
      setSelectedAssetIndex((prev) => (prev + 1) % selectedProject.images.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [selectedProject, selectedAssetIndex]);

  useEffect(() => {
    if (selectedProjectIndex !== null && selectedProjectIndex >= filteredProjects.length) {
      setSelectedProjectIndex(0);
      setSelectedAssetIndex(0);
      setIsZoomed(false);
    }
  }, [filteredProjects.length, selectedProjectIndex]);

  return (
    <div className="min-h-screen bg-[#05010b] text-white selection:bg-violet-500/30">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-violet-700/20 blur-3xl" />
        <div className="absolute right-0 top-40 h-[24rem] w-[24rem] rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[20rem] w-[20rem] rounded-full bg-violet-400/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-1">
              <img src={brandLogo} alt="Emperor Graphics logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-[0.2em] text-violet-300">EMPEROR GRAPHICS</p>
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">Building Visual Dominance</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} className="text-sm text-white/75 transition hover:text-violet-300">
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button asChild className="rounded-full bg-violet-600 px-6 hover:bg-violet-500">
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                Let&apos;s Work
              </a>
            </Button>
          </div>

          <button
            className="rounded-full border border-white/10 p-2 text-white md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-black/80 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
              {navItems.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="text-sm text-white/75 transition hover:text-violet-300"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </a>
              ))}
              <Button asChild className="rounded-full bg-violet-600 hover:bg-violet-500">
                <a href={whatsappLink} target="_blank" rel="noreferrer">
                  Let&apos;s Work
                </a>
              </Button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section
          id="home"
          className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-5 inline-flex w-fit items-center gap-3 rounded-full border border-violet-400/20 bg-white/5 px-4 py-2 text-sm text-violet-200">
              <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-white/10 p-1">
                <img src={brandLogo} alt="Emperor Graphics mark" className="h-full w-full object-contain" />
              </span>
              Creative Designer • Brand Strategist • Digital Visual Expert
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-7xl">
              Building <span className="text-violet-300">Visual Dominance</span> for brands that want to stand out.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              I&apos;m Omoniyi Judah, the creative mind behind Emperor Graphics. I help businesses and personal brands
              establish bold, strategic, and memorable visuals through identity design, logos, social graphics, and
              promotional assets that do more than look good — they perform.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="rounded-full bg-violet-600 px-7 hover:bg-violet-500">
                <a href="#portfolio">
                  View Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/15 bg-transparent px-7 text-white hover:bg-white/5"
              >
                <a href={whatsappLink} target="_blank" rel="noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <Card className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-violet-950/20 backdrop-blur-xl">
              <CardContent className="p-0">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <img
                    src="/assets/portfolio-cover.jpg"
                    alt="Emperor Graphics creative studio cover"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05010b] via-[#05010b]/35 to-[#05010b]/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="rounded-[1.5rem] border border-white/10 bg-black/45 p-5 backdrop-blur-md">
                      <p className="text-xs uppercase tracking-[0.3em] text-violet-200">Emperor Graphics</p>
                      <p className="mt-2 text-2xl font-semibold text-white">Design Creative Studio</p>
                      <p className="mt-2 text-sm leading-7 text-white/75">
                        Premium design direction, bold presentation, and strategic visuals tailored for modern brands.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <section className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 pb-10 sm:grid-cols-4 sm:px-6 lg:px-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <Card className="rounded-[1.5rem] border border-white/10 bg-white/5">
                <CardContent className="p-6">
                  <p className="text-3xl font-semibold text-violet-300">{stat.value}</p>
                  <p className="mt-2 text-sm text-white/60">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_0.56fr_0.92fr]">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm uppercase tracking-[0.35em] text-violet-300">About</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Design that goes beyond aesthetics.</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-3 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 lg:order-2"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={founderImage} alt="Omoniyi Judah" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05010b] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="rounded-[1.5rem] border border-white/10 bg-black/40 p-4 backdrop-blur-md">
                    <p className="text-xs uppercase tracking-[0.3em] text-violet-200">Founder</p>
                    <p className="mt-2 text-xl font-semibold text-white">Omoniyi Judah</p>
                    <p className="mt-1 text-sm leading-6 text-white/70">
                      Added subtly to build trust without distracting from the work itself.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-2 space-y-6 text-white/70 lg:order-3"
            >
              <p className="text-lg leading-8">
                I&apos;m Omoniyi Judah, the creative mind behind Emperor Graphics — a design brand built on the principle of
                visual dominance. I specialize in crafting bold, strategic, and visually compelling designs that help
                brands stand out in competitive markets.
              </p>
              <p className="leading-8">
                My approach to design goes beyond aesthetics. I focus on combining creativity with purpose, ensuring
                every design communicates clearly, connects with the target audience, and delivers real impact. From
                brand identity development to social media visuals and marketing materials, I create designs that not
                only look good but also perform.
              </p>
              <p className="leading-8">
                I don&apos;t just create designs — I build visual systems that communicate, influence, and convert. My work
                is driven by strategy, clarity, consistency, and audience connection, helping brands move from ordinary
                visibility to memorable positioning.
              </p>
            </motion.div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Services</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Creative solutions built for brand growth.</h2>
            </div>
            <p className="max-w-xl text-white/65">
              Strategic design services for businesses, events, and personal brands that want premium presentation and
              stronger audience connection.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.07 }}
                >
                  <Card className="h-full rounded-[1.75rem] border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.07]">
                    <CardContent className="p-6">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                      <p className="mt-3 leading-7 text-white/65">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section id="portfolio" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Portfolio</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Selected works that reflect brand power.</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveFilter(category);
                    closeModal();
                  }}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    activeFilter === category
                      ? "border-violet-400/40 bg-violet-500/15 text-violet-200"
                      : "border-white/10 bg-white/5 text-white/65 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <Card
                  className="group cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30"
                >
                  <button className="block w-full text-left" onClick={() => openModal(index)}>
                    <CardContent className="p-0">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={project.images[0]}
                          alt={project.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#05010b] via-[#05010b]/10 to-transparent" />
                        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-violet-200 backdrop-blur-md">
                          {project.category}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                        <p className="mt-3 line-clamp-3 leading-7 text-white/65">{project.description}</p>
                      </div>
                    </CardContent>
                  </button>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden rounded-[2rem] border border-violet-400/20 bg-gradient-to-br from-violet-700/20 via-white/5 to-fuchsia-500/10">
              <CardContent className="flex flex-col gap-6 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-violet-200">Ready to build your brand?</p>
                  <h3 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                    Let&apos;s turn your ideas into powerful visuals.
                  </h3>
                  <p className="mt-3 max-w-2xl leading-8 text-white/70">
                    Whether you need a full brand identity, sharp campaign design, or social media visuals that stand
                    out, Emperor Graphics is ready to help you move with confidence.
                  </p>
                </div>
                <Button asChild size="lg" className="rounded-full bg-violet-600 px-7 hover:bg-violet-500">
                  <a href={whatsappLink} target="_blank" rel="noreferrer">
                    Start a Project <MessageCircle className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="space-y-6"
            >
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Contact</p>
                <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Let&apos;s create something exceptional.</h2>
              </div>
              <p className="max-w-xl leading-8 text-white/70">
                Reach out for brand identity work, logo design, campaign visuals, event promotions, and creative design
                support that gives your brand a stronger visual edge.
              </p>

              <div className="grid gap-4">
                <Card className="rounded-[1.5rem] border border-white/10 bg-white/5">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="rounded-2xl bg-violet-500/15 p-3 text-violet-300">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-white/50">Phone / WhatsApp</p>
                      <a href={`tel:${contactDetails.phone}`} className="text-white transition hover:text-violet-300">
                        {contactDetails.phone}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-[1.5rem] border border-white/10 bg-white/5">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="rounded-2xl bg-violet-500/15 p-3 text-violet-300">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-white/50">Email</p>
                      <a href={`mailto:${contactDetails.email}`} className="text-white transition hover:text-violet-300">
                        {contactDetails.email}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-[1.5rem] border border-white/10 bg-white/5">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="rounded-2xl bg-violet-500/15 p-3 text-violet-300">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-white/50">Instagram</p>
                      <a href={instagramLink} target="_blank" rel="noreferrer" className="text-white transition hover:text-violet-300">
                        @{contactDetails.instagram}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <Card className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl">
                <CardContent className="p-6 sm:p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-semibold text-white">Send a project inquiry</h3>
                    <p className="mt-2 text-white/60">
                      Fill the form and describe what you need. This is ready for direct email launch and can later be
                      connected to a form backend.
                    </p>
                  </div>

                  <form
                    className="grid gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      window.location.href = buildMailtoLink(contactDetails.email, form);
                    }}
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        value={form.name}
                        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Your name"
                        className="h-12 rounded-2xl border-white/10 bg-black/20 px-4 text-white placeholder:text-white/35"
                      />
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="Email address"
                        className="h-12 rounded-2xl border-white/10 bg-black/20 px-4 text-white placeholder:text-white/35"
                      />
                    </div>
                    <Input
                      value={form.project}
                      onChange={(e) => setForm((prev) => ({ ...prev, project: e.target.value }))}
                      placeholder="Project type"
                      className="h-12 rounded-2xl border-white/10 bg-black/20 px-4 text-white placeholder:text-white/35"
                    />
                    <Textarea
                      value={form.message}
                      onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell me about your project"
                      className="min-h-[140px] rounded-2xl border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35"
                    />
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button type="submit" className="rounded-full bg-violet-600 px-6 hover:bg-violet-500">
                        Send Inquiry
                      </Button>
                      <Button
                        asChild
                        type="button"
                        variant="outline"
                        className="rounded-full border-white/15 bg-transparent px-6 text-white hover:bg-white/5"
                      >
                        <a href={whatsappLink} target="_blank" rel="noreferrer">
                          WhatsApp Instead
                        </a>
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 py-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0613] shadow-2xl shadow-violet-950/30"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/40 p-2 text-white transition hover:bg-white/10"
                aria-label="Close project preview"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid max-h-[92vh] lg:grid-cols-[1.2fr_0.8fr]">
                <div className="relative flex flex-col justify-center bg-black/30 p-4">
                  <div className="relative flex min-h-[340px] flex-1 items-center justify-center overflow-hidden rounded-[1.5rem] bg-black/20">
                    <motion.img
                      key={selectedProject.images[selectedAssetIndex]}
                      src={selectedProject.images[selectedAssetIndex]}
                      alt={selectedProject.title}
                      initial={{ opacity: 0.5, scale: 0.98 }}
                      animate={{ opacity: 1, scale: isZoomed ? 1.45 : 1 }}
                      transition={{ duration: 0.35 }}
                      className={`max-h-[70vh] w-full object-contain transition ${
                        isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                      }`}
                      onClick={() => setIsZoomed((prev) => !prev)}
                    />

                    <button
                      onClick={prevAsset}
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/45 p-3 text-white transition hover:bg-white/10"
                      aria-label="Previous asset"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextAsset}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/45 p-3 text-white transition hover:bg-white/10"
                      aria-label="Next asset"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>

                    <button
                      onClick={() => setIsZoomed((prev) => !prev)}
                      className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-black/45 p-3 text-white transition hover:bg-white/10"
                      aria-label={isZoomed ? "Zoom out" : "Zoom in"}
                    >
                      {isZoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
                    </button>
                  </div>

                  {selectedProject.images.length > 1 && (
                    <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-1">
                      {selectedProject.images.map((img, index) => (
                        <button
                          key={img}
                          onClick={() => {
                            setSelectedAssetIndex(index);
                            setIsZoomed(false);
                          }}
                          className={`shrink-0 overflow-hidden rounded-xl border transition ${
                            index === selectedAssetIndex
                              ? "border-violet-400"
                              : "border-white/10 opacity-70 hover:opacity-100"
                          }`}
                          aria-label={`View asset ${index + 1}`}
                        >
                          <img
                            src={img}
                            alt={`${selectedProject.title} asset ${index + 1}`}
                            className="h-16 w-20 object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-between gap-6 overflow-y-auto p-6 sm:p-8">
                  <div>
                    <div className="mb-4 inline-flex rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-violet-200">
                      {selectedProject.category}
                    </div>
                    <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                      {selectedProject.title}
                    </h3>
                    <p className="mt-4 leading-8 text-white/70">{selectedProject.description}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={prevProject}
                        className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10"
                      >
                        Prev Project
                      </button>
                      <button
                        onClick={nextProject}
                        className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10"
                      >
                        Next Project
                      </button>
                    </div>

                    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-white/65">
                      Use the asset arrows for images inside the selected project. Click the image or press
                      <span className="mx-1 text-white">Z</span>
                      to zoom. Press
                      <span className="mx-1 text-white">←</span>
                      or
                      <span className="mx-1 text-white">→</span>
                      for asset navigation, and
                      <span className="mx-1 text-white">Esc</span>
                      to close.
                    </div>

                    <div className="flex items-center justify-between text-sm text-white/50">
                      <span>
                        Project {selectedProjectIndex! + 1} / {filteredProjects.length}
                      </span>
                      <span>
                        Asset {selectedAssetIndex + 1} / {selectedProject.images.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-green-950/40 transition hover:scale-[1.02] hover:bg-green-400"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>

      <footer className="border-t border-white/10 bg-black/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-white/55 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Emperor Graphics. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <a href={`mailto:${contactDetails.email}`} className="transition hover:text-violet-300">
              {contactDetails.email}
            </a>
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="transition hover:text-violet-300">
              WhatsApp
            </a>
            <a href={instagramLink} target="_blank" rel="noreferrer" className="transition hover:text-violet-300">
              Instagram
            </a>
            <a href={facebookSearchLink} target="_blank" rel="noreferrer" className="transition hover:text-violet-300">
              Facebook
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
