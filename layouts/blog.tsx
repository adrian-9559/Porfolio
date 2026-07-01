"use client";
import type { HeadProps } from "./head";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { Head } from "./head";

import { Navbar } from "@/components/navbar";
import { useT } from "@/hooks/useT";
import { siteConfig } from "@/config/site";
import { allContent, typeSlug, allGuides } from "@/lib/blog/registry";
import { CATEGORY_GROUPS } from "@/lib/blog/taxonomy";
import {
  IconSearch,
  IconClose,
  IconHome,
  IconChevronRight,
  IconArticle,
  IconTutorial,
  IconTool,
  IconBook,
} from "@/components/blog/shared";

// ── Sidebar data model ────────────────────────────────────────────────────────

interface NavItem {
  id: string;
  label: string;
  href: string;
  color?: string;
}

interface NavGroup {
  id: string;
  label: string;
  href?: string; // optional listing link
  icon: React.ReactNode;
  color: string;
  items?: NavItem[];
  children?: NavGroup[]; // nested sub-groups
  defaultOpen?: boolean;
}

// ── Build the nav tree from registry ─────────────────────────────────────────

const GROUP_COLORS: Record<string, string> = {
  programming: "text-blue-500",
  web: "text-cyan-500",
  backend: "text-green-500",
  ai: "text-violet-500",
  devops: "text-orange-500",
  databases: "text-blue-600",
  architecture: "text-slate-500",
  resources: "text-amber-500",
};

function getGroupColor(groupId: string): string {
  return GROUP_COLORS[groupId] ?? "text-gray-500";
}

function FolderIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

function buildNav(t: (key: string) => string): NavGroup[] {
  const tutorials = allContent.filter((c) => c.type === "tutorial");
  const articles = allContent.filter((c) => c.type === "article");
  const tools = allContent.filter((c) => c.type === "tool");

  const allLearning = [...tutorials, ...articles];

  const groups: NavGroup[] = [];

  // 1. Category groups from taxonomy (tutorials + articles grouped by category)
  for (const catGroup of CATEGORY_GROUPS) {
    const items = allLearning.filter((c) =>
      catGroup.categories.includes(c.categoryId),
    );

    if (items.length === 0) continue;

    const sorted = [...items].sort((a, b) => a.title.localeCompare(b.title));

    groups.push({
      id: catGroup.id,
      label: catGroup.label,
      color: getGroupColor(catGroup.id),
      icon: <FolderIcon />,
      items: sorted.map((c) => ({
        id: c.id,
        label: c.title,
        href: `/blog/${typeSlug(c.type)}/${c.slug}`,
        color: c.categoryColor,
      })),
      defaultOpen: true,
    });
  }

  // 2. Guides section
  if (allGuides.length > 0) {
    groups.push({
      id: "guias",
      label: t("nav.blogGuides"),
      href: "/blog/tutoriales/guias",
      color: "text-amber-500",
      icon: <IconBook className="w-3.5 h-3.5" />,
      items: allGuides.map((g) => ({
        id: g.id,
        label: g.title,
        href: `/blog/tutoriales/guias/${g.slug}`,
        color: g.categoryColor,
      })),
      defaultOpen: true,
    });
  }

  // 3. Tools section
  if (tools.length > 0) {
    groups.push({
      id: "herramientas",
      label: t("nav.blogTools"),
      href: "/blog/herramientas",
      color: "text-violet-500",
      icon: <IconTool className="w-3.5 h-3.5" />,
      defaultOpen: false,
      items: tools.map((c) => ({
        id: c.id,
        label: c.title,
        href: `/blog/${typeSlug(c.type)}/${c.slug}`,
        color: c.categoryColor,
      })),
    });
  }

  return groups;
}

// ── Collapse state persistence ────────────────────────────────────────────────

function useCollapseState(key: string, defaultOpen: boolean) {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`blog-nav-${key}`);

      if (stored !== null) setOpen(stored === "true");
    } catch {}
  }, [key]);

  const toggle = useCallback(() => {
    setOpen((prev) => {
      const next = !prev;

      try {
        localStorage.setItem(`blog-nav-${key}`, String(next));
      } catch {}

      return next;
    });
  }, [key]);

  return [open, toggle] as const;
}

// ── Chevron icon ──────────────────────────────────────────────────────────────

function Chevron({ open }: { open: boolean }) {
  return (
    <IconChevronRight
      className={`w-3 h-3 text-[#aeaeb2] transition-transform duration-200 flex-shrink-0 motion-safe:transition-transform ${open ? "rotate-90" : ""}`}
    />
  );
}

// ── Type icon from href ───────────────────────────────────────────────────────

function itemTypeIcon(href: string): React.ReactNode {
  if (href.startsWith("/blog/articulos/"))
    return <IconArticle className="w-3 h-3" />;
  if (href.startsWith("/blog/tutoriales/guias/"))
    return <IconBook className="w-3 h-3" />;
  if (href.startsWith("/blog/tutoriales/"))
    return <IconTutorial className="w-3 h-3" />;

  return <IconTool className="w-3 h-3" />;
}

// ── Sidebar item ──────────────────────────────────────────────────────────────

function SidebarItem({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      {...(active ? { "aria-current": "page" as const } : {})}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all no-underline motion-safe:transition-all ${
        active
          ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
          : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
      }`}
    >
      <span
        aria-hidden="true"
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.color ?? "bg-gray-400"}`}
      />
      <span className="flex-shrink-0 text-[#aeaeb2] dark:text-[#636366]">
        {itemTypeIcon(item.href)}
      </span>
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

// ── Sub-group (e.g. Lenguajes / Frameworks) ───────────────────────────────────

function SubGroup({
  group,
  currentPath,
}: {
  group: NavGroup;
  currentPath: string;
}) {
  const [open, toggle] = useCollapseState(group.id, group.defaultOpen ?? true);
  const regionId = `nav-sub-${group.id}`;

  return (
    <div className="mt-1">
      <button
        aria-controls={regionId}
        aria-expanded={open}
        className="flex items-center gap-2 w-full px-3 py-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors motion-safe:transition-colors"
        onClick={toggle}
      >
        <Chevron open={open} />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] flex-1 text-left">
          {group.label}
        </span>
        <span
          aria-hidden="true"
          className="text-[10px] font-medium text-[#aeaeb2] dark:text-[#636366]"
        >
          {group.items?.length}
        </span>
      </button>

      <div
        aria-label={group.label}
        className="overflow-hidden motion-safe:transition-all motion-safe:duration-200"
        id={regionId}
        role="region"
        style={{
          maxHeight: open ? `${(group.items?.length ?? 0) * 40 + 8}px` : "0px",
        }}
      >
        <div className="mt-0.5 space-y-0.5 pb-1">
          {group.items?.map((item) => (
            <SidebarItem
              key={item.id}
              active={currentPath === item.href}
              item={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Top-level group ───────────────────────────────────────────────────────────

function TopGroup({
  group,
  currentPath,
}: {
  group: NavGroup;
  currentPath: string;
}) {
  const hasChildren = Boolean(group.children?.length);
  const hasItems = Boolean(group.items?.length);
  const allItems = [
    ...(group.items ?? []),
    ...(group.children?.flatMap((c) => c.items ?? []) ?? []),
  ];
  const isGroupActive =
    allItems.some((i) => currentPath === i.href) ||
    (group.href && currentPath === group.href);

  const [open, toggle] = useCollapseState(group.id, group.defaultOpen ?? false);
  const regionId = `nav-group-${group.id}`;

  return (
    <div className="mb-3">
      <button
        aria-controls={regionId}
        aria-expanded={open}
        className="flex items-center gap-2 w-full px-3 py-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors motion-safe:transition-colors"
        onClick={toggle}
      >
        <Chevron open={open} />
        <span
          className={`text-[10px] font-semibold uppercase tracking-wider flex-1 text-left ${
            isGroupActive
              ? "text-blue-600 dark:text-blue-400"
              : "text-[#aeaeb2] dark:text-[#636366]"
          }`}
        >
          {group.label}
        </span>
        <span
          aria-hidden="true"
          className="text-[10px] font-medium text-[#aeaeb2] dark:text-[#636366]"
        >
          {allItems.length}
        </span>
      </button>

      <div
        aria-label={group.label}
        className="overflow-hidden motion-safe:transition-all motion-safe:duration-200"
        id={regionId}
        role="region"
        style={{
          maxHeight: open
            ? `${allItems.length * 40 + (hasChildren ? (group.children?.length ?? 0) * 48 : 0) + 60}px`
            : "0px",
        }}
      >
        {hasItems && (
          <div className="mt-0.5 space-y-0.5 pb-1">
            {group.items!.map((item) => (
              <SidebarItem
                key={item.id}
                active={currentPath === item.href}
                item={item}
              />
            ))}
          </div>
        )}

        {hasChildren && (
          <div className="mt-0.5 pb-1">
            {group.children!.map((child) => (
              <SubGroup
                key={child.id}
                currentPath={currentPath}
                group={child}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Sidebar search ────────────────────────────────────────────────────────────

function SidebarSearch({ currentPath }: { currentPath: string }) {
  const { t } = useT();
  const [q, setQ] = useState("");
  const searchId = "sidebar-search";
  const resultsId = "sidebar-search-results";
  const results =
    q.trim().length > 0
      ? allContent
          .filter(
            (c) =>
              c.title.toLowerCase().includes(q.toLowerCase()) ||
              c.category.toLowerCase().includes(q.toLowerCase()),
          )
          .slice(0, 8)
      : [];

  return (
    <div className="relative px-1 mb-3" role="search">
      <label className="sr-only" htmlFor={searchId}>
        {t("nav.blogSearch")}
      </label>
      <div className="relative">
        <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#aeaeb2]" />
        <input
          aria-autocomplete="list"
          aria-controls={resultsId}
          aria-expanded={results.length > 0}
          className="w-full pl-7 pr-3 py-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] border border-black/8 dark:border-white/8 text-xs text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] dark:placeholder-[#636366] focus:outline-none focus:ring-2 focus:ring-violet-400/30 focus:border-violet-300 dark:focus:border-violet-600 transition-all motion-safe:transition-all"
          id={searchId}
          placeholder={t("nav.blogSearchPlaceholder")}
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {q && (
          <button
            aria-label={t("nav.blogSearchClear")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[#aeaeb2] hover:text-[#6e6e73]"
            onClick={() => setQ("")}
          >
            <IconClose className="w-3 h-3" />
          </button>
        )}
      </div>

      {results.length > 0 && (
        <div
          aria-label={t("nav.blogResults")}
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-[#111116] border border-black/10 dark:border-white/10 rounded-xl shadow-xl overflow-hidden"
          id={resultsId}
          role="listbox"
        >
          {results.map((item) => {
            const href = `/blog/${typeSlug(item.type)}/${item.slug}`;

            return (
              <Link
                key={item.id}
                aria-selected={currentPath === href}
                className={`flex items-center gap-2 px-3 py-2 hover:bg-black/[0.03] dark:hover:bg-white/[0.03] no-underline ${currentPath === href ? "bg-violet-50 dark:bg-violet-950/20" : ""}`}
                href={href}
                role="option"
                onClick={() => setQ("")}
              >
                <span
                  className={`w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center ${
                    item.type === "article"
                      ? "bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400"
                      : item.type === "tutorial"
                        ? "bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
                        : "bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400"
                  }`}
                >
                  {item.type === "article" ? (
                    <svg
                      aria-hidden="true"
                      className="w-3 h-3"
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
                  ) : item.type === "tutorial" ? (
                    <svg
                      aria-hidden="true"
                      className="w-3 h-3"
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
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      className="w-3 h-3"
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
                  )}
                </span>
                <span
                  aria-hidden="true"
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.categoryColor}`}
                />
                <span className="text-xs text-[#1d1d1f] dark:text-white truncate">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Main layout ───────────────────────────────────────────────────────────────

interface BlogLayoutProps {
  children: React.ReactNode;
  seo?: HeadProps;
}

export default function BlogLayout({ children, seo }: BlogLayoutProps) {
  const { t } = useT();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentPath = router.asPath.split("?")[0] ?? router.asPath;

  const nav = buildNav(t);

  useEffect(() => {
    setMobileOpen(false);
  }, [currentPath]);

  return (
    <div className="relative flex flex-col min-h-screen bg-white dark:bg-[#0a0a0f] overflow-x-clip">
      <Head {...seo} />
      <Navbar />

      {/* Skip link */}
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-xl focus:text-sm focus:font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
        href="#main-content"
      >
        {t("nav.skipToContent")}
      </a>

      <div className="max-w-7xl w-full mx-auto px-5 sm:px-6 py-6 flex-1 flex flex-col">
        {/* Mobile sidebar toggle */}
        <button
          aria-controls="blog-sidebar"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? t("nav.blogClose") : t("nav.blogOpen")}
          className="sm:hidden self-end mb-4 p-2 rounded-xl border border-black/12 dark:border-white/12 text-[#1d1d1f] dark:text-white"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg
            aria-hidden="true"
            fill="none"
            height="18"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            viewBox="0 0 18 18"
            width="18"
          >
            <path d="M2 4.5h14M2 9h14M2 13.5h14" />
          </svg>
        </button>

        <div className="flex gap-6 flex-1 relative">
          {/* ── Sidebar ── */}
          <aside
            aria-label={t("nav.blogNavigation")}
            className={`${mobileOpen ? "block" : "hidden"} sm:block w-56 lg:w-60 shrink-0`}
            id="blog-sidebar"
          >
            <nav
              aria-label={t("nav.blogSections")}
              className="flex flex-col gap-0.5 sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto overscroll-contain pb-4"
            >
              <SidebarSearch currentPath={currentPath} />

              <Link
                href="/blog"
                onClick={() => setMobileOpen(false)}
                {...(currentPath === "/blog"
                  ? { "aria-current": "page" as const }
                  : {})}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all no-underline mb-3 motion-safe:transition-all ${
                  currentPath === "/blog"
                    ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                    : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <IconHome className="w-4 h-4 flex-shrink-0" />
                {t("nav.blogHome")}
              </Link>

              <div>
                {nav.map((group) => (
                  <TopGroup
                    key={group.id}
                    currentPath={currentPath}
                    group={group}
                  />
                ))}
              </div>
            </nav>
          </aside>

          {/* ── Main ── */}
          <main className="flex-1 min-w-0" id="main-content">
            {children}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-black/8 dark:border-white/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                A
              </div>
              <span className="text-sm font-medium text-[#1d1d1f] dark:text-white">
                {t("footer.brandName")}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a
                className="text-sm text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors no-underline"
                href={siteConfig.links.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
              <a
                className="text-sm text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors no-underline"
                href={siteConfig.links.linkedin}
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
              <a
                className="text-sm text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors no-underline"
                href={`mailto:${siteConfig.contact.email}`}
              >
                {t("contact.email")}
              </a>
            </div>
            <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
              {t("footer.copyright", { year: new Date().getFullYear() })}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
