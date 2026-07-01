"use client";
import { useState } from "react";

type SectionId =
  | "intro"
  | "fundamentos"
  | "flujo"
  | "poo"
  | "colecciones"
  | "errores"
  | "streams"
  | "proyecto-final";

interface SectionDef {
  id: SectionId;
  label: string;
}
const SECTIONS: SectionDef[] = [
  { id: "intro", label: "1. Introduction" },
  { id: "fundamentos", label: "2. Fundamentals" },
  { id: "flujo", label: "3. Control Flow" },
  { id: "poo", label: "4. OOP" },
  { id: "colecciones", label: "5. Collections" },
  { id: "errores", label: "6. Errors" },
  { id: "streams", label: "7. Streams API" },
  { id: "proyecto-final", label: "Final Project" },
];

import {
  BlogH2,
  BlogH3,
  BlogP,
  BlogCode,
  BlogCallout,
} from "@/components/blog/shared";

function SectionIntro() {
  return (
    <>
      <BlogH2>Introduction to Java</BlogH2>
      <BlogP>
        Java is an object-oriented programming language, compiled to
        bytecode and executed on the JVM (Java Virtual Machine). Its historic
        motto is "write once, run anywhere". It is widely used in enterprise
        backend, Android, and distributed systems.
      </BlogP>
      <BlogCode>{`// Hello World in Java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, world!");

        // Variables
        String name = "Ana";
        int age = 28;
        System.out.printf("Hello, %s. You are %d years old.%n", name, age);
    }
}`}</BlogCode>
      <BlogCallout type="tip">
        Since Java 21 you can use "unnamed classes" and the{" "}
        <code>main</code> method without declaring the class. Makes initial
        learning easier.
      </BlogCallout>
      <BlogH3>Compile and run</BlogH3>
      <BlogCode>{`# Compile
javac HelloWorld.java

# Run
java HelloWorld

# With Maven
mvn compile
mvn exec:java -Dexec.mainClass="com.example.HelloWorld"`}</BlogCode>
    </>
  );
}

function SectionFundamentos() {
  return (
    <>
      <BlogH2>Java Fundamentals</BlogH2>
      <BlogH3>Primitive types and variables</BlogH3>
      <BlogP>
        Java is a statically typed language. It has 8 primitive types and
        their equivalent wrapper classes.
      </BlogP>
      <BlogCode>{`// Primitive types
byte   b  = 127;
short  s  = 32000;
int    i  = 2_147_483_647;   // underscore for readability
long   l  = 9_223_372_036L;  // L required for long
float  f  = 3.14f;           // f required for float
double d  = 3.141592653589;
boolean ok = true;
char   c  = 'A';

// Wrappers (objects)
Integer number  = 42;
String  text   = "Hello Java";
Double  decimal = 3.14;

// var (type inference, Java 10+)
var list  = new ArrayList<String>();
var map   = new HashMap<String, Integer>();`}</BlogCode>
      <BlogH3>Strings</BlogH3>
      <BlogCode>{`String s1 = "Hello";
String s2 = " World";

// Concatenation
String result = s1 + s2;

// String.format and formatted (Java 15+)
String greeting = "Hello, %s! You are %d years old.".formatted("Ana", 28);

// StringBuilder for loop concatenation
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 5; i++) {
    sb.append(i).append(", ");
}
System.out.println(sb.toString()); // "0, 1, 2, 3, 4, "

// Useful methods
System.out.println("java".toUpperCase());  // "JAVA"
System.out.println("  hello  ".trim());     // "hello"
System.out.println("java".contains("av")); // true`}</BlogCode>
    </>
  );
}

function SectionFlujo() {
  return (
    <>
      <BlogH2>Control Flow</BlogH2>
      <BlogH3>Conditionals</BlogH3>
      <BlogCode>{`int grade = 85;

// if / else if / else
if (grade >= 90) {
    System.out.println("Excellent");
} else if (grade >= 70) {
    System.out.println("Good");
} else if (grade >= 50) {
    System.out.println("Pass");
} else {
    System.out.println("Fail");
}

// Switch expression (Java 14+)
String category = switch (grade / 10) {
    case 10, 9 -> "Excellent";
    case 8, 7  -> "Good";
    case 6, 5  -> "Pass";
    default    -> "Fail";
};`}</BlogCode>
      <BlogH3>Loops</BlogH3>
      <BlogCode>{`// classic for
for (int i = 0; i < 5; i++) {
    System.out.print(i + " "); // 0 1 2 3 4
}

// for-each
int[] numbers = {1, 2, 3, 4, 5};
for (int n : numbers) {
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
}`}</BlogCode>
    </>
  );
}

function SectionPoo() {
  return (
    <>
      <BlogH2>Object-Oriented Programming</BlogH2>
      <BlogH3>Classes and encapsulation</BlogH3>
      <BlogCode>{`public class BankAccount {
    private final String holder;
    private double balance;

    public BankAccount(String holder, double initialBalance) {
        this.holder = holder;
        this.balance   = initialBalance;
    }

    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Amount must be positive");
        this.balance += amount;
    }

    public void withdraw(double amount) {
        if (amount > balance) throw new IllegalStateException("Insufficient balance");
        this.balance -= amount;
    }

    public double getBalance()   { return balance; }
    public String getHolder() { return holder; }

    @Override
    public String toString() {
        return "BankAccount{holder='%s', balance=%.2f}".formatted(holder, balance);
    }
}`}</BlogCode>
      <BlogH3>Inheritance and interfaces</BlogH3>
      <BlogCode>{`// Interface
public interface Serializable {
    String serialize();
    static <T> T deserialize(String data) { /* ... */ return null; }
}

// Abstract class
public abstract class Shape implements Serializable {
    protected String color;
    public Shape(String color) { this.color = color; }
    public abstract double area();
    public abstract double perimeter();
}

// Concrete implementation
public class Circle extends Shape {
    private final double radius;
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    @Override public double area()      { return Math.PI * radius * radius; }
    @Override public double perimeter() { return 2 * Math.PI * radius; }
    @Override public String serialize() {
        return "circle:%s:%.2f".formatted(color, radius);
    }
}`}</BlogCode>
      <BlogCallout type="tip">
        Prefer composition over inheritance whenever possible. Interfaces
        with default methods are more flexible than deep
        hierarchies.
      </BlogCallout>
    </>
  );
}

function SectionColecciones() {
  return (
    <>
      <BlogH2>Collections</BlogH2>
      <BlogH3>ArrayList and LinkedList</BlogH3>
      <BlogCode>{`import java.util.*;

// ArrayList: index access O(1), insertion O(n)
List<String> list = new ArrayList<>();
list.add("apple");
list.add("pear");
list.add(0, "strawberry");       // insert at position
list.remove("pear");
Collections.sort(list);
System.out.println(list);   // [apple, strawberry]

// Create with values (immutable)
List<Integer> nums = List.of(1, 2, 3, 4, 5);

// Iterate with index
for (int i = 0; i < list.size(); i++) {
    System.out.println(i + ": " + list.get(i));
}`}</BlogCode>
      <BlogH3>HashMap and HashSet</BlogH3>
      <BlogCode>{`// HashMap: key -> value, O(1) average
Map<String, Integer> ages = new HashMap<>();
ages.put("Ana", 28);
ages.put("Bob", 22);
ages.put("Ana", 29);  // overwrites

// Safe access
int ageAna = ages.getOrDefault("Ana", 0);
ages.putIfAbsent("Carlos", 35);

// Iterate
ages.forEach((name, age) ->
    System.out.println(name + " -> " + age));

// HashSet: unique elements, O(1) average
Set<String> visited = new HashSet<>();
visited.add("Madrid");
visited.add("Barcelona");
visited.add("Madrid");   // ignored
System.out.println(visited.size()); // 2`}</BlogCode>
    </>
  );
}

function SectionErrores() {
  return (
    <>
      <BlogH2>Error handling</BlogH2>
      <BlogH3>try / catch / finally</BlogH3>
      <BlogCode>{`public class ErrorExample {
    public static int divide(int a, int b) {
        if (b == 0) throw new ArithmeticException("Division by zero");
        return a / b;
    }

    public static void main(String[] args) {
        try {
            int result = divide(10, 0);
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.err.println("Error: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e);
        } finally {
            System.out.println("Finally block always executes");
        }
    }
}`}</BlogCode>
      <BlogH3>Custom exceptions</BlogH3>
      <BlogCode>{`// Checked exception (forces handling)
public class InsufficientBalanceException extends Exception {
    private final double currentBalance;
    private final double requestedAmount;

    public InsufficientBalanceException(double balance, double amount) {
        super("Insufficient balance. Available: %.2f, requested: %.2f"
              .formatted(balance, amount));
        this.currentBalance     = balance;
        this.requestedAmount = amount;
    }

    public double getShortage() { return requestedAmount - currentBalance; }
}

// Usage
try {
    account.withdraw(1000.0);
} catch (InsufficientBalanceException e) {
    System.err.println(e.getMessage());
    System.err.println("Missing: " + e.getShortage() + "€");
}`}</BlogCode>
      <BlogCallout type="warn">
        Use unchecked exceptions (extending <code>RuntimeException</code>)
        for programming errors and checked exceptions for recoverable situations
        the caller must handle.
      </BlogCallout>
    </>
  );
}

function SectionStreams() {
  return (
    <>
      <BlogH2>Streams API (Java 8+)</BlogH2>
      <BlogP>
        Streams allow processing collections in a functional and
        declarative way, similar to SQL. They are lazy: they only execute when a
        terminal operation is called.
      </BlogP>
      <BlogCode>{`import java.util.stream.*;
import java.util.*;

List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// filter + map + collect
List<Integer> evenSquares = numbers.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * n)
    .collect(Collectors.toList());
// [4, 16, 36, 64, 100]

// reduce
int sum = numbers.stream()
    .reduce(0, Integer::sum);

// Statistics
IntSummaryStatistics stats = numbers.stream()
    .mapToInt(Integer::intValue)
    .summaryStatistics();
System.out.println("Max: " + stats.getMax());
System.out.println("Avg: " + stats.getAverage());`}</BlogCode>
      <BlogCode>{`// Group by category
record Product(String name, String category, double price) {}

List<Product> products = List.of(
    new Product("Apple",  "fruit",     1.20),
    new Product("Bread",  "bakery",    0.80),
    new Product("Pear",   "fruit",     1.50)
);

Map<String, Double> totalByCat = products.stream()
    .collect(Collectors.groupingBy(
        Product::category,
        Collectors.summingDouble(Product::price)
    ));
// {fruit=2.70, bakery=0.80}`}</BlogCode>
    </>
  );
}

function SectionProyecto() {
  return (
    <>
      <BlogH2>Final Project: CLI Task Manager</BlogH2>
      <BlogP>
        A command-line application for managing tasks. Allows adding,
        listing, completing, and deleting tasks, with persistence in a JSON
        file.
      </BlogP>
      <BlogCode>{`// Task.java
import java.time.LocalDateTime;

public record Task(
    int id,
    String title,
    String description,
    boolean completed,
    LocalDateTime createdAt
) {
    public Task complete() {
        return new Task(id, title, description, true, createdAt);
    }

    @Override
    public String toString() {
        String status = completed ? "✓" : "○";
        return "[%s] #%d %s".formatted(status, id, title);
    }
}`}</BlogCode>
      <BlogCode>{`// TaskManager.java
import java.util.*;
import java.util.stream.*;

public class TaskManager {
    private final List<Task> tasks = new ArrayList<>();
    private int nextId = 1;

    public Task add(String title, String description) {
        var task = new Task(nextId++, title, description,
                              false, LocalDateTime.now());
        tasks.add(task);
        return task;
    }

    public Optional<Task> complete(int id) {
        for (int i = 0; i < tasks.size(); i++) {
            if (tasks.get(i).id() == id) {
                var completed = tasks.get(i).complete();
                tasks.set(i, completed);
                return Optional.of(completed);
            }
        }
        return Optional.empty();
    }

    public boolean delete(int id) {
        return tasks.removeIf(t -> t.id() == id);
    }

    public List<Task> listPending() {
        return tasks.stream()
            .filter(t -> !t.completed())
            .collect(Collectors.toList());
    }

    public List<Task> all() {
        return Collections.unmodifiableList(tasks);
    }
}`}</BlogCode>
      <BlogCode>{`// Main.java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        var manager  = new TaskManager();
        var scanner = new Scanner(System.in);

        // Sample data
        manager.add("Study Java Streams", "See chapter 7");
        manager.add("Do exercises", "Complete 5 exercises");
        manager.add("Review PR", "Review PR #42");

        System.out.println("=== Task Manager ===");
        boolean exit = false;

        while (!exit) {
            System.out.println("\\n1.List  2.Add  3.Complete  4.Delete  0.Exit");
            System.out.print("> ");
            String option = scanner.nextLine().trim();

            switch (option) {
                case "1" -> manager.all().forEach(System.out::println);
                case "2" -> {
                    System.out.print("Title: ");
                    String title = scanner.nextLine();
                    System.out.print("Description: ");
                    String desc = scanner.nextLine();
                    System.out.println("Created: " + manager.add(title, desc));
                }
                case "3" -> {
                    System.out.print("ID to complete: ");
                    int id = Integer.parseInt(scanner.nextLine());
                    manager.complete(id).ifPresentOrElse(
                        t -> System.out.println("Completed: " + t),
                        () -> System.out.println("Task not found")
                    );
                }
                case "4" -> {
                    System.out.print("ID to delete: ");
                    int id = Integer.parseInt(scanner.nextLine());
                    System.out.println(manager.delete(id) ? "Deleted" : "Not found");
                }
                case "0" -> exit = true;
                default  -> System.out.println("Invalid option");
            }
        }
        System.out.println("Goodbye!");
    }
}`}</BlogCode>
      <BlogCallout type="tip">
        Extend the project by adding persistence with{" "}
        <code>ObjectMapper</code> from Jackson to save tasks in JSON
        between sessions.
      </BlogCallout>
    </>
  );
}

export default function JavaContent() {
  const [active, setActive] = useState<SectionId>(SECTIONS[0].id);

  const renderSection = () => {
    switch (active) {
      case "intro":
        return <SectionIntro />;
      case "fundamentos":
        return <SectionFundamentos />;
      case "flujo":
        return <SectionFlujo />;
      case "poo":
        return <SectionPoo />;
      case "colecciones":
        return <SectionColecciones />;
      case "errores":
        return <SectionErrores />;
      case "streams":
        return <SectionStreams />;
      case "proyecto-final":
        return <SectionProyecto />;
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
