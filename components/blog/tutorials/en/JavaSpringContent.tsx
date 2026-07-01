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
  { id: "setup", label: "2. Initial project" },
  { id: "controller", label: "3. REST Controllers" },
  { id: "service", label: "4. Service layer" },
  { id: "jpa", label: "5. JPA & repositories" },
  { id: "config", label: "6. Configuration" },
  { id: "dto", label: "7. DTOs & validation" },
  { id: "ejercicios", label: "Exercises" },
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
      "Básico":
        "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
      "Intermedio":
        "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
      "Avanzado": "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
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
              <strong>Hint:</strong> {hint}
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
      <BlogH2>What is Spring Boot?</BlogH2>
      <BlogP>
        Spring Boot is a Java framework that simplifies building
        enterprise applications. It starts an embedded server (Tomcat, Jetty,
        Undertow) with auto-configuration and minimal manual setup.
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Auto-configuration</strong> — detects dependencies in the
          classpath and configures beans automatically
        </BlogLi>
        <BlogLi>
          <strong>Embedded server</strong> — runs your app without deploying to an
          external server
        </BlogLi>
        <BlogLi>
          <strong>Starter dependencies</strong> — pre-configured dependencies
          for common use cases
        </BlogLi>
        <BlogLi>
          <strong>Actuator</strong> — metrics, health checks, and monitoring
        </BlogLi>
      </BlogUl>
      <BlogCode>{`// A REST API in 3 lines
@RestController
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot!";
    }
}`}</BlogCode>
    </>
  );
}

function SectionSetup() {
  return (
    <>
      <BlogH2>Create a Spring Boot project</BlogH2>
      <BlogP>
        Use{" "}
        <a
          className="text-blue-600 dark:text-blue-400 hover:underline"
          href="https://start.spring.io"
          rel="noopener noreferrer"
          target="_blank"
        >
          Spring Initializr
        </a>{" "}
        or your IDE. Recommended dependencies for REST APIs:
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Spring Web</strong> — embedded server + REST controllers
        </BlogLi>
        <BlogLi>
          <strong>Spring Data JPA</strong> — persistence with repositories
        </BlogLi>
        <BlogLi>
          <strong>H2 / PostgreSQL Driver</strong> — database
        </BlogLi>
        <BlogLi>
          <strong>Lombok</strong> — reduce boilerplate
        </BlogLi>
        <BlogLi>
          <strong>Validation</strong> — Jakarta Bean Validation
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
      <BlogCode>{`// Main class — SpringApplication.run() boots everything
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
        Controllers handle HTTP requests. <code>@RestController</code>{" "}
        combines <code>@Controller</code> + <code>@ResponseBody</code>.
      </BlogP>
      <BlogCode>{`@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping
    public List<UserResponse> list() {
        // GET /api/users
    }

    @GetMapping("/{id}")
    public UserResponse get(@PathVariable Long id) {
        // GET /api/users/1
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse create(@RequestBody @Valid CreateUserRequest request) {
        // POST /api/users
    }

    @PutMapping("/{id}")
    public UserResponse update(@PathVariable Long id, @RequestBody @Valid UpdateUserRequest request) {
        // PUT /api/users/1
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        // DELETE /api/users/1
    }
}`}</BlogCode>
      <BlogCallout type="tip">
        Use <code>@Valid</code> on input DTOs so Spring automatically
        validates constraints before executing the controller method.
      </BlogCallout>
    </>
  );
}

function SectionService() {
  return (
    <>
      <BlogH2>Service layer</BlogH2>
      <BlogP>
        The service layer contains business logic. Controllers
        delegate to services, which in turn use repositories.
      </BlogP>
      <BlogCode>{`@Service
public class UserService {
    private final UserRepository repository;

    // Constructor injection — the recommended approach
    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public UserResponse create(CreateUserRequest request) {
        var user = new User(request.name(), request.email());

        if (repository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        user = repository.save(user);
        return UserResponse.from(user);
    }

    @Transactional(readOnly = true)
    public List<UserResponse> list() {
        return repository.findAll()
            .stream()
            .map(UserResponse::from)
            .toList();
    }
}`}</BlogCode>
      <BlogCallout type="warn">
        Do not put business logic in controllers. Controllers only
        orchestrate: receive the request, call the service, and return the
        response.
      </BlogCallout>
      <BlogH3>Dependency injection</BlogH3>
      <BlogP>
        Spring manages the bean lifecycle. Constructor injection is the
        safest and most testable approach.
      </BlogP>
      <BlogCode>{`// Spring automatically injects dependencies declared in the constructor
@Service
public class InvoiceService {
    private final UserService userService;
    private final ProductRepository productRepository;
    private final EmailService emailService;

    public InvoiceService(UserService userService,
                         ProductRepository productRepository,
                         EmailService emailService) {
        this.userService = userService;
        this.productRepository = productRepository;
        this.emailService = emailService;
    }
}`}</BlogCode>
    </>
  );
}

function SectionJpa() {
  return (
    <>
      <BlogH2>JPA and repositories</BlogH2>
      <BlogP>
        Spring Data JPA provides automatic repository
        implementations. You only define the interface.
      </BlogP>
      <BlogCode>{`// JPA Entity
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Invoice> invoices = new ArrayList<>();

    // JPA requires an empty (protected) constructor
    protected User() {}

    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }

    // getters...
}`}</BlogCode>
      <BlogCode>{`// Repository — Spring generates the implementation
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    List<User> findByNameContainingIgnoreCase(String name);
    Page<User> findAll(Pageable pageable);
}`}</BlogCode>
      <BlogCallout type="tip">
        Spring Data JPA parses the method name to generate the query.{" "}
        <code>findByNameContainingIgnoreCase</code> automatically generates{" "}
        <code>WHERE LOWER(name) LIKE LOWER(:name)</code>.
      </BlogCallout>
    </>
  );
}

function SectionConfig() {
  return (
    <>
      <BlogH2>Configuration</BlogH2>
      <BlogP>
        Spring Boot uses <code>application.yml</code> or{" "}
        <code>application.properties</code> for configuration. You can have
        separate profiles.
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
      <BlogCode>{`// Access custom properties
@ConfigurationProperties(prefix = "app")
public class AppConfig {
    private String name;
    private String version;
    private List<String> corsOrigins;

    // getters and setters required
}

// In application.yml:
// app:
//   name: My API
//   version: 1.0.0
//   cors-origins: http://localhost:3000,https://example.com`}</BlogCode>
    </>
  );
}

function SectionDto() {
  return (
    <>
      <BlogH2>DTOs and validation</BlogH2>
      <BlogP>
        Never expose JPA entities directly in endpoints. Use DTOs
        (Data Transfer Objects) to separate internal representation from the public
        API.
      </BlogP>
      <BlogCode>{`// Input DTO with validation
public record CreateUserRequest(
    @NotBlank String name,
    @Email @NotBlank String email,
    @Min(18) @Max(120) int age
) {}

// Output DTO — only the fields the client needs
public record UserResponse(
    Long id,
    String name,
    String email,
    int age,
    LocalDateTime createdAt
) {
    public static UserResponse from(User u) {
        return new UserResponse(
            u.getId(), u.getName(), u.getEmail(),
            u.getAge(), u.getCreatedAt()
        );
    }
}`}</BlogCode>
      <BlogCallout type="warn">
        Do not return JPA entities directly. They can include lazy
        relationships that throw <code>LazyInitializationException</code>, or expose
        sensitive data like hashed passwords.
      </BlogCallout>
      <BlogH3>Global error handling</BlogH3>
      <BlogCode>{`@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleValidation(MethodArgumentNotValidException ex) {
        var errors = ex.getBindingResult().getFieldErrors()
            .stream()
            .map(e -> new FieldError(e.getField(), e.getDefaultMessage()))
            .toList();
        return new ErrorResponse("VALIDATION_ERROR", errors);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleInvalidArgument(IllegalArgumentException ex) {
        return new ErrorResponse("ARGUMENT_ERROR", List.of(ex.getMessage()));
    }
}`}</BlogCode>
    </>
  );
}

function SectionEjercicios() {
  return (
    <>
      <BlogH2>Exercises</BlogH2>
      <BlogP>
        Build on what you've learned with these practical exercises.
      </BlogP>
      <div className="space-y-3">
        <ExerciseCard
          description="Create a full CRUD for products with: Product (id, name, price, stock), endpoints GET/list, GET/{id}, POST, PUT/{id}, DELETE/{id}, field validation, and separate input/output DTOs."
          level="Intermedio"
          num={1}
          title="Products API"
        />
        <ExerciseCard
          description="Add search endpoints to the products API: GET /api/products?name=&minPrice=&maxPrice=&order=&page=&size=. Use JPA Specification for dynamic queries and return pagination with Page."
          level="Avanzado"
          num={2}
          title="Search with filters"
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
            ← Previous
          </button>
          <button
            className="text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium disabled:opacity-30 transition-colors"
            disabled={currentIdx === SECTIONS.length - 1}
            onClick={() => setActive(SECTIONS[currentIdx + 1].id)}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
