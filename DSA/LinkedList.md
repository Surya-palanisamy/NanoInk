# Linked List

![Cycle](https://res.cloudinary.com/dwdbp4qpe/image/upload/v1772339718/circularlinkedlist_oggopt.png)
## detect cycle in linked list (leetcode 141)

> Given `head`, the head of a linked list, determine if the linked list has a cycle in it.

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

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Approach: Use Floyd's Tortoise and Hare algorithm. Move slow pointer
  by 1 and fast by 2. If they meet, there's a cycle.
- Dry run (head=[3,2,0,-4], tail connects to index 1):
  - slow=3, fast=3
  - slow=2, fast=0
  - slow=0, fast=2
  - slow=-4, fast=-4 → cycle detected → true

## middle of linked list (leetcode 876)

> Given the `head` of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.

```java
class Solution {
    public ListNode middleNode(ListNode head) {
        if(head==null){
            return null;
        }
        ListNode slow=head;
        ListNode fast=head;
        while(fast!=null && fast.next!=null){
            slow=slow.next;
            fast=fast.next.next;
        }
        return slow;
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Approach: Use two pointers. Move slow by 1 and fast by 2. When fast
  reaches the end, slow will be at the middle.
- Dry run (head=[1,2,3,4,5]):
  - slow=1, fast=1
  - slow=2, fast=3
  - slow=3, fast=5
  - fast.next=null → stop → middle = 3

## remove nth node from end of linked list (leetcode 19)

> Given the `head` of a linked list, remove the `nth` node from the end of the list and return its head.

```java
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy=new ListNode(0);
        dummy.next=head;
        ListNode slow=dummy;
        ListNode fast=dummy;
        for(int i=0;i<=n;i++){
            fast=fast.next;
        }
        while(fast!=null){
            slow=slow.next;
            fast=fast.next;
        }
        slow.next=slow.next.next;
        return dummy.next;
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Approach: Maintain a gap of n between fast and slow pointers. When
  fast reaches end, slow will be just before the node to remove.
- Dry run (head=[1,2,3,4,5], n=2):
  - initial: dummy→1→2→3→4→5
  - move fast 3 steps → fast at 3
  - move both:
    - fast=4 slow=1
    - fast=5 slow=2
    - fast=null slow=3
  - delete slow.next (4)
  - result: 1→2→3→5

## Find Start of Cycle (LeetCode 142)

> Given the `head` of a linked list, return the node where the cycle begins. If there is no cycle, return `null`.

```java
class Solution {
    public ListNode detectCycle(ListNode head) {
        ListNode slow=head;
        ListNode fast=head;
        while(fast!=null && fast.next!=null){
            slow=slow.next;
            fast=fast.next.next;
            if(slow==fast){
                slow=head;
                while(slow!=fast){
                    slow=slow.next;
                    fast=fast.next;
                }
                return slow;
            }
        }
        return null;
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Approach: Use Floyd's Tortoise and Hare algorithm. Move slow pointer
  by 1 and fast by 2. If they meet, there's a cycle.
- Dry run (head=[3,2,0,-4], tail connects to index 1):
  - slow=3, fast=3
  - slow=2, fast=0
  - slow=0, fast=2
  - slow=-4, fast=-4 → cycle detected → true

## remove cycle from linked list

> Given the `head` of a linked list that may contain a cycle, remove the cycle if it exists by setting the `next` pointer of the last node in the cycle to `null`.

```java
class Solution {
    public void removeCycle(ListNode head) {
        if(head==null || head.next==null){
            return;
        }
        ListNode slow=head;
        ListNode fast=head;
        boolean hasCycle=false;
        while(fast!=null && fast.next!=null){
            slow=slow.next;
            fast=fast.next.next;
            if(slow==fast){
                hasCycle=true;
                break;
            }
        }
        if(!hasCycle){
            return;
        }
        slow=head;
        ListNode prev=null;
        while(slow!=fast){
            prev=fast;
            slow=slow.next;
            fast=fast.next;
        }
        prev.next=null;
}
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- head = [1,2,3,4,5] with 5 pointing back to node 3
- detect meeting at node 4 (example)
- move slow to head, fast stays at meeting
- both move:
  - slow=1 fast=4
  - slow=2 fast=5
  - slow=3 fast=3 → start of cycle
- prev is node 5 → set prev.next = null
  final list: 1 → 2 → 3 → 4 → 5 → null
