"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import DefaultLayout from "@/layouts/default";
import { useT } from "@/hooks/useT";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useAuth } from "@/hooks/useAuth";
import { allContent, contentHref } from "@/lib/blog/registry";
import ScrollReveal from "@/components/ui/ScrollReveal";

// ── Animated Counter ──────────────────────────────────────────────────────────

function AnimatedCounter({ value, shouldAnimate }: { value: number; shouldAnimate: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) return;
    let start = 0;
    const duration = 1200;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [shouldAnimate, value]);

  return <span>{count}</span>;
}

// ── Services definition ───────────────────────────────────────────────────────

const servicesDef = (t: (k: string) => string) => [
  {
    id: "repositories",
    label: t("profile.serviceRepos"),
    desc: t("profile.serviceReposDesc"),
    href: "/dashboard?s=repositories",
    gradient: "from-sky-400 to-blue-500",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
  },
  {
    id: "agents",
    label: t("profile.serviceAgents"),
    desc: t("profile.serviceAgentsDesc"),
    href: "/dashboard?s=agents",
    gradient: "from-violet-400 to-purple-500",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "tricount",
    label: t("profile.serviceTricount"),
    desc: t("profile.serviceTricountDesc"),
    href: "/dashboard?s=tricount",
    gradient: "from-emerald-400 to-green-500",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "friends",
    label: t("profile.serviceFriends"),
    desc: t("profile.serviceFriendsDesc"),
    href: "/dashboard?s=friends",
    gradient: "from-pink-400 to-rose-500",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: "notifications",
    label: t("profile.serviceNotifications"),
    desc: t("profile.serviceNotificationsDesc"),
    href: "/dashboard?s=notifications",
    gradient: "from-amber-400 to-orange-500",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 8.165 6 10.388 6 13v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
];

const quickActionsDef = (t: (k: string) => string) => [
  {
    label: t("profile.panelBtn"),
    href: "/dashboard",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: t("profile.configBtn"),
    href: "/configuracion",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: t("profile.blogBtn"),
    href: "/blog",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
];

const articles = allContent.filter((c) => c.type === "article").slice(0, 5);
const tutorials = allContent.filter((c) => c.type === "tutorial").slice(0, 5);
const tools = allContent.filter((c) => c.type === "tool").slice(0, 5);

// ── Main page ─────────────────────────────────────────────────────────────────

export default function PerfilPage() {
  const { t } = useT();
  const { isAuthenticated, loadingAuth } = useRequireAuth();
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const SERVICES = servicesDef(t);
  const QUICK_ACTIONS = quickActionsDef(t);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  if (loadingAuth || !isAuthenticated) {
    return (
      <DefaultLayout>
        <div className="flex justify-center py-20">
          <div className="w-5 h-5 rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin" />
        </div>
      </DefaultLayout>
    );
  }

  const displayName = user?.profile?.full_name ?? user?.email ?? t("profile.fullName");
  const firstName = displayName.split(" ")[0];
  const initials = displayName.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();
  const memberSince = (user as any)?.created_at ? new Date((user as any).created_at).getFullYear() : new Date().getFullYear();

  const stats = [
    { label: t("profile.statArticles"), value: allContent.filter((c) => c.type === "article").length, gradient: "from-amber-500 to-orange-500", icon: (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )},
    { label: t("profile.statTutorials"), value: allContent.filter((c) => c.type === "tutorial").length, gradient: "from-violet-500 to-purple-500", icon: (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    )},
    { label: t("profile.statTools"), value: allContent.filter((c) => c.type === "tool").length, gradient: "from-cyan-500 to-blue-500", icon: (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      </svg>
    )},
    { label: t("profile.statServices"), value: SERVICES.length, gradient: "from-emerald-500 to-green-500", icon: (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )},
  ];

  return (
    <DefaultLayout>
      <div className="relative">
        {/* Background decorativo */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="blob absolute top-[-100px] left-[5%] w-[450px] h-[450px] bg-gradient-radial from-violet-500/15 via-purple-400/8 to-transparent" />
          <div className="blob absolute top-[20%] right-[-5%] w-[350px] h-[350px] bg-gradient-to-bl from-pink-500/10 via-rose-400/5 to-transparent" />
          <div className="blob absolute bottom-[-60px] left-[30%] w-[400px] h-[300px] bg-gradient-to-tr from-cyan-400/10 via-blue-400/5 to-transparent" />
          <div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(99,102,241,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.8) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto space-y-8 py-4">
          {/* Breadcrumb */}
          <ScrollReveal>
            <nav className="flex items-center gap-2">
              <Link className="text-xs text-[#aeaeb2] dark:text-[#636366] hover:text-[#6e6e73] dark:hover:text-[#86868b] transition-colors no-underline" href="/dashboard">
                {t("profile.panelBtn")}
              </Link>
              <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">/</span>
              <span className="text-xs text-[#1d1d1f] dark:text-white font-medium">
                {t("profile.title")}
              </span>
            </nav>
          </ScrollReveal>

          {/* Hero card */}
          <ScrollReveal>
            <div className="relative rounded-3xl overflow-hidden border border-black/8 dark:border-white/8">
              {/* Banner */}
              <div className="relative h-40 bg-gradient-to-br from-violet-600 via-pink-600 to-cyan-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/30 via-transparent to-transparent" />
                <div className="absolute -top-20 left-[20%] w-60 h-60 bg-violet-500/40 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 right-[15%] w-60 h-60 bg-pink-500/40 rounded-full blur-3xl" />
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                <button
                  className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-sm text-white text-xs font-medium hover:bg-white/30 transition-colors"
                  onClick={() => router.push("/configuracion")}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {t("profile.configBtn")}
                </button>
              </div>

              {/* Profile info */}
              <div className="px-6 pb-6 bg-white dark:bg-[#111116]">
                <div className="flex items-end justify-between gap-4 -mt-12 mb-5">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border-4 border-white dark:border-[#111116] flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-400/40 via-pink-400/30 to-cyan-400/30 blur-xl scale-110" />
                    <div className="relative w-full h-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                      {user?.profile?.avatar_url ? (
                        <img alt="" className="w-full h-full object-cover" src={user.profile.avatar_url} />
                      ) : (
                        initials
                      )}
                    </div>
                  </div>
                  <div className="pb-1 flex gap-2">
                    {isAdmin && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
                        {t("admin.adminBadge")}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                      </span>
                      {t("profile.activeBadge")}
                    </span>
                  </div>
                </div>
                <h1
                  className="text-2xl font-black text-[#1d1d1f] dark:text-white hero-gradient-text"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {t("profile.greeting", { name: firstName })}
                </h1>
                <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-0.5">{user?.email}</p>
                <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-1">
                  {t("profile.memberSince", { year: memberSince })}
                </p>
              </div>

              {/* Stats bar */}
              <div ref={statsRef} className="border-t border-black/8 dark:border-white/8 grid grid-cols-4 bg-white dark:bg-[#111116]">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex flex-col items-center py-5 px-2 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors ${i < stats.length - 1 ? "border-r border-black/8 dark:border-white/8" : ""}`}
                  >
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-2 shadow-md`}>
                      {s.icon}
                    </div>
                    <p className="text-xl font-black text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>
                      <AnimatedCounter value={s.value} shouldAnimate={statsVisible} />
                    </p>
                    <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366] font-semibold uppercase tracking-wide mt-0.5">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Services */}
          <ScrollReveal>
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-widest">
                {t("profile.services")}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {SERVICES.map((s, idx) => (
                  <ScrollReveal key={s.id} delay={idx * 60}>
                    <Link
                      className="group block p-4 rounded-xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-xl transition-all duration-300 no-underline relative overflow-hidden"
                      href={s.href}
                    >
                      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${s.gradient} opacity-60`} />
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        {s.icon}
                      </div>
                      <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                        {s.label}
                      </p>
                      <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366] mt-0.5 leading-tight">
                        {s.desc}
                      </p>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Content + Quick actions */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ScrollReveal delay={0}>
                <ContentGroup
                  gradient="from-amber-500 to-orange-500"
                  href="/blog/articulos"
                  items={articles}
                  title={t("profile.statArticles")}
                />
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <ContentGroup
                  gradient="from-violet-500 to-purple-500"
                  href="/campus"
                  items={tutorials}
                  title={t("profile.statTutorials")}
                />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <ContentGroup
                  gradient="from-cyan-500 to-blue-500"
                  href="/blog/herramientas"
                  items={tools}
                  title={t("profile.statTools")}
                />
              </ScrollReveal>
            </div>

            {/* Quick actions */}
            <ScrollReveal delay={300}>
              <div className="rounded-xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 p-4 flex flex-col gap-2 h-full">
                <h3 className="text-xs font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-widest mb-1">
                  {t("profile.quickActions")}
                </h3>
                {QUICK_ACTIONS.map((a) => (
                  <Link
                    key={a.href}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 hover:border-black/15 dark:hover:border-white/15 text-xs font-medium text-[#1d1d1f] dark:text-white transition-all no-underline"
                    href={a.href}
                  >
                    <span className="text-[#6e6e73] dark:text-[#86868b]">{a.icon}</span>
                    {a.label}
                  </Link>
                ))}
                <div className="mt-auto pt-2">
                  <button
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white text-xs font-semibold hover:from-violet-600 hover:to-pink-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                    onClick={() => router.push("/configuracion")}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {t("profile.editProfile")}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

// ── Content group component ───────────────────────────────────────────────────

function ContentGroup({
  title,
  gradient,
  items,
  href,
}: {
  title: string;
  gradient: string;
  items: typeof articles;
  href: string;
}) {
  const { t } = useT();

  return (
    <div className="rounded-xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 p-4 h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm`}>
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xs font-bold text-[#1d1d1f] dark:text-white">{title}</h3>
        </div>
        <Link
          className="text-[10px] font-semibold text-violet-600 dark:text-violet-400 hover:underline no-underline"
          href={href}
        >
          {t("profile.viewAll")}
        </Link>
      </div>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              className="text-xs text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors no-underline line-clamp-1"
              href={contentHref(item.type, item.slug)}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
