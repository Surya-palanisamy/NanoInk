# Matrix

## Rotate Matrix 90° Clockwise (leetcode 48)

[48. Rotate Image](https://leetcode.com/problems/rotate-image/)

> You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place.

![](https://assets.leetcode.com/uploads/2020/08/28/mat1.jpg)

**Input:** matrix =` [[1,2,3],[4,5,6],[7,8,9]]`
**Output:** `[[7,4,1],[8,5,2],[9,6,3]]`

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/08/28/mat2.jpg)

**Input:** matrix =` [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]`
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

> Given an `m x n` binary matrix `mat`, return _the number of special positions in_ `mat`_._

> A position `(i, j)` is called **special** if `mat[i][j] == 1` and all other elements in row `i` and column `j` are `0` (rows and columns are **0-indexed**).

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

---

## Set Matrix Zeros (Leetcode 73)

[73. Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/)

Given an `m x n` integer matrix `matrix`, if an element is `0`, set its entire row and column to `0`'s.

You must do it [in place](https://en.wikipedia.org/wiki/In-place_algorithm).

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/08/17/mat1.jpg)

**Input:** matrix = [[1,1,1],[1,0,1],[1,1,1]]
**Output:** [[1,0,1],[0,0,0],[1,0,1]]

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/08/17/mat2.jpg)

**Input:** matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
**Output:** [[0,0,0,0],[0,4,5,0],[0,3,1,0]]

```java
class Solution {
    public void setZeroes(int[][] matrix) {

        int m = matrix.length;
        int n = matrix[0].length;

        boolean firstRow = false;
        boolean firstCol = false;

        // check first column
        for(int i = 0; i < m; i++){
            if(matrix[i][0] == 0) firstCol = true;
        }

        // check first row
        for(int j = 0; j < n; j++){
            if(matrix[0][j] == 0) firstRow = true;
        }

        // mark rows and columns
        for(int i = 1; i < m; i++){
            for(int j = 1; j < n; j++){
                if(matrix[i][j] == 0){
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }

        // fill zeros
        for(int i = 1; i < m; i++){
            for(int j = 1; j < n; j++){
                if(matrix[i][0] == 0 || matrix[0][j] == 0){
                    matrix[i][j] = 0;
                }
            }
        }

        if(firstRow){
            for(int j = 0; j < n; j++) matrix[0][j] = 0;
        }

        if(firstCol){
            for(int i = 0; i < m; i++) matrix[i][0] = 0;
        }
    }
}
```

| Type  | Value        |
| ----- | ------------ |
| Time  | **O(m × n)** |
| Space | **O(1)**     |

- Approach: Use first row and first column as markers. First, check if the first row/column themselves contain zeros. Then, iterate through the rest of the matrix, marking zeros in the first row/column. Finally, fill zeros based on markers and handle first row/column.
- Dry run (matrix = [[1,1,1],[1,0,1],[1,1,1]]):
  - firstRow=false, firstCol=false
  - matrix[1][1]=0 → mark matrix[1][0]=0, matrix[0][1]=0
  - Fill: row 1 all zeros (matrix[1][0]=0), col 1 all zeros (matrix[0][1]=0)
  - Result: [[1,0,1],[0,0,0],[1,0,1]]

---

## Flipping an Image (LeetCode 832)

[832. Flipping an Image](https://leetcode.com/problems/flipping-an-image/)

> Given an `n x n` binary matrix `image`, flip the image **horizontally**, then invert it, and return *the resulting image*.

> To flip an image horizontally means that each row of the image is reversed.

- For example, flipping `[1,1,0]` horizontally results in `[0,1,1]`.

> To invert an image means that each `0` is replaced by `1`, and each `1` is replaced by `0`.

- For example, inverting `[0,1,1]` results in `[1,0,0]`.

**Example 1:**

**Input:** image = [[1,1,0],[1,0,1],[0,0,0]]
**Output:** [[1,0,0],[0,1,0],[1,1,1]]
**Explanation:** First reverse each row: [[0,1,1],[1,0,1],[0,0,0]].
Then, invert the image: [[1,0,0],[0,1,0],[1,1,1]]

**Example 2:**

**Input:** image = [[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]]
**Output:** [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
**Explanation:** First reverse each row: [[0,0,1,1],[1,0,0,1],[1,1,1,0],[0,1,0,1]].
Then invert the image: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]

```java
class Solution {
    public int[][] flipAndInvertImage(int[][] image) {

        int m = image.length;
        int n = image[0].length;

        for(int i = 0; i < m; i++){
            int s = 0, e = n - 1;

            while(s <= e){

                int temp = image[i][s] ^ 1;
                image[i][s] = image[i][e] ^ 1;
                image[i][e] = temp;

                s++;
                e--;
            }
        }

        return image;
    }
}
```

| Type  | Value     |
| ----- | --------- |
| Time  | **O(n²)** |
| Space | **O(1)**  |

- Approach: For each row, use two pointers from both ends. Swap and invert simultaneously using XOR with 1.
- Dry run (image = [[1,1,0],[1,0,1],[0,0,0]]):
  - Row 0: swap+invert (0,2): [1,1,0] → s=0,e=2: temp=1^1=0, img[0]=0^1=1, img[2]=0 → [1,1,0]. s=1,e=1: temp=1^1=0, img[1]=1^1=0, img[1]=0 → [1,0,0]
  - Row 1: s=0,e=2: temp=1^1=0, img[0]=1^1=0, img[2]=0 → [0,0,0]. s=1,e=1: 0^1=1 → [0,1,0]
  - Row 2: s=0,e=2: temp=0^1=1, img[0]=0^1=1, img[2]=1 → [1,0,1]. s=1,e=1: 0^1=1 → [1,1,1]
  - Result: [[1,0,0],[0,1,0],[1,1,1]]

---


## Number of Islands (LeetCode 200)

[200. Number of Islands](https://leetcode.com/problems/number-of-islands/)

> Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return *the number of islands*.

> An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

**Example 1:**

**Input:** grid = [
["1","1","1","1","0"],
["1","1","0","1","0"],
["1","1","0","0","0"],
["0","0","0","0","0"]
]
**Output:** 1

**Example 2:**

**Input:** grid = [
["1","1","0","0","0"],
["1","1","0","0","0"],
["0","0","1","0","0"],
["0","0","0","1","1"]
]
**Output:** 3

```java
class Solution {

    public int numIslands(char[][] grid) {

        int m = grid.length;
        int n = grid[0].length;
        int count = 0;
       
        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
           
                if(grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j);
                }
            }
        }
        return count;
    }
    private void dfs(char[][] grid, int i, int j) {
        int m = grid.length;
        int n = grid[0].length;
       
        if(i < 0 || j < 0 || i >= m || j >= n || grid[i][j] == '0')
            return;
           
        grid[i][j] = '0';
        dfs(grid, i+1, j);
       
        dfs(grid, i-1, j);
        dfs(grid, i, j+1);
        dfs(grid, i, j-1);
    }
}
```

| Type  | Value        |
| ----- | ------------ |
| Time  | **O(m × n)** |
| Space | **O(m × n)** |

- Approach: Iterate through the grid. When a '1' is found, increment count and DFS to mark all connected '1's as '0' (visited).
- Dry run (grid = [["1","1","0"],["0","1","0"],["0","0","1"]]):
  - (0,0)='1' → count=1, DFS marks (0,0),(0,1),(1,1) as '0'
  - (2,2)='1' → count=2, DFS marks (2,2) as '0'
  - Result: 2

---