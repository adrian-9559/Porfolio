"use client";
import { useState } from "react";

type SectionId =
  | "intro" | "fundamentos" | "flujo" | "poo"
  | "colecciones" | "errores" | "streams" | "proyecto-final";

interface SectionDef { id: SectionId; label: string; }
const SECTIONS: SectionDef[] = [
  { id: "intro",          label: "1. Introducción" },
  { id: "fundamentos",    label: "2. Fundamentos" },
  { id: "flujo",          label: "3. Control de flujo" },
  { id: "poo",            label: "4. POO" },
  { id: "colecciones",    label: "5. Colecciones" },
  { id: "errores",        label: "6. Errores" },
  { id: "streams",        label: "7. Streams API" },
  { id: "proyecto-final", label: "Proyecto Final" },
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
      <H2>Introducción a Java</H2>
      <P>Java es un lenguaje de programación orientado a objetos, compilado a bytecode y ejecutado en la JVM (Java Virtual Machine). Su lema histórico es "write once, run anywhere". Es ampliamente usado en backend empresarial, Android y sistemas distribuidos.</P>
      <Code>{`// Hola Mundo en Java
public class HolaMundo {
    public static void main(String[] args) {
        System.out.println("¡Hola, mundo!");

        // Variables
        String nombre = "Ana";
        int edad = 28;
        System.out.printf("Hola, %s. Tienes %d años.%n", nombre, edad);
    }
}`}</Code>
      <Callout type="tip">Desde Java 21 puedes usar "unnamed classes" y el método <code>main</code> sin declarar la clase. Facilita el aprendizaje inicial.</Callout>
      <H3>Compilar y ejecutar</H3>
      <Code>{`# Compilar
javac HolaMundo.java

# Ejecutar
java HolaMundo

# Con Maven
mvn compile
mvn exec:java -Dexec.mainClass="com.ejemplo.HolaMundo"`}</Code>
    </>
  );
}

function SectionFundamentos() {
  return (
    <>
      <H2>Fundamentos de Java</H2>
      <H3>Tipos primitivos y variables</H3>
      <P>Java es un lenguaje de tipado estático. Tiene 8 tipos primitivos y sus equivalentes en clases wrapper.</P>
      <Code>{`// Tipos primitivos
byte   b  = 127;
short  s  = 32000;
int    i  = 2_147_483_647;   // underscore para legibilidad
long   l  = 9_223_372_036L;  // L obligatorio para long
float  f  = 3.14f;           // f obligatorio para float
double d  = 3.141592653589;
boolean ok = true;
char   c  = 'A';

// Wrappers (objetos)
Integer numero  = 42;
String  texto   = "Hola Java";
Double  decimal = 3.14;

// var (inferencia de tipo, Java 10+)
var lista  = new ArrayList<String>();
var mapa   = new HashMap<String, Integer>();`}</Code>
      <H3>Strings</H3>
      <Code>{`String s1 = "Hola";
String s2 = " Mundo";

// Concatenación
String resultado = s1 + s2;

// String.format y formatted (Java 15+)
String saludo = "Hola, %s! Tienes %d años.".formatted("Ana", 28);

// StringBuilder para concatenaciones en bucle
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 5; i++) {
    sb.append(i).append(", ");
}
System.out.println(sb.toString()); // "0, 1, 2, 3, 4, "

// Métodos útiles
System.out.println("java".toUpperCase());  // "JAVA"
System.out.println("  hola  ".trim());     // "hola"
System.out.println("java".contains("av")); // true`}</Code>
    </>
  );
}

function SectionFlujo() {
  return (
    <>
      <H2>Control de flujo</H2>
      <H3>Condicionales</H3>
      <Code>{`int nota = 85;

// if / else if / else
if (nota >= 90) {
    System.out.println("Sobresaliente");
} else if (nota >= 70) {
    System.out.println("Notable");
} else if (nota >= 50) {
    System.out.println("Aprobado");
} else {
    System.out.println("Suspenso");
}

// Switch expression (Java 14+)
String categoria = switch (nota / 10) {
    case 10, 9 -> "Sobresaliente";
    case 8, 7  -> "Notable";
    case 6, 5  -> "Aprobado";
    default    -> "Suspenso";
};`}</Code>
      <H3>Bucles</H3>
      <Code>{`// for clásico
for (int i = 0; i < 5; i++) {
    System.out.print(i + " "); // 0 1 2 3 4
}

// for-each
int[] numeros = {1, 2, 3, 4, 5};
for (int n : numeros) {
    System.out.print(n + " ");
}

// while
int n = 1;
while (n <= 100) {
    if (n % 15 == 0)      System.out.print("FizzBuzz ");
    else if (n % 3 == 0)  System.out.print("Fizz ");
    else if (n % 5 == 0)  System.out.print("Buzz ");
    else                  System.out.print(n + " ");
    n++;
}`}</Code>
    </>
  );
}

function SectionPoo() {
  return (
    <>
      <H2>Programación Orientada a Objetos</H2>
      <H3>Clases y encapsulación</H3>
      <Code>{`public class CuentaBancaria {
    private final String titular;
    private double saldo;

    public CuentaBancaria(String titular, double saldoInicial) {
        this.titular = titular;
        this.saldo   = saldoInicial;
    }

    public void depositar(double monto) {
        if (monto <= 0) throw new IllegalArgumentException("Monto debe ser positivo");
        this.saldo += monto;
    }

    public void retirar(double monto) {
        if (monto > saldo) throw new IllegalStateException("Saldo insuficiente");
        this.saldo -= monto;
    }

    public double getSaldo()   { return saldo; }
    public String getTitular() { return titular; }

    @Override
    public String toString() {
        return "CuentaBancaria{titular='%s', saldo=%.2f}".formatted(titular, saldo);
    }
}`}</Code>
      <H3>Herencia e interfaces</H3>
      <Code>{`// Interfaz
public interface Serializable {
    String serializar();
    static <T> T deserializar(String datos) { /* ... */ return null; }
}

// Clase abstracta
public abstract class Figura implements Serializable {
    protected String color;
    public Figura(String color) { this.color = color; }
    public abstract double area();
    public abstract double perimetro();
}

// Implementación concreta
public class Circulo extends Figura {
    private final double radio;
    public Circulo(String color, double radio) {
        super(color);
        this.radio = radio;
    }
    @Override public double area()      { return Math.PI * radio * radio; }
    @Override public double perimetro() { return 2 * Math.PI * radio; }
    @Override public String serializar() {
        return "circulo:%s:%.2f".formatted(color, radio);
    }
}`}</Code>
      <Callout type="tip">Prefiere la composición sobre la herencia siempre que sea posible. Las interfaces con métodos default son más flexibles que las jerarquías profundas.</Callout>
    </>
  );
}

function SectionColecciones() {
  return (
    <>
      <H2>Colecciones</H2>
      <H3>ArrayList y LinkedList</H3>
      <Code>{`import java.util.*;

// ArrayList: acceso por índice O(1), inserción O(n)
List<String> lista = new ArrayList<>();
lista.add("manzana");
lista.add("pera");
lista.add(0, "fresa");       // insertar en posición
lista.remove("pera");
Collections.sort(lista);
System.out.println(lista);   // [fresa, manzana]

// Crear con valores (inmutable)
List<Integer> nums = List.of(1, 2, 3, 4, 5);

// Iterar con índice
for (int i = 0; i < lista.size(); i++) {
    System.out.println(i + ": " + lista.get(i));
}`}</Code>
      <H3>HashMap y HashSet</H3>
      <Code>{`// HashMap: clave -> valor, O(1) promedio
Map<String, Integer> edades = new HashMap<>();
edades.put("Ana", 28);
edades.put("Bob", 22);
edades.put("Ana", 29);  // sobreescribe

// Acceso seguro
int edadAna = edades.getOrDefault("Ana", 0);
edades.putIfAbsent("Carlos", 35);

// Iterar
edades.forEach((nombre, edad) ->
    System.out.println(nombre + " -> " + edad));

// HashSet: elementos únicos, O(1) promedio
Set<String> visitados = new HashSet<>();
visitados.add("Madrid");
visitados.add("Barcelona");
visitados.add("Madrid");   // ignorado
System.out.println(visitados.size()); // 2`}</Code>
    </>
  );
}

function SectionErrores() {
  return (
    <>
      <H2>Manejo de errores</H2>
      <H3>try / catch / finally</H3>
      <Code>{`public class EjemploErrores {
    public static int dividir(int a, int b) {
        if (b == 0) throw new ArithmeticException("División por cero");
        return a / b;
    }

    public static void main(String[] args) {
        try {
            int resultado = dividir(10, 0);
            System.out.println(resultado);
        } catch (ArithmeticException e) {
            System.err.println("Error: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Error inesperado: " + e);
        } finally {
            System.out.println("Bloque finally siempre se ejecuta");
        }
    }
}`}</Code>
      <H3>Excepciones personalizadas</H3>
      <Code>{`// Excepción checked (obliga a manejarla)
public class SaldoInsuficienteException extends Exception {
    private final double saldoActual;
    private final double montoSolicitado;

    public SaldoInsuficienteException(double saldo, double monto) {
        super("Saldo insuficiente. Disponible: %.2f, solicitado: %.2f"
              .formatted(saldo, monto));
        this.saldoActual     = saldo;
        this.montoSolicitado = monto;
    }

    public double getFaltante() { return montoSolicitado - saldoActual; }
}

// Uso
try {
    cuenta.retirar(1000.0);
} catch (SaldoInsuficienteException e) {
    System.err.println(e.getMessage());
    System.err.println("Faltan: " + e.getFaltante() + "€");
}`}</Code>
      <Callout type="warn">Usa excepciones unchecked (que extienden <code>RuntimeException</code>) para errores de programación y checked para situaciones recuperables que el llamador debe manejar.</Callout>
    </>
  );
}

function SectionStreams() {
  return (
    <>
      <H2>Streams API (Java 8+)</H2>
      <P>Los Streams permiten procesar colecciones de forma funcional y declarativa, similar a SQL. Son lazy: solo se ejecutan cuando se llama a una operación terminal.</P>
      <Code>{`import java.util.stream.*;
import java.util.*;

List<Integer> numeros = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// filter + map + collect
List<Integer> paresCuadrados = numeros.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * n)
    .collect(Collectors.toList());
// [4, 16, 36, 64, 100]

// reduce
int suma = numeros.stream()
    .reduce(0, Integer::sum);

// Estadísticas
IntSummaryStatistics stats = numeros.stream()
    .mapToInt(Integer::intValue)
    .summaryStatistics();
System.out.println("Max: " + stats.getMax());
System.out.println("Avg: " + stats.getAverage());`}</Code>
      <Code>{`// Agrupar por categoría
record Producto(String nombre, String categoria, double precio) {}

List<Producto> productos = List.of(
    new Producto("Manzana", "fruta",    1.20),
    new Producto("Pan",     "panadería", 0.80),
    new Producto("Pera",    "fruta",    1.50)
);

Map<String, Double> totalPorCat = productos.stream()
    .collect(Collectors.groupingBy(
        Producto::categoria,
        Collectors.summingDouble(Producto::precio)
    ));
// {fruta=2.70, panadería=0.80}`}</Code>
    </>
  );
}

function SectionProyecto() {
  return (
    <>
      <H2>Proyecto Final: Gestor de Tareas CLI</H2>
      <P>Aplicación de línea de comandos para gestionar tareas. Permite agregar, listar, completar y eliminar tareas, con persistencia en un archivo JSON.</P>
      <Code>{`// Tarea.java
import java.time.LocalDateTime;

public record Tarea(
    int id,
    String titulo,
    String descripcion,
    boolean completada,
    LocalDateTime creadaEn
) {
    public Tarea completar() {
        return new Tarea(id, titulo, descripcion, true, creadaEn);
    }

    @Override
    public String toString() {
        String estado = completada ? "✓" : "○";
        return "[%s] #%d %s".formatted(estado, id, titulo);
    }
}`}</Code>
      <Code>{`// GestorTareas.java
import java.util.*;
import java.util.stream.*;

public class GestorTareas {
    private final List<Tarea> tareas = new ArrayList<>();
    private int nextId = 1;

    public Tarea agregar(String titulo, String descripcion) {
        var tarea = new Tarea(nextId++, titulo, descripcion,
                              false, LocalDateTime.now());
        tareas.add(tarea);
        return tarea;
    }

    public Optional<Tarea> completar(int id) {
        for (int i = 0; i < tareas.size(); i++) {
            if (tareas.get(i).id() == id) {
                var completada = tareas.get(i).completar();
                tareas.set(i, completada);
                return Optional.of(completada);
            }
        }
        return Optional.empty();
    }

    public boolean eliminar(int id) {
        return tareas.removeIf(t -> t.id() == id);
    }

    public List<Tarea> listarPendientes() {
        return tareas.stream()
            .filter(t -> !t.completada())
            .collect(Collectors.toList());
    }

    public List<Tarea> todas() {
        return Collections.unmodifiableList(tareas);
    }
}`}</Code>
      <Code>{`// Main.java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        var gestor  = new GestorTareas();
        var scanner = new Scanner(System.in);

        // Datos de ejemplo
        gestor.agregar("Estudiar Java Streams", "Ver capítulo 7");
        gestor.agregar("Hacer ejercicios", "Completar 5 ejercicios");
        gestor.agregar("Revisar PR", "Revisar el PR #42");

        System.out.println("=== Gestor de Tareas ===");
        boolean salir = false;

        while (!salir) {
            System.out.println("\\n1.Listar  2.Agregar  3.Completar  4.Eliminar  0.Salir");
            System.out.print("> ");
            String opcion = scanner.nextLine().trim();

            switch (opcion) {
                case "1" -> gestor.todas().forEach(System.out::println);
                case "2" -> {
                    System.out.print("Título: ");
                    String titulo = scanner.nextLine();
                    System.out.print("Descripción: ");
                    String desc = scanner.nextLine();
                    System.out.println("Creada: " + gestor.agregar(titulo, desc));
                }
                case "3" -> {
                    System.out.print("ID a completar: ");
                    int id = Integer.parseInt(scanner.nextLine());
                    gestor.completar(id).ifPresentOrElse(
                        t -> System.out.println("Completada: " + t),
                        () -> System.out.println("Tarea no encontrada")
                    );
                }
                case "4" -> {
                    System.out.print("ID a eliminar: ");
                    int id = Integer.parseInt(scanner.nextLine());
                    System.out.println(gestor.eliminar(id) ? "Eliminada" : "No encontrada");
                }
                case "0" -> salir = true;
                default  -> System.out.println("Opción inválida");
            }
        }
        System.out.println("¡Hasta pronto!");
    }
}`}</Code>
      <Callout type="tip">Extiende el proyecto añadiendo persistencia con <code>ObjectMapper</code> de Jackson para guardar las tareas en JSON entre sesiones.</Callout>
    </>
  );
}

export default function JavaContent() {
  const [active, setActive] = useState<SectionId>(SECTIONS[0].id);

  const renderSection = () => {
    switch (active) {
      case "intro":          return <SectionIntro />;
      case "fundamentos":    return <SectionFundamentos />;
      case "flujo":          return <SectionFlujo />;
      case "poo":            return <SectionPoo />;
      case "colecciones":    return <SectionColecciones />;
      case "errores":        return <SectionErrores />;
      case "streams":        return <SectionStreams />;
      case "proyecto-final": return <SectionProyecto />;
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
