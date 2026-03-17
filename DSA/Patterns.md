# Patterns

## Right Triangle

```java
class Solution {
    public void printRightTriangle(int n) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) System.out.print("* ");
            System.out.println();
        }
    }
}
```

```
*
* *
* * *
* * * *
* * * * *
```

| Type  | Value     |
| ----- | --------- |
| Time  | **O(n²)** |
| Space | **O(1)**  |

- Dry run (n=3): Row 1: print 1 star. Row 2: print 2 stars. Row 3: print 3 stars.

---

## Inverted Right Triangle

```java
class Solution {
    public void printInvertedRightTriangle(int n) {
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) System.out.print("* ");
            System.out.println();
        }
    }
}
```

```
* * * * *
* * * *
* * *
* *
*
```

| Type  | Value     |
| ----- | --------- |
| Time  | **O(n²)** |
| Space | **O(1)**  |

- Dry run (n=3): Row 1: print 3 stars. Row 2: print 2 stars. Row 3: print 1 star.

---

## Left Triangle

```java
class Solution {
    public void printLeftTriangle(int n) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n - i; j++) System.out.print("  ");
            for (int k = 1; k <= i; k++) System.out.print("* ");
            System.out.println();
        }
    }
}
```

```
        *
      * *
    * * *
  * * * *
* * * * *
```

| Type  | Value     |
| ----- | --------- |
| Time  | **O(n²)** |
| Space | **O(1)**  |

- Dry run (n=3): Row 1: 2 spaces + 1 star. Row 2: 1 space + 2 stars. Row 3: 0 spaces + 3 stars.

---

## Pyramid

```java
class Solution {
    public void printPyramid(int n) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n - i; j++) System.out.print(" ");
            for (int k = 1; k <= 2 * i - 1; k++) System.out.print("*");
            System.out.println();
        }
    }
}
```

```
    *
   ***
  *****
 *******
*********
```

| Type  | Value     |
| ----- | --------- |
| Time  | **O(n²)** |
| Space | **O(1)**  |

- Dry run (n=3): Row 1: 2 spaces + 1 star. Row 2: 1 space + 3 stars. Row 3: 0 spaces + 5 stars.

---

## Inverted Pyramid

```java
class Solution {
    public void printInvertedPyramid(int n) {
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= n - i; j++) System.out.print(" ");
            for (int k = 1; k <= 2 * i - 1; k++) System.out.print("*");
            System.out.println();
        }
    }
}
```

```
*********
 *******
  *****
   ***
    *
```

| Type  | Value     |
| ----- | --------- |
| Time  | **O(n²)** |
| Space | **O(1)**  |

- Dry run (n=3): Row 1: 0 spaces + 5 stars. Row 2: 1 space + 3 stars. Row 3: 2 spaces + 1 star.

---

## Diamond

```java
class Solution {
    public void printDiamond(int n) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n - i; j++) System.out.print(" ");
            for (int k = 1; k <= 2 * i - 1; k++) System.out.print("*");
            System.out.println();
        }
        for (int i = n - 1; i >= 1; i--) {
            for (int j = 1; j <= n - i; j++) System.out.print(" ");
            for (int k = 1; k <= 2 * i - 1; k++) System.out.print("*");
            System.out.println();
        }
    }
}
```

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

| Type  | Value     |
| ----- | --------- |
| Time  | **O(n²)** |
| Space | **O(1)**  |

- Dry run (n=3): Upper half (Pyramid for n=3) + Lower half (Inverted Pyramid for n-1=2).

---

## Opposite Zero and One

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

```
0
1 0
0 1 0
1 0 1 0
```

| Type  | Value     |
| ----- | --------- |
| Time  | **O(n²)** |
| Space | **O(1)**  |

- Dry run (n=3): Row 1: (1+1)%2=0. Row 2: (2+1)%2=1, (2+2)%2=0. Row 3: (3+1)%2=0, (3+2)%2=1, (3+3)%2=0.

---

## Diagonal Cross (Both Diagonals)

```java
class Main {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (i == j || i + j == n + 1) System.out.print("* ");
                else System.out.print("  ");
            }
            System.out.println();
        }
    }
}
```

```
*       *
  *   *
    *
  *   *
*       *
```

| Type  | Value     |
| ----- | --------- |
| Time  | **O(n²)** |
| Space | **O(1)**  |

- Dry run (n=3): (1,1) i==j → _. (1,3) i+j==4 → _. (2,2) both → _. (3,1) i+j==4 → _. (3,3) i==j → \*.

---

## Diagonal Numbers

```java
class Main {
    public static void main(String[] args) {
        int n = 4;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (i == j) System.out.print(i + " ");
                else System.out.print("  ");
            }
            System.out.println();
        }
    }
}
```

```
1
  2
    3
      4
```

| Type  | Value     |
| ----- | --------- |
| Time  | **O(n²)** |
| Space | **O(1)**  |

- Dry run (n=3): (1,1)→1. (2,2)→2. (3,3)→3. All other positions print spaces.

---

## Diagonal Cross Numbers

```java
class Main {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (i == j || i + j == n + 1) System.out.print(i + " ");
                else System.out.print("  ");
            }
            System.out.println();
        }
    }
}
```

```
1       1
  2   2
    3
  4   4
5       5
```

| Type  | Value     |
| ----- | --------- |
| Time  | **O(n²)** |
| Space | **O(1)**  |

- Dry run (n=3): (1,1)→1, (1,3)→1, (2,2)→2, (3,1)→3, (3,3)→3.

---

## Pascal's Triangle

```java
class Solution {
    public void printPascalsTriangle(int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - i - 1; j++) System.out.print(" ");
            int num = 1;
            for (int k = 0; k <= i; k++) {
                System.out.print(num + " ");
                num = num * (i - k) / (k + 1);
            }
            System.out.println();
        }
    }
}
```

```
   1 
  1 1 
 1 2 1 
1 3 3 1 
```

| Type  | Value     |
| ----- | --------- |
| Time  | **O(n²)** |
| Space | **O(1)**  |

- Dry run (n=4): i=0 → spaces=3, prints 1. i=1 → spaces=2, prints 1 1. i=2 → spaces=1, prints 1 2 1. i=3 → spaces=0, prints 1 3 3 1.

---

## Half Diamond Star Pattern

```java
class Solution {
    public void printHalfDiamond(int n) {
        for (int i = 1; i <= 2 * n - 1; i++) {
            int stars = i <= n ? i : 2 * n - i;
            for (int j = 1; j <= stars; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}
```

```
* 
* * 
* * * 
* * 
* 
```

| Type  | Value     |
| ----- | --------- |
| Time  | **O(n²)** |
| Space | **O(1)**  |

- Dry run (n=3): i=1 → 1 star. i=2 → 2 stars. i=3 → 3 stars. i=4 → 2 stars. i=5 → 1 star.

---

## Hollow Square

```java
class Solution {
    public void printHollowSquare(int n) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (i == 1 || i == n || j == 1 || j == n) System.out.print("* ");
                else System.out.print("  ");
            }
            System.out.println();
        }
    }
}
```

```
* * * * *
*       *
*       *
*       *
* * * * *
```

| Type  | Value     |
| ----- | --------- |
| Time  | **O(n²)** |
| Space | **O(1)**  |

- Dry run (n=3): (1,1) (1,2) (1,3) → stars. (2,1) (2,3) → stars. (3,1) (3,2) (3,3) → stars. Rest spaces.

---

## Butterfly Pattern

```java
import java.util.Scanner;

public class ButterflyPattern {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter the number of rows for one half (n): ");
        int n = scanner.nextInt();
        scanner.close();

        // Upper half of the butterfly pattern
        for (int i = 1; i <= n; i++) {
            // First set of stars (left wing)
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }

            // Spaces in between
            for (int j = 1; j <= 2 * (n - i); j++) {
                System.out.print(" ");
            }

            // Second set of stars (right wing)
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println(); // Move to the next line
        }

        // Lower half of the butterfly pattern
        // Start the second half from n-1 to avoid duplicating the middle row
        for (int i = n - 1; i >= 1; i--) {
            // First set of stars (left wing)
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }

            // Spaces in between
            for (int j = 1; j <= 2 * (n - i); j++) {
                System.out.print(" ");
            }

            // Second set of stars (right wing)
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println(); // Move to the next line
        }
    }
}

```

```
*        *
**      **
***    ***
****  ****
**********
****  ****
***    ***
**      **
*        *
```

| Type  | Value     |
| ----- | --------- |
| Time  | **O(n²)** |
| Space | **O(1)**  |

- Dry run (n=3): i=1 → 1 star, 4 spaces, 1 star. i=3 → 3 stars, 0 spaces, 3 stars. i=5 → 1 star, 4 spaces, 1 star.

---

## Floyd's Triangle

```java
class Solution {
    public void printFloydTriangle(int n) {
        int num = 1;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(num + " ");
                num++;
            }
            System.out.println();
        }
    }
}
```

```
1 
2 3 
4 5 6 
7 8 9 10 
```

| Type  | Value     |
| ----- | --------- |
| Time  | **O(n²)** |
| Space | **O(1)**  |

- Dry run (n=3): Row 1: num=1. Row 2: num=2,3. Row 3: num=4,5,6.

---

## Rhombus Pattern

```java
class Solution {
    public void printRhombus(int n) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n - i; j++) System.out.print(" ");
            for (int j = 1; j <= n; j++) System.out.print("* ");
            System.out.println();
        }
    }
}
```

```
    * * * * *
   * * * * *
  * * * * *
 * * * * *
* * * * *
```

| Type  | Value     |
| ----- | --------- |
| Time  | **O(n²)** |
| Space | **O(1)**  |

- Dry run (n=3): i=1 → 2 spaces, 3 stars. i=2 → 1 space, 3 stars. i=3 → 0 spaces, 3 stars.

---
