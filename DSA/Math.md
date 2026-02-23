## Palindrome Number (LeetCode 9)
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
- Dry run (x=121): rev=1→12→121, temp→12→1→0 → `rev==x` → true
---
## Sqrt(x) (LeetCode 69)
```java
class Solution {
    public int mySqrt(int x) {
        long left = 0, right = x, ans = 0;
        while (left <= right) {
            long mid = (left + right) / 2;
            if (mid * mid <= x) { ans = mid; left = mid + 1; }
            else right = mid - 1;
        }
        return (int) ans;
    }
}
```
- Dry run (x=8): mid=4→too big; mid=1→ans=1; mid=2→ans=2; mid=3→too big; stop → 2


## Happy Number (LeetCode 202)
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

- Approach: Use a HashSet to detect cycles. Keep summing digits until 1 or cycle detected.
- Dry run (n=19):
  - 19→82→4→16→37→58→89→145→42→20→4 → cycle detected → false

##  Add Digits (leetcode 258)
```java
class Solution {
    public int addDigits(int num) {
        return (num - 1) % 9 + 1;
    }
}
``` 

- Approach: Use the property of digital root. `(num - 1) % 9 + 1` gives the digital root of the number.
- Dry run (num=38): (38-1) % 9 + 1 = 4 → Answer is 4.

## ugly number (leetcode 263)
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

- Approach: Keep dividing by 2, 3, and 5. If the result is 1, it's an ugly number.
- Dry run (n=14): 14→7→1 → true
