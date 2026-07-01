"use client";
import { useState } from "react";

import {
  BlogCode,
  BlogH2,
  BlogH3,
  BlogP,
  BlogCallout,
} from "@/components/blog/shared";

type SectionId =
  | "intro"
  | "express-basico"
  | "rest-api"
  | "seguridad"
  | "arquitectura"
  | "proyecto-final"
  | "ejercicios";

interface SectionDef {
  id: SectionId;
  label: string;
}
const SECTIONS: SectionDef[] = [
  { id: "intro", label: "1. Introduction" },
  { id: "express-basico", label: "2. Express basics" },
  { id: "rest-api", label: "3. REST API" },
  { id: "seguridad", label: "4. Security" },
  { id: "arquitectura", label: "5. Architecture" },
  { id: "proyecto-final", label: "Final Project" },
  { id: "ejercicios", label: "Exercises" },
];

function SectionIntro() {
  return (
    <>
      <BlogH2>Introduction to Node.js and Express</BlogH2>
      <BlogP>
        Node.js is a JavaScript runtime built on Chrome's V8 engine.
        It uses a non-blocking, event-driven I/O model, ideal for APIs and
        real-time applications.
      </BlogP>
      <BlogP>
        Express is the most popular web framework for Node.js. Minimalist and
        flexible, it offers routing, middlewares, and a large ecosystem of
        plugins.
      </BlogP>
      <BlogCode>{`# Initialize project
npm init -y
npm install express
npm install -D typescript @types/express ts-node nodemon

# Basic tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true
  }
}`}</BlogCode>
      <BlogCode>{`// src/index.ts - Minimal server
import express from "express";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json()); // parse JSON bodies

app.get("/", (_req, res) => {
  res.json({ message: "API working!", version: "1.0.0" });
});

app.listen(PORT, () => {
  console.log(\`Server at http://localhost:\${PORT}\`);
});`}</BlogCode>
    </>
  );
}

function SectionExpressBasico() {
  return (
    <>
      <BlogH2>Express: routing and middlewares</BlogH2>
      <BlogH3>Routing</BlogH3>
      <BlogP>
        Express organizes routes by HTTP method and URL pattern. You can use{" "}
        <code>Router</code> to group related routes.
      </BlogP>
      <BlogCode>{`import { Router, Request, Response } from "express";

const router = Router();

// Route parameters
router.get("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ id, name: "Anna" });
});

// Query params
router.get("/products", (req: Request, res: Response) => {
  const { page = "1", limit = "10", search } = req.query;
  res.json({ page: Number(page), limit: Number(limit), search });
});

// Multiple chained handlers
router.get("/profile",
  authenticate,       // middleware 1
  checkRole,          // middleware 2
  (req, res) => {     // final handler
    res.json(req.user);
  }
);

export default router;`}</BlogCode>
      <BlogH3>Middlewares</BlogH3>
      <BlogP>
        A middleware is a function that receives <code>(req, res, next)</code>.
        It can modify the request/response or pass control to the next
        middleware with <code>next()</code>.
      </BlogP>
      <BlogCode>{`import { Request, Response, NextFunction } from "express";

// Logging middleware
function logger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  const { method, url } = req;
  res.on("finish", () => {
    const ms = Date.now() - start;
    console.log(\`\${method} \${url} \${res.statusCode} - \${ms}ms\`);
  });
  next(); // passes to next middleware
}

// Authentication middleware
function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  // verify token...
  next();
}

// Error handling middleware (4 parameters)
function handleErrors(err: Error, req: Request, res: Response, _next: NextFunction) {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
}

app.use(logger);
app.use("/api", router);
app.use(handleErrors); // must be last`}</BlogCode>
    </>
  );
}

function SectionRestApi() {
  return (
    <>
      <BlogH2>Building a REST API</BlogH2>
      <BlogH3>Full CRUD</BlogH3>
      <BlogCode>{`// routes/tasks.router.ts
import { Router } from "express";
import { TasksController } from "../controllers/tasks.controller";

const router = Router();
const ctrl   = new TasksController();

router.get("/",        ctrl.list);     // GET    /api/tasks
router.get("/:id",     ctrl.get);      // GET    /api/tasks/:id
router.post("/",       ctrl.create);   // POST   /api/tasks
router.put("/:id",     ctrl.update);   // PUT    /api/tasks/:id
router.delete("/:id",  ctrl.delete);   // DELETE /api/tasks/:id

export default router;`}</BlogCode>
      <BlogCode>{`// controllers/tasks.controller.ts
import { Request, Response } from "express";
import { TasksService } from "../services/tasks.service";

export class TasksController {
  private service = new TasksService();

  list = async (req: Request, res: Response) => {
    const { completed, page = "1", limit = "20" } = req.query;
    const tasks = await this.service.list({
      completed: completed === "true",
      page: Number(page),
      limit: Number(limit),
    });
    res.json(tasks);
  };

  get = async (req: Request, res: Response) => {
    const task = await this.service.getById(Number(req.params.id));
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  };

  create = async (req: Request, res: Response) => {
    const task = await this.service.create(req.body);
    res.status(201).json(task);
  };

  update = async (req: Request, res: Response) => {
    const task = await this.service.update(Number(req.params.id), req.body);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  };

  delete = async (req: Request, res: Response) => {
    await this.service.delete(Number(req.params.id));
    res.status(204).send();
  };
}`}</BlogCode>
      <BlogCallout type="tip">
        Use the correct HTTP status codes: 201 for created resources, 204 for
        successful deletions with no body, 404 for not found, 422 for
        failed validation.
      </BlogCallout>
    </>
  );
}

function SectionSeguridad() {
  return (
    <>
      <BlogH2>Security</BlogH2>
      <BlogH3>CORS and Helmet</BlogH3>
      <BlogCode>{`import cors    from "cors";
import helmet  from "helmet";

// Helmet: security HTTP headers
app.use(helmet());

// CORS: controls which origins can access
const corsOptions = {
  origin: (origin: string | undefined, callback: Function) => {
    const allowed = ["https://mywebsite.com", "http://localhost:3000"];
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS: origin not allowed"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));`}</BlogCode>
      <BlogH3>JWT Authentication</BlogH3>
      <BlogCode>{`import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET!;

// Generate token on login
async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await UsersRepo.findByEmail(email);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid)  return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { sub: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
  res.json({ token, user: { id: user.id, name: user.name } });
}

// Verification middleware
function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Token required" });
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { sub: number; role: string };
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}`}</BlogCode>
      <BlogH3>Validation with Zod</BlogH3>
      <BlogCode>{`import { z } from "zod";

const CreateTaskSchema = z.object({
  title:       z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  priority:    z.enum(["high", "medium", "low"]).default("medium"),
  dueDate:     z.coerce.date().optional(),
});

function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(422).json({ errors: result.error.flatten() });
    }
    req.body = result.data;
    next();
  };
}

router.post("/", validate(CreateTaskSchema), ctrl.create);`}</BlogCode>
      <BlogCallout type="danger">
        Never store passwords in plain text. Always use bcrypt or argon2
        with at least 10 salt rounds.
      </BlogCallout>
    </>
  );
}

function SectionArquitectura() {
  return (
    <>
      <BlogH2>Architecture: Controllers / Services / Repositories</BlogH2>
      <BlogP>
        Separating logic into layers makes code more testable and maintainable.
        The controller handles HTTP, the service contains business logic, and
        the repository abstracts data access.
      </BlogP>
      <BlogCode>{`// Folder structure
src/
├── controllers/     # Handles HTTP req/res
│   └── tasks.controller.ts
├── services/        # Business logic
│   └── tasks.service.ts
├── repositories/    # Data access
│   └── tasks.repository.ts
├── middlewares/     # Auth, logging, validation
├── routes/          # Route definitions
├── types/           # TypeScript interfaces
└── index.ts         # Entry point`}</BlogCode>
      <BlogCode>{`// services/tasks.service.ts
import { TasksRepository } from "../repositories/tasks.repository";
import { CreateTaskDto, Task } from "../types/task.types";

export class TasksService {
  constructor(private repo = new TasksRepository()) {}

  async list(filters: { completed?: boolean; page: number; limit: number }) {
    const offset = (filters.page - 1) * filters.limit;
    const [tasks, total] = await Promise.all([
      this.repo.findMany({ ...filters, offset }),
      this.repo.count(filters),
    ]);
    return { tasks, total, page: filters.page, limit: filters.limit };
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    // Business logic: validations, transformations
    return this.repo.create({ ...dto, completed: false, createdAt: new Date() });
  }

  async complete(id: number): Promise<Task | null> {
    const task = await this.repo.findById(id);
    if (!task) return null;
    if (task.completed) return task; // already completed
    return this.repo.update(id, { completed: true, completedAt: new Date() });
  }
}`}</BlogCode>
    </>
  );
}

function SectionProyecto() {
  return (
    <>
      <BlogH2>Final Project: REST API with authentication</BlogH2>
      <BlogP>
        Complete API for task management with registration, JWT login, and
        protected CRUD operations.
      </BlogP>
      <BlogCode>{`// src/index.ts - Complete entry point
import express    from "express";
import cors       from "cors";
import helmet     from "helmet";
import { authRouter }   from "./routes/auth.routes";
import { tasksRouter }  from "./routes/tasks.routes";
import { handleErrors } from "./middlewares/error.middleware";

const app = express();

// Global middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "1mb" }));

// Routes
app.use("/api/auth",   authRouter);
app.use("/api/tasks",  tasksRouter);

// Health check
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// Error handling (must be last)
app.use(handleErrors);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(\`API at http://localhost:\${PORT}\`));`}</BlogCode>
      <BlogCode>{`// routes/auth.routes.ts
import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt    from "jsonwebtoken";
import { validate } from "../middlewares/validate.middleware";
import { db } from "../db";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET!;

const RegisterSchema = z.object({
  name:     z.string().min(2),
  email:    z.string().email(),
  password: z.string().min(8),
});

// POST /api/auth/register
router.post("/register", validate(RegisterSchema), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: "Email already registered" });

    const hash = await bcrypt.hash(password, 12);
    const user = await db.user.create({
      data: { name, email, passwordHash: hash },
      select: { id: true, name: true, email: true },
    });
    res.status(201).json(user);
  } catch (err) { next(err); }
});

// POST /api/auth/login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await db.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid)  return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, name: user.name } });
  } catch (err) { next(err); }
});

export { router as authRouter };`}</BlogCode>
      <BlogCode>{`# Environment variables (.env)
PORT=3000
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
JWT_SECRET=a-very-long-and-random-secret
CORS_ORIGIN=http://localhost:5173

# Test the API with curl
curl -X POST http://localhost:3000/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"anna@example.com","password":"secret123"}'

curl http://localhost:3000/api/tasks \\
  -H "Authorization: Bearer <token>"`}</BlogCode>
      <BlogCallout type="tip">
        Use <code>prisma</code> as ORM for TypeScript. It offers migrations,
        type-safety and an excellent DX with any SQL database or MongoDB.
      </BlogCallout>
    </>
  );
}

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
  level: "Basic" | "Intermediate" | "Advanced";
  description: string;
  hint?: string;
  solution?: string;
}) {
  const [open, setOpen] = useState(false);
  const levelColor = {
    Basic:
      "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
    Intermediate:
      "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
    Advanced: "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
  }[level];

  return (
    <div className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden">
      <button
        className="w-full px-4 py-3 flex items-center justify-between gap-3 hover:bg-black/3 dark:hover:bg-white/3 transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
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
            <div className="bg-green-50 dark:bg-green-950/20 rounded-xl px-3 py-2 text-xs text-green-800 dark:text-green-300">
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
      <BlogH2>Node.js + Express Exercises</BlogH2>
      <BlogP>
        Practice building real APIs with these exercises. Make sure you have
        Node.js installed before starting.
      </BlogP>
      <div className="space-y-3 mt-6">
        <ExerciseCard
          description="Create an Express server with three routes: GET / (welcome), GET /health (status 200 with JSON), and a 404 route for not-found paths."
          hint="Use express(), app.get(), and app.use() for 404. The 404 middleware goes after all routes."
          level="Basic"
          num={1}
          solution={`const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API!" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// 404 middleware — always last
app.use((req, res) => {
  res.status(404).json({ error: "Route not found", path: req.path });
});

app.listen(PORT, () => console.log(\`Server at http://localhost:\${PORT}\`));`}
          title="Server with basic routes"
        />

        <ExerciseCard
          description="Implement a full CRUD for a product collection (id, name, price) stored in an in-memory array. Routes: GET /products, GET /products/:id, POST /products, PUT /products/:id, DELETE /products/:id."
          hint="Use let products = [] and an id counter. express.json() as middleware to parse the body."
          level="Basic"
          num={2}
          solution={`const express = require("express");
const app = express();
app.use(express.json());

let products = [];
let nextId = 1;

app.get("/products", (req, res) => res.json(products));

app.get("/products/:id", (req, res) => {
  const p = products.find(p => p.id === +req.params.id);
  if (!p) return res.status(404).json({ error: "Not found" });
  res.json(p);
});

app.post("/products", (req, res) => {
  const { name, price } = req.body;
  if (!name || price == null) return res.status(400).json({ error: "name and price are required" });
  const created = { id: nextId++, name, price };
  products.push(created);
  res.status(201).json(created);
});

app.put("/products/:id", (req, res) => {
  const idx = products.findIndex(p => p.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  products[idx] = { ...products[idx], ...req.body };
  res.json(products[idx]);
});

app.delete("/products/:id", (req, res) => {
  const idx = products.findIndex(p => p.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  products.splice(idx, 1);
  res.status(204).send();
});

app.listen(3000);`}
          title="In-memory CRUD"
        />

        <ExerciseCard
          description="Create a middleware that validates a Bearer JWT token on protected routes. If the token is invalid or does not exist, respond with 401. Add a POST /login route that generates the token."
          hint="Use the jsonwebtoken library. The middleware reads req.headers.authorization, extracts the token, and calls jwt.verify()."
          level="Intermediate"
          num={3}
          solution={`const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

const SECRET = "my_super_secret_key";

function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token not provided" });
  }
  try {
    req.user = jwt.verify(auth.slice(7), SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  // Here would go actual validation against DB
  if (email === "admin@test.com" && password === "1234") {
    const token = jwt.sign({ email, role: "admin" }, SECRET, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.get("/profile", authenticate, (req, res) => {
  res.json({ message: "Protected route", user: req.user });
});

app.listen(3000);`}
          title="JWT authentication middleware"
        />

        <ExerciseCard
          description="Implement a rate limiting middleware that allows a maximum of 10 requests per IP in a 60-second window. Returns 429 when the limit is exceeded."
          hint="Use a Map where the key is the IP and the value is { count, resetTime }. Check if resetTime has passed to reset the counter."
          level="Intermediate"
          num={4}
          solution={`function rateLimiter(maxRequests, windowMs) {
  const requestsByIP = new Map();

  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    const record = requestsByIP.get(ip);

    if (!record || now > record.resetTime) {
      requestsByIP.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (record.count >= maxRequests) {
      const retryMs = Math.ceil((record.resetTime - now) / 1000);
      res.setHeader("Retry-After", retryMs);
      return res.status(429).json({
        error: "Too many requests",
        retryAfter: \`\${retryMs} seconds\`
      });
    }

    record.count++;
    next();
  };
}

// Usage: max 10 requests per IP in 60 seconds
app.use("/api", rateLimiter(10, 60 * 1000));`}
          title="Custom rate limiting"
        />

        <ExerciseCard
          description="Create an API with body validation using Zod and a global error handling middleware that distinguishes between validation errors (400), custom business errors (4xx), and unexpected errors (500)."
          hint="Throw custom error classes (AppError) from controllers. The global middleware (4 params) catches them and responds appropriately."
          level="Advanced"
          num={5}
          solution={`const { z } = require("zod");

// Custom error
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Zod schema
const createUserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age:  z.number().int().min(18).max(120),
});

// Controller
app.post("/users", (req, res, next) => {
  try {
    const data = createUserSchema.parse(req.body);
    // ... save to DB
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err); // passes to global middleware
  }
});

// Global error middleware (4 parameters)
app.use((err, req, res, next) => {
  if (err instanceof z.ZodError) {
    return res.status(400).json({ error: "Validation failed", details: err.errors });
  }
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});`}
          title="API with Zod validation and global error handling"
        />
      </div>
    </>
  );
}

export default function NodeExpressContent() {
  const [active, setActive] = useState<SectionId>(SECTIONS[0].id);

  const renderSection = () => {
    switch (active) {
      case "intro":
        return <SectionIntro />;
      case "express-basico":
        return <SectionExpressBasico />;
      case "rest-api":
        return <SectionRestApi />;
      case "seguridad":
        return <SectionSeguridad />;
      case "arquitectura":
        return <SectionArquitectura />;
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
