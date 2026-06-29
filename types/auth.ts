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

export type RoleName = "admin" | "editor" | "author" | "user";
