# Strings

## Reverse String (LeetCode 344)

[344. Reverse String](https://leetcode.com/problems/reverse-string/)

> Write a function that reverses a string. The input string is given as an array of characters `s`. You must do this by modifying the input array in-place with O(1) extra memory.

**Example 1:**
**Input:** `s = ["h","e","l","l","o"]`
**Output:** `["o","l","l","e","h"]`

**Example 2:**
**Input:** `s = ["H","a","n","n","a","h"]`
**Output:** `["h","a","n","n","a","H"]`

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

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Dry run (s = [h,e,l,l,o]):
  - swap 0↔4 → [o,e,l,l,h]
  - swap 1↔3 → [o,l,l,e,h]
  - left=2,right=2 → stop → [o,l,l,e,h]

---

## Length of Last Word (LeetCode 58)

[58. Length of Last Word](https://leetcode.com/problems/length-of-last-word/)

> Given a string `s` consisting of words and spaces, return the length of the last word in the string.

**Example 1:**
**Input:** `s = "Hello World"`
**Output:** `5`

**Example 2:**
**Input:** `s = "   fly me   to   the moon  "`
**Output:** `4`

```java
class Solution {
    public int lengthOfLastWord(String s) {
        String[] words = s.trim().split(" ");
        return words[words.length - 1].length();
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(n)** |

- Dry run ("Hello World "):
  - trim → "Hello World"
  - split → ["Hello","World"] → last="World" → len=5

---

## Roman to Integer (LeetCode 13)

[13. Roman to Integer](https://leetcode.com/problems/roman-to-integer/)

> Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M. Given a roman numeral, convert it to an integer.

**Example 1:**
**Input:** `s = "III"`
**Output:** `3`

**Example 2:**
**Input:** `s = "LVIII"`
**Output:** `58`

**Example 3:**
**Input:** `s = "MCMXCIV"`
**Output:** `1994`

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
            if (num * 4 < sum) sum -= num; else sum += num;
        }
        return sum;
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Dry run ("MCMXCIV") from right:
  - V(5) → sum=5
  - I(1): 1\*4<5 → sum=4
  - C(100): 100\*4<4? no → sum=104
  - X(10): 10\*4<104 → sum=94
  - M(1000): add → 1094
  - C(100): subtract → 994
  - M(1000): add → 1994

---

## Anagram (LeetCode 242)

[242. Valid Anagram](https://leetcode.com/problems/valid-anagram/)

> Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

**Example 1:**
**Input:** `s = "anagram", t = "nagaram"`
**Output:** `true`

**Example 2:**
**Input:** `s = "rat", t = "car"`
**Output:** `false`

```java
class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] freq = new int[26];
        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;
            freq[t.charAt(i) - 'a']--;
        }
        for (int count : freq) if (count != 0) return false;
        return true;
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Dry run (s="ab", t="ba"):
  - i=0: freq[a]++ →1; freq[b]-- →-1
  - i=1: freq[b]++ →0; freq[a]-- →0
  - All zeros → true

---

## Frequency of Character (uppercase)

> Given a string `s` consisting of uppercase alphabetic characters, print the frequency of each character in alphabetical order.

**Example 1:**
**Input:** `s = "SURYAS"`
**Output:** `A 1`, `R 1`, `S 2`, `U 1`, `Y 1`

```java
class Main {
    public static void main(String[] args) {
        String s = "SURYAS";
        int[] freq = new int[26];
        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'A']++;
        }
        for (int i = 0; i < freq.length; i++) {
            if (freq[i] > 0) {
                System.out.println((char)(i + 'A') + " " + freq[i]);
            }
        }
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Dry run:
  - S→ index 18 → freq[18]=1
  - U→ 20 → 1
  - R→ 17 → 1
  - Y→ 24 → 1
  - A→ 0 → 1
  - S→ 18 → 2
  - Output in alphabetical order: A 1, R 1, S 2, U 1, Y 1

---

## Valid palindrome (LeetCode 125)

[125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)

> A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

> Given a string `s`, return `true` *if it is a **palindrome**, or* `false` *otherwise*.

**Example 1:**

**Input:** s = "A man, a plan, a canal: Panama"
**Output:** true
**Explanation:** "amanaplanacanalpanama" is a palindrome.

**Example 2:**

**Input:** s = "race a car"
**Output:** false
**Explanation:** "raceacar" is not a palindrome.

**Example 3:**

**Input:** s = " "
**Output:** true
**Explanation:** s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.

```java
class Solution {

    public boolean isPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) {
                l++;
            }
            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) {
                r--;
            }
            if (Character.toLowerCase(s.charAt(l)) !=
                Character.toLowerCase(s.charAt(r))) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Dry run (s = "A man, a plan, a canal: Panama"):
  - Pointers start at ends. l=0 ('A'), r=29 ('a'). Match (ignore case) -> l=1, r=28
  - Skip non-alphanumeric. l=1 (' ') -> l=2.
  - Characters continue matching inward. Result is returning `true`.

---

## Check if Binary String Has at Most One Segment of Ones

[1784. Check if Binary String Has at Most One Segment of Ones](https://leetcode.com/problems/check-if-binary-string-has-at-most-one-segment-of-ones/)

> Given a binary string `s` **​​​​​without leading zeros**, return `true`​​​ *if* `s` \*contains **at most one contiguous segment of ones\***. Otherwise, return `false`.

**Example 1:**

**Input:** s = "1001"
**Output:** false
**Explanation:** The ones do not form a contiguous segment.

**Example 2:**

**Input:** s = "110"
**Output:** true

```java
class Solution {
    public boolean checkOnesSegment(String s) {
      if(s.contains("01")){
         return false;
      }
      return true;
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Dry run (s = "1001"):
  - Call `s.contains("01")`
  - "1001" contains "01" -> returns true from `.contains`, so we return `false`
  - Returns `false` as expected because 1s are not one segment.

---

## String to Integer (Leetcode 8)

[8. String to Integer (atoi)](https://leetcode.com/problems/string-to-integer-atoi/)

Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer.

The algorithm for `myAtoi(string s)` is as follows:

1. **Whitespace**: Ignore any leading whitespace (`" "`).
2. **Signedness**: Determine the sign by checking if the next character is `'-'` or `'+'`, assuming positivity if neither present.
3. **Conversion**: Read the integer by skipping leading zeros until a non-digit character is encountered or the end of the string is reached. If no digits were read, then the result is 0.
4. **Rounding**: If the integer is out of the 32-bit signed integer range `[-231, 231 - 1]`, then round the integer to remain in the range. Specifically, integers less than `-231` should be rounded to `-231`, and integers greater than `231 - 1` should be rounded to `231 - 1`.

Return the integer as the final result.

```java
class Solution {
    public int myAtoi(String s) {
        s = s.trim();
        int sign = 1;
        int i = 0;
        long n = 0;
        if (s.isEmpty())
            return 0;
        if (s.charAt(i) == '+' || s.charAt(i) == '-') {
            sign = (s.charAt(i) == '-' ? -1 : 1);
            i++;
        }
        while (i < s.length() && Character.isDigit(s.charAt(i))) {
            n = n * 10 + (s.charAt(i) - '0');
            i++;
            if (sign * n > Integer.MAX_VALUE)
                return Integer.MAX_VALUE;
            if (sign * n < Integer.MIN_VALUE)
                return Integer.MIN_VALUE;
        }
        return (int) (sign * n);
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Approach: Iteratively clean up whitespace, determine the sign, and read characters as long as they are digits. Accumulate the number step by step, and check for 32-bit integer overflow or underflow constraints to clamp the result if necessary.
- Dry run (s = " -42"):
  - `s.trim()` -> "-42"
  - First char is '-', set sign=-1, i=1
  - i=1, char='4', n=0 \* 10 + 4 = 4
  - i=2, char='2', n=4 \* 10 + 2 = 42
  - return sign \* n = -42

---
##  Palindromic Substrings (Leetcode 647)
[647. Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/)

>Given a string `s`, return _the number of **palindromic substrings** in it_.
A string is a **palindrome** when it reads the same backward as forward.
A **substring** is a contiguous sequence of characters within the string.

**Example 1:**

**Input:** s = "abc"
**Output:** 3
**Explanation:** Three palindromic strings: "a", "b", "c".

**Example 2:**

**Input:** s = "aaa"
**Output:** 6
**Explanation:** Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".

```java
class Solution {
    int count = 0;
    public int countSubstrings(String s) {
        for (int i = 0; i < s.length(); i++) {
            expand(s, i, i);
            expand(s, i, i + 1);
        }
        return count;
    }

    public void expand(String s, int l, int r) {
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {
            count++;
            l--;
            r++;
        }
    }
}
```
o(n^2)
