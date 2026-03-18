# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Rebecca Richards' single-page portfolio site with bento grid layout, light/dark theming, and whimsical micro-interactions.

**Architecture:** Vite + React 19 + TypeScript SPA. CSS Modules with custom properties for light/dark theming. Framer Motion for animations. All resume content in a typed data file. No routing, no SSR, no CSS framework.

**Tech Stack:** Vite, React 19, TypeScript, CSS Modules, CSS custom properties, Framer Motion, Google Fonts (Playfair Display + Inter)

**Spec:** `docs/superpowers/specs/2026-03-18-portfolio-site-design.md`

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/vite-env.d.ts`

- [ ] **Step 1: Scaffold Vite React TypeScript project**

Run:
```bash
npm create vite@latest . -- --template react-ts
```

Accept overwriting if prompted (directory is empty except docs).

- [ ] **Step 2: Install dependencies**

Run:
```bash
npm install framer-motion
```

- [ ] **Step 3: Verify dev server starts**

Run: `npm run dev`
Expected: Vite dev server starts, default React page renders at localhost.

- [ ] **Step 4: Clean up scaffolded files**

Remove default Vite content:
- Delete `src/App.css`, `src/index.css`, `src/assets/react.svg`, `public/vite.svg`
- Replace `src/App.tsx` with minimal shell:

```tsx
function App() {
  return <div>Portfolio</div>;
}

export default App;
```

- Update `src/main.tsx` to remove index.css import:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 5: Add Google Fonts to index.html**

Add to `<head>` in `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
```

Update `<title>` to "Rebecca Richards — Software Engineer".

- [ ] **Step 6: Verify clean app renders**

Run: `npm run dev`
Expected: Page shows "Portfolio" with no console errors.

- [ ] **Step 7: Commit**

```bash
git init && git add -A && git commit -m "feat: scaffold Vite React TypeScript project with framer-motion"
```

---

### Task 2: Theme System (CSS Custom Properties + Toggle Hook)

**Files:**
- Create: `src/theme/variables.css`
- Create: `src/theme/global.css`
- Create: `src/theme/useTheme.ts`

- [ ] **Step 1: Create CSS custom properties file**

Create `src/theme/variables.css`:

```css
:root {
  --color-bg: #fafafa;
  --color-bg-card: #ffffff;
  --color-text: #111111;
  --color-text-secondary: #666666;
  --color-accent: #663399;
  --color-accent-rgb: 102, 51, 153;
  --color-accent-subtle: rgba(102, 51, 153, 0.1);
  --color-accent-glow: rgba(102, 51, 153, 0.05);
  --color-border: #eeeeee;
  --color-nav-bg: rgba(250, 250, 250, 0.8);

  --font-heading: "Playfair Display", Georgia, serif;
  --font-body: "Inter", system-ui, sans-serif;

  --transition-theme: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

[data-theme="dark"] {
  --color-bg: #0a0a0a;
  --color-bg-card: #111111;
  --color-text: #f0f0f0;
  --color-text-secondary: #999999;
  --color-accent-subtle: rgba(102, 51, 153, 0.15);
  --color-accent-glow: rgba(102, 51, 153, 0.3);
  --color-border: rgba(102, 51, 153, 0.15);
  --color-nav-bg: rgba(10, 10, 10, 0.8);
}
```

- [ ] **Step 2: Create global CSS reset and base styles**

Create `src/theme/global.css`:

```css
@import "./variables.css";

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
  transition: var(--transition-theme);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  line-height: 1.2;
}

a {
  color: var(--color-accent);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--color-text);
}

::selection {
  background: rgba(102, 51, 153, 0.3);
  color: var(--color-text);
}
```

- [ ] **Step 3: Create useTheme hook**

Create `src/theme/useTheme.ts`:

```ts
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return { theme, toggleTheme };
}
```

- [ ] **Step 4: Import global CSS in main.tsx**

Update `src/main.tsx` — add `import "./theme/global.css";` before the App import.

- [ ] **Step 5: Wire useTheme into App**

Update `src/App.tsx`:

```tsx
import { useTheme } from "./theme/useTheme";

function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <button onClick={toggleTheme}>
        {theme === "light" ? "Dark" : "Light"}
      </button>
      <p>Portfolio — {theme} mode</p>
    </div>
  );
}

export default App;
```

- [ ] **Step 6: Verify theme toggle works**

Run: `npm run dev`
Expected: Page renders with theme colors. Clicking toggle switches between light (white bg) and dark (near-black bg). Refresh preserves choice.

- [ ] **Step 7: Commit**

```bash
git add src/theme/ src/main.tsx src/App.tsx && git commit -m "feat: add light/dark theme system with CSS custom properties"
```

---

### Task 3: Resume Data Layer

**Files:**
- Create: `src/data/resume.ts`

- [ ] **Step 1: Create typed resume data file**

Create `src/data/resume.ts` with all resume content as typed objects:

```ts
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
export const github = "https://github.com/rebeccarichards";
export const linkedin = "https://linkedin.com/in/rebeccarichards";

export const bio =
  "Software Engineer with 15+ years professional experience building commercial products. Proven track record of launching new products in startup, scaleup and corporate environments. Experienced in leading engineers in large multidisciplinary teams, composed of Software Engineers, UX Designers and Product Managers.";

export const achievements = [
  "Led integration of in-house AI chatbot platform for natural language querying of business data into the company's frontend products.",
  "Directed a remote cross-functional team of 7 engineers as Engineering Director, overseeing performance reviews, mentorship and professional development.",
  "Launched HBC's first multi-banner responsive web app built on a custom server-side rendered microfrontend framework across five major retail banners.",
];

export const proficientSkills: SkillCategory[] = [
  { label: "Languages", skills: ["JavaScript", "TypeScript", "HTML", "CSS/SCSS"] },
  { label: "Frameworks", skills: ["React", "Vue", "Nuxt", "Node.js", "Express", "Fastify"] },
  { label: "Data", skills: ["GraphQL", "REST", "D3"] },
  { label: "Build", skills: ["Webpack", "Vite"] },
  { label: "Testing", skills: ["Jest", "Vitest", "Cypress", "Playwright"] },
];

export const exposureSkills: string[] = [
  "Angular", "Svelte", "Python", "Java", "PHP", "C#", "SQL", "AWS", "GCP",
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
    description: "Model Context Protocol server for accessing platform APIs via AI assistants.",
    tech: ["TypeScript", "Node.js", "MCP"],
  },
  {
    name: "Open Source Contributions",
    description: "Contributions to open source projects in the frontend ecosystem.",
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
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/resume.ts && git commit -m "feat: add typed resume data layer"
```

---

### Task 4: BentoGrid and BentoCard Components

**Files:**
- Create: `src/components/BentoGrid/BentoGrid.tsx`
- Create: `src/components/BentoGrid/BentoGrid.module.css`
- Create: `src/components/BentoCard/BentoCard.tsx`
- Create: `src/components/BentoCard/BentoCard.module.css`

- [ ] **Step 1: Create BentoGrid component**

Create `src/components/BentoGrid/BentoGrid.tsx`:

```tsx
import { ReactNode } from "react";
import styles from "./BentoGrid.module.css";

interface BentoGridProps {
  children: ReactNode;
}

export function BentoGrid({ children }: BentoGridProps) {
  return <section className={styles.grid}>{children}</section>;
}
```

Create `src/components/BentoGrid/BentoGrid.module.css`:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Create BentoCard component with spotlight effect**

Create `src/components/BentoCard/BentoCard.tsx`:

```tsx
import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./BentoCard.module.css";

interface BentoCardProps {
  children: ReactNode;
  span?: "1" | "2" | "3" | "full";
  className?: string;
}

export function BentoCard({ children, span = "1", className = "" }: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      ref={ref}
      className={`${styles.card} ${styles[`span${span}`]} ${className}`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={styles.spotlight} />
      <div className={styles.content}>{children}</div>
    </motion.div>
  );
}
```

Create `src/components/BentoCard/BentoCard.module.css`:

```css
.card {
  position: relative;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
  transition: var(--transition-theme), transform 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  border-color: var(--color-accent);
}

.spotlight {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: radial-gradient(
    400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    var(--color-accent-glow),
    transparent 60%
  );
  pointer-events: none;
}

.card:hover .spotlight {
  opacity: 1;
}

.content {
  position: relative;
  padding: 1.75rem;
  z-index: 1;
}

.span1 {
  grid-column: span 1;
}

.span2 {
  grid-column: span 2;
}

.span3 {
  grid-column: span 3;
}

.spanfull {
  grid-column: 1 / -1;
}

@media (max-width: 1024px) {
  .span3 {
    grid-column: span 2;
  }
}

@media (max-width: 640px) {
  .span2,
  .span3,
  .spanfull {
    grid-column: span 1;
  }
}
```

- [ ] **Step 3: Verify with placeholder content in App**

Update `src/App.tsx` temporarily to render a BentoGrid with a few BentoCards containing placeholder text. Verify cards render, spotlight effect works on hover, and scroll-in animation triggers.

- [ ] **Step 4: Commit**

```bash
git add src/components/BentoGrid/ src/components/BentoCard/ src/App.tsx && git commit -m "feat: add BentoGrid and BentoCard components with spotlight effect"
```

---

### Task 5: ThemeToggle Component

**Files:**
- Create: `src/components/ThemeToggle/ThemeToggle.tsx`
- Create: `src/components/ThemeToggle/ThemeToggle.module.css`

- [ ] **Step 1: Create ThemeToggle with sun/moon morph animation**

Create `src/components/ThemeToggle/ThemeToggle.tsx`:

```tsx
import { motion } from "framer-motion";
import styles from "./ThemeToggle.module.css";

interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === "dark";

  return (
    <button
      className={styles.toggle}
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <motion.svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ rotate: isDark ? 360 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {isDark ? (
          <motion.g
            key="moon"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </motion.g>
        ) : (
          <motion.g
            key="sun"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </motion.g>
        )}
      </motion.svg>
    </button>
  );
}
```

Create `src/components/ThemeToggle/ThemeToggle.module.css`:

```css
.toggle {
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-text);
  transition: var(--transition-theme), border-color 0.2s ease;
}

.toggle:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
```

- [ ] **Step 2: Verify toggle renders and animates**

Wire ThemeToggle into App temporarily. Verify the sun/moon icon swaps with rotation animation, and theme colors change.

- [ ] **Step 3: Commit**

```bash
git add src/components/ThemeToggle/ && git commit -m "feat: add ThemeToggle component with sun/moon morph animation"
```

---

### Task 6: Nav Component

**Files:**
- Create: `src/components/Nav/Nav.tsx`
- Create: `src/components/Nav/Nav.module.css`

- [ ] **Step 1: Create sticky Nav with section links and mobile hamburger**

Create `src/components/Nav/Nav.tsx`:

```tsx
import { useState, useEffect } from "react";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import styles from "./Nav.module.css";

interface NavProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

const sections = ["about", "skills", "experience", "projects", "contact"];

export function Nav({ theme, onToggleTheme }: NavProps) {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo}>
          RR
        </a>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`${styles.links} ${menuOpen ? styles.show : ""}`}>
          {sections.map((id) => (
            <li key={id}>
              <button
                className={`${styles.link} ${active === id ? styles.active : ""}`}
                onClick={() => handleClick(id)}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </nav>
  );
}
```

Create `src/components/Nav/Nav.module.css`:

```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--color-nav-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  transition: var(--transition-theme);
}

.inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-accent);
  text-decoration: none;
}

.links {
  display: flex;
  gap: 0.25rem;
  list-style: none;
}

.link {
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.link:hover {
  color: var(--color-accent);
  background: var(--color-accent-subtle);
}

.link.active {
  color: var(--color-accent);
  font-weight: 500;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-text);
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 640px) {
  .hamburger {
    display: flex;
  }

  .links {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: var(--color-nav-bg);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--color-border);
    padding: 1rem;
    display: none;
  }

  .links.show {
    display: flex;
  }
}
```

- [ ] **Step 2: Verify nav renders**

Wire Nav into App. Verify sticky behavior, active section highlighting, mobile hamburger toggle.

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav/ && git commit -m "feat: add sticky Nav with active section tracking and mobile hamburger"
```

---

### Task 7: Hero Component

**Files:**
- Create: `src/components/Hero/Hero.tsx`
- Create: `src/components/Hero/Hero.module.css`

- [ ] **Step 1: Create Hero with staggered animation and shimmer effect**

Create `src/components/Hero/Hero.tsx`:

```tsx
import { motion } from "framer-motion";
import * as resume from "../../data/resume";
import styles from "./Hero.module.css";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Hero() {
  return (
    <section className={styles.hero}>
      <motion.div
        className={styles.content}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className={styles.name} variants={item}>
          {resume.name}
        </motion.h1>
        <motion.p className={styles.title} variants={item}>
          {resume.title}
        </motion.p>
        <motion.p className={styles.tagline} variants={item}>
          {resume.tagline}
        </motion.p>
      </motion.div>

      <motion.div
        className={styles.scrollIndicator}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}
```

Create `src/components/Hero/Hero.module.css`:

```css
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 1.5rem;
  position: relative;
}

.content {
  max-width: 700px;
}

.name {
  font-family: var(--font-heading);
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 700;
  line-height: 1.05;
  background: linear-gradient(
    135deg,
    var(--color-text) 0%,
    var(--color-accent) 50%,
    var(--color-text) 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 4s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% {
    background-position: 0% center;
  }
  50% {
    background-position: 100% center;
  }
}

.title {
  font-family: var(--font-body);
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: var(--color-accent);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-top: 1rem;
  font-weight: 500;
}

.tagline {
  font-family: var(--font-heading);
  font-style: italic;
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  color: var(--color-text-secondary);
  margin-top: 1.25rem;
}

.scrollIndicator {
  position: absolute;
  bottom: 2rem;
  color: var(--color-text-secondary);
}

@media (prefers-reduced-motion: reduce) {
  .name {
    animation: none;
  }
}
```

- [ ] **Step 2: Verify hero renders**

Wire Hero into App above the BentoGrid. Verify full-viewport height, staggered text entrance, shimmer animation on name, bouncing scroll indicator.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero/ && git commit -m "feat: add Hero component with staggered entrance and shimmer effect"
```

---

### Task 8: Section Components (About, Skills, Achievements)

**Files:**
- Create: `src/components/About/About.tsx`
- Create: `src/components/About/About.module.css`
- Create: `src/components/Skills/Skills.tsx`
- Create: `src/components/Skills/Skills.module.css`
- Create: `src/components/Achievements/Achievements.tsx`
- Create: `src/components/Achievements/Achievements.module.css`

- [ ] **Step 1: Create About component**

Create `src/components/About/About.tsx`:

```tsx
import { BentoCard } from "../BentoCard/BentoCard";
import * as resume from "../../data/resume";
import styles from "./About.module.css";

export function About() {
  return (
    <BentoCard span="2">
      <h2 className={styles.heading}>About</h2>
      <p className={styles.bio}>{resume.bio}</p>
      <div className={styles.details}>
        <a href={`mailto:${resume.email}`} className={styles.pill}>
          {resume.email}
        </a>
        <span className={styles.pill}>{resume.location}</span>
        <a href={resume.github} target="_blank" rel="noopener noreferrer" className={styles.pill}>
          GitHub
        </a>
        <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" className={styles.pill}>
          LinkedIn
        </a>
      </div>
    </BentoCard>
  );
}
```

Create `src/components/About/About.module.css`:

```css
.heading {
  font-size: 1.5rem;
  color: var(--color-accent);
  margin-bottom: 1rem;
}

.bio {
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin-bottom: 1.25rem;
}

.details {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.875rem;
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  border-radius: 100px;
  font-size: 0.8125rem;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.pill:hover {
  background: rgba(102, 51, 153, 0.2);
  color: var(--color-accent);
}
```

- [ ] **Step 2: Create Skills component**

Create `src/components/Skills/Skills.tsx`:

```tsx
import { motion } from "framer-motion";
import { BentoCard } from "../BentoCard/BentoCard";
import * as resume from "../../data/resume";
import styles from "./Skills.module.css";

export function Skills() {
  return (
    <BentoCard span="2">
      <h2 className={styles.heading}>Skills</h2>
      {resume.proficientSkills.map((cat) => (
        <div key={cat.label} className={styles.category}>
          <h3 className={styles.label}>{cat.label}</h3>
          <div className={styles.chips}>
            {cat.skills.map((skill) => (
              <motion.span
                key={skill}
                className={styles.chip}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      ))}
      <div className={styles.category}>
        <h3 className={styles.label}>Exposure</h3>
        <div className={styles.chips}>
          {resume.exposureSkills.map((skill) => (
            <span key={skill} className={`${styles.chip} ${styles.exposure}`}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
```

Create `src/components/Skills/Skills.module.css`:

```css
.heading {
  font-size: 1.5rem;
  color: var(--color-accent);
  margin-bottom: 1.25rem;
}

.category {
  margin-bottom: 1rem;
}

.category:last-child {
  margin-bottom: 0;
}

.label {
  font-family: var(--font-body);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.chip {
  display: inline-block;
  padding: 0.375rem 0.875rem;
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  border-radius: 100px;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: default;
  transition: background-color 0.2s ease;
}

.chip:hover {
  background: rgba(102, 51, 153, 0.2);
}

.chip.exposure {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
}

.chip.exposure:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
```

- [ ] **Step 3: Create Achievements component**

Create `src/components/Achievements/Achievements.tsx`:

```tsx
import { BentoCard } from "../BentoCard/BentoCard";
import * as resume from "../../data/resume";
import styles from "./Achievements.module.css";

export function Achievements() {
  return (
    <BentoCard>
      <h2 className={styles.heading}>Key Achievements</h2>
      <ul className={styles.list}>
        {resume.achievements.map((item, i) => (
          <li key={i} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}
```

Create `src/components/Achievements/Achievements.module.css`:

```css
.heading {
  font-size: 1.5rem;
  color: var(--color-accent);
  margin-bottom: 1rem;
}

.list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item {
  position: relative;
  padding-left: 1.25rem;
  color: var(--color-text-secondary);
  font-size: 0.9375rem;
  line-height: 1.7;
}

.item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.5em;
  width: 6px;
  height: 6px;
  background: var(--color-accent);
  border-radius: 50%;
}
```

- [ ] **Step 4: Wire About, Skills, Achievements into App inside BentoGrid**

Verify all three render correctly inside the bento grid with proper spanning.

- [ ] **Step 5: Commit**

```bash
git add src/components/About/ src/components/Skills/ src/components/Achievements/ src/App.tsx && git commit -m "feat: add About, Skills, and Achievements section components"
```

---

### Task 9: Experience Component

**Files:**
- Create: `src/components/Experience/Experience.tsx`
- Create: `src/components/Experience/Experience.module.css`

- [ ] **Step 1: Create Experience component with timeline layout**

Create `src/components/Experience/Experience.tsx`:

```tsx
import { BentoCard } from "../BentoCard/BentoCard";
import * as resume from "../../data/resume";
import styles from "./Experience.module.css";

export function Experience() {
  return (
    <BentoCard span="full">
      <h2 className={styles.heading}>Experience</h2>
      <div className={styles.timeline}>
        {resume.experience.map((job, i) => (
          <div key={i} className={styles.entry}>
            <div className={styles.dot} />
            <div className={styles.details}>
              <div className={styles.header}>
                <div>
                  <h3 className={styles.title}>{job.title}</h3>
                  <p className={styles.company}>{job.company}</p>
                </div>
                <span className={styles.period}>{job.period}</span>
              </div>
              {job.description && (
                <p className={styles.description}>{job.description}</p>
              )}
              {job.bullets.length > 0 && (
                <ul className={styles.bullets}>
                  {job.bullets.map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
```

Create `src/components/Experience/Experience.module.css`:

```css
.heading {
  font-size: 1.5rem;
  color: var(--color-accent);
  margin-bottom: 1.5rem;
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 5px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: var(--color-border);
}

.entry {
  position: relative;
  padding-bottom: 2rem;
}

.entry:last-child {
  padding-bottom: 0;
}

.dot {
  position: absolute;
  left: -2rem;
  top: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-accent);
  border: 2px solid var(--color-bg);
  z-index: 1;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.title {
  font-family: var(--font-body);
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--color-text);
}

.company {
  color: var(--color-accent);
  font-size: 0.9375rem;
  margin-top: 0.125rem;
}

.period {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.description {
  color: var(--color-text-secondary);
  font-size: 0.9375rem;
  line-height: 1.7;
  margin-top: 0.5rem;
}

.bullets {
  margin-top: 0.5rem;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.bullets li {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  line-height: 1.7;
}

@media (max-width: 640px) {
  .header {
    flex-direction: column;
    gap: 0.25rem;
  }
}
```

- [ ] **Step 2: Add Experience to App inside BentoGrid**

Verify timeline renders with proper layout, dots, and content.

- [ ] **Step 3: Commit**

```bash
git add src/components/Experience/ src/App.tsx && git commit -m "feat: add Experience component with timeline layout"
```

---

### Task 10: Projects, Education, and Contact Components

**Files:**
- Create: `src/components/Projects/Projects.tsx`
- Create: `src/components/Projects/Projects.module.css`
- Create: `src/components/Education/Education.tsx`
- Create: `src/components/Education/Education.module.css`
- Create: `src/components/Contact/Contact.tsx`
- Create: `src/components/Contact/Contact.module.css`

- [ ] **Step 1: Create Projects component**

Create `src/components/Projects/Projects.tsx`:

```tsx
import { BentoCard } from "../BentoCard/BentoCard";
import * as resume from "../../data/resume";
import styles from "./Projects.module.css";

export function Projects() {
  return (
    <>
      {resume.projects.map((project) => (
        <BentoCard key={project.name}>
          <h3 className={styles.name}>
            {project.url ? (
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                {project.name} <span className={styles.arrow}>&#8599;</span>
              </a>
            ) : (
              project.name
            )}
          </h3>
          <p className={styles.description}>{project.description}</p>
          <div className={styles.tags}>
            {project.tech.map((t) => (
              <span key={t} className={styles.tag}>
                {t}
              </span>
            ))}
          </div>
        </BentoCard>
      ))}
    </>
  );
}
```

Create `src/components/Projects/Projects.module.css`:

```css
.name {
  font-family: var(--font-body);
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.name a {
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.2s ease;
}

.name a:hover {
  color: var(--color-accent);
}

.arrow {
  font-size: 0.875rem;
  opacity: 0.5;
  transition: opacity 0.2s ease;
}

.name a:hover .arrow {
  opacity: 1;
}

.description {
  color: var(--color-text-secondary);
  font-size: 0.9375rem;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.625rem;
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  border-radius: 100px;
}
```

- [ ] **Step 2: Create Education component**

Create `src/components/Education/Education.tsx`:

```tsx
import { BentoCard } from "../BentoCard/BentoCard";
import * as resume from "../../data/resume";
import styles from "./Education.module.css";

export function Education() {
  return (
    <BentoCard>
      <h2 className={styles.heading}>Education</h2>
      <div className={styles.entries}>
        {resume.education.map((edu, i) => (
          <div key={i} className={styles.entry}>
            <h3 className={styles.degree}>{edu.degree}</h3>
            <p className={styles.school}>{edu.school}</p>
            <div className={styles.meta}>
              <span>{edu.period}</span>
              {edu.distinction && (
                <span className={styles.distinction}>{edu.distinction}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
```

Create `src/components/Education/Education.module.css`:

```css
.heading {
  font-size: 1.5rem;
  color: var(--color-accent);
  margin-bottom: 1rem;
}

.entries {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.degree {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text);
}

.school {
  color: var(--color-accent);
  font-size: 0.875rem;
  margin-top: 0.125rem;
}

.meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.375rem;
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

.distinction {
  padding: 0.125rem 0.5rem;
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  border-radius: 100px;
  font-size: 0.75rem;
}
```

- [ ] **Step 3: Create Contact component**

Create `src/components/Contact/Contact.tsx`:

```tsx
import { BentoCard } from "../BentoCard/BentoCard";
import * as resume from "../../data/resume";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <BentoCard span="full">
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>Let's build something together</h2>
        <p className={styles.subtext}>
          Always interested in hearing about new opportunities, interesting projects,
          or just a good chat about frontend engineering.
        </p>
        <div className={styles.links}>
          <a href={`mailto:${resume.email}`} className={styles.cta}>
            Say hello
          </a>
          <a
            href={resume.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GitHub
          </a>
          <a
            href={resume.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </BentoCard>
  );
}
```

Create `src/components/Contact/Contact.module.css`:

```css
.wrapper {
  text-align: center;
  padding: 2rem 0;
}

.heading {
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  color: var(--color-text);
  margin-bottom: 0.75rem;
}

.subtext {
  color: var(--color-text-secondary);
  font-size: 1rem;
  line-height: 1.7;
  max-width: 500px;
  margin: 0 auto 1.5rem;
}

.links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 2rem;
  background: var(--color-accent);
  color: white;
  border-radius: 100px;
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(102, 51, 153, 0.4);
  color: white;
}

.link {
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 100px;
  color: var(--color-text-secondary);
  font-size: 0.9375rem;
  text-decoration: none;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.link:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
```

- [ ] **Step 4: Add all three to App**

Wire Projects, Education, Contact into the BentoGrid. Add a "Projects" heading above the project cards.

- [ ] **Step 5: Commit**

```bash
git add src/components/Projects/ src/components/Education/ src/components/Contact/ src/App.tsx && git commit -m "feat: add Projects, Education, and Contact section components"
```

---

### Task 11: Final App Assembly and Section IDs

**Files:**
- Modify: `src/App.tsx`
- Create: `src/App.module.css`
- Create: `public/favicon.svg`

- [ ] **Step 1: Assemble final App.tsx**

Update `src/App.tsx` to compose all components with proper section IDs for nav scrolling:

```tsx
import { useTheme } from "./theme/useTheme";
import { Nav } from "./components/Nav/Nav";
import { Hero } from "./components/Hero/Hero";
import { BentoGrid } from "./components/BentoGrid/BentoGrid";
import { About } from "./components/About/About";
import { Skills } from "./components/Skills/Skills";
import { Achievements } from "./components/Achievements/Achievements";
import { Experience } from "./components/Experience/Experience";
import { Projects } from "./components/Projects/Projects";
import { Education } from "./components/Education/Education";
import { Contact } from "./components/Contact/Contact";
import styles from "./App.module.css";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <Hero />
      <main>
        <BentoGrid>
          <div id="about" className={styles.section}>
            <About />
          </div>
          <div id="skills" className={styles.section}>
            <Skills />
          </div>
          <Achievements />
          <div id="experience" className={styles.section}>
            <Experience />
          </div>
          <div id="projects" className={styles.sectionHeading}>
            <h2 className={styles.heading}>Projects</h2>
          </div>
          <Projects />
          <Education />
          <div id="contact" className={styles.section}>
            <Contact />
          </div>
        </BentoGrid>
      </main>
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Rebecca Richards</p>
      </footer>
    </>
  );
}

export default App;
```

Note: The section IDs and grid layout will need adjustment during implementation to ensure the bento cards span correctly and section IDs are placed on the right elements for scroll-spy to work. The wrapper divs above are a starting point — the implementer should place `id` attributes directly on the BentoCard or a wrapping element that the IntersectionObserver can target.

Create `src/App.module.css`:

```css
.section {
  display: contents;
}

.sectionHeading {
  grid-column: 1 / -1;
  padding-top: 1rem;
}

.heading {
  font-size: 1.75rem;
  color: var(--color-accent);
}

.footer {
  text-align: center;
  padding: 2rem;
  color: var(--color-text-secondary);
  font-size: 0.8125rem;
  border-top: 1px solid var(--color-border);
}
```

- [ ] **Step 2: Create favicon**

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#663399"/>
  <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Georgia, serif" font-size="18" font-weight="bold" fill="white">RR</text>
</svg>
```

Update `index.html` — replace existing favicon link with:
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

- [ ] **Step 3: Verify full page**

Run: `npm run dev`
Expected: Full portfolio renders — hero, all bento sections, nav scrolling works, theme toggle works, animations fire on scroll, spotlight effect on card hover.

- [ ] **Step 4: Verify production build**

Run: `npm run build && npm run preview`
Expected: Production build succeeds, preview serves correctly.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/App.module.css public/favicon.svg index.html && git commit -m "feat: assemble final portfolio layout with all sections"
```

---

### Task 12: Polish and Reduced Motion

**Files:**
- Modify: `src/theme/global.css`
- Modify: various component CSS as needed

- [ ] **Step 1: Add prefers-reduced-motion global rules**

Add to `src/theme/global.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Visual review and polish**

Open the site in the browser and review:
- Both light and dark modes look correct
- Bento grid responsive at desktop/tablet/mobile breakpoints
- All animations smooth and not janky
- Nav scroll-spy tracks the right section
- Typography hierarchy is clear
- Spacing is consistent
- No overflow issues on mobile

Fix any issues found during review.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add reduced motion support and final polish"
```
