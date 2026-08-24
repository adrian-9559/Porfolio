"use client";
import { useEffect, useRef, useState } from "react";
import DefaultLayout from "@/layouts/default";
import { useT } from "@/hooks/useT";
import ScrollReveal from "@/components/ui/ScrollReveal";

const TIMELINE_KEYS = [
  { year: "2021", titleKey: "about.tl2021Title", descKey: "about.tl2021Desc", gradient: "from-orange-500 to-amber-600" },
  { year: "2022", titleKey: "about.tl2022Title", descKey: "about.tl2022Desc", gradient: "from-cyan-500 to-blue-600" },
  { year: "2023", titleKey: "about.tl2023Title", descKey: "about.tl2023Desc", gradient: "from-pink-500 to-rose-600" },
  { year: "2024", titleKey: "about.tl2024Title", descKey: "about.tl2024Desc", gradient: "from-emerald-500 to-teal-600" },
  { year: "2025", titleKey: "about.tl2025Title", descKey: "about.tl2025Desc", gradient: "from-violet-500 to-purple-600" },
];

const STATS = [
  { value: "3", suffix: "+", labelKey: "about.yearsExp", color: "from-violet-500 to-purple-600", icon: (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )},
  { value: "15", suffix: "+", labelKey: "about.projects", color: "from-pink-500 to-rose-600", icon: (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  )},
  { value: "20", suffix: "+", labelKey: "about.techs", color: "from-cyan-500 to-blue-600", icon: (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  )},
  { value: "800", suffix: "h", labelKey: "about.hours", color: "from-orange-500 to-amber-600", icon: (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  )},
];

const SPECS = [
  { labelKey: "about.specFrontend", itemsKey: "about.specFrontendItems", gradient: "from-blue-500 to-cyan-500", icon: (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  )},
  { labelKey: "about.specBackend", itemsKey: "about.specBackendItems", gradient: "from-emerald-500 to-teal-500", icon: (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  )},
  { labelKey: "about.specDB", itemsKey: "about.specDBItems", gradient: "from-orange-500 to-red-500", icon: (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  )},
  { labelKey: "about.specDevOps", itemsKey: "about.specDevOpsItems", gradient: "from-violet-500 to-purple-500", icon: (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  )},
];

const APPROACH_KEYS = [1, 2, 3, 4];

const DEFINES = [
  { icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ), gradient: "from-violet-500 to-purple-500", label: "Passionate" },
  { icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ), gradient: "from-emerald-500 to-teal-500", label: "Reliable" },
  { icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ), gradient: "from-cyan-500 to-blue-500", label: "Creative" },
  { icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ), gradient: "from-pink-500 to-rose-500", label: "Team Player" },
  { icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ), gradient: "from-amber-500 to-orange-500", label: "Adaptable" },
];

function AnimatedCounter({ value, suffix, shouldAnimate }: { value: string; suffix: string; shouldAnimate: boolean }) {
  const num = parseInt(value, 10);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [shouldAnimate, num]);

  return (
    <span className="text-3xl md:text-4xl font-black hero-gradient-text" style={{ letterSpacing: "-0.03em" }}>
      {count}{suffix}
    </span>
  );
}

export default function AboutPage() {
  const { t } = useT();
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <DefaultLayout>
      <div className="relative">
        {/* Background decorativo */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="blob absolute top-[-100px] left-[5%] w-[450px] h-[450px] bg-gradient-radial from-violet-500/15 via-purple-400/8 to-transparent" />
          <div className="blob absolute top-[20%] right-[-5%] w-[350px] h-[350px] bg-gradient-to-bl from-pink-500/10 via-rose-400/5 to-transparent" />
          <div className="blob absolute bottom-[-60px] left-[30%] w-[400px] h-[300px] bg-gradient-to-tr from-cyan-400/10 via-blue-400/5 to-transparent" />
          <div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(99,102,241,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.8) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="space-y-20 md:space-y-28 py-4 md:py-8">
          {/* Header */}
          <ScrollReveal>
            <div className="space-y-6 max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-300/40 dark:border-violet-700/40 text-violet-700 dark:text-violet-300 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                {t("about.badge")}
              </span>
              <h1
                className="text-5xl md:text-6xl font-black hero-gradient-text"
                style={{ letterSpacing: "-0.03em" }}
              >
                {t("about.title")}
              </h1>
              <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed max-w-xl">
                {t("about.introFull")}
              </p>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="group relative p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 text-center space-y-3 hover:border-black/15 dark:hover:border-white/15 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} opacity-60`} />
                  <div className={`w-11 h-11 mx-auto rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <div>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} shouldAnimate={statsVisible} />
                    <p className="text-xs text-[#aeaeb2] dark:text-[#636366] font-semibold uppercase tracking-wide mt-1">
                      {t(stat.labelKey)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Story + Specialization */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Left: Story + Approach */}
            <div className="lg:col-span-3 space-y-8">
              {/* Story */}
              <ScrollReveal direction="left">
                <div className="group relative p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-pink-500 opacity-80" />
                  <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-br from-violet-500/10 to-pink-500/5 blur-2xl group-hover:opacity-20 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h2 className="text-lg font-bold text-[#1d1d1f] dark:text-white">
                        {t("about.myStory")}
                      </h2>
                    </div>
                    <div className="space-y-4 text-sm leading-relaxed">
                      <p className="text-[#3d3d3d] dark:text-[#c0c0c5] font-medium">
                        {t("about.introFull")}
                      </p>
                      <p className="text-[#6e6e73] dark:text-[#86868b]">
                        {t("about.storyP1")}
                      </p>
                      <p className="text-[#6e6e73] dark:text-[#86868b]">
                        {t("about.storyP2")}
                      </p>
                      <p className="text-[#6e6e73] dark:text-[#86868b]">
                        {t("about.storyP3")}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Approach */}
              <ScrollReveal direction="left" delay={100}>
                <div className="group relative p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-80" />
                  <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/5 blur-2xl group-hover:opacity-20 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                      </div>
                      <h2 className="text-lg font-bold text-[#1d1d1f] dark:text-white">
                        {t("about.myApproach")}
                      </h2>
                    </div>
                    <ul className="space-y-3">
                      {APPROACH_KEYS.map((i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-[#3d3d3d] dark:text-[#c0c0c5]">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex-shrink-0" />
                          {t(`about.approachItem${i}`)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Specialization */}
            <div className="lg:col-span-2 space-y-3">
              <ScrollReveal direction="right">
                <h2 className="text-lg font-bold text-[#1d1d1f] dark:text-white mb-4">
                  {t("about.specialization")}
                </h2>
              </ScrollReveal>
              <div className="space-y-3">
                {SPECS.map((spec, i) => (
                  <ScrollReveal key={i} direction="right" delay={i * 80}>
                    <div className="group relative p-4 rounded-xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${spec.gradient} opacity-60`} />
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${spec.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                          {spec.icon}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider">
                            {t(spec.labelKey)}
                          </p>
                          <p className="text-sm text-[#3d3d3d] dark:text-[#c0c0c5]">
                            {t(spec.itemsKey)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            <ScrollReveal>
              <div className="space-y-2">
                <p className="section-label">{t("about.career")}</p>
                <h2 className="text-2xl font-bold text-[#1d1d1f] dark:text-white">{t("about.timeline")}</h2>
              </div>
            </ScrollReveal>

            <div className="relative">
              <div className="absolute left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-violet-500 via-pink-500 to-cyan-500 opacity-30" />

              <div className="space-y-0">
                {TIMELINE_KEYS.map((item, idx) => (
                  <ScrollReveal key={idx} delay={idx * 100}>
                    <div className="relative flex gap-5 pb-8 last:pb-0">
                      <div className="flex-shrink-0 flex flex-col items-center pt-0.5" style={{ width: 38 }}>
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${item.gradient} ring-4 ring-violet-500/20 z-10 mt-1`} />
                      </div>

                      <div className="flex-1 pb-1">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${item.gradient} mb-2`}>
                          {item.year}
                        </span>
                        <h3 className="font-semibold text-[#1d1d1f] dark:text-white text-sm">
                          {t(item.titleKey)}
                        </h3>
                        <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1 leading-relaxed">
                          {t(item.descKey)}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>

          {/* Lo que me define */}
          <ScrollReveal>
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <p className="section-label">{t("about.defines") || "Lo que me define"}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {DEFINES.map((item, i) => (
                  <ScrollReveal key={item.label} delay={i * 60}>
                    <div className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-lg transition-all duration-300 cursor-default group">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 text-white`}>
                        {item.icon}
                      </div>
                      <span className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
                        {item.label}
                      </span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </DefaultLayout>
  );
}
