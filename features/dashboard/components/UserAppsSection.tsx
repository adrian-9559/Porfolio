import { useState, useEffect } from "react";
import { mobileAppService, type App, type MobileAppVersion, type MobileLatest } from "@/services/mobileAppService";

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function semverCompare(a: string, b: string): number {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pb[i] ?? 0) - (pa[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

function IcoDownload() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

// ── App Card ──────────────────────────────────────────────────────────────────

interface AppCardProps {
  app: App;
  latest: MobileLatest;
}

function AppCard({ app, latest }: AppCardProps) {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [versions, setVersions] = useState<MobileAppVersion[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const apk = latest.android;
  const hasAndroid = apk != null;

  async function handleDownload(buildType: "apk" | "aab" | "ipa") {
    setDownloading(buildType);
    setError(null);
    try {
      await mobileAppService.download(app.slug, buildType);
    } catch {
      setError("No se pudo descargar. Inténtalo de nuevo.");
    } finally {
      setDownloading(null);
    }
  }

  async function handleDownloadVersion(version: MobileAppVersion) {
    setDownloading(version.id);
    setError(null);
    try {
      await mobileAppService.downloadById(version);
    } catch {
      setError("No se pudo descargar esta versión.");
    } finally {
      setDownloading(null);
    }
  }

  async function toggleHistory() {
    if (!showHistory && versions.length === 0) {
      setLoadingHistory(true);
      try {
        const all = await mobileAppService.listVersions(app.slug, "android");
        setVersions(all.sort((a, b) => semverCompare(a.version, b.version)));
      } catch {} finally { setLoadingHistory(false); }
    }
    setShowHistory((v) => !v);
  }

  return (
    <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] overflow-hidden">
      {/* Header */}
      <div className="p-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: `${app.accent_color ?? "#34c759"}20` }}>
          {app.icon_emoji ?? "📱"}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">{app.name}</p>
          {app.description && <p className="text-xs text-[#6e6e73] dark:text-[#86868b] truncate">{app.description}</p>}
          {!app.description && (
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
              {hasAndroid ? `v${apk!.version} disponible · Android` : "Sin versiones publicadas aún"}
            </p>
          )}
        </div>
        {hasAndroid && (
          <span className="text-xs font-mono text-[#aeaeb2] dark:text-[#636366]">v{apk!.version}</span>
        )}
      </div>

      {/* Download buttons */}
      <div className="px-5 pb-4 flex flex-wrap gap-2">
        <button
          onClick={() => handleDownload("apk")}
          disabled={!hasAndroid || !!downloading}
          className="flex items-center gap-2 bg-[#34c759] hover:bg-[#30b350] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
        >
          {downloading === "apk" ? (
            <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : <IcoDownload />}
          Android
          {apk?.file_size && <span className="text-white/70 text-[11px]">({formatBytes(apk.file_size)})</span>}
        </button>

        <button disabled className="flex items-center gap-2 bg-[#007aff]/40 cursor-not-allowed text-white/70 text-sm font-medium px-4 py-2 rounded-xl">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          iOS
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-white/20">Próximamente</span>
        </button>
      </div>

      {error && <p className="px-5 pb-3 text-xs text-rose-500">{error}</p>}

      {apk?.release_notes && (
        <p className="px-5 pb-3 text-[11px] text-[#aeaeb2] dark:text-[#636366]">
          Publicado el {new Date(apk.created_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
          {` · ${apk.release_notes}`}
        </p>
      )}

      {/* Version history */}
      <div className="border-t border-black/5 dark:border-white/5">
        <button
          onClick={toggleHistory}
          className="w-full flex items-center justify-between px-5 py-3 text-xs font-medium text-[#6e6e73] dark:text-[#86868b] hover:bg-black/2 dark:hover:bg-white/3 transition-colors"
        >
          <span>Historial de versiones</span>
          {loadingHistory
            ? <span className="w-3 h-3 rounded-full border-2 border-current/30 border-t-current animate-spin" />
            : <svg className={`w-3.5 h-3.5 transition-transform ${showHistory ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>}
        </button>

        {showHistory && versions.length > 0 && (
          <div className="divide-y divide-black/4 dark:divide-white/4">
            {versions.map((v) => (
              <div key={v.id} className="flex items-center gap-3 px-5 py-3 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#1d1d1f] dark:text-white font-mono">v{v.version}</span>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                      v.build_type === "apk" ? "bg-[#34c759]/10 text-[#30b350]" : "bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400"
                    }`}>{v.build_type.toUpperCase()}</span>
                    {v.is_active && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400">Activa</span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#6e6e73] dark:text-[#86868b] mt-0.5">
                    {new Date(v.created_at).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}
                    {v.file_size ? ` · ${formatBytes(v.file_size)}` : ""}
                    {v.release_notes ? ` · ${v.release_notes}` : ""}
                  </p>
                </div>
                <button
                  onClick={() => handleDownloadVersion(v)}
                  disabled={!!downloading}
                  className="flex-shrink-0 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-[#1d1d1f] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {downloading === v.id ? (
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-current/30 border-t-current animate-spin" />
                  ) : <IcoDownload />}
                  Descargar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────

export function UserAppsSection() {
  const [apps, setApps] = useState<App[]>([]);
  const [latestMap, setLatestMap] = useState<Record<string, MobileLatest>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      mobileAppService.listApps(),
      mobileAppService.getLatest(),
    ]).then(([appList, latest]) => {
      setApps(appList);
      setLatestMap(latest);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-5 h-5 rounded-full border-2 border-blue-600/30 border-t-blue-600 animate-spin" />
      </div>
    );
  }

  if (apps.length === 0) {
    return (
      <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-10 text-center">
        <p className="text-sm font-medium text-[#1d1d1f] dark:text-white">Sin apps publicadas</p>
        <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-1">Próximamente habrá apps disponibles.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-[#1d1d1f] dark:text-white">Apps</h2>
        <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-0.5">Descarga las aplicaciones disponibles.</p>
      </div>
      <div className="flex flex-col gap-4">
        {apps.map((app) => (
          <AppCard
            key={app.id}
            app={app}
            latest={latestMap[app.slug] ?? { android: null, android_aab: null, ios: null }}
          />
        ))}
      </div>
    </div>
  );
}
