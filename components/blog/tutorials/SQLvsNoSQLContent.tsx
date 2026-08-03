"use client";
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

export default function SQLvsNoSQLContent() {
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
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          Artículo
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          8 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        SQL vs NoSQL: ¿cuál elegir?
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Comparativa completa entre bases de datos relacionales y no
        relacionales: diferencias, ventajas y cuándo usar cada una.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="sql">SQL: bases de datos relacionales</BlogH2>

      <BlogP>
        Las bases de datos SQL (Structured Query Language) son el estándar
        tradicional. Organizan los datos en tablas con filas y columnas, donde
        cada tabla representa una entidad y las relaciones entre tablas se
        definen mediante claves foráneas (
        <BlogInlineCode>FOREIGN KEY</BlogInlineCode>).
      </BlogP>

      <BlogH3>Esquema fijo</BlogH3>
      <BlogP>
        En SQL, el esquema se define por adelantado: sabes exactamente qué
        columnas tiene cada tabla y qué tipo de datos aceptan antes de insertar
        el primer registro. Esto proporciona previsibilidad y permite al motor
        optimizar el almacenamiento y las consultas.
      </BlogP>

      <BlogCode>{`CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  age INTEGER CHECK (age >= 0),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending'
);`}</BlogCode>

      <BlogH3>Transacciones ACID</BlogH3>
      <BlogP>
        Las bases de datos relacionales cumplen las propiedades ACID, lo que las
        hace ideales para sistemas donde la integridad de los datos es crítica:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Atomicity:</strong> cada transacción se ejecuta completamente
          o no se ejecuta. No hay estados intermedios.
        </BlogLi>
        <BlogLi>
          <strong>Consistency:</strong> las transacciones llevan la base de
          datos de un estado válido a otro, respetando todas las restricciones.
        </BlogLi>
        <BlogLi>
          <strong>Isolation:</strong> las transacciones simultáneas no se
          afectan entre sí. El resultado es el mismo que si se ejecutaran
          secuencialmente.
        </BlogLi>
        <BlogLi>
          <strong>Durability:</strong> una vez confirmada, la transacción
          persiste incluso ante un fallo del sistema.
        </BlogLi>
      </BlogUl>

      <BlogH3>Relaciones y JOINs</BlogH3>
      <BlogP>
        La capacidad de relacionar tablas mediante{" "}
        <BlogInlineCode>JOIN</BlogInlineCode> es una de las grandes ventajas de
        SQL. Permite combinar datos de múltiples tablas en una sola consulta de
        forma eficiente:
      </BlogP>

      <BlogCode>{`SELECT users.name, orders.total, orders.status
FROM users
JOIN orders ON users.id = orders.user_id
WHERE orders.total > 100
ORDER BY orders.total DESC;`}</BlogCode>

      <BlogH3>Escalado vertical</BlogH3>
      <BlogP>
        Las bases de datos SQL escalan principalmente de forma vertical: más
        CPU, más RAM, discos más rápidos en un solo servidor. Aunque existen
        soluciones de clustering y replicación, el escalado horizontal sigue
        siendo complejo en el mundo relacional.
      </BlogP>

      <BlogCallout type="tip">
        <strong>¿Cuándo usar SQL?</strong> Sistemas bancarios, ERPs,
        facturación, inventarios, cualquier proyecto con relaciones bien
        definidas y necesidad de consistencia fuerte.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="nosql">NoSQL: bases de datos no relacionales</BlogH2>

      <BlogP>
        NoSQL (Not Only SQL) agrupa una familia de bases de datos que surgieron
        para cubrir casos donde SQL no era la mejor opción: escalado horizontal,
        esquemas flexibles y alta velocidad con grandes volúmenes de datos.
      </BlogP>

      <BlogH3>Esquema flexible</BlogH3>
      <BlogP>
        En NoSQL no necesitas definir la estructura por adelantado. Cada
        documento puede tener campos diferentes, lo que permite iterar
        rápidamente durante el desarrollo. Esto se conoce como schema-on-read:
        la estructura se interpreta al leer los datos, no al escribirlos.
      </BlogP>

      <BlogCode>{`// MongoDB — cada documento puede tener campos distintos
db.users.insertOne({
  name: "Ana García",
  email: "ana@example.com",
  age: 28,
  tags: ["backend", "python"],
  address: {
    city: "Madrid",
    country: "Spain"
  }
});`}</BlogCode>

      <BlogH3>BASE en lugar de ACID</BlogH3>
      <BlogP>
        La mayoría de sistemas NoSQL siguen el modelo BASE (Basically Available,
        Soft state, Eventually consistent), que relaja la consistencia inmediata
        a cambio de disponibilidad y tolerancia a particiones:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Basically Available:</strong> el sistema responde siempre,
          incluso si algunos nodos fallan.
        </BlogLi>
        <BlogLi>
          <strong>Soft State:</strong> el estado puede cambiar sin entrada
          externa debido a la propagación de datos.
        </BlogLi>
        <BlogLi>
          <strong>Eventually Consistent:</strong> los datos se propagan
          asíncronamente; si no hay escrituras nuevas, todos los nodos
          convergerán al mismo estado con el tiempo.
        </BlogLi>
      </BlogUl>

      <BlogH3>Escalado horizontal</BlogH3>
      <BlogP>
        NoSQL está diseñado para escalar horizontalmente (sharding): añadir más
        servidores en lugar de hacer más potente uno solo. Esto permite manejar
        terabytes o petabytes de datos distribuyendo la carga entre decenas o
        cientos de nodos.
      </BlogP>

      <BlogH3>Variedad de modelos</BlogH3>
      <BlogP>
        A diferencia de SQL, donde el modelo es siempre relacional, NoSQL
        incluye múltiples paradigmas:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Documentales (MongoDB, Firestore):</strong> datos en formato
          JSON/BSON, ideales para catálogos y sistemas de contenido.
        </BlogLi>
        <BlogLi>
          <strong>Clave-Valor (Redis, DynamoDB):</strong> pares clave-valor,
          ultrarrápidos, perfectos para cachés y sesiones.
        </BlogLi>
        <BlogLi>
          <strong>Column-family (Cassandra, HBase):</strong> datos en columnas,
          optimizados para analítica y Big Data.
        </BlogLi>
        <BlogLi>
          <strong>Grafos (Neo4j, ArangoDB):</strong> nodos y aristas, ideales
          para relaciones complejas y redes.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="info">
        <strong>Ojo:</strong> NoSQL no significa "sin SQL". Muchos sistemas
        NoSQL ofrecen lenguajes de consulta parecidos a SQL (CQL en Cassandra,
        AQL en ArangoDB) o capas de compatibilidad.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="comparativa">Tabla comparativa</BlogH2>

      <BlogP>
        Vista rápida de las diferencias fundamentales entre ambos paradigmas:
      </BlogP>

      <div className="overflow-x-auto my-6">
        <div
          className="grid gap-px bg-black/8 dark:bg-white/8 rounded-xl overflow-hidden text-sm"
          style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
        >
          {/* Header */}
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 font-semibold text-[#1d1d1f] dark:text-white">
            Característica
          </div>
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 font-semibold text-[#1d1d1f] dark:text-white">
            SQL
          </div>
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 font-semibold text-[#1d1d1f] dark:text-white">
            NoSQL
          </div>

          {/* Schema */}
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            Esquema
          </div>
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            Fijo, predefinido
          </div>
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            Dinámico, flexible
          </div>

          {/* Scalability */}
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            Escalabilidad
          </div>
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            Vertical (servidor más grande)
          </div>
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            Horizontal (más servidores)
          </div>

          {/* ACID */}
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            ACID
          </div>
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3">
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              Soporte completo
            </span>
          </div>
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            Limitado / configurable
          </div>

          {/* Joins */}
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            JOINs
          </div>
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            Sí (nativos)
          </div>
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            A nivel de app o $lookup
          </div>

          {/* Use case */}
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            Caso de uso
          </div>
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            Consultas complejas, integridad
          </div>
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            Alto volumen, iteración rápida
          </div>
        </div>
      </div>

      <BlogP>
        Esta tabla simplifica las diferencias para dar una visión general. En la
        práctica, la línea entre SQL y NoSQL es cada vez más difusa: PostgreSQL
        soporta documentos JSON y búsqueda por texto completo, mientras que
        MongoDB tiene transacciones multi-documento desde la versión 4.0.
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="cuando-elegir">¿Cuándo elegir cada uno?</BlogH2>

      <BlogH3>Elige SQL cuando…</BlogH3>
      <BlogUl>
        <BlogLi>
          Los datos tienen relaciones claras y bien definidas (pedidos con
          líneas, usuarios con perfiles).
        </BlogLi>
        <BlogLi>
          Necesitas integridad referencial y consistencia fuerte (banca,
          contabilidad, ERP).
        </BlogLi>
        <BlogLi>
          Las consultas son complejas e implican múltiples tablas (reportes,
          dashboards analíticos).
        </BlogLi>
        <BlogLi>
          El volumen de datos es predecible y cabe en un solo servidor (o unos
          pocos).
        </BlogLi>
        <BlogLi>
          Trabajas con datos altamente estructurados donde el esquema cambia
          poco.
        </BlogLi>
      </BlogUl>

      <BlogH3>Elige NoSQL cuando…</BlogH3>
      <BlogUl>
        <BlogLi>
          El esquema de datos es variable o está en evolución constante.
        </BlogLi>
        <BlogLi>
          Necesitas escalar horizontalmente para manejar grandes volúmenes de
          datos (IoT, logs, redes sociales).
        </BlogLi>
        <BlogLi>
          Priorizas la velocidad de lectura/escritura sobre la consistencia
          inmediata.
        </BlogLi>
        <BlogLi>
          Estás prototipando y necesitas iterar rápido sin migraciones de
          esquema.
        </BlogLi>
        <BlogLi>
          Tus datos son天然的mente documentos, grafos o pares clave-valor
          (catálogos, feeds, sesiones).
        </BlogLi>
      </BlogUl>

      <BlogCallout type="warn">
        <strong>Cuidado con el dogmatismo.</strong> Elegir NoSQL "porque mola"
        cuando tu proyecto es básicamente un CRUD con relaciones simples es
        añadir complejidad innecesaria. Y elegir SQL para un sistema de
        telemetría con millones de escrituras por segundo es igual de
        problemático.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="convivencia">¿Pueden coexistir?</BlogH2>

      <BlogP>
        Sí, y de hecho es la práctica más común en proyectos modernos. Se conoce
        como persistencia políglota: usar la base de datos adecuada para cada
        problema dentro del mismo sistema.
      </BlogP>

      <BlogP>Un ejemplo típico de arquitectura políglota:</BlogP>

      <BlogUl>
        <BlogLi>
          <strong>PostgreSQL</strong> para el core transaccional: usuarios,
          pedidos, pagos, facturación. Aquí la consistencia ACID es
          imprescindible.
        </BlogLi>
        <BlogLi>
          <strong>Redis</strong> para caché de sesiones y datos frecuentemente
          accedidos. Velocidad de microsegundos.
        </BlogLi>
        <BlogLi>
          <strong>MongoDB</strong> para el catálogo de productos con esquema
          variable y búsqueda flexible.
        </BlogLi>
        <BlogLi>
          <strong>InfluxDB</strong> para métricas de servidores y dashboards en
          tiempo real.
        </BlogLi>
        <BlogLi>
          <strong>Elasticsearch</strong> para búsqueda de texto completo sobre
          productos y documentos.
        </BlogLi>
      </BlogUl>

      <BlogCode>{`// Ejemplo: una arquitectura políglota típica
const express = require('express');
const app = express();

// PostgreSQL para transacciones
app.post('/orders', async (req, res) => {
  const client = await pg.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      'INSERT INTO orders (user_id, total) VALUES ($1, $2)',
      [req.user.id, req.body.total]
    );
    await client.query('COMMIT');
  } catch {
    await client.query('ROLLBACK');
  } finally {
    client.release();
  }
});

// Redis para caché
app.get('/products/:id', async (req, res) => {
  const cached = await redis.get(\`product:\${req.params.id}\`);
  if (cached) return res.json(JSON.parse(cached));

  const product = await Product.findById(req.params.id);
  await redis.set(
    \`product:\${req.params.id}\`,
    JSON.stringify(product),
    'EX', 3600
  );
  res.json(product);
});`}</BlogCode>

      <BlogCallout type="done">
        <strong>Regla práctica:</strong> SQL para lo que requiere consistencia y
        relaciones. NoSQL para lo que requiere escalabilidad y flexibilidad. La
        mayoría de proyectos necesitan ambos.
      </BlogCallout>
    </article>
  );
}
