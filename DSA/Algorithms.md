

## Time Complexity & Space Complexity

![../images/Algorithm.png](../images/Algorithm.png)

=============================================
1. Sorting Algorithms Comparison
=============================================

| Algorithm       | Best Case | Average Case | Worst Case | Space  | Stable |
|----------------|-----------|--------------|------------|--------|--------|
| Bubble Sort    | O(n)      | O(n²)        | O(n²)      | O(1)   | Yes    |
| Selection Sort | O(n²)     | O(n²)        | O(n²)      | O(1)   | No     |
| Insertion Sort | O(n)      | O(n²)        | O(n²)      | O(1)   | Yes    |
| Merge Sort     | O(nlogn)  | O(nlogn)     | O(nlogn)   | O(n)   | Yes    |
| Quick Sort     | O(nlogn)  | O(nlogn)     | O(n²)      | O(logn)| No     |
| Heap Sort      | O(nlogn)  | O(nlogn)     | O(nlogn)   | O(1)   | No     |
| Counting Sort  | O(n+k)    | O(n+k)       | O(n+k)     | O(k)   | Yes    |
| Radix Sort     | O(nk)     | O(nk)        | O(nk)      | O(n+k) | Yes    |

Important Points:
- Fastest average: Quick Sort  
- Guaranteed O(nlogn): Merge & Heap  
- Only stable O(nlogn): Merge Sort  
- In-place + stable: Insertion Sort  

=============================================
2. Searching Algorithms
=============================================

| Algorithm        | Time Complexity | Space |
|------------------|-----------------|-------|
| Linear Search    | O(n)            | O(1)  |
| Binary Search    | O(log n)        | O(1)  |
| BFS (Graph)      | O(V + E)        | O(V)  |
| DFS (Graph)      | O(V + E)        | O(V)  |
| Hashing (avg)    | O(1)            | O(n)  |

=============================================
3. Tree Data Structures
=============================================

| Structure        | Search  | Insert  | Delete  | Space |
|-----------------|---------|---------|---------|-------|
| BST (average)   | O(logn) | O(logn) | O(logn) | O(n)  |
| BST (worst)     | O(n)    | O(n)    | O(n)    | O(n)  |
| AVL Tree        | O(logn) | O(logn) | O(logn) | O(n)  |
| Red Black Tree  | O(logn) | O(logn) | O(logn) | O(n)  |
| B Tree          | O(logn) | O(logn) | O(logn) | O(n)  |

=============================================
4. Graph Algorithms
=============================================

| Algorithm          | Time Complexity | Space |
|--------------------|-----------------|-------|
| BFS                | O(V + E)        | O(V)  |
| DFS                | O(V + E)        | O(V)  |
| Dijkstra           | O(E log V)      | O(V)  |
| Bellman Ford       | O(VE)           | O(V)  |
| Floyd Warshall     | O(V³)           | O(V²) |
| Kruskal MST        | O(E log E)      | O(V)  |
| Prim MST           | O(E log V)      | O(V)  |
| Topological Sort   | O(V + E)        | O(V)  |

=============================================
5. Dynamic Programming Problems
=============================================

| Problem            | Time  | Space |
|--------------------|-------|-------|
| Fibonacci (DP)     | O(n)  | O(n)  |
| 0/1 Knapsack       | O(nW) | O(nW) |
| Longest Common Subsequence | O(mn) | O(mn) |
| Matrix Chain Multiplication | O(n³) | O(n²) |
| Coin Change        | O(nW) | O(W)  |

=============================================
6. Recursion vs Iteration
=============================================

| Factor       | Recursion | Iteration |
|--------------|-----------|-----------|
| Time         | More      | Less      |
| Space        | O(n)      | O(1)      |
| Overhead     | High      | Low       |
| Readability  | High      | Medium    |

=============================================
7. Algorithm Design Paradigms
=============================================

| Technique          | Optimal Solution | Speed | Space |
|--------------------|------------------|-------|-------|
| Greedy             | Not always       | Fast  | Low   |
| Divide & Conquer   | Problem Dependent| Good  | Medium|
| Dynamic Programming| Always Optimal   | Slow  | High  |

=============================================
8. Important  Quick Facts
=============================================

- Quick Sort worst case: O(n²)  
- Merge Sort space: O(n)  
- Heap Sort space: O(1)  
- Binary Search: O(log n)  
- BFS/DFS: O(V + E)  
- Dijkstra: O(E log V)  
- Floyd Warshall: O(V³)  
- AVL/RB Trees: O(log n)  
- Hashing average: O(1)  
- DP generally increases both time and space  


# FINAL MEMORY TRICKS

- Stable + fast: Merge Sort  
- In-place + guaranteed: Heap Sort  
- Best average general: Quick Sort  
- Searching in sorted array: Binary Search  
- Graph traversal: BFS/DFS → O(V+E)  
- All-pairs shortest path: Floyd Warshall  
- Single-source shortest path: Dijkstra  
