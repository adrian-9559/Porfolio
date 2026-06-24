import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Column {
	name: string;
	type: string;
	nullable: boolean;
	isPK: boolean;
	isFK: boolean;
	fkRef?: string;
	description: string;
	constraint?: string;
}

interface TableDef {
	id: string;
	name: string;
	schema: "public" | "auth";
	group: string;
	x: number;
	y: number;
	description: string;
	columns: Column[];
}

interface Edge {
	from: string;
	to: string;
}

// ── Groups ────────────────────────────────────────────────────────────────────

const GROUPS: Record<string, { label: string; bg: string; border: string; text: string; dot: string }> = {
	auth:     { label: "Auth & Usuarios",  bg: "bg-blue-100 dark:bg-blue-950/40",    border: "border-blue-300 dark:border-blue-700/60",     text: "text-blue-700 dark:text-blue-400",     dot: "bg-blue-500" },
	ai:       { label: "IA & Agentes",      bg: "bg-violet-100 dark:bg-violet-950/40", border: "border-violet-300 dark:border-violet-700/60", text: "text-violet-700 dark:text-violet-400", dot: "bg-violet-500" },
	blog:     { label: "Blog & Taxonomía",  bg: "bg-amber-100 dark:bg-amber-950/40",   border: "border-amber-300 dark:border-amber-700/60",   text: "text-amber-700 dark:text-amber-400",   dot: "bg-amber-500" },
	tricount: { label: "Tricount",          bg: "bg-emerald-100 dark:bg-emerald-950/40", border: "border-emerald-300 dark:border-emerald-700/60", text: "text-emerald-700 dark:text-emerald-400", dot: "bg-emerald-500" },
	social:   { label: "Social & Amigos",   bg: "bg-pink-100 dark:bg-pink-950/40",     border: "border-pink-300 dark:border-pink-700/60",     text: "text-pink-700 dark:text-pink-400",     dot: "bg-pink-500" },
	mobile:   { label: "Mobile App",        bg: "bg-orange-100 dark:bg-orange-950/40", border: "border-orange-300 dark:border-orange-700/60", text: "text-orange-700 dark:text-orange-400", dot: "bg-orange-500" },
	api:      { label: "API & Repos",       bg: "bg-sky-100 dark:bg-sky-950/40",       border: "border-sky-300 dark:border-sky-700/60",       text: "text-sky-700 dark:text-sky-400",       dot: "bg-sky-500" },
	system:   { label: "Sistema",           bg: "bg-gray-100 dark:bg-gray-800/40",     border: "border-gray-300 dark:border-gray-600/60",     text: "text-gray-700 dark:text-gray-400",     dot: "bg-gray-500" },
};

// ── Tables ────────────────────────────────────────────────────────────────────

const TABLES: TableDef[] = [
	{ id: "auth.users", name: "auth.users", schema: "auth", group: "auth", x: 700, y: 330,
	  description: "Tabla gestionada por Supabase Auth. Almacena los usuarios registrados con su email, hash de contraseña y metadatos de autenticación. Es la tabla raíz de la que dependen casi todas las demás.",
	  columns: [
		{ name: "id",                 type: "uuid",        nullable: false, isPK: true,  isFK: false, description: "Identificador único del usuario" },
		{ name: "email",              type: "text",        nullable: true,  isPK: false, isFK: false, description: "Email del usuario (único)" },
		{ name: "encrypted_password", type: "text",        nullable: true,  isPK: false, isFK: false, description: "Hash bcrypt de la contraseña" },
		{ name: "created_at",         type: "timestamptz", nullable: true,  isPK: false, isFK: false, description: "Fecha de creación de la cuenta" },
		{ name: "updated_at",         type: "timestamptz", nullable: true,  isPK: false, isFK: false, description: "Última actualización" },
		{ name: "last_sign_in_at",    type: "timestamptz", nullable: true,  isPK: false, isFK: false, description: "Último inicio de sesión" },
	  ] },
	{ id: "profiles", name: "profiles", schema: "public", group: "auth", x: 440, y: 190,
	  description: "Perfil público del usuario. Extiende auth.users con nombre, avatar y bio. Se crea automáticamente al registrarse mediante un trigger.",
	  columns: [
		{ name: "id",         type: "uuid",        nullable: false, isPK: true,  isFK: true,  fkRef: "auth.users.id", description: "FK hacia auth.users — mismo UUID" },
		{ name: "full_name",  type: "text",        nullable: true,  isPK: false, isFK: false, description: "Nombre completo" },
		{ name: "avatar_url", type: "text",        nullable: true,  isPK: false, isFK: false, description: "URL de la foto de perfil" },
		{ name: "bio",        type: "text",        nullable: true,  isPK: false, isFK: false, description: "Texto de presentación", constraint: "max 500 caracteres" },
		{ name: "created_at", type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha de creación" },
		{ name: "updated_at", type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Última modificación" },
	  ] },
	{ id: "roles", name: "roles", schema: "public", group: "auth", x: 200, y: 220,
	  description: "Catálogo de roles (p.ej. 'admin', 'user'). Junto con user_roles implementa el RBAC del sistema.",
	  columns: [
		{ name: "id",          type: "integer",     nullable: false, isPK: true,  isFK: false, description: "ID autoincremental" },
		{ name: "name",        type: "text",        nullable: false, isPK: false, isFK: false, description: "Nombre snake_case del rol", constraint: "solo minúsculas y guiones bajos" },
		{ name: "description", type: "text",        nullable: true,  isPK: false, isFK: false, description: "Descripción y permisos" },
		{ name: "created_at",  type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha de creación" },
	  ] },
	{ id: "user_roles", name: "user_roles", schema: "public", group: "auth", x: 200, y: 330,
	  description: "Tabla de unión que asigna roles a usuarios. Un usuario puede tener múltiples roles.",
	  columns: [
		{ name: "id",         type: "integer",     nullable: false, isPK: true,  isFK: false, description: "ID autoincremental" },
		{ name: "user_id",    type: "uuid",        nullable: false, isPK: false, isFK: true,  fkRef: "auth.users.id", description: "FK hacia el usuario" },
		{ name: "role_id",    type: "integer",     nullable: false, isPK: false, isFK: true,  fkRef: "roles.id", description: "FK hacia el rol" },
		{ name: "created_at", type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha de asignación" },
	  ] },
	{ id: "audit_logs", name: "audit_logs", schema: "public", group: "auth", x: 440, y: 330,
	  description: "Registro inmutable de acciones del sistema (quién, qué, cuándo). Solo inserción. Usado para auditoría en el panel admin.",
	  columns: [
		{ name: "id",          type: "bigint",      nullable: false, isPK: true,  isFK: false, description: "ID incremental" },
		{ name: "actor_id",    type: "uuid",        nullable: true,  isPK: false, isFK: true,  fkRef: "auth.users.id", description: "Usuario que actuó (null = sistema)" },
		{ name: "action",      type: "text",        nullable: false, isPK: false, isFK: false, description: "Nombre de la acción (e.g. 'user.login')" },
		{ name: "target_type", type: "text",        nullable: true,  isPK: false, isFK: false, description: "Tipo del objeto afectado" },
		{ name: "target_id",   type: "text",        nullable: true,  isPK: false, isFK: false, description: "ID del objeto afectado" },
		{ name: "metadata",    type: "jsonb",       nullable: true,  isPK: false, isFK: false, description: "Datos adicionales en JSON" },
		{ name: "created_at",  type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha exacta del evento" },
	  ] },
	{ id: "users_preferences", name: "users_preferences", schema: "public", group: "auth", x: 440, y: 460,
	  description: "Preferencias personales del usuario: tema, TTL de sesión, notificaciones. Se crea automáticamente al registrarse.",
	  columns: [
		{ name: "id",          type: "uuid",        nullable: false, isPK: true,  isFK: false, description: "UUID único" },
		{ name: "user_id",     type: "uuid",        nullable: false, isPK: false, isFK: true,  fkRef: "auth.users.id", description: "FK única hacia el usuario" },
		{ name: "remember_me", type: "boolean",     nullable: false, isPK: false, isFK: false, description: "Recordar sesión" },
		{ name: "theme",       type: "text",        nullable: false, isPK: false, isFK: false, description: "Tema preferido", constraint: "'light' | 'dark' | 'system'" },
		{ name: "session_ttl", type: "text",        nullable: false, isPK: false, isFK: false, description: "Duración de sesión (p.ej. '7d')" },
		{ name: "settings",    type: "jsonb",       nullable: false, isPK: false, isFK: false, description: "Config extra en JSON" },
		{ name: "created_at",  type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha de creación" },
		{ name: "updated_at",  type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Última actualización" },
	  ] },
	{ id: "notifications", name: "notifications", schema: "public", group: "system", x: 700, y: 140,
	  description: "Centro de notificaciones. Mensajes de sistema, alertas admin y notificaciones de plataforma que el usuario puede marcar como leídas.",
	  columns: [
		{ name: "id",         type: "uuid",        nullable: false, isPK: true,  isFK: false, description: "UUID único" },
		{ name: "user_id",    type: "uuid",        nullable: false, isPK: false, isFK: true,  fkRef: "auth.users.id", description: "FK hacia el destinatario" },
		{ name: "title",      type: "text",        nullable: false, isPK: false, isFK: false, description: "Título corto" },
		{ name: "message",    type: "text",        nullable: false, isPK: false, isFK: false, description: "Cuerpo del mensaje" },
		{ name: "type",       type: "text",        nullable: false, isPK: false, isFK: false, description: "Tipo visual", constraint: "'info' | 'admin' | 'system'" },
		{ name: "read",       type: "boolean",     nullable: false, isPK: false, isFK: false, description: "¿Ya leída?" },
		{ name: "created_at", type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha de envío" },
	  ] },
	{ id: "contact_messages", name: "contact_messages", schema: "public", group: "system", x: 960, y: 140,
	  description: "Mensajes del formulario de contacto público. No requiere auth. El admin puede revisarlos y marcar su estado.",
	  columns: [
		{ name: "id",         type: "uuid",        nullable: false, isPK: true,  isFK: false, description: "UUID único" },
		{ name: "name",       type: "text",        nullable: false, isPK: false, isFK: false, description: "Nombre del remitente" },
		{ name: "email",      type: "text",        nullable: false, isPK: false, isFK: false, description: "Email del remitente" },
		{ name: "message",    type: "text",        nullable: false, isPK: false, isFK: false, description: "Texto del mensaje" },
		{ name: "status",     type: "text",        nullable: false, isPK: false, isFK: false, description: "Estado de gestión", constraint: "'pending' | 'reviewed' | 'replied'" },
		{ name: "created_at", type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha de envío" },
	  ] },
	{ id: "api_keys", name: "api_keys", schema: "public", group: "api", x: 960, y: 270,
	  description: "Claves API de los usuarios. Solo se guarda el hash SHA-256, nunca la clave en claro.",
	  columns: [
		{ name: "id",           type: "uuid",        nullable: false, isPK: true,  isFK: false, description: "UUID único" },
		{ name: "user_id",      type: "uuid",        nullable: false, isPK: false, isFK: true,  fkRef: "auth.users.id", description: "FK hacia el propietario" },
		{ name: "name",         type: "text",        nullable: false, isPK: false, isFK: false, description: "Nombre descriptivo" },
		{ name: "key_prefix",   type: "text",        nullable: false, isPK: false, isFK: false, description: "Prefijo visible en UI" },
		{ name: "key_hash",     type: "text",        nullable: false, isPK: false, isFK: false, description: "Hash SHA-256 de la clave" },
		{ name: "is_active",    type: "boolean",     nullable: false, isPK: false, isFK: false, description: "¿Activa o revocada?" },
		{ name: "last_used_at", type: "timestamptz", nullable: true,  isPK: false, isFK: false, description: "Último uso" },
		{ name: "created_at",   type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha de creación" },
	  ] },
	{ id: "git_repositories", name: "git_repositories", schema: "public", group: "api", x: 960, y: 390,
	  description: "Repositorios Git vinculados al panel. Soporta GitHub, GitLab y Bitbucket. El token se guarda cifrado.",
	  columns: [
		{ name: "id",             type: "uuid",        nullable: false, isPK: true,  isFK: false, description: "UUID único" },
		{ name: "user_id",        type: "uuid",        nullable: false, isPK: false, isFK: true,  fkRef: "auth.users.id", description: "FK hacia el propietario" },
		{ name: "name",           type: "text",        nullable: false, isPK: false, isFK: false, description: "Nombre del repo" },
		{ name: "provider",       type: "text",        nullable: false, isPK: false, isFK: false, description: "Plataforma", constraint: "'github' | 'gitlab' | 'bitbucket'" },
		{ name: "repository_url", type: "text",        nullable: false, isPK: false, isFK: false, description: "URL del repositorio" },
		{ name: "default_branch", type: "text",        nullable: false, isPK: false, isFK: false, description: "Rama principal" },
		{ name: "access_token",   type: "text",        nullable: true,  isPK: false, isFK: false, description: "Token cifrado del proveedor" },
		{ name: "active",         type: "boolean",     nullable: false, isPK: false, isFK: false, description: "¿Activo en el panel?" },
		{ name: "created_at",     type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha de vinculación" },
	  ] },
	{ id: "ai_agents", name: "ai_agents", schema: "public", group: "ai", x: 1200, y: 200,
	  description: "Agentes IA configurados por el usuario. Cada uno tiene system prompt, capacidades y esquemas de entrada/salida.",
	  columns: [
		{ name: "id",             type: "uuid",        nullable: false, isPK: true,  isFK: false, description: "UUID único" },
		{ name: "user_id",        type: "uuid",        nullable: false, isPK: false, isFK: true,  fkRef: "auth.users.id", description: "FK hacia el creador" },
		{ name: "name",           type: "text",        nullable: false, isPK: false, isFK: false, description: "Nombre del agente" },
		{ name: "description",    type: "text",        nullable: true,  isPK: false, isFK: false, description: "Descripción del rol" },
		{ name: "preset_type",    type: "text",        nullable: true,  isPK: false, isFK: false, description: "Preset predefinido", constraint: "frontend_builder | backend_developer | ..." },
		{ name: "system_prompt",  type: "text",        nullable: false, isPK: false, isFK: false, description: "Instrucciones de sistema" },
		{ name: "capabilities",   type: "text[]",      nullable: false, isPK: false, isFK: false, description: "Lista de capacidades" },
		{ name: "memory_enabled", type: "boolean",     nullable: false, isPK: false, isFK: false, description: "¿Memoria persistente?" },
		{ name: "tools_enabled",  type: "boolean",     nullable: false, isPK: false, isFK: false, description: "¿Puede usar herramientas?" },
		{ name: "input_schema",   type: "jsonb",       nullable: false, isPK: false, isFK: false, description: "Esquema de entrada JSON" },
		{ name: "output_schema",  type: "jsonb",       nullable: false, isPK: false, isFK: false, description: "Esquema de salida JSON" },
		{ name: "is_public",      type: "boolean",     nullable: false, isPK: false, isFK: false, description: "¿Visible para otros?" },
		{ name: "created_at",     type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha de creación" },
		{ name: "updated_at",     type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Última modificación" },
	  ] },
	{ id: "agent_memory", name: "agent_memory", schema: "public", group: "ai", x: 1450, y: 120,
	  description: "Memoria persistente por agente/usuario. Almacena contexto, resúmenes y conversaciones anteriores en JSONB.",
	  columns: [
		{ name: "id",         type: "uuid",        nullable: false, isPK: true,  isFK: false, description: "UUID único" },
		{ name: "agent_id",   type: "uuid",        nullable: false, isPK: false, isFK: true,  fkRef: "ai_agents.id", description: "FK hacia el agente" },
		{ name: "user_id",    type: "uuid",        nullable: false, isPK: false, isFK: true,  fkRef: "auth.users.id", description: "FK hacia el usuario" },
		{ name: "memory",     type: "jsonb",       nullable: false, isPK: false, isFK: false, description: "{ context, summary, conversations[] }" },
		{ name: "created_at", type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha de creación" },
		{ name: "updated_at", type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Última actualización" },
	  ] },
	{ id: "agent_workflows", name: "agent_workflows", schema: "public", group: "ai", x: 1450, y: 240,
	  description: "Pipelines que encadenan múltiples agentes en secuencia, con contexto compartido entre pasos.",
	  columns: [
		{ name: "id",             type: "uuid",        nullable: false, isPK: true,  isFK: false, description: "UUID único" },
		{ name: "user_id",        type: "uuid",        nullable: false, isPK: false, isFK: true,  fkRef: "auth.users.id", description: "FK hacia el creador" },
		{ name: "name",           type: "text",        nullable: false, isPK: false, isFK: false, description: "Nombre del workflow" },
		{ name: "description",    type: "text",        nullable: true,  isPK: false, isFK: false, description: "Propósito del workflow" },
		{ name: "steps",          type: "jsonb",       nullable: false, isPK: false, isFK: false, description: "Array de pasos { agent_id, input, ... }" },
		{ name: "shared_context", type: "jsonb",       nullable: false, isPK: false, isFK: false, description: "Variables compartidas entre pasos" },
		{ name: "created_at",     type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha de creación" },
		{ name: "updated_at",     type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Última modificación" },
	  ] },
	{ id: "agent_graphs", name: "agent_graphs", schema: "public", group: "ai", x: 1450, y: 360,
	  description: "Grafos de agentes para flujos no lineales. Nodos = agentes, aristas = conexiones condicionales.",
	  columns: [
		{ name: "id",          type: "uuid",        nullable: false, isPK: true,  isFK: false, description: "UUID único" },
		{ name: "user_id",     type: "uuid",        nullable: false, isPK: false, isFK: true,  fkRef: "auth.users.id", description: "FK hacia el creador" },
		{ name: "name",        type: "text",        nullable: false, isPK: false, isFK: false, description: "Nombre del grafo" },
		{ name: "description", type: "text",        nullable: true,  isPK: false, isFK: false, description: "Descripción del flujo" },
		{ name: "nodes",       type: "jsonb",       nullable: false, isPK: false, isFK: false, description: "{ id, agent_id, position, config }[]" },
		{ name: "edges",       type: "jsonb",       nullable: false, isPK: false, isFK: false, description: "{ from, to, condition }[]" },
		{ name: "metadata",    type: "jsonb",       nullable: false, isPK: false, isFK: false, description: "Metadatos del grafo" },
		{ name: "created_at",  type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha de creación" },
		{ name: "updated_at",  type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Última modificación" },
	  ] },
	{ id: "orchestrator_tasks", name: "orchestrator_tasks", schema: "public", group: "ai", x: 1200, y: 370,
	  description: "Tareas del orquestador IA. Registra tipo, estado, entrada, resultado y métricas de tokens.",
	  columns: [
		{ name: "id",                type: "uuid",        nullable: false, isPK: true,  isFK: false, description: "UUID único" },
		{ name: "user_id",           type: "uuid",        nullable: false, isPK: false, isFK: true,  fkRef: "auth.users.id", description: "FK hacia el usuario" },
		{ name: "name",              type: "text",        nullable: false, isPK: false, isFK: false, description: "Nombre de la tarea" },
		{ name: "type",              type: "text",        nullable: false, isPK: false, isFK: false, description: "Modo de ejecución", constraint: "single | pipeline | parallel | conditional | autogpt" },
		{ name: "status",            type: "text",        nullable: false, isPK: false, isFK: false, description: "Estado", constraint: "pending | running | completed | failed | cancelled" },
		{ name: "input",             type: "text",        nullable: false, isPK: false, isFK: false, description: "Texto de entrada" },
		{ name: "result",            type: "text",        nullable: true,  isPK: false, isFK: false, description: "Respuesta final" },
		{ name: "error",             type: "text",        nullable: true,  isPK: false, isFK: false, description: "Error si falló" },
		{ name: "agent_ids",         type: "text[]",      nullable: false, isPK: false, isFK: false, description: "UUIDs de agentes participantes" },
		{ name: "max_retries",       type: "integer",     nullable: false, isPK: false, isFK: false, description: "Máximo de reintentos" },
		{ name: "retry_count",       type: "integer",     nullable: false, isPK: false, isFK: false, description: "Reintentos realizados" },
		{ name: "tokens_used",       type: "integer",     nullable: true,  isPK: false, isFK: false, description: "Tokens totales consumidos" },
		{ name: "execution_time_ms", type: "bigint",      nullable: true,  isPK: false, isFK: false, description: "Tiempo total en ms" },
		{ name: "created_at",        type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha de creación" },
	  ] },
	{ id: "orchestrator_logs", name: "orchestrator_logs", schema: "public", group: "ai", x: 1450, y: 490,
	  description: "Log detallado de cada paso del orquestador. Permite ver qué hizo cada agente en cada tarea.",
	  columns: [
		{ name: "id",                type: "uuid",        nullable: false, isPK: true,  isFK: false, description: "UUID único" },
		{ name: "task_id",           type: "uuid",        nullable: false, isPK: false, isFK: true,  fkRef: "orchestrator_tasks.id", description: "FK hacia la tarea" },
		{ name: "agent_id",          type: "text",        nullable: true,  isPK: false, isFK: false, description: "ID del agente del paso" },
		{ name: "agent_name",        type: "text",        nullable: false, isPK: false, isFK: false, description: "Nombre del agente" },
		{ name: "step_index",        type: "integer",     nullable: false, isPK: false, isFK: false, description: "Posición en el pipeline" },
		{ name: "status",            type: "text",        nullable: false, isPK: false, isFK: false, description: "Estado del paso", constraint: "running | completed | failed | retrying | skipped" },
		{ name: "input",             type: "text",        nullable: true,  isPK: false, isFK: false, description: "Entrada del agente" },
		{ name: "output",            type: "text",        nullable: true,  isPK: false, isFK: false, description: "Salida generada" },
		{ name: "tokens_used",       type: "integer",     nullable: true,  isPK: false, isFK: false, description: "Tokens del paso" },
		{ name: "execution_time_ms", type: "bigint",      nullable: true,  isPK: false, isFK: false, description: "Tiempo del paso en ms" },
		{ name: "metadata",          type: "jsonb",       nullable: true,  isPK: false, isFK: false, description: "Metadatos extra" },
		{ name: "created_at",        type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha del log" },
	  ] },
	{ id: "blog_categories", name: "blog_categories", schema: "public", group: "blog", x: 700, y: 600,
	  description: "Categorías del blog (JavaScript, React…). Taxonomía principal usada en filtros y rutas de aprendizaje.",
	  columns: [
		{ name: "id",         type: "text",        nullable: false, isPK: true,  isFK: false, description: "Slug único de la categoría" },
		{ name: "label",      type: "text",        nullable: false, isPK: false, isFK: false, description: "Nombre visible" },
		{ name: "group_id",   type: "text",        nullable: false, isPK: false, isFK: false, description: "Grupo (p.ej. 'lenguajes')" },
		{ name: "color",      type: "text",        nullable: false, isPK: false, isFK: false, description: "Clase Tailwind de fondo" },
		{ name: "text_color", type: "text",        nullable: false, isPK: false, isFK: false, description: "Clase Tailwind de texto" },
		{ name: "active",     type: "boolean",     nullable: false, isPK: false, isFK: false, description: "¿Activa y visible?" },
		{ name: "sort_order", type: "integer",     nullable: false, isPK: false, isFK: false, description: "Orden en el listado" },
		{ name: "created_at", type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha de creación" },
	  ] },
	{ id: "blog_tags", name: "blog_tags", schema: "public", group: "blog", x: 460, y: 720,
	  description: "Tags del blog para clasificación granular. Cada tag tiene slug único para URLs.",
	  columns: [
		{ name: "id",         type: "uuid",        nullable: false, isPK: true,  isFK: false, description: "UUID único" },
		{ name: "name",       type: "text",        nullable: false, isPK: false, isFK: false, description: "Nombre visible" },
		{ name: "slug",       type: "text",        nullable: false, isPK: false, isFK: false, description: "Slug URL-friendly único" },
		{ name: "active",     type: "boolean",     nullable: false, isPK: false, isFK: false, description: "¿Activo?" },
		{ name: "created_at", type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha de creación" },
	  ] },
	{ id: "learning_paths", name: "learning_paths", schema: "public", group: "blog", x: 700, y: 720,
	  description: "Rutas de aprendizaje que agrupan categorías en un itinerario (p.ej. 'Full Stack Developer').",
	  columns: [
		{ name: "id",          type: "text",        nullable: false, isPK: true,  isFK: false, description: "ID textual único de la ruta" },
		{ name: "title",       type: "text",        nullable: false, isPK: false, isFK: false, description: "Nombre de la ruta" },
		{ name: "description", type: "text",        nullable: true,  isPK: false, isFK: false, description: "Descripción e itinerario" },
		{ name: "icon",        type: "text",        nullable: true,  isPK: false, isFK: false, description: "Emoji o icono" },
		{ name: "color",       type: "text",        nullable: true,  isPK: false, isFK: false, description: "Color Tailwind" },
		{ name: "active",      type: "boolean",     nullable: false, isPK: false, isFK: false, description: "¿Visible?" },
		{ name: "sort_order",  type: "integer",     nullable: false, isPK: false, isFK: false, description: "Orden" },
		{ name: "created_at",  type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha de creación" },
	  ] },
	{ id: "learning_path_steps", name: "learning_path_steps", schema: "public", group: "blog", x: 700, y: 840,
	  description: "Pasos de una ruta de aprendizaje. Asocia una categoría de blog con la ruta y su posición.",
	  columns: [
		{ name: "id",               type: "uuid",    nullable: false, isPK: true,  isFK: false, description: "UUID único" },
		{ name: "learning_path_id", type: "text",    nullable: false, isPK: false, isFK: true,  fkRef: "learning_paths.id", description: "FK hacia la ruta" },
		{ name: "category_id",      type: "text",    nullable: false, isPK: false, isFK: true,  fkRef: "blog_categories.id", description: "FK hacia la categoría" },
		{ name: "label",            type: "text",    nullable: true,  isPK: false, isFK: false, description: "Etiqueta personalizada (opcional)" },
		{ name: "step_order",       type: "integer", nullable: false, isPK: false, isFK: false, description: "Posición en la ruta" },
		{ name: "optional",         type: "boolean", nullable: false, isPK: false, isFK: false, description: "¿Paso opcional?" },
	  ] },
	{ id: "content_relationships", name: "content_relationships", schema: "public", group: "blog", x: 940, y: 720,
	  description: "Relaciones entre contenidos del blog: prerequisitos, relacionados, siguiente, deep dive.",
	  columns: [
		{ name: "id",         type: "uuid",        nullable: false, isPK: true,  isFK: false, description: "UUID único" },
		{ name: "from_slug",  type: "text",        nullable: false, isPK: false, isFK: false, description: "Slug origen" },
		{ name: "to_slug",    type: "text",        nullable: false, isPK: false, isFK: false, description: "Slug destino" },
		{ name: "type",       type: "text",        nullable: false, isPK: false, isFK: false, description: "Tipo de relación", constraint: "prerequisite | related | next | deepdive" },
		{ name: "created_at", type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha de creación" },
	  ] },
	{ id: "tricount_groups", name: "tricount_groups", schema: "public", group: "tricount", x: 200, y: 570,
	  description: "Grupos de gasto compartido (vacaciones, piso…). Tiene propietario y moneda.",
	  columns: [
		{ name: "id",         type: "uuid",        nullable: false, isPK: true,  isFK: false, description: "UUID único" },
		{ name: "name",       type: "text",        nullable: false, isPK: false, isFK: false, description: "Nombre del grupo" },
		{ name: "owner_id",   type: "uuid",        nullable: false, isPK: false, isFK: true,  fkRef: "auth.users.id", description: "FK hacia el creador/admin" },
		{ name: "currency",   type: "text",        nullable: false, isPK: false, isFK: false, description: "Moneda (p.ej. 'EUR')" },
		{ name: "created_at", type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha de creación" },
		{ name: "updated_at", type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Última modificación" },
	  ] },
	{ id: "tricount_members", name: "tricount_members", schema: "public", group: "tricount", x: 200, y: 680,
	  description: "Miembros de un grupo. Puede ser un usuario registrado (user_id) o persona externa (solo nombre).",
	  columns: [
		{ name: "id",         type: "uuid",        nullable: false, isPK: true,  isFK: false, description: "UUID único" },
		{ name: "group_id",   type: "uuid",        nullable: false, isPK: false, isFK: true,  fkRef: "tricount_groups.id", description: "FK hacia el grupo" },
		{ name: "user_id",    type: "uuid",        nullable: true,  isPK: false, isFK: true,  fkRef: "auth.users.id", description: "FK opcional hacia usuario registrado" },
		{ name: "name",       type: "text",        nullable: false, isPK: false, isFK: false, description: "Nombre visible en el grupo" },
		{ name: "created_at", type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha de unión" },
	  ] },
	{ id: "tricount_expenses", name: "tricount_expenses", schema: "public", group: "tricount", x: 200, y: 790,
	  description: "Gastos del grupo. Quién pagó, cuánto y cuándo. Los splits detallan el reparto.",
	  columns: [
		{ name: "id",          type: "uuid",        nullable: false, isPK: true,  isFK: false, description: "UUID único" },
		{ name: "group_id",    type: "uuid",        nullable: false, isPK: false, isFK: true,  fkRef: "tricount_groups.id", description: "FK hacia el grupo" },
		{ name: "description", type: "text",        nullable: false, isPK: false, isFK: false, description: "Descripción del gasto" },
		{ name: "amount",      type: "numeric",     nullable: false, isPK: false, isFK: false, description: "Importe", constraint: "mayor que 0" },
		{ name: "paid_by",     type: "uuid",        nullable: false, isPK: false, isFK: true,  fkRef: "tricount_members.id", description: "FK hacia quien pagó" },
		{ name: "date",        type: "date",        nullable: false, isPK: false, isFK: false, description: "Fecha del gasto" },
		{ name: "created_at",  type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha de registro" },
	  ] },
	{ id: "tricount_expense_splits", name: "tricount_expense_splits", schema: "public", group: "tricount", x: 440, y: 860,
	  description: "Reparto de cada gasto. Cada fila = cuánto debe un miembro de un gasto.",
	  columns: [
		{ name: "id",         type: "uuid",    nullable: false, isPK: true,  isFK: false, description: "UUID único" },
		{ name: "expense_id", type: "uuid",    nullable: false, isPK: false, isFK: true,  fkRef: "tricount_expenses.id", description: "FK hacia el gasto" },
		{ name: "member_id",  type: "uuid",    nullable: false, isPK: false, isFK: true,  fkRef: "tricount_members.id", description: "FK hacia el miembro" },
		{ name: "share",      type: "numeric", nullable: false, isPK: false, isFK: false, description: "Importe que debe pagar" },
	  ] },
	{ id: "friend_requests", name: "friend_requests", schema: "public", group: "social", x: 200, y: 450,
	  description: "Solicitudes de amistad. Registra emisor, receptor y estado de la solicitud.",
	  columns: [
		{ name: "id",               type: "uuid",        nullable: false, isPK: true,  isFK: false, description: "UUID único" },
		{ name: "sender_user_id",   type: "uuid",        nullable: false, isPK: false, isFK: true,  fkRef: "auth.users.id", description: "FK hacia quien envió" },
		{ name: "receiver_user_id", type: "uuid",        nullable: false, isPK: false, isFK: true,  fkRef: "auth.users.id", description: "FK hacia quien recibe" },
		{ name: "status",           type: "text",        nullable: false, isPK: false, isFK: false, description: "Estado", constraint: "pending | accepted | rejected | blocked" },
		{ name: "created_at",       type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha de envío" },
		{ name: "updated_at",       type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Última actualización" },
	  ] },
	{ id: "friendships", name: "friendships", schema: "public", group: "social", x: 200, y: 340,
	  description: "Amistades confirmadas. Al aceptar una solicitud se crean dos filas (A→B y B→A) para queries bidireccionales.",
	  columns: [
		{ name: "id",             type: "uuid",        nullable: false, isPK: true,  isFK: false, description: "UUID único" },
		{ name: "user_id",        type: "uuid",        nullable: false, isPK: false, isFK: true,  fkRef: "auth.users.id", description: "FK hacia un usuario" },
		{ name: "friend_user_id", type: "uuid",        nullable: false, isPK: false, isFK: true,  fkRef: "auth.users.id", description: "FK hacia el amigo" },
		{ name: "created_at",     type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha de amistad" },
	  ] },
	{ id: "mobile_app_versions", name: "mobile_app_versions", schema: "public", group: "mobile", x: 1200, y: 550,
	  description: "Versiones publicadas de la app móvil Tricount (APK/AAB). Metadatos de cada build.",
	  columns: [
		{ name: "id",            type: "uuid",        nullable: false, isPK: true,  isFK: false, description: "UUID único" },
		{ name: "version",       type: "text",        nullable: false, isPK: false, isFK: false, description: "Versión semántica (p.ej. '1.0.0')" },
		{ name: "platform",      type: "text",        nullable: false, isPK: false, isFK: false, description: "Plataforma", constraint: "'android' | 'ios'" },
		{ name: "build_type",    type: "text",        nullable: false, isPK: false, isFK: false, description: "Tipo de build", constraint: "'apk' | 'aab' | 'ipa'" },
		{ name: "file_name",     type: "text",        nullable: false, isPK: false, isFK: false, description: "Nombre del archivo" },
		{ name: "file_path",     type: "text",        nullable: false, isPK: false, isFK: false, description: "Ruta de almacenamiento" },
		{ name: "file_size",     type: "bigint",      nullable: true,  isPK: false, isFK: false, description: "Tamaño en bytes" },
		{ name: "is_active",     type: "boolean",     nullable: false, isPK: false, isFK: false, description: "¿Versión activa para descarga?" },
		{ name: "release_notes", type: "text",        nullable: true,  isPK: false, isFK: false, description: "Notas de versión" },
		{ name: "created_at",    type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha de publicación" },
	  ] },
	{ id: "mobile_download_logs", name: "mobile_download_logs", schema: "public", group: "mobile", x: 1200, y: 670,
	  description: "Log de descargas de la app móvil. Qué versión, cuándo y quién (opcional).",
	  columns: [
		{ name: "id",            type: "uuid",        nullable: false, isPK: true,  isFK: false, description: "UUID único" },
		{ name: "user_id",       type: "uuid",        nullable: true,  isPK: false, isFK: true,  fkRef: "auth.users.id", description: "FK opcional (null = anónimo)" },
		{ name: "version_id",    type: "uuid",        nullable: true,  isPK: false, isFK: true,  fkRef: "mobile_app_versions.id", description: "FK hacia la versión descargada" },
		{ name: "platform",      type: "text",        nullable: true,  isPK: false, isFK: false, description: "Plataforma del dispositivo" },
		{ name: "downloaded_at", type: "timestamptz", nullable: false, isPK: false, isFK: false, description: "Fecha y hora de descarga" },
	  ] },
];

// ── Edges ─────────────────────────────────────────────────────────────────────

const EDGES: Edge[] = [
	{ from: "profiles",                to: "auth.users" },
	{ from: "user_roles",              to: "auth.users" },
	{ from: "user_roles",              to: "roles" },
	{ from: "audit_logs",              to: "auth.users" },
	{ from: "users_preferences",       to: "auth.users" },
	{ from: "notifications",           to: "auth.users" },
	{ from: "ai_agents",               to: "auth.users" },
	{ from: "agent_memory",            to: "ai_agents" },
	{ from: "agent_memory",            to: "auth.users" },
	{ from: "agent_workflows",         to: "auth.users" },
	{ from: "agent_graphs",            to: "auth.users" },
	{ from: "api_keys",                to: "auth.users" },
	{ from: "git_repositories",        to: "auth.users" },
	{ from: "orchestrator_tasks",      to: "auth.users" },
	{ from: "orchestrator_logs",       to: "orchestrator_tasks" },
	{ from: "learning_path_steps",     to: "learning_paths" },
	{ from: "learning_path_steps",     to: "blog_categories" },
	{ from: "tricount_groups",         to: "auth.users" },
	{ from: "tricount_members",        to: "tricount_groups" },
	{ from: "tricount_members",        to: "auth.users" },
	{ from: "tricount_expenses",       to: "tricount_groups" },
	{ from: "tricount_expenses",       to: "tricount_members" },
	{ from: "tricount_expense_splits", to: "tricount_expenses" },
	{ from: "tricount_expense_splits", to: "tricount_members" },
	{ from: "friend_requests",         to: "auth.users" },
	{ from: "friendships",             to: "auth.users" },
	{ from: "mobile_download_logs",    to: "auth.users" },
	{ from: "mobile_download_logs",    to: "mobile_app_versions" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const W = 158;
const H = 34;
const CANVAS_W = 1640;
const CANVAS_H = 920;

function makePath(from: TableDef, to: TableDef): string {
	const x1 = from.x, y1 = from.y, x2 = to.x, y2 = to.y;
	const dx = x2 - x1;
	if (Math.abs(y2 - y1) < 10) {
		const mid = y1 - Math.abs(dx) * 0.12;
		return `M ${x1},${y1} C ${x1 + dx * 0.4},${mid} ${x2 - dx * 0.4},${mid} ${x2},${y2}`;
	}
	return `M ${x1},${y1} C ${x1 + dx * 0.5},${y1} ${x2 - dx * 0.5},${y2} ${x2},${y2}`;
}

function getTypeColor(type: string) {
	if (type.includes("uuid"))    return "text-blue-600 dark:text-blue-400";
	if (type.includes("text"))    return "text-emerald-600 dark:text-emerald-400";
	if (type.includes("boolean")) return "text-amber-600 dark:text-amber-400";
	if (type.includes("integer") || type.includes("bigint") || type.includes("numeric")) return "text-violet-600 dark:text-violet-400";
	if (type.includes("jsonb"))   return "text-orange-600 dark:text-orange-400";
	if (type.includes("timestamp") || type.includes("date")) return "text-pink-600 dark:text-pink-400";
	if (type.includes("[]"))      return "text-sky-600 dark:text-sky-400";
	return "text-[#6e6e73] dark:text-[#86868b]";
}

// ── Component ─────────────────────────────────────────────────────────────────

export function DatabaseDiagram() {
	const [selected, setSelected] = useState<string | null>(null);
	const selectedTable = TABLES.find(t => t.id === selected) ?? null;
	const connectedIds = selected
		? new Set(EDGES.filter(e => e.from === selected || e.to === selected).flatMap(e => [e.from, e.to]))
		: new Set<string>();

	function handleClick(id: string) {
		setSelected(prev => prev === id ? null : id);
	}

	return (
		<div className="space-y-4">
			{/* Legend + clear btn */}
			<div className="flex items-center justify-between gap-3 flex-wrap">
				<div className="flex flex-wrap gap-2">
					{Object.entries(GROUPS).map(([id, g]) => (
						<span key={id} className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${g.bg} ${g.border} ${g.text}`}>
							<span className={`w-1.5 h-1.5 rounded-full ${g.dot}`} />
							{g.label}
						</span>
					))}
				</div>
				{selected && (
					<button onClick={() => setSelected(null)} className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-black/5 dark:bg-white/5 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/8 dark:hover:bg-white/8 transition-colors">
						✕ Deseleccionar
					</button>
				)}
			</div>

			{/* Stats */}
			<div className="flex gap-4 text-xs text-[#6e6e73] dark:text-[#86868b]">
				<span><strong className="text-[#1d1d1f] dark:text-white">{TABLES.length}</strong> tablas</span>
				<span><strong className="text-[#1d1d1f] dark:text-white">{EDGES.length}</strong> relaciones FK</span>
				<span><strong className="text-[#1d1d1f] dark:text-white">{TABLES.reduce((s, t) => s + t.columns.length, 0)}</strong> columnas</span>
				<span className="ml-auto italic">← Scroll horizontal para ver todo · Clic en tabla para detalles</span>
			</div>

			{/* Diagram */}
			<div className="rounded-xl border border-black/8 dark:border-white/8 overflow-hidden bg-[#fafafa] dark:bg-[#0a0a0f]">
				<div className="overflow-auto">
					<div className="relative" style={{ width: CANVAS_W, height: CANVAS_H }}>
						{/* Grid */}
						<svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
							<defs>
								<pattern id="db-grid" width="28" height="28" patternUnits="userSpaceOnUse">
									<path d="M 28 0 L 0 0 0 28" fill="none" stroke="currentColor" strokeWidth="0.4" className="text-black/8 dark:text-white/6" />
								</pattern>
							</defs>
							<rect width="100%" height="100%" fill="url(#db-grid)" />
						</svg>

						{/* Edges */}
						<svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
							<defs>
								<marker id="db-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
									<path d="M0,0 L0,6 L6,3 z" fill="#94a3b8" />
								</marker>
								<marker id="db-arrow-hi" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
									<path d="M0,0 L0,6 L6,3 z" fill="#6366f1" />
								</marker>
							</defs>
							{EDGES.map((e, i) => {
								const fromT = TABLES.find(t => t.id === e.from);
								const toT   = TABLES.find(t => t.id === e.to);
								if (!fromT || !toT) return null;
								const isHi  = !!selected && (e.from === selected || e.to === selected);
								const isDim = !!selected && !isHi;
								return (
									<path key={i} d={makePath(fromT, toT)} fill="none"
										stroke={isHi ? "#6366f1" : "#94a3b8"}
										strokeWidth={isHi ? 1.8 : 0.9}
										strokeOpacity={isDim ? 0.1 : isHi ? 0.9 : 0.35}
										markerEnd={isHi ? "url(#db-arrow-hi)" : "url(#db-arrow)"}
										strokeDasharray={isHi ? undefined : "4 3"}
									/>
								);
							})}
						</svg>

						{/* Table boxes */}
						{TABLES.map(t => {
							const g     = GROUPS[t.group];
							const isSel = selected === t.id;
							const isConn = connectedIds.has(t.id) && !isSel;
							const isDim  = !!selected && !isSel && !isConn;
							return (
								<div key={t.id} onClick={() => handleClick(t.id)}
									style={{ position: "absolute", left: t.x - W / 2, top: t.y - H / 2, width: W, height: H, zIndex: 2, opacity: isDim ? 0.25 : 1 }}
									className={`flex items-center justify-between px-3 rounded-xl border cursor-pointer transition-all duration-150 select-none
										${isSel  ? "bg-indigo-600 border-indigo-700 shadow-lg shadow-indigo-500/30"
										: isConn ? `${g.bg} ${g.border} shadow-md`
										: "bg-white dark:bg-[#17171d] border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:shadow-md"}`}>
									<div className="flex items-center gap-1.5 min-w-0">
										<span className={`w-2 h-2 rounded-full flex-shrink-0 ${isSel ? "bg-indigo-300" : g.dot}`} />
										<span className={`font-mono text-[11px] font-semibold truncate ${isSel ? "text-white" : "text-[#1d1d1f] dark:text-white"}`}>{t.name}</span>
									</div>
									<span className={`text-[10px] font-bold flex-shrink-0 ml-1 ${isSel ? "text-indigo-200" : "text-[#aeaeb2] dark:text-[#636366]"}`}>{t.columns.length}</span>
								</div>
							);
						})}
					</div>
				</div>

				{/* Detail panel */}
				{selectedTable && (
					<div className="border-t border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-4">
						<div className="flex items-start gap-4 flex-wrap mb-4">
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2 mb-1.5 flex-wrap">
									<span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${GROUPS[selectedTable.group].bg} ${GROUPS[selectedTable.group].border} ${GROUPS[selectedTable.group].text}`}>
										{GROUPS[selectedTable.group].label}
									</span>
									<span className="text-[10px] font-mono text-[#aeaeb2] dark:text-[#636366] px-2 py-0.5 rounded-full bg-black/4 dark:bg-white/4">
										{selectedTable.schema}.{selectedTable.name}
									</span>
									<span className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">{selectedTable.columns.length} columnas</span>
								</div>
								<p className="text-sm text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed">{selectedTable.description}</p>
							</div>
							<div className="flex flex-col gap-1 flex-shrink-0 max-h-28 overflow-auto">
								{EDGES.filter(e => e.from === selectedTable.id).map((e, i) => (
									<button key={i} onClick={() => setSelected(e.to)}
										className="flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors whitespace-nowrap">
										→ <span className="font-mono font-semibold">{e.to}</span>
									</button>
								))}
								{EDGES.filter(e => e.to === selectedTable.id).map((e, i) => (
									<button key={i} onClick={() => setSelected(e.from)}
										className="flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-lg bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 hover:bg-violet-100 transition-colors whitespace-nowrap">
										← <span className="font-mono font-semibold">{e.from}</span>
									</button>
								))}
							</div>
						</div>

						<div className="overflow-x-auto rounded-xl border border-black/8 dark:border-white/8">
							<table className="w-full text-xs border-collapse">
								<thead>
									<tr className="bg-black/[0.03] dark:bg-white/[0.03] border-b border-black/8 dark:border-white/8">
										{["Columna", "Tipo", "Nulo", "PK", "FK → Tabla", "Descripción"].map(h => (
											<th key={h} className="px-3 py-2 text-left font-semibold text-[#1d1d1f] dark:text-white whitespace-nowrap">{h}</th>
										))}
									</tr>
								</thead>
								<tbody>
									{selectedTable.columns.map((col, i) => (
										<tr key={col.name} className={`border-b border-black/4 dark:border-white/4 last:border-0 ${i % 2 ? "bg-black/[0.01] dark:bg-white/[0.01]" : ""}`}>
											<td className="px-3 py-2 font-mono font-semibold text-[#1d1d1f] dark:text-white whitespace-nowrap">
												{col.isPK && <span className="mr-1 text-amber-500">🔑</span>}
												{col.isFK && !col.isPK && <span className="mr-1 text-blue-500">🔗</span>}
												{col.name}
											</td>
											<td className="px-3 py-2 font-mono whitespace-nowrap">
												<span className={`font-semibold ${getTypeColor(col.type)}`}>{col.type}</span>
											</td>
											<td className="px-3 py-2 text-center">
												{col.nullable ? <span className="text-[#aeaeb2]">✓</span> : <span className="font-bold text-red-500">✕</span>}
											</td>
											<td className="px-3 py-2 text-center">
												{col.isPK ? <span className="text-amber-500 font-bold">✓</span> : <span className="text-[#aeaeb2]">—</span>}
											</td>
											<td className="px-3 py-2">
												{col.isFK && col.fkRef
													? <button onClick={() => setSelected(col.fkRef!.split(".")[0])} className="font-mono text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap">{col.fkRef}</button>
													: <span className="text-[#aeaeb2]">—</span>
												}
											</td>
											<td className="px-3 py-2 text-[#3d3d3d] dark:text-[#c0c0c5]">
												{col.description}
												{col.constraint && (
													<span className="ml-1.5 px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 text-[9px] font-semibold">{col.constraint}</span>
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
