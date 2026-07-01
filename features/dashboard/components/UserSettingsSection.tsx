import { useState } from "react";

import { useAuth } from "@/hooks/useAuth";

type Tab = "settings-profile" | "settings-security" | "settings-session";

interface Props {
  tab: Tab;
  onTabChange: (t: Tab) => void;
}

const TABS: { id: Tab; label: string }[] = [
  { id: "settings-profile", label: "Perfil" },
  { id: "settings-security", label: "Seguridad" },
  { id: "settings-session", label: "Sesión" },
];

function ProfileTab() {
  const { user } = useAuth();
  const [name, setName] = useState((user as any)?.name || "");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6">
      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold">
          {(name || "U")[0].toUpperCase()}
        </div>
        <div>
          <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
            Cambiar foto
          </button>
          <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-0.5">
            JPG, PNG o GIF. Máx 2MB
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] block mb-2">
            Nombre
          </label>
          <input
            className="w-full px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] block mb-2">
            Email
          </label>
          <input
            disabled
            className="w-full px-3 py-2 rounded-xl border border-black/8 dark:border-white/8 bg-black/3 dark:bg-white/3 text-sm text-[#aeaeb2] dark:text-[#636366] cursor-not-allowed"
            value={(user as any)?.email || ""}
          />
          <p className="text-xs text-[#aeaeb2] mt-1">
            El email no se puede cambiar
          </p>
        </div>

        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] block mb-2">
            Bio
          </label>
          <textarea
            className="w-full px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all resize-none"
            placeholder="Cuéntanos algo sobre ti..."
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] block mb-2">
            Sitio web
          </label>
          <input
            className="w-full px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            placeholder="https://tuportfolio.com"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
      </div>

      <button
        className={`flex items-center gap-2 text-sm font-medium px-5 py-2 rounded-xl transition-all ${
          saved
            ? "bg-emerald-600 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
        onClick={save}
      >
        {saved ? (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            Guardado
          </>
        ) : (
          "Guardar cambios"
        )}
      </button>
    </div>
  );
}

function SecurityTab() {
  const [current, setCurrent] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");

  function changePassword() {
    if (!current || !newPwd || !confirm)
      return setMsg("Rellena todos los campos");
    if (newPwd !== confirm) return setMsg("Las contraseñas no coinciden");
    if (newPwd.length < 8)
      return setMsg("La contraseña debe tener al menos 8 caracteres");
    setMsg("Contraseña actualizada correctamente ✓");
    setCurrent("");
    setNewPwd("");
    setConfirm("");
    setTimeout(() => setMsg(""), 3000);
  }

  const SESSIONS = [
    {
      device: "Chrome en macOS",
      location: "Madrid, España",
      current: true,
      date: "Ahora",
    },
    {
      device: "Safari en iPhone",
      location: "Madrid, España",
      current: false,
      date: "hace 2h",
    },
    {
      device: "Firefox en Windows",
      location: "Barcelona, España",
      current: false,
      date: "hace 3d",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Password */}
      <div>
        <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-1">
          Cambiar contraseña
        </p>
        <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mb-4">
          Usa una contraseña segura de al menos 8 caracteres
        </p>

        <div className="space-y-3">
          {[
            { label: "Contraseña actual", val: current, set: setCurrent },
            { label: "Nueva contraseña", val: newPwd, set: setNewPwd },
            { label: "Confirmar nueva", val: confirm, set: setConfirm },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] block mb-1.5">
                {f.label}
              </label>
              <input
                className="w-full px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                type="password"
                value={f.val}
                onChange={(e) => f.set(e.target.value)}
              />
            </div>
          ))}
        </div>

        {msg && (
          <p
            className={`text-xs mt-2 ${msg.includes("✓") ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}
          >
            {msg}
          </p>
        )}

        <button
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-xl transition-colors"
          onClick={changePassword}
        >
          Actualizar contraseña
        </button>
      </div>

      {/* Active sessions */}
      <div>
        <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-1">
          Sesiones activas
        </p>
        <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mb-4">
          Dispositivos donde has iniciado sesión
        </p>

        <div className="rounded-2xl border border-black/8 dark:border-white/8 divide-y divide-black/5 dark:divide-white/5">
          {SESSIONS.map((s, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3">
              <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-[#6e6e73] dark:text-[#86868b]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    height="14"
                    rx="2"
                    strokeWidth={1.5}
                    width="20"
                    x="2"
                    y="4"
                  />
                  <path
                    d="M8 20h8M12 18v2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-[#1d1d1f] dark:text-white">
                    {s.device}
                  </p>
                  {s.current && (
                    <span className="px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold">
                      actual
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                  {s.location} · {s.date}
                </p>
              </div>
              {!s.current && (
                <button className="text-xs text-red-500 hover:text-red-600 hover:underline">
                  Cerrar
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SessionTab() {
  const [rememberMe, setRememberMe] = useState(false);
  const [expiry, setExpiry] = useState("7d");
  const [theme, setTheme] = useState("system");
  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);
    try {
      localStorage.setItem(
        "user-prefs",
        JSON.stringify({ rememberMe, expiry, theme }),
      );
    } catch {}
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-8">
      {/* Remember me */}
      <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-5 space-y-4">
        <div>
          <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-0.5">
            Recordar sesión
          </p>
          <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
            Mantén la sesión activa entre cierres de navegador
          </p>
        </div>

        <div className="flex items-center justify-between py-3 border-t border-black/5 dark:border-white/5">
          <div>
            <p className="text-sm font-medium text-[#1d1d1f] dark:text-white">
              Recordar inicio de sesión
            </p>
            <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
              {rememberMe
                ? "Sesión persistente activada"
                : "La sesión expira al cerrar el navegador"}
            </p>
          </div>
          <button
            className={`w-10 h-6 rounded-full transition-colors relative flex-shrink-0 ${rememberMe ? "bg-blue-600" : "bg-black/20 dark:bg-white/20"}`}
            onClick={() => setRememberMe((v) => !v)}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${rememberMe ? "translate-x-5" : "translate-x-1"}`}
            />
          </button>
        </div>

        {rememberMe && (
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] block mb-2">
              Duración de la sesión
            </label>
            <div className="flex gap-2 flex-wrap">
              {[
                { id: "1d", label: "1 día" },
                { id: "7d", label: "7 días" },
                { id: "30d", label: "30 días" },
                { id: "90d", label: "90 días" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    expiry === opt.id
                      ? "bg-blue-600 text-white"
                      : "border border-black/12 dark:border-white/12 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                  onClick={() => setExpiry(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Theme preferences */}
      <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-5 space-y-4">
        <div>
          <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-0.5">
            Apariencia
          </p>
          <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
            Personaliza el tema de la interfaz
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "light", label: "Claro", icon: "☀️" },
            { id: "dark", label: "Oscuro", icon: "🌙" },
            { id: "system", label: "Sistema", icon: "💻" },
          ].map((opt) => (
            <button
              key={opt.id}
              className={`p-3 rounded-xl border text-center transition-all ${
                theme === opt.id
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                  : "border-black/12 dark:border-white/12 hover:bg-black/3 dark:hover:bg-white/3"
              }`}
              onClick={() => setTheme(opt.id)}
            >
              <span className="text-xl">{opt.icon}</span>
              <p className="text-xs font-medium text-[#1d1d1f] dark:text-white mt-1">
                {opt.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      <button
        className={`flex items-center gap-2 text-sm font-medium px-5 py-2 rounded-xl transition-all ${
          saved
            ? "bg-emerald-600 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
        onClick={save}
      >
        {saved ? (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            Guardado
          </>
        ) : (
          "Guardar preferencias"
        )}
      </button>
    </div>
  );
}

export function UserSettingsSection({ tab, onTabChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#1d1d1f] dark:text-white">
          Configuración
        </h2>
        <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-0.5">
          Gestiona tu perfil y preferencias de cuenta
        </p>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5 w-fit">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              tab === t.id
                ? "bg-white dark:bg-[#111116] text-[#1d1d1f] dark:text-white shadow-sm"
                : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
            }`}
            onClick={() => onTabChange(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-6">
        {tab === "settings-profile" && <ProfileTab />}
        {tab === "settings-security" && <SecurityTab />}
        {tab === "settings-session" && <SessionTab />}
      </div>
    </div>
  );
}
