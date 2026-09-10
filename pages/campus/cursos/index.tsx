"use client";

import { useMemo, useState } from "react";

import CampusLayout from "@/layouts/campus";
import { getGuides, getContentByType, contentHref } from "@/lib/blog/registry";
import { LEVELS } from "@/lib/blog/taxonomy";
import { IconSearch, IconClock, IconBook } from "@/components/blog/shared";
import { IconBooks } from "@/components/ui/Icons";
import { useT } from "@/hooks/useT";
import { DifficultyBadge } from "@/components/campus/DifficultyBadge";
import Link from "next/link";

// Merge guides + tutorials into unified "cursos" catalog
const allGuides = getGuides().map((g) => ({
  ...g,
  _type: "guide" as const,
  _href: `/campus/cursos/${g.slug}`,
}));
const allTutorials = getContentByType("tutorial").map((c) => ({
  ...c,
  _type: "tutorial" as const,
  _href: contentHref(c.type, c.slug),
}));
const allCursos = [...allGuides, ...allTutorials];

export default function CampusCursosPage() {
  const { t } = useT();
  const [query, setQuery] = useState("");
  const [activeLevel, setActiveLevel] = useState("all");

  const results = useMemo(() => {
    let items = allCursos;

    if (activeLevel !== "all")
      items = items.filter((g) => g.level === activeLevel);
    if (query.trim()) {
      const q = query.toLowerCase();

      items = items.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q),
      );
    }

    return items;
  }, [query, activeLevel]);

  return (
    <CampusLayout
      seo={{
        title: t("meta.campusGuides.title"),
        description: t("meta.campusGuides.desc"),
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-8 md:py-12 space-y-8">
        <header className="space-y-2">
          <h1
            className="text-2xl md:text-3xl font-black text-[var(--text-primary)]"
            style={{ letterSpacing: "-0.03em" }}
          >
            {t("blog.guidesTitle")}
          </h1>
          <p className="text-sm text-[var(--text-secondary)] max-w-xl leading-relaxed">
            {t("blog.guidesDesc")}
          </p>
        </header>

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 sm:max-w-md" role="search">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              aria-label={t("blog.searchPlaceholderGuides")}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-default)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--border-hover)] transition-colors"
              placeholder={t("blog.searchPlaceholderGuides")}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <select
            aria-label={t("campus.filters.level")}
            className="px-3 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-default)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-hover)] transition-colors"
            value={activeLevel}
            onChange={(e) => setActiveLevel(e.target.value)}
          >
            <option value="all">{t("blog.filterAll")}</option>
            {LEVELS.map((l) => (
              <option key={l.id} value={l.id}>
                {t(l.labelKey)}
              </option>
            ))}
          </select>
          <p className="text-sm text-[var(--text-muted)] sm:ml-auto">
            {results.length} {t("common.of")} {allCursos.length}
          </p>
        </div>

        {/* Results */}
        {results.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-4xl mb-3 block text-[var(--text-muted)]" aria-hidden="true"><IconBooks className="w-10 h-10 mx-auto" /></span>
            <p className="text-sm text-[var(--text-secondary)]">
              {t("blog.noGuides")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {results.map((curso, idx) => (
              <CourseCard key={curso.slug} curso={curso} seed={idx} />
            ))}
          </div>
        )}
      </div>
    </CampusLayout>
  );
}

// ── Course card ──────────────────────────────────────────────────────────────

const GRADIENTS: [string, string][] = [
  ["#7c3aed", "#06b6d4"],
  ["#06b6d4", "#8b5cf6"],
  ["#ec4899", "#7c3aed"],
  ["#8b5cf6", "#06b6d4"],
  ["#00f5ff", "#7c3aed"],
  ["#ec4899", "#06b6d4"],
];

interface CursoItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  level?: string;
  _type: "guide" | "tutorial";
  _href: string;
  curriculum?: unknown[];
}

function CourseCard({ curso, seed }: { curso: CursoItem; seed: number }) {
  const { t } = useT();
  const [from, to] = GRADIENTS[Math.abs(seed) % GRADIENTS.length];
  const isGuide = curso._type === "guide";

  return (
    <Link
      className="group block no-underline"
      href={curso._href}
    >
      <div className="flex flex-col h-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] hover:border-[var(--border-hover)] hover:shadow-md transition-all duration-200 overflow-hidden">
        {/* Thumbnail */}
        <div
          className="aspect-video flex items-center justify-center px-4"
          style={{
            background: `linear-gradient(135deg, ${from}20 0%, var(--bg-card) 55%, ${to}20 100%)`,
          }}
        >
          <span
            className="text-center text-base md:text-lg font-black text-[var(--text-primary)] leading-tight line-clamp-2"
            style={{ letterSpacing: "-0.02em" }}
          >
            {curso.title}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span
              aria-hidden="true"
              className={`w-1.5 h-1.5 rounded-full ${curso.categoryColor}`}
            />
            <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              {curso.category}
            </span>
            {curso.level && (
              <DifficultyBadge level={curso.level as "beginner" | "intermediate" | "advanced"} />
            )}
          </div>
          <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug mb-1">
            {curso.title}
          </h3>
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-3 flex-1">
            {curso.description}
          </p>
          <p className="text-[10px] text-[var(--text-muted)] font-medium flex items-center gap-1">
            {isGuide ? (
              <>
                <IconBook className="w-3 h-3" />
                {curso.curriculum?.length ?? 0} {t("campus.courses.steps")}
              </>
            ) : (
              <>
                <IconClock className="w-3 h-3" />
                ~{curso.curriculum?.[0] && typeof curso.curriculum[0] === "object" && "estimatedMinutes" in curso.curriculum[0] ? (curso.curriculum[0] as { estimatedMinutes?: number }).estimatedMinutes ?? 5 : 5} min
              </>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}
