"use client";
import { useState } from "react";

type SectionId =
  | "intro"
  | "html"
  | "semantica"
  | "css"
  | "boxmodel"
  | "flexbox"
  | "grid"
  | "responsive"
  | "proyecto";

interface SectionDef {
  id: SectionId;
  label: string;
}
const SECTIONS: SectionDef[] = [
  { id: "intro", label: "1. Web fundamentals" },
  { id: "html", label: "2. Essential HTML" },
  { id: "semantica", label: "3. Semantic HTML" },
  { id: "css", label: "4. Basic CSS" },
  { id: "boxmodel", label: "5. Box Model" },
  { id: "flexbox", label: "6. Flexbox" },
  { id: "grid", label: "7. CSS Grid" },
  { id: "responsive", label: "8. Responsive" },
  { id: "proyecto", label: "Project" },
];

import {
  BlogH2,
  BlogH3,
  BlogP,
  BlogCode,
  BlogCallout,
} from "@/components/blog/shared";

function SectionIntro() {
  return (
    <>
      <BlogH2>Web development fundamentals</BlogH2>
      <BlogP>
        The web is built with three base technologies: HTML (structure), CSS
        (presentation), and JavaScript (behavior). This tutorial covers HTML and
        CSS from scratch.
      </BlogP>
      <BlogCode>{`<!-- A minimal web page -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>My first page</title>
    <style>
        body { font-family: system-ui, sans-serif; margin: 2rem; }
        h1   { color: #2563eb; }
    </style>
</head>
<body>
    <h1>Hello, world!</h1>
    <p>This is HTML with a bit of CSS.</p>
</body>
</html>`}</BlogCode>
      <BlogCallout type="tip">
        The <code>!DOCTYPE html</code> tells the browser to use standards
        mode. Without it, the browser uses "quirks mode" which renders
        unpredictably.
      </BlogCallout>
    </>
  );
}

function SectionHtml() {
  return (
    <>
      <BlogH2>Essential HTML</BlogH2>
      <BlogP>
        HTML (HyperText Markup Language) uses tags to structure
        content. Each tag can have attributes.
      </BlogP>
      <BlogCode>{`<!-- Document structure -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page title</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Headings -->
    <h1>Main heading</h1>
    <h2>Subheading</h2>
    <h3>Section</h3>

    <!-- Text -->
    <p>Paragraph of text. <strong>Bold</strong> and <em>italic</em>.</p>

    <!-- Links and images -->
    <a href="https://example.com">Link</a>
    <img src="photo.jpg" alt="Description" width="300">

    <!-- Lists -->
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
    </ul>

    <!-- Forms -->
    <form action="/api/contact" method="POST">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        <button type="submit">Send</button>
    </form>
</body>
</html>`}</BlogCode>
    </>
  );
}

function SectionSemantica() {
  return (
    <>
      <BlogH2>Semantic HTML</BlogH2>
      <BlogP>
        Semantic tags describe the meaning of content, not just
        its appearance. They improve accessibility, SEO, and maintainability.
      </BlogP>
      <BlogCode>{`<!-- Semantic page structure -->
<body>
    <header>
        <nav>
            <a href="/">Home</a>
            <a href="/blog">Blog</a>
            <a href="/contact">Contact</a>
        </nav>
    </header>

    <main>
        <article>
            <header>
                <h1>How to learn HTML</h1>
                <time datetime="2026-07-01">July 1, 2026</time>
            </header>
            <section>
                <h2>Why semantic HTML?</h2>
                <p>Semantic HTML helps to...</p>
            </section>
        </article>

        <aside>
            <h2>Related articles</h2>
            <ul><!-- ... --></ul>
        </aside>
    </main>

    <footer>
        <p>&copy; 2026 My Website</p>
    </footer>
</body>`}</BlogCode>
      <BlogCallout type="tip">
        Use <code>&lt;div&gt;</code> only when no suitable semantic tag
        exists. Think: is this navigation, an article, a section, a sidebar?
      </BlogCallout>
    </>
  );
}

function SectionCss() {
  return (
    <>
      <BlogH2>Basic CSS</BlogH2>
      <BlogP>
        CSS (Cascading Style Sheets) controls presentation: colors,
        typography, spacing, layout, and animations.
      </BlogP>
      <BlogCode>{`/* Selectors */
element      { }         /* all <p> elements */
.class        { }         /* class="class" */
#id           { }         /* id="id" (avoid, use classes instead) */
[data-type]   { }         /* attribute */
div p         { }         /* descendant */
div > p       { }         /* direct child */
h1 + p        { }         /* adjacent sibling */

/* Cascade and specificity */
/* 1. !important (avoid)
   2. inline styles
   3. #id
   4. .class [attr] :pseudo
   5. element ::pseudo */`}</BlogCode>
      <BlogCode>{`/* Colors */
color: #2563eb;           /* hexadecimal */
color: rgb(37, 99, 235);  /* RGB */
color: hsl(217, 83%, 53%); /* HSL — more intuitive */
color: oklch(59% 0.19 265); /* OKLCH — perceptually uniform */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Typography */
font-family: 'Inter', system-ui, sans-serif;
font-size: clamp(1rem, 2vw, 1.25rem);
font-weight: 400;
line-height: 1.6;
text-wrap: pretty; /* prevent widows */`}</BlogCode>
    </>
  );
}

function SectionBoxModel() {
  return (
    <>
      <BlogH2>Box Model</BlogH2>
      <BlogP>
        Every element in CSS is a box composed of: content, padding, border,
        margin. Understanding the box model is essential for predictable
        layouts.
      </BlogP>
      <BlogCode>{`/* Box model */
.element {
    width: 300px;
    height: auto;
    padding: 1rem;        /* internal space */
    border: 2px solid #333; /* border */
    margin: 1rem;         /* external space */

    /* box-sizing: content-box (default) — width = content only */
    /* box-sizing: border-box — width = content + padding + border */
    box-sizing: border-box;
}

/* Center horizontally */
.centered-block {
    width: fit-content;
    margin-inline: auto;
}

/* Hide without removing from flow */
.visually-hidden {
    position: absolute;
    width: 1px; height: 1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
}`}</BlogCode>
      <BlogCallout type="tip">
        Always add{" "}
        <code>
          *, *::before, *::after {"{"} box-sizing: border-box; {"}"}
        </code>{" "}
        at the start of your CSS. It makes sizes much more predictable.
      </BlogCallout>
    </>
  );
}

function SectionFlexbox() {
  return (
    <>
      <BlogH2>Flexbox</BlogH2>
      <BlogP>
        Flexbox distributes space in one dimension (row or column). Ideal for
        UI components, navigation bars, centering, and alignment.
      </BlogP>
      <BlogCode>{`/* Flex container */
.container {
    display: flex;
    flex-direction: row;      /* row | column */
    flex-wrap: wrap;          /* nowrap | wrap */
    justify-content: center;  /* main axis */
    align-items: center;      /* cross axis */
    gap: 1rem;                /* space between items */
}

/* Flex items */
.item {
    flex: 1;                  /* grow to fill space */
    flex-shrink: 0;           /* don't shrink */
    align-self: flex-start;   /* individual alignment */
}

/* Perfect centering */
.centered {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}`}</BlogCode>
      <BlogCode>{`/* Example: responsive navbar */
<nav class="navbar">
    <span class="logo">MyApp</span>
    <div class="links">
        <a href="#">Home</a>
        <a href="#">Blog</a>
        <a href="#">Contact</a>
    </div>
    <button>Login</button>
</nav>

<style>
.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    gap: 1rem;
}
.links {
    display: flex;
    gap: 1.5rem;
}
@media (max-width: 640px) {
    .links { display: none; } /* hamburger menu */
}
</style>`}</BlogCode>
    </>
  );
}

function SectionGrid() {
  return (
    <>
      <BlogH2>CSS Grid</BlogH2>
      <BlogP>
        Grid works in two dimensions (rows and columns simultaneously).
        Ideal for full page layouts and galleries.
      </BlogP>
      <BlogCode>{`/* Basic grid */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

/* Explicit grid */
.layout {
    display: grid;
    grid-template-areas:
        "header  header  header"
        "sidebar content content"
        "footer  footer  footer";
    grid-template-columns: 250px 1fr 1fr;
    gap: 1rem;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer  { grid-area: footer; }

/* Auto-fit + minmax = responsive without media queries */
.grid-auto {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    /* tablet: 2 columns, mobile: 1 column, desktop: 3+ */
}`}</BlogCode>
      <BlogCallout type="tip">
        Use <code>auto-fit</code> or <code>auto-fill</code> with
        <code>minmax()</code> to create responsive grids without a single media
        query. <code>auto-fill</code> creates empty tracks, <code>auto-fit</code>
        collapses them.
      </BlogCallout>
    </>
  );
}

function SectionResponsive() {
  return (
    <>
      <BlogH2>Responsive design</BlogH2>
      <BlogP>
        Responsive design adapts the interface to any screen size.
        It's based on three pillars: flexible grid, fluid images, and media
        queries.
      </BlogP>
      <BlogH3>Media queries</BlogH3>
      <BlogCode>{`/* Mobile-first — start with base styles (mobile) */
.grid {
    display: grid;
    grid-template-columns: 1fr; /* 1 column on mobile */
    gap: 1rem;
}

/* Tablet (≥768px) */
@media (min-width: 768px) {
    .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop (≥1024px) */
@media (min-width: 1024px) {
    .grid { grid-template-columns: repeat(3, 1fr); }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
    body { background: #0a0a0f; color: #e6edf3; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}`}</BlogCode>
      <BlogH3>Responsive units</BlogH3>
      <BlogCode>{`/* Viewport-relative */
width: 100vw;           /* 100% of viewport width */
height: 100dvh;         /* 100% of dynamic height (no address bar) */
font-size: clamp(1rem, 2.5vw, 1.5rem); /* min, preferred, max */
padding: 2cqi;          /* container query inline-size */

/* Container-relative */
.container {
    container-type: inline-size;
}
@container (max-width: 400px) {
    .card { flex-direction: column; }
}`}</BlogCode>
    </>
  );
}

function SectionProyecto() {
  return (
    <>
      <BlogH2>Project: responsive profile card</BlogH2>
      <BlogP>
        Build this profile card that adapts to any screen.
        It combines Flexbox, Grid, CSS variables, and responsive design.
      </BlogP>
      <BlogCode>{`<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My profile</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="card">
        <img src="avatar.jpg" alt="Avatar" class="avatar">
        <h1 class="name">Ana García</h1>
        <p class="bio">Frontend developer passionate about creating accessible and beautiful interfaces.</p>
        <div class="stats">
            <div class="stat"><span class="num">42</span><span>projects</span></div>
            <div class="stat"><span class="num">128</span><span>followers</span></div>
            <div class="stat"><span class="num">10</span><span>years exp.</span></div>
        </div>
        <button class="btn">Follow</button>
    </div>
</body>
</html>`}</BlogCode>
      <BlogCode>{`/* styles.css */
:root {
    --bg: #ffffff;
    --text: #1d1d1f;
    --accent: #2563eb;
    --border: #e5e5e7;
}
@media (prefers-color-scheme: dark) {
    :root {
        --bg: #111116;
        --text: #e6edf3;
        --accent: #60a5fa;
        --border: #2c2c32;
    }
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
    font-family: system-ui, sans-serif;
    background: var(--bg);
    color: var(--text);
    display: grid;
    place-items: center;
    min-height: 100dvh;
    padding: 1rem;
}

.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
    border: 1px solid var(--border);
    border-radius: 1.5rem;
    max-width: 320px;
    width: 100%;
    text-align: center;
}

.avatar {
    width: 96px; height: 96px;
    border-radius: 50%;
    object-fit: cover;
}

.stats { display: flex; gap: 1.5rem; }
.stat { display: flex; flex-direction: column; align-items: center; }
.num { font-size: 1.25rem; font-weight: 700; }

.btn {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 0.75rem;
    background: var(--accent);
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
}
.btn:hover { opacity: 0.9; }`}</BlogCode>
    </>
  );
}

const SECTION_MAP = {
  intro: SectionIntro,
  html: SectionHtml,
  semantica: SectionSemantica,
  css: SectionCss,
  boxmodel: SectionBoxModel,
  flexbox: SectionFlexbox,
  grid: SectionGrid,
  responsive: SectionResponsive,
  proyecto: SectionProyecto,
};

export default function HtmlCssContent() {
  const [active, setActive] = useState<SectionId>("intro");
  const currentIdx = SECTIONS.findIndex((s) => s.id === active);

  return (
    <div className="flex gap-8 min-h-[600px]">
      <aside className="hidden lg:flex flex-col gap-0.5 w-52 shrink-0 sticky top-20 self-start">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={`text-left px-3 py-1.5 rounded-xl text-sm transition-colors ${
              active === s.id
                ? "bg-orange-100 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300 font-medium"
                : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
            }`}
            onClick={() => setActive(s.id)}
          >
            {s.label}
          </button>
        ))}
      </aside>
      <div className="flex-1 min-w-0">
        {SECTION_MAP[active]()}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-black/8 dark:border-white/8">
          <button
            className="text-sm text-[#6e6e73] dark:text-[#86868b] disabled:opacity-30 hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
            disabled={currentIdx === 0}
            onClick={() => setActive(SECTIONS[currentIdx - 1].id)}
          >
            ← Previous
          </button>
          <button
            className="text-sm bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl font-medium disabled:opacity-30 transition-colors"
            disabled={currentIdx === SECTIONS.length - 1}
            onClick={() => setActive(SECTIONS[currentIdx + 1].id)}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
