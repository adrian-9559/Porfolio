"use client";
import { useState } from "react";

import {
  BlogCode,
  BlogH2,
  BlogH3,
  BlogP,
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

export default function PostgreSQLGuideContent() {
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
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
        PostgreSQL: el gigante open-source
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Guía completa de PostgreSQL: instalación, tipos de datos exclusivos,
        JSONB, full-text search, y rendimiento con EXPLAIN ANALYZE.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="intro">Introducción</BlogH2>

      <BlogP>
        PostgreSQL (conocido simplemente como Postgres) es el sistema gestor de
        bases de datos relacional open-source más avanzado del mundo. Nacido en
        la Universidad de California en Berkeley en 1986 como sucesor del
        proyecto Ingres, Postgres ha evolucionado durante casi cuatro décadas
        hasta convertirse en un motor de bases de datos con características de
        clase empresarial.
      </BlogP>

      <BlogP>
        Entre sus capacidades más destacadas se encuentran: control de
        concurrencia MVCC (Multi-Version Concurrency Control), point-in-time
        recovery, tablespaces, replicación nativa síncrona y asíncrona, y un
        extenso ecosistema de extensiones como PostGIS (bases de datos
        geoespaciales) y TimescaleDB (series temporales). Es la base de datos
        detrás de proyectos como Instagram, Apple iCloud, y Reddit.
      </BlogP>

      <BlogCallout type="info">
        <strong>PostgreSQL vs MySQL:</strong> PostgreSQL es generalmente más
        rico en características (JSONB indexable, full-text search, CTEs
        recursivas, tipos de datos como arrays y rangos). MySQL tiende a ser más
        rápido en lecturas simples y tiene una configuración inicial más
        sencilla. Para aplicaciones complejas con datos semiestructurados,
        PostgreSQL suele ser la mejor opción.
      </BlogCallout>

      <BlogH2 id="instalacion">Instalación</BlogH2>

      <BlogP>
        PostgreSQL está disponible en todos los sistemas operativos modernos.
        Estas son las formas más comunes de instalarlo:
      </BlogP>

      <BlogH3>macOS (Homebrew)</BlogH3>
      <BlogCode>{`brew install postgresql@16
brew services start postgresql@16`}</BlogCode>

      <BlogH3>Docker</BlogH3>
      <BlogP>Ideal para desarrollo y entornos aislados:</BlogP>
      <BlogCode>{`docker run --name postgres \\
  -e POSTGRES_PASSWORD=root \\
  -p 5432:5432 \\
  -d postgres:16`}</BlogCode>

      <BlogH3>Verificar la instalación</BlogH3>
      <BlogCode>{`psql --version
# psql (PostgreSQL) 16.2`}</BlogCode>

      <BlogH2 id="primeros-comandos">Primeros comandos psql</BlogH2>

      <BlogP>
        Conéctate con la herramienta de línea de comandos{" "}
        <BlogInlineCode>psql</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`psql -U postgres

CREATE DATABASE mi_proyecto;
\\c mi_proyecto  -- conectar a la base de datos

CREATE USER dev WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE mi_proyecto TO dev;

\\dt  -- listar tablas
\\d nombre_tabla  -- describir tabla
\\du -- listar usuarios
\\l  -- listar bases de datos
\\?  -- ayuda de comandos psql`}</BlogCode>

      <BlogCallout type="tip">
        <strong>Diferencia clave con MySQL:</strong> en PostgreSQL,{" "}
        <BlogInlineCode>GRANT ALL PRIVILEGES ON DATABASE</BlogInlineCode> no
        otorga permisos sobre el schema <BlogInlineCode>public</BlogInlineCode>{" "}
        por defecto. Si el usuario necesita crear tablas, también debes ejecutar{" "}
        <BlogInlineCode>GRANT ALL ON SCHEMA public TO dev;</BlogInlineCode>.
      </BlogCallout>

      <BlogH2 id="tipos-exclusivos">
        Tipos de datos exclusivos de PostgreSQL
      </BlogH2>

      <BlogP>
        PostgreSQL ofrece tipos de datos que no encontrarás en otros SGBD
        relacionales. Aquí los más importantes:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>SERIAL</strong> — auto-increment nativo (equivalentes:{" "}
          <BlogInlineCode>SMALLSERIAL</BlogInlineCode>,{" "}
          <BlogInlineCode>BIGSERIAL</BlogInlineCode>). En MySQL se usa{" "}
          <BlogInlineCode>AUTO_INCREMENT</BlogInlineCode>.
        </BlogLi>
        <BlogLi>
          <strong>UUID</strong> — identificadores universales. Requiere la
          extensión <BlogInlineCode>uuid-ossp</BlogInlineCode> o{" "}
          <BlogInlineCode>pgcrypto</BlogInlineCode>.
        </BlogLi>
        <BlogLi>
          <strong>JSONB</strong> — JSON binario, indexable con GIN. Permite
          consultas eficientes sobre campos internos del JSON.
        </BlogLi>
        <BlogLi>
          <strong>ARRAY</strong> — soporte nativo de arrays multidimensionales:{" "}
          <BlogInlineCode>TEXT[]</BlogInlineCode>,{" "}
          <BlogInlineCode>INT[][]</BlogInlineCode>, etc.
        </BlogLi>
        <BlogLi>
          <strong>ENUM</strong> — tipos enumerados creados con{" "}
          <BlogInlineCode>CREATE TYPE</BlogInlineCode>.
        </BlogLi>
        <BlogLi>
          <strong>CITEXT</strong> — texto case-insensitive (requiere extensión{" "}
          <BlogInlineCode>citext</BlogInlineCode>).
        </BlogLi>
        <BlogLi>
          <strong>TSVECTOR / TSQUERY</strong> — búsqueda de texto completo
          nativa, con soporte para stemming y ranking.
        </BlogLi>
        <BlogLi>
          <strong>INTERVAL</strong> — intervalos de tiempo (ej:{" "}
          <BlogInlineCode>INTERVAL '3 days'</BlogInlineCode>).
        </BlogLi>
        <BlogLi>
          <strong>INET / CIDR / MACADDR</strong> — tipos de red.
        </BlogLi>
        <BlogLi>
          <strong>Geométricos</strong> — <BlogInlineCode>point</BlogInlineCode>,{" "}
          <BlogInlineCode>line</BlogInlineCode>,{" "}
          <BlogInlineCode>circle</BlogInlineCode>,{" "}
          <BlogInlineCode>polygon</BlogInlineCode>, etc.
        </BlogLi>
      </BlogUl>

      <BlogH2 id="create-table-avanzada">CREATE TABLE avanzada</BlogH2>

      <BlogP>
        PostgreSQL permite crear tablas con funcionalidades que van mucho más
        allá del estándar SQL:
      </BlogP>

      <BlogCode>{`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

CREATE TABLE usuarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre CITEXT NOT NULL,
  email CITEXT UNIQUE NOT NULL,
  roles TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  creado_en TIMESTAMPTZ DEFAULT NOW()
);

-- Índices avanzados
CREATE INDEX idx_usuarios_email ON usuarios (email);
CREATE INDEX idx_usuarios_roles ON usuarios USING GIN (roles);
CREATE INDEX idx_usuarios_metadata ON usuarios USING GIN (metadata);`}</BlogCode>

      <BlogP>
        <BlogInlineCode>uuid_generate_v4()</BlogInlineCode> genera UUIDs
        aleatorios. <BlogInlineCode>CITEXT</BlogInlineCode> permite búsquedas
        case-insensitive sin necesidad de{" "}
        <BlogInlineCode>LOWER()</BlogInlineCode>. Los índices GIN sobre
        <BlogInlineCode>JSONB</BlogInlineCode> y{" "}
        <BlogInlineCode>TEXT[]</BlogInlineCode> habilitan consultas eficientes
        sobre datos semiestructurados.
      </BlogP>

      <BlogCallout type="warn">
        <strong>Cuidado con los UUID como clave primaria.</strong> Los UUID
        aleatorios pueden fragmentar índices en tablas muy grandes. Para tablas
        con millones de filas, considera usar{" "}
        <BlogInlineCode>uuid_generate_v7()</BlogInlineCode> (secuencial en el
        tiempo) o un <BlogInlineCode>BIGSERIAL</BlogInlineCode> clásico.
      </BlogCallout>

      <BlogH2 id="jsonb">JSONB en PostgreSQL</BlogH2>

      <BlogP>
        JSONB es una de las características estrella de PostgreSQL. A diferencia
        de almacenar JSON como texto, JSONB almacena los datos en formato
        binario descompuesto, lo que permite indexación y consultas eficientes
        sobre campos internos:
      </BlogP>

      <BlogCode>{`INSERT INTO usuarios (nombre, email, metadata) VALUES
  ('Ana', 'ana@email.com',
   '{"theme": "dark", "notifications": true, "lang": "es"}'),
  ('Luis', 'luis@email.com',
   '{"theme": "light", "notifications": false, "lang": "en"}');

-- Consultar campos internos
SELECT nombre, metadata->>'theme' AS tema
FROM usuarios
WHERE metadata @> '{"notifications": true}';`}</BlogCode>

      <BlogP>Operadores clave para JSONB:</BlogP>

      <BlogUl>
        <BlogLi>
          <BlogInlineCode>-&gt;</BlogInlineCode> — accede como JSON (mantiene
          tipo)
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>-&gt;&gt;</BlogInlineCode> — accede como texto
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>@&gt;</BlogInlineCode> — contiene (el operador más
          potente para filtrar documentos JSONB)
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>?|</BlogInlineCode> — existe alguna de las claves
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>?&</BlogInlineCode> — existen todas las claves
        </BlogLi>
      </BlogUl>

      <BlogP>
        Gracias a los índices GIN, estas consultas sobre JSONB son igual de
        rápidas que las consultas sobre columnas tradicionales, incluso en
        tablas con millones de registros.
      </BlogP>

      <BlogH2 id="full-text-search">Full-text search nativo</BlogH2>

      <BlogP>
        PostgreSQL incluye un potente motor de búsqueda de texto completo sin
        necesidad de Elasticsearch ni motores externos:
      </BlogP>

      <BlogCode>{`CREATE TABLE articulos (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  contenido TEXT NOT NULL,
  busqueda TSVECTOR
    GENERATED ALWAYS AS (
      to_tsvector('spanish', titulo || ' ' || contenido)
    ) STORED
);

CREATE INDEX idx_busqueda ON articulos USING GIN (busqueda);

-- Buscar artículos que contengan "postgresql" Y "tutorial"
SELECT titulo
FROM articulos
WHERE busqueda @@ to_tsquery('spanish', 'postgresql & tutorial');`}</BlogCode>

      <BlogP>
        Características destacadas del full-text search en PostgreSQL:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Stemming</strong> — reduce palabras a su raíz ("corriendo",
          "corrí", "correr" → "corr").
        </BlogLi>
        <BlogLi>
          <strong>Ranking</strong> — ordena resultados por relevancia con{" "}
          <BlogInlineCode>ts_rank()</BlogInlineCode>.
        </BlogLi>
        <BlogLi>
          <strong>Diccionarios por idioma</strong> — soporta español, inglés,
          francés, alemán, etc.
        </BlogLi>
        <BlogLi>
          <strong>Highlighting</strong> — extrae fragmentos relevantes con{" "}
          <BlogInlineCode>ts_headline()</BlogInlineCode>.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="tip">
        <strong>Usa columnas GENERATED ALWAYS AS ... STORED</strong> para el
        vector de búsqueda. Así el <BlogInlineCode>TSVECTOR</BlogInlineCode> se
        actualiza automáticamente en cada INSERT o UPDATE, sin necesidad de
        triggers ni lógica adicional en tu aplicación.
      </BlogCallout>

      <BlogH2 id="explain-analyze">EXPLAIN ANALYZE y rendimiento</BlogH2>

      <BlogP>
        PostgreSQL ofrece herramientas de análisis de rendimiento de nivel
        profesional. El comando <BlogInlineCode>EXPLAIN ANALYZE</BlogInlineCode>{" "}
        ejecuta la consulta y muestra el plan de ejecución real:
      </BlogP>

      <BlogCode>{`EXPLAIN ANALYZE
SELECT * FROM usuarios WHERE email = 'ana@email.com';

--                                        QUERY PLAN
-- ─────────────────────────────────────────────────────────────────────
--  Index Scan using idx_usuarios_email on usuarios
--    (cost=0.28..8.29 rows=1 width=140)
--    (actual time=0.032..0.033 rows=1 loops=1)
--    Index Cond: ((email)::text = 'ana@email.com'::text)
--  Planning Time: 0.087 ms
--  Execution Time: 0.048 ms`}</BlogCode>

      <BlogP>Conceptos clave que debes conocer:</BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Seq Scan</strong> — escaneo secuencial de toda la tabla.
          Ocurre cuando no hay índice disponible o cuando PostgreSQL decide que
          es más barato leer toda la tabla.
        </BlogLi>
        <BlogLi>
          <strong>Index Scan</strong> — usa un índice para localizar filas
          específicas. Mucho más rápido para consultas selectivas.
        </BlogLi>
        <BlogLi>
          <strong>Bitmap Index Scan</strong> — combina múltiples índices y luego
          accede a las filas. PostgreSQL lo usa cuando varios índices pueden ser
          relevantes.
        </BlogLi>
      </BlogUl>

      <BlogH3>VACUUM y mantenimiento</BlogH3>

      <BlogP>
        PostgreSQL usa MVCC, lo que significa que las filas actualizadas o
        eliminadas no se borran físicamente de inmediato. El comando{" "}
        <BlogInlineCode>VACUUM</BlogInlineCode> recupera ese espacio:
      </BlogP>

      <BlogCode>{`-- Recuperar espacio y actualizar estadísticas
VACUUM ANALYZE usuarios;

-- Ver estadísticas de una tabla
SELECT schemaname, tablename, n_live_tup, n_dead_tup,
       last_vacuum, last_analyze
FROM pg_stat_user_tables
WHERE tablename = 'usuarios';`}</BlogCode>

      <BlogP>
        En PostgreSQL moderno (9.6+),{" "}
        <BlogInlineCode>autovacuum</BlogInlineCode> está habilitado por defecto
        y maneja la mayoría de los casos automáticamente. Sin embargo, para
        tablas con alta tasa de escritura, puede ser necesario ajustar su
        configuración.
      </BlogP>

      <BlogCallout type="warn">
        <strong>No ejecutes VACUUM FULL en producción sin precaución.</strong>{" "}
        Bloquea la tabla durante la operación. Usa{" "}
        <BlogInlineCode>VACUUM</BlogInlineCode> (sin FULL) que es online y no
        bloquea lecturas ni escrituras.
      </BlogCallout>

      <BlogH2 id="ejercicios">Ejercicios prácticos</BlogH2>

      <BlogP>
        Pon a prueba lo aprendido. Intenta resolver cada ejercicio antes de
        consultar la solución.
      </BlogP>

      <div className="space-y-3" id="ejercicios">
        <ExerciseCard
          description="Instala PostgreSQL (o usa Docker), crea una base de datos 'tienda', habilita la extensión uuid-ossp, y crea una tabla 'categorias' con id UUID, nombre (VARCHAR 100), descripcion (TEXT) y creado_en (TIMESTAMPTZ)."
          hint={
            'CREATE EXTENSION IF NOT EXISTS "uuid-ossp". Para el UUID usa UUID PRIMARY KEY DEFAULT uuid_generate_v4().'
          }
          level="Básico"
          num={1}
          solution={`CREATE DATABASE tienda;
\\c tienda

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE categorias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  creado_en TIMESTAMPTZ DEFAULT NOW()
);`}
          title="Instalación, CREATE DATABASE y tabla con UUID"
        />

        <ExerciseCard
          description="Crea una tabla 'productos' con campos id (UUID), nombre, precio y atributos (JSONB). Inserta 3 productos con diferentes atributos (color, peso, talla disponible) y luego consulta los productos que tengan un atributo específico usando el operador @>."
          hint={
            'Para insertar JSONB usa la sintaxis de string JSON. Para filtrar usa WHERE atributos @> \'{"color": "rojo"}\'.'
          }
          level="Intermedio"
          num={2}
          solution={`CREATE TABLE productos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR(150) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  atributos JSONB DEFAULT '{}'
);

INSERT INTO productos (nombre, precio, atributos) VALUES
  ('Camiseta', 25.99, '{"color": "rojo", "talla": "M", "material": "algodon"}'),
  ('Zapatillas', 89.99, '{"color": "negro", "talla": "42", "deporte": "running"}'),
  ('Mochila', 45.50, '{"color": "azul", "capacidad_l": 20, "impermeable": true}');

-- Productos rojos
SELECT * FROM productos WHERE atributos @> '{"color": "rojo"}';

-- Productos impermeables
SELECT * FROM productos WHERE atributos @> '{"impermeable": true}';`}
          title="JSONB query: insertar y filtrar"
        />

        <ExerciseCard
          description="Crea una tabla 'documentos' con contenido TEXT, un TSVECTOR generado automáticamente, y un índice GIN. Inserta 2 documentos en español y busca aquellos que contengan las palabras 'base de datos'."
          hint="Usa GENERATED ALWAYS AS (to_tsvector('spanish', contenido)) STORED. La consulta usa @@ to_tsquery('spanish', 'base & datos')."
          level="Intermedio"
          num={3}
          solution={`CREATE TABLE documentos (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  contenido TEXT NOT NULL,
  busqueda TSVECTOR
    GENERATED ALWAYS AS (to_tsvector('spanish', titulo || ' ' || contenido)) STORED
);

CREATE INDEX idx_docs_busqueda ON documentos USING GIN (busqueda);

INSERT INTO documentos (titulo, contenido) VALUES
  ('Introducción a BD', 'Las bases de datos relacionales almacenan información estructurada'),
  ('PostgreSQL avanzado', 'Este tutorial cubre conceptos avanzados de PostgreSQL');

SELECT titulo FROM documentos
WHERE busqueda @@ to_tsquery('spanish', 'base & datos');`}
          title="Full-text search con TSVECTOR"
        />

        <ExerciseCard
          description="Crea una tabla 'ventas' con 100,000 filas de prueba (usa generate_series). Sin índice, ejecuta EXPLAIN ANALYZE para una búsqueda por email. Luego crea un índice y compara el plan de ejecución."
          hint="generate_series(1,100000) genera filas. Para emails únicos: 'user' || i || '@email.com'. Compara Seq Scan vs Index Scan."
          level="Intermedio"
          num={4}
          solution={`CREATE TABLE ventas (
  id INT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  monto DECIMAL(10,2) NOT NULL,
  fecha DATE DEFAULT CURRENT_DATE
);

INSERT INTO ventas (id, email, monto)
SELECT i, 'user' || i || '@email.com', random() * 1000
FROM generate_series(1, 100000) AS i;

-- Sin índice (Seq Scan)
EXPLAIN ANALYZE SELECT * FROM ventas WHERE email = 'user50000@email.com';

-- Crear índice
CREATE INDEX idx_ventas_email ON ventas (email);

-- Con índice (Index Scan)
EXPLAIN ANALYZE SELECT * FROM ventas WHERE email = 'user50000@email.com';`}
          title="CREATE INDEX y EXPLAIN ANALYZE"
        />

        <ExerciseCard
          description="Crea una tabla 'cursos' con un campo etiquetas TEXT[]. Inserta cursos con diferentes etiquetas. Busca cursos que contengan la etiqueta 'SQL' usando ANY y luego expande las etiquetas de un curso con UNNEST."
          hint="Para buscar en array: WHERE 'SQL' = ANY(etiquetas). UNNEST(etiquetas) expande el array en filas."
          level="Avanzado"
          num={5}
          solution={`CREATE TABLE cursos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(200) NOT NULL,
  etiquetas TEXT[] DEFAULT '{}'
);

INSERT INTO cursos (nombre, etiquetas) VALUES
  ('SQL desde cero', ARRAY['SQL', 'BD', 'principiante']),
  ('PostgreSQL avanzado', ARRAY['SQL', 'PostgreSQL', 'rendimiento']),
  ('MongoDB básico', ARRAY['NoSQL', 'MongoDB', 'documental']);

-- Buscar cursos con etiqueta 'SQL'
SELECT nombre FROM cursos
WHERE 'SQL' = ANY(etiquetas);

-- Expandir etiquetas del primer curso
SELECT nombre, unnest(etiquetas) AS etiqueta
FROM cursos WHERE id = 1;`}
          title="Array operations: ANY y UNNEST"
        />

        <ExerciseCard
          description="Crea una tabla 'empleados' con id, nombre y manager_id (auto-referencia). Inserta una jerarquía de 3 niveles y usa una CTE recursiva para obtener el árbol completo de un manager específico, mostrando el nivel de profundidad."
          hint="Una CTE recursiva tiene dos partes: el caso base (WHERE manager_id IS NULL) y la parte recursiva que JOIN con la CTE. Usa UNION ALL entre ambas."
          level="Avanzado"
          num={6}
          solution={`CREATE TABLE empleados (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  manager_id INT REFERENCES empleados(id)
);

INSERT INTO empleados (nombre, manager_id) VALUES
  ('Ana', NULL),       -- CEO
  ('Carlos', 1),       -- VP → Ana
  ('María', 1),        -- VP → Ana
  ('Pedro', 2),        -- Dev → Carlos
  ('Laura', 2),        -- Dev → Carlos
  ('Sofía', 3),        -- Design → María
  ('Diego', 4);        -- Jr → Pedro

WITH RECURSIVE organigrama AS (
  -- Caso base: el CEO (sin manager)
  SELECT id, nombre, manager_id, 0 AS nivel
  FROM empleados
  WHERE manager_id IS NULL

  UNION ALL

  -- Caso recursivo: empleados cuyo manager está en el nivel anterior
  SELECT e.id, e.nombre, e.manager_id, o.nivel + 1
  FROM empleados e
  JOIN organigrama o ON e.manager_id = o.id
)
SELECT nombre,
       nivel,
       repeat('  ', nivel) || nombre AS arbol
FROM organigrama
ORDER BY nivel, nombre;`}
          title="CTE recursiva para jerarquías"
        />
      </div>

      <BlogCallout type="tip">
        <strong>Sigue aprendiendo:</strong> la documentación oficial de
        PostgreSQL es una de las mejores de todo el ecosistema open-source. El
        libro &ldquo;PostgreSQL: Up and Running&rdquo; de Regina Obe y Leo Hsu
        es un excelente siguiente paso.
      </BlogCallout>
    </article>
  );
}
