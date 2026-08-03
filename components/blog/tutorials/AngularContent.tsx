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

export default function AngularContent() {
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
          70 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        Angular: componentes a aplicaciones enterprise
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Angular es el framework de Google para construir aplicaciones web
        completas: componentes, routing, inyección de dependencias y HTTP
        incluidos de serie. Este tutorial te lleva desde la creación de tu
        primer proyecto hasta una app con servicios y rutas. Prerequisito
        conceptual: TypeScript.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="que-es">¿Qué es Angular?</BlogH2>

      <BlogP>
        Angular es un framework completo de frontend mantenido por Google.
        A diferencia de bibliotecas que solo renderizan vistas, Angular te da
        todo lo necesario para una aplicación enterprise de fábrica: un
        sistema de componentes con plantillas, enrutador, formularios,
        cliente HTTP, inyección de dependencias y herramientas de testing
        integradas.
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Framework completo:</strong> no necesitas elegir una
          combinación de bibliotecas; Angular trae las decisiones tomadas.
        </BlogLi>
        <BlogLi>
          <strong>TypeScript nativo:</strong> el framework está escrito en
          TypeScript y lo usa de forma obligatoria.
        </BlogLi>
        <BlogLi>
          <strong>CLI potente:</strong>{" "}
          <BlogInlineCode>ng generate</BlogInlineCode> crea componentes,
          servicios, módulos y tests con un comando.
        </BlogLi>
        <BlogLi>
          <strong>SPA por diseño:</strong> el router carga vistas sin recargar
          la página.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="info">
        Desde Angular 17 el modo <BlogInlineCode>standalone</BlogInlineCode>{" "}
        es la norma: los componentes ya no necesitan NgModules para usarse.
        Todo lo de este tutorial usa ese enfoque moderno.
      </BlogCallout>

      <BlogH2 id="instalar">Instalar y crear proyecto</BlogH2>

      <BlogP>
        Necesitas Node.js LTS instalado. La CLI de Angular se ejecuta con{" "}
        <BlogInlineCode>npx</BlogInlineCode>, sin instalación global:
      </BlogP>

      <BlogCode>{`npx -p @angular/cli ng new mi-app --standalone

# El CLI pregunta por estilos y SSR. Elige SCSS o CSS plano
# y responde "No" a server-side rendering si quieres una SPA simple.

cd mi-app
ng serve --open   # http://localhost:4200`}</BlogCode>

      <BlogP>
        El flag <BlogInlineCode>--standalone</BlogInlineCode> genera un
        proyecto sin NgModules, con componentes independientes. Si lo olvidas,
        Angular 17+ lo pregunta interactivamente.
      </BlogP>

      <BlogCallout type="warn">
        La versión de la CLI y la versión del framework deben coincidir.
        Nunca mezcles <BlogInlineCode>ng new</BlogInlineCode> de una versión
        con dependencias de otra en el mismo <BlogInlineCode>package.json</BlogInlineCode>.
      </BlogCallout>

      <BlogH2 id="estructura">Estructura de un proyecto</BlogH2>

      <BlogP>
        Un proyecto standalone generado con el CLI tiene esta anatomía:
      </BlogP>

      <BlogCode>{`mi-app/
├── src/
│   ├── main.ts            # bootstrap de la app
│   ├── app/
│   │   ├── app.config.ts  # providers globales (router, http)
│   │   ├── app.routes.ts  # definición de rutas
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   └── app.component.css
│   ├── index.html
│   └── styles.css
├── angular.json           # config del workspace
├── package.json
└── tsconfig.json`}</BlogCode>

      <BlogH3 id="bootstrap">El arranque: main.ts</BlogH3>

      <BlogP>
        <BlogInlineCode>main.ts</BlogInlineCode> arranca la aplicación
        usando el componente raíz y la configuración global:
      </BlogP>

      <BlogCode>{`import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));`}</BlogCode>

      <BlogH3 id="app-config">La configuración: app.config.ts</BlogH3>

      <BlogP>
        Aquí se registran los providers que toda la app comparte. En un
        proyecto recién creado ya incluye el router:
      </BlogP>

      <BlogCode>{`import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};`}</BlogCode>

      <BlogP>
        Más adelante añadiremos <BlogInlineCode>provideHttpClient()</BlogInlineCode>{" "}
        aquí para habilitar peticiones HTTP.
      </BlogP>

      <BlogH2 id="componentes">Componentes y plantillas</BlogH2>

      <BlogP>
        Un componente es una clase TypeScript decorada con{" "}
        <BlogInlineCode>@Component</BlogInlineCode> que define el selector,
        la plantilla (template) y los estilos. En modo standalone declaramos
        todo en un solo archivo:
      </BlogP>

      <BlogCode>{`import { Component } from '@angular/core';

@Component({
  selector: 'app-saludo',
  standalone: true,
  template: \`
    <h2>{{ nombre }}</h2>
    <p>Has hecho clic {{ contador }} veces.</p>
  \`,
})
export class SaludoComponent {
  nombre = 'Ana';
  contador = 0;
}`}</BlogCode>

      <BlogP>
        La <strong>interpolación</strong> <BlogInlineCode>{"{{ }}"}
        </BlogInlineCode> imprime el valor de una propiedad del componente en
        el HTML. Angular se encarga de re-renderizar cuando cambia.
      </BlogP>

      <BlogP>
        Las plantillas modernas usan <strong>control flow</strong> integrado
        en lugar de directivas estructurales:
      </BlogP>

      <BlogCode>{`@if (usuario) {
  <p>Bienvenido, {{ usuario.nombre }}.</p>
} @else {
  <p>No hay sesión iniciada.</p>
}

@for (item of items; track item.id) {
  <li>{{ item.nombre }}</li>
} @empty {
  <li>No hay elementos.</li>
}`}</BlogCode>

      <BlogCallout type="info">
        <BlogInlineCode>@if</BlogInlineCode> y <BlogInlineCode>@for</BlogInlineCode>{" "}
        son la sintaxis recomendada desde Angular 17. Las antiguas{" "}
        <BlogInlineCode>*ngIf</BlogInlineCode> y <BlogInlineCode>*ngFor</BlogInlineCode>{" "}
        siguen funcionando pero están deprecadas en favor del nuevo control
        flow. El <BlogInlineCode>track</BlogInlineCode> de{" "}
        <BlogInlineCode>@for</BlogInlineCode> es obligatorio y mejora el
        rendimiento de las listas.
      </BlogCallout>

      <BlogH2 id="binding">Data binding y eventos</BlogH2>

      <BlogP>
        Angular distingue tres direcciones de datos entre la clase y la
        plantilla:
      </BlogP>

      <BlogCode>{`<!-- Property binding: de la clase al DOM -->
<img [src]="avatarUrl" [alt]="nombre" />

<!-- Event binding: del DOM a la clase -->
<button (click)="incrementar()">Sumar</button>

<!-- Interpolación: lectura simple -->
<p>{{ contador }}</p>`}</BlogCode>

      <BlogUl>
        <BlogLi>
          <BlogInlineCode>[propiedad]</BlogInlineCode> asigna un valor de la
          clase al atributo/elemento HTML.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>(evento)</BlogInlineCode> escucha un evento y llama
          a un método del componente.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>{"{{ }}"}</BlogInlineCode> muestra el valor, siempre
          en texto.
        </BlogLi>
      </BlogUl>

      <BlogP>
        Para formularios, el <strong>two-way binding</strong> con{" "}
        <BlogInlineCode>ngModel</BlogInlineCode> sincroniza el input con la
        propiedad en ambas direcciones. Requiere importar{" "}
        <BlogInlineCode>FormsModule</BlogInlineCode> en el componente:
      </BlogP>

      <BlogCode>{`import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [FormsModule],
  template: \`
    <input [(ngModel)]="query" placeholder="Buscar..." />
    <p>Buscando: {{ query }}</p>
  \`,
})
export class BuscadorComponent {
  query = '';
}`}</BlogCode>

      <BlogCallout type="warn">
        <BlogInlineCode>[(ngModel)]</BlogInlineCode> es azúcar sintáctico de{" "}
        <BlogInlineCode>[ngModel]</BlogInlineCode> +{" "}
        <BlogInlineCode>(ngModelChange)</BlogInlineCode>. Entender esa
        descomposición te ayuda a escribir tus propios componentes con
        binding bidireccional.
      </BlogCallout>

      <BlogH2 id="directivas">Directivas</BlogH2>

      <BlogP>
        Las directivas modifican el comportamiento o la apariencia de los
        elementos. Angular trae varias integradas:
      </BlogP>

      <BlogCode>{`<!-- Control flow integrado -->
@if (estaCargando) {
  <p>Cargando...</p>
}

@switch (estado) {
  @case ('ok') { <p>Todo correcto</p> }
  @case ('error') { <p>Algo falló</p> }
  @default { <p>Estado desconocido</p> }
}

@for (tarea of tareas; track tarea.id; let i = $index) {
  <p>{{ i }}. {{ tarea.titulo }}</p>
}`}</BlogCode>

      <BlogP>
        Para estilos condicionales están{" "}
        <BlogInlineCode>ngClass</BlogInlineCode> y{" "}
        <BlogInlineCode>ngStyle</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-alerta',
  standalone: true,
  imports: [NgClass],
  template: \`
    <div [ngClass]="{
      'alerta-exito': tipo === 'exito',
      'alerta-error': tipo === 'error'
    }">
      {{ mensaje }}
    </div>
  \`,
})
export class AlertaComponent {
  tipo = 'exito';
  mensaje = 'Guardado correctamente';
}`}</BlogCode>

      <BlogP>
        La regla general: <BlogInlineCode>@if/@for/@switch</BlogInlineCode>{" "}
        para estructura del DOM, <BlogInlineCode>ngClass/ngStyle</BlogInlineCode>{" "}
        para clases y estilos, y directivas de atributo personalizadas para
        comportamiento reutilizable.
      </BlogP>

      <BlogH2 id="services">Services e inyección de dependencias</BlogH2>

      <BlogP>
        Un service es una clase con lógica reutilizable (llamadas HTTP,
        estado compartido, cálculos). La <strong>inyección de dependencias</strong>{" "}
        (DI) de Angular crea y entrega esas instancias donde las pidas, sin
        que tú gestiones el ciclo de vida:
      </BlogP>

      <BlogCode>{`import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContadorService {
  private total = 0;

  incrementar(): number {
    this.total += 1;
    return this.total;
  }
}`}</BlogCode>

      <BlogP>
        <BlogInlineCode>providedIn: 'root'</BlogInlineCode> registra el
        service en el inyector raíz: es un singleton disponible en toda la
        app. Para consumirlo dentro de un componente se usa la función{" "}
        <BlogInlineCode>inject()</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`import { Component } from '@angular/core';
import { ContadorService } from './contador.service';

@Component({
  selector: 'app-contador',
  standalone: true,
  template: \`<button (click)="sumar()">Total: {{ total }}</button>\`,
})
export class ContadorComponent {
  private contadorService = inject(ContadorService);
  total = 0;

  sumar() {
    this.total = this.contadorService.incrementar();
  }
}`}</BlogCode>

      <BlogCallout type="info">
        <BlogInlineCode>inject()</BlogInlineCode> es la forma funcional
        moderna de la inyección, alternativa al constructor clásico{" "}
        <BlogInlineCode>constructor(private svc: ContadorService)</BlogInlineCode>.
        Se llama solo dentro de contextos de inyección (constructores,
        initializers de campos o factories de providers).
      </BlogCallout>

      <BlogH2 id="httpclient">HttpClient y APIs</BlogH2>

      <BlogP>
        Para consumir APIs primero se habilita{" "}
        <BlogInlineCode>provideHttpClient()</BlogInlineCode> en{" "}
        <BlogInlineCode>app.config.ts</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ],
};`}</BlogCode>

      <BlogP>
        Después, el service inyecta <BlogInlineCode>HttpClient</BlogInlineCode>{" "}
        y define métodos tipados que devuelven Observables:
      </BlogP>

      <BlogCode>{`import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private http = inject(HttpClient);
  private api = 'https://jsonplaceholder.typicode.com/users';

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.api);
  }

  obtener(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(\`\${this.api}/\${id}\`);
  }

  crear(usuario: Partial<Usuario>): Observable<Usuario> {
    return this.http.post<Usuario>(this.api, usuario);
  }
}`}</BlogCode>

      <BlogP>
        En el componente, <BlogInlineCode>asyncPipe</BlogInlineCode> se
        suscribe y desuscribe automáticamente, evitando memory leaks:
      </BlogP>

      <BlogCode>{`import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { UsuariosService } from './usuarios.service';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [AsyncPipe],
  template: \`
    <ul>
      @for (usuario of usuarios$ | async; track usuario.id) {
        <li>{{ usuario.nombre }}</li>
      }
    </ul>
  \`,
})
export class ListaUsuariosComponent {
  private usuariosService = inject(UsuariosService);
  usuarios$ = this.usuariosService.listar();
}`}</BlogCode>

      <BlogCallout type="warn">
        Angular usa <strong>Observables de RxJS</strong>, no Promesas. Si
        prefieres Promesas puedes convertir con{" "}
        <BlogInlineCode>firstValueFrom()</BlogInlineCode>. El{" "}
        <BlogInlineCode>asyncPipe</BlogInlineCode> es la forma idiomática y
        evita suscripciones manuales en el componente.
      </BlogCallout>

      <BlogH2 id="routing">Routing</BlogH2>

      <BlogP>
        El router de Angular mapea URLs a componentes. Las rutas se declaran
        en <BlogInlineCode>app.routes.ts</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsuarioDetalleComponent } from './usuario-detalle/usuario-detalle.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'usuarios/:id', component: UsuarioDetalleComponent },
  { path: '**', redirectTo: '' },
];`}</BlogCode>

      <BlogP>
        El componente raíz incluye <BlogInlineCode>router-outlet</BlogInlineCode>{" "}
        (donde se renderiza la ruta activa) y enlaces con{" "}
        <BlogInlineCode>routerLink</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: \`
    <nav>
      <a routerLink="/">Inicio</a>
      <a routerLink="/usuarios/1">Usuario 1</a>
    </nav>
    <router-outlet />
  \`,
})
export class AppComponent {}`}</BlogCode>

      <BlogP>
        Para leer parámetros de la ruta, habilita{" "}
        <BlogInlineCode>withComponentInputBinding()</BlogInlineCode> al
        registrar el router. Así el parámetro llega como input del
        componente:
      </BlogP>

      <BlogCode>{`import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
  ],
};`}</BlogCode>

      <BlogCode>{`import { Component, Input, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { UsuariosService } from './usuarios.service';

@Component({
  selector: 'app-usuario-detalle',
  standalone: true,
  imports: [AsyncPipe],
  template: \`
    @if (usuario$ | async; as usuario) {
      <h1>{{ usuario.nombre }}</h1>
      <p>{{ usuario.email }}</p>
    }
  \`,
})
export class UsuarioDetalleComponent {
  @Input() id!: string;
  private usuariosService = inject(UsuariosService);
  usuario$ = this.usuariosService.obtener(Number(this.id));
}`}</BlogCode>

      <BlogCallout type="info">
        Alternativa clásica: inyectar <BlogInlineCode>ActivatedRoute</BlogInlineCode>{" "}
        y leer <BlogInlineCode>snapshot.paramMap.get('id')</BlogInlineCode>.{" "}
        <BlogInlineCode>withComponentInputBinding()</BlogInlineCode> es más
        declarativo: la ruta pasa el parámetro como si fuera un input y tu
        componente queda testeable de forma aislada.
      </BlogCallout>

      <BlogP>
        Con esto tienes el ciclo completo: componente que renderiza, service
        que pide datos, router que navega. Angular te da estructura clara a
        medida que la app crece, y el modo standalone mantiene el código
        simple sin renunciar a la escala enterprise.
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Ejercicios</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Crea un componente standalone 'app-saludo' que muestre un mensaje de bienvenida con una propiedad 'nombre' usando interpolación."
          hint="Decorador @Component con selector, standalone: true y template con {{ }}."
          level="Básico"
          num={1}
          solution={`import { Component } from '@angular/core';

@Component({
  selector: 'app-saludo',
  standalone: true,
  template: \`<h1>Hola, {{ nombre }}!</h1>\`,
})
export class SaludoComponent {
  nombre = 'Ana';
}`}
          title="Componente standalone básico"
        />

        <ExerciseCard
          description="Dado un array de tareas, muéstralas en una lista con @for y un track por id. Muestra un mensaje si el array está vacío."
          hint="Usa @for (tarea of tareas; track tarea.id) y el bloque @empty."
          level="Básico"
          num={2}
          solution={`@for (tarea of tareas; track tarea.id) {
  <li>{{ tarea.titulo }}</li>
} @empty {
  <li>No hay tareas pendientes.</li>
}

// En la clase:
tareas = [
  { id: 1, titulo: 'Estudiar Angular' },
  { id: 2, titulo: 'Hacer ejercicios' },
];`}
          title="Lista con @for y @empty"
        />

        <ExerciseCard
          description="Crea un service con providedIn: 'root' que exponga un método para sumar y devolver un total acumulado. Consúmelo en un componente con inject()."
          hint="@Injectable({ providedIn: 'root' }) y la función inject() dentro del componente."
          level="Intermedio"
          num={3}
          solution={`import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TotalService {
  private total = 0;
  sumar(n: number): number {
    this.total += n;
    return this.total;
  }
}

// En el componente:
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-total',
  standalone: true,
  template: \`<button (click)="sumar()">Total: {{ total }}</button>\`,
})
export class TotalComponent {
  private totalService = inject(TotalService);
  total = 0;

  sumar() {
    this.total = this.totalService.sumar(1);
  }
}`}
          title="Service inyectable con inject()"
        />

        <ExerciseCard
          description="Añade una ruta 'productos/:id' que pase el parámetro al componente como input usando withComponentInputBinding()."
          hint="Registra provideRouter(routes, withComponentInputBinding()) y usa @Input() id en el componente."
          level="Intermedio"
          num={4}
          solution={`// app.routes.ts
export const routes: Routes = [
  { path: 'productos/:id', component: ProductoDetalleComponent },
];

// app.config.ts
providers: [
  provideRouter(routes, withComponentInputBinding()),
];

// producto-detalle.component.ts
@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  template: \`<h1>Producto {{ id }}</h1>\`,
})
export class ProductoDetalleComponent {
  @Input() id!: string;
}`}
          title="Ruta con parámetro por input"
        />

        <ExerciseCard
          description="Crea un service que haga GET a https://jsonplaceholder.typicode.com/posts y muestra los títulos en una lista con asyncPipe."
          hint="provideHttpClient() en app.config.ts, inyecta HttpClient y usa el asyncPipe en la plantilla."
          level="Avanzado"
          num={5}
          solution={`// posts.service.ts
@Injectable({ providedIn: 'root' })
export class PostsService {
  private http = inject(HttpClient);

  listar(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }
}

// posts.component.ts
@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [AsyncPipe],
  template: \`
    <ul>
      @for (post of posts$ | async; track post.id) {
        <li>{{ post.title }}</li>
      }
    </ul>
  \`,
})
export class PostsComponent {
  private postsService = inject(PostsService);
  posts$ = this.postsService.listar();
}`}
          title="Llamada HTTP con HttpClient"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        Angular brilla en proyectos grandes donde la estructura importa: su
        inyección de dependencias, el router y el modo standalone te dan una
        base sólida para escalar de un componente a una aplicación
        enterprise sin perder el control. Empieza con un componente pequeño,
        añade servicios cuando haya lógica compartida y deja que el router
        organice el resto.
      </BlogP>
    </article>
  );
}
