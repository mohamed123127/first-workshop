export interface LifecycleStep {
  id: string;
  stepNumber: number;
  row: 1 | 2 | 3;
  direction: "right" | "left" | "down";
  title: string;
  shortTitle: string;
  phase: string;
  iconName:
  | "brain"
  | "lightbulb"
  | "fileText"
  | "palette"
  | "network"
  | "code"
  | "checkCircle"
  | "cloud"
  | "rocket";
  summary: string;
  fullDescription: string;
  keyDeliverables: string[];
  toolsUsed: string[];
  visualType:
  | "idea_canvas"
  | "brainstorm_board"
  | "cahier_charges"
  | "design_system"
  | "architecture_diagram"
  | "coding_split"
  | "testing_suite"
  | "deployment_pipeline"
  | "launch_celebration";
  accent: "cyan" | "indigo" | "amber" | "emerald";
  badgeLabel?: string;
  isParallelBranch?: boolean;
}

export interface ProjectLifecycleContent {
  eyebrow: string;
  badge: string;
  title: string;
  subtitle: string;
  steps: LifecycleStep[];
}

export const projectLifecycleContent: ProjectLifecycleContent = {
  eyebrow: "Module 04 · End-to-End Product Engineering",
  badge: "Slide 08",
  title: "The Web Project Lifecycle: From Idea to Launch",
  subtitle:
    "Follow the complete roadmap of creating modern software — from client ideation and design systems to full-stack code, testing, and deployment.",
  steps: [
    {
      id: "idea",
      stepNumber: 1,
      row: 1,
      direction: "right",
      phase: "Phase 1: Discovery & Conception",
      title: "1. The Spark (Client or Brain with Idea)",
      shortTitle: "Brain / Idea",
      iconName: "brain",
      accent: "cyan",
      badgeLabel: "Inception",
      summary:
        "Every project starts with a spark — a client problem, a market opportunity, or an innovative vision.",
      fullDescription:
        "The inception phase identifies who the user is, what pain point needs solving, and what the value proposition of the digital solution will be. The team drafts the core vision before committing any engineering resources.",
      keyDeliverables: [
        "Problem Statement & Target Audience Definition",
        "Initial Value Proposition Canvas",
        "High-level User Stories & Core Objective",
      ],
      toolsUsed: ["Miro", "Notion", "FigJam", "MindMeister"],
      visualType: "idea_canvas",
    },
    {
      id: "brainstorming",
      stepNumber: 2,
      row: 1,
      direction: "right",
      phase: "Phase 1: Discovery & Conception",
      title: "2. Brainstorming & Research",
      shortTitle: "Brainstorming",
      iconName: "lightbulb",
      accent: "amber",
      badgeLabel: "Research",
      summary:
        "Collaborative divergence: exploring multiple solutions, researching competitors, and gathering requirements.",
      fullDescription:
        "Engineers, designers, and stakeholders brainstorm creative approaches, evaluate technical feasibility, and interview potential users. We analyze market benchmarks to ensure our solution has a competitive edge.",
      keyDeliverables: [
        "Competitor Benchmark & Feature Matrix",
        "User Persona Profiles & Empathy Maps",
        "Brainstorming Mindmap & Feasibility Matrix",
      ],
      toolsUsed: ["Figma / FigJam", "Google Forms", "Notion", "Slack"],
      visualType: "brainstorm_board",
    },
    {
      id: "cahier-des-charges",
      stepNumber: 3,
      row: 1,
      direction: "down",
      phase: "Phase 2: Scoping & Specifications",
      title: "3. Cahier des Charges & MVP Definition",
      shortTitle: "Cahier (MVP)",
      iconName: "fileText",
      accent: "indigo",
      badgeLabel: "Scope",
      summary:
        "The blueprint contract: defining functional requirements, budget, deadlines, and the Minimum Viable Product.",
      fullDescription:
        "The Cahier des Charges (specifications document) acts as the single source of truth. We prioritize features using MoSCoW (Must-have, Should-have, Could-have) to lock in the MVP scope that delivers maximum value fastest.",
      keyDeliverables: [
        "Official Cahier des Charges (Specifications Document)",
        "MVP Feature List (Must-Haves locked in)",
        "Sprint Roadmap, Milestones & Technical Constraints",
      ],
      toolsUsed: ["Notion Docs", "Jira", "Linear", "Confluence"],
      visualType: "cahier_charges",
    },
    {
      id: "design-ui-ux",
      stepNumber: 4,
      row: 2,
      direction: "left",
      phase: "Phase 3: Design & Architecture",
      title: "4. UI/UX Design & Design System",
      shortTitle: "Design (UI/UX)",
      iconName: "palette",
      accent: "cyan",
      badgeLabel: "Design System",
      summary:
        "Crafting user journeys, low-fi sketches, component design systems, and high-fidelity interactive prototypes.",
      fullDescription:
        "Design starts with low-fidelity sketches and wireframes, followed by creating a scalable Design System: color palettes, typography hierarchies, button variants, card layouts, and complete responsive pages ready for engineering handoff.",
      keyDeliverables: [
        "Complete Design System (Colors, Fonts, Buttons, Cards)",
        "Low-Fidelity Wireframe Sketches (Scatch)",
        "High-Fidelity Interactive Prototype in Figma",
        "Design Tokens & Component Library Guide",
      ],
      toolsUsed: ["Figma", "Adobe XD", "Coolors", "Google Fonts", "Tailwind UI"],
      visualType: "design_system",
    },
    {
      id: "architecture",
      stepNumber: 5,
      row: 2,
      direction: "left",
      phase: "Phase 3: Design & Architecture",
      title: "5. System Architecture & Tech Stack",
      shortTitle: "Architecture",
      iconName: "network",
      accent: "indigo",
      badgeLabel: "Blueprints",
      summary:
        "Engineering the technical foundation: database schema, API contracts, hosting choice, and security protocols.",
      fullDescription:
        "Experienced software engineers and system architects make critical technical decisions about how the system should be built. They design the database structure, data flow, APIs, authentication, security, and server infrastructure. Their responsibility is to ensure the system is scalable, maintainable, extendable, and secure, so it can grow, support new features, and adapt to future business needs without requiring a complete rebuild.",
      keyDeliverables: [
        "Entity-Relationship Diagram (ERD Database Schema)",
        "API Route Architecture & Data Flow Diagram",
        "Tech Stack Selection (Next.js, Node.js, Prisma, PostgreSQL)",
      ],
      toolsUsed: ["Draw.io", "Eraser.io", "Postman", "Prisma Studio"],
      visualType: "architecture_diagram",
    },
    {
      id: "coding",
      stepNumber: 6,
      row: 2,
      direction: "down",
      phase: "Phase 4: Implementation & Engineering",
      title: "6. Full-Stack Coding (Frontend & Backend)",
      shortTitle: "Coding (Dev)",
      iconName: "code",
      accent: "emerald",
      badgeLabel: "Build",
      summary:
        "Turning designs into reality: building responsive UI components and writing resilient server APIs and queries.",
      fullDescription:
        "Frontend developers translate Figma components into clean React/Next.js code with Tailwind CSS, while backend developers build secure API endpoints, integrate databases, write business logic, and enforce authentication rules.",
      keyDeliverables: [
        "Build UI: Create pages and components.",
        "Responsive Design: Support all screen sizes.",
        "API Integration: Connect UI to backend.",
        "User Experience: Ensure smooth interactions.",
      ],
      toolsUsed: [
        "Business Logic: Implement system rules",
        "Database Management: Store and manage data",
        "API Development: Handle frontend requests",
        "Security: Protect data and access",
      ],
      visualType: "coding_split",
    },
    {
      id: "testing",
      stepNumber: 7,
      row: 3,
      direction: "right",
      phase: "Phase 5: Quality Assurance & Launch",
      title: "7. Testing & Quality Assurance",
      shortTitle: "Testing",
      iconName: "checkCircle",
      accent: "amber",
      badgeLabel: "QA",
      summary:
        "Zero-compromise validation: automated unit tests, cross-browser tests, performance audits, and security checks.",
      fullDescription:
        "Before releasing to the public, the application undergo rigorous quality assurance: automated unit and end-to-end testing, responsive audits on mobile/tablets, lighthouse speed checks, accessibility reviews, and edge-case debugging.",
      keyDeliverables: [
        "Automated Test Suites (Unit, Integration, E2E)",
        "Lighthouse Performance, SEO & Accessibility Audit (90+)",
        "Bug Triage Log & Security Vulnerability Resolution",
      ],
      toolsUsed: ["Vitest", "Playwright", "Cypress", "Chrome DevTools", "SonarQube"],
      visualType: "testing_suite",
    },
    {
      id: "deployment",
      stepNumber: 8,
      row: 3,
      direction: "right",
      phase: "Phase 5: Quality Assurance & Launch",
      title: "8. Deployment & CI/CD Pipelines",
      shortTitle: "Deployment",
      iconName: "cloud",
      accent: "cyan",
      badgeLabel: "DevOps",
      summary:
        "Automated delivery to production: cloud hosting, Docker containers, custom domains, and SSL certificates.",
      fullDescription:
        "Setting up continuous integration and deployment (CI/CD) pipelines so every git push automatically builds, tests, and deploys. The site is hosted on global edge networks (Vercel, AWS, Cloudflare) with HTTPS encryption and automatic backups.",
      keyDeliverables: [
        "Automated CI/CD Pipeline (GitHub Actions)",
        "Production Cloud Deployment with Custom Domain & SSL",
        "Database Backups, Environment Secrets & Monitoring",
      ],
      toolsUsed: ["Vercel", "Docker", "GitHub Actions", "AWS", "Cloudflare"],
      visualType: "deployment_pipeline",
    },
    {
      id: "launch",
      stepNumber: 9,
      row: 3,
      direction: "right",
      phase: "Phase 5: Quality Assurance & Launch",
      title: "9. Go Live! Launch & Continuous Evolution",
      shortTitle: "Launch! 🚀",
      iconName: "rocket",
      accent: "emerald",
      badgeLabel: "Go Live",
      summary:
        "Opening doors to the world: public rollout, real-time analytics, user feedback collection, and continuous iterations.",
      fullDescription:
        "The application is officially released! Real users start signing up, generating data, and using features. The team monitors error tracking (Sentry), analyzes conversion metrics, and plans the next sprint based on actual user feedback.",
      keyDeliverables: [
        "Public Launch & Marketing Announcement",
        "Real-Time Error Logging & Analytics Dashboard",
        "User Feedback Loop for Sprint 2 Enhancements",
      ],
      toolsUsed: ["Google Analytics", "Sentry", "PostHog", "Hotjar"],
      visualType: "launch_celebration",
    },
  ],
};

