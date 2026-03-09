# Arrays

## Two Sum (LeetCode 1)

[1. Two Sum](https://leetcode.com/problems/two-sum/)

> Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

        You may assume that each input would have exactly one solution, and you may not use the same element twie    .
     You can return the answer in any order.

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

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

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(n)** |

- Approach: Use a HashMap to store seen values and check for complement in O(n).
- Dry run (nums = [2,7,11,15], target = 9):
  - i=0, num=2, diff=7, map={}, not found → put 2:0
  - i=1, num=7, diff=2, map has 2 → return [0,1
]

---

## 3SUM (leeto
de 15)

[15. 3Sum](https://leetcode.com/problems/3sum/)

> Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.

> Notice that the solution set must not contain duplicate triplets.

**Example 1:**

**Input:** nums = [-1,0,1,2,-1,-4]
**Output:** [[-1,-1,2],[-1,0,1]]
**Explantion:**
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.

**Example 2:**

**Input:** nums = [0,1,1]
**Output:** []
**Explanation:** The only possible triplet does not sum up to 0.

**Example 3:**

**Input:** nums = [0,0,0]
**Output:** [[0,0,0]]
**Explanation:** The only possible triplet sums up to 0.

```java
import java.util.*;
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(nums);
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1])
                continue;
            int l = i + 1, r = nums.length - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum == 0) {
                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                    while (l < r && nums[l] == nums[l + 1])
                        l++;
                    while (l < r && nums[r] == nums[r - 1])
                        r--;
                    l++;
                    r--;
                } else if (sum < 0)
                    l++;
                else
                    r--;
            }
        }
        return res;
    }
}
``
`

---

## Remove Duplicates from Sorted Array (LeetCode 26)

[26. Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)

> Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept th
     same.

     Consider the number of unique elements in nums to be k​​​​​​​​​​​​​​. After removing duplicates, return the number of unique e    ements k.

    The first k elements of nums should contain the unique numbers in sorted order. The remaining elements beyond index k - 1 can be ignored.

Example 1:

Input: nums = [1,1,2]
Output: 2, nums = [1,2,_]

Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).

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

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Approach: Two pointers; write unique elements forward.
- Dry run (nums = [1,1,2]):
  - j=1
  - i=1: nums[1]=1 == nums[0]=1 → skip
  - i=2: nums[2]=2 != nums[1]=1 → nums[1]=2, j=2
  - Result length=2; array becomes [1,2,_]

---

## Search Insert Position (LeetCode 35)

[35. Search Insert Position](https://leetcode.com/problems/search-insert-position/)

> Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inse
    ted in order.

    You must write an algorithm with O(log n) runtime complexity.

Example 1:

Input: nums = [1,3,5,6], target = 5
Output: 2

Example 2:

Input: nums = [1,3,5,6], target = 2
Output: 1

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

| Type  | Value        |
| ----- | ------------ |
| Time  | **O(log n)** |
| Space | **O(1)**     |

- Approach: Binary search; return insertion point when not found.
- Dry run (nums=[1,3,5,6], target=5):
  - left=0,right=3 → mid=1,val=3 < 5 → left=2
  - left=2,right=3 → mid=2,val=5 == 5 → return 2

---

## Plus One (LeetCode 66)

[66. Plus One](https://leetcode.com/problems/plus-one/)

> you are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contai
     any leading 0's.

    Increment the large integer by one and return the resulting array of digits.

Example 1:

Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
Incrementing by one gives 123 + 1 = 124.
Thus, the result should be [1,2,4].

Example 2:

Input: digits = [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321.
Incrementing by one gives 4321 + 1 = 4322.
Thus, the result should be [4,3,2,2].

Example 3:

Input: digits = [9]
Output: [1,0]
Explanation: The array represents the integer 9.
Incrementing by one gives 9 + 1 = 10.
Thus, the result should be [1,0].

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

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(n)** |

- Approach: Increment from end; handle carry-overflow.
- Dry run 1 (digits=[1,2,3]): i=2 → 3<9 → set 4 and return [1,2,4]
- Dry run 2 (digits=[9,9,9]): i=2→0, i=1→0, i=0→0 → new array [1,0,0,0]

---

## Move Zeroes (LeetCode 283)

[283. Move Zeroes](https://leetcode.com/problems/move-zeroes/)

> Given an integer array nums, move all 0's to the end of it while maintaining the relative order of 
> he non-zero elements.

> Note that you must do this in-place without making a copy of the array.

Example 1:

Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
Example 2:

Input: nums = [0]
Output: [0]

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

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Approach: Compact non-zeros then fill the rest with zeros.
- Dry run (nums=[0,1,0,3,12]):
  - First pass writes 1,3,12 to positions 0..2 → insertPos=3
  - Fill positions 3..4 with 0 → [1,3,12,0,0]

---

## Majority Element (LeetCode 169)

[169. Majority Element](https://leetcode.com/problems/majority-element/)

> Given an array nums of size n, ret
u> n the majority element.

> The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

Example 1:

Input: nums = [3,2,3]
Output: 3
Example 2:

Input: nums = [2,2,1,1,1,2,2]
Output: 2

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

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

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

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Dry run (N=5, A=[3,6,1,4,2]):
  - i=0: left=A[4]=2>3? no; right=A[1]=6>3? yes → 1
  - i=1: left=3>6? no; right=1>6? no → 0
  - i=2: left=6>1? yes; right=4>1? yes → 2
  - i=3: left=1>4? no; right=2>4? no → 0
  - i=4: left=4>2? yes; right=3>2? yes → 2
  - Output: 1 0 2 0 2

---

## Largest Perimeter Triangle (LeetCode 976)

[976. Largest Perimeter Triangle](https://leetcode.com/problems/largest-perimeter-triangle/)

> Given an integer array nums, return the largest perimeter of a triangle with a non-zero area, formed from three of these lengths. If it is impossible to form any triangle of a non-zero area, return 0.

Example 1:

Input: nums = [2,1,2]
Output: 5
Explanation: You can form a triangle with three side lengths: 1, 2, and 2.
Example 2:

Input: nums = [1,2,1,10]
Output: 0
Explanation:
You cannot use the side lengths 1, 1, and 2 to form a triangle.
You cannot use the side lengths 1, 1, and 10 to form a triangle.
You cannot use the side lengths 1, 2, and 10 to form a triangle.
As we cannot use any three side lengths to form a triangle of non-zero area, we return 0.

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

| Type  | Value          |
| ----- | -------------- |
| Time  | **O(n log n)** |
| Space | **O(1)**       |

- Approach: Sort; check triangle inequality from largest side.
- Dry run (nums=[2,1,2]): sort→[1,2,2], check 2+1>2 → true → perimeter=5

## Jump Game (leetcode 55)

[55. Jump Game](https://leetcode.com/problems/jump-game/)

> You are given an integer array `nums`. You are initially positioned at the array's **first index**, and each element in the array represents your maximum ju
m     length at that position.

    Return `true` _if you can reach the last index, or_ `false` _otherwise_.

**Example 1:**

**Input:** nums = [2,3,1,1,4]
**Output:** true
**Explanation:** Jump 1 step from index 0 to 1, then 3 steps to the last index.

**Example 2:**

**Input:** nums = [3,2,1,0,4]
**Output:** false
**Explanation:** You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.

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

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Approach: Keep track of the maximum reachable index (`m`). If current index `i` is greater than `m`, it's unreachable. Otherwise, update `m`.
- Dry run (nums = [2,3,1,1,4]):
  - i=0, val=2 → m=max(0, 0+2)=2
  - i=1, val=3 → m=max(2, 1+3)=4
  - Return true since we can reach the end.

##
 Maximum Subarray (leetcode 53)

[53. Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)

> Given an integer array `nums`, find the subarray w*th the *argest sum, and return *its sum*.

**Example 1:**

**Input:** nums = [-2,1,-3,4,-1,2,1,-5,4]
**Output:** 6
**Explanation:** The subarray [4,-1,2,1] has the largest sum 6.

**Example 2:**

**Input:** nums = [1]
**Output:** 1
**Explanation:** The subarray [1] has the largest sum 1.

**Example 3:**

**Input:** nums = [5,4,-1,7,8]
**Output:** 23
**Explanation:** The subarray [5,41,7,8] has the largest sum 23.

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

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Approach: Kadane's Algorithm. Maintain current sum `s` and a global `max`. Start a new subarray if `nums[i]` is greater than `s + nums[i]`.
- Dry run (nums = [-2,1,-3,4,-1,2,1,-5,4]):
  - i=0, max=-2, s=-2
  - i=1, num=1, s=max(1,-1)=1, max=1
  - i=2, num=-3, s=max(-3,-2)=-2, max=1
  - i=3, num=4, s=max(4,2)=4, max=4
  - Returns max=6 for subarray [4,-1,2,1].

## Longest Consecutive Sequence (leetcode 128)

[128. Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)

> Given an unsorted array of integers nums, return the length of the longest 
c    nsecutive elements sequence.

    You must write an algorithm that runs in O(n) time.

Example 1:

Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
Example 2:

Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9

Example 3:

Input: nums = [1,0,1,2]
Output: 3

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

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(n)** |

- Approach: Use a HashSet. Only start counting sequence lengths from sequence starting numbers (where `n - 1` doesn't exist in the set).
- Dry run (nums = [100,4,200,1,3,2]):
  - `100`: 99 not in set, checks only 100, length 1.
  - `4`: 3 is in set, skip.
  - `200`: 199 not in set, checks only 200, length 1.
  - `1`: 0 not in set, counts 1,2,3,4, length 4.
  - Return max length 4.

## Single Number (leetcode 136)

[136. Single Number](https://leetcode.com/problems/single-number/)

> Given a non-empty array of integers nums, every element appears twice exc
e    t for one. Find that single one.

     You must implement a solution with a linear runtime complexity and use only constant extra space.

Example 1:

Input: nums = [2,2,1]
Output: 1

Example 2:

Input: nums = [4,1,2,1,2]
Output: 4

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

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Approach: XOR operation. `a ^ a = 0` and `a ^ 0 = a`. XORing all numbers leaves the unique one.
- Dry run (nums = [4,1,2,1,2]):
  - r = 0 ^ 4 = 4
  - r = 4 ^ 1 = 5
  - r = 5 ^ 2 = 7
  - r = 7 ^ 1 = 6
  - r = 6 ^ 2 = 4 → Answer is 4.

## Missing Number (leetcode 268)

[268. Missing Number](https://leetcode.com/problems/missing-number/)

Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.

Example 1:

Input: nums = [3,0,1]
Output: 2

Explanation:
n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.

Example 2:

Input: nums = [0,1]
Output: 2

Explanation:
n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums.

Example 3:

Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8

Explanation:
n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums.

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

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Approach: Calculate expected sum of `1` to `n` using formula `n * (n + 1) / 2`, subtract actual sum to find missing number.
- Dry run (nums = [3,0,1], n=3):
  - Expected sum = 3 \* 4 / 2 = 6
  - Actual sum = 3 + 0 + 1 = 4
  - Missing number = 6 - 4 = 2.

## Can Place Flowers (leetcode 605)

[605. Can Place Flowers](https://leetcode.com/problems/can-place-flowers/)

> You have a long flowerbed in which some of the plots are planted, and some are not. However, flower
s    cannot be planted in adjacent plots.

    Given an integer array flowerbed containing 0's and 1's, where 0 means empty and 1 means not empty, and an integer n, return true if n new flowers can be planted in the flowerbed without violating the no-adjacent-flowers rule and false otherwise.

Example 1:

Input: flowerbed = [1,0,0,0,1], n = 1
Output: true
Example 2:

Input: flowerbed = [1,0,0,0,1], n = 2
Output: false

```java
class Solution {
    public boolean canPlaceFlowers(int[] flowerbed, int n) {
        int len=flowerbed.length;
        for(int i=0;i<len;i+=2){
            if(flowerbed[i]==0){
                if(i==len-1 || flowerbed[i]==flowerbed[i+1]){
                    n--;
                }
                else{
                    i++;
                }
            }
        }
        return n<=0;
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Approach: Iterate through the flowerbed. Place a flower if the current plot is empty and its neighbors are also empty. Count the number of flowers placed.
- Dry run (flowerbed = [1,0,0,0,1], n=1):
  - i=0: plot=1, neighbors=0,0 → skip
  - i=1: plot=0, neighbors=1,0 → place flower, count=1
  - i=2: plot=0, neighbors=0,1 → skip
  - i=3: plot=0, neighbors=1,0 → place flower, count=2
  - i=4: plot=1, neighbors=0,0 → skip
  - Return true since we can place 2 flowers.

## Product of Array Except Self (leetcode 238)

[238. Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)

> Given an integer array nums, return an array answer such that answer[i] is equal to the product of
    all the elements of nums except nums[i].

    The product of any prefix or suffix of n    ms is guaranteed to fit in a 32-bit integer.
    You must write an algorithm that runs in O(n) time and without using the division operation.

Example 1:

Input: nums = [1,2,3,4]
Output: [24,12,8,6]
Example 2:

Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]

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

| Feature         | Value      |
| --------------- | ---------- |
| Time            | O(n)       |
| Space           | O(1) extra |
| Works with zero | Yes        |

- Approach: Calculate prefix products and suffix products separately, then multiply them.
- Dry run (nums = [1,2,3,4]):
  - Left products: [1, 1, 2, 6]
  - Right products: [24, 12, 4, 1]
  - Result: [24, 12, 8, 6]

## Coin Change Ways

> Given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money, return the number of combinations that make up that amount.

```java
public class CoinChangeWays {
    public static int countWays(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;
        for (int coin : coins) {
            for (int i = coin; i <= amount; i++) {
                dp[i] += dp[i - coin];
            }
        }
        ret          urn dp[amount];
    ----------}
}

```

| Type  |\ Value              |
| ----- | ------     ------------ |
| Time  | **O(n \* amount)** |
| Space | **O(amount)**      |

- Dry run (coins={1,2,5}, amount=5):
  - start: [1,0,0,0,0,0]
  - coin=1 → [1,,1,1,1,1]
  - coin=2 → [1,1,2,2,3,3]
  - coin=5 → [1,1,2,2,3,4] → ways=4

## Best Time to Buy and Sell Stock (leetcode 121)

[121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

> You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

```java
class Solution {
    public int maxProfit(int[] prices) {
        int p=prices[0],sell=0;
        for(int i:prices){
            if(i<p) p=i;
            else if (i-p>sell) sell=i-p;
        }
     return sell;
}}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Approach: Track min price and max profit.
- Dry run (prices = [7,1,5,3,6,4]):
  - p=7, sell=0
  - i=1: p=1, sell=0
  - i=2: p=1, sell=4
  - i=3: p=1, sell=4
  - i=4: p=1, sell=5
  - i=5: p=1, sell=5 → Answer is 5.

## Distribute Candies (leetcode 575)

[575. Distribute Candies](https://leetcode.com/problems/distribute-candies/)

> Alice has `n` candies, where the `ith` candy is of type `candyType[i]`. Alice noticed that she started to gain weight, so she visited a doctor. The doctor advised Alice to only eat `n / 2` of the candies she has (`n` is always even). Return the maximum number of different types of candies she can eat if she only eats `n / 2` of them.

```java
import java.util.HashSet;

class Solution {
    public int distributeCandies(int[] candyType) {
        HashSet<Integer> set = new HashSet<>();
        for (int c : candyType) {
            set.add(c);
        }
        int uniqueTypes = set.size();
        int canEat = candyType.length / 2;
        return Math.min(uniqueTypes, canEat);
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(n)** |

- Approach: Use a HashSet to count unique candy types and return the minimum of unique types or `n/2`.
- Dry run (candyType = [1,1,2,3]):
  - n = 4, canEat = 2
  
## Kth Largest Element in an Array (LeetCode 215)

- set = {1, 2, 3}, uniqueTypes = 3
  - Math.min(3, 2) → Answer is 2.

---

## Kth Largest Element in an Array (LeetCode 215)

[215. Kth Largest Element in an Array*(ht*ps://le*tcode.com/problems/kth-large*t
-element-in-an-array/)

> Given an integer array `nums` and an integer `k`, return *the* `kth` *larg    st element in the array*.

    Note that it is the `kth` largest element in the sorted order, not the `kth` distinct element.
    Can you solve it without sorting?

**Example 1:**

**Input:** nums = [3,2,1,5,6,4], k = 2
**Output:** 5

**Example 2:**

**Input:** nums = [3,2,3,1,2,4,5,5,6], k = 4
**Output:** 4

```java
class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> h=new PriorityQueue<>();
        for(int i=0;i<nums.length;i++){
            if(h.size()<k || nums[i]>h.peek()){
                h.add(nums[i])

| Type  | Value          |
| ----- | -------------- |
| Time  | **O(n log k)** |
| Space | **O(k)**       |

- Approach: Use a Min-Heap of size `k`. We maintain the `k` largest elements in the heap, and the root is the $k^{th}$ largest element overall.
- Dry run (nums = [3,2,1,5,6,4], k = 2):
  - i=0, num=3: heap=[3]
  - i=1, num=2: heap=[2, 3]
  - i=2, num=1: heap=[1, 2, 3] → size > 2 (poll) → heap=[2, 3]
  - i=3, num=5: heap=[2, 3, 5] → pool → heap=[3, 5];  - i=4, num=6: heap=[3, 5, 6] → pool → heap=[5, 6]
    i=5, num=4: heap=[4, 5, 6] → pool → heap=[5, 6]
    Return heap.peek() = 5

 --
         }
            if(h.size()>k){
                h.poll();
            }
        }
        return h.peek();
    }
}
```

| Type  | Value          |
| ----- | -------------- |
| Time  | **O(n log k)** |
| Space | **O(k)**       |

- Approach: Use a Min-Heap of size `k`. We maintain the `k` largest elements in the heap, and the root is the $k^{th}$ largest element overall.
- Dry run (nums = [3,2,1,5,6,4], k = 2):
  - i=0, num=*: heap=[3]
  - i=1, num=2: heap=[2, 3]
  - i=2, n*m=>: heap=[1, 2, 3] → size > 2 (poll) → heap=[2, 3]
  3, num=5: heap=[2, 3, 5] → pool → heap=[3, 5]
  - i=4, num=6: heap=[3, 5, 6] → pool → heap=[5, 6]
  - i=5, num=4: heap=[4, 5, 6] → pool → heap=[5, 6]
  - Return heap.peek() = 5

---

## Container With Most Water (Leetcode 11)

[11. Container With Most Water](https://leetcode.com/problems/container-with-most-water/)

> Y
ou are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `ith` line are `(i, 0)` and `(i, height[i])`.

> Find two lines that together with the x-axis form a container, such that the container contains the most water.

> Return *the maximum amount of water a container can store*.
> **Notice** that you may not slant the container.

![water container](https://s3-lc-upl

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Approach: Two pointers strategy (left and right). At each step, calculate the area and move the pointer that points to the shorter line, trying to find a taller line to maximize the area.
- Dry run (height = [1,8,6,2,5,4,8,3,7]):
  - left=0 (val 1), right=8 (val 7) → w=8, h=1, area=8, max=8. Move left.o  - left=1 (val 8), right=8 (val 7) → w=7, h=7, area=49, max=49. Move right.a  d Continues until pointers meet... returns max area 49.

.s-
3## Search in Rotated Sorted Array (LeetCode 33)

.amazonaws.com/uploads/2018/07/17/question_11.jpg)

**Input:** height = [1,8,6,2,5,4,8,3,7]
**Output:** 49

**Explanation:** The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.

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
                left+*;
          * } else
  *           * right-*;
  *     }*        return *x;
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Approach: Two pointers strategy (left and right). At each step, calculate the area and move the pointer that points to the shorter line, trying to find a taller line to maximize the area.
- Dry run (height = [1,8,6,2,5,4,8,3,7]):
  - left=0 (val 1), right=8 (val 7) → w=8, h=1, area=8, max=8. Move left.
  - left=1 (val 8), right=8 (val 7) → w=7, h=7, area=49, max=49. Move right.
  - Continues until pointers meet... returns max area 49.

---

## Search in Rotated Sorted Array (LeetCode 33)

[33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)

> There is an integer array `nums` sorted in ascending order (with **distinct** values).

> Prior to being passed to your function, `nums` is **possibly left rotated** at an unknown index `k` (`1 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (**0-indexed**). For example, `[0,1,2,4,5,6
```


| Type  | Value        |
| ----- | ------------ |
| Time  | **O(log n)** |
| Space | **O(1)**     |

- Approach: Binary search. Identify which half of the array is sorted (`left` to `mid`, or `mid` to `right`). If the target falls into the sorted half's range, move onto that half; otherwise, search the other half.
- Dry run (nums = [4,5,6,7,0,1,2], target = 0):
  - left=0, right=6: mid=3 (val 7). Target 0 != 7.
  - Left half 7[4,5,6,7]` is sorted. Target 0 is NOT between 4 and 7. Thus move to right half: left = mid + 1 = 4.
  - left=4, right=6: mid=5 (val 1). Target 0 != 1.
  - Right half ][1,2]` is sorted. Target 0 is NOT between 1 and 2. Thus move to left half: right = mid - 1 = 4.
  - left=4, right=4: mid=4 (val 0). Target 0 == 0. Return 4. might be left rotated by `3` indices and become `[4,5,6,7,0,1,2]`.

> Given the array `nums` **after** the possible rotation and an integer `target`, return *the index of* `target` *if it is in* `nums`*, or* `-1` *if it is not in* `nums`.

> You must write an algorithm with `O(log n)` runtime complexity.

**Example 1:**

**Input:** nums = [4,5,6,7,0,1,2], target = 0
**Output:** 4

**Example 2:**

**Input:** nums = [4,5,6,7,0,1,2], target = 3
**Output:** -1

**Example 3:**

**Input:** nums = [1], target = 0
**Output:** -1

```java
class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = (left + right) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }
}
```

| Type  | Value        |
| ----- | ------------ |
| Time  | **O(log n)** |
| Space | **O(1)**     |

- Approach: Binary search. Identify which half of the array is sorted (`left` to `mid`, or `mid` to `right`). If the target falls into the sorted half's range, move onto that half; otherwise, search the other half.
- Dry run (nums = [4,5,6,7,0,1,2], target = 0):
  - left=0, right=6: mid=3 (val 7). Target 0 != 7.
  - Left half `[4,5,6,7]` is sorted. Target 0 is NOT between 4 and 7. Thus move to right half: left = mid + 1 = 4.
  - left=4, right=6: mid=5 (val 1). Target 0 != 1.
  - Right half `[1,2]` is sorted. Target 0 is NOT between 1 and 2. Thus move to left half: right = mid - 1 = 4.
  - left=4, right=4: mid=4 (val 0). Target 0 == 0. Return 4.

---
