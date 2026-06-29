import { useEffect, useRef, useState } from "react";
import { googleDriveService, type DriveStatus } from "@/services/googleDriveService";
import { Card } from "./AdminShared";

interface Props {
  onChange?: () => void;
}

function DriveIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M9.5 2L4 12l2.5 4.5h2.5l1.5-2.5L9.5 2z"
        fill="#FBBC04"
      />
      <path
        d="M14.5 2L9.5 11h5l2.5-4.5L14.5 2z"
        fill="#34A853"
      />
      <path
        d="M19.5 7L17 12l-2.5 4.5h2.5L19.5 12 22 7h-2.5z"
        fill="#EA4335"
      />
    </svg>
  );
}

function StatusPill({ status }: { status: DriveStatus }) {
  if (!status.enabled) {
    return (
      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-black/5 dark:bg-white/8 text-[#aeaeb2] dark:text-[#636366]">
        No configurado
      </span>
    );
  }
  if (!status.connected) {
    return (
      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
        Desconectado
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      Conectado
    </span>
  );
}

export function GoogleDriveConnectCard({ onChange }: Props) {
  const [status, setStatus] = useState<DriveStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [editingFolder, setEditingFolder] = useState(false);
  const [folderInput, setFolderInput] = useState("");
  const popupRef = useRef<Window | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    refresh();
    // Check URL params for OAuth callback result
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("drive") === "connected") {
        setStatus((s) => (s ? { ...s, connected: true } : s));
      } else if (params.get("drive") === "error") {
        const reason = params.get("reason") ?? "unknown";
        setError(`Error conectando Google Drive: ${reason}`);
      }
    }
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function cleanupUrlParams() {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.delete("drive");
    url.searchParams.delete("reason");
    window.history.replaceState({}, "", url.toString());
  }

  async function refresh() {
    setLoading(true);
    try {
      const s = await googleDriveService.getStatus();
      setStatus(s);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error leyendo estado");
    } finally {
      setLoading(false);
    }
  }

  async function handleConnect() {
    if (!status) return;
    setConnecting(true);
    setError(null);
    try {
      const successRedirect = window.location.pathname + window.location.search;
      const { url } = await googleDriveService.getAuthUrl(successRedirect);
      if (!url) {
        setError("Google Drive no está configurado en el servidor.");
        setConnecting(false);
        return;
      }
      const popup = window.open(url, "google-drive-oauth", "width=500,height=600");
      if (!popup) {
        setError("Permite popups para conectar Google Drive.");
        setConnecting(false);
        return;
      }
      popupRef.current = popup;
      // Poll URL fragment until popup finishes (the callback lands on our backend which redirects to the successRedirect).
      pollRef.current = setInterval(() => {
        try {
          if (popup.closed) {
            if (pollRef.current) clearInterval(pollRef.current);
            setConnecting(false);
            refresh().then(() => onChange?.());
            return;
          }
          // Popup is on successRedirect page — same origin URL contains ?drive=connected
          if (popup.location && popup.location.search.includes("drive=connected")) {
            popup.close();
          }
        } catch {
          // Cross-origin: ignore, keep polling until popup.closed becomes true
        }
      }, 500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error iniciando OAuth");
      setConnecting(false);
    }
  }

  const [confirmingDisconnect, setConfirmingDisconnect] = useState(false);

  async function handleDisconnect() {
    try {
      await googleDriveService.disconnect(false);
      setConfirmingDisconnect(false);
      await refresh();
      onChange?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconectando");
    }
  }

  async function handleSaveFolder() {
    try {
      await googleDriveService.setFolder(folderInput.trim());
      setEditingFolder(false);
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error guardando carpeta");
    }
  }

  useEffect(() => {
    if (status?.connected) cleanupUrlParams();
  }, [status?.connected]);

  if (loading && !status) {
    return (
      <Card>
        <div className="px-5 py-4 flex justify-center">
          <div className="w-4 h-4 rounded-full border-2 border-blue-600/30 border-t-blue-600 animate-spin" />
        </div>
      </Card>
    );
  }
  if (!status) return null;

  return (
    <Card>
      <div className="p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white dark:bg-[#1a1a1f] border border-black/8 dark:border-white/8 flex-shrink-0">
          <DriveIcon />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
              Google Drive
            </p>
            <StatusPill status={status} />
          </div>
          <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-1">
            Sube archivos APK/AAB/IPA directamente a tu Google Drive y se sirven públicamente.
          </p>

          {status.enabled && status.connected && (
            <div className="mt-3 text-xs text-[#6e6e73] dark:text-[#86868b]">
              <p>
                Conectado el{" "}
                {new Date(status.connectedAt!).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span>Carpeta:</span>
                {editingFolder ? (
                  <>
                    <input
                      value={folderInput}
                      onChange={(e) => setFolderInput(e.target.value)}
                      placeholder="ID de carpeta"
                      className="flex-1 min-w-[180px] px-2 py-1 rounded-lg border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-xs font-mono"
                    />
                    <button
                      onClick={handleSaveFolder}
                      className="px-2 py-1 rounded-lg text-xs font-medium bg-blue-600 text-white"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditingFolder(false)}
                      className="px-2 py-1 rounded-lg text-xs text-[#6e6e73]"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <code className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5">
                      {status.driveFolderId}
                    </code>
                    <button
                      onClick={() => {
                        setFolderInput(status.driveFolderId ?? "");
                        setEditingFolder(true);
                      }}
                      className="text-xs underline text-blue-600 dark:text-blue-400"
                    >
                      Cambiar
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {error && (
            <p className="mt-2 text-xs text-red-500">{error}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 flex-shrink-0">
          {!status.enabled ? (
            <span className="text-[11px] text-[#aeaeb2] dark:text-[#636366] max-w-[160px] text-right">
              Configura las variables GOOGLE_CLIENT_ID/SECRET/REDIRECT_URI y TOKEN_ENCRYPTION_KEY en el backend.
            </span>
          ) : !status.connected ? (
            <button
              onClick={handleConnect}
              disabled={connecting}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] text-sm font-medium disabled:opacity-50 hover:opacity-80 transition-opacity"
            >
              {connecting ? "Conectando…" : "Conectar con Google"}
            </button>
          ) : !confirmingDisconnect ? (
            <button
              onClick={() => setConfirmingDisconnect(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-black/12 dark:border-white/12 text-[#6e6e73] dark:text-[#86868b] hover:text-red-500 hover:border-red-300 dark:hover:border-red-700 transition-colors"
            >
              Desconectar
            </button>
          ) : (
            <div className="flex flex-col gap-1.5">
              <button
                onClick={handleDisconnect}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500 text-white hover:bg-red-600"
              >
                Confirmar
              </button>
              <button
                onClick={() => setConfirmingDisconnect(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#6e6e73]"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
