"use client";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

import CampusLayout from "@/layouts/campus";
import { getContentByType, formatDate, ContentMeta } from "@/lib/blog/registry";
import { getContentComponent } from "@/lib/blog/componentMap";
import {
  TaxonomyMetaStrip,
  PrerequisitesBlock,
  ObjectivesBlock,
  RelatedContentBlock,
} from "@/components/blog/TaxonomyMeta";
import { siteConfig } from "@/config/site";
import { IconChevronLeft } from "@/components/blog/shared";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { useT } from "@/hooks/useT";
import { useAuth } from "@/hooks/useAuth";
import { useLocaleStore } from "@/store/localeStore";
import { campusService } from "@/services/campusService";
import { BookmarkButton } from "@/components/campus/BookmarkButton";
import { NotesPanel } from "@/components/campus/NotesPanel";
import { QuizModal } from "@/components/campus/QuizModal";
import type { CampusProgress, QuizResult } from "@/types/campus";

interface Props {
  meta: ContentMeta;
  prevMeta: ContentMeta | null;
  nextMeta: ContentMeta | null;
}

export default function TutorialPage({ meta, prevMeta, nextMeta }: Props) {
  const { t } = useT();
  const { isAuthenticated } = useAuth();
  const locale = useLocaleStore((s) => s.locale);
  const Component = getContentComponent(meta.id, locale);
  const [completed, setCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showMobileActions, setShowMobileActions] = useState(false);
  const [xpEarned, setXpEarned] = useState<number | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    campusService.getProgress().then((progress) => {
      setCompleted(progress.some((p) => p.tutorial_slug === meta.slug));
    }).catch(() => {});
  }, [isAuthenticated, meta.slug]);

  const handleMarkComplete = async () => {
    try {
      const result = await campusService.markComplete(meta.slug, undefined, 0);
      setCompleted(true);
      setXpEarned(result.xpEarned);
    } catch {}
  };

  const handleQuizComplete = (result: QuizResult) => {
    setShowQuiz(false);
    if (result.passed) setXpEarned((prev) => (prev ?? 0) + result.xpEarned);
  };

  return (
    <CampusLayout
      seo={{
        title: meta.title,
        description: meta.description,
        ogType: "article",
      }}
    >
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TechArticle",
              headline: meta.title,
              description: meta.description,
              datePublished: meta.publishedAt,
              author: { "@type": "Person", name: "Adrián Escribano Pérez", url: siteConfig.url },
              publisher: { "@type": "Person", name: "Adrián Escribano Pérez" },
              keywords: meta.tags?.join(", "),
              mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/campus/tutoriales/${meta.slug}` },
            }),
          }}
          type="application/ld+json"
        />
      </Head>
      <ReadingProgress />

      <div className="max-w-6xl mx-auto py-4">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#aeaeb2] dark:text-[#636366] mb-6">
          <Link className="hover:text-[#6e6e73] dark:hover:text-[#86868b] transition-colors no-underline" href="/campus">Campus</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-[#6e6e73] dark:text-[#86868b] truncate max-w-[200px]">{meta.title}</span>
        </nav>

        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <header className="space-y-3 mb-8">
              <div className="flex items-center gap-2 flex-wrap">
                <span aria-hidden="true" className={`w-2.5 h-2.5 rounded-full ${meta.categoryColor}`} />
                <span className="text-sm font-semibold text-[#6e6e73] dark:text-[#86868b]">{meta.category}</span>
                <span aria-hidden="true" className="text-sm text-[#aeaeb2] dark:text-[#636366]">·</span>
                <span className="text-sm text-[#aeaeb2] dark:text-[#636366]">{formatDate(meta.publishedAt)}</span>
                <span aria-hidden="true" className="text-sm text-[#aeaeb2] dark:text-[#636366]">·</span>
                <span className="text-sm text-[#aeaeb2] dark:text-[#636366]">{meta.readTime}{t("blog.readTimeSuffix")}</span>
              </div>
              <TaxonomyMetaStrip meta={meta} />
              <h1 className="text-2xl md:text-3xl font-bold text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.03em" }}>
                {meta.title}
              </h1>
              <p className="text-sm text-[#6e6e73] dark:text-[#86868b] leading-relaxed">{meta.description}</p>
              {meta.tags && (
                <div className="flex flex-wrap gap-1.5">
                  {meta.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/5 dark:bg-white/8 text-[#6e6e73] dark:text-[#86868b]">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <PrerequisitesBlock meta={meta} />
            <ObjectivesBlock meta={meta} />

            <div className="h-px bg-black/8 dark:bg-white/8 my-8" />

            {/* Content */}
            <div className="flex-1 min-w-0">
              {Component ? <Component /> : (
                <div className="py-12 text-center text-[#6e6e73] dark:text-[#86868b]">{t("blog.contentUnavailable")}</div>
              )}
            </div>

            <RelatedContentBlock meta={meta} />

            {/* Footer nav */}
            <nav aria-label={t("blog.navTutorials")} className="pt-8 border-t border-black/8 dark:border-white/8 flex items-center justify-between gap-4">
              <Link className="inline-flex items-center gap-2 text-sm text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors no-underline" href="/campus">
                <IconChevronLeft className="w-4 h-4" />
                {t("blog.allTutorials")}
              </Link>
              <div className="flex items-center gap-4">
                {prevMeta && (
                  <Link className="text-sm text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors no-underline truncate max-w-[180px]" href={`/campus/tutoriales/${prevMeta.slug}`}>
                    ← {prevMeta.title}
                  </Link>
                )}
                {nextMeta && (
                  <Link className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors no-underline truncate max-w-[180px]" href={`/campus/tutoriales/${nextMeta.slug}`}>
                    {nextMeta.title} →
                  </Link>
                )}
              </div>
            </nav>
          </div>

          {/* Side panel (desktop) */}
          {isAuthenticated && (
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 space-y-4">
                {/* XP earned */}
                {xpEarned !== null && (
                  <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-300/30 dark:border-emerald-700/30 text-center">
                    <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">+{xpEarned} XP</p>
                  </div>
                )}

                {/* Complete button */}
                <button
                  className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all ${
                    completed
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-300/40 dark:border-emerald-700/40 cursor-default"
                      : "bg-emerald-500 text-white hover:bg-emerald-600"
                  }`}
                  onClick={completed ? undefined : handleMarkComplete}
                  type="button"
                  disabled={completed}
                >
                  {completed ? t("campus.progress.alreadyCompleted") : t("campus.progress.markComplete")}
                </button>

                {/* Quiz button */}
                {completed && (
                  <button
                    className="w-full py-2.5 rounded-xl text-sm font-medium bg-black/5 dark:bg-white/8 text-[#1d1d1f] dark:text-white hover:bg-black/10 dark:hover:bg-white/12 transition-colors"
                    onClick={() => setShowQuiz(true)}
                    type="button"
                  >
                    {t("campus.quiz.start")}
                  </button>
                )}

                {/* Bookmark */}
                <BookmarkButton tutorialSlug={meta.slug} />

                {/* Notes */}
                <div className="pt-4 border-t border-black/8 dark:border-white/8">
                  <NotesPanel tutorialSlug={meta.slug} />
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* Mobile floating action button */}
      {isAuthenticated && (
        <div className="lg:hidden fixed bottom-6 right-6 z-40">
          <button
            className="w-14 h-14 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 flex items-center justify-center hover:bg-emerald-600 transition-colors"
            onClick={() => setShowMobileActions(true)}
            type="button"
            aria-label={t("campus.progress.markComplete")}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      )}

      {/* Mobile bottom sheet */}
      {showMobileActions && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowMobileActions(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-[#111116] rounded-t-2xl border-t border-black/8 dark:border-white/8 p-6 space-y-3 animate-in slide-in-from-bottom duration-300">
            <div className="w-10 h-1 bg-black/10 dark:bg-white/10 rounded-full mx-auto mb-4" />

            {xpEarned !== null && (
              <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-300/30 dark:border-emerald-700/30 text-center mb-2">
                <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">+{xpEarned} XP</p>
              </div>
            )}

            <button
              className={`w-full py-3 rounded-xl text-sm font-medium transition-all ${
                completed
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-300/40 dark:border-emerald-700/40"
                  : "bg-emerald-500 text-white hover:bg-emerald-600"
              }`}
              onClick={() => { if (!completed) handleMarkComplete(); setShowMobileActions(false); }}
              type="button"
            >
              {completed ? t("campus.progress.alreadyCompleted") : t("campus.progress.markComplete")}
            </button>

            {completed && (
              <button
                className="w-full py-3 rounded-xl text-sm font-medium bg-black/5 dark:bg-white/8 text-[#1d1d1f] dark:text-white hover:bg-black/10 dark:hover:bg-white/12 transition-colors"
                onClick={() => { setShowQuiz(true); setShowMobileActions(false); }}
                type="button"
              >
                {t("campus.quiz.start")}
              </button>
            )}

            <div className="pt-2">
              <BookmarkButton tutorialSlug={meta.slug} />
            </div>

            <button
              className="w-full py-3 rounded-xl text-sm font-medium text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
              onClick={() => setShowMobileActions(false)}
              type="button"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Quiz modal */}
      {showQuiz && (
        <QuizModal
          tutorialSlug={meta.slug}
          onClose={() => setShowQuiz(false)}
          onComplete={handleQuizComplete}
        />
      )}
    </CampusLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tutorials = getContentByType("tutorial");
  return {
    paths: tutorials.map((t) => ({ params: { slug: t.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const tutorials = getContentByType("tutorial");
  const idx = tutorials.findIndex((t) => t.slug === slug);
  if (idx === -1) return { notFound: true };
  return {
    props: {
      meta: tutorials[idx],
      prevMeta: tutorials[idx - 1] ?? null,
      nextMeta: tutorials[idx + 1] ?? null,
    },
  };
};
