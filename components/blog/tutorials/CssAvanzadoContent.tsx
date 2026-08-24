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

export default function CssAvanzadoContent() {
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
        CSS avanzado: animaciones y layouts modernos
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        CSS ha dejado de ser un lenguaje de "colores y cajas". Hoy puedes crear
        animaciones fluidas, layouts que responden al contenedor en vez de a la
        pantalla y temas dinámicos sin una sola línea de JavaScript. Este
        tutorial cubre transiciones, transformaciones, keyframes, container
        queries, custom properties y las funciones modernas que usan los
        frontends reales. Prerequisito conceptual: HTML y CSS básicos.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="transiciones">Transiciones</BlogH2>

      <BlogP>
        Una <strong>transición</strong> interpola suavemente el cambio de una o
        varias propiedades CSS entre dos estados. Se declara en el estado base
        (el elemento en reposo), no en el estado final:
      </BlogP>

      <BlogCode>{`.boton {
  background: #2563eb;
  transition: background-color 0.3s ease;
}

.boton:hover {
  background: #1d4ed8;
}`}</BlogCode>

      <BlogP>
        La propiedad abreviada <BlogInlineCode>transition</BlogInlineCode>{" "}
        agrupa cuatro subpropiedades. El orden habitual:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>transition-property:</strong> qué propiedades animar. Usar{" "}
          <BlogInlineCode>all</BlogInlineCode> es cómodo pero anima de más.
        </BlogLi>
        <BlogLi>
          <strong>transition-duration:</strong> cuánto dura, en segundos o
          milisegundos.
        </BlogLi>
        <BlogLi>
          <strong>transition-timing-function:</strong> la curva de velocidad
          (easing).
        </BlogLi>
        <BlogLi>
          <strong>transition-delay:</strong> espera antes de comenzar. Negativo
          inicia a mitad de camino.
        </BlogLi>
      </BlogUl>

      <BlogCode>{`.elemento {
  transition-property: color, transform;
  transition-duration: 0.2s, 0.4s;
  transition-timing-function: ease, ease-in-out;
  transition-delay: 0s, 0.1s;
}

/* Equivalente abreviado: cada grupo en orden */
.elemento {
  transition: color 0.2s ease 0s, transform 0.4s ease-in-out 0.1s;
}`}</BlogCode>

      <BlogH3 id="easing">Easing y cubic-bezier</BlogH3>

      <BlogP>
        Las curvas predefinidas son <BlogInlineCode>linear</BlogInlineCode>,{" "}
        <BlogInlineCode>ease</BlogInlineCode> (la de por defecto),{" "}
        <BlogInlineCode>ease-in</BlogInlineCode>,{" "}
        <BlogInlineCode>ease-out</BlogInlineCode> y{" "}
        <BlogInlineCode>ease-in-out</BlogInlineCode>. Para control total se
        define una curva de Bézier cúbica con cuatro puntos:
      </BlogP>

      <BlogCode>{`/* cubic-bezier(x1, y1, x2, y2) */
.transicion-suave {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Una curva "elástica" que sobrepasa ligeramente el objetivo */
.entrada-muelle {
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}`}</BlogCode>

      <BlogCallout type="tip">
        Regla práctica: <BlogInlineCode>ease-out</BlogInlineCode> para entradas
        (lo que aparece), <BlogInlineCode>ease-in</BlogInlineCode> para salidas
        (lo que desaparece) y una curva "overshoot" (y por encima de 1) solo
        para efectos decorativos. Demasiada curva mata la sensación de UI
        nativa.
      </BlogCallout>

      <BlogP>
        Hay una quinta curva muy útil: <BlogInlineCode>steps()</BlogInlineCode>.
        Divide la animación en saltos discretos en lugar de interpolación
        continua, ideal para sprites de personajes o contadores:
      </BlogP>

      <BlogCode>{`/* Pasos discretos: el texto cambia como un marcador */
.contador {
  transition: all 1s steps(10, end);
}`}</BlogCode>

      <BlogH3 id="reduced-motion">prefers-reduced-motion</BlogH3>

      <BlogP>
        Muchas personas tienen sensibilidad al movimiento. La media query{" "}
        <BlogInlineCode>prefers-reduced-motion</BlogInlineCode> permite detectar
        la preferencia del sistema operativo y reducir o eliminar las
        animaciones:
      </BlogP>

      <BlogCode>{`/* Por defecto, animamos con normalidad */
.tarjeta {
  transition: transform 0.3s ease;
}

/* Si el usuario pide menos movimiento, lo reducimos */
@media (prefers-reduced-motion: reduce) {
  .tarjeta {
    transition: none;
  }
}`}</BlogCode>

      <BlogCallout type="warn">
        No elimines solo la transición: las animaciones con{" "}
        <BlogInlineCode>@keyframes</BlogInlineCode> también deben respetarse. Un
        patrón común y aceptado es dejar la transición pero con duración{" "}
        <BlogInlineCode>0.01ms</BlogInlineCode>, que mantiene la lógica del
        evento sin el movimiento visible.
      </BlogCallout>

      <BlogH2 id="transformaciones">Transformaciones</BlogH2>

      <BlogP>
        <BlogInlineCode>transform</BlogInlineCode> modifica la geometría de un
        elemento sin tocar el flujo del documento: los hermanos no se recolocan.
        Funciones principales:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <BlogInlineCode>translate(x, y)</BlogInlineCode> — desplazar.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>rotate(deg)</BlogInlineCode> — girar (acepta grados o{" "}
          <BlogInlineCode>turn</BlogInlineCode>).
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>scale(factor)</BlogInlineCode> — escalar.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>skew(x, y)</BlogInlineCode> — inclinar.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>perspective()</BlogInlineCode> y funciones 3D como{" "}
          <BlogInlineCode>rotateX()</BlogInlineCode> o{" "}
          <BlogInlineCode>translateZ()</BlogInlineCode>.
        </BlogLi>
      </BlogUl>

      <BlogCode>{`.tarjeta:hover {
  transform: translateY(-4px) scale(1.02);
}

/* Centrado clásico sin conocer las dimensiones del hijo */
.padre {
  position: relative;
}
.hijo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`}</BlogCode>

      <BlogP>
        <BlogInlineCode>transform-origin</BlogInlineCode> define el punto
        alrededor del cual giran o escalan los elementos. Por defecto es el
        centro (<BlogInlineCode>50% 50%</BlogInlineCode>):
      </BlogP>

      <BlogCode>{`.campana {
  transform-origin: top center;
}

.campana:hover {
  animation: campanada 0.6s ease-in-out infinite;
}

@keyframes campanada {
  0%, 100% { transform: rotate(0deg); }
  25%      { transform: rotate(15deg); }
  75%      { transform: rotate(-15deg); }
}`}</BlogCode>

      <BlogCallout type="info">
        Las transformaciones 3D requieren un contexto:{" "}
        <BlogInlineCode>perspective</BlogInlineCode> en el padre (o la función{" "}
        <BlogInlineCode>perspective()</BlogInlineCode> dentro del{" "}
        <BlogInlineCode>transform</BlogInlineCode>). Sin él, las funciones 3D se
        ignoran y el elemento se aplana.
      </BlogCallout>

      <BlogP>
        Un detalle clave: el orden de las funciones importa.{" "}
        <BlogInlineCode>translate()</BlogInlineCode> y{" "}
        <BlogInlineCode>scale()</BlogInlineCode> no conmutan. Piensa en el orden
        como una cadena que se aplica de derecha a izquierda:
      </BlogP>

      <BlogCode>{`/* Primero escala, luego desplaza (el desplazamiento también se escala) */
.transform {
  transform: translate(20px, 0) scale(2);
}

/* Primero desplaza, luego escala (desplazamiento sin escalar) */
.transform {
  transform: scale(2) translate(20px, 0);
}`}</BlogCode>

      <BlogH2 id="animaciones">Animaciones con keyframes</BlogH2>

      <BlogP>
        Mientras que las transiciones conectan dos estados, las{" "}
        <strong>animaciones</strong> recorren una secuencia de pasos definida
        con <BlogInlineCode>@keyframes</BlogInlineCode> y se controlan con las
        propiedades <BlogInlineCode>animation-*</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`@keyframes pulsar {
  0%   { transform: scale(1); opacity: 1; }
  50%  { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}

.boton-pulsante {
  animation-name: pulsar;
  animation-duration: 1.5s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

/* Abreviado */
.boton-pulsante {
  animation: pulsar 1.5s ease-in-out infinite;
}`}</BlogCode>

      <BlogH3 id="animation-props">Propiedades de animación</BlogH3>

      <BlogUl>
        <BlogLi>
          <BlogInlineCode>animation-duration</BlogInlineCode> — duración de un
          ciclo.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>animation-timing-function</BlogInlineCode> — curva del
          easing.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>animation-iteration-count</BlogInlineCode> — número de
          ciclos o <BlogInlineCode>infinite</BlogInlineCode>.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>animation-delay</BlogInlineCode> — espera antes de
          empezar (acepta valores negativos para empezar a mitad del ciclo).
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>animation-direction</BlogInlineCode> —{" "}
          <BlogInlineCode>normal</BlogInlineCode>,{" "}
          <BlogInlineCode>reverse</BlogInlineCode>,{" "}
          <BlogInlineCode>alternate</BlogInlineCode> (ida y vuelta).
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>animation-fill-mode</BlogInlineCode> — qué valores se
          aplican antes/después del ciclo: <BlogInlineCode>none</BlogInlineCode>
          , <BlogInlineCode>forwards</BlogInlineCode>,{" "}
          <BlogInlineCode>backwards</BlogInlineCode>,{" "}
          <BlogInlineCode>both</BlogInlineCode>.
        </BlogLi>
      </BlogUl>

      <BlogCode>{`.linea-carga {
  width: 100px;
  animation: crecer 2s ease forwards;
}

@keyframes crecer {
  from { width: 100px; }
  to   { width: 400px; }
}

/* fill-mode: forwards mantiene el estado final tras terminar,
   backwards aplica el estado inicial durante el delay */
.entrada {
  opacity: 0;
  animation: aparecer 0.4s ease 0.3s both;
}

@keyframes aparecer {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}`}</BlogCode>

      <BlogP>
        Un keyframe puede animar <strong>varias propiedades</strong> a la vez y
        puede mezclar porcentajes arbitrarios, no solo 0% y 100%:
      </BlogP>

      <BlogCode>{`@keyframes turno-de-color {
  0%   { background: #2563eb; transform: rotate(0deg); }
  50%  { background: #7c3aed; transform: rotate(180deg); }
  100% { background: #2563eb; transform: rotate(360deg); }
}

.monigote {
  animation: turno-de-color 3s linear infinite;
}`}</BlogCode>

      <BlogCallout type="tip">
        No puedes animar propiedades no animables (como{" "}
        <BlogInlineCode>display</BlogInlineCode>) dentro de un keyframe
        directamente. El truco clásico es usar{" "}
        <BlogInlineCode>visibility</BlogInlineCode> con un keyframe de dos
        pasos: se mantiene <BlogInlineCode>visible</BlogInlineCode> hasta el 99%
        y salta a <BlogInlineCode>hidden</BlogInlineCode> al final.
      </BlogCallout>

      <BlogH2 id="layout-moderno">Layout moderno</BlogH2>

      <BlogH3 id="container-queries">Container queries</BlogH3>

      <BlogP>
        Hasta hace poco, lo único "responsive" era la ventana. Con las{" "}
        <strong>container queries</strong>, un componente responde al tamaño de
        su contenedor, lo que permite piezas reutilizables que se adaptan donde
        sea que vivan:
      </BlogP>

      <BlogCode>{`.tarjeta-contenedor {
  container-type: inline-size;
  container-name: tarjeta;
}

/* Dentro del contenedor, @container responde a SU ancho */
@container tarjeta (min-width: 400px) {
  .tarjeta__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}`}</BlogCode>

      <BlogP>
        <BlogInlineCode>container-type: inline-size</BlogInlineCode> indica que
        el elemento es un contenedor de consulta (size o inline-size). La
        ventaja frente a media queries: el mismo componente se reorganiza solo
        en una barra lateral estrecha o en un grid amplio.
      </BlogP>

      <BlogCallout type="info">
        En la práctica, los componentes de bibliotecas modernas ya usan
        container queries internamente. Si tu componente no necesita estilos
        basados en el viewport, prefiere{" "}
        <BlogInlineCode>@container</BlogInlineCode> sobre{" "}
        <BlogInlineCode>@media</BlogInlineCode>.
      </BlogCallout>

      <BlogH3 id="has">El selector :has()</BlogH3>

      <BlogP>
        <BlogInlineCode>:has()</BlogInlineCode> selecciona un elemento porque{" "}
        <em>contiene</em> a otro. Es un selector relacional y resuelve el 90% de
        los casos que antes exigían JavaScript (como estilos "padre si hay
        hijo"):
      </BlogP>

      <BlogCode>{`/* El card que contiene una imagen con estado de error */
.tarjeta:has(.alerta) {
  border-color: #dc2626;
}

/* Un formulario donde el input obligatorio está vacío */
.formulario:has(input[required]:not(:placeholder-shown)) {
  outline: 2px solid #16a34a;
}

/* Menú que se abre al hover de su botón — sin JavaScript */
.menu:has(.menu__toggle:hover) .menu__desplegable {
  display: block;
}`}</BlogCode>

      <BlogCallout type="warn">
        <BlogInlineCode>:has()</BlogInlineCode> es caro de calcular. Evita
        anidarlo o aplicarlo a miles de elementos. Úsalo en contextos acotados
        (una tarjeta, un formulario) y no en el selector universal.
      </BlogCallout>

      <BlogH3 id="subgrid">Subgrid</BlogH3>

      <BlogP>
        Con <BlogInlineCode>grid</BlogInlineCode> normal, un hijo del grid no
        comparte sus pistas (columnas/filas) con sus propios hijos.{" "}
        <BlogInlineCode>subgrid</BlogInlineCode> hereda las pistas del grid
        padre, permitiendo alinear tarjetas de un mismo grid internamente:
      </BlogP>

      <BlogCode>{`.galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.tarjeta {
  display: grid;
  grid-template-rows: subgrid;   /* hereda las filas del padre */
  grid-row: span 3;              /* participa en 3 filas del padre */
  gap: 0;
}`}</BlogCode>

      <BlogP>
        Sin subgrid, tres tarjetas con contenido de alturas distintas tendrían
        sus pies de página desalineados. Con subgrid, todas comparten las mismas
        pistas y los botones quedan alineados en la misma fila.
      </BlogP>

      <BlogH3 id="funciones-modernas">Funciones modernas</BlogH3>

      <BlogP>
        <BlogInlineCode>clamp()</BlogInlineCode> fija un valor entre un mínimo y
        un máximo. Es la herramienta reina de la tipografía fluida, sin media
        queries:
      </BlogP>

      <BlogCode>{`/* font-size fluido: nunca menor de 1rem, nunca mayor de 2.5rem */
h1 {
  font-size: clamp(1rem, 4vw + 0.5rem, 2.5rem);
}

/* Contenedor fluido con márgenes laterales */
.contenedor {
  padding-inline: clamp(1rem, 5vw, 3rem);
}`}</BlogCode>

      <BlogP>
        <BlogInlineCode>min()</BlogInlineCode> y{" "}
        <BlogInlineCode>max()</BlogInlineCode> eligen el menor o mayor de una
        lista de valores, y <BlogInlineCode>aspect-ratio</BlogInlineCode> fija
        la proporción sin conocer ni un ancho ni un alto:
      </BlogP>

      <BlogCode>{`/* El video nunca ocupa más del 60% del contenedor */
.video {
  width: min(100%, 60%);
}

/* Imagen que crece hasta 400px, nunca menos de 200px */
.imagen {
  width: max(200px, 40%);
}

/* Tarjetas 16:9 sin conocer el ancho */
.thumb {
  aspect-ratio: 16 / 9;
  object-fit: cover;
}`}</BlogCode>

      <BlogH2 id="custom-properties">Custom properties</BlogH2>

      <BlogP>
        Las <strong>custom properties</strong> (variables CSS) se definen con{" "}
        <BlogInlineCode>--nombre</BlogInlineCode> y se leen con{" "}
        <BlogInlineCode>var()</BlogInlineCode>. Viven en el elemento donde se
        declaran y se heredan hacia abajo en el árbol:
      </BlogP>

      <BlogCode>{`:root {
  --color-primario: #2563eb;
  --radio: 12px;
  --espaciado: 1rem;
}

.boton {
  background: var(--color-primario);
  border-radius: var(--radio);
  padding: var(--espaciado) calc(var(--espaciado) * 2);
}`}</BlogCode>

      <BlogCallout type="info">
        La gran ventaja frente a un preprocesador: las custom properties son{" "}
        <strong>dinámicas</strong>. Cambiar el valor de una variable (desde JS o
        desde una media query) re-renderiza todos los usos en caliente, sin
        recompilar. Eso las convierte en el mecanismo ideal para temas.
      </BlogCallout>

      <BlogP>
        Con <BlogInlineCode>calc()</BlogInlineCode> se pueden derivar valores
        nuevos a partir de variables, y <BlogInlineCode>var()</BlogInlineCode>{" "}
        acepta un valor de respaldo si la variable no existe:
      </BlogP>

      <BlogCode>{`.tarjeta {
  /* var(nombre, respaldo) */
  padding: var(--espaciado, 1rem);
  margin: calc(var(--espaciado) * 2);
}

/* Herencia: el hijo puede sobrescribir solo para sí */
.tarjeta {
  --espaciado: 0.5rem;
}
.tarjeta.destacada {
  --espaciado: 1.5rem;
}`}</BlogCode>

      <BlogH3 id="temas-dinamicos">Temas dinámicos con data-theme</BlogH3>

      <BlogP>
        El patrón de temas más extendido: definir paletas por atributo{" "}
        <BlogInlineCode>data-theme</BlogInlineCode> en el{" "}
        <BlogInlineCode>&lt;html&gt;</BlogInlineCode> y que cada selector anule
        las mismas variables. Toda la interfaz se recolorea sin tocar un solo
        componente:
      </BlogP>

      <BlogCode>{`:root {
  --fondo: #ffffff;
  --texto: #1d1d1f;
  --acento: #2563eb;
}

html[data-theme="oscuro"] {
  --fondo: #0a0a0a;
  --texto: #f5f5f7;
  --acento: #60a5fa;
}

body {
  background: var(--fondo);
  color: var(--texto);
}

.boton-primario {
  background: var(--acento);
}`}</BlogCode>

      <BlogCode>{`// Cambiar tema desde JavaScript: un solo atributo
function cambiarTema(nombre: string) {
  document.documentElement.setAttribute("data-theme", nombre);
  localStorage.setItem("tema", nombre);
}

// En el arranque, antes del primer paint
const temaGuardado = localStorage.getItem("tema") ?? "claro";
document.documentElement.setAttribute("data-theme", temaGuardado);`}</BlogCode>

      <BlogCallout type="tip">
        Combina custom properties con{" "}
        <BlogInlineCode>prefers-color-scheme</BlogInlineCode> para el tema por
        defecto y <BlogInlineCode>data-theme</BlogInlineCode> para la elección
        explícita del usuario. Ambos conviven: la media query pone el valor
        inicial y el atributo HTML tiene la última palabra por especificidad
        extra.
      </BlogCallout>

      <BlogH2 id="rendimiento">Rendimiento de animaciones</BlogH2>

      <BlogP>
        No todas las propiedades se animan igual de barato. El navegador ejecuta
        las animaciones en capas distintas y solo{" "}
        <BlogInlineCode>transform</BlogInlineCode> y{" "}
        <BlogInlineCode>opacity</BlogInlineCode> se procesan en la GPU sin tocar
        el layout. Animar <BlogInlineCode>width</BlogInlineCode>,{" "}
        <BlogInlineCode>top</BlogInlineCode> o{" "}
        <BlogInlineCode>box-shadow</BlogInlineCode> fuerza recálculos de layout
        y paint en cada frame:
      </BlogP>

      <BlogCode>{`/* Caro: recalcula layout en cada frame */
.animacion-cara {
  transition: width 0.3s ease, height 0.3s ease;
}

/* Barato: la GPU solo recompone la capa */
.animacion-buena {
  transition: transform 0.3s ease;
}

/* Equivalencia: animar position con transform */
.elemento {
  transform: translateY(0);
  transition: transform 0.3s ease;
}
.elemento.movido {
  transform: translateY(-40px);
}`}</BlogCode>

      <BlogP>
        <BlogInlineCode>will-change</BlogInlineCode> avisa al navegador qué
        propiedad va a cambiar, para que prepare una capa propia:
      </BlogP>

      <BlogCode>{`.elemento {
  will-change: transform;
}

/* En hover ya no hace falta: la capa está preparada */
.elemento:hover {
  transform: scale(1.05);
}`}</BlogCode>

      <BlogCallout type="warn">
        No pongas <BlogInlineCode>will-change</BlogInlineCode> en cientos de
        elementos ni de forma permanente: cada capa reserva memoria. El patrón
        correcto es activarlo un momento antes (por ejemplo, con{" "}
        <BlogInlineCode>mouseenter</BlogInlineCode>) y retirarlo al terminar.
      </BlogCallout>

      <BlogP>
        <BlogInlineCode>contain</BlogInlineCode> aísla un subárbol para que el
        navegador no propague sus cambios de layout al resto de la página. Es
        útil en componentes autocontenidos:
      </BlogP>

      <BlogCode>{`.widget {
  /* layout: el layout interno no afecta a lo de fuera */
  contain: layout paint;
}

/* Contenido estricto: tamaño fijo, sin leaks */
.ventana-modal {
  contain: strict;
}`}</BlogCode>

      <BlogCallout type="info">
        Regla de oro del rendimiento de UI: anima siempre{" "}
        <BlogInlineCode>transform</BlogInlineCode> y{" "}
        <BlogInlineCode>opacity</BlogInlineCode>. Si necesitas un movimiento
        "visual" de layout (altura, ancho), simúlalo con transformaciones o usa{" "}
        <BlogInlineCode>grid-template-rows</BlogInlineCode> 0fr → 1fr, que el
        navegador optimiza nativamente.
      </BlogCallout>

      <BlogH2 id="sass-postcss">Sass y PostCSS en breve</BlogH2>

      <BlogP>
        Los preprocesadores siguen vivos en muchos proyectos. Su valor no es
        sustituir CSS sino darle <strong>superpoderes de construcción</strong>{" "}
        que el CSS plano no tiene (aunque cada vez se solapan más):
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Anidamiento:</strong> escribir selectores dentro de otros. Hoy
          CSS nativo también lo soporta, con reglas propias.
        </BlogLi>
        <BlogLi>
          <strong>Mixins:</strong> bloques de estilos reutilizables con
          argumentos (Sass).
        </BlogLi>
        <BlogLi>
          <strong>Variables:</strong> <BlogInlineCode>$variable</BlogInlineCode>{" "}
          en Sass, estáticas en compilación; las custom properties las superan
          en dinamismo.
        </BlogLi>
      </BlogUl>

      <BlogCode>{`// Sass: mixin con argumentos
@mixin boton($color) {
  background: $color;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  &:hover { filter: brightness(0.9); }
}

.boton-primario { @include boton(#2563eb); }
.boton-peligro  { @include boton(#dc2626); }

// Sass: anidamiento
.tarjeta {
  padding: 1rem;
  .titulo { font-weight: bold; }
  &.destacada { border: 2px solid #2563eb; }
}`}</BlogCode>

      <BlogCallout type="warn">
        Si empiezas un proyecto nuevo hoy, pregúntate si lo necesitas. Tailwind,
        CSS Modules, Lightning CSS o PostCSS cubren la mayoría de casos y el CSS
        nativo (custom properties, nesting,{" "}
        <BlogInlineCode>@container</BlogInlineCode>) ha absorbido las features
        más demandadas. Sass sigue siendo excelente para codebases grandes que
        ya lo usan.
      </BlogCallout>

      <BlogP>
        PostCSS, por su parte, no es un lenguaje: es un <em>pipeline</em> de
        plugins que transforman CSS (autoprefixing, minificación,{" "}
        <BlogInlineCode>nesting</BlogInlineCode>, soporte de{" "}
        <BlogInlineCode>@apply</BlogInlineCode> en Tailwind). Casi todo CSS
        moderno de producción pasa por uno u otro al compilar.
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Ejercicios</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Crea un botón que cambie de color al hacer hover y que la transición dure 0.3 segundos con una curva ease-out."
          hint="transition: background-color 0.3s ease-out en el estado base; el hover solo cambia el color."
          level="Básico"
          num={1}
          solution={`.boton {
  background: #2563eb;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease-out;
}

.boton:hover {
  background: #1d4ed8;
}`}
          title="Transición básica"
        />

        <ExerciseCard
          description="Centra un elemento desconocido (sin conocer su tamaño) dentro de su padre usando transform, y añade un efecto de elevación en hover."
          hint="position: absolute + top/left 50% + translate(-50%, -50%). Para elevar, translateY con un box-shadow."
          level="Intermedio"
          num={2}
          solution={`.padre {
  position: relative;
  height: 300px;
}

.hijo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hijo:hover {
  transform: translate(-50%, calc(-50% - 6px));
  box-shadow: 0 12px 24px rgb(0 0 0 / 0.15);
}`}
          title="Centrado y elevación"
        />

        <ExerciseCard
          description="Escribe una animación de carga con keyframes: una barra que se estira de 0 a 100% de ancho, se repite dos veces y termina manteniendo el estado final."
          hint="animation: crecer 1.5s ease forwards; con iteration-count 2 antes de forwards."
          level="Intermedio"
          num={3}
          solution={`.barra-carga {
  height: 8px;
  background: #2563eb;
  animation: crecer 1.5s ease 2 forwards;
}

@keyframes crecer {
  from { width: 0%; }
  to   { width: 100%; }
}`}
          title="Barra de progreso animada"
        />

        <ExerciseCard
          description="Implementa un componente de tarjeta con container query: a menos de 400px de ancho, el contenido va en columna; a partir de ahí, en fila."
          hint="container-type: inline-size en el contenedor y @container (min-width: 400px) para cambiar el layout."
          level="Avanzado"
          num={4}
          solution={`.tarjeta-contenedor {
  container-type: inline-size;
}

.tarjeta__contenido {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@container (min-width: 400px) {
  .tarjeta__contenido {
    flex-direction: row;
    align-items: center;
  }
}`}
          title="Card con container queries"
        />

        <ExerciseCard
          description="Crea un sistema de tema con custom properties: dos paletas (claro y oscuro) activadas por data-theme, con un botón que las alterna desde JavaScript."
          hint="Define las variables en :root, anúlalas con html[data-theme='oscuro'], y alterna el atributo con document.documentElement."
          level="Avanzado"
          num={5}
          solution={`:root {
  --fondo: #ffffff;
  --texto: #1d1d1f;
}

html[data-theme="oscuro"] {
  --fondo: #0a0a0a;
  --texto: #f5f5f7;
}

body {
  background: var(--fondo);
  color: var(--texto);
  transition: background 0.3s ease, color 0.3s ease;
}

// Cambio de tema desde JS
const html = document.documentElement;
const actual = html.getAttribute("data-theme") ?? "claro";
html.setAttribute("data-theme", actual === "oscuro" ? "claro" : "oscuro");`}
          title="Temas dinámicos con variables"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        CSS moderno es un lenguaje de verdad: animaciones con control de tiempo,
        layouts que responden a su contenedor y sistemas de temas dinámicos,
        todo sin JavaScript. La clave está en combinar bien las piezas —
        transiciones para estados, keyframes para secuencias, custom properties
        para datos — y en animar solo lo que la GPU puede hacer rápido. Con esto
        ya tienes la base para construir interfaces que se sienten vivas y que
        rinden.
      </BlogP>
    </article>
  );
}
