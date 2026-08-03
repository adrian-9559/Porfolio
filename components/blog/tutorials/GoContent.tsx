"use client";
import { useState } from "react";

import {
  BlogH2,
  BlogH3,
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

export default function GoContent() {
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
          70 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        Go: cero a servidor web
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Go es el lenguaje creado por Google para construir sistemas rápidos y
        fáciles de mantener. En este tutorial pasarás de cero absoluto a
        escribir tu primer servidor web con API REST, pasando por variables,
        funciones, structs y goroutines. Solo necesitas conceptos previos de
        programación.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="que-es">Qué es Go</BlogH2>

      <BlogP>
        Go (también llamado Golang) nació en 2009 dentro de Google, creado por
        Robert Griesemer, Rob Pike y Ken Thompson para resolver un problema
        concreto: los programas en C++ tardaban mucho en compilar y eran
        difíciles de leer. Go se diseñó para que escribir software de servidor
        fuera <strong>simple, rápido y seguro</strong>. Es{" "}
        <strong>compilado</strong>: <BlogInlineCode>go build</BlogInlineCode>{" "}
        genera un binario nativo sin máquina virtual, ideal para
        microservicios, CLIs y sistemas de red.
      </BlogP>

      <BlogCallout type="info">
        En Go no existen <BlogInlineCode>while</BlogInlineCode> ni{" "}
        <BlogInlineCode>do-while</BlogInlineCode>: solo{" "}
        <BlogInlineCode>for</BlogInlineCode>. Pocas palabras reservadas y una
        sola forma de hacer cada cosa. Otra clave son las{" "}
        <strong>goroutines</strong>: funciones concurrentes ligerísimas que se
        lanzan con la palabra <BlogInlineCode>go</BlogInlineCode> y que el
        runtime reparte entre pocos hilos reales. Por eso Docker o Kubernetes,
        escritos en Go, manejan enorme tráfico con pocos recursos.
      </BlogCallout>

      <BlogH2 id="instalar">Instalar y primer programa</BlogH2>

      <BlogP>
        En macOS se instala con Homebrew; en Linux con el gestor de paquetes
        (por ejemplo <BlogInlineCode>apt install golang</BlogInlineCode>) o
        desde go.dev; en Windows hay instalador MSI oficial.
      </BlogP>

      <BlogCode>{`# Instalar Go en macOS
brew install go

# Verificar la versión instalada
go version`}</BlogCode>

      <BlogP>
        Crea una carpeta y un archivo <BlogInlineCode>hola.go</BlogInlineCode>.
        Todo archivo ejecutable empieza con{" "}
        <BlogInlineCode>package main</BlogInlineCode> y una función{" "}
        <BlogInlineCode>main</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`package main

import "fmt"

func main() {
    fmt.Println("Hola, Go!")
}`}</BlogCode>

      <BlogP>
        <BlogInlineCode>go run</BlogInlineCode> compila y ejecuta en un solo
        paso. Para distribuir, <BlogInlineCode>go build</BlogInlineCode> genera
        un binario listo para copiar a cualquier servidor:
      </BlogP>

      <BlogCode>{`go run hola.go
# Salida: Hola, Go!

go build hola.go
./hola`}</BlogCode>

      <BlogCallout type="tip">
        El binario de Go es estáticamente enlazado: sin dependencias del
        sistema, copias un archivo y funciona. Las imágenes Docker resultantes
        son minúsculas.
      </BlogCallout>

      <BlogH2 id="modulos">Módulos y go.mod</BlogH2>

      <BlogP>
        Desde la versión 1.11, Go gestiona dependencias con{" "}
        <strong>módulos</strong>: un conjunto de paquetes con un archivo{" "}
        <BlogInlineCode>go.mod</BlogInlineCode> que declara el nombre del
        proyecto y sus dependencias, como{" "}
        <BlogInlineCode>package.json</BlogInlineCode> en Node:
      </BlogP>

      <BlogCode>{`# Inicializar un módulo en la carpeta actual
go mod init ejemplo/hola

// go.mod generado automáticamente
module ejemplo/hola

go 1.23`}</BlogCode>

      <BlogP>
        El nombre del módulo suele ser la ruta del repositorio (por ejemplo{" "}
        <BlogInlineCode>github.com/tu-usuario/mi-api</BlogInlineCode>), para que
        los paquetes se importen entre sí usando esa ruta. Para añadir una
        dependencia usa <BlogInlineCode>go get</BlogInlineCode>, y antes de cada
        commit ejecuta <BlogInlineCode>go mod tidy</BlogInlineCode>, que elimina
        dependencias sin usar y descarga las que faltan:
      </BlogP>

      <BlogCode>{`go get github.com/gorilla/mux   # añade la dependencia
go mod tidy                    # limpia y descarga lo necesario`}</BlogCode>

      <BlogP>
        <BlogInlineCode>go.mod</BlogInlineCode> registra las versiones exactas y{" "}
        <BlogInlineCode>go.sum</BlogInlineCode> los hashes de integridad para
        builds reproducibles. Con módulos,{" "}
        <BlogInlineCode>go get</BlogInlineCode> actualiza go.mod
        automáticamente; ya no se instala nada dentro del GOPATH clásico.
      </BlogP>

      <BlogH2 id="variables">Variables y tipos</BlogH2>

      <BlogP>
        Go es fuertemente tipado pero con inferencia. Se declara con{" "}
        <BlogInlineCode>var</BlogInlineCode> o con el operador corto{" "}
        <BlogInlineCode>:=</BlogInlineCode>, que declara e infiere el tipo en
        una línea. Dentro de funciones usa <BlogInlineCode>:=</BlogInlineCode>;
        usa <BlogInlineCode>var</BlogInlineCode> a nivel de paquete o para
        declarar sin inicializar:
      </BlogP>

      <BlogCode>{`package main

import "fmt"

const Pi = 3.1416 // constante: no se puede reasignar

func main() {
    var edad int = 30    // declaración explícita
    var nombre string    // valor cero: ""
    nombre = "Ana"

    altura := 1.75       // declaración corta: infiere float64

    fmt.Println(nombre, edad, altura, Pi)
}`}</BlogCode>

      <BlogH3 id="tipos-basicos">Tipos básicos</BlogH3>

      <BlogP>
        Los tipos básicos incluyen <BlogInlineCode>bool</BlogInlineCode>,{" "}
        <BlogInlineCode>int</BlogInlineCode> (entero dependiente de la
        plataforma), <BlogInlineCode>float64</BlogInlineCode>,{" "}
        <BlogInlineCode>byte</BlogInlineCode> (alias de{" "}
        <BlogInlineCode>uint8</BlogInlineCode>), <BlogInlineCode>rune</BlogInlineCode>{" "}
        (carácter Unicode), slices <BlogInlineCode>[]string</BlogInlineCode> y
        mapas <BlogInlineCode>map[string]int</BlogInlineCode>.
      </BlogP>

      <BlogP>
        Go no tiene herencia ni clases: tiene <strong>structs</strong> con
        métodos e <strong>interfaces</strong> implícitas. Tampoco tiene{" "}
        <BlogInlineCode>null</BlogInlineCode>: usa valores cero por defecto (0,
        vacío, false) y <BlogInlineCode>nil</BlogInlineCode> para punteros,
        interfaces y funciones.
      </BlogP>

      <BlogH2 id="control-flujo">Control de flujo</BlogH2>

      <BlogP>
        El <BlogInlineCode>if</BlogInlineCode> no necesita paréntesis, pero las
        llaves son obligatorias, y permite declarar una variable en la propia
        condición. Solo existe <BlogInlineCode>for</BlogInlineCode> (clásico,
        estilo while e infinito), y <BlogInlineCode>for range</BlogInlineCode>{" "}
        itera devolviendo índice y valor. El <BlogInlineCode>switch</BlogInlineCode>{" "}
        no necesita <BlogInlineCode>break</BlogInlineCode> y funciona sin
        expresión:
      </BlogP>

      <BlogCode>{`if nota := 7; nota >= 5 {
    fmt.Println("Aprobado")
} else if nota >= 3 {
    fmt.Println("Suspenso")
} else {
    fmt.Println("Muy bajo")
}

for i := 1; i <= 5; i++ {
    fmt.Println(i)
}

n := 10
for n > 0 {
    n--
}

frutas := []string{"manzana", "pera", "uva"}
for _, fruta := range frutas {
    fmt.Println(fruta)
}`}</BlogCode>

      <BlogCode>{`func diaEnPalabras(dia int) string {
    switch dia {
    case 1:
        return "Lunes"
    case 2, 3, 4, 5:
        return "Entre semana"
    case 6, 7:
        return "Fin de semana"
    default:
        return "Desconocido"
    }
}`}</BlogCode>

      <BlogH2 id="funciones">Funciones y errores</BlogH2>

      <BlogP>
        Las funciones se declaran con <BlogInlineCode>func</BlogInlineCode> y
        pueden devolver <strong>varios valores</strong>. La convención es
        devolver el resultado junto con un <BlogInlineCode>error</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`package main

import (
    "errors"
    "fmt"
)

func dividir(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("no se puede dividir entre cero")
    }
    return a / b, nil
}

func main() {
    resultado, err := dividir(10, 2)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("Resultado:", resultado)
}`}</BlogCode>

      <BlogCallout type="info">
        Los errores en Go son <strong>valores</strong>, no excepciones: no hay{" "}
        <BlogInlineCode>try/catch</BlogInlineCode>. Cada función que puede
        fallar devuelve un error y el llamador decide qué hacer. Parece
        verboso, pero garantiza que ningún error se ignore en silencio.
      </BlogCallout>

      <BlogH2 id="structs-interfaces">Structs e interfaces</BlogH2>

      <BlogP>
        Un <BlogInlineCode>struct</BlogInlineCode> agrupa campos relacionados.
        Los métodos se definen fuera, con un <em>receptor</em> que indica sobre
        qué tipo actúan; por valor no modifican, por puntero sí:
      </BlogP>

      <BlogCode>{`type Usuario struct {
    Nombre string
    Edad   int
    Email  string
}

// Receptor por valor: no modifica el struct
func (u Usuario) Saludar() string {
    return "Hola, soy " + u.Nombre
}

// Receptor por puntero: permite modificar
func (u *Usuario) CumplirAnios() {
    u.Edad++
}

func main() {
    ana := Usuario{Nombre: "Ana", Edad: 21, Email: "ana@email.com"}
    fmt.Println(ana.Saludar())
    ana.CumplirAnios()
    fmt.Println(ana.Edad) // 22
}`}</BlogCode>

      <BlogP>
        Las <strong>interfaces</strong> son <strong>implícitas</strong>: un tipo
        la implementa automáticamente si tiene sus métodos, sin declararlo.
        Esto desacopla el código: quien consume la interfaz no sabe nada del
        tipo concreto.
      </BlogP>

      <BlogCode>{`type Describible interface {
    Descripcion() string
}

type Libro struct {
    Titulo  string
    Paginas int
}

// Libro implementa Describible sin declararlo explícitamente
func (l Libro) Descripcion() string {
    return l.Titulo + " (" + fmt.Sprint(l.Paginas) + " páginas)"
}`}</BlogCode>

      <BlogH2 id="goroutines-channels">Goroutines y channels</BlogH2>

      <BlogP>
        Una <strong>goroutine</strong> se lanza anteponiendo{" "}
        <BlogInlineCode>go</BlogInlineCode>. Para comunicarse se usa un{" "}
        <strong>channel</strong> (<BlogInlineCode>chan</BlogInlineCode>) con el
        operador <BlogInlineCode>&lt;-</BlogInlineCode>. Los channels sin buffer
        sincronizan; los <strong>buffered</strong> tienen capacidad y evitan
        bloqueos, como en un pool de trabajadores:
      </BlogP>

      <BlogCode>{`func trabajador(id int, trabajos <-chan int, resultados chan<- int) {
    for t := range trabajos {
        fmt.Printf("Trabajador %d procesa %d\n", id, t)
        resultados <- t * 2
    }
}

func main() {
    trabajos := make(chan int, 5)
    resultados := make(chan int, 5)

    for i := 1; i <= 3; i++ {
        go trabajador(i, trabajos, resultados)
    }

    for i := 1; i <= 5; i++ {
        trabajos <- i
    }
    close(trabajos)

    for i := 1; i <= 5; i++ {
        fmt.Println("Resultado:", <-resultados)
    }
}`}</BlogCode>

      <BlogCallout type="warn">
        Enviar a un channel cerrado provoca un pánico. Regla de oro:{" "}
        <strong>solo el emisor cierra el channel</strong>, nunca el receptor.
        <BlogInlineCode>range</BlogInlineCode> sobre un channel itera hasta que
        este se cierra.
      </BlogCallout>

      <BlogH2 id="paquetes">Paquetes</BlogH2>

      <BlogP>
        Todo código vive en un <strong>paquete</strong>: un directorio con
        archivos que comparten la misma declaración. El programa ejecutable es{" "}
        <BlogInlineCode>package main</BlogInlineCode>; el resto son librerías
        que se importan por su ruta, derivada del nombre del módulo en go.mod.
        La visibilidad se controla con la <strong>mayúscula inicial</strong>:
        los nombres exportados empiezan en mayúscula, los privados en
        minúscula. No existen <BlogInlineCode>public</BlogInlineCode> ni{" "}
        <BlogInlineCode>private</BlogInlineCode>.
      </BlogP>

      <BlogCode>{`package main

import "fmt"

// Saludo es público: empieza en mayúscula
func Saludo(nombre string) string {
    return "Hola, " + nombre
}

func main() {
    fmt.Println(Saludo("ana"))
}`}</BlogCode>

      <BlogCallout type="info">
        La biblioteca estándar cubre HTTP, JSON, criptografía, testing y
        concurrencia. Antes de instalar un paquete externo, revisa si existe en{" "}
        <BlogInlineCode>pkg.go.dev</BlogInlineCode> dentro de la stdlib.
      </BlogCallout>

      <BlogH2 id="http">HTTP con net/http</BlogH2>

      <BlogP>
        El paquete <BlogInlineCode>net/http</BlogInlineCode> es de los más
        potentes de la stdlib. Cada handler recibe un{" "}
        <BlogInlineCode>http.ResponseWriter</BlogInlineCode> (donde escribes la
        respuesta) y un <BlogInlineCode>http.Request</BlogInlineCode> (con toda
        la información de la petición). Construyamos una API REST completa con{" "}
        <BlogInlineCode>GET</BlogInlineCode> y{" "}
        <BlogInlineCode>POST</BlogInlineCode>, gestionando JSON y protegiendo la
        lista con un mutex:
      </BlogP>

      <BlogCode>{`package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "sync"
)

type Tarea struct {
    ID   int    \`json:"id"\`
    Text string \`json:"text"\`
    Done bool   \`json:"done"\`
}

var (
    tareas = []Tarea{{ID: 1, Text: "Aprender Go", Done: false}}
    nextID = 2
    mutex  sync.Mutex
)

func main() {
    http.HandleFunc("/", home)
    http.HandleFunc("/tareas", tareasHandler)

    fmt.Println("Servidor escuchando en http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

func home(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Bienvenido a la API de tareas en Go")
}

func tareasHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    switch r.Method {
    case http.MethodGet:
        json.NewEncoder(w).Encode(tareas)

    case http.MethodPost:
        var nueva Tarea
        if err := json.NewDecoder(r.Body).Decode(&nueva); err != nil {
            http.Error(w, "JSON inválido", http.StatusBadRequest)
            return
        }
        mutex.Lock()
        nueva.ID = nextID
        nextID++
        tareas = append(tareas, nueva)
        mutex.Unlock()

        w.WriteHeader(http.StatusCreated)
        json.NewEncoder(w).Encode(nueva)

    default:
        http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
    }
}`}</BlogCode>

      <BlogP>
        Las <strong>etiquetas de struct</strong> (los backticks con{" "}
        <BlogInlineCode>json:"id"</BlogInlineCode>) indican a{" "}
        <BlogInlineCode>encoding/json</BlogInlineCode> cómo convertir cada campo
        a JSON; sin ellas se serializarían con el nombre en mayúscula. Prueba:
        <BlogInlineCode>curl http://localhost:8080/tareas</BlogInlineCode> para
        listar y <BlogInlineCode>{"curl -X POST -d '{\"text\":\"Escribir API en Go\"}' -H \"Content-Type: application/json\" http://localhost:8080/tareas"}</BlogInlineCode>{" "}
        para crear.
      </BlogP>

      <BlogCallout type="tip">
        Para rutas con parámetros dinámicos (como{" "}
        <BlogInlineCode>/tareas/:id</BlogInlineCode>) se usan librerías como{" "}
        <BlogInlineCode>gorilla/mux</BlogInlineCode> o{" "}
        <BlogInlineCode>chi</BlogInlineCode>, compatibles con la misma interfaz
        de handlers.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Ejercicios</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Escribe un programa que defina una función saludar(nombre string) string y la llame desde main para imprimir el saludo."
          hint="Declara la función con func y usa fmt.Println para imprimir el retorno."
          level="Básico"
          num={1}
          solution={`package main

import "fmt"

func saludar(nombre string) string {
    return "Hola, " + nombre + "!"
}

func main() {
    fmt.Println(saludar("Ana"))
}`}
          title="Hola mundo con función"
        />

        <ExerciseCard
          description="Escribe FizzBuzz: del 1 al 100, imprime Fizz si el número es múltiplo de 3, Buzz si es múltiplo de 5 y FizzBuzz si lo es de ambos."
          hint="Usa un for con i := 1; i <= 100 y un switch sin expresión, o if anidados."
          level="Intermedio"
          num={2}
          solution={`package main

import "fmt"

func main() {
    for i := 1; i <= 100; i++ {
        switch {
        case i%15 == 0:
            fmt.Println("FizzBuzz")
        case i%3 == 0:
            fmt.Println("Fizz")
        case i%5 == 0:
            fmt.Println("Buzz")
        default:
            fmt.Println(i)
        }
    }
}`}
          title="FizzBuzz"
        />

        <ExerciseCard
          description="Define un struct Usuario con Nombre y Edad, añade un método EsMayorDeEdad() bool y pruébalo creando un usuario."
          hint="Define el método con receptor por valor: func (u Usuario) EsMayorDeEdad() bool."
          level="Básico"
          num={3}
          solution={`package main

import "fmt"

type Usuario struct {
    Nombre string
    Edad   int
}

func (u Usuario) EsMayorDeEdad() bool {
    return u.Edad >= 18
}

func main() {
    ana := Usuario{Nombre: "Ana", Edad: 22}
    fmt.Println(ana.Nombre, "¿mayor de edad?", ana.EsMayorDeEdad())
}`}
          title="Struct usuario con método"
        />

        <ExerciseCard
          description="Lanza una goroutine por cada número de un slice, cada una calcula su cuadrado y envía el resultado por un channel. Imprime todos los resultados."
          hint="Crea el channel con make(chan int, len(numeros)) y recoge tantos valores como números haya."
          level="Intermedio"
          num={4}
          solution={`package main

import "fmt"

func cuadrado(n int, resultados chan<- int) {
    resultados <- n * n
}

func main() {
    numeros := []int{1, 2, 3, 4, 5}
    resultados := make(chan int, len(numeros))

    for _, n := range numeros {
        go cuadrado(n, resultados)
    }

    for range numeros {
        fmt.Println(<-resultados)
    }
}`}
          title="Goroutines con channel"
        />

        <ExerciseCard
          description="Crea un servidor HTTP con la ruta /hola que lea el parámetro ?nombre= de la URL y responda Hola, {nombre}!. Sin parámetro, responde Hola, mundo!."
          hint={'Lee el parámetro con r.URL.Query().Get("nombre") y escribe con fmt.Fprintf.'}
          level="Avanzado"
          num={5}
          solution={`package main

import (
    "fmt"
    "log"
    "net/http"
)

func holaHandler(w http.ResponseWriter, r *http.Request) {
    nombre := r.URL.Query().Get("nombre")
    if nombre == "" {
        nombre = "mundo"
    }
    fmt.Fprintf(w, "Hola, %s!", nombre)
}

func main() {
    http.HandleFunc("/hola", holaHandler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}`}
          title="Servidor HTTP con ruta /hola"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        Con esto ya tienes los cimientos de Go: sintaxis limpia, errores como
        valores, structs e interfaces, concurrencia con goroutines y un
        servidor HTTP funcional. El siguiente paso es explorar la stdlib (JSON,
        testing, bases de datos) y librerías como{" "}
        <BlogInlineCode>chi</BlogInlineCode> o <BlogInlineCode>gin</BlogInlineCode>{" "}
        para APIs más complejas. Go brilla en servicios que deben ser rápidos,
        simples de operar y fáciles de mantener a largo plazo.
      </BlogP>
    </article>
  );
}
