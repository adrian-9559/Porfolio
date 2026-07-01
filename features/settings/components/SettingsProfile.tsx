import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { userService } from "@/services/userService";
import { useAuthStore } from "@/store/authStore";

export function SettingsProfile() {
  const { user, logout } = useAuth();
  const hydrate = useAuthStore((s) => s.hydrate);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.profile) {
      setFullName(user.profile.full_name ?? "");
      setBio(user.profile.bio ?? "");
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setError("");
    try {
      await userService.updateProfile(user.id, { full_name: fullName, bio });
      await hydrate();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  const initials = user?.profile?.full_name
    ? user.profile.full_name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : (user?.email?.slice(0, 2).toUpperCase() ?? "?");

  return (
    <div className="flex flex-col gap-4">
      <Card title="Perfil">
        <form className="flex flex-col gap-4" onSubmit={handleSave}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xl font-semibold">
              {initials}
            </div>
            <div>
              <p className="text-sm font-medium text-[#1d1d1f] dark:text-white">
                {user?.email}
              </p>
              <div className="flex gap-1.5 mt-1 flex-wrap">
                {user?.roles.map((r) => (
                  <span
                    key={r}
                    className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-medium"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {error && (
            <div className="px-3 py-2 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}
          <SettingsField
            label="Nombre completo"
            placeholder="Tu nombre"
            value={fullName}
            onChange={setFullName}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#1d1d1f] dark:text-white">
              Biografía
            </label>
            <textarea
              className="px-3 py-2.5 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all resize-none"
              maxLength={500}
              placeholder="Cuéntanos algo sobre ti…"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 mt-1">
            <button
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium transition-colors"
              disabled={saving}
              type="submit"
            >
              {saving ? "Guardando…" : "Guardar cambios"}
            </button>
            {saved && (
              <span className="text-sm text-green-600 dark:text-green-400">
                ✓ Guardado
              </span>
            )}
          </div>
        </form>
      </Card>

      <Card title="Cuenta">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between py-1">
            <div>
              <p className="text-sm font-medium text-[#1d1d1f] dark:text-white">
                Email
              </p>
              <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                {user?.email}
              </p>
            </div>
          </div>
          <div className="border-t border-black/6 dark:border-white/6 pt-3">
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mb-3">
              Para cambiar tu contraseña, recibirás un email con instrucciones.
            </p>
            <button className="px-4 py-2 rounded-xl border border-black/12 dark:border-white/12 text-sm font-medium text-[#1d1d1f] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              Cambiar contraseña
            </button>
          </div>
        </div>
      </Card>

      <Card title="Sesión">
        <button
          className="px-4 py-2 rounded-xl border border-red-200 dark:border-red-800 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          onClick={logout}
        >
          Cerrar sesión
        </button>
      </Card>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] overflow-hidden">
      <div className="px-6 py-4 border-b border-black/6 dark:border-white/6">
        <h2 className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
          {title}
        </h2>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

function SettingsField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[#1d1d1f] dark:text-white">
        {label}
      </label>
      <input
        className="px-3 py-2.5 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
