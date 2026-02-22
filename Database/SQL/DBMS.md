# Database Management Systems (DBMS)
A comprehensive guide covering DBMS fundamentals, database architecture, and core concepts.
---
## Table of Contents
1. [Introduction to DBMS](#introduction-to-dbms)
2. [Database Architecture](#database-architecture)
3. [Data Models](#data-models)
4. [ER Model & ER Diagrams](#er-model--er-diagrams)
5. [Relational Model](#relational-model)
6. [Normalization](#normalization)
7. [Transactions & Concurrency Control](#transactions--concurrency-control)
8. [Indexing](#indexing)
9. [NoSQL Overview](#nosql-overview)
10. [SQL vs NoSQL](#sql-vs-nosql)
11. [Popular Databases](#popular-databases)
12. [Best Practices](#best-practices)
> **Related Guides:**
>
> - [SQL Guide](./SQL.md) - Complete SQL commands and queries
> - [MongoDB Guide](./Mongodb.md) - MongoDB in-depth
> - [Redis Guide](./Redis.md) - Redis data structures and commands
---
## Introduction to DBMS
### What is a Database?
A database is an organized collection of structured data stored electronically in a computer system.
### What is DBMS?
A Database Management System (DBMS) is software that manages databases, providing an interface for users and applications to store, retrieve, update, and manage data.
### Advantages of DBMS
| Advantage              | Description                                         |
| ---------------------- | --------------------------------------------------- |
| **Data Abstraction**   | Hides complexity from users                         |
| **Data Independence**  | Changes in data structure don't affect applications |
| **Data Integrity**     | Ensures accuracy and consistency                    |
| **Data Security**      | Access control and authentication                   |
| **Concurrent Access**  | Multiple users can access simultaneously            |
| **Backup & Recovery**  | Protection against data loss                        |
| **Reduced Redundancy** | Minimizes data duplication                          |
### Types of DBMS
1. **Hierarchical DBMS**: Tree-like structure (e.g., IBM IMS)
2. **Network DBMS**: Graph structure with multiple parents (e.g., IDMS)
3. **Relational DBMS (RDBMS)**: Table-based structure (e.g., MySQL, PostgreSQL)
4. **Object-Oriented DBMS**: Object-based storage (e.g., db4o)
5. **NoSQL DBMS**: Non-relational (e.g., MongoDB, Redis)
---
## Database Architecture
### Three-Schema Architecture
```
┌─────────────────────────────────────────┐
│           External Level                │  ← User Views (View 1, View 2, ...)
│         (View Schema)                   │
├─────────────────────────────────────────┤
│          Conceptual Level               │  ← Logical Structure
│       (Logical Schema)                  │
├─────────────────────────────────────────┤
│           Internal Level                │  ← Physical Storage
│        (Physical Schema)                │
└─────────────────────────────────────────┘
```
### Data Independence
1. **Logical Data Independence**: Ability to change conceptual schema without affecting external schema
2. **Physical Data Independence**: Ability to change internal schema without affecting conceptual schema
### Database Users
- **Database Administrator (DBA)**: Manages entire database system
- **Database Designers**: Design database structure
- **Application Programmers**: Write applications using database
- **End Users**: Query and use the database
### DBMS Components
```
┌─────────────────────────────────────────────────────────────┐
│                        DBMS COMPONENTS                       │
├─────────────────────────────────────────────────────────────┤
│  Query Processor         │  Parses and optimizes queries    │
│  Storage Manager         │  Manages disk storage            │
│  Transaction Manager     │  Handles ACID properties         │
│  Buffer Manager          │  Manages memory buffers          │
│  Lock Manager            │  Controls concurrent access      │
│  Recovery Manager        │  Ensures durability & recovery   │
└─────────────────────────────────────────────────────────────┘
```
---
## Data Models
### 1. Hierarchical Model
- Data organized in tree-like structure
- Parent-child relationships
- One-to-many relationships only
```
         [Company]
        /    |    \
   [Dept1] [Dept2] [Dept3]
    /   \
[Emp1] [Emp2]
```
**Pros**: Simple navigation, fast access
**Cons**: No many-to-many, complex updates
### 2. Network Model
- Extension of hierarchical model
- Allows many-to-many relationships
- Uses sets to represent relationships
```
    [Student]─────┬─────[Student]
        │         │         │
        ▼         ▼         ▼
    [Course]   [Course]  [Course]
```
**Pros**: More flexible than hierarchical
**Cons**: Complex implementation, difficult maintenance
### 3. Relational Model
- Data stored in tables (relations)
- Rows (tuples) and columns (attributes)
- Most widely used model
| EmpID | Name    | Department |
| ----- | ------- | ---------- |
| 1     | Alice   | HR         |
| 2     | Bob     | IT         |
| 3     | Charlie | Finance    |
**Pros**: Simple, flexible, powerful query language (SQL)
**Cons**: Can be slower for large-scale distributed systems
### 4. Object-Oriented Model
- Data stored as objects
- Supports inheritance and encapsulation
- Complex data types
**Pros**: Natural fit for OOP languages
**Cons**: Less mature, complex queries
### 5. Document Model
- Data stored as documents (JSON/BSON)
- Flexible schema
- Used in NoSQL databases
```json
{
  "name": "Alice",
  "department": "HR",
  "skills": ["communication", "management"]
}
```
**Pros**: Flexible, scales horizontally
**Cons**: Limited joins, eventual consistency
---
## ER Model & ER Diagrams
### Entity-Relationship Model
A conceptual data model used to describe the structure of a database.
### Components
#### 1. Entity
- Real-world object with independent existence
- **Strong Entity**: Has its own primary key
- **Weak Entity**: Depends on another entity for identification
```
┌───────────────┐        ╔═══════════════╗
│   Student     │        ║   Dependent   ║
│  (Strong)     │        ║    (Weak)     ║
└───────────────┘        ╚═══════════════╝
     Rectangle          Double Rectangle
```
#### 2. Attributes
| Type              | Description                                    | Notation        |
| ----------------- | ---------------------------------------------- | --------------- |
| **Simple**        | Cannot be divided (e.g., Age)                  | ○               |
| **Composite**     | Can be divided (e.g., Full Name → First, Last) | ○─┬─○           |
| **Single-valued** | One value (e.g., SSN)                          | ○               |
| **Multi-valued**  | Multiple values (e.g., Phone Numbers)          | ◎ (double oval) |
| **Derived**       | Calculated from others (e.g., Age from DOB)    | ○ (dashed)      |
| **Key Attribute** | Uniquely identifies entity                     | ○ (underlined)  |
#### 3. Relationships
- Association between entities
- **Degree of Relationship**:
  - Unary (1 entity) - Employee manages Employee
  - Binary (2 entities
    ) - Student enrolls in Course
  - Ternary (3 entities) - Supplier supplies Part to Project
#### 4. Cardinality
| Cardinality | Description                         | Example                |
| ----------- | ----------------------------------- | ---------------------- |
| **1:1**     | One entity relates to one other     | Person ↔ Passport      |
| **1:N**     | One entity relates to many others   | Department → Employees |
| **M:N**     | Many entities relate to many others | Students ↔ Courses     |
### ER Diagram Notation
```
┌─────────────┐         ◇─────────◇         ┌─────────────┐
│   Entity    │─────────│Relationship│───────│   Entity    │
└─────────────┘         ◇─────────◇         └─────────────┘
      │
      │
    ○─○ (Attribute)
```
### Extended ER (EER) Concepts
#### Specialization (Top-down)
Defining subclasses from a superclass
```
        [Person]
           │
     ┌─────┴─────┐
     ▼           ▼
[Employee]   [Customer]
```
#### Generalization (Bottom-up)
Combining subclasses into a superclass
#### Aggregation
Treating a relationship as an entity
```
┌─────────────────────────────┐
│    [Works_On] relationship  │
│   (Employee works on Project)│
└──────────────┬──────────────┘
               │
               ▼
        [Monitors] ← Manager monitors Works_On
```
---
## Relational Model
### Key Terminology
| Term            | Description                               |
| --------------- | ----------------------------------------- |
| **Relation**    | A table                                   |
| **Tuple**       | A row                                     |
| **Attribute**   | A column                                  |
| **Domain**      | Set of allowed values for an attribute    |
| **Degree**      | Number of attributes                      |
| **Cardinality** | Number of tuples                          |
| **Schema**      | Structure definition (R(A₁, A₂, ..., Aₙ)) |
### Keys in RDBMS
| Key Type          | Description                                         |
| ----------------- | --------------------------------------------------- |
| **Super Key**     | Set of attributes that uniquely identifies a tuple  |
| **Candidate Key** | Minimal super key (no proper subset is a super key) |
| **Primary Key**   | Chosen candidate key to identify tuples             |
| **Alternate Key** | Candidate keys not chosen as primary key            |
| **Foreign Key**   | Attribute referencing primary key of another table  |
| **Composite Key** | Key consisting of multiple attributes               |
| **Surrogate Key** | System-generated artificial key                     |
### Relational Algebra
#### Basic Operations
| Operation         | Symbol | Description                       |
| ----------------- | ------ | --------------------------------- |
| Selection         | σ      | Select rows based on condition    |
| Projection        | π      | Select specific columns           |
| Union             | ∪      | Combine tuples from two relations |
| Intersection      | ∩      | Common tuples                     |
| Difference        | −      | Tuples in R but not in S          |
| Cartesian Product | ×      | All combinations                  |
| Rename            | ρ      | Rename relation or attributes     |
**Examples:**
```
σ(age > 25)(Employee)        -- Select employees over 25
π(name, salary)(Employee)    -- Project name and salary
R ∪ S                        -- Union of R and S
R ∩ S                        -- Intersection
R − S                        -- Difference
R × S                        -- Cartesian product
ρ(NewName)(R)                -- Rename
```
#### Derived Operations
| Operation    | Symbol | Description                                 |
| ------------ | ------ | ------------------------------------------- |
| Natural Join | ⋈      | Join on common attributes                   |
| Theta Join   | ⋈θ     | Join with condition                         |
| Equi Join    | ⋈=     | Join with equality condition                |
| Semi Join    | ⋉      | Tuples in R that have match in S            |
| Anti Join    | ▷      | Tuples in R with no match in S              |
| Division     | ÷      | Tuples in R associated with all tuples in S |
### Integrity Constraints
1. **Domain Constraint**: Values must be from defined domain
   - `age INT CHECK (age >= 0 AND age <= 150)`
2. **Entity Integrity**: Primary key cannot be NULL
   - Every relation must have a primary key
   - Primary key values must be unique
3. **Referential Integrity**: Foreign key must reference valid primary key
   - Can be NULL (optional relationship)
   - Must match existing PK value
4. **Key Constraint**: Key values must be unique
5. **Semantic Constraints**: Application-specific rules
   - `salary >= minimum_wage`
   - `end_date > start_date`
---
## Normalization
### Purpose
- Eliminate data redundancy
- Prevent update anomalies
- Ensure data integrity
- Organize data logically
### Anomalies
| Anomaly       | Problem                                |
| ------------- | -------------------------------------- |
| **Insertion** | Cannot insert data without other data  |
| **Deletion**  | Deleting data causes unintended loss   |
| **Update**    | Updating requires multiple row changes |
**Example of Unnormalized Data:**
| StudentID | StudentName | CourseID | CourseName | InstructorID | InstructorName |
| --------- | ----------- | -------- | ---------- | ------------ | -------------- |
| 1         | Alice       | C101     | Math       | I01          | Dr. Smith      |
| 1         | Alice       | C102     | Physics    | I02          | Dr. Jones      |
| 2         | Bob         | C101     | Math       | I01          | Dr. Smith      |
**Problems:**
- Insertion: Can't add instructor without student
- Deletion: Deleting Bob loses C101 info if he's the only student
- Update: Changing "Math" requires updating multiple rows
### Functional Dependency
If X → Y, then each value of X is associated with exactly one value of Y.
**Types**:
- **Trivial**: X → Y where Y ⊆ X
- **Non-trivial**: X → Y where Y ⊄ X
- **Full**: Y depends on entire X, not a subset
- **Partial**: Y depends on part of X
- **Transitive**: X → Y and Y → Z, therefore X → Z
### Armstrong's Axioms
1. **Reflexivity**: If Y ⊆ X, then X → Y
2. **Augmentation**: If X → Y, then XZ → YZ
3. **Transitivity**: If X → Y and Y → Z, then X → Z
**Derived Rules:**
- **Union**: If X → Y and X → Z, then X → YZ
- **Decomposition**: If X → YZ, then X → Y and X → Z
- **Pseudotransitivity**: If X → Y and WY → Z, then WX → Z
### Normal Forms
#### 1NF (First Normal Form)
- All attributes contain atomic (indivisible) values
- No repeating groups
- Each row is unique
**Before 1NF:**
| ID | Name | Phone Numbers |
|----|-------|-------------------|
| 1 | Alice | 123-456, 789-012 |
**After 1NF:**
| ID | Name | Phone Number |
|----|-------|--------------|
| 1 | Alice | 123-456 |
| 1 | Alice | 789-012 |
#### 2NF (Second Normal Form)
- Must be in 1NF
- No partial dependency (non-prime attribute depending on part of candidate key)
- Applies to composite keys
**Before 2NF:** (Composite key: StudentID, CourseID)
| StudentID | CourseID | StudentName | Grade |
|-----------|----------|-------------|-------|
StudentName depends only on StudentID (partial dependency)
**After 2NF:**
- Students(StudentID, StudentName)
- Enrollments(StudentID, CourseID, Grade)
#### 3NF (Third Normal Form)
- Must be in 2NF
- No transitive dependency (non-prime attribute depending on another non-prime attribute)
**Rule**: For X → Y, either:
- X is a superkey, OR
- Y is a prime attribute (part of candidate key)
**Before 3NF:**
| EmpID | DeptID | DeptName |
|-------|--------|----------|
DeptName depends on DeptID, not on EmpID (transitive)
**After 3NF:**
- Employees(EmpID, DeptID)
- Departments(DeptID, DeptName)
#### BCNF (Boyce-Codd Normal Form)
- Must be in 3NF
- For every X → Y, X must be a superkey
- **Stricter than 3NF**: Even prime attributes cannot have dependency on non-superkeys
**Difference from 3NF:**
- 3NF allows X → Y if Y is prime attribute
- BCNF requires X to always be superkey
#### 4NF (Fourth Normal Form)
- Must be in BCNF
- No multi-valued dependencies
- A multi-valued dependency X →→ Y means for each X, there's a set of Y values independent of other attributes
**Before 4NF:**
| Student | Course | Hobby |
|---------|--------|-------|
| Alice | Math | Chess |
| Alice | Math | Music |
| Alice | Physics | Chess |
| Alice | Physics | Music |
Courses and Hobbies are independent of each other.
**After 4NF:**
- StudentCourses(Student, Course)
- StudentHobbies(Student, Hobby)
#### 5NF (Fifth Normal Form)
- Must be in 4NF
- No join dependencies
- Can't be decomposed further without losing data
### Normalization Summary
| Normal Form | Requirement                           |
| ----------- | ------------------------------------- |
| 1NF         | Atomic values, no repeating groups    |
| 2NF         | 1NF + No partial dependencies         |
| 3NF         | 2NF + No transitive dependencies      |
| BCNF        | 3NF + Every determinant is a superkey |
| 4NF         | BCNF + No multi-valued dependencies   |
| 5NF         | 4NF + No join dependencies            |
### Denormalization
Sometimes we intentionally denormalize for:
- **Performance**: Reduce joins
- **Reporting**: Pre-computed aggregates
- **Read-heavy workloads**: Trade write complexity for read speed
---
## Transactions & Concurrency Control
### What is a Transaction?
A transaction is a logical unit of work that contains one or more database operations.
### ACID Properties
| Property        | Description                             | Example                                           |
| --------------- | --------------------------------------- | ------------------------------------------------- |
| **Atomicity**   | All operations complete or none do      | Bank transfer: both debit and credit must succeed |
| **Consistency** | Database remains in valid state         | Constraints are maintained                        |
| **Isolation**   | Concurrent transactions don't interfere | Each transaction sees consistent snapshot         |
| **Durability**  | Committed changes are permanent         | Data survives system crash                        |
### Transaction States
```
        ┌──────────┐
        │  Active  │ ← Transaction executing
        └────┬─────┘
             │
    ┌────────┴────────┐
    ▼                 ▼
┌─────────┐     ┌──────────┐
│Partially│     │  Failed  │ ← Error occurred
│Committed│     └────┬─────┘
└────┬────┘          │
     │               ▼
     ▼          ┌──────────┐
┌──────────┐    │ Aborted  │ ← Rolled back
│Committed │    └──────────┘
└──────────┘
```
### Concurrency Problems
| Problem                 | Description                                             |
| ----------------------- | ------------------------------------------------------- |
| **Dirty Read**          | Reading uncommitted data from another transaction       |
| **Non-Repeatable Read** | Same query returns different results within transaction |
| **Phantom Read**        | New rows appear in repeated query within transaction    |
| **Lost Update**         | Two transactions overwrite each other's changes         |
### Isolation Levels
| Level            | Dirty Read | Non-Repeatable Read | Phantom Read |
| ---------------- | ---------- | ------------------- | ------------ |
| READ UNCOMMITTED | ✓          | ✓                   | ✓            |
| READ COMMITTED   | ✗          | ✓                   | ✓            |
| REPEATABLE READ  | ✗          | ✗                   | ✓            |
| SERIALIZABLE     | ✗          | ✗                   | ✗            |
### Locking Mechanisms
#### Types of Locks
- **Shared Lock (S)**: For reading, multiple transactions can hold
- **Exclusive Lock (X)**: For writing, only one transaction can hold
#### Lock Compatibility Matrix
|       | S   | X   |
| ----- | --- | --- |
| **S** | ✓   | ✗   |
| **X** | ✗   | ✗   |
#### Lock Granularity
| Level    | Description            | Concurrency | Overhead |
| -------- | ---------------------- | ----------- | -------- |
| Database | Entire database locked | Low         | Low      |
| Table    | Entire table locked    | Low-Medium  | Low      |
| Page     | Data page locked       | Medium      | Medium   |
| Row      | Individual row locked  | High        | High     |
### Two-Phase Locking (2PL)
1. **Growing Phase**: Acquire locks, no releases
2. **Shrinking Phase**: Release locks, no acquisitions
**Variants**:
- **Strict 2PL**: Hold all exclusive locks until commit
- **Rigorous 2PL**: Hold all locks until end of transaction
### Deadlock
When two or more transactions wait for each other's locks indefinitely.
```
Transaction T1: Holds Lock A, Wants Lock B
Transaction T2: Holds Lock B, Wants Lock A
```
**Deadlock Handling**:
| Method     | Description                                 |
| ---------- | ------------------------------------------- |
| Prevention | Ordering of locks, timeout                  |
| Detection  | Wait-for graph cycle detection              |
| Recovery   | Rollback one transaction (victim selection) |
### Timestamp-Based Protocols
Each transaction gets a timestamp, operations are ordered by timestamps.
- **Thomas Write Rule**: Ignore outdated writes
- **Optimistic Concurrency Control**: Validate at commit time
### MVCC (Multi-Version Concurrency Control)
- Maintains multiple versions of data
- Readers don't block writers, writers don't block readers
- Used by PostgreSQL, MySQL InnoDB, Oracle
---
## Indexing
### What is an Index?
A data structure that improves data retrieval speed at the cost of additional storage and slower writes.
**Analogy**: Like an index in a book that helps you find topics without reading every page.
### Types of Indexes
| Index Type              | Description                                            |
| ----------------------- | ------------------------------------------------------ |
| **Primary Index**       | On primary key, one per table, usually clustered       |
| **Secondary Index**     | On non-primary key columns, multiple allowed           |
| **Clustered Index**     | Physical order matches index order, only one per table |
| **Non-Clustered Index** | Separate structure from data, contains pointers        |
| **Dense Index**         | Index entry for every record                           |
| **Sparse Index**        | Index entry for some records (requires sorted data)    |
| **Composite Index**     | Index on multiple columns                              |
### Index Data Structures
#### B-Tree Index
- Balanced tree structure
- Good for range queries and equality
- Most common index type
- O(log n) search complexity
```
            [50]
           /    \
      [30]        [70]
     /    \      /    \
  [10,20] [40] [60] [80,90]
```
#### B+ Tree Index
- All data in leaf nodes
- Leaf nodes linked for range scans
- Used by most RDBMS
- Better for range queries than B-Tree
#### Hash Index
- Good for equality searches only
- O(1) lookup time
- Not suitable for range queries
- Used in memory databases
#### Bitmap Index
- Efficient for low-cardinality columns
- Good for data warehousing
- Efficient for AND/OR operations
- Example: Gender (M/F), Status (Active/Inactive)
### Index Trade-offs
| Benefit           | Cost                       |
| ----------------- | -------------------------- |
| Faster reads      | Slower writes              |
| Quick lookups     | Additional storage         |
| Efficient sorting | Index maintenance overhead |
### When to Use Indexes
✅ **Good candidates:**
- Primary keys and foreign keys
- Columns frequently used in WHERE clauses
- Columns used in JOIN conditions
- Columns used in ORDER BY
❌ **Avoid indexing:**
- Small tables
- Columns with low cardinality
- Frequently updated columns
- Columns rarely used in queries
---
## NoSQL Overview
### What is NoSQL?
"Not Only SQL" - databases that provide mechanisms for storage and retrieval other than tabular relations.
### Characteristics
- **Schema-less**: Flexible data structure
- **Horizontally Scalable**: Add more servers easily
- **Distributed**: Data spread across nodes
- **High Availability**: Built-in replication
- **Eventual Consistency**: Trade consistency for availability
### CAP Theorem
A distributed system can only guarantee two of these three properties:
```
        Consistency
           /\
          /  \
         /    \
        /      \
       /________\
Availability  Partition Tolerance
```
| Property                | Description                           |
| ----------------------- | ------------------------------------- |
| **Consistency**         | All nodes see same data at same time  |
| **Availability**        | Every request gets a response         |
| **Partition Tolerance** | System works despite network failures |
| Database Type     | CAP Focus              |
| ----------------- | ---------------------- |
| MongoDB           | CP (with replica sets) |
| Cassandra         | AP                     |
| Redis             | CP                     |
| CouchDB           | AP                     |
| Traditional RDBMS | CA                     |
### Types of NoSQL Databases
#### 1. Document Stores
Store data as JSON/BSON documents with flexible schema.
**Examples**: MongoDB, CouchDB, Firebase
**Best for**: Content management, catalogs, user profiles
#### 2. Key-Value Stores
Simple key-value pairs, extremely fast.
**Examples**: Redis, DynamoDB, Memcached
**Best for**: Caching, sessions, real-time data
#### 3. Column-Family Stores
Data stored in columns instead of rows, good for analytics.
**Examples**: Cassandra, HBase, ScyllaDB
**Best for**: Time-series, IoT, large-scale analytics
#### 4. Graph Databases
Store nodes and relationships, optimized for connected data.
**Examples**: Neo4j, Amazon Neptune, ArangoDB
**Best for**: Social networks, recommendations, fraud detection
> **For detailed NoSQL database guides, see:**
>
> - [MongoDB Guide](./Mongodb.md)
> - [Redis Guide](./Redis.md)
---
## SQL vs NoSQL
### Comparison Table
| Aspect             | SQL                           | NoSQL                               |
| ------------------ | ----------------------------- | ----------------------------------- |
| **Data Model**     | Relational (Tables)           | Various (Document, Key-Value, etc.) |
| **Schema**         | Fixed, predefined             | Dynamic, flexible                   |
| **Scalability**    | Vertical (scale up)           | Horizontal (scale out)              |
| **ACID**           | Strong support                | Varies (often eventual consistency) |
| **Joins**          | Built-in support              | Limited or no support               |
| **Query Language** | Standardized SQL              | Database-specific                   |
| **Best For**       | Complex queries, transactions | Large-scale, flexible data          |
| **Examples**       | MySQL, PostgreSQL, Oracle     | MongoDB, Redis, Cassandra           |
### When to Use SQL
✅ Use SQL when:
- Complex queries with multiple joins
- ACID compliance is critical (banking, financial)
- Well-defined, structured data
- Strong consistency requirements
- Reporting and analytics
### When to Use NoSQL
✅ Use NoSQL when:
- Large volumes of un
  structured data
- Rapid development with changing requirements
- High scalability needs
- Real-time big data applications
- Caching and session storage
- Content management systems
### Hybrid Approach
Many modern applications use both:
- **SQL** for transactional data (orders, payments)
- **NoSQL** for caching, sessions, real-time features
---
## Popular Databases
### Relational Databases (SQL)
| Database       | Key Features                                  | Use Cases                           |
| -------------- | --------------------------------------------- | ----------------------------------- |
| **MySQL**      | Open-source, widely used, good performance    | Web applications, CMS               |
| **PostgreSQL** | Advanced features, extensible, ACID compliant | Complex applications, GIS           |
| **Oracle**     | Enterprise-grade, robust, comprehensive       | Large enterprises, critical systems |
| **SQL Server** | Microsoft ecosystem, BI integration           | Windows environments, enterprise    |
| **SQLite**     | Embedded, serverless, zero-config             | Mobile apps, embedded systems       |
| **MariaDB**    | MySQL fork, community-driven                  | Drop-in MySQL replacement           |
### NoSQL Databases
| Database          | Type               | Key Features                        | Use Cases                        |
| ----------------- | ------------------ | ----------------------------------- | -------------------------------- |
| **MongoDB**       | Document           | Flexible schema, horizontal scaling | Content management, catalogs     |
| **Redis**         | Key-Value          | In-memory, fast, data structures    | Caching, sessions, real-time     |
| **Cassandra**     | Column-Family      | High availability, no SPOF          | Time-series, IoT                 |
| **DynamoDB**      | Key-Value/Document | AWS managed, serverless             | Serverless applications          |
| **Neo4j**         | Graph              | Cypher query language, ACID         | Social networks, recommendations |
| **Elasticsearch** | Search Engine      | Full-text search, analytics         | Log analysis, search             |
### NewSQL Databases
Combine SQL with NoSQL scalability:
| Database           | Description                               |
| ------------------ | ----------------------------------------- |
| **CockroachDB**    | Distributed SQL, PostgreSQL compatible    |
| **TiDB**           | MySQL compatible, horizontal scaling      |
| **Google Spanner** | Globally distributed, strongly consistent |
| **VoltDB**         | In-memory, ACID compliant                 |
---
## Best Practices
### Database Design
1. **Normalize appropriately** (usually to 3NF/BCNF)
2. **Denormalize when performance requires** (read-heavy workloads)
3. **Use appropriate data types** (smallest type that fits)
4. **Define proper constraints** (PK, FK, NOT NULL, CHECK)
5. **Plan for scalability** from the start
### Indexing
1. Index columns used in WHERE, JOIN, ORDER BY
2. Avoid over-indexing (slows writes)
3. Use composite indexes for multi-column queries
4. Monitor and remove unused indexes
5. Consider covering indexes for read-heavy queries
### Query Optimization
1. Use EXPLAIN to analyze query plans
2. Avoid SELECT \* in production
3. Use appropriate joins (not always INNER)
4. Limit result sets with pagination
5. Batch operations when possible
### Security
1. Use parameterized queries (prevent SQL injection)
2. Implement least privilege access
3. Encrypt sensitive data (at rest and in transit)
4. Regular backups and testing
5. Keep database software updated
### Backup & Recovery
1. Implement regular backup schedules
2. Test recovery procedures regularly
3. Use point-in-time recovery when available
4. Store backups in multiple locations
5. Document recovery procedures
---
## Quick Reference
### Normalization Cheat Sheet
```
1NF: Atomic values, no repeating groups
2NF: 1NF + No partial dependencies
3NF: 2NF + No transitive dependencies
BCNF: 3NF + Every determinant is a superkey
4NF: BCNF + No multi-valued dependencies
5NF: 4NF + No join dependencies
```
### ACID Properties
```
Atomicity   - All or nothing
Consistency - Valid state to valid state
Isolation   - Transactions don't interfere
Durability  - Committed = Permanent
```
### Isolation Levels (Increasing Strictness)
```
READ UNCOMMITTED → READ COMMITTED → REPEATABLE READ → SERIALIZABLE
      (fastest)                                         (safest)
```
### Key Types
```
Super Key     ⊇ Candidate Key ⊇ Primary Key
                              ⊇ Alternate Key
Foreign Key   → References Primary Key
Composite Key = Multiple Attributes
```
---
## Further Reading
- [SQL Guide](./SQL.md) - Complete SQL reference
- [MongoDB Guide](./Mongodb.md) - Document database in-depth
- [Redis Guide](./Redis.md) - In-memory data store
- [Database Design - Stanford Course](https://online.stanford.edu/courses/soe-ydatabases-databases)
- [Use The Index, Luke](https://use-the-index-luke.com/)
- [CMU Database Systems](https://15445.courses.cs.cmu.edu/)
