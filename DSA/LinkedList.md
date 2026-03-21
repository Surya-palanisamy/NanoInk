# Linked List

## Detect cycle in linked list (leetcode 141)

[141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)

![Cycle](https://res.cloudinary.com/dwdbp4qpe/image/upload/v1772339718/circularlinkedlist_oggopt.png)

> Given `head`, the head of a linked list, determine if the linked list has a cycle in it.

**Example 1:**
**Input:** `head = [3,2,0,-4], pos = 1`
**Output:** `true`

**Example 2:**
**Input:** `head = [1], pos = -1`
**Output:** `false`

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

![https://res.cloudinary.com/dwdbp4qpe/image/upload/v1772347011/Image-3_t2fcxt.gif](https://res.cloudinary.com/dwdbp4qpe/image/upload/v1772347011/Image-3_t2fcxt.gif)

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

## Middle of linked list (leetcode 876)

[876. Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/)

> Given the `head` of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.

**Example 1:**
**Input:** `head = [1,2,3,4,5]`
**Output:** `[3,4,5]`

**Example 2:**
**Input:** `head = [1,2,3,4,5,6]`
**Output:** `[4,5,6]`

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

## Remove nth node from end of linked list (leetcode 19)

[19. Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)

> Given the `head` of a linked list, remove the `nth` node from the end of the list and return its head.

**Example 1:**
**Input:** `head = [1,2,3,4,5], n = 2`
**Output:** `[1,2,3,5]`

**Example 2:**
**Input:** `head = [1], n = 1`
**Output:** `[]`

```java
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode slow=head;
        ListNode fast=head;
        for(int i=0;i<=n;i++){
            fast=fast.next;
        }
        if(fast==null) return head.next;
        while(fast!=null){
            slow=slow.next;
            fast=fast.next;
        }
        slow.next=slow.next.next;
        return head;
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

[142. Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/)

> Given the `head` of a linked list, return the node where the cycle begins. If there is no cycle, return `null`.

**Example 1:**
**Input:** `head = [3,2,0,-4], pos = 1`
**Output:** `tail connects to node index 1`

**Example 2:**
**Input:** `head = [1,2], pos = 0`
**Output:** `tail connects to node index 0`

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

- Approach: Phase 1: Detect cycle with Floyd's algorithm. Phase 2: Reset slow to head, move both one step at a time until they meet at cycle start.
- Dry run (head=[3,2,0,-4], tail→node 1):
  - Phase 1: slow=3,fast=3 → slow=2,fast=0 → slow=0,fast=2 → slow=-4,fast=-4 → meet!
  - Phase 2: slow=head=3, fast=-4. Move both by 1: slow=2, fast=0 → slow=0, fast=2 → slow=2, fast=-4... eventually both meet at node 2 (cycle start).

## Remove cycle from linked list

> Given the `head` of a linked list that may contain a cycle, remove the cycle if it exists by setting the `next` pointer of the last node in the cycle to `null`.

**Example 1:**
**Input:** `head = [1,2,3,4,5], pos=2 (cycle on 3)`
**Output:** `[1,2,3,4,5]`

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

- Approach: Detect cycle with Floyd's algorithm. Once cycle start is found, track the previous node. When slow and fast meet at cycle start, set prev.next = null to break the cycle.
- Dry run (head = [1,2,3,4,5], 5 → node 3):
  - Phase 1: Detect meeting point at node 4
  - Phase 2: Move slow to head, fast stays at meeting
  - slow=1 fast=4 → slow=2 fast=5 → slow=3 fast=3 → cycle start found
  - prev=5 (tracked during Phase 2) → prev.next = null
  - Result: 1 → 2 → 3 → 4 → 5 → null

## Merge Two Sorted Lists (leetcode 21)

[21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)

> You are given the heads of two sorted linked lists `list1` and `list2`.

> Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

> Return *the head of the merged linked list*.

Example 1:

**Input:** list1 = [1,2,4], list2 = [1,3,4]
**Output:** [1,1,2,3,4,4]

**Example 2:**

**Input:** list1 = [], list2 = []
**Output:** []

**Example 3:**

**Input:** list1 = [], list2 = [0]
**Output:** [0]

```java
class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(-1);
        ListNode current = dummy;

        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                current.next = list1;
                list1 = list1.next;
            } else {
                current.next = list2;
                list2 = list2.next;
            }
            current = current.next;
        }
        if (list1 != null) {
            current.next = list1;
        } else {
            current.next = list2;
        }
        return dummy.next;
    }
}
```

| Type             | Value               |
| ---------------- | ------------------- |
| Time Complexity  | **O(n + m)**        |
| Space Complexity | **O(1)** (in-place) |

- Dry run (list1=[1,2,4], list2=[1,3,4]):
  - Compare 1<=1 → pick list1(1), list1→2
  - Compare 2>1 → pick list2(1), list2→3
  - Compare 2<=3 → pick list1(2), list1→4
  - Compare 4>3 → pick list2(3), list2→4
  - Compare 4<=4 → pick list1(4), list1→null
  - list1 null → attach list2(4)
  - Result: [1,1,2,3,4,4]

---

## Remove Linked List Elements (LeetCode 203)

[203. Remove Linked List Elements](https://leetcode.com/problems/remove-linked-list-elements/)

> Given the `head` of a linked list and an integer `val`, remove all the nodes of the linked list that has `Node.val == val`, and return _the new head_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/03/06/removelinked-list.jpg)

**Input:** head = [1,2,6,3,4,5,6], val = 6
**Output:** [1,2,3,4,5]

**Example 2:**

**Input:** head = [], val = 1
**Output:** []

**Example 3:**

**Input:** head = [7,7,7,7], val = 7
**Output:** []

```java
class Solution {

    public ListNode removeElements(ListNode head, int val) {
        ListNode dummy = new ListNode(-1);
        dummy.next = head;
        ListNode curr = dummy;
        while (curr.next != null) {
            if (curr.next.val == val) {
                curr.next = curr.next.next;
            } else {
                curr = curr.next;
            }
        }
        return dummy.next;
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Approach: Use a dummy node to easily handle cases where the head itself needs to be removed. Iterate through the list using a `curr` pointer and skip over nodes that match `val`.
- Dry run (head=[1,2,6,3,4,5,6], val=6):
  - dummy=[-1], curr=dummy, curr.next=[1]
  - Iterates past 1, 2. curr at 2. curr.next is 6.
  - curr.next.val == 6. Skip 6 -> curr.next = [3].
  - Iterates past 3, 4, 5. curr at 5. curr.next is 6.
  - curr.next.val == 6. Skip 6 -> curr.next = null.
  - Returns dummy.next -> [1,2,3,4,5].

---

## Remove Duplicates from Sorted List (LeetCode 83)

[83. Remove Duplicates from Sorted List](https://leetcode.com/problems/remove-duplicates-from-sorted-list/)

> Given the `head` of a sorted linked list, _delete all duplicates such that each element appears only once_. Return _the linked list **sorted** as well_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/01/04/list1.jpg)

**Input:** head = [1,1,2]
**Output:** [1,2]

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/01/04/list2.jpg)

**Input:** head = [1,1,2,3,3]
**Output:** [1,2,3]

```java
class Solution {

    public ListNode deleteDuplicates(ListNode head) {
        ListNode curr = head;
        while (curr != null && curr.next != null) {
            if (curr.val == curr.next.val) {
                curr.next = curr.next.next;
            } else {
                curr = curr.next;
            }
        }
        return head;
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Approach: Since the linked list is sorted, duplicates are grouped together. Iterate with a `curr` pointer and if it's identical to the next node's value, skip the next node.
- Dry run (head=[1,1,2,3,3]):
  - curr=1. curr.next is 1. Match -> skip the next 1 -> curr.next=[2...].
  - curr=1. curr.next is 2. No match -> curr=2.
  - curr=2. curr.next is 3. No match -> curr=3.
  - curr=3. curr.next is 3. Match -> skip the next 3 -> curr.next=null.
  - curr=3. curr.next is null -> loop ends.
  - Returns [1,2,3].

