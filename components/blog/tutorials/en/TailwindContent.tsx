"use client";
import { useState } from "react";

import {
  BlogH2,
  BlogH3,
  BlogP,
  BlogCode,
  BlogInlineCode,
  BlogCallout,
  BlogUl,
  BlogLi,
} from "@/components/blog/shared";

function ExerciseCard({
  num,
  title,
  level,
  description,
  hint,
  solution,
}: {
  num: number;
  title: string;
  level: "Easy" | "Intermediate" | "Hard";
  description: string;
  hint?: string;
  solution?: string;
}) {
  const [open, setOpen] = useState(false);
  const levelColor = {
    Easy: "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
    Intermediate:
      "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
    Hard: "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
  }[level];

  return (
    <div className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden">
      <button
        className="w-full px-4 py-3 flex items-center justify-between gap-3 hover:bg-black/3 dark:hover:bg-white/3 transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
            {num}
          </span>
          <span className="text-sm font-medium text-[#1d1d1f] dark:text-white">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor}`}
          >
            {level}
          </span>
          <span className="text-[#aeaeb2] text-xs">{open ? "▲" : "▼"}</span>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-black/8 dark:border-white/8 pt-3 space-y-3">
          <p className="text-sm text-[#3a3a3c] dark:text-[#aeaeb2]">
            {description}
          </p>
          {hint && (
            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl px-3 py-2 text-xs text-blue-800 dark:text-blue-300">
              <strong>Hint:</strong> {hint}
            </div>
          )}
          {solution && <BlogCode>{solution}</BlogCode>}
        </div>
      )}
    </div>
  );
}

export default function TailwindContentEn() {
  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 text-xs text-[#aeaeb2] dark:text-[#636366] mb-4">
        <span className="flex items-center gap-1">
          <svg
            aria-hidden="true"
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          Tutorial
        </span>
        <span className="w-1 h-1 rounded-full bg-[#aeaeb2]" />
        <span className="flex items-center gap-1">
          <svg
            aria-hidden="true"
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          45 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        Tailwind CSS: utility-first design
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Tailwind CSS is a framework that builds interfaces by combining
        single-purpose utility classes directly in the HTML. This tutorial
        covers installation, spacing, layouts, responsive, dark mode, and
        customization with version 4. Conceptual prerequisite: HTML and CSS.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="que-es">What is Tailwind?</BlogH2>

      <BlogP>
        Unlike Bootstrap, which ships predefined components, Tailwind is{" "}
        <strong>utility-first</strong>: each class applies a single property (
        <BlogInlineCode>p-4</BlogInlineCode> is just 1rem of padding). You
        compose the interface by combining these classes in the HTML, without
        writing CSS in separate files.
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Speed:</strong> you style without switching files or inventing
          class names.
        </BlogLi>
        <BlogLi>
          <strong>Consistency:</strong> spacing, typography, and colors come
          from a single design system.
        </BlogLi>
        <BlogLi>
          <strong>Only what you use:</strong> the final CSS is generated from
          the classes detected in your code; there is no dead CSS.
        </BlogLi>
        <BlogLi>
          <strong>Built-in responsive:</strong> the{" "}
          <BlogInlineCode>sm:</BlogInlineCode>,{" "}
          <BlogInlineCode>md:</BlogInlineCode> and{" "}
          <BlogInlineCode>lg:</BlogInlineCode> prefixes live in the same class.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="info">
        Version 4 (released in 2025) changes the engine to native CSS: no
        PostCSS with plugins, it uses the official{" "}
        <BlogInlineCode>@tailwindcss/vite</BlogInlineCode> plugin and a single{" "}
        <BlogInlineCode>@import "tailwindcss"</BlogInlineCode> directive in your
        CSS. Everything in this tutorial uses v4.
      </BlogCallout>

      <BlogH2 id="instalacion">Installation</BlogH2>

      <BlogH3 id="instalar-vite">With Vite</BlogH3>

      <BlogP>
        In a Vite project (React, Vue, vanilla), install the package and its
        plugin:
      </BlogP>

      <BlogCode>{`npm install tailwindcss @tailwindcss/vite

// vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
})

// In your main CSS (src/index.css):
@import "tailwindcss";`}</BlogCode>

      <BlogH3 id="instalar-nextjs">With Next.js</BlogH3>

      <BlogP>
        With Next.js (App Router or pages router) you use the PostCSS plugin
        that ships with the package, or the experimental Vite plugin depending
        on your version. For v4 the standard method:
      </BlogP>

      <BlogCode>{`npm install tailwindcss @tailwindcss/postcss

// postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

// In your global CSS (globals.css):
@import "tailwindcss";`}</BlogCode>

      <BlogCallout type="warn">
        In v4 there is <strong>no</strong> required{" "}
        <BlogInlineCode>tailwind.config.js</BlogInlineCode> nor the{" "}
        <BlogInlineCode>@tailwind base/components/utilities</BlogInlineCode>{" "}
        directive. Everything is configured from CSS with{" "}
        <BlogInlineCode>@theme</BlogInlineCode> and content detection is
        automatic. If you migrate from v3, check the official migration guide.
      </BlogCallout>

      <BlogH2 id="spacing">Spacing and typography</BlogH2>

      <BlogP>
        <strong>Spacing</strong> uses a fixed scale: each unit equals 0.25rem
        (4px). <BlogInlineCode>p-4</BlogInlineCode> is 1rem,{" "}
        <BlogInlineCode>mt-2</BlogInlineCode> is a margin-top of 0.5rem:
      </BlogP>

      <BlogCode>{`<div class="p-4">
  <!-- padding: 1rem on all four sides -->
  <button class="px-6 py-2 m-2">
    <!-- px: horizontal, py: vertical, m: margin -->
  </button>
</div>

<!-- Scale equivalences -->
p-0  = 0px
p-1  = 0.25rem (4px)
p-2  = 0.5rem  (8px)
p-4  = 1rem    (16px)
p-8  = 2rem    (32px)
p-16 = 4rem    (64px)`}</BlogCode>

      <BlogP>
        <strong>Typography</strong> also has a scale:{" "}
        <BlogInlineCode>text-sm</BlogInlineCode>,{" "}
        <BlogInlineCode>text-base</BlogInlineCode>,{" "}
        <BlogInlineCode>text-2xl</BlogInlineCode>... and weights with{" "}
        <BlogInlineCode>font-*</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`<h1 class="text-3xl font-bold tracking-tight">Title</h1>
<p class="text-sm text-gray-600 leading-relaxed">
  Paragraph with relaxed line height and gray color.
</p>
<span class="font-mono text-xs uppercase">CODE</span>`}</BlogCode>

      <BlogP>
        Useful text utilities: <BlogInlineCode>text-center</BlogInlineCode>,{" "}
        <BlogInlineCode>truncate</BlogInlineCode> (ellipsis),{" "}
        <BlogInlineCode>whitespace-nowrap</BlogInlineCode> and{" "}
        <BlogInlineCode>leading-*</BlogInlineCode> for line height.
      </BlogP>

      <BlogH2 id="flexbox-grid">Flexbox and Grid</BlogH2>

      <BlogP>
        Both layout systems are declared with one class and tuned with
        utilities. Flexbox:
      </BlogP>

      <BlogCode>{`<div class="flex items-center justify-between gap-4">
  <div class="flex items-center gap-2">
    <img class="w-8 h-8 rounded-full" src="avatar.jpg" alt="" />
    <span class="font-medium">Ana García</span>
  </div>
  <button class="px-4 py-2 bg-blue-600 text-white rounded-lg">
    Follow
  </button>
</div>`}</BlogCode>

      <BlogUl>
        <BlogLi>
          <BlogInlineCode>flex</BlogInlineCode> — display flex.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>items-center</BlogInlineCode> — vertical alignment.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>justify-between</BlogInlineCode> — spreads children
          with space between them.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>gap-4</BlogInlineCode> — space between children.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>flex-1</BlogInlineCode> — the child grows to fill the
          remaining space.
        </BlogLi>
      </BlogUl>

      <BlogP>Grid:</BlogP>

      <BlogCode>{`<div class="grid grid-cols-3 gap-4">
  <div class="p-4 bg-white rounded-xl shadow">Item 1</div>
  <div class="p-4 bg-white rounded-xl shadow">Item 2</div>
  <div class="p-4 bg-white rounded-xl shadow">Item 3</div>
</div>

<!-- Useful variants -->
grid-cols-1        → 1 column
grid-cols-3        → 3 equal columns
grid-cols-[200px_1fr] → explicit columns
col-span-2         → the child spans 2 columns
grid-flow-row / grid-flow-col → direction`}</BlogCode>

      <BlogCallout type="info">
        The most common pattern in the real web:{" "}
        <BlogInlineCode>flex</BlogInlineCode> for bars and single-axis rows,{" "}
        <BlogInlineCode>grid</BlogInlineCode> for card grids and columns. Both
        accept <BlogInlineCode>gap-*</BlogInlineCode>, so forget negative
        margins.
      </BlogCallout>

      <BlogH2 id="responsive">Responsive</BlogH2>

      <BlogP>
        The <BlogInlineCode>sm:</BlogInlineCode>,{" "}
        <BlogInlineCode>md:</BlogInlineCode>,{" "}
        <BlogInlineCode>lg:</BlogInlineCode> and{" "}
        <BlogInlineCode>xl:</BlogInlineCode> prefixes apply the utility only
        from that breakpoint upward (mobile-first):
      </BlogP>

      <BlogCode>{`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- 1 column on mobile, 2 on tablet, 4 on desktop -->
</div>

<p class="text-sm md:text-base lg:text-lg">
  The text grows with the screen.
</p>

<div class="flex flex-col md:flex-row gap-4">
  <!-- Stacked on mobile, row on desktop -->
</div>`}</BlogCode>

      <BlogP>
        The default breakpoints in v4: <BlogInlineCode>sm</BlogInlineCode>{" "}
        640px, <BlogInlineCode>md</BlogInlineCode> 768px,{" "}
        <BlogInlineCode>lg</BlogInlineCode> 1024px,{" "}
        <BlogInlineCode>xl</BlogInlineCode> 1280px,{" "}
        <BlogInlineCode>2xl</BlogInlineCode> 1536px. Since it is mobile-first,{" "}
        <BlogInlineCode>md:grid-cols-2</BlogInlineCode> means "from 768px
        upward".
      </BlogP>

      <BlogCallout type="warn">
        Always start with the mobile version and add prefixes to scale up. If
        you need a breakpoint outside the scale, v4 lets you define it in{" "}
        <BlogInlineCode>@theme</BlogInlineCode> with{" "}
        <BlogInlineCode>--breakpoint-*</BlogInlineCode>.
      </BlogCallout>

      <BlogH2 id="estados">States</BlogH2>

      <BlogP>
        State variants prefix the utility:{" "}
        <BlogInlineCode>hover:</BlogInlineCode>,{" "}
        <BlogInlineCode>focus:</BlogInlineCode>,{" "}
        <BlogInlineCode>active:</BlogInlineCode>,{" "}
        <BlogInlineCode>disabled:</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`<button
  class="px-4 py-2 bg-blue-600 text-white rounded-lg
         hover:bg-blue-700 active:scale-95
         focus:outline-none focus:ring-2 focus:ring-blue-300
         disabled:opacity-50"
>
  Save
</button>`}</BlogCode>

      <BlogP>
        <BlogInlineCode>group-hover:</BlogInlineCode> styles a child when you
        hover an ancestor marked with <BlogInlineCode>group</BlogInlineCode>. It
        is the basis of cards and menus that react to the mouse:
      </BlogP>

      <BlogCode>{`<a class="group block p-4 rounded-xl hover:bg-gray-50">
  <h3 class="font-semibold group-hover:text-blue-600">
    Learn Tailwind
  </h3>
  <p class="text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
    Text that appears on hover.
  </p>
</a>`}</BlogCode>

      <BlogP>
        Other heavily used variants:{" "}
        <BlogInlineCode>focus-within:</BlogInlineCode> (for form containers),{" "}
        <BlogInlineCode>peer-*</BlogInlineCode> (previous siblings),{" "}
        <BlogInlineCode>first:/last:</BlogInlineCode> (lists) and{" "}
        <BlogInlineCode>even:/odd:</BlogInlineCode> (alternate rows).
      </BlogP>

      <BlogH2 id="dark-mode">Dark mode</BlogH2>

      <BlogP>
        The <BlogInlineCode>dark:</BlogInlineCode> variant applies styles when
        the system (or the HTML) is in dark theme:
      </BlogP>

      <BlogCode>{`<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <p class="text-gray-600 dark:text-gray-400">
    Adapts automatically to the theme.
  </p>
</div>`}</BlogCode>

      <BlogP>
        In v4, dark mode uses the{" "}
        <BlogInlineCode>prefers-color-scheme</BlogInlineCode> media query by
        default: it works following the system setting. If you want a manual
        toggle, configure it with a selector:
      </BlogP>

      <BlogCode>{`/* globals.css — class-based dark mode with .dark */
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

/* Now dark: responds to the .dark class on the <html> element */
<html class="dark">
  <div class="bg-white dark:bg-gray-900">
    Dark when html carries the .dark class
  </div>
</html>`}</BlogCode>

      <BlogCallout type="info">
        With the manual toggle, a small script in the{" "}
        <BlogInlineCode>&lt;head&gt;</BlogInlineCode> reads the saved value
        (localStorage) and adds/removes the{" "}
        <BlogInlineCode>.dark</BlogInlineCode> class on the{" "}
        <BlogInlineCode>&lt;html&gt;</BlogInlineCode> before the first paint,
        avoiding a flash of the wrong theme.
      </BlogCallout>

      <BlogH2 id="customizacion">Customization</BlogH2>

      <BlogP>
        In v4 the whole theme is declared in CSS with{" "}
        <BlogInlineCode>@theme</BlogInlineCode>. Define your own colors, fonts,
        and breakpoints, and Tailwind generates the corresponding utilities
        automatically:
      </BlogP>

      <BlogCode>{`/* globals.css */
@import "tailwindcss";

@theme {
  /* A new color → bg-brand, text-brand, border-brand utilities... */
  --color-brand: #ff5c1a;
  --color-brand-light: #ffd9c4;

  /* A new font → font-display */
  --font-display: "Sora", sans-serif;

  /* A new breakpoint → 3xl: */
  --breakpoint-3xl: 1800px;
}

/* Usage in the HTML */
<h1 class="font-display text-brand">Title with your identity</h1>
<div class="bg-brand-light p-4 rounded-xl">Panel</div>`}</BlogCode>

      <BlogP>
        You can also override the existing color scale with the standard
        variables (<BlogInlineCode>--color-*</BlogInlineCode>) and spacing (
        <BlogInlineCode>--spacing-*</BlogInlineCode>), adjusting the base of the
        whole scale:
      </BlogP>

      <BlogCode>{`@theme {
  /* Changes the spacing base: p-4 goes from 1rem to 1.25rem */
  --spacing: 0.3125rem;
}`}</BlogCode>

      <BlogCallout type="warn">
        <BlogInlineCode>@apply</BlogInlineCode> still exists to compose
        utilities in your own CSS, but v4 recommends preferring classes in the
        HTML. Use <BlogInlineCode>@apply</BlogInlineCode> sparingly (for
        example, in third-party component styles) — overuse recreates the
        "separate CSS files" problem Tailwind aims to eliminate.
      </BlogCallout>

      <BlogH2 id="componentes">Components with @layer</BlogH2>

      <BlogP>
        For your own reusable classes (a button, a card) use{" "}
        <BlogInlineCode>@layer components</BlogInlineCode> together with{" "}
        <BlogInlineCode>@apply</BlogInlineCode>. This way the generated CSS
        stays ordered in layers and respects utility precedence:
      </BlogP>

      <BlogCode>{`/* globals.css */
@import "tailwindcss";

@layer components {
  .btn-primary {
    @apply inline-flex items-center gap-2 px-4 py-2
           bg-blue-600 text-white text-sm font-medium
           rounded-lg hover:bg-blue-700 active:scale-95
           focus:outline-none focus:ring-2 focus:ring-blue-300;
  }

  .card {
    @apply p-6 bg-white dark:bg-gray-800 rounded-2xl
           border border-gray-200 dark:border-gray-700 shadow-sm;
  }
}

<!-- Usage -->
<button class="btn-primary">Save</button>
<div class="card">Card content</div>`}</BlogCode>

      <BlogCallout type="info">
        Why <BlogInlineCode>@layer</BlogInlineCode>: utilities (the{" "}
        <BlogInlineCode>utilities</BlogInlineCode> layer) beat components in
        CSS. This means <BlogInlineCode>class="card p-0"</BlogInlineCode> works:
        the <BlogInlineCode>p-0</BlogInlineCode> utility overrides the
        component's padding without specificity issues.
      </BlogCallout>

      <BlogP>
        With these pieces you have the complete cycle: utility classes for
        day-to-day work, variants for states and responsive,{" "}
        <BlogInlineCode>@theme</BlogInlineCode> for your identity, and{" "}
        <BlogInlineCode>@layer components</BlogInlineCode> for recurring
        patterns. All from a single language that lives in the HTML.
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Exercises</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Create a responsive card showing an image, a title, and a button. It must look good on mobile and desktop."
          hint="grid-cols-1 md:grid-cols-2 to change the layout, or flex-col md:flex-row."
          level="Easy"
          num={1}
          solution={`<div class="flex flex-col md:flex-row gap-4 p-4
              bg-white dark:bg-gray-800 rounded-2xl shadow">
  <img
    class="w-full md:w-40 h-32 md:h-24 object-cover rounded-xl"
    src="cover.jpg"
    alt="Course cover"
  />
  <div class="flex flex-col gap-2">
    <h3 class="text-lg font-semibold">Tailwind Course</h3>
    <p class="text-sm text-gray-600 dark:text-gray-400">
      Learn utility-first with practical examples.
    </p>
    <button class="self-start px-4 py-2 bg-blue-600 text-white
                   rounded-lg hover:bg-blue-700">
      View course
    </button>
  </div>
</div>`}
          title="Responsive card"
        />

        <ExerciseCard
          description="Build a top bar (header) with the logo on the left, navigation in the center, and a button on the right using flex."
          hint="justify-between with three children, and items-center for vertical alignment."
          level="Easy"
          num={2}
          solution={`<header class="flex items-center justify-between px-6 py-4
                      border-b border-gray-200 dark:border-gray-800">
  <a href="/" class="font-bold text-xl">MyApp</a>
  <nav class="flex items-center gap-6 text-sm">
    <a class="hover:text-blue-600" href="/">Home</a>
    <a class="hover:text-blue-600" href="/blog">Blog</a>
    <a class="hover:text-blue-600" href="/about">About</a>
  </nav>
  <button class="px-4 py-2 bg-blue-600 text-white rounded-lg
                 hover:bg-blue-700">
    Sign in
  </button>
</header>`}
          title="Flex layout: header"
        />

        <ExerciseCard
          description="Create a gallery of 6 cards with grid: 1 column on mobile, 2 on tablet, and 3 on desktop."
          hint="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 with gap-4."
          level="Intermediate"
          num={3}
          solution={`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  <div v-for="n in 6" :key="n"
       class="p-4 bg-white dark:bg-gray-800 rounded-xl border
              border-gray-200 dark:border-gray-700">
    <h4 class="font-medium">Item {{ n }}</h4>
    <p class="text-sm text-gray-500 mt-1">Short description.</p>
  </div>
</div>

<!-- In React it would be: -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map((item) => (
    <div key={item.id} class="p-4 bg-white dark:bg-gray-800 rounded-xl
        border border-gray-200 dark:border-gray-700">
      <h4 class="font-medium">{item.title}</h4>
      <p class="text-sm text-gray-500 mt-1">{item.description}</p>
    </div>
  ))}
</div>`}
          title="Responsive grid: gallery"
        />

        <ExerciseCard
          description="Implement a dark mode toggle: a button that alternates the 'dark' class on the html element and two style versions with dark:."
          hint="Add @custom-variant dark in your CSS and toggle document.documentElement.classList."
          level="Hard"
          num={4}
          solution={`/* globals.css */
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

<!-- Toggle button -->
<button
  id="theme-toggle"
  class="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700
         text-gray-900 dark:text-white"
>
  Switch theme
</button>

<script>
  const html = document.documentElement;
  // On load: apply the saved theme
  const theme = localStorage.getItem("theme") || "light";
  html.classList.toggle("dark", theme === "dark");

  document.getElementById("theme-toggle").addEventListener("click", () => {
    html.classList.toggle("dark");
    localStorage.setItem("theme", html.classList.contains("dark")
      ? "dark" : "light");
  });
</script>`}
          title="Dark mode toggle"
        />

        <ExerciseCard
          description="Define a '.badge' class with @layer components using @apply, combining a background, padding, rounded borders, and text-xs uppercase. Use it in three color variants."
          hint="@layer components { .badge { @apply ...; } } and then bg-* on usage."
          level="Hard"
          num={5}
          solution={`/* globals.css */
@layer components {
  .badge {
    @apply inline-flex items-center px-2.5 py-0.5
           rounded-full text-xs font-medium uppercase
           tracking-wide;
  }
}

<!-- Usage: the bg-* utility wins over the component thanks to layers -->
<span class="badge bg-green-100 text-green-700">Active</span>
<span class="badge bg-amber-100 text-amber-700">Pending</span>
<span class="badge bg-red-100 text-red-700">Error</span>`}
          title="Custom class with @layer"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        Tailwind changes the way you think about CSS: instead of naming classes
        and maintaining style sheets, you compose interfaces directly with
        utilities. v4 makes it even simpler with pure CSS configuration. It is
        the tool behind most modern interfaces — and the more you use it, the
        more natural it feels.
      </BlogP>
    </article>
  );
}
