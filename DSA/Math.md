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
