## Even or Odd

> Given an integer `n`, determine if it is even or odd using bitwise operators.

```java
int n = 13;
if ((n & 1) == 0) System.out.println("Even");
else System.out.println("Odd");

```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(1)** |
| Space | **O(1)** |

- Dry run: 13 in binary is 1101; 1101 & 0001 = 0001 → odd.

---

## Multiply by 2

> Given an integer `n`, multiply it by 2 using bitwise shift operators.

```java
int n = 7;
int result = n << 1;
System.out.println(result);
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(1)** |
| Space | **O(1)** |

- Dry run: 7(0111) << 1 → 1110(14).

---

## Divide by 2

> Given an integer `n`, divide it by 2 using bitwise shift operators.

```java
int n = 14;
int result = n >> 1;
System.out.println(result);
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(1)** |
| Space | **O(1)** |

- Dry run: 14(1110) >> 1 → 0111(7).

---

## Power of 2

> Given an integer `n`, check if it is a power of 2 using bitwise operators.

```java
int n = 16;
if (n > 0 && (n & (n - 1)) == 0)
    System.out.println("Power of 2");
else
    System.out.println("Not power of 2");
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(1)** |
| Space | **O(1)** |

- Dry run: 16(10000) & 15(01111) = 0 → power of 2.

---

## Count Number of 1s

> Given an integer `n`, count the number of set bits (1s) in its binary representation.

```java
int n = 15, count = 0;
while (n != 0) {
    count += (n & 1);
    n = n >> 1;
}
System.out.println(count);
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(log n)**|
| Space | **O(1)** |

- Dry run: 15(1111) → bits: 1+1+1+1=4.

---

## Print Powers of 2

> Given an integer `n`, print all powers of 2 from $2^0$ to $2^n$.

```java
int n = 5;
for (int i = 0; i <= n; i++) {
    System.out.println("2^" + i + " = " + (1 << i));
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Dry run: i=0→1, i=1→2, i=2→4, i=3→8, i=4→16, i=5→32.

---

## Set a Specific Bit

> Given an integer `n` and a zero-indexed position `k`, set the `k`-th bit of `n` to 1.

```java
int n = 10, k = 2;
n = n | (1 << k);
System.out.println(n);
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(1)** |
| Space | **O(1)** |

- Dry run: n=10(1010), mask=1<<2=0100 → 1010|0100=1110(14).

---

## Clear a Specific Bit

> Given an integer `n` and a zero-indexed position `k`, clear the `k`-th bit of `n` (set it to 0).

```java
int n = 14, k = 1;
n = n & ~(1 << k);
System.out.println(n);

```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(1)** |
| Space | **O(1)** |

- Dry run: mask=~(0010)=...1101 → 1110 & 1101 = 1100(12).

---

## Toggle a Specific Bit

> Given an integer `n` and a zero-indexed position `k`, toggle the `k`-th bit of `n`.

```java
int n = 12, k = 2;
n = n ^ (1 << k);
System.out.println(n);

```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(1)** |
| Space | **O(1)** |

- Dry run: 1100 ^ 0100 = 1000(8).

---

## Count Trailing Zeros

> Given an integer `n`, count the number of trailing zeros in its binary representation.

```java
int n = 40, count = 0;
while ((n & 1) == 0 && n != 0) {
    count++;
    n = n >> 1;
}
System.out.println(count);

```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(log n)**|
| Space | **O(1)** |

- Dry run: 40(101000) → shift until LSB=1 → zeros=3.

---

## Count Bits (LeetCode 338)

> Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (0 <= i <= n), `ans[i]` is the number of 1's in the binary representation of `i`.

```java
public int[] countBits(int n) {
    int[] ans = new int[n + 1];
    for (int i = 1; i <= n; i++) ans[i] = ans[i >> 1] + (i & 1);
    return ans;
}

```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(n)** |

- Dry run (n=5): ans=[0,1,1,2,1,2] using recurrence ans[i]=ans[i>>1]+(i&1).


