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

export default function VueContent() {
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
          60 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        Vue.js: el framework progresivo
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Vue.js se autodefine como "el framework progresivo": puedes añadirlo
        a una página existente o usarlo para construir una SPA completa.
        Este tutorial recorre la Composition API, reactividad, componentes,
        routing y estado global. Prerequisito conceptual: JavaScript.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="que-es">¿Qué es Vue?</BlogH2>

      <BlogP>
        Creado por Evan You en 2014, Vue creció desde una biblioteca de
        capa de vista hasta un framework con su propio ecosistema. Su
        característica más distintiva es la <strong>progresividad</strong>:
        puedes usarlo como un simple <BlogInlineCode>&lt;script&gt;</BlogInlineCode>{" "}
        para mejorar una página, o escalar a una aplicación compleja con
        Vue Router y Pinia.
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Curva de aprendizaje suave:</strong> el template es HTML
          familiar y la reactividad es automática.
        </BlogLi>
        <BlogLi>
          <strong>Vite por defecto:</strong> el andamiaje oficial usa Vite,
          con recarga instantánea en desarrollo.
        </BlogLi>
        <BlogLi>
          <strong>Un solo archivo por componente (SFC):</strong>{" "}
          <BlogInlineCode>.vue</BlogInlineCode> agrupa template, script y
          estilos.
        </BlogLi>
        <BlogLi>
          <strong>Composition API:</strong> lógica reutilizable con
          composables, sin mixins.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="info">
        Vue 3 usa la Composition API con{" "}
        <BlogInlineCode>&lt;script setup&gt;</BlogInlineCode> como sintaxis
        recomendada. La Options API (<BlogInlineCode>data()</BlogInlineCode>,{" "}
        <BlogInlineCode>methods</BlogInlineCode>) sigue soportada, pero todo
        este tutorial usa el enfoque moderno.
      </BlogCallout>

      <BlogH2 id="crear-proyecto">Crear proyecto con Vite</BlogH2>

      <BlogP>
        El andamiaje oficial es <BlogInlineCode>create-vue</BlogInlineCode>{" "}
        (la herramienta de Vue para Vite):
      </BlogP>

      <BlogCode>{`npm create vue@latest

# Te pregunta qué incluir (Router, Pinia, ESLint...).
# Para empezar: Vue Router sí, el resto opcional.

cd mi-app
npm install
npm run dev   # http://localhost:5173`}</BlogCode>

      <BlogP>
        El resultado es una SPA con Vite:{" "}
        <BlogInlineCode>src/main.ts</BlogInlineCode> crea la app y monta el
        componente raíz:
      </BlogP>

      <BlogCode>{`import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')`}</BlogCode>

      <BlogP>
        La estructura típica de un proyecto Vue:
      </BlogP>

      <BlogCode>{`mi-app/
├── index.html
├── vite.config.ts
├── src/
│   ├── main.ts          # bootstrap: createApp + plugins
│   ├── App.vue          # componente raíz
│   ├── router/index.ts  # rutas
│   ├── stores/          # stores de Pinia
│   ├── components/      # componentes reutilizables
│   └── views/           # vistas de las rutas
└── package.json`}</BlogCode>

      <BlogH2 id="composition-api">Composition API y &lt;script setup&gt;</BlogH2>

      <BlogP>
        Un componente Vue es un archivo{" "}
        <BlogInlineCode>.vue</BlogInlineCode> con tres bloques. Con{" "}
        <BlogInlineCode>&lt;script setup&gt;</BlogInlineCode>, las variables
        declaradas están disponibles directamente en el template:
      </BlogP>

      <BlogCode>{`<script setup lang="ts">
const mensaje = 'Hola desde Vue'
const items = ['uno', 'dos', 'tres']
</script>

<template>
  <h1>{{ mensaje }}</h1>
  <ul>
    <li v-for="item in items" :key="item">{{ item }}</li>
  </ul>
</template>`}</BlogCode>

      <BlogCallout type="info">
        <BlogInlineCode>&lt;script setup&gt;</BlogInlineCode> no exporta
        nada: las variables y funciones son locales al template. El resultado
        es código más corto y sin "esta confusión" de{" "}
        <BlogInlineCode>this</BlogInlineCode>.
      </BlogCallout>

      <BlogH2 id="reactividad">Reactividad</BlogH2>

      <BlogP>
        La reactividad de Vue detecta los accesos y cambios a variables
        reactivas y re-renderiza lo que dependa de ellas. Las tres
        herramientas principales:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <BlogInlineCode>ref()</BlogInlineCode> — valor reactivo. En el
          template se usa sin <BlogInlineCode>.value</BlogInlineCode>, en
          código JavaScript con <BlogInlineCode>.value</BlogInlineCode>.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>reactive()</BlogInlineCode> — objeto reactivo, se
          accede directamente.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>computed()</BlogInlineCode> — valor derivado que se
          recalcula solo cuando cambian sus dependencias.
        </BlogLi>
      </BlogUl>

      <BlogCode>{`<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

const contador = ref(0)
const estado = reactive({ nombre: 'Ana', edad: 28 })

// En JavaScript hay que usar .value
const incrementar = () => contador.value++

const nombreCompleto = computed(
  () => \`\${estado.nombre}, \${estado.edad} años\`
)
</script>

<template>
  <button @click="incrementar">Clics: {{ contador }}</button>
  <p>{{ nombreCompleto }}</p>
</template>`}</BlogCode>

      <BlogCallout type="warn">
        <BlogInlineCode>reactive()</BlogInlineCode> solo funciona con
        objetos; con primitivos usa <BlogInlineCode>ref()</BlogInlineCode>.
        Al destructurar un objeto reactivo pierdes la reactividad — usa{" "}
        <BlogInlineCode>toRefs()</BlogInlineCode> si necesitas extraer
        propiedades.
      </BlogCallout>

      <BlogH2 id="directivas">Directivas</BlogH2>

      <BlogP>
        Las directivas son atributos con prefijo <BlogInlineCode>v-</BlogInlineCode>{" "}
        que controlan el DOM:
      </BlogP>

      <BlogCode>{`<!-- Condicional -->
<p v-if="usuario">Bienvenido, {{ usuario.nombre }}</p>
<p v-else>Inicia sesión</p>

<!-- Listas: siempre con :key -->
<ul>
  <li v-for="(tarea, indice) in tareas" :key="tarea.id">
    {{ indice }}. {{ tarea.titulo }}
  </li>
</ul>

<!-- Two-way binding en inputs -->
<input v-model="busqueda" placeholder="Buscar..." />`}</BlogCode>

      <BlogUl>
        <BlogLi>
          <BlogInlineCode>v-if / v-else-if / v-else</BlogInlineCode> —
          renderizado condicional (crea/destruye el elemento).
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>v-for</BlogInlineCode> — iteración, siempre con{" "}
          <BlogInlineCode>:key</BlogInlineCode> estable.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>v-model</BlogInlineCode> — two-way binding en
          inputs, selects y textareas.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>v-show</BlogInlineCode> — alternativa que solo
          alterna <BlogInlineCode>display</BlogInlineCode>, sin crear/destruir.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>v-bind</BlogInlineCode> (<BlogInlineCode>:</BlogInlineCode>){" "}
          — enlaza atributos; <BlogInlineCode>v-on</BlogInlineCode> ({" "}
          <BlogInlineCode>@</BlogInlineCode>) — escucha eventos.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="info">
        <BlogInlineCode>v-if</BlogInlineCode> con{" "}
        <BlogInlineCode>v-for</BlogInlineCode> en el mismo elemento: Vue los
        evalúa con <BlogInlineCode>v-if</BlogInlineCode> primero, lo que
        puede sorprender. Prefiere envolver con{" "}
        <BlogInlineCode>&lt;template&gt;</BlogInlineCode> o filtrar antes en
        un <BlogInlineCode>computed</BlogInlineCode>.
      </BlogCallout>

      <BlogH2 id="eventos">Eventos y modificadores</BlogH2>

      <BlogP>
        Los eventos se escuchan con <BlogInlineCode>@evento</BlogInlineCode>{" "}
        (equivalente a <BlogInlineCode>v-on:evento</BlogInlineCode>). Vue
        añade <strong>modificadores</strong> que simplifican casos comunes:
      </BlogP>

      <BlogCode>{`<script setup lang="ts">
const enviar = () => console.log('Enviado')
const guardarPosicion = (x: number, y: number) =>
  console.log({ x, y })
</script>

<template>
  <!-- .prevent evita el comportamiento por defecto (recargar la página) -->
  <form @submit.prevent="enviar">
    <input type="text" />
    <button type="submit">Enviar</button>
  </form>

  <!-- .stop detiene la propagación; pasar argumento -->
  <button @click.stop="guardarPosicion($event.clientX, $event.clientY)">
    Clic
  </button>

  <!-- Modificadores de teclado y ratón -->
  <input @keyup.enter="enviar" />
  <div @click.ctrl="enviar">Ctrl + clic</div>
</template>`}</BlogCode>

      <BlogP>
        Los modificadores más usados:{" "}
        <BlogInlineCode>.prevent</BlogInlineCode>,{" "}
        <BlogInlineCode>.stop</BlogInlineCode>,{" "}
        <BlogInlineCode>.self</BlogInlineCode>,{" "}
        <BlogInlineCode>.once</BlogInlineCode>, teclas como{" "}
        <BlogInlineCode>.enter</BlogInlineCode> o{" "}
        <BlogInlineCode>.esc</BlogInlineCode>, y para v-model{" "}
        <BlogInlineCode>.lazy</BlogInlineCode> (actualiza al perder foco) y{" "}
        <BlogInlineCode>.number</BlogInlineCode> (convierte a número).
      </BlogP>

      <BlogH2 id="props-emits">Props y emits</BlogH2>

      <BlogP>
        Los componentes reciben datos del padre con{" "}
        <BlogInlineCode>defineProps</BlogInlineCode> y avisan con{" "}
        <BlogInlineCode>defineEmits</BlogInlineCode>. Ambos son macros del
        compilador: no necesitan importarse:
      </BlogP>

      <BlogCode>{`<!-- CardTarea.vue -->
<script setup lang="ts">
defineProps<{ tarea: { id: number; titulo: string; done: boolean } }>()

const emit = defineEmits<{
  (e: 'toggle', id: number): void
  (e: 'eliminar', id: number): void
}>()
</script>

<template>
  <div class="tarea" :class="{ completada: tarea.done }">
    <span>{{ tarea.titulo }}</span>
    <button @click="emit('toggle', tarea.id)">Cambiar</button>
    <button @click="emit('eliminar', tarea.id)">Eliminar</button>
  </div>
</template>`}</BlogCode>

      <BlogP>
        El componente padre lo usa escuchando los eventos como si fueran
        DOM:
      </BlogP>

      <BlogCode>{`<script setup lang="ts">
import { ref } from 'vue'
import CardTarea from './CardTarea.vue'

const tareas = ref([
  { id: 1, titulo: 'Estudiar Vue', done: false },
])

const alternar = (id: number) => {
  const tarea = tareas.value.find((t) => t.id === id)
  if (tarea) tarea.done = !tarea.done
}
</script>

<template>
  <CardTarea
    v-for="tarea in tareas"
    :key="tarea.id"
    :tarea="tarea"
    @toggle="alternar"
    @eliminar="(id) => tareas = tareas.filter((t) => t.id !== id)"
  />
</template>`}</BlogCode>

      <BlogCallout type="warn">
        No modifiques un <BlogInlineCode>prop</BlogInlineCode> directamente:
        es de solo lectura y Vue te avisará. Para estados mutables
        inicializados desde un prop, crea un{" "}
        <BlogInlineCode>ref</BlogInlineCode> local o un{" "}
        <BlogInlineCode>computed</BlogInlineCode> con getter y setter.
      </BlogCallout>

      <BlogH2 id="slots">Slots</BlogH2>

      <BlogP>
        Los slots permiten pasar contenido arbitrario desde el padre al
        interior de un componente. Es la composición por contenido, ideal
        para layouts y componentes envolventes:
      </BlogP>

      <BlogCode>{`<!-- Card.vue -->
<script setup lang="ts">
defineProps<{ titulo: string }>()
</script>

<template>
  <div class="card">
    <h3 class="card-titulo">{{ titulo }}</h3>
    <!-- Slot por defecto -->
    <slot />
  </div>
</template>`}</BlogCode>

      <BlogCode>{`<script setup lang="ts">
import Card from './Card.vue'
</script>

<template>
  <Card titulo="Bienvenida">
    <p>Este contenido viene del padre.</p>
  </Card>
</template>`}</BlogCode>

      <BlogP>
        Los <strong>slots nombrados</strong> permiten varias zonas:
      </BlogP>

      <BlogCode>{`<!-- PanelLayout.vue -->
<template>
  <section class="panel">
    <header><slot name="cabecera" /></header>
    <main><slot /></main>
    <footer><slot name="pie" /></footer>
  </section>
</template>

<!-- Uso -->
<PanelLayout>
  <template #cabecera><h2>Título del panel</h2></template>
  <p>Contenido principal.</p>
  <template #pie>Pie de página.</template>
</PanelLayout>`}</BlogCode>

      <BlogP>
        Los slots con <strong>scoped props</strong> (usando{" "}
        <BlogInlineCode>&lt;slot :dato="valor" /&gt;</BlogInlineCode>) dejan
        que el padre reciba datos del hijo dentro del slot — potente para
        listas y tablas personalizables.
      </BlogP>

      <BlogH2 id="ciclo-de-vida">Ciclo de vida</BlogH2>

      <BlogP>
        Los hooks de ciclo de vida se importan de Vue y se llaman dentro de{" "}
        <BlogInlineCode>&lt;script setup&gt;</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const usuarios = ref([])

onMounted(async () => {
  const res = await fetch('https://api.example.com/usuarios')
  usuarios.value = await res.json()
})

onUnmounted(() => {
  // Limpieza: intervalos, listeners, conexiones
  limpiarTodo()
})
</script>`}</BlogCode>

      <BlogUl>
        <BlogLi>
          <BlogInlineCode>onMounted</BlogInlineCode> — el DOM del componente
          ya está insertado. El lugar típico para fetch.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>onUnmounted</BlogInlineCode> — limpieza de
          suscripciones, timers y listeners.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>onBeforeUnmount</BlogInlineCode> — último momento
          antes de destruir.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>watch</BlogInlineCode> — reacciona a cambios de una
          fuente reactiva (no es un hook de ciclo de vida pero convive con
          ellos).
        </BlogLi>
      </BlogUl>

      <BlogCallout type="info">
        En Vue 3, el gancho <BlogInlineCode>created</BlogInlineCode> de la
        Options API no existe: el cuerpo de{" "}
        <BlogInlineCode>&lt;script setup&gt;</BlogInlineCode> se ejecuta
        antes del montaje, así que el fetch en el top-level funciona igual.
        Úsalo con <BlogInlineCode>onMounted</BlogInlineCode> para tener
        acceso al DOM.
      </BlogCallout>

      <BlogH2 id="router">Routing con Vue Router</BlogH2>

      <BlogP>
        Vue Router mapea URLs a componentes. Se configura con{" "}
        <BlogInlineCode>createRouter</BlogInlineCode> y{" "}
        <BlogInlineCode>createWebHistory</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/Inicio.vue'
import UsuarioDetalle from '../views/UsuarioDetalle.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Inicio },
    { path: '/usuarios/:id', component: UsuarioDetalle },
  ],
})

export default router`}</BlogCode>

      <BlogP>
        El componente raíz incluye <BlogInlineCode>RouterView</BlogInlineCode>{" "}
        (zona donde se renderiza la ruta) y los enlaces se hacen con{" "}
        <BlogInlineCode>RouterLink</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`<!-- App.vue -->
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Inicio</RouterLink>
    <RouterLink to="/usuarios/1">Usuario 1</RouterLink>
  </nav>
  <RouterView />
</template>`}</BlogCode>

      <BlogP>
        Para leer parámetros y reaccionar a cambios de ruta se usa{" "}
        <BlogInlineCode>useRoute</BlogInlineCode> y{" "}
        <BlogInlineCode>useRouter</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const id = ref(route.params.id as string)

watch(
  () => route.params.id,
  (nuevoId) => {
    id.value = nuevoId as string
    cargarDatos(nuevoId)
  }
)

const irAInicio = () => router.push('/')
</script>`}</BlogCode>

      <BlogCallout type="warn">
        Si navegas de <BlogInlineCode>/usuarios/1</BlogInlineCode> a{" "}
        <BlogInlineCode>/usuarios/2</BlogInlineCode>, el componente{" "}
        <em>se reutiliza</em> (no se remonta). Por eso lees el parámetro con{" "}
        <BlogInlineCode>watch</BlogInlineCode> en vez de solo{" "}
        <BlogInlineCode>onMounted</BlogInlineCode>.
      </BlogCallout>

      <BlogH2 id="pinia">Estado global con Pinia</BlogH2>

      <BlogP>
        Cuando varias vistas comparten estado (sesión, carrito, filtros),
        Pinia es el store oficial de Vue. Un store se define con{" "}
        <BlogInlineCode>defineStore</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`// src/stores/usuario.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUsuarioStore = defineStore('usuario', () => {
  // Estado
  const nombre = ref('')
  const rol = ref<'invitado' | 'admin'>('invitado')

  // Getters (derivados)
  const esAdmin = computed(() => rol.value === 'admin')

  // Acciones (métodos)
  function iniciarSesion(nuevoNombre: string, nuevoRol: 'invitado' | 'admin') {
    nombre.value = nuevoNombre
    rol.value = nuevoRol
  }

  function cerrarSesion() {
    nombre.value = ''
    rol.value = 'invitado'
  }

  return { nombre, rol, esAdmin, iniciarSesion, cerrarSesion }
})`}</BlogCode>

      <BlogP>
        Cualquier componente lo consume con el hook que genera Pinia:
      </BlogP>

      <BlogCode>{`<script setup lang="ts">
import { useUsuarioStore } from '../stores/usuario'

const usuario = useUsuarioStore()
</script>

<template>
  <p v-if="usuario.esAdmin">Panel de administración</p>
  <p v-else>{{ usuario.nombre || 'Invitado' }}</p>
  <button @click="usuario.iniciarSesion('Ana', 'admin')">Entrar</button>
</template>`}</BlogCode>

      <BlogCallout type="info">
        Pinia con Composition API se parece mucho a{" "}
        <BlogInlineCode>&lt;script setup&gt;</BlogInlineCode>:{" "}
        <BlogInlineCode>ref</BlogInlineCode> para estado,{" "}
        <BlogInlineCode>computed</BlogInlineCode> para getters y funciones
        para acciones. Si dominas un componente, ya dominas un store. La
        integración con DevTools y el soporte de TypeScript son nativos.
      </BlogCallout>

      <BlogP>
        Vue te permite empezar pequeño y crecer de forma incremental: un{" "}
        <BlogInlineCode>&lt;script&gt;</BlogInlineCode> en una página, un SFC
        aquí, un router allá, y Pinia cuando el estado lo pida. Esa es la
        esencia de "framework progresivo".
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Ejercicios</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Crea un contador con ref que aumente, disminuya y se reinicie con tres botones."
          hint="ref(0) y recuerda usar .value dentro de las funciones."
          level="Básico"
          num={1}
          solution={`<script setup lang="ts">
import { ref } from 'vue'

const contador = ref(0)
const incrementar = () => contador.value++
const disminuir = () => contador.value--
const reiniciar = () => (contador.value = 0)
</script>

<template>
  <p>Contador: {{ contador }}</p>
  <button @click="incrementar">+1</button>
  <button @click="disminuir">-1</button>
  <button @click="reiniciar">Reiniciar</button>
</template>`}
          title="Contador con ref"
        />

        <ExerciseCard
          description="Dado un array de tareas, muéstralas con v-for y marca las completadas con un checkbox v-model."
          hint="Usa :key en el v-for y vincula el checkbox al campo done de cada tarea."
          level="Básico"
          num={2}
          solution={`<script setup lang="ts">
import { ref } from 'vue'

const tareas = ref([
  { id: 1, titulo: 'Estudiar Vue', done: false },
  { id: 2, titulo: 'Hacer ejercicios', done: false },
])
</script>

<template>
  <ul>
    <li v-for="tarea in tareas" :key="tarea.id">
      <input v-model="tarea.done" type="checkbox" />
      <span :class="{ tachada: tarea.done }">{{ tarea.titulo }}</span>
    </li>
  </ul>
</template>

<style scoped>
.tachada {
  text-decoration: line-through;
}
</style>`}
          title="Lista con v-for y v-model"
        />

        <ExerciseCard
          description="Crea un componente MensajeAlerta que reciba un prop 'tipo' ('ok' | 'error') y emita un evento 'cerrar' al pulsar su botón."
          hint="defineProps<{ tipo: ... }>() y defineEmits<{ (e: 'cerrar'): void }>()"
          level="Intermedio"
          num={3}
          solution={`<!-- MensajeAlerta.vue -->
<script setup lang="ts">
defineProps<{ tipo: 'ok' | 'error' }>()
const emit = defineEmits<{ (e: 'cerrar'): void }>()
</script>

<template>
  <div :class="tipo">
    <p>{{ tipo === 'ok' ? 'Operación correcta' : 'Algo falló' }}</p>
    <button @click="emit('cerrar')">Cerrar</button>
  </div>
</template>`}
          title="Componente con props y emits"
        />

        <ExerciseCard
          description="Crea un formulario con un input v-model que muestre en vivo el texto escrito y el número de caracteres."
          hint="v-model en el input y un computed para la longitud."
          level="Intermedio"
          num={4}
          solution={`<script setup lang="ts">
import { ref, computed } from 'vue'

const texto = ref('')
const longitud = computed(() => texto.value.length)
</script>

<template>
  <input v-model="texto" placeholder="Escribe algo..." />
  <p>Has escrito: "{{ texto }}"</p>
  <p>Caracteres: {{ longitud }}</p>
</template>`}
          title="Input con v-model"
        />

        <ExerciseCard
          description="Crea una ruta '/datos' cuyo componente haga un fetch a una API en onMounted y muestre el resultado con v-if para el estado de carga."
          hint="Registra la ruta con createRouter y usa onMounted + ref para el estado."
          level="Avanzado"
          num={5}
          solution={`// src/router/index.ts
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/datos', component: VistaDatos },
  ],
})

// VistaDatos.vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const cargando = ref(true)
const error = ref('')
const datos = ref([])

onMounted(async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    datos.value = await res.json()
  } catch (e) {
    error.value = 'No se pudieron cargar los datos'
  } finally {
    cargando.value = false
  }
})
</script>

<template>
  <p v-if="cargando">Cargando...</p>
  <p v-else-if="error">{{ error }}</p>
  <ul v-else>
    <li v-for="post in datos" :key="post.id">{{ post.title }}</li>
  </ul>
</template>`}
          title="Ruta + fetch en onMounted"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        Vue es una puerta de entrada excelente al desarrollo frontend
        moderno: su reactividad automática y su sintaxis legible te dejan
        centrarte en el problema, no en el framework. Cuando el proyecto
        crezca, Vue Router y Pinia escalan contigo sin que tengas que
        reescribir nada.
      </BlogP>
    </article>
  );
}
