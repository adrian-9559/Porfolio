import { env } from "@/config/env";
import { tokenStore } from "./tokenStore";

// ── Error type ────────────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ── Token refresh (Bearer-based — cookies are unreliable cross-site) ───────────
// Vercel (frontend) and Render (backend) are different eTLD+1 domains, so
// browsers that block third-party cookies (Safari ITP, Chrome Incognito) drop
// the auth cookies regardless of SameSite=None. Tokens in localStorage +
// Authorization header sidestep that entirely.

let _refreshing: Promise<string | null> | null = null;

async function refreshTokens(): Promise<string | null> {
  const refresh = tokenStore.getRefresh();
  if (!refresh) return null;

  try {
    const res = await fetch(`${env.apiUrl}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(env.apiKey ? { "X-API-Key": env.apiKey } : {}),
      },
      body: JSON.stringify({ refresh_token: refresh }),
      credentials: "include",
    });

    // Only a real auth rejection (401/403) means the refresh token is dead.
    // Anything else (429 rate limit, 5xx) is transient — keep the tokens so
    // the next attempt can still use them instead of forcing a re-login.
    if (res.status === 401 || res.status === 403) {
      tokenStore.clear();
      return null;
    }

    if (!res.ok) return null;

    const body = await res.json();

    if (body.success && body.data?.accessToken) {
      tokenStore.set(body.data.accessToken, body.data.refreshToken ?? refresh);
      return body.data.accessToken;
    }
  } catch {}

  tokenStore.clear();
  return null;
}

function dispatchAuthExpired(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("auth:expired"));
  }
}

// ── Core request ──────────────────────────────────────────────────────────────

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  let token = tokenStore.get();
  let attempt = 0;
  let res: Response;

  while (true) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (env.apiKey) headers["X-API-Key"] = env.apiKey;
    if (token) headers["Authorization"] = `Bearer ${token}`;

    res = await fetch(`${env.apiUrl}${path}`, {
      ...options,
      headers,
      credentials: "include",
    });

    if (res.status === 401 && token && attempt === 0) {
      if (!_refreshing) {
        _refreshing = refreshTokens().finally(() => {
          _refreshing = null;
        });
      }
      const newToken = await _refreshing;

      if (!newToken) {
        // Only wipe the session if refreshTokens() actually invalidated it
        // (401/403 from the server). A transient failure (429, network, 5xx)
        // leaves the refresh token in place — surface the error, keep session.
        if (!tokenStore.getRefresh()) dispatchAuthExpired();
        throw new ApiError("Sesión expirada", 401);
      }

      token = newToken;
      attempt++;
      continue;
    }

    if (res.status === 401 && token) {
      tokenStore.clear();
      dispatchAuthExpired();
    }

    break;
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));

    throw new ApiError(body?.error ?? res.statusText, res.status);
  }

  const body = await res.json();

  return body.data as T;
}
