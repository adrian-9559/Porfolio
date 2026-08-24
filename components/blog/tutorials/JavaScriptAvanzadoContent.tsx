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

export default function JavaScriptAvanzadoContent() {
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
        JavaScript moderno: asíncrono y APIs del navegador
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        El corazón de cualquier aplicación web moderna es el código asíncrono:
        peticiones a APIs, eventos del DOM, timers y almacenamiento. Este
        tutorial profundiza en promesas, async/await, fetch con cancelación,
        observadores del DOM, módulos ES y las APIs del navegador que usas a
        diario sin pensar. Prerequisito conceptual: JavaScript básico
        (funciones, arrays y objetos).
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="promesas">Promesas en profundidad</BlogH2>

      <BlogP>
        Una <strong>promesa</strong> representa un valor que puede estar
        disponible ahora, en el futuro o nunca. Tiene tres estados:{" "}
        <strong>pending</strong> (pendiente), <strong>fulfilled</strong>{" "}
        (resuelta) y <strong>rejected</strong> (rechazada). Una vez que pasa de{" "}
        <em>pending</em>, su estado ya no cambia:
      </BlogP>

      <BlogCode>{`const esperar = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const peticion = fetch("https://api.example.com/datos");

// Estados
console.log(peticion);            // Promise { <pending> }
peticion.then((res) => {
  console.log("Resuelta:", res);  // fulfilled
});`}</BlogCode>

      <BlogP>
        El <strong>chaining</strong> encadena{" "}
        <BlogInlineCode>.then()</BlogInlineCode> y devuelve una nueva promesa,
        permitiendo transformar el valor y propagar errores por la cadena:
      </BlogP>

      <BlogCode>{`fetch("https://api.example.com/usuarios/1")
  .then((res) => res.json())
  .then((usuario) => {
    // Si esto lanza un error, la cadena salta al .catch
    console.log(usuario.nombre);
  })
  .catch((error) => {
    console.error("Algo falló:", error);
  })
  .finally(() => {
    console.log("La petición terminó (sí o sí)");
  });`}</BlogCode>

      <BlogCallout type="warn">
        Un error que ocurre dentro de un{" "}
        <BlogInlineCode>.then()</BlogInlineCode> no se propaga a la promesa
        original: se propaga a la promesa devuelta por ese{" "}
        <BlogInlineCode>.then()</BlogInlineCode>. Siempre encadena el{" "}
        <BlogInlineCode>.catch()</BlogInlineCode> al final de la cadena.
      </BlogCallout>

      <BlogH3 id="combinadores">
        Combinadores: all, allSettled, race, any
      </BlogH3>

      <BlogP>
        Cuando necesitas varias promesas a la vez, JavaScript ofrece cuatro
        combinadores con semánticas distintas:
      </BlogP>

      <BlogCode>{`// Promise.all: espera TODAS; si una falla, falla todo.
const [usuarios, productos] = await Promise.all([
  fetch("/api/usuarios").then((r) => r.json()),
  fetch("/api/productos").then((r) => r.json()),
]);

// Promise.allSettled: espera TODAS; devuelve el resultado de cada una.
const resultados = await Promise.allSettled([
  fetch("/a"),
  fetch("/b"),
  fetch("/c"),
]);
resultados.forEach((r) => {
  if (r.status === "fulfilled") {
    console.log("OK:", r.value);
  } else {
    console.log("FALLÓ:", r.reason);
  }
});

// Promise.race: gana la primera en terminar (resuelta o rechazada).
const masRapida = await Promise.race([cargarLento(), cargarRapido()]);

// Promise.any: la primera en RESOLVERSE; solo falla si TODAS fallan.
const primeraOk = await Promise.any([replicaA(), replicaB(), replicaC()]);`}</BlogCode>

      <BlogCallout type="tip">
        <BlogInlineCode>Promise.all</BlogInlineCode> con un array vacío se
        resuelve con un array vacío (útil como "gate").{" "}
        <BlogInlineCode>Promise.any</BlogInlineCode> con todas las promesas
        rechazadas lanza un <BlogInlineCode>AggregateError</BlogInlineCode> que
        contiene todas las razones.
      </BlogCallout>

      <BlogP>
        <BlogInlineCode>Promise.all</BlogInlineCode> falla rápido: si una
        promesa se rechaza, las demás se siguen ejecutando en segundo plano pero
        su resultado se descarta. Para "parar" realmente las demás necesitas{" "}
        <BlogInlineCode>AbortController</BlogInlineCode> (lo vemos en fetch).
      </BlogP>

      <BlogH2 id="async-await">async/await</BlogH2>

      <BlogP>
        <BlogInlineCode>async/await</BlogInlineCode> es azúcar sintáctico sobre
        promesas: permite escribir código asíncrono con la estructura visual de
        código síncrono. Una función <BlogInlineCode>async</BlogInlineCode>{" "}
        siempre devuelve una promesa:
      </BlogP>

      <BlogCode>{`async function obtenerUsuario(id: number) {
  const res = await fetch("/api/usuarios/" + id);
  if (!res.ok) throw new Error("Usuario no encontrado");
  return res.json();
}

// Lo anterior equivale a:
function obtenerUsuario(id: number) {
  return fetch("/api/usuarios/" + id).then((res) => {
    if (!res.ok) throw new Error("Usuario no encontrado");
    return res.json();
  });
}`}</BlogCode>

      <BlogP>
        El manejo de errores con <BlogInlineCode>try/catch</BlogInlineCode>{" "}
        captura tanto los rechazos de <BlogInlineCode>await</BlogInlineCode>{" "}
        como los errores síncronos de la misma función:
      </BlogP>

      <BlogCode>{`async function cargarPerfil(id: number) {
  try {
    const usuario = await obtenerUsuario(id);
    const posts = await obtenerPosts(usuario.id);
    return { usuario, posts };
  } catch (error) {
    console.error("No se pudo cargar el perfil:", error);
    return null; // degradación elegante
  }
}`}</BlogCode>

      <BlogCallout type="warn">
        Los <BlogInlineCode>await</BlogInlineCode> en serie son lentos:{" "}
        <BlogInlineCode>await a(); await b()</BlogInlineCode> ejecuta{" "}
        <BlogInlineCode>b</BlogInlineCode> solo cuando{" "}
        <BlogInlineCode>a</BlogInlineCode> termina. Si no hay dependencia entre
        ellas, lánzalas en paralelo. En el ejemplo anterior,{" "}
        <BlogInlineCode>obtenerUsuario</BlogInlineCode> debe terminar antes de
        pedir sus posts — pero dos posts independientes deberían ir con{" "}
        <BlogInlineCode>Promise.all</BlogInlineCode>.
      </BlogCallout>

      <BlogP>
        El <strong>top-level await</strong> permite usar{" "}
        <BlogInlineCode>await</BlogInlineCode> fuera de una función async, en el
        cuerpo de un módulo ES. Es la base de cargar dependencias que necesitan
        otras de forma natural:
      </BlogP>

      <BlogCode>{`// config.ts
const config = await fetch("/api/config").then((r) => r.json());

// Otro módulo puede importarla sabiendo que ya está lista
export const apiUrl = config.apiUrl;`}</BlogCode>

      <BlogCallout type="info">
        Top-level await bloquea la evaluación del módulo hasta resolver, y por
        lo tanto también a quien lo importa. Úsalo para inicialización
        imprescindible y evítalo en bibliotecas públicas: hace el arranque de la
        app más lento.
      </BlogCallout>

      <BlogH2 id="fetch">Fetch y consumo de APIs</BlogH2>

      <BlogP>
        <BlogInlineCode>fetch</BlogInlineCode> es la API nativa para peticiones
        HTTP. Devuelve una promesa que se resuelve cuando llegan los{" "}
        <strong>headers</strong>, no cuando llega el cuerpo. Por eso hay que
        llamar a <BlogInlineCode>res.json()</BlogInlineCode> (o{" "}
        <BlogInlineCode>res.text()</BlogInlineCode>) para leer el contenido:
      </BlogP>

      <BlogCode>{`async function enviarDatos(datos: object) {
  const res = await fetch("/api/contacto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": "pk_123", // cabecera custom de ejemplo
    },
    body: JSON.stringify(datos),
  });

  // fetch NO lanza error en 4xx/5xx: hay que comprobarlo a mano
  if (!res.ok) {
    const detalle = await res.text();
    throw new Error("HTTP " + res.status + ": " + detalle);
  }

  return res.json();
}`}</BlogCode>

      <BlogCallout type="warn">
        Comprobar <BlogInlineCode>res.ok</BlogInlineCode> (o el{" "}
        <BlogInlineCode>status</BlogInlineCode>) es obligatorio:{" "}
        <BlogInlineCode>fetch</BlogInlineCode> solo rechaza la promesa por
        errores de red (DNS, conexión cortada, CORS), nunca por un 404 o 500.
        Una API que responde 500 sin comprobarlo "parece que funciona" y te
        devuelve un HTML de error como si fuera JSON.
      </BlogCallout>

      <BlogH3 id="abort">AbortController y cancelación</BlogH3>

      <BlogP>
        <BlogInlineCode>AbortController</BlogInlineCode> permite cancelar una
        petición en curso. Es imprescindible en componentes que se desmontan, en
        búsquedas que escriben más rápido de lo que responden y en timeouts de
        red:
      </BlogP>

      <BlogCode>{`function buscarConTiempo(consulta: string) {
  const controlador = new AbortController();

  const timeout = setTimeout(() => controlador.abort(), 5000);

  return fetch("/api/buscar?q=" + encodeURIComponent(consulta), {
    signal: controlador.signal,
  })
    .then((res) => {
      clearTimeout(timeout);
      return res.json();
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        throw new Error("La búsqueda tardó demasiado");
      }
      throw error;
    });
}`}</BlogCode>

      <BlogP>
        Una forma más limpia para timeouts es{" "}
        <BlogInlineCode>AbortSignal.timeout()</BlogInlineCode>, que aborta
        automáticamente al cabo de los milisegundos indicados:
      </BlogP>

      <BlogCode>{`const res = await fetch("/api/lento", {
  signal: AbortSignal.timeout(5000),
}).catch((error) => {
  if (error.name === "AbortError") {
    console.warn("Timeout: la API no respondió a tiempo");
  }
});`}</BlogCode>

      <BlogH2 id="dom-avanzado">DOM avanzado</BlogH2>

      <BlogH3 id="data-attributes">data-* y classList</BlogH3>

      <BlogP>
        Los atributos <BlogInlineCode>data-*</BlogInlineCode> guardan datos
        arbitrarios en un elemento sin interferir con la semántica HTML. Se leen
        con <BlogInlineCode>dataset</BlogInlineCode> (camelCase) y se actualizan
        en caliente:
      </BlogP>

      <BlogCode>{`<button data-accion="eliminar" data-id="42">Eliminar</button>

<script>
  const boton = document.querySelector("button[data-accion='eliminar']");
  console.log(boton.dataset.accion); // "eliminar"
  console.log(boton.dataset.id);     // "42"
  boton.dataset.estado = "confirmando";
</script>`}</BlogCode>

      <BlogP>
        <BlogInlineCode>classList</BlogInlineCode> es la forma segura de
        manipular clases: <BlogInlineCode>add</BlogInlineCode>,{" "}
        <BlogInlineCode>remove</BlogInlineCode>,{" "}
        <BlogInlineCode>toggle</BlogInlineCode> y{" "}
        <BlogInlineCode>contains</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`const panel = document.getElementById("panel");

panel.classList.add("abierto");              // añade una clase
panel.classList.remove("abierto");           // la quita
panel.classList.toggle("abierto");           // alterna
const estaAbierto = panel.classList.contains("abierto");

// Con segundo argumento (force)
panel.classList.toggle("abierto", hayNoticias);`}</BlogCode>

      <BlogH3 id="delegacion">Event delegation y closest()</BlogH3>

      <BlogP>
        Los eventos del DOM <em>burbujean</em>: un clic en un hijo sube hasta
        sus ancestros. La <strong>delegación de eventos</strong> aprovecha esto
        para escuchar una vez en un contenedor en vez de poner un listener en
        cada hijo — imprescindible en listas dinámicas:
      </BlogP>

      <BlogCode>{`const lista = document.getElementById("lista");

lista.addEventListener("click", (evento) => {
  const objetivo = evento.target as HTMLElement;

  const fila = objetivo.closest("tr[data-id]");
  if (!fila) return; // el clic no fue en una fila válida

  const id = fila.dataset.id;
  if (objetivo.matches("button.eliminar")) {
    borrarFila(id);
  } else if (objetivo.matches("button.editar")) {
    abrirEditor(id);
  }
});`}</BlogCode>

      <BlogCallout type="info">
        <BlogInlineCode>closest()</BlogInlineCode> recorre hacia arriba buscando
        el ancestro que cumple el selector;{" "}
        <BlogInlineCode>matches()</BlogInlineCode> comprueba si un elemento
        concreto lo cumple. La combinación de ambos con delegación es el patrón
        de tablas y listas de toda la web.
      </BlogCallout>

      <BlogH3 id="observadores">IntersectionObserver y MutationObserver</BlogH3>

      <BlogP>
        <BlogInlineCode>IntersectionObserver</BlogInlineCode> notifica cuando un
        elemento entra o sale del viewport (o se cruza con otro). Es la base del
        lazy loading y de los efectos de scroll sin tocar el evento{" "}
        <BlogInlineCode>scroll</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        cargarImagen(entrada.target as HTMLImageElement);
        observador.unobserve(entrada.target); // solo una vez
      }
    });
  },
  { rootMargin: "200px" } // precarga 200px antes de entrar
);

document.querySelectorAll("img[data-lazy]").forEach((img) => {
  observador.observe(img);
});`}</BlogCode>

      <BlogP>
        <BlogInlineCode>MutationObserver</BlogInlineCode> observa cambios en el
        DOM: nodos añadidos, atributos modificados o texto alterado. Es la forma
        de reaccionar a cambios que no controlas (código de terceros,
        extensiones, SPAs):
      </BlogP>

      <BlogCode>{`const observador = new MutationObserver((mutaciones) => {
  mutaciones.forEach((mutacion) => {
    if (mutacion.type === "childList") {
      mutacion.addedNodes.forEach((nodo) => {
        if (nodo instanceof HTMLElement && nodo.matches(".ad")) {
          nodo.remove(); // bloquea anuncios inyectados
        }
      });
    }
  });
});

observador.observe(document.body, { childList: true, subtree: true });`}</BlogCode>

      <BlogCallout type="warn">
        Los <strong>observadores</strong> no deben sustituir a la arquitectura
        de tu framework (React/Vue gestionan su propio DOM). Úsalos para
        integraciones con librerías externas y lazy loading. Y recuerda llamar
        siempre a <BlogInlineCode>disconnect()</BlogInlineCode> o{" "}
        <BlogInlineCode>unobserve()</BlogInlineCode> para no filtrar listeners.
      </BlogCallout>

      <BlogH2 id="modulos">Módulos ES</BlogH2>

      <BlogP>
        Los módulos ES organizan el código en unidades con dependencias
        explícitas. Cada módulo tiene su propio scope: lo que no se exporta, no
        existe fuera:
      </BlogP>

      <BlogCode>{`// utils.ts
export function formatearMoneda(cantidad: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(cantidad);
}

export const VERSION = "1.0.0";

// default: un único export principal por módulo
export default function saludar(nombre: string) {
  return "Hola, " + nombre;
}

// app.ts
import saludar, { formatearMoneda, VERSION } from "./utils.js";

console.log(saludar("Ana"));
console.log(formatearMoneda(19.99));`}</BlogCode>

      <BlogP>
        El <strong>dynamic import()</strong> carga un módulo bajo demanda,
        devolviendo una promesa. Es la base del code splitting y del lazy
        loading de rutas en frameworks como Next.js:
      </BlogP>

      <BlogCode>{`// Carga solo cuando el usuario la necesita
async function abrirEditor() {
  const modulo = await import("./editor.js");
  modulo.iniciarEditor();
}

// Carga condicional según el navegador
if (navigator.clipboard) {
  const { copiar } = await import("./clipboard.js");
  copiar(texto);
}`}</BlogCode>

      <BlogCallout type="tip">
        El <strong>tree-shaking</strong> elimina del bundle final los exports
        que nunca se importan. Para que funcione, escribe exports con nombre (no
        efectos secundarios en el módulo) y evita importar bibliotecas enteras
        cuando solo usas una función.
      </BlogCallout>

      <BlogH2 id="apis-navegador">APIs del navegador</BlogH2>

      <BlogH3 id="storage">localStorage y sessionStorage</BlogH3>

      <BlogP>
        <BlogInlineCode>localStorage</BlogInlineCode> persiste entre sesiones y{" "}
        <BlogInlineCode>sessionStorage</BlogInlineCode> se borra al cerrar la
        pestaña. Ambos guardan solo <strong>strings</strong>, así que los
        objetos se serializan con JSON:
      </BlogP>

      <BlogCode>{`// Guardar
const prefs = { tema: "oscuro", idioma: "es" };
localStorage.setItem("prefs", JSON.stringify(prefs));

// Leer (con valor por defecto y try/catch)
function leerPrefs() {
  try {
    const crudo = localStorage.getItem("prefs");
    return crudo ? JSON.parse(crudo) : { tema: "claro" };
  } catch {
    return { tema: "claro" }; // JSON corrupto
  }
}

// Eliminar
localStorage.removeItem("prefs");
sessionStorage.setItem("token", "abc123");`}</BlogCode>

      <BlogCallout type="warn">
        <BlogInlineCode>localStorage</BlogInlineCode> es síncrono y bloquea el
        hilo principal, y no es seguro para datos sensibles (cualquier script de
        la página puede leerlo). Para sesiones usa cookies httpOnly o
        almacenamiento en memoria; para datos grandes, IndexedDB.
      </BlogCallout>

      <BlogH3 id="url">URL y URLSearchParams</BlogH3>

      <BlogP>
        <BlogInlineCode>URL</BlogInlineCode> parsea y construye URLs de forma
        segura, y <BlogInlineCode>URLSearchParams</BlogInlineCode> maneja la
        query string sin concatenar strings a mano:
      </BlogP>

      <BlogCode>{`const url = new URL("https://api.example.com/buscar");
url.searchParams.set("q", "javascript avanzado");
url.searchParams.set("pagina", "2");
url.searchParams.delete("filtro");

console.log(url.toString());
// https://api.example.com/buscar?q=javascript+avanzado&pagina=2

// Leer la URL actual
const actual = new URL(window.location.href);
const termino = actual.searchParams.get("q");
const pagina = Number(actual.searchParams.get("pagina") ?? "1");`}</BlogCode>

      <BlogH3 id="clipboard">Clipboard API</BlogH3>

      <BlogP>
        La <strong>Clipboard API</strong> escribe y lee del portapapeles de
        forma asíncrona y segura (requiere permiso o gesto del usuario):
      </BlogP>

      <BlogCode>{`async function copiarTexto(texto: string) {
  try {
    await navigator.clipboard.writeText(texto);
    console.log("Copiado");
  } catch (error) {
    console.error("No se pudo copiar:", error);
  }
}

// Fallback para contextos sin permiso
async function copiarConRespaldo(texto: string) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(texto);
    return;
  }
  const area = document.createElement("textarea");
  area.value = texto;
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  area.remove();
}`}</BlogCode>

      <BlogH3 id="intl">Intl para fechas y números</BlogH3>

      <BlogP>
        <BlogInlineCode>Intl</BlogInlineCode> formatea fechas, números y monedas
        según el locale, sin librerías externas:
      </BlogP>

      <BlogCode>{`const fecha = new Date("2026-08-03T10:00:00Z");

new Intl.DateTimeFormat("es-ES", {
  dateStyle: "full",
  timeStyle: "short",
}).format(fecha);
// "lunes, 3 de agosto de 2026, 12:00"

new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
}).format(1234.5);
// "1.234,50 €"

new Intl.RelativeTimeFormat("es-ES", { numeric: "auto" })
  .format(-2, "day");
// "hace 2 días"`}</BlogCode>

      <BlogH3 id="structuredClone">structuredClone</BlogH3>

      <BlogP>
        <BlogInlineCode>structuredClone()</BlogInlineCode> hace una copia
        profunda de un objeto, incluyendo fechas, Map, Set y arrays anidados —
        algo que <BlogInlineCode>JSON.parse(JSON.stringify())</BlogInlineCode>{" "}
        no puede:
      </BlogP>

      <BlogCode>{`const original = {
  nombre: "Ana",
  fecha: new Date(),
  tags: new Set(["js", "async"]),
};

const copia = structuredClone(original);
copia.tags.add("dom");

console.log(original.tags.has("dom")); // false: copia independiente`}</BlogCode>

      <BlogCallout type="info">
        <BlogInlineCode>structuredClone</BlogInlineCode> no clona funciones ni
        símbolos, y lanza un error si encuentra algo no clonable (como un
        elemento del DOM). Para esos casos, sigue siendo necesario un clon
        manual o una librería.
      </BlogCallout>

      <BlogH2 id="buenas-practicas">Buenas prácticas de asincronía</BlogH2>

      <BlogH3 id="race-conditions">Evitar race conditions</BlogH3>

      <BlogP>
        Una <strong>race condition</strong> ocurre cuando dos respuestas
        asíncronas compiten y la más antigua llega después de la más nueva,
        sobrescribiendo el estado con datos obsoletos. El patrón clásico es la
        búsqueda con autocompletado:
      </BlogP>

      <BlogCode>{`let peticionActual = 0;

async function buscar(consulta: string) {
  const id = ++peticionActual; // marca esta petición

  const res = await fetch("/api/buscar?q=" + consulta);
  const datos = await res.json();

  // Si llegó otra petición más nueva, descarta esta
  if (id !== peticionActual) return;
  renderizarResultados(datos);
}`}</BlogCode>

      <BlogCallout type="tip">
        La alternativa moderna es{" "}
        <BlogInlineCode>AbortController</BlogInlineCode>: aborta la petición
        anterior antes de lanzar la nueva. Así no solo ignoras el resultado,
        sino que liberas la conexión de red.
      </BlogCallout>

      <BlogH3 id="throttle-debounce">Throttling y debouncing</BlogH3>

      <BlogP>
        Los eventos de alta frecuencia (scroll, resize, input) disparan
        demasiadas veces por segundo. Dos técnicas las limitan:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Debounce:</strong> ejecuta la función solo después de que pase
          un tiempo sin nuevos eventos. Ideal para búsquedas mientras se
          escribe.
        </BlogLi>
        <BlogLi>
          <strong>Throttle:</strong> ejecuta como máximo una vez cada X
          milisegundos. Ideal para scroll y resize.
        </BlogLi>
      </BlogUl>

      <BlogCode>{`function debounce<T extends (...args: never[]) => void>(
  fn: T,
  espera: number
) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), espera);
  };
}

const buscarDebounced = debounce((q: string) => {
  buscar(q);
}, 300);

input.addEventListener("input", (e) => {
  buscarDebounced((e.target as HTMLInputElement).value);
});`}</BlogCode>

      <BlogCallout type="warn">
        No reinventes la rueda en producción: React Query, SWR y librerías de
        estado ya gestionan race conditions, caché y cancelación. Estas técnicas
        manuales son para entender el mecanismo y para código vanilla o
        integraciones puntuales.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Ejercicios</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Escribe una función async que cargue dos recursos independientes en paralelo con Promise.all y devuelva ambos."
          hint="fetch ambos sin await en serie; usa Promise.all([...])."
          level="Básico"
          num={1}
          solution={`async function cargarTodo() {
  const [usuarios, productos] = await Promise.all([
    fetch("/api/usuarios").then((r) => r.json()),
    fetch("/api/productos").then((r) => r.json()),
  ]);
  return { usuarios, productos };
}`}
          title="Carga en paralelo"
        />

        <ExerciseCard
          description="Implementa una búsqueda con debounce de 300ms que evite disparar una petición por cada tecla."
          hint="clearTimeout + setTimeout dentro de la función debounce."
          level="Intermedio"
          num={2}
          solution={`function debounce(fn, espera) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), espera);
  };
}

const buscar = debounce((q) => {
  fetch("/api/buscar?q=" + encodeURIComponent(q));
}, 300);

input.addEventListener("input", (e) => {
  buscar(e.target.value);
});`}
          title="Debounce de búsqueda"
        />

        <ExerciseCard
          description="Cancela una petición fetch cuando el usuario pulsa un botón 'Cancelar', usando AbortController."
          hint="Pasa signal al fetch y llama a controlador.abort() en el click."
          level="Intermedio"
          num={3}
          solution={`const controlador = new AbortController();

async function cargar() {
  try {
    const res = await fetch("/api/datos", {
      signal: controlador.signal,
    });
    return await res.json();
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Petición cancelada por el usuario");
    } else {
      throw error;
    }
  }
}

botonCancelar.addEventListener("click", () => controlador.abort());`}
          title="Cancelar petición"
        />

        <ExerciseCard
          description="Implementa lazy loading de imágenes con IntersectionObserver: carga el src real solo cuando la imagen entra en el viewport."
          hint="Observa img[data-src] y asigna el src cuando isIntersecting sea true."
          level="Avanzado"
          num={4}
          solution={`const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      const img = entrada.target as HTMLImageElement;
      img.src = img.dataset.src ?? "";
      img.removeAttribute("data-src");
      observador.unobserve(img);
    });
  },
  { rootMargin: "200px" }
);

document.querySelectorAll("img[data-src]").forEach((img) => {
  observador.observe(img);
});`}
          title="Lazy loading de imágenes"
        />

        <ExerciseCard
          description="Escribe una función que evite una race condition en una búsqueda: si llega una petición más nueva, descarta la anterior."
          hint="Lleva un contador de peticiones y compara el id al resolver."
          level="Avanzado"
          num={5}
          solution={`let peticionActual = 0;

async function buscar(consulta) {
  const id = ++peticionActual;
  const res = await fetch("/api/buscar?q=" + consulta);
  const datos = await res.json();
  if (id !== peticionActual) return; // obsoleta
  renderizar(datos);
}`}
          title="Evitar race condition"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        El asincronismo es lo que hace que la web se sienta viva: promesas para
        coordinar, async/await para leerlo con claridad, fetch para hablar con
        el servidor y las APIs del navegador para interactuar con el entorno.
        Dominar los combinadores, la cancelación y los observadores te separa de
        quien solo encadena .then(). Con estas piezas ya puedes construir
        interfaces rápidas, robustas y sin condiciones de carrera.
      </BlogP>
    </article>
  );
}
