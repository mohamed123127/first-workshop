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
    title: "General idea about web dev",
    items: [
      "What is a website",
      "Types of websites",
      "Mobile / Desktop app vs Web app",
      "What is Frontend",
      "What is Backend",
      "What is a Database",
      "Data flow",
    ],
  },
  right: {
    title: "From idea to final product",
    items: [
      "Getting the idea and brainstorming it",
      "Requirements document (cahier des charges) and MVP",
      "Design (UI/UX)",
      "Architecture",
      "Coding the frontend and backend",
      "Deployment",
    ],
  },
};

