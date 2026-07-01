import { apiFetch } from "./apiClient";

export interface DriveStatus {
  enabled: boolean;
  connected: boolean;
  driveFolderId: string | null;
  connectedAt: string | null;
  lastUsedAt: string | null;
}

const API = "/api/admin/google-drive";

export const googleDriveService = {
  getStatus: () => apiFetch<DriveStatus>(`${API}/status`),

  getAuthUrl: (successRedirect?: string) =>
    apiFetch<{ enabled: boolean; url: string | null }>(
      `${API}/auth-url${successRedirect ? `?successRedirect=${encodeURIComponent(successRedirect)}` : ""}`,
    ),

  setFolder: (folderId: string) =>
    apiFetch<{ folderId: string }>(`${API}/folder`, {
      method: "POST",
      body: JSON.stringify({ folderId }),
    }),

  disconnect: (purgeFiles = false) =>
    apiFetch<{ disconnected: boolean }>(`${API}/disconnect`, {
      method: "DELETE",
      body: JSON.stringify({ purgeFiles }),
    }),
};

export interface UploadDestination {
  upload_destination: "drive" | "supabase" | "external_url";
}

export type AppUploadDestination = UploadDestination["upload_destination"];
