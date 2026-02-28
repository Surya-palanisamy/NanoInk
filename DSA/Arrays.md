# Arrays

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

## Jump game (leetcode 55)

```java
class Solution {
    public boolean canJump(int[] nums) {
        int m=0;
        for(int i=0;i<nums.length;i++){
            if(i>m) return false;
            m=Math.max(m,i+nums[i]);
        }
        return true;

    }
}
```

- Approach: Keep track of the maximum reachable index (`m`). If current index `i` is greater than `m`, it's unreachable. Otherwise, update `m`.
- Dry run (nums = [2,3,1,1,4]):
  - i=0, val=2 → m=max(0, 0+2)=2
  - i=1, val=3 → m=max(2, 1+3)=4
  - Return true since we can reach the end.

## maximum subarray (leetcode 53)

```java
class Solution {
    public int maxSubArray(int[] nums) {
        int max = nums[0];
        int s = nums[0];

        for (int i = 1; i < nums.length; i++) {
            s = Math.max(nums[i], s + nums[i]);
            max = Math.max(max, s);
        }

        return max;
    }
}
```

- Approach: Kadane's Algorithm. Maintain current sum `s` and a global `max`. Start a new subarray if `nums[i]` is greater than `s + nums[i]`.
- Dry run (nums = [-2,1,-3,4,-1,2,1,-5,4]):
  - i=0, max=-2, s=-2
  - i=1, num=1, s=max(1,-1)=1, max=1
  - i=2, num=-3, s=max(-3,-2)=-2, max=1
  - i=3, num=4, s=max(4,2)=4, max=4
  - Returns max=6 for subarray [4,-1,2,1].

## longest Consecutive Sequence

```java
import java.util.HashSet;
import java.util.Set;
class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int n : nums) set.add(n);
        int longest = 0;
        for (int n : set) {
            if (!set.contains(n - 1)) {
                int curr = n, temp = 1;

                while (set.contains(curr + 1)) {
                    curr++;
                    temp++;
                }

                longest = Math.max(longest, temp);
            }
        }
        return longest;
    }
}
```

- Approach: Use a HashSet. Only start counting sequence lengths from sequence starting numbers (where `n - 1` doesn't exist in the set).
- Dry run (nums = [100,4,200,1,3,2]):
  - `100`: 99 not in set, checks only 100, length 1.
  - `4`: 3 is in set, skip.
  - `200`: 199 not in set, checks only 200, length 1.
  - `1`: 0 not in set, counts 1,2,3,4, length 4.
  - Return max length 4.

## Single Number (leetcode 136)

```java
class Solution {
    public int singleNumber(int[] nums) {
        int r=0;
        for(var i:nums){
            r^=i;
        }
        return r;

    }
}
```

- Approach: XOR operation. `a ^ a = 0` and `a ^ 0 = a`. XORing all numbers leaves the unique one.
- Dry run (nums = [4,1,2,1,2]):
  - r = 0 ^ 4 = 4
  - r = 4 ^ 1 = 5
  - r = 5 ^ 2 = 7
  - r = 7 ^ 1 = 6
  - r = 6 ^ 2 = 4 → Answer is 4.

## missing numbers (leetcode 667)

```java
class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length;
        int expectedSum = n * (n + 1) / 2;
        int actualSum = 0;
        for (int num : nums) {
            actualSum += num;
        }
        return expectedSum - actualSum;
    }
}
```

- Approach: Calculate expected sum of `1` to `n` using formula `n * (n + 1) / 2`, subtract actual sum to find missing number.
- Dry run (nums = [3,0,1], n=3):
  - Expected sum = 3 \* 4 / 2 = 6
  - Actual sum = 3 + 0 + 1 = 4
  - Missing number = 6 - 4 = 2.

## Can Place Flowers (leetcode 605)

```java
class Solution {
    public boolean canPlaceFlowers(int[] flowerbed, int n) {
        int count = 0;
        for (int i = 0; i < flowerbed.length; i++) {
            if (flowerbed[i] == 0 && (i == 0 || flowerbed[i - 1] == 0) && (i == flowerbed.length - 1 || flowerbed[i + 1] == 0)) {
                flowerbed[i] = 1;
                count++;
            }
        }
        return count >= n;
    }
}
```

- Approach: Iterate through the flowerbed. Place a flower if the current plot is empty and its neighbors are also empty. Count the number of flowers placed.
- Dry run (flowerbed = [1,0,0,0,1], n=1):
  - i=0: plot=1, neighbors=0,0 → skip
  - i=1: plot=0, neighbors=1,0 → place flower, count=1
  - i=2: plot=0, neighbors=0,1 → skip
  - i=3: plot=0, neighbors=1,0 → place flower, count=2
  - i=4: plot=1, neighbors=0,0 → skip
  - Return true since we can place 2 flowers.


## product except self (leetcode 238)

```java
class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        result[0] = 1;
        for(int i = 1; i < n; i++){
            result[i] = result[i - 1] * nums[i - 1];
        }
        int right = 1;
        for(int i = n - 1; i >= 0; i--){
            result[i] = result[i] * right;
            right = right * nums[i];
        }
        return result;
    }
}
```

- Approach: Calculate prefix products and suffix products separately, then multiply them.
- Dry run (nums = [1,2,3,4]):
  - Left products: [1, 1, 2, 6]
  - Right products: [24, 12, 4, 1]
  - Result: [24, 12, 8, 6]