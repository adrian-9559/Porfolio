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

export default function RustContentEn() {
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
          75 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        Rust: safe memory and performance
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Rust gives you C-level performance without the headaches of manual
        memory management. Through its ownership model, the compiler eliminates
        memory errors at compile time. Ideal if you already know pointers in C
        and want to write fast code without a garbage collector.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="what-is">What is Rust</BlogH2>

      <BlogP>
        Rust began in 2006 as a personal project by Graydon Hoare at Mozilla and
        went public in 2010. The motivation was to build a safe systems
        language: no <strong>garbage collector</strong>, no memory leaks, and no
        invalid memory access, but with the performance of C/C++.
      </BlogP>

      <BlogP>
        The key is its <strong>ownership model</strong>: the compiler tracks at
        compile time who owns each piece of data, when it is freed, and when it
        can be accessed. If your code has a <em>use-after-free</em>, a double
        free, or a data race, it does not compile. Errors that cause security
        vulnerabilities in C are caught here before running anything.
      </BlogP>

      <BlogCallout type="info">
        The goal of Rust is not that your code "compiles on the first try". It
        is very normal for the compiler to correct you 20 times before your
        program does anything. Those corrections are exactly the value: the
        compiler teaches you where the memory problem is before it reaches
        production.
      </BlogCallout>

      <BlogP>
        The ecosystem revolves around <strong>Cargo</strong>, the official tool
        that combines package manager, build system, and test runner — similar
        to what npm is for Node but integrated from day one. The package
        registry is called <BlogInlineCode>crates.io</BlogInlineCode> and each
        package is called a <em>crate</em>.
      </BlogP>

      <BlogH2 id="install">Installing</BlogH2>

      <BlogP>
        The official way to install Rust is with <BlogInlineCode>rustup</BlogInlineCode>,
        the toolchain manager. It is installed with a script and then gives you
        access to <BlogInlineCode>cargo</BlogInlineCode> (build/manager) and{" "}
        <BlogInlineCode>rustc</BlogInlineCode> (compiler):
      </BlogP>

      <BlogCode>{`# Install rustup (macOS and Linux)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Reload the shell configuration
source "$HOME/.cargo/env"

# Verify
cargo --version
rustc --version`}</BlogCode>

      <BlogP>
        Create a new project with <BlogInlineCode>cargo new</BlogInlineCode>. It
        generates the standard structure and an initialized git repository:
      </BlogP>

      <BlogCode>{`cargo new my-project
cd my-project

# Generated structure:
#   Cargo.toml   → metadata and dependencies
#   src/main.rs  → source code

# Compile and run
cargo run`}</BlogCode>

      <BlogP>
        The generated <BlogInlineCode>Cargo.toml</BlogInlineCode> is minimal:
      </BlogP>

      <BlogCode>{`[package]
name = "my-project"
version = "0.1.0"
edition = "2021"

[dependencies]`}</BlogCode>

      <BlogP>
        And the initial <BlogInlineCode>main.rs</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`fn main() {
    println!("Hello, world!");
}`}</BlogCode>

      <BlogCallout type="tip">
        <BlogInlineCode>cargo new</BlogInlineCode> initializes a git repository
        automatically. If you are already inside an existing repo, use{" "}
        <BlogInlineCode>cargo new my-project --vcs none</BlogInlineCode> to
        avoid it.
      </BlogCallout>

      <BlogH2 id="variables">Variables and types</BlogH2>

      <BlogP>
        By default, variables in Rust are <strong>immutable</strong>. To modify
        them you must mark them with <BlogInlineCode>mut</BlogInlineCode>. It is
        the safest decision: mutability becomes explicit and only where you
        really need it:
      </BlogP>

      <BlogCode>{`fn main() {
    let mut counter = 0;   // mutable
    counter += 1;

    let name = "Ana";      // immutable: cannot be reassigned
    // name = "Luis";      // ERROR: cannot assign to immutable variable

    println!("{counter} {name}");
}`}</BlogCode>

      <BlogP>
        <strong>Shadowing</strong> lets you re-declare a name with a new value
        or even a new type, without needing <BlogInlineCode>mut</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`fn main() {
    let x = 5;
    let x = x + 1;   // shadows the previous one
    let x = x * 2;   // shadows again
    println!("{x}"); // 12

    let text = "42";
    let number: i32 = text.parse().expect("not a number");
}`}</BlogCode>

      <BlogP>
        The basic types of Rust are explicit and have defined sizes:
      </BlogP>

      <BlogCode>{`let active: bool = true;        // boolean
let age: u8 = 30;              // unsigned integer, 8 bits
let balance: f64 = 99.5;       // 64-bit floating point
let initial: char = 'A';       // Unicode character
let byte = b'B';               // u8 byte literal

// Tuples: several values of different types
let pair: (i32, &str) = (42, "answer");

// Arrays: fixed size
let days = [1, 2, 3, 4, 5];

// Vectors: dynamic
let mut numbers = vec![1, 2, 3];
numbers.push(4);`}</BlogCode>

      <BlogP>
        Integers: <BlogInlineCode>i8</BlogInlineCode> to{" "}
        <BlogInlineCode>i128</BlogInlineCode> (signed) and{" "}
        <BlogInlineCode>u8</BlogInlineCode> to{" "}
        <BlogInlineCode>u128</BlogInlineCode> (unsigned), plus{" "}
        <BlogInlineCode>isize</BlogInlineCode>/<BlogInlineCode>usize</BlogInlineCode>{" "}
        which depend on the architecture (64-bit on your machine). Use{" "}
        <BlogInlineCode>i32</BlogInlineCode> by default: it is the fastest on
        most CPUs.
      </BlogP>

      <BlogH2 id="ownership">Ownership</BlogH2>

      <BlogP>
        This is the most important section of Rust. Every value has an{" "}
        <strong>owner</strong>: the variable that contains it. When the owner
        goes out of scope, the value is <strong>freed</strong> automatically.
        There are three rules:
      </BlogP>

      <BlogCode>{`// Rule 1: each value has a single owner.
// Rule 2: on assignment or when passed as an argument, the value MOVES
//         (the original owner becomes invalid).
// Rule 3: when the owner goes out of scope, the value is freed.

fn main() {
    let s1 = String::from("hello");
    let s2 = s1;        // s1 MOVES to s2

    // println!("{s1}"); // ERROR: value was moved
    println!("{s2}");   // OK
}`}</BlogCode>

      <BlogCallout type="warn">
        In C, doing <BlogInlineCode>s2 = s1</BlogInlineCode> with pointers
        creates two pointers to the same data: the famous <em>double free</em>.
        In Rust, that assignment <strong>moves</strong> the value: the compiler
        prevents using <BlogInlineCode>s1</BlogInlineCode> afterwards,
        eliminating that whole class of errors. Types that implement{" "}
        <BlogInlineCode>Copy</BlogInlineCode> (numbers, booleans, chars) are
        copied instead of moved:
      </BlogCallout>

      <BlogCode>{`fn main() {
    let a = 5;
    let b = a;   // i32 implements Copy: both remain valid
    println!("{a} {b}"); // OK: 5 5
}`}</BlogCode>

      <BlogP>
        To use a value without moving it, you <strong>borrow</strong> it with a
        reference <BlogInlineCode>&amp;</BlogInlineCode>. The immutable borrow
        allows reading without taking ownership:
      </BlogP>

      <BlogCode>{`fn length(s: &String) -> usize {
    s.len()   // only reads, does not move
}

fn main() {
    let text = String::from("hello");
    let len = length(&text); // immutable borrow
    println!("{text} has {len} chars");
}`}</BlogCode>

      <BlogP>
        If the function needs to modify the value, the borrow must be{" "}
        <strong>mutable</strong> with <BlogInlineCode>&amp;mut</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`fn add_word(s: &mut String, word: &str) {
    s.push(' ');
    s.push_str(word);
}

fn main() {
    let mut greeting = String::from("hello");
    add_word(&mut greeting, "world");
    println!("{greeting}"); // hello world
}`}</BlogCode>

      <BlogCallout type="info">
        The compiler enforces the <strong>aliasing rule</strong>: you can have
        many immutable borrows at once, or a single mutable borrow, but never a
        mix of both. This eliminates <em>data races</em> at compile time,
        something no other systems language does.
      </BlogCallout>

      <BlogH2 id="slices-references">Slices and references</BlogH2>

      <BlogP>
        A <strong>slice</strong> is a view (reference + length) over a
        contiguous sequence of data, without copying it. It is the idiomatic way
        to pass pieces of text or lists. The type <BlogInlineCode>&amp;str</BlogInlineCode>{" "}
        is a slice of a <BlogInlineCode>String</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[..i]; // slice up to the space
        }
    }
    &s[..] // no spaces: return everything
}

fn main() {
    let sentence = String::from("hello world");
    let word = first_word(&sentence);
    println!("{word}"); // hello
}`}</BlogCode>

      <BlogP>
        The example demonstrates something powerful: the function returns a
        reference that <strong>lives as long as the input</strong>. The compiler
        guarantees that <BlogInlineCode>word</BlogInlineCode> can never point to
        already-freed memory, even if <BlogInlineCode>sentence</BlogInlineCode>{" "}
        is modified afterwards.
      </BlogP>

      <BlogP>
        You can also create slices over arrays and vectors with ranges:
      </BlogP>

      <BlogCode>{`let numbers = [10, 20, 30, 40, 50];
let part = &numbers[1..3];  // [20, 30]
let all = &numbers[..];     // [10, 20, 30, 40, 50]`}</BlogCode>

      <BlogCallout type="warn">
        Indexing with an out-of-bounds range <strong>panics at runtime</strong>.
        In Rust, programming errors must fail fast with a clear message instead
        of silently corrupting memory like in C.
      </BlogCallout>

      <BlogH2 id="structs-enums">Structs and enums</BlogH2>

      <BlogP>
        <BlogInlineCode>struct</BlogInlineCode> groups fields, and with{" "}
        <BlogInlineCode>impl</BlogInlineCode> you add methods. The{" "}
        <BlogInlineCode>&amp;self</BlogInlineCode> is an immutable borrow of the
        struct (the equivalent of <BlogInlineCode>this</BlogInlineCode>):
      </BlogP>

      <BlogCode>{`struct User {
    name: String,
    age: u8,
    active: bool,
}

impl User {
    // Conventional constructor
    fn new(name: String, age: u8) -> Self {
        User {
            name,
            age,
            active: true,
        }
    }

    fn greet(&self) -> String {
        format!("Hi, I am {}", self.name)
    }
}

fn main() {
    let ana = User::new(String::from("Ana"), 22);
    println!("{}", ana.greet());
}`}</BlogCode>

      <BlogP>
        <BlogInlineCode>enum</BlogInlineCode>s in Rust are much more powerful
        than in other languages: each variant can <strong>carry data</strong>.
        They are the foundation of pattern matching:
      </BlogP>

      <BlogCode>{`enum Status {
    Active,
    Paused { reason: String }, // variant with fields
    Canceled(u32),             // variant with a value
}

fn main() {
    let status = Status::Paused {
        reason: String::from("vacation"),
    };
}`}</BlogCode>

      <BlogH2 id="match">Match and pattern matching</BlogH2>

      <BlogP>
        <BlogInlineCode>match</BlogInlineCode> is the ultimate switch: each arm
        compares against a pattern and can <strong>extract data</strong> from
        the variant. It is exhaustive: the compiler forces you to cover all
        possibilities:
      </BlogP>

      <BlogCode>{`fn describe(status: Status) -> String {
    match status {
        Status::Active => String::from("running"),
        Status::Paused { reason } => format!("paused due to {reason}"),
        Status::Canceled(code) => format!("canceled (code {code})"),
    }
}`}</BlogCode>

      <BlogP>
        It also works on numbers and other values, with range patterns and the{" "}
        <BlogInlineCode>_</BlogInlineCode> wildcard:
      </BlogP>

      <BlogCode>{`fn main() {
    let number = 3;
    match number {
        1 => println!("one"),
        2 | 3 => println!("two or three"),
        4..=10 => println!("between four and ten"),
        _ => println!("something else"),
    }
}`}</BlogCode>

      <BlogP>
        The <BlogInlineCode>Option&lt;T&gt;</BlogInlineCode> type represents a
        value that may or may not exist — the safe alternative to{" "}
        <BlogInlineCode>null</BlogInlineCode>. It combines with match to force
        you to handle both cases:
      </BlogP>

      <BlogCode>{`fn main() {
    let value: Option<i32> = Some(5);

    match value {
        Some(n) => println!("There is a value: {n}"),
        None => println!("There is no value"),
    }
}`}</BlogCode>

      <BlogCallout type="tip">
        There is no <BlogInlineCode>null</BlogInlineCode> in Rust. Where other
        languages use null (and blow up with NullPointerException), Rust uses{" "}
        <BlogInlineCode>Option</BlogInlineCode> and forces you to decide what to
        do with the empty case. It is impossible to forget the None case.
      </BlogCallout>

      <BlogH2 id="errors">Errors</BlogH2>

      <BlogP>
        Rust has no exceptions. Recoverable errors use{" "}
        <BlogInlineCode>Result&lt;T, E&gt;</BlogInlineCode>: Ok(T) on success or
        Err(E) on failure. They are handled with match or with the{" "}
        <BlogInlineCode>?</BlogInlineCode> operator, which propagates the error
        upward:
      </BlogP>

      <BlogCode>{`use std::fs::File;
use std::io::{self, ErrorKind};

// With match, deciding case by case
fn open_or_create() -> Result<File, io::Error> {
    match File::open("hello.txt") {
        Ok(file) => Ok(file),
        Err(error) => match error.kind() {
            ErrorKind::NotFound => File::create("hello.txt"),
            other => Err(other),
        },
    }
}`}</BlogCode>

      <BlogP>
        The <BlogInlineCode>?</BlogInlineCode> operator is syntactic sugar: if
        the Result is Ok, it extracts the value; if it is Err, it returns the
        error from the current function. It is the idiomatic way to write clean
        code without nesting matches:
      </BlogP>

      <BlogCode>{`use std::fs;
use std::io;

fn read_content(path: &str) -> Result<String, io::Error> {
    let content = fs::read_to_string(path)?; // propagates the error if it fails
    Ok(content)
}`}</BlogCode>

      <BlogP>
        For prototypes or values that "cannot fail", there is{" "}
        <BlogInlineCode>unwrap()</BlogInlineCode> (panics if it is Err) and{" "}
        <BlogInlineCode>expect("message")</BlogInlineCode>, which adds context to
        the panic. Use them sparingly: in production code prefer{" "}
        <BlogInlineCode>?</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`fn main() {
    // Panics if the file does not exist, with a clear message
    let content = fs::read_to_string("hello.txt")
        .expect("could not read hello.txt");
    println!("{content}");
}`}</BlogCode>

      <BlogCallout type="info">
        Panicking in Rust is controlled: it unwinds the stack (or aborts
        depending on configuration) and frees memory with its destructor, but{" "}
        <BlogInlineCode>Option</BlogInlineCode> and{" "}
        <BlogInlineCode>Result</BlogInlineCode> are the normal path for
        expected errors like missing files or malformed JSON.
      </BlogCallout>

      <BlogH2 id="traits">Traits</BlogH2>

      <BlogP>
        <strong>Traits</strong> are the equivalent of interfaces: they define
        behavior that a type must implement. A trait is declared with{" "}
        <BlogInlineCode>trait</BlogInlineCode> and implemented for a type with{" "}
        <BlogInlineCode>impl Trait for Type</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`trait Sound {
    fn sound(&self) -> String;
}

struct Dog;
struct Cat;

impl Sound for Dog {
    fn sound(&self) -> String {
        String::from("woof")
    }
}

impl Sound for Cat {
    fn sound(&self) -> String {
        String::from("meow")
    }
}

// Generic function that accepts any type implementing Sound
fn print_sound(animal: &impl Sound) {
    println!("{}", animal.sound());
}

fn main() {
    print_sound(&Dog); // woof
    print_sound(&Cat); // meow
}`}</BlogCode>

      <BlogP>
        Many traits can be <strong>derived</strong> automatically with{" "}
        <BlogInlineCode>#[derive(...)]</BlogInlineCode>. The most useful:{" "}
        <BlogInlineCode>Debug</BlogInlineCode> (debug printing) and{" "}
        <BlogInlineCode>Clone</BlogInlineCode> (explicit copy):
      </BlogP>

      <BlogCode>{`#[derive(Debug, Clone)]
struct Product {
    name: String,
    price: f64,
}

fn main() {
    let p1 = Product {
        name: String::from("Keyboard"),
        price: 89.99,
    };
    let p2 = p1.clone(); // explicit copy
    println!("{:?}", p1); // debug output
    println!("{:?}", p2);
}`}</BlogCode>

      <BlogH2 id="cli-project">CLI project</BlogH2>

      <BlogP>
        Let us build a command-line tool that receives arguments.{" "}
        <BlogInlineCode>env::args()</BlogInlineCode> returns the program and its
        arguments:
      </BlogP>

      <BlogCode>{`use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    let command = args.get(1).map(|s| s.as_str()).unwrap_or("help");

    match command {
        "hello" => {
            let name = args.get(2).map(|s| s.as_str()).unwrap_or("world");
            println!("Hello, {name}!");
        }
        "sum" => {
            let a: i32 = args.get(2).map(|s| s.parse().unwrap_or(0)).unwrap_or(0);
            let b: i32 = args.get(3).map(|s| s.parse().unwrap_or(0)).unwrap_or(0);
            println!("{a} + {b} = {}", a + b);
        }
        _ => println!("Commands: hello [name] | sum a b"),
    }
}`}</BlogCode>

      <BlogP>
        Compile with <BlogInlineCode>cargo build</BlogInlineCode> and run with{" "}
        <BlogInlineCode>cargo run</BlogInlineCode>, passing arguments after{" "}
        <BlogInlineCode>--</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`# Compile in debug mode
cargo build

# Compile optimized (release mode)
cargo build --release

# Run passing arguments
cargo run -- hello Ana
# Output: Hello, Ana!

cargo run -- sum 4 7
# Output: 4 + 7 = 11`}</BlogCode>

      <BlogP>
        Cargo also manages tests with <BlogInlineCode>cargo test</BlogInlineCode>{" "}
        and dependencies declared in <BlogInlineCode>Cargo.toml</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`[dependencies]
serde = { version = "1", features = ["derive"] }
clap = "4"`}</BlogCode>

      <BlogP>
        For real CLIs, the <BlogInlineCode>clap</BlogInlineCode> crate is the de
        facto standard: it parses arguments, generates the help, and validates
        types automatically. For JSON serialization,{" "}
        <BlogInlineCode>serde</BlogInlineCode> is essential.
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="exercises">Exercises</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Write a function that takes a String by value (moving it), appends text with push_str, and returns it. Check that the original can no longer be used."
          hint="If you pass the String directly, it moves. To see the error, try using it after the call."
          level="Easy"
          num={1}
          solution={`fn decorate(mut text: String) -> String {
    text.push_str("!");
    text
}

fn main() {
    let message = String::from("hello");
    let result = decorate(message);
    // println!("{message}"); // ERROR: message was moved
    println!("{result}");     // hello!
}`}
          title="Function with ownership"
        />

        <ExerciseCard
          description="Write a function that takes a &str and returns the first word (up to the first space). If there is no space, return everything."
          hint="Iterate over s.as_bytes().iter().enumerate() and return &s[..i] when you find b' '."
          level="Intermediate"
          num={2}
          solution={`fn first_word(s: &str) -> &str {
    for (i, &item) in s.as_bytes().iter().enumerate() {
        if item == b' ' {
            return &s[..i];
        }
    }
    &s[..]
}

fn main() {
    let sentence = String::from("learning rust");
    println!("{}", first_word(&sentence)); // learning
}`}
          title="Slice of strings"
        />

        <ExerciseCard
          description="Define a Rectangle struct with width and height, and an area() method that returns the product. Test it with a rectangle."
          hint="Use impl Rectangle and take &self."
          level="Easy"
          num={3}
          solution={`struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let r = Rectangle { width: 5, height: 3 };
    println!("Area: {}", r.area()); // 15
}`}
          title="Struct with a method"
        />

        <ExerciseCard
          description="Define a Message enum with variants: Text(String), Quit, and Error { code: u32 }. Write a function that uses match to describe each variant."
          hint="Extract the data with Text(text) and Error { code } in the match arms."
          level="Intermediate"
          num={4}
          solution={`enum Message {
    Text(String),
    Quit,
    Error { code: u32 },
}

fn describe(msg: Message) -> String {
    match msg {
        Message::Text(t) => format!("text: {t}"),
        Message::Quit => String::from("closing"),
        Message::Error { code } => format!("error {code}"),
    }
}

fn main() {
    println!("{}", describe(Message::Text(String::from("hello"))));
}`}
          title="Enum + match"
        />

        <ExerciseCard
          description="Write a function that reads a number from a file (as a string), parses it to i32, multiplies it by 2, and propagates errors with ?. Return Result<i32, Box<dyn std::error::Error>>."
          hint="Chain fs::read_to_string(path)? and then .parse::<i32>()? in the same return."
          level="Hard"
          num={5}
          solution={`use std::fs;

fn double_number(path: &str) -> Result<i32, Box<dyn std::error::Error>> {
    let content = fs::read_to_string(path)?;
    let number: i32 = content.trim().parse()?;
    Ok(number * 2)
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let result = double_number("number.txt")?;
    println!("Double: {result}");
    Ok(())
}`}
          title="Result with ?"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        With ownership, borrowing, enums, traits, and Result you already have
        the core of Rust. The compiler will be your best teacher during the
        first weeks: every error teaches you something. The natural next steps
        are the <BlogInlineCode>clap</BlogInlineCode> crate for CLIs,{" "}
        <BlogInlineCode>serde</BlogInlineCode> for serialization,{" "}
        <BlogInlineCode>tokio</BlogInlineCode> for async, and{" "}
        <BlogInlineCode>actix-web</BlogInlineCode> or{" "}
        <BlogInlineCode>axum</BlogInlineCode> for web servers. Rust shines where
        performance and reliability are non-negotiable: network systems,
        databases, compilers, and WebAssembly.
      </BlogP>
    </article>
  );
}
