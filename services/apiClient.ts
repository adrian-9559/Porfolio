import { env } from "@/config/env";

// ── Token management ──────────────────────────────────────────────────────────

const TOKEN_KEY = "auth_token";
const REFRESH_KEY = "refresh_token";

export const tokenStore = {
  get: (): string | null =>
    typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null,
  set: (t: string) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
  getRefresh: (): string | null =>
    typeof window !== "undefined" ? localStorage.getItem(REFRESH_KEY) : null,
  setRefresh: (t: string) => localStorage.setItem(REFRESH_KEY, t),
};

// ── Error type ────────────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ── Token refresh (avoids circular import with authService) ────────────────────

let _refreshing: Promise<string | null> | null = null;

async function attemptRefresh(): Promise<string | null> {
  // Deduplicate concurrent refresh attempts
  if (_refreshing) return _refreshing;

  _refreshing = (async () => {
    const rt = tokenStore.getRefresh();
    if (!rt) return null;

    try {
      const res = await fetch(`${env.apiUrl}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(env.apiKey ? { "X-API-Key": env.apiKey } : {}) },
        body: JSON.stringify({ refresh_token: rt }),
      });

      if (!res.ok) {
        tokenStore.clear();
        return null;
      }

      const body = await res.json();
      const newToken: string = body?.data?.accessToken;
      const newRefresh: string = body?.data?.refreshToken;

      if (!newToken) {
        tokenStore.clear();
        return null;
      }

      tokenStore.set(newToken);
      if (newRefresh) tokenStore.setRefresh(newRefresh);
      return newToken;
    } catch {
      tokenStore.clear();
      return null;
    } finally {
      _refreshing = null;
    }
  })();

  return _refreshing;
}

// ── Core request ──────────────────────────────────────────────────────────────

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  _retry = true
): Promise<T> {
  const token = tokenStore.get();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (env.apiKey) headers["X-API-Key"] = env.apiKey;

  const res = await fetch(`${env.apiUrl}${path}`, { ...options, headers });

  // ── Auto-refresh on 401 ────────────────────────────────────────────────────
  if (res.status === 401 && _retry) {
    const newToken = await attemptRefresh();
    if (newToken) {
      // Retry original request once with the new token
      return apiFetch<T>(path, options, false);
    }
    // Refresh failed — dispatch event so UI can react (redirect to login)
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("auth:expired"));
    }
    throw new ApiError("Sesión expirada. Por favor, inicia sesión de nuevo.", 401);
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body?.error ?? res.statusText, res.status);
  }

  const body = await res.json();
  return body.data as T;
}
