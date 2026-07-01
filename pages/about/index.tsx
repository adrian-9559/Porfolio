import DefaultLayout from "@/layouts/default";
import { useT } from "@/hooks/useT";

const TIMELINE_KEYS = [
  { year: "2021", titleKey: "about.tl2021Title", descKey: "about.tl2021Desc" },
  { year: "2022", titleKey: "about.tl2022Title", descKey: "about.tl2022Desc" },
  { year: "2023", titleKey: "about.tl2023Title", descKey: "about.tl2023Desc" },
  { year: "2024", titleKey: "about.tl2024Title", descKey: "about.tl2024Desc" },
  { year: "2025", titleKey: "about.tl2025Title", descKey: "about.tl2025Desc" },
];

const STAT_VALUE_KEYS = ["3+", "15+", "20+", "800h"];
const STAT_LABEL_KEYS = ["about.yearsExp", "about.projects", "about.techs", "about.hours"];

export default function AboutPage() {
  const { t } = useT();

  return (
    <DefaultLayout>
      <div className="relative">
        {/* Ambient gradient */}
        <div className="absolute -top-20 right-0 w-[500px] h-[400px] blob bg-gradient-to-br from-blue-400/6 via-violet-400/4 to-transparent -z-10" />
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] blob bg-gradient-to-br from-cyan-400/5 to-transparent -z-10" />

        <div className="space-y-20 md:space-y-28 py-4 md:py-8">
          {/* Header */}
          <div className="space-y-6 max-w-3xl">
            <p className="section-label">{t("about.badge")}</p>
            <h1
              className="text-5xl md:text-6xl font-bold"
              style={{ letterSpacing: "-0.03em" }}
            >
              {t("about.title")}
            </h1>
            <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed max-w-xl">
              {t("about.introFull")}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STAT_VALUE_KEYS.map((value, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 text-center hover:border-black/15 dark:hover:border-white/15 transition-colors"
              >
                <p
                  className="text-3xl font-bold gradient-text"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {value}
                </p>
                <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-1.5 font-medium">
                  {t(STAT_LABEL_KEYS[i])}
                </p>
              </div>
            ))}
          </div>

          {/* Story + specialization */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">{t("about.myStory")}</h2>
                <div className="space-y-4 text-[#6e6e73] dark:text-[#86868b] leading-relaxed text-sm">
                  <p>
                    {t("about.storyP1")}
                  </p>
                  <p>
                    {t("about.storyP2")}
                  </p>
                  <p>
                    {t("about.storyP3")}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-bold">{t("about.myApproach")}</h2>
                <ul className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-blue-600 dark:text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M5 13l4 4L19 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                          />
                        </svg>
                      </span>
                      <span className="text-sm text-[#3d3d3d] dark:text-[#c0c0c5]">
                        {t(`about.approachItem${i}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-3">
              <h2 className="text-2xl font-bold">{t("about.specialization")}</h2>
              {[
                { labelKey: "about.specFrontend", itemsKey: "about.specFrontendItems", color: "bg-blue-500" },
                { labelKey: "about.specBackend", itemsKey: "about.specBackendItems", color: "bg-emerald-500" },
                { labelKey: "about.specDB", itemsKey: "about.specDBItems", color: "bg-orange-500" },
                { labelKey: "about.specDevOps", itemsKey: "about.specDevOpsItems", color: "bg-violet-500" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className={`w-2 h-2 rounded-full ${s.color}`} />
                    <p className="text-xs font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider">
                      {t(s.labelKey)}
                    </p>
                  </div>
                  <p className="text-sm text-[#3d3d3d] dark:text-[#c0c0c5]">
                    {t(s.itemsKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Timeline – fixed layout ── */}
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="section-label">{t("about.career")}</p>
              <h2 className="text-2xl font-bold">{t("about.timeline")}</h2>
            </div>

            <div className="relative">
              {/* Vertical line – pinned to the dot column center */}
              <div className="absolute left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-blue-500 via-blue-400/50 to-transparent" />

              <div className="space-y-0">
                {TIMELINE_KEYS.map((item, idx) => (
                  <div key={idx} className="relative flex gap-5 pb-8 last:pb-0">
                    {/* Year + dot column */}
                    <div
                      className="flex-shrink-0 flex flex-col items-center pt-0.5"
                      style={{ width: 38 }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-blue-500/20 z-10 mt-1" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-1">
                      <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-0.5 leading-none">
                        {item.year}
                      </p>
                      <h3 className="font-semibold text-[#1d1d1f] dark:text-white text-sm">
                        {t(item.titleKey)}
                      </h3>
                      <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1 leading-relaxed">
                        {t(item.descKey)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
