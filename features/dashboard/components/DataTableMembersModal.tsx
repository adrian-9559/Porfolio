"use client";
import { useCallback, useEffect, useState } from "react";
import {
  dataTableService,
  type DataTableMember,
} from "@/services/dataTableService";

interface Props {
  tableId: string;
  onClose: () => void;
}

export function DataTableMembersModal({ tableId, onClose }: Props) {
  const [members, setMembers] = useState<DataTableMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"editor" | "viewer">("editor");
  const [submitting, setSubmitting] = useState(false);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataTableService.listMembers(tableId);
      setMembers(data);
    } catch (err: any) {
      setError(err?.message ?? "Error al cargar miembros");
    } finally {
      setLoading(false);
    }
  }, [tableId]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const accepted = members.filter((m) => m.status === "accepted");
  const pending = members.filter((m) => m.status === "pending");

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return;
    setSubmitting(true);
    try {
      await dataTableService.inviteMember(tableId, {
        email: inviteEmail.trim(),
        role: inviteRole,
      });
      setInviteEmail("");
      await fetchMembers();
    } catch (err: any) {
      setError(err?.message ?? "Error al invitar");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemove = async (memberId: string) => {
    try {
      await dataTableService.removeMember(tableId, memberId);
      await fetchMembers();
    } catch {
      // ignore
    }
  };

  const handleRoleChange = async (memberId: string, role: "editor" | "viewer") => {
    try {
      await dataTableService.updateMemberRole(tableId, memberId, role);
      await fetchMembers();
    } catch {
      // ignore
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white dark:bg-[#1a1a1f] rounded-2xl p-6 w-full max-w-lg mx-4 border border-black/8 dark:border-white/8 max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-white">
            Miembros
          </h3>
          <button
            onClick={onClose}
            className="text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white p-1"
          >
            <svg
              fill="none"
              height="20"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              viewBox="0 0 20 20"
              width="20"
            >
              <path d="M5 5l10 10M15 5l-10 10" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-sm">
            {error}
            <button onClick={fetchMembers} className="ml-2 underline">
              Reintentar
            </button>
          </div>
        )}

        {/* Invite form */}
        <div className="mb-5 p-4 rounded-xl bg-gray-50 dark:bg-[#111116] border border-black/8 dark:border-white/8">
          <label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider block mb-2">
            Invitar por email
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="email@ejemplo.com"
              className="flex-1 text-sm rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#1a1a1f] px-3 py-2 text-[#1d1d1f] dark:text-white"
            />
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as "editor" | "viewer")}
              className="text-sm rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#1a1a1f] px-2 py-2 text-[#1d1d1f] dark:text-white"
            >
              <option value="editor">Editor</option>
              <option value="viewer">Espectador</option>
            </select>
            <button
              onClick={handleInvite}
              disabled={submitting || !inviteEmail.trim()}
              className="apple-btn-primary text-sm py-2 px-4"
            >
              {submitting ? "..." : "Invitar"}
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-3 flex-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-14 rounded-xl bg-gray-100 dark:bg-[#1a1a1f] animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Members list */}
        {!loading && (
          <div className="flex-1 overflow-y-auto space-y-2">
            {accepted.length === 0 && pending.length === 0 && (
              <p className="text-sm text-[#6e6e73] dark:text-[#86868b] text-center py-8">
                Sin miembros aún. Invita a alguien por email.
              </p>
            )}

            {accepted.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold shrink-0">
                    {(m.profile?.full_name ?? m.invited_email).charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#1d1d1f] dark:text-white truncate">
                      {m.profile?.full_name ?? m.invited_email}
                    </p>
                    {m.profile?.full_name && (
                      <p className="text-xs text-[#6e6e73] dark:text-[#86868b] truncate">
                        {m.invited_email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {m.role !== "owner" ? (
                    <select
                      value={m.role}
                      onChange={(e) =>
                        handleRoleChange(m.id, e.target.value as "editor" | "viewer")
                      }
                      className="text-xs rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-2 py-1 text-[#1d1d1f] dark:text-white"
                    >
                      <option value="editor">Editor</option>
                      <option value="viewer">Espectador</option>
                    </select>
                  ) : (
                    <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
                      Propietario
                    </span>
                  )}
                  {m.role !== "owner" && (
                    <button
                      onClick={() => handleRemove(m.id)}
                      className="text-[#6e6e73] hover:text-red-500 p-1"
                      title="Quitar"
                    >
                      <svg
                        fill="none"
                        height="16"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="1.5"
                        viewBox="0 0 16 16"
                        width="16"
                      >
                        <path d="M2 4h12M5.5 4V2.5a1 1 0 011-1h3a1 1 0 011 1V4M12.5 4v8.5a1.5 1.5 0 01-1.5 1.5H5a1.5 1.5 0 01-1.5-1.5V4" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Pending invitations */}
            {pending.length > 0 && (
              <>
                <div className="pt-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-2">
                    Invitaciones pendientes
                  </p>
                </div>
                {pending.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-800/30"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 text-sm font-bold shrink-0">
                        {m.invited_email.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#1d1d1f] dark:text-white truncate">
                          {m.invited_email}
                        </p>
                        <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                          Pendiente
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(m.id)}
                      className="text-[#6e6e73] hover:text-red-500 p-1 shrink-0"
                      title="Cancelar invitación"
                    >
                      <svg
                        fill="none"
                        height="16"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="1.5"
                        viewBox="0 0 16 16"
                        width="16"
                      >
                        <path d="M2 4h12M5.5 4V2.5a1 1 0 011-1h3a1 1 0 011 1V4M12.5 4v8.5a1.5 1.5 0 01-1.5 1.5H5a1.5 1.5 0 01-1.5-1.5V4" />
                      </svg>
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
