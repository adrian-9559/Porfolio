"use client";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

import CampusLayout from "@/layouts/campus";
import {
  getGuides,
  getGuideBySlug,
  resolveCurriculumMeta,
  guideTotalMinutes,
  contentHref,
  ContentMeta,
} from "@/lib/blog/registry";
import { LEVELS } from "@/lib/blog/taxonomy";
import {
  IconBook,
  IconClock,
  IconChevronLeft,
} from "@/components/blog/shared";
import { LevelBadge } from "@/components/blog/TaxonomyMeta";
import { siteConfig } from "@/config/site";
import { useT } from "@/hooks/useT";
import { useAuth } from "@/hooks/useAuth";
import { campusService } from "@/services/campusService";
import { ProgressBar } from "@/components/campus/ProgressBar";

interface Props {
  guide: NonNullable<ReturnType<typeof getGuideBySlug>>;
  curriculum: (ContentMeta & { optional?: boolean })[];
  totalMinutes: number;
}

function levelLabel(
  level: string,
  t: (k: string, p?: Record<string, string | number>) => string,
): string {
  const l = LEVELS.find((l) => l.id === level);
  return l ? t(l.labelKey) : level;
}

export default function GuidePage({ guide, curriculum, totalMinutes }: Props) {
  const { t } = useT();
  const { isAuthenticated } = useAuth();
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isAuthenticated) return;
    campusService.getGuideProgress(guide.slug).then((progress) => {
      setCompletedSlugs(new Set(progress.map((p) => p.tutorial_slug)));
    }).catch(() => {});
  }, [isAuthenticated, guide.slug]);

  const completedCount = curriculum.filter((step) => completedSlugs.has(step.slug)).length;

  return (
    <CampusLayout
      seo={{
        title: guide.title,
        description: guide.description,
        ogType: "article",
      }}
    >
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TechArticle",
              headline: guide.title,
              description: guide.description,
              datePublished: guide.publishedAt,
              author: {
                "@type": "Person",
                name: "Adrián Escribano Pérez",
                url: siteConfig.url,
              },
              publisher: { "@type": "Person", name: "Adrián Escribano Pérez" },
              keywords: guide.tags?.join(", "),
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${siteConfig.url}/campus/guias/${guide.slug}`,
              },
            }),
          }}
          type="application/ld+json"
        />
      </Head>

      <div className="max-w-3xl mx-auto py-4 space-y-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#aeaeb2] dark:text-[#636366]">
          <Link className="hover:text-[#6e6e73] dark:hover:text-[#86868b] transition-colors no-underline" href="/campus">
            Campus
          </Link>
          <span aria-hidden="true">/</span>
          <Link className="hover:text-[#6e6e73] dark:hover:text-[#86868b] transition-colors no-underline" href="/campus/guias">
            {t("nav.campusGuides")}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-[#6e6e73] dark:text-[#86868b] truncate max-w-[200px]">
            {guide.title}
          </span>
        </nav>

        {/* Header */}
        <header className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span aria-hidden="true" className={`w-2.5 h-2.5 rounded-full ${guide.categoryColor}`} />
            <span className="text-sm font-semibold text-[#6e6e73] dark:text-[#86868b]">{guide.category}</span>
            {guide.level && (
              <>
                <span aria-hidden="true" className="text-sm text-[#aeaeb2] dark:text-[#636366]">·</span>
                <span className="text-sm text-[#aeaeb2] dark:text-[#636366]">{levelLabel(guide.level, t)}</span>
              </>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.03em" }}>
            {guide.title}
          </h1>
          <p className="text-sm text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
            {guide.description}
          </p>

          {/* Stats + Progress */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#6e6e73] dark:text-[#86868b]">
            <div className="flex items-center gap-1.5">
              <IconBook className="w-4 h-4" />
              <span>{curriculum.length} {curriculum.length === 1 ? t("blog.tutorialSingular") : t("blog.tutorialPlural")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IconClock className="w-4 h-4" />
              <span>~{totalMinutes} min</span>
            </div>
            {isAuthenticated && (
              <div className="flex-1 min-w-[120px]">
                <ProgressBar completed={completedCount} total={curriculum.length} size="md" />
              </div>
            )}
          </div>
        </header>

        {/* Curriculum */}
        <section aria-label={t("blog.guideTutorials")}>
          <div className="space-y-2">
            {curriculum.map((step, idx) => {
              const isCompleted = completedSlugs.has(step.slug);
              return (
                <article key={step.slug} className="relative">
                  <Link
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 no-underline ${
                      isCompleted
                        ? "bg-emerald-500/5 border-emerald-300/30 dark:border-emerald-700/30"
                        : "bg-white dark:bg-[#111116] border-black/8 dark:border-white/8 hover:border-emerald-300/60 dark:hover:border-emerald-700/60 hover:shadow-md"
                    }`}
                    href={contentHref(step.type, step.slug)}
                  >
                    {/* Step number / check */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                      isCompleted
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : step.optional
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : "bg-black/5 dark:bg-white/8 text-[#aeaeb2] dark:text-[#636366]"
                    }`}>
                      {isCompleted ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        idx + 1
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${step.categoryColor}`} />
                        <span className="text-[10px] font-semibold text-[#aeaeb2] dark:text-[#636366]">{step.category}</span>
                        {step.level && <LevelBadge level={step.level} />}
                        {step.optional && (
                          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-1.5 py-0.5 rounded">
                            {t("blog.optional")}
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white truncate">
                        {step.title}
                      </h3>
                    </div>

                    {/* Time */}
                    <div className="text-[10px] text-[#aeaeb2] dark:text-[#636366] shrink-0 flex items-center gap-1">
                      <IconClock className="w-3 h-3" />
                      {step.readTime}
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <div className="pt-6 border-t border-black/8 dark:border-white/8 flex items-center justify-between">
          <Link
            className="inline-flex items-center gap-2 text-sm text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors no-underline"
            href="/campus/guias"
          >
            <IconChevronLeft className="w-4 h-4" />
            {t("blog.allGuides")}
          </Link>
        </div>
      </div>
    </CampusLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const guides = getGuides();
  return {
    paths: guides.map((g) => ({ params: { slug: g.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const guide = getGuideBySlug(slug);
  if (!guide) return { notFound: true };
  return {
    props: {
      guide,
      curriculum: resolveCurriculumMeta(guide),
      totalMinutes: guideTotalMinutes(guide),
    },
  };
};
