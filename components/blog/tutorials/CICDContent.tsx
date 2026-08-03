"use client";
import { useState } from "react";

import {
  BlogH2,
  BlogH3,
  BlogP,
  BlogCode,
  BlogInlineCode,
  BlogCallout,
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

export default function CICDContent() {
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
          45 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        CI/CD con GitHub Actions
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        GitHub Actions automatiza el pipeline completo de tu repositorio: cada
        push puede compilar, pasar lint, ejecutar tests y desplegar a
        producción. Aprende los conceptos, la estructura YAML y los patrones
        que usan los proyectos reales.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="que-es-cicd">¿Qué es CI/CD?</BlogH2>

      <BlogP>
        <strong>CI (Continuous Integration)</strong> es la práctica de integrar
        el código de todo el equipo en el repositorio compartido de forma
        frecuente. Cada integración se verifica automáticamente con build, lint
        y tests, de modo que los errores aparecen en minutos, no en días.
      </BlogP>

      <BlogP>
        <strong>CD (Continuous Delivery / Deployment)</strong> automatiza la
        publicación del código verificado. En Continuous Delivery el artefacto
        queda listo para desplegarse con un clic; en Continuous Deployment se
        despliega solo a producción cuando el pipeline pasa.
      </BlogP>

      <BlogCallout type="info">
        El flujo mental: commit → CI comprueba que todo está sano → CD entrega
        el artefacto → despliegue. Cada capa falla rápido y de forma ruidosa,
        así el equipo sabe dónde mirar antes de que el problema llegue a
        usuarios.
      </BlogCallout>

      <BlogH2 id="conceptos">Conceptos de GitHub Actions</BlogH2>

      <BlogP>
        Actions se estructura en cinco piezas con una jerarquía clara:
      </BlogP>

      <BlogP>
        <strong>Workflow</strong>: el archivo YAML completo en{" "}
        <BlogInlineCode>.github/workflows/</BlogInlineCode>. Define el
        autómata: cuándo se dispara y qué hace.
      </BlogP>
      <BlogP>
        <strong>Evento</strong>: lo que dispara el workflow.{" "}
        <BlogInlineCode>push</BlogInlineCode>, <BlogInlineCode>pull_request</BlogInlineCode>,{" "}
        <BlogInlineCode>schedule</BlogInlineCode>, <BlogInlineCode>workflow_dispatch</BlogInlineCode>...
      </BlogP>
      <BlogP>
        <strong>Job</strong>: un conjunto de pasos que se ejecutan en un mismo
        runner. Los jobs de un workflow corren en paralelo por defecto.
      </BlogP>
      <BlogP>
        <strong>Step</strong>: cada acción individual dentro de un job: un
        comando, una acción reutilizable de la marketplace...
      </BlogP>
      <BlogP>
        <strong>Runner</strong>: la máquina que ejecuta los jobs. GitHub ofrece
        runners alojados (ubuntu-latest, macos-latest, windows-latest) y puedes
        conectar los tuyos.
      </BlogP>

      <BlogH2 id="estructura">Estructura del workflow</BlogH2>

      <BlogP>
        Todo empieza con un archivo YAML dentro de{" "}
        <BlogInlineCode>.github/workflows/</BlogInlineCode>. La clave{" "}
        <BlogInlineCode>on</BlogInlineCode> declara los eventos que lo
        disparan:
      </BlogP>

      <BlogCode>{`# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "¡Pipeline en marcha!"`}</BlogCode>

      <BlogP>
        Con <BlogInlineCode>push</BlogInlineCode> el workflow corre en cada
        commit a main; con <BlogInlineCode>pull_request</BlogInlineCode>
        también en cada PR contra main, que es donde se filtran los errores
        antes de integrar. <BlogInlineCode>workflow_dispatch</BlogInlineCode>{" "}
        añade un botón "Run workflow" manual en la UI de GitHub.
      </BlogP>

      <BlogH2 id="jobs-steps">Jobs y steps</BlogH2>

      <BlogP>
        Cada job declara en qué runner ejecutarse y una lista de steps que se
        ejecutan en orden. Los steps pueden ser acciones de la comunidad ({" "}
        <BlogInlineCode>uses</BlogInlineCode>) o comandos shell ({" "}
        <BlogInlineCode>run</BlogInlineCode>):
      </BlogP>

      <BlogCode>{`jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # Clona el repositorio dentro del runner
      - uses: actions/checkout@v4

      # Configura Node.js en la máquina
      - uses: actions/setup-node@v4
        with:
          node-version: 22

      # Comando shell: instala dependencias
      - run: npm ci

      # Varios comandos, directorio de trabajo y env propio
      - name: Verificar formato
        working-directory: apps/web
        env:
          NODE_ENV: test
        run: |
          npm run lint
          npm test`}</BlogCode>

      <BlogCallout type="warn">
        Cada <BlogInlineCode>run</BlogInlineCode> se ejecuta en una shell nueva
        e independiente: las variables y el directorio no persisten entre
        steps. Usa <BlogInlineCode>env:</BlogInlineCode> a nivel de step o job
        para pasar contexto, o <BlogInlineCode>actions/upload-artifact</BlogInlineCode>{" "}
        para guardar archivos entre jobs.
      </BlogCallout>

      <BlogH2 id="build-lint-test">Build, lint y test</BlogH2>

      <BlogP>
        El corazón de CI para un proyecto Node/TypeScript: instalar de forma
        reproducible, compilar, comprobar estilo y ejecutar la suite de tests.
        Los pasos con nombre hacen legible el pipeline en la UI de GitHub:
      </BlogP>

      <BlogCode>{`jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Instalar dependencias
        run: npm ci

      - name: Typecheck
        run: npm run typecheck

      - name: Lint
        run: npm run lint

      - name: Tests
        run: npm test

      - name: Build
        run: npm run build`}</BlogCode>

      <BlogP>
        <BlogInlineCode>npm ci</BlogInlineCode> instala exactamente lo que
        define <BlogInlineCode>package-lock.json</BlogInlineCode> y borra{" "}
        <BlogInlineCode>node_modules</BlogInlineCode> antes — es la opción
        reproducible para CI, a diferencia de <BlogInlineCode>npm install</BlogInlineCode>.
      </BlogP>

      <BlogH2 id="secrets">Secrets</BlogH2>

      <BlogP>
        Nunca pongas tokens ni contraseñas en el YAML: se guardan en Settings →
        Secrets and variables → Actions del repositorio y se referencian en el
        workflow. GitHub los inyecta como variables de entorno sin exponerlos en
        los logs:
      </BlogP>

      <BlogCode>{`jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Desplegar
        env:
          VERCEL_TOKEN: \${{ secrets.VERCEL_TOKEN }}
          DATABASE_URL: \${{ secrets.DATABASE_URL }}
        run: |
          npx vercel deploy --prod --token "$VERCEL_TOKEN"
          curl -X POST https://api.miapp.com/deploy`}</BlogCode>

      <BlogCallout type="danger">
        Un secreto referenciado en un step no es visible para el runner salvo
        que lo pases como variable de entorno. Y cuidado:{" "}
        <BlogInlineCode>{"${{ secrets.API_KEY }}"}</BlogInlineCode> dentro de un{" "}
        <BlogInlineCode>run:</BlogInlineCode> puede quedar impreso en los logs.
        Pasa los secretos por <BlogInlineCode>env:</BlogInlineCode> y redacta la
        salida.
      </BlogCallout>

      <BlogH2 id="cache">Cache de dependencias</BlogH2>

      <BlogP>
        Instalar dependencias cada vez tarda minutos. La acción{" "}
        <BlogInlineCode>actions/cache</BlogInlineCode> restaura{" "}
        <BlogInlineCode>node_modules</BlogInlineCode> desde un cache con key
        derivada del lockfile, y la guarda de nuevo si cambia:
      </BlogP>

      <BlogCode>{`- uses: actions/cache@v4
  with:
    path: node_modules
    key: \${{ runner.os }}-node-\${{ hashFiles('package-lock.json') }}
    restore-keys: |
      \${{ runner.os }}-node-`}</BlogCode>

      <BlogP>
        La key incluye el hash del lockfile: si las dependencias no cambian, el
        cache acierta. <BlogInlineCode>restore-keys</BlogInlineCode> ofrece
        caches parciales cuando la key falla. setup-node lo tiene integrado con{" "}
        <BlogInlineCode>cache: npm</BlogInlineCode> para este caso común.
      </BlogP>

      <BlogP>
        Con pnpm la clave está en que las dependencias van en{" "}
        <BlogInlineCode>~/.local/share/pnpm/store</BlogInlineCode> y se usa{" "}
        <BlogInlineCode>pnpm fetch</BlogInlineCode> para poblar el store antes
        de instalar:
      </BlogP>

      <BlogCode>{`- uses: pnpm/action-setup@v4
  with:
    version: 9
- uses: actions/setup-node@v4
  with:
    node-version: 22
    cache: pnpm
- run: pnpm install --frozen-lockfile`}</BlogCode>

      <BlogH2 id="despliegue">Despliegue</BlogH2>

      <BlogP>
        El último tramo: publicar el artefacto verificado. Según el destino
        cambia el mecanismo — un CLI con token (Vercel), una API REST (Render),
        o un push a la rama <BlogInlineCode>gh-pages</BlogInlineCode> para
        GitHub Pages:
      </BlogP>

      <BlogCode>{`# Despliegue a Vercel solo desde main
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build

      - name: Deploy a Vercel
        env:
          VERCEL_TOKEN: \${{ secrets.VERCEL_TOKEN }}
          VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: \${{ secrets.VERCEL_PROJECT_ID }}
        run: npx vercel deploy --prod --token "$VERCEL_TOKEN"`}</BlogCode>

      <BlogP>
        Protege el job de despliegue con una condición{" "}
        <BlogInlineCode>needs</BlogInlineCode>: solo desplegar si los jobs de
        calidad han pasado. Y en repositorios con reviewers, el entorno de
        GitHub ("environment") puede exigir aprobación humana antes del
        despliegue a producción.
      </BlogP>

      <BlogCallout type="info">
        Separar el job <BlogInlineCode>deploy</BlogInlineCode> con{" "}
        <BlogInlineCode>needs: [quality]</BlogInlineCode> hace que el despliegue
        dependa explícitamente de que build, lint y tests hayan terminado en
        verde. Sin esa dependencia, los jobs paralelos podrían desplegar un
        build roto.
      </BlogCallout>

      <BlogH2 id="matrices">Matrices</BlogH2>

      <BlogP>
        Una matrix ejecuta el mismo job con distintas combinaciones de
        variables, típicamente para probar varias versiones de Node o sistemas
        operativos. Cada combinación es un job independiente y paralelo:
      </BlogP>

      <BlogCode>{`jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: npm
      - run: npm ci
      - run: npm test`}</BlogCode>

      <BlogP>
        Puedes combinar dimensiones:{" "}
        <BlogInlineCode>os: [ubuntu-latest, macos-latest]</BlogInlineCode> con{" "}
        <BlogInlineCode>node-version: [20, 22]</BlogInlineCode> genera 4 jobs.
        Para versiones futuras, <BlogInlineCode>include</BlogInlineCode> añade
        configuraciones extra y <BlogInlineCode>exclude</BlogInlineCode>{" "}
        descarta combinaciones que no quieres.
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Ejercicios</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Crea un workflow que se ejecute en cada push a main, instale dependencias y corra los tests de un proyecto Node.js."
          hint="Fíjate en la estructura on: push + jobs + steps con setup-node y npm ci."
          level="Básico"
          num={1}
          solution={`name: CI
on:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm test`}
          title="Workflow push con tests"
        />

        <ExerciseCard
          description="Añade un segundo job de lint separado que corra en paralelo al de tests."
          hint="Dos jobs en la misma raíz jobs: se ejecutan en paralelo por defecto."
          level="Básico"
          num={2}
          solution={`name: CI
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm test

  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint`}
          title="Job lint separado"
        />

        <ExerciseCard
          description="Añade cache de node_modules con actions/cache usando el hash del lockfile como key, y prepara un restore-keys de respaldo."
          hint="path: node_modules, key con hashFiles('package-lock.json'), restore-keys con prefijo por OS."
          level="Intermedio"
          num={3}
          solution={`- uses: actions/cache@v4
  with:
    path: node_modules
    key: \${{ runner.os }}-node-\${{ hashFiles('package-lock.json') }}
    restore-keys: |
      \${{ runner.os }}-node-`}
          title="Cache de dependencias"
        />

        <ExerciseCard
          description="Despliega el build a GitHub Pages con un job deploy que dependa del job de tests (needs)."
          hint="Usa actions/configure-pages y actions/upload-pages-artifact. El job necesita needs: test."
          level="Avanzado"
          num={4}
          solution={`name: Deploy Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - run: npm ci && npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out
      - id: deployment
        uses: actions/deploy-pages@v4`}
          title="Deploy a GitHub Pages"
        />

        <ExerciseCard
          description="Configura una matrix que ejecute los tests en Node 18, 20 y 22, y añade una combinación extra con include que corra también el build en Node 22."
          hint="strategy.matrix.node-version con [18, 20, 22] e include con node-version 22 y build: true."
          level="Avanzado"
          num={5}
          solution={`name: CI Matrix
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]
        include:
          - node-version: 22
            build: true
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build
        if: \${{ matrix.build }}`}
          title="Matriz de versiones de Node"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        Con GitHub Actions tu repositorio deja de ser código inerte: cada push
        se comprueba, se prueba y se publica de forma reproducible. Los patrones
        de este tutorial — jobs separados, cache, secrets, matrices — son los
        mismos bloques con los que se construyen pipelines de cualquier
        complejidad.
      </BlogP>
    </article>
  );
}
