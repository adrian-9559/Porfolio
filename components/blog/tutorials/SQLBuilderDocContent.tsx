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

export default function SQLBuilderDocContent() {
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
          5 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        Guía del Constructor SQL
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Aprende a usar el Constructor SQL interactivo: parsea DDL, construye
        consultas visualmente y genera SELECT sin escribir una línea de SQL.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="que-es">¿Qué es el Constructor SQL?</BlogH2>

      <BlogP>
        El Constructor SQL es una herramienta interactiva que convierte
        sentencias <BlogInlineCode>CREATE TABLE</BlogInlineCode> en un esquema
        visual. Desde ahí puedes construir consultas{" "}
        <BlogInlineCode>SELECT</BlogInlineCode> cliqueando en los badges de cada
        columna — sin escribir SQL manualmente.
      </BlogP>

      <BlogP>
        Es ideal para quienes están aprendiendo SQL y quieren entender cómo se
        traducen las cláusulas a una consulta real, o para quien necesita
        generar queries rápidas sin recordar la sintaxis exacta.
      </BlogP>

      <BlogCallout type="info">
        El Constructor SQL está disponible en la sección de herramientas del
        blog. No requiere registro, pero si inicias sesión podrás guardar y
        recuperar tu historial de consultas.
      </BlogCallout>

      <BlogH2 id="ddl-parsing">Parseo de DDL</BlogH2>

      <BlogP>
        Todo empieza con tu DDL. Pega una o varias sentencias{" "}
        <BlogInlineCode>CREATE TABLE</BlogInlineCode> en el textarea y la
        herramienta las parsea automáticamente, detectando:
      </BlogP>

      <BlogUl>
        <BlogLi>Nombres de tabla y columna</BlogLi>
        <BlogLi>
          Tipos de datos (<BlogInlineCode>INT</BlogInlineCode>,{" "}
          <BlogInlineCode>VARCHAR</BlogInlineCode>,{" "}
          <BlogInlineCode>DECIMAL</BlogInlineCode>, etc.)
        </BlogLi>
        <BlogLi>
          Claves primarias inline (
          <BlogInlineCode>id INT PRIMARY KEY</BlogInlineCode>) y standalone (
          <BlogInlineCode>PRIMARY KEY (id)</BlogInlineCode>)
        </BlogLi>
        <BlogLi>
          Claves foráneas (<BlogInlineCode>REFERENCES</BlogInlineCode>)
        </BlogLi>
      </BlogUl>

      <BlogP>
        Si prefieres no escribir DDL, usa el botón{" "}
        <strong>"Cargar ejemplos"</strong> — hay esquemas precargados como{" "}
        <strong>Usuarios-Pedidos</strong> y{" "}
        <strong>Empleados-Departamentos</strong>.
      </BlogP>

      <BlogH2 id="clausulas">Cláusulas soportadas</BlogH2>

      <BlogP>
        Cada columna del esquema tiene cuatro badges que representan las
        cláusulas SQL. Los badges funcionan como interruptores: un clic los
        activa, otro clic los desactiva.
      </BlogP>

      <BlogH3 id="select">SELECT</BlogH3>
      <BlogP>
        Al activar el badge azul <strong>SELECT</strong> en una columna, esta se
        incluye en la lista de selección. Si no hay ninguna columna
        seleccionada, el generador produce{" "}
        <BlogInlineCode>SELECT *</BlogInlineCode>.
      </BlogP>

      <BlogH3 id="where">WHERE</BlogH3>
      <BlogP>
        El badge ámbar <strong>WHERE</strong> añade la columna a la cláusula
        WHERE. Al activarlo aparece un campo de texto donde escribes el valor
        del filtro. El operador es siempre <BlogInlineCode>=</BlogInlineCode>.
        Si el campo está vacío, la columna se ignora en el WHERE.
      </BlogP>

      <BlogH3 id="order-by">ORDER BY</BlogH3>
      <BlogP>
        El badge verde <strong>ORDER</strong> funciona con tres estados que
        cambian con cada clic: <strong>OFF → ASC → DESC → OFF</strong>. La
        etiqueta muestra la dirección actual:{" "}
        <BlogInlineCode>ORDER ↑</BlogInlineCode> para ascendente,{" "}
        <BlogInlineCode>ORDER ↓</BlogInlineCode> para descendente.
      </BlogP>

      <BlogH3 id="group-by">GROUP BY</BlogH3>
      <BlogP>
        El badge púrpura <strong>GROUP BY</strong> agrupa los resultados por la
        columna seleccionada. Útil para consultas de agregación combinadas con
        funciones como <BlogInlineCode>COUNT</BlogInlineCode>,{" "}
        <BlogInlineCode>SUM</BlogInlineCode> o{" "}
        <BlogInlineCode>AVG</BlogInlineCode> en las columnas de SELECT.
      </BlogP>

      <BlogH2 id="joins-automaticos">JOINs automáticos</BlogH2>

      <BlogP>
        La funcionalidad más potente del Constructor SQL es la generación
        automática de JOINs. Cuando seleccionas columnas de tablas relacionadas
        por una clave foránea (<BlogInlineCode>REFERENCES</BlogInlineCode>), la
        herramienta:
      </BlogP>

      <BlogUl>
        <BlogLi>
          Identifica la tabla principal (la que no tiene FK hacia otra tabla
          seleccionada) y la usa como <BlogInlineCode>FROM</BlogInlineCode>
        </BlogLi>
        <BlogLi>
          Genera los <BlogInlineCode>JOIN</BlogInlineCode> necesarios con la
          condición <BlogInlineCode>ON</BlogInlineCode> correcta
        </BlogLi>
        <BlogLi>
          Encadena múltiples JOINs si hay más de dos tablas relacionadas
        </BlogLi>
      </BlogUl>

      <BlogP>
        Por ejemplo, con las tablas <BlogInlineCode>usuarios</BlogInlineCode> y{" "}
        <BlogInlineCode>pedidos</BlogInlineCode> (donde{" "}
        <BlogInlineCode>pedidos.usuario_id</BlogInlineCode> referencia a{" "}
        <BlogInlineCode>usuarios.id</BlogInlineCode>), al seleccionar columnas
        de ambas obtienes:
      </BlogP>

      <BlogCode>{`SELECT
  usuarios.nombre,
  pedidos.producto
FROM usuarios
JOIN pedidos ON pedidos.usuario_id = usuarios.id;`}</BlogCode>

      <BlogH2 id="historial">Historial de consultas</BlogH2>

      <BlogP>
        Si inicias sesión, el Constructor SQL guarda automáticamente cada
        consulta que copias al portapapeles. Puedes acceder al historial desde
        el botón <strong>"Historial"</strong>:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Cargar</strong> — restaura una consulta anterior en el editor
          de SQL para revisarla o modificarla
        </BlogLi>
        <BlogLi>
          <strong>Eliminar</strong> — borra la consulta del historial
        </BlogLi>
      </BlogUl>

      <BlogP>
        El historial se almacena en la base de datos asociada a tu cuenta, por
        lo que persiste entre sesiones.
      </BlogP>

      <BlogH2 id="consejos">Consejos y buenas prácticas</BlogH2>

      <BlogUl>
        <BlogLi>
          <strong>Empieza con los ejemplos</strong> — si no tienes un DDL a
          mano, carga "Usuarios-Pedidos" para ver cómo funciona el constructor
        </BlogLi>
        <BlogLi>
          <strong>Una sola columna en SELECT + GROUP BY</strong> — es la forma
          más rápida de ver valores únicos en una tabla
        </BlogLi>
        <BlogLi>
          <strong>Prueba combinaciones</strong> — activa WHERE y ORDER BY en la
          misma columna para ver cómo se comporta la consulta
        </BlogLi>
        <BlogLi>
          <strong>El JOIN se genera automáticamente</strong> — no necesitas
          preocuparte por la sintaxis del JOIN, solo selecciona columnas de
          tablas relacionadas
        </BlogLi>
        <BlogLi>
          <strong>Usa el historial</strong> — si cometes un error, puedes
          recuperar una versión anterior de tu consulta
        </BlogLi>
      </BlogUl>

      <BlogCallout type="tip">
        El Constructor SQL es una herramienta didáctica. Úsalo para explorar
        cómo se construyen las consultas y, cuando te sientas cómodo, prueba a
        escribir el SQL a mano. La práctica es la clave.
      </BlogCallout>
    </article>
  );
}
