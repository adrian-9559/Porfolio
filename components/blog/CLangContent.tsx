"use client";
import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
type SectionId =
  | "intro" | "variables" | "operadores" | "flujo"
  | "funciones" | "arrays" | "punteros" | "structs" | "ejercicios";

interface SectionDef { id: SectionId; label: string; }
const SECTIONS: SectionDef[] = [
  { id: "intro",      label: "1. Introducción" },
  { id: "variables",  label: "2. Variables y tipos" },
  { id: "operadores", label: "3. Operadores" },
  { id: "flujo",      label: "4. Control de flujo" },
  { id: "funciones",  label: "5. Funciones" },
  { id: "arrays",     label: "6. Arrays y strings" },
  { id: "punteros",   label: "7. Punteros" },
  { id: "structs",    label: "8. Structs" },
  { id: "ejercicios", label: "Ejercicios" },
];

// ── Shared ─────────────────────────────────────────────────────────────────────
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

// ── Exercise Card ──────────────────────────────────────────────────────────────
function ExerciseCard({
  num, title, level, description, hint, solution,
}: {
  num: number; title: string; level: "Básico" | "Intermedio" | "Avanzado";
  description: string; hint?: string; solution?: string;
}) {
  const [open, setOpen] = useState(false);
  const levelColor = {
    Básico:     "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
    Intermedio: "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
    Avanzado:   "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
  }[level];

  return (
    <div className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 flex items-center justify-between gap-3 hover:bg-black/3 dark:hover:bg-white/3 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
            {num}
          </span>
          <span className="text-sm font-medium text-[#1d1d1f] dark:text-white">{title}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor}`}>{level}</span>
          <span className="text-[#aeaeb2] dark:text-[#636366] text-xs">{open ? "▲" : "▼"}</span>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-black/8 dark:border-white/8 pt-3 space-y-3">
          <p className="text-sm text-[#3a3a3c] dark:text-[#aeaeb2]">{description}</p>
          {hint && (
            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl px-3 py-2 text-xs text-blue-700 dark:text-blue-400">
              <strong>Pista:</strong> {hint}
            </div>
          )}
          {solution && (
            <Code>{solution}</Code>
          )}
        </div>
      )}
    </div>
  );
}

// ── MAIN ───────────────────────────────────────────────────────────────────────
export default function CLangContent() {
  const [active, setActive] = useState<SectionId>("intro");
  const currentIdx = SECTIONS.findIndex((s) => s.id === active);

  return (
    <div className="flex gap-8 min-h-[600px]">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col gap-0.5 w-52 shrink-0 sticky top-20 self-start">
        <p className="text-xs font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider px-3 mb-2">Contenido</p>
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={`text-left px-3 py-2 rounded-xl text-sm transition-colors ${
              active === s.id
                ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-medium"
                : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            {s.label}
          </button>
        ))}
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Mobile nav */}
        <div className="lg:hidden mb-6">
          <select
            value={active}
            onChange={(e) => setActive(e.target.value as SectionId)}
            className="w-full px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-white dark:bg-[#111116] text-sm"
          >
            {SECTIONS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>

        <article>
          {active === "intro"      && <SIntro />}
          {active === "variables"  && <SVariables />}
          {active === "operadores" && <SOperadores />}
          {active === "flujo"      && <SFlujo />}
          {active === "funciones"  && <SFunciones />}
          {active === "arrays"     && <SArrays />}
          {active === "punteros"   && <SPunteros />}
          {active === "structs"    && <SStructs />}
          {active === "ejercicios" && <SEjercicios />}
        </article>

        {/* Prev / Next */}
        <div className="flex justify-between mt-10 pt-6 border-t border-black/8 dark:border-white/8">
          <button
            onClick={() => currentIdx > 0 && setActive(SECTIONS[currentIdx - 1]!.id)}
            disabled={currentIdx === 0}
            className="px-4 py-2 rounded-xl border border-black/12 dark:border-white/12 text-sm font-medium disabled:opacity-30 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            ← Anterior
          </button>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366] self-center">
            {currentIdx + 1} / {SECTIONS.length}
          </span>
          <button
            onClick={() => currentIdx < SECTIONS.length - 1 && setActive(SECTIONS[currentIdx + 1]!.id)}
            disabled={currentIdx === SECTIONS.length - 1}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium disabled:opacity-30 transition-colors"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════

function SIntro() {
  return (
    <>
      <H2>¿Qué es C?</H2>
      <P>C es un lenguaje de programación de propósito general, de tipado estático y compilado, creado por Dennis Ritchie en los laboratorios Bell de AT&T entre 1969 y 1973. Es el lenguaje sobre el que se fundó gran parte del software moderno: el kernel de Linux, el intérprete de Python, Node.js y decenas de sistemas operativos están escritos en C.</P>

      <H3>Historia</H3>
      <P>C evolucionó del lenguaje B (Ken Thompson, 1969), que a su vez venía de BCPL. Se estandarizó por primera vez como ANSI C (C89/C90), y desde entonces ha tenido revisiones: C99 (bucles con declaración en for, tipos <code>bool</code>, <code>_Bool</code>), C11 (threads básicos, generics) y C17 (correcciones menores). El estándar en uso hoy en día es mayoritariamente C11 o C17.</P>

      <H3>Usos reales</H3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {[
          ["Sistemas operativos", "Linux, macOS XNU, Windows NT (partes)"],
          ["Compiladores e intérpretes", "GCC, Clang, CPython, Ruby MRI"],
          ["Sistemas embebidos", "Firmware de microcontroladores (Arduino, STM32)"],
          ["Bases de datos", "SQLite, partes de PostgreSQL y Redis"],
          ["Redes", "OpenSSL, libcurl, protocolo TCP/IP (kernel)"],
          ["Videojuegos", "Motores de juego, emuladores de consola"],
        ].map(([title, desc]) => (
          <div key={title} className="border border-black/8 dark:border-white/8 rounded-xl p-3">
            <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-0.5">{title}</p>
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">{desc}</p>
          </div>
        ))}
      </div>

      <H3>Flujo de compilación</H3>
      <P>Un programa en C pasa por cuatro fases antes de ejecutarse:</P>
      <div className="flex flex-wrap items-center gap-2 my-4 text-sm">
        {["Preprocesador", "Compilador", "Ensamblador", "Enlazador", "Ejecutable"].map((step, i, arr) => (
          <div key={step} className="flex items-center gap-2">
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl px-3 py-1.5 text-blue-700 dark:text-blue-400 font-medium text-xs">{step}</div>
            {i < arr.length - 1 && <span className="text-[#aeaeb2]">→</span>}
          </div>
        ))}
      </div>
      <Code>{`# Compilar con GCC (todo en uno)
gcc -std=c11 -Wall -Wextra -o programa main.c

# Flags útiles:
#   -Wall       activa las advertencias principales
#   -Wextra     advertencias adicionales
#   -std=c11    estándar C11
#   -O2         optimización nivel 2
#   -g          símbolos de depuración (para gdb)
#   -fsanitize=address  detecta errores de memoria (AddressSanitizer)

# Ejecutar
./programa`}</Code>

      <H3>Hola, mundo</H3>
      <Code>{`#include <stdio.h>    /* Librería estándar de E/S (printf, scanf...) */

int main(void) {
    printf("Hola, mundo\\n");
    return 0;   /* 0 = éxito; cualquier otro valor = error */
}`}</Code>

      <Callout type="tip">
        Usa siempre <code>-Wall -Wextra</code> al compilar. Las advertencias del compilador te salvarán de muchos bugs.
      </Callout>

      <H3>Diferencias clave con otros lenguajes</H3>
      <div className="overflow-x-auto">
        <table className="text-sm w-full border-collapse">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10">
              <th className="text-left py-2 pr-4 text-[#1d1d1f] dark:text-white">C</th>
              <th className="text-left py-2 text-[#1d1d1f] dark:text-white">Python / JS</th>
            </tr>
          </thead>
          <tbody className="text-[#3a3a3c] dark:text-[#aeaeb2]">
            {[
              ["Compilado a código nativo","Interpretado / JIT"],
              ["Gestión manual de memoria","Garbage collector"],
              ["Tipado estático estricto","Tipado dinámico"],
              ["Sin OOP nativa","OOP integrada"],
              ["Acceso directo a memoria","Abstracción de memoria"],
              ["~100x más rápido (en operaciones de bajo nivel)","Mayor productividad de desarrollo"],
            ].map(([c, py]) => (
              <tr key={c} className="border-b border-black/5 dark:border-white/5">
                <td className="py-1.5 pr-4"><code className="bg-black/5 dark:bg-white/5 px-1.5 rounded text-xs">{c}</code></td>
                <td className="py-1.5 text-xs">{py}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function SVariables() {
  return (
    <>
      <H2>Variables y tipos de datos</H2>
      <P>En C debes declarar el tipo de cada variable antes de usarla. El compilador reserva exactamente la cantidad de memoria necesaria para cada tipo.</P>

      <H3>Tipos primitivos</H3>
      <Code>{`/* ENTEROS */
char    c  = 'A';          /* 1 byte  — ASCII; también usado como entero pequeño */
short   s  = 32767;        /* 2 bytes — rango: -32768 a 32767                   */
int     i  = 2147483647;   /* 4 bytes — el tipo entero por defecto               */
long    l  = 2147483647L;  /* 4-8 bytes (depende de plataforma)                  */
long long ll = 9223372036854775807LL; /* 8 bytes garantizados                   */

/* Con y sin signo */
unsigned int  pos  = 4294967295U;   /* 0 a 2^32-1  */
unsigned char byte = 255;           /* 0 a 255      */

/* COMA FLOTANTE */
float  f  = 3.14f;                  /* 4 bytes, ~7 decimales significativos  */
double d  = 3.14159265358979;       /* 8 bytes, ~15 decimales significativos */
long double ld = 3.14159265358979L; /* 10-16 bytes (varía por plataforma)    */

/* VOID */
void funcion(void);   /* sin parámetros */
void *ptr;            /* puntero genérico */`}</Code>

      <H3>Tamaños con sizeof</H3>
      <Code>{`#include <stdio.h>
int main(void) {
    printf("char:       %zu bytes\\n", sizeof(char));
    printf("int:        %zu bytes\\n", sizeof(int));
    printf("long long:  %zu bytes\\n", sizeof(long long));
    printf("float:      %zu bytes\\n", sizeof(float));
    printf("double:     %zu bytes\\n", sizeof(double));
    printf("pointer:    %zu bytes\\n", sizeof(void *));
    return 0;
}
/* Salida típica (x86-64):
   char:       1 bytes
   int:        4 bytes
   long long:  8 bytes
   float:      4 bytes
   double:     8 bytes
   pointer:    8 bytes */`}</Code>

      <H3>Overflow — ¡peligro silencioso!</H3>
      <P>Si un valor supera el rango de su tipo, ocurre <strong>overflow</strong>. En tipos con signo, el comportamiento es <em>indefinido</em> en C. En tipos sin signo, da la vuelta (módulo 2^N).</P>
      <Code>{`#include <stdio.h>
int main(void) {
    unsigned char a = 255;
    a++;                    /* 256 no cabe en 1 byte sin signo → 0 */
    printf("%d\\n", a);     /* 0 */

    /* Comprobar overflow antes de sumar */
    int b = 2147483647;     /* INT_MAX */
    if (b < 2147483647) {   /* siempre verificar antes */
        b++;
    }
    return 0;
}`}</Code>

      <H3>Constantes y literales</H3>
      <Code>{`const int MAX = 100;           /* constante tipada */
#define PI 3.14159             /* constante de preprocesador */

/* Literales con bases */
int hex  = 0xFF;               /* hexadecimal = 255 */
int oct  = 0377;               /* octal = 255 */
int bin  = 0b11111111;         /* binario = 255 (GCC, no estándar C) */

/* Enumeraciones */
enum Dia { LUN=1, MAR, MIE, JUE, VIE, SAB, DOM };
enum Dia hoy = MIE;            /* hoy = 3 */`}</Code>

      <H3>Conversiones de tipo</H3>
      <Code>{`int   a = 7, b = 2;
/* División entera — resultado: 3, no 3.5 */
int   res1 = a / b;
/* Cast explícito para obtener coma flotante */
double res2 = (double)a / b;   /* 3.5 */

/* Conversión implícita — el int se "promueve" a double */
double res3 = a / 2.0;         /* 3.5 */

/* Truncamiento al convertir double → int */
int truncado = (int)3.99;      /* 3 */`}</Code>

      <Callout type="warn">
        Al convertir <code>double</code> a <code>int</code>, C <strong>trunca</strong> (no redondea). Usa <code>round()</code> de <code>&lt;math.h&gt;</code> si necesitas redondeo.
      </Callout>
    </>
  );
}

function SOperadores() {
  return (
    <>
      <H2>Operadores</H2>
      <H3>Aritméticos</H3>
      <Code>{`int a = 10, b = 3;
printf("%d\\n", a + b);   /* 13 — suma           */
printf("%d\\n", a - b);   /* 7  — resta          */
printf("%d\\n", a * b);   /* 30 — multiplicación */
printf("%d\\n", a / b);   /* 3  — división entera */
printf("%d\\n", a % b);   /* 1  — resto (módulo) */

/* Incremento y decremento */
int c = 5;
printf("%d\\n", c++);     /* 5 — imprime ANTES de incrementar */
printf("%d\\n", c);       /* 6 */
printf("%d\\n", ++c);     /* 7 — incrementa ANTES de imprimir */
printf("%d\\n", c--);     /* 7 — imprime ANTES de decrementar */`}</Code>

      <H3>Relacionales y lógicos</H3>
      <Code>{`/* Relacionales — devuelven 1 (verdadero) o 0 (falso) */
printf("%d\\n", 5 == 5);   /* 1 */
printf("%d\\n", 5 != 4);   /* 1 */
printf("%d\\n", 3 >  2);   /* 1 */
printf("%d\\n", 2 >= 2);   /* 1 */
printf("%d\\n", 1 <  0);   /* 0 */

/* Lógicos */
int x = 5, y = 10;
printf("%d\\n", x > 0 && y > 0);   /* AND: 1 */
printf("%d\\n", x < 0 || y > 0);   /* OR:  1 */
printf("%d\\n", !(x > 0));          /* NOT: 0 */`}</Code>

      <H3>Bit a bit (Bitwise)</H3>
      <P>Los operadores bit a bit trabajan directamente sobre los bits de los enteros. Son fundamentales en programación de sistemas, redes y hardware.</P>
      <Code>{`unsigned int a = 0b1010;   /* 10 en decimal */
unsigned int b = 0b1100;   /* 12 en decimal */

printf("%u\\n", a & b);    /* AND:  0b1000 = 8  — 1 si AMBOS bits son 1 */
printf("%u\\n", a | b);    /* OR:   0b1110 = 14 — 1 si AL MENOS UN bit es 1 */
printf("%u\\n", a ^ b);    /* XOR:  0b0110 = 6  — 1 si los bits son DISTINTOS */
printf("%u\\n", ~a);       /* NOT:  complemento a 2 (todos los bits invertidos) */
printf("%u\\n", a << 1);   /* LEFT SHIFT:  0b10100 = 20 (equivale a *2) */
printf("%u\\n", a >> 1);   /* RIGHT SHIFT: 0b0101  = 5  (equivale a /2) */

/* Truco útil — activar, desactivar y comprobar bits individuales */
unsigned int flags = 0;
flags |=  (1 << 3);        /* Activar bit 3:   flags = 0b00001000 */
flags &= ~(1 << 3);        /* Desactivar bit 3 */
int activo = (flags >> 3) & 1; /* Leer bit 3 */`}</Code>

      <H3>Asignación compuesta</H3>
      <Code>{`int n = 10;
n += 5;    /* n = 15  — equivale a n = n + 5 */
n -= 3;    /* n = 12 */
n *= 2;    /* n = 24 */
n /= 4;    /* n = 6  */
n %= 4;    /* n = 2  */
n <<= 2;   /* n = 8  */
n >>= 1;   /* n = 4  */
n &= 3;    /* n = 0  */
n |= 7;    /* n = 7  */
n ^= 5;    /* n = 2  */`}</Code>

      <H3>Ternario y sizeof</H3>
      <Code>{`int x = 15, y = 20;
int mayor = (x > y) ? x : y;     /* 20 — equivale a if/else en una línea */

/* sizeof devuelve el tamaño en bytes de un tipo o expresión */
printf("%zu\\n", sizeof(int));      /* 4 */
printf("%zu\\n", sizeof(mayor));    /* 4 */`}</Code>

      <Callout type="tip">
        <strong>Prioridad de operadores</strong> (de mayor a menor): <code>() [] -&gt; .</code> → <code>! ~ ++ -- (cast) *</code> → <code>* / %</code> → <code>+ -</code> → <code>&lt;&lt; &gt;&gt;</code> → <code>&lt; &gt; &lt;= &gt;=</code> → <code>== !=</code> → <code>&amp;</code> → <code>^</code> → <code>|</code> → <code>&amp;&amp;</code> → <code>||</code> → <code>?:</code> → <code>= += …</code>. Cuando tengas dudas, usa paréntesis.
      </Callout>
    </>
  );
}

function SFlujo() {
  return (
    <>
      <H2>Control de flujo</H2>
      <H3>if / else if / else</H3>
      <Code>{`#include <stdio.h>
int main(void) {
    int nota = 75;

    if (nota >= 90) {
        printf("Sobresaliente\\n");
    } else if (nota >= 70) {
        printf("Notable\\n");
    } else if (nota >= 50) {
        printf("Aprobado\\n");
    } else {
        printf("Suspenso\\n");
    }
    return 0;
}`}</Code>

      <H3>switch</H3>
      <Code>{`int dia = 3;
switch (dia) {
    case 1: printf("Lunes\\n");     break;
    case 2: printf("Martes\\n");    break;
    case 3: printf("Miércoles\\n"); break;
    case 4: printf("Jueves\\n");    break;
    case 5: printf("Viernes\\n");   break;
    case 6:
    case 7: printf("Fin de semana\\n"); break;  /* fall-through intencional */
    default: printf("Día no válido\\n");
}
/* ¡IMPORTANTE! Sin break, la ejecución "cae" al siguiente case. */`}</Code>

      <H3>while</H3>
      <Code>{`int i = 1, suma = 0;
while (i <= 100) {
    suma += i;
    i++;
}
printf("Suma 1..100 = %d\\n", suma);   /* 5050 */`}</Code>

      <H3>do…while</H3>
      <Code>{`/* Se ejecuta AL MENOS una vez */
int n;
do {
    printf("Introduce un número entre 1 y 10: ");
    scanf("%d", &n);
} while (n < 1 || n > 10);
printf("Elegiste: %d\\n", n);`}</Code>

      <H3>for</H3>
      <Code>{`/* for (inicialización; condición; actualización) */
for (int i = 0; i < 10; i++) {
    printf("%d ", i);
}
/* Salida: 0 1 2 3 4 5 6 7 8 9 */

/* Bucle infinito con break */
int cuenta = 0;
for (;;) {
    if (++cuenta >= 5) break;
}

/* Múltiples variables */
for (int i = 0, j = 10; i < j; i++, j--) {
    printf("i=%d j=%d\\n", i, j);
}`}</Code>

      <H3>break, continue y goto</H3>
      <Code>{`/* break — sale del bucle más cercano */
for (int i = 0; i < 10; i++) {
    if (i == 5) break;
    printf("%d ", i);   /* 0 1 2 3 4 */
}

/* continue — salta a la siguiente iteración */
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) continue;
    printf("%d ", i);   /* 1 3 5 7 9 — solo impares */
}

/* goto — usar con moderación, solo para salir de bucles anidados */
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        if (i == 2 && j == 3) goto fin_bucle;
    }
}
fin_bucle:
printf("Salimos\\n");`}</Code>

      <Callout type="tip">
        Evita <code>goto</code> en código general. Su único uso aceptado es salir de bucles profundamente anidados cuando <code>break</code> no alcanza.
      </Callout>
    </>
  );
}

function SFunciones() {
  return (
    <>
      <H2>Funciones</H2>
      <H3>Declaración, definición y llamada</H3>
      <Code>{`#include <stdio.h>

/* Prototipo (declaración) — necesario si la función está DESPUÉS de main */
int suma(int a, int b);
double potencia(double base, int exp);

int main(void) {
    printf("%d\\n", suma(3, 4));         /* 7 */
    printf("%.2f\\n", potencia(2, 10));  /* 1024.00 */
    return 0;
}

/* Definición */
int suma(int a, int b) {
    return a + b;
}

double potencia(double base, int exp) {
    double resultado = 1.0;
    for (int i = 0; i < exp; i++) resultado *= base;
    return resultado;
}`}</Code>

      <H3>Paso por valor vs paso por referencia</H3>
      <Code>{`/* Paso por valor — el parámetro es una COPIA */
void dobla_valor(int n) {
    n *= 2;   /* solo modifica la copia local */
}

/* Paso por referencia (mediante puntero) — modifica el original */
void dobla_ref(int *n) {
    *n *= 2;  /* desreferencia el puntero para modificar el original */
}

int main(void) {
    int x = 5;
    dobla_valor(x);     printf("%d\\n", x);   /* 5  — sin cambio */
    dobla_ref(&x);      printf("%d\\n", x);   /* 10 — modificado */
    return 0;
}

/* Devolver múltiples valores con punteros */
void min_max(int arr[], int n, int *min, int *max) {
    *min = *max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < *min) *min = arr[i];
        if (arr[i] > *max) *max = arr[i];
    }
}

int main(void) {
    int datos[] = {3, 1, 4, 1, 5, 9, 2, 6};
    int mn, mx;
    min_max(datos, 8, &mn, &mx);
    printf("Min=%d Max=%d\\n", mn, mx);   /* Min=1 Max=9 */
    return 0;
}`}</Code>

      <H3>Scope (ámbito)</H3>
      <Code>{`int global = 100;   /* visible en todo el archivo */

void funcion(void) {
    int local = 10;    /* solo en funcion() */
    {
        int bloque = 5;   /* solo en este bloque */
        printf("%d %d\\n", local, bloque);  /* OK */
    }
    /* bloque ya no es accesible aquí */
}

/* Variable estática: persiste entre llamadas, scope local */
int contador(void) {
    static int cuenta = 0;   /* inicializada solo la primera vez */
    return ++cuenta;
}

/* 1ª llamada: 1, 2ª: 2, 3ª: 3... */`}</Code>

      <H3>Recursividad</H3>
      <Code>{`/* Factorial iterativo vs recursivo */
long iterativo(int n) {
    long res = 1;
    for (int i = 2; i <= n; i++) res *= i;
    return res;
}

long recursivo(int n) {
    if (n <= 1) return 1;        /* caso base */
    return n * recursivo(n - 1); /* llamada recursiva */
}

/* Fibonacci con memoización */
#define MAX_N 100
long memo[MAX_N + 1];

long fib(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = fib(n-1) + fib(n-2);
}

int main(void) {
    for (int i = 0; i <= MAX_N; i++) memo[i] = -1;
    printf("fib(40) = %ld\\n", fib(40));  /* rápido */
    return 0;
}`}</Code>

      <Callout type="warn">
        La recursividad sin caso base produce desbordamiento de pila (<em>stack overflow</em>). Siempre define un <strong>caso base</strong> claro.
      </Callout>
    </>
  );
}

function SArrays() {
  return (
    <>
      <H2>Arrays y strings</H2>
      <H3>Arrays unidimensionales</H3>
      <Code>{`#include <stdio.h>

int main(void) {
    /* Declaración e inicialización */
    int nums[5] = {10, 20, 30, 40, 50};
    int ceros[10] = {0};            /* todos a 0 */
    int auto_size[] = {1, 2, 3};    /* tamaño deducido = 3 */

    /* Acceso — base 0 */
    printf("%d\\n", nums[0]);        /* 10 */
    printf("%d\\n", nums[4]);        /* 50 */

    /* Calcular longitud en tiempo de compilación */
    int len = sizeof(nums) / sizeof(nums[0]);   /* 5 */

    /* Recorrer */
    for (int i = 0; i < len; i++) {
        printf("%d ", nums[i]);
    }

    /* Arrays 2D (matrices) */
    int mat[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9},
    };
    printf("\\n%d\\n", mat[1][2]);   /* 6 */
    return 0;
}`}</Code>

      <H3>Memoria en arrays</H3>
      <P>Los elementos de un array se almacenan de forma <strong>contigua</strong> en memoria. Si <code>int arr[5]</code> comienza en la dirección 0x100, los elementos están en 0x100, 0x104, 0x108, 0x10C, 0x110 (en un sistema de 4 bytes por int).</P>
      <Code>{`int arr[5] = {10, 20, 30, 40, 50};
printf("Dirección base:    %p\\n", (void*)arr);
printf("Dirección arr[1]:  %p\\n", (void*)&arr[1]);
printf("Dirección arr[2]:  %p\\n", (void*)&arr[2]);
/* arr[1] = arr + sizeof(int) = arr + 4 bytes */`}</Code>

      <H3>Strings en C</H3>
      <P>En C, un string es simplemente un array de <code>char</code> terminado en el carácter nulo <code>'\0'</code>. Este terminador es obligatorio: sin él, las funciones de string corren fuera de los límites.</P>
      <Code>{`#include <stdio.h>
#include <string.h>

int main(void) {
    /* Las dos formas de declarar un string */
    char saludo1[] = "Hola";               /* array con '\\0' implícito */
    char saludo2[] = {'H','o','l','a','\\0'}; /* equivalente */
    const char *literal = "mundo";         /* puntero a string literal (solo lectura) */

    printf("Longitud: %zu\\n", strlen(saludo1));  /* 4 (sin '\\0') */
    printf("Tamaño:   %zu\\n", sizeof(saludo1));  /* 5 (con '\\0') */

    /* Funciones de <string.h> */
    char dest[50];
    strcpy(dest, saludo1);          /* copiar — peligroso sin límite */
    strncpy(dest, saludo1, 49);     /* más seguro con límite */
    strcat(dest, " mundo");         /* concatenar */
    printf("%s\\n", dest);           /* Hola mundo */

    printf("%d\\n", strcmp("abc", "abc"));  /* 0 — iguales */
    printf("%d\\n", strcmp("abc", "abd"));  /* negativo — 'c' < 'd' */

    /* Buscar en string */
    char *pos = strstr(dest, "mundo");
    if (pos) printf("Encontrado en índice: %ld\\n", pos - dest);

    return 0;
}`}</Code>

      <H3>Errores comunes con strings</H3>
      <Code>{`/* ❌ PELIGRO — buffer overflow */
char buf[10];
strcpy(buf, "Esta cadena tiene más de 10 caracteres");   /* CRASH */

/* ✓ Correcto */
char buf2[50];
strncpy(buf2, "Esta cadena...", sizeof(buf2) - 1);
buf2[sizeof(buf2) - 1] = '\\0';   /* asegurar terminador */

/* ❌ Comparar strings con == (compara punteros, no contenido) */
if (buf2 == "hola") { /* NUNCA así */ }

/* ✓ Correcto */
if (strcmp(buf2, "hola") == 0) { /* OK */ }

/* Leer líneas completas — fgets es más seguro que gets */
char linea[100];
fgets(linea, sizeof(linea), stdin);   /* incluye el '\\n' al final */`}</Code>

      <Callout type="danger">
        Nunca uses <code>gets()</code> — fue eliminada en C11 porque no limita el tamaño de entrada. Usa siempre <code>fgets()</code>.
      </Callout>
    </>
  );
}

function SPunteros() {
  return (
    <>
      <H2>Punteros</H2>
      <P>Un puntero es una variable que almacena la <strong>dirección de memoria</strong> de otra variable. Son la característica más poderosa de C y la fuente de muchos bugs si se usan mal.</P>

      <H3>Concepto de memoria</H3>
      <P>La memoria RAM se puede imaginar como un gran array de bytes, donde cada byte tiene una dirección única. Cuando declaras <code>int x = 42</code>, el sistema reserva 4 bytes consecutivos en alguna dirección, por ejemplo 0x7fff5abc, y almacena 42 en esa posición.</P>

      <H3>Declaración y operadores básicos</H3>
      <Code>{`#include <stdio.h>

int main(void) {
    int valor = 42;
    int *ptr = &valor;   /* ptr almacena la DIRECCIÓN de valor */

    /* & = "dirección de"       * = "desreferenciar" (valor en esa dirección) */
    printf("Valor:    %d\\n",  valor);          /* 42 */
    printf("Dirección: %p\\n", (void*)&valor);  /* 0x7fff... */
    printf("ptr:       %p\\n", (void*)ptr);     /* misma dirección */
    printf("*ptr:      %d\\n", *ptr);           /* 42 */

    *ptr = 100;          /* modifica valor a través del puntero */
    printf("valor:    %d\\n",  valor);          /* 100 */

    /* Puntero nulo — no apunta a nada válido */
    int *nulo = NULL;
    if (nulo != NULL) { /* siempre verificar antes de desreferenciar */
        printf("%d\\n", *nulo);
    }
    return 0;
}`}</Code>

      <H3>Aritmética de punteros</H3>
      <Code>{`int arr[] = {10, 20, 30, 40, 50};
int *p = arr;   /* p apunta a arr[0] */

printf("%d\\n", *p);       /* 10 */
printf("%d\\n", *(p+1));   /* 20 — avanza sizeof(int) bytes */
printf("%d\\n", *(p+4));   /* 50 */

p++;   /* p ahora apunta a arr[1] */
printf("%d\\n", *p);       /* 20 */

/* Diferencia entre punteros */
int *inicio = arr;
int *fin    = arr + 5;
ptrdiff_t dist = fin - inicio;   /* 5 — número de ELEMENTOS, no bytes */

/* Recorrer array con punteros */
for (int *q = arr; q < arr + 5; q++) {
    printf("%d ", *q);   /* 10 20 30 40 50 */
}`}</Code>

      <H3>Relación entre arrays y punteros</H3>
      <Code>{`int arr[5] = {1, 2, 3, 4, 5};

/* arr (sin corchetes) ES un puntero al primer elemento */
printf("%p\\n", (void*)arr);        /* dirección de arr[0] */
printf("%p\\n", (void*)&arr[0]);    /* misma dirección */

/* Estas expresiones son equivalentes */
arr[2]    == *(arr + 2)   /* acceso con índice = aritmética de punteros */
p[1]      == *(p + 1)

/* DIFERENCIA IMPORTANTE:
   - arr es una constante (no puedes hacer arr++)
   - int *p = arr; p es una variable (puedes hacer p++) */`}</Code>

      <H3>Punteros a punteros</H3>
      <Code>{`int   n   = 5;
int  *p   = &n;
int **pp  = &p;    /* puntero a puntero */

printf("%d\\n", **pp);       /* 5 */

**pp = 99;
printf("%d\\n", n);           /* 99 — modificado dos niveles arriba */

/* Uso práctico: pasar un puntero que queremos modificar */
void asignar(int **dest, int *src) {
    *dest = src;   /* modifica el puntero original */
}`}</Code>

      <H3>Punteros y memoria dinámica</H3>
      <Code>{`#include <stdlib.h>
#include <stdio.h>

int main(void) {
    int n = 10;

    /* malloc — reserva n*4 bytes sin inicializar */
    int *arr = malloc(n * sizeof(int));
    if (!arr) {
        fprintf(stderr, "Error: sin memoria\\n");
        return 1;
    }

    /* calloc — reserva e inicializa todo a 0 */
    int *ceros = calloc(n, sizeof(int));

    /* Usar el array dinámico */
    for (int i = 0; i < n; i++) arr[i] = i * i;

    /* realloc — redimensionar */
    arr = realloc(arr, 20 * sizeof(int));
    if (!arr) { /* ¡verificar! realloc puede fallar */ }

    /* free — OBLIGATORIO liberar la memoria */
    free(arr);
    free(ceros);
    arr   = NULL;   /* buena práctica: poner a NULL tras free */
    ceros = NULL;

    return 0;
}`}</Code>

      <H3>Errores críticos con punteros</H3>
      <Code>{`/* ❌ Puntero sin inicializar (wild pointer) */
int *p;
*p = 5;          /* comportamiento indefinido — segfault */

/* ❌ Acceso tras free (use-after-free) */
int *q = malloc(sizeof(int));
free(q);
*q = 10;         /* comportamiento indefinido */

/* ❌ Doble free */
free(q);         /* segunda liberación — corrupción de heap */

/* ❌ Desbordamiento de buffer */
int buf[5];
buf[10] = 42;    /* escribe fuera del array */

/* ❌ Retornar puntero a variable local */
int *mala(void) {
    int local = 5;
    return &local;   /* local se destruye al salir de la función */
}`}</Code>

      <Callout type="danger">
        Compila siempre con <code>-fsanitize=address,undefined</code> durante el desarrollo. AddressSanitizer detecta use-after-free, buffer overflows y otros errores de memoria en tiempo de ejecución.
      </Callout>
    </>
  );
}

function SStructs() {
  return (
    <>
      <H2>Structs</H2>
      <P>Un <code>struct</code> es un tipo de dato compuesto que agrupa variables relacionadas bajo un mismo nombre. Son la base para crear abstracciones de datos en C.</P>

      <H3>Creación y uso básico</H3>
      <Code>{`#include <stdio.h>
#include <string.h>

struct Punto {
    double x;
    double y;
};

struct Persona {
    char   nombre[50];
    int    edad;
    double altura;
};

int main(void) {
    /* Inicialización */
    struct Punto p1 = {3.0, 4.0};
    struct Punto p2 = {.x = 1.0, .y = 2.0};   /* designadores (C99) */

    /* Acceso con . */
    printf("p1: (%.1f, %.1f)\\n", p1.x, p1.y);

    struct Persona per = {"Adrián", 23, 1.80};
    printf("%s tiene %d años\\n", per.nombre, per.edad);

    /* Copiar struct (copia todos los campos) */
    struct Persona per2 = per;
    strcpy(per2.nombre, "María");
    printf("%s\\n", per.nombre);   /* "Adrián" — per no se modificó */

    return 0;
}`}</Code>

      <H3>typedef — alias de tipo</H3>
      <Code>{`/* Sin typedef — hay que escribir "struct" siempre */
struct Punto p;

/* Con typedef */
typedef struct {
    double x;
    double y;
} Punto;

Punto p = {1.0, 2.0};   /* más limpio */

/* typedef para puntero a función */
typedef int (*Comparador)(const void *, const void *);`}</Code>

      <H3>Structs y punteros</H3>
      <Code>{`typedef struct {
    char  nombre[50];
    int   creditos;
    float nota;
} Asignatura;

/* Pasar struct grande por puntero (más eficiente que copiar) */
void mostrar(const Asignatura *a) {
    printf("%s — %d créditos — %.2f\\n", a->nombre, a->creditos, a->nota);
    /*        ↑ operador -> = (*a). */
}

void aplicar_bonus(Asignatura *a, float bonus) {
    a->nota += bonus;
    if (a->nota > 10.0f) a->nota = 10.0f;
}

int main(void) {
    Asignatura prog = {"Programación", 6, 7.5f};
    mostrar(&prog);          /* Programación — 6 créditos — 7.50 */
    aplicar_bonus(&prog, 1.0f);
    mostrar(&prog);          /* Programación — 6 créditos — 8.50 */
    return 0;
}`}</Code>

      <H3>Arrays de structs — lista de datos</H3>
      <Code>{`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    int   id;
    char  nombre[50];
    float salario;
} Empleado;

/* Comparador para qsort */
int cmp_salario(const void *a, const void *b) {
    const Empleado *ea = (const Empleado *)a;
    const Empleado *eb = (const Empleado *)b;
    if (ea->salario < eb->salario) return -1;
    if (ea->salario > eb->salario) return  1;
    return 0;
}

int main(void) {
    Empleado equipo[] = {
        {1, "Ana",   45000.0f},
        {2, "Luis",  38000.0f},
        {3, "Carmen", 52000.0f},
    };
    int n = sizeof(equipo) / sizeof(equipo[0]);

    qsort(equipo, n, sizeof(Empleado), cmp_salario);

    for (int i = 0; i < n; i++) {
        printf("[%d] %s — %.0f€\\n", equipo[i].id, equipo[i].nombre, equipo[i].salario);
    }
    return 0;
}`}</Code>

      <H3>Structs anidados y struct recursivo</H3>
      <Code>{`typedef struct Nodo {
    int          valor;
    struct Nodo *siguiente;   /* puntero al mismo tipo — lista enlazada */
} Nodo;

Nodo *nueva_lista(int val) {
    Nodo *n = malloc(sizeof(Nodo));
    n->valor = val;
    n->siguiente = NULL;
    return n;
}

void insertar(Nodo **lista, int val) {
    Nodo *nuevo = malloc(sizeof(Nodo));
    nuevo->valor = val;
    nuevo->siguiente = *lista;
    *lista = nuevo;
}

void liberar(Nodo *lista) {
    while (lista) {
        Nodo *temp = lista;
        lista = lista->siguiente;
        free(temp);
    }
}`}</Code>
    </>
  );
}

function SEjercicios() {
  const ejerciciosBasicos = [
    { title: "Calculadora básica", description: "Implementa una función para cada operación aritmética (+, -, *, /) que reciba dos doubles y devuelva el resultado. Muestra un menú de selección de operación.", hint: "Usa un switch para seleccionar la operación. Verifica que el divisor no sea cero.", solution: `double dividir(double a, double b) {
    if (b == 0.0) {
        fprintf(stderr, "Error: división por cero\\n");
        return 0.0;
    }
    return a / b;
}` },
    { title: "Inversión de array", description: "Recibe un array de enteros y su tamaño. Inviértelo in-place sin usar un array auxiliar.", hint: "Usa dos índices: uno al inicio y otro al final. Intercámbialos y avanza hacia el centro.", solution: `void invertir(int arr[], int n) {
    for (int i = 0, j = n-1; i < j; i++, j--) {
        int tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
}` },
    { title: "FizzBuzz", description: "Imprime los números del 1 al 100. Para múltiplos de 3 imprime 'Fizz', para múltiplos de 5 imprime 'Buzz', para múltiplos de ambos imprime 'FizzBuzz'.", hint: "Comprueba primero el caso FizzBuzz (múltiplo de 15), luego Fizz, luego Buzz.", solution: `for (int i = 1; i <= 100; i++) {
    if (i % 15 == 0)     printf("FizzBuzz\\n");
    else if (i % 3 == 0) printf("Fizz\\n");
    else if (i % 5 == 0) printf("Buzz\\n");
    else                 printf("%d\\n", i);
}` },
    { title: "Suma de dígitos", description: "Dada un número entero positivo, calcula la suma de sus dígitos. Ejemplo: 1234 → 1+2+3+4 = 10.", hint: "Usa el operador módulo (%) para extraer el último dígito y la división entera (/) para eliminar el último dígito.", solution: `int suma_digitos(int n) {
    int suma = 0;
    while (n > 0) {
        suma += n % 10;
        n /= 10;
    }
    return suma;
}` },
    { title: "Número primo", description: "Implementa una función que determine si un número es primo. Devuelve 1 si es primo, 0 si no.", hint: "Solo necesitas verificar divisores hasta la raíz cuadrada del número.", solution: `#include <math.h>
int es_primo(int n) {
    if (n < 2) return 0;
    for (int i = 2; i <= (int)sqrt(n); i++) {
        if (n % i == 0) return 0;
    }
    return 1;
}` },
    { title: "Contar vocales", description: "Dada una cadena de caracteres, cuenta el número de vocales (a, e, i, o, u, mayúsculas y minúsculas).", hint: "Usa strchr() o compara cada carácter contra las vocales. Convierte a minúsculas con tolower() de <ctype.h>.", solution: `#include <ctype.h>
int contar_vocales(const char *s) {
    int count = 0;
    for (; *s; s++) {
        char c = tolower(*s);
        if (c=='a'||c=='e'||c=='i'||c=='o'||c=='u') count++;
    }
    return count;
}` },
    { title: "Palíndromo", description: "Determina si una cadena es un palíndromo (se lee igual al derecho que al revés). Ignora mayúsculas y espacios.", hint: "Compara el primer y último carácter, avanzando hacia el centro.", solution: `#include <string.h>
#include <ctype.h>
int es_palindromo(const char *s) {
    int i = 0, j = strlen(s) - 1;
    while (i < j) {
        if (tolower(s[i]) != tolower(s[j])) return 0;
        i++; j--;
    }
    return 1;
}` },
    { title: "Tabla de multiplicar", description: "Imprime la tabla de multiplicar del 1 al 10 en formato de cuadrícula alineado.", hint: "Usa printf con ancho de campo fijo: printf(\"%4d\", valor).", solution: `for (int i = 1; i <= 10; i++) {
    for (int j = 1; j <= 10; j++) {
        printf("%4d", i * j);
    }
    printf("\\n");
}` },
    { title: "Máximo común divisor", description: "Implementa el algoritmo de Euclides para calcular el MCD de dos enteros.", hint: "El algoritmo de Euclides: mcd(a, b) = mcd(b, a % b) mientras b != 0.", solution: `int mcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}` },
    { title: "Binario a decimal", description: "Convierte un número binario representado como string (\"1101\") a su valor decimal.", hint: "Recorre la cadena de izquierda a derecha. Cada posición equivale a 2^(n-1-i).", solution: `int bin_a_dec(const char *bin) {
    int result = 0;
    for (; *bin; bin++) {
        result = result * 2 + (*bin - '0');
    }
    return result;
}` },
  ];

  const ejerciciosIntermedios = [
    { title: "Ordenación por inserción", description: "Implementa el algoritmo Insertion Sort para ordenar un array de enteros de menor a mayor.", hint: "Para cada elemento, desplaza los mayores una posición a la derecha e inserta en su lugar correcto.", solution: `void insertion_sort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i], j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j+1] = arr[j]; j--;
        }
        arr[j+1] = key;
    }
}` },
    { title: "Búsqueda binaria", description: "Implementa búsqueda binaria sobre un array ordenado. Devuelve el índice del elemento o -1 si no existe.", hint: "Mantén un rango [izq, der]. Compara el elemento del medio con el buscado y reduce el rango a la mitad.", solution: `int busqueda_binaria(int arr[], int n, int objetivo) {
    int izq = 0, der = n - 1;
    while (izq <= der) {
        int mid = izq + (der - izq) / 2;
        if (arr[mid] == objetivo) return mid;
        if (arr[mid] < objetivo)  izq = mid + 1;
        else                       der = mid - 1;
    }
    return -1;
}` },
    { title: "Matriz transpuesta", description: "Dada una matriz cuadrada N×N, calcula su transpuesta in-place (intercambia filas por columnas).", hint: "Solo itera sobre el triángulo superior (j > i) e intercambia arr[i][j] con arr[j][i]." },
    { title: "Lista enlazada — operaciones", description: "Implementa una lista enlazada simple con: insertar al final, buscar por valor, eliminar por valor y mostrar todos.", hint: "Necesitarás tres punteros típicamente: anterior, actual, nuevo. Cuida el caso de eliminar la cabeza." },
    { title: "Pila con array", description: "Implementa una pila (LIFO) usando un array estático. Operaciones: push, pop, peek, isEmpty.", hint: "Usa una variable 'top' que empiece en -1. Push incrementa top, pop lo decrementa.", solution: `#define MAX 100
typedef struct { int data[MAX]; int top; } Pila;
void init(Pila *p) { p->top = -1; }
int push(Pila *p, int v) {
    if (p->top >= MAX-1) return 0;
    p->data[++p->top] = v; return 1;
}
int pop(Pila *p, int *v) {
    if (p->top < 0) return 0;
    *v = p->data[p->top--]; return 1;
}` },
    { title: "Cola con array circular", description: "Implementa una cola (FIFO) con array circular. Operaciones: enqueue, dequeue, isEmpty, isFull.", hint: "Usa índices 'frente' y 'trasero' con módulo para crear el efecto circular." },
    { title: "Contar palabras", description: "Dada una cadena de texto, cuenta el número de palabras separadas por espacios, tabulaciones o saltos de línea.", hint: "Un estado simple de dos estados: dentro/fuera de palabra. Incrementa el contador al entrar en una palabra.", solution: `#include <ctype.h>
int contar_palabras(const char *s) {
    int count = 0, en_palabra = 0;
    for (; *s; s++) {
        if (isspace(*s)) { en_palabra = 0; }
        else if (!en_palabra) { count++; en_palabra = 1; }
    }
    return count;
}` },
    { title: "Multiplicación de matrices", description: "Multiplica dos matrices A (M×K) y B (K×N) y almacena el resultado en C (M×N).", hint: "Para C[i][j], suma los productos A[i][k]*B[k][j] para k de 0 a K-1." },
    { title: "Comprimir RLE", description: "Implementa compresión Run-Length Encoding (RLE): 'AAABBBCC' → '3A3B2C'.", hint: "Recorre la cadena contando caracteres consecutivos iguales." },
    { title: "Histograma de caracteres", description: "Dado un texto, muestra cuántas veces aparece cada letra del alfabeto (sin distinguir mayúsculas).", hint: "Usa un array de 26 enteros indexado por (tolower(c) - 'a')." },
  ];

  const ejerciciosAvanzados = [
    { title: "Tabla hash simple", description: "Implementa una tabla hash con encadenamiento para almacenar pares clave-valor (strings → enteros). Operaciones: insertar, buscar, eliminar.", hint: "Función hash: suma de códigos ASCII × primo, módulo tamaño de tabla. Cada bucket es una lista enlazada de pares." },
    { title: "Árbol binario de búsqueda", description: "Implementa un ABB con insertar, buscar, recorrido inorden (da el árbol ordenado) y eliminar nodo.", hint: "Para eliminar: caso 1 (sin hijos), caso 2 (un hijo), caso 3 (dos hijos → reemplaza con el menor del subárbol derecho)." },
    { title: "Analizador de expresiones matemáticas", description: "Dada una cadena con una expresión matemática simple (operadores +, -, *, /, paréntesis), evalúala respetando la precedencia de operadores.", hint: "Implementa un parser recursivo descendente. Gram.: expr → term ((+|-) term)*, term → factor ((*|/) factor)*, factor → número | (expr)." },
    { title: "Gestor de memoria simple", description: "Implementa un allocator básico: una región de memoria fija, con malloc y free propios que gestionan bloques con cabeceras de metadatos.", hint: "Cada bloque tiene una cabecera con tamaño y flag 'libre'. malloc busca el primer bloque libre suficientemente grande, free lo marca como libre y fusiona bloques adyacentes." },
    { title: "Compresión Huffman", description: "Implementa el algoritmo de Huffman para comprimir un texto: construye el árbol de frecuencias, genera los códigos y codifica el texto.", hint: "Usa una cola de prioridad (min-heap) de nodos. Cada paso: extrae los dos de menor frecuencia, crea un nodo padre y reinserta." },
  ];

  return (
    <>
      <H2>Ejercicios de C</H2>
      <P>Practica con estos ejercicios ordenados por dificultad. Intenta resolverlos antes de mirar la pista o solución.</P>

      <H3>Básicos (1–10)</H3>
      <div className="space-y-2 mb-8">
        {ejerciciosBasicos.map((ej, i) => (
          <ExerciseCard key={i} num={i+1} level="Básico" {...ej} />
        ))}
      </div>

      <H3>Intermedios (11–20)</H3>
      <div className="space-y-2 mb-8">
        {ejerciciosIntermedios.map((ej, i) => (
          <ExerciseCard key={i} num={i+11} level="Intermedio" {...ej} />
        ))}
      </div>

      <H3>Avanzados (21–25)</H3>
      <div className="space-y-2">
        {ejerciciosAvanzados.map((ej, i) => (
          <ExerciseCard key={i} num={i+21} level="Avanzado" {...ej} />
        ))}
      </div>

      <Callout type="tip">
        Para los ejercicios avanzados, busca primero la teoría necesaria (árboles, algoritmos de compresión) antes de implementar. La práctica de leer código de otros y entender estructuras es tan importante como escribir código propio.
      </Callout>
    </>
  );
}
