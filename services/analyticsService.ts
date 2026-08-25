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
    return apiFetch<AnalyticsStats>("/api/analytics/stats");
  },

  async getTrafficByPage(): Promise<TrafficByPage[]> {
    return apiFetch<TrafficByPage[]>("/api/analytics/traffic");
  },

  async getTrafficByDay(days: number = 30): Promise<TrafficByDay[]> {
    return apiFetch<TrafficByDay[]>(`/api/analytics/traffic-by-day?days=${days}`);
  },

  async getRecentVisitors(limit: number = 20): Promise<RecentVisitor[]> {
    return apiFetch<RecentVisitor[]>(`/api/analytics/visitors?limit=${limit}`);
  },

  async getVisitorHistory(visitorId: string): Promise<VisitorHistory[]> {
    return apiFetch<VisitorHistory[]>(`/api/analytics/visitor/${visitorId}`);
  },

  async getNavigationFlow(): Promise<NavigationFlow[]> {
    return apiFetch<NavigationFlow[]>("/api/analytics/flow");
  },
};
