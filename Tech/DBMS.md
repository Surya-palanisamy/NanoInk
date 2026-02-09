# Database Management Systems (DBMS)

A comprehensive guide covering DBMS fundamentals, SQL databases, and NoSQL databases.

---

## Table of Contents

1. Introduction to DBMS
2. Database Architecture
3. Data Models
4. ER Model & ER Diagrams
5. Relational Model
6. Normalization
7. SQL - Structured Query Language
8. Transactions & Concurrency Control
9. Indexing & Query Optimization
10. NoSQL Databases
11. SQL vs NoSQL
12. Popular Databases

---

## Introduction to DBMS

### What is a Database?

A database is an organized collection of structured data stored electronically in a computer system.

### What is DBMS?

A Database Management System (DBMS) is software that manages databases, providing an interface for users and applications to store, retrieve, update, and manage data.

### Advantages of DBMS

- **Data Abstraction**: Hides complexity from users
- **Data Independence**: Changes in data structure don't affect applications
- **Data Integrity**: Ensures accuracy and consistency
- **Data Security**: Access control and authentication
- **Concurrent Access**: Multiple users can access simultaneously
- **Backup & Recovery**: Protection against data loss
- **Reduced Redundancy**: Minimizes data duplication

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

### 2. Network Model

- Extension of hierarchical model
- Allows many-to-many relationships
- Uses sets to represent relationships

### 3. Relational Model

- Data stored in tables (relations)
- Rows (tuples) and columns (attributes)
- Most widely used model

| EmpID | Name    | Department |
| ----- | ------- | ---------- |
| 1     | Alice   | HR         |
| 2     | Bob     | IT         |
| 3     | Charlie | Finance    |

### 4. Object-Oriented Model

- Data stored as objects
- Supports inheritance and encapsulation
- Complex data types

###

5.  Document Model

- Data stored as documents (JSON/BSON)
- Flexible schema
- Used in NoSQL databases

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
```

#### 2. Attributes

- **Simple**: Cannot be divided (e.g., Age)
- **Composite**: Can be divided (e.g., Full Name → First, Last)
- **Single-valued**: One value (e.g., SSN)
- **Multi-valued**: Multiple values (e.g., Phone Numbers)
- **Derived**: Calculated from other attributes (e.g., Age from DOB)
- **Key Attribute**: Uniquely identifies entity (underlined)

#### 3. Relationships

- Association between entities
- **Degree of Relationship**:
  - Unary (1 entity)
  - Binary (2 entities)
  - Ternary (3 entities)

#### 4. Cardinality

- **One-to-One (1:1)**: One entity relates to one other
- **One-to-Many (1:N)**: One entity relates to many others
- **Many-to-Many (M:N)**: Many entities relate to many others

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

- **Specialization**: Top-down approach (superclass → subclass)
- **Generalization**: Bottom-up approach (subclass → superclass)
- **Aggregation**: Treating relationship as entity

---

## Relational Model

### Key Terminology

- **Relation**: A table
- **Tuple**: A row
- **Attribute**: A column
- **Domain**: Set of allowed values for an attribute
- **Degree**: Number of attributes
- **Cardinality**: Number of tuples

### Keys in RDBMS

| Key Type          | Description                                         |
| ----------------- | --------------------------------------------------- |
| **Super Key**     | Set of attributes that uniquely identifies a tuple  |
| **Candidate Key** | Minimal super key (no proper subset is a super key) |
| **Primary Key**   | Chosen candidate key to identify tuples             |
| **Alternate Key** | Candidate keys not chosen as primary key            |
| **Foreign Key**   | Attribute referencing primary key of another table  |
| **Composite Key** | Key consisting of multiple attributes               |

### Relational Algebra

#### Basic Operations

1. **Selection (σ)**: Select rows based on condition

   ```
   σ(age > 25)(Employee)
   ```

2. **Projection (π)**: Select specific columns

   ```
   π(name, salary)(Employee)
   ```

3. **Union (∪)**: Combine tuples from two relations

   ```
   R ∪ S
   ```

4. **Intersection (∩)**: Common tuples

   ```
   R ∩ S
   ```

5. **Difference (−)**: Tuples in R but not in S

   ```
   R − S
   ```

6. **Cartesian Product (×)**: All combinations

   ```
   R × S
   ```

7. **Rename (ρ)**: Rename relation or attributes
   ```
   ρ(NewName)(R)
   ```

#### Derived Operations

1. **Natural Join (⋈)**: Join on common attributes

   ```
   R ⋈ S
   ```

2. **Theta Join (⋈θ)**: Join with condition

   ```
   R ⋈(R.id = S.id) S
   ```

3. **Division (÷)**: Tuples in R associated with all tuples in S
   ```
   R ÷ S
   ```

### Integrity Constraints

1. **Domain Constraint**: Values must be from defined domain
2. **Entity Integrity**: Primary key cannot be NULL
3. **Referential Integrity**: Foreign key must reference valid primary key
4. **Key Constraint**: Key values must be unique

---

## Normalization

### Purpose

- Eliminate data redundancy
- Prevent update anomalies
- Ensure data integrity

### Anomalies

1. **Insertion Anomaly**: Cannot insert data without other data
2. **Deletion Anomaly**: Deleting data causes unintended loss
3. **Update Anomaly**: Updating requires multiple row changes

### Functional Dependency

If X → Y, then each value of X is associated with exactly one value of Y.

**Types**:

- **Trivial**: X → Y where Y ⊆ X
- **Non-trivial**: X → Y where Y ⊄ X

### Armstrong's Axioms

1. **Reflexivity**: If Y ⊆ X, then X → Y
2. **Augmentation**: If X → Y, then XZ → YZ
3. **Transitivity**: If X → Y and Y → Z, then X → Z

### Normal Forms

#### 1NF (First Normal Form)

- All attributes contain atomic (indivisible) values
- No repeating groups

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

#### 3NF (Third Normal Form)

- Must be in 2NF
- No transitive dependency (non-prime attribute depending on another non-prime attribute)

**Rule**: For X → Y, either:

- X is a superkey, OR
- Y is a prime attribute

#### BCNF (Boyce-Codd Normal Form)

- Must be in 3NF
- For X → Y, X must be a superkey

**Stricter than 3NF** - even prime attributes cannot have dependency on non-superkeys.

#### 4NF (Fourth Normal Form)

- Must be in BCNF
- No multi-valued dependencies

#### 5NF (Fifth Normal Form)

- Must be in 4NF
- No join dependencies

### Normalization Summary

| Normal Form | Requirement                           |
| ----------- | ------------------------------------- |
| 1NF         | Atomic values, no repeating groups    |
| 2NF         | 1NF + No partial dependencies         |
| 3NF         | 2NF + No transitive dependencies      |
| BCNF        | 3NF + Every determinant is a superkey |
| 4NF         | BCNF + No multi-valued dependencies   |
| 5NF         | 4NF + No join dependencies            |

---

## SQL - Structured Query Language

### SQL Categories

1. **DDL (Data Definition Language)**: CREATE, ALTER, DROP, TRUNCATE
2. **DML (Data Manipulation Language)**: INSERT, UPDATE, DELETE
3. **DQL (Data Query Language)**: SELECT
4. **DCL (Data Control Language)**: GRANT, REVOKE
5. **TCL (Transaction Control Language)**: COMMIT, ROLLBACK, SAVEPOINT

### DDL Commands

#### CREATE

```sql
-- Create Database
CREATE DATABASE company;

-- Create Table
CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    department_id INT,
    salary DECIMAL(10, 2) DEFAULT 0.00,
    hire_date DATE,
    FOREIGN KEY (department_id) REFERENCES departments(dept_id)
);

-- Create Index
CREATE INDEX idx_name ON employees(name);

-- Create View
CREATE VIEW high_salary_emp AS
SELECT name, salary FROM employees WHERE salary > 50000;
```

#### ALTER

```sql
-- Add Column
ALTER TABLE employees ADD phone VARCHAR(15);

-- Modify Column
ALTER TABLE employees MODIFY salary DECIMAL(12, 2);

-- Drop Column
ALTER TABLE employees DROP COLUMN phone;

-- Add Constraint
ALTER TABLE employees ADD CONSTRAINT chk_salary CHECK (salary >= 0);

-- Rename Table
ALTER TABLE employees RENAME TO staff;
```

#### DROP & TRUNCATE

```sql
-- Drop Table (removes structure and data)
DROP TABLE employees;

-- Drop Database
DROP DATABASE company;

-- Truncate Table (removes data, keeps structure)
TRUNCATE TABLE employees;
```

### DML Commands

#### INSERT

```sql
-- Insert Single Row
INSERT INTO employees (emp_id, name, email, salary)
VALUES (1, 'Alice', 'alice@email.com', 50000);

-- Insert Multiple Rows
INSERT INTO employees (emp_id, name, email, salary)
VALUES
    (2, 'Bob', 'bob@email.com', 60000),
    (3, 'Charlie', 'charlie@email.com', 55000);

-- Insert from Select
INSERT INTO archive_employees
SELECT * FROM employees WHERE hire_date < '2020-01-01';
```

#### UPDATE

```sql
-- Update Single Column
UPDATE employees SET salary = 55000 WHERE emp_id = 1;

-- Update Multiple Columns
UPDATE employees
SET salary = salary * 1.1, department_id = 2
WHERE department_id = 1;

-- Update with Subquery
UPDATE employees
SET salary = (SELECT AVG(salary) FROM employees)
WHERE emp_id = 1;
```

#### DELETE

```sql
-- Delete Specific Rows
DELETE FROM employees WHERE emp_id = 1;

-- Delete with Condition
DELETE FROM employees WHERE salary < 30000;

-- Delete All Rows
DELETE FROM employees;
```

### DQL Commands - SELECT

#### Basic SELECT

```sql
-- Select All
SELECT * FROM employees;

-- Select Specific Columns
SELECT name, salary FROM employees;

-- Select with Alias
SELECT name AS employee_name, salary AS monthly_salary FROM employees;

-- Select Distinct
SELECT DISTINCT department_id FROM employees;
```

#### WHERE Clause

```sql
-- Comparison Operators
SELECT * FROM employees WHERE salary > 50000;
SELECT * FROM employees WHERE salary >= 50000 AND department_id = 1;
SELECT * FROM employees WHERE salary < 30000 OR department_id = 2;
SELECT * FROM employees WHERE NOT department_id = 1;

-- BETWEEN
SELECT * FROM employees WHERE salary BETWEEN 40000 AND 60000;

-- IN
SELECT * FROM employees WHERE department_id IN (1, 2, 3);

-- LIKE (Pattern Matching)
SELECT * FROM employees WHERE name LIKE 'A%';      -- Starts with A
SELECT * FROM employees WHERE name LIKE '%son';    -- Ends with son
SELECT * FROM employees WHERE name LIKE '%an%';    -- Contains an
SELECT * FROM employees WHERE name LIKE '_o%';     -- Second letter is o

-- IS NULL
SELECT * FROM employees WHERE department_id IS NULL;
SELECT * FROM employees WHERE department_id IS NOT NULL;
```

#### ORDER BY

```sql
-- Ascending Order (default)
SELECT * FROM employees ORDER BY salary;
SELECT * FROM employees ORDER BY salary ASC;

-- Descending Order
SELECT * FROM employees ORDER BY salary DESC;

-- Multiple Columns
SELECT * FROM employees ORDER BY department_id ASC, salary DESC;
```

#### LIMIT & OFFSET

```sql
-- Limit Results
SELECT * FROM employees LIMIT 10;

-- Limit with Offset (Pagination)
SELECT * FROM employees LIMIT 10 OFFSET 20;

-- Alternative Syntax (MySQL)
SELECT * FROM employees LIMIT 20, 10;
```

### Aggregate Functions

```sql
-- COUNT
SELECT COUNT(*) FROM employees;
SELECT COUNT(DISTINCT department_id) FROM employees;

-- SUM
SELECT SUM(salary) FROM employees;

-- AVG
SELECT AVG(salary) FROM employees;

-- MIN / MAX
SELECT MIN(salary), MAX(salary) FROM employees;

-- With GROUP BY
SELECT department_id, COUNT(*), AVG(salary)
FROM employees
GROUP BY department_id;

-- With HAVING (filter groups)
SELECT department_id, AVG(salary) as avg_salary
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 50000;
```

### JOINS

#### Types of Joins

```
┌─────────────────────────────────────────────────────────────┐
│                        JOIN TYPES                           │
├─────────────────────────────────────────────────────────────┤
│  INNER JOIN      - Returns matching rows from both tables   │
│  LEFT JOIN       - All rows from left + matching from right │
│  RIGHT JOIN      - All rows from right + matching from left │
│  FULL OUTER JOIN - All rows from both tables                │
│  CROSS JOIN      - Cartesian product of both tables         │
│  SELF JOIN       - Table joined with itself                 │
└─────────────────────────────────────────────────────────────┘
```

#### Join Examples

```sql
-- INNER JOIN
SELECT e.name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.dept_id;

-- LEFT JOIN
SELECT e.name, d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.dept_id;

-- RIGHT JOIN
SELECT e.name, d.department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.dept_id;

-- FULL OUTER JOIN
SELECT e.name, d.department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.dept_id;

-- CROSS JOIN
SELECT e.name, d.department_name
FROM employees e
CROSS JOIN departments d;

-- SELF JOIN
SELECT e1.name AS employee, e2.name AS manager
FROM employees e1
LEFT JOIN employees e2 ON e1.manager_id = e2.emp_id;

-- Multiple Joins
SELECT e.name, d.department_name, l.city
FROM employees e
JOIN departments d ON e.department_id = d.dept_id
JOIN locations l ON d.location_id = l.location_id;
```

### Subqueries

```sql
-- Subquery in WHERE
SELECT name FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Subquery with IN
SELECT name FROM employees
WHERE department_id IN (SELECT dept_id FROM departments WHERE location = 'NYC');

-- Subquery with EXISTS
SELECT name FROM employees e
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.emp_id = e.emp_id);

-- Subquery in FROM (Derived Table)
SELECT avg_salary.department_id, avg_salary.avg_sal
FROM (SELECT department_id, AVG(salary) as avg_sal
      FROM employees GROUP BY department_id) AS avg_salary
WHERE avg_salary.avg_sal > 50000;

-- Correlated Subquery
SELECT e1.name, e1.salary
FROM employees e1
WHERE e1.salary > (SELECT AVG(e2.salary) FROM employees e2
                   WHERE e1.department_id = e2.department_id);
```

### Set Operations

```sql
-- UNION (removes duplicates)
SELECT name FROM employees
UNION
SELECT name FROM contractors;

-- UNION ALL (keeps duplicates)
SELECT name FROM employees
UNION ALL
SELECT name FROM contractors;

-- INTERSECT
SELECT name FROM employees
INTERSECT
SELECT name FROM managers;

-- EXCEPT / MINUS
SELECT name FROM employees
EXCEPT
SELECT name FROM managers;
```

### Window Functions

```sql
-- ROW_NUMBER
SELECT name, salary,
       ROW_NUMBER() OVER (ORDER BY salary DESC) as row_num
FROM employees;

-- RANK (gaps in ranking for ties)
SELECT name, salary,
       RANK() OVER (ORDER BY salary DESC) as rank
FROM employees;

-- DENSE_RANK (no gaps for ties)
SELECT name, salary,
       DENSE_RANK() OVER (ORDER BY salary DESC) as dense_rank
FROM employees;

-- PARTITION BY
SELECT name, department_id, salary,
       RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as dept_rank
FROM employees;

-- Running Total
SELECT name, salary,
       SUM(salary) OVER (ORDER BY emp_id) as running_total
FROM employees;

-- LAG / LEAD
SELECT name, salary,
       LAG(salary, 1) OVER (ORDER BY emp_id) as prev_salary,
       LEAD(salary, 1) OVER (ORDER BY emp_id) as next_salary
FROM employees;

-- FIRST_VALUE / LAST_VALUE
SELECT name, salary,
       FIRST_VALUE(salary) OVER (PARTITION BY department_id ORDER BY salary DESC) as highest_salary
FROM employees;

-- NTILE
SELECT name, salary,
       NTILE(4) OVER (ORDER BY salary DESC) as quartile
FROM employees;
```

### Common Table Expressions (CTE)

```sql
-- Basic CTE
WITH high_earners AS (
    SELECT * FROM employees WHERE salary > 70000
)
SELECT * FROM high_earners WHERE department_id = 1;

-- Multiple CTEs
WITH
dept_avg AS (
    SELECT department_id, AVG(salary) as avg_salary
    FROM employees
    GROUP BY department_id
),
high_earning_depts AS (
    SELECT department_id FROM dept_avg WHERE avg_salary > 60000
)
SELECT e.* FROM employees e
WHERE e.department_id IN (SELECT department_id FROM high_earning_depts);

-- Recursive CTE
WITH RECURSIVE employee_hierarchy AS (
    -- Base case: top-level managers
    SELECT emp_id, name, manager_id, 1 as level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive case: employees with managers
    SELECT e.emp_id, e.name, e.manager_id, h.level + 1
    FROM employees e
    JOIN employee_hierarchy h ON e.manager_id = h.emp_id
)
SELECT * FROM employee_hierarchy;
```

### DCL Commands

```sql
-- Grant Privileges
GRANT SELECT, INSERT ON employees TO user1;
GRANT ALL PRIVILEGES ON database.* TO admin;
GRANT SELECT ON employees TO PUBLIC;

-- Revoke Privileges
REVOKE INSERT ON employees FROM user1;
REVOKE ALL PRIVILEGES ON database.* FROM user1;
```

### TCL Commands

```sql
-- Start Transaction
START TRANSACTION;
-- or
BEGIN;

-- Commit Transaction
COMMIT;

-- Rollback Transaction
ROLLBACK;

-- Savepoint
SAVEPOINT sp1;
INSERT INTO employees VALUES (4, 'David', 'david@email.com', 45000);
SAVEPOINT sp2;
UPDATE employees SET salary = 50000 WHERE emp_id = 4;
ROLLBACK TO sp1;  -- Undoes both INSERT and UPDATE
```

---

## Transactions & Concurrency Control

### ACID Properties

| Property        | Description                             |
| --------------- | --------------------------------------- |
| **Atomicity**   | All operations complete or none do      |
| **Consistency** | Database remains in valid state         |
| **Isolation**   | Concurrent transactions don't interfere |
| **Durability**  | Committed changes are permanent         |

### Transaction States

```
        ┌──────────┐
        │  Active  │
        └────┬─────┘
             │
    ┌────────┴────────┐
    ▼                 ▼
┌─────────┐     ┌──────────┐
│Partially│     │  Failed  │
│Committed│     └────┬─────┘
└────┬────┘          │
     │               ▼
     ▼          ┌──────────┐
┌──────────┐    │ Aborted  │
│Committed │    └──────────┘
└──────────┘
```

### Concurrency Problems

1. **Dirty Read**: Reading uncommitted data from another transaction
2. **Non-Repeatable Read**: Same query returns different results within transaction
3. **Phantom Read**: New rows appear in repeated query within transaction
4. **Lost Update**: Two transactions overwrite each other's changes

### Isolation Levels

| Level            | Dirty Read | Non-Repeatable Read | Phantom Read |
| ---------------- | ---------- | ------------------- | ------------ |
| READ UNCOMMITTED | ✓          | ✓                   | ✓            |
| READ COMMITTED   | ✗          | ✓                   | ✓            |
| REPEATABLE READ  | ✗          | ✗                   | ✓            |
| SERIALIZABLE     | ✗          | ✗                   | ✗            |

```sql
-- Set Isolation Level
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

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

- **Database Level**: Entire database locked
- **Table Level**: Entire table locked
- **Page Level**: Data page locked
- **Row Level**: Individual row locked

### Two-Phase Locking (2PL)

1. **Growing Phase**: Acquire locks, no releases
2. **Shrinking Phase**: Release locks, no acquisitions

**Variants**:

- **Strict 2PL**: Hold all locks until commit
- **Rigorous 2PL**: Hold all locks until end of transaction

### Deadlock

When two or more transactions wait for each other's locks indefinitely.

```
Transaction T1: Holds Lock A, Wants Lock B
Transaction T2: Holds Lock B, Wants Lock A
```

**Deadlock Handling**:

1. **Prevention**: Ordering of locks, timeout
2. **Detection**: Wait-for graph
3. **Recovery**: Rollback one transaction (victim selection)

### Timestamp-Based Protocols

Each transaction gets a timestamp, operations are ordered by timestamps.

- **Thomas Write Rule**: Ignore outdated writes
- **Optimistic Concurrency Control**: Validate at commit time

---

## Indexing & Query Optimization

### What is an Index?

A data structure that improves data retrieval speed at the cost of additional storage and slower writes.

### Types of Indexes

#### 1. Primary Index

- On primary key
- One per table
- Usually clustered

#### 2. Secondary Index

- On non-primary key columns
- Multiple allowed per table

#### 3. Clustered Index

- Physical order of data matches index order
- Only one per table
- Faster for range queries

#### 4. Non-Clustered Index

- Separate structure from data
- Multiple allowed per table
- Contains pointers to data

#### 5. Dense vs Sparse Index

- **Dense**: Index entry for every record
- **Sparse**: Index entry for some records (requires sorted data)

#### 6. Composite Index

- Index on multiple columns
- Order of columns matters

### Index Data Structures

#### B-Tree Index

- Balanced tree structure
- Good for range queries and equality
- Most common index type

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

#### Hash Index

- Good for equality searches only
- O(1) lookup time
- Not suitable for range queries

#### Bitmap Index

- Efficient for low-cardinality columns
- Good for data warehousing
- Efficient for AND/OR operations

### Creating Indexes

```sql
-- Create Index
CREATE INDEX idx_name ON employees(name);

-- Create Unique Index
CREATE UNIQUE INDEX idx_email ON employees(email);

-- Create Composite Index
CREATE INDEX idx_dept_salary ON employees(department_id, salary);

-- Create Partial Index (PostgreSQL)
CREATE INDEX idx_active ON employees(email) WHERE status = 'active';

-- Create Full-Text Index
CREATE FULLTEXT INDEX idx_description ON products(description);

-- Drop Index
DROP INDEX idx_name ON employees;
```

### Query Optimization

#### EXPLAIN Statement

```sql
-- Analyze query execution plan
EXPLAIN SELECT * FROM employees WHERE department_id = 1;

-- Detailed analysis (MySQL)
EXPLAIN ANALYZE SELECT * FROM employees WHERE department_id = 1;
```

#### Optimization Techniques

1. **Use Indexes Properly**
   - Index frequently searched columns
   - Avoid indexing low-cardinality columns
   - Consider composite indexes for multi-column queries

2. **Avoid SELECT \***

   ```sql
   -- Bad
   SELECT * FROM employees;

   -- Good
   SELECT name, salary FROM employees;
   ```

3. **Use WHERE Instead of HAVING**

   ```sql
   -- Less efficient
   SELECT department_id, COUNT(*)
   FROM employees
   GROUP BY department_id
   HAVING department_id = 1;

   -- More efficient
   SELECT department_id, COUNT(*)
   FROM employees
   WHERE department_id = 1
   GROUP BY department_id;
   ```

4. **Use EXISTS Instead of IN for Subqueries**

   ```sql
   -- Less efficient
   SELECT * FROM employees
   WHERE department_id IN (SELECT dept_id FROM departments WHERE location = 'NYC');

   -- More efficient
   SELECT * FROM employees e
   WHERE EXISTS (SELECT 1 FROM departments d WHERE d.dept_id = e.department_id AND d.location = 'NYC');
   ```

5. **Avoid Functions on Indexed Columns**

   ```sql
   -- Index not used
   SELECT * FROM employees WHERE YEAR(hire_date) = 2023;

   -- Index used
   SELECT * FROM employees WHERE hire_date >= '2023-01-01' AND hire_date < '2024-01-01';
   ```

6. **Use UNION ALL Instead of UNION**
   When duplicates are not an issue

7. **Limit Results**
   ```sql
   SELECT * FROM employees ORDER BY salary DESC LIMIT 10;
   ```

---

## NoSQL Databases

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

- **Consistency**: All nodes see same data
- **Availability**: Every request gets a response
- **Partition Tolerance**: System works despite network failures

| Database Type | CAP Focus              |
| ------------- | ---------------------- |
| MongoDB       | CP (with replica sets) |
| Cassandra     | AP                     |
| Redis         | CP                     |
| CouchDB       | AP                     |

### Types of NoSQL Databases

#### 1. Document Stores

Store data as JSON/BSON documents.

**Examples**: MongoDB, CouchDB, Firebase

```json
{
  "_id": "ObjectId(507f1f77bcf86cd799439011)",
  "name": "Alice",
  "email": "alice@email.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zip": "10001"
  },
  "orders": [
    { "product": "Laptop", "price": 999 },
    { "product": "Mouse", "price": 29 }
  ]
}
```

#### 2. Key-Value Stores

Simple key-value pairs.

**Examples**: Redis, DynamoDB, Memcached

```
user:1001 → {"name": "Alice", "email": "alice@email.com"}
session:abc123 → {"user_id": 1001, "expires": "2024-01-01"}
cache:homepage → "<html>...</html>"
```

#### 3. Column-Family Stores

Data stored in columns instead of rows.

**Examples**: Cassandra, HBase, ScyllaDB

```
Row Key: user_1001
    Column Family: profile
        name: "Alice"
        email: "alice@email.com"
    Column Family: activity
        last_login: "2024-01-15"
        page_views: 150
```

#### 4. Graph Databases

Store nodes and relationships.

**Examples**: Neo4j, Amazon Neptune, ArangoDB

```
(Alice)-[:FRIEND]->(Bob)
(Bob)-[:WORKS_AT]->(Google)
(Alice)-[:LIKES]->(Post:123)
```

### MongoDB Basics

#### Database Operations

```javascript
// Show databases
show dbs

// Use/Create database
use mydb

// Show collections
show collections

// Drop database
db.dropDatabase()
```

#### CRUD Operations

##### Create

```javascript
// Insert One
db.users.insertOne({
  name: "Alice",
  email: "alice@email.com",
  age: 28,
});

// Insert Many
db.users.insertMany([
  { name: "Bob", email: "bob@email.com", age: 32 },
  { name: "Charlie", email: "charlie@email.com", age: 25 },
]);
```

##### Read

```javascript
// Find All
db.users.find();

// Find with Condition
db.users.find({ age: { $gt: 25 } });

// Find One
db.users.findOne({ name: "Alice" });

// Projection (select fields)
db.users.find({}, { name: 1, email: 1, _id: 0 });

// Sorting
db.users.find().sort({ age: -1 });

// Limit & Skip
db.users.find().limit(10).skip(20);

// Count
db.users.countDocuments({ age: { $gt: 25 } });
```

##### Update

```javascript
// Update One
db.users.updateOne({ name: "Alice" }, { $set: { age: 29 } });

// Update Many
db.users.updateMany({ age: { $lt: 30 } }, { $set: { status: "young" } });

// Replace One
db.users.replaceOne(
  { name: "Alice" },
  { name: "Alice", email: "newalice@email.com", age: 29 },
);

// Upsert
db.users.updateOne(
  { name: "David" },
  { $set: { email: "david@email.com", age: 35 } },
  { upsert: true },
);
```

##### Delete

```javascript
// Delete One
db.users.deleteOne({ name: "Alice" });

// Delete Many
db.users.deleteMany({ age: { $lt: 25 } });

// Delete All
db.users.deleteMany({});
```

#### Query Operators

```javascript
// Comparison
$eq; // Equal
$ne; // Not Equal
$gt; // Greater Than
$gte; // Greater Than or Equal
$lt; // Less Than
$lte; // Less Than or Equal
$in; // In Array
$nin; // Not In Array

db.users.find({ age: { $gte: 25, $lte: 35 } });
db.users.find({ status: { $in: ["active", "pending"] } });

// Logical
$and; // Logical AND
$or; // Logical OR
$not; // Logical NOT
$nor; // Logical NOR

db.users.find({
  $or: [{ age: { $lt: 25 } }, { status: "admin" }],
});

// Element
$exists; // Field exists
$type; // Field type

db.users.find({ email: { $exists: true } });

// Array
$all; // Contains all elements
$elemMatch; // Match element in array
$size; // Array size

db.users.find({ tags: { $all: ["tech", "news"] } });
db.users.find({ scores: { $elemMatch: { $gt: 80, $lt: 90 } } });
```

#### Aggregation Pipeline

```javascript
db.orders.aggregate([
  // Stage 1: Match
  { $match: { status: "completed" } },

  // Stage 2: Group
  {
    $group: {
      _id: "$customer_id",
      totalAmount: { $sum: "$amount" },
      orderCount: { $sum: 1 },
    },
  },

  // Stage 3: Sort
  { $sort: { totalAmount: -1 } },

  // Stage 4: Limit
  { $limit: 10 },

  // Stage 5: Project
  {
    $project: {
      customer_id: "$_id",
      totalAmount: 1,
      orderCount: 1,
      _id: 0,
    },
  },
]);
```

**Common Aggregation Stages**:

- `$match` - Filter documents
- `$group` - Group by field
- `$sort` - Sort documents
- `$project` - Reshape documents
- `$limit` / `$skip` - Pagination
- `$unwind` - Deconstruct array field
- `$lookup` - Join with another collection
- `$count` - Count documents

#### Indexes in MongoDB

```javascript
// Create Index
db.users.createIndex({ email: 1 });

// Unique Index
db.users.createIndex({ email: 1 }, { unique: true });

// Compound Index
db.users.createIndex({ name: 1, age: -1 });

// Text Index
db.articles.createIndex({ content: "text" });

// TTL Index (auto-delete after time)
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });

// List Indexes
db.users.getIndexes();

// Drop Index
db.users.dropIndex("email_1");
```

### Redis Basics

#### Data Types

- **Strings**: Simple key-value
- **Lists**: Ordered collections
- **Sets**: Unordered unique elements
- **Sorted Sets**: Ordered unique elements with scores
- **Hashes**: Field-value pairs
- **Streams**: Append-only log

#### Basic Commands

```bash
# Strings
SET user:1001:name "Alice"
GET user:1001:name
INCR counter
EXPIRE key 3600  # TTL in seconds

# Lists
LPUSH mylist "item1"
RPUSH mylist "item2"
LRANGE mylist 0 -1
LPOP mylist

# Sets
SADD myset "member1" "member2"
SMEMBERS myset
SISMEMBER myset "member1"
SUNION set1 set2

# Sorted Sets
ZADD leaderboard 100 "player1" 85 "player2"
ZRANGE leaderboard 0 -1 WITHSCORES
ZRANK leaderboard "player1"

# Hashes
HSET user:1001 name "Alice" email "alice@email.com"
HGET user:1001 name
HGETALL user:1001
HINCRBY user:1001 visits 1

# Keys
KEYS pattern*
DEL key
EXISTS key
TTL key
```

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

- Complex queries with multiple joins
- ACID compliance is critical (banking, financial)
- Well-defined, structured data
- Strong consistency requirements
- Reporting and analytics

### When to Use NoSQL

- Large volumes of unstructured data
- Rapid development with changing requirements
- High scalability needs
- Real-time big data applications
- Caching and session storage
- Content management systems

### Hybrid Approach

Many modern applications use both:

- SQL for transactional data
- NoSQL for caching, sessions, real-time features

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
| **CouchDB**       | Document           | Multi-master replication            | Offline-first applications       |

### NewSQL Databases

Combine SQL with NoSQL scalability:

- **CockroachDB**
- **TiDB**
- **Google Spanner**
- **VoltDB**

---

## Best Practices

### Database Design

1. Normalize to reduce redundancy (up to 3NF/BCNF)
2. Denormalize when performance requires it
3. Use appropriate data types
4. Define proper constraints (PK, FK, NOT NULL, CHECK)
5. Plan for scalability from the start

### Query Optimization

1. Use indexes on frequently queried columns
2. Avoid SELECT \* in production
3. Use EXPLAIN to analyze query plans
4. Optimize JOINs with proper indexes
5. Use pagination for large result sets

### Security

1. Use parameterized queries (prevent SQL injection)
2. Implement least privilege access
3. Encrypt sensitive data
4. Regular backups and testing
5. Keep database software updated

### NoSQL Best Practices

1. Design for your query patterns
2. Embrace denormalization
3. Plan sharding strategy early
4. Use appropriate consistency levels
5. Implement proper indexing

---

## Quick Reference

### SQL Query Order of Execution

```
1. FROM       - Tables and joins
2. WHERE      - Row filtering
3. GROUP BY   - Grouping
4. HAVING     - Group filtering
5. SELECT     - Column selection
6. DISTINCT   - Remove duplicates
7. ORDER BY   - Sorting
8. LIMIT      - Result limiting
```

### Common SQL Patterns

```sql
-- Pagination
SELECT * FROM table ORDER BY id LIMIT 10 OFFSET 20;

-- Top N per group
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY group_col ORDER BY sort_col DESC) as rn
    FROM table
) WHERE rn <= N;

-- Running Total
SELECT *, SUM(amount) OVER (ORDER BY date) as running_total FROM transactions;

-- Find Duplicates
SELECT col, COUNT(*) FROM table GROUP BY col HAVING COUNT(*) > 1;

-- Delete Duplicates (keep one)
DELETE FROM table WHERE id NOT IN (
    SELECT MIN(id) FROM table GROUP BY duplicate_column
);
```

### MongoDB Cheat Sheet

```javascript
// CRUD
db.col.insertOne({}); // Create
db.col.find({}); // Read
db.col.updateOne({}, { $set: {} }); // Update
db.col.deleteOne({}); // Delete

// Query Operators
($eq, $ne, $gt, $gte, $lt, $lte, $in, $nin);
($and, $or, $not, $nor);
($exists, $type);
($all, $elemMatch, $size);

// Update Operators
($set, $unset, $inc, $push, $pull, $addToSet);

// Aggregation
($match, $group, $sort, $project, $limit, $skip, $unwind, $lookup);
```

---

## Further Reading

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Redis Commands](https://redis.io/commands)
- [Database Design - Stanford Course](https://online.stanford.edu/courses/soe-ydatabases-databases)
- [Use The Index, Luke](https://use-the-index-luke.com/)
