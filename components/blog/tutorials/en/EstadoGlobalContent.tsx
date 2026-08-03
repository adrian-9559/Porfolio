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
  level: "Easy" | "Intermediate" | "Hard";
  description: string;
  hint?: string;
  solution?: string;
}) {
  const [open, setOpen] = useState(false);
  const levelColor = {
    Easy: "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
    Intermediate:
      "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
    Hard: "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
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
              <strong>Hint:</strong> {hint}
            </div>
          )}
          {solution && <BlogCode>{solution}</BlogCode>}
        </div>
      )}
    </div>
  );
}

export default function EstadoGlobalContentEn() {
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
        Global state and data fetching
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        As an app grows, passing data from component to component becomes a
        pain: endless props, unexpected re-renders, and duplicated logic. This
        tutorial covers global state with Context and Zustand, the data layer
        with React Query, and when to delegate fetching to Next.js.
        Prerequisites: React (hooks and components) and basic API consumption.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="por-que">Why global state?</BlogH2>

      <BlogP>
        State in React is local by default: it lives inside the component that
        declares it. That is fine while the data is not shared. As soon as two
        components that are not parent-child need the same data, the problem
        begins.
      </BlogP>

      <BlogH3 id="prop-drilling">Prop drilling</BlogH3>

      <BlogP>
        Prop drilling means passing data through every level of the tree even
        when the intermediate levels do not use it, just so it reaches its
        destination:
      </BlogP>

      <BlogCode>{`function App() {
  const [user, setUser] = useState(null);
  return <Dashboard user={user} onLogin={setUser} />;
}

// Dashboard does not use user, it only forwards it…
function Dashboard({ user, onLogin }) {
  return <Sidebar user={user} onLogin={onLogin} />;
}

// …Sidebar neither…
function Sidebar({ user, onLogin }) {
  return <ProfileMenu user={user} onLogin={onLogin} />;
}

// …until it reaches the component that needs it.
function ProfileMenu({ user, onLogin }) {
  return user ? <Avatar user={user} /> : <LoginButton onLogin={onLogin} />;
}`}</BlogCode>

      <BlogP>
        The problems are obvious: intermediate components receive props they do
        not use (they couple to data that does not concern them), any shape
        change forces you to touch the whole chain, and the code screams that
        something is badly designed.
      </BlogP>

      <BlogCallout type="tip">
        Before adding a state library, ask yourself: can I lift the state to a
        common ancestor? Can I restructure the component tree? Many "prop
        drilling" cases are solved by reorganizing components, not by adding
        dependencies.
      </BlogCallout>

      <BlogH3 id="limites-context">The limits of Context</BlogH3>

      <BlogP>
        React's native solution is <BlogInlineCode>Context</BlogInlineCode>: a
        value available to a whole subtree without passing props. Its biggest
        problem is <strong>performance</strong>:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Global re-renders:</strong> every time the context value
          changes, all consumers in the subtree re-render, even those consuming
          a part that did not change.
        </BlogLi>
        <BlogLi>
          <strong>No selectors:</strong> you cannot subscribe to a "slice" of
          the value. Any component using{" "}
          <BlogInlineCode>useContext</BlogInlineCode> depends on the whole
          object.
        </BlogLi>
        <BlogLi>
          <strong>Mixed responsibilities:</strong> if you also put data fetching
          in the provider, every API call re-renders the whole app.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="warn">
        The famous "Context boilerplate" is not Context itself, but the{" "}
        <BlogInlineCode>useMemo</BlogInlineCode> you need to avoid unnecessary
        re-renders every time the provider renders. With frequently changing
        values (session, cart), that cost adds up.
      </BlogCallout>

      <BlogH3 id="cuando-store">When you need a store</BlogH3>

      <BlogP>
        An external store (Zustand, Redux, Jotai) provides what Context lacks:
        fine-grained selectors, per-slice subscriptions, and middleware
        (persistence, devtools). Consider it when:
      </BlogP>

      <BlogUl>
        <BlogLi>
          The state is <strong>truly global</strong>: session, theme, cart,
          preferences. Not an isolated piece of one screen.
        </BlogLi>
        <BlogLi>
          Many components read the same data and only a fraction should
          re-render when it changes.
        </BlogLi>
        <BlogLi>
          You need <strong>persistence</strong> (localStorage, sessionStorage)
          or debugging tools with time travel.
        </BlogLi>
        <BlogLi>
          The mutation logic is complex and you want to isolate it in testable
          actions.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="info">
        Practical rule: <strong>Context for state that rarely changes</strong>{" "}
        (theme, language, data provider), <strong>a store for shared state that
        changes often</strong> (session, cart, ephemeral UI), and{" "}
        <strong>React Query for server state</strong> (whatever comes from an
        API). This distinction is the heart of this tutorial.
      </BlogCallout>

      <BlogH2 id="context-avanzado">Advanced Context API</BlogH2>

      <BlogP>
        Context is not bad: it is the right mechanism for certain cases. The
        key is using it well: typing, a dedicated provider, a custom hook, and
        memoization.
      </BlogP>

      <BlogH3 id="context-tipado">Typed context</BlogH3>

      <BlogP>
        The context value is declared with an explicit interface. The{" "}
        <BlogInlineCode>createContext</BlogInlineCode> hook receives a default
        value that, since it should never be used, is declared as{" "}
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

// null because the real value only exists inside the provider
export const AuthContext = createContext<AuthContextValue | null>(null);`}</BlogCode>

      <BlogH3 id="provider-hook">Provider and custom hook</BlogH3>

      <BlogP>
        The provider keeps the state with <BlogInlineCode>useState</BlogInlineCode>{" "}
        and exposes its own hook that throws a clear error if used outside the
        tree:
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
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}`}</BlogCode>

      <BlogCallout type="tip">
        The custom hook error is your best friend: it turns a silent failure
        (the <BlogInlineCode>null</BlogInlineCode> context) into a message that
        says exactly which component is misplaced.
      </BlogCallout>

      <BlogH3 id="usememo">useMemo and re-renders</BlogH3>

      <BlogP>
        Without <BlogInlineCode>useMemo</BlogInlineCode>, every provider render
        would create a <strong>new object</strong> for{" "}
        <BlogInlineCode>value</BlogInlineCode>, and the context would notify all
        its consumers even when the state did not change. That memoization is
        what separates a correct provider from one that slows the app down:
      </BlogP>

      <BlogCode>{`const value = useMemo<AuthContextValue>(
  () => ({ user, login: (u) => setUser(u), logout: () => setUser(null) }),
  [user], // only changes when user changes
);`}</BlogCode>

      <BlogP>
        Even so, every context consumer re-renders when{" "}
        <BlogInlineCode>user</BlogInlineCode> changes, whether or not it reads{" "}
        <BlogInlineCode>user</BlogInlineCode>. That is inherent to how Context
        works.
      </BlogP>

      <BlogH3 id="limites">Limits of Context</BlogH3>

      <BlogP>
        Context does not scale for high-frequency state (mouse position, editor
        content, websockets with constant updates). For those cases you need
        selective subscriptions, and that is where stores with selectors come
        in. A clear sign that Context is not enough: you find yourself creating
        five different contexts just to split the state and reduce re-renders.
      </BlogP>

      <BlogCallout type="warn">
        Do not use Context to cache server data. A provider that{" "}
        <BlogInlineCode>fetch</BlogInlineCode>es on mount and stores the result
        in <BlogInlineCode>useState</BlogInlineCode> gives you neither caching,
        nor retries, nor request deduplication. That job belongs to React Query.
      </BlogCallout>

      <BlogH2 id="zustand">Zustand</BlogH2>

      <BlogP>
        Zustand is a minimal store built on React: you create state with{" "}
        <BlogInlineCode>create</BlogInlineCode>, read it with hooks, and modify
        it with actions. It requires no provider and re-renders are limited to
        the components using the right selector.
      </BlogP>

      <BlogH3 id="instalacion-zustand">Installation</BlogH3>

      <BlogCode>{`npm install zustand`}</BlogCode>

      <BlogH3 id="create">create: state and actions</BlogH3>

      <BlogP>
        The store is defined outside the component. The{" "}
        <BlogInlineCode>set</BlogInlineCode> function lets you update the whole
        state or apply a function over the current state:
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
        In the component, the hook returns a slice of the state. Each property
        you select is a separate subscription:
      </BlogP>

      <BlogCode>{`// CartButton.tsx
import { useCartStore } from "./cart-store";

export function CartButton() {
  // only re-renders when items changes
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button onClick={() => addItem({ id: "p1", name: "T-shirt", price: 19 })}>
      Add (there are {items.length} in the cart)
    </button>
  );
}`}</BlogCode>

      <BlogH3 id="selectores">Selectors</BlogH3>

      <BlogP>
        The selector determines the subscription: it returns the smallest slice
        of state the component needs. The finer it is, the fewer re-renders:
      </BlogP>

      <BlogCode>{`// Good: fine subscription, re-renders only if the name changes
const name = useCartStore((state) => state.user.name);

// Bad: subscribes to a new object on every change
const user = useCartStore((state) => state.user);`}</BlogCode>

      <BlogCallout type="warn">
        Never select a whole object that gets rebuilt on every change. If the
        selector returns an object literal or a <BlogInlineCode>.filter()</BlogInlineCode>,{" "}
        Zustand compares references with{" "}
        <BlogInlineCode>Object.is</BlogInlineCode> and sees a "different" value
        on every render, causing an infinite loop. To derive data, use{" "}
        <BlogInlineCode>useShallow</BlogInlineCode>:
      </BlogCallout>

      <BlogCode>{`import { useShallow } from "zustand/react/shallow";

// Combines several fields without excessive re-renders
const { name, isAdmin } = useCartStore(
  useShallow((state) => ({
    name: state.user.name,
    isAdmin: state.user.role === "admin",
  })),
);`}</BlogCode>

      <BlogH3 id="slices">Slices: splitting the store into modules</BlogH3>

      <BlogP>
        When the store grows, you split it into <strong>slices</strong>: each
        slice is a function that receives <BlogInlineCode>set</BlogInlineCode>{" "}
        (and <BlogInlineCode>get</BlogInlineCode>) and returns its part of the
        state. The final store combines them:
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

// store.ts — combines the slices
type AppStore = UserSlice & SettingsSlice;

export const useAppStore = create<AppStore>()((...args) => ({
  ...createUserSlice(...args),
  ...createSettingsSlice(...args),
}));`}</BlogCode>

      <BlogH3 id="persist">The persist middleware</BlogH3>

      <BlogP>
        The <BlogInlineCode>persist</BlogInlineCode> middleware saves the state
        in <BlogInlineCode>localStorage</BlogInlineCode> and rehydrates it on
        reload. You only indicate which fields to persist:
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
      name: "theme-storage", // localStorage key
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);`}</BlogCode>

      <BlogCallout type="tip">
        <BlogInlineCode>partialize</BlogInlineCode> avoids persisting functions
        (actions) and sensitive data. For large or slow values, switch the
        storage to{" "}
        <BlogInlineCode>createJSONStorage(() => sessionStorage)</BlogInlineCode>{" "}
        or a custom storage.
      </BlogCallout>

      <BlogH2 id="react-query">React Query (TanStack Query)</BlogH2>

      <BlogP>
        React Query (now TanStack Query) solves{" "}
        <strong>server state</strong>: caching, revalidation, retries, and UI
        synchronization. It is orthogonal to Zustand: Zustand stores client
        state, React Query stores API responses.
      </BlogP>

      <BlogH3 id="queryclient">QueryClient and provider</BlogH3>

      <BlogP>
        The <BlogInlineCode>QueryClient</BlogInlineCode> is created once and
        shared through <BlogInlineCode>QueryClientProvider</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`// providers.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  // lazy useState: a single instance per mount
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
}`}</BlogCode>

      <BlogH3 id="usequery">useQuery</BlogH3>

      <BlogP>
        <BlogInlineCode>useQuery</BlogInlineCode> receives a{" "}
        <BlogInlineCode>queryKey</BlogInlineCode> (it identifies the cache) and
        a <BlogInlineCode>queryFn</BlogInlineCode> (it returns a promise). The
        cache makes two components with the same key share the same request:
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
  if (!res.ok) throw new Error("Failed to load posts");
  return res.json();
}

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 60_000,  // 60s without refetch
    gcTime: 5 * 60_000, // 5min until it is cleaned from the cache
  });
}`}</BlogCode>

      <BlogP>
        The query returns state flags that drive the UI:
      </BlogP>

      <BlogCode>{`// PostList.tsx
export function PostList() {
  const { data, isLoading, isError, error, refetch } = usePosts();

  if (isLoading) return <p>Loading posts…</p>;
  if (isError) return (
    <div>
      <p>Error: {error.message}</p>
      <button onClick={() => refetch()}>Retry</button>
    </div>
  );

  return (
    <ul>
      {data?.map((post) => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}`}</BlogCode>

      <BlogCallout type="info">
        <BlogInlineCode>staleTime</BlogInlineCode> and{" "}
        <BlogInlineCode>gcTime</BlogInlineCode> are not the same:{" "}
        <strong>stale</strong> is how long the data is considered fresh (no
        revalidation when you return to the screen); <strong>gcTime</strong> is
        how long it survives in cache without consumers. "Stale" data is still
        shown and revalidated in the background.
      </BlogCallout>

      <BlogH3 id="usemutation">useMutation and invalidation</BlogH3>

      <BlogP>
        For writes (POST, PUT, DELETE) you use{" "}
        <BlogInlineCode>useMutation</BlogInlineCode>. When it finishes,{" "}
        <BlogInlineCode>invalidateQueries</BlogInlineCode> marks the query as
        stale and refetches it with fresh data:
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
  if (!res.ok) throw new Error("Could not create the post");
  return res.json();
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // ["posts"] becomes stale → automatic refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}`}</BlogCode>

      <BlogH3 id="optimistic">Optimistic updates</BlogH3>

      <BlogP>
        In an optimistic mutation, the UI reflects the change instantly and
        rolls it back if it fails. The pattern: cancel in-flight queries, save
        the previous value, apply the change, and restore it on error:
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
      if (!res.ok) throw new Error("Failed to update");
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
        Optimistic updates only make sense when the operation is{" "}
        <strong>idempotent</strong> and almost never fails (toggle, like,
        favorite). For operations with complex server-side validation, an honest
        loading state with <BlogInlineCode>isPending</BlogInlineCode> is better
        than a UI that lies.
      </BlogCallout>

      <BlogH3 id="dependencias">Queries with dependencies</BlogH3>

      <BlogP>
        Parameters become part of the <BlogInlineCode>queryKey</BlogInlineCode>{" "}
        and the query is disabled with <BlogInlineCode>enabled</BlogInlineCode>{" "}
        until the data is ready:
      </BlogP>

      <BlogCode>{`// use-posts-by-user.ts
import { useQuery } from "@tanstack/react-query";

export function usePostsByUser(userId: string | null) {
  return useQuery({
    queryKey: ["posts", userId],
    queryFn: async () => {
      const res = await fetch(\`/api/users/\${userId}/posts\`);
      if (!res.ok) throw new Error("Failed to load posts");
      return res.json();
    },
    enabled: userId !== null, // does not fire the request without userId
  });
}`}</BlogCode>

      <BlogH3 id="paginacion">Pagination with placeholderData</BlogH3>

      <BlogP>
        In pagination, <BlogInlineCode>placeholderData</BlogInlineCode> keeps
        the previous page visible while the new one loads, without skeleton
        flicker:
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
    // keeps the previous page as placeholder
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
        Previous
      </button>
      <button
        disabled={isPlaceholderData || page === data?.totalPages}
        onClick={() => setPage((p) => p + 1)}
      >
        Next
      </button>
    </div>
  );
}`}</BlogCode>

      <BlogCallout type="tip">
        Disabling the "Next" button with{" "}
        <BlogInlineCode>isPlaceholderData</BlogInlineCode> prevents the user
        from skipping two pages at once while the previous one is still cached.
      </BlogCallout>

      <BlogH2 id="nextjs">Data fetching in Next.js</BlogH2>

      <BlogP>
        Next.js adds another dimension: deciding <strong>where</strong> the
        fetching happens. On the server, on the client, or both depending on
        the nature of the data.
      </BlogP>

      <BlogH3 id="servidor-vs-cliente">Server vs client</BlogH3>

      <BlogUl>
        <BlogLi>
          <strong>Server:</strong> public data or per-user data (in your own
          database) is fetched at build time or per request. Benefits: zero
          extra network latency, better SEO and LCP, no loading states.
        </BlogLi>
        <BlogLi>
          <strong>Client:</strong> private third-party data, real-time actions,
          or queries that depend on user interaction go with React Query, which
          also caches and revalidates them.
        </BlogLi>
      </BlogUl>

      <BlogP>
        In the pages router, server-side fetching is declared in the page with{" "}
        <BlogInlineCode>getStaticProps</BlogInlineCode> (static) or{" "}
        <BlogInlineCode>getServerSideProps</BlogInlineCode> (per request):
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
    revalidate: 3600, // ISR: regenerates at most once an hour
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

      <BlogH3 id="ssg-isr">SSG and ISR for public data</BlogH3>

      <BlogP>
        Content that does not change every second (articles, documentation,
        landing pages) is statically generated at build time and served from a
        CDN. With <BlogInlineCode>revalidate</BlogInlineCode> you enable ISR:
        Next regenerates the page in the background when it expires, without
        taking the cached copy down.
      </BlogP>

      <BlogCallout type="info">
        Static page + revalidation + CDN is the Core Web Vitals recipe for
        public content: the HTML arrives almost without server cost and the
        TTFB drops drastically.
      </BlogCallout>

      <BlogH3 id="streams">Streams and progressive rendering</BlogH3>

      <BlogP>
        Streaming sends the HTML in parts: the page shell appears instantly and
        slow sections (a data list, a widget) arrive when they are ready. The
        user sees content as soon as it exists, instead of waiting for the whole
        document to finish. The modern pattern in the App Router is{" "}
        <BlogInlineCode>async</BlogInlineCode> components and{" "}
        <BlogInlineCode>loading.tsx</BlogInlineCode>, which draw the segment
        placeholder while the data resolves.
      </BlogP>

      <BlogH2 id="comparativa">Final comparison</BlogH2>

      <BlogP>
        The right tool depends on the type of data, not on what is trendy. This
        is the practical guide:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Context:</strong> shared state that rarely changes — theme,
          language, auth provider. Native, no dependencies.
        </BlogLi>
        <BlogLi>
          <strong>Zustand:</strong> client state that changes often and is read
          from many places — cart, active session, ephemeral UI. Fine selectors
          and persistence.
        </BlogLi>
        <BlogLi>
          <strong>React Query:</strong> everything that comes from an API —
          cache, revalidation, mutations, optimistic updates. Never store server
          data in Zustand or Context.
        </BlogLi>
        <BlogLi>
          <strong>Direct fetching:</strong> public, mostly static data, resolved
          on the server with SSG/ISR. You need nothing else.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="tip">
        There is no single answer: a real app uses all four. Context for the
        theme, Zustand for the cart, React Query for the products, and SSG for
        the home page. Knowing when each one is the right choice is exactly
        what this tutorial taught you.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Exercises</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Convert the prop drilling example (App → Dashboard → Sidebar → ProfileMenu) into a typed Context with a custom hook. Define the AuthContextValue interface and throw an error if the hook is used outside the provider."
          hint="createContext<AuthContextValue | null>(null), a provider with useState and useMemo, and a useAuth() that validates the context."
          level="Easy"
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
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}`}
          title="Typed Context with custom hook"
        />

        <ExerciseCard
          description="Create a Zustand store with persist for a counter and a dark mode toggle. It must survive a browser reload."
          hint="persist with a unique name, partialize to save only the data, and fine selectors in the component."
          level="Easy"
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

// Usage with fine selectors:
// const count = useCounterStore((state) => state.count);
// const toggleDarkMode = useCounterStore((state) => state.toggleDarkMode);`}
          title="Zustand with persist"
        />

        <ExerciseCard
          description="Build a users screen with React Query: a list with isLoading/isError and refetch, and a dependent query that loads a user's posts when you click on them."
          hint="queryKey ["users"] for the list and ["posts", userId] with enabled for the posts."
          level="Intermediate"
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
      if (!res.ok) throw new Error("Failed to load users");
      return res.json() as Promise<User[]>;
    },
  });

  const postsQuery = useQuery({
    queryKey: ["posts", selectedId],
    queryFn: async () => {
      const res = await fetch(
        \`https://jsonplaceholder.typicode.com/posts?userId=\${selectedId}\`,
      );
      if (!res.ok) throw new Error("Failed to load posts");
      return res.json() as Promise<Post[]>;
    },
    enabled: selectedId !== null,
  });

  if (usersQuery.isLoading) return <p>Loading users…</p>;
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
      {postsQuery.isLoading && <p>Loading posts…</p>}
      {postsQuery.data?.map((post) => <p key={post.id}>{post.title}</p>)}
    </div>
  );
}`}
          title="Dependent query"
        />

        <ExerciseCard
          description="Implement an optimistic mutation to mark notifications as read. The UI changes instantly, and if the request fails the previous state is restored."
          hint="onMutate saves previous and applies the change with setQueryData; onError restores; onSettled invalidates."
          level="Hard"
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
      if (!res.ok) throw new Error("Failed to mark as read");
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
          description="Split a large Zustand store into two slices: a user slice (name and email) and a preferences slice (notifications enabled). Combine them into a single typed store."
          hint="Each slice is a StateCreator that receives set. The final store joins them with spread over create."
          level="Hard"
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

// Usage:
// const name = useAppStore((state) => state.name);
// const toggleNotifications = useAppStore((state) => state.toggleNotifications);`}
          title="Zustand slices"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        Global state and data fetching are not a "which library do I use"
        problem, but one of classifying data: the things that rarely change
        (Context), the things that change often on the client (Zustand), and
        the things that come from an API (React Query or the Next.js server).
        With that classification clear, every architecture decision answers
        itself.
      </BlogP>
    </article>
  );
}
