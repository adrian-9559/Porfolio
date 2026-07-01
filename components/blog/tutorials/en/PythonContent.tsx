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
  { id: "intro", label: "1. Introduction" },
  { id: "fundamentos", label: "2. Fundamentals" },
  { id: "flujo", label: "3. Control flow" },
  { id: "funciones", label: "4. Functions" },
  { id: "estructuras", label: "5. Data structures" },
  { id: "poo", label: "6. OOP" },
  { id: "modulos", label: "7. Modules" },
  { id: "automatizacion", label: "8. Automation" },
  { id: "proyecto-final", label: "Final Project" },
  { id: "ejercicios", label: "Exercises" },
];

function SectionIntro() {
  return (
    <>
      <BlogH2>Introduction to Python</BlogH2>
      <BlogP>
        Python is a high-level, interpreted, dynamically typed programming
        language. Its philosophy emphasizes code readability with a clear and
        expressive syntax. It is the most used language in data science, AI,
        and automation.
      </BlogP>
      <BlogCode>{`# Hello world in Python
print("Hello, world!")

# Python is expressive and concise
name = "Ana"
age = 28
print(f"Hello, {name}. You are {age} years old.")

# Dynamic typing
x = 42        # int
x = "text"   # now str
x = [1, 2, 3] # now list`}</BlogCode>
      <BlogCallout type="tip">
        Python uses indentation to define code blocks. The standard (PEP
        8) recommends 4 spaces, never mixing tabs with spaces.
      </BlogCallout>
      <BlogH3>Installation and virtual environments</BlogH3>
      <BlogCode>{`# Create virtual environment
python -m venv venv

# Activate (Linux/Mac)
source venv/bin/activate

# Activate (Windows)
venv\Scripts\activate

# Install dependencies
pip install requests pandas

# Save dependencies
pip freeze > requirements.txt`}</BlogCode>
    </>
  );
}

function SectionFundamentos() {
  return (
    <>
      <BlogH2>Python Fundamentals</BlogH2>
      <BlogH3>Variables and types</BlogH3>
      <BlogP>
        Python infers the type automatically. You can use optional type
        annotations (PEP 484) to document the code without affecting execution.
      </BlogP>
      <BlogCode>{`# Basic types
integer: int   = 42
floating: float = 3.14
text: str    = "Hello"
boolean: bool = True
nothing = None

# Type conversion
number = int("42")     # "42" -> 42
string = str(3.14)     # 3.14 -> "3.14"
lst  = list("abc")   # -> ['a', 'b', 'c']

# Check type
print(type(integer))    # <class 'int'>
print(isinstance(text, str))  # True`}</BlogCode>
      <BlogH3>Strings and f-strings</BlogH3>
      <BlogCode>{`name = "Python"
version = 3.12

# f-string (recommended since Python 3.6)
print(f"Welcome to {name} {version}")
print(f"2 + 2 = {2 + 2}")
print(f"{'hello':^20}")  # centered in 20 chars

# String methods
text = "  Hello World  "
print(text.strip())       # "Hello World"
print(text.lower())       # "  hello world  "
print(text.replace("o", "0"))  # "  Hell0 W0rld  "
print("Python" in text)  # False`}</BlogCode>
    </>
  );
}

function SectionFlujo() {
  return (
    <>
      <BlogH2>Control flow</BlogH2>
      <BlogH3>Conditionals</BlogH3>
      <BlogCode>{`age = 20
# if / elif / else
if age < 18:
    print("Minor")
elif age < 65:
    print("Adult")
else:
    print("Senior")

# Conditional expression (ternary)
category = "adult" if age >= 18 else "minor"

# match-case (Python 3.10+)
command = "exit"
match command:
    case "start":
        print("Starting...")
    case "exit" | "quit":
        print("Exiting...")
    case _:
        print("Unknown command")`}</BlogCode>
      <BlogH3>Loops</BlogH3>
      <BlogCode>{`# for with range
for i in range(5):         # 0,1,2,3,4
    print(i)

for i in range(1, 10, 2): # 1,3,5,7,9
    print(i)

# for over iterable
fruits = ["apple", "pear", "grape"]
for fruit in fruits:
    print(fruit)

# enumerate for index + value
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")

# while with break/continue
n = 0
while True:
    n += 1
    if n % 2 == 0: continue
    if n > 9: break
    print(n)  # 1,3,5,7,9`}</BlogCode>
      <BlogH3>List comprehensions</BlogH3>
      <BlogCode>{`numbers = range(1, 11)

# List comprehension
squares = [n**2 for n in numbers]
evens     = [n for n in numbers if n % 2 == 0]

# Dict comprehension
squares_dict = {n: n**2 for n in range(1, 6)}
# {1:1, 2:4, 3:9, 4:16, 5:25}

# Generator expression (memory efficient)
total = sum(n**2 for n in range(1_000_000))`}</BlogCode>
      <BlogCallout type="tip">
        List comprehensions are faster and more pythonic than equivalent for
        loops for building lists.
      </BlogCallout>
    </>
  );
}

function SectionFunciones() {
  return (
    <>
      <BlogH2>Functions</BlogH2>
      <BlogH3>Definition and parameters</BlogH3>
      <BlogCode>{`def greet(name: str, greeting: str = "Hello") -> str:
    """Returns a personalized greeting."""
    return f"{greeting}, {name}!"

# Positional and named parameters
print(greet("Ana"))                  # "Hello, Ana!"
print(greet("Bob", greeting="Good morning"))

# *args and **kwargs
def sum_all(*nums: float) -> float:
    return sum(nums)

def create_user(**data):
    return data

print(sum_all(1, 2, 3, 4, 5))          # 15
print(create_user(name="Ana", age=28))`}</BlogCode>
      <BlogH3>Lambda and higher-order functions</BlogH3>
      <BlogCode>{`# Lambda (one-line anonymous function)
square = lambda x: x ** 2
double    = lambda x: x * 2

# Higher-order functions
from functools import reduce

nums = [1, 2, 3, 4, 5]
print(list(map(double, nums)))          # [2,4,6,8,10]
print(list(filter(lambda x: x>2, nums)))  # [3,4,5]
print(reduce(lambda a, b: a + b, nums))   # 15

# Sort by key
people = [{"name": "Ana", "age": 28}, {"name": "Bob", "age": 22}]
sorted_people = sorted(people, key=lambda p: p["age"])
print(sorted_people[0]["name"])  # "Bob"`}</BlogCode>
      <BlogH3>Decorators</BlogH3>
      <BlogCode>{`import time

def measure_time(func):
    """Decorator that measures execution time."""
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end-start:.4f}s")
        return result
    return wrapper

@measure_time
def slow_operation():
    time.sleep(0.1)
    return "done"

slow_operation()  # "slow_operation took 0.1003s"`}</BlogCode>
    </>
  );
}

function SectionEstructuras() {
  return (
    <>
      <BlogH2>Data structures</BlogH2>
      <BlogH3>Lists and tuples</BlogH3>
      <BlogCode>{`# List (mutable)
lst = [1, 2, 3]
lst.append(4)
lst.insert(0, 0)
lst.pop()         # removes last
lst.sort(reverse=True)

# Slicing
nums = [0, 1, 2, 3, 4, 5]
print(nums[1:4])    # [1, 2, 3]
print(nums[::2])    # [0, 2, 4]  (every 2)
print(nums[::-1])   # [5, 4, 3, 2, 1, 0]  (reversed)

# Tuple (immutable)
point = (3.0, 4.0)
x, y = point        # unpacking
distance = (x**2 + y**2) ** 0.5`}</BlogCode>
      <BlogH3>Dictionaries and sets</BlogH3>
      <BlogCode>{`# Dictionary
user = {"name": "Ana", "age": 28, "active": True}
user["email"] = "ana@example.com"
name = user.get("name", "Anonymous")

# Iterate dictionary
for key, value in user.items():
    print(f"{key}: {value}")

# Dict with defaultdict
from collections import defaultdict
count = defaultdict(int)
for letter in "programming":
    count[letter] += 1

# Set (unique elements)
set_a = {1, 2, 3, 4}
set_b = {3, 4, 5, 6}
print(set_a & set_b)  # {3, 4}  intersection
print(set_a | set_b)  # {1,2,3,4,5,6}  union
print(set_a - set_b)  # {1, 2}  difference`}</BlogCode>
    </>
  );
}

function SectionPoo() {
  return (
    <>
      <BlogH2>Object-Oriented Programming</BlogH2>
      <BlogH3>Classes and objects</BlogH3>
      <BlogCode>{`class Vehicle:
    # Class attribute (shared)
    default_wheels = 4

    def __init__(self, brand: str, model: str, year: int):
        # Instance attributes
        self.brand  = brand
        self.model = model
        self.year    = year
        self._speed = 0  # convention: "private"

    def accelerate(self, kmh: float) -> None:
        self._speed += kmh

    def brake(self, kmh: float) -> None:
        self._speed = max(0, self._speed - kmh)

    @property
    def speed(self) -> float:
        return self._speed

    def __repr__(self) -> str:
        return f"Vehicle({self.brand} {self.model}, {self.year})"

car = Vehicle("Toyota", "Corolla", 2023)
car.accelerate(60)
print(car.speed)  # 60
print(car)`}</BlogCode>
      <BlogH3>Inheritance and polymorphism</BlogH3>
      <BlogCode>{`class Animal:
    def __init__(self, name: str):
        self.name = name

    def speak(self) -> str:
        raise NotImplementedError

    def __str__(self) -> str:
        return f"{type(self).__name__}({self.name})"

class Dog(Animal):
    def speak(self) -> str:
        return f"{self.name} says: Woof!"

class Cat(Animal):
    def speak(self) -> str:
        return f"{self.name} says: Meow!"

animals: list[Animal] = [Dog("Rex"), Cat("Misi"), Dog("Luna")]

# Polymorphism
for animal in animals:
    print(animal.speak())`}</BlogCode>
      <BlogCallout type="tip">
        In Python, protocols (duck typing) and abstract classes from the
        <code>abc</code> module are preferred over rigid interfaces from
        other languages.
      </BlogCallout>
    </>
  );
}

function SectionModulos() {
  return (
    <>
      <BlogH2>Modules and standard library</BlogH2>
      <BlogH3>Imports</BlogH3>
      <BlogCode>{`# Full import
import os
import sys

# Specific import
from pathlib import Path
from datetime import datetime, timedelta

# Import with alias
import json as j

# Useful stdlib modules
print(os.getcwd())             # current directory
print(sys.version)             # Python version
print(datetime.now())          # current date and time

now = datetime.now()
tomorrow = now + timedelta(days=1)
print(tomorrow.strftime("%d/%m/%Y"))`}</BlogCode>
      <BlogH3>pathlib and json</BlogH3>
      <BlogCode>{`from pathlib import Path
import json

# Work with paths
path = Path("data") / "config.json"
path.parent.mkdir(parents=True, exist_ok=True)

# Write JSON
config = {"host": "localhost", "port": 5432, "debug": True}
path.write_text(json.dumps(config, indent=2))

# Read JSON
data = json.loads(path.read_text())
print(data["port"])  # 5432

# List files
for file in Path(".").glob("**/*.py"):
    print(file)`}</BlogCode>
    </>
  );
}

function SectionAutomatizacion() {
  return (
    <>
      <BlogH2>Automation with Python</BlogH2>
      <BlogH3>Scripts and arguments</BlogH3>
      <BlogCode>{`import argparse
import sys

def main():
    parser = argparse.ArgumentParser(description="Processing tool")
    parser.add_argument("file", help="Path to the file to process")
    parser.add_argument("-v", "--verbose", action="store_true")
    parser.add_argument("-o", "--output", default="result.txt")
    args = parser.parse_args()

    if args.verbose:
        print(f"Processing: {args.file}")

    # Process file...
    print(f"Result saved to {args.output}")

if __name__ == "__main__":
    main()`}</BlogCode>
      <BlogH3>File manipulation</BlogH3>
      <BlogCode>{`from pathlib import Path
import csv, json

# Read CSV
with open("data.csv", newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    rows = list(reader)

# Process data
totals = {}
for row in rows:
    cat = row.get("category", "no_cat")
    totals[cat] = totals.get(cat, 0) + float(row.get("amount", 0))

# Write result
with open("totals.json", "w") as f:
    json.dump(totals, f, indent=2, ensure_ascii=False)

print("Categories found:", list(totals.keys()))`}</BlogCode>
    </>
  );
}

function SectionProyecto() {
  return (
    <>
      <BlogH2>Final Project: CSV Analyzer</BlogH2>
      <BlogP>
        A script that reads a CSV sales file and generates detailed
        statistics: total by category, best-selling product, mean and median
        prices, and a summary exported to JSON.
      </BlogP>
      <BlogCode>{`# csv_analyzer.py
import csv
import json
import statistics
from pathlib import Path
from collections import defaultdict
from argparse import ArgumentParser


def load_csv(path: str) -> list[dict]:
    """Loads a CSV and returns a list of dictionaries."""
    with open(path, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def analyze(rows: list[dict]) -> dict:
    """Generates statistics from the rows."""
    sales_by_cat  = defaultdict(float)
    units_by_prod = defaultdict(int)
    all_prices   = []

    for row in rows:
        try:
            price    = float(row["price"])
            quantity  = int(row["quantity"])
            category = row["category"]
            product  = row["product"]

            sales_by_cat[category]    += price * quantity
            units_by_prod[product]  += quantity
            all_prices.append(price)
        except (KeyError, ValueError) as e:
            print(f"Invalid row ignored: {e}")

    if not all_prices:
        return {"error": "No valid data"}

    top_product = max(units_by_prod, key=units_by_prod.get)

    return {
        "total_records":    len(rows),
        "sales_by_category": dict(sales_by_cat),
        "best_selling_product": {
            "name":   top_product,
            "units": units_by_prod[top_product],
        },
        "price_statistics": {
            "mean":   round(statistics.mean(all_prices), 2),
            "median": round(statistics.median(all_prices), 2),
            "min":     min(all_prices),
            "max":     max(all_prices),
            "stdev":   round(statistics.stdev(all_prices), 2) if len(all_prices) > 1 else 0,
        },
    }


def print_summary(stats: dict) -> None:
    print("\n=== SALES SUMMARY ===")
    print(f"Records processed: {stats['total_records']}")
    print("\nSales by category:")
    for cat, total in stats["sales_by_category"].items():
        print(f"  {cat:<20} {total:>10.2f} €")
    top = stats["best_selling_product"]
    print(f"\nBest-selling product: {top['name']} ({top['units']} units)")
    p = stats["price_statistics"]
    print(f"\nPrices — mean: {p['mean']}€, median: {p['median']}€")
    print(f"          min: {p['min']}€, max: {p['max']}€, \u03c3: {p['stdev']}€")


def main():
    parser = ArgumentParser(description="CSV Sales Analyzer")
    parser.add_argument("file", help="Path to CSV file")
    parser.add_argument("-o", "--output", default="statistics.json")
    args = parser.parse_args()

    path = Path(args.file)
    if not path.exists():
        print(f"Error: '{path}' not found")
        return

    rows = load_csv(str(path))
    stats = analyze(rows)
    print_summary(stats)

    Path(args.output).write_text(json.dumps(stats, indent=2, ensure_ascii=False))
    print(f"\nStatistics exported to {args.output}")


if __name__ == "__main__":
    main()`}</BlogCode>
      <BlogCode>{`# sales.csv (sample input data)
product,category,price,quantity
Apple,fruit,1.20,50
Bread,bakery,1.80,30
Pear,fruit,1.50,40
Baguette,bakery,0.90,60
Orange,fruit,0.80,80
Croissant,bakery,1.20,25

# Run:
# python csv_analyzer.py sales.csv -o result.json`}</BlogCode>
      <BlogCallout type="tip">
        Add <code>pandas</code> for more advanced data analysis.{" "}
        <code>df = pd.read_csv("sales.csv")</code> loads the CSV as a
        DataFrame with built-in statistical functions.
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
              <strong>Hint:</strong> {hint}
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
      <BlogH2>Python Exercises</BlogH2>
      <BlogP>
        Put into practice what you've learned with these progressive exercises. Try
        to solve them before looking at the solution.
      </BlogP>
      <div className="space-y-3 mt-6">
        <ExerciseCard
          description="Write a function fizzbuzz(n) that prints numbers from 1 to n. For multiples of 3 print 'Fizz', of 5 'Buzz', and of both 'FizzBuzz'."
          hint="Check the divisible by 15 case first (or by 3 and 5 simultaneously)."
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
          title="Enhanced FizzBuzz"
        />

        <ExerciseCard
          description="Create a function that receives a list that may contain other lists (nested) and returns a flat list with all elements."
          hint="Use recursion: if the element is a list, call the function again on it."
          level="Básico"
          num={2}
          solution={`def flatten(lst):
    result = []
    for element in lst:
        if isinstance(element, list):
            result.extend(flatten(element))
        else:
            result.append(element)
    return result

print(flatten([1, [2, 3], [4, [5, 6]], 7]))
# [1, 2, 3, 4, 5, 6, 7]`}
          title="Flatten nested list"
        />

        <ExerciseCard
          description="Implement a Stack class with methods push(item), pop(), peek(), and is_empty(). Raise ValueError if popping from an empty stack."
          hint="Use an internal list and append/pop for the operations."
          level="Intermedio"
          num={3}
          solution={`class Stack:
    def __init__(self):
        self._data = []

    def push(self, item):
        self._data.append(item)

    def pop(self):
        if self.is_empty():
            raise ValueError("Stack is empty")
        return self._data.pop()

    def peek(self):
        if self.is_empty():
            return None
        return self._data[-1]

    def is_empty(self):
        return len(self._data) == 0

s = Stack()
s.push(1)
s.push(2)
s.push(3)
print(s.pop())  # 3
print(s.peek())   # 2`}
          title="Stack class"
        />

        <ExerciseCard
          description="Implement a @simple_cache decorator that stores function results in memory to avoid repeated computations (memoization)."
          hint="Use a dictionary as cache. The key can be the function args."
          level="Intermedio"
          num={4}
          solution={`def simple_cache(func):
    memory = {}
    def wrapper(*args):
        if args not in memory:
            memory[args] = func(*args)
        return memory[args]
    return wrapper

@simple_cache
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(35))  # 9227465 (instant with cache)`}
          title="Cache decorator"
        />

        <ExerciseCard
          description="Create a function that reads a CSV string (with header), converts it to a list of dicts, and allows filtering by column. Use only the standard library."
          hint="Use csv.DictReader with io.StringIO to parse the string without reading files."
          level="Avanzado"
          num={5}
          solution={`import csv
import io

def parse_csv(csv_text, filter_by=None):
    reader = csv.DictReader(io.StringIO(csv_text))
    rows = list(reader)
    if filter_by:
        column, value = filter_by
        rows = [r for r in rows if r.get(column) == value]
    return rows

csv_data = """name,age,city
Ana,28,Madrid
Luis,34,Barcelona
Sara,28,Madrid"""

all_rows = parse_csv(csv_data)
madrid = parse_csv(csv_data, filter_by=("city", "Madrid"))
print(len(all_rows))   # 3
print(len(madrid))  # 2`}
          title="CSV parser"
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
