"use client";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

import BlogLayout from "@/layouts/blog";
import {
  getGuides,
  getGuideBySlug,
  resolveCurriculumMeta,
  guideTotalMinutes,
  ContentMeta,
} from "@/lib/blog/registry";
import { LEVELS } from "@/lib/blog/taxonomy";
import {
  IconBook,
  IconClock,
  IconChevronLeft,
  IconCheck,
} from "@/components/blog/shared";
import { LevelBadge } from "@/components/blog/TaxonomyMeta";
import { siteConfig } from "@/config/site";
import { useT } from "@/hooks/useT";

interface Props {
  guide: NonNullable<ReturnType<typeof getGuideBySlug>>;
  curriculum: (ContentMeta & { optional?: boolean })[];
  totalMinutes: number;
}

function levelLabel(level: string, t: (k: string, p?: Record<string, string | number>) => string): string {
  const l = LEVELS.find((l) => l.id === level);
  return l ? t(l.labelKey) : level;
}

export default function GuidePage({ guide, curriculum, totalMinutes }: Props) {
  const { t } = useT();
  return (
    <BlogLayout
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
                "@id": `${siteConfig.url}/blog/tutoriales/guias/${guide.slug}`,
              },
            }),
          }}
          type="application/ld+json"
        />
      </Head>
      <div className="max-w-5xl mx-auto py-4">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-[#aeaeb2] dark:text-[#636366] mb-8"
        >
          <Link
            className="hover:text-[#6e6e73] dark:hover:text-[#86868b] transition-colors no-underline"
            href="/blog"
          >
            {t("blog.breadcrumb")}
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            className="hover:text-[#6e6e73] dark:hover:text-[#86868b] transition-colors no-underline"
            href="/blog/tutoriales"
          >
            {t("blog.type.tutorials")}
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            className="hover:text-[#6e6e73] dark:hover:text-[#86868b] transition-colors no-underline"
            href="/blog/tutoriales/guias"
          >
            {t("blog.guides")}
          </Link>
          <span aria-hidden="true">/</span>
          <span
            aria-current="page"
            className="text-[#6e6e73] dark:text-[#86868b] truncate max-w-[200px]"
          >
            {guide.title}
          </span>
        </nav>

        {/* Header */}
        <header className="space-y-4 mb-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              aria-hidden="true"
              className={`w-2.5 h-2.5 rounded-full ${guide.categoryColor}`}
            />
            <span className="text-sm font-semibold text-[#6e6e73] dark:text-[#86868b]">
              {guide.category}
            </span>
            {guide.level && (
              <>
                <span
                  aria-hidden="true"
                  className="text-sm text-[#aeaeb2] dark:text-[#636366]"
                >
                  ·
                </span>
                <span className="text-sm text-[#aeaeb2] dark:text-[#636366]">
                  {levelLabel(guide.level, t)}
                </span>
              </>
            )}
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white"
            style={{ letterSpacing: "-0.03em" }}
          >
            {guide.title}
          </h1>
          <p className="text-base text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
            {guide.description}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#6e6e73] dark:text-[#86868b] pt-2">
            <div className="flex items-center gap-1.5">
              <IconBook className="w-4 h-4" />
              <span>
                {curriculum.length}{" "}
                {curriculum.length === 1 ? t("blog.tutorialSingular") : t("blog.tutorialPlural")}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <IconClock className="w-4 h-4" />
              <span>~{totalMinutes} {t("blog.estimatedMinutes")}</span>
            </div>
          </div>
        </header>

        {/* Curriculum timeline */}
        <section aria-label={t("blog.guideTutorials")}>
          <div className="relative">
            {/* Vertical line */}
            <div
              aria-hidden="true"
              className="absolute left-[19px] top-0 bottom-0 w-px bg-black/8 dark:bg-white/8"
            />

            <div className="space-y-6">
              {curriculum.map((step, idx) => (
                <article key={step.slug} className="relative pl-14">
                  {/* Step number circle */}
                  <div
                    aria-hidden="true"
                    className={`absolute left-0 top-1 w-[38px] h-[38px] rounded-full flex items-center justify-center text-sm font-bold border-2 z-10 bg-white dark:bg-[#111116] ${
                      step.optional
                        ? "border-amber-300 dark:border-amber-700 text-amber-500 dark:text-amber-400"
                        : "border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400"
                    }`}
                  >
                    {idx + 1}
                  </div>

                  {/* Card */}
                  <Link
                    className="block p-5 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-200 no-underline motion-safe:transition-all"
                    href={`/blog/tutoriales/${step.slug}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span
                            aria-hidden="true"
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${step.categoryColor}`}
                          />
                          <span className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b]">
                            {step.category}
                          </span>
                          {step.level && <LevelBadge level={step.level} />}
                          {step.optional && (
                            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-1.5 py-0.5 rounded">
                              {t("blog.optional")}
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-sm text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors motion-safe:transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-1 leading-relaxed line-clamp-2">
                          {step.description}
                        </p>
                      </div>
                      <div className="text-xs text-[#aeaeb2] dark:text-[#636366] shrink-0 pt-0.5 flex items-center gap-1">
                        <IconClock className="w-3 h-3" />
                        {step.readTime}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="pt-8 border-t border-black/8 dark:border-white/8 mt-10 flex items-center justify-between gap-4 flex-wrap">
          <Link
            className="inline-flex items-center gap-2 text-sm text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors no-underline"
            href="/blog/tutoriales/guias"
          >
            <IconChevronLeft className="w-4 h-4" />
            {t("blog.allGuides")}
          </Link>
          <div className="flex items-center gap-2 text-xs text-[#aeaeb2] dark:text-[#636366]">
            <IconCheck className="w-3 h-3" />
            <span>
              {curriculum.length}{" "}
              {curriculum.length === 1 ? t("blog.tutorialSingular") : t("blog.tutorialPlural")} {t("blog.recommendedOrder")}
            </span>
          </div>
        </div>
      </div>
    </BlogLayout>
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
