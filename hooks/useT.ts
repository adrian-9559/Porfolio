import { useCallback } from "react";

import { t as translate } from "@/lib/i18n";
import { useLocaleStore } from "@/store/localeStore";

interface UseTReturn {
  t: (key: string, params?: Record<string, string | number>) => string;
  locale: "es" | "en";
  setLocale: (locale: "es" | "en") => void;
}

/**
 * React bindings for i18n.
 *
 * Returns a `t` function bound to the current locale, plus `locale` and `setLocale`.
 * Subscribe to changes via Zustand — no context provider needed.
 */
export function useT(): UseTReturn {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => translate(key, locale, params),
    [locale],
  );

  return { t, locale, setLocale };
}
