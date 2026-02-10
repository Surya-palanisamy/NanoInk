# Inter-Process Communication (IPC)

Inter-Process Communication (IPC) refers to mechanisms that allow processes to communicate and synchronize their actions.

---

## Why IPC?

Processes need to communicate for:

1. **Data Sharing** - Exchange information between processes
2. **Computation Speedup** - Divide task among processes
3. **Modularity** - Separate concerns into different processes
4. **Convenience** - Multiple tasks simultaneously

---

## Types of Processes

### Independent Processes
- Cannot affect or be affected by other processes
- No data sharing
- Deterministic execution

### Cooperating Processes
- Can affect or be affected by other processes
- Share data or messages
- Need synchronization

---

## IPC Models

### 1. Shared Memory

```
┌─────────────┐                    ┌─────────────┐
│  Process A  │                    │  Process B  │
│             │                    │             │
│  ┌───────┐  │                    │  ┌───────┐  │
│  │ Code  │  │                    │  │ Code  │  │
│  ├───────┤  │                    │  ├───────┤  │
│  │ Data  │  │                    │  │ Data  │  │
│  └───────┘  │                    │  └───────┘  │
│      │      │                    │      │      │
└──────┼──────┘                    └──────┼──────┘
       │                                  │
       │     ┌──────────────────┐         │
       └────►│  Shared Memory   │◄────────┘
             │   Region         │
             └──────────────────┘
```

**Characteristics:**
- Processes share a region of memory
- Fastest IPC method (memory speed)
- Requires synchronization (semaphores, mutex)
- Set up by system calls, then normal memory access

**System Calls (POSIX):**
| Function | Description |
|----------|-------------|
| `shmget()` | Create shared memory segment |
| `shmat()` | Attach segment to address space |
| `shmdt()` | Detach segment |
| `shmctl()` | Control operations |

**Example:**
```c
#include <sys/shm.h>
#include <stdio.h>
#include <string.h>

int main() {
    // Create shared memory
    int shmid = shmget(IPC_PRIVATE, 1024, IPC_CREAT | 0666);
    
    // Attach to address space
    char *str = (char*) shmat(shmid, NULL, 0);
    
    // Write to shared memory
    strcpy(str, "Hello from shared memory!");
    
    printf("Data: %s\n", str);
    
    // Detach
    shmdt(str);
    
    // Remove shared memory
    shmctl(shmid, IPC_RMID, NULL);
    
    return 0;
}
```

---

### 2. Message Passing

```
┌─────────────┐                    ┌─────────────┐
│  Process A  │                    │  Process B  │
│             │                    │             │
│  send(msg) ─┼───────────────────►├─ recv(msg)  │
│             │      Message       │             │
│             │      Queue         │             │
└─────────────┘                    └─────────────┘
```

**Characteristics:**
- Processes communicate via messages
- No shared memory required
- Good for distributed systems
- OS handles data transfer

**Operations:**
- `send(destination, message)`
- `receive(source, message)`

---

## Message Passing Variants

### Direct vs Indirect Communication

#### Direct Communication
- Processes explicitly name each other
- Symmetric: Both name each other
- Asymmetric: Sender names receiver only

```c
send(P, message);      // Send to process P
receive(Q, message);   // Receive from process Q
```

**Properties:**
- Exactly one link between each pair
- Link is automatic when processes know each other

#### Indirect Communication (Mailboxes)
- Messages sent to/received from mailboxes (ports)
- Multiple processes can share a mailbox

```c
send(A, message);      // Send to mailbox A
receive(A, message);   // Receive from mailbox A
```

**Properties:**
- Link exists if processes share mailbox
- Multiple processes can share mailbox
- Multiple links possible between processes

---

### Synchronous vs Asynchronous

| Type | Send | Receive |
|------|------|---------|
| **Synchronous (Blocking)** | Sender blocks until received | Receiver blocks until message available |
| **Asynchronous (Non-blocking)** | Sender continues immediately | Receiver gets message or null |

**Rendezvous:** Both send and receive are blocking

---

### Buffering

| Buffer Type | Description |
|-------------|-------------|
| **Zero Capacity** | No buffering, sender must wait |
| **Bounded Capacity** | Limited queue, sender waits if full |
| **Unbounded Capacity** | Infinite queue, sender never waits |

---

## IPC Mechanisms in Detail

### 1. Pipes

Unidirectional communication channel between related processes.

#### Ordinary Pipes (Anonymous Pipes)

```
┌──────────┐         ┌──────────┐         ┌──────────┐
│  Parent  │─write──►│   Pipe   │─read───►│  Child   │
│          │         │  Buffer  │         │          │
└──────────┘         └──────────┘         └──────────┘
```

**Characteristics:**
- Unidirectional
- Require parent-child relationship
- Exist only while processes run
- FIFO order

**Example:**
```c
#include <unistd.h>
#include <stdio.h>
#include <string.h>

int main() {
    int pipefd[2];  // pipefd[0]=read, pipefd[1]=write
    char buffer[100];
    
    pipe(pipefd);   // Create pipe
    
    if (fork() == 0) {
        // Child: Read from pipe
        close(pipefd[1]);  // Close write end
        read(pipefd[0], buffer, sizeof(buffer));
        printf("Child received: %s\n", buffer);
        close(pipefd[0]);
    } else {
        // Parent: Write to pipe
        close(pipefd[0]);  // Close read end
        write(pipefd[1], "Hello, child!", 14);
        close(pipefd[1]);
        wait(NULL);
    }
    return 0;
}
```

#### Named Pipes (FIFOs)

**Characteristics:**
- Bidirectional
- No parent-child relationship required
- Persist in file system
- Accessed by name

```c
// Create named pipe
mkfifo("/tmp/myfifo", 0666);

// Open and use like regular file
int fd = open("/tmp/myfifo", O_WRONLY);
write(fd, "Hello", 5);
close(fd);
```

---

### 2. Message Queues

Linked list of messages stored in kernel.

```
┌────────────────────────────────────────────┐
│              Message Queue                 │
├────────┬────────┬────────┬────────┬────────┤
│  Msg1  │  Msg2  │  Msg3  │  Msg4  │  ...   │
│ Type:1 │ Type:2 │ Type:1 │ Type:3 │        │
└────────┴────────┴────────┴────────┴────────┘
```

**Characteristics:**
- Messages have type and data
- Can receive by type (selective receive)
- Persist until explicitly deleted
- Multiple processes can send/receive

**System Calls:**
| Function | Description |
|----------|-------------|
| `msgget()` | Create/access message queue |
| `msgsnd()` | Send message |
| `msgrcv()` | Receive message |
| `msgctl()` | Control operations |

**Example:**
```c
#include <sys/msg.h>

struct message {
    long type;
    char text[100];
};

int main() {
    // Create message queue
    int msgid = msgget(IPC_PRIVATE, 0666 | IPC_CREAT);
    
    struct message msg;
    msg.type = 1;
    strcpy(msg.text, "Hello via message queue!");
    
    // Send message
    msgsnd(msgid, &msg, sizeof(msg.text), 0);
    
    // Receive message
    struct message received;
    msgrcv(msgid, &received, sizeof(received.text), 1, 0);
    printf("Received: %s\n", received.text);
    
    // Remove queue
    msgctl(msgid, IPC_RMID, NULL);
    
    return 0;
}
```

---

### 3. Sockets

Endpoint for communication, can be used for network or local communication.

```
┌─────────────┐                      ┌─────────────┐
│   Client    │                      │   Server    │
│             │                      │             │
│  socket()   │                      │  socket()   │
│  connect()──┼──────────────────────┼──bind()     │
│  send()     │                      │  listen()   │
│  recv()     │                      │  accept()   │
│  close()    │                      │  send/recv  │
└─────────────┘                      └─────────────┘
```

**Socket Types:**
| Type | Description |
|------|-------------|
| **Stream (TCP)** | Reliable, connection-oriented |
| **Datagram (UDP)** | Unreliable, connectionless |
| **Unix Domain** | Local communication |

**Example (Server):**
```c
int sockfd = socket(AF_INET, SOCK_STREAM, 0);

struct sockaddr_in addr;
addr.sin_family = AF_INET;
addr.sin_port = htons(8080);
addr.sin_addr.s_addr = INADDR_ANY;

bind(sockfd, (struct sockaddr*)&addr, sizeof(addr));
listen(sockfd, 5);

int client = accept(sockfd, NULL, NULL);
send(client, "Hello!", 6, 0);
close(client);
close(sockfd);
```

---

### 4. Signals

Asynchronous notification to process about events.

**Common Signals:**
| Signal | Number | Default Action | Description |
|--------|--------|----------------|-------------|
| SIGINT | 2 | Terminate | Interrupt (Ctrl+C) |
| SIGKILL | 9 | Terminate | Kill (cannot be caught) |
| SIGSEGV | 11 | Core dump | Segmentation fault |
| SIGTERM | 15 | Terminate | Termination request |
| SIGSTOP | 19 | Stop | Stop process |
| SIGCONT | 18 | Continue | Continue if stopped |
| SIGCHLD | 17 | Ignore | Child terminated |

**Handling Signals:**
```c
#include <signal.h>
#include <stdio.h>

void handler(int sig) {
    printf("Caught signal %d\n", sig);
}

int main() {
    // Register handler
    signal(SIGINT, handler);
    
    // Or use sigaction for more control
    struct sigaction sa;
    sa.sa_handler = handler;
    sigemptyset(&sa.sa_mask);
    sa.sa_flags = 0;
    sigaction(SIGTERM, &sa, NULL);
    
    while(1) {
        pause();  // Wait for signal
    }
    return 0;
}
```

**Sending Signals:**
```c
kill(pid, SIGTERM);   // Send signal to process
raise(SIGINT);        // Send signal to self
```

---

### 5. Memory-Mapped Files

Map file directly into virtual address space.

```c
#include <sys/mman.h>
#include <fcntl.h>

int fd = open("data.txt", O_RDWR);
char *map = mmap(NULL, 4096, PROT_READ | PROT_WRITE, 
                 MAP_SHARED, fd, 0);

// Access file through memory
printf("First char: %c\n", map[0]);
map[0] = 'X';  // Write to file

munmap(map, 4096);
close(fd);
```

**Use Cases:**
- Efficient file I/O
- Sharing memory between processes
- Loading executable code

---

## Comparison of IPC Methods

| Method | Speed | Complexity | Use Case |
|--------|-------|------------|----------|
| **Shared Memory** | Fastest | Complex (sync needed) | High-speed data sharing |
| **Pipes** | Fast | Simple | Parent-child communication |
| **Named Pipes** | Fast | Simple | Unrelated processes |
| **Message Queues** | Medium | Medium | Structured messages |
| **Sockets** | Medium | Complex | Network/distributed |
| **Signals** | Fast | Simple | Event notification |

---

## Producer-Consumer Problem

Classic IPC synchronization problem.

```
Producer ──► [Buffer] ──► Consumer
```

**Bounded Buffer Solution:**
```c
#define BUFFER_SIZE 10

int buffer[BUFFER_SIZE];
int in = 0;   // Next free position
int out = 0;  // First full position

// Producer
while (true) {
    item = produce_item();
    while (((in + 1) % BUFFER_SIZE) == out)
        ;  // Buffer full, wait
    buffer[in] = item;
    in = (in + 1) % BUFFER_SIZE;
}

// Consumer
while (true) {
    while (in == out)
        ;  // Buffer empty, wait
    item = buffer[out];
    out = (out + 1) % BUFFER_SIZE;
    consume_item(item);
}
```

---

## Important Interview Questions

### Q1: What is the difference between shared memory and message passing?

**A:** 
- **Shared Memory:** Processes share memory region, faster, needs synchronization
- **Message Passing:** Explicit send/receive, slower, no sync needed, good for distributed systems

### Q2: When would you use pipes vs sockets?

**A:** 
- **Pipes:** Simple, related processes, same machine
- **Sockets:** Network communication, unrelated processes, bidirectional, more features

### Q3: What happens if a process tries to read from an empty pipe?

**A:** The process blocks (waits) until data is available or all write ends are closed (returns 0/EOF).

### Q4: What is the difference between SIGKILL and SIGTERM?

**A:** 
- **SIGKILL (9):** Cannot be caught or ignored, forceful termination
- **SIGTERM (15):** Can be caught, allows graceful shutdown

### Q5: How does shared memory achieve synchronization?

**A:** Shared memory itself doesn't provide synchronization. Processes must use additional mechanisms like semaphores, mutexes, or condition variables.

---

## Quick Reference

```
IPC Methods:
├── Shared Memory: Fastest, needs synchronization
├── Pipes: Simple, unidirectional, parent-child
├── Named Pipes: Persist in filesystem, any processes  
├── Message Queues: Structured messages, type-based
├── Sockets: Network capable, bidirectional
├── Signals: Async events, limited data
└── Memory-Mapped Files: File as memory

Communication Types:
├── Direct: Processes name each other
├── Indirect: Via mailbox/port
├── Synchronous: Blocking operations
└── Asynchronous: Non-blocking operations

Key System Calls:
├── Shared Memory: shmget, shmat, shmdt, shmctl
├── Message Queue: msgget, msgsnd, msgrcv, msgctl
├── Pipes: pipe, mkfifo
├── Sockets: socket, bind, listen, accept, connect
└── Signals: signal, sigaction, kill, raise
```
