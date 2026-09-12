"use client";
import { Link } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import { ThemeSwitch } from "@/components/theme-switch";
import { LanguageSwitcher } from "@/components/language-switcher";
import { UserButton } from "@/features/auth/components/UserButton";
import { AuthModal } from "@/features/auth/components/AuthModal";
import { NotificationBell } from "@/features/notifications/components/NotificationBell";
import { useAuth } from "@/hooks/useAuth";
import { useT } from "@/hooks/useT";
import { siteConfig } from "@/config/site";
import { IconMenu, IconClose } from "@/components/ui/Icons";

export const Navbar = () => {
  const { t } = useT();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { isAuthenticated: isLoggedIn, loadingAuth: loading, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full flex justify-center px-4 pt-3 pb-1 pointer-events-none">
        <nav
          className={`pointer-events-auto w-full max-w-3xl flex items-center justify-between gap-4 px-3 h-12 rounded-2xl transition-all duration-300 ${
            scrolled
              ? "ds-glass shadow-lg"
              : "bg-[var(--bg-card)]/60 backdrop-blur-md border border-[var(--border-default)]"
          }`}
        >
          {/* Logo */}
          <Link
            className="flex items-center gap-2 no-underline flex-shrink-0 group"
            href="/"
          >
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[var(--color-brand-from)] via-[var(--color-brand-via)] to-[var(--color-brand-to)] flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
              <span className="text-white font-bold text-[13px] tracking-tight">
                A
              </span>
            </div>
            <span className="hidden sm:inline text-sm font-semibold text-[var(--text-primary)] tracking-tight">
              Adrián
              <span className="text-[var(--text-muted)] font-normal">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5 bg-[var(--bg-surface)]/60 rounded-xl p-0.5">
            {siteConfig.navItems.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  className={`relative px-3.5 py-1.5 rounded-[10px] text-[13px] font-medium transition-all duration-200 no-underline ${
                    active
                      ? "bg-[var(--bg-card)] text-[var(--accent)] shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
                  }`}
                  href={item.href}
                >
                  {t(item.key)}
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                className={`relative px-3.5 py-1.5 rounded-[10px] text-[13px] font-medium transition-all duration-200 no-underline ${
                  pathname === "/admin"
                    ? "bg-[var(--bg-card)] text-[var(--accent)] shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
                }`}
                href="/admin"
              >
                {t("nav.admin") ?? "Admin"}
              </Link>
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <LanguageSwitcher />
            <ThemeSwitch />

            {!loading && isLoggedIn && <NotificationBell />}

            {!loading &&
              (isLoggedIn ? (
                <UserButton />
              ) : (
                <button
                  className="ds-btn-primary !py-1.5 !px-3.5 !text-[13px] !rounded-xl"
                  onClick={() => setAuthOpen(true)}
                >
                  {t("nav.login")}
                </button>
              ))}

            {/* Mobile hamburger */}
            <button
              aria-label={menuOpen ? t("nav.menuClose") : t("nav.menuToggle")}
              className="ds-btn-icon !w-8 !h-8 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <IconClose className="w-4 h-4" />
              ) : (
                <IconMenu className="w-4 h-4" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <button
          aria-label={t("nav.menuClose")}
          className="fixed inset-0 z-40 bg-black/15 dark:bg-black/40 backdrop-blur-sm md:hidden"
          type="button"
          onClick={() => setMenuOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setMenuOpen(false);
          }}
        />
      )}

      {/* Mobile menu */}
      <div
        className={`fixed top-16 left-4 right-4 z-40 md:hidden transition-all duration-200 ${
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        <div className="ds-card !rounded-2xl overflow-hidden">
          <div className="p-2 flex flex-col gap-0.5">
            {siteConfig.navMenuItems.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium no-underline transition-colors ${
                    active
                      ? "bg-[var(--accent-light)] text-[var(--accent)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                  }`}
                  href={item.href}
                >
                  <div className="flex items-center gap-2.5">
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                    )}
                    {t(item.key)}
                  </div>
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                className={`px-4 py-2.5 rounded-xl text-sm font-medium no-underline transition-colors ${
                  pathname === "/admin"
                    ? "bg-[var(--accent-light)] text-[var(--accent)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                }`}
                href="/admin"
              >
                <div className="flex items-center gap-2.5">
                  {pathname === "/admin" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                  )}
                  {t("nav.admin") ?? "Admin"}
                </div>
              </Link>
            )}
          </div>
          {!loading && !isLoggedIn && (
            <div className="px-2 pb-2">
              <button
                className="ds-btn-primary w-full !text-sm"
                onClick={() => {
                  setMenuOpen(false);
                  setAuthOpen(true);
                }}
              >
                {t("nav.mobileLogin")}
              </button>
            </div>
          )}
        </div>
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};
