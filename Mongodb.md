# MongoDB: From Documents to Distributed Clusters 🚀

![[Pasted image 20260126154740.png]]
Goal: Go beyond “it’s a JSON database” and understand MongoDB’s internal mechanics, scaling strategies, indexing, and aggregation. 🧠

---
## 1. Philosophy & Document Model 📘

### Why MongoDB? (Significance) 🎯

Relational databases normalize data across many tables (e.g., Users, Orders, Payments) and rely on JOINs. At scale, JOINs can be expensive. MongoDB’s guiding principle is:

![[Pasted image 20260126152000.png| 500]]

- Data that is accessed together should be stored together. 📦
Benefits:

- Aligns naturally with object-oriented models 🧩
- Reduces impedance mismatch 🔧
- Fewer JOINs → faster reads ⚡
![[Pasted image 20260126152059.png| 500]]

### BSON (Binary JSON) 🧱

MongoDB stores data as BSON (not plain JSON).

Why BSON?

- Rich data types: Date, Binary, Int32/Int64/Decimal128, ObjectId, etc. 🧬
- Faster traversal than text JSON 🏃
- Optimized for indexing and storage 📦

The `_id` Field (ObjectId) 🔑

- 12 bytes: 4 bytes timestamp, 5 bytes random, 3 bytes counter
- Creation time can be extracted from `_id` ⏲️

---

## 2. Core Mechanics & CRUD 🛠️

### CRUD Operations 🔄
![[Pasted image 20260126152411.png|500]]

Insert ➕

- `insertOne()`
- `insertMany()` (atomic per-document)

Update operators (key ones) ✏️

- `$set` → update specific fields
- `$inc` → atomic increments (safe for concurrency)
- `$push` → append to arrays
- `$addToSet` → append if not present
- `$unset` → remove fields

Atomicity example 🔒

```/dev/null/mongo_atomicity_example.js#L1-17
// BAD: Read-modify-write (race condition)
let user = db.users.findOne({ _id: 1 });
user.visits++;
db.users.save(user);

// GOOD: Atomic operator
db.users.updateOne(
  { _id: 1 },
  { $inc: { visits: 1 } }
);
```

### Schema Design: Embed vs Reference 🧱🔗

Embedding (default) 📚

- Fast reads ⚡
- Single query fetches all related data 🎯
- Bound by 16MB document size
- Ideal when relationship is bounded and frequently read together

Referencing 🔗

- Better for unbounded growth (logs, events, analytics)
- Avoids document bloat
- Requires additional queries or aggregation `$lookup` when joining

Rule of thumb:

- Embed when data is mostly read together and bounded 📚
- Reference when data grows without bound or is shared across many parents 🔗

---

## 3. Aggregation Framework 📊

Concept 🧠

- Aggregation is a pipeline of stages, similar to Linux pipes:
  Input → Filter → Group → Transform → Output

Key stages 🧱

- `$match` → filter early (use indexes) 🧹
- `$group` → aggregate 🧮
- `$lookup` → left outer join across collections 🔍
- `$project` → reshape fields 🧭
- `$sort` → ordering (ideally with supporting index) 📑

Example: Total Revenue per Category 💵📦

```/dev/null/aggregation_example.js#L1-11
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: {
      _id: "$product_category",
      totalRevenue: { $sum: "$amount" }
  }},
  { $sort: { totalRevenue: -1 } }
]);
```

Note ℹ️

- Aggregation runs inside MongoDB’s C++ engine and is typically much faster than app-side processing.
- Place `$match` as early as possible to reduce the working set.

---

## 4. Indexing (Performance Core) 🏎️

### The Problem: Collection Scan (COLLSCAN) 🔍

Without indexes, MongoDB scans every document:

- Complexity: O(N)
- CPU spikes, disk I/O bottlenecks, poor latency at scale

Analogy: Searching a shuffled phone book page by page.

### The Solution: B-Tree Index (IXSCAN) 🌲

MongoDB uses B-Tree indexes.

Index stores:

- Indexed field value
- Pointer to document location

Complexity:

- O(log N)
- 1M docs ≈ ~20 steps; 1B docs ≈ ~30 steps
- Scales with minimal performance cost

### Query Execution: COLLSCAN vs IXSCAN 🧪

1. COLLSCAN (Collection Scan) ❌

- Scans all documents
- Time complexity: O(N)
- Degrades with dataset size

Example (No index)

```/dev/null/collscan_explain.js#L1-20
db.courses.find({ name: "kubernetes" }).explain("executionStats")
// Key fields (conceptually)
stage: COLLSCAN
totalDocsExamined: 43
nReturned: 1
totalKeysExamined: 0
```

Interpretation 🧩:

- MongoDB examined 43 docs to return 1 result → inefficient.

Problems ⚠️:

- High CPU, heavy I/O, slow APIs, not production-ready at scale.

2. IXSCAN (Index Scan) ✅

- Uses index for lookup
- Time complexity: O(log N)
- Scales well with large datasets

Create index:

```/dev/null/create_index.js#L1-3
db.courses.createIndex({ name: 1 })
```

Example (With index)

```/dev/null/ixscan_explain.js#L1-20
db.courses.find({ name: "kubernetes" }).explain("executionStats")
// Key fields (conceptually)
stage: FETCH
inputStage: IXSCAN
totalDocsExamined: 1
totalKeysExamined: 1
nReturned: 1
```

Interpretation 🧩:

- Index found the key “kubernetes”; FETCH retrieved the document.

Why FETCH appears with IXSCAN? 🤔

- Indexes don’t store full documents, only keys and pointers.
- IXSCAN → find pointer; FETCH → load document.

3. Covered Query (No FETCH)
   A query is covered when:

- All requested fields are in the index
- MongoDB does not fetch the document

Example:

```/dev/null/covered_query.js#L1-10
db.courses.createIndex({ name: 1 })
db.courses.find(
  { name: "kubernetes" },
  { _id: 0, name: 1 }
).explain("executionStats")
// stage: IXSCAN (no FETCH)
```

Fastest possible query for that access pattern.

Key comparison 📊

- Uses Index: COLLSCAN ❌ vs IXSCAN ✅
- Docs Examined: All vs Only matching
- Complexity: O(N) vs O(log N)
- Production readiness: COLLSCAN ❌ vs IXSCAN ✅

Golden performance rule 🎯

- Aim for `totalDocsExamined == nReturned`
- If not equal, check indexes and query shape.

### Compound Indexes & ESR Rule 🧩

Field order matters.

ESR Rule:

- E – Equality: exact match fields first
- S – Sort: fields used for sort next
- R – Range: range predicates last

Correct ordering avoids expensive in-memory sorts and maximizes index utility.

### Index Trade-Offs ⚖️

Indexes improve reads but add write overhead.

Each write must:

1. Write the document
2. Update every relevant index

Too many indexes can cause:

- Slower writes
- Higher RAM usage
- Disk swapping if index working set exceeds RAM

### Verification with `explain()` 🔎

Use:

- `db.collection.find(query).explain("executionStats")`
  Check:
- `totalDocsExamined`, `totalKeysExamined`, `nReturned`
  Goal:
- `totalDocsExamined == nReturned` for selective queries

---

## 5. Architecture: Replication & Sharding 🏗️

### Replication (High Availability) 🔁

Replica set roles:

- Primary → handles writes
- Secondary → replicates data
- Automatic election on failure

Oplog 📝:

- Primary writes operations to the oplog
- Secondaries tail the oplog to stay in sync

Read preferences 📖:

- Reads can be routed to secondaries (with consistency caveats)

### Sharding (Horizontal Scaling) 🧩

Problem ❗:

- Single server cannot handle massive datasets or throughput.

Solution ✅:


![[Sharding and replication.gif|500]])
- Split data across shards.

![[Pasted image 20260126152134.png| 500]]

Components 🧰:

- `mongos` → query router
- Config servers → metadata
- Shards → data storage

Shard Key 🔑:

- Critical design decision
- Poor choice causes hot shards and bottlenecks
- Prefer keys with good cardinality and balanced distribution

---

## 6. Advanced & Modern Features ✨

![[Pasted image 20260126152149.png| 500]]

### Multi-Document ACID Transactions 🔒

- Supported since MongoDB 4.0
- Snapshot isolation
- Commit/rollback

Use cases 💼:

- Financial systems, inventory, multi-document consistency

### Time Series Collections ⏱️

Optimized for:

- IoT sensors, logs, stock prices

Benefits:

- Automatic compression
- High write throughput
- Efficient storage layout

### Atlas Vector Search (GenAI) 🧠

- Stores vector embeddings
- Enables semantic similarity search
- Used in AI/LLM applications

---

## 7. Final Takeaways 📌

- NoSQL = Not Only SQL
- Schema validation is optional but powerful
- Indexes are mandatory for performance
- MongoDB excels at large-scale, evolving, semi-structured data

Best fit 👍:

- User profiles
- Product catalogs
- Content platforms
- IoT & real-time systems

SQL still best for 🏦:

- Strong relational integrity
- Highly structured financial systems

![[Pasted image 20260126152201.png| 500]]



# How MongoDB works


![[mongodb.gif|600]]