export default function TypeScriptContent() {
	return (
		<article className="max-w-3xl">
			{/* Header */}
			<div className="space-y-3 mb-10">
				<div className="flex items-center gap-2">
					<span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
						TypeScript
					</span>
					<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">10 min de lectura</span>
					<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">·</span>
					<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">21 jun 2026</span>
				</div>
				<h1 className="text-4xl font-bold text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>
					Introducción a TypeScript
				</h1>
				<p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
					Aprende los conceptos fundamentales de TypeScript y cómo puede transformar la calidad de tu código JavaScript.
				</p>
			</div>

			{/* Content */}
			<div className="space-y-8 text-sm text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed">
				{/* What is TS */}
				<section className="space-y-3">
					<h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white">¿Qué es TypeScript?</h2>
					<p>
						TypeScript es un superconjunto de JavaScript desarrollado por Microsoft que añade tipado estático opcional. Al compilarse, genera código JavaScript estándar que puede ejecutarse en cualquier entorno.
					</p>
					<p>
						La clave está en el tipado estático: puedes declarar el tipo de cada variable, parámetro de función y valor de retorno, y el compilador te avisará de errores <em>antes</em> de ejecutar el código.
					</p>
				</section>

				{/* Types */}
				<section className="space-y-4">
					<h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white">Tipos básicos</h2>
					<div className="rounded-xl overflow-hidden border border-black/8 dark:border-white/8">
						<div className="px-4 py-2 bg-black/4 dark:bg-white/4 border-b border-black/8 dark:border-white/8 flex items-center gap-2">
							<span className="text-xs font-mono text-[#6e6e73] dark:text-[#86868b]">tipos-basicos.ts</span>
						</div>
						<pre className="p-4 text-xs font-mono text-[#1d1d1f] dark:text-[#e0e0e5] overflow-x-auto bg-white dark:bg-[#0d0d12]">
{`// Tipos primitivos
let nombre: string = "Adrián";
let edad: number = 24;
let activo: boolean = true;

// Arrays
let tecnologias: string[] = ["React", "Node.js", "TypeScript"];

// Objeto tipado con interface
interface Usuario {
  nombre: string;
  edad: number;
  email: string;
}

const usuario: Usuario = {
  nombre: "Adrián",
  edad: 24,
  email: "adrian@ejemplo.com",
};`}
						</pre>
					</div>
				</section>

				{/* Functions */}
				<section className="space-y-4">
					<h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white">Funciones tipadas</h2>
					<p>
						Tipar los parámetros y el retorno de funciones es donde TypeScript brilla: evita pasar argumentos incorrectos y documenta el comportamiento esperado.
					</p>
					<div className="rounded-xl overflow-hidden border border-black/8 dark:border-white/8">
						<div className="px-4 py-2 bg-black/4 dark:bg-white/4 border-b border-black/8 dark:border-white/8">
							<span className="text-xs font-mono text-[#6e6e73] dark:text-[#86868b]">funciones.ts</span>
						</div>
						<pre className="p-4 text-xs font-mono text-[#1d1d1f] dark:text-[#e0e0e5] overflow-x-auto bg-white dark:bg-[#0d0d12]">
{`// Función con tipos explícitos
function sumar(a: number, b: number): number {
  return a + b;
}

// Arrow function
const saludar = (nombre: string): string => {
  return \`Hola, \${nombre}!\`;
};

// Parámetros opcionales con ?
function crearUsuario(nombre: string, email?: string) {
  return { nombre, email: email ?? "sin email" };
}`}
						</pre>
					</div>
				</section>

				{/* Generics */}
				<section className="space-y-4">
					<h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white">Genéricos</h2>
					<p>
						Los genéricos permiten crear funciones y componentes que funcionan con cualquier tipo, manteniendo la seguridad del tipado.
					</p>
					<div className="rounded-xl overflow-hidden border border-black/8 dark:border-white/8">
						<div className="px-4 py-2 bg-black/4 dark:bg-white/4 border-b border-black/8 dark:border-white/8">
							<span className="text-xs font-mono text-[#6e6e73] dark:text-[#86868b]">generics.ts</span>
						</div>
						<pre className="p-4 text-xs font-mono text-[#1d1d1f] dark:text-[#e0e0e5] overflow-x-auto bg-white dark:bg-[#0d0d12]">
{`// Función genérica
function primerElemento<T>(array: T[]): T | undefined {
  return array[0];
}

const primerNum = primerElemento([1, 2, 3]);    // number
const primerStr = primerElemento(["a", "b"]);   // string

// Respuesta de API genérica
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}`}
						</pre>
					</div>
				</section>

				{/* Why TS */}
				<section className="space-y-4">
					<h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white">¿Por qué usar TypeScript?</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						{[
							{ title: "Menos errores en runtime", desc: "Detecta errores antes de ejecutar el código." },
							{ title: "Mejor autocompletado", desc: "Tu editor entiende el código y sugiere con precisión." },
							{ title: "Refactoring seguro", desc: "Cambia nombres y estructuras con confianza." },
							{ title: "Documentación implícita", desc: "Los tipos documentan el código por sí solos." },
						].map((item, i) => (
							<div key={i} className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
								<p className="font-semibold text-blue-900 dark:text-blue-200 text-xs mb-1">{item.title}</p>
								<p className="text-xs text-blue-700 dark:text-blue-400">{item.desc}</p>
							</div>
						))}
					</div>
				</section>
			</div>
		</article>
	);
}
