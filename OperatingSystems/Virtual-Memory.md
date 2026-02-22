# Virtual Memory
Virtual memory is a memory management technique that provides an abstraction of the storage resources available on a machine, creating the illusion of a very large (virtual) memory.
---
## What is Virtual Memory?
- Separation of logical memory from physical memory
- Only part of program needs to be in memory for execution
- Logical address space can be larger than physical address space
- Allows programs to share memory
- Enables more efficient process creation
---
## Benefits of Virtual Memory
1. **Larger Address Space** - Programs can be larger than physical memory
2. **Memory Isolation** - Each process has its own address space
3. **Memory Protection** - Pages can have read/write/execute permissions
4. **Shared Memory** - Multiple processes can share pages
5. **Efficient Memory Use** - Only needed pages are loaded
6. **Simplified Linking & Loading** - Programs start at same virtual address
---
## Virtual Address Space
```
┌─────────────────────────┐ High Address
│         Stack           │ ↓ (grows downward)
│           ↓             │
├─────────────────────────┤
│                         │
│     (Free Space)        │
│                         │
├─────────────────────────┤
│           ↑             │
│         Heap            │ ↑ (grows upward)
├─────────────────────────┤
│         BSS             │ (Uninitialized data)
├─────────────────────────┤
│         Data            │ (Initialized data)
├─────────────────────────┤
│         Text            │ (Code)
└─────────────────────────┘ Low Address (0)
```
---
## Demand Paging
A page is loaded into memory only when it is needed (demanded).
### How It Works
1. Process starts with no pages in memory
2. When process references a page not in memory → **Page Fault**
3. OS brings the required page from disk to memory
4. Process continues execution
### Page Fault Handling Steps
1. Check internal table (in PCB) to determine if reference is valid
2. If invalid → terminate process
3. If valid but not in memory → bring page in
4. Find a free frame (or use page replacement)
5. Read page from disk into frame
6. Update page table
7. Restart the instruction
```
┌──────────────┐
│   Process    │
│   requests   │
│    page      │
└──────┬───────┘
       │
       ▼
┌──────────────┐     Valid &      ┌──────────────┐
│ Check Page   │    In Memory     │   Access     │
│    Table     ├─────────────────►│    Page      │
└──────┬───────┘                  └──────────────┘
       │ Page Fault
       ▼
┌──────────────┐
│  Find Free   │
│    Frame     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Read Page   │
│  from Disk   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Update Page  │
│    Table     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Restart    │
│ Instruction  │
└──────────────┘
```
---
## Effective Access Time (EAT)
```
EAT = (1 - p) × memory_access_time + p × page_fault_time
```
Where:
- **p** = probability of page fault
- **memory_access_time** = time to access memory (~10-200 ns)
- **page_fault_time** = time to handle page fault (~8-10 ms)
### Example
- Memory access time = 200 ns
- Page fault time = 8 ms = 8,000,000 ns
- Page fault rate = 1/1000
```
EAT = (1 - 0.001) × 200 + 0.001 × 8,000,000
    = 0.999 × 200 + 8000
    = 199.8 + 8000
    = 8199.8 ns
```
Even 0.1% page fault rate slows down system by 40x!
---
## Page Replacement
When a page fault occurs and no free frame is available, we must replace an existing page.
### Page Replacement Algorithm Goals
- Minimize page faults
- Minimize disk I/O
- Consider dirty (modified) pages
### Dirty Bit (Modified Bit)
- Set when page is written to
- If dirty bit = 1, page must be written to disk before replacement
- If dirty bit = 0, page can be discarded (copy exists on disk)
---
## Page Replacement Algorithms
### 1. FIFO (First-In-First-Out)
**Concept:** Replace the oldest page in memory.
**Implementation:** Queue of pages
**Example:**
- Reference string: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3
- Frames: 3
```
7: [7, -, -] → Page Fault
0: [7, 0, -] → Page Fault
1: [7, 0, 1] → Page Fault
2: [2, 0, 1] → Page Fault (replace 7)
0: [2, 0, 1] → Hit
3: [2, 3, 1] → Page Fault (replace 0)
0: [2, 3, 0] → Page Fault (replace 1)
4: [4, 3, 0] → Page Fault (replace 2)
2: [4, 2, 0] → Page Fault (replace 3)
3: [4, 2, 3] → Page Fault (replace 0)
Total Page Faults = 9
```
**Belady's Anomaly:** More frames can lead to MORE page faults in FIFO!
---
### 2. Optimal (OPT / MIN)
**Concept:** Replace page that will not be used for longest time in future.
**Characteristics:**
- Optimal (lowest page faults)
- Impossible to implement (requires future knowledge)
- Used as benchmark for comparison
**Example:**
- Reference string: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3
- Frames: 3
```
7: [7, -, -] → Page Fault
0: [7, 0, -] → Page Fault
1: [7, 0, 1] → Page Fault
2: [2, 0, 1] → Page Fault (replace 7, used farthest)
0: [2, 0, 1] → Hit
3: [2, 0, 3] → Page Fault (replace 1)
0: [2, 0, 3] → Hit
4: [2, 4, 3] → Page Fault (replace 0)
2: [2, 4, 3] → Hit
3: [2, 4, 3] → Hit
Total Page Faults = 6
```
---
### 3. LRU (Least Recently Used)
**Concept:** Replace page that hasn't been used for longest time.
**Characteristics:**
- Good approximation of optimal
- Uses past as predictor of future
- No Belady's anomaly (stack algorithm)
- Implementation can be expensive
**Implementation Methods:**
#### Counter Implementation
- Each page has a counter
- On reference, copy clock to counter
- Replace page with smallest counter
#### Stack Implementation
- Maintain stack of page numbers
- On reference, move page to top
- Bottom of stack is LRU page
**Example:**
- Reference string: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3
- Frames: 3
```
7: [7, -, -] → Page Fault
0: [7, 0, -] → Page Fault
1: [7, 0, 1] → Page Fault
2: [2, 0, 1] → Page Fault (replace 7, LRU)
0: [2, 0, 1] → Hit
3: [2, 0, 3] → Page Fault (replace 1, LRU)
0: [2, 0, 3] → Hit
4: [4, 0, 3] → Page Fault (replace 2, LRU)
2: [4, 0, 2] → Page Fault (replace 3, LRU)
3: [4, 3, 2] → Page Fault (replace 0, LRU)
Total Page Faults = 8
```
---
### 4. LRU Approximation Algorithms
#### Reference Bit Algorithm
- Each page has reference bit (set by hardware on access)
- Periodically clear all reference bits
- Replace page with reference bit = 0
#### Second Chance (Clock) Algorithm
- FIFO with reference bit check
- If reference bit = 1, give second chance (clear bit, move to end)
- If reference bit = 0, replace page
```
        ┌───┐
   ┌────┤ 0 │◄──── Clock pointer
   │    └───┘
   │    ┌───┐
   │    │ 1 │  If ref=1, clear and advance
   │    └───┘
   │    ┌───┐
   │    │ 0 │  If ref=0, replace this page
   │    └───┘
   │    ┌───┐
   └────┤ 1 │
        └───┘
```
#### Enhanced Second Chance
Uses both reference bit and modify bit:
| (Reference, Modify) | Priority | Description |
|---------------------|----------|-------------|
| (0, 0) | Best | Not recently used, not modified |
| (0, 1) | Good | Not recently used, modified |
| (1, 0) | Fair | Recently used, not modified |
| (1, 1) | Worst | Recently used, modified |
---
### 5. MRU (Most Recently Used)
**Concept:** Replace the most recently used page.
**Use Case:** Useful when access pattern is random or when looping through large data once.
---
### 6. LFU (Least Frequently Used)
**Concept:** Replace page with lowest access count.
**Problem:** Old pages may have high count even if not used recently.
**Solution:** Decay counters over time.
---
### 7. MFU (Most Frequently Used)
**Concept:** Replace page with highest access count.
**Reasoning:** Page with lowest count was probably just brought in.
---
## Algorithm Comparison
| Algorithm | Optimal | Belady's Anomaly | Implementation |
|-----------|---------|------------------|----------------|
| FIFO | No | Yes | Easy |
| Optimal | Yes | No | Impossible |
| LRU | No (close) | No | Complex |
| Clock | No | No | Moderate |
| LFU | No | Possible | Moderate |
---
## Thrashing
**Thrashing** occurs when a system spends more time paging than executing.
### Cause
- Too many processes in memory
- Each process has fewer frames than needed
- High page fault rate
- Processes wait for pages → CPU utilization drops
- OS adds more processes → makes it worse
```
CPU Utilization
     │      ╱╲
     │     ╱  ╲
     │    ╱    ╲
     │   ╱      ╲
     │  ╱        ╲_______
     │ ╱          Thrashing
     │╱
     └───────────────────────
         Degree of Multiprogramming
```
### Solutions
1. **Working Set Model**
   - Track pages used by process in recent time window
   - Allocate enough frames for working set
   - Suspend processes if total working sets > available frames
2. **Page Fault Frequency (PFF)**
   - Monitor page fault rate
   - If rate too high → allocate more frames
   - If rate too low → remove frames
3. **Reduce Degree of Multiprogramming**
   - Suspend some processes
   - Swap out complete processes
---
## Working Set Model
**Working Set** = Set of pages used by process in last Δ time units.
**Working Set Size** = Number of pages in working set
### Parameters
- **Δ (Delta)** = Working set window
- If Δ too small → won't encompass entire locality
- If Δ too large → may include multiple localities
### Implementation
```
Total demand = Σ (Working Set Size of all processes)
If Total demand > Available frames:
    Suspend some processes (reduce multiprogramming)
```
---
## Copy-on-Write (COW)
Optimization for fork() system call:
1. Parent and child initially share all pages
2. Pages are marked as read-only
3. When either process writes to a page:
   - Page fault occurs
   - OS creates a copy of the page
   - Both processes get their own copy
**Benefits:**
- Fast process creation
- Saves memory (unchanged pages shared)
- Only copy pages that are modified
---
## Memory-Mapped Files
Map file directly to virtual address space:
```c
// Memory-mapped file example
void *addr = mmap(NULL, length, PROT_READ | PROT_WRITE, 
                  MAP_SHARED, fd, offset);
// Access file through memory
memcpy(addr, data, size);
// Unmap when done
munmap(addr, length);
```
**Benefits:**
- Simpler file I/O (read/write as memory access)
- Efficient (uses virtual memory mechanism)
- Easy file sharing between processes
---
## Important Interview Questions
### Q1: What is the difference between paging and virtual memory?
**A:** Paging is a memory management scheme that divides memory into fixed-size pages. Virtual memory is a technique that uses disk as extension of RAM, implemented using paging or segmentation.
### Q2: What is Belady's anomaly?
**A:** In FIFO page replacement, increasing the number of frames can paradoxically increase page faults for certain reference strings.
### Q3: Why is LRU considered a good algorithm?
**A:** LRU approximates optimal behavior by using past access patterns to predict future access. It doesn't suffer from Belady's anomaly.
### Q4: What is thrashing and how to prevent it?
**A:** Thrashing is when system spends more time paging than executing. Prevent it by using working set model, page fault frequency control, or reducing degree of multiprogramming.
### Q5: What is demand paging?
**A:** Demand paging loads pages into memory only when they are accessed (page fault), rather than loading entire program at start.
---
## Key Formulas
| Formula | Description |
|---------|-------------|
| EAT = (1-p)×ma + p×pf | Effective Access Time |
| Page Fault Rate = Faults / References | Probability of page fault |
| Working Set Size = Pages in window Δ | Memory requirement |
| Hit Ratio = Hits / Total References | Cache/TLB efficiency |
