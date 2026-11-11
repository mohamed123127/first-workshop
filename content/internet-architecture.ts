export interface AnimationJourneyStep {
  id: number;
  title: string;
  shortLabel: string;
  description: string;
  activeNodes: Array<"user" | "domain" | "dns" | "hosting" | "frontend" | "backend" | "db">;
  activePath: string;
  tag: string;
  badgeColor: "cyan" | "indigo" | "amber" | "emerald";
  packetDirection: "forward" | "backward" | "internal";
}

export interface RevealPhase {
  phase: number;
  label: string;
  title: string;
  description: string;
  revealedNodes: Array<"hosting" | "user" | "domain" | "dns">;
}

export interface InternetArchitectureContent {
  title: string;
  eyebrow: string;
  badge: string;
  publicIp: string;
  domain: string;
  ipExplanation: {
    sentence1: string;
    command: string;
    output: string;
  };
  revealPhases: RevealPhase[];
  journeySteps: AnimationJourneyStep[];
}

export const internetArchitectureContent: InternetArchitectureContent = {
  title: "From Development to the Internet",
  eyebrow: "Module 05 · Global Network & Deployment Architecture",
  badge: "Slide 08",
  publicIp: "195.154.122.89",
  domain: "devup-club.dz",
  ipExplanation: {
    sentence1: "An IP address (Internet Protocol address) is a unique numerical identifier assigned to a device on a network. It allows devices to identify each other and communicate over the internet, just like a home address helps locate a house.",
    command: "curl ifconfig.me",
    output: "195.154.122.89",
  },
  revealPhases: [
    {
      phase: 1,
      label: "Origin Server",
      title: "1. The Hosting Server",
      description: "Deployed in the cloud with a unique Public IP address (195.154.122.89), running Frontend, Backend, and Database.",
      revealedNodes: ["hosting"],
    },
    {
      phase: 2,
      label: "Google Search",
      title: "2. Google Search & Client User",
      description: "The user searches 'devup club' on Google and gets the top result pointing to devup-club.dz.",
      revealedNodes: ["hosting", "user"],
    },
    {
      phase: 3,
      label: "Domain Name",
      title: "3. The Domain Name",
      description: "Remembering numbers like '195.154.122.89' is hard. Instead, humans use domain names like 'devup-club.dz'.",
      revealedNodes: ["hosting", "user", "domain"],
    },
    {
      phase: 4,
      label: "DNS Resolver",
      title: "4. The DNS Resolver",
      description: "The Internet's phonebook translates 'devup-club.dz' into our server's IP address (195.154.122.89). Complete network connected!",
      revealedNodes: ["hosting", "user", "domain", "dns"],
    },
  ],
  journeySteps: [
    {
      id: 1,
      title: "1. User enters the domain",
      shortLabel: "Domain Entry",
      description: "User types 'devup-club.dz' in their browser address bar and presses Enter.",
      activeNodes: ["user", "domain"],
      activePath: "user-domain",
      tag: "Browser Ingress",
      badgeColor: "cyan",
      packetDirection: "forward",
    },
    {
      id: 2,
      title: "2. DNS resolves domain to IP",
      shortLabel: "DNS Translation",
      description: "DNS server translates 'devup-club.dz' into Public IP 195.154.122.89 in < 20 ms.",
      activeNodes: ["domain", "dns"],
      activePath: "domain-dns",
      tag: "A Record → 195.154.122.89",
      badgeColor: "indigo",
      packetDirection: "forward",
    },
    {
      id: 3,
      title: "3. Request reaches hosting server",
      shortLabel: "Server Route",
      description: "Network routers route packets directly to the Hosting Server at Public IP 195.154.122.89.",
      activeNodes: ["dns", "hosting"],
      activePath: "dns-hosting",
      tag: "HTTP / TLS Ingress",
      badgeColor: "cyan",
      packetDirection: "forward",
    },
    {
      id: 4,
      title: "4. Backend processes & queries DB",
      shortLabel: "Application Execution",
      description: "Next.js SSR renders HTML; NestJS API handles authentication and queries PostgreSQL on port 5432.",
      activeNodes: ["hosting", "frontend", "backend", "db"],
      activePath: "hosting-internal",
      tag: "Next.js → NestJS → PostgreSQL",
      badgeColor: "amber",
      packetDirection: "internal",
    },
    {
      id: 5,
      title: "5. Response returns to browser",
      shortLabel: "Response Return",
      description: "Rendered HTML, styles, and session cookie stream back to user's browser, displaying DevUp Club instantly!",
      activeNodes: ["hosting", "user"],
      activePath: "hosting-user",
      tag: "200 OK · Page Rendered",
      badgeColor: "emerald",
      packetDirection: "backward",
    },
  ],
};
