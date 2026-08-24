"use client";

import Link from "next/link";

import { useT } from "@/hooks/useT";
import {
  GUIDE_BRANCHES,
  getGuides,
  guideTotalMinutes,
  type GuideBranchId,
  type GuideMeta,
} from "@/lib/blog/registry";
import { LEVELS } from "@/lib/blog/taxonomy";
import {
  IconBook,
  IconChevronRight,
  IconClock,
  IconCode,
  IconGraduation,
  IconServer,
  IconSparkles,
  IconTerminal,
} from "@/components/blog/shared";

const BRANCH_ICONS: Record<
  GuideBranchId,
  (p: { className?: string }) => React.ReactNode
> = {
  web: IconCode,
  backend: IconServer,
  ai: IconSparkles,
  systems: IconTerminal,
};

const BRANCH_DOTS: Record<GuideBranchId, string> = {
  web: "bg-emerald-500",
  backend: "bg-blue-500",
  ai: "bg-violet-500",
  systems: "bg-cyan-500",
};

const LINE_CLASS = "bg-black/10 dark:bg-white/10";

const COLUMN_X: Record<GuideBranchId, number> = {
  web: 11.6,
  backend: 37.2,
  ai: 62.8,
  systems: 88.4,
};

function levelNumber(level?: GuideMeta["level"]): number {
  if (!level) return 1;
  const idx = LEVELS.findIndex((l) => l.id === level);

  return idx >= 0 ? idx + 1 : 1;
}

function nodeX(joins?: GuideBranchId[]): number {
  if (!joins || joins.length === 0) return 50;

  return joins.reduce((sum, b) => sum + COLUMN_X[b], 0) / joins.length;
}

const CLUSTER_SPACING = 24;

function assignConvergenceX(list: GuideMeta[]): Map<string, number> {
  const map = new Map<string, number>();
  const groups = new Map<string, GuideMeta[]>();

  for (const g of list) {
    const sig = [...(g.joins ?? [])].sort().join(",");

    if (!groups.has(sig)) groups.set(sig, []);
    groups.get(sig)!.push(g);
  }

  const ordered = [...groups.entries()]
    .map(([sig, members]) => ({
      sig,
      members,
      center: nodeX(members[0].joins),
    }))
    .sort((a, b) => a.center - b.center);

  for (const grp of ordered) {
    const n = grp.members.length;

    if (n === 1) {
      map.set(grp.members[0].slug, grp.center);
      continue;
    }

    const start = grp.center - ((n - 1) * CLUSTER_SPACING) / 2;

    grp.members.forEach((m, i) => map.set(m.slug, start + i * CLUSTER_SPACING));
  }

  return map;
}

function GuideNode({
  guide,
  parentTitle,
  joinedBranches,
}: {
  guide: GuideMeta;
  parentTitle?: string;
  joinedBranches?: GuideBranchId[];
}) {
  const { t } = useT();

  return (
    <div>
      {joinedBranches && joinedBranches.length > 0 && (
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#aeaeb2] dark:text-[#636366] pl-1 mb-1.5 flex-wrap">
          <span>{t("campus.tree.joins")}:</span>
          {joinedBranches.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8"
            >
              <span
                aria-hidden
                className={`w-1.5 h-1.5 rounded-full ${BRANCH_DOTS[b]}`}
              />
              {t(GUIDE_BRANCHES.find((x) => x.id === b)?.labelKey ?? "")}
            </span>
          ))}
        </div>
      )}
      {parentTitle && (
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#aeaeb2] dark:text-[#636366] pl-1 mb-1.5">
          <IconChevronRight className="w-3 h-3" />
          {t("campus.tree.buildsOn")} {parentTitle}
        </div>
      )}
      <Link
        className="block group/node relative overflow-hidden rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-emerald-300/60 dark:hover:border-emerald-700/60 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-200 no-underline motion-safe:transition-all p-4"
        href={`/campus/guias/${guide.slug}`}
      >
        <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
          <span
            aria-hidden
            className={`w-2 h-2 rounded-full flex-shrink-0 ${guide.categoryColor}`}
          />
          <span className="text-[11px] font-semibold text-[#6e6e73] dark:text-[#86868b]">
            {guide.category}
          </span>
          {guide.level && (
            <span className="ml-auto text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-1.5 py-0.5 rounded">
              {t("campus.tree.level", { n: levelNumber(guide.level) })}
            </span>
          )}
        </div>
        <h3 className="text-sm font-bold text-[#1d1d1f] dark:text-white group-hover/node:text-emerald-600 dark:group-hover/node:text-emerald-400 transition-colors leading-snug line-clamp-2">
          {guide.title}
        </h3>
        <div className="flex items-center gap-3 mt-2.5 pt-2 border-t border-black/6 dark:border-white/6">
          <span className="flex items-center gap-1 text-[11px] text-[#aeaeb2] dark:text-[#636366]">
            <IconBook className="w-3 h-3" />
            {guide.curriculum.length}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-[#aeaeb2] dark:text-[#636366]">
            <IconClock className="w-3 h-3" />~{guideTotalMinutes(guide)} min
          </span>
        </div>
      </Link>
    </div>
  );
}

function BranchColumn({
  branch,
  guides,
}: {
  branch: (typeof GUIDE_BRANCHES)[number];
  guides: GuideMeta[];
}) {
  const { t } = useT();
  const BranchIcon = BRANCH_ICONS[branch.id];
  const sorted = [...guides].sort(
    (a, b) =>
      levelNumber(a.level) - levelNumber(b.level) ||
      a.title.localeCompare(b.title),
  );

  return (
    <div className="group flex flex-col items-center min-w-0">
      <span
        aria-hidden
        className={`mx-auto h-8 w-px ${LINE_CLASS} group-hover:bg-emerald-400/60 transition-colors`}
      />
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8">
        <span
          aria-hidden
          className={`w-2 h-2 rounded-full ${BRANCH_DOTS[branch.id]}`}
        />
        <BranchIcon className="w-3.5 h-3.5 text-[#6e6e73] dark:text-[#86868b]" />
        <span className="text-xs font-bold text-[#1d1d1f] dark:text-white whitespace-nowrap">
          {t(branch.labelKey)}
        </span>
      </div>
      <div className="mt-4 w-full space-y-3">
        {sorted.map((guide) => (
          <GuideNode
            key={guide.slug}
            guide={guide}
            parentTitle={
              guide.dependsOn
                ? getGuides().find((g) => g.slug === guide.dependsOn)?.title
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}

function RootPill() {
  const { t } = useT();

  return (
    <div className="flex justify-center">
      <Link
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white text-sm font-semibold no-underline transition-colors"
        href="/campus"
      >
        <IconGraduation className="w-4 h-4" />
        {t("campus.tree.root")}
      </Link>
    </div>
  );
}

function TreeDesktop({
  branches,
  convergence,
}: {
  branches: { id: GuideBranchId; labelKey: string; guides: GuideMeta[] }[];
  convergence: GuideMeta[];
}) {
  const { t } = useT();
  const positions = assignConvergenceX(convergence);

  return (
    <div className="hidden lg:block">
      <RootPill />
      {/* Abanico bézier desde el tronco central (y=30) hasta cada columna (y=100) */}
      <svg
        aria-hidden="true"
        className="block h-14 w-full text-[#d2d2d7] dark:text-white/15"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path
          d="M50 0 V 30 M50 30 C 40 55 20 60 11.6 100 M50 30 C 44 55 32 60 37.2 100 M50 30 C 56 55 68 60 62.8 100 M50 30 C 60 55 80 60 88.4 100 M11.6 100 H 88.4"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="grid grid-cols-4 gap-6">
        {branches.map((b) => (
          <BranchColumn key={b.id} branch={b} guides={b.guides} />
        ))}
      </div>
      {convergence.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-[11px] font-bold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-widest">
              {t("campus.tree.convergence")}
            </h3>
            <span
              aria-hidden
              className="flex-1 h-px bg-black/8 dark:bg-white/8"
            />
          </div>
          <div className="relative">
            {/* Curvas desde cada rama unida hasta el nodo framework */}
            <svg
              aria-hidden="true"
              className="block h-24 w-full text-[#d2d2d7] dark:text-white/15"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              {convergence.map((g) =>
                (g.joins ?? []).map((b) => (
                  <path
                    key={`${g.slug}-${b}`}
                    d={`M ${COLUMN_X[b]} 0 C ${COLUMN_X[b]} 50 ${positions.get(g.slug)} 55 ${positions.get(g.slug)} 100`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                  />
                )),
              )}
            </svg>
            <div className="relative h-44">
              {convergence.map((g) => (
                <div
                  key={g.slug}
                  className="absolute w-56 max-w-[240px]"
                  style={{
                    left: `${positions.get(g.slug)}%`,
                    top: 0,
                    transform: "translateX(-50%)",
                  }}
                >
                  <GuideNode
                    guide={g}
                    joinedBranches={g.joins}
                    parentTitle={
                      g.dependsOn
                        ? getGuides().find((x) => x.slug === g.dependsOn)?.title
                        : undefined
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TreeMobile({
  branches,
  convergence,
}: {
  branches: { id: GuideBranchId; labelKey: string; guides: GuideMeta[] }[];
  convergence: GuideMeta[];
}) {
  const { t } = useT();

  return (
    <div className="lg:hidden">
      <RootPill />
      <div className="relative mt-6 space-y-6">
        <span
          aria-hidden
          className={`absolute left-3.5 top-1 bottom-1 w-px ${LINE_CLASS}`}
        />
        {branches.map((branch) => {
          const BranchIcon = BRANCH_ICONS[branch.id];

          return (
            <div key={branch.id} className="relative pl-10">
              <span
                aria-hidden
                className={`absolute left-0 top-1 w-[7px] h-[7px] rounded-full ${BRANCH_DOTS[branch.id]} ring-2 ring-white dark:ring-[#111116]`}
              />
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 justify-start">
                <span
                  aria-hidden
                  className={`w-2 h-2 rounded-full ${BRANCH_DOTS[branch.id]}`}
                />
                <BranchIcon className="w-3.5 h-3.5 text-[#6e6e73] dark:text-[#86868b]" />
                <span className="text-xs font-bold text-[#1d1d1f] dark:text-white whitespace-nowrap">
                  {t(branch.labelKey)}
                </span>
              </div>
              <div className="mt-3 space-y-3">
                {branch.guides.map((guide) => (
                  <GuideNode
                    key={guide.slug}
                    guide={guide}
                    parentTitle={
                      guide.dependsOn
                        ? getGuides().find((g) => g.slug === guide.dependsOn)
                            ?.title
                        : undefined
                    }
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {convergence.length > 0 && (
        <div className="mt-6 pt-6 border-t border-black/8 dark:border-white/8">
          <h3 className="text-[11px] font-bold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-widest mb-3">
            {t("campus.tree.convergence")}
          </h3>
          <div className="space-y-3">
            {convergence.map((g) => (
              <GuideNode
                key={g.slug}
                guide={g}
                joinedBranches={g.joins}
                parentTitle={
                  g.dependsOn
                    ? getGuides().find((x) => x.slug === g.dependsOn)?.title
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function GuideTree() {
  const { t } = useT();
  const guides = getGuides();
  const convergence = guides.filter((g) => g.joins && g.joins.length > 0);
  const branchGuides = guides.filter((g) => !g.joins || g.joins.length === 0);
  const branches = GUIDE_BRANCHES.map((b) => ({
    ...b,
    guides: branchGuides.filter((g) => g.branch === b.id),
  })).filter((b) => b.guides.length > 0);

  if (branches.length === 0 && convergence.length === 0) return null;

  return (
    <section aria-labelledby="guide-tree-title" className="space-y-5">
      <div className="flex items-center gap-3">
        <h2
          className="text-xs font-bold text-muted/60 uppercase tracking-widest"
          id="guide-tree-title"
        >
          {t("campus.tree.title")}
        </h2>
        <span aria-hidden className="flex-1 h-px bg-default" />
      </div>
      <TreeDesktop branches={branches} convergence={convergence} />
      <TreeMobile branches={branches} convergence={convergence} />
    </section>
  );
}
