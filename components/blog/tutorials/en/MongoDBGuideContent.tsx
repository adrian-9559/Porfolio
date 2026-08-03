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

export default function MongoDBGuideContentEn() {
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
          12 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        MongoDB: The NoSQL Revolution
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        MongoDB is the most popular NoSQL database. It stores data as BSON
        documents, offering flexible schemas, horizontal scalability, and fast
        development velocity.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="concepts">Key Concepts</BlogH2>

      <BlogP>
        In MongoDB data is organized as: <strong>Database</strong> →{" "}
        <strong>Collections</strong> → <strong>Documents</strong>. Unlike SQL,
        there are no tables or rows. Each document is a BSON object with its own
        schema — one document can have fields another does not.
      </BlogP>

      <BlogP>
        The <BlogInlineCode>_id</BlogInlineCode> is a unique ObjectId generated
        automatically (12 bytes: timestamp + machine ID + process ID + counter).
        You can also use your own _id (UUID, number, etc.).
      </BlogP>

      <BlogCallout type="info">
        BSON is a binary JSON extension supporting additional types like Date,
        ObjectId, BinData, and 32/64-bit numbers. This is what is actually
        stored on disk.
      </BlogCallout>

      <BlogH2 id="installation">Installation</BlogH2>

      <BlogP>Options to get started with MongoDB:</BlogP>

      <BlogUl>
        <BlogLi>
          <strong>macOS:</strong>{" "}
          <BlogInlineCode>brew install mongodb-community@7</BlogInlineCode> +{" "}
          <BlogInlineCode>
            brew services start mongodb-community@7
          </BlogInlineCode>
        </BlogLi>
        <BlogLi>
          <strong>Docker:</strong>{" "}
          <BlogInlineCode>
            docker run --name mongodb -p 27017:27017 -d mongo:7
          </BlogInlineCode>
        </BlogLi>
        <BlogLi>
          <strong>MongoDB Compass:</strong> Official GUI for exploring and
          managing data visually
        </BlogLi>
        <BlogLi>
          <strong>mongosh:</strong> Interactive shell — just type{" "}
          <BlogInlineCode>mongosh</BlogInlineCode>
        </BlogLi>
      </BlogUl>

      <BlogH2 id="crud">Basic CRUD</BlogH2>

      <BlogP>The four fundamental operations in MongoDB:</BlogP>

      <BlogH3>CREATE</BlogH3>
      <BlogCode>{`db.users.insertOne({
  name: "Ana",
  email: "ana@email.com",
  age: 28,
  city: "Madrid"
});

db.users.insertMany([
  { name: "Luis", age: 35, city: "Barcelona" },
  { name: "Maria", age: 42, city: "Valencia" }
]);`}</BlogCode>

      <BlogH3>READ</BlogH3>
      <BlogCode>{`db.users.find({ age: { $gt: 30 } });
db.users.find({ city: "Madrid" }).sort({ age: -1 }).limit(5);
db.users.findOne({ email: "ana@email.com" });`}</BlogCode>

      <BlogH3>UPDATE</BlogH3>
      <BlogCode>{`db.users.updateOne(
  { name: "Ana" },
  { $set: { age: 29 } }
);

db.users.updateMany(
  { city: "Madrid" },
  { $set: { country: "Spain" } }
);`}</BlogCode>

      <BlogH3>DELETE</BlogH3>
      <BlogCode>{`db.users.deleteOne({ email: null });
db.users.deleteMany({ age: { $lt: 18 } });`}</BlogCode>

      <BlogH2 id="operators">Query Operators</BlogH2>

      <BlogP>MongoDB offers operators for advanced queries:</BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Comparison:</strong> <BlogInlineCode>$gt</BlogInlineCode>,{" "}
          <BlogInlineCode>$gte</BlogInlineCode>,{" "}
          <BlogInlineCode>$lt</BlogInlineCode>,{" "}
          <BlogInlineCode>$lte</BlogInlineCode>,{" "}
          <BlogInlineCode>$in</BlogInlineCode>,{" "}
          <BlogInlineCode>$ne</BlogInlineCode>
        </BlogLi>
        <BlogLi>
          <strong>Text:</strong> <BlogInlineCode>$regex</BlogInlineCode>{" "}
          (regular expression search)
        </BlogLi>
        <BlogLi>
          <strong>Existence:</strong> <BlogInlineCode>$exists</BlogInlineCode>,{" "}
          <BlogInlineCode>$type</BlogInlineCode>
        </BlogLi>
        <BlogLi>
          <strong>Arrays:</strong> <BlogInlineCode>$all</BlogInlineCode>,{" "}
          <BlogInlineCode>$elemMatch</BlogInlineCode>,{" "}
          <BlogInlineCode>$size</BlogInlineCode>
        </BlogLi>
        <BlogLi>
          <strong>Logical:</strong> <BlogInlineCode>$and</BlogInlineCode>,{" "}
          <BlogInlineCode>$or</BlogInlineCode>,{" "}
          <BlogInlineCode>$not</BlogInlineCode>
        </BlogLi>
      </BlogUl>

      <BlogCode>{`// Users from Madrid or Barcelona between 25 and 40
db.users.find({
  $and: [
    { city: { $in: ["Madrid", "Barcelona"] } },
    { age: { $gte: 25, $lte: 40 } }
  ]
});

// Text search with regex
db.users.find({ email: { $regex: /@gmail\\.com$/i } });`}</BlogCode>

      <BlogH2 id="aggregation">Aggregation Pipeline</BlogH2>

      <BlogP>
        The equivalent of GROUP BY, JOINs, and complex transformations.
        Documents flow through a pipeline of stages:
      </BlogP>

      <BlogCode>{`db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: {
    _id: "$user_id",
    total: { $sum: "$total" },
    count: { $sum: 1 }
  }},
  { $sort: { total: -1 } },
  { $limit: 10 },
  { $lookup: {
    from: "users",
    localField: "_id",
    foreignField: "_id",
    as: "user"
  }},
  { $unwind: "$user" },
  { $project: {
    name: "$user.name",
    total: 1,
    orders: 1
  }}
]);`}</BlogCode>

      <BlogP>
        Key stages: <BlogInlineCode>$match</BlogInlineCode> (filter, like
        WHERE), <BlogInlineCode>$group</BlogInlineCode> (grouping),{" "}
        <BlogInlineCode>$sort</BlogInlineCode>,{" "}
        <BlogInlineCode>$limit</BlogInlineCode>,{" "}
        <BlogInlineCode>$project</BlogInlineCode> (field selection),{" "}
        <BlogInlineCode>$lookup</BlogInlineCode> (like JOIN),{" "}
        <BlogInlineCode>$unwind</BlogInlineCode> (flatten arrays).
      </BlogP>

      <BlogCallout type="tip">
        Place <BlogInlineCode>$match</BlogInlineCode> and{" "}
        <BlogInlineCode>$limit</BlogInlineCode> as early as possible in the
        pipeline to reduce the number of documents flowing through subsequent
        stages.
      </BlogCallout>

      <BlogH2 id="indexes">Indexes</BlogH2>

      <BlogP>Indexes dramatically speed up queries:</BlogP>

      <BlogCode>{`// Simple index
db.users.createIndex({ email: 1 });

// Compound index
db.users.createIndex({ city: 1, age: -1 });

// Partial index
db.orders.createIndex(
  { total: 1 },
  { partialFilterExpression: { status: "completed" } }
);

// Text index
db.users.createIndex({ name: "text", email: "text" });

// Analyze query
db.users.find({ email: "ana@email.com" }).explain("executionStats");`}</BlogCode>

      <BlogCallout type="info">
        SQL vs MongoDB: JOINs are done with{" "}
        <BlogInlineCode>$lookup</BlogInlineCode> or by embedding related data
        within the same document. Multi-document ACID transactions have been
        available since MongoDB 4.0. Horizontal sharding is native and scales
        across hundreds of servers.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="exercises">Exercises</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description='Create a "products" collection and insert 3 documents with different fields (not identical) to demonstrate schema flexibility.'
          hint="Each document can have different fields. Use insertMany."
          level="Easy"
          num={1}
          solution={`db.products.insertMany([
  { name: "Laptop", price: 1200, category: "electronics" },
  { name: "T-shirt", price: 25, category: "clothing", size: "M" },
  { name: "Chair", price: 200, color: "black", material: "leather" }
]);`}
          title="Insert varied documents"
        />

        <ExerciseCard
          description="Find products with a price between 100 and 1000 in the 'electronics' category."
          hint="Use $gte, $lte and implicit $and (filters separated by commas)."
          level="Easy"
          num={2}
          solution={`db.products.find({
  price: { $gte: 100, $lte: 1000 },
  category: "electronics"
});`}
          title="Find with operators"
        />

        <ExerciseCard
          description="Add a 'sale' tag to the tags array of a specific product."
          hint="Use $push to append to an existing array or create it if it does not exist."
          level="Intermediate"
          num={3}
          solution={`db.products.updateOne(
  { name: "Laptop" },
  { $push: { tags: "sale" } }
);`}
          title="Update with $push to array"
        />

        <ExerciseCard
          description="Using an 'orders' collection, group by client, sum the total spent, and sort from highest to lowest."
          hint={'$group with _id: "$client_id" and $sum, then $sort.'}
          level="Intermediate"
          num={4}
          solution={`db.orders.aggregate([
  { $group: { _id: "$client_id", total_spent: { $sum: "$total" } } },
  { $sort: { total_spent: -1 } }
]);`}
          title="Aggregation: $match + $group + $sort"
        />

        <ExerciseCard
          description="Using $lookup, combine orders with client data to show the client name alongside each order."
          hint="$lookup needs from, localField, foreignField and as."
          level="Hard"
          num={5}
          solution={`db.orders.aggregate([
  { $lookup: {
    from: "clients",
    localField: "client_id",
    foreignField: "_id",
    as: "client"
  }},
  { $unwind: "$client" },
  { $project: { product: 1, total: 1, "client.name": 1 } }
]);`}
          title="$lookup between collections"
        />

        <ExerciseCard
          description="Create an index on the email field of the users collection and verify the query uses it with explain."
          hint="createIndex + find + explain('executionStats'). Look for 'IXSCAN' in the output."
          level="Hard"
          num={6}
          solution={`db.users.createIndex({ email: 1 });
db.users.find({ email: "ana@email.com" }).explain("executionStats");`}
          title="Index + explain"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        MongoDB shines when you need schema flexibility, horizontal scalability,
        and rapid development. Combine it with SQL to get the best of both
        worlds.
      </BlogP>
    </article>
  );
}
