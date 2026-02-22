# 🌐 REST API Cheat Sheet
## 📌 What is REST?
**REST (Representational State Transfer)** is an architectural style for designing networked applications using **HTTP** methods.
- Uses client–server architecture
- Communication via stateless requests
- Data usually in JSON format
### What Does "Stateless" Mean?
Each request is independent and contains all information needed. The server doesn't store client context.
**Example:**
```
Request 1: GET /api/users/5 → Returns user 5
Request 2: GET /api/users/5 → Returns same user 5 (no session memory)
Repeat Request 1 → Still works the same way
```
The server never says "remember the last user from Request 1" - each request is complete and self-contained.
### Real-World Analogy
- **Non-REST (Stateful):** Like a waiter who remembers your preferences
- **REST (Stateless):** Like a different waiter each time who needs the full order
### Why is REST Popular?
✅ Simple to understand  
✅ Uses standard HTTP—no special protocols  
✅ Scalable—servers don't store session data  
✅ Cacheable—responses can be reused  
✅ Works across different platforms and languages
---
## 🔑 Core Principles (REST Constraints)
### 1. Client–Server
UI and backend are separate and can be developed independently.
**Example:**
```
Client (Web App)        →  API Server
Angular App            →  Node.js Backend
React App              →  Python Django
Mobile App             →  Java Spring Boot
```
Benefits: Frontend team can work independently from backend team.
### 2. Stateless
Each request must contain all info needed. Server doesn't store client context.
**Example - Stateful (Bad):**
```
Session 1: POST /login → Server: "Remember, you're user 5"
Session 2: GET /orders   → Server: "Get orders for user 5"
```
**Example - Stateless (Good):**
```
POST /login
{ "email": "user@email.com", "password": "..." }
→ Response: { "token": "abc123def456" }
GET /orders
Header: Authorization: Bearer abc123def456
→ Server knows who you are from token
```
### 3. Cacheable
Responses can be cached to reduce server load.
**Example:**
```
GET /products/5
Cache-Control: max-age=3600
Next request within 1 hour?
→ Browser returns cached version (no server hit!)
```
### 4. Uniform Interface
Standard structure for all APIs.
**Example - Consistent:**
```
POST /users         → Create
POST /products      → Create
POST /orders        → Create
(Same method, same concept)
GET /users/5        → Get single
GET /products/5     → Get single
GET /orders/5       → Get single
(Same pattern everywhere)
```
### 5. Layered System
Client doesn't know if connected to final server or middleware.
**Example:**
```
Client → Load Balancer → Web Server → Database
Client doesn't care about this architecture
```
### 6. Code on Demand (Optional)
Server can extend client functionality with downloadable code.
**Example:**
```
Response can include JavaScript to execute on client
Rarely used in modern REST APIs
```
---
## 📬 HTTP Methods
| Method | Purpose         | Idempotent | Safe |
| ------ | --------------- | ---------- | ---- |
| GET    | Retrieve data   | Yes        | Yes  |
| POST   | Create resource | No         | No   |
| PUT    | Update/Replace  | Yes        | No   |
| PATCH  | Partial update  | No         | No   |
| DELETE | Remove resource | Yes        | No   |
### Understanding the Terms
**Idempotent:** Making the same request multiple times gives same result
- ✅ **GET** → Always returns same data
- ✅ **PUT** → Replacing data multiple times = same result
- ✅ **DELETE** → Deleting same item twice = already gone
- ❌ **POST** → Creates new resource each time
**Safe:** Request doesn't change server data
- ✅ **GET** → Only reads, never modifies
- ❌ **POST/PUT/PATCH/DELETE** → Changes server state
### Real Examples
**GET (Safe, Idempotent)**
```bash
# Retrieve product
GET /api/products/42
# Call 100 times → Same response, no data changed ✅
# Retrieve user
GET /api/users/5
# Data never changes on server ✅
```
**POST (NOT Idempotent, NOT Safe)**
```bash
# Create new order
POST /api/orders
{ "product_id": 42, "quantity": 1 }
# Response: Order #1001 created
# Run same request again
POST /api/orders
{ "product_id": 42, "quantity": 1 }
# Response: Order #1002 created (NEW order!)
# Data changed on server ❌, different results ❌
```
**PUT (Idempotent, NOT Safe)**
```bash
# Update user (replace all fields)
PUT /api/users/5
{ "name": "John", "email": "john@email.com", "age": 30 }
# User 5 updated ✅
# Run exact same request
PUT /api/users/5
{ "name": "John", "email": "john@email.com", "age": 30 }
# User 5 has same data, no additional changes ✅
# Same result, data safe to replace multiple times
```
**PATCH (NOT Idempotent, NOT Safe)**
```bash
# Partial update user
PATCH /api/users/5
{ "age": 31 }
# User age changed from 30 → 31 ✅
# Run same request
PATCH /api/users/5
{ "age": 31 }
# Depends on implementation—might increment or stay same
# Can lead to different results ❌
```
**DELETE (Idempotent, NOT Safe)**
```bash
# Delete user
DELETE /api/users/5
# User 5 deleted ✅
# Run same request
DELETE /api/users/5
# User already gone, same end result ✅
# Idempotent (already deleted = still deleted)
# But data changed on server ✅
```
---
## 📦 HTTP Status Codes
### Success (2xx)
- **200 OK** – Request successful, response body included
  ```
  GET /users/5 → 200 OK (returns user data)
  PUT /users/5 → 200 OK (update successful)
  ```
- **201 Created** – Resource successfully created
  ```
  POST /users
  { "name": "John" }
  → 201 Created
  Response: { "id": 99, "name": "John" } (new user)
  ```
- **204 No Content** – Success, but nothing to return
  ```
  DELETE /users/5 → 204 No Content
  (User deleted, nothing to return)
  PATCH /users/5 → 204 No Content (sometimes)
  (Update done, no response body)
  ```
### Client Errors (4xx) - You Did Something Wrong
- **400 Bad Request** – Malformed request (syntax error)
  ```
  POST /users
  { "name": "John", "email": "INVALID-EMAIL" }
  → 400 Bad Request
  Response: { "error": "Invalid email format" }
  ```
- **401 Unauthorized** – Need authentication
  ```
  GET /api/premium-data
  (No token sent)
  → 401 Unauthorized
  Response: { "error": "Please login first" }
  ```
- **403 Forbidden** – Authenticated but no permission
  ```
  GET /api/admin-panel
  Header: Authorization: Bearer user_token
  (User is logged in, but not admin)
  → 403 Forbidden
  Response: { "error": "Admin access required" }
  ```
- **404 Not Found** – Resource doesn't exist
  ```
  GET /users/999 (no user with ID 999)
  → 404 Not Found
  Response: { "error": "User not found" }
  ```
- **409 Conflict** – Request conflicts with current state
  ```
  POST /users
  { "email": "duplicate@email.com" }
  (Email already exists)
  → 409 Conflict
  Response: { "error": "User with this email exists" }
  ```
### Server Errors (5xx) - Server Problem
- **500 Internal Server Error** – Unexpected server error
  ```
  GET /users/5
  → 500 Internal Server Error
  (Database crashed, code error, etc.)
  ```
- **503 Service Unavailable** – Server temporarily down
  ```
  GET /users
  → 503 Service Unavailable
  (Server maintenance, overloaded, etc.)
  ```
### Status Code Cheat Sheet
| Code | Meaning      | When to Use                          |
| ---- | ------------ | ------------------------------------ |
| 200  | Success      | GET/PUT/PATCH worked                 |
| 201  | Created      | POST successfully created            |
| 204  | No content   | Delete successful, nothing to return |
| 400  | Bad request  | Client sent invalid data             |
| 401  | Unauthorized | Need to login                        |
| 403  | Forbidden    | Don't have permission                |
| 404  | Not found    | Resource doesn't exist               |
| 409  | Conflict     | Data conflict (duplicate, etc.)      |
| 500  | Server error | Unexpected error                     |
| 503  | Unavailable  | Server down/overloaded               |
## 🔗 URL Design Rules
### Good Practices with Real Examples
**✅ Use nouns, not verbs**
```
GOOD:
GET    /users              # Get all users
POST   /users              # Create user
GET    /users/5            # Get user 5
DELETE /users/5            # Delete user 5
BAD:
GET    /getUsers           # Don't use verbs
GET    /createUser         # HTTP method already says create
DELETE /deleteUser/5       # Redundant verb
GET    /fetchAllProducts   # Verb (fetch) is unnecessary
```
**✅ Use plural resources**
```
GOOD:
/users              (plural)
/products           (plural)
/orders             (plural)
BAD:
/user               (singular)
/product            (singular - inconsistent)
```
**✅ Use hierarchy for relationships**
```
GOOD:
GET    /users/5/orders                    # All orders by user 5
GET    /users/5/orders/42                 # Specific order 42 by user 5
GET    /users/5/orders/42/items           # Items in order 42
BAD:
GET    /orders?user=5                     (flatter, less relationships)
GET    /getUserOrders/5                   (using verbs)
```
**✅ Use query params for filtering, not paths**
```
GOOD:
GET    /products?category=laptop          # Filter by category
GET    /products?price_gt=30000           # Greater than price
GET    /products?brand=Dell&color=black   # Multiple filters
GET    /products?sort=price:asc           # Sort by price
GET    /products?page=2&limit=10          # Pagination
BAD:
GET    /products/laptop                   (category in path)
GET    /products/30000                    (price in path - ambiguous)
```
### Real-World URL Examples
**E-Commerce:**
```
GET    /api/products                          # All products
GET    /api/products?category=electronics     # Products in category
GET    /api/products/42                       # Specific product
GET    /api/products/42/reviews               # Reviews of product 42
GET    /api/products/42/reviews/5             # Specific review
POST   /api/products/42/reviews               # Add review to product
```
**Social Media:**
```
GET    /api/users                             # All users
GET    /api/users/100                         # User 100
GET    /api/users/100/posts                   # Posts by user 100
GET    /api/users/100/posts/555               # Specific post
POST   /api/users/100/posts/555/like          # Like a post
DELETE /api/users/100/posts/555/like          # Unlike a post
```
**Blog:**
```
GET    /api/posts                             # All posts
GET    /api/posts?author=john&status=published
GET    /api/posts/10                          # Post 10
GET    /api/posts/10/comments                 # Comments on post 10
POST   /api/posts/10/comments                 # Add comment to post 10
```
**Bank API:**
```
GET    /api/accounts                          # All my accounts
GET    /api/accounts/123                      # Account 123
GET    /api/accounts/123/transactions         # Transactions list
POST   /api/accounts/123/transactions         # Create transaction
GET    /api/accounts/123/transfers            # Transfer history
POST   /api/accounts/123/transfers            # Make transfer
```
## 📄 Request Structure - Complete Breakdown
### HTTP Request Format
```
METHOD /endpoint HTTP/1.1
Host: api.example.com
Headers: value
Authorization: type token
Body (JSON)
```
### Complete GET Request Example
```bash
GET /api/users/5 HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGc...
Accept: application/json
User-Agent: PostmanRuntime/7.26.8
```
**No body** (GET never has body)
### Complete POST Request Example
```bash
POST /api/users HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGc...
Content-Type: application/json
Accept: application/json
Content-Length: 52
{
  "name": "Surya",
  "email": "surya@email.com",
  "role": "admin"
}
```
### Common Request Headers Explained
| Header            | Purpose                                 | Example            |
| ----------------- | --------------------------------------- | ------------------ |
| **Authorization** | Sends credentials                       | `Bearer token123`  |
| **Content-Type**  | Tells server what format you're sending | `application/json` |
| **Accept**        | Tells server what format you want back  | `application/json` |
| **User-Agent**    | Identifies your application             | `MyApp/1.0`        |
| **X-API-Key**     | API key authentication                  | `sk_live_abc123`   |
| **X-Request-ID**  | Unique request identifier               | `req-12345`        |
### Example: User Sign-Up Request
```bash
POST /api/auth/register HTTP/1.1
Host: api.example.com
Content-Type: application/json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "phone": "+91 9876543210",
  "country": "India"
}
```
**Server Response (201 Created):**
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "id": 127,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2026-02-17T10:30:00Z"
  }
}
```
---
## 🔐 Authentication Methods - Detailed
### 1. API Key Authentication
Simple but less secure—like a password key.
```bash
# In query parameter
GET /api/users?api_key=sk_live_abc123def456
# In header (BETTER)
GET /api/users
X-API-Key: sk_live_abc123def456
# Use case: Public APIs, internal services
```
### 2. Basic Auth
Username and password encoded in header.
```bash
GET /api/users HTTP/1.1
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
# dXNlcm5hbWU6cGFzc3dvcmQ= is Base64 encoded "username:password"
# Simple but requires HTTPS (password exposed)
```
### 3. Bearer Token (JWT - Most Common)
Stateless authentication using signed tokens.
```bash
POST /api/auth/login
{
  "email": "user@email.com",
  "password": "password123"
}
Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1fQ.xpg..."
}
# Use token in next requests
GET /api/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
**JWT Token Breakdown:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 . eyJ1c2VyX2lkIjo1fQ . xpg...
      ↓                                    ↓                  ↓
    Header                            Payload (data)      Signature
  (algorithm)                       (contains user ID)   (verification)
```
### 4. OAuth 2.0
Delegated authentication—allow third-party login (Google, GitHub, etc.).
```bash
# User clicks "Login with Google"
# → Browser redirects to Google login
# → Google confirms identity
# → Google redirects back with auth code
# → Your app exchanges code for token
# Result: Secure, doesn't store passwords
```
### Security Comparison
| Method             | Complexity | Security  | Use Case                        |
| ------------------ | ---------- | --------- | ------------------------------- |
| API Key            | Low        | Low       | Public APIs, testing            |
| Basic Auth         | Low        | Medium    | Internal tools (HTTPS required) |
| Bearer Token (JWT) | Medium     | High      | Modern web apps, mobile         |
| OAuth 2.0          | High       | Very High | Third-party logins              |
### Real Example: Login and Get User Data
```bash
# Step 1: Login
POST /api/auth/login
{
  "email": "john@email.com",
  "password": "secure123"
}
Response:
{
  "token": "eyJhbGc...",
  "user": { "id": 5, "name": "John" }
}
# Step 2: Use token to get protected data
GET /api/users/5
Authorization: Bearer eyJhbGc...
Response:
{
  "id": 5,
  "name": "John",
  "email": "john@email.com",
  "premium": true
}
```
## 📊 CRUD Mapping - Detailed Examples
| Operation  | HTTP Method | Endpoint              | Status | Example                                                      |
| ---------- | ----------- | --------------------- | ------ | ------------------------------------------------------------ |
| **C**reate | POST        | /users                | 201    | `POST /api/users` → Create new user                          |
| **R**ead   | GET         | /users or /users/{id} | 200    | `GET /api/users` → List all, `GET /api/users/5` → Get user 5 |
| **U**pdate | PUT/PATCH   | /users/{id}           | 200    | `PUT /api/users/5` → Replace, `PATCH /api/users/5` → Partial |
| **D**elete | DELETE      | /users/{id}           | 204    | `DELETE /api/users/5` → Delete user 5                        |
### PUT vs PATCH Difference - Detailed
**PUT - Replace Entire Resource**
```bash
# Current user data:
{
  "id": 5,
  "name": "Old Name",
  "email": "old@email.com",
  "age": 30,
  "phone": "123456"
}
# PUT Request - Must provide ALL fields:
PUT /api/users/5
{
  "name": "New Name",
  "email": "new@email.com",
  "age": 31,
  "phone": "789012"
}
# Result - Everything replaced:
{
  "id": 5,
  "name": "New Name",         ← Changed
  "email": "new@email.com",   ← Changed
  "age": 31,                  ← Changed
  "phone": "789012"           ← Changed
}
# What if you forget a field?
PUT /api/users/5
{
  "name": "New Name",
  "email": "new@email.com"
}
# Missing age and phone — they get deleted! ⚠️
```
**PATCH - Partial Update**
```bash
# Current user data:
{
  "id": 5,
  "name": "Old Name",
  "email": "old@email.com",
  "age": 30,
  "phone": "123456"
}
# PATCH Request - Only provide fields to change:
PATCH /api/users/5
{
  "name": "New Name",
  "email": "new@email.com"
}
# Result - Only specified fields changed:
{
  "id": 5,
  "name": "New Name",         ← Changed
  "email": "new@email.com",   ← Changed
  "age": 30,                  ← Unchanged ✅
  "phone": "123456"           ← Unchanged ✅
}
# Safe! Nothing gets accidentally deleted.
```
### Real CRUD Example: Blog
```bash
# CREATE - Add new blog post
POST /api/posts
{
  "title": "REST API Guide",
  "content": "REST is...",
  "author_id": 5,
  "tags": ["api", "web"]
}
Response: 201 Created
{
  "id": 42,
  "title": "REST API Guide",
  "created_at": "2026-02-17T10:00:00Z"
}
# READ - Get all posts
GET /api/posts
Response: 200 OK
[
  { "id": 42, "title": "REST API Guide", "author": "Surya" },
  { "id": 43, "title": "GraphQL vs REST", "author": "John" }
]
# READ - Get single post
GET /api/posts/42
Response: 200 OK
{
  "id": 42,
  "title": "REST API Guide",
  "content": "REST is...",
  "author_id": 5,
  "views": 1234,
  "created_at": "2026-02-17T10:00:00Z"
}
# UPDATE - Full update (all fields)
PUT /api/posts/42
{
  "title": "REST API Complete Guide",
  "content": "REST is... (updated)",
  "author_id": 5,
  "tags": ["api", "web", "tutorial"]
}
Response: 200 OK
{ "id": 42, "updated_at": "2026-02-17T15:00:00Z" }
# UPDATE - Partial update (some fields)
PATCH /api/posts/42
{
  "title": "REST API - Complete Guide",
  "views": 5000
}
Response: 200 OK
{ "id": 42, "updated_at": "2026-02-17T15:30:00Z" }
# DELETE - Remove post
DELETE /api/posts/42
Response: 204 No Content
(No body, post deleted)
```
---
## ⚡ Idempotency - Understanding with Examples
A request is **idempotent** if repeating it multiple times gives the same safe result.
### GET - Idempotent & Safe ✅
```bash
# Request user 5 three times:
GET /api/users/5  → { "id": 5, "name": "John", "email": "john@email.com" }
GET /api/users/5  → { "id": 5, "name": "John", "email": "john@email.com" }
GET /api/users/5  → { "id": 5, "name": "John", "email": "john@email.com" }
Result: Same data, no changes ✅ Idempotent & Safe
```
### POST - NOT Idempotent, NOT Safe ❌
```bash
# Request: Create user three times
POST /api/users { "name": "John", "email": "john@email.com" }
→ Creates User #1 (id: 101)
POST /api/users { "name": "John", "email": "john@email.com" }
→ Creates User #2 (id: 102)  ← Different result!
POST /api/users { "name": "John", "email": "john@email.com" }
→ Creates User #3 (id: 103)  ← Different result!
Result: Three different users created ❌ NOT Idempotent
```
### PUT - Idempotent, NOT Safe ✅❌
```bash
# Request: Replace user 5's data three times
PUT /api/users/5 { "name": "Jane", "email": "jane@email.com" }
→ User 5 updated
PUT /api/users/5 { "name": "Jane", "email": "jane@email.com" }
→ User 5 already has same data ✅
PUT /api/users/5 { "name": "Jane", "email": "jane@email.com" }
→ User 5 still has same data ✅
Result: Safe to repeat, same result ✅ Idempotent
(But data on server changed ❌ Not Safe)
```
### DELETE - Idempotent, NOT Safe ✅❌
```bash
# Request: Delete user 5 three times
DELETE /api/users/5
→ User 5 deleted ✅
DELETE /api/users/5
→ User already gone (same end state) ✅
DELETE /api/users/5
→ User still gone (same end state) ✅
Result: Safe to repeat, same end state ✅ Idempotent
(But data deleted ❌ Not Safe)
```
### PATCH - NOT Idempotent ❌
```bash
# Request: Increment age 3 times (depends on server implementation)
PATCH /api/users/5 { "age_increment": 1 }
→ Age: 30 → 31
PATCH /api/users/5 { "age_increment": 1 }
→ Age: 31 → 32  ← Different result!
PATCH /api/users/5 { "age_increment": 1 }
→ Age: 32 → 33  ← Different result!
Result: Different outcomes ❌ NOT Idempotent
```
### Why Does Idempotency Matter?
**Network Issues Example:**
```bash
# You send DELETE /api/users/5
# Server receives and deletes it
# But connection drops, you don't get response
# You retry: DELETE /api/users/5
With DELETE (idempotent):
→ Already deleted, nothing happens ✅ Safe to retry
With POST (not idempotent):
→ Creates duplicate order ❌ Can't safely retry
```
---
## 📁 Content Types - Detailed Guide
### What is Content-Type?
Tells the server what **format** you're sending. Tells client what **format** to expect.
### Common Request Headers
| Header         | Meaning                       | Example            |
| -------------- | ----------------------------- | ------------------ |
| `Content-Type` | Format of data you're SENDING | `application/json` |
| `Accept`       | Format you WANT back          | `application/json` |
### JSON - Most Common Format
```bash
POST /api/users
Content-Type: application/json
Accept: application/json
{
  "name": "John",
  "email": "john@email.com"
}
Response (200 OK):
Content-Type: application/json
{
  "id": 5,
  "name": "John",
  "email": "john@email.com"
}
```
**Why JSON?**
- Easy for humans to read
- Easy for computers to parse
- Compact format
- Language independent
### Form Data - HTML Forms
```bash
POST /api/users
Content-Type: application/x-www-form-urlencoded
name=John&email=john@email.com&age=30
# Like URL query params, but in body
```
```bash
POST /api/users
Content-Type: multipart/form-data
(binary format, used for file uploads)
```
**Real file upload example:**
```bash
POST /api/users/5/avatar
Content-Type: multipart/form-data
--boundary123
Content-Disposition: form-data; name="file"; filename="avatar.jpg"
Content-Type: image/jpeg
[binary image data here]
--boundary123--
```
### XML - Older Format (Less Common)
```bash
POST /api/users
Content-Type: application/xml
<?xml version="1.0"?>
<user>
  <name>John</name>
  <email>john@email.com</email>
</user>
Response:
<?xml version="1.0"?>
<user>
  <id>5</id>
  <name>John</name>
  <email>john@email.com</email>
</user>
```
### Choosing Content Type
```bash
# API to API (Most common)
Content-Type: application/json
# HTML form submission
Content-Type: application/x-www-form-urlencoded
# Uploading files
Content-Type: multipart/form-data
# Legacy enterprise systems
Content-Type: application/xml
# Just text
Content-Type: text/plain
# Web page
Content-Type: text/html
```
### Request vs Response Content-Type
```bash
REQUEST:
POST /api/users
Content-Type: application/json           ← What you're sending
Accept: application/json                 ← What you want back
{ "name": "John" }
RESPONSE:
HTTP/1.1 201 Created
Content-Type: application/json           ← What server is sending
{ "id": 5, "name": "John" }
```
### Charset Header
Specifies character encoding.
```bash
Content-Type: application/json; charset=utf-8
Content-Type: text/html; charset=utf-8
# Most APIs use UTF-8 (supports all languages ✅)
```
---
## 🔍 Pagination, Filtering, Sorting
### Pagination - Load Data in Chunks
**Why pagination?** Returning 1 million records at once = slow and huge response.
**Method 1: Page-based (Most Common)**
```bash
GET /api/products?page=2&limit=10
Response:
{
  "data": [
    { "id": 11, "name": "Product 11" },
    { "id": 12, "name": "Product 12" },
    ...
    { "id": 20, "name": "Product 20" }
  ],
  "pagination": {
    "page": 2,
    "limit": 10,
    "total": 250,
    "total_pages": 25
  }
}
# Page 1 = items 1-10
# Page 2 = items 11-20
# Page 3 = items 21-30
```
**Method 2: Offset-based**
```bash
GET /api/products?offset=10&limit=10
# offset=10 means skip first 10
# limit=10 means get next 10 items
# (Items 11-20)
```
**Method 3: Cursor-based (Best for huge datasets)**
```bash
GET /api/products?cursor=abc123&limit=10
# Cursor points to a specific position
# More efficient for large databases
```
### Practical Pagination Example
```bash
# Get first page
GET /api/users?page=1&limit=5
{
  "data": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" },
    { "id": 3, "name": "Charlie" },
    { "id": 4, "name": "Diana" },
    { "id": 5, "name": "Eve" }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 23,
    "has_next": true,
    "has_prev": false
  }
}
# Get next page
GET /api/users?page=2&limit=5
```
### Filtering - Search with Conditions
**Basic filtering:**
```bash
GET /api/products?category=laptop
GET /api/products?brand=Dell&color=silver
GET /api/orders?status=pending&user_id=5
```
**Advanced filtering:**
```bash
# Price range
GET /api/products?price_gt=30000&price_lt=60000
# gt = greater than
# lt = less than
# Date range
GET /api/orders?date_from=2026-01-01&date_to=2026-02-17
# Multiple values
GET /api/products?brand=Dell,HP,Lenovo  (OR condition)
# Search
GET /api/products?search=gaming+laptop
```
### Real Product Filter Examples
```bash
# Find gaming laptops under 100k rupees
GET /api/products?category=laptop&tag=gaming&price_lt=100000
# Find available hotel rooms for dates
GET /api/rooms?check_in=2026-03-01&check_out=2026-03-05&available=true
# Find pending orders (not shipped)
GET /api/orders?status=pending,processing&delivery_status=not_shipped
# Search articles by author
GET /api/articles?author=john&published=true
```
### Sorting - Order Results
**Ascending order (default):**
```bash
GET /api/products?sort=price:asc
# Cheapest first: $100, $200, $300...
GET /api/users?sort=created_at:asc
# Oldest first
```
**Descending order:**
```bash
GET /api/products?sort=price:desc
# Most expensive first: $300, $200, $100...
GET /api/users?sort=created_at:desc
# Newest first
GET /api/products?sort=-price
# - prefix = descending
```
**Multiple sort fields:**
```bash
GET /api/products?sort=category:asc,price:desc
# Sort by category A-Z, then by price high-low within each category
GET /api/orders?sort=-created_at,customer_name:asc
# Newest orders first, then by customer name A-Z
```
### Complete Example: Search Products
```bash
GET /api/products?
  category=electronics&
  brand=Samsung&
  price_gte=20000&
  price_lte=80000&
  in_stock=true&
  sort=rating:desc,price:asc&
  page=1&
  limit=20
Response:
{
  "data": [
    {
      "id": 42,
      "name": "Samsung Galaxy S21",
      "brand": "Samsung",
      "price": 45999,
      "rating": 4.8,
      "in_stock": true
    },
    ...
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "total_pages": 8
  }
}
```
### Filter Operators Reference
| Operator | Meaning          | Example                     |
| -------- | ---------------- | --------------------------- |
| `=`      | Equal            | `status=active`             |
| `gt`     | Greater than     | `price_gt=1000`             |
| `gte`    | Greater or equal | `price_gte=1000`            |
| `lt`     | Less than        | `price_lt=5000`             |
| `lte`    | Less or equal    | `price_lte=5000`            |
| `ne`     | Not equal        | `status_ne=deleted`         |
| `,`      | OR               | `status=pending,processing` |
| `~`      | Contains         | `name~john`                 |
---
## 📋 HTTP Methods - Detailed Examples
### GET - Retrieve Data
**Never sends body, safe, idempotent**
```bash
GET /api/users           # Get all users
GET /api/users/5         # Get user with ID 5
GET /api/users?role=admin  # Get filtered users
```
**Response:**
```json
{
  "status": "success",
  "data": {
    "id": 5,
    "name": "Surya",
    "email": "surya@email.com",
    "role": "admin"
  }
}
```
### POST - Create Resource
**Creates new resource, not idempotent**
```bash
POST /api/users
Content-Type: application/json
{
  "name": "Surya",
  "email": "surya@email.com",
  "password": "secure123"
}
```
**Response (201 Created):**
```json
{
  "status": "success",
  "data": {
    "id": 125,
    "name": "Surya",
    "email": "surya@email.com",
    "created_at": "2026-02-17T10:30:00Z"
  }
}
```
### PUT - Full Update
**Replaces entire resource, idempotent**
```bash
PUT /api/users/5
Content-Type: application/json
{
  "name": "Surya Updated",
  "email": "surya.new@email.com",
  "role": "user"
}
```
### PATCH - Partial Update
**Updates only specified fields, not idempotent**
```bash
PATCH /api/users/5
Content-Type: application/json
{
  "email": "surya.new@email.com"
}
```
### DELETE - Remove Resource
**Deletes resource, idempotent**
```bash
DELETE /api/users/5
```
**Response (204 No Content or 200 OK):**
```json
{
  "status": "success",
  "message": "User deleted successfully"
}
```
---
## 🛡️ Error Handling
### Error Response Structure
```json
{
  "status": "error",
  "code": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    },
    {
      "field": "password",
      "message": "Password must be at least 8 characters"
    }
  ]
}
```
### Common Error Scenarios
| Status | Scenario                         | Response                            |
| ------ | -------------------------------- | ----------------------------------- |
| 400    | Invalid request data             | Missing required fields, bad format |
| 401    | Not authenticated                | No token, expired token             |
| 403    | Authenticated but not authorized | User lacks permission               |
| 404    | Resource doesn't exist           | User ID not found                   |
| 409    | Conflict with existing data      | Duplicate email, version mismatch   |
| 422    | Unprocessable entity             | Validation failed                   |
| 429    | Too many requests                | Rate limit exceeded                 |
| 500    | Server error                     | Unexpected server issue             |
---
## 🔄 API Versioning
### URL Path Versioning (Most Common)
```bash
GET /api/v1/users
GET /api/v2/users
GET /api/v3/users
```
### Header Versioning
```bash
GET /api/users
Accept: application/vnd.company.v2+json
```
### Query Parameter Versioning
```bash
GET /api/users?version=2
```
**When to version:**
- Breaking changes to endpoint behavior
- Removing or renaming fields
- Changing response structure
- New required parameters
---
## ⏱️ Rate Limiting
Prevents abuse by limiting request frequency
```bash
GET /api/users HTTP/1.1
Response Headers:
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 850
X-RateLimit-Reset: 1613567890
```
**Common limits:**
- Public API: 1,000 requests/hour
- Authenticated API: 10,000 requests/hour
- Premium: Unlimited
---
## 💾 Caching Strategies
### Cache Control Headers
```bash
Cache-Control: max-age=3600           # Cache for 1 hour
Cache-Control: no-cache              # Revalidate before use
Cache-Control: no-store              # Don't cache
Cache-Control: public                # Shareable cache
Cache-Control: private               # Browser cache only
```
### Example Response
```bash
GET /api/products/5
Response:
Cache-Control: max-age=300, public
ETag: "abc123def456"
Last-Modified: Mon, 15 Feb 2026 10:00:00 GMT
```
**Best practices:**
- Cache GET requests extensively
- Don't cache POST/PUT/DELETE
- Use ETags for validation
- Set appropriate max-age values
---
## 📚 Real-World REST API Examples
### Blog API
```bash
# Get all posts
GET /api/v1/posts
# Get single post with comments
GET /api/v1/posts/42
# Create new post
POST /api/v1/posts
{
  "title": "REST API Guide",
  "content": "...",
  "author_id": 5
}
# Update post
PATCH /api/v1/posts/42
{
  "title": "Updated Title"
}
# Add comment to post
POST /api/v1/posts/42/comments
{
  "text": "Great article!",
  "author_id": 10
}
# Delete post
DELETE /api/v1/posts/42
```
### E-Commerce API
```bash
# Browse products
GET /api/v1/products?category=electronics&sort=price:asc&limit=20
# Get user orders
GET /api/v1/users/5/orders?status=completed
# Place order
POST /api/v1/orders
{
  "user_id": 5,
  "items": [
    {"product_id": 12, "quantity": 2},
    {"product_id": 45, "quantity": 1}
  ]
}
# Update order status
PATCH /api/v1/orders/789
{
  "status": "shipped",
  "tracking_number": "TRACK123"
}
```
---
## 🎯 Common Mistakes to Avoid
❌ **Bad Practices:**
```bash
GET /api/getUser/5          # Use noun, not verb
GET /api/get-users-list     # Use plural form
GET /api/users?userId=5     # Consistent naming
POST /api/deleteUser        # Use DELETE method
/api/user/posts/5           # Singular resource name
```
✅ **Good Practices:**
```bash
GET /api/users/5            # Clear, consistent
GET /api/users              # Plural nouns
GET /api/users/{id}/posts   # Nested relationships
DELETE /api/users/5         # Correct HTTP method
GET /api/users?limit=10&page=1  # Query parameters
```
---
## 🧪 Testing REST APIs
### Tools Available
1. **Postman** - Full-featured GUI tool
   - Collections for organizing requests
   - Environment variables
   - Automated testing
2. **cURL** (command-line)
   ```bash
   curl -X POST https://api.example.com/users \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer token" \
     -d '{"name": "Surya", "email": "surya@email.com"}'
   ```
3. **REST Client (VS Code Extension)**
   ```http
   GET https://api.example.com/users/5 HTTP/1.1
   Authorization: Bearer token123
   ```
4. **Thunder Client** - Lightweight VS Code extension
5. **Insomnia** - User-friendly GUI like Postman
### Basic cURL Examples
```bash
# GET request
curl https://api.example.com/users/5
# POST with JSON
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Surya"}'
# With headers
curl -H "Authorization: Bearer token" \
  https://api.example.com/users/5
# With query parameters
curl "https://api.example.com/users?page=2&limit=5"
```
---
## 🚀 Best Practices Summary
✅ **Do's:**
- Use HTTP methods correctly (GET, POST, PUT, DELETE)
- Use nouns in endpoints, not verbs
- Return appropriate status codes
- Include meta information in responses
- Version your API
- Document endpoints thoroughly
- Implement rate limiting
- Use HTTPS always
- Validate input data
- Implement proper error responses
❌ **Don'ts:**
- Don't mix GET and POST for same operation
- Don't ignore caching headers
- Don't leak sensitive info in URLs
- Don't ignore authentication/authorization
- Don't create deeply nested endpoints
- Don't return 200 for errors
- Don't make breaking changes without versioning
- Don't ignore pagination for large datasets
---
## 📖 Quick Reference
| Need               | Solution                        |
| ------------------ | ------------------------------- |
| Get data           | GET /resource                   |
| Create data        | POST /resource                  |
| Update all fields  | PUT /resource/{id}              |
| Update some fields | PATCH /resource/{id}            |
| Delete data        | DELETE /resource/{id}           |
| Filter results     | ?field=value&field2=value2      |
| Sort results       | ?sort=field:asc or ?sort=-field |
| Paginate           | ?page=1&limit=10                |
| Cache data         | Cache-Control header            |
| Identify user      | Authorization header / API Key  |
---
## 📚 Additional Resources
- **REST maturity model (Richardson):** Levels 0-3 of REST compliance
- **OpenAPI/Swagger:** Standard for API documentation
- **JSON:API:** Specification for building JSON APIs
- **GraphQL:** Alternative to REST for flexible queries
