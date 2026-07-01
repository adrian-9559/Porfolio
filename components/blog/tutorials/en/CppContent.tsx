"use client";
import { useState } from "react";

type SectionId =
  | "intro"
  | "variables"
  | "poo"
  | "constructores"
  | "stl"
  | "memoria"
  | "archivos"
  | "ejercicios";

interface SectionDef {
  id: SectionId;
  label: string;
}
const SECTIONS: SectionDef[] = [
  { id: "intro", label: "1. Introduction" },
  { id: "variables", label: "2. Variables & types" },
  { id: "poo", label: "3. OOP" },
  { id: "constructores", label: "4. Constructors" },
  { id: "stl", label: "5. STL" },
  { id: "memoria", label: "6. Memory" },
  { id: "archivos", label: "7. Files" },
  { id: "ejercicios", label: "Exercises" },
];

import {
  BlogH2,
  BlogH3,
  BlogP,
  BlogCode,
  BlogCallout,
} from "@/components/blog/shared";

function ExerciseCard({
  num,
  title,
  level,
  description,
  hint,
}: {
  num: number;
  title: string;
  level: "Básico" | "Intermedio" | "Avanzado";
  description: string;
  hint?: string;
}) {
  const [open, setOpen] = useState(false);
  const levelColor = {
    "Básico":
      "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
    "Intermedio":
      "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
    "Avanzado": "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
  }[level];

  return (
    <div className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden">
      <button
        className="w-full px-4 py-3 flex items-center justify-between gap-3 hover:bg-black/3 dark:hover:bg-white/3 transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-cyan-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
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
        <div className="px-4 pb-4 border-t border-black/8 dark:border-white/8 pt-3 space-y-2">
          <p className="text-sm text-[#3a3a3c] dark:text-[#aeaeb2]">
            {description}
          </p>
          {hint && (
            <div className="bg-cyan-50 dark:bg-cyan-950/20 rounded-xl px-3 py-2 text-xs text-cyan-700 dark:text-cyan-400">
              <strong>Hint:</strong> {hint}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function CppContent() {
  const [active, setActive] = useState<SectionId>("intro");
  const idx = SECTIONS.findIndex((s) => s.id === active);

  return (
    <div className="flex gap-8 min-h-[600px]">
      <aside className="hidden lg:flex flex-col gap-0.5 w-52 shrink-0 sticky top-20 self-start">
        <p className="text-xs font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider px-3 mb-2">
          Contents
        </p>
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={`text-left px-3 py-2 rounded-xl text-sm transition-colors ${
              active === s.id
                ? "bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400 font-medium"
                : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
            }`}
            onClick={() => setActive(s.id)}
          >
            {s.label}
          </button>
        ))}
      </aside>

      <div className="flex-1 min-w-0">
        <div className="lg:hidden mb-6">
          <select
            className="w-full px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-white dark:bg-[#111116] text-sm"
            value={active}
            onChange={(e) => setActive(e.target.value as SectionId)}
          >
            {SECTIONS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <article>
          {active === "intro" && <SIntro />}
          {active === "variables" && <SVariables />}
          {active === "poo" && <SPOO />}
          {active === "constructores" && <SConstructores />}
          {active === "stl" && <SSTL />}
          {active === "memoria" && <SMemoria />}
          {active === "archivos" && <SArchivos />}
          {active === "ejercicios" && <SEjercicios />}
        </article>

        <div className="flex justify-between mt-10 pt-6 border-t border-black/8 dark:border-white/8">
          <button
            className="px-4 py-2 rounded-xl border border-black/12 dark:border-white/12 text-sm font-medium disabled:opacity-30 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            disabled={idx === 0}
            onClick={() => idx > 0 && setActive(SECTIONS[idx - 1]!.id)}
          >
            ← Previous
          </button>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366] self-center">
            {idx + 1} / {SECTIONS.length}
          </span>
          <button
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium disabled:opacity-30 transition-colors"
            disabled={idx === SECTIONS.length - 1}
            onClick={() =>
              idx < SECTIONS.length - 1 && setActive(SECTIONS[idx + 1]!.id)
            }
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── SECTIONS ───────────────────────────────────────────────────────────────────

function SIntro() {
  return (
    <>
      <BlogH2>What is C++?</BlogH2>
      <BlogP>
        C++ is a general-purpose language created by Bjarne Stroustrup in
        the early 1980s as an extension of C. It adds object-oriented
        programming (OOP), templates (generics), automatic resource management
        (RAII), and the STL. It is a superset of C: almost all valid C code
        compiles in C++.
      </BlogP>

      <BlogH3>Fundamental differences from C</BlogH3>
      <div className="overflow-x-auto my-4">
        <table className="text-sm w-full border-collapse">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10">
              <th className="text-left py-2 pr-4 text-[#1d1d1f] dark:text-white">
                C
              </th>
              <th className="text-left py-2 text-[#1d1d1f] dark:text-white">
                Modern C++ (C++11/17/20)
              </th>
            </tr>
          </thead>
          <tbody className="text-[#3a3a3c] dark:text-[#aeaeb2] text-xs">
            {[
              ["printf/scanf", "cout/cin, fmt::print"],
              ["malloc/free", "new/delete (avoid) or smart pointers"],
              ["struct without methods", "class with methods, controlled access"],
              ["No function overloading", "Overloading by full signature"],
              ["No exceptions", "try/catch/throw, noexcept"],
              ["No generics", "Templates (static compilation)"],
              ["No RAII", "Destructors + smart pointers"],
              ["No lambdas", "Lambdas with environment capture"],
            ].map(([c, cpp]) => (
              <tr
                key={c}
                className="border-b border-black/5 dark:border-white/5"
              >
                <td className="py-1.5 pr-4">
                  <code className="bg-black/5 dark:bg-white/5 px-1 rounded">
                    {c}
                  </code>
                </td>
                <td className="py-1.5">{cpp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BlogH3>Hello, world in C++</BlogH3>
      <BlogCode>{`#include <iostream>
#include <string>
using namespace std;

int main() {
    string name = "World";
    cout << "Hello, " << name << "!" << endl;

    // cin for input
    int age;
    cout << "How old are you? ";
    cin >> age;
    cout << "You are " << age << " years old." << "\n";

    return 0;   // optional in main since C++11
}`}</BlogCode>

      <BlogH3>Compile and run</BlogH3>
      <BlogCode>{`# Compile with G++
g++ -std=c++17 -Wall -Wextra -o program main.cpp

# With multiple files
g++ -std=c++17 -Wall main.cpp utils.cpp -o program

# Useful flags for development
g++ -std=c++17 -Wall -Wextra -fsanitize=address,undefined -g -o program main.cpp

# Production optimization
g++ -std=c++17 -O2 -DNDEBUG -o program main.cpp`}</BlogCode>

      <BlogH3>OOP paradigm</BlogH3>
      <BlogP>
        C++ supports multiple paradigms: procedural (like C), object-oriented,
        and generic (templates). OOP is based on four pillars:
      </BlogP>
      <div className="grid grid-cols-2 gap-3 my-4">
        {[
          [
            "Encapsulation",
            "Group data and behavior in classes, hiding internal details",
          ],
          [
            "Inheritance",
            "A class can extend another, reusing and specializing its behavior",
          ],
          [
            "Polymorphism",
            "The same code operates on different types via virtual functions",
          ],
          [
            "Abstraction",
            "Define interfaces without exposing implementation (abstract classes)",
          ],
        ].map(([title, desc]) => (
          <div
            key={title}
            className="border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/20 rounded-xl p-3"
          >
            <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-400 mb-1">
              {title}
            </p>
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">{desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function SVariables() {
  return (
    <>
      <BlogH2>Variables and modern types</BlogH2>
      <BlogH3>auto — type deduction</BlogH3>
      <BlogCode>{`// auto deduces the type from the initializer at COMPILE TIME (not Python)
auto integer  = 42;           // int
auto decimal = 3.14;         // double
auto text   = std::string("Hello");  // std::string
auto pointer = new int(5);   // int*

// Especially useful with iterators and complex types
std::vector<int> vec = {1, 2, 3};
auto it = vec.begin();       // std::vector<int>::iterator

// auto& for references
for (auto& elem : vec) elem *= 2;   // modifies in-place
for (const auto& elem : vec) { /* read-only */ }`}</BlogCode>

      <BlogH3>References</BlogH3>
      <BlogCode>{`int a = 10;
int& ref = a;      // reference — alias for a, can NEVER be null

ref = 20;          // a is now 20
std::cout << a;    // 20

// Differences from pointers:
// - Cannot be null                       → safer
// - Cannot be reassigned to another object → more predictable
// - No & needed to access the value      → clean syntax

// Constant reference — ideal for passing large objects
void print(const std::string& s) {
    std::cout << s;   // no copy, read-only
}

// Rvalue reference — C++11
void process(std::string&& s) {
    // s is a temporary — we can "steal" its resources
    std::string local = std::move(s);
}`}</BlogCode>

      <BlogH3>const and constexpr</BlogH3>
      <BlogCode>{`const int MAX = 100;              // cannot be modified at runtime
constexpr int SIZE = 10 * 10;  // evaluated at COMPILE TIME

constexpr int square(int n) { return n * n; }
constexpr int c = square(5);   // 25 — computed at compile time

// const in parameters and methods
void read(const std::vector<int>& v);  // cannot modify v
int  get() const;                   // method that doesn\'t modify the object`}</BlogCode>

      <BlogH3>STL types vs primitives</BlogH3>
      <BlogCode>{`#include <string>
#include <vector>
#include <optional>   // C++17

std::string s = "Hello";   // automatically managed string
s += " world";             // concatenation without buffer overflow risk
std::cout << s.size();     // 11
std::cout << s.substr(0,5); // "Hello"

// optional — value that may not exist (alternative to NULL)
std::optional<int> search(int arr[], int n, int val) {
    for (int i = 0; i < n; i++)
        if (arr[i] == val) return i;   // returns the index
    return std::nullopt;                // no result
}

auto result = search(data, 5, 42);
if (result.has_value()) {
    std::cout << "Found at: " << result.value();
}`}</BlogCode>
    </>
  );
}

function SPOO() {
  return (
    <>
      <BlogH2>Object-Oriented Programming</BlogH2>
      <BlogH3>Basic class — encapsulation</BlogH3>
      <BlogCode>{`#include <iostream>
#include <string>
using namespace std;

class BankAccount {
private:                          // only accessible within the class
    string  holder;
    double  balance;
    int     number;
    static int next_number;       // shared by ALL instances

public:                           // public interface
    // Constructor
    BankAccount(const string& t, double initial_balance = 0.0)
        : holder(t), balance(initial_balance), number(++next_number) {
        if (initial_balance < 0) throw invalid_argument("Balance cannot be negative");
    }

    // Business methods
    bool deposit(double amount) {
        if (amount <= 0) return false;
        balance += amount;
        return true;
    }

    bool withdraw(double amount) {
        if (amount <= 0 || amount > balance) return false;
        balance -= amount;
        return true;
    }

    // Getters (const — don\'t modify the object)
    string getHolder() const { return holder; }
    double getBalance()   const { return balance;   }
    int    getNumber()  const { return number;  }

    // Operator overloading <<
    friend ostream& operator<<(ostream& os, const BankAccount& c) {
        os << "Account #" << c.number << " [" << c.holder << "]: " << c.balance << "€";
        return os;
    }
};

int BankAccount::next_number = 0;   // static member initialization

int main() {
    BankAccount c1("Ana",  1000.0);
    BankAccount c2("Luis",  500.0);

    c1.deposit(250.0);
    c1.withdraw(100.0);

    cout << c1 << "\n";   // Account #1 [Ana]: 1150€
    cout << c2 << "\n";   // Account #2 [Luis]: 500€
}`}</BlogCode>

      <BlogH3>Inheritance</BlogH3>
      <BlogCode>{`class Animal {
protected:                 // accessible in subclasses, not outside
    string name;
    int    age;

public:
    Animal(const string& n, int e) : name(n), age(e) {}
    virtual ~Animal() = default;   // virtual destructor — REQUIRED if there is inheritance

    virtual void speak() const {
        cout << name << " makes a generic sound.\n";
    }

    string getName() const { return name; }
};

class Dog : public Animal {
private:
    string breed;

public:
    Dog(const string& n, int e, const string& r)
        : Animal(n, e), breed(r) {}   // calls the parent constructor

    void speak() const override {   // override verifies it actually overrides
        cout << name << " says: WOOF!\n";
    }

    void play() const {
        cout << name << " (" << breed << ") is playing.\n";
    }
};

class Cat : public Animal {
public:
    Cat(const string& n, int e) : Animal(n, e) {}
    void speak() const override {
        cout << name << " says: meow~\n";
    }
};

// Multiple inheritance
class Amphibian : public Animal {
    // can inherit from two classes; beware of the diamond problem
};`}</BlogCode>

      <BlogH3>Polymorphism</BlogH3>
      <BlogCode>{`// With pointers or references to the base class → virtual dispatch
void introduce(const Animal& a) {
    a.speak();   // calls the REAL type\'s method (Dog, Cat...)
}

int main() {
    Dog p("Rex", 3, "German Shepherd");
    Cat  g("Misi", 2);

    introduce(p);   // Rex says: WOOF!
    introduce(g);   // Misi says: meow~

    // Polymorphic array with pointers
    vector<unique_ptr<Animal>> zoo;
    zoo.push_back(make_unique<Dog>("Buddy", 4, "Labrador"));
    zoo.push_back(make_unique<Cat>("Luna", 1));
    zoo.push_back(make_unique<Dog>("Max", 2, "Husky"));

    for (const auto& animal : zoo) {
        animal->speak();   // polymorphism in action
    }
}`}</BlogCode>

      <BlogH3>Abstract classes and interfaces</BlogH3>
      <BlogCode>{`// Abstract class — cannot be instantiated directly
class Shape {
public:
    virtual double area()      const = 0;   // pure method → forces implementation
    virtual double perimeter() const = 0;
    virtual string name()    const = 0;
    virtual ~Shape() = default;

    void describe() const {
        cout << name() << ": area=" << area()
             << " perimeter=" << perimeter() << "\n";
    }
};

class Circle : public Shape {
    double radius;
    static constexpr double PI = 3.14159265358979;
public:
    explicit Circle(double r) : radius(r) {}
    double area()      const override { return PI * radius * radius; }
    double perimeter() const override { return 2 * PI * radius; }
    string name()    const override { return "Circle(r=" + to_string(radius) + ")"; }
};

class Rectangle : public Shape {
    double width, height;
public:
    Rectangle(double w, double h) : width(w), height(h) {}
    double area()      const override { return width * height; }
    double perimeter() const override { return 2 * (width + height); }
    string name()    const override { return "Rectangle(" + to_string(width) + "x" + to_string(height) + ")"; }
};

int main() {
    vector<unique_ptr<Shape>> shapes;
    shapes.push_back(make_unique<Circle>(5.0));
    shapes.push_back(make_unique<Rectangle>(4.0, 6.0));

    for (const auto& f : shapes) f->describe();
}`}</BlogCode>
    </>
  );
}

function SConstructores() {
  return (
    <>
      <BlogH2>Constructors, Destructors and Move Semantics</BlogH2>
      <BlogH3>Types of constructors</BlogH3>
      <BlogCode>{`class Buffer {
    int*   data;
    size_t size;

public:
    // Default constructor
    Buffer() : data(nullptr), size(0) {}

    // Parameterized constructor
    explicit Buffer(size_t n)
        : data(new int[n]()), size(n) {
        cout << "Constructor(" << n << ")\n";
    }

    // Copy constructor — deep copy
    Buffer(const Buffer& other)
        : data(new int[other.size]), size(other.size) {
        copy(other.data, other.data + other.size, data);
        cout << "Copy constructor\n";
    }

    // Move constructor — transfers ownership, O(1)
    Buffer(Buffer&& other) noexcept
        : data(other.data), size(other.size) {
        other.data  = nullptr;   // leave original in valid but empty state
        other.size = 0;
        cout << "Move constructor\n";
    }

    // Destructor
    ~Buffer() {
        delete[] data;
        cout << "Destructor\n";
    }

    // Copy assignment operator
    Buffer& operator=(const Buffer& other) {
        if (this == &other) return *this;   // self-assignment
        delete[] data;
        data  = new int[other.size];
        size = other.size;
        copy(other.data, other.data + other.size, data);
        return *this;
    }

    // Move assignment operator
    Buffer& operator=(Buffer&& other) noexcept {
        if (this == &other) return *this;
        delete[] data;
        data  = other.data;
        size = other.size;
        other.data  = nullptr;
        other.size = 0;
        return *this;
    }

    size_t getSize() const { return size; }
};`}</BlogCode>

      <BlogH3>Rule of Five</BlogH3>
      <BlogP>
        If you define any of these five methods, you should define all
        five: destructor, copy constructor, copy assignment operator, move
        constructor, move assignment operator.
      </BlogP>
      <BlogCallout type="info">
        In modern code, prefer the <strong>Rule of Zero</strong>: use{" "}
        <code>unique_ptr</code> / <code>shared_ptr</code> as members and the
        compiler generates all five methods correctly automatically.
      </BlogCallout>

      <BlogH3>Initializer list</BlogH3>
      <BlogCode>{`class Point3D {
    const double x, y, z;   // const — can only be initialized in list
public:
    // Initializer list: more efficient than assigning in the body
    Point3D(double x, double y, double z) : x(x), y(y), z(z) {}

    // Delegating constructor (C++11)
    Point3D() : Point3D(0.0, 0.0, 0.0) {}
};`}</BlogCode>

      <BlogH3>Move semantics</BlogH3>
      <BlogCode>{`#include <utility>
#include <vector>
#include <string>
using namespace std;

string create_string() {
    string s = "Very long string that is expensive to copy";
    return s;   // NRVO or automatic move
}

int main() {
    string a = "Hello";
    string b = move(a);         // b gets a\'s resources; a becomes empty
    cout << b;                   // "Hello"
    cout << a.empty();           // true

    vector<string> vec;
    vec.push_back("one");        // copy
    vec.push_back(string("two")); // move from temporary
    vec.emplace_back("three");    // constructs in-place (even better)

    // Measure performance difference
    vector<vector<int>> large;
    vector<int> source(1000000, 1);
    large.push_back(source);           // COPY — copies 1M integers
    large.push_back(move(source));     // MOVE — O(1), no copy
}`}</BlogCode>

      <BlogH3>Exceptions</BlogH3>
      <BlogCode>{`#include <stdexcept>
#include <iostream>

double divide(double a, double b) {
    if (b == 0.0) throw invalid_argument("Division by zero");
    return a / b;
}

int main() {
    try {
        cout << divide(10.0, 2.0) << "\n";  // 5.0
        cout << divide(10.0, 0.0) << "\n";  // throws
    }
    catch (const invalid_argument& e) {
        cerr << "Error: " << e.what() << "\n";
    }
    catch (const exception& e) {
        cerr << "Generic exception: " << e.what() << "\n";
    }
    catch (...) {
        cerr << "Unknown exception\n";
    }
    // Always continues here
    cout << "Program continues\n";
}`}</BlogCode>
    </>
  );
}

function SSTL() {
  return (
    <>
      <BlogH2>STL — Standard Template Library</BlogH2>
      <BlogP>
        The STL provides containers, iterators, and generic algorithms
        that are highly optimized. It is the most powerful tool in the C++
        ecosystem.
      </BlogP>

      <BlogH3>vector — dynamic array</BlogH3>
      <BlogCode>{`#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

vector<int> v = {5, 3, 1, 4, 2};

// Access and modification
v.push_back(6);               // add to end: {5,3,1,4,2,6}
v.pop_back();                 // remove last
v.insert(v.begin(), 0);       // insert at beginning
v.erase(v.begin() + 2);       // erase position 2
v.reserve(100);               // reserve capacity (avoids reallocations)

cout << v.size();             // number of elements
cout << v.capacity();         // current reserved capacity
cout << v[2];                 // access without bounds check
cout << v.at(2);              // access WITH bounds check (throws std::out_of_range)
cout << v.front();            // first element
cout << v.back();             // last element

// Algorithms
sort(v.begin(), v.end());     // sort ascending
sort(v.rbegin(), v.rend());   // descending
reverse(v.begin(), v.end());
int s = accumulate(v.begin(), v.end(), 0);        // total sum
int mx = *max_element(v.begin(), v.end());
auto pos = find(v.begin(), v.end(), 3);           // iterator to 3

// Transform
transform(v.begin(), v.end(), v.begin(),
    [](int x) { return x * x; });                 // square each

// Filter
vector<int> evens;
copy_if(v.begin(), v.end(), back_inserter(evens),
    [](int x) { return x % 2 == 0; });

// range-for
for (const auto& x : v) cout << x << " ";`}</BlogCode>

      <BlogH3>map and unordered_map</BlogH3>
      <BlogCode>{`#include <map>
#include <unordered_map>
using namespace std;

// map — red-black tree, SORTED keys, O(log n)
map<string, int> ages;
ages["Ana"]   = 25;
ages["Luis"]  = 30;
ages.insert({"Carmen", 28});
ages.emplace("Pedro", 22);       // constructs in-place

// Access
cout << ages["Ana"];             // 25
cout << ages.at("Luis");         // 30 (throws if not found)

// Check existence
if (ages.count("Pedro") > 0) { /* exists */ }
if (ages.contains("Ana")) { /* C++20 */ }
if (ages.find("Pepe") != ages.end()) { /* exists */ }

// Iterate (sorted alphabetically)
for (const auto& [name, age] : ages) {   // structured bindings (C++17)
    cout << name << ": " << age << "\n";
}

// unordered_map — hash table, O(1) average, unsorted
unordered_map<string, vector<int>> data;
data["grades"].push_back(8);
data["grades"].push_back(9);
cout << data["grades"].size();    // 2`}</BlogCode>

      <BlogH3>set and priority_queue</BlogH3>
      <BlogCode>{`#include <set>
#include <queue>
using namespace std;

// set — UNIQUE and SORTED elements, O(log n)
set<int> s = {5, 3, 1, 4, 1, 2};   // {1, 2, 3, 4, 5} — no duplicates
s.insert(6);
s.erase(3);
cout << s.count(4);   // 1 (exists) or 0 (doesn\'t exist)

// priority_queue — priority queue (max-heap by default)
priority_queue<int> maxpq;
maxpq.push(3); maxpq.push(1); maxpq.push(4);
cout << maxpq.top();   // 4 — the largest
maxpq.pop();
cout << maxpq.top();   // 3

// min-heap
priority_queue<int, vector<int>, greater<int>> minpq;
minpq.push(3); minpq.push(1); minpq.push(4);
cout << minpq.top();   // 1 — the smallest`}</BlogCode>

      <BlogH3>Lambdas</BlogH3>
      <BlogCode>{`// [capture](parameters) -> return_type { body }
auto sum = [](int a, int b) { return a + b; };
cout << sum(3, 4);   // 7

// Capture by value
int factor = 3;
auto multiply = [factor](int x) { return x * factor; };

// Capture by reference
int counter = 0;
auto count = [&counter]() { counter++; };

// Lambdas in algorithms
vector<int> nums = {1, 5, 2, 8, 3};
sort(nums.begin(), nums.end(), [](int a, int b) { return a > b; });  // descending

int limit = 4;
int how_many = count_if(nums.begin(), nums.end(), [limit](int x) { return x > limit; });

// Generic lambda (C++14)
auto print = [](const auto& container) {
    for (const auto& e : container) cout << e << " ";
    cout << "\n";
};`}</BlogCode>
    </>
  );
}

function SMemoria() {
  return (
    <>
      <BlogH2>Dynamic memory management</BlogH2>
      <BlogH3>new and delete — the old way</BlogH3>
      <BlogCode>{`// Individual object
Animal* a = new Animal("Rex", 3);
a->speak();
delete a;            // REQUIRED — calls the destructor

// Array
int* arr = new int[10]{0};    // 10 integers initialized to 0
arr[5] = 42;
delete[] arr;        // brackets! delete without [] is UB

// NEVER mix
int* p = new int(5);
delete[] p;          // \u2718 undefined behavior
int* q = new int[5];
delete q;            // \u2718 undefined behavior`}</BlogCode>

      <BlogH3>unique_ptr — exclusive ownership</BlogH3>
      <BlogCode>{`#include <memory>
using namespace std;

// Always use make_unique instead of new
auto p = make_unique<Animal>("Rex", 3);   // single copy
p->speak();
// Automatically freed when leaving scope — no delete needed

// Cannot be copied
auto p2 = p;           // \u2718 compilation error

// Can be moved (transfer ownership)
auto p3 = move(p);     // p becomes empty (nullptr)
p3->speak();          // OK

// unique_ptr for arrays
auto arr = make_unique<int[]>(10);
arr[0] = 42;           // auto-freed

// In functions
unique_ptr<Animal> create(const string& name) {
    return make_unique<Dog>(name, 2, "Labrador");
}   // moved automatically on return`}</BlogCode>

      <BlogH3>shared_ptr — shared ownership</BlogH3>
      <BlogCode>{`auto sp1 = make_shared<Animal>("Buddy", 4);
{
    auto sp2 = sp1;    // both point to the same Animal
    cout << sp1.use_count();   // 2
    sp2->speak();
}   // sp2 leaves scope, use_count = 1
// The object is destroyed when use_count reaches 0
cout << sp1.use_count();   // 1
sp1.reset();               // explicitly release; use_count = 0 → destroyed

// weak_ptr — non-owning reference (breaks cycles)
weak_ptr<Animal> wp = sp1;
if (auto locked = wp.lock()) {   // attempts to get shared_ptr
    locked->speak();             // OK if still exists
}`}</BlogCode>

      <BlogH3>RAII — Resource Acquisition Is Initialization</BlogH3>
      <BlogCode>{`#include <fstream>
#include <stdexcept>

class SafeFile {
    std::ofstream file;
public:
    SafeFile(const std::string& path) : file(path) {
        if (!file.is_open())
            throw std::runtime_error("Could not open: " + path);
    }
    ~SafeFile() {
        // Automatically closes — even if an exception occurs
    }
    void write(const std::string& line) {
        file << line << "\n";
    }

    // Disable copy
    SafeFile(const SafeFile&) = delete;
    SafeFile& operator=(const SafeFile&) = delete;
};

// File closes when leaving scope, no matter how
void save_data() {
    SafeFile f("data.txt");
    f.write("Line 1");
    f.write("Line 2");
    // even if an exception occurs here, the destructor is called
}`}</BlogCode>

      <BlogCallout type="tip">
        <strong>General rule</strong>: use <code>unique_ptr</code> by default,{" "}
        <code>shared_ptr</code> when you need shared ownership, and{" "}
        <code>weak_ptr</code> to observe without owning. Avoid{" "}
        <code>new/delete</code> directly in application code.
      </BlogCallout>
    </>
  );
}

function SArchivos() {
  return (
    <>
      <BlogH2>File reading and writing</BlogH2>
      <BlogH3>ofstream — writing</BlogH3>
      <BlogCode>{`#include <fstream>
#include <iostream>
#include <string>
using namespace std;

int main() {
    // Open for writing (clears previous content)
    ofstream out("data.txt");
    if (!out.is_open()) {
        cerr << "Error opening file\n";
        return 1;
    }

    out << "Line 1\n";
    out << "Line 2\n";
    out << 42 << " " << 3.14 << "\n";

    // out.close() is called automatically on destruction (RAII)

    // Append — add to end without clearing
    ofstream append("log.txt", ios::app);
    append << "New entry\n";

    // Binary
    ofstream bin("data.bin", ios::binary);
    int value = 12345;
    bin.write(reinterpret_cast<const char*>(&value), sizeof(value));

    return 0;
}`}</BlogCode>

      <BlogH3>ifstream — reading</BlogH3>
      <BlogCode>{`#include <fstream>
#include <sstream>
#include <vector>
using namespace std;

int main() {
    ifstream in("data.txt");
    if (!in) { cerr << "File not found\n"; return 1; }

    // Read line by line
    string line;
    while (getline(in, line)) {
        cout << line << "\n";
    }
    in.close();

    // Read tokens (space-separated)
    ifstream in2("numbers.txt");
    int n;
    vector<int> nums;
    while (in2 >> n) nums.push_back(n);

    // Read entire file at once
    ifstream in3("README.txt");
    ostringstream ss;
    ss << in3.rdbuf();
    string content = ss.str();

    // Simple CSV parsing
    ifstream csv("data.csv");
    string row;
    while (getline(csv, row)) {
        istringstream iss(row);
        string field;
        vector<string> columns;
        while (getline(iss, field, ',')) {
            columns.push_back(field);
        }
        // columns[0], columns[1]...
    }
    return 0;
}`}</BlogCode>

      <BlogH3>fstream — reading and writing</BlogH3>
      <BlogCode>{`#include <fstream>
using namespace std;

int main() {
    // Create and write
    fstream f("config.txt", ios::out | ios::trunc);
    f << "speed=100\n";
    f << "mode=auto\n";
    f.close();

    // Reopen to read
    f.open("config.txt", ios::in);
    string line;
    while (getline(f, line)) {
        auto sep = line.find('=');
        if (sep != string::npos) {
            string key = line.substr(0, sep);
            string value = line.substr(sep + 1);
            cout << key << " -> " << value << "\n";
        }
    }
    f.close();
    return 0;
}`}</BlogCode>

      <BlogCallout type="warn">
        Always check if the file was opened successfully before operating
        on it. An <code>ifstream</code> that could not open simply won\'t read
        anything, without throwing an exception (unless you enable exceptions with{" "}
        <code>f.exceptions(...)</code>).
      </BlogCallout>
    </>
  );
}

function SEjercicios() {
  const ejercicios = [
    {
      title: "Student management system",
      level: "Básico" as const,
      description:
        "Create a Student class with name, ID, and vector of grades. Implement methods to: add grade, calculate average, determine if passing (average \u2265 5), and show full record. Use a vector<Student> to manage multiple students.",
      hint: "Use const on methods that don\'t modify state. The display method can use cout by overloading operator<<.",
    },
    {
      title: "STL inventory manager",
      level: "Básico" as const,
      description:
        "Create an inventory system for a store. Each product has: name, code, price, and stock. Use a map<string,Product> (code → product). Implement: add product, update stock, search by name, list by price (low to high), and calculate total value.",
      hint: "To list by price, copy the map values to a vector and sort them with sort + lambda.",
    },
    {
      title: "Mini banking system",
      level: "Intermedio" as const,
      description:
        "Implement a bank with: Account (base), CheckingAccount and SavingsAccount (inherit). SavingsAccount has monthly interest; CheckingAccount allows overdraft up to a limit. Use polymorphism to calculate the projected balance over 12 months for each account.",
      hint: "Pure virtual method calculateBalance(int months) in the base class. Subclasses implement different formulas.",
    },
    {
      title: "Graph with adjacency list",
      level: "Avanzado" as const,
      description:
        "Implement an undirected graph using unordered_map<int, vector<int>>. Operations: addEdge, removeEdge, hasPath (BFS), shortestPath (BFS), and list connected components.",
      hint: "For BFS use a queue<int> and an unordered_set<int> for visited. For components, iterate over all nodes and run BFS from unvisited ones.",
    },
  ];

  return (
    <>
      <BlogH2>C++ Exercises</BlogH2>
      <BlogP>
        Complete projects to practice all the concepts in this tutorial.
        Each one combines several language features.
      </BlogP>
      <div className="space-y-2">
        {ejercicios.map((ej, i) => (
          <ExerciseCard key={i} num={i + 1} {...ej} />
        ))}
      </div>
      <div className="mt-8 p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800">
        <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-400 mb-2">
          Suggested final project
        </p>
        <p className="text-sm text-[#3a3a3c] dark:text-[#aeaeb2]">
          Combine everything into a <strong>library system</strong>: books,
          users, loans with dates, late fines, CSV file persistence,
          search by title/author/ISBN, and upcoming return notifications.
        </p>
      </div>
    </>
  );
}
