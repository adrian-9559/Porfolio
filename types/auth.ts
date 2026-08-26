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
  website?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: number;
  name: string;
  description?: string | null;
  created_at: string;
}

export interface UserWithProfile {
  id: string;
  email: string;
  roles: Role[];
  profile?: Profile;
  email_confirmed?: boolean;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  remember_me: boolean;
  theme: "light" | "dark" | "system";
  session_ttl: string;
  settings: Record<string, unknown>;
  email_notifications: boolean;
  blog_updates: boolean;
  language: "es" | "en";
  created_at: string;
  updated_at: string;
}

export type RoleName = "admin" | "editor" | "author" | "user";
