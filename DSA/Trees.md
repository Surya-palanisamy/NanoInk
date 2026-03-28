
## Depth of Binary Tree (leetcode 104)

[104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

> Given the `root` of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Example 1:**
**Input:** `root = [3,9,20,null,null,15,7]`
**Output:** `3`

```java
class Solution {
    public int maxDepth(TreeNode root) {
        if(root==null){
            return 0;
        }
        return (1+(Math.max(maxDepth(root.left),maxDepth(root.right))));
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(n)** |

- Approach: Recursively calculate depth of left and right subtrees.
- Dry run (root=[3,9,20,null,null,15,7]):
  - Left depth = 1 + max(0,0) = 1
  - Right depth = 1 + max(1,1) = 2
  - Return max(1,2) = 2

## Preorder Traversal (LeetCode 144)

[144. Binary Tree Preorder Traversal](https://leetcode.com/problems/binary-tree-preorder-traversal/)

> Given the `root` of a binary tree, print the preorder traversal of its nodes' values.

**Example 1:**
**Input:** `root = [1,null,2,3]`
**Output:** `1 2 3`

```java
public void preOrder(Node root) {
    if (root == null) return;
    System.out.print(root.data + " ");
    preOrder(root.left);
    preOrder(root.right);
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(n)** |

- Approach: Visit Root → Traverse Left → Traverse Right
- Dry run (root=[1,null,2,3]):
  - Visit root (1) → print 1
  - Traverse left of 1 (null)
  - Traverse right of 1 (node 2)
    - Visit node 2 → print 2
    - Traverse left of 2 (node 3)
      - Visit node 3 → print 3
      - Traverse left & right of 3 (both null)
    - Traverse right of 2 (null)
  - Output is 1 2 3

---

## Inorder Traversal (leetcode 94)

[94. Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)

> Given the `root` of a binary tree, print the inorder traversal of its nodes' values.

**Example 1:**
**Input:** `root = [1,null,2,3]`
**Output:** `[1,3,2]`

```java
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List <Integer> A=new ArrayList<>();
        inorder(root,A);
        return A;
    }
      public  static void  inorder(TreeNode root,List<Integer> A){
        if(root==null) return;
        inorder(root.left,A);
        A.add(root.val);
        inorder(root.right,A);

     }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(n)** |

- Approach: Traverse Left → Visit Root → Traverse Right
- Dry run (root=[1,null,2,3]):
  - Traverse left of 1 (null)
  - Visit root (1) → print 1
  - Traverse right of 1 (node 2)
    - Traverse left of 2 (node 3)
      - Traverse left of 3 (null)
      - Visit node 3 → print 3
      - Traverse right of 3 (null)
    - Visit node 2 → print 2
    - Traverse right of 2 (null)
  - Output is 1 3 2

---

## Postorder Traversal (LeetCode 145)

[145. Binary Tree Postorder Traversal](https://leetcode.com/problems/binary-tree-postorder-traversal/)

> Given the `root` of a binary tree, print the postorder traversal of its nodes' values.

**Example 1:**
**Input:** `root = [1,null,2,3]`
**Output:** `3 2 1`

```java
public void postOrder(Node root) {
    if(root==null) return ;
    postOrder(root.left);
    postOrder(root.right);
    System.out.print(root.data + " ");
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(n)** |

- Approach: Traverse Left → Traverse Right → Visit Root
- Dry run (root=[1,null,2,3]):
  - Traverse left of 1 (null)
  - Traverse right of 1 (node 2)
    - Traverse left of 2 (node 3)
      - Traverse left & right of 3 (null)
      - Visit node 3 → print 3
    - Traverse right of 2 (null)
    - Visit node 2 → print 2
  - Visit root (1) → print 1
  - Output is 3 2 1

---

## Search in a Binary Search Tree (Leetcode 700)

[700. Search in a Binary Search Tree](https://leetcode.com/problems/search-in-a-binary-search-tree/)

> You are given the `root` of a binary search tree (BST) and an integer `key`. Search for the node whose value equals `key` and return `true` if it exists, otherwise `false`.

**Example 1:**
**Input:** `root = [4,2,7,1,3], key = 2`
**Output:** `true`

```java
public boolean search(Node root, int key) {
    if (root == null) return false;
    if (root.data == key) return true;
    if (key < root.data)
        return search(root.left, key);
    else
        return search(root.right, key);
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(h)** |
| Space | **O(h)** |

- Approach: Recursively search left or right subtree based on whether the key is smaller or greater than current node. Time and space bounds depend on tree height `h` (worst case `O(n)`).
- Dry run (root=[4,2,7,1,3], key=2):
  - root=4, key=2 < 4 → go left
  - root=2, key==2 → return true

## Validate Binary Search Tree (leetcode 98)

[98. Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)

> Given the `root` of a binary tree, *determine if it is a valid binary search tree (BST)*.

> A **valid BST** is defined as follows:

- The left subtree of a node contains only nodes with keys **strictly less than** the node's key.
- The right subtree of a node contains only nodes with keys **strictly greater than** the node's key.
- Both the left and right subtrees must also be binary search trees.

![https://res.cloudinary.com/dwdbp4qpe/image/upload/v1772346769/tree1_ukhech.jpg](https://res.cloudinary.com/dwdbp4qpe/image/upload/v1772346769/tree1_ukhech.jpg)

**Input:** root = [2,1,3]
**Output:** true

![https://res.cloudinary.com/dwdbp4qpe/image/upload/v1772346770/tree2_ruwb2c.jpg](https://res.cloudinary.com/dwdbp4qpe/image/upload/v1772346770/tree2_ruwb2c.jpg)

**Input:** root = [5,1,4,null,null,3,6]
**Output:** false

**Explanation:** The root node's value is 5 but its right child's value is 4.

```java
class Solution {
    public boolean isValidBST(TreeNode root) {
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    public boolean validate(TreeNode node, long min, long max) {
        if (node == null) return true;
        if (node.val <= min || node.val >= max) {
            return false;
        }
        return validate(node.left, min, node.val) &&
               validate(node.right, node.val, max);
    }
}
```

| Metric | Value    |
| ------ | -------- |
| Time   | **O(n)** |
| Space  | **O(h)** |

- Dry run (root=[2,1,3]):
  - validate(2, -INF, INF) -> true. Left = validate(1, -INF, 2)
  - validate(1, -INF, 2) -> true.
  - Right = validate(3, 2, INF) -> true. Returns true.

---

## Invert Binary Tree (leetcode 226)

[226. Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)

> Given the `root` of a binary tree, invert the tree, and return *its root*.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/03/14/invert1-tree.jpg)

**Input:** root = [4,2,7,1,3,6,9]
**Output:** [4,7,2,9,6,3,1]

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/03/14/invert2-tree.jpg)

**Input:** root = [2,1,3]
**Output:** [2,3,1]

**Example 3:**

**Input:** root = []
**Output:** []

```java
class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;
        invertTree(root.left);
        invertTree(root.right);
        return root;
    }
}
```

| Metric | Value    |
| ------ | -------- |
| Time   | **O(n)** |
| Space  | **O(h)** |

- Dry run (root=[2,1,3]):
  - invertTree(2): swap left(1) and right(3) -> left=3, right=1.
  - recurse on new left(3) and right(1). Leaves return null. Result is [2,3,1].

---

## Same Tree (leetcode 100)

[100. Same Tree](https://leetcode.com/problems/same-tree/)

> Given the roots of two binary trees `p` and `q`, write a function to check if they are the same or not.

> Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/12/20/ex1.jpg)

**Input:** p = [1,2,3], q = [1,2,3]
**Output:** true

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/12/20/ex2.jpg)

**Input:** p = [1,2], q = [1,null,2]
**Output:** false

**Example 3:**

![](https://assets.leetcode.com/uploads/2020/12/20/ex3.jpg)

**Input:** p = [1,2,1], q = [1,1,2]
**Output:** false

```java
class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null) return false;
        if (p.val != q.val) return false;
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
}
```

| Metric | Value    |
| ------ | -------- |
| Time   | **O(n)** |
| Space  | **O(h)** |

- Dry run (p=[1,2], q=[1,null,2]):
  - isSameTree(1,1) -> val matches. Left: isSameTree(2,null)
  - (2,null) -> returns false. Final return false.

---

## Subtree Of Another Tree (Leetcode 571)

[572. Subtree of Another Tree](https://leetcode.com/problems/subtree-of-another-tree/)

> Given the roots of two binary trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and node values of `subRoot` and `false` otherwise.

> A subtree of a binary tree `tree` is a tree that consists of a node in `tree` and all of this node's descendants. The tree `tree` could also be considered as a subtree of itself.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/04/28/subtree1-tree.jpg)

**Input:** root = [3,4,5,1,2], subRoot = [4,1,2]
**Output:** true

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/04/28/subtree2-tree.jpg)

**Input:** root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
**Output:** false

```java
class Solution {
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        if (root == null) return false;
        if (sameTree(root, subRoot)) return true;
        return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
    }
    public boolean sameTree(TreeNode a, TreeNode b) {
        if (a == null && b == null) return true;
        if (a == null || b == null) return false;
        if (a.val != b.val) return false;
        return sameTree(a.left, b.left) && sameTree(a.right, b.right);
    }
}
```

| Metric | Value        |
| ------ | ------------ |
| Time   | **O(m × n)** |
| Space  | **O(h)**     |

- Dry run (root=[3,4,5,1,2], subRoot=[4,1,2]):
  - isSubtree(3, 4): sameTree(3, 4) -> false.
  - recurse left: isSubtree(4, 4) -> sameTree(4, 4) -> matches 4. Left: 1 matches 1, right: 2 matches 2 -> true.
  - Returns true.

---


## Binary Tree Level Order Traversal (LeetCode 102)

[102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)

> Given the `root` of a binary tree, return *the level order traversal of its nodes' values*. (i.e., from left to right, level by level).

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg)

**Input:** root = [3,9,20,null,null,15,7]
**Output:** [[3],[9,20],[15,7]]

**Example 2:**

**Input:** root = [1]
**Output:** [[1]]

**Example 3:**

**Input:** root = []
**Output:** []

```java
class Solution {

    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
       
        if (root == null)
            return res;
       
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
       
        while (!q.isEmpty()) {
            int size = q.size();
       
    List<Integer> level = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                level.add(node.val);
               
                if (node.left != null)
                    q.offer(node.left);
                if (node.right != null)
                   q.offer(node.right);
            }
           
            res.add(level);
        }
        return res;
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(n)** |

- Approach: BFS using a queue. Process nodes level by level, adding children to the queue.
- Dry run (root=[3,9,20,null,null,15,7]):
  - Queue: [3]. Level 1: [3]. Add 9, 20.
  - Queue: [9,20]. Level 2: [9,20]. Add 15, 7.
  - Queue: [15,7]. Level 3: [15,7].
  - Result: [[3],[9,20],[15,7]]

---

## Kth Smallest Element in a BST (LeetCode 230)

[230. Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

> Given the `root` of a binary search tree, and an integer `k`, return _the_ `kth` _smallest value (**1-indexed**) of all the values of the nodes in the tree_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/01/28/kthtree1.jpg)

**Input:** root = [3,1,4,null,2], k = 1
**Output:** 1

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/01/28/kthtree2.jpg)

**Input:** root = [5,3,6,2,4,null,null,1], k = 3
**Output:** 3

```java
class Solution {

    int count = 0;
    int result = 0;
    public int kthSmallest(TreeNode root, int k) {
        inorder(root, k);
        return result;
    }
    private void inorder(TreeNode node, int k) {
        if (node == null)
            return;
        inorder(node.left, k);
        count++;
        if (count == k) {
            result = node.val;
            return;
        }
        inorder(node.right, k);
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(h)** |

- Approach: Inorder traversal of a BST yields values in sorted order. We traverse left, increment count, and when count matches `k`, we record the result.
- Dry run (root=[3,1,4,null,2], k=1):
  - inorder(3). left: inorder(1). left: null.
  - count++ -> 1.
  - count==1 -> result=1. Return.
  - Returns 1.

---

## Convert Sorted Array to Binary Search Tree (LeetCode 108)

[108. Convert Sorted Array to Binary Search Tree](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/)

> Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.

**Example 1:**
**Input:** nums = [-10,-3,0,5,9]
**Output:** [0,-3,9,-10,null,5]

**Example 2:**
**Input:** nums = [1,3]
**Output:** [3,1]

```java
class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        return build(nums, 0, nums.length - 1);
    }

    private TreeNode build(int[] nums, int l, int r) {
        if (l > r)
            return null;

        int mid = (l + r) / 2;
        TreeNode root = new TreeNode(nums[mid]);

        root.left = build(nums, l, mid - 1);
        root.right = build(nums, mid + 1, r);

        return root;
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(log n)** |

- Approach: Divide and conquer. Select the middle element as the root and recursively build the left and right subtrees from the left and right halves of the array.
- Dry run (nums=[-10,-3,0,5,9]):
  - mid=2, root=0. Left: build([-10,-3]). Right: build([5,9]).
  - Left mid=0, root=-10. Right sub of -10 is -3.
  - Right mid=0, root=5. Right sub of 5 is 9.
  - Returns tree: [0,-10,5,null,-3,null,9].

---

## Binary Tree Maximum Path Sum (LeetCode 124)

[124. Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)

Solved

Hard

Topics

![premium lock icon](https://leetcode.com/_next/static/images/lock-a6627e2c7fa0ce8bc117c109fb4e567d.svg)Companies

A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence **at most once**. Note that the path does not need to pass through the root.

The **path sum** of a path is the sum of the node's values in the path.

Given the `root` of a binary tree, return _the maximum **path sum** of any **non-empty** path_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/10/13/exx1.jpg)

**Input:** root = [1,2,3]
**Output:** 6
**Explanation:** The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/10/13/exx2.jpg)

**Input:** root = [-10,9,20,null,null,15,7]
**Output:** 42
**Explanation:** The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.

```java
class Solution {
    int maxSum = Integer.MIN_VALUE;
    public int maxPathSum(TreeNode root) {
        dfs(root);
        return maxSum;
    }
    private int dfs(TreeNode node) {
        if (node == null)
            return 0;

        int left = Math.max(0, dfs(node.left));
        int right = Math.max(0, dfs(node.right));
        maxSum = Math.max(maxSum, left + right + node.val);

        return node.val + Math.max(left, right);
    }
}

```
---
[543. Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)


Given the `root` of a binary tree, return _the length of the **diameter** of the tree_.

The **diameter** of a binary tree is the **length** of the longest path between any two nodes in a tree. This path may or may not pass through the `root`.

The **length** of a path between two nodes is represented by the number of edges between them.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/03/06/diamtree.jpg)

**Input:** root = [1,2,3,4,5]
**Output:** 3
**Explanation:** 3 is the length of the path [4,2,1,3] or [5,2,1,3].

**Example 2:**

**Input:** root = [1,2]
**Output:** 1

```java
class Solution {
    int max = 0;
    public int diameterOfBinaryTree(TreeNode root) {
        dfs(root);
        return max;
    }

int dfs(TreeNode node) {
    if (node == null) return 0;
    int left = dfs(node.left);
    int right = dfs(node.right);
    max = Math.max(max, left + right); 
    return 1 + Math.max(left, right); 
}
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(h)** |

- Approach: DFS post-order. For each node, compute depth of left and right subtrees. Diameter through this node is `left + right`. Update max diameter, and return max depth `1 + max(left, right)`.
- Dry run (root=[1,2]):
  - dfs(2) -> left=0, right=0, max=0. returns 1.
  - dfs(1) -> left=1, right=0. max=max(0, 1+0)=1. returns 2.
  - Global max is 1.