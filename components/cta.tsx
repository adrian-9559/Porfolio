import { Envelope, LogoLinkedin } from "@gravity-ui/icons";
import Link from "next/link";
import { useT } from "@/hooks/useT";

import { siteConfig } from "@/config/site";

export default function CTA() {
  const { t } = useT();
  return (
    <section className="w-full">
      <div className="relative rounded-3xl overflow-hidden bg-[#0a0a0f]">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/80 via-pink-600/50 to-orange-500/60" />
        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/30 via-transparent to-transparent" />

        <div className="absolute -top-20 left-[20%] w-60 h-60 bg-violet-500/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-[15%] w-60 h-60 bg-pink-500/40 rounded-full blur-3xl" />
        <div className="absolute top-[30%] right-[5%] w-40 h-40 bg-orange-400/30 rounded-full blur-2xl" />

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative px-8 md:px-16 py-16 md:py-24 text-center space-y-8">
          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 border border-white/20 text-white/90 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              {t("sections.cta.badge")}
            </span>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white"
              style={{ letterSpacing: "-0.04em" }}
            >
              {t("sections.cta.title")}
            </h2>
            <p className="text-white/70 text-lg max-w-lg mx-auto leading-relaxed">
              {t("sections.cta.desc")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-[#1d1d1f] font-bold text-sm hover:bg-white/90 transition-all duration-200 shadow-2xl shadow-black/20 hover:scale-105"
              href={`mailto:${siteConfig.contact.email}`}
            >
              <Envelope className="w-4 h-4" />
              {t("sections.cta.emailBtn")}
            </a>
            <Link
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all duration-200 border border-white/20 no-underline hover:scale-105"
              href={siteConfig.links.linkedin}
              rel="noopener noreferrer"
              target="_blank"
            >
              <LogoLinkedin className="w-4 h-4" />
              LinkedIn
            </Link>
          </div>

          <p className="text-white/40 text-xs font-medium">
            {t("sections.cta.socialProof")}
          </p>
        </div>
      </div>
    </section>
  );
}
