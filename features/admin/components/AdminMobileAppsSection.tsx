import { useState, useEffect, useRef } from "react";

import { GoogleDriveConnectCard } from "./GoogleDriveConnectCard";
import {
  AdminPageHeader,
  AdminPanel,
  AdminEmptyState,
  AdminLoadingSkeleton,
} from "./AdminShell";
import { Btn } from "./AdminShared";

import { useT } from "@/hooks/useT";
import { apiFetch } from "@/services/apiClient";
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
  formData.set("upload_destination", destination);
  const res = await fetch(`${API}/upload`, {
    method: "POST",
    body: formData,
    credentials: "same-origin",
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
      <span className="admin-badge admin-badge-success inline-flex items-center gap-1">
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
      <span className="admin-badge">
        URL
      </span>
    );
  }

  return (
    <span className="admin-badge">
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
        className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-6 pt-5 pb-4"
          style={{ borderBottom: "1px solid var(--border-default)" }}
        >
          <h3 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
            {t("admin.mobileNewVersion")}
          </h3>
          <button
            className="ds-btn-icon"
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
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                {t("admin.mobilePlatform")}
              </label>
              <select
                className="ds-input w-full"
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
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                {t("admin.mobileType")}
              </label>
              <select
                className="ds-input w-full"
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
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
              {t("admin.version")} <span style={{ color: "var(--color-danger)" }}>*</span>
            </label>
            <input
              className="ds-input w-full"
              placeholder="1.0.0"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
              {t("admin.uploadVersion")}
            </label>
            <div className="flex gap-2">
              {(["url", "file"] as const).map((st) => (
                <button
                  key={st}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
                    sourceType === st ? "admin-filter-chip-active" : "admin-filter-chip"
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
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                URL <span style={{ color: "var(--color-danger)" }}>*</span>
              </label>
              <input
                className="ds-input w-full"
                placeholder="https://github.com/user/repo/blob/main/android/app.apk"
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
              />
              {externalUrl.trim() && (
                <p className="mt-1.5 text-xs truncate" style={{ color: "var(--text-muted)" }}>
                  →{" "}
                  <span className="font-mono">
                    {toRawGithubUrl(externalUrl)}
                  </span>
                </p>
              )}
              <p className="mt-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
                {t("admin.uploadVersion")}
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                {t("admin.uploadVersion")}{" "}
                <span style={{ color: "var(--color-danger)" }}>*</span>
              </label>
              <div
                className="w-full rounded-xl border-2 border-dashed px-4 py-4 text-center cursor-pointer transition-colors"
                style={{ borderColor: "var(--border-default)" }}
                onClick={() => fileRef.current?.click()}
              >
                {file ? (
                  <p className="text-sm" style={{ color: "var(--text-primary)" }}>
                    {file.name}{" "}
                    <span style={{ color: "var(--text-muted)" }}>
                      ({formatSize(file.size)})
                    </span>
                  </p>
                ) : (
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
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
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                  {t("admin.uploadVersion")}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium transition-colors ${
                      destination === "drive" ? "admin-filter-chip-active" : "admin-filter-chip"
                    } ${!driveConnected ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={!driveConnected}
                    title={!driveConnected ? t("admin.uploadVersion") : ""}
                    type="button"
                    onClick={() => setDestination("drive")}
                  >
                    Google Drive
                  </button>
                  <button
                    className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium transition-colors ${
                      destination === "supabase" ? "admin-filter-chip-active" : "admin-filter-chip"
                    }`}
                    type="button"
                    onClick={() => setDestination("supabase")}
                  >
                    Supabase Storage
                  </button>
                </div>
                {destination === "drive" && driveConnected && (
                  <p className="mt-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
                    {t("admin.uploadVersion")}
                  </p>
                )}
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
              {t("admin.uploadVersion")}{" "}
              <span className="font-normal" style={{ color: "var(--text-muted)" }}>
                {t("common.optional")}
              </span>
            </label>
            <textarea
              className="ds-input w-full resize-none"
              placeholder={t("admin.uploadVersion")}
              rows={3}
              value={releaseNotes}
              onChange={(e) => setReleaseNotes(e.target.value)}
            />
          </div>

          {error && <p className="text-sm" style={{ color: "var(--color-danger)" }}>{error}</p>}

          <div className="flex gap-2 pt-1">
            <button
              className="ds-btn-secondary flex-1"
              type="button"
              onClick={onClose}
            >
              {t("common.cancel")}
            </button>
            <button
              className="ds-btn-primary flex-1"
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
      <AdminPageHeader
        title={t("admin.mobileAppsTitle")}
        description={t("admin.mobileAppsDesc")}
        actions={
          <Btn onClick={() => setShowModal(true)}>
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
          </Btn>
        }
      />

      {error && (
        <div
          className="px-4 py-2.5 rounded-xl text-sm"
          style={{ background: "var(--bg-hover)", color: "var(--color-danger)", border: "1px solid var(--color-danger)" }}
        >
          {error}
        </div>
      )}

      <GoogleDriveConnectCard onChange={refreshAll} />

      <AdminPanel>
        {loading ? (
          <AdminLoadingSkeleton rows={5} />
        ) : versions.length === 0 ? (
          <AdminEmptyState
            title={t("admin.mobileNoVersions")}
            description={t("admin.mobileNoVersionsHint")}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
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
                      className="px-4 py-3 text-left text-xs font-semibold whitespace-nowrap"
                      style={{ color: "var(--text-muted)" }}
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
                    className="last:border-0"
                    style={{ borderBottom: "1px solid var(--border-default)" }}
                  >
                    <td className="px-4 py-3 font-mono text-xs whitespace-nowrap" style={{ color: "var(--text-primary)" }}>
                      v{v.version}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap" style={{ color: "var(--text-primary)" }}>
                      {PLATFORM_LABELS[v.platform]}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="admin-badge">
                        {BUILD_LABELS[v.build_type]}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <SourceBadge source={v.storage_source} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs" style={{ color: "var(--text-muted)" }}>
                      {formatSize(v.file_size)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {v.is_active ? (
                        <span className="admin-badge admin-badge-success">
                          {t("admin.mobileActive")}
                        </span>
                      ) : (
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                          {t("admin.mobileInactive")}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs" style={{ color: "var(--text-muted)" }}>
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
                            className="ds-btn-primary text-xs px-2.5 py-1"
                            disabled={activating === v.id}
                            onClick={() => handleActivate(v.id)}
                          >
                            {activating === v.id
                              ? "…"
                              : t("admin.mobileActivate")}
                          </button>
                        )}
                        {v.external_url && (
                          <a
                            className="ds-btn-secondary text-xs px-2.5 py-1"
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
                          className="ds-btn-danger text-xs px-2.5 py-1"
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
      </AdminPanel>

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
