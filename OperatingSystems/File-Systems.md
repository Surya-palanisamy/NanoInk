# File Systems

## A file system is the method and data structure an operating system uses to organize and store files on storage devices.

## What is a File?

A **file** is a named collection of related information recorded on secondary storage. It is the smallest logical unit of secondary storage.

## File Attributes

| Attribute      | Description                              |
| -------------- | ---------------------------------------- |
| **Name**       | Human-readable symbolic name             |
| **Identifier** | Unique tag (number) identifying file     |
| **Type**       | Information for systems with typed files |
| **Location**   | Pointer to file location on device       |
| **Size**       | Current size of file                     |
| **Protection** | Access control information               |
| **Timestamps** | Creation, modification, access times     |
| **Owner**      | User who created the file                |

---

## File Operations

| Operation    | Description                                |
| ------------ | ------------------------------------------ |
| **Create**   | Allocate space, create directory entry     |
| **Open**     | Bring file metadata into memory            |
| **Read**     | Read data from current position            |
| **Write**    | Write data at current position             |
| **Seek**     | Reposition file pointer                    |
| **Delete**   | Release file space, remove directory entry |
| **Truncate** | Erase contents, keep attributes            |
| **Close**    | Remove file metadata from memory           |

## Open File Table

- When file is opened, OS maintains information in tables:
  - **Per-process table**: Files open by that process
  - **System-wide table**: All open files in system
- Contains: File pointer, access rights, location, open count

---

## File Types

## By Extension

| Extension        | Type        | Description          |
| ---------------- | ----------- | -------------------- |
| .exe, .com       | Executable  | Binary program       |
| .c, .java, .py   | Source code | Programming language |
| .txt, .doc       | Text        | Human-readable text  |
| .jpg, .png, .gif | Image       | Image data           |
| .mp3, .wav       | Audio       | Sound data           |
| .zip, .tar       | Archive     | Compressed files     |

## By Structure

| Type            | Description                  |
| --------------- | ---------------------------- |
| **Text File**   | Sequence of characters       |
| **Source File** | Program source code          |
| **Object File** | Compiled but not linked code |
| **Executable**  | Ready to run program         |

---

## Access Methods

## Sequential Access

- Read/write in order, one record after another
- Most common method
- Example: Tape drives, log files

```
Beginning ──────────────────► End
           Read/Write
           ────────►
```

## Direct (Random) Access

- Read/write records in any order
- File viewed as numbered sequence of blocks
- Example: Databases

```
Read block n
Write block m
Read block k
```

## Indexed Access

- Index contains pointers to file blocks
- Search index, then access data directly
- Example: Database indexes

---

## Directory Structure

A directory is a container for organizing files.

## Single-Level Directory

```
┌─────────────────────────────────────┐
│              Directory              │
├──────┬──────┬──────┬──────┬─────────┤
│file1 │file2 │file3 │file4 │  ...    │
└──────┴──────┴──────┴──────┴─────────┘
```

**Problems:**

- Naming conflicts
- Grouping not possible
- Doesn't scale

## Two-Level Directory

```
┌─────────────────────────────────────┐
│         Master File Directory       │
├─────────────────┬───────────────────┤
│      User1      │       User2       │
├─────────────────┼───────────────────┤
│file1 file2 file3│ fileA fileB fileC │
└─────────────────┴───────────────────┘
```

**Advantages:**

- Different users can have same file names
- Better organization
  **Disadvantages:**
- No subdirectories within user
- No file sharing mechanism

## Tree-Structured Directory

```
            ┌────┐
            │ /  │ (root)
            └─┬──┘
        ┌─────┼─────┐
        ▼     ▼     ▼
      ┌───┐ ┌───┐ ┌───┐
      │bin│ │usr│ │etc│
      └───┘ └─┬─┘ └───┘
              │
          ┌───┴───┐
          ▼       ▼
        ┌───┐   ┌───┐
        │lib│   │doc│
        └───┘   └───┘
```

**Features:**

- Arbitrary depth nesting
- Absolute and relative paths
- Current (.) and parent (..) directories

## Acyclic-Graph Directory

- Allows sharing of files/directories
- Multiple paths to same file
- Uses links (hard links, symbolic links)
- Must handle dangling references

## General Graph Directory

- Allows cycles
- Requires garbage collection
- More complex traversal algorithms

---

## File Allocation Methods

How file blocks are allocated on disk.

## 1. Contiguous Allocation

All blocks of file are stored together.

```
┌────┬────┬────┬────┬────┬────┬────┬────┐
│ F1 │ F1 │ F1 │    │ F2 │ F2 │    │    │
└────┴────┴────┴────┴────┴────┴────┴────┘
 0    1    2    3    4    5    6    7
```

**Directory Entry:** (Start block, Length)
| Pros | Cons |
|------|------|
| Simple implementation | External fragmentation |
| Fast sequential access | File size must be known |
| Easy random access | File cannot grow easily |

---

## 2. Linked Allocation

Each block contains pointer to next block.

```
Directory: File A → Block 9
                      ↓
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ Block 9      │──►│ Block 16     │──►│ Block 1      │──► NULL
│ Data + Next  │   │ Data + Next  │   │ Data + Next  │
└──────────────┘   └──────────────┘   └──────────────┘
```

**Directory Entry:** (Start block, End block)
| Pros | Cons |
|------|------|
| No external fragmentation | Slow random access |
| Files can grow dynamically | Pointer space overhead |
| No need to declare file size | Pointer reliability issues |

## FAT (File Allocation Table)

- Variation of linked allocation
- All pointers stored in separate table (FAT)
- FAT cached in memory for faster access

```
┌─────┬─────┬─────┬─────┬─────┬─────┐
│  0  │  1  │  2  │  3  │  4  │  5  │ Block
├─────┼─────┼─────┼─────┼─────┼─────┤
│ eof │  3  │  -  │  5  │  -  │ eof │ FAT Entry
└─────┴─────┴─────┴─────┴─────┴─────┘
File: 1 → 3 → 5 → eof
```

---

## 3. Indexed Allocation

Each file has an index block containing pointers to data blocks.

```
┌──────────────┐
│  Index Block │
├──────────────┤
│ 9            │───► Data Block 9
│ 16           │───► Data Block 16
│ 1            │───► Data Block 1
│ 10           │───► Data Block 10
│ -1           │     (null)
└──────────────┘
```

**Directory Entry:** (Index block number)
| Pros | Cons |
|------|------|
| Direct access supported | Index block overhead |
| No external fragmentation | Max file size limited by index block |
| Dynamic file growth | Wasted space for small files |

## Multi-Level Index

For larger files, use multiple levels of index blocks.

```
┌───────────────┐
│ Outer Index   │
│  Block        │
├───────────────┤
│ ──────────────┼───► ┌───────────────┐
│               │     │ Inner Index   │───► Data blocks
│ ──────────────┼───► └───────────────┘
│               │     ┌───────────────┐
│               │     │ Inner Index   │───► Data blocks
└───────────────┘     └───────────────┘
```

## Combined Scheme (Unix Inode)

```
┌─────────────────────────────┐
│          Inode              │
├─────────────────────────────┤
│ Mode, Owner, Size, Times    │
├─────────────────────────────┤
│ Direct Block 0   ───────────┼──► Data
│ Direct Block 1   ───────────┼──► Data
│ ...                         │
│ Direct Block 11  ───────────┼──► Data
├─────────────────────────────┤
│ Single Indirect ────────────┼──► Index Block ──► Data
├─────────────────────────────┤
│ Double Indirect ────────────┼──► Index ──► Index ──► Data
├─────────────────────────────┤
│ Triple Indirect ────────────┼──► Index ──► Index ──► Index ──► Data
└─────────────────────────────┘
```

---

## Free Space Management

How to track free blocks on disk.

## 1. Bit Vector (Bitmap)

Each bit represents a block (1 = free, 0 = allocated).

```
Block:  0 1 2 3 4 5 6 7 8 9 ...
Bitmap: 0 0 1 1 0 1 0 0 1 1 ...
        (Blocks 2, 3, 5, 8, 9 are free)
```

**Pros:** Simple, efficient for finding contiguous blocks
**Cons:** Bitmap size grows with disk size

## 2. Linked List

Link all free blocks together.

```
Free List Head → Block 2 → Block 3 → Block 5 → Block 8 → NULL
```

**Pros:** No wasted space
**Cons:** Slow for finding contiguous blocks

## 3. Grouping

First free block contains addresses of n free blocks.

```
Block 2: [3, 5, 8, 9, 15, 20, ...]
         └── Last one points to next group
```

## 4. Counting

Keep (starting block, count) pairs for contiguous free regions.

```
(2, 3)  → Blocks 2, 3, 4 are free
(8, 5)  → Blocks 8, 9, 10, 11, 12 are free
```

---

## File System Implementation

## Boot Block

- First block(s) of partition
- Contains code to bootstrap OS
- Also called boot sector or MBR

## Superblock

- Contains critical file system metadata:
  - Total blocks
  - Free blocks
  - Block size
  - Inode count
  - Mount status

## Inode Area

- Array of inodes
- Each inode represents one file

## Data Blocks

- Actual file content
- Directory content

---

## Directory Implementation

## Linear List

- List of (file name, pointer) entries
- Simple to implement
- Slow search O(n)

## Hash Table

- Hash function on file name
- O(1) average lookup
- Must handle collisions
- Fixed size issues

## B-Tree

- Balanced tree structure
- O(log n) operations
- Used by modern file systems (NTFS, HFS+)

---

## File System Types

| File System | OS          | Max File Size | Features                            |
| ----------- | ----------- | ------------- | ----------------------------------- |
| FAT32       | Windows     | 4 GB          | Simple, compatible                  |
| NTFS        | Windows     | 16 EB         | Journaling, permissions, encryption |
| ext4        | Linux       | 16 TB         | Journaling, extents                 |
| HFS+        | macOS       | 8 EB          | Journaling                          |
| APFS        | macOS       | 8 EB          | Copy-on-write, encryption           |
| XFS         | Linux       | 8 EB          | High performance, large files       |
| ZFS         | Solaris/BSD | 16 EB         | Copy-on-write, snapshots, RAID      |

---

## Journaling File Systems

A journal (log) records changes before they're applied to main file system.

## Types of Journaling

| Type              | What's Logged         | Performance | Recovery      |
| ----------------- | --------------------- | ----------- | ------------- |
| **Write-ahead**   | Metadata + Data       | Slow        | Complete      |
| **Metadata only** | Metadata only         | Fast        | Metadata only |
| **Ordered**       | Metadata (after data) | Medium      | Good          |

## Journal Recovery

1. On crash, check journal
2. Replay uncommitted transactions
3. Rollback incomplete transactions
4. File system consistent

---

## Important Interview Questions

## Q1: What is an inode?

**A:** An inode (index node) is a data structure that stores metadata about a file (owner, permissions, timestamps, block pointers) but not the file name or data. Each file has exactly one inode.

## Q2: Difference between hard link and soft link?

**A:**

- **Hard link:** Another directory entry pointing to same inode. File persists until all links removed.
- **Soft link (symbolic):** Points to file name (path). Becomes dangling if target deleted.

## Q3: What is fragmentation in file systems?

**A:**

- **Internal:** Wasted space within allocated blocks
- **External:** Free space scattered in non-contiguous blocks

## Q4: Why use journaling file systems?

**A:** To ensure file system consistency after crashes. Journal records changes before applying them, allowing recovery by replaying or rolling back incomplete operations.

## Q5: Explain contiguous vs indexed allocation.

## **A:** Contiguous stores all blocks together (fast access, fragmentation issues). Indexed stores block pointers in index block (flexible, overhead for small files).

## Quick Reference

```
File Operations:
    Create → Open → Read/Write/Seek → Close → Delete
Directory Types:
    Single-level → Two-level → Tree → Acyclic Graph → General Graph
Allocation Methods:
    Contiguous: [start, length]
    Linked:     block → block → block → null
    Indexed:    index_block → [pointers to data blocks]
Free Space:
    Bitmap:     Simple, efficient search
    Linked:     No space waste, slow search
    Grouping:   Batch of free block addresses
    Counting:   (start, count) pairs
Unix Inode:
    12 direct + 1 single + 1 double + 1 triple indirect
```
