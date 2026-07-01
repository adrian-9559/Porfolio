import { useRouter } from "next/router";
import Link from "next/link";

import DefaultLayout from "@/layouts/default";
import { useT } from "@/hooks/useT";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useAuth } from "@/hooks/useAuth";
import { allContent } from "@/lib/blog/registry";

const servicesDef = (t: (k: string) => string) => [
  { id: "repositories", label: t("profile.serviceRepos"), icon: "📂", desc: t("profile.serviceReposDesc"), href: "/dashboard?s=repositories", color: "from-sky-400 to-blue-500" },
  { id: "agents", label: t("profile.serviceAgents"), icon: "🤖", desc: t("profile.serviceAgentsDesc"), href: "/dashboard?s=agents", color: "from-violet-400 to-purple-500" },
  { id: "tricount", label: t("profile.serviceTricount"), icon: "💸", desc: t("profile.serviceTricountDesc"), href: "/dashboard?s=tricount", color: "from-emerald-400 to-green-500" },
  { id: "friends", label: t("profile.serviceFriends"), icon: "👥", desc: t("profile.serviceFriendsDesc"), href: "/dashboard?s=friends", color: "from-pink-400 to-rose-500" },
  { id: "notifications", label: t("profile.serviceNotifications"), icon: "🔔", desc: t("profile.serviceNotificationsDesc"), href: "/dashboard?s=notifications", color: "from-amber-400 to-orange-500" },
];

const articles = allContent.filter((c) => c.type === "article").slice(0, 5);
const tutorials = allContent.filter((c) => c.type === "tutorial").slice(0, 5);
const tools = allContent.filter((c) => c.type === "tool").slice(0, 5);

const quickActionsDef = (t: (k: string) => string) => [
  { label: t("profile.panelBtn"), href: "/dashboard", icon: "🏠" },
  { label: t("profile.configBtn"), href: "/configuracion", icon: "⚙️" },
  { label: t("profile.blogBtn"), href: "/blog", icon: "📚" },
];

export default function PerfilPage() {
  const { t } = useT();
  const { isAuthenticated, loadingAuth } = useRequireAuth();
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const SERVICES = servicesDef(t);
  const QUICK_ACTIONS = quickActionsDef(t);

  if (loadingAuth || !isAuthenticated) {
    return (
      <DefaultLayout>
        <div className="flex justify-center py-20">
          <div className="w-5 h-5 rounded-full border-2 border-blue-600/30 border-t-blue-600 animate-spin" />
        </div>
      </DefaultLayout>
    );
  }

  const displayName = user?.profile?.full_name ?? user?.email ?? t("profile.fullName");
  const firstName = displayName.split(" ")[0];
  const initials = displayName
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const memberSince = (user as any)?.created_at
    ? new Date((user as any).created_at).getFullYear()
    : new Date().getFullYear();

  const stats = [
    {
      label: t("profile.statArticles"),
      value: allContent.filter((c) => c.type === "article").length,
      icon: "📖",
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/30",
    },
    {
      label: t("profile.statTutorials"),
      value: allContent.filter((c) => c.type === "tutorial").length,
      icon: "🎓",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      label: t("profile.statTools"),
      value: allContent.filter((c) => c.type === "tool").length,
      icon: "🔧",
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-50 dark:bg-violet-950/30",
    },
    {
      label: t("profile.statServices"),
      value: SERVICES.length,
      icon: "⚡",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
    },
  ];

  return (
    <DefaultLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2">
          <Link
            className="text-xs text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
            href="/dashboard"
          >
            {t("profile.panelBtn")}
          </Link>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">/</span>
          <span className="text-xs text-[#1d1d1f] dark:text-white font-medium">
            {t("profile.title")}
          </span>
        </div>

        {/* Hero card */}
        <div className="rounded-3xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] overflow-hidden">
          {/* Banner */}
          <div className="h-36 relative bg-gradient-to-r from-blue-600 via-violet-600 to-pink-500">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
            <button
              className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-sm text-white text-xs font-medium hover:bg-white/30 transition-colors"
              onClick={() => router.push("/configuracion")}
            >
              <IcoGear />
              {t("profile.configBtn")}
            </button>
          </div>

          {/* Profile info */}
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between gap-4 -mt-12 mb-5">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-white dark:border-[#111116] overflow-hidden flex-shrink-0 shadow-xl">
                {user?.profile?.avatar_url ? (
                  <img
                    alt=""
                    className="w-full h-full object-cover"
                    src={user.profile.avatar_url}
                  />
                ) : (
                  initials
                )}
              </div>
              <div className="pb-1 flex gap-2">
                {isAdmin && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
                    {t("admin.adminBadge")}
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
                  {t("profile.activeBadge")}
                </span>
              </div>
            </div>
            <h1
              className="text-2xl font-bold text-[#1d1d1f] dark:text-white"
              style={{ letterSpacing: "-0.02em" }}
            >
              {t("profile.greeting", { name: firstName })}
            </h1>
            <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-0.5">
              {user?.email}
            </p>
            <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-1">
              {t("profile.memberSince", { year: memberSince })}
            </p>
          </div>

          {/* Stats bar */}
          <div className="border-t border-black/8 dark:border-white/8 grid grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col items-center py-4 px-2 ${i < stats.length - 1 ? "border-r border-black/8 dark:border-white/8" : ""}`}
              >
                <span
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm mb-2 ${s.bg}`}
                >
                  {s.icon}
                </span>
                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366] mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-base font-bold text-[#1d1d1f] dark:text-white mb-3">
            {t("profile.services")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {SERVICES.map((s) => (
              <Link
                key={s.id}
                className="group p-4 rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] hover:border-black/15 dark:hover:border-white/15 hover:shadow-md transition-all text-center no-underline"
                href={s.href}
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-lg mx-auto mb-2.5 group-hover:scale-110 transition-transform`}
                >
                  {s.icon}
                </div>
                <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {s.label}
                </p>
                <p className="text-[10px] text-[#6e6e73] dark:text-[#86868b] mt-0.5 leading-tight">
                  {s.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Blog content + Quick actions row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ContentGroup
              color="text-amber-600 dark:text-amber-400"
              emoji="📖"
              href="/blog/articulos"
              items={articles}
              title={t("profile.statArticles")}
            />
            <ContentGroup
              color="text-blue-600 dark:text-blue-400"
              emoji="🎓"
              href="/blog/tutoriales"
              items={tutorials}
              title={t("profile.statTutorials")}
            />
            <ContentGroup
              color="text-violet-600 dark:text-violet-400"
              emoji="🔧"
              href="/blog/herramientas"
              items={tools}
              title={t("profile.statTools")}
            />
          </div>

          {/* Quick actions vertical */}
          <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-4 flex flex-col gap-2">
            <h3 className="text-xs font-bold text-[#1d1d1f] dark:text-white mb-1">
              {t("profile.quickActions")}
            </h3>
            {QUICK_ACTIONS.map((a) => (
              <Link
                key={a.href}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 text-xs font-medium text-[#1d1d1f] dark:text-white transition-all no-underline"
                href={a.href}
              >
                <span className="text-sm">{a.icon}</span>
                {a.label}
              </Link>
            ))}
            <div className="mt-auto pt-2">
              <button
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] text-xs font-medium hover:opacity-80 transition-opacity"
                onClick={() => router.push("/configuracion")}
              >
                <IcoGear />
                {t("profile.editProfile")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

function ContentGroup({
  title,
  emoji,
  items,
  href,
  color,
}: {
  title: string;
  emoji: string;
  items: typeof articles;
  href: string;
  color: string;
}) {
  const { t } = useT();
  return (
    <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <span>{emoji}</span>
          <h3 className="text-sm font-bold text-[#1d1d1f] dark:text-white">
            {title}
          </h3>
        </div>
        <Link
          className={`text-xs font-medium ${color} hover:underline no-underline`}
          href={href}
        >
          {t("profile.viewAll")}
        </Link>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              className="text-xs text-[#3d3d3d] dark:text-[#c0c0c5] hover:text-[#1d1d1f] dark:hover:text-white transition-colors no-underline line-clamp-1"
              href={`/blog/${item.slug}`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function IcoGear() {
  return (
    <svg
      fill="none"
      height="12"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
      width="12"
    >
      <circle cx="8" cy="8" r="2" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" />
    </svg>
  );
}
