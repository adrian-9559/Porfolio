"use client";
import { useState } from "react";
import type { UserWithProfile } from "@/types/auth";
import { userService } from "@/services/userService";
import { authService } from "@/services/authService";
import { Button } from "@heroui/react";

interface Props {
  user: UserWithProfile;
  open: boolean;
  onClose: () => void;
}

export function AdminUserModal({ user, open, onClose }: Props) {
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
    setError(""); setSuccess("");
    setLoadingSave(true);
    try {
      await userService.updateProfile(user.id, { full_name: fullName, bio });
      setSuccess("Cambios guardados");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setLoadingSave(false);
    }
  };

  const handleResendConfirmation = async () => {
    setError(""); setSuccess("");
    setLoadingConfirm(true);
    try {
      await authService.resendConfirmation(user.id);
      setSuccess("Correo de confirmación enviado");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al enviar confirmación");
    } finally {
      setLoadingConfirm(false);
    }
  };

  const handleManualConfirm = async () => {
    setError(""); setSuccess("");
    setLoadingManualConfirm(true);
    try {
      await authService.adminConfirmEmail(user.id);
      setSuccess("Email confirmado manualmente");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al confirmar email");
    } finally {
      setLoadingManualConfirm(false);
    }
  };

  const handleChangePassword = async () => {
    setError(""); setSuccess("");
    if (newPassword !== confirmPassword) { setError("Las contraseñas no coinciden"); return; }
    if (newPassword.length < 8) { setError("Mínimo 8 caracteres"); return; }
    setLoadingPassword(true);
    try {
      await authService.adminChangePassword(user.id, newPassword);
      setSuccess("Contraseña actualizada");
      setNewPassword(""); setConfirmPassword("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al cambiar contraseña");
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-white dark:bg-[#111116] rounded-2xl border border-black/8 dark:border-white/8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 pt-5 pb-4 border-b border-black/5 dark:border-white/5">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-sm shrink-0">
            {(user.profile?.full_name ?? user.email)[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white truncate">{user.profile?.full_name ?? "Sin nombre"}</p>
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b] truncate">{user.email}</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center text-[#6e6e73] hover:bg-black/8 dark:hover:bg-white/8 transition-colors shrink-0">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-5">
          {error && <div className="px-3 py-2 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">{error}</div>}
          {success && <div className="px-3 py-2 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-sm text-green-600 dark:text-green-400">{success}</div>}

          {/* Perfil */}
          <section className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">Perfil</h3>
            <Field label="Nombre completo" value={fullName} onChange={setFullName} />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#1d1d1f] dark:text-white">Bio</label>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3}
                className="px-3 py-2.5 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all resize-none" />
            </div>
            <ReadonlyField label="Email" value={user.email} />
            {user.profile?.created_at && <ReadonlyField label="Registro" value={new Date(user.profile.created_at).toLocaleDateString("es-ES")} />}
          </section>

          {/* Roles */}
          <section className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">Roles</h3>
            <div className="flex gap-1.5 flex-wrap">
              {user.roles.length > 0 ? user.roles.map((r) => (
                <span key={r.id} className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-medium">{r.name}</span>
              )) : <span className="text-xs text-[#aeaeb2]">Sin roles</span>}
            </div>
          </section>

          {/* Cambiar contraseña */}
          <section className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">Cambiar contraseña</h3>
            <Field label="Nueva contraseña" value={newPassword} onChange={setNewPassword} type="password" />
            <Field label="Confirmar contraseña" value={confirmPassword} onChange={setConfirmPassword} type="password" />
            <Button onPress={handleChangePassword} isPending={loadingPassword} isDisabled={!newPassword} variant="tertiary" size="md">
              {loadingPassword ? "Cambiando…" : "Cambiar contraseña"}
            </Button>
          </section>

          {/* Email */}
          <section className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">Email</h3>
            {user.email_confirmed ? (
              <span className="inline-flex self-start px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 text-xs font-medium">Confirmado</span>
            ) : (
              <div className="flex gap-2">
                <Button onPress={handleResendConfirmation} isPending={loadingConfirm} variant="tertiary" className="flex-1">
                  {loadingConfirm ? "Enviando…" : "Reenviar confirmación"}
                </Button>
                <Button onPress={handleManualConfirm} isPending={loadingManualConfirm} variant="primary" className="flex-1">
                  {loadingManualConfirm ? "Confirmando…" : "Confirmar manualmente"}
                </Button>
              </div>
            )}
          </section>
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-6 py-4 border-t border-black/5 dark:border-white/5">
          <Button onPress={onClose} variant="outline" className="flex-1">
            Cerrar
          </Button>
          <Button onPress={handleSave} isPending={loadingSave} variant="primary" className="flex-1">
            {loadingSave ? "Guardando…" : "Guardar cambios"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[#1d1d1f] dark:text-white">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2.5 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all" />
    </div>
  );
}

function ReadonlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[#6e6e73] dark:text-[#86868b]">{label}</label>
      <p className="text-sm text-[#1d1d1f] dark:text-white">{value}</p>
    </div>
  );
}
