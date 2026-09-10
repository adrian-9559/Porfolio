import type { UserPreferences } from "@/types/auth";

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
import { PasswordField } from "@/features/settings/components/PasswordField";
import { SessionList } from "@/features/settings/components/SessionList";
import { DangerZone } from "@/features/settings/components/DangerZone";
import {
  IconUser,
  IconShield,
  IconBell,
  IconApps,
  IconGit,
  IconClose,
} from "@/components/ui/Icons";

type Tab =
  | "perfil"
  | "seguridad"
  | "notificaciones"
  | "apariencia"
  | "idioma"
  | "cuenta";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="ds-section-label block mb-1.5">{label}</label>
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
    <div
      className="flex items-start justify-between gap-4 py-3"
      style={{ borderBottom: "1px solid var(--border-default)" }}
    >
      <div>
        <p
          className="text-sm font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          {label}
        </p>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
          {desc}
        </p>
      </div>
      <button
        aria-label={label}
        className={`ds-toggle ${val ? "ds-toggle-active" : ""}`}
        onClick={() => set(!val)}
      />
    </div>
  );
}

export default function ConfiguracionPage() {
  const { t } = useT();
  const { isAuthenticated, loadingAuth } = useRequireAuth();
  const [tab, setTab] = useState<Tab>("perfil");

  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: "perfil",
      label: t("user.tabProfile"),
      icon: <IconUser className="w-4 h-4" />,
    },
    {
      id: "seguridad",
      label: t("user.tabSecurity"),
      icon: <IconShield className="w-4 h-4" />,
    },
    {
      id: "notificaciones",
      label: t("user.tabNotifications"),
      icon: <IconBell className="w-4 h-4" />,
    },
    {
      id: "apariencia",
      label: t("user.tabAppearance"),
      icon: <IconApps className="w-4 h-4" />,
    },
    {
      id: "idioma",
      label: t("user.tabLanguage"),
      icon: <IconGit className="w-4 h-4" />,
    },
    {
      id: "cuenta",
      label: t("user.tabAccount"),
      icon: <IconClose className="w-4 h-4" />,
    },
  ];

  if (loadingAuth || !isAuthenticated) {
    return (
      <DefaultLayout>
        <div className="flex justify-center py-20">
          <div className="ds-spinner" />
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
            <Link
              className="text-xs hover:opacity-80 transition-colors"
              href="/perfil"
              style={{ color: "var(--text-secondary)" }}
            >
              {t("profile.title")}
            </Link>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              /
            </span>
            <span
              className="text-xs font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              {t("settings.title")}
            </span>
          </div>
          <h1
            className="text-3xl font-bold"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            {t("settings.title")}
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            {t("settings.subtitle")}
          </p>
        </div>

        {/* Tabs */}
        <div
          className="flex gap-1 p-1 rounded-xl w-fit flex-wrap"
          style={{ background: "var(--bg-surface)" }}
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`ds-sidebar-item !w-auto ${tab === t.id ? "ds-sidebar-item-active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="ds-card p-6">
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
        <h2
          className="text-base font-bold mb-1"
          style={{ color: "var(--text-primary)" }}
        >
          {t("settings.profileInfo")}
        </h2>
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          {t("settings.profileInfoDesc")}
        </p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-brand-from)] to-[var(--color-brand-via)] flex items-center justify-center text-white text-2xl font-bold overflow-hidden flex-shrink-0">
          {user?.profile?.avatar_url ? (
            <img
              alt=""
              className="w-full h-full object-cover"
              src={user.profile.avatar_url}
            />
          ) : (
            <IconUser className="w-8 h-8 text-white/80" />
          )}
        </div>
      </div>

      <div className="space-y-4">
        <Field label={t("settings.profile")}>
          <input
            className="ds-input"
            placeholder={t("settings.fullNamePlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>

        <Field label={t("auth.email")}>
          <input
            disabled
            className="ds-input"
            style={{ opacity: 0.5, cursor: "not-allowed" }}
            value={user?.email ?? ""}
          />
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            {t("settings.emailNotChangable")}
          </p>
        </Field>

        <Field label={t("profile.bio")}>
          <textarea
            className="ds-textarea"
            placeholder={t("settings.bioPlaceholder")}
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Field>

        <Field label={t("profile.website")}>
          <input
            className="ds-input"
            placeholder={t("settings.websitePlaceholder")}
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </Field>
      </div>

      {error && (
        <p className="text-xs" style={{ color: "var(--color-danger)" }}>
          {error}
        </p>
      )}

      <button
        className={`ds-btn-primary ${saved ? "!bg-[var(--color-success)]" : ""}`}
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
        <h2
          className="text-base font-bold mb-1"
          style={{ color: "var(--text-primary)" }}
        >
          {t("settings.changePassword")}
        </h2>
        <p className="text-xs mb-5" style={{ color: "var(--text-secondary)" }}>
          {t("settings.changePasswordSubtitle")}
        </p>
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
          <p
            className="text-xs mt-2"
            style={{
              color: error ? "var(--color-danger)" : "var(--color-success)",
            }}
          >
            {msg}
          </p>
        )}
        <button
          className="ds-btn-primary mt-4"
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
    userService
      .getPreferences()
      .then((p) => {
        setPrefs(p);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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

  if (loading)
    return (
      <div className="flex justify-center py-8">
        <div className="ds-spinner" />
      </div>
    );

  return (
    <div className="space-y-6">
      <div>
        <h2
          className="text-base font-bold mb-1"
          style={{ color: "var(--text-primary)" }}
        >
          {t("user.tabNotifications")}
        </h2>
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          {t("settings.appearanceDesc")}
        </p>
      </div>

      <div
        className="rounded-xl"
        style={{ border: "1px solid var(--border-default)" }}
      >
        <div className="px-4">
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
      </div>

      {saved && (
        <p className="text-xs" style={{ color: "var(--color-success)" }}>
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
    const root = document.documentElement;

    if (root.classList.contains("dark")) {
      setThemeState("dark");
    } else if (root.classList.contains("light")) {
      setThemeState("light");
    } else {
      setThemeState("system");
    }
  }, []);

  function setTheme(id: string) {
    setThemeState(id);
    const root = document.documentElement;

    if (id === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
      localStorage.setItem(
        "theme",
        JSON.stringify({ state: { theme: "light" } }),
      );
    } else if (id === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
      localStorage.setItem(
        "theme",
        JSON.stringify({ state: { theme: "dark" } }),
      );
    } else {
      root.classList.remove("light", "dark");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      root.classList.add(prefersDark ? "dark" : "light");
      localStorage.removeItem("theme");
    }
  }

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2
          className="text-base font-bold mb-1"
          style={{ color: "var(--text-primary)" }}
        >
          {t("user.tabAppearance")}
        </h2>
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          {t("settings.appearanceDesc")}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          {
            id: "light",
            label: t("settings.themeLight"),
            icon: <IconApps className="w-6 h-6" />,
          },
          {
            id: "dark",
            label: t("settings.themeDark"),
            icon: <IconShield className="w-6 h-6" />,
          },
          {
            id: "system",
            label: t("settings.themeSystem"),
            icon: <IconGit className="w-6 h-6" />,
          },
        ].map((opt) => (
          <button
            key={opt.id}
            className={`p-4 rounded-xl text-center transition-all ${
              theme === opt.id
                ? "border-2 border-[var(--accent)]"
                : "border hover:bg-[var(--bg-hover)]"
            }`}
            style={{
              borderColor:
                theme === opt.id ? "var(--accent)" : "var(--border-default)",
              background:
                theme === opt.id ? "var(--accent-light)" : "var(--bg-card)",
            }}
            onClick={() => setTheme(opt.id)}
          >
            <div
              className="flex justify-center"
              style={{ color: "var(--text-primary)" }}
            >
              {opt.icon}
            </div>
            <p
              className="text-xs font-medium mt-2"
              style={{ color: "var(--text-primary)" }}
            >
              {opt.label}
            </p>
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
        <h2
          className="text-base font-bold mb-1"
          style={{ color: "var(--text-primary)" }}
        >
          {t("user.tabLanguage")}
        </h2>
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          {t("settings.appearanceDesc")}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          {
            id: "es" as const,
            label: "Español",
            icon: <IconGit className="w-5 h-5" />,
          },
          {
            id: "en" as const,
            label: "English",
            icon: <IconGit className="w-5 h-5" />,
          },
        ].map((opt) => (
          <button
            key={opt.id}
            className={`flex items-center gap-3 p-4 rounded-xl transition-all border`}
            style={{
              borderColor:
                locale === opt.id ? "var(--accent)" : "var(--border-default)",
              background:
                locale === opt.id ? "var(--accent-light)" : "var(--bg-card)",
            }}
            onClick={() => setLocale(opt.id)}
          >
            <div style={{ color: "var(--text-primary)" }}>{opt.icon}</div>
            <span
              className="text-sm font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              {opt.label}
            </span>
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
        <h2
          className="text-base font-bold mb-1"
          style={{ color: "var(--text-primary)" }}
        >
          {t("user.tabAccount")}
        </h2>
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          {t("settings.dangerZoneDesc")}
        </p>
      </div>

      <DangerZone />
    </div>
  );
}
