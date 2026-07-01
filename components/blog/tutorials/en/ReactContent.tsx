"use client";
import { useState } from "react";

import {
  BlogCode,
  BlogH2,
  BlogH3,
  BlogP,
  BlogCallout,
} from "@/components/blog/shared";

type SectionId =
  | "intro"
  | "componentes"
  | "hooks"
  | "routing"
  | "estado"
  | "optimizacion"
  | "proyecto-final"
  | "ejercicios";

interface SectionDef {
  id: SectionId;
  label: string;
}
const SECTIONS: SectionDef[] = [
  { id: "intro", label: "1. Introduction" },
  { id: "componentes", label: "2. Components" },
  { id: "hooks", label: "3. Hooks" },
  { id: "routing", label: "4. Routing" },
  { id: "estado", label: "5. Global State" },
  { id: "optimizacion", label: "6. Optimization" },
  { id: "proyecto-final", label: "Final Project" },
  { id: "ejercicios", label: "Exercises" },
];

function SectionIntro() {
  return (
    <>
      <BlogH2>Introduction to React</BlogH2>
      <BlogP>
        React is a JavaScript library developed by Meta for building user
        interfaces. Its model is based on reusable components and
        unidirectional data flow. Version 18 introduced concurrency, and
        React 19 brings server hooks and actions.
      </BlogP>
      <BlogCode>{`# Create a project with Vite (recommended)
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev

# Or with Next.js (full-stack)
npx create-next-app@latest my-app --typescript --tailwind`}</BlogCode>
      <BlogH3>JSX</BlogH3>
      <BlogP>
        JSX is syntactic sugar over <code>React.createElement</code>. It allows
        writing HTML inside JavaScript in an expressive way.
      </BlogP>
      <BlogCode>{`// JSX compiles to React.createElement(...)
function Greeting({ name }: { name: string }) {
  const isAdmin = name === "admin";
  return (
    <div className="greeting">
      <h1>Hello, {name}</h1>
      {isAdmin && <span className="badge">Admin</span>}
      <p>Time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}

// Equivalent without JSX (don't use this directly)
React.createElement("div", { className: "greeting" },
  React.createElement("h1", null, "Hello, ", name)
)`}</BlogCode>
    </>
  );
}

function SectionComponentes() {
  return (
    <>
      <BlogH2>Components</BlogH2>
      <BlogH3>Props and children</BlogH3>
      <BlogP>
        Props are the way to pass data from a parent component to a child one.
        They are immutable inside the child. <code>children</code> is a special
        prop that contains the nested content.
      </BlogP>
      <BlogCode>{`// Typing props with TypeScript
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
}`}</BlogCode>
      <BlogH3>Rendering lists</BlogH3>
      <BlogCode>{`interface Product { id: number; name: string; price: number; }

function ProductList({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <p className="text-gray-500">No products</p>;
  }

  return (
    <ul className="divide-y">
      {products.map(product => (
        // key must be unique and stable (do not use index)
        <li key={product.id} className="flex justify-between py-2">
          <span>{product.name}</span>
          <span className="font-bold">{product.price.toFixed(2)}€</span>
        </li>
      ))}
    </ul>
  );
}`}</BlogCode>
      <BlogCallout type="warn">
        Never use the array index as <code>key</code> if the list can
        be reordered or filtered. Use a unique stable identifier.
      </BlogCallout>
    </>
  );
}

function SectionHooks() {
  return (
    <>
      <BlogH2>Hooks</BlogH2>
      <BlogH3>useState and useEffect</BlogH3>
      <BlogCode>{`import { useState, useEffect } from "react";

function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Effect runs on mount and when userId changes
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(\`/api/users/\${userId}\`)
      .then(r => r.json())
      .then(data => {
        if (!cancelled) {
          setUser(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    // Cleanup: cancel update if component unmounts
    return () => { cancelled = true; };
  }, [userId]); // dependencies

  if (loading) return <p>Loading...</p>;
  if (error)   return <p>Error: {error}</p>;
  if (!user)   return null;
  return <div>{user.name}</div>;
}`}</BlogCode>
      <BlogH3>useMemo and useCallback</BlogH3>
      <BlogCode>{`import { useState, useMemo, useCallback } from "react";

function Dashboard({ data }: { data: number[] }) {
  const [filter, setFilter] = useState(0);

  // useMemo: memoizes a computed value
  const stats = useMemo(() => {
    const filtered = data.filter(n => n > filter);
    return {
      total: filtered.length,
      sum:   filtered.reduce((a, b) => a + b, 0),
      average: filtered.length > 0
        ? filtered.reduce((a, b) => a + b, 0) / filtered.length
        : 0,
    };
  }, [data, filter]); // only recalculates when these change

  // useCallback: memoizes a function
  const handleFilter = useCallback((value: number) => {
    setFilter(value);
  }, []); // no dependencies: function never changes

  return (
    <div>
      <input type="number" onChange={e => handleFilter(Number(e.target.value))} />
      <p>Total: {stats.total}</p>
      <p>Average: {stats.average.toFixed(2)}</p>
    </div>
  );
}`}</BlogCode>
      <BlogCallout type="tip">
        <code>useMemo</code> and <code>useCallback</code> are optimizations: only
        use them when you have measurable performance problems. Code without
        them is simpler.
      </BlogCallout>
    </>
  );
}

function SectionRouting() {
  return (
    <>
      <BlogH2>Routing with React Router</BlogH2>
      <BlogCode>{`// main.tsx
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/blog"      element={<Blog />} />
        <Route path="/blog/:id"  element={<Article />} />
        <Route path="/contact"   element={<Contact />} />
        <Route path="*"          element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}`}</BlogCode>
      <BlogCode>{`// Dynamic route with parameters
function Article() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(\`/api/articles/\${id}\`)
      .then(r => r.json())
      .then(setArticle);
  }, [id]);

  return (
    <article>
      <button onClick={() => navigate(-1)}>← Back</button>
      <h1>{article?.title}</h1>
      <p>{article?.content}</p>
    </article>
  );
}`}</BlogCode>
    </>
  );
}

function SectionEstado() {
  return (
    <>
      <BlogH2>Global state with Context API</BlogH2>
      <BlogP>
        Context API allows sharing state between components without passing
        props manually at every level of the tree (prop drilling).
      </BlogP>
      <BlogCode>{`// context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface User { id: number; name: string; role: string; }
interface AuthContextType {
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login  = (u: User) => setUser(u);
  const logout = () => setUser(null);
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to consume the context
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}`}</BlogCode>
      <BlogCode>{`// Using the context in any component
function NavBar() {
  const { user, logout, isAdmin } = useAuth();

  return (
    <nav>
      {user ? (
        <>
          <span>Hello, {user.name}</span>
          {isAdmin && <Link to="/admin">Admin Panel</Link>}
          <button onClick={logout}>Sign out</button>
        </>
      ) : (
        <Link to="/login">Sign in</Link>
      )}
    </nav>
  );
}`}</BlogCode>
    </>
  );
}

function SectionOptimizacion() {
  return (
    <>
      <BlogH2>Render optimization</BlogH2>
      <BlogH3>React.memo</BlogH3>
      <BlogP>
        <code>React.memo</code> prevents a component from re-rendering if its
        props have not changed. Useful for expensive child components to
        render.
      </BlogP>
      <BlogCode>{`import { memo, useState } from "react";

// Without memo: re-renders every time the parent re-renders
function RawListItem({ item, onDelete }: ItemProps) {
  console.log("render", item.id);
  return (
    <li>
      {item.name}
      <button onClick={() => onDelete(item.id)}>✕</button>
    </li>
  );
}

// With memo: only re-renders if item or onDelete change
const ListItem = memo(function ListItem({ item, onDelete }: ItemProps) {
  console.log("render", item.id);
  return (
    <li>
      {item.name}
      <button onClick={() => onDelete(item.id)}>✕</button>
    </li>
  );
});

function List({ items }: { items: Item[] }) {
  const [counter, setCounter] = useState(0);

  // useCallback so that the onDelete reference is stable
  const handleDelete = useCallback((id: number) => {
    // delete logic...
  }, []);

  return (
    <div>
      <button onClick={() => setCounter(c => c + 1)}>
        Counter: {counter}
      </button>
      <ul>
        {items.map(item => (
          <ListItem key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}`}</BlogCode>
      <BlogCallout type="warn">
        <code>React.memo</code> does a shallow comparison of props. If you
        pass new objects or functions on each render, memo will not help.
        Combine it with <code>useCallback</code> and <code>useMemo</code>.
      </BlogCallout>
    </>
  );
}

function SectionProyecto() {
  return (
    <>
      <BlogH2>Final Project: Stateful Dashboard</BlogH2>
      <BlogP>
        Full dashboard with Context API for task management. Includes
        filters, statistics, and localStorage persistence.
      </BlogP>
      <BlogCode>{`// hooks/useTasks.ts
import { useState, useEffect, useCallback } from "react";

export interface Task {
  id: number; title: string; completed: boolean; priority: "high" | "medium" | "low";
}

const STORAGE_KEY = "dashboard-tasks";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // Auto-persist changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const add = useCallback((title: string, priority: Task["priority"]) => {
    setTasks(prev => [...prev, { id: Date.now(), title, completed: false, priority }]);
  }, []);

  const toggleComplete = useCallback((id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }, []);

  const remove = useCallback((id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  return { tasks, add, toggleComplete, remove };
}`}</BlogCode>
      <BlogCode>{`// components/Dashboard.tsx
import { useState, useMemo } from "react";
import { useTasks } from "../hooks/useTasks";

type Filter = "all" | "pending" | "completed";

export function Dashboard() {
  const { tasks, add, toggleComplete, remove } = useTasks();
  const [filter, setFilter] = useState<Filter>("all");
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");

  const filteredTasks = useMemo(() => {
    if (filter === "pending")   return tasks.filter(t => !t.completed);
    if (filter === "completed") return tasks.filter(t => t.completed);
    return tasks;
  }, [tasks, filter]);

  const stats = useMemo(() => ({
    total:     tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending:   tasks.filter(t => !t.completed).length,
  }), [tasks]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      add(newTask.trim(), priority);
      setNewTask("");
    }
  };

  const priorityColors = { high: "text-red-600", medium: "text-amber-600", low: "text-green-600" };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[["Total", stats.total], ["Pending", stats.pending], ["Completed", stats.completed]].map(([label, val]) => (
          <div key={label} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">{val}</div>
            <div className="text-sm text-gray-500">{label}</div>
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input value={newTask} onChange={e => setNewTask(e.target.value)}
          placeholder="New task..." className="flex-1 border rounded-lg px-3 py-2 text-sm" />
        <select value={priority} onChange={e => setPriority(e.target.value as any)}
          className="border rounded-lg px-2 py-2 text-sm">
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">+</button>
      </form>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {(["all", "pending", "completed"] as Filter[]).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={\`text-xs px-3 py-1.5 rounded-lg capitalize \${filter === f ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-500 hover:bg-gray-100"}\`}>
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <ul className="space-y-2">
        {filteredTasks.map(task => (
          <li key={task.id} className="flex items-center gap-3 p-3 border rounded-xl">
            <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id)} />
            <span className={\`flex-1 text-sm \${task.completed ? "line-through text-gray-400" : ""}\`}>
              {task.title}
            </span>
            <span className={\`text-xs font-medium \${priorityColors[task.priority]}\`}>{task.priority}</span>
            <button onClick={() => remove(task.id)} className="text-gray-400 hover:text-red-500 text-xs">✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`}</BlogCode>
      <BlogCallout type="tip">
        For larger projects, consider Zustand or Redux Toolkit instead
        of Context API. They are more efficient and avoid unnecessary re-renders.
      </BlogCallout>
    </>
  );
}

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
  level: "Basic" | "Intermediate" | "Advanced";
  description: string;
  hint?: string;
  solution?: string;
}) {
  const [open, setOpen] = useState(false);
  const levelColor = {
    Basic:
      "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
    Intermediate:
      "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
    Advanced: "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
  }[level];

  return (
    <div className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden">
      <button
        className="w-full px-4 py-3 flex items-center justify-between gap-3 hover:bg-black/3 dark:hover:bg-white/3 transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-cyan-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
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
            <div className="bg-cyan-50 dark:bg-cyan-950/20 rounded-xl px-3 py-2 text-xs text-cyan-800 dark:text-cyan-300">
              <strong>Hint:</strong> {hint}
            </div>
          )}
          {solution && (
            <pre className="bg-[#0d1117] rounded-xl p-4 overflow-x-auto text-xs leading-relaxed my-2">
              <code className="text-[#e6edf3]">{solution.trim()}</code>
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

function SEjercicios() {
  return (
    <>
      <BlogH2>React Exercises</BlogH2>
      <BlogP>
        Practice React concepts with these exercises. Each one builds
        on the previous to consolidate your learning.
      </BlogP>
      <div className="space-y-3 mt-6">
        <ExerciseCard
          description="Create a Counter component that shows a number and has three buttons: Increment, Decrement, and Reset. The number should not go below 0."
          hint="Use useState for the value and Math.max(0, count - 1) to avoid negatives."
          level="Basic"
          num={1}
          solution={`function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-6 text-center">
      <p className="text-5xl font-bold mb-6">{count}</p>
      <div className="flex gap-3 justify-center">
        <button onClick={() => setCount(c => c + 1)}>
          Increment
        </button>
        <button onClick={() => setCount(c => Math.max(0, c - 1))}>
          Decrement
        </button>
        <button onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}`}
          title="Counter with useState"
        />

        <ExerciseCard
          description="Create a task app with: input to add, button to mark as completed (strikethrough), and button to delete each task. Tasks are saved in state."
          hint="State is an array of { id, text, completed } objects. Use map() to render and filter() to delete."
          level="Basic"
          num={2}
          solution={`function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const add = () => {
    if (!input.trim()) return;
    setTasks(t => [...t, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const toggle = (id) =>
    setTasks(t => t.map(t => t.id === id ? {...t, completed: !t.completed} : t));

  const remove = (id) =>
    setTasks(t => t.filter(t => t.id !== id));

  return (
    <div>
      <div>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && add()} />
        <button onClick={add}>Add</button>
      </div>
      <ul>
        {tasks.map(t => (
          <li key={t.id} style={{ textDecoration: t.completed ? "line-through" : "none" }}>
            <span onClick={() => toggle(t.id)}>{t.text}</span>
            <button onClick={() => remove(t.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`}
          title="Task list"
        />

        <ExerciseCard
          description="Create a component that fetches a list of users from jsonplaceholder.typicode.com/users and displays them with name, email, and phone. Show a spinner while loading and handle errors."
          hint="useEffect with empty array [] runs the fetch only on mount. Store { data, loading, error } in state."
          level="Intermediate"
          num={3}
          solution={`function UserList() {
  const [state, setState] = useState({ data: [], loading: true, error: null });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(r => r.json())
      .then(data => setState({ data, loading: false, error: null }))
      .catch(err => setState({ data: [], loading: false, error: err.message }));
  }, []);

  if (state.loading) return <p>Loading...</p>;
  if (state.error) return <p>Error: {state.error}</p>;

  return (
    <ul>
      {state.data.map(u => (
        <li key={u.id}>
          <strong>{u.name}</strong> — {u.email} — {u.phone}
        </li>
      ))}
    </ul>
  );
}`}
          title="Data fetching with useEffect"
        />

        <ExerciseCard
          description="Implement a custom hook useLocalStorage(key, defaultValue) that syncs state with localStorage. Should read the initial value from localStorage and update it on every change."
          hint="Use useState with initializer function to read localStorage on mount, and useEffect to write on every value change."
          level="Intermediate"
          num={4}
          solution={`function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  return [value, setValue];
}

// Usage:
function Preferences() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  return (
    <button onClick={() => setTheme(t => t === "light" ? "dark" : "light")}>
      Current theme: {theme}
    </button>
  );
}`}
          title="Custom hook useLocalStorage"
        />

        <ExerciseCard
          description="Implement a CartContext with operations add(product), remove(id), clear(), and total (calculated price). Use useReducer to handle cart state."
          hint="The reducer handles ADD, REMOVE, and CLEAR actions. Total is calculated with reduce() in the context."
          level="Advanced"
          num={5}
          solution={`const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existing = state.find(p => p.id === action.product.id);
      if (existing) return state.map(p =>
        p.id === action.product.id ? {...p, quantity: p.quantity + 1} : p
      );
      return [...state, { ...action.product, quantity: 1 }];
    }
    case "REMOVE":
      return state.filter(p => p.id !== action.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const total = items.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <CartContext.Provider value={{ items, total, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}`}
          title="Shopping cart Context"
        />
      </div>
    </>
  );
}

export default function ReactContent() {
  const [active, setActive] = useState<SectionId>(SECTIONS[0].id);

  const renderSection = () => {
    switch (active) {
      case "intro":
        return <SectionIntro />;
      case "componentes":
        return <SectionComponentes />;
      case "hooks":
        return <SectionHooks />;
      case "routing":
        return <SectionRouting />;
      case "estado":
        return <SectionEstado />;
      case "optimizacion":
        return <SectionOptimizacion />;
      case "proyecto-final":
        return <SectionProyecto />;
      case "ejercicios":
        return <SEjercicios />;
    }
  };

  return (
    <div className="flex gap-6">
      <nav className="hidden lg:flex flex-col gap-0.5 w-44 flex-shrink-0 sticky top-20 self-start">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={`text-left text-xs px-3 py-1.5 rounded-lg transition-colors ${active === s.id ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-semibold" : "text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"}`}
            onClick={() => setActive(s.id)}
          >
            {s.label}
          </button>
        ))}
      </nav>
      <div className="flex-1 min-w-0 prose-custom">{renderSection()}</div>
    </div>
  );
}
