import { useEffect, useState } from "react";

import { useT } from "@/hooks/useT";
import { adminService, ServiceHealth } from "@/services/adminService";

function fmtUptime(s: number): string {
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m ${s % 60}s`;
  if (s < 86400)
    return `${Math.floor(s / 3600)}h ${Math.floor((s % 3600) / 60)}m`;

  return `${Math.floor(s / 86400)}d ${Math.floor((s % 86400) / 3600)}h`;
}

const STATUS_LABEL: Record<ServiceHealth["status"], string> = {
  active: "Activo",
  warning: "Con errores",
  error: "No accesible",
  inactive: "Sin uso",
};

const STATUS_CLASS: Record<ServiceHealth["status"], string> = {
  active:
    "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
  warning:
    "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
  error: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
  inactive: "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
};

export function AdminToolsHealthSection() {
  const { t } = useT();
  const [services, setServices] = useState<ServiceHealth[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const fetchHealth = () => {
    setLoading(true);
    setError(null);
    adminService
      .getServicesHealth()
      .then((data) => {
        setServices(data);
        setExpanded({});
      })
      .catch((err) => {
        setError(err?.message ?? "Error al cargar el estado de servicios");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="relative flex flex-col gap-6">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-emerald-500/8 to-green-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-40 -left-20 w-56 h-56 rounded-full bg-gradient-to-br from-green-500/6 to-emerald-500/4 blur-3xl pointer-events-none" />

      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1">Monitoreo</p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.03em" }}>
          {t("admin.services")}
        </h1>
        <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1">
          {t("admin.servicesDesc")}
        </p>
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      )}

      {error && !loading && (
        <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
          <div className="h-1 bg-gradient-to-r from-emerald-500 to-green-500" />
          <div className="p-6 text-center">
            <p className="text-sm text-red-600 dark:text-red-400 mb-3">{error}</p>
            <button
              className="px-4 py-2 rounded-xl bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] text-sm font-medium hover:opacity-90 transition-opacity"
              onClick={fetchHealth}
            >
              {t("common.retry")}
            </button>
          </div>
        </div>
      )}

      {!loading && !error && services.length === 0 && (
        <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
          <div className="h-1 bg-gradient-to-r from-emerald-500 to-green-500" />
          <div className="p-6 text-center">
            <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">
              {t("common.noResults")}
            </p>
          </div>
        </div>
      )}

      {!loading && !error && services.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((svc) => (
            <div key={svc.key} className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 group">
              <div className="h-1 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="p-5 flex flex-col gap-0">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-white shadow-md shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                    </div>
                    <p className="font-semibold text-sm text-[#1d1d1f] dark:text-white truncate">
                      {svc.name}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_CLASS[svc.status]}`}
                  >
                    {STATUS_LABEL[svc.status]}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-1 leading-relaxed">
                  {svc.description}
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 text-xs text-[#6e6e73] dark:text-[#86868b]">
                  {svc.recordCount !== null && svc.recordCount > 0 && (
                    <span>{svc.recordCount} registros</span>
                  )}
                  {svc.details?.uptime != null && (
                    <span>{fmtUptime(svc.details.uptime)} activo</span>
                  )}
                  {svc.details?.memory?.heapUsed != null && (
                    <span>
                      {(svc.details.memory.heapUsed / 1024 / 1024).toFixed(0)} MB
                    </span>
                  )}
                  {svc.errorCount > 0 && (
                    <span className="text-amber-600 dark:text-amber-400 font-medium">
                      {svc.errorCount} errores (7d)
                    </span>
                  )}
                </div>

                {/* Health error */}
                {svc.healthError && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-2 leading-relaxed">
                    {svc.healthError}
                  </p>
                )}

                {/* Last errors toggle */}
                {svc.errorCount > 0 && (
                  <div className="mt-3">
                    <button
                      className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      onClick={() =>
                        setExpanded((prev) => ({
                          ...prev,
                          [svc.key]: !prev[svc.key],
                        }))
                      }
                    >
                      {expanded[svc.key]
                        ? t("admin.serviceHideErrors")
                        : t("admin.serviceViewErrors")}
                    </button>

                    {expanded[svc.key] && (
                      <div className="mt-2 flex flex-col gap-2 max-h-48 overflow-y-auto">
                        {svc.lastErrors.map((err, i) => (
                          <div
                            key={i}
                            className="text-[11px] bg-red-50 dark:bg-red-950/20 rounded-lg p-2 border border-red-100 dark:border-red-900/30"
                          >
                            <p className="text-[10px] font-mono text-[#6e6e73] dark:text-[#86868b]">
                              {new Date(err.timestamp).toLocaleString("es-ES")}
                            </p>
                            <p className="text-red-700 dark:text-red-400 font-medium mt-0.5">
                              {err.action}
                            </p>
                            {err.metadata && (
                              <pre className="mt-1 text-[10px] text-[#6e6e73] dark:text-[#86868b] whitespace-pre-wrap font-mono leading-tight">
                                {typeof err.metadata === "string"
                                  ? err.metadata
                                  : JSON.stringify(err.metadata, null, 1)}
                              </pre>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {svc.errorCount === 0 && (
                  <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-3">
                    {t("admin.serviceNoErrors")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
