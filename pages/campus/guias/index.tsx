"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import CampusLayout from "@/layouts/campus";
import { getGuides, guideTotalMinutes } from "@/lib/blog/registry";
import { LEVELS } from "@/lib/blog/taxonomy";
import {
  IconBook,
  IconClock,
  IconChevronRight,
  IconSearch,
  IconClose,
} from "@/components/blog/shared";
import { useT } from "@/hooks/useT";

const allGuides = getGuides();

function levelLabel(
  level: string,
  t: (k: string, p?: Record<string, string | number>) => string,
): string {
  const l = LEVELS.find((l) => l.id === level);

  return l ? t(l.labelKey) : level;
}

function GuideCard({ guide }: { guide: (typeof allGuides)[number] }) {
  const { t } = useT();
  const totalMin = guideTotalMinutes(guide);
  const count = guide.curriculum.length;

  return (
    <Link
      className="block group relative overflow-hidden p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[var(--border-hover)] hover:shadow-lg transition-all duration-200 no-underline motion-safe:transition-all"
      href={`/campus/guias/${guide.slug}`}
    >
      {/* Top gradient bar */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-brand-from)] via-[var(--color-brand-via)] to-[var(--color-brand-to)]"
      />

      <div className="flex items-center gap-2 mb-3">
        <span
          aria-hidden="true"
          className={`w-2 h-2 rounded-full flex-shrink-0 ${guide.categoryColor}`}
        />
        <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
          {guide.category}
        </span>
        {guide.level && (
          <>
            <span aria-hidden="true" className="text-xs text-[var(--text-muted)]">
              ·
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              {levelLabel(guide.level, t)}
            </span>
          </>
        )}
      </div>

      <h2 className="font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug mb-2 motion-safe:transition-colors">
        {guide.title}
      </h2>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3 mb-4">
        {guide.description}
      </p>

      <div className="flex items-center gap-4 pt-3 border-t border-[var(--border-default)]">
        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          <IconBook className="w-3.5 h-3.5" />
          <span>
            {count}{" "}
            {count === 1
              ? t("blog.tutorialSingular")
              : t("blog.tutorialPlural")}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          <IconClock className="w-3.5 h-3.5" />
          <span>~{totalMin} {t("blog.minutesAbbr")}</span>
        </div>
        <div className="flex-1" />
        <span className="text-xs font-semibold text-[var(--accent)] group-hover:translate-x-0.5 transition-transform motion-safe:transition-transform flex items-center gap-1">
          {t("campus.viewPath")}
          <IconChevronRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  );
}

export default function CampusGuidesPage() {
  const { t } = useT();
  const [query, setQuery] = useState("");
  const [activeLevel, setActiveLevel] = useState("all");

  const guides = useMemo(() => allGuides, []);
  const totalTutorials = guides.reduce(
    (sum, g) => sum + g.curriculum.length,
    0,
  );

  const results = useMemo(() => {
    let items = guides;

    if (activeLevel !== "all")
      items = items.filter((g) => g.level === activeLevel);
    if (query.trim()) {
      const q = query.toLowerCase();

      items = items.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q) ||
          g.tags?.some((tag) => tag.toLowerCase().includes(q)),
      );
    }

    return items;
  }, [query, activeLevel, guides]);

  return (
    <CampusLayout
      seo={{
        title: t("meta.campusGuides.title"),
        description: t("meta.campusGuides.desc"),
      }}
    >
      <div className="space-y-8 py-4">
        {/* Hero */}
        <header className="space-y-4">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-[var(--text-muted)]"
          >
            <Link
              className="hover:text-[var(--text-primary)] transition-colors no-underline"
              href="/"
            >
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              className="hover:text-[var(--text-primary)] transition-colors no-underline"
              href="/campus"
            >
              Campus
            </Link>
            <span aria-hidden="true">/</span>
            <span
              aria-current="page"
              className="text-[var(--text-primary)] font-medium"
            >
              {t("nav.campusGuides")}
            </span>
          </nav>

          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-light)] border border-[var(--border-default)] text-[var(--accent)] text-[10px] font-bold uppercase tracking-widest">
              <IconBook className="w-3 h-3" />
              Rutas de aprendizaje
            </span>
            <h1
              className="text-3xl md:text-4xl font-black text-[var(--text-primary)]"
              style={{ letterSpacing: "-0.03em" }}
            >
              {t("blog.guidesTitle")}
            </h1>
            <p className="text-sm text-[var(--text-secondary)] max-w-xl leading-relaxed">
              {t("blog.guidesDesc")}
            </p>
          </div>
        </header>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
          <span className="font-semibold text-[var(--text-primary)]">
            {guides.length} {t("blog.guidesCount")}
          </span>
          <span
            aria-hidden="true"
            className="w-1 h-1 rounded-full bg-[var(--border-default)]"
          />
          <span>
            {totalTutorials} {t("blog.tutorialsOrganized")}
          </span>
        </div>

        {/* Search + filters */}
        <div className="space-y-3">
          <div className="relative max-w-md" role="search">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              className="ds-input pl-9 pr-9"
              placeholder={t("blog.searchPlaceholderGuides")}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                aria-label={t("nav.campusSearchClear")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                type="button"
                onClick={() => setQuery("")}
              >
                <IconClose className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeLevel === "all"
                  ? "bg-[var(--accent)] text-[var(--text-interactive)]"
                  : "bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
              }`}
              type="button"
              onClick={() => setActiveLevel("all")}
            >
              {t("blog.filterAll")}
            </button>
            {LEVELS.map((l) => (
              <button
                key={l.id}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  activeLevel === l.id
                    ? "bg-[var(--accent)] text-[var(--text-interactive)]"
                    : "bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
                }`}
                type="button"
                onClick={() => setActiveLevel(l.id)}
              >
                {t(l.labelKey)}
              </button>
            ))}
          </div>

          <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
            Mostrando {results.length} de {guides.length}
          </p>
        </div>

        {/* Grid */}
        {results.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--bg-surface)] flex items-center justify-center">
              <IconSearch className="w-6 h-6 text-[var(--text-muted)]" />
            </div>
            <p className="text-sm text-[var(--text-secondary)] font-medium">
              {t("blog.noGuides")}
            </p>
          </div>
        ) : (
          <div
            aria-label={t("blog.guidesTitle")}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            role="list"
          >
            {results.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        )}
      </div>
    </CampusLayout>
  );
}
