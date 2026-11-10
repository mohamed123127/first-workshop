export interface WebsiteImageItem {
  src: string;
  alt?: string;
  caption?: string;
}

export interface WebsiteTypeItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  accent?: "cyan" | "indigo" | "amber";
  imageSrc?: string;
  imageAlt?: string;
  images?: (string | WebsiteImageItem)[];
  placeholderLabel?: string;
}

export interface WebOverviewContent {
  eyebrow: string;
  badge: string;
  title: string;
  description: string;
  typesSectionHeading: string;
  typesSectionSubtitle: string;
  types: WebsiteTypeItem[];
}

export const webOverviewContent: WebOverviewContent = {
  eyebrow: "Module 01 · Fundamentals",
  badge: "Slide 03",
  title: "General Idea About the Web",
  description:
    "A website is a collection of web pages, digital content, and interactive elements hosted on a web server and accessible via the internet using a web browser through a unique domain name.",
  typesSectionHeading: "Types of Websites ",
  typesSectionSubtitle:
    "From informational showcase sites to data-intensive internal management platforms, each type serves specific business and technical goals.",
  types: [
    {
      id: "vitrine",
      title: "Site Vitrine (Showcase)",
      subtitle: "Brand Presence & Informational",
      description:
        "Presents a company's identity, services, and contact information. Focuses on high-impact visual design, performance, and search engine optimization (SEO).",
      tags: ["Showcase", "SEO", "Responsive"],
      imageSrc: "/images/vitrine.jpg",
      accent: "cyan",
      placeholderLabel: "Site Vitrine Mockup",
    },
    {
      id: "gestion",
      title: "Application de Gestion (Dashboard / ERP)",
      subtitle: "Internal Tools & Business Operations",
      description:
        "Interactive software tailored for businesses to manage data, clients (CRM), inventory (ERP), workflows, permissions, and automated reporting.",
      tags: ["Database", "Auth", "Workflows"],
      accent: "indigo",
      imageSrc: "/images/gestion.jpg",
      placeholderLabel: "Dashboard & ERP Mockup",
    },
    {
      id: "ecommerce",
      title: "E-commerce (Online Store)",
      subtitle: "Transactional Catalog & Payments",
      description:
        "Full-featured online retail platforms with dynamic product catalogs, cart management, secure checkout, payment gateways, and inventory sync.",
      tags: ["Stripe / Cart", "Catalog", "Transactions"],
      accent: "amber",
      imageSrc: "/images/ecommerce.jpg",
      placeholderLabel: "E-Commerce Mockup",
    },
    {
      id: "saas",
      title: "SaaS Application (Web App)",
      subtitle: "Cloud Software in the Browser",
      description:
        "Subscription-based digital products delivering full desktop-grade software capabilities directly inside modern web browsers (e.g. Canva, Notion).",
      tags: ["Cloud", "Real-time", "Subscription"],
      imageSrc: "/images/saas.jpg",
      accent: "indigo",
      placeholderLabel: "SaaS Platform Mockup",
    },
    {
      id: "portfolio",
      title: "Portfolio & Creative Showcase",
      subtitle: "Personal Brand & Projects",
      description:
        "Tailored presentation hubs for developers, designers, and creators highlighting case studies, skills, live demos, and contact channels.",
      tags: ["Visuals", "Case Studies", "Interactive"],
      accent: "cyan",
 imageSrc: "/images/portfolio.jpg",      
      placeholderLabel: "Portfolio Mockup",
    },
  ],
};
