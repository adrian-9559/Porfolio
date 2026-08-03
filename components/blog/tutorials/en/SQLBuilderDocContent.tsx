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

export default function SQLBuilderDocContentEn() {
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
          5 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        SQL Builder Guide
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Learn how to use the interactive SQL Builder: parse DDL, build queries
        visually, and generate SELECT statements without writing a single line
        of SQL.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="what-is-it">What is the SQL Builder?</BlogH2>

      <BlogP>
        The SQL Builder is an interactive tool that turns{" "}
        <BlogInlineCode>CREATE TABLE</BlogInlineCode> statements into a visual
        schema. From there you can build <BlogInlineCode>SELECT</BlogInlineCode>{" "}
        queries by clicking badges on each column — no manual SQL required.
      </BlogP>

      <BlogP>
        It is ideal for anyone learning SQL who wants to understand how clauses
        translate into a real query, or for anyone who needs to generate queries
        quickly without remembering exact syntax.
      </BlogP>

      <BlogCallout type="info">
        The SQL Builder is available in the blog tools section. No registration
        is required, but logging in lets you save and retrieve your query
        history.
      </BlogCallout>

      <BlogH2 id="ddl-parsing">DDL Parsing</BlogH2>

      <BlogP>
        Everything starts with your DDL. Paste one or more{" "}
        <BlogInlineCode>CREATE TABLE</BlogInlineCode> statements into the
        textarea and the tool parses them automatically, detecting:
      </BlogP>

      <BlogUl>
        <BlogLi>Table and column names</BlogLi>
        <BlogLi>
          Data types (<BlogInlineCode>INT</BlogInlineCode>,{" "}
          <BlogInlineCode>VARCHAR</BlogInlineCode>,{" "}
          <BlogInlineCode>DECIMAL</BlogInlineCode>, etc.)
        </BlogLi>
        <BlogLi>
          Inline primary keys (
          <BlogInlineCode>id INT PRIMARY KEY</BlogInlineCode>) and standalone (
          <BlogInlineCode>PRIMARY KEY (id)</BlogInlineCode>)
        </BlogLi>
        <BlogLi>
          Foreign keys (<BlogInlineCode>REFERENCES</BlogInlineCode>)
        </BlogLi>
      </BlogUl>

      <BlogP>
        If you prefer not to write DDL, click the{" "}
        <strong>"Load examples"</strong> button — there are prebuilt schemas
        like <strong>Users-Orders</strong> and{" "}
        <strong>Employees-Departments</strong>.
      </BlogP>

      <BlogH2 id="clauses">Supported Clauses</BlogH2>

      <BlogP>
        Each column in the schema has four badges representing SQL clauses. The
        badges work as toggles: one click activates, another deactivates.
      </BlogP>

      <BlogH3 id="select">SELECT</BlogH3>
      <BlogP>
        Activating the blue <strong>SELECT</strong> badge on a column includes
        it in the selection list. If no columns are selected, the generator
        produces <BlogInlineCode>SELECT *</BlogInlineCode>.
      </BlogP>

      <BlogH3 id="where">WHERE</BlogH3>
      <BlogP>
        The amber <strong>WHERE</strong> badge adds the column to the WHERE
        clause. When activated, a text input appears where you type the filter
        value. The operator is always <BlogInlineCode>=</BlogInlineCode>. If the
        field is empty, the column is ignored in WHERE.
      </BlogP>

      <BlogH3 id="order-by">ORDER BY</BlogH3>
      <BlogP>
        The green <strong>ORDER</strong> badge cycles through three states with
        each click: <strong>OFF → ASC → DESC → OFF</strong>. The label shows the
        current direction: <BlogInlineCode>ORDER ↑</BlogInlineCode> for
        ascending, <BlogInlineCode>ORDER ↓</BlogInlineCode> for descending.
      </BlogP>

      <BlogH3 id="group-by">GROUP BY</BlogH3>
      <BlogP>
        The purple <strong>GROUP BY</strong> badge groups results by the
        selected column. Useful for aggregation queries combined with functions
        like <BlogInlineCode>COUNT</BlogInlineCode>,{" "}
        <BlogInlineCode>SUM</BlogInlineCode>, or{" "}
        <BlogInlineCode>AVG</BlogInlineCode> on the SELECT columns.
      </BlogP>

      <BlogH2 id="auto-joins">Automatic JOINs</BlogH2>

      <BlogP>
        The most powerful feature of the SQL Builder is automatic JOIN
        generation. When you select columns from tables related by a foreign key
        (<BlogInlineCode>REFERENCES</BlogInlineCode>), the tool:
      </BlogP>

      <BlogUl>
        <BlogLi>
          Identifies the main table (the one without FK references to other
          selected tables) and uses it as <BlogInlineCode>FROM</BlogInlineCode>
        </BlogLi>
        <BlogLi>
          Generates the necessary <BlogInlineCode>JOIN</BlogInlineCode> clauses
          with the correct <BlogInlineCode>ON</BlogInlineCode> condition
        </BlogLi>
        <BlogLi>
          Chains multiple JOINs if more than two related tables are involved
        </BlogLi>
      </BlogUl>

      <BlogP>
        For example, with <BlogInlineCode>users</BlogInlineCode> and{" "}
        <BlogInlineCode>orders</BlogInlineCode> (where{" "}
        <BlogInlineCode>orders.user_id</BlogInlineCode> references{" "}
        <BlogInlineCode>users.id</BlogInlineCode>), selecting columns from both
        gives you:
      </BlogP>

      <BlogCode>{`SELECT
  users.name,
  orders.product
FROM users
JOIN orders ON orders.user_id = users.id;`}</BlogCode>

      <BlogH2 id="history">Query History</BlogH2>

      <BlogP>
        If you log in, the SQL Builder automatically saves every query you copy
        to the clipboard. You can access the history from the{" "}
        <strong>"History"</strong> button:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Load</strong> — restores a previous query in the SQL editor so
          you can review or modify it
        </BlogLi>
        <BlogLi>
          <strong>Delete</strong> — removes the query from history
        </BlogLi>
      </BlogUl>

      <BlogP>
        History is stored in the database associated with your account, so it
        persists across sessions.
      </BlogP>

      <BlogH2 id="tips">Tips and Best Practices</BlogH2>

      <BlogUl>
        <BlogLi>
          <strong>Start with examples</strong> — if you do not have DDL handy,
          load "Users-Orders" to see how the builder works
        </BlogLi>
        <BlogLi>
          <strong>Single SELECT column + GROUP BY</strong> — the fastest way to
          see unique values in a table
        </BlogLi>
        <BlogLi>
          <strong>Try combinations</strong> — activate WHERE and ORDER BY on the
          same column to see how the query behaves
        </BlogLi>
        <BlogLi>
          <strong>JOINs are automatic</strong> — you do not need to worry about
          JOIN syntax, just select columns from related tables
        </BlogLi>
        <BlogLi>
          <strong>Use history</strong> — if you make a mistake, you can recover
          a previous version of your query
        </BlogLi>
      </BlogUl>

      <BlogCallout type="tip">
        The SQL Builder is a learning tool. Use it to explore how queries are
        built, and when you feel comfortable, try writing SQL by hand. Practice
        is the key.
      </BlogCallout>
    </article>
  );
}
