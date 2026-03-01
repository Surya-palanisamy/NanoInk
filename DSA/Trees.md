## Depth of Binary Tree (leetcode 104)
[104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

> Given the `root` of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

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

---

## Inorder Traversal (leetcode 94)
[94. Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)

> Given the `root` of a binary tree, print the inorder traversal of its nodes' values.

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

---

## Postorder Traversal

> Given the `root` of a binary tree, print the postorder traversal of its nodes' values.

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

---

## Search in a Binary Search Tree (Leetcode 700)
[700. Search in a Binary Search Tree](https://leetcode.com/problems/search-in-a-binary-search-tree/)

> You are given the `root` of a binary search tree (BST) and an integer `key`. Search for the node whose value equals `key` and return `true` if it exists, otherwise `false`.

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
> Given the `root` of a binary tree, _determine if it is a valid binary search tree (BST)_.

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

| Metric | Value                |
| ------ | -------------------- |
| Time   | O(n)                 |
| Space  | O(h) recursion stack |