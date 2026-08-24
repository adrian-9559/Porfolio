"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";

import CampusLayout from "@/layouts/campus";
import {
  getContentByType,
  getGuides,
  getCategoriesByType,
  guideTotalMinutes,
  formatDate,
  ContentMeta,
} from "@/lib/blog/registry";
import { LEVELS, getCategory } from "@/lib/blog/taxonomy";
import {
  IconGraduation,
  IconSearch,
  IconClose,
  IconBook,
  IconClock,
} from "@/components/blog/shared";
import { useT } from "@/hooks/useT";

const allTutorials = getContentByType("tutorial");
const allGuides = getGuides();

// ── Animated Counter ──────────────────────────────────────────────────────────

function AnimatedCounter({ value, shouldAnimate }: { value: number; shouldAnimate: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) return;
    let start = 0;
    const duration = 1200;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [shouldAnimate, value]);

  return <span>{count}</span>;
}

// ── Hover expandable card wrapper ─────────────────────────────────────────────

function HoverExpandCard({ children, expandContent }: { children: React.ReactNode; expandContent: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => setIsExpanded(true), 1000);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsExpanded(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isExpanded && (
        <>
          {/* Backdrop blur */}
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
            onClick={handleMouseLeave}
          />
          {/* Expanded card */}
          <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md p-6 rounded-2xl bg-white dark:bg-[#111116] border border-emerald-300/60 dark:border-emerald-700/60 shadow-2xl shadow-emerald-500/20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-[#6e6e73] dark:text-[#86868b] hover:bg-black/10 dark:hover:bg-white/15 hover:text-[#1d1d1f] dark:hover:text-white transition-colors z-10"
              onClick={handleMouseLeave}
              type="button"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {expandContent}
          </div>
        </>
      )}
    </div>
  );
}

// ── Tutorial card (compact) ───────────────────────────────────────────────────

function TutorialCard({ item }: { item: ContentMeta }) {
  const { t } = useT();

  return (
    <HoverExpandCard
      expandContent={
        <div className="space-y-3 h-full flex flex-col">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${item.categoryColor}`} />
            <span className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b]">{item.category}</span>
            <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">· {item.readTime}</span>
          </div>
          <h3 className="font-bold text-sm text-[#1d1d1f] dark:text-white leading-snug">{item.title}</h3>
          <p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed flex-1">{item.description}</p>
          {item.tags && (
            <div className="flex flex-wrap gap-1">
              {item.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/5 dark:bg-white/10 text-[#3d3d3d] dark:text-[#c0c0c5]">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between pt-2 border-t border-black/6 dark:border-white/6">
            <span className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">{formatDate(item.publishedAt)}</span>
            <Link
              className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 no-underline hover:underline"
              href={`/campus/tutoriales/${item.slug}`}
            >
              {t("campus.viewTutorial")} →
            </Link>
          </div>
        </div>
      }
    >
      <Link
        className="group block h-full no-underline"
        href={`/campus/tutoriales/${item.slug}`}
      >
        <div className="h-full p-4 rounded-xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-emerald-300/60 dark:hover:border-emerald-700/60 hover:shadow-lg transition-all duration-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-60" />

          <div className="flex items-center gap-1.5 mb-1.5">
            <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.categoryColor}`} />
            <span className="text-[10px] font-semibold text-[#6e6e73] dark:text-[#86868b] truncate">{item.category}</span>
            <span className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">· {item.readTime}</span>
          </div>

          <h3 className="font-bold text-xs text-[#1d1d1f] dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2 mb-1.5">
            {item.title}
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">{formatDate(item.publishedAt)}</span>
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">
              →
            </span>
          </div>
        </div>
      </Link>
    </HoverExpandCard>
  );
}

// ── Guide card (compact) ──────────────────────────────────────────────────────

function GuideCard({ guide, featured = false }: { guide: (typeof allGuides)[number]; featured?: boolean }) {
  const { t } = useT();
  const totalMin = guideTotalMinutes(guide);
  const count = guide.curriculum.length;
  const level = LEVELS.find((l) => l.id === guide.level);

  if (featured) {
    return (
      <HoverExpandCard
        expandContent={
          <div className="space-y-3 h-full flex flex-col">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                {t("campus.section.featured")}
              </span>
              {guide.level && level && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {t(level.labelKey)}
                </span>
              )}
            </div>
            <h3 className="font-bold text-base text-[#1d1d1f] dark:text-white leading-snug">{guide.title}</h3>
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed flex-1">{guide.description}</p>
            <div className="flex items-center gap-3 pt-2 border-t border-emerald-200/50 dark:border-emerald-800/30">
              <div className="flex items-center gap-1 text-xs text-[#6e6e73] dark:text-[#86868b]">
                <IconBook className="w-3 h-3" />
                <span>{count} {count === 1 ? t("blog.tutorialSingular") : t("blog.tutorialPlural")}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#6e6e73] dark:text-[#86868b]">
                <IconClock className="w-3 h-3" />
                <span>~{totalMin} {t("blog.minutesAbbr")}</span>
              </div>
              <div className="flex-1" />
              <Link className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 no-underline hover:underline" href={`/campus/guias/${guide.slug}`}>
                {t("campus.viewPath")} →
              </Link>
            </div>
          </div>
        }
      >
        <Link className="group block h-full no-underline" href={`/campus/guias/${guide.slug}`}>
          <div className="h-full p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800/40 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 to-teal-400" />
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-400/10 blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {t("campus.section.featured")}
                </span>
                {guide.level && level && (
                  <span className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">{t(level.labelKey)}</span>
                )}
              </div>

              <h2 className="text-lg font-bold text-[#1d1d1f] dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-1.5">
                {guide.title}
              </h2>
              <p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed line-clamp-2 mb-3">
                {guide.description}
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-emerald-200/50 dark:border-emerald-800/30">
                <div className="flex items-center gap-1 text-[10px] text-[#6e6e73] dark:text-[#86868b]">
                  <IconBook className="w-3 h-3" />
                  <span>{count}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-[#6e6e73] dark:text-[#86868b]">
                  <IconClock className="w-3 h-3" />
                  <span>~{totalMin}m</span>
                </div>
                <div className="flex-1" />
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                  {t("campus.viewPath")} →
                </span>
              </div>
            </div>
          </div>
        </Link>
      </HoverExpandCard>
    );
  }

  return (
    <HoverExpandCard
      expandContent={
        <div className="space-y-2 h-full flex flex-col">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className={`w-2 h-2 rounded-full ${guide.categoryColor}`} />
            <span className="text-[10px] font-semibold text-[#6e6e73] dark:text-[#86868b]">{guide.category}</span>
            {guide.level && level && (
              <span className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">· {t(level.labelKey)}</span>
            )}
          </div>
          <h3 className="font-bold text-sm text-[#1d1d1f] dark:text-white leading-snug">{guide.title}</h3>
          <p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed flex-1">{guide.description}</p>
          <div className="flex items-center gap-3 pt-2 border-t border-black/6 dark:border-white/6">
            <div className="flex items-center gap-1 text-[10px] text-[#aeaeb2] dark:text-[#636366]">
              <IconBook className="w-3 h-3" />
              <span>{count}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-[#aeaeb2] dark:text-[#636366]">
              <IconClock className="w-3 h-3" />
              <span>~{totalMin}m</span>
            </div>
            <div className="flex-1" />
            <Link className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 no-underline hover:underline" href={`/campus/guias/${guide.slug}`}>
              {t("campus.viewPath")} →
            </Link>
          </div>
        </div>
      }
    >
      <Link className="group block h-full no-underline" href={`/campus/guias/${guide.slug}`}>
        <div className="h-full p-4 rounded-xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-emerald-300/60 dark:hover:border-emerald-700/60 hover:shadow-lg transition-all duration-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-60" />

          <div className="flex items-center gap-1.5 mb-1.5">
            <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${guide.categoryColor}`} />
            <span className="text-[10px] font-semibold text-[#6e6e73] dark:text-[#86868b] truncate">{guide.category}</span>
            {guide.level && level && (
              <span className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">· {t(level.labelKey)}</span>
            )}
          </div>

          <h3 className="font-bold text-xs text-[#1d1d1f] dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug line-clamp-1 mb-1.5">
            {guide.title}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] text-[#aeaeb2] dark:text-[#636366]">
              <span className="flex items-center gap-0.5">
                <IconBook className="w-2.5 h-2.5" />
                {count}
              </span>
              <span className="flex items-center gap-0.5">
                <IconClock className="w-2.5 h-2.5" />
                ~{totalMin}m
              </span>
            </div>
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">
              →
            </span>
          </div>
        </div>
      </Link>
    </HoverExpandCard>
  );
}

// ── Category pill ─────────────────────────────────────────────────────────────

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  frontend: (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  backend: (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  ),
  database: (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  ),
  devops: (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  ),
  programming: (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
};

function CategoryPill({ cat, active, onClick }: { cat: { id: string; labelKey: string }; active: boolean; onClick: () => void }) {
  const { t } = useT();

  return (
    <button
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all duration-200 cursor-pointer ${
        active
          ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
          : "bg-black/5 dark:bg-white/8 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/10 dark:hover:bg-white/12"
      }`}
      onClick={onClick}
      type="button"
    >
      {CATEGORY_ICONS[cat.id] || null}
      {t(cat.labelKey)}
    </button>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function CampusPage() {
  const { t } = useT();
  const [query, setQuery] = useState("");
  const [activeLevel, setActiveLevel] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  const tutorialCats = useMemo(() => getCategoriesByType("tutorial"), []);
  const catMeta = useMemo(
    () => tutorialCats.map((c) => getCategory(c)).filter((c): c is NonNullable<typeof c> => c != null),
    [tutorialCats],
  );

  const levelOptions = useMemo(
    () => [{ id: "all", labelKey: "blog.filterAll" }, ...LEVELS.map((l) => ({ id: l.id, labelKey: l.labelKey }))],
    [],
  );

  const results = useMemo(() => {
    let items = allTutorials;

    if (activeLevel !== "all") items = items.filter((c) => c.level === activeLevel);
    if (activeCategory !== "all") items = items.filter((c) => c.categoryId === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.tags?.some((t) => t.toLowerCase().includes(q)),
      );
    }

    return items.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }, [query, activeLevel, activeCategory]);

  const hasActiveFilters = activeLevel !== "all" || activeCategory !== "all" || query.trim() !== "";

  const stats = [
    { count: allTutorials.length, labelKey: "campus.stats.tutorials", gradient: "from-emerald-500 to-teal-500", icon: (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )},
    { count: allGuides.length, labelKey: "campus.stats.guides", gradient: "from-teal-500 to-green-500", icon: (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    )},
    { count: tutorialCats.length, labelKey: "campus.stats.categories", gradient: "from-green-500 to-emerald-500", icon: (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    )},
  ];

  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <CampusLayout
      seo={{
        title: t("meta.campus.title"),
        description: t("meta.campus.desc"),
      }}
    >
      <div className="relative">
        {/* Background decorativo */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="blob absolute top-[-60px] right-[10%] w-[300px] h-[300px] bg-gradient-radial from-emerald-500/10 via-teal-400/5 to-transparent" />
          <div className="blob absolute bottom-[-30px] left-[15%] w-[250px] h-[200px] bg-gradient-to-tr from-green-400/8 to-transparent" />
        </div>

        <div className="space-y-8 py-4">
          {/* Hero - compacto */}
          <header className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <IconGraduation className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wide bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-300/40 dark:border-emerald-700/40 text-emerald-700 dark:text-emerald-300">
                  <span className="relative flex h-1 w-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1 w-1 bg-green-500" />
                  </span>
                  {t("campus.badge")}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h1
                className="text-3xl md:text-4xl font-black text-[#1d1d1f] dark:text-white"
                style={{ letterSpacing: "-0.03em" }}
              >
                Campus
              </h1>
              <p className="text-sm text-[#6e6e73] dark:text-[#86868b] max-w-lg">
                {t("campus.heroDesc")}
              </p>
            </div>

            {/* Stats - compactos */}
            <div ref={statsRef} className="flex gap-6">
              {stats.map((s) => (
                <div key={s.labelKey} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-md`}>
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-lg font-black text-[#1d1d1f] dark:text-white leading-none">
                      <AnimatedCounter value={s.count} shouldAnimate={statsVisible} />
                    </p>
                    <p className="text-[9px] text-[#aeaeb2] dark:text-[#636366] font-semibold uppercase tracking-wide">
                      {t(s.labelKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </header>

          {/* Search - compacto */}
          <div className="relative max-w-xl" role="search">
            <label className="sr-only" htmlFor="campus-search">
              {t("blog.searchLabelTutorials")}
            </label>
            <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeaeb2]" />
            <input
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-white dark:bg-[#111116] border border-black/10 dark:border-white/10 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] dark:placeholder-[#636366] focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20 transition-all shadow-sm"
              id="campus-search"
              placeholder={t("blog.searchPlaceholderTutorials")}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                aria-label={t("blog.searchClear")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aeaeb2] hover:text-[#6e6e73] transition-colors"
                onClick={() => setQuery("")}
              >
                <IconClose className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category quick-nav */}
          {activeCategory === "all" && !query && (
            <div className="flex flex-wrap gap-1.5" role="group">
              {catMeta.map((cat) => (
                <CategoryPill
                  key={cat.id}
                  active={activeCategory === cat.id}
                  cat={cat}
                  onClick={() => setActiveCategory(cat.id)}
                />
              ))}
            </div>
          )}

          {/* Guides - compacto */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-[10px] font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-widest">
                {t("campus.section.guides")}
              </h2>
              <span className="flex-1 h-px bg-black/8 dark:bg-white/8" />
            </div>

            {allGuides.length === 0 ? (
              <div className="text-center py-12">
                <IconBook className="w-10 h-10 text-[#aeaeb2] mx-auto mb-3" />
                <p className="text-sm text-[#6e6e73] dark:text-[#86868b] font-medium">{t("blog.noGuides")}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Featured guide */}
                {allGuides[0] && <GuideCard guide={allGuides[0]} featured />}

                {/* Rest of guides */}
                {allGuides.length > 1 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {allGuides.slice(1).map((guide) => (
                      <GuideCard key={guide.id} guide={guide} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Tutorials - compacto */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-[10px] font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-widest">
                {t("campus.section.tutorials")}
              </h2>
              <span className="flex-1 h-px bg-black/8 dark:bg-white/8" />
            </div>

            {/* Filters - compactos */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Level tabs */}
              <div className="flex gap-0.5 p-0.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8">
                {levelOptions.map((opt) => (
                  <button
                    key={opt.id}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all duration-200 cursor-pointer ${
                      activeLevel === opt.id
                        ? "bg-emerald-500 text-white shadow-md"
                        : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
                    }`}
                    onClick={() => setActiveLevel(opt.id)}
                    type="button"
                  >
                    {t(opt.labelKey)}
                  </button>
                ))}
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-1">
                {catMeta.map((cat) => (
                  <CategoryPill
                    key={cat.id}
                    active={activeCategory === cat.id}
                    cat={cat}
                    onClick={() => setActiveCategory(activeCategory === cat.id ? "all" : cat.id)}
                  />
                ))}
              </div>

              {hasActiveFilters && (
                <button
                  className="text-[10px] text-[#aeaeb2] dark:text-[#636366] hover:text-[#6e6e73] dark:hover:text-[#86868b] transition-colors"
                  onClick={() => {
                    setActiveLevel("all");
                    setActiveCategory("all");
                    setQuery("");
                  }}
                  type="button"
                >
                  {t("campus.filters.clear")} ✕
                </button>
              )}
            </div>

            {/* Results count */}
            <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">
              {results.length} {results.length === 1 ? t("blog.tutorialSingular") : t("blog.tutorialPlural")}
              {query && (
                <span> {t("blog.forQuery")} &quot;<span className="text-[#6e6e73] dark:text-[#86868b] font-medium">{query}</span>&quot;</span>
              )}
            </p>

            {/* Tutorial grid - compacto */}
            {results.length === 0 ? (
              <div className="text-center py-16">
                <IconGraduation className="w-10 h-10 text-[#aeaeb2] mx-auto mb-3" />
                <p className="text-sm text-[#6e6e73] dark:text-[#86868b] font-medium">{t("campus.empty")}</p>
                <button
                  className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                  onClick={() => setQuery("")}
                  type="button"
                >
                  {t("campus.clearSearch")}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {results.map((item) => (
                  <TutorialCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </CampusLayout>
  );
}
