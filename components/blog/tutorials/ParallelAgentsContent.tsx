"use client";
import {
  BlogCallout,
  BlogCode,
  BlogH2,
  BlogH3,
  BlogInlineCode,
  BlogLi,
  BlogP,
  BlogUl,
} from "@/components/blog/shared";

export default function ParallelAgentsContent() {
  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 mb-8">
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800/50">
          Tutorial
        </span>
        <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
          12 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-4"
        style={{ letterSpacing: "-0.03em" }}
      >
        Cómo lanzar varios agentes en paralelo
      </h1>
      <p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed mb-8">
        Aprende a dividir tareas complejas entre múltiples agentes que trabajan
        simultáneamente. Multiplica la velocidad de desarrollo sin sacrificar
        calidad.
      </p>

      <div className="h-px bg-black/8 dark:bg-white/8 mb-8" />

      <BlogH2>¿Qué son los agentes en paralelo?</BlogH2>
      <BlogP>
        Los agentes en paralelo son múltiples instancias de IA ejecutando tareas
        diferentes al mismo tiempo. En lugar de que un solo agente haga todo
        secuencialmente (tarea A → tarea B → tarea C), lanzas varios agentes que
        trabajan simultáneamente (tarea A + tarea B + tarea C a la vez).
      </BlogP>
      <BlogP>
        El resultado: una tarea que llevaría 30 minutos secuencial se completa
        en 5-10 minutos con 3-4 agentes paralelos.
      </BlogP>

      <BlogCallout type="tip">
        Piensa en ello como un equipo de desarrolladores. Un solo senior
        tardaría una semana en hacer 5 features. Con 5 seniors trabajando en
        paralelo, el mismo trabajo se hace en un día.
      </BlogCallout>

      <BlogH2>¿Cuándo usar agentes en paralelo?</BlogH2>
      <BlogP>
        No todas las tareas se benefician del paralelismo. Estas son las que
        más:
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Features independientes</strong> — crear varios componentes de
          UI que no comparten estado aún
        </BlogLi>
        <BlogLi>
          <strong>Refactor por capas</strong> — un agente refactoriza modelos,
          otro controladores, otro tests
        </BlogLi>
        <BlogLi>
          <strong>Documentación + código</strong> — un agente escribe el código,
          otro la documentación, otro los tests
        </BlogLi>
        <BlogLi>
          <strong>Migración de datos</strong> — diferentes lotes de datos
          migrados en paralelo
        </BlogLi>
        <BlogLi>
          <strong>Code review</strong> — varios agentes revisan diferentes
          partes del código simultáneamente
        </BlogLi>
        <BlogLi>
          <strong>Análisis de seguridad</strong> — un agente audita
          dependencias, otro busca secretos, otro revisa lógica auth
        </BlogLi>
      </BlogUl>
      <BlogP>
        La regla de oro: si dos tareas pueden hacerse en cualquier orden sin
        afectarse mutuamente, pueden ejecutarse en paralelo.
      </BlogP>

      <BlogH2>Cómo funciona en OpenCode</BlogH2>
      <BlogP>
        OpenCode expone la herramienta <BlogInlineCode>task</BlogInlineCode> que
        lanza subagentes independientes. Cada subagente tiene su propio
        contexto, sus propias herramientas y trabaja sin interferir con otros.
        El flujo es:
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Tú</strong> — diseñas el plan y divides el trabajo
        </BlogLi>
        <BlogLi>
          <strong>Task tool</strong> — lanza los agentes en paralelo
        </BlogLi>
        <BlogLi>
          <strong>Subagentes</strong> — cada uno ejecuta su tarea con acceso
          completo a herramientas
        </BlogLi>
        <BlogLi>
          <strong>Resultados</strong> — vuelven a ti para integración y revisión
          final
        </BlogLi>
      </BlogUl>
      <BlogP>
        Cada subagente puede leer, escribir y modificar archivos del proyecto.
        Si dos agentes modifican el mismo archivo, el último en terminar
        sobrescribe los cambios del primero. Por eso la división del trabajo es
        clave.
      </BlogP>

      <BlogH2>División del trabajo: la clave del éxito</BlogH2>
      <BlogP>
        El paso más importante antes de lanzar agentes es dividir el trabajo
        correctamente. Un buen plan evita conflictos y solapamientos:
      </BlogP>

      <BlogH3>1. Identifica archivos independientes</BlogH3>
      <BlogP>
        Cada agente debe trabajar en archivos diferentes. Si dos agentes
        necesitan modificar el mismo archivo, o lo haces secuencial o rediseñas
        el plan para que uno espere al otro.
      </BlogP>
      <BlogCode>{`// MAL PLAN — dos agentes modifican el mismo archivo
Agente 1: Añadir función login() a auth.ts
Agente 2: Añadir función register() a auth.ts
// → El segundo sobrescribe al primero

// BUEN PLAN — archivos independientes
Agente 1: Crear auth.service.ts (lógica de login)
Agente 2: Crear auth.controller.ts (ruta HTTP)
Agente 3: Crear auth.test.ts (tests)
// → Sin conflictos, trabajan en paralelo`}</BlogCode>

      <BlogH3>2. Define el contexto de cada agente</BlogH3>
      <BlogP>
        Cada subagente necesita saber qué hacer, dónde hacerlo y qué
        convenciones seguir. Un prompt bien estructurado marca la diferencia:
      </BlogP>
      <BlogCode>{`Prompt débil:
"Crea el componente UserList"

Prompt fuerte:
"Crea el componente UserList en /components/users/UserList.tsx.
Sigue el patrón de UserCard en /components/users/UserCard.tsx.
Usa TypeScript, TailwindCSS, export default function.
Props: users: User[], onSelect: (id: string) => void.
Estados: loading (spinner), empty ("No hay usuarios"), error (mensaje rojo), datos (tabla)."`}</BlogCode>

      <BlogH3>3. Especifica el formato de salida</BlogH3>
      <BlogP>
        Dile al agente qué debe devolver exactamente cuando termine. Así sabrás
        si cumplió sin tener que leer todo su trabajo:
      </BlogP>
      <BlogCode>{`"/api/users.ts → crear endpoint GET /api/users con paginación"
Cuándo termines, dime:
1. Ruta exacta del archivo creado
2. Qué hace el endpoint
3. Cómo probarlo (curl)`}</BlogCode>

      <BlogH2>Ejemplo práctico 1: Crear 3 componentes independientes</BlogH2>
      <BlogP>
        Tienes que crear <strong>Header</strong>, <strong>Footer</strong> y{" "}
        <strong>Sidebar</strong> para una web. Son componentes independientes
        que no comparten archivos. El plan:
      </BlogP>
      <BlogCode>{`// Tú le dices a OpenCode:
"Voy a crear 3 componentes de layout. Lanza 3 agentes en paralelo:

Agente 1 — Crea el Header
Archivo: components/layout/Header.tsx
Props: title: string, navItems: NavItem[]
Estilos: sticky top-0 con backdrop-blur, logo a izquierda, nav centrado, avatar a derecha
Estado responsive: menú hamburguesa en mobile

Agente 2 — Crea el Footer  
Archivo: components/layout/Footer.tsx
Props: companyName: string, links: FooterLink[]
Columnas: 4 columnas en desktop, 2 en tablet, 1 en mobile
Año dinámico con new Date().getFullYear()

Agente 3 — Crea el Sidebar
Archivo: components/layout/Sidebar.tsx
Props: items: SidebarItem[], collapsed: boolean
Animación: transición width 300ms entre colapsado/expandido
Iconos de lucide-react

Cada agente: dime al final la ruta del archivo creado."`}</BlogCode>
      <BlogP>
        OpenCode lanza 3 agentes simultáneamente. Cada uno crea su archivo sin
        saber de los otros. En segundos tienes los 3 componentes listos.
      </BlogP>

      <BlogH2>Ejemplo práctico 2: Refactor por capas</BlogH2>
      <BlogP>
        Necesitas refactorizar un módulo de autenticación. En lugar de hacerlo
        secuencial, divides el trabajo por capas:
      </BlogP>
      <BlogCode>{`"Refactoriza el módulo de auth en 3 agentes paralelos:

Agente 1 — Modelos y tipos
Archivos: types/auth.ts, models/User.ts
Lee el schema de BD en database/schema.sql
Define tipos TypeScript e interfaces que reflejen ese schema
Incluye DTOs para login, register, forgot-password

Agente 2 — Servicio y lógica  
Archivos: services/auth.service.ts
Implementa las funciones: login, register, logout, refreshToken, forgotPassword
Usa los tipos del Agente 1 (types/auth.ts)
Inyecta dependencias via constructor

Agente 3 — Tests
Archivo: tests/auth.test.ts
Tests unitarios para login exitoso, login fallido, token expirado, registro duplicado
Usa mocks para el servicio

Todos los agentes: dime qué archivos creaste y qué funciones exportaste."`}</BlogCode>

      <BlogH2>Ejemplo práctico 3: Feature completa</BlogH2>
      <BlogP>
        Una feature real implica frontend + backend + tests. Con agentes en
        paralelo puedes desarrollar las 3 capas simultáneamente:
      </BlogP>
      <BlogCode>{`"Implementa la feature 'Lista de amigos' en 3 agentes:

Agente 1 — Backend
Archivos: routes/friends.ts, services/friends.service.ts
Endpoints: GET /friends, POST /friends/request, POST /friends/accept
Lee el modelo User y usa los patrones de auth.service.ts
Validación con Zod, errores con HTTP exceptions

Agente 2 — Frontend
Archivos: components/friends/FriendList.tsx, FriendRequest.tsx
Lee el diseño de UserCard.tsx para mantener consistencia
FriendList: tabla con avatar, nombre, email, acciones
FriendRequest: formulario de búsqueda por email + botón enviar
Estados: loading, empty, error, datos

Agente 3 — Tests E2E  
Archivos: tests/friends.test.ts
Tests: enviar solicitud, aceptar, rechazar, listar amigos
Usa fetch y asserts básicos

Usad los mismos tipos/interfaces para la respuesta API:
{ success: boolean, data: any, error?: string }"`}</BlogCode>

      <BlogH2>Buenas prácticas</BlogH2>
      <BlogUl>
        <BlogLi>
          <strong>Divide por archivos, no por funciones.</strong> Cada agente
          debe tener sus propios archivos destino. Si dos agentes escriben en el
          mismo archivo, el último gana
        </BlogLi>
        <BlogLi>
          <strong>Define interfaces compartidas de antemano.</strong> Si los
          agentes necesitan tipos comunes, defínelos en el prompt principal para
          que todos los usen
        </BlogLi>
        <BlogLi>
          <strong>Pide un resumen a cada agente.</strong> Al final de cada
          tarea, pide al agente que liste los archivos creados/modificados. Así
          puedes verificar sin releer todo
        </BlogLi>
        <BlogLi>
          <strong>No más de 4-5 agentes por lote.</strong> Cada agente gasta
          tokens y contexto. Más de 5 satura la ventana de contexto del
          orquestador y reduce la calidad de las respuestas
        </BlogLi>
        <BlogLi>
          <strong>Usa nombres de archivo únicos.</strong> Si dos agentes crean
          un archivo llamado <BlogInlineCode>utils.ts</BlogInlineCode> en
          diferentes rutas, no hay conflicto. Si lo crean en la misma ruta, sí
        </BlogLi>
        <BlogLi>
          <strong>Haz una pasada de integración al final.</strong> Después de
          que todos los agentes terminen, pide a un agente que revise los
          cambios y unifique estilos, imports y convenciones
        </BlogLi>
      </BlogUl>

      <BlogH2>Contraindicaciones</BlogH2>
      <BlogP>
        El paralelismo no siempre es la mejor opción. Evítalo cuando:
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Las tareas comparten estado mutable.</strong> Si dos agentes
          modifican la misma variable global, base de datos o archivo de
          configuración
        </BlogLi>
        <BlogLi>
          <strong>La tarea es exploratoria.</strong> Si no sabes exactamente qué
          archivos crear o qué solución implementar, un solo agente explorando
          es más efectivo que varios divergiendo
        </BlogLi>
        <BlogLi>
          <strong>El proyecto es muy pequeño.</strong> Para cambios de 1-2
          archivos, el overhead de lanzar agentes en paralelo no compensa
        </BlogLi>
        <BlogLi>
          <strong>Hay dependencias secuenciales estrictas.</strong> Si la tarea
          B necesita el resultado de la tarea A, no puedes paralelizarlas
        </BlogLi>
      </BlogUl>

      <BlogCallout type="done">
        Los agentes en paralelo multiplican tu velocidad cuando se usan bien. La
        clave está en la división del trabajo: archivos independientes,
        interfaces compartidas, prompts específicos. Practica con features
        pequeñas y escala progresivamente.
      </BlogCallout>
    </article>
  );
}
