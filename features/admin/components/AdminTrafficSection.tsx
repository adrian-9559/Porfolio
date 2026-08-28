"use client";
import { useState, useEffect } from "react";

import { analyticsService } from "@/services/analyticsService";
import { useT } from "@/hooks/useT";

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
  const [activeTab, setActiveTab] = useState<"overview" | "pages" | "visitors" | "flow">("overview");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [statsData, pageData, dayData, visitorsData, flowData] = await Promise.all([
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

  if (loading)
    return (
      <div className="flex justify-center py-12">
        <div className="w-6 h-6 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );

  const maxDayVisits = Math.max(...trafficByDay.map((d) => d.visits), 1);

  return (
    <div className="relative flex flex-col gap-6">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-violet-500/8 to-purple-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-40 -left-20 w-56 h-56 rounded-full bg-gradient-to-br from-purple-500/6 to-violet-500/4 blur-3xl pointer-events-none" />

      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-1">Analytics</p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.03em" }}>
          {t("admin.trafficTitle")}
        </h1>
        <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1">
          {t("admin.trafficSubtitle")}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-2xl bg-black/[0.04] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 w-fit">
        {[
          { id: "overview", label: t("admin.trafficOverview") },
          { id: "pages", label: t("admin.trafficPages") },
          { id: "visitors", label: t("admin.trafficVisitors") },
          { id: "flow", label: t("admin.trafficFlow") },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] shadow-md"
                : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white bg-black/5 dark:bg-white/5"
            }`}
            onClick={() => setActiveTab(tab.id as any)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: stats?.totalVisits ?? 0, label: t("admin.trafficTotalVisits"), gradient: "from-violet-500 to-purple-600" },
              { value: stats?.uniqueVisitors ?? 0, label: t("admin.trafficUniqueVisitors"), gradient: "from-pink-500 to-rose-600" },
              { value: stats?.todayVisits ?? 0, label: t("admin.trafficTodayVisits"), gradient: "from-cyan-500 to-blue-600" },
              { value: formatDuration(stats?.avgDuration ?? 0), label: t("admin.trafficAvgDuration"), gradient: "from-orange-500 to-amber-600" },
            ].map((stat, i) => (
              <div key={i} className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
                <div className={`h-1 bg-gradient-to-r ${stat.gradient}`} />
                <div className="p-5 text-center">
                  <p className="text-2xl font-bold text-[#1d1d1f] dark:text-white">{stat.value}</p>
                  <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Traffic by Day Chart */}
          <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
            <div className="h-1 bg-gradient-to-r from-violet-500 to-purple-500" />
            <div className="p-6">
              <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-4">
                {t("admin.trafficByDay")}
              </h3>
              <div className="flex items-end gap-1 h-40">
                {trafficByDay.map((day, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-violet-500 to-violet-400 rounded-t-sm transition-all duration-300 hover:from-violet-600 hover:to-violet-500"
                    style={{ height: `${(day.visits / maxDayVisits) * 100}%`, minHeight: day.visits > 0 ? "4px" : "0" }}
                    title={`${day.date}: ${day.visits} visitas`}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-[#aeaeb2] dark:text-[#636366]">
                <span>{trafficByDay[0]?.date}</span>
                <span>{trafficByDay[trafficByDay.length - 1]?.date}</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Pages Tab */}
      {activeTab === "pages" && (
        <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
          <div className="h-1 bg-gradient-to-r from-violet-500 to-purple-500" />
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/8 dark:border-white/8">
                  <th className="text-left text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] p-4">{t("admin.trafficPagePath")}</th>
                  <th className="text-right text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] p-4">{t("admin.trafficVisits")}</th>
                  <th className="text-right text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] p-4">{t("admin.trafficUniqueVisitors")}</th>
                </tr>
              </thead>
              <tbody>
                {trafficByPage.map((page, i) => (
                  <tr key={i} className="border-b border-black/4 dark:border-white/4 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
                    <td className="p-4">
                      <code className="text-xs font-mono text-[#1d1d1f] dark:text-white bg-black/5 dark:bg-white/10 px-2 py-1 rounded">
                        {page.path}
                      </code>
                    </td>
                    <td className="p-4 text-right text-sm font-semibold text-[#1d1d1f] dark:text-white">{page.visits}</td>
                    <td className="p-4 text-right text-sm text-[#6e6e73] dark:text-[#86868b]">{page.uniqueVisitors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {trafficByPage.length === 0 && (
            <div className="p-10 text-center text-sm text-[#6e6e73] dark:text-[#86868b]">
              {t("admin.trafficNoData")}
            </div>
          )}
        </div>
      )}

      {/* Visitors Tab */}
      {activeTab === "visitors" && (
        <div className="space-y-4">
          {selectedVisitor && (
            <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
              <div className="h-1 bg-gradient-to-r from-violet-500 to-purple-500" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
                    {t("admin.trafficVisitorHistory")} — <code className="text-xs">{selectedVisitor}</code>
                  </h3>
                  <button
                    className="text-xs text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
                    onClick={() => { setSelectedVisitor(null); setVisitorHistory([]); }}
                    type="button"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 16 16"><path d="M3 3l10 10M13 3L3 13"/></svg>
                  </button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {visitorHistory.map((h, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs">
                      <span className="text-[#aeaeb2] dark:text-[#636366] w-20 flex-shrink-0">{formatDate(h.created_at)}</span>
                      <code className="font-mono text-[#1d1d1f] dark:text-white bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded">{h.page_path}</code>
                      {h.duration_ms && <span className="text-[#6e6e73] dark:text-[#86868b]">{formatDuration(h.duration_ms)}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
            <div className="h-1 bg-gradient-to-r from-violet-500 to-purple-500" />
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black/8 dark:border-white/8">
                    <th className="text-left text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] p-4">{t("admin.trafficVisitorId")}</th>
                    <th className="text-left text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] p-4">{t("admin.trafficDevice")}</th>
                    <th className="text-left text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] p-4">{t("admin.trafficLastVisit")}</th>
                    <th className="text-left text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] p-4">{t("admin.trafficPages")}</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.map((v, i) => (
                    <tr
                      key={i}
                      className="border-b border-black/4 dark:border-white/4 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] cursor-pointer"
                      onClick={() => handleVisitorClick(v.visitorId)}
                    >
                      <td className="p-4">
                        <code className="text-[10px] font-mono text-[#6e6e73] dark:text-[#86868b]">
                          {v.visitorId.slice(0, 8)}...
                        </code>
                      </td>
                      <td className="p-4 text-sm">{parseUserAgent(v.userAgent)}</td>
                      <td className="p-4 text-xs text-[#6e6e73] dark:text-[#86868b]">{formatDate(v.lastVisit)}</td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {v.pages.slice(0, 3).map((p: string, j: number) => (
                            <span key={j} className="px-1.5 py-0.5 rounded text-[10px] bg-black/5 dark:bg-white/10 text-[#6e6e73] dark:text-[#86868b]">
                              {p}
                            </span>
                          ))}
                          {v.pages.length > 3 && (
                            <span className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">+{v.pages.length - 3}</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {visitors.length === 0 && (
              <div className="p-10 text-center text-sm text-[#6e6e73] dark:text-[#86868b]">
                {t("admin.trafficNoVisitors")}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Flow Tab */}
      {activeTab === "flow" && (
        <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
          <div className="h-1 bg-gradient-to-r from-violet-500 to-purple-500" />
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/8 dark:border-white/8">
                  <th className="text-left text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] p-4">{t("admin.trafficNavigationFlow")}</th>
                  <th className="text-right text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] p-4">{t("admin.trafficCount")}</th>
                </tr>
              </thead>
              <tbody>
                {flow.map((f, i) => (
                  <tr key={i} className="border-b border-black/4 dark:border-white/4">
                    <td className="p-4">
                      <code className="text-xs font-mono text-[#1d1d1f] dark:text-white">{f.flow}</code>
                    </td>
                    <td className="p-4 text-right text-sm font-semibold text-[#1d1d1f] dark:text-white">{f.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {flow.length === 0 && (
            <div className="p-10 text-center text-sm text-[#6e6e73] dark:text-[#86868b]">
              {t("admin.trafficNoFlowData")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
