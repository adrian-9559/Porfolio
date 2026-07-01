"use client";
import { useState } from "react";

type SectionId =
  | "intro"
  | "setup"
  | "controller"
  | "service"
  | "jpa"
  | "config"
  | "dto"
  | "ejercicios";

interface SectionDef {
  id: SectionId;
  label: string;
}
const SECTIONS: SectionDef[] = [
  { id: "intro", label: "1. Spring Boot" },
  { id: "setup", label: "2. Proyecto inicial" },
  { id: "controller", label: "3. REST Controllers" },
  { id: "service", label: "4. Capa de servicios" },
  { id: "jpa", label: "5. JPA y repositorios" },
  { id: "config", label: "6. Configuración" },
  { id: "dto", label: "7. DTOs y validación" },
  { id: "ejercicios", label: "Ejercicios" },
];

import {
  BlogH2,
  BlogH3,
  BlogP,
  BlogCode,
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
  level: string;
  description: string;
  hint?: string;
  solution?: string;
}) {
  const [open, setOpen] = useState(false);
  const levelColor =
    {
      Básico:
        "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
      Intermedio:
        "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
      Avanzado: "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
    }[level] ??
    "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400";

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
          <span className="text-[#aeaeb2] dark:text-[#636366] text-xs">
            {open ? "▲" : "▼"}
          </span>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-black/8 dark:border-white/8 pt-3 space-y-3">
          <p className="text-sm text-[#3a3a3c] dark:text-[#aeaeb2]">
            {description}
          </p>
          {hint && (
            <div className="bg-green-50 dark:bg-green-950/20 rounded-xl px-3 py-2 text-xs text-green-700 dark:text-green-400">
              <strong>Pista:</strong> {hint}
            </div>
          )}
          {solution && <BlogCode>{solution}</BlogCode>}
        </div>
      )}
    </div>
  );
}

function SectionIntro() {
  return (
    <>
      <BlogH2>¿Qué es Spring Boot?</BlogH2>
      <BlogP>
        Spring Boot es un framework Java que simplifica la creación de
        aplicaciones empresariales. Arranca un servidor embebido (Tomcat, Jetty,
        Undertow) con configuración automática y mínima configuración manual.
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Auto-configuración</strong> — detecta dependencias en el
          classpath y configura beans automáticamente
        </BlogLi>
        <BlogLi>
          <strong>Servidor embebido</strong> — ejecuta tu app sin desplegar en
          servidor externo
        </BlogLi>
        <BlogLi>
          <strong>Starter dependencies</strong> — dependencias pre-configuradas
          para casos comunes
        </BlogLi>
        <BlogLi>
          <strong>Actuator</strong> — métricas, health checks y monitoreo
        </BlogLi>
      </BlogUl>
      <BlogCode>{`// Una API REST en 3 líneas
@RestController
public class HolaController {
    @GetMapping("/hola")
    public String hola() {
        return "¡Hola desde Spring Boot!";
    }
}`}</BlogCode>
    </>
  );
}

function SectionSetup() {
  return (
    <>
      <BlogH2>Crear un proyecto Spring Boot</BlogH2>
      <BlogP>
        Usa{" "}
        <a
          className="text-blue-600 dark:text-blue-400 hover:underline"
          href="https://start.spring.io"
          rel="noopener noreferrer"
          target="_blank"
        >
          Spring Initializr
        </a>{" "}
        o tu IDE. Dependencias recomendadas para APIs REST:
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Spring Web</strong> — servidor embebido + REST controllers
        </BlogLi>
        <BlogLi>
          <strong>Spring Data JPA</strong> — persistencia con repositorios
        </BlogLi>
        <BlogLi>
          <strong>H2 / PostgreSQL Driver</strong> — base de datos
        </BlogLi>
        <BlogLi>
          <strong>Lombok</strong> — reducir boilerplate
        </BlogLi>
        <BlogLi>
          <strong>Validation</strong> — validación con Jakarta Bean Validation
        </BlogLi>
      </BlogUl>
      <BlogCode>{`<?xml version="1.0" encoding="UTF-8"?>
<project>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.4.0</version>
    </parent>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
    </dependencies>
</project>`}</BlogCode>
      <BlogCode>{`// Clase principal — SpringApplication.run() arranca todo
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}`}</BlogCode>
    </>
  );
}

function SectionController() {
  return (
    <>
      <BlogH2>REST Controllers</BlogH2>
      <BlogP>
        Los controladores manejan peticiones HTTP. <code>@RestController</code>{" "}
        combina <code>@Controller</code> + <code>@ResponseBody</code>.
      </BlogP>
      <BlogCode>{`@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @GetMapping
    public List<UsuarioResponse> listar() {
        // GET /api/usuarios
    }

    @GetMapping("/{id}")
    public UsuarioResponse obtener(@PathVariable Long id) {
        // GET /api/usuarios/1
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioResponse crear(@RequestBody @Valid CrearUsuarioRequest request) {
        // POST /api/usuarios
    }

    @PutMapping("/{id}")
    public UsuarioResponse actualizar(@PathVariable Long id, @RequestBody @Valid ActualizarUsuarioRequest request) {
        // PUT /api/usuarios/1
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        // DELETE /api/usuarios/1
    }
}`}</BlogCode>
      <BlogCallout type="tip">
        Usa <code>@Valid</code> en los DTOs de entrada para que Spring valide
        automáticamente las restricciones antes de ejecutar el método del
        controlador.
      </BlogCallout>
    </>
  );
}

function SectionService() {
  return (
    <>
      <BlogH2>Capa de servicios</BlogH2>
      <BlogP>
        La capa de servicios contiene la lógica de negocio. Los controladores
        delegan en servicios, que a su vez usan repositorios.
      </BlogP>
      <BlogCode>{`@Service
public class UsuarioService {
    private final UsuarioRepository repository;

    // Inyección por constructor — la forma recomendada
    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public UsuarioResponse crear(CrearUsuarioRequest request) {
        var usuario = new Usuario(request.nombre(), request.email());

        if (repository.existsByEmail(usuario.getEmail())) {
            throw new IllegalArgumentException("El email ya está registrado");
        }

        usuario = repository.save(usuario);
        return UsuarioResponse.desde(usuario);
    }

    @Transactional(readOnly = true)
    public List<UsuarioResponse> listar() {
        return repository.findAll()
            .stream()
            .map(UsuarioResponse::desde)
            .toList();
    }
}`}</BlogCode>
      <BlogCallout type="warn">
        No pongas lógica de negocio en los controladores. Los controladores solo
        orquestan: reciben la petición, llaman al servicio y devuelven la
        respuesta.
      </BlogCallout>
      <BlogH3>Inyección de dependencias</BlogH3>
      <BlogP>
        Spring maneja el ciclo de vida de los beans. La inyección por
        constructor es la forma más segura y testable.
      </BlogP>
      <BlogCode>{`// Spring inyecta automáticamente las dependencias declaradas en el constructor
@Service
public class FacturaService {
    private final UsuarioService usuarioService;
    private final ProductoRepository productoRepository;
    private final EmailService emailService;

    public FacturaService(UsuarioService usuarioService,
                         ProductoRepository productoRepository,
                         EmailService emailService) {
        this.usuarioService = usuarioService;
        this.productoRepository = productoRepository;
        this.emailService = emailService;
    }
}`}</BlogCode>
    </>
  );
}

function SectionJpa() {
  return (
    <>
      <BlogH2>JPA y repositorios</BlogH2>
      <BlogP>
        Spring Data JPA proporciona implementaciones automáticas de
        repositorios. Solo defines la interfaz.
      </BlogP>
      <BlogCode>{`// Entidad JPA
@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(unique = true, nullable = false)
    private String email;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Factura> facturas = new ArrayList<>();

    // JPA requiere constructor vacío (protected)
    protected Usuario() {}

    public Usuario(String nombre, String email) {
        this.nombre = nombre;
        this.email = email;
    }

    // getters...
}`}</BlogCode>
      <BlogCode>{`// Repositorio — Spring genera la implementación
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
    boolean existsByEmail(String email);
    List<Usuario> findByNombreContainingIgnoreCase(String nombre);
    Page<Usuario> findAll(Pageable pageable);
}`}</BlogCode>
      <BlogCallout type="tip">
        Spring Data JPA analiza el nombre del método para generar la query.{" "}
        <code>findByNombreContainingIgnoreCase</code> genera automáticamente{" "}
        <code>WHERE LOWER(nombre) LIKE LOWER(:nombre)</code>.
      </BlogCallout>
    </>
  );
}

function SectionConfig() {
  return (
    <>
      <BlogH2>Configuración</BlogH2>
      <BlogP>
        Spring Boot usa <code>application.yml</code> o{" "}
        <code>application.properties</code> para la configuración. Puedes tener
        perfiles separados.
      </BlogP>
      <BlogCode>{`# application.yml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    username: user
    password: secret
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: true

server:
  port: 8080

---
# application-dev.yml
spring:
  datasource:
    url: jdbc:h2:mem:testdb
  jpa:
    hibernate:
      ddl-auto: create-drop`}</BlogCode>
      <BlogCode>{`// Acceder a propiedades personalizadas
@ConfigurationProperties(prefix = "app")
public class AppConfig {
    private String nombre;
    private String version;
    private List<String> corsOrigins;

    // getters y setters obligatorios
}

// En application.yml:
// app:
//   nombre: Mi API
//   version: 1.0.0
//   cors-origins: http://localhost:3000,https://example.com`}</BlogCode>
    </>
  );
}

function SectionDto() {
  return (
    <>
      <BlogH2>DTOs y validación</BlogH2>
      <BlogP>
        Nunca expongas tus entidades JPA directamente en los endpoints. Usa DTOs
        (Data Transfer Objects) para separar la representación interna de la API
        pública.
      </BlogP>
      <BlogCode>{`// DTO de entrada con validación
public record CrearUsuarioRequest(
    @NotBlank String nombre,
    @Email @NotBlank String email,
    @Min(18) @Max(120) int edad
) {}

// DTO de salida — solo los campos que el cliente necesita
public record UsuarioResponse(
    Long id,
    String nombre,
    String email,
    int edad,
    LocalDateTime createdAt
) {
    public static UsuarioResponse desde(Usuario u) {
        return new UsuarioResponse(
            u.getId(), u.getNombre(), u.getEmail(),
            u.getEdad(), u.getCreatedAt()
        );
    }
}`}</BlogCode>
      <BlogCallout type="warn">
        No devuelvas entidades JPA directamente. Pueden incluir relaciones
        perezosas que lanzan <code>LazyInitializationException</code>, o exponer
        datos sensibles como contraseñas hasheadas.
      </BlogCallout>
      <BlogH3>Manejo global de errores</BlogH3>
      <BlogCode>{`@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse manejarValidacion(MethodArgumentNotValidException ex) {
        var errores = ex.getBindingResult().getFieldErrors()
            .stream()
            .map(e -> new ErrorCampo(e.getField(), e.getDefaultMessage()))
            .toList();
        return new ErrorResponse("ERROR_VALIDACION", errores);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse manejarArgumentoInvalido(IllegalArgumentException ex) {
        return new ErrorResponse("ERROR_ARGUMENTO", List.of(ex.getMessage()));
    }
}`}</BlogCode>
    </>
  );
}

function SectionEjercicios() {
  return (
    <>
      <BlogH2>Ejercicios</BlogH2>
      <BlogP>
        Construye sobre lo aprendido con estos ejercicios prácticos.
      </BlogP>
      <div className="space-y-3">
        <ExerciseCard
          description="Crea un CRUD completo de productos con: Producto (id, nombre, precio, stock), endpoints GET/list, GET/{id}, POST, PUT/{id}, DELETE/{id}, validación de campos, y DTOs separados de entrada/salida."
          level="Intermedio"
          num={1}
          title="API de productos"
        />
        <ExerciseCard
          description="Añade a la API de productos endpoints de búsqueda: GET /api/productos?nombre=&minPrecio=&maxPrecio=&orden=&pagina=&tamano=. Usa Specification de JPA para consultas dinámicas y devuelve paginación con Page."
          level="Avanzado"
          num={2}
          title="Búsqueda con filtros"
        />
      </div>
    </>
  );
}

const SECTION_MAP = {
  intro: SectionIntro,
  setup: SectionSetup,
  controller: SectionController,
  service: SectionService,
  jpa: SectionJpa,
  config: SectionConfig,
  dto: SectionDto,
  ejercicios: SectionEjercicios,
};

export default function JavaSpringContent() {
  const [active, setActive] = useState<SectionId>("intro");
  const currentIdx = SECTIONS.findIndex((s) => s.id === active);

  return (
    <div className="flex gap-8 min-h-[600px]">
      <aside className="hidden lg:flex flex-col gap-0.5 w-52 shrink-0 sticky top-20 self-start">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={`text-left px-3 py-1.5 rounded-xl text-sm transition-colors ${
              active === s.id
                ? "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-300 font-medium"
                : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
            }`}
            onClick={() => setActive(s.id)}
          >
            {s.label}
          </button>
        ))}
      </aside>
      <div className="flex-1 min-w-0">
        {SECTION_MAP[active]()}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-black/8 dark:border-white/8">
          <button
            className="text-sm text-[#6e6e73] dark:text-[#86868b] disabled:opacity-30 hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
            disabled={currentIdx === 0}
            onClick={() => setActive(SECTIONS[currentIdx - 1].id)}
          >
            ← Anterior
          </button>
          <button
            className="text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium disabled:opacity-30 transition-colors"
            disabled={currentIdx === SECTIONS.length - 1}
            onClick={() => setActive(SECTIONS[currentIdx + 1].id)}
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}
