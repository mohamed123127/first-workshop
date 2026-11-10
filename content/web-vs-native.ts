export interface PlatformStat {
  label: string;
  value: string;
}

export interface PlatformSections {
  benefitsTitle: string;
  benefits: string[];
  useCasesTitle: string;
  useCases: string[];
  limitationsTitle: string;
  limitations: string[];
  ecosystemTitle: string;
  ecosystem: string[];
}

export interface PlatformDetails {
  id: string;
  badge: string;
  badgeStep: string;
  title: string;
  subtitle: string;
  description: string;
  accent: "cyan" | "indigo";
  imageSrc?: string;
  imageAlt?: string;
  images?: (string | { src: string; alt?: string; caption?: string })[];
  placeholderLabel: string;
  stats: PlatformStat[];
  sections: PlatformSections;
  cta?: {
    text: string;
    subtext?: string;
  };
}

export interface WebVsNativeContent {
  eyebrow: string;
  badge: string;
  question: string;
  description: string;
  scrollHint: string;
  webPlatform: PlatformDetails;
  nativePlatform: PlatformDetails;
}

export const webVsNativeContent: WebVsNativeContent = {
  eyebrow: "Module 01 · Architectural Comparison",
  badge: "Slide 04",
  question: "Web App vs Mobile & Desktop: Which One Should You Build?",
  description:
    "Every digital product begins with a critical choice: build universally for the open web, or target native operating systems directly. Compare their reach, performance, distribution mechanics, and technical trade-offs to choose the right foundation.",
  scrollHint: "Scroll container to explore benefits, use cases & trade-offs ↓",
 webPlatform: {
    id: "web",
    badge: "Instant Access & Freedom",
    imageSrc: "/images/web.jpg",
    badgeStep: "Platform A",
    title: "Web Applications",
    subtitle: "No Installation · Works Everywhere · Easy Updates",
    description:
      "Runs instantly inside any browser on any device without downloading from app stores.",
    accent: "cyan",
    placeholderLabel: "Web App Architecture & Browser Mockup",
    stats: [
      { label: "Reach", value: "All Devices" },
      { label: "Updates", value: "Instant" },
      { label: "Access", value: "URL Link" },
    ],
    sections: {
      benefitsTitle: "Why Web Apps?",
      benefits: [
        "Open instantly via a link with zero downloads or installation",
        "One single codebase works on Windows, Mac, and mobile",
        "Update your app and push fixes to users in seconds",
        "No app store fees, approvals, or waiting periods",
        "Easy to find on Google (SEO) and share anywhere",
      ],
      useCasesTitle: "Best Used For",
      useCases: [
        "SaaS platforms, dashboards, and business tools",
        "Online stores and e-commerce websites",
        "Blogs, communities, and documentation",
        "Startups launching an MVP quickly",
      ],
      limitationsTitle: "Challenges",
      limitations: [
        "Limited access to device hardware (like deep bluetooth or sensors)",
        "Requires internet connection (can be fixed with PWAs)",
        "Slower performance for heavy 3D games or heavy software",
      ],
      ecosystemTitle: "Technologies & Ecosystem",
      ecosystem: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "WebAssembly",
      ],
    },
    cta: {
      text: "Let's explore the web",
      subtext: "Ready to dive into the modern web ecosystem →",
    },
  },
 nativePlatform: {
    id: "native",
    badge: "Hardware Power & Offline Mode",
    badgeStep: "Platform B",
    title: "Mobile & Desktop Apps",
      imageSrc :"/images/desk.jpg",
    subtitle: "Deep OS Integration · High Performance · Works Offline",
    description:
      "Installed directly on the device with full access to hardware and offline storage.",
    accent: "indigo",
    placeholderLabel: "Native Mobile & Desktop Mockup",
    stats: [
      { label: "Hardware", value: "Full Access" },
      { label: "Offline", value: "Fully Supported" },
      { label: "Performance", value: "Maximum" },
    ],
    sections: {
      benefitsTitle: "Why Native Apps?",
      benefits: [
        "Full access to device hardware (camera, Bluetooth, sensors, biometrics)",
        "Maximum speed and smooth performance via compiled code",
        "Works completely offline with local storage",
        "Push notifications and smooth home-screen presence",
        "Monetization through App Store and Google Play billing",
      ],
      useCasesTitle: "Best Used For",
      useCases: [
        "High-performance 3D games and heavy graphics apps",
        "Video editing, audio production, and 3D modeling tools",
        "Apps needing complete offline reliability in the field",
        "Apps that rely heavily on device sensors and biometrics",
      ],
      limitationsTitle: "Challenges",
      limitations: [
        "Requires building and maintaining separate codebases for iOS and Android",
        "App store review delays and 15%–30% platform fees",
        "Users have to download, install, and manually update the app",
      ],
      ecosystemTitle: "Technologies & Ecosystem",
      ecosystem: [
        "Swift / SwiftUI",
        "Kotlin / Jetpack",
        "Flutter",
        "React Native",
        "Rust",
        "Electron",
      ],
    },
  },
};

