"use client";
import Link from "next/link";
import React, { useState, useMemo } from "react";

import { useT } from "@/hooks/useT";
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

import {
  AdminPageHeader,
  AdminPanel,
  AdminEmptyState,
  AdminFilterChip,
  AdminLoadingSkeleton,
} from "./AdminShell";
import { SearchInput } from "./AdminShared";

type Tab = "categories" | "levels" | "paths" | "relationships" | "tags";

const RELATION_LABEL: Record<RelationType, string> = {
  prerequisite: "Requisito previo",
  related: "Relacionado",
  next: "Siguiente paso",
  deepdive: "Profundiza",
};

const RELATION_ICON: Record<RelationType, string> = {
  prerequisite: "→",
  related: "↔",
  next: "▸",
  deepdive: "↓",
};

const RELATION_COLOR: Record<RelationType, string> = {
  prerequisite: "var(--color-warning)",
  related: "var(--color-info)",
  next: "var(--color-success)",
  deepdive: "var(--accent)",
};

// ── Categories View ─────────────────────────────────────────────────────────

function CategoriesView() {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState<string>("all");

  const contentCountByCategory: Record<string, number> = {};
  allContent.forEach((item) => {
    if (item.categoryId)
      contentCountByCategory[item.categoryId] =
        (contentCountByCategory[item.categoryId] ?? 0) + 1;
  });

  const maxCount = useMemo(
    () => Math.max(...Object.values(contentCountByCategory), 1),
    [contentCountByCategory],
  );

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

  const groupCounts = useMemo(() => {
    const counts: Record<string, number> = { all: CATEGORIES.length };
    CATEGORIES.forEach((c) => {
      counts[c.group] = (counts[c.group] ?? 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CATEGORY_GROUPS.slice(0, 4).map((g) => {
          const count = CATEGORIES.filter((c) => c.group === g.id).length;
          const contentCount = allContent.filter((c) => {
            const cat = CATEGORIES.find((ca) => ca.id === c.categoryId);
            return cat?.group === g.id;
          }).length;

          return (
            <button
              key={g.id}
              className={`text-left p-3 rounded-lg border transition-all ${
                activeGroup === g.id
                  ? "border-[var(--accent)] bg-[var(--accent-light)]"
                  : "border-[var(--border-default)] bg-[var(--bg-card)] hover:border-[var(--border-hover)]"
              }`}
              onClick={() => setActiveGroup(activeGroup === g.id ? "all" : g.id)}
            >
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                {g.label}
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-[var(--text-primary)]">
                  {count}
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">
                  cats · {contentCount} items
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <input
        className="ds-input max-w-sm"
        placeholder="Buscar categoría..."
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Categories table */}
      <AdminPanel compact>
        {filtered.length === 0 ? (
          <AdminEmptyState title="Sin resultados" />
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Categoría</th>
                  <th>Grupo</th>
                  <th>Distribución</th>
                  <th className="text-right">Contenido</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((cat) => {
                  const count = contentCountByCategory[cat.id] ?? 0;
                  const pct = (count / maxCount) * 100;

                  return (
                    <tr key={cat.id}>
                      <td>
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ background: `var(--color-${cat.id === "javascript" ? "warning" : cat.id === "react" || cat.id === "nextjs" ? "info" : "success"})` }}
                          />
                          <div>
                            <span className={`text-[12px] font-semibold ${cat.color}`}>
                              {cat.label}
                            </span>
                            <span className="text-[10px] text-[var(--text-muted)] font-mono ml-2">
                              {cat.id}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-[11px] text-[var(--text-secondary)]">
                          {CATEGORY_GROUPS.find((g) => g.id === cat.group)?.label ?? cat.group}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-[var(--bg-surface)] rounded-full overflow-hidden max-w-[120px]">
                            <div
                              className="h-full bg-[var(--accent)] rounded-full transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <span className="text-[12px] font-bold text-[var(--text-primary)] tabular-nums">
                          {count}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </AdminPanel>

      <p className="text-[11px] text-[var(--text-muted)]">
        {filtered.length} de {CATEGORIES.length} categorías · Definidas en{" "}
        <code className="font-mono bg-[var(--bg-surface)] px-1.5 py-0.5 rounded text-[10px]">
          lib/blog/taxonomy.ts
        </code>
      </p>
    </div>
  );
}

// ── Levels View ─────────────────────────────────────────────────────────────

function LevelsView() {
  const contentCountByLevel: Record<string, number> = {};
  allContent.forEach((item) => {
    if (item.level)
      contentCountByLevel[item.level] =
        (contentCountByLevel[item.level] ?? 0) + 1;
  });

  const unassigned = allContent.filter((c) => !c.level).length;
  const total = allContent.length;

  return (
    <div className="flex flex-col gap-4">
      {/* Level progression */}
      <div className="flex items-center gap-2 px-1">
        {LEVELS.map((lvl, i) => (
          <React.Fragment key={lvl.id}>
            <div
              className={`flex-1 p-3 rounded-lg border text-center transition-all ${
                i === 0
                  ? "border-[var(--color-success)]/30 bg-[var(--state-success-bg)]"
                  : i === 1
                    ? "border-[var(--color-warning)]/30 bg-[var(--state-warning-bg)]"
                    : "border-[var(--color-danger)]/30 bg-[var(--state-danger-bg)]"
              }`}
            >
              <div className={`text-[10px] font-semibold uppercase tracking-wider mb-1 ${
                i === 0 ? "text-[var(--state-success-fg)]" : i === 1 ? "text-[var(--state-warning-fg)]" : "text-[var(--state-danger-fg)]"
              }`}>
                {lvl.labelEs}
              </div>
              <div className="text-xl font-bold text-[var(--text-primary)]">
                {contentCountByLevel[lvl.id] ?? 0}
              </div>
              <div className="text-[10px] text-[var(--text-muted)]">
                contenidos
              </div>
            </div>
            {i < LEVELS.length - 1 && (
              <svg className="w-4 h-4 text-[var(--text-muted)] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" />
              </svg>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Unassigned warning */}
      {unassigned > 0 && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--state-warning-bg)] border border-[var(--state-warning-border)]">
          <svg className="w-4 h-4 text-[var(--state-warning-fg)] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
          <span className="text-[12px] text-[var(--state-warning-fg)]">
            {unassigned} contenidos sin nivel asignado de {total} totales
          </span>
        </div>
      )}
    </div>
  );
}

// ── Paths View ──────────────────────────────────────────────────────────────

function PathsView() {
  const contentCountByPath: Record<string, number> = {};
  allContent.forEach((item) => {
    item.learningPaths?.forEach((p) => {
      contentCountByPath[p] = (contentCountByPath[p] ?? 0) + 1;
    });
  });

  return (
    <div className="flex flex-col gap-4">
      {LEARNING_PATHS.map((path) => {
        const count = contentCountByPath[path.id] ?? 0;
        const steps = path.steps ?? [];

        return (
          <AdminPanel key={path.id}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--accent-light)] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[13px] font-semibold text-[var(--text-primary)]">
                    {path.title}
                  </h3>
                  <span className="admin-badge admin-badge-info">
                    {count} contenidos
                  </span>
                </div>
                <p className="text-[12px] text-[var(--text-muted)] mb-3">
                  {path.description}
                </p>

                {/* Steps as timeline */}
                {steps.length > 0 && (
                  <div className="relative">
                    <div className="absolute left-[11px] top-2 bottom-2 w-px bg-[var(--border-default)]" />
                    <div className="flex flex-col gap-2">
                      {steps.map((step, i) => (
                        <div key={step.categoryId} className="flex items-center gap-3 relative">
                          <div className="w-6 h-6 rounded-full bg-[var(--bg-card)] border-2 border-[var(--accent)] flex items-center justify-center shrink-0 z-10">
                            <span className="text-[9px] font-bold text-[var(--accent)]">
                              {i + 1}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[12px] font-medium text-[var(--text-primary)]">
                              {step.label}
                            </span>
                            <span className="text-[10px] text-[var(--text-muted)] font-mono">
                              {step.categoryId}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </AdminPanel>
        );
      })}
    </div>
  );
}

// ── Relationships View ──────────────────────────────────────────────────────

function RelationshipsView() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<RelationType | "all">("all");

  const filtered = CONTENT_RELATIONSHIPS.filter((r) => {
    if (typeFilter !== "all" && r.type !== typeFilter) return false;
    if (search && !r.fromSlug.includes(search) && !r.toSlug.includes(search))
      return false;
    return true;
  });

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: CONTENT_RELATIONSHIPS.length };
    CONTENT_RELATIONSHIPS.forEach((r) => {
      counts[r.type] = (counts[r.type] ?? 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* Type filter chips with counts */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <AdminFilterChip
          active={typeFilter === "all"}
          onClick={() => setTypeFilter("all")}
        >
          Todas ({typeCounts.all})
        </AdminFilterChip>
        {(["prerequisite", "related", "next", "deepdive"] as RelationType[]).map((t) => (
          <AdminFilterChip
            key={t}
            active={typeFilter === t}
            onClick={() => setTypeFilter(t)}
          >
            {RELATION_ICON[t]} {RELATION_LABEL[t]} ({typeCounts[t] ?? 0})
          </AdminFilterChip>
        ))}
      </div>

      {/* Search */}
      <input
        className="ds-input max-w-sm"
        placeholder="Filtrar por slug..."
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Relationships list */}
      <AdminPanel compact>
        {filtered.length === 0 ? (
          <AdminEmptyState
            title="Sin relaciones"
            description="No se encontraron relaciones con esos filtros."
          />
        ) : (
          <div className="divide-y divide-[var(--border-default)]">
            {filtered.map((rel, i) => {
              const fromContent = allContent.find((c) => c.slug === rel.fromSlug);
              const toContent = allContent.find((c) => c.slug === rel.toSlug);
              const color = RELATION_COLOR[rel.type];

              return (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--bg-hover)] transition-colors"
                >
                  {/* From */}
                  <div className="flex-1 min-w-0 text-right">
                    {fromContent ? (
                      <Link
                        className="text-[12px] font-medium text-[var(--accent)] hover:underline no-underline truncate block"
                        href={contentHref(fromContent.type, fromContent.slug)}
                      >
                        {fromContent.title}
                      </Link>
                    ) : (
                      <span className="text-[11px] font-mono text-[var(--text-muted)] truncate block">
                        {rel.fromSlug}
                      </span>
                    )}
                  </div>

                  {/* Arrow with type */}
                  <div className="flex flex-col items-center shrink-0 px-2">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: `${color}15`, color }}
                    >
                      {RELATION_LABEL[rel.type]}
                    </span>
                    <svg
                      className="w-4 h-4 mt-0.5"
                      style={{ color }}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* To */}
                  <div className="flex-1 min-w-0">
                    {toContent ? (
                      <Link
                        className="text-[12px] font-medium text-[var(--accent)] hover:underline no-underline truncate block"
                        href={contentHref(toContent.type, toContent.slug)}
                      >
                        {toContent.title}
                      </Link>
                    ) : (
                      <span className="text-[11px] font-mono text-[var(--text-muted)] truncate block">
                        {rel.toSlug}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </AdminPanel>

      <p className="text-[11px] text-[var(--text-muted)]">
        {filtered.length} de {CONTENT_RELATIONSHIPS.length} relaciones
      </p>
    </div>
  );
}

// ── Tags View ───────────────────────────────────────────────────────────────

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

  const maxTagCount = useMemo(
    () => Math.max(...Object.values(tagCounts), 1),
    [tagCounts],
  );

  const standardCount = STANDARD_TAGS.filter((t) => filtered.includes(t)).length;
  const customCount = filtered.filter(
    (t) => !(STANDARD_TAGS as readonly string[]).includes(t) && tagCounts[t] > 0,
  ).length;

  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <input
        className="ds-input max-w-sm"
        placeholder="Buscar tag..."
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Stats bar */}
      <div className="flex items-center gap-4 text-[11px]">
        <span className="text-[var(--text-muted)]">
          {filtered.length} tags
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
          <span className="text-[var(--text-secondary)]">{standardCount} estándar</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[var(--text-muted)]" />
          <span className="text-[var(--text-secondary)]">{customCount} personalizados</span>
        </span>
      </div>

      {/* Tag cloud */}
      <AdminPanel>
        <div className="flex flex-wrap gap-2">
          {filtered.map((tag) => {
            const count = tagCounts[tag] ?? 0;
            const isStandard = STANDARD_TAGS.includes(
              tag as (typeof STANDARD_TAGS)[number],
            );
            const scale = 0.8 + (count / maxTagCount) * 0.4;

            return (
              <div
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all hover:scale-105 cursor-default"
                style={{
                  borderColor: isStandard ? "var(--accent)" : "var(--border-default)",
                  background: isStandard ? "var(--accent-light)" : "var(--bg-card)",
                  transform: `scale(${scale})`,
                  transformOrigin: "center",
                }}
              >
                <span
                  className="font-medium"
                  style={{
                    fontSize: `${11 + (count / maxTagCount) * 3}px`,
                    color: isStandard ? "var(--accent)" : "var(--text-primary)",
                  }}
                >
                  {tag}
                </span>
                {count > 0 && (
                  <span
                    className="font-bold tabular-nums"
                    style={{
                      fontSize: `${10 + (count / maxTagCount) * 2}px`,
                      color: isStandard ? "var(--accent)" : "var(--text-muted)",
                    }}
                  >
                    {count}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </AdminPanel>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────

const allTagsCount = Array.from(
  new Set([...STANDARD_TAGS, ...allContent.flatMap((c) => c.tags ?? [])]),
).length;

export default function AdminTaxonomySection() {
  const { t } = useT();
  const [tab, setTab] = useState<Tab>("categories");

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "categories", label: t("admin.category"), count: CATEGORIES.length },
    { id: "levels", label: "Niveles", count: LEVELS.length },
    { id: "paths", label: "Rutas", count: LEARNING_PATHS.length },
    { id: "relationships", label: "Relaciones", count: CONTENT_RELATIONSHIPS.length },
    { id: "tags", label: "Tags", count: allTagsCount },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Taxonomía educativa"
        description="Categorías, niveles, rutas de aprendizaje, relaciones y tags del blog."
      />

      {/* Tabs */}
      <div className="admin-tabs mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`admin-tab ${tab === t.id ? "admin-tab-active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            <span>{t.label}</span>
            <span className="ml-1.5 text-[10px] opacity-60">{t.count}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "categories" && <CategoriesView />}
      {tab === "levels" && <LevelsView />}
      {tab === "paths" && <PathsView />}
      {tab === "relationships" && <RelationshipsView />}
      {tab === "tags" && <TagsView />}
    </div>
  );
}
