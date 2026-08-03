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

export default function DatabaseIntroContent() {
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
          6 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        ¿Qué es una base de datos?
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Definición, componentes, tipos y evolución de los sistemas de
        almacenamiento estructurado de datos.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="definicion">Definición</BlogH2>

      <BlogP>
        Una base de datos es una colección organizada de datos estructurados que
        se almacenan electrónicamente. A diferencia de un archivo plano (como un
        CSV o un documento de texto), una base de datos está diseñada para
        persistir, organizar y recuperar información de forma eficiente,
        permitiendo que múltiples usuarios y aplicaciones accedan a los datos de
        manera concurrente y controlada.
      </BlogP>

      <BlogP>
        El término se usa tanto para referirse al propio conjunto de datos como
        al sistema gestor de bases de datos (DBMS) que lo administra. Ejemplos
        cotidianos incluyen el catálogo de productos de un e-commerce, el
        historial médico de un hospital o los movimientos de una cuenta
        bancaria.
      </BlogP>

      <BlogCallout type="info">
        <strong>Dato curioso:</strong> Se estima que para 2025 se generarán 463
        exabytes de datos al día a nivel mundial. Sin bases de datos, gestionar
        ese volumen sería simplemente imposible.
      </BlogCallout>

      <BlogH2 id="funcionalidades">Funcionalidades clave</BlogH2>

      <BlogP>
        Un sistema de base de datos moderno ofrece un conjunto de capacidades
        esenciales que van mucho más allá del simple almacenamiento:
      </BlogP>

      <BlogH3>CRUD</BlogH3>
      <BlogP>
        El acrónimo CRUD (Create, Read, Update, Delete) representa las cuatro
        operaciones fundamentales sobre cualquier conjunto de datos
        persistentes. Toda base de datos, sin importar su tipo, implementa estas
        operaciones como mínimo. En SQL se traducen en{" "}
        <BlogInlineCode>INSERT</BlogInlineCode>,{" "}
        <BlogInlineCode>SELECT</BlogInlineCode>,{" "}
        <BlogInlineCode>UPDATE</BlogInlineCode> y{" "}
        <BlogInlineCode>DELETE</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`-- Crear un nuevo usuario
INSERT INTO usuarios (nombre, email, edad)
VALUES ('Ana García', 'ana@example.com', 28);

-- Leer usuarios mayores de 25 años
SELECT * FROM usuarios WHERE edad > 25;

-- Actualizar el email de un usuario
UPDATE usuarios SET email = 'ana.garcia@example.com'
WHERE id = 1;

-- Eliminar un usuario
DELETE FROM usuarios WHERE id = 1;`}</BlogCode>

      <BlogH3>Persistencia</BlogH3>
      <BlogP>
        Los datos sobreviven al ciclo de vida del programa que los creó. Esto
        parece obvio, pero es la diferencia fundamental entre almacenar datos en
        memoria RAM (volátil) y hacerlo en disco (persistente). Una base de
        datos garantiza que los datos sigan ahí cuando el servidor se reinicie.
      </BlogP>

      <BlogH3>Control de concurrencia</BlogH3>
      <BlogP>
        Múltiples usuarios pueden leer y escribir simultáneamente sin corromper
        los datos. El DBMS gestiona los bloqueos y el aislamiento de
        transacciones para que dos operaciones simultáneas no interfieran entre
        sí. Sin esto, dos usuarios comprando el último artículo de un stock
        podrían provocar una sobreventa.
      </BlogP>

      <BlogH3>Integridad de datos</BlogH3>
      <BlogP>
        Las bases de datos imponen restricciones (constraints) que garantizan
        que los datos sean válidos: tipos de datos, valores únicos, claves
        foráneas que referencian registros existentes, valores por defecto y
        validaciones personalizadas. Estas reglas evitan que datos
        inconsistentes entren al sistema.
      </BlogP>

      <BlogH3>Seguridad</BlogH3>
      <BlogP>
        Autenticación de usuarios, autorización por roles, cifrado en tránsito
        (TLS) y en reposo, y auditoría de accesos. Una base de datos permite
        definir quién puede leer, escribir o modificar la estructura de cada
        tabla o colección.
      </BlogP>

      <BlogH3>Backup y recuperación</BlogH3>
      <BlogP>
        Los DBMS modernos incluyen herramientas para realizar copias de
        seguridad (backups) periódicas y mecanismos de recuperación ante fallos.
        Esto asegura que incluso ante un corte eléctrico o un error de hardware,
        los datos no se pierdan y puedan restaurarse a un estado consistente.
      </BlogP>

      <BlogCallout type="tip">
        <strong>Regla de oro:</strong> si tu aplicación guarda datos que deben
        sobrevivir a un reinicio del servidor, necesitas una base de datos. Un
        archivo JSON no es una base de datos.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="componentes">Componentes de una base de datos</BlogH2>

      <BlogP>
        Para entender cómo funciona una base de datos, hay que conocer sus
        partes fundamentales:
      </BlogP>

      <BlogH3>Tablas (relacionales) / Colecciones (NoSQL)</BlogH3>
      <BlogP>
        Donde realmente viven los datos. En el modelo relacional, cada tabla
        representa una entidad (usuarios, productos, pedidos) y cada fila una
        instancia de esa entidad. Las columnas definen los atributos. En bases
        de datos NoSQL, las colecciones agrupan documentos con estructura
        flexible.
      </BlogP>

      <BlogH3>Índices</BlogH3>
      <BlogP>
        Estructuras auxiliares que aceleran las búsquedas. Sin un índice,
        encontrar un registro requiere recorrer toda la tabla (full scan). Un
        índice funciona como el índice de un libro: te lleva directamente a la
        página sin tener que hojearlo entero. La contrapartida es que ralentizan
        las escrituras y ocupan espacio.
      </BlogP>

      <BlogH3>Consultas (queries)</BlogH3>
      <BlogP>
        El lenguaje con el que interactuamos con los datos. En bases de datos
        relacionales usamos SQL (Structured Query Language). En NoSQL se usan
        APIs específicas o lenguajes de consulta como MongoDB Query Language o
        GraphQL. Una query bien optimizada puede marcar la diferencia entre una
        respuesta en milisegundos y una en minutos.
      </BlogP>

      <BlogH3>Transacciones</BlogH3>
      <BlogP>
        Una transacción agrupa varias operaciones en una unidad atómica: o se
        ejecutan todas o no se ejecuta ninguna. Por ejemplo, al transferir
        dinero entre cuentas, el débito y el crédito deben ocurrir juntos. Si
        una falla, la transacción se revierte (rollback) y los datos vuelven al
        estado anterior.
      </BlogP>

      <BlogH3>Esquemas</BlogH3>
      <BlogP>
        Definen la estructura de los datos: qué tablas existen, qué columnas
        tiene cada una, qué tipos de datos aceptan, qué restricciones se
        aplican. En SQL el esquema es fijo y se define antes de insertar datos
        (schema-on- write). En NoSQL el esquema suele ser implícito y flexible
        (schema-on- read).
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="historia">Historia breve</BlogH2>

      <BlogP>
        La evolución de las bases de datos refleja la propia evolución de la
        informática:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Años 1960 — Sistemas jerárquicos y de red:</strong> los
          primeros sistemas como IMS (IBM) organizaban los datos en árboles.
          Eran rápidos pero rígidos: cambiar la estructura requería reescribir
          las aplicaciones.
        </BlogLi>
        <BlogLi>
          <strong>1970 — Modelo relacional:</strong> Edgar F. Codd, investigador
          de IBM, publicó el artículo{" "}
          <em>"A Relational Model of Data for Large Shared Data Banks"</em>,{" "}
          sentando las bases matemáticas del modelo relacional. Proponía
          organizar los datos en tablas relacionadas mediante claves, separando
          la representación física de la lógica.
        </BlogLi>
        <BlogLi>
          <strong>Años 1980 — SQL y bases de datos comerciales:</strong> Oracle,
          DB2 y SQL Server popularizaron SQL como lenguaje estándar. Las bases
          de datos relacionales se convirtieron en el estándar de la industria.
        </BlogLi>
        <BlogLi>
          <strong>Años 2000 — NoSQL:</strong> el crecimiento de internet, los
          datos no estructurados y la necesidad de escalar horizontalmente
          impulsaron bases de datos como MongoDB, Cassandra y Redis. Sacrifican
          consistencia fuerte por escalabilidad y flexibilidad.
        </BlogLi>
        <BlogLi>
          <strong>Años 2010 — NewSQL y multi-modelo:</strong> sistemas como
          CockroachDB y Google Spanner intentan combinar la escalabilidad de
          NoSQL con las garantías ACID de SQL. Las bases de datos multi-modelo
          (como PostgreSQL con extensiones) soportan documentos, grafos y clave-
          valor dentro del mismo sistema.
        </BlogLi>
      </BlogUl>

      <BlogCode>{`-- El primer lenguaje de base de datos comercial (Oracle, 1979)
SELECT emp.name, dept.name
FROM employees emp, departments dept
WHERE emp.dept_id = dept.id;
-- Misma query 45 años después: casi idéntica.`}</BlogCode>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="tipos">Tipos de bases de datos</BlogH2>

      <BlogP>
        Hoy existen decenas de sistemas de bases de datos, cada uno optimizado
        para un tipo de carga de trabajo:
      </BlogP>

      <BlogH3>Relacionales (SQL)</BlogH3>
      <BlogP>
        Almacenan datos en tablas con filas y columnas, con un esquema fijo y
        relaciones definidas mediante claves foráneas. Ideales para sistemas que
        requieren consistencia y consultas complejas. Ejemplos: PostgreSQL,
        MySQL, SQLite, Oracle, SQL Server.
      </BlogP>

      <BlogH3>Documentales</BlogH3>
      <BlogP>
        Almacenan datos como documentos JSON/BSON, cada uno con su propia
        estructura. Son flexibles y fáciles de escalar. Perfectas para catálogos
        de productos, sistemas de contenido y prototipos rápidos. Ejemplo:
        MongoDB, Couchbase, Firestore.
      </BlogP>

      <BlogH3>Clave-Valor</BlogH3>
      <BlogP>
        La forma más simple de base de datos. Cada ítem tiene una clave única y
        un valor asociado (que puede ser cualquier cosa: un string, un JSON, un
        blob binario). Ultrarrápidas, ideales para cachés y sesiones. Ejemplos:
        Redis, DynamoDB, Riak.
      </BlogP>

      <BlogH3>Column-family</BlogH3>
      <BlogP>
        Almacenan datos en columnas en lugar de filas, optimizadas para
        consultas analíticas sobre grandes volúmenes. Populares en Big Data.
        Ejemplos: Apache Cassandra, HBase, ScyllaDB.
      </BlogP>

      <BlogH3>Grafos</BlogH3>
      <BlogP>
        Almacenan entidades (nodos) y sus relaciones (aristas). Ideales para
        redes sociales, motores de recomendación y detección de fraudes.
        Ejemplos: Neo4j, ArangoDB, Amazon Neptune.
      </BlogP>

      <BlogH3>Time-series</BlogH3>
      <BlogP>
        Optimizadas para datos con marca temporal: métricas de servidores,
        lecturas de sensores IoT, ticks financieros. Ejemplos: InfluxDB,
        TimescaleDB (extensión de PostgreSQL), Prometheus.
      </BlogP>

      <BlogCallout type="done">
        <strong>Bases de datos vs. hojas de cálculo:</strong> aunque ambas
        organizan datos en filas y columnas, una hoja de cálculo no es una base
        de datos. Las bases de datos ofrecen concurrencia, transacciones,
        integridad referencial, índices, seguridad y escalan a millones de
        registros sin ralentizarse.
      </BlogCallout>
    </article>
  );
}
