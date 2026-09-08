"use client";
import type { CampusProgress, CampusUserXP } from "@/types/campus";

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
import { studyPlans } from "@/data/studyPlans";
import { challenges } from "@/data/challenges";

const allTutorials = getContentByType("tutorial");
const allGuides = getGuides();
const featuredGuides = allGuides.filter((g) => g.featured).slice(0, 6);

// ── FAQ data ─────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "¿Qué incluye el campus?",
    a: "El campus incluye guías de aprendizaje estructuradas, tutoriales interactivos, retos prácticos con editor de código, sistema de XP y logros, leaderboard y comunidad de desarrollo.",
  },
  {
    q: "¿Para qué nivel es el campus?",
    a: "El campus está diseñado para todos los niveles: desde principiantes que empiezan desde cero hasta desarrolladores con experiencia que quieren especializarse en áreas como IA, DevOps o arquitectura.",
  },
  {
    q: "¿Cómo funciona el sistema de XP y niveles?",
    a: "Al completar tutoriales, pasar quizzes y resolver retos ganas XP. Tu XP acumulado determina tu nivel. También tienes rachas diarias y logros desbloqueables.",
  },
  {
    q: "¿Puedo aprender a mi ritmo?",
    a: "Sí. Todo el contenido está disponible 24/7. Avanza a tu ritmo, retoma donde lo dejaste y repite las lecciones las veces que necesites.",
  },
  {
    q: "¿Los retos tienen dificultad?",
    a: "Sí. Los retos están clasificados en Fácil, Medio y Difícil. Cada plan de estudio tiene una dificultad progresiva para que avances gradualmente.",
  },
  {
    q: "¿Cómo funciona el leaderboard?",
    a: "El leaderboard muestra los estudiantes con más XP. Puedes competir semanalmente o mensualmente. Tu posición se actualiza en tiempo real.",
  },
];

// ── Tutorial card ─────────────────────────────────────────────────────────────

function TutorialCard({
  item,
  completed,
}: {
  item: ContentMeta;
  completed: boolean;
}) {
  return (
    <Link
      className="group block no-underline"
      href={`/campus/tutoriales/${item.slug}`}
    >
      <div
        className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
          completed
            ? "bg-[var(--accent-light)] border-[var(--border-hover)]"
            : "ds-card hover:border-[var(--border-hover)] hover:shadow-md"
        }`}
      >
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            completed
              ? "bg-[var(--accent-light)] text-[var(--accent)]"
              : "bg-[var(--bg-surface)] text-[var(--text-muted)]"
          }`}
        >
          {completed ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          ) : (
            <IconBook className="w-4 h-4" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.categoryColor}`}
            />
            <span className="text-[10px] font-semibold text-[var(--text-muted)]">
              {item.category}
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">·</span>
            <span className="text-[10px] text-[var(--text-muted)]">
              {item.readTime}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
            {item.title}
          </h3>
        </div>
        <span className="text-[10px] font-semibold text-[var(--accent)] group-hover:translate-x-0.5 transition-transform flex-shrink-0">
          →
        </span>
      </div>
    </Link>
  );
}

// ── Guide card (midu.dev style) ──────────────────────────────────────────────

function GuideCard({
  guide,
  progress,
}: {
  guide: (typeof allGuides)[number];
  progress: number;
}) {
  const { t } = useT();
  const totalMin = guideTotalMinutes(guide);
  const count = guide.curriculum.length;
  const level = LEVELS.find((l) => l.id === guide.level);

  return (
    <Link
      className="group block no-underline"
      href={`/campus/guias/${guide.slug}`}
    >
      <div className="relative overflow-hidden p-5 rounded-2xl ds-card border border-[var(--border-default)] hover:border-[var(--border-hover)] hover:shadow-lg transition-all duration-300">
        {/* Top gradient bar */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-brand-from)] via-[var(--color-brand-via)] to-[var(--color-brand-to)]"
        />

        <div className="flex items-center gap-2 mb-3">
          <span className={`w-2.5 h-2.5 rounded-full ${guide.categoryColor}`} />
          <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            {guide.category}
          </span>
          {level && (
            <>
              <span className="text-[10px] text-[var(--text-muted)]">·</span>
              <span className="text-[10px] text-[var(--text-muted)]">
                {t(level.labelKey)}
              </span>
            </>
          )}
        </div>

        <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-2 leading-snug">
          {guide.title}
        </h3>
        <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-4 leading-relaxed">
          {guide.description}
        </p>

        <div className="flex items-center gap-4 pt-3 border-t border-[var(--border-default)]">
          <span className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]">
            <IconBook className="w-3 h-3" /> {count} tutoriales
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]">
            <IconClock className="w-3 h-3" /> ~{totalMin}m
          </span>
          <div className="flex-1" />
          <span className="text-[10px] font-semibold text-[var(--accent)] group-hover:translate-x-0.5 transition-transform">
            Ver ruta →
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Challenge card ───────────────────────────────────────────────────────────

function ChallengeCard({
  challenge,
}: {
  challenge: (typeof challenges)[number];
}) {
  const difficultyConfig = {
    beginner: {
      label: "Fácil",
      bg: "var(--state-success-bg)",
      fg: "var(--state-success-fg)",
      border: "var(--state-success-border)",
    },
    intermediate: {
      label: "Medio",
      bg: "var(--state-warning-bg)",
      fg: "var(--state-warning-fg)",
      border: "var(--state-warning-border)",
    },
    advanced: {
      label: "Difícil",
      bg: "var(--state-danger-bg)",
      fg: "var(--state-danger-fg)",
      border: "var(--state-danger-border)",
    },
  };
  const d = difficultyConfig[challenge.difficulty];

  return (
    <Link
      className="group block no-underline"
      href={`/campus/retos/${challenge.planSlug}/${challenge.slug}`}
    >
      <div className="p-4 rounded-xl ds-card border border-[var(--border-default)] hover:border-[var(--border-hover)] hover:shadow-md transition-all duration-200">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0 text-sm font-bold text-[var(--accent)]">
            {challenge.order}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="px-2 py-0.5 rounded-full text-[9px] font-semibold border"
                style={{
                  background: d.bg,
                  color: d.fg,
                  borderColor: d.border,
                }}
              >
                {d.label}
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">
                {challenge.estimatedMinutes} min
              </span>
              <span className="text-[10px] text-[var(--accent)] font-bold">
                +{challenge.xpReward} XP
              </span>
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
              {challenge.title}
            </h3>
            <p className="text-[10px] text-[var(--text-secondary)] line-clamp-1 mt-0.5">
              {challenge.description}
            </p>
          </div>
          <span className="text-[var(--accent)] text-sm flex-shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Testimonial card ─────────────────────────────────────────────────────────

function TestimonialCard({
  name,
  role,
  country,
  quote,
}: {
  name: string;
  role: string;
  country: string;
  quote: string;
}) {
  return (
    <div className="p-5 rounded-2xl ds-card border border-[var(--border-default)]">
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic mb-4">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-brand-from)] to-[var(--color-brand-via)] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
            {name} {country}
          </p>
          <p className="text-[10px] text-[var(--text-muted)] truncate">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── FAQ item ─────────────────────────────────────────────────────────────────

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[var(--border-default)]">
      <button
        className="flex items-center justify-between w-full py-4 text-left"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <span className="text-sm font-semibold text-[var(--text-primary)] pr-4">
          {question}
        </span>
        <span
          className={`text-[var(--text-muted)] text-lg flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "200px" : "0px" }}
      >
        <p className="text-sm text-[var(--text-secondary)] pb-4 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

// ── Continue Learning (for logged-in users) ──────────────────────────────────

function ContinueLearning({
  progress,
  guides,
}: {
  progress: CampusProgress[];
  guides: typeof allGuides;
}) {
  const { t } = useT();

  const inProgress = useMemo(() => {
    const completedSlugs = new Set(progress.map((p) => p.tutorial_slug));

    return guides
      .map((guide) => {
        const total = guide.curriculum.length;
        const completed = guide.curriculum.filter((s) =>
          completedSlugs.has(s.slug),
        ).length;

        return {
          guide,
          total,
          completed,
          pct: total > 0 ? Math.round((completed / total) * 100) : 0,
        };
      })
      .filter((g) => g.completed > 0 && g.pct < 100)
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 3);
  }, [progress, guides]);

  if (inProgress.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
          {t("campus.continueLearning")}
        </h2>
        <span className="flex-1 h-px bg-[var(--border-default)]" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {inProgress.map(({ guide, total, completed, pct }) => (
          <Link
            key={guide.id}
            className="group block no-underline"
            href={`/campus/guias/${guide.slug}`}
          >
            <div className="p-4 rounded-xl ds-card border border-[var(--border-default)] hover:border-[var(--border-hover)] hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-[var(--accent)]">
                    {pct}%
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                    {guide.title}
                  </h3>
                  <p className="text-[10px] text-[var(--text-muted)]">
                    {completed}/{total} tutoriales
                  </p>
                </div>
              </div>
              <ProgressBar completed={completed} total={total} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    name: "Carlos M.",
    role: "Frontend Developer",
    country: "🇪🇸",
    quote:
      "El campus me ha dado una estructura que no encontraba en ningún lado. Las guías son perfectas para avanzar paso a paso sin perderte.",
  },
  {
    name: "Laura P.",
    role: "Full Stack Developer",
    country: "🇲🇽",
    quote:
      "Los retos son increíbles. Aprender haciendo es la mejor forma. El sistema de XP me mantiene motivada para continuar todos los días.",
  },
  {
    name: "Andrés R.",
    role: "Backend Developer",
    country: "🇦🇷",
    quote:
      "Llevo 3 meses en el campus y he aprendido más que en un año de cursos sueltos. Las rutas de aprendizaje están muy bien pensadas.",
  },
  {
    name: "María G.",
    role: "DevOps Engineer",
    country: "🇨🇴",
    quote:
      "El leaderboard y las rachas me han creado un hábito de estudio. Ahora dedico 30 minutos diarios y mi progreso es constante.",
  },
  {
    name: "Pedro L.",
    role: "Junior Developer",
    country: "🇪🇨",
    quote:
      "Empecé desde cero y ahora estoy construyendo mis propios proyectos. El campus es como tener un mentor disponible 24/7.",
  },
  {
    name: "Sofia H.",
    role: "Software Engineer",
    country: "🇨🇱",
    quote:
      "La calidad del contenido es excepcional. Cada tutorial tiene la cantidad justa de teoría y práctica. Muy bien estructurado.",
  },
];

export default function CampusPage() {
  const { t } = useT();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeLevel, setActiveLevel] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState<
    "guides" | "tutorials" | "ranking" | "achievements"
  >(
    (router.query.tab as
      | "guides"
      | "tutorials"
      | "ranking"
      | "achievements") || "guides",
  );
  const [progress, setProgress] = useState<CampusProgress[]>([]);
  const [xp, setXp] = useState<CampusUserXP | null>(null);
  const [guideProgress, setGuideProgress] = useState<Record<string, number>>(
    {},
  );

  const tutorialCats = useMemo(() => getCategoriesByType("tutorial"), []);
  const catMeta = useMemo(
    () =>
      tutorialCats
        .map((c) => getCategory(c))
        .filter((c): c is NonNullable<typeof c> => c != null),
    [tutorialCats],
  );

  const completedSlugs = useMemo(
    () => new Set(progress.map((p) => p.tutorial_slug)),
    [progress],
  );

  const totalCompleted = completedSlugs.size;
  const totalTutorials = allTutorials.length;

  useEffect(() => {
    if (!isAuthenticated) return;
    campusService
      .getProgress()
      .then(setProgress)
      .catch(() => {});
    campusService
      .getXP()
      .then(setXp)
      .catch(() => {});
    campusService
      .getAllGuideProgress()
      .then(setGuideProgress)
      .catch(() => {});
  }, [isAuthenticated]);

  const handleTabChange = (
    tab: "guides" | "tutorials" | "ranking" | "achievements",
  ) => {
    setActiveTab(tab);
    router.replace({ query: { ...router.query, tab } }, undefined, {
      shallow: true,
    });
  };

  const levelOptions = useMemo(
    () => [
      { id: "all", labelKey: "blog.filterAll" },
      ...LEVELS.map((l) => ({ id: l.id, labelKey: l.labelKey })),
    ],
    [],
  );

  const results = useMemo(() => {
    let items = allTutorials;

    if (activeLevel !== "all")
      items = items.filter((c) => c.level === activeLevel);
    if (activeCategory !== "all")
      items = items.filter((c) => c.categoryId === activeCategory);
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

  const featuredChallenges = challenges.slice(0, 6);

  return (
    <CampusLayout
      seo={{
        title: t("meta.campus.title"),
        description: t("meta.campus.desc"),
      }}
    >
      <div className="space-y-12 py-4">
        {/* ════════════════════════════════════════════════════════════════════════
            HERO SECTION (midu.dev style)
            ════════════════════════════════════════════════════════════════════════ */}
        <header className="text-center space-y-6 max-w-3xl mx-auto">
          {/* Badge */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-light)] border border-[var(--border-default)] text-[var(--accent)] text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              Campus abierto — Empieza gratis
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-3xl md:text-5xl font-black text-[var(--text-primary)] leading-tight"
            style={{ letterSpacing: "-0.04em" }}
          >
            Aprende{" "}
            <span className="bg-gradient-to-r from-[var(--color-brand-from)] via-[var(--color-brand-via)] to-[var(--color-brand-to)] bg-clip-text text-transparent">
              Programación
            </span>{" "}
            <br className="hidden sm:block" />
            sin saltar entre mil recursos
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
            Guías estructuradas, retos prácticos y un sistema de progreso que te
            mantiene motivado. Todo en español, directo y sin relleno.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--bg-interactive)] text-[var(--text-interactive)] text-sm font-bold hover:bg-[var(--bg-interactive-hover)] transition-all shadow-lg shadow-[var(--accent)]/20"
              href="/campus/guias"
            >
              Explorar guías
              <span>→</span>
            </Link>
            <Link
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border-default)] text-[var(--text-primary)] text-sm font-semibold hover:border-[var(--border-hover)] hover:bg-[var(--bg-hover)] transition-all"
              href="/campus/retos"
            >
              Probar un reto gratis
            </Link>
          </div>

          {/* Trust text */}
          <p className="text-[10px] text-[var(--text-muted)]">
            Gratis para empezar · Sin tarjeta de crédito · Cancela cuando quieras
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 pt-2">
            <div className="text-center">
              <p className="text-lg md:text-xl font-black text-[var(--text-primary)]">
                {allGuides.length}
              </p>
              <p className="text-[10px] text-[var(--text-muted)] font-semibold">
                rutas de aprendizaje
              </p>
            </div>
            <div className="w-px h-8 bg-[var(--border-default)]" />
            <div className="text-center">
              <p className="text-lg md:text-xl font-black text-[var(--text-primary)]">
                {allTutorials.length}+
              </p>
              <p className="text-[10px] text-[var(--text-muted)] font-semibold">
                tutoriales
              </p>
            </div>
            <div className="w-px h-8 bg-[var(--border-default)]" />
            <div className="text-center">
              <p className="text-lg md:text-xl font-black text-[var(--text-primary)]">
                {challenges.length}
              </p>
              <p className="text-[10px] text-[var(--text-muted)] font-semibold">
                retos prácticos
              </p>
            </div>
          </div>
        </header>

        {/* ════════════════════════════════════════════════════════════════════════
            CONTINUE LEARNING (only for logged-in users)
            ════════════════════════════════════════════════════════════════════════ */}
        {isAuthenticated && (
          <ContinueLearning guides={allGuides} progress={progress} />
        )}

        {/* ════════════════════════════════════════════════════════════════════════
            COURSES / GUIDES SECTION (midu.dev style)
            ════════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-[var(--text-primary)]" style={{ letterSpacing: "-0.03em" }}>
              Rutas para subir de nivel
            </h2>
            <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto">
              Elige una ruta y avanza paso a paso. Cada guía tiene tutoriales
              ordenados de lo básico a lo avanzado.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredGuides.map((guide) => (
              <GuideCard
                key={guide.id}
                guide={guide}
                progress={guideProgress[guide.slug] ?? 0}
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline"
              href="/campus/guias"
            >
              Ver todas las guías
              <span>→</span>
            </Link>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════════
            CHALLENGES SECTION
            ════════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-[var(--text-primary)]" style={{ letterSpacing: "-0.03em" }}>
              Retos prácticos
            </h2>
            <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto">
              Aprende haciendo. Resuelve retos reales con editor de código y gana
              XP para subir de nivel.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {featuredChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>

          <div className="text-center">
            <Link
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline"
              href="/campus/retos"
            >
              Ver todos los retos
              <span>→</span>
            </Link>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════════
            STATS SECTION
            ════════════════════════════════════════════════════════════════════════ */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              value: allGuides.length,
              label: "Rutas",
              icon: "📚",
            },
            {
              value: allTutorials.length,
              label: "Tutoriales",
              icon: "📖",
            },
            {
              value: challenges.length,
              label: "Retos",
              icon: "⚡",
            },
            {
              value: studyPlans.length,
              label: "Planes",
              icon: "🎯",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-5 rounded-2xl ds-card border border-[var(--border-default)]"
            >
              <span className="text-2xl mb-2 block">{stat.icon}</span>
              <p className="text-2xl font-black text-[var(--text-primary)]">
                {stat.value}
              </p>
              <p className="text-[10px] text-[var(--text-muted)] font-semibold uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </section>

        {/* ════════════════════════════════════════════════════════════════════════
            TESTIMONIALS SECTION (midu.dev style)
            ════════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-[var(--text-primary)]" style={{ letterSpacing: "-0.03em" }}>
              Estudiantes que ya aprenden con estructura
            </h2>
            <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto">
              Historias reales de personas que usan el campus para aprender mejor
              y mantenerse al día.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════════
            TABS SECTION (for logged-in users: ranking, achievements, tutorials)
            ════════════════════════════════════════════════════════════════════════ */}
        {isAuthenticated && (
          <section className="space-y-4">
            <div className="ds-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`ds-tab ${activeTab === tab.id ? "ds-tab-active" : ""}`}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "guides" && (
              <div className="space-y-4">
                {isAuthenticated && xp && (
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--accent-light)] border border-[var(--border-default)]">
                    <XpBadge level={xp.level} xp={xp.total_xp} />
                    <StreakCalendar />
                  </div>
                )}
              </div>
            )}

            {activeTab === "tutorials" && (
              <section className="space-y-4">
                <div className="relative max-w-xl" role="search">
                  <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <input
                    className="ds-input pl-9 pr-9"
                    placeholder={t("blog.searchPlaceholderTutorials")}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  {query && (
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                      onClick={() => setQuery("")}
                    >
                      <IconClose className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="ds-tabs !p-0.5">
                    {levelOptions.map((opt) => (
                      <button
                        key={opt.id}
                        className={`ds-tab ${activeLevel === opt.id ? "ds-tab-active" : ""}`}
                        type="button"
                        onClick={() => setActiveLevel(opt.id)}
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
                            ? "bg-[var(--accent)] text-[var(--text-interactive)]"
                            : "bg-[var(--bg-surface)] text-[var(--text-muted)]"
                        }`}
                        type="button"
                        onClick={() =>
                          setActiveCategory(
                            activeCategory === cat.id ? "all" : cat.id,
                          )
                        }
                      >
                        {t(cat.labelKey)}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-[10px] text-[var(--text-muted)]">
                  {results.length}{" "}
                  {results.length === 1
                    ? t("blog.tutorialSingular")
                    : t("blog.tutorialPlural")}
                </p>

                <div className="space-y-1.5">
                  {results.map((item) => (
                    <TutorialCard
                      key={item.id}
                      completed={completedSlugs.has(item.slug)}
                      item={item}
                    />
                  ))}
                </div>

                {results.length === 0 && (
                  <div className="text-center py-12">
                    <IconGraduation className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2" />
                    <p className="text-sm text-[var(--text-secondary)]">
                      {t("campus.empty")}
                    </p>
                  </div>
                )}
              </section>
            )}

            {activeTab === "ranking" && <Leaderboard />}
            {activeTab === "achievements" && <BadgeGrid />}
          </section>
        )}

        {/* ════════════════════════════════════════════════════════════════════════
            FAQ SECTION (midu.dev style)
            ════════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-[var(--text-primary)]" style={{ letterSpacing: "-0.03em" }}>
              Preguntas antes de empezar
            </h2>
            <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto">
              Lo esencial para decidir con tranquilidad si el campus encaja
              contigo.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {FAQ_ITEMS.map((item) => (
              <FaqItem key={item.q} answer={item.a} question={item.q} />
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════════
            CTA SECTION (midu.dev style)
            ════════════════════════════════════════════════════════════════════════ */}
        <section className="text-center space-y-6 py-12 px-6 rounded-3xl bg-gradient-to-br from-[var(--color-brand-from)]/10 via-[var(--color-brand-via)]/5 to-[var(--color-brand-to)]/10 border border-[var(--border-default)]">
          <h2 className="text-2xl md:text-3xl font-black text-[var(--text-primary)]" style={{ letterSpacing: "-0.03em" }}>
            ¿Quieres guardar el acceso al campus?
          </h2>
          <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
            Revisa las rutas, empieza con un tutorial gratuito o resuelve un reto.
            Sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--bg-interactive)] text-[var(--text-interactive)] text-sm font-bold hover:bg-[var(--bg-interactive-hover)] transition-all shadow-lg shadow-[var(--accent)]/20"
              href="/campus/guias"
            >
              Explorar guías
              <span>→</span>
            </Link>
            <Link
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border-default)] text-[var(--text-primary)] text-sm font-semibold hover:border-[var(--border-hover)] hover:bg-[var(--bg-hover)] transition-all"
              href="/campus/retos"
            >
              Ver retos
            </Link>
          </div>
        </section>
      </div>
    </CampusLayout>
  );
}
