# System Calls

System calls provide the interface between a running program and the operating system. They are the primary way for user programs to request services from the kernel.

## What is a System Call?

- A programmatic way to request services from the OS kernel
- Provides a controlled entry point into the kernel
- Allows user programs to access hardware and system resources safely
- Acts as a bridge between user mode and kernel mode

---

## How System Calls Work

## Execution Flow

```
User Application
       │
       │ 1. Makes system call (e.g., read())
       ▼
┌──────────────────┐
│   Library Call   │  (e.g., libc wrapper)
│   (User Mode)    │
└────────┬─────────┘
         │ 2. Trap instruction / Software interrupt
         ▼
┌──────────────────┐
│   Mode Switch    │  User Mode → Kernel Mode
│   (Hardware)     │
└────────┬─────────┘
         │ 3. System call handler
         ▼
┌──────────────────┐
│   Kernel        │
│   (Kernel Mode)  │  4. Execute system call
└────────┬─────────┘
         │ 5. Return result
         ▼
┌──────────────────┐
│   Mode Switch    │  Kernel Mode → User Mode
│   (Hardware)     │
└────────┬─────────┘
         │
         ▼
   User Application (continues)
```

## Steps in Detail

1. **User program invokes system call** (via library function)
2. **Arguments are placed** in registers or on stack
3. **Trap instruction executes** (software interrupt)
4. **Hardware switches to kernel mode**
5. **System call number identifies the service**
6. **Kernel executes the appropriate handler**
7. **Result is placed in register**
8. **Control returns to user program**

---

## System Call Interface

## System Call Number

Each system call has a unique number:
| System Call | Number (Linux x86-64) |
|-------------|----------------------|
| read | 0 |
| write | 1 |
| open | 2 |
| close | 3 |
| fork | 57 |
| execve | 59 |
| exit | 60 |

## Parameter Passing Methods

1. **Registers** - Parameters passed via CPU registers
2. **Block/Table** - Parameters stored in memory block, address passed in register
3. **Stack** - Parameters pushed onto stack by program, popped by OS

---

## Types of System Calls

## 1. Process Control

| System Call | Description                             |
| ----------- | --------------------------------------- |
| `fork()`    | Create a new process (child)            |
| `exec()`    | Replace process memory with new program |
| `exit()`    | Terminate process                       |
| `wait()`    | Wait for child process                  |
| `kill()`    | Send signal to process                  |
| `getpid()`  | Get process ID                          |
| `getppid()` | Get parent process ID                   |

#### fork() Example

```c
#include <unistd.h>
#include <stdio.h>
int main() {
    pid_t pid = fork();
    if (pid < 0) {
        // Error
        perror("fork failed");
    } else if (pid == 0) {
        // Child process
        printf("Child: My PID is %d\n", getpid());
    } else {
        // Parent process
        printf("Parent: Created child with PID %d\n", pid);
        wait(NULL);  // Wait for child
    }
    return 0;
}
```

---

## 2. File Management

| System Call | Description             |
| ----------- | ----------------------- |
| `open()`    | Open a file             |
| `close()`   | Close a file descriptor |
| `read()`    | Read from file          |
| `write()`   | Write to file           |
| `lseek()`   | Move file pointer       |
| `stat()`    | Get file status         |
| `chmod()`   | Change file permissions |
| `unlink()`  | Delete a file           |

#### File Operations Example

```c
#include <fcntl.h>
#include <unistd.h>
int main() {
    // Open file
    int fd = open("file.txt", O_RDONLY);
    if (fd < 0) {
        perror("open failed");
        return 1;
    }
    // Read from file
    char buffer[100];
    ssize_t bytes = read(fd, buffer, sizeof(buffer) - 1);
    if (bytes > 0) {
        buffer[bytes] = '\0';
        write(STDOUT_FILENO, buffer, bytes);
    }
    // Close file
    close(fd);
    return 0;
}
```

---

## 3. Device Management

| System Call | Description                |
| ----------- | -------------------------- |
| `ioctl()`   | Device-specific operations |
| `read()`    | Read from device           |
| `write()`   | Write to device            |
| `mmap()`    | Map device memory          |

---

## 4. Information Maintenance

| System Call      | Description                |
| ---------------- | -------------------------- |
| `getpid()`       | Get process ID             |
| `alarm()`        | Set alarm clock            |
| `sleep()`        | Suspend execution          |
| `time()`         | Get system time            |
| `gettimeofday()` | Get time with microseconds |
| `sysinfo()`      | Get system information     |

---

## 5. Communication

| System Call | Description             |
| ----------- | ----------------------- |
| `pipe()`    | Create a pipe           |
| `shmget()`  | Allocate shared memory  |
| `shmat()`   | Attach shared memory    |
| `msgget()`  | Create message queue    |
| `msgsnd()`  | Send message            |
| `msgrcv()`  | Receive message         |
| `socket()`  | Create socket           |
| `connect()` | Connect to socket       |
| `send()`    | Send data via socket    |
| `recv()`    | Receive data via socket |

#### Pipe Example

```c
#include <unistd.h>
#include <stdio.h>
#include <string.h>
int main() {
    int pipefd[2];  // pipefd[0] = read, pipefd[1] = write
    char buffer[100];
    // Create pipe
    if (pipe(pipefd) == -1) {
        perror("pipe failed");
        return 1;
    }
    pid_t pid = fork();
    if (pid == 0) {
        // Child: read from pipe
        close(pipefd[1]);  // Close write end
        read(pipefd[0], buffer, sizeof(buffer));
        printf("Child received: %s\n", buffer);
        close(pipefd[0]);
    } else {
        // Parent: write to pipe
        close(pipefd[0]);  // Close read end
        char *msg = "Hello from parent!";
        write(pipefd[1], msg, strlen(msg) + 1);
        close(pipefd[1]);
        wait(NULL);
    }
    return 0;
}
```

---

## 6. Protection

| System Call | Description                 |
| ----------- | --------------------------- |
| `chmod()`   | Change file permissions     |
| `chown()`   | Change file owner           |
| `umask()`   | Set file mode creation mask |
| `setuid()`  | Set user ID                 |
| `setgid()`  | Set group ID                |

---

## User Mode vs Kernel Mode

| Aspect              | User Mode         | Kernel Mode          |
| ------------------- | ----------------- | -------------------- |
| **Privilege Level** | Low (Ring 3)      | High (Ring 0)        |
| **Access**          | Limited resources | Full hardware access |
| **Instructions**    | Restricted set    | All instructions     |
| **Memory Access**   | User space only   | All memory           |
| **Crash Impact**    | Only process      | Entire system        |
| **Mode Bit**        | 1                 | 0                    |

## Why Two Modes?

1. **Protection** - Prevent user programs from damaging system
2. **Security** - Isolate processes from each other
3. **Stability** - Bugs in user programs don't crash system
4. **Resource Control** - OS manages all hardware access

---

## Mode Switching

## User → Kernel Mode (System Call)

1. Save user context (registers, PC)
2. Switch to kernel stack
3. Set mode bit to 0
4. Jump to kernel code

## Kernel → User Mode (Return)

1. Restore user context
2. Switch to user stack
3. Set mode bit to 1
4. Jump to user code

## Overhead

Mode switching is expensive:

- Save and restore registers
- Flush CPU pipeline
- Possible cache/TLB effects
- Typical time: 100s of nanoseconds

---

## System Call vs Function Call

| Aspect             | System Call         | Function Call      |
| ------------------ | ------------------- | ------------------ |
| **Mode Switch**    | Yes (User ↔ Kernel) | No                 |
| **Overhead**       | High                | Low                |
| **Access**         | Kernel services     | User space code    |
| **Implementation** | OS kernel           | User libraries     |
| **Invocation**     | Trap/interrupt      | CALL instruction   |
| **Examples**       | fork(), read()      | printf(), strlen() |

---

## System Call vs Interrupt

| Aspect           | System Call     | Interrupt              |
| ---------------- | --------------- | ---------------------- |
| **Trigger**      | Software (trap) | Hardware/Software      |
| **Synchronous**  | Yes             | No (usually)           |
| **Initiated By** | User program    | External device/signal |
| **Predictable**  | Yes             | No                     |
| **Examples**     | read(), write() | Keyboard, timer        |

---

## Library Functions vs System Calls

Many C library functions are wrappers around system calls:

```
printf()  →  write()  →  sys_write
fopen()   →  open()   →  sys_open
malloc()  →  brk()/mmap()  →  sys_brk/sys_mmap
```

## Why Use Library Functions?

1. **Buffering** - printf() buffers output for efficiency
2. **Portability** - Same interface across different OS
3. **Convenience** - Higher-level abstraction
4. **Optimization** - Libraries may batch system calls

---

## Common System Call Errors

| Error Code | Name   | Description               |
| ---------- | ------ | ------------------------- |
| -1         | EPERM  | Operation not permitted   |
| -2         | ENOENT | No such file or directory |
| -9         | EBADF  | Bad file descriptor       |
| -12        | ENOMEM | Out of memory             |
| -13        | EACCES | Permission denied         |
| -17        | EEXIST | File exists               |
| -22        | EINVAL | Invalid argument          |

## Checking Errors

```c
int fd = open("file.txt", O_RDONLY);
if (fd == -1) {
    perror("open");  // Print error message
    printf("Error code: %d\n", errno);
}
```

---
## Quick Reference

```
System Call Categories:
├── Process Control: fork, exec, exit, wait, kill
├── File Management: open, read, write, close, lseek
├── Device Management: ioctl, read, write
├── Information: getpid, time, alarm
├── Communication: pipe, socket, shmget, msgget
└── Protection: chmod, chown, setuid
Execution Flow:
User Program → Library → Trap → Kernel → Handler → Return
Mode Bit:
0 = Kernel Mode (privileged)
1 = User Mode (restricted)
```
