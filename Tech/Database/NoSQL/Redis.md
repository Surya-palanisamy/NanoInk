# Redis - In-Memory Data Store

A comprehensive guide to Redis covering data structures, commands, use cases, and best practices.

---

## Table of Contents

1. [Introduction to Redis](#introduction-to-redis)
2. [Installation & Setup](#installation--setup)
3. [Data Types](#data-types)
4. [Basic Commands](#basic-commands)
5. [Strings](#strings)
6. [Lists](#lists)
7. [Sets](#sets)
8. [Sorted Sets](#sorted-sets)
9. [Hashes](#hashes)
10. [Streams](#streams)
11. [Keys Management](#keys-management)
12. [Expiration & TTL](#expiration--ttl)
13. [Pub/Sub](#pubsub)
14. [Transactions](#transactions)
15. [Lua Scripting](#lua-scripting)
16. [Persistence](#persistence)
17. [Replication](#replication)
18. [Clustering](#clustering)
19. [Security](#security)
20. [Use Cases & Patterns](#use-cases--patterns)
21. [Best Practices](#best-practices)
22. [Quick Reference](#quick-reference)

---

## Introduction to Redis

### What is Redis?

Redis (Remote Dictionary Server) is an open-source, in-memory data structure store used as:
- **Database**: Primary data store
- **Cache**: Speed up applications
- **Message Broker**: Pub/Sub messaging
- **Queue**: Job/task queues

### Key Characteristics

- **In-Memory**: All data stored in RAM (extremely fast)
- **Persistent**: Optional disk persistence
- **Single-Threaded**: Atomic operations by design
- **Rich Data Structures**: Strings, Lists, Sets, Hashes, Sorted Sets, Streams
- **High Performance**: ~100,000+ operations per second

### When to Use Redis

✅ **Good for**:
- Caching frequently accessed data
- Session storage
- Real-time leaderboards
- Rate limiting
- Pub/Sub messaging
- Queues and job processing
- Real-time analytics

❌ **Not ideal for**:
- Primary database for large datasets
- Complex queries and joins
- Data larger than available RAM

---

## Installation & Setup

### Installation

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install redis-server

# macOS
brew install redis

# Docker
docker run -d --name redis -p 6379:6379 redis

# Start Redis Server
redis-server

# Start with config file
redis-server /etc/redis/redis.conf
```

### Connecting to Redis

```bash
# Redis CLI
redis-cli

# Connect to remote server
redis-cli -h hostname -p 6379 -a password

# Test connection
redis-cli ping
# Returns: PONG
```

### Basic Configuration

```bash
# redis.conf common settings

# Bind to specific interface
bind 127.0.0.1

# Port
port 6379

# Password
requirepass your_secure_password

# Max memory
maxmemory 256mb

# Eviction policy
maxmemory-policy allkeys-lru

# Persistence
appendonly yes
```

---

## Data Types

Redis supports multiple data structures:

```
┌─────────────────────────────────────────────────────────────────┐
│                      REDIS DATA TYPES                            │
├─────────────────────────────────────────────────────────────────┤
│  Strings     - Binary-safe strings, up to 512MB                  │
│  Lists       - Ordered collections (linked lists)                │
│  Sets        - Unordered unique elements                         │
│  Sorted Sets - Sets with scores for ordering                     │
│  Hashes      - Field-value pairs (like objects)                  │
│  Streams     - Append-only log data structure                    │
│  Bitmaps     - Bit-level operations on strings                   │
│  HyperLogLog - Probabilistic cardinality estimation              │
│  Geospatial  - Location-based data                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Basic Commands

### Connection & Server

```bash
# Test connection
PING                    # Returns PONG

# Authenticate
AUTH password

# Select database (0-15 by default)
SELECT 1

# Get server info
INFO
INFO memory
INFO replication

# Get config
CONFIG GET maxmemory
CONFIG SET maxmemory 512mb

# Clear current database
FLUSHDB

# Clear all databases
FLUSHALL

# Get database size
DBSIZE

# Last save time
LASTSAVE

# Background save
BGSAVE

# Shutdown server
SHUTDOWN
```

---

## Strings

Strings are the most basic Redis data type. They can hold any data: text, numbers, or binary data (up to 512MB).

### Basic String Operations

```bash
# Set a value
SET key "value"

# Get a value
GET key

# Set with expiration (seconds)
SET key "value" EX 3600

# Set with expiration (milliseconds)
SET key "value" PX 60000

# Set only if key doesn't exist
SET key "value" NX
SETNX key "value"

# Set only if key exists
SET key "value" XX

# Set and get old value
GETSET key "new_value"    # Deprecated in Redis 6.2+
SET key "new_value" GET   # Redis 6.2+

# Set multiple keys
MSET key1 "value1" key2 "value2" key3 "value3"

# Get multiple keys
MGET key1 key2 key3

# Set if not exists (multiple)
MSETNX key1 "v1" key2 "v2"  # Atomic: all or nothing

# Get string length
STRLEN key

# Append to string
APPEND key " appended"

# Get substring
GETRANGE key 0 4      # First 5 characters
GETRANGE key -5 -1    # Last 5 characters

# Set substring
SETRANGE key 0 "new"
```

### Numeric Operations

```bash
# Increment by 1
INCR counter

# Decrement by 1
DECR counter

# Increment by specific amount
INCRBY counter 10

# Decrement by specific amount
DECRBY counter 5

# Increment float
INCRBYFLOAT price 0.50

# Example: Page view counter
INCR page:home:views
GET page:home:views
```

### Bit Operations

```bash
# Set bit at position
SETBIT key 7 1

# Get bit at position
GETBIT key 7

# Count set bits
BITCOUNT key
BITCOUNT key 0 1    # In byte range 0-1

# Bit operations between keys
BITOP AND destkey key1 key2
BITOP OR destkey key1 key2
BITOP XOR destkey key1 key2
BITOP NOT destkey key

# Find first bit set to 0 or 1
BITPOS key 1        # First bit set to 1
BITPOS key 0        # First bit set to 0
```

---

## Lists

Lists are ordered collections of strings, implemented as linked lists. Great for queues and stacks.

### Adding Elements

```bash
# Push to left (head)
LPUSH mylist "first"
LPUSH mylist "second" "third"

# Push to right (tail)
RPUSH mylist "last"
RPUSH mylist "item1" "item2"

# Push only if list exists
LPUSHX mylist "value"
RPUSHX mylist "value"

# Insert before/after element
LINSERT mylist BEFORE "pivot" "new_element"
LINSERT mylist AFTER "pivot" "new_element"

# Set element at index
LSET mylist 0 "new_first"
```

### Retrieving Elements

```bash
# Get element by index (0-based)
LINDEX mylist 0      # First element
LINDEX mylist -1     # Last element

# Get range of elements
LRANGE mylist 0 -1   # All elements
LRANGE mylist 0 9    # First 10 elements
LRANGE mylist -3 -1  # Last 3 elements

# Get list length
LLEN mylist
```

### Removing Elements

```bash
# Pop from left
LPOP mylist
LPOP mylist 3        # Pop 3 elements (Redis 6.2+)

# Pop from right
RPOP mylist
RPOP mylist 3        # Pop 3 elements (Redis 6.2+)

# Remove elements by value
LREM mylist 0 "value"    # Remove all occurrences
LREM mylist 2 "value"    # Remove first 2 occurrences
LREM mylist -2 "value"   # Remove last 2 occurrences

# Trim list to range
LTRIM mylist 0 99        # Keep first 100 elements
```

### Blocking Operations

```bash
# Blocking pop (for queues)
BLPOP mylist 30          # Block for 30 seconds
BRPOP mylist 30

# Pop from one list, push to another
RPOPLPUSH source dest
LMOVE source dest LEFT RIGHT

# Blocking version
BRPOPLPUSH source dest 30
BLMOVE source dest LEFT RIGHT 30
```

### Use Case: Simple Queue

```bash
# Producer adds jobs to queue
LPUSH jobs '{"task": "send_email", "to": "user@example.com"}'

# Worker processes jobs
BRPOP jobs 0             # Block until job available

# Result
# 1) "jobs"
# 2) "{\"task\": \"send_email\", \"to\": \"user@example.com\"}"
```

---

## Sets

Sets are unordered collections of unique strings.

### Basic Set Operations

```bash
# Add members
SADD myset "member1"
SADD myset "member1" "member2" "member3"

# Remove members
SREM myset "member1"
SREM myset "member1" "member2"

# Check if member exists
SISMEMBER myset "member1"    # Returns 1 or 0

# Get all members
SMEMBERS myset

# Get member count
SCARD myset

# Get random members
SRANDMEMBER myset            # One random member
SRANDMEMBER myset 3          # 3 random members
SRANDMEMBER myset -3         # 3 random (may repeat)

# Pop random member
SPOP myset                   # Remove and return one
SPOP myset 3                 # Remove and return 3

# Move member between sets
SMOVE source dest "member"
```

### Set Operations

```bash
# Union (combine sets)
SUNION set1 set2 set3
SUNIONSTORE destset set1 set2    # Store result

# Intersection (common members)
SINTER set1 set2 set3
SINTERSTORE destset set1 set2    # Store result

# Difference (members in first but not others)
SDIFF set1 set2 set3
SDIFFSTORE destset set1 set2     # Store result
```

### Use Case: Tags System

```bash
# Add tags to articles
SADD article:1:tags "redis" "database" "nosql"
SADD article:2:tags "redis" "caching" "performance"
SADD article:3:tags "database" "sql" "postgres"

# Find articles with common tags
SINTER article:1:tags article:2:tags
# Returns: "redis"

# All unique tags
SUNION article:1:tags article:2:tags article:3:tags
```

### Use Case: Online Users

```bash
# Track online users
SADD online:users "user:1001"
SADD online:users "user:1002"

# Check if user is online
SISMEMBER online:users "user:1001"

# Remove when user logs out
SREM online:users "user:1001"

# Count online users
SCARD online:users
```

---

## Sorted Sets

Sorted sets are sets where each member has an associated score for ordering.

### Basic Operations

```bash
# Add members with scores
ZADD leaderboard 100 "player1"
ZADD leaderboard 85 "player2" 92 "player3"

# Add with options
ZADD leaderboard NX 100 "player1"   # Only if not exists
ZADD leaderboard XX 105 "player1"   # Only if exists
ZADD leaderboard GT 105 "player1"   # Only if new score > current
ZADD leaderboard LT 95 "player1"    # Only if new score < current

# Get score
ZSCORE leaderboard "player1"

# Increment score
ZINCRBY leaderboard 10 "player1"

# Get member count
ZCARD leaderboard

# Count members in score range
ZCOUNT leaderboard 80 100
```

### Range Queries

```bash
# Get members by rank (0-indexed, ascending)
ZRANGE leaderboard 0 -1              # All members
ZRANGE leaderboard 0 9               # Top 10 (lowest scores)
ZRANGE leaderboard 0 9 WITHSCORES    # With scores

# Get members by rank (descending)
ZREVRANGE leaderboard 0 9            # Top 10 (highest scores)
ZREVRANGE leaderboard 0 9 WITHSCORES

# Get members by score range
ZRANGEBYSCORE leaderboard 80 100
ZRANGEBYSCORE leaderboard -inf +inf  # All
ZRANGEBYSCORE leaderboard (80 100    # Exclusive lower bound
ZRANGEBYSCORE leaderboard 80 (100    # Exclusive upper bound

# Reverse score range
ZREVRANGEBYSCORE leaderboard 100 80

# Get rank (position)
ZRANK leaderboard "player1"          # 0-indexed from lowest
ZREVRANK leaderboard "player1"       # 0-indexed from highest
```

### Removing Members

```bash
# Remove by member
ZREM leaderboard "player1"

# Remove by rank range
ZREMRANGEBYRANK leaderboard 0 9      # Remove first 10

# Remove by score range
ZREMRANGEBYSCORE leaderboard 0 50    # Remove scores 0-50
```

### Set Operations

```bash
# Union of sorted sets
ZUNIONSTORE dest 2 set1 set2
ZUNIONSTORE dest 2 set1 set2 WEIGHTS 1 2    # With weights
ZUNIONSTORE dest 2 set1 set2 AGGREGATE MAX  # MAX/MIN/SUM

# Intersection
ZINTERSTORE dest 2 set1 set2
```

### Use Case: Real-time Leaderboard

```bash
# Add/update player scores
ZADD leaderboard 1500 "player:1001"
ZADD leaderboard 1450 "player:1002"
ZINCRBY leaderboard 50 "player:1001"   # Player won a game

# Get top 10 players
ZREVRANGE leaderboard 0 9 WITHSCORES

# Get player rank
ZREVRANK leaderboard "player:1001"

# Get players around a specific player (context)
# First get the player's rank, then get range around it
```

### Use Case: Rate Limiting

```bash
# Sliding window rate limiter
# Track requests in sorted set with timestamp as score

# Add request (score = current timestamp)
ZADD user:1001:requests 1699123456789 "req:uuid1"

# Remove old requests (outside window)
ZREMRANGEBYSCORE user:1001:requests 0 (1699123456789-60000)

# Count requests in window
ZCARD user:1001:requests

# If count > limit, reject request
```

---

## Hashes

Hashes are maps of field-value pairs, perfect for representing objects.

### Basic Operations

```bash
# Set field
HSET user:1001 name "Alice"
HSET user:1001 name "Alice" email "alice@example.com" age "28"

# Get field
HGET user:1001 name

# Get multiple fields
HMGET user:1001 name email age

# Get all fields and values
HGETALL user:1001

# Get all field names
HKEYS user:1001

# Get all values
HVALS user:1001

# Get field count
HLEN user:1001

# Check if field exists
HEXISTS user:1001 email

# Set only if field doesn't exist
HSETNX user:1001 created_at "2024-01-15"
```

### Modifying Fields

```bash
# Increment integer field
HINCRBY user:1001 visits 1
HINCRBY user:1001 age 1

# Increment float field
HINCRBYFLOAT product:1 price 0.50

# Delete field
HDEL user:1001 temporary_field

# Get string length of field value
HSTRLEN user:1001 name
```

### Scanning Hash

```bash
# Iterate over fields (for large hashes)
HSCAN user:1001 0
HSCAN user:1001 0 MATCH name* COUNT 10
```

### Use Case: User Session

```bash
# Store session data
HSET session:abc123 user_id "1001" username "alice" role "admin" login_time "1699123456"

# Set expiration on the whole hash
EXPIRE session:abc123 3600

# Get session data
HGETALL session:abc123

# Update last activity
HSET session:abc123 last_activity "1699124000"

# Delete session on logout
DEL session:abc123
```

### Use Case: Shopping Cart

```bash
# Add items to cart (product_id -> quantity)
HSET cart:user:1001 "product:101" 2
HSET cart:user:1001 "product:102" 1

# Update quantity
HINCRBY cart:user:1001 "product:101" 1

# Remove item
HDEL cart:user:1001 "product:101"

# Get cart
HGETALL cart:user:1001

# Get item count
HLEN cart:user:1001
```

---

## Streams

Streams are append-only log data structures, ideal for event sourcing and message queues.

### Adding Messages

```bash
# Add message with auto-generated ID
XADD mystream * field1 value1 field2 value2
# Returns: "1699123456789-0"

# Add with specific ID
XADD mystream 1699123456789-0 field1 value1

# Add with max length (capped stream)
XADD mystream MAXLEN 1000 * field1 value1
XADD mystream MAXLEN ~ 1000 * field1 value1  # Approximate (faster)
```

### Reading Messages

```bash
# Read all messages
XRANGE mystream - +

# Read specific range
XRANGE mystream 1699123456789-0 1699123457000-0

# Read with count limit
XRANGE mystream - + COUNT 10

# Read in reverse
XREVRANGE mystream + - COUNT 10

# Get stream length
XLEN mystream

# Get stream info
XINFO STREAM mystream
```

### Blocking Read

```bash
# Block until new message (consumer)
XREAD BLOCK 0 STREAMS mystream $

# Read from specific ID
XREAD BLOCK 5000 STREAMS mystream 1699123456789-0

# Read from multiple streams
XREAD BLOCK 0 STREAMS stream1 stream2 $ $
```

### Consumer Groups

```bash
# Create consumer group
XGROUP CREATE mystream mygroup $ MKSTREAM

# Create from beginning
XGROUP CREATE mystream mygroup 0

# Read as consumer in group
XREADGROUP GROUP mygroup consumer1 COUNT 10 STREAMS mystream >

# Blocking read in group
XREADGROUP GROUP mygroup consumer1 BLOCK 0 STREAMS mystream >

# Acknowledge message processed
XACK mystream mygroup 1699123456789-0

# Get pending messages
XPENDING mystream mygroup

# Claim stuck messages (for recovery)
XCLAIM mystream mygroup consumer2 3600000 1699123456789-0

# Delete consumer
XGROUP DELCONSUMER mystream mygroup consumer1

# Delete group
XGROUP DESTROY mystream mygroup
```

### Use Case: Event Log

```bash
# Log events
XADD events:user:1001 * event "login" ip "192.168.1.1" timestamp "1699123456"
XADD events:user:1001 * event "purchase" product "item1" amount "99.99"

# Get recent events
XREVRANGE events:user:1001 + - COUNT 10

# Get events in time range
XRANGE events:user:1001 1699000000000 1699200000000
```

---

## Keys Management

### Key Operations

```bash
# Check if key exists
EXISTS key
EXISTS key1 key2 key3    # Returns count of existing keys

# Get key type
TYPE key

# Delete key
DEL key
DEL key1 key2 key3       # Multiple keys

# Unlink (async delete)
UNLINK key               # Non-blocking delete

# Rename key
RENAME oldkey newkey
RENAMENX oldkey newkey   # Only if newkey doesn't exist

# Move to another database
MOVE key 1               # Move to database 1

# Dump key (serialize)
DUMP key

# Restore key
RESTORE key 0 "\x00..."  # ttl=0 means no expiry
```

### Key Patterns

```bash
# Find keys by pattern
KEYS pattern
KEYS *                   # All keys (dangerous in production!)
KEYS user:*              # Keys starting with "user:"
KEYS *name*              # Keys containing "name"
KEYS user:????           # 4 character suffix

# Scan keys (safe iteration)
SCAN 0                   # Start scan
SCAN cursor MATCH pattern COUNT 100

# Example: Iterate all user keys
SCAN 0 MATCH user:* COUNT 100
# Returns: [next_cursor, [keys...]]
# Continue with next_cursor until it returns 0
```

### Memory Analysis

```bash
# Get memory usage of key
MEMORY USAGE key

# Get object encoding
OBJECT ENCODING key

# Get object frequency (for LFU eviction)
OBJECT FREQ key

# Get idle time
OBJECT IDLETIME key
```

---

## Expiration & TTL

### Setting Expiration

```bash
# Set expiration in seconds
EXPIRE key 3600

# Set expiration in milliseconds
PEXPIRE key 60000

# Set expiration at Unix timestamp (seconds)
EXPIREAT key 1699200000

# Set expiration at Unix timestamp (milliseconds)
PEXPIREAT key 1699200000000

# Set with SET command
SET key "value" EX 3600      # Seconds
SET key "value" PX 60000     # Milliseconds
SET key "value" EXAT 1699200000   # Unix timestamp

# Set expiration only if key has no TTL
EXPIRE key 3600 NX

# Set expiration only if key has TTL
EXPIRE key 3600 XX

# Set only if new TTL > current TTL
EXPIRE key 3600 GT

# Set only if new TTL < current TTL
EXPIRE key 3600 LT
```

### Checking & Removing TTL

```bash
# Get TTL in seconds
TTL key
# Returns: -1 (no expiry), -2 (key doesn't exist), or seconds remaining

# Get TTL in milliseconds
PTTL key

# Remove expiration (persist)
PERSIST key

# Get expiration as Unix timestamp
EXPIRETIME key      # Seconds (Redis 7.0+)
PEXPIRETIME key     # Milliseconds (Redis 7.0+)
```

### Use Case: Session with TTL

```bash
# Create session with 30-minute expiry
SET session:token123 '{"user_id": 1001}' EX 1800

# Extend session on activity
EXPIRE session:token123 1800

# Check remaining time
TTL session:token123
```

---

## Pub/Sub

Redis Pub/Sub enables real-time messaging between publishers and subscribers.

### Basic Pub/Sub

```bash
# Subscribe to channel (Terminal 1)
SUBSCRIBE news
SUBSCRIBE news sports weather

# Subscribe to pattern
PSUBSCRIBE news:*
PSUBSCRIBE *:alerts

# Publish message (Terminal 2)
PUBLISH news "Breaking news!"
# Returns: number of subscribers who received message

# Unsubscribe
UNSUBSCRIBE
UNSUBSCRIBE news
PUNSUBSCRIBE news:*
```

### Pub/Sub Info

```bash
# List active channels
PUBSUB CHANNELS
PUBSUB CHANNELS news:*

# Count subscribers
PUBSUB NUMSUB news sports

# Count pattern subscribers
PUBSUB NUMPAT
```

### Use Case: Real-time Notifications

```bash
# Publisher: Send notification
PUBLISH notifications:user:1001 '{"type": "message", "from": "user:1002"}'

# Subscriber: Listen for notifications
SUBSCRIBE notifications:user:1001
# Or pattern for all users
PSUBSCRIBE notifications:*
```

### Limitations of Pub/Sub

- Messages are fire-and-forget (no persistence)
- No message acknowledgment
- Missed messages if subscriber disconnects
- Consider Streams for reliable messaging

---

## Transactions

Redis transactions allow executing multiple commands atomically.

### Basic Transactions

```bash
# Start transaction
MULTI

# Queue commands
SET key1 "value1"
SET key2 "value2"
INCR counter

# Execute all commands
EXEC
# Returns: array of results

# Cancel transaction
DISCARD
```

### Watch (Optimistic Locking)

```bash
# Watch key for changes
WATCH mykey

# Start transaction
MULTI
SET mykey "new_value"

# Execute (fails if mykey changed)
EXEC
# Returns: nil if key was modified, otherwise results

# Unwatch all keys
UNWATCH
```

### Use Case: Transfer Money

```bash
WATCH account:1001 account:1002

# Get current balances
balance1 = GET account:1001
balance2 = GET account:1002

# Check sufficient funds
if balance1 >= amount:
    MULTI
    DECRBY account:1001 amount
    INCRBY account:1002 amount
    EXEC
```

---

## Lua Scripting

Lua scripts run atomically on the Redis server.

### Running Scripts

```bash
# Run inline script
EVAL "return 'Hello World'" 0

# Script with keys and args
EVAL "return redis.call('GET', KEYS[1])" 1 mykey

# Script with multiple keys and args
EVAL "return redis.call('SET', KEYS[1], ARGV[1])" 1 mykey "myvalue"
```

### Example Scripts

```lua
-- Atomic increment with max limit
local current = redis.call('GET', KEYS[1])
if current == false then
    current = 0
else
    current = tonumber(current)
end
if current < tonumber(ARGV[1]) then
    return redis.call('INCR', KEYS[1])
else
    return current
end
```

```bash
# Run the script
EVAL "local current = redis.call('GET', KEYS[1]) ..." 1 counter 100
```

### Script Management

```bash
# Load script (returns SHA)
SCRIPT LOAD "return redis.call('GET', KEYS[1])"
# Returns: "abc123..."

# Run by SHA
EVALSHA abc123... 1 mykey

# Check if scripts exist
SCRIPT EXISTS sha1 sha2

# Flush all scripts
SCRIPT FLUSH

# Kill running script
SCRIPT KILL
```

### Use Case: Rate Limiter Script

```lua
-- Fixed window rate limiter
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local window = tonumber(ARGV[2])

local current = redis.call('GET', key)
if current == false then
    redis.call('SET', key, 1, 'EX', window)
    return 1
elseif tonumber(current) < limit then
    return redis.call('INCR', key)
else
    return 0  -- Rate limited
end
```

---

## Persistence

### RDB (Snapshotting)

Point-in-time snapshots saved to disk.

```bash
# redis.conf settings
save 900 1      # Save if 1 key changed in 900 seconds
save 300 10     # Save if 10 keys changed in 300 seconds
save 60 10000   # Save if 10000 keys changed in 60 seconds

dbfilename dump.rdb
dir /var/lib/redis

# Manual save
SAVE        # Blocking
BGSAVE      # Background

# Last save time
LASTSAVE
```

### AOF (Append Only File)

Logs every write operation.

```bash
# redis.conf settings
appendonly yes
appendfilename "appendonly.aof"

# Sync policies
appendfsync always    # Every write (safest, slowest)
appendfsync everysec  # Every second (default, good balance)
appendfsync no        # Let OS decide (fastest, risky)

# Rewrite AOF (compact)
BGREWRITEAOF
```

### Persistence Comparison

| Feature | RDB | AOF |
|---------|-----|-----|
| Data Safety | May lose recent data | Minimal loss |
| Performance | Better | More I/O |
| File Size | Compact | Larger |
| Recovery Speed | Fast | Slower |
| Use Case | Backups | Durability |

### Hybrid Persistence (Redis 4.0+)

```bash
# Enable hybrid
aof-use-rdb-preamble yes
```

---

## Replication

### Setting Up Replication

```bash
# On replica (slave)
REPLICAOF master_host 6379

# With authentication
CONFIG SET masterauth password

# Stop replication
REPLICAOF NO ONE

# Check replication status
INFO replication
```

### Configuration

```bash
# master redis.conf
bind 0.0.0.0
requirepass master_password

# replica redis.conf
replicaof master_host 6379
masterauth master_password
replica-read-only yes
```

### Read Replicas

```bash
# Replicas are read-only by default
# Direct reads to replicas for scaling

# Allow writes on replica (not recommended)
CONFIG SET replica-read-only no
```

---

## Clustering

### Cluster Basics

Redis Cluster provides:
- Automatic data sharding across nodes
- High availability with automatic failover
- Linear scalability

### Cluster Commands

```bash
# Create cluster
redis-cli --cluster create host1:6379 host2:6379 host3:6379 \
  host4:6379 host5:6379 host6:6379 --cluster-replicas 1

# Cluster info
CLUSTER INFO

# Cluster nodes
CLUSTER NODES

# Check cluster status
redis-cli --cluster check host:6379

# Add node
CLUSTER MEET host port

# Assign slots
CLUSTER ADDSLOTS slot1 slot2 ...

# Move slots
redis-cli --cluster reshard host:6379
```

### Cluster Client

```bash
# Connect in cluster mode
redis-cli -c -h host -p 6379

# Keys are redirected automatically
SET mykey "value"
# -> Redirected to slot 14687 on host2:6379
```

---

## Security

### Authentication

```bash
# Set password in config
requirepass your_secure_password

# Authenticate
AUTH password

# ACL (Redis 6.0+)
ACL LIST
ACL SETUSER myuser on >password ~keys:* +get +set
ACL GETUSER myuser
ACL DELUSER myuser

# ACL in config
user default on >password ~* +@all
user readonly on >password ~* +@read
```

### Network Security

```bash
# Bind to specific interfaces
bind 127.0.0.1 192.168.1.100

# Disable dangerous commands
rename-command FLUSHALL ""
rename-command FLUSHDB ""
rename-command CONFIG ""
rename-command KEYS ""

# Protected mode (on by default)
protected-mode yes

# TLS/SSL
tls-port 6380
tls-cert-file /path/to/redis.crt
tls-key-file /path/to/redis.key
tls-ca-cert-file /path/to/ca.crt
```

---

## Use Cases & Patterns

### 1. Caching

```bash
# Cache with expiration
SET cache:user:1001 '{"name": "Alice", "email": "..."}' EX 3600

# Cache-aside pattern
# 1. Check cache
GET cache:user:1001
# 2. If miss, query database
# 3. Store in cache
SET cache:user:1001 '...' EX 3600
```

### 2. Session Store

```bash
# Store session
HSET session:token123 user_id 1001 role admin last_access 1699123456
EXPIRE session:token123 1800

# Get session
HGETALL session:token123

# Refresh TTL on access
EXPIRE session:token123 1800
```

### 3. Rate Limiting

```bash
# Token bucket rate limiter
# Key: rate_limit:user:1001
INCR rate_limit:user:1001
EXPIRE rate_limit:user:1001 60  # Reset every minute

# Check limit
if GET rate_limit:user:1001 > 100:
    reject request
```

### 4. Distributed Lock

```bash
# Acquire lock
SET lock:resource NX EX 30  # Only if not exists, 30s TTL

# Release lock (use Lua for safety)
EVAL "if redis.call('GET', KEYS[1]) == ARGV[1] then return redis.call('DEL', KEYS[1]) else return 0 end" 1 lock:resource unique_id
```

### 5. Leaderboard

```bash
# Update score
ZADD leaderboard 1500 "player:1001"
ZINCRBY leaderboard 50 "player:1001"

# Get rankings
ZREVRANGE leaderboard 0 9 WITHSCORES

# Get player rank
ZREVRANK leaderboard "player:1001"
```

### 6. Job Queue

```bash
# Producer
LPUSH queue:jobs '{"task": "process", "data": {...}}'

# Consumer (blocking)
BRPOP queue:jobs 0

# Reliable queue with backup
BRPOPLPUSH queue:jobs queue:processing 0
# After successful processing:
LREM queue:processing 1 job_data
```

### 7. Real-time Analytics

```bash
# Track page views
INCR pageviews:2024-01-15:homepage

# Track unique visitors (HyperLogLog)
PFADD visitors:2024-01-15 user_id
PFCOUNT visitors:2024-01-15
```

---

## Best Practices

### Key Naming

```bash
# Use colons as separators
user:1001:profile
user:1001:sessions
order:5001:items

# Keep keys short but descriptive
u:1001:p        # Too short
user_profile_for_user_id_1001    # Too long
user:1001:profile    # Just right

# Use consistent naming conventions
```

### Memory Optimization

```bash
# Use appropriate data types
# Hashes for small objects (ziplist encoding)
HSET user:1001 name "Alice" age "28"

# Set max entries for optimal encoding
hash-max-ziplist-entries 512
hash-max-ziplist-value 64
list-max-ziplist-size -2
set-max-intset-entries 512
zset-max-ziplist-entries 128

# Use EXPIRE to clean up temporary data
SET temp:data value EX 3600

# Monitor memory
INFO memory
MEMORY USAGE key
```

### Performance Tips

```bash
# Use pipelining for bulk operations
# (client-side batching of commands)

# Use SCAN instead of KEYS
SCAN 0 MATCH pattern* COUNT 100

# Use appropriate data structures
# Lists for queues, Sorted Sets for leaderboards

# Avoid large keys (>1MB)
# Split large data across multiple keys

# Use connection pooling in applications
```

### Monitoring

```bash
# Monitor commands in real-time
MONITOR    # Warning: impacts performance

# Slow log
SLOWLOG GET 10
CONFIG SET slowlog-log-slower-than 10000  # microseconds

# Client connections
CLIENT LIST
INFO clients

# Memory stats
INFO memory
MEMORY STATS
MEMORY DOCTOR
```

---

## Quick Reference

### Common Commands Cheat Sheet

```bash
# Strings
SET key value [EX seconds] [NX|XX]
GET key
INCR key / DECR key
MSET k1 v1 k2 v2 / MGET k1 k2

# Lists
LPUSH/RPUSH list value
LPOP/RPOP list
LRANGE list 0 -1
LLEN list

# Sets
SADD set member
SREM set member
SMEMBERS set
SINTER set1 set2

# Sorted Sets
ZADD zset score member
ZRANGE zset 0 -1 [WITHSCORES]
ZREVRANGE zset 0 -1
ZRANK/ZREVRANK zset member

# Hashes
HSET hash field value
HGET hash field
HGETALL hash
HDEL hash field

# Keys
DEL key
EXISTS key
EXPIRE key seconds
TTL key
KEYS pattern (use SCAN instead)

# Transactions
MULTI / EXEC / DISCARD
WATCH key

# Pub/Sub
SUBSCRIBE channel
PUBLISH channel message
```

### Data Type Selection Guide

| Use Case | Data Type |
|----------|-----------|
| Simple caching | Strings |
| Object storage | Hashes |
| Queues | Lists |
| Unique items | Sets |
| Rankings | Sorted Sets |
| Event logs | Streams |
| Counting unique items | HyperLogLog |
| Location data | Geospatial |

---

## Further Reading

- [Redis Official Documentation](https://redis.io/documentation)
- [Redis Commands Reference](https://redis.io/commands)
- [Redis University](https://university.redis.com/)
- [Redis Best Practices](https://redis.io/docs/manual/patterns/)
- [Redis Cluster Tutorial](https://redis.io/docs/manual/scaling/)
