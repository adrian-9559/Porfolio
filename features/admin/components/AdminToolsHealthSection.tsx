import { useEffect, useState } from "react";

import { useT } from "@/hooks/useT";
import { adminService, ServiceHealth } from "@/services/adminService";
import {
  AdminPageHeader,
  AdminPanel,
  AdminEmptyState,
  AdminLoadingSkeleton,
} from "./AdminShell";

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

const STATUS_BADGE: Record<ServiceHealth["status"], string> = {
  active: "admin-badge-success",
  warning: "admin-badge-warning",
  error: "admin-badge-danger",
  inactive: "admin-badge",
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
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title={t("admin.services")}
        description={t("admin.servicesDesc")}
      />

      {loading && <AdminLoadingSkeleton rows={3} />}

      {error && !loading && (
        <AdminPanel>
          <div className="p-6 text-center">
            <p className="text-sm text-[var(--color-danger)] mb-3">{error}</p>
            <button className="ds-btn-primary" onClick={fetchHealth}>
              {t("common.retry")}
            </button>
          </div>
        </AdminPanel>
      )}

      {!loading && !error && services.length === 0 && (
        <AdminPanel>
          <AdminEmptyState title={t("common.noResults")} />
        </AdminPanel>
      )}

      {!loading && !error && services.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((svc) => (
            <div key={svc.key} className="admin-panel">
              <div className="admin-panel-body">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[var(--bg-hover)] flex items-center justify-center text-[var(--text-secondary)] shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </div>
                    <p className="font-semibold text-sm text-[var(--text-primary)] truncate">
                      {svc.name}
                    </p>
                  </div>
                  <span className={`admin-badge ${STATUS_BADGE[svc.status]} shrink-0`}>
                    {STATUS_LABEL[svc.status]}
                  </span>
                </div>

                <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                  {svc.description}
                </p>

                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 text-xs text-[var(--text-secondary)]">
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
                    <span className="text-[var(--color-warning)] font-medium">
                      {svc.errorCount} errores (7d)
                    </span>
                  )}
                </div>

                {svc.healthError && (
                  <p className="text-xs text-[var(--color-danger)] mt-2 leading-relaxed">
                    {svc.healthError}
                  </p>
                )}

                {svc.errorCount > 0 && (
                  <div className="mt-3">
                    <button
                      className="text-xs font-medium text-[var(--accent)] hover:underline"
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
                            className="text-[11px] bg-[var(--color-danger)]/5 rounded-lg p-2 border border-[var(--color-danger)]/10"
                          >
                            <p className="text-[10px] font-mono text-[var(--text-secondary)]">
                              {new Date(err.timestamp).toLocaleString("es-ES")}
                            </p>
                            <p className="text-[var(--color-danger)] font-medium mt-0.5">
                              {err.action}
                            </p>
                            {err.metadata && (
                              <pre className="mt-1 text-[10px] text-[var(--text-secondary)] whitespace-pre-wrap font-mono leading-tight">
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
                  <p className="text-xs text-[var(--text-secondary)] mt-3">
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
