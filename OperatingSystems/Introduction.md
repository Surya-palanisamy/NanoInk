# Introduction to Operating Systems
## What is an Operating System?
An **Operating System (OS)** is system software that manages computer hardware, software resources, and provides common services for computer programs. It acts as an intermediary between users and computer hardware.
---
## Functions of an Operating System
### 1. Process Management
- Creation and deletion of processes
- Scheduling of processes
- Synchronization and communication between processes
- Deadlock handling
### 2. Memory Management
- Allocation and deallocation of memory
- Keeping track of memory usage
- Virtual memory management
- Memory protection
### 3. File System Management
- Creation and deletion of files and directories
- Mapping files onto secondary storage
- File access control and permissions
- Backup and recovery
### 4. Device Management (I/O Management)
- Managing device drivers
- Buffering, caching, and spooling
- Device allocation and deallocation
- I/O scheduling
### 5. Security and Protection
- User authentication
- Access control mechanisms
- Protection against unauthorized access
- Encryption and data integrity
### 6. User Interface
- Command Line Interface (CLI)
- Graphical User Interface (GUI)
- Batch interface
---
## Types of Operating Systems
### 1. Batch Operating System
- Jobs are collected and processed in batches
- No user interaction during execution
- Jobs with similar requirements are batched together
- **Examples:** Payroll systems, bank statements
**Advantages:**
- Efficient for large repetitive jobs
- Reduced idle time
**Disadvantages:**
- No interaction with user
- Difficult to debug
- One job failure can stall entire batch
---
### 2. Multiprogramming Operating System
- Multiple programs loaded in memory simultaneously
- CPU switches to another program when current one waits (e.g., for I/O)
- Improves CPU utilization
- Uses job scheduling
**Key Concept:**
- When Process A waits for I/O → CPU executes Process B
- No time slicing (non-preemptive)
---
### 3. Multitasking / Time-Sharing Operating System
- Extension of multiprogramming with time slicing
- Each process gets a fixed time quantum (time slice)
- Fast context switching creates illusion of parallel execution
- Interactive system with quick response time
**Examples:** UNIX, Linux, Windows
**Advantages:**
- Quick response time
- Reduced CPU idle time
- Supports multiple users
**Disadvantages:**
- Context switching overhead
- Security concerns with multiple users
---
### 4. Multiprocessing Operating System
- Uses multiple CPUs/processors
- Parallel processing of multiple tasks
- Increased throughput and reliability
**Types:**
| Type | Description |
|------|-------------|
| **Symmetric Multiprocessing (SMP)** | All processors are equal, share memory |
| **Asymmetric Multiprocessing (AMP)** | Master-slave relationship between processors |
**Advantages:**
- High throughput
- Fault tolerance (if one CPU fails, others continue)
- Better performance for parallel tasks
---
### 5. Distributed Operating System
- Multiple independent computers connected via network
- Appear as a single coherent system to users
- Resources are shared across the network
**Examples:** LOCUS, Amoeba
**Advantages:**
- Resource sharing
- Scalability
- Fault tolerance
- Load balancing
**Disadvantages:**
- Complex to implement
- Network dependency
- Security challenges
---
### 6. Real-Time Operating System (RTOS)
- Must respond within strict time constraints
- Used in time-critical applications
- Deterministic behavior is essential
**Types:**
| Type | Description | Example |
|------|-------------|---------|
| **Hard RTOS** | Missing deadline = system failure | Pacemakers, ABS brakes, flight control |
| **Soft RTOS** | Missing deadline = degraded performance | Video streaming, gaming |
**Characteristics:**
- Minimal interrupt latency
- Predictable timing
- Priority-based scheduling
---
### 7. Network Operating System
- Provides network-related functionality
- Runs on a server, manages data and users
- Allows shared access to files, printers, etc.
**Examples:** Windows Server, Novell NetWare
---
### 8. Mobile Operating System
- Designed for mobile devices (smartphones, tablets)
- Touch-based interface
- Battery and resource optimization
**Examples:** Android, iOS, HarmonyOS
---
### 9. Embedded Operating System
- Designed for embedded systems
- Limited resources and specific functionality
- Often real-time
**Examples:** VxWorks, FreeRTOS, Embedded Linux
---
## Operating System Structure
### 1. Monolithic Structure
- All OS services run in kernel space
- Single large kernel
- **Example:** Traditional UNIX
**Pros:** Fast, efficient
**Cons:** Difficult to maintain, one bug can crash system
### 2. Layered Structure
- OS divided into layers, each built on top of lower layers
- Each layer only uses services of layer below
**Pros:** Easy to debug, modular
**Cons:** Difficult to define layers, performance overhead
### 3. Microkernel Structure
- Minimal kernel with basic functions
- Other services run in user space
- **Example:** Minix, QNX
**Pros:** Extensible, reliable, portable
**Cons:** Performance overhead due to message passing
### 4. Hybrid Structure
- Combines monolithic and microkernel approaches
- **Examples:** Windows NT, macOS
### 5. Exokernel Structure
- Minimal kernel that provides hardware abstraction
- Applications manage their own resources
- Maximum flexibility
---
## System Calls
System calls provide the interface between a process and the operating system.
### Categories of System Calls
| Category | Examples |
|----------|----------|
| **Process Control** | fork(), exec(), exit(), wait() |
| **File Management** | open(), read(), write(), close() |
| **Device Management** | ioctl(), read(), write() |
| **Information Maintenance** | getpid(), alarm(), sleep() |
| **Communication** | pipe(), shmget(), mmap() |
| **Protection** | chmod(), chown(), umask() |
### How System Calls Work
1. User program invokes system call
2. Trap/interrupt generated (mode switch: user → kernel)
3. OS identifies system call via number
4. OS executes the system call
5. Returns result to user program (mode switch: kernel → user)
---
## User Mode vs Kernel Mode
| Aspect | User Mode | Kernel Mode |
|--------|-----------|-------------|
| **Privilege Level** | Low (Ring 3) | High (Ring 0) |
| **Access** | Limited resources | Full hardware access |
| **Crash Impact** | Only process crashes | Entire system can crash |
| **Instructions** | Limited instruction set | All instructions available |
### Mode Bit
- **0** = Kernel mode
- **1** = User mode
- Hardware provides this mode bit for protection
---
## Key Interview Questions
**Q1: What is the difference between multiprogramming and multitasking?**
> Multiprogramming keeps multiple programs in memory to improve CPU utilization (no time sharing). Multitasking adds time slicing, giving each process a time quantum for interactive user experience.
**Q2: Why do we need an operating system?**
> OS manages hardware resources, provides abstraction, enables multitasking, ensures security, and provides a user interface for interaction with the computer.
**Q3: What is the difference between a program and a process?**
> A program is a passive entity (executable file on disk). A process is an active entity (program in execution with its own memory, registers, and state).
**Q4: What is a system call?**
> A system call is the programmatic way for a process to request a service from the operating system's kernel.
**Q5: Explain the difference between monolithic and microkernel architecture.**
> In monolithic architecture, all OS services run in kernel space as a single large executable. In microkernel architecture, only essential services run in kernel space while others run in user space, communicating via message passing.
---
## Summary
| OS Type | Key Feature | Example |
|---------|-------------|---------|
| Batch | Jobs processed in batches | IBM OS/360 |
| Multiprogramming | Multiple programs in memory | Early mainframes |
| Time-sharing | Time slicing for interactivity | UNIX, Linux |
| Real-time | Strict timing constraints | VxWorks, FreeRTOS |
| Distributed | Multiple computers as one | Amoeba |
| Network | Server-based resource sharing | Windows Server |
| Mobile | Touch-based, battery optimized | Android, iOS |
