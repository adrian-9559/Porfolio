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

export default function DatabaseIntroContentEn() {
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
          Article
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
        What Is a Database?
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Definition, components, types, and evolution of structured data storage
        systems.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="definition">Definition</BlogH2>

      <BlogP>
        A database is an organized collection of structured data stored
        electronically. Unlike a flat file (like a CSV or a text document), a
        database is designed to persist, organize, and retrieve information
        efficiently, allowing multiple users and applications to access data
        concurrently in a controlled manner.
      </BlogP>

      <BlogP>
        The term is used both for the data set itself and for the Database
        Management System (DBMS) that administers it. Everyday examples include
        an e-commerce product catalog, a hospital's medical records, or bank
        account transactions.
      </BlogP>

      <BlogCallout type="info">
        <strong>Fun fact:</strong> By 2025, an estimated 463 exabytes of data
        will be generated each day worldwide. Without databases, managing that
        volume would simply be impossible.
      </BlogCallout>

      <BlogH2 id="key-features">Key Features</BlogH2>

      <BlogP>
        A modern database system offers a set of essential capabilities that go
        far beyond simple storage:
      </BlogP>

      <BlogH3>CRUD</BlogH3>
      <BlogP>
        The acronym CRUD (Create, Read, Update, Delete) represents the four
        fundamental operations on any persistent data set. Every database,
        regardless of its type, implements these operations at a minimum. In SQL
        they translate to{" "}
        <BlogInlineCode>INSERT</BlogInlineCode>,{" "}
        <BlogInlineCode>SELECT</BlogInlineCode>,{" "}
        <BlogInlineCode>UPDATE</BlogInlineCode>, and{" "}
        <BlogInlineCode>DELETE</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`-- Create a new user
INSERT INTO users (name, email, age)
VALUES ('John Smith', 'john@example.com', 28);

-- Read users older than 25
SELECT * FROM users WHERE age > 25;

-- Update a user's email
UPDATE users SET email = 'john.smith@example.com'
WHERE id = 1;

-- Delete a user
DELETE FROM users WHERE id = 1;`}</BlogCode>

      <BlogH3>Persistence</BlogH3>
      <BlogP>
        Data survives the lifecycle of the program that created it. This may
        seem obvious, but it is the fundamental difference between storing data
        in RAM (volatile) and on disk (persistent). A database guarantees that
        data is still there when the server restarts.
      </BlogP>

      <BlogH3>Concurrency control</BlogH3>
      <BlogP>
        Multiple users can read and write simultaneously without corrupting
        data. The DBMS manages locks and transaction isolation so that two
        simultaneous operations do not interfere with each other. Without this,
        two users buying the last item in stock could cause an oversell.
      </BlogP>

      <BlogH3>Data integrity</BlogH3>
      <BlogP>
        Databases enforce constraints that guarantee data validity: data types,
        unique values, foreign keys referencing existing records, default values,
        and custom validations. These rules prevent inconsistent data from
        entering the system.
      </BlogP>

      <BlogH3>Security</BlogH3>
      <BlogP>
        User authentication, role-based authorization, encryption in transit
        (TLS) and at rest, and access auditing. A database lets you define who
        can read, write, or modify the structure of each table or collection.
      </BlogP>

      <BlogH3>Backup and recovery</BlogH3>
      <BlogP>
        Modern DBMS include tools for periodic backups and failure recovery
        mechanisms. This ensures that even in the event of a power outage or
        hardware failure, data is not lost and can be restored to a consistent
        state.
      </BlogP>

      <BlogCallout type="tip">
        <strong>Golden rule:</strong> if your application saves data that must
        survive a server reboot, you need a database. A JSON file is not a
        database.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="components">Database Components</BlogH2>

      <BlogP>
        To understand how a database works, you need to know its fundamental
        parts:
      </BlogP>

      <BlogH3>Tables (Relational) / Collections (NoSQL)</BlogH3>
      <BlogP>
        Where data actually lives. In the relational model, each table represents
        an entity (users, products, orders) and each row an instance of that
        entity. Columns define the attributes. In NoSQL databases, collections
        group documents with flexible structure.
      </BlogP>

      <BlogH3>Indexes</BlogH3>
      <BlogP>
        Auxiliary structures that speed up searches. Without an index, finding a
        record requires scanning the entire table (full scan). An index works
        like a book index: it takes you directly to the page without flipping
        through the whole book. The trade-off is they slow down writes and take
        up space.
      </BlogP>

      <BlogH3>Queries</BlogH3>
      <BlogP>
        The language we use to interact with data. In relational databases we
        use SQL (Structured Query Language). NoSQL databases use specific APIs
        or query languages like MongoDB Query Language or GraphQL. A well-
        optimized query can mean the difference between a millisecond response
        and a minutes-long wait.
      </BlogP>

      <BlogH3>Transactions</BlogH3>
      <BlogP>
        A transaction groups several operations into a single atomic unit:
        either all execute or none do. For example, when transferring money
        between accounts, the debit and credit must happen together. If one
        fails, the transaction rolls back and data returns to its previous
        state.
      </BlogP>

      <BlogH3>Schemas</BlogH3>
      <BlogP>
        They define the data structure: which tables exist, what columns each
        has, what data types they accept, and what constraints apply. In SQL the
        schema is fixed and defined before inserting data (schema-on-write). In
        NoSQL the schema is usually implicit and flexible (schema-on-read).
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="brief-history">Brief History</BlogH2>

      <BlogP>
        The evolution of databases mirrors the evolution of computing itself:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>1960s — Hierarchical and network systems:</strong> early
          systems like IBM's IMS organized data in trees. They were fast but
          rigid: changing the structure required rewriting applications.
        </BlogLi>
        <BlogLi>
          <strong>1970 — Relational model:</strong> Edgar F. Codd, an IBM
          researcher, published{" "}
          <em>"A Relational Model of Data for Large Shared Data Banks"</em>,
          laying the mathematical foundation for the relational model. He
          proposed organizing data in tables related by keys, separating the
          physical representation from the logical one.
        </BlogLi>
        <BlogLi>
          <strong>1980s — SQL and commercial databases:</strong> Oracle, DB2,
          and SQL Server popularized SQL as the standard language. Relational
          databases became the industry standard.
        </BlogLi>
        <BlogLi>
          <strong>2000s — NoSQL:</strong> the growth of the internet,
          unstructured data, and the need to scale horizontally drove databases
          like MongoDB, Cassandra, and Redis. They trade strong consistency for
          scalability and flexibility.
        </BlogLi>
        <BlogLi>
          <strong>2010s — NewSQL and multi-model:</strong> systems like
          CockroachDB and Google Spanner try to combine NoSQL scalability with
          ACID guarantees. Multi-model databases (like PostgreSQL with
          extensions) support documents, graphs, and key-value within the same
          system.
        </BlogLi>
      </BlogUl>

      <BlogCode>{`-- The first commercial database language (Oracle, 1979)
SELECT emp.name, dept.name
FROM employees emp, departments dept
WHERE emp.dept_id = dept.id;
-- Same query 45 years later: almost identical.`}</BlogCode>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="types">Database Types</BlogH2>

      <BlogP>
        Today there are dozens of database systems, each optimized for a
        specific workload:
      </BlogP>

      <BlogH3>Relational (SQL)</BlogH3>
      <BlogP>
        Store data in tables with rows and columns, a fixed schema, and
        relationships defined through foreign keys. Ideal for systems requiring
        consistency and complex queries. Examples: PostgreSQL, MySQL, SQLite,
        Oracle, SQL Server.
      </BlogP>

      <BlogH3>Document</BlogH3>
      <BlogP>
        Store data as JSON/BSON documents, each with its own structure. They are
        flexible and easy to scale. Perfect for product catalogs, content
        management systems, and rapid prototyping. Examples: MongoDB, Couchbase,
        Firestore.
      </BlogP>

      <BlogH3>Key-Value</BlogH3>
      <BlogP>
        The simplest form of database. Each item has a unique key and an
        associated value (which can be anything: a string, JSON, binary blob).
        Ultra-fast, ideal for caches and sessions. Examples: Redis, DynamoDB,
        Riak.
      </BlogP>

      <BlogH3>Column-family</BlogH3>
      <BlogP>
        Store data in columns rather than rows, optimized for analytical queries
        over large volumes. Popular in Big Data. Examples: Apache Cassandra,
        HBase, ScyllaDB.
      </BlogP>

      <BlogH3>Graph</BlogH3>
      <BlogP>
        Store entities (nodes) and their relationships (edges). Ideal for social
        networks, recommendation engines, and fraud detection. Examples: Neo4j,
        ArangoDB, Amazon Neptune.
      </BlogP>

      <BlogH3>Time-series</BlogH3>
      <BlogP>
        Optimized for timestamped data: server metrics, IoT sensor readings,
        financial ticks. Examples: InfluxDB, TimescaleDB (PostgreSQL extension),
        Prometheus.
      </BlogP>

      <BlogCallout type="done">
        <strong>Databases vs. spreadsheets:</strong> although both organize data
        in rows and columns, a spreadsheet is not a database. Databases offer
        concurrency, transactions, referential integrity, indexes, security, and
        scale to millions of records without slowing down.
      </BlogCallout>
    </article>
  );
}
