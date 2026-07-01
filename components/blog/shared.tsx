"use client";
import { useEffect, useState } from "react";

import { useT } from "@/hooks/useT";

// ── Heading components ─────────────────────────────────────────────────────────

export function BlogH1({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <h1
      className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white"
      id={id}
      style={{ letterSpacing: "-0.03em" }}
    >
      {children}
    </h1>
  );
}

export function BlogH2({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      className="text-xl font-bold text-[#1d1d1f] dark:text-white mt-12 mb-4 first:mt-0 flex items-center gap-2 scroll-mt-24"
      id={id}
    >
      <span className="w-1 h-6 rounded-full bg-emerald-500 shrink-0" />
      {children}
    </h2>
  );
}

export function BlogH3({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <h3
      className="text-base font-semibold text-[#1d1d1f] dark:text-white mt-8 mb-3 scroll-mt-24"
      id={id}
    >
      {children}
    </h3>
  );
}

export function BlogH4({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <h4
      className="text-sm font-semibold text-[#1d1d1f] dark:text-white mt-6 mb-2 scroll-mt-24"
      id={id}
    >
      {children}
    </h4>
  );
}

// ── Body text ──────────────────────────────────────────────────────────────────

export function BlogP({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm leading-relaxed text-[#3a3a3c] dark:text-[#aeaeb2] mb-4">
      {children}
    </p>
  );
}

// ── Code blocks ────────────────────────────────────────────────────────────────

export function BlogCode({ children }: { children: string }) {
  return (
    <pre className="bg-[#0d1117] rounded-xl p-4 overflow-x-auto text-xs leading-relaxed my-4 [&>code]:text-[#e6edf3]">
      <code>{children.trimEnd()}</code>
    </pre>
  );
}

export function BlogInlineCode({ children }: { children: string }) {
  return (
    <code className="bg-black/8 dark:bg-white/10 rounded px-1.5 py-0.5 text-xs font-mono text-[#1d1d1f] dark:text-[#e6edf3]">
      {children}
    </code>
  );
}

// ── Callout boxes ──────────────────────────────────────────────────────────────

const CALLOUT_STYLES = {
  tip: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300",
  warn: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300",
  info: "bg-sky-50 dark:bg-sky-950/20 border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-300",
  done: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300",
  danger:
    "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300",
};

function CalloutIcon({ type }: { type: keyof typeof CALLOUT_STYLES }) {
  const cls = "w-4 h-4 shrink-0 mt-0.5";

  switch (type) {
    case "tip":
      return (
        <svg
          aria-hidden="true"
          className={cls}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      );
    case "warn":
      return (
        <svg
          aria-hidden="true"
          className={cls}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      );
    case "info":
      return (
        <svg
          aria-hidden="true"
          className={cls}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      );
    case "done":
      return (
        <svg
          aria-hidden="true"
          className={cls}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      );
    case "danger":
      return (
        <svg
          aria-hidden="true"
          className={cls}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      );
  }
}

export function BlogCallout({
  type = "info",
  children,
}: {
  type?: keyof typeof CALLOUT_STYLES;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex gap-3 border rounded-xl px-4 py-3 my-5 text-sm ${CALLOUT_STYLES[type]}`}
      role="note"
    >
      <CalloutIcon type={type} />
      <div className="flex-1 min-w-0 [&>strong]:font-semibold">{children}</div>
    </div>
  );
}

// ── List ───────────────────────────────────────────────────────────────────────

export function BlogUl({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc pl-5 text-sm leading-relaxed text-[#3a3a3c] dark:text-[#aeaeb2] mb-4 space-y-1">
      {children}
    </ul>
  );
}

export function BlogOl({ children }: { children: React.ReactNode }) {
  return (
    <ol className="list-decimal pl-5 text-sm leading-relaxed text-[#3a3a3c] dark:text-[#aeaeb2] mb-4 space-y-1">
      {children}
    </ol>
  );
}

export function BlogLi({ children }: { children: React.ReactNode }) {
  return <li className="pl-1">{children}</li>;
}

// ── Image ──────────────────────────────────────────────────────────────────────

export function BlogImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-6">
      <img alt={alt} className="rounded-xl w-full" loading="lazy" src={src} />
      {caption && (
        <figcaption className="text-xs text-[#aeaeb2] dark:text-[#636366] text-center mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ── Icon components (reusable, consistent) ─────────────────────────────────────

export function IconArticle({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
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
  );
}

export function IconTutorial({
  className = "w-4 h-4",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 14l9-5-9-5-9 5 9 5z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconTool({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconChevronRight({
  className = "w-4 h-4",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M9 5l7 7-7 7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconChevronLeft({
  className = "w-4 h-4",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M15 19l-7-7 7-7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconSearch({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconClose({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M6 18L18 6M6 6l12 12"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconClock({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
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
  );
}

export function IconBook({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
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
  );
}

export function IconExternal({
  className = "w-4 h-4",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconHome({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconArrowLeft({
  className = "w-4 h-4",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconCheck({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 13l4 4L19 7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

// ── Filter bar ────────────────────────────────────────────────────────────────

export function FilterBar({ children }: { children: React.ReactNode }) {
  const { t } = useT();
  return (
    <div className="bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3 text-[#aeaeb2] dark:text-[#636366]">
        <svg
          aria-hidden="true"
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
        <span className="text-[11px] font-semibold uppercase tracking-wider">
          {t("blog.taxonomy.filters")}
        </span>
        <span
          aria-hidden="true"
          className="flex-1 h-px bg-black/6 dark:bg-white/6"
        />
      </div>
      {children}
    </div>
  );
}

// ── Table of Contents ──────────────────────────────────────────────────────────

interface TocItem {
  id: string;
  label: string;
  level: number;
}

export function BlogTableOfContents({
  contentRef,
}: {
  contentRef: React.RefObject<HTMLElement | null>;
}) {
  const { t } = useT();
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const el = contentRef.current;

    if (!el) return;
    const headings = el.querySelectorAll("h2, h3");
    const toc: TocItem[] = [];

    headings.forEach((h) => {
      if (!h.id) {
        h.id =
          h.textContent
            ?.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "") ?? "";
      }
      toc.push({
        id: h.id,
        label: h.textContent ?? "",
        level: h.tagName === "H2" ? 2 : 3,
      });
    });
    setItems(toc);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" },
    );

    headings.forEach((h) => observer.observe(h));

    return () => observer.disconnect();
  }, [contentRef]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label={t("blog.taxonomy.tableOfContents")}
      className="hidden lg:block sticky top-24 w-56 shrink-0"
    >
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-3">
        {t("blog.taxonomy.onThisPage")}
      </p>
      <ul className="space-y-1 border-l border-black/8 dark:border-white/8">
        {items.map((item) => (
          <li key={item.id}>
            <a
              className={`block text-xs py-1 transition-colors no-underline ${
                item.level === 3 ? "pl-6" : "pl-3"
              } ${
                activeId === item.id
                  ? "text-blue-600 dark:text-blue-400 font-medium border-l-2 border-blue-600 dark:border-blue-400 -ml-[1px]"
                  : "text-[#aeaeb2] dark:text-[#636366] hover:text-[#6e6e73] dark:hover:text-[#86868b]"
              }`}
              href={`#${item.id}`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
