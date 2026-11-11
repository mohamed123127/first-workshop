export interface TeamPillar {
  id: string;
  number: string;
  title: string;
  icon: "users" | "messageCircle" | "gitPullRequest" | "checkCircle" | "target";
  summary: string;
  proTip: string;
  deliverable: string;
  accent: "cyan" | "indigo" | "emerald" | "amber";
}

export interface GitConceptStep {
  step: number;
  label: string;
  cmd: string;
  title: string;
  desc: string;
  analogy: string;
  whoRunsIt: "Each Developer" | "Cloud / GitHub" | "Team Reviewer";
  accent: "cyan" | "indigo" | "emerald" | "amber";
}

export interface TeamworkGitContent {
  eyebrow: string;
  badge: string;
  title: string;
  subtitle: string;
  teamworkTitle: string;
  gitTitle: string;
  pillars: TeamPillar[];
  gitSteps: GitConceptStep[];
}

export const teamworkGitContent: TeamworkGitContent = {
  eyebrow: "Module 05 · Essential Professional Skills",
  badge: "Slide 09",
  title: "Things Good to Know",
  subtitle:
    "How modern engineering teams collaborate smoothly, and how Git & GitHub keep everyone in sync without overwriting each other's work.",
  teamworkTitle: "1. How to Work as a Team?",
  gitTitle: "2. What is Git & GitHub?",
  pillars: [
    {
      id: "division",
      number: "01",
      title: "Task Division & Ownership",
      icon: "target",
      summary:
        "Break the project into small, independent pieces. One person handles UI/Design, another handles API endpoints, another builds the database.",
      proTip: "Avoid two people editing the exact same file simultaneously.",
      deliverable: "Kanban Board / Task Checklist",
      accent: "cyan",
    },
    {
      id: "communication",
      number: "02",
      title: "Daily Sync & Open Questions",
      icon: "messageCircle",
      summary:
        "Talk frequently. A 5-minute sync ('What did I do? What will I do next? Am I blocked?') prevents days of wasted effort.",
      proTip: "If you are stuck for more than 30 minutes, ask your teammates for help.",
      deliverable: "Quick Standup / Discord Channel",
      accent: "indigo",
    },
    {
      id: "code-review",
      number: "03",
      title: "Peer Code Review",
      icon: "gitPullRequest",
      summary:
        "No code goes straight to production. A teammate reads your changes, tests the feature, and gives constructive feedback before merging.",
      proTip: "Reviewing code is teaching & learning together, not catching mistakes to judge.",
      deliverable: "GitHub Pull Request (PR)",
      accent: "emerald",
    },
    {
      id: "standards",
      number: "04",
      title: "Agreed Standards & Structure",
      icon: "checkCircle",
      summary:
        "Agree on folder structures, component naming conventions, and branch names (e.g. feature/navbar, fix/auth-bug) from day one.",
      proTip: "Consistency makes any codebase feel like it was written by one brilliant mind.",
      deliverable: "README.md & Conventions Guide",
      accent: "amber",
    },
  ],
  gitSteps: [
    {
      step: 1,
      label: "Sandbox Branch",
      cmd: "git checkout -b feature/login",
      title: "1. Branch: Create Your Own Safe Sandbox",
      desc: "Never write directly on 'main'. A branch is a parallel universe where you can experiment, build, and make mistakes without breaking the app.",
      analogy: "Like creating a copy of a Google Doc before rewriting paragraphs.",
      whoRunsIt: "Each Developer",
      accent: "cyan",
    },
    {
      step: 2,
      label: "Save Checkpoint",
      cmd: "git commit -m 'feat: add login modal'",
      title: "2. Commit: Save Meaningful Milestones",
      desc: "A commit is a permanent snapshot in your project's time machine. Each commit has a clear message explaining what changed and why.",
      analogy: "Like a game checkpoint / save point you can always return to.",
      whoRunsIt: "Each Developer",
      accent: "indigo",
    },
    {
      step: 3,
      label: "Cloud Upload",
      cmd: "git push origin feature/login",
      title: "3. Push: Send Work to GitHub Cloud",
      desc: "Your computer uploads your new branch and commits to GitHub's cloud servers so your teammates can access your code.",
      analogy: "Like uploading local photos to a shared shared album.",
      whoRunsIt: "Each Developer",
      accent: "amber",
    },
    {
      step: 4,
      label: "Team Review & Merge",
      cmd: "Open Pull Request (PR) ➔ Merge into main",
      title: "4. Pull Request: The Team Discussion & Merge",
      desc: "On GitHub, you ask: 'Teammates, please review my feature!' Once approved, GitHub cleanly merges your branch into the main project.",
      analogy: "Like submitting a draft to your editor for approval before printing.",
      whoRunsIt: "Team Reviewer",
      accent: "emerald",
    },
  ],
};
