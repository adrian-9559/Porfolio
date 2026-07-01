"use client";
import { useState } from "react";

type SectionId =
  | "intro"
  | "encapsulacion"
  | "herencia"
  | "interfaces"
  | "polimorfismo"
  | "records"
  | "patrones"
  | "ejercicios";

interface SectionDef {
  id: SectionId;
  label: string;
}
const SECTIONS: SectionDef[] = [
  { id: "intro", label: "1. OOP en Java" },
  { id: "encapsulacion", label: "2. Encapsulación" },
  { id: "herencia", label: "3. Herencia" },
  { id: "interfaces", label: "4. Interfaces" },
  { id: "polimorfismo", label: "5. Polimorfismo" },
  { id: "records", label: "6. Records y sealed" },
  { id: "patrones", label: "7. Patrones OOP" },
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
          <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
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
            <div className="bg-purple-50 dark:bg-purple-950/20 rounded-xl px-3 py-2 text-xs text-purple-700 dark:text-purple-400">
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
      <BlogH2>OOP en Java: más allá de lo básico</BlogH2>
      <BlogP>
        Java es un lenguaje puramente orientado a objetos (con algunos
        primitivos). Todo el código vive dentro de clases, y todo objeto es
        instancia de una clase. Este tutorial asume que ya conoces la sintaxis
        básica de Java y profundiza en los pilares de la POO.
      </BlogP>
      <BlogP>Los cuatro pilares de la POO en Java son:</BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Encapsulación</strong> — ocultar el estado interno y exponer
          solo lo necesario
        </BlogLi>
        <BlogLi>
          <strong>Herencia</strong> — reutilizar y extender comportamiento entre
          clases
        </BlogLi>
        <BlogLi>
          <strong>Polimorfismo</strong> — tratar objetos de distintos tipos
          mediante una interfaz común
        </BlogLi>
        <BlogLi>
          <strong>Abstracción</strong> — modelar conceptos reales mediante
          clases e interfaces
        </BlogLi>
      </BlogUl>
      <BlogCode>{`// Cada objeto es una instancia de una clase
Object obj = new Object();
System.out.println(obj.getClass().getName()); // java.lang.Object

// Todo objeto tiene: estado (campos) + comportamiento (métodos) + identidad (referencia)`}</BlogCode>
    </>
  );
}

function SectionEncapsulacion() {
  return (
    <>
      <BlogH2>Encapsulación</BlogH2>
      <BlogP>
        La encapsulación protege el estado interno de un objeto usando
        modificadores de acceso y expone una API pública mediante métodos
        getter/setter o métodos de dominio.
      </BlogP>
      <BlogH3>Modificadores de acceso</BlogH3>
      <BlogCode>{`public class Empleado {
    private   String nombre;    // solo esta clase
              String departamento; // package-private (por defecto)
    protected double salario;   // paquete + subclases
    public     int    id;       // cualquiera

    // Getter con protección: no exponer el array original
    private final String[] habilidades = new String[10];

    public String[] getHabilidades() {
        return Arrays.copyOf(habilidades, habilidades.length);
    }

    // Setter con validación
    public void setSalario(double salario) {
        if (salario < 0) throw new IllegalArgumentException("El salario no puede ser negativo");
        this.salario = salario;
    }
}`}</BlogCode>
      <BlogCallout type="tip">
        Nunca devuelvas directamente una referencia a un array o lista mutable
        desde un getter. Usa <code>Collections.unmodifiableList()</code> o una
        copia defensiva.
      </BlogCallout>
    </>
  );
}

function SectionHerencia() {
  return (
    <>
      <BlogH2>Herencia</BlogH2>
      <BlogP>
        Java soporta herencia simple de clases con <code>extends</code>. Una
        subclase hereda todos los miembros <code>public</code> y{" "}
        <code>protected</code> de su superclase.
      </BlogP>
      <BlogCode>{`public abstract class Vehiculo {
    private final String matricula;
    private String estado = "detenido";

    public Vehiculo(String matricula) { this.matricula = matricula; }

    public final String getMatricula() { return matricula; }
    public abstract double calcularImpuesto();
    public void arrancar() { estado = "en marcha"; }
}

public class Coche extends Vehiculo {
    private final int plazas;

    public Coche(String matricula, int plazas) {
        super(matricula); // obligatorio llamar al constructor padre
        this.plazas = plazas;
    }

    @Override
    public double calcularImpuesto() {
        return 100 + plazas * 15;
    }

    @Override
    public void arrancar() {
        super.arrancar(); // reutilizar lógica del padre
        System.out.println("Coche arrancado: " + getMatricula());
    }
}`}</BlogCode>
      <BlogCallout type="warn">
        La herencia crea acoplamiento fuerte. Si cambias la superclase, todas
        las subclases se ven afectadas. Prefiere composición sobre herencia a
        menos que haya una relación "es-un" clara.
      </BlogCallout>
    </>
  );
}

function SectionInterfaces() {
  return (
    <>
      <BlogH2>Interfaces</BlogH2>
      <BlogP>
        Las interfaces definen contratos que las clases implementan. Desde Java
        8 pueden tener métodos <code>default</code> y <code>static</code>. Desde
        Java 9 tienen métodos <code>private</code>.
      </BlogP>
      <BlogCode>{`// Interfaz moderna con default method
public interface Reparable {
    void reparar();
    String obtenerDiagnostico();

    // Método default — las implementaciones pueden sobrescribirlo
    default boolean necesitaReparacion() {
        return obtenerDiagnostico().contains("fallo");
    }

    // Método static — utilidad asociada a la interfaz
    static Reparable crearNull() {
        return new Reparable() {
            public void reparar() { }
            public String obtenerDiagnostico() { return "ok"; }
        };
    }
}

// Functional interface (SAM — Single Abstract Method)
@FunctionalInterface
public interface Procesador<T, R> {
    R procesar(T input);
}

// Uso con lambdas
Procesador<String, Integer> contador = s -> s.length();`}</BlogCode>
      <BlogCallout type="tip">
        Una clase puede implementar múltiples interfaces, pero solo extender una
        clase. Las interfaces con <code>default</code> métodos permiten
        evolucionar APIs sin romper implementaciones existentes.
      </BlogCallout>
    </>
  );
}

function SectionPolimorfismo() {
  return (
    <>
      <BlogH2>Polimorfismo</BlogH2>
      <BlogP>
        El polimorfismo permite que objetos de diferentes clases respondan al
        mismo mensaje de forma distinta. En Java hay dos tipos:
      </BlogP>
      <BlogH3>Polimorfismo de subtipos (override)</BlogH3>
      <BlogCode>{`List<Vehiculo> flota = List.of(
    new Coche("1234ABC", 5),
    new Moto("5678DEF")
);

for (Vehiculo v : flota) {
    v.arrancar();                        // cada uno arranca a su manera
    System.out.println(v.calcularImpuesto()); // comportamiento polimórfico
}

// instanceof pattern matching (Java 16+)
if (v instanceof Coche c) {
    System.out.println("Plazas: " + c.getPlazas());
}`}</BlogCode>
      <BlogH3>Polimorfismo paramétrico (genéricos)</BlogH3>
      <BlogCode>{`public class Caja<T> {
    private T contenido;
    public void guardar(T item) { this.contenido = item; }
    public T obtener() { return contenido; }
}

// Wildcards — ? extends T (covarianza), ? super T (contravarianza)
public void copiar(List<? extends Vehiculo> origen, List<? super Vehiculo> destino) {
    destino.addAll(origen);
}`}</BlogCode>
    </>
  );
}

function SectionRecords() {
  return (
    <>
      <BlogH2>Records y clases selladas</BlogH2>
      <BlogH3>Records (Java 14+ preview, 16 stable)</BlogH3>
      <BlogP>
        Los records son clases inmutables que generan automáticamente
        constructor, getters, equals, hashCode y toString.
      </BlogP>
      <BlogCode>{`// En una línea — genera TODO
public record Persona(String nombre, int edad) {}

// Uso
var p = new Persona("Ana", 28);
System.out.println(p.nombre());  // getter — sin get prefijo
System.out.println(p);           // Persona[nombre=Ana, edad=28]

// Con validación — compact constructor
public record Email(String direccion) {
    public Email {
        if (!direccion.contains("@")) {
            throw new IllegalArgumentException("Email inválido");
        }
    }
}

// Records con métodos adicionales
public record Coordenada(double lat, double lon) {
    public double distanciaA(Coordenada otro) {
        return Math.sqrt(Math.pow(lat - otro.lat, 2) + Math.pow(lon - otro.lon, 2));
    }
}`}</BlogCode>
      <BlogH3>Clases selladas (Java 17+)</BlogH3>
      <BlogP>
        Las clases selladas restringen qué subclases pueden heredar de ellas.
        Esto permite modelar dominios cerrados como un enum pero con subclases.
      </BlogP>
      <BlogCode>{`// Sealed — solo estas tres clases pueden extender Forma
public sealed abstract class Forma permits Circulo, Rectangulo, Triangulo {
    public abstract double area();
}

public final class Circulo extends Forma {
    private final double radio;
    public Circulo(double radio) { this.radio = radio; }
    public double area() { return Math.PI * radio * radio; }
}

// Switch con pattern matching y sealed (Java 21+)
double area = switch (forma) {
    case Circulo c    -> Math.PI * c.radio() * c.radio();
    case Rectangulo r -> r.ancho() * r.alto();
    case Triangulo t  -> t.base() * t.altura() / 2.0;
};`}</BlogCode>
    </>
  );
}

function SectionPatrones() {
  return (
    <>
      <BlogH2>Patrones OOP en Java</BlogH2>
      <BlogH3>Builder pattern con record</BlogH3>
      <BlogCode>{`public record Usuario(String nombre, String email, int edad, List<String> roles) {
    public static class Builder {
        private String nombre;
        private String email;
        private int edad = 18;
        private List<String> roles = new ArrayList<>();

        public Builder nombre(String nombre) { this.nombre = nombre; return this; }
        public Builder email(String email)   { this.email = email;   return this; }
        public Builder edad(int edad)        { this.edad = edad;     return this; }
        public Builder rol(String rol)       { this.roles.add(rol);  return this; }

        public Usuario build() {
            return new Usuario(nombre, email, edad, List.copyOf(roles));
        }
    }
}

// Uso
Usuario admin = new Usuario.Builder()
    .nombre("Ana")
    .email("ana@empresa.com")
    .rol("ADMIN")
    .rol("USER")
    .build();`}</BlogCode>
      <BlogH3>Strategy pattern con lambdas</BlogH3>
      <BlogCode>{`// Sin necesidad de clases — la interfaz funcional es el strategy
Map<String, UnaryOperator<Double>> impuestos = Map.of(
    "general",  p -> p * 1.21,
    "reducido", p -> p * 1.10,
    "super",    p -> p * 1.04
);

double precioFinal = impuestos.getOrDefault("general", p -> p).apply(100.0);`}</BlogCode>
    </>
  );
}

function SectionEjercicios() {
  return (
    <>
      <BlogH2>Ejercicios</BlogH2>
      <BlogP>
        Practica los conceptos de POO con estos ejercicios progresivos.
      </BlogP>
      <div className="space-y-3">
        <ExerciseCard
          description="Crea una interfaz `Dibujable` con método `dibujar()`. Implementa `Circulo` y `Rectangulo`. Luego crea una clase `Lienzo` que contenga una lista de `Dibujable` y los dibuje todos."
          hint="Usa una `List<Dibujable>` y un bucle for-each."
          level="Intermedio"
          num={1}
          solution={
            'interface Dibujable { void dibujar(); }\nrecord Circulo(double radio) implements Dibujable {\n    public void dibujar() { System.out.println("Dibujando círculo de radio " + radio); }\n}\nrecord Rectangulo(double ancho, double alto) implements Dibujable {\n    public void dibujar() { System.out.println("Dibujando rectángulo " + ancho + "x" + alto); }\n}'
          }
          title="Sistema de figuras"
        />
        <ExerciseCard
          description="Define una jerarquía sellada de `OperacionMatematica` con Suma, Resta, Multiplicacion y Division (que puede lanzar excepción si se divide por cero). Usa pattern matching switch para ejecutarlas."
          hint="Usa `sealed interface` y `record` para los casos."
          level="Avanzado"
          num={2}
          title="Sealed shape hierarchy"
        />
        <ExerciseCard
          description='Implementa un Builder para construir consultas SQL SELECT. Debe soportar: SELECT campos, FROM tabla, WHERE condiciones, ORDER BY campo. Ejemplo: `new QueryBuilder().select("nombre", "edad").from("usuarios").where("edad &gt; 18").build()`.'
          hint="Almacena las partes como strings y conjuntalas en build() con espacios."
          level="Intermedio"
          num={3}
          title="Builder de consultas SQL"
        />
      </div>
    </>
  );
}

const SECTION_MAP = {
  intro: SectionIntro,
  encapsulacion: SectionEncapsulacion,
  herencia: SectionHerencia,
  interfaces: SectionInterfaces,
  polimorfismo: SectionPolimorfismo,
  records: SectionRecords,
  patrones: SectionPatrones,
  ejercicios: SectionEjercicios,
};

export default function JavaPooContent() {
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
                ? "bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 font-medium"
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
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium disabled:opacity-30 transition-colors"
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
