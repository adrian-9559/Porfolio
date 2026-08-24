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

export default function AccesibilidadContent() {
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
          50 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        Accesibilidad web: WCAG, ARIA y buenas prácticas
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        La accesibilidad hace que tu web funcione para todas las personas,
        incluidas las que usan lectores de pantalla, navegan solo con teclado o
        tienen baja visión. Este tutorial cubre los principios WCAG 2.2, el HTML
        semántico, ARIA, formularios, teclado, contraste y cómo testearlo todo.
        Prerequisito: HTML y CSS básicos.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="fundamentos">Fundamentos</BlogH2>

      <BlogP>
        La accesibilidad (a11y) es diseñar y construir productos que puedan usar
        todas las personas, con o sin discapacidad. No es un extra: es un
        requisito de calidad y, en muchos países, una obligación legal.
      </BlogP>

      <BlogH3 id="usuarios">Usuarios afectados</BlogH3>

      <BlogUl>
        <BlogLi>
          <strong>Visual:</strong> ceguera, baja visión, daltonismo. Usan
          lectores de pantalla, zoom o alto contraste.
        </BlogLi>
        <BlogLi>
          <strong>Motora:</strong> dificultad para usar el ratón. Navegan con
          teclado, switches o voz.
        </BlogLi>
        <BlogLi>
          <strong>Cognitiva:</strong> dificultad para procesar información.
          Necesitan textos claros y navegación predecible.
        </BlogLi>
        <BlogLi>
          <strong>Auditiva:</strong> sordera o hipoacusia. Necesitan subtítulos
          y alternativas textuales al audio.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="info">
        La accesibilidad beneficia a todos: los subtítulos ayudan en entornos
        ruidosos, el alto contraste ayuda con el sol, y el teclado es esencial
        para desarrolladores y power users. Es un caso clásico de diseño
        universal.
      </BlogCallout>

      <BlogH3 id="wcag">WCAG 2.2</BlogH3>

      <BlogP>
        Las <strong>Web Content Accessibility Guidelines</strong> son el
        estándar internacional. Se organizan en cuatro principios (POUR):
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Perceivable:</strong> la información debe poder percibirse
          (alternativas de texto, contraste, subtítulos).
        </BlogLi>
        <BlogLi>
          <strong>Operable:</strong> la interfaz debe poder usarse (teclado,
          tiempo suficiente, evitar convulsiones).
        </BlogLi>
        <BlogLi>
          <strong>Understandable:</strong> el contenido debe ser comprensible
          (idioma, navegación predecible, ayuda ante errores).
        </BlogLi>
        <BlogLi>
          <strong>Robust:</strong> debe funcionar con tecnologías de asistencia
          (HTML válido, ARIA correcto).
        </BlogLi>
      </BlogUl>

      <BlogP>
        Cada criterio tiene un nivel de conformidad: <strong>A</strong>{" "}
        (mínimo), <strong>AA</strong> (objetivo habitual) y <strong>AAA</strong>{" "}
        (máximo, difícil de cumplir en todo). La mayoría de las webs apuntan a
        AA.
      </BlogP>

      <BlogCallout type="tip">
        No persigas AAA en todo: algunos criterios AAA (como el contraste
        extremo) degradan la experiencia de otros usuarios. El objetivo realista
        y estándar es AA.
      </BlogCallout>

      <BlogH2 id="html-semantico">HTML semántico</BlogH2>

      <BlogP>
        El HTML semántico es la base de la accesibilidad: los lectores de
        pantalla y los motores de búsqueda entienden la estructura de la página
        a partir de las etiquetas. Antes de añadir ARIA, usa el elemento
        correcto.
      </BlogP>

      <BlogH3 id="landmarks">Landmarks</BlogH3>

      <BlogP>
        Los landmarks son regiones que permiten saltar directamente a ellas. Los
        elementos <BlogInlineCode>header</BlogInlineCode>,{" "}
        <BlogInlineCode>nav</BlogInlineCode>,{" "}
        <BlogInlineCode>main</BlogInlineCode> y{" "}
        <BlogInlineCode>footer</BlogInlineCode> crean landmarks automáticos:
      </BlogP>

      <BlogCode>{`<header>Logo y título del sitio</header>
<nav aria-label="Principal">
  <a href="/">Inicio</a>
  <a href="/blog">Blog</a>
</nav>
<main>
  <h1>Contenido principal</h1>
</main>
<footer>Contacto y legal</footer>`}</BlogCode>

      <BlogP>
        Si hay varios <BlogInlineCode>nav</BlogInlineCode>, distínguelos con{" "}
        <BlogInlineCode>aria-label</BlogInlineCode> para que el usuario sepa a
        cuál saltar.
      </BlogP>

      <BlogH3 id="heading-order">Orden de encabezados</BlogH3>

      <BlogP>
        Los encabezados deben seguir una jerarquía sin saltos: un{" "}
        <BlogInlineCode>h1</BlogInlineCode> por página, luego{" "}
        <BlogInlineCode>h2</BlogInlineCode>, <BlogInlineCode>h3</BlogInlineCode>{" "}
        en orden. Saltar de <BlogInlineCode>h2</BlogInlineCode> a{" "}
        <BlogInlineCode>h4</BlogInlineCode> confunde a los usuarios de lector de
        pantalla que navegan por encabezados.
      </BlogP>

      <BlogCallout type="warn">
        No elijas el nivel de encabezado por el tamaño visual. Si un{" "}
        <BlogInlineCode>h3</BlogInlineCode> debe verse grande, cámbiale el
        estilo con CSS; no lo conviertas en <BlogInlineCode>h1</BlogInlineCode>{" "}
        solo por el tamaño.
      </BlogCallout>

      <BlogH3 id="button-vs-div">button vs div clicable</BlogH3>

      <BlogP>
        Un elemento clicable debe ser un <BlogInlineCode>button</BlogInlineCode>{" "}
        o un <BlogInlineCode>a</BlogInlineCode>, no un{" "}
        <BlogInlineCode>div</BlogInlineCode> con{" "}
        <BlogInlineCode>onClick</BlogInlineCode>. El{" "}
        <BlogInlineCode>button</BlogInlineCode> nativo es enfocable, activable
        con Enter y Espacio, y lo anuncia el lector de pantalla:
      </BlogP>

      <BlogCode>{`{/* Mal: un div clicable no es enfocable ni anunciado */}
<div onClick={handleClick}>Abrir menú</div>

{/* Bien: el button nativo trae teclado y semántica */}
<button onClick={handleClick}>Abrir menú</button>`}</BlogCode>

      <BlogH3 id="listas">Listas</BlogH3>

      <BlogP>
        Usa <BlogInlineCode>ul</BlogInlineCode>/
        <BlogInlineCode>ol</BlogInlineCode> para listas reales. El lector de
        pantalla anuncia "lista de N elementos", lo que ayuda a entender la
        estructura. Un menú de navegación es una lista de enlaces.
      </BlogP>

      <BlogH3 id="label">label</BlogH3>

      <BlogP>
        Todo campo de formulario necesita un{" "}
        <BlogInlineCode>label</BlogInlineCode> asociado. El{" "}
        <BlogInlineCode>for</BlogInlineCode> debe coincidir con el{" "}
        <BlogInlineCode>id</BlogInlineCode> del campo:
      </BlogP>

      <BlogCode>{`<label htmlFor="email">Correo electrónico</label>
<input id="email" type="email" name="email" />`}</BlogCode>

      <BlogCallout type="info">
        El <BlogInlineCode>placeholder</BlogInlineCode> no sustituye al{" "}
        <BlogInlineCode>label</BlogInlineCode>: desaparece al escribir y no
        siempre se lee. El label es el nombre accesible del campo.
      </BlogCallout>

      <BlogH2 id="aria">ARIA</BlogH2>

      <BlogP>
        ARIA (Accessible Rich Internet Applications) añade semántica a elementos
        que el HTML no puede expresar. Su regla de oro:{" "}
        <strong>no uses ARIA si el HTML nativo ya lo hace</strong>.
      </BlogP>

      <BlogCallout type="danger">
        La primera regla de ARIA: si existe un elemento HTML que hace lo que
        necesitas, úsalo. Un <BlogInlineCode>button</BlogInlineCode> real es
        mejor que un <BlogInlineCode>div</BlogInlineCode> con{" "}
        <BlogInlineCode>role="button"</BlogInlineCode>. ARIA no añade
        comportamiento: solo semántica. Si lo usas, debes implementar el teclado
        y el estado tú mismo.
      </BlogCallout>

      <BlogH3 id="aria-label">aria-label y aria-labelledby</BlogH3>

      <BlogP>
        <BlogInlineCode>aria-label</BlogInlineCode> da un nombre accesible a un
        elemento sin texto visible.{" "}
        <BlogInlineCode>aria-labelledby</BlogInlineCode> referencia el{" "}
        <BlogInlineCode>id</BlogInlineCode> de otro elemento que sirve de
        nombre:
      </BlogP>

      <BlogCode>{`{/* aria-label: nombre para un icono sin texto */}
<button aria-label="Cerrar sesión">
  <svg aria-hidden="true">…</svg>
</button>

{/* aria-labelledby: el título del diálogo es su nombre */}
<div role="dialog" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Confirmar borrado</h2>
</div>`}</BlogCode>

      <BlogH3 id="aria-describedby">aria-describedby</BlogH3>

      <BlogP>
        <BlogInlineCode>aria-describedby</BlogInlineCode> vincula una
        descripción adicional (ayuda, error) a un campo. El lector la anuncia
        después del nombre:
      </BlogP>

      <BlogCode>{`<label htmlFor="pass">Contraseña</label>
<input id="pass" type="password" aria-describedby="pass-hint" />
<p id="pass-hint">Mínimo 8 caracteres, con un número.</p>`}</BlogCode>

      <BlogH3 id="roles">Roles</BlogH3>

      <BlogP>
        Los roles declaran qué es un elemento. Los más comunes:{" "}
        <BlogInlineCode>dialog</BlogInlineCode>,{" "}
        <BlogInlineCode>alert</BlogInlineCode>,{" "}
        <BlogInlineCode>tablist</BlogInlineCode>,{" "}
        <BlogInlineCode>menu</BlogInlineCode>. Úsalos solo cuando el HTML no
        tenga un equivalente.
      </BlogP>

      <BlogH3 id="estados">Estados</BlogH3>

      <BlogP>
        Los estados comunican el estado de un widget.{" "}
        <BlogInlineCode>aria-expanded</BlogInlineCode> indica si un panel está
        abierto; <BlogInlineCode>aria-pressed</BlogInlineCode> si un botón de
        alternancia está activo:
      </BlogP>

      <BlogCode>{`<button aria-expanded={open} onClick={() => setOpen(!open)}>
  Filtros {open ? "▲" : "▼"}
</button>

<button aria-pressed={active} onClick={() => setActive(!active)}>
  Negrita
</button>`}</BlogCode>

      <BlogH3 id="aria-live">Regiones vivas: aria-live</BlogH3>

      <BlogP>
        <BlogInlineCode>aria-live</BlogInlineCode> anuncia cambios dinámicos sin
        que el usuario tenga el foco. Es esencial para notificaciones, errores
        de validación y resultados de búsqueda:
      </BlogP>

      <BlogCode>{`{/* polite: anuncia cuando el usuario está inactivo */}
<div aria-live="polite">{statusMessage}</div>

{/* assertive: interrumpe para anunciar de inmediato */}
<div role="alert">{errorMessage}</div>`}</BlogCode>

      <BlogCallout type="warn">
        Usa <BlogInlineCode>aria-live="assertive"</BlogInlineCode> con
        moderación: interrumpe al usuario. Para la mayoría de los mensajes,{" "}
        <BlogInlineCode>polite</BlogInlineCode> es suficiente y menos invasivo.
      </BlogCallout>

      <BlogH2 id="formularios">Formularios accesibles</BlogH2>

      <BlogP>
        Un formulario accesible combina labels asociados, errores vinculados y
        estados de validación claros.
      </BlogP>

      <BlogH3 id="labels">Labels asociados</BlogH3>

      <BlogP>
        Cada campo tiene su <BlogInlineCode>label</BlogInlineCode> con{" "}
        <BlogInlineCode>htmlFor</BlogInlineCode>. Los campos obligatorios se
        marcan con <BlogInlineCode>required</BlogInlineCode> y{" "}
        <BlogInlineCode>aria-required</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`<label htmlFor="nombre">Nombre *</label>
<input id="nombre" name="nombre" required aria-required="true" />`}</BlogCode>

      <BlogH3 id="errores">Mensajes de error vinculados</BlogH3>

      <BlogP>
        El error se vincula al campo con{" "}
        <BlogInlineCode>aria-describedby</BlogInlineCode> y el campo inválido se
        marca con <BlogInlineCode>aria-invalid</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`<label htmlFor="email">Correo</label>
<input
  id="email"
  type="email"
  aria-invalid={!!error}
  aria-describedby={error ? "email-error" : undefined}
/>
{error && <p id="email-error" role="alert">{error}</p>}`}</BlogCode>

      <BlogCallout type="tip">
        No uses solo el color para indicar el error: añade un icono y un texto.
        El color no es accesible para personas con daltonismo ni para lectores
        de pantalla.
      </BlogCallout>

      <BlogH2 id="teclado">Navegación por teclado</BlogH2>

      <BlogP>
        Toda la funcionalidad debe ser operable con teclado. La tecla Tab
        recorre los elementos enfocables en orden de documento.
      </BlogP>

      <BlogH3 id="tabindex">tabindex</BlogH3>

      <BlogP>
        <BlogInlineCode>tabindex</BlogInlineCode> controla el orden de
        tabulación:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>0:</strong> el elemento entra en el orden natural (para hacer
          enfocable un elemento no enfocable).
        </BlogLi>
        <BlogLi>
          <strong>-1:</strong> enfocable por script pero no por Tab (para mover
          el foco a un modal o error).
        </BlogLi>
        <BlogLi>
          <strong>&gt; 0:</strong> evítalo. Rompe el orden natural del documento
          y es difícil de mantener.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="danger">
        Nunca uses <BlogInlineCode>tabindex</BlogInlineCode> mayor que 0. El
        orden de tabulación debe seguir el orden del documento; los valores
        positivos crean un orden artificial que confunde a los usuarios de
        teclado.
      </BlogCallout>

      <BlogH3 id="focus-management">Focus management en modales</BlogH3>

      <BlogP>
        Al abrir un modal, el foco debe moverse dentro; al cerrarlo, volver al
        elemento que lo abrió. Sin esto, el usuario de teclado queda "atrapado"
        o pierde el contexto:
      </BlogP>

      <BlogCode>{`import { useEffect, useRef } from "react";

export function Modal({ open, onClose, title }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <h2 id="modal-title">{title}</h2>
      <button ref={closeRef} onClick={onClose}>Cerrar</button>
    </div>
  );
}`}</BlogCode>

      <BlogH3 id="skip-links">Skip links</BlogH3>

      <BlogP>
        Un skip link permite saltar la navegación e ir directo al contenido. Es
        el primer enlace de la página, normalmente oculto hasta recibir foco:
      </BlogP>

      <BlogCode>{`<a href="#main" className="sr-only focus:not-sr-only">
  Saltar al contenido
</a>
<main id="main">…</main>`}</BlogCode>

      <BlogH3 id="focus-visible">:focus-visible</BlogH3>

      <BlogP>
        <BlogInlineCode>:focus-visible</BlogInlineCode> muestra el anillo de
        foco solo cuando se navega con teclado, no al hacer clic. Es la forma
        moderna de no eliminar el foco visible:
      </BlogP>

      <BlogCode>{`/* Mal: elimina el foco para todos */
button:focus { outline: none; }

/* Bien: solo oculta el anillo cuando se usa el ratón */
button:focus:not(:focus-visible) { outline: none; }
button:focus-visible { outline: 2px solid #2563eb; }`}</BlogCode>

      <BlogCallout type="warn">
        Nunca elimines el <BlogInlineCode>outline</BlogInlineCode> sin
        reemplazarlo. El anillo de foco es la única señal visual de posición
        para los usuarios de teclado.
      </BlogCallout>

      <BlogH2 id="contraste">Contraste y color</BlogH2>

      <BlogP>El contraste entre texto y fondo debe cumplir ratios WCAG:</BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Texto normal:</strong> ≥ 4.5:1 (AA).
        </BlogLi>
        <BlogLi>
          <strong>Texto grande (≥ 18px o 14px bold):</strong> ≥ 3:1.
        </BlogLi>
        <BlogLi>
          <strong>Componentes de UI y gráficos:</strong> ≥ 3:1.
        </BlogLi>
      </BlogUl>

      <BlogP>
        Además, el color no debe ser la única señal de un estado. Un enlace que
        solo cambia de color es invisible para un daltónico; añade subrayado o
        un icono.
      </BlogP>

      <BlogH3 id="reduced-motion">prefers-reduced-motion</BlogH3>

      <BlogP>
        Respeta la preferencia del usuario de reducir movimiento. La media query{" "}
        <BlogInlineCode>prefers-reduced-motion</BlogInlineCode> permite
        desactivar animaciones:
      </BlogP>

      <BlogCode>{`@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`}</BlogCode>

      <BlogCallout type="info">
        El movimiento excesivo puede provocar mareos o convulsiones en personas
        con sensibilidad vestibular o epilepsia fotosensible. Las animaciones
        deben ser opcionales, no obligatorias.
      </BlogCallout>

      <BlogH2 id="testing">Testing de accesibilidad</BlogH2>

      <BlogP>
        El testing automatizado detecta una parte de los problemas; el manual
        cubre el resto. Combina ambos.
      </BlogP>

      <BlogH3 id="automatizado">Herramientas automatizadas</BlogH3>

      <BlogUl>
        <BlogLi>
          <strong>axe-core:</strong> el motor de detección más usado. Se integra
          en DevTools y en tests.
        </BlogLi>
        <BlogLi>
          <strong>Lighthouse a11y:</strong> auditoría de accesibilidad dentro de
          Lighthouse.
        </BlogLi>
        <BlogLi>
          <strong>jest-axe:</strong> ejecuta axe en tests de componentes.
        </BlogLi>
        <BlogLi>
          <strong>eslint-plugin-jsx-a11y:</strong> detecta problemas en el
          código JSX (labels, roles, alt).
        </BlogLi>
      </BlogUl>

      <BlogCode>{`// jest-axe en un test de componente
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

it("no tiene violaciones de accesibilidad", async () => {
  const { container } = render(<LoginForm />);
  expect(await axe(container)).toHaveNoViolations();
});`}</BlogCode>

      <BlogH3 id="manual">Pruebas manuales</BlogH3>

      <BlogP>
        La prueba manual más valiosa: navega toda la app solo con teclado. Si no
        puedes completar una tarea sin ratón, hay un problema. También prueba
        con un lector de pantalla (VoiceOver en macOS, NVDA en Windows) y con
        zoom al 200%.
      </BlogP>

      <BlogCallout type="tip">
        El testing de accesibilidad es una pirámide: lint en el editor, axe en
        CI, Lighthouse en cada release y una prueba manual con teclado y lector
        de pantalla antes de publicar. Cada capa atrapa un tipo distinto de
        error.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Ejercicios</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Convierte un div clicable en un botón accesible con nombre accesible y estado expandido."
          hint="Usa <button> nativo, aria-expanded y un aria-label si no hay texto visible."
          level="Básico"
          num={1}
          solution={`<button
  aria-expanded={open}
  onClick={() => setOpen(!open)}
>
  <span>Filtros</span>
  <svg aria-hidden="true">…</svg>
</button>`}
          title="Botón accesible"
        />

        <ExerciseCard
          description="Asocia un label a un campo de formulario y vincula un mensaje de error con aria-describedby y aria-invalid."
          hint="htmlFor/id, aria-invalid={!!error} y aria-describedby apuntando al id del error."
          level="Básico"
          num={2}
          solution={`<label htmlFor="email">Correo electrónico</label>
<input
  id="email"
  type="email"
  aria-invalid={!!error}
  aria-describedby={error ? "email-error" : undefined}
/>
{error && (
  <p id="email-error" role="alert">{error}</p>
)}`}
          title="Formulario con error vinculado"
        />

        <ExerciseCard
          description="Implementa un modal accesible que mueva el foco al abrirse y lo devuelva al cerrarse."
          hint="useRef + useEffect para enfocar al abrir, y guarda el elemento que abrió para restaurar el foco."
          level="Intermedio"
          num={3}
          solution={`import { useEffect, useRef } from "react";

export function Modal({ open, onClose, title }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      openerRef.current = document.activeElement as HTMLElement;
      closeRef.current?.focus();
    } else {
      openerRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <h2 id="modal-title">{title}</h2>
      <button ref={closeRef} onClick={onClose}>Cerrar</button>
    </div>
  );
}`}
          title="Modal con focus management"
        />

        <ExerciseCard
          description="Añade un skip link y asegura que el foco sea visible solo al navegar con teclado."
          hint="Enlace sr-only focus:not-sr-only hacia #main, y :focus-visible para el anillo."
          level="Intermedio"
          num={4}
          solution={`<a href="#main" className="sr-only focus:not-sr-only">
  Saltar al contenido
</a>
<main id="main">…</main>

/* globals.css */
button:focus:not(:focus-visible) { outline: none; }
button:focus-visible { outline: 2px solid #2563eb; }`}
          title="Skip link y focus visible"
        />

        <ExerciseCard
          description="Crea una región aria-live que anuncie el resultado de una búsqueda sin que el usuario tenga el foco en ella."
          hint='aria-live="polite" en un contenedor que se actualiza con el resultado.'
          level="Avanzado"
          num={5}
          solution={`import { useState } from "react";

export function SearchResults() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = async (value: string) => {
    setQuery(value);
    const data = await search(value);
    setResults(data);
  };

  return (
    <div>
      <label htmlFor="search">Buscar</label>
      <input
        id="search"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {/* El lector anuncia el cambio sin que el foco esté aquí */}
      <div aria-live="polite">
        {results.length > 0
          ? \`\${results.length} resultados\`
          : "Sin resultados"}
      </div>
    </div>
  );
}`}
          title="Región viva para resultados"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        La accesibilidad no es una lista de requisitos: es una forma de pensar
        el producto. Empieza por el HTML semántico, añade ARIA solo donde hace
        falta, respeta el teclado y el contraste, y automatiza el testing para
        que los errores no vuelvan. Al final, una web accesible es una web mejor
        para todos.
      </BlogP>
    </article>
  );
}
