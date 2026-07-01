"use client";
import { useState } from "react";

import { useT } from "@/hooks/useT";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/authService";

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
      setError(
        err instanceof Error ? err.message : t("auth.loginError"),
      );
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
      setError(
        err instanceof Error
          ? err.message
          : t("auth.loginError"),
      );
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
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={close}
      />
      <div className="relative z-10 w-full max-w-sm bg-white dark:bg-[#111116] rounded-2xl border border-black/8 dark:border-white/8 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div>
            <h2 className="text-lg font-semibold text-[#1d1d1f] dark:text-white">
              {headerTitle}
            </h2>
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5">
              {headerSub}
            </p>
          </div>
          <button
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#6e6e73] hover:bg-black/8 dark:hover:bg-white/8 transition-colors"
            onClick={close}
          >
            <svg fill="none" height="12" viewBox="0 0 12 12" width="12">
              <path
                d="M1 1l10 10M11 1L1 11"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>

        {/* Tabs (only login/register) */}
        {tab !== "forgot" && (
          <div className="flex mx-6 bg-black/5 dark:bg-white/5 rounded-xl p-1 mb-5">
            {(["login", "register"] as Tab[]).map((tabKey) => (
              <button
                key={tabKey}
                className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${tab === tabKey ? "bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-white shadow-sm" : "text-[#6e6e73] dark:text-[#86868b]"}`}
                onClick={() => {
                  setTab(tabKey);
                  setError("");
                }}
              >
                {tabKey === "login" ? t("auth.tabLogin") : t("auth.tabRegister")}
              </button>
            ))}
          </div>
        )}

        <div className="px-6 pb-6">
          {error && (
            <div className="mb-4 px-3 py-2 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}
          {forgotSuccess && (
            <div className="mb-4 px-3 py-2 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-sm text-green-600 dark:text-green-400">
              {forgotSuccess}
            </div>
          )}

          {tab === "login" && (
            <form className="flex flex-col gap-3" onSubmit={handleLogin}>
              <Field
                required
                label={t("auth.email")}
                placeholder={t("auth.emailPlaceholder")}
                type="email"
                value={email}
                onChange={setEmail}
              />
              <Field
                required
                label={t("auth.password")}
                placeholder={t("auth.passwordPlaceholder")}
                type="password"
                value={password}
                onChange={setPassword}
              />
              <label className="flex items-center gap-2.5 cursor-pointer mt-1">
                <input
                  checked={rememberMe}
                  className="w-4 h-4 rounded border-black/20 dark:border-white/20 accent-blue-600"
                  type="checkbox"
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                  {t("auth.rememberSession")}
                </span>
              </label>
              <button
                className="mt-2 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium transition-colors"
                disabled={loading}
                type="submit"
              >
                {loading ? t("auth.signingIn") : t("auth.signIn")}
              </button>
              <button
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline text-center mt-1"
                type="button"
                onClick={() => {
                  setTab("forgot");
                  setResetEmail(email);
                  setError("");
                }}
              >
                {t("auth.forgotPasswordLink")}
              </button>
            </form>
          )}

          {tab === "register" && (
            <form className="flex flex-col gap-3" onSubmit={handleRegister}>
              <Field
                required
                label={t("auth.fullName")}
                placeholder={t("auth.fullNamePlaceholder")}
                type="text"
                value={fullName}
                onChange={setFullName}
              />
              <Field
                required
                label={t("auth.email")}
                placeholder={t("auth.emailPlaceholder")}
                type="email"
                value={email}
                onChange={setEmail}
              />
              <Field
                required
                label={t("auth.password")}
                placeholder={t("auth.passwordPlaceholder")}
                type="password"
                value={password}
                onChange={setPassword}
              />
              <Field
                required
                label={t("auth.confirmPassword")}
                placeholder={t("auth.confirmPasswordPlaceholder")}
                type="password"
                value={confirmPassword}
                onChange={setConfirmPassword}
              />
              <button
                className="mt-2 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium transition-colors"
                disabled={loading}
                type="submit"
              >
                {loading ? t("auth.creatingAccount") : t("auth.signUp")}
              </button>
            </form>
          )}

          {tab === "forgot" && forgotStep === "email" && (
            <form className="flex flex-col gap-3" onSubmit={handleForgotEmail}>
              <Field
                required
                label={t("auth.email")}
                placeholder={t("auth.emailPlaceholder")}
                type="email"
                value={resetEmail}
                onChange={setResetEmail}
              />
              <button
                className="mt-2 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium transition-colors"
                disabled={loading}
                type="submit"
              >
                {loading ? t("auth.sendingCode") : t("auth.sendCode")}
              </button>
              <button
                className="text-xs text-[#6e6e73] dark:text-[#86868b] hover:underline text-center"
                type="button"
                onClick={() => {
                  setTab("login");
                  setError("");
                  setForgotSuccess("");
                }}
              >
                {t("auth.backToLogin")}
              </button>
            </form>
          )}

          {tab === "forgot" && forgotStep === "code" && (
            <form
              className="flex flex-col gap-3"
              onSubmit={handleResetPassword}
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#1d1d1f] dark:text-white">
                  {t("auth.verifyCode")}
                </label>
                <input
                  required
                  className="px-3 py-2.5 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all tracking-[0.5em] text-center font-mono"
                  inputMode="numeric"
                  maxLength={6}
                  pattern="[0-9]{6}"
                  placeholder={t("auth.verifyPlaceholder")}
                  type="text"
                  value={resetCode}
                  onChange={(e) =>
                    setResetCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                />
              </div>
              <Field
                required
                label={t("auth.newPassword")}
                placeholder={t("auth.passwordPlaceholder")}
                type="password"
                value={resetNewPassword}
                onChange={setResetNewPassword}
              />
              <Field
                required
                label={t("auth.confirmPassword")}
                placeholder={t("auth.confirmPasswordPlaceholder")}
                type="password"
                value={resetConfirmPassword}
                onChange={setResetConfirmPassword}
              />
              <button
                className="mt-2 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium transition-colors"
                disabled={loading}
                type="submit"
              >
                {loading ? t("auth.resetting") : t("auth.resetPassword")}
              </button>
              <button
                className="text-xs text-[#6e6e73] dark:text-[#86868b] hover:underline text-center"
                type="button"
                onClick={() => {
                  setTab("login");
                  reset();
                }}
              >
                {t("auth.backToLogin")}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[#1d1d1f] dark:text-white">
        {label}
      </label>
      <input
        className="px-3 py-2.5 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
