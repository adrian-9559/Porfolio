import type { Challenge } from "@/types/challenges";

export const challenges: Challenge[] = [
  // ── Fundamentos de JavaScript ──────────────────────────────────────────────
  {
    id: "js-variables",
    slug: "js-variables",
    title: "Variables y constantes",
    description:
      "Aprende a declarar variables con let, const y var. Entiende la diferencia entre mutabilidad e inmutabilidad.",
    narrative:
      "Bienvenido al mundo de la programación. Tu primera misión es entender cómo almacenar datos en JavaScript. Las variables son como cajas que guardan información que tu programa necesita recordar.",
    objective:
      "Crea las variables necesarias para almacenar el nombre, edad y email de un usuario, usando los modificadores correctos.",
    difficulty: "beginner",
    category: "JavaScript",
    categoryColor: "bg-amber-500",
    xpReward: 50,
    estimatedMinutes: 15,
    prerequisites: [],
    starterCode: `// Crea las siguientes variables:
// 1. nombre con tu nombre (const)
// 2. edad con tu edad (let)
// 3. email con tu email (const)

// No modifiques el console.log
console.log(\`Hola, soy \${nombre}, tengo \${edad} años y mi email es \${email}\`);`,
    tests: [
      {
        name: "nombre es una constante",
        input: "nombre",
        expectedOutput: "string",
        hidden: false,
      },
      {
        name: "edad es un número",
        input: "typeof edad",
        expectedOutput: "number",
        hidden: false,
      },
      {
        name: "email es una constante",
        input: "email",
        expectedOutput: "string",
        hidden: false,
      },
    ],
    planSlug: "fundamentos-javascript",
    order: 1,
    status: "available",
  },
  {
    id: "js-tipos",
    slug: "js-tipos",
    title: "Tipos de datos",
    description:
      "Conoce los tipos primitivos de JavaScript: string, number, boolean, null, undefined, symbol y bigint.",
    narrative:
      "Los datos vienen en muchas formas. Un número no es lo mismo que una palabra, y una verdad no es lo mismo que una ausencia de valor. Tu trabajo es entender cada tipo para usarlos correctamente.",
    objective:
      "Identifica y crea variables de cada tipo primitivo de JavaScript.",
    difficulty: "beginner",
    category: "JavaScript",
    categoryColor: "bg-amber-500",
    xpReward: 50,
    estimatedMinutes: 15,
    prerequisites: ["js-variables"],
    starterCode: `// Crea una variable de cada tipo primitivo:
// 1. texto (string)
// 2. numero (number)
// 3. decimal (number)
// 4. esActivo (boolean)
// 5. vacio (null)
// 6. indefinido (undefined)

// Test: imprime el tipo de cada una
const tipos = [typeof texto, typeof numero, typeof decimal, typeof esActivo, typeof vacio, typeof indefinido];
console.log(tipos); // ["string", "number", "number", "boolean", "object", "undefined"]`,
    tests: [
      {
        name: "texto es un string",
        input: "typeof texto",
        expectedOutput: "string",
        hidden: false,
      },
      {
        name: "numero es un number",
        input: "typeof numero",
        expectedOutput: "number",
        hidden: false,
      },
      {
        name: "esActivo es un boolean",
        input: "typeof esActivo",
        expectedOutput: "boolean",
        hidden: false,
      },
    ],
    planSlug: "fundamentos-javascript",
    order: 2,
    status: "locked",
  },
  {
    id: "js-operadores",
    slug: "js-operadores",
    title: "Operadores",
    description:
      "Domina los operadores aritméticos, de comparación, lógicos y de asignación de JavaScript.",
    narrative:
      "Los operadores son las herramientas que transforman datos. Sumar, comparar, tomar decisiones... todo se reduce a operaciones fundamentales.",
    objective:
      "Resuelve una serie de expresiones usando el operador correcto para cada caso.",
    difficulty: "beginner",
    category: "JavaScript",
    categoryColor: "bg-amber-500",
    xpReward: 60,
    estimatedMinutes: 20,
    prerequisites: ["js-tipos"],
    starterCode: `// Resuelve cada expresión usando el operador correcto:

const a = 10;
const b = 3;

// 1. suma: resultado debe ser 13
const suma = a __ b;

// 2. resta: resultado debe ser 7
const resta = a __ b;

// 3. multiplicación: resultado debe ser 30
const multiplicacion = a __ b;

// 4. módulo: resultado debe ser 1
const modulo = a __ b;

// 5. igualdad estricta: ¿a es igual a "10"?
const igualdadEstricta = a __ "10";

// 6. OR lógico: ¿a es mayor que b O a es igual a 10?
const orLogico = a __ b __ a __ 10;

console.log(suma, resta, multiplicacion, modulo, igualdadEstricta, orLogico);`,
    tests: [
      {
        name: "suma es 13",
        input: "suma",
        expectedOutput: "13",
        hidden: false,
      },
      {
        name: "resta es 7",
        input: "resta",
        expectedOutput: "7",
        hidden: false,
      },
      {
        name: "igualdad estricta es false",
        input: "igualdadEstricta",
        expectedOutput: "false",
        hidden: false,
      },
    ],
    planSlug: "fundamentos-javascript",
    order: 3,
    status: "locked",
  },
  {
    id: "js-strings",
    slug: "js-strings",
    title: "Strings y plantillas",
    description:
      "Trabaja con cadenas de texto: métodos de string, template literals y manipulación de texto.",
    narrative:
      "El texto es el formato más universal de datos. Aprender a manipular strings te permitirá mostrar información, validar entradas y transformar datos de cualquier tipo.",
    objective:
      "Manipula cadenas de texto usando métodos nativos y template literals.",
    difficulty: "beginner",
    category: "JavaScript",
    categoryColor: "bg-amber-500",
    xpReward: 60,
    estimatedMinutes: 20,
    prerequisites: ["js-variables"],
    starterCode: `const nombre = "Adrián";
const lenguaje = "JavaScript";

// 1. Convierte nombre a mayúsculas
const mayusculas = nombre.toUpperCase();

// 2. Crea un saludo con template literal
const saludo = \`¡Hola \${nombre}, enseñame \${lenguaje}!\`;

// 3. Cuenta cuántas letras tiene el nombre
const letras = nombre.length;

// 4. Extrae los primeros 3 caracteres
const prefijo = nombre.substring(0, 3);

// 5. Reemplaza "JavaScript" por "TypeScript"
const reemplazo = saludo.replace("JavaScript", "TypeScript");

console.log(mayusculas, saludo, letras, prefijo, reemplazo);`,
    tests: [
      {
        name: "mayusculas es ADRIÁN",
        input: "mayusculas",
        expectedOutput: "ADRIÁN",
        hidden: false,
      },
      {
        name: "letras es 6",
        input: "letras",
        expectedOutput: "6",
        hidden: false,
      },
      {
        name: "reemplazo contiene TypeScript",
        input: 'reemplazo.includes("TypeScript")',
        expectedOutput: "true",
        hidden: false,
      },
    ],
    planSlug: "fundamentos-javascript",
    order: 4,
    status: "locked",
  },
  {
    id: "js-arrays",
    slug: "js-arrays",
    title: "Arrays básicos",
    description:
      "Crea y manipula arrays: push, pop, shift, unshift, slice, splice y más.",
    narrative:
      "Los arrays son listas ordenadas de elementos. Son una de las estructuras de datos más usadas en programación. Aprender a manipularlos es esencial para cualquier desarrollador.",
    objective:
      "Implementa funciones que manipulen arrays usando los métodos nativos.",
    difficulty: "beginner",
    category: "JavaScript",
    categoryColor: "bg-amber-500",
    xpReward: 70,
    estimatedMinutes: 25,
    prerequisites: ["js-tipos"],
    starterCode: `const frutas = ["manzana", "plátano", "naranja"];

// 1. Agrega "uva" al final
frutas.push("uva");

// 2. Elimina el último elemento
const ultimo = frutas.pop();

// 3. Agrega "fresa" al inicio
frutas.unshift("fresa");

// 4. Elimina el primer elemento
const primero = frutas.shift();

// 5. Crea un sub-array del índice 1 al 3
const subArray = frutas.slice(1, 3);

// 6. Busca el índice de "naranja"
const indice = frutas.indexOf("naranja");

console.log(frutas, ultimo, primero, subArray, indice);`,
    tests: [
      {
        name: "frutas tiene 3 elementos",
        input: "frutas.length",
        expectedOutput: "3",
        hidden: false,
      },
      {
        name: "ultimo es uva",
        input: "ultimo",
        expectedOutput: "uva",
        hidden: false,
      },
      {
        name: "primero es manzana",
        input: "primero",
        expectedOutput: "manzana",
        hidden: false,
      },
    ],
    planSlug: "fundamentos-javascript",
    order: 5,
    status: "locked",
  },
  {
    id: "js-objetos",
    slug: "js-objetos",
    title: "Objetos",
    description:
      "Crea objetos, accede a propiedades, usa destructuring y métodos de objetos.",
    narrative:
      "Los objetos son la estructura fundamental de JavaScript. Todo en JS es un objeto (o puede ser tratado como uno). Dominarlos es clave para entender el lenguaje.",
    objective:
      "Crea y manipula objetos usando sintaxis moderna de ES6+.",
    difficulty: "beginner",
    category: "JavaScript",
    categoryColor: "bg-amber-500",
    xpReward: 70,
    estimatedMinutes: 25,
    prerequisites: ["js-variables", "js-tipos"],
    starterCode: `// Crea un objeto usuario con las siguientes propiedades:
const usuario = {
  // nombre: "Adrián"
  // edad: 25
  // email: "adrian@ejemplo.com"
  // activo: true
  // direccion: { ciudad: "Madrid", pais: "España" }
};

// 1. Destructuring: extrae nombre y email
const { nombre, email } = usuario;

// 2. Spread: crea una copia con edad actualizada
const usuarioActualizado = { ...usuario, edad: 26 };

// 3. Agrega un método saludar
usuario.saludar = function() {
  return \`Hola, soy \${this.nombre} de \${this.direccion.ciudad}\`;
};

console.log(nombre, email, usuarioActualizado.edad, usuario.saludar());`,
    tests: [
      {
        name: "usuario tiene nombre",
        input: "usuario.nombre",
        expectedOutput: "Adrián",
        hidden: false,
      },
      {
        name: "usuario tiene direccion.ciudad",
        input: "usuario.direccion.ciudad",
        expectedOutput: "Madrid",
        hidden: false,
      },
      {
        name: "saludar funciona",
        input: 'usuario.saludar()',
        expectedOutput: "Hola, soy Adrián de Madrid",
        hidden: false,
      },
    ],
    planSlug: "fundamentos-javascript",
    order: 6,
    status: "locked",
  },
  {
    id: "js-funciones",
    slug: "js-funciones",
    title: "Funciones",
    description:
      "Declara funciones con function, arrow functions, parámetros por defecto y retorno implícito.",
    narrative:
      "Las funciones son bloques de código reutilizables. Son la base de la programación modular y te permiten organizar tu código en partes lógicas y reutilizables.",
    objective:
      "Implementa diferentes tipos de funciones y entiende cuándo usar cada una.",
    difficulty: "beginner",
    category: "JavaScript",
    categoryColor: "bg-amber-500",
    xpReward: 80,
    estimatedMinutes: 30,
    prerequisites: ["js-variables", "js-tipos"],
    starterCode: `// 1. Función tradicional
function sumar(a, b) {
  return a + b;
}

// 2. Arrow function con retorno implícito
const multiplicar = (a, b) => a * b;

// 3. Arrow function con parámetro por defecto
const saludar = (nombre = "Mundo") => \`¡Hola, \${nombre}!\`;

// 4. Función que retorna objeto
const crearUsuario = (nombre, edad) => ({ nombre, edad });

// 5. Función con ...rest
const sumarTodos = (...numeros) => numeros.reduce((a, b) => a + b, 0);

console.log(sumar(5, 3));
console.log(multiplicar(4, 7));
console.log(saludar());
console.log(saludar("Adrián"));
console.log(crearUsuario("Ana", 22));
console.log(sumarTodos(1, 2, 3, 4, 5));`,
    tests: [
      {
        name: "sumar(5,3) es 8",
        input: "sumar(5, 3)",
        expectedOutput: "8",
        hidden: false,
      },
      {
        name: "multiplicar(4,7) es 28",
        input: "multiplicar(4, 7)",
        expectedOutput: "28",
        hidden: false,
      },
      {
        name: "saludar() usa valor por defecto",
        input: "saludar()",
        expectedOutput: "¡Hola, Mundo!",
        hidden: false,
      },
    ],
    planSlug: "fundamentos-javascript",
    order: 7,
    status: "locked",
  },
  // ── React ──────────────────────────────────────────────────────────────────
  {
    id: "react-componentes",
    slug: "react-componentes",
    title: "Componentes React",
    description:
      "Crea tu primer componente React. Entiende JSX, la estructura de un componente y cómo renderizarlo.",
    narrative:
      "React cambia la forma en que construimos interfaces. En lugar de manipular el DOM directamente, declaramos cómo debería verse la UI para cada estado. Los componentes son las piezas de este rompecabezas.",
    objective:
      "Crea un componente que muestre una tarjeta de perfil con nombre, foto y biografía.",
    difficulty: "beginner",
    category: "React",
    categoryColor: "bg-cyan-500",
    xpReward: 80,
    estimatedMinutes: 20,
    prerequisites: [],
    starterCode: `import React from 'react';

// Crea un componente TarjetaPerfil que reciba:
// - nombre (string)
// - foto (string - URL)
// - biografia (string)
//
// Debe renderizar:
// - Una imagen con la foto
// - Un h2 con el nombre
// - Un p con la biografía
// - Un contenedor con clase "tarjeta"

function TarjetaPerfil({ nombre, foto, biografia }) {
  // Tu código aquí
}

export default TarjetaPerfil;`,
    tests: [
      {
        name: "el componente existe",
        input: "typeof TarjetaPerfil",
        expectedOutput: "function",
        hidden: false,
      },
      {
        name: "renderiza el nombre",
        input: "nombre",
        expectedOutput: "string",
        hidden: false,
      },
    ],
    planSlug: "react-desde-cero",
    order: 1,
    status: "available",
  },
  {
    id: "react-props",
    slug: "react-props",
    title: "Props y flujo de datos",
    description:
      "Entiende cómo fluyen los datos en React a través de props. Validación con PropTypes y valores por defecto.",
    narrative:
      "En React, los datos fluyen hacia abajo: de padre a hijo. Las props son la forma en que un componente recibe información del mundo exterior. Son inmutables — un componente nunca debe modificar sus propias props.",
    objective:
      "Crea un componente que use props correctamente con valores por defecto y validación.",
    difficulty: "beginner",
    category: "React",
    categoryColor: "bg-cyan-500",
    xpReward: 80,
    estimatedMinutes: 25,
    prerequisites: ["react-componentes"],
    starterCode: `import React from 'react';

// Crea un componente Boton que reciba:
// - texto (string, requerido)
// - variante: "primario" | "secundario" | "peligro" (default: "primario")
// - deshabilitado (boolean, default: false)
// - onClick (function)
//
// El componente debe:
// 1. Aplicar estilos diferentes según la variante
// 2. Usar el valor por defecto si no se pasa variante
// 3. No ser clickeable si deshabilitado es true

function Boton({ texto, variante = "primario", deshabilitado = false, onClick }) {
  // Tu código aquí
}

export default Boton;`,
    tests: [
      {
        name: "el componente existe",
        input: "typeof Boton",
        expectedOutput: "function",
        hidden: false,
      },
      {
        name: "tiene valor por defecto",
        input: "variante",
        expectedOutput: "primario",
        hidden: false,
      },
    ],
    planSlug: "react-desde-cero",
    order: 2,
    status: "locked",
  },
  {
    id: "react-estado",
    slug: "react-estado",
    title: "Estado con useState",
    description:
      "Gestiona el estado local de componentes con el hook useState. Entiende las actualizaciones asíncronas.",
    narrative:
      "El estado es lo que hace que tu UI sea interactiva. Cuando el estado cambia, React vuelve a renderizar el componente. useState es tu herramienta principal para manejar datos que cambian con el tiempo.",
    objective:
      "Implementa un contador y un formulario controlado usando useState.",
    difficulty: "beginner",
    category: "React",
    categoryColor: "bg-cyan-500",
    xpReward: 90,
    estimatedMinutes: 30,
    prerequisites: ["react-componentes", "react-props"],
    starterCode: `import React, { useState } from 'react';

// Crea un componente Contador que:
// 1. Muestre el valor actual del contador
// 2. Tenga botones de + y -
// 3. Tenga un botón de reset que ponga el contador a 0
// 4. Use useState para manejar el estado

function Contador() {
  // Tu código aquí
}

// Crea un componente Formulario que:
// 1. Tenga campos controlados para nombre y email
// 2. Muestre los valores en tiempo real
// 3. Tenga un botón que muestre un alert con los datos

function Formulario() {
  // Tu código aquí
}

export { Contador, Formulario };`,
    tests: [
      {
        name: "Contador existe",
        input: "typeof Contador",
        expectedOutput: "function",
        hidden: false,
      },
      {
        name: "Formulario existe",
        input: "typeof Formulario",
        expectedOutput: "function",
        hidden: false,
      },
    ],
    planSlug: "react-desde-cero",
    order: 3,
    status: "locked",
  },
  {
    id: "react-eventos",
    slug: "react-eventos",
    title: "Eventos en React",
    description:
      "Maneja eventos de usuario: clicks, inputs, formularios. Entiende la sintaxis de eventos de React.",
    narrative:
      "La interacción del usuario es el corazón de cualquier aplicación web. Los eventos de React te permiten responder a clicks, teclas, envíos de formulario y más de forma declarativa.",
    objective:
      "Crea un componente que responda a múltiples eventos de usuario.",
    difficulty: "beginner",
    category: "React",
    categoryColor: "bg-cyan-500",
    xpReward: 80,
    estimatedMinutes: 25,
    prerequisites: ["react-estado"],
    starterCode: `import React, { useState } from 'react';

// Crea un componente Buscador que:
// 1. Tenga un input de búsqueda
// 2. Filtre una lista de items según el texto ingresado
// 3. Muestre los resultados en tiempo real
// 4. Tenga un botón para limpiar la búsqueda
// 5. Use useEffect para actualizar los resultados

function Buscador({ items = [] }) {
  // Tu código aquí
}

export default Buscador;`,
    tests: [
      {
        name: "el componente existe",
        input: "typeof Buscador",
        expectedOutput: "function",
        hidden: false,
      },
    ],
    planSlug: "react-desde-cero",
    order: 4,
    status: "locked",
  },
  // ── Node.js Backend ────────────────────────────────────────────────────────
  {
    id: "node-express-basico",
    slug: "node-express-basico",
    title: "Express básico",
    description:
      "Crea tu primer servidor con Express. Rutas, middlewares y respuestas HTTP.",
    narrative:
      "Un servidor backend es el cerebro de tu aplicación. Recibe peticiones del cliente, procesa datos y devuelve respuestas. Express hace que crear servidores en Node.js sea simple y elegante.",
    objective:
      "Crea un servidor Express con rutas para CRUD de usuarios.",
    difficulty: "intermediate",
    category: "Node.js",
    categoryColor: "bg-green-500",
    xpReward: 100,
    estimatedMinutes: 30,
    prerequisites: [],
    starterCode: `const express = require('express');
const app = express();

app.use(express.json());

// Simula una base de datos en memoria
let usuarios = [
  { id: 1, nombre: 'Ana', email: 'ana@ejemplo.com' },
  { id: 2, nombre: 'Bob', email: 'bob@ejemplo.com' },
];

// Crea las siguientes rutas:
// GET /usuarios - retorna todos los usuarios
// GET /usuarios/:id - retorna un usuario por id
// POST /usuarios - crea un nuevo usuario
// PUT /usuarios/:id - actualiza un usuario
// DELETE /usuarios/:id - elimina un usuario

// Tu código aquí

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Servidor en puerto \${PORT}\`));

module.exports = app;`,
    tests: [
      {
        name: "app es una función",
        input: "typeof app",
        expectedOutput: "function",
        hidden: false,
      },
      {
        name: "usuarios es un array",
        input: "Array.isArray(usuarios)",
        expectedOutput: "true",
        hidden: false,
      },
    ],
    planSlug: "nodejs-backend",
    order: 1,
    status: "available",
  },
  // ── Python para IA ─────────────────────────────────────────────────────────
  {
    id: "python-basics",
    slug: "python-basics",
    title: "Python básico",
    description:
      "Variables, tipos, condicionales y bucles en Python. La base para todo lo que viene.",
    narrative:
      "Python es el lenguaje de la inteligencia artificial. Su sintaxis limpia y legible lo hacen perfecto para empezar a programar y para construir sistemas de IA complejos.",
    objective:
      "Implementa las estructuras básicas de Python: variables, condicionales, bucles y funciones.",
    difficulty: "beginner",
    category: "Python",
    categoryColor: "bg-violet-500",
    xpReward: 70,
    estimatedMinutes: 25,
    prerequisites: [],
    starterCode: `# Python Básico
# Resuelve cada ejercicio

# 1. Variables
nombre = "Adrián"  # Tu nombre
edad = 25          # Tu edad
es_estudiante = True

# 2. Condicional: imprime "Mayor de edad" o "Menor de edad"
if edad >= 18:
    print("Mayor de edad")
else:
    print("Menor de edad")

# 3. Bucle: imprime los números del 1 al 10
for i in range(1, 11):
    print(i)

# 4. Función que retorne el cuadrado de un número
def cuadrado(n):
    return n ** 2

# 5. Lista de compras
compras = ["leche", "huevos", "pan", "queso"]
compras.append("manzana")
compras.remove("pan")

print(f"Nombre: {nombre}, Edad: {edad}")
print(f"Cuadrado de 5: {cuadrado(5)}")
print(f"Compras: {compras}")`,
    tests: [
      {
        name: "nombre es un string",
        input: "type(nombre).__name__",
        expectedOutput: "str",
        hidden: false,
      },
      {
        name: "cuadrado funciona",
        input: "cuadrado(5)",
        expectedOutput: "25",
        hidden: false,
      },
    ],
    planSlug: "python-para-ia",
    order: 1,
    status: "available",
  },
];

export function getChallenge(slug: string): Challenge | undefined {
  return challenges.find((c) => c.slug === slug);
}

export function getChallengesByPlan(planSlug: string): Challenge[] {
  return challenges
    .filter((c) => c.planSlug === planSlug)
    .sort((a, b) => a.order - b.order);
}

export function getAvailableChallenges(): Challenge[] {
  return challenges.filter((c) => c.status === "available");
}

export function getTotalChallenges(): number {
  return challenges.length;
}
