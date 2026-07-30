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

export default function SQLvsNoSQLContentEn() {
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
          8 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        SQL vs NoSQL: Which One to Choose?
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Complete comparison between relational and non-relational databases:
        differences, advantages, and when to use each.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="sql">SQL: Relational Databases</BlogH2>

      <BlogP>
        SQL (Structured Query Language) databases are the traditional standard.
        They organize data into tables with rows and columns, where each table
        represents an entity and relationships between tables are defined
        through foreign keys (<BlogInlineCode>FOREIGN KEY</BlogInlineCode>).
      </BlogP>

      <BlogH3>Fixed schema</BlogH3>
      <BlogP>
        In SQL, the schema is defined in advance: you know exactly which columns
        each table has and what data types they accept before inserting the
        first record. This provides predictability and allows the engine to
        optimize storage and queries.
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

      <BlogH3>ACID transactions</BlogH3>
      <BlogP>
        Relational databases comply with ACID properties, making them ideal for
        systems where data integrity is critical:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Atomicity:</strong> each transaction runs completely or not at
          all. No intermediate states.
        </BlogLi>
        <BlogLi>
          <strong>Consistency:</strong> transactions take the database from one
          valid state to another, respecting all constraints.
        </BlogLi>
        <BlogLi>
          <strong>Isolation:</strong> concurrent transactions do not affect each
          other. The result is the same as if they ran sequentially.
        </BlogLi>
        <BlogLi>
          <strong>Durability:</strong> once committed, the transaction persists
          even in the event of a system failure.
        </BlogLi>
      </BlogUl>

      <BlogH3>Relationships and JOINs</BlogH3>
      <BlogP>
        The ability to relate tables through{" "}
        <BlogInlineCode>JOIN</BlogInlineCode> is one of SQL's great advantages.
        It allows you to efficiently combine data from multiple tables in a
        single query:
      </BlogP>

      <BlogCode>{`SELECT users.name, orders.total, orders.status
FROM users
JOIN orders ON users.id = orders.user_id
WHERE orders.total > 100
ORDER BY orders.total DESC;`}</BlogCode>

      <BlogH3>Vertical scaling</BlogH3>
      <BlogP>
        SQL databases primarily scale vertically: more CPU, more RAM, faster
        disks on a single server. Although clustering and replication solutions
        exist, horizontal scaling remains complex in the relational world.
      </BlogP>

      <BlogCallout type="tip">
        <strong>When to use SQL?</strong> Banking systems, ERPs, invoicing,
        inventory, any project with well-defined relationships and a need for
        strong consistency.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="nosql">NoSQL: Non-Relational Databases</BlogH2>

      <BlogP>
        NoSQL (Not Only SQL) encompasses a family of databases that emerged to
        cover cases where SQL was not the best choice: horizontal scaling,
        flexible schemas, and high speed with large data volumes.
      </BlogP>

      <BlogH3>Flexible schema</BlogH3>
      <BlogP>
        In NoSQL you don't need to define the structure in advance. Each
        document can have different fields, allowing rapid iteration during
        development. This is known as schema-on-read: the structure is
        interpreted when reading data, not when writing it.
      </BlogP>

      <BlogCode>{`// MongoDB — each document can have different fields
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

      <BlogH3>BASE instead of ACID</BlogH3>
      <BlogP>
        Most NoSQL systems follow the BASE model (Basically Available, Soft
        state, Eventually consistent), which relaxes immediate consistency in
        favor of availability and partition tolerance:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Basically Available:</strong> the system always responds, even
          if some nodes fail.
        </BlogLi>
        <BlogLi>
          <strong>Soft State:</strong> the state can change without external
          input due to data propagation.
        </BlogLi>
        <BlogLi>
          <strong>Eventually Consistent:</strong> data propagates asynchronously;
          if no new writes occur, all nodes will converge to the same state over
          time.
        </BlogLi>
      </BlogUl>

      <BlogH3>Horizontal scaling</BlogH3>
      <BlogP>
        NoSQL is designed to scale horizontally (sharding): adding more servers
        instead of making a single one more powerful. This allows handling
        terabytes or petabytes of data by distributing the load across dozens or
        hundreds of nodes.
      </BlogP>

      <BlogH3>Variety of models</BlogH3>
      <BlogP>
        Unlike SQL, where the model is always relational, NoSQL includes
        multiple paradigms:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Document (MongoDB, Firestore):</strong> data in JSON/BSON
          format, ideal for catalogs and content systems.
        </BlogLi>
        <BlogLi>
          <strong>Key-Value (Redis, DynamoDB):</strong> key-value pairs,
          ultra-fast, perfect for caches and sessions.
        </BlogLi>
        <BlogLi>
          <strong>Column-family (Cassandra, HBase):</strong> data in columns,
          optimized for analytics and Big Data.
        </BlogLi>
        <BlogLi>
          <strong>Graph (Neo4j, ArangoDB):</strong> nodes and edges, ideal for
          complex relationships and networks.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="info">
        <strong>Note:</strong> NoSQL does not mean "no SQL." Many NoSQL systems
        offer SQL-like query languages (CQL in Cassandra, AQL in ArangoDB) or
        compatibility layers.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="comparison">Comparison Table</BlogH2>

      <BlogP>
        Quick overview of the fundamental differences between both paradigms:
      </BlogP>

      <div className="overflow-x-auto my-6">
        <div
          className="grid gap-px bg-black/8 dark:bg-white/8 rounded-xl overflow-hidden text-sm"
          style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
        >
          {/* Header */}
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 font-semibold text-[#1d1d1f] dark:text-white">
            Feature
          </div>
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 font-semibold text-[#1d1d1f] dark:text-white">
            SQL
          </div>
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 font-semibold text-[#1d1d1f] dark:text-white">
            NoSQL
          </div>

          {/* Schema */}
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            Schema
          </div>
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            Fixed, predefined
          </div>
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            Dynamic, flexible
          </div>

          {/* Scalability */}
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            Scalability
          </div>
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            Vertical (bigger server)
          </div>
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            Horizontal (more servers)
          </div>

          {/* ACID */}
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            ACID
          </div>
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3">
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              Full support
            </span>
          </div>
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            Limited / configurable
          </div>

          {/* Joins */}
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            Joins
          </div>
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            Yes (native)
          </div>
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            App-level or $lookup
          </div>

          {/* Use case */}
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            Use case
          </div>
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            Complex queries, integrity
          </div>
          <div className="bg-white dark:bg-[#1d1d1f] px-4 py-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
            High volume, rapid iteration
          </div>
        </div>
      </div>

      <BlogP>
        This table simplifies the differences to give an overview. In practice,
        the line between SQL and NoSQL is increasingly blurry: PostgreSQL
        supports JSON documents and full-text search, while MongoDB has had
        multi-document transactions since version 4.0.
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="when-to-choose">When to Choose Each</BlogH2>

      <BlogH3>Choose SQL when…</BlogH3>
      <BlogUl>
        <BlogLi>
          Data has clear, well-defined relationships (orders with line items,
          users with profiles).
        </BlogLi>
        <BlogLi>
          You need referential integrity and strong consistency (banking,
          accounting, ERP).
        </BlogLi>
        <BlogLi>
          Queries are complex and involve multiple tables (reports, analytical
          dashboards).
        </BlogLi>
        <BlogLi>
          Data volume is predictable and fits on a single server (or a few).
        </BlogLi>
        <BlogLi>
          You work with highly structured data where the schema changes
          infrequently.
        </BlogLi>
      </BlogUl>

      <BlogH3>Choose NoSQL when…</BlogH3>
      <BlogUl>
        <BlogLi>
          The data schema is variable or constantly evolving.
        </BlogLi>
        <BlogLi>
          You need to scale horizontally to handle large data volumes (IoT,
          logs, social networks).
        </BlogLi>
        <BlogLi>
          You prioritize read/write speed over immediate consistency.
        </BlogLi>
        <BlogLi>
          You are prototyping and need to iterate fast without schema
          migrations.
        </BlogLi>
        <BlogLi>
          Your data is naturally documents, graphs, or key-value pairs
          (catalogs, feeds, sessions).
        </BlogLi>
      </BlogUl>

      <BlogCallout type="warn">
        <strong>Beware of dogmatism.</strong> Choosing NoSQL "because it's
        cool" when your project is basically a CRUD with simple relationships
        adds unnecessary complexity. And choosing SQL for a telemetry system
        with millions of writes per second is equally problematic.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="can-they-coexist">Can They Coexist?</BlogH2>

      <BlogP>
        Yes, and in fact it is the most common practice in modern projects. This
        is known as polyglot persistence: using the right database for each
        problem within the same system.
      </BlogP>

      <BlogP>
        A typical polyglot architecture:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>PostgreSQL</strong> for the transactional core: users, orders,
          payments, invoicing. ACID consistency is essential here.
        </BlogLi>
        <BlogLi>
          <strong>Redis</strong> for session caching and frequently accessed
          data. Microsecond speed.
        </BlogLi>
        <BlogLi>
          <strong>MongoDB</strong> for the product catalog with variable schema
          and flexible search.
        </BlogLi>
        <BlogLi>
          <strong>InfluxDB</strong> for server metrics and real-time dashboards.
        </BlogLi>
        <BlogLi>
          <strong>Elasticsearch</strong> for full-text search across products
          and documents.
        </BlogLi>
      </BlogUl>

      <BlogCode>{`// Example: a typical polyglot architecture
const express = require('express');
const app = express();

// PostgreSQL for transactions
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

// Redis for cache
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
        <strong>Rule of thumb:</strong> SQL for what requires consistency and
        relationships. NoSQL for what requires scalability and flexibility.
        Most projects need both.
      </BlogCallout>
    </article>
  );
}
