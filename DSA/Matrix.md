## Rotate Matrix 90° Clockwise

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

- Dry run (3x3):
  - After transpose: `[[1,4,7],[2,5,8],[3,6,9]]`
  - Reverse rows: `[7,4,1]; [8,5,2]; [9,6,3]`
  - Output :
    7 4 1
    8 5 2
    9 6 3
