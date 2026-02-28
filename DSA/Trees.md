## depth of binary tree (leetcode 104)

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

- Approach: Recursively calculate depth of left and right subtrees.
- Dry run (root=[3,9,20,null,null,15,7]):
  - Left depth = 1 + max(0,0) = 1
  - Right depth = 1 + max(1,1) = 2
  - Return max(1,2) = 2

