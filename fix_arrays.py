#!/usr/bin/env python3
"""Fix corrupted sections in DSA/Arrays.md"""
import os

filepath = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'DSA', 'Arrays.md')

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Read {len(lines)} lines")

# Find key markers (0-indexed)
container_header = None
first_separator_after_container = None
level_order_header = None
file_end = len(lines)

for i, line in enumerate(lines):
    s = line.strip()
    if s == '## Container With Most Water (Leetcode 11)' and container_header is None:
        container_header = i
        print(f"  Container header at line {i+1}")
    if s == '---' and container_header is not None and i > container_header + 5:
        if first_separator_after_container is None:
            first_separator_after_container = i
            print(f"  First --- after container at line {i+1}")
    if s == '## Level order' or s.startswith('## Level order'):
        level_order_header = i
        print(f"  Level order header at line {i+1}")

# Also find the --- before level order
level_sep = None
if level_order_header is not None:
    for j in range(level_order_header - 1, max(0, level_order_header - 3), -1):
        if lines[j].strip() == '---':
            level_sep = j
            break

# Find end of level order code block (last ``` in file)
level_code_end = None
if level_order_header is not None:
    for j in range(len(lines) - 1, level_order_header, -1):
        if lines[j].strip() == '```':
            level_code_end = j
            break

print(f"  Level separator at line {level_sep + 1 if level_sep else 'N/A'}")
print(f"  Level code end at line {level_code_end + 1 if level_code_end else 'N/A'}")

# ===== Build the new file =====
new_lines = []

# Part 1: Everything before the Container section (lines 1 to container_header-1)
new_lines.extend(lines[:container_header])

# Part 2: Clean Container With Most Water section
container_replacement = """\
## Container With Most Water (Leetcode 11)

[11. Container With Most Water](https://leetcode.com/problems/container-with-most-water/)

> You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `ith` line are `(i, 0)` and `(i, height[i])`.

> Find two lines that together with the x-axis form a container, such that the container contains the most water.

> Return *the maximum amount of water a container can store*.
> **Notice** that you may not slant the container.

**Example 1:**

**Input:** height = [1,8,6,2,5,4,8,3,7]
**Output:** 49
**Explanation:** The max area of water the container can contain is 49.

**Example 2:**

**Input:** height = [1,1]
**Output:** 1

```java
class Solution {
    public int maxArea(int[] h) {
        int left = 0;
        int right = h.length - 1;
        int mx = 0;
        while (left < right) {
            int hi = Math.min(h[left], h[right]);
            int w = right - left;
            mx = Math.max(mx, hi * w);
            if (h[left] < h[right]) {
                left++;
            } else {
                right--;
            }
        }
        return mx;
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Approach: Two pointers strategy (left and right). At each step, calculate the area and move the pointer that points to the shorter line, trying to find a taller line to maximize the area.
- Dry run (height = [1,8,6,2,5,4,8,3,7]):
  - left=0 (h=1), right=8 (h=7) \u2192 w=8, area=8, max=8. Move left.
  - left=1 (h=8), right=8 (h=7) \u2192 w=7, area=49, max=49. Move right.
  - left=1 (h=8), right=7 (h=3) \u2192 w=6, area=18, max=49. Move right.
  - Continues until pointers meet \u2192 returns 49.

"""
for line in container_replacement.split('\n'):
    new_lines.append(line + '\n')

# Part 3: Everything from the --- separator through to just before Level order section
# (this includes the Search in Rotated Sorted Array section)
# first_separator_after_container is the --- between Container and Search
if level_sep is not None:
    # Include from the separator through to the --- before Level order (exclusive)
    new_lines.extend(lines[first_separator_after_container:level_sep])
else:
    # No level separator found, include up to level_order_header
    new_lines.extend(lines[first_separator_after_container:level_order_header])

# Part 4: Clean Level order section
level_order_replacement = """\
---

## N-ary Tree Level Order Traversal (LeetCode 429)

[429. N-ary Tree Level Order Traversal](https://leetcode.com/problems/n-ary-tree-level-order-traversal/)

> Given an n-ary tree, return the level order traversal of its nodes' values.

**Example 1:**
**Input:** root = [1,null,3,2,4,null,5,6]
**Output:** [[1],[3,2,4],[5,6]]

**Example 2:**
**Input:** root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
**Output:** [[1],[2,3,4,5],[6,7,8,9,10],[11,12,13],[14]]

```java
class Solution {
    public List<List<Integer>> levelOrder(Node root) {

        List<List<Integer>> res = new ArrayList<>();
        if(root == null) return res;

        Queue<Node> q = new LinkedList<>();
        q.add(root);

        while(!q.isEmpty()){

            int size = q.size();
            List<Integer> level = new ArrayList<>();

            for(int i = 0; i < size; i++){

                Node node = q.poll();
                level.add(node.val);

                for(Node child : node.children){
                    q.add(child);
                }
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

- Approach: BFS using a queue. Process nodes level by level, adding all children to the queue.
- Dry run (root = [1,null,3,2,4,null,5,6]):
  - Queue: [1]. Level 1: [1]. Add children 3, 2, 4.
  - Queue: [3,2,4]. Level 2: [3,2,4]. Add children 5, 6.
  - Queue: [5,6]. Level 3: [5,6].
  - Result: [[1],[3,2,4],[5,6]]
"""
for line in level_order_replacement.split('\n'):
    new_lines.append(line + '\n')

# Write it out
with open(filepath, 'w', encoding='utf-8', newline='\n') as f:
    f.writelines(new_lines)

print(f"\nWrote {len(new_lines)} lines. Done!")
