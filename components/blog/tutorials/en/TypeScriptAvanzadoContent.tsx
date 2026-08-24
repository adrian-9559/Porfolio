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

export default function TypeScriptAvanzadoContentEn() {
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
        Advanced TypeScript: types, generics, and utilities
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        TypeScript is not just "JavaScript with types": its type system is a
        language of its own, able to model unions, infer results, and transform
        types. This tutorial goes deep into narrowing, discriminated unions,
        advanced generics, utility types, mapped types, and how to apply all of
        it to typing React components. Conceptual prerequisite: basic TypeScript
        (interfaces and simple types).
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="narrowing">Narrowing and type guards</BlogH2>

      <BlogP>
        <strong>Narrowing</strong> is the process by which TypeScript reduces a
        variable's type within a block, based on control flow conditions. The
        basic guards: <BlogInlineCode>typeof</BlogInlineCode>,{" "}
        <BlogInlineCode>in</BlogInlineCode>, and{" "}
        <BlogInlineCode>instanceof</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`function processValue(value: string | number | Date) {
  // typeof: narrows primitive types
  if (typeof value === "string") {
    return value.toUpperCase();
  }

  // instanceof: narrows class instances
  if (value instanceof Date) {
    return value.toISOString();
  }

  // after the guards, TS knows only number remains
  return value.toFixed(2);
}

function getName(entity: User | Company) {
  // in: narrows objects by their distinctive property
  if ("email" in entity) {
    return entity.email;
  }
  return entity.taxId;
}`}</BlogCode>

      <BlogCallout type="tip">
        With objects, prefer <BlogInlineCode>in</BlogInlineCode> or a
        discriminant property over <BlogInlineCode>instanceof</BlogInlineCode>{" "}
        (which fails with literal-created objects or data from JSON).
      </BlogCallout>

      <BlogH3 id="predicados">Type predicates (is)</BlogH3>

      <BlogP>
        When a guard is complex, extract it to a function with a{" "}
        <strong>type predicate</strong>: the <BlogInlineCode>is</BlogInlineCode>{" "}
        operator tells TypeScript what type the value has when the function
        returns <BlogInlineCode>true</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`type Product = { id: number; name: string; price: number };
type Offer = Product & { discount: number };

function isOffer(item: Product): item is Offer {
  return "discount" in item;
}

const items: Product[] = getItems();

// Inside the filter, TS already knows 'offer' is Offer
const offers = items.filter(isOffer);
offers.forEach((offer) => {
  console.log(offer.discount); // no type error
});`}</BlogCode>

      <BlogCallout type="warn">
        A type predicate promises TypeScript what your logic must fulfill: if
        the function body is wrong, the errors propagate to everyone who uses
        the predicate. Get it right the first time — no compiler validates the
        promise itself.
      </BlogCallout>

      <BlogP>
        Narrowing also works on unions with literals: comparing a value against
        a concrete literal reduces the rest of the union:
      </BlogP>

      <BlogCode>{`type State = "loading" | "success" | "error";

function render(state: State) {
  if (state === "loading") {
    return <Spinner />;
  }
  if (state === "error") {
    return <ErrorBanner />;
  }
  // here TS infers that state is "success"
  return <Result />;
}`}</BlogCode>

      <BlogH2 id="uniones-discriminadas">
        Discriminated unions and exhaustiveness
      </BlogH2>

      <BlogP>
        A <strong>discriminated union</strong> uses a common literal field (the
        discriminant) to distinguish each variant. It is the standard way to
        model data that can take several shapes:
      </BlogP>

      <BlogCode>{`type Event =
  | { type: "click"; x: number; y: number }
  | { type: "key"; code: string }
  | { type: "scroll"; position: number };

function handleEvent(event: Event) {
  switch (event.type) {
    case "click":
      console.log(event.x, event.y); // TS knows x, y
      break;
    case "key":
      console.log(event.code); // TS knows code
      break;
    case "scroll":
      console.log(event.position); // TS knows position
      break;
  }
}`}</BlogCode>

      <BlogP>
        <strong>Exhaustiveness checking</strong> with the{" "}
        <BlogInlineCode>never</BlogInlineCode> type guarantees that if you add a
        new variant tomorrow, the compiler forces you to handle it. In the
        switch's <BlogInlineCode>default</BlogInlineCode>, the value must be{" "}
        <BlogInlineCode>never</BlogInlineCode>; if it is not, something is
        uncovered:
      </BlogP>

      <BlogCode>{`function handleEvent(event: Event) {
  switch (event.type) {
    case "click":
      return handleClick(event);
    case "key":
      return handleKey(event);
    case "scroll":
      return handleScroll(event);
    default:
      // If you add a variant to Event, this stops compiling
      const never: never = event;
      return never;
  }
}`}</BlogCode>

      <BlogCallout type="info">
        The <BlogInlineCode>never</BlogInlineCode> technique works because{" "}
        <BlogInlineCode>never</BlogInlineCode> is assignable to everything, but
        nothing (except itself) is assignable to{" "}
        <BlogInlineCode>never</BlogInlineCode>. If{" "}
        <BlogInlineCode>event</BlogInlineCode> could still be an unhandled
        variant, the assignment fails and the compiler warns you.
      </BlogCallout>

      <BlogH2 id="generics">Advanced generics</BlogH2>

      <BlogP>
        A <strong>generic</strong> parameterizes a type: the same function or
        type works for many types, and the relationship between parameters is
        preserved. With <strong>constraints</strong> ({" "}
        <BlogInlineCode>extends</BlogInlineCode>) you limit which types it can
        apply to:
      </BlogP>

      <BlogCode>{`function first<T>(list: T[]): T | undefined {
  return list[0];
}

// Constraint: T must have at least 'id'
function findById<T extends { id: number }>(items: T[], id: number) {
  return items.find((item) => item.id === id);
}

findById(
  [{ id: 1, name: "Ana" }, { id: 2, name: "Luis" }],
  2
);`}</BlogCode>

      <BlogP>
        Generics support <strong>multiple parameters</strong> and{" "}
        <strong>default types</strong>:
      </BlogP>

      <BlogCode>{`function pair<A, B>(a: A, b: B): { first: A; second: B } {
  return { first: a, second: b };
}

// Inference at the call site: A = string, B = number
const p = pair("key", 42);

// Default type
function store<T = string>(value: T): void {
  console.log(value);
}`}</BlogCode>

      <BlogP>
        They also apply to <strong>classes</strong> and{" "}
        <strong>interfaces</strong>:
      </BlogP>

      <BlogCode>{`// Generic class: a typed stack
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
const last = numberStack.pop(); // number | undefined

// Generic interface
interface Result<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

const r: Result<User> = { ok: true, data: user }`}</BlogCode>

      <BlogCallout type="tip">
        Inference is your friend: do not write{" "}
        <BlogInlineCode>new Stack&lt;number&gt;()</BlogInlineCode> when the
        context already deduces it. Write the explicit type only when inference
        does not reach the result you want.
      </BlogCallout>

      <BlogH2 id="utility-types">Utility types</BlogH2>

      <BlogP>
        TypeScript ships with predefined types that transform other types. The
        most used in daily work:
      </BlogP>

      <BlogCode>{`interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

// All properties optional
type PartialUser = Partial<User>;

// All required (removes optionality)
type FullUser = Required<User>;

// All read-only
type ImmutableUser = Readonly<User>;

// Only a subset
type Credentials = Pick<User, "email" | "phone">;

// Everything except a subset
type UserWithoutId = Omit<User, "id">;

// Map of keys to a type
type RoleMap = Record<"admin" | "editor" | "reader", boolean>;

// Exclude members of a union
type NoError = Exclude<"a" | "b" | "error", "error">; // "a" | "b"

// Extract members of a union
type OnlyB = Extract<"a" | "b" | 42, string>; // "a" | "b"`}</BlogCode>

      <BlogP>
        The ones used with <strong>functions</strong> and{" "}
        <strong>promises</strong>:
      </BlogP>

      <BlogCode>{`function createUser(name: string, age: number): User {
  // ...
}

// Return type of a function
type Return = ReturnType<typeof createUser>; // User

// Parameters of a function as a tuple
type Params = Parameters<typeof createUser>; // [name: string, age: number]

// Flatten a promise
type Value = Awaited<Promise<Promise<number>>>; // number

// In practice, with async functions
async function loadUser(): Promise<User> {
  return fetch("/api/user").then((r) => r.json());
}
type LoadedUser = Awaited<ReturnType<typeof loadUser>>; // User`}</BlogCode>

      <BlogCallout type="warn">
        Utility types produce <strong>new types</strong>; they do not mutate the
        originals. <BlogInlineCode>Partial&lt;User&gt;</BlogInlineCode> does not
        make <BlogInlineCode>User</BlogInlineCode>'s properties optional: it is
        a derived type that coexists with the original.
      </BlogCallout>

      <BlogH2 id="mapped-types">Mapped types and template literal types</BlogH2>

      <BlogP>
        A <strong>mapped type</strong> iterates over another type's keys and
        produces a new type for each one. The{" "}
        <BlogInlineCode>as</BlogInlineCode> syntax allows{" "}
        <strong>renaming</strong> the keys:
      </BlogP>

      <BlogCode>{`type Config = {
  width: number;
  height: number;
  theme: string;
};

// All keys boolean
type BoolMap = { [K in keyof Config]: boolean };

// All keys suffixed with "Value"
type Values = { [K in keyof Config as \`\${K}Value\`]: Config[K] };
// { widthValue: number; heightValue: number; themeValue: string }

// With '?' everything becomes optional (this is how Partial is built)
type Optional<T> = { [K in keyof T]?: T[K] }`}</BlogCode>

      <BlogCallout type="info">
        The <BlogInlineCode>Values</BlogInlineCode> example uses a{" "}
        <strong>template literal type</strong>: types that build strings from
        other strings. Combining template literals with mapped types lets you
        generate entire type-level APIs from a data model.
      </BlogCallout>

      <BlogH3 id="infer">Conditional types and infer</BlogH3>

      <BlogP>
        A <strong>conditional type</strong> picks one type or another based on a
        condition (<BlogInlineCode>T extends U ? X : Y</BlogInlineCode>). The{" "}
        <BlogInlineCode>infer</BlogInlineCode> keyword extracts a type from
        inside a structure:
      </BlogP>

      <BlogCode>{`// Extract the type of an array
type Element<T> = T extends (infer E)[] ? E : never;

type A = Element<string[]>; // string
type B = Element<number[]>; // number

// Extract the type of a promise
type Unwrap<T> = T extends Promise<infer U> ? U : T;

type C = Unwrap<Promise<boolean>>; // boolean

// Apply recursively
type DeepUnwrap<T> = T extends Promise<infer U>
  ? DeepUnwrap<U>
  : T;

type D = DeepUnwrap<Promise<Promise<string>>>; // string`}</BlogCode>

      <BlogCallout type="tip">
        <BlogInlineCode>ReturnType</BlogInlineCode>,{" "}
        <BlogInlineCode>Parameters</BlogInlineCode>, and{" "}
        <BlogInlineCode>Awaited</BlogInlineCode> are implemented internally with
        conditional types and <BlogInlineCode>infer</BlogInlineCode>. Learning
        to write them lets you create your own utilities.
      </BlogCallout>

      <BlogH2 id="react">Typing in React</BlogH2>

      <BlogH3 id="props">Props with type/interface and children</BlogH3>

      <BlogP>
        The modern way to type a component: define props with{" "}
        <BlogInlineCode>type</BlogInlineCode> (preferred for props) or{" "}
        <BlogInlineCode>interface</BlogInlineCode> (for extension), and use{" "}
        <BlogInlineCode>React.ReactNode</BlogInlineCode> for{" "}
        <BlogInlineCode>children</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant: "primary" | "secondary";
  onClick?: () => void;
};

function Button({ children, variant, onClick }: ButtonProps) {
  return (
    <button className={variant} onClick={onClick}>
      {children}
    </button>
  );
}`}</BlogCode>

      <BlogCallout type="info">
        About <BlogInlineCode>React.FC</BlogInlineCode>: it still exists, but
        the community and the React team recommend typing props directly.
        Reasons: it does not infer <BlogInlineCode>children</BlogInlineCode>{" "}
        implicitly (in React 18 they must be declared), it complicates generics
        and adds verbosity without value. The signature{" "}
        <BlogInlineCode>(props: Props) =&gt; JSX.Element</BlogInlineCode> is the
        current norm.
      </BlogCallout>

      <BlogH3 id="hooks">Typed hooks</BlogH3>

      <BlogP>
        <BlogInlineCode>useState</BlogInlineCode> and{" "}
        <BlogInlineCode>useReducer</BlogInlineCode> accept an explicit generic
        when the state cannot be inferred, or when the initial value does not
        match the full state:
      </BlogP>

      <BlogCode>{`// Inferred
const [count, setCount] = useState(0); // number

// Explicit: state that does not exist yet
const [user, setUser] = useState<User | null>(null);

// Union for loading states
type LoadState = "idle" | "loading" | "success" | "error";
const [state, setState] = useState<LoadState>("idle");

// useReducer with a discriminated union of actions
type Action =
  | { type: "increment"; amount: number }
  | { type: "reset" };

function reducer(count: number, action: Action): number {
  switch (action.type) {
    case "increment":
      return count + action.amount;
    case "reset":
      return 0;
  }
}

const [count, dispatch] = useReducer(reducer, 0);`}</BlogCode>

      <BlogP>
        <strong>Typed contexts</strong> avoid the{" "}
        <BlogInlineCode>undefined</BlogInlineCode> trap and force a default
        value that only exists outside the Provider:
      </BlogP>

      <BlogCode>{`type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

// undefined outside the Provider: it forces us to check in the hook
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return context;
}`}</BlogCode>

      <BlogCallout type="danger">
        Do not define the context with a "fake" default object (like{" "}
        <BlogInlineCode>theme: "light"</BlogInlineCode>) without checking it: it
        hides usage errors outside the Provider. The combination of{" "}
        <BlogInlineCode>undefined</BlogInlineCode> + throw is the canonical
        pattern.
      </BlogCallout>

      <BlogH3 id="as-const-satisfies">as const and satisfies</BlogH3>

      <BlogP>
        <BlogInlineCode>as const</BlogInlineCode> turns literals into read-only
        types, and <BlogInlineCode>satisfies</BlogInlineCode> verifies that a
        value fulfills a type <em>without</em> widening it to that type.
        Together they give the best of both worlds:
      </BlogP>

      <BlogCode>{`// as const: exact, immutable literals
const directions = ["up", "down", "left", "right"] as const;
type Direction = (typeof directions)[number]; // "up" | "down" | ...

// satisfies: validates the shape without losing literal types
const colors = {
  primary: "#2563eb",
  secondary: "#7c3aed",
} as const satisfies Record<string, string>;

colors.primary; // literal "#2563eb", not generic string`}</BlogCode>

      <BlogCallout type="warn">
        <BlogInlineCode>as const</BlogInlineCode> is not a "safe" cast:{" "}
        <BlogInlineCode>as</BlogInlineCode> forces a type and can hide real
        errors if misused. <BlogInlineCode>satisfies</BlogInlineCode> (TS 4.9+)
        exists precisely to validate without forcing. Prefer satisfies over{" "}
        <BlogInlineCode>as</BlogInlineCode> whenever you only want to check.
      </BlogCallout>

      <BlogH2 id="tsconfig">Strict tsconfig</BlogH2>

      <BlogP>
        Configuration is the difference between "types that exist" and "types
        that protect you". These four flags make the biggest difference:
      </BlogP>

      <BlogCode>{`// tsconfig.json
{
  "compilerOptions": {
    // Enables all strict checks at once
    "strict": true,

    // arr[0] is T | undefined: forces checking indexes
    "noUncheckedIndexedAccess": true,

    // optional props do not accept explicit undefined
    "exactOptionalPropertyTypes": true,

    // separates type imports from value imports
    "verbatimModuleSyntax": true
  }
}`}</BlogCode>

      <BlogUl>
        <BlogLi>
          <strong>strict</strong> — a package of flags:{" "}
          <BlogInlineCode>strictNullChecks</BlogInlineCode>,{" "}
          <BlogInlineCode>noImplicitAny</BlogInlineCode>,{" "}
          <BlogInlineCode>strictFunctionTypes</BlogInlineCode> and more.
        </BlogLi>
        <BlogLi>
          <strong>noUncheckedIndexedAccess</strong> — indexing an array returns{" "}
          <BlogInlineCode>T | undefined</BlogInlineCode>.
        </BlogLi>
        <BlogLi>
          <strong>exactOptionalPropertyTypes</strong> —{" "}
          <BlogInlineCode>{`{ a?: string }`}</BlogInlineCode> does not accept{" "}
          <BlogInlineCode>{`{ a: undefined }`}</BlogInlineCode> explicitly.
        </BlogLi>
        <BlogLi>
          <strong>verbatimModuleSyntax</strong> — forces{" "}
          <BlogInlineCode>import type</BlogInlineCode> for pure types.
        </BlogLi>
      </BlogUl>

      <BlogCode>{`// verbatimModuleSyntax: separate types from values
import { useEffect } from "react";       // value
import type { ReactNode } from "react";  // type only

// exactOptionalPropertyTypes in action
interface Config {
  delay?: number;
}

// ❌ Error with the flag enabled
const c1: Config = { delay: undefined };

// ✅ Correct: either absent, or a number
const c2: Config = {};
const c3: Config = { delay: 300 };`}</BlogCode>

      <BlogCallout type="info">
        Migrating a legacy project to{" "}
        <BlogInlineCode>strict: true</BlogInlineCode> produces thousands of
        errors; do it gradually (flag by flag) instead of all at once. New
        projects should not start without{" "}
        <BlogInlineCode>strict</BlogInlineCode> or{" "}
        <BlogInlineCode>noUncheckedIndexedAccess</BlogInlineCode>.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Exercises</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Write a type predicate that distinguishes a Car object (with wheels: number) from a Bike (with handlebar: boolean) inside an array of Vehicle."
          hint="function isCar(v: Vehicle): v is Car with 'wheels' in v."
          level="Easy"
          num={1}
          solution={`type Vehicle =
  | { name: string; wheels: number }
  | { name: string; handlebar: boolean };

function isCar(v: Vehicle): v is { name: string; wheels: number } {
  return "wheels" in v;
}

const vehicles: Vehicle[] = getVehicles();
const cars = vehicles.filter(isCar);
cars.forEach((car) => console.log(car.wheels));`}
          title="Basic type predicate"
        />

        <ExerciseCard
          description="Create a discriminated union of three shapes (circle, square, rectangle) with a 'type' discriminant, and an area() function that returns the area of each one."
          hint="Switch on shape.type and access the specific properties in each case."
          level="Intermediate"
          num={2}
          solution={`type Shape =
  | { type: "circle"; radius: number }
  | { type: "square"; side: number }
  | { type: "rectangle"; height: number; width: number };

function area(shape: Shape): number {
  switch (shape.type) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    case "rectangle":
      return shape.height * shape.width;
  }
}`}
          title="Discriminated union with switch"
        />

        <ExerciseCard
          description="Implement a generic function with a constraint that sorts an array of objects by a numeric key given as the second argument."
          hint="T extends Record<string, unknown> is not enough; use a generic key and compare as number."
          level="Intermediate"
          num={3}
          solution={`function sortBy<T extends Record<K, number>, K extends keyof T>(
  items: T[],
  key: K
): T[] {
  return [...items].sort((a, b) => a[key] - b[key]);
}

const products = [
  { name: "Keyboard", price: 20 },
  { name: "Mouse", price: 10 },
  { name: "Monitor", price: 150 },
];

sortBy(products, "price"); // Mouse, Keyboard, Monitor`}
          title="Generic with constraint and key"
        />

        <ExerciseCard
          description="Type a session context (user and logout) with the undefined + throw pattern, and a hook that throws outside the Provider."
          hint="createContext<SessionContextType | undefined>(undefined) and check inside the hook."
          level="Hard"
          num={4}
          solution={`import { createContext, useContext } from "react";

type SessionContextType = {
  user: { name: string };
  logout: () => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

function useSession(): SessionContextType {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a <SessionProvider>");
  }
  return context;
}`}
          title="Typed context with throw"
        />

        <ExerciseCard
          description="Write a conditional type with infer that extracts the type of the second element of a tuple of any length."
          hint="T extends [unknown, infer S, ...unknown[]] ? S : never."
          level="Hard"
          num={5}
          solution={`type Second<T extends unknown[]> = T extends [
  unknown,
  infer S,
  ...unknown[]
]
  ? S
  : never;

type A = Second<[string, number, boolean]>; // number
type B = Second<[string]>;                  // never (no second)`}
          title="Conditional type with infer"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        TypeScript's type system is a design tool, not a chore: narrowing to
        express flows, discriminated unions to model real data, generics to
        reuse without losing safety, and utility types to transform types
        instead of writing them. When you apply it to React and a strict
        tsconfig, the errors that used to appear in production become compile
        errors. That is the end goal: making the compiler your safety net.
      </BlogP>
    </article>
  );
}
