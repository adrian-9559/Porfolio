"use client";
import { useState } from "react";

import { useT } from "@/hooks/useT";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  IconReact,
  IconNextjs,
  IconTypescript,
  IconTailwind,
  IconFramer,
  IconNodejs,
  IconExpress,
  IconDatabase,
  IconDocker,
  IconGit,
  IconVercel,
  IconAws,
  IconCode,
  IconCpu,
  IconTerminal,
} from "@/components/ui/Icons";

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
}

interface Category {
  id: string;
  nameKey: string;
  skills: Skill[];
}

const CATEGORIES: Category[] = [
  {
    id: "frontend",
    nameKey: "catFrontend",
    skills: [
      { name: "React", level: 95, icon: <IconReact className="w-4 h-4" /> },
      { name: "Next.js", level: 92, icon: <IconNextjs className="w-4 h-4" /> },
      {
        name: "TypeScript",
        level: 90,
        icon: <IconTypescript className="w-4 h-4" />,
      },
      {
        name: "Tailwind CSS",
        level: 95,
        icon: <IconTailwind className="w-4 h-4" />,
      },
      {
        name: "Framer Motion",
        level: 75,
        icon: <IconFramer className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "backend",
    nameKey: "catBackend",
    skills: [
      { name: "Node.js", level: 92, icon: <IconNodejs className="w-4 h-4" /> },
      { name: "Express", level: 90, icon: <IconExpress className="w-4 h-4" /> },
      {
        name: "REST APIs",
        level: 95,
        icon: <IconTerminal className="w-4 h-4" />,
      },
      { name: "Spring Boot", level: 55, icon: <IconCpu className="w-4 h-4" /> },
    ],
  },
  {
    id: "database",
    nameKey: "catDatabase",
    skills: [
      { name: "MySQL", level: 75, icon: <IconDatabase className="w-4 h-4" /> },
      {
        name: "SQL Server",
        level: 72,
        icon: <IconDatabase className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "devops",
    nameKey: "catDevops",
    skills: [
      { name: "Docker", level: 45, icon: <IconDocker className="w-4 h-4" /> },
      { name: "Git", level: 95, icon: <IconGit className="w-4 h-4" /> },
      { name: "Vercel", level: 92, icon: <IconVercel className="w-4 h-4" /> },
      { name: "AWS", level: 25, icon: <IconAws className="w-4 h-4" /> },
    ],
  },
  {
    id: "languages",
    nameKey: "catLanguages",
    skills: [
      {
        name: "JavaScript",
        level: 95,
        icon: <IconCode className="w-4 h-4" />,
      },
      {
        name: "TypeScript",
        level: 90,
        icon: <IconTypescript className="w-4 h-4" />,
      },
      { name: "Java", level: 72, icon: <IconCode className="w-4 h-4" /> },
      { name: "C++", level: 68, icon: <IconTerminal className="w-4 h-4" /> },
      { name: "C", level: 65, icon: <IconCode className="w-4 h-4" /> },
    ],
  },
];

function ProgressBar({ level }: { level: number }) {
  return (
    <div className="w-full h-1.5 rounded-full overflow-hidden bg-[var(--bg-surface)]">
      <div
        className="h-full rounded-full bg-[var(--text-primary)] transition-all duration-1000 ease-out"
        style={{ width: `${level}%` }}
      />
    </div>
  );
}

export default function Skills() {
  const { t } = useT();
  const [activeTab, setActiveTab] = useState("frontend");

  const activeCategory =
    CATEGORIES.find((c) => c.id === activeTab) ?? CATEGORIES[0];

  return (
    <section className="w-full">
      <div className="space-y-10">
        <ScrollReveal>
          <div className="text-center space-y-3">
            <p className="ds-section-label">{t("sections.skills.badge")}</p>
            <h2
              className="text-3xl md:text-4xl font-black"
              style={{ letterSpacing: "-0.03em", color: "var(--text-primary)" }}
            >
              {t("sections.skills.title")}
            </h2>
            <p
              className="max-w-xl mx-auto"
              style={{ color: "var(--text-secondary)" }}
            >
              {t("sections.skills.desc")}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`ds-tab ${activeTab === cat.id ? "ds-tab-active" : ""}`}
                type="button"
                onClick={() => setActiveTab(cat.id)}
              >
                {t(`sections.skills.${cat.nameKey}`)}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeCategory.skills.map((skill) => (
              <div key={skill.name} className="ds-card ds-card-compact">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[var(--bg-surface)] text-[var(--text-secondary)] flex items-center justify-center">
                      {skill.icon}
                    </span>
                    <span
                      className="font-semibold text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {skill.name}
                    </span>
                  </div>
                  <span
                    className="text-xs font-bold"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {skill.level}%
                  </span>
                </div>
                <ProgressBar level={skill.level} />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
