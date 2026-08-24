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

export default function CssAvanzadoContentEn() {
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
          55 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        Advanced CSS: animations and modern layouts
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        CSS is no longer just a "colors and boxes" language. Today you can build
        fluid animations, layouts that respond to their container instead of the
        viewport, and dynamic themes without a single line of JavaScript. This
        tutorial covers transitions, transforms, keyframes, container queries,
        custom properties, and the modern functions used by real frontends.
        Conceptual prerequisite: basic HTML and CSS.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="transiciones">Transitions</BlogH2>

      <BlogP>
        A <strong>transition</strong> smoothly interpolates the change of one or
        more CSS properties between two states. It is declared on the base state
        (the element at rest), not on the final state:
      </BlogP>

      <BlogCode>{`.button {
  background: #2563eb;
  transition: background-color 0.3s ease;
}

.button:hover {
  background: #1d4ed8;
}`}</BlogCode>

      <BlogP>
        The shorthand <BlogInlineCode>transition</BlogInlineCode> groups four
        sub-properties. The usual order:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>transition-property:</strong> which properties to animate.
          Using <BlogInlineCode>all</BlogInlineCode> is convenient but animates
          too much.
        </BlogLi>
        <BlogLi>
          <strong>transition-duration:</strong> how long it lasts, in seconds or
          milliseconds.
        </BlogLi>
        <BlogLi>
          <strong>transition-timing-function:</strong> the velocity curve
          (easing).
        </BlogLi>
        <BlogLi>
          <strong>transition-delay:</strong> wait before starting. A negative
          value starts midway.
        </BlogLi>
      </BlogUl>

      <BlogCode>{`.element {
  transition-property: color, transform;
  transition-duration: 0.2s, 0.4s;
  transition-timing-function: ease, ease-in-out;
  transition-delay: 0s, 0.1s;
}

/* Shorthand equivalent: each group in order */
.element {
  transition: color 0.2s ease 0s, transform 0.4s ease-in-out 0.1s;
}`}</BlogCode>

      <BlogH3 id="easing">Easing and cubic-bezier</BlogH3>

      <BlogP>
        The predefined curves are <BlogInlineCode>linear</BlogInlineCode>,{" "}
        <BlogInlineCode>ease</BlogInlineCode> (the default),{" "}
        <BlogInlineCode>ease-in</BlogInlineCode>,{" "}
        <BlogInlineCode>ease-out</BlogInlineCode>, and{" "}
        <BlogInlineCode>ease-in-out</BlogInlineCode>. For full control, define a
        cubic Bézier curve with four points:
      </BlogP>

      <BlogCode>{`/* cubic-bezier(x1, y1, x2, y2) */
.smooth-transition {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* A "springy" curve that slightly overshoots the target */
.spring-in {
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}`}</BlogCode>

      <BlogCallout type="tip">
        Rule of thumb: <BlogInlineCode>ease-out</BlogInlineCode> for entrances
        (things appearing), <BlogInlineCode>ease-in</BlogInlineCode> for exits
        (things disappearing), and an "overshoot" curve (y above 1) only for
        decorative effects. Too much curve kills the feel of native UI.
      </BlogCallout>

      <BlogP>
        There is a fifth curve that is very useful:{" "}
        <BlogInlineCode>steps()</BlogInlineCode>. It divides the animation into
        discrete jumps instead of continuous interpolation, ideal for character
        sprites or counters:
      </BlogP>

      <BlogCode>{`/* Discrete steps: the text changes like a scoreboard */
.counter {
  transition: all 1s steps(10, end);
}`}</BlogCode>

      <BlogH3 id="reduced-motion">prefers-reduced-motion</BlogH3>

      <BlogP>
        Many people are sensitive to motion. The{" "}
        <BlogInlineCode>prefers-reduced-motion</BlogInlineCode> media query
        detects the operating system's preference and lets you reduce or remove
        animations:
      </BlogP>

      <BlogCode>{`/* By default, animate normally */
.card {
  transition: transform 0.3s ease;
}

/* If the user asks for less motion, reduce it */
@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
}`}</BlogCode>

      <BlogCallout type="warn">
        Do not only remove transitions:{" "}
        <BlogInlineCode>@keyframes</BlogInlineCode> animations must also respect
        it. A common and accepted pattern is keeping the transition but with a{" "}
        <BlogInlineCode>0.01ms</BlogInlineCode> duration, which preserves the
        event logic without the visible motion.
      </BlogCallout>

      <BlogH2 id="transformaciones">Transforms</BlogH2>

      <BlogP>
        <BlogInlineCode>transform</BlogInlineCode> modifies an element's
        geometry without touching the document flow: siblings are not
        re-positioned. Main functions:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <BlogInlineCode>translate(x, y)</BlogInlineCode> — move.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>rotate(deg)</BlogInlineCode> — rotate (accepts degrees
          or <BlogInlineCode>turn</BlogInlineCode>).
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>scale(factor)</BlogInlineCode> — resize.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>skew(x, y)</BlogInlineCode> — skew.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>perspective()</BlogInlineCode> and 3D functions like{" "}
          <BlogInlineCode>rotateX()</BlogInlineCode> or{" "}
          <BlogInlineCode>translateZ()</BlogInlineCode>.
        </BlogLi>
      </BlogUl>

      <BlogCode>{`.card:hover {
  transform: translateY(-4px) scale(1.02);
}

/* Classic centering without knowing the child's dimensions */
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`}</BlogCode>

      <BlogP>
        <BlogInlineCode>transform-origin</BlogInlineCode> defines the point
        around which elements rotate or scale. By default it is the center (
        <BlogInlineCode>50% 50%</BlogInlineCode>):
      </BlogP>

      <BlogCode>{`.bell {
  transform-origin: top center;
}

.bell:hover {
  animation: ring 0.6s ease-in-out infinite;
}

@keyframes ring {
  0%, 100% { transform: rotate(0deg); }
  25%      { transform: rotate(15deg); }
  75%      { transform: rotate(-15deg); }
}`}</BlogCode>

      <BlogCallout type="info">
        3D transforms require a context:{" "}
        <BlogInlineCode>perspective</BlogInlineCode> on the parent (or the{" "}
        <BlogInlineCode>perspective()</BlogInlineCode> function inside{" "}
        <BlogInlineCode>transform</BlogInlineCode>). Without it, 3D functions
        are ignored and the element stays flat.
      </BlogCallout>

      <BlogP>
        A key detail: function order matters.{" "}
        <BlogInlineCode>translate()</BlogInlineCode> and{" "}
        <BlogInlineCode>scale()</BlogInlineCode> do not commute. Think of the
        order as a chain applied right to left:
      </BlogP>

      <BlogCode>{`/* First scales, then moves (the movement is also scaled) */
.transform {
  transform: translate(20px, 0) scale(2);
}

/* First moves, then scales (unscaled movement) */
.transform {
  transform: scale(2) translate(20px, 0);
}`}</BlogCode>

      <BlogH2 id="animaciones">Animations with keyframes</BlogH2>

      <BlogP>
        While transitions connect two states, <strong>animations</strong>{" "}
        traverse a sequence of steps defined with{" "}
        <BlogInlineCode>@keyframes</BlogInlineCode> and are controlled by the{" "}
        <BlogInlineCode>animation-*</BlogInlineCode> properties:
      </BlogP>

      <BlogCode>{`@keyframes pulse {
  0%   { transform: scale(1); opacity: 1; }
  50%  { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}

.pulsing-button {
  animation-name: pulse;
  animation-duration: 1.5s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

/* Shorthand */
.pulsing-button {
  animation: pulse 1.5s ease-in-out infinite;
}`}</BlogCode>

      <BlogH3 id="animation-props">Animation properties</BlogH3>

      <BlogUl>
        <BlogLi>
          <BlogInlineCode>animation-duration</BlogInlineCode> — duration of one
          cycle.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>animation-timing-function</BlogInlineCode> — easing
          curve.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>animation-iteration-count</BlogInlineCode> — number of
          cycles or <BlogInlineCode>infinite</BlogInlineCode>.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>animation-delay</BlogInlineCode> — wait before
          starting (accepts negative values to start mid-cycle).
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>animation-direction</BlogInlineCode> —{" "}
          <BlogInlineCode>normal</BlogInlineCode>,{" "}
          <BlogInlineCode>reverse</BlogInlineCode>,{" "}
          <BlogInlineCode>alternate</BlogInlineCode> (back and forth).
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>animation-fill-mode</BlogInlineCode> — which values
          apply before/after the cycle: <BlogInlineCode>none</BlogInlineCode>,{" "}
          <BlogInlineCode>forwards</BlogInlineCode>,{" "}
          <BlogInlineCode>backwards</BlogInlineCode>,{" "}
          <BlogInlineCode>both</BlogInlineCode>.
        </BlogLi>
      </BlogUl>

      <BlogCode>{`.loading-bar {
  width: 100px;
  animation: grow 2s ease forwards;
}

@keyframes grow {
  from { width: 100px; }
  to   { width: 400px; }
}

/* fill-mode: forwards keeps the final state after finishing,
   backwards applies the initial state during the delay */
.entrance {
  opacity: 0;
  animation: appear 0.4s ease 0.3s both;
}

@keyframes appear {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}`}</BlogCode>

      <BlogP>
        A keyframe can animate <strong>several properties</strong> at once and
        can mix arbitrary percentages, not only 0% and 100%:
      </BlogP>

      <BlogCode>{`@keyframes color-cycle {
  0%   { background: #2563eb; transform: rotate(0deg); }
  50%  { background: #7c3aed; transform: rotate(180deg); }
  100% { background: #2563eb; transform: rotate(360deg); }
}

.spinner {
  animation: color-cycle 3s linear infinite;
}`}</BlogCode>

      <BlogCallout type="tip">
        You cannot animate non-animatable properties (like{" "}
        <BlogInlineCode>display</BlogInlineCode>) directly inside a keyframe.
        The classic trick is to use <BlogInlineCode>visibility</BlogInlineCode>{" "}
        with a two-step keyframe: it stays{" "}
        <BlogInlineCode>visible</BlogInlineCode> until 99% and jumps to{" "}
        <BlogInlineCode>hidden</BlogInlineCode> at the end.
      </BlogCallout>

      <BlogH2 id="layout-moderno">Modern layout</BlogH2>

      <BlogH3 id="container-queries">Container queries</BlogH3>

      <BlogP>
        Until recently, the only thing that was "responsive" was the window.
        With <strong>container queries</strong>, a component responds to the
        size of its container, enabling reusable pieces that adapt wherever they
        live:
      </BlogP>

      <BlogCode>{`.card-container {
  container-type: inline-size;
  container-name: card;
}

/* Inside the container, @container responds to ITS width */
@container card (min-width: 400px) {
  .card__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}`}</BlogCode>

      <BlogP>
        <BlogInlineCode>container-type: inline-size</BlogInlineCode> marks the
        element as a query container. The advantage over media queries: the same
        component reorganizes itself whether it sits in a narrow sidebar or a
        wide grid.
      </BlogP>

      <BlogCallout type="info">
        In practice, components in modern libraries already use container
        queries internally. If your component does not need styles based on the
        viewport, prefer <BlogInlineCode>@container</BlogInlineCode> over{" "}
        <BlogInlineCode>@media</BlogInlineCode>.
      </BlogCallout>

      <BlogH3 id="has">The :has() selector</BlogH3>

      <BlogP>
        <BlogInlineCode>:has()</BlogInlineCode> selects an element because it{" "}
        <em>contains</em> another one. It is a relational selector and solves
        90% of the cases that used to require JavaScript (like "parent styles
        when it has a child"):
      </BlogP>

      <BlogCode>{`/* The card that contains an alert image */
.card:has(.alert) {
  border-color: #dc2626;
}

/* A form where a required input is filled */
.form:has(input[required]:not(:placeholder-shown)) {
  outline: 2px solid #16a34a;
}

/* Menu that opens on hover of its button — no JavaScript */
.menu:has(.menu__toggle:hover) .menu__dropdown {
  display: block;
}`}</BlogCode>

      <BlogCallout type="warn">
        <BlogInlineCode>:has()</BlogInlineCode> is expensive to compute. Avoid
        nesting it or applying it to thousands of elements. Use it in bounded
        contexts (a card, a form) and not on the universal selector.
      </BlogCallout>

      <BlogH3 id="subgrid">Subgrid</BlogH3>

      <BlogP>
        With regular <BlogInlineCode>grid</BlogInlineCode>, a grid child does
        not share its tracks (columns/rows) with its own children.{" "}
        <BlogInlineCode>subgrid</BlogInlineCode> inherits the parent grid's
        tracks, letting cards of the same grid align internally:
      </BlogP>

      <BlogCode>{`.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.card {
  display: grid;
  grid-template-rows: subgrid;   /* inherits the parent's rows */
  grid-row: span 3;              /* participates in 3 parent rows */
  gap: 0;
}`}</BlogCode>

      <BlogP>
        Without subgrid, three cards with different content heights would have
        misaligned footers. With subgrid, they all share the same tracks and the
        buttons align on the same row.
      </BlogP>

      <BlogH3 id="funciones-modernas">Modern functions</BlogH3>

      <BlogP>
        <BlogInlineCode>clamp()</BlogInlineCode> clamps a value between a
        minimum and a maximum. It is the queen of fluid typography, with no
        media queries:
      </BlogP>

      <BlogCode>{`/* Fluid font-size: never below 1rem, never above 2.5rem */
h1 {
  font-size: clamp(1rem, 4vw + 0.5rem, 2.5rem);
}

/* Fluid container with side margins */
.container {
  padding-inline: clamp(1rem, 5vw, 3rem);
}`}</BlogCode>

      <BlogP>
        <BlogInlineCode>min()</BlogInlineCode> and{" "}
        <BlogInlineCode>max()</BlogInlineCode> pick the smallest or largest of a
        list of values, and <BlogInlineCode>aspect-ratio</BlogInlineCode> fixes
        the proportion without knowing either a width or a height:
      </BlogP>

      <BlogCode>{`/* The video never takes more than 60% of the container */
.video {
  width: min(100%, 60%);
}

/* Image that grows to 400px, never below 200px */
.image {
  width: max(200px, 40%);
}

/* 16:9 cards without knowing the width */
.thumb {
  aspect-ratio: 16 / 9;
  object-fit: cover;
}`}</BlogCode>

      <BlogH2 id="custom-properties">Custom properties</BlogH2>

      <BlogP>
        <strong>Custom properties</strong> (CSS variables) are defined with{" "}
        <BlogInlineCode>--name</BlogInlineCode> and read with{" "}
        <BlogInlineCode>var()</BlogInlineCode>. They live on the element where
        they are declared and inherit down the tree:
      </BlogP>

      <BlogCode>{`:root {
  --color-primary: #2563eb;
  --radius: 12px;
  --spacing: 1rem;
}

.button {
  background: var(--color-primary);
  border-radius: var(--radius);
  padding: var(--spacing) calc(var(--spacing) * 2);
}`}</BlogCode>

      <BlogCallout type="info">
        The big advantage over a preprocessor: custom properties are{" "}
        <strong>dynamic</strong>. Changing a variable's value (from JS or a
        media query) re-renders every usage live, with no recompilation. That
        makes them the ideal mechanism for themes.
      </BlogCallout>

      <BlogP>
        With <BlogInlineCode>calc()</BlogInlineCode> you can derive new values
        from variables, and <BlogInlineCode>var()</BlogInlineCode> accepts a
        fallback if the variable does not exist:
      </BlogP>

      <BlogCode>{`.card {
  /* var(name, fallback) */
  padding: var(--spacing, 1rem);
  margin: calc(var(--spacing) * 2);
}

/* Inheritance: a child can override only for itself */
.card {
  --spacing: 0.5rem;
}
.card.featured {
  --spacing: 1.5rem;
}`}</BlogCode>

      <BlogH3 id="temas-dinamicos">Dynamic themes with data-theme</BlogH3>

      <BlogP>
        The most widespread theme pattern: define palettes per{" "}
        <BlogInlineCode>data-theme</BlogInlineCode> attribute on the{" "}
        <BlogInlineCode>&lt;html&gt;</BlogInlineCode> element, and have each
        selector override the same variables. The whole UI recolorizes without
        touching a single component:
      </BlogP>

      <BlogCode>{`:root {
  --bg: #ffffff;
  --text: #1d1d1f;
  --accent: #2563eb;
}

html[data-theme="dark"] {
  --bg: #0a0a0a;
  --text: #f5f5f7;
  --accent: #60a5fa;
}

body {
  background: var(--bg);
  color: var(--text);
}

.button-primary {
  background: var(--accent);
}`}</BlogCode>

      <BlogCode>{`// Switch theme from JavaScript: a single attribute
function setTheme(name: string) {
  document.documentElement.setAttribute("data-theme", name);
  localStorage.setItem("theme", name);
}

// On startup, before the first paint
const saved = localStorage.getItem("theme") ?? "light";
document.documentElement.setAttribute("data-theme", saved);`}</BlogCode>

      <BlogCallout type="tip">
        Combine custom properties with{" "}
        <BlogInlineCode>prefers-color-scheme</BlogInlineCode> for the default
        theme and <BlogInlineCode>data-theme</BlogInlineCode> for the user's
        explicit choice. Both coexist: the media query sets the initial value
        and the HTML attribute has the final word thanks to extra specificity.
      </BlogCallout>

      <BlogH2 id="rendimiento">Animation performance</BlogH2>

      <BlogP>
        Not all properties animate equally cheaply. The browser runs animations
        on separate layers, and only <BlogInlineCode>transform</BlogInlineCode>{" "}
        and <BlogInlineCode>opacity</BlogInlineCode> are processed on the GPU
        without touching layout. Animating{" "}
        <BlogInlineCode>width</BlogInlineCode>,{" "}
        <BlogInlineCode>top</BlogInlineCode>, or{" "}
        <BlogInlineCode>box-shadow</BlogInlineCode> forces layout and paint
        recalculations every frame:
      </BlogP>

      <BlogCode>{`/* Expensive: recalculates layout every frame */
.expensive-animation {
  transition: width 0.3s ease, height 0.3s ease;
}

/* Cheap: the GPU only recomposites the layer */
.good-animation {
  transition: transform 0.3s ease;
}

/* Equivalent: animate position with transform */
.element {
  transform: translateY(0);
  transition: transform 0.3s ease;
}
.element.moved {
  transform: translateY(-40px);
}`}</BlogCode>

      <BlogP>
        <BlogInlineCode>will-change</BlogInlineCode> hints the browser about
        which property will change, so it prepares a dedicated layer:
      </BlogP>

      <BlogCode>{`.element {
  will-change: transform;
}

/* On hover it is already prepared */
.element:hover {
  transform: scale(1.05);
}`}</BlogCode>

      <BlogCallout type="warn">
        Do not put <BlogInlineCode>will-change</BlogInlineCode> on hundreds of
        elements or keep it permanently: each layer reserves memory. The correct
        pattern is to enable it shortly before (for example on{" "}
        <BlogInlineCode>mouseenter</BlogInlineCode>) and remove it when done.
      </BlogCallout>

      <BlogP>
        <BlogInlineCode>contain</BlogInlineCode> isolates a subtree so the
        browser does not propagate its layout changes to the rest of the page.
        It is useful in self-contained components:
      </BlogP>

      <BlogCode>{`.widget {
  /* layout: internal layout does not affect the outside */
  contain: layout paint;
}

/* Strict containment: fixed size, no leaks */
.modal-window {
  contain: strict;
}`}</BlogCode>

      <BlogCallout type="info">
        Golden rule of UI performance: always animate{" "}
        <BlogInlineCode>transform</BlogInlineCode> and{" "}
        <BlogInlineCode>opacity</BlogInlineCode>. If you need a "visual" layout
        movement (height, width), simulate it with transforms or use{" "}
        <BlogInlineCode>grid-template-rows</BlogInlineCode> 0fr → 1fr, which the
        browser optimizes natively.
      </BlogCallout>

      <BlogH2 id="sass-postcss">Sass and PostCSS in brief</BlogH2>

      <BlogP>
        Preprocessors are still alive in many projects. Their value is not
        replacing CSS but giving it <strong>build superpowers</strong> that
        plain CSS lacks (though they overlap more and more):
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Nesting:</strong> writing selectors inside others. Today
          native CSS also supports it, with its own rules.
        </BlogLi>
        <BlogLi>
          <strong>Mixins:</strong> reusable style blocks with arguments (Sass).
        </BlogLi>
        <BlogLi>
          <strong>Variables:</strong> <BlogInlineCode>$variable</BlogInlineCode>{" "}
          in Sass, static at compile time; custom properties beat them in
          dynamism.
        </BlogLi>
      </BlogUl>

      <BlogCode>{`// Sass: mixin with arguments
@mixin button($color) {
  background: $color;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  &:hover { filter: brightness(0.9); }
}

.button-primary { @include button(#2563eb); }
.button-danger  { @include button(#dc2626); }

// Sass: nesting
.card {
  padding: 1rem;
  .title { font-weight: bold; }
  &.featured { border: 2px solid #2563eb; }
}`}</BlogCode>

      <BlogCallout type="warn">
        If you start a new project today, ask yourself whether you need it.
        Tailwind, CSS Modules, Lightning CSS, or PostCSS cover most cases, and
        native CSS (custom properties, nesting,{" "}
        <BlogInlineCode>@container</BlogInlineCode>) has absorbed the most
        requested features. Sass remains excellent for large codebases that
        already use it.
      </BlogCallout>

      <BlogP>
        PostCSS, for its part, is not a language: it is a <em>pipeline</em> of
        plugins that transform CSS (autoprefixing, minification,{" "}
        <BlogInlineCode>nesting</BlogInlineCode>,{" "}
        <BlogInlineCode>@apply</BlogInlineCode> support in Tailwind). Almost all
        modern production CSS passes through one or the other when compiling.
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Exercises</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Create a button that changes color on hover with a 0.3s transition using an ease-out curve."
          hint="transition: background-color 0.3s ease-out on the base state; the hover only changes the color."
          level="Easy"
          num={1}
          solution={`.button {
  background: #2563eb;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease-out;
}

.button:hover {
  background: #1d4ed8;
}`}
          title="Basic transition"
        />

        <ExerciseCard
          description="Center an element of unknown size inside its parent using transform, and add a lift effect on hover."
          hint="position: absolute + top/left 50% + translate(-50%, -50%). To lift, use translateY with a box-shadow."
          level="Intermediate"
          num={2}
          solution={`.parent {
  position: relative;
  height: 300px;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.child:hover {
  transform: translate(-50%, calc(-50% - 6px));
  box-shadow: 0 12px 24px rgb(0 0 0 / 0.15);
}`}
          title="Centering and lift"
        />

        <ExerciseCard
          description="Write a loading animation with keyframes: a bar that stretches from 0 to 100% width, repeats twice, and keeps the final state when done."
          hint="animation: grow 1.5s ease forwards; with iteration-count 2 before forwards."
          level="Intermediate"
          num={3}
          solution={`.loading-bar {
  height: 8px;
  background: #2563eb;
  animation: grow 1.5s ease 2 forwards;
}

@keyframes grow {
  from { width: 0%; }
  to   { width: 100%; }
}`}
          title="Animated progress bar"
        />

        <ExerciseCard
          description="Implement a card component with a container query: below 400px wide, content stacks vertically; from that width, it lays out in a row."
          hint="container-type: inline-size on the container and @container (min-width: 400px) to change the layout."
          level="Hard"
          num={4}
          solution={`.card-container {
  container-type: inline-size;
}

.card__content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@container (min-width: 400px) {
  .card__content {
    flex-direction: row;
    align-items: center;
  }
}`}
          title="Card with container queries"
        />

        <ExerciseCard
          description="Create a theme system with custom properties: two palettes (light and dark) activated by data-theme, with a button that toggles them from JavaScript."
          hint="Define the variables in :root, override them with html[data-theme='dark'], and toggle the attribute with document.documentElement."
          level="Hard"
          num={5}
          solution={`:root {
  --bg: #ffffff;
  --text: #1d1d1f;
}

html[data-theme="dark"] {
  --bg: #0a0a0a;
  --text: #f5f5f7;
}

body {
  background: var(--bg);
  color: var(--text);
  transition: background 0.3s ease, color 0.3s ease;
}

// Theme switch from JS
const html = document.documentElement;
const current = html.getAttribute("data-theme") ?? "light";
html.setAttribute("data-theme", current === "dark" ? "light" : "dark");`}
          title="Dynamic themes with variables"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        Modern CSS is a real language: animations with time control, layouts
        that respond to their container, and dynamic theme systems, all without
        JavaScript. The key is combining the pieces well — transitions for
        states, keyframes for sequences, custom properties for data — and
        animating only what the GPU can do fast. With this you have the base to
        build interfaces that feel alive and perform well.
      </BlogP>
    </article>
  );
}
