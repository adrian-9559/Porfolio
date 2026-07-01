"use client";
import Link from "next/link";

import { useT } from "@/hooks/useT";
import {
  IconCheck,
  IconChevronRight,
  IconClock,
} from "@/components/blog/shared";
import {
  getContentBySlug,
  typeSlug,
  type ContentMeta,
} from "@/lib/blog/registry";
import {
  getLevel,
  getRelatedContent,
  LEARNING_PATHS,
  type DifficultyLevel,
} from "@/lib/blog/taxonomy";

// ── Level badge ───────────────────────────────────────────────────────────────

export function LevelBadge({
  level,
  size = "sm",
}: {
  level: DifficultyLevel;
  size?: "xs" | "sm";
}) {
  const { t } = useT();
  const l = getLevel(level);
  const cls =
    size === "xs"
      ? `px-1.5 py-0.5 rounded text-[9px] font-semibold ${l.bgColor} ${l.color}`
      : `px-2 py-0.5 rounded-full text-xs font-semibold ${l.bgColor} ${l.color}`;

  return <span className={cls}>{t(l.labelKey)}</span>;
}

// ── Taxonomy sidebar / header strip ──────────────────────────────────────────

interface TaxonomyMetaProps {
  meta: ContentMeta;
}

export function TaxonomyMetaStrip({ meta }: TaxonomyMetaProps) {
  const { t } = useT();
  if (!meta.level && !meta.learningPaths?.length && !meta.estimatedMinutes)
    return null;

  const paths = LEARNING_PATHS.filter((p) =>
    meta.learningPaths?.includes(p.id),
  );

  return (
    <div
      aria-label={t("blog.taxonomy.metadata")}
      className="flex flex-wrap items-center gap-2 text-xs"
      role="list"
    >
      {meta.level && (
        <span role="listitem">
          <LevelBadge level={meta.level} />
        </span>
      )}
      {meta.estimatedMinutes != null && meta.estimatedMinutes > 0 && (
        <span
          className="inline-flex items-center gap-1 text-[#aeaeb2] dark:text-[#636366]"
          role="listitem"
        >
          <IconClock className="w-3 h-3" />
          <span>{meta.readTime}</span>
        </span>
      )}
      {paths.map((p) => (
        <span
          key={p.id}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/[0.04] dark:bg-white/[0.04] text-[#6e6e73] dark:text-[#86868b]"
          role="listitem"
        >
          <span aria-hidden="true">{p.icon}</span> {t(p.titleKey)}
        </span>
      ))}
    </div>
  );
}

// ── Prerequisites block ───────────────────────────────────────────────────────

export function PrerequisitesBlock({ meta }: TaxonomyMetaProps) {
  const { t } = useT();
  if (!meta.prerequisites?.length) return null;

  const prereqs = meta.prerequisites
    .map((slug) => getContentBySlug(slug))
    .filter(Boolean) as ContentMeta[];

  if (!prereqs.length) return null;

  return (
    <section
      aria-labelledby="prereqs-heading"
      className="rounded-2xl border border-amber-200 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-950/20 px-5 py-4 mb-2"
    >
      <h2
        className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-3"
        id="prereqs-heading"
      >
        {t("blog.taxonomy.prerequisites")}
      </h2>
      <ul className="flex flex-col gap-2 ">
        {prereqs.map((p) => (
          <li key={p.slug}>
            <Link
              className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 transition-colors no-underline"
              href={`/blog/${typeSlug(p.type)}/${p.slug}`}
            >
              <IconChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{p.title}</span>
              {p.level && <LevelBadge level={p.level} size="xs" />}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ── Objectives block ──────────────────────────────────────────────────────────

export function ObjectivesBlock({ meta }: TaxonomyMetaProps) {
  const { t } = useT();
  if (!meta.objectives?.length) return null;

  return (
    <section
      aria-labelledby="objectives-heading"
      className="rounded-2xl border border-blue-200 dark:border-blue-800/40 bg-blue-50 dark:bg-blue-950/20 px-5 py-4"
    >
      <h2
        className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-3"
        id="objectives-heading"
      >
        {t("blog.taxonomy.objectives")}
      </h2>
      <ul className="flex flex-col gap-2">
        {meta.objectives.map((obj, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm text-blue-700 dark:text-blue-300"
          >
            <IconCheck className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-blue-500" />
            <span>{obj}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ── Related content block ─────────────────────────────────────────────────────

const RELATION_COLOR: Record<string, string> = {
  prerequisite: "text-amber-600 dark:text-amber-400",
  related: "text-blue-600 dark:text-blue-400",
  next: "text-emerald-600 dark:text-emerald-400",
  deepdive: "text-purple-600 dark:text-purple-400",
};

const RELATION_LABEL_KEYS: Record<string, string> = {
  prerequisite: "blog.taxonomy.relationPrerequisite",
  related: "blog.taxonomy.relationRelated",
  next: "blog.taxonomy.relationNext",
  deepdive: "blog.taxonomy.relationDeepDive",
};

export function RelatedContentBlock({ meta }: TaxonomyMetaProps) {
  const { t } = useT();
  const relations = getRelatedContent(meta.slug);

  if (!relations.length) return null;

  const items = relations
    .map((r) => ({ ...r, content: getContentBySlug(r.slug) }))
    .filter((r) => r.content) as Array<{
    slug: string;
    type: string;
    content: ContentMeta;
  }>;

  if (!items.length) return null;

  return (
    <section
      aria-labelledby="related-heading"
      className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] overflow-hidden"
    >
      <div className="px-5 py-3 border-b border-black/8 dark:border-white/8">
        <h2
          className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider"
          id="related-heading"
        >
          {t("blog.taxonomy.related")}
        </h2>
      </div>
      <ul className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
        {items.map(({ type, content }) => (
          <li key={content.slug}>
            <Link
              className="flex items-center gap-3 px-5 py-3 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors no-underline group"
              href={`/blog/${typeSlug(content.type)}/${content.slug}`}
            >
              <span
                aria-hidden="true"
                className={`w-1.5 h-1.5 rounded-full ${content.categoryColor} flex-shrink-0`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                  {content.title}
                </p>
                <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366] mt-0.5">
                  {content.category}
                  {content.level && (
                    <>
                      {" "}
                      ·{" "}
                      <span className={RELATION_COLOR[type]}>
                        {t(RELATION_LABEL_KEYS[type])}
                      </span>
                    </>
                  )}
                </p>
              </div>
              {content.level && <LevelBadge level={content.level} size="xs" />}
              <IconChevronRight className="w-3.5 h-3.5 text-[#aeaeb2] flex-shrink-0" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
