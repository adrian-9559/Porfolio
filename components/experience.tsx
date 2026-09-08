"use client";
import { useT } from "@/hooks/useT";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface TimelineItem {
  year: string;
  titleKey: string;
  descKey: string;
  gradient: string;
  techs: string[];
}

const TIMELINE: TimelineItem[] = [
  {
    year: "2025",
    titleKey: "tl2025Title",
    descKey: "tl2025Desc",
    gradient: "from-violet-500 to-purple-600",
    techs: ["C", "C++", "Algoritmos", "Sistemas"],
  },
  {
    year: "2024",
    titleKey: "tl2024Title",
    descKey: "tl2024Desc",
    gradient: "from-emerald-500 to-teal-600",
    techs: ["Spring Boot", "Java", "REST APIs"],
  },
  {
    year: "2023",
    titleKey: "tl2023Title",
    descKey: "tl2023Desc",
    gradient: "from-pink-500 to-rose-600",
    techs: ["React", "Node.js", "Supabase", "TypeScript"],
  },
  {
    year: "2022",
    titleKey: "tl2022Title",
    descKey: "tl2022Desc",
    gradient: "from-cyan-500 to-blue-600",
    techs: ["React", "Node.js", "Linux"],
  },
  {
    year: "2021",
    titleKey: "tl2021Title",
    descKey: "tl2021Desc",
    gradient: "from-orange-500 to-amber-600",
    techs: ["HTML", "CSS", "JavaScript"],
  },
];

export default function Experience() {
  const { t } = useT();

  return (
    <section className="relative w-full">
      <div className="space-y-12">
        <ScrollReveal>
          <div className="text-center space-y-2">
            <p className="ds-section-label">{t("sections.experience.title")}</p>
            <h2
              className="text-3xl md:text-4xl font-black"
              style={{ letterSpacing: "-0.03em", color: "var(--text-primary)" }}
            >
              {t("about.career")}
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500 via-pink-500 to-cyan-500 opacity-30" />

          <div className="space-y-12">
            {TIMELINE.map((item, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <ScrollReveal
                  key={item.year}
                  delay={idx * 100}
                  direction={isLeft ? "left" : "right"}
                >
                  <div
                    className={`relative flex items-start gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <div className="hidden md:block md:w-1/2" />

                    <div
                      className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10"
                      style={{
                        background: "var(--bg-card)",
                        border: "2px solid var(--accent)",
                      }}
                    >
                      <div
                        className={`w-3 h-3 rounded-full bg-gradient-to-br ${item.gradient}`}
                      />
                    </div>

                    <div
                      className={`flex-1 ml-10 md:ml-0 ${isLeft ? "md:text-right" : ""}`}
                    >
                      <div
                        className={`inline-block p-6 rounded-2xl ds-card hover:shadow-lg transition-all duration-300 max-w-md ${isLeft ? "md:ml-auto" : "md:mr-auto"}`}
                      >
                        <div
                          className={`flex items-center gap-3 mb-3 ${isLeft ? "md:justify-end" : ""}`}
                        >
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${item.gradient}`}
                          >
                            {item.year}
                          </span>
                        </div>
                        <h3
                          className="text-lg font-bold mb-2"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {t(`about.${item.titleKey}`)}
                        </h3>
                        <p
                          className="text-sm leading-relaxed mb-4"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {t(`about.${item.descKey}`)}
                        </p>
                        <div
                          className={`flex flex-wrap gap-1.5 ${isLeft ? "md:justify-end" : ""}`}
                        >
                          {item.techs.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                              style={{
                                background: "var(--bg-surface)",
                                color: "var(--text-primary)",
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
