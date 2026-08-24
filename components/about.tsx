"use client";
import { useT } from "@/hooks/useT";
import ScrollReveal from "@/components/ui/ScrollReveal";

const SPECS = [
  { nameKey: "specFrontend", itemsKey: "specFrontendItems", gradient: "from-blue-500 to-cyan-500" },
  { nameKey: "specBackend", itemsKey: "specBackendItems", gradient: "from-emerald-500 to-teal-500" },
  { nameKey: "specDB", itemsKey: "specDBItems", gradient: "from-orange-500 to-red-500" },
  { nameKey: "specDevOps", itemsKey: "specDevOpsItems", gradient: "from-violet-500 to-purple-500" },
];

const APPROACH_ITEMS = ["approachItem1", "approachItem2", "approachItem3", "approachItem4"];

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
        <ScrollReveal>
          <div className="text-center space-y-2">
            <p className="section-label">{t("about.badge")}</p>
            <h2 className="text-3xl md:text-4xl font-black" style={{ letterSpacing: "-0.03em" }}>
              {t("about.title")}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <ScrollReveal direction="left">
            <div className="space-y-6">
              <p className="text-lg text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed">
                {t("about.introFull")}
              </p>
              <div className="space-y-4">
                <p className="text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
                  {t("about.storyP1")}
                </p>
                <p className="text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
                  {t("about.storyP2")}
                </p>
                <p className="text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
                  {t("about.storyP3")}
                </p>
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-[#86868b] dark:text-[#636366] mb-4">
                  {t("about.myApproach")}
                </h3>
                <ul className="space-y-3">
                  {APPROACH_ITEMS.map((key) => (
                    <li key={key} className="flex items-start gap-3 text-sm text-[#3d3d3d] dark:text-[#c0c0c5]">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex-shrink-0" />
                      {t(`about.${key}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "3", label: t("about.yearsExp"), color: "from-violet-500 to-purple-600" },
                  { value: "15", label: t("about.projects"), color: "from-pink-500 to-rose-600" },
                  { value: "20", label: t("about.techs"), color: "from-cyan-500 to-blue-600" },
                  { value: "1", label: t("about.hours"), color: "from-orange-500 to-amber-600", suffix: "K" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-gradient-to-br from-black/[0.03] to-transparent dark:from-white/[0.03] border border-black/8 dark:border-white/8 text-center space-y-1"
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    <p className="text-xs text-[#aeaeb2] dark:text-[#636366] font-semibold uppercase tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-[#86868b] dark:text-[#636366]">
                  {t("about.specialization")}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {SPECS.map((spec, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8"
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${spec.gradient} mb-3`} />
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
