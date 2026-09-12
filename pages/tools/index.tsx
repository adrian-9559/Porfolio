"use client";
import { useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import DefaultLayout from "@/layouts/default";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useT } from "@/hooks/useT";
import { getContentByType } from "@/lib/blog/registry";
import { TOOL_GROUPS } from "@/lib/blog/toolGroups";

const allTools = getContentByType("tool");

const GROUP_ICONS: Record<string, React.ReactNode> = {
  colores: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  texto: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path d="M4 7V4h16v3M9 20h6M12 4v16" />
    </svg>
  ),
  datos: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  documentos: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  ),
  generadores: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
    </svg>
  ),
  sql: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  ),
  utilidades: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  ),
};

export default function ToolsPage() {
  const { t } = useT();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return allTools.filter((tool) => {
      const matchGroup =
        !selectedGroup ||
        TOOL_GROUPS.some(
          (g) => g.id === selectedGroup && g.toolIds.includes(tool.slug),
        );
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        tool.title.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q);

      return matchGroup && matchSearch;
    });
  }, [search, selectedGroup]);

  const activeGroup = selectedGroup
    ? TOOL_GROUPS.find((g) => g.id === selectedGroup)
    : null;

  return (
    <DefaultLayout>
      <Head>
        <title>{t("tools.pageTitle")} | Adrián Escribano</title>
        <meta content={t("tools.pageDesc")} name="description" />
        <meta content={t("tools.pageTitle")} property="og:title" />
        <meta content={t("tools.pageDesc")} property="og:description" />
      </Head>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center space-y-2">
            <p className="ds-section-label">{t("sections.tools.badge")}</p>
            <h1 className="text-3xl md:text-4xl font-black text-[var(--text-primary)]"
                style={{ letterSpacing: "-0.03em" }}>
              {t("tools.header")}
            </h1>
            <p className="max-w-xl mx-auto text-sm text-[var(--text-secondary)]">
              {t("tools.pageDesc")}
            </p>
          </div>
        </ScrollReveal>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              className="ds-input pl-9"
              placeholder={t("tools.searchPlaceholder")}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Group filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            className={`ds-tab ${!selectedGroup ? "ds-tab-active" : ""}`}
            onClick={() => setSelectedGroup(null)}
          >
            {t("tools.allGroups")}
          </button>
          {TOOL_GROUPS.map((group) => (
            <button
              key={group.id}
              className={`ds-tab ${selectedGroup === group.id ? "ds-tab-active" : ""}`}
              onClick={() => setSelectedGroup(group.id)}
            >
              {t(group.titleKey)}
            </button>
          ))}
        </div>

        {/* Active group info */}
        {activeGroup && (
          <div className="mb-6 p-4 rounded-xl bg-[var(--accent-light)] border border-[var(--border-default)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)] text-[var(--accent-text)] flex items-center justify-center">
                {GROUP_ICONS[activeGroup.id] || GROUP_ICONS["texto"]}
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                  {t(activeGroup.titleKey)}
                </h2>
                <p className="text-xs text-[var(--text-secondary)]">
                  {filtered.length} {t("tools.toolsCount")}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="ds-empty">
            <p className="text-[var(--text-muted)]">
              {t("tools.noResults", { search })}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((tool) => (
              <button
                key={tool.slug}
                className="ds-card ds-card-compact ds-card-interactive group text-left"
                onClick={() => router.push(`/tools/${tool.slug}`)}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-brand-from)] to-[var(--color-brand-via)] flex items-center justify-center text-white text-sm font-bold">
                    {tool.title[0]}
                  </div>
                  <span className="ds-badge ds-badge-accent">
                    {tool.category}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {tool.description}
                </p>
                <div className="mt-3 text-xs text-[var(--accent)] font-medium">
                  {t("tools.useTool")} →
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Git Repositories CTA */}
        <div className="mt-10 ds-card ds-card-compact flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface)] flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-[var(--text-secondary)]"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              {t("tools.gitManager")}
            </p>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              {t("tools.gitManagerDesc")}
            </p>
          </div>
          <Link
            className="ds-btn-primary !text-sm no-underline flex-shrink-0"
            href="/tools/git-repositories"
          >
            {t("tools.openBtn")}
          </Link>
        </div>
      </div>
    </DefaultLayout>
  );
}
