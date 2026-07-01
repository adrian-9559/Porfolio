import type { AppProps } from "next/app";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { useAuthStore } from "@/store/authStore";
import { useLocaleStore } from "@/store/localeStore";
import { fontMono, fontSans } from "@/config/fonts";
import "@/styles/globals.css";

// ── Core Web Vitals tracking (production only) ──────────────────────────────
export function reportWebVitals(metric: any) {
  if (process.env.NODE_ENV === "production") {
    // Placeholder — enviar a analytics real en el futuro
    console.debug("Web Vitals:", metric);
  }
}

function useWebVitals() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof window !== "undefined" && "requestAnimationFrame" in window) {
        // LCP observation
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];

          console.debug("LCP:", lastEntry.startTime);
        });

        lcpObserver.observe({
          type: "largest-contentful-paint",
          buffered: true,
        });

        // CLS observation
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          console.debug("CLS:", clsValue);
        });

        clsObserver.observe({ type: "layout-shift", buffered: true });

        // INP observation
        const inpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];

          console.debug("INP:", lastEntry.duration);
        });

        inpObserver.observe({ type: "first-input", buffered: true });

        return () => {
          lcpObserver.disconnect();
          clsObserver.disconnect();
          inpObserver.disconnect();
        };
      }
    };

    handleRouteChange();
  }, [router.asPath]);
}

export default function App({ Component, pageProps }: AppProps) {
  useWebVitals();
  const router = useRouter();

  const locale = useLocaleStore((s) => s.locale);
  const [langFade, setLangFade] = useState(false);
  const prevLocale = useRef(locale);

  // Hydrate locale store on mount
  useEffect(() => {
    useLocaleStore.getState().hydrate();
  }, []);

  // Subtle fade animation on language change
  useEffect(() => {
    if (prevLocale.current !== locale) {
      setLangFade(true);
      const timer = setTimeout(() => setLangFade(false), 200);
      prevLocale.current = locale;
      return () => clearTimeout(timer);
    }
  }, [locale]);

  useEffect(() => {
    // Initial hydration on mount only — NOT on every navigation
    useAuthStore.getState().hydrate();

    // Re-hydrate when the tab regains focus (handles token refresh after inactivity)
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        useAuthStore.getState().hydrate();
      }
    };

    document.addEventListener("visibilitychange", onVisible);

    // When a mid-session API call fails with 401 (not during hydration), clear auth
    const onExpired = () => {
      useAuthStore.setState({
        user: null,
        isAuthenticated: false,
        isAdmin: false,
      });
      const path = window.location.pathname;
      const protected_paths = ["/dashboard", "/admin"];

      if (protected_paths.some((p) => path.startsWith(p))) {
        router.push("/");
      }
    };

    window.addEventListener("auth:expired", onExpired);

    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("auth:expired", onExpired);
    };
  }, []);

  return (
    <NextThemesProvider attribute="class" defaultTheme="light">
      <main
        className={`transition-opacity duration-200 ${langFade ? "opacity-0" : "opacity-100"}`}
      >
        <Component {...pageProps} />
      </main>
    </NextThemesProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
