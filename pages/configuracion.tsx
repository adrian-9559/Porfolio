import { useEffect, useState } from "react";
import Link from "next/link";

import DefaultLayout from "@/layouts/default";
import { useT } from "@/hooks/useT";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { useLocaleStore } from "@/store/localeStore";
import { userService } from "@/services/userService";
import { authService } from "@/services/authService";
import type { UserPreferences } from "@/types/auth";
import { PasswordField } from "@/features/settings/components/PasswordField";
import { SessionList } from "@/features/settings/components/SessionList";
import { DangerZone } from "@/features/settings/components/DangerZone";

type Tab = "perfil" | "seguridad" | "notificaciones" | "apariencia" | "idioma" | "cuenta";

const inputCls =
  "w-full px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/[0.03] dark:bg-white/[0.05] text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[10px] font-semibold uppercase tracking-wider text-muted/60 block mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function Toggle({
  val,
  set,
  label,
  desc,
}: {
  val: boolean;
  set: (v: boolean) => void;
  label: string;
  desc: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-black/6 dark:border-white/6 last:border-0">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted mt-0.5">{desc}</p>
      </div>
      <button
        className={`w-10 h-6 rounded-full transition-colors flex-shrink-0 relative ${val ? "bg-blue-600" : "bg-black/15 dark:bg-white/15"}`}
        onClick={() => set(!val)}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${val ? "translate-x-4" : "translate-x-0.5"}`}
        />
      </button>
    </div>
  );
}

export default function ConfiguracionPage() {
  const { t } = useT();
  const { isAuthenticated, loadingAuth } = useRequireAuth();
  const [tab, setTab] = useState<Tab>("perfil");

  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "perfil", label: t("user.tabProfile"), icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} /><circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} /></svg> },
    { id: "seguridad", label: t("user.tabSecurity"), icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} /></svg> },
    { id: "notificaciones", label: t("user.tabNotifications"), icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} /></svg> },
    { id: "apariencia", label: t("user.tabAppearance"), icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} /></svg> },
    { id: "idioma", label: t("user.tabLanguage"), icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} /></svg> },
    { id: "cuenta", label: t("user.tabAccount"), icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} /></svg> },
  ];

  if (loadingAuth || !isAuthenticated) {
    return (
      <DefaultLayout>
        <div className="flex justify-center py-20">
          <div className="w-5 h-5 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Breadcrumb + header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link className="text-xs text-muted hover:text-foreground transition-colors" href="/perfil">
              {t("profile.title")}
            </Link>
            <span className="text-xs text-muted/60">/</span>
            <span className="text-xs text-foreground font-medium">{t("settings.title")}</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground" style={{ letterSpacing: "-0.02em" }}>
            {t("settings.title")}
          </h1>
          <p className="text-sm text-muted mt-1">{t("settings.subtitle")}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] w-fit flex-wrap">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${tab === t.id ? "bg-white dark:bg-[#1c1c22] text-foreground shadow-sm" : "text-muted hover:text-foreground"}`}
              onClick={() => setTab(t.id)}
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="rounded-2xl border border-border bg-surface p-6">
          {tab === "perfil" && <PerfilTab />}
          {tab === "seguridad" && <SeguridadTab />}
          {tab === "notificaciones" && <NotificacionesTab />}
          {tab === "apariencia" && <AparienciaTab />}
          {tab === "idioma" && <IdiomaTab />}
          {tab === "cuenta" && <CuentaTab />}
        </div>
      </div>
    </DefaultLayout>
  );
}

// ── Perfil Tab ────────────────────────────────────────────────────────────────

function PerfilTab() {
  const { t } = useT();
  const { user } = useAuth();
  const hydrate = useAuthStore((s) => s.hydrate);
  const [name, setName] = useState(user?.profile?.full_name ?? "");
  const [bio, setBio] = useState(user?.profile?.bio ?? "");
  const [website, setWebsite] = useState(user?.profile?.website ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.profile) {
      setName(user.profile.full_name ?? "");
      setBio(user.profile.bio ?? "");
      setWebsite(user.profile.website ?? "");
    }
  }, [user]);

  async function save() {
    if (!user) return;
    setSaving(true);
    setError("");
    try {
      await userService.updateProfile(user.id, {
        full_name: name,
        bio: bio || null,
        website: website || null,
      });
      await hydrate();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setError(t("settings.preferencesError"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold text-foreground mb-1">{t("settings.profileInfo")}</h2>
        <p className="text-xs text-muted">{t("settings.profileInfoDesc")}</p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold overflow-hidden flex-shrink-0">
          {user?.profile?.avatar_url ? (
            <img alt="" className="w-full h-full object-cover" src={user.profile.avatar_url} />
          ) : (
            <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
              <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
            </svg>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <Field label={t("settings.profile")}>
          <input
            className={inputCls}
            placeholder={t("settings.fullNamePlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>

        <Field label={t("auth.email")}>
          <input
            disabled
            className="w-full px-3 py-2 rounded-xl border border-border bg-black/[0.03] dark:bg-white/[0.03] text-sm text-muted/60 cursor-not-allowed"
            value={user?.email ?? ""}
          />
          <p className="text-xs text-muted/60 mt-1">{t("settings.emailNotChangable")}</p>
        </Field>

        <Field label={t("profile.bio")}>
          <textarea
            className={`${inputCls} resize-none`}
            placeholder={t("settings.bioPlaceholder")}
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Field>

        <Field label={t("profile.website")}>
          <input
            className={inputCls}
            placeholder={t("settings.websitePlaceholder")}
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </Field>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        className={`flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-xl transition-all ${saved ? "bg-emerald-600 text-white" : "bg-accent hover:bg-accent-hover text-accent-foreground"} disabled:opacity-50`}
        disabled={saving}
        onClick={save}
      >
        {saved ? <>✓ {t("settings.saved")}</> : t("settings.saveChanges")}
      </button>
    </div>
  );
}

// ── Seguridad Tab ─────────────────────────────────────────────────────────────

function SeguridadTab() {
  const { t } = useT();
  const [current, setCurrent] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function changePassword() {
    if (!current || !newPwd || !confirm) {
      setMsg(t("settings.fillAllFields"));
      setError(true);
      return;
    }
    if (newPwd !== confirm) {
      setMsg(t("settings.newPasswordMismatch"));
      setError(true);
      return;
    }
    if (newPwd.length < 8) {
      setMsg(t("settings.minChars"));
      setError(true);
      return;
    }
    setLoading(true);
    setError(false);
    try {
      await authService.changePassword(current, newPwd);
      setMsg(t("settings.changePasswordSuccess"));
      setError(false);
      setCurrent("");
      setNewPwd("");
      setConfirm("");
    } catch {
      setMsg(t("settings.changePasswordError"));
      setError(true);
    } finally {
      setLoading(false);
      setTimeout(() => setMsg(""), 3000);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-base font-bold text-foreground mb-1">{t("settings.changePassword")}</h2>
        <p className="text-xs text-muted mb-5">{t("settings.changePasswordSubtitle")}</p>
        <div className="space-y-3">
          <PasswordField
            autoComplete="current-password"
            label={t("settings.currentPassword")}
            value={current}
            onChange={setCurrent}
          />
          <PasswordField
            autoComplete="new-password"
            label={t("settings.newPassword")}
            value={newPwd}
            onChange={setNewPwd}
          />
          <PasswordField
            autoComplete="new-password"
            label={t("settings.confirmNewPassword")}
            value={confirm}
            onChange={setConfirm}
          />
        </div>
        {msg && (
          <p className={`text-xs mt-2 ${error ? "text-red-500" : "text-emerald-600 dark:text-emerald-400"}`}>
            {msg}
          </p>
        )}
        <button
          className="mt-4 bg-accent hover:bg-accent-hover text-accent-foreground text-sm font-semibold px-5 py-2 rounded-xl transition-colors disabled:opacity-50"
          disabled={loading}
          onClick={changePassword}
        >
          {loading ? "…" : t("settings.updatePassword")}
        </button>
      </div>

      <SessionList />
    </div>
  );
}

// ── Notificaciones Tab ────────────────────────────────────────────────────────

function NotificacionesTab() {
  const { t } = useT();
  const [prefs, setPrefs] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    userService.getPreferences().then((p) => {
      setPrefs(p);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  async function update(key: keyof UserPreferences, value: boolean) {
    if (!prefs) return;
    const updated = { ...prefs, [key]: value };
    setPrefs(updated);
    try {
      await userService.updatePreferences({ [key]: value });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {}
  }

  if (loading) return <div className="flex justify-center py-8"><div className="w-5 h-5 rounded-full border-2 border-accent/30 border-t-accent animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold text-foreground mb-1">{t("user.tabNotifications")}</h2>
        <p className="text-xs text-muted">{t("settings.appearanceDesc")}</p>
      </div>

      <div className="rounded-xl border border-border px-4">
        <Toggle
          desc={t("settings.emailNotificationsDesc")}
          label={t("settings.emailNotifications")}
          set={(v) => update("email_notifications", v)}
          val={prefs?.email_notifications ?? true}
        />
        <Toggle
          desc={t("settings.blogUpdatesDesc")}
          label={t("settings.blogUpdates")}
          set={(v) => update("blog_updates", v)}
          val={prefs?.blog_updates ?? false}
        />
        <Toggle
          desc={t("settings.soundEnabledDesc")}
          label={t("settings.soundEnabled")}
          set={() => {}}
          val={true}
        />
        <Toggle
          desc={t("settings.emailDigestDesc")}
          label={t("settings.emailDigest")}
          set={() => {}}
          val={false}
        />
      </div>

      {saved && (
        <p className="text-xs text-emerald-600 dark:text-emerald-400">
          ✓ {t("settings.preferencesSaved")}
        </p>
      )}
    </div>
  );
}

// ── Apariencia Tab ────────────────────────────────────────────────────────────

function AparienciaTab() {
  const { t } = useT();
  const [mounted, setMounted] = useState(false);
  const [theme, setThemeState] = useState("system");

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    if (stored) {
      const parsed = JSON.parse(stored);
      setThemeState(parsed?.state?.theme ?? "system");
    }
  }, []);

  function setTheme(id: string) {
    setThemeState(id);
    const root = document.documentElement;
    if (id === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
    } else if (id === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("light", "dark");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(prefersDark ? "dark" : "light");
    }
  }

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold text-foreground mb-1">{t("user.tabAppearance")}</h2>
        <p className="text-xs text-muted">{t("settings.appearanceDesc")}</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { id: "light", label: t("settings.themeLight"), icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} /></svg> },
          { id: "dark", label: t("settings.themeDark"), icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} /></svg> },
          { id: "system", label: t("settings.themeSystem"), icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect height="14" rx="2" strokeWidth={1.5} width="20" x="2" y="3" /><path d="M8 21h8M12 17v4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} /></svg> },
        ].map((opt) => (
          <button
            key={opt.id}
            className={`p-4 rounded-xl border text-center transition-all ${theme === opt.id ? "border-accent bg-accent/10" : "border-border/30 hover:bg-black/3 dark:hover:bg-white/3"}`}
            onClick={() => setTheme(opt.id)}
          >
            <div className="flex justify-center text-foreground">{opt.icon}</div>
            <p className="text-xs font-medium text-foreground mt-2">{opt.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Idioma Tab ────────────────────────────────────────────────────────────────

function IdiomaTab() {
  const { t } = useT();
  const { locale, setLocale } = useLocaleStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold text-foreground mb-1">{t("user.tabLanguage")}</h2>
        <p className="text-xs text-muted">{t("settings.appearanceDesc")}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { id: "es" as const, label: "Español", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} /></svg> },
          { id: "en" as const, label: "English", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} /></svg> },
        ].map((opt) => (
          <button
            key={opt.id}
            className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${locale === opt.id ? "border-accent bg-accent/10" : "border-border/30 hover:bg-black/3 dark:hover:bg-white/3"}`}
            onClick={() => setLocale(opt.id)}
          >
            <div className="text-foreground">{opt.icon}</div>
            <span className="text-sm font-medium text-foreground">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Cuenta Tab ────────────────────────────────────────────────────────────────

function CuentaTab() {
  const { t } = useT();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold text-foreground mb-1">{t("user.tabAccount")}</h2>
        <p className="text-xs text-muted">{t("settings.dangerZoneDesc")}</p>
      </div>

      <DangerZone />
    </div>
  );
}
