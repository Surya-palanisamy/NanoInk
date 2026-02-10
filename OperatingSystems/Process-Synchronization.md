# Process Synchronization

Process synchronization is the coordination of concurrent processes to ensure correct execution when accessing shared resources.

---

## Why Synchronization?

When multiple processes access shared data concurrently, the final result depends on the order of execution. This leads to:

- **Race Conditions** - Output depends on execution sequence
- **Data Inconsistency** - Shared data becomes corrupted
- **Unpredictable Results** - Different runs produce different outputs

---

## Critical Section Problem

The **Critical Section** is a code segment where shared resources are accessed.

### Structure of a Process

```
Entry Section       ← Request to enter critical section
    ↓
Critical Section    ← Access shared resources
    ↓
Exit Section        ← Release critical section
    ↓
Remainder Section   ← Non-critical code
```

### Requirements for Solution

Any valid solution must satisfy these three conditions:

| Requirement | Description |
|-------------|-------------|
| **Mutual Exclusion** | Only one process can be in critical section at a time |
| **Progress** | If no process is in CS, a waiting process must be allowed to enter |
| **Bounded Waiting** | Limit on how long a process waits after requesting entry |

---

## Race Condition

A race condition occurs when multiple processes access and manipulate shared data concurrently, and the outcome depends on the order of execution.

**Example:**
```c
// Shared variable
int counter = 5;

// Process P1
counter++;   // counter = counter + 1

// Process P2
counter--;   // counter = counter - 1

// Expected: counter = 5
// Possible results: 4, 5, or 6 (depending on interleaving)
```

**Why it happens:**
```
counter++ in machine code:
    LOAD  counter → R1
    ADD   R1, 1
    STORE R1 → counter

If P1 and P2 interleave incorrectly, 
one update can be lost.
```

---

## Peterson's Solution

A classical software-based solution for two processes.

```c
// Shared variables
int turn;          // Whose turn it is
bool flag[2];      // Ready to enter CS

// Process Pi (i = 0 or 1, j = 1-i)
flag[i] = true;    // I want to enter
turn = j;          // Give turn to other
while (flag[j] && turn == j)
    ;              // Wait
    
// CRITICAL SECTION

flag[i] = false;   // Done with CS

// REMAINDER SECTION
```

**Properties:**
- Satisfies all three requirements
- Only works for two processes
- Busy waiting (wastes CPU cycles)
- May not work on modern CPUs (memory reordering)

---

## Synchronization Hardware

### Test and Set Lock (TSL)

Atomic instruction that tests and modifies a memory word.

```c
// Hardware instruction (atomic)
bool test_and_set(bool *target) {
    bool rv = *target;
    *target = true;
    return rv;
}

// Usage
bool lock = false;

while (test_and_set(&lock))
    ;  // Wait
    
// CRITICAL SECTION

lock = false;

// REMAINDER SECTION
```

### Compare and Swap (CAS)

```c
// Hardware instruction (atomic)
int compare_and_swap(int *value, int expected, int new_value) {
    int temp = *value;
    if (*value == expected)
        *value = new_value;
    return temp;
}
```

### Advantages of Hardware Solutions

- Simple to use
- Works for any number of processes
- Can support multiple critical sections

### Disadvantages

- Busy waiting still present
- Starvation possible
- Deadlock possible in complex scenarios

---

## Mutex Locks

**Mutex (Mutual Exclusion)** is the simplest synchronization tool.

```c
// Mutex operations
acquire() {
    while (!available)
        ;  // Busy wait
    available = false;
}

release() {
    available = true;
}

// Usage
acquire(mutex);
// CRITICAL SECTION
release(mutex);
```

**Properties:**
- Binary lock (locked or unlocked)
- Must be released by the same process that acquired it
- Simple but uses busy waiting (spinlock)

---

## Semaphores

A semaphore is an integer variable accessed through two atomic operations.

### Operations

```c
// Wait operation (P or down)
wait(S) {
    while (S <= 0)
        ;  // Busy wait
    S--;
}

// Signal operation (V or up)
signal(S) {
    S++;
}
```

### Types of Semaphores

#### Binary Semaphore (Mutex)
- Value can be 0 or 1
- Used for mutual exclusion

```c
semaphore mutex = 1;

wait(mutex);
// CRITICAL SECTION
signal(mutex);
```

#### Counting Semaphore
- Value can be any non-negative integer
- Used for resource allocation

```c
// Example: 5 instances of a resource
semaphore resource = 5;

wait(resource);    // Acquire one instance
// USE RESOURCE
signal(resource);  // Release instance
```

### Semaphore without Busy Waiting

```c
typedef struct {
    int value;
    struct process *list;  // Waiting queue
} semaphore;

wait(semaphore *S) {
    S->value--;
    if (S->value < 0) {
        add this process to S->list;
        block();
    }
}

signal(semaphore *S) {
    S->value++;
    if (S->value <= 0) {
        remove process P from S->list;
        wakeup(P);
    }
}
```

---

## Classic Synchronization Problems

### 1. Producer-Consumer Problem

**Problem:** Producer produces items, Consumer consumes them. Buffer has limited capacity.

```c
semaphore mutex = 1;      // Mutual exclusion
semaphore empty = N;      // Empty slots (initially N)
semaphore full = 0;       // Filled slots (initially 0)

// Producer
while (true) {
    produce_item();
    
    wait(empty);          // Wait for empty slot
    wait(mutex);          // Enter CS
    
    add_to_buffer();
    
    signal(mutex);        // Exit CS
    signal(full);         // Signal item added
}

// Consumer
while (true) {
    wait(full);           // Wait for item
    wait(mutex);          // Enter CS
    
    remove_from_buffer();
    
    signal(mutex);        // Exit CS
    signal(empty);        // Signal slot freed
    
    consume_item();
}
```

---

### 2. Reader-Writer Problem

**Problem:** Multiple readers can read simultaneously, but writers need exclusive access.

```c
semaphore mutex = 1;      // Protect read_count
semaphore rw_mutex = 1;   // Mutual exclusion for writers
int read_count = 0;       // Number of readers

// Writer
wait(rw_mutex);
// WRITE
signal(rw_mutex);

// Reader
wait(mutex);
read_count++;
if (read_count == 1)
    wait(rw_mutex);       // First reader blocks writers
signal(mutex);

// READ

wait(mutex);
read_count--;
if (read_count == 0)
    signal(rw_mutex);     // Last reader unblocks writers
signal(mutex);
```

**Variations:**
- First Reader-Writer: Readers have priority
- Second Reader-Writer: Writers have priority

---

### 3. Dining Philosophers Problem

**Problem:** 5 philosophers sit around a table. Each needs two forks to eat. Forks are shared between adjacent philosophers.

```
        P0
    F4      F0
  P4          P1
    F3      F1
      P3  P2
        F2
```

**Naive Solution (Deadlock Prone):**
```c
semaphore fork[5] = {1, 1, 1, 1, 1};

// Philosopher i
while (true) {
    think();
    
    wait(fork[i]);              // Pick left fork
    wait(fork[(i+1) % 5]);      // Pick right fork
    
    eat();
    
    signal(fork[i]);            // Put left fork
    signal(fork[(i+1) % 5]);    // Put right fork
}
// DEADLOCK if all pick left fork simultaneously!
```

**Solutions:**
1. Allow at most 4 philosophers at table
2. Pick both forks atomically
3. Odd philosophers pick left first, even pick right first
4. Use a waiter (mutex) to coordinate

---

## Monitors

A high-level synchronization construct that encapsulates shared data and operations.

### Structure

```c
monitor MonitorName {
    // Shared variables
    
    // Condition variables
    condition x, y;
    
    // Procedures
    procedure P1() { ... }
    procedure P2() { ... }
    
    // Initialization code
    init() { ... }
}
```

### Properties

- Only one process can be active inside monitor at a time
- Automatic mutual exclusion
- Condition variables for waiting

### Condition Variables

```c
x.wait();    // Suspend calling process
x.signal();  // Resume one suspended process
```

**Difference from Semaphores:**
- `signal()` has no effect if no process is waiting
- Semaphore `signal()` always increments

### Producer-Consumer with Monitor

```c
monitor ProducerConsumer {
    int buffer[N];
    int count = 0;
    condition full, empty;
    
    procedure insert(item) {
        if (count == N)
            full.wait();
        buffer[count++] = item;
        empty.signal();
    }
    
    procedure remove() {
        if (count == 0)
            empty.wait();
        item = buffer[--count];
        full.signal();
        return item;
    }
}
```

---

## Comparison Table

| Mechanism | Level | Busy Waiting | Complexity |
|-----------|-------|--------------|------------|
| Peterson's | Software | Yes | Medium |
| TSL/CAS | Hardware | Yes | Low |
| Mutex | OS | Yes (spinlock) | Low |
| Semaphore | OS | Optional | Medium |
| Monitor | Language | No | High |

---

## Common Interview Questions

### Q1: What is a race condition?
**A:** A race condition occurs when multiple processes access shared data concurrently and the final result depends on the order of execution.

### Q2: Difference between mutex and semaphore?
**A:** 
- Mutex is binary (0 or 1), semaphore can be any non-negative integer
- Mutex must be released by the same process that acquired it
- Semaphore is used for signaling, mutex for mutual exclusion

### Q3: What is a spinlock?
**A:** A lock that uses busy waiting. The process continuously checks if the lock is available, wasting CPU cycles but avoiding context switch overhead.

### Q4: What is priority inversion?
**A:** When a high-priority process is blocked waiting for a resource held by a low-priority process, which may be preempted by medium-priority processes.

### Q5: How to prevent deadlock in Dining Philosophers?
**A:** 
1. Allow max 4 philosophers at table
2. Pick both forks atomically
3. Odd/even philosophers pick forks in different order
4. Use asymmetric solution

---

## Key Takeaways

1. **Race conditions** cause unpredictable behavior with shared data
2. **Critical section solutions** must ensure mutual exclusion, progress, and bounded waiting
3. **Semaphores** are versatile but error-prone
4. **Monitors** provide automatic mutual exclusion
5. **Classic problems** (Producer-Consumer, Readers-Writers, Dining Philosophers) demonstrate synchronization challenges
