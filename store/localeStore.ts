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
      },
      hydrate: () => {
        // hydration happens automatically via persist middleware on mount;
        // this flag signals that the persisted value has been loaded
        set({ hydrated: true });
      },
    }),
    {
      name: "app-locale",
      partialize: (state) => ({ locale: state.locale }),
      onRehydrateStorage: () => () => {
        useLocaleStore.setState({ hydrated: true });
      },
    },
  ),
);
