"use client";
import { useState } from "react";

type SectionId =
  | "intro" | "express-basico" | "rest-api" | "seguridad"
  | "arquitectura" | "proyecto-final" | "ejercicios";

interface SectionDef { id: SectionId; label: string; }
const SECTIONS: SectionDef[] = [
  { id: "intro",          label: "1. Introducción" },
  { id: "express-basico", label: "2. Express básico" },
  { id: "rest-api",       label: "3. REST API" },
  { id: "seguridad",      label: "4. Seguridad" },
  { id: "arquitectura",   label: "5. Arquitectura" },
  { id: "proyecto-final", label: "Proyecto Final" },
  { id: "ejercicios",     label: "Ejercicios" },
];

function Code({ children }: { children: string }) {
  return (
    <pre className="bg-[#0d1117] rounded-xl p-4 overflow-x-auto text-xs leading-relaxed my-4">
      <code className="text-[#e6edf3]">{children.trim()}</code>
    </pre>
  );
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white mt-10 mb-3 first:mt-0">{children}</h2>;
}
function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-semibold text-[#1d1d1f] dark:text-white mt-6 mb-2">{children}</h3>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed text-[#3a3a3c] dark:text-[#aeaeb2] mb-3">{children}</p>;
}
function Callout({ type, children }: { type: "tip" | "warn" | "danger"; children: React.ReactNode }) {
  const styles = {
    tip:    "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300",
    warn:   "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300",
    danger: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300",
  };
  const icons = { tip: "💡", warn: "⚠️", danger: "🚨" };
  return (
    <div className={`border rounded-xl px-4 py-3 my-4 text-sm ${styles[type]}`}>
      <span className="mr-1.5">{icons[type]}</span>{children}
    </div>
  );
}

function SectionIntro() {
  return (
    <>
      <H2>Introducción a Node.js y Express</H2>
      <P>Node.js es un entorno de ejecución de JavaScript sobre el motor V8 de Chrome. Usa un modelo de E/S no bloqueante y orientado a eventos, ideal para APIs y aplicaciones en tiempo real.</P>
      <P>Express es el framework web más popular para Node.js. Minimalista y flexible, ofrece routing, middlewares y una gran cantidad de plugins del ecosistema.</P>
      <Code>{`# Inicializar proyecto
npm init -y
npm install express
npm install -D typescript @types/express ts-node nodemon

# tsconfig.json básico
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true
  }
}`}</Code>
      <Code>{`// src/index.ts - Servidor mínimo
import express from "express";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json()); // parse JSON bodies

app.get("/", (_req, res) => {
  res.json({ mensaje: "¡API funcionando!", version: "1.0.0" });
});

app.listen(PORT, () => {
  console.log(\`Servidor en http://localhost:\${PORT}\`);
});`}</Code>
    </>
  );
}

function SectionExpressBasico() {
  return (
    <>
      <H2>Express: routing y middlewares</H2>
      <H3>Routing</H3>
      <P>Express organiza las rutas por método HTTP y patrón de URL. Puedes usar <code>Router</code> para agrupar rutas relacionadas.</P>
      <Code>{`import { Router, Request, Response } from "express";

const router = Router();

// Parámetros de ruta
router.get("/usuarios/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ id, nombre: "Ana" });
});

// Query params
router.get("/productos", (req: Request, res: Response) => {
  const { pagina = "1", limite = "10", buscar } = req.query;
  res.json({ pagina: Number(pagina), limite: Number(limite), buscar });
});

// Múltiples handlers encadenados
router.get("/perfil",
  autenticar,       // middleware 1
  verificarRol,     // middleware 2
  (req, res) => {   // handler final
    res.json(req.user);
  }
);

export default router;`}</Code>
      <H3>Middlewares</H3>
      <P>Un middleware es una función que recibe <code>(req, res, next)</code>. Puede modificar la solicitud/respuesta o pasar el control al siguiente middleware con <code>next()</code>.</P>
      <Code>{`import { Request, Response, NextFunction } from "express";

// Middleware de logging
function logger(req: Request, res: Response, next: NextFunction) {
  const inicio = Date.now();
  const { method, url } = req;
  res.on("finish", () => {
    const ms = Date.now() - inicio;
    console.log(\`\${method} \${url} \${res.statusCode} - \${ms}ms\`);
  });
  next(); // pasa al siguiente middleware
}

// Middleware de autenticación
function autenticar(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "No autorizado" });
  // verificar token...
  next();
}

// Middleware de manejo de errores (4 parámetros)
function manejarErrores(err: Error, req: Request, res: Response, _next: NextFunction) {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
}

app.use(logger);
app.use("/api", router);
app.use(manejarErrores); // debe ir al final`}</Code>
    </>
  );
}

function SectionRestApi() {
  return (
    <>
      <H2>Construyendo una REST API</H2>
      <H3>CRUD completo</H3>
      <Code>{`// routes/tareas.router.ts
import { Router } from "express";
import { TareasController } from "../controllers/tareas.controller";

const router = Router();
const ctrl   = new TareasController();

router.get("/",        ctrl.listar);    // GET    /api/tareas
router.get("/:id",     ctrl.obtener);   // GET    /api/tareas/:id
router.post("/",       ctrl.crear);     // POST   /api/tareas
router.put("/:id",     ctrl.actualizar);// PUT    /api/tareas/:id
router.delete("/:id",  ctrl.eliminar);  // DELETE /api/tareas/:id

export default router;`}</Code>
      <Code>{`// controllers/tareas.controller.ts
import { Request, Response } from "express";
import { TareasService } from "../services/tareas.service";

export class TareasController {
  private service = new TareasService();

  listar = async (req: Request, res: Response) => {
    const { completada, pagina = "1", limite = "20" } = req.query;
    const tareas = await this.service.listar({
      completada: completada === "true",
      pagina: Number(pagina),
      limite: Number(limite),
    });
    res.json(tareas);
  };

  obtener = async (req: Request, res: Response) => {
    const tarea = await this.service.obtenerPorId(Number(req.params.id));
    if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });
    res.json(tarea);
  };

  crear = async (req: Request, res: Response) => {
    const tarea = await this.service.crear(req.body);
    res.status(201).json(tarea);
  };

  actualizar = async (req: Request, res: Response) => {
    const tarea = await this.service.actualizar(Number(req.params.id), req.body);
    if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });
    res.json(tarea);
  };

  eliminar = async (req: Request, res: Response) => {
    await this.service.eliminar(Number(req.params.id));
    res.status(204).send();
  };
}`}</Code>
      <Callout type="tip">Usa los códigos HTTP correctos: 201 para recursos creados, 204 para eliminaciones exitosas sin cuerpo, 404 para no encontrado, 422 para validación fallida.</Callout>
    </>
  );
}

function SectionSeguridad() {
  return (
    <>
      <H2>Seguridad</H2>
      <H3>CORS y Helmet</H3>
      <Code>{`import cors    from "cors";
import helmet  from "helmet";

// Helmet: cabeceras de seguridad HTTP
app.use(helmet());

// CORS: controla qué orígenes pueden acceder
const corsOptions = {
  origin: (origin: string | undefined, callback: Function) => {
    const permitidos = ["https://misitioweb.com", "http://localhost:3000"];
    if (!origin || permitidos.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS: origen no permitido"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));`}</Code>
      <H3>Autenticación con JWT</H3>
      <Code>{`import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET!;

// Generar token al hacer login
async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const usuario = await UsuariosRepo.findByEmail(email);
  if (!usuario) return res.status(401).json({ error: "Credenciales inválidas" });

  const valido = await bcrypt.compare(password, usuario.passwordHash);
  if (!valido)  return res.status(401).json({ error: "Credenciales inválidas" });

  const token = jwt.sign(
    { sub: usuario.id, rol: usuario.rol },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
  res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre } });
}

// Middleware de verificación
function verificarJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Token requerido" });
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { sub: number; rol: string };
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
}`}</Code>
      <H3>Validación con Zod</H3>
      <Code>{`import { z } from "zod";

const CrearTareaSchema = z.object({
  titulo:      z.string().min(1).max(200),
  descripcion: z.string().max(1000).optional(),
  prioridad:   z.enum(["alta", "media", "baja"]).default("media"),
  fechaLimite: z.coerce.date().optional(),
});

function validar(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(422).json({ errores: result.error.flatten() });
    }
    req.body = result.data;
    next();
  };
}

router.post("/", validar(CrearTareaSchema), ctrl.crear);`}</Code>
      <Callout type="danger">Nunca almacenes contraseñas en texto plano. Usa siempre bcrypt o argon2 con al menos 10 rondas de salt.</Callout>
    </>
  );
}

function SectionArquitectura() {
  return (
    <>
      <H2>Arquitectura: Controllers / Services / Repositories</H2>
      <P>Separar la lógica en capas hace el código más testeable y mantenible. El controller maneja HTTP, el service contiene la lógica de negocio, y el repository abstrae el acceso a datos.</P>
      <Code>{`// Estructura de carpetas
src/
├── controllers/     # Maneja req/res HTTP
│   └── tareas.controller.ts
├── services/        # Lógica de negocio
│   └── tareas.service.ts
├── repositories/    # Acceso a datos
│   └── tareas.repository.ts
├── middlewares/     # Auth, logging, validación
├── routes/          # Definición de rutas
├── types/           # Interfaces TypeScript
└── index.ts         # Punto de entrada`}</Code>
      <Code>{`// services/tareas.service.ts
import { TareasRepository } from "../repositories/tareas.repository";
import { CrearTareaDto, Tarea } from "../types/tarea.types";

export class TareasService {
  constructor(private repo = new TareasRepository()) {}

  async listar(filtros: { completada?: boolean; pagina: number; limite: number }) {
    const offset = (filtros.pagina - 1) * filtros.limite;
    const [tareas, total] = await Promise.all([
      this.repo.findMany({ ...filtros, offset }),
      this.repo.count(filtros),
    ]);
    return { tareas, total, pagina: filtros.pagina, limite: filtros.limite };
  }

  async crear(dto: CrearTareaDto): Promise<Tarea> {
    // Lógica de negocio: validaciones, transformaciones
    return this.repo.create({ ...dto, completada: false, creadaEn: new Date() });
  }

  async completar(id: number): Promise<Tarea | null> {
    const tarea = await this.repo.findById(id);
    if (!tarea) return null;
    if (tarea.completada) return tarea; // ya completada
    return this.repo.update(id, { completada: true, completadaEn: new Date() });
  }
}`}</Code>
    </>
  );
}

function SectionProyecto() {
  return (
    <>
      <H2>Proyecto Final: REST API con autenticación</H2>
      <P>API completa para gestión de tareas con registro, login con JWT y operaciones CRUD protegidas.</P>
      <Code>{`// src/index.ts - Punto de entrada completo
import express    from "express";
import cors       from "cors";
import helmet     from "helmet";
import { authRouter }   from "./routes/auth.routes";
import { tareasRouter } from "./routes/tareas.routes";
import { manejarErrores } from "./middlewares/error.middleware";

const app = express();

// Middlewares globales
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "1mb" }));

// Rutas
app.use("/api/auth",   authRouter);
app.use("/api/tareas", tareasRouter);

// Health check
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// Manejo de errores (debe ir al final)
app.use(manejarErrores);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(\`API en http://localhost:\${PORT}\`));`}</Code>
      <Code>{`// routes/auth.routes.ts
import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt    from "jsonwebtoken";
import { validar } from "../middlewares/validar.middleware";
import { db } from "../db";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET!;

const RegistroSchema = z.object({
  nombre:   z.string().min(2),
  email:    z.string().email(),
  password: z.string().min(8),
});

// POST /api/auth/registro
router.post("/registro", validar(RegistroSchema), async (req, res, next) => {
  try {
    const { nombre, email, password } = req.body;
    const existe = await db.usuario.findUnique({ where: { email } });
    if (existe) return res.status(409).json({ error: "Email ya registrado" });

    const hash = await bcrypt.hash(password, 12);
    const usuario = await db.usuario.create({
      data: { nombre, email, passwordHash: hash },
      select: { id: true, nombre: true, email: true },
    });
    res.status(201).json(usuario);
  } catch (err) { next(err); }
});

// POST /api/auth/login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const usuario = await db.usuario.findUnique({ where: { email } });
    if (!usuario) return res.status(401).json({ error: "Credenciales inválidas" });

    const valido = await bcrypt.compare(password, usuario.passwordHash);
    if (!valido)  return res.status(401).json({ error: "Credenciales inválidas" });

    const token = jwt.sign({ sub: usuario.id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre } });
  } catch (err) { next(err); }
});

export { router as authRouter };`}</Code>
      <Code>{`# Variables de entorno (.env)
PORT=3000
DATABASE_URL=postgresql://user:pass@localhost:5432/mibd
JWT_SECRET=un-secreto-muy-largo-y-aleatorio
CORS_ORIGIN=http://localhost:5173

# Probar la API con curl
curl -X POST http://localhost:3000/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"ana@ejemplo.com","password":"secreta123"}'

curl http://localhost:3000/api/tareas \\
  -H "Authorization: Bearer <token>"`}</Code>
      <Callout type="tip">Usa <code>prisma</code> como ORM para TypeScript. Ofrece migraciones, type-safety y una DX excelente con cualquier base de datos SQL o MongoDB.</Callout>
    </>
  );
}

function ExerciseCard({ num, title, level, description, hint, solution }: {
  num: number; title: string; level: "Básico" | "Intermedio" | "Avanzado";
  description: string; hint?: string; solution?: string;
}) {
  const [open, setOpen] = useState(false);
  const levelColor = { Básico: "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400", Intermedio: "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400", Avanzado: "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400" }[level];
  return (
    <div className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full px-4 py-3 flex items-center justify-between gap-3 hover:bg-black/3 dark:hover:bg-white/3 transition-colors text-left">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center shrink-0">{num}</span>
          <span className="text-sm font-medium text-[#1d1d1f] dark:text-white">{title}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor}`}>{level}</span>
          <span className="text-[#aeaeb2] text-xs">{open ? "▲" : "▼"}</span>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-black/8 dark:border-white/8 pt-3 space-y-3">
          <p className="text-sm text-[#3a3a3c] dark:text-[#aeaeb2]">{description}</p>
          {hint && <div className="bg-green-50 dark:bg-green-950/20 rounded-xl px-3 py-2 text-xs text-green-800 dark:text-green-300"><strong>Pista:</strong> {hint}</div>}
          {solution && <Code>{solution}</Code>}
        </div>
      )}
    </div>
  );
}

function SEjercicios() {
  return (
    <>
      <H2>Ejercicios de Node.js + Express</H2>
      <P>Practica construyendo APIs reales con estos ejercicios. Asegúrate de tener Node.js instalado antes de comenzar.</P>
      <div className="space-y-3 mt-6">
        <ExerciseCard num={1} title="Servidor con rutas básicas" level="Básico"
          description="Crea un servidor Express con tres rutas: GET / (bienvenida), GET /salud (status 200 con JSON) y una ruta 404 para rutas no encontradas."
          hint="Usa express(), app.get() y app.use() para el 404. El middleware de 404 va al final de todas las rutas."
          solution={`const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ mensaje: "¡Bienvenido a la API!" });
});

app.get("/salud", (req, res) => {
  res.status(200).json({ estado: "ok", timestamp: new Date().toISOString() });
});

// Middleware 404 — siempre al final
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada", path: req.path });
});

app.listen(PORT, () => console.log(\`Servidor en http://localhost:\${PORT}\`));`} />

        <ExerciseCard num={2} title="CRUD en memoria" level="Básico"
          description="Implementa un CRUD completo para una colección de productos (id, nombre, precio) almacenada en un array en memoria. Rutas: GET /productos, GET /productos/:id, POST /productos, PUT /productos/:id, DELETE /productos/:id."
          hint="Usa let productos = [] y un contador de id. express.json() como middleware para parsear el body."
          solution={`const express = require("express");
const app = express();
app.use(express.json());

let productos = [];
let nextId = 1;

app.get("/productos", (req, res) => res.json(productos));

app.get("/productos/:id", (req, res) => {
  const p = productos.find(p => p.id === +req.params.id);
  if (!p) return res.status(404).json({ error: "No encontrado" });
  res.json(p);
});

app.post("/productos", (req, res) => {
  const { nombre, precio } = req.body;
  if (!nombre || precio == null) return res.status(400).json({ error: "nombre y precio son requeridos" });
  const nuevo = { id: nextId++, nombre, precio };
  productos.push(nuevo);
  res.status(201).json(nuevo);
});

app.put("/productos/:id", (req, res) => {
  const idx = productos.findIndex(p => p.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: "No encontrado" });
  productos[idx] = { ...productos[idx], ...req.body };
  res.json(productos[idx]);
});

app.delete("/productos/:id", (req, res) => {
  const idx = productos.findIndex(p => p.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: "No encontrado" });
  productos.splice(idx, 1);
  res.status(204).send();
});

app.listen(3000);`} />

        <ExerciseCard num={3} title="Middleware de autenticación JWT" level="Intermedio"
          description="Crea un middleware que valide un Bearer token JWT en las rutas protegidas. Si el token es inválido o no existe, responde con 401. Añade una ruta POST /login que genere el token."
          hint="Usa la librería jsonwebtoken. El middleware lee req.headers.authorization, extrae el token y llama jwt.verify()."
          solution={`const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

const SECRET = "mi_secreto_superseguro";

function autenticar(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }
  try {
    req.usuario = jwt.verify(auth.slice(7), SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
}

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  // Aquí iría la validación real contra la BD
  if (email === "admin@test.com" && password === "1234") {
    const token = jwt.sign({ email, rol: "admin" }, SECRET, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Credenciales inválidas" });
  }
});

app.get("/perfil", autenticar, (req, res) => {
  res.json({ mensaje: "Ruta protegida", usuario: req.usuario });
});

app.listen(3000);`} />

        <ExerciseCard num={4} title="Rate limiting personalizado" level="Intermedio"
          description="Implementa un middleware de rate limiting que permita máximo 10 peticiones por IP en una ventana de 60 segundos. Devuelve 429 cuando se excede el límite."
          hint="Usa un Map donde la clave es la IP y el valor es { count, resetTime }. Comprueba si resetTime ya pasó para reiniciar el contador."
          solution={`function rateLimiter(maxPeticiones, ventanaMs) {
  const peticionesIP = new Map();

  return (req, res, next) => {
    const ip = req.ip;
    const ahora = Date.now();
    const registro = peticionesIP.get(ip);

    if (!registro || ahora > registro.resetTime) {
      peticionesIP.set(ip, { count: 1, resetTime: ahora + ventanaMs });
      return next();
    }

    if (registro.count >= maxPeticiones) {
      const retryMs = Math.ceil((registro.resetTime - ahora) / 1000);
      res.setHeader("Retry-After", retryMs);
      return res.status(429).json({
        error: "Demasiadas peticiones",
        reintentarEn: \`\${retryMs} segundos\`
      });
    }

    registro.count++;
    next();
  };
}

// Uso: máx 10 peticiones por IP en 60 segundos
app.use("/api", rateLimiter(10, 60 * 1000));`} />

        <ExerciseCard num={5} title="API con validación Zod y manejo de errores global" level="Avanzado"
          description="Crea una API con validación de body usando Zod y un middleware global de manejo de errores que diferencie entre errores de validación (400), errores de negocio personalizados (4xx) y errores inesperados (500)."
          hint="Lanza clases de error personalizadas (AppError) desde los controllers. El middleware global (4 params) los captura y responde adecuadamente."
          solution={`const { z } = require("zod");

// Error personalizado
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Schema Zod
const crearUsuarioSchema = z.object({
  nombre: z.string().min(2).max(50),
  email: z.string().email(),
  edad:  z.number().int().min(18).max(120),
});

// Controller
app.post("/usuarios", (req, res, next) => {
  try {
    const datos = crearUsuarioSchema.parse(req.body);
    // ... guardar en BD
    res.status(201).json({ success: true, data: datos });
  } catch (err) {
    next(err); // pasa al middleware global
  }
});

// Middleware global de errores (4 parámetros)
app.use((err, req, res, next) => {
  if (err instanceof z.ZodError) {
    return res.status(400).json({ error: "Validación fallida", detalles: err.errors });
  }
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  console.error(err);
  res.status(500).json({ error: "Error interno del servidor" });
});`} />
      </div>
    </>
  );
}

export default function NodeExpressContent() {
  const [active, setActive] = useState<SectionId>(SECTIONS[0].id);

  const renderSection = () => {
    switch (active) {
      case "intro":          return <SectionIntro />;
      case "express-basico": return <SectionExpressBasico />;
      case "rest-api":       return <SectionRestApi />;
      case "seguridad":      return <SectionSeguridad />;
      case "arquitectura":   return <SectionArquitectura />;
      case "proyecto-final": return <SectionProyecto />;
      case "ejercicios":     return <SEjercicios />;
    }
  };

  return (
    <div className="flex gap-6">
      <nav className="hidden lg:flex flex-col gap-0.5 w-44 flex-shrink-0 sticky top-20 self-start">
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)}
            className={`text-left text-xs px-3 py-1.5 rounded-lg transition-colors ${active === s.id ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-semibold" : "text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"}`}>
            {s.label}
          </button>
        ))}
      </nav>
      <div className="flex-1 min-w-0 prose-custom">
        {renderSection()}
      </div>
    </div>
  );
}
