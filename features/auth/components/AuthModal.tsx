"use client";
import { useState } from "react";

import { useT } from "@/hooks/useT";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/authService";
import { ThemeSwitch } from "@/components/theme-switch";
import { LanguageSwitcher } from "@/components/language-switcher";
import {
  IconMail,
  IconLock,
  IconUser,
  IconKey,
  IconArrowLeft,
  IconCheck,
  IconCross,
} from "@/components/ui/Icons";

interface Props {
  open: boolean;
  onClose: () => void;
}

type Tab = "login" | "register" | "forgot";

export function AuthModal({ open, onClose }: Props) {
  const { t } = useT();
  const { login, register } = useAuth();
  const [tab, setTab] = useState<Tab>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // login/register fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // forgot fields
  const [forgotStep, setForgotStep] = useState<"email" | "code">("email");
  const [resetEmail, setResetEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [resetNewPassword, setResetNewPassword] = useState("");
  const [resetConfirmPassword, setResetConfirmPassword] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");

  const reset = () => {
    setError("");
    setEmail("");
    setPassword("");
    setFullName("");
    setConfirmPassword("");
    setLoading(false);
    setForgotStep("email");
    setResetEmail("");
    setResetCode("");
    setResetNewPassword("");
    setResetConfirmPassword("");
    setForgotSuccess("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const close = () => {
    reset();
    onClose();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      if (rememberMe) {
        try {
          localStorage.setItem("remember_me", "true");
        } catch {}
      }
      close();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t("auth.loginError"));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError(t("auth.passwordsDontMatch"));

      return;
    }
    setLoading(true);
    try {
      await register(fullName, email, password);
      close();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t("auth.registerError"));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setForgotSuccess("");
    setLoading(true);
    try {
      await authService.forgotPassword(resetEmail);
      setForgotSuccess(t("auth.codeSent"));
      setForgotStep("code");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t("auth.loginError"));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (resetNewPassword !== resetConfirmPassword) {
      setError(t("auth.passwordsDontMatch"));

      return;
    }
    setLoading(true);
    try {
      await authService.resetPassword(resetEmail, resetCode, resetNewPassword);
      setForgotSuccess(t("auth.passwordUpdated"));
      setTimeout(() => {
        setTab("login");
        reset();
      }, 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t("auth.loginError"));
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  const headerTitle =
    tab === "login"
      ? t("auth.signIn")
      : tab === "register"
        ? t("auth.signUp")
        : t("auth.forgotPassword");
  const headerSub =
    tab === "login"
      ? t("auth.subtitleLogin")
      : tab === "register"
        ? t("auth.subtitleRegister")
        : t("auth.subtitleForgot");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        type="button"
        onClick={close}
      />
      <div className="relative z-10 w-full max-w-[400px] overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] shadow-2xl">
        {/* Branded header */}
        <div className="relative px-6 pt-8 pb-6 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-[var(--accent)]/5" />
          <div className="relative">
            <div className="mx-auto mb-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent)]/70 flex items-center justify-center shadow-lg shadow-[var(--accent)]/20">
              {tab === "forgot" ? (
                <IconKey className="w-6 h-6 text-white" />
              ) : tab === "register" ? (
                <IconUser className="w-6 h-6 text-white" />
              ) : (
                <IconLock className="w-6 h-6 text-white" />
              )}
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              {headerTitle}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              {headerSub}
            </p>
          </div>
          {/* Close + theme + language */}
          <div className="absolute top-4 right-4 flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeSwitch />
            <button
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
              type="button"
              onClick={close}
              aria-label="Cerrar"
            >
              <IconCross className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs (only login/register) */}
        {tab !== "forgot" && (
          <div className="mx-6 mb-5">
            <div
              className="flex rounded-xl p-1 gap-1"
              style={{ background: "var(--bg-surface)" }}
            >
              {(["login", "register"] as Tab[]).map((tabKey) => (
                <button
                  key={tabKey}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    tab === tabKey
                      ? "bg-[var(--accent)] text-[var(--text-interactive)] shadow-md shadow-[var(--accent)]/20"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                  type="button"
                  onClick={() => {
                    setTab(tabKey);
                    setError("");
                  }}
                >
                  {tabKey === "login"
                    ? t("auth.tabLogin")
                    : t("auth.tabRegister")}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Back button for forgot */}
        {tab === "forgot" && (
          <div className="mx-6 mb-4">
            <button
              className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              type="button"
              onClick={() => {
                setTab("login");
                setError("");
                setForgotSuccess("");
                setForgotStep("email");
              }}
            >
              <IconArrowLeft className="w-3.5 h-3.5" />
              {t("auth.backToLogin")}
            </button>
          </div>
        )}

        <div className="px-6 pb-7">
          {/* Alerts */}
          {error && (
            <div className="mb-4 flex items-start gap-2.5 px-3.5 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              <IconCross className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}
          {forgotSuccess && (
            <div className="mb-4 flex items-start gap-2.5 px-3.5 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400">
              <IconCheck className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" />
              <span>{forgotSuccess}</span>
            </div>
          )}

          {/* LOGIN */}
          {tab === "login" && (
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <Field
                required
                icon={<IconMail className="w-4 h-4" />}
                label={t("auth.email")}
                placeholder={t("auth.emailPlaceholder")}
                type="email"
                value={email}
                onChange={setEmail}
              />
              <Field
                required
                icon={<IconLock className="w-4 h-4" />}
                label={t("auth.password")}
                placeholder={t("auth.passwordPlaceholder")}
                showPassword={showPassword}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={setPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    checked={rememberMe}
                    className="w-4 h-4 rounded accent-[var(--accent)]"
                    type="checkbox"
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="text-xs text-[var(--text-secondary)]">
                    {t("auth.rememberSession")}
                  </span>
                </label>
                <button
                  className="text-xs font-medium text-[var(--accent)] hover:underline"
                  type="button"
                  onClick={() => {
                    setTab("forgot");
                    setResetEmail(email);
                    setError("");
                  }}
                >
                  {t("auth.forgotPasswordLink")}
                </button>
              </div>
              <button
                className="mt-1 w-full ds-btn-primary"
                disabled={loading}
                type="submit"
              >
                {loading ? t("auth.signingIn") : t("auth.signIn")}
              </button>
            </form>
          )}

          {/* REGISTER */}
          {tab === "register" && (
            <form className="flex flex-col gap-4" onSubmit={handleRegister}>
              <Field
                required
                icon={<IconUser className="w-4 h-4" />}
                label={t("auth.fullName")}
                placeholder={t("auth.fullNamePlaceholder")}
                type="text"
                value={fullName}
                onChange={setFullName}
              />
              <Field
                required
                icon={<IconMail className="w-4 h-4" />}
                label={t("auth.email")}
                placeholder={t("auth.emailPlaceholder")}
                type="email"
                value={email}
                onChange={setEmail}
              />
              <Field
                required
                icon={<IconLock className="w-4 h-4" />}
                label={t("auth.password")}
                placeholder={t("auth.passwordPlaceholder")}
                showPassword={showPassword}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={setPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />
              <Field
                required
                icon={<IconLock className="w-4 h-4" />}
                label={t("auth.confirmPassword")}
                placeholder={t("auth.confirmPasswordPlaceholder")}
                showPassword={showConfirmPassword}
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={setConfirmPassword}
                onTogglePassword={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              />
              <button
                className="mt-1 w-full ds-btn-primary"
                disabled={loading}
                type="submit"
              >
                {loading ? t("auth.creatingAccount") : t("auth.signUp")}
              </button>
            </form>
          )}

          {/* FORGOT — step email */}
          {tab === "forgot" && forgotStep === "email" && (
            <form className="flex flex-col gap-4" onSubmit={handleForgotEmail}>
              <Field
                required
                icon={<IconMail className="w-4 h-4" />}
                label={t("auth.email")}
                placeholder={t("auth.emailPlaceholder")}
                type="email"
                value={resetEmail}
                onChange={setResetEmail}
              />
              <button
                className="mt-1 w-full ds-btn-primary"
                disabled={loading}
                type="submit"
              >
                {loading ? t("auth.sendingCode") : t("auth.sendCode")}
              </button>
            </form>
          )}

          {/* FORGOT — step code */}
          {tab === "forgot" && forgotStep === "code" && (
            <form
              className="flex flex-col gap-4"
              onSubmit={handleResetPassword}
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[var(--text-primary)]">
                  {t("auth.verifyCode")}
                </label>
                <div className="relative">
                  <IconKey className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <input
                    required
                    className="ds-input pl-10 text-center font-mono text-lg tracking-[0.3em]"
                    inputMode="numeric"
                    maxLength={6}
                    pattern="[0-9]{6}"
                    placeholder="000000"
                    type="text"
                    value={resetCode}
                    onChange={(e) =>
                      setResetCode(
                        e.target.value.replace(/\D/g, "").slice(0, 6),
                      )
                    }
                  />
                </div>
              </div>
              <Field
                required
                icon={<IconLock className="w-4 h-4" />}
                label={t("auth.newPassword")}
                placeholder={t("auth.passwordPlaceholder")}
                showPassword={showPassword}
                type={showPassword ? "text" : "password"}
                value={resetNewPassword}
                onChange={setResetNewPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />
              <Field
                required
                icon={<IconLock className="w-4 h-4" />}
                label={t("auth.confirmPassword")}
                placeholder={t("auth.confirmPasswordPlaceholder")}
                showPassword={showConfirmPassword}
                type={showConfirmPassword ? "text" : "password"}
                value={resetConfirmPassword}
                onChange={setResetConfirmPassword}
                onTogglePassword={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              />
              <button
                className="mt-1 w-full ds-btn-primary"
                disabled={loading}
                type="submit"
              >
                {loading ? t("auth.resetting") : t("auth.resetPassword")}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Field component ────────────────────────────────────────────────────────── */

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
  icon,
  showPassword,
  onTogglePassword,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}) {
  const isPassword = type === "password" || type === "text";

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[var(--text-primary)]">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
            {icon}
          </span>
        )}
        <input
          className={`ds-input ${icon ? "pl-10" : ""} ${isPassword && onTogglePassword ? "pr-10" : ""}`}
          placeholder={placeholder}
          required={required}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {isPassword && onTogglePassword && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            tabIndex={-1}
            type="button"
            onClick={onTogglePassword}
          >
            {showPassword ? (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
