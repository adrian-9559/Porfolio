import { useState, useEffect, useCallback, useMemo } from "react";

import { useAuth } from "./useAuth";

import {
  notificationService,
  type AppNotification,
  type NotificationPreferences,
} from "@/services/notificationService";

export type NotificationGroup = {
  label: string;
  notifications: AppNotification[];
};

const PREFS_KEY = "notification_preferences";

const DEFAULT_PREFS: NotificationPreferences = {
  sistema: true,
  agente: true,
  repositorio: true,
  admin: true,
  tricount: true,
  email_digest: false,
};

function loadPrefs(): NotificationPreferences {
  if (typeof window === "undefined") return DEFAULT_PREFS;
  try {
    const raw = localStorage.getItem(PREFS_KEY);

    if (!raw) return DEFAULT_PREFS;

    return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PREFS;
  }
}

function savePrefs(prefs: NotificationPreferences): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {
    // ignore
  }
}

function startOfDay(d: Date): Date {
  const r = new Date(d);

  r.setHours(0, 0, 0, 0);
  return r;
}

function daysDiff(a: Date, b: Date): number {
  return Math.floor(
    (startOfDay(a).getTime() - startOfDay(b).getTime()) / 86400000,
  );
}

function getRelativeLabel(iso: string): string {
  const now = new Date();
  const d = new Date(iso);
  const diff = daysDiff(now, d);

  if (diff === 0) return "today";
  if (diff === 1) return "yesterday";
  if (diff <= 6) return "thisWeek";
  if (diff <= 30) return "thisMonth";
  return "older";
}

export function groupByDate(
  notifications: AppNotification[],
): NotificationGroup[] {
  const map = new Map<string, AppNotification[]>();

  for (const n of notifications) {
    const key = getRelativeLabel(n.created_at);

    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(n);
  }

  const order = ["today", "yesterday", "thisWeek", "thisMonth", "older"];
  const groups: NotificationGroup[] = [];

  for (const key of order) {
    const items = map.get(key);

    if (items && items.length > 0) {
      groups.push({ label: key, notifications: items });
    }
  }

  return groups;
}

interface UseNotificationsReturn {
  notifications: AppNotification[];
  unread: number;
  loading: boolean;
  refresh: () => Promise<void>;
  markRead: (id: string) => Promise<void>;
  markAllRead: () => Promise<void>;
  deleteOne: (id: string) => Promise<void>;
  deleteAll: () => Promise<void>;
  preferences: NotificationPreferences;
  updatePreferences: (prefs: Partial<NotificationPreferences>) => void;
  groups: NotificationGroup[];
}

export function useNotifications(): UseNotificationsReturn {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] =
    useState<NotificationPreferences>(loadPrefs);

  const refresh = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const res = await notificationService.getAll();

      setNotifications(res.notifications);
      setUnread(res.unread);
    } catch {
      // silently ignore
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const markRead = useCallback(async (id: string) => {
    await notificationService.markRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
    setUnread((prev) => Math.max(0, prev - 1));
  }, []);

  const markAllRead = useCallback(async () => {
    await notificationService.markAllRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnread(0);
  }, []);

  const deleteOne = useCallback(
    async (id: string) => {
      const target = notifications.find((n) => n.id === id);

      await notificationService.deleteOne(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      if (target && !target.read) setUnread((prev) => Math.max(0, prev - 1));
    },
    [notifications],
  );

  const deleteAll = useCallback(async () => {
    await notificationService.deleteAll();
    setNotifications([]);
    setUnread(0);
  }, []);

  const updatePreferences = useCallback(
    (prefs: Partial<NotificationPreferences>) => {
      setPreferences((prev) => {
        const next = { ...prev, ...prefs };

        savePrefs(next);
        return next;
      });
    },
    [],
  );

  const groups = useMemo(
    () => groupByDate(notifications),
    [notifications],
  );

  return {
    notifications,
    unread,
    loading,
    refresh,
    markRead,
    markAllRead,
    deleteOne,
    deleteAll,
    preferences,
    updatePreferences,
    groups,
  };
}
