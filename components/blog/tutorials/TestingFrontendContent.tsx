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
  { id: "intro", label: "1. Testing frontend" },
  { id: "vitest", label: "2. Vitest + unit" },
  { id: "testinglibrary", label: "3. Testing Library" },
  { id: "mocks", label: "4. Mocks y stubs" },
  { id: "integracion", label: "5. Tests de integración" },
  { id: "e2e", label: "6. E2E con Playwright" },
  { id: "cobertura", label: "7. Cobertura" },
  { id: "ejercicios", label: "Ejercicios" },
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
      Básico:
        "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
      Intermedio:
        "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
      Avanzado: "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
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
              <strong>Pista:</strong> {hint}
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
      <BlogH2>Testing en frontend</BlogH2>
      <BlogP>
        Los tests automatizados son esenciales para mantener la calidad en
        aplicaciones frontend. Una buena estrategia de testing combina varios
        niveles:
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Tests unitarios</strong> — verifican funciones y hooks de
          forma aislada
        </BlogLi>
        <BlogLi>
          <strong>Tests de componente</strong> — renderizan componentes y
          verifican su comportamiento
        </BlogLi>
        <BlogLi>
          <strong>Tests de integración</strong> — prueban flujos completos
          (varios componentes + API)
        </BlogLi>
        <BlogLi>
          <strong>Tests E2E</strong> — navegador real simulando acciones de
          usuario
        </BlogLi>
      </BlogUl>
      <BlogCallout type="tip">
        Sigue la "pirámide de testing": muchos tests unitarios, menos de
        integración, pocos E2E. Cada nivel tiene diferente velocidad y costo de
        mantenimiento.
      </BlogCallout>
    </>
  );
}

function SectionVitest() {
  return (
    <>
      <BlogH2>Vitest: tests unitarios</BlogH2>
      <BlogP>
        Vitest es un framework de tests ultrarrápido para Vite. Comparte
        configuración con Vite y es compatible con Jest API.
      </BlogP>
      <BlogCode>{`// Instalación
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

// Función a testear
function sumar(a: number, b: number): number {
    return a + b;
}

function filtrarPares(numeros: number[]): number[] {
    return numeros.filter(n => n % 2 === 0);
}

// Tests
describe('sumar', () => {
    it('suma dos números positivos', () => {
        expect(sumar(2, 3)).toBe(5);
    });

    it('suma números negativos', () => {
        expect(sumar(-1, -1)).toBe(-2);
    });

    it('suma con cero', () => {
        expect(sumar(5, 0)).toBe(5);
    });
});

describe('filtrarPares', () => {
    it('filtra números pares', () => {
        expect(filtrarPares([1,2,3,4,5,6])).toEqual([2,4,6]);
    });

    it('devuelve array vacío si no hay pares', () => {
        expect(filtrarPares([1,3,5])).toEqual([]);
    });
});`}</BlogCode>
      <BlogH3>Matchers comunes</BlogH3>
      <BlogCode>{`expect(valor).toBe(42);             // ===
expect(valor).toEqual({ a: 1 });    // deep equal
expect(valor).toBeNull();
expect(valor).toBeDefined();
expect(valor).toBeTruthy();
expect(valor).toBeFalsy();

expect(array).toContain(3);
expect(string).toMatch(/regex/);
expect(fn).toThrow('mensaje');

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
      <BlogH2>Testing Library: tests de componentes</BlogH2>
      <BlogP>
        Testing Library renderiza componentes y permite interactuar con ellos
        como lo haría un usuario real. No accedes al estado interno del
        componente, solo al DOM.
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
            <p role="status">Valor: {count}</p>
            <button onClick={() => setCount(c => c + 1)}>Incrementar</button>
            <button onClick={() => setCount(c => c - 1)}>Decrementar</button>
        </div>
    );
}

// Counter.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

describe('Counter', () => {
    it('renderiza con valor inicial por defecto', () => {
        render(<Counter />);
        expect(screen.getByRole('status')).toHaveTextContent('Valor: 0');
    });

    it('incrementa al hacer click en +', async () => {
        const user = userEvent.setup();
        render(<Counter initial={5} />);

        await user.click(screen.getByText('Incrementar'));

        expect(screen.getByRole('status')).toHaveTextContent('Valor: 6');
    });

    it('decrementa al hacer click en -', async () => {
        const user = userEvent.setup();
        render(<Counter initial={5} />);

        await user.click(screen.getByText('Decrementar'));

        expect(screen.getByRole('status')).toHaveTextContent('Valor: 4');
    });
});`}</BlogCode>
      <BlogCallout type="tip">
        Usa <code>getByRole</code> siempre que puedas. Es la consulta más
        accesible y resiliente. <code>getByText</code> y{" "}
        <code>getByTestId</code> son alternativas cuando no hay un role
        adecuado.
      </BlogCallout>
    </>
  );
}

function SectionMocks() {
  return (
    <>
      <BlogH2>Mocks, stubs y spies</BlogH2>
      <BlogP>
        Los mocks reemplazan dependencias reales (APIs, módulos, timers) para
        aislar el código bajo test.
      </BlogP>
      <BlogH3>Mock de fetch</BlogH3>
      <BlogCode>{`// api.ts
export async function obtenerUsuario(id: number) {
    const res = await fetch(\`/api/usuarios/\${id}\`);
    if (!res.ok) throw new Error('Error al obtener usuario');
    return res.json();
}

// api.test.ts
import { describe, it, expect, vi } from 'vitest';

describe('obtenerUsuario', () => {
    it('devuelve usuario cuando la API responde ok', async () => {
        const usuario = { id: 1, nombre: 'Ana' };
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => usuario,
        } as Response);

        const resultado = await obtenerUsuario(1);
        expect(resultado).toEqual(usuario);
        expect(fetch).toHaveBeenCalledWith('/api/usuarios/1');
    });

    it('lanza error cuando la API falla', async () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: false,
        } as Response);

        await expect(obtenerUsuario(1)).rejects.toThrow('Error al obtener usuario');
    });
});`}</BlogCode>
      <BlogH3>Mock de módulo</BlogH3>
      <BlogCode>{`// logger.ts
export const logger = {
    info: (msg: string) => console.log(msg),
    error: (msg: string) => console.error(msg),
};

// Uso en componente
import { logger } from './logger';
logger.info('Componente montado');

// Test
import { vi } from 'vitest';
vi.mock('./logger', () => ({
    logger: {
        info: vi.fn(),
        error: vi.fn(),
    },
}));

// Verificar que se llamó
import { logger } from './logger';
expect(logger.info).toHaveBeenCalledWith('Componente montado');`}</BlogCode>
    </>
  );
}

function SectionIntegracion() {
  return (
    <>
      <BlogH2>Tests de integración</BlogH2>
      <BlogP>
        Los tests de integración prueban flujos completos: renderizar varios
        componentes juntos, interactuar con ellos y verificar el resultado.
      </BlogP>
      <BlogCode>{`// ListaDeTareas.tsx
export function ListaDeTareas() {
    const [tareas, setTareas] = useState<string[]>([]);
    const [input, setInput] = useState('');

    const agregar = () => {
        if (input.trim()) {
            setTareas(prev => [...prev, input.trim()]);
            setInput('');
        }
    };

    return (
        <div>
            <h1>Mis tareas</h1>
            <input
                aria-label="Nueva tarea"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && agregar()}
            />
            <button onClick={agregar}>Añadir</button>

            {tareas.length === 0 ? (
                <p>No hay tareas pendientes</p>
            ) : (
                <ul>
                    {tareas.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
            )}
        </div>
    );
}`}</BlogCode>
      <BlogCode>{`// ListaDeTareas.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ListaDeTareas } from './ListaDeTareas';

describe('ListaDeTareas', () => {
    it('muestra mensaje vacío inicialmente', () => {
        render(<ListaDeTareas />);
        expect(screen.getByText('No hay tareas pendientes')).toBeInTheDocument();
    });

    it('agrega una tarea al escribir y hacer click', async () => {
        const user = userEvent.setup();
        render(<ListaDeTareas />);

        await user.type(screen.getByLabelText('Nueva tarea'), 'Comprar pan');
        await user.click(screen.getByText('Añadir'));

        expect(screen.getByText('Comprar pan')).toBeInTheDocument();
        expect(screen.queryByText('No hay tareas pendientes')).not.toBeInTheDocument();
    });

    it('agrega tarea con Enter y limpia el input', async () => {
        const user = userEvent.setup();
        render(<ListaDeTareas />);

        const input = screen.getByLabelText('Nueva tarea');
        await user.type(input, 'Estudiar React{Enter}');

        expect(screen.getByText('Estudiar React')).toBeInTheDocument();
        expect(input).toHaveValue('');
    });

    it('no agrega tareas vacías', async () => {
        const user = userEvent.setup();
        render(<ListaDeTareas />);

        await user.click(screen.getByText('Añadir'));
        expect(screen.getByText('No hay tareas pendientes')).toBeInTheDocument();
    });
});`}</BlogCode>
    </>
  );
}

function SectionE2e() {
  return (
    <>
      <BlogH2>Tests E2E con Playwright</BlogH2>
      <BlogP>
        Los tests E2E abren un navegador real y ejecutan acciones como un
        usuario. Playwright es la herramienta más moderna: rápida, confiable y
        con soporte para múltiples navegadores.
      </BlogP>
      <BlogCode>{`// Instalación
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

test('el usuario puede iniciar sesión', async ({ page }) => {
    await page.goto('/login');

    // Rellenar formulario
    await page.fill('[name="email"]', 'test@ejemplo.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Esperar redirección
    await page.waitForURL('/dashboard');

    // Verificar saludo
    await expect(page.locator('h1')).toHaveText('Bienvenido, Test');
});

test('muestra error con credenciales inválidas', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"]', 'mal@email.com');
    await page.fill('[name="password"]', 'incorrecto');
    await page.click('button[type="submit"]');

    await expect(page.locator('.error')).toBeVisible();
    await expect(page.locator('.error')).toHaveText('Credenciales inválidas');
});`}</BlogCode>
      <BlogH3>Comandos esenciales de Playwright</BlogH3>
      <BlogCode>{`page.goto('/url');              // navegar
page.click('#btn');             // click
page.fill('input', 'texto');    // rellenar input
page.selectOption('select', 'opcion');
page.check('#checkbox');
page.screenshot({ path: 'ss.png' });

// Esperas inteligentes (auto-wait)
page.waitForURL('/dashboard');
page.waitForSelector('.cargado');
page.waitForResponse(resp => resp.url().includes('/api'));`}</BlogCode>
      <BlogCallout type="tip">
        Playwright espera automáticamente a que los elementos sean visibles y
        estén habilitados antes de interactuar. No necesitas{" "}
        <code>sleep()</code> ni esperas manuales.
      </BlogCallout>
    </>
  );
}

function SectionCobertura() {
  return (
    <>
      <BlogH2>Cobertura de código</BlogH2>
      <BlogP>
        La cobertura mide qué porcentaje del código se ejecuta durante los
        tests. No garantiza que el código funcione correctamente, pero ayuda a
        identificar código no testeado.
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
      <BlogP>Métricas clave de cobertura:</BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Statements</strong> — % de sentencias ejecutadas
        </BlogLi>
        <BlogLi>
          <strong>Branches</strong> — % de ramas (if/else, switch) cubiertas
        </BlogLi>
        <BlogLi>
          <strong>Functions</strong> — % de funciones invocadas
        </BlogLi>
        <BlogLi>
          <strong>Lines</strong> — % de líneas ejecutadas
        </BlogLi>
      </BlogUl>
      <BlogCallout type="warn">
        La cobertura es una métrica, no un objetivo. No sacrifiques calidad por
        alcanzar 100%. Prioriza testear flujos críticos sobre código trivial
        como getters o interfaces de tipos.
      </BlogCallout>
    </>
  );
}

function SectionEjercicios() {
  return (
    <>
      <BlogH2>Ejercicios</BlogH2>
      <BlogP>
        Pon en práctica lo aprendido con estos ejercicios progresivos.
      </BlogP>
      <div className="space-y-3">
        <ExerciseCard
          description="Crea un componente LoginForm con campos email y password, validación básica (email válido, password ≥ 6 caracteres) y un botón de submit. Escribe tests unitarios con Testing Library para: renderizar el formulario, mostrar error si el email es inválido, y llamar a onSubmit con los datos correctos."
          level="Intermedio"
          num={1}
          title="Testear un formulario de login"
        />
        <ExerciseCard
          description="Crea un componente UserList que fetchea usuarios de /api/usuarios y los muestra en una lista. Escribe tests que: mockeen fetch, verifiquen que se muestra loading mientras carga, verifiquen la lista cuando la API responde ok, y verifiquen mensaje de error cuando la API falla."
          level="Avanzado"
          num={2}
          title="Mock de API en test de integración"
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
            ← Anterior
          </button>
          <button
            className="text-sm bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl font-medium disabled:opacity-30 transition-colors"
            disabled={currentIdx === SECTIONS.length - 1}
            onClick={() => setActive(SECTIONS[currentIdx + 1].id)}
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}
