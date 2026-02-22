# SQL - Structured Query Language
A comprehensive guide to SQL covering all commands, queries, joins, subqueries, window functions, and advanced topics.
---
## Table of Contents
1. [Introduction to SQL](#introduction-to-sql)
2. [SQL Categories](#sql-categories)
3. [DDL - Data Definition Language](#ddl---data-definition-language)
4. [DML - Data Manipulation Language](#dml---data-manipulation-language)
5. [DQL - Data Query Language](#dql---data-query-language)
6. [Aggregate Functions](#aggregate-functions)
7. [JOINS](#joins)
8. [Subqueries](#subqueries)
9. [Set Operations](#set-operations)
10. [Window Functions](#window-functions)
11. [Common Table Expressions (CTE)](#common-table-expressions-cte)
12. [DCL - Data Control Language](#dcl---data-control-language)
13. [TCL - Transaction Control Language](#tcl---transaction-control-language)
14. [Constraints](#constraints)
15. [Views](#views)
16. [Stored Procedures & Functions](#stored-procedures--functions)
17. [Triggers](#triggers)
18. [Query Optimization Tips](#query-optimization-tips)
19. [Common SQL Patterns](#common-sql-patterns)
20. [Quick Reference](#quick-reference)
---
## Introduction to SQL
SQL (Structured Query Language) is the standard language for managing and manipulating relational databases.
### Key Characteristics
- **Declarative Language**: Specify *what* you want, not *how* to get it
- **Standardized**: ANSI/ISO standard (with vendor-specific extensions)
- **Set-Based**: Operates on sets of rows
- **Case-Insensitive**: Keywords are case-insensitive (convention: UPPERCASE)
### SQL Dialects
| Database   | Dialect        |
|------------|----------------|
| MySQL      | MySQL SQL      |
| PostgreSQL | PL/pgSQL       |
| Oracle     | PL/SQL         |
| SQL Server | T-SQL          |
| SQLite     | SQLite SQL     |
---
## SQL Categories
```
┌─────────────────────────────────────────────────────────────────┐
│                      SQL COMMAND CATEGORIES                      │
├─────────────────────────────────────────────────────────────────┤
│  DDL (Data Definition Language)                                  │
│      CREATE, ALTER, DROP, TRUNCATE, RENAME                       │
├─────────────────────────────────────────────────────────────────┤
│  DML (Data Manipulation Language)                                │
│      INSERT, UPDATE, DELETE, MERGE                               │
├─────────────────────────────────────────────────────────────────┤
│  DQL (Data Query Language)                                       │
│      SELECT                                                      │
├─────────────────────────────────────────────────────────────────┤
│  DCL (Data Control Language)                                     │
│      GRANT, REVOKE                                               │
├─────────────────────────────────────────────────────────────────┤
│  TCL (Transaction Control Language)                              │
│      COMMIT, ROLLBACK, SAVEPOINT, SET TRANSACTION                │
└─────────────────────────────────────────────────────────────────┘
```
---
## DDL - Data Definition Language
DDL commands define and modify database structure.
### CREATE
#### Create Database
```sql
-- Create Database
CREATE DATABASE company;
-- Create Database with options (MySQL)
CREATE DATABASE company
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
-- Use Database
USE company;
```
#### Create Table
```sql
-- Basic Table Creation
CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    department_id INT,
    salary DECIMAL(10, 2) DEFAULT 0.00,
    hire_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Table with Foreign Key
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    total_amount DECIMAL(12, 2),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
-- Table with Composite Primary Key
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
-- Create Table from SELECT
CREATE TABLE employee_backup AS
SELECT * FROM employees WHERE is_active = TRUE;
-- Create Temporary Table
CREATE TEMPORARY TABLE temp_results (
    id INT,
    value VARCHAR(100)
);
```
#### Create Index
```sql
-- Simple Index
CREATE INDEX idx_name ON employees(name);
-- Unique Index
CREATE UNIQUE INDEX idx_email ON employees(email);
-- Composite Index
CREATE INDEX idx_dept_salary ON employees(department_id, salary);
-- Partial Index (PostgreSQL)
CREATE INDEX idx_active_employees ON employees(email) 
WHERE is_active = TRUE;
-- Full-Text Index (MySQL)
CREATE FULLTEXT INDEX idx_description ON products(description);
-- Descending Index
CREATE INDEX idx_salary_desc ON employees(salary DESC);
```
#### Create View
```sql
-- Simple View
CREATE VIEW high_salary_employees AS
SELECT emp_id, name, salary, department_id
FROM employees
WHERE salary > 50000;
-- View with Join
CREATE VIEW employee_details AS
SELECT e.emp_id, e.name, e.salary, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.dept_id;
-- Updatable View (with CHECK OPTION)
CREATE VIEW active_employees AS
SELECT * FROM employees WHERE is_active = TRUE
WITH CHECK OPTION;
-- Materialized View (PostgreSQL)
CREATE MATERIALIZED VIEW monthly_sales AS
SELECT DATE_TRUNC('month', order_date) AS month,
       SUM(total_amount) AS total_sales
FROM orders
GROUP BY DATE_TRUNC('month', order_date);
```
### ALTER
#### Alter Table
```sql
-- Add Column
ALTER TABLE employees ADD phone VARCHAR(15);
ALTER TABLE employees ADD COLUMN address TEXT;
-- Add Multiple Columns
ALTER TABLE employees 
ADD middle_name VARCHAR(50),
ADD birth_date DATE;
-- Modify Column (MySQL)
ALTER TABLE employees MODIFY salary DECIMAL(12, 2);
-- Alter Column (PostgreSQL)
ALTER TABLE employees ALTER COLUMN salary TYPE DECIMAL(12, 2);
-- Rename Column
ALTER TABLE employees RENAME COLUMN phone TO phone_number;
-- Drop Column
ALTER TABLE employees DROP COLUMN phone_number;
-- Add Constraint
ALTER TABLE employees ADD CONSTRAINT chk_salary CHECK (salary >= 0);
-- Add Primary Key
ALTER TABLE employees ADD PRIMARY KEY (emp_id);
-- Add Foreign Key
ALTER TABLE employees 
ADD CONSTRAINT fk_department 
FOREIGN KEY (department_id) REFERENCES departments(dept_id);
-- Add Unique Constraint
ALTER TABLE employees ADD CONSTRAINT uq_email UNIQUE (email);
-- Drop Constraint
ALTER TABLE employees DROP CONSTRAINT chk_salary;
-- Set Default Value
ALTER TABLE employees ALTER COLUMN is_active SET DEFAULT TRUE;
-- Drop Default Value
ALTER TABLE employees ALTER COLUMN is_active DROP DEFAULT;
-- Rename Table
ALTER TABLE employees RENAME TO staff;
```
### DROP
```sql
-- Drop Table
DROP TABLE employees;
-- Drop Table if Exists
DROP TABLE IF EXISTS employees;
-- Drop Table with Cascade (removes dependent objects)
DROP TABLE employees CASCADE;
-- Drop Database
DROP DATABASE company;
-- Drop Index
DROP INDEX idx_name ON employees;  -- MySQL
DROP INDEX idx_name;               -- PostgreSQL
-- Drop View
DROP VIEW high_salary_employees;
-- Drop Multiple Tables
DROP TABLE table1, table2, table3;
```
### TRUNCATE
```sql
-- Remove all rows (faster than DELETE, resets auto-increment)
TRUNCATE TABLE employees;
-- Truncate with Cascade (PostgreSQL)
TRUNCATE TABLE orders CASCADE;
-- Truncate Multiple Tables
TRUNCATE TABLE table1, table2;
```
### RENAME
```sql
-- Rename Table
RENAME TABLE old_name TO new_name;
-- Rename Multiple Tables
RENAME TABLE 
    employees TO staff,
    departments TO divisions;
```
---
## DML - Data Manipulation Language
DML commands manipulate data within tables.
### INSERT
```sql
-- Insert Single Row
INSERT INTO employees (emp_id, name, email, salary)
VALUES (1, 'Alice Johnson', 'alice@email.com', 50000);
-- Insert with All Columns (order must match table definition)
INSERT INTO employees 
VALUES (2, 'Bob Smith', 'bob@email.com', 1, 60000, '2023-01-15', TRUE, NOW());
-- Insert Multiple Rows
INSERT INTO employees (emp_id, name, email, salary)
VALUES
    (3, 'Charlie Brown', 'charlie@email.com', 55000),
    (4, 'Diana Ross', 'diana@email.com', 62000),
    (5, 'Edward Lee', 'edward@email.com', 48000);
-- Insert from SELECT
INSERT INTO employee_archive (emp_id, name, email, archived_date)
SELECT emp_id, name, email, CURRENT_DATE
FROM employees
WHERE is_active = FALSE;
-- Insert with Default Values
INSERT INTO employees (emp_id, name, email)
VALUES (6, 'Frank White', 'frank@email.com');
-- salary will be 0.00 (default), is_active will be TRUE (default)
-- Insert Ignore (MySQL - skip duplicates)
INSERT IGNORE INTO employees (emp_id, name, email)
VALUES (1, 'Duplicate', 'dup@email.com');
-- Insert On Duplicate Key Update (MySQL - Upsert)
INSERT INTO employees (emp_id, name, salary)
VALUES (1, 'Alice Updated', 55000)
ON DUPLICATE KEY UPDATE 
    name = VALUES(name),
    salary = VALUES(salary);
-- Insert On Conflict (PostgreSQL - Upsert)
INSERT INTO employees (emp_id, name, salary)
VALUES (1, 'Alice Updated', 55000)
ON CONFLICT (emp_id) 
DO UPDATE SET 
    name = EXCLUDED.name,
    salary = EXCLUDED.salary;
-- Insert Returning (PostgreSQL)
INSERT INTO employees (name, email, salary)
VALUES ('Grace Hopper', 'grace@email.com', 75000)
RETURNING emp_id, name;
```
### UPDATE
```sql
-- Update Single Column
UPDATE employees SET salary = 55000 WHERE emp_id = 1;
-- Update Multiple Columns
UPDATE employees
SET salary = 65000,
    department_id = 2,
    is_active = TRUE
WHERE emp_id = 1;
-- Update All Rows (careful!)
UPDATE employees SET salary = salary * 1.05;
-- Update with Expression
UPDATE employees
SET salary = salary * 1.10
WHERE department_id = 1;
-- Update with Subquery
UPDATE employees
SET salary = (SELECT AVG(salary) FROM employees WHERE department_id = 1)
WHERE emp_id = 5;
-- Update with JOIN (MySQL)
UPDATE employees e
JOIN departments d ON e.department_id = d.dept_id
SET e.salary = e.salary * 1.15
WHERE d.department_name = 'Engineering';
-- Update with FROM (PostgreSQL)
UPDATE employees e
SET salary = e.salary * 1.15
FROM departments d
WHERE e.department_id = d.dept_id
  AND d.department_name = 'Engineering';
-- Update with CASE
UPDATE employees
SET salary = CASE
    WHEN department_id = 1 THEN salary * 1.10
    WHEN department_id = 2 THEN salary * 1.15
    ELSE salary * 1.05
END;
-- Update Returning (PostgreSQL)
UPDATE employees
SET salary = salary * 1.10
WHERE department_id = 1
RETURNING emp_id, name, salary;
-- Update with Limit (MySQL)
UPDATE employees
SET is_active = FALSE
WHERE hire_date < '2020-01-01'
LIMIT 100;
```
### DELETE
```sql
-- Delete Specific Rows
DELETE FROM employees WHERE emp_id = 1;
-- Delete with Multiple Conditions
DELETE FROM employees
WHERE is_active = FALSE
  AND hire_date < '2020-01-01';
-- Delete All Rows (use TRUNCATE for better performance)
DELETE FROM employees;
-- Delete with Subquery
DELETE FROM employees
WHERE department_id IN (
    SELECT dept_id FROM departments WHERE is_deprecated = TRUE
);
-- Delete with JOIN (MySQL)
DELETE e
FROM employees e
JOIN departments d ON e.department_id = d.dept_id
WHERE d.department_name = 'Obsolete';
-- Delete Using (PostgreSQL)
DELETE FROM employees e
USING departments d
WHERE e.department_id = d.dept_id
  AND d.department_name = 'Obsolete';
-- Delete Returning (PostgreSQL)
DELETE FROM employees
WHERE is_active = FALSE
RETURNING emp_id, name, email;
-- Delete with Limit (MySQL)
DELETE FROM logs
WHERE created_at < '2023-01-01'
LIMIT 1000;
```
### MERGE (UPSERT)
```sql
-- SQL Server / Oracle MERGE
MERGE INTO employees AS target
USING new_employees AS source
ON target.emp_id = source.emp_id
WHEN MATCHED THEN
    UPDATE SET 
        target.name = source.name,
        target.salary = source.salary
WHEN NOT MATCHED THEN
    INSERT (emp_id, name, salary)
    VALUES (source.emp_id, source.name, source.salary);
```
---
## DQL - Data Query Language
The SELECT statement retrieves data from tables.
### Basic SELECT
```sql
-- Select All Columns
SELECT * FROM employees;
-- Select Specific Columns
SELECT name, salary, department_id FROM employees;
-- Select with Column Alias
SELECT 
    name AS employee_name,
    salary AS monthly_salary,
    salary * 12 AS annual_salary
FROM employees;
-- Select with Table Alias
SELECT e.name, e.salary, e.department_id
FROM employees AS e;
-- Select Distinct Values
SELECT DISTINCT department_id FROM employees;
-- Select Distinct on Multiple Columns
SELECT DISTINCT department_id, is_active FROM employees;
-- Select with Literal Values
SELECT name, 'Employee' AS type, 2024 AS year FROM employees;
-- Select into Variable (for stored procedures)
SELECT salary INTO @emp_salary FROM employees WHERE emp_id = 1;
```
### WHERE Clause
```sql
-- Comparison Operators
SELECT * FROM employees WHERE salary > 50000;
SELECT * FROM employees WHERE salary >= 50000;
SELECT * FROM employees WHERE salary < 50000;
SELECT * FROM employees WHERE salary <= 50000;
SELECT * FROM employees WHERE salary = 50000;
SELECT * FROM employees WHERE salary <> 50000;  -- Not equal
SELECT * FROM employees WHERE salary != 50000;  -- Not equal (alternate)
-- Logical Operators
SELECT * FROM employees WHERE salary > 50000 AND department_id = 1;
SELECT * FROM employees WHERE salary > 70000 OR department_id = 2;
SELECT * FROM employees WHERE NOT is_active;
SELECT * FROM employees WHERE NOT (salary < 50000 OR department_id = 3);
-- BETWEEN (inclusive)
SELECT * FROM employees WHERE salary BETWEEN 40000 AND 60000;
SELECT * FROM employees WHERE hire_date BETWEEN '2023-01-01' AND '2023-12-31';
-- NOT BETWEEN
SELECT * FROM employees WHERE salary NOT BETWEEN 40000 AND 60000;
-- IN
SELECT * FROM employees WHERE department_id IN (1, 2, 3);
SELECT * FROM employees WHERE name IN ('Alice', 'Bob', 'Charlie');
-- NOT IN
SELECT * FROM employees WHERE department_id NOT IN (4, 5);
-- LIKE (Pattern Matching)
SELECT * FROM employees WHERE name LIKE 'A%';       -- Starts with A
SELECT * FROM employees WHERE name LIKE '%son';     -- Ends with son
SELECT * FROM employees WHERE name LIKE '%an%';     -- Contains an
SELECT * FROM employees WHERE name LIKE '_o%';      -- Second letter is o
SELECT * FROM employees WHERE name LIKE '___';      -- Exactly 3 characters
SELECT * FROM employees WHERE email LIKE '%@gmail.com';
-- NOT LIKE
SELECT * FROM employees WHERE name NOT LIKE 'A%';
-- ESCAPE Character (for literal % or _)
SELECT * FROM products WHERE name LIKE '%10\%%' ESCAPE '\';
-- IS NULL
SELECT * FROM employees WHERE department_id IS NULL;
-- IS NOT NULL
SELECT * FROM employees WHERE department_id IS NOT NULL;
-- IS DISTINCT FROM (PostgreSQL - NULL-safe comparison)
SELECT * FROM employees WHERE department_id IS DISTINCT FROM 1;
-- Boolean Conditions
SELECT * FROM employees WHERE is_active;
SELECT * FROM employees WHERE is_active = TRUE;
SELECT * FROM employees WHERE NOT is_active;
SELECT * FROM employees WHERE is_active = FALSE;
```
### ORDER BY
```sql
-- Ascending Order (default)
SELECT * FROM employees ORDER BY salary;
SELECT * FROM employees ORDER BY salary ASC;
-- Descending Order
SELECT * FROM employees ORDER BY salary DESC;
-- Multiple Columns
SELECT * FROM employees ORDER BY department_id ASC, salary DESC;
-- Order by Column Position
SELECT name, salary, department_id FROM employees ORDER BY 3, 2 DESC;
-- Order by Expression
SELECT * FROM employees ORDER BY salary * 12 DESC;
-- Order by Alias
SELECT name, salary * 12 AS annual_salary
FROM employees
ORDER BY annual_salary DESC;
-- Order with NULLS FIRST/LAST (PostgreSQL, Oracle)
SELECT * FROM employees ORDER BY department_id NULLS FIRST;
SELECT * FROM employees ORDER BY department_id DESC NULLS LAST;
-- Order by CASE
SELECT * FROM employees
ORDER BY CASE 
    WHEN department_id = 1 THEN 1
    WHEN department_id = 2 THEN 2
    ELSE 3
END;
-- Random Order
SELECT * FROM employees ORDER BY RAND();      -- MySQL
SELECT * FROM employees ORDER BY RANDOM();    -- PostgreSQL
```
### LIMIT & OFFSET
```sql
-- Limit Results
SELECT * FROM employees LIMIT 10;
-- Limit with Offset (skip first 20, get next 10)
SELECT * FROM employees LIMIT 10 OFFSET 20;
-- MySQL Alternative Syntax
SELECT * FROM employees LIMIT 20, 10;  -- OFFSET, LIMIT
-- SQL Server TOP
SELECT TOP 10 * FROM employees;
SELECT TOP 10 PERCENT * FROM employees;
SELECT TOP 10 WITH TIES * FROM employees ORDER BY salary DESC;
-- Oracle ROWNUM / FETCH
SELECT * FROM employees WHERE ROWNUM <= 10;
SELECT * FROM employees FETCH FIRST 10 ROWS ONLY;
SELECT * FROM employees OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY;
```
### GROUP BY
```sql
-- Basic Grouping
SELECT department_id, COUNT(*) AS employee_count
FROM employees
GROUP BY department_id;
-- Group by Multiple Columns
SELECT department_id, is_active, COUNT(*) AS count
FROM employees
GROUP BY department_id, is_active;
-- Group by with Aggregate Functions
SELECT 
    department_id,
    COUNT(*) AS total_employees,
    SUM(salary) AS total_salary,
    AVG(salary) AS avg_salary,
    MIN(salary) AS min_salary,
    MAX(salary) AS max_salary
FROM employees
GROUP BY department_id;
-- Group by with Expression
SELECT 
    YEAR(hire_date) AS hire_year,
    COUNT(*) AS employees_hired
FROM employees
GROUP BY YEAR(hire_date);
-- Group by Column Position
SELECT department_id, COUNT(*)
FROM employees
GROUP BY 1;
-- GROUPING SETS (PostgreSQL, SQL Server)
SELECT department_id, is_active, COUNT(*)
FROM employees
GROUP BY GROUPING SETS (
    (department_id),
    (is_active),
    ()
);
-- ROLLUP (hierarchical grouping)
SELECT department_id, is_active, COUNT(*), SUM(salary)
FROM employees
GROUP BY ROLLUP(department_id, is_active);
-- CUBE (all combinations)
SELECT department_id, is_active, COUNT(*), SUM(salary)
FROM employees
GROUP BY CUBE(department_id, is_active);
```
### HAVING
```sql
-- Filter Groups (after aggregation)
SELECT department_id, AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 50000;
-- HAVING with COUNT
SELECT department_id, COUNT(*) AS emp_count
FROM employees
GROUP BY department_id
HAVING COUNT(*) >= 5;
-- HAVING with Multiple Conditions
SELECT department_id, AVG(salary) AS avg_salary, COUNT(*) AS emp_count
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 50000 AND COUNT(*) >= 3;
-- WHERE vs HAVING
-- WHERE: filters rows BEFORE grouping
-- HAVING: filters groups AFTER aggregation
SELECT department_id, AVG(salary) AS avg_salary
FROM employees
WHERE is_active = TRUE           -- Filters individual rows first
GROUP BY department_id
HAVING AVG(salary) > 50000;      -- Filters grouped results
```
---
## Aggregate Functions
```sql
-- COUNT
SELECT COUNT(*) FROM employees;                          -- Count all rows
SELECT COUNT(department_id) FROM employees;              -- Count non-NULL values
SELECT COUNT(DISTINCT department_id) FROM employees;     -- Count unique values
-- SUM
SELECT SUM(salary) FROM employees;
SELECT SUM(salary) FROM employees WHERE department_id = 1;
-- AVG
SELECT AVG(salary) FROM employees;
SELECT AVG(DISTINCT salary) FROM employees;
-- MIN / MAX
SELECT MIN(salary), MAX(salary) FROM employees;
SELECT MIN(hire_date), MAX(hire_date) FROM employees;
SELECT MIN(name), MAX(name) FROM employees;  -- Alphabetically
-- STRING_AGG / GROUP_CONCAT
-- PostgreSQL
SELECT department_id, STRING_AGG(name, ', ') AS employees
FROM employees
GROUP BY department_id;
-- MySQL
SELECT department_id, GROUP_CONCAT(name SEPARATOR ', ') AS employees
FROM employees
GROUP BY department_id;
-- Array Aggregation (PostgreSQL)
SELECT department_id, ARRAY_AGG(name) AS employee_names
FROM employees
GROUP BY department_id;
-- JSON Aggregation (PostgreSQL)
SELECT department_id, JSON_AGG(name) AS employee_names
FROM employees
GROUP BY department_id;
-- Statistical Functions
SELECT 
    STDDEV(salary) AS std_deviation,
    VARIANCE(salary) AS variance
FROM employees;
-- Conditional Aggregation
SELECT 
    COUNT(CASE WHEN is_active THEN 1 END) AS active_count,
    COUNT(CASE WHEN NOT is_active THEN 1 END) AS inactive_count,
    SUM(CASE WHEN department_id = 1 THEN salary ELSE 0 END) AS dept1_total
FROM employees;
-- FILTER Clause (PostgreSQL)
SELECT 
    COUNT(*) FILTER (WHERE is_active) AS active_count,
    AVG(salary) FILTER (WHERE department_id = 1) AS dept1_avg
FROM employees;
```
---
## JOINS
### Types of Joins
```
┌─────────────────────────────────────────────────────────────────┐
│                         JOIN TYPES                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  INNER JOIN       ∩       Returns only matching rows            │
│                                                                  │
│  LEFT JOIN        ⊂       All left + matching right (NULLs)     │
│                                                                  │
│  RIGHT JOIN       ⊃       All right + matching left (NULLs)     │
│                                                                  │
│  FULL OUTER JOIN  ∪       All rows from both (NULLs for no match)│
│                                                                  │
│  CROSS JOIN       ×       Cartesian product (all combinations)  │
│                                                                  │
│  SELF JOIN        ↺       Table joined with itself              │
│                                                                  │
│  NATURAL JOIN     ⋈       Auto-join on same column names        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```
### INNER JOIN
```sql
-- Basic Inner Join
SELECT e.name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.dept_id;
-- Inner Join with Multiple Conditions
SELECT e.name, d.department_name
FROM employees e
INNER JOIN departments d 
    ON e.department_id = d.dept_id 
    AND e.is_active = TRUE;
-- Multiple Inner Joins
SELECT e.name, d.department_name, l.city
FROM employees e
INNER JOIN departments d ON e.department_id = d.dept_id
INNER JOIN locations l ON d.location_id = l.location_id;
-- Inner Join with WHERE
SELECT e.name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.dept_id
WHERE e.salary > 50000;
```
### LEFT JOIN (LEFT OUTER JOIN)
```sql
-- Left Join (all employees, even without department)
SELECT e.name, d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.dept_id;
-- Find Unmatched Rows (employees without department)
SELECT e.name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.dept_id
WHERE d.dept_id IS NULL;
-- Left Join with Multiple Tables
SELECT e.name, d.department_name, m.name AS manager_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.dept_id
LEFT JOIN employees m ON e.manager_id = m.emp_id;
```
### RIGHT JOIN (RIGHT OUTER JOIN)
```sql
-- Right Join (all departments, even without employees)
SELECT e.name, d.department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.dept_id;
-- Find Departments with No Employees
SELECT d.department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.dept_id
WHERE e.emp_id IS NULL;
```
### FULL OUTER JOIN
```sql
-- Full Outer Join (all rows from both tables)
SELECT e.name, d.department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.dept_id;
-- MySQL doesn't support FULL OUTER JOIN, use UNION:
SELECT e.name, d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.dept_id
UNION
SELECT e.name, d.department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.dept_id;
```
### CROSS JOIN
```sql
-- Cross Join (Cartesian Product)
SELECT e.name, d.department_name
FROM employees e
CROSS JOIN departments d;
-- Implicit Cross Join
SELECT e.name, d.department_name
FROM employees e, departments d;
-- Practical Use: Generate All Combinations
SELECT dates.date, products.product_name
FROM (
    SELECT DISTINCT order_date AS date FROM orders
) dates
CROSS JOIN products;
```
### SELF JOIN
```sql
-- Find Employees and Their Managers
SELECT 
    e.name AS employee,
    m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.emp_id;
-- Find Employees in Same Department
SELECT 
    e1.name AS employee1,
    e2.name AS employee2,
    e1.department_id
FROM employees e1
JOIN employees e2 
    ON e1.department_id = e2.department_id
    AND e1.emp_id < e2.emp_id;
-- Hierarchical Query (with CTE)
WITH RECURSIVE org_chart AS (
    SELECT emp_id, name, manager_id, 1 AS level
    FROM employees
    WHERE manager_id IS NULL
    UNION ALL
    SELECT e.emp_id, e.name, e.manager_id, oc.level + 1
    FROM employees e
    JOIN org_chart oc ON e.manager_id = oc.emp_id
)
SELECT * FROM org_chart ORDER BY level, name;
```
### NATURAL JOIN
```sql
-- Natural Join (auto-matches same-named columns)
SELECT e.name, department_name
FROM employees e
NATURAL JOIN departments;
-- Warning: Can be unpredictable if table structures change
-- Equivalent to:
SELECT e.name, d.department_name
FROM employees e
JOIN departments d USING (department_id);
```
### USING Clause
```sql
-- JOIN with USING (when column names match)
SELECT e.name, d.department_name
FROM employees e
JOIN departments d USING (department_id);
-- Multiple USING columns
SELECT *
FROM order_items oi
JOIN orders o USING (order_id, customer_id);
```
### Non-Equi Joins
```sql
-- Range Join
SELECT e.name, s.grade
FROM employees e
JOIN salary_grades s 
    ON e.salary BETWEEN s.min_salary AND s.max_salary;
-- Less Than Join
SELECT e1.name, e2.name
FROM employees e1
JOIN employees e2 ON e1.salary < e2.salary;
```
---
## Subqueries
### Subquery in WHERE
```sql
-- Scalar Subquery (returns single value)
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
-- Subquery with IN
SELECT name
FROM employees
WHERE department_id IN (
    SELECT dept_id FROM departments WHERE location = 'New York'
);
-- Subquery with NOT IN
SELECT name
FROM employees
WHERE department_id NOT IN (
    SELECT dept_id FROM departments WHERE is_deprecated = TRUE
);
-- Subquery with ANY/SOME
SELECT name, salary
FROM employees
WHERE salary > ANY (SELECT salary FROM employees WHERE department_id = 1);
-- Subquery with ALL
SELECT name, salary
FROM employees
WHERE salary > ALL (SELECT salary FROM employees WHERE department_id = 1);
-- Subquery with EXISTS
SELECT name
FROM employees e
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.employee_id = e.emp_id
);
-- Subquery with NOT EXISTS
SELECT d.department_name
FROM departments d
WHERE NOT EXISTS (
    SELECT 1 FROM employees e WHERE e.department_id = d.dept_id
);
```
### Subquery in SELECT
```sql
-- Scalar Subquery in SELECT
SELECT 
    name,
    salary,
    (SELECT AVG(salary) FROM employees) AS company_avg,
    salary - (SELECT AVG(salary) FROM employees) AS diff_from_avg
FROM employees;
-- Correlated Subquery
SELECT 
    e.name,
    e.salary,
    (SELECT AVG(e2.salary) 
     FROM employees e2 
     WHERE e2.department_id = e.department_id) AS dept_avg
FROM employees e;
```
### Subquery in FROM (Derived Table)
```sql
-- Derived Table
SELECT dept_avg.department_id, dept_avg.avg_salary
FROM (
    SELECT department_id, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department_id
) AS dept_avg
WHERE dept_avg.avg_salary > 50000;
-- Multiple Derived Tables
SELECT d.department_id, d.avg_salary, c.emp_count
FROM (
    SELECT department_id, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department_id
) AS d
JOIN (
    SELECT department_id, COUNT(*) AS emp_count
    FROM employees
    GROUP BY department_id
) AS c ON d.department_id = c.department_id;
```
### Correlated Subqueries
```sql
-- Employees earning more than department average
SELECT e1.name, e1.salary, e1.department_id
FROM employees e1
WHERE e1.salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.department_id = e1.department_id
);
-- Top N per group using correlated subquery
SELECT e1.name, e1.salary, e1.department_id
FROM employees e1
WHERE (
    SELECT COUNT(*)
    FROM employees e2
    WHERE e2.department_id = e1.department_id
      AND e2.salary > e1.salary
) < 3;
```
### Subquery in INSERT/UPDATE/DELETE
```sql
-- INSERT with Subquery
INSERT INTO high_earners (emp_id, name, salary)
SELECT emp_id, name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) * 2 FROM employees);
-- UPDATE with Subquery
UPDATE employees
SET salary = (
    SELECT AVG(salary) FROM employees
)
WHERE department_id = 1;
-- DELETE with Subquery
DELETE FROM employees
WHERE department_id IN (
    SELECT dept_id FROM departments WHERE is_deprecated = TRUE
);
```
### Lateral Subqueries
```sql
-- LATERAL (PostgreSQL, MySQL 8.0+)
-- Allows subquery to reference columns from preceding tables
SELECT d.department_name, latest.name, latest.salary
FROM departments d
CROSS JOIN LATERAL (
    SELECT e.name, e.salary
    FROM employees e
    WHERE e.department_id = d.dept_id
    ORDER BY e.salary DESC
    LIMIT 1
) AS latest;
```
---
## Set Operations
```sql
-- UNION (removes duplicates)
SELECT name, email FROM employees
UNION
SELECT name, email FROM contractors;
-- UNION ALL (keeps duplicates, faster)
SELECT name FROM employees
UNION ALL
SELECT name FROM contractors;
-- INTERSECT (common rows)
SELECT name FROM employees
INTERSECT
SELECT name FROM managers;
-- INTERSECT ALL (PostgreSQL)
SELECT name FROM employees
INTERSECT ALL
SELECT name FROM managers;
-- EXCEPT / MINUS (rows in first but not second)
SELECT name FROM employees
EXCEPT
SELECT name FROM managers;
-- EXCEPT ALL (PostgreSQL)
SELECT name FROM employees
EXCEPT ALL
SELECT name FROM managers;
-- Complex Set Operations
(SELECT name, 'Employee' AS type FROM employees)
UNION
(SELECT name, 'Contractor' AS type FROM contractors)
ORDER BY name;
-- Set Operations with Multiple Columns
SELECT name, email, department_id FROM employees WHERE is_active = TRUE
UNION
SELECT name, email, department_id FROM archived_employees
ORDER BY name;
```
---
## Window Functions
Window functions perform calculations across a set of rows related to the current row.
### Basic Syntax
```sql
function_name() OVER (
    [PARTITION BY column(s)]
    [ORDER BY column(s)]
    [frame_clause]
)
```
### ROW_NUMBER
```sql
-- Assign unique row numbers
SELECT 
    name, 
    salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num
FROM employees;
-- Row number within partition
SELECT 
    name,
    department_id,
    salary,
    ROW_NUMBER() OVER (
        PARTITION BY department_id 
        ORDER BY salary DESC
    ) AS dept_row_num
FROM employees;
```
### RANK and DENSE_RANK
```sql
-- RANK (gaps in ranking for ties)
SELECT 
    name, 
    salary,
    RANK() OVER (ORDER BY salary DESC) AS rank
FROM employees;
-- DENSE_RANK (no gaps for ties)
SELECT 
    name, 
    salary,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees;
-- Comparison
-- Salary: 100, 100, 90, 80
-- RANK:      1,   1,  3,  4
-- DENSE_RANK: 1,   1,  2,  3
```
### NTILE
```sql
-- Divide into quartiles
SELECT 
    name, 
    salary,
    NTILE(4) OVER (ORDER BY salary DESC) AS quartile
FROM employees;
-- Divide into deciles
SELECT 
    name, 
    salary,
    NTILE(10) OVER (ORDER BY salary) AS decile
FROM employees;
```
### Running Totals and Aggregates
```sql
-- Running Total
SELECT 
    order_date,
    amount,
    SUM(amount) OVER (ORDER BY order_date) AS running_total
FROM orders;
-- Running Total per Partition
SELECT 
    department_id,
    hire_date,
    salary,
    SUM(salary) OVER (
        PARTITION BY department_id 
        ORDER BY hire_date
    ) AS dept_running_total
FROM employees;
-- Running Average
SELECT 
    order_date,
    amount,
    AVG(amount) OVER (ORDER BY order_date) AS running_avg
FROM orders;
-- Running Count
SELECT 
    order_date,
    COUNT(*) OVER (ORDER BY order_date) AS running_count
FROM orders;
```
### LAG and LEAD
```sql
-- LAG (previous row value)
SELECT 
    name,
    salary,
    LAG(salary, 1) OVER (ORDER BY emp_id) AS prev_salary,
    salary - LAG(salary, 1) OVER (ORDER BY emp_id) AS salary_diff
FROM employees;
-- LAG with default value
SELECT 
    name,
    salary,
    LAG(salary, 1, 0) OVER (ORDER BY emp_id) AS prev_salary
FROM employees;
-- LEAD (next row value)
SELECT 
    name,
    salary,
    LEAD(salary, 1) OVER (ORDER BY emp_id) AS next_salary
FROM employees;
-- LEAD with offset and default
SELECT 
    name,
    salary,
    LEAD(salary, 2, 0) OVER (ORDER BY emp_id) AS salary_2_ahead
FROM employees;
```
### FIRST_VALUE and LAST_VALUE
```sql
-- FIRST_VALUE (first value in window)
SELECT 
    name,
    salary,
    department_id,
    FIRST_VALUE(name) OVER (
        PARTITION BY department_id 
        ORDER BY salary DESC
    ) AS highest_earner
FROM employees;
-- LAST_VALUE (needs frame specification)
SELECT 
    name,
    salary,
    department_id,
    LAST_VALUE(name) OVER (
        PARTITION BY department_id 
        ORDER BY salary DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS lowest_earner
FROM employees;
-- NTH_VALUE
SELECT 
    name,
    salary,
    NTH_VALUE(name, 2) OVER (
        PARTITION BY department_id 
        ORDER BY salary DESC
    ) AS second_highest_earner
FROM employees;
```
### Window Frame Clauses
```sql
-- ROWS Frame
SELECT 
    order_date,
    amount,
    AVG(amount) OVER (
        ORDER BY order_date
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) AS moving_avg_3days
FROM orders;
-- RANGE Frame
SELECT 
    order_date,
    amount,
    SUM(amount) OVER (
        ORDER BY order_date
        RANGE BETWEEN INTERVAL '7' DAY PRECEDING AND CURRENT ROW
    ) AS weekly_total
FROM orders;
-- Frame Specifications:
-- ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (default)
-- ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING
-- ROWS BETWEEN 3 PRECEDING AND 3 FOLLOWING
-- ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
```
### PERCENT_RANK and CUME_DIST
```sql
-- PERCENT_RANK (relative rank as percentage)
SELECT 
    name,
    salary,
    PERCENT_RANK() OVER (ORDER BY salary) AS percent_rank
FROM employees;
-- CUME_DIST (cumulative distribution)
SELECT 
    name,
    salary,
    CUME_DIST() OVER (ORDER BY salary) AS cume_dist
FROM employees;
```
### Named Windows
```sql
-- Define reusable window
SELECT 
    name,
    salary,
    SUM(salary) OVER w AS running_total,
    AVG(salary) OVER w AS running_avg,
    COUNT(*) OVER w AS running_count
FROM employees
WINDOW w AS (ORDER BY hire_date);
-- Multiple named windows
SELECT 
    name,
    department_id,
    salary,
    SUM(salary) OVER dept_window AS dept_total,
    AVG(salary) OVER company_window AS company_avg
FROM employees
WINDOW 
    dept_window AS (PARTITION BY department_id),
    company_window AS ();
```
---
## Common Table Expressions (CTE)
### Basic CTE
```sql
-- Simple CTE
WITH high_earners AS (
    SELECT emp_id, name, salary
    FROM employees
    WHERE salary > 70000
)
SELECT * FROM high_earners ORDER BY salary DESC;
-- CTE with Multiple Columns
WITH dept_stats AS (
    SELECT 
        department_id,
        AVG(salary) AS avg_salary,
        COUNT(*) AS emp_count
    FROM employees
    GROUP BY department_id
)
SELECT e.name, e.salary, ds.avg_salary
FROM employees e
JOIN dept_stats ds ON e.department_id = ds.department_id
WHERE e.salary > ds.avg_salary;
```
### Multiple CTEs
```sql
WITH 
dept_avg AS (
    SELECT department_id, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department_id
),
high_earning_depts AS (
    SELECT department_id
    FROM dept_avg
    WHERE avg_salary > 60000
),
top_employees AS (
    SELECT emp_id, name, salary, department_id
    FROM employees
    WHERE salary > 80000
)
SELECT te.*
FROM top_employees te
JOIN high_earning_depts hed ON te.department_id = hed.department_id;
```
### Recursive CTE
```sql
-- Employee Hierarchy
WITH RECURSIVE employee_hierarchy AS (
    -- Base case: top-level managers (no manager)
    SELECT 
        emp_id, 
        name, 
        manager_id, 
        1 AS level,
        CAST(name AS VARCHAR(1000)) AS path
    FROM employees
    WHERE manager_id IS NULL
    UNION ALL
    -- Recursive case: employees with managers
    SELECT 
        e.emp_id, 
        e.name, 
        e.manager_id, 
        h.level + 1,
        CONCAT(h.path, ' > ', e.name)
    FROM employees e
    JOIN employee_hierarchy h ON e.manager_id = h.emp_id
)
SELECT * FROM employee_hierarchy ORDER BY level, name;
-- Generate Number Series
WITH RECURSIVE numbers AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM numbers WHERE n < 100
)
SELECT * FROM numbers;
-- Date Series
WITH RECURSIVE date_series AS (
    SELECT DATE '2024-01-01' AS date
    UNION ALL
    SELECT date + INTERVAL '1 day'
    FROM date_series
    WHERE date < '2024-12-31'
)
SELECT * FROM date_series;
-- Bill of Materials (parts explosion)
WITH RECURSIVE bom AS (
    SELECT 
        part_id, 
        parent_id, 
        part_name, 
        1 AS level
    FROM parts
    WHERE parent_id IS NULL
    UNION ALL
    SELECT 
        p.part_id, 
        p.parent_id, 
        p.part_name, 
        b.level + 1
    FROM parts p
    JOIN bom b ON p.parent_id = b.part_id
)
SELECT * FROM bom;
```
### CTE with INSERT/UPDATE/DELETE
```sql
-- CTE with INSERT
WITH new_employees AS (
    SELECT 'John Doe' AS name, 50000 AS salary
    UNION ALL
    SELECT 'Jane Smith', 55000
)
INSERT INTO employees (name, salary)
SELECT name, salary FROM new_employees;
-- CTE with DELETE (PostgreSQL)
WITH inactive AS (
    SELECT emp_id FROM employees WHERE is_active = FALSE
)
DELETE FROM employees WHERE emp_id IN (SELECT emp_id FROM inactive);
-- CTE with UPDATE (PostgreSQL)
WITH avg_salaries AS (
    SELECT department_id, AVG(salary) AS avg_sal
    FROM employees
    GROUP BY department_id
)
UPDATE employees e
SET salary = a.avg_sal
FROM avg_salaries a
WHERE e.department_id = a.department_id
  AND e.salary < a.avg_sal * 0.8;
```
---
## DCL - Data Control Language
DCL commands control access to data.
### GRANT
```sql
-- Grant SELECT privilege
GRANT SELECT ON employees TO user1;
-- Grant Multiple Privileges
GRANT SELECT, INSERT, UPDATE ON employees TO user1;
-- Grant All Privileges on Table
GRANT ALL PRIVILEGES ON employees TO admin_user;
-- Grant on All Tables in Schema
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly_user;
-- Grant with Grant Option (user can grant to others)
GRANT SELECT ON employees TO user1 WITH GRANT OPTION;
-- Grant to Role
GRANT SELECT ON employees TO hr_role;
-- Grant Role to User
GRANT hr_role TO user1;
-- Grant Execute on Function
GRANT EXECUTE ON FUNCTION calculate_bonus TO user1;
-- Grant Usage on Schema
GRANT USAGE ON SCHEMA hr TO user1;
-- Grant on Database (PostgreSQL)
GRANT CONNECT ON DATABASE company TO user1;
GRANT CREATE ON DATABASE company TO admin_user;
```
### REVOKE
```sql
-- Revoke SELECT privilege
REVOKE SELECT ON employees FROM user1;
-- Revoke Multiple Privileges
REVOKE INSERT, UPDATE ON employees FROM user1;
-- Revoke All Privileges
REVOKE ALL PRIVILEGES ON employees FROM user1;
-- Revoke Grant Option Only
REVOKE GRANT OPTION FOR SELECT ON employees FROM user1;
-- Revoke Role from User
REVOKE hr_role FROM user1;
-- Cascade Revoke (also revoke from users who received via grant option)
REVOKE SELECT ON employees FROM user1 CASCADE;
```
### Role Management
```sql
-- Create Role
CREATE ROLE hr_manager;
-- Create Role with Login (PostgreSQL)
CREATE ROLE app_user WITH LOGIN PASSWORD 'secure_password';
-- Alter Role
ALTER ROLE hr_manager WITH CREATEDB;
-- Drop Role
DROP ROLE hr_manager;
-- Set Role
SET ROLE hr_manager;
-- Reset Role
RESET ROLE;
```
---
## TCL - Transaction Control Language
TCL commands manage transactions.
### COMMIT and ROLLBACK
```sql
-- Start Transaction
START TRANSACTION;
-- or
BEGIN;
-- or
BEGIN TRANSACTION;
-- Perform Operations
INSERT INTO employees (name, salary) VALUES ('New Employee', 50000);
UPDATE employees SET salary = salary * 1.1 WHERE department_id = 1;
-- Commit Transaction (make changes permanent)
COMMIT;
-- Or Rollback Transaction (undo all changes)
ROLLBACK;
```
### SAVEPOINT
```sql
-- Create Savepoints
BEGIN;
INSERT INTO employees (name, salary) VALUES ('Alice', 50000);
SAVEPOINT sp1;
INSERT INTO employees (name, salary) VALUES ('Bob', 55000);
SAVEPOINT sp2;
UPDATE employees SET salary = 60000 WHERE name = 'Bob';
-- Rollback to Savepoint (undo changes after sp1)
ROLLBACK TO sp1;
-- Or rollback to sp2
ROLLBACK TO SAVEPOINT sp2;
-- Release Savepoint
RELEASE SAVEPOINT sp1;
COMMIT;
```
### Transaction Isolation Levels
```sql
-- Set Isolation Level
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- Set for Session (PostgreSQL)
SET SESSION CHARACTERISTICS AS TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- Start Transaction with Isolation Level
START TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;
```
### Transaction Options
```sql
-- Read-Only Transaction
START TRANSACTION READ ONLY;
-- Read-Write Transaction (default)
START TRANSACTION READ WRITE;
-- Deferrable Transaction (PostgreSQL)
START TRANSACTION ISOLATION LEVEL SERIALIZABLE READ ONLY DEFERRABLE;
```
---
## Constraints
### Types of Constraints
```sql
-- NOT NULL
CREATE TABLE employees (
    emp_id INT NOT NULL,
    name VARCHAR(100) NOT NULL
);
-- UNIQUE
CREATE TABLE employees (
    email VARCHAR(100) UNIQUE
);
-- PRIMARY KEY
CREATE TABLE employees (
    emp_id INT PRIMARY KEY
);
-- Composite Primary Key
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    PRIMARY KEY (order_id, product_id)
);
-- FOREIGN KEY
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
-- Foreign Key with Actions
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
        ON DELETE CASCADE
        ON UPDATE SET NULL
);
-- Actions: CASCADE, SET NULL, SET DEFAULT, RESTRICT, NO ACTION
-- CHECK
CREATE TABLE employees (
    salary DECIMAL(10,2) CHECK (salary >= 0),
    age INT CHECK (age >= 18 AND age <= 100)
);
-- Named Constraints
CREATE TABLE employees (
    emp_id INT CONSTRAINT pk_employee PRIMARY KEY,
    email VARCHAR(100) CONSTRAINT uq_email UNIQUE,
    salary DECIMAL(10,2) CONSTRAINT chk_salary CHECK (salary >= 0)
);
-- DEFAULT
CREATE TABLE employees (
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Adding Constraints to Existing Table
ALTER TABLE employees ADD CONSTRAINT pk_emp PRIMARY KEY (emp_id);
ALTER TABLE employees ADD CONSTRAINT fk_dept 
    FOREIGN KEY (department_id) REFERENCES departments(dept_id);
ALTER TABLE employees ADD CONSTRAINT chk_salary CHECK (salary >= 0);
ALTER TABLE employees ADD CONSTRAINT uq_email UNIQUE (email);
-- Dropping Constraints
ALTER TABLE employees DROP CONSTRAINT chk_salary;
ALTER TABLE employees DROP PRIMARY KEY;  -- MySQL
ALTER TABLE employees DROP CONSTRAINT pk_emp;  -- PostgreSQL
```
### EXCLUDE Constraint (PostgreSQL)
```sql
-- Prevent overlapping ranges
CREATE TABLE reservations (
    room_id INT,
    during TSRANGE,
    EXCLUDE USING GIST (room_id WITH =, during WITH &&)
);
```
---
## Views
```sql
-- Create View
CREATE VIEW active_employees AS
SELECT emp_id, name, email, salary
FROM employees
WHERE is_active = TRUE;
-- Create or Replace View
CREATE OR REPLACE VIEW active_employees AS
SELECT emp_id, name, email, salary, department_id
FROM employees
WHERE is_active = TRUE;
-- View with Join
CREATE VIEW employee_details AS
SELECT 
    e.emp_id,
    e.name,
    e.salary,
    d.department_name,
    m.name AS manager_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.dept_id
LEFT JOIN employees m ON e.manager_id = m.emp_id;
-- View with Aggregation
CREATE VIEW department_stats AS
SELECT 
    d.department_name,
    COUNT(e.emp_id) AS employee_count,
    AVG(e.salary) AS avg_salary
FROM departments d
LEFT JOIN employees e ON d.dept_id = e.department_id
GROUP BY d.dept_id, d.department_name;
-- Updatable View
CREATE VIEW high_salary_employees AS
SELECT emp_id, name, salary
FROM employees
WHERE salary > 70000
WITH CHECK OPTION;
-- WITH CHECK OPTION ensures INSERTs/UPDATEs meet the view's WHERE condition
-- Drop View
DROP VIEW active_employees;
DROP VIEW IF EXISTS active_employees;
-- Materialized View (PostgreSQL)
CREATE MATERIALIZED VIEW monthly_sales AS
SELECT 
    DATE_TRUNC('month', order_date) AS month,
    SUM(total_amount) AS total_sales
FROM orders
GROUP BY DATE_TRUNC('month', order_date);
-- Refresh Materialized View
REFRESH MATERIALIZED VIEW monthly_sales;
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales;  -- No lock
```
---
## Stored Procedures & Functions
### Stored Procedures
```sql
-- MySQL Stored Procedure
DELIMITER //
CREATE PROCEDURE get_employees_by_dept(IN dept_id INT)
BEGIN
    SELECT * FROM employees WHERE department_id = dept_id;
END //
DELIMITER ;
-- Call Procedure
CALL get_employees_by_dept(1);
-- Procedure with OUT parameter
DELIMITER //
CREATE PROCEDURE get_employee_count(IN dept_id INT, OUT emp_count INT)
BEGIN
    SELECT COUNT(*) INTO emp_count 
    FROM employees 
    WHERE department_id = dept_id;
END //
DELIMITER ;
-- PostgreSQL Procedure
CREATE OR REPLACE PROCEDURE transfer_funds(
    sender_id INT,
    receiver_id INT,
    amount DECIMAL(10,2)
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE accounts SET balance = balance - amount WHERE id = sender_id;
    UPDATE accounts SET balance = balance + amount WHERE id = receiver_id;
    COMMIT;
END;
$$;
-- Call PostgreSQL Procedure
CALL transfer_funds(1, 2, 100.00);
```
### Functions
```sql
-- MySQL Function
DELIMITER //
CREATE FUNCTION get_annual_salary(monthly_salary DECIMAL(10,2))
RETURNS DECIMAL(12,2)
DETERMINISTIC
BEGIN
    RETURN monthly_salary * 12;
END //
DELIMITER ;
-- Use Function
SELECT name, salary, get_annual_salary(salary) AS annual_salary
FROM employees;
-- PostgreSQL Function
CREATE OR REPLACE FUNCTION get_employee_bonus(emp_id INT)
RETURNS DECIMAL(10,2)
LANGUAGE plpgsql
AS $$
DECLARE
    emp_salary DECIMAL(10,2);
    bonus DECIMAL(10,2);
BEGIN
    SELECT salary INTO emp_salary FROM employees WHERE emp_id = emp_id;
    bonus := emp_salary * 0.10;
    RETURN bonus;
END;
$$;
-- Table-Returning Function (PostgreSQL)
CREATE OR REPLACE FUNCTION get_dept_employees(dept_id INT)
RETURNS TABLE(emp_id INT, name VARCHAR, salary DECIMAL)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT e.emp_id, e.name, e.salary
    FROM employees e
    WHERE e.department_id = dept_id;
END;
$$;
-- Use Table Function
SELECT * FROM get_dept_employees(1);
-- Drop Function
DROP FUNCTION get_annual_salary;
DROP FUNCTION IF EXISTS get_annual_salary;
```
---
## Triggers
```sql
-- MySQL Trigger (before insert)
DELIMITER //
CREATE TRIGGER before_employee_insert
BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    SET NEW.created_at = NOW();
    SET NEW.email = LOWER(NEW.email);
END //
DELIMITER ;
-- MySQL Trigger (after update)
DELIMITER //
CREATE TRIGGER after_salary_update
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
    IF OLD.salary <> NEW.salary THEN
        INSERT INTO salary_history (emp_id, old_salary, new_salary, changed_at)
        VALUES (OLD.emp_id, OLD.salary, NEW.salary, NOW());
    END IF;
END //
DELIMITER ;
-- PostgreSQL Trigger Function
CREATE OR REPLACE FUNCTION log_employee_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit_log (table_name, operation, new_data, changed_at)
        VALUES ('employees', 'INSERT', row_to_json(NEW), NOW());
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log (table_name, operation, old_data, new_data, changed_at)
        VALUES ('employees', 'UPDATE', row_to_json(OLD), row_to_json(NEW), NOW());
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_log (table_name, operation, old_data, changed_at)
        VALUES ('employees', 'DELETE', row_to_json(OLD), NOW());
    END IF;
    RETURN NEW;
END;
$$;
-- Create PostgreSQL Trigger
CREATE TRIGGER employee_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON employees
FOR EACH ROW
EXECUTE FUNCTION log_employee_changes();
-- Drop Trigger
DROP TRIGGER before_employee_insert ON employees;
DROP TRIGGER IF EXISTS before_employee_insert ON employees;
-- Disable/Enable Trigger (PostgreSQL)
ALTER TABLE employees DISABLE TRIGGER employee_audit_trigger;
ALTER TABLE employees ENABLE TRIGGER employee_audit_trigger;
ALTER TABLE employees DISABLE TRIGGER ALL;
```
---
## Query Optimization Tips
### Use EXPLAIN
```sql
-- Analyze Query Plan
EXPLAIN SELECT * FROM employees WHERE department_id = 1;
-- Detailed Analysis (MySQL)
EXPLAIN ANALYZE SELECT * FROM employees WHERE department_id = 1;
-- PostgreSQL EXPLAIN Options
EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM employees WHERE department_id = 1;
```
### Indexing Best Practices
```sql
-- Index columns used in WHERE, JOIN, ORDER BY
CREATE INDEX idx_dept ON employees(department_id);
CREATE INDEX idx_salary ON employees(salary);
-- Composite index for multi-column queries
CREATE INDEX idx_dept_salary ON employees(department_id, salary);
-- Covering index (includes all needed columns)
CREATE INDEX idx_covering ON employees(department_id) INCLUDE (name, salary);
```
### Query Optimization Techniques
```sql
-- 1. Avoid SELECT *
-- Bad
SELECT * FROM employees;
-- Good
SELECT emp_id, name, salary FROM employees;
-- 2. Use WHERE instead of HAVING when possible
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
-- 3. Use EXISTS instead of IN for subqueries
-- Less efficient
SELECT * FROM employees
WHERE department_id IN (SELECT dept_id FROM departments WHERE location = 'NYC');
-- More efficient
SELECT * FROM employees e
WHERE EXISTS (
    SELECT 1 FROM departments d 
    WHERE d.dept_id = e.department_id AND d.location = 'NYC'
);
-- 4. Avoid functions on indexed columns
-- Index not used
SELECT * FROM employees WHERE YEAR(hire_date) = 2023;
-- Index used
SELECT * FROM employees 
WHERE hire_date >= '2023-01-01' AND hire_date < '2024-01-01';
-- 5. Use UNION ALL instead of UNION when duplicates are okay
-- Slower (removes duplicates)
SELECT name FROM employees UNION SELECT name FROM contractors;
-- Faster (keeps duplicates)
SELECT name FROM employees UNION ALL SELECT name FROM contractors;
-- 6. Limit early
SELECT * FROM employees ORDER BY salary DESC LIMIT 10;
-- 7. Use proper JOIN order (smaller table first in some databases)
-- 8. Batch operations
-- Instead of many single inserts
INSERT INTO logs VALUES (...), (...), (...), ...;
```
---
## Common SQL Patterns
### Pagination
```sql
-- Offset-based (can be slow for large offsets)
SELECT * FROM employees ORDER BY emp_id LIMIT 10 OFFSET 20;
-- Keyset pagination (faster for large datasets)
SELECT * FROM employees
WHERE emp_id > 100  -- last seen ID
ORDER BY emp_id
LIMIT 10;
```
### Top N Per Group
```sql
-- Using Window Function
SELECT *
FROM (
    SELECT 
        *,
        ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rn
    FROM employees
) ranked
WHERE rn <= 3;
-- Using LATERAL (PostgreSQL)
SELECT d.dept_id, e.*
FROM departments d
CROSS JOIN LATERAL (
    SELECT * FROM employees
    WHERE department_id = d.dept_id
    ORDER BY salary DESC
    LIMIT 3
) e;
```
### Find Duplicates
```sql
-- Find duplicate values
SELECT email, COUNT(*) AS count
FROM employees
GROUP BY email
HAVING COUNT(*) > 1;
-- Show all duplicate rows
SELECT *
FROM employees
WHERE email IN (
    SELECT email FROM employees GROUP BY email HAVING COUNT(*) > 1
);
```
### Delete Duplicates
```sql
-- Keep one, delete others (MySQL)
DELETE e1 FROM employees e1
INNER JOIN employees e2
WHERE e1.emp_id > e2.emp_id AND e1.email = e2.email;
-- Using CTE (PostgreSQL)
WITH duplicates AS (
    SELECT emp_id,
           ROW_NUMBER() OVER (PARTITION BY email ORDER BY emp_id) AS rn
    FROM employees
)
DELETE FROM employees
WHERE emp_id IN (SELECT emp_id FROM duplicates WHERE rn > 1);
```
### Gap Analysis
```sql
-- Find gaps in sequence
SELECT 
    prev_id + 1 AS gap_start,
    emp_id - 1 AS gap_end
FROM (
    SELECT emp_id, LAG(emp_id) OVER (ORDER BY emp_id) AS prev_id
    FROM employees
) gaps
WHERE emp_id - prev_id > 1;
```
### Running Total with Reset
```sql
-- Running total that resets by group
SELECT 
    department_id,
    order_date,
    amount,
    SUM(amount) OVER (
        PARTITION BY department_id 
        ORDER BY order_date
        ROWS UNBOUNDED PRECEDING
    ) AS running_total
FROM orders;
```
### Pivot Table
```sql
-- Manual Pivot
SELECT 
    department_id,
    SUM(CASE WHEN YEAR(hire_date) = 2022 THEN 1 ELSE 0 END) AS hired_2022,
    SUM(CASE WHEN YEAR(hire_date) = 2023 THEN 1 ELSE 0 END) AS hired_2023,
    SUM(CASE WHEN YEAR(hire_date) = 2024 THEN 1 ELSE 0 END) AS hired_2024
FROM employees
GROUP BY department_id;
-- SQL Server PIVOT
SELECT *
FROM (
    SELECT department_id, YEAR(hire_date) AS hire_year, emp_id
    FROM employees
) src
PIVOT (
    COUNT(emp_id) FOR hire_year IN ([2022], [2023], [2024])
) pvt;
```
### Unpivot
```sql
-- Manual Unpivot
SELECT emp_id, 'phone1' AS phone_type, phone1 AS phone FROM contacts WHERE phone1 IS NOT NULL
UNION ALL
SELECT emp_id, 'phone2', phone2 FROM contacts WHERE phone2 IS NOT NULL
UNION ALL
SELECT emp_id, 'phone3', phone3 FROM contacts WHERE phone3 IS NOT NULL;
```
---
## Quick Reference
### SQL Query Order of Execution
```
1. FROM       - Tables and joins
2. WHERE      - Row filtering (before grouping)
3. GROUP BY   - Grouping rows
4. HAVING     - Group filtering (after grouping)
5. SELECT     - Column selection and expressions
6. DISTINCT   - Remove duplicates
7. ORDER BY   - Sorting
8. LIMIT      - Result limiting
```
### Common Data Types
| Type | Description | Example |
|------|-------------|---------|
| INT | Integer | 42 |
| BIGINT | Large integer | 9223372036854775807 |
| DECIMAL(p,s) | Exact numeric | 123.45 |
| FLOAT/DOUBLE | Approximate numeric | 3.14159 |
| VARCHAR(n) | Variable-length string | 'Hello' |
| CHAR(n) | Fixed-length string | 'A   ' |
| TEXT | Large text | Long content |
| DATE | Date | '2024-01-15' |
| TIME | Time | '14:30:00' |
| TIMESTAMP | Date and time | '2024-01-15 14:30:00' |
| BOOLEAN | True/False | TRUE |
| JSON | JSON data | '{"key": "value"}' |
| UUID | Unique identifier | 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' |
### Comparison Operators
| Operator | Description |
|----------|-------------|
| = | Equal |
| <> or != | Not equal |
| < | Less than |
| <= | Less than or equal |
| > | Greater than |
| >= | Greater than or equal |
| BETWEEN | Within range (inclusive) |
| IN | In a list |
| LIKE | Pattern matching |
| IS NULL | Is null value |
| IS NOT NULL | Is not null value |
### Aggregate Functions Summary
| Function | Description |
|----------|-------------|
| COUNT(*) | Count all rows |
| COUNT(col) | Count non-null values |
| SUM(col) | Sum of values |
| AVG(col) | Average of values |
| MIN(col) | Minimum value |
| MAX(col) | Maximum value |
| STRING_AGG() | Concatenate strings |
| ARRAY_AGG() | Aggregate into array |
### Window Functions Summary
| Function | Description |
|----------|-------------|
| ROW_NUMBER() | Unique row number |
| RANK() | Rank with gaps |
| DENSE_RANK() | Rank without gaps |
| NTILE(n) | Divide into n groups |
| LAG(col, n) | Value from n rows before |
| LEAD(col, n) | Value from n rows after |
| FIRST_VALUE(col) | First value in window |
| LAST_VALUE(col) | Last value in window |
| SUM() OVER | Running/partitioned sum |
| AVG() OVER | Running/partitioned average |
---
## Further Reading
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [SQL Server Documentation](https://docs.microsoft.com/en-us/sql/)
- [Use The Index, Luke](https://use-the-index-luke.com/)
- [SQL Style Guide](https://www.sqlstyle.guide/)
- [Modern SQL](https://modern-sql.com/)
