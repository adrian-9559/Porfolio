import { create } from "zustand";
import { persist } from "zustand/middleware";

import { useCookieConsentStore } from "./cookieConsentStore";

export type Locale = "es" | "en";

export interface LocaleState {
  locale: Locale;
  hydrated: boolean;
  setLocale: (locale: Locale) => void;
  hydrate: () => void;
}

function canPersist(): boolean {
  try {
    const { hasConsented, preferences } = useCookieConsentStore.getState();
    return hasConsented && preferences;
  } catch {
    return false;
  }
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: "es",
      hydrated: false,
      setLocale: (locale) => {
        set({ locale, hydrated: true });
      },
      hydrate: () => {
        set({ hydrated: true });
      },
    }),
    {
      name: "app-locale",
      partialize: (state) => ({ locale: state.locale }),
      storage: {
        getItem: (name) => {
          if (!canPersist()) return null;
          const str = localStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          if (!canPersist()) return;
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
      onRehydrateStorage: () => () => {
        useLocaleStore.setState({ hydrated: true });
      },
    },
  ),
);
