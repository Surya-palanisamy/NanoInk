# Deadlocks

A deadlock is a situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process.

---

## What is Deadlock?

In a deadlock, processes never finish executing, and system resources are tied up, preventing other jobs from starting.

## Real-Life Example

Consider a narrow bridge that can only allow traffic in one direction. If two cars enter from opposite ends, neither can proceed - this is a deadlock.

---

## Necessary Conditions for Deadlock

All four conditions must hold simultaneously for a deadlock to occur (Coffman Conditions):

## 1. Mutual Exclusion

- At least one resource must be held in a non-sharable mode
- Only one process can use the resource at a time
- If another process requests it, it must wait

## 2. Hold and Wait

- A process holding at least one resource is waiting to acquire additional resources
- Resources held by other processes

## 3. No Preemption

- Resources cannot be forcibly taken away from a process
- Resources can only be released voluntarily by the process

## 4. Circular Wait

- A circular chain of processes exists
- Each process holds a resource needed by the next process in the chain
- P1 → P2 → P3 → ... → Pn → P1

---

## Resource Allocation Graph (RAG)

A directed graph to describe deadlocks:

## Components

- **Process nodes**: Circles (P1, P2, ...)
- **Resource nodes**: Rectangles (R1, R2, ...)
- **Request edge**: P → R (process requesting resource)
- **Assignment edge**: R → P (resource assigned to process)

### Example

```
     ┌────┐         ┌────┐
     │ P1 │ ───────►│ R1 │
     └────┘         └────┘
        ▲              │
        │              │
        │              ▼
     ┌────┐         ┌────┐
     │ R2 │◄─────── │ P2 │
     └────┘         └────┘
```

## Deadlock Detection using RAG

- **Single instance resources**: Cycle in graph = Deadlock
- **Multiple instance resources**: Cycle may or may not indicate deadlock

---

## Deadlock Handling Strategies

## 1. Deadlock Prevention

Ensure at least one of the four necessary conditions cannot hold.

#### Eliminate Mutual Exclusion

- Make resources sharable (not always possible)
- Example: Read-only files can be shared

#### Eliminate Hold and Wait

- **Option 1**: Request all resources before execution begins
- **Option 2**: Request resources only when holding none
- **Disadvantage**: Low resource utilization, starvation possible

#### Eliminate No Preemption

- If a process cannot get all resources, release what it holds
- Preempt resources from waiting processes
- **Applicable to**: CPU registers, memory
- **Not applicable to**: Printers, tape drives

#### Eliminate Circular Wait

- Impose total ordering on resource types
- Request resources in increasing order of enumeration
- Example: If R1 < R2 < R3, must request in that order

---

## 2. Deadlock Avoidance

System has advance information about resource needs. Uses this to decide if requests should wait.

#### Safe State

A state is **safe** if system can allocate resources to each process in some order and still avoid deadlock.

```
Safe State → No Deadlock (guaranteed)
Unsafe State → Possible Deadlock (not guaranteed)
```

#### Safe Sequence

An ordering of processes <P1, P2, ..., Pn> where for each Pi, the resources that Pi needs can be satisfied by:

- Currently available resources, plus
- Resources held by all Pj (where j < i)

---

## Banker's Algorithm

Used for deadlock avoidance with multiple instances of resources.

#### Data Structures

For n processes and m resource types:
| Structure | Size | Description |
|-----------|------|-------------|
| **Available** | m | Available instances of each resource |
| **Max** | n × m | Maximum demand of each process |
| **Allocation** | n × m | Currently allocated to each process |
| **Need** | n × m | Remaining need (Max - Allocation) |

#### Safety Algorithm

```
1. Initialize:
   Work = Available
   Finish[i] = false for all i
2. Find process i such that:
   Finish[i] = false AND Need[i] ≤ Work
   If no such i exists, go to step 4
3. Work = Work + Allocation[i]
   Finish[i] = true
   Go to step 2
4. If Finish[i] = true for all i, system is in safe state
```

#### Resource Request Algorithm

When process Pi requests resources Request[i]:

```
1. If Request[i] > Need[i], raise error (exceeded max claim)
2. If Request[i] > Available, Pi must wait
3. Pretend to allocate:
   Available = Available - Request[i]
   Allocation[i] = Allocation[i] + Request[i]
   Need[i] = Need[i] - Request[i]
4. Run Safety Algorithm:
   If safe → Allocate resources
   If unsafe → Restore old state, Pi waits
```

#### Banker's Algorithm Example

**Given:**
| Process | Allocation (A,B,C) | Max (A,B,C) | Available (A,B,C) |
|---------|-------------------|-------------|-------------------|
| P0 | 0,1,0 | 7,5,3 | 3,3,2 |
| P1 | 2,0,0 | 3,2,2 | |
| P2 | 3,0,2 | 9,0,2 | |
| P3 | 2,1,1 | 2,2,2 | |
| P4 | 0,0,2 | 4,3,3 | |
**Calculate Need:**
| Process | Need (A,B,C) |
|---------|--------------|
| P0 | 7,4,3 |
| P1 | 1,2,2 |
| P2 | 6,0,0 |
| P3 | 0,1,1 |
| P4 | 4,3,1 |
**Safe Sequence:** P1 → P3 → P4 → P2 → P0

---

## 3. Deadlock Detection & Recovery

Allow deadlocks to occur, then detect and recover.

#### Detection Algorithm (Single Instance)

- Maintain wait-for graph
- Periodically check for cycles
- Cycle = Deadlock

#### Detection Algorithm (Multiple Instances)

Similar to Banker's Algorithm but:

- Use current requests instead of maximum needs
- Check if any process can finish

#### When to Invoke Detection?

- On every resource request (expensive)
- Periodically (e.g., every hour)
- When CPU utilization drops below threshold

## Recovery from Deadlock

#### Process Termination

1. **Abort all deadlocked processes**
   - Expensive but simple
2. **Abort one process at a time**
   - Check if deadlock still exists after each termination
   - Factors for selection:
     - Priority of process
     - How long process has computed
     - How much longer to completion
     - Resources process has used
     - Resources process needs to complete
     - Number of processes to terminate

#### Resource Preemption

- **Selecting a victim**: Choose process to preempt resources from
- **Rollback**: Return process to safe state
- **Starvation**: Ensure same process isn't always selected (use cost factors)

---

## 4. Deadlock Ignorance (Ostrich Algorithm)

- Pretend deadlocks never happen
- Used when:
  - Deadlocks are rare
  - Cost of prevention/detection is high
  - System can be rebooted if deadlock occurs
- Used in most general-purpose OS (Windows, Linux)

---

## Comparison of Strategies

| Strategy   | Approach                | Overhead       | Resource Utilization |
| ---------- | ----------------------- | -------------- | -------------------- |
| Prevention | Restrict requests       | None           | Low                  |
| Avoidance  | Check before allocation | Moderate       | Moderate             |
| Detection  | Allow, then fix         | Periodic check | High                 |
| Ignorance  | Do nothing              | None           | High                 |

---

## Livelock vs Deadlock

| Deadlock                           | Livelock                                                        |
| ---------------------------------- | --------------------------------------------------------------- |
| Processes are blocked              | Processes are not blocked                                       |
| No state change                    | States change continuously                                      |
| Processes wait indefinitely        | Processes keep responding without progress                      |
| Example: Two cars on narrow bridge | Example: Two people in hallway stepping aside in same direction |

---

## Starvation vs Deadlock

| Deadlock                   | Starvation                                 |
| -------------------------- | ------------------------------------------ |
| Multiple processes blocked | Single process may starve                  |
| Circular wait exists       | No circular wait                           |
| Resources are held         | Resources may be available but not granted |
| All four conditions needed | Can occur without all conditions           |

---
