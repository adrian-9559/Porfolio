import type { Locale } from "@/store/localeStore";

import es from "@/locales/es.json";
import en from "@/locales/en.json";

type NestedDict = { [key: string]: string | string[] | NestedDict };

const locales: Record<Locale, NestedDict> = { es, en };

function resolveKey(obj: NestedDict, path: string[]): string | string[] | undefined {
  let current: string | string[] | NestedDict | undefined = obj;

  for (const segment of path) {
    if (typeof current !== "object" || Array.isArray(current) || current === null || !(segment in current)) {
      return undefined;
    }
    current = current[segment];
  }

  if (typeof current === "string" || Array.isArray(current)) return current;
  return undefined;
}

/**
 * Translate a dot-notation key.
 *
 * @param key - Dot-notation path e.g. "nav.home"
 * @param locale - Target locale (defaults to `"es"`)
 * @returns The translated string, Spanish fallback, or the key itself
 */
export function t(key: string, locale: Locale = "es", params?: Record<string, string | number>): string {
  const segments = key.split(".");
  const resolved = resolveKey(locales[locale], segments);

  const fallback = resolved === undefined && locale !== "es"
    ? resolveKey(locales.es, segments)
    : resolved;

  if (fallback === undefined) return key;
  if (Array.isArray(fallback)) return key;

  const str: string = fallback;
  if (params) {
    return str.replace(/\{(\w+)\}/g, (_, k: string) => String(params[k] ?? `{${k}}`));
  }
  return str;
}
