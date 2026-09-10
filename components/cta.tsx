"use client";
import { Envelope, LogoLinkedin } from "@gravity-ui/icons";
import Link from "next/link";

import { useT } from "@/hooks/useT";
import { siteConfig } from "@/config/site";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CTA() {
  const { t } = useT();

  return (
    <section className="w-full">
      <ScrollReveal>
        <div className="ds-card px-8 md:px-16 py-16 md:py-24 text-center space-y-8">
          <div className="space-y-4">
            <span className="ds-section-label">{t("sections.cta.badge")}</span>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text-primary)]"
              style={{ letterSpacing: "-0.04em" }}
            >
              {t("sections.cta.title")}
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-lg mx-auto leading-relaxed">
              {t("sections.cta.desc")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-card)] font-bold text-sm transition-all duration-200 hover:opacity-90 no-underline"
              href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent("Contacto desde tu portfolio")}&body=${encodeURIComponent("Hola Adrián,\n\nMe gustaría contactar contigo para...")}`}
            >
              <Envelope className="w-4 h-4" />
              {t("sections.cta.emailBtn")}
            </a>
            <Link
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-[var(--border-default)] text-[var(--text-primary)] font-bold text-sm transition-all duration-200 hover:border-[var(--accent)] no-underline"
              href={siteConfig.links.linkedin}
              rel="noopener noreferrer"
              target="_blank"
            >
              <LogoLinkedin className="w-4 h-4" />
              LinkedIn
            </Link>
          </div>

          <p className="text-[var(--text-muted)] text-xs font-medium">
            {t("sections.cta.socialProof")}
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
