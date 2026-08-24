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

export default function AngularContentEn() {
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
        Angular: components to enterprise apps
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Angular is Google's framework for building complete web applications:
        components, routing, dependency injection, and HTTP included out of the
        box. This tutorial takes you from creating your first project to an app
        with services and routes. Conceptual prerequisite: TypeScript.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="que-es">What is Angular?</BlogH2>

      <BlogP>
        Angular is a complete frontend framework maintained by Google. Unlike
        libraries that only render views, Angular gives you everything you need
        for an enterprise application out of the box: a component system with
        templates, a router, forms, an HTTP client, dependency injection, and
        integrated testing tools.
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Complete framework:</strong> you don't need to pick a
          combination of libraries; Angular makes the decisions for you.
        </BlogLi>
        <BlogLi>
          <strong>Native TypeScript:</strong> the framework is written in
          TypeScript and requires you to use it.
        </BlogLi>
        <BlogLi>
          <strong>Powerful CLI:</strong>{" "}
          <BlogInlineCode>ng generate</BlogInlineCode> creates components,
          services, modules, and tests with one command.
        </BlogLi>
        <BlogLi>
          <strong>SPA by design:</strong> the router loads views without
          reloading the page.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="info">
        Since Angular 17, <BlogInlineCode>standalone</BlogInlineCode> mode is
        the norm: components no longer need NgModules to be used. Everything in
        this tutorial uses that modern approach.
      </BlogCallout>

      <BlogH2 id="instalar">Install and create a project</BlogH2>

      <BlogP>
        You need Node.js LTS installed. The Angular CLI runs with{" "}
        <BlogInlineCode>npx</BlogInlineCode>, no global installation needed:
      </BlogP>

      <BlogCode>{`npx -p @angular/cli ng new my-app --standalone

# The CLI asks about styles and SSR. Choose SCSS or plain CSS
# and answer "No" to server-side rendering if you want a simple SPA.

cd my-app
ng serve --open   # http://localhost:4200`}</BlogCode>

      <BlogP>
        The <BlogInlineCode>--standalone</BlogInlineCode> flag generates a
        project without NgModules, with independent components. If you forget
        it, Angular 17+ asks you interactively.
      </BlogP>

      <BlogCallout type="warn">
        The CLI version and the framework version must match. Never mix{" "}
        <BlogInlineCode>ng new</BlogInlineCode> from one version with
        dependencies from another in the same{" "}
        <BlogInlineCode>package.json</BlogInlineCode>.
      </BlogCallout>

      <BlogH2 id="estructura">Project structure</BlogH2>

      <BlogP>
        A standalone project generated with the CLI has this anatomy:
      </BlogP>

      <BlogCode>{`my-app/
├── src/
│   ├── main.ts            # app bootstrap
│   ├── app/
│   │   ├── app.config.ts  # global providers (router, http)
│   │   ├── app.routes.ts  # route definitions
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   └── app.component.css
│   ├── index.html
│   └── styles.css
├── angular.json           # workspace config
├── package.json
└── tsconfig.json`}</BlogCode>

      <BlogH3 id="bootstrap">Bootstrapping: main.ts</BlogH3>

      <BlogP>
        <BlogInlineCode>main.ts</BlogInlineCode> starts the application using
        the root component and the global configuration:
      </BlogP>

      <BlogCode>{`import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));`}</BlogCode>

      <BlogH3 id="app-config">Configuration: app.config.ts</BlogH3>

      <BlogP>
        This is where the providers shared by the whole app are registered. A
        freshly created project already includes the router:
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
        Later we will add <BlogInlineCode>provideHttpClient()</BlogInlineCode>{" "}
        here to enable HTTP requests.
      </BlogP>

      <BlogH2 id="componentes">Components and templates</BlogH2>

      <BlogP>
        A component is a TypeScript class decorated with{" "}
        <BlogInlineCode>@Component</BlogInlineCode> that defines the selector,
        the template, and the styles. In standalone mode we declare everything
        in a single file:
      </BlogP>

      <BlogCode>{`import { Component } from '@angular/core';

@Component({
  selector: 'app-greeting',
  standalone: true,
  template: \`
    <h2>{{ name }}</h2>
    <p>You clicked {{ count }} times.</p>
  \`,
})
export class GreetingComponent {
  name = 'Ana';
  count = 0;
}`}</BlogCode>

      <BlogP>
        <strong>Interpolation</strong>{" "}
        <BlogInlineCode>{"{{ }}"}</BlogInlineCode> prints the value of a
        component property into the HTML. Angular re-renders automatically when
        it changes.
      </BlogP>

      <BlogP>
        Modern templates use built-in <strong>control flow</strong> instead of
        structural directives:
      </BlogP>

      <BlogCode>{`@if (user) {
  <p>Welcome, {{ user.name }}.</p>
} @else {
  <p>No active session.</p>
}

@for (item of items; track item.id) {
  <li>{{ item.name }}</li>
} @empty {
  <li>No items.</li>
}`}</BlogCode>

      <BlogCallout type="info">
        <BlogInlineCode>@if</BlogInlineCode> and{" "}
        <BlogInlineCode>@for</BlogInlineCode> are the recommended syntax since
        Angular 17. The legacy <BlogInlineCode>*ngIf</BlogInlineCode> and{" "}
        <BlogInlineCode>*ngFor</BlogInlineCode> still work but are deprecated in
        favor of the new control flow. The{" "}
        <BlogInlineCode>track</BlogInlineCode> on{" "}
        <BlogInlineCode>@for</BlogInlineCode> is required and improves list
        rendering performance.
      </BlogCallout>

      <BlogH2 id="binding">Data binding and events</BlogH2>

      <BlogP>
        Angular distinguishes three data directions between the class and the
        template:
      </BlogP>

      <BlogCode>{`<!-- Property binding: from class to DOM -->
<img [src]="avatarUrl" [alt]="name" />

<!-- Event binding: from DOM to class -->
<button (click)="increment()">Add</button>

<!-- Interpolation: simple read -->
<p>{{ count }}</p>`}</BlogCode>

      <BlogUl>
        <BlogLi>
          <BlogInlineCode>[property]</BlogInlineCode> assigns a class value to
          the HTML attribute/element.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>(event)</BlogInlineCode> listens for an event and
          calls a component method.
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>{"{{ }}"}</BlogInlineCode> displays the value, always
          as text.
        </BlogLi>
      </BlogUl>

      <BlogP>
        For forms, <strong>two-way binding</strong> with{" "}
        <BlogInlineCode>ngModel</BlogInlineCode> keeps the input and the
        property in sync in both directions. It requires importing{" "}
        <BlogInlineCode>FormsModule</BlogInlineCode> in the component:
      </BlogP>

      <BlogCode>{`import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  template: \`
    <input [(ngModel)]="query" placeholder="Search..." />
    <p>Searching: {{ query }}</p>
  \`,
})
export class SearchComponent {
  query = '';
}`}</BlogCode>

      <BlogCallout type="warn">
        <BlogInlineCode>[(ngModel)]</BlogInlineCode> is syntactic sugar for{" "}
        <BlogInlineCode>[ngModel]</BlogInlineCode> +{" "}
        <BlogInlineCode>(ngModelChange)</BlogInlineCode>. Understanding that
        decomposition helps you write your own components with two-way binding.
      </BlogCallout>

      <BlogH2 id="directivas">Directives</BlogH2>

      <BlogP>
        Directives change the behavior or appearance of elements. Angular ships
        with several built-in ones:
      </BlogP>

      <BlogCode>{`<!-- Built-in control flow -->
@if (isLoading) {
  <p>Loading...</p>
}

@switch (status) {
  @case ('ok') { <p>All good</p> }
  @case ('error') { <p>Something failed</p> }
  @default { <p>Unknown status</p> }
}

@for (task of tasks; track task.id; let i = $index) {
  <p>{{ i }}. {{ task.title }}</p>
}`}</BlogCode>

      <BlogP>
        For conditional styles there are{" "}
        <BlogInlineCode>ngClass</BlogInlineCode> and{" "}
        <BlogInlineCode>ngStyle</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass],
  template: \`
    <div [ngClass]="{
      'alert-success': type === 'success',
      'alert-error': type === 'error'
    }">
      {{ message }}
    </div>
  \`,
})
export class AlertComponent {
  type = 'success';
  message = 'Saved correctly';
}`}</BlogCode>

      <BlogP>
        The general rule: <BlogInlineCode>@if/@for/@switch</BlogInlineCode> for
        DOM structure, <BlogInlineCode>ngClass/ngStyle</BlogInlineCode> for
        classes and styles, and custom attribute directives for reusable
        behavior.
      </BlogP>

      <BlogH2 id="services">Services and dependency injection</BlogH2>

      <BlogP>
        A service is a class with reusable logic (HTTP calls, shared state,
        calculations). Angular's <strong>dependency injection</strong> (DI)
        creates and delivers those instances wherever you ask for them, without
        you managing the lifecycle:
      </BlogP>

      <BlogCode>{`import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CounterService {
  private total = 0;

  increment(): number {
    this.total += 1;
    return this.total;
  }
}`}</BlogCode>

      <BlogP>
        <BlogInlineCode>providedIn: 'root'</BlogInlineCode> registers the
        service in the root injector: it is a singleton available across the
        whole app. To consume it inside a component, use the{" "}
        <BlogInlineCode>inject()</BlogInlineCode> function:
      </BlogP>

      <BlogCode>{`import { Component } from '@angular/core';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: \`<button (click)="add()">Total: {{ total }}</button>\`,
})
export class CounterComponent {
  private counterService = inject(CounterService);
  total = 0;

  add() {
    this.total = this.counterService.increment();
  }
}`}</BlogCode>

      <BlogCallout type="info">
        <BlogInlineCode>inject()</BlogInlineCode> is the modern functional form
        of injection, an alternative to the classic constructor{" "}
        <BlogInlineCode>
          constructor(private svc: CounterService)
        </BlogInlineCode>
        . It can only be called inside injection contexts (constructors, field
        initializers, or provider factories).
      </BlogCallout>

      <BlogH2 id="httpclient">HttpClient and APIs</BlogH2>

      <BlogP>
        To consume APIs you first enable{" "}
        <BlogInlineCode>provideHttpClient()</BlogInlineCode> in{" "}
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
        Then the service injects <BlogInlineCode>HttpClient</BlogInlineCode> and
        defines typed methods that return Observables:
      </BlogP>

      <BlogCode>{`import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = inject(HttpClient);
  private api = 'https://jsonplaceholder.typicode.com/users';

  list(): Observable<User[]> {
    return this.http.get<User[]>(this.api);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(\`\${this.api}/\${id}\`);
  }

  create(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.api, user);
  }
}`}</BlogCode>

      <BlogP>
        In the component, the <BlogInlineCode>asyncPipe</BlogInlineCode>{" "}
        subscribes and unsubscribes automatically, avoiding memory leaks:
      </BlogP>

      <BlogCode>{`import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { UsersService } from './users.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [AsyncPipe],
  template: \`
    <ul>
      @for (user of users$ | async; track user.id) {
        <li>{{ user.name }}</li>
      }
    </ul>
  \`,
})
export class UserListComponent {
  private usersService = inject(UsersService);
  users$ = this.usersService.list();
}`}</BlogCode>

      <BlogCallout type="warn">
        Angular uses <strong>RxJS Observables</strong>, not Promises. If you
        prefer Promises you can convert with{" "}
        <BlogInlineCode>firstValueFrom()</BlogInlineCode>. The{" "}
        <BlogInlineCode>asyncPipe</BlogInlineCode> is the idiomatic way and
        avoids manual subscriptions in the component.
      </BlogCallout>

      <BlogH2 id="routing">Routing</BlogH2>

      <BlogP>
        Angular's router maps URLs to components. Routes are declared in{" "}
        <BlogInlineCode>app.routes.ts</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: '**', redirectTo: '' },
];`}</BlogCode>

      <BlogP>
        The root component includes{" "}
        <BlogInlineCode>router-outlet</BlogInlineCode> (where the active route
        renders) and links with <BlogInlineCode>routerLink</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: \`
    <nav>
      <a routerLink="/">Home</a>
      <a routerLink="/users/1">User 1</a>
    </nav>
    <router-outlet />
  \`,
})
export class AppComponent {}`}</BlogCode>

      <BlogP>
        To read route parameters, enable{" "}
        <BlogInlineCode>withComponentInputBinding()</BlogInlineCode> when
        registering the router. The parameter then arrives as a component input:
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
import { UsersService } from './users.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [AsyncPipe],
  template: \`
    @if (user$ | async; as user) {
      <h1>{{ user.name }}</h1>
      <p>{{ user.email }}</p>
    }
  \`,
})
export class UserDetailComponent {
  @Input() id!: string;
  private usersService = inject(UsersService);
  user$ = this.usersService.getById(Number(this.id));
}`}</BlogCode>

      <BlogCallout type="info">
        Classic alternative: inject{" "}
        <BlogInlineCode>ActivatedRoute</BlogInlineCode> and read{" "}
        <BlogInlineCode>snapshot.paramMap.get('id')</BlogInlineCode>.{" "}
        <BlogInlineCode>withComponentInputBinding()</BlogInlineCode> is more
        declarative: the route passes the parameter like an input and your
        component stays testable in isolation.
      </BlogCallout>

      <BlogP>
        With this you have the complete cycle: a component that renders, a
        service that fetches data, a router that navigates. Angular gives you
        clear structure as the app grows, and standalone mode keeps the code
        simple without giving up enterprise scale.
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Exercises</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Create a standalone 'app-greeting' component that shows a welcome message with a 'name' property using interpolation."
          hint="@Component decorator with selector, standalone: true, and a template with {{ }}."
          level="Easy"
          num={1}
          solution={`import { Component } from '@angular/core';

@Component({
  selector: 'app-greeting',
  standalone: true,
  template: \`<h1>Hello, {{ name }}!</h1>\`,
})
export class GreetingComponent {
  name = 'Ana';
}`}
          title="Basic standalone component"
        />

        <ExerciseCard
          description="Given an array of tasks, display them in a list with @for and a track by id. Show a message if the array is empty."
          hint="Use @for (task of tasks; track task.id) and the @empty block."
          level="Easy"
          num={2}
          solution={`@for (task of tasks; track task.id) {
  <li>{{ task.title }}</li>
} @empty {
  <li>No pending tasks.</li>
}

// In the class:
tasks = [
  { id: 1, title: 'Study Angular' },
  { id: 2, title: 'Do exercises' },
];`}
          title="List with @for and @empty"
        />

        <ExerciseCard
          description="Create a service with providedIn: 'root' exposing a method to add and return a running total. Consume it in a component with inject()."
          hint="@Injectable({ providedIn: 'root' }) and the inject() function inside the component."
          level="Intermediate"
          num={3}
          solution={`import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TotalService {
  private total = 0;
  add(n: number): number {
    this.total += n;
    return this.total;
  }
}

// In the component:
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-total',
  standalone: true,
  template: \`<button (click)="add()">Total: {{ total }}</button>\`,
})
export class TotalComponent {
  private totalService = inject(TotalService);
  total = 0;

  add() {
    this.total = this.totalService.add(1);
  }
}`}
          title="Injectable service with inject()"
        />

        <ExerciseCard
          description="Add a 'products/:id' route that passes the parameter to the component as an input using withComponentInputBinding()."
          hint="Register provideRouter(routes, withComponentInputBinding()) and use @Input() id in the component."
          level="Intermediate"
          num={4}
          solution={`// app.routes.ts
export const routes: Routes = [
  { path: 'products/:id', component: ProductDetailComponent },
];

// app.config.ts
providers: [
  provideRouter(routes, withComponentInputBinding()),
];

// product-detail.component.ts
@Component({
  selector: 'app-product-detail',
  standalone: true,
  template: \`<h1>Product {{ id }}</h1>\`,
})
export class ProductDetailComponent {
  @Input() id!: string;
}`}
          title="Route parameter as input"
        />

        <ExerciseCard
          description="Create a service that GETs https://jsonplaceholder.typicode.com/posts and show the titles in a list with the asyncPipe."
          hint="provideHttpClient() in app.config.ts, inject HttpClient, and use the asyncPipe in the template."
          level="Hard"
          num={5}
          solution={`// posts.service.ts
@Injectable({ providedIn: 'root' })
export class PostsService {
  private http = inject(HttpClient);

  list(): Observable<Post[]> {
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
  posts$ = this.postsService.list();
}`}
          title="HTTP call with HttpClient"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        Angular shines in large projects where structure matters: its dependency
        injection, router, and standalone mode give you a solid foundation to
        scale from one component to an enterprise application without losing
        control. Start with a small component, add services when there is shared
        logic, and let the router organize the rest.
      </BlogP>
    </article>
  );
}
