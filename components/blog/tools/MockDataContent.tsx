"use client";
import { useState } from "react";
import { useT } from "@/hooks/useT";
import { copyToClipboard } from "@/lib/clipboard";

type Category = "person" | "commerce" | "numbers" | "text" | "date";

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "person", label: "Person" },
  { id: "commerce", label: "Commerce" },
  { id: "numbers", label: "Numbers" },
  { id: "text", label: "Text" },
  { id: "date", label: "Date" },
];

const FIRST_NAMES_M = ["Carlos", "Miguel", "Andrés", "Diego", "Javier", "Pablo", "Sergio", "Alejandro", "Fernando", "Luis", "Marco", "Pedro", "Tomás", "Adrián", "Óscar", "Raúl", "Hugo", "Lucas", "Mateo", "Daniel"];
const FIRST_NAMES_F = ["María", "Ana", "Laura", "Carmen", "Rosa", "Elena", "Sofía", "Valentina", "Camila", "Isabella", "Lucía", "Paula", "Martina", "Julia", "Clara", "Olivia", "Emma", "Catalina", "Andrea", "Gabriela"];
const LAST_NAMES = ["García", "Rodríguez", "Martínez", "López", "Hernández", "González", "Pérez", "Sánchez", "Ramírez", "Torres", "Flores", "Rivera", "Gómez", "Díaz", "Cruz", "Morales", "Reyes", "Ortiz", "Gutiérrez", "Chávez"];
const DOMAINS = ["gmail.com", "outlook.com", "yahoo.com", "hotmail.com", "protonmail.com"];
const STREET_NAMES = ["Av. Reforma", "Calle Hidalgo", "Calle Juárez", "Av. Insurgentes", "Calle Morelos", "Blvd. Centro", "Av. Constitución", "Calle Allende", "Av. Universidad", "Calle Madero"];
const CITIES = ["Ciudad de México", "Guadalajara", "Monterrey", "Puebla", "Tijuana", "León", "Mérida", "Querétaro", "Cancún", "Oaxaca"];
const BRANDS = ["Nike", "Adidas", "Zara", "H&M", "Uniqlo", "Levi's", "Samsung", "Apple", "Sony", "LG"];
const PRODUCTS = ["Camiseta", "Pantalones", "Zapatillas", "Chaqueta", "Reloj", "Mochila", "Gafas", "Cinturón", "Calcetines", "Gorra"];
const WORDS = ["sol", "luna", "estrella", "mar", "montaña", "río", "cielo", "viento", "fuego", "tierra", "bosque", "arena", "nube", "lluvia", "nieve", "flor", "árbol", "piedra", "ojo", "mano"];
const SENTENCES = [
  "El rápido zorro marrón salta sobre el perro perezoso.",
  "En un lugar de la mancha, cuyo nombre no quiero acordarme.",
  "Había una vez un mundo lleno de posibilidades infinitas.",
  "La vida es un viaje, no un destino.",
  "Cada amanecer trae consigo nuevas oportunidades.",
  "El conocimiento es poder, pero la acción es transformación.",
  "La creatividad es la inteligencia divirtiéndose.",
  "No hay camino para la paz, la paz es el camino.",
  "El cambio es la única constante en la vida.",
  "La simplicidad es la sofisticación suprema.",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min: number, max: number): number {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function uuid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function randomDate(past: boolean): string {
  const now = Date.now();
  const offset = past ? -randInt(1, 365 * 5) : randInt(1, 365 * 2);
  const d = new Date(now + offset * 86400000);
  return d.toISOString().split("T")[0];
}

function generateRecord(categories: Category[]): Record<string, unknown> {
  const rec: Record<string, unknown> = {};

  if (categories.includes("person")) {
    const isMale = Math.random() > 0.5;
    const first = isMale ? pick(FIRST_NAMES_M) : pick(FIRST_NAMES_F);
    const last1 = pick(LAST_NAMES);
    const last2 = pick(LAST_NAMES);
    rec.first_name = first;
    rec.last_name = `${last1} ${last2}`;
    rec.email = `${first.toLowerCase()}.${last1.toLowerCase()}@${pick(DOMAINS)}`;
    rec.phone = `+52 ${randInt(10, 99)} ${randInt(100, 999)} ${randInt(1000, 9999)}`;
    rec.address = `${pick(STREET_NAMES)} ${randInt(1, 500)}, ${pick(CITIES)}`;
  }

  if (categories.includes("commerce")) {
    rec.product = pick(PRODUCTS);
    rec.brand = pick(BRANDS);
    rec.price = randFloat(9.99, 999.99);
    rec.stock = randInt(0, 500);
  }

  if (categories.includes("numbers")) {
    rec.integer = randInt(-1000, 1000);
    rec.float = randFloat(-100, 100);
    rec.uuid = uuid();
  }

  if (categories.includes("text")) {
    rec.word = pick(WORDS);
    rec.sentence = pick(SENTENCES);
    rec.paragraph = Array.from({ length: randInt(3, 6) }, () => pick(SENTENCES)).join(" ");
  }

  if (categories.includes("date")) {
    rec.date_past = randomDate(true);
    rec.date_future = randomDate(false);
    rec.date_recent = randomDate(true);
  }

  return rec;
}

export default function MockDataContent() {
  const { t } = useT();
  const [selected, setSelected] = useState<Category[]>(["person", "commerce"]);
  const [count, setCount] = useState(10);
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [copied, setCopied] = useState(false);

  const toggleCategory = (cat: Category) => {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const generate = () => {
    if (selected.length === 0) return;
    const rows = Array.from({ length: count }, () => generateRecord(selected));
    setData(rows);
  };

  const copyAll = async () => {
    if (await copyToClipboard(JSON.stringify(data, null, 2))) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
            {t("blog.mockData.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.mockData.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.mockData.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.mockData.desc")}
        </p>
      </div>

      <div className="space-y-4">
        {/* Categories */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
            {t("blog.mockData.categories")}
          </p>
          <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.04]">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${selected.includes(cat.id) ? "bg-white dark:bg-[#1c1c22] text-amber-600 dark:text-amber-400 shadow-sm" : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"}`}
                onClick={() => toggleCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Record count */}
        <div className="flex items-center gap-3">
          <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
            {t("blog.mockData.records")}
          </p>
          <input
            type="range"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-40 accent-amber-500"
          />
          <span className="text-sm font-mono text-[#1d1d1f] dark:text-white w-8 text-center">
            {count}
          </span>
        </div>

        {/* Generate */}
        <button
          className="px-4 py-2 rounded-lg text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-colors disabled:opacity-40"
          disabled={selected.length === 0}
          onClick={generate}
        >
          {t("blog.mockData.generate")}
        </button>

        {/* Output */}
        {data.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                JSON ({data.length})
              </p>
              <button
                className="text-xs text-amber-600 dark:text-amber-400 hover:underline"
                onClick={copyAll}
              >
                {copied ? t("blog.mockData.copied") : t("blog.mockData.copyAll")}
              </button>
            </div>
            <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 max-h-80 overflow-auto">
              <pre className="font-mono text-xs text-[#1d1d1f] dark:text-white whitespace-pre-wrap">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
