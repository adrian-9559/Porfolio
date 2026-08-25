"use client";
import type { UserWithProfile, Role } from "@/types/auth";
import { useState } from "react";
import { useT } from "@/hooks/useT";
import { userService } from "@/services/userService";
import { authService } from "@/services/authService";

interface Props {
  user: UserWithProfile;
  open: boolean;
  onClose: () => void;
  roles: Role[];
  onAssignRole: (userId: string, roleId: number) => Promise<void>;
  onRemoveRole: (userId: string, roleId: number) => Promise<void>;
}

type Tab = "profile" | "roles" | "security";

export function AdminUserModal({ user, open, onClose, roles, onAssignRole, onRemoveRole }: Props) {
  const { t } = useT();
  const [tab, setTab] = useState<Tab>("profile");
  const [fullName, setFullName] = useState(user.profile?.full_name ?? "");
  const [bio, setBio] = useState(user.profile?.bio ?? "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [loadingManualConfirm, setLoadingManualConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!open) return null;

  const handleSave = async () => {
    setError("");
    setSuccess("");
    setLoadingSave(true);
    try {
      await userService.updateProfile(user.id, { full_name: fullName, bio });
      setSuccess(t("admin.userModalSaved"));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t("admin.userModalSaveError"));
    } finally {
      setLoadingSave(false);
    }
  };

  const handleChangePassword = async () => {
    setError("");
    setSuccess("");
    if (newPassword.length < 8) { setError("Mínimo 8 caracteres"); return; }
    if (newPassword !== confirmPassword) { setError("Las contraseñas no coinciden"); return; }
    setLoadingPassword(true);
    try {
      await authService.adminChangePassword(user.id, newPassword);
      setSuccess("Contraseña actualizada");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleResendConfirmation = async () => {
    setError("");
    setSuccess("");
    setLoadingConfirm(true);
    try {
      await authService.resendConfirmation(user.email);
      setSuccess("Email de confirmación reenviado");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoadingConfirm(false);
    }
  };

  const handleManualConfirm = async () => {
    setError("");
    setSuccess("");
    setLoadingManualConfirm(true);
    try {
      await authService.adminConfirmEmail(user.id);
      setSuccess("Email confirmado manualmente");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoadingManualConfirm(false);
    }
  };

  const initials = (user.profile?.full_name ?? user.email).split(" ").map((w) => w[0] ?? "").join("").slice(0, 2).toUpperCase() || "?";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg mx-4">
        <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="relative px-6 pt-6 pb-4">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-lg font-bold shadow-lg">
                  {initials}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1d1d1f] dark:text-white">{user.profile?.full_name ?? "—"}</h3>
                  <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">{user.email}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg text-[#aeaeb2] dark:text-[#636366] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-6 flex gap-1 border-b border-black/6 dark:border-white/6">
            {(["profile", "roles", "security"] as Tab[]).map((tb) => (
              <button
                key={tb}
                className={`px-4 py-2.5 text-xs font-semibold -mb-px transition-all ${tab === tb ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400" : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"}`}
                onClick={() => setTab(tb)}
              >
                {t(`admin.tab${tb.charAt(0).toUpperCase() + tb.slice(1)}`)}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="px-6 py-5 max-h-[60vh] overflow-y-auto">
            {/* Error/Success */}
            {error && <div className="mb-4 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs font-medium">{error}</div>}
            {success && <div className="mb-4 px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium">{success}</div>}

            {/* Profile Tab */}
            {tab === "profile" && (
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-1.5 block">{t("admin.tableName")}</label>
                  <input className="w-full px-3 py-2 rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#1c1c22] text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-1.5 block">Bio</label>
                  <textarea className="w-full px-3 py-2 rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#1c1c22] text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all resize-none" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} maxLength={500} />
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-1.5 block">{t("admin.tableEmail")}</label>
                  <input className="w-full px-3 py-2 rounded-xl border border-black/8 dark:border-white/8 bg-black/3 dark:bg-white/5 text-sm text-[#6e6e73] dark:text-[#86868b] cursor-not-allowed" value={user.email} disabled />
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-1.5 block">{t("admin.tableRegistered")}</label>
                  <input className="w-full px-3 py-2 rounded-xl border border-black/8 dark:border-white/8 bg-black/3 dark:bg-white/5 text-sm text-[#6e6e73] dark:text-[#86868b] cursor-not-allowed" value={user.profile?.created_at ? new Date(user.profile.created_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) : "—"} disabled />
                </div>
              </div>
            )}

            {/* Roles Tab */}
            {tab === "roles" && (
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-2 block">{t("admin.tableRoles")}</label>
                  <div className="flex flex-wrap gap-2">
                    {user.roles.map((r) => (
                      <span key={r.id} className="group/role inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-950/40 dark:to-indigo-950/30 text-blue-700 dark:text-blue-400 text-xs font-bold">
                        {r.name}
                        <button className="opacity-0 group-hover/role:opacity-100 transition-opacity text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-100 leading-none" onClick={() => onRemoveRole(user.id, r.id)}>×</button>
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-2 block">{t("admin.filterByRole")}</label>
                  <div className="flex flex-wrap gap-1.5">
                    {roles.filter((r) => !user.roles.some((ur) => ur.id === r.id)).map((r) => (
                      <button key={r.id} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-black/8 dark:border-white/8 hover:bg-[#1d1d1f] dark:hover:bg-white hover:text-white dark:hover:text-[#1d1d1f] transition-all" onClick={() => onAssignRole(user.id, r.id)}>
                        + {r.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {tab === "security" && (
              <div className="flex flex-col gap-5">
                {/* Password */}
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-2 block">Cambiar contraseña</label>
                  <div className="flex flex-col gap-2">
                    <input className="w-full px-3 py-2 rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#1c1c22] text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all" type="password" placeholder="Nueva contraseña (min 8)" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <input className="w-full px-3 py-2 rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#1c1c22] text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all" type="password" placeholder="Confirmar contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button className="self-start px-4 py-2 rounded-xl bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] text-xs font-bold hover:opacity-90 transition-all disabled:opacity-40" onClick={handleChangePassword} disabled={loadingPassword || !newPassword}>
                      {loadingPassword ? "…" : "Actualizar"}
                    </button>
                  </div>
                </div>

                {/* Email confirmation */}
                <div className="border-t border-black/6 dark:border-white/6 pt-4">
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-2 block">Confirmación de email</label>
                  {user.email_confirmed ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                      Confirmado
                    </span>
                  ) : (
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 rounded-lg border border-black/8 dark:border-white/8 text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-all disabled:opacity-40" onClick={handleResendConfirmation} disabled={loadingConfirm}>
                        {loadingConfirm ? "…" : "Reenviar email"}
                      </button>
                      <button className="px-3 py-1.5 rounded-lg bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] text-xs font-bold hover:opacity-90 transition-all disabled:opacity-40" onClick={handleManualConfirm} disabled={loadingManualConfirm}>
                        {loadingManualConfirm ? "…" : "Confirmar manualmente"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-black/6 dark:border-white/6 flex items-center justify-between">
            <button className="px-4 py-2 rounded-xl text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-all" onClick={onClose}>{t("admin.cancel")}</button>
            {tab === "profile" && (
              <button className="px-5 py-2 rounded-xl bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] text-xs font-bold hover:opacity-90 transition-all disabled:opacity-40" onClick={handleSave} disabled={loadingSave}>
                {loadingSave ? "…" : t("admin.save") ?? "Guardar"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
