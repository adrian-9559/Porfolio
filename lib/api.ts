const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
}

export function setToken(token: string): void {
  localStorage.setItem("auth_token", token);
}

export function clearToken(): void {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("refresh_token");
}

export function setRefreshToken(token: string): void {
  localStorage.setItem("refresh_token", token);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refresh_token");
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body?.error ?? res.statusText, res.status);
  }

  const body = await res.json();
  return body.data as T;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
  }
}

// Auth
export const api = {
  auth: {
    login: (email: string, password: string) =>
      request<{ token: string; refresh_token: string; user: AuthUser }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),
    register: (full_name: string, email: string, password: string) =>
      request<{ token: string; refresh_token: string; user: AuthUser }>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ full_name, email, password }),
      }),
    logout: () => request<void>("/auth/logout", { method: "POST" }),
    me: () => request<AuthUser>("/auth/me"),
    refresh: (refresh_token: string) =>
      request<{ token: string; refresh_token: string }>("/auth/refresh", {
        method: "POST",
        body: JSON.stringify({ refresh_token }),
      }),
  },

  users: {
    list: () => request<UserWithProfile[]>("/users"),
    getById: (id: string) => request<UserWithProfile>(`/users/${id}`),
    updateProfile: (id: string, data: Partial<Profile>) =>
      request<Profile>(`/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    delete: (id: string) => request<void>(`/users/${id}`, { method: "DELETE" }),
  },

  roles: {
    list: () => request<Role[]>("/roles"),
    create: (name: string, description?: string) =>
      request<Role>("/roles", { method: "POST", body: JSON.stringify({ name, description }) }),
    update: (id: number, data: Partial<Role>) =>
      request<Role>(`/roles/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
    delete: (id: number) => request<void>(`/roles/${id}`, { method: "DELETE" }),
    assign: (user_id: string, role_id: number) =>
      request<void>("/roles/assign", { method: "POST", body: JSON.stringify({ user_id, role_id }) }),
    remove: (user_id: string, role_id: number) =>
      request<void>("/roles/remove", { method: "POST", body: JSON.stringify({ user_id, role_id }) }),
  },
};

// Types mirrored from backend
export interface AuthUser {
  id: string;
  email: string;
  roles: string[];
  profile?: Profile;
}

export interface Profile {
  id: string;
  full_name?: string;
  avatar_url?: string | null;
  bio?: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserWithProfile {
  id: string;
  email: string;
  roles: Role[];
  profile?: Profile;
}

export interface Role {
  id: number;
  name: string;
  description?: string | null;
  created_at: string;
}
