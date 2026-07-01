"use client";
import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
type SectionId =
  | "intro"
  | "variables"
  | "operadores"
  | "flujo"
  | "funciones"
  | "arrays"
  | "punteros"
  | "structs"
  | "ejercicios";

interface SectionDef {
  id: SectionId;
  label: string;
}
const SECTIONS: SectionDef[] = [
  { id: "intro", label: "1. Introduction" },
  { id: "variables", label: "2. Variables & types" },
  { id: "operadores", label: "3. Operators" },
  { id: "flujo", label: "4. Control flow" },
  { id: "funciones", label: "5. Functions" },
  { id: "arrays", label: "6. Arrays & strings" },
  { id: "punteros", label: "7. Pointers" },
  { id: "structs", label: "8. Structs" },
  { id: "ejercicios", label: "Exercises" },
];

import {
  BlogH2,
  BlogH3,
  BlogP,
  BlogCode,
  BlogCallout,
} from "@/components/blog/shared";

// ── Exercise Card ──────────────────────────────────────────────────────────────
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
            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl px-3 py-2 text-xs text-blue-700 dark:text-blue-400">
              <strong>Hint:</strong> {hint}
            </div>
          )}
          {solution && <BlogCode>{solution}</BlogCode>}
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
        <p className="text-xs font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider px-3 mb-2">
          Contents
        </p>
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={`text-left px-3 py-2 rounded-xl text-sm transition-colors ${
              active === s.id
                ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-medium"
                : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
            }`}
            onClick={() => setActive(s.id)}
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
          {active === "operadores" && <SOperadores />}
          {active === "flujo" && <SFlujo />}
          {active === "funciones" && <SFunciones />}
          {active === "arrays" && <SArrays />}
          {active === "punteros" && <SPunteros />}
          {active === "structs" && <SStructs />}
          {active === "ejercicios" && <SEjercicios />}
        </article>

        {/* Prev / Next */}
        <div className="flex justify-between mt-10 pt-6 border-t border-black/8 dark:border-white/8">
          <button
            className="px-4 py-2 rounded-xl border border-black/12 dark:border-white/12 text-sm font-medium disabled:opacity-30 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            disabled={currentIdx === 0}
            onClick={() =>
              currentIdx > 0 && setActive(SECTIONS[currentIdx - 1]!.id)
            }
          >
            ← Previous
          </button>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366] self-center">
            {currentIdx + 1} / {SECTIONS.length}
          </span>
          <button
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium disabled:opacity-30 transition-colors"
            disabled={currentIdx === SECTIONS.length - 1}
            onClick={() =>
              currentIdx < SECTIONS.length - 1 &&
              setActive(SECTIONS[currentIdx + 1]!.id)
            }
          >
            Next →
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
      <BlogH2>What is C?</BlogH2>
      <BlogP>
        C is a general-purpose, statically typed, compiled programming
        language created by Dennis Ritchie at AT&T Bell Labs between 1969 and
        1973. It is the language upon which much of modern software is built:
        the Linux kernel, the Python interpreter, Node.js, and dozens of
        operating systems are written in C.
      </BlogP>

      <BlogH3>History</BlogH3>
      <BlogP>
        C evolved from the B language (Ken Thompson, 1969), which in turn came from
        BCPL. It was first standardized as ANSI C (C89/C90), and since
        then has had revisions: C99 (loop declarations, <code>bool</code> types,{" "}
        <code>_Bool</code>), C11 (basic threads, generics)
        and C17 (minor corrections). The standard in use today is
        mostly C11 or C17.
      </BlogP>

      <BlogH3>Real-world uses</BlogH3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {[
          ["Operating systems", "Linux, macOS XNU, Windows NT (parts)"],
          ["Compilers & interpreters", "GCC, Clang, CPython, Ruby MRI"],
          ["Embedded systems", "Microcontroller firmware (Arduino, STM32)"],
          ["Databases", "SQLite, parts of PostgreSQL and Redis"],
          ["Networking", "OpenSSL, libcurl, TCP/IP stack (kernel)"],
          ["Video games", "Game engines, console emulators"],
        ].map(([title, desc]) => (
          <div
            key={title}
            className="border border-black/8 dark:border-white/8 rounded-xl p-3"
          >
            <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-0.5">
              {title}
            </p>
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">{desc}</p>
          </div>
        ))}
      </div>

      <BlogH3>Compilation flow</BlogH3>
      <BlogP>A C program goes through four phases before execution:</BlogP>
      <div className="flex flex-wrap items-center gap-2 my-4 text-sm">
        {[
          "Preprocessor",
          "Compiler",
          "Assembler",
          "Linker",
          "Executable",
        ].map((step, i, arr) => (
          <div key={step} className="flex items-center gap-2">
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl px-3 py-1.5 text-blue-700 dark:text-blue-400 font-medium text-xs">
              {step}
            </div>
            {i < arr.length - 1 && <span className="text-[#aeaeb2]">→</span>}
          </div>
        ))}
      </div>
      <BlogCode>{`# Compile with GCC (all-in-one)
gcc -std=c11 -Wall -Wextra -o program main.c

# Useful flags:
#   -Wall       enables major warnings
#   -Wextra     additional warnings
#   -std=c11    C11 standard
#   -O2         optimization level 2
#   -g          debug symbols (for gdb)
#   -fsanitize=address  detects memory errors (AddressSanitizer)

# Run
./program`}</BlogCode>

      <BlogH3>Hello, world</BlogH3>
      <BlogCode>{`#include <stdio.h>    /* Standard I/O library (printf, scanf...) */

int main(void) {
    printf("Hello, world\\n");
    return 0;   /* 0 = success; any other value = error */
}`}</BlogCode>

      <BlogCallout type="tip">
        Always use <code>-Wall -Wextra</code> when compiling. The compiler
        warnings will save you from many bugs.
      </BlogCallout>

      <BlogH3>Key differences from other languages</BlogH3>
      <div className="overflow-x-auto">
        <table className="text-sm w-full border-collapse">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10">
              <th className="text-left py-2 pr-4 text-[#1d1d1f] dark:text-white">
                C
              </th>
              <th className="text-left py-2 text-[#1d1d1f] dark:text-white">
                Python / JS
              </th>
            </tr>
          </thead>
          <tbody className="text-[#3a3a3c] dark:text-[#aeaeb2]">
            {[
              ["Compiled to native code", "Interpreted / JIT"],
              ["Manual memory management", "Garbage collector"],
              ["Strict static typing", "Dynamic typing"],
              ["No native OOP", "Built-in OOP"],
              ["Direct memory access", "Memory abstraction"],
              ["~100x faster (low-level ops)", "Higher development productivity"],
            ].map(([c, py]) => (
              <tr
                key={c}
                className="border-b border-black/5 dark:border-white/5"
              >
                <td className="py-1.5 pr-4">
                  <code className="bg-black/5 dark:bg-white/5 px-1.5 rounded text-xs">
                    {c}
                  </code>
                </td>
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
      <BlogH2>Variables and data types</BlogH2>
      <BlogP>
        In C you must declare the type of each variable before using it. The
        compiler reserves exactly the amount of memory needed for each type.
      </BlogP>

      <BlogH3>Primitive types</BlogH3>
      <BlogCode>{`/* INTEGERS */
char    c  = 'A';          /* 1 byte  — ASCII; also used as small integer */
short   s  = 32767;        /* 2 bytes — range: -32768 to 32767           */
int     i  = 2147483647;   /* 4 bytes — the default integer type          */
long    l  = 2147483647L;  /* 4-8 bytes (platform dependent)              */
long long ll = 9223372036854775807LL; /* guaranteed 8 bytes            */

/* Signed and unsigned */
unsigned int  pos  = 4294967295U;   /* 0 to 2^32-1  */
unsigned char byte = 255;           /* 0 to 255      */

/* FLOATING POINT */
float  f  = 3.14f;                  /* 4 bytes, ~7 significant decimals  */
double d  = 3.14159265358979;       /* 8 bytes, ~15 significant decimals */
long double ld = 3.14159265358979L; /* 10-16 bytes (varies by platform)  */

/* VOID */
void function(void);   /* no parameters */
void *ptr;             /* generic pointer */`}</BlogCode>

      <BlogH3>Sizes with sizeof</BlogH3>
      <BlogCode>{`#include <stdio.h>
int main(void) {
    printf("char:       %zu bytes\\n", sizeof(char));
    printf("int:        %zu bytes\\n", sizeof(int));
    printf("long long:  %zu bytes\\n", sizeof(long long));
    printf("float:      %zu bytes\\n", sizeof(float));
    printf("double:     %zu bytes\\n", sizeof(double));
    printf("pointer:    %zu bytes\\n", sizeof(void *));
    return 0;
}
/* Typical output (x86-64):
   char:       1 bytes
   int:        4 bytes
   long long:  8 bytes
   float:      4 bytes
   double:     8 bytes
   pointer:    8 bytes */`}</BlogCode>

      <BlogH3>Overflow — silent danger!</BlogH3>
      <BlogP>
        If a value exceeds its type's range, <strong>overflow</strong> occurs.
        In signed types, the behavior is <em>undefined</em> in C. In
        unsigned types, it wraps around (modulo 2^N).
      </BlogP>
      <BlogCode>{`#include <stdio.h>
int main(void) {
    unsigned char a = 255;
    a++;                    /* 256 doesn't fit in 1 unsigned byte → 0 */
    printf("%d\\n", a);     /* 0 */

    /* Check overflow before adding */
    int b = 2147483647;     /* INT_MAX */
    if (b < 2147483647) {   /* always check beforehand */
        b++;
    }
    return 0;
}`}</BlogCode>

      <BlogH3>Constants and literals</BlogH3>
      <BlogCode>{`const int MAX = 100;           /* typed constant */
#define PI 3.14159             /* preprocessor constant */

/* Literals with bases */
int hex  = 0xFF;               /* hexadecimal = 255 */
int oct  = 0377;               /* octal = 255 */
int bin  = 0b11111111;         /* binary = 255 (GCC, not C standard) */

/* Enumerations */
enum Day { MON=1, TUE, WED, THU, FRI, SAT, SUN };
enum Day today = WED;            /* today = 3 */`}</BlogCode>

      <BlogH3>Type conversions</BlogH3>
      <BlogCode>{`int   a = 7, b = 2;
/* Integer division — result: 3, not 3.5 */
int   res1 = a / b;
/* Explicit cast for floating point */
double res2 = (double)a / b;   /* 3.5 */

/* Implicit conversion — int is "promoted" to double */
double res3 = a / 2.0;         /* 3.5 */

/* Truncation when converting double → int */
int truncated = (int)3.99;      /* 3 */`}</BlogCode>

      <BlogCallout type="warn">
        When converting <code>double</code> to <code>int</code>, C{" "}
        <strong>truncates</strong> (does not round). Use <code>round()</code> from{" "}
        <code>&lt;math.h&gt;</code> if you need rounding.
      </BlogCallout>
    </>
  );
}

function SOperadores() {
  return (
    <>
      <BlogH2>Operators</BlogH2>
      <BlogH3>Arithmetic</BlogH3>
      <BlogCode>{`int a = 10, b = 3;
printf("%d\\n", a + b);   /* 13 — addition        */
printf("%d\\n", a - b);   /* 7  — subtraction     */
printf("%d\\n", a * b);   /* 30 — multiplication  */
printf("%d\\n", a / b);   /* 3  — integer division */
printf("%d\\n", a % b);   /* 1  — remainder (modulo) */

/* Increment and decrement */
int c = 5;
printf("%d\\n", c++);     /* 5 — prints BEFORE incrementing */
printf("%d\\n", c);       /* 6 */
printf("%d\\n", ++c);     /* 7 — increments BEFORE printing */
printf("%d\\n", c--);     /* 7 — prints BEFORE decrementing */`}</BlogCode>

      <BlogH3>Relational and logical</BlogH3>
      <BlogCode>{`/* Relational — return 1 (true) or 0 (false) */
printf("%d\\n", 5 == 5);   /* 1 */
printf("%d\\n", 5 != 4);   /* 1 */
printf("%d\\n", 3 >  2);   /* 1 */
printf("%d\\n", 2 >= 2);   /* 1 */
printf("%d\\n", 1 <  0);   /* 0 */

/* Logical */
int x = 5, y = 10;
printf("%d\\n", x > 0 && y > 0);   /* AND: 1 */
printf("%d\\n", x < 0 || y > 0);   /* OR:  1 */
printf("%d\\n", !(x > 0));          /* NOT: 0 */`}</BlogCode>

      <BlogH3>Bitwise</BlogH3>
      <BlogP>
        Bitwise operators work directly on the bits of integers. They are
        fundamental in systems programming, networking, and hardware.
      </BlogP>
      <BlogCode>{`unsigned int a = 0b1010;   /* 10 in decimal */
unsigned int b = 0b1100;   /* 12 in decimal */

printf("%u\\n", a & b);    /* AND:  0b1000 = 8  — 1 if BOTH bits are 1 */
printf("%u\\n", a | b);    /* OR:   0b1110 = 14 — 1 if AT LEAST ONE bit is 1 */
printf("%u\\n", a ^ b);    /* XOR:  0b0110 = 6  — 1 if bits are DIFFERENT */
printf("%u\\n", ~a);       /* NOT:  2's complement (all bits flipped) */
printf("%u\\n", a << 1);   /* LEFT SHIFT:  0b10100 = 20 (equivalent to *2) */
printf("%u\\n", a >> 1);   /* RIGHT SHIFT: 0b0101  = 5  (equivalent to /2) */

/* Useful trick — set, clear, and check individual bits */
unsigned int flags = 0;
flags |=  (1 << 3);        /* Set bit 3:   flags = 0b00001000 */
flags &= ~(1 << 3);        /* Clear bit 3 */
int active = (flags >> 3) & 1; /* Read bit 3 */`}</BlogCode>

      <BlogH3>Compound assignment</BlogH3>
      <BlogCode>{`int n = 10;
n += 5;    /* n = 15  — equivalent to n = n + 5 */
n -= 3;    /* n = 12 */
n *= 2;    /* n = 24 */
n /= 4;    /* n = 6  */
n %= 4;    /* n = 2  */
n <<= 2;   /* n = 8  */
n >>= 1;   /* n = 4  */
n &= 3;    /* n = 0  */
n |= 7;    /* n = 7  */
n ^= 5;    /* n = 2  */`}</BlogCode>

      <BlogH3>Ternary and sizeof</BlogH3>
      <BlogCode>{`int x = 15, y = 20;
int max = (x > y) ? x : y;     /* 20 — equivalent to if/else in one line */

/* sizeof returns the byte size of a type or expression */
printf("%zu\\n", sizeof(int));      /* 4 */
printf("%zu\\n", sizeof(max));    /* 4 */`}</BlogCode>

      <BlogCallout type="tip">
        <strong>Operator precedence</strong> (highest to lowest):{" "}
        <code>() [] -&gt; .</code> → <code>! ~ ++ -- (cast) *</code> →{" "}
        <code>* / %</code> → <code>+ -</code> → <code>&lt;&lt; &gt;&gt;</code> →{" "}
        <code>&lt; &gt; &lt;= &gt;=</code> → <code>== !=</code> →{" "}
        <code>&amp;</code> → <code>^</code> → <code>|</code> →{" "}
        <code>&amp;&amp;</code> → <code>||</code> → <code>?:</code> →{" "}
        <code>= += …</code>. When in doubt, use parentheses.
      </BlogCallout>
    </>
  );
}

function SFlujo() {
  return (
    <>
      <BlogH2>Control flow</BlogH2>
      <BlogH3>if / else if / else</BlogH3>
      <BlogCode>{`#include <stdio.h>
int main(void) {
    int grade = 75;

    if (grade >= 90) {
        printf("Excellent\\n");
    } else if (grade >= 70) {
        printf("Good\\n");
    } else if (grade >= 50) {
        printf("Pass\\n");
    } else {
        printf("Fail\\n");
    }
    return 0;
}`}</BlogCode>

      <BlogH3>switch</BlogH3>
      <BlogCode>{`int day = 3;
switch (day) {
    case 1: printf("Monday\\n");    break;
    case 2: printf("Tuesday\\n");   break;
    case 3: printf("Wednesday\\n"); break;
    case 4: printf("Thursday\\n");  break;
    case 5: printf("Friday\\n");    break;
    case 6:
    case 7: printf("Weekend\\n");   break;  /* intentional fall-through */
    default: printf("Invalid day\\n");
}
/* IMPORTANT! Without break, execution "falls through" to the next case. */`}</BlogCode>

      <BlogH3>while</BlogH3>
      <BlogCode>{`int i = 1, sum = 0;
while (i <= 100) {
    sum += i;
    i++;
}
printf("Sum 1..100 = %d\\n", sum);   /* 5050 */`}</BlogCode>

      <BlogH3>do…while</BlogH3>
      <BlogCode>{`/* Executes AT LEAST once */
int n;
do {
    printf("Enter a number between 1 and 10: ");
    scanf("%d", &n);
} while (n < 1 || n > 10);
printf("You chose: %d\\n", n);`}</BlogCode>

      <BlogH3>for</BlogH3>
      <BlogCode>{`/* for (initialization; condition; update) */
for (int i = 0; i < 10; i++) {
    printf("%d ", i);
}
/* Output: 0 1 2 3 4 5 6 7 8 9 */

/* Infinite loop with break */
int count = 0;
for (;;) {
    if (++count >= 5) break;
}

/* Multiple variables */
for (int i = 0, j = 10; i < j; i++, j--) {
    printf("i=%d j=%d\\n", i, j);
}`}</BlogCode>

      <BlogH3>break, continue, and goto</BlogH3>
      <BlogCode>{`/* break — exits the nearest loop */
for (int i = 0; i < 10; i++) {
    if (i == 5) break;
    printf("%d ", i);   /* 0 1 2 3 4 */
}

/* continue — skips to the next iteration */
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) continue;
    printf("%d ", i);   /* 1 3 5 7 9 — only odds */
}

/* goto — use sparingly, only for exiting nested loops */
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        if (i == 2 && j == 3) goto loop_end;
    }
}
loop_end:
printf("Exited\\n");`}</BlogCode>

      <BlogCallout type="tip">
        Avoid <code>goto</code> in general code. Its only accepted use is
        exiting deeply nested loops when <code>break</code> isn't enough.
      </BlogCallout>
    </>
  );
}

function SFunciones() {
  return (
    <>
      <BlogH2>Functions</BlogH2>
      <BlogH3>Declaration, definition, and call</BlogH3>
      <BlogCode>{`#include <stdio.h>

/* Prototype (declaration) — needed if the function is AFTER main */
int sum(int a, int b);
double power(double base, int exp);

int main(void) {
    printf("%d\\n", sum(3, 4));         /* 7 */
    printf("%.2f\\n", power(2, 10));   /* 1024.00 */
    return 0;
}

/* Definition */
int sum(int a, int b) {
    return a + b;
}

double power(double base, int exp) {
    double result = 1.0;
    for (int i = 0; i < exp; i++) result *= base;
    return result;
}`}</BlogCode>

      <BlogH3>Pass by value vs pass by reference</BlogH3>
      <BlogCode>{`/* Pass by value — the parameter is a COPY */
void double_value(int n) {
    n *= 2;   /* only modifies the local copy */
}

/* Pass by reference (via pointer) — modifies the original */
void double_ref(int *n) {
    *n *= 2;  /* dereferences the pointer to modify the original */
}

int main(void) {
    int x = 5;
    double_value(x);     printf("%d\\n", x);   /* 5  — unchanged */
    double_ref(&x);      printf("%d\\n", x);   /* 10 — modified */
    return 0;
}

/* Returning multiple values with pointers */
void min_max(int arr[], int n, int *min, int *max) {
    *min = *max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < *min) *min = arr[i];
        if (arr[i] > *max) *max = arr[i];
    }
}

int main(void) {
    int data[] = {3, 1, 4, 1, 5, 9, 2, 6};
    int mn, mx;
    min_max(data, 8, &mn, &mx);
    printf("Min=%d Max=%d\\n", mn, mx);   /* Min=1 Max=9 */
    return 0;
}`}</BlogCode>

      <BlogH3>Scope</BlogH3>
      <BlogCode>{`int global = 100;   /* visible throughout the file */

void function(void) {
    int local = 10;    /* only in function() */
    {
        int block = 5;   /* only in this block */
        printf("%d %d\\n", local, block);  /* OK */
    }
    /* block is no longer accessible here */
}

/* Static variable: persists between calls, local scope */
int counter(void) {
    static int count = 0;   /* initialized only the first time */
    return ++count;
}

/* 1st call: 1, 2nd: 2, 3rd: 3... */`}</BlogCode>

      <BlogH3>Recursion</BlogH3>
      <BlogCode>{`/* Iterative vs recursive factorial */
long iterative(int n) {
    long res = 1;
    for (int i = 2; i <= n; i++) res *= i;
    return res;
}

long recursive(int n) {
    if (n <= 1) return 1;        /* base case */
    return n * recursive(n - 1); /* recursive call */
}

/* Fibonacci with memoization */
#define MAX_N 100
long memo[MAX_N + 1];

long fib(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = fib(n-1) + fib(n-2);
}

int main(void) {
    for (int i = 0; i <= MAX_N; i++) memo[i] = -1;
    printf("fib(40) = %ld\\n", fib(40));  /* fast */
    return 0;
}`}</BlogCode>

      <BlogCallout type="warn">
        Recursion without a base case causes stack overflow. Always define a
        clear <strong>base case</strong>.
      </BlogCallout>
    </>
  );
}

function SArrays() {
  return (
    <>
      <BlogH2>Arrays and strings</BlogH2>
      <BlogH3>One-dimensional arrays</BlogH3>
      <BlogCode>{`#include <stdio.h>

int main(void) {
    /* Declaration and initialization */
    int nums[5] = {10, 20, 30, 40, 50};
    int zeros[10] = {0};            /* all zeros */
    int auto_size[] = {1, 2, 3};    /* deduced size = 3 */

    /* Access — 0-based */
    printf("%d\\n", nums[0]);        /* 10 */
    printf("%d\\n", nums[4]);        /* 50 */

    /* Calculate length at compile time */
    int len = sizeof(nums) / sizeof(nums[0]);   /* 5 */

    /* Iterate */
    for (int i = 0; i < len; i++) {
        printf("%d ", nums[i]);
    }

    /* 2D Arrays (matrices) */
    int mat[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9},
    };
    printf("\\n%d\\n", mat[1][2]);   /* 6 */
    return 0;
}`}</BlogCode>

      <BlogH3>Memory layout of arrays</BlogH3>
      <BlogP>
        Array elements are stored <strong>contiguously</strong> in memory. If{" "}
        <code>int arr[5]</code> starts at address 0x100, elements are at 0x100,
        0x104, 0x108, 0x10C, 0x110 (on a 4-byte int system).
      </BlogP>
      <BlogCode>{`int arr[5] = {10, 20, 30, 40, 50};
printf("Base address:    %p\\n", (void*)arr);
printf("Address arr[1]:  %p\\n", (void*)&arr[1]);
printf("Address arr[2]:  %p\\n", (void*)&arr[2]);
/* arr[1] = arr + sizeof(int) = arr + 4 bytes */`}</BlogCode>

      <BlogH3>Strings in C</BlogH3>
      <BlogP>
        In C, a string is simply an array of <code>char</code> terminated by
        the null character <code>'\0'</code>. This terminator is mandatory:
        without it, string functions run out of bounds.
      </BlogP>
      <BlogCode>{`#include <stdio.h>
#include <string.h>

int main(void) {
    /* Two ways to declare a string */
    char greeting1[] = "Hello";               /* array with implicit '\\0' */
    char greeting2[] = {'H','e','l','l','o','\\0'}; /* equivalent */
    const char *literal = "world";         /* pointer to string literal (read-only) */

    printf("Length: %zu\\n", strlen(greeting1));  /* 5 (without '\\0') */
    printf("Size:   %zu\\n", sizeof(greeting1));  /* 6 (with '\\0') */

    /* Functions from <string.h> */
    char dest[50];
    strcpy(dest, greeting1);          /* copy — dangerous without limit */
    strncpy(dest, greeting1, 49);     /* safer with limit */
    strcat(dest, " world");           /* concatenate */
    printf("%s\\n", dest);           /* Hello world */

    printf("%d\\n", strcmp("abc", "abc"));  /* 0 — equal */
    printf("%d\\n", strcmp("abc", "abd"));  /* negative — 'c' < 'd' */

    /* Search in string */
    char *pos = strstr(dest, "world");
    if (pos) printf("Found at index: %ld\\n", pos - dest);

    return 0;
}`}</BlogCode>

      <BlogH3>Common string errors</BlogH3>
      <BlogCode>{`/* ❌ DANGER — buffer overflow */
char buf[10];
strcpy(buf, "This string has more than 10 characters");   /* CRASH */

/* ✓ Correct */
char buf2[50];
strncpy(buf2, "This string...", sizeof(buf2) - 1);
buf2[sizeof(buf2) - 1] = '\\0';   /* ensure terminator */

/* ❌ Comparing strings with == (compares pointers, not content) */
if (buf2 == "hello") { /* NEVER like this */ }

/* ✓ Correct */
if (strcmp(buf2, "hello") == 0) { /* OK */ }

/* Reading full lines — fgets is safer than gets */
char line[100];
fgets(line, sizeof(line), stdin);   /* includes '\\n' at end */`}</BlogCode>

      <BlogCallout type="danger">
        Never use <code>gets()</code> — it was removed in C11 because it doesn't
        limit input size. Always use <code>fgets()</code>.
      </BlogCallout>
    </>
  );
}

function SPunteros() {
  return (
    <>
      <BlogH2>Pointers</BlogH2>
      <BlogP>
        A pointer is a variable that stores the{" "}
        <strong>memory address</strong> of another variable. They are the most
        powerful feature of C and the source of many bugs if used incorrectly.
      </BlogP>

      <BlogH3>Memory concept</BlogH3>
      <BlogP>
        RAM can be imagined as a large array of bytes, where each byte has a unique
        address. When you declare <code>int x = 42</code>, the system reserves 4
        consecutive bytes at some address, e.g. 0x7fff5abc, and stores 42 at that
        position.
      </BlogP>

      <BlogH3>Declaration and basic operators</BlogH3>
      <BlogCode>{`#include <stdio.h>

int main(void) {
    int value = 42;
    int *ptr = &value;   /* ptr stores the ADDRESS of value */

    /* & = "address of"       * = "dereference" (value at that address) */
    printf("Value:    %d\\n",  value);          /* 42 */
    printf("Address:  %p\\n", (void*)&value);   /* 0x7fff... */
    printf("ptr:      %p\\n", (void*)ptr);     /* same address */
    printf("*ptr:     %d\\n", *ptr);           /* 42 */

    *ptr = 100;          /* modifies value through the pointer */
    printf("value:    %d\\n",  value);          /* 100 */

    /* Null pointer — doesn't point to anything valid */
    int *null = NULL;
    if (null != NULL) { /* always check before dereferencing */
        printf("%d\\n", *null);
    }
    return 0;
}`}</BlogCode>

      <BlogH3>Pointer arithmetic</BlogH3>
      <BlogCode>{`int arr[] = {10, 20, 30, 40, 50};
int *p = arr;   /* p points to arr[0] */

printf("%d\\n", *p);       /* 10 */
printf("%d\\n", *(p+1));   /* 20 — advances sizeof(int) bytes */
printf("%d\\n", *(p+4));   /* 50 */

p++;   /* p now points to arr[1] */
printf("%d\\n", *p);       /* 20 */

/* Pointer difference */
int *start = arr;
int *end    = arr + 5;
ptrdiff_t dist = end - start;   /* 5 — number of ELEMENTS, not bytes */

/* Iterate array with pointers */
for (int *q = arr; q < arr + 5; q++) {
    printf("%d ", *q);   /* 10 20 30 40 50 */
}`}</BlogCode>

      <BlogH3>Array and pointer relationship</BlogH3>
      <BlogCode>{`int arr[5] = {1, 2, 3, 4, 5};

/* arr (without brackets) IS a pointer to the first element */
printf("%p\\n", (void*)arr);        /* address of arr[0] */
printf("%p\\n", (void*)&arr[0]);    /* same address */

/* These expressions are equivalent */
arr[2]    == *(arr + 2)   /* index access = pointer arithmetic */
p[1]      == *(p + 1)

/* IMPORTANT DIFFERENCE:
   - arr is a constant (you cannot do arr++)
   - int *p = arr; p is a variable (you can do p++) */`}</BlogCode>

      <BlogH3>Pointers to pointers</BlogH3>
      <BlogCode>{`int   n   = 5;
int  *p   = &n;
int **pp  = &p;    /* pointer to pointer */

printf("%d\\n", **pp);       /* 5 */

**pp = 99;
printf("%d\\n", n);           /* 99 — modified two levels up */

/* Practical use: passing a pointer we want to modify */
void assign(int **dest, int *src) {
    *dest = src;   /* modifies the original pointer */
}`}</BlogCode>

      <BlogH3>Pointers and dynamic memory</BlogH3>
      <BlogCode>{`#include <stdlib.h>
#include <stdio.h>

int main(void) {
    int n = 10;

    /* malloc — allocates n*4 bytes without initialization */
    int *arr = malloc(n * sizeof(int));
    if (!arr) {
        fprintf(stderr, "Error: out of memory\\n");
        return 1;
    }

    /* calloc — allocates and initializes everything to 0 */
    int *zeros = calloc(n, sizeof(int));

    /* Use the dynamic array */
    for (int i = 0; i < n; i++) arr[i] = i * i;

    /* realloc — resize */
    arr = realloc(arr, 20 * sizeof(int));
    if (!arr) { /* check! realloc can fail */ }

    /* free — REQUIRED to release memory */
    free(arr);
    free(zeros);
    arr   = NULL;   /* good practice: set to NULL after free */
    zeros = NULL;

    return 0;
}`}</BlogCode>

      <BlogH3>Critical pointer errors</BlogH3>
      <BlogCode>{`/* ❌ Uninitialized pointer (wild pointer) */
int *p;
*p = 5;          /* undefined behavior — segfault */

/* ❌ Use-after-free */
int *q = malloc(sizeof(int));
free(q);
*q = 10;         /* undefined behavior */

/* ❌ Double free */
free(q);         /* second release — heap corruption */

/* ❌ Buffer overflow */
int buf[5];
buf[10] = 42;    /* writes outside the array */

/* ❌ Returning pointer to local variable */
int *bad(void) {
    int local = 5;
    return &local;   /* local is destroyed when the function returns */
}`}</BlogCode>

      <BlogCallout type="danger">
        Always compile with <code>-fsanitize=address,undefined</code> during
        development. AddressSanitizer detects use-after-free, buffer overflows, and
        other memory errors at runtime.
      </BlogCallout>
    </>
  );
}

function SStructs() {
  return (
    <>
      <BlogH2>Structs</BlogH2>
      <BlogP>
        A <code>struct</code> is a compound data type that groups related
        variables under a single name. They are the basis for creating data
        abstractions in C.
      </BlogP>

      <BlogH3>Creation and basic usage</BlogH3>
      <BlogCode>{`#include <stdio.h>
#include <string.h>

struct Point {
    double x;
    double y;
};

struct Person {
    char   name[50];
    int    age;
    double height;
};

int main(void) {
    /* Initialization */
    struct Point p1 = {3.0, 4.0};
    struct Point p2 = {.x = 1.0, .y = 2.0};   /* designated initializers (C99) */

    /* Access with . */
    printf("p1: (%.1f, %.1f)\\n", p1.x, p1.y);

    struct Person per = {"Adrian", 23, 1.80};
    printf("%s is %d years old\\n", per.name, per.age);

    /* Copy struct (copies all fields) */
    struct Person per2 = per;
    strcpy(per2.name, "Maria");
    printf("%s\\n", per.name);   /* "Adrian" — per was not modified */

    return 0;
}`}</BlogCode>

      <BlogH3>typedef — type alias</BlogH3>
      <BlogCode>{`/* Without typedef — must write "struct" every time */
struct Point p;

/* With typedef */
typedef struct {
    double x;
    double y;
} Point;

Point p = {1.0, 2.0};   /* cleaner */

/* typedef for function pointer */
typedef int (*Comparator)(const void *, const void *);`}</BlogCode>

      <BlogH3>Structs and pointers</BlogH3>
      <BlogCode>{`typedef struct {
    char  name[50];
    int   credits;
    float grade;
} Subject;

/* Pass large struct by pointer (more efficient than copying) */
void show(const Subject *s) {
    printf("%s — %d credits — %.2f\\n", s->name, s->credits, s->grade);
    /*        ↑ operator -> = (*s). */
}

void apply_bonus(Subject *s, float bonus) {
    s->grade += bonus;
    if (s->grade > 10.0f) s->grade = 10.0f;
}

int main(void) {
    Subject prog = {"Programming", 6, 7.5f};
    show(&prog);          /* Programming — 6 credits — 7.50 */
    apply_bonus(&prog, 1.0f);
    show(&prog);          /* Programming — 6 credits — 8.50 */
    return 0;
}`}</BlogCode>

      <BlogH3>Arrays of structs — data lists</BlogH3>
      <BlogCode>{`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    int   id;
    char  name[50];
    float salary;
} Employee;

/* Comparator for qsort */
int cmp_salary(const void *a, const void *b) {
    const Employee *ea = (const Employee *)a;
    const Employee *eb = (const Employee *)b;
    if (ea->salary < eb->salary) return -1;
    if (ea->salary > eb->salary) return  1;
    return 0;
}

int main(void) {
    Employee team[] = {
        {1, "Ana",   45000.0f},
        {2, "Luis",  38000.0f},
        {3, "Carmen", 52000.0f},
    };
    int n = sizeof(team) / sizeof(team[0]);

    qsort(team, n, sizeof(Employee), cmp_salary);

    for (int i = 0; i < n; i++) {
        printf("[%d] %s — %.0f€\\n", team[i].id, team[i].name, team[i].salary);
    }
    return 0;
}`}</BlogCode>

      <BlogH3>Nested structs and recursive struct</BlogH3>
      <BlogCode>{`typedef struct Node {
    int          value;
    struct Node *next;   /* pointer to same type — linked list */
} Node;

Node *new_list(int val) {
    Node *n = malloc(sizeof(Node));
    n->value = val;
    n->next = NULL;
    return n;
}

void insert(Node **list, int val) {
    Node *new = malloc(sizeof(Node));
    new->value = val;
    new->next = *list;
    *list = new;
}

void free_list(Node *list) {
    while (list) {
        Node *temp = list;
        list = list->next;
        free(temp);
    }
}`}</BlogCode>
    </>
  );
}

function SEjercicios() {
  const ejerciciosBasicos = [
    {
      title: "Basic calculator",
      description:
        "Implement a function for each arithmetic operation (+, -, *, /) that takes two doubles and returns the result. Show an operation selection menu.",
      hint: "Use a switch to select the operation. Check that the divisor is not zero.",
      solution: `double divide(double a, double b) {
    if (b == 0.0) {
        fprintf(stderr, "Error: division by zero\\n");
        return 0.0;
    }
    return a / b;
}`,
    },
    {
      title: "Array reversal",
      description:
        "Take an integer array and its size. Reverse it in-place without using an auxiliary array.",
      hint: "Use two indices: one at the start and one at the end. Swap them and move toward the center.",
      solution: `void reverse(int arr[], int n) {
    for (int i = 0, j = n-1; i < j; i++, j--) {
        int tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
}`,
    },
    {
      title: "FizzBuzz",
      description:
        "Print numbers from 1 to 100. For multiples of 3 print 'Fizz', for multiples of 5 print 'Buzz', for multiples of both print 'FizzBuzz'.",
      hint: "Check the FizzBuzz case (multiple of 15) first, then Fizz, then Buzz.",
      solution: `for (int i = 1; i <= 100; i++) {
    if (i % 15 == 0)     printf("FizzBuzz\\n");
    else if (i % 3 == 0) printf("Fizz\\n");
    else if (i % 5 == 0) printf("Buzz\\n");
    else                 printf("%d\\n", i);
}`,
    },
    {
      title: "Sum of digits",
      description:
        "Given a positive integer, calculate the sum of its digits. Example: 1234 → 1+2+3+4 = 10.",
      hint: "Use the modulo operator (%) to extract the last digit and integer division (/) to remove it.",
      solution: `int sum_digits(int n) {
    int sum = 0;
    while (n > 0) {
        sum += n % 10;
        n /= 10;
    }
    return sum;
}`,
    },
    {
      title: "Prime number",
      description:
        "Implement a function that determines if a number is prime. Returns 1 if prime, 0 otherwise.",
      hint: "You only need to check divisors up to the square root of the number.",
      solution: `#include <math.h>
int is_prime(int n) {
    if (n < 2) return 0;
    for (int i = 2; i <= (int)sqrt(n); i++) {
        if (n % i == 0) return 0;
    }
    return 1;
}`,
    },
    {
      title: "Count vowels",
      description:
        "Given a character string, count the number of vowels (a, e, i, o, u, both uppercase and lowercase).",
      hint: "Use strchr() or compare each character against the vowels. Convert to lowercase with tolower() from <ctype.h>.",
      solution: `#include <ctype.h>
int count_vowels(const char *s) {
    int count = 0;
    for (; *s; s++) {
        char c = tolower(*s);
        if (c=='a'||c=='e'||c=='i'||c=='o'||c=='u') count++;
    }
    return count;
}`,
    },
    {
      title: "Palindrome",
      description:
        "Determine if a string is a palindrome (reads the same forwards and backwards). Ignore case and spaces.",
      hint: "Compare the first and last characters, moving toward the center.",
      solution: `#include <string.h>
#include <ctype.h>
int is_palindrome(const char *s) {
    int i = 0, j = strlen(s) - 1;
    while (i < j) {
        if (tolower(s[i]) != tolower(s[j])) return 0;
        i++; j--;
    }
    return 1;
}`,
    },
    {
      title: "Multiplication table",
      description:
        "Print the multiplication table from 1 to 10 in an aligned grid format.",
      hint: "Use printf with fixed field width: printf(\"%4d\", value).",
      solution: `for (int i = 1; i <= 10; i++) {
    for (int j = 1; j <= 10; j++) {
        printf("%4d", i * j);
    }
    printf("\\n");
}`,
    },
    {
      title: "Greatest common divisor",
      description:
        "Implement Euclid's algorithm to calculate the GCD of two integers.",
      hint: "Euclid's algorithm: gcd(a, b) = gcd(b, a % b) while b != 0.",
      solution: `int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}`,
    },
    {
      title: "Binary to decimal",
      description:
        'Convert a binary number represented as a string ("1101") to its decimal value.',
      hint: "Traverse the string left to right. Each position equals 2^(n-1-i).",
      solution: `int bin_to_dec(const char *bin) {
    int result = 0;
    for (; *bin; bin++) {
        result = result * 2 + (*bin - '0');
    }
    return result;
}`,
    },
  ];

  const ejerciciosIntermedios = [
    {
      title: "Insertion sort",
      description:
        "Implement the Insertion Sort algorithm to sort an integer array in ascending order.",
      hint: "For each element, shift larger elements one position to the right and insert it in its correct place.",
      solution: `void insertion_sort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i], j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j+1] = arr[j]; j--;
        }
        arr[j+1] = key;
    }
}`,
    },
    {
      title: "Binary search",
      description:
        "Implement binary search on a sorted array. Return the index of the element or -1 if it doesn't exist.",
      hint: "Keep a range [left, right]. Compare the middle element with the target and reduce the range by half.",
      solution: `int binary_search(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target)  left = mid + 1;
        else                     right = mid - 1;
    }
    return -1;
}`,
    },
    {
      title: "Matrix transpose",
      description:
        "Given a square N×N matrix, compute its transpose in-place (swap rows with columns).",
      hint: "Only iterate over the upper triangle (j > i) and swap arr[i][j] with arr[j][i].",
    },
    {
      title: "Linked list — operations",
      description:
        "Implement a singly linked list with: insert at end, search by value, delete by value, and display all.",
      hint: "You'll typically need three pointers: previous, current, new. Be careful when deleting the head.",
    },
    {
      title: "Stack with array",
      description:
        "Implement a stack (LIFO) using a static array. Operations: push, pop, peek, isEmpty.",
      hint: "Use a 'top' variable that starts at -1. Push increments top, pop decrements it.",
      solution: `#define MAX 100
typedef struct { int data[MAX]; int top; } Stack;
void init(Stack *s) { s->top = -1; }
int push(Stack *s, int v) {
    if (s->top >= MAX-1) return 0;
    s->data[++s->top] = v; return 1;
}
int pop(Stack *s, int *v) {
    if (s->top < 0) return 0;
    *v = s->data[s->top--]; return 1;
}`,
    },
    {
      title: "Queue with circular array",
      description:
        "Implement a queue (FIFO) with a circular array. Operations: enqueue, dequeue, isEmpty, isFull.",
      hint: "Use 'front' and 'rear' indices with modulo to create the circular effect.",
    },
    {
      title: "Count words",
      description:
        "Given a text string, count the number of words separated by spaces, tabs, or newlines.",
      hint: "A simple two-state machine: inside/outside a word. Increment the counter when entering a word.",
      solution: `#include <ctype.h>
int count_words(const char *s) {
    int count = 0, in_word = 0;
    for (; *s; s++) {
        if (isspace(*s)) { in_word = 0; }
        else if (!in_word) { count++; in_word = 1; }
    }
    return count;
}`,
    },
    {
      title: "Matrix multiplication",
      description:
        "Multiply two matrices A (M×K) and B (K×N) and store the result in C (M×N).",
      hint: "For C[i][j], sum the products A[i][k]*B[k][j] for k from 0 to K-1.",
    },
    {
      title: "RLE compression",
      description:
        "Implement Run-Length Encoding (RLE): 'AAABBBCC' → '3A3B2C'.",
      hint: "Traverse the string counting consecutive equal characters.",
    },
    {
      title: "Character histogram",
      description:
        "Given a text, show how many times each letter of the alphabet appears (case-insensitive).",
      hint: "Use an array of 26 integers indexed by (tolower(c) - 'a').",
    },
  ];

  const ejerciciosAvanzados = [
    {
      title: "Simple hash table",
      description:
        "Implement a hash table with chaining for key-value pairs (strings → integers). Operations: insert, search, delete.",
      hint: "Hash function: sum of ASCII codes × prime, modulo table size. Each bucket is a linked list of pairs.",
    },
    {
      title: "Binary search tree",
      description:
        "Implement a BST with insert, search, in-order traversal (gives sorted tree), and delete node.",
      hint: "For deletion: case 1 (no children), case 2 (one child), case 3 (two children → replace with smallest from right subtree).",
    },
    {
      title: "Expression parser",
      description:
        "Given a string with a simple mathematical expression (operators +, -, *, /, parentheses), evaluate it respecting operator precedence.",
      hint: "Implement a recursive descent parser. Grammar: expr → term ((+|-) term)*, term → factor ((*|/) factor)*, factor → number | (expr).",
    },
    {
      title: "Simple memory manager",
      description:
        "Implement a basic allocator: a fixed memory region with custom malloc and free that manages blocks with metadata headers.",
      hint: "Each block has a header with size and a 'free' flag. malloc searches the first sufficiently large free block, free marks it free and merges adjacent blocks.",
    },
    {
      title: "Huffman compression",
      description:
        "Implement the Huffman algorithm to compress text: build the frequency tree, generate codes, and encode the text.",
      hint: "Use a priority queue (min-heap) of nodes. Each step: extract the two with lowest frequency, create a parent node, and reinsert.",
    },
  ];

  return (
    <>
      <BlogH2>C Exercises</BlogH2>
      <BlogP>
        Practice with these exercises ordered by difficulty. Try to
        solve them before looking at the hint or solution.
      </BlogP>

      <BlogH3>Basics (1–10)</BlogH3>
      <div className="space-y-2 mb-8">
        {ejerciciosBasicos.map((ej, i) => (
          <ExerciseCard key={i} level="Básico" num={i + 1} {...ej} />
        ))}
      </div>

      <BlogH3>Intermediate (11–20)</BlogH3>
      <div className="space-y-2 mb-8">
        {ejerciciosIntermedios.map((ej, i) => (
          <ExerciseCard key={i} level="Intermedio" num={i + 11} {...ej} />
        ))}
      </div>

      <BlogH3>Advanced (21–25)</BlogH3>
      <div className="space-y-2">
        {ejerciciosAvanzados.map((ej, i) => (
          <ExerciseCard key={i} level="Avanzado" num={i + 21} {...ej} />
        ))}
      </div>

      <BlogCallout type="tip">
        For the advanced exercises, first research the necessary theory
        (trees, compression algorithms) before implementing. Reading others'
        code and understanding structures is as important as writing your own.
      </BlogCallout>
    </>
  );
}
