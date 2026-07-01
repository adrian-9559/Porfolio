"use client";
import { useState } from "react";
import { Button, Modal } from "@heroui/react";

import {
  BlogCallout,
  BlogCode,
  BlogH2,
  BlogH3,
  BlogLi,
  BlogOl,
  BlogP,
  BlogUl,
} from "@/components/blog/shared";

const fileDetails = [
  {
    id: "agents",
    name: "AGENTS.md / CLAUDE.md",
    icon: "📋",
    desc: "Instrucciones persistentes para el asistente IA. Define reglas, stack, rutas clave y decisiones de arquitectura.",
    use: "Siempre — es el archivo más importante",
    color: "sky",
    detail:
      "Es el archivo que toda IA (OpenCode, Claude Code, Cursor) busca automáticamente al iniciar una sesión. Contiene las reglas del proyecto que el asistente debe seguir siempre.",
    sections: [
      {
        title: "Encabezado del proyecto",
        content: "Nombre, descripción, stack tecnológico con versiones",
      },
      {
        title: "Estructura de carpetas",
        content: "Rutas clave del proyecto organizadas por módulo o capa",
      },
      {
        title: "Reglas globales",
        content:
          "Normas obligatorias: formato de código, imports, convenciones, errores a evitar",
      },
      {
        title: "Decisiones de arquitectura",
        content:
          "Por qué se eligió cada librería o patrón. Evita que la IA sugiera alternativas incorrectas",
      },
      {
        title: "Módulos implementados",
        content: "Lista de lo que ya está construido, con rutas y responsables",
      },
    ],
    example: `# Portfolio — AI Context

## Stack
- Frontend: Next.js 16 (pages-router), React, TypeScript, TailwindCSS
- Backend: Node.js, Express, TypeScript
- Database: Supabase (PostgreSQL + Auth)

## Reglas globales
1. Cambios mínimos — solo patches, nunca reescribir archivos completos
2. Reutilizar primero — buscar existente antes de crear
3. TypeScript estricto — sin \`any\` salvo casos justificados`,
    prompt: `Eres un experto en proyectos con IA. Analiza mi proyecto (stack, estructura, dependencias) y genera un archivo AGENTS.md (o CLAUDE.md) completo que incluya:

1. **Encabezado del proyecto** — nombre, descripción y stack con versiones exactas
2. **Estructura de carpetas** — rutas clave de mi proyecto
3. **Reglas globales** — normas que el asistente IA debe seguir siempre (convenciones de código, imports, errores a evitar)
4. **Decisiones de arquitectura** — por qué se eligió cada librería o patrón
5. **Módulos implementados** — lo que ya está construido con rutas

Examina mi código y extrae patrones reales que uses. Las reglas deben ser específicas de mi proyecto, no genéricas.`,
  },
  {
    id: "design",
    name: "DESIGN.md",
    icon: "🎨",
    desc: "Sistema de diseño unificado: paleta de colores, tipografía, espaciado, componentes y tokens CSS.",
    use: "Proyectos con frontend o identidad visual",
    color: "pink",
    detail:
      "Unifica la identidad visual del proyecto para que la IA genere código coherente con la marca. Sin este archivo, la IA inventa colores y estilos cada vez.",
    sections: [
      {
        title: "Colores",
        content:
          "Primario, secundario, fondo, texto, éxito/warning/error. Incluir valores HEX/RGB para light y dark mode",
      },
      {
        title: "Tipografía",
        content:
          "Fuentes (Google Fonts / sistema), tamaños por jerarquía (h1→small), pesos, interlineado",
      },
      {
        title: "Espaciado",
        content:
          "Escala base (4px), márgenes de componentes, gap entre secciones",
      },
      {
        title: "Bordes y sombras",
        content:
          "Radios (sm/md/lg/xl), colores de borde light/dark, elevaciones de cards y modales",
      },
      {
        title: "Componentes",
        content:
          "Variantes de botones, inputs, cards, modales con ejemplos de Tailwind classes",
      },
    ],
    example: `# Design System

## Colores
- primary: #8B5CF6 (Violet)
- background: #FAFAFA (light) / #0A0A0A (dark)
- text: #1D1D1F (light) / #F5F5F7 (dark)

## Tipografía
- Font: Inter, sistema sans-serif
- h1: 36px bold, h2: 24px bold, body: 14px regular

## Componentes
- Button: filled (primary), outline (secondary), ghost`,
    prompt: `Eres un diseñador de sistemas de diseño. Analiza mi proyecto frontend y genera un archivo DESIGN.md completo que incluya:

1. **Colores** — extrae los colores reales que uso en mi código (Tailwind classes, CSS variables, valores HEX). Incluir light y dark mode
2. **Tipografía** — fuentes, tamaños por jerarquía, pesos. Revisa mi tailwind.config o CSS
3. **Espaciado** — escala que uso realmente en componentes y layouts
4. **Bordes y sombras** — radios de esquinas, elevaciones de cards, colores de borde
5. **Componentes** — variantes de botones, inputs, cards tal como aparecen en mi códigobase

Revisa mis archivos .tsx y .css para extraer los valores reales. Nada inventado.`,
  },
  {
    id: "memory",
    name: "MEMORY.md / project-state.md",
    icon: "🧠",
    desc: "Estado actual del proyecto, tareas completadas y pendientes. Evita que la IA pierda contexto entre sesiones.",
    use: "Proyectos grandes con colaboración IA frecuente",
    color: "amber",
    detail:
      "La IA no recuerda sesiones anteriores. MEMORY.md es el 'estado guardado' del proyecto: qué se hizo, qué falta, qué decisiones se tomaron.",
    sections: [
      {
        title: "Estado actual",
        content:
          "Frase resumen: 'El proyecto está en fase inicial, con autenticación implementada y CRUD de usuarios funcionando'",
      },
      {
        title: "Tareas completadas",
        content:
          "Lista con checkmarks de lo que ya funciona. Incluir rutas de archivos relevantes",
      },
      {
        title: "Tareas pendientes",
        content:
          "Próximos pasos ordenados por prioridad. La IA los usará para saber qué sigue",
      },
      {
        title: "Decisiones recientes",
        content:
          "Cambios de arquitectura o diseño que se tomaron en la última sesión. Evita que la IA proponga lo contrario",
      },
      {
        title: "Problemas conocidos",
        content:
          "Bugs, deuda técnica, cosas que sabes que están mal pero no has arreglado",
      },
    ],
    example: `# Project State — 01/07/2026

## Estado: Desarrollo activo (backend completo, frontend en progreso)

## Completado
- ✅ Auth con Supabase (email + Google OAuth)
- ✅ CRUD de usuarios (profiles table)
- ✅ API REST con Express (routes, controllers, services)

## Pendiente
- [ ] Frontend: Página de dashboard (components/dashboard/)
- [ ] Tests: Unit tests para servicios del backend`,
    prompt: `Eres un gestor de proyectos técnicos. Analiza mi proyecto y genera un archivo MEMORY.md con el estado actual incluyendo:

1. **Estado general** — resumen de una frase del momento del proyecto
2. **Tareas completadas** — todo lo que ya funciona, con rutas de archivos clave
3. **Tareas pendientes** — lo que falta por hacer, ordenado por prioridad
4. **Decisiones recientes** — cambios de arquitectura o diseño de la última sesión
5. **Problemas conocidos** — bugs, deuda técnica, cosas pendientes de arreglar

Revisa los archivos del proyecto, los commits recientes y cualquier TODO/FIXME para generar una imagen precisa.`,
  },
  {
    id: "architecture",
    name: "ARCHITECTURE.md",
    icon: "🏗️",
    desc: "Diagramas y decisiones de arquitectura: estructura de carpetas, patrones, flujo de datos.",
    use: "Proyectos con backend o sistemas complejos",
    color: "purple",
    detail:
      "Describe cómo está organizado el proyecto a alto nivel. La IA lo usa para saber dónde poner cada cosa y qué patrón seguir.",
    sections: [
      {
        title: "Estructura de carpetas",
        content:
          "Árbol del proyecto con descripción de cada directorio principal",
      },
      {
        title: "Patrones de diseño",
        content:
          "Controllers/Services/Repository, Server Actions, composición de componentes, etc.",
      },
      {
        title: "Flujo de datos",
        content:
          "Cómo viaja la información: petición → middleware → controller → service → BD → respuesta",
      },
      {
        title: "Base de datos",
        content:
          "Esquema principal, tablas clave, relaciones, políticas de seguridad (RLS)",
      },
      {
        title: "Autenticación",
        content:
          "Flujo de login, refresh tokens, protección de rutas, roles y permisos",
      },
    ],
    example: `# Architecture

## Estructura
 frontend/apps/web/
 ├── pages/       # Next.js Pages Router
 ├── components/  # UI components (reutilizables)
 ├── features/    # Módulos por funcionalidad
 ├── lib/         # Utilidades, config, API client
 └── layouts/     # Layouts de página

## Patrón backend
 Route → Middleware → Controller → Service → Repository → BD`,
    prompt: `Eres un arquitecto de software. Analiza mi proyecto y genera un archivo ARCHITECTURE.md que documente:

1. **Estructura de carpetas** — árbol completo de directorios con descripción de cada uno
2. **Patrones de diseño** — qué patrones uso realmente (controllers/services, server actions, composición, etc.)
3. **Flujo de datos** — cómo viaja la información desde la petición hasta la respuesta
4. **Base de datos** — esquema, tablas principales, relaciones y políticas de seguridad
5. **Autenticación** — flujo completo de login, refresh, protección de rutas

Examina mi códigobase real para extraer la arquitectura tal como está implementada, no cómo debería ser.`,
  },
  {
    id: "api",
    name: "API.md",
    icon: "🔌",
    desc: "Contrato de API: endpoints, formatos request/response, autenticación.",
    use: "Proyectos con API backend",
    color: "emerald",
    detail:
      "Documenta el contrato completo de la API para que la IA consuma los endpoints correctamente sin tener que adivinar rutas o formatos.",
    sections: [
      {
        title: "Endpoints",
        content:
          "Lista completa: método HTTP, ruta, descripción, parámetros (path/query/body)",
      },
      {
        title: "Formato de respuesta",
        content:
          "Estructura unificada: { success, data, error }. Ejemplos de cada respuesta",
      },
      {
        title: "Autenticación",
        content:
          "Tipo de auth (Bearer JWT), cómo obtener el token, cabeceras requeridas",
      },
      {
        title: "Errores",
        content:
          "Códigos de error comunes, formato de errores, mensajes esperados",
      },
      {
        title: "Ejemplos",
        content:
          "curl o fetch para cada endpoint. La IA los usará para escribir tests o integrar el frontend",
      },
    ],
    example: `# API Contract

## Formato
 { success: boolean, data?: T, error?: string }

## Endpoints
 GET  /api/users        → listar usuarios
 POST /api/auth/login   → { email, password } → { accessToken, refreshToken }
 GET  /api/users/:id    → usuario por ID (require auth)

## Auth
 Authorization: Bearer <accessToken>
 Refresh: POST /api/auth/refresh { refresh_token }`,
    prompt: `Eres un documentador de APIs. Analiza mi backend y genera un archivo API.md completo que incluya:

1. **Endpoints** — lista de todas las rutas con método HTTP, ruta, descripción y parámetros
2. **Formato de respuesta** — estructura unificada que usa mi API
3. **Autenticación** — cómo se autentican las peticiones, formato del token, refresh
4. **Errores** — códigos de error, formato, mensajes
5. **Ejemplos** — curl o fetch para cada endpoint

Revisa mis archivos de rutas y controladores para extraer los endpoints reales. Incluye tipos TypeScript si los hay.`,
  },
];

const rulesExamples = [
  "Sin confirm(), usar estado React para confirmaciones inline",
  "Preferir server actions sobre API routes en Next.js",
  "Todos los archivos nuevos incluir TypeScript estricto",
  "Las queries a BD usar siempre supabaseAdmin (bypass RLS)",
  "Los colores siempre desde variables CSS, nunca valores hardcodeados",
  "Los mensajes de error en español, el código en inglés",
  "Las migraciones de BD en archivos SQL separados, no en código",
];

function FolderIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export default function AIContent() {
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const file = fileDetails.find((f) => f.id === activeFile);

  const copyPrompt = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback: seleccionar manual
    }
  };

  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 mb-8">
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800/50">
          Tutorial
        </span>
        <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
          20 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-4"
        style={{ letterSpacing: "-0.03em" }}
      >
        Cómo empezar un proyecto con IA
      </h1>
      <p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed mb-8">
        Guía práctica para construir proyectos asistidos por IA: desde los
        archivos de contexto hasta el flujo de trabajo diario. Aprende a crear
        un AGENTS.md, un DESIGN.md y a dirigir a la IA como si fuera tu mejor
        desarrollador junior.
      </p>

      <div className="h-px bg-black/8 dark:bg-white/8 mb-8" />

      <BlogP>
        La diferencia entre una IA que te ahorra tiempo y una que te da dolor de
        cabeza está en cómo le comunicas lo que quieres. Igual que un
        desarrollador humano necesita contexto —saber en qué proyecto trabaja,
        qué librerías usas, qué convenciones sigues— la IA también lo necesita.
      </BlogP>
      <BlogP>
        Este tutorial te enseña a crear los archivos de contexto que toda IA
        respeta, a definir un sistema de diseño que se mantenga consistente y a
        establecer un flujo de trabajo que maximice la productividad.
      </BlogP>

      <BlogH2>¿Por qué los archivos de contexto?</BlogH2>
      <BlogP>
        Cada vez que hablas con una IA (Claude, GPT, OpenCode, Cursor), empiezas
        con una pizarra en blanco. La IA no sabe qué stack usas, si prefieres
        camelCase o snake_case, ni qué colores tiene tu marca.
      </BlogP>
      <BlogP>
        Los archivos de contexto (CLAUDE.md, AGENTS.md) solucionan esto: son
        instrucciones persistentes que la IA lee al inicio de cada sesión. Una
        vez escritos, no tienes que repetir las mismas explicaciones cada vez.
      </BlogP>

      <BlogCallout type="tip">
        La mayoría de asistentes IA (OpenCode, Claude Code, Cursor) leen
        automáticamente <strong>CLAUDE.md</strong> o <strong>AGENTS.md</strong>{" "}
        de la raíz del proyecto. Solo crea el archivo y escribe las reglas.
      </BlogCallout>

      <BlogH2>Paso 1: El archivo de reglas (AGENTS.md / CLAUDE.md)</BlogH2>
      <BlogP>
        Este es el archivo más importante. Define <strong>cómo</strong> quieres
        que la IA trabaje: qué stack usas, qué patrones sigues, qué no debe
        hacer.
      </BlogP>

      <BlogH3>Estructura recomendada</BlogH3>
      <BlogOl>
        <BlogLi>
          <strong>Encabezado del proyecto</strong> — nombre, descripción,
          propósito
        </BlogLi>
        <BlogLi>
          <strong>Stack tecnológico</strong> — frameworks, librerías, versiones
        </BlogLi>
        <BlogLi>
          <strong>Estructura de carpetas</strong> — rutas clave, dónde está cada
          cosa
        </BlogLi>
        <BlogLi>
          <strong>Reglas globales</strong> — normas que el asistente debe seguir
          siempre
        </BlogLi>
        <BlogLi>
          <strong>Decisiones de arquitectura</strong> — por qué se eligió una
          solución sobre otra
        </BlogLi>
        <BlogLi>
          <strong>Módulos implementados</strong> — qué está hecho y cómo se
          organiza
        </BlogLi>
      </BlogOl>

      <BlogH3>Ejemplo real</BlogH3>
      <BlogCode>{`# Portfolio — AI Context

## Stack
- Frontend: Next.js 16 (pages-router), React, TypeScript, TailwindCSS, HeroUI
- Backend: Node.js, Express, TypeScript
- Database: Supabase (PostgreSQL + Auth)

## Reglas globales (OBLIGATORIO)
1. Cambios mínimos — solo patches, nunca reescribir archivos completos
2. Reutilizar primero — buscar existente antes de crear
3. TypeScript estricto — sin \`any\` salvo casos justificados
4. API formato: { success, data, error } — usar ok() en controllers
5. Sin confirm() — confirmaciones inline con estado React
6. Sin comentarios obvios — solo el WHY no-obvio`}</BlogCode>

      <BlogCallout type="info">
        Cuanto más específicas sean las reglas, mejor. "Usa Tailwind" es peor
        que "Los colores siempre desde variables CSS, nunca valores
        hardcodeados".
      </BlogCallout>

      <BlogH3>Buenas prácticas para las reglas</BlogH3>
      <BlogUl>
        {rulesExamples.map((rule) => (
          <BlogLi key={rule}>{rule}</BlogLi>
        ))}
      </BlogUl>

      <BlogH3>Cómo actualizarlo</BlogH3>
      <BlogP>
        El AGENTS.md no es estático. Cada vez que la IA hace algo que no te
        gusta —un patrón incorrecto, una librería que no usa— añade una regla.
        Con el tiempo, el archivo crece y la IA se vuelve más precisa.
      </BlogP>
      <BlogCallout type="done">
        Mantén el AGENTS.md actualizado. Es una inversión: cada regla nueva
        evita errores futuros.
      </BlogCallout>

      <BlogH2>Paso 2: El sistema de diseño (DESIGN.md)</BlogH2>
      <BlogP>
        Si tu proyecto tiene interfaz de usuario, necesitas un DESIGN.md. Este
        archivo unifica la paleta de colores, tipografía, espaciado y
        componentes para que la IA genere código visualmente coherente.
      </BlogP>

      <BlogH3>Qué debe incluir</BlogH3>
      <BlogUl>
        <BlogLi>
          <strong>Colores</strong> — primario, secundario, fondo, texto, estados
          (hover, active, disabled), modo oscuro
        </BlogLi>
        <BlogLi>
          <strong>Tipografía</strong> — fuentes, tamaños, pesos, jerarquía (h1,
          h2, body, small)
        </BlogLi>
        <BlogLi>
          <strong>Espaciado</strong> — escala (4, 8, 12, 16, 24, 32, 48, 64),
          márgenes, paddings
        </BlogLi>
        <BlogLi>
          <strong>Bordes y sombras</strong> — radios, elevaciones, colores de
          borde
        </BlogLi>
        <BlogLi>
          <strong>Componentes</strong> — botones, inputs, cards, modales con sus
          variantes
        </BlogLi>
        <BlogLi>
          <strong>Iconos</strong> — estilo (outline, solid), tamaño estándar,
          librería
        </BlogLi>
      </BlogUl>

      <BlogH3>Ejemplo de DESIGN.md</BlogH3>
      <BlogCode>{`# Design System

## Colores
- primary: #8B5CF6 (Violet)
- secondary: #06B6D4 (Cyan)
- background: #FAFAFA (light) / #0A0A0A (dark)
- text: #1D1D1F (light) / #F5F5F7 (dark)
- muted: #6E6E73 (light) / #86868B (dark)
- success: #10B981, warning: #F59E0B, error: #EF4444

## Tipografía
- Font: Inter, sistema sans-serif
- h1: 36px bold, h2: 24px bold, h3: 18px semibold
- body: 14px regular, small: 12px, caption: 11px

## Espaciado
- Escala: 2, 4, 8, 12, 16, 24, 32, 48, 64
- Cards: p-4/p-6, gap entre secciones: 24px

## Bordes
- radius: 8px (sm), 12px (md), 16px (lg), 24px (xl)
- border color: black/8 (light), white/8 (dark)

## Componentes
- Button: filled (primary), outline (secondary), ghost (tertiary)
- Input: border-0 bg-black/5 rounded-xl p-3
- Card: rounded-2xl border p-4 bg-white dark:bg-[#111116]`}</BlogCode>

      <BlogCallout type="tip">
        Usa <strong>variables CSS</strong> para los tokens de diseño. Así la IA
        puede referenciarlas por nombre y cambiar el tema completo editando un
        solo archivo.
      </BlogCallout>

      <BlogH3>Relación entre DESIGN.md y los componentes</BlogH3>
      <BlogP>
        El DESIGN.md no reemplaza a Tailwind o a tu framework de UI. Es una{" "}
        <strong>capa de abstracción</strong> que le dice a la IA qué decisiones
        de diseño tomar. Si usas Tailwind, las reglas serían algo como: "usar
        bg-violet-500 para primary, text-zinc-900 dark:text-zinc-100 para
        texto".
      </BlogP>
      <BlogP>
        Si cambias de opinión sobre un color más tarde, actualizas el DESIGN.md
        y le pides a la IA que aplique el cambio en todos los componentes.
      </BlogP>

      <BlogH2>Paso 3: Archivos complementarios</BlogH2>
      <BlogP>
        Dependiendo del tamaño de tu proyecto, puedes añadir más archivos de
        contexto. Aquí los más útiles. Haz clic en cada uno para ver los
        detalles:
      </BlogP>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {fileDetails.map((f) => (
          <button
            key={f.id}
            className="text-left rounded-xl border border-black/8 dark:border-white/8 p-4 hover:border-sky-200 dark:hover:border-sky-800/40 transition-colors cursor-pointer bg-transparent w-full"
            type="button"
            onClick={() => setActiveFile(f.id)}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-base">{f.icon}</span>
              <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
                {f.name}
              </p>
            </div>
            <p className="text-xs text-[#3a3a3c] dark:text-[#aeaeb2] mb-2 leading-relaxed">
              {f.desc}
            </p>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-[10px] font-semibold">
                {f.use}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-violet-600 dark:text-violet-400">
                Ver detalles
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Modal de detalle de archivo */}
      {file && (
        <Modal.Backdrop
          isOpen={!!activeFile}
          onOpenChange={(open) => {
            if (!open) setActiveFile(null);
          }}
        >
          <Modal.Container scroll="inside" size="cover">
            <Modal.Dialog>
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                  <span className="text-lg">{file.icon}</span>
                </Modal.Icon>
                <Modal.Heading>{file.name}</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <div className="space-y-5">
                  <div>
                    <p className="text-sm text-[#3a3a3c] dark:text-[#aeaeb2] leading-relaxed">
                      {file.detail}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white uppercase tracking-wider mb-3">
                      Secciones recomendadas
                    </p>
                    <div className="space-y-2">
                      {file.sections.map((s) => (
                        <div
                          key={s.title}
                          className="rounded-lg border border-black/8 dark:border-white/8 p-3"
                        >
                          <p className="text-xs font-bold text-[#1d1d1f] dark:text-white mb-0.5">
                            {s.title}
                          </p>
                          <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                            {s.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white uppercase tracking-wider mb-2">
                      Ejemplo
                    </p>
                    <pre className="bg-[#0d1117] rounded-xl p-4 overflow-x-auto text-xs leading-relaxed [&>code]:text-[#e6edf3]">
                      <code>{file.example.trimEnd()}</code>
                    </pre>
                  </div>

                  <div className="rounded-xl border-2 border-violet-200 dark:border-violet-800/40 p-4 bg-gradient-to-br from-violet-50/40 to-transparent dark:from-violet-950/10">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-violet-800 dark:text-violet-300 uppercase tracking-wider">
                        Prompt para tu IA
                      </p>
                      <button
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold transition-colors bg-violet-200/60 dark:bg-violet-800/30 text-violet-700 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-700/40"
                        type="button"
                        onClick={() => copyPrompt(file.id, file.prompt)}
                      >
                        {copiedId === file.id ? (
                          <>✅ Copiado</>
                        ) : (
                          <>
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                              />
                            </svg>
                            Copiar prompt
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-[#1d1d1f] dark:text-white/90 leading-relaxed">
                      Copia este prompt y pégalo en tu asistente IA para que
                      genere el archivo <strong>{file.name}</strong> analizando
                      tu proyecto real:
                    </p>
                    <div className="relative mt-3">
                      <pre className="bg-[#0d1117] rounded-xl p-4 overflow-x-auto text-xs leading-relaxed [&>code]:text-[#e6edf3] pr-12">
                        <code>{file.prompt}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button slot="close" variant="secondary">
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      )}

      <BlogH2>Paso 4: Cómo hablarle a la IA</BlogH2>
      <BlogP>
        Los archivos de contexto son el <strong>qué</strong>, pero necesitas
        también el <strong>cómo</strong>. La forma en que le pides cosas a la IA
        determina la calidad del resultado.
      </BlogP>

      <BlogH3>Principios básicos</BlogH3>
      <BlogUl>
        <BlogLi>
          <strong>Sé específico</strong> — "Añade un botón de guardar" ← "Añade
          un botón de guardar en la esquina superior derecha del formulario,
          color primary, icono de check, que se deshabilite mientras se envía"
        </BlogLi>
        <BlogLi>
          <strong>Una cosa a la vez</strong> — Las IAs funcionan mejor con
          tareas atómicas. "Crea el formulario de login" es mejor que "Haz toda
          la app"
        </BlogLi>
        <BlogLi>
          <strong>Da contexto</strong> — "Crea un componente TarjetaProducto que
          reciba title, price, image y onClick. Sigue el diseño de las cards
          existentes en components/ui/"
        </BlogLi>
        <BlogLi>
          <strong>Corrige y refina</strong> — Si la IA genera algo incorrecto,
          dímelo. "El botón debería ser outline, no primary" — la IA aprende de
          cada corrección
        </BlogLi>
        <BlogLi>
          <strong>Usa referencias</strong> — "Mira el archivo
          components/Layout.tsx y haz algo similar para la página de dashboard"
        </BlogLi>
      </BlogUl>

      <BlogH3>Qué evitar</BlogH3>
      <BlogUl>
        <BlogLi>
          <strong>Tareas abiertas</strong> — "Haz que la app se vea mejor" no da
          ninguna dirección útil
        </BlogLi>
        <BlogLi>
          <strong>Instrucciones contradictorias</strong> — "Sé creativo pero
          sigue las reglas al pie de la letra" confunde a la IA
        </BlogLi>
        <BlogLi>
          <strong>Cambiar de tema continuamente</strong> — Cada nuevo tema
          resetea parcialmente el contexto. Termina una tarea antes de empezar
          otra
        </BlogLi>
        <BlogLi>
          <strong>Asumir que recuerda</strong> — La IA no tiene memoria entre
          sesiones. Todo lo que necesita saber debe estar en los archivos de
          contexto o en el mensaje actual
        </BlogLi>
      </BlogUl>

      <BlogCallout type="warn">
        La IA no recuerda conversaciones anteriores. Si trabajas en un proyecto
        durante días, los archivos de contexto son el único medio para mantener
        la coherencia.
      </BlogCallout>

      <BlogH2>Paso 5: Flujo de trabajo diario</BlogH2>
      <BlogP>
        Con los archivos de contexto en su sitio, el flujo de trabajo se vuelve
        predecible:
      </BlogP>

      <BlogOl>
        <BlogLi>
          <strong>Abrir el proyecto</strong> — la IA lee AGENTS.md y DESIGN.md
          automáticamente
        </BlogLi>
        <BlogLi>
          <strong>Dar una tarea concreta</strong> — "Crea el componente Navbar
          en components/layout/"
        </BlogLi>
        <BlogLi>
          <strong>Revisar el resultado</strong> — la IA genera el código, tú lo
          revisas
        </BlogLi>
        <BlogLi>
          <strong>Corregir si es necesario</strong> — "Cambia el color del hover
          a primary-600"
        </BlogLi>
        <BlogLi>
          <strong>Actualizar el estado</strong> — marca la tarea como completada
          en MEMORY.md
        </BlogLi>
        <BlogLi>
          <strong>Repetir</strong> — siguiente tarea
        </BlogLi>
      </BlogOl>

      <BlogH3>Gestión del contexto</BlogH3>
      <BlogP>
        Cada sesión de IA tiene un límite de tokens (normalmente 100k–200k). Si
        trabajas en un proyecto grande, el contexto se llena rápido. Estrategias
        para gestionarlo:
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Divide el trabajo en sesiones temáticas</strong> — una sesión
          para backend, otra para frontend
        </BlogLi>
        <BlogLi>
          <strong>Mantén un MEMORY.md</strong> — resumen del estado actual para
          que la IA se ponga al día rápido
        </BlogLi>
        <BlogLi>
          <strong>Usa el AGENTS.md para lo estable</strong> — solo reglas que no
          cambian. Lo volátil (tareas pendientes) va en MEMORY.md
        </BlogLi>
        <BlogLi>
          <strong>Prioriza</strong> — Si el contexto se llena, pide a la IA que
          se centre en lo más importante y descarte lo accesorio
        </BlogLi>
      </BlogUl>

      <BlogH2>Ejemplo completo: proyecto real</BlogH2>
      <BlogP>
        Este mismo portfolio donde estás leyendo este tutorial usa el sistema
        que acabo de describir. Tiene:
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>CLAUDE.md</strong> — stack, reglas globales, estructura de
          carpetas, módulos implementados
        </BlogLi>
        <BlogLi>
          <strong>AGENTS.md</strong> — memorias que la IA carga según la tarea
          (backend, frontend, base de datos, auth...)
        </BlogLi>
        <BlogLi>
          <strong>Design system</strong> — definido en TailwindCSS con tokens
          consistentes y modo oscuro
        </BlogLi>
        <BlogLi>
          <strong>Archivos de estado</strong> — project-state.md con tareas
          completadas y pendientes
        </BlogLi>
      </BlogUl>

      <BlogP>
        Cada vez que empiezo una nueva sesión con la IA, ella ya sabe qué stack
        uso, cómo estructuro el código y qué colores tiene la marca. No tengo
        que repetir nada.
      </BlogP>

      <BlogCallout type="done">
        La clave no es tener la IA más potente, sino saber dirigirla. Con buenos
        archivos de contexto, hasta un modelo pequeño da resultados excelentes.
        Sin contexto, ni el modelo más grande acierta.
      </BlogCallout>

      <BlogH2>Resumen</BlogH2>
      <BlogUl>
        <BlogLi>
          Crea un <strong>AGENTS.md</strong> o <strong>CLAUDE.md</strong> con
          las reglas y stack del proyecto
        </BlogLi>
        <BlogLi>
          Crea un <strong>DESIGN.md</strong> con los tokens de diseño (colores,
          tipografía, espacios, componentes)
        </BlogLi>
        <BlogLi>
          Añade archivos complementarios según el tamaño del proyecto
          (MEMORY.md, ARCHITECTURE.md, API.md)
        </BlogLi>
        <BlogLi>
          Sé específico en tus instrucciones: una tarea concreta, contexto
          suficiente, referencias a archivos existentes
        </BlogLi>
        <BlogLi>
          Actualiza los archivos de contexto constantemente — cada regla nueva
          evita errores futuros
        </BlogLi>
        <BlogLi>
          Divide el trabajo en sesiones temáticas y gestiona el límite de tokens
        </BlogLi>
      </BlogUl>
    </article>
  );
}
