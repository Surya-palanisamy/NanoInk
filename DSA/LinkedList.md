# Linked List
Currently no linked list problems in the source file. Add implementations here as you go (e.g., reverse list, detect cycle, merge two lists) and include dry runs.

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

## detect cycle in linked list (leetcode 141)

```java 
class Solution {
    public boolean hasCycle(ListNode head) {
        if(head==null){
            return false;
        }
        ListNode slow=head;
        ListNode fast=head;
        while(fast!=null && fast.next!=null){
            slow=slow.next;
            fast=fast.next.next;
            if(slow==fast){
                return true;
            }
        }
        return false;
    }
}
```

- Approach: Use Floyd's Tortoise and Hare algorithm. Move slow pointer by 1 and fast by 2. If they meet, there's a cycle.
- Dry run (head=[3,2,0,-4]):
  - slow=3, fast=3
  - slow=2, fast=2
  - slow=0, fast=0
  - slow=-4, fast=-4 → cycle detected → true
