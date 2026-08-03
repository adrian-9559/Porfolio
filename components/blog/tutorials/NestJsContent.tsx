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

export default function NestJsContent() {
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
        NestJS: APIs estructuradas con TypeScript
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        NestJS es el framework para construir APIs backend en Node.js con
        TypeScript de forma estructurada y escalable. Basado en decoradores y en
        una arquitectura por módulos, te da organización, validación,
        autenticación y documentación desde el primer día. Requiere conocer
        TypeScript y algo de Node/Express.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="que-es">Qué es NestJS</BlogH2>

      <BlogP>
        NestJS es un framework backend progresivo para Node.js, escrito
        íntegramente en TypeScript. Nació en 2017 y se inspira en la
        arquitectura de Angular: <strong>decoradores</strong> para definir
        rutas, <strong>inyección de dependencias</strong> integrada y una
        separación clara en módulos, controllers y services.
      </BlogP>

      <BlogP>
        Sobre Express (o Fastify, según configuración) añade una capa de
        estructura que Express no impone: las rutas se agrupan por{" "}
        <strong>módulos</strong>, cada módulo declara qué controllers expone y
        qué services provee, y el framework se encarga de conectar todo. El
        resultado es que un proyecto grande no se convierte en un caos de
        middlewares sueltos.
      </BlogP>

      <BlogCallout type="info">
        Comparación rápida: Express te deja organizar el código como quieras
        (libertad total, riesgo total). NestJS impone una arquitectura clara:
        cada feature vive en un módulo con su controller (HTTP), su service
        (lógica de negocio) y sus DTOs (validación de datos). El coste es algo
        más de código inicial; el beneficio, consistencia a escala.
      </BlogCallout>

      <BlogP>
        El ecosistema de NestJS es completo: TypeORM o Prisma para bases de
        datos, Passport/JWT para autenticación, Swagger para documentación,
        colas, WebSockets, GraphQL y testing unitario/e2e incluido. Todo con el
        mismo patrón de decoradores.
      </BlogP>

      <BlogH2 id="cli">CLI y crear proyecto</BlogH2>

      <BlogP>
        La CLI de NestJS es imprescindible: genera proyectos y piezas (módulos,
        controllers, services) con un comando:
      </BlogP>

      <BlogCode>{`# Instalar la CLI globalmente
npm i -g @nestjs/cli

# Crear un proyecto nuevo
nest new mi-api

# Entrar y arrancar en modo desarrollo
cd mi-api
npm run start:dev`}</BlogCode>

      <BlogP>
        <BlogInlineCode>nest new</BlogInlineCode> pregunta el gestor de paquetes
        (npm, yarn o pnpm) y genera la estructura estándar:
      </BlogP>

      <BlogCode>{`mi-api/
├── src/
│   ├── app.controller.ts     # controller raíz
│   ├── app.controller.spec.ts# tests unitarios
│   ├── app.module.ts         # módulo raíz
│   ├── app.service.ts        # service raíz
│   └── main.ts               # punto de entrada
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── nest-cli.json
├── package.json
└── tsconfig.json`}</BlogCode>

      <BlogP>
        El punto de entrada <BlogInlineCode>main.ts</BlogInlineCode> crea la
        aplicación a partir del módulo raíz:
      </BlogP>

      <BlogCode>{`import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();`}</BlogCode>

      <BlogP>
        Con <BlogInlineCode>npm run start:dev</BlogInlineCode> el servidor se
        recarga en caliente ante cada cambio. Comprueba que responde en{" "}
        <BlogInlineCode>http://localhost:3000</BlogInlineCode>.
      </BlogP>

      <BlogCallout type="tip">
        Genera piezas con la CLI en vez de copiar código a mano:{" "}
        <BlogInlineCode>nest g module tareas</BlogInlineCode>,{" "}
        <BlogInlineCode>nest g controller tareas</BlogInlineCode> y{" "}
        <BlogInlineCode>nest g service tareas</BlogInlineCode>. Crean los
        archivos y los registran en el módulo automáticamente.
      </BlogCallout>

      <BlogH2 id="modulos">Módulos</BlogH2>

      <BlogP>
        Un <strong>módulo</strong> es la unidad de organización. Se declara con
        el decorador <BlogInlineCode>@Module()</BlogInlineCode> y recibe:{" "}
        <BlogInlineCode>controllers</BlogInlineCode> (rutas que expone),{" "}
        <BlogInlineCode>providers</BlogInlineCode> (services inyectables) e{" "}
        <BlogInlineCode>imports</BlogInlineCode> (otros módulos que necesita):
      </BlogP>

      <BlogCode>{`import { Module } from '@nestjs/common';
import { TareasController } from './tareas.controller';
import { TareasService } from './tareas.service';

@Module({
  controllers: [TareasController],
  providers: [TareasService],
})
export class TareasModule {}`}</BlogCode>

      <BlogP>
        Cada feature de la aplicación vive en su propio módulo. Para que un
        service de un módulo sea visible en otro, hay que{" "}
        <BlogInlineCode>exports</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`import { Module } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';

@Module({
  providers: [NotificacionesService],
  exports: [NotificacionesService], // visible para otros módulos
})
export class NotificacionesModule {}`}</BlogCode>

      <BlogP>
        Y el módulo raíz <BlogInlineCode>AppModule</BlogInlineCode> importa
        todos los demás:
      </BlogP>

      <BlogCode>{`import { Module } from '@nestjs/common';
import { TareasModule } from './tareas/tareas.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';

@Module({
  imports: [TareasModule, NotificacionesModule],
})
export class AppModule {}`}</BlogCode>

      <BlogH2 id="controllers">Controllers</BlogH2>

      <BlogP>
        Un <strong>controller</strong> define las rutas HTTP de un módulo. Se
        declara con <BlogInlineCode>@Controller('ruta')</BlogInlineCode> y cada
        método expone un endpoint con un decorador de método:{" "}
        <BlogInlineCode>@Get</BlogInlineCode>, <BlogInlineCode>@Post</BlogInlineCode>,{" "}
        <BlogInlineCode>@Patch</BlogInlineCode>, <BlogInlineCode>@Delete</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { CrearTareaDto } from './dto/crear-tarea.dto';

@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  // GET /tareas?done=true
  @Get()
  listar(@Query('done') done?: string) {
    return this.tareasService.listar();
  }

  // GET /tareas/42
  @Get(':id')
  obtener(@Param('id') id: string) {
    return this.tareasService.obtener(id);
  }

  // POST /tareas  con body JSON
  @Post()
  crear(@Body() dto: CrearTareaDto) {
    return this.tareasService.crear(dto);
  }
}`}</BlogCode>

      <BlogCallout type="info">
        Los decoradores de parámetros extraen datos de la petición:{" "}
        <BlogInlineCode>@Param('id')</BlogInlineCode> lee un parámetro de ruta,{" "}
        <BlogInlineCode>@Query()</BlogInlineCode> los query params y{" "}
        <BlogInlineCode>@Body()</BlogInlineCode> el JSON del cuerpo. En{" "}
        <BlogInlineCode>main.ts</BlogInlineCode> puedes añadir{" "}
        <BlogInlineCode>app.enableCors()</BlogInlineCode> si el frontend vive en
        otro dominio.
      </BlogCallout>

      <BlogP>
        Los códigos de estado son automáticos: 200/201 para respuestas
        exitosas, y las excepciones lanzadas desde el service producen errores
        HTTP correctos. Para respuestas con código específico usa{" "}
        <BlogInlineCode>@HttpCode(201)</BlogInlineCode>.
      </BlogP>

      <BlogH2 id="services">Services e inyección de dependencias</BlogH2>

      <BlogP>
        Un <strong>service</strong> contiene la lógica de negocio. Se marca con{" "}
        <BlogInlineCode>@Injectable()</BlogInlineCode> y se inyecta en el
        controller mediante el constructor. NestJS resuelve las dependencias
        automáticamente: no instancias services a mano.
      </BlogP>

      <BlogCode>{`import { Injectable, NotFoundException } from '@nestjs/common';
import { CrearTareaDto } from './dto/crear-tarea.dto';

export interface Tarea {
  id: string;
  titulo: string;
  done: boolean;
}

@Injectable()
export class TareasService {
  private tareas: Tarea[] = [];

  listar(): Tarea[] {
    return this.tareas;
  }

  obtener(id: string): Tarea {
    const tarea = this.tareas.find((t) => t.id === id);
    if (!tarea) {
      throw new NotFoundException('Tarea no encontrada');
    }
    return tarea;
  }

  crear(dto: CrearTareaDto): Tarea {
    const tarea: Tarea = {
      id: String(this.tareas.length + 1),
      titulo: dto.titulo,
      done: false,
    };
    this.tareas.push(tarea);
    return tarea;
  }
}`}</BlogCode>

      <BlogCallout type="tip">
        Lanzar excepciones de NestJS (<BlogInlineCode>NotFoundException</BlogInlineCode>,{" "}
        <BlogInlineCode>BadRequestException</BlogInlineCode>,{" "}
        <BlogInlineCode>UnauthorizedException</BlogInlineCode>...) en el service
        convierte la lógica de negocio en respuestas HTTP correctas sin
        acoplar el service a Express.
      </BlogCallout>

      <BlogP>
        Los services son <strong>singletons por módulo</strong>: todos los que
        lo inyectan comparten la misma instancia. Si necesitas un ciclo de vida
        por petición, usa el decorador{" "}
        <BlogInlineCode>{"@Injectable{ scope: Scope.REQUEST }"}</BlogInlineCode>.
      </BlogP>

      <BlogH2 id="dtos">DTOs y validación</BlogH2>

      <BlogP>
        Un <strong>DTO</strong> (Data Transfer Object) define la forma de los
        datos de entrada. Con <BlogInlineCode>class-validator</BlogInlineCode>{" "}
        y <BlogInlineCode>class-transformer</BlogInlineCode>, los decoradores de
        los campos validan el body antes de que llegue a tu lógica:
      </BlogP>

      <BlogCode>{`# Instalar las dependencias de validación
npm i class-validator class-transformer`}</BlogCode>

      <BlogP>
        Define el DTO con decoradores de validación:
      </BlogP>

      <BlogCode>{`import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CrearTareaDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  titulo: string;

  @IsOptional()
  @IsBoolean()
  done?: boolean;
}`}</BlogCode>

      <BlogP>
        Activa el <BlogInlineCode>ValidationPipe</BlogInlineCode> globalmente en{" "}
        <BlogInlineCode>main.ts</BlogInlineCode>. La opción{" "}
        <BlogInlineCode>whitelist: true</BlogInlineCode> elimina campos no
        declarados en el DTO:
      </BlogP>

      <BlogCode>{`import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // descarta campos desconocidos
      forbidNonWhitelisted: true, // o lanza 400 si llegan
      transform: true,        // convierte los tipos automáticamente
    }),
  );
  await app.listen(3000);
}
bootstrap();`}</BlogCode>

      <BlogCallout type="warn">
        Sin el pipe global, los DTOs son solo tipado en tiempo de compilación:
        si el cliente envía JSON inválido, tu service lo recibe igualmente. El{" "}
        <BlogInlineCode>ValidationPipe</BlogInlineCode> es lo que convierte las
        reglas del DTO en respuestas 400 reales. Es obligatorio en producción.
      </BlogCallout>

      <BlogP>
        Con <BlogInlineCode>transform: true</BlogInlineCode>, los query params
        (que siempre llegan como string) se convierten al tipo declarado:{" "}
        <BlogInlineCode>@Query('page') page: number</BlogInlineCode> recibe un
        número real, no un string.
      </BlogP>

      <BlogH2 id="typeorm">TypeORM + SQLite/PostgreSQL</BlogH2>

      <BlogP>
        Para persistir datos, NestJS se integra con TypeORM a través del módulo{" "}
        <BlogInlineCode>@nestjs/typeorm</BlogInlineCode>. Empezamos con SQLite
        (cero configuración, perfecto para desarrollo) y el cambio a PostgreSQL
        es de una línea:
      </BlogP>

      <BlogCode>{`# SQLite (desarrollo local)
npm i @nestjs/typeorm typeorm better-sqlite3

# Para PostgreSQL en producción
npm i pg`}</BlogCode>

      <BlogP>
        Configura la conexión en el <BlogInlineCode>AppModule</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TareasModule } from './tareas/tareas.module';
import { Tarea } from './tareas/tarea.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'db.sqlite',
      entities: [Tarea],
      synchronize: true, // crea las tablas automáticamente (solo dev)
    }),
    TareasModule,
  ],
})
export class AppModule {}`}</BlogCode>

      <BlogP>
        Define la <strong>entidad</strong> que mapea a una tabla:
      </BlogP>

      <BlogCode>{`import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tareas')
export class Tarea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ default: false })
  done: boolean;
}`}</BlogCode>

      <BlogP>
        Inyecta el <strong>repositorio</strong> en el service con{" "}
        <BlogInlineCode>@InjectRepository</BlogInlineCode> y regístralo en el
        módulo con <BlogInlineCode>TypeOrmModule.forFeature([Tarea])</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from './tarea.entity';
import { CrearTareaDto } from './dto/crear-tarea.dto';

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea)
    private readonly repo: Repository<Tarea>,
  ) {}

  listar(): Promise<Tarea[]> {
    return this.repo.find();
  }

  crear(dto: CrearTareaDto): Promise<Tarea> {
    const tarea = this.repo.create(dto);
    return this.repo.save(tarea);
  }
}`}</BlogCode>

      <BlogCode>{`import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarea } from './tarea.entity';
import { TareasController } from './tareas.controller';
import { TareasService } from './tareas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tarea])],
  controllers: [TareasController],
  providers: [TareasService],
})
export class TareasModule {}`}</BlogCode>

      <BlogCallout type="info">
        El patrón repository separa la base de datos de la lógica de negocio:
        el service trabaja con el repositorio y no escribe SQL a mano. Para
        consultas complejas, el repositorio ofrece{" "}
        <BlogInlineCode>findOne</BlogInlineCode>,{" "}
        <BlogInlineCode>findBy</BlogInlineCode>,{" "}
        <BlogInlineCode>queryBuilder</BlogInlineCode> y paginación con{" "}
        <BlogInlineCode>take</BlogInlineCode>/<BlogInlineCode>skip</BlogInlineCode>.
      </BlogCallout>

      <BlogP>
        Para PostgreSQL en producción, solo cambia la configuración de
        <BlogInlineCode>forRoot</BlogInlineCode> y añade las variables de
        entorno:
      </BlogP>

      <BlogCode>{`TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Tarea],
  synchronize: false, // en producción usa migraciones
}),`}</BlogCode>

      <BlogH2 id="guards-jwt">Guards y JWT</BlogH2>

      <BlogP>
        Los <strong>guards</strong> deciden si una petición puede continuar.
        Se usan para autenticación y autorización. Para JWT, instala los
        paquetes y configura el módulo:
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
      secret: process.env.JWT_SECRET || 'cambia-esto-en-produccion',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}`}</BlogCode>

      <BlogP>
        Un guard personalizado verifica el token del header{" "}
        <BlogInlineCode>Authorization: Bearer &lt;token&gt;</BlogInlineCode>:
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
      throw new UnauthorizedException('Token no proporcionado');
    }

    const token = authHeader.slice(7);
    try {
      request.user = this.jwtService.verify(token);
      return true;
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}`}</BlogCode>

      <BlogP>
        Aplica el guard a rutas o controllers enteros con{" "}
        <BlogInlineCode>@UseGuards()</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('perfil')
@UseGuards(JwtAuthGuard) // protege todas las rutas del controller
export class PerfilController {
  @Get()
  datos() {
    return { mensaje: 'Acceso autorizado' };
  }
}`}</BlogCode>

      <BlogCallout type="warn">
        El guard solo protege las rutas donde se aplica: una ruta sin{" "}
        <BlogInlineCode>@UseGuards</BlogInlineCode> queda abierta. Por defecto,
        todo debería estar protegido y solo los endpoints públicos (login,
        registro, health) deberían permitir el acceso sin token.
      </BlogCallout>

      <BlogH2 id="swagger">Swagger</BlogH2>

      <BlogP>
        Swagger documenta tu API automáticamente y te da una interfaz
        interactiva en <BlogInlineCode>/docs</BlogInlineCode> donde probar cada
        endpoint. Instala el paquete y configura el documento:
      </BlogP>

      <BlogCode>{`npm i @nestjs/swagger`}</BlogCode>

      <BlogCode>{`import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Mi API')
    .setDescription('API de tareas construida con NestJS')
    .setVersion('1.0')
    .addBearerAuth() // botón de autorización para JWT en la UI
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();`}</BlogCode>

      <BlogP>
        Enriquece controllers y endpoints con decoradores de descripción:
      </BlogP>

      <BlogCode>{`import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

@ApiTags('tareas') // agrupa en la UI de Swagger
@Controller('tareas')
export class TareasController {
  @ApiOperation({ summary: 'Listar todas las tareas' })
  @Get()
  listar() {
    return this.tareasService.listar();
  }
}`}</BlogCode>

      <BlogCallout type="tip">
        Swagger usa el tipo de retorno de cada método y los DTOs para generar la
        documentación de forma automática. Con{" "}
        <BlogInlineCode>@ApiBearerAuth()</BlogInlineCode> en el controller y{" "}
        <BlogInlineCode>addBearerAuth()</BlogInlineCode> en la configuración,
        la UI muestra el botón Authorize para probar los endpoints protegidos.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Ejercicios</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Crea un módulo TareasModule con un controller que responda GET /tareas con un array vacío."
          hint="Genera con nest g module tareas y nest g controller tareas, o crea los archivos a mano y regístralos en @Module."
          level="Básico"
          num={1}
          solution={`import { Controller, Get } from '@nestjs/common';

@Controller('tareas')
export class TareasController {
  @Get()
  listar() {
    return [];
  }
}

import { Module } from '@nestjs/common';
import { TareasController } from './tareas.controller';

@Module({
  controllers: [TareasController],
})
export class TareasModule {}`}
          title="Módulo + controller GET"
        />

        <ExerciseCard
          description="Refactoriza: mueve la lógica a un TareasService inyectado en el controller. El service mantiene un array interno y listar() lo devuelve."
          hint="Marca el service con @Injectable(), decláralo en providers y recíbelo en el constructor del controller."
          level="Básico"
          num={2}
          solution={`import { Injectable } from '@nestjs/common';

@Injectable()
export class TareasService {
  private tareas = [
    { id: '1', titulo: 'Aprender NestJS', done: false },
  ];

  listar() {
    return this.tareas;
  }
}

import { Controller, Get } from '@nestjs/common';
import { TareasService } from './tareas.service';

@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Get()
  listar() {
    return this.tareasService.listar();
  }
}

import { Module } from '@nestjs/common';
import { TareasController } from './tareas.controller';
import { TareasService } from './tareas.service';

@Module({
  controllers: [TareasController],
  providers: [TareasService],
})
export class TareasModule {}`}
          title="Service con inyección de dependencias"
        />

        <ExerciseCard
          description="Crea un CrearTareaDto con titulo (string, no vacío, mínimo 3 caracteres) y done (booleano opcional). Activa el ValidationPipe global y úsalo en POST /tareas."
          hint="Instala class-validator y class-transformer. Configura el pipe con whitelist y transform en main.ts."
          level="Intermedio"
          num={3}
          solution={`import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CrearTareaDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  titulo: string;

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
          title="DTO con validación"
        />

        <ExerciseCard
          description="Define la entidad Tarea (id autoincremental, titulo, done con default false) y un service con CRUD completo usando el repositorio TypeORM."
          hint="Registra TypeOrmModule.forFeature([Tarea]) en el módulo e inyecta Repository con @InjectRepository."
          level="Avanzado"
          num={4}
          solution={`import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tareas')
export class Tarea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ default: false })
  done: boolean;
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from './tarea.entity';
import { CrearTareaDto } from './dto/crear-tarea.dto';

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea)
    private readonly repo: Repository<Tarea>,
  ) {}

  listar(): Promise<Tarea[]> {
    return this.repo.find();
  }

  crear(dto: CrearTareaDto): Promise<Tarea> {
    return this.repo.save(this.repo.create(dto));
  }
}`}
          title="Entidad TypeORM + CRUD"
        />

        <ExerciseCard
          description="Implementa un JwtAuthGuard que valide el header Authorization y úsalo para proteger una ruta GET /perfil."
          hint="Implementa CanActivate, usa JwtService.verify y lanza UnauthorizedException en los casos inválidos."
          level="Avanzado"
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
      throw new UnauthorizedException('Token no proporcionado');
    }

    const token = authHeader.slice(7);
    try {
      request.user = this.jwtService.verify(token);
      return true;
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('perfil')
@UseGuards(JwtAuthGuard)
export class PerfilController {
  @Get()
  datos() {
    return { mensaje: 'Acceso autorizado' };
  }
}`}
          title="Guard JWT básico"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        NestJS convierte un proyecto Express típico en una arquitectura clara
        y escalable: módulos que agrupan controllers y services, validación con
        DTOs, persistencia con TypeORM y seguridad con guards. Con Swagger, tu
        API queda documentada sin esfuerzo extra. Los siguientes pasos son las
        migraciones con TypeORM, Passport para estrategias de login (local,
        OAuth), testing con <BlogInlineCode>@nestjs/testing</BlogInlineCode> y
        WebSockets o GraphQL si tu aplicación lo necesita. Es la opción natural
        si quieres un backend TypeScript serio y mantenible en el tiempo.
      </BlogP>
    </article>
  );
}
