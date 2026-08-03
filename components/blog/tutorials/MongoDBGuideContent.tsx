"use client";
import { useState } from "react";

import {
  BlogH2,
  BlogH3,
  BlogP,
  BlogCode,
  BlogInlineCode,
  BlogUl,
  BlogLi,
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

export default function MongoDBGuideContent() {
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
          12 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        MongoDB: la revolución NoSQL
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        MongoDB es la base de datos NoSQL más popular. Almacena datos como
        documentos BSON, ofreciendo esquemas flexibles, escalabilidad horizontal
        y alta velocidad de desarrollo.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="conceptos">Conceptos clave</BlogH2>

      <BlogP>
        En MongoDB los datos se organizan en: <strong>Base de datos</strong> →{" "}
        <strong>Colecciones</strong> → <strong>Documentos</strong>. A diferencia
        de SQL, no hay tablas ni filas. Cada documento es un objeto BSON con su
        propio esquema — un documento puede tener campos que otro no tiene.
      </BlogP>

      <BlogP>
        El <BlogInlineCode>_id</BlogInlineCode> es un ObjectId único generado
        automáticamente (12 bytes: timestamp + machine ID + process ID +
        counter). También puedes usar tu propio _id (UUID, número, etc.).
      </BlogP>

      <BlogCallout type="info">
        BSON es una extensión binaria de JSON que soporta tipos adicionales como
        Date, ObjectId, BinData, y números de 32/64 bits. Es lo que realmente se
        almacena en disco.
      </BlogCallout>

      <BlogH2 id="instalacion">Instalación</BlogH2>

      <BlogP>Opciones para empezar con MongoDB:</BlogP>

      <BlogUl>
        <BlogLi>
          <strong>macOS:</strong>{" "}
          <BlogInlineCode>brew install mongodb-community@7</BlogInlineCode> +{" "}
          <BlogInlineCode>
            brew services start mongodb-community@7
          </BlogInlineCode>
        </BlogLi>
        <BlogLi>
          <strong>Docker:</strong>{" "}
          <BlogInlineCode>
            docker run --name mongodb -p 27017:27017 -d mongo:7
          </BlogInlineCode>
        </BlogLi>
        <BlogLi>
          <strong>MongoDB Compass:</strong> GUI oficial para explorar y
          gestionar datos visualmente
        </BlogLi>
        <BlogLi>
          <strong>mongosh:</strong> shell interactiva — solo escribe{" "}
          <BlogInlineCode>mongosh</BlogInlineCode>
        </BlogLi>
      </BlogUl>

      <BlogH2 id="crud">CRUD básico</BlogH2>

      <BlogP>Las cuatro operaciones fundamentales en MongoDB:</BlogP>

      <BlogH3>CREATE</BlogH3>
      <BlogCode>{`db.usuarios.insertOne({
  nombre: "Ana",
  email: "ana@email.com",
  edad: 28,
  ciudad: "Madrid"
});

db.usuarios.insertMany([
  { nombre: "Luis", edad: 35, ciudad: "Barcelona" },
  { nombre: "María", edad: 42, ciudad: "Valencia" }
]);`}</BlogCode>

      <BlogH3>READ</BlogH3>
      <BlogCode>{`db.usuarios.find({ edad: { $gt: 30 } });
db.usuarios.find({ ciudad: "Madrid" }).sort({ edad: -1 }).limit(5);
db.usuarios.findOne({ email: "ana@email.com" });`}</BlogCode>

      <BlogH3>UPDATE</BlogH3>
      <BlogCode>{`db.usuarios.updateOne(
  { nombre: "Ana" },
  { $set: { edad: 29 } }
);

db.usuarios.updateMany(
  { ciudad: "Madrid" },
  { $set: { pais: "España" } }
);`}</BlogCode>

      <BlogH3>DELETE</BlogH3>
      <BlogCode>{`db.usuarios.deleteOne({ email: null });
db.usuarios.deleteMany({ edad: { $lt: 18 } });`}</BlogCode>

      <BlogH2 id="operadores">Operadores de query</BlogH2>

      <BlogP>MongoDB ofrece operadores para consultas avanzadas:</BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Comparación:</strong> <BlogInlineCode>$gt</BlogInlineCode>,{" "}
          <BlogInlineCode>$gte</BlogInlineCode>,{" "}
          <BlogInlineCode>$lt</BlogInlineCode>,{" "}
          <BlogInlineCode>$lte</BlogInlineCode>,{" "}
          <BlogInlineCode>$in</BlogInlineCode>,{" "}
          <BlogInlineCode>$ne</BlogInlineCode>
        </BlogLi>
        <BlogLi>
          <strong>Texto:</strong> <BlogInlineCode>$regex</BlogInlineCode>{" "}
          (búsqueda con expresiones regulares)
        </BlogLi>
        <BlogLi>
          <strong>Existencia:</strong> <BlogInlineCode>$exists</BlogInlineCode>,{" "}
          <BlogInlineCode>$type</BlogInlineCode>
        </BlogLi>
        <BlogLi>
          <strong>Arrays:</strong> <BlogInlineCode>$all</BlogInlineCode>,{" "}
          <BlogInlineCode>$elemMatch</BlogInlineCode>,{" "}
          <BlogInlineCode>$size</BlogInlineCode>
        </BlogLi>
        <BlogLi>
          <strong>Lógicos:</strong> <BlogInlineCode>$and</BlogInlineCode>,{" "}
          <BlogInlineCode>$or</BlogInlineCode>,{" "}
          <BlogInlineCode>$not</BlogInlineCode>
        </BlogLi>
      </BlogUl>

      <BlogCode>{`-- Usuarios de Madrid o Barcelona con edad entre 25 y 40
db.usuarios.find({
  $and: [
    { ciudad: { $in: ["Madrid", "Barcelona"] } },
    { edad: { $gte: 25, $lte: 40 } }
  ]
});

-- Búsqueda textual con regex
db.usuarios.find({ email: { $regex: /@gmail\.com$/i } });`}</BlogCode>

      <BlogH2 id="aggregation">Aggregation Pipeline</BlogH2>

      <BlogP>
        El equivalente a GROUP BY, JOINs y transformaciones complejas. Los
        documentos pasan por una tubería de etapas:
      </BlogP>

      <BlogCode>{`db.pedidos.aggregate([
  { $match: { estado: "completado" } },
  { $group: {
    _id: "$usuario_id",
    total: { $sum: "$total" },
    count: { $sum: 1 }
  }},
  { $sort: { total: -1 } },
  { $limit: 10 },
  { $lookup: {
    from: "usuarios",
    localField: "_id",
    foreignField: "_id",
    as: "usuario"
  }},
  { $unwind: "$usuario" },
  { $project: {
    nombre: "$usuario.nombre",
    total: 1,
    pedidos: 1
  }}
]);`}</BlogCode>

      <BlogP>
        Etapas clave: <BlogInlineCode>$match</BlogInlineCode> (filtro, como
        WHERE), <BlogInlineCode>$group</BlogInlineCode> (agrupación),{" "}
        <BlogInlineCode>$sort</BlogInlineCode>,{" "}
        <BlogInlineCode>$limit</BlogInlineCode>,{" "}
        <BlogInlineCode>$project</BlogInlineCode> (seleccionar campos),{" "}
        <BlogInlineCode>$lookup</BlogInlineCode> (como JOIN),{" "}
        <BlogInlineCode>$unwind</BlogInlineCode> (desanidar arrays).
      </BlogP>

      <BlogCallout type="tip">
        Coloca <BlogInlineCode>$match</BlogInlineCode> y{" "}
        <BlogInlineCode>$limit</BlogInlineCode> lo antes posible en el pipeline
        para reducir los documentos que pasan a las siguientes etapas y mejorar
        el rendimiento.
      </BlogCallout>

      <BlogH2 id="indices">Índices</BlogH2>

      <BlogP>Los índices aceleran las consultas drásticamente:</BlogP>

      <BlogCode>{`// Índice simple
db.usuarios.createIndex({ email: 1 });

// Índice compuesto
db.usuarios.createIndex({ ciudad: 1, edad: -1 });

// Índice parcial
db.pedidos.createIndex(
  { total: 1 },
  { partialFilterExpression: { estado: "completado" } }
);

// Índice de texto
db.usuarios.createIndex({ nombre: "text", email: "text" });

// Analizar consulta
db.usuarios.find({ email: "ana@email.com" }).explain("executionStats");`}</BlogCode>

      <BlogP>
        MongoDB usa índices automáticamente.{" "}
        <BlogInlineCode>.explain("executionStats")</BlogInlineCode> te muestra
        si se usó un INDEX SCAN (bueno) o un COLLSCAN (malo — revisa toda la
        colección).
      </BlogP>

      <BlogCallout type="info">
        SQL vs MongoDB: las JOINs se hacen con{" "}
        <BlogInlineCode>$lookup</BlogInlineCode> o embebiendo datos relacionados
        dentro del mismo documento. Las transacciones multi-documento ACID están
        disponibles desde MongoDB 4.0. El sharding horizontal es nativo y
        permite escalar entre cientos de servidores.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Ejercicios</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Crea una colección 'productos' e inserta 3 documentos con diferentes campos (que no sean idénticos) para demostrar la flexibilidad de esquema."
          hint="Cada documento puede tener campos distintos. Usa insertMany."
          level="Básico"
          num={1}
          solution={`db.productos.insertMany([
  { nombre: "Portátil", precio: 1200, categoria: "electrónica" },
  { nombre: "Camiseta", precio: 25, categoria: "ropa", talla: "M" },
  { nombre: "Silla", precio: 200, color: "negra", material: "cuero" }
]);`}
          title="Insertar documentos variados"
        />

        <ExerciseCard
          description="Encuentra productos con precio entre 100 y 1000 de la categoría 'electrónica'."
          hint="Usa $gte, $lte y $and implícito (varios filtros separados por coma)."
          level="Básico"
          num={2}
          solution={`db.productos.find({
  precio: { $gte: 100, $lte: 1000 },
  categoria: "electrónica"
});`}
          title="Find con operadores"
        />

        <ExerciseCard
          description="Añade una etiqueta 'oferta' al array de tags de un producto específico."
          hint="Usa $push para añadir a un array existente o crearlo si no existe."
          level="Intermedio"
          num={3}
          solution={`db.productos.updateOne(
  { nombre: "Portátil" },
  { $push: { tags: "oferta" } }
);`}
          title="Update con $push a un array"
        />

        <ExerciseCard
          description="Usando una colección 'pedidos', agrupa por cliente, suma el total gastado, y ordena de mayor a menor."
          hint={'$group con _id: "$cliente_id" y $sum, luego $sort.'}
          level="Intermedio"
          num={4}
          solution={`db.pedidos.aggregate([
  { $group: { _id: "$cliente_id", total_gastado: { $sum: "$total" } } },
  { $sort: { total_gastado: -1 } }
]);`}
          title="Aggregation: $match + $group + $sort"
        />

        <ExerciseCard
          description="Usando $lookup, combina los pedidos con los datos del cliente para mostrar el nombre del cliente junto a cada pedido."
          hint="$lookup necesita from, localField, foreignField y as."
          level="Avanzado"
          num={5}
          solution={`db.pedidos.aggregate([
  { $lookup: {
    from: "clientes",
    localField: "cliente_id",
    foreignField: "_id",
    as: "cliente"
  }},
  { $unwind: "$cliente" },
  { $project: { producto: 1, total: 1, "cliente.nombre": 1 } }
]);`}
          title="$lookup entre colecciones"
        />

        <ExerciseCard
          description="Crea un índice en el campo email de la colección usuarios y verifica que la consulta por email lo usa con explain."
          hint="createIndex + find + explain('executionStats'). Busca 'IXSCAN' en el output."
          level="Avanzado"
          num={6}
          solution={`db.usuarios.createIndex({ email: 1 });
db.usuarios.find({ email: "ana@email.com" }).explain("executionStats");`}
          title="Índice + explain"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        MongoDB brilla cuando necesitas flexibilidad de esquema, escalabilidad
        horizontal y desarrollo rápido. Combínalo con SQL para sacar lo mejor de
        ambos mundos.
      </BlogP>
    </article>
  );
}
