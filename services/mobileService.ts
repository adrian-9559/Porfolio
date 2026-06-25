import { apiFetch, tokenStore } from "./apiClient";
import { env } from "@/config/env";

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
    const base = env.apiUrl;
    const token = tokenStore.get();
    const res = await fetch(`${base}/api/mobile-app/download/${buildType}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error(`Download failed: ${res.status}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `saldos-latest.${buildType}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
  },

  /** Download a specific version by ID. */
  async downloadById(version: MobileAppVersion): Promise<void> {
    const base = env.apiUrl;
    const token = tokenStore.get();
    const res = await fetch(`${base}/api/mobile-app/download/version/${version.id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error(`Download failed: ${res.status}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = version.file_name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
  },
};
