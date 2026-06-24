import { useEffect, useState } from "react";
import { adminService, ContactMessage } from "@/services/adminService";
import { SectionHeader, Card, Spinner, EmptyState, IconBtn, SearchInput, Badge, Btn, Icons, relativeTime } from "./AdminShared";

const statusColor = {
  pending:  "amber" as const,
  reviewed: "blue" as const,
  replied:  "green" as const,
};

const statusLabel = {
  pending:  "Pendiente",
  reviewed: "Revisado",
  replied:  "Respondido",
};

export function AdminContactSection() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | ContactMessage["status"]>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try { setMessages(await adminService.listContact()); } catch {}
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const filtered = messages.filter((m) => {
    if (filter !== "all" && m.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.message.toLowerCase().includes(q);
    }
    return true;
  });

  const handleStatus = async (id: string, status: ContactMessage["status"]) => {
    try {
      const updated = await adminService.updateContactStatus(id, status);
      setMessages((ms) => ms.map((m) => m.id === id ? updated : m));
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este mensaje?")) return;
    try { await adminService.deleteContact(id); setMessages((ms) => ms.filter((m) => m.id !== id)); } catch {}
  };

  const FILTERS = [
    { key: "all", label: "Todos" },
    { key: "pending",  label: "Pendientes" },
    { key: "reviewed", label: "Revisados" },
    { key: "replied",  label: "Respondidos" },
  ] as const;

  const pending = messages.filter((m) => m.status === "pending").length;

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader title="Mensajes de contacto" desc={`${messages.length} mensajes · ${pending} pendiente${pending !== 1 ? "s" : ""}`} />

      <div className="flex gap-2 flex-wrap items-center">
        <div className="flex-1">
          <SearchInput value={search} onChange={setSearch} placeholder="Buscar por nombre, email o contenido…" />
        </div>
        <div className="flex gap-1">
          {FILTERS.map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${filter === f.key
                ? "bg-blue-600 text-white"
                : "border border-black/12 dark:border-white/12 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"
              }`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <Card>
        {loading ? <Spinner /> : filtered.length === 0 ? (
          <EmptyState text="Sin mensajes" sub={search ? "Prueba con otro término" : "Aún no has recibido mensajes"} />
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {filtered.map((m) => (
              <div key={m.id} className="px-5 py-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                    {m.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-[#1d1d1f] dark:text-white">{m.name}</p>
                      <a href={`mailto:${m.email}`} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">{m.email}</a>
                      <Badge label={statusLabel[m.status]} color={statusColor[m.status]} />
                      <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">{relativeTime(m.created_at)}</span>
                    </div>
                    <p className={`text-xs text-[#6e6e73] dark:text-[#86868b] mt-1 ${expanded === m.id ? "" : "line-clamp-2"}`}>
                      {m.message}
                    </p>
                    {m.message.length > 120 && (
                      <button onClick={() => setExpanded(expanded === m.id ? null : m.id)}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-0.5">
                        {expanded === m.id ? "Ver menos" : "Ver más"}
                      </button>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    {m.status !== "reviewed" && (
                      <button onClick={() => handleStatus(m.id, "reviewed")} title="Marcar como revisado"
                        className="p-1.5 rounded-lg text-[#aeaeb2] hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors">
                        {Icons.check}
                      </button>
                    )}
                    {m.status !== "replied" && (
                      <button onClick={() => handleStatus(m.id, "replied")} title="Marcar como respondido"
                        className="p-1.5 rounded-lg text-[#aeaeb2] hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors">
                        {Icons.mail}
                      </button>
                    )}
                    <a href={`mailto:${m.email}?subject=Re: Tu mensaje de contacto`} target="_blank" rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-[#aeaeb2] hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                      title="Responder por email">
                      {Icons.send}
                    </a>
                    <IconBtn onClick={() => handleDelete(m.id)} title="Eliminar" icon={Icons.trash} danger />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <p className="text-xs text-center text-[#aeaeb2] dark:text-[#636366]">
        Mostrando {filtered.length} de {messages.length}
      </p>
    </div>
  );
}
