import { useState, useEffect, useRef } from "react";
import { SectionHeader, Card, EmptyState, Spinner } from "./AdminShared";
import { apiFetch, tokenStore } from "@/services/apiClient";
import { env } from "@/config/env";


interface MobileAppVersion {
  id: string;
  version: string;
  platform: "android" | "ios";
  build_type: "apk" | "aab" | "ipa";
  file_name: string;
  file_path: string | null;
  external_url: string | null;
  file_size: number | null;
  is_active: boolean;
  release_notes: string | null;
  created_at: string;
}

const API = "/api/mobile-app";

function toRawGithubUrl(url: string): string {
  const trimmed = url.trim();
  const blobMatch = trimmed.match(/^https?:\/\/github\.com\/([^/]+\/[^/]+)\/blob\/(.+)$/);
  if (blobMatch) return `https://raw.githubusercontent.com/${blobMatch[1]}/${blobMatch[2]}`;
  return trimmed;
}

async function listVersions(): Promise<MobileAppVersion[]> {
  return apiFetch<MobileAppVersion[]>(`${API}/versions`);
}

async function uploadVersion(formData: FormData): Promise<MobileAppVersion> {
  // Use raw fetch to avoid apiFetch overriding Content-Type for multipart
  const token = tokenStore.get();
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (env.apiKey) headers["X-API-Key"] = env.apiKey;
  const res = await fetch(`${env.apiUrl}${API}/upload`, {
    method: "POST",
    body: formData,
    headers,
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

const PLATFORM_LABELS: Record<string, string> = { android: "Android", ios: "iOS" };
const BUILD_LABELS: Record<string, string> = { apk: "APK", aab: "AAB", ipa: "IPA" };

function formatSize(bytes: number | null) {
  if (!bytes) return "—";
  if (bytes > 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

// ── Upload Modal ───────────────────────────────────────────────────────────────

interface UploadModalProps {
  onClose: () => void;
  onUploaded: (v: MobileAppVersion) => void;
}

function UploadModal({ onClose, onUploaded }: UploadModalProps) {
  const [platform, setPlatform] = useState<"android" | "ios">("android");
  const [buildType, setBuildType] = useState("apk");
  const [version, setVersion] = useState("");
  const [releaseNotes, setReleaseNotes] = useState("");
  const [sourceType, setSourceType] = useState<"file" | "url">("url");
  const [externalUrl, setExternalUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handlePlatformChange(p: "android" | "ios") {
    setPlatform(p);
    setBuildType(BUILD_TYPES[p][0]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!version.trim()) { setError("La versión es obligatoria."); return; }
    if (sourceType === "url" && !externalUrl.trim()) { setError("Introduce una URL externa."); return; }
    if (sourceType === "file" && !file) { setError("Selecciona un archivo."); return; }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("version", version.trim());
      fd.append("platform", platform);
      fd.append("build_type", buildType);
      if (releaseNotes.trim()) fd.append("release_notes", releaseNotes.trim());
      if (sourceType === "url") fd.append("external_url", toRawGithubUrl(externalUrl));
      else if (file) fd.append("file", file);

      const v = await uploadVersion(fd);
      onUploaded(v);
      onClose();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al subir la versión.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-md bg-white dark:bg-[#111116] rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-black/8 dark:border-white/8">
          <h3 className="text-base font-semibold text-[#1d1d1f] dark:text-white">Nueva versión</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-black/8 dark:hover:bg-white/8 text-[#6e6e73]">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          {/* Platform + Build type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">Plataforma</label>
              <select value={platform} onChange={(e) => handlePlatformChange(e.target.value as "android" | "ios")}
                className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="android">Android</option>
                <option value="ios">iOS</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">Tipo</label>
              <select value={buildType} onChange={(e) => setBuildType(e.target.value)}
                className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                {BUILD_TYPES[platform].map((bt) => (
                  <option key={bt} value={bt}>{BUILD_LABELS[bt]}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Version */}
          <div>
            <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">Versión <span className="text-red-500">*</span></label>
            <input value={version} onChange={(e) => setVersion(e.target.value)} placeholder="1.0.0"
              className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Source type */}
          <div>
            <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">Origen del archivo</label>
            <div className="flex gap-2">
              {(["url", "file"] as const).map((t) => (
                <button key={t} type="button" onClick={() => setSourceType(t)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${
                    sourceType === t
                      ? "bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400"
                      : "border-black/12 dark:border-white/12 text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white"
                  }`}>
                  {t === "url" ? "URL externa" : "Subir archivo"}
                </button>
              ))}
            </div>
          </div>

          {sourceType === "url" ? (
            <div>
              <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">URL <span className="text-red-500">*</span></label>
              <input value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)}
                placeholder="https://github.com/user/repo/blob/main/android/app.apk"
                className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {externalUrl.trim() && (
                <p className="mt-1.5 text-xs text-[#6e6e73] truncate">
                  → <span className="font-mono">{toRawGithubUrl(externalUrl)}</span>
                </p>
              )}
              <p className="mt-1.5 text-xs text-[#aeaeb2]">
                Acepta URLs de GitHub (<code className="font-mono">blob/</code> se convierte a raw automáticamente) o cualquier URL directa.
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">Archivo <span className="text-red-500">*</span></label>
              <div onClick={() => fileRef.current?.click()}
                className="w-full rounded-xl border-2 border-dashed border-black/12 dark:border-white/12 px-4 py-4 text-center cursor-pointer hover:border-blue-400 transition-colors">
                {file ? (
                  <p className="text-sm text-[#1d1d1f] dark:text-white">{file.name} <span className="text-[#6e6e73]">({formatSize(file.size)})</span></p>
                ) : (
                  <p className="text-sm text-[#aeaeb2]">Haz clic para seleccionar .apk / .aab / .ipa</p>
                )}
              </div>
              <input ref={fileRef} type="file" accept=".apk,.aab,.ipa" className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            </div>
          )}

          {/* Release notes */}
          <div>
            <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">Notas de versión <span className="text-[#aeaeb2] font-normal">(opcional)</span></label>
            <textarea value={releaseNotes} onChange={(e) => setReleaseNotes(e.target.value)} rows={3} placeholder="Correcciones y mejoras…"
              className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-2 rounded-xl border border-black/12 dark:border-white/12 text-sm text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
              Cancelar
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2 rounded-xl bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] text-sm font-medium disabled:opacity-50 transition-opacity">
              {loading ? "Subiendo…" : "Publicar versión"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main section ───────────────────────────────────────────────────────────────

export function AdminMobileAppsSection() {
  const [versions, setVersions] = useState<MobileAppVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [activating, setActivating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    listVersions().then(setVersions).catch(() => {}).finally(() => setLoading(false));
  }, []);

  async function handleActivate(id: string) {
    setActivating(id);
    setError(null);
    try {
      await activateVersion(id);
      const updated = await listVersions();
      setVersions(updated);
    } catch {
      setError("No se pudo activar la versión.");
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
      setError("No se pudo eliminar la versión.");
    } finally {
      setDeleting(null);
    }
  }

  function handleUploaded(v: MobileAppVersion) {
    setVersions((prev) => {
      // deactivate others of same platform+build_type
      const rest = prev.map((x) =>
        x.platform === v.platform && x.build_type === v.build_type ? { ...x, is_active: false } : x
      );
      return [v, ...rest];
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="Apps móviles"
        desc="Gestiona las versiones publicadas de las aplicaciones móviles."
        action={
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] text-sm font-medium px-4 py-2 rounded-xl hover:opacity-80 transition-opacity">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5">
              <path d="M8 2v12M2 8h12" />
            </svg>
            Nueva versión
          </button>
        }
      />

      {error && (
        <div className="px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <Card>
        {loading ? (
          <Spinner />
        ) : versions.length === 0 ? (
          <EmptyState text="Sin versiones publicadas" sub="Sube la primera versión con el botón de arriba." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/8 dark:border-white/8">
                  {["Versión", "Plataforma", "Tipo", "Tamaño", "Estado", "Fecha", "Acciones"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#aeaeb2] dark:text-[#636366] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {versions.map((v) => (
                  <tr key={v.id} className="border-b border-black/5 dark:border-white/5 last:border-0 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-mono text-xs text-[#1d1d1f] dark:text-white whitespace-nowrap">v{v.version}</td>
                    <td className="px-4 py-3 text-[#1d1d1f] dark:text-white whitespace-nowrap">{PLATFORM_LABELS[v.platform]}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-xs font-medium text-[#6e6e73] dark:text-[#86868b] uppercase">
                        {BUILD_LABELS[v.build_type]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#6e6e73] dark:text-[#86868b] whitespace-nowrap text-xs">{formatSize(v.file_size)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {v.is_active ? (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-[#34c759]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#34c759]" />Activa
                        </span>
                      ) : (
                        <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">Inactiva</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[#6e6e73] dark:text-[#86868b] whitespace-nowrap text-xs">
                      {new Date(v.created_at).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        {!v.is_active && (
                          <button onClick={() => handleActivate(v.id)} disabled={activating === v.id}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/50 disabled:opacity-50 transition-colors">
                            {activating === v.id ? "…" : "Activar"}
                          </button>
                        )}
                        {v.external_url && (
                          <a href={v.external_url} target="_blank" rel="noreferrer"
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-black/5 dark:bg-white/5 text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
                            URL
                          </a>
                        )}
                        <button onClick={() => handleDelete(v.id)} disabled={deleting === v.id}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-950/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-950/40 disabled:opacity-50 transition-colors">
                          {deleting === v.id ? "…" : "Eliminar"}
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

      {showModal && <UploadModal onClose={() => setShowModal(false)} onUploaded={handleUploaded} />}
    </div>
  );
}
