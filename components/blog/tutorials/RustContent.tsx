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

export default function RustContent() {
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
        Rust: memoria segura y rendimiento
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Rust te da el rendimiento de C sin los dolores de cabeza de la gestión
        manual de memoria. A través de su modelo de ownership, el compilador
        elimina errores de memoria en tiempo de compilación. Ideal si ya
        conoces punteros en C y quieres escribir código rápido sin garbage
        collector.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="que-es">Qué es Rust</BlogH2>

      <BlogP>
        Rust nació en 2006 como un proyecto personal de Graydon Hoare en Mozilla
        y se hizo público en 2010. La motivación era construir un lenguaje de
        sistemas seguro: sin <strong>garbage collector</strong>, sin fugas de
        memoria y sin accesos a memoria no válida, pero con el rendimiento de
        C/C++.
      </BlogP>

      <BlogP>
        La clave es su <strong>modelo de ownership</strong>: el compilador
        rastrea en tiempo de compilación quién posee cada dato, cuándo se
        libera y cuándo se puede acceder a él. Si tu código tiene un{" "}
        <em>use-after-free</em>, un doble free o una carrera de datos, no
        compila. Errores que en C causan vulnerabilidades de seguridad aquí se
        detectan antes de ejecutar nada.
      </BlogP>

      <BlogCallout type="info">
        El objetivo de Rust no es que el código "compile a la primera". Es muy
        normal que el compilador te corrija 20 veces antes de que tu programa
        haga algo. Esas correcciones son precisamente el valor: el compilador
        te enseña dónde está el problema de memoria antes de que llegue a
        producción.
      </BlogCallout>

      <BlogP>
        El ecosistema gira alrededor de <strong>Cargo</strong>, la herramienta
        oficial que combina gestor de paquetes, build system y runner de tests,
        similar a lo que npm es para Node pero integrado desde el primer día.
        El registro de paquetes se llama <BlogInlineCode>crates.io</BlogInlineCode>{" "}
        y cada paquete se llama <em>crate</em>.
      </BlogP>

      <BlogH2 id="instalar">Instalar</BlogH2>

      <BlogP>
        La forma oficial de instalar Rust es con <BlogInlineCode>rustup</BlogInlineCode>,
        el gestor de toolchains. Se instala con un script y luego te da acceso a{" "}
        <BlogInlineCode>cargo</BlogInlineCode> (build/gestor) y{" "}
        <BlogInlineCode>rustc</BlogInlineCode> (compilador):
      </BlogP>

      <BlogCode>{`# Instalar rustup (macOS y Linux)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Recargar la configuración del shell
source "$HOME/.cargo/env"

# Verificar
cargo --version
rustc --version`}</BlogCode>

      <BlogP>
        Crea un proyecto nuevo con <BlogInlineCode>cargo new</BlogInlineCode>.
        Te genera la estructura estándar y un repositorio git inicializado:
      </BlogP>

      <BlogCode>{`cargo new mi-proyecto
cd mi-proyecto

# Estructura generada:
#   Cargo.toml   → metadatos y dependencias
#   src/main.rs  → código fuente

# Compilar y ejecutar
cargo run`}</BlogCode>

      <BlogP>
        El <BlogInlineCode>Cargo.toml</BlogInlineCode> generado es mínimo:
      </BlogP>

      <BlogCode>{`[package]
name = "mi-proyecto"
version = "0.1.0"
edition = "2021"

[dependencies]`}</BlogCode>

      <BlogP>
        Y el <BlogInlineCode>main.rs</BlogInlineCode> inicial:
      </BlogP>

      <BlogCode>{`fn main() {
    println!("Hello, world!");
}`}</BlogCode>

      <BlogCallout type="tip">
        <BlogInlineCode>cargo new</BlogInlineCode> inicializa un repositorio git
        automáticamente. Si estás dentro de un repo ya existente, usa{" "}
        <BlogInlineCode>cargo new mi-proyecto --vcs none</BlogInlineCode> para
        evitarlo.
      </BlogCallout>

      <BlogH2 id="variables">Variables y tipos</BlogH2>

      <BlogP>
        Por defecto las variables en Rust son <strong>inmutables</strong>. Para
        poder modificarlas hay que marcarlas con <BlogInlineCode>mut</BlogInlineCode>.
        Es la decisión más segura: la mutabilidad pasa a ser explícita y solo
        donde realmente la necesitas:
      </BlogP>

      <BlogCode>{`fn main() {
    let mut contador = 0;   // mutable
    contador += 1;

    let nombre = "Ana";     // inmutable: no se puede reasignar
    // nombre = "Luis";     // ERROR: no se puede asignar a variable inmutable

    println!("{contador} {nombre}");
}`}</BlogCode>

      <BlogP>
        El <strong>shadowing</strong> permite re-declarar un nombre con un
        nuevo valor o incluso un nuevo tipo, sin necesidad de{" "}
        <BlogInlineCode>mut</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`fn main() {
    let x = 5;
    let x = x + 1;   // sombrea la anterior
    let x = x * 2;   // vuelve a sombrear
    println!("{x}"); // 12

    let texto = "42";
    let numero: i32 = texto.parse().expect("no es un número");
}`}</BlogCode>

      <BlogP>
        Los tipos básicos de Rust son explícitos y con tamaños definidos:
      </BlogP>

      <BlogCode>{`let activo: bool = true;        // booleano
let edad: u8 = 30;             // entero sin signo, 8 bits
let saldo: f64 = 99.5;         // coma flotante de 64 bits
let inicial: char = 'A';       // carácter Unicode
let letra = b'B';              // u8 literal de byte

// Tuplas: varios valores de tipos distintos
let par: (i32, &str) = (42, "respuesta");

// Arrays: tamaño fijo
let dias = [1, 2, 3, 4, 5];

// Vectores: dinámicos
let mut numeros = vec![1, 2, 3];
numeros.push(4);`}</BlogCode>

      <BlogP>
        Enteros: <BlogInlineCode>i8</BlogInlineCode> a{" "}
        <BlogInlineCode>i128</BlogInlineCode> (con signo) y{" "}
        <BlogInlineCode>u8</BlogInlineCode> a{" "}
        <BlogInlineCode>u128</BlogInlineCode> (sin signo), más{" "}
        <BlogInlineCode>isize</BlogInlineCode>/<BlogInlineCode>usize</BlogInlineCode>{" "}
        que dependen de la arquitectura (64 bits en tu máquina). Usa{" "}
        <BlogInlineCode>i32</BlogInlineCode> por defecto: es el más rápido en la
        mayoría de CPU.
      </BlogP>

      <BlogH2 id="ownership">Ownership</BlogH2>

      <BlogP>
        Esta es la sección más importante de Rust. Cada valor tiene un{" "}
        <strong>dueño</strong> (owner): la variable que lo contiene. Cuando el
        dueño sale del ámbito, el valor se <strong>libera</strong> automáticamente.
        Las reglas son tres:
      </BlogP>

      <BlogCode>{`// Regla 1: cada valor tiene un único dueño.
// Regla 2: al asignar o pasar como argumento, el valor se MUEVE
//          (el dueño original deja de ser válido).
// Regla 3: cuando el dueño sale del ámbito, el valor se libera.

fn main() {
    let s1 = String::from("hola");
    let s2 = s1;        // s1 se MUEVE a s2

    // println!("{s1}"); // ERROR: el valor fue movido
    println!("{s2}");   // OK
}`}</BlogCode>

      <BlogCallout type="warn">
        En C, hacer <BlogInlineCode>s2 = s1</BlogInlineCode> con punteros crea
        dos punteros al mismo dato: el famoso <em>doble free</em>. En Rust, esa
        asignación <strong>mueve</strong> el valor: el compilador impide usar{" "}
        <BlogInlineCode>s1</BlogInlineCode> después, eliminando la clase entera
        de errores. Los tipos que implementan{" "}
        <BlogInlineCode>Copy</BlogInlineCode> (números, booleanos, chars) se
        copian en vez de moverse:
      </BlogCallout>

      <BlogCode>{`fn main() {
    let a = 5;
    let b = a;   // i32 implementa Copy: ambos siguen válidos
    println!("{a} {b}"); // OK: 5 5
}`}</BlogCode>

      <BlogP>
        Para usar un valor sin moverlo, se <strong>presta</strong> (borrow) con
        una referencia <BlogInlineCode>&amp;</BlogInlineCode>. El préstamo
        inmutable permite leer sin tomar la propiedad:
      </BlogP>

      <BlogCode>{`fn longitud(s: &String) -> usize {
    s.len()   // solo lee, no mueve
}

fn main() {
    let texto = String::from("hello");
    let largo = longitud(&texto); // préstamo inmutable
    println!("{texto} tiene {largo} chars");
}`}</BlogCode>

      <BlogP>
        Si la función necesita modificar el valor, el préstamo debe ser{" "}
        <strong>mutable</strong> con <BlogInlineCode>&amp;mut</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`fn anadir_palabra(s: &mut String, palabra: &str) {
    s.push(' ');
    s.push_str(palabra);
}

fn main() {
    let mut saludo = String::from("hola");
    anadir_palabra(&mut saludo, "mundo");
    println!("{saludo}"); // hola mundo
}`}</BlogCode>

      <BlogCallout type="info">
        El compilador aplica el <strong>regla del aliasing</strong>: puedes
        tener muchos préstamos inmutables a la vez, o un único préstamo mutable,
        pero nunca ambos mezclados. Esto elimina las <em>data races</em> en
        tiempo de compilación, algo que ningún otro lenguaje de sistemas hace.
      </BlogCallout>

      <BlogH2 id="slices-referencias">Slices y referencias</BlogH2>

      <BlogP>
        Un <strong>slice</strong> es una vista (referencia + longitud) sobre
        una secuencia de datos contiguos, sin copiarlos. Es la forma idiomática
        de pasar trozos de texto o listas. El tipo <BlogInlineCode>&amp;str</BlogInlineCode>{" "}
        es un slice de un <BlogInlineCode>String</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`fn primera_palabra(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[..i]; // slice hasta el espacio
        }
    }
    &s[..] // sin espacios: devuelve todo
}

fn main() {
    let frase = String::from("hola mundo");
    let palabra = primera_palabra(&frase);
    println!("{palabra}"); // hola
}`}</BlogCode>

      <BlogP>
        El ejemplo demuestra algo poderoso: la función devuelve una referencia
        que <strong>vive tanto como la entrada</strong>. El compilador garantiza
        que <BlogInlineCode>palabra</BlogInlineCode> nunca pueda apuntar a
        memoria ya liberada, aunque{" "}
        <BlogInlineCode>frase</BlogInlineCode> se modifique después.
      </BlogP>

      <BlogP>
        Sobre arrays y vectores también puedes crear slices con rangos:
      </BlogP>

      <BlogCode>{`let numeros = [10, 20, 30, 40, 50];
let parte = &numeros[1..3];  // [20, 30]
let todo = &numeros[..];     // [10, 20, 30, 40, 50]`}</BlogCode>

      <BlogCallout type="warn">
        Indexar con un rango fuera de límites{" "}
        <strong>pánico en tiempo de ejecución</strong> (panic). En Rust, los
        errores de programación deben fallar rápido y con un mensaje claro en
        lugar de corromper memoria silenciosamente como en C.
      </BlogCallout>

      <BlogH2 id="structs-enums">Structs y enums</BlogH2>

      <BlogP>
        Los <BlogInlineCode>struct</BlogInlineCode> agrupan campos, y con{" "}
        <BlogInlineCode>impl</BlogInlineCode> se les añaden métodos. El{" "}
        <BlogInlineCode>&amp;self</BlogInlineCode> es un préstamo inmutable del
        struct (equivale a <BlogInlineCode>this</BlogInlineCode>):
      </BlogP>

      <BlogCode>{`struct Usuario {
    nombre: String,
    edad: u8,
    activo: bool,
}

impl Usuario {
    // Constructor convencional
    fn nuevo(nombre: String, edad: u8) -> Self {
        Usuario {
            nombre,
            edad,
            activo: true,
        }
    }

    fn saludar(&self) -> String {
        format!("Hola, soy {}", self.nombre)
    }
}

fn main() {
    let ana = Usuario::nuevo(String::from("Ana"), 22);
    println!("{}", ana.saludar());
}`}</BlogCode>

      <BlogP>
        Los <BlogInlineCode>enum</BlogInlineCode> en Rust son mucho más potentes
        que en otros lenguajes: cada variante puede <strong>llevar datos</strong>.
        Son la base del pattern matching:
      </BlogP>

      <BlogCode>{`enum Estado {
    Activo,
    Pausado { motivo: String }, // variante con campos
    Cancelado(u32),             // variante con un valor
}

fn main() {
    let estado = Estado::Pausado {
        motivo: String::from("vacaciones"),
    };
}`}</BlogCode>

      <BlogH2 id="match">Match y pattern matching</BlogH2>

      <BlogP>
        El <BlogInlineCode>match</BlogInlineCode> es el switch definitivo: cada
        brazo compara con un patrón y puede <strong>extraer datos</strong> de la
        variante. Es exhaustivo: el compilador obliga a cubrir todas las
        posibilidades:
      </BlogP>

      <BlogCode>{`fn describir(estado: Estado) -> String {
    match estado {
        Estado::Activo => String::from("en marcha"),
        Estado::Pausado { motivo } => format!("pausado por {motivo}"),
        Estado::Cancelado(codigo) => format!("cancelado (código {codigo})"),
    }
}`}</BlogCode>

      <BlogP>
        También funciona sobre números y otros valores, con patrones de rango y
        comodín <BlogInlineCode>_</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`fn main() {
    let numero = 3;
    match numero {
        1 => println!("uno"),
        2 | 3 => println!("dos o tres"),
        4..=10 => println!("entre cuatro y diez"),
        _ => println!("otro"),
    }
}`}</BlogCode>

      <BlogP>
        El tipo <BlogInlineCode>Option&lt;T&gt;</BlogInlineCode> representa un
        valor que puede existir o no — es la alternativa segura a{" "}
        <BlogInlineCode>null</BlogInlineCode>. Se combina con match para
        forzarte a tratar ambos casos:
      </BlogP>

      <BlogCode>{`fn main() {
    let valor: Option<i32> = Some(5);

    match valor {
        Some(n) => println!("Hay un valor: {n}"),
        None => println!("No hay valor"),
    }
}`}</BlogCode>

      <BlogCallout type="tip">
        No existe <BlogInlineCode>null</BlogInlineCode> en Rust. Donde otros
        lenguajes usan null (y explotan con NullPointerException), Rust usa{" "}
        <BlogInlineCode>Option</BlogInlineCode> y te obliga a decidir qué hacer
        con el caso vacío. Es imposible olvidarse del caso None.
      </BlogCallout>

      <BlogH2 id="errores">Errores</BlogH2>

      <BlogP>
        Rust no tiene excepciones. Los errores recuperables usan{" "}
        <BlogInlineCode>Result&lt;T, E&gt;</BlogInlineCode>: Ok(T) en éxito o
        Err(E) en fallo. Se maneja con match o con el operador{" "}
        <BlogInlineCode>?</BlogInlineCode>, que propaga el error hacia arriba:
      </BlogP>

      <BlogCode>{`use std::fs::File;
use std::io::{self, ErrorKind};

// Con match, decidiendo caso a caso
fn abrir_o_crear() -> Result<File, io::Error> {
    match File::open("hola.txt") {
        Ok(archivo) => Ok(archivo),
        Err(error) => match error.kind() {
            ErrorKind::NotFound => File::create("hola.txt"),
            otro => Err(otro),
        },
    }
}`}</BlogCode>

      <BlogP>
        El operador <BlogInlineCode>?</BlogInlineCode> es azúcar sintáctico:
        si el Result es Ok, extrae el valor; si es Err, devuelve el error de la
        función actual. Es la forma idiomática de escribir código limpio sin
        anidar matches:
      </BlogP>

      <BlogCode>{`use std::fs;
use std::io;

fn leer_contenido(ruta: &str) -> Result<String, io::Error> {
    let contenido = fs::read_to_string(ruta)?; // propaga el error si falla
    Ok(contenido)
}`}</BlogCode>

      <BlogP>
        Para prototipos o valores que "no pueden fallar", existe{" "}
        <BlogInlineCode>unwrap()</BlogInlineCode> (pánico si es Err) y{" "}
        <BlogInlineCode>expect("mensaje")</BlogInlineCode>, que añade contexto al
        pánico. Úsalos con moderación: en código de producción prefiere{" "}
        <BlogInlineCode>?</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`fn main() {
    // Pánico si el archivo no existe, con mensaje claro
    let contenido = fs::read_to_string("hola.txt")
        .expect("no se pudo leer hola.txt");
    println!("{contenido}");
}`}</BlogCode>

      <BlogCallout type="info">
        El pánico en Rust es controlado: se desenrolla la pila (o aborta según
        configuración) y libera memoria con su destructor, pero{" "}
        <BlogInlineCode>Option</BlogInlineCode> y{" "}
        <BlogInlineCode>Result</BlogInlineCode> son la vía normal para errores
        esperables como archivos que no existen o JSON mal formado.
      </BlogCallout>

      <BlogH2 id="traits">Traits</BlogH2>

      <BlogP>
        Los <strong>traits</strong> son el equivalente a interfaces: definen
        comportamiento que un tipo debe implementar. Un trait se declara con{" "}
        <BlogInlineCode>trait</BlogInlineCode> y se implementa para un tipo con{" "}
        <BlogInlineCode>impl Trait for Tipo</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`trait Sonido {
    fn sonido(&self) -> String;
}

struct Perro;
struct Gato;

impl Sonido for Perro {
    fn sonido(&self) -> String {
        String::from("guau")
    }
}

impl Sonido for Gato {
    fn sonido(&self) -> String {
        String::from("miau")
    }
}

// Función genérica que acepta cualquier tipo que implemente Sonido
fn imprimir_sonido(animal: &impl Sonido) {
    println!("{}", animal.sonido());
}

fn main() {
    imprimir_sonido(&Perro); // guau
    imprimir_sonido(&Gato);  // miau
}`}</BlogCode>

      <BlogP>
        Muchos traits se pueden <strong>derivar</strong> automáticamente con{" "}
        <BlogInlineCode>#[derive(...)]</BlogInlineCode>. Los más útiles:{" "}
        <BlogInlineCode>Debug</BlogInlineCode> (impresión de depuración) y{" "}
        <BlogInlineCode>Clone</BlogInlineCode> (copia explícita):
      </BlogP>

      <BlogCode>{`#[derive(Debug, Clone)]
struct Producto {
    nombre: String,
    precio: f64,
}

fn main() {
    let p1 = Producto {
        nombre: String::from("Teclado"),
        precio: 89.99,
    };
    let p2 = p1.clone(); // copia explícita
    println!("{:?}", p1); // salida de depuración
    println!("{:?}", p2);
}`}</BlogCode>

      <BlogH2 id="proyecto-cli">Proyecto CLI</BlogH2>

      <BlogP>
        Construyamos una herramienta de línea de comandos que reciba argumentos.
        <BlogInlineCode>env::args()</BlogInlineCode> devuelve el programa y sus
        argumentos:
      </BlogP>

      <BlogCode>{`use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    let comando = args.get(1).map(|s| s.as_str()).unwrap_or("help");

    match comando {
        "hola" => {
            let nombre = args.get(2).map(|s| s.as_str()).unwrap_or("mundo");
            println!("Hola, {nombre}!");
        }
        "suma" => {
            let a: i32 = args.get(2).map(|s| s.parse().unwrap_or(0)).unwrap_or(0);
            let b: i32 = args.get(3).map(|s| s.parse().unwrap_or(0)).unwrap_or(0);
            println!("{a} + {b} = {}", a + b);
        }
        _ => println!("Comandos: hola [nombre] | suma a b"),
    }
}`}</BlogCode>

      <BlogP>
        Compila con <BlogInlineCode>cargo build</BlogInlineCode> y ejecuta con{" "}
        <BlogInlineCode>cargo run</BlogInlineCode>, pasando argumentos después
        de <BlogInlineCode>--</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`# Compilar en modo debug
cargo build

# Compilar optimizado (modo release)
cargo build --release

# Ejecutar pasando argumentos
cargo run -- hola Ana
# Salida: Hola, Ana!

cargo run -- suma 4 7
# Salida: 4 + 7 = 11`}</BlogCode>

      <BlogP>
        Cargo también gestiona tests con <BlogInlineCode>cargo test</BlogInlineCode>{" "}
        y dependencias declaradas en <BlogInlineCode>Cargo.toml</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`[dependencies]
serde = { version = "1", features = ["derive"] }
clap = "4"`}</BlogCode>

      <BlogP>
        Para CLIs reales, la crate <BlogInlineCode>clap</BlogInlineCode> es el
        estándar de facto: parsea argumentos, genera la ayuda y valida tipos
        automáticamente. Para serializar JSON, <BlogInlineCode>serde</BlogInlineCode>{" "}
        es imprescindible.
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Ejercicios</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Escribe una función que tome un String por valor (moviéndolo), le añada texto con push_str y lo devuelva. Comprueba que el original ya no se puede usar."
          hint="Si pasas el String directamente, se mueve. Para ver el error, intenta usarlo después de la llamada."
          level="Básico"
          num={1}
          solution={`fn decorar(mut texto: String) -> String {
    texto.push_str("!");
    texto
}

fn main() {
    let mensaje = String::from("hola");
    let resultado = decorar(mensaje);
    // println!("{mensaje}"); // ERROR: mensaje fue movido
    println!("{resultado}");  // hola!
}`}
          title="Función con ownership"
        />

        <ExerciseCard
          description="Escribe una función que reciba un &str y devuelva la primera palabra (hasta el primer espacio). Si no hay espacio, devuelve todo."
          hint="Itera sobre s.as_bytes().iter().enumerate() y devuelve &s[..i] al encontrar b' '."
          level="Intermedio"
          num={2}
          solution={`fn primera_palabra(s: &str) -> &str {
    for (i, &item) in s.as_bytes().iter().enumerate() {
        if item == b' ' {
            return &s[..i];
        }
    }
    &s[..]
}

fn main() {
    let frase = String::from("aprendiendo rust");
    println!("{}", primera_palabra(&frase)); // aprendiendo
}`}
          title="Slice de strings"
        />

        <ExerciseCard
          description="Define un struct Rectangulo con ancho y alto, y un método area() que devuelva el producto. Pruébalo con un rectángulo."
          hint="Usa impl Rectangulo y recibe &self."
          level="Básico"
          num={3}
          solution={`struct Rectangulo {
    ancho: u32,
    alto: u32,
}

impl Rectangulo {
    fn area(&self) -> u32 {
        self.ancho * self.alto
    }
}

fn main() {
    let r = Rectangulo { ancho: 5, alto: 3 };
    println!("Área: {}", r.area()); // 15
}`}
          title="Struct con método"
        />

        <ExerciseCard
          description="Define un enum Mensaje con variantes: Texto(String), Salir y Error { codigo: u32 }. Escribe una función que use match para describir cada variante."
          hint="Extrae los datos con Texto(texto) y Error { codigo } en los brazos del match."
          level="Intermedio"
          num={4}
          solution={`enum Mensaje {
    Texto(String),
    Salir,
    Error { codigo: u32 },
}

fn describir(msg: Mensaje) -> String {
    match msg {
        Mensaje::Texto(t) => format!("texto: {t}"),
        Mensaje::Salir => String::from("cerrando"),
        Mensaje::Error { codigo } => format!("error {codigo}"),
    }
}

fn main() {
    println!("{}", describir(Mensaje::Texto(String::from("hola"))));
}`}
          title="Enum + match"
        />

        <ExerciseCard
          description="Escribe una función que lea un número de un archivo (como string), lo parsee a i32 y lo multiplique por 2, propagando errores con ?. Devuelve Result<i32, Box<dyn std::error::Error>>."
          hint="Encadena fs::read_to_string(ruta)? y luego .parse::<i32>()? en el mismo return."
          level="Avanzado"
          num={5}
          solution={`use std::fs;

fn doblar_numero(ruta: &str) -> Result<i32, Box<dyn std::error::Error>> {
    let contenido = fs::read_to_string(ruta)?;
    let numero: i32 = contenido.trim().parse()?;
    Ok(numero * 2)
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let resultado = doblar_numero("numero.txt")?;
    println!("Doble: {resultado}");
    Ok(())
}`}
          title="Result con ?"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        Con ownership, borrowing, enums, traits y Result ya tienes el núcleo de
        Rust. El compilador será tu mejor maestro durante las primeras semanas:
        cada error te enseña algo. Los siguientes pasos naturales son la crate{" "}
        <BlogInlineCode>clap</BlogInlineCode> para CLIs,{" "}
        <BlogInlineCode>serde</BlogInlineCode> para serialización,{" "}
        <BlogInlineCode>tokio</BlogInlineCode> para async y{" "}
        <BlogInlineCode>actix-web</BlogInlineCode> o{" "}
        <BlogInlineCode>axum</BlogInlineCode> para servidores web. Rust brilla
        donde el rendimiento y la fiabilidad no son negociables: sistemas de
        red, bases de datos, compiladores y WebAssembly.
      </BlogP>
    </article>
  );
}
