"use client";
import { useT } from "@/hooks/useT";
import ScrollReveal from "@/components/ui/ScrollReveal";

const SPECS = [
  {
    nameKey: "specFrontend",
    itemsKey: "specFrontendItems",
    gradient: "from-blue-500 to-cyan-500",
    icon: (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    nameKey: "specBackend",
    itemsKey: "specBackendItems",
    gradient: "from-emerald-500 to-teal-500",
    icon: (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
  },
  {
    nameKey: "specDB",
    itemsKey: "specDBItems",
    gradient: "from-orange-500 to-red-500",
    icon: (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    nameKey: "specDevOps",
    itemsKey: "specDevOpsItems",
    gradient: "from-violet-500 to-purple-500",
    icon: (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
  },
];

const APPROACH_ITEMS = ["approachItem1", "approachItem2", "approachItem3", "approachItem4"];

const STATS = [
  { value: "3", labelKey: "yearsExp", color: "from-violet-500 to-purple-600", icon: (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )},
  { value: "15", labelKey: "projects", color: "from-pink-500 to-rose-600", icon: (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  )},
  { value: "20", labelKey: "techs", color: "from-cyan-500 to-blue-600", icon: (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  )},
  { value: "1", labelKey: "hours", color: "from-orange-500 to-amber-600", suffix: "K", icon: (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  )},
];

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const num = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const suffixStr = value.replace(/[0-9]/g, "");
  return (
    <span className="text-4xl md:text-5xl font-black hero-gradient-text" style={{ letterSpacing: "-0.03em" }}>
      {num}{suffix || suffixStr}+
    </span>
  );
}

export default function About() {
  const { t } = useT();

  return (
    <section id="about" className="relative w-full">
      <div className="space-y-16">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center space-y-2">
            <p className="section-label">{t("about.badge")}</p>
            <h2 className="text-3xl md:text-4xl font-black" style={{ letterSpacing: "-0.03em" }}>
              {t("about.title")}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Story + Approach */}
          <ScrollReveal direction="left">
            <div className="space-y-8">
              {/* Story */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-[#1d1d1f] dark:text-white uppercase tracking-wider">
                    {t("about.myStory")}
                  </h3>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed">
                    {t("about.introFull")}
                  </p>
                  <p className="text-sm text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
                    {t("about.storyP1")}
                  </p>
                  <p className="text-sm text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
                    {t("about.storyP2")}
                  </p>
                  <p className="text-sm text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
                    {t("about.storyP3")}
                  </p>
                </div>
              </div>

              {/* Approach */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-[#1d1d1f] dark:text-white uppercase tracking-wider">
                    {t("about.myApproach")}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {APPROACH_ITEMS.map((key) => (
                    <li key={key} className="flex items-start gap-3 text-sm text-[#3d3d3d] dark:text-[#c0c0c5]">
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
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 text-center space-y-3"
                  >
                    <div className={`w-10 h-10 mx-auto rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      {stat.icon}
                    </div>
                    <div>
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      <p className="text-xs text-[#aeaeb2] dark:text-[#636366] font-semibold uppercase tracking-wide mt-1">
                        {t(`about.${stat.labelKey}`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Specialization */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-[#86868b] dark:text-[#636366]">
                  {t("about.specialization")}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {SPECS.map((spec, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-lg transition-all duration-300"
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${spec.gradient} flex items-center justify-center mb-3`}>
                        {spec.icon}
                      </div>
                      <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-1">
                        {t(`about.${spec.nameKey}`)}
                      </p>
                      <p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
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
