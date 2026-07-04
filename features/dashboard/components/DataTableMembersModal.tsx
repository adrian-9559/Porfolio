"use client";
import { useCallback, useEffect, useState } from "react";
import { Modal, Button } from "@heroui/react";
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
    <Modal.Backdrop isOpen variant="blur" onOpenChange={(open) => { if (!open) onClose(); }}>
      <Modal.Container>
        <Modal.Dialog className="max-h-[80vh] flex flex-col">
          <Modal.CloseTrigger />
          <Modal.Header>
            <Modal.Heading>Miembros</Modal.Heading>
          </Modal.Header>
          <Modal.Body className="flex flex-col flex-1 overflow-hidden">

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-sm">
            {error}
            <button onClick={fetchMembers} className="ml-2 underline">
              Reintentar
            </button>
          </div>
        )}

        {/* Invite form */}
        <div className="mb-5 p-4 rounded-xl bg-default border border-border">
          <label className="text-xs font-semibold text-muted uppercase tracking-wider block mb-2">
            Invitar por email
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="email@ejemplo.com"
              className="flex-1 text-sm rounded-lg border border-border/30 bg-default px-3 py-2 text-foreground"
            />
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as "editor" | "viewer")}
              className="text-sm rounded-lg border border-border/30 bg-default px-2 py-2 text-foreground"
            >
              <option value="editor">Editor</option>
              <option value="viewer">Espectador</option>
            </select>
            <Button size="sm" isDisabled={submitting || !inviteEmail.trim()} onPress={handleInvite}>
              {submitting ? "..." : "Invitar"}
            </Button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-3 flex-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-14 rounded-xl bg-default animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Members list */}
        {!loading && (
          <div className="flex-1 overflow-y-auto space-y-2">
            {accepted.length === 0 && pending.length === 0 && (
              <p className="text-sm text-muted text-center py-8">
                Sin miembros aún. Invita a alguien por email.
              </p>
            )}

            {accepted.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-accent/10 text-accent">
                    {(m.profile?.full_name ?? m.invited_email).charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {m.profile?.full_name ?? m.invited_email}
                    </p>
                    {m.profile?.full_name && (
                      <p className="text-xs text-muted truncate">
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
                      className="text-xs rounded-lg border border-border/30 bg-transparent px-2 py-1 text-foreground"
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
                      className="text-muted hover:text-red-500 p-1"
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
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted/60 mb-2">
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
                        <p className="text-sm font-medium text-foreground truncate">
                          {m.invited_email}
                        </p>
                        <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                          Pendiente
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(m.id)}
                      className="text-muted hover:text-red-500 p-1 shrink-0"
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
          </Modal.Body>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
