"use client";
import { useState } from "react";

type SectionId = "intro" | "tipos" | "funciones" | "interfaces" | "generics" | "utilidades" | "ejercicios";

interface SectionDef { id: SectionId; label: string; }
const SECTIONS: SectionDef[] = [
  { id: "intro",      label: "1. Introducción" },
  { id: "tipos",      label: "2. Tipos básicos" },
  { id: "funciones",  label: "3. Funciones" },
  { id: "interfaces", label: "4. Interfaces y Types" },
  { id: "generics",   label: "5. Genéricos" },
  { id: "utilidades", label: "6. Utility Types" },
  { id: "ejercicios", label: "Ejercicios" },
];

function Code({ children }: { children: string }) {
  return (
    <pre className="bg-[#0d1117] rounded-xl p-4 overflow-x-auto text-xs leading-relaxed my-4">
      <code className="text-[#e6edf3]">{children.trim()}</code>
    </pre>
  );
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white mt-10 mb-3 first:mt-0">{children}</h2>;
}
function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-semibold text-[#1d1d1f] dark:text-white mt-6 mb-2">{children}</h3>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed text-[#3a3a3c] dark:text-[#aeaeb2] mb-3">{children}</p>;
}
function Callout({ type, children }: { type: "tip" | "warn"; children: React.ReactNode }) {
  const styles = { tip: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300", warn: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300" };
  const icons = { tip: "💡", warn: "⚠️" };
  return <div className={`border rounded-xl px-4 py-3 my-4 text-sm ${styles[type]}`}><span className="mr-1.5">{icons[type]}</span>{children}</div>;
}

function ExerciseCard({ num, title, level, description, hint, solution }: {
  num: number; title: string; level: "Básico" | "Intermedio" | "Avanzado";
  description: string; hint?: string; solution?: string;
}) {
  const [open, setOpen] = useState(false);
  const levelColor = { Básico: "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400", Intermedio: "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400", Avanzado: "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400" }[level];
  return (
    <div className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full px-4 py-3 flex items-center justify-between gap-3 hover:bg-black/3 dark:hover:bg-white/3 transition-colors text-left">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">{num}</span>
          <span className="text-sm font-medium text-[#1d1d1f] dark:text-white">{title}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor}`}>{level}</span>
          <span className="text-[#aeaeb2] text-xs">{open ? "▲" : "▼"}</span>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-black/8 dark:border-white/8 pt-3 space-y-3">
          <p className="text-sm text-[#3a3a3c] dark:text-[#aeaeb2]">{description}</p>
          {hint && <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl px-3 py-2 text-xs text-blue-800 dark:text-blue-300"><strong>Pista:</strong> {hint}</div>}
          {solution && <Code>{solution}</Code>}
        </div>
      )}
    </div>
  );
}

function SectionIntro() {
  return (
    <>
      <H2>Introducción a TypeScript</H2>
      <P>TypeScript es un superconjunto de JavaScript desarrollado por Microsoft que añade <strong>tipado estático opcional</strong>. Al compilarse, genera código JavaScript estándar que puede ejecutarse en cualquier entorno.</P>
      <P>La clave está en el tipado estático: puedes declarar el tipo de cada variable, parámetro de función y valor de retorno, y el compilador te avisará de errores <em>antes</em> de ejecutar el código.</P>
      <Code>{`// JavaScript (sin tipos)
function sumar(a, b) { return a + b; }
sumar("hola", 5); // "hola5" — bug silencioso!

// TypeScript (con tipos)
function sumar(a: number, b: number): number { return a + b; }
sumar("hola", 5); // Error: Argument of type 'string' is not assignable to 'number'`}</Code>
      <H3>¿Por qué usarlo?</H3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {[
          { icon: "🐛", title: "Menos bugs en runtime", desc: "Detecta errores antes de ejecutar el código." },
          { icon: "🔍", title: "Mejor autocompletado", desc: "Tu editor entiende el código y sugiere con precisión." },
          { icon: "♻️", title: "Refactoring seguro", desc: "Cambia nombres y estructuras con confianza." },
          { icon: "📄", title: "Documentación implícita", desc: "Los tipos documentan el código por sí solos." },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
            <p className="font-semibold text-blue-900 dark:text-blue-200 text-xs mb-1">{item.icon} {item.title}</p>
            <p className="text-xs text-blue-700 dark:text-blue-400">{item.desc}</p>
          </div>
        ))}
      </div>
      <H3>Configuración</H3>
      <Code>{`# Instalar TypeScript
npm install -D typescript
npx tsc --init  # genera tsconfig.json

# tsconfig.json mínimo recomendado
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,        // activa todas las comprobaciones estrictas
    "outDir": "./dist",
    "rootDir": "./src"
  }
}`}</Code>
      <Callout type="tip">Activa <code>strict: true</code> desde el principio. Es más fácil que añadirlo después cuando ya tienes mucho código.</Callout>
    </>
  );
}

function SectionTipos() {
  return (
    <>
      <H2>Tipos básicos</H2>
      <P>TypeScript tiene tipos para todos los valores primitivos de JavaScript más algunos específicos del lenguaje.</P>
      <Code>{`// Primitivos
let nombre: string = "Ana";
let edad: number = 28;
let activo: boolean = true;
let nulo: null = null;
let indefinido: undefined = undefined;

// Arrays — dos formas equivalentes
let numeros: number[] = [1, 2, 3];
let palabras: Array<string> = ["hola", "mundo"];

// Tuplas — array de longitud y tipos fijos
let punto: [number, number] = [10, 20];
let entrada: [string, number] = ["edad", 28];

// Enum
enum Direccion { Norte, Sur, Este, Oeste }
let rumbo: Direccion = Direccion.Norte;

// Any y Unknown
let cualquier: any = 42;        // deshabilita el tipado — evitar
let desconocido: unknown = 42;  // seguro: hay que hacer type guard antes de usar`}</Code>
      <H3>Union Types y Literal Types</H3>
      <Code>{`// Union: acepta varios tipos
let id: string | number = "abc123";
id = 42; // también válido

// Literal types: solo ciertos valores exactos
type Direccion = "izquierda" | "derecha" | "arriba" | "abajo";
let movimiento: Direccion = "izquierda";
// movimiento = "diagonal"; // Error!

// Narrowing — reducir el tipo dentro de un bloque
function procesar(valor: string | number) {
  if (typeof valor === "string") {
    return valor.toUpperCase(); // aquí TypeScript sabe que es string
  }
  return valor.toFixed(2); // aquí sabe que es number
}`}</Code>
      <Callout type="warn">Evita usar <code>any</code> — elimina todas las ventajas del tipado. Si no sabes el tipo, usa <code>unknown</code> y haz un type guard.</Callout>
    </>
  );
}

function SectionFunciones() {
  return (
    <>
      <H2>Funciones tipadas</H2>
      <P>Tipar los parámetros y el valor de retorno de las funciones es donde TypeScript aporta más valor, ya que captura errores en el sitio de la llamada.</P>
      <Code>{`// Función normal
function saludar(nombre: string): string {
  return \`Hola, \${nombre}!\`;
}

// Arrow function
const multiplicar = (a: number, b: number): number => a * b;

// Parámetros opcionales y con valor por defecto
function crear(nombre: string, edad?: number, rol: string = "user") {
  return { nombre, edad: edad ?? 0, rol };
}

// Parámetros rest
function sumarTodos(...numeros: number[]): number {
  return numeros.reduce((acc, n) => acc + n, 0);
}

// Función como tipo
type Callback = (error: Error | null, resultado: string) => void;
function ejecutar(cb: Callback) {
  cb(null, "éxito");
}`}</Code>
      <H3>Overloads</H3>
      <Code>{`// Sobrecargas: misma función, distintas firmas
function procesar(x: string): string;
function procesar(x: number): number;
function procesar(x: string | number): string | number {
  if (typeof x === "string") return x.toUpperCase();
  return x * 2;
}

const a = procesar("hola"); // string
const b = procesar(5);      // number`}</Code>
    </>
  );
}

function SectionInterfaces() {
  return (
    <>
      <H2>Interfaces y Type Aliases</H2>
      <P>Ambas permiten definir la forma de un objeto, pero tienen diferencias clave en su comportamiento.</P>
      <Code>{`// Interface — extensible con declaration merging
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  readonly creadoEn: Date;  // solo lectura
  telefono?: string;        // opcional
}

// Extender interfaces
interface Admin extends Usuario {
  rol: "superadmin" | "moderador";
  permisos: string[];
}

// Type alias — más flexible, soporta primitivos y uniones
type ID = string | number;
type Resultado<T> = { datos: T; error: null } | { datos: null; error: string };

// Intersección de tipos
type UsuarioAdmin = Usuario & { permisos: string[] };`}</Code>
      <H3>¿Interface o Type?</H3>
      <div className="grid grid-cols-2 gap-3 my-4">
        {[
          { label: "Interface", items: ["Objetos y clases", "Declaration merging", "Más legible para APIs"] },
          { label: "Type", items: ["Uniones y primitivos", "Mapped types", "Más flexible"] },
        ].map((col, i) => (
          <div key={i} className="p-3 rounded-xl bg-black/3 dark:bg-white/3 border border-black/8 dark:border-white/8">
            <p className="text-xs font-bold text-[#1d1d1f] dark:text-white mb-2">{col.label}</p>
            {col.items.map(item => <p key={item} className="text-xs text-[#6e6e73] dark:text-[#86868b]">• {item}</p>)}
          </div>
        ))}
      </div>
      <Callout type="tip">Regla práctica: usa <code>interface</code> para objetos públicos de una librería o API y <code>type</code> para todo lo demás.</Callout>
    </>
  );
}

function SectionGenerics() {
  return (
    <>
      <H2>Genéricos</H2>
      <P>Los genéricos permiten crear funciones, clases e interfaces que trabajan con <strong>cualquier tipo</strong>, manteniendo la seguridad del tipado.</P>
      <Code>{`// Función genérica básica
function identidad<T>(valor: T): T { return valor; }

const num = identidad(42);        // T inferred como number
const str = identidad("hola");    // T inferred como string

// Con constraints — T debe tener length
function masDeLargo<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}
masDeLargo("hola", "mundo");     // válido
masDeLargo([1, 2], [3]);         // válido
// masDeLargo(1, 2);              // Error: number no tiene length

// Genérico con múltiples parámetros
function mapObj<K extends string, V, R>(
  obj: Record<K, V>,
  fn: (v: V) => R
): Record<K, R> {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, fn(v as V)])
  ) as Record<K, R>;
}

// Respuesta de API genérica — patrón muy común
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const res = await fetch(url);
  const data = await res.json() as T;
  return { data, status: res.status, message: "ok" };
}`}</Code>
    </>
  );
}

function SectionUtilidades() {
  return (
    <>
      <H2>Utility Types</H2>
      <P>TypeScript incluye tipos de utilidad predefinidos que transforman tipos existentes de formas muy comunes.</P>
      <Code>{`interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
}

// Partial<T> — todos los campos opcionales (útil para updates)
type UsuarioUpdate = Partial<Usuario>;
// { id?: number; nombre?: string; email?: string; password?: string }

// Required<T> — todos los campos obligatorios
type UsuarioCompleto = Required<Partial<Usuario>>;

// Pick<T, K> — seleccionar solo algunos campos
type UsuarioPublico = Pick<Usuario, "id" | "nombre" | "email">;

// Omit<T, K> — excluir campos
type UsuarioSinPassword = Omit<Usuario, "password">;

// Readonly<T> — campos inmutables
type UsuarioReadonly = Readonly<Usuario>;

// Record<K, V> — objeto con claves y valores tipados
type RolesUsuario = Record<string, "admin" | "user" | "moderador">;

// ReturnType<T> — tipo de retorno de una función
function getUsuario() { return { id: 1, nombre: "Ana" }; }
type TipoUsuario = ReturnType<typeof getUsuario>; // { id: number; nombre: string }

// Parameters<T> — tipos de los parámetros de una función
function login(email: string, password: string): boolean { return true; }
type ParamsLogin = Parameters<typeof login>; // [string, string]`}</Code>
      <Callout type="tip">Los Utility Types son la clave para no repetir definiciones. Si te encuentras copiando interfaces, probablemente hay un Utility Type que lo resuelve.</Callout>
    </>
  );
}

function SEjercicios() {
  return (
    <>
      <H2>Ejercicios de TypeScript</H2>
      <P>Practica el sistema de tipos de TypeScript con estos ejercicios. El compilador es tu mejor aliado para verificar que tus soluciones son correctas.</P>
      <div className="space-y-3 mt-6">
        <ExerciseCard num={1} title="Interfaz de Producto con validación" level="Básico"
          description="Define una interfaz Producto con campos id (number), nombre (string), precio (number positivo), stock (number entero) y categoria (literal union: 'electronica' | 'ropa' | 'hogar'). Crea una función validarProducto() que compruebe que el precio y stock son válidos."
          hint="Los tipos en TypeScript no validan en runtime — la función de validación debe hacer eso manualmente con if/throw."
          solution={`interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  categoria: "electronica" | "ropa" | "hogar";
}

function validarProducto(p: Producto): void {
  if (p.precio <= 0) throw new Error("El precio debe ser mayor que 0");
  if (!Number.isInteger(p.stock) || p.stock < 0) throw new Error("Stock inválido");
}

const laptop: Producto = {
  id: 1,
  nombre: "Laptop Pro",
  precio: 999.99,
  stock: 5,
  categoria: "electronica",
};

validarProducto(laptop); // ok
// validarProducto({ ...laptop, precio: -10 }); // Error!`} />

        <ExerciseCard num={2} title="Función genérica groupBy" level="Básico"
          description="Implementa una función genérica groupBy<T>(array: T[], key: keyof T) que agrupe los elementos de un array por el valor de una propiedad dada."
          hint="El tipo de retorno es Record<string, T[]>. Usa keyof T para garantizar que la clave existe en el tipo."
          solution={`function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((grupos, item) => {
    const valor = String(item[key]);
    if (!grupos[valor]) grupos[valor] = [];
    grupos[valor].push(item);
    return grupos;
  }, {} as Record<string, T[]>);
}

const usuarios = [
  { nombre: "Ana", rol: "admin" },
  { nombre: "Luis", rol: "user" },
  { nombre: "Sara", rol: "admin" },
];

const porRol = groupBy(usuarios, "rol");
// { admin: [Ana, Sara], user: [Luis] }`} />

        <ExerciseCard num={3} title="Clase Stack genérica tipada" level="Intermedio"
          description="Implementa una clase Stack<T> genérica con métodos push(item: T), pop(): T, peek(): T, isEmpty(): boolean y size: number (getter). Lanza un TypeError descriptivo si se hace pop/peek en una pila vacía."
          hint="El array interno debe ser de tipo T[]. Usa get size() para el getter."
          solution={`class Stack<T> {
  private datos: T[] = [];

  push(item: T): void {
    this.datos.push(item);
  }

  pop(): T {
    if (this.isEmpty()) throw new TypeError("Pop en pila vacía");
    return this.datos.pop()!;
  }

  peek(): T {
    if (this.isEmpty()) throw new TypeError("Peek en pila vacía");
    return this.datos[this.datos.length - 1];
  }

  isEmpty(): boolean {
    return this.datos.length === 0;
  }

  get size(): number {
    return this.datos.length;
  }
}

const pilaNum = new Stack<number>();
pilaNum.push(1);
pilaNum.push(2);
console.log(pilaNum.peek());  // 2
console.log(pilaNum.pop());   // 2
console.log(pilaNum.size);    // 1`} />

        <ExerciseCard num={4} title="Deep Readonly con tipos recursivos" level="Intermedio"
          description="Implementa un tipo utilitario DeepReadonly<T> que haga todos los campos de un objeto recursivamente readonly, incluyendo objetos anidados y arrays."
          hint="Usa conditional types con infer para diferenciar arrays, objetos y primitivos. Para arrays usa readonly T[]."
          solution={`type DeepReadonly<T> =
  T extends (infer U)[]
    ? ReadonlyArray<DeepReadonly<U>>
    : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

interface Config {
  servidor: {
    host: string;
    puerto: number;
    ssl: boolean;
  };
  base_datos: {
    url: string;
    nombre: string;
  };
  permisos: string[];
}

type ConfigInmutable = DeepReadonly<Config>;

const config: ConfigInmutable = {
  servidor: { host: "localhost", puerto: 3000, ssl: true },
  base_datos: { url: "postgres://...", nombre: "mydb" },
  permisos: ["read", "write"],
};

// config.servidor.puerto = 8080; // Error: readonly!
// config.permisos.push("admin"); // Error: ReadonlyArray!`} />

        <ExerciseCard num={5} title="Builder pattern tipado" level="Avanzado"
          description="Implementa un QueryBuilder<T> que construya queries de forma fluida y tipada. Métodos: select(fields: (keyof T)[]), where(field: keyof T, value: T[keyof T]), limit(n: number), build(): string."
          hint="Cada método devuelve this para permitir el encadenamiento. Almacena el estado internamente en propiedades privadas."
          solution={`class QueryBuilder<T extends Record<string, unknown>> {
  private campos: string[] = [];
  private condiciones: string[] = [];
  private limitNum: number | null = null;
  private tabla: string;

  constructor(tabla: string) {
    this.tabla = tabla;
  }

  select(fields: (keyof T)[]): this {
    this.campos = fields as string[];
    return this;
  }

  where(field: keyof T, value: T[keyof T]): this {
    const val = typeof value === "string" ? \`'\${value}'\` : String(value);
    this.condiciones.push(\`\${String(field)} = \${val}\`);
    return this;
  }

  limit(n: number): this {
    this.limitNum = n;
    return this;
  }

  build(): string {
    const campos = this.campos.length ? this.campos.join(", ") : "*";
    let query = \`SELECT \${campos} FROM \${this.tabla}\`;
    if (this.condiciones.length) {
      query += \` WHERE \${this.condiciones.join(" AND ")}\`;
    }
    if (this.limitNum !== null) {
      query += \` LIMIT \${this.limitNum}\`;
    }
    return query;
  }
}

interface Usuario { id: number; nombre: string; email: string; activo: boolean; }

const query = new QueryBuilder<Usuario>("usuarios")
  .select(["id", "nombre", "email"])
  .where("activo", true)
  .limit(10)
  .build();

// SELECT id, nombre, email FROM usuarios WHERE activo = true LIMIT 10
console.log(query);`} />
      </div>
    </>
  );
}

export default function TypeScriptContent() {
  const [active, setActive] = useState<SectionId>(SECTIONS[0].id);

  const renderSection = () => {
    switch (active) {
      case "intro":      return <SectionIntro />;
      case "tipos":      return <SectionTipos />;
      case "funciones":  return <SectionFunciones />;
      case "interfaces": return <SectionInterfaces />;
      case "generics":   return <SectionGenerics />;
      case "utilidades": return <SectionUtilidades />;
      case "ejercicios": return <SEjercicios />;
    }
  };

  return (
    <div className="flex gap-6">
      <nav className="hidden lg:flex flex-col gap-0.5 w-44 flex-shrink-0 sticky top-20 self-start">
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)}
            className={`text-left text-xs px-3 py-1.5 rounded-lg transition-colors ${active === s.id ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-semibold" : "text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"}`}>
            {s.label}
          </button>
        ))}
      </nav>
      <div className="flex-1 min-w-0">
        {renderSection()}
      </div>
    </div>
  );
}
