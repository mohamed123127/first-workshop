export interface SummaryPillar {
  id: string;
  stepRange: string;
  title: string;
  tagline: string;
  icon: "globe" | "layers" | "server" | "rocket" | "git" | "compass";
  keyTakeaways: string[];
  formula: string;
  accent: "cyan" | "indigo" | "emerald" | "amber";
}

export interface GrandSummaryContent {
  eyebrow: string;
  badge: string;
  title: string;
  subtitle: string;
  corePillars: SummaryPillar[];
  keyMindsetQuote: {
    quote: string;
    author: string;
    role: string;
  };
  nextSteps: Array<{
    title: string;
    desc: string;
    icon: string;
  }>;
}

export const grandSummaryContent: GrandSummaryContent = {
  eyebrow: "Slide 10 · Workshop Wrap-Up & Grand Finale",
  badge: "Slide 10",
  title: "Workshop Summary: The Full Journey",
  subtitle:
    "Everything we explored today: from how browsers talk to servers, to architecting complete products and working together with Git.",
  corePillars: [
    {
      id: "web-foundations",
      stepRange: "Slides 03 - 05",
      title: "1. The Web & Internet Pipeline",
      tagline: "Clients, DNS & Hosting Infrastructure",
      icon: "globe",
      keyTakeaways: [
        "A website is files (HTML, CSS, JS) served globally over the internet.",
        "DNS acts like a phonebook, translating human domain names to server IP addresses.",
        "Web apps win on universal reach across any device with zero app-store barrier.",
      ],
      formula: "Browser ➔ DNS (1.1.1.1) ➔ Server IP ➔ Render UI",
      accent: "cyan",
    },
    {
      id: "client-server",
      stepRange: "Slide 07",
      title: "2. Frontend vs Backend Architecture",
      tagline: "The Immutable Request / Response Cycle",
      icon: "server",
      keyTakeaways: [
        "Frontend (Client) = What the user sees & interacts with (Chrome, React, Next.js).",
        "Network = Secure encrypted highway (HTTPS / TLS 1.3 / JSON payloads).",
        "Backend (Server) & Database = Brain & permanent memory (Validation, SQL, Security).",
      ],
      formula: "Client (Input) ➔ POST Request ➔ Server Logic & DB ➔ JSON Response",
      accent: "indigo",
    },
    {
      id: "project-lifecycle",
      stepRange: "Slide 08",
      title: "3. The 9-Step Project Lifecycle",
      tagline: "From Idea Conception to Live Production",
      icon: "rocket",
      keyTakeaways: [
        "Phase 1: Idea ➔ Brainstorming ➔ Cahier des Charges (MVP specification).",
        "Phase 2: UI/UX Design System (Colors, typography, wireframes) ➔ Architecture.",
        "Phase 3: Coding (Frontend + Backend) ➔ Automated Testing ➔ Cloud Deployment & Launch.",
      ],
      formula: "80% Planning & Architecture + 20% Writing Code = Success",
      accent: "emerald",
    },
    {
      id: "teamwork-git",
      stepRange: "Slide 09",
      title: "4. Professional Teamwork & Git",
      tagline: "Collaboration Without Merge Conflicts",
      icon: "git",
      keyTakeaways: [
        "Git (Local) = Your personal time-machine version control.",
        "GitHub (Cloud) = The social team hub for code reviews and repositories.",
        "The golden loop: Branch safe sandbox ➔ Frequent commits ➔ Push ➔ Pull Request review.",
      ],
      formula: "git checkout -b feature ➔ commit ➔ push ➔ PR ➔ Merge",
      accent: "amber",
    },
  ],
  keyMindsetQuote: {
    quote:
      "Software engineering isn't just about writing code; it's about solving real human problems through clear design, solid architecture, and strong teamwork.",
    author: "Mohamed Louahchi & Nazim Benali",
    role: "Instructors · DevUp Workshop 2026",
  },
  nextSteps: [
    {
      title: "Build Your First MVP",
      desc: "Pick an idea, write a 1-page Cahier des Charges, and start building in small increments.",
      icon: "Hammer",
    },
    {
      title: "Master Git on GitHub",
      desc: "Create repositories, practice branching, and collaborate on open-source with your peers.",
      icon: "GitBranch",
    },
    {
      title: "Explore Full-Stack Next.js",
      desc: "Connect React frontends to real REST APIs and databases like PostgreSQL or Supabase.",
      icon: "Code2",
    },
  ],
};

