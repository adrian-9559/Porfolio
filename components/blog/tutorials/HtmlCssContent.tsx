"use client";
import { useState } from "react";

type SectionId =
  | "intro"
  | "html"
  | "semantica"
  | "css"
  | "boxmodel"
  | "flexbox"
  | "grid"
  | "responsive"
  | "proyecto";

interface SectionDef {
  id: SectionId;
  label: string;
}
const SECTIONS: SectionDef[] = [
  { id: "intro", label: "1. Web fundamentals" },
  { id: "html", label: "2. HTML esencial" },
  { id: "semantica", label: "3. HTML semántico" },
  { id: "css", label: "4. CSS básico" },
  { id: "boxmodel", label: "5. Box Model" },
  { id: "flexbox", label: "6. Flexbox" },
  { id: "grid", label: "7. CSS Grid" },
  { id: "responsive", label: "8. Responsive" },
  { id: "proyecto", label: "Proyecto" },
];

import {
  BlogH2,
  BlogH3,
  BlogP,
  BlogCode,
  BlogCallout,
} from "@/components/blog/shared";

function SectionIntro() {
  return (
    <>
      <BlogH2>Fundamentos del desarrollo web</BlogH2>
      <BlogP>
        La web se construye con tres tecnologías base: HTML (estructura), CSS
        (presentación) y JavaScript (comportamiento). Este tutorial cubre HTML y
        CSS desde cero.
      </BlogP>
      <BlogCode>{`<!-- Una página web mínima -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <title>Mi primera página</title>
    <style>
        body { font-family: system-ui, sans-serif; margin: 2rem; }
        h1   { color: #2563eb; }
    </style>
</head>
<body>
    <h1>¡Hola, mundo!</h1>
    <p>Esto es HTML con un poco de CSS.</p>
</body>
</html>`}</BlogCode>
      <BlogCallout type="tip">
        El <code>!DOCTYPE html</code> le dice al navegador que use el modo
        estándar. Sin él, el navegador usa "quirks mode" que renderiza de forma
        impredecible.
      </BlogCallout>
    </>
  );
}

function SectionHtml() {
  return (
    <>
      <BlogH2>HTML esencial</BlogH2>
      <BlogP>
        HTML (HyperText Markup Language) usa etiquetas para estructurar el
        contenido. Cada etiqueta puede tener atributos.
      </BlogP>
      <BlogCode>{`<!-- Estructura de documento -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Título de la página</title>
    <link rel="stylesheet" href="estilos.css">
</head>
<body>
    <!-- Encabezados -->
    <h1>Título principal</h1>
    <h2>Subtítulo</h2>
    <h3>Sección</h3>

    <!-- Texto -->
    <p>Párrafo de texto. <strong>Negrita</strong> y <em>cursiva</em>.</p>

    <!-- Enlaces e imágenes -->
    <a href="https://ejemplo.com">Enlace</a>
    <img src="foto.jpg" alt="Descripción" width="300">

    <!-- Listas -->
    <ul>
        <li>Elemento 1</li>
        <li>Elemento 2</li>
    </ul>

    <!-- Formularios -->
    <form action="/api/contacto" method="POST">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required>
        <button type="submit">Enviar</button>
    </form>
</body>
</html>`}</BlogCode>
    </>
  );
}

function SectionSemantica() {
  return (
    <>
      <BlogH2>HTML semántico</BlogH2>
      <BlogP>
        Las etiquetas semánticas describen el significado del contenido, no solo
        su apariencia. Mejoran accesibilidad, SEO y mantenibilidad.
      </BlogP>
      <BlogCode>{`<!-- Estructura semántica de una página -->
<body>
    <header>
        <nav>
            <a href="/">Inicio</a>
            <a href="/blog">Blog</a>
            <a href="/contacto">Contacto</a>
        </nav>
    </header>

    <main>
        <article>
            <header>
                <h1>Cómo aprender HTML</h1>
                <time datetime="2026-07-01">1 julio 2026</time>
            </header>
            <section>
                <h2>¿Por qué HTML semántico?</h2>
                <p>El HTML semántico ayuda a...</p>
            </section>
        </article>

        <aside>
            <h2>Artículos relacionados</h2>
            <ul><!-- ... --></ul>
        </aside>
    </main>

    <footer>
        <p>&copy; 2026 Mi Web</p>
    </footer>
</body>`}</BlogCode>
      <BlogCallout type="tip">
        Usa <code>&lt;div&gt;</code> solo cuando no exista una etiqueta
        semántica adecuada. Piensa: ¿esto es una navegación, un artículo, una
        sección, un complemento?
      </BlogCallout>
    </>
  );
}

function SectionCss() {
  return (
    <>
      <BlogH2>CSS básico</BlogH2>
      <BlogP>
        CSS (Cascading Style Sheets) controla la presentación: colores,
        tipografía, espaciado, layout y animaciones.
      </BlogP>
      <BlogCode>{`/* Selectores */
elemento      { }         /* todos los <p> */
.clase        { }         /* class="clase" */
#id           { }         /* id="id" (evitar, usa clases) */
[data-tipo]   { }         /* atributo */
div p         { }         /* descendiente */
div > p       { }         /* hijo directo */
h1 + p        { }         /* hermano adyacente */

/* Cascada y especificidad */
/* 1. !important (evitar)
   2. inline styles
   3. #id
   4. .class [attr] :pseudo
   5. element ::pseudo */`}</BlogCode>
      <BlogCode>{`/* Colores */
color: #2563eb;           /* hexadecimal */
color: rgb(37, 99, 235);  /* RGB */
color: hsl(217, 83%, 53%); /* HSL — más intuitivo */
color: oklch(59% 0.19 265); /* OKLCH — perceptualmente uniforme */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Tipografía */
font-family: 'Inter', system-ui, sans-serif;
font-size: clamp(1rem, 2vw, 1.25rem);
font-weight: 400;
line-height: 1.6;
text-wrap: pretty; /* evita viudas */`}</BlogCode>
    </>
  );
}

function SectionBoxModel() {
  return (
    <>
      <BlogH2>Box Model</BlogH2>
      <BlogP>
        Todo elemento en CSS es una caja compuesta de: content, padding, border,
        margin. Entender el box model es esencial para hacer layouts
        predecibles.
      </BlogP>
      <BlogCode>{`/* Box model */
.elemento {
    width: 300px;
    height: auto;
    padding: 1rem;        /* espacio interno */
    border: 2px solid #333; /* borde */
    margin: 1rem;         /* espacio externo */

    /* box-sizing: content-box (default) — width = solo contenido */
    /* box-sizing: border-box — width = content + padding + border */
    box-sizing: border-box;
}

/* Centrar horizontalmente */
.bloque-centrado {
    width: fit-content;
    margin-inline: auto;
}

/* Ocultar sin eliminar del flujo */
.oculto-visualmente {
    position: absolute;
    width: 1px; height: 1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
}`}</BlogCode>
      <BlogCallout type="tip">
        Siempre pon{" "}
        <code>
          *, *::before, *::after {"{"} box-sizing: border-box; {"}"}
        </code>{" "}
        al inicio de tu CSS. Hace que los tamaños sean mucho más predecibles.
      </BlogCallout>
    </>
  );
}

function SectionFlexbox() {
  return (
    <>
      <BlogH2>Flexbox</BlogH2>
      <BlogP>
        Flexbox distribuye espacio en una dimensión (fila o columna). Ideal para
        componentes UI, barras de navegación, centrado y alineación.
      </BlogP>
      <BlogCode>{`/* Contenedor flex */
.contenedor {
    display: flex;
    flex-direction: row;      /* row | column */
    flex-wrap: wrap;          /* nowrap | wrap */
    justify-content: center;  /* eje principal */
    align-items: center;      /* eje cruzado */
    gap: 1rem;                /* espacio entre items */
}

/* Items flex */
.item {
    flex: 1;                  /* crecer para llenar espacio */
    flex-shrink: 0;           /* no encogerse */
    align-self: flex-start;   /* alineación individual */
}

/* Centrar perfectamente */
.centrado {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}`}</BlogCode>
      <BlogCode>{`/* Ejemplo: navbar responsive */
<nav class="navbar">
    <span class="logo">MiApp</span>
    <div class="enlaces">
        <a href="#">Inicio</a>
        <a href="#">Blog</a>
        <a href="#">Contacto</a>
    </div>
    <button>Login</button>
</nav>

<style>
.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    gap: 1rem;
}
.enlaces {
    display: flex;
    gap: 1.5rem;
}
@media (max-width: 640px) {
    .enlaces { display: none; } /* menú hamburguesa */
}
</style>`}</BlogCode>
    </>
  );
}

function SectionGrid() {
  return (
    <>
      <BlogH2>CSS Grid</BlogH2>
      <BlogP>
        Grid trabaja en dos dimensiones (filas y columnas simultáneamente).
        Ideal para layouts de página completos y galerías.
      </BlogP>
      <BlogCode>{`/* Grid básico */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

/* Grid explícito */
.layout {
    display: grid;
    grid-template-areas:
        "header  header  header"
        "sidebar content content"
        "footer  footer  footer";
    grid-template-columns: 250px 1fr 1fr;
    gap: 1rem;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer  { grid-area: footer; }

/* Auto-fit + minmax = responsive sin media queries */
.grid-auto {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    /* tablet: 2 columnas, móvil: 1 columna, escritorio: 3+ */
}`}</BlogCode>
      <BlogCallout type="tip">
        Usa <code>auto-fit</code> o <code>auto-fill</code> con{" "}
        <code>minmax()</code> para crear grids responsive sin una sola media
        query. <code>auto-fill</code> crea tracks vacíos, <code>auto-fit</code>{" "}
        los colapsa.
      </BlogCallout>
    </>
  );
}

function SectionResponsive() {
  return (
    <>
      <BlogH2>Diseño responsive</BlogH2>
      <BlogP>
        El diseño responsive adapta la interfaz a cualquier tamaño de pantalla.
        Se basa en tres pilares: grid flexible, imágenes fluidas y media
        queries.
      </BlogP>
      <BlogH3>Media queries</BlogH3>
      <BlogCode>{`/* Mobile-first — empieza con estilos base (móvil) */
.grid {
    display: grid;
    grid-template-columns: 1fr; /* 1 columna en móvil */
    gap: 1rem;
}

/* Tablet (≥768px) */
@media (min-width: 768px) {
    .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Escritorio (≥1024px) */
@media (min-width: 1024px) {
    .grid { grid-template-columns: repeat(3, 1fr); }
}

/* Modo oscuro */
@media (prefers-color-scheme: dark) {
    body { background: #0a0a0f; color: #e6edf3; }
}

/* Movimiento reducido */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}`}</BlogCode>
      <BlogH3>Unidades responsive</BlogH3>
      <BlogCode>{`/* Relativas al viewport */
width: 100vw;           /* 100% del ancho del viewport */
height: 100dvh;         /* 100% del alto dinámico (sin address bar) */
font-size: clamp(1rem, 2.5vw, 1.5rem); /* min, preferido, max */
padding: 2cqi;          /* container query inline-size */

/* Relativas al contenedor */
.container {
    container-type: inline-size;
}
@container (max-width: 400px) {
    .card { flex-direction: column; }
}`}</BlogCode>
    </>
  );
}

function SectionProyecto() {
  return (
    <>
      <BlogH2>Proyecto: tarjeta de perfil responsive</BlogH2>
      <BlogP>
        Construye esta tarjeta de perfil que se adapta a cualquier pantalla.
        Combina Flexbox, Grid, variables CSS y diseño responsive.
      </BlogP>
      <BlogCode>{`<!-- index.html -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi perfil</title>
    <link rel="stylesheet" href="estilos.css">
</head>
<body>
    <div class="card">
        <img src="avatar.jpg" alt="Avatar" class="avatar">
        <h1 class="nombre">Ana García</h1>
        <p class="bio">Desarrolladora frontend apasionada por crear interfaces accesibles y bonitas.</p>
        <div class="stats">
            <div class="stat"><span class="num">42</span><span>proyectos</span></div>
            <div class="stat"><span class="num">128</span><span>seguidores</span></div>
            <div class="stat"><span class="num">10</span><span>años exp.</span></div>
        </div>
        <button class="btn">Seguir</button>
    </div>
</body>
</html>`}</BlogCode>
      <BlogCode>{`/* estilos.css */
:root {
    --bg: #ffffff;
    --text: #1d1d1f;
    --accent: #2563eb;
    --border: #e5e5e7;
}
@media (prefers-color-scheme: dark) {
    :root {
        --bg: #111116;
        --text: #e6edf3;
        --accent: #60a5fa;
        --border: #2c2c32;
    }
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
    font-family: system-ui, sans-serif;
    background: var(--bg);
    color: var(--text);
    display: grid;
    place-items: center;
    min-height: 100dvh;
    padding: 1rem;
}

.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
    border: 1px solid var(--border);
    border-radius: 1.5rem;
    max-width: 320px;
    width: 100%;
    text-align: center;
}

.avatar {
    width: 96px; height: 96px;
    border-radius: 50%;
    object-fit: cover;
}

.stats { display: flex; gap: 1.5rem; }
.stat { display: flex; flex-direction: column; align-items: center; }
.num { font-size: 1.25rem; font-weight: 700; }

.btn {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 0.75rem;
    background: var(--accent);
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
}
.btn:hover { opacity: 0.9; }`}</BlogCode>
    </>
  );
}

const SECTION_MAP = {
  intro: SectionIntro,
  html: SectionHtml,
  semantica: SectionSemantica,
  css: SectionCss,
  boxmodel: SectionBoxModel,
  flexbox: SectionFlexbox,
  grid: SectionGrid,
  responsive: SectionResponsive,
  proyecto: SectionProyecto,
};

export default function HtmlCssContent() {
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
                ? "bg-orange-100 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300 font-medium"
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
            className="text-sm bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl font-medium disabled:opacity-30 transition-colors"
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
