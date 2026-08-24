"use client";
import Link from "next/link";

import ContactForm from "@/components/contact/contactForm";
import DefaultLayout from "@/layouts/default";
import { useT } from "@/hooks/useT";
import { siteConfig } from "@/config/site";
import ScrollReveal from "@/components/ui/ScrollReveal";

const contactMethods = (t: (k: string) => string) => [
  {
    label: t("contact.emailMethod"),
    value: siteConfig.contact.email,
    description: t("contact.emailMethodDesc"),
    href: `mailto:${siteConfig.contact.email}`,
    gradient: "from-blue-500 to-cyan-400",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "adrián-escribano-pérez",
    description: t("contact.linkedinMethodDesc"),
    href: siteConfig.links.linkedin,
    gradient: "from-blue-600 to-blue-500",
    icon: (
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: t("contact.locationMethod"),
    value: t("contact.locationMethodValue"),
    description: t("contact.locationMethodDesc"),
    href: siteConfig.links.maps,
    gradient: "from-emerald-500 to-teal-400",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      </svg>
    ),
  },
];

const socials = [
  {
    name: "GitHub",
    href: siteConfig.links.github,
    gradient: "from-gray-600 to-gray-500",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: siteConfig.links.linkedin,
    gradient: "from-blue-600 to-blue-500",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: siteConfig.links.instagram,
    gradient: "from-pink-500 to-purple-500",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const { t } = useT();

  return (
    <DefaultLayout>
      <div className="relative">
        {/* Background decorativo */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="blob absolute top-[-100px] left-[5%] w-[450px] h-[450px] bg-gradient-radial from-violet-500/15 via-purple-400/8 to-transparent" />
          <div className="blob absolute top-[20%] right-[-5%] w-[350px] h-[350px] bg-gradient-to-bl from-pink-500/10 via-rose-400/5 to-transparent" />
          <div className="blob absolute bottom-[-60px] left-[30%] w-[400px] h-[300px] bg-gradient-to-tr from-cyan-400/10 via-blue-400/5 to-transparent" />
          <div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(99,102,241,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.8) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="space-y-16 py-4 md:py-8 w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] px-5 sm:px-8 lg:px-12">
          {/* Header */}
          <ScrollReveal>
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-300/40 dark:border-violet-700/40 text-violet-700 dark:text-violet-300 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                {t("contact.title")}
              </span>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-black hero-gradient-text"
                style={{ letterSpacing: "-0.03em" }}
              >
                {t("contact.header")}
              </h1>
              <p className="text-lg text-[#6e6e73] dark:text-[#86868b] max-w-xl">
                {t("contact.intro")}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Contact methods */}
            <div className="lg:col-span-4 space-y-4">
              <ScrollReveal direction="left">
                <h2 className="text-sm font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-widest mb-5">
                  {t("contact.findMe")}
                </h2>
              </ScrollReveal>

              {contactMethods(t).map((method, idx) => (
                <ScrollReveal key={idx} direction="left" delay={idx * 100}>
                  <Link
                    className="group block relative p-5 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-xl transition-all duration-300 no-underline overflow-hidden mb-4"
                    href={method.href}
                    rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${method.gradient} opacity-80`} />
                    <div className={`absolute -top-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-br ${method.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
                    <div className="relative flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {method.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[#1d1d1f] dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                          {method.label}
                        </p>
                        <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5">
                          {method.value}
                        </p>
                        <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-1">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}

              {/* Social links */}
              <ScrollReveal direction="left" delay={400}>
                <div className="pt-6 border-t border-black/8 dark:border-white/8">
                  <p className="text-xs font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-widest mb-4">
                    {t("contact.socialLabel")}
                  </p>
                  <div className="flex gap-3">
                    {socials.map((s, i) => (
                      <Link
                        key={i}
                        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 no-underline`}
                        href={s.href}
                        rel="noopener noreferrer"
                        target="_blank"
                        title={s.name}
                      >
                        {s.icon}
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-8">
              <ScrollReveal direction="right">
                <ContactForm />
              </ScrollReveal>
            </div>
          </div>

          {/* CTA Section */}
          <ScrollReveal>
            <div className="relative rounded-3xl overflow-hidden bg-[#0a0a0f]">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/80 via-pink-600/50 to-orange-500/60" />
              <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/30 via-transparent to-transparent" />

              <div className="absolute -top-20 left-[20%] w-60 h-60 bg-violet-500/40 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 right-[15%] w-60 h-60 bg-pink-500/40 rounded-full blur-3xl" />
              <div className="absolute top-[30%] right-[5%] w-40 h-40 bg-orange-400/30 rounded-full blur-2xl" />

              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              <div className="relative px-8 md:px-16 lg:px-24 py-16 md:py-24 text-center space-y-8">
                <div className="space-y-4">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 border border-white/20 text-white/90 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                    {t("sections.cta.badge")}
                  </span>
                  <h2
                    className="text-4xl md:text-5xl lg:text-7xl font-black text-white"
                    style={{ letterSpacing: "-0.04em" }}
                  >
                    {t("sections.cta.title")}
                  </h2>
                  <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    {t("sections.cta.desc")}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <a
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-[#1d1d1f] font-bold text-sm hover:bg-white/90 transition-all duration-200 shadow-2xl shadow-black/20 hover:scale-105"
                    href={`mailto:${siteConfig.contact.email}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                    </svg>
                    {t("sections.cta.emailBtn")}
                  </a>
                  <Link
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all duration-200 border border-white/20 no-underline hover:scale-105"
                    href={siteConfig.links.linkedin}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    LinkedIn
                  </Link>
                </div>

                <p className="text-white/40 text-xs font-medium">
                  {t("sections.cta.socialProof")}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </DefaultLayout>
  );
}
