## depth of binary tree (leetcode 104)

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

## Inorder Traversal

> Given the `root` of a binary tree, print the inorder traversal of its nodes' values.

```java
public void inOrder(Node root) {
    if (root == null) return;
    inOrder(root.left);
    System.out.print(root.data + " ");
    inOrder(root.right);
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
