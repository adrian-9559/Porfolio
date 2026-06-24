import { SectionHeader, Card } from "./AdminShared";

// Placeholder — a real implementation would query an audit_logs table
export function AdminLogsSection() {
  return (
    <div className="flex flex-col gap-5">
      <SectionHeader title="Logs y Auditoría" desc="Registro de actividad del sistema" />

      <div className="rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 px-4 py-3">
        <p className="text-xs text-amber-700 dark:text-amber-400">
          <strong>Pendiente:</strong> Requiere crear la tabla <code className="font-mono">audit_logs</code> en Supabase y conectar triggers en las operaciones críticas del backend.
        </p>
      </div>

      <Card>
        <div className="px-5 py-4 border-b border-black/6 dark:border-white/6">
          <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white">Eventos a registrar (planificado)</h3>
        </div>
        <div className="divide-y divide-black/5 dark:divide-white/5">
          {[
            { icon: "👤", event: "Registro de usuario", table: "auth.users", trigger: "INSERT" },
            { icon: "🔐", event: "Login de usuario", table: "auth.sessions", trigger: "INSERT" },
            { icon: "🛡️", event: "Cambio de rol", table: "user_roles", trigger: "INSERT/DELETE" },
            { icon: "🤖", event: "Creación de agente IA", table: "ai_agents", trigger: "INSERT" },
            { icon: "⚡", event: "Ejecución de agente", table: "—", trigger: "service call" },
            { icon: "🔑", event: "Uso de API Key", table: "api_keys", trigger: "UPDATE last_used_at" },
            { icon: "🗑️", event: "Eliminación de usuario", table: "profiles", trigger: "DELETE" },
            { icon: "⚙️", event: "Acceso al panel admin", table: "—", trigger: "middleware log" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3">
              <span className="text-base">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm text-[#1d1d1f] dark:text-white">{item.event}</p>
                <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">Tabla: {item.table} · Trigger: {item.trigger}</p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">pendiente</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
