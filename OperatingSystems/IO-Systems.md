# I/O Systems
I/O (Input/Output) Systems manage the communication between the computer and external devices. Understanding I/O is crucial for system performance and device management.
---
## Overview
The I/O subsystem consists of:
- **I/O Hardware** - Physical devices and their controllers
- **I/O Software** - Device drivers and OS I/O modules
- **I/O Interface** - Standard methods for device communication
---
## I/O Hardware
### Components
```
┌─────────────────────────────────────────────────────────┐
│                         CPU                             │
└──────────────────────────┬──────────────────────────────┘
                           │
                    ┌──────┴──────┐
                    │    Bus      │
                    └──────┬──────┘
          ┌────────────────┼────────────────┐
          │                │                │
    ┌─────┴─────┐    ┌─────┴─────┐    ┌─────┴─────┐
    │Controller │    │Controller │    │Controller │
    │  (Disk)   │    │ (Network) │    │ (Display) │
    └─────┬─────┘    └─────┬─────┘    └─────┬─────┘
          │                │                │
    ┌─────┴─────┐    ┌─────┴─────┐    ┌─────┴─────┐
    │   Disk    │    │    NIC    │    │  Monitor  │
    │   Drive   │    │           │    │           │
    └───────────┘    └───────────┘    └───────────┘
```
### Device Controllers
- Interface between device and computer
- Contains registers: data, status, command
- Converts serial bit stream to block of bytes
- Performs error detection/correction
### Device Registers
| Register | Purpose |
|----------|---------|
| **Data Register** | Holds data being transferred |
| **Status Register** | Device state (ready, busy, error) |
| **Command Register** | Commands for the device |
---
## I/O Communication Methods
### 1. Programmed I/O (Polling)
- CPU continuously checks device status
- CPU explicitly transfers each byte
- Simple but wastes CPU time
```
while (status != READY) {
    // Busy wait - check status
}
read_data();
```
**Characteristics:**
- CPU is busy waiting
- Simple implementation
- Inefficient for slow devices
- Used for fast, predictable devices
---
### 2. Interrupt-Driven I/O
- Device notifies CPU when ready via interrupt
- CPU can do other work while waiting
- More efficient than polling
```
┌──────────┐                    ┌──────────┐
│   CPU    │                    │  Device  │
└────┬─────┘                    └────┬─────┘
     │                               │
     │ 1. Issue I/O command ────────►│
     │                               │
     │ 2. Do other work              │
     │                               │
     │◄──────── 3. Interrupt ────────│
     │                               │
     │ 4. Handle interrupt           │
     │    Transfer data              │
     │                               │
     │ 5. Resume normal work         │
     └───────────────────────────────┘
```
**Interrupt Handling Steps:**
1. Device raises interrupt
2. CPU finishes current instruction
3. CPU acknowledges interrupt
4. CPU saves state (PC, registers)
5. CPU jumps to interrupt handler
6. Handler processes interrupt
7. CPU restores state
8. Resume interrupted process
---
### 3. Direct Memory Access (DMA)
- Specialized hardware transfers data directly to/from memory
- CPU only involved at start and end
- Best for large data transfers
```
┌──────────┐     ┌──────────┐     ┌──────────┐
│   CPU    │     │   DMA    │     │  Memory  │
│          │────►│Controller│────►│          │
└──────────┘     └────┬─────┘     └──────────┘
                      │
                      │
                ┌─────┴─────┐
                │  Device   │
                └───────────┘
```
**DMA Transfer Steps:**
1. CPU initiates DMA transfer (start address, count, direction)
2. DMA controller takes over bus
3. DMA transfers data block
4. DMA sends interrupt when complete
5. CPU handles completion
**DMA Modes:**
| Mode | Description |
|------|-------------|
| **Burst Mode** | DMA holds bus until transfer complete |
| **Cycle Stealing** | DMA takes bus for one cycle at a time |
| **Transparent** | DMA uses bus only when CPU doesn't need it |
---
## I/O Software Layers
```
┌─────────────────────────────────────────┐
│         User-Level I/O Software         │  ← User programs, libraries
├─────────────────────────────────────────┤
│    Device-Independent I/O Software      │  ← OS kernel (buffering, caching)
├─────────────────────────────────────────┤
│           Device Drivers                │  ← Device-specific code
├─────────────────────────────────────────┤
│        Interrupt Handlers               │  ← Low-level interrupt processing
├─────────────────────────────────────────┤
│              Hardware                   │  ← Physical devices
└─────────────────────────────────────────┘
```
### Device Drivers
- Software that controls specific device
- Translate OS requests to device commands
- Handle device-specific details
- Part of kernel (usually)
### Device-Independent Software
Functions:
- Uniform interface to device drivers
- Buffering
- Error reporting
- Allocating/releasing devices
- Device-independent block size
---
## Buffering
Temporary storage area for data being transferred.
### Why Buffering?
1. **Speed Mismatch** - CPU faster than I/O devices
2. **Data Size Mismatch** - Application vs device block sizes
3. **Copy Semantics** - Ensure data consistency
### Buffering Strategies
```
No Buffering:
User ←────────────────────── Device
Single Buffering:
User ←───── [Buffer] ←────── Device
Double Buffering:
User ←───── [Buffer 1] ←──── Device
            [Buffer 2] ←──── Device
            (alternating)
Circular Buffering:
User ←───── [B1][B2][B3][B4] ←── Device
            (circular queue)
```
| Strategy | Advantage | Disadvantage |
|----------|-----------|--------------|
| Single | Simple | Blocking |
| Double | Overlap I/O and processing | More memory |
| Circular | High throughput | Complex management |
---
## Caching
Keeping copies of frequently accessed data in fast storage.
### Cache vs Buffer
| Buffer | Cache |
|--------|-------|
| Holds only existing copy | Holds copy of data from elsewhere |
| For speed matching | For faster access |
| May be only copy | Original always exists |
### Disk Cache
- RAM used to cache disk blocks
- Read cache: Recently read blocks
- Write cache: Blocks waiting to be written
---
## Spooling
**Simultaneous Peripheral Operations On-Line**
- Buffering for slow, non-sharable devices
- Classic example: Print spooling
```
┌─────────┐     ┌────────────┐     ┌─────────┐
│ Process │────►│   Spool    │────►│ Printer │
│   1     │     │   Queue    │     │         │
├─────────┤     │ (on disk)  │     │         │
│ Process │────►│            │     │         │
│   2     │     └────────────┘     └─────────┘
├─────────┤
│ Process │
│   3     │
└─────────┘
```
**Benefits:**
- Allows concurrent access to non-sharable device
- Process doesn't wait for slow device
- Print order management
---
## I/O Scheduling
### Disk Scheduling
Order in which disk I/O requests are serviced.
**Goals:**
- Minimize seek time
- Maximize throughput
- Fair access
*See Disk-Management.md for detailed disk scheduling algorithms*
---
## Blocking vs Non-Blocking I/O
### Blocking (Synchronous)
- Process waits until I/O completes
- Simple programming model
- Process is suspended
```c
// Blocking read
int n = read(fd, buffer, size);  // Waits here until data available
process_data(buffer);
```
### Non-Blocking (Asynchronous)
- I/O call returns immediately
- Process continues execution
- Must check for completion later
```c
// Non-blocking read
int n = read(fd, buffer, size);  // Returns immediately
if (n == -1 && errno == EAGAIN) {
    // Data not ready, do something else
} else {
    process_data(buffer);
}
```
### Comparison
| Aspect | Blocking | Non-Blocking |
|--------|----------|--------------|
| Waiting | Yes | No |
| Complexity | Simple | Complex |
| Responsiveness | Low | High |
| Use Case | Simple apps | Servers, GUIs |
---
## Kernel I/O Subsystem
### I/O Scheduling
- Reorder requests to improve performance
- Fairness considerations
### Error Handling
- Retry transient failures
- Report errors to applications
- Log errors for diagnosis
### Protection
- Prevent unauthorized access
- Validate I/O parameters
- Memory protection during DMA
### Power Management
- Device standby/hibernation
- Wake-on-demand
- Power-aware scheduling
---
## Device Types
### Block Devices
- Data accessed in fixed-size blocks
- Random access possible
- Examples: HDD, SSD, USB drives
- Commands: read, write, seek
### Character Devices
- Data accessed as stream of characters
- Sequential access
- Examples: Keyboard, mouse, serial ports
- Commands: get, put
### Network Devices
- Neither block nor character
- Special handling via sockets
- Examples: Ethernet, WiFi adapters
### Clock and Timer Devices
- Maintain current time
- Generate interrupts at intervals
- Examples: System clock, hardware timers
---
## I/O Performance
### Factors Affecting Performance
1. **Device Speed** - Transfer rate of hardware
2. **CPU Speed** - Interrupt handling, driver processing
3. **Memory Speed** - DMA transfer rates
4. **Bus Speed** - Data path bandwidth
5. **Software Overhead** - Context switches, copying
### Performance Metrics
| Metric | Description |
|--------|-------------|
| **Throughput** | Data transferred per unit time |
| **Latency** | Time to complete I/O request |
| **IOPS** | I/O operations per second |
| **Utilization** | Percentage of time device is busy |
### Improving I/O Performance
1. Reduce number of context switches
2. Reduce data copying
3. Use DMA for large transfers
4. Use polling for fast, predictable devices
5. Balance between polling and interrupts
6. Use efficient data structures
---
## Important Interview Questions
### Q1: What is the difference between programmed I/O and DMA?
**A:** In programmed I/O, CPU transfers each byte and waits for device. In DMA, a specialized controller transfers data directly to/from memory, freeing the CPU for other work.
### Q2: Why is DMA more efficient than interrupt-driven I/O for large transfers?
**A:** Interrupt-driven I/O generates an interrupt for each byte/word, causing high overhead. DMA transfers entire blocks with only one interrupt at completion.
### Q3: What is the purpose of buffering?
**A:** Buffering handles speed mismatches between producer and consumer, allows asynchronous operation, and provides copy semantics for data consistency.
### Q4: Explain the difference between blocking and non-blocking I/O.
**A:** Blocking I/O suspends the process until operation completes. Non-blocking I/O returns immediately, allowing the process to continue and check for completion later.
### Q5: What is spooling?
**A:** Spooling is using a disk buffer to hold output for a non-sharable device like a printer, allowing multiple processes to "print" simultaneously by queuing their output.
---
## Key Takeaways
1. **Three I/O methods**: Polling (simple, wastes CPU), Interrupts (efficient, some overhead), DMA (best for large transfers)
2. **Layered architecture**: Hardware → Drivers → Device-independent software → User libraries
3. **Buffering** solves speed mismatch and enables asynchronous operation
4. **Block devices** support random access; **character devices** are sequential
5. **Performance** depends on minimizing copying, context switches, and using appropriate I/O method
