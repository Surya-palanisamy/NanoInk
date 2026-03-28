## Even or Odd (GeeksforGeeks)

[Check whether a given number is even or odd](https://www.geeksforgeeks.org/check-if-a-number-is-odd-or-even-using-bitwise-operators/)

> Given an integer `n`, determine if it is even or odd using bitwise operators.

**Example 1:**
**Input:** `n = 13`
**Output:** `Odd`

**Example 2:**
**Input:** `n = 8`
**Output:** `Even`

```java
int n = 13;
if ((n & 1) == 0) System.out.println("Even");
else System.out.println("Odd");

```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(1)** |
| Space | **O(1)** |

- Dry run: 13 in binary is 1101; 1101 & 0001 = 0001 → odd.

---

## Digital Root (LeetCode 258)

[258. Add Digits](https://leetcode.com/problems/add-digits/)

> Given an integer `num`, repeatedly add all its digits until the result has only one digit, and return it.

**Example 1**
**Input:** `n = 13`
**Output:** `4`
**Explanation:** 1 + 3 = 4.

```java
class Solution {
    public int addDigits(int n) {
        if (n == 0) return 0;
        return 1 + (n - 1) % 9;
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(1)** |
| Space | **O(1)** |

- Approach: Math/Digital Root formula `1 + (n - 1) % 9`.
- Dry run (n = 13): 1 + (13 - 1) % 9 = 1 + 12 % 9 = 1 + 3 = 4.

## Multiply by 2

[Multiply with 2 using Bitwise Operators](https://www.geeksforgeeks.org/multiply-an-integer-with-2-using-bitwise-operators/)

> Given an integer `n`, multiply it by 2 using bitwise shift operators.

**Example:**
**Input:** `n = 7`
**Output:** `14`

```java
int n = 7;
int result = n << 1;
System.out.println(result);
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(1)** |
| Space | **O(1)** |

- Dry run: 7(0111) << 1 → 1110(14).

---

## Divide by 2

[Divide by 2 using Bitwise Operators](https://www.geeksforgeeks.org/)

> Given an integer `n`, divide it by 2 using bitwise shift operators.

**Example:**
**Input:** `n = 14`
**Output:** `7`

```java
int n = 14;
int result = n >> 1;
System.out.println(result);
```

| Type  | Value    |
| ----- | -------- |
| Space | **O(1)** |

- Dry run: 14(1110) >> 1 → 0111(7).

---

## Power of 2 (LeetCode 231)

[231. Power of Two](https://leetcode.com/problems/power-of-two/)

> Given an integer `n`, check if it is a power of 2 using bitwise operators.

**Example 1:**
**Input:** `n = 16`
**Output:** `Power of 2`

**Example 2:**
**Input:** `n = 13`
**Output:** `Not power of 2`

```java
int n = 16;
if (n > 0 && (n & (n - 1)) == 0)
    System.out.println("Power of 2");
else
    System.out.println("Not power of 2");
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(1)** |
| Space | **O(1)** |

- Dry run: 16(10000) & 15(01111) = 0 → power of 2.

---

## Count Number of 1s (LeetCode 191)

[191. Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)

> Given an integer `n`, count the number of set bits (1s) in its binary representation.

**Example:**
**Input:** `n = 15`
**Output:** `4`
**Explanation:** 15 in binary is 1111, which has 4 set bits.

```java
int n = 15, count = 0;
while (n != 0) {
    count += (n & 1);
    n = n >> 1;
}
System.out.println(count);
```

| Type  | Value        |
| ----- | ------------ |
| Time  | **O(log n)** |
| Space | **O(1)**     |

- Dry run: 15(1111) → bits: 1+1+1+1=4.

---

## Print Powers of 2

[GeeksforGeeks](https://www.geeksforgeeks.org/)

> Given an integer `n`, print all powers of 2 from $2^0$ to $2^n$.

**Example:**
**Input:** `n = 5`
**Output:** `1, 2, 4, 8, 16, 32`

```java
int n = 5;
for (int i = 0; i <= n; i++) {
    System.out.println("2^" + i + " = " + (1 << i));
}
```

| Type | Value    |
| ---- | -------- |
| Time | **O(n)** |

- Dry run: i=0→1, i=1→2, i=2→4, i=3→8, i=4→16, i=5→32.

---

## Set a Specific Bit (GeeksforGeeks)

[GeeksforGeeks](https://www.geeksforgeeks.org/set-k-th-bit-given-number/)

> Given an integer `n` and a zero-indexed position `k`, set the `k`-th bit of `n` to 1.

**Example:**
**Input:** `n = 10, k = 2`
**Output:** `14`
**Explanation:** 10(1010) | 4(0100) = 14(1110)

```java
int n = 10, k = 2;
n = n | (1 << k);
System.out.println(n);
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(1)** |
| Space | **O(1)** |

- Dry run: n=10(1010), mask=1<<2=0100 → 1010|0100=1110(14).

---

## Clear a Specific Bit (GeeksforGeeks)

[GeeksforGeeks](https://www.geeksforgeeks.org/)

> Given an integer `n` and a zero-indexed position `k`, clear the `k`-th bit of `n` (set it to 0).

**Example:**
**Input:** `n = 14, k = 1`
**Output:** `12`
**Explanation:** 14(1110) & ~(0010) = 12(1100)

```java
int n = 14, k = 1;
n = n & ~(1 << k);
System.out.println(n);
```

````
| Type  | Value    |
| ----- | -------- |
| Time  | **O(1)** |
| Space | **O(1)** |

- Dry run: mask=~(0010)=...1101 → 1110 & 1101 = 1100(12).

---

## Toggle a Specific Bit (GeeksforGeeks)

[GeeksforGeeks](https://www.geeksforgeeks.org/)

> Given an integer `n` and a zero-indexed position `k`, toggle the `k`-th bit of `n`.

**Example:**
**Input:** `n = 12, k = 2`
**Output:** `8`
**Explanation:** 12(1100) ^ 4(0100) = 8(1000)

```java
int n = 12, k = 2;
n = n ^ (1 << k);
System.out.println(n);

````

| Type  | Value    |
| ----- | -------- |
| Time  | **O(1)** |
| Space | **O(1)** |

- Dry run: 1100 ^ 0100 = 1000(8).

---

## Count Trailing Zeros (GeeksforGeeks)

[GeeksforGeeks](https://www.geeksforgeeks.org/)

> Given an integer `n`, count the number of trailing zeros in its binary representation.

**Example:**
**Input:** `n = 40`
**Output:** `3`
**Explanation:** 40 in binary is 101000, which has 3 trailing zeros.

```java
int n = 40, count = 0;
while ((n & 1) == 0 && n != 0) {
    count++;
    n = n >> 1;
}
System.out.println(count);

```

| Type  | Value        |
| ----- | ------------ |
| Time  | **O(log n)** |
| Space | **O(1)**     |

- Dry run: 40(101000) → shift until LSB=1 → zeros=3.

---

## Count Bits (LeetCode 338)

[338. Counting Bits](https://leetcode.com/problems/counting-bits/)

> Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (0 <= i <= n), `ans[i]` is the number of 1's in the binary representation of `i`.

**Example 1:**
**Input:** `n = 2`
**Output:** `[0,1,1]`
**Explanation:** `0 --> 0`, `1 --> 1`, `2 --> 10`

**Example 2:**
**Input:** `n = 5`
**Output:** `[0,1,1,2,1,2]`

```java
public int[] countBits(int n) {
    int[] ans = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        ans[i] = ans[i >> 1] + (i & 1);
    }
    return ans;
}

```

| i   | Binary | i>>1 | ans[i>>1] | (i&1) | ans[i] |
| --- | ------ | ---- | --------- | ----- | ------ |
| 1   | 001    | 0    | 0         | 1     | 1      |
| 2   | 010    | 1    | 1         | 0     | 1      |
| 3   | 011    | 1    | 1         | 1     | 2      |
| 4   | 100    | 2    | 1         | 0     | 1      |
| 5   | 101    | 2    | 1         | 1     | 2      |

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(n)** |

- Dry run (n=5): ans=[0,1,1,2,1,2] using recurrence ans[i]=ans[i>>1]+(i&1).

---

## Minimum Changes To Make Alternating Binary String (LeetCode 1758)

[1758. Minimum Changes To Make Alternating Binary String](https://leetcode.com/problems/minimum-changes-to-make-alternating-binary-string/)

> You are given a string `s` consisting only of the characters `'0'` and `'1'`. In one operation, you can change any `'0'` to `'1'` or vice versa.
> The string is called alternating if no two adjacent characters are equal. For example, the string `"010"` is alternating, while the string `"0100"` is not.
> Return *the **minimum** number of operations needed to make* `s` *alternating*.

**Example 1:**

**Input:** s = "0100"
**Output:** 1
**Explanation:** If you change the last character to '1', s will be "0101", which is alternating.

**Example 2:**

**Input:** s = "10"
**Output:** 0
**Explanation:** s is already alternating.

**Example 3:**

**Input:** s = "1111"
**Output:** 2
**Explanation:** You need two operations to reach "0101" or "1010".

```java
class Solution {
    public int minOperations(String s) {
        int p1 = 0, p2 = 0;
        char e1, e2;
        for (int i = 0; i < s.length(); i++) {
            e1 = (i % 2 == 0) ? '0' : '1';
            e2 = (i % 2 == 0) ? '1' : '0';
            if (e1 != s.charAt(i))
                p1++;
            if (e2 != s.charAt(i))
                p2++;
        }
        return Math.min(p1, p2);
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Dry run (s = "0100"):
  - Expect 1: `0101` (start with '0'). Differs at index 3 -> error count = 1.
  - Expect 2: `1010` (start with '1'). Differs at indices 0, 1, 2 -> error count = 3.
  - Return `Math.min(1, 3)` = 1.

---

## Add Binary (leetcode 67)

[67. Add Binary](https://leetcode.com/problems/add-binary/)

> Given two binary strings `a` and `b`, return *their sum as a binary string*.

**Example 1:**

**Input:** a = "11", b = "1"
**Output:** "100"

**Example 2:**

**Input:** a = "1010", b = "1011"
**Output:** "10101"

```java
class Solution {
    public String addBinary(String a, String b) {
        StringBuilder r = new StringBuilder();
        int i = a.length() - 1;
        int j = b.length() - 1;
        int carry = 0;
        while (i >= 0 || j >= 0 || carry == 1) {
            int s = carry;
            if (i >= 0)
                s += a.charAt(i--) - '0';
            if (j >= 0)
                s += b.charAt(j--) - '0';
            r.append(s % 2);
            carry = s / 2;
        }
        return r.reverse().toString();
    }
}
```

| Type  | Value            |
| ----- | ---------------- |
| Time  | **O(max(N, M))** |
| Space | **O(max(N, M))** |

- Approach: Iterate from right to left, adding corresponding digits and a carry, and appending the remainder of `sum % 2`. Reverse the string builder at the end to get the correct binary string.
- Dry run (a = "11", b = "1"):
  - i=1, j=0, carry=0
  - s = 0 + a[1](1) + b[0](1) = 2. append 0, carry=1
  - i=0, j=-1, carry=1
  - s = 1 + a[0](1) = 2. append 0, carry=1
  - i=-1, j=-1, carry=1
  - s = 1. append 1, carry=0
  - loops ends. return reverse("001") -> "100"

---

## Sum of Two Integers (LeetCode 371)

[371. Sum of Two Integers](https://leetcode.com/problems/sum-of-two-integers/)

Given two integers `a` and `b`, return *the sum of the two integers without using the operators* `+` *and* `-`.

**Example 1:**

**Input:** a = 1, b = 2
**Output:** 3

**Example 2:**

**Input:** a = 2, b = 3
**Output:** 5

```java
class Solution {
    public int getSum(int a, int b) {
        while (b != 0) {
            int c = (a & b) << 1;
            a = a ^ b;
            b = c;
        }
        return a;
    }
}
```

---

## Reverse Bits (leetcode 190)

[190. Reverse Bits](https://leetcode.com/problems/reverse-bits/)

> Reverse bits of a given 32 bits signed integer.

**Example 1:**

**Input:** n = 43261596
**Output:** 964176192

**Explanation:**

| Integer   | Binary                           |
| --------- | -------------------------------- |
| 43261596  | 00000010100101000001111010011100 |
| 964176192 | 00111001011110000010100101000000 |

**Example 2:**

**Input:** n = 2147483644

**Output:** 1073741822

**Explanation:**

| Integer    | Binary                           |
| ---------- | -------------------------------- |
| 2147483644 | 01111111111111111111111111111100 |
| 1073741822 | 00111111111111111111111111111110 |

```java
public class Solution {
    public int reverseBits(int n) {
        int result = 0;
        for (int i = 0; i < 32; i++) {
            result <<= 1;        
            result |= (n & 1);    
            n >>>= 1;              
        }
        return result;

    }

}
```

| Type             | Value    |
| ---------------- | -------- |
| Time Complexity  | **O(1)** |
| Space Complexity | **O(1)** |

- Approach: Iterate 32 times. In each iteration, shift result left by 1, append the LSB of n to result using OR, then right-shift n (unsigned).
- Dry run (n=43261596):
  - Loop 32 times: shift result left, append LSB of n, shift n right (unsigned).
  - After 32 iterations, all bits are reversed.
  - Returns 964176192.

## power of 4 (leetcode 342)

[342. Power of Four](https://leetcode.com/problems/power-of-four/)

> Given an integer n, return true if it is a power of four. Otherwise, return false.

**Example 1:**

**Input:** n = 16
**Output:** true

**Example 2:**

**Input:** n = 5
**Output:** false

**Example 3:**

**Input:** n = 1
**Output:** true

```java
class Solution {
    public boolean isPowerOfFour(int n) {
        return n > 0 &&
               (n & (n - 1)) == 0 &&
               (n - 1) % 3 == 0;
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(1)** |
| Space | **O(1)** |

- Approach: Check if n is positive, has only one bit set (power of 2), and the single set bit is at an odd position (0-indexed) which makes it a power of 4.
- Dry run (n=16):
  - 16 > 0 → true
  - 16 & 15 = 0 → true
  - (16 - 1) % 3 = 15 % 3 = 0 → true
  - Returns true

---

## Complement of Base 10 Integer (LeetCode 1009)

[1009. Complement of Base 10 Integer](https://leetcode.com/problems/complement-of-base-10-integer/)

The **complement** of an integer is the integer you get when you flip all the `0`'s to `1`'s and all the `1`'s to `0`'s in its binary representation.

- For example, The integer `5` is `"101"` in binary and its **complement** is `"010"` which is the integer `2`.

Given an integer `n`, return _its complement_.

**Example 1:**

**Input:** n = 5
**Output:** 2
**Explanation:** 5 is "101" in binary, with complement "010" in binary, which is 2 in base-10.

**Example 2:**

**Input:** n = 7
**Output:** 0
**Explanation:** 7 is "111" in binary, with complement "000" in binary, which is 0 in base-10.

**Example 3:**

**Input:** n = 10
**Output:** 5
**Explanation:** 10 is "1010" in binary, with complement "0101" in binary, which is 5 in base-10.

```java
class Solution {

    public int bitwiseComplement(int n) {
        if (n == 0)
            return 1;
        int mask = 1;
        while (mask <= n) {
            mask <<= 1;
        }
        return ((mask - 1) ^ n);
    }
}
```

| Type  | Value         |
| ----- | ------------- |
| Time  | **O(log(n))** |
| Space | **O(1)**      |

- Approach: Find a mask with all 1s of the same length as the binary representation of n. Then XOR the mask with n to get the complement.
- Dry run (n=5):
  - n=5 (binary 101)
  - mask=1. Loop: mask becomes 2, 4, 8. Stops at 8.
  - mask - 1 = 7 (binary 111)
  - 7 ^ 5 = 111 ^ 101 = 010 (2)
  - Returns 2.
