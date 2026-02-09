# Threads

A thread is the smallest unit of CPU execution within a process. Threads allow a program to perform multiple tasks concurrently.

---

## What is a Thread?

- **Thread**: Lightweight process, basic unit of CPU utilization
- Also called **Lightweight Process (LWP)**
- Multiple threads can exist within a single process
- Threads share process resources but execute independently

---

## Thread Components

### Private to Each Thread (Not Shared)
| Component | Description |
|-----------|-------------|
| Thread ID | Unique identifier for the thread |
| Program Counter (PC) | Tracks current instruction |
| Register Set | CPU registers state |
| Stack | Local variables, function calls |

### Shared Among Threads (Same Process)
| Component | Description |
|-----------|-------------|
| Code Section | Program instructions |
| Data Section | Global variables |
| Heap | Dynamically allocated memory |
| Open Files | File descriptors |
| Signals | Signal handlers |

---

## Thread vs Process

| Aspect | Process | Thread |
|--------|---------|--------|
| Definition | Program in execution | Unit of execution within process |
| Memory | Separate memory space | Shared memory space |
| Creation Time | Slower (heavy) | Faster (lightweight) |
| Context Switch | Expensive | Cheaper |
| Communication | IPC required | Direct (shared memory) |
| Isolation | Independent | Dependent on process |
| Resource Overhead | High | Low |
| Crash Impact | Isolated | Can crash entire process |

---

## Types of Threads

### Based on Number

#### Single-Threaded Process
- Only one thread of execution
- Simple to implement
- No concurrency within process
- Example: Traditional UNIX programs

#### Multi-Threaded Process
- Multiple threads within same process
- Better resource utilization
- Complex synchronization needed
- Example: Web browsers, servers

### Based on Level

#### User-Level Threads (ULT)
- Managed by user-level thread library
- Kernel unaware of threads
- Fast creation and switching
- Entire process blocks on I/O

**Advantages:**
- Thread switching doesn't require kernel mode
- Can run on any OS
- Scheduling is application-specific
- Fast and efficient

**Disadvantages:**
- One thread blocks → entire process blocks
- Cannot utilize multiple CPUs
- No true parallelism

#### Kernel-Level Threads (KLT)
- Managed directly by OS kernel
- Kernel aware of each thread
- Can schedule threads on multiple CPUs
- System call for each operation

**Advantages:**
- True parallelism on multi-core
- One thread blocks, others continue
- Better for I/O-bound applications

**Disadvantages:**
- Slower creation and management
- Context switch requires kernel intervention
- More overhead

---

## Multithreading Models

### Many-to-One Model
```
User Threads:    T1  T2  T3  T4
                  \  |  |  /
                   \ | | /
Kernel Thread:      KT1
```

- Many user threads → One kernel thread
- Thread management in user space
- Entire process blocks if one thread blocks
- No parallel execution
- Example: Green threads (early Java)

### One-to-One Model
```
User Threads:    T1    T2    T3    T4
                  |     |     |     |
Kernel Threads: KT1   KT2   KT3   KT4
```

- Each user thread → One kernel thread
- More concurrency than many-to-one
- Creating user thread creates kernel thread
- Overhead of creating kernel threads
- Example: Windows, Linux

### Many-to-Many Model
```
User Threads:    T1  T2  T3  T4  T5
                  \  |   X   |  /
                   \ | / \ | /
Kernel Threads:    KT1   KT2   KT3
```

- Many user threads → Many kernel threads
- Number of kernel threads ≤ user threads
- Best of both worlds
- OS creates sufficient kernel threads
- Example: Windows with ThreadFiber

### Two-Level Model
- Variation of many-to-many
- Allows binding user thread to kernel thread
- Provides flexibility
- Example: IRIX, HP-UX

---

## Thread Libraries

### POSIX Threads (Pthreads)
```c
#include <pthread.h>

void *thread_function(void *arg) {
    printf("Hello from thread!\n");
    return NULL;
}

int main() {
    pthread_t thread;
    pthread_create(&thread, NULL, thread_function, NULL);
    pthread_join(thread, NULL);
    return 0;
}
```

**Key Functions:**
| Function | Description |
|----------|-------------|
| `pthread_create()` | Create new thread |
| `pthread_join()` | Wait for thread termination |
| `pthread_exit()` | Terminate calling thread |
| `pthread_cancel()` | Request thread cancellation |
| `pthread_self()` | Get thread ID |

### Java Threads
```java
// Method 1: Extend Thread class
class MyThread extends Thread {
    public void run() {
        System.out.println("Thread running");
    }
}

// Method 2: Implement Runnable
class MyRunnable implements Runnable {
    public void run() {
        System.out.println("Runnable running");
    }
}

// Usage
new MyThread().start();
new Thread(new MyRunnable()).start();
```

### Windows Threads
```c
#include <windows.h>

DWORD WINAPI ThreadFunc(LPVOID param) {
    printf("Windows Thread\n");
    return 0;
}

int main() {
    HANDLE thread = CreateThread(NULL, 0, ThreadFunc, NULL, 0, NULL);
    WaitForSingleObject(thread, INFINITE);
    CloseHandle(thread);
    return 0;
}
```

---

## Thread States

```
                    ┌─────────────────┐
                    │      NEW        │
                    └────────┬────────┘
                             │ start()
                             ▼
       ┌────────────────────────────────────────┐
       │               RUNNABLE                  │
       │  ┌──────────┐      ┌──────────┐        │
       │  │  READY   │◄────►│ RUNNING  │        │
       │  └──────────┘      └──────────┘        │
       └────────┬───────────────┬───────────────┘
                │               │
    I/O, sleep, │               │ run() completes
    wait, lock  │               │
                ▼               ▼
       ┌──────────────┐   ┌──────────────┐
       │   BLOCKED/   │   │  TERMINATED  │
       │   WAITING    │   │              │
       └──────────────┘   └──────────────┘
```

| State | Description |
|-------|-------------|
| New | Thread created but not started |
| Runnable | Ready to run or running |
| Blocked | Waiting for monitor lock |
| Waiting | Waiting indefinitely for another thread |
| Timed Waiting | Waiting for specified time |
| Terminated | Execution completed |

---

## Benefits of Threads

### 1. Responsiveness
- Application remains responsive during long operations
- UI thread separate from worker threads
- User can continue interacting

### 2. Resource Sharing
- Threads share process memory and resources
- No need for IPC mechanisms
- Efficient communication

### 3. Economy
- Cheaper to create than processes
- Less memory overhead
- Faster context switching

### 4. Scalability
- Utilize multiple CPU cores
- Parallel execution possible
- Better performance on multi-core systems

---

## Thread Challenges

### 1. Race Conditions
- Multiple threads access shared data
- Result depends on execution order
- Need synchronization mechanisms

### 2. Deadlocks
- Threads waiting for each other
- Circular dependency
- System hangs

### 3. Priority Inversion
- Low-priority thread holds resource
- High-priority thread waits
- Solution: Priority inheritance

### 4. Thread Safety
- Code must be thread-safe
- Use synchronization primitives
- Avoid shared mutable state

---

## Thread Synchronization Primitives

| Primitive | Purpose |
|-----------|---------|
| Mutex | Mutual exclusion lock |
| Semaphore | Counting synchronization |
| Condition Variable | Wait for condition |
| Read-Write Lock | Multiple readers, single writer |
| Barrier | Synchronization point |
| Spinlock | Busy-wait lock |

---

## Important Interview Questions

### Q1: Difference between process and thread?
**A:** Process is an independent program with separate memory space. Thread is a lightweight execution unit within a process that shares memory with other threads of the same process.

### Q2: Why use threads over processes?
**A:** Threads are lighter, share memory (easy communication), faster to create/switch, and more efficient for concurrent tasks within same application.

### Q3: What is thread safety?
**A:** Code is thread-safe when it functions correctly during simultaneous execution by multiple threads, typically achieved through synchronization.

### Q4: User-level vs Kernel-level threads?
**A:** ULT - managed by library, fast but no true parallelism. KLT - managed by OS, slower but enables real parallelism on multiple CPUs.

### Q5: What happens when a thread crashes?
**A:** The entire process crashes since threads share the same address space. One thread's memory corruption affects all threads.

---

## Quick Reference

```
Thread Creation Cost:     Thread < Process
Context Switch Cost:      Thread < Process
Communication:            Thread (shared memory) faster than Process (IPC)
Isolation:                Process > Thread
Parallelism:              KLT > ULT
```
