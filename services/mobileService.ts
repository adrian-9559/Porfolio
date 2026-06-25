import { apiFetch } from "./apiClient";

export interface MobileAppVersion {
  id: string;
  version: string;
  platform: "android" | "ios";
  build_type: "apk" | "aab" | "ipa";
  file_name: string;
  file_size: number | null;
  is_active: boolean;
  release_notes: string | null;
  created_at: string;
}

export interface MobileLatest {
  android: MobileAppVersion | null;
  android_aab: MobileAppVersion | null;
  ios: MobileAppVersion | null;
}

export const mobileService = {
  getLatest: () =>
    apiFetch<MobileLatest>("/api/mobile-app/latest"),

  listVersions: (platform?: "android" | "ios") =>
    apiFetch<MobileAppVersion[]>(
      `/api/mobile-app/versions${platform ? `?platform=${platform}` : ""}`
    ),

  /** Download the active build for a given type. */
  async download(buildType: "apk" | "aab" | "ipa"): Promise<void> {
    const data = await apiFetch<{ url: string }>(`/api/mobile-app/download/${buildType}`, {
      headers: { Accept: "application/json" },
    });
    window.open(data.url, "_blank");
  },

  /** Download a specific version by ID. */
  async downloadById(version: MobileAppVersion): Promise<void> {
    const data = await apiFetch<{ url: string }>(`/api/mobile-app/download/version/${version.id}`, {
      headers: { Accept: "application/json" },
    });
    window.open(data.url, "_blank");
  },
};
