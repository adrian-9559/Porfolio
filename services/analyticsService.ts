import { apiFetch } from "./apiClient";

interface AnalyticsStats {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
  avgDuration: number;
}

interface TrafficByPage {
  path: string;
  visits: number;
  uniqueVisitors: number;
}

interface TrafficByDay {
  date: string;
  visits: number;
}

interface RecentVisitor {
  visitorId: string;
  lastVisit: string;
  pages: string[];
  userAgent?: string;
  sessionId: string;
}

interface VisitorHistory {
  id: string;
  visitor_id: string;
  page_path: string;
  page_title?: string;
  referrer?: string;
  user_agent?: string;
  session_id: string;
  is_new_visitor: boolean;
  duration_ms?: number;
  created_at: string;
}

interface NavigationFlow {
  flow: string;
  count: number;
}

export const analyticsService = {
  async getStats(): Promise<AnalyticsStats> {
    const res = await apiFetch<{ data: AnalyticsStats }>("/api/analytics/stats");
    return (res as any).data;
  },

  async getTrafficByPage(): Promise<TrafficByPage[]> {
    const res = await apiFetch<{ data: TrafficByPage[] }>("/api/analytics/traffic");
    return (res as any).data;
  },

  async getTrafficByDay(days: number = 30): Promise<TrafficByDay[]> {
    const res = await apiFetch<{ data: TrafficByDay[] }>(`/api/analytics/traffic-by-day?days=${days}`);
    return (res as any).data;
  },

  async getRecentVisitors(limit: number = 20): Promise<RecentVisitor[]> {
    const res = await apiFetch<{ data: RecentVisitor[] }>(`/api/analytics/visitors?limit=${limit}`);
    return (res as any).data;
  },

  async getVisitorHistory(visitorId: string): Promise<VisitorHistory[]> {
    const res = await apiFetch<{ data: VisitorHistory[] }>(`/api/analytics/visitor/${visitorId}`);
    return (res as any).data;
  },

  async getNavigationFlow(): Promise<NavigationFlow[]> {
    const res = await apiFetch<{ data: NavigationFlow[] }>("/api/analytics/flow");
    return (res as any).data;
  },
};
