import type { HeadProps } from "./head";

import { Head } from "./head";

import { Navbar } from "@/components/navbar";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import CookieConsent from "@/components/CookieConsent";
import { useT } from "@/hooks/useT";
import { siteConfig } from "@/config/site";

interface DefaultLayoutProps {
  children: React.ReactNode;
  seo?: HeadProps;
}

export default function DefaultLayout({ children, seo }: DefaultLayoutProps) {
  const { t } = useT();

  return (
    <div
      className="relative flex flex-col min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <Head {...seo} />
      <AnalyticsTracker />
      <CookieConsent />
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-8 md:py-12">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-[var(--border-default)]">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-12">
          {/* Top section: 4 columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[var(--color-brand-from)] via-[var(--color-brand-via)] to-[var(--color-brand-to)] flex items-center justify-center text-white font-bold text-xs">
                  A
                </div>
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  Adrián
                  <span className="text-[var(--text-muted)] font-normal">
                    .
                  </span>
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
                {t("footer.description")}
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
                {t("footer.navTitle")}
              </h4>
              <ul className="space-y-2.5">
                {siteConfig.navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors no-underline"
                      href={item.href}
                    >
                      {t(item.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Campus */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
                {t("footer.campusTitle")}
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors no-underline"
                    href="/campus"
                  >
                    {t("nav.campus")}
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors no-underline"
                    href="/campus/guias"
                  >
                    {t("nav.blogGuides")}
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors no-underline"
                    href="/campus/tutoriales"
                  >
                    {t("footer.tutorials")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
                {t("footer.contactTitle")}
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors no-underline"
                    href={`mailto:${siteConfig.contact.email}`}
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors no-underline"
                    href={siteConfig.links.github}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors no-underline"
                    href={siteConfig.links.linkedin}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[var(--border-default)] pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[var(--text-muted)]">
                {t("footer.copyright", { year: new Date().getFullYear() })}
              </p>
              <div className="flex items-center gap-4">
                <a
                  className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors no-underline"
                  href="#"
                >
                  {t("footer.privacy")}
                </a>
                <a
                  className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors no-underline"
                  href="#"
                >
                  {t("footer.terms")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
