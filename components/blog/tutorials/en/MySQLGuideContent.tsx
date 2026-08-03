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

export default function MySQLGuideContentEn() {
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
          10 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        MySQL: Installation and First Steps
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Complete guide to installing, configuring, and getting started with
        MySQL. Learn how to create databases, tables, users, and run queries
        from scratch.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="intro">Introduction</BlogH2>

      <BlogP>
        MySQL is the most popular open-source relational database management
        system (RDBMS) in the world. Created by MySQL AB in 1995 and later
        acquired by Sun Microsystems (now Oracle), it powers millions of web
        applications. MySQL is a core component of the LAMP stack (Linux,
        Apache, MySQL, PHP/Python/Perl), the de facto standard for web
        development for decades.
      </BlogP>

      <BlogP>
        Although PostgreSQL has gained ground in recent years, MySQL remains the
        go-to choice for projects prioritizing read speed, simple replication,
        and a mature tool ecosystem. It is used by companies like Meta, Netflix,
        and Airbnb.
      </BlogP>

      <BlogCallout type="info">
        <strong>MySQL vs PostgreSQL:</strong> MySQL has historically been faster
        for simple reads and easier to configure. PostgreSQL offers more
        advanced features (JSONB, native full-text search, recursive CTEs). The
        choice depends on your project needs.
      </BlogCallout>

      <BlogH2 id="installation">Installation</BlogH2>

      <BlogP>
        MySQL is available on all major operating systems. Here are the most
        common ways to install it:
      </BlogP>

      <BlogH3>macOS (Homebrew)</BlogH3>
      <BlogCode>{`brew install mysql
brew services start mysql`}</BlogCode>

      <BlogH3>Docker</BlogH3>
      <BlogP>
        The cleanest, most isolated way to run MySQL — ideal for development:
      </BlogP>
      <BlogCode>{`docker run --name mysql \\
  -e MYSQL_ROOT_PASSWORD=root \\
  -p 3306:3306 \\
  -d mysql:8`}</BlogCode>

      <BlogH3>Linux (Ubuntu/Debian)</BlogH3>
      <BlogCode>{`sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql`}</BlogCode>

      <BlogH3>Verify the installation</BlogH3>
      <BlogP>Once installed, check everything works properly:</BlogP>
      <BlogCode>{`mysql --version
# mysql  Ver 8.0.36 for macos14 on x86_64 (Homebrew)`}</BlogCode>

      <BlogH2 id="first-commands">First Commands</BlogH2>

      <BlogP>Connect to the MySQL server as root and start exploring:</BlogP>

      <BlogCode>{`mysql -u root -p
-- It will prompt for the password you set

CREATE DATABASE mi_proyecto;
USE mi_proyecto;

CREATE USER 'dev'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON mi_proyecto.* TO 'dev'@'localhost';
FLUSH PRIVILEGES;

-- List databases and tables
SHOW DATABASES;
SHOW TABLES;
DESCRIBE table_name;`}</BlogCode>

      <BlogCallout type="warn">
        <strong>Never use root in production.</strong> Always create a dedicated
        user with the minimum privileges required for each application.
      </BlogCallout>

      <BlogH2 id="data-types">MySQL Data Types</BlogH2>

      <BlogP>
        MySQL offers a wide variety of data types. Understanding them is key to
        designing efficient schemas:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Numeric:</strong> <BlogInlineCode>INT</BlogInlineCode>,{" "}
          <BlogInlineCode>BIGINT</BlogInlineCode>,{" "}
          <BlogInlineCode>DECIMAL(10,2)</BlogInlineCode>,{" "}
          <BlogInlineCode>FLOAT</BlogInlineCode>,{" "}
          <BlogInlineCode>BOOLEAN</BlogInlineCode> (actually{" "}
          <BlogInlineCode>TINYINT(1)</BlogInlineCode>)
        </BlogLi>
        <BlogLi>
          <strong>Strings:</strong>{" "}
          <BlogInlineCode>VARCHAR(255)</BlogInlineCode>,{" "}
          <BlogInlineCode>TEXT</BlogInlineCode>,{" "}
          <BlogInlineCode>CHAR(n)</BlogInlineCode>,{" "}
          <BlogInlineCode>ENUM('a','b')</BlogInlineCode>
        </BlogLi>
        <BlogLi>
          <strong>Date/Time:</strong> <BlogInlineCode>DATETIME</BlogInlineCode>,{" "}
          <BlogInlineCode>TIMESTAMP</BlogInlineCode>,{" "}
          <BlogInlineCode>DATE</BlogInlineCode>,{" "}
          <BlogInlineCode>TIME</BlogInlineCode>,{" "}
          <BlogInlineCode>YEAR</BlogInlineCode>
        </BlogLi>
        <BlogLi>
          <strong>Special:</strong> <BlogInlineCode>JSON</BlogInlineCode>{" "}
          (validated but not as powerful as PostgreSQL's JSONB),{" "}
          <BlogInlineCode>SET</BlogInlineCode>,{" "}
          <BlogInlineCode>BLOB</BlogInlineCode>
        </BlogLi>
      </BlogUl>

      <BlogCallout type="info">
        <strong>Key differences from PostgreSQL:</strong> MySQL does not have a
        native <BlogInlineCode>SERIAL</BlogInlineCode> type (it uses{" "}
        <BlogInlineCode>AUTO_INCREMENT</BlogInlineCode>), does not support
        native arrays, and although it supports JSON, it has no equivalent of
        <BlogInlineCode>JSONB</BlogInlineCode> with GIN indexes. However, MySQL
        is generally faster for simple read operations.
      </BlogCallout>

      <BlogH2 id="create-table">CREATE TABLE with MySQL specifics</BlogH2>

      <BlogP>
        Creating tables in MySQL includes storage-engine-specific options. Here
        is a complete example:
      </BlogP>

      <BlogCode>{`CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  categoria ENUM('electronica', 'ropa', 'hogar') DEFAULT 'electronica',
  stock INT DEFAULT 0 CHECK (stock >= 0),
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`}</BlogCode>

      <BlogP>
        The <BlogInlineCode>ENGINE</BlogInlineCode> clause defines the storage
        engine:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>InnoDB</strong> — the default engine since MySQL 5.5. Supports
          transactions (ACID), foreign keys, row-level locking, and crash
          recovery. Recommended for most use cases.
        </BlogLi>
        <BlogLi>
          <strong>MyISAM</strong> — older engine, no transactions or FKs, but
          offers native full-text search. Was the default before MySQL 5.5.
        </BlogLi>
        <BlogLi>
          <strong>MEMORY</strong> — stores data in RAM, ideal for temporary
          tables or caches. Data is lost on server restart.
        </BlogLi>
      </BlogUl>

      <BlogP>
        The <BlogInlineCode>utf8mb4</BlogInlineCode> charset is the current
        standard. It supports full Unicode characters, including emojis. Always
        use <BlogInlineCode>utf8mb4</BlogInlineCode> instead of the deprecated{" "}
        <BlogInlineCode>utf8</BlogInlineCode> (which only supports 3 bytes).
      </BlogP>

      <BlogCallout type="tip">
        <strong>Best practices when creating tables:</strong> always use InnoDB
        + utf8mb4. Explicitly define <BlogInlineCode>NOT NULL</BlogInlineCode>{" "}
        on required fields and set sensible defaults. This prevents surprises
        and improves query performance.
      </BlogCallout>

      <BlogH2 id="example-schema">Complete Example Schema</BlogH2>

      <BlogP>
        A real e-commerce system with four tables linked by foreign keys:
      </BlogP>

      <BlogCode>{`CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  categoria ENUM('electronica', 'ropa', 'hogar') DEFAULT 'electronica',
  stock INT DEFAULT 0,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  total DECIMAL(12,2) NOT NULL,
  estado ENUM('pendiente', 'enviado', 'entregado') DEFAULT 'pendiente',
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE detalle_pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT NOT NULL,
  producto_id INT NOT NULL,
  cantidad INT NOT NULL CHECK (cantidad > 0),
  precio_unitario DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (producto_id) REFERENCES productos(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`}</BlogCode>

      <BlogH3>Useful queries with this schema</BlogH3>
      <BlogCode>{`-- Total spent by each user
SELECT u.nombre, SUM(p.total) AS total_gastado
FROM usuarios u
JOIN pedidos p ON u.id = p.usuario_id
GROUP BY u.id, u.nombre
ORDER BY total_gastado DESC;

-- Best-selling products
SELECT pr.nombre, SUM(dp.cantidad) AS unidades_vendidas
FROM detalle_pedidos dp
JOIN productos pr ON dp.producto_id = pr.id
GROUP BY pr.id, pr.nombre
ORDER BY unidades_vendidas DESC
LIMIT 10;`}</BlogCode>

      <BlogH2 id="tools">MySQL Tools</BlogH2>

      <BlogP>
        Beyond the terminal, graphical tools make daily work easier:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>MySQL Workbench</strong> — the official Oracle tool. Includes
          ER modeling, server administration, and a query editor. Free and
          cross-platform.
        </BlogLi>
        <BlogLi>
          <strong>TablePlus</strong> — a modern client with a clean interface.
          Supports MySQL, PostgreSQL, Redis, and more. Fast, with keyboard
          shortcuts and multi-tab support. Paid, with a free trial.
        </BlogLi>
        <BlogLi>
          <strong>DBeaver</strong> — a universal open-source client. Supports
          dozens of databases, including MySQL. Ideal if you work with multiple
          engines.
        </BlogLi>
        <BlogLi>
          <strong>phpMyAdmin</strong> — the classic web interface, pre-installed
          in many shared hosting environments. Simple yet functional.
        </BlogLi>
      </BlogUl>

      <BlogH2 id="exercises">Practical Exercises</BlogH2>

      <BlogP>
        Put your knowledge to the test with these exercises. Try to solve them
        on your own before checking the solution.
      </BlogP>

      <div className="space-y-3" id="exercises">
        <ExerciseCard
          description="Create a database called 'blog' and inside it a table 'articulos' with fields: id (auto-increment integer), titulo (VARCHAR 200), contenido (TEXT), publicado (BOOLEAN default FALSE), and creado_en (TIMESTAMP)."
          hint="Use CREATE DATABASE, then USE, then CREATE TABLE. For BOOLEAN use TINYINT(1) or BOOL."
          level="Easy"
          num={1}
          solution={`CREATE DATABASE blog;
USE blog;

CREATE TABLE articulos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  contenido TEXT,
  publicado BOOL DEFAULT FALSE,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`}
          title="Create database and table"
        />

        <ExerciseCard
          description="Insert at least 3 articles into the 'articulos' table from the previous exercise. Vary the values: one published, one not, and one with an explicit date."
          hint="Use INSERT INTO articulos (col1, col2) VALUES (val1, val2). For explicit dates use 'YYYY-MM-DD HH:MM:SS'."
          level="Easy"
          num={2}
          solution={`INSERT INTO articulos (titulo, contenido, publicado, creado_en) VALUES
  ('Introduction to MySQL', 'Article content...', TRUE, DEFAULT),
  ('NoSQL Databases', 'Content...', FALSE, DEFAULT),
  ('History of SQL', 'Content...', TRUE, '2024-01-15 10:00:00');

SELECT * FROM articulos;`}
          title="INSERT with real data"
        />

        <ExerciseCard
          description="Using the e-commerce schema (usuarios, pedidos, detalle_pedidos, productos), get the user name, product name, quantity, and unit price for all delivered orders."
          hint="You need JOINs across all 4 tables. Filter by estado = 'entregado' in the pedidos table."
          level="Intermediate"
          num={3}
          solution={`SELECT u.nombre AS usuario, pr.nombre AS producto,
       dp.cantidad, dp.precio_unitario
FROM usuarios u
JOIN pedidos p ON u.id = p.usuario_id
JOIN detalle_pedidos dp ON p.id = dp.pedido_id
JOIN productos pr ON dp.producto_id = pr.id
WHERE p.estado = 'entregado';`}
          title="SELECT with 3-table JOIN"
        />

        <ExerciseCard
          description="Find all users who have placed at least one order. Use EXISTS instead of JOIN to practice correlated subqueries."
          hint="The subquery must reference the outer query's user id. EXISTS returns TRUE if the subquery returns any rows."
          level="Intermediate"
          num={4}
          solution={`SELECT u.id, u.nombre, u.email
FROM usuarios u
WHERE EXISTS (
  SELECT 1 FROM pedidos p WHERE p.usuario_id = u.id
);`}
          title="Subquery with EXISTS"
        />

        <ExerciseCard
          description="Group sales by product category and show the total units sold, including a grand total subtotal using ROLLUP. Order the results."
          hint="ROLLUP is added after GROUP BY. With GROUP BY categoria, ROLLUP adds an extra row with the grand total where categoria is NULL."
          level="Hard"
          num={5}
          solution={`SELECT
  COALESCE(pr.categoria, 'TOTAL') AS categoria,
  SUM(dp.cantidad) AS unidades_vendidas
FROM detalle_pedidos dp
JOIN productos pr ON dp.producto_id = pr.id
GROUP BY pr.categoria WITH ROLLUP;`}
          title="GROUP BY with ROLLUP"
        />

        <ExerciseCard
          description="Export the 'productos' table data to a CSV file on the server. The file should have comma-separated fields and each row on a new line. Then try importing it back with LOAD DATA INFILE."
          hint={
            "INTO OUTFILE requires the FILE privilege. Specify FIELDS TERMINATED BY ',' and ENCLOSED BY '\"'. The path must be absolute and writable by the MySQL user."
          }
          level="Hard"
          num={6}
          solution={`-- Export
SELECT * FROM productos
INTO OUTFILE '/tmp/productos_export.csv'
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\\n';

-- Import (into a new or existing table)
LOAD DATA INFILE '/tmp/productos_export.csv'
INTO TABLE productos_backup
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\\n'
IGNORE 1 ROWS;`}
          title="Export data with INTO OUTFILE"
        />
      </div>

      <BlogCallout type="tip">
        <strong>Practice daily:</strong> the best way to learn SQL is to write
        queries every day. Create your own test datasets and experiment with
        different types of JOINs, subqueries, and aggregate functions.
      </BlogCallout>
    </article>
  );
}
