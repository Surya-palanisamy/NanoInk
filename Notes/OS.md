#### What is an Operating System?

An Operating System (OS) is system software that manages computer hardware, software resources, and provides services to computer programs. It acts as an interface between user and hardware.

---

#### Types of Operating Systems

##### Batch Operating System

- Executes jobs in batches without user interaction.

- Next job starts after previous finishes.

##### Multiprogramming OS

- Multiple jobs loaded into memory.

- CPU switches when job waits (e.g., I/O).

- Improves CPU utilization.

##### Time Sharing / Multitasking OS

- Each process gets fixed CPU time slice.

- Fast switching gives multitasking illusion.

##### Multiprocessing OS

- Multiple CPUs.
- Improves throughput & reliability.

##### Multi-User OS

- Multiple users access system simultaneously.

##### Distributed OS

- Controls connected computers as a single system.

##### Network OS

- Installed on server.

- Manages users, files, security over network.

##### Real-Time OS

- Executes tasks within strict timing constraints.

- Used in embedded, defense, robotics systems.

---

#### Threads

A thread is the smallest unit of execution.

##### Features

- Has its own:

- Program counter

- Registers

- Stack

- Shares:

- Code

- Data

- Files

- Signals

##### Types of Threads

- Based on number:

- Single threaded process

- Multi threaded process

- Based on level:

- User level threads

- Kernel level threads

Examples: POSIX Threads, Java Threads, Windows Threads.

---

#### Process

A process is a **program in execution**.

##### Key Points

- Has a Program Counter (PC)

- Represented by PCB (Process Control Block)

- May contain multiple threads

##### Process States

- New

- Ready

- Running

- Waiting

- Terminated

---

#### Process Schedulers

##### #### Long-Term Scheduler

- Controls admission of processes.

- Moves from New → Ready.

##### #### Medium-Term Scheduler

- Suspends & resumes processes.

- Swap In / Swap Out.

##### #### Short-Term Scheduler

- Selects ready process for execution.

- Moves Ready → Running.

---

#### Dispatcher

Responsible for:

- Context Switching

- Saving current process state

- Loading next process

---

#### CPU Scheduling

##### Why Scheduling Needed?

- Processes alternate between CPU & I/O

- Scheduling ensures maximum CPU utilization

##### Important Terms

- Arrival Time (AT) – Time process enters ready queue

- Completion Time (CT) – Time process completes

- Burst Time (BT) – CPU required time

- Turnaround Time (TAT) = CT − AT

- Waiting Time (WT) = TAT − BT

##### Scheduling Objectives

- Max CPU utilization

- Max throughput

- Min turnaround time

- Min waiting time

- Min response time

- Fairness

---

#### CPU Scheduling Algorithms

1. First Come First Serve (FCFS)

2. Shortest Job First (SJF)

3. Shortest Remaining Time First (SRTF)

4. Round Robin (RR)

5. Priority Scheduling

6. Highest Response Ratio Next (HRRN)

---

#### Critical Section Problem

##### Components

- Critical Section → sharing resources

- Remainder Section → non-critical

- Race Condition → output depends on order

##### Requirements

- Mutual Exclusion

- Progress

- Bounded Waiting

---

#### Synchronization Tools

##### Semaphore

- Integer variable

- Controlled using atomic:

- wait()

- signal()

##### Semaphore Types

- Counting Semaphore

- Binary Semaphore

- Mutex

---

#### Deadlock

Occurs when processes wait indefinitely for resources.

##### Necessary Conditions

1. Mutual Exclusion

2. Hold and Wait

3. No Preemption

4. Circular Wait

---

#### Deadlock Handling

##### Deadlock Prevention

- Prevents one of 4 conditions.

##### Deadlock Avoidance

- Banker’s Algorithm

##### Deadlock Detection & Recovery

- Detect cycle

- Terminate / preempt

##### Deadlock Ignorance

- Ostrich Algorithm (Ignore it)

---

#### Memory Management

Memory management allocates and deallocates memory efficiently.

##### Concepts

- Physical vs Logical Address

- Paging

- Segmentation

- Fragmentation

---

#### Paging

- Physical memory → Frames

- Logical memory → Pages

- Page loaded into frame for execution

---

#### Page Replacement Algorithms

- FIFO

- Optimal

- LRU

- MRU

---

#### Virtual Memory

- Uses disk as extension of RAM

- Provides illusion of huge memory

##### Demand Paging

- Pages loaded only when needed

- Page fault triggers loading

---
