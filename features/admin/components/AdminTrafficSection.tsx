"use client";
import { useState, useEffect } from "react";

import { analyticsService } from "@/services/analyticsService";
import { useT } from "@/hooks/useT";
import {
  AdminPageHeader,
  AdminStatGrid,
  AdminStat,
  AdminPanel,
  AdminEmptyState,
  AdminLoadingSkeleton,
} from "./AdminShell";
import { Btn } from "./AdminShared";

function formatDuration(ms: number): string {
  if (ms < 1000) return "< 1s";
  const seconds = Math.floor(ms / 1000);

  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}m ${remainingSeconds}s`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffH = Math.floor(diffMs / 3600000);
  const diffD = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return "ahora";
  if (diffMin < 60) return `hace ${diffMin}m`;
  if (diffH < 24) return `hace ${diffH}h`;
  if (diffD < 7) return `hace ${diffD}d`;

  return d.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
}

function parseUserAgent(ua?: string): string {
  if (!ua) return "Desconocido";
  if (ua.includes("Mobile") || ua.includes("Android")) return "Móvil";
  if (ua.includes("iPad") || ua.includes("Tablet")) return "Tablet";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari")) return "Safari";
  if (ua.includes("Edge")) return "Edge";

  return "Otro";
}

export default function AdminTrafficSection() {
  const { t } = useT();
  const [stats, setStats] = useState<any>(null);
  const [trafficByPage, setTrafficByPage] = useState<any[]>([]);
  const [trafficByDay, setTrafficByDay] = useState<any[]>([]);
  const [visitors, setVisitors] = useState<any[]>([]);
  const [selectedVisitor, setSelectedVisitor] = useState<any>(null);
  const [visitorHistory, setVisitorHistory] = useState<any[]>([]);
  const [flow, setFlow] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "pages" | "visitors" | "flow"
  >("overview");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [statsData, pageData, dayData, visitorsData, flowData] =
        await Promise.all([
          analyticsService.getStats(),
          analyticsService.getTrafficByPage(),
          analyticsService.getTrafficByDay(30),
          analyticsService.getRecentVisitors(15),
          analyticsService.getNavigationFlow(),
        ]);

      setStats(statsData);
      setTrafficByPage(pageData);
      setTrafficByDay(dayData);
      setVisitors(visitorsData);
      setFlow(flowData);
    } catch (err) {
      console.error("Failed to load analytics", err);
    }
    setLoading(false);
  }

  async function handleVisitorClick(visitorId: string) {
    try {
      const history = await analyticsService.getVisitorHistory(visitorId);

      setSelectedVisitor(visitorId);
      setVisitorHistory(history);
    } catch (err) {
      console.error("Failed to load visitor history", err);
    }
  }

  if (loading) return <AdminLoadingSkeleton rows={8} />;

  const maxDayVisits = Math.max(...trafficByDay.map((d) => d.visits), 1);

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title={t("admin.trafficTitle")}
        description={t("admin.trafficSubtitle")}
      />

      <div className="admin-tabs w-fit">
        {[
          { id: "overview", label: t("admin.trafficOverview") },
          { id: "pages", label: t("admin.trafficPages") },
          { id: "visitors", label: t("admin.trafficVisitors") },
          { id: "flow", label: t("admin.trafficFlow") },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`admin-tab ${activeTab === tab.id ? "admin-tab-active" : ""}`}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <>
          <AdminStatGrid cols={4}>
            <AdminStat
              label={t("admin.trafficTotalVisits")}
              value={stats?.totalVisits ?? 0}
              accent
            />
            <AdminStat
              label={t("admin.trafficUniqueVisitors")}
              value={stats?.uniqueVisitors ?? 0}
            />
            <AdminStat
              label={t("admin.trafficTodayVisits")}
              value={stats?.todayVisits ?? 0}
            />
            <AdminStat
              label={t("admin.trafficAvgDuration")}
              value={formatDuration(stats?.avgDuration ?? 0)}
            />
          </AdminStatGrid>

          <AdminPanel title={t("admin.trafficByDay")}>
            <div className="flex items-end gap-1 h-40">
              {trafficByDay.map((day, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm transition-all duration-300"
                  style={{
                    height: `${(day.visits / maxDayVisits) * 100}%`,
                    minHeight: day.visits > 0 ? "4px" : "0",
                    background: "var(--accent)",
                  }}
                  title={`${day.date}: ${day.visits} ${t("admin.visits")}`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px]" style={{ color: "var(--text-muted)" }}>
              <span>{trafficByDay[0]?.date}</span>
              <span>{trafficByDay[trafficByDay.length - 1]?.date}</span>
            </div>
          </AdminPanel>
        </>
      )}

      {/* Pages Tab */}
      {activeTab === "pages" && (
        <AdminPanel>
          {trafficByPage.length === 0 ? (
            <AdminEmptyState title={t("admin.trafficNoData")} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                    <th className="text-left text-xs font-semibold p-4" style={{ color: "var(--text-secondary)" }}>
                      {t("admin.trafficPagePath")}
                    </th>
                    <th className="text-right text-xs font-semibold p-4" style={{ color: "var(--text-secondary)" }}>
                      {t("admin.trafficVisits")}
                    </th>
                    <th className="text-right text-xs font-semibold p-4" style={{ color: "var(--text-secondary)" }}>
                      {t("admin.trafficUniqueVisitors")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {trafficByPage.map((page, i) => (
                    <tr
                      key={i}
                      className="hover:bg-[var(--bg-hover)]"
                      style={{ borderBottom: "1px solid var(--border-default)" }}
                    >
                      <td className="p-4">
                        <code className="ds-input text-xs font-mono px-2 py-1 inline-block">
                          {page.path}
                        </code>
                      </td>
                      <td className="p-4 text-right text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                        {page.visits}
                      </td>
                      <td className="p-4 text-right text-sm" style={{ color: "var(--text-secondary)" }}>
                        {page.uniqueVisitors}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </AdminPanel>
      )}

      {/* Visitors Tab */}
      {activeTab === "visitors" && (
        <div className="space-y-4">
          {selectedVisitor && (
            <AdminPanel title={`${t("admin.trafficVisitorHistory")} — ${selectedVisitor}`}>
              <div className="flex justify-end mb-4">
                <button
                  className="ds-btn-ghost text-xs"
                  type="button"
                  onClick={() => {
                    setSelectedVisitor(null);
                    setVisitorHistory([]);
                  }}
                >
                  Cerrar
                </button>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {visitorHistory.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs">
                    <span className="w-20 flex-shrink-0" style={{ color: "var(--text-muted)" }}>
                      {formatDate(h.created_at)}
                    </span>
                    <code className="ds-input text-xs font-mono px-2 py-0.5 inline-block">
                      {h.page_path}
                    </code>
                    {h.duration_ms && (
                      <span style={{ color: "var(--text-secondary)" }}>
                        {formatDuration(h.duration_ms)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </AdminPanel>
          )}

          <AdminPanel>
            {visitors.length === 0 ? (
              <AdminEmptyState title={t("admin.trafficNoVisitors")} />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                      <th className="text-left text-xs font-semibold p-4" style={{ color: "var(--text-secondary)" }}>
                        {t("admin.trafficVisitorId")}
                      </th>
                      <th className="text-left text-xs font-semibold p-4" style={{ color: "var(--text-secondary)" }}>
                        {t("admin.trafficDevice")}
                      </th>
                      <th className="text-left text-xs font-semibold p-4" style={{ color: "var(--text-secondary)" }}>
                        {t("admin.trafficLastVisit")}
                      </th>
                      <th className="text-left text-xs font-semibold p-4" style={{ color: "var(--text-secondary)" }}>
                        {t("admin.trafficPages")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {visitors.map((v, i) => (
                      <tr
                        key={i}
                        className="hover:bg-[var(--bg-hover)] cursor-pointer"
                        style={{ borderBottom: "1px solid var(--border-default)" }}
                        onClick={() => handleVisitorClick(v.visitorId)}
                      >
                        <td className="p-4">
                          <code className="text-[10px] font-mono" style={{ color: "var(--text-secondary)" }}>
                            {v.visitorId.slice(0, 8)}...
                          </code>
                        </td>
                        <td className="p-4 text-sm">
                          {parseUserAgent(v.userAgent)}
                        </td>
                        <td className="p-4 text-xs" style={{ color: "var(--text-secondary)" }}>
                          {formatDate(v.lastVisit)}
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {v.pages.slice(0, 3).map((p: string, j: number) => (
                              <span
                                key={j}
                                className="admin-badge text-[10px]"
                              >
                                {p}
                              </span>
                            ))}
                            {v.pages.length > 3 && (
                              <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                                +{v.pages.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </AdminPanel>
        </div>
      )}

      {/* Flow Tab */}
      {activeTab === "flow" && (
        <AdminPanel>
          {flow.length === 0 ? (
            <AdminEmptyState title={t("admin.trafficNoFlowData")} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                    <th className="text-left text-xs font-semibold p-4" style={{ color: "var(--text-secondary)" }}>
                      {t("admin.trafficNavigationFlow")}
                    </th>
                    <th className="text-right text-xs font-semibold p-4" style={{ color: "var(--text-secondary)" }}>
                      {t("admin.trafficCount")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {flow.map((f, i) => (
                    <tr
                      key={i}
                      style={{ borderBottom: "1px solid var(--border-default)" }}
                    >
                      <td className="p-4">
                        <code className="text-xs font-mono" style={{ color: "var(--text-primary)" }}>
                          {f.flow}
                        </code>
                      </td>
                      <td className="p-4 text-right text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                        {f.count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </AdminPanel>
      )}
    </div>
  );
}
