## Even or Odd

> Given an integer `n`, determine if it is even or odd using bitwise operators.

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

## Multiply by 2

> Given an integer `n`, multiply it by 2 using bitwise shift operators.

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

> Given an integer `n`, divide it by 2 using bitwise shift operators.

```java
int n = 14;
int result = n >> 1;
System.out.println(result);
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(1)** |
| Space | **O(1)** |

- Dry run: 14(1110) >> 1 → 0111(7).

---

## Power of 2

> Given an integer `n`, check if it is a power of 2 using bitwise operators.

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

## Count Number of 1s

> Given an integer `n`, count the number of set bits (1s) in its binary representation.

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

> Given an integer `n`, print all powers of 2 from $2^0$ to $2^n$.

```java
int n = 5;
for (int i = 0; i <= n; i++) {
    System.out.println("2^" + i + " = " + (1 << i));
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Dry run: i=0→1, i=1→2, i=2→4, i=3→8, i=4→16, i=5→32.

---

## Set a Specific Bit

> Given an integer `n` and a zero-indexed position `k`, set the `k`-th bit of `n` to 1.

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

## Clear a Specific Bit

> Given an integer `n` and a zero-indexed position `k`, clear the `k`-th bit of `n` (set it to 0).

```java
int n = 14, k = 1;
n = n & ~(1 << k);
System.out.println(n);

```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(1)** |
| Space | **O(1)** |

- Dry run: mask=~(0010)=...1101 → 1110 & 1101 = 1100(12).

---

## Toggle a Specific Bit

> Given an integer `n` and a zero-indexed position `k`, toggle the `k`-th bit of `n`.

```java
int n = 12, k = 2;
n = n ^ (1 << k);
System.out.println(n);

```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(1)** |
| Space | **O(1)** |

- Dry run: 1100 ^ 0100 = 1000(8).

---

## Count Trailing Zeros

> Given an integer `n`, count the number of trailing zeros in its binary representation.

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
    for (int i = 1; i <= n; i++) ans[i] = ans[i >> 1] + (i & 1);
    return ans;
}

```

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
  - Expect 2: `1010` (start with '1'). Differs at indices 0, 1, 2, 3 -> error count = 4.
  - Return `Math.min(1, 4)` = 1.

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