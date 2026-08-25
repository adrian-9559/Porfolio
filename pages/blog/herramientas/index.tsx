"use client";
import { useMemo } from "react";
import Link from "next/link";

import DefaultLayout from "@/layouts/default";
import { getContentByType } from "@/lib/blog/registry";
import { TOOL_GROUPS } from "@/lib/blog/toolGroups";
import { useT } from "@/hooks/useT";

const allTools = getContentByType("tool");

const GROUP_ICONS: Record<string, React.ReactNode> = {
  colores: (
    <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2 0-.51-.2-.98-.54-1.34-.33-.35-.53-.82-.53-1.32 0-1.1.9-2 2-2h2.36c3.08 0 5.64-2.56 5.64-5.72C22.93 5.68 18.17 2 12 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <circle cx="7.5" cy="11.5" fill="currentColor" r="1.5" />
      <circle cx="10.5" cy="7.5" fill="currentColor" r="1.5" />
      <circle cx="15.5" cy="7.5" fill="currentColor" r="1.5" />
      <circle cx="18" cy="11.5" fill="currentColor" r="1.5" />
    </svg>
  ),
  texto: (
    <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M4 7V4h16v3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <path d="M9 20h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <path d="M12 4v16" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  ),
  datos: (
    <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <path d="M12 22V11" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <path d="M20 6.5L12 11 4 6.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  ),
  documentos: (
    <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  ),
  generadores: (
    <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M8 9l-3 3 3 3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <path d="M16 9l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <path d="M14 4l-4 16" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  ),
  sql: (
    <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M4 17l6-5-6-5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <path d="M12 19h8" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  ),
  utilidades: (
    <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  ),
};

export default function HerramientasPage() {
  const { t } = useT();

  const groupsWithCount = useMemo(
    () =>
      TOOL_GROUPS.map((group) => ({
        ...group,
        count: group.toolIds.length,
      })),
    [],
  );

  return (
    <DefaultLayout
      seo={{
        title: t("meta.blogTools.title"),
        description: t("meta.blogTools.desc"),
      }}
    >
      <div className="space-y-8 py-4">
        {/* Header */}
        <header className="space-y-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link
              className="text-xs text-muted/60 hover:text-muted transition-colors no-underline"
              href="/blog"
            >
              {t("blog.breadcrumb")}
            </Link>
            <span aria-hidden="true" className="text-xs text-muted/60">/</span>
            <span
              aria-current="page"
              className="text-xs font-medium text-foreground"
            >
              {t("blog.type.tools")}
            </span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-violet-50 dark:bg-violet-950/30 flex items-center justify-center text-violet-600 dark:text-violet-400">
              <svg
                aria-hidden="true"
                className="w-5.5 h-5.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <div>
              <p className="section-label">{t("blog.badge")}</p>
              <h1
                className="text-3xl md:text-4xl font-bold"
                style={{ letterSpacing: "-0.03em" }}
              >
                {t("blog.type.tools")}
              </h1>
            </div>
          </div>
          <p className="text-muted max-w-xl leading-relaxed">
            {t("blog.toolsDesc")}
          </p>
        </header>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-muted/60">
          <span className="font-semibold text-muted">
            {allTools.length} {t("blog.type.tools").toLowerCase()}
          </span>
          <span
            aria-hidden="true"
            className="w-1 h-1 rounded-full bg-default"
          />
          <span>
            {groupsWithCount.length} {t("blog.categoryLabel")}
          </span>
        </div>

        {/* Group cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groupsWithCount.map((group) => (
            <Link
              key={group.id}
              className={`group flex flex-col gap-4 p-6 rounded-2xl bg-surface border border-border ${group.hoverBorder} hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-200 no-underline`}
              href={`/blog/herramientas/${group.slug}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${group.color} ${group.text} group-hover:scale-105 transition-transform duration-200`}
                >
                  {GROUP_ICONS[group.id] ?? <span className="text-xl font-bold">•</span>}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                    {t(group.titleKey)}
                  </h2>
                  <span className="text-xs text-muted/60">
                    {group.count}{" "}
                    {group.count === 1 ? t("blog.toolSingular") : t("blog.toolPlural")}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted leading-relaxed">
                {t(group.descriptionKey)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}
