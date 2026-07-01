"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

import { useT } from "@/hooks/useT";
import BlogLayout from "@/layouts/blog";
import {
  allContent,
  searchContent,
  filterContent,
  getLatestContent,
  getContentByType,
  formatDate,
  typeSlug,
  ContentMeta,
  ContentType,
} from "@/lib/blog/registry";
import {
  LEVELS,
  LEARNING_PATHS,
  type DifficultyLevel,
  type LearningPathId,
} from "@/lib/blog/taxonomy";
import { LevelBadge } from "@/components/blog/TaxonomyMeta";
import {
  IconArticle,
  IconTutorial,
  IconTool,
  IconSearch,
  IconClose,
  IconExternal,
} from "@/components/blog/shared";

const typeConfig: Record<
  ContentType,
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
    iconBg:
      "bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400",
    gradient:
      "from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/20 dark:via-orange-950/15 dark:to-yellow-950/10",
    icon: <IconArticle className="w-4 h-4" />,
  },
  tutorial: {
    labelKey: "blog.type.tutorials",
    href: "/blog/tutoriales",
    pill: "text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/50",
    cardAccent: "from-blue-400 to-cyan-400",
    iconBg: "bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400",
    gradient:
      "from-blue-50 via-cyan-50 to-sky-50 dark:from-blue-950/20 dark:via-cyan-950/15 dark:to-sky-950/10",
    icon: <IconTutorial className="w-4 h-4" />,
  },
  tool: {
    labelKey: "blog.type.tools",
    href: "/blog/herramientas",
    pill: "text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/50",
    cardAccent: "from-violet-400 to-purple-400",
    iconBg:
      "bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400",
    gradient:
      "from-violet-50 via-purple-50 to-fuchsia-50 dark:from-violet-950/20 dark:via-purple-950/15 dark:to-fuchsia-950/10",
    icon: <IconTool className="w-4 h-4" />,
  },
};

function ContentCard({
  item,
  showType = false,
}: {
  item: ContentMeta;
  showType?: boolean;
}) {
  const { t } = useT();
  const cfg = typeConfig[item.type];

  return (
    <Link
      className="block group relative overflow-hidden rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/12 hover:shadow-lg hover:shadow-black/8 dark:hover:shadow-black/30 transition-all duration-300 no-underline motion-safe:transition-all"
      href={`/blog/${typeSlug(item.type)}/${item.slug}`}
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
            <span className="text-xs text-[#aeaeb2] dark:text-[#636366] font-medium">
              {item.category}
            </span>
            <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
              · {item.readTime}
            </span>
          </div>
          {item.level && <LevelBadge level={item.level} size="xs" />}
        </div>

        <h3 className="font-bold text-sm text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug mb-2 line-clamp-2 motion-safe:transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed line-clamp-2 mb-4">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {formatDate(item.publishedAt)}
          </span>
          <span
            className={`text-xs font-semibold ${item.type === "article" ? "text-amber-600 dark:text-amber-400" : item.type === "tutorial" ? "text-blue-600 dark:text-blue-400" : "text-violet-600 dark:text-violet-400"} group-hover:translate-x-0.5 transition-transform motion-safe:transition-transform inline-block`}
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
  const [activeLevel, setActiveLevel] = useState<DifficultyLevel | "all">(
    "all",
  );
  const [activePath, setActivePath] = useState<LearningPathId | "all">("all");
  const latest = getLatestContent();

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    return searchContent(query);
  }, [query]);

  const isSearching = query.trim().length > 0;
  const isFiltering = activeLevel !== "all" || activePath !== "all";

  const filteredContent = useMemo(() => {
    if (!isFiltering) return null;

    return filterContent({
      level: activeLevel !== "all" ? activeLevel : undefined,
      learningPath: activePath !== "all" ? activePath : undefined,
    });
  }, [activeLevel, activePath, isFiltering]);

  const articles = getContentByType("article").slice(0, 4);
  const tutorials = getContentByType("tutorial").slice(0, 4);
  const tools = getContentByType("tool").slice(0, 4);

  return (
    <BlogLayout
      seo={{
        title: t("meta.blog.title"),
        description: t("meta.blog.desc"),
      }}
    >
      <div className="space-y-14 py-4">
        {/* ── Hero ── */}
        <section
          aria-labelledby="hero-title"
          className="relative overflow-clip"
        >
          <div
            aria-hidden="true"
            className="blob absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-violet-400/12 via-pink-400/8 to-transparent -z-10 motion-safe:animate-none"
          />
          <div
            aria-hidden="true"
            className="blob absolute top-0 right-0 w-[250px] h-[250px] bg-gradient-to-bl from-amber-400/10 to-transparent -z-10 motion-safe:animate-none"
          />
          <div
            aria-hidden="true"
            className="blob absolute top-10 left-0 w-[200px] h-[200px] bg-gradient-to-br from-cyan-400/10 to-transparent -z-10 motion-safe:animate-none"
          />

          <div className="text-center space-y-5 py-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-300/40 dark:border-violet-700/40">
              <IconExternal className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
              <span className="text-xs font-bold tracking-widest uppercase text-violet-700 dark:text-violet-300">
                {t("blog.badge")}
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-black"
              id="hero-title"
              style={{ letterSpacing: "-0.04em", lineHeight: 1.05 }}
            >
              {t("blog.headerLine1")}
              <span className="block hero-gradient-text">{t("blog.headerLine2")}</span>
            </h1>
            <p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] max-w-lg mx-auto leading-relaxed">
              {t("blog.subtitle")}
            </p>
          </div>
        </section>

        {/* ── Category stat cards ── */}
        <section
          aria-labelledby="categories-title"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <h2 className="sr-only" id="categories-title">
            {t("blog.srCategories")}
          </h2>
          {CATEGORY_STATS.map((s) => (
            <Link
              key={s.labelKey}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${s.bg} border ${s.border} hover:shadow-lg hover:scale-[1.02] transition-all duration-300 no-underline p-5 motion-safe:transition-all`}
              href={s.href}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-xl ${s.iconBg} ${s.iconColor} flex items-center justify-center`}
                >
                  {s.icon}
                </div>
                <span
                  className={`text-3xl font-black bg-gradient-to-br ${s.gradient} bg-clip-text text-transparent`}
                >
                  {allContent.filter((c) => c.type === s.countKey).length}
                </span>
              </div>
              <p className={`font-bold text-base ${s.text}`}>{t(s.labelKey)}</p>
              <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-0.5">
                {t(s.subKey)}
              </p>
              <div className="mt-3 flex items-center gap-1">
                <span
                  className={`text-xs font-semibold ${s.text} group-hover:translate-x-0.5 transition-transform inline-block motion-safe:transition-transform`}
                >
                  {t("blog.viewAll")}
                </span>
              </div>
              <div
                aria-hidden="true"
                className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br ${s.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}
              />
            </Link>
          ))}
        </section>

        {/* ── Global search ── */}
        <section aria-labelledby="search-title" className="max-w-2xl mx-auto">
          <h2 className="sr-only" id="search-title">
            {t("blog.srSearch")}
          </h2>
          <div className="relative" role="search">
            <label className="sr-only" htmlFor="blog-search">
              {t("blog.searchLabel")}
            </label>
            <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeaeb2]" />
            <input
              aria-activedescendant={undefined}
              aria-controls="search-results"
              aria-expanded={isSearching}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-[#111116] border border-black/10 dark:border-white/10 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] dark:placeholder-[#636366] focus:outline-none focus:border-violet-400 dark:focus:border-violet-500 focus:ring-2 focus:ring-violet-400/20 dark:focus:ring-violet-500/20 transition-all shadow-sm"
              id="blog-search"
              placeholder={t("blog.searchPlaceholder")}
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

          {/* Taxonomy filters */}
          {!isSearching && (
            <div className="mt-4 flex flex-col gap-2">
              <div
                aria-label={t("blog.filterLevelAria")}
                className="flex items-center gap-1.5 flex-wrap"
                role="group"
              >
                <span className="text-[10px] font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider w-14">
                  {t("blog.filterLevel")}
                </span>
                <button
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${activeLevel === "all" ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f]" : "border border-black/10 dark:border-white/10 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"}`}
                  onClick={() => setActiveLevel("all")}
                >
                  {t("blog.filterAll")}
                </button>
                {LEVELS.map((l) => (
                  <button
                    key={l.id}
                    aria-pressed={activeLevel === l.id}
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${activeLevel === l.id ? `${l.bgColor} ${l.color} ring-1 ring-current` : "border border-black/10 dark:border-white/10 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"}`}
                    onClick={() =>
                      setActiveLevel(activeLevel === l.id ? "all" : l.id)
                    }
                  >
                    {t(l.labelKey)}
                  </button>
                ))}
              </div>
              <div
                aria-label={t("blog.filterPathAria")}
                className="flex items-center gap-1.5 flex-wrap"
                role="group"
              >
                <span className="text-[10px] font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider w-14">
                  {t("blog.filterPath")}
                </span>
                <button
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${activePath === "all" ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f]" : "border border-black/10 dark:border-white/10 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"}`}
                  onClick={() => setActivePath("all")}
                >
                  {t("blog.filterAllPaths")}
                </button>
                {LEARNING_PATHS.map((p) => (
                  <button
                    key={p.id}
                    aria-pressed={activePath === p.id}
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${activePath === p.id ? "bg-violet-600 text-white" : "border border-black/10 dark:border-white/10 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"}`}
                    onClick={() =>
                      setActivePath(activePath === p.id ? "all" : p.id)
                    }
                  >
                    {p.icon} {t(p.titleKey)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search results */}
          {isSearching && (
            <div
              aria-label={t("blog.searchResults")}
              aria-live="polite"
              className="mt-3 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden shadow-xl shadow-black/8 dark:shadow-black/30"
              id="search-results"
              role="region"
            >
              {searchResults.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <IconSearch className="w-12 h-12 mx-auto mb-3 text-[#aeaeb2] dark:text-[#636366]" />
                  <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">
                    {t("blog.noResultsPrefix")}
                    <span className="font-bold text-[#1d1d1f] dark:text-white">
                      &quot;{query}&quot;
                    </span>
                  </p>
                </div>
              ) : (
                <div
                  aria-label={t("blog.searchResults")}
                  className="divide-y divide-black/6 dark:divide-white/6"
                  role="listbox"
                >
                  {searchResults.map((item) => {
                    const cfg = typeConfig[item.type];

                    return (
                      <Link
                        key={item.id}
                        aria-selected={false}
                        className="flex items-start gap-4 px-5 py-4 hover:bg-black/3 dark:hover:bg-white/3 transition-colors no-underline group"
                        href={`/blog/${typeSlug(item.type)}/${item.slug}`}
                        role="option"
                        onClick={() => setQuery("")}
                      >
                        <div
                          className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${cfg.iconBg}`}
                        >
                          {cfg.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span
                              className={`text-xs font-bold ${cfg.pill
                                .split(" ")
                                .filter((c) => c.startsWith("text-"))
                                .join(" ")}`}
                            >
                              {t(cfg.labelKey)}
                            </span>
                            <span
                              aria-hidden="true"
                              className="text-xs text-[#aeaeb2] dark:text-[#636366]"
                            >
                              ·
                            </span>
                            <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                            {item.title}
                          </p>
                        </div>
                        <IconExternal className="w-4 h-4 text-[#aeaeb2] flex-shrink-0 mt-1" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </section>

        {/* ── Below fold ── */}
        {!isSearching && (
          <div className="space-y-14">
            {/* Filtered results */}
            {isFiltering && filteredContent && (
              <section aria-labelledby="filtered-title" className="space-y-4">
                <div className="flex items-center gap-3">
                  <h2
                    className="text-xs font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-widest"
                    id="filtered-title"
                  >
                    {filteredContent.length} {filteredContent.length === 1 ? t("blog.result") : t("blog.results")}
                  </h2>
                  <span
                    aria-hidden="true"
                    className="flex-1 h-px bg-black/8 dark:bg-white/8"
                  />
                  <button
                    className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline"
                    onClick={() => {
                      setActiveLevel("all");
                      setActivePath("all");
                    }}
                  >
                    {t("blog.clearFilters")}
                  </button>
                </div>
                {filteredContent.length === 0 ? (
                  <div className="py-16 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 text-[#aeaeb2] dark:text-[#636366]">
                      <svg
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">
                      {t("blog.noContent")}
                    </p>
                  </div>
                ) : (
                  <div
                    aria-label={t("blog.filteredContentAria")}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    role="list"
                  >
                    {filteredContent.map((item) => (
                      <ContentCard key={item.id} showType item={item} />
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Latest published */}
            {!isFiltering && (
              <section aria-labelledby="latest-title" className="space-y-4">
                <div className="flex items-center gap-3">
                  <h2
                    className="text-xs font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-widest flex items-center gap-1.5"
                    id="latest-title"
                  >
                    <IconArticle className="w-3.5 h-3.5 text-amber-400" />
                    {t("blog.lastPublished")}
                  </h2>
                  <span
                    aria-hidden="true"
                    className="flex-1 h-px bg-black/8 dark:bg-white/8"
                  />
                </div>
                <Link
                  className={`block group relative overflow-hidden rounded-3xl bg-gradient-to-br ${typeConfig[latest.type].gradient} border ${
                    latest.type === "article"
                      ? "border-amber-200 dark:border-amber-800/40"
                      : latest.type === "tutorial"
                        ? "border-blue-200 dark:border-blue-800/40"
                        : "border-violet-200 dark:border-violet-800/40"
                  } hover:shadow-2xl hover:scale-[1.005] transition-all duration-300 no-underline motion-safe:transition-all`}
                  href={`/blog/${typeSlug(latest.type)}/${latest.slug}`}
                >
                  <div
                    aria-hidden="true"
                    className={`h-1.5 w-full bg-gradient-to-r ${typeConfig[latest.type].cardAccent}`}
                  />
                  <div className="p-7 md:p-9">
                    <div className="flex items-start justify-between gap-6">
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${typeConfig[latest.type].pill}`}
                          >
                            {typeConfig[latest.type].icon}
                            {t(typeConfig[latest.type].labelKey)}
                          </span>
                          <span
                            aria-hidden="true"
                            className={`w-2 h-2 rounded-full ${latest.categoryColor}`}
                          />
                          <span className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b]">
                            {latest.category}
                          </span>
                          <span
                            aria-hidden="true"
                            className="text-xs text-[#aeaeb2] dark:text-[#636366]"
                          >
                            ·
                          </span>
                          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                            {formatDate(latest.publishedAt)}
                          </span>
                          <span
                            aria-hidden="true"
                            className="text-xs text-[#aeaeb2] dark:text-[#636366]"
                          >
                            ·
                          </span>
                          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                            {latest.readTime}
                          </span>
                        </div>
                        <h3
                          className="text-2xl md:text-3xl font-black text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors motion-safe:transition-colors"
                          style={{ letterSpacing: "-0.03em" }}
                        >
                          {latest.title}
                        </h3>
                        <p className="text-sm text-[#6e6e73] dark:text-[#86868b] leading-relaxed max-w-lg">
                          {latest.description}
                        </p>
                        {latest.tags && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {latest.tags.map((tag) => (
                              <span key={tag} className="tag-chip">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div
                        aria-hidden="true"
                        className={`flex-shrink-0 w-14 h-14 rounded-2xl ${typeConfig[latest.type].iconBg} border ${
                          latest.type === "article"
                            ? "border-amber-200 dark:border-amber-800/40"
                            : latest.type === "tutorial"
                              ? "border-blue-200 dark:border-blue-800/40"
                              : "border-violet-200 dark:border-violet-800/40"
                        } flex items-center justify-center group-hover:scale-110 transition-transform duration-300 motion-safe:transition-transform`}
                      >
                        {typeConfig[latest.type].icon}
                      </div>
                    </div>
                  </div>
                </Link>
              </section>
            )}

            {/* Sections: Articles, Tutorials, Tools */}
            {!isFiltering && articles.length > 0 && (
              <ContentSection
                accentColor="amber"
                href="/blog/articulos"
                icon={typeConfig.article.icon}
                iconBg={typeConfig.article.iconBg}
                items={articles}
                title={t("blog.type.articles")}
                total={allContent.filter((c) => c.type === "article").length}
              />
            )}

            {!isFiltering && tutorials.length > 0 && (
              <ContentSection
                accentColor="blue"
                href="/blog/tutoriales"
                icon={typeConfig.tutorial.icon}
                iconBg={typeConfig.tutorial.iconBg}
                items={tutorials}
                title={t("blog.type.tutorials")}
                total={allContent.filter((c) => c.type === "tutorial").length}
              />
            )}

            {!isFiltering && tools.length > 0 && (
              <ContentSection
                accentColor="violet"
                href="/blog/herramientas"
                icon={typeConfig.tool.icon}
                iconBg={typeConfig.tool.iconBg}
                items={tools}
                title={t("blog.type.tools")}
                total={allContent.filter((c) => c.type === "tool").length}
              />
            )}
          </div>
        )}
      </div>
    </BlogLayout>
  );
}

function ContentSection({
  title,
  href,
  iconBg,
  icon,
  total,
  items,
  accentColor,
}: {
  title: string;
  href: string;
  iconBg: string;
  icon: React.ReactNode;
  total: number;
  items: ContentMeta[];
  accentColor: "amber" | "blue" | "violet";
}) {
  const { t } = useT();
  const seeAllColor = {
    amber:
      "text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300",
    blue: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300",
    violet:
      "text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300",
  }[accentColor];

  return (
    <section aria-labelledby={`section-${title}`} className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center shadow-sm`}
          >
            {icon}
          </div>
          <div>
            <h2
              className="text-lg font-black text-[#1d1d1f] dark:text-white"
              id={`section-${title}`}
              style={{ letterSpacing: "-0.02em" }}
            >
              {title}
            </h2>
          </div>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366] font-medium bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-full">
            {total}
          </span>
        </div>
        <Link
          className={`text-sm font-bold ${seeAllColor} transition-colors no-underline`}
          href={href}
        >
          {t("blog.viewAll")}
        </Link>
      </div>
      <div
        aria-label={title}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        role="list"
      >
        {items.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

const CATEGORY_STATS = [
  {
    labelKey: "blog.type.articles",
    href: "/blog/articulos",
    countKey: "article",
    gradient: "from-amber-400 to-orange-500",
    bg: "from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20",
    border: "border-amber-200 dark:border-amber-800/40",
    text: "text-amber-700 dark:text-amber-300",
    iconBg: "bg-amber-100 dark:bg-amber-950/50",
    iconColor: "text-amber-600 dark:text-amber-400",
    subKey: "blog.categoryArticlesDesc",
    icon: <IconArticle className="w-5 h-5" />,
  },
  {
    labelKey: "blog.type.tutorials",
    href: "/blog/tutoriales",
    countKey: "tutorial",
    gradient: "from-blue-400 to-cyan-500",
    bg: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/20",
    border: "border-blue-200 dark:border-blue-800/40",
    text: "text-blue-700 dark:text-blue-300",
    iconBg: "bg-blue-100 dark:bg-blue-950/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    subKey: "blog.categoryTutorialsDesc",
    icon: <IconTutorial className="w-5 h-5" />,
  },
  {
    labelKey: "blog.type.tools",
    href: "/blog/herramientas",
    countKey: "tool",
    gradient: "from-violet-400 to-purple-500",
    bg: "from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/20",
    border: "border-violet-200 dark:border-violet-800/40",
    text: "text-violet-700 dark:text-violet-300",
    iconBg: "bg-violet-100 dark:bg-violet-950/50",
    iconColor: "text-violet-600 dark:text-violet-400",
    subKey: "blog.categoryToolsDesc",
    icon: <IconTool className="w-5 h-5" />,
  },
];
