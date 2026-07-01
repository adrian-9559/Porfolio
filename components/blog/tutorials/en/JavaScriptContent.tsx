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
  { id: "intro", label: "1. Introduction" },
  { id: "fundamentos", label: "2. Fundamentals" },
  { id: "funciones", label: "3. Functions" },
  { id: "arrays-objetos", label: "4. Arrays & Objects" },
  { id: "dom", label: "5. DOM" },
  { id: "async", label: "6. Async" },
  { id: "es6plus", label: "7. ES6+" },
  { id: "proyecto-final", label: "Final Project" },
  { id: "ejercicios", label: "Exercises" },
];

import {
  BlogH2,
  BlogH3,
  BlogP,
  BlogCode,
  BlogCallout,
} from "@/components/blog/shared";

// Exercise Card
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
    "Básico":
      "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
    "Intermedio":
      "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
    "Avanzado": "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
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
          <span className="text-[#aeaeb2] text-xs">{open ? "\u25b2" : "\u25bc"}</span>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-black/8 dark:border-white/8 pt-3 space-y-3">
          <p className="text-sm text-[#3a3a3c] dark:text-[#aeaeb2]">
            {description}
          </p>
          {hint && (
            <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded-xl px-3 py-2 text-xs text-yellow-800 dark:text-yellow-300">
              <strong>Hint:</strong> {hint}
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
      <BlogH2>JavaScript Exercises</BlogH2>
      <BlogP>
        Practice what you've learned with these progressive exercises. Try
        to solve them on your own before looking at the solution.
      </BlogP>
      <div className="space-y-3 mt-6">
        <ExerciseCard
          description="Create a calculator function that takes two numbers and an operator (+, -, *, /) and returns the result. Handle division by zero."
          hint="Use a switch/case for the operator and return null if the operator is invalid."
          level="Básico"
          num={1}
          solution={`function calculator(a, b, operator) {
  switch (operator) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? null : a / b;
    default:  return null;
  }
}

console.log(calculator(10, 2, "/"));  // 5
console.log(calculator(5, 0, "/"));   // null`}
          title="Basic calculator"
        />

        <ExerciseCard
          description="Given an array of numbers, return a new array with only the even numbers multiplied by 2. Use filter() and map()."
          hint="Chain .filter(n => n % 2 === 0).map(n => n * 2)"
          level="Básico"
          num={2}
          solution={`const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

const result = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2);

console.log(result); // [4, 8, 12, 16]`}
          title="Filter and transform arrays"
        />

        <ExerciseCard
          description="Create a function that receives a string and returns an object with the count of each word. Ignore case."
          hint="Use split(' '), reduce() and toLowerCase() to build the object."
          level="Básico"
          num={3}
          solution={`function countWords(text) {
  return text.toLowerCase().split(/\s+/).reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});
}

console.log(countWords("hello world hello JS"));
// { hello: 2, world: 1, js: 1 }`}
          title="Word counter"
        />

        <ExerciseCard
          description="Simulate an API call that gets a user by ID and then their posts. Use async/await and handle errors with try/catch."
          hint="Create two functions that return Promises and chain them with await."
          level="Intermedio"
          num={4}
          solution={`async function getUser(id) {
  // Simulates API call
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, name: "Ana" }), 100);
  });
}

async function getPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve([{ id: 1, title: "Ana's Post" }]), 100);
  });
}

async function loadData(userId) {
  try {
    const user = await getUser(userId);
    const posts = await getPosts(user.id);
    console.log(user.name, posts.length + " posts");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

loadData(1);`}
          title="Chained Promises"
        />

        <ExerciseCard
          description="Implement a basic EventEmitter using ES6 classes with methods on(event, callback), emit(event, data), and off(event, callback)."
          hint="Use a Map where the key is the event name and the value is an array of callbacks."
          level="Avanzado"
          num={5}
          solution={`class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
    return this;
  }

  off(event, callback) {
    if (!this.events.has(event)) return;
    const cbs = this.events.get(event).filter(cb => cb !== callback);
    this.events.set(event, cbs);
  }

  emit(event, data) {
    if (!this.events.has(event)) return;
    this.events.get(event).forEach(cb => cb(data));
  }
}

const emitter = new EventEmitter();
const handler = (d) => console.log("Received:", d);

emitter.on("message", handler);
emitter.emit("message", { text: "Hello!" }); // Received: {text: 'Hello!'}
emitter.off("message", handler);
emitter.emit("message", { text: "Won't arrive" }); // (nothing)`}
          title="Observer pattern with ES6 classes"
        />
      </div>
    </>
  );
}

// Sections
function SectionIntro() {
  return (
    <>
      <BlogH2>Introduction to JavaScript</BlogH2>
      <BlogP>
        JavaScript is the only native programming language of the web
        browser. Together with HTML and CSS it forms the trinity of frontend development,
        but it also runs on the server thanks to Node.js.
      </BlogP>
      <BlogP>
        It is an interpreted, dynamically typed, multi-paradigm language:
        it supports imperative, object-oriented, and functional programming.
      </BlogP>
      <BlogCode>{`// Your first JavaScript program
console.log("Hello, world!");

// Variables
let name = "Ana";
const age = 28;
console.log(\`Hello, \${name}. You are \${age} years old.\`);`}</BlogCode>
      <BlogCallout type="tip">
        Open your browser's DevTools (F12) and use the console to execute
        JS snippets instantly.
      </BlogCallout>
      <BlogH3>Where does it run?</BlogH3>
      <BlogP>
        In the browser JS accesses the DOM, handles events, and makes HTTP
        requests. In Node.js it accesses the file system, creates HTTP servers, and
        much more.
      </BlogP>
      <BlogCode>{`// In the browser
document.title = "My page";
alert("Hello from the browser!");

// In Node.js
const fs = require("fs");
console.log(fs.readdirSync("."));`}</BlogCode>
    </>
  );
}

function SectionFundamentos() {
  return (
    <>
      <BlogH2>Language Fundamentals</BlogH2>
      <BlogH3>var, let and const</BlogH3>
      <BlogP>
        <code>var</code> has function scope and hoisting.{" "}
        <code>let</code> and <code>const</code> have block scope. Always prefer{" "}
        <code>const</code> and use <code>let</code> only when you need to
        reassign.
      </BlogP>
      <BlogCode>{`var x = 1;         // function scope, hoisting
let y = 2;         // block scope
const PI = 3.14;   // constant, not reassignable

if (true) {
  var a = "var";   // visible outside the block
  let b = "let";   // only visible here
}
console.log(a); // "var"
// console.log(b); // ReferenceError`}</BlogCode>
      <BlogH3>Data types</BlogH3>
      <BlogP>
        JS has 7 primitive types: string, number, boolean, null, undefined,
        symbol, and bigint. Everything else is an object.
      </BlogP>
      <BlogCode>{`const text   = "Hello";          // string
const number  = 42;              // number
const decimal = 3.14;            // number (no separate float)
const active  = true;            // boolean
const nothing    = null;            // null
let undefinedVar;                  // undefined
const big  = 9007199254740993n; // BigInt

console.log(typeof text);   // "string"
console.log(typeof number);  // "number"
console.log(typeof nothing);    // "object"  \u2190 historical quirk`}</BlogCode>
      <BlogH3>Operators and control flow</BlogH3>
      <BlogCode>{`// Strict vs loose comparison
console.log(1 == "1");   // true  (coercion)
console.log(1 === "1");  // false (no coercion)

// Nullish coalescing (??) and optional chaining (?.)
const user = null;
const name = user?.name ?? "Anonymous";
console.log(name); // "Anonymous"

// Switch
const day = "monday";
switch (day) {
  case "monday":
  case "tuesday":
    console.log("Work day");
    break;
  default:
    console.log("Weekend");
}`}</BlogCode>
      <BlogCallout type="warn">
        Always use <code>===</code> instead of <code>==</code> to avoid
        unexpected behavior from type coercion.
      </BlogCallout>
    </>
  );
}

function SectionFunciones() {
  return (
    <>
      <BlogH2>Functions</BlogH2>
      <BlogH3>Declaration vs expression vs arrow</BlogH3>
      <BlogP>
        Declared functions are hoisted. Expressions and arrows are not. Arrow functions
        don't have their own <code>this</code>.
      </BlogP>
      <BlogCode>{`// Declaration (hoisting)
function greet(name) {
  return "Hello, " + name;
}

// Expression
const farewell = function(name) {
  return "Goodbye, " + name;
};

// Arrow function
const shout = (text) => text.toUpperCase();
const sum  = (a, b) => a + b;

console.log(greet("Ana"));   // "Hello, Ana"
console.log(shout("hello"));  // "HELLO"
console.log(sum(3, 4));     // 7`}</BlogCode>
      <BlogH3>Default parameters and rest</BlogH3>
      <BlogCode>{`function greet(name = "Visitor", greeting = "Hello") {
  return \`\${greeting}, \${name}!\`;
}

function sumAll(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}

console.log(greet());               // "Hello, Visitor!"
console.log(greet("Ana", "Good morning")); // "Good morning, Ana!"
console.log(sumAll(1, 2, 3, 4));  // 10`}</BlogCode>
      <BlogH3>Closures</BlogH3>
      <BlogP>
        A closure is a function that remembers the scope in which it was created,
        even after that scope has finished executing.
      </BlogP>
      <BlogCode>{`function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count,
  };
}

const counter = createCounter();
counter.increment();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.value()); // 2`}</BlogCode>
      <BlogCallout type="tip">
        Closures are the foundation of modules, React hooks, and factory
        patterns in JS.
      </BlogCallout>
    </>
  );
}

function SectionArraysObjetos() {
  return (
    <>
      <BlogH2>Arrays and Objects</BlogH2>
      <BlogH3>Array methods</BlogH3>
      <BlogP>
        Functional array methods (<code>map</code>, <code>filter</code>,{" "}
        <code>reduce</code>) are fundamental and don't mutate the original array.
      </BlogP>
      <BlogCode>{`const nums = [1, 2, 3, 4, 5, 6];

const doubles   = nums.map(n => n * 2);
const evens    = nums.filter(n => n % 2 === 0);
const sum     = nums.reduce((acc, n) => acc + n, 0);
const first  = nums.find(n => n > 3);
const all    = nums.every(n => n > 0);

console.log(doubles);  // [2,4,6,8,10,12]
console.log(evens);   // [2,4,6]
console.log(sum);    // 21
console.log(first); // 4
console.log(all);   // true`}</BlogCode>
      <BlogH3>Objects and destructuring</BlogH3>
      <BlogCode>{`const person = { name: "Ana", age: 28, city: "Madrid" };

// Destructuring
const { name, age, city = "Unknown" } = person;
console.log(name); // "Ana"

// Spread
const updated = { ...person, age: 29, country: "Spain" };
console.log(updated);
// { name: "Ana", age: 29, city: "Madrid", country: "Spain" }

// Destructuring in parameters
function show({ name, age }) {
  return \`\${name} is \${age} years old\`;
}
console.log(show(person)); // "Ana is 28 years old"`}</BlogCode>
      <BlogH3>Method chaining</BlogH3>
      <BlogCode>{`const products = [
  { name: "Apple", price: 1.2, category: "fruit" },
  { name: "Bread", price: 0.8, category: "bakery" },
  { name: "Pear",  price: 1.5, category: "fruit" },
];

const fruitTotal = products
  .filter(p => p.category === "fruit")
  .map(p => p.price)
  .reduce((acc, p) => acc + p, 0);

console.log(fruitTotal.toFixed(2)); // "2.70"`}</BlogCode>
    </>
  );
}

function SectionDom() {
  return (
    <>
      <BlogH2>DOM Manipulation</BlogH2>
      <BlogH3>Selectors</BlogH3>
      <BlogCode>{`// Select elements
const title    = document.getElementById("title");
const buttons   = document.querySelectorAll(".btn");
const first   = document.querySelector("h1");

// Modify content and styles
title.textContent = "New title";
title.style.color = "blue";
title.classList.add("active");
title.classList.toggle("hidden");

// Create and insert elements
const li = document.createElement("li");
li.textContent = "New item";
document.querySelector("ul").appendChild(li);`}</BlogCode>
      <BlogH3>Events</BlogH3>
      <BlogP>
        Events allow you to react to user actions. Use{" "}
        <code>addEventListener</code> instead of HTML attributes like{" "}
        <code>onclick</code>.
      </BlogP>
      <BlogCode>{`const button = document.querySelector("#myButton");

button.addEventListener("click", (event) => {
  event.preventDefault(); // prevents default behavior
  console.log("Button clicked", event.target);
});

// Event delegation (more efficient)
document.querySelector("ul").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("completed");
  }
});

// Form event
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  console.log(Object.fromEntries(data));
});`}</BlogCode>
      <BlogCallout type="tip">
        Event delegation attaches a single listener to the parent instead of
        one per child. It's more efficient with dynamic lists.
      </BlogCallout>
    </>
  );
}

function SectionAsync() {
  return (
    <>
      <BlogH2>Asynchrony in JavaScript</BlogH2>
      <BlogH3>Promises</BlogH3>
      <BlogP>
        A Promise represents a value that may be available now, in the
        future, or never. It has three states: pending, fulfilled, and rejected.
      </BlogP>
      <BlogCode>{`const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = Math.random() > 0.5;
    if (success) resolve("Success!");
    else reject(new Error("Something went wrong"));
  }, 1000);
});

promise
  .then(result => console.log(result))
  .catch(error => console.error(error.message))
  .finally(() => console.log("Finished (success or error)"));`}</BlogCode>
      <BlogH3>async / await</BlogH3>
      <BlogP>
        <code>async/await</code> is syntactic sugar over Promises. It makes
        asynchronous code more readable and look synchronous.
      </BlogP>
      <BlogCode>{`async function getUser(id) {
  try {
    const res = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    const user = await res.json();
    return user;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

// Parallel calls with Promise.all
async function getMultipleUsers() {
  const [u1, u2] = await Promise.all([
    getUser(1),
    getUser(2),
  ]);
  console.log(u1.name, u2.name);
}`}</BlogCode>
      <BlogCallout type="warn">
        Always wrap <code>await</code> in a <code>try/catch</code> block
        to handle network or server errors.
      </BlogCallout>
    </>
  );
}

function SectionEs6Plus() {
  return (
    <>
      <BlogH2>ES6 and Modern Features</BlogH2>
      <BlogH3>Modules (ESM)</BlogH3>
      <BlogCode>{`// utils.js
export const PI = 3.14159;
export function circumference(r) { return 2 * PI * r; }
export default function greet(name) { return \`Hello, \${name}\`; }

// main.js
import greet, { PI, circumference } from "./utils.js";
console.log(greet("Ana"));
console.log(circumference(5));`}</BlogCode>
      <BlogH3>Classes</BlogH3>
      <BlogCode>{`class Animal {
  #name; // private field (ES2022)
  constructor(name, sound) {
    this.#name = name;
    this.sound = sound;
  }
  speak() { return \`\${this.#name} says \${this.sound}\`; }
  get name() { return this.#name; }
}

class Dog extends Animal {
  constructor(name) { super(name, "Woof!"); }
  fetch(object) { return \`\${this.name} fetches \${object}\`; }
}

const dog = new Dog("Rex");
console.log(dog.speak()); // "Rex says Woof!"
console.log(dog.fetch("the ball"));`}</BlogCode>
      <BlogH3>Spread, rest, and other utilities</BlogH3>
      <BlogCode>{`// Spread in arrays and objects
const a = [1, 2, 3];
const b = [...a, 4, 5]; // [1,2,3,4,5]
const obj1 = { x: 1 };
const obj2 = { ...obj1, y: 2 }; // {x:1, y:2}

// Optional chaining and nullish coalescing
const config = { db: { host: "localhost" } };
const port = config?.db?.port ?? 5432;
console.log(port); // 5432

// Logical assignment
let value = null;
value ??= "default";
console.log(value); // "default"`}</BlogCode>
    </>
  );
}

function SectionProyecto() {
  return (
    <>
      <BlogH2>Final Project: Weather App</BlogH2>
      <BlogP>
        We build a mini weather application using the Open-Meteo API
        (free, no API key required). Shows current temperature, description, and an
        icon based on conditions.
      </BlogP>
      <BlogCode>{`// weather-app.js - Weather app with Fetch API

const WMO_CODES = {
  0: "\u2600\ufe0f Clear", 1: "\ud83c\udf24\ufe0f Mostly clear",
  2: "\u26c5 Partly cloudy", 3: "\u2601\ufe0f Cloudy",
  61: "\ud83c\udf27\ufe0f Light rain", 63: "\ud83c\udf27\ufe0f Moderate rain",
  80: "\ud83c\udf26\ufe0f Showers", 95: "\u26c8\ufe0f Thunderstorm",
};

async function getCoordinates(city) {
  const url = \`https://geocoding-api.open-meteo.com/v1/search?name=\${encodeURIComponent(city)}&count=1\`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.results?.length) throw new Error("City not found");
  return { lat: data.results[0].latitude, lon: data.results[0].longitude, name: data.results[0].name };
}

async function getWeather(lat, lon) {
  const url = \`https://api.open-meteo.com/v1/forecast?latitude=\${lat}&longitude=\${lon}&current_weather=true\`;
  const res = await fetch(url);
  const data = await res.json();
  return data.current_weather;
}

async function showWeather(city) {
  const loading = document.querySelector("#loading");
  const result = document.querySelector("#result");
  loading.classList.remove("hidden");
  result.innerHTML = "";

  try {
    const { lat, lon, name } = await getCoordinates(city);
    const weather = await getWeather(lat, lon);
    const description = WMO_CODES[weather.weathercode] ?? "\ud83c\udf21\ufe0f Unknown condition";

    result.innerHTML = \`
      <h2>\${name}</h2>
      <p class="temp">\${weather.temperature}\u00b0C</p>
      <p class="desc">\${description}</p>
      <p class="wind">\ud83d\udca8 Wind: \${weather.windspeed} km/h</p>
    \`;
  } catch (err) {
    result.innerHTML = \`<p class="error">Error: \${err.message}</p>\`;
  } finally {
    loading.classList.add("hidden");
  }
}

// Initialization
document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  const city = document.querySelector("#city").value.trim();
  if (city) showWeather(city);
});

// Load default city
showWeather("Madrid");`}</BlogCode>
      <BlogCode>{`<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Weather App</title>
</head>
<body>
  <form id="form">
    <input id="city" placeholder="Enter a city..." />
    <button type="submit">Search</button>
  </form>
  <p id="loading" class="hidden">Loading...</p>
  <div id="result"></div>
  <script type="module" src="weather-app.js"></script>
</body>
</html>`}</BlogCode>
      <BlogCallout type="tip">
        The Open-Meteo API is 100% free and requires no registration. Perfect
        for practice projects.
      </BlogCallout>
    </>
  );
}

// Main Component
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
