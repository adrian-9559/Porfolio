import Link from "next/link";
import { LogoGithub, Envelope, LogoLinkedin } from "@gravity-ui/icons";

import DefaultLayout from "@/layouts/default";
import { useT } from "@/hooks/useT";
import { ExperienceSection } from "@/components/experience-section";
import { educationData } from "@/lib/education/data";
import { siteConfig } from "@/config/site";
import ScrollReveal from "@/components/ui/ScrollReveal";

const statDefs = [
  { value: "3+", labelKey: "cv.yearsExp", gradient: "from-violet-500 to-purple-600", bg: "from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/15" },
  { value: "800h", labelKey: "cv.practiceHours", gradient: "from-pink-500 to-rose-600", bg: "from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/15" },
  { value: "15+", labelKey: "cv.projects", gradient: "from-cyan-500 to-blue-600", bg: "from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/15" },
  { value: "20+", labelKey: "cv.technologies", gradient: "from-orange-500 to-amber-600", bg: "from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/15" },
];

const EDU_ICONS: Record<string, React.ReactNode> = {
  "fp-smr": (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  "fp-daw": (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  "42-madrid": (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
};

const topSkills = [
  { name: "React", level: 95 },
  { name: "Next.js", level: 92 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js", level: 92 },
  { name: "Tailwind CSS", level: 95 },
  { name: "SQL", level: 82 },
];

export default function ResumePage() {
  const { t } = useT();

  return (
    <DefaultLayout seo={{ title: t("meta.cv.title"), description: t("meta.cv.desc") }}>
      <div className="relative">
        {/* Mesh gradient background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="blob absolute top-[-100px] right-0 w-[450px] h-[350px] bg-gradient-to-bl from-violet-500/12 via-pink-400/6 to-transparent" />
          <div className="blob absolute top-1/3 -left-20 w-[350px] h-[350px] bg-gradient-to-tr from-cyan-400/8 to-transparent" />
          <div className="blob absolute bottom-0 left-1/2 w-[400px] h-[300px] bg-gradient-to-t from-amber-400/6 to-transparent" />
          <div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(99,102,241,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.8) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="space-y-20 py-4 md:py-8">
          {/* Hero */}
          <section className="text-center space-y-6">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-300/40 dark:border-violet-700/40 text-violet-700 dark:text-violet-300 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                {t("hero.available")}
              </span>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h1 className="text-5xl md:text-6xl font-black" style={{ letterSpacing: "-0.04em", lineHeight: 1.05 }}>
                {t("cv.header")}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] max-w-2xl mx-auto leading-relaxed">
                {t("cv.intro")}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
                <a
                  className="rainbow-btn px-7 py-3 text-sm font-semibold no-underline"
                  download="Adrian_Escribano_CV.pdf"
                  href="/cv/Adrian_Escribano_CV.pdf"
                >
                  {t("cv.downloadBtn")}
                </a>
                <Link
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-[#111116] border border-black/10 dark:border-white/10 text-[#1d1d1f] dark:text-white font-semibold text-sm hover:shadow-md transition-all no-underline"
                  href={siteConfig.links.linkedin}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <LogoLinkedin className="w-4 h-4" />
                  LinkedIn
                </Link>
              </div>
            </ScrollReveal>
          </section>

          {/* Stats */}
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statDefs.map((s, idx) => (
                <div key={idx} className={`group p-6 rounded-2xl text-center bg-gradient-to-br ${s.bg} border border-black/8 dark:border-white/8 hover:scale-[1.03] transition-all duration-300 overflow-hidden relative`}>
                  <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${s.gradient} opacity-20 blur-2xl group-hover:opacity-35 transition-opacity`} />
                  <p className={`text-4xl font-black bg-gradient-to-br ${s.gradient} bg-clip-text text-transparent relative`} style={{ letterSpacing: "-0.03em" }}>
                    {s.value}
                  </p>
                  <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-1.5 font-semibold uppercase tracking-wide relative">
                    {t(s.labelKey)}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Experience */}
          <ScrollReveal>
            <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8">
              <ExperienceSection />
            </div>
          </ScrollReveal>

          {/* Education Timeline */}
          <section className="space-y-8">
            <ScrollReveal>
              <div className="text-center space-y-2">
                <p className="section-label">{t("cv.education")}</p>
                <h2 className="text-3xl md:text-4xl font-black" style={{ letterSpacing: "-0.03em" }}>
                  {t("cv.education")}
                </h2>
                <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">{t("cv.hint")}</p>
              </div>
            </ScrollReveal>

            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500 via-pink-500 to-cyan-500 opacity-30" />

              <div className="space-y-8">
                {educationData.map((edu, idx) => {
                  const isLeft = idx % 2 === 0;
                  return (
                    <ScrollReveal key={edu.id} direction={isLeft ? "left" : "right"} delay={idx * 100}>
                      <div className={`relative flex items-start gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                        <div className="hidden md:block md:w-1/2" />
                        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                          <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${edu.color} border-2 border-white dark:border-[#111116] shadow-md`} />
                        </div>
                        <div className={`flex-1 ml-10 md:ml-0`}>
                          <Link
                            className={`block group p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:shadow-xl hover:border-black/15 dark:hover:border-white/15 transition-all duration-300 no-underline ${isLeft ? "md:ml-auto md:text-right" : "md:mr-auto"} max-w-md`}
                            href={`/CV/formacion/${edu.id}`}
                          >
                            <div className={`flex items-center gap-3 mb-3 ${isLeft ? "md:justify-end" : ""}`}>
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-br ${edu.color} shadow-sm`}>
                                {EDU_ICONS[edu.id]}
                                {edu.level}
                              </span>
                              <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">{edu.year}</span>
                            </div>
                            <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-white mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                              {edu.institution}
                            </h3>
                            <p className="text-sm text-violet-600 dark:text-violet-400 font-medium mb-2">{edu.program}</p>
                            <p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed line-clamp-2 mb-3">{edu.summary}</p>
                            <div className={`flex flex-wrap gap-1.5 ${isLeft ? "md:justify-end" : ""}`}>
                              {edu.technologies.slice(0, 5).map((tech, i) => (
                                <span key={i} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/5 dark:bg-white/10 text-[#3d3d3d] dark:text-[#c0c0c5]">
                                  {tech}
                                </span>
                              ))}
                              {edu.technologies.length > 5 && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium text-[#aeaeb2] dark:text-[#636366]">
                                  +{edu.technologies.length - 5}
                                </span>
                              )}
                            </div>
                          </Link>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Top Skills */}
          <ScrollReveal>
            <section className="space-y-6">
              <div className="text-center space-y-2">
                <p className="section-label">{t("sections.skills.badge")}</p>
                <h2 className="text-3xl md:text-4xl font-black" style={{ letterSpacing: "-0.03em" }}>
                  {t("sections.skills.title")}
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                {topSkills.map((skill) => (
                  <div key={skill.name} className="p-4 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm text-[#1d1d1f] dark:text-white">{skill.name}</span>
                      <span className="text-xs font-bold text-[#aeaeb2] dark:text-[#636366]">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-black/8 dark:bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-pink-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal>
            <section className="relative rounded-3xl overflow-hidden bg-[#0a0a0f]">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/80 via-pink-600/50 to-orange-500/60" />
              <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/30 via-transparent to-transparent" />
              <div className="absolute -top-20 left-[20%] w-60 h-60 bg-violet-500/40 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 right-[15%] w-60 h-60 bg-pink-500/40 rounded-full blur-3xl" />
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="relative px-8 md:px-16 py-16 md:py-20 text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-black text-white" style={{ letterSpacing: "-0.04em" }}>
                  {t("sections.cta.title")}
                </h2>
                <p className="text-white/70 text-base max-w-lg mx-auto">{t("sections.cta.desc")}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <a className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-[#1d1d1f] font-bold text-sm hover:bg-white/90 transition-all shadow-2xl shadow-black/20 hover:scale-105" href={`mailto:${siteConfig.contact.email}`}>
                    <Envelope className="w-4 h-4" />
                    {t("sections.cta.emailBtn")}
                  </a>
                  <Link className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all border border-white/20 no-underline hover:scale-105" href={siteConfig.links.linkedin} rel="noopener noreferrer" target="_blank">
                    <LogoLinkedin className="w-4 h-4" />
                    LinkedIn
                  </Link>
                </div>
                <p className="text-white/40 text-xs font-medium">{t("sections.cta.socialProof")}</p>
              </div>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </DefaultLayout>
  );
}
