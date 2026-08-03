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

export default function TailwindContent() {
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
        Tailwind CSS: diseño utility-first
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Tailwind CSS es un framework que construye interfaces combinando
        clases utilitarias de un solo propósito directamente en el HTML. Este
        tutorial cubre instalación, spacing, layouts, responsive, dark mode y
        customización con la versión 4. Prerequisito conceptual: HTML y CSS.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="que-es">¿Qué es Tailwind?</BlogH2>

      <BlogP>
        A diferencia de Bootstrap, que trae componentes predefinidos, Tailwind
        es <strong>utility-first</strong>: cada clase aplica una única
        propiedad (<BlogInlineCode>p-4</BlogInlineCode> es solo padding de
        1rem). Tú compones la interfaz combinando estas clases en el HTML, sin
        escribir CSS en archivos separados.
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Velocidad:</strong> estilizas sin cambiar de archivo ni
          inventar nombres de clase.
        </BlogLi>
        <BlogLi>
          <strong>Consistencia:</strong> el spacing, la tipografía y los
          colores vienen de un design system único.
        </BlogLi>
        <BlogLi>
          <strong>Solo lo que usas:</strong> el CSS final se genera con las
          clases detectadas en tu código; no hay CSS muerto.
        </BlogLi>
        <BlogLi>
          <strong>Responsive integrado:</strong> los prefijos{" "}
          <BlogInlineCode>sm:</BlogInlineCode>, <BlogInlineCode>md:</BlogInlineCode>{" "}
          y <BlogInlineCode>lg:</BlogInlineCode> viven en la misma clase.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="info">
        La versión 4 (lanzada en 2025) cambia el motor a CSS nativo: nada de
        PostCSS con plugins, usa el plugin oficial{" "}
        <BlogInlineCode>@tailwindcss/vite</BlogInlineCode> y una directiva{" "}
        <BlogInlineCode>@import "tailwindcss"</BlogInlineCode> en tu CSS.
        Todo lo de este tutorial usa v4.
      </BlogCallout>

      <BlogH2 id="instalacion">Instalación</BlogH2>

      <BlogH3 id="instalar-vite">Con Vite</BlogH3>

      <BlogP>
        En un proyecto Vite (React, Vue, vanilla), se instala el paquete y su
        plugin:
      </BlogP>

      <BlogCode>{`npm install tailwindcss @tailwindcss/vite

// vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
})

// En tu CSS principal (src/index.css):
@import "tailwindcss";`}</BlogCode>

      <BlogH3 id="instalar-nextjs">Con Next.js</BlogH3>

      <BlogP>
        Con Next.js (App Router o pages router) se usa el PostCSS plugin que
        ya trae el paquete, o el plugin experimental de Vite según tu versión.
        Para v4 el método estándar:
      </BlogP>

      <BlogCode>{`npm install tailwindcss @tailwindcss/postcss

// postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

// En tu CSS global (globals.css):
@import "tailwindcss";`}</BlogCode>

      <BlogCallout type="warn">
        En v4 <strong>no existe</strong>{" "}
        <BlogInlineCode>tailwind.config.js</BlogInlineCode> obligatorio ni la
        directiva <BlogInlineCode>@tailwind base/components/utilities</BlogInlineCode>.
        Todo se configura desde CSS con{" "}
        <BlogInlineCode>@theme</BlogInlineCode> y la detección de contenido es
        automática. Si migras desde v3, revisa la guía oficial de migración.
      </BlogCallout>

      <BlogH2 id="spacing">Spacing y tipografía</BlogH2>

      <BlogP>
        El <strong>spacing</strong> usa una escala fija: cada unidad equivale
        a 0.25rem (4px). <BlogInlineCode>p-4</BlogInlineCode> son 1rem,{" "}
        <BlogInlineCode>mt-2</BlogInlineCode> es margin-top de 0.5rem:
      </BlogP>

      <BlogCode>{`<div class="p-4">
  <!-- padding: 1rem en los 4 lados -->
  <button class="px-6 py-2 m-2">
    <!-- px: horizontal, py: vertical, m: margin -->
  </button>
</div>

<!-- Equivalencias de la escala -->
p-0  = 0px
p-1  = 0.25rem (4px)
p-2  = 0.5rem  (8px)
p-4  = 1rem    (16px)
p-8  = 2rem    (32px)
p-16 = 4rem    (64px)`}</BlogCode>

      <BlogP>
        La <strong>tipografía</strong> también tiene escala:{" "}
        <BlogInlineCode>text-sm</BlogInlineCode>,{" "}
        <BlogInlineCode>text-base</BlogInlineCode>,{" "}
        <BlogInlineCode>text-2xl</BlogInlineCode>... y pesos con{" "}
        <BlogInlineCode>font-*</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`<h1 class="text-3xl font-bold tracking-tight">Título</h1>
<p class="text-sm text-gray-600 leading-relaxed">
  Párrafo con interlineado relajado y color gris.
</p>
<span class="font-mono text-xs uppercase">CÓDIGO</span>`}</BlogCode>

      <BlogP>
        Utilidades útiles de texto: <BlogInlineCode>text-center</BlogInlineCode>,{" "}
        <BlogInlineCode>truncate</BlogInlineCode> (ellipsis),{" "}
        <BlogInlineCode>whitespace-nowrap</BlogInlineCode> y{" "}
        <BlogInlineCode>leading-*</BlogInlineCode> para interlineado.
      </BlogP>

      <BlogH2 id="flexbox-grid">Flexbox y Grid</BlogH2>

      <BlogP>
        Los dos sistemas de layout se declaran con una clase y se ajustan con
        utilidades. Flexbox:
      </BlogP>

      <BlogCode>{`<div class="flex items-center justify-between gap-4">
  <div class="flex items-center gap-2">
    <img class="w-8 h-8 rounded-full" src="avatar.jpg" alt="" />
    <span class="font-medium">Ana García</span>
  </div>
  <button class="px-4 py-2 bg-blue-600 text-white rounded-lg">
    Seguir
  </button>
</div>`}</BlogCode>

      <BlogUl>
        <BlogLi>
          <BlogInlineCode>flex</BlogInlineCode> — display flex.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>items-center</BlogInlineCode> — alinea verticalmente.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>justify-between</BlogInlineCode> — separa los hijos
          con espacio entre ellos.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>gap-4</BlogInlineCode> — espacio entre hijos.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>flex-1</BlogInlineCode> — el hijo crece para ocupar
          el espacio restante.
        </BlogLi>
      </BlogUl>

      <BlogP>
        Grid:
      </BlogP>

      <BlogCode>{`<div class="grid grid-cols-3 gap-4">
  <div class="p-4 bg-white rounded-xl shadow">Item 1</div>
  <div class="p-4 bg-white rounded-xl shadow">Item 2</div>
  <div class="p-4 bg-white rounded-xl shadow">Item 3</div>
</div>

<!-- Variantes útiles -->
grid-cols-1        → 1 columna
grid-cols-3        → 3 columnas iguales
grid-cols-[200px_1fr] → columnas explícitas
col-span-2         → el hijo ocupa 2 columnas
grid-flow-row / grid-flow-col → dirección`}</BlogCode>

      <BlogCallout type="info">
        El patrón más común en la web real:{" "}
        <BlogInlineCode>flex</BlogInlineCode> para barras y filas de un solo
        eje, <BlogInlineCode>grid</BlogInlineCode> para rejillas de tarjetas
        y columnas. Y ambos aceptan <BlogInlineCode>gap-*</BlogInlineCode>,
        así que olvídate de los márgenes negativos.
      </BlogCallout>

      <BlogH2 id="responsive">Responsive</BlogH2>

      <BlogP>
        Los prefijos <BlogInlineCode>sm:</BlogInlineCode>,{" "}
        <BlogInlineCode>md:</BlogInlineCode>,{" "}
        <BlogInlineCode>lg:</BlogInlineCode> y{" "}
        <BlogInlineCode>xl:</BlogInlineCode> aplican la utilidad solo desde
        ese breakpoint en adelante (mobile-first):
      </BlogP>

      <BlogCode>{`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- 1 columna en móvil, 2 en tablet, 4 en escritorio -->
</div>

<p class="text-sm md:text-base lg:text-lg">
  El texto crece con la pantalla.
</p>

<div class="flex flex-col md:flex-row gap-4">
  <!-- Apilado en móvil, fila en escritorio -->
</div>`}</BlogCode>

      <BlogP>
        Los breakpoints por defecto en v4:{" "}
        <BlogInlineCode>sm</BlogInlineCode> 640px,{" "}
        <BlogInlineCode>md</BlogInlineCode> 768px,{" "}
        <BlogInlineCode>lg</BlogInlineCode> 1024px,{" "}
        <BlogInlineCode>xl</BlogInlineCode> 1280px,{" "}
        <BlogInlineCode>2xl</BlogInlineCode> 1536px. Como es mobile-first,{" "}
        <BlogInlineCode>md:grid-cols-2</BlogInlineCode> significa "desde
        768px en adelante".
      </BlogP>

      <BlogCallout type="warn">
        Empieza siempre por la versión móvil y añade prefijos para escalar. Si
        necesitas un breakpoint fuera de la escala, v4 permite definirlo en{" "}
        <BlogInlineCode>@theme</BlogInlineCode> con{" "}
        <BlogInlineCode>--breakpoint-*</BlogInlineCode>.
      </BlogCallout>

      <BlogH2 id="estados">Estados</BlogH2>

      <BlogP>
        Las variantes de estado prefijan la utilidad:{" "}
        <BlogInlineCode>hover:</BlogInlineCode>,{" "}
        <BlogInlineCode>focus:</BlogInlineCode>,{" "}
        <BlogInlineCode>active:</BlogInlineCode>,{" "}
        <BlogInlineCode>disabled:</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`<button
  class="px-4 py-2 bg-blue-600 text-white rounded-lg
         hover:bg-blue-700 active:scale-95
         focus:outline-none focus:ring-2 focus:ring-blue-300
         disabled:opacity-50"
>
  Guardar
</button>`}</BlogCode>

      <BlogP>
        <BlogInlineCode>group-hover:</BlogInlineCode> aplica estilo a un hijo
        cuando se hace hover en un ancestro marcado con{" "}
        <BlogInlineCode>group</BlogInlineCode>. Es la base de tarjetas y
        menús que reaccionan al pasar el ratón:
      </BlogP>

      <BlogCode>{`<a class="group block p-4 rounded-xl hover:bg-gray-50">
  <h3 class="font-semibold group-hover:text-blue-600">
    Aprende Tailwind
  </h3>
  <p class="text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
    Texto que aparece al hacer hover.
  </p>
</a>`}</BlogCode>

      <BlogP>
        Otras variantes muy usadas:{" "}
        <BlogInlineCode>focus-within:</BlogInlineCode> (para contenedores de
        formularios), <BlogInlineCode>peer-*</BlogInlineCode> (hermanos
        previos), <BlogInlineCode>first:/last:</BlogInlineCode> (listas) y{" "}
        <BlogInlineCode>even:/odd:</BlogInlineCode> (filas alternas).
      </BlogP>

      <BlogH2 id="dark-mode">Dark mode</BlogH2>

      <BlogP>
        La variante <BlogInlineCode>dark:</BlogInlineCode> aplica estilos
        cuando el sistema (o el HTML) está en tema oscuro:
      </BlogP>

      <BlogCode>{`<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <p class="text-gray-600 dark:text-gray-400">
    Se adapta automáticamente al tema.
  </p>
</div>`}</BlogCode>

      <BlogP>
        En v4, por defecto el dark mode usa la media query{" "}
        <BlogInlineCode>prefers-color-scheme</BlogInlineCode>: funciona
        siguiendo la configuración del sistema. Si quieres un toggle manual,
        configúralo con un selector:
      </BlogP>

      <BlogCode>{`/* globals.css — dark mode basado en clase .dark */
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

/* Ahora dark: responde a la clase .dark en el <html> */
<html class="dark">
  <div class="bg-white dark:bg-gray-900">
    Oscuro cuando html lleva la clase .dark
  </div>
</html>`}</BlogCode>

      <BlogCallout type="info">
        Con el toggle manual, un pequeño script en el{" "}
        <BlogInlineCode>&lt;head&gt;</BlogInlineCode> lee el valor guardado
        (localStorage) y añade/elimina la clase <BlogInlineCode>.dark</BlogInlineCode>{" "}
        del <BlogInlineCode>&lt;html&gt;</BlogInlineCode> antes del primer
        paint, evitando un flash del tema equivocado.
      </BlogCallout>

      <BlogH2 id="customizacion">Customización</BlogH2>

      <BlogP>
        En v4, todo el tema se declara en CSS con{" "}
        <BlogInlineCode>@theme</BlogInlineCode>. Define tus propios colores,
        fuentes y breakpoints, y Tailwind genera las utilidades
        correspondientes automáticamente:
      </BlogP>

      <BlogCode>{`/* globals.css */
@import "tailwindcss";

@theme {
  /* Un color nuevo → utilidades bg-marca, text-marca, border-marca... */
  --color-marca: #ff5c1a;
  --color-marca-claro: #ffd9c4;

  /* Una fuente nueva → font-display */
  --font-display: "Sora", sans-serif;

  /* Un breakpoint nuevo → 3xl: */
  --breakpoint-3xl: 1800px;
}

/* Uso en el HTML */
<h1 class="font-display text-marca">Título con tu identidad</h1>
<div class="bg-marca-claro p-4 rounded-xl">Panel</div>`}</BlogCode>

      <BlogP>
        También puedes sobrescribir la escala de colores existente con las
        variables estándar (<BlogInlineCode>--color-*</BlogInlineCode>) y el
        spacing (<BlogInlineCode>--spacing-*</BlogInlineCode>), ajustando la
        base de toda la escala:
      </BlogP>

      <BlogCode>{`@theme {
  /* Cambia la base del spacing: p-4 pasa de 1rem a 1.25rem */
  --spacing: 0.3125rem;
}`}</BlogCode>

      <BlogCallout type="warn">
        <BlogInlineCode>@apply</BlogInlineCode> sigue existiendo para
        componer utilidades en CSS propio, pero v4 recomienda preferir clases
        en el HTML. Usa <BlogInlineCode>@apply</BlogInlineCode> con
        moderación (por ejemplo, en estilos de componentes de terceros) — el
        abuso vuelve a crear el problema de "archivos CSS separados" que
        Tailwind pretende eliminar.
      </BlogCallout>

      <BlogH2 id="componentes">Componentes con @layer</BlogH2>

      <BlogP>
        Para clases propias reutilizables (un botón, una tarjeta) se usa{" "}
        <BlogInlineCode>@layer components</BlogInlineCode> junto con{" "}
        <BlogInlineCode>@apply</BlogInlineCode>. Así el CSS generado queda
        ordenado en capas y respeta la precedencia de las utilidades:
      </BlogP>

      <BlogCode>{`/* globals.css */
@import "tailwindcss";

@layer components {
  .btn-primario {
    @apply inline-flex items-center gap-2 px-4 py-2
           bg-blue-600 text-white text-sm font-medium
           rounded-lg hover:bg-blue-700 active:scale-95
           focus:outline-none focus:ring-2 focus:ring-blue-300;
  }

  .tarjeta {
    @apply p-6 bg-white dark:bg-gray-800 rounded-2xl
           border border-gray-200 dark:border-gray-700 shadow-sm;
  }
}

<!-- Uso -->
<button class="btn-primario">Guardar</button>
<div class="tarjeta">Contenido de la tarjeta</div>`}</BlogCode>

      <BlogCallout type="info">
        Por qué <BlogInlineCode>@layer</BlogInlineCode>: las utilidades
        (capas <BlogInlineCode>utilities</BlogInlineCode>) ganan a los
        componentes en CSS. Esto significa que{" "}
        <BlogInlineCode>class="tarjeta p-0"</BlogInlineCode> funciona: la
        utilidad <BlogInlineCode>p-0</BlogInlineCode> sobreescribe el padding
        del componente sin problemas de especificidad.
      </BlogCallout>

      <BlogP>
        Con estas piezas tienes el ciclo completo: clases utilitarias para el
        día a día, variantes para estados y responsive,{" "}
        <BlogInlineCode>@theme</BlogInlineCode> para tu identidad y{" "}
        <BlogInlineCode>@layer components</BlogInlineCode> para los patrones
        que se repiten. Todo desde un solo lenguaje que vive en el HTML.
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Ejercicios</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Crea una tarjeta responsive que muestre una imagen, un título y un botón. Debe verse bien en móvil y en escritorio."
          hint="grid-cols-1 md:grid-cols-2 para cambiar el layout, o flex-col md:flex-row."
          level="Básico"
          num={1}
          solution={`<div class="flex flex-col md:flex-row gap-4 p-4
              bg-white dark:bg-gray-800 rounded-2xl shadow">
  <img
    class="w-full md:w-40 h-32 md:h-24 object-cover rounded-xl"
    src="portada.jpg"
    alt="Portada del curso"
  />
  <div class="flex flex-col gap-2">
    <h3 class="text-lg font-semibold">Curso de Tailwind</h3>
    <p class="text-sm text-gray-600 dark:text-gray-400">
      Aprende utility-first con ejemplos prácticos.
    </p>
    <button class="self-start px-4 py-2 bg-blue-600 text-white
                   rounded-lg hover:bg-blue-700">
      Ver curso
    </button>
  </div>
</div>`}
          title="Tarjeta responsive"
        />

        <ExerciseCard
          description="Maqueta una barra superior (header) con el logo a la izquierda, la navegación al centro y un botón a la derecha usando flex."
          hint="justify-between con tres hijos, e items-center para alinear verticalmente."
          level="Básico"
          num={2}
          solution={`<header class="flex items-center justify-between px-6 py-4
                      border-b border-gray-200 dark:border-gray-800">
  <a href="/" class="font-bold text-xl">MiApp</a>
  <nav class="flex items-center gap-6 text-sm">
    <a class="hover:text-blue-600" href="/">Inicio</a>
    <a class="hover:text-blue-600" href="/blog">Blog</a>
    <a class="hover:text-blue-600" href="/sobre">Sobre</a>
  </nav>
  <button class="px-4 py-2 bg-blue-600 text-white rounded-lg
                 hover:bg-blue-700">
    Entrar
  </button>
</header>`}
          title="Layout flex: header"
        />

        <ExerciseCard
          description="Crea una galería de 6 tarjetas con grid: 1 columna en móvil, 2 en tablet y 3 en escritorio."
          hint="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 con gap-4."
          level="Intermedio"
          num={3}
          solution={`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  <div v-for="n in 6" :key="n"
       class="p-4 bg-white dark:bg-gray-800 rounded-xl border
              border-gray-200 dark:border-gray-700">
    <h4 class="font-medium">Item {{ n }}</h4>
    <p class="text-sm text-gray-500 mt-1">Descripción breve.</p>
  </div>
</div>

<!-- En React sería: -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map((item) => (
    <div key={item.id} class="p-4 bg-white dark:bg-gray-800 rounded-xl
        border border-gray-200 dark:border-gray-700">
      <h4 class="font-medium">{item.titulo}</h4>
      <p class="text-sm text-gray-500 mt-1">{item.descripcion}</p>
    </div>
  ))}
</div>`}
          title="Grid responsive: galería"
        />

        <ExerciseCard
          description="Implementa un toggle de dark mode: un botón que alterna la clase 'dark' en el elemento html y dos versiones de estilo con dark:."
          hint="Añade @custom-variant dark en tu CSS y alterna document.documentElement.classList."
          level="Avanzado"
          num={4}
          solution={`/* globals.css */
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

<!-- Botón de toggle -->
<button
  id="toggle-tema"
  class="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700
         text-gray-900 dark:text-white"
>
  Cambiar tema
</button>

<script>
  const html = document.documentElement;
  // Al cargar: aplica el tema guardado
  const tema = localStorage.getItem("tema") || "claro";
  html.classList.toggle("dark", tema === "oscuro");

  document.getElementById("toggle-tema").addEventListener("click", () => {
    html.classList.toggle("dark");
    localStorage.setItem("tema", html.classList.contains("dark")
      ? "oscuro" : "claro");
  });
</script>`}
          title="Dark mode toggle"
        />

        <ExerciseCard
          description="Define una clase '.badge' con @layer components usando @apply, que combine un fondo, padding, bordes redondeados y text-xs uppercase. Úsala en tres variantes de color."
          hint="@layer components { .badge { @apply ...; } } y luego bg-* en el uso."
          level="Avanzado"
          num={5}
          solution={`/* globals.css */
@layer components {
  .badge {
    @apply inline-flex items-center px-2.5 py-0.5
           rounded-full text-xs font-medium uppercase
           tracking-wide;
  }
}

<!-- Uso: la utilidad bg-* gana al componente por las capas -->
<span class="badge bg-green-100 text-green-700">Activo</span>
<span class="badge bg-amber-100 text-amber-700">Pendiente</span>
<span class="badge bg-red-100 text-red-700">Error</span>`}
          title="Clase custom con @layer"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        Tailwind cambia la forma de pensar el CSS: en lugar de nombrar clases
        y mantener hojas de estilo, compones interfaces directamente con
        utilidades. La v4 lo hace más simple todavía con configuración en CSS
        puro. Es la herramienta con la que se construyen la mayoría de
        interfaces modernas — y cuanto más la uses, más natural resulta.
      </BlogP>
    </article>
  );
}
