import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useAuthStore } from "@/store/authStore";
import { fontMono, fontSans } from "@/config/fonts";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

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
      useAuthStore.setState({ user: null, isAuthenticated: false, isAdmin: false });
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NextThemesProvider attribute="class" defaultTheme="light">
      <Component {...pageProps} />
    </NextThemesProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
