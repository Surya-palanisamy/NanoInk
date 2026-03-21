# Algorithms & Complexity

![Algorithm Comparison](https://storage.googleapis.com/images-article/TimeComplexityGrapg.jpg)


# 📘 DSA Notes: Master’s Theorem & Recurrence Relations

---

## 🌳 Master’s Theorem

Used for solving recurrences of the form:

```
T(n) = aT(n/b) + f(n)
```

### 🔑 Parameters

- `a` → number of subproblems
- `b` → factor of size reduction
- `f(n)` → extra work

---

## 🧠 Core Idea

Compare:

```
f(n)  vs  n^(log_b a)
```

---

## 📦 Case 1: f(n) is Smaller

```
f(n) = O(n^(log_b a - ε))
```

👉 Result:

```
T(n) = Θ(n^(log_b a))
```

### 🔥 Example

```
T(n) = 2T(n/2) + n^0.5
```

- n^(log₂2) = n
    
- f(n) < n
    

✅ Answer:

```
Θ(n)
```

---

## 🟡 Case 2: f(n) is Equal

```
f(n) = Θ(n^(log_b a))
```

👉 Result:

```
T(n) = Θ(n^(log_b a) log n)
```

### 🔥 Example (Merge Sort)

```
T(n) = 2T(n/2) + n
```

- n^(log₂2) = n
    

✅ Answer:

```
Θ(n log n)
```

---

## 🔴 Case 3: f(n) is Larger

```
f(n) = Ω(n^(log_b a + ε))
```

👉 Result:

```
T(n) = Θ(f(n))
```

### 🔥 Example

```
T(n) = 2T(n/2) + n^2
```

- n^(log₂2) = n
    
- f(n) > n
    

✅ Answer:

```
Θ(n^2)
```

---

## ⚠️ When Master’s Theorem Fails

- Not in form `T(n/b)`
    

### ❌ Examples

```
T(n) = T(n-1) + n
T(n) = T(n-1) + 1
```

---

# 🔁 Linear Recurrence Pattern

## Example:

```
T(n) = T(n-1) + n
```

### 🔍 Expansion

```
T(n) = T(n-1) + n
     = T(n-2) + (n-1) + n
     = T(n-3) + (n-2) + (n-1) + n
     ...
     = T(1) + 2 + 3 + ... + n
```

### 📊 Sum

```
2 + 3 + ... + n = n(n+1)/2 - 1
```

### 🎯 Final Answer

```
T(n) = Θ(n^2)
```

---

## ⚡ Quick Patterns (Must Remember)

|Recurrence|Time Complexity|
|---|---|
|T(n) = T(n-1) + 1|O(n)|
|T(n) = T(n-1) + n|O(n^2)|
|T(n) = T(n-1) + n^2|O(n^3)|

👉 General Pattern:

```
T(n) = T(n-1) + n^k → O(n^(k+1))
```

---

## 💡 Pro Tip

- Master’s theorem = fast shortcut
    
- Recursion tree
## 1. Sorting Algorithms Comparison

| Algorithm      | Best Case | Average Case | Worst Case | Space   | Stable |
| -------------- | --------- | ------------ | ---------- | ------- | ------ |
| Bubble Sort    | O(n)      | O(n²)        | O(n²)      | O(1)    | Yes    |
| Selection Sort | O(n²)     | O(n²)        | O(n²)      | O(1)    | No     |
| Insertion Sort | O(n)      | O(n²)        | O(n²)      | O(1)    | Yes    |
| Merge Sort     | O(nlogn)  | O(nlogn)     | O(nlogn)   | O(n)    | Yes    |
| Quick Sort     | O(nlogn)  | O(nlogn)     | O(n²)      | O(logn) | No     |
| Heap Sort      | O(nlogn)  | O(nlogn)     | O(nlogn)   | O(1)    | No     |
| Counting Sort  | O(n+k)    | O(n+k)       | O(n+k)     | O(k)    | Yes    |
| Radix Sort     | O(nk)     | O(nk)        | O(nk)      | O(n+k)  | Yes    |

### Important Points

- **Fastest average:** Quick Sort
- **Guaranteed O(nlogn):** Merge & Heap
- **Only stable O(nlogn):** Merge Sort
- **In-place + stable:** Insertion Sort

---

## 2. Searching Algorithms

| Algorithm     | Time Complexity | Space |
| ------------- | --------------- | ----- |
| Linear Search | O(n)            | O(1)  |
| Binary Search | O(log n)        | O(1)  |
| BFS (Graph)   | O(V + E)        | O(V)  |
| DFS (Graph)   | O(V + E)        | O(V)  |
| Hashing (avg) | O(1)            | O(n)  |

---

## 3. Tree Data Structures

| Structure      | Search  | Insert  | Delete  | Space |
| -------------- | ------- | ------- | ------- | ----- |
| BST (average)  | O(logn) | O(logn) | O(logn) | O(n)  |
| BST (worst)    | O(n)    | O(n)    | O(n)    | O(n)  |
| AVL Tree       | O(logn) | O(logn) | O(logn) | O(n)  |
| Red Black Tree | O(logn) | O(logn) | O(logn) | O(n)  |
| B Tree         | O(logn) | O(logn) | O(logn) | O(n)  |

---

## 4. Graph Algorithms

| Algorithm        | Time Complexity | Space |
| ---------------- | --------------- | ----- |
| BFS              | O(V + E)        | O(V)  |
| DFS              | O(V + E)        | O(V)  |
| Dijkstra         | O(E log V)      | O(V)  |
| Bellman Ford     | O(VE)           | O(V)  |
| Floyd Warshall   | O(V³)           | O(V²) |
| Kruskal MST      | O(E log E)      | O(V)  |
| Prim MST         | O(E log V)      | O(V)  |
| Topological Sort | O(V + E)        | O(V)  |

---

## 5. Dynamic Programming Problems

| Problem                     | Time  | Space |
| --------------------------- | ----- | ----- |
| Fibonacci (DP)              | O(n)  | O(n)  |
| 0/1 Knapsack                | O(nW) | O(nW) |
| Longest Common Subsequence  | O(mn) | O(mn) |
| Matrix Chain Multiplication | O(n³) | O(n²) |
| Coin Change                 | O(nW) | O(W)  |

---

## 6. Recursion vs Iteration

| Factor      | Recursion | Iteration |
| ----------- | --------- | --------- |
| Time        | More      | Less      |
| Space       | O(n)      | O(1)      |
| Overhead    | High      | Low       |
| Readability | High      | Medium    |

---

## 7. Algorithm Design Paradigms

| Technique           | Optimal Solution  | Speed | Space  |
| ------------------- | ----------------- | ----- | ------ |
| Greedy              | Not always        | Fast  | Low    |
| Divide & Conquer    | Problem Dependent | Good  | Medium |
| Dynamic Programming | Always Optimal    | Slow  | High   |

---

## 8. Important Quick Facts

- **Quick Sort worst case:** O(n²)
- **Merge Sort space:** O(n)
- **Heap Sort space:** O(1)
- **Binary Search:** O(log n)
- **BFS/DFS:** O(V + E)
- **Dijkstra:** O(E log V)
- **Floyd Warshall:** O(V³)
- **AVL/RB Trees:** O(log n)
- **Hashing average:** O(1)
- **DP** generally increases both time and space

---

## FINAL MEMORY TRICKS

- **Stable + fast:** Merge Sort
- **In-place + guaranteed:** Heap Sort
- **Best average general:** Quick Sort
- **Searching in sorted array:** Binary Search
- **Graph traversal:** BFS/DFS → O(V+E)
- **All-pairs shortest path:** Floyd Warshall
- **Single-source shortest path:** Dijkstra
