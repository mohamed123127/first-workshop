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
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Louahchi Mohamed",
      accent: "cyan",
      badge: "Instructor • Top Left",
      portfolioUrl: "https://louahchimohamed.vercel.app",
      githubUrl: "https://github.com/Mohamed-Louahchi",
      linkedinUrl: "https://linkedin.com/in/mohamed-louahchi",
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
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Benali Nazim",
      accent: "indigo",
      badge: "Instructor • Bottom Right",
      portfolioUrl: "https://nazimbenali.dev",
      githubUrl: "https://github.com/benalinazim",
      linkedinUrl: "https://linkedin.com/in/benali-nazim",
      combinedExperienceAndProjects: {
        title: "Experience & Projects",
        summary:
          "Focused on modern frontend engineering, interactive web experiences, and building responsive applications using modern JavaScript technologies.",
        highlights: [
          "Practical development experience in modern frontend engineering",
          "Project: Khawa Tech — Multi-tenant POS and inventory management SaaS",
          "Developing responsive user interfaces and reusable application components",
          "Collaborative software development using modern web technologies and workflows",
        ],
        tags: [
          "Next.js",
          "React",
          "TypeScript",
          "JavaScript",
          "Tailwind CSS",
          "Frontend Engineering",
        ],
      },
    },
  ],
};
