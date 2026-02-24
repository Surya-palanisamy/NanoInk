# Quick Q&A - Operating Systems Placement Interview

## A comprehensive collection of frequently asked OS interview questions for placement preparation.

## Process Management

## Q1: What is the difference between a process and a thread?

**A:**

- **Process:** Independent program with its own memory space, resources, and PCB
- **Thread:** Lightweight unit of execution within a process, shares memory with other threads
- Threads are faster to create/switch, processes are more isolated

## Q2: What are the different states of a process?

**A:**

- **New:** Being created
- **Ready:** Waiting for CPU
- **Running:** Executing on CPU
- **Waiting/Blocked:** Waiting for I/O or event
- **Terminated:** Finished execution

## Q3: What is a context switch?

**A:** The process of saving the state of a currently running process and loading the state of another process. It involves saving/restoring registers, program counter, and memory maps. Context switches are pure overhead.

## Q4: What is a zombie process?

**A:** A process that has completed execution but still has an entry in the process table because its parent hasn't called wait() to read its exit status.

## Q5: What is an orphan process?

**A:** A process whose parent has terminated. In UNIX, orphan processes are adopted by init (PID 1).

## Q6: What is PCB (Process Control Block)?

## **A:** A data structure containing all information about a process: PID, state, program counter, registers, memory info, I/O status, and scheduling info.

## CPU Scheduling

## Q7: What is the convoy effect?

**A:** In FCFS scheduling, when short processes get stuck behind a long process, leading to poor CPU utilization and high average waiting time.

## Q8: Which scheduling algorithm is optimal?

**A:** SRTF (Shortest Remaining Time First) is optimal for minimizing average waiting time. However, it's preemptive and can cause starvation.

## Q9: What is the difference between preemptive and non-preemptive scheduling?

**A:**

- **Preemptive:** OS can forcibly take CPU from running process (e.g., Round Robin, SRTF)
- **Non-preemptive:** Process keeps CPU until it completes or blocks (e.g., FCFS, SJF)

## Q10: What is starvation? How to prevent it?

**A:** When a process waits indefinitely for resources. Prevention: Use **aging** - gradually increase priority of waiting processes.

## Q11: What is turnaround time?

**A:** Total time from process arrival to completion. TAT = Completion Time - Arrival Time

## Q12: What is the ideal time quantum for Round Robin?

## **A:** Should be large enough that 80% of CPU bursts complete within one quantum. Too small = high overhead, too large = becomes FCFS.

## Process Synchronization

## Q13: What is a race condition?

**A:** When multiple processes access shared data concurrently and the final result depends on the order of execution.

## Q14: What is the critical section problem?

**A:** Ensuring mutual exclusion when multiple processes access shared resources. Solution must satisfy:

1. Mutual Exclusion
2. Progress
3. Bounded Waiting

## Q15: What is the difference between mutex and semaphore?

**A:**

- **Mutex:** Binary lock (0/1), must be released by same process that acquired it
- **Semaphore:** Can have any non-negative value, can be signaled by any process
- Mutex for mutual exclusion, semaphore for signaling and resource counting

## Q16: What is a spinlock?

**A:** A lock that uses busy waiting - process continuously checks if lock is available, wasting CPU cycles but avoiding context switch overhead.

## Q17: What is priority inversion? How to solve it?

**A:** When a high-priority process waits for a resource held by a low-priority process. Solution: **Priority inheritance** - temporarily raise the priority of the process holding the resource.

## Q18: Explain the Producer-Consumer problem.

**A:** Synchronization problem where producer adds items to a bounded buffer and consumer removes them. Needs synchronization for:

- Mutual exclusion (buffer access)
- Empty buffer (consumer waits)
- Full buffer (producer waits)

---

## Deadlocks

## Q19: What are the necessary conditions for deadlock?

**A:** All four must hold simultaneously:

1. **Mutual Exclusion** - Resource held exclusively
2. **Hold and Wait** - Process holds resource while waiting for others
3. **No Preemption** - Resources cannot be forcibly taken
4. **Circular Wait** - Circular chain of waiting processes

## Q20: What is Banker's Algorithm?

**A:** A deadlock avoidance algorithm that checks if granting a resource request will keep the system in a safe state. Uses matrices: Available, Max, Allocation, Need.

## Q21: Difference between deadlock prevention and avoidance?

**A:**

- **Prevention:** Ensure one of the four conditions never holds (static)
- **Avoidance:** Dynamically check if allocation is safe before granting (e.g., Banker's Algorithm)

## Q22: What is the difference between safe and unsafe state?

**A:**

- **Safe state:** System can guarantee completion of all processes
- **Unsafe state:** May lead to deadlock (but not guaranteed)

## Q23: What is livelock?

## **A:** Processes continuously change state in response to each other but make no progress (unlike deadlock where they're blocked).

## Memory Management

## Q24: What is the difference between logical and physical address?

**A:**

- **Logical (Virtual):** Generated by CPU, seen by program
- **Physical:** Actual location in memory
- MMU translates logical to physical addresses

## Q25: What is fragmentation? Types?

**A:**

- **Internal:** Wasted space within allocated block (fixed partitioning)
- **External:** Free memory scattered in non-contiguous blocks (variable partitioning)

## Q26: What is paging?

**A:** Memory management scheme that divides physical memory into fixed-size frames and logical memory into pages. Eliminates external fragmentation.

## Q27: What is a page table?

**A:** Data structure that maps page numbers to frame numbers. Each process has its own page table.

## Q28: What is TLB?

**A:** Translation Lookaside Buffer - a fast cache for page table entries. Reduces memory access time by avoiding page table lookup on TLB hit.

## Q29: What is segmentation?

**A:** Memory management that divides memory based on logical divisions (code, data, stack). Variable-size segments, can cause external fragmentation.

## Q30: Paging vs Segmentation?

**A:**
| Paging | Segmentation |
|--------|--------------|
| Fixed-size pages | Variable-size segments |
| Internal fragmentation | External fragmentation |
| Physical view | Logical view |
| Invisible to user | Visible to user |

---

## Virtual Memory

## Q31: What is virtual memory?

**A:** Technique that uses disk as extension of RAM, allowing programs larger than physical memory. Only needed pages are loaded (demand paging).

## Q32: What is a page fault?

**A:** Exception when process accesses a page not in physical memory. OS must load the page from disk.

## Q33: What is Belady's Anomaly?

**A:** In FIFO page replacement, increasing frame count can paradoxically increase page faults for certain reference strings.

## Q34: Which page replacement algorithm is optimal?

**A:** OPT (Optimal) - replaces page not used for longest time in future. Impossible to implement (requires future knowledge). LRU is a good approximation.

## Q35: What is thrashing?

**A:** When system spends more time paging than executing. Caused by too many processes with insufficient frames. Solution: Working set model, reduce multiprogramming.

## Q36: What is demand paging?

**A:** Pages loaded only when accessed (page fault occurs), not preloaded. Reduces initial load time and memory usage.

## Q37: What is the working set?

## **A:** Set of pages accessed by a process in a recent time window. Used to determine minimum frames needed to avoid thrashing.

## File Systems

## Q38: What is an inode?

**A:** Index node - data structure storing file metadata (owner, permissions, timestamps, block pointers) but NOT the filename.

## Q39: Difference between hard link and soft link?

**A:**

- **Hard link:** Another name pointing to same inode. File exists until all links deleted.
- **Soft (symbolic) link:** Pointer to filename. Becomes dangling if target deleted.

## Q40: What are file allocation methods?

**A:**

1. **Contiguous:** All blocks together (fast, causes fragmentation)
2. **Linked:** Blocks linked via pointers (no fragmentation, slow random access)
3. **Indexed:** Index block contains pointers (flexible, overhead for small files)

## Q41: What is journaling in file systems?

## **A:** Recording changes in a log before applying them. Enables quick recovery after crashes by replaying or rolling back incomplete transactions.

## I/O & Disk Management

## Q42: What is DMA?

**A:** Direct Memory Access - hardware that transfers data between memory and devices without CPU involvement. CPU only involved at start and completion.

## Q43: What is the difference between polling and interrupts?

**A:**

- **Polling:** CPU continuously checks device status (busy waiting)
- **Interrupts:** Device signals CPU when ready (CPU can do other work)

## Q44: What is spooling?

**A:** Simultaneous Peripheral Operations On-Line - buffering I/O for slow devices (like printers) to disk, allowing processes to continue.

## Q45: Which disk scheduling algorithm is best?

**A:**

- **LOOK/C-LOOK** for general use (good seek time, no starvation)
- **SSTF** for random access (but may cause starvation)

## Q46: What is RAID?

**A:** Redundant Array of Independent Disks - combines multiple disks for performance and/or redundancy.

- RAID 0: Striping (performance, no redundancy)
- RAID 1: Mirroring (redundancy, 50% capacity)
- RAID 5: Striping with parity (balance)

---

## System Calls

## Q47: What is a system call?

**A:** Interface for user programs to request services from the OS kernel. Causes mode switch from user mode to kernel mode.

## Q48: What happens during a system call?

**A:**

1. Trap/software interrupt triggered
2. Mode switch: User → Kernel
3. Kernel executes requested service
4. Result returned
5. Mode switch: Kernel → User

## Q49: User mode vs Kernel mode?

**A:**

- **User mode:** Restricted access, limited instructions
- **Kernel mode:** Full hardware access, all instructions allowed
- Mode bit: 0 = Kernel, 1 = User

## Q50: What is the difference between fork() and exec()?

**A:**

- **fork():** Creates copy of parent process (child)
- **exec():** Replaces current process memory with new program

---

## Quick Formulas

| Metric                | Formula                                        |
| --------------------- | ---------------------------------------------- |
| Turnaround Time (TAT) | Completion Time - Arrival Time                 |
| Waiting Time (WT)     | TAT - Burst Time                               |
| Response Time         | First Response - Arrival Time                  |
| CPU Utilization       | (Busy Time / Total Time) × 100                 |
| Throughput            | Processes / Total Time                         |
| EAT (with TLB)        | Hit × (TLB + Memory) + Miss × (TLB + 2×Memory) |
| EAT (with paging)     | (1-p) × ma + p × page_fault_time               |
| Disk Access           | Seek + Rotational Latency + Transfer           |

---

## Tips for Interviews

1. **Know the basics thoroughly** - Process vs Thread, Paging vs Segmentation
2. **Practice numerical problems** - Scheduling, page replacement, Banker's algorithm
3. **Understand trade-offs** - Every solution has pros and cons
4. **Real-world examples** - Relate concepts to actual OS behavior
5. **Be clear and structured** - Use examples to explain concepts
6. **Common follow-ups:**
   - "What are the drawbacks?"
   - "How would you optimize this?"
   - "Can you give an example?"

---

## Top 10 Most Asked Topics

1. Process vs Thread
2. Deadlock conditions and handling
3. CPU Scheduling algorithms
4. Paging and Virtual Memory
5. Page Replacement algorithms
6. Semaphores and Mutex
7. Critical Section Problem
8. Memory Management
9. System Calls
10. Disk Scheduling
