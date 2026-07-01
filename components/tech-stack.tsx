import { useT } from "@/hooks/useT";

interface Category {
  nameKey: string;
  gradient: string;
  items: { name: string; level: number }[];
}

const categories: Category[] = [
  {
    nameKey: "catFrontend",
    gradient: "from-blue-500 to-cyan-500",
    items: [
      { name: "React", level: 5 },
      { name: "Next.js", level: 5 },
      { name: "TypeScript", level: 5 },
      { name: "Tailwind CSS", level: 5 },
      { name: "Framer Motion", level: 4 },
    ],
  },
  {
    nameKey: "catBackend",
    gradient: "from-emerald-500 to-teal-500",
    items: [
      { name: "Node.js", level: 5 },
      { name: "Express", level: 5 },
      { name: "REST APIs", level: 5 },
      { name: "Spring Boot", level: 3 },
    ],
  },
  {
    nameKey: "catDatabase",
    gradient: "from-orange-500 to-red-500",
    items: [
      { name: "PostgreSQL", level: 4 },
      { name: "MongoDB", level: 4 },
      { name: "MySQL", level: 4 },
      { name: "SQL Server", level: 4 },
    ],
  },
  {
    nameKey: "catDevops",
    gradient: "from-violet-500 to-purple-500",
    items: [
      { name: "Docker", level: 2 },
      { name: "Git", level: 5 },
      { name: "Vercel", level: 5 },
      { name: "AWS", level: 1 },
    ],
  },
  {
    nameKey: "catFrameworks",
    gradient: "from-pink-500 to-rose-500",
    items: [
      { name: "React", level: 4 },
      { name: "Tailwind CSS", level: 4 },
      { name: "Spring Boot", level: 3 },
      { name: "Bootstrap", level: 4 },
      { name: "nodejs", level: 5 },
    ],
  },
  {
    nameKey: "catLanguages",
    gradient: "from-yellow-500 to-amber-500",
    items: [
      { name: "JavaScript", level: 5 },
      { name: "TypeScript", level: 5 },
      { name: "Java", level: 4 },
      { name: "C++", level: 4 },
      { name: "C", level: 4 },
    ],
  },
  {
    nameKey: "catOS",
    gradient: "from-green-500 to-lime-500",
    items: [
      { name: "Linux", level: 4 },
      { name: "Windows", level: 5 },
      { name: "macOS", level: 3 },
    ],
  },
  {
    nameKey: "catServices",
    gradient: "from-indigo-500 to-blue-500",
    items: [
      { name: "DNS", level: 5 },
      { name: "NGINX", level: 4 },
      { name: "Docker", level: 1 },
    ],
  },
];

const LevelDots = ({ level }: { level: number }) => (
  <div className="flex gap-1 mt-2">
    {Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className={`h-1 w-5 rounded-full transition-colors ${
          i < level
            ? "bg-blue-500 dark:bg-blue-400"
            : "bg-black/10 dark:bg-white/15"
        }`}
      />
    ))}
  </div>
);

export default function TechStack() {
  const { t } = useT();
  return (
    <section className="w-full">
      <div className="space-y-10">
        <div className="text-center space-y-3">
          <p className="section-label">{t("sections.techStack.badge")}</p>
          <h2 className="text-3xl md:text-4xl font-bold">{t("sections.techStack.title")}</h2>
          <p className="text-[#6e6e73] dark:text-[#86868b] max-w-xl mx-auto">
            {t("sections.techStack.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8"
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cat.gradient}`}
                />
                <h3 className="font-semibold text-[#1d1d1f] dark:text-white">
                  {t(`sections.techStack.${cat.nameKey}`)}
                </h3>
              </div>

              <div className="space-y-4">
                {cat.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#3d3d3d] dark:text-[#c0c0c5]">
                      {item.name}
                    </span>
                    <LevelDots level={item.level} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-8 sm:gap-16 pt-4 border-t border-black/8 dark:border-white/8">
          {[
            { value: "19+", key: "summaryTechs" },
            { value: "4", key: "summaryCategories" },
            { value: "12", key: "summaryExpert" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p
                className="text-2xl font-bold text-[#1d1d1f] dark:text-white"
                style={{ letterSpacing: "-0.02em" }}
              >
                {s.value}
              </p>
              <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-1">
                {t(`sections.techStack.${s.key}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
