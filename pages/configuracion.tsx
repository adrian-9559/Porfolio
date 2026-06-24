import { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/router";

type Tab = "perfil" | "seguridad" | "preferencias";

const TABS: { id: Tab; label: string; icon: string }[] = [
	{ id: "perfil",        label: "Perfil",        icon: "👤" },
	{ id: "seguridad",     label: "Seguridad",      icon: "🔒" },
	{ id: "preferencias",  label: "Preferencias",   icon: "⚙️" },
];

export default function ConfiguracionPage() {
	const { isAuthenticated, loadingAuth } = useRequireAuth();
	const [tab, setTab] = useState<Tab>("perfil");

	if (loadingAuth || !isAuthenticated) {
		return (
			<DefaultLayout>
				<div className="flex justify-center py-20">
					<div className="w-5 h-5 rounded-full border-2 border-blue-600/30 border-t-blue-600 animate-spin" />
				</div>
			</DefaultLayout>
		);
	}

	return (
		<DefaultLayout>
			<div className="max-w-3xl mx-auto space-y-6">
				{/* Breadcrumb + header */}
				<div>
					<div className="flex items-center gap-2 mb-2">
						<Link href="/perfil" className="text-xs text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
							Mi perfil
						</Link>
						<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">/</span>
						<span className="text-xs text-[#1d1d1f] dark:text-white font-medium">Configuración</span>
					</div>
					<h1 className="text-3xl font-bold text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>Configuración</h1>
					<p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1">Gestiona tu perfil, seguridad y preferencias</p>
				</div>

				{/* Tabs */}
				<div className="flex gap-1 p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] w-fit">
					{TABS.map(t => (
						<button key={t.id} onClick={() => setTab(t.id)}
							className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${tab === t.id ? "bg-white dark:bg-[#1c1c22] text-[#1d1d1f] dark:text-white shadow-sm" : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"}`}>
							<span>{t.icon}</span>
							{t.label}
						</button>
					))}
				</div>

				{/* Content */}
				<div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-6">
					{tab === "perfil" && <PerfilTab />}
					{tab === "seguridad" && <SeguridadTab />}
					{tab === "preferencias" && <PreferenciasTab />}
				</div>
			</div>
		</DefaultLayout>
	);
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<div>
			<label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] block mb-1.5">{label}</label>
			{children}
		</div>
	);
}

const inputCls = "w-full px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/[0.03] dark:bg-white/[0.05] text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all";

function SaveBtn({ saved, onClick }: { saved: boolean; onClick: () => void }) {
	return (
		<button onClick={onClick}
			className={`flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-xl transition-all ${saved ? "bg-emerald-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}>
			{saved ? <>✓ Guardado</> : "Guardar cambios"}
		</button>
	);
}

function PerfilTab() {
	const { user } = useAuth();
	const displayName = user?.profile?.full_name ?? user?.email ?? "";
	const initials = displayName.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();

	const [name, setName] = useState(user?.profile?.full_name ?? "");
	const [bio, setBio] = useState("");
	const [website, setWebsite] = useState("");
	const [saved, setSaved] = useState(false);

	function save() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-base font-bold text-[#1d1d1f] dark:text-white mb-1">Información de perfil</h2>
				<p className="text-xs text-[#6e6e73] dark:text-[#86868b]">Personaliza cómo apareces en la plataforma</p>
			</div>

			{/* Avatar */}
			<div className="flex items-center gap-4">
				<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold overflow-hidden flex-shrink-0">
					{user?.profile?.avatar_url
						? <img src={user.profile.avatar_url} alt="" className="w-full h-full object-cover" />
						: initials
					}
				</div>
				<div>
					<button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Cambiar foto</button>
					<p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-0.5">JPG, PNG o GIF · Máx 2 MB</p>
				</div>
			</div>

			<div className="space-y-4">
				<Field label="Nombre completo">
					<input value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre" className={inputCls} />
				</Field>

				<Field label="Email">
					<input value={user?.email ?? ""} disabled
						className="w-full px-3 py-2 rounded-xl border border-black/8 dark:border-white/8 bg-black/[0.03] dark:bg-white/[0.03] text-sm text-[#aeaeb2] dark:text-[#636366] cursor-not-allowed" />
					<p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-1">El email no se puede cambiar desde aquí</p>
				</Field>

				<Field label="Bio">
					<textarea value={bio} onChange={e => setBio(e.target.value)} rows={3}
						placeholder="Cuéntanos algo sobre ti..."
						className={`${inputCls} resize-none`} />
				</Field>

				<Field label="Sitio web">
					<input value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://tuportfolio.com" type="url" className={inputCls} />
				</Field>
			</div>

			<SaveBtn saved={saved} onClick={save} />
		</div>
	);
}

function SeguridadTab() {
	const [current, setCurrent] = useState("");
	const [newPwd, setNewPwd] = useState("");
	const [confirm, setConfirm] = useState("");
	const [msg, setMsg] = useState("");

	function changePassword() {
		if (!current || !newPwd || !confirm) return setMsg("Rellena todos los campos");
		if (newPwd !== confirm) return setMsg("Las contraseñas no coinciden");
		if (newPwd.length < 8) return setMsg("Mínimo 8 caracteres");
		setMsg("Contraseña actualizada ✓");
		setCurrent(""); setNewPwd(""); setConfirm("");
		setTimeout(() => setMsg(""), 3000);
	}

	const SESSIONS = [
		{ device: "Chrome en macOS", location: "Madrid, España", current: true, date: "Ahora" },
		{ device: "Safari en iPhone", location: "Madrid, España", current: false, date: "hace 2h" },
		{ device: "Firefox en Windows", location: "Barcelona, España", current: false, date: "hace 3d" },
	];

	return (
		<div className="space-y-8">
			<div>
				<h2 className="text-base font-bold text-[#1d1d1f] dark:text-white mb-1">Cambiar contraseña</h2>
				<p className="text-xs text-[#6e6e73] dark:text-[#86868b] mb-5">Usa una contraseña segura de al menos 8 caracteres</p>

				<div className="space-y-3">
					{[
						{ label: "Contraseña actual", val: current, set: setCurrent },
						{ label: "Nueva contraseña",  val: newPwd,  set: setNewPwd },
						{ label: "Confirmar nueva",   val: confirm, set: setConfirm },
					].map(f => (
						<Field key={f.label} label={f.label}>
							<input type="password" value={f.val} onChange={e => f.set(e.target.value)} className={inputCls} />
						</Field>
					))}
				</div>

				{msg && (
					<p className={`text-xs mt-2 ${msg.includes("✓") ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>{msg}</p>
				)}

				<button onClick={changePassword}
					className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors">
					Actualizar contraseña
				</button>
			</div>

			<div>
				<h2 className="text-base font-bold text-[#1d1d1f] dark:text-white mb-1">Sesiones activas</h2>
				<p className="text-xs text-[#6e6e73] dark:text-[#86868b] mb-4">Dispositivos donde has iniciado sesión</p>
				<div className="rounded-xl border border-black/8 dark:border-white/8 divide-y divide-black/5 dark:divide-white/5">
					{SESSIONS.map((s, i) => (
						<div key={i} className="flex items-center gap-4 px-4 py-3">
							<div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center flex-shrink-0">
								<svg className="w-4 h-4 text-[#6e6e73]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<rect x="2" y="4" width="20" height="14" rx="2" strokeWidth="1.5" />
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 20h8M12 18v2" />
								</svg>
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2">
									<p className="text-sm font-medium text-[#1d1d1f] dark:text-white">{s.device}</p>
									{s.current && <span className="px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold">actual</span>}
								</div>
								<p className="text-xs text-[#aeaeb2] dark:text-[#636366]">{s.location} · {s.date}</p>
							</div>
							{!s.current && <button className="text-xs text-red-500 hover:underline">Cerrar</button>}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

function PreferenciasTab() {
	const router = useRouter();
	const [emailNotifs, setEmailNotifs] = useState(true);
	const [blogUpdates, setBlogUpdates] = useState(false);
	const [saved, setSaved] = useState(false);

	function save() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

	const Toggle = ({ val, set, label, desc }: { val: boolean; set: (v: boolean) => void; label: string; desc: string }) => (
		<div className="flex items-start justify-between gap-4 py-3 border-b border-black/6 dark:border-white/6 last:border-0">
			<div>
				<p className="text-sm font-medium text-[#1d1d1f] dark:text-white">{label}</p>
				<p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5">{desc}</p>
			</div>
			<button onClick={() => set(!val)}
				className={`w-10 h-6 rounded-full transition-colors flex-shrink-0 relative ${val ? "bg-blue-600" : "bg-black/15 dark:bg-white/15"}`}>
				<span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${val ? "translate-x-4" : "translate-x-0.5"}`} />
			</button>
		</div>
	);

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-base font-bold text-[#1d1d1f] dark:text-white mb-1">Preferencias</h2>
				<p className="text-xs text-[#6e6e73] dark:text-[#86868b]">Configura el comportamiento de la plataforma</p>
			</div>

			<div>
				<p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider mb-2">Notificaciones</p>
				<div className="rounded-xl border border-black/8 dark:border-white/8 px-4">
					<Toggle val={emailNotifs} set={setEmailNotifs} label="Notificaciones por email" desc="Recibe alertas importantes en tu correo" />
					<Toggle val={blogUpdates} set={setBlogUpdates} label="Actualizaciones del blog" desc="Aviso cuando se publica nuevo contenido" />
				</div>
			</div>

			<div>
				<p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider mb-2">Cuenta</p>
				<div className="rounded-xl border border-red-200 dark:border-red-800/40 bg-red-50/50 dark:bg-red-950/10 p-4 space-y-3">
					<div>
						<p className="text-sm font-semibold text-red-700 dark:text-red-400">Zona de peligro</p>
						<p className="text-xs text-red-600/80 dark:text-red-400/70 mt-0.5">Estas acciones son irreversibles</p>
					</div>
					<button className="text-xs font-semibold text-red-600 dark:text-red-400 px-3 py-1.5 rounded-lg border border-red-300 dark:border-red-700/50 hover:bg-red-100 dark:hover:bg-red-950/30 transition-colors">
						Eliminar mi cuenta
					</button>
				</div>
			</div>

			<SaveBtn saved={saved} onClick={save} />
		</div>
	);
}
