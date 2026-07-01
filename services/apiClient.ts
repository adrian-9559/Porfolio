import { env } from "@/config/env";

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

// ── Core request ──────────────────────────────────────────────────────────────

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (env.apiKey) headers["X-API-Key"] = env.apiKey;

  const res = await fetch(`${env.apiUrl}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));

    throw new ApiError(body?.error ?? res.statusText, res.status);
  }

  const body = await res.json();

  return body.data as T;
}
