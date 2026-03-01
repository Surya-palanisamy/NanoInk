## Palindrome Number (LeetCode 9)

> Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.

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

| Type  | Value         |
| ----- | ------------- |
| Time  | **O(log(x))** |
| Space | **O(1)**      |

- Dry run (x=121): rev=1→12→121, temp→12→1→0 → `rev==x` → true

---

## Happy Number (LeetCode 202)

> Write an algorithm to determine if a number `n` is happy. A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits. Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy. Return true if `n` is a happy number, and false if not.

```java
class Solution {
    public boolean isHappy(int n) {
        Set<Integer> seen = new HashSet<>();
        while (n != 1 && !seen.contains(n)) {
            seen.add(n);
            n = getNext(n);
        }
        return n == 1;
    }
    private int getNext(int n) {
        int sum = 0;
        while (n > 0) {
            int digit = n % 10;
            sum += digit * digit;
            n /= 10;
        }
        return sum;
    }
}
```

| Type  | Value         |
| ----- | ------------- |
| Time  | **O(log(n))** |
| Space | **O(log(n))** |

- Approach: Use a HashSet to detect cycles. Keep summing digits until 1 or cycle detected.
- Dry run (n=19):
  - 19→82→4→16→37→58→89→145→42→20→4 → cycle detected → false

## Add Digits (leetcode 258)

> Given an integer `num`, repeatedly add all its digits until the result has only one digit, and return it.

```java
class Solution {
    public int addDigits(int num) {
        return (num - 1) % 9 + 1;
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(1)** |
| Space | **O(1)** |

- Approach: Use the property of digital root. `(num - 1) % 9 + 1` gives the digital root of the number.
- Dry run (num=38): (38-1) % 9 + 1 = 4 → Answer is 4.

## ugly number (leetcode 263)

> An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5. Given an integer `n`, return `true` if `n` is an ugly number.

```java
class Solution {
    public boolean isUgly(int n) {
        if (n <= 0) return false;
        for (int i = 2; i <= 5; i++) {
            while (n % i == 0) n /= i;
        }
        return n == 1;
    }
}
```

| Type  | Value         |
| ----- | ------------- |
| Time  | **O(log(n))** |
| Space | **O(1)**      |

- Approach: Keep dividing by 2, 3, and 5. If the result is 1, it's an ugly number.
- Dry run (n=14): 14→7→1 → true
