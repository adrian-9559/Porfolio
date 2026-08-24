"use client";
import { useState } from "react";

import {
  BlogH2,
  BlogP,
  BlogCode,
  BlogInlineCode,
  BlogCallout,
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

export default function NestJsContentEn() {
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
        NestJS: structured APIs with TypeScript
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        NestJS is the framework for building backend APIs in Node.js with
        TypeScript in a structured, scalable way. Based on decorators and a
        module-based architecture, it gives you organization, validation,
        authentication, and documentation from day one. It requires knowing
        TypeScript and some Node/Express.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="what-is">What is NestJS</BlogH2>

      <BlogP>
        NestJS is a progressive backend framework for Node.js, written entirely
        in TypeScript. It was born in 2017 and is inspired by Angular's
        architecture: <strong>decorators</strong> to define routes, built-in{" "}
        <strong>dependency injection</strong>, and a clear separation into
        modules, controllers, and services.
      </BlogP>

      <BlogP>
        On top of Express (or Fastify, depending on configuration) it adds a
        layer of structure that Express does not enforce: routes are grouped
        into <strong>modules</strong>, each module declares which controllers it
        exposes and which services it provides, and the framework wires
        everything together. The result is that a large project does not become
        a mess of loose middlewares.
      </BlogP>

      <BlogCallout type="info">
        Quick comparison: Express lets you organize the code however you want
        (total freedom, total risk). NestJS enforces a clear architecture: each
        feature lives in a module with its controller (HTTP), its service
        (business logic), and its DTOs (data validation). The cost is a bit more
        initial code; the benefit is consistency at scale.
      </BlogCallout>

      <BlogP>
        The NestJS ecosystem is complete: TypeORM or Prisma for databases,
        Passport/JWT for authentication, Swagger for documentation, queues,
        WebSockets, GraphQL, and built-in unit/e2e testing. All with the same
        decorator pattern.
      </BlogP>

      <BlogH2 id="cli">CLI and creating a project</BlogH2>

      <BlogP>
        The NestJS CLI is essential: it generates projects and pieces (modules,
        controllers, services) with a single command:
      </BlogP>

      <BlogCode>{`# Install the CLI globally
npm i -g @nestjs/cli

# Create a new project
nest new my-api

# Enter and start in development mode
cd my-api
npm run start:dev`}</BlogCode>

      <BlogP>
        <BlogInlineCode>nest new</BlogInlineCode> asks for the package manager
        (npm, yarn, or pnpm) and generates the standard structure:
      </BlogP>

      <BlogCode>{`my-api/
├── src/
│   ├── app.controller.ts     # root controller
│   ├── app.controller.spec.ts# unit tests
│   ├── app.module.ts         # root module
│   ├── app.service.ts        # root service
│   └── main.ts               # entry point
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── nest-cli.json
├── package.json
└── tsconfig.json`}</BlogCode>

      <BlogP>
        The <BlogInlineCode>main.ts</BlogInlineCode> entry point creates the
        application from the root module:
      </BlogP>

      <BlogCode>{`import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();`}</BlogCode>

      <BlogP>
        With <BlogInlineCode>npm run start:dev</BlogInlineCode> the server
        hot-reloads on every change. Check that it responds at{" "}
        <BlogInlineCode>http://localhost:3000</BlogInlineCode>.
      </BlogP>

      <BlogCallout type="tip">
        Generate pieces with the CLI instead of copying code by hand:{" "}
        <BlogInlineCode>nest g module tasks</BlogInlineCode>,{" "}
        <BlogInlineCode>nest g controller tasks</BlogInlineCode>, and{" "}
        <BlogInlineCode>nest g service tasks</BlogInlineCode>. They create the
        files and register them in the module automatically.
      </BlogCallout>

      <BlogH2 id="modules">Modules</BlogH2>

      <BlogP>
        A <strong>module</strong> is the unit of organization. It is declared
        with the <BlogInlineCode>@Module()</BlogInlineCode> decorator and
        receives: <BlogInlineCode>controllers</BlogInlineCode> (routes it
        exposes), <BlogInlineCode>providers</BlogInlineCode> (injectable
        services), and <BlogInlineCode>imports</BlogInlineCode> (other modules
        it needs):
      </BlogP>

      <BlogCode>{`import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}`}</BlogCode>

      <BlogP>
        Each feature of the application lives in its own module. For a service
        of one module to be visible in another, you must{" "}
        <BlogInlineCode>exports</BlogInlineCode> it:
      </BlogP>

      <BlogCode>{`import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Module({
  providers: [NotificationsService],
  exports: [NotificationsService], // visible for other modules
})
export class NotificationsModule {}`}</BlogCode>

      <BlogP>
        And the root <BlogInlineCode>AppModule</BlogInlineCode> imports all the
        others:
      </BlogP>

      <BlogCode>{`import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [TasksModule, NotificationsModule],
})
export class AppModule {}`}</BlogCode>

      <BlogH2 id="controllers">Controllers</BlogH2>

      <BlogP>
        A <strong>controller</strong> defines the HTTP routes of a module. It is
        declared with <BlogInlineCode>@Controller('path')</BlogInlineCode> and
        each method exposes an endpoint with a method decorator:{" "}
        <BlogInlineCode>@Get</BlogInlineCode>,{" "}
        <BlogInlineCode>@Post</BlogInlineCode>,{" "}
        <BlogInlineCode>@Patch</BlogInlineCode>,{" "}
        <BlogInlineCode>@Delete</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // GET /tasks?done=true
  @Get()
  list(@Query('done') done?: string) {
    return this.tasksService.list();
  }

  // GET /tasks/42
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.tasksService.getOne(id);
  }

  // POST /tasks  with JSON body
  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }
}`}</BlogCode>

      <BlogCallout type="info">
        Parameter decorators extract data from the request:{" "}
        <BlogInlineCode>@Param('id')</BlogInlineCode> reads a route parameter,{" "}
        <BlogInlineCode>@Query()</BlogInlineCode> the query params, and{" "}
        <BlogInlineCode>@Body()</BlogInlineCode> the JSON body. In{" "}
        <BlogInlineCode>main.ts</BlogInlineCode> you can add{" "}
        <BlogInlineCode>app.enableCors()</BlogInlineCode> if the frontend lives
        on another domain.
      </BlogCallout>

      <BlogP>
        Status codes are automatic: 200/201 for successful responses, and
        exceptions thrown from the service produce correct HTTP errors. For
        responses with a specific code use{" "}
        <BlogInlineCode>@HttpCode(201)</BlogInlineCode>.
      </BlogP>

      <BlogH2 id="services">Services and dependency injection</BlogH2>

      <BlogP>
        A <strong>service</strong> contains the business logic. It is marked
        with <BlogInlineCode>@Injectable()</BlogInlineCode> and injected into
        the controller through the constructor. NestJS resolves dependencies
        automatically: you never instantiate services by hand.
      </BlogP>

      <BlogCode>{`import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

export interface Task {
  id: string;
  title: string;
  done: boolean;
}

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  list(): Task[] {
    return this.tasks;
  }

  getOne(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  create(dto: CreateTaskDto): Task {
    const task: Task = {
      id: String(this.tasks.length + 1),
      title: dto.title,
      done: false,
    };
    this.tasks.push(task);
    return task;
  }
}`}</BlogCode>

      <BlogCallout type="tip">
        Throwing NestJS exceptions (
        <BlogInlineCode>NotFoundException</BlogInlineCode>,{" "}
        <BlogInlineCode>BadRequestException</BlogInlineCode>,{" "}
        <BlogInlineCode>UnauthorizedException</BlogInlineCode>...) in the
        service turns business logic into correct HTTP responses without
        coupling the service to Express.
      </BlogCallout>

      <BlogP>
        Services are <strong>singletons per module</strong>: everyone that
        injects them shares the same instance. If you need a per-request
        lifecycle, use the{" "}
        <BlogInlineCode>{"@Injectable{ scope: Scope.REQUEST }"}</BlogInlineCode>{" "}
        decorator.
      </BlogP>

      <BlogH2 id="dtos">DTOs and validation</BlogH2>

      <BlogP>
        A <strong>DTO</strong> (Data Transfer Object) defines the shape of the
        input data. With <BlogInlineCode>class-validator</BlogInlineCode> and{" "}
        <BlogInlineCode>class-transformer</BlogInlineCode>, field decorators
        validate the body before it reaches your logic:
      </BlogP>

      <BlogCode>{`# Install the validation dependencies
npm i class-validator class-transformer`}</BlogCode>

      <BlogP>Define the DTO with validation decorators:</BlogP>

      <BlogCode>{`import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Title must be at least 3 characters' })
  title: string;

  @IsOptional()
  @IsBoolean()
  done?: boolean;
}`}</BlogCode>

      <BlogP>
        Enable the <BlogInlineCode>ValidationPipe</BlogInlineCode> globally in{" "}
        <BlogInlineCode>main.ts</BlogInlineCode>. The{" "}
        <BlogInlineCode>whitelist: true</BlogInlineCode> option strips fields
        not declared in the DTO:
      </BlogP>

      <BlogCode>{`import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // strips unknown fields
      forbidNonWhitelisted: true, // or throws 400 if any arrive
      transform: true,            // converts types automatically
    }),
  );
  await app.listen(3000);
}
bootstrap();`}</BlogCode>

      <BlogCallout type="warn">
        Without the global pipe, DTOs are just compile-time typing: if the
        client sends invalid JSON, your service receives it anyway. The{" "}
        <BlogInlineCode>ValidationPipe</BlogInlineCode> is what turns the DTO
        rules into real 400 responses. It is mandatory in production.
      </BlogCallout>

      <BlogP>
        With <BlogInlineCode>transform: true</BlogInlineCode>, query params
        (which always arrive as strings) are converted to the declared type:{" "}
        <BlogInlineCode>@Query('page') page: number</BlogInlineCode> receives a
        real number, not a string.
      </BlogP>

      <BlogH2 id="typeorm">TypeORM + SQLite/PostgreSQL</BlogH2>

      <BlogP>
        To persist data, NestJS integrates with TypeORM through the{" "}
        <BlogInlineCode>@nestjs/typeorm</BlogInlineCode> module. We start with
        SQLite (zero configuration, perfect for development) and switching to
        PostgreSQL is a one-line change:
      </BlogP>

      <BlogCode>{`# SQLite (local development)
npm i @nestjs/typeorm typeorm better-sqlite3

# For PostgreSQL in production
npm i pg`}</BlogCode>

      <BlogP>
        Configure the connection in the{" "}
        <BlogInlineCode>AppModule</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'db.sqlite',
      entities: [Task],
      synchronize: true, // creates tables automatically (dev only)
    }),
    TasksModule,
  ],
})
export class AppModule {}`}</BlogCode>

      <BlogP>
        Define the <strong>entity</strong> that maps to a table:
      </BlogP>

      <BlogCode>{`import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  done: boolean;
}`}</BlogCode>

      <BlogP>
        Inject the <strong>repository</strong> into the service with{" "}
        <BlogInlineCode>@InjectRepository</BlogInlineCode> and register it in
        the module with{" "}
        <BlogInlineCode>TypeOrmModule.forFeature([Task])</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly repo: Repository<Task>,
  ) {}

  list(): Promise<Task[]> {
    return this.repo.find();
  }

  create(dto: CreateTaskDto): Promise<Task> {
    const task = this.repo.create(dto);
    return this.repo.save(task);
  }
}`}</BlogCode>

      <BlogCode>{`import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}`}</BlogCode>

      <BlogCallout type="info">
        The repository pattern separates the database from the business logic:
        the service works with the repository and never writes raw SQL. For
        complex queries, the repository offers{" "}
        <BlogInlineCode>findOne</BlogInlineCode>,{" "}
        <BlogInlineCode>findBy</BlogInlineCode>,{" "}
        <BlogInlineCode>queryBuilder</BlogInlineCode>, and pagination with{" "}
        <BlogInlineCode>take</BlogInlineCode>/
        <BlogInlineCode>skip</BlogInlineCode>.
      </BlogCallout>

      <BlogP>
        For PostgreSQL in production, just change the{" "}
        <BlogInlineCode>forRoot</BlogInlineCode> configuration and add the
        environment variables:
      </BlogP>

      <BlogCode>{`TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Task],
  synchronize: false, // use migrations in production
}),`}</BlogCode>

      <BlogH2 id="guards-jwt">Guards and JWT</BlogH2>

      <BlogP>
        <strong>Guards</strong> decide whether a request can continue. They are
        used for authentication and authorization. For JWT, install the packages
        and configure the module:
      </BlogP>

      <BlogCode>{`npm i @nestjs/jwt`}</BlogCode>

      <BlogCode>{`import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'change-this-in-production',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}`}</BlogCode>

      <BlogP>
        A custom guard verifies the token from the{" "}
        <BlogInlineCode>Authorization: Bearer &lt;token&gt;</BlogInlineCode>{" "}
        header:
      </BlogP>

      <BlogCode>{`import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader: string | undefined = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token not provided');
    }

    const token = authHeader.slice(7);
    try {
      request.user = this.jwtService.verify(token);
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}`}</BlogCode>

      <BlogP>
        Apply the guard to routes or entire controllers with{" "}
        <BlogInlineCode>@UseGuards()</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('profile')
@UseGuards(JwtAuthGuard) // protects all routes of the controller
export class ProfileController {
  @Get()
  data() {
    return { message: 'Access authorized' };
  }
}`}</BlogCode>

      <BlogCallout type="warn">
        The guard only protects the routes where it is applied: a route without{" "}
        <BlogInlineCode>@UseGuards</BlogInlineCode> stays open. By default,
        everything should be protected and only public endpoints (login,
        register, health) should allow access without a token.
      </BlogCallout>

      <BlogH2 id="swagger">Swagger</BlogH2>

      <BlogP>
        Swagger documents your API automatically and gives you an interactive
        interface at <BlogInlineCode>/docs</BlogInlineCode> where you can test
        each endpoint. Install the package and configure the document:
      </BlogP>

      <BlogCode>{`npm i @nestjs/swagger`}</BlogCode>

      <BlogCode>{`import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('Task API built with NestJS')
    .setVersion('1.0')
    .addBearerAuth() // authorization button for JWT in the UI
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();`}</BlogCode>

      <BlogP>
        Enrich controllers and endpoints with description decorators:
      </BlogP>

      <BlogCode>{`import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

@ApiTags('tasks') // groups in the Swagger UI
@Controller('tasks')
export class TasksController {
  @ApiOperation({ summary: 'List all tasks' })
  @Get()
  list() {
    return this.tasksService.list();
  }
}`}</BlogCode>

      <BlogCallout type="tip">
        Swagger uses the return type of each method and the DTOs to generate the
        documentation automatically. With{" "}
        <BlogInlineCode>@ApiBearerAuth()</BlogInlineCode> on the controller and{" "}
        <BlogInlineCode>addBearerAuth()</BlogInlineCode> in the configuration,
        the UI shows the Authorize button to test protected endpoints.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="exercises">Exercises</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Create a TasksModule with a controller that responds to GET /tasks with an empty array."
          hint="Generate with nest g module tasks and nest g controller tasks, or create the files by hand and register them in @Module."
          level="Easy"
          num={1}
          solution={`import { Controller, Get } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  @Get()
  list() {
    return [];
  }
}

import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';

@Module({
  controllers: [TasksController],
})
export class TasksModule {}`}
          title="Module + GET controller"
        />

        <ExerciseCard
          description="Refactor: move the logic to a TasksService injected into the controller. The service keeps an internal array and list() returns it."
          hint="Mark the service with @Injectable(), declare it in providers, and receive it in the controller constructor."
          level="Easy"
          num={2}
          solution={`import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [
    { id: '1', title: 'Learn NestJS', done: false },
  ];

  list() {
    return this.tasks;
  }
}

import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  list() {
    return this.tasksService.list();
  }
}

import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}`}
          title="Service with dependency injection"
        />

        <ExerciseCard
          description="Create a CreateTaskDto with title (string, not empty, minimum 3 characters) and done (optional boolean). Enable the global ValidationPipe and use it in POST /tasks."
          hint="Install class-validator and class-transformer. Configure the pipe with whitelist and transform in main.ts."
          level="Intermediate"
          num={3}
          solution={`import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsOptional()
  @IsBoolean()
  done?: boolean;
}

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );
  await app.listen(3000);
}
bootstrap();`}
          title="DTO with validation"
        />

        <ExerciseCard
          description="Define the Task entity (auto-increment id, title, done with default false) and a service with full CRUD using the TypeORM repository."
          hint="Register TypeOrmModule.forFeature([Task]) in the module and inject Repository with @InjectRepository."
          level="Hard"
          num={4}
          solution={`import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  done: boolean;
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly repo: Repository<Task>,
  ) {}

  list(): Promise<Task[]> {
    return this.repo.find();
  }

  create(dto: CreateTaskDto): Promise<Task> {
    return this.repo.save(this.repo.create(dto));
  }
}`}
          title="TypeORM entity + CRUD"
        />

        <ExerciseCard
          description="Implement a JwtAuthGuard that validates the Authorization header and use it to protect a GET /profile route."
          hint="Implement CanActivate, use JwtService.verify, and throw UnauthorizedException in the invalid cases."
          level="Hard"
          num={5}
          solution={`import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader: string | undefined = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token not provided');
    }

    const token = authHeader.slice(7);
    try {
      request.user = this.jwtService.verify(token);
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  @Get()
  data() {
    return { message: 'Access authorized' };
  }
}`}
          title="Basic JWT guard"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        NestJS turns a typical Express project into a clear, scalable
        architecture: modules that group controllers and services, validation
        with DTOs, persistence with TypeORM, and security with guards. With
        Swagger, your API is documented without extra effort. The next steps are
        TypeORM migrations, Passport for login strategies (local, OAuth),
        testing with <BlogInlineCode>@nestjs/testing</BlogInlineCode>, and
        WebSockets or GraphQL if your application needs them. It is the natural
        choice if you want a serious, maintainable TypeScript backend over time.
      </BlogP>
    </article>
  );
}
