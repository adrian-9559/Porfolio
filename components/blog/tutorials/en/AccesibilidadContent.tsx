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

export default function AccesibilidadContentEn() {
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
          50 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        Web accessibility: WCAG, ARIA and best practices
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Accessibility makes your site work for everyone, including people who
        use screen readers, navigate only with a keyboard, or have low vision.
        This tutorial covers the WCAG 2.2 principles, semantic HTML, ARIA,
        forms, keyboard, contrast, and how to test it all. Prerequisite: basic
        HTML and CSS.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="fundamentos">Fundamentals</BlogH2>

      <BlogP>
        Accessibility (a11y) is designing and building products that everyone
        can use, with or without a disability. It is not an extra: it is a
        quality requirement and, in many countries, a legal obligation.
      </BlogP>

      <BlogH3 id="usuarios">Affected users</BlogH3>

      <BlogUl>
        <BlogLi>
          <strong>Visual:</strong> blindness, low vision, color blindness. They
          use screen readers, zoom, or high contrast.
        </BlogLi>
        <BlogLi>
          <strong>Motor:</strong> difficulty using a mouse. They navigate with a
          keyboard, switches, or voice.
        </BlogLi>
        <BlogLi>
          <strong>Cognitive:</strong> difficulty processing information. They
          need clear text and predictable navigation.
        </BlogLi>
        <BlogLi>
          <strong>Auditory:</strong> deafness or hearing loss. They need
          captions and text alternatives to audio.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="info">
        Accessibility benefits everyone: captions help in noisy environments,
        high contrast helps in sunlight, and the keyboard is essential for
        developers and power users. It is a classic case of universal design.
      </BlogCallout>

      <BlogH3 id="wcag">WCAG 2.2</BlogH3>

      <BlogP>
        The <strong>Web Content Accessibility Guidelines</strong> are the
        international standard. They are organized into four principles (POUR):
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Perceivable:</strong> information must be perceivable (text
          alternatives, contrast, captions).
        </BlogLi>
        <BlogLi>
          <strong>Operable:</strong> the interface must be usable (keyboard,
          enough time, avoid seizures).
        </BlogLi>
        <BlogLi>
          <strong>Understandable:</strong> content must be comprehensible
          (language, predictable navigation, help with errors).
        </BlogLi>
        <BlogLi>
          <strong>Robust:</strong> it must work with assistive technologies
          (valid HTML, correct ARIA).
        </BlogLi>
      </BlogUl>

      <BlogP>
        Each criterion has a conformance level: <strong>A</strong> (minimum),{" "}
        <strong>AA</strong> (the usual target), and <strong>AAA</strong>{" "}
        (maximum, hard to meet everywhere). Most sites aim for AA.
      </BlogP>

      <BlogCallout type="tip">
        Do not chase AAA everywhere: some AAA criteria (like extreme contrast)
        degrade the experience of other users. The realistic, standard target is
        AA.
      </BlogCallout>

      <BlogH2 id="html-semantico">Semantic HTML</BlogH2>

      <BlogP>
        Semantic HTML is the foundation of accessibility: screen readers and
        search engines understand the page structure from the tags. Before
        adding ARIA, use the right element.
      </BlogP>

      <BlogH3 id="landmarks">Landmarks</BlogH3>

      <BlogP>
        Landmarks are regions you can jump to directly. The{" "}
        <BlogInlineCode>header</BlogInlineCode>,{" "}
        <BlogInlineCode>nav</BlogInlineCode>,{" "}
        <BlogInlineCode>main</BlogInlineCode>, and{" "}
        <BlogInlineCode>footer</BlogInlineCode> elements create automatic
        landmarks:
      </BlogP>

      <BlogCode>{`<header>Logo and site title</header>
<nav aria-label="Main">
  <a href="/">Home</a>
  <a href="/blog">Blog</a>
</nav>
<main>
  <h1>Main content</h1>
</main>
<footer>Contact and legal</footer>`}</BlogCode>

      <BlogP>
        If there are several <BlogInlineCode>nav</BlogInlineCode> elements,
        distinguish them with <BlogInlineCode>aria-label</BlogInlineCode> so the
        user knows which one to jump to.
      </BlogP>

      <BlogH3 id="heading-order">Heading order</BlogH3>

      <BlogP>
        Headings must follow a hierarchy without skips: one{" "}
        <BlogInlineCode>h1</BlogInlineCode> per page, then{" "}
        <BlogInlineCode>h2</BlogInlineCode>, <BlogInlineCode>h3</BlogInlineCode>{" "}
        in order. Jumping from <BlogInlineCode>h2</BlogInlineCode> to{" "}
        <BlogInlineCode>h4</BlogInlineCode> confuses screen reader users who
        navigate by headings.
      </BlogP>

      <BlogCallout type="warn">
        Do not choose the heading level by visual size. If an{" "}
        <BlogInlineCode>h3</BlogInlineCode> must look big, change its style with
        CSS; do not turn it into an <BlogInlineCode>h1</BlogInlineCode> just for
        the size.
      </BlogCallout>

      <BlogH3 id="button-vs-div">button vs clickable div</BlogH3>

      <BlogP>
        A clickable element must be a <BlogInlineCode>button</BlogInlineCode> or
        an <BlogInlineCode>a</BlogInlineCode>, not a{" "}
        <BlogInlineCode>div</BlogInlineCode> with an{" "}
        <BlogInlineCode>onClick</BlogInlineCode>. The native{" "}
        <BlogInlineCode>button</BlogInlineCode> is focusable, activatable with
        Enter and Space, and announced by screen readers:
      </BlogP>

      <BlogCode>{`{/* Bad: a clickable div is not focusable or announced */}
<div onClick={handleClick}>Open menu</div>

{/* Good: the native button brings keyboard and semantics */}
<button onClick={handleClick}>Open menu</button>`}</BlogCode>

      <BlogH3 id="listas">Lists</BlogH3>

      <BlogP>
        Use <BlogInlineCode>ul</BlogInlineCode>/
        <BlogInlineCode>ol</BlogInlineCode> for real lists. The screen reader
        announces "list of N items", which helps understand the structure. A
        navigation menu is a list of links.
      </BlogP>

      <BlogH3 id="label">label</BlogH3>

      <BlogP>
        Every form field needs an associated{" "}
        <BlogInlineCode>label</BlogInlineCode>. The{" "}
        <BlogInlineCode>for</BlogInlineCode> must match the field's{" "}
        <BlogInlineCode>id</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`<label htmlFor="email">Email address</label>
<input id="email" type="email" name="email" />`}</BlogCode>

      <BlogCallout type="info">
        The <BlogInlineCode>placeholder</BlogInlineCode> does not replace the{" "}
        <BlogInlineCode>label</BlogInlineCode>: it disappears when you type and
        is not always read. The label is the field's accessible name.
      </BlogCallout>

      <BlogH2 id="aria">ARIA</BlogH2>

      <BlogP>
        ARIA (Accessible Rich Internet Applications) adds semantics to elements
        that HTML cannot express. Its golden rule:{" "}
        <strong>do not use ARIA if native HTML already does it</strong>.
      </BlogP>

      <BlogCallout type="danger">
        The first rule of ARIA: if an HTML element does what you need, use it. A
        real <BlogInlineCode>button</BlogInlineCode> is better than a{" "}
        <BlogInlineCode>div</BlogInlineCode> with{" "}
        <BlogInlineCode>role="button"</BlogInlineCode>. ARIA does not add
        behavior: only semantics. If you use it, you must implement the keyboard
        and the state yourself.
      </BlogCallout>

      <BlogH3 id="aria-label">aria-label and aria-labelledby</BlogH3>

      <BlogP>
        <BlogInlineCode>aria-label</BlogInlineCode> gives an accessible name to
        an element without visible text.{" "}
        <BlogInlineCode>aria-labelledby</BlogInlineCode> references the{" "}
        <BlogInlineCode>id</BlogInlineCode> of another element that acts as the
        name:
      </BlogP>

      <BlogCode>{`{/* aria-label: a name for an icon without text */}
<button aria-label="Sign out">
  <svg aria-hidden="true">…</svg>
</button>

{/* aria-labelledby: the dialog title is its name */}
<div role="dialog" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Confirm deletion</h2>
</div>`}</BlogCode>

      <BlogH3 id="aria-describedby">aria-describedby</BlogH3>

      <BlogP>
        <BlogInlineCode>aria-describedby</BlogInlineCode> links additional
        description (help, error) to a field. The screen reader announces it
        after the name:
      </BlogP>

      <BlogCode>{`<label htmlFor="pass">Password</label>
<input id="pass" type="password" aria-describedby="pass-hint" />
<p id="pass-hint">Minimum 8 characters, with a number.</p>`}</BlogCode>

      <BlogH3 id="roles">Roles</BlogH3>

      <BlogP>
        Roles declare what an element is. The most common:{" "}
        <BlogInlineCode>dialog</BlogInlineCode>,{" "}
        <BlogInlineCode>alert</BlogInlineCode>,{" "}
        <BlogInlineCode>tablist</BlogInlineCode>,{" "}
        <BlogInlineCode>menu</BlogInlineCode>. Use them only when HTML has no
        equivalent.
      </BlogP>

      <BlogH3 id="estados">States</BlogH3>

      <BlogP>
        States communicate the status of a widget.{" "}
        <BlogInlineCode>aria-expanded</BlogInlineCode> indicates whether a panel
        is open; <BlogInlineCode>aria-pressed</BlogInlineCode> whether a toggle
        button is active:
      </BlogP>

      <BlogCode>{`<button aria-expanded={open} onClick={() => setOpen(!open)}>
  Filters {open ? "▲" : "▼"}
</button>

<button aria-pressed={active} onClick={() => setActive(!active)}>
  Bold
</button>`}</BlogCode>

      <BlogH3 id="aria-live">Live regions: aria-live</BlogH3>

      <BlogP>
        <BlogInlineCode>aria-live</BlogInlineCode> announces dynamic changes
        without the user having focus. It is essential for notifications,
        validation errors, and search results:
      </BlogP>

      <BlogCode>{`{/* polite: announces when the user is idle */}
<div aria-live="polite">{statusMessage}</div>

{/* assertive: interrupts to announce immediately */}
<div role="alert">{errorMessage}</div>`}</BlogCode>

      <BlogCallout type="warn">
        Use <BlogInlineCode>aria-live="assertive"</BlogInlineCode> sparingly: it
        interrupts the user. For most messages,{" "}
        <BlogInlineCode>polite</BlogInlineCode> is enough and less invasive.
      </BlogCallout>

      <BlogH2 id="formularios">Accessible forms</BlogH2>

      <BlogP>
        An accessible form combines associated labels, linked errors, and clear
        validation states.
      </BlogP>

      <BlogH3 id="labels">Associated labels</BlogH3>

      <BlogP>
        Each field has its <BlogInlineCode>label</BlogInlineCode> with{" "}
        <BlogInlineCode>htmlFor</BlogInlineCode>. Required fields are marked
        with <BlogInlineCode>required</BlogInlineCode> and{" "}
        <BlogInlineCode>aria-required</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`<label htmlFor="name">Name *</label>
<input id="name" name="name" required aria-required="true" />`}</BlogCode>

      <BlogH3 id="errores">Linked error messages</BlogH3>

      <BlogP>
        The error is linked to the field with{" "}
        <BlogInlineCode>aria-describedby</BlogInlineCode> and the invalid field
        is marked with <BlogInlineCode>aria-invalid</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`<label htmlFor="email">Email</label>
<input
  id="email"
  type="email"
  aria-invalid={!!error}
  aria-describedby={error ? "email-error" : undefined}
/>
{error && <p id="email-error" role="alert">{error}</p>}`}</BlogCode>

      <BlogCallout type="tip">
        Do not use color alone to indicate an error: add an icon and text. Color
        is not accessible to color-blind people nor to screen readers.
      </BlogCallout>

      <BlogH2 id="teclado">Keyboard navigation</BlogH2>

      <BlogP>
        All functionality must be operable with a keyboard. The Tab key moves
        through focusable elements in document order.
      </BlogP>

      <BlogH3 id="tabindex">tabindex</BlogH3>

      <BlogP>
        <BlogInlineCode>tabindex</BlogInlineCode> controls the tab order:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>0:</strong> the element enters the natural order (to make a
          non-focusable element focusable).
        </BlogLi>
        <BlogLi>
          <strong>-1:</strong> focusable by script but not by Tab (to move focus
          to a modal or error).
        </BlogLi>
        <BlogLi>
          <strong>&gt; 0:</strong> avoid it. It breaks the natural document
          order and is hard to maintain.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="danger">
        Never use a <BlogInlineCode>tabindex</BlogInlineCode> greater than 0.
        The tab order must follow the document order; positive values create an
        artificial order that confuses keyboard users.
      </BlogCallout>

      <BlogH3 id="focus-management">Focus management in modals</BlogH3>

      <BlogP>
        When a modal opens, focus must move inside; when it closes, return to
        the element that opened it. Without this, the keyboard user is "trapped"
        or loses context:
      </BlogP>

      <BlogCode>{`import { useEffect, useRef } from "react";

export function Modal({ open, onClose, title }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <h2 id="modal-title">{title}</h2>
      <button ref={closeRef} onClick={onClose}>Close</button>
    </div>
  );
}`}</BlogCode>

      <BlogH3 id="skip-links">Skip links</BlogH3>

      <BlogP>
        A skip link lets you jump past the navigation and go straight to the
        content. It is the first link on the page, usually hidden until it
        receives focus:
      </BlogP>

      <BlogCode>{`<a href="#main" className="sr-only focus:not-sr-only">
  Skip to content
</a>
<main id="main">…</main>`}</BlogCode>

      <BlogH3 id="focus-visible">:focus-visible</BlogH3>

      <BlogP>
        <BlogInlineCode>:focus-visible</BlogInlineCode> shows the focus ring
        only when navigating with a keyboard, not when clicking. It is the
        modern way to not remove visible focus:
      </BlogP>

      <BlogCode>{`/* Bad: removes focus for everyone */
button:focus { outline: none; }

/* Good: only hides the ring when using the mouse */
button:focus:not(:focus-visible) { outline: none; }
button:focus-visible { outline: 2px solid #2563eb; }`}</BlogCode>

      <BlogCallout type="warn">
        Never remove the <BlogInlineCode>outline</BlogInlineCode> without
        replacing it. The focus ring is the only visual position signal for
        keyboard users.
      </BlogCallout>

      <BlogH2 id="contraste">Contrast and color</BlogH2>

      <BlogP>
        The contrast between text and background must meet WCAG ratios:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Normal text:</strong> ≥ 4.5:1 (AA).
        </BlogLi>
        <BlogLi>
          <strong>Large text (≥ 18px or 14px bold):</strong> ≥ 3:1.
        </BlogLi>
        <BlogLi>
          <strong>UI components and graphics:</strong> ≥ 3:1.
        </BlogLi>
      </BlogUl>

      <BlogP>
        Also, color must not be the only signal of a state. A link that only
        changes color is invisible to a color-blind person; add an underline or
        an icon.
      </BlogP>

      <BlogH3 id="reduced-motion">prefers-reduced-motion</BlogH3>

      <BlogP>
        Respect the user's preference to reduce motion. The{" "}
        <BlogInlineCode>prefers-reduced-motion</BlogInlineCode> media query lets
        you disable animations:
      </BlogP>

      <BlogCode>{`@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`}</BlogCode>

      <BlogCallout type="info">
        Excessive motion can cause dizziness or seizures in people with
        vestibular sensitivity or photosensitive epilepsy. Animations must be
        optional, not mandatory.
      </BlogCallout>

      <BlogH2 id="testing">Accessibility testing</BlogH2>

      <BlogP>
        Automated testing detects a portion of the problems; manual testing
        covers the rest. Combine both.
      </BlogP>

      <BlogH3 id="automatizado">Automated tools</BlogH3>

      <BlogUl>
        <BlogLi>
          <strong>axe-core:</strong> the most used detection engine. It
          integrates into DevTools and tests.
        </BlogLi>
        <BlogLi>
          <strong>Lighthouse a11y:</strong> accessibility audit inside
          Lighthouse.
        </BlogLi>
        <BlogLi>
          <strong>jest-axe:</strong> runs axe in component tests.
        </BlogLi>
        <BlogLi>
          <strong>eslint-plugin-jsx-a11y:</strong> detects issues in JSX code
          (labels, roles, alt).
        </BlogLi>
      </BlogUl>

      <BlogCode>{`// jest-axe in a component test
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

it("has no accessibility violations", async () => {
  const { container } = render(<LoginForm />);
  expect(await axe(container)).toHaveNoViolations();
});`}</BlogCode>

      <BlogH3 id="manual">Manual testing</BlogH3>

      <BlogP>
        The most valuable manual test: navigate the whole app with the keyboard
        only. If you cannot complete a task without a mouse, there is a problem.
        Also test with a screen reader (VoiceOver on macOS, NVDA on Windows) and
        with 200% zoom.
      </BlogP>

      <BlogCallout type="tip">
        Accessibility testing is a pyramid: lint in the editor, axe in CI,
        Lighthouse on each release, and a manual keyboard + screen reader test
        before publishing. Each layer catches a different kind of error.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Exercises</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Turn a clickable div into an accessible button with an accessible name and expanded state."
          hint="Use the native <button>, aria-expanded, and an aria-label if there is no visible text."
          level="Easy"
          num={1}
          solution={`<button
  aria-expanded={open}
  onClick={() => setOpen(!open)}
>
  <span>Filters</span>
  <svg aria-hidden="true">…</svg>
</button>`}
          title="Accessible button"
        />

        <ExerciseCard
          description="Associate a label with a form field and link an error message with aria-describedby and aria-invalid."
          hint="htmlFor/id, aria-invalid={!!error}, and aria-describedby pointing to the error id."
          level="Easy"
          num={2}
          solution={`<label htmlFor="email">Email address</label>
<input
  id="email"
  type="email"
  aria-invalid={!!error}
  aria-describedby={error ? "email-error" : undefined}
/>
{error && (
  <p id="email-error" role="alert">{error}</p>
)}`}
          title="Form with linked error"
        />

        <ExerciseCard
          description="Implement an accessible modal that moves focus when it opens and returns it when it closes."
          hint="useRef + useEffect to focus on open, and save the opener element to restore focus."
          level="Intermediate"
          num={3}
          solution={`import { useEffect, useRef } from "react";

export function Modal({ open, onClose, title }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      openerRef.current = document.activeElement as HTMLElement;
      closeRef.current?.focus();
    } else {
      openerRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <h2 id="modal-title">{title}</h2>
      <button ref={closeRef} onClick={onClose}>Close</button>
    </div>
  );
}`}
          title="Modal with focus management"
        />

        <ExerciseCard
          description="Add a skip link and make sure focus is visible only when navigating with the keyboard."
          hint="sr-only focus:not-sr-only link to #main, and :focus-visible for the ring."
          level="Intermediate"
          num={4}
          solution={`<a href="#main" className="sr-only focus:not-sr-only">
  Skip to content
</a>
<main id="main">…</main>

/* globals.css */
button:focus:not(:focus-visible) { outline: none; }
button:focus-visible { outline: 2px solid #2563eb; }`}
          title="Skip link and visible focus"
        />

        <ExerciseCard
          description="Create an aria-live region that announces a search result without the user having focus on it."
          hint='aria-live="polite" on a container that updates with the result.'
          level="Hard"
          num={5}
          solution={`import { useState } from "react";

export function SearchResults() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = async (value: string) => {
    setQuery(value);
    const data = await search(value);
    setResults(data);
  };

  return (
    <div>
      <label htmlFor="search">Search</label>
      <input
        id="search"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {/* The screen reader announces the change without focus being here */}
      <div aria-live="polite">
        {results.length > 0
          ? \`\${results.length} results\`
          : "No results"}
      </div>
    </div>
  );
}`}
          title="Live region for results"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        Accessibility is not a checklist: it is a way of thinking about the
        product. Start with semantic HTML, add ARIA only where needed, respect
        keyboard and contrast, and automate testing so errors do not come back.
        In the end, an accessible web is a better web for everyone.
      </BlogP>
    </article>
  );
}
