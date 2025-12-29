
## Even or Odd

```java
int n = 13;
if ((n & 1) == 0) System.out.println("Even");
else System.out.println("Odd");
```

- Dry run: 13 in binary is 1101; 1101 & 0001 = 0001 → odd.

---

## Multiply by 2

```java
int n = 7;
int result = n << 1;
System.out.println(result);
```

- Dry run: 7(0111) << 1 → 1110(14).

---

## Divide by 2

```java
int n = 14;
int result = n >> 1;
System.out.println(result);
```

- Dry run: 14(1110) >> 1 → 0111(7).

---

## Power of 2

```java
int n = 16;
if (n > 0 && (n & (n - 1)) == 0)
    System.out.println("Power of 2");
else
    System.out.println("Not power of 2");
```

- Dry run: 16(10000) & 15(01111) = 0 → power of 2.

---

## Count Number of 1s

```java
int n = 15, count = 0;
while (n != 0) {
    count += (n & 1);
    n = n >> 1;
}
System.out.println(count);
```

- Dry run: 15(1111) → bits: 1+1+1+1=4.

---

## Print Powers of 2

```java
int n = 5;
for (int i = 0; i <= n; i++) {
    System.out.println("2^" + i + " = " + (1 << i));
}
```

- Dry run: i=0→1, i=1→2, i=2→4, i=3→8, i=4→16, i=5→32.

---

## Set a Specific Bit

```java
int n = 10, k = 2;
n = n | (1 << k);
System.out.println(n);
```

- Dry run: n=10(1010), mask=1<<2=0100 → 1010|0100=1110(14).

---

## Clear a Specific Bit

```java
int n = 14, k = 1;
n = n & ~(1 << k);
System.out.println(n);
```

- Dry run: mask=~(0010)=...1101 → 1110 & 1101 = 1100(12).

---

## Toggle a Specific Bit

```java
int n = 12, k = 2;
n = n ^ (1 << k);
System.out.println(n);
```

- Dry run: 1100 ^ 0100 = 1000(8).

---

## Count Trailing Zeros

```java
int n = 40, count = 0;
while ((n & 1) == 0 && n != 0) {
    count++;
    n = n >> 1;
}
System.out.println(count);
```

- Dry run: 40(101000) → shift until LSB=1 → zeros=3.

---

## Count Bits (LeetCode 338)

```java
public int[] countBits(int n) {
    int[] ans = new int[n + 1];
    for (int i = 1; i <= n; i++) ans[i] = ans[i >> 1] + (i & 1);
    return ans;
}
```

- Dry run (n=5): ans=[0,1,1,2,1,2] using recurrence ans[i]=ans[i>>1]+(i&1).
