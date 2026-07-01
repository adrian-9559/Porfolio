"use client";
import { useState } from "react";

type SectionId =
  | "intro"
  | "vitest"
  | "testinglibrary"
  | "mocks"
  | "integracion"
  | "e2e"
  | "cobertura"
  | "ejercicios";

interface SectionDef {
  id: SectionId;
  label: string;
}
const SECTIONS: SectionDef[] = [
  { id: "intro", label: "1. Frontend testing" },
  { id: "vitest", label: "2. Vitest + unit" },
  { id: "testinglibrary", label: "3. Testing Library" },
  { id: "mocks", label: "4. Mocks & stubs" },
  { id: "integracion", label: "5. Integration tests" },
  { id: "e2e", label: "6. E2E with Playwright" },
  { id: "cobertura", label: "7. Coverage" },
  { id: "ejercicios", label: "Exercises" },
];

import {
  BlogH2,
  BlogH3,
  BlogP,
  BlogCode,
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
  level: string;
  description: string;
  hint?: string;
  solution?: string;
}) {
  const [open, setOpen] = useState(false);
  const levelColor =
    {
      "Básico":
        "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
      "Intermedio":
        "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
      "Avanzado": "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
    }[level] ??
    "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400";

  return (
    <div className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden">
      <button
        className="w-full px-4 py-3 flex items-center justify-between gap-3 hover:bg-black/3 dark:hover:bg-white/3 transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
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
          <span className="text-[#aeaeb2] dark:text-[#636366] text-xs">
            {open ? "▲" : "▼"}
          </span>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-black/8 dark:border-white/8 pt-3 space-y-3">
          <p className="text-sm text-[#3a3a3c] dark:text-[#aeaeb2]">
            {description}
          </p>
          {hint && (
            <div className="bg-rose-50 dark:bg-rose-950/20 rounded-xl px-3 py-2 text-xs text-rose-700 dark:text-rose-400">
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
      <BlogH2>Frontend testing</BlogH2>
      <BlogP>
        Automated tests are essential for maintaining quality in
        frontend applications. A good testing strategy combines several
        levels:
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Unit tests</strong> — verify functions and hooks
          in isolation
        </BlogLi>
        <BlogLi>
          <strong>Component tests</strong> — render components and
          verify their behavior
        </BlogLi>
        <BlogLi>
          <strong>Integration tests</strong> — test complete flows
          (multiple components + API)
        </BlogLi>
        <BlogLi>
          <strong>E2E tests</strong> — real browser simulating user
          actions
        </BlogLi>
      </BlogUl>
      <BlogCallout type="tip">
        Follow the "testing pyramid": many unit tests, fewer
        integration tests, few E2E tests. Each level has different speed and
        maintenance cost.
      </BlogCallout>
    </>
  );
}

function SectionVitest() {
  return (
    <>
      <BlogH2>Vitest: unit tests</BlogH2>
      <BlogP>
        Vitest is a blazing-fast test framework for Vite. It shares
        configuration with Vite and is compatible with the Jest API.
      </BlogP>
      <BlogCode>{`// Installation
// npm install -D vitest

// package.json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:ui": "vitest --ui"
  }
}`}</BlogCode>
      <BlogCode>{`// mathematics.test.ts
import { describe, it, expect } from 'vitest';

// Function to test
function sum(a: number, b: number): number {
    return a + b;
}

function filterEven(numbers: number[]): number[] {
    return numbers.filter(n => n % 2 === 0);
}

// Tests
describe('sum', () => {
    it('adds two positive numbers', () => {
        expect(sum(2, 3)).toBe(5);
    });

    it('adds negative numbers', () => {
        expect(sum(-1, -1)).toBe(-2);
    });

    it('adds with zero', () => {
        expect(sum(5, 0)).toBe(5);
    });
});

describe('filterEven', () => {
    it('filters even numbers', () => {
        expect(filterEven([1,2,3,4,5,6])).toEqual([2,4,6]);
    });

    it('returns empty array if no evens', () => {
        expect(filterEven([1,3,5])).toEqual([]);
    });
});`}</BlogCode>
      <BlogH3>Common matchers</BlogH3>
      <BlogCode>{`expect(value).toBe(42);             // ===
expect(value).toEqual({ a: 1 });    // deep equal
expect(value).toBeNull();
expect(value).toBeDefined();
expect(value).toBeTruthy();
expect(value).toBeFalsy();

expect(array).toContain(3);
expect(string).toMatch(/regex/);
expect(fn).toThrow('message');

expect(response).toMatchObject({
    status: 'ok',
    data: expect.any(Object),
});`}</BlogCode>
    </>
  );
}

function SectionTestingLibrary() {
  return (
    <>
      <BlogH2>Testing Library: component tests</BlogH2>
      <BlogP>
        Testing Library renders components and allows you to interact with them
        as a real user would. You don't access the component's internal state,
        only the DOM.
      </BlogP>
      <BlogCode>{`// npm install -D @testing-library/react @testing-library/jest-dom
// npm install -D @testing-library/user-event

// setup: vitest.config.ts
import { defineConfig } from 'vitest/config';
export default defineConfig({
    test: {
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
    },
});

// src/test/setup.ts
import '@testing-library/jest-dom/vitest';`}</BlogCode>
      <BlogCode>{`// Counter.tsx
interface CounterProps {
    initial?: number;
}

export function Counter({ initial = 0 }: CounterProps) {
    const [count, setCount] = useState(initial);

    return (
        <div>
            <p role="status">Value: {count}</p>
            <button onClick={() => setCount(c => c + 1)}>Increment</button>
            <button onClick={() => setCount(c => c - 1)}>Decrement</button>
        </div>
    );
}

// Counter.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

describe('Counter', () => {
    it('renders with default initial value', () => {
        render(<Counter />);
        expect(screen.getByRole('status')).toHaveTextContent('Value: 0');
    });

    it('increments when clicking +', async () => {
        const user = userEvent.setup();
        render(<Counter initial={5} />);

        await user.click(screen.getByText('Increment'));

        expect(screen.getByRole('status')).toHaveTextContent('Value: 6');
    });

    it('decrements when clicking -', async () => {
        const user = userEvent.setup();
        render(<Counter initial={5} />);

        await user.click(screen.getByText('Decrement'));

        expect(screen.getByRole('status')).toHaveTextContent('Value: 4');
    });
});`}</BlogCode>
      <BlogCallout type="tip">
        Use <code>getByRole</code> whenever possible. It is the most
        accessible and resilient query. <code>getByText</code> and{" "}
        <code>getByTestId</code> are alternatives when there's no suitable
        role.
      </BlogCallout>
    </>
  );
}

function SectionMocks() {
  return (
    <>
      <BlogH2>Mocks, stubs, and spies</BlogH2>
      <BlogP>
        Mocks replace real dependencies (APIs, modules, timers) to
        isolate the code under test.
      </BlogP>
      <BlogH3>Mocking fetch</BlogH3>
      <BlogCode>{`// api.ts
export async function getUser(id: number) {
    const res = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) throw new Error('Error fetching user');
    return res.json();
}

// api.test.ts
import { describe, it, expect, vi } from 'vitest';

describe('getUser', () => {
    it('returns user when API responds ok', async () => {
        const user = { id: 1, name: 'Ana' };
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => user,
        } as Response);

        const result = await getUser(1);
        expect(result).toEqual(user);
        expect(fetch).toHaveBeenCalledWith('/api/users/1');
    });

    it('throws error when API fails', async () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: false,
        } as Response);

        await expect(getUser(1)).rejects.toThrow('Error fetching user');
    });
});`}</BlogCode>
      <BlogH3>Mocking a module</BlogH3>
      <BlogCode>{`// logger.ts
export const logger = {
    info: (msg: string) => console.log(msg),
    error: (msg: string) => console.error(msg),
};

// Usage in component
import { logger } from './logger';
logger.info('Component mounted');

// Test
import { vi } from 'vitest';
vi.mock('./logger', () => ({
    logger: {
        info: vi.fn(),
        error: vi.fn(),
    },
}));

// Verify it was called
import { logger } from './logger';
expect(logger.info).toHaveBeenCalledWith('Component mounted');`}</BlogCode>
    </>
  );
}

function SectionIntegracion() {
  return (
    <>
      <BlogH2>Integration tests</BlogH2>
      <BlogP>
        Integration tests test complete flows: rendering multiple
        components together, interacting with them, and verifying the result.
      </BlogP>
      <BlogCode>{`// TaskList.tsx
export function TaskList() {
    const [tasks, setTasks] = useState<string[]>([]);
    const [input, setInput] = useState('');

    const add = () => {
        if (input.trim()) {
            setTasks(prev => [...prev, input.trim()]);
            setInput('');
        }
    };

    return (
        <div>
            <h1>My tasks</h1>
            <input
                aria-label="New task"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && add()}
            />
            <button onClick={add}>Add</button>

            {tasks.length === 0 ? (
                <p>No pending tasks</p>
            ) : (
                <ul>
                    {tasks.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
            )}
        </div>
    );
}`}</BlogCode>
      <BlogCode>{`// TaskList.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskList } from './TaskList';

describe('TaskList', () => {
    it('shows empty message initially', () => {
        render(<TaskList />);
        expect(screen.getByText('No pending tasks')).toBeInTheDocument();
    });

    it('adds a task when typing and clicking', async () => {
        const user = userEvent.setup();
        render(<TaskList />);

        await user.type(screen.getByLabelText('New task'), 'Buy bread');
        await user.click(screen.getByText('Add'));

        expect(screen.getByText('Buy bread')).toBeInTheDocument();
        expect(screen.queryByText('No pending tasks')).not.toBeInTheDocument();
    });

    it('adds task with Enter and clears input', async () => {
        const user = userEvent.setup();
        render(<TaskList />);

        const input = screen.getByLabelText('New task');
        await user.type(input, 'Study React{Enter}');

        expect(screen.getByText('Study React')).toBeInTheDocument();
        expect(input).toHaveValue('');
    });

    it('does not add empty tasks', async () => {
        const user = userEvent.setup();
        render(<TaskList />);

        await user.click(screen.getByText('Add'));
        expect(screen.getByText('No pending tasks')).toBeInTheDocument();
    });
});`}</BlogCode>
    </>
  );
}

function SectionE2e() {
  return (
    <>
      <BlogH2>E2E tests with Playwright</BlogH2>
      <BlogP>
        E2E tests open a real browser and execute actions like a
        user. Playwright is the most modern tool: fast, reliable, and with
        support for multiple browsers.
      </BlogP>
      <BlogCode>{`// Installation
// npm init playwright@latest
// npx playwright install

// playwright.config.ts
import { defineConfig } from '@playwright/test';
export default defineConfig({
    testDir: './e2e',
    use: {
        baseURL: 'http://localhost:3000',
        headless: true,
    },
});`}</BlogCode>
      <BlogCode>{`// e2e/login.spec.ts
import { test, expect } from '@playwright/test';

test('user can log in', async ({ page }) => {
    await page.goto('/login');

    // Fill form
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Wait for redirect
    await page.waitForURL('/dashboard');

    // Verify greeting
    await expect(page.locator('h1')).toHaveText('Welcome, Test');
});

test('shows error with invalid credentials', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"]', 'bad@email.com');
    await page.fill('[name="password"]', 'wrong');
    await page.click('button[type="submit"]');

    await expect(page.locator('.error')).toBeVisible();
    await expect(page.locator('.error')).toHaveText('Invalid credentials');
});`}</BlogCode>
      <BlogH3>Essential Playwright commands</BlogH3>
      <BlogCode>{`page.goto('/url');              // navigate
page.click('#btn');             // click
page.fill('input', 'text');    // fill input
page.selectOption('select', 'option');
page.check('#checkbox');
page.screenshot({ path: 'ss.png' });

// Smart waits (auto-wait)
page.waitForURL('/dashboard');
page.waitForSelector('.loaded');
page.waitForResponse(resp => resp.url().includes('/api'));`}</BlogCode>
      <BlogCallout type="tip">
        Playwright automatically waits for elements to be visible and
        enabled before interacting. You don't need{" "}
        <code>sleep()</code> or manual waits.
      </BlogCallout>
    </>
  );
}

function SectionCobertura() {
  return (
    <>
      <BlogH2>Code coverage</BlogH2>
      <BlogP>
        Coverage measures what percentage of code is executed during
        tests. It doesn't guarantee the code works correctly, but it helps
        identify untested code.
      </BlogP>
      <BlogCode>{`// vitest.config.ts
import { defineConfig } from 'vitest/config';
export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html', 'lcov'],
            include: ['src/**/*.{ts,tsx}'],
            exclude: ['src/**/*.test.*', 'src/vite-env.d.ts'],
            thresholds: {
                statements: 80,
                branches: 70,
                functions: 80,
                lines: 80,
            },
        },
    },
});

// package.json
{
    "scripts": {
        "test": "vitest",
        "test:coverage": "vitest run --coverage"
    }
}`}</BlogCode>
      <BlogP>Key coverage metrics:</BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Statements</strong> — % of executed statements
        </BlogLi>
        <BlogLi>
          <strong>Branches</strong> — % of branches (if/else, switch) covered
        </BlogLi>
        <BlogLi>
          <strong>Functions</strong> — % of invoked functions
        </BlogLi>
        <BlogLi>
          <strong>Lines</strong> — % of executed lines
        </BlogLi>
      </BlogUl>
      <BlogCallout type="warn">
        Coverage is a metric, not a target. Don't sacrifice quality to
        reach 100%. Prioritize testing critical flows over trivial code
        like getters or type interfaces.
      </BlogCallout>
    </>
  );
}

function SectionEjercicios() {
  return (
    <>
      <BlogH2>Exercises</BlogH2>
      <BlogP>
        Put into practice what you've learned with these progressive exercises.
      </BlogP>
      <div className="space-y-3">
        <ExerciseCard
          description="Create a LoginForm component with email and password fields, basic validation (valid email, password \u2265 6 characters), and a submit button. Write unit tests with Testing Library for: rendering the form, showing error if email is invalid, and calling onSubmit with correct data."
          level="Intermedio"
          num={1}
          title="Testing a login form"
        />
        <ExerciseCard
          description="Create a UserList component that fetches users from /api/users and displays them in a list. Write tests that: mock fetch, verify loading state is shown, verify the list when API responds ok, and verify error message when API fails."
          level="Avanzado"
          num={2}
          title="Mock API in integration test"
        />
      </div>
    </>
  );
}

const SECTION_MAP = {
  intro: SectionIntro,
  vitest: SectionVitest,
  testinglibrary: SectionTestingLibrary,
  mocks: SectionMocks,
  integracion: SectionIntegracion,
  e2e: SectionE2e,
  cobertura: SectionCobertura,
  ejercicios: SectionEjercicios,
};

export default function TestingFrontendContent() {
  const [active, setActive] = useState<SectionId>("intro");
  const currentIdx = SECTIONS.findIndex((s) => s.id === active);

  return (
    <div className="flex gap-8 min-h-[600px]">
      <aside className="hidden lg:flex flex-col gap-0.5 w-52 shrink-0 sticky top-20 self-start">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={`text-left px-3 py-1.5 rounded-xl text-sm transition-colors ${
              active === s.id
                ? "bg-rose-100 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 font-medium"
                : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
            }`}
            onClick={() => setActive(s.id)}
          >
            {s.label}
          </button>
        ))}
      </aside>
      <div className="flex-1 min-w-0">
        {SECTION_MAP[active]()}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-black/8 dark:border-white/8">
          <button
            className="text-sm text-[#6e6e73] dark:text-[#86868b] disabled:opacity-30 hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
            disabled={currentIdx === 0}
            onClick={() => setActive(SECTIONS[currentIdx - 1].id)}
          >
            ← Previous
          </button>
          <button
            className="text-sm bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl font-medium disabled:opacity-30 transition-colors"
            disabled={currentIdx === SECTIONS.length - 1}
            onClick={() => setActive(SECTIONS[currentIdx + 1].id)}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
