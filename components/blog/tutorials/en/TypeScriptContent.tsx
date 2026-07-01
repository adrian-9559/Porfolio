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
  | "tipos"
  | "funciones"
  | "interfaces"
  | "generics"
  | "utilidades"
  | "ejercicios";

interface SectionDef {
  id: SectionId;
  label: string;
}
const SECTIONS: SectionDef[] = [
  { id: "intro", label: "1. Introduction" },
  { id: "tipos", label: "2. Basic types" },
  { id: "funciones", label: "3. Functions" },
  { id: "interfaces", label: "4. Interfaces & Types" },
  { id: "generics", label: "5. Generics" },
  { id: "utilidades", label: "6. Utility Types" },
  { id: "ejercicios", label: "Exercises" },
];

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
    "Básico":
      "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
    "Intermedio":
      "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
    "Avanzado": "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
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

function SectionIntro() {
  return (
    <>
      <BlogH2>Introduction to TypeScript</BlogH2>
      <BlogP>
        TypeScript is a superset of JavaScript developed by Microsoft
        that adds <strong>optional static typing</strong>. When compiled,
        it generates standard JavaScript code that can run in any environment.
      </BlogP>
      <BlogP>
        The key is static typing: you can declare the type of each
        variable, function parameter, and return value, and the compiler will
        warn you of errors <em>before</em> executing the code.
      </BlogP>
      <BlogCode>{`// JavaScript (no types)
function sum(a, b) { return a + b; }
sum("hello", 5); // "hello5" — silent bug!

// TypeScript (with types)
function sum(a: number, b: number): number { return a + b; }
sum("hello", 5); // Error: Argument of type 'string' is not assignable to 'number'`}</BlogCode>
      <BlogH3>Why use it?</BlogH3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {[
          {
            icon: "🐛",
            title: "Fewer runtime bugs",
            desc: "Catches errors before executing the code.",
          },
          {
            icon: "🔍",
            title: "Better autocomplete",
            desc: "Your editor understands the code and suggests accurately.",
          },
          {
            icon: "♻️",
            title: "Safe refactoring",
            desc: "Change names and structures with confidence.",
          },
          {
            icon: "📄",
            title: "Implicit documentation",
            desc: "Types document the code by themselves.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50"
          >
            <p className="font-semibold text-blue-900 dark:text-blue-200 text-xs mb-1">
              {item.icon} {item.title}
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-400">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
      <BlogH3>Setup</BlogH3>
      <BlogCode>{`# Install TypeScript
npm install -D typescript
npx tsc --init  # generates tsconfig.json

# Recommended minimal tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,        // enables all strict checks
    "outDir": "./dist",
    "rootDir": "./src"
  }
}`}</BlogCode>
      <BlogCallout type="tip">
        Enable <code>strict: true</code> from the start. It's easier than
        adding it later when you already have a lot of code.
      </BlogCallout>
    </>
  );
}

function SectionTipos() {
  return (
    <>
      <BlogH2>Basic types</BlogH2>
      <BlogP>
        TypeScript has types for all JavaScript primitive values
        plus some language-specific ones.
      </BlogP>
      <BlogCode>{`// Primitives
let name: string = "Ana";
let age: number = 28;
let active: boolean = true;
let nullValue: null = null;
let undefinedVar: undefined = undefined;

// Arrays — two equivalent forms
let numbers: number[] = [1, 2, 3];
let words: Array<string> = ["hello", "world"];

// Tuples — fixed-length and fixed-type array
let point: [number, number] = [10, 20];
let entry: [string, number] = ["age", 28];

// Enum
enum Direction { North, South, East, West }
let heading: Direction = Direction.North;

// Any and Unknown
let anything: any = 42;        // disables typing — avoid
let unknown: unknown = 42;  // safe: must do type guard before using`}</BlogCode>
      <BlogH3>Union Types and Literal Types</BlogH3>
      <BlogCode>{`// Union: accepts multiple types
let id: string | number = "abc123";
id = 42; // also valid

// Literal types: only certain exact values
type Direction = "left" | "right" | "up" | "down";
let movement: Direction = "left";
// movement = "diagonal"; // Error!

// Narrowing — reduce the type within a block
function process(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase(); // TypeScript knows it's string here
  }
  return value.toFixed(2); // knows it's number here
}`}</BlogCode>
      <BlogCallout type="warn">
        Avoid using <code>any</code> — it removes all the benefits of typing. If
        you don't know the type, use <code>unknown</code> and do a type guard.
      </BlogCallout>
    </>
  );
}

function SectionFunciones() {
  return (
    <>
      <BlogH2>Typed functions</BlogH2>
      <BlogP>
        Typing function parameters and return values is where
        TypeScript provides the most value, as it catches errors at the call
        site.
      </BlogP>
      <BlogCode>{`// Normal function
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Optional parameters and default values
function create(name: string, age?: number, role: string = "user") {
  return { name, age: age ?? 0, role };
}

// Rest parameters
function sumAll(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

// Function as type
type Callback = (error: Error | null, result: string) => void;
function execute(cb: Callback) {
  cb(null, "success");
}`}</BlogCode>
      <BlogH3>Overloads</BlogH3>
      <BlogCode>{`// Overloads: same function, different signatures
function process(x: string): string;
function process(x: number): number;
function process(x: string | number): string | number {
  if (typeof x === "string") return x.toUpperCase();
  return x * 2;
}

const a = process("hello"); // string
const b = process(5);      // number`}</BlogCode>
    </>
  );
}

function SectionInterfaces() {
  return (
    <>
      <BlogH2>Interfaces and Type Aliases</BlogH2>
      <BlogP>
        Both allow defining the shape of an object, but they have key
        differences in behavior.
      </BlogP>
      <BlogCode>{`// Interface — extensible with declaration merging
interface User {
  id: number;
  name: string;
  email: string;
  readonly createdAt: Date;  // read-only
  phone?: string;        // optional
}

// Extend interfaces
interface Admin extends User {
  role: "superadmin" | "moderator";
  permissions: string[];
}

// Type alias — more flexible, supports primitives and unions
type ID = string | number;
type Result<T> = { data: T; error: null } | { data: null; error: string };

// Type intersection
type AdminUser = User & { permissions: string[] };`}</BlogCode>
      <BlogH3>Interface or Type?</BlogH3>
      <div className="grid grid-cols-2 gap-3 my-4">
        {[
          {
            label: "Interface",
            items: [
              "Objects and classes",
              "Declaration merging",
              "More readable for APIs",
            ],
          },
          {
            label: "Type",
            items: ["Unions and primitives", "Mapped types", "More flexible"],
          },
        ].map((col, i) => (
          <div
            key={i}
            className="p-3 rounded-xl bg-black/3 dark:bg-white/3 border border-black/8 dark:border-white/8"
          >
            <p className="text-xs font-bold text-[#1d1d1f] dark:text-white mb-2">
              {col.label}
            </p>
            {col.items.map((item) => (
              <p
                key={item}
                className="text-xs text-[#6e6e73] dark:text-[#86868b]"
              >
                • {item}
              </p>
            ))}
          </div>
        ))}
      </div>
      <BlogCallout type="tip">
        Rule of thumb: use <code>interface</code> for public objects of a
        library or API and <code>type</code> for everything else.
      </BlogCallout>
    </>
  );
}

function SectionGenerics() {
  return (
    <>
      <BlogH2>Generics</BlogH2>
      <BlogP>
        Generics allow creating functions, classes, and interfaces that work
        with <strong>any type</strong> while maintaining type safety.
      </BlogP>
      <BlogCode>{`// Basic generic function
function identity<T>(value: T): T { return value; }

const num = identity(42);        // T inferred as number
const str = identity("hello");    // T inferred as string

// With constraints — T must have length
function longer<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}
longer("hello", "world");     // valid
longer([1, 2], [3]);         // valid
// longer(1, 2);              // Error: number has no length

// Generic with multiple parameters
function mapObj<K extends string, V, R>(
  obj: Record<K, V>,
  fn: (v: V) => R
): Record<K, R> {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, fn(v as V)])
  ) as Record<K, R>;
}

// Generic API response — very common pattern
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const res = await fetch(url);
  const data = await res.json() as T;
  return { data, status: res.status, message: "ok" };
}`}</BlogCode>
    </>
  );
}

function SectionUtilidades() {
  return (
    <>
      <BlogH2>Utility Types</BlogH2>
      <BlogP>
        TypeScript includes predefined utility types that transform existing
        types in common ways.
      </BlogP>
      <BlogCode>{`interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Partial<T> — all fields optional (useful for updates)
type UserUpdate = Partial<User>;
// { id?: number; name?: string; email?: string; password?: string }

// Required<T> — all fields required
type UserFull = Required<Partial<User>>;

// Pick<T, K> — select only some fields
type UserPublic = Pick<User, "id" | "name" | "email">;

// Omit<T, K> — exclude fields
type UserWithoutPassword = Omit<User, "password">;

// Readonly<T> — immutable fields
type UserReadonly = Readonly<User>;

// Record<K, V> — typed keys and values
type UserRoles = Record<string, "admin" | "user" | "moderator">;

// ReturnType<T> — return type of a function
function getUser() { return { id: 1, name: "Ana" }; }
type UserType = ReturnType<typeof getUser>; // { id: number; name: string }

// Parameters<T> — parameter types of a function
function login(email: string, password: string): boolean { return true; }
type LoginParams = Parameters<typeof login>; // [string, string]`}</BlogCode>
      <BlogCallout type="tip">
        Utility Types are the key to not repeating definitions. If you find
        yourself copying interfaces, there's probably a Utility Type that
        solves it.
      </BlogCallout>
    </>
  );
}

function SEjercicios() {
  return (
    <>
      <BlogH2>TypeScript Exercises</BlogH2>
      <BlogP>
        Practice the TypeScript type system with these exercises. The
        compiler is your best ally to verify your solutions are correct.
      </BlogP>
      <div className="space-y-3 mt-6">
        <ExerciseCard
          description="Define a Product interface with fields id (number), name (string), price (positive number), stock (integer), and category (literal union: 'electronics' | 'clothing' | 'home'). Create a validateProduct() function that checks if price and stock are valid."
          hint="Types in TypeScript don't validate at runtime — the validation function must do that manually with if/throw."
          level="Básico"
          num={1}
          solution={`interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: "electronics" | "clothing" | "home";
}

function validateProduct(p: Product): void {
  if (p.price <= 0) throw new Error("Price must be greater than 0");
  if (!Number.isInteger(p.stock) || p.stock < 0) throw new Error("Invalid stock");
}

const laptop: Product = {
  id: 1,
  name: "Laptop Pro",
  price: 999.99,
  stock: 5,
  category: "electronics",
};

validateProduct(laptop); // ok
// validateProduct({ ...laptop, price: -10 }); // Error!`}
          title="Product interface with validation"
        />

        <ExerciseCard
          description="Implement a generic function groupBy<T>(array: T[], key: keyof T) that groups array elements by the value of a given property."
          hint="The return type is Record<string, T[]>. Use keyof T to ensure the key exists in the type."
          level="Básico"
          num={2}
          solution={`function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const value = String(item[key]);
    if (!groups[value]) groups[value] = [];
    groups[value].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

const users = [
  { name: "Ana", role: "admin" },
  { name: "Luis", role: "user" },
  { name: "Sara", role: "admin" },
];

const byRole = groupBy(users, "role");
// { admin: [Ana, Sara], user: [Luis] }`}
          title="Generic groupBy function"
        />

        <ExerciseCard
          description="Implement a generic Stack<T> class with methods push(item: T), pop(): T, peek(): T, isEmpty(): boolean, and size: number (getter). Throw a descriptive TypeError if pop/peek is called on an empty stack."
          hint="The internal array should be of type T[]. Use get size() for the getter."
          level="Intermedio"
          num={3}
          solution={`class Stack<T> {
  private data: T[] = [];

  push(item: T): void {
    this.data.push(item);
  }

  pop(): T {
    if (this.isEmpty()) throw new TypeError("Pop on empty stack");
    return this.data.pop()!;
  }

  peek(): T {
    if (this.isEmpty()) throw new TypeError("Peek on empty stack");
    return this.data[this.data.length - 1];
  }

  isEmpty(): boolean {
    return this.data.length === 0;
  }

  get size(): number {
    return this.data.length;
  }
}

const numStack = new Stack<number>();
numStack.push(1);
numStack.push(2);
console.log(numStack.peek());  // 2
console.log(numStack.pop());   // 2
console.log(numStack.size);    // 1`}
          title="Typed generic Stack class"
        />

        <ExerciseCard
          description="Implement a DeepReadonly<T> utility type that makes all fields of an object recursively readonly, including nested objects and arrays."
          hint="Use conditional types with infer to differentiate arrays, objects, and primitives. For arrays use readonly T[]."
          level="Intermedio"
          num={4}
          solution={`type DeepReadonly<T> =
  T extends (infer U)[]
    ? ReadonlyArray<DeepReadonly<U>>
    : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

interface Config {
  server: {
    host: string;
    port: number;
    ssl: boolean;
  };
  database: {
    url: string;
    name: string;
  };
  permissions: string[];
}

type ImmutableConfig = DeepReadonly<Config>;

const config: ImmutableConfig = {
  server: { host: "localhost", port: 3000, ssl: true },
  database: { url: "postgres://...", name: "mydb" },
  permissions: ["read", "write"],
};

// config.server.port = 8080; // Error: readonly!
// config.permissions.push("admin"); // Error: ReadonlyArray!`}
          title="Deep Readonly with recursive types"
        />

        <ExerciseCard
          description="Implement a QueryBuilder<T> that constructs queries fluently and with types. Methods: select(fields: (keyof T)[]), where(field: keyof T, value: T[keyof T]), limit(n: number), build(): string."
          hint="Each method returns this to allow chaining. Store the state internally in private properties."
          level="Avanzado"
          num={5}
          solution={`class QueryBuilder<T extends Record<string, unknown>> {
  private fields: string[] = [];
  private conditions: string[] = [];
  private limitNum: number | null = null;
  private table: string;

  constructor(table: string) {
    this.table = table;
  }

  select(fields: (keyof T)[]): this {
    this.fields = fields as string[];
    return this;
  }

  where(field: keyof T, value: T[keyof T]): this {
    const val = typeof value === "string" ? \`'\${value}'\` : String(value);
    this.conditions.push(\`\${String(field)} = \${val}\`);
    return this;
  }

  limit(n: number): this {
    this.limitNum = n;
    return this;
  }

  build(): string {
    const fields = this.fields.length ? this.fields.join(", ") : "*";
    let query = \`SELECT \${fields} FROM \${this.table}\`;
    if (this.conditions.length) {
      query += \` WHERE \${this.conditions.join(" AND ")}\`;
    }
    if (this.limitNum !== null) {
      query += \` LIMIT \${this.limitNum}\`;
    }
    return query;
  }
}

interface User { id: number; name: string; email: string; active: boolean; }

const query = new QueryBuilder<User>("users")
  .select(["id", "name", "email"])
  .where("active", true)
  .limit(10)
  .build();

// SELECT id, name, email FROM users WHERE active = true LIMIT 10
console.log(query);`}
          title="Typed Builder pattern"
        />
      </div>
    </>
  );
}

export default function TypeScriptContent() {
  const [active, setActive] = useState<SectionId>(SECTIONS[0].id);

  const renderSection = () => {
    switch (active) {
      case "intro":
        return <SectionIntro />;
      case "tipos":
        return <SectionTipos />;
      case "funciones":
        return <SectionFunciones />;
      case "interfaces":
        return <SectionInterfaces />;
      case "generics":
        return <SectionGenerics />;
      case "utilidades":
        return <SectionUtilidades />;
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
      <div className="flex-1 min-w-0">{renderSection()}</div>
    </div>
  );
}
