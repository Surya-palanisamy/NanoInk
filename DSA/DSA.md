## 1. Two Sum (LeetCode 1)

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

**Approach:** Use a HashMap to store seen values and check for complement in O(n).

**Example:**

- Input: `nums = [2, 7, 11, 15]`, `target = 9`
- Initial State: `map = empty HashMap`
- Iteration 1: `i = 0`, `nums[i] = 2`
  - `diff = 9 - 2 = 7`
  - `map.containsKey(7)` is false
  - `map.put(2, 0)` → `map = {2: 0}`
- Iteration 2: `i = 1`, `nums[i] = 7`
  - `diff = 9 - 7 = 2`
  - `map.containsKey(2)` is true
  - Return `[0, 1]`
- **Output:** `[0, 1]`

---

## 2. Reverse String (LeetCode 344)

```java
class Solution {
    public void reverseString(char[] s) {
        int left = 0, right = s.length - 1;
        while (left < right) {
            char temp = s[left];
            s[left] = s[right];
            s[right] = temp;
            left++; right--;
        }
    }
}
```

**Approach:** Swap characters from both ends moving toward the center

**Example:**

- Input: `s = ['h', 'e', 'l', 'l', 'o']`
- Initial State: `left = 0`, `right = 4`
- Iteration 1: `left = 0`, `right = 4`
  - Swap: `s = ['o', 'e', 'l', 'l', 'h']`
  - `left++` → `left = 1`, `right--` → `right = 3`
- Iteration 2: `left = 1`, `right = 3`
  - Swap: `s = ['o', 'l', 'l', 'e', 'h']`
  - `left++` → `left = 2`, `right--` → `right = 2`
- Iteration 3: `left = 2`, `right = 2`
  - Condition `left < right` is false, loop terminates
- **Output:** `['o', 'l', 'l', 'e', 'h']`

---

## 3. Palindrome Number (LeetCode 9)

```java
class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0) return false;
        int rev = 0, temp = x;
        while (temp != 0) {
            rev = rev * 10 + temp % 10;
            temp /= 10;
        }
        return rev == x;
    }
}
```

**Approach:** Reverse digits and check if equal to original number

**Example:**

- Input: `x = 121`
- Initial State: `x < 0` is false, `rev = 0`, `temp = 121`
- Iteration 1: `rev = 0 * 10 + 121 % 10 = 1`, `temp = 12`
- Iteration 2: `rev = 1 * 10 + 12 % 10 = 12`, `temp = 1`
- Iteration 3: `rev = 12 * 10 + 1 % 10 = 121`, `temp = 0`
- Iteration 4: `temp = 0`, loop terminates
- **Output:** `true` (121 == 121)

---

## 4. Remove Duplicates from Sorted Array (LeetCode 26)

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

**Approach:** Move unique elements to the front using two pointers.

**Example:**

- Input: `nums = [1, 1, 2]`
- Initial State: `j = 1`
- Iteration 1: `i = 1`, `nums[1] = 1`, `nums[0] = 1` → Not equal, skip
- Iteration 2: `i = 2`, `nums[2] = 2`, `nums[1] = 1` → Not equal, `nums[1] = 2`, `j = 2`
- **Output:** `2` (first 2 elements are unique: `[1, 2, _]`)

---

## 5. Search Insert Position (LeetCode 35)

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

**Approach:** Return index if found, else position where it fits.

**Example:**

- Input: `nums = [1, 3, 5, 6]`, `target = 5`
- Initial State: `left = 0`, `right = 3`
- Iteration 1: `mid = 1`, `nums[1] = 3` < `5`, `left = 2`
- Iteration 2: `mid = 2`, `nums[2] = 5` == `5`, return `2`
- **Output:** `2`

---

## 6. Sqrt(x) (LeetCode 69)

```java
class Solution {
    public int mySqrt(int x) {
        long left = 0, right = x, ans = 0;
        while (left <= right) {
            long mid = (left + right) / 2;
            if (mid * mid <= x) {
                ans = mid;
                left = mid + 1;
            } else right = mid - 1;
        }
        return (int) ans;
    }
}
```

**Approach:** Use binary search to find integer square root.

**Example:**

- Input: `x = 8`
- Initial State: `left = 0`, `right = 8`, `ans = 0`
- Iteration 1: `mid = 4`, `4 * 4 = 16 > 8`, `right = 3`
- Iteration 2: `mid = 1`, `1 * 1 = 1 <= 8`, `ans = 1`, `left = 2`
- Iteration 3: `mid = 2`, `2 * 2 = 4 <= 8`, `ans = 2`, `left = 3`
- Iteration 4: `mid = 3`, `3 * 3 = 9 > 8`, `right = 2`
- Iteration 5: `left > right`, loop terminates
- **Output:** `2`

---

## 7. Plus One (LeetCode 66)

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

**Approach:** Add one from last digit and manage carry overflow.

**Example 1:**

- Input: `digits = [1, 2, 3]`
- Iteration 1: `i = 2`, `digits[2] = 3 < 9`, increment to `4`
- **Output:** `[1, 2, 4]`

**Example 2:**

- Input: `digits = [9, 9, 9]`
- Iteration 1-3: All elements are 9, set to 0
- Create new array of size 4: `[1, 0, 0, 0]`
- **Output:** `[1, 0, 0, 0]`

---

## 8. Move Zeroes (LeetCode 283)

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

**Approach:** Fill non-zero elements first, then zeros

**Example:**

- Input: `nums = [0, 1, 0, 3, 12]`
- First loop: Move non-zero elements → `[1, 3, 12, 3, 12]`, `insertPos = 3`
- Second loop: Fill remaining with zeros → `[1, 3, 12, 0, 0]`
- **Output:** `[1, 3, 12, 0, 0]`

---

## 9. Length of Last Word (LeetCode 58)

```java
class Solution {
    public int lengthOfLastWord(String s) {
        String[] words = s.trim().split(" ");
        return words[words.length - 1].length();
    }
}
```

**Approach:** Split string by spaces

**Example:**

- Input: `s = "Hello World"`
- After trim: `"Hello World"`
- After split: `["Hello", "World"]`
- Last word: `"World"`, length = `5`
- **Output:** `5`

---

## 10. Roman to Integer (LeetCode 13)

```java
class Solution {
    public int romanToInt(String s) {
        int sum = 0;
        int num = 0;
        for (int i = s.length() - 1; i >= 0; i--) {
            switch (s.charAt(i)) {
                case 'I': num = 1; break;
                case 'V': num = 5; break;
                case 'X': num = 10; break;
                case 'L': num = 50; break;
                case 'C': num = 100; break;
                case 'D': num = 500; break;
                case 'M': num = 1000; break;
            }
            if (num * 4 < sum) sum -= num;
            else sum += num;
        }
        return sum;
    }
}
```

**Approach:** Iterate from right to left, if digit value is less than 1/4 of sum, subtract; else add

**Example:**

- Input: `s = "MCMXCIV"`
- Process: V(5) → I(1-) → C(100) → X(10-) → M(1000) → C(100-) → M(1000)
- Result: 1000 + 900 + 90 + 4 = 1994
- **Output:** `1994`

---

## 11. Majority Element (LeetCode 169)

```java
class Solution {
    public int majorityElement(int[] nums) {
        int count = 0, candidate = 0;
        for (int num : nums) {
            if (count == 0) {
                candidate = num;
            }
            count += (num == candidate) ? 1 : -1;
        }
        return candidate;
    }
}
```

**Approach:** Use Boyer-Moore Voting Algorithm to find the majority element in O(n) time and O(1) space.

**Example:**

- Input: `nums = [3, 2, 3]`
- Iteration 1: `num = 3`, `count = 0`, `candidate = 3`, `count = 1`
- Iteration 2: `num = 2`, `count = 0`
- Iteration 3: `num = 3`, `count = 0`, `candidate = 3`, `count = 1`
- **Output:** `3`

---

## 12. Right Triangle Star Pattern

```java
class Solution {
    public void printRightTriangle(int n) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}
```

**Logic:** The outer loop controls the number of rows. The inner loop controls the number of stars in each row.

**Example (n = 5):**

```
*
* *
* * *
* * * *
* * * * *
```

---

## 13. Inverted Right Triangle Star Pattern

```java
class Solution {
    public void printInvertedRightTriangle(int n) {
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}
```

**Logic:** The outer loop iterates from n down to 1. The inner loop prints stars equal to the current row number.

**Example (n = 5):**

```
* * * * *
* * * *
* * *
* *
*
```

---

## 14. Left Triangle Star Pattern

```java
class Solution {
    public void printLeftTriangle(int n) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n - i; j++) {
                System.out.print("  ");
            }
            for (int k = 1; k <= i; k++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}
```

**Logic:** For each row, first print n - i spaces, then print i stars.

**Example (n = 5):**

```
        *
      * *
    * * *
  * * * *
* * * * *
```

---

## 15. Pyramid Star Pattern

```java
class Solution {
    public void printPyramid(int n) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n - i; j++) {
                System.out.print(" ");
            }
            for (int k = 1; k <= 2 * i - 1; k++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}
```

**Logic:** For each row i, print n - i spaces, then 2 \* i - 1 stars.

**Example (n = 5):**

```
    *
   ***
  *****
 *******
*********
```

---

## 16. Inverted Pyramid Star Pattern

```java
class Solution {
    public void printInvertedPyramid(int n) {
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= n - i; j++) {
                System.out.print(" ");
            }
            for (int k = 1; k <= 2 * i - 1; k++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}
```

**Logic:** Similar to the pyramid, but the outer loop iterates from n down to 1.

**Example (n = 5):**

```
*********
 *******
  *****
   ***
    *
```

---

## 17. Diamond Star Pattern

```java
class Solution {
    public void printDiamond(int n) {
        // Upper part of the diamond (Pyramid)
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n - i; j++) {
                System.out.print(" ");
            }
            for (int k = 1; k <= 2 * i - 1; k++) {
                System.out.print("*");
            }
            System.out.println();
        }
        // Lower part of the diamond (Inverted Pyramid)
        for (int i = n - 1; i >= 1; i--) {
            for (int j = 1; j <= n - i; j++) {
                System.out.print(" ");
            }
            for (int k = 1; k <= 2 * i - 1; k++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}
```

**Logic:** Combine the pyramid pattern for the upper half and the inverted pyramid pattern for the lower half.

**Example (n = 5):**

```
    *
   ***
  *****
 *******
*********
 *******
  *****
   ***
    *
```

---

## 18. Opposite Zero and One

```java
class Main {
    public static void main(String[] args) {
        int n = 4;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print((i + j) % 2 + " ");
            }
            System.out.println();
        }
    }
}
```

**Output:**

```
0
1 0
0 1 0
1 0 1 0
```

---

## 19. Diagonal Cross (Both Diagonals)

```java
class Main {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (i == j || i + j == n + 1)
                    System.out.print("* ");
                else
                    System.out.print("  ");
            }
            System.out.println();
        }
    }
}
```

**Output:**

```
*       *
  *   *
    *
  *   *
*       *
```

---

## 20. Diagonal Numbers

```java
class Main {
    public static void main(String[] args) {
        int n = 4;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (i == j)
                    System.out.print(i + " ");
                else
                    System.out.print("  ");
            }
            System.out.println();
        }
    }
}
```

**Output:**

```
1
  2
    3
      4
```

---

## 21. Diagonal Cross Numbers

```java
class Main {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (i == j || i + j == n + 1)
                    System.out.print(i + " ");
                else
                    System.out.print("  ");
            }
            System.out.println();
        }
    }
}
```

**Output:**

```
1       1
  2   2
    3
  4   4
5       5
```

---

## 22. Neighbors are Greater

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        int[] A = new int[N];
        for (int i = 0; i < N; i++)
            A[i] = sc.nextInt();

        for (int i = 0; i < N; i++) {
            int count = 0;
            if (A[(i - 1 + N) % N] > A[i]) count++;  // left neighbor
            if (A[(i + 1) % N] > A[i]) count++;      // right neighbor
            System.out.print(count);
            System.out.print(" ");
        }
    }
}
```

---

## 23. Check if a Number is Even or Odd

```java
int n = 13;
if ((n & 1) == 0)
    System.out.println("Even");
else
    System.out.println("Odd");  // Output: Odd
```

---

## 24. Multiply a Number by 2

```java
int n = 7;
int result = n << 1;  // Multiply by 2
System.out.println(result);  // 14
```

---

## 25. Divide a Number by 2

```java
int n = 14;
int result = n >> 1;  // Divide by 2
System.out.println(result);  // 7
```

---

## 26. Check if a Number is Power of 2

```java
int n = 16;
if (n > 0 && (n & (n - 1)) == 0)
    System.out.println("Power of 2");
else
    System.out.println("Not power of 2");
```

---

## 27. Count Number of 1s in Binary

```java
int n = 15, count = 0;
while (n != 0) {
    count += (n & 1);
    n = n >> 1;
}
System.out.println("Number of 1s = " + count);  // 4
```

---

## 28. Print Powers of 2

```java
int n = 10;
for (int i = 0; i <= n; i++) {
    System.out.println("2^" + i + " = " + (1 << i));
}
```

---

## 29. Set a Specific Bit

```java
int n = 10, k = 2;
n = n | (1 << k);
System.out.println(n);  // 14
```

---

## 30. Clear a Specific Bit

```java
int n = 14, k = 1;
n = n & ~(1 << k);
System.out.println(n);  // 12
```

---

## 31. Toggle a Specific Bit

```java
int n = 12, k = 2;
n = n ^ (1 << k);
System.out.println(n);  // 8
```

**Step by step:**

1. Convert to binary: `n = 12` → `1100`, `k = 2` → toggle 3rd bit from right
2. Create mask: `1 << 2 = 100 (binary) = 4`
3. Apply XOR:
   - `n     = 1100 (12)`
   - `mask  = 0100 (4)`
   - `n^mask= 1000 (8)`

---

## 32. Count Trailing Zeros

```java
int n = 40, count = 0;
while ((n & 1) == 0 && n != 0) {
    count++;
    n = n >> 1;
}
System.out.println("Trailing zeros = " + count);  // 3
```

---

## 33. Count Ways Coins (Dynamic Programming)

```java
public class CoinChangeWays {
    public static int countWays(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;  // base case
        for (int coin : coins) {
            for (int i = coin; i <= amount; i++) {
                dp[i] += dp[i - coin];
            }
        }
        return dp[amount];
    }

    public static void main(String[] args) {
        int[] coins = {1, 2, 5};
        int amount = 5;
        System.out.println("Total ways: " + countWays(coins, amount));
    }
}
```

**Example walkthrough for amount = 5, coins = {1, 2, 5}:**

Initialize: `dp = [1, 0, 0, 0, 0, 0]`

Process coin 1: `dp = [1, 1, 1, 1, 1, 1]`

Process coin 2: `dp = [1, 1, 2, 2, 3, 3]`

Process coin 5: `dp = [1, 1, 2, 2, 3, 4]`

**Output:** `4` ways (1+1+1+1+1, 1+1+1+2, 1+2+2, 5)

---

## 34. Valid Parentheses

```java
import java.util.*;

public class Main {
    public static boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else {
                if (stack.isEmpty() || stack.pop() != c) return false;
            }
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        String s = "{[()]}";
        System.out.println(isValid(s));   // true
        String t = "{[(])}";
        System.out.println(isValid(t));   // false
    }
}
```

---

## 35. Largest Perimeter Triangle

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

**Example:**

- Input: `nums = [2, 1, 2]`
- After sort: `[1, 2, 2]`
- Check: `2 + 1 > 2` ✓
- **Output:** `5`

---

## 36. Count Bits

```java
public int[] countBits(int n) {
    int[] ans = new int[n + 1];
    ans[0] = 0;
    for (int i = 1; i <= n; i++) {
        ans[i] = ans[i >> 1] + (i & 1);
    }
    return ans;
}
```

**Step-by-step for n = 5:**

- `i = 1`: `ans[0] + (1 & 1) = 0 + 1 = 1`
- `i = 2`: `ans[1] + (2 & 1) = 1 + 0 = 1`
- `i = 3`: `ans[1] + (3 & 1) = 1 + 1 = 2`
- `i = 4`: `ans[2] + (4 & 1) = 1 + 0 = 1`
- `i = 5`: `ans[2] + (5 & 1) = 1 + 1 = 2`

**Output:** `[0, 1, 1, 2, 1, 2]`

---

## 37. Anagram

```java
class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] freq = new int[26];  // for lowercase letters
        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;    // count letters in s
            freq[t.charAt(i) - 'a']--;    // subtract letters in t
        }
        for (int count : freq) {
            if (count != 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.isAnagram("listen", "silent"));  // true
        System.out.println(sol.isAnagram("hello", "world"));    // false
        System.out.println(sol.isAnagram("ab", "ba"));          // true
    }
}
```

---

## 38. Frequency of Character

```java
class Main {
    public static void main(String[] args) {
        String s = "SURYAS";
        int[] freq = new int[26];

        // Count frequency
        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'A']++;
        }

        // Print frequencies
        for (int i = 0; i < freq.length; i++) {
            if (freq[i] > 0) {
                System.out.println((char)(i + 'A') + " " + freq[i]);
            }
        }
    }
}
```

**Output:**

```
A 1
R 1
S 2
U 1
Y 1
```

---

## 39. Matrix 90 Degree Rotation

```java
public class Main {
    public static void main(String args[]) {
        int a[][] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        int temp = 1;

        // Transpose
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                temp = a[i][j];
                a[i][j] = a[j][i];
                a[j][i] = temp;
            }
        }

        // Reverse each column
        for (int i = 0; i < 3; i++) {
            int s = 0, e = 2, t = 0;
            while (s < e) {
                t = a[s][i];
                a[s][i] = a[e][i];
                a[e][i] = t;
                s++;
                e--;
            }
        }

        // Print result
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                System.out.print(a[i][j]);
            }
            System.out.println();
        }
    }
}
```

---
