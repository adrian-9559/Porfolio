import { useState, useEffect, useCallback } from "react";
import { notificationService, type AppNotification } from "@/services/notificationService";
import { useAuth } from "./useAuth";

interface UseNotificationsReturn {
  notifications: AppNotification[];
  unread: number;
  loading: boolean;
  refresh: () => Promise<void>;
  markRead: (id: string) => Promise<void>;
  markAllRead: () => Promise<void>;
  deleteOne: (id: string) => Promise<void>;
  deleteAll: () => Promise<void>;
}

export function useNotifications(): UseNotificationsReturn {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const res = await notificationService.getAll();
      setNotifications(res.notifications);
      setUnread(res.unread);
    } catch {
      // silently ignore — user might not be authed yet
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
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnread((prev) => Math.max(0, prev - 1));
  }, []);

  const markAllRead = useCallback(async () => {
    await notificationService.markAllRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnread(0);
  }, []);

  const deleteOne = useCallback(async (id: string) => {
    const target = notifications.find((n) => n.id === id);
    await notificationService.deleteOne(id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    if (target && !target.read) setUnread((prev) => Math.max(0, prev - 1));
  }, [notifications]);

  const deleteAll = useCallback(async () => {
    await notificationService.deleteAll();
    setNotifications([]);
    setUnread(0);
  }, []);

  return { notifications, unread, loading, refresh, markRead, markAllRead, deleteOne, deleteAll };
}
