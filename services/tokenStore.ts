const ACCESS_KEY = "porfolio_access_token";
const REFRESH_KEY = "porfolio_refresh_token";

function safeGet(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export const tokenStore = {
  get: (): string | null => safeGet(ACCESS_KEY),
  getRefresh: (): string | null => safeGet(REFRESH_KEY),
  set: (accessToken: string, refreshToken: string): void => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(ACCESS_KEY, accessToken);
      window.localStorage.setItem(REFRESH_KEY, refreshToken);
    } catch {}
  },
  clear: (): void => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(ACCESS_KEY);
      window.localStorage.removeItem(REFRESH_KEY);
    } catch {}
  },
};
