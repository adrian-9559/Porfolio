"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  open: boolean;
  onClose: () => void;
}

type Tab = "login" | "register";

export function AuthModal({ open, onClose }: Props) {
  const { login, register } = useAuth();
  const [tab, setTab] = useState<Tab>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const reset = () => {
    setError("");
    setEmail("");
    setPassword("");
    setFullName("");
    setConfirmPassword("");
    setLoading(false);
  };

  const close = () => { reset(); onClose(); };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      if (rememberMe) {
        try { localStorage.setItem("remember_me", "true"); } catch {}
      }
      close();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) { setError("Las contraseñas no coinciden"); return; }
    setLoading(true);
    try {
      await register(fullName, email, password);
      close();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al crear cuenta");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={close} />
      <div className="relative z-10 w-full max-w-sm bg-white dark:bg-[#111116] rounded-2xl border border-black/8 dark:border-white/8 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div>
            <h2 className="text-lg font-semibold text-[#1d1d1f] dark:text-white">
              {tab === "login" ? "Iniciar sesión" : "Crear cuenta"}
            </h2>
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5">
              {tab === "login" ? "Bienvenido de vuelta" : "Únete a la plataforma"}
            </p>
          </div>
          <button onClick={close} className="w-7 h-7 rounded-full flex items-center justify-center text-[#6e6e73] hover:bg-black/8 dark:hover:bg-white/8 transition-colors">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex mx-6 bg-black/5 dark:bg-white/5 rounded-xl p-1 mb-5">
          {(["login", "register"] as Tab[]).map((t) => (
            <button key={t} onClick={() => { setTab(t); setError(""); }}
              className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${tab === t ? "bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-white shadow-sm" : "text-[#6e6e73] dark:text-[#86868b]"}`}>
              {t === "login" ? "Iniciar sesión" : "Registrarse"}
            </button>
          ))}
        </div>

        <div className="px-6 pb-6">
          {error && (
            <div className="mb-4 px-3 py-2 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">{error}</div>
          )}
          {tab === "login" ? (
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
              <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="tu@email.com" required />
              <Field label="Contraseña" type="password" value={password} onChange={setPassword} placeholder="••••••••" required />
              <label className="flex items-center gap-2.5 cursor-pointer mt-1">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-black/20 dark:border-white/20 accent-blue-600" />
                <span className="text-xs text-[#6e6e73] dark:text-[#86868b]">Recordar sesión</span>
              </label>
              <button type="submit" disabled={loading} className="mt-2 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium transition-colors">
                {loading ? "Iniciando sesión…" : "Iniciar sesión"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="flex flex-col gap-3">
              <Field label="Nombre completo" type="text" value={fullName} onChange={setFullName} placeholder="Adrián Escribano" required />
              <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="tu@email.com" required />
              <Field label="Contraseña" type="password" value={password} onChange={setPassword} placeholder="••••••••" required />
              <Field label="Confirmar contraseña" type="password" value={confirmPassword} onChange={setConfirmPassword} placeholder="••••••••" required />
              <button type="submit" disabled={loading} className="mt-2 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium transition-colors">
                {loading ? "Creando cuenta…" : "Crear cuenta"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, type, value, onChange, placeholder, required }: {
  label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[#1d1d1f] dark:text-white">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required}
        className="px-3 py-2.5 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all" />
    </div>
  );
}
