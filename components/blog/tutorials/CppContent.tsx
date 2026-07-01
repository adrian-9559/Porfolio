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
  { id: "intro", label: "1. Introducción" },
  { id: "variables", label: "2. Variables y tipos" },
  { id: "poo", label: "3. POO" },
  { id: "constructores", label: "4. Constructores" },
  { id: "stl", label: "5. STL" },
  { id: "memoria", label: "6. Memoria" },
  { id: "archivos", label: "7. Archivos" },
  { id: "ejercicios", label: "Ejercicios" },
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
              <strong>Pista:</strong> {hint}
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
          Contenido
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
            ← Anterior
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
            Siguiente →
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
      <BlogH2>¿Qué es C++?</BlogH2>
      <BlogP>
        C++ es un lenguaje de propósito general creado por Bjarne Stroustrup a
        principios de los años 80 como extensión de C. Añade programación
        orientada a objetos (POO), templates (genéricos), gestión automática de
        recursos (RAII) y la STL. Es un superconjunto de C: casi todo código C
        válido compila en C++.
      </BlogP>

      <BlogH3>Diferencias fundamentales con C</BlogH3>
      <div className="overflow-x-auto my-4">
        <table className="text-sm w-full border-collapse">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10">
              <th className="text-left py-2 pr-4 text-[#1d1d1f] dark:text-white">
                C
              </th>
              <th className="text-left py-2 text-[#1d1d1f] dark:text-white">
                C++ moderno (C++11/17/20)
              </th>
            </tr>
          </thead>
          <tbody className="text-[#3a3a3c] dark:text-[#aeaeb2] text-xs">
            {[
              ["printf/scanf", "cout/cin, fmt::print"],
              ["malloc/free", "new/delete (evitar) o smart pointers"],
              ["struct sin métodos", "class con métodos, acceso controlado"],
              ["Sin sobrecarga de funciones", "Sobrecarga por firma completa"],
              ["Sin excepciones", "try/catch/throw, noexcept"],
              ["Sin generics", "Templates (compilación estática)"],
              ["Sin RAII", "Destructores + smart pointers"],
              ["Sin lambdas", "Lambdas con captura de entorno"],
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

      <BlogH3>Hola, mundo en C++</BlogH3>
      <BlogCode>{`#include <iostream>
#include <string>
using namespace std;

int main() {
    string nombre = "Mundo";
    cout << "Hola, " << nombre << "!" << endl;

    // cin para entrada
    int edad;
    cout << "¿Cuántos años tienes? ";
    cin >> edad;
    cout << "Tienes " << edad << " años." << "\n";

    return 0;   // opcional en main desde C++11
}`}</BlogCode>

      <BlogH3>Compilar y ejecutar</BlogH3>
      <BlogCode>{`# Compilar con G++
g++ -std=c++17 -Wall -Wextra -o programa main.cpp

# Con varios archivos
g++ -std=c++17 -Wall main.cpp utils.cpp -o programa

# Flags útiles en desarrollo
g++ -std=c++17 -Wall -Wextra -fsanitize=address,undefined -g -o programa main.cpp

# Optimización para producción
g++ -std=c++17 -O2 -DNDEBUG -o programa main.cpp`}</BlogCode>

      <BlogH3>Paradigma OOP</BlogH3>
      <BlogP>
        C++ soporta múltiples paradigmas: procedural (como C), orientado a
        objetos y genérico (templates). La OOP se basa en cuatro pilares:
      </BlogP>
      <div className="grid grid-cols-2 gap-3 my-4">
        {[
          [
            "Encapsulación",
            "Agrupar datos y comportamiento en clases, ocultando los detalles internos",
          ],
          [
            "Herencia",
            "Una clase puede extender otra, reutilizando y especializando su comportamiento",
          ],
          [
            "Polimorfismo",
            "El mismo código opera sobre diferentes tipos gracias a funciones virtuales",
          ],
          [
            "Abstracción",
            "Definir interfaces sin exponer la implementación (clases abstractas)",
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
      <BlogH2>Variables y tipos modernos</BlogH2>
      <BlogH3>auto — deducción de tipo</BlogH3>
      <BlogCode>{`// auto deduce el tipo del inicializador en COMPILACIÓN (no es Python)
auto entero  = 42;           // int
auto decimal = 3.14;         // double
auto texto   = std::string("Hola");  // std::string
auto puntero = new int(5);   // int*

// Especialmente útil con iteradores y tipos complejos
std::vector<int> vec = {1, 2, 3};
auto it = vec.begin();       // std::vector<int>::iterator

// auto& para referencias
for (auto& elem : vec) elem *= 2;   // modifica in-place
for (const auto& elem : vec) { /* solo lectura */ }`}</BlogCode>

      <BlogH3>Referencias</BlogH3>
      <BlogCode>{`int a = 10;
int& ref = a;      // referencia — alias de a, NUNCA puede ser null

ref = 20;          // a ahora es 20
std::cout << a;    // 20

// Diferencias con punteros:
// - No puede ser null                     → más seguro
// - No puede reasignarse a otro objeto    → más predecible
// - No necesita & para acceder al valor   → sintaxis limpia

// Referencia constante — ideal para pasar objetos grandes
void imprimir(const std::string& s) {
    std::cout << s;   // sin copia, solo lectura
}

// Referencia de valor (rvalue reference) — C++11
void procesar(std::string&& s) {
    // s es un temporal — podemos "robar" sus recursos
    std::string local = std::move(s);
}`}</BlogCode>

      <BlogH3>const y constexpr</BlogH3>
      <BlogCode>{`const int MAX = 100;              // no puede modificarse en runtime
constexpr int TAMANO = 10 * 10;  // evaluado en COMPILACIÓN

constexpr int cuadrado(int n) { return n * n; }
constexpr int c = cuadrado(5);   // 25 — calculado en compilación

// const en parámetros y métodos
void leer(const std::vector<int>& v);  // no puede modificar v
int  obtener() const;                   // método que no modifica el objeto`}</BlogCode>

      <BlogH3>Tipos de la STL vs primitivos</BlogH3>
      <BlogCode>{`#include <string>
#include <vector>
#include <optional>   // C++17

std::string s = "Hola";   // string gestionado automáticamente
s += " mundo";             // concatenación sin riesgo de buffer overflow
std::cout << s.size();     // 10
std::cout << s.substr(0,4); // "Hola"

// optional — valor que puede no existir (alternativa a NULL)
std::optional<int> buscar(int arr[], int n, int val) {
    for (int i = 0; i < n; i++)
        if (arr[i] == val) return i;   // retorna el índice
    return std::nullopt;                // sin resultado
}

auto resultado = buscar(datos, 5, 42);
if (resultado.has_value()) {
    std::cout << "Encontrado en: " << resultado.value();
}`}</BlogCode>
    </>
  );
}

function SPOO() {
  return (
    <>
      <BlogH2>Programación Orientada a Objetos</BlogH2>
      <BlogH3>Clase básica — encapsulación</BlogH3>
      <BlogCode>{`#include <iostream>
#include <string>
using namespace std;

class CuentaBancaria {
private:                          // solo accesible dentro de la clase
    string  titular;
    double  saldo;
    int     numero;
    static int siguiente_num;     // compartida por TODAS las instancias

public:                           // interfaz pública
    // Constructor
    CuentaBancaria(const string& t, double saldo_inicial = 0.0)
        : titular(t), saldo(saldo_inicial), numero(++siguiente_num) {
        if (saldo_inicial < 0) throw invalid_argument("Saldo no puede ser negativo");
    }

    // Métodos de negocio
    bool depositar(double cantidad) {
        if (cantidad <= 0) return false;
        saldo += cantidad;
        return true;
    }

    bool retirar(double cantidad) {
        if (cantidad <= 0 || cantidad > saldo) return false;
        saldo -= cantidad;
        return true;
    }

    // Getters (const — no modifican el objeto)
    string getTitular() const { return titular; }
    double getSaldo()   const { return saldo;   }
    int    getNumero()  const { return numero;  }

    // Sobrecarga del operador <<
    friend ostream& operator<<(ostream& os, const CuentaBancaria& c) {
        os << "Cuenta #" << c.numero << " [" << c.titular << "]: " << c.saldo << "€";
        return os;
    }
};

int CuentaBancaria::siguiente_num = 0;   // inicialización del miembro estático

int main() {
    CuentaBancaria c1("Ana",  1000.0);
    CuentaBancaria c2("Luis",  500.0);

    c1.depositar(250.0);
    c1.retirar(100.0);

    cout << c1 << "\n";   // Cuenta #1 [Ana]: 1150€
    cout << c2 << "\n";   // Cuenta #2 [Luis]: 500€
}`}</BlogCode>

      <BlogH3>Herencia</BlogH3>
      <BlogCode>{`class Animal {
protected:                 // accessible en subclases, no fuera
    string nombre;
    int    edad;

public:
    Animal(const string& n, int e) : nombre(n), edad(e) {}
    virtual ~Animal() = default;   // destructor virtual — OBLIGATORIO si hay herencia

    virtual void hablar() const {
        cout << nombre << " hace un sonido genérico.\n";
    }

    string getNombre() const { return nombre; }
};

class Perro : public Animal {
private:
    string raza;

public:
    Perro(const string& n, int e, const string& r)
        : Animal(n, e), raza(r) {}   // llama al constructor del padre

    void hablar() const override {   // override verifica que realmente sobrescribe
        cout << nombre << " dice: ¡GUAU!\n";
    }

    void jugar() const {
        cout << nombre << " (" << raza << ") está jugando.\n";
    }
};

class Gato : public Animal {
public:
    Gato(const string& n, int e) : Animal(n, e) {}
    void hablar() const override {
        cout << nombre << " dice: miau~\n";
    }
};

// Herencia múltiple
class Anfibio : public Animal {
    // puede heredar de dos clases; cuidado con el diamond problem
};`}</BlogCode>

      <BlogH3>Polimorfismo</BlogH3>
      <BlogCode>{`// Con punteros o referencias a la clase base → despacho virtual
void presentar(const Animal& a) {
    a.hablar();   // llama al método del tipo REAL (Perro, Gato...)
}

int main() {
    Perro p("Rex", 3, "Pastor Alemán");
    Gato  g("Misi", 2);

    presentar(p);   // Rex dice: ¡GUAU!
    presentar(g);   // Misi dice: miau~

    // Array polimórfico con punteros
    vector<unique_ptr<Animal>> zoo;
    zoo.push_back(make_unique<Perro>("Buddy", 4, "Labrador"));
    zoo.push_back(make_unique<Gato>("Luna", 1));
    zoo.push_back(make_unique<Perro>("Max", 2, "Husky"));

    for (const auto& animal : zoo) {
        animal->hablar();   // polimorfismo en acción
    }
}`}</BlogCode>

      <BlogH3>Clases abstractas e interfaces</BlogH3>
      <BlogCode>{`// Clase abstracta — no se puede instanciar directamente
class Figura {
public:
    virtual double area()      const = 0;   // método puro → obliga a implementar
    virtual double perimetro() const = 0;
    virtual string nombre()    const = 0;
    virtual ~Figura() = default;

    void describir() const {
        cout << nombre() << ": área=" << area()
             << " perímetro=" << perimetro() << "\n";
    }
};

class Circulo : public Figura {
    double radio;
    static constexpr double PI = 3.14159265358979;
public:
    explicit Circulo(double r) : radio(r) {}
    double area()      const override { return PI * radio * radio; }
    double perimetro() const override { return 2 * PI * radio; }
    string nombre()    const override { return "Círculo(r=" + to_string(radio) + ")"; }
};

class Rectangulo : public Figura {
    double base, altura;
public:
    Rectangulo(double b, double h) : base(b), altura(h) {}
    double area()      const override { return base * altura; }
    double perimetro() const override { return 2 * (base + altura); }
    string nombre()    const override { return "Rectángulo(" + to_string(base) + "x" + to_string(altura) + ")"; }
};

int main() {
    vector<unique_ptr<Figura>> figuras;
    figuras.push_back(make_unique<Circulo>(5.0));
    figuras.push_back(make_unique<Rectangulo>(4.0, 6.0));

    for (const auto& f : figuras) f->describir();
}`}</BlogCode>
    </>
  );
}

function SConstructores() {
  return (
    <>
      <BlogH2>Constructores, destructores y Move Semantics</BlogH2>
      <BlogH3>Tipos de constructores</BlogH3>
      <BlogCode>{`class Buffer {
    int*   datos;
    size_t tamaño;

public:
    // Constructor por defecto
    Buffer() : datos(nullptr), tamaño(0) {}

    // Constructor con parámetros
    explicit Buffer(size_t n)
        : datos(new int[n]()), tamaño(n) {
        cout << "Constructor(" << n << ")\n";
    }

    // Constructor de copia — copia profunda
    Buffer(const Buffer& otro)
        : datos(new int[otro.tamaño]), tamaño(otro.tamaño) {
        copy(otro.datos, otro.datos + otro.tamaño, datos);
        cout << "Copy constructor\n";
    }

    // Constructor de movimiento — transfiere la propiedad, O(1)
    Buffer(Buffer&& otro) noexcept
        : datos(otro.datos), tamaño(otro.tamaño) {
        otro.datos  = nullptr;   // deja el original en estado válido pero vacío
        otro.tamaño = 0;
        cout << "Move constructor\n";
    }

    // Destructor
    ~Buffer() {
        delete[] datos;
        cout << "Destructor\n";
    }

    // Operador de asignación de copia
    Buffer& operator=(const Buffer& otro) {
        if (this == &otro) return *this;   // auto-asignación
        delete[] datos;
        datos  = new int[otro.tamaño];
        tamaño = otro.tamaño;
        copy(otro.datos, otro.datos + otro.tamaño, datos);
        return *this;
    }

    // Operador de asignación de movimiento
    Buffer& operator=(Buffer&& otro) noexcept {
        if (this == &otro) return *this;
        delete[] datos;
        datos  = otro.datos;
        tamaño = otro.tamaño;
        otro.datos  = nullptr;
        otro.tamaño = 0;
        return *this;
    }

    size_t size() const { return tamaño; }
};`}</BlogCode>

      <BlogH3>Regla de cinco (Rule of Five)</BlogH3>
      <BlogP>
        Si defines cualquiera de estos cinco métodos, deberías definir los
        cinco: destructor, constructor de copia, operador= de copia, constructor
        de movimiento, operador= de movimiento.
      </BlogP>
      <BlogCallout type="info">
        En código moderno, prefiere la <strong>Regla de Cero</strong>: usa{" "}
        <code>unique_ptr</code> / <code>shared_ptr</code> como miembros y el
        compilador genera los cinco métodos correctamente de forma automática.
      </BlogCallout>

      <BlogH3>Lista de inicialización</BlogH3>
      <BlogCode>{`class Punto3D {
    const double x, y, z;   // const — solo se puede inicializar en lista
public:
    // Lista de inicialización: más eficiente que asignar en el cuerpo
    Punto3D(double x, double y, double z) : x(x), y(y), z(z) {}

    // Constructor delegante (C++11)
    Punto3D() : Punto3D(0.0, 0.0, 0.0) {}
};`}</BlogCode>

      <BlogH3>Move semantics</BlogH3>
      <BlogCode>{`#include <utility>
#include <vector>
#include <string>
using namespace std;

string crear_string() {
    string s = "Cadena muy larga que cuesta copiar";
    return s;   // NRVO o move automático
}

int main() {
    string a = "Hola";
    string b = move(a);         // b obtiene los recursos de a; a queda vacío
    cout << b;                   // "Hola"
    cout << a.empty();           // true

    vector<string> vec;
    vec.push_back("uno");        // copy
    vec.push_back(string("dos")); // move desde temporal
    vec.emplace_back("tres");    // construye in-place (mejor aún)

    // Medir diferencia de rendimiento
    vector<vector<int>> grande;
    vector<int> fuente(1000000, 1);
    grande.push_back(fuente);           // COPIA — copia 1M enteros
    grande.push_back(move(fuente));     // MOVE — O(1), sin copia
}`}</BlogCode>

      <BlogH3>Excepciones</BlogH3>
      <BlogCode>{`#include <stdexcept>
#include <iostream>

double dividir(double a, double b) {
    if (b == 0.0) throw invalid_argument("División por cero");
    return a / b;
}

int main() {
    try {
        cout << dividir(10.0, 2.0) << "\n";  // 5.0
        cout << dividir(10.0, 0.0) << "\n";  // lanza
    }
    catch (const invalid_argument& e) {
        cerr << "Error: " << e.what() << "\n";
    }
    catch (const exception& e) {
        cerr << "Excepción genérica: " << e.what() << "\n";
    }
    catch (...) {
        cerr << "Excepción desconocida\n";
    }
    // Siempre se continúa aquí
    cout << "Programa continúa\n";
}`}</BlogCode>
    </>
  );
}

function SSTL() {
  return (
    <>
      <BlogH2>STL — Standard Template Library</BlogH2>
      <BlogP>
        La STL proporciona contenedores, iteradores y algoritmos genéricos
        altamente optimizados. Es la herramienta más poderosa del ecosistema
        C++.
      </BlogP>

      <BlogH3>vector — array dinámico</BlogH3>
      <BlogCode>{`#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

vector<int> v = {5, 3, 1, 4, 2};

// Acceso y modificación
v.push_back(6);               // añadir al final: {5,3,1,4,2,6}
v.pop_back();                 // eliminar el último
v.insert(v.begin(), 0);       // insertar al inicio
v.erase(v.begin() + 2);       // eliminar posición 2
v.reserve(100);               // reservar capacidad (evita reallocaciones)

cout << v.size();             // número de elementos
cout << v.capacity();         // capacidad actual reservada
cout << v[2];                 // acceso sin verificación de límites
cout << v.at(2);              // acceso CON verificación (lanza std::out_of_range)
cout << v.front();            // primer elemento
cout << v.back();             // último elemento

// Algoritmos
sort(v.begin(), v.end());     // ordenar ascendente
sort(v.rbegin(), v.rend());   // descendente
reverse(v.begin(), v.end());
int s = accumulate(v.begin(), v.end(), 0);        // suma total
int mx = *max_element(v.begin(), v.end());
auto pos = find(v.begin(), v.end(), 3);           // iterador al 3

// Transformar
transform(v.begin(), v.end(), v.begin(),
    [](int x) { return x * x; });                 // elevar al cuadrado

// Filtrar
vector<int> pares;
copy_if(v.begin(), v.end(), back_inserter(pares),
    [](int x) { return x % 2 == 0; });

// range-for
for (const auto& x : v) cout << x << " ";`}</BlogCode>

      <BlogH3>map y unordered_map</BlogH3>
      <BlogCode>{`#include <map>
#include <unordered_map>
using namespace std;

// map — árbol rojo-negro, claves ORDENADAS, O(log n)
map<string, int> edades;
edades["Ana"]   = 25;
edades["Luis"]  = 30;
edades.insert({"Carmen", 28});
edades.emplace("Pedro", 22);       // construye in-place

// Acceso
cout << edades["Ana"];             // 25
cout << edades.at("Luis");         // 30 (lanza si no existe)

// Verificar existencia
if (edades.count("Pedro") > 0) { /* existe */ }
if (edades.contains("Ana")) { /* C++20 */ }
if (edades.find("Pepe") != edades.end()) { /* existe */ }

// Iterar (ordenado alfabéticamente)
for (const auto& [nombre, edad] : edades) {   // structured bindings (C++17)
    cout << nombre << ": " << edad << "\n";
}

// unordered_map — tabla hash, O(1) promedio, sin orden
unordered_map<string, vector<int>> datos;
datos["notas"].push_back(8);
datos["notas"].push_back(9);
cout << datos["notas"].size();    // 2`}</BlogCode>

      <BlogH3>set y priority_queue</BlogH3>
      <BlogCode>{`#include <set>
#include <queue>
using namespace std;

// set — elementos ÚNICOS y ORDENADOS, O(log n)
set<int> s = {5, 3, 1, 4, 1, 2};   // {1, 2, 3, 4, 5} — sin duplicados
s.insert(6);
s.erase(3);
cout << s.count(4);   // 1 (existe) o 0 (no existe)

// priority_queue — cola de prioridad (max-heap por defecto)
priority_queue<int> maxpq;
maxpq.push(3); maxpq.push(1); maxpq.push(4);
cout << maxpq.top();   // 4 — el mayor
maxpq.pop();
cout << maxpq.top();   // 3

// min-heap
priority_queue<int, vector<int>, greater<int>> minpq;
minpq.push(3); minpq.push(1); minpq.push(4);
cout << minpq.top();   // 1 — el menor`}</BlogCode>

      <BlogH3>Lambdas</BlogH3>
      <BlogCode>{`// [captura](parámetros) -> tipo_retorno { cuerpo }
auto suma = [](int a, int b) { return a + b; };
cout << suma(3, 4);   // 7

// Captura por valor
int factor = 3;
auto multiplicar = [factor](int x) { return x * factor; };

// Captura por referencia
int contador = 0;
auto contar = [&contador]() { contador++; };

// Lambdas en algoritmos
vector<int> nums = {1, 5, 2, 8, 3};
sort(nums.begin(), nums.end(), [](int a, int b) { return a > b; });  // descendente

int limite = 4;
int cuantos = count_if(nums.begin(), nums.end(), [limite](int x) { return x > limite; });

// Lambda genérica (C++14)
auto imprimir = [](const auto& contenedor) {
    for (const auto& e : contenedor) cout << e << " ";
    cout << "\n";
};`}</BlogCode>
    </>
  );
}

function SMemoria() {
  return (
    <>
      <BlogH2>Gestión de memoria dinámica</BlogH2>
      <BlogH3>new y delete — el camino antiguo</BlogH3>
      <BlogCode>{`// Objeto individual
Animal* a = new Animal("Rex", 3);
a->hablar();
delete a;            // OBLIGATORIO — llama al destructor

// Array
int* arr = new int[10]{0};    // 10 enteros inicializados a 0
arr[5] = 42;
delete[] arr;        // ¡corchetes! delete sin [] es UB

// NUNCA mezclar
int* p = new int(5);
delete[] p;          // ❌ undefined behavior
int* q = new int[5];
delete q;            // ❌ undefined behavior`}</BlogCode>

      <BlogH3>unique_ptr — propiedad exclusiva</BlogH3>
      <BlogCode>{`#include <memory>
using namespace std;

// Siempre usar make_unique en vez de new
auto p = make_unique<Animal>("Rex", 3);   // única copia
p->hablar();
// Se libera AUTOMÁTICAMENTE al salir del scope — no hace falta delete

// No se puede copiar
auto p2 = p;           // ❌ error de compilación

// Sí se puede mover (transferir propiedad)
auto p3 = move(p);     // p queda vacío (nullptr)
p3->hablar();          // OK

// unique_ptr para arrays
auto arr = make_unique<int[]>(10);
arr[0] = 42;           // se libera automáticamente

// En funciones
unique_ptr<Animal> crear(const string& nombre) {
    return make_unique<Perro>(nombre, 2, "Labrador");
}   // se mueve automáticamente al devolver`}</BlogCode>

      <BlogH3>shared_ptr — propiedad compartida</BlogH3>
      <BlogCode>{`auto sp1 = make_shared<Animal>("Buddy", 4);
{
    auto sp2 = sp1;    // ambos apuntan al mismo Animal
    cout << sp1.use_count();   // 2
    sp2->hablar();
}   // sp2 sale del scope, use_count = 1
// El objeto se destruye cuando use_count llega a 0
cout << sp1.use_count();   // 1
sp1.reset();               // libera explícitamente; use_count = 0 → destruido

// weak_ptr — referencia sin propiedad (rompe ciclos)
weak_ptr<Animal> wp = sp1;
if (auto locked = wp.lock()) {   // intenta obtener shared_ptr
    locked->hablar();             // OK si aún existe
}`}</BlogCode>

      <BlogH3>RAII — Resource Acquisition Is Initialization</BlogH3>
      <BlogCode>{`#include <fstream>
#include <stdexcept>

class ArchivoGuardado {
    std::ofstream archivo;
public:
    ArchivoGuardado(const std::string& ruta) : archivo(ruta) {
        if (!archivo.is_open())
            throw std::runtime_error("No se pudo abrir: " + ruta);
    }
    ~ArchivoGuardado() {
        // Se cierra automáticamente — incluso si hay excepción
    }
    void escribir(const std::string& linea) {
        archivo << linea << "\n";
    }

    // Deshabilitar copia
    ArchivoGuardado(const ArchivoGuardado&) = delete;
    ArchivoGuardado& operator=(const ArchivoGuardado&) = delete;
};

// El archivo se cierra al salir del scope, sin importar cómo
void guardar_datos() {
    ArchivoGuardado f("datos.txt");
    f.escribir("Línea 1");
    f.escribir("Línea 2");
    // incluso si aquí hay una excepción, el destructor se llama
}`}</BlogCode>

      <BlogCallout type="tip">
        <strong>Regla general</strong>: usa <code>unique_ptr</code> por defecto,{" "}
        <code>shared_ptr</code> cuando necesitas compartir propiedad, y{" "}
        <code>weak_ptr</code> para observar sin poseer. Evita{" "}
        <code>new/delete</code> directo en código de aplicación.
      </BlogCallout>
    </>
  );
}

function SArchivos() {
  return (
    <>
      <BlogH2>Lectura y escritura de archivos</BlogH2>
      <BlogH3>ofstream — escribir</BlogH3>
      <BlogCode>{`#include <fstream>
#include <iostream>
#include <string>
using namespace std;

int main() {
    // Abrir para escribir (borra contenido previo)
    ofstream out("datos.txt");
    if (!out.is_open()) {
        cerr << "Error al abrir el archivo\\n";
        return 1;
    }

    out << "Línea 1\\n";
    out << "Línea 2\\n";
    out << 42 << " " << 3.14 << "\\n";

    // out.close() se llama automáticamente al destruirse (RAII)

    // Append — añadir al final sin borrar
    ofstream append("log.txt", ios::app);
    append << "Nueva entrada\\n";

    // Binario
    ofstream bin("datos.bin", ios::binary);
    int valor = 12345;
    bin.write(reinterpret_cast<const char*>(&valor), sizeof(valor));

    return 0;
}`}</BlogCode>

      <BlogH3>ifstream — leer</BlogH3>
      <BlogCode>{`#include <fstream>
#include <sstream>
#include <vector>
using namespace std;

int main() {
    ifstream in("datos.txt");
    if (!in) { cerr << "Archivo no encontrado\\n"; return 1; }

    // Leer línea a línea
    string linea;
    while (getline(in, linea)) {
        cout << linea << "\\n";
    }
    in.close();

    // Leer tokens (separados por espacios)
    ifstream in2("numeros.txt");
    int n;
    vector<int> nums;
    while (in2 >> n) nums.push_back(n);

    // Leer TODO el archivo de una vez
    ifstream in3("README.txt");
    ostringstream ss;
    ss << in3.rdbuf();
    string contenido = ss.str();

    // Parsear CSV simple
    ifstream csv("data.csv");
    string fila;
    while (getline(csv, fila)) {
        istringstream iss(fila);
        string campo;
        vector<string> columnas;
        while (getline(iss, campo, ',')) {
            columnas.push_back(campo);
        }
        // columnas[0], columnas[1]...
    }
    return 0;
}`}</BlogCode>

      <BlogH3>fstream — lectura y escritura</BlogH3>
      <BlogCode>{`#include <fstream>
using namespace std;

int main() {
    // Crear y escribir
    fstream f("config.txt", ios::out | ios::trunc);
    f << "velocidad=100\\n";
    f << "modo=auto\\n";
    f.close();

    // Reabrir para leer
    f.open("config.txt", ios::in);
    string linea;
    while (getline(f, linea)) {
        auto sep = linea.find('=');
        if (sep != string::npos) {
            string clave = linea.substr(0, sep);
            string valor = linea.substr(sep + 1);
            cout << clave << " -> " << valor << "\\n";
        }
    }
    f.close();
    return 0;
}`}</BlogCode>

      <BlogCallout type="warn">
        Verifica siempre si el archivo se abrió correctamente antes de operar
        sobre él. Un <code>ifstream</code> que no pudo abrirse simplemente no
        leerá nada, sin lanzar excepción (a menos que actives excepciones con{" "}
        <code>f.exceptions(...)</code>).
      </BlogCallout>
    </>
  );
}

function SEjercicios() {
  const ejercicios = [
    {
      title: "Sistema de gestión de estudiantes",
      level: "Básico" as const,
      description:
        "Crea una clase Estudiante con nombre, DNI, y vector de notas. Implementa métodos para: añadir nota, calcular media, determinar si está aprobado (media ≥ 5) y mostrar expediente completo. Usa un vector<Estudiante> para gestionar varios.",
      hint: "Usa const en los métodos que no modifican el estado. El método mostrar puede usar cout sobrecargando operator<<.",
    },
    {
      title: "Gestor de inventario con STL",
      level: "Básico" as const,
      description:
        "Crea un sistema de inventario para una tienda. Cada producto tiene: nombre, código, precio y stock. Usa un map<string,Producto> (código → producto). Implementa: añadir producto, actualizar stock, buscar por nombre, listar por precio (menor a mayor) y calcular valor total.",
      hint: "Para listar por precio, copia los valores del map a un vector y ordénalos con sort + lambda.",
    },
    {
      title: "Mini sistema bancario",
      level: "Intermedio" as const,
      description:
        "Implementa un banco con: Cuenta (base), CuentaCorriente y CuentaAhorro (heredan). CuentaAhorro tiene un interés mensual; CuentaCorriente permite descubierto hasta un límite. Usa polimorfismo para calcular el saldo proyectado a 12 meses de cada cuenta.",
      hint: "Método virtual puro calcularSaldo(int meses) en la clase base. Las subclases implementan la fórmula diferente.",
    },
    {
      title: "Grafo con lista de adyacencia",
      level: "Avanzado" as const,
      description:
        "Implementa un grafo no dirigido usando unordered_map<int, vector<int>>. Operaciones: addEdge, removeEdge, hasPath (BFS), shortestPath (BFS) y listar componentes conexas.",
      hint: "Para BFS usa una queue<int> y un unordered_set<int> como visitados. Para componentes, itera sobre todos los nodos y lanza BFS desde los no visitados.",
    },
  ];

  return (
    <>
      <BlogH2>Ejercicios de C++</BlogH2>
      <BlogP>
        Proyectos completos para practicar todos los conceptos del tutorial.
        Cada uno combina varias características del lenguaje.
      </BlogP>
      <div className="space-y-2">
        {ejercicios.map((ej, i) => (
          <ExerciseCard key={i} num={i + 1} {...ej} />
        ))}
      </div>
      <div className="mt-8 p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800">
        <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-400 mb-2">
          Proyecto final sugerido
        </p>
        <p className="text-sm text-[#3a3a3c] dark:text-[#aeaeb2]">
          Combina todo en un <strong>sistema de biblioteca</strong>: libros,
          usuarios, préstamos con fechas, multas por retraso, persistencia en
          archivos CSV, búsqueda por título/autor/ISBN y notificaciones de
          devolución próxima.
        </p>
      </div>
    </>
  );
}
