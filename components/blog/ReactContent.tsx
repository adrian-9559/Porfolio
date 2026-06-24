"use client";
import { useState } from "react";

type SectionId =
  | "intro" | "componentes" | "hooks" | "routing"
  | "estado" | "optimizacion" | "proyecto-final";

interface SectionDef { id: SectionId; label: string; }
const SECTIONS: SectionDef[] = [
  { id: "intro",          label: "1. Introducción" },
  { id: "componentes",    label: "2. Componentes" },
  { id: "hooks",          label: "3. Hooks" },
  { id: "routing",        label: "4. Routing" },
  { id: "estado",         label: "5. Estado global" },
  { id: "optimizacion",   label: "6. Optimización" },
  { id: "proyecto-final", label: "Proyecto Final" },
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
function Callout({ type, children }: { type: "tip" | "warn" | "danger"; children: React.ReactNode }) {
  const styles = {
    tip:    "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300",
    warn:   "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300",
    danger: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300",
  };
  const icons = { tip: "💡", warn: "⚠️", danger: "🚨" };
  return (
    <div className={`border rounded-xl px-4 py-3 my-4 text-sm ${styles[type]}`}>
      <span className="mr-1.5">{icons[type]}</span>{children}
    </div>
  );
}

function SectionIntro() {
  return (
    <>
      <H2>Introducción a React</H2>
      <P>React es una biblioteca de JavaScript desarrollada por Meta para construir interfaces de usuario. Su modelo se basa en componentes reutilizables y un flujo de datos unidireccional. La versión 18 introdujo concurrencia, y React 19 trae hooks de servidor y acciones.</P>
      <Code>{`# Crear un proyecto con Vite (recomendado)
npm create vite@latest mi-app -- --template react-ts
cd mi-app
npm install
npm run dev

# O con Next.js (full-stack)
npx create-next-app@latest mi-app --typescript --tailwind`}</Code>
      <H3>JSX</H3>
      <P>JSX es azúcar sintáctico sobre <code>React.createElement</code>. Permite escribir HTML dentro de JavaScript de forma expresiva.</P>
      <Code>{`// JSX se compila a React.createElement(...)
function Saludo({ nombre }: { nombre: string }) {
  const esAdmin = nombre === "admin";
  return (
    <div className="saludo">
      <h1>Hola, {nombre}</h1>
      {esAdmin && <span className="badge">Admin</span>}
      <p>Hora: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}

// Equivalente sin JSX (no uses esto directamente)
React.createElement("div", { className: "saludo" },
  React.createElement("h1", null, "Hola, ", nombre)
)`}</Code>
    </>
  );
}

function SectionComponentes() {
  return (
    <>
      <H2>Componentes</H2>
      <H3>Props y children</H3>
      <P>Las props son la forma de pasar datos de un componente padre a uno hijo. Son inmutables dentro del hijo. <code>children</code> es una prop especial que contiene el contenido anidado.</P>
      <Code>{`// Tipado de props con TypeScript
interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

function Button({
  label,
  variant = "primary",
  disabled = false,
  onClick,
  children,
}: ButtonProps) {
  const classes = {
    primary:   "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger:    "bg-red-600 hover:bg-red-700 text-white",
  }[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`px-4 py-2 rounded-lg transition \${classes} \${disabled ? "opacity-50 cursor-not-allowed" : ""}\`}
    >
      {children ?? label}
    </button>
  );
}`}</Code>
      <H3>Renderizado de listas</H3>
      <Code>{`interface Producto { id: number; nombre: string; precio: number; }

function ListaProductos({ productos }: { productos: Producto[] }) {
  if (productos.length === 0) {
    return <p className="text-gray-500">Sin productos</p>;
  }

  return (
    <ul className="divide-y">
      {productos.map(producto => (
        // key debe ser único y estable (no usar el índice)
        <li key={producto.id} className="flex justify-between py-2">
          <span>{producto.nombre}</span>
          <span className="font-bold">{producto.precio.toFixed(2)}€</span>
        </li>
      ))}
    </ul>
  );
}`}</Code>
      <Callout type="warn">Nunca uses el índice del array como <code>key</code> si la lista puede reordenarse o filtrarse. Usa un identificador único estable.</Callout>
    </>
  );
}

function SectionHooks() {
  return (
    <>
      <H2>Hooks</H2>
      <H3>useState y useEffect</H3>
      <Code>{`import { useState, useEffect } from "react";

function PerfilUsuario({ userId }: { userId: number }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Efecto se ejecuta al montar y cuando userId cambia
    let cancelado = false;
    setCargando(true);
    setError(null);

    fetch(\`/api/usuarios/\${userId}\`)
      .then(r => r.json())
      .then(data => {
        if (!cancelado) {
          setUsuario(data);
          setCargando(false);
        }
      })
      .catch(err => {
        if (!cancelado) {
          setError(err.message);
          setCargando(false);
        }
      });

    // Cleanup: cancela la actualización si el componente se desmonta
    return () => { cancelado = true; };
  }, [userId]); // dependencias

  if (cargando) return <p>Cargando...</p>;
  if (error)    return <p>Error: {error}</p>;
  if (!usuario) return null;
  return <div>{usuario.nombre}</div>;
}`}</Code>
      <H3>useMemo y useCallback</H3>
      <Code>{`import { useState, useMemo, useCallback } from "react";

function Dashboard({ datos }: { datos: number[] }) {
  const [filtro, setFiltro] = useState(0);

  // useMemo: memoriza un valor calculado
  const estadisticas = useMemo(() => {
    const filtrados = datos.filter(n => n > filtro);
    return {
      total: filtrados.length,
      suma:  filtrados.reduce((a, b) => a + b, 0),
      media: filtrados.length > 0
        ? filtrados.reduce((a, b) => a + b, 0) / filtrados.length
        : 0,
    };
  }, [datos, filtro]); // solo recalcula si cambian estos

  // useCallback: memoriza una función
  const handleFiltro = useCallback((valor: number) => {
    setFiltro(valor);
  }, []); // sin dependencias: la función nunca cambia

  return (
    <div>
      <input type="number" onChange={e => handleFiltro(Number(e.target.value))} />
      <p>Total: {estadisticas.total}</p>
      <p>Media: {estadisticas.media.toFixed(2)}</p>
    </div>
  );
}`}</Code>
      <Callout type="tip"><code>useMemo</code> y <code>useCallback</code> son optimizaciones: solo úsalos cuando tengas problemas de rendimiento medibles. El código sin ellos es más simple.</Callout>
    </>
  );
}

function SectionRouting() {
  return (
    <>
      <H2>Routing con React Router</H2>
      <Code>{`// main.tsx
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/contacto">Contacto</Link>
      </nav>
      <Routes>
        <Route path="/"          element={<Inicio />} />
        <Route path="/blog"      element={<Blog />} />
        <Route path="/blog/:id"  element={<Articulo />} />
        <Route path="/contacto"  element={<Contacto />} />
        <Route path="*"          element={<PaginaNoEncontrada />} />
      </Routes>
    </BrowserRouter>
  );
}`}</Code>
      <Code>{`// Ruta dinámica con parámetros
function Articulo() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [articulo, setArticulo] = useState(null);

  useEffect(() => {
    fetch(\`/api/articulos/\${id}\`)
      .then(r => r.json())
      .then(setArticulo);
  }, [id]);

  return (
    <article>
      <button onClick={() => navigate(-1)}>← Volver</button>
      <h1>{articulo?.titulo}</h1>
      <p>{articulo?.contenido}</p>
    </article>
  );
}`}</Code>
    </>
  );
}

function SectionEstado() {
  return (
    <>
      <H2>Estado global con Context API</H2>
      <P>Context API permite compartir estado entre componentes sin pasar props manualmente en cada nivel del árbol (prop drilling).</P>
      <Code>{`// context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface Usuario { id: number; nombre: string; rol: string; }
interface AuthContextType {
  usuario: Usuario | null;
  login: (u: Usuario) => void;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const login  = (u: Usuario) => setUsuario(u);
  const logout = () => setUsuario(null);
  const isAdmin = usuario?.rol === "admin";

  return (
    <AuthContext.Provider value={{ usuario, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para consumir el contexto
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}`}</Code>
      <Code>{`// Usar el contexto en cualquier componente
function NavBar() {
  const { usuario, logout, isAdmin } = useAuth();

  return (
    <nav>
      {usuario ? (
        <>
          <span>Hola, {usuario.nombre}</span>
          {isAdmin && <Link to="/admin">Panel Admin</Link>}
          <button onClick={logout}>Cerrar sesión</button>
        </>
      ) : (
        <Link to="/login">Iniciar sesión</Link>
      )}
    </nav>
  );
}`}</Code>
    </>
  );
}

function SectionOptimizacion() {
  return (
    <>
      <H2>Optimización del renderizado</H2>
      <H3>React.memo</H3>
      <P><code>React.memo</code> evita que un componente se re-renderice si sus props no han cambiado. Útil para componentes hijos costosos de renderizar.</P>
      <Code>{`import { memo, useState } from "react";

// Sin memo: se re-renderiza cada vez que el padre re-renderiza
function ItemListaBruto({ item, onEliminar }: ItemProps) {
  console.log("render", item.id);
  return (
    <li>
      {item.nombre}
      <button onClick={() => onEliminar(item.id)}>✕</button>
    </li>
  );
}

// Con memo: solo re-renderiza si item u onEliminar cambian
const ItemLista = memo(function ItemLista({ item, onEliminar }: ItemProps) {
  console.log("render", item.id);
  return (
    <li>
      {item.nombre}
      <button onClick={() => onEliminar(item.id)}>✕</button>
    </li>
  );
});

function Lista({ items }: { items: Item[] }) {
  const [contador, setContador] = useState(0);

  // useCallback para que la referencia de onEliminar sea estable
  const handleEliminar = useCallback((id: number) => {
    // eliminar lógica...
  }, []);

  return (
    <div>
      <button onClick={() => setContador(c => c + 1)}>
        Contador: {contador}
      </button>
      <ul>
        {items.map(item => (
          <ItemLista key={item.id} item={item} onEliminar={handleEliminar} />
        ))}
      </ul>
    </div>
  );
}`}</Code>
      <Callout type="warn"><code>React.memo</code> hace una comparación superficial de props. Si pasas objetos o funciones nuevas en cada render, memo no ayudará. Combínalo con <code>useCallback</code> y <code>useMemo</code>.</Callout>
    </>
  );
}

function SectionProyecto() {
  return (
    <>
      <H2>Proyecto Final: Dashboard con estado</H2>
      <P>Dashboard completo con Context API para gestión de tareas. Incluye filtros, estadísticas y persistencia en localStorage.</P>
      <Code>{`// hooks/useTareas.ts
import { useState, useEffect, useCallback } from "react";

export interface Tarea {
  id: number; titulo: string; completada: boolean; prioridad: "alta" | "media" | "baja";
}

const STORAGE_KEY = "dashboard-tareas";

export function useTareas() {
  const [tareas, setTareas] = useState<Tarea[]>(() => {
    try {
      const guardadas = localStorage.getItem(STORAGE_KEY);
      return guardadas ? JSON.parse(guardadas) : [];
    } catch { return []; }
  });

  // Persistir cambios automáticamente
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
  }, [tareas]);

  const agregar = useCallback((titulo: string, prioridad: Tarea["prioridad"]) => {
    setTareas(prev => [...prev, { id: Date.now(), titulo, completada: false, prioridad }]);
  }, []);

  const toggleCompletar = useCallback((id: number) => {
    setTareas(prev => prev.map(t => t.id === id ? { ...t, completada: !t.completada } : t));
  }, []);

  const eliminar = useCallback((id: number) => {
    setTareas(prev => prev.filter(t => t.id !== id));
  }, []);

  return { tareas, agregar, toggleCompletar, eliminar };
}`}</Code>
      <Code>{`// components/Dashboard.tsx
import { useState, useMemo } from "react";
import { useTareas } from "../hooks/useTareas";

type Filtro = "todas" | "pendientes" | "completadas";

export function Dashboard() {
  const { tareas, agregar, toggleCompletar, eliminar } = useTareas();
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [prioridad, setPrioridad] = useState<"alta" | "media" | "baja">("media");

  const tareasFiltradas = useMemo(() => {
    if (filtro === "pendientes")  return tareas.filter(t => !t.completada);
    if (filtro === "completadas") return tareas.filter(t => t.completada);
    return tareas;
  }, [tareas, filtro]);

  const stats = useMemo(() => ({
    total:      tareas.length,
    completadas: tareas.filter(t => t.completada).length,
    pendientes:  tareas.filter(t => !t.completada).length,
  }), [tareas]);

  const handleAgregar = (e: React.FormEvent) => {
    e.preventDefault();
    if (nuevaTarea.trim()) {
      agregar(nuevaTarea.trim(), prioridad);
      setNuevaTarea("");
    }
  };

  const coloresPrioridad = { alta: "text-red-600", media: "text-amber-600", baja: "text-green-600" };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Mi Dashboard</h1>

      {/* Estadísticas */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[["Total", stats.total], ["Pendientes", stats.pendientes], ["Completadas", stats.completadas]].map(([label, val]) => (
          <div key={label} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">{val}</div>
            <div className="text-sm text-gray-500">{label}</div>
          </div>
        ))}
      </div>

      {/* Formulario */}
      <form onSubmit={handleAgregar} className="flex gap-2 mb-4">
        <input value={nuevaTarea} onChange={e => setNuevaTarea(e.target.value)}
          placeholder="Nueva tarea..." className="flex-1 border rounded-lg px-3 py-2 text-sm" />
        <select value={prioridad} onChange={e => setPrioridad(e.target.value as any)}
          className="border rounded-lg px-2 py-2 text-sm">
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">+</button>
      </form>

      {/* Filtros */}
      <div className="flex gap-2 mb-4">
        {(["todas", "pendientes", "completadas"] as Filtro[]).map(f => (
          <button key={f} onClick={() => setFiltro(f)}
            className={\`text-xs px-3 py-1.5 rounded-lg capitalize \${filtro === f ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-500 hover:bg-gray-100"}\`}>
            {f}
          </button>
        ))}
      </div>

      {/* Lista */}
      <ul className="space-y-2">
        {tareasFiltradas.map(tarea => (
          <li key={tarea.id} className="flex items-center gap-3 p-3 border rounded-xl">
            <input type="checkbox" checked={tarea.completada} onChange={() => toggleCompletar(tarea.id)} />
            <span className={\`flex-1 text-sm \${tarea.completada ? "line-through text-gray-400" : ""}\`}>
              {tarea.titulo}
            </span>
            <span className={\`text-xs font-medium \${coloresPrioridad[tarea.prioridad]}\`}>{tarea.prioridad}</span>
            <button onClick={() => eliminar(tarea.id)} className="text-gray-400 hover:text-red-500 text-xs">✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`}</Code>
      <Callout type="tip">Para proyectos más grandes, considera Zustand o Redux Toolkit en lugar de Context API. Son más eficientes y evitan re-renders innecesarios.</Callout>
    </>
  );
}

export default function ReactContent() {
  const [active, setActive] = useState<SectionId>(SECTIONS[0].id);

  const renderSection = () => {
    switch (active) {
      case "intro":          return <SectionIntro />;
      case "componentes":    return <SectionComponentes />;
      case "hooks":          return <SectionHooks />;
      case "routing":        return <SectionRouting />;
      case "estado":         return <SectionEstado />;
      case "optimizacion":   return <SectionOptimizacion />;
      case "proyecto-final": return <SectionProyecto />;
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
      <div className="flex-1 min-w-0 prose-custom">
        {renderSection()}
      </div>
    </div>
  );
}
