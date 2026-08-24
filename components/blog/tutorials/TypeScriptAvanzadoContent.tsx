"use client";
import { useState } from "react";

import {
  BlogH2,
  BlogH3,
  BlogP,
  BlogCode,
  BlogInlineCode,
  BlogCallout,
  BlogUl,
  BlogLi,
} from "@/components/blog/shared";

function ExerciseCard({
  num,
  title,
  level,
  description,
  hint,
  solution,
}: {
  num: number;
  title: string;
  level: "Básico" | "Intermedio" | "Avanzado";
  description: string;
  hint?: string;
  solution?: string;
}) {
  const [open, setOpen] = useState(false);
  const levelColor = {
    Básico:
      "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
    Intermedio:
      "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
    Avanzado: "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
  }[level];

  return (
    <div className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden">
      <button
        className="w-full px-4 py-3 flex items-center justify-between gap-3 hover:bg-black/3 dark:hover:bg-white/3 transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
            {num}
          </span>
          <span className="text-sm font-medium text-[#1d1d1f] dark:text-white">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor}`}
          >
            {level}
          </span>
          <span className="text-[#aeaeb2] text-xs">{open ? "▲" : "▼"}</span>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-black/8 dark:border-white/8 pt-3 space-y-3">
          <p className="text-sm text-[#3a3a3c] dark:text-[#aeaeb2]">
            {description}
          </p>
          {hint && (
            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl px-3 py-2 text-xs text-blue-800 dark:text-blue-300">
              <strong>Pista:</strong> {hint}
            </div>
          )}
          {solution && <BlogCode>{solution}</BlogCode>}
        </div>
      )}
    </div>
  );
}

export default function TypeScriptAvanzadoContent() {
  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 text-xs text-[#aeaeb2] dark:text-[#636366] mb-4">
        <span className="flex items-center gap-1">
          <svg
            aria-hidden="true"
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          Tutorial
        </span>
        <span className="w-1 h-1 rounded-full bg-[#aeaeb2]" />
        <span className="flex items-center gap-1">
          <svg
            aria-hidden="true"
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          55 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        TypeScript avanzado: tipos, generics y utilidades
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        TypeScript no es solo "JavaScript con tipos": su sistema de tipos es un
        lenguaje en sí mismo, capaz de modelar uniones, inferir resultados y
        transformar tipos. Este tutorial profundiza en narrowing, uniones
        discriminadas, generics avanzados, utility types, mapped types y cómo
        aplicar todo esto al tipado de componentes React. Prerequisito
        conceptual: TypeScript básico (interfaces y tipos simples).
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="narrowing">Narrowing y type guards</BlogH2>

      <BlogP>
        El <strong>narrowing</strong> es el proceso por el que TypeScript reduce
        el tipo de una variable dentro de un bloque, en función de las
        condiciones de control de flujo. Los guardas básicos:{" "}
        <BlogInlineCode>typeof</BlogInlineCode>,{" "}
        <BlogInlineCode>in</BlogInlineCode> e{" "}
        <BlogInlineCode>instanceof</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`function procesarValor(valor: string | number | Date) {
  // typeof: reduce tipos primitivos
  if (typeof valor === "string") {
    return valor.toUpperCase();
  }

  // instanceof: reduce instancias de clases
  if (valor instanceof Date) {
    return valor.toISOString();
  }

  // tras los guardas, TS sabe que queda number
  return valor.toFixed(2);
}

function obtenerNombre(entidad: Usuario | Empresa) {
  // in: reduce objetos por su propiedad distintiva
  if ("email" in entidad) {
    return entidad.email;
  }
  return entidad.cif;
}`}</BlogCode>

      <BlogCallout type="tip">
        Con objetos, prefiere <BlogInlineCode>in</BlogInlineCode> o una
        propiedad discriminante antes que{" "}
        <BlogInlineCode>instanceof</BlogInlineCode> (que falla con objetos
        creados como literales o provenientes de JSON).
      </BlogCallout>

      <BlogH3 id="predicados">Predicados de tipo (is)</BlogH3>

      <BlogP>
        Cuando un guarda es complejo, se extrae a una función con un{" "}
        <strong>type predicate</strong>: el operador{" "}
        <BlogInlineCode>is</BlogInlineCode> le dice a TypeScript qué tipo tiene
        el valor cuando la función devuelve{" "}
        <BlogInlineCode>true</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`type Producto = { id: number; nombre: string; precio: number };
type Oferta = Producto & { descuento: number };

function esOferta(item: Producto): item is Oferta {
  return "descuento" in item;
}

const items: Producto[] = obtenerItems();

// Dentro del filter, TS ya sabe que 'oferta' es Oferta
const ofertas = items.filter(esOferta);
ofertas.forEach((oferta) => {
  console.log(oferta.descuento); // sin error de tipo
});`}</BlogCode>

      <BlogCallout type="warn">
        Un type predicate promete a TypeScript lo que tu lógica debe cumplir: si
        el cuerpo de la función está mal, los errores se propagan a todo el que
        use el predicado. Escríbelo correcto la primera vez — no hay compilador
        que valide la promesa en sí.
      </BlogCallout>

      <BlogP>
        El narrowing también funciona en uniones con literales: comparar un
        valor contra un literal concreto reduce el resto de la unión:
      </BlogP>

      <BlogCode>{`type Estado = "cargando" | "exito" | "error";

function mostrar(estado: Estado) {
  if (estado === "cargando") {
    return <Spinner />;
  }
  if (estado === "error") {
    return <ErrorBanner />;
  }
  // aquí TS infiere que estado es "exito"
  return <Resultado />;
}`}</BlogCode>

      <BlogH2 id="uniones-discriminadas">
        Uniones discriminadas y exhaustiveness
      </BlogH2>

      <BlogP>
        Una <strong>unión discriminada</strong> usa un campo literal común (el
        discriminante) para distinguir cada variante. Es la forma estándar de
        modelar datos que pueden tener varias formas:
      </BlogP>

      <BlogCode>{`type Evento =
  | { tipo: "click"; x: number; y: number }
  | { tipo: "tecla"; codigo: string }
  | { tipo: "scroll"; posicion: number };

function manejarEvento(evento: Evento) {
  switch (evento.tipo) {
    case "click":
      console.log(evento.x, evento.y); // TS conoce x, y
      break;
    case "tecla":
      console.log(evento.codigo); // TS conoce codigo
      break;
    case "scroll":
      console.log(evento.posicion); // TS conoce posicion
      break;
  }
}`}</BlogCode>

      <BlogP>
        El <strong>exhaustiveness checking</strong> con el tipo{" "}
        <BlogInlineCode>never</BlogInlineCode> garantiza que si mañana añades
        una variante nueva, el compilador te obligue a tratarla. En el{" "}
        <BlogInlineCode>default</BlogInlineCode> del switch, el valor debe ser{" "}
        <BlogInlineCode>never</BlogInlineCode>; si no lo es, algo quedó sin
        cubrir:
      </BlogP>

      <BlogCode>{`function manejarEvento(evento: Evento) {
  switch (evento.tipo) {
    case "click":
      return manejarClick(evento);
    case "tecla":
      return manejarTecla(evento);
    case "scroll":
      return manejarScroll(evento);
    default:
      // Si añades una variante a Evento, esto deja de compilar
      const nunca: never = evento;
      return nunca;
  }
}`}</BlogCode>

      <BlogCallout type="info">
        La técnica <BlogInlineCode>never</BlogInlineCode> funciona porque{" "}
        <BlogInlineCode>never</BlogInlineCode> es asignable a todo tipo, pero
        ningún tipo (salvo él mismo) es asignable a{" "}
        <BlogInlineCode>never</BlogInlineCode>. Si{" "}
        <BlogInlineCode>evento</BlogInlineCode> todavía puede ser una variante
        sin tratar, la asignación falla y te avisa el compilador.
      </BlogCallout>

      <BlogH2 id="generics">Generics avanzados</BlogH2>

      <BlogP>
        Un <strong>generic</strong> parametriza un tipo: la misma función o tipo
        funciona para muchos tipos, y la relación entre parámetros se conserva.
        Con <strong>constraints</strong> (
        <BlogInlineCode>extends</BlogInlineCode>) limitas a qué tipos puede
        aplicarse:
      </BlogP>

      <BlogCode>{`function primero<T>(lista: T[]): T | undefined {
  return lista[0];
}

// Constraint: T debe tener al menos 'id'
function buscarPorId<T extends { id: number }>(items: T[], id: number) {
  return items.find((item) => item.id === id);
}

buscarPorId(
  [{ id: 1, nombre: "Ana" }, { id: 2, nombre: "Luis" }],
  2
);`}</BlogCode>

      <BlogP>
        Los generics admiten <strong>parámetros múltiples</strong> y{" "}
        <strong>tipos por defecto</strong>:
      </BlogP>

      <BlogCode>{`function emparejar<A, B>(a: A, b: B): { primero: A; segundo: B } {
  return { primero: a, segundo: b };
}

// Inferencia en la llamada: A = string, B = number
const par = emparejar("clave", 42);

// Tipo por defecto
function almacenar<T = string>(valor: T): void {
  console.log(valor);
}`}</BlogCode>

      <BlogP>
        También se aplican a <strong>clases</strong> e{" "}
        <strong>interfaces</strong>:
      </BlogP>

      <BlogCode>{`// Clase genérica: una pila tipada
class Pila<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

const pilaDeNumeros = new Pila<number>();
pilaDeNumeros.push(1);
pilaDeNumeros.push(2);
const ultimo = pilaDeNumeros.pop(); // number | undefined

// Interface genérica
interface Resultado<T> {
  ok: boolean;
  datos?: T;
  error?: string;
}

const r: Resultado<Usuario> = { ok: true, datos: usuario }`}</BlogCode>

      <BlogCallout type="tip">
        La inferencia es tu amiga: no escribas{" "}
        <BlogInlineCode>new Pila&lt;number&gt;()</BlogInlineCode> cuando el
        contexto ya lo deduce. Escribe el tipo explícito solo cuando la
        inferencia no llegue al resultado que buscas.
      </BlogCallout>

      <BlogH2 id="utility-types">Utility types</BlogH2>

      <BlogP>
        TypeScript trae tipos predefinidos que transforman otros tipos. Los más
        usados en el día a día:
      </BlogP>

      <BlogCode>{`interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
}

// Todas las propiedades opcionales
type UsuarioParcial = Partial<Usuario>;

// Todas obligatorias (quita las opcionales)
type UsuarioCompleto = Required<Usuario>;

// Todas de solo lectura
type UsuarioInmutable = Readonly<Usuario>;

// Solo un subconjunto
type Credenciales = Pick<Usuario, "email" | "telefono">;

// Todo menos un subconjunto
type UsuarioSinId = Omit<Usuario, "id">;

// Mapa de claves a un tipo
type MapaRoles = Record<"admin" | "editor" | "lector", boolean>;

// Excluye miembros de una unión
type SinError = Exclude<"a" | "b" | "error", "error">; // "a" | "b"

// Extrae miembros de una unión
type SoloB = Extract<"a" | "b" | 42, string>; // "a" | "b"`}</BlogCode>

      <BlogP>
        Los que se usan con <strong>funciones</strong> y{" "}
        <strong>promesas</strong>:
      </BlogP>

      <BlogCode>{`function crearUsuario(nombre: string, edad: number): Usuario {
  // ...
}

// Tipo de retorno de una función
type TipoRetorno = ReturnType<typeof crearUsuario>; // Usuario

// Parámetros de una función como tupla
type Params = Parameters<typeof crearUsuario>; // [nombre: string, edad: number]

// Aplanar una promesa
type Valor = Awaited<Promise<Promise<number>>>; // number

// En la práctica, con funciones async
async function cargarUsuario(): Promise<Usuario> {
  return fetch("/api/usuario").then((r) => r.json());
}
type UsuarioCargado = Awaited<ReturnType<typeof cargarUsuario>>; // Usuario`}</BlogCode>

      <BlogCallout type="warn">
        Los utility types producen <strong>tipos</strong> nuevos, no mutan los
        originales. <BlogInlineCode>Partial&lt;Usuario&gt;</BlogInlineCode> no
        hace que <BlogInlineCode>Usuario</BlogInlineCode> tenga propiedades
        opcionales: es un tipo derivado que convive con el original.
      </BlogCallout>

      <BlogH2 id="mapped-types">Mapped types y template literal types</BlogH2>

      <BlogP>
        Un <strong>mapped type</strong> recorre las claves de otro tipo y
        produce un tipo nuevo por cada una. La sintaxis{" "}
        <BlogInlineCode>as</BlogInlineCode> permite <strong>renombrar</strong>{" "}
        las claves:
      </BlogP>

      <BlogCode>{`type Configuracion = {
  ancho: number;
  alto: number;
  tema: string;
};

// Todas las claves booleanas
type MapaBooleano = { [K in keyof Configuracion]: boolean };

// Todas las claves con sufijo "Valor"
type Valores = { [K in keyof Configuracion as \`\${K}Valor\`]: Configuracion[K] };
// { anchoValor: number; altoValor: number; temaValor: string }

// Con '?' hacemos todo opcional (así está implementado Partial)
type Opcional<T> = { [K in keyof T]?: T[K] }`}</BlogCode>

      <BlogCallout type="info">
        El ejemplo de <BlogInlineCode>Valores</BlogInlineCode> usa un{" "}
        <strong>template literal type</strong>: tipos que construyen strings a
        partir de otros. Combinando template literals con mapped types puedes
        generar APIs de tipos completas a partir de un modelo de datos.
      </BlogCallout>

      <BlogH3 id="infer">Conditional types e infer</BlogH3>

      <BlogP>
        Un <strong>conditional type</strong> elige un tipo u otro según una
        condición (<BlogInlineCode>T extends U ? X : Y</BlogInlineCode>). La
        palabra clave <BlogInlineCode>infer</BlogInlineCode> extrae un tipo
        desde dentro de la estructura:
      </BlogP>

      <BlogCode>{`// Extrae el tipo de un array
type Elemento<T> = T extends (infer E)[] ? E : never;

type A = Elemento<string[]>; // string
type B = Elemento<number[]>; // number

// Extrae el tipo de una promesa
type Desempaqueta<T> = T extends Promise<infer U> ? U : T;

type C = Desempaqueta<Promise<boolean>>; // boolean

// Aplica de forma recursiva
type DesempaquetaProfunda<T> = T extends Promise<infer U>
  ? DesempaquetaProfunda<U>
  : T;

type D = DesempaquetaProfunda<Promise<Promise<string>>>; // string`}</BlogCode>

      <BlogCallout type="tip">
        <BlogInlineCode>ReturnType</BlogInlineCode>,{" "}
        <BlogInlineCode>Parameters</BlogInlineCode> y{" "}
        <BlogInlineCode>Awaited</BlogInlineCode> están implementados
        internamente con conditional types e{" "}
        <BlogInlineCode>infer</BlogInlineCode>. Aprender a escribirlos te
        permite crear utilidades propias.
      </BlogCallout>

      <BlogH2 id="react">Tipado en React</BlogH2>

      <BlogH3 id="props">Props con type/interface y children</BlogH3>

      <BlogP>
        La forma moderna de tipar un componente: definir las props con{" "}
        <BlogInlineCode>type</BlogInlineCode> (preferible para props) o{" "}
        <BlogInlineCode>interface</BlogInlineCode> (para extensión), y usar{" "}
        <BlogInlineCode>React.ReactNode</BlogInlineCode> para{" "}
        <BlogInlineCode>children</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`import type { ReactNode } from "react";

type BotonProps = {
  children: ReactNode;
  variant: "primario" | "secundario";
  onClick?: () => void;
};

function Boton({ children, variant, onClick }: BotonProps) {
  return (
    <button className={variant} onClick={onClick}>
      {children}
    </button>
  );
}`}</BlogCode>

      <BlogCallout type="info">
        Sobre <BlogInlineCode>React.FC</BlogInlineCode>: sigue existiendo, pero
        la comunidad y el equipo de React recomiendan tipar las props
        directamente. Motivos: no infiere{" "}
        <BlogInlineCode>children</BlogInlineCode> implícitamente (en React 18
        deben declararse), complica los generics y añade verbosidad sin valor.
        La firma{" "}
        <BlogInlineCode>(props: Props) =&gt; JSX.Element</BlogInlineCode> es la
        norma actual.
      </BlogCallout>

      <BlogH3 id="hooks">Hooks tipados</BlogH3>

      <BlogP>
        <BlogInlineCode>useState</BlogInlineCode> y{" "}
        <BlogInlineCode>useReducer</BlogInlineCode> aceptan un generic explícito
        cuando el estado no se puede inferir, o cuando el valor inicial no
        coincide con el estado completo:
      </BlogP>

      <BlogCode>{`// Inferido
const [contador, setContador] = useState(0); // number

// Explícito: estado que aún no existe
const [usuario, setUsuario] = useState<Usuario | null>(null);

// Unión para estados de carga
type CargaEstado = "idle" | "cargando" | "exito" | "error";
const [estado, setEstado] = useState<CargaEstado>("idle");

// useReducer con unión discriminada de acciones
type Accion =
  | { tipo: "incrementar"; cantidad: number }
  | { tipo: "reiniciar" };

function reducer(contador: number, accion: Accion): number {
  switch (accion.tipo) {
    case "incrementar":
      return contador + accion.cantidad;
    case "reiniciar":
      return 0;
  }
}

const [contador, dispatch] = useReducer(reducer, 0);`}</BlogCode>

      <BlogP>
        Los <strong>contextos tipados</strong> evitan el{" "}
        <BlogInlineCode>undefined</BlogInlineCode> y obligan a un valor por
        defecto que solo existe fuera del Provider:
      </BlogP>

      <BlogCode>{`type TemaContexto = {
  tema: "claro" | "oscuro";
  alternarTema: () => void;
};

// undefined fuera del Provider: nos obliga a comprobar el hook
const TemaContext = createContext<TemaContexto | undefined>(undefined);

function useTema(): TemaContexto {
  const contexto = useContext(TemaContext);
  if (!contexto) {
    throw new Error("useTema debe usarse dentro de <TemaProvider>");
  }
  return contexto;
}`}</BlogCode>

      <BlogCallout type="danger">
        No definas el contexto con un objeto "falso" por defecto (como{" "}
        <BlogInlineCode>tema: "claro"</BlogInlineCode>) sin comprobarlo: oculta
        errores de uso fuera del Provider. La combinación de{" "}
        <BlogInlineCode>undefined</BlogInlineCode> + throw es el patrón
        canónico.
      </BlogCallout>

      <BlogH3 id="as-const-satisfies">as const y satisfies</BlogH3>

      <BlogP>
        <BlogInlineCode>as const</BlogInlineCode> convierte literales en tipos
        de solo lectura, y <BlogInlineCode>satisfies</BlogInlineCode> verifica
        que un valor cumple un tipo <em>sin</em> ampliarlo a ese tipo. Juntos
        dan el mejor de ambos mundos:
      </BlogP>

      <BlogCode>{`// as const: literales exactos, inmutables
const direcciones = ["arriba", "abajo", "izq", "der"] as const;
type Direccion = (typeof direcciones)[number]; // "arriba" | "abajo" | ...

// satisfies: valida la forma sin perder el tipo literal
const colores = {
  primario: "#2563eb",
  secundario: "#7c3aed",
} as const satisfies Record<string, string>;

colores.primario; // literal "#2563eb", no string genérico`}</BlogCode>

      <BlogCallout type="warn">
        <BlogInlineCode>as const</BlogInlineCode> no es un casting "seguro":{" "}
        <BlogInlineCode>as</BlogInlineCode> fuerza un tipo y puede ocultar
        errores reales si se usa mal. <BlogInlineCode>satisfies</BlogInlineCode>{" "}
        (TS 4.9+) existe justo para validar sin forzar. Prefiere siempre
        satisfaces sobre <BlogInlineCode>as</BlogInlineCode> cuando solo quieras
        comprobar.
      </BlogCallout>

      <BlogH2 id="tsconfig">tsconfig estricto</BlogH2>

      <BlogP>
        La configuración marca la diferencia entre "tipos que existen" y "tipos
        que te protegen". Estas cuatro flags son las que más se notan:
      </BlogP>

      <BlogCode>{`// tsconfig.json
{
  "compilerOptions": {
    // Activa todas las comprobaciones estrictas a la vez
    "strict": true,

    // arr[0] es T | undefined: fuerza a comprobar índices
    "noUncheckedIndexedAccess": true,

    // las props opcionales no aceptan undefined explícito
    "exactOptionalPropertyTypes": true,

    // separa imports de tipo de imports de valor
    "verbatimModuleSyntax": true
  }
}`}</BlogCode>

      <BlogUl>
        <BlogLi>
          <strong>strict</strong> — paquete de flags:{" "}
          <BlogInlineCode>strictNullChecks</BlogInlineCode>,{" "}
          <BlogInlineCode>noImplicitAny</BlogInlineCode>,{" "}
          <BlogInlineCode>strictFunctionTypes</BlogInlineCode> y más.
        </BlogLi>
        <BlogLi>
          <strong>noUncheckedIndexedAccess</strong> — el acceso por índice de un
          array devuelve <BlogInlineCode>T | undefined</BlogInlineCode>.
        </BlogLi>
        <BlogLi>
          <strong>exactOptionalPropertyTypes</strong> —{" "}
          <BlogInlineCode>{`{ a?: string }`}</BlogInlineCode> no admite{" "}
          <BlogInlineCode>{`{ a: undefined }`}</BlogInlineCode> explícito.
        </BlogLi>
        <BlogLi>
          <strong>verbatimModuleSyntax</strong> — obliga a{" "}
          <BlogInlineCode>import type</BlogInlineCode> para tipos puros.
        </BlogLi>
      </BlogUl>

      <BlogCode>{`// verbatimModuleSyntax: separar tipos de valores
import { useEffect } from "react";       // valor
import type { ReactNode } from "react";  // solo tipo

// exactOptionalPropertyTypes en acción
interface Config {
  retraso?: number;
}

// ❌ Error con la flag activada
const c1: Config = { retraso: undefined };

// ✅ Correcto: o no está, o es number
const c2: Config = {};
const c3: Config = { retraso: 300 };`}</BlogCode>

      <BlogCallout type="info">
        Migrar un proyecto legacy a{" "}
        <BlogInlineCode>strict: true</BlogInlineCode> genera errores a miles;
        hazlo de a poco (flag por flag) en vez de todo de golpe. Los proyectos
        nuevos no deberían arrancar sin <BlogInlineCode>strict</BlogInlineCode>{" "}
        ni <BlogInlineCode>noUncheckedIndexedAccess</BlogInlineCode>.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Ejercicios</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Escribe un type predicate que distinga un objeto Coche (con propiedad ruedas: number) de un Bicicleta (con manillar: boolean) dentro de un array de Vehiculo."
          hint="function esCoche(v: Vehiculo): v is Coche con 'ruedas' in v."
          level="Básico"
          num={1}
          solution={`type Vehiculo =
  | { nombre: string; ruedas: number }
  | { nombre: string; manillar: boolean };

function esCoche(v: Vehiculo): v is { nombre: string; ruedas: number } {
  return "ruedas" in v;
}

const vehiculos: Vehiculo[] = obtenerVehiculos();
const coches = vehiculos.filter(esCoche);
coches.forEach((coche) => console.log(coche.ruedas));`}
          title="Type predicate básico"
        />

        <ExerciseCard
          description="Crea una unión discriminada de tres formas (circulo, cuadrado, rectangulo) con un discriminante 'tipo', y una función area() que devuelva el área de cada una."
          hint="Switch sobre figuras.tipo y accede a las propiedades específicas en cada case."
          level="Intermedio"
          num={2}
          solution={`type Figura =
  | { tipo: "circulo"; radio: number }
  | { tipo: "cuadrado"; lado: number }
  | { tipo: "rectangulo"; alto: number; ancho: number };

function area(figura: Figura): number {
  switch (figura.tipo) {
    case "circulo":
      return Math.PI * figura.radio ** 2;
    case "cuadrado":
      return figura.lado ** 2;
    case "rectangulo":
      return figura.alto * figura.ancho;
  }
}`}
          title="Unión discriminada con switch"
        />

        <ExerciseCard
          description="Implementa una función generica con constraint que ordene un array de objetos por una clave numérica dada como segundo argumento."
          hint="T extends Record<string, unknown> no basta; usa una clave con tipo genérico y compara como number."
          level="Intermedio"
          num={3}
          solution={`function ordenarPor<T extends Record<K, number>, K extends keyof T>(
  items: T[],
  clave: K
): T[] {
  return [...items].sort((a, b) => a[clave] - b[clave]);
}

const productos = [
  { nombre: "Teclado", precio: 20 },
  { nombre: "Ratón", precio: 10 },
  { nombre: "Monitor", precio: 150 },
];

ordenarPor(productos, "precio"); // Ratón, Teclado, Monitor`}
          title="Generic con constraint y clave"
        />

        <ExerciseCard
          description="Tipa un contexto de sesión (usuario y logout) con el patrón undefined + throw, y un hook que lance error fuera del Provider."
          hint="createContext<SesionContexto | undefined>(undefined) y comprobar dentro del hook."
          level="Avanzado"
          num={4}
          solution={`import { createContext, useContext } from "react";

type SesionContexto = {
  usuario: { nombre: string };
  logout: () => void;
};

const SesionContext = createContext<SesionContexto | undefined>(undefined);

function useSesion(): SesionContexto {
  const contexto = useContext(SesionContext);
  if (!contexto) {
    throw new Error("useSesion debe usarse dentro de <SesionProvider>");
  }
  return contexto;
}`}
          title="Contexto tipado con throw"
        />

        <ExerciseCard
          description="Escribe un conditional type con infer que extraiga el tipo del segundo elemento de una tupla de cualquier longitud."
          hint="T extends [unknown, infer S, ...unknown[]] ? S : never."
          level="Avanzado"
          num={5}
          solution={`type Segundo<T extends unknown[]> = T extends [
  unknown,
  infer S,
  ...unknown[]
]
  ? S
  : never;

type A = Segundo<[string, number, boolean]>; // number
type B = Segundo<[string]>;                  // never (no hay segundo)`}
          title="Conditional type con infer"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        El sistema de tipos de TypeScript es una herramienta de diseño, no un
        trámite: narrowing para expresar flujos, uniones discriminadas para
        modelar datos reales, generics para reutilizar sin perder seguridad y
        utility types para transformar tipos en vez de escribirlos. Cuando lo
        aplicas a React y a un tsconfig estricto, los errores que antes
        aparecían en producción se convierten en errores de compilación. Ese es
        el objetivo final: que el compilador haga de red de seguridad.
      </BlogP>
    </article>
  );
}
