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
      "Mobile / Desktop apps vs. Web apps",
      "What is the Frontend?",
      "What is the Backend?",
      "What is a Database?",
      "Understanding Data Flow",
      "Static vs. Dynamic websites"
    ],
  },
  right: {
    title: "The Development Lifecycle",
    items: [
      "Idea conception and brainstorming",
      "Requirements specification (Cahier des Charges) & MVP definition",
      "UI/UX Design and wireframing",
      "System architecture and planning",
      "Full-stack development (Frontend & Backend)",
      "Testing, deployment, and launch",
    ],
  },
};

