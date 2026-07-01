import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type App = "web" | "mobile" | "api";
type ZoneId =
  | "public"
  | "auth"
  | "private"
  | "modules"
  | "admin"
  | "backend"
  | "external";

interface ZoneDef {
  id: ZoneId;
  label: string;
  icon: string;
  gradient: string;
  text: string;
  bg: string;
  border: string;
  dot: string;
}

interface Endpoint {
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  path: string;
  desc: string;
}

interface FlowNode {
  id: string;
  zone: ZoneId;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  routes?: { path: string; desc?: string }[];
  endpoints?: Endpoint[];
  tech?: string[];
  guards?: string[];
  features?: string[];
  env?: string[];
  notes?: string[];
}

// ── Zone config ───────────────────────────────────────────────────────────────

const ZONES: ZoneDef[] = [
  {
    id: "public",
    label: "Público",
    icon: "🌐",
    gradient: "from-blue-500 to-blue-700",
    text: "text-blue-700 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800/40",
    dot: "bg-blue-500",
  },
  {
    id: "auth",
    label: "Autenticación",
    icon: "🔐",
    gradient: "from-violet-500 to-purple-700",
    text: "text-violet-700 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-200 dark:border-violet-800/40",
    dot: "bg-violet-500",
  },
  {
    id: "private",
    label: "Privado",
    icon: "🏠",
    gradient: "from-emerald-500 to-green-700",
    text: "text-emerald-700 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800/40",
    dot: "bg-emerald-500",
  },
  {
    id: "modules",
    label: "Módulos",
    icon: "📦",
    gradient: "from-teal-500 to-cyan-700",
    text: "text-teal-700 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-950/30",
    border: "border-teal-200 dark:border-teal-800/40",
    dot: "bg-teal-500",
  },
  {
    id: "admin",
    label: "Admin",
    icon: "👑",
    gradient: "from-orange-500 to-amber-600",
    text: "text-orange-700 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    border: "border-orange-200 dark:border-orange-800/40",
    dot: "bg-orange-500",
  },
  {
    id: "backend",
    label: "Backend",
    icon: "⚡",
    gradient: "from-slate-600 to-slate-800",
    text: "text-slate-700 dark:text-slate-300",
    bg: "bg-slate-50 dark:bg-slate-900/40",
    border: "border-slate-200 dark:border-slate-700/40",
    dot: "bg-slate-500",
  },
  {
    id: "external",
    label: "Externos",
    icon: "🔌",
    gradient: "from-stone-500 to-stone-700",
    text: "text-stone-700 dark:text-stone-300",
    bg: "bg-stone-50 dark:bg-stone-900/40",
    border: "border-stone-200 dark:border-stone-700/40",
    dot: "bg-stone-500",
  },
];

const zoneOf = (id: ZoneId) => ZONES.find((z) => z.id === id)!;

// ── Node data ─────────────────────────────────────────────────────────────────

const NODES: FlowNode[] = [
  // PUBLIC
  {
    id: "pub-pages",
    zone: "public",
    title: "Páginas Públicas",
    subtitle: "Sin autenticación",
    icon: "🌐",
    description:
      "Conjunto de páginas accesibles para cualquier visitante sin necesidad de cuenta. Forman el portfolio público visible desde internet.",
    routes: [
      { path: "/", desc: "Landing: hero, proyectos, CTA" },
      { path: "/about", desc: "Presentación personal y skills" },
      { path: "/CV", desc: "Curriculum vitae" },
      { path: "/blog", desc: "Blog y herramientas" },
      { path: "/contact", desc: "Formulario de contacto (5 req/15 min)" },
    ],
    tech: ["Next.js 16 SSR", "TailwindCSS", "HeroUI"],
    notes: [
      "No requieren X-API-Key para cargar el HTML",
      "El formulario de contacto llama a POST /contact en el backend",
    ],
  },

  // AUTH
  {
    id: "auth-flow",
    zone: "auth",
    title: "Flujo de Auth",
    subtitle: "JWT + Supabase",
    icon: "🔐",
    description:
      "Sistema de autenticación basado en JWT. El cliente gestiona tokens en localStorage y los renueva automáticamente mediante un interceptor en apiFetch.",
    endpoints: [
      {
        method: "POST",
        path: "/auth/login",
        desc: "Email + password → accessToken + refreshToken",
      },
      { method: "POST", path: "/auth/register", desc: "Crea cuenta y perfil" },
      {
        method: "POST",
        path: "/auth/refresh",
        desc: "Renueva accessToken usando refreshToken",
      },
      {
        method: "GET",
        path: "/auth/me",
        desc: "Perfil del usuario + roles actuales",
      },
      { method: "POST", path: "/auth/logout", desc: "Invalida la sesión" },
    ],
    tech: [
      "Supabase Auth",
      "JWT HS256",
      "localStorage (auth_token / refresh_token)",
      "apiFetch interceptor",
    ],
    notes: [
      "accessToken: ~1h de vida",
      "apiFetch detecta 401 y renueva el token automáticamente",
      "tokenStore abstrae el acceso a localStorage en todo el frontend",
    ],
  },

  // PRIVATE
  {
    id: "dashboard",
    zone: "private",
    title: "Dashboard",
    subtitle: "/dashboard",
    icon: "📊",
    description:
      "Hub principal del usuario autenticado. Punto de entrada a todos los módulos privados.",
    routes: [
      { path: "/dashboard", desc: "Resumen de actividad + accesos directos" },
    ],
    guards: ["useRequireAuth() — redirige a /login si no hay sesión activa"],
    features: [
      "Contador de repos, agentes, grupos",
      "Accesos rápidos a módulos",
      "Badge de notificaciones pendientes",
    ],
  },
  {
    id: "profile",
    zone: "private",
    title: "Mi Perfil",
    subtitle: "/perfil",
    icon: "👤",
    description:
      "Página de perfil personal con estadísticas de uso y acciones rápidas.",
    routes: [{ path: "/perfil", desc: "Perfil + stats + quick actions" }],
    guards: ["useRequireAuth()"],
    endpoints: [
      {
        method: "GET",
        path: "/auth/me",
        desc: "Carga datos y roles del usuario",
      },
    ],
    features: [
      "Avatar + banner con overlay",
      "Stats: repos, agentes, grupos, amigos",
      "Quick actions: Panel, Config, Blog",
    ],
  },
  {
    id: "settings",
    zone: "private",
    title: "Configuración",
    subtitle: "/configuracion",
    icon: "⚙️",
    description: "Edición de datos personales y preferencias de la cuenta.",
    routes: [
      { path: "/configuracion", desc: "Formulario de edición de perfil" },
    ],
    guards: ["useRequireAuth()"],
    endpoints: [
      {
        method: "PATCH",
        path: "/users/:id",
        desc: "Actualiza nombre, avatar u otros campos",
      },
    ],
  },

  // MODULES
  {
    id: "mod-repos",
    zone: "modules",
    title: "Repositorios Git",
    subtitle: "GitHub API",
    icon: "🗂️",
    description:
      "Visualización de repositorios Git conectados vía GitHub API. Incluye commits por rama y grafo SVG del historial.",
    routes: [{ path: "/dashboard/repositories" }],
    endpoints: [
      { method: "GET", path: "/api/repositories", desc: "Repos del usuario" },
      { method: "POST", path: "/api/repositories", desc: "Conectar nuevo repo" },
      { method: "GET", path: "/api/repositories/:id/branches", desc: "Ramas del repo" },
      { method: "GET", path: "/api/repositories/:id/commits", desc: "Commits (?branch=)" },
      { method: "GET", path: "/api/repositories/:id/graph", desc: "Grafo SVG de commits" },
      { method: "GET", path: "/api/repositories/:id/analytics", desc: "Analytics de actividad" },
    ],
    tech: ["GitHub REST API v3", "SVG commit graph", "React state"],
    features: [
      "Lista de repos con stats",
      "Selector de rama",
      "Grafo SVG de commits por rama",
    ],
  },
  {
    id: "mod-escote",
    zone: "modules",
    title: "Escote (Tricount)",
    subtitle: "Gastos compartidos",
    icon: "💸",
    description:
      "Gestión de gastos compartidos estilo Tricount. Grupos, gastos, splits, liquidaciones, categorías, gastos recurrentes, recibos, export CSV e insights de gasto.",
    routes: [{ path: "/dashboard/escote" }],
    endpoints: [
      { method: "GET", path: "/api/tricount/groups", desc: "Listar grupos" },
      { method: "POST", path: "/api/tricount/groups/:id/expenses", desc: "Crear gasto" },
      { method: "GET", path: "/api/tricount/groups/:id/balances", desc: "Balances del grupo" },
      { method: "GET", path: "/api/tricount/insights", desc: "Insights globales de gasto" },
    ],
    tech: ["React + HeroUI", "Supabase RLS", "Algoritmo de liquidación"],
    features: [
      "Crear/gestionar grupos con moneda",
      "Picker de amigos + QR al crear grupo",
      "Gastos con splits equitativos o personalizados",
      "Categorías, liquidaciones, gastos recurrentes",
      "Subida de recibos (foto), export CSV",
      "Insights: gráficos de gasto por categoría",
    ],
  },
  {
    id: "mod-friends",
    zone: "modules",
    title: "Amigos",
    subtitle: "Sistema social",
    icon: "👥",
    description:
      "Sistema de amistades bidireccional. Envía solicitudes, acepta/rechaza, busca usuarios, intercambio QR y notificaciones automáticas.",
    routes: [{ path: "/dashboard/friends" }],
    endpoints: [
      { method: "GET", path: "/api/friends", desc: "Lista de amigos" },
      { method: "GET", path: "/api/friends/search", desc: "Buscar usuarios" },
      { method: "POST", path: "/api/friends/request", desc: "Enviar solicitud" },
      { method: "POST", path: "/api/friends/accept", desc: "Aceptar solicitud" },
      { method: "POST", path: "/api/friends/reject", desc: "Rechazar solicitud" },
      { method: "GET", path: "/api/friends/requests/received", desc: "Solicitudes recibidas" },
      { method: "GET", path: "/api/friends/requests/sent", desc: "Solicitudes enviadas" },
    ],
    tech: [
      "Supabase RLS",
      "QR exchange",
      "Notificaciones automáticas",
    ],
  },
  {
    id: "mod-qr",
    zone: "modules",
    title: "QR Amigos",
    subtitle: "Intercambio rápido",
    icon: "📱",
    description:
      "Intercambio de amistad mediante código QR. Genera un token único que otro usuario puede escanear para enviar solicitud.",
    routes: [{ path: "/dashboard/friends" }],
    endpoints: [
      { method: "GET", path: "/api/qr/friend-token", desc: "Obtener token QR del usuario" },
      { method: "POST", path: "/api/qr/friend-token/revoke", desc: "Revocar y regenerar token" },
      { method: "POST", path: "/api/qr/friend-exchange", desc: "Intercambiar token → solicitud" },
    ],
  },
  {
    id: "mod-markets",
    zone: "modules",
    title: "Markets",
    subtitle: "Datos financieros",
    icon: "📈",
    description:
      "Datos de mercado en tiempo real: forex, cripto (BTC, ETH), materias primas (oro) e índices (S&P 500, AAPL). Público, sin auth.",
    routes: [{ path: "API pública" }],
    endpoints: [
      { method: "GET", path: "/api/markets/latest", desc: "Últimos precios (cache 30s)" },
    ],
    tech: ["API pública", "Cache 30s", "Sin autenticación"],
  },
  {
    id: "admin-gdrive",
    zone: "admin",
    title: "Google Drive",
    subtitle: "Storage builds",
    icon: "☁️",
    description:
      "Integración con Google Drive para almacenamiento de builds APK/AAB. OAuth con refresh token, carpeta configurable.",
    routes: [{ path: "/admin" }],
    endpoints: [
      { method: "GET", path: "/api/admin/google-drive/auth-url", desc: "URL de autorización OAuth" },
      { method: "GET", path: "/api/admin/google-drive/status", desc: "Estado de la conexión" },
      { method: "POST", path: "/api/admin/google-drive/folder", desc: "Configurar carpeta destino" },
      { method: "DELETE", path: "/api/admin/google-drive/disconnect", desc: "Desconectar cuenta" },
    ],
    tech: ["Google Drive API v3", "OAuth 2.0", "Refresh token automático"],
  },
  {
    id: "mod-notifs",
    zone: "modules",
    title: "Notificaciones",
    subtitle: "Centro de avisos",
    icon: "🔔",
    description:
      "Centro de notificaciones del usuario. Recibe avisos de amistad, actividad de grupos, mensajes del admin y eventos del sistema.",
    routes: [{ path: "Panel lateral del dashboard" }],
    endpoints: [
      {
        method: "GET",
        path: "/notifications",
        desc: "Lista de notificaciones del usuario",
      },
      {
        method: "PATCH",
        path: "/notifications/read-all",
        desc: "Marcar todas como leídas",
      },
      {
        method: "DELETE",
        path: "/notifications/:id",
        desc: "Eliminar notificación",
      },
    ],
  },

  // ADMIN
  {
    id: "admin-panel",
    zone: "admin",
    title: "Panel de Admin",
    subtitle: "/admin — rol requerido",
    icon: "👑",
    description:
      "Panel de administración completo, accesible solo para usuarios con rol 'admin'. Cubre toda la plataforma desde una interfaz unificada con 16 secciones agrupadas en 6 categorías.",
    routes: [
      { path: "/admin", desc: "Panel completo con sidebar de navegación" },
    ],
    guards: ["useRequireAdmin() — verifica rol 'admin' vía /auth/me"],
    features: [
      "Dashboard — métricas globales (10 queries simultáneas)",
      "Usuarios — CRUD + roles + búsqueda",
      "Roles — CRUD completo + protección roles sistema",
      "API Keys — todas las claves, revocar, eliminar",
      "Blog + Taxonomía — contenido del sistema de registry",
      "Notificaciones — bandeja global + envío a usuarios",
      "Mensajes — formularios de contacto + estados",
      "Repositorios — todos los conectados por usuarios",
      "Amistades — gestión social con emails",
      "Apps Móviles — distribución APK + upload + logs",
      "Logs — aggregación client-side (pendiente endpoint)",
      "Docs — explorador de ~140 endpoints + diagramas",
      "Google Drive — conexión OAuth para storage",
    ],
  },

  // BACKEND
  {
    id: "be-express",
    zone: "backend",
    title: "Express API",
    subtitle: "Node.js + TypeScript",
    icon: "⚡",
    description:
      "Servidor REST construido con Express.js y TypeScript. Todos los endpoints siguen el formato estándar { success, data, error }.",
    tech: ["Express.js 4", "TypeScript strict", "pnpm", "esbuild (build)"],
    env: ["PORT", "NODE_ENV", "SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"],
    notes: [
      "Desplegado en Render: https://porfolio-backend-0nuw.onrender.com",
      "75+ endpoints REST",
      "Respuesta estándar: { success, data, error }",
    ],
  },
  {
    id: "be-middleware",
    zone: "backend",
    title: "Middlewares",
    subtitle: "Seguridad global",
    icon: "🛡️",
    description:
      "Capa de seguridad y validación aplicada globalmente antes de cualquier handler. Controla acceso a todos los recursos.",
    features: [
      "apiKeyAuth — valida X-API-Key header (estático desde env + tabla api_keys)",
      "authMiddleware — verifica JWT Bearer token",
      "requireRole(role) — comprueba rol del usuario",
      "CORS — lista blanca de orígenes (Vercel + localhost)",
      "Rate limiting — límites distintos por módulo",
      "helmet — cabeceras HTTP de seguridad",
    ],
  },
  {
    id: "be-supabase",
    zone: "backend",
    title: "Supabase Client",
    subtitle: "supabaseAdmin (bypass RLS)",
    icon: "🗃️",
    description:
      "El backend usa siempre supabaseAdmin (service role key) para bypassear RLS. El frontend usa cliente anon con JWT del usuario para que RLS aplique correctamente.",
    tech: ["@supabase/supabase-js v2", "PostgreSQL 15", "Row Level Security"],
    env: ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"],
    notes: [
      "Backend → supabaseAdmin (bypass RLS) para operaciones admin",
      "Frontend → cliente anon + JWT (RLS activo, datos del usuario)",
      "Proyecto Supabase: vujibqrmlpcmrtktdanw (eu-west-1)",
    ],
  },
  {
    id: "be-apikey",
    zone: "backend",
    title: "API Key Gate",
    subtitle: "X-API-Key header",
    icon: "🔑",
    description:
      "Sistema de gating que separa el token de usuario (JWT) del token de cliente (API key). Toda request al backend requiere un X-API-Key válido.",
    features: [
      "X-API-Key validado en TODOS los endpoints excepto /health y /auth/*",
      "Dos tipos: estático en env (para la web) y keys de la tabla api_keys (programáticas)",
      "Keys almacenadas con hash SHA-256 en la DB",
      "Si API_KEY env está vacía → modo desarrollo sin gating",
    ],
    env: ["API_KEY (backend .env)", "NEXT_PUBLIC_API_KEY (frontend .env)"],
  },

  // EXTERNAL
  {
    id: "ext-supabase",
    zone: "external",
    title: "Supabase",
    subtitle: "PostgreSQL + Auth",
    icon: "🐘",
    description:
      "Base de datos PostgreSQL principal y sistema de autenticación. Todas las tablas tienen RLS activo.",
    tech: [
      "PostgreSQL 15",
      "Supabase Auth (GoTrue)",
      "PostgREST",
      "Row Level Security",
    ],
    features: [
      "Tablas: profiles, roles, user_roles, api_keys, notifications, friends, repositories, agents, workflows, groups, expenses, blog_posts, blog_categories, mobile_app_versions...",
      "Auth: FKs a public.profiles (no a auth.users) para PostgREST joins",
      "Migraciones versionadas con nombres descriptivos",
    ],
    notes: ["Región: eu-west-1 (Ireland)", "Proyecto ID: vujibqrmlpcmrtktdanw"],
  },
  {
    id: "ext-github",
    zone: "external",
    title: "GitHub API",
    subtitle: "REST v3",
    icon: "🐙",
    description:
      "Integración con GitHub para obtener repositorios, commits y ramas del usuario autenticado.",
    tech: ["GitHub REST API v3", "Personal Access Token"],
    features: [
      "Listar repos con metadata",
      "Commits por rama (paginados)",
      "Branches con commits individuales",
    ],
  },
  {
    id: "ext-smtp",
    zone: "external",
    title: "SMTP Gmail",
    subtitle: "Emails sistema",
    icon: "📧",
    description:
      "Servidor SMTP de Gmail para envío de emails. Usado para notificaciones del formulario de contacto.",
    tech: ["nodemailer", "Gmail SMTP TLS (puerto 587)"],
    env: ["EMAIL_HOST", "EMAIL_PORT", "EMAIL_USER", "EMAIL_PASS", "EMAIL_TO"],
  },
];

function nodesFor(zone: ZoneId) {
  return NODES.filter((n) => n.zone === zone);
}

// ── Method badge ──────────────────────────────────────────────────────────────

const METHOD_STYLE: Record<string, string> = {
  GET: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400",
  POST: "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400",
  PATCH: "bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400",
  PUT: "bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400",
  DELETE: "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400",
};

// ── Modal ─────────────────────────────────────────────────────────────────────

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="flex items-center gap-1.5 text-[11px] font-bold text-[#6b7280] dark:text-[#9ca3af] uppercase tracking-widest mb-2.5">
        <span>{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

function Modal({ node, onClose }: { node: FlowNode; onClose: () => void }) {
  const zone = zoneOf(node.zone);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-xl bg-white dark:bg-[#111116] sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        style={{
          animation: "modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: translateY(24px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0)    scale(1);    }
          }
        `}</style>

        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-black/20 dark:bg-white/20" />
        </div>

        {/* Gradient header */}
        <div className={`bg-gradient-to-br ${zone.gradient} px-6 pt-4 pb-5`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl shadow-inner">
                {node.icon}
              </div>
              <div>
                <span className="inline-block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-0.5">
                  {zone.icon} {zone.label}
                </span>
                <h2 className="text-lg font-bold text-white leading-snug">
                  {node.title}
                </h2>
                <p className="text-white/65 text-xs mt-0.5">{node.subtitle}</p>
              </div>
            </div>
            <button
              className="mt-0.5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center text-white transition-colors shrink-0"
              onClick={onClose}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                viewBox="0 0 16 16"
              >
                <path d="M3 3l10 10M13 3L3 13" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
          <p className="text-sm text-[#374151] dark:text-[#d1d5db] leading-relaxed">
            {node.description}
          </p>

          {node.routes && node.routes.length > 0 && (
            <Section icon="🗺️" title="Rutas">
              <div className="rounded-xl border border-black/8 dark:border-white/8 overflow-hidden divide-y divide-black/5 dark:divide-white/5">
                {node.routes.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 px-3.5 py-2.5 bg-white dark:bg-[#18181b]"
                  >
                    <code className="text-xs font-mono font-semibold text-[#1d1d1f] dark:text-white shrink-0">
                      {r.path}
                    </code>
                    {r.desc && (
                      <span className="text-xs text-[#9ca3af] pt-0.5">
                        {r.desc}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {node.endpoints && node.endpoints.length > 0 && (
            <Section icon="⚡" title="API Endpoints">
              <div className="rounded-xl border border-black/8 dark:border-white/8 overflow-hidden divide-y divide-black/5 dark:divide-white/5">
                {node.endpoints.map((e, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 px-3.5 py-2.5 bg-white dark:bg-[#18181b]"
                  >
                    <span
                      className={`shrink-0 text-[9px] font-bold font-mono px-1.5 py-0.5 rounded mt-0.5 ${METHOD_STYLE[e.method]}`}
                    >
                      {e.method}
                    </span>
                    <code className="text-xs font-mono text-[#374151] dark:text-[#d1d5db] shrink-0">
                      {e.path}
                    </code>
                    <span className="text-xs text-[#9ca3af] pt-0.5 leading-snug">
                      {e.desc}
                    </span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {node.guards && node.guards.length > 0 && (
            <Section icon="🔒" title="Guards / Protección">
              <ul className="space-y-1.5">
                {node.guards.map((g, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-[#374151] dark:text-[#d1d5db]"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    {g}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {node.features && node.features.length > 0 && (
            <Section icon="✨" title="Funcionalidades">
              <ul className="space-y-1.5">
                {node.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-[#374151] dark:text-[#d1d5db]"
                  >
                    <span
                      className={`mt-1.5 w-1.5 h-1.5 rounded-full ${zone.dot} shrink-0`}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {node.tech && node.tech.length > 0 && (
            <Section icon="🔧" title="Stack técnico">
              <div className="flex flex-wrap gap-1.5">
                {node.tech.map((t) => (
                  <span
                    key={t}
                    className={`text-xs px-2.5 py-1 rounded-full border font-medium ${zone.text} ${zone.bg} ${zone.border}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {node.env && node.env.length > 0 && (
            <Section icon="🔑" title="Variables de entorno">
              <div className="flex flex-wrap gap-1.5">
                {node.env.map((e) => (
                  <code
                    key={e}
                    className="text-xs font-mono px-2 py-0.5 rounded-lg bg-black/[0.05] dark:bg-white/[0.06] text-[#374151] dark:text-[#d1d5db] border border-black/8 dark:border-white/8"
                  >
                    {e}
                  </code>
                ))}
              </div>
            </Section>
          )}

          {node.notes && node.notes.length > 0 && (
            <Section icon="💡" title="Notas">
              <ul className="space-y-1.5">
                {node.notes.map((n, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-[#6b7280] dark:text-[#9ca3af]"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                    {n}
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        {/* Footer hint */}
        <div className="border-t border-black/6 dark:border-white/6 px-6 py-3 bg-black/[0.02] dark:bg-white/[0.02]">
          <p className="text-[11px] text-[#9ca3af] dark:text-[#6b7280] text-center">
            Pulsa fuera del modal o{" "}
            <kbd className="px-1 py-0.5 rounded bg-black/8 dark:bg-white/8 font-mono text-[10px]">
              Esc
            </kbd>{" "}
            para cerrar
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Node card (flow column) ───────────────────────────────────────────────────

function NodeCard({ node, onClick }: { node: FlowNode; onClick: () => void }) {
  const zone = zoneOf(node.zone);

  return (
    <button
      className={`
        group w-full text-left rounded-xl border px-3.5 py-3
        bg-white dark:bg-[#18181b] ${zone.border}
        hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02]
        active:scale-[0.99]
        transition-all duration-200 cursor-pointer
      `}
      onClick={onClick}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-xl leading-none shrink-0">{node.icon}</span>
        <div className="min-w-0 flex-1">
          <p className={`text-[13px] font-semibold leading-snug ${zone.text}`}>
            {node.title}
          </p>
          <p className="text-[11px] text-[#9ca3af] dark:text-[#6b7280] truncate mt-0.5">
            {node.subtitle}
          </p>
        </div>
        <svg
          className={`w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-60 transition-opacity ${zone.text}`}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          viewBox="0 0 16 16"
        >
          <path d="M8 2l6 6-6 6M2 8h12" />
        </svg>
      </div>
    </button>
  );
}

// ── Zone column ───────────────────────────────────────────────────────────────

function ZoneColumn({
  zoneId,
  nodes,
  onSelect,
}: {
  zoneId: ZoneId;
  nodes: FlowNode[];
  onSelect: (n: FlowNode) => void;
}) {
  const zone = zoneOf(zoneId);

  return (
    <div className="flex flex-col gap-2 w-[175px] shrink-0">
      {/* Zone header */}
      <div
        className={`rounded-xl px-3.5 py-2.5 bg-gradient-to-br ${zone.gradient} shadow-md`}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg leading-none">{zone.icon}</span>
          <div>
            <p className="text-white font-bold text-xs tracking-wide leading-tight">
              {zone.label.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
      {/* Nodes */}
      <div className="flex flex-col gap-1.5">
        {nodes.map((n) => (
          <NodeCard key={n.id} node={n} onClick={() => onSelect(n)} />
        ))}
      </div>
    </div>
  );
}

// ── Arrow ─────────────────────────────────────────────────────────────────────

function Arrow() {
  return (
    <div className="flex items-start pt-[34px] px-0.5 shrink-0">
      <svg
        className="w-6 h-6 text-[#d1d5db] dark:text-[#374151]"
        fill="none"
        viewBox="0 0 28 28"
      >
        <circle
          className="opacity-40"
          cx="14"
          cy="14"
          r="13"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M10 14h8M15 10l4 4-4 4"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

// ── Infra row ─────────────────────────────────────────────────────────────────

function InfraRow({
  zoneId,
  label,
  nodes,
  onSelect,
}: {
  zoneId: ZoneId;
  label: string;
  nodes: FlowNode[];
  onSelect: (n: FlowNode) => void;
}) {
  const zone = zoneOf(zoneId);

  return (
    <div className={`rounded-2xl border ${zone.border} overflow-hidden`}>
      <div
        className={`flex items-center gap-3 px-5 py-3 bg-gradient-to-r ${zone.gradient}`}
      >
        <span className="text-base">{zone.icon}</span>
        <p className="text-white text-xs font-bold uppercase tracking-widest">
          {label}
        </p>
        <div className="ml-auto flex items-center gap-1">
          {[0, 150, 300].map((d) => (
            <span
              key={d}
              className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse"
              style={{ animationDelay: `${d}ms` }}
            />
          ))}
        </div>
      </div>
      <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 ${zone.bg}`}>
        {nodes.map((n) => (
          <button
            key={n.id}
            className={`
              group text-left rounded-xl border bg-white dark:bg-[#18181b] px-3.5 py-3
              ${zone.border}
              hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.99]
              transition-all duration-200 cursor-pointer
            `}
            onClick={() => onSelect(n)}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl leading-none">{n.icon}</span>
              <svg
                className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity mt-0.5 ${zone.text}`}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
                viewBox="0 0 16 16"
              >
                <path d="M8 2l6 6-6 6M2 8h12" />
              </svg>
            </div>
            <p
              className={`text-[13px] font-semibold leading-snug ${zone.text}`}
            >
              {n.title}
            </p>
            <p className="text-[11px] text-[#9ca3af] dark:text-[#6b7280] mt-0.5 leading-snug">
              {n.subtitle}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Coming soon placeholder ───────────────────────────────────────────────────

function ComingSoon({ label, icon }: { label: string; icon: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-20 h-20 rounded-3xl bg-black/[0.04] dark:bg-white/[0.04] flex items-center justify-center text-4xl">
        {icon}
      </div>
      <div className="text-center">
        <p className="text-base font-semibold text-[#1d1d1f] dark:text-white">
          {label}
        </p>
        <p className="text-sm text-[#9ca3af] mt-1">
          Diagrama de flujo próximamente
        </p>
      </div>
      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40 tracking-wide uppercase">
        En construcción
      </span>
    </div>
  );
}

// ── App selector ──────────────────────────────────────────────────────────────

const APPS: { id: App; label: string; icon: string; ready: boolean }[] = [
  { id: "web", label: "Web App", icon: "🌐", ready: true },
  { id: "mobile", label: "App Móvil", icon: "📱", ready: true },
  { id: "api", label: "API / CLI", icon: "⚡", ready: false },
];

const FLOW_ZONES: ZoneId[] = ["public", "auth", "private", "modules", "admin"];

// ── Main export ───────────────────────────────────────────────────────────────

export function AppFlowDiagram() {
  const [activeApp, setActiveApp] = useState<App>("web");
  const [selected, setSelected] = useState<FlowNode | null>(null);

  // Close modal on Escape
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setSelected(null);
  };

  return (
    <div
      className="flex flex-col gap-4"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      {/* App tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex gap-1 p-1 bg-black/[0.04] dark:bg-white/[0.04] rounded-2xl">
          {APPS.map((app) => (
            <button
              key={app.id}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                ${
                  activeApp === app.id
                    ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] shadow-sm"
                    : `text-[#6b7280] dark:text-[#9ca3af] hover:bg-black/5 dark:hover:bg-white/5 ${!app.ready ? "opacity-50" : ""}`
                }
              `}
              onClick={() => setActiveApp(app.id)}
            >
              {app.icon} {app.label}
              {!app.ready && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
                  SOON
                </span>
              )}
            </button>
          ))}
        </div>
        <p className="ml-auto text-xs text-[#9ca3af] hidden sm:block">
          Haz click en cualquier bloque para más detalles →
        </p>
      </div>

      {activeApp === "mobile" ? (
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-[#f9fafb] dark:bg-[#0d0d10] p-4">
            <div className="flex gap-1 items-start min-w-max">
              {(["public", "auth", "private"] as ZoneId[]).map((zid, i) => (
                <div key={zid} className="flex items-start gap-1">
                  <ZoneColumn
                    nodes={nodesFor(zid)}
                    zoneId={zid}
                    onSelect={setSelected}
                  />
                  {i < 2 && <Arrow />}
                </div>
              ))}
            </div>
          </div>
          <InfraRow
            label="Backend API — Render"
            nodes={nodesFor("backend")}
            zoneId="backend"
            onSelect={setSelected}
          />
          <InfraRow
            label="Servicios Externos"
            nodes={nodesFor("external")}
            zoneId="external"
            onSelect={setSelected}
          />
          <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-6 flex flex-col gap-4">
            <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
              📱 App Móvil — Partimos
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { icon: "🏠", label: "Inicio", desc: "Resumen + accesos rápidos" },
                { icon: "👥", label: "Grupos", desc: "Gestión Tricount móvil" },
                { icon: "📊", label: "Insights", desc: "Estadísticas de gasto (mock)" },
                { icon: "🤝", label: "Amigos", desc: "Social + QR exchange" },
                { icon: "🔔", label: "Avisos", desc: "Notificaciones push" },
                { icon: "⚙️", label: "Perfil", desc: "Preferencias + tema" },
              ].map((tab) => (
                <div
                  key={tab.label}
                  className="rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#18181b] p-3.5 flex items-start gap-3"
                >
                  <span className="text-xl shrink-0">{tab.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white">
                      {tab.label}
                    </p>
                    <p className="text-[10px] text-[#9ca3af] mt-0.5">
                      {tab.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Expo SDK 54", "Expo Router 4", "Zustand", "React Query", "SecureStore", "Reanimated"].map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2 py-1 rounded-full border border-sky-200 dark:border-sky-800/40 bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-400 font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : activeApp === "api" ? (
        <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116]">
          <ComingSoon
            icon={APPS.find((a) => a.id === activeApp)!.icon}
            label={APPS.find((a) => a.id === activeApp)!.label}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {/* ── Main flow (horizontal scroll) ── */}
          <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-[#f9fafb] dark:bg-[#0d0d10] p-4 overflow-x-auto">
            {/* Connector line behind the columns */}
            <div className="flex gap-1 items-start min-w-max">
              {FLOW_ZONES.map((zid, i) => (
                <div key={zid} className="flex items-start gap-1">
                  <ZoneColumn
                    nodes={nodesFor(zid)}
                    zoneId={zid}
                    onSelect={setSelected}
                  />
                  {i < FLOW_ZONES.length - 1 && <Arrow />}
                </div>
              ))}
            </div>
          </div>

          {/* ── Backend row ── */}
          <InfraRow
            label="Backend / Infraestructura — Render"
            nodes={nodesFor("backend")}
            zoneId="backend"
            onSelect={setSelected}
          />

          {/* ── External services row ── */}
          <InfraRow
            label="Servicios Externos"
            nodes={nodesFor("external")}
            zoneId="external"
            onSelect={setSelected}
          />

          {/* Legend */}
          <div className="flex flex-wrap gap-2">
            {FLOW_ZONES.map((zid) => {
              const z = zoneOf(zid);

              return (
                <span
                  key={zid}
                  className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${z.text} ${z.bg} ${z.border}`}
                >
                  {z.icon} {z.label}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal */}
      {selected && <Modal node={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
