"use client";
import { useState } from "react";

import {
  BlogCode,
  BlogH2,
  BlogH3,
  BlogP,
  BlogCallout,
} from "@/components/blog/shared";

type SectionId =
  | "intro"
  | "fundamentos"
  | "flujo"
  | "funciones"
  | "estructuras"
  | "poo"
  | "modulos"
  | "automatizacion"
  | "proyecto-final"
  | "ejercicios";

interface SectionDef {
  id: SectionId;
  label: string;
}
const SECTIONS: SectionDef[] = [
  { id: "intro", label: "1. Introducción" },
  { id: "fundamentos", label: "2. Fundamentos" },
  { id: "flujo", label: "3. Control de flujo" },
  { id: "funciones", label: "4. Funciones" },
  { id: "estructuras", label: "5. Estructuras de datos" },
  { id: "poo", label: "6. POO" },
  { id: "modulos", label: "7. Módulos" },
  { id: "automatizacion", label: "8. Automatización" },
  { id: "proyecto-final", label: "Proyecto Final" },
  { id: "ejercicios", label: "Ejercicios" },
];

function SectionIntro() {
  return (
    <>
      <BlogH2>Introducción a Python</BlogH2>
      <BlogP>
        Python es un lenguaje de programación de alto nivel, interpretado y de
        tipado dinámico. Su filosofía enfatiza la legibilidad del código con una
        sintaxis clara y expresiva. Es el lenguaje más utilizado en ciencia de
        datos, IA y automatización.
      </BlogP>
      <BlogCode>{`# Hola mundo en Python
print("¡Hola, mundo!")

# Python es expresivo y conciso
nombre = "Ana"
edad = 28
print(f"Hola, {nombre}. Tienes {edad} años.")

# Tipado dinámico
x = 42        # int
x = "texto"   # ahora es str
x = [1, 2, 3] # ahora es list`}</BlogCode>
      <BlogCallout type="tip">
        Python usa indentación para definir bloques de código. El estándar (PEP
        8) recomienda 4 espacios, nunca tabuladores mezclados con espacios.
      </BlogCallout>
      <BlogH3>Instalación y entornos virtuales</BlogH3>
      <BlogCode>{`# Crear entorno virtual
python -m venv venv

# Activar (Linux/Mac)
source venv/bin/activate

# Activar (Windows)
venv\\Scripts\\activate

# Instalar dependencias
pip install requests pandas

# Guardar dependencias
pip freeze > requirements.txt`}</BlogCode>
    </>
  );
}

function SectionFundamentos() {
  return (
    <>
      <BlogH2>Fundamentos de Python</BlogH2>
      <BlogH3>Variables y tipos</BlogH3>
      <BlogP>
        Python infiere el tipo automáticamente. Puedes usar anotaciones de tipo
        opcionales (PEP 484) para documentar el código sin afectar la ejecución.
      </BlogP>
      <BlogCode>{`# Tipos básicos
entero: int   = 42
flotante: float = 3.14
texto: str    = "Hola"
booleano: bool = True
nulo = None

# Conversión de tipos
numero = int("42")     # "42" -> 42
cadena = str(3.14)     # 3.14 -> "3.14"
lista  = list("abc")   # -> ['a', 'b', 'c']

# Verificar tipo
print(type(entero))    # <class 'int'>
print(isinstance(texto, str))  # True`}</BlogCode>
      <BlogH3>Strings y f-strings</BlogH3>
      <BlogCode>{`nombre = "Python"
version = 3.12

# f-string (recomendado desde Python 3.6)
print(f"Bienvenido a {nombre} {version}")
print(f"2 + 2 = {2 + 2}")
print(f"{'hola':^20}")  # centrado en 20 chars

# Métodos de string
texto = "  Hola Mundo  "
print(texto.strip())       # "Hola Mundo"
print(texto.lower())       # "  hola mundo  "
print(texto.replace("o", "0"))  # "  H0la Mund0  "
print("Python" in texto)  # False`}</BlogCode>
    </>
  );
}

function SectionFlujo() {
  return (
    <>
      <BlogH2>Control de flujo</BlogH2>
      <BlogH3>Condicionales</BlogH3>
      <BlogCode>{`edad = 20
# if / elif / else
if edad < 18:
    print("Menor de edad")
elif edad < 65:
    print("Adulto")
else:
    print("Adulto mayor")

# Expresión condicional (ternario)
categoria = "mayor" if edad >= 18 else "menor"

# match-case (Python 3.10+)
comando = "salir"
match comando:
    case "iniciar":
        print("Iniciando...")
    case "salir" | "exit":
        print("Saliendo...")
    case _:
        print("Comando desconocido")`}</BlogCode>
      <BlogH3>Bucles</BlogH3>
      <BlogCode>{`# for con range
for i in range(5):         # 0,1,2,3,4
    print(i)

for i in range(1, 10, 2): # 1,3,5,7,9
    print(i)

# for sobre iterable
frutas = ["manzana", "pera", "uva"]
for fruta in frutas:
    print(fruta)

# enumerate para índice + valor
for i, fruta in enumerate(frutas, start=1):
    print(f"{i}. {fruta}")

# while con break/continue
n = 0
while True:
    n += 1
    if n % 2 == 0: continue
    if n > 9: break
    print(n)  # 1,3,5,7,9`}</BlogCode>
      <BlogH3>Comprensiones de lista</BlogH3>
      <BlogCode>{`numeros = range(1, 11)

# List comprehension
cuadrados = [n**2 for n in numeros]
pares     = [n for n in numeros if n % 2 == 0]

# Dict comprehension
cuadrados_dict = {n: n**2 for n in range(1, 6)}
# {1:1, 2:4, 3:9, 4:16, 5:25}

# Generator expression (eficiente en memoria)
suma = sum(n**2 for n in range(1_000_000))`}</BlogCode>
      <BlogCallout type="tip">
        Las comprensiones de lista son más rápidas y pythonicas que los bucles
        for equivalentes para construir listas.
      </BlogCallout>
    </>
  );
}

function SectionFunciones() {
  return (
    <>
      <BlogH2>Funciones</BlogH2>
      <BlogH3>Definición y parámetros</BlogH3>
      <BlogCode>{`def saludar(nombre: str, saludo: str = "Hola") -> str:
    """Devuelve un saludo personalizado."""
    return f"{saludo}, {nombre}!"

# Parámetros posicionales y nombrados
print(saludar("Ana"))                  # "Hola, Ana!"
print(saludar("Bob", saludo="Buenos días"))

# *args y **kwargs
def sumar(*nums: float) -> float:
    return sum(nums)

def crear_usuario(**datos):
    return datos

print(sumar(1, 2, 3, 4, 5))          # 15
print(crear_usuario(nombre="Ana", edad=28))`}</BlogCode>
      <BlogH3>Funciones lambda y de orden superior</BlogH3>
      <BlogCode>{`# Lambda (función anónima de una línea)
cuadrado = lambda x: x ** 2
doble    = lambda x: x * 2

# Funciones de orden superior
from functools import reduce

nums = [1, 2, 3, 4, 5]
print(list(map(doble, nums)))          # [2,4,6,8,10]
print(list(filter(lambda x: x>2, nums)))  # [3,4,5]
print(reduce(lambda a, b: a + b, nums))   # 15

# Ordenar por clave
personas = [{"nombre": "Ana", "edad": 28}, {"nombre": "Bob", "edad": 22}]
ordenadas = sorted(personas, key=lambda p: p["edad"])
print(ordenadas[0]["nombre"])  # "Bob"`}</BlogCode>
      <BlogH3>Decoradores</BlogH3>
      <BlogCode>{`import time

def medir_tiempo(func):
    """Decorador que mide el tiempo de ejecución."""
    def wrapper(*args, **kwargs):
        inicio = time.time()
        resultado = func(*args, **kwargs)
        fin = time.time()
        print(f"{func.__name__} tardó {fin-inicio:.4f}s")
        return resultado
    return wrapper

@medir_tiempo
def operacion_lenta():
    time.sleep(0.1)
    return "listo"

operacion_lenta()  # "operacion_lenta tardó 0.1003s"`}</BlogCode>
    </>
  );
}

function SectionEstructuras() {
  return (
    <>
      <BlogH2>Estructuras de datos</BlogH2>
      <BlogH3>Listas y tuplas</BlogH3>
      <BlogCode>{`# Lista (mutable)
lista = [1, 2, 3]
lista.append(4)
lista.insert(0, 0)
lista.pop()         # elimina el último
lista.sort(reverse=True)

# Slicing
nums = [0, 1, 2, 3, 4, 5]
print(nums[1:4])    # [1, 2, 3]
print(nums[::2])    # [0, 2, 4]  (cada 2)
print(nums[::-1])   # [5, 4, 3, 2, 1, 0]  (invertida)

# Tupla (inmutable)
punto = (3.0, 4.0)
x, y = punto        # unpacking
distancia = (x**2 + y**2) ** 0.5`}</BlogCode>
      <BlogH3>Diccionarios y conjuntos</BlogH3>
      <BlogCode>{`# Diccionario
usuario = {"nombre": "Ana", "edad": 28, "activo": True}
usuario["email"] = "ana@ejemplo.com"
nombre = usuario.get("nombre", "Anónimo")

# Iterar diccionario
for clave, valor in usuario.items():
    print(f"{clave}: {valor}")

# Dict con defaultdict
from collections import defaultdict
conteo = defaultdict(int)
for letra in "programacion":
    conteo[letra] += 1

# Set (conjunto, sin duplicados)
conjunto_a = {1, 2, 3, 4}
conjunto_b = {3, 4, 5, 6}
print(conjunto_a & conjunto_b)  # {3, 4}  intersección
print(conjunto_a | conjunto_b)  # {1,2,3,4,5,6}  unión
print(conjunto_a - conjunto_b)  # {1, 2}  diferencia`}</BlogCode>
    </>
  );
}

function SectionPoo() {
  return (
    <>
      <BlogH2>Programación Orientada a Objetos</BlogH2>
      <BlogH3>Clases y objetos</BlogH3>
      <BlogCode>{`class Vehiculo:
    # Atributo de clase (compartido)
    num_ruedas_defecto = 4

    def __init__(self, marca: str, modelo: str, año: int):
        # Atributos de instancia
        self.marca  = marca
        self.modelo = modelo
        self.año    = año
        self._velocidad = 0  # convención: "privado"

    def acelerar(self, kmh: float) -> None:
        self._velocidad += kmh

    def frenar(self, kmh: float) -> None:
        self._velocidad = max(0, self._velocidad - kmh)

    @property
    def velocidad(self) -> float:
        return self._velocidad

    def __repr__(self) -> str:
        return f"Vehiculo({self.marca} {self.modelo}, {self.año})"

coche = Vehiculo("Toyota", "Corolla", 2023)
coche.acelerar(60)
print(coche.velocidad)  # 60
print(coche)`}</BlogCode>
      <BlogH3>Herencia y polimorfismo</BlogH3>
      <BlogCode>{`class Animal:
    def __init__(self, nombre: str):
        self.nombre = nombre

    def hablar(self) -> str:
        raise NotImplementedError

    def __str__(self) -> str:
        return f"{type(self).__name__}({self.nombre})"

class Perro(Animal):
    def hablar(self) -> str:
        return f"{self.nombre} dice: ¡Guau!"

class Gato(Animal):
    def hablar(self) -> str:
        return f"{self.nombre} dice: ¡Miau!"

animales: list[Animal] = [Perro("Rex"), Gato("Misi"), Perro("Luna")]

# Polimorfismo
for animal in animales:
    print(animal.hablar())`}</BlogCode>
      <BlogCallout type="tip">
        En Python se prefieren los protocolos (duck typing) y las clases
        abstractas del módulo <code>abc</code> sobre las interfaces rígidas de
        otros lenguajes.
      </BlogCallout>
    </>
  );
}

function SectionModulos() {
  return (
    <>
      <BlogH2>Módulos y biblioteca estándar</BlogH2>
      <BlogH3>Imports</BlogH3>
      <BlogCode>{`# Import completo
import os
import sys

# Import específico
from pathlib import Path
from datetime import datetime, timedelta

# Import con alias
import json as j

# Módulos útiles de stdlib
print(os.getcwd())             # directorio actual
print(sys.version)             # versión de Python
print(datetime.now())          # fecha y hora actual

ahora = datetime.now()
manana = ahora + timedelta(days=1)
print(manana.strftime("%d/%m/%Y"))`}</BlogCode>
      <BlogH3>pathlib y json</BlogH3>
      <BlogCode>{`from pathlib import Path
import json

# Trabajar con rutas
ruta = Path("datos") / "config.json"
ruta.parent.mkdir(parents=True, exist_ok=True)

# Escribir JSON
config = {"host": "localhost", "port": 5432, "debug": True}
ruta.write_text(json.dumps(config, indent=2))

# Leer JSON
datos = json.loads(ruta.read_text())
print(datos["port"])  # 5432

# Listar archivos
for archivo in Path(".").glob("**/*.py"):
    print(archivo)`}</BlogCode>
    </>
  );
}

function SectionAutomatizacion() {
  return (
    <>
      <BlogH2>Automatización con Python</BlogH2>
      <BlogH3>Scripts y argumentos</BlogH3>
      <BlogCode>{`import argparse
import sys

def main():
    parser = argparse.ArgumentParser(description="Herramienta de procesamiento")
    parser.add_argument("archivo", help="Ruta del archivo a procesar")
    parser.add_argument("-v", "--verbose", action="store_true")
    parser.add_argument("-o", "--output", default="resultado.txt")
    args = parser.parse_args()

    if args.verbose:
        print(f"Procesando: {args.archivo}")

    # Procesar archivo...
    print(f"Resultado guardado en {args.output}")

if __name__ == "__main__":
    main()`}</BlogCode>
      <BlogH3>Manipulación de archivos</BlogH3>
      <BlogCode>{`from pathlib import Path
import csv, json

# Leer CSV
with open("datos.csv", newline="", encoding="utf-8") as f:
    lector = csv.DictReader(f)
    filas = list(lector)

# Procesar datos
totales = {}
for fila in filas:
    cat = fila.get("categoria", "sin_cat")
    totales[cat] = totales.get(cat, 0) + float(fila.get("monto", 0))

# Escribir resultado
with open("totales.json", "w") as f:
    json.dump(totales, f, indent=2, ensure_ascii=False)

print("Categorías encontradas:", list(totales.keys()))`}</BlogCode>
    </>
  );
}

function SectionProyecto() {
  return (
    <>
      <BlogH2>Proyecto Final: Analizador de CSV</BlogH2>
      <BlogP>
        Script que lee un archivo CSV de ventas y genera estadísticas
        detalladas: total por categoría, producto más vendido, media y mediana
        de precios, y un resumen exportado a JSON.
      </BlogP>
      <BlogCode>{`# analizador_csv.py
import csv
import json
import statistics
from pathlib import Path
from collections import defaultdict
from argparse import ArgumentParser


def cargar_csv(ruta: str) -> list[dict]:
    """Carga un CSV y devuelve lista de diccionarios."""
    with open(ruta, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def analizar(filas: list[dict]) -> dict:
    """Genera estadísticas a partir de las filas."""
    ventas_por_cat  = defaultdict(float)
    unidades_por_prod = defaultdict(int)
    todos_precios   = []

    for fila in filas:
        try:
            precio    = float(fila["precio"])
            cantidad  = int(fila["cantidad"])
            categoria = fila["categoria"]
            producto  = fila["producto"]

            ventas_por_cat[categoria]    += precio * cantidad
            unidades_por_prod[producto]  += cantidad
            todos_precios.append(precio)
        except (KeyError, ValueError) as e:
            print(f"Fila inválida ignorada: {e}")

    if not todos_precios:
        return {"error": "No hay datos válidos"}

    producto_top = max(unidades_por_prod, key=unidades_por_prod.get)

    return {
        "total_registros":    len(filas),
        "ventas_por_categoria": dict(ventas_por_cat),
        "producto_mas_vendido": {
            "nombre":   producto_top,
            "unidades": unidades_por_prod[producto_top],
        },
        "estadisticas_precio": {
            "media":   round(statistics.mean(todos_precios), 2),
            "mediana": round(statistics.median(todos_precios), 2),
            "min":     min(todos_precios),
            "max":     max(todos_precios),
            "stdev":   round(statistics.stdev(todos_precios), 2) if len(todos_precios) > 1 else 0,
        },
    }


def imprimir_resumen(stats: dict) -> None:
    print("\\n=== RESUMEN DE VENTAS ===")
    print(f"Registros procesados: {stats['total_registros']}")
    print("\\nVentas por categoría:")
    for cat, total in stats["ventas_por_categoria"].items():
        print(f"  {cat:<20} {total:>10.2f} €")
    top = stats["producto_mas_vendido"]
    print(f"\\nProducto más vendido: {top['nombre']} ({top['unidades']} uds.)")
    p = stats["estadisticas_precio"]
    print(f"\\nPrecios — media: {p['media']}€, mediana: {p['mediana']}€")
    print(f"          min: {p['min']}€, max: {p['max']}€, σ: {p['stdev']}€")


def main():
    parser = ArgumentParser(description="Analizador de CSV de ventas")
    parser.add_argument("archivo", help="Ruta al archivo CSV")
    parser.add_argument("-o", "--output", default="estadisticas.json")
    args = parser.parse_args()

    ruta = Path(args.archivo)
    if not ruta.exists():
        print(f"Error: no se encuentra '{ruta}'")
        return

    filas = cargar_csv(str(ruta))
    stats = analizar(filas)
    imprimir_resumen(stats)

    Path(args.output).write_text(json.dumps(stats, indent=2, ensure_ascii=False))
    print(f"\\nEstadísticas exportadas a {args.output}")


if __name__ == "__main__":
    main()`}</BlogCode>
      <BlogCode>{`# ventas.csv (ejemplo de datos de entrada)
producto,categoria,precio,cantidad
Manzana,fruta,1.20,50
Pan de molde,panadería,1.80,30
Pera,fruta,1.50,40
Baguette,panadería,0.90,60
Naranja,fruta,0.80,80
Croissant,panadería,1.20,25

# Ejecutar:
# python analizador_csv.py ventas.csv -o resultado.json`}</BlogCode>
      <BlogCallout type="tip">
        Añade <code>pandas</code> para análisis de datos más avanzados.{" "}
        <code>df = pd.read_csv("ventas.csv")</code> carga el CSV como un
        DataFrame con funciones estadísticas integradas.
      </BlogCallout>
    </>
  );
}

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
          <span className="w-6 h-6 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
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
            <div className="bg-sky-50 dark:bg-sky-950/20 rounded-xl px-3 py-2 text-xs text-sky-800 dark:text-sky-300">
              <strong>Pista:</strong> {hint}
            </div>
          )}
          {solution && <BlogCode>{solution}</BlogCode>}
        </div>
      )}
    </div>
  );
}

function SEjercicios() {
  return (
    <>
      <BlogH2>Ejercicios de Python</BlogH2>
      <BlogP>
        Pon en práctica lo aprendido con estos ejercicios progresivos. Intenta
        resolverlos antes de ver la solución.
      </BlogP>
      <div className="space-y-3 mt-6">
        <ExerciseCard
          description="Escribe una función fizzbuzz(n) que imprima los números del 1 al n. Para múltiplos de 3 imprime 'Fizz', de 5 'Buzz', y de ambos 'FizzBuzz'."
          hint="Comprueba primero el caso divisible por 15 (o por 3 y 5 simultáneamente)."
          level="Básico"
          num={1}
          solution={`def fizzbuzz(n):
    for i in range(1, n + 1):
        if i % 15 == 0:
            print("FizzBuzz")
        elif i % 3 == 0:
            print("Fizz")
        elif i % 5 == 0:
            print("Buzz")
        else:
            print(i)

fizzbuzz(20)`}
          title="FizzBuzz mejorado"
        />

        <ExerciseCard
          description="Crea una función que reciba una lista que puede contener otras listas (anidadas) y devuelva una lista plana con todos los elementos."
          hint="Usa recursión: si el elemento es una lista, llama a la función de nuevo sobre él."
          level="Básico"
          num={2}
          solution={`def aplanar(lista):
    resultado = []
    for elemento in lista:
        if isinstance(elemento, list):
            resultado.extend(aplanar(elemento))
        else:
            resultado.append(elemento)
    return resultado

print(aplanar([1, [2, 3], [4, [5, 6]], 7]))
# [1, 2, 3, 4, 5, 6, 7]`}
          title="Aplanar lista anidada"
        />

        <ExerciseCard
          description="Implementa una clase Pila con métodos apilar(item), desapilar(), ver_tope() y esta_vacia(). Lanza ValueError si se desapila de una pila vacía."
          hint="Usa una lista interna y append/pop para las operaciones."
          level="Intermedio"
          num={3}
          solution={`class Pila:
    def __init__(self):
        self._datos = []

    def apilar(self, item):
        self._datos.append(item)

    def desapilar(self):
        if self.esta_vacia():
            raise ValueError("La pila está vacía")
        return self._datos.pop()

    def ver_tope(self):
        if self.esta_vacia():
            return None
        return self._datos[-1]

    def esta_vacia(self):
        return len(self._datos) == 0

p = Pila()
p.apilar(1)
p.apilar(2)
p.apilar(3)
print(p.desapilar())  # 3
print(p.ver_tope())   # 2`}
          title="Clase Pila (Stack)"
        />

        <ExerciseCard
          description="Implementa un decorador @cache_simple que almacene en memoria los resultados de una función para evitar cálculos repetidos (memoization)."
          hint="Usa un diccionario como caché. La clave pueden ser los args de la función."
          level="Intermedio"
          num={4}
          solution={`def cache_simple(func):
    memoria = {}
    def wrapper(*args):
        if args not in memoria:
            memoria[args] = func(*args)
        return memoria[args]
    return wrapper

@cache_simple
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(35))  # 9227465 (instantáneo con caché)`}
          title="Decorador de caché"
        />

        <ExerciseCard
          description="Crea una función que lea un string CSV (con cabecera), lo convierta a una lista de dicts y permita filtrar por columna. Usa solo la librería estándar."
          hint="Usa csv.DictReader con io.StringIO para parsear el string sin leer archivos."
          level="Avanzado"
          num={5}
          solution={`import csv
import io

def analizar_csv(texto_csv, filtro=None):
    reader = csv.DictReader(io.StringIO(texto_csv))
    filas = list(reader)
    if filtro:
        columna, valor = filtro
        filas = [f for f in filas if f.get(columna) == valor]
    return filas

csv_data = """nombre,edad,ciudad
Ana,28,Madrid
Luis,34,Barcelona
Sara,28,Madrid"""

todos = analizar_csv(csv_data)
madrid = analizar_csv(csv_data, filtro=("ciudad", "Madrid"))
print(len(todos))   # 3
print(len(madrid))  # 2`}
          title="Analizador de CSV"
        />
      </div>
    </>
  );
}

export default function PythonContent() {
  const [active, setActive] = useState<SectionId>(SECTIONS[0].id);

  const renderSection = () => {
    switch (active) {
      case "intro":
        return <SectionIntro />;
      case "fundamentos":
        return <SectionFundamentos />;
      case "flujo":
        return <SectionFlujo />;
      case "funciones":
        return <SectionFunciones />;
      case "estructuras":
        return <SectionEstructuras />;
      case "poo":
        return <SectionPoo />;
      case "modulos":
        return <SectionModulos />;
      case "automatizacion":
        return <SectionAutomatizacion />;
      case "proyecto-final":
        return <SectionProyecto />;
      case "ejercicios":
        return <SEjercicios />;
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
