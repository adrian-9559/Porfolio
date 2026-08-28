"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import CampusLayout from "@/layouts/campus";
import {
  getContentByType,
  getGuides,
  getCategoriesByType,
  guideTotalMinutes,
  ContentMeta,
} from "@/lib/blog/registry";
import { LEVELS, getCategory } from "@/lib/blog/taxonomy";
import {
  IconGraduation,
  IconSearch,
  IconClose,
  IconBook,
  IconClock,
} from "@/components/blog/shared";
import { useT } from "@/hooks/useT";
import { useAuth } from "@/hooks/useAuth";
import { campusService } from "@/services/campusService";
import { Leaderboard } from "@/components/campus/Leaderboard";
import { BadgeGrid } from "@/components/campus/BadgeGrid";
import { StreakCalendar } from "@/components/campus/StreakCalendar";
import { XpBadge } from "@/components/campus/XpBadge";
import { ProgressBar } from "@/components/campus/ProgressBar";
import type { CampusProgress, CampusUserXP } from "@/types/campus";

const allTutorials = getContentByType("tutorial");
const allGuides = getGuides();
const featuredGuides = allGuides.filter((g) => g.featured).slice(0, 6);

// ── Tutorial card ─────────────────────────────────────────────────────────────

function TutorialCard({ item, completed }: { item: ContentMeta; completed: boolean }) {
  return (
    <Link className="group block no-underline" href={`/campus/tutoriales/${item.slug}`}>
      <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
        completed
          ? "bg-emerald-500/5 border-emerald-300/30 dark:border-emerald-700/30"
          : "bg-white dark:bg-[#111116] border-black/8 dark:border-white/8 hover:border-emerald-300/60 dark:hover:border-emerald-700/60 hover:shadow-md"
      }`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
          completed
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : "bg-black/5 dark:bg-white/8 text-[#aeaeb2] dark:text-[#636366]"
        }`}>
          {completed ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <IconBook className="w-4 h-4" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.categoryColor}`} />
            <span className="text-[10px] font-semibold text-[#aeaeb2] dark:text-[#636366]">{item.category}</span>
            <span className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">·</span>
            <span className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">{item.readTime}</span>
          </div>
          <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
            {item.title}
          </h3>
        </div>
        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0">
          →
        </span>
      </div>
    </Link>
  );
}

// ── Guide card ────────────────────────────────────────────────────────────────

function GuideCard({ guide, progress }: { guide: (typeof allGuides)[number]; progress: number }) {
  const { t } = useT();
  const totalMin = guideTotalMinutes(guide);
  const count = guide.curriculum.length;
  const level = LEVELS.find((l) => l.id === guide.level);

  return (
    <Link className="group block no-underline" href={`/campus/guias/${guide.slug}`}>
      <div className="p-5 rounded-xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-emerald-300/60 dark:hover:border-emerald-700/60 hover:shadow-md transition-all duration-200">
        <div className="flex items-center gap-2 mb-2">
          <span className={`w-2 h-2 rounded-full ${guide.categoryColor}`} />
          <span className="text-[10px] font-semibold text-[#aeaeb2] dark:text-[#636366]">{guide.category}</span>
          {level && (
            <>
              <span className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">·</span>
              <span className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">{t(level.labelKey)}</span>
            </>
          )}
        </div>
        <h3 className="text-sm font-bold text-[#1d1d1f] dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
          {guide.title}
        </h3>
        <p className="text-xs text-[#6e6e73] dark:text-[#86868b] line-clamp-2 mb-3">{guide.description}</p>
        <ProgressBar completed={progress} total={count} />
        <div className="flex items-center gap-3 mt-2">
          <span className="flex items-center gap-1 text-[10px] text-[#aeaeb2] dark:text-[#636366]">
            <IconBook className="w-2.5 h-2.5" /> {count}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-[#aeaeb2] dark:text-[#636366]">
            <IconClock className="w-2.5 h-2.5" /> ~{totalMin}m
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Continue Learning ─────────────────────────────────────────────────────────

function ContinueLearning({ progress, guides }: { progress: CampusProgress[]; guides: typeof allGuides }) {
  const { t } = useT();

  const inProgress = useMemo(() => {
    const completedSlugs = new Set(progress.map((p) => p.tutorial_slug));
    return guides
      .map((guide) => {
        const total = guide.curriculum.length;
        const completed = guide.curriculum.filter((s) => completedSlugs.has(s.slug)).length;
        return { guide, total, completed, pct: total > 0 ? Math.round((completed / total) * 100) : 0 };
      })
      .filter((g) => g.completed > 0 && g.pct < 100)
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 3);
  }, [progress, guides]);

  if (inProgress.length === 0) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <h2 className="text-[10px] font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-widest">
          {t("campus.continueLearning")}
        </h2>
        <span className="flex-1 h-px bg-black/8 dark:bg-white/8" />
      </div>
      <div className="space-y-2">
        {inProgress.map(({ guide, total, completed, pct }) => (
          <Link
            key={guide.id}
            className="group flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-emerald-300/60 dark:hover:border-emerald-700/60 hover:shadow-md transition-all no-underline"
            href={`/campus/guias/${guide.slug}`}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{pct}%</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                {guide.title}
              </h3>
              <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">
                {completed}/{total} {t("blog.tutorialPlural").toLowerCase()}
              </p>
            </div>
            <ProgressBar completed={completed} total={total} />
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0">
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function CampusPage() {
  const { t } = useT();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeLevel, setActiveLevel] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState<"guides" | "tutorials" | "ranking" | "achievements">(
    (router.query.tab as "guides" | "tutorials" | "ranking" | "achievements") || "guides"
  );
  const [progress, setProgress] = useState<CampusProgress[]>([]);
  const [xp, setXp] = useState<CampusUserXP | null>(null);
  const [guideProgress, setGuideProgress] = useState<Record<string, number>>({});

  const tutorialCats = useMemo(() => getCategoriesByType("tutorial"), []);
  const catMeta = useMemo(
    () => tutorialCats.map((c) => getCategory(c)).filter((c): c is NonNullable<typeof c> => c != null),
    [tutorialCats],
  );

  const completedSlugs = useMemo(() => new Set(progress.map((p) => p.tutorial_slug)), [progress]);

  const totalCompleted = completedSlugs.size;
  const totalTutorials = allTutorials.length;

  useEffect(() => {
    if (!isAuthenticated) return;
    campusService.getProgress().then(setProgress).catch(() => {});
    campusService.getXP().then(setXp).catch(() => {});
    campusService.getAllGuideProgress().then(setGuideProgress).catch(() => {});
  }, [isAuthenticated]);

  const handleTabChange = (tab: "guides" | "tutorials" | "ranking" | "achievements") => {
    setActiveTab(tab);
    router.replace({ query: { ...router.query, tab } }, undefined, { shallow: true });
  };

  const levelOptions = useMemo(
    () => [{ id: "all", labelKey: "blog.filterAll" }, ...LEVELS.map((l) => ({ id: l.id, labelKey: l.labelKey }))],
    [],
  );

  const results = useMemo(() => {
    let items = allTutorials;
    if (activeLevel !== "all") items = items.filter((c) => c.level === activeLevel);
    if (activeCategory !== "all") items = items.filter((c) => c.categoryId === activeCategory);
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
    return items.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }, [query, activeLevel, activeCategory]);

  const tabs = [
    { id: "guides" as const, label: t("campus.tabs.guides") },
    { id: "tutorials" as const, label: t("campus.tabs.tutorials") },
    { id: "ranking" as const, label: t("campus.tabs.ranking") },
    { id: "achievements" as const, label: t("campus.tabs.achievements") },
  ];

  return (
    <CampusLayout
      seo={{
        title: t("meta.campus.title"),
        description: t("meta.campus.desc"),
      }}
    >
      <div className="space-y-6 py-4">
        {/* Hero */}
        <header className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <IconGraduation className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.03em" }}>
                Campus
              </h1>
              <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">{t("campus.heroDesc")}</p>
            </div>
          </div>

          {/* XP + Streak + Progress (if authenticated) */}
          {isAuthenticated && (
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <XpBadge xp={xp?.total_xp ?? 0} level={xp?.level ?? 1} />
                <StreakCalendar />
              </div>
              {totalCompleted > 0 && (
                <div className="flex items-center gap-3">
                  <ProgressBar completed={totalCompleted} total={totalTutorials} />
                  <span className="text-[10px] text-[#aeaeb2] dark:text-[#636366] whitespace-nowrap">
                    {totalCompleted}/{totalTutorials}
                  </span>
                </div>
              )}
            </div>
          )}
        </header>

        {/* Tabs */}
        <div className="flex gap-0.5 p-0.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-emerald-500 text-white shadow-md"
                  : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
              }`}
              onClick={() => handleTabChange(tab.id)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "guides" && (
          <div className="space-y-6">
            {/* Continue Learning */}
            {isAuthenticated && <ContinueLearning progress={progress} guides={allGuides} />}

            {/* Featured Guides */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-[10px] font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-widest">
                    {t("campus.section.guides")}
                  </h2>
                  <span className="flex-1 h-px bg-black/8 dark:bg-white/8" />
                </div>
                <Link
                  className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                  href="/campus/guias"
                >
                  {t("campus.section.allGuides")} →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {featuredGuides.map((guide) => (
                  <GuideCard key={guide.id} guide={guide} progress={guideProgress[guide.slug] ?? 0} />
                ))}
              </div>
            </section>

            {/* Quick Stats */}
            <div className="flex gap-4 text-center">
              <div className="flex-1 p-3 rounded-xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8">
                <p className="text-lg font-black text-[#1d1d1f] dark:text-white">{allGuides.length}</p>
                <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366] font-semibold">{t("campus.stats.guides")}</p>
              </div>
              <div className="flex-1 p-3 rounded-xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8">
                <p className="text-lg font-black text-[#1d1d1f] dark:text-white">{allTutorials.length}</p>
                <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366] font-semibold">{t("campus.stats.tutorials")}</p>
              </div>
              <div className="flex-1 p-3 rounded-xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8">
                <p className="text-lg font-black text-[#1d1d1f] dark:text-white">{tutorialCats.length}</p>
                <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366] font-semibold">{t("campus.stats.categories")}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tutorials" && (
          <section className="space-y-4">
            {/* Search */}
            <div className="relative max-w-xl" role="search">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeaeb2]" />
              <input
                className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-white dark:bg-[#111116] border border-black/10 dark:border-white/10 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] dark:placeholder-[#636366] focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                placeholder={t("blog.searchPlaceholderTutorials")}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aeaeb2] hover:text-[#6e6e73] transition-colors"
                  onClick={() => setQuery("")}
                >
                  <IconClose className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex gap-0.5 p-0.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8">
                {levelOptions.map((opt) => (
                  <button
                    key={opt.id}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all duration-200 whitespace-nowrap ${
                      activeLevel === opt.id
                        ? "bg-emerald-500 text-white shadow-md"
                        : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
                    }`}
                    onClick={() => setActiveLevel(opt.id)}
                    type="button"
                  >
                    {t(opt.labelKey)}
                  </button>
                ))}
              </div>
              <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                {catMeta.map((cat) => (
                  <button
                    key={cat.id}
                    className={`px-2 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap transition-all ${
                      activeCategory === cat.id
                        ? "bg-emerald-500 text-white"
                        : "bg-black/5 dark:bg-white/8 text-[#6e6e73] dark:text-[#86868b]"
                    }`}
                    onClick={() => setActiveCategory(activeCategory === cat.id ? "all" : cat.id)}
                    type="button"
                  >
                    {t(cat.labelKey)}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">
              {results.length} {results.length === 1 ? t("blog.tutorialSingular") : t("blog.tutorialPlural")}
            </p>

            {/* Tutorial list */}
            <div className="space-y-1.5">
              {results.map((item) => (
                <TutorialCard key={item.id} item={item} completed={completedSlugs.has(item.slug)} />
              ))}
            </div>

            {results.length === 0 && (
              <div className="text-center py-12">
                <IconGraduation className="w-8 h-8 text-[#aeaeb2] mx-auto mb-2" />
                <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">{t("campus.empty")}</p>
              </div>
            )}
          </section>
        )}

        {activeTab === "ranking" && <Leaderboard />}
        {activeTab === "achievements" && <BadgeGrid />}
      </div>
    </CampusLayout>
  );
}
