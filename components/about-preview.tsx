"use client";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useT } from "@/hooks/useT";
import {
  IconCode,
  IconGamepad,
  IconMusic,
  IconDumbbell,
  IconGraduation,
  IconStar,
  IconRocket,
} from "@/components/ui/Icons";

const PASSIONS = [
  {
    icon: <IconCode className="w-4 h-4" />,
    titleKey: "home.passionCode.title",
    descKey: "home.passionCode.desc",
  },
  {
    icon: <IconGamepad className="w-4 h-4" />,
    titleKey: "home.passionGames.title",
    descKey: "home.passionGames.desc",
  },
  {
    icon: <IconMusic className="w-4 h-4" />,
    titleKey: "home.passionMusic.title",
    descKey: "home.passionMusic.desc",
  },
  {
    icon: <IconDumbbell className="w-4 h-4" />,
    titleKey: "home.passionFitness.title",
    descKey: "home.passionFitness.desc",
  },
];

const EDUCATION = [
  {
    year: "2025 —",
    titleKey: "home.edu42.title",
    descKey: "home.edu42.desc",
    icon: <IconGraduation className="w-4 h-4" />,
  },
  {
    year: "2022 — 2024",
    titleKey: "home.eduFP.title",
    descKey: "home.eduFP.desc",
    icon: <IconStar className="w-4 h-4" />,
  },
  {
    year: "2020 — 2022",
    titleKey: "home.eduSMR.title",
    descKey: "home.eduSMR.desc",
    icon: <IconRocket className="w-4 h-4" />,
  },
];

export default function AboutPreview() {
  const { t } = useT();

  return (
    <section className="relative" id="about-preview">
      <div className="space-y-16">
        {/* Header */}
        <ScrollReveal>
          <div className="space-y-3">
            <span className="ds-section-label">{t("home.aboutBadge")}</span>
            <h2
              className="text-3xl md:text-4xl font-black text-[var(--text-primary)]"
              style={{ letterSpacing: "-0.03em" }}
            >
              {t("home.aboutTitle")}
            </h2>
            <p className="text-base text-[var(--text-secondary)] max-w-xl leading-relaxed">
              {t("home.aboutDesc")}
            </p>
          </div>
        </ScrollReveal>

        {/* Quick intro card */}
        <ScrollReveal>
          <div className="ds-card ds-card-compact">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-[var(--bg-surface)] flex items-center justify-center flex-shrink-0 text-[var(--text-secondary)]">
                <IconCode className="w-5 h-5" />
              </div>
              <div className="space-y-3 flex-1">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  {t("home.aboutName")}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {t("home.aboutIntro")}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    "React",
                    "Next.js",
                    "Node.js",
                    "TypeScript",
                    "Supabase",
                    "C/C++",
                  ].map((tech) => (
                    <span key={tech} className="ds-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Passions grid */}
        <ScrollReveal>
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">
              {t("home.passionsTitle")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {PASSIONS.map((p, i) => (
                <ScrollReveal key={i} delay={i * 80}>
                  <div className="ds-card ds-card-compact ds-card-interactive">
                    <div className="w-9 h-9 rounded-lg bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-secondary)] mb-3">
                      {p.icon}
                    </div>
                    <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1">
                      {t(p.titleKey)}
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {t(p.descKey)}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Education timeline */}
        <ScrollReveal>
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">
              {t("home.eduTitle")}
            </h3>
            <div className="space-y-3">
              {EDUCATION.map((edu, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="ds-card ds-card-compact flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[var(--bg-surface)] flex items-center justify-center flex-shrink-0 text-[var(--text-secondary)]">
                      {edu.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-[var(--text-muted)]">
                          {edu.year}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)]">
                        {t(edu.titleKey)}
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                        {t(edu.descKey)}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* What drives me */}
        <ScrollReveal>
          <div className="ds-card ds-card-compact text-center space-y-4">
            <div className="w-10 h-10 mx-auto rounded-lg bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-secondary)]">
              <IconRocket className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">
              {t("home.motivationTitle")}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
              {t("home.motivationDesc")}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
