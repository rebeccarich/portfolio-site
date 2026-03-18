# Portfolio Site Design Spec

## Overview

A single-page resume/portfolio site for Rebecca Richards, Principal Frontend Engineer with 15+ years experience. Built with React, TypeScript, and Vite. Features light/dark mode with rebeccapurple as the accent color, a bento grid layout, and whimsical micro-interactions.

## Tech Stack

- **Vite** — build tool and dev server
- **React 19** — UI framework
- **TypeScript** — type safety
- **CSS Modules + CSS custom properties** — styling and theming (no CSS framework)
- **Framer Motion** — animations and scroll-triggered reveals
- **Google Fonts** — Playfair Display (headings) + Inter or DM Sans (body)

No SSR, no routing library, no CSS framework. Single page, static output.

## Page Structure

### Layout

Hero section at full viewport height, followed by a bento grid layout for all remaining sections. The bento grid uses CSS Grid with varying card sizes based on content importance.

- Desktop: 2-3 column bento grid
- Tablet: 2 column grid
- Mobile: single column stack

### Navigation

Sticky top nav bar with section links (About, Skills, Experience, Projects, Contact) and a light/dark theme toggle. Smooth scroll to sections on click. Active section highlights as user scrolls. On mobile, nav collapses to a hamburger menu.

### Sections

#### 1. Hero

Full viewport height. Large, expressive typography.

- Name: "Rebecca Richards" in Playfair Display (serif), large
- Title: "Principal Frontend Engineer" in Inter (sans-serif), smaller, rebeccapurple
- Tagline: A witty one-liner, e.g., "Building interfaces humans actually enjoy using"
- Subtle rebeccapurple gradient shimmer on the name text
- Animated entrance (fade-in / staggered reveal)
- Scroll-down indicator with playful bounce animation

#### 2. About (Bento Card)

- Adapted bio from resume: "Software Engineer with 15+ years experience building commercial products. Proven track record launching products in startup, scaleup, and corporate environments. Experienced leading engineers in large multidisciplinary teams."
- Contact info as icon pills: email (rebeccarich1@gmail.com), phone (+353 87 269 7854), location (Dublin, Ireland)
- Links: GitHub, LinkedIn

#### 3. Skills (Bento Card)

Tech skills displayed as pill/chip elements grouped by category:

**Proficient:**
- Languages: JavaScript, TypeScript, HTML, CSS/SCSS
- Frameworks: React, Vue, Nuxt, Node.js, Express, Fastify
- Data: GraphQL, REST, D3
- Build: Webpack, Vite
- Testing: Jest, Vitest, Cypress, Playwright

**Exposure:**
- Angular, Svelte, Python, Java, PHP, C#, SQL, AWS, GCP

Each chip has a subtle hover animation (color shift or gentle pulse).

#### 4. Key Achievements (Bento Card)

Highlighted separately from experience for visual impact:

- Led integration of AI chatbot platform for natural language querying of business data
- Directed a remote cross-functional team of 7 engineers as Engineering Director
- Launched HBC's first multi-banner responsive web app on a custom SSR microfrontend framework

#### 5. Experience (Large Bento Card — full width or spanning 2 columns)

Timeline-style layout with 4 roles, most recent expanded:

**Principal Software Engineer — Earnest Analytics / Consumer Edge** (June 2019 – Present)
- Started as Senior SWE, progressed to Principal, also served as Engineering Director
- Technical leadership for flagship SaaS product (TypeScript, Nuxt, GraphQL)
- Led API gateway migration to TypeScript/GraphQL, Nuxt 2 to 3 migration, AI chatbot integration, built MCP server
- As Engineering Director: led 7-person multidisciplinary team, mentorship, performance reviews, product roadmap collaboration

**Software Engineer III — Gilt / Hudson's Bay Company** (October 2017 – May 2019)
- Personalization team, ML-driven user experiences across 5 retail banners
- Launched first multi-banner responsive web app on custom SSR microfrontend framework (Haru)
- Maintained design systems in Vue and React across microfrontend architecture

**Senior Fullstack Engineer — Each&Other** (July 2013 – October 2017)
- UX-led environment, pixel-perfect interactions
- CMS integrations, mobile apps, responsive web apps (Node, Backbone, Ember)

**Earlier roles** (2011 – 2013)
- Web & Mobile App Developer at Lucidity Digital
- Web Developer at BrandTactics

#### 6. Projects (Bento Cards)

Featured projects as individual cards. Each card includes:
- Project name
- Short description
- Tech tags
- Link (GitHub or live)

Projects to feature: open source work, MCP server, and other notable projects from Rebecca's GitHub.

#### 7. Contact (Bento Card)

- Email: rebeccarich1@gmail.com
- LinkedIn link
- GitHub link
- Fun CTA: "Let's build something together" or similar
- Phone number optional (can be excluded for public site — to confirm with Rebecca)

#### 8. Education (Small Bento Card)

- BSc Hons Computing Multimedia Systems & Web Design (1.1) — IADT, 2009–2010
- BSc Computing Multimedia Programming (Distinction) — IADT, 2006–2009

## Theming

### CSS Custom Properties

All colors defined as CSS custom properties on `:root` and `[data-theme="dark"]`:

**Light mode (default):**
- Background: #fafafa / #ffffff
- Text: #111111
- Secondary text: #666666
- Accent: rebeccapurple (#663399)
- Accent subtle: rgba(102, 51, 153, 0.1)
- Card background: #ffffff
- Card border: #eeeeee

**Dark mode:**
- Background: #0a0a0a
- Text: #f0f0f0
- Secondary text: #999999
- Accent: rebeccapurple (#663399)
- Accent glow: rgba(102, 51, 153, 0.3) (used for subtle glow effects)
- Card background: #111111
- Card border: rgba(102, 51, 153, 0.15)

### Theme Toggle

- Sun/moon icon button in the nav bar
- Satisfying rotation/morph animation on toggle (whimsy moment)
- Persisted to `localStorage`
- Respects `prefers-color-scheme` as initial default

## Typography

- **Headings:** Playfair Display (serif) — gives personality, editorial feel
- **Body:** Inter (sans-serif) — clean, highly readable
- Loaded via Google Fonts
- The serif/sans-serif mix creates visual contrast and warmth

## Animations & Whimsy

All animations use Framer Motion and respect `prefers-reduced-motion`.

- **Scroll reveals:** Each bento card fades/slides in as it enters the viewport
- **Hero entrance:** Staggered text animation on load
- **Name shimmer:** Subtle rebeccapurple gradient animation on the hero name
- **Skill chips:** Gentle color shift or pulse on hover
- **Bento card spotlight:** Subtle cursor-following glow/highlight effect on cards
- **Theme toggle:** Rotation/morph animation between sun and moon
- **Scroll indicator:** Playful bounce animation
- **Link hovers:** Smooth underline or color transitions
- **Playful copy:** Witty tagline in hero, fun CTA in contact section

## File Structure

```
portfolio-site/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── App.module.css
│   ├── theme/
│   │   ├── variables.css        # CSS custom properties (light/dark)
│   │   ├── global.css           # Reset, base styles, fonts
│   │   └── useTheme.ts          # Theme toggle hook
│   ├── components/
│   │   ├── Nav/
│   │   │   ├── Nav.tsx
│   │   │   └── Nav.module.css
│   │   ├── Hero/
│   │   │   ├── Hero.tsx
│   │   │   └── Hero.module.css
│   │   ├── BentoGrid/
│   │   │   ├── BentoGrid.tsx
│   │   │   └── BentoGrid.module.css
│   │   ├── BentoCard/
│   │   │   ├── BentoCard.tsx
│   │   │   └── BentoCard.module.css
│   │   ├── About/
│   │   │   ├── About.tsx
│   │   │   └── About.module.css
│   │   ├── Skills/
│   │   │   ├── Skills.tsx
│   │   │   └── Skills.module.css
│   │   ├── Achievements/
│   │   │   ├── Achievements.tsx
│   │   │   └── Achievements.module.css
│   │   ├── Experience/
│   │   │   ├── Experience.tsx
│   │   │   └── Experience.module.css
│   │   ├── Projects/
│   │   │   ├── Projects.tsx
│   │   │   └── Projects.module.css
│   │   ├── Education/
│   │   │   ├── Education.tsx
│   │   │   └── Education.module.css
│   │   ├── Contact/
│   │   │   ├── Contact.tsx
│   │   │   └── Contact.module.css
│   │   └── ThemeToggle/
│   │       ├── ThemeToggle.tsx
│   │       └── ThemeToggle.module.css
│   └── data/
│       └── resume.ts             # All resume content as typed data
└── public/
    └── favicon.svg
```

## Data Layer

All resume content lives in `src/data/resume.ts` as typed TypeScript objects. Components import from this file. This makes it easy to update content without touching component code.

## Dependencies

```json
{
  "react": "^19",
  "react-dom": "^19",
  "framer-motion": "^11"
}
```

Dev dependencies: `vite`, `@vitejs/plugin-react`, `typescript`, standard type packages.

## Deployment

Static build (`vite build`) outputs to `dist/`. Deployable to any static host (Vercel, Netlify, GitHub Pages, etc.). No server required.
