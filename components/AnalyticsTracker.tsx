"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getVisitorId(): string {
  try {
    let id = localStorage.getItem("analytics_visitor_id");
    if (!id) {
      id = generateUUID();
      localStorage.setItem("analytics_visitor_id", id);
    }
    return id;
  } catch {
    return generateUUID();
  }
}

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem("analytics_session_id");
    if (!id) {
      id = generateUUID();
      sessionStorage.setItem("analytics_session_id", id);
    }
    return id;
  } catch {
    return generateUUID();
  }
}

function isNewVisitor(): boolean {
  try {
    return !localStorage.getItem("analytics_visited");
  } catch {
    return true;
  }
}

function markVisited(): void {
  try {
    localStorage.setItem("analytics_visited", "1");
  } catch {}
}

function sendPageView(path: string) {
  try {
    const visitorId = getVisitorId();
    const sessionId = getSessionId();
    const isNew = isNewVisitor();

    if (isNew) markVisited();

    const payload = {
      visitor_id: visitorId,
      page_path: path,
      page_title: document.title,
      referrer: document.referrer || undefined,
      user_agent: navigator.userAgent,
      screen_width: window.screen.width,
      language: navigator.language,
      session_id: sessionId,
      is_new_visitor: isNew,
    };

    navigator.sendBeacon?.(
      "/api/analytics/track",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    ) ?? fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {}
}

function sendDuration(sessionId: string, startTime: number) {
  try {
    const durationMs = Date.now() - startTime;
    if (durationMs < 1000) return;

    navigator.sendBeacon?.(
      "/api/analytics/duration",
      new Blob(
        [JSON.stringify({ session_id: sessionId, duration_ms: durationMs })],
        { type: "application/json" }
      )
    ) ?? fetch("/api/analytics/duration", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId, duration_ms: durationMs }),
      keepalive: true,
    });
  } catch {}
}

export default function AnalyticsTracker() {
  const router = useRouter();
  const startTimeRef = useRef(Date.now());
  const sessionIdRef = useRef(getSessionId());
  const currentPathRef = useRef(router.asPath);

  useEffect(() => {
    sendPageView(router.asPath);
    currentPathRef.current = router.asPath;

    const handleRouteChange = (url: string) => {
      sendPageView(url);
      currentPathRef.current = url;
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sendDuration(sessionIdRef.current, startTimeRef.current);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendDuration(sessionIdRef.current, startTimeRef.current);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      sendDuration(sessionIdRef.current, startTimeRef.current);
    };
  }, []);

  return null;
}
