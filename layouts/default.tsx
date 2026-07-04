import type { HeadProps } from "./head";

import { Head } from "./head";

import { Navbar } from "@/components/navbar";
import { useT } from "@/hooks/useT";
import { siteConfig } from "@/config/site";

interface DefaultLayoutProps {
  children: React.ReactNode;
  seo?: HeadProps;
}

export default function DefaultLayout({ children, seo }: DefaultLayoutProps) {
  const { t } = useT();
  return (
    <div className="relative flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Head {...seo} />
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8 md:py-12">
          {children}
        </div>
      </main>
      <footer className="mt-auto">
        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 py-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Brand */}
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                  A
                </div>
                <span className="text-sm font-medium text-foreground">
                  {t("footer.brandName")}
                </span>
              </div>

              {/* Links */}
              <div className="flex items-center gap-6">
                <a
                  className="text-sm text-muted hover:text-foreground transition-colors"
                  href={siteConfig.links.github}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  GitHub
                </a>
                <a
                  className="text-sm text-muted hover:text-foreground transition-colors"
                  href={siteConfig.links.linkedin}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
                <a
                  className="text-sm text-muted hover:text-foreground transition-colors"
                  href={`mailto:${siteConfig.contact.email}`}
                >
                  {t("contact.email")}
                </a>
              </div>

              {/* Copyright */}
              <p className="text-xs text-muted/60">
                {t("footer.copyright", { year: new Date().getFullYear() })}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
