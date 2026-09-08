"use client";
import { useT } from "@/hooks/useT";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { IconCheck } from "@/components/ui/Icons";

const SPECS = [
  {
    nameKey: "specFrontend",
    itemsKey: "specFrontendItems",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    nameKey: "specBackend",
    itemsKey: "specBackendItems",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    nameKey: "specDB",
    itemsKey: "specDBItems",
    gradient: "from-orange-500 to-red-500",
  },
  {
    nameKey: "specDevOps",
    itemsKey: "specDevOpsItems",
    gradient: "from-violet-500 to-purple-500",
  },
];

const APPROACH_ITEMS = [
  "approachItem1",
  "approachItem2",
  "approachItem3",
  "approachItem4",
];

const STATS = [
  { value: "3", labelKey: "yearsExp", color: "from-violet-500 to-purple-600" },
  { value: "15", labelKey: "projects", color: "from-pink-500 to-rose-600" },
  { value: "20", labelKey: "techs", color: "from-cyan-500 to-blue-600" },
  { value: "1K", labelKey: "hours", color: "from-orange-500 to-amber-600" },
];

export default function About() {
  const { t } = useT();

  return (
    <section className="relative w-full" id="about">
      <div className="space-y-16">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center space-y-2">
            <p className="ds-section-label">{t("about.badge")}</p>
            <h2
              className="text-3xl md:text-4xl font-black"
              style={{ letterSpacing: "-0.03em", color: "var(--text-primary)" }}
            >
              {t("about.title")}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Story + Approach */}
          <ScrollReveal direction="left">
            <div className="space-y-8">
              {/* Story */}
              <div className="ds-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent-light)] flex items-center justify-center">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      style={{ color: "var(--accent)" }}
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                  <h3
                    className="text-sm font-bold uppercase tracking-wider"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t("about.myStory")}
                  </h3>
                </div>
                <div className="space-y-3">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t("about.introFull")}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {t("about.storyP1")}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {t("about.storyP2")}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {t("about.storyP3")}
                  </p>
                </div>
              </div>

              {/* Approach */}
              <div className="ds-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                  <h3
                    className="text-sm font-bold uppercase tracking-wider"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t("about.myApproach")}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {APPROACH_ITEMS.map((key) => (
                    <li
                      key={key}
                      className="flex items-start gap-3 text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex-shrink-0" />
                      {t(`about.${key}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Stats + Specialization */}
          <ScrollReveal direction="right">
            <div className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((stat, i) => (
                  <div key={i} className="ds-card p-5 text-center space-y-3">
                    <div
                      className={`w-10 h-10 mx-auto rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                    >
                      <span className="text-white text-xs font-bold">
                        {stat.value}
                      </span>
                    </div>
                    <div>
                      <p
                        className="text-2xl font-black ds-gradient-text"
                        style={{ letterSpacing: "-0.03em" }}
                      >
                        {stat.value}+
                      </p>
                      <p
                        className="text-xs font-semibold uppercase tracking-wide mt-1"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {t(`about.${stat.labelKey}`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Specialization */}
              <div className="space-y-3">
                <h3
                  className="text-sm font-semibold uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  {t("about.specialization")}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {SPECS.map((spec, i) => (
                    <div key={i} className="ds-card p-4">
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${spec.gradient} flex items-center justify-center mb-3`}
                      >
                        <IconCheck className="w-4 h-4 text-white" />
                      </div>
                      <p
                        className="text-sm font-semibold mb-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {t(`about.${spec.nameKey}`)}
                      </p>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {t(`about.${spec.itemsKey}`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
