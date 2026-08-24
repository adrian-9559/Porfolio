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

function dispatchAuthExpired(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("auth:expired"));
  }
}

// ── Core request ──────────────────────────────────────────────────────────────
// All traffic goes same-origin through the Next.js BFF proxy (pages/api/[[...slug]]),
// which injects the API key and manages the httpOnly session cookies server-side.
// The backend transparently refreshes the access token via the refresh cookie.

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  const res = await fetch(path, {
    ...options,
    headers,
    credentials: "same-origin",
  });

  if (res.status === 401) {
    dispatchAuthExpired();
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));

    throw new ApiError(
      (body as { error?: string })?.error ?? res.statusText,
      res.status,
    );
  }

  const body = await res.json();

  return body.data as T;
}
