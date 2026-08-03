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

export default function SQLBasicsContentEn() {
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
        SQL from scratch
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        SQL (Structured Query Language) is the standard language for
        communicating with relational databases. Learn from basic queries to
        advanced techniques with hands-on exercises.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="create-table">CREATE TABLE and data types</BlogH2>

      <BlogP>
        <BlogInlineCode>CREATE TABLE</BlogInlineCode> defines the structure of a
        new table. You specify the table name, columns, their data types and
        constraints. It is the blueprint of your data — design it carefully.
      </BlogP>

      <BlogCode>{`CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  age INT CHECK (age > 0),
  created_at TIMESTAMP DEFAULT NOW()
);`}</BlogCode>

      <BlogH3>Main data types</BlogH3>

      <BlogUl>
        <BlogLi>
          <strong>INT / INTEGER</strong> — whole numbers (-2^31 to 2^31-1). Use{" "}
          <BlogInlineCode>BIGINT</BlogInlineCode> for larger ranges.
        </BlogLi>
        <BlogLi>
          <strong>SERIAL / BIGSERIAL</strong> — auto-incrementing integers.
          PostgreSQL implements them as{" "}
          <BlogInlineCode>
            INTEGER GENERATED BY DEFAULT AS IDENTITY
          </BlogInlineCode>
          .
        </BlogLi>
        <BlogLi>
          <strong>VARCHAR(n)</strong> — variable-length text with a limit.
          Example: <BlogInlineCode>VARCHAR(255)</BlogInlineCode>. For unlimited
          length: <BlogInlineCode>TEXT</BlogInlineCode>.
        </BlogLi>
        <BlogLi>
          <strong>NUMERIC(p, s)</strong> — exact decimal.{" "}
          <BlogInlineCode>p</BlogInlineCode> = total digits,{" "}
          <BlogInlineCode>s</BlogInlineCode> = decimals. Example:{" "}
          <BlogInlineCode>NUMERIC(10,2)</BlogInlineCode> = 99999999.99.
        </BlogLi>
        <BlogLi>
          <strong>DATE</strong> — date only (2026-07-29).{" "}
          <BlogInlineCode>TIMESTAMP</BlogInlineCode> — date + time.{" "}
          <BlogInlineCode>TIMESTAMPTZ</BlogInlineCode> — with timezone.
        </BlogLi>
        <BlogLi>
          <strong>BOOLEAN</strong> — true / false / NULL.
        </BlogLi>
        <BlogLi>
          <strong>UUID</strong> — universally unique identifier. Stores 16
          bytes, generated with functions like{" "}
          <BlogInlineCode>gen_random_uuid()</BlogInlineCode>.
        </BlogLi>
        <BlogLi>
          <strong>JSON / JSONB</strong> — JSON data. JSONB is binary, indexable
          and more efficient (PostgreSQL).
        </BlogLi>
      </BlogUl>

      <BlogH3>Constraints</BlogH3>

      <BlogP>
        Constraints guarantee data integrity. Each has a specific purpose:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>PRIMARY KEY</strong> — uniquely identifies each row. Combines
          NOT NULL + UNIQUE. A table can only have one.
        </BlogLi>
        <BlogLi>
          <strong>FOREIGN KEY</strong> — references another table. Ensures
          referential integrity. Example:{" "}
          <BlogInlineCode>user_id INT REFERENCES users(id)</BlogInlineCode>. You
          can add <BlogInlineCode>ON DELETE CASCADE</BlogInlineCode> for
          cascading deletes.
        </BlogLi>
        <BlogLi>
          <strong>UNIQUE</strong> — all values in the column must be different.
          Allows NULL (and NULLs are considered distinct from each other).
        </BlogLi>
        <BlogLi>
          <strong>NOT NULL</strong> — the column cannot contain null values.
        </BlogLi>
        <BlogLi>
          <strong>CHECK</strong> — validates data against a boolean condition.
          Example:{" "}
          <BlogInlineCode>CHECK (age &gt;= 0 AND age &lt; 150)</BlogInlineCode>.
        </BlogLi>
        <BlogLi>
          <strong>DEFAULT</strong> — default value when none is specified.
          Example: <BlogInlineCode>DEFAULT NOW()</BlogInlineCode>,{" "}
          <BlogInlineCode>DEFAULT 0</BlogInlineCode>.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="info">
        <BlogInlineCode>SERIAL</BlogInlineCode> is not a real data type, but a
        shortcut that creates an INTEGER column with DEFAULT picking the next
        value from a sequence. In modern PostgreSQL,{" "}
        <BlogInlineCode>GENERATED AS IDENTITY</BlogInlineCode> is preferred.
      </BlogCallout>

      <BlogH3>ALTER TABLE and DROP TABLE</BlogH3>

      <BlogP>
        Once a table is created, you can modify its structure with{" "}
        <BlogInlineCode>ALTER TABLE</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`-- Add column
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- Drop column
ALTER TABLE users DROP COLUMN phone;

-- Change type
ALTER TABLE users ALTER COLUMN age TYPE SMALLINT;

-- Add constraint
ALTER TABLE users ADD CONSTRAINT chk_age CHECK (age >= 0);

-- Rename table
ALTER TABLE users RENAME TO customers;

-- Drop table (with data)
DROP TABLE users;

-- Empty table (keep structure)
TRUNCATE TABLE users;`}</BlogCode>

      <BlogP>
        <BlogInlineCode>DROP TABLE</BlogInlineCode> permanently removes the
        table and its data. <BlogInlineCode>TRUNCATE</BlogInlineCode> only
        empties the data while keeping the structure — it's faster than{" "}
        <BlogInlineCode>DELETE FROM</BlogInlineCode> because it does not scan
        rows or fire triggers.
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-6" />

      <BlogH2 id="insert">INSERT</BlogH2>

      <BlogP>
        <BlogInlineCode>INSERT INTO</BlogInlineCode> adds new rows to a table.
        You can insert one row, multiple rows, or even the result of a query:
      </BlogP>

      <BlogCode>{`-- Insert one row
INSERT INTO users (name, email, age) VALUES ('Anna', 'anna@email.com', 28);

-- Insert multiple rows in one statement
INSERT INTO users (name, email, age) VALUES
  ('Louis', 'louis@email.com', 35),
  ('Mary', 'mary@email.com', 42);

-- Insert with SELECT (copy between tables)
INSERT INTO users_backup (name, email, age)
SELECT name, email, age FROM users WHERE active = true;

-- INSERT with RETURNING (PostgreSQL)
INSERT INTO users (name, email) VALUES ('Carlos', 'carlos@email.com')
RETURNING id, created_at;`}</BlogCode>

      <BlogP>
        <BlogInlineCode>RETURNING</BlogInlineCode> returns the inserted values
        (or any expression) — very useful to get the generated ID without a
        second query.
      </BlogP>

      <BlogCallout type="tip">
        Inserting multiple rows in a single statement is much more efficient
        than doing individual INSERTs in a loop. Most engines have a practical
        limit (~1000 rows per INSERT).
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-6" />

      <BlogH2 id="select">SELECT</BlogH2>

      <BlogP>
        <BlogInlineCode>SELECT</BlogInlineCode> is the most used SQL command. It
        retrieves data from one or more tables. Its basic structure:{" "}
        <BlogInlineCode>
          SELECT columns FROM table WHERE conditions ORDER BY column LIMIT n
        </BlogInlineCode>
        .
      </BlogP>

      <BlogCode>{`-- Select everything
SELECT * FROM users;

-- Specific columns with aliases
SELECT name AS "Full name", email AS Mail FROM users;

-- Filter with WHERE
SELECT * FROM users WHERE age > 30;

-- Sort and limit
SELECT * FROM users ORDER BY age DESC LIMIT 5;

-- Combined filters
SELECT * FROM users
WHERE age BETWEEN 25 AND 40
  AND email LIKE '%@gmail.com'
  AND city IN ('Madrid', 'Barcelona')
ORDER BY name ASC;

-- DISTINCT: unique values
SELECT DISTINCT city FROM users;

-- CASE: conditional logic in queries
SELECT name,
  CASE
    WHEN age < 18 THEN 'Minor'
    WHEN age BETWEEN 18 AND 65 THEN 'Adult'
    ELSE 'Senior'
  END AS age_group
FROM users;

-- COALESCE: default value when NULL
SELECT name, COALESCE(phone, 'Not available') AS phone FROM users;`}</BlogCode>

      <BlogH3>WHERE clause in depth</BlogH3>

      <BlogP>The most common operators in WHERE:</BlogP>

      <BlogUl>
        <BlogLi>
          <strong>=, &gt;, &lt;, &gt;=, &lt;=, &lt;&gt;</strong> — comparison
          (&lt;&gt; means "not equal")
        </BlogLi>
        <BlogLi>
          <strong>BETWEEN</strong> — inclusive range:{" "}
          <BlogInlineCode>age BETWEEN 18 AND 65</BlogInlineCode>
        </BlogLi>
        <BlogLi>
          <strong>LIKE</strong> — pattern matching:{" "}
          <BlogInlineCode>%</BlogInlineCode> (any sequence),{" "}
          <BlogInlineCode>_</BlogInlineCode> (single character). Example:{" "}
          <BlogInlineCode>name LIKE 'A%'</BlogInlineCode> (starts with A)
        </BlogLi>
        <BlogLi>
          <strong>IN</strong> — set membership:{" "}
          <BlogInlineCode>city IN ('Madrid', 'Bcn')</BlogInlineCode>
        </BlogLi>
        <BlogLi>
          <strong>IS NULL / IS NOT NULL</strong> — null comparison (never use =
          NULL since NULL equals nothing)
        </BlogLi>
        <BlogLi>
          <strong>AND / OR / NOT</strong> — boolean logic. AND binds tighter
          than OR; use parentheses to group
        </BlogLi>
      </BlogUl>

      <BlogCallout type="tip">
        Prefix any SELECT with <BlogInlineCode>EXPLAIN ANALYZE</BlogInlineCode>{" "}
        to see how the engine executes the query (indexes, joins, scans) and
        find bottlenecks. Example:{" "}
        <BlogInlineCode>
          EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'anna@email.com';
        </BlogInlineCode>
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-6" />

      <BlogH2 id="update-delete">UPDATE and DELETE</BlogH2>

      <BlogP>
        <BlogInlineCode>UPDATE</BlogInlineCode> modifies existing rows.{" "}
        <BlogInlineCode>DELETE</BlogInlineCode> removes them. Both require{" "}
        <BlogInlineCode>WHERE</BlogInlineCode> to select which rows to affect:
      </BlogP>

      <BlogCode>{`-- Basic UPDATE
UPDATE users SET age = 29 WHERE name = 'Anna';

-- Multiple columns
UPDATE users
SET age = 30, city = 'Madrid'
WHERE email = 'anna@email.com';

-- UPDATE with expression
UPDATE products SET price = price * 1.10 WHERE category = 'electronics';

-- UPDATE with JOIN (PostgreSQL, MySQL)
UPDATE users u
SET total_spent = (SELECT SUM(total) FROM orders o WHERE o.user_id = u.id)
WHERE u.active = true;

-- Basic DELETE
DELETE FROM users WHERE email IS NULL;

-- DELETE with subquery
DELETE FROM users WHERE id NOT IN (SELECT user_id FROM orders);

-- RETURNING (PostgreSQL)
DELETE FROM users WHERE age < 18 RETURNING id, name;

-- TRUNCATE (empties entire table, faster than DELETE)
TRUNCATE TABLE users;`}</BlogCode>

      <BlogCallout type="warn">
        Always use <BlogInlineCode>WHERE</BlogInlineCode> with UPDATE and
        DELETE. Without WHERE, the operation affects ALL rows. If you really
        need to empty a table, use <BlogInlineCode>TRUNCATE</BlogInlineCode> —
        it's faster and safer.
      </BlogCallout>

      <BlogP>
        <BlogInlineCode>RETURNING</BlogInlineCode> (PostgreSQL) returns the
        modified or deleted rows. Useful for auditing, logging, or returning
        data to the client without an extra query. Rows are returned before
        DELETE takes effect and after UPDATE applies changes.
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-6" />

      <BlogH2 id="joins">JOINs</BlogH2>

      <BlogP>
        JOINs combine rows from two or more tables based on a related condition.
        First, let's create an orders table for the examples:
      </BlogP>

      <BlogCode>{`CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  product VARCHAR(150) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  date DATE DEFAULT CURRENT_DATE
);`}</BlogCode>

      <BlogH3>Types of JOIN</BlogH3>

      <BlogCode>{`-- INNER JOIN: only matching rows from both tables
SELECT u.name, o.product, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN: all rows from left table + matches from right
SELECT u.name, COUNT(o.id) AS orders
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;

-- RIGHT JOIN: all rows from right table + matches from left
SELECT u.name, o.product
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;

-- FULL OUTER JOIN: all rows from both tables
SELECT u.name, o.product
FROM users u
FULL OUTER JOIN orders o ON u.id = o.user_id;

-- CROSS JOIN: Cartesian product (every row of A × every row of B)
SELECT u.name, p.product
FROM users u
CROSS JOIN products p;  -- 3 users × 10 products = 30 rows

-- SELF JOIN: a table with itself (e.g., employees and managers)
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;`}</BlogCode>

      <BlogP>Think of JOINs as Venn diagrams:</BlogP>

      <BlogUl>
        <BlogLi>
          <strong>INNER JOIN</strong> — the intersection (only what exists in
          both)
        </BlogLi>
        <BlogLi>
          <strong>LEFT JOIN</strong> — the entire left circle + intersection
        </BlogLi>
        <BlogLi>
          <strong>RIGHT JOIN</strong> — the entire right circle + intersection
        </BlogLi>
        <BlogLi>
          <strong>FULL OUTER JOIN</strong> — both circles complete, match or not
        </BlogLi>
        <BlogLi>
          <strong>CROSS JOIN</strong> — every A element combined with every B
          element (no condition)
        </BlogLi>
      </BlogUl>

      <BlogCallout type="tip">
        <BlogInlineCode>ON</BlogInlineCode> defines the join condition. You can
        also filter with <BlogInlineCode>WHERE</BlogInlineCode> after the JOIN.
        The difference: <BlogInlineCode>ON</BlogInlineCode> filters before the
        join (affects which rows get joined), while{" "}
        <BlogInlineCode>WHERE</BlogInlineCode> filters after (affects the final
        result).
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-6" />

      <BlogH2 id="group-by">GROUP BY and aggregation</BlogH2>

      <BlogP>
        Aggregate functions summarize multiple rows into a single result.
        Combined with <BlogInlineCode>GROUP BY</BlogInlineCode>, they group rows
        with common values:
      </BlogP>

      <BlogCode>{`SELECT
  u.name,
  COUNT(o.id) AS total_orders,
  SUM(o.total) AS total_spent,
  AVG(o.total) AS avg_ticket,
  MIN(o.total) AS min_order,
  MAX(o.total) AS max_order
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 0
ORDER BY total_spent DESC;`}</BlogCode>

      <BlogH3>Aggregate functions</BlogH3>

      <BlogUl>
        <BlogLi>
          <strong>COUNT(*)</strong> — counts all rows in the group.{" "}
          <BlogInlineCode>COUNT(column)</BlogInlineCode> counts only non-NULL
          values. <BlogInlineCode>COUNT(DISTINCT column)</BlogInlineCode> counts
          unique values.
        </BlogLi>
        <BlogLi>
          <strong>SUM(column)</strong> — sum of numeric values. Ignores NULLs.
        </BlogLi>
        <BlogLi>
          <strong>AVG(column)</strong> — average (arithmetic mean). Ignores
          NULLs.
        </BlogLi>
        <BlogLi>
          <strong>MIN / MAX</strong> — minimum / maximum value. Works with
          numbers, dates and text (alphabetical order).
        </BlogLi>
        <BlogLi>
          <strong>STRING_AGG(column, delimiter)</strong> — concatenates values
          (PostgreSQL). Example:{" "}
          <BlogInlineCode>STRING_AGG(product, ', ')</BlogInlineCode>.
        </BlogLi>
      </BlogUl>

      <BlogH3>HAVING</BlogH3>

      <BlogP>
        <BlogInlineCode>HAVING</BlogInlineCode> is like{" "}
        <BlogInlineCode>WHERE</BlogInlineCode> but for groups. WHERE filters
        individual rows before grouping; HAVING filters groups after
        aggregation:
      </BlogP>

      <BlogCode>{`-- Valid: HAVING with aggregation
SELECT user_id, COUNT(*) AS orders
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 5;

-- FILTER (PostgreSQL): conditional aggregation
SELECT
  COUNT(*) AS total,
  COUNT(*) FILTER (WHERE total > 100) AS big_orders
FROM orders;`}</BlogCode>

      <BlogH3>ROLLUP, CUBE, GROUPING SETS</BlogH3>

      <BlogP>GROUP BY extensions for subtotals and grand totals:</BlogP>

      <BlogCode>{`-- ROLLUP: hierarchical subtotals (category → total)
SELECT category, SUM(price) AS total
FROM products
GROUP BY ROLLUP(category);

-- CUBE: all combinations
SELECT category, color, SUM(price)
FROM products
GROUP BY CUBE(category, color);`}</BlogCode>

      <hr className="border-black/8 dark:border-white/8 my-6" />

      <BlogH2 id="window-functions">Window Functions</BlogH2>

      <BlogP>
        Window functions perform calculations across a set of related rows
        without collapsing them into a single output. Unlike GROUP BY, each row
        keeps its identity:
      </BlogP>

      <BlogCode>{`-- ROW_NUMBER: numbering within each group
SELECT name, department, salary,
  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS position
FROM employees;

-- RANK: same as ROW_NUMBER but ties share the same rank
SELECT product, total,
  RANK() OVER (ORDER BY total DESC) AS ranking
FROM orders;

-- LAG / LEAD: access previous/next row
SELECT date, total,
  LAG(total) OVER (ORDER BY date) AS previous_total,
  LEAD(total) OVER (ORDER BY date) AS next_total
FROM orders;`}</BlogCode>

      <BlogP>
        Window function syntax:{" "}
        <BlogInlineCode>
          FUNCTION() OVER (PARTITION BY column ORDER BY column)
        </BlogInlineCode>
        . <BlogInlineCode>PARTITION BY</BlogInlineCode> divides into groups
        (optional), <BlogInlineCode>ORDER BY</BlogInlineCode> defines order
        within each group.
      </BlogP>

      <BlogCallout type="tip">
        Window functions are powerful for rankings, differences between
        consecutive rows, running totals, and moving averages. They are an
        elegant alternative to correlated subqueries.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-6" />

      <BlogH2 id="subconsultas">Subqueries and CTEs</BlogH2>

      <BlogH3>Subqueries</BlogH3>

      <BlogP>
        A subquery is a SELECT inside another SELECT. It can appear in WHERE,
        FROM, SELECT, or HAVING:
      </BlogP>

      <BlogCode>{`-- Subquery in WHERE (with IN)
SELECT * FROM users
WHERE id IN (SELECT user_id FROM orders WHERE total > 100);

-- Correlated subquery (references outer query)
SELECT u.name, u.email,
  (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id) AS total_orders
FROM users u;

-- Subquery in FROM (derived table)
SELECT AVG(spent) AS avg_spent
FROM (
  SELECT user_id, SUM(total) AS spent
  FROM orders
  GROUP BY user_id
) AS summary;

-- EXISTS (more efficient than IN for correlated queries)
SELECT * FROM users u
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id AND o.total > 100);`}</BlogCode>

      <BlogP>
        <BlogInlineCode>EXISTS</BlogInlineCode> vs{" "}
        <BlogInlineCode>IN</BlogInlineCode>: EXISTS is faster when the subquery
        can return many rows, because it stops at the first match. IN is more
        readable for small sets.
      </BlogP>

      <BlogH3>CTEs (Common Table Expressions)</BlogH3>

      <BlogP>
        CTEs with <BlogInlineCode>WITH</BlogInlineCode> are like "temporary
        variables" for queries. They make SQL more readable and support
        recursion:
      </BlogP>

      <BlogCode>{`-- Basic CTE
WITH top_customers AS (
  SELECT user_id, SUM(total) AS spent
  FROM orders
  GROUP BY user_id
  ORDER BY spent DESC
  LIMIT 3
)
SELECT u.name, tc.spent
FROM top_customers tc
JOIN users u ON u.id = tc.user_id;

-- Recursive CTE (e.g., category hierarchy)
WITH RECURSIVE category_tree AS (
  -- Base case: root categories
  SELECT id, name, parent_id, 1 AS level
  FROM categories WHERE parent_id IS NULL
  UNION ALL
  -- Recursive step: children
  SELECT c.id, c.name, c.parent_id, ct.level + 1
  FROM categories c
  JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT * FROM category_tree ORDER BY level, name;`}</BlogCode>

      <BlogP>
        Recursive CTEs are ideal for hierarchical data: category trees, org
        charts, comment threads, navigation paths, and any self-referencing
        data.
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-6" />

      <BlogH2 id="set-operators">Set operators</BlogH2>

      <BlogP>
        SQL also supports set operations (like in mathematics) between the
        results of two queries:
      </BlogP>

      <BlogCode>{`-- UNION: combines results, removes duplicates
SELECT name, email FROM active_users
UNION
SELECT name, email FROM inactive_users;

-- UNION ALL: combines results, keeps duplicates
SELECT city FROM madrid_users
UNION ALL
SELECT city FROM barcelona_users;

-- INTERSECT: rows common to both queries
SELECT product FROM orders_2025
INTERSECT
SELECT product FROM orders_2026;

-- EXCEPT: rows in the first but not the second
SELECT email FROM users
EXCEPT
SELECT email FROM verified_users;`}</BlogCode>

      <BlogP>
        Both queries must have the same number of columns and compatible data
        types. <BlogInlineCode>UNION ALL</BlogInlineCode> is faster than{" "}
        <BlogInlineCode>UNION</BlogInlineCode> because it skips the duplicate
        removal step.
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Exercises</BlogH2>

      <BlogP>
        Practice what you have learned with these exercises. Try to solve them
        before checking the solution.
      </BlogP>

      <div className="space-y-3">
        <ExerciseCard
          description="Get all users older than 25, showing only name and email, ordered by age descending."
          hint="Use WHERE, ORDER BY and SELECT with specific columns."
          level="Easy"
          num={1}
          solution="SELECT name, email FROM users WHERE age > 25 ORDER BY age DESC;"
          title="Basic SELECT"
        />

        <ExerciseCard
          description="Insert 3 new users in a single statement with different names, emails and ages."
          hint="Use VALUES with multiple rows separated by commas."
          level="Easy"
          num={2}
          solution={`INSERT INTO users (name, email, age) VALUES
  ('Carlos', 'carlos@email.com', 31),
  ('Elena', 'elena@email.com', 27),
  ('Peter', 'peter@email.com', 45);`}
          title="Multiple INSERT"
        />

        <ExerciseCard
          description="Update user 'Anna' age to 29."
          hint="Do not forget the WHERE."
          level="Easy"
          num={3}
          solution="UPDATE users SET age = 29 WHERE name = 'Anna';"
          title="UPDATE with condition"
        />

        <ExerciseCard
          description="List all orders with the name of the user who placed them. Show name, product and total."
          hint="JOIN users and orders on user_id."
          level="Intermediate"
          num={4}
          solution={`SELECT u.name, o.product, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;`}
          title="INNER JOIN"
        />

        <ExerciseCard
          description="Show all users and how many orders each has placed, including users with no orders (they should show 0)."
          hint="Use LEFT JOIN + COUNT. COUNT(o.id) counts only matching rows."
          level="Intermediate"
          num={5}
          solution={`SELECT u.name, COUNT(o.id) AS num_orders
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
ORDER BY num_orders DESC;`}
          title="LEFT JOIN with COUNT"
        />

        <ExerciseCard
          description="Find users who have spent more than €100 total on orders."
          hint="Group by user, sum totals, and filter with HAVING."
          level="Intermediate"
          num={6}
          solution={`SELECT u.name, SUM(o.total) AS total_spent
FROM users u
JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
HAVING SUM(o.total) > 100;`}
          title="GROUP BY with HAVING"
        />

        <ExerciseCard
          description="Using ROW_NUMBER, number each user's orders sorted by total descending (the most expensive order for each user should be 1)."
          hint="PARTITION BY user_id ORDER BY total DESC."
          level="Hard"
          num={7}
          solution={`SELECT u.name, o.product, o.total,
  ROW_NUMBER() OVER (PARTITION BY o.user_id ORDER BY o.total DESC) AS order_num
FROM users u
JOIN orders o ON u.id = o.user_id;`}
          title="Window Function"
        />

        <ExerciseCard
          description="Using WITH RECURSIVE, generate a number sequence from 1 to 10."
          hint="Base case: SELECT 1. Recursive step: SELECT n+1 WHERE n < 10."
          level="Hard"
          num={8}
          solution={`WITH RECURSIVE numbers(n) AS (
  SELECT 1
  UNION ALL
  SELECT n + 1 FROM numbers WHERE n < 10
)
SELECT * FROM numbers;`}
          title="Recursive CTE"
        />

        <ExerciseCard
          description="Use EXISTS to find users who have placed at least one order."
          hint="SELECT 1 inside EXISTS."
          level="Hard"
          num={9}
          solution={`SELECT * FROM users u
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);`}
          title="EXISTS vs IN"
        />

        <ExerciseCard
          description="Combine the email list of users and contacts (a 'contacts' table with email) into one result, keeping duplicates."
          hint="UNION ALL does not remove duplicates."
          level="Intermediate"
          num={10}
          solution={`SELECT email FROM users
UNION ALL
SELECT email FROM contacts;`}
          title="UNION ALL"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        SQL is a fundamental skill for every developer. Spend time practicing
        these queries and they will become second nature. To go deeper, check
        out the MySQL and PostgreSQL tutorials where you will explore each
        engine's unique features.
      </BlogP>
    </article>
  );
}
