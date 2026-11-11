export interface IntroSection {
  title: string;
  items: string[];
}

export interface IntroContent {
  heading: string;
  left: IntroSection;
  right: IntroSection;
}

export const introContent: IntroContent = {
  heading: "What you will get from this workshop",
  left: {
    title: "Web Development Fundamentals",
    items: [
      "What is a website?",
      "Types of websites",
      "Native Apps vs. Web Applications",
      "How the web works (Browser to Server)",
      "Frontend, Backend & Database",
      "Hosting, DNS & Domain names",
      "Understanding Data Flow",
      "Static vs. Dynamic websites",
    ],
  },
  right: {
    title: "The Development Lifecycle",
    items: [
      "Idea conception and brainstorming",
      "Requirements specification (Cahier des Charges) & MVP",
      "UI/UX Design and wireframing",
      "System architecture and planning",
      "Full-stack development (Frontend & Backend)",
      "Testing, deployment, and launch",
    ],
  },
};
