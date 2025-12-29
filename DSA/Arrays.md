## Two Sum (LeetCode 1)

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int diff = target - nums[i];
            if (map.containsKey(diff))
                return new int[]{map.get(diff), i};
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}
```

- Approach: Use a HashMap to store seen values and check for complement in O(n).
- Dry run (nums = [2,7,11,15], target = 9):
  - i=0, num=2, diff=7, map={}, not found → put 2:0
  - i=1, num=7, diff=2, map has 2 → return [0,1]

---

## Remove Duplicates from Sorted Array (LeetCode 26)

```java
class Solution {
    public int removeDuplicates(int[] nums) {
        int j = 1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[i - 1])
                nums[j++] = nums[i];
        }
        return j;
    }
}
```

- Approach: Two pointers; write unique elements forward.
- Dry run (nums = [1,1,2]):
  - j=1
  - i=1: nums[1]=1 == nums[0]=1 → skip
  - i=2: nums[2]=2 != nums[1]=1 → nums[1]=2, j=2
  - Result length=2; array becomes [1,2,_]

---

## Search Insert Position (LeetCode 35)

```java
class Solution {
    public int searchInsert(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return left;
    }
}
```

- Approach: Binary search; return insertion point when not found.
- Dry run (nums=[1,3,5,6], target=5):
  - left=0,right=3 → mid=1,val=3 < 5 → left=2
  - left=2,right=3 → mid=2,val=5 == 5 → return 2

---

## Plus One (LeetCode 66)

```java
class Solution {
    public int[] plusOne(int[] digits) {
        for (int i = digits.length - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        int[] res = new int[digits.length + 1];
        res[0] = 1;
        return res;
    }
}
```

- Approach: Increment from end; handle carry-overflow.
- Dry run 1 (digits=[1,2,3]): i=2 → 3<9 → set 4 and return [1,2,4]
- Dry run 2 (digits=[9,9,9]): i=2→0, i=1→0, i=0→0 → new array [1,0,0,0]

---

## Move Zeroes (LeetCode 283)

```java
class Solution {
    public void moveZeroes(int[] nums) {
        int insertPos = 0;
        for (int num : nums) {
            if (num != 0) {
                nums[insertPos++] = num;
            }
        }
        while (insertPos < nums.length) {
            nums[insertPos++] = 0;
        }
    }
}
```

- Approach: Compact non-zeros then fill the rest with zeros.
- Dry run (nums=[0,1,0,3,12]):
  - First pass writes 1,3,12 to positions 0..2 → insertPos=3
  - Fill positions 3..4 with 0 → [1,3,12,0,0]

---

## Majority Element (LeetCode 169)

```java
class Solution {
    public int majorityElement(int[] nums) {
        int count = 0, candidate = 0;
        for (int num : nums) {
            if (count == 0) candidate = num;
            count += (num == candidate) ? 1 : -1;
        }
        return candidate;
    }
}
```

- Approach: Boyer-Moore Voting.
- Dry run (nums=[3,2,3]):
  - count=0 → candidate=3, count=1
  - num=2 → count=0
  - count=0 → candidate=3, count=1 → answer=3

---

## Neighbors Are Greater (Circular)

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        int[] A = new int[N];
        for (int i = 0; i < N; i++) A[i] = sc.nextInt();
        for (int i = 0; i < N; i++) {
            int count = 0;
            if (A[(i - 1 + N) % N] > A[i]) count++;
            if (A[(i + 1) % N] > A[i]) count++;
            System.out.print(count + " ");
        }
    }
}
```

- Dry run (N=5, A=[3,6,1,4,2]):
  - i=0: left=A[4]=2>3? no; right=A[1]=6>3? yes → 1
  - i=1: left=3>6? no; right=1>6? no → 0
  - i=2: left=6>1? yes; right=4>1? yes → 2
  - i=3: left=1>4? no; right=2>4? no → 0
  - i=4: left=4>2? yes; right=3>2? yes → 2
  - Output: 1 0 2 0 2

---

## Largest Perimeter Triangle (LeetCode 976)

```java
import java.util.*;

class Solution {
    public int largestPerimeter(int[] nums) {
        Arrays.sort(nums);
        for (int i = nums.length - 1; i >= 2; i--) {
            if (nums[i - 1] + nums[i - 2] > nums[i]) {
                return nums[i - 1] + nums[i - 2] + nums[i];
            }
        }
        return 0;
    }
}
```

- Approach: Sort; check triangle inequality from largest side.
- Dry run (nums=[2,1,2]): sort→[1,2,2], check 2+1>2 → true → perimeter=5
