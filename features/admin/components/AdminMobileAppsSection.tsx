import { useState, useEffect, useRef } from "react";
import { useT } from "@/hooks/useT";

import { SectionHeader, Card, EmptyState, Spinner } from "./AdminShared";
import { GoogleDriveConnectCard } from "./GoogleDriveConnectCard";

import { apiFetch } from "@/services/apiClient";
import { tokenStore } from "@/services/tokenStore";
import { env } from "@/config/env";
import {
  googleDriveService,
  type DriveStatus,
} from "@/services/googleDriveService";

interface MobileAppVersion {
  id: string;
  version: string;
  platform: "android" | "ios";
  build_type: "apk" | "aab" | "ipa";
  file_name: string;
  file_path: string | null;
  external_url: string | null;
  drive_file_id: string | null;
  storage_source: "supabase" | "gdrive" | "external_url";
  file_size: number | null;
  is_active: boolean;
  release_notes: string | null;
  created_at: string;
}

type UploadDestination = "drive" | "supabase" | "external_url";

const API = "/api/mobile-app";

function toRawGithubUrl(url: string): string {
  const trimmed = url.trim();
  const blobMatch = trimmed.match(
    /^https?:\/\/github\.com\/([^/]+\/[^/]+)\/blob\/(.+)$/,
  );

  if (blobMatch)
    return `https://raw.githubusercontent.com/${blobMatch[1]}/${blobMatch[2]}`;

  return trimmed;
}

async function listVersions(): Promise<MobileAppVersion[]> {
  return apiFetch<MobileAppVersion[]>(`${API}/versions`);
}

async function uploadVersion(
  formData: FormData,
  destination: UploadDestination,
): Promise<MobileAppVersion> {
  // Use raw fetch to avoid apiFetch overriding Content-Type for multipart
  const headers: Record<string, string> = {};

  if (env.apiKey) headers["X-API-Key"] = env.apiKey;
  const token = tokenStore.get();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  formData.set("upload_destination", destination);
  const res = await fetch(`${env.apiUrl}${API}/upload`, {
    method: "POST",
    body: formData,
    headers,
    credentials: "include",
  });
  const json = await res.json();

  if (!json.success) throw new Error(json.error ?? "Upload failed");

  return json.data as MobileAppVersion;
}

async function activateVersion(id: string): Promise<void> {
  await apiFetch(`${API}/versions/${id}/activate`, { method: "PATCH" });
}

async function deleteVersion(id: string): Promise<void> {
  await apiFetch(`${API}/versions/${id}`, { method: "DELETE" });
}

const BUILD_TYPES: Record<"android" | "ios", string[]> = {
  android: ["apk", "aab"],
  ios: ["ipa"],
};

const PLATFORM_LABELS: Record<string, string> = {
  android: "Android",
  ios: "iOS",
};
const BUILD_LABELS: Record<string, string> = {
  apk: "APK",
  aab: "AAB",
  ipa: "IPA",
};

function formatSize(bytes: number | null) {
  if (!bytes) return "—";
  if (bytes > 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;

  return `${(bytes / 1024).toFixed(0)} KB`;
}

function SourceBadge({
  source,
}: {
  source: "supabase" | "gdrive" | "external_url";
}) {
  if (source === "gdrive") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
        <svg className="w-3 h-3" viewBox="0 0 24 24">
          <path d="M9.5 2L4 12l2.5 4.5h2.5l1.5-2.5L9.5 2z" fill="#FBBC04" />
          <path d="M14.5 2L9.5 11h5l2.5-4.5L14.5 2z" fill="#34A853" />
          <path
            d="M19.5 7L17 12l-2.5 4.5h2.5L19.5 12 22 7h-2.5z"
            fill="#EA4335"
          />
        </svg>
        Drive
      </span>
    );
  }
  if (source === "external_url") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-[#6e6e73] dark:text-[#86868b] text-xs font-medium">
        URL
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-[#6e6e73] dark:text-[#86868b] text-xs font-medium">
      Supabase
    </span>
  );
}

// ── Upload Modal ───────────────────────────────────────────────────────────────

interface UploadModalProps {
  onClose: () => void;
  onUploaded: (v: MobileAppVersion) => void;
  driveStatus: DriveStatus | null;
}

function UploadModal({ onClose, onUploaded, driveStatus }: UploadModalProps) {
  const { t } = useT();
  const [platform, setPlatform] = useState<"android" | "ios">("android");
  const [buildType, setBuildType] = useState("apk");
  const [version, setVersion] = useState("");
  const [releaseNotes, setReleaseNotes] = useState("");
  const [sourceType, setSourceType] = useState<"file" | "url">(
    driveStatus?.connected ? "file" : "url",
  );
  const [externalUrl, setExternalUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [destination, setDestination] = useState<UploadDestination>(
    driveStatus?.connected ? "drive" : "external_url",
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const driveConnected = Boolean(driveStatus?.connected);
  const canUpload = sourceType === "file";

  function handlePlatformChange(p: "android" | "ios") {
    setPlatform(p);
    setBuildType(BUILD_TYPES[p][0]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!version.trim()) {
      setError(t("admin.appNameRequired"));

      return;
    }
    if (sourceType === "url" && !externalUrl.trim()) {
      setError(t("admin.appNameRequired"));

      return;
    }
    if (sourceType === "file" && !file) {
      setError(t("admin.appNameRequired"));

      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();

      fd.append("version", version.trim());
      fd.append("platform", platform);
      fd.append("build_type", buildType);
      if (releaseNotes.trim()) fd.append("release_notes", releaseNotes.trim());
      if (sourceType === "url") {
        fd.append("external_url", toRawGithubUrl(externalUrl));
        fd.append("upload_destination", "external_url");
      } else if (file) {
        fd.append("file", file);
        fd.append("upload_destination", destination);
      }

      const v = await uploadVersion(
        fd,
        sourceType === "url" ? "external_url" : destination,
      );

      onUploaded(v);
      onClose();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t("admin.mobileUploadError"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-[#111116] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-black/8 dark:border-white/8">
          <h3 className="text-base font-semibold text-[#1d1d1f] dark:text-white">
            {t("admin.mobileNewVersion")}
          </h3>
          <button
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-black/8 dark:hover:bg-white/8 text-[#6e6e73]"
            onClick={onClose}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 16 16"
            >
              <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <form className="px-6 py-5 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">
                {t("admin.mobilePlatform")}
              </label>
              <select
                className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={platform}
                onChange={(e) =>
                  handlePlatformChange(e.target.value as "android" | "ios")
                }
              >
                <option value="android">Android</option>
                <option value="ios">iOS</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">
                {t("admin.mobileType")}
              </label>
              <select
                className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={buildType}
                onChange={(e) => setBuildType(e.target.value)}
              >
                {BUILD_TYPES[platform].map((bt) => (
                  <option key={bt} value={bt}>
                    {BUILD_LABELS[bt]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">
              {t("admin.version")} <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1.0.0"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">
              {t("admin.uploadVersion")}
            </label>
            <div className="flex gap-2">
              {(["url", "file"] as const).map((st) => (
                <button
                  key={st}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${
                    sourceType === st
                      ? "bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400"
                      : "border-black/12 dark:border-white/12 text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white"
                  }`}
                  type="button"
                  onClick={() => setSourceType(st)}
                >
                  {st === "url" ? t("admin.uploadVersion") : t("admin.upload")}
                </button>
              ))}
            </div>
          </div>

          {sourceType === "url" ? (
            <div>
              <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">
                URL <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://github.com/user/repo/blob/main/android/app.apk"
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
              />
              {externalUrl.trim() && (
                <p className="mt-1.5 text-xs text-[#6e6e73] truncate">
                  →{" "}
                  <span className="font-mono">
                    {toRawGithubUrl(externalUrl)}
                  </span>
                </p>
              )}
              <p className="mt-1.5 text-xs text-[#aeaeb2]">
                {t("admin.uploadVersion")}
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">
                {t("admin.uploadVersion")} <span className="text-red-500">*</span>
              </label>
              <div
                className="w-full rounded-xl border-2 border-dashed border-black/12 dark:border-white/12 px-4 py-4 text-center cursor-pointer hover:border-blue-400 transition-colors"
                onClick={() => fileRef.current?.click()}
              >
                {file ? (
                  <p className="text-sm text-[#1d1d1f] dark:text-white">
                    {file.name}{" "}
                    <span className="text-[#6e6e73]">
                      ({formatSize(file.size)})
                    </span>
                  </p>
                ) : (
                  <p className="text-sm text-[#aeaeb2]">
                    {t("admin.uploadVersion")}
                  </p>
                )}
              </div>
              <input
                ref={fileRef}
                accept=".apk,.aab,.ipa"
                className="hidden"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />

              <div className="mt-3">
                <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">
                  {t("admin.uploadVersion")}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium border transition-colors ${
                      destination === "drive"
                        ? "bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400"
                        : "border-black/12 dark:border-white/12 text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white"
                    } ${!driveConnected ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={!driveConnected}
                    title={!driveConnected ? t("admin.uploadVersion") : ""}
                    type="button"
                    onClick={() => setDestination("drive")}
                  >
                    Google Drive
                  </button>
                  <button
                    className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium border transition-colors ${
                      destination === "supabase"
                        ? "bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400"
                        : "border-black/12 dark:border-white/12 text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white"
                    }`}
                    type="button"
                    onClick={() => setDestination("supabase")}
                  >
                    Supabase Storage
                  </button>
                </div>
                {destination === "drive" && driveConnected && (
                  <p className="mt-1.5 text-xs text-[#aeaeb2]">
                    {t("admin.uploadVersion")}
                  </p>
                )}
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">
              {t("admin.uploadVersion")}{" "}
              <span className="text-[#aeaeb2] font-normal">{t("common.optional")}</span>
            </label>
            <textarea
              className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder={t("admin.uploadVersion")}
              rows={3}
              value={releaseNotes}
              onChange={(e) => setReleaseNotes(e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-2 pt-1">
            <button
              className="flex-1 py-2 rounded-xl border border-black/12 dark:border-white/12 text-sm text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
              type="button"
              onClick={onClose}
            >
              {t("common.cancel")}
            </button>
            <button
              className="flex-1 py-2 rounded-xl bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] text-sm font-medium disabled:opacity-50 transition-opacity"
              disabled={loading}
              type="submit"
            >
              {loading ? t("admin.uploading") : t("admin.uploadVersion")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main section ───────────────────────────────────────────────────────────────

export function AdminMobileAppsSection() {
  const { t } = useT();
  const [versions, setVersions] = useState<MobileAppVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [activating, setActivating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [driveStatus, setDriveStatus] = useState<DriveStatus | null>(null);

  async function refreshAll() {
    setLoading(true);
    try {
      const [v, d] = await Promise.all([
        listVersions(),
        googleDriveService.getStatus().catch(() => null),
      ]);

      setVersions(v);
      setDriveStatus(d);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshAll();
  }, []);

  async function handleActivate(id: string) {
    setActivating(id);
    setError(null);
    try {
      await activateVersion(id);
      const updated = await listVersions();

      setVersions(updated);
    } catch {
      setError(t("admin.mobileActivateError"));
    } finally {
      setActivating(null);
    }
  }

  async function handleDelete(id: string) {
    setDeleting(id);
    setError(null);
    try {
      await deleteVersion(id);
      setVersions((v) => v.filter((x) => x.id !== id));
    } catch {
      setError(t("admin.mobileDeleteError"));
    } finally {
      setDeleting(null);
    }
  }

  function handleUploaded(v: MobileAppVersion) {
    setVersions((prev) => {
      // deactivate others of same platform+build_type
      const rest = prev.map((x) =>
        x.platform === v.platform && x.build_type === v.build_type
          ? { ...x, is_active: false }
          : x,
      );

      return [v, ...rest];
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        action={
          <button
            className="flex items-center gap-2 bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] text-sm font-medium px-4 py-2 rounded-xl hover:opacity-80 transition-opacity"
            onClick={() => setShowModal(true)}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              viewBox="0 0 16 16"
            >
              <path d="M8 2v12M2 8h12" />
            </svg>
            Nueva versión
          </button>
        }
        desc={t("admin.mobileAppsDesc")}
        title={t("admin.mobileAppsTitle")}
      />

      {error && (
        <div className="px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <GoogleDriveConnectCard onChange={refreshAll} />

      <Card>
        {loading ? (
          <Spinner />
        ) : versions.length === 0 ? (
          <EmptyState
            sub={t("admin.mobileNoVersionsHint")}
            text={t("admin.mobileNoVersions")}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/8 dark:border-white/8">
                  {[
                    { key: "version" },
                    { key: "mobilePlatform" },
                    { key: "mobileType" },
                    { key: "mobileOrigin" },
                    { key: "mobileSize" },
                    { key: "mobileStatus" },
                    { key: "mobileDate" },
                    { key: "mobileActions" },
                  ].map((col, i) => (
                    <th
                      key={i}
                      className="px-4 py-3 text-left text-xs font-semibold text-[#aeaeb2] dark:text-[#636366] whitespace-nowrap"
                    >
                      {t(`admin.${col.key}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {versions.map((v) => (
                  <tr
                    key={v.id}
                    className="border-b border-black/5 dark:border-white/5 last:border-0 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-[#1d1d1f] dark:text-white whitespace-nowrap">
                      v{v.version}
                    </td>
                    <td className="px-4 py-3 text-[#1d1d1f] dark:text-white whitespace-nowrap">
                      {PLATFORM_LABELS[v.platform]}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-xs font-medium text-[#6e6e73] dark:text-[#86868b] uppercase">
                        {BUILD_LABELS[v.build_type]}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <SourceBadge source={v.storage_source} />
                    </td>
                    <td className="px-4 py-3 text-[#6e6e73] dark:text-[#86868b] whitespace-nowrap text-xs">
                      {formatSize(v.file_size)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {v.is_active ? (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-[#34c759]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#34c759]" />
                          {t("admin.mobileActive")}
                        </span>
                      ) : (
                        <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                          {t("admin.mobileInactive")}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[#6e6e73] dark:text-[#86868b] whitespace-nowrap text-xs">
                      {new Date(v.created_at).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        {!v.is_active && (
                          <button
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/50 disabled:opacity-50 transition-colors"
                            disabled={activating === v.id}
                            onClick={() => handleActivate(v.id)}
                          >
                            {activating === v.id ? "…" : t("admin.mobileActivate")}
                          </button>
                        )}
                        {v.external_url && (
                          <a
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-black/5 dark:bg-white/5 text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
                            href={v.external_url}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {v.storage_source === "gdrive"
                              ? t("admin.mobileViewDrive")
                              : t("admin.mobileViewUrl")}
                          </a>
                        )}
                        <button
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-950/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-950/40 disabled:opacity-50 transition-colors"
                          disabled={deleting === v.id}
                          onClick={() => handleDelete(v.id)}
                        >
                          {deleting === v.id ? "…" : t("admin.mobileDelete")}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {showModal && (
        <UploadModal
          driveStatus={driveStatus}
          onClose={() => setShowModal(false)}
          onUploaded={handleUploaded}
        />
      )}
    </div>
  );
}
