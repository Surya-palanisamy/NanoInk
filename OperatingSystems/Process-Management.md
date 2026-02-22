# Process Management
Process management is one of the core functions of an operating system, responsible for creating, scheduling, and terminating processes.
---
## What is a Process?
A **process** is a program in execution. It is an active entity, unlike a program which is a passive entity stored on disk.
### Process vs Program
| Program | Process |
|---------|---------|
| Passive entity | Active entity |
| Stored on disk | Resides in memory |
| No resources allocated | Has allocated resources |
| Single copy | Multiple instances possible |
---
## Process Components
A process consists of:
1. **Text Section** - Program code
2. **Data Section** - Global variables
3. **Heap** - Dynamically allocated memory
4. **Stack** - Temporary data (function parameters, return addresses, local variables)
5. **Program Counter (PC)** - Address of next instruction
6. **Registers** - CPU register contents
---
## Process Control Block (PCB)
The PCB is a data structure maintained by the OS for every process. It contains:
| Field | Description |
|-------|-------------|
| Process ID (PID) | Unique identifier |
| Process State | Current state of process |
| Program Counter | Next instruction address |
| CPU Registers | Register values |
| CPU Scheduling Info | Priority, pointers to scheduling queues |
| Memory Management Info | Page tables, segment tables |
| Accounting Info | CPU time used, time limits |
| I/O Status Info | List of open files, I/O devices |
---
## Process States
A process goes through various states during its lifecycle:
```
                    ┌──────────────┐
      admitted      │              │    exit
    ───────────────►│   RUNNING    ├──────────────►
                    │              │
                    └──────┬───────┘
                           │
           ┌───────────────┼───────────────┐
           │ interrupt     │  I/O or       │
           ▼               │  event wait   ▼
    ┌──────────────┐       │        ┌──────────────┐
    │              │       │        │              │
    │    READY     │◄──────┘        │   WAITING    │
    │              │                │              │
    └──────────────┘                └──────────────┘
           ▲        scheduler             │
           │        dispatch              │
           │                              │
           └──────────────────────────────┘
                   I/O or event completion
```
### Five State Model
1. **New** - Process is being created
2. **Ready** - Process is waiting to be assigned to CPU
3. **Running** - Process is being executed
4. **Waiting (Blocked)** - Process is waiting for I/O or event
5. **Terminated** - Process has finished execution
### Seven State Model (with Suspend)
Adds two more states for swapped processes:
6. **Suspend Ready** - Process swapped out but ready when brought in
7. **Suspend Blocked** - Process swapped out and waiting for event
---
## Process Operations
### Process Creation
- Parent process creates child processes
- Forms a process tree
- Resource sharing options:
  - Parent and child share all resources
  - Child shares subset of parent's resources
  - Parent and child share no resources
- Execution options:
  - Parent and child execute concurrently
  - Parent waits until child terminates
#### System Calls for Process Creation
| OS | System Call |
|----|-------------|
| UNIX/Linux | `fork()`, `exec()` |
| Windows | `CreateProcess()` |
**fork()** - Creates exact copy of parent process
- Returns 0 to child
- Returns child's PID to parent
- Returns -1 on error
**exec()** - Replaces process memory with new program
### Process Termination
- Process executes last statement and calls `exit()`
- Parent may terminate child using `abort()` or `kill()`
**Reasons for termination:**
- Normal completion
- Resource limits exceeded
- Memory violations
- I/O failure
- Parent request
- Parent terminated (cascading termination)
---
## Context Switching
When CPU switches from one process to another, the system must:
1. Save the state of the old process (in its PCB)
2. Load the saved state of the new process (from its PCB)
### Context Switch Overhead
- Context switch time is pure overhead (no useful work done)
- Time depends on:
  - Memory speed
  - Number of registers to copy
  - Hardware support (multiple register sets)
- Typical time: 1-1000 microseconds
---
## Inter-Process Communication (IPC)
Processes need to communicate for:
- Information sharing
- Computation speedup
- Modularity
- Convenience
### Types of Processes
1. **Independent Processes** - Cannot affect or be affected by other processes
2. **Cooperating Processes** - Can affect or be affected by other processes
### IPC Mechanisms
#### 1. Shared Memory
- Region of memory shared between processes
- Fast communication
- Requires synchronization
- Producer-Consumer problem is classic example
```c
// Shared memory example
#define BUFFER_SIZE 10
typedef struct {
    int buffer[BUFFER_SIZE];
    int in;   // Next free position
    int out;  // First full position
} shared_data;
```
#### 2. Message Passing
- Processes communicate by exchanging messages
- Two operations: `send(message)` and `receive(message)`
- Useful for distributed systems
**Communication Links:**
- Direct vs Indirect communication
- Synchronous vs Asynchronous
- Automatic vs Explicit buffering
**Direct Communication:**
```
send(P, message)    // Send to process P
receive(Q, message) // Receive from process Q
```
**Indirect Communication (Mailboxes):**
```
send(A, message)    // Send to mailbox A
receive(A, message) // Receive from mailbox A
```
#### 3. Pipes
- Unidirectional communication channel
- **Ordinary Pipes** - Parent-child communication
- **Named Pipes (FIFOs)** - No parent-child relationship required
#### 4. Sockets
- Endpoint for communication
- Identified by IP address + port number
- Used for network communication
#### 5. Signals
- Asynchronous notification to process
- Examples: SIGKILL, SIGTERM, SIGINT, SIGSEGV
---
## Process Schedulers
### Long-Term Scheduler (Job Scheduler)
- Selects processes to be brought into ready queue
- Controls degree of multiprogramming
- Executes infrequently (seconds/minutes)
- Should select good mix of I/O-bound and CPU-bound processes
### Short-Term Scheduler (CPU Scheduler)
- Selects which ready process to execute next
- Executes very frequently (milliseconds)
- Must be very fast
### Medium-Term Scheduler
- Swaps processes in/out of memory
- Reduces degree of multiprogramming
- Used in time-sharing systems
---
## Dispatcher
The dispatcher gives control of CPU to the process selected by scheduler.
**Functions:**
- Context switching
- Switching to user mode
- Jumping to proper location to resume program
**Dispatch Latency** - Time taken by dispatcher to stop one process and start another
---
## Important Interview Questions
### Q1: What is the difference between process and thread?
**A:** A process is an independent program with its own memory space, while a thread is a lightweight unit of execution within a process that shares memory with other threads of the same process.
### Q2: What happens during a fork() system call?
**A:** Fork creates a new child process that is an exact copy of the parent. Both processes continue execution from the point after fork(). The child gets return value 0, parent gets child's PID.
### Q3: What is a zombie process?
**A:** A process that has completed execution but still has an entry in the process table because its parent hasn't read its exit status using wait().
### Q4: What is an orphan process?
**A:** A process whose parent has terminated. In UNIX, orphan processes are adopted by the init process (PID 1).
### Q5: Explain the difference between preemptive and non-preemptive scheduling.
**A:** 
- **Non-preemptive:** Once CPU is allocated, process keeps it until it terminates or switches to waiting state
- **Preemptive:** OS can forcibly remove CPU from a process (e.g., time quantum expires)
---
## Key Formulas
| Metric | Formula |
|--------|---------|
| Turnaround Time (TAT) | Completion Time - Arrival Time |
| Waiting Time (WT) | Turnaround Time - Burst Time |
| Response Time | First Response - Arrival Time |
| Throughput | Number of processes / Total time |
| CPU Utilization | (CPU busy time / Total time) × 100% |
