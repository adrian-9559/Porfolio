import { apiFetch } from "./apiClient";

import { env } from "@/config/env";

export interface App {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon_emoji: string | null;
  accent_color: string | null;
  is_published: boolean;
  display_order: number;
  created_at: string;
}

export interface MobileAppVersion {
  id: string;
  app_id: string;
  version: string;
  platform: "android" | "ios";
  build_type: "apk" | "aab" | "ipa";
  file_name: string;
  file_size: number | null;
  is_active: boolean;
  release_notes: string | null;
  storage_source: "supabase" | "gdrive" | "external_url";
  external_url: string | null;
  drive_file_id: string | null;
  created_at: string;
}

export interface MobileLatest {
  android: MobileAppVersion | null;
  android_aab: MobileAppVersion | null;
  ios: MobileAppVersion | null;
}

const API = "/api/mobile-app";

export const mobileAppService = {
  listApps: () => apiFetch<App[]>(`${API}/apps`),

  getAppBySlug: (slug: string) => apiFetch<App>(`${API}/apps/${slug}`),

  getLatest: (appSlug?: string): Promise<Record<string, MobileLatest>> =>
    apiFetch<Record<string, MobileLatest>>(
      `${API}/latest${appSlug ? `?app=${appSlug}` : ""}`,
    ),

  listVersions: (appSlug: string, platform?: "android" | "ios") =>
    apiFetch<MobileAppVersion[]>(
      `${API}/versions?app=${appSlug}${platform ? `&platform=${platform}` : ""}`,
    ),

  async download(
    appSlug: string,
    buildType: "apk" | "aab" | "ipa",
  ): Promise<void> {
    const data = await apiFetch<{ url: string }>(
      `${API}/download/${buildType}?app=${appSlug}`,
      { headers: { Accept: "application/json" } },
    );

    window.open(data.url, "_blank");
  },

  async downloadById(version: MobileAppVersion): Promise<void> {
    const data = await apiFetch<{ url: string }>(
      `${API}/download/version/${version.id}`,
      { headers: { Accept: "application/json" } },
    );

    window.open(data.url, "_blank");
  },

  createApp: (input: Partial<App>) =>
    apiFetch<App>(`${API}/apps`, {
      method: "POST",
      body: JSON.stringify(input),
    }),

  updateApp: (id: string, input: Partial<App>) =>
    apiFetch<App>(`${API}/apps/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    }),

  deleteApp: (id: string) =>
    apiFetch<void>(`${API}/apps/${id}`, { method: "DELETE" }),

  async uploadVersion(
    appId: string,
    formData: FormData,
    uploadDestination?: "drive" | "supabase" | "external_url",
  ): Promise<MobileAppVersion> {
    const headers: Record<string, string> = {};

    if (env.apiKey) headers["X-API-Key"] = env.apiKey;
    if (uploadDestination)
      formData.set("upload_destination", uploadDestination);
    const res = await fetch(`${env.apiUrl}${API}/upload`, {
      method: "POST",
      body: formData,
      headers,
      credentials: "include",
    });
    const json = await res.json();

    if (!json.success) throw new Error(json.error ?? "Upload failed");

    return json.data as MobileAppVersion;
  },

  activateVersion: (id: string) =>
    apiFetch(`${API}/versions/${id}/activate`, { method: "PATCH" }),

  deleteVersion: (id: string) =>
    apiFetch(`${API}/versions/${id}`, { method: "DELETE" }),
};
