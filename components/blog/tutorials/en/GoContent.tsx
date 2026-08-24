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

export default function GoContentEn() {
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
        Go: from zero to a web server
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Go is the language created by Google to build fast systems that are easy
        to maintain. In this tutorial you will go from absolute zero to writing
        your first web server with a REST API, covering variables, functions,
        structs, and goroutines along the way. You only need previous
        programming concepts.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="what-is">What is Go</BlogH2>

      <BlogP>
        Go (also called Golang) was born in 2009 inside Google, created by
        Robert Griesemer, Rob Pike, and Ken Thompson. The goal was to solve a
        very concrete problem: programs written in C++ took too long to compile
        and were hard to read. Go was designed so that writing server software
        is <strong>simple, fast, and safe</strong>.
      </BlogP>

      <BlogP>
        It is a <strong>compiled</strong> language: the{" "}
        <BlogInlineCode>go build</BlogInlineCode> compiler produces a native
        binary that runs directly, without a virtual machine or heavy runtime.
        That makes it ideal for microservices, CLI tools, and network systems,
        because the final result is a single file that runs on any machine with
        the same architecture.
      </BlogP>

      <BlogCallout type="info">
        In Go the classic <BlogInlineCode>while</BlogInlineCode> and{" "}
        <BlogInlineCode>do-while</BlogInlineCode> loops do not exist: there is
        only <BlogInlineCode>for</BlogInlineCode>. The language prioritizes
        having few reserved words and one way to do each thing, which keeps code
        very consistent across projects.
      </BlogCallout>

      <BlogP>
        Another defining feature is <strong>goroutines</strong>: extremely
        lightweight concurrent functions launched with the keyword{" "}
        <BlogInlineCode>go</BlogInlineCode>. Instead of waiting for the OS to
        create heavy threads, the Go runtime spreads millions of goroutines
        across a small number of real threads. This is why servers like Docker
        or Kubernetes, written in Go, handle enormous amounts of traffic with
        few resources.
      </BlogP>

      <BlogH2 id="install">Installing and your first program</BlogH2>

      <BlogP>
        On macOS the installation is straightforward with Homebrew. On Linux you
        can use your distribution's package manager (for example{" "}
        <BlogInlineCode>apt install golang</BlogInlineCode>) or download the
        binary from go.dev. On Windows there is an official MSI installer.
      </BlogP>

      <BlogCode>{`# Install Go on macOS
brew install go

# Verify the installed version
go version

# Show the working environment
go env GOPATH`}</BlogCode>

      <BlogP>
        To check that everything works, create a folder for the project and a{" "}
        <BlogInlineCode>hello.go</BlogInlineCode> file with the minimal program:
      </BlogP>

      <BlogCode>{`package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}`}</BlogCode>

      <BlogP>
        Every executable file starts with{" "}
        <BlogInlineCode>package main</BlogInlineCode> and a{" "}
        <BlogInlineCode>main</BlogInlineCode> function. Run the program with:
      </BlogP>

      <BlogCode>{`go run hello.go
# Output: Hello, Go!`}</BlogCode>

      <BlogP>
        <BlogInlineCode>go run</BlogInlineCode> compiles and runs in a single
        step, perfect during development. When you want to distribute the
        program, use <BlogInlineCode>go build</BlogInlineCode> and you will get
        a binary ready to copy to any server:
      </BlogP>

      <BlogCode>{`go build hello.go
./hello`}</BlogCode>

      <BlogCallout type="tip">
        The Go binary has no system dependencies: it is statically linked. You
        copy one file and it works. This is one of the great advantages for
        deploying in Docker containers, because the final image can be tiny.
      </BlogCallout>

      <BlogH2 id="modules">Modules and go.mod</BlogH2>

      <BlogP>
        Since version 1.11, Go manages dependencies with{" "}
        <strong>modules</strong>. A module is a set of packages with a{" "}
        <BlogInlineCode>go.mod</BlogInlineCode> file that declares the project
        name and its dependencies, similar to what{" "}
        <BlogInlineCode>package.json</BlogInlineCode> is for Node.
      </BlogP>

      <BlogCode>{`# Initialize a module in the current folder
go mod init example/hello

# Output: go: creating new go.mod: module example/hello`}</BlogCode>

      <BlogP>
        The convention is that the module name is the repository path where the
        code will live (for example{" "}
        <BlogInlineCode>github.com/your-user/my-api</BlogInlineCode>). The
        repository does not have to exist, but this way packages can import each
        other using that path.
      </BlogP>

      <BlogCode>{`// go.mod generated automatically
module example/hello

go 1.23`}</BlogCode>

      <BlogP>
        To add a dependency, use <BlogInlineCode>go get</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`# Download and install a third-party package
go get github.com/gorilla/mux

# Run after changing dependencies
go mod tidy`}</BlogCode>

      <BlogP>
        <BlogInlineCode>go mod tidy</BlogInlineCode> is the command to run
        before every commit: it removes dependencies that are no longer imported
        and downloads the ones that are missing. The{" "}
        <BlogInlineCode>go.mod</BlogInlineCode> file records the exact versions,
        while <BlogInlineCode>go.sum</BlogInlineCode> stores integrity hashes so
        the build is reproducible.
      </BlogP>

      <BlogCallout type="warn">
        Do not install packages with <BlogInlineCode>go get</BlogInlineCode>{" "}
        inside the classic GOPATH as was done before: with modules,{" "}
        <BlogInlineCode>go get</BlogInlineCode> adds the dependency to the
        current module and updates go.mod automatically.
      </BlogCallout>

      <BlogH2 id="variables">Variables and types</BlogH2>

      <BlogP>
        Go is strongly typed but with type inference. You declare variables with{" "}
        <BlogInlineCode>var</BlogInlineCode> or with the short operator{" "}
        <BlogInlineCode>:=</BlogInlineCode>, which declares and infers the type
        in a single line:
      </BlogP>

      <BlogCode>{`package main

import "fmt"

const Pi = 3.1416 // constant: cannot be reassigned

func main() {
    var age int = 30   // explicit declaration
    var name string    // declaration with zero value: ""
    name = "Ana"

    height := 1.75     // short declaration: infers float64

    fmt.Println(name, age, height, Pi)
}`}</BlogCode>

      <BlogP>
        The rule is simple: inside functions use{" "}
        <BlogInlineCode>:=</BlogInlineCode> to declare new variables; use{" "}
        <BlogInlineCode>var</BlogInlineCode> for package-level variables or when
        you need to declare without initializing.
      </BlogP>

      <BlogH3 id="basic-types">Basic types</BlogH3>

      <BlogCode>{`var (
    active  bool            = true    // boolean
    age     int             = 30      // integer (platform dependent)
    balance float64         = 99.50   // floating point
    initial byte            = 'A'     // alias for uint8
    emoji   rune            = '🚀'     // Unicode character
    tags    []string                 // slice (dynamic list)
    data    map[string]int           // map (dictionary)
)`}</BlogCode>

      <BlogP>
        Go has no inheritance or classes: it has <strong>structs</strong> with
        methods and <strong>implicit interfaces</strong>. It also has no{" "}
        <BlogInlineCode>null</BlogInlineCode>: it uses zero values by default (0
        for numbers, empty for strings and slices, false for booleans) and{" "}
        <BlogInlineCode>nil</BlogInlineCode> for pointers, interfaces, and
        functions.
      </BlogP>

      <BlogH2 id="control-flow">Control flow</BlogH2>

      <BlogP>
        Go's <BlogInlineCode>if</BlogInlineCode> does not need parentheses
        around the condition, but braces are mandatory. It also allows declaring
        a variable in the condition itself, which only lives inside the block:
      </BlogP>

      <BlogCode>{`if grade := 7; grade >= 5 {
    fmt.Println("Passed")
} else if grade >= 3 {
    fmt.Println("Failed")
} else {
    fmt.Println("Very low")
}`}</BlogCode>

      <BlogP>
        There is only <BlogInlineCode>for</BlogInlineCode>, in three variants:
      </BlogP>

      <BlogCode>{`// 1. Classic with end condition
for i := 1; i <= 5; i++ {
    fmt.Println(i)
}

// 2. As while
n := 10
for n > 0 {
    n--
}

// 3. Infinite loop (exit with break)
for {
    break
}`}</BlogCode>

      <BlogP>
        The <BlogInlineCode>for range</BlogInlineCode> loop iterates over
        slices, maps, and strings, returning the index and the value:
      </BlogP>

      <BlogCode>{`fruits := []string{"apple", "pear", "grape"}
for i, fruit := range fruits {
    fmt.Println(i, fruit)
}

// If you do not care about the index, use the underscore:
for _, fruit := range fruits {
    fmt.Println(fruit)
}`}</BlogCode>

      <BlogP>
        Go's <BlogInlineCode>switch</BlogInlineCode> needs no{" "}
        <BlogInlineCode>break</BlogInlineCode>: each case ends on its own and
        there is no implicit fall-through. It also works without an expression,
        evaluating each case as a condition:
      </BlogP>

      <BlogCode>{`func dayInWords(day int) string {
    switch day {
    case 1:
        return "Monday"
    case 2, 3, 4, 5:
        return "Weekday"
    case 6, 7:
        return "Weekend"
    default:
        return "Unknown"
    }
}`}</BlogCode>

      <BlogH2 id="functions">Functions and errors</BlogH2>

      <BlogP>
        In Go you declare functions with <BlogInlineCode>func</BlogInlineCode>.
        What stands out is that they can return <strong>multiple values</strong>{" "}
        at once, and the established convention is to return the result together
        with an <BlogInlineCode>error</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`package main

import (
    "errors"
    "fmt"
)

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("cannot divide by zero")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 2)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("Result:", result)
}`}</BlogCode>

      <BlogCallout type="info">
        Errors in Go are <strong>values</strong>, not exceptions. There is no{" "}
        <BlogInlineCode>try/catch</BlogInlineCode>: every function that can fail
        returns an error and the caller decides what to do. It seems verbose at
        first, but it guarantees that no error is silently ignored.
      </BlogCallout>

      <BlogP>
        You can name the return values and assign them directly in the body,
        which makes functions returning several statistics easier to read:
      </BlogP>

      <BlogCode>{`func stats(numbers []int) (sum, min, max int) {
    sum = 0
    min = numbers[0]
    max = numbers[0]
    for _, n := range numbers {
        sum += n
        if n < min {
            min = n
        }
        if n > max {
            max = n
        }
    }
    return // naked return: returns sum, min, max
}`}</BlogCode>

      <BlogP>
        The <strong>naked return</strong> (return without values) automatically
        returns the named variables. Use it sparingly: in long functions it
        hurts readability.
      </BlogP>

      <BlogH2 id="structs-interfaces">Structs and interfaces</BlogH2>

      <BlogP>
        A <BlogInlineCode>struct</BlogInlineCode> groups related fields, the
        equivalent of a class without methods in other languages. Methods are
        defined outside the struct, with a <em>receiver</em> that indicates
        which type they act on:
      </BlogP>

      <BlogCode>{`type User struct {
    Name  string
    Age   int
    Email string
}

// Method with value receiver: does not modify the struct
func (u User) Greet() string {
    return "Hi, I am " + u.Name
}

// Method with pointer receiver: allows modification
func (u *User) BirthDay() {
    u.Age++
}

func main() {
    ana := User{Name: "Ana", Age: 21, Email: "ana@email.com"}
    fmt.Println(ana.Greet())
    ana.BirthDay()
    fmt.Println(ana.Age) // 22
}`}</BlogCode>

      <BlogP>
        <strong>Interfaces</strong> describe behavior with a set of methods. The
        special thing about Go is that they are <strong>implicit</strong>: a
        type implements an interface automatically if it has all its methods,
        without declaring it. This decouples code: whoever consumes the
        interface knows nothing about the concrete type.
      </BlogP>

      <BlogCode>{`type Describable interface {
    Description() string
}

type Book struct {
    Title  string
    Pages  int
}

func (b Book) Description() string {
    return b.Title + " (" + fmt.Sprint(b.Pages) + " pages)"
}

func printAll(items []Describable) {
    for _, item := range items {
        fmt.Println(item.Description())
    }
}

func main() {
    books := []Describable{
        Book{Title: "The Go Programming Language", Pages: 400},
    }
    printAll(books)
}`}</BlogCode>

      <BlogH2 id="goroutines-channels">Goroutines and channels</BlogH2>

      <BlogP>
        A <strong>goroutine</strong> is a function that runs in parallel with
        the rest of the program. It is launched by prefixing{" "}
        <BlogInlineCode>go</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`func main() {
    // Launch the function in the background
    go fmt.Println("Running in a goroutine")

    // The main program continues immediately
    fmt.Println("Running in main")

    // Pause so the goroutine has time to run
    time.Sleep(100 * time.Millisecond)
}`}</BlogCode>

      <BlogP>
        Sleeping the main goroutine is an ugly hack: the correct approach is to
        communicate through a <strong>channel</strong> (
        <BlogInlineCode>chan</BlogInlineCode>), a pipe through which goroutines
        send values. The <BlogInlineCode>&lt;-</BlogInlineCode> operator sends
        or receives:
      </BlogP>

      <BlogCode>{`func main() {
    messages := make(chan string) // unbuffered channel

    go func() {
        messages <- "hello from goroutine" // send (blocks until someone receives)
    }()

    msg := <-messages // receive (blocks until someone sends)
    fmt.Println(msg)
}`}</BlogCode>

      <BlogP>
        Unbuffered channels synchronize: the send and the receive happen at the
        same time. To avoid blocking when there are many tasks, use{" "}
        <strong>buffered channels</strong> with capacity, as in a classic
        worker-pool pattern:
      </BlogP>

      <BlogCode>{`func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        fmt.Printf("Worker %d processing %d\n", id, j)
        results <- j * 2
    }
}

func main() {
    jobs := make(chan int, 5)
    results := make(chan int, 5)

    // Launch three workers
    for i := 1; i <= 3; i++ {
        go worker(i, jobs, results)
    }

    // Send five jobs
    for i := 1; i <= 5; i++ {
        jobs <- i
    }
    close(jobs) // close: no more jobs coming

    // Collect the results
    for i := 1; i <= 5; i++ {
        fmt.Println("Result:", <-results)
    }
}`}</BlogCode>

      <BlogCallout type="warn">
        Sending to a closed channel causes a panic. The golden rule is:{" "}
        <strong>only the sender closes the channel</strong>, never the receiver,
        and never close unless necessary. <BlogInlineCode>range</BlogInlineCode>{" "}
        over a channel iterates until the channel is closed.
      </BlogCallout>

      <BlogH2 id="packages">Packages</BlogH2>

      <BlogP>
        All Go code lives in a <strong>package</strong>: a directory with files
        sharing the same package declaration. An executable program is the{" "}
        <BlogInlineCode>main</BlogInlineCode> package. The rest of the packages
        are libraries imported by their path:
      </BlogP>

      <BlogCode>{`package main

import (
    "fmt"     // standard package
    "strings" // standard package
    "time"    // standard package
)

func main() {
    name := strings.ToUpper("ana")
    fmt.Println("Hello,", name, "at", time.Now().Hour(), "h")
}`}</BlogCode>

      <BlogP>
        To import your own package, its path must derive from the module name
        declared in go.mod. If the module is called{" "}
        <BlogInlineCode>example/hello</BlogInlineCode> and you have a{" "}
        <BlogInlineCode>greetings/</BlogInlineCode> directory, you import it as{" "}
        <BlogInlineCode>example/hello/greetings</BlogInlineCode>.
      </BlogP>

      <BlogP>
        Visibility control is by <strong>capital first letter</strong>: exported
        names start with a capital letter and are visible outside the package;
        names starting with a lowercase letter are private. The words{" "}
        <BlogInlineCode>public</BlogInlineCode> and{" "}
        <BlogInlineCode>private</BlogInlineCode> do not exist.
      </BlogP>

      <BlogCode>{`package greetings

// Greeting is exported: starts with a capital letter
func Greeting(name string) string {
    return "Hello, " + name + "!"
}

// internal is not accessible from other packages
func internal() string {
    return "only visible inside greetings"
}`}</BlogCode>

      <BlogCallout type="info">
        The Go standard library is huge and covers most needs: HTTP, JSON,
        cryptography, compression, testing, concurrency, and much more. Before
        installing an external package, check whether it already exists in the
        stdlib at <BlogInlineCode>pkg.go.dev</BlogInlineCode>.
      </BlogCallout>

      <BlogH2 id="http">HTTP with net/http</BlogH2>

      <BlogP>
        The <BlogInlineCode>net/http</BlogInlineCode> package is one of the most
        powerful in the stdlib. With two lines you have a server answering
        requests:
      </BlogP>

      <BlogCode>{`package main

import (
    "fmt"
    "log"
    "net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Hello from Go!")
}

func main() {
    http.HandleFunc("/hello", helloHandler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}`}</BlogCode>

      <BlogP>
        Each handler receives an{" "}
        <BlogInlineCode>http.ResponseWriter</BlogInlineCode> (where you write
        the response) and an <BlogInlineCode>http.Request</BlogInlineCode> (with
        all the request information). Try it with:
      </BlogP>

      <BlogCode>{`# Start the server
go run main.go

# Test from another terminal
curl http://localhost:8080/hello
# Output: Hello from Go!`}</BlogCode>

      <BlogP>
        Now let us build a complete REST API with{" "}
        <BlogInlineCode>GET</BlogInlineCode> and{" "}
        <BlogInlineCode>POST</BlogInlineCode>, handling JSON and protecting the
        task list with a mutex for concurrency:
      </BlogP>

      <BlogCode>{`package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "sync"
)

type Task struct {
    ID   int    \`json:"id"\`
    Text string \`json:"text"\`
    Done bool   \`json:"done"\`
}

var (
    tasks  = []Task{{ID: 1, Text: "Learn Go", Done: false}}
    nextID = 2
    mutex  sync.Mutex
)

func main() {
    http.HandleFunc("/", home)
    http.HandleFunc("/tasks", tasksHandler)

    fmt.Println("Server listening on http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

func home(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Welcome to the task API in Go")
}

func tasksHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    switch r.Method {
    case http.MethodGet:
        json.NewEncoder(w).Encode(tasks)

    case http.MethodPost:
        var newTask Task
        if err := json.NewDecoder(r.Body).Decode(&newTask); err != nil {
            http.Error(w, "Invalid JSON", http.StatusBadRequest)
            return
        }
        mutex.Lock()
        newTask.ID = nextID
        nextID++
        tasks = append(tasks, newTask)
        mutex.Unlock()

        w.WriteHeader(http.StatusCreated)
        json.NewEncoder(w).Encode(newTask)

    default:
      http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
    }
  }
}`}</BlogCode>

      <BlogP>
        Notice the <strong>struct tags</strong> (the backticks with{" "}
        <BlogInlineCode>json:"id"</BlogInlineCode>): they tell the{" "}
        <BlogInlineCode>encoding/json</BlogInlineCode> package how to convert
        each field to JSON. Without them, the fields would be serialized with
        their capitalized name.
      </BlogP>

      <BlogP>Let us test the complete API:</BlogP>

      <BlogCode>{`# List tasks (GET)
curl http://localhost:8080/tasks

# Create a task (POST)
curl -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -d '{"text": "Write an API in Go", "done": false}'`}</BlogCode>

      <BlogCallout type="tip">
        The <BlogInlineCode>net/http</BlogInlineCode> package includes basic
        routing, but for routes with dynamic parameters (like{" "}
        <BlogInlineCode>/tasks/:id</BlogInlineCode>) libraries such as{" "}
        <BlogInlineCode>gorilla/mux</BlogInlineCode> or the{" "}
        <BlogInlineCode>chi</BlogInlineCode> router are used, both compatible
        with the same handler interface.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="exercises">Exercises</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Write a program that defines a greet(name string) string function and calls it from main to print the greeting."
          hint="Declare the function with func and use fmt.Println to print the return value."
          level="Easy"
          num={1}
          solution={`package main

import "fmt"

func greet(name string) string {
    return "Hello, " + name + "!"
}

func main() {
    fmt.Println(greet("Ana"))
}`}
          title="Hello world with a function"
        />

        <ExerciseCard
          description="Write FizzBuzz: from 1 to 100, print Fizz if the number is a multiple of 3, Buzz if it is a multiple of 5, and FizzBuzz if it is a multiple of both."
          hint="Use a for with i := 1; i <= 100 and a switch without an expression, or nested ifs."
          level="Intermediate"
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
          description="Define a User struct with Name and Age, add an IsAdult() bool method, and test it by creating a user."
          hint="Define the method with a value receiver: func (u User) IsAdult() bool."
          level="Easy"
          num={3}
          solution={`package main

import "fmt"

type User struct {
    Name string
    Age  int
}

func (u User) IsAdult() bool {
    return u.Age >= 18
}

func main() {
    ana := User{Name: "Ana", Age: 22}
    fmt.Println(ana.Name, "adult?", ana.IsAdult())
}`}
          title="User struct with a method"
        />

        <ExerciseCard
          description="Launch one goroutine per number in a slice, each one computes its square and sends the result through a channel. Print all results."
          hint="Create the channel with make(chan int, len(numbers)) and collect as many values as there are numbers."
          level="Intermediate"
          num={4}
          solution={`package main

import "fmt"

func square(n int, results chan<- int) {
    results <- n * n
}

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    results := make(chan int, len(numbers))

    for _, n := range numbers {
        go square(n, results)
    }

    for range numbers {
        fmt.Println(<-results)
    }
}`}
          title="Goroutines with a channel"
        />

        <ExerciseCard
          description="Create an HTTP server with the /hello route that reads the ?name= parameter from the URL and responds Hello, {name}!. Without the parameter, respond Hello, world!."
          hint={
            'Read the parameter with r.URL.Query().Get("name") and write with fmt.Fprintf.'
          }
          level="Hard"
          num={5}
          solution={`package main

import (
    "fmt"
    "log"
    "net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
    name := r.URL.Query().Get("name")
    if name == "" {
        name = "world"
    }
    fmt.Fprintf(w, "Hello, %s!", name)
}

func main() {
    http.HandleFunc("/hello", helloHandler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}`}
          title="HTTP server with /hello route"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        With this you have the foundations of Go: clean syntax, error handling
        as values, structs and interfaces, concurrency with goroutines, and a
        working HTTP server. The natural next step is exploring the stdlib
        (JSON, testing, databases) and libraries like{" "}
        <BlogInlineCode>chi</BlogInlineCode> or{" "}
        <BlogInlineCode>gin</BlogInlineCode> for more complex APIs, and{" "}
        <BlogInlineCode>sqlc</BlogInlineCode> or{" "}
        <BlogInlineCode>pgx</BlogInlineCode> for working with PostgreSQL. Go
        shines in services that must be fast, simple to operate, and easy to
        maintain in the long run.
      </BlogP>
    </article>
  );
}
