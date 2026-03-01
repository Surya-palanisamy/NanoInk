## Rotate Matrix 90° Clockwise

> You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place.

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

> Given an `m x n` matrix, return all elements of the matrix in spiral order.

matrix = [[1, 2, 3],[4, 5, 6],[7, 8, 9]]

output : [1,2,3,6,9,8,7,4,5]

![Spiral matrix](https://res.cloudinary.com/dwdbp4qpe/image/upload/v1772336656/spiral1_mh7qz6.jpg)

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

| Feature          | Value                     |
| ---------------- | ------------------------- |
| Time Complexity  | O(m × n)                  |
| Space Complexity | O(1) extra                |
| Traversal        | Each element visited once |
