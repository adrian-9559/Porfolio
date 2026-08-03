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

export default function EstadoGlobalContent() {
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
          60 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        Estado global y data fetching
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Cuando una app crece, pasar datos de componente en componente se
        convierte en un dolor: props interminables, re-renders inesperados y
        lógica duplicada. Este tutorial cubre el estado global con Context y
        Zustand, la capa de datos con React Query y cuándo delegar el fetching
        a Next.js. Prerequisitos: React (hooks y componentes) y consumo básico
        de APIs.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="por-que">¿Por qué estado global?</BlogH2>

      <BlogP>
        El estado en React es local por defecto: vive dentro del componente
        que lo declara. Eso está bien mientras los datos no se compartan.
        En cuanto dos componentes que no son padre-hijo necesitan los mismos
        datos, empieza el problema.
      </BlogP>

      <BlogH3 id="prop-drilling">Prop drilling</BlogH3>

      <BlogP>
        El "prop drilling" es pasar un dato por cada nivel del árbol aunque los
        niveles intermedios no lo usen, solo para que llegue al destino:
      </BlogP>

      <BlogCode>{`function App() {
  const [user, setUser] = useState(null);
  return <Dashboard user={user} onLogin={setUser} />;
}

// Dashboard no usa user, solo lo reenvía…
function Dashboard({ user, onLogin }) {
  return <Sidebar user={user} onLogin={onLogin} />;
}

// …Sidebar tampoco…
function Sidebar({ user, onLogin }) {
  return <ProfileMenu user={user} onLogin={onLogin} />;
}

// …hasta que llega a quien lo necesita.
function ProfileMenu({ user, onLogin }) {
  return user ? <Avatar user={user} /> : <LoginButton onLogin={onLogin} />;
}`}</BlogCode>

      <BlogP>
        Los problemas son evidentes: los componentes intermedios reciben props
        que no usan (se acoplan a datos que no les importan), cualquier cambio
        de forma del dato obliga a tocar toda la cadena, y el código grita que
        hay algo mal diseñado.
      </BlogP>

      <BlogCallout type="tip">
        Antes de añadir una librería de estado, pregúntate: ¿puedo subir el
        estado a un ancestro común? ¿Puedo componer el árbol de otra forma?
        Muchos casos de "prop drilling" se resuelven reorganizando componentes,
        no añadiendo dependencias.
      </BlogCallout>

      <BlogH3 id="limites-context">Las limitaciones del Context</BlogH3>

      <BlogP>
        La solución nativa de React es <BlogInlineCode>Context</BlogInlineCode>:{" "}
        un valor disponible para todo un subárbol sin pasar props. Su mayor
        problema es el <strong>rendimiento</strong>:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Re-renders globales:</strong> cada vez que el valor del
          contexto cambia, todos los consumidores del subárbol se re-renderizan,
          aunque consuman una parte que no cambió.
        </BlogLi>
        <BlogLi>
          <strong>Sin selectores:</strong> no puedes suscribirte a una "slice"
          del valor. Todo componente que use{" "}
          <BlogInlineCode>useContext</BlogInlineCode> depende del objeto
          completo.
        </BlogLi>
        <BlogLi>
          <strong>Mezcla de responsabilidades:</strong> si además pones data
          fetching en el provider, cada consulta de la API re-renderiza toda
          la app.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="warn">
        El famoso "boilerplate de Context" no es el contexto en sí, sino los{" "}
        <BlogInlineCode>useMemo</BlogInlineCode> que necesitas para evitar
        re-renders innecesarios cada vez que el provider se renderiza. Con
        valores frecuentemente cambiantes (sesión, carrito), ese coste se nota.
      </BlogCallout>

      <BlogH3 id="cuando-store">Cuándo necesitas un store</BlogH3>

      <BlogP>
        Un store externo (Zustand, Redux, Jotai) aporta lo que Context no da:
        selectores finos, suscripciones por trozo y middleware (persistencia,
        devtools). Conviene considerarlo cuando:
      </BlogP>

      <BlogUl>
        <BlogLi>
          El estado es <strong>global de verdad</strong>: sesión, tema,
          carrito, preferencias. No es un dato aislado de una pantalla.
        </BlogLi>
        <BlogLi>
          Muchos componentes leen el mismo dato y solo una fracción debería
          re-renderizarse cuando cambia.
        </BlogLi>
        <BlogLi>
          Necesitas <strong>persistencia</strong> (localStorage, sessionStorage)
          o herramientas de depuración con viajes en el tiempo.
        </BlogLi>
        <BlogLi>
          La lógica de mutación es compleja y quieres aislarla en acciones
          testeables.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="info">
        Regla práctica: <strong>Context para estado que cambia poco</strong>{" "}
        (tema, idioma, proveedor de datos), <strong>store para estado que
        cambia mucho y se comparte</strong> (sesión, carrito, UI efímera) y{" "}
        <strong>React Query para estado del servidor</strong> (lo que viene de
        una API). Esta distinción es el corazón de este tutorial.
      </BlogCallout>

      <BlogH2 id="context-avanzado">Context API avanzado</BlogH2>

      <BlogP>
        Context no es malo: es el mecanismo correcto para ciertos casos. Lo
        importante es usarlo bien: tipado, provider dedicado, custom hook y
        memoización.
      </BlogP>

      <BlogH3 id="context-tipado">Contexto tipado</BlogH3>

      <BlogP>
        El valor del contexto se declara con una interfaz explícita. El hook{" "}
        <BlogInlineCode>createContext</BlogInlineCode> recibe un valor por
        defecto que, como nunca debe usarse, se declara como{" "}
        <BlogInlineCode>null</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`// auth-context.ts
import { createContext, useContext } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// null porque el valor real solo existe dentro del provider
export const AuthContext = createContext<AuthContextValue | null>(null);`}</BlogCode>

      <BlogH3 id="provider-hook">Provider y custom hook</BlogH3>

      <BlogP>
        El provider guarda el estado con <BlogInlineCode>useState</BlogInlineCode>{" "}
        y expone un hook propio que lanza un error claro si alguien lo usa
        fuera del árbol:
      </BlogP>

      <BlogCode>{`// auth-provider.tsx
import { useState, useMemo, type ReactNode } from "react";
import { AuthContext, type User } from "./auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: (nextUser) => setUser(nextUser),
      logout: () => setUser(null),
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  }
  return ctx;
}`}</BlogCode>

      <BlogCallout type="tip">
        El error del custom hook es tu mejor amigo: convierte un fallo silencioso
        (el contexto <BlogInlineCode>null</BlogInlineCode>) en un mensaje que
        dice exactamente qué componente está mal colocado.
      </BlogCallout>

      <BlogH3 id="usememo">useMemo y re-renders</BlogH3>

      <BlogP>
        Sin <BlogInlineCode>useMemo</BlogInlineCode>, cada render del provider
        crearía un <strong>objeto nuevo</strong> para{" "}
        <BlogInlineCode>value</BlogInlineCode>, y el contexto notificaría a
        todos sus consumidores aunque el estado no hubiera cambiado. Esa
        memoización es lo que separa un provider correcto de uno que ralentiza
        la app:
      </BlogP>

      <BlogCode>{`const value = useMemo<AuthContextValue>(
  () => ({ user, login: (u) => setUser(u), logout: () => setUser(null) }),
  [user], // solo cambia cuando user cambia
);`}</BlogCode>

      <BlogP>
        Aun con esto, cada consumidor del contexto se re-renderiza cuando{" "}
        <BlogInlineCode>user</BlogInlineCode> cambia, lea o no{" "}
        <BlogInlineCode>user</BlogInlineCode>. Eso es inherente al diseño de
        Context.
      </BlogP>

      <BlogH3 id="limites">Límites del Context</BlogH3>

      <BlogP>
        Context no escala para estado que cambia a alta frecuencia (posición de
        ratón, contenido de un editor, websockets con updates constantes). Para
        esos casos necesitas suscripciones selectivas, y ahí entran los stores
        con selectores. Una señal clara de que Context no basta: te ves
        creando cinco contextos distintos solo para partir el estado y reducir
        re-renders.
      </BlogP>

      <BlogCallout type="warn">
        No uses el Context para cachear datos del servidor. Un provider que hace{" "}
        <BlogInlineCode>fetch</BlogInlineCode> al montarse y guarda el resultado
        en <BlogInlineCode>useState</BlogInlineCode> no te da ni caché, ni
        reintentos, ni deduplicación de peticiones. Ese trabajo es de React
        Query.
      </BlogCallout>

      <BlogH2 id="zustand">Zustand</BlogH2>

      <BlogP>
        Zustand es un store mínimo sobre React: creas un estado con{" "}
        <BlogInlineCode>create</BlogInlineCode>, lo lees con hooks y lo
        modificas con acciones. No requiere provider y los re-renders se limitan
        a los componentes que usan el selector correcto.
      </BlogP>

      <BlogH3 id="instalacion-zustand">Instalación</BlogH3>

      <BlogCode>{`npm install zustand`}</BlogCode>

      <BlogH3 id="create">create: estado y acciones</BlogH3>

      <BlogP>
        El store se define fuera del componente. El{" "}
        <BlogInlineCode>set</BlogInlineCode> permite actualizar todo el estado
        o aplicar una función sobre el estado actual:
      </BlogP>

      <BlogCode>{`// cart-store.ts
import { create } from "zustand";

interface CartItem {
  id: string;
  name: string;
  price: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  clear: () => set({ items: [] }),
}));`}</BlogCode>

      <BlogP>
        En el componente, el hook devuelve una parte del estado. Cada propiedad
        que se selecciona es una suscripción separada:
      </BlogP>

      <BlogCode>{`// CartButton.tsx
import { useCartStore } from "./cart-store";

export function CartButton() {
  // solo re-renderiza cuando items cambia
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button onClick={() => addItem({ id: "p1", name: "Camiseta", price: 19 })}>
      Añadir (hay {items.length} en el carrito)
    </button>
  );
}`}</BlogCode>

      <BlogH3 id="selectores">Selectores</BlogH3>

      <BlogP>
        El selector determina la suscripción: devuelve la mínima porción de
        estado que el componente necesita. Cuanto más fino, menos re-renders:
      </BlogP>

      <BlogCode>{`// Bueno: suscripción fina, re-render solo si cambia el nombre
const name = useCartStore((state) => state.user.name);

// Malo: suscripción a un objeto nuevo en cada cambio
const user = useCartStore((state) => state.user);`}</BlogCode>

      <BlogCallout type="warn">
        Nunca selecciones un objeto completo que se construya de nuevo en cada
        cambio. Si el selector devuelve un objeto literal o un{" "}
        <BlogInlineCode>.filter()</BlogInlineCode>, Zustand comparará referencias
        con <BlogInlineCode>Object.is</BlogInlineCode> y verá un valor "distinto"
        en cada render, provocando un loop infinito. Para derivar datos se usa{" "}
        <BlogInlineCode>useShallow</BlogInlineCode>:
      </BlogCallout>

      <BlogCode>{`import { useShallow } from "zustand/react/shallow";

// Combina varios campos sin re-render excesivo
const { name, isAdmin } = useCartStore(
  useShallow((state) => ({
    name: state.user.name,
    isAdmin: state.user.role === "admin",
  })),
);`}</BlogCode>

      <BlogH3 id="slices">Slices: partir el store en módulos</BlogH3>

      <BlogP>
        Cuando el store crece, se divide en <strong>slices</strong>: cada slice
        es una función que recibe <BlogInlineCode>set</BlogInlineCode> (y{" "}
        <BlogInlineCode>get</BlogInlineCode>) y devuelve su parte del estado.
        El store final las combina:
      </BlogP>

      <BlogCode>{`// slices/user-slice.ts
interface UserSlice {
  userName: string;
  setUserName: (name: string) => void;
}

const createUserSlice: StateCreator<UserSlice> = (set) => ({
  userName: "",
  setUserName: (name) => set({ userName: name }),
});

// slices/settings-slice.ts
interface SettingsSlice {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const createSettingsSlice: StateCreator<SettingsSlice> = (set) => ({
  theme: "light",
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
});

// store.ts — combina los slices
type AppStore = UserSlice & SettingsSlice;

export const useAppStore = create<AppStore>()((...args) => ({
  ...createUserSlice(...args),
  ...createSettingsSlice(...args),
}));`}</BlogCode>

      <BlogH3 id="persist">Middleware persist</BlogH3>

      <BlogP>
        El middleware <BlogInlineCode>persist</BlogInlineCode> guarda el estado
        en <BlogInlineCode>localStorage</BlogInlineCode> y lo rehidrata al
        recargar. Solo hay que indicar qué campos persistir:
      </BlogP>

      <BlogCode>{`// theme-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeStore {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "theme-storage", // clave en localStorage
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);`}</BlogCode>

      <BlogCallout type="tip">
        <BlogInlineCode>partialize</BlogInlineCode> evita persistir funciones
        (acciones) y datos sensibles. Para valores de gran tamaño o de acceso
        lento, cambia el storage por{" "}
        <BlogInlineCode>createJSONStorage(() => sessionStorage)</BlogInlineCode>{" "}
        o un storage propio.
      </BlogCallout>

      <BlogH2 id="react-query">React Query (TanStack Query)</BlogH2>

      <BlogP>
        React Query (ahora TanStack Query) resuelve el{" "}
        <strong>estado del servidor</strong>: caché, revalidación, reintentos y
        sincronización con la UI. Es ortogonal a Zustand: Zustand guarda estado
        de cliente, React Query guarda respuestas de API.
      </BlogP>

      <BlogH3 id="queryclient">QueryClient y provider</BlogH3>

      <BlogP>
        El <BlogInlineCode>QueryClient</BlogInlineCode> se crea una sola vez y
        se comparte con <BlogInlineCode>QueryClientProvider</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`// providers.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  // useState lazy: se crea una única instancia por montaje
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
}`}</BlogCode>

      <BlogH3 id="usequery">useQuery</BlogH3>

      <BlogP>
        <BlogInlineCode>useQuery</BlogInlineCode> recibe una{" "}
        <BlogInlineCode>queryKey</BlogInlineCode> (identifica la caché) y una{" "}
        <BlogInlineCode>queryFn</BlogInlineCode> (devuelve una promesa). La caché
        hace que dos componentes con la misma clave compartan la misma petición:
      </BlogP>

      <BlogCode>{`// use-posts.ts
import { useQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body: string;
}

async function fetchPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Error al cargar los posts");
  return res.json();
}

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 60_000,  // 60s sin refetch
    gcTime: 5 * 60_000, // 5min hasta que se limpia de la caché
  });
}`}</BlogCode>

      <BlogP>
        La query devuelve flags de estado que controlan la UI:
      </BlogP>

      <BlogCode>{`// PostList.tsx
export function PostList() {
  const { data, isLoading, isError, error, refetch } = usePosts();

  if (isLoading) return <p>Cargando posts…</p>;
  if (isError) return (
    <div>
      <p>Error: {error.message}</p>
      <button onClick={() => refetch()}>Reintentar</button>
    </div>
  );

  return (
    <ul>
      {data?.map((post) => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}`}</BlogCode>

      <BlogCallout type="info">
        <BlogInlineCode>staleTime</BlogInlineCode> y{" "}
        <BlogInlineCode>gcTime</BlogInlineCode> no son lo mismo:{" "}
        <strong>stale</strong> es cuánto tiempo se considera fresco el dato (no
        se revalida al volver a la pantalla); <strong>gcTime</strong> es cuánto
        tiempo sobrevive en caché sin consumidores. Los datos "stale" se siguen
        mostrando y se revalidan en segundo plano.
      </BlogCallout>

      <BlogH3 id="usemutation">useMutation e invalidación</BlogH3>

      <BlogP>
        Para escrituras (POST, PUT, DELETE) se usa{" "}
        <BlogInlineCode>useMutation</BlogInlineCode>. Al terminar,{" "}
        <BlogInlineCode>invalidateQueries</BlogInlineCode> marca la query como
        obsoleta y la vuelve a pedir con datos frescos:
      </BlogP>

      <BlogCode>{`// create-post.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface NewPost {
  title: string;
  body: string;
}

async function createPost(input: NewPost) {
  const res = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("No se pudo crear el post");
  return res.json();
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // ["posts"] queda obsoleto → refetch automático
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}`}</BlogCode>

      <BlogH3 id="optimistic">Optimistic updates</BlogH3>

      <BlogP>
        En una mutación optimista, la UI refleja el cambio al instante y se
        revierte si falla. El patrón: cancelar queries en curso, guardar el
        valor anterior, aplicar el cambio y restaurarlo en error:
      </BlogP>

      <BlogCode>{`import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Todo {
  id: string;
  title: string;
  done: boolean;
}

export function useToggleTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(\`/api/todos/\${id}/toggle\`, { method: "PATCH" });
      if (!res.ok) throw new Error("Error al actualizar");
      return res.json();
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previous = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (old) =>
        old?.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo,
        ),
      );

      return { previous };
    },
    onError: (_error, _id, context) => {
      queryClient.setQueryData(["todos"], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}`}</BlogCode>

      <BlogCallout type="warn">
        El optimistic update solo tiene sentido cuando la operación es{" "}
        <strong>idempotente</strong> y casi nunca falla (toggle, like,
        favorito). Para operaciones con validación compleja del servidor, un
        loading state honesto con <BlogInlineCode>isPending</BlogInlineCode> es
        mejor que una UI que miente.
      </BlogCallout>

      <BlogH3 id="dependencias">Queries con dependencias</BlogH3>

      <BlogP>
        Los parámetros forman parte de la <BlogInlineCode>queryKey</BlogInlineCode>{" "}
        y la query se desactiva con <BlogInlineCode>enabled</BlogInlineCode>{" "}
        hasta que el dato esté listo:
      </BlogP>

      <BlogCode>{`// use-posts-by-user.ts
import { useQuery } from "@tanstack/react-query";

export function usePostsByUser(userId: string | null) {
  return useQuery({
    queryKey: ["posts", userId],
    queryFn: async () => {
      const res = await fetch(\`/api/users/\${userId}/posts\`);
      if (!res.ok) throw new Error("Error al cargar posts");
      return res.json();
    },
    enabled: userId !== null, // no dispara la petición sin userId
  });
}`}</BlogCode>

      <BlogH3 id="paginacion">Paginación con placeholderData</BlogH3>

      <BlogP>
        En la paginación, <BlogInlineCode>placeholderData</BlogInlineCode>{" "}
        mantiene visible la página anterior mientras se carga la nueva, sin
        parpadeos de skeleton:
      </BlogP>

      <BlogCode>{`import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface Page<T> {
  items: T[];
  totalPages: number;
}

async function fetchPage(page: number): Promise<Page<Post>> {
  const res = await fetch(\`/api/posts?page=\${page}\`);
  return res.json();
}

export function PaginatedPosts() {
  const [page, setPage] = useState(1);

  const { data, isPlaceholderData } = useQuery({
    queryKey: ["posts", "page", page],
    queryFn: () => fetchPage(page),
    // mantiene la página anterior como placeholder
    placeholderData: (previousData) => previousData,
  });

  return (
    <div>
      <ul>
        {data?.items.map((post) => <li key={post.id}>{post.title}</li>)}
      </ul>
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
      >
        Anterior
      </button>
      <button
        disabled={isPlaceholderData || page === data?.totalPages}
        onClick={() => setPage((p) => p + 1)}
      >
        Siguiente
      </button>
    </div>
  );
}`}</BlogCode>

      <BlogCallout type="tip">
        Deshabilitar el botón "Siguiente" con{" "}
        <BlogInlineCode>isPlaceholderData</BlogInlineCode> evita que el usuario
        salte dos páginas de golpe mientras la anterior aún está en caché.
      </BlogCallout>

      <BlogH2 id="nextjs">Data fetching en Next.js</BlogH2>

      <BlogP>
        Next.js ofrece otra dimensión: decidir <strong>dónde</strong> se hace el
        fetching. En el servidor, en el cliente, o en ambos según la naturaleza
        del dato.
      </BlogP>

      <BlogH3 id="servidor-vs-cliente">Servidor vs cliente</BlogH3>

      <BlogUl>
        <BlogLi>
          <strong>Servidor:</strong> datos públicos o por usuario (en tu propia
          base de datos) se obtienen en build o por request. Ventaja: cero
          latencia de red extra, mejor SEO y LCP, sin estados de carga.
        </BlogLi>
        <BlogLi>
          <strong>Cliente:</strong> datos privados de terceros, acciones en
          tiempo real o consultas dependientes de la interacción del usuario
          van con React Query, que además las cachea y revalida.
        </BlogLi>
      </BlogUl>

      <BlogP>
        En el pages router, el fetching en servidor se declara en la página
        con <BlogInlineCode>getStaticProps</BlogInlineCode> (estático) o{" "}
        <BlogInlineCode>getServerSideProps</BlogInlineCode> (por request):
      </BlogP>

      <BlogCode>{`// pages/blog/index.tsx
import type { GetStaticProps } from "next";

interface Post {
  id: number;
  title: string;
  excerpt: string;
}

interface BlogProps {
  posts: Post[];
}

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const res = await fetch("https://api.example.com/public/posts");
  const posts: Post[] = await res.json();

  return {
    props: { posts },
    revalidate: 3600, // ISR: regenera como máximo cada hora
  };
};

export default function BlogPage({ posts }: BlogProps) {
  return (
    <main>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </main>
  );
}`}</BlogCode>

      <BlogH3 id="ssg-isr">SSG e ISR para datos públicos</BlogH3>

      <BlogP>
        El contenido que no cambia a cada segundo (artículos, documentación,
        landing) se genera estático en build y se sirve desde CDN. Con{" "}
        <BlogInlineCode>revalidate</BlogInlineCode> activas ISR: Next regenera
        la página en segundo plano cuando expira, sin derribar la copia en caché.
      </BlogP>

      <BlogCallout type="info">
        Página estática + revalidación + CDN es la receta de los Core Web Vitals
        para contenido público: el HTML llega casi sin coste de servidor y el
        TTFB se reduce drásticamente.
      </BlogCallout>

      <BlogH3 id="streams">Streams y rendering progresivo</BlogH3>

      <BlogP>
        El streaming envía el HTML por partes: el shell de la página aparece al
        instante y las secciones lentas (una lista de datos, un widget) llegan
        cuando están listas. El usuario ve contenido en cuanto existe, en lugar
        de esperar a que todo el documento termine de generarse. El patrón
        moderno en App Router son los{" "}
        <BlogInlineCode>async</BlogInlineCode> components y{" "}
        <BlogInlineCode>loading.tsx</BlogInlineCode>, que dibujan el placeholder
        del segmento mientras el dato se resuelve.
      </BlogP>

      <BlogH2 id="comparativa">Comparativa final</BlogH2>

      <BlogP>
        La herramienta correcta depende del tipo de dato, no de lo que está de
        moda. Esta es la guía práctica:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Context:</strong> estado compartido que cambia poco — tema,
          idioma, proveedor de auth. Inclusión nativa, sin dependencias.
        </BlogLi>
        <BlogLi>
          <strong>Zustand:</strong> estado de cliente que cambia mucho y se lee
          desde muchos sitios — carrito, sesión activa, UI efímera. Selectores
          finos y persistencia.
        </BlogLi>
        <BlogLi>
          <strong>React Query:</strong> todo lo que viene de una API — caché,
          revalidación, mutaciones, optimistic updates. Nunca guardes datos del
          servidor en Zustand ni en Context.
        </BlogLi>
        <BlogLi>
          <strong>Fetching directo:</strong> datos públicos y mayormente
          estáticos, resueltos en el servidor con SSG/ISR. No necesitas nada
          más.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="tip">
        No hay una sola respuesta: una app real usa los cuatro. Context para el
        tema, Zustand para el carrito, React Query para los productos y SSG para
        la página de inicio. Saber cuándo cada uno es la elección correcta es
        exactamente lo que este tutorial te ha enseñado.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Ejercicios</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Convierte el ejemplo de prop drilling (App → Dashboard → Sidebar → ProfileMenu) en un Context tipado con custom hook. Define la interfaz AuthContextValue y lanza error si el hook se usa fuera del provider."
          hint="createContext<AuthContextValue | null>(null), provider con useState y useMemo, y un useAuth() que valide el contexto."
          level="Básico"
          num={1}
          solution={`import { createContext, useContext, useMemo, useState } from "react";

interface User {
  id: string;
  name: string;
}

interface AuthContextValue {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo<AuthContextValue>(
    () => ({ user, login: setUser, logout: () => setUser(null) }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}`}
          title="Context tipado con custom hook"
        />

        <ExerciseCard
          description="Crea un store Zustand con persist para un contador y un toggle de dark mode. Debe sobrevivir a la recarga del navegador."
          hint="persist con name único, partialize para guardar solo los datos, y selectores finos en el componente."
          level="Básico"
          num={2}
          solution={`import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CounterStore {
  count: number;
  darkMode: boolean;
  increment: () => void;
  toggleDarkMode: () => void;
}

export const useCounterStore = create<CounterStore>()(
  persist(
    (set) => ({
      count: 0,
      darkMode: false,
      increment: () => set((state) => ({ count: state.count + 1 })),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: "counter-storage",
      partialize: (state) => ({ count: state.count, darkMode: state.darkMode }),
    },
  ),
);

// Uso con selectores finos:
// const count = useCounterStore((state) => state.count);
// const toggleDarkMode = useCounterStore((state) => state.toggleDarkMode);`}
          title="Zustand con persist"
        />

        <ExerciseCard
          description="Construye una pantalla de usuarios con React Query: lista con isLoading/isError y refetch, y una query dependiente que carga los posts de un usuario al hacer clic en él."
          hint="queryKey ["users"] para la lista y ["posts", userId] con enabled para los posts."
          level="Intermedio"
          num={3}
          solution={`import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface User { id: number; name: string; }
interface Post { id: number; title: string; }

export function UsersScreen() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error("Error al cargar usuarios");
      return res.json() as Promise<User[]>;
    },
  });

  const postsQuery = useQuery({
    queryKey: ["posts", selectedId],
    queryFn: async () => {
      const res = await fetch(
        \`https://jsonplaceholder.typicode.com/posts?userId=\${selectedId}\`,
      );
      if (!res.ok) throw new Error("Error al cargar posts");
      return res.json() as Promise<Post[]>;
    },
    enabled: selectedId !== null,
  });

  if (usersQuery.isLoading) return <p>Cargando usuarios…</p>;
  if (usersQuery.isError) return <p>Error: {usersQuery.error.message}</p>;

  return (
    <div>
      <ul>
        {usersQuery.data?.map((user) => (
          <li key={user.id}>
            <button onClick={() => setSelectedId(user.id)}>{user.name}</button>
          </li>
        ))}
      </ul>
      {postsQuery.isLoading && <p>Cargando posts…</p>}
      {postsQuery.data?.map((post) => <p key={post.id}>{post.title}</p>)}
    </div>
  );
}`}
          title="Query dependiente"
        />

        <ExerciseCard
          description="Implementa una mutación optimista para marcar notificaciones como leídas. La UI cambia al instante, y si la petición falla se revierte el estado anterior."
          hint="onMutate guarda previous y aplica el cambio con setQueryData; onError restaura; onSettled invalida."
          level="Avanzado"
          num={4}
          solution={`import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Notification { id: string; read: boolean; }

export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(\`/api/notifications/\${id}/read\`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Error al marcar como leída");
      return res.json();
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });
      const previous = queryClient.getQueryData<Notification[]>([
        "notifications",
      ]);

      queryClient.setQueryData<Notification[]>(["notifications"], (old) =>
        old?.map((n) => (n.id === id ? { ...n, read: true } : n)),
      );

      return { previous };
    },
    onError: (_error, _id, context) => {
      queryClient.setQueryData(["notifications"], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}`}
          title="Optimistic update"
        />

        <ExerciseCard
          description="Divide un store Zustand grande en dos slices: un slice de usuario (nombre y email) y un slice de preferencias (notificaciones activadas). Combínalos en un único store tipado."
          hint="Cada slice es un StateCreator que recibe set. El store final las une con spread sobre create."
          level="Avanzado"
          num={5}
          solution={`import { create } from "zustand";

interface UserSlice {
  name: string;
  email: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
}

const createUserSlice: (set: StoreSet) => UserSlice = (set) => ({
  name: "",
  email: "",
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
});

interface SettingsSlice {
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
}

const createSettingsSlice: (set: StoreSet) => SettingsSlice = (set) => ({
  notificationsEnabled: true,
  toggleNotifications: () =>
    set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
});

type AppStore = UserSlice & SettingsSlice;
type StoreSet = (partial: Partial<AppStore> | ((state: AppStore) => Partial<AppStore>)) => void;

export const useAppStore = create<AppStore>()((...args) => ({
  ...createUserSlice(...args),
  ...createSettingsSlice(...args),
}));

// Uso:
// const name = useAppStore((state) => state.name);
// const toggleNotifications = useAppStore((state) => state.toggleNotifications);`}
          title="Slices en Zustand"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        El estado global y el data fetching no son un problema de "qué librería
        uso", sino de clasificar los datos: los que cambian poco (Context), los
        que cambian mucho en el cliente (Zustand) y los que vienen de una API
        (React Query o el servidor de Next.js). Con esa clasificación clara,
        cada decisión de arquitectura se responde sola.
      </BlogP>
    </article>
  );
}
