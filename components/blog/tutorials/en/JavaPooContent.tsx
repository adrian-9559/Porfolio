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
  { id: "intro", label: "1. OOP in Java" },
  { id: "encapsulacion", label: "2. Encapsulation" },
  { id: "herencia", label: "3. Inheritance" },
  { id: "interfaces", label: "4. Interfaces" },
  { id: "polimorfismo", label: "5. Polymorphism" },
  { id: "records", label: "6. Records & Sealed" },
  { id: "patrones", label: "7. OOP Patterns" },
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
      <BlogH2>OOP in Java: beyond the basics</BlogH2>
      <BlogP>
        Java is a purely object-oriented language (with some
        primitives). All code lives inside classes, and every object is an
        instance of a class. This tutorial assumes you already know basic Java
        syntax and dives into the pillars of OOP.
      </BlogP>
      <BlogP>The four pillars of OOP in Java are:</BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Encapsulation</strong> — hide internal state and expose
          only what's necessary
        </BlogLi>
        <BlogLi>
          <strong>Inheritance</strong> — reuse and extend behavior between
          classes
        </BlogLi>
        <BlogLi>
          <strong>Polymorphism</strong> — treat objects of different types
          through a common interface
        </BlogLi>
        <BlogLi>
          <strong>Abstraction</strong> — model real-world concepts through
          classes and interfaces
        </BlogLi>
      </BlogUl>
      <BlogCode>{`// Every object is an instance of a class
Object obj = new Object();
System.out.println(obj.getClass().getName()); // java.lang.Object

// Every object has: state (fields) + behavior (methods) + identity (reference)`}</BlogCode>
    </>
  );
}

function SectionEncapsulacion() {
  return (
    <>
      <BlogH2>Encapsulation</BlogH2>
      <BlogP>
        Encapsulation protects the internal state of an object using
        access modifiers and exposes a public API through getter/setter
        methods or domain methods.
      </BlogP>
      <BlogH3>Access modifiers</BlogH3>
      <BlogCode>{`public class Employee {
    private   String name;    // only this class
              String department; // package-private (default)
    protected double salary;   // package + subclasses
    public     int    id;       // anyone

    // Protected getter: don't expose the original array
    private final String[] skills = new String[10];

    public String[] getSkills() {
        return Arrays.copyOf(skills, skills.length);
    }

    // Setter with validation
    public void setSalary(double salary) {
        if (salary < 0) throw new IllegalArgumentException("Salary cannot be negative");
        this.salary = salary;
    }
}`}</BlogCode>
      <BlogCallout type="tip">
        Never directly return a reference to a mutable array or list
        from a getter. Use <code>Collections.unmodifiableList()</code> or a
        defensive copy.
      </BlogCallout>
    </>
  );
}

function SectionHerencia() {
  return (
    <>
      <BlogH2>Inheritance</BlogH2>
      <BlogP>
        Java supports single class inheritance with <code>extends</code>. A
        subclass inherits all <code>public</code> and{" "}
        <code>protected</code> members from its superclass.
      </BlogP>
      <BlogCode>{`public abstract class Vehicle {
    private final String licensePlate;
    private String state = "stopped";

    public Vehicle(String licensePlate) { this.licensePlate = licensePlate; }

    public final String getLicensePlate() { return licensePlate; }
    public abstract double calculateTax();
    public void start() { state = "running"; }
}

public class Car extends Vehicle {
    private final int seats;

    public Car(String licensePlate, int seats) {
        super(licensePlate); // required to call parent constructor
        this.seats = seats;
    }

    @Override
    public double calculateTax() {
        return 100 + seats * 15;
    }

    @Override
    public void start() {
        super.start(); // reuse parent logic
        System.out.println("Car started: " + getLicensePlate());
    }
}`}</BlogCode>
      <BlogCallout type="warn">
        Inheritance creates tight coupling. If you change the superclass, all
        subclasses are affected. Prefer composition over inheritance unless
        there is a clear "is-a" relationship.
      </BlogCallout>
    </>
  );
}

function SectionInterfaces() {
  return (
    <>
      <BlogH2>Interfaces</BlogH2>
      <BlogP>
        Interfaces define contracts that classes implement. Since Java
        8 they can have <code>default</code> and <code>static</code> methods. Since
        Java 9 they have <code>private</code> methods.
      </BlogP>
      <BlogCode>{`// Modern interface with default method
public interface Repairable {
    void repair();
    String getDiagnostic();

    // Default method — implementations can override it
    default boolean needsRepair() {
        return getDiagnostic().contains("failure");
    }

    // Static method — utility associated with the interface
    static Repairable createNull() {
        return new Repairable() {
            public void repair() { }
            public String getDiagnostic() { return "ok"; }
        };
    }
}

// Functional interface (SAM — Single Abstract Method)
@FunctionalInterface
public interface Processor<T, R> {
    R process(T input);
}

// Usage with lambdas
Processor<String, Integer> counter = s -> s.length();`}</BlogCode>
      <BlogCallout type="tip">
        A class can implement multiple interfaces but only extend one
        class. Interfaces with <code>default</code> methods allow evolving
        APIs without breaking existing implementations.
      </BlogCallout>
    </>
  );
}

function SectionPolimorfismo() {
  return (
    <>
      <BlogH2>Polymorphism</BlogH2>
      <BlogP>
        Polymorphism allows objects of different classes to respond to the
        same message in different ways. In Java there are two types:
      </BlogP>
      <BlogH3>Subtype polymorphism (override)</BlogH3>
      <BlogCode>{`List<Vehicle> fleet = List.of(
    new Car("1234ABC", 5),
    new Motorcycle("5678DEF")
);

for (Vehicle v : fleet) {
    v.start();                        // each starts in its own way
    System.out.println(v.calculateTax()); // polymorphic behavior
}

// instanceof pattern matching (Java 16+)
if (v instanceof Car c) {
    System.out.println("Seats: " + c.getSeats());
}`}</BlogCode>
      <BlogH3>Parametric polymorphism (generics)</BlogH3>
      <BlogCode>{`public class Box<T> {
    private T content;
    public void store(T item) { this.content = item; }
    public T retrieve() { return content; }
}

// Wildcards — ? extends T (covariance), ? super T (contravariance)
public void copy(List<? extends Vehicle> source, List<? super Vehicle> dest) {
    dest.addAll(source);
}`}</BlogCode>
    </>
  );
}

function SectionRecords() {
  return (
    <>
      <BlogH2>Records and sealed classes</BlogH2>
      <BlogH3>Records (Java 14+ preview, 16 stable)</BlogH3>
      <BlogP>
        Records are immutable classes that automatically generate
        constructor, getters, equals, hashCode, and toString.
      </BlogP>
      <BlogCode>{`// One line — generates EVERYTHING
public record Person(String name, int age) {}

// Usage
var p = new Person("Ana", 28);
System.out.println(p.name());  // getter — no get prefix
System.out.println(p);           // Person[name=Ana, age=28]

// With validation — compact constructor
public record Email(String address) {
    public Email {
        if (!address.contains("@")) {
            throw new IllegalArgumentException("Invalid email");
        }
    }
}

// Records with additional methods
public record Coordinate(double lat, double lon) {
    public double distanceTo(Coordinate other) {
        return Math.sqrt(Math.pow(lat - other.lat, 2) + Math.pow(lon - other.lon, 2));
    }
}`}</BlogCode>
      <BlogH3>Sealed classes (Java 17+)</BlogH3>
      <BlogP>
        Sealed classes restrict which subclasses can extend them.
        This allows modeling closed domains like an enum but with subclasses.
      </BlogP>
      <BlogCode>{`// Sealed — only these three classes can extend Shape
public sealed abstract class Shape permits Circle, Rectangle, Triangle {
    public abstract double area();
}

public final class Circle extends Shape {
    private final double radius;
    public Circle(double radius) { this.radius = radius; }
    public double area() { return Math.PI * radius * radius; }
}

// Switch with pattern matching and sealed (Java 21+)
double area = switch (shape) {
    case Circle c    -> Math.PI * c.radius() * c.radius();
    case Rectangle r -> r.width() * r.height();
    case Triangle t  -> t.base() * t.height() / 2.0;
};`}</BlogCode>
    </>
  );
}

function SectionPatrones() {
  return (
    <>
      <BlogH2>OOP Patterns in Java</BlogH2>
      <BlogH3>Builder pattern with record</BlogH3>
      <BlogCode>{`public record User(String name, String email, int age, List<String> roles) {
    public static class Builder {
        private String name;
        private String email;
        private int age = 18;
        private List<String> roles = new ArrayList<>();

        public Builder name(String name) { this.name = name; return this; }
        public Builder email(String email)   { this.email = email;   return this; }
        public Builder age(int age)        { this.age = age;     return this; }
        public Builder role(String role)       { this.roles.add(role);  return this; }

        public User build() {
            return new User(name, email, age, List.copyOf(roles));
        }
    }
}

// Usage
User admin = new User.Builder()
    .name("Ana")
    .email("ana@company.com")
    .role("ADMIN")
    .role("USER")
    .build();`}</BlogCode>
      <BlogH3>Strategy pattern with lambdas</BlogH3>
      <BlogCode>{`// No need for classes — the functional interface is the strategy
Map<String, UnaryOperator<Double>> taxes = Map.of(
    "general",  p -> p * 1.21,
    "reduced", p -> p * 1.10,
    "super",    p -> p * 1.04
);

double finalPrice = taxes.getOrDefault("general", p -> p).apply(100.0);`}</BlogCode>
    </>
  );
}

function SectionEjercicios() {
  return (
    <>
      <BlogH2>Exercises</BlogH2>
      <BlogP>
        Practice OOP concepts with these progressive exercises.
      </BlogP>
      <div className="space-y-3">
        <ExerciseCard
          description="Create a `Drawable` interface with a `draw()` method. Implement `Circle` and `Rectangle`. Then create a `Canvas` class that holds a list of `Drawable` and draws them all."
          hint="Use a `List<Drawable>` and a for-each loop."
          level="Intermedio"
          num={1}
          solution={
            'interface Drawable { void draw(); }\nrecord Circle(double radius) implements Drawable {\n    public void draw() { System.out.println("Drawing circle with radius " + radius); }\n}\nrecord Rectangle(double width, double height) implements Drawable {\n    public void draw() { System.out.println("Drawing rectangle " + width + "x" + height); }\n}'
          }
          title="Shape system"
        />
        <ExerciseCard
          description="Define a sealed hierarchy of `MathOperation` with Sum, Subtract, Multiply, and Divide (which can throw an exception if dividing by zero). Use pattern matching switch to execute them."
          hint="Use `sealed interface` and `record` for the cases."
          level="Avanzado"
          num={2}
          title="Sealed shape hierarchy"
        />
        <ExerciseCard
          description='Implement a Builder for constructing SQL SELECT queries. It should support: SELECT fields, FROM table, WHERE conditions, ORDER BY field. Example: `new QueryBuilder().select("name", "age").from("users").where("age &gt; 18").build()`.'
          hint="Store parts as strings and join them in build() with spaces."
          level="Intermedio"
          num={3}
          title="SQL query builder"
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
            ← Previous
          </button>
          <button
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium disabled:opacity-30 transition-colors"
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
