import { useT } from "@/hooks/useT";

interface SkillCategory {
  nameKey: string;
  gradient: string;
  chipBg: string;
  items: string[];
}

const skills: SkillCategory[] = [
  {
    nameKey: "catFrontend",
    gradient: "from-violet-500 to-purple-600",
    chipBg:
      "bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 border-violet-200/60 dark:border-violet-800/40",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    nameKey: "catBackend",
    gradient: "from-emerald-500 to-teal-600",
    chipBg:
      "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/40",
    items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"],
  },
  {
    nameKey: "catDevops",
    gradient: "from-pink-500 to-rose-600",
    chipBg:
      "bg-pink-50 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300 border-pink-200/60 dark:border-pink-800/40",
    items: ["Git", "Docker", "Linux", "Vercel", "AWS", "NGINX"],
  },
  {
    nameKey: "catLanguages",
    gradient: "from-orange-500 to-amber-600",
    chipBg:
      "bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border-orange-200/60 dark:border-orange-800/40",
    items: ["JavaScript", "TypeScript", "C", "C++", "Java", "SQL"],
  },
];

export default function Skills() {
  const { t } = useT();
  return (
    <section className="relative w-full overflow-clip">
      <div className="blob absolute -top-20 -right-20 w-[400px] h-[400px] bg-gradient-to-bl from-pink-400/8 via-violet-400/5 to-transparent -z-10" />

      <div className="space-y-10">
        <div className="text-center space-y-2">
          <p className="section-label">{t("sections.skills.badge")}</p>
          <h2
            className="text-3xl md:text-4xl font-black"
            style={{ letterSpacing: "-0.03em" }}
          >
            {t("sections.skills.title")}
          </h2>
          <p className="text-[#6e6e73] dark:text-[#86868b] max-w-xl mx-auto text-sm">
            {t("sections.skills.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((cat, idx) => (
            <div
              key={idx}
              className="group relative p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30 transition-all duration-300 overflow-hidden"
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${cat.gradient} opacity-[0.07] rounded-bl-[80px] group-hover:opacity-[0.12] transition-opacity`}
              />
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${cat.gradient} flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  />
                  <h3 className="font-bold text-[#1d1d1f] dark:text-white">
                    {t(`sections.skills.${cat.nameKey}`)}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${cat.chipBg} transition-transform hover:scale-105 cursor-default`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
