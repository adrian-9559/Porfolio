"use client";
import Link from "next/link";
import {
  getLevel,
  getRelatedContent,
  LEARNING_PATHS,
  type DifficultyLevel,
} from "@/lib/blog/taxonomy";
import { getContentBySlug, typeSlug, type ContentMeta } from "@/lib/blog/registry";

// ── Level badge ───────────────────────────────────────────────────────────────

export function LevelBadge({ level, size = "sm" }: { level: DifficultyLevel; size?: "xs" | "sm" }) {
  const l = getLevel(level);
  const cls = size === "xs"
    ? `px-1.5 py-0.5 rounded text-[9px] font-semibold ${l.bgColor} ${l.color}`
    : `px-2 py-0.5 rounded-full text-xs font-semibold ${l.bgColor} ${l.color}`;
  return <span className={cls}>{l.labelEs}</span>;
}

// ── Taxonomy sidebar / header strip ──────────────────────────────────────────

interface TaxonomyMetaProps {
  meta: ContentMeta;
}

export function TaxonomyMetaStrip({ meta }: TaxonomyMetaProps) {
  if (!meta.level && !meta.learningPaths?.length && !meta.estimatedMinutes) return null;

  const paths = LEARNING_PATHS.filter((p) => meta.learningPaths?.includes(p.id));

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      {meta.level && <LevelBadge level={meta.level} />}
      {meta.estimatedMinutes != null && meta.estimatedMinutes > 0 && (
        <span className="text-[#aeaeb2] dark:text-[#636366]">⏱ {meta.readTime}</span>
      )}
      {paths.map((p) => (
        <span key={p.id} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/[0.04] dark:bg-white/[0.04] text-[#6e6e73] dark:text-[#86868b]">
          {p.icon} {p.title}
        </span>
      ))}
    </div>
  );
}

// ── Prerequisites block ───────────────────────────────────────────────────────

export function PrerequisitesBlock({ meta }: TaxonomyMetaProps) {
  if (!meta.prerequisites?.length) return null;

  const prereqs = meta.prerequisites
    .map((slug) => getContentBySlug(slug))
    .filter(Boolean) as ContentMeta[];

  if (!prereqs.length) return null;

  return (
    <div className="rounded-2xl border border-amber-200 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-950/20 px-5 py-4">
      <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-3">
        Requisitos previos
      </p>
      <div className="flex flex-col gap-2">
        {prereqs.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${typeSlug(p.type)}/${p.slug}`}
            className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 transition-colors no-underline"
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M5 8h6M8 5l3 3-3 3" />
            </svg>
            {p.title}
            {p.level && <LevelBadge level={p.level} size="xs" />}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── Objectives block ──────────────────────────────────────────────────────────

export function ObjectivesBlock({ meta }: TaxonomyMetaProps) {
  if (!meta.objectives?.length) return null;

  return (
    <div className="rounded-2xl border border-blue-200 dark:border-blue-800/40 bg-blue-50 dark:bg-blue-950/20 px-5 py-4">
      <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-3">
        Lo que aprenderás
      </p>
      <ul className="flex flex-col gap-2">
        {meta.objectives.map((obj, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-blue-700 dark:text-blue-300">
            <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-blue-500" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 8l4 4 6-6" />
            </svg>
            {obj}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Related content block ─────────────────────────────────────────────────────

const RELATION_LABEL: Record<string, string> = {
  prerequisite: "Requisito previo",
  related:      "Relacionado",
  next:         "Siguiente paso",
  deepdive:     "Profundiza",
};

const RELATION_COLOR: Record<string, string> = {
  prerequisite: "text-amber-600 dark:text-amber-400",
  related:      "text-blue-600 dark:text-blue-400",
  next:         "text-emerald-600 dark:text-emerald-400",
  deepdive:     "text-purple-600 dark:text-purple-400",
};

export function RelatedContentBlock({ meta }: TaxonomyMetaProps) {
  const relations = getRelatedContent(meta.slug);
  if (!relations.length) return null;

  const items = relations
    .map((r) => ({ ...r, content: getContentBySlug(r.slug) }))
    .filter((r) => r.content) as Array<{ slug: string; type: string; content: ContentMeta }>;

  if (!items.length) return null;

  return (
    <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] overflow-hidden">
      <div className="px-5 py-3 border-b border-black/8 dark:border-white/8">
        <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
          Contenido relacionado
        </p>
      </div>
      <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
        {items.map(({ type, content }) => (
          <Link
            key={content.slug}
            href={`/blog/${typeSlug(content.type)}/${content.slug}`}
            className="flex items-center gap-3 px-5 py-3 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors no-underline group"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${content.categoryColor} flex-shrink-0`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                {content.title}
              </p>
              <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366] mt-0.5">
                {content.category}
                {content.level && <> · <span className={RELATION_COLOR[type]}>{RELATION_LABEL[type]}</span></>}
              </p>
            </div>
            {content.level && <LevelBadge level={content.level} size="xs" />}
            <svg className="w-3.5 h-3.5 text-[#aeaeb2] flex-shrink-0" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 12l4-4-4-4" /></svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
