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
