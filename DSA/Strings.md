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

## Integer to Roman (Leetcode 12)

[12. Integer to Roman](https://leetcode.com/problems/integer-to-roman/)

> Seven different symbols represent Roman numerals with the following values:

| Symbol | Value |
| ------ | ----- |
| I      | 1     |
| V      | 5     |
| X      | 10    |
| L      | 50    |
| C      | 100   |
| D      | 500   |
| M      | 1000  |

> Roman numerals are formed by appending the conversions of decimal place values from highest to lowest. Converting a decimal place value into a Roman numeral has the following rules:

> Given an integer, convert it to a Roman numeral.

**Example 1:**

**Input:** num = 58

**Output:** "LVIII"

**Explanation:**

50 = L
8 = VIII

**Example 3:**

**Input:** num = 1994

**Output:** "MCMXCIV"

**Explanation:**

1000 = M
900 = CM
90 = XC
4 = IV

```java
class Solution {

    public String intToRoman(int num) {
        int[] values = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
        String[] symbols = {"M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"};
        StringBuilder result = new StringBuilder();

        for (int i = 0; i < values.length; i++) {
            while (num >= values[i]) {
                result.append(symbols[i]);
                num -= values[i];
            }
        }
        return result.toString();
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Approach: Use greedy matching. Iterate through value-symbol pairs from largest to smallest, appending symbols while the number allows.
- Dry run (num = 1994):
  - 1994 >= 1000 → "M", num=994
  - 994 >= 900 → "MCM", num=94
  - 94 >= 90 → "MCMXC", num=4
  - 4 >= 4 → "MCMXCIV", num=0
  - Result: "MCMXCIV"

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

[GeeksforGeeks](https://www.geeksforgeeks.org/print-characters-frequencies-order-occurrence/)

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

## Check if Binary String Has at Most One Segment of Ones (LeetCode 1784)

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

## Palindromic Substrings (Leetcode 647)

[647. Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/)

> Given a string `s`, return *the number of **palindromic substrings** in it*.
> A string is a **palindrome** when it reads the same backward as forward.
> A **substring** is a contiguous sequence of characters within the string.

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

| Type  | Value     |
| ----- | --------- |
| Time  | **O(n²)** |
| Space | **O(1)**  |

- Approach: Expand Around Center. For each index, expand outward for both odd-length (center=i) and even-length (center=i,i+1) palindromes.
- Dry run (s = "aaa"):
  - i=0: odd expand(0,0) → "a" (count=1). even expand(0,1) → "aa" (count=2).
  - i=1: odd expand(1,1) → "a","aaa" (count=4). even expand(1,2) → "aa" (count=5).
  - i=2: odd expand(2,2) → "a" (count=6). even expand(2,3) → stop.
  - Total = 6.

---

## Word Break (LeetCode 139)

[139. Word Break](https://leetcode.com/problems/word-break/)

> Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.

**Example 1:**

**Input:** s = "leetcode", wordDict = ["leet","code"]
**Output:** true
**Explanation:** "leetcode" can be segmented as "leet code".

**Example 2:**

**Input:** s = "applepenapple", wordDict = ["apple","pen"]
**Output:** true

**Example 3:**

**Input:** s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
**Output:** false

```java
class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {

        HashSet<String> set = new HashSet<>(wordDict);
        boolean[] dp = new boolean[s.length() + 1];

        dp[0] = true;

        for(int i = 1; i <= s.length(); i++){
            for(int j = 0; j < i; j++){

                if(dp[j] && set.contains(s.substring(j, i))){
                    dp[i] = true;
                    break;
                }
            }
        }

        return dp[s.length()];
    }
}
```

| Type  | Value     |
| ----- | --------- |
| Time  | **O(n²)** |
| Space | **O(n)**  |

- Approach: Use DP. `dp[i]` is true if `s[0..i-1]` can be segmented. For each position `i`, check all substrings `s[j..i]` — if `dp[j]` is true and substring is in dict, set `dp[i] = true`.
- Dry run (s = "leetcode", wordDict = ["leet","code"]):
  - dp[0]=true
  - i=4: j=0, dp[0]=true, s[0..4]="leet" in dict → dp[4]=true
  - i=8: j=4, dp[4]=true, s[4..8]="code" in dict → dp[8]=true
  - Return dp[8] = true

---

---

## Isomorphic Strings (LeetCode 205)

[205. Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/)

>Given two strings `s` and `t`, *determine if they are isomorphic*.
Two strings `s` and `t` are isomorphic if the characters in `s` can be replaced to get `t`.
All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

**Example 1:**

**Input:** s = "egg", t = "add"

**Output:** true

**Explanation:**

The strings `s` and `t` can be made identical by:

- Mapping `'e'` to `'a'`.
- Mapping `'g'` to `'d'`.

**Example 2:**

**Input:** s = "f11", t = "b23"

**Output:** false

**Explanation:**

The strings `s` and `t` can not be made identical as `'1'` needs to be mapped to both `'2'` and `'3'`.

```java
class Solution {

    public boolean isIsomorphic(String s, String t) {
        int[] mapS = new int[256];
        int[] mapT = new int[256];
        for (int i = 0; i < s.length(); i++) {
            char charS = s.charAt(i);
            char charT = t.charAt(i);
            if (mapS[charS] != mapT[charT]) {
                return false;
            }
            mapS[charS] = i + 1;
            mapT[charT] = i + 1;
        }
        return true;
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Approach: Use two arrays to map characters to their most recent positions (1-indexed). If a mismatched previous mapping is found, they are not isomorphic.
- Dry run (s="egg", t="add"):
  - i=0 ('e', 'a'): mapS['e']=mapT['a']=0. Both become 1.
  - i=1 ('g', 'd'): mapS['g']=mapT['d']=0. Both become 2.
  - i=2 ('g', 'd'): mapS['g']=mapT['d']=2 (match). Both become 3.
  - Returns true.

---

## Word Break (LeetCode 139) - Alternative format

[139. Word Break](https://leetcode.com/problems/word-break/)

```java
class Solution {

    public boolean wordBreak(String s, List<String> wordDict) {
        HashSet<String> set = new HashSet<>(wordDict);
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && set.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.length()];
    }
}
```

| Type  | Value     |
| ----- | --------- |
| Time  | **O(n²)** |
| Space | **O(n)**  |

- Approach: Use DP array where `dp[i]` indicates if substring `0..i` can be broken down.
- Dry run (s = "leetcode", wordDict = ["leet","code"]):
  - dp[0]=true. 
  - i=4, j=0: s[0..4] is "leet", in dict. dp[4]=true.
  - i=8, j=4: s[4..8] is "code", in dict. dp[8]=true.
  - Return dp[8] = true.

---
## String Reverse (GeeksforGeeks)

[Reverse a String](https://www.geeksforgeeks.org/reverse-a-string-in-java/)

> Given a string, print it in reverse order.

**Example 1:**
**Input:** `s = "surya"`
**Output:** `ayrus`

```java
public class Main {
    public static void main(String[] args) {
        String s = "surya";
        int n = s.length();

        for (int i = 0; i < n; i++) {
            System.out.print(s.charAt(n - i - 1));
        }
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Approach: Loop from 0 to n-1 and print characters starting from the end of the string.
- Dry run (s="surya"):
  - i=0: print s.charAt(4) -> 'a'
  - i=1: print s.charAt(3) -> 'y'
  - i=2: print s.charAt(2) -> 'r'
  - i=3: print s.charAt(1) -> 'u'
  - i=4: print s.charAt(0) -> 's'
  - Result: ayrus