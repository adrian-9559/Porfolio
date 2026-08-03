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

export default function SQLBasicsContent() {
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
          20 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        SQL desde cero
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        SQL (Structured Query Language) es el lenguaje estándar para comunicarse
        con bases de datos relacionales. Aprende desde las consultas más básicas
        hasta técnicas avanzadas con ejercicios prácticos.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="create-table">CREATE TABLE y tipos de datos</BlogH2>

      <BlogP>
        <BlogInlineCode>CREATE TABLE</BlogInlineCode> define la estructura de
        una nueva tabla. Especificas el nombre de la tabla, las columnas, sus
        tipos de datos y las restricciones (<em>constraints</em>). Es el
        equivalente a diseñar el plano antes de construir.
      </BlogP>

      <BlogCode>{`CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  edad INT CHECK (edad > 0),
  creado_en TIMESTAMP DEFAULT NOW()
);`}</BlogCode>

      <BlogH3>Tipos de datos principales</BlogH3>

      <BlogUl>
        <BlogLi>
          <strong>INT / INTEGER</strong> — números enteros (-2^31 a 2^31-1).
          Para rangos mayores usa <BlogInlineCode>BIGINT</BlogInlineCode>.
        </BlogLi>
        <BlogLi>
          <strong>SERIAL / BIGSERIAL</strong> — auto-incrementales. PostgreSQL
          los implementa como{" "}
          <BlogInlineCode>
            INTEGER GENERATED BY DEFAULT AS IDENTITY
          </BlogInlineCode>
          .
        </BlogLi>
        <BlogLi>
          <strong>VARCHAR(n)</strong> — texto de longitud variable con límite.
          Ej: <BlogInlineCode>VARCHAR(255)</BlogInlineCode>. Sin límite:{" "}
          <BlogInlineCode>TEXT</BlogInlineCode>.
        </BlogLi>
        <BlogLi>
          <strong>NUMERIC(p, s)</strong> — decimal exacto.{" "}
          <BlogInlineCode>p</BlogInlineCode> = dígitos totales,{" "}
          <BlogInlineCode>s</BlogInlineCode> = decimales. Ej:{" "}
          <BlogInlineCode>NUMERIC(10,2)</BlogInlineCode> = 99999999.99.
        </BlogLi>
        <BlogLi>
          <strong>DATE</strong> — solo fecha (2026-07-29).{" "}
          <BlogInlineCode>TIMESTAMP</BlogInlineCode> — fecha + hora.{" "}
          <BlogInlineCode>TIMESTAMPTZ</BlogInlineCode> — con zona horaria.
        </BlogLi>
        <BlogLi>
          <strong>BOOLEAN</strong> — true / false / NULL.
        </BlogLi>
        <BlogLi>
          <strong>UUID</strong> — identificador universal. Almacena 16 bytes, se
          genera con funciones como{" "}
          <BlogInlineCode>gen_random_uuid()</BlogInlineCode>.
        </BlogLi>
        <BlogLi>
          <strong>JSON / JSONB</strong> — datos JSON. JSONB es binario,
          indexable y más eficiente (PostgreSQL).
        </BlogLi>
      </BlogUl>

      <BlogH3>Constraints (restricciones)</BlogH3>

      <BlogP>
        Las constraints garantizan la integridad de los datos. Cada una tiene un
        propósito específico:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>PRIMARY KEY</strong> — identifica cada fila de forma única.
          Combina NOT NULL + UNIQUE. Una tabla solo puede tener una.
        </BlogLi>
        <BlogLi>
          <strong>FOREIGN KEY</strong> — referencia a otra tabla. Garantiza
          integridad referencial. Ej:{" "}
          <BlogInlineCode>
            usuario_id INT REFERENCES usuarios(id)
          </BlogInlineCode>
          . Puedes añadir <BlogInlineCode>ON DELETE CASCADE</BlogInlineCode>{" "}
          para borrar en cascada.
        </BlogLi>
        <BlogLi>
          <strong>UNIQUE</strong> — todos los valores en la columna deben ser
          distintos. Permite NULL (y los NULLs se consideran distintos entre
          sí).
        </BlogLi>
        <BlogLi>
          <strong>NOT NULL</strong> — la columna no puede tener valores nulos.
        </BlogLi>
        <BlogLi>
          <strong>CHECK</strong> — valida que los datos cumplan una condición
          booleana. Ej:{" "}
          <BlogInlineCode>
            CHECK (edad &gt;= 0 AND edad &lt; 150)
          </BlogInlineCode>
          .
        </BlogLi>
        <BlogLi>
          <strong>DEFAULT</strong> — valor por defecto cuando no se especifica.
          Ej: <BlogInlineCode>DEFAULT NOW()</BlogInlineCode>,{" "}
          <BlogInlineCode>DEFAULT 0</BlogInlineCode>.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="info">
        La <BlogInlineCode>SERIAL</BlogInlineCode> no es un tipo de dato real,
        sino un atajo que crea una columna INTEGER con DEFAULT que toma el
        siguiente valor de una secuencia. En PostgreSQL moderno se prefiere{" "}
        <BlogInlineCode>GENERATED AS IDENTITY</BlogInlineCode>.
      </BlogCallout>

      <BlogH3>ALTER TABLE y DROP TABLE</BlogH3>

      <BlogP>
        Una vez creada, puedes modificar la estructura con{" "}
        <BlogInlineCode>ALTER TABLE</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`-- Añadir columna
ALTER TABLE usuarios ADD COLUMN telefono VARCHAR(20);

-- Eliminar columna
ALTER TABLE usuarios DROP COLUMN telefono;

-- Cambiar tipo
ALTER TABLE usuarios ALTER COLUMN edad TYPE SMALLINT;

-- Añadir constraint
ALTER TABLE usuarios ADD CONSTRAINT chk_edad CHECK (edad >= 0);

-- Renombrar tabla
ALTER TABLE usuarios RENAME TO clientes;

-- Eliminar tabla (con datos)
DROP TABLE usuarios;

-- Vaciar tabla (sin estructura)
TRUNCATE TABLE usuarios;`}</BlogCode>

      <BlogP>
        <BlogInlineCode>DROP TABLE</BlogInlineCode> elimina la tabla y sus datos
        permanentemente. <BlogInlineCode>TRUNCATE</BlogInlineCode> solo vacía
        los datos pero mantiene la estructura — es más rápido que{" "}
        <BlogInlineCode>DELETE FROM</BlogInlineCode> porque no escanea filas ni
        dispara triggers.
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-6" />

      <BlogH2 id="insert">INSERT</BlogH2>

      <BlogP>
        <BlogInlineCode>INSERT INTO</BlogInlineCode> añade nuevas filas a una
        tabla. Puedes insertar una fila, varias, o incluso el resultado de una
        consulta:
      </BlogP>

      <BlogCode>{`-- Insertar una fila
INSERT INTO usuarios (nombre, email, edad) VALUES ('Ana', 'ana@email.com', 28);

-- Insertar múltiples filas en una sentencia
INSERT INTO usuarios (nombre, email, edad) VALUES
  ('Luis', 'luis@email.com', 35),
  ('María', 'maria@email.com', 42);

-- Insertar con SELECT (copia entre tablas)
INSERT INTO usuarios_backup (nombre, email, edad)
SELECT nombre, email, edad FROM usuarios WHERE activo = true;

-- INSERT con RETURNING (PostgreSQL)
INSERT INTO usuarios (nombre, email) VALUES ('Carlos', 'carlos@email.com')
RETURNING id, creado_en;`}</BlogCode>

      <BlogP>
        El <BlogInlineCode>RETURNING</BlogInlineCode> devuelve los valores
        insertados (o cualquier expresión) — muy útil para obtener el ID
        generado sin hacer una segunda consulta.
      </BlogP>

      <BlogCallout type="tip">
        Insertar múltiples filas en una sola sentencia es mucho más eficiente
        que hacer INSERTs individuales en bucle. La mayoría de motores tienen un
        límite práctico (~1000 filas por INSERT).
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-6" />

      <BlogH2 id="select">SELECT</BlogH2>

      <BlogP>
        <BlogInlineCode>SELECT</BlogInlineCode> es el comando más usado de SQL.
        Recupera datos de una o más tablas. Su estructura básica es:{" "}
        <BlogInlineCode>
          SELECT columnas FROM tabla WHERE condiciones ORDER BY columna LIMIT n
        </BlogInlineCode>
        .
      </BlogP>

      <BlogCode>{`-- Seleccionar todo
SELECT * FROM usuarios;

-- Columnas específicas con alias
SELECT nombre AS "Nombre completo", email AS Correo FROM usuarios;

-- Filtrar con WHERE
SELECT * FROM usuarios WHERE edad > 30;

-- Ordenar y limitar
SELECT * FROM usuarios ORDER BY edad DESC LIMIT 5;

-- Filtros combinados
SELECT * FROM usuarios
WHERE edad BETWEEN 25 AND 40
  AND email LIKE '%@gmail.com'
  AND ciudad IN ('Madrid', 'Barcelona')
ORDER BY nombre ASC;

-- DISTINCT: valores únicos
SELECT DISTINCT ciudad FROM usuarios;

-- CASE: lógica condicional en consultas
SELECT nombre,
  CASE
    WHEN edad < 18 THEN 'Menor'
    WHEN edad BETWEEN 18 AND 65 THEN 'Adulto'
    ELSE 'Jubilado'
  END AS grupo_edad
FROM usuarios;

-- COALESCE: valor por defecto si es NULL
SELECT nombre, COALESCE(telefono, 'No disponible') AS telefono FROM usuarios;`}</BlogCode>

      <BlogH3>Cláusula WHERE a fondo</BlogH3>

      <BlogP>Los operadores más usados en WHERE:</BlogP>

      <BlogUl>
        <BlogLi>
          <strong>=, &gt;, &lt;, &gt;=, &lt;=, &lt;&gt;</strong> — comparación
          (&lt;&gt; significa "distinto de")
        </BlogLi>
        <BlogLi>
          <strong>BETWEEN</strong> — rango inclusivo:{" "}
          <BlogInlineCode>edad BETWEEN 18 AND 65</BlogInlineCode>
        </BlogLi>
        <BlogLi>
          <strong>LIKE</strong> — patrones: <BlogInlineCode>%</BlogInlineCode>{" "}
          (cualquier secuencia), <BlogInlineCode>_</BlogInlineCode> (un
          carácter). Ej: <BlogInlineCode>nombre LIKE 'A%'</BlogInlineCode>{" "}
          (empieza con A)
        </BlogLi>
        <BlogLi>
          <strong>IN</strong> — conjunto:{" "}
          <BlogInlineCode>ciudad IN ('Madrid', 'Bcn')</BlogInlineCode>
        </BlogLi>
        <BlogLi>
          <strong>IS NULL / IS NOT NULL</strong> — comparación con nulos (no se
          usa = NULL ya que NULL no es igual a nada)
        </BlogLi>
        <BlogLi>
          <strong>AND / OR / NOT</strong> — lógica booleana. AND se evalúa antes
          que OR, usa paréntesis para agrupar
        </BlogLi>
      </BlogUl>

      <BlogCallout type="tip">
        Usa <BlogInlineCode>EXPLAIN ANALYZE</BlogInlineCode> delante de
        cualquier SELECT para ver cómo el motor ejecuta la consulta (índices,
        joins, escaneos) y detectar cuellos de botella. Ej:{" "}
        <BlogInlineCode>
          EXPLAIN ANALYZE SELECT * FROM usuarios WHERE email = 'ana@email.com';
        </BlogInlineCode>
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-6" />

      <BlogH2 id="update-delete">UPDATE y DELETE</BlogH2>

      <BlogP>
        <BlogInlineCode>UPDATE</BlogInlineCode> modifica filas existentes.{" "}
        <BlogInlineCode>DELETE</BlogInlineCode> las elimina. Ambos requieren{" "}
        <BlogInlineCode>WHERE</BlogInlineCode> para seleccionar qué filas
        afectar:
      </BlogP>

      <BlogCode>{`-- UPDATE básico
UPDATE usuarios SET edad = 29 WHERE nombre = 'Ana';

-- Múltiples columnas
UPDATE usuarios
SET edad = 30, ciudad = 'Madrid'
WHERE email = 'ana@email.com';

-- UPDATE con expresión
UPDATE productos SET precio = precio * 1.10 WHERE categoria = 'electrónica';

-- UPDATE con JOIN (PostgreSQL, MySQL)
UPDATE usuarios u
SET total_gastado = (SELECT SUM(total) FROM pedidos p WHERE p.usuario_id = u.id)
WHERE u.activo = true;

-- DELETE básico
DELETE FROM usuarios WHERE email IS NULL;

-- DELETE con subconsulta
DELETE FROM usuarios WHERE id NOT IN (SELECT usuario_id FROM pedidos);

-- RETURNING (PostgreSQL)
DELETE FROM usuarios WHERE edad < 18 RETURNING id, nombre;

-- TRUNCATE (vacía toda la tabla, más rápido que DELETE)
TRUNCATE TABLE usuarios;`}</BlogCode>

      <BlogCallout type="warn">
        Siempre usa <BlogInlineCode>WHERE</BlogInlineCode> en UPDATE y DELETE.
        Sin WHERE, la operación afectará a TODAS las filas de la tabla. Si
        realmente quieres vaciar la tabla, usa{" "}
        <BlogInlineCode>TRUNCATE</BlogInlineCode> que es más rápido y seguro.
      </BlogCallout>

      <BlogP>
        <BlogInlineCode>RETURNING</BlogInlineCode> (PostgreSQL) devuelve las
        filas modificadas o eliminadas. Es útil para auditoría, logs, o devolver
        datos al cliente sin una consulta adicional. Las filas se devuelven
        antes de aplicar DELETE, y después de aplicar UPDATE.
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-6" />

      <BlogH2 id="joins">JOINs</BlogH2>

      <BlogP>
        Los JOINs combinan filas de dos o más tablas basándose en una condición
        relacionada. Primero creamos una tabla de pedidos para los ejemplos:
      </BlogP>

      <BlogCode>{`CREATE TABLE pedidos (
  id SERIAL PRIMARY KEY,
  usuario_id INT REFERENCES usuarios(id),
  producto VARCHAR(150) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  fecha DATE DEFAULT CURRENT_DATE
);`}</BlogCode>

      <BlogH3>Tipos de JOIN</BlogH3>

      <BlogCode>{`-- INNER JOIN: solo filas que coinciden en ambas tablas
SELECT u.nombre, p.producto, p.total
FROM usuarios u
INNER JOIN pedidos p ON u.id = p.usuario_id;

-- LEFT JOIN: todas las filas de la izquierda + coincidencias de la derecha
SELECT u.nombre, COUNT(p.id) AS pedidos
FROM usuarios u
LEFT JOIN pedidos p ON u.id = p.usuario_id
GROUP BY u.id, u.nombre;

-- RIGHT JOIN: todas las filas de la derecha + coincidencias
SELECT u.nombre, p.producto
FROM usuarios u
RIGHT JOIN pedidos p ON u.id = p.usuario_id;

-- FULL OUTER JOIN: todas las filas de ambas tablas
SELECT u.nombre, p.producto
FROM usuarios u
FULL OUTER JOIN pedidos p ON u.id = p.usuario_id;

-- CROSS JOIN: producto cartesiano (cada fila de A con cada fila de B)
SELECT u.nombre, p.producto
FROM usuarios u
CROSS JOIN productos p;  -- 3 usuarios × 10 productos = 30 filas

-- SELF JOIN: una tabla con sí misma (ej: empleados y jefes)
SELECT e.nombre AS empleado, j.nombre AS jefe
FROM empleados e
LEFT JOIN empleados j ON e.jefe_id = j.id;`}</BlogCode>

      <BlogP>Visualmente, los JOINs se entienden como diagramas de Venn:</BlogP>

      <BlogUl>
        <BlogLi>
          <strong>INNER JOIN</strong> — la intersección (solo lo que existe en
          ambas)
        </BlogLi>
        <BlogLi>
          <strong>LEFT JOIN</strong> — todo el círculo izquierdo + intersección
        </BlogLi>
        <BlogLi>
          <strong>RIGHT JOIN</strong> — todo el círculo derecho + intersección
        </BlogLi>
        <BlogLi>
          <strong>FULL OUTER JOIN</strong> — ambos círculos completos, con o sin
          match
        </BlogLi>
        <BlogLi>
          <strong>CROSS JOIN</strong> — cada elemento de A combinado con cada
          elemento de B (sin condición)
        </BlogLi>
      </BlogUl>

      <BlogCallout type="tip">
        El <BlogInlineCode>ON</BlogInlineCode> define la condición de unión.
        Puedes filtrar también con <BlogInlineCode>WHERE</BlogInlineCode>{" "}
        después del JOIN. La diferencia es que{" "}
        <BlogInlineCode>ON</BlogInlineCode> filtra antes de la unión (afecta a
        qué filas se unen) y <BlogInlineCode>WHERE</BlogInlineCode> filtra
        después (afecta al resultado final).
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-6" />

      <BlogH2 id="group-by">GROUP BY y agregación</BlogH2>

      <BlogP>
        Las funciones de agregación resumen múltiples filas en un solo
        resultado. Combinadas con <BlogInlineCode>GROUP BY</BlogInlineCode>{" "}
        agrupan filas con valores comunes:
      </BlogP>

      <BlogCode>{`SELECT
  u.nombre,
  COUNT(p.id) AS total_pedidos,
  SUM(p.total) AS gasto_total,
  AVG(p.total) AS ticket_medio,
  MIN(p.total) AS pedido_minimo,
  MAX(p.total) AS pedido_maximo
FROM usuarios u
LEFT JOIN pedidos p ON u.id = p.usuario_id
GROUP BY u.id, u.nombre
HAVING COUNT(p.id) > 0
ORDER BY gasto_total DESC;`}</BlogCode>

      <BlogH3>Funciones de agregación</BlogH3>

      <BlogUl>
        <BlogLi>
          <strong>COUNT(*)</strong> — cuenta todas las filas del grupo.{" "}
          <BlogInlineCode>COUNT(columna)</BlogInlineCode> cuenta solo las no
          NULL. <BlogInlineCode>COUNT(DISTINCT columna)</BlogInlineCode> cuenta
          valores únicos.
        </BlogLi>
        <BlogLi>
          <strong>SUM(columna)</strong> — suma de valores numéricos. Ignora
          NULLs.
        </BlogLi>
        <BlogLi>
          <strong>AVG(columna)</strong> — promedio (media aritmética). Ignora
          NULLs.
        </BlogLi>
        <BlogLi>
          <strong>MIN / MAX</strong> — valor mínimo / máximo. Funciona con
          números, fechas y texto (orden alfabético).
        </BlogLi>
        <BlogLi>
          <strong>STRING_AGG(columna, delimitador)</strong> — concatena valores
          (PostgreSQL). Ej:{" "}
          <BlogInlineCode>STRING_AGG(producto, ', ')</BlogInlineCode>.
        </BlogLi>
      </BlogUl>

      <BlogH3>HAVING</BlogH3>

      <BlogP>
        <BlogInlineCode>HAVING</BlogInlineCode> es como{" "}
        <BlogInlineCode>WHERE</BlogInlineCode> pero para grupos. WHERE filtra
        filas individuales antes de agrupar; HAVING filtra grupos después de la
        agregación:
      </BlogP>

      <BlogCode>{`-- Válido: HAVING con agregación
SELECT usuario_id, COUNT(*) AS pedidos
FROM pedidos
GROUP BY usuario_id
HAVING COUNT(*) > 5;

-- Inválido (no se puede usar alias en HAVING en algunos motores):
-- HAVING pedidos > 5;

-- FILTER (PostgreSQL): agregación condicional
SELECT
  COUNT(*) AS total,
  COUNT(*) FILTER (WHERE total > 100) AS pedidos_grandes
FROM pedidos;`}</BlogCode>

      <BlogH3>ROLLUP, CUBE, GROUPING SETS</BlogH3>

      <BlogP>Extensiones de GROUP BY para subtotales y totales:</BlogP>

      <BlogCode>{`-- ROLLUP: subtotales jerárquicos (categoría → total)
SELECT categoria, SUM(precio) AS total
FROM productos
GROUP BY ROLLUP(categoria);

-- CUBE: todas las combinaciones
SELECT categoria, color, SUM(precio)
FROM productos
GROUP BY CUBE(categoria, color);`}</BlogCode>

      <hr className="border-black/8 dark:border-white/8 my-6" />

      <BlogH2 id="window-functions">Window Functions</BlogH2>

      <BlogP>
        Las funciones de ventana (<em>window functions</em>) realizan cálculos a
        través de un conjunto de filas relacionadas sin agruparlas en una sola
        salida. A diferencia de GROUP BY, cada fila conserva su identidad:
      </BlogP>

      <BlogCode>{`-- ROW_NUMBER: numeración dentro de cada grupo
SELECT nombre, departamento, salario,
  ROW_NUMBER() OVER (PARTITION BY departamento ORDER BY salario DESC) AS posicion
FROM empleados;

-- RANK: igual que ROW_NUMBER pero empata en valores iguales
SELECT producto, total,
  RANK() OVER (ORDER BY total DESC) AS ranking
FROM pedidos;

-- LAG / LEAD: acceder a filas anterior/siguiente
SELECT fecha, total,
  LAG(total) OVER (ORDER BY fecha) AS total_anterior,
  LEAD(total) OVER (ORDER BY fecha) AS total_siguiente
FROM pedidos;
-- Diferencia entre pedido actual y anterior
-- Puedes hacer: total - LAG(total) OVER (ORDER BY fecha) AS diferencia`}</BlogCode>

      <BlogP>
        Componentes de una window function:{" "}
        <BlogInlineCode>
          FUNCIÓN() OVER (PARTITION BY columna ORDER BY columna)
        </BlogInlineCode>
        . <BlogInlineCode>PARTITION BY</BlogInlineCode> divide en grupos
        (opcional), <BlogInlineCode>ORDER BY</BlogInlineCode> define el orden
        dentro de cada grupo.
      </BlogP>

      <BlogCallout type="tip">
        Las window functions son muy potentes para rankings, diferencias entre
        filas consecutivas, totales acumulados, y promedios móviles. Son una
        alternativa elegante a las subconsultas correlacionadas.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-6" />

      <BlogH2 id="subconsultas">Subconsultas y CTEs</BlogH2>

      <BlogH3>Subconsultas</BlogH3>

      <BlogP>
        Una subconsulta es un SELECT dentro de otro SELECT. Puede estar en
        WHERE, FROM, SELECT, o HAVING:
      </BlogP>

      <BlogCode>{`-- Subconsulta en WHERE (con IN)
SELECT * FROM usuarios
WHERE id IN (SELECT usuario_id FROM pedidos WHERE total > 100);

-- Subconsulta correlacionada (referencia a la consulta externa)
SELECT u.nombre, u.email,
  (SELECT COUNT(*) FROM pedidos p WHERE p.usuario_id = u.id) AS total_pedidos
FROM usuarios u;

-- Subconsulta en FROM (tabla derivada)
SELECT AVG(gasto) AS gasto_medio
FROM (
  SELECT usuario_id, SUM(total) AS gasto
  FROM pedidos
  GROUP BY usuario_id
) AS resumen;

-- EXISTS (más eficiente que IN para correlacionadas)
SELECT * FROM usuarios u
WHERE EXISTS (SELECT 1 FROM pedidos p WHERE p.usuario_id = u.id AND p.total > 100);`}</BlogCode>

      <BlogP>
        <BlogInlineCode>EXISTS</BlogInlineCode> vs{" "}
        <BlogInlineCode>IN</BlogInlineCode>: EXISTS es más rápido cuando la
        subconsulta puede devolver muchas filas, porque para en cuanto encuentra
        la primera coincidencia. IN es más legible para conjuntos pequeños.
      </BlogP>

      <BlogH3>CTEs (Common Table Expressions)</BlogH3>

      <BlogP>
        Las CTEs con <BlogInlineCode>WITH</BlogInlineCode> son como "variables
        temporales" para consultas. Hacen el SQL más legible y permiten la
        recursividad:
      </BlogP>

      <BlogCode>{`-- CTE básica
WITH clientes_top AS (
  SELECT usuario_id, SUM(total) AS gasto
  FROM pedidos
  GROUP BY usuario_id
  ORDER BY gasto DESC
  LIMIT 3
)
SELECT u.nombre, ct.gasto
FROM clientes_top ct
JOIN usuarios u ON u.id = ct.usuario_id;

-- CTE recursiva (ej: jerarquía de categorías)
WITH RECURSIVE categorias_tree AS (
  -- Caso base: categorías raíz
  SELECT id, nombre, padre_id, 1 AS nivel
  FROM categorias WHERE padre_id IS NULL
  UNION ALL
  -- Paso recursivo: hijos
  SELECT c.id, c.nombre, c.padre_id, ct.nivel + 1
  FROM categorias c
  JOIN categorias_tree ct ON c.padre_id = ct.id
)
SELECT * FROM categorias_tree ORDER BY nivel, nombre;`}</BlogCode>

      <BlogP>
        Las CTES recursivas son ideales para estructuras jerárquicas: árboles de
        categorías, organigramas, foros de comentarios, rutas de navegación, y
        cualquier dato con auto-referencia.
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-6" />

      <BlogH2 id="set-operators">Operadores de conjunto</BlogH2>

      <BlogP>
        SQL también permite operaciones de conjunto (como en matemáticas) entre
        los resultados de dos consultas:
      </BlogP>

      <BlogCode>{`-- UNION: combina resultados, elimina duplicados
SELECT nombre, email FROM usuarios_activos
UNION
SELECT nombre, email FROM usuarios_inactivos;

-- UNION ALL: combina resultados, conserva duplicados
SELECT ciudad FROM usuarios_madrid
UNION ALL
SELECT ciudad FROM usuarios_barcelona;

-- INTERSECT: filas comunes en ambas consultas
SELECT producto FROM pedidos_2025
INTERSECT
SELECT producto FROM pedidos_2026;

-- EXCEPT: filas en la primera pero no en la segunda
SELECT email FROM usuarios
EXCEPT
SELECT email FROM usuarios_verificados;`}</BlogCode>

      <BlogP>
        Para que funcionen, ambas consultas deben tener el mismo número de
        columnas y tipos de datos compatibles.{" "}
        <BlogInlineCode>UNION ALL</BlogInlineCode> es más rápido que{" "}
        <BlogInlineCode>UNION</BlogInlineCode> porque evita el paso de eliminar
        duplicados.
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Ejercicios</BlogH2>

      <BlogP>
        Practica lo aprendido con estos ejercicios. Intenta resolverlos antes de
        mirar la solución.
      </BlogP>

      <div className="space-y-3">
        <ExerciseCard
          description="Obtén todos los usuarios mayores de 25 años, mostrando solo nombre y email, ordenados por edad descendente."
          hint="Usa WHERE, ORDER BY y SELECT con columnas específicas."
          level="Básico"
          num={1}
          solution="SELECT nombre, email FROM usuarios WHERE edad > 25 ORDER BY edad DESC;"
          title="SELECT básico"
        />

        <ExerciseCard
          description="Inserta 3 nuevos usuarios en una sola sentencia con nombres, emails y edades distintas."
          hint="Usa VALUES con múltiples filas separadas por comas."
          level="Básico"
          num={2}
          solution={`INSERT INTO usuarios (nombre, email, edad) VALUES
  ('Carlos', 'carlos@email.com', 31),
  ('Elena', 'elena@email.com', 27),
  ('Pedro', 'pedro@email.com', 45);`}
          title="INSERT múltiple"
        />

        <ExerciseCard
          description="Actualiza la edad del usuario 'Ana' a 29 años."
          hint="No olvides el WHERE."
          level="Básico"
          num={3}
          solution="UPDATE usuarios SET edad = 29 WHERE nombre = 'Ana';"
          title="UPDATE con condición"
        />

        <ExerciseCard
          description="Lista todos los pedidos con el nombre del usuario que los hizo. Muestra nombre, producto y total."
          hint="Haz JOIN de usuarios y pedidos por usuario_id."
          level="Intermedio"
          num={4}
          solution={`SELECT u.nombre, p.producto, p.total
FROM usuarios u
INNER JOIN pedidos p ON u.id = p.usuario_id;`}
          title="INNER JOIN"
        />

        <ExerciseCard
          description="Muestra todos los usuarios y cuántos pedidos ha hecho cada uno, incluyendo los que no tienen pedidos (deben aparecer con 0)."
          hint="Usa LEFT JOIN + COUNT. COUNT(p.id) cuenta solo los que tienen match."
          level="Intermedio"
          num={5}
          solution={`SELECT u.nombre, COUNT(p.id) AS num_pedidos
FROM usuarios u
LEFT JOIN pedidos p ON u.id = p.usuario_id
GROUP BY u.id, u.nombre
ORDER BY num_pedidos DESC;`}
          title="LEFT JOIN con COUNT"
        />

        <ExerciseCard
          description="Encuentra los usuarios que han gastado más de 100€ en total en pedidos."
          hint="Agrupa por usuario, suma los totales, y filtra con HAVING."
          level="Intermedio"
          num={6}
          solution={`SELECT u.nombre, SUM(p.total) AS gasto_total
FROM usuarios u
JOIN pedidos p ON u.id = p.usuario_id
GROUP BY u.id, u.nombre
HAVING SUM(p.total) > 100;`}
          title="GROUP BY con HAVING"
        />

        <ExerciseCard
          description="Usando ROW_NUMBER, numera los pedidos de cada usuario ordenados por total descendente (el pedido más caro de cada usuario debe ser el 1)."
          hint="PARTITION BY usuario_id ORDER BY total DESC."
          level="Avanzado"
          num={7}
          solution={`SELECT u.nombre, p.producto, p.total,
  ROW_NUMBER() OVER (PARTITION BY p.usuario_id ORDER BY p.total DESC) AS num_pedido
FROM usuarios u
JOIN pedidos p ON u.id = p.usuario_id;`}
          title="Window Function"
        />

        <ExerciseCard
          description="Usando WITH RECURSIVE, genera una secuencia de números del 1 al 10."
          hint="Caso base: SELECT 1. Paso recursivo: SELECT n+1 WHERE n < 10."
          level="Avanzado"
          num={8}
          solution={`WITH RECURSIVE numeros(n) AS (
  SELECT 1
  UNION ALL
  SELECT n + 1 FROM numeros WHERE n < 10
)
SELECT * FROM numeros;`}
          title="CTE recursiva"
        />

        <ExerciseCard
          description="Usa EXISTS para encontrar usuarios que hayan hecho al menos un pedido."
          hint="SELECT 1 dentro del EXISTS."
          level="Avanzado"
          num={9}
          solution={`SELECT * FROM usuarios u
WHERE EXISTS (SELECT 1 FROM pedidos p WHERE p.usuario_id = u.id);`}
          title="EXISTS vs IN"
        />

        <ExerciseCard
          description="Combina la lista de emails de usuarios y de contactos (una tabla 'contactos' con email) en un solo resultado, conservando duplicados."
          hint="UNION ALL no elimina duplicados."
          level="Intermedio"
          num={10}
          solution={`SELECT email FROM usuarios
UNION ALL
SELECT email FROM contactos;`}
          title="UNION ALL"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        SQL es una habilidad fundamental para cualquier desarrollador. Dedica
        tiempo a practicar estas queries y se convertirán en algo natural. Para
        profundizar, explora los tutoriales de MySQL y PostgreSQL donde verás
        las particularidades de cada motor.
      </BlogP>
    </article>
  );
}
