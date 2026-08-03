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

export default function MySQLGuideContent() {
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
        MySQL: instalación y primeros pasos
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Guía completa de instalación, configuración y primeros pasos con MySQL.
        Aprende a crear bases de datos, tablas, usuarios y a ejecutar consultas
        desde cero.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="intro">Introducción</BlogH2>

      <BlogP>
        MySQL es el sistema gestor de bases de datos relacional (SGBD)
        open-source más popular del mundo. Creado por MySQL AB en 1995 y
        adquirido posteriormente por Sun Microsystems (hoy Oracle), es el motor
        de datos detrás de millones de aplicaciones web. MySQL forma parte del
        stack LAMP (Linux, Apache, MySQL, PHP/Python/Perl), el estándar de facto
        para el desarrollo web durante décadas.
      </BlogP>

      <BlogP>
        Aunque PostgreSQL ha ganado terreno en los últimos años, MySQL sigue
        siendo la opción predilecta para proyectos que priorizan velocidad de
        lectura, replicación sencilla y un ecosistema maduro de herramientas. Es
        usado por empresas como Meta, Netflix y Airbnb.
      </BlogP>

      <BlogCallout type="info">
        <strong>MySQL vs PostgreSQL:</strong> MySQL históricamente ha sido más
        rápido en lecturas simples y tiene una configuración más sencilla.
        PostgreSQL ofrece más funcionalidades avanzadas (JSONB, full-text search
        nativo, CTEs recursivas). La elección depende del proyecto.
      </BlogCallout>

      <BlogH2 id="instalacion">Instalación</BlogH2>

      <BlogP>
        MySQL está disponible en todos los sistemas operativos principales. Aquí
        tienes las formas más comunes de instalarlo:
      </BlogP>

      <BlogH3>macOS (Homebrew)</BlogH3>
      <BlogCode>{`brew install mysql
brew services start mysql`}</BlogCode>

      <BlogH3>Docker</BlogH3>
      <BlogP>
        La forma más limpia y aislada de ejecutar MySQL, ideal para desarrollo:
      </BlogP>
      <BlogCode>{`docker run --name mysql \\
  -e MYSQL_ROOT_PASSWORD=root \\
  -p 3306:3306 \\
  -d mysql:8`}</BlogCode>

      <BlogH3>Linux (Ubuntu/Debian)</BlogH3>
      <BlogCode>{`sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql`}</BlogCode>

      <BlogH3>Verificar la instalación</BlogH3>
      <BlogP>
        Una vez instalado, comprueba que todo funciona correctamente:
      </BlogP>
      <BlogCode>{`mysql --version
# mysql  Ver 8.0.36 for macos14 on x86_64 (Homebrew)`}</BlogCode>

      <BlogH2 id="primeros-comandos">Primeros comandos</BlogH2>

      <BlogP>
        Conéctate al servidor MySQL como usuario root y empieza a explorar:
      </BlogP>

      <BlogCode>{`mysql -u root -p
-- Te pedirá la contraseña que configuraste

CREATE DATABASE mi_proyecto;
USE mi_proyecto;

CREATE USER 'dev'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON mi_proyecto.* TO 'dev'@'localhost';
FLUSH PRIVILEGES;

-- Ver bases de datos y tablas
SHOW DATABASES;
SHOW TABLES;
DESCRIBE nombre_tabla;`}</BlogCode>

      <BlogCallout type="warn">
        <strong>Nunca uses root en producción.</strong> Crea siempre un usuario
        específico con los permisos mínimos necesarios para cada aplicación.
      </BlogCallout>

      <BlogH2 id="tipos-de-datos">Tipos de datos en MySQL</BlogH2>

      <BlogP>
        MySQL ofrece una amplia variedad de tipos de datos. Conocerlos es clave
        para diseñar esquemas eficientes:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Numéricos:</strong> <BlogInlineCode>INT</BlogInlineCode>,{" "}
          <BlogInlineCode>BIGINT</BlogInlineCode>,{" "}
          <BlogInlineCode>DECIMAL(10,2)</BlogInlineCode>,{" "}
          <BlogInlineCode>FLOAT</BlogInlineCode>,{" "}
          <BlogInlineCode>BOOLEAN</BlogInlineCode> (en realidad{" "}
          <BlogInlineCode>TINYINT(1)</BlogInlineCode>)
        </BlogLi>
        <BlogLi>
          <strong>Cadenas:</strong>{" "}
          <BlogInlineCode>VARCHAR(255)</BlogInlineCode>,{" "}
          <BlogInlineCode>TEXT</BlogInlineCode>,{" "}
          <BlogInlineCode>CHAR(n)</BlogInlineCode>,{" "}
          <BlogInlineCode>ENUM('a','b')</BlogInlineCode>
        </BlogLi>
        <BlogLi>
          <strong>Fecha/Hora:</strong> <BlogInlineCode>DATETIME</BlogInlineCode>
          , <BlogInlineCode>TIMESTAMP</BlogInlineCode>,{" "}
          <BlogInlineCode>DATE</BlogInlineCode>,{" "}
          <BlogInlineCode>TIME</BlogInlineCode>,{" "}
          <BlogInlineCode>YEAR</BlogInlineCode>
        </BlogLi>
        <BlogLi>
          <strong>Especiales:</strong> <BlogInlineCode>JSON</BlogInlineCode>{" "}
          (validado pero no tan potente como JSONB de PostgreSQL),{" "}
          <BlogInlineCode>SET</BlogInlineCode>,{" "}
          <BlogInlineCode>BLOB</BlogInlineCode>
        </BlogLi>
      </BlogUl>

      <BlogCallout type="info">
        <strong>Diferencias clave con PostgreSQL:</strong> MySQL no tiene un
        tipo <BlogInlineCode>SERIAL</BlogInlineCode> nativo (usa{" "}
        <BlogInlineCode>AUTO_INCREMENT</BlogInlineCode>), no soporta arrays
        nativos, y aunque soporta JSON, no tiene un equivalente a{" "}
        <BlogInlineCode>JSONB</BlogInlineCode> con índices GIN. Sin embargo,
        MySQL es generalmente más rápido en operaciones simples de lectura.
      </BlogCallout>

      <BlogH2 id="create-table">CREATE TABLE con detalles MySQL</BlogH2>

      <BlogP>
        La creación de tablas en MySQL incluye opciones específicas del motor de
        almacenamiento. Aquí un ejemplo completo:
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
        La cláusula <BlogInlineCode>ENGINE</BlogInlineCode> define el motor de
        almacenamiento:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>InnoDB</strong> — el motor por defecto desde MySQL 5.5.
          Soporta transacciones (ACID), claves foráneas, row-level locking y
          recuperación ante fallos. Es la opción recomendada para la mayoría de
          los casos.
        </BlogLi>
        <BlogLi>
          <strong>MyISAM</strong> — más antiguo, no soporta transacciones ni
          FKs, pero ofrece búsquedas full-text nativas (sin necesidad de motores
          externos). Fue el motor por defecto antes de MySQL 5.5.
        </BlogLi>
        <BlogLi>
          <strong>MEMORY</strong> — almacena los datos en RAM, ideal para tablas
          temporales o cachés. Los datos se pierden al reiniciar el servidor.
        </BlogLi>
      </BlogUl>

      <BlogP>
        El charset <BlogInlineCode>utf8mb4</BlogInlineCode> es el estándar
        actual. Soporta caracteres Unicode completos, incluyendo emojis. Usa
        siempre <BlogInlineCode>utf8mb4</BlogInlineCode> en lugar del obsoleto{" "}
        <BlogInlineCode>utf8</BlogInlineCode> (que solo soporta 3 bytes).
      </BlogP>

      <BlogCallout type="tip">
        <strong>Buenas prácticas al crear tablas:</strong> usa siempre InnoDB +
        utf8mb4. Define explícitamente <BlogInlineCode>NOT NULL</BlogInlineCode>{" "}
        en campos obligatorios y valores por defecto donde tenga sentido. Esto
        evita sorpresas y mejora el rendimiento de las consultas.
      </BlogCallout>

      <BlogH2 id="schema-ejemplo">Schema completo de ejemplo</BlogH2>

      <BlogP>
        Un sistema real de e-commerce con cuatro tablas relacionadas mediante
        claves foráneas:
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

      <BlogH3>Consultas útiles con el schema</BlogH3>
      <BlogCode>{`-- Total gastado por cada usuario
SELECT u.nombre, SUM(p.total) AS total_gastado
FROM usuarios u
JOIN pedidos p ON u.id = p.usuario_id
GROUP BY u.id, u.nombre
ORDER BY total_gastado DESC;

-- Productos más vendidos
SELECT pr.nombre, SUM(dp.cantidad) AS unidades_vendidas
FROM detalle_pedidos dp
JOIN productos pr ON dp.producto_id = pr.id
GROUP BY pr.id, pr.nombre
ORDER BY unidades_vendidas DESC
LIMIT 10;`}</BlogCode>

      <BlogH2 id="herramientas">Herramientas para MySQL</BlogH2>

      <BlogP>
        Más allá de la terminal, existen herramientas gráficas que facilitan el
        trabajo diario:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>MySQL Workbench</strong> — la herramienta oficial de Oracle.
          Incluye modelado ER, administración de servidores y editor de
          consultas. Gratuita y multiplataforma.
        </BlogLi>
        <BlogLi>
          <strong>TablePlus</strong> — cliente moderno con interfaz limpia.
          Soporta MySQL, PostgreSQL, Redis y más. Rápido, con atajos de teclado
          y multi-pestaña. De pago, pero con prueba gratuita.
        </BlogLi>
        <BlogLi>
          <strong>DBeaver</strong> — cliente universal open-source. Soporta
          decenas de bases de datos, incluyendo MySQL. Ideal si trabajas con
          múltiples motores.
        </BlogLi>
        <BlogLi>
          <strong>phpMyAdmin</strong> — interfaz web clásica, preinstalada en
          muchos entornos de hosting compartido. Sencilla pero funcional.
        </BlogLi>
      </BlogUl>

      <BlogH2 id="ejercicios">Ejercicios prácticos</BlogH2>

      <BlogP>
        Pon a prueba lo aprendido con estos ejercicios. Intenta resolverlos por
        tu cuenta antes de mirar la solución.
      </BlogP>

      <div className="space-y-3" id="ejercicios">
        <ExerciseCard
          description="Crea una base de datos llamada 'blog' y dentro una tabla 'articulos' con los campos: id (entero auto-incrementable), titulo (VARCHAR 200), contenido (TEXT), publicado (BOOLEAN con default FALSE) y creado_en (TIMESTAMP)."
          hint="Usa CREATE DATABASE, luego USE, luego CREATE TABLE. Para BOOLEAN usa TINYINT(1) o BOOL."
          level="Básico"
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
          title="Crear base de datos y tabla"
        />

        <ExerciseCard
          description="Inserta al menos 3 artículos en la tabla 'articulos' del ejercicio anterior. Varía los valores: uno publicado, otro no, y uno con fecha explícita."
          hint="Usa INSERT INTO articulos (campo1, campo2) VALUES (valor1, valor2). Para fecha explícita usa 'YYYY-MM-DD HH:MM:SS'."
          level="Básico"
          num={2}
          solution={`INSERT INTO articulos (titulo, contenido, publicado, creado_en) VALUES
  ('Introducción a MySQL', 'Contenido del artículo...', TRUE, DEFAULT),
  ('Bases de datos NoSQL', 'Contenido...', FALSE, DEFAULT),
  ('Historia de SQL', 'Contenido...', TRUE, '2024-01-15 10:00:00');

SELECT * FROM articulos;`}
          title="INSERT con datos reales"
        />

        <ExerciseCard
          description="Usando el schema de e-commerce (usuarios, pedidos, detalle_pedidos, productos), obtén el nombre del usuario, el nombre del producto, la cantidad y el precio unitario de todos los pedidos entregados."
          hint="Necesitas JOIN entre las 4 tablas. Filtra por estado = 'entregado' en la tabla pedidos."
          level="Intermedio"
          num={3}
          solution={`SELECT u.nombre AS usuario, pr.nombre AS producto,
       dp.cantidad, dp.precio_unitario
FROM usuarios u
JOIN pedidos p ON u.id = p.usuario_id
JOIN detalle_pedidos dp ON p.id = dp.pedido_id
JOIN productos pr ON dp.producto_id = pr.id
WHERE p.estado = 'entregado';`}
          title="SELECT con JOIN de 3 tablas"
        />

        <ExerciseCard
          description="Encuentra todos los usuarios que han realizado al menos un pedido. Usa EXISTS en lugar de JOIN para practicar subconsultas correlacionadas."
          hint="La subconsulta debe referenciar el id del usuario de la consulta exterior. EXISTS devuelve TRUE si la subconsulta devuelve algún registro."
          level="Intermedio"
          num={4}
          solution={`SELECT u.id, u.nombre, u.email
FROM usuarios u
WHERE EXISTS (
  SELECT 1 FROM pedidos p WHERE p.usuario_id = u.id
);`}
          title="Subconsulta con EXISTS"
        />

        <ExerciseCard
          description="Agrupa las ventas por categoría de producto y muestra el total de unidades vendidas, incluyendo un subtotal general con ROLLUP. Ordena el resultado."
          hint="ROLLUP se añade después de GROUP BY. Con GROUP BY categoria, ROLLUP añade una fila extra con el total general donde categoria es NULL."
          level="Avanzado"
          num={5}
          solution={`SELECT
  COALESCE(pr.categoria, 'TOTAL') AS categoria,
  SUM(dp.cantidad) AS unidades_vendidas
FROM detalle_pedidos dp
JOIN productos pr ON dp.producto_id = pr.id
GROUP BY pr.categoria WITH ROLLUP;`}
          title="GROUP BY con ROLLUP"
        />

        <ExerciseCard
          description="Exporta los datos de la tabla 'productos' a un archivo CSV en el servidor. El archivo debe tener campos separados por coma y cada fila en una línea nueva. Luego intenta importarlo de vuelta con LOAD DATA INFILE."
          hint={
            "INTO OUTFILE necesita privilegios FILE. Especifica FIELDS TERMINATED BY ',' y ENCLOSED BY '\"'. La ruta debe ser absoluta y escribible por el usuario de MySQL."
          }
          level="Avanzado"
          num={6}
          solution={`-- Exportar
SELECT * FROM productos
INTO OUTFILE '/tmp/productos_export.csv'
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\\n';

-- Importar (en una tabla nueva o existente)
LOAD DATA INFILE '/tmp/productos_export.csv'
INTO TABLE productos_backup
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\\n'
IGNORE 1 ROWS;`}
          title="Exportar datos con INTO OUTFILE"
        />
      </div>

      <BlogCallout type="tip">
        <strong>Práctica constante:</strong> la mejor forma de aprender SQL es
        escribir consultas a diario. Crea tus propios datasets de prueba y
        experimenta con diferentes tipos de JOIN, subconsultas y funciones de
        agregación.
      </BlogCallout>
    </article>
  );
}
