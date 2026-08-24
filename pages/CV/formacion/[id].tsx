import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

import DefaultLayout from "@/layouts/default";
import {
  educationData,
  getEducationById,
  EducationData,
} from "@/lib/education/data";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Props {
  edu: EducationData;
}

const EDU_ICONS: Record<string, React.ReactNode> = {
  "fp-smr": (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  "fp-daw": (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  "42-madrid": (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-[#1d1d1f] dark:text-white">{title}</h2>
      {children}
    </div>
  );
}

function PillList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-black/5 dark:bg-white/10 text-[#3d3d3d] dark:text-[#c0c0c5] border border-black/8 dark:border-white/10">
          {item}
        </span>
      ))}
    </div>
  );
}

function BulletList({ items, color }: { items: string[]; color?: string }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed">
          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${color || "from-violet-500 to-pink-500"} flex-shrink-0 mt-2`} />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function FormacionPage({ edu }: Props) {
  return (
    <DefaultLayout seo={{ title: `${edu.program} | Currículum | Adrián Escribano`, description: `${edu.summary.slice(0, 155)}` }}>
      <div className="max-w-4xl mx-auto space-y-12 py-4">
        {/* Breadcrumb */}
        <ScrollReveal>
          <nav className="flex items-center gap-2 text-xs text-[#aeaeb2] dark:text-[#636366]">
            <Link className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors no-underline" href="/CV">CV</Link>
            <span>/</span>
            <span className="text-[#6e6e73] dark:text-[#86868b] truncate max-w-[250px]">{edu.program}</span>
          </nav>
        </ScrollReveal>

        {/* Hero */}
        <ScrollReveal>
          <div className="relative overflow-clip rounded-3xl p-8 md:p-10 bg-gradient-to-br from-white to-[#f5f5f7] dark:from-[#111116] dark:to-[#0d0d12] border border-black/8 dark:border-white/8">
            <div className={`blob absolute -top-20 -right-20 w-[400px] h-[400px] bg-gradient-to-bl ${edu.color} opacity-10 -z-10`} />
            <div className="blob absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-gradient-to-tr from-cyan-400/8 to-transparent -z-10" />
            <div
              className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
              style={{
                backgroundImage: "linear-gradient(rgba(99,102,241,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.8) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative flex items-start gap-6 flex-wrap">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${edu.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                {EDU_ICONS[edu.id] || <span className="text-sm font-bold">{edu.level}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-widest mb-1">{edu.levelFull}</p>
                <h1 className="text-2xl md:text-3xl font-bold text-[#1d1d1f] dark:text-white leading-tight mb-1" style={{ letterSpacing: "-0.02em" }}>
                  {edu.program}
                </h1>
                <p className="text-base font-semibold text-violet-600 dark:text-violet-400">{edu.institution}</p>
                <div className="flex items-center gap-4 mt-3 flex-wrap">
                  <span className="flex items-center gap-1.5 text-sm text-[#6e6e73] dark:text-[#86868b]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                    </svg>
                    {edu.year}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-[#6e6e73] dark:text-[#86868b]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                    </svg>
                    {edu.location}
                  </span>
                  {edu.url && (
                    <a className="flex items-center gap-1.5 text-sm text-[#6e6e73] dark:text-[#86868b] hover:text-violet-600 dark:hover:text-violet-400 transition-colors" href={edu.url} rel="noopener noreferrer" target="_blank">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                      </svg>
                      Repositorio
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Summary + Institution */}
        <div className="grid md:grid-cols-2 gap-6">
          <ScrollReveal direction="left">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 space-y-3 h-full">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                </div>
                <h2 className="text-sm font-bold text-[#1d1d1f] dark:text-white uppercase tracking-wider">Resumen</h2>
              </div>
              <p className="text-sm text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed">{edu.summary}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 space-y-3 h-full">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                </div>
                <h2 className="text-sm font-bold text-[#1d1d1f] dark:text-white uppercase tracking-wider">Sobre el centro</h2>
              </div>
              <p className="text-sm text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed">{edu.institutionDescription}</p>
            </div>
          </ScrollReveal>
        </div>

        {/* Objectives */}
        <ScrollReveal>
          <div className="p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                </svg>
              </div>
              <Section title="Objetivos de la formación"><span /></Section>
            </div>
            <BulletList items={edu.objectives} color={edu.color} />
          </div>
        </ScrollReveal>

        {/* Competencies */}
        <ScrollReveal>
          <div className="p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                </svg>
              </div>
              <Section title="Competencias desarrolladas"><span /></Section>
            </div>
            <PillList items={edu.competencies} />
          </div>
        </ScrollReveal>

        {/* Technologies + Tools + Methodologies */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: "Tecnologías", items: edu.technologies, icon: "🔧", gradient: "from-blue-500 to-cyan-500" },
            { title: "Herramientas", items: edu.tools, icon: "🛠️", gradient: "from-violet-500 to-purple-500" },
            { title: "Metodologías", items: edu.methodologies, icon: "📋", gradient: "from-amber-500 to-orange-500" },
          ].map((col, i) => (
            <ScrollReveal key={col.title} delay={i * 80}>
              <div className="p-5 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{col.icon}</span>
                  <h3 className="text-sm font-bold text-[#1d1d1f] dark:text-white">{col.title}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {col.items.map((t, j) => (
                    <span key={j} className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/10 text-[#3d3d3d] dark:text-[#c0c0c5] border border-black/8 dark:border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Subjects */}
        <ScrollReveal>
          <div className="p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                </svg>
              </div>
              <Section title="Módulos y materias"><span /></Section>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {edu.subjects.map((subject, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${edu.color} flex-shrink-0 mt-1.5`} />
                  <div>
                    <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">{subject.name}</p>
                    {subject.description && (
                      <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5 leading-relaxed">{subject.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Projects */}
        {edu.projects.length > 0 && (
          <ScrollReveal>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-[#1d1d1f] dark:text-white">Proyectos realizados</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {edu.projects.map((project, i) => (
                  <div key={i} className="group p-5 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-bold text-sm text-[#1d1d1f] dark:text-white">{project.name}</h3>
                      {project.url && (
                        <a className="flex-shrink-0 w-7 h-7 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center text-[#6e6e73] dark:text-[#86868b] hover:text-violet-600 dark:hover:text-violet-400 transition-colors" href={project.url} rel="noopener noreferrer" target="_blank">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                          </svg>
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed mb-3">{project.description}</p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((t, j) => (
                          <span key={j} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/5 dark:bg-white/10 text-[#3d3d3d] dark:text-[#c0c0c5]">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Knowledge + Applications */}
        <div className="grid md:grid-cols-2 gap-6">
          <ScrollReveal direction="left">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                </div>
                <Section title="Conocimientos adquiridos"><span /></Section>
              </div>
              <BulletList items={edu.knowledge} color={edu.color} />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                </div>
                <Section title="Aplicaciones prácticas"><span /></Section>
              </div>
              <BulletList items={edu.applications} color={edu.color} />
            </div>
          </ScrollReveal>
        </div>

        {/* Achievements */}
        {edu.achievements && edu.achievements.length > 0 && (
          <ScrollReveal>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200/60 dark:border-amber-800/40">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <Section title="Logros destacados"><span /></Section>
              </div>
              <ul className="space-y-2">
                {edu.achievements.map((a, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed">
                    <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        )}

        {/* Full repository link */}
        {edu.url && (
          <ScrollReveal>
            <a className="block p-5 rounded-2xl bg-gradient-to-br from-emerald-500/[0.07] to-teal-400/[0.07] border border-emerald-500/15 hover:border-emerald-500/30 hover:shadow-md hover:shadow-emerald-500/5 transition-all duration-300 group" href={edu.url} rel="noopener noreferrer" target="_blank">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[#1d1d1f] dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Repositorio completo</p>
                  <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5">Todos los proyectos del Cursus en GitHub</p>
                </div>
                <svg className="w-5 h-5 text-[#aeaeb2] dark:text-[#636366] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                </svg>
              </div>
            </a>
          </ScrollReveal>
        )}

        {/* Navigation between education pages */}
        <ScrollReveal>
          <div className="pt-8 border-t border-black/8 dark:border-white/8">
            <p className="text-xs text-[#aeaeb2] dark:text-[#636366] uppercase tracking-widest mb-4">Otras formaciones</p>
            <div className="grid sm:grid-cols-3 gap-3">
              {educationData
                .filter((e) => e.id !== edu.id)
                .map((other) => (
                  <Link
                    key={other.id}
                    className="group flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-lg transition-all duration-300 no-underline"
                    href={`/CV/formacion/${other.id}`}
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${other.color} flex items-center justify-center text-white flex-shrink-0 shadow-sm`}>
                      {EDU_ICONS[other.id] || <span className="text-xs font-bold">{other.level}</span>}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                        {other.institution}
                      </p>
                      <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366] mt-0.5">{other.year}</p>
                    </div>
                  </Link>
                ))}
            </div>
            <div className="mt-4">
              <Link className="inline-flex items-center gap-2 text-sm text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors no-underline" href="/CV">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                </svg>
                Volver a Trayectoria
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </DefaultLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: educationData.map((e) => ({ params: { id: e.id } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const edu = getEducationById(params?.id as string);
  if (!edu) return { notFound: true };
  return { props: { edu } };
};
