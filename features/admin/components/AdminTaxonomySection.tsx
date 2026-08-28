"use client";
import Link from "next/link";
import React, { useState } from "react";

import { allContent, contentHref } from "@/lib/blog/registry";
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
  prerequisite: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30",
  related: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30",
  next: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30",
  deepdive: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30",
};

const TAB_ICONS: Record<Tab, React.ReactElement> = {
  categories: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 14 14">
      <rect height="5" rx="1.5" width="5" x="1" y="1" />
      <rect height="5" rx="1.5" width="5" x="8" y="1" />
      <rect height="5" rx="1.5" width="5" x="1" y="8" />
      <rect height="5" rx="1.5" width="5" x="8" y="8" />
    </svg>
  ),
  levels: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 14 14">
      <path d="M2 11h2V7H2zM6 11h2V4H6zM10 11h2V1h-2z" />
    </svg>
  ),
  paths: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 14 14">
      <path d="M1 13L5 7l3 3 5-7" />
    </svg>
  ),
  relationships: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 14 14">
      <circle cx="3" cy="7" r="1.5" />
      <circle cx="11" cy="3" r="1.5" />
      <circle cx="11" cy="11" r="1.5" />
      <path d="M4.5 7l4-3.5M4.5 7l4 3.5" />
    </svg>
  ),
  tags: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 14 14">
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
      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
        active
          ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] shadow-md"
          : "text-[#6e6e73] dark:text-[#86868b] bg-black/5 dark:bg-white/5 hover:text-[#1d1d1f] dark:hover:text-white"
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
        <div className="relative flex-1 min-w-[180px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeaeb2] dark:text-[#636366]" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
            placeholder="Buscar categoría..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${activeGroup === "all" ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] shadow-md" : "bg-black/5 dark:bg-white/5 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/10"}`}
            onClick={() => setActiveGroup("all")}
          >
            Todos
          </button>
          {CATEGORY_GROUPS.map((g) => (
            <button
              key={g.id}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${activeGroup === g.id ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] shadow-md" : "bg-black/5 dark:bg-white/5 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/10"}`}
              onClick={() => setActiveGroup(g.id)}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
        <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
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
              className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20"
            >
              <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
              <div className="p-5 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${lvl.bgColor}`}>
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
            className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20"
          >
            <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-md">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </div>
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
        <div className="relative flex-1 min-w-[180px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeaeb2] dark:text-[#636366]" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
            placeholder="Filtrar por slug..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1.5">
          <button
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${typeFilter === "all" ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] shadow-md" : "bg-black/5 dark:bg-white/5 text-[#6e6e73] dark:text-[#86868b]"}`}
            onClick={() => setTypeFilter("all")}
          >
            Todos
          </button>
          {(
            ["prerequisite", "related", "next", "deepdive"] as RelationType[]
          ).map((t) => (
            <button
              key={t}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${typeFilter === t ? `${RELATION_COLOR[t]} shadow-md` : "bg-black/5 dark:bg-white/5 text-[#6e6e73] dark:text-[#86868b]"}`}
              onClick={() => setTypeFilter(t)}
            >
              {RELATION_LABEL[t]}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
        <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
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
                        href={contentHref(fromContent.type, fromContent.slug)}
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
                        href={contentHref(toContent.type, toContent.slug)}
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
      <div className="relative max-w-sm">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeaeb2] dark:text-[#636366]" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <input
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
          placeholder="Buscar tag..."
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {filtered.map((tag) => {
          const count = tagCounts[tag] ?? 0;
          const isStandard = STANDARD_TAGS.includes(
            tag as (typeof STANDARD_TAGS)[number],
          );

          return (
            <div
              key={tag}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all ${
                isStandard
                  ? "border-emerald-200 dark:border-emerald-800/50 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300"
                  : "border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] text-[#6e6e73] dark:text-[#86868b]"
              }`}
            >
              <span className="font-medium">{tag}</span>
              {count > 0 && (
                <span
                  className={`font-bold ${isStandard ? "text-emerald-500" : "text-[#aeaeb2]"}`}
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
        <span className="text-emerald-600 dark:text-emerald-400">
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
    { id: "relationships", label: "Relaciones", count: CONTENT_RELATIONSHIPS.length },
    { id: "tags", label: "Tags", count: allTagsCount },
  ];

  const stats = [
    {
      label: "Contenidos",
      value: allContent.length,
      gradient: "from-emerald-500 to-teal-500",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
      ),
    },
    {
      label: "Categorías",
      value: CATEGORIES.length,
      gradient: "from-teal-500 to-cyan-500",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
      ),
    },
    {
      label: "Rutas",
      value: LEARNING_PATHS.length,
      gradient: "from-green-500 to-emerald-500",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
      ),
    },
    {
      label: "Relaciones",
      value: CONTENT_RELATIONSHIPS.length,
      gradient: "from-emerald-500 to-green-500",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
      ),
    },
    {
      label: "Tags",
      value: allTagsCount,
      gradient: "from-teal-500 to-emerald-500",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
      ),
    },
  ];

  return (
    <div className="relative flex flex-col gap-6">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-emerald-500/8 to-teal-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-40 -left-20 w-56 h-56 rounded-full bg-gradient-to-br from-teal-500/6 to-emerald-500/4 blur-3xl pointer-events-none" />

      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1">Contenido</p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.03em" }}>
          Taxonomía educativa
        </h1>
        <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1">
          Categorías, niveles, rutas de aprendizaje, relaciones y tags del blog.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20"
          >
            <div className={`h-1 bg-gradient-to-r ${s.gradient}`} />
            <div className="p-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white shadow-md shrink-0`}>
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
          </div>
        ))}
      </div>

      {/* Tabs */}
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
