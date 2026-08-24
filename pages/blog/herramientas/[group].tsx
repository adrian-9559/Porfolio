"use client";
import { useState, useMemo } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import DefaultLayout from "@/layouts/default";
import BlogLayout from "@/layouts/blog";
import {
  getContentByType,
  formatDate,
  contentHref,
  ContentMeta,
} from "@/lib/blog/registry";
import { getContentComponent } from "@/lib/blog/componentMap";
import {
  TaxonomyMetaStrip,
  ObjectivesBlock,
  RelatedContentBlock,
} from "@/components/blog/TaxonomyMeta";
import { TOOL_GROUPS, getToolGroupBySlug, ToolGroup } from "@/lib/blog/toolGroups";
import { siteConfig } from "@/config/site";
import {
  IconChevronLeft,
  IconClose,
} from "@/components/blog/shared";
import { getToolIcon } from "@/components/blog/tools/ToolIcons";
import { useT } from "@/hooks/useT";
import { useLocaleStore } from "@/store/localeStore";

const TOOL_COLORS: Record<
  string,
  { bg: string; text: string; hoverBorder: string; activeBg: string }
> = {
  "json-formatter": {
    bg: "bg-cyan-50 dark:bg-cyan-950/20",
    text: "text-cyan-600 dark:text-cyan-400",
    hoverBorder: "hover:border-cyan-300 dark:hover:border-cyan-700",
    activeBg: "bg-cyan-100 dark:bg-cyan-950/40 border-cyan-300 dark:border-cyan-700",
  },
  "uuid-generator": {
    bg: "bg-amber-50 dark:bg-amber-950/20",
    text: "text-amber-600 dark:text-amber-400",
    hoverBorder: "hover:border-amber-300 dark:hover:border-amber-700",
    activeBg: "bg-amber-100 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700",
  },
  "timestamp-converter": {
    bg: "bg-cyan-50 dark:bg-cyan-950/20",
    text: "text-cyan-600 dark:text-cyan-400",
    hoverBorder: "hover:border-cyan-300 dark:hover:border-cyan-700",
    activeBg: "bg-cyan-100 dark:bg-cyan-950/40 border-cyan-300 dark:border-cyan-700",
  },
  "case-converter": {
    bg: "bg-indigo-50 dark:bg-indigo-950/20",
    text: "text-indigo-600 dark:text-indigo-400",
    hoverBorder: "hover:border-indigo-300 dark:hover:border-indigo-700",
    activeBg: "bg-indigo-100 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700",
  },
  "diff-checker": {
    bg: "bg-indigo-50 dark:bg-indigo-950/20",
    text: "text-indigo-600 dark:text-indigo-400",
    hoverBorder: "hover:border-indigo-300 dark:hover:border-indigo-700",
    activeBg: "bg-indigo-100 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700",
  },
  "pdf-editor": {
    bg: "bg-red-50 dark:bg-red-950/20",
    text: "text-red-600 dark:text-red-400",
    hoverBorder: "hover:border-red-300 dark:hover:border-red-700",
    activeBg: "bg-red-100 dark:bg-red-950/40 border-red-300 dark:border-red-700",
  },
  base64: {
    bg: "bg-cyan-50 dark:bg-cyan-950/20",
    text: "text-cyan-600 dark:text-cyan-400",
    hoverBorder: "hover:border-cyan-300 dark:hover:border-cyan-700",
    activeBg: "bg-cyan-100 dark:bg-cyan-950/40 border-cyan-300 dark:border-cyan-700",
  },
  "regex-tester": {
    bg: "bg-indigo-50 dark:bg-indigo-950/20",
    text: "text-indigo-600 dark:text-indigo-400",
    hoverBorder: "hover:border-indigo-300 dark:hover:border-indigo-700",
    activeBg: "bg-indigo-100 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700",
  },
  "qr-generator": {
    bg: "bg-amber-50 dark:bg-amber-950/20",
    text: "text-amber-700 dark:text-amber-300",
    hoverBorder: "hover:border-amber-300 dark:hover:border-amber-700",
    activeBg: "bg-amber-100 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700",
  },
  "palette-generator": {
    bg: "bg-fuchsia-50 dark:bg-fuchsia-950/20",
    text: "text-fuchsia-600 dark:text-fuchsia-400",
    hoverBorder: "hover:border-fuchsia-300 dark:hover:border-fuchsia-700",
    activeBg: "bg-fuchsia-100 dark:bg-fuchsia-950/40 border-fuchsia-300 dark:border-fuchsia-700",
  },
  "color-tool": {
    bg: "bg-fuchsia-50 dark:bg-fuchsia-950/20",
    text: "text-fuchsia-600 dark:text-fuchsia-400",
    hoverBorder: "hover:border-fuchsia-300 dark:hover:border-fuchsia-700",
    activeBg: "bg-fuchsia-100 dark:bg-fuchsia-950/40 border-fuchsia-300 dark:border-fuchsia-700",
  },
  password: {
    bg: "bg-amber-50 dark:bg-amber-950/20",
    text: "text-amber-600 dark:text-amber-400",
    hoverBorder: "hover:border-amber-300 dark:hover:border-amber-700",
    activeBg: "bg-amber-100 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700",
  },
  "sql-builder": {
    bg: "bg-blue-50 dark:bg-blue-950/20",
    text: "text-blue-600 dark:text-blue-400",
    hoverBorder: "hover:border-blue-300 dark:hover:border-blue-700",
    activeBg: "bg-blue-100 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700",
  },
  "pdf-to-excel": {
    bg: "bg-red-50 dark:bg-red-950/20",
    text: "text-red-600 dark:text-red-400",
    hoverBorder: "hover:border-red-300 dark:hover:border-red-700",
    activeBg: "bg-red-100 dark:bg-red-950/40 border-red-300 dark:border-red-700",
  },
  "markdown-preview": {
    bg: "bg-indigo-50 dark:bg-indigo-950/20",
    text: "text-indigo-600 dark:text-indigo-400",
    hoverBorder: "hover:border-indigo-300 dark:hover:border-indigo-700",
    activeBg: "bg-indigo-100 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700",
  },
  "jwt-decoder": {
    bg: "bg-cyan-50 dark:bg-cyan-950/20",
    text: "text-cyan-600 dark:text-cyan-400",
    hoverBorder: "hover:border-cyan-300 dark:hover:border-cyan-700",
    activeBg: "bg-cyan-100 dark:bg-cyan-950/40 border-cyan-300 dark:border-cyan-700",
  },
  "url-encoder-decoder": {
    bg: "bg-cyan-50 dark:bg-cyan-950/20",
    text: "text-cyan-600 dark:text-cyan-400",
    hoverBorder: "hover:border-cyan-300 dark:hover:border-cyan-700",
    activeBg: "bg-cyan-100 dark:bg-cyan-950/40 border-cyan-300 dark:border-cyan-700",
  },
  "cron-builder": {
    bg: "bg-amber-50 dark:bg-amber-950/20",
    text: "text-amber-600 dark:text-amber-400",
    hoverBorder: "hover:border-amber-300 dark:hover:border-amber-700",
    activeBg: "bg-amber-100 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700",
  },
  "hash-generator": {
    bg: "bg-amber-50 dark:bg-amber-950/20",
    text: "text-amber-600 dark:text-amber-400",
    hoverBorder: "hover:border-amber-300 dark:hover:border-amber-700",
    activeBg: "bg-amber-100 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700",
  },
  "json-to-ts": {
    bg: "bg-cyan-50 dark:bg-cyan-950/20",
    text: "text-cyan-600 dark:text-cyan-400",
    hoverBorder: "hover:border-cyan-300 dark:hover:border-cyan-700",
    activeBg: "bg-cyan-100 dark:bg-cyan-950/40 border-cyan-300 dark:border-cyan-700",
  },
  "html-entity": {
    bg: "bg-indigo-50 dark:bg-indigo-950/20",
    text: "text-indigo-600 dark:text-indigo-400",
    hoverBorder: "hover:border-indigo-300 dark:hover:border-indigo-700",
    activeBg: "bg-indigo-100 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700",
  },
  "lorem-ipsum": {
    bg: "bg-amber-50 dark:bg-amber-950/20",
    text: "text-amber-600 dark:text-amber-400",
    hoverBorder: "hover:border-amber-300 dark:hover:border-amber-700",
    activeBg: "bg-amber-100 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700",
  },
  "regex-visualizer": {
    bg: "bg-indigo-50 dark:bg-indigo-950/20",
    text: "text-indigo-600 dark:text-indigo-400",
    hoverBorder: "hover:border-indigo-300 dark:hover:border-indigo-700",
    activeBg: "bg-indigo-100 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700",
  },
  "barcode-generator": {
    bg: "bg-amber-50 dark:bg-amber-950/20",
    text: "text-amber-600 dark:text-amber-400",
    hoverBorder: "hover:border-amber-300 dark:hover:border-amber-700",
    activeBg: "bg-amber-100 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700",
  },
  "css-gradient": {
    bg: "bg-fuchsia-50 dark:bg-fuchsia-950/20",
    text: "text-fuchsia-600 dark:text-fuchsia-400",
    hoverBorder: "hover:border-fuchsia-300 dark:hover:border-fuchsia-700",
    activeBg: "bg-fuchsia-100 dark:bg-fuchsia-950/40 border-fuchsia-300 dark:border-fuchsia-700",
  },
  "image-to-base64": {
    bg: "bg-red-50 dark:bg-red-950/20",
    text: "text-red-600 dark:text-red-400",
    hoverBorder: "hover:border-red-300 dark:hover:border-red-700",
    activeBg: "bg-red-100 dark:bg-red-950/40 border-red-300 dark:border-red-700",
  },
  "mock-data": {
    bg: "bg-amber-50 dark:bg-amber-950/20",
    text: "text-amber-600 dark:text-amber-400",
    hoverBorder: "hover:border-amber-300 dark:hover:border-amber-700",
    activeBg: "bg-amber-100 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700",
  },
};

const DEFAULT_COLORS = {
  bg: "bg-gray-50 dark:bg-gray-950/20",
  text: "text-gray-600 dark:text-gray-400",
  hoverBorder: "hover:border-gray-300 dark:hover:border-gray-700",
  activeBg: "bg-gray-100 dark:bg-gray-950/40 border-gray-300 dark:border-gray-700",
};

const TOOL_COMPONENT_MAP: Record<string, boolean> = {
  password: true,
  "json-formatter": true,
  base64: true,
  "regex-tester": true,
  "color-tool": true,
  "palette-generator": true,
  "qr-generator": true,
  "uuid-generator": true,
  "timestamp-converter": true,
  "case-converter": true,
  "diff-checker": true,
  "sql-builder": true,
  "pdf-editor": true,
  "pdf-to-excel": true,
  "markdown-preview": true,
  "jwt-decoder": true,
  "url-encoder-decoder": true,
  "cron-builder": true,
  "hash-generator": true,
  "json-to-ts": true,
  "html-entity": true,
  "lorem-ipsum": true,
  "regex-visualizer": true,
  "barcode-generator": true,
  "css-gradient": true,
  "image-to-base64": true,
  "mock-data": true,
};

const GROUP_ICON: Record<string, React.ReactNode> = {
  colores: (
    <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2 0-.51-.2-.98-.54-1.34-.33-.35-.53-.82-.53-1.32 0-1.1.9-2 2-2h2.36c3.08 0 5.64-2.56 5.64-5.72C22.93 5.68 18.17 2 12 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <circle cx="7.5" cy="11.5" fill="currentColor" r="1.5" />
      <circle cx="10.5" cy="7.5" fill="currentColor" r="1.5" />
      <circle cx="15.5" cy="7.5" fill="currentColor" r="1.5" />
      <circle cx="18" cy="11.5" fill="currentColor" r="1.5" />
    </svg>
  ),
  texto: (
    <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M4 7V4h16v3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <path d="M9 20h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <path d="M12 4v16" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  ),
  datos: (
    <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <path d="M12 22V11" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <path d="M20 6.5L12 11 4 6.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  ),
  documentos: (
    <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  ),
  generadores: (
    <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M8 9l-3 3 3 3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <path d="M16 9l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <path d="M14 4l-4 16" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  ),
  sql: (
    <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M4 17l6-5-6-5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <path d="M12 19h8" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  ),
};

interface GroupPageProps {
  isGroup: boolean;
  group?: ToolGroup;
  groupTools?: ContentMeta[];
  meta?: ContentMeta;
  prevMeta?: ContentMeta | null;
  nextMeta?: ContentMeta | null;
}

function ToolButton({
  item,
  isActive,
  onClick,
}: {
  item: ContentMeta;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = getToolIcon(item.id);
  const colors = TOOL_COLORS[item.id] ?? DEFAULT_COLORS;

  return (
    <button
      className={`group flex flex-col items-center gap-3 p-5 rounded-2xl bg-surface border transition-all duration-200 cursor-pointer text-left w-full ${
        isActive
          ? `${colors.activeBg} shadow-md`
          : `border-border ${colors.hoverBorder} hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20`
      }`}
      onClick={onClick}
      type="button"
    >
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${colors.bg} group-hover:scale-105 transition-transform duration-200`}
      >
        {Icon ? (
          <Icon className={`w-7 h-7 ${colors.text}`} />
        ) : (
          <span className={`text-xl font-bold ${colors.text}`}>
            {item.title.charAt(0)}
          </span>
        )}
      </div>
      <div className="text-center">
        <span className="text-sm font-semibold text-foreground text-center leading-tight group-hover:text-accent transition-colors block">
          {item.title}
        </span>
        {item.description && (
          <span className="text-[11px] text-muted/60 mt-1 line-clamp-2 block">
            {item.description}
          </span>
        )}
      </div>
    </button>
  );
}

function GroupPage({ group, groupTools }: { group: ToolGroup; groupTools: ContentMeta[] }) {
  const { t } = useT();
  const locale = useLocaleStore((s) => s.locale);
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  const activeToolMeta = useMemo(
    () => groupTools.find((tool) => tool.id === activeToolId) ?? null,
    [activeToolId, groupTools],
  );

  const DynamicToolComponent = useMemo(() => {
    if (!activeToolId || !TOOL_COMPONENT_MAP[activeToolId]) return null;
    return getContentComponent(activeToolId, locale);
  }, [activeToolId, locale]);

  return (
    <DefaultLayout
      seo={{
        title: `${t(group.titleKey)} | ${t("blog.type.tools")}`,
        description: t(group.descriptionKey),
      }}
    >
      <div className="space-y-8 py-4">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2">
          <Link
            className="text-xs text-muted/60 hover:text-muted transition-colors no-underline"
            href="/blog"
          >
            {t("blog.breadcrumb")}
          </Link>
          <span aria-hidden="true" className="text-xs text-muted/60">/</span>
          <Link
            className="text-xs text-muted/60 hover:text-muted transition-colors no-underline"
            href="/blog/herramientas"
          >
            {t("blog.type.tools")}
          </Link>
          <span aria-hidden="true" className="text-xs text-muted/60">/</span>
          <span
            aria-current="page"
            className="text-xs font-medium text-foreground"
          >
            {t(group.titleKey)}
          </span>
        </nav>

        {/* Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-4">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${group.color} ${group.text}`}>
              {GROUP_ICON[group.id] ?? <span className="text-lg font-bold">•</span>}
            </div>
            <div>
              <p className="section-label">{t("blog.badge")}</p>
              <h1
                className="text-3xl md:text-4xl font-bold"
                style={{ letterSpacing: "-0.03em" }}
              >
                {t(group.titleKey)}
              </h1>
            </div>
          </div>
          <p className="text-muted max-w-xl leading-relaxed">
            {t(group.descriptionKey)}
          </p>
        </header>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-muted/60">
          <span className="font-semibold text-muted">
            {groupTools.length}{" "}
            {groupTools.length === 1 ? t("blog.toolSingular") : t("blog.toolPlural")}
          </span>
        </div>

        {/* Tool grid */}
        {!activeToolId && (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
            role="list"
          >
            {groupTools.map((item) => (
              <ToolButton
                key={item.id}
                isActive={false}
                item={item}
                onClick={() => setActiveToolId(item.id)}
              />
            ))}
          </div>
        )}

        {/* Inline tool renderer */}
        {activeToolId && activeToolMeta && (
          <div className="border border-border rounded-2xl bg-surface overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <button
                  className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
                  onClick={() => setActiveToolId(null)}
                  type="button"
                >
                  <IconChevronLeft className="w-4 h-4" />
                  {t(group.titleKey)}
                </button>
                <span aria-hidden="true" className="text-muted/30">·</span>
                <h2 className="text-sm font-bold text-foreground">
                  {activeToolMeta.title}
                </h2>
              </div>
              <button
                className="p-1.5 rounded-lg text-muted/60 hover:text-muted hover:bg-default transition-colors"
                onClick={() => setActiveToolId(null)}
                type="button"
              >
                <IconClose className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6">
              {DynamicToolComponent ? (
                <DynamicToolComponent />
              ) : (
                <div className="py-12 text-center text-muted">
                  {t("blog.toolUnavailable")}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Back to all tools */}
        <div className="pt-4 border-t border-border">
          <Link
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors no-underline"
            href="/blog/herramientas"
          >
            <IconChevronLeft className="w-4 h-4" />
            {t("blog.allTools")}
          </Link>
        </div>
      </div>
    </DefaultLayout>
  );
}

function ToolPage({ meta, prevMeta, nextMeta }: { meta: ContentMeta; prevMeta: ContentMeta | null; nextMeta: ContentMeta | null }) {
  const { t } = useT();
  const locale = useLocaleStore((s) => s.locale);
  const Component = getContentComponent(meta.id, locale);

  return (
    <BlogLayout
      seo={{
        title: meta.title,
        description: meta.description,
        ogType: "article",
      }}
    >
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TechArticle",
              headline: meta.title,
              description: meta.description,
              datePublished: meta.publishedAt,
              author: {
                "@type": "Person",
                name: "Adrián Escribano Pérez",
                url: siteConfig.url,
              },
              publisher: { "@type": "Person", name: "Adrián Escribano Pérez" },
              keywords: meta.tags?.join(", "),
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${siteConfig.url}${contentHref(meta.type, meta.slug)}`,
              },
            }),
          }}
          type="application/ld+json"
        />
      </Head>
      <div className="max-w-6xl mx-auto py-4">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-[#aeaeb2] dark:text-[#636366] mb-8"
        >
          <Link
            className="hover:text-[#6e6e73] dark:hover:text-[#86868b] transition-colors no-underline"
            href="/blog"
          >
            {t("blog.breadcrumb")}
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            className="hover:text-[#6e6e73] dark:hover:text-[#86868b] transition-colors no-underline"
            href="/blog/herramientas"
          >
            {t("blog.type.tools")}
          </Link>
          <span aria-hidden="true">/</span>
          <span
            aria-current="page"
            className="text-[#6e6e73] dark:text-[#86868b] truncate max-w-[200px]"
          >
            {meta.title}
          </span>
        </nav>

        <header className="space-y-4 mb-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300">
              {t("blog.interactiveTool")}
            </span>
            <span
              aria-hidden="true"
              className="text-sm text-[#aeaeb2] dark:text-[#636366]"
            >
              ·
            </span>
            <span className="text-sm text-[#aeaeb2] dark:text-[#636366]">
              {t("blog.availableSince", { date: formatDate(meta.publishedAt) })}
            </span>
          </div>
          <TaxonomyMetaStrip meta={meta} />
          <h1
            className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white"
            style={{ letterSpacing: "-0.03em" }}
          >
            {meta.title}
          </h1>
          <p className="text-base text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
            {meta.description}
          </p>
          {meta.tags && (
            <div className="flex flex-wrap gap-2 pt-1">
              {meta.tags.map((tag) => (
                <span key={tag} className="tag-chip">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <ObjectivesBlock meta={meta} />

        <div className="h-px bg-black/8 dark:border-white/8 my-10" />

        <div className="flex-1 min-w-0">
          {Component ? (
            <Component />
          ) : (
            <div className="py-12 text-center text-[#6e6e73] dark:text-[#86868b]">
              {t("blog.toolUnavailable")}
            </div>
          )}
        </div>

        <RelatedContentBlock meta={meta} />

        <nav
          aria-label={t("blog.navTools")}
          className="pt-8 border-t border-black/8 dark:border-white/8 flex items-center justify-between gap-4 flex-wrap"
        >
          <Link
            className="inline-flex items-center gap-2 text-sm text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors no-underline"
            href="/blog/herramientas"
          >
            <IconChevronLeft className="w-4 h-4" />
            {t("blog.allTools")}
          </Link>
          <div className="flex items-center gap-4">
            {prevMeta && (
              <Link
                className="text-sm text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors no-underline truncate max-w-[180px]"
                href={`/blog/herramientas/${prevMeta.slug}`}
              >
                ← {prevMeta.title}
              </Link>
            )}
            {nextMeta && (
              <Link
                className="text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors no-underline truncate max-w-[180px]"
                href={`/blog/herramientas/${nextMeta.slug}`}
              >
                {nextMeta.title} →
              </Link>
            )}
          </div>
        </nav>
      </div>
    </BlogLayout>
  );
}

interface Props {
  isGroup: boolean;
  group?: ToolGroup;
  groupTools?: ContentMeta[];
  meta?: ContentMeta;
  prevMeta?: ContentMeta | null;
  nextMeta?: ContentMeta | null;
}

export default function HerramientaGroupOrToolPage(props: Props) {
  if (props.isGroup && props.group && props.groupTools) {
    return <GroupPage group={props.group} groupTools={props.groupTools} />;
  }
  if (props.meta) {
    return (
      <ToolPage
        meta={props.meta}
        prevMeta={props.prevMeta ?? null}
        nextMeta={props.nextMeta ?? null}
      />
    );
  }
  return null;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tools = getContentByType("tool");
  const groupPaths = TOOL_GROUPS.map((g) => ({ params: { group: g.slug } }));
  const toolPaths = tools.map((t) => ({ params: { group: t.slug } }));

  return {
    paths: [...groupPaths, ...toolPaths],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.group as string;

  const group = getToolGroupBySlug(slug);
  if (group) {
    const allTools = getContentByType("tool");
    const groupTools = allTools.filter((t) => group.toolIds.includes(t.id));
    return { props: { isGroup: true, group, groupTools } };
  }

  const tools = getContentByType("tool");
  const idx = tools.findIndex((t) => t.slug === slug);
  if (idx === -1) return { notFound: true };

  return {
    props: {
      isGroup: false,
      meta: tools[idx],
      prevMeta: tools[idx - 1] ?? null,
      nextMeta: tools[idx + 1] ?? null,
    },
  };
};
