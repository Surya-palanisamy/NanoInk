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
