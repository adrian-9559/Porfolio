import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CookieConsentState {
  hydrated: boolean;
  hasConsented: boolean;
  essential: true;
  analytics: boolean;
  preferences: boolean;
  setConsent: (consent: { analytics: boolean; preferences: boolean }) => void;
  rejectAll: () => void;
  acceptAll: () => void;
  hydrate: () => void;
}

export const useCookieConsentStore = create<CookieConsentState>()(
  persist(
    (set) => ({
      hydrated: false,
      hasConsented: false,
      essential: true,
      analytics: false,
      preferences: false,

      setConsent: (consent) =>
        set({
          hasConsented: true,
          analytics: consent.analytics,
          preferences: consent.preferences,
        }),

      rejectAll: () =>
        set({
          hasConsented: true,
          analytics: false,
          preferences: false,
        }),

      acceptAll: () =>
        set({
          hasConsented: true,
          analytics: true,
          preferences: true,
        }),

      hydrate: () => set({ hydrated: true }),
    }),
    {
      name: "cookie-consent",
      partialize: (state) => ({
        hasConsented: state.hasConsented,
        analytics: state.analytics,
        preferences: state.preferences,
      }),
      onRehydrateStorage: () => () => {
        useCookieConsentStore.setState({ hydrated: true });
      },
    },
  ),
);
