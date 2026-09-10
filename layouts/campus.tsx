"use client";
import type { HeadProps } from "./head";
import type { CampusUserXP } from "@/types/campus";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { Head } from "./head";
import { Navbar } from "@/components/navbar";
import { useT } from "@/hooks/useT";
import { useAuth } from "@/hooks/useAuth";
import { siteConfig } from "@/config/site";
import { campusService } from "@/services/campusService";
import { XpBadge } from "@/components/campus/XpBadge";

// ── User avatar / menu ───────────────────────────────────────────────────────

function UserMenu() {
  const { t } = useT();
  const { isAuthenticated, user } = useAuth();
  const [open, setOpen] = useState(false);
  const [userXp, setUserXp] = useState<CampusUserXP | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    campusService.getXP().then(setUserXp).catch(() => {});
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  const initials = user?.profile?.full_name
    ? user.profile.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="relative">
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={user?.profile?.full_name ?? "Menú de usuario"}
        className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-[var(--bg-hover)] transition-colors min-h-[44px]"
        type="button"
        onClick={() => setOpen(!open)}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-brand-from)] via-[var(--color-brand-via)] to-[var(--color-brand-to)] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {initials}
        </div>
        {userXp && (
          <span className="hidden sm:block">
            <XpBadge compact level={userXp.level} xp={userXp.total_xp} />
          </span>
        )}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div
            aria-label="Menú de usuario"
            className="absolute right-0 top-full mt-2 z-50 w-56 py-2 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-xl shadow-xl"
            role="menu"
          >
            <div className="px-4 py-2 border-b border-[var(--border-default)]">
              <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                {user?.profile?.full_name ?? user?.email ?? "Usuario"}
              </p>
              <p className="text-xs text-[var(--text-muted)] truncate">
                {user?.email ?? ""}
              </p>
            </div>
            <Link
              className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition-colors no-underline"
              href="/dashboard"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              {t("nav.dashboard")}
            </Link>
            <Link
              className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition-colors no-underline"
              href="/settings"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              {t("nav.settings")}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

// ── Main layout ───────────────────────────────────────────────────────────────

interface CampusLayoutProps {
  children: React.ReactNode;
  seo?: HeadProps;
}

export default function CampusLayout({ children, seo }: CampusLayoutProps) {
  const { t } = useT();
  const router = useRouter();
  const currentPath = router.asPath.split("?")[0] ?? router.asPath;

  const navItems = [
    { href: "/campus", label: t("nav.campusHome") },
    { href: "/campus/cursos", label: t("nav.campusGuides") },
    { href: "/campus/retos", label: "Retos" },
  ];

  return (
    <div className="relative flex flex-col min-h-screen bg-[var(--bg-primary)] overflow-x-clip">
      <Head {...seo} />
      <Navbar />

      {/* Skip link */}
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-[var(--accent-text)] focus:rounded-xl focus:text-sm focus:font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        href="#main-content"
      >
        {t("nav.skipToContent")}
      </a>

      {/* Campus header nav */}
      <header className="sticky top-0 z-[var(--z-sticky)] border-b border-[var(--border-default)] bg-[var(--bg-primary)]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Left: Campus brand + nav */}
          <div className="flex items-center gap-6">
            <Link
              className="flex items-center gap-2 no-underline group"
              href="/campus"
            >
              <div className="w-7 h-7 rounded-lg bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                <svg
                  aria-hidden="true"
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 14l9-5-9-5-9 5 9 5z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                  <path
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                  <path
                    d="M12 14l9-5-9-5-9 5 9 5zM12 14v7m0-7l6.16-3.422"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <span className="text-sm font-bold text-[var(--text-primary)] hidden sm:block">
                Campus
              </span>
            </Link>

            <nav aria-label="Navegación del Campus">
              <ul className="flex items-center gap-1" role="list">
                {navItems.map((item) => {
                  const isActive =
                    item.href === "/campus"
                      ? currentPath === "/campus"
                      : currentPath.startsWith(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        aria-current={isActive ? "page" : undefined}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors no-underline ${
                          isActive
                            ? "bg-[var(--accent-light)] text-[var(--accent)]"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
                        }`}
                        href={item.href}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Right: Certificados link + User menu */}
          <div className="flex items-center gap-3">
            <Link
              aria-label="Mis certificados"
              className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline hidden sm:block"
              href="/campus/certificados"
            >
              🎓 Certificados
            </Link>
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1" id="main-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border-default)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[var(--color-brand-from)] via-[var(--color-brand-via)] to-[var(--color-brand-to)] flex items-center justify-center text-white font-bold text-[9px]">
                A
              </div>
              <span className="text-xs font-medium text-[var(--text-primary)]">
                {t("footer.brandName")}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a
                aria-label="GitHub (abre en nueva pestaña)"
                className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors no-underline"
                href={siteConfig.links.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
              <a
                aria-label="LinkedIn (abre en nueva pestaña)"
                className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors no-underline"
                href={siteConfig.links.linkedin}
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
              <a
                className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors no-underline"
                href={`mailto:${siteConfig.contact.email}`}
              >
                {t("contact.email")}
              </a>
            </div>
            <p className="text-[10px] text-[var(--text-muted)]">
              {t("footer.copyright", { year: new Date().getFullYear() })}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
