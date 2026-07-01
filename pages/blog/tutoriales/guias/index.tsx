"use client";

import { useMemo } from "react";
import Link from "next/link";

import BlogLayout from "@/layouts/blog";
import { getGuides, guideTotalMinutes } from "@/lib/blog/registry";
import { LEVELS } from "@/lib/blog/taxonomy";
import { IconBook, IconClock } from "@/components/blog/shared";
import { useT } from "@/hooks/useT";

const allGuides = getGuides();

function levelLabel(level: string, t: (k: string, p?: Record<string, string | number>) => string): string {
  const l = LEVELS.find((l) => l.id === level);
  return l ? t(l.labelKey) : level;
}

function GuideCard({ guide }: { guide: (typeof allGuides)[number] }) {
  const { t } = useT();
  const totalMin = guideTotalMinutes(guide);
  const count = guide.curriculum.length;

  return (
    <Link
      className="block group p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-200 no-underline motion-safe:transition-all"
      href={`/blog/tutoriales/guias/${guide.slug}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          aria-hidden="true"
          className={`w-2 h-2 rounded-full flex-shrink-0 ${guide.categoryColor}`}
        />
        <span className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b]">
          {guide.category}
        </span>
        {guide.level && (
          <>
            <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
              ·
            </span>
            <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
              {levelLabel(guide.level, t)}
            </span>
          </>
        )}
      </div>

      <h2 className="font-bold text-base text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug mb-2 motion-safe:transition-colors">
        {guide.title}
      </h2>
      <p className="text-sm text-[#6e6e73] dark:text-[#86868b] leading-relaxed line-clamp-3 mb-4">
        {guide.description}
      </p>

      <div className="flex items-center gap-4 pt-3 border-t border-black/6 dark:border-white/6">
        <div className="flex items-center gap-1.5 text-xs text-[#aeaeb2] dark:text-[#636366]">
          <IconBook className="w-3.5 h-3.5" />
          <span>
            {count} {count === 1 ? t("blog.tutorialSingular") : t("blog.tutorialPlural")}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#aeaeb2] dark:text-[#636366]">
          <IconClock className="w-3.5 h-3.5" />
          <span>~{totalMin} {t("blog.minutesAbbr")}</span>
        </div>
        <div className="flex-1" />
        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform motion-safe:transition-transform">
          {t("blog.viewPathLink")}
        </span>
      </div>
    </Link>
  );
}

export default function GuiasPage() {
  const { t } = useT();
  const guides = useMemo(() => allGuides, []);

  const totalTutorials = guides.reduce(
    (sum, g) => sum + g.curriculum.length,
    0,
  );

  return (
    <BlogLayout
      seo={{
        title: t("meta.blogGuides.title"),
        description: t("meta.blogGuides.desc"),
      }}
    >
      <div className="space-y-10 py-4">
        <header className="space-y-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link
              className="text-xs text-[#aeaeb2] dark:text-[#636366] hover:text-[#6e6e73] dark:hover:text-[#86868b] transition-colors no-underline"
              href="/blog"
            >
              {t("blog.breadcrumb")}
            </Link>
            <span
              aria-hidden="true"
              className="text-xs text-[#aeaeb2] dark:text-[#636366]"
            >
              /
            </span>
            <Link
              className="text-xs text-[#aeaeb2] dark:text-[#636366] hover:text-[#6e6e73] dark:hover:text-[#86868b] transition-colors no-underline"
              href="/blog/tutoriales"
            >
              {t("blog.type.tutorials")}
            </Link>
            <span
              aria-hidden="true"
              className="text-xs text-[#aeaeb2] dark:text-[#636366]"
            >
              /
            </span>
            <span
              aria-current="page"
              className="text-xs font-medium text-[#1d1d1f] dark:text-white"
            >
              {t("blog.guides")}
            </span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <IconBook className="w-5 h-5" />
            </div>
            <div>
              <p className="section-label">{t("blog.badge")}</p>
              <h1
                className="text-3xl md:text-4xl font-bold"
                style={{ letterSpacing: "-0.03em" }}
              >
                {t("blog.guidesTitle")}
              </h1>
            </div>
          </div>
          <p className="text-[#6e6e73] dark:text-[#86868b] max-w-xl leading-relaxed">
            {t("blog.guidesDesc")}
          </p>
        </header>

        <div className="flex flex-wrap items-center gap-3 text-xs text-[#aeaeb2] dark:text-[#636366]">
          <span className="font-semibold text-[#6e6e73] dark:text-[#86868b]">
            {guides.length} {t("blog.guidesCount")}
          </span>
          <span
            aria-hidden="true"
            className="w-1 h-1 rounded-full bg-black/10 dark:bg-white/10"
          />
          <span>{totalTutorials} {t("blog.tutorialsOrganized")}</span>
        </div>

        {guides.length === 0 ? (
          <div className="text-center py-20">
            <IconBook className="w-12 h-12 text-[#aeaeb2] mx-auto mb-4" />
            <p className="text-[#6e6e73] dark:text-[#86868b] font-medium">
              {t("blog.noGuides")}
            </p>
          </div>
        ) : (
          <div
            aria-label={t("blog.guidesTitle")}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            role="list"
          >
            {guides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        )}
      </div>
    </BlogLayout>
  );
}
