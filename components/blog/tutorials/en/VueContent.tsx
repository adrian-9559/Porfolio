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
  level: "Easy" | "Intermediate" | "Hard";
  description: string;
  hint?: string;
  solution?: string;
}) {
  const [open, setOpen] = useState(false);
  const levelColor = {
    Easy: "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
    Intermediate:
      "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
    Hard: "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
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
              <strong>Hint:</strong> {hint}
            </div>
          )}
          {solution && <BlogCode>{solution}</BlogCode>}
        </div>
      )}
    </div>
  );
}

export default function VueContentEn() {
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
        Vue.js: the progressive framework
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Vue.js calls itself "the progressive framework": you can add it to
        an existing page or use it to build a complete SPA. This tutorial
        covers the Composition API, reactivity, components, routing, and
        global state. Conceptual prerequisite: JavaScript.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="que-es">What is Vue?</BlogH2>

      <BlogP>
        Created by Evan You in 2014, Vue grew from a view-layer library into
        a framework with its own ecosystem. Its most distinctive feature is{" "}
        <strong>progressiveness</strong>: you can use it as a simple{" "}
        <BlogInlineCode>&lt;script&gt;</BlogInlineCode> to enhance a page, or
        scale up to a complex application with Vue Router and Pinia.
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Gentle learning curve:</strong> the template is familiar
          HTML and reactivity is automatic.
        </BlogLi>
        <BlogLi>
          <strong>Vite by default:</strong> the official scaffolding uses
          Vite, with instant reload in development.
        </BlogLi>
        <BlogLi>
          <strong>One file per component (SFC):</strong>{" "}
          <BlogInlineCode>.vue</BlogInlineCode> groups template, script, and
          styles.
        </BlogLi>
        <BlogLi>
          <strong>Composition API:</strong> reusable logic with composables,
          no mixins.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="info">
        Vue 3 uses the Composition API with{" "}
        <BlogInlineCode>&lt;script setup&gt;</BlogInlineCode> as the
        recommended syntax. The Options API (<BlogInlineCode>data()</BlogInlineCode>,{" "}
        <BlogInlineCode>methods</BlogInlineCode>) is still supported, but
        this whole tutorial uses the modern approach.
      </BlogCallout>

      <BlogH2 id="crear-proyecto">Create a project with Vite</BlogH2>

      <BlogP>
        The official scaffolding is <BlogInlineCode>create-vue</BlogInlineCode>{" "}
        (Vue's tooling for Vite):
      </BlogP>

      <BlogCode>{`npm create vue@latest

# It asks what to include (Router, Pinia, ESLint...).
# To start: Vue Router yes, everything else optional.

cd my-app
npm install
npm run dev   # http://localhost:5173`}</BlogCode>

      <BlogP>
        The result is a Vite SPA:{" "}
        <BlogInlineCode>src/main.ts</BlogInlineCode> creates the app and
        mounts the root component:
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
        The typical structure of a Vue project:
      </BlogP>

      <BlogCode>{`my-app/
├── index.html
├── vite.config.ts
├── src/
│   ├── main.ts          # bootstrap: createApp + plugins
│   ├── App.vue          # root component
│   ├── router/index.ts  # routes
│   ├── stores/          # Pinia stores
│   ├── components/      # reusable components
│   └── views/           # route views
└── package.json`}</BlogCode>

      <BlogH2 id="composition-api">Composition API and &lt;script setup&gt;</BlogH2>

      <BlogP>
        A Vue component is a <BlogInlineCode>.vue</BlogInlineCode> file with
        three blocks. With <BlogInlineCode>&lt;script setup&gt;</BlogInlineCode>,
        the declared variables are directly available in the template:
      </BlogP>

      <BlogCode>{`<script setup lang="ts">
const message = 'Hello from Vue'
const items = ['one', 'two', 'three']
</script>

<template>
  <h1>{{ message }}</h1>
  <ul>
    <li v-for="item in items" :key="item">{{ item }}</li>
  </ul>
</template>`}</BlogCode>

      <BlogCallout type="info">
        <BlogInlineCode>&lt;script setup&gt;</BlogInlineCode> exports
        nothing: variables and functions are local to the template. The
        result is shorter code with no <BlogInlineCode>this</BlogInlineCode>{" "}
        confusion.
      </BlogCallout>

      <BlogH2 id="reactividad">Reactivity</BlogH2>

      <BlogP>
        Vue's reactivity tracks accesses and changes to reactive variables
        and re-renders whatever depends on them. The three main tools:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <BlogInlineCode>ref()</BlogInlineCode> — reactive value. In the
          template it is used without <BlogInlineCode>.value</BlogInlineCode>,
          in JavaScript code with <BlogInlineCode>.value</BlogInlineCode>.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>reactive()</BlogInlineCode> — reactive object,
          accessed directly.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>computed()</BlogInlineCode> — derived value that
          only recalculates when its dependencies change.
        </BlogLi>
      </BlogUl>

      <BlogCode>{`<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

const count = ref(0)
const state = reactive({ name: 'Ana', age: 28 })

// In JavaScript you must use .value
const increment = () => count.value++

const fullName = computed(
  () => \`\${state.name}, \${state.age} years old\`
)
</script>

<template>
  <button @click="increment">Clicks: {{ count }}</button>
  <p>{{ fullName }}</p>
</template>`}</BlogCode>

      <BlogCallout type="warn">
        <BlogInlineCode>reactive()</BlogInlineCode> only works with objects;
        for primitives use <BlogInlineCode>ref()</BlogInlineCode>. When you
        destructure a reactive object you lose reactivity — use{" "}
        <BlogInlineCode>toRefs()</BlogInlineCode> if you need to extract
        properties.
      </BlogCallout>

      <BlogH2 id="directivas">Directives</BlogH2>

      <BlogP>
        Directives are attributes prefixed with <BlogInlineCode>v-</BlogInlineCode>{" "}
        that control the DOM:
      </BlogP>

      <BlogCode>{`<!-- Conditional -->
<p v-if="user">Welcome, {{ user.name }}</p>
<p v-else>Sign in</p>

<!-- Lists: always with :key -->
<ul>
  <li v-for="(task, index) in tasks" :key="task.id">
    {{ index }}. {{ task.title }}
  </li>
</ul>

<!-- Two-way binding on inputs -->
<input v-model="search" placeholder="Search..." />`}</BlogCode>

      <BlogUl>
        <BlogLi>
          <BlogInlineCode>v-if / v-else-if / v-else</BlogInlineCode> —
          conditional rendering (creates/destroys the element).
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>v-for</BlogInlineCode> — iteration, always with a
          stable <BlogInlineCode>:key</BlogInlineCode>.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>v-model</BlogInlineCode> — two-way binding on
          inputs, selects, and textareas.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>v-show</BlogInlineCode> — alternative that only
          toggles <BlogInlineCode>display</BlogInlineCode>, without
          creating/destroying.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>v-bind</BlogInlineCode> (<BlogInlineCode>:</BlogInlineCode>){" "}
          — binds attributes; <BlogInlineCode>v-on</BlogInlineCode> ({" "}
          <BlogInlineCode>@</BlogInlineCode>) — listens for events.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="info">
        <BlogInlineCode>v-if</BlogInlineCode> with{" "}
        <BlogInlineCode>v-for</BlogInlineCode> on the same element: Vue
        evaluates <BlogInlineCode>v-if</BlogInlineCode> first, which can be
        surprising. Prefer wrapping with{" "}
        <BlogInlineCode>&lt;template&gt;</BlogInlineCode> or filtering first
        in a <BlogInlineCode>computed</BlogInlineCode>.
      </BlogCallout>

      <BlogH2 id="eventos">Events and modifiers</BlogH2>

      <BlogP>
        Events are listened to with <BlogInlineCode>@event</BlogInlineCode>{" "}
        (equivalent to <BlogInlineCode>v-on:event</BlogInlineCode>). Vue adds{" "}
        <strong>modifiers</strong> that simplify common cases:
      </BlogP>

      <BlogCode>{`<script setup lang="ts">
const submit = () => console.log('Submitted')
const logPosition = (x: number, y: number) =>
  console.log({ x, y })
</script>

<template>
  <!-- .prevent avoids the default behavior (page reload) -->
  <form @submit.prevent="submit">
    <input type="text" />
    <button type="submit">Send</button>
  </form>

  <!-- .stop stops propagation; passing an argument -->
  <button @click.stop="logPosition($event.clientX, $event.clientY)">
    Click
  </button>

  <!-- Keyboard and mouse modifiers -->
  <input @keyup.enter="submit" />
  <div @click.ctrl="submit">Ctrl + click</div>
</template>`}</BlogCode>

      <BlogP>
        The most used modifiers: <BlogInlineCode>.prevent</BlogInlineCode>,{" "}
        <BlogInlineCode>.stop</BlogInlineCode>,{" "}
        <BlogInlineCode>.self</BlogInlineCode>,{" "}
        <BlogInlineCode>.once</BlogInlineCode>, keys like{" "}
        <BlogInlineCode>.enter</BlogInlineCode> or{" "}
        <BlogInlineCode>.esc</BlogInlineCode>, and for v-model{" "}
        <BlogInlineCode>.lazy</BlogInlineCode> (updates on blur) and{" "}
        <BlogInlineCode>.number</BlogInlineCode> (casts to number).
      </BlogP>

      <BlogH2 id="props-emits">Props and emits</BlogH2>

      <BlogP>
        Components receive data from the parent with{" "}
        <BlogInlineCode>defineProps</BlogInlineCode> and notify with{" "}
        <BlogInlineCode>defineEmits</BlogInlineCode>. Both are compiler
        macros: they don't need importing:
      </BlogP>

      <BlogCode>{`<!-- TaskCard.vue -->
<script setup lang="ts">
defineProps<{ task: { id: number; title: string; done: boolean } }>()

const emit = defineEmits<{
  (e: 'toggle', id: number): void
  (e: 'delete', id: number): void
}>()
</script>

<template>
  <div class="task" :class="{ completed: task.done }">
    <span>{{ task.title }}</span>
    <button @click="emit('toggle', task.id)">Toggle</button>
    <button @click="emit('delete', task.id)">Delete</button>
  </div>
</template>`}</BlogCode>

      <BlogP>
        The parent component uses it listening to the events as if they were
        DOM events:
      </BlogP>

      <BlogCode>{`<script setup lang="ts">
import { ref } from 'vue'
import TaskCard from './TaskCard.vue'

const tasks = ref([
  { id: 1, title: 'Study Vue', done: false },
])

const toggle = (id: number) => {
  const task = tasks.value.find((t) => t.id === id)
  if (task) task.done = !task.done
}
</script>

<template>
  <TaskCard
    v-for="task in tasks"
    :key="task.id"
    :task="task"
    @toggle="toggle"
    @delete="(id) => tasks = tasks.filter((t) => t.id !== id)"
  />
</template>`}</BlogCode>

      <BlogCallout type="warn">
        Don't mutate a <BlogInlineCode>prop</BlogInlineCode> directly: it is
        read-only and Vue will warn you. For mutable state initialized from
        a prop, create a local <BlogInlineCode>ref</BlogInlineCode> or a{" "}
        <BlogInlineCode>computed</BlogInlineCode> with getter and setter.
      </BlogCallout>

      <BlogH2 id="slots">Slots</BlogH2>

      <BlogP>
        Slots let you pass arbitrary content from the parent into a
        component. That is content composition, ideal for layouts and
        wrapper components:
      </BlogP>

      <BlogCode>{`<!-- Card.vue -->
<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="card">
    <h3 class="card-title">{{ title }}</h3>
    <!-- Default slot -->
    <slot />
  </div>
</template>`}</BlogCode>

      <BlogCode>{`<script setup lang="ts">
import Card from './Card.vue'
</script>

<template>
  <Card title="Welcome">
    <p>This content comes from the parent.</p>
  </Card>
</template>`}</BlogCode>

      <BlogP>
        <strong>Named slots</strong> allow multiple zones:
      </BlogP>

      <BlogCode>{`<!-- PanelLayout.vue -->
<template>
  <section class="panel">
    <header><slot name="header" /></header>
    <main><slot /></main>
    <footer><slot name="footer" /></footer>
  </section>
</template>

<!-- Usage -->
<PanelLayout>
  <template #header><h2>Panel title</h2></template>
  <p>Main content.</p>
  <template #footer>Page footer.</template>
</PanelLayout>`}</BlogCode>

      <BlogP>
        Slots with <strong>scoped props</strong> (using{" "}
        <BlogInlineCode>&lt;slot :data="value" /&gt;</BlogInlineCode>) let the
        parent receive child data inside the slot — powerful for
        customizable lists and tables.
      </BlogP>

      <BlogH2 id="ciclo-de-vida">Lifecycle</BlogH2>

      <BlogP>
        Lifecycle hooks are imported from Vue and called inside{" "}
        <BlogInlineCode>&lt;script setup&gt;</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const users = ref([])

onMounted(async () => {
  const res = await fetch('https://api.example.com/users')
  users.value = await res.json()
})

onUnmounted(() => {
  // Cleanup: intervals, listeners, connections
  cleanupEverything()
})
</script>`}</BlogCode>

      <BlogUl>
        <BlogLi>
          <BlogInlineCode>onMounted</BlogInlineCode> — the component DOM is
          already inserted. The typical place for fetch.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>onUnmounted</BlogInlineCode> — cleanup of
          subscriptions, timers, and listeners.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>onBeforeUnmount</BlogInlineCode> — last moment
          before destruction.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>watch</BlogInlineCode> — reacts to changes of a
          reactive source (not a lifecycle hook but coexists with them).
        </BlogLi>
      </BlogUl>

      <BlogCallout type="info">
        In Vue 3 the Options API's <BlogInlineCode>created</BlogInlineCode>{" "}
        hook does not exist: the body of{" "}
        <BlogInlineCode>&lt;script setup&gt;</BlogInlineCode> runs before
        mount, so top-level fetch works the same way. Use it with{" "}
        <BlogInlineCode>onMounted</BlogInlineCode> to have access to the DOM.
      </BlogCallout>

      <BlogH2 id="router">Routing with Vue Router</BlogH2>

      <BlogP>
        Vue Router maps URLs to components. It is configured with{" "}
        <BlogInlineCode>createRouter</BlogInlineCode> and{" "}
        <BlogInlineCode>createWebHistory</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import UserDetail from '../views/UserDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/users/:id', component: UserDetail },
  ],
})

export default router`}</BlogCode>

      <BlogP>
        The root component includes <BlogInlineCode>RouterView</BlogInlineCode>{" "}
        (the zone where the active route renders) and links are made with{" "}
        <BlogInlineCode>RouterLink</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`<!-- App.vue -->
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/users/1">User 1</RouterLink>
  </nav>
  <RouterView />
</template>`}</BlogCode>

      <BlogP>
        To read parameters and react to route changes you use{" "}
        <BlogInlineCode>useRoute</BlogInlineCode> and{" "}
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
  (newId) => {
    id.value = newId as string
    loadData(newId)
  }
)

const goHome = () => router.push('/')
</script>`}</BlogCode>

      <BlogCallout type="warn">
        If you navigate from <BlogInlineCode>/users/1</BlogInlineCode> to{" "}
        <BlogInlineCode>/users/2</BlogInlineCode>, the component{" "}
        <em>is reused</em> (it is not remounted). That is why you read the
        parameter with <BlogInlineCode>watch</BlogInlineCode> instead of
        only <BlogInlineCode>onMounted</BlogInlineCode>.
      </BlogCallout>

      <BlogH2 id="pinia">Global state with Pinia</BlogH2>

      <BlogP>
        When several views share state (session, cart, filters), Pinia is
        Vue's official store. A store is defined with{" "}
        <BlogInlineCode>defineStore</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`// src/stores/user.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const name = ref('')
  const role = ref<'guest' | 'admin'>('guest')

  // Getters (derived)
  const isAdmin = computed(() => role.value === 'admin')

  // Actions (methods)
  function signIn(newName: string, newRole: 'guest' | 'admin') {
    name.value = newName
    role.value = newRole
  }

  function signOut() {
    name.value = ''
    role.value = 'guest'
  }

  return { name, role, isAdmin, signIn, signOut }
})`}</BlogCode>

      <BlogP>
        Any component consumes it with the hook Pinia generates:
      </BlogP>

      <BlogCode>{`<script setup lang="ts">
import { useUserStore } from '../stores/user'

const user = useUserStore()
</script>

<template>
  <p v-if="user.isAdmin">Admin panel</p>
  <p v-else>{{ user.name || 'Guest' }}</p>
  <button @click="user.signIn('Ana', 'admin')">Sign in</button>
</template>`}</BlogCode>

      <BlogCallout type="info">
        Pinia with the Composition API looks a lot like{" "}
        <BlogInlineCode>&lt;script setup&gt;</BlogInlineCode>:{" "}
        <BlogInlineCode>ref</BlogInlineCode> for state,{" "}
        <BlogInlineCode>computed</BlogInlineCode> for getters, and functions
        for actions. If you master a component, you already master a store.
        DevTools integration and TypeScript support are native.
      </BlogCallout>

      <BlogP>
        Vue lets you start small and grow incrementally: a{" "}
        <BlogInlineCode>&lt;script&gt;</BlogInlineCode> on a page, an SFC
        here, a router there, and Pinia when state demands it. That is the
        essence of "the progressive framework".
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Exercises</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Create a counter with ref that increases, decreases, and resets with three buttons."
          hint="ref(0) and remember to use .value inside the functions."
          level="Easy"
          num={1}
          solution={`<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const increment = () => count.value++
const decrement = () => count.value--
const reset = () => (count.value = 0)
</script>

<template>
  <p>Count: {{ count }}</p>
  <button @click="increment">+1</button>
  <button @click="decrement">-1</button>
  <button @click="reset">Reset</button>
</template>`}
          title="Counter with ref"
        />

        <ExerciseCard
          description="Given an array of tasks, display them with v-for and mark completed ones with a v-model checkbox."
          hint="Use :key on v-for and bind the checkbox to each task's done field."
          level="Easy"
          num={2}
          solution={`<script setup lang="ts">
import { ref } from 'vue'

const tasks = ref([
  { id: 1, title: 'Study Vue', done: false },
  { id: 2, title: 'Do exercises', done: false },
])
</script>

<template>
  <ul>
    <li v-for="task in tasks" :key="task.id">
      <input v-model="task.done" type="checkbox" />
      <span :class="{ strikethrough: task.done }">{{ task.title }}</span>
    </li>
  </ul>
</template>

<style scoped>
.strikethrough {
  text-decoration: line-through;
}
</style>`}
          title="List with v-for and v-model"
        />

        <ExerciseCard
          description="Create an AlertMessage component that receives a 'type' prop ('ok' | 'error') and emits a 'close' event when its button is pressed."
          hint="defineProps<{ type: ... }>() and defineEmits<{ (e: 'close'): void }>()"
          level="Intermediate"
          num={3}
          solution={`<!-- AlertMessage.vue -->
<script setup lang="ts">
defineProps<{ type: 'ok' | 'error' }>()
const emit = defineEmits<{ (e: 'close'): void }>()
</script>

<template>
  <div :class="type">
    <p>{{ type === 'ok' ? 'Operation succeeded' : 'Something failed' }}</p>
    <button @click="emit('close')">Close</button>
  </div>
</template>`}
          title="Component with props and emits"
        />

        <ExerciseCard
          description="Create a form with a v-model input that shows the typed text live and the character count."
          hint="v-model on the input and a computed for the length."
          level="Intermediate"
          num={4}
          solution={`<script setup lang="ts">
import { ref, computed } from 'vue'

const text = ref('')
const length = computed(() => text.value.length)
</script>

<template>
  <input v-model="text" placeholder="Type something..." />
  <p>You typed: "{{ text }}"</p>
  <p>Characters: {{ length }}</p>
</template>`}
          title="Input with v-model"
        />

        <ExerciseCard
          description="Create a '/data' route whose component fetches an API in onMounted and shows the result with v-if for the loading state."
          hint="Register the route with createRouter and use onMounted + ref for the state."
          level="Hard"
          num={5}
          solution={`// src/router/index.ts
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/data', component: DataView },
  ],
})

// DataView.vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loading = ref(true)
const error = ref('')
const data = ref([])

onMounted(async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    data.value = await res.json()
  } catch (e) {
    error.value = 'Could not load the data'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <p v-if="loading">Loading...</p>
  <p v-else-if="error">{{ error }}</p>
  <ul v-else>
    <li v-for="post in data" :key="post.id">{{ post.title }}</li>
  </ul>
</template>`}
          title="Route + fetch in onMounted"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        Vue is an excellent entry point to modern frontend development: its
        automatic reactivity and readable syntax let you focus on the
        problem, not the framework. When the project grows, Vue Router and
        Pinia scale with you without requiring a rewrite.
      </BlogP>
    </article>
  );
}
