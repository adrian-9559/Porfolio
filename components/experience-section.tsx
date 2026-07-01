"use client";
import { useState } from "react";
import { useT } from "@/hooks/useT";

const experiences = [
  {
    company: "Empresa de Sistemas e Infraestructura",
    role: "Técnico de Prácticas — Grado Medio",
    period: "2022",
    hours: "400h",
    description:
      "Prácticas en mantenimiento preventivo y correctivo de equipos informáticos y gestión de infraestructura de redes corporativas.",
    responsibilities: [
      "Mantenimiento preventivo y correctivo de equipos",
      "Instalación y configuración de sistemas operativos",
      "Gestión de redes corporativas",
      "Soporte técnico a usuarios",
      "Backup y recuperación de datos",
    ],
    technologies: [
      "Windows Server",
      "Linux",
      "Redes TCP/IP",
      "Active Directory",
      "Virtualización",
    ],
    color: "from-violet-500 to-purple-400",
  },
  {
    company: "Consultora de Programación",
    role: "Desarrollador Web Júnior — Grado Superior",
    period: "2024",
    hours: "400h",
    description:
      "Desarrollo de plataformas web completas en una consultora especializada, participando en todo el ciclo de vida del software.",
    responsibilities: [
      "Desarrollo de plataformas web full-stack",
      "Diseño de arquitectura de aplicaciones",
      "Desarrollo de APIs RESTful",
      "Diseño e implementación de bases de datos",
      "Testing, debugging y documentación técnica",
    ],
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "Git",
    ],
    color: "from-blue-500 to-cyan-400",
  },
];

export function ExperienceSection() {
  const { t } = useT();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-white">
          {t("sections.experience.title")}
        </h3>
        <p className="text-sm text-[#aeaeb2] dark:text-[#636366] mt-1.5">
          {t("sections.experience.hint")}
        </p>
      </div>

      <div className="space-y-3">
        {experiences.map((exp, idx) => {
          const isOpen = expandedIndex === idx;

          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                isOpen
                  ? "border-blue-200 dark:border-blue-800/60 bg-blue-50/50 dark:bg-blue-950/20"
                  : "border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] hover:border-black/15 dark:hover:border-white/15"
              }`}
              onClick={() => setExpandedIndex(isOpen ? null : idx)}
            >
              {/* Header */}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Color dot */}
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${exp.color} flex-shrink-0 mt-0.5`}
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-semibold text-[#1d1d1f] dark:text-white">
                          {exp.role}
                        </h4>
                        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-0.5">
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 text-right">
                        <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                          {exp.period}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
                          {exp.hours}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-3 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  {/* Chevron */}
                  <svg
                    className={`w-4 h-4 text-[#aeaeb2] flex-shrink-0 mt-1 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M19 9l-7 7-7-7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
              </div>

              {/* Expanded */}
              {isOpen && (
                <div className="px-6 pb-6 pt-0 border-t border-blue-100 dark:border-blue-900/40 space-y-5">
                  <div className="pt-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#aeaeb2] dark:text-[#636366] mb-3">
                      {t("sections.experience.responsibilities")}
                    </p>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((r, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-[#3d3d3d] dark:text-[#c0c0c5]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#aeaeb2] dark:text-[#636366] mb-3">
                      {t("sections.experience.technologies")}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="tag-chip">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
