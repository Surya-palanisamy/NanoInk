# Stack

## Valid Parentheses (LeetCode 20)

[20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)

> Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

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
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(n)** |

- Dry run (s = "()[]{}"):
  - Push ')' for '('
  - Push ']' for '['
  - Push '}' for '{'
  - Match and pop everything → return true
