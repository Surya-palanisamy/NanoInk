# Disk Management
Disk management involves the organization, allocation, and scheduling of disk storage to optimize performance and reliability.
---
## Disk Structure
### Physical Structure
```
                    ┌─────── Spindle
                    │
            ┌───────┴───────┐
            │    Platter    │ ◄── Magnetic disk surface
            │   ┌───────┐   │
            │   │       │   │
            │   │   •   │   │ ◄── Track (concentric circle)
            │   │       │   │
            │   └───────┘   │
            └───────────────┘
                    │
                    ▼
              Read/Write Head
                    │
              Disk Arm (Actuator)
```
### Key Components
| Component | Description |
|-----------|-------------|
| **Platter** | Circular magnetic disk surface |
| **Track** | Concentric circle on platter surface |
| **Sector** | Smallest unit of storage on a track |
| **Cylinder** | Same track on all platters |
| **Head** | Read/write mechanism |
| **Arm** | Moves heads across platters |
---
## Disk Access Time
Total time to read/write data:
```
Access Time = Seek Time + Rotational Latency + Transfer Time
```
| Component | Description | Typical Value |
|-----------|-------------|---------------|
| **Seek Time** | Time to move head to correct track | 3-15 ms |
| **Rotational Latency** | Time for sector to rotate under head | 2-6 ms |
| **Transfer Time** | Time to transfer data | < 1 ms |
### Formulas
```
Average Rotational Latency = 1 / (2 × RPM) × 60 seconds
Transfer Time = Data Size / Transfer Rate
```
**Example:**
- Disk speed: 7200 RPM
- Average rotational latency = (1/2) × (60/7200) = 4.17 ms
---
## Disk Scheduling Algorithms
Disk scheduling determines the order in which disk I/O requests are serviced.
### Goals
1. Minimize seek time
2. Maximize throughput
3. Ensure fairness
4. Minimize response time variance
---
### 1. FCFS (First Come First Serve)
**Concept:** Service requests in arrival order.
**Example:**
- Initial head position: 53
- Request queue: 98, 183, 37, 122, 14, 124, 65, 67
```
Head movement: 53 → 98 → 183 → 37 → 122 → 14 → 124 → 65 → 67
Total seek = |53-98| + |98-183| + |183-37| + |37-122| + 
             |122-14| + |14-124| + |124-65| + |65-67|
           = 45 + 85 + 146 + 85 + 108 + 110 + 59 + 2
           = 640 cylinders
```
**Pros:** Simple, fair
**Cons:** Poor performance, high seek time
---
### 2. SSTF (Shortest Seek Time First)
**Concept:** Service request closest to current head position.
**Example:**
- Initial head position: 53
- Request queue: 98, 183, 37, 122, 14, 124, 65, 67
```
Order: 53 → 65 → 67 → 37 → 14 → 98 → 122 → 124 → 183
Total seek = 12 + 2 + 30 + 23 + 84 + 24 + 2 + 59 = 236 cylinders
```
**Pros:** Better than FCFS
**Cons:** Starvation possible for far requests
---
### 3. SCAN (Elevator Algorithm)
**Concept:** Head moves in one direction servicing requests, then reverses.
**Example:**
- Initial head position: 53, moving towards 0
- Request queue: 98, 183, 37, 122, 14, 124, 65, 67
```
Direction: Towards 0 first
Order: 53 → 37 → 14 → 0 → 65 → 67 → 98 → 122 → 124 → 183
Total seek = 16 + 23 + 14 + 65 + 2 + 31 + 24 + 2 + 59 = 236 cylinders
```
**Pros:** No starvation, uniform wait time
**Cons:** Requests at edges wait longer
---
### 4. C-SCAN (Circular SCAN)
**Concept:** Head moves in one direction only, then jumps back to start.
```
Direction: Towards 199 (disk end)
Order: 53 → 65 → 67 → 98 → 122 → 124 → 183 → 199 → 0 → 14 → 37
Total seek = 12 + 2 + 31 + 24 + 2 + 59 + 16 + 199 + 14 + 23 = 382 cylinders
(Jump from 199 to 0 not counted in some versions)
```
**Pros:** More uniform wait time than SCAN
**Cons:** More head movement
---
### 5. LOOK
**Concept:** Like SCAN but head only goes as far as last request in each direction.
```
Direction: Towards 0 first
Order: 53 → 37 → 14 → 65 → 67 → 98 → 122 → 124 → 183
(Doesn't go to 0, stops at 14)
```
**Pros:** Less head movement than SCAN
---
### 6. C-LOOK (Circular LOOK)
**Concept:** Like C-SCAN but only goes to last request, not disk end.
```
Direction: Towards high end
Order: 53 → 65 → 67 → 98 → 122 → 124 → 183 → 14 → 37
(Jumps from 183 to 14, skipping 0 and 199)
```
**Pros:** Most efficient for uniform access patterns
---
## Algorithm Comparison
| Algorithm | Seek Time | Starvation | Variance |
|-----------|-----------|------------|----------|
| FCFS | High | No | High |
| SSTF | Low | Yes | Medium |
| SCAN | Medium | No | Medium |
| C-SCAN | Medium | No | Low |
| LOOK | Lower | No | Medium |
| C-LOOK | Lowest | No | Low |
---
## RAID (Redundant Array of Independent Disks)
RAID combines multiple physical disks into a logical unit for performance and/or redundancy.
### RAID Levels
#### RAID 0 (Striping)
```
Disk 1: A1 | A3 | A5 | A7
Disk 2: A2 | A4 | A6 | A8
```
- **Data:** Striped across disks
- **Redundancy:** None
- **Performance:** Highest (parallel read/write)
- **Capacity:** 100% (N disks)
- **Risk:** Any disk failure = all data lost
---
#### RAID 1 (Mirroring)
```
Disk 1: A1 | A2 | A3 | A4
Disk 2: A1 | A2 | A3 | A4  (copy)
```
- **Data:** Mirrored on two disks
- **Redundancy:** Full copy
- **Performance:** Read improved, write same
- **Capacity:** 50% (N/2 usable)
- **Fault Tolerance:** Survives 1 disk failure
---
#### RAID 5 (Striping with Distributed Parity)
```
Disk 1: A1 | A4 | A7 | Pb
Disk 2: A2 | A5 | Pa | A10
Disk 3: A3 | Pc | A8 | A11
```
- **Data:** Striped with parity distributed
- **Redundancy:** Parity information
- **Performance:** Good read, slower write
- **Capacity:** (N-1) disks
- **Fault Tolerance:** Survives 1 disk failure
- **Minimum Disks:** 3
---
#### RAID 6 (Striping with Double Parity)
```
Disk 1: A1 | A4 | Pa | Qb
Disk 2: A2 | Pb | A7 | A10
Disk 3: A3 | Qa | A8 | A11
Disk 4: Pa | A5 | A9 | Pc
```
- **Fault Tolerance:** Survives 2 disk failures
- **Capacity:** (N-2) disks
- **Minimum Disks:** 4
---
#### RAID 10 (1+0, Mirrored Stripes)
```
       ┌─────────────┐
       │   RAID 0    │
       │  (Stripe)   │
       └──────┬──────┘
              │
    ┌─────────┴─────────┐
    │                   │
┌───┴───┐           ┌───┴───┐
│RAID 1 │           │RAID 1 │
│Mirror │           │Mirror │
└───┬───┘           └───┬───┘
    │                   │
  ┌─┴─┐               ┌─┴─┐
  D1  D2              D3  D4
```
- **Combines:** RAID 0 + RAID 1
- **Performance:** Best for read/write
- **Capacity:** 50%
- **Fault Tolerance:** Can lose 1 disk per mirror
---
### RAID Comparison
| RAID | Min Disks | Capacity | Fault Tolerance | Performance |
|------|-----------|----------|-----------------|-------------|
| 0 | 2 | 100% | None | Highest |
| 1 | 2 | 50% | 1 disk | Good read |
| 5 | 3 | (N-1)/N | 1 disk | Good |
| 6 | 4 | (N-2)/N | 2 disks | Moderate |
| 10 | 4 | 50% | 1 per mirror | Best |
---
## Disk Formatting
### Low-Level (Physical) Formatting
- Divides disk into sectors
- Creates sector headers and trailers
- Done at factory
- Sets up error-correcting codes (ECC)
### Partitioning
- Divides disk into logical regions
- Each partition treated as separate disk
- Partition table stored in first sector
### High-Level (Logical) Formatting
- Creates file system structures
- Sets up root directory
- Initializes free space management
---
## Boot Process
1. **BIOS/UEFI** executes from ROM
2. Reads **MBR/GPT** from first disk sector
3. **Boot loader** (GRUB, Windows Boot Manager) loads
4. Boot loader loads **OS kernel**
5. Kernel initializes and starts services
### MBR vs GPT
| Feature | MBR | GPT |
|---------|-----|-----|
| Max disk size | 2 TB | 9.4 ZB |
| Max partitions | 4 primary | 128 |
| Redundancy | None | Backup at disk end |
| Boot mode | BIOS | UEFI |
---
## Swap Space Management
Swap space is disk area used as virtual memory extension.
### Uses
- Store inactive pages
- Enable larger programs than physical RAM
- Handle memory pressure
### Allocation Methods
1. **Swap partition:** Dedicated disk partition
2. **Swap file:** File on regular file system
### Linux Commands
```bash
# View swap status
swapon --show
free -h
# Create swap file
dd if=/dev/zero of=/swapfile bs=1G count=4
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
```
---
## Important Interview Questions
### Q1: What is the difference between SCAN and C-SCAN?
**A:** SCAN reverses direction at disk ends, servicing requests both ways. C-SCAN only services in one direction, jumping back to start without servicing (provides more uniform wait times).
### Q2: Why is SSTF not always used?
**A:** SSTF can cause starvation for requests far from current head position if new nearby requests keep arriving.
### Q3: What is the purpose of RAID?
**A:** RAID provides data redundancy (protection against disk failure) and/or performance improvement by combining multiple disks.
### Q4: Difference between RAID 0 and RAID 1?
**A:** RAID 0 stripes data for performance but has no redundancy. RAID 1 mirrors data for redundancy with 50% capacity.
### Q5: What is seek time?
**A:** Seek time is the time required to move the disk head to the correct track/cylinder.
---
## Quick Reference
```
Disk Access Time = Seek + Rotational Latency + Transfer
Algorithm preference:
├── General: LOOK or C-LOOK
├── Random access: SSTF
└── Uniform workload: C-SCAN
RAID selection:
├── Performance only: RAID 0
├── Redundancy only: RAID 1
├── Balance: RAID 5
├── Critical data: RAID 6 or RAID 10
```
