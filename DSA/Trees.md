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

## Preorder Traversal

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

## Postorder Traversal

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
