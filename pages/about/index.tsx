"use client";
import { useEffect, useRef, useState } from "react";

import DefaultLayout from "@/layouts/default";
import { useT } from "@/hooks/useT";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { IconCheck } from "@/components/ui/Icons";

const TIMELINE_KEYS = [
  {
    year: "2021",
    titleKey: "about.tl2021Title",
    descKey: "about.tl2021Desc",
    gradient: "from-orange-500 to-amber-600",
  },
  {
    year: "2022",
    titleKey: "about.tl2022Title",
    descKey: "about.tl2022Desc",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    year: "2023",
    titleKey: "about.tl2023Title",
    descKey: "about.tl2023Desc",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    year: "2024",
    titleKey: "about.tl2024Title",
    descKey: "about.tl2024Desc",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    year: "2025",
    titleKey: "about.tl2025Title",
    descKey: "about.tl2025Desc",
    gradient: "from-violet-500 to-purple-600",
  },
];

const STATS = [
  {
    value: "3",
    suffix: "+",
    labelKey: "about.yearsExp",
    color: "from-violet-500 to-purple-600",
    icon: (
      <svg
        className="w-5 h-5 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    ),
  },
  {
    value: "15",
    suffix: "+",
    labelKey: "about.projects",
    color: "from-pink-500 to-rose-600",
    icon: (
      <svg
        className="w-5 h-5 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    ),
  },
  {
    value: "20",
    suffix: "+",
    labelKey: "about.techs",
    color: "from-cyan-500 to-blue-600",
    icon: (
      <svg
        className="w-5 h-5 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    ),
  },
  {
    value: "800",
    suffix: "h",
    labelKey: "about.hours",
    color: "from-orange-500 to-amber-600",
    icon: (
      <svg
        className="w-5 h-5 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    ),
  },
];

const SPECS = [
  {
    labelKey: "about.specFrontend",
    itemsKey: "about.specFrontendItems",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    labelKey: "about.specBackend",
    itemsKey: "about.specBackendItems",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    labelKey: "about.specDB",
    itemsKey: "about.specDBItems",
    gradient: "from-orange-500 to-red-500",
  },
  {
    labelKey: "about.specDevOps",
    itemsKey: "about.specDevOpsItems",
    gradient: "from-violet-500 to-purple-500",
  },
];

const APPROACH_KEYS = [1, 2, 3, 4];

const DEFINES = [
  { label: "Passionate" },
  { label: "Reliable" },
  { label: "Creative" },
  { label: "Team Player" },
  { label: "Adaptable" },
];

function AnimatedCounter({
  value,
  suffix,
  shouldAnimate,
}: {
  value: string;
  suffix: string;
  shouldAnimate: boolean;
}) {
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
    <span
      className="text-3xl md:text-4xl font-black ds-gradient-text"
      style={{ letterSpacing: "-0.03em" }}
    >
      {count}
      {suffix}
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
      { threshold: 0.3 },
    );

    observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <DefaultLayout>
      <div className="relative">
        {/* Background decorativo */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div
            className="absolute top-[-100px] left-[5%] w-[450px] h-[450px] rounded-full"
            style={{
              filter: "blur(80px)",
              background:
                "radial-gradient(circle, var(--accent-light) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-[20%] right-[-5%] w-[350px] h-[350px] rounded-full"
            style={{
              filter: "blur(80px)",
              background:
                "radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="space-y-20 md:space-y-28 py-4 md:py-8">
          {/* Header */}
          <ScrollReveal>
            <div className="space-y-6 max-w-3xl">
              <span className="ds-badge ds-badge-accent">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                {t("about.badge")}
              </span>
              <h1
                className="text-5xl md:text-6xl font-black ds-gradient-text"
                style={{ letterSpacing: "-0.03em" }}
              >
                {t("about.title")}
              </h1>
              <p
                className="text-lg leading-relaxed max-w-xl"
                style={{ color: "var(--text-secondary)" }}
              >
                {t("about.introFull")}
              </p>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="ds-card p-6 text-center space-y-3 overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} opacity-60`}
                  />
                  <div
                    className={`w-11 h-11 mx-auto rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <AnimatedCounter
                      shouldAnimate={statsVisible}
                      suffix={stat.suffix}
                      value={stat.value}
                    />
                    <p
                      className="text-xs font-semibold uppercase tracking-wide mt-1"
                      style={{ color: "var(--text-muted)" }}
                    >
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
                <div className="ds-card p-6 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-brand-from)] to-[var(--color-brand-via)] opacity-80" />
                  <div className="relative">
                    <h2
                      className="text-lg font-bold mb-4"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {t("about.myStory")}
                    </h2>
                    <div className="space-y-4 text-sm leading-relaxed">
                      <p
                        className="font-medium"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {t("about.introFull")}
                      </p>
                      <p style={{ color: "var(--text-secondary)" }}>
                        {t("about.storyP1")}
                      </p>
                      <p style={{ color: "var(--text-secondary)" }}>
                        {t("about.storyP2")}
                      </p>
                      <p style={{ color: "var(--text-secondary)" }}>
                        {t("about.storyP3")}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Approach */}
              <ScrollReveal delay={100} direction="left">
                <div className="ds-card p-6 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-80" />
                  <div className="relative">
                    <h2
                      className="text-lg font-bold mb-4"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {t("about.myApproach")}
                    </h2>
                    <ul className="space-y-3">
                      {APPROACH_KEYS.map((i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm"
                          style={{ color: "var(--text-primary)" }}
                        >
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
                <h2
                  className="text-lg font-bold mb-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  {t("about.specialization")}
                </h2>
              </ScrollReveal>
              <div className="space-y-3">
                {SPECS.map((spec, i) => (
                  <ScrollReveal key={i} delay={i * 80} direction="right">
                    <div className="ds-card p-4 overflow-hidden">
                      <div
                        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${spec.gradient} opacity-60`}
                      />
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg bg-gradient-to-br ${spec.gradient} flex items-center justify-center shadow-md`}
                        >
                          <IconCheck className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p
                            className="text-xs font-semibold uppercase tracking-wider"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {t(spec.labelKey)}
                          </p>
                          <p
                            className="text-sm"
                            style={{ color: "var(--text-primary)" }}
                          >
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
                <p className="ds-section-label">{t("about.career")}</p>
                <h2
                  className="text-2xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {t("about.timeline")}
                </h2>
              </div>
            </ScrollReveal>

            <div className="relative">
              <div className="absolute left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-[var(--color-brand-from)] via-[var(--color-brand-via)] to-[var(--color-brand-from)] opacity-30" />

              <div className="space-y-0">
                {TIMELINE_KEYS.map((item, idx) => (
                  <ScrollReveal key={idx} delay={idx * 100}>
                    <div className="relative flex gap-5 pb-8 last:pb-0">
                      <div
                        className="flex-shrink-0 flex flex-col items-center pt-0.5"
                        style={{ width: 38 }}
                      >
                        <div
                          className={`w-3 h-3 rounded-full bg-gradient-to-br ${item.gradient} ring-4 ring-[var(--accent-light)] z-10 mt-1`}
                        />
                      </div>

                      <div className="flex-1 pb-1">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${item.gradient} mb-2`}
                        >
                          {item.year}
                        </span>
                        <h3
                          className="font-semibold text-sm"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {t(item.titleKey)}
                        </h3>
                        <p
                          className="text-sm mt-1 leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
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
                <p className="ds-section-label">
                  {t("about.defines") || "Lo que me define"}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {DEFINES.map((item, i) => (
                  <ScrollReveal key={item.label} delay={i * 60}>
                    <div className="ds-card !rounded-full inline-flex items-center gap-2.5 px-5 py-3 cursor-default">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
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
