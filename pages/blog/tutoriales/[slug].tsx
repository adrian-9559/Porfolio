"use client";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

import BlogLayout from "@/layouts/blog";
import {
  getContentByType,
  formatDate,
  typeSlug,
  ContentMeta,
} from "@/lib/blog/registry";
import { getContentComponent } from "@/lib/blog/componentMap";
import {
  TaxonomyMetaStrip,
  PrerequisitesBlock,
  ObjectivesBlock,
  RelatedContentBlock,
} from "@/components/blog/TaxonomyMeta";
import { siteConfig } from "@/config/site";
import { IconChevronLeft } from "@/components/blog/shared";
import { useT } from "@/hooks/useT";
import { useLocaleStore } from "@/store/localeStore";

interface Props {
  meta: ContentMeta;
  prevMeta: ContentMeta | null;
  nextMeta: ContentMeta | null;
}

export default function TutorialPage({ meta, prevMeta, nextMeta }: Props) {
  const { t } = useT();
  const locale = useLocaleStore((s) => s.locale);
  const Component = getContentComponent(meta.id, locale);

  return (
    <BlogLayout
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
              author: {
                "@type": "Person",
                name: "Adrián Escribano Pérez",
                url: siteConfig.url,
              },
              publisher: { "@type": "Person", name: "Adrián Escribano Pérez" },
              keywords: meta.tags?.join(", "),
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${siteConfig.url}/blog/${typeSlug(meta.type)}/${meta.slug}`,
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
          <span
            aria-current="page"
            className="text-[#6e6e73] dark:text-[#86868b] truncate max-w-[200px]"
          >
            {meta.title}
          </span>
        </nav>

        {/* Header */}
        <header className="space-y-4 mb-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              aria-hidden="true"
              className={`w-2.5 h-2.5 rounded-full ${meta.categoryColor}`}
            />
            <span className="text-sm font-semibold text-[#6e6e73] dark:text-[#86868b]">
              {meta.category}
            </span>
            <span
              aria-hidden="true"
              className="text-sm text-[#aeaeb2] dark:text-[#636366]"
            >
              ·
            </span>
            <span className="text-sm text-[#aeaeb2] dark:text-[#636366]">
              {formatDate(meta.publishedAt)}
            </span>
            <span
              aria-hidden="true"
              className="text-sm text-[#aeaeb2] dark:text-[#636366]"
            >
              ·
            </span>
            <span className="text-sm text-[#aeaeb2] dark:text-[#636366]">
              {meta.readTime}{t("blog.readTimeSuffix")}
            </span>
          </div>
          <TaxonomyMetaStrip meta={meta} />
          <h1
            className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white"
            style={{ letterSpacing: "-0.03em" }}
          >
            {meta.title}
          </h1>
          <p className="text-base text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
            {meta.description}
          </p>
          {meta.tags && (
            <div className="flex flex-wrap gap-2 pt-1">
              {meta.tags.map((tag) => (
                <span key={tag} className="tag-chip">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <PrerequisitesBlock meta={meta} />
        <ObjectivesBlock meta={meta} />

        <div className="h-px bg-black/8 dark:bg-white/8 my-10" />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {Component ? (
            <Component />
          ) : (
            <div className="py-12 text-center text-[#6e6e73] dark:text-[#86868b]">
              {t("blog.contentUnavailable")}
            </div>
          )}
        </div>

        <RelatedContentBlock meta={meta} />

        {/* Footer nav */}
        <nav
          aria-label={t("blog.navTutorials")}
          className="pt-8 border-t border-black/8 dark:border-white/8 flex items-center justify-between gap-4 flex-wrap"
        >
          <Link
            className="inline-flex items-center gap-2 text-sm text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors no-underline"
            href="/blog/tutoriales"
          >
            <IconChevronLeft className="w-4 h-4" />
            {t("blog.allTutorials")}
          </Link>
          <div className="flex items-center gap-4">
            {prevMeta && (
              <Link
                className="text-sm text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors no-underline truncate max-w-[180px]"
                href={`/blog/tutoriales/${prevMeta.slug}`}
              >
                ← {prevMeta.title}
              </Link>
            )}
            {nextMeta && (
              <Link
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors no-underline truncate max-w-[180px]"
                href={`/blog/tutoriales/${nextMeta.slug}`}
              >
                {nextMeta.title} →
              </Link>
            )}
          </div>
        </nav>
      </div>
    </BlogLayout>
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
