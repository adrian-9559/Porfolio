"use client";
import { useState } from "react";

type SectionId =
  | "intro"
  | "fundamentos"
  | "funciones"
  | "arrays-objetos"
  | "dom"
  | "async"
  | "es6plus"
  | "proyecto-final"
  | "ejercicios";

interface SectionDef {
  id: SectionId;
  label: string;
}
const SECTIONS: SectionDef[] = [
  { id: "intro", label: "1. Introducción" },
  { id: "fundamentos", label: "2. Fundamentos" },
  { id: "funciones", label: "3. Funciones" },
  { id: "arrays-objetos", label: "4. Arrays y Objetos" },
  { id: "dom", label: "5. DOM" },
  { id: "async", label: "6. Asincronía" },
  { id: "es6plus", label: "7. ES6+" },
  { id: "proyecto-final", label: "Proyecto Final" },
  { id: "ejercicios", label: "Ejercicios" },
];

import {
  BlogH2,
  BlogH3,
  BlogP,
  BlogCode,
  BlogCallout,
} from "@/components/blog/shared";

// ── Exercise Card ──────────────────────────────────────────────────────────────
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
          <span className="w-6 h-6 rounded-full bg-yellow-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
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
            <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded-xl px-3 py-2 text-xs text-yellow-800 dark:text-yellow-300">
              <strong>Pista:</strong> {hint}
            </div>
          )}
          {solution && <BlogCode>{solution}</BlogCode>}
        </div>
      )}
    </div>
  );
}

function SEjercicios() {
  return (
    <>
      <BlogH2>Ejercicios de JavaScript</BlogH2>
      <BlogP>
        Practica lo aprendido con estos ejercicios progresivos. Intenta
        resolverlos por tu cuenta antes de mirar la solución.
      </BlogP>
      <div className="space-y-3 mt-6">
        <ExerciseCard
          description="Crea una función calculadora que acepte dos números y un operador (+, -, *, /) y devuelva el resultado. Maneja la división por cero."
          hint="Usa un switch/case para el operador y devuelve null si el operador no es válido."
          level="Básico"
          num={1}
          solution={`function calculadora(a, b, operador) {
  switch (operador) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? null : a / b;
    default:  return null;
  }
}

console.log(calculadora(10, 2, "/"));  // 5
console.log(calculadora(5, 0, "/"));   // null`}
          title="Calculadora básica"
        />

        <ExerciseCard
          description="Dado un array de números, devuelve un nuevo array con solo los pares multiplicados por 2. Usa filter() y map()."
          hint="Encadena .filter(n => n % 2 === 0).map(n => n * 2)"
          level="Básico"
          num={2}
          solution={`const numeros = [1, 2, 3, 4, 5, 6, 7, 8];

const resultado = numeros
  .filter(n => n % 2 === 0)
  .map(n => n * 2);

console.log(resultado); // [4, 8, 12, 16]`}
          title="Filtrar y transformar arrays"
        />

        <ExerciseCard
          description="Crea una función que reciba un string y devuelva un objeto con el conteo de cada palabra. Ignora mayúsculas/minúsculas."
          hint="Usa split(' '), reduce() y toLowerCase() para construir el objeto."
          level="Básico"
          num={3}
          solution={`function contarPalabras(texto) {
  return texto.toLowerCase().split(/\\s+/).reduce((acc, palabra) => {
    acc[palabra] = (acc[palabra] || 0) + 1;
    return acc;
  }, {});
}

console.log(contarPalabras("hola mundo hola JS"));
// { hola: 2, mundo: 1, js: 1 }`}
          title="Contador de palabras"
        />

        <ExerciseCard
          description="Simula una llamada a API que obtiene un usuario por ID y luego sus posts. Usa async/await y maneja errores con try/catch."
          hint="Crea dos funciones que devuelvan Promises y encadénalas con await."
          level="Intermedio"
          num={4}
          solution={`async function getUsuario(id) {
  // Simula llamada API
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, nombre: "Ana" }), 100);
  });
}

async function getPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve([{ id: 1, titulo: "Post de Ana" }]), 100);
  });
}

async function cargarDatos(userId) {
  try {
    const usuario = await getUsuario(userId);
    const posts = await getPosts(usuario.id);
    console.log(usuario.nombre, posts.length + " posts");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

cargarDatos(1);`}
          title="Promesas encadenadas"
        />

        <ExerciseCard
          description="Implementa un EventEmitter básico usando clases ES6 con métodos on(evento, callback), emit(evento, datos) y off(evento, callback)."
          hint="Usa un Map donde la clave es el nombre del evento y el valor es un array de callbacks."
          level="Avanzado"
          num={5}
          solution={`class EventEmitter {
  constructor() {
    this.eventos = new Map();
  }

  on(evento, callback) {
    if (!this.eventos.has(evento)) {
      this.eventos.set(evento, []);
    }
    this.eventos.get(evento).push(callback);
    return this;
  }

  off(evento, callback) {
    if (!this.eventos.has(evento)) return;
    const cbs = this.eventos.get(evento).filter(cb => cb !== callback);
    this.eventos.set(evento, cbs);
  }

  emit(evento, datos) {
    if (!this.eventos.has(evento)) return;
    this.eventos.get(evento).forEach(cb => cb(datos));
  }
}

const emitter = new EventEmitter();
const handler = (d) => console.log("Recibido:", d);

emitter.on("mensaje", handler);
emitter.emit("mensaje", { texto: "Hola!" }); // Recibido: {texto: 'Hola!'}
emitter.off("mensaje", handler);
emitter.emit("mensaje", { texto: "Ya no llega" }); // (nada)`}
          title="Observer pattern con clases ES6"
        />
      </div>
    </>
  );
}

// ── Sections ───────────────────────────────────────────────────────────────────
function SectionIntro() {
  return (
    <>
      <BlogH2>Introducción a JavaScript</BlogH2>
      <BlogP>
        JavaScript es el único lenguaje de programación nativo del navegador
        web. Junto con HTML y CSS forma la trinidad del desarrollo frontend,
        pero también se ejecuta en el servidor gracias a Node.js.
      </BlogP>
      <BlogP>
        Es un lenguaje interpretado, de tipado dinámico y multiparadigma:
        soporta programación imperativa, orientada a objetos y funcional.
      </BlogP>
      <BlogCode>{`// Tu primer programa JavaScript
console.log("¡Hola, mundo!");

// Variables
let nombre = "Ana";
const edad = 28;
console.log(\`Hola, \${nombre}. Tienes \${edad} años.\`);`}</BlogCode>
      <BlogCallout type="tip">
        Abre las DevTools del navegador (F12) y usa la consola para ejecutar
        fragmentos de JS al instante.
      </BlogCallout>
      <BlogH3>¿Dónde se ejecuta?</BlogH3>
      <BlogP>
        En el navegador JS accede al DOM, gestiona eventos y hace peticiones
        HTTP. En Node.js accede al sistema de archivos, crea servidores HTTP y
        mucho más.
      </BlogP>
      <BlogCode>{`// En el navegador
document.title = "Mi página";
alert("¡Hola desde el navegador!");

// En Node.js
const fs = require("fs");
console.log(fs.readdirSync("."));`}</BlogCode>
    </>
  );
}

function SectionFundamentos() {
  return (
    <>
      <BlogH2>Fundamentos del lenguaje</BlogH2>
      <BlogH3>var, let y const</BlogH3>
      <BlogP>
        <code>var</code> tiene ámbito de función y se eleva (hoisting).{" "}
        <code>let</code> y <code>const</code> tienen ámbito de bloque. Prefiere
        siempre <code>const</code> y usa <code>let</code> solo cuando necesites
        reasignar.
      </BlogP>
      <BlogCode>{`var x = 1;         // ámbito función, hoisting
let y = 2;         // ámbito bloque
const PI = 3.14;   // constante, no reasignable

if (true) {
  var a = "var";   // visible fuera del bloque
  let b = "let";   // solo visible aquí
}
console.log(a); // "var"
// console.log(b); // ReferenceError`}</BlogCode>
      <BlogH3>Tipos de datos</BlogH3>
      <BlogP>
        JS tiene 7 tipos primitivos: string, number, boolean, null, undefined,
        symbol y bigint. Todo lo demás es un objeto.
      </BlogP>
      <BlogCode>{`const texto   = "Hola";          // string
const numero  = 42;              // number
const decimal = 3.14;            // number (no hay float separado)
const activo  = true;            // boolean
const nada    = null;            // null
let indefinido;                  // undefined
const grande  = 9007199254740993n; // BigInt

console.log(typeof texto);   // "string"
console.log(typeof numero);  // "number"
console.log(typeof nada);    // "object"  ← quirk histórico`}</BlogCode>
      <BlogH3>Operadores y control de flujo</BlogH3>
      <BlogCode>{`// Comparación estricta vs laxa
console.log(1 == "1");   // true  (coerción)
console.log(1 === "1");  // false (sin coerción)

// Nullish coalescing (??) y optional chaining (?.)
const usuario = null;
const nombre = usuario?.nombre ?? "Anónimo";
console.log(nombre); // "Anónimo"

// Switch
const dia = "lunes";
switch (dia) {
  case "lunes":
  case "martes":
    console.log("Día laborable");
    break;
  default:
    console.log("Fin de semana");
}`}</BlogCode>
      <BlogCallout type="warn">
        Usa siempre <code>===</code> en lugar de <code>==</code> para evitar
        comportamientos inesperados por coerción de tipos.
      </BlogCallout>
    </>
  );
}

function SectionFunciones() {
  return (
    <>
      <BlogH2>Funciones</BlogH2>
      <BlogH3>Declaración vs expresión vs arrow</BlogH3>
      <BlogP>
        Las funciones declaradas se elevan (hoisting). Las expresiones y arrows
        no. Las arrows no tienen su propio <code>this</code>.
      </BlogP>
      <BlogCode>{`// Declaración (hoisting)
function saludar(nombre) {
  return "Hola, " + nombre;
}

// Expresión
const despedir = function(nombre) {
  return "Adiós, " + nombre;
};

// Arrow function
const gritar = (texto) => texto.toUpperCase();
const sumar  = (a, b) => a + b;

console.log(saludar("Ana"));   // "Hola, Ana"
console.log(gritar("hola"));  // "HOLA"
console.log(sumar(3, 4));     // 7`}</BlogCode>
      <BlogH3>Parámetros por defecto y rest</BlogH3>
      <BlogCode>{`function saludar(nombre = "Visitante", saludo = "Hola") {
  return \`\${saludo}, \${nombre}!\`;
}

function sumarTodos(...numeros) {
  return numeros.reduce((acc, n) => acc + n, 0);
}

console.log(saludar());               // "Hola, Visitante!"
console.log(saludar("Ana", "Buenos días")); // "Buenos días, Ana!"
console.log(sumarTodos(1, 2, 3, 4));  // 10`}</BlogCode>
      <BlogH3>Closures</BlogH3>
      <BlogP>
        Un closure es una función que recuerda el ámbito en el que fue creada,
        incluso después de que ese ámbito haya terminado.
      </BlogP>
      <BlogCode>{`function crearContador() {
  let cuenta = 0;
  return {
    incrementar: () => ++cuenta,
    decrementar: () => --cuenta,
    valor: () => cuenta,
  };
}

const contador = crearContador();
contador.incrementar();
contador.incrementar();
contador.incrementar();
contador.decrementar();
console.log(contador.valor()); // 2`}</BlogCode>
      <BlogCallout type="tip">
        Los closures son la base de los módulos, los hooks de React y los
        patrones de fábrica en JS.
      </BlogCallout>
    </>
  );
}

function SectionArraysObjetos() {
  return (
    <>
      <BlogH2>Arrays y Objetos</BlogH2>
      <BlogH3>Métodos de array</BlogH3>
      <BlogP>
        Los métodos funcionales de array (<code>map</code>, <code>filter</code>,{" "}
        <code>reduce</code>) son fundamentales y no mutan el array original.
      </BlogP>
      <BlogCode>{`const nums = [1, 2, 3, 4, 5, 6];

const dobles   = nums.map(n => n * 2);
const pares    = nums.filter(n => n % 2 === 0);
const suma     = nums.reduce((acc, n) => acc + n, 0);
const primero  = nums.find(n => n > 3);
const todos    = nums.every(n => n > 0);

console.log(dobles);  // [2,4,6,8,10,12]
console.log(pares);   // [2,4,6]
console.log(suma);    // 21
console.log(primero); // 4
console.log(todos);   // true`}</BlogCode>
      <BlogH3>Objetos y destructuring</BlogH3>
      <BlogCode>{`const persona = { nombre: "Ana", edad: 28, ciudad: "Madrid" };

// Destructuring
const { nombre, edad, ciudad = "Desconocida" } = persona;
console.log(nombre); // "Ana"

// Spread
const actualizada = { ...persona, edad: 29, pais: "España" };
console.log(actualizada);
// { nombre: "Ana", edad: 29, ciudad: "Madrid", pais: "España" }

// Destructuring en parámetros
function mostrar({ nombre, edad }) {
  return \`\${nombre} tiene \${edad} años\`;
}
console.log(mostrar(persona)); // "Ana tiene 28 años"`}</BlogCode>
      <BlogH3>Encadenamiento de métodos</BlogH3>
      <BlogCode>{`const productos = [
  { nombre: "Manzana", precio: 1.2, categoria: "fruta" },
  { nombre: "Pan",     precio: 0.8, categoria: "pan" },
  { nombre: "Pera",    precio: 1.5, categoria: "fruta" },
];

const totalFrutas = productos
  .filter(p => p.categoria === "fruta")
  .map(p => p.precio)
  .reduce((acc, p) => acc + p, 0);

console.log(totalFrutas.toFixed(2)); // "2.70"`}</BlogCode>
    </>
  );
}

function SectionDom() {
  return (
    <>
      <BlogH2>Manipulación del DOM</BlogH2>
      <BlogH3>Selectores</BlogH3>
      <BlogCode>{`// Seleccionar elementos
const titulo    = document.getElementById("titulo");
const botones   = document.querySelectorAll(".btn");
const primero   = document.querySelector("h1");

// Modificar contenido y estilos
titulo.textContent = "Nuevo título";
titulo.style.color = "blue";
titulo.classList.add("activo");
titulo.classList.toggle("oculto");

// Crear e insertar elementos
const li = document.createElement("li");
li.textContent = "Nuevo ítem";
document.querySelector("ul").appendChild(li);`}</BlogCode>
      <BlogH3>Eventos</BlogH3>
      <BlogP>
        Los eventos permiten reaccionar a acciones del usuario. Usa{" "}
        <code>addEventListener</code> en lugar de atributos HTML como{" "}
        <code>onclick</code>.
      </BlogP>
      <BlogCode>{`const boton = document.querySelector("#miBoton");

boton.addEventListener("click", (evento) => {
  evento.preventDefault(); // evita comportamiento por defecto
  console.log("Botón clickado", evento.target);
});

// Delegación de eventos (más eficiente)
document.querySelector("ul").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("completado");
  }
});

// Evento de formulario
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const datos = new FormData(e.target);
  console.log(Object.fromEntries(datos));
});`}</BlogCode>
      <BlogCallout type="tip">
        La delegación de eventos adjunta un solo listener al padre en lugar de
        uno por cada hijo. Es más eficiente con listas dinámicas.
      </BlogCallout>
    </>
  );
}

function SectionAsync() {
  return (
    <>
      <BlogH2>Asincronía en JavaScript</BlogH2>
      <BlogH3>Promises</BlogH3>
      <BlogP>
        Una Promise representa un valor que puede estar disponible ahora, en el
        futuro o nunca. Tiene tres estados: pending, fulfilled y rejected.
      </BlogP>
      <BlogCode>{`const promesa = new Promise((resolve, reject) => {
  setTimeout(() => {
    const exito = Math.random() > 0.5;
    if (exito) resolve("¡Éxito!");
    else reject(new Error("Algo salió mal"));
  }, 1000);
});

promesa
  .then(resultado => console.log(resultado))
  .catch(error => console.error(error.message))
  .finally(() => console.log("Terminó (éxito o error)"));`}</BlogCode>
      <BlogH3>async / await</BlogH3>
      <BlogP>
        <code>async/await</code> es azúcar sintáctico sobre Promises. Hace que
        el código asíncrono sea más legible y parezca síncrono.
      </BlogP>
      <BlogCode>{`async function obtenerUsuario(id) {
  try {
    const res = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    const usuario = await res.json();
    return usuario;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

// Llamadas en paralelo con Promise.all
async function obtenerVariosUsuarios() {
  const [u1, u2] = await Promise.all([
    obtenerUsuario(1),
    obtenerUsuario(2),
  ]);
  console.log(u1.name, u2.name);
}`}</BlogCode>
      <BlogCallout type="warn">
        Siempre envuelve <code>await</code> en un bloque <code>try/catch</code>{" "}
        para manejar errores de red o del servidor.
      </BlogCallout>
    </>
  );
}

function SectionEs6Plus() {
  return (
    <>
      <BlogH2>ES6 y características modernas</BlogH2>
      <BlogH3>Módulos (ESM)</BlogH3>
      <BlogCode>{`// utils.js
export const PI = 3.14159;
export function circunferencia(r) { return 2 * PI * r; }
export default function saludar(nombre) { return \`Hola, \${nombre}\`; }

// main.js
import saludar, { PI, circunferencia } from "./utils.js";
console.log(saludar("Ana"));
console.log(circunferencia(5));`}</BlogCode>
      <BlogH3>Clases</BlogH3>
      <BlogCode>{`class Animal {
  #nombre; // campo privado (ES2022)
  constructor(nombre, sonido) {
    this.#nombre = nombre;
    this.sonido = sonido;
  }
  hablar() { return \`\${this.#nombre} dice \${this.sonido}\`; }
  get nombre() { return this.#nombre; }
}

class Perro extends Animal {
  constructor(nombre) { super(nombre, "¡Guau!"); }
  buscar(objeto) { return \`\${this.nombre} busca \${objeto}\`; }
}

const perro = new Perro("Rex");
console.log(perro.hablar()); // "Rex dice ¡Guau!"
console.log(perro.buscar("la pelota"));`}</BlogCode>
      <BlogH3>Spread, rest y otras utilidades</BlogH3>
      <BlogCode>{`// Spread en arrays y objetos
const a = [1, 2, 3];
const b = [...a, 4, 5]; // [1,2,3,4,5]
const obj1 = { x: 1 };
const obj2 = { ...obj1, y: 2 }; // {x:1, y:2}

// Optional chaining y nullish coalescing
const config = { db: { host: "localhost" } };
const port = config?.db?.port ?? 5432;
console.log(port); // 5432

// Logical assignment
let valor = null;
valor ??= "por defecto";
console.log(valor); // "por defecto"`}</BlogCode>
    </>
  );
}

function SectionProyecto() {
  return (
    <>
      <BlogH2>Proyecto Final: App del Tiempo</BlogH2>
      <BlogP>
        Construimos una mini aplicación del tiempo usando la API de Open-Meteo
        (gratuita, sin clave). Muestra temperatura actual, descripción y un
        icono según las condiciones.
      </BlogP>
      <BlogCode>{`// weather-app.js - App del tiempo con Fetch API

const WMO_CODES = {
  0: "☀️ Despejado", 1: "🌤️ Mayormente despejado",
  2: "⛅ Parcialmente nublado", 3: "☁️ Nublado",
  61: "🌧️ Lluvia leve", 63: "🌧️ Lluvia moderada",
  80: "🌦️ Chubascos", 95: "⛈️ Tormenta",
};

async function obtenerCoordenadas(ciudad) {
  const url = \`https://geocoding-api.open-meteo.com/v1/search?name=\${encodeURIComponent(ciudad)}&count=1\`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.results?.length) throw new Error("Ciudad no encontrada");
  return { lat: data.results[0].latitude, lon: data.results[0].longitude, nombre: data.results[0].name };
}

async function obtenerTiempo(lat, lon) {
  const url = \`https://api.open-meteo.com/v1/forecast?latitude=\${lat}&longitude=\${lon}&current_weather=true\`;
  const res = await fetch(url);
  const data = await res.json();
  return data.current_weather;
}

async function mostrarTiempo(ciudad) {
  const loading = document.querySelector("#loading");
  const resultado = document.querySelector("#resultado");
  loading.classList.remove("oculto");
  resultado.innerHTML = "";

  try {
    const { lat, lon, nombre } = await obtenerCoordenadas(ciudad);
    const tiempo = await obtenerTiempo(lat, lon);
    const descripcion = WMO_CODES[tiempo.weathercode] ?? "🌡️ Condición desconocida";

    resultado.innerHTML = \`
      <h2>\${nombre}</h2>
      <p class="temp">\${tiempo.temperature}°C</p>
      <p class="desc">\${descripcion}</p>
      <p class="viento">💨 Viento: \${tiempo.windspeed} km/h</p>
    \`;
  } catch (err) {
    resultado.innerHTML = \`<p class="error">Error: \${err.message}</p>\`;
  } finally {
    loading.classList.add("oculto");
  }
}

// Inicialización
document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  const ciudad = document.querySelector("#ciudad").value.trim();
  if (ciudad) mostrarTiempo(ciudad);
});

// Cargar ciudad por defecto
mostrarTiempo("Madrid");`}</BlogCode>
      <BlogCode>{`<!-- index.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>App del Tiempo</title>
</head>
<body>
  <form id="form">
    <input id="ciudad" placeholder="Escribe una ciudad..." />
    <button type="submit">Buscar</button>
  </form>
  <p id="loading" class="oculto">Cargando...</p>
  <div id="resultado"></div>
  <script type="module" src="weather-app.js"></script>
</body>
</html>`}</BlogCode>
      <BlogCallout type="tip">
        La API de Open-Meteo es 100% gratuita y no requiere registro. Perfecta
        para proyectos de práctica.
      </BlogCallout>
    </>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function JavaScriptContent() {
  const [active, setActive] = useState<SectionId>(SECTIONS[0].id);

  const renderSection = () => {
    switch (active) {
      case "intro":
        return <SectionIntro />;
      case "fundamentos":
        return <SectionFundamentos />;
      case "funciones":
        return <SectionFunciones />;
      case "arrays-objetos":
        return <SectionArraysObjetos />;
      case "dom":
        return <SectionDom />;
      case "async":
        return <SectionAsync />;
      case "es6plus":
        return <SectionEs6Plus />;
      case "proyecto-final":
        return <SectionProyecto />;
      case "ejercicios":
        return <SEjercicios />;
    }
  };

  return (
    <div className="flex gap-6">
      <nav className="hidden lg:flex flex-col gap-0.5 w-44 flex-shrink-0 sticky top-20 self-start">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={`text-left text-xs px-3 py-1.5 rounded-lg transition-colors ${active === s.id ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-semibold" : "text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"}`}
            onClick={() => setActive(s.id)}
          >
            {s.label}
          </button>
        ))}
      </nav>
      <div className="flex-1 min-w-0 prose-custom">{renderSection()}</div>
    </div>
  );
}
