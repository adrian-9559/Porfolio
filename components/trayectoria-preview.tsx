"use client";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useT } from "@/hooks/useT";
import {
  IconTerminal,
  IconCpu,
  IconReact,
  IconNodejs,
  IconCode,
} from "@/components/ui/Icons";

const TIMELINE = [
  {
    year: "2025",
    titleKey: "home.tray2025Title",
    descKey: "home.tray2025Desc",
    tags: ["C", "C++", "Algoritmos", "Sistemas"],
    icon: <IconTerminal className="w-4 h-4" />,
  },
  {
    year: "2024",
    titleKey: "home.tray2024Title",
    descKey: "home.tray2024Desc",
    tags: ["Spring Boot", "Java", "REST APIs"],
    icon: <IconCpu className="w-4 h-4" />,
  },
  {
    year: "2023",
    titleKey: "home.tray2023Title",
    descKey: "home.tray2023Desc",
    tags: ["React", "Node.js", "Supabase", "TypeScript"],
    icon: <IconReact className="w-4 h-4" />,
  },
  {
    year: "2022",
    titleKey: "home.tray2022Title",
    descKey: "home.tray2022Desc",
    tags: ["React", "Node.js", "Linux"],
    icon: <IconNodejs className="w-4 h-4" />,
  },
  {
    year: "2021",
    titleKey: "home.tray2021Title",
    descKey: "home.tray2021Desc",
    tags: ["HTML", "CSS", "JavaScript"],
    icon: <IconCode className="w-4 h-4" />,
  },
];

export default function TrayectoriaPreview() {
  const { t } = useT();

  return (
    <section className="relative" id="trayectoria-preview">
      <div className="space-y-8">
        {/* Header */}
        <ScrollReveal>
          <div className="space-y-3">
            <span className="ds-section-label">{t("home.trayBadge")}</span>
            <h2
              className="text-3xl md:text-4xl font-black text-[var(--text-primary)]"
              style={{ letterSpacing: "-0.03em" }}
            >
              {t("home.trayTitle")}
            </h2>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Gradient vertical line */}
          <div
            className="absolute left-[19px] top-2 bottom-2 w-px"
            style={{
              background:
                "linear-gradient(to bottom, var(--accent), var(--border-default))",
              opacity: 0.4,
            }}
          />

          <div className="space-y-4">
            {TIMELINE.map((item, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div className="relative flex gap-5 group">
                  {/* Dot with icon */}
                  <div className="relative z-10 flex-shrink-0 mt-4">
                    <div className="w-[10px] h-[10px] rounded-full border-2 border-[var(--accent)] bg-[var(--bg-card)] group-hover:bg-[var(--accent)] transition-colors duration-300" />
                  </div>

                  {/* Card */}
                  <div className="flex-1 min-w-0 ds-card ds-card-compact ds-card-interactive">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                        {item.icon}
                      </div>
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                        style={{
                          color: "var(--accent)",
                          background:
                            "var(--accent-light, rgba(124,58,237,0.1))",
                        }}
                      >
                        {item.year}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">
                      {t(item.titleKey)}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
                      {t(item.descKey)}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span key={tag} className="ds-badge">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
