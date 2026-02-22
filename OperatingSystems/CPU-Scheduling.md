# CPU Scheduling
CPU Scheduling is the process of determining which process will own the CPU for execution while another process is on hold. It is a fundamental function of the operating system.
---
## Why CPU Scheduling?
- Processes alternate between **CPU bursts** and **I/O bursts**
- While one process waits for I/O, CPU can execute another process
- Maximizes CPU utilization and system throughput
- Ensures fair resource allocation among processes
---
## Important Terminology
| Term | Definition |
|------|------------|
| **Arrival Time (AT)** | Time when process enters the ready queue |
| **Burst Time (BT)** | Total CPU time required by the process |
| **Completion Time (CT)** | Time when process finishes execution |
| **Turnaround Time (TAT)** | CT - AT (Total time from arrival to completion) |
| **Waiting Time (WT)** | TAT - BT (Time spent waiting in ready queue) |
| **Response Time (RT)** | Time from arrival to first CPU allocation |
| **Throughput** | Number of processes completed per unit time |
---
## Scheduling Objectives
1. **Maximize CPU Utilization** – Keep CPU as busy as possible
2. **Maximize Throughput** – Complete more processes per time unit
3. **Minimize Turnaround Time** – Reduce total time for process execution
4. **Minimize Waiting Time** – Reduce time spent in ready queue
5. **Minimize Response Time** – Quick response for interactive systems
6. **Fairness** – Each process gets fair share of CPU
---
## Types of Scheduling
### Preemptive Scheduling
- Running process can be interrupted and moved to ready queue
- CPU can be taken away from a process
- Examples: Round Robin, SRTF, Priority (Preemptive)
- Better for time-sharing systems
### Non-Preemptive Scheduling
- Once CPU is allocated, process runs until completion or I/O wait
- CPU cannot be taken away from running process
- Examples: FCFS, SJF, Priority (Non-Preemptive)
- Simpler to implement
---
## CPU Scheduling Algorithms
### 1. First Come First Serve (FCFS)
**Concept:** Processes are executed in the order they arrive.
**Characteristics:**
- Non-preemptive
- Simple to implement using FIFO queue
- Poor average waiting time (especially if long process arrives first)
- **Convoy Effect**: Short processes wait behind long ones
**Example:**
| Process | AT | BT |
|---------|----|----|
| P1 | 0 | 24 |
| P2 | 1 | 3 |
| P3 | 2 | 3 |
**Gantt Chart:** `| P1 (0-24) | P2 (24-27) | P3 (27-30) |`
**Calculations:**
- P1: TAT = 24-0 = 24, WT = 24-24 = 0
- P2: TAT = 27-1 = 26, WT = 26-3 = 23
- P3: TAT = 30-2 = 28, WT = 28-3 = 25
- Average WT = (0+23+25)/3 = 16
---
### 2. Shortest Job First (SJF)
**Concept:** Process with smallest burst time executes first.
**Characteristics:**
- Non-preemptive
- Optimal average waiting time for non-preemptive algorithms
- Difficult to know burst time in advance
- May cause **starvation** for longer processes
**Example:**
| Process | AT | BT |
|---------|----|----|
| P1 | 0 | 7 |
| P2 | 2 | 4 |
| P3 | 4 | 1 |
| P4 | 5 | 4 |
**Execution Order (after P1):** P3 → P2 → P4
---
### 3. Shortest Remaining Time First (SRTF)
**Concept:** Preemptive version of SJF. Process with shortest remaining time executes.
**Characteristics:**
- Preemptive
- Most optimal algorithm (minimum average WT)
- High context switching overhead
- Starvation possible for long processes
**Example:**
| Process | AT | BT |
|---------|----|----|
| P1 | 0 | 8 |
| P2 | 1 | 4 |
| P3 | 2 | 2 |
| P4 | 3 | 1 |
**Gantt Chart:** `| P1(0-1) | P2(1-2) | P3(2-3) | P4(3-4) | P3(4-5) | P2(5-8) | P1(8-15) |`
---
### 4. Round Robin (RR)
**Concept:** Each process gets a fixed time quantum. After quantum expires, process moves to end of ready queue.
**Characteristics:**
- Preemptive
- Fair allocation of CPU
- Performance depends on time quantum size
- No starvation
- Higher context switching overhead
**Time Quantum Selection:**
- Too small → High context switching overhead
- Too large → Becomes FCFS
- Ideal: 80% of CPU bursts should be shorter than quantum
**Example (Time Quantum = 4):**
| Process | AT | BT |
|---------|----|----|
| P1 | 0 | 5 |
| P2 | 1 | 4 |
| P3 | 2 | 2 |
| P4 | 3 | 1 |
**Gantt Chart:** `| P1(0-4) | P2(4-8) | P3(8-10) | P4(10-11) | P1(11-12) |`
---
### 5. Priority Scheduling
**Concept:** Each process has a priority. Higher priority processes execute first.
**Types:**
- **Preemptive**: Running process can be preempted if higher priority arrives
- **Non-Preemptive**: Running process completes before higher priority gets CPU
**Priority Assignment:**
- Lower number = Higher priority (common convention)
- Can be static or dynamic
**Problem: Starvation**
- Low priority processes may never execute
**Solution: Aging**
- Gradually increase priority of waiting processes
**Example:**
| Process | AT | BT | Priority |
|---------|----|----|----------|
| P1 | 0 | 10 | 3 |
| P2 | 0 | 1 | 1 |
| P3 | 0 | 2 | 4 |
| P4 | 0 | 1 | 5 |
| P5 | 0 | 5 | 2 |
**Execution Order:** P2 → P5 → P1 → P3 → P4
---
### 6. Highest Response Ratio Next (HRRN)
**Concept:** Non-preemptive algorithm that considers both waiting time and burst time.
**Response Ratio Formula:**
```
Response Ratio = (Waiting Time + Burst Time) / Burst Time
```
**Characteristics:**
- Non-preemptive
- Balances between SJF and FCFS
- Prevents starvation (long waiting increases ratio)
- Fair to both short and long processes
---
### 7. Multilevel Queue Scheduling
**Concept:** Ready queue is divided into multiple queues based on process properties.
**Example Queues:**
1. System processes (highest priority)
2. Interactive processes
3. Batch processes (lowest priority)
**Characteristics:**
- Each queue has its own scheduling algorithm
- Processes stay in assigned queue permanently
- Scheduling between queues (usually priority-based)
---
### 8. Multilevel Feedback Queue Scheduling
**Concept:** Processes can move between queues based on behavior and aging.
**Characteristics:**
- Most flexible scheduling algorithm
- Processes move to lower queue if they use full quantum
- I/O bound processes stay in higher queues
- Prevents starvation through aging
**Parameters:**
- Number of queues
- Scheduling algorithm for each queue
- Method to upgrade/demote processes
- Method to determine initial queue
---
## Algorithm Comparison
| Algorithm | Preemptive | Starvation | Convoy Effect | Overhead |
|-----------|------------|------------|---------------|----------|
| FCFS | No | No | Yes | Low |
| SJF | No | Yes | No | Low |
| SRTF | Yes | Yes | No | High |
| Round Robin | Yes | No | No | High |
| Priority | Both | Yes | No | Medium |
| HRRN | No | No | No | Medium |
---
## Special Scheduling Scenarios
### Real-Time Scheduling
**Hard Real-Time:**
- Deadlines MUST be met
- Used in critical systems (medical, aviation)
**Soft Real-Time:**
- Deadlines are preferred but not mandatory
- Used in multimedia, gaming
**Algorithms:**
- **Rate Monotonic (RM)**: Static priority based on period
- **Earliest Deadline First (EDF)**: Dynamic priority based on deadline
---
### Thread Scheduling
**User-Level Threads:**
- Thread library manages scheduling
- OS schedules processes, not threads
**Kernel-Level Threads:**
- OS directly schedules threads
- More efficient for multi-core systems
---
## Placement Interview Questions
**Q1: Which scheduling algorithm is optimal?**
> SRTF is optimal for minimizing average waiting time.
**Q2: What is convoy effect?**
> When short processes wait behind a long process in FCFS, leading to poor CPU utilization.
**Q3: How to prevent starvation in Priority Scheduling?**
> Use aging technique - gradually increase priority of waiting processes.
**Q4: What is the ideal time quantum for Round Robin?**
> Should be such that 80% of CPU bursts complete within one quantum.
**Q5: Difference between preemptive and non-preemptive scheduling?**
> Preemptive allows CPU to be taken from running process; non-preemptive doesn't.
**Q6: What is turnaround time?**
> Total time from process arrival to completion (TAT = CT - AT).
---
## Practice Problem
**Given:**
| Process | AT | BT |
|---------|----|----|
| P1 | 0 | 5 |
| P2 | 1 | 3 |
| P3 | 2 | 8 |
| P4 | 3 | 6 |
**Calculate average waiting time for FCFS, SJF, and RR (quantum=2).**
<details>
<summary>Solution</summary>
**FCFS:** Average WT = (0 + 4 + 6 + 11) / 4 = 5.25
**SJF:** Average WT = (0 + 4 + 14 + 5) / 4 = 5.75
**RR (q=2):** Average WT = (9 + 5 + 14 + 11) / 4 = 9.75
</details>
---
## Key Takeaways
1. **FCFS** is simple but suffers from convoy effect
2. **SJF/SRTF** are optimal but can cause starvation
3. **Round Robin** is fair and good for time-sharing
4. **Priority** needs aging to prevent starvation
5. **Multilevel Feedback Queue** is most flexible
6. Choice of algorithm depends on system requirements
