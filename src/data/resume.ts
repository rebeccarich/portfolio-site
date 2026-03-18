export interface Job {
  title: string;
  company: string;
  period: string;
  description: string;
  bullets: string[];
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  url?: string;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  distinction?: string;
}

export interface SkillCategory {
  label: string;
  skills: string[];
}

export const name = "Rebecca Richards";
export const title = "Principal Frontend Engineer";
export const tagline = "Building interfaces humans actually enjoy using";
export const location = "Dublin, Ireland";
export const email = "rebeccarich1@gmail.com";
export const phone = "+353 87 269 7854";
export const github = "https://github.com/rebeccarich";
export const linkedin = "https://linkedin.com/in/becco";

export const bio =
  "Software Engineer with 15+ years professional experience building commercial products. Proven track record of launching new products in startup, scaleup and corporate environments. Experienced in leading engineers in large multidisciplinary teams, composed of Software Engineers, UX Designers and Product Managers.";

export const achievements = [
  "Led integration of in-house AI chatbot platform for natural language querying of business data into the company's frontend products.",
  "Directed a remote cross-functional team of 7 engineers as Engineering Director, overseeing performance reviews, mentorship and professional development.",
  "Launched HBC's first multi-banner responsive web app built on a custom server-side rendered microfrontend framework across five major retail banners.",
];

export const proficientSkills: SkillCategory[] = [
  {
    label: "Languages",
    skills: ["JavaScript", "TypeScript", "HTML", "CSS/SCSS"],
  },
  {
    label: "Frameworks",
    skills: ["React", "Vue", "Nuxt", "Node.js", "Express", "Fastify"],
  },
  { label: "Data", skills: ["GraphQL", "REST", "D3"] },
  { label: "Build", skills: ["Webpack", "Vite"] },
  { label: "Testing", skills: ["Jest", "Vitest", "Cypress", "Playwright"] },
];

export const exposureSkills: string[] = [
  "Angular",
  "Svelte",
  "Python",
  "Java",
  "PHP",
  "C#",
  "SQL",
  "AWS",
  "GCP",
];

export const experience: Job[] = [
  {
    title: "Principal Software Engineer",
    company: "Earnest Analytics / Consumer Edge",
    period: "June 2019 – Present",
    description:
      "Started with the company as a Senior SWE and progressed to Principal with time also spent as an Engineering Director.",
    bullets: [
      "Technical leadership for the frontend of Earnest's flagship SaaS product written in TypeScript using Nuxt and GraphQL.",
      "Led multiple projects: API gateway migration to TypeScript/GraphQL, Nuxt 2 to Nuxt 3 migration, AI chatbot integration, and built an MCP server for platform APIs.",
      "Working closely with Product to plan, estimate, and prioritise tasks and curate the product roadmap.",
      "As Engineering Director, led a remote multidisciplinary team of 7 Software Engineers, working with UX Designers and Product Managers.",
    ],
  },
  {
    title: "Software Engineer III",
    company: "Gilt / Hudson's Bay Company",
    period: "October 2017 – May 2019",
    description:
      "Worked on the Personalization team building personalized user experiences based on machine learning.",
    bullets: [
      "Launched HBC's first multi-banner responsive web app on a custom SSR microfrontend framework (Haru) using Node, Vue, and GraphQL.",
      "Built a feature enabling core frontend functionality to be written once with separate presentation layers per banner.",
      "Maintained design systems in Vue and React shared across multiple frontend apps.",
    ],
  },
  {
    title: "Senior Fullstack Engineer",
    company: "Each&Other",
    period: "July 2013 – October 2017",
    description:
      "Working with UX designers and product owners in a UX-led environment to build pixel-perfect interactions.",
    bullets: [
      "Worked on CMS integrations, mobile apps (iOS and Android), and responsive web apps (Node, Backbone, Ember).",
    ],
  },
  {
    title: "Web & Mobile App Developer",
    company: "Lucidity Digital",
    period: "April 2012 – June 2013",
    description: "",
    bullets: [],
  },
  {
    title: "Web Developer",
    company: "BrandTactics",
    period: "January 2011 – March 2012",
    description: "",
    bullets: [],
  },
];

export const projects: Project[] = [
  {
    name: "MCP Server",
    description:
      "Model Context Protocol server for accessing platform APIs via AI assistants.",
    tech: ["TypeScript", "Node.js", "MCP"],
  },
  {
    name: "Open Source Contributions",
    description:
      "Contributions to open source projects in the frontend ecosystem.",
    tech: ["TypeScript", "JavaScript", "Vue", "React"],
  },
];

export const education: Education[] = [
  {
    degree: "BSc Hons Computing Multimedia Systems & Web Design",
    school: "IADT",
    period: "2009 – 2010",
    distinction: "First Class Honours (1.1)",
  },
  {
    degree: "BSc Computing Multimedia Programming",
    school: "IADT",
    period: "2006 – 2009",
    distinction: "Distinction",
  },
];
