"use client";
import { useState } from "react";
import { useT } from "@/hooks/useT";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface Category {
  id: string;
  nameKey: string;
  gradient: string;
  skills: Skill[];
}

const CATEGORIES: Category[] = [
  {
    id: "frontend",
    nameKey: "catFrontend",
    gradient: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React", level: 95, icon: "⚛️" },
      { name: "Next.js", level: 92, icon: "▲" },
      { name: "TypeScript", level: 90, icon: "TS" },
      { name: "Tailwind CSS", level: 95, icon: "🎨" },
      { name: "Framer Motion", level: 75, icon: "✨" },
    ],
  },
  {
    id: "backend",
    nameKey: "catBackend",
    gradient: "from-emerald-500 to-teal-500",
    skills: [
      { name: "Node.js", level: 92, icon: "🟢" },
      { name: "Express", level: 90, icon: "🚂" },
      { name: "REST APIs", level: 95, icon: "🔗" },
      { name: "Spring Boot", level: 55, icon: "🍃" },
    ],
  },
  {
    id: "database",
    nameKey: "catDatabase",
    gradient: "from-orange-500 to-red-500",
    skills: [
      { name: "MySQL", level: 75, icon: "🐬" },
      { name: "SQL Server", level: 72, icon: "📦" },
    ],
  },
  {
    id: "devops",
    nameKey: "catDevops",
    gradient: "from-violet-500 to-purple-500",
    skills: [
      { name: "Docker", level: 45, icon: "🐳" },
      { name: "Git", level: 95, icon: "📦" },
      { name: "Vercel", level: 92, icon: "▲" },
      { name: "AWS", level: 25, icon: "☁️" },
    ],
  },
  {
    id: "languages",
    nameKey: "catLanguages",
    gradient: "from-yellow-500 to-amber-500",
    skills: [
      { name: "JavaScript", level: 95, icon: "JS" },
      { name: "TypeScript", level: 90, icon: "TS" },
      { name: "Java", level: 72, icon: "☕" },
      { name: "C++", level: 68, icon: "⚙️" },
      { name: "C", level: 65, icon: "🔧" },
    ],
  },
];

function ProgressBar({ level, gradient }: { level: number; gradient: string }) {
  return (
    <div className="w-full h-2 rounded-full bg-black/8 dark:bg-white/10 overflow-hidden">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-1000 ease-out`}
        style={{ width: `${level}%` }}
      />
    </div>
  );
}

export default function Skills() {
  const { t } = useT();
  const [activeTab, setActiveTab] = useState("frontend");

  const activeCategory = CATEGORIES.find((c) => c.id === activeTab) ?? CATEGORIES[0];

  return (
    <section className="w-full">
      <div className="space-y-10">
        <ScrollReveal>
          <div className="text-center space-y-3">
            <p className="section-label">{t("sections.skills.badge")}</p>
            <h2 className="text-3xl md:text-4xl font-black" style={{ letterSpacing: "-0.03em" }}>
              {t("sections.skills.title")}
            </h2>
            <p className="text-[#6e6e73] dark:text-[#86868b] max-w-xl mx-auto">
              {t("sections.skills.desc")}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="flex justify-center">
            <div className="inline-flex gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    activeTab === cat.id
                      ? `bg-gradient-to-r ${cat.gradient} text-white shadow-md`
                      : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
                  }`}
                  type="button"
                >
                  {t(`sections.skills.${cat.nameKey}`)}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeCategory.skills.map((skill, i) => (
              <div
                key={skill.name}
                className="group p-5 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{skill.icon}</span>
                    <span className="font-semibold text-[#1d1d1f] dark:text-white text-sm">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#aeaeb2] dark:text-[#636366]">
                    {skill.level}%
                  </span>
                </div>
                <ProgressBar level={skill.level} gradient={activeCategory.gradient} />
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="flex justify-center gap-8 sm:gap-16 pt-4 border-t border-black/8 dark:border-white/8">
            {[
              { value: "19+", key: "summaryTechs" },
              { value: "5", key: "summaryCategories" },
              { value: "12", key: "summaryExpert" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-bold text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>
                  {s.value}
                </p>
                <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-1">
                  {t(`sections.techStack.${s.key}`)}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
