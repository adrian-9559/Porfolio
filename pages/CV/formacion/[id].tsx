import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

import DefaultLayout from "@/layouts/default";
import {
  educationData,
  getEducationById,
  EducationData,
} from "@/lib/education/data";

interface Props {
  edu: EducationData;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-foreground">
        {title}
      </h2>
      {children}
    </div>
  );
}

function PillList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span key={i} className="tag-chip">
          {item}
        </span>
      ))}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 text-sm text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed"
        >
          <svg
            className="w-4 h-4 text-accent flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function FormacionPage({ edu }: Props) {
  return (
    <DefaultLayout
      seo={{
        title: `${edu.program} | Currículum | Adrián Escribano`,
        description: `${edu.summary.slice(0, 155)}`,
      }}
    >
      <div className="max-w-4xl mx-auto space-y-12 py-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted/60">
          <Link
            className="hover:text-muted transition-colors no-underline"
            href="/CV"
          >
            CV
          </Link>
          <span>/</span>
          <span className="text-muted truncate max-w-[250px]">
            {edu.program}
          </span>
        </nav>

        {/* Hero */}
        <div className="relative overflow-clip rounded-3xl p-8 md:p-10 bg-gradient-to-br from-white to-[#f5f5f7] dark:from-[#111116] dark:to-[#0d0d12] border-border">
          <div
            className={`blob absolute -top-20 -right-20 w-[400px] h-[400px] bg-gradient-to-bl ${edu.color} opacity-10 -z-10`}
          />
          <div className="flex items-start gap-6 flex-wrap">
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${edu.color} flex items-center justify-center text-white text-sm font-bold shadow-lg flex-shrink-0`}
            >
              {edu.level}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-muted/60 uppercase tracking-widest mb-1">
                {edu.levelFull}
              </p>
              <h1
                className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-1"
                style={{ letterSpacing: "-0.02em" }}
              >
                {edu.program}
              </h1>
              <p className="text-base font-semibold text-accent">
                {edu.institution}
              </p>
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <span className="flex items-center gap-1.5 text-sm text-muted">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  {edu.year}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                    <path
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                    {edu.location}
                </span>
                {edu.url && (
                  <a
                    className="flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors"
                    href={edu.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    Repositorio
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Summary + Institution */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-surface border-border space-y-3">
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">
              Resumen
            </h2>
            <p className="text-sm text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed">
              {edu.summary}
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-surface border-border space-y-3">
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">
              Sobre el centro
            </h2>
            <p className="text-sm text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed">
              {edu.institutionDescription}
            </p>
          </div>
        </div>

        {/* Objectives */}
        <div className="p-6 rounded-2xl bg-surface border-border">
          <Section title="Objetivos de la formación">
            <BulletList items={edu.objectives} />
          </Section>
        </div>

        {/* Competencies */}
        <div className="p-6 rounded-2xl bg-surface border-border">
          <Section title="Competencias desarrolladas">
            <PillList items={edu.competencies} />
          </Section>
        </div>

        {/* Technologies + Tools + Methodologies */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-surface border-border space-y-3">
            <h3 className="text-sm font-bold text-foreground">
              Tecnologías
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {edu.technologies.map((t, i) => (
                <span key={i} className="tag-chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-surface border-border space-y-3">
            <h3 className="text-sm font-bold text-foreground">
              Herramientas
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {edu.tools.map((t, i) => (
                <span key={i} className="tag-chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-surface border-border space-y-3">
            <h3 className="text-sm font-bold text-foreground">
              Metodologías
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {edu.methodologies.map((m, i) => (
                <span key={i} className="tag-chip">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Subjects */}
        <div className="p-6 rounded-2xl bg-surface border-border">
          <Section title="Módulos y materias">
            <div className="grid sm:grid-cols-2 gap-3">
              {edu.subjects.map((subject, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl bg-default"
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full bg-gradient-to-b ${edu.color} flex-shrink-0 mt-1.5`}
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {subject.name}
                    </p>
                    {subject.description && (
                      <p className="text-xs text-muted mt-0.5 leading-relaxed">
                        {subject.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* Projects */}
        {edu.projects.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">
              Proyectos realizados
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {edu.projects.map((project, i) => (
                <div
                  key={i}
                  className="group p-5 rounded-2xl bg-surface border-border hover:border-border/30 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-bold text-sm text-foreground">
                      {project.name}
                    </h3>
                    {project.url && (
                      <a
                        className="flex-shrink-0 w-7 h-7 rounded-lg bg-default flex items-center justify-center text-muted hover:text-accent hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
                        href={project.url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-muted leading-relaxed mb-3">
                    {project.description}
                  </p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((t, j) => (
                        <span
                          key={j}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-default text-muted border-border/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Knowledge + Applications */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-surface border-border">
            <Section title="Conocimientos adquiridos">
              <BulletList items={edu.knowledge} />
            </Section>
          </div>
          <div className="p-6 rounded-2xl bg-surface border-border">
            <Section title="Aplicaciones prácticas">
              <BulletList items={edu.applications} />
            </Section>
          </div>
        </div>

        {/* Achievements */}
        {edu.achievements && edu.achievements.length > 0 && (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-100 dark:border-amber-900/40">
            <Section title="Logros destacados">
              <ul className="space-y-2">
                {edu.achievements.map((a, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed"
                  >
                    <svg
                      className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {a}
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        )}

        {/* Full repository link */}
        {edu.url && (
          <a
            className="block p-5 rounded-2xl bg-gradient-to-br from-emerald-500/[0.07] to-teal-400/[0.07] border border-emerald-500/15 hover:border-emerald-500/30 hover:shadow-md hover:shadow-emerald-500/5 transition-all duration-200 group"
            href={edu.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                  Repositorio completo
                </p>
                <p className="text-xs text-muted mt-0.5">
                  Todos los proyectos del Cursus en GitHub
                </p>
              </div>
              <svg
                className="w-5 h-5 text-muted group-hover:text-accent transition-colors flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
          </a>
        )}

        {/* Navigation between education pages */}
        <div className="pt-4 border-t border-black/8 dark:border-white/8">
          <p className="text-xs text-muted/60 uppercase tracking-widest mb-4">
            Otras formaciones
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {educationData
              .filter((e) => e.id !== edu.id)
              .map((other) => (
                <Link
                  key={other.id}
                  className="group flex items-center gap-3 p-4 rounded-xl bg-surface border-border hover:border-border/30 hover:shadow-sm transition-all no-underline"
                  href={`/CV/formacion/${other.id}`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${other.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                  >
                    {other.level}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate group-hover:text-accent transition-colors">
                      {other.institution}
                    </p>
                    <p className="text-[10px] text-muted/60 mt-0.5">
                      {other.year}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
          <div className="mt-4">
            <Link
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors no-underline"
              href="/CV"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M15 19l-7-7 7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              Volver a Trayectoria
            </Link>
          </div>
        </div>
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
