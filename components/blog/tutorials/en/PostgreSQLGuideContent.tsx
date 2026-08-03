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
  level: "Easy" | "Intermediate" | "Hard";
  description: string;
  hint?: string;
  solution?: string;
}) {
  const [open, setOpen] = useState(false);
  const levelColor = {
    Easy: "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
    Intermediate:
      "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
    Hard: "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
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
              <strong>Hint:</strong> {hint}
            </div>
          )}
          {solution && <BlogCode>{solution}</BlogCode>}
        </div>
      )}
    </div>
  );
}

export default function PostgreSQLGuideContentEn() {
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
        PostgreSQL: The Open-Source Giant
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Complete guide to PostgreSQL: installation, exclusive data types, JSONB,
        native full-text search, and performance tuning with EXPLAIN ANALYZE.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="intro">Introduction</BlogH2>

      <BlogP>
        PostgreSQL (often referred to simply as Postgres) is the world's most
        advanced open-source relational database management system. Born at the
        University of California, Berkeley in 1986 as a successor to the Ingres
        project, Postgres has evolved over nearly four decades into an
        enterprise-grade database engine.
      </BlogP>

      <BlogP>
        Its standout features include MVCC (Multi-Version Concurrency Control),
        point-in-time recovery, tablespaces, native synchronous and asynchronous
        replication, and a vast ecosystem of extensions such as PostGIS
        (geospatial databases) and TimescaleDB (time-series data). PostgreSQL
        powers projects like Instagram, Apple iCloud, and Reddit.
      </BlogP>

      <BlogCallout type="info">
        <strong>PostgreSQL vs MySQL:</strong> PostgreSQL is generally richer in
        features (indexable JSONB, full-text search, recursive CTEs, array and
        range types). MySQL tends to be faster for simple reads and easier to
        set up initially. For complex applications with semi-structured data,
        PostgreSQL is usually the better choice.
      </BlogCallout>

      <BlogH2 id="installation">Installation</BlogH2>

      <BlogP>PostgreSQL is available on all modern operating systems:</BlogP>

      <BlogH3>macOS (Homebrew)</BlogH3>
      <BlogCode>{`brew install postgresql@16
brew services start postgresql@16`}</BlogCode>

      <BlogH3>Docker</BlogH3>
      <BlogP>Ideal for development and isolated environments:</BlogP>
      <BlogCode>{`docker run --name postgres \\
  -e POSTGRES_PASSWORD=root \\
  -p 5432:5432 \\
  -d postgres:16`}</BlogCode>

      <BlogH3>Verify the installation</BlogH3>
      <BlogCode>{`psql --version
# psql (PostgreSQL) 16.2`}</BlogCode>

      <BlogH2 id="first-commands">First psql Commands</BlogH2>

      <BlogP>
        Connect using the <BlogInlineCode>psql</BlogInlineCode> command-line
        tool:
      </BlogP>

      <BlogCode>{`psql -U postgres

CREATE DATABASE mi_proyecto;
\\c mi_proyecto  -- connect to the database

CREATE USER dev WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE mi_proyecto TO dev;

\\dt  -- list tables
\\d table_name  -- describe table
\\du -- list users
\\l  -- list databases
\\?  -- psql command help`}</BlogCode>

      <BlogCallout type="tip">
        <strong>Key difference from MySQL:</strong> in PostgreSQL,{" "}
        <BlogInlineCode>GRANT ALL PRIVILEGES ON DATABASE</BlogInlineCode> does
        not grant permissions on the <BlogInlineCode>public</BlogInlineCode>{" "}
        schema by default. If the user needs to create tables, also run{" "}
        <BlogInlineCode>GRANT ALL ON SCHEMA public TO dev;</BlogInlineCode>.
      </BlogCallout>

      <BlogH2 id="exclusive-types">PostgreSQL Exclusive Data Types</BlogH2>

      <BlogP>
        PostgreSQL offers data types you will not find in other relational
        DBMSs. Here are the most important ones:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>SERIAL</strong> — native auto-increment (variants:{" "}
          <BlogInlineCode>SMALLSERIAL</BlogInlineCode>,{" "}
          <BlogInlineCode>BIGSERIAL</BlogInlineCode>). MySQL uses{" "}
          <BlogInlineCode>AUTO_INCREMENT</BlogInlineCode> instead.
        </BlogLi>
        <BlogLi>
          <strong>UUID</strong> — universal identifiers. Requires the{" "}
          <BlogInlineCode>uuid-ossp</BlogInlineCode> or{" "}
          <BlogInlineCode>pgcrypto</BlogInlineCode> extension.
        </BlogLi>
        <BlogLi>
          <strong>JSONB</strong> — binary JSON, indexable with GIN. Enables
          efficient queries over internal JSON fields.
        </BlogLi>
        <BlogLi>
          <strong>ARRAY</strong> — native multi-dimensional array support:{" "}
          <BlogInlineCode>TEXT[]</BlogInlineCode>,{" "}
          <BlogInlineCode>INT[][]</BlogInlineCode>, etc.
        </BlogLi>
        <BlogLi>
          <strong>ENUM</strong> — enumerated types created with{" "}
          <BlogInlineCode>CREATE TYPE</BlogInlineCode>.
        </BlogLi>
        <BlogLi>
          <strong>CITEXT</strong> — case-insensitive text (requires the{" "}
          <BlogInlineCode>citext</BlogInlineCode> extension).
        </BlogLi>
        <BlogLi>
          <strong>TSVECTOR / TSQUERY</strong> — native full-text search with
          stemming and ranking support.
        </BlogLi>
        <BlogLi>
          <strong>INTERVAL</strong> — time intervals (e.g.,{" "}
          <BlogInlineCode>INTERVAL '3 days'</BlogInlineCode>).
        </BlogLi>
        <BlogLi>
          <strong>INET / CIDR / MACADDR</strong> — network types.
        </BlogLi>
        <BlogLi>
          <strong>Geometric</strong> — <BlogInlineCode>point</BlogInlineCode>,{" "}
          <BlogInlineCode>line</BlogInlineCode>,{" "}
          <BlogInlineCode>circle</BlogInlineCode>,{" "}
          <BlogInlineCode>polygon</BlogInlineCode>, and more.
        </BlogLi>
      </BlogUl>

      <BlogH2 id="advanced-create-table">Advanced CREATE TABLE</BlogH2>

      <BlogP>
        PostgreSQL lets you create tables with features that go far beyond the
        SQL standard:
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

-- Advanced indexes
CREATE INDEX idx_usuarios_email ON usuarios (email);
CREATE INDEX idx_usuarios_roles ON usuarios USING GIN (roles);
CREATE INDEX idx_usuarios_metadata ON usuarios USING GIN (metadata);`}</BlogCode>

      <BlogP>
        <BlogInlineCode>uuid_generate_v4()</BlogInlineCode> generates random
        UUIDs. <BlogInlineCode>CITEXT</BlogInlineCode> enables case-insensitive
        searches without <BlogInlineCode>LOWER()</BlogInlineCode>. GIN indexes
        on <BlogInlineCode>JSONB</BlogInlineCode> and{" "}
        <BlogInlineCode>TEXT[]</BlogInlineCode> enable efficient queries over
        semi-structured data.
      </BlogP>

      <BlogCallout type="warn">
        <strong>Be careful with UUIDs as primary keys.</strong> Random UUIDs can
        fragment indexes on very large tables. For tables with millions of rows,
        consider using <BlogInlineCode>uuid_generate_v7()</BlogInlineCode>{" "}
        (time-sequential) or a classic{" "}
        <BlogInlineCode>BIGSERIAL</BlogInlineCode>.
      </BlogCallout>

      <BlogH2 id="jsonb">JSONB in PostgreSQL</BlogH2>

      <BlogP>
        JSONB is one of PostgreSQL's flagship features. Unlike storing JSON as
        text, JSONB stores data in decomposed binary format, enabling indexing
        and efficient queries on internal fields:
      </BlogP>

      <BlogCode>{`INSERT INTO usuarios (nombre, email, metadata) VALUES
  ('Ana', 'ana@email.com',
   '{"theme": "dark", "notifications": true, "lang": "es"}'),
  ('Luis', 'luis@email.com',
   '{"theme": "light", "notifications": false, "lang": "en"}');

-- Query nested fields
SELECT nombre, metadata->>'theme' AS tema
FROM usuarios
WHERE metadata @> '{"notifications": true}';`}</BlogCode>

      <BlogP>Key JSONB operators:</BlogP>

      <BlogUl>
        <BlogLi>
          <BlogInlineCode>-&gt;</BlogInlineCode> — access as JSON (preserves
          type)
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>-&gt;&gt;</BlogInlineCode> — access as text
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>@&gt;</BlogInlineCode> — contains (the most powerful
          operator for filtering JSONB documents)
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>?|</BlogInlineCode> — any of the keys exist
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>?&</BlogInlineCode> — all keys exist
        </BlogLi>
      </BlogUl>

      <BlogP>
        Thanks to GIN indexes, these JSONB queries are as fast as traditional
        column queries, even on tables with millions of records.
      </BlogP>

      <BlogH2 id="full-text-search">Native Full-Text Search</BlogH2>

      <BlogP>
        PostgreSQL includes a powerful full-text search engine without needing
        Elasticsearch or external tools:
      </BlogP>

      <BlogCode>{`CREATE TABLE articulos (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  contenido TEXT NOT NULL,
  busqueda TSVECTOR
    GENERATED ALWAYS AS (
      to_tsvector('english', titulo || ' ' || contenido)
    ) STORED
);

CREATE INDEX idx_busqueda ON articulos USING GIN (busqueda);

-- Search articles containing "postgresql" AND "tutorial"
SELECT titulo
FROM articulos
WHERE busqueda @@ to_tsquery('english', 'postgresql & tutorial');`}</BlogCode>

      <BlogP>Key full-text search features:</BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Stemming</strong> — reduces words to their root ("running",
          "ran", "run" → "run").
        </BlogLi>
        <BlogLi>
          <strong>Ranking</strong> — sorts results by relevance using{" "}
          <BlogInlineCode>ts_rank()</BlogInlineCode>.
        </BlogLi>
        <BlogLi>
          <strong>Language dictionaries</strong> — supports English, Spanish,
          French, German, and more.
        </BlogLi>
        <BlogLi>
          <strong>Highlighting</strong> — extracts relevant snippets with{" "}
          <BlogInlineCode>ts_headline()</BlogInlineCode>.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="tip">
        <strong>Use GENERATED ALWAYS AS ... STORED columns</strong> for the
        search vector. This way the <BlogInlineCode>TSVECTOR</BlogInlineCode>{" "}
        updates automatically on every INSERT or UPDATE, without needing
        triggers or extra application logic.
      </BlogCallout>

      <BlogH2 id="explain-analyze">EXPLAIN ANALYZE and Performance</BlogH2>

      <BlogP>
        PostgreSQL offers professional-level performance analysis tools. The{" "}
        <BlogInlineCode>EXPLAIN ANALYZE</BlogInlineCode> command runs the query
        and shows the actual execution plan:
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

      <BlogP>Key concepts to understand:</BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Seq Scan</strong> — sequential scan of the entire table.
          Occurs when no index is available or PostgreSQL decides a full table
          read is cheaper.
        </BlogLi>
        <BlogLi>
          <strong>Index Scan</strong> — uses an index to locate specific rows.
          Much faster for selective queries.
        </BlogLi>
        <BlogLi>
          <strong>Bitmap Index Scan</strong> — combines multiple indexes then
          accesses rows. PostgreSQL uses this when multiple indexes are
          relevant.
        </BlogLi>
      </BlogUl>

      <BlogH3>VACUUM and maintenance</BlogH3>

      <BlogP>
        PostgreSQL uses MVCC, meaning updated or deleted rows are not physically
        removed immediately. The <BlogInlineCode>VACUUM</BlogInlineCode> command
        reclaims that space:
      </BlogP>

      <BlogCode>{`-- Reclaim space and update statistics
VACUUM ANALYZE usuarios;

-- View table statistics
SELECT schemaname, tablename, n_live_tup, n_dead_tup,
       last_vacuum, last_analyze
FROM pg_stat_user_tables
WHERE tablename = 'usuarios';`}</BlogCode>

      <BlogP>
        In modern PostgreSQL (9.6+), <BlogInlineCode>autovacuum</BlogInlineCode>{" "}
        is enabled by default and handles most cases automatically. However, for
        tables with high write rates, you may need to tune its configuration.
      </BlogP>

      <BlogCallout type="warn">
        <strong>Do not run VACUUM FULL in production without caution.</strong>{" "}
        It locks the table during the operation. Use{" "}
        <BlogInlineCode>VACUUM</BlogInlineCode> (without FULL) which is online
        and does not block reads or writes.
      </BlogCallout>

      <BlogH2 id="exercises">Practical Exercises</BlogH2>

      <BlogP>
        Put your knowledge to the test. Try to solve each exercise before
        checking the solution.
      </BlogP>

      <div className="space-y-3" id="exercises">
        <ExerciseCard
          description="Install PostgreSQL (or use Docker), create a database 'tienda', enable the uuid-ossp extension, and create a 'categorias' table with UUID id, name (VARCHAR 100), description (TEXT), and creado_en (TIMESTAMPTZ)."
          hint={
            'CREATE EXTENSION IF NOT EXISTS "uuid-ossp". For the UUID use UUID PRIMARY KEY DEFAULT uuid_generate_v4().'
          }
          level="Easy"
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
          title="Install, CREATE DATABASE, and UUID table"
        />

        <ExerciseCard
          description="Create a 'productos' table with id (UUID), nombre, precio, and atributos (JSONB). Insert 3 products with different attributes (color, weight, size available) and then query products that have a specific attribute using the @> operator."
          hint={
            'For JSONB insert use JSON string syntax. For filtering use WHERE atributos @> \'{"color": "red"}\'.'
          }
          level="Intermediate"
          num={2}
          solution={`CREATE TABLE productos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR(150) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  atributos JSONB DEFAULT '{}'
);

INSERT INTO productos (nombre, precio, atributos) VALUES
  ('T-Shirt', 25.99, '{"color": "red", "size": "M", "material": "cotton"}'),
  ('Sneakers', 89.99, '{"color": "black", "size": "42", "sport": "running"}'),
  ('Backpack', 45.50, '{"color": "blue", "capacity_l": 20, "waterproof": true}');

-- Red products
SELECT * FROM productos WHERE atributos @> '{"color": "red"}';

-- Waterproof products
SELECT * FROM productos WHERE atributos @> '{"waterproof": true}';`}
          title="JSONB query: insert and filter"
        />

        <ExerciseCard
          description="Create a 'documentos' table with TEXT content, an auto-generated TSVECTOR, and a GIN index. Insert 2 documents in English and search for those containing the words 'database' and 'tutorial'."
          hint="Use GENERATED ALWAYS AS (to_tsvector('english', contenido)) STORED. Query with @@ to_tsquery('english', 'database & tutorial')."
          level="Intermediate"
          num={3}
          solution={`CREATE TABLE documentos (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  contenido TEXT NOT NULL,
  busqueda TSVECTOR
    GENERATED ALWAYS AS (to_tsvector('english', titulo || ' ' || contenido)) STORED
);

CREATE INDEX idx_docs_busqueda ON documentos USING GIN (busqueda);

INSERT INTO documentos (titulo, contenido) VALUES
  ('Intro to Databases', 'Relational databases store structured information efficiently'),
  ('Advanced PostgreSQL', 'This tutorial covers advanced PostgreSQL concepts and tuning');

SELECT titulo FROM documentos
WHERE busqueda @@ to_tsquery('english', 'database & tutorial');`}
          title="Full-text search with TSVECTOR"
        />

        <ExerciseCard
          description="Create a 'ventas' table with 100,000 test rows (use generate_series). Without an index, run EXPLAIN ANALYZE for an email lookup. Then create an index and compare the execution plan."
          hint="generate_series(1,100000) generates rows. For unique emails: 'user' || i || '@email.com'. Compare Seq Scan vs Index Scan."
          level="Intermediate"
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

-- Without index (Seq Scan)
EXPLAIN ANALYZE SELECT * FROM ventas WHERE email = 'user50000@email.com';

-- Create index
CREATE INDEX idx_ventas_email ON ventas (email);

-- With index (Index Scan)
EXPLAIN ANALYZE SELECT * FROM ventas WHERE email = 'user50000@email.com';`}
          title="CREATE INDEX and EXPLAIN ANALYZE"
        />

        <ExerciseCard
          description="Create a 'cursos' table with a TEXT[] tags column. Insert courses with different tags. Search for courses containing the tag 'SQL' using ANY, then expand the tags of a course with UNNEST."
          hint="To search in an array: WHERE 'SQL' = ANY(tags). UNNEST(tags) expands the array into rows."
          level="Hard"
          num={5}
          solution={`CREATE TABLE cursos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(200) NOT NULL,
  tags TEXT[] DEFAULT '{}'
);

INSERT INTO cursos (nombre, tags) VALUES
  ('SQL from Scratch', ARRAY['SQL', 'Database', 'beginner']),
  ('Advanced PostgreSQL', ARRAY['SQL', 'PostgreSQL', 'performance']),
  ('MongoDB Basics', ARRAY['NoSQL', 'MongoDB', 'document']);

-- Search for courses with 'SQL' tag
SELECT nombre FROM cursos
WHERE 'SQL' = ANY(tags);

-- Expand tags of the first course
SELECT nombre, unnest(tags) AS tag
FROM cursos WHERE id = 1;`}
          title="Array operations: ANY and UNNEST"
        />

        <ExerciseCard
          description="Create an 'empleados' table with id, nombre, and manager_id (self-referencing). Insert a 3-level hierarchy and use a recursive CTE to get the full tree under a specific manager, showing the depth level."
          hint="A recursive CTE has two parts: the base case (WHERE manager_id IS NULL) and the recursive part that JOINs with the CTE. Use UNION ALL between them."
          level="Hard"
          num={6}
          solution={`CREATE TABLE empleados (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  manager_id INT REFERENCES empleados(id)
);

INSERT INTO empleados (nombre, manager_id) VALUES
  ('Anna', NULL),      -- CEO
  ('Carlos', 1),       -- VP → Anna
  ('Maria', 1),        -- VP → Anna
  ('Peter', 2),        -- Dev → Carlos
  ('Laura', 2),        -- Dev → Carlos
  ('Sofia', 3),        -- Design → Maria
  ('Diego', 4);        -- Jr → Peter

WITH RECURSIVE org_chart AS (
  -- Base case: the CEO (no manager)
  SELECT id, nombre, manager_id, 0 AS level
  FROM empleados
  WHERE manager_id IS NULL

  UNION ALL

  -- Recursive case: employees whose manager is in the previous level
  SELECT e.id, e.nombre, e.manager_id, o.level + 1
  FROM empleados e
  JOIN org_chart o ON e.manager_id = o.id
)
SELECT nombre,
       level,
       repeat('  ', level) || nombre AS tree
FROM org_chart
ORDER BY level, nombre;`}
          title="Recursive CTE for hierarchies"
        />
      </div>

      <BlogCallout type="tip">
        <strong>Keep learning:</strong> PostgreSQL's official documentation is
        one of the best in the entire open-source ecosystem. The book
        &ldquo;PostgreSQL: Up and Running&rdquo; by Regina Obe and Leo Hsu is an
        excellent next step.
      </BlogCallout>
    </article>
  );
}
