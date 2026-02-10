# Database

A comprehensive guide to database technologies, covering both relational (SQL) and non-relational (NoSQL) databases.

---

## 📚 Topics

### SQL (Relational Databases)

| File | Description                                                         |
| :--- | :------------------------------------------------------------------ |
| DBMS | Database Management System concepts, normalization, ACID properties |
| SQL  | SQL queries, joins, indexes, transactions                           |

### NoSQL (Non-Relational Databases)

| File    | Description                                                 |
| :------ | :---------------------------------------------------------- |
| MongoDB | Document-based NoSQL database, CRUD operations, aggregation |
| Redis   | In-memory key-value store, caching, data structures         |

---

## 🎯 SQL vs NoSQL Quick Comparison

| Aspect         | SQL                           | NoSQL                                     |
| :------------- | :---------------------------- | :---------------------------------------- |
| Data Model     | Tables with rows & columns    | Document, Key-Value, Graph, Column-family |
| Schema         | Fixed schema                  | Dynamic/flexible schema                   |
| Scaling        | Vertical (scale-up)           | Horizontal (scale-out)                    |
| ACID           | Full ACID compliance          | BASE (eventual consistency)               |
| Query Language | Structured Query Language     | Database-specific APIs                    |
| Best For       | Complex queries, transactions | Large-scale, unstructured data            |

---

## 📖 Learning Path

1. Start with **DBMS** to understand database fundamentals
2. Learn **SQL** for querying relational databases
3. Explore **MongoDB** for document-based storage
4. Master **Redis** for caching and real-time applications

---

## 💡 Key Concepts

### ACID Properties (SQL)

- **Atomicity** - All or nothing transactions
- **Consistency** - Data integrity is maintained
- **Isolation** - Concurrent transactions don't interfere
- **Durability** - Committed data persists

### BASE Properties (NoSQL)

- **Basically Available** - System guarantees availability
- **Soft state** - State may change over time
- **Eventual consistency** - System becomes consistent eventually
