"use client";
import { Link } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import { ThemeSwitch } from "@/components/theme-switch";
import { UserButton } from "@/features/auth/components/UserButton";
import { AuthModal } from "@/features/auth/components/AuthModal";
import { NotificationBell } from "@/features/notifications/components/NotificationBell";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useAuth } from "@/hooks/useAuth";
import { useT } from "@/hooks/useT";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
  const { t } = useT();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { isAuthenticated: isLoggedIn, loadingAuth: loading } = useAuth();

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
              ? "bg-white/85 dark:bg-[#111116]/90 backdrop-blur-xl shadow-lg shadow-black/[0.06] dark:shadow-black/30 border border-black/[0.07] dark:border-white/[0.07]"
              : "bg-white/60 dark:bg-[#111116]/60 backdrop-blur-md border border-black/[0.05] dark:border-white/[0.05]"
          }`}
        >
          {/* Logo */}
          <Link
            className="flex items-center gap-2 no-underline flex-shrink-0 group"
            href="/"
          >
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600 flex items-center justify-center shadow-sm group-hover:shadow-indigo-400/40 group-hover:shadow-md transition-all duration-300">
              <span className="text-white font-bold text-[13px] tracking-tight">
                A
              </span>
            </div>
            <span className="hidden sm:inline text-sm font-semibold text-[#1d1d1f] dark:text-white tracking-tight">
              Adrián
              <span className="text-[#aeaeb2] dark:text-[#636366] font-normal">
                .
              </span>
            </span>
          </Link>

          {/* Desktop nav — centered pill group */}
          <div className="hidden md:flex items-center gap-0.5 bg-black/[0.04] dark:bg-white/[0.05] rounded-xl p-0.5">
            {siteConfig.navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  className={`relative px-3.5 py-1.5 rounded-[10px] text-[13px] font-medium transition-all duration-200 no-underline ${
                    active
                      ? "bg-white dark:bg-[#1c1c24] text-[#1d1d1f] dark:text-white shadow-sm shadow-black/[0.08]"
                      : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
                  }`}
                  href={item.href}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {!isLoggedIn && (
              <>
                <ThemeSwitch />
                <LanguageSwitcher />
              </>
            )}

            {!loading && isLoggedIn && <NotificationBell />}

            {!loading &&
              (isLoggedIn ? (
                <UserButton />
              ) : (
                <button
                  className="px-3.5 py-1.5 rounded-xl bg-[#1d1d1f] dark:bg-white hover:bg-black dark:hover:bg-[#e8e8e8] text-white dark:text-[#1d1d1f] text-[13px] font-medium transition-colors"
                  onClick={() => setAuthOpen(true)}
                >
                  {t("nav.login")}
                </button>
              ))}

            {/* Mobile hamburger */}
            <button
              aria-label={t("nav.menuToggle")}
              className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-[5px] rounded-xl hover:bg-black/5 dark:hover:bg-white/8 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span
                className={`block h-[1.5px] bg-[#1d1d1f] dark:bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? "w-4 rotate-45 translate-y-[6.5px]" : "w-4"}`}
              />
              <span
                className={`block h-[1.5px] bg-[#1d1d1f] dark:bg-white rounded-full transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-3"}`}
              />
              <span
                className={`block h-[1.5px] bg-[#1d1d1f] dark:bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? "w-4 -rotate-45 -translate-y-[6.5px]" : "w-4"}`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/15 dark:bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
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
        <div className="rounded-2xl bg-white/95 dark:bg-[#111116]/95 backdrop-blur-xl border border-black/[0.07] dark:border-white/[0.07] shadow-xl overflow-hidden">
          <div className="p-2 flex flex-col gap-0.5">
            {siteConfig.navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium no-underline transition-colors ${
                    active
                      ? "bg-black/[0.05] dark:bg-white/[0.07] text-[#1d1d1f] dark:text-white"
                      : "text-[#3d3d3d] dark:text-[#c0c0c5] hover:bg-black/[0.04] dark:hover:bg-white/[0.05]"
                  }`}
                  href={item.href}
                >
                  <div className="flex items-center gap-2.5">
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    )}
                    {t(item.key)}
                  </div>
                </Link>
              );
            })}
          </div>
          {!loading && !isLoggedIn && (
            <div className="px-2 pb-2">
              <button
                className="w-full py-2.5 rounded-xl bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] text-sm font-medium transition-colors"
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
