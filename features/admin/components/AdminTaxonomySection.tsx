"use client";
import Link from "next/link";
import React, { useState } from "react";

import { allContent, typeSlug } from "@/lib/blog/registry";
import {
  CATEGORIES,
  CATEGORY_GROUPS,
  CONTENT_RELATIONSHIPS,
  LEARNING_PATHS,
  LEVELS,
  STANDARD_TAGS,
  type RelationType,
} from "@/lib/blog/taxonomy";

type Tab = "categories" | "levels" | "paths" | "relationships" | "tags";

const RELATION_LABEL: Record<RelationType, string> = {
  prerequisite: "Requisito previo",
  related: "Relacionado",
  next: "Siguiente paso",
  deepdive: "Profundiza",
};

const RELATION_COLOR: Record<RelationType, string> = {
  prerequisite:
    "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30",
  related: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30",
  next: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30",
  deepdive:
    "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30",
};

const TAB_ICONS: Record<Tab, React.ReactElement> = {
  categories: (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 14 14"
    >
      <rect height="5" rx="1.5" width="5" x="1" y="1" />
      <rect height="5" rx="1.5" width="5" x="8" y="1" />
      <rect height="5" rx="1.5" width="5" x="1" y="8" />
      <rect height="5" rx="1.5" width="5" x="8" y="8" />
    </svg>
  ),
  levels: (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 14 14"
    >
      <path d="M2 11h2V7H2zM6 11h2V4H6zM10 11h2V1h-2z" />
    </svg>
  ),
  paths: (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 14 14"
    >
      <path d="M1 13L5 7l3 3 5-7" />
    </svg>
  ),
  relationships: (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 14 14"
    >
      <circle cx="3" cy="7" r="1.5" />
      <circle cx="11" cy="3" r="1.5" />
      <circle cx="11" cy="11" r="1.5" />
      <path d="M4.5 7l4-3.5M4.5 7l4 3.5" />
    </svg>
  ),
  tags: (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 14 14"
    >
      <path d="M1 8.5L5.5 13l7-7-4.5-4.5H2v3.5L1 8.5z" />
      <circle cx="4.5" cy="4.5" fill="currentColor" r="1" stroke="none" />
    </svg>
  ),
};

function TabBtn({
  id,
  label,
  count,
  active,
  onClick,
}: {
  id: Tab;
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
        active
          ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f]"
          : "text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"
      }`}
      onClick={onClick}
    >
      {TAB_ICONS[id]}
      <span className="hidden sm:inline">{label}</span>
      {count !== undefined && (
        <span
          className={`px-1.5 py-0.5 rounded-full tabular-nums text-[10px] ${active ? "bg-white/20 dark:bg-black/20" : "bg-black/8 dark:bg-white/8"}`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function CategoriesView() {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState<string>("all");

  const filtered = CATEGORIES.filter((c) => {
    if (activeGroup !== "all" && c.group !== activeGroup) return false;
    if (
      search &&
      !c.label.toLowerCase().includes(search.toLowerCase()) &&
      !c.id.includes(search.toLowerCase())
    )
      return false;

    return true;
  });

  const contentCountByCategory: Record<string, number> = {};

  allContent.forEach((item) => {
    if (item.categoryId)
      contentCountByCategory[item.categoryId] =
        (contentCountByCategory[item.categoryId] ?? 0) + 1;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <input
          className="flex-1 min-w-[180px] px-3 py-2 rounded-xl bg-white dark:bg-[#111116] border border-black/10 dark:border-white/10 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-400/20"
          placeholder="Buscar categoría..."
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${activeGroup === "all" ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f]" : "border border-black/10 dark:border-white/10 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5"}`}
            onClick={() => setActiveGroup("all")}
          >
            Todos
          </button>
          {CATEGORY_GROUPS.map((g) => (
            <button
              key={g.id}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${activeGroup === g.id ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f]" : "border border-black/10 dark:border-white/10 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5"}`}
              onClick={() => setActiveGroup(g.id)}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-black/8 dark:border-white/8 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02]">
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider">
                ID / Etiqueta
              </th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider">
                Grupo
              </th>
              <th className="text-right px-4 py-2.5 text-xs font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider">
                Contenido
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
            {filtered.map((cat) => (
              <tr
                key={cat.id}
                className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${cat.color.replace("text-", "bg-").split(" ")[0]}`}
                    />
                    <div>
                      <p className={`text-xs font-semibold ${cat.color}`}>
                        {cat.label}
                      </p>
                      <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366] font-mono">
                        {cat.id}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                    {CATEGORY_GROUPS.find((g) => g.id === cat.group)?.label ??
                      cat.group}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-xs font-semibold text-[#1d1d1f] dark:text-white">
                    {contentCountByCategory[cat.id] ?? 0}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-8 text-center text-sm text-[#6e6e73] dark:text-[#86868b]">
            Sin resultados.
          </div>
        )}
      </div>
      <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
        {filtered.length} de {CATEGORIES.length} categorías · Definidas en{" "}
        <code className="font-mono bg-black/5 dark:bg-white/5 px-1 rounded">
          lib/blog/taxonomy.ts
        </code>
      </p>
    </div>
  );
}

function LevelsView() {
  const contentCountByLevel: Record<string, number> = {};

  allContent.forEach((item) => {
    if (item.level)
      contentCountByLevel[item.level] =
        (contentCountByLevel[item.level] ?? 0) + 1;
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {LEVELS.map((lvl) => {
          const count = contentCountByLevel[lvl.id] ?? 0;

          return (
            <div
              key={lvl.id}
              className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-5 flex items-center gap-4"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${lvl.bgColor}`}
              >
                <span className={`text-sm font-bold ${lvl.color}`}>
                  {lvl.id[0].toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${lvl.color}`}>
                  {lvl.labelEs}
                </p>
                <p className="text-xs text-[#aeaeb2] dark:text-[#636366] font-mono">
                  {lvl.id}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-[#1d1d1f] dark:text-white">
                  {count}
                </p>
                <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">
                  contenidos
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
        {allContent.filter((c) => !c.level).length} contenidos sin nivel
        asignado de {allContent.length} totales.
      </p>
    </div>
  );
}

function PathsView() {
  const contentCountByPath: Record<string, number> = {};

  allContent.forEach((item) => {
    item.learningPaths?.forEach((p) => {
      contentCountByPath[p] = (contentCountByPath[p] ?? 0) + 1;
    });
  });

  return (
    <div className="space-y-3">
      {LEARNING_PATHS.map((path) => {
        const count = contentCountByPath[path.id] ?? 0;
        const steps = path.steps ?? [];

        return (
          <div
            key={path.id}
            className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] overflow-hidden"
          >
            <div className="flex items-center gap-4 px-5 py-4">
              <span className="text-2xl">{path.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
                  {path.title}
                </p>
                <p className="text-xs text-[#6e6e73] dark:text-[#86868b] truncate">
                  {path.description}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-lg font-bold text-[#1d1d1f] dark:text-white">
                  {count}
                </p>
                <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">
                  contenidos
                </p>
              </div>
            </div>
            {steps.length > 0 && (
              <div className="border-t border-black/8 dark:border-white/8 px-5 py-3">
                <p className="text-[10px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider mb-2">
                  Pasos ({steps.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {steps.map((step, i) => (
                    <span
                      key={step.categoryId}
                      className="px-2 py-0.5 rounded-full text-[10px] bg-black/5 dark:bg-white/5 text-[#6e6e73] dark:text-[#86868b]"
                    >
                      {i + 1}. {step.label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function RelationshipsView() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<RelationType | "all">("all");

  const filtered = CONTENT_RELATIONSHIPS.filter((r) => {
    if (typeFilter !== "all" && r.type !== typeFilter) return false;
    if (search && !r.fromSlug.includes(search) && !r.toSlug.includes(search))
      return false;

    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <input
          className="flex-1 min-w-[180px] px-3 py-2 rounded-xl bg-white dark:bg-[#111116] border border-black/10 dark:border-white/10 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-400/20"
          placeholder="Filtrar por slug..."
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex items-center gap-1.5">
          <button
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${typeFilter === "all" ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f]" : "border border-black/10 dark:border-white/10 text-[#6e6e73]"}`}
            onClick={() => setTypeFilter("all")}
          >
            Todos
          </button>
          {(
            ["prerequisite", "related", "next", "deepdive"] as RelationType[]
          ).map((t) => (
            <button
              key={t}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${typeFilter === t ? `${RELATION_COLOR[t]}` : "border border-black/10 dark:border-white/10 text-[#6e6e73] dark:text-[#86868b]"}`}
              onClick={() => setTypeFilter(t)}
            >
              {RELATION_LABEL[t]}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-black/8 dark:border-white/8 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02]">
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#aeaeb2] uppercase tracking-wider">
                Desde
              </th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#aeaeb2] uppercase tracking-wider">
                Tipo
              </th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#aeaeb2] uppercase tracking-wider">
                Hacia
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
            {filtered.map((rel, i) => {
              const fromContent = allContent.find(
                (c) => c.slug === rel.fromSlug,
              );
              const toContent = allContent.find((c) => c.slug === rel.toSlug);

              return (
                <tr
                  key={i}
                  className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3">
                    {fromContent ? (
                      <Link
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline no-underline"
                        href={`/blog/${typeSlug(fromContent.type)}/${fromContent.slug}`}
                      >
                        {fromContent.title}
                      </Link>
                    ) : (
                      <span className="text-xs font-mono text-[#aeaeb2]">
                        {rel.fromSlug}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${RELATION_COLOR[rel.type]}`}
                    >
                      {RELATION_LABEL[rel.type]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {toContent ? (
                      <Link
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline no-underline"
                        href={`/blog/${typeSlug(toContent.type)}/${toContent.slug}`}
                      >
                        {toContent.title}
                      </Link>
                    ) : (
                      <span className="text-xs font-mono text-[#aeaeb2]">
                        {rel.toSlug}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-8 text-center text-sm text-[#6e6e73] dark:text-[#86868b]">
            Sin relaciones con esos filtros.
          </div>
        )}
      </div>
      <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
        {filtered.length} de {CONTENT_RELATIONSHIPS.length} relaciones
      </p>
    </div>
  );
}

function TagsView() {
  const [search, setSearch] = useState("");

  const tagCounts: Record<string, number> = {};

  allContent.forEach((item) => {
    item.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] ?? 0) + 1;
    });
  });

  const allTags = Array.from(
    new Set([...STANDARD_TAGS, ...Object.keys(tagCounts)]),
  ).sort();
  const filtered = allTags.filter(
    (t) => !search || t.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <input
        className="w-full max-w-sm px-3 py-2 rounded-xl bg-white dark:bg-[#111116] border border-black/10 dark:border-white/10 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-400/20"
        placeholder="Buscar tag..."
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        {filtered.map((tag) => {
          const count = tagCounts[tag] ?? 0;
          const isStandard = STANDARD_TAGS.includes(
            tag as (typeof STANDARD_TAGS)[number],
          );

          return (
            <div
              key={tag}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-colors ${
                isStandard
                  ? "border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300"
                  : "border-black/10 dark:border-white/10 bg-white dark:bg-[#111116] text-[#6e6e73] dark:text-[#86868b]"
              }`}
            >
              <span className="font-medium">{tag}</span>
              {count > 0 && (
                <span
                  className={`font-bold ${isStandard ? "text-blue-500" : "text-[#aeaeb2]"}`}
                >
                  {count}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
        {filtered.length} tags ·{" "}
        <span className="text-blue-600 dark:text-blue-400">
          {STANDARD_TAGS.filter((t) => filtered.includes(t)).length} estándar
        </span>{" "}
        ·{" "}
        {
          filtered.filter(
            (t) =>
              !(STANDARD_TAGS as readonly string[]).includes(t) &&
              tagCounts[t] > 0,
          ).length
        }{" "}
        personalizados
      </p>
    </div>
  );
}

const allTagsCount = Array.from(
  new Set([...STANDARD_TAGS, ...allContent.flatMap((c) => c.tags ?? [])]),
).length;

export default function AdminTaxonomySection() {
  const [tab, setTab] = useState<Tab>("categories");

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "categories", label: "Categorías", count: CATEGORIES.length },
    { id: "levels", label: "Niveles", count: LEVELS.length },
    { id: "paths", label: "Rutas", count: LEARNING_PATHS.length },
    {
      id: "relationships",
      label: "Relaciones",
      count: CONTENT_RELATIONSHIPS.length,
    },
    { id: "tags", label: "Tags", count: allTagsCount },
  ];

  const stats = [
    {
      label: "Contenidos",
      value: allContent.length,
      icon: "📄",
      color: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
    },
    {
      label: "Categorías",
      value: CATEGORIES.length,
      icon: "🏷️",
      color:
        "bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400",
    },
    {
      label: "Rutas",
      value: LEARNING_PATHS.length,
      icon: "🗺️",
      color:
        "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Relaciones",
      value: CONTENT_RELATIONSHIPS.length,
      icon: "🔗",
      color:
        "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400",
    },
    {
      label: "Tags",
      value: allTagsCount,
      icon: "🔖",
      color: "bg-pink-50 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white">
          Taxonomía educativa
        </h2>
        <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-0.5">
          Categorías, niveles, rutas de aprendizaje, relaciones y tags del blog.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-4 flex items-center gap-3"
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 ${s.color}`}
            >
              {s.icon}
            </div>
            <div>
              <p className="text-xl font-bold text-[#1d1d1f] dark:text-white leading-tight">
                {s.value}
              </p>
              <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1 p-1.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 w-fit">
        {tabs.map((t) => (
          <TabBtn
            key={t.id}
            active={tab === t.id}
            count={t.count}
            id={t.id}
            label={t.label}
            onClick={() => setTab(t.id)}
          />
        ))}
      </div>

      {tab === "categories" && <CategoriesView />}
      {tab === "levels" && <LevelsView />}
      {tab === "paths" && <PathsView />}
      {tab === "relationships" && <RelationshipsView />}
      {tab === "tags" && <TagsView />}
    </div>
  );
}
