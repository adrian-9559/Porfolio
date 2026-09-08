"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

import { useT } from "@/hooks/useT";
import BlogLayout from "@/layouts/blog";
import {
  allContent,
  searchContent,
  getContentByType,
  formatDate,
  contentHref,
  ContentMeta,
  ContentType,
} from "@/lib/blog/registry";
import { LevelBadge } from "@/components/blog/TaxonomyMeta";
import { CampusPromoBanner } from "@/components/blog/CampusPromoBanner";
import {
  IconArticle,
  IconTool,
  IconSearch,
  IconClose,
  IconExternal,
} from "@/components/blog/shared";
import ScrollReveal from "@/components/ui/ScrollReveal";

type BlogContentType = Exclude<ContentType, "tutorial">;

const typeConfig: Record<
  BlogContentType,
  {
    labelKey: string;
    icon: React.ReactNode;
    pill: string;
    cardAccent: string;
    href: string;
  }
> = {
  article: {
    labelKey: "blog.type.articles",
    href: "/blog/articulos",
    pill: "text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/50",
    cardAccent: "from-amber-400 to-orange-400",
    icon: <IconArticle className="w-4 h-4" />,
  },
  tool: {
    labelKey: "blog.type.tools",
    href: "/blog/herramientas",
    pill: "text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/50",
    cardAccent: "from-violet-400 to-purple-400",
    icon: <IconTool className="w-4 h-4" />,
  },
};

const cfgFor = (type: ContentType) => typeConfig[type as BlogContentType];

function ContentCard({
  item,
  showType = false,
}: {
  item: ContentMeta;
  showType?: boolean;
}) {
  const { t } = useT();
  const cfg = cfgFor(item.type);

  return (
    <Link
      className="group block relative overflow-hidden rounded-2xl ds-card hover:border-[var(--accent)]/20 hover:shadow-xl transition-all duration-300 no-underline h-full"
      href={contentHref(item.type, item.slug)}
    >
      <div
        aria-hidden="true"
        className={`h-1 w-full bg-gradient-to-r ${cfg.cardAccent}`}
      />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {showType && (
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.pill}`}
              >
                {cfg.icon}
                {t(cfg.labelKey)}
              </span>
            )}
            <span
              aria-hidden="true"
              className={`w-2 h-2 rounded-full flex-shrink-0 ${item.categoryColor}`}
            />
            <span className="text-xs text-[var(--text-secondary)] font-medium">
              {item.category}
            </span>
            <span className="text-xs text-[var(--text-secondary)]">
              · {item.readTime}
            </span>
          </div>
          {item.level && <LevelBadge level={item.level} size="xs" />}
        </div>
        <h3 className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug mb-2 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 mb-4">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--text-muted)]">
            {formatDate(item.publishedAt)}
          </span>
          <span
            className={`text-xs font-semibold ${item.type === "article" ? "text-amber-600 dark:text-amber-400" : "text-violet-600 dark:text-violet-400"} group-hover:translate-x-0.5 transition-transform inline-block`}
          >
            {item.type === "tool" ? t("blog.exploreLink") : t("blog.readLink")}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogHome() {
  const { t } = useT();
  const [query, setQuery] = useState("");

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    return searchContent(query).filter((c) => c.type !== "tutorial");
  }, [query]);

  const isSearching = query.trim().length > 0;
  const articles = getContentByType("article").slice(0, 6);
  const tools = getContentByType("tool").slice(0, 6);

  return (
    <BlogLayout
      seo={{ title: t("meta.blog.title"), description: t("meta.blog.desc") }}
    >
      <div className="space-y-14 py-4">
        {/* Hero */}
        <section
          aria-labelledby="hero-title"
          className="relative overflow-clip"
        >
          <div className="text-center space-y-5 py-8">
            <ScrollReveal>
              <span className="ds-section-label">
                <IconExternal className="w-3.5 h-3.5" />
                {t("sections.blog.badge")}
              </span>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-black text-[var(--text-primary)]"
                id="hero-title"
                style={{ letterSpacing: "-0.04em", lineHeight: 1.05 }}
              >
                {t("blog.headerLine1")}
                <span className="block hero-gradient-text">
                  {t("blog.headerLine2")}
                </span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
                {t("sections.blog.desc")}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Search */}
        <ScrollReveal>
          <section aria-labelledby="search-title" className="max-w-2xl mx-auto">
            <h2 className="sr-only" id="search-title">
              {t("blog.srSearch")}
            </h2>
            <div className="relative" role="search">
              <label className="sr-only" htmlFor="blog-search">
                {t("blog.searchLabel")}
              </label>
              <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                aria-activedescendant={undefined}
                aria-controls="search-results"
                className="ds-input w-full pl-11 pr-4 py-3.5"
                id="blog-search"
                placeholder={t("blog.searchPlaceholder")}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button
                  aria-label={t("blog.searchClear")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  onClick={() => setQuery("")}
                >
                  <IconClose className="w-4 h-4" />
                </button>
              )}
            </div>
            {isSearching && (
              <div className="mt-4 space-y-2" id="search-results">
                <p className="text-xs text-[var(--text-secondary)] font-medium">
                  {searchResults.length} {t("blog.srResults")}
                </p>
                {searchResults.map((item) => (
                  <ContentCard key={item.id} showType item={item} />
                ))}
              </div>
            )}
          </section>
        </ScrollReveal>

        {/* Campus promo */}
        {!isSearching && (
          <ScrollReveal>
            <CampusPromoBanner />
          </ScrollReveal>
        )}

        {/* Articles section */}
        {!isSearching && articles.length > 0 && (
          <section className="space-y-4">
            <ScrollReveal>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <IconArticle className="w-4 h-4" />
                  </div>
                  <h2
                    className="text-lg font-black text-[var(--text-primary)]"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {t("blog.type.articles")}
                  </h2>
                  <span className="text-xs text-[var(--text-muted)] font-medium bg-[var(--bg-surface)] px-2 py-0.5 rounded-full">
                    {allContent.filter((c) => c.type === "article").length}
                  </span>
                </div>
                <Link
                  className="text-sm font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors no-underline"
                  href="/blog/articulos"
                >
                  {t("sections.blog.viewAll")}
                </Link>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {articles.map((item, idx) => (
                <ScrollReveal key={item.id} delay={idx * 80}>
                  <ContentCard item={item} />
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}

        {/* Tools section */}
        {!isSearching && tools.length > 0 && (
          <section className="space-y-4">
            <ScrollReveal>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                    <IconTool className="w-4 h-4" />
                  </div>
                  <h2
                    className="text-lg font-black text-[var(--text-primary)]"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {t("blog.type.tools")}
                  </h2>
                  <span className="text-xs text-[var(--text-muted)] font-medium bg-[var(--bg-surface)] px-2 py-0.5 rounded-full">
                    {allContent.filter((c) => c.type === "tool").length}
                  </span>
                </div>
                <Link
                  className="text-sm font-bold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors no-underline"
                  href="/blog/herramientas"
                >
                  {t("sections.blog.viewAll")}
                </Link>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tools.map((item, idx) => (
                <ScrollReveal key={item.id} delay={idx * 80}>
                  <ContentCard item={item} />
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </BlogLayout>
  );
}
