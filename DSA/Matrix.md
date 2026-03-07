## Rotate Matrix 90° Clockwise (leetcode 48)

[48. Rotate Image](https://leetcode.com/problems/rotate-image/)

> You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place.

**Example 1:**
**Input:** `matrix = [[1,2,3],[4,5,6],[7,8,9]]`
**Output:** `[[7,4,1],[8,5,2],[9,6,3]]`

**Example 2:**
**Input:** `matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]`
**Output:** `[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]`

Corrected approach: transpose the matrix (swap `a[i][j]` with `a[j][i]` for `j>i`) then reverse each row.

```java
public class Main {
    public static void main(String[] args) {
        int[][] a = {{1,2,3},{4,5,6},{7,8,9}};
        int n = a.length;
        // Transpose
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int t = a[i][j];
                a[i][j] = a[j][i];
                a[j][i] = t;
            }
        }
        // Reverse each row
        for (int i = 0; i < n; i++) {
            int s = 0, e = n - 1;
            while (s < e) {
                int t = a[i][s];
                a[i][s] = a[i][e];
                a[i][e] = t;
                s++; e--;
            }
        }
        // Print
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) System.out.print(a[i][j]);
            System.out.println();
        }
    }
}
```

| Type  | Value     |
| ----- | --------- |
| Time  | **O(n²)** |
| Space | **O(1)**  |

- Dry run (3x3):
  - After transpose: `[[1,4,7],[2,5,8],[3,6,9]]`
  - Reverse rows: `[7,4,1]; [8,5,2]; [9,6,3]`
  - Output :
    7 4 1
    8 5 2
    9 6 3

## Spiral Matrix 1 (leetcode 54)

[54. Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)

> Given an `m x n` matrix, return all elements of the matrix in spiral order.

**Example 1:**
**Input:** `matrix = [[1,2,3],[4,5,6],[7,8,9]]`
**Output:** `[1,2,3,6,9,8,7,4,5]`

![Spiral matrix](https://res.cloudinary.com/dwdbp4qpe/image/upload/v1772336656/spiral1_mh7qz6.jpg)

**Example 2:**
**Input:** `matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]`
**Output:** `[1,2,3,4,8,12,11,10,9,5,6,7]`

```java
class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res = new ArrayList<>();
        int top = 0;
        int bottom = matrix.length - 1;
        int left = 0;
        int right = matrix[0].length - 1;
        while(top <= bottom && left <= right){
            for(int i = left; i <= right; i++){
                res.add(matrix[top][i]);
            }
            top++;
            for(int i = top; i <= bottom; i++){
                res.add(matrix[i][right]);
            }
            right--;
            if(top <= bottom){
                for(int i = right; i >= left; i--){
                    res.add(matrix[bottom][i]);
                }
                bottom--;
            }
            if(left <= right){
                for(int i = bottom; i >= top; i--){
                    res.add(matrix[i][left]);
                }
                left++;
            }
        }
        return res;
    }
}
```

| Type  | Value        |
| ----- | ------------ |
| Time  | **O(m × n)** |
| Space | **O(1)**     |

- Dry run (3x3 matrix):
  - Traverse left to right (top row): `[1,2,3]`, top becomes 1
  - Traverse top to bottom (right col): `[6,9]`, right becomes 1
  - Traverse right to left (bottom row): `[8,7]`, bottom becomes 1
  - Traverse bottom to top (left col): `[4]`, left becomes 1
  - Traverse left to right (inner row): `[5]`, top becomes 2 -> loop ends

---

## Special Positions in a Binary Matrix(leetcode 1582)

[1582. Special Positions in a Binary Matrix](https://leetcode.com/problems/special-positions-in-a-binary-matrix/)

> Given an `m x n` binary matrix `mat`, return *the number of special positions in* `mat`_._

> A position `(i, j)` is called **special** if `mat[i][j] == 1` and all other elements in row `i` and column `j` are `0` (rows and columns are **0-indexed**).

**Example 1:**

![https://res.cloudinary.com/dwdbp4qpe/image/upload/v1772731033/special1_j2j0em.jpg](https://res.cloudinary.com/dwdbp4qpe/image/upload/v1772731033/special1_j2j0em.jpg)

**Input:** `mat = [[1,0,0],[0,0,1],[1,0,0]]`
**Output:** `1`
**Explanation:** (1, 2) is a special position because mat[1][2] == 1 and all other elements in row 1 and column 2 are 0.

**Example 2:**

![https://res.cloudinary.com/dwdbp4qpe/image/upload/v1772731035/special-grid_r7zvgr.jpg](https://res.cloudinary.com/dwdbp4qpe/image/upload/v1772731035/special-grid_r7zvgr.jpg)

**Input:** `mat = [[1,0,0],[0,1,0],[0,0,1]]`
**Output:** `3`
**Explanation:** (0, 0), (1, 1) and (2, 2) are special positions.

```java
class Solution {
    public int numSpecial(int[][] mat) {
        int m = mat.length;
        int n = mat[0].length;
        int[] r = new int[m];
        int[] c = new int[n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 1) {
                    r[i]++;
                    c[j]++;
                }
            }
        }
        int cp = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 1 && r[i] == 1 && c[j] == 1) {
                    cp++;
                }
            }
        }
        return cp;
    }
}
```

| Type  | Value        |
| ----- | ------------ |
| Time  | **O(m × n)** |
| Space | **O(m + n)** |

- Dry run (mat = `[[1,0,0],[0,0,1],[1,0,0]]`):
  - Initial counts:
    - row sums (`r`): `[1, 1, 1]`
    - col sums (`c`): `[2, 0, 1]`
  - Iterate matrix:
    - `mat[0][0] == 1` but `c[0] == 2` -> not special
    - `mat[1][2] == 1` and `r[1] == 1` and `c[2] == 1` -> special, count = 1
    - `mat[2][0] == 1` but `c[0] == 2` -> not special
  - Final count = 1
