import { useT } from "@/hooks/useT";

interface Metric {
  value: string;
  labelKey: string;
  descKey: string;
  gradient: string;
  bg: string;
  border: string;
  icon: string;
}

const metrics: Metric[] = [
  {
    value: "15+",
    labelKey: "metricProjectsLabel",
    descKey: "metricProjectsDesc",
    gradient: "from-violet-500 to-purple-600",
    bg: "from-violet-500/10 to-purple-500/5",
    border: "border-violet-200/60 dark:border-violet-800/40",
    icon: "🚀",
  },
  {
    value: "3+",
    labelKey: "metricExperienceLabel",
    descKey: "metricExperienceDesc",
    gradient: "from-pink-500 to-rose-600",
    bg: "from-pink-500/10 to-rose-500/5",
    border: "border-pink-200/60 dark:border-pink-800/40",
    icon: "⚡",
  },
  {
    value: "20+",
    labelKey: "metricTechLabel",
    descKey: "metricTechDesc",
    gradient: "from-cyan-500 to-blue-600",
    bg: "from-cyan-500/10 to-blue-500/5",
    border: "border-cyan-200/60 dark:border-cyan-800/40",
    icon: "🛠️",
  },
  {
    value: "1K+",
    labelKey: "metricCommitsLabel",
    descKey: "metricCommitsDesc",
    gradient: "from-orange-500 to-amber-600",
    bg: "from-orange-500/10 to-amber-500/5",
    border: "border-orange-200/60 dark:border-orange-800/40",
    icon: "💡",
  },
];

export default function Stats() {
  const { t } = useT();
  return (
    <section className="relative w-full overflow-hidden">
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <p className="section-label">{t("sections.stats.badge")}</p>
          <h2
            className="text-3xl md:text-4xl font-black"
            style={{ letterSpacing: "-0.03em" }}
          >
            {t("sections.stats.title")}
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className={`group relative p-6 md:p-8 rounded-2xl bg-gradient-to-br ${m.bg} border ${m.border} hover:scale-[1.03] transition-all duration-300 overflow-hidden`}
            >
              <div
                className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${m.gradient} opacity-20 blur-2xl group-hover:opacity-35 transition-opacity`}
              />
              <div className="relative text-center space-y-2">
                <span className="text-2xl">{m.icon}</span>
                <p
                  className={`text-4xl md:text-5xl font-black bg-gradient-to-br ${m.gradient} bg-clip-text text-transparent`}
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {m.value}
                </p>
                <p className="text-sm font-bold text-[#1d1d1f] dark:text-white">
                  {t(`sections.stats.${m.labelKey}`)}
                </p>
                <p className="text-xs text-[#aeaeb2] dark:text-[#636366] leading-relaxed">
                  {t(`sections.stats.${m.descKey}`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
