"use client";
import type { HeadProps } from "./head";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { Head } from "./head";

import { Navbar } from "@/components/navbar";
import { useT } from "@/hooks/useT";
import { useAuth } from "@/hooks/useAuth";
import { siteConfig } from "@/config/site";
import { allContent, typeSlug, allGuides, getContentByType } from "@/lib/blog/registry";
import { CATEGORY_GROUPS } from "@/lib/blog/taxonomy";
import {
  IconSearch,
  IconClose,
  IconHome,
  IconChevronRight,
  IconTutorial,
  IconBook,
  IconGraduation,
} from "@/components/blog/shared";
import { campusService } from "@/services/campusService";
import { ProgressBar } from "@/components/campus/ProgressBar";
import { XpBadge } from "@/components/campus/XpBadge";
import type { CampusProgress, CampusUserXP } from "@/types/campus";

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

  const groups: NavGroup[] = [];

  // 1. Guides section
  if (allGuides.length > 0) {
    groups.push({
      id: "guias",
      label: t("nav.campusGuides"),
      href: "/campus/guias",
      color: "text-emerald-500",
      icon: <IconBook className="w-3.5 h-3.5" />,
      items: allGuides.map((g) => ({
        id: g.id,
        label: g.title,
        href: `/campus/guias/${g.slug}`,
        color: g.categoryColor,
      })),
      defaultOpen: true,
    });
  }

  // 2. Category groups from taxonomy (tutorials only)
  for (const catGroup of CATEGORY_GROUPS) {
    const items = tutorials.filter((c) =>
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
        href: `/campus/tutoriales/${c.slug}`,
        color: c.categoryColor,
      })),
      defaultOpen: true,
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
      className={`w-3 h-3 text-muted/60 transition-transform duration-200 flex-shrink-0 motion-safe:transition-transform ${open ? "rotate-90" : ""}`}
    />
  );
}

// ── Type icon from href ───────────────────────────────────────────────────────

function itemTypeIcon(href: string): React.ReactNode {
  if (href.startsWith("/campus/tutoriales/"))
    return <IconTutorial className="w-3 h-3" />;
  if (href.startsWith("/campus/guias/"))
    return <IconBook className="w-3 h-3" />;

  return <IconHome className="w-3 h-3" />;
}

// ── Sidebar item ──────────────────────────────────────────────────────────────

function SidebarItem({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      {...(active ? { "aria-current": "page" as const } : {})}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all no-underline motion-safe:transition-all ${
        active
          ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300"
          : "text-muted hover:text-foreground hover:bg-default"
      }`}
    >
      <span
        aria-hidden="true"
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.color ?? "bg-gray-400"}`}
      />
      <span className="flex-shrink-0 text-muted/60">
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
        className="flex items-center gap-2 w-full px-3 py-1.5 rounded-xl hover:bg-default transition-colors motion-safe:transition-colors"
        onClick={toggle}
      >
        <Chevron open={open} />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted/60 flex-1 text-left">
          {group.label}
        </span>
        <span
          aria-hidden="true"
          className="text-[10px] font-medium text-muted/60"
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
        className="flex items-center gap-2 w-full px-3 py-1.5 rounded-xl hover:bg-default transition-colors motion-safe:transition-colors"
        onClick={toggle}
      >
        <Chevron open={open} />
        <span
          className={`text-[10px] font-semibold uppercase tracking-wider flex-1 text-left ${
            isGroupActive
              ? "text-emerald-700 dark:text-emerald-300"
              : "text-muted/60"
          }`}
        >
          {group.label}
        </span>
        <span
          aria-hidden="true"
          className="text-[10px] font-medium text-muted/60"
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

// ── Sidebar search (scoped to tutorials) ──────────────────────────────────────

function SidebarSearch({ currentPath }: { currentPath: string }) {
  const { t } = useT();
  const [q, setQ] = useState("");
  const searchId = "campus-sidebar-search";
  const resultsId = "campus-sidebar-search-results";
  const results =
    q.trim().length > 0
      ? allContent
          .filter((c) => c.type === "tutorial")
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
        {t("nav.campusSearch")}
      </label>
      <div className="relative">
        <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted/60" />
        <input
          aria-autocomplete="list"
          aria-controls={resultsId}
          aria-expanded={results.length > 0}
          className="w-full pl-7 pr-3 py-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] border border-border text-xs text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-300 dark:focus:border-emerald-600 transition-all motion-safe:transition-all"
          id={searchId}
          placeholder={t("nav.campusSearchPlaceholder")}
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {q && (
          <button
            aria-label={t("nav.campusSearchClear")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted/60 hover:text-muted"
            onClick={() => setQ("")}
          >
            <IconClose className="w-3 h-3" />
          </button>
        )}
      </div>

      {results.length > 0 && (
        <div
          aria-label={t("nav.campusResults")}
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-surface border border-black/10 dark:border-white/10 rounded-xl shadow-xl overflow-hidden"
          id={resultsId}
          role="listbox"
        >
          {results.map((item) => {
            const href = `/campus/${typeSlug(item.type)}/${item.slug}`;

            return (
              <Link
                key={item.id}
                aria-selected={currentPath === href}
                className={`flex items-center gap-2 px-3 py-2 hover:bg-black/[0.03] dark:hover:bg-white/[0.03] no-underline ${currentPath === href ? "bg-emerald-50 dark:bg-emerald-950/20" : ""}`}
                href={href}
                role="option"
                onClick={() => setQ("")}
              >
                <span className="w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center bg-blue-100 dark:bg-blue-950/50 text-accent">
                  <IconTutorial className="w-3 h-3" />
                </span>
                <span
                  aria-hidden="true"
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.categoryColor}`}
                />
                <span className="text-xs text-foreground truncate">
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

interface CampusLayoutProps {
  children: React.ReactNode;
  seo?: HeadProps;
}

export default function CampusLayout({ children, seo }: CampusLayoutProps) {
  const { t } = useT();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userProgress, setUserProgress] = useState<CampusProgress[]>([]);
  const [userXp, setUserXp] = useState<CampusUserXP | null>(null);
  const currentPath = router.asPath.split("?")[0] ?? router.asPath;

  const nav = buildNav(t);
  const totalTutorials = getContentByType("tutorial").length;
  const completedCount = userProgress.length;

  useEffect(() => {
    setMobileOpen(false);
  }, [currentPath]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!isAuthenticated) return;
    campusService.getProgress().then(setUserProgress).catch(() => {});
    campusService.getXP().then(setUserXp).catch(() => {});
  }, [isAuthenticated]);

  return (
    <div className="relative flex flex-col min-h-screen bg-background overflow-x-clip">
      <Head {...seo} />
      <Navbar />

      {/* Skip link */}
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-xl focus:text-sm focus:font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400"
        href="#main-content"
      >
        {t("nav.skipToContent")}
      </a>

      <div className="max-w-7xl w-full mx-auto px-5 sm:px-6 py-6 flex-1 flex flex-col">
        {/* Mobile sidebar toggle */}
        <button
          aria-controls="campus-sidebar"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? t("nav.blogClose") : t("nav.blogOpen")}
          className="sm:hidden self-end mb-4 w-8 h-8 flex flex-col items-center justify-center gap-[5px] rounded-xl border border-black/12 dark:border-white/12 text-foreground"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${mobileOpen ? "w-4 rotate-45 translate-y-[6.5px]" : "w-4"}`} />
          <span className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 ${mobileOpen ? "w-0 opacity-0" : "w-3"}`} />
          <span className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${mobileOpen ? "w-4 -rotate-45 -translate-y-[6.5px]" : "w-4"}`} />
        </button>

        <div className="flex gap-6 flex-1 relative">
          {/* ── Mobile backdrop ── */}
          {mobileOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/15 dark:bg-black/40 backdrop-blur-sm sm:hidden"
              onClick={() => setMobileOpen(false)}
            />
          )}

          {/* ── Sidebar ── */}
          <aside
            aria-label={t("nav.campusNavigation")}
            className={`fixed top-0 left-0 z-50 h-full w-72 bg-background sm:relative sm:w-56 lg:w-60 shrink-0 transform transition-transform duration-300 ease-out sm:transform-none ${
              mobileOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
            }`}
            id="campus-sidebar"
          >
            <nav
              aria-label={t("nav.campusSections")}
              className="flex flex-col gap-0.5 sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto overscroll-contain pb-4 pt-14 sm:pt-0"
            >
              {/* Mobile close button */}
              <button
                aria-label={t("nav.blogClose")}
                className="sm:hidden absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/8 transition-colors text-muted"
                onClick={() => setMobileOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Brand */}
              <Link
                className="flex items-center gap-2.5 px-1 mb-4 no-underline group"
                href="/campus"
                onClick={() => setMobileOpen(false)}
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <IconGraduation className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#1d1d1f] dark:text-white leading-tight">
                    Campus
                  </p>
                  <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366] truncate">
                    {t("campus.tagline")}
                  </p>
                </div>
              </Link>

              {/* User Progress */}
              {isAuthenticated && completedCount > 0 && (
                <div className="px-3 py-3 rounded-xl bg-emerald-500/5 border border-emerald-300/20 dark:border-emerald-700/20 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      {t("campus.sidebar.yourProgress")}
                    </span>
                    <XpBadge xp={userXp?.total_xp ?? 0} level={userXp?.level ?? 1} compact />
                  </div>
                  <ProgressBar completed={completedCount} total={totalTutorials} />
                  <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366] mt-1">
                    {completedCount}/{totalTutorials} {t("blog.tutorialPlural").toLowerCase()}
                  </p>
                </div>
              )}

              <SidebarSearch currentPath={currentPath} />

              <Link
                href="/campus"
                onClick={() => setMobileOpen(false)}
                {...(currentPath === "/campus"
                  ? { "aria-current": "page" as const }
                  : {})}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all no-underline mb-3 motion-safe:transition-all ${
                  currentPath === "/campus"
                    ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300"
                    : "text-muted hover:text-foreground hover:bg-default"
                }`}
              >
                <IconHome className="w-4 h-4 flex-shrink-0" />
                {t("nav.campusHome")}
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
      <footer className="mt-auto border-t border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                A
              </div>
              <span className="text-sm font-medium text-foreground">
                {t("footer.brandName")}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a
                className="text-sm text-muted hover:text-foreground transition-colors no-underline"
                href={siteConfig.links.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
              <a
                className="text-sm text-muted hover:text-foreground transition-colors no-underline"
                href={siteConfig.links.linkedin}
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
              <a
                className="text-sm text-muted hover:text-foreground transition-colors no-underline"
                href={`mailto:${siteConfig.contact.email}`}
              >
                {t("contact.email")}
              </a>
            </div>
            <p className="text-xs text-muted/60">
              {t("footer.copyright", { year: new Date().getFullYear() })}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
