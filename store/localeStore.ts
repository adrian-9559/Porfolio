import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Locale = "es" | "en";

export interface LocaleState {
  locale: Locale;
  hydrated: boolean;
  setLocale: (locale: Locale) => void;
  hydrate: () => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: "es",
      hydrated: false,
      setLocale: (locale) => {
        set({ locale, hydrated: true });
        if (typeof document !== "undefined") {
          document.documentElement.lang = locale;
          try {
            document.cookie = `locale=${locale}; path=/; max-age=31536000; SameSite=Lax`;
          } catch {}
        }
        // Sync con backend preferencias si hay sesión (no bloquea)
        try {
          // dynamic import para evitar ciclo
          import("@/services/userService").then(({ userService }) => {
            userService.updatePreferences({ language: locale } as any).catch(() => {});
          }).catch(() => {});
        } catch {}
        // También notifica a otros tabs via storage event (zustand persist ya lo hace) y al backend de Partimos si comparte dominio
        try {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("app:locale-changed", { detail: { locale } }));
          }
        } catch {}
      },
      hydrate: () => {
        set({ hydrated: true });
        if (typeof document !== "undefined") {
          const s = useLocaleStore.getState().locale;
          document.documentElement.lang = s;
        }
      },
    }),
    {
      name: "app-locale",
      partialize: (state) => ({ locale: state.locale }),
      onRehydrateStorage: () => (state) => {
        useLocaleStore.setState({ hydrated: true });
        if (typeof document !== "undefined" && state?.locale) {
          document.documentElement.lang = state.locale;
        }
      },
    },
  ),
);
