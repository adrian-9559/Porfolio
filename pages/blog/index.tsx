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
    iconBg: string;
    gradient: string;
    href: string;
  }
> = {
  article: {
    labelKey: "blog.type.articles",
    href: "/blog/articulos",
    pill: "text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/50",
    cardAccent: "from-amber-400 to-orange-400",
    iconBg: "bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400",
    gradient: "from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/20 dark:via-orange-950/15 dark:to-yellow-950/10",
    icon: <IconArticle className="w-4 h-4" />,
  },
  tool: {
    labelKey: "blog.type.tools",
    href: "/blog/herramientas",
    pill: "text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/50",
    cardAccent: "from-violet-400 to-purple-400",
    iconBg: "bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400",
    gradient: "from-violet-50 via-purple-50 to-fuchsia-50 dark:from-violet-950/20 dark:via-purple-950/15 dark:to-fuchsia-950/10",
    icon: <IconTool className="w-4 h-4" />,
  },
};

const cfgFor = (type: ContentType) => typeConfig[type as BlogContentType];

function ContentCard({ item, showType = false }: { item: ContentMeta; showType?: boolean }) {
  const { t } = useT();
  const cfg = cfgFor(item.type);

  return (
    <Link
      className="group block relative overflow-hidden rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-xl transition-all duration-300 no-underline h-full"
      href={contentHref(item.type, item.slug)}
    >
      <div aria-hidden="true" className={`h-1 w-full bg-gradient-to-r ${cfg.cardAccent}`} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {showType && (
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.pill}`}>
                {cfg.icon}
                {t(cfg.labelKey)}
              </span>
            )}
            <span aria-hidden="true" className={`w-2 h-2 rounded-full flex-shrink-0 ${item.categoryColor}`} />
            <span className="text-xs text-[#6e6e73] dark:text-[#86868b] font-medium">{item.category}</span>
            <span className="text-xs text-[#6e6e73] dark:text-[#86868b]">· {item.readTime}</span>
          </div>
          {item.level && <LevelBadge level={item.level} size="xs" />}
        </div>
        <h3 className="font-bold text-sm text-[#1d1d1f] dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-snug mb-2 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed line-clamp-2 mb-4">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">{formatDate(item.publishedAt)}</span>
          <span className={`text-xs font-semibold ${item.type === "article" ? "text-amber-600 dark:text-amber-400" : "text-violet-600 dark:text-violet-400"} group-hover:translate-x-0.5 transition-transform inline-block`}>
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
    <BlogLayout seo={{ title: t("meta.blog.title"), description: t("meta.blog.desc") }}>
      <div className="space-y-14 py-4">
        {/* Hero */}
        <section aria-labelledby="hero-title" className="relative overflow-clip">
          <div aria-hidden="true" className="blob absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-violet-400/12 via-pink-400/8 to-transparent -z-10" />
          <div aria-hidden="true" className="blob absolute top-0 right-0 w-[250px] h-[250px] bg-gradient-to-bl from-amber-400/10 to-transparent -z-10" />
          <div aria-hidden="true" className="blob absolute top-10 left-0 w-[200px] h-[200px] bg-gradient-to-br from-cyan-400/10 to-transparent -z-10" />

          <div className="text-center space-y-5 py-8">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-300/40 dark:border-violet-700/40">
                <IconExternal className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                <span className="text-xs font-bold tracking-widest uppercase text-violet-700 dark:text-violet-300">
                  {t("sections.blog.badge")}
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black" id="hero-title" style={{ letterSpacing: "-0.04em", lineHeight: 1.05 }}>
                {t("blog.headerLine1")}
                <span className="block hero-gradient-text">{t("blog.headerLine2")}</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] max-w-lg mx-auto leading-relaxed">
                {t("sections.blog.desc")}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Search */}
        <ScrollReveal>
          <section aria-labelledby="search-title" className="max-w-2xl mx-auto">
            <h2 className="sr-only" id="search-title">{t("blog.srSearch")}</h2>
            <div className="relative" role="search">
              <label className="sr-only" htmlFor="blog-search">{t("blog.searchLabel")}</label>
              <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeaeb2] dark:text-[#636366]" />
              <input
                aria-activedescendant={undefined}
                aria-controls="search-results"
                aria-expanded={isSearching}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] dark:placeholder-[#636366] focus:outline-none focus:border-violet-400 dark:focus:border-violet-500 focus:ring-2 focus:ring-violet-400/20 transition-all shadow-sm"
                id="blog-search"
                placeholder={t("blog.searchPlaceholder")}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button
                  aria-label={t("blog.searchClear")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aeaeb2] dark:text-[#636366] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
                  onClick={() => setQuery("")}
                >
                  <IconClose className="w-4 h-4" />
                </button>
              )}
            </div>
            {isSearching && (
              <div id="search-results" className="mt-4 space-y-2">
                <p className="text-xs text-[#6e6e73] dark:text-[#86868b] font-medium">{searchResults.length} {t("blog.srResults")}</p>
                {searchResults.map((item) => (
                  <ContentCard key={item.id} item={item} showType />
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
                  <h2 className="text-lg font-black text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>
                    {t("blog.type.articles")}
                  </h2>
                  <span className="text-xs text-[#aeaeb2] dark:text-[#636366] font-medium bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-full">
                    {allContent.filter((c) => c.type === "article").length}
                  </span>
                </div>
                <Link className="text-sm font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors no-underline" href="/blog/articulos">
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
                  <h2 className="text-lg font-black text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>
                    {t("blog.type.tools")}
                  </h2>
                  <span className="text-xs text-[#aeaeb2] dark:text-[#636366] font-medium bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-full">
                    {allContent.filter((c) => c.type === "tool").length}
                  </span>
                </div>
                <Link className="text-sm font-bold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors no-underline" href="/blog/herramientas">
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
