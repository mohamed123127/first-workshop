export interface TeacherProfile {
  id: string;
  fullName: string;
  studyLevel: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
  accent: "cyan" | "indigo";
  badge: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  combinedExperienceAndProjects: {
    title: string;
    summary: string;
    highlights: string[];
    tags: string[];
  };
}

export interface TeachersSlideContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  slideNumber: string;
  teachers: TeacherProfile[];
}

export const teachersSlideContent: TeachersSlideContent = {
  eyebrow: "Meet Your Mentors",
  title: "Instructors & Workshop Leads",
  subtitle: "Computer Science Master students guiding you from fundamentals to production web architecture.",
  slideNumber: "Slide 01",
  teachers: [
    {
      id: "louahchi-mohamed",
      fullName: "Louahchi Mohamed",
      studyLevel: "Master 2 Informatique • AI Applied",
      role: "Full-Stack & AI Engineer",
      imageSrc:
        "/images/mohamed.jpg",
      imageAlt: "Louahchi Mohamed",
      accent: "cyan",
      badge: "Instructor • Top Left",
      portfolioUrl: "https://louahchi-mohamed-portofolio.vercel.app/",
      githubUrl: "https://github.com/mohamed123127",
      linkedinUrl: "https://www.linkedin.com/in/mohamed-louahchi-55aba3238/",
      combinedExperienceAndProjects: {
        title: "Experience & Projects",
        summary:
          "Focused on full-stack engineering, AI applications, and intelligent software systems, combining practical development with academic research.",
        highlights: [
          "3+ months of professional internship experience and freelance projects",
          "Project: Jardin d'Enfant — Full-stack e-commerce platform (Next.js, NestJS & PostgreSQL)",
          "Project: Khawa Tech — Multi-tenant POS and inventory management SaaS",
          "Research specialization in Natural Language Processing (NLP) and applied AI",
        ],
        tags: [
          "Next.js",
          "React",
          "TypeScript",
          "NestJS",
          "PostgreSQL",
          "Python & AI",
        ],
      },
    },
    {
      id: "benali-nazim",
      fullName: "Benali Nazim",
      studyLevel: "Master 2 Informatique",
      role: "Full-Stack Engineer & Instructor",
      imageSrc:
        "/images/nazim.jpg",
      imageAlt: "Benali Nazim",
      accent: "indigo",
      badge: "Instructor • Bottom Right",
      portfolioUrl: "https://nazimbenali.dev",
      githubUrl: "https://github.com/benalinazim",
      linkedinUrl: "https://www.linkedin.com/in/nazim-benalia-856920413/",
      combinedExperienceAndProjects: {
        title: "Experience & Projects",
        summary:
          "Full-Stack Developer focused on modern web technologies, scalable application engineering, and building intelligent AI applications.",
        highlights: [
          "Expertise in Full-Stack development and modern frontend/backend engineering",
          "Currently working part-time remote job",
          "Specialized in developing and integrating AI applications and autonomous agents",
          "Project: Khawa Tech — Multi-tenant POS and inventory management SaaS and more...",
        ],
        tags: [
          "Full-Stack Developer",
          "AI Applications",
          "Next.js",
          "React",
          "TypeScript",
          "JavaScript",
          "Tailwind CSS",
          "laravel",
          "..."
        ],
      },

    },
  ],
};
