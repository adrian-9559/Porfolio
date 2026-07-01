"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Select, Label, ListBox } from "@heroui/react";

import BlogLayout from "@/layouts/blog";
import {
  getContentByType,
  getCategoriesByType,
  getTagsByType,
  formatDate,
  ContentMeta,
} from "@/lib/blog/registry";
import { LEVELS, getCategory } from "@/lib/blog/taxonomy";
import {
  IconTutorial,
  IconSearch,
  IconClose,
  FilterBar,
} from "@/components/blog/shared";
import { useT } from "@/hooks/useT";

const allTutorials = getContentByType("tutorial");

function TutorialCard({ item }: { item: ContentMeta }) {
  const { t } = useT();
  return (
    <Link
      className="block group p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-200 no-underline motion-safe:transition-all"
      href={`/blog/tutoriales/${item.slug}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          aria-hidden="true"
          className={`w-2 h-2 rounded-full flex-shrink-0 ${item.categoryColor}`}
        />
        <span className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b]">
          {item.category}
        </span>
        <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
          · {item.readTime}
        </span>
      </div>
      <h2 className="font-bold text-base text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug mb-2 line-clamp-2 motion-safe:transition-colors">
        {item.title}
      </h2>
      <p className="text-sm text-[#6e6e73] dark:text-[#86868b] leading-relaxed line-clamp-3 mb-4">
        {item.description}
      </p>
      {item.tags && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tags.map((tag) => (
            <span key={tag} className="tag-chip">
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between pt-3 border-t border-black/6 dark:border-white/6">
        <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
          {formatDate(item.publishedAt)}
        </span>
        <div className="flex items-center gap-2">
          {item.featured && (
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-1.5 py-0.5 rounded">
              {t("blog.featured")}
            </span>
          )}
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform motion-safe:transition-transform">
            {t("blog.startLink")}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function TutorialesPage() {
  const { t } = useT();
  const [query, setQuery] = useState("");
  const [activeLevel, setActiveLevel] = useState("all");
  const [activeSubcategory, setActiveSubcategory] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTag, setActiveTag] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const tutorialCats = useMemo(() => getCategoriesByType("tutorial"), []);
  const allTutorialTags = useMemo(() => getTagsByType("tutorial"), []);
  const tutorialTags = useMemo(
    () => allTutorialTags.slice(0, 12),
    [allTutorialTags],
  );
  const catMeta = useMemo(
    () =>
      tutorialCats
        .map((c) => getCategory(c))
        .filter((c): c is NonNullable<typeof c> => c != null),
    [tutorialCats],
  );
  const categoryOptions = useMemo(
    () => [
      { id: "all", labelKey: "blog.filterAllFeminine" },
      ...tutorialCats.map((c) => ({
        id: c,
        labelKey: getCategory(c)?.labelKey ?? c,
      })),
    ],
    [tutorialCats],
  );
  const levelOptions = useMemo(
    () => [
      { id: "all", labelKey: "blog.filterAll" },
      ...LEVELS.map((l) => ({ id: l.id, labelKey: l.labelKey })),
    ],
    [],
  );
  const tagOptions = useMemo(
    () => [
      { id: "all", labelKey: "blog.filterAll" },
      ...tutorialTags.map((t) => ({ id: t, labelKey: t })),
    ],
    [tutorialTags],
  );
  const subcategoryOptions = [
    { id: "all", labelKey: "blog.filterAll" },
    { id: "languages", labelKey: "blog.subcategory.languages" },
    { id: "frameworks", labelKey: "blog.subcategory.frameworks" },
    { id: "tools", labelKey: "blog.subcategory.tools" },
  ];

  const results = useMemo(() => {
    let items = allTutorials;

    if (activeLevel !== "all")
      items = items.filter((c) => c.level === activeLevel);
    if (activeSubcategory !== "all")
      items = items.filter((c) => c.subcategory === activeSubcategory);
    if (activeCategory !== "all")
      items = items.filter((c) => c.categoryId === activeCategory);
    if (activeTag !== "all")
      items = items.filter((c) =>
        c.tags?.some((t) => t.toLowerCase() === activeTag.toLowerCase()),
      );
    if (query.trim()) {
      const q = query.toLowerCase();

      items = items.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.tags?.some((t) => t.toLowerCase().includes(q)),
      );
    }

    return items.sort((a, b) => {
      if (sortBy === "newest")
        return b.publishedAt.localeCompare(a.publishedAt);
      if (sortBy === "oldest")
        return a.publishedAt.localeCompare(b.publishedAt);
      if (sortBy === "longest")
        return (b.estimatedMinutes ?? 0) - (a.estimatedMinutes ?? 0);
      if (sortBy === "shortest")
        return (a.estimatedMinutes ?? 0) - (b.estimatedMinutes ?? 0);

      return 0;
    });
  }, [
    query,
    activeLevel,
    activeSubcategory,
    activeCategory,
    activeTag,
    sortBy,
  ]);

  return (
    <BlogLayout
      seo={{
        title: t("meta.blogTutorials.title"),
        description: t("meta.blogTutorials.desc"),
      }}
    >
      <div className="space-y-10 py-4">
        {/* Header */}
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
            <span
              aria-current="page"
              className="text-xs font-medium text-[#1d1d1f] dark:text-white"
            >
              {t("blog.type.tutorials")}
            </span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <IconTutorial className="w-5 h-5" />
            </div>
            <div>
              <p className="section-label">{t("blog.badge")}</p>
              <h1
                className="text-3xl md:text-4xl font-bold"
                style={{ letterSpacing: "-0.03em" }}
              >
                {t("blog.type.tutorials")}
              </h1>
            </div>
          </div>
          <p className="text-[#6e6e73] dark:text-[#86868b] max-w-xl leading-relaxed">
            {t("blog.tutorialsDesc")}
          </p>
        </header>

        {/* Search */}
        <div className="relative max-w-xl" role="search">
          <label className="sr-only" htmlFor="tutorials-search">
            {t("blog.searchLabelTutorials")}
          </label>
          <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeaeb2]" />
          <input
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-[#111116] border border-black/10 dark:border-white/10 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] dark:placeholder-[#636366] focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-400/20 transition-all"
            id="tutorials-search"
            placeholder={t("blog.searchPlaceholderTutorials")}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              aria-label={t("blog.searchClear")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aeaeb2] hover:text-[#6e6e73]"
              onClick={() => setQuery("")}
            >
              <IconClose className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#aeaeb2] dark:text-[#636366]">
          <span className="font-semibold text-[#6e6e73] dark:text-[#86868b]">
            {allTutorials.length} {t("blog.type.tutorials").toLowerCase()}
          </span>
          <span
            aria-hidden="true"
            className="w-1 h-1 rounded-full bg-black/10 dark:bg-white/10"
          />
          <span>{catMeta.length} {t("blog.categoryLabel")}</span>
          <span
            aria-hidden="true"
            className="w-1 h-1 rounded-full bg-black/10 dark:bg-white/10"
          />
          <span>{allTutorialTags.length} {t("blog.tagLabel")}</span>
        </div>

        {/* Category quick-nav */}
        {activeCategory === "all" && !query && (
          <div
            aria-label={t("blog.categories")}
            className="flex flex-wrap gap-1.5"
            role="group"
          >
            {catMeta.map((cat) => (
              <button
                key={cat.id}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/4 dark:bg-white/8 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/8 dark:hover:bg-white/12 transition-colors"
                onClick={() => setActiveCategory(cat.id)}
              >
                {t(cat.labelKey)}
              </button>
            ))}
          </div>
        )}

        {/* Filters */}
        <FilterBar>
          <div className="flex flex-wrap items-start gap-3">
            <Select
              fullWidth
              className="flex-1 min-w-[120px]"
              placeholder={t("blog.filterType")}
              value={activeSubcategory}
              variant="primary"
              onChange={(v) => setActiveSubcategory(v as string)}
            >
              <Label>{t("blog.filterType")}</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {subcategoryOptions.map((o) => (
                    <ListBox.Item key={o.id} id={o.id} textValue={t(o.labelKey)}>
                      {t(o.labelKey)}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
            <Select
              fullWidth
              className="flex-1 min-w-[120px]"
              placeholder={t("blog.filterLevel")}
              value={activeLevel}
              variant="primary"
              onChange={(v) => setActiveLevel(v as string)}
            >
              <Label>{t("blog.filterLevel")}</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {levelOptions.map((o) => (
                    <ListBox.Item key={o.id} id={o.id} textValue={t(o.labelKey)}>
                      {t(o.labelKey)}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
            <Select
              fullWidth
              className="flex-1 min-w-[120px]"
              placeholder={t("blog.filterCategory")}
              value={activeCategory}
              variant="primary"
              onChange={(v) => setActiveCategory(v as string)}
            >
              <Label>{t("blog.filterCategory")}</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {categoryOptions.map((o) => (
                    <ListBox.Item key={o.id} id={o.id} textValue={t(o.labelKey)}>
                      {t(o.labelKey)}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
            <Select
              fullWidth
              className="flex-1 min-w-[120px]"
              placeholder={t("blog.filterTag")}
              value={activeTag}
              variant="primary"
              onChange={(v) => setActiveTag(v as string)}
            >
              <Label>{t("blog.filterTag")}</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {tagOptions.map((o) => (
                    <ListBox.Item key={o.id} id={o.id} textValue={t(o.labelKey)}>
                      {t(o.labelKey)}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
            <Select
              fullWidth
              className="flex-1 min-w-[100px]"
              placeholder={t("blog.filterOrder")}
              value={sortBy}
              variant="primary"
              onChange={(v) => setSortBy(v as string)}
            >
              <Label>{t("blog.filterOrder")}</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item key="newest" id="newest" textValue={t("blog.sortNewest")}>
                    {t("blog.sortNewest")}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item
                    key="oldest"
                    id="oldest"
                    textValue={t("blog.sortOldest")}
                  >
                    {t("blog.sortOldest")}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item
                    key="longest"
                    id="longest"
                    textValue={t("blog.sortLongest")}
                  >
                    {t("blog.sortLongest")}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item
                    key="shortest"
                    id="shortest"
                    textValue={t("blog.sortShortest")}
                  >
                    {t("blog.sortShortest")}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
            {(activeLevel !== "all" ||
              activeCategory !== "all" ||
              activeTag !== "all" ||
              activeSubcategory !== "all") && (
              <button
                aria-label={t("blog.clearFilters")}
                className="text-sm text-[#aeaeb2] dark:text-[#636366] hover:text-[#6e6e73] dark:hover:text-[#86868b] self-center"
                onClick={() => {
                  setActiveLevel("all");
                  setActiveCategory("all");
                  setActiveTag("all");
                  setActiveSubcategory("all");
                  setQuery("");
                }}
              >
                ✕
              </button>
            )}
          </div>
        </FilterBar>

        <p
          aria-live="polite"
          className="text-sm text-[#aeaeb2] dark:text-[#636366]"
          role="status"
        >
          {results.length} {results.length === 1 ? t("blog.tutorialSingular") : t("blog.tutorialPlural")}
          {query && (
            <span>
              {" "}
              {t("blog.forQuery")} &quot;<span className="text-[#6e6e73] dark:text-[#86868b] font-medium">{query}</span>&quot;
            </span>
          )}
        </p>

        {results.length === 0 ? (
          <div className="text-center py-20">
            <IconSearch className="w-12 h-12 text-[#aeaeb2] mx-auto mb-4" />
            <p className="text-[#6e6e73] dark:text-[#86868b] font-medium">
              {t("blog.noTutorialsFor")} &quot;{query}&quot;
            </p>
            <button
              className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline"
              onClick={() => setQuery("")}
            >
              {t("blog.clearSearch")}
            </button>
          </div>
        ) : (
          <div
            aria-label={t("blog.type.tutorials")}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            role="list"
          >
            {results.map((item) => (
              <TutorialCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </BlogLayout>
  );
}
