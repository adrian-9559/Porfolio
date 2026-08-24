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

export default function JavaScriptAvanzadoContentEn() {
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
        Modern JavaScript: async and browser APIs
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        The heart of any modern web application is asynchronous code: API
        requests, DOM events, timers, and storage. This tutorial dives into
        promises, async/await, fetch with cancellation, DOM observers, ES
        modules, and the browser APIs you use daily without thinking. Conceptual
        prerequisite: basic JavaScript (functions, arrays, and objects).
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="promesas">Promises in depth</BlogH2>

      <BlogP>
        A <strong>promise</strong> represents a value that may be available now,
        in the future, or never. It has three states: <strong>pending</strong>,{" "}
        <strong>fulfilled</strong>, and <strong>rejected</strong>. Once it
        leaves <em>pending</em>, its state never changes:
      </BlogP>

      <BlogCode>{`const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const request = fetch("https://api.example.com/data");

// States
console.log(request);            // Promise { <pending> }
request.then((res) => {
  console.log("Resolved:", res); // fulfilled
});`}</BlogCode>

      <BlogP>
        <strong>Chaining</strong> links <BlogInlineCode>.then()</BlogInlineCode>{" "}
        calls and returns a new promise, letting you transform the value and
        propagate errors down the chain:
      </BlogP>

      <BlogCode>{`fetch("https://api.example.com/users/1")
  .then((res) => res.json())
  .then((user) => {
    // If this throws, the chain jumps to .catch
    console.log(user.name);
  })
  .catch((error) => {
    console.error("Something failed:", error);
  })
  .finally(() => {
    console.log("The request finished (no matter what)");
  });`}</BlogCode>

      <BlogCallout type="warn">
        An error thrown inside a <BlogInlineCode>.then()</BlogInlineCode> does
        not propagate to the original promise: it propagates to the promise
        returned by that <BlogInlineCode>.then()</BlogInlineCode>. Always chain
        the <BlogInlineCode>.catch()</BlogInlineCode> at the end of the chain.
      </BlogCallout>

      <BlogH3 id="combinadores">Combinators: all, allSettled, race, any</BlogH3>

      <BlogP>
        When you need several promises at once, JavaScript offers four
        combinators with different semantics:
      </BlogP>

      <BlogCode>{`// Promise.all: waits for ALL; if one fails, everything fails.
const [users, products] = await Promise.all([
  fetch("/api/users").then((r) => r.json()),
  fetch("/api/products").then((r) => r.json()),
]);

// Promise.allSettled: waits for ALL; returns each result.
const results = await Promise.allSettled([
  fetch("/a"),
  fetch("/b"),
  fetch("/c"),
]);
results.forEach((r) => {
  if (r.status === "fulfilled") {
    console.log("OK:", r.value);
  } else {
    console.log("FAILED:", r.reason);
  }
});

// Promise.race: the first to finish wins (resolved or rejected).
const fastest = await Promise.race([loadSlow(), loadFast()]);

// Promise.any: the first to RESOLVE; only fails if ALL fail.
const firstOk = await Promise.any([replicaA(), replicaB(), replicaC()]);`}</BlogCode>

      <BlogCallout type="tip">
        <BlogInlineCode>Promise.all</BlogInlineCode> with an empty array
        resolves with an empty array (useful as a "gate").{" "}
        <BlogInlineCode>Promise.any</BlogInlineCode> with all promises rejected
        throws an <BlogInlineCode>AggregateError</BlogInlineCode> containing all
        the reasons.
      </BlogCallout>

      <BlogP>
        <BlogInlineCode>Promise.all</BlogInlineCode> fails fast: if one promise
        rejects, the others keep running in the background but their results are
        discarded. To actually "stop" the others you need{" "}
        <BlogInlineCode>AbortController</BlogInlineCode> (we cover it in fetch).
      </BlogP>

      <BlogH2 id="async-await">async/await</BlogH2>

      <BlogP>
        <BlogInlineCode>async/await</BlogInlineCode> is syntactic sugar over
        promises: it lets you write asynchronous code with the visual structure
        of synchronous code. An <BlogInlineCode>async</BlogInlineCode> function
        always returns a promise:
      </BlogP>

      <BlogCode>{`async function getUser(id: number) {
  const res = await fetch("/api/users/" + id);
  if (!res.ok) throw new Error("User not found");
  return res.json();
}

// The above is equivalent to:
function getUser(id: number) {
  return fetch("/api/users/" + id).then((res) => {
    if (!res.ok) throw new Error("User not found");
    return res.json();
  });
}`}</BlogCode>

      <BlogP>
        Error handling with <BlogInlineCode>try/catch</BlogInlineCode> catches
        both <BlogInlineCode>await</BlogInlineCode> rejections and synchronous
        errors from the same function:
      </BlogP>

      <BlogCode>{`async function loadProfile(id: number) {
  try {
    const user = await getUser(id);
    const posts = await getPosts(user.id);
    return { user, posts };
  } catch (error) {
    console.error("Could not load the profile:", error);
    return null; // graceful degradation
  }
}`}</BlogCode>

      <BlogCallout type="warn">
        Serial <BlogInlineCode>await</BlogInlineCode> is slow:{" "}
        <BlogInlineCode>await a(); await b()</BlogInlineCode> runs{" "}
        <BlogInlineCode>b</BlogInlineCode> only after{" "}
        <BlogInlineCode>a</BlogInlineCode> finishes. If there is no dependency
        between them, run them in parallel. In the example above,{" "}
        <BlogInlineCode>getUser</BlogInlineCode> must finish before fetching its
        posts — but two independent posts should go with{" "}
        <BlogInlineCode>Promise.all</BlogInlineCode>.
      </BlogCallout>

      <BlogP>
        <strong>Top-level await</strong> lets you use{" "}
        <BlogInlineCode>await</BlogInlineCode> outside an async function, in the
        body of an ES module. It is the basis for loading dependencies that
        naturally need others:
      </BlogP>

      <BlogCode>{`// config.ts
const config = await fetch("/api/config").then((r) => r.json());

// Another module can import it knowing it is already ready
export const apiUrl = config.apiUrl;`}</BlogCode>

      <BlogCallout type="info">
        Top-level await blocks the module's evaluation until it resolves, and
        therefore also blocks whoever imports it. Use it for essential
        initialization and avoid it in public libraries: it slows down app
        startup.
      </BlogCallout>

      <BlogH2 id="fetch">Fetch and consuming APIs</BlogH2>

      <BlogP>
        <BlogInlineCode>fetch</BlogInlineCode> is the native API for HTTP
        requests. It returns a promise that resolves when the{" "}
        <strong>headers</strong> arrive, not when the body does. That is why you
        must call <BlogInlineCode>res.json()</BlogInlineCode> (or{" "}
        <BlogInlineCode>res.text()</BlogInlineCode>) to read the content:
      </BlogP>

      <BlogCode>{`async function sendData(data: object) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": "pk_123", // example custom header
    },
    body: JSON.stringify(data),
  });

  // fetch does NOT throw on 4xx/5xx: you must check it yourself
  if (!res.ok) {
    const detail = await res.text();
    throw new Error("HTTP " + res.status + ": " + detail);
  }

  return res.json();
}`}</BlogCode>

      <BlogCallout type="warn">
        Checking <BlogInlineCode>res.ok</BlogInlineCode> (or the{" "}
        <BlogInlineCode>status</BlogInlineCode>) is mandatory:{" "}
        <BlogInlineCode>fetch</BlogInlineCode> only rejects the promise on
        network errors (DNS, dropped connection, CORS), never on a 404 or 500.
        An API that responds 500 without checking "seems to work" and returns an
        error HTML as if it were JSON.
      </BlogCallout>

      <BlogH3 id="abort">AbortController and cancellation</BlogH3>

      <BlogP>
        <BlogInlineCode>AbortController</BlogInlineCode> lets you cancel an
        in-flight request. It is essential in components that unmount, in
        searches that type faster than they respond, and in network timeouts:
      </BlogP>

      <BlogCode>{`function searchWithTimeout(query: string) {
  const controller = new AbortController();

  const timeout = setTimeout(() => controller.abort(), 5000);

  return fetch("/api/search?q=" + encodeURIComponent(query), {
    signal: controller.signal,
  })
    .then((res) => {
      clearTimeout(timeout);
      return res.json();
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        throw new Error("The search took too long");
      }
      throw error;
    });
}`}</BlogCode>

      <BlogP>
        A cleaner way for timeouts is{" "}
        <BlogInlineCode>AbortSignal.timeout()</BlogInlineCode>, which aborts
        automatically after the given milliseconds:
      </BlogP>

      <BlogCode>{`const res = await fetch("/api/slow", {
  signal: AbortSignal.timeout(5000),
}).catch((error) => {
  if (error.name === "AbortError") {
    console.warn("Timeout: the API did not respond in time");
  }
});`}</BlogCode>

      <BlogH2 id="dom-avanzado">Advanced DOM</BlogH2>

      <BlogH3 id="data-attributes">data-* and classList</BlogH3>

      <BlogP>
        The <BlogInlineCode>data-*</BlogInlineCode> attributes store arbitrary
        data on an element without interfering with HTML semantics. They are
        read with <BlogInlineCode>dataset</BlogInlineCode> (camelCase) and
        updated live:
      </BlogP>

      <BlogCode>{`<button data-action="delete" data-id="42">Delete</button>

<script>
  const button = document.querySelector("button[data-action='delete']");
  console.log(button.dataset.action); // "delete"
  console.log(button.dataset.id);     // "42"
  button.dataset.state = "confirming";
</script>`}</BlogCode>

      <BlogP>
        <BlogInlineCode>classList</BlogInlineCode> is the safe way to manipulate
        classes: <BlogInlineCode>add</BlogInlineCode>,{" "}
        <BlogInlineCode>remove</BlogInlineCode>,{" "}
        <BlogInlineCode>toggle</BlogInlineCode> and{" "}
        <BlogInlineCode>contains</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`const panel = document.getElementById("panel");

panel.classList.add("open");              // adds a class
panel.classList.remove("open");           // removes it
panel.classList.toggle("open");           // toggles
const isOpen = panel.classList.contains("open");

// With a second argument (force)
panel.classList.toggle("open", hasNews);`}</BlogCode>

      <BlogH3 id="delegacion">Event delegation and closest()</BlogH3>

      <BlogP>
        DOM events <em>bubble</em>: a click on a child travels up to its
        ancestors. <strong>Event delegation</strong> takes advantage of this to
        listen once on a container instead of attaching a listener to every
        child — essential in dynamic lists:
      </BlogP>

      <BlogCode>{`const list = document.getElementById("list");

list.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  const row = target.closest("tr[data-id]");
  if (!row) return; // the click was not on a valid row

  const id = row.dataset.id;
  if (target.matches("button.delete")) {
    deleteRow(id);
  } else if (target.matches("button.edit")) {
    openEditor(id);
  }
});`}</BlogCode>

      <BlogCallout type="info">
        <BlogInlineCode>closest()</BlogInlineCode> walks upward looking for the
        ancestor that matches the selector;{" "}
        <BlogInlineCode>matches()</BlogInlineCode> checks whether a specific
        element matches it. Combining both with delegation is the pattern behind
        tables and lists across the web.
      </BlogCallout>

      <BlogH3 id="observadores">
        IntersectionObserver and MutationObserver
      </BlogH3>

      <BlogP>
        <BlogInlineCode>IntersectionObserver</BlogInlineCode> notifies when an
        element enters or leaves the viewport (or crosses another element). It
        is the basis of lazy loading and scroll effects without touching the{" "}
        <BlogInlineCode>scroll</BlogInlineCode> event:
      </BlogP>

      <BlogCode>{`const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadImage(entry.target as HTMLImageElement);
        observer.unobserve(entry.target); // only once
      }
    });
  },
  { rootMargin: "200px" } // preload 200px before entering
);

document.querySelectorAll("img[data-lazy]").forEach((img) => {
  observer.observe(img);
});`}</BlogCode>

      <BlogP>
        <BlogInlineCode>MutationObserver</BlogInlineCode> observes DOM changes:
        added nodes, modified attributes, or changed text. It is the way to
        react to changes you do not control (third-party code, extensions,
        SPAs):
      </BlogP>

      <BlogCode>{`const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement && node.matches(".ad")) {
          node.remove(); // blocks injected ads
        }
      });
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });`}</BlogCode>

      <BlogCallout type="warn">
        <strong>Observers</strong> should not replace your framework's
        architecture (React/Vue manage their own DOM). Use them for integrations
        with external libraries and lazy loading. And always call{" "}
        <BlogInlineCode>disconnect()</BlogInlineCode> or{" "}
        <BlogInlineCode>unobserve()</BlogInlineCode> to avoid leaking listeners.
      </BlogCallout>

      <BlogH2 id="modulos">ES modules</BlogH2>

      <BlogP>
        ES modules organize code into units with explicit dependencies. Each
        module has its own scope: what is not exported does not exist outside:
      </BlogP>

      <BlogCode>{`// utils.ts
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export const VERSION = "1.0.0";

// default: a single main export per module
export default function greet(name: string) {
  return "Hello, " + name;
}

// app.ts
import greet, { formatCurrency, VERSION } from "./utils.js";

console.log(greet("Ana"));
console.log(formatCurrency(19.99));`}</BlogCode>

      <BlogP>
        <strong>Dynamic import()</strong> loads a module on demand, returning a
        promise. It is the basis of code splitting and route lazy loading in
        frameworks like Next.js:
      </BlogP>

      <BlogCode>{`// Loads only when the user needs it
async function openEditor() {
  const module = await import("./editor.js");
  module.startEditor();
}

// Conditional load based on the browser
if (navigator.clipboard) {
  const { copy } = await import("./clipboard.js");
  copy(text);
}`}</BlogCode>

      <BlogCallout type="tip">
        <strong>Tree-shaking</strong> removes from the final bundle the exports
        that are never imported. For it to work, write named exports (no side
        effects in the module) and avoid importing whole libraries when you only
        use one function.
      </BlogCallout>

      <BlogH2 id="apis-navegador">Browser APIs</BlogH2>

      <BlogH3 id="storage">localStorage and sessionStorage</BlogH3>

      <BlogP>
        <BlogInlineCode>localStorage</BlogInlineCode> persists between sessions
        and <BlogInlineCode>sessionStorage</BlogInlineCode> is cleared when the
        tab closes. Both store only <strong>strings</strong>, so objects are
        serialized with JSON:
      </BlogP>

      <BlogCode>{`// Save
const prefs = { theme: "dark", language: "en" };
localStorage.setItem("prefs", JSON.stringify(prefs));

// Read (with a default value and try/catch)
function readPrefs() {
  try {
    const raw = localStorage.getItem("prefs");
    return raw ? JSON.parse(raw) : { theme: "light" };
  } catch {
    return { theme: "light" }; // corrupted JSON
  }
}

// Remove
localStorage.removeItem("prefs");
sessionStorage.setItem("token", "abc123");`}</BlogCode>

      <BlogCallout type="warn">
        <BlogInlineCode>localStorage</BlogInlineCode> is synchronous and blocks
        the main thread, and it is not safe for sensitive data (any script on
        the page can read it). For sessions use httpOnly cookies or in-memory
        storage; for large data, IndexedDB.
      </BlogCallout>

      <BlogH3 id="url">URL and URLSearchParams</BlogH3>

      <BlogP>
        <BlogInlineCode>URL</BlogInlineCode> parses and builds URLs safely, and{" "}
        <BlogInlineCode>URLSearchParams</BlogInlineCode> handles the query
        string without concatenating strings by hand:
      </BlogP>

      <BlogCode>{`const url = new URL("https://api.example.com/search");
url.searchParams.set("q", "advanced javascript");
url.searchParams.set("page", "2");
url.searchParams.delete("filter");

console.log(url.toString());
// https://api.example.com/search?q=advanced+javascript&page=2

// Read the current URL
const current = new URL(window.location.href);
const term = current.searchParams.get("q");
const page = Number(current.searchParams.get("page") ?? "1");`}</BlogCode>

      <BlogH3 id="clipboard">Clipboard API</BlogH3>

      <BlogP>
        The <strong>Clipboard API</strong> writes and reads from the clipboard
        asynchronously and securely (it requires permission or a user gesture):
      </BlogP>

      <BlogCode>{`async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Copied");
  } catch (error) {
    console.error("Could not copy:", error);
  }
}

// Fallback for contexts without permission
async function copyWithFallback(text: string) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const area = document.createElement("textarea");
  area.value = text;
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  area.remove();
}`}</BlogCode>

      <BlogH3 id="intl">Intl for dates and numbers</BlogH3>

      <BlogP>
        <BlogInlineCode>Intl</BlogInlineCode> formats dates, numbers, and
        currencies according to the locale, without external libraries:
      </BlogP>

      <BlogCode>{`const date = new Date("2026-08-03T10:00:00Z");

new Intl.DateTimeFormat("en-US", {
  dateStyle: "full",
  timeStyle: "short",
}).format(date);
// "Monday, August 3, 2026 at 12:00 PM"

new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format(1234.5);
// "$1,234.50"

new Intl.RelativeTimeFormat("en", { numeric: "auto" })
  .format(-2, "day");
// "2 days ago"`}</BlogCode>

      <BlogH3 id="structuredClone">structuredClone</BlogH3>

      <BlogP>
        <BlogInlineCode>structuredClone()</BlogInlineCode> makes a deep copy of
        an object, including dates, Map, Set, and nested arrays — something{" "}
        <BlogInlineCode>JSON.parse(JSON.stringify())</BlogInlineCode> cannot:
      </BlogP>

      <BlogCode>{`const original = {
  name: "Ana",
  date: new Date(),
  tags: new Set(["js", "async"]),
};

const copy = structuredClone(original);
copy.tags.add("dom");

console.log(original.tags.has("dom")); // false: independent copy`}</BlogCode>

      <BlogCallout type="info">
        <BlogInlineCode>structuredClone</BlogInlineCode> does not clone
        functions or symbols, and throws an error if it finds something
        non-clonable (like a DOM element). For those cases, a manual clone or a
        library is still needed.
      </BlogCallout>

      <BlogH2 id="buenas-practicas">Async best practices</BlogH2>

      <BlogH3 id="race-conditions">Avoiding race conditions</BlogH3>

      <BlogP>
        A <strong>race condition</strong> happens when two async responses
        compete and the older one arrives after the newer one, overwriting the
        state with stale data. The classic pattern is autocomplete search:
      </BlogP>

      <BlogCode>{`let currentRequest = 0;

async function search(query: string) {
  const id = ++currentRequest; // tag this request

  const res = await fetch("/api/search?q=" + query);
  const data = await res.json();

  // If a newer request arrived, discard this one
  if (id !== currentRequest) return;
  renderResults(data);
}`}</BlogCode>

      <BlogCallout type="tip">
        The modern alternative is{" "}
        <BlogInlineCode>AbortController</BlogInlineCode>: abort the previous
        request before launching the new one. That way you not only ignore the
        result but also free the network connection.
      </BlogCallout>

      <BlogH3 id="throttle-debounce">Throttling and debouncing</BlogH3>

      <BlogP>
        High-frequency events (scroll, resize, input) fire too many times per
        second. Two techniques limit them:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Debounce:</strong> runs the function only after a period
          without new events. Ideal for searches while typing.
        </BlogLi>
        <BlogLi>
          <strong>Throttle:</strong> runs at most once every X milliseconds.
          Ideal for scroll and resize.
        </BlogLi>
      </BlogUl>

      <BlogCode>{`function debounce<T extends (...args: never[]) => void>(
  fn: T,
  wait: number
) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

const debouncedSearch = debounce((q: string) => {
  search(q);
}, 300);

input.addEventListener("input", (e) => {
  debouncedSearch((e.target as HTMLInputElement).value);
});`}</BlogCode>

      <BlogCallout type="warn">
        Do not reinvent the wheel in production: React Query, SWR, and state
        libraries already handle race conditions, caching, and cancellation.
        These manual techniques are for understanding the mechanism and for
        vanilla code or one-off integrations.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Exercises</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Write an async function that loads two independent resources in parallel with Promise.all and returns both."
          hint="fetch both without serial await; use Promise.all([...])."
          level="Easy"
          num={1}
          solution={`async function loadAll() {
  const [users, products] = await Promise.all([
    fetch("/api/users").then((r) => r.json()),
    fetch("/api/products").then((r) => r.json()),
  ]);
  return { users, products };
}`}
          title="Parallel loading"
        />

        <ExerciseCard
          description="Implement a search with a 300ms debounce that avoids firing a request for every keystroke."
          hint="clearTimeout + setTimeout inside the debounce function."
          level="Intermediate"
          num={2}
          solution={`function debounce(fn, wait) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

const search = debounce((q) => {
  fetch("/api/search?q=" + encodeURIComponent(q));
}, 300);

input.addEventListener("input", (e) => {
  search(e.target.value);
});`}
          title="Search debounce"
        />

        <ExerciseCard
          description="Cancel a fetch request when the user clicks a 'Cancel' button, using AbortController."
          hint="Pass signal to fetch and call controller.abort() on click."
          level="Intermediate"
          num={3}
          solution={`const controller = new AbortController();

async function load() {
  try {
    const res = await fetch("/api/data", {
      signal: controller.signal,
    });
    return await res.json();
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Request cancelled by the user");
    } else {
      throw error;
    }
  }
}

cancelButton.addEventListener("click", () => controller.abort());`}
          title="Cancel a request"
        />

        <ExerciseCard
          description="Implement image lazy loading with IntersectionObserver: load the real src only when the image enters the viewport."
          hint="Observe img[data-src] and assign the src when isIntersecting is true."
          level="Hard"
          num={4}
          solution={`const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const img = entry.target as HTMLImageElement;
      img.src = img.dataset.src ?? "";
      img.removeAttribute("data-src");
      observer.unobserve(img);
    });
  },
  { rootMargin: "200px" }
);

document.querySelectorAll("img[data-src]").forEach((img) => {
  observer.observe(img);
});`}
          title="Image lazy loading"
        />

        <ExerciseCard
          description="Write a function that avoids a race condition in a search: if a newer request arrives, discard the previous one."
          hint="Keep a request counter and compare the id when resolving."
          level="Hard"
          num={5}
          solution={`let currentRequest = 0;

async function search(query) {
  const id = ++currentRequest;
  const res = await fetch("/api/search?q=" + query);
  const data = await res.json();
  if (id !== currentRequest) return; // stale
  render(data);
}`}
          title="Avoid a race condition"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        Asynchrony is what makes the web feel alive: promises to coordinate,
        async/await to read it clearly, fetch to talk to the server, and the
        browser APIs to interact with the environment. Mastering the
        combinators, cancellation, and observers sets you apart from someone who
        just chains .then(). With these pieces you can build fast, robust
        interfaces without race conditions.
      </BlogP>
    </article>
  );
}
