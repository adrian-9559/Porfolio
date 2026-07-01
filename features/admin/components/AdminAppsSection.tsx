import { useState, useEffect, useRef } from "react";
import { useT } from "@/hooks/useT";

import { SectionHeader, Card, EmptyState, Spinner } from "./AdminShared";

import {
  mobileAppService,
  type App,
  type MobileAppVersion,
} from "@/services/mobileAppService";
import { toRawGithubUrl } from "@/lib/githubUrl";

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

// ── App Modal ─────────────────────────────────────────────────────────────────

interface AppModalProps {
  initial?: App;
  onClose: () => void;
  onSaved: (app: App) => void;
}

function AppModal({ initial, onClose, onSaved }: AppModalProps) {
  const { t } = useT();
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [iconEmoji, setIconEmoji] = useState(initial?.icon_emoji ?? "");
  const [accentColor, setAccentColor] = useState(
    initial?.accent_color ?? "#34c759",
  );
  const [isPublished, setIsPublished] = useState(initial?.is_published ?? true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError(t("admin.appNameRequired"));
      return;
    }
    if (!initial && !slug.trim()) {
      setError(t("admin.appSlugRequired"));
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: name.trim(),
        description: description.trim() || undefined,
        icon_emoji: iconEmoji.trim() || undefined,
        accent_color: accentColor,
        is_published: isPublished,
      };
      const app = initial
        ? await mobileAppService.updateApp(initial.id, payload)
        : await mobileAppService.createApp({
            ...payload,
            slug: slug.trim(),
          } as any);

      onSaved(app);
      onClose();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t("admin.saveError"));
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
            {initial ? t("admin.editApp") : t("admin.newApp")}
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-black/8 dark:hover:bg-white/8 text-[#6e6e73]"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-4 h-4"
            >
              <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <form className="px-6 py-5 flex flex-col gap-4" onSubmit={handleSubmit}>
          {!initial && (
            <div>
              <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">
                {t("admin.appSlug")} <span className="text-red-500">*</span>
              </label>
              <input
                value={slug}
                onChange={(e) =>
                  setSlug(
                    e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                  )
                }
                placeholder={t("admin.appSlugPlaceholder")}
                className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">
                {t("admin.appName")} <span className="text-red-500">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("admin.appNamePlaceholder")}
                className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">
                {t("admin.appEmoji")}
              </label>
              <input
                value={iconEmoji}
                onChange={(e) => setIconEmoji(e.target.value)}
                placeholder={t("admin.appEmojiPlaceholder")}
                className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">
                {t("admin.appAccentColor")}
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-8 h-8 rounded-lg border border-black/12 dark:border-white/12 cursor-pointer"
                />
                <input
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="flex-1 rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">
              {t("admin.appDescription")}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder={t("admin.appDescriptionPlaceholder")}
              className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-[#1d1d1f] dark:text-white">
              {t("admin.appPublished")}
            </span>
          </label>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-xl border border-black/12 dark:border-white/12 text-sm text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
            >
              {t("admin.cancel")}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 rounded-xl bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] text-sm font-medium disabled:opacity-50 transition-opacity"
            >
              {loading ? t("admin.saving") : t("admin.save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Upload Version Modal ───────────────────────────────────────────────────────

interface UploadModalProps {
  apps: App[];
  preselectedAppId?: string;
  onClose: () => void;
  onUploaded: (v: MobileAppVersion) => void;
}

function UploadModal({
  apps,
  preselectedAppId,
  onClose,
  onUploaded,
}: UploadModalProps) {
  const { t } = useT();
  const [appId, setAppId] = useState(preselectedAppId ?? apps[0]?.id ?? "");
  const [platform, setPlatform] = useState<"android" | "ios">("android");
  const [buildType, setBuildType] = useState("apk");
  const [version, setVersion] = useState("");
  const [releaseNotes, setReleaseNotes] = useState("");
  const [sourceType, setSourceType] = useState<"url" | "file">("url");
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
    if (!appId) {
      setError(t("admin.appNameRequired"));
      return;
    }
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

      fd.append("app_id", appId);
      fd.append("version", version.trim());
      fd.append("platform", platform);
      fd.append("build_type", buildType);
      if (releaseNotes.trim()) fd.append("release_notes", releaseNotes.trim());
      if (sourceType === "url")
        fd.append("external_url", toRawGithubUrl(externalUrl));
      else if (file) fd.append("file", file);
      const v = await mobileAppService.uploadVersion(appId, fd);

      onUploaded(v);
      onClose();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t("admin.uploadError"));
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
            {t("admin.newVersion")}
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-black/8 dark:hover:bg-white/8 text-[#6e6e73]"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-4 h-4"
            >
              <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <form className="px-6 py-5 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">
              {t("admin.appName")} <span className="text-red-500">*</span>
            </label>
            <select
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
              className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {apps.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.icon_emoji ? `${a.icon_emoji} ` : ""}
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">
                {t("admin.platform")}
              </label>
              <select
                value={platform}
                onChange={(e) =>
                  handlePlatformChange(e.target.value as "android" | "ios")
                }
                className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="android">Android</option>
                <option value="ios">iOS</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">
                {t("admin.type")}
              </label>
              <select
                value={buildType}
                onChange={(e) => setBuildType(e.target.value)}
                className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="1.0.0"
              className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  type="button"
                  onClick={() => setSourceType(st)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${sourceType === st ? "bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400" : "border-black/12 dark:border-white/12 text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white"}`}
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
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                placeholder="https://github.com/user/repo/blob/main/android/app.apk"
                className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {externalUrl.trim() && (
                <p className="mt-1.5 text-xs text-[#6e6e73] truncate">
                  →{" "}
                  <span className="font-mono">
                    {toRawGithubUrl(externalUrl)}
                  </span>
                </p>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">
                {t("admin.uploadVersion")} <span className="text-red-500">*</span>
              </label>
              <div
                onClick={() => fileRef.current?.click()}
                className="w-full rounded-xl border-2 border-dashed border-black/12 dark:border-white/12 px-4 py-4 text-center cursor-pointer hover:border-blue-400 transition-colors"
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
                type="file"
                accept=".apk,.aab,.ipa"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">
              {t("admin.uploadVersion")}{" "}
              <span className="text-[#aeaeb2] font-normal">{t("common.optional")}</span>
            </label>
            <textarea
              value={releaseNotes}
              onChange={(e) => setReleaseNotes(e.target.value)}
              rows={2}
              placeholder={t("admin.uploadVersion")}
              className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-xl border border-black/12 dark:border-white/12 text-sm text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
            >
              {t("admin.cancel")}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 rounded-xl bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] text-sm font-medium disabled:opacity-50 transition-opacity"
            >
              {loading ? t("admin.uploading") : t("admin.uploadVersion")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Versions Panel ────────────────────────────────────────────────────────────

interface VersionsPanelProps {
  app: App;
  onClose: () => void;
  onUpload: () => void;
}

function VersionsPanel({ app, onClose, onUpload }: VersionsPanelProps) {
  const [versions, setVersions] = useState<MobileAppVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [activating, setActivating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    mobileAppService
      .listVersions(app.slug)
      .then(setVersions)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [app.slug]);

  async function handleActivate(id: string) {
    setActivating(id);
    try {
      await mobileAppService.activateVersion(id);
      const updated = await mobileAppService.listVersions(app.slug);

      setVersions(updated);
    } catch {
      setError("No se pudo activar.");
    } finally {
      setActivating(null);
    }
  }

  async function handleDelete(id: string) {
    setDeleting(id);
    try {
      await mobileAppService.deleteVersion(id);
      setVersions((v) => v.filter((x) => x.id !== id));
    } catch {
      setError("No se pudo eliminar.");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#111116] rounded-2xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-black/8 dark:border-white/8">
          <h3 className="text-base font-semibold text-[#1d1d1f] dark:text-white">
            {app.icon_emoji && <span className="mr-2">{app.icon_emoji}</span>}
            {app.name} — versiones
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={onUpload}
              className="flex items-center gap-1.5 bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] text-xs font-medium px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="w-3 h-3"
              >
                <path d="M8 2v12M2 8h12" />
              </svg>
              Nueva versión
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-black/8 dark:hover:bg-white/8 text-[#6e6e73]"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-4 h-4"
              >
                <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
        <div className="overflow-y-auto flex-1">
          {error && <p className="mx-6 my-3 text-sm text-red-500">{error}</p>}
          {loading ? (
            <div className="py-8">
              <Spinner />
            </div>
          ) : versions.length === 0 ? (
            <EmptyState sub="Sube la primera versión." text="Sin versiones" />
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/8 dark:border-white/8">
                  {[
                    "Versión",
                    "Plataforma",
                    "Tipo",
                    "Tamaño",
                    "Estado",
                    "Fecha",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-semibold text-[#aeaeb2] dark:text-[#636366] whitespace-nowrap"
                    >
                      {h}
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
                    <td className="px-4 py-3 font-mono text-xs text-[#1d1d1f] dark:text-white">
                      v{v.version}
                    </td>
                    <td className="px-4 py-3 text-[#1d1d1f] dark:text-white">
                      {PLATFORM_LABELS[v.platform]}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-xs font-medium text-[#6e6e73] uppercase">
                        {BUILD_LABELS[v.build_type]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#6e6e73] text-xs">
                      {formatSize(v.file_size)}
                    </td>
                    <td className="px-4 py-3">
                      {v.is_active ? (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-[#34c759]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#34c759]" />
                          Activa
                        </span>
                      ) : (
                        <span className="text-xs text-[#aeaeb2]">Inactiva</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[#6e6e73] text-xs">
                      {new Date(v.created_at).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {!v.is_active && (
                          <button
                            onClick={() => handleActivate(v.id)}
                            disabled={activating === v.id}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 disabled:opacity-50 transition-colors"
                          >
                            {activating === v.id ? "…" : "Activar"}
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(v.id)}
                          disabled={deleting === v.id}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-950/20 text-red-500 hover:bg-red-100 disabled:opacity-50 transition-colors"
                        >
                          {deleting === v.id ? "…" : "Eliminar"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────

export function AdminAppsSection() {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNewApp, setShowNewApp] = useState(false);
  const [editingApp, setEditingApp] = useState<App | null>(null);
  const [versionsApp, setVersionsApp] = useState<App | null>(null);
  const [uploadForApp, setUploadForApp] = useState<App | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    mobileAppService
      .listApps()
      .then(setApps)
      .catch(() => setError("Error al cargar apps."))
      .finally(() => setLoading(false));
  }, []);

  async function handleDeleteApp(id: string) {
    setDeleting(id);
    try {
      await mobileAppService.deleteApp(id);
      setApps((prev) => prev.filter((a) => a.id !== id));
    } catch {
      setError("No se pudo eliminar la app.");
    } finally {
      setDeleting(null);
    }
  }

  function handleAppSaved(app: App) {
    setApps((prev) => {
      const idx = prev.findIndex((a) => a.id === app.id);

      return idx >= 0
        ? prev.map((a) => (a.id === app.id ? app : a))
        : [app, ...prev];
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        action={
          <button onClick={() => setShowNewApp(true)}
            className="flex items-center gap-2 bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] text-sm font-medium px-4 py-2 rounded-xl hover:opacity-80 transition-opacity">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5"><path d="M8 2v12M2 8h12" /></svg>
            Nueva app
          </button>
        }
        desc="Gestiona las apps publicadas y sus versiones."
        title="Aplicaciones"
      />

      {error && (
        <div className="px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <Card>
        {loading ? (
          <Spinner />
        ) : apps.length === 0 ? (
          <EmptyState
            text="Sin apps"
            sub="Crea la primera con el botón de arriba."
          />
        ) : (
          <div className="grid gap-3 p-1">
            {apps.map((app) => (
              <div
                key={app.id}
                className="flex items-center gap-4 p-4 rounded-xl border border-black/8 dark:border-white/8 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${app.accent_color}20` }}
                >
                  {app.icon_emoji ?? "📱"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
                      {app.name}
                    </p>
                    <span className="text-[10px] font-mono text-[#aeaeb2] dark:text-[#636366]">
                      {app.slug}
                    </span>
                    {!app.is_published && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
                        Oculta
                      </span>
                    )}
                  </div>
                  {app.description && (
                    <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5 truncate">
                      {app.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => {
                      setUploadForApp(app);
                      setVersionsApp(null);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-colors"
                  >
                    Nueva versión
                  </button>
                  <button
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-black/5 dark:bg-white/5 text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
                      onClick={() => setVersionsApp(app)}
                  >
                    Versiones
                  </button>
                  <button
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-black/5 dark:bg-white/5 text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
                      onClick={() => setEditingApp(app)}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteApp(app.id)}
                    disabled={deleting === app.id}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-950/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-950/40 disabled:opacity-50 transition-colors"
                  >
                    {deleting === app.id ? "…" : "Eliminar"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {showNewApp && (
        <AppModal
          onClose={() => setShowNewApp(false)}
          onSaved={handleAppSaved}
        />
      )}
      {editingApp && (
        <AppModal
          initial={editingApp}
          onClose={() => setEditingApp(null)}
          onSaved={handleAppSaved}
        />
      )}
      {versionsApp && (
        <VersionsPanel
          app={versionsApp}
          onClose={() => setVersionsApp(null)}
          onUpload={() => {
            setUploadForApp(versionsApp);
            setVersionsApp(null);
          }}
        />
      )}
      {uploadForApp && (
        <UploadModal
          apps={apps}
          preselectedAppId={uploadForApp.id}
          onClose={() => setUploadForApp(null)}
          onUploaded={() => {}}
        />
      )}
    </div>
  );
}
