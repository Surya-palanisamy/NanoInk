## Coin Change Ways

> Given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money, return the number of combinations that make up that amount.

```java
public class CoinChangeWays {
    public static int countWays(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;
        for (int coin : coins) {
            for (int i = coin; i <= amount; i++) {
                dp[i] += dp[i - coin];
            }
        }
        return dp[amount];
    }
}

```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n * amount)** |
| Space | **O(amount)** |

- Dry run (coins={1,2,5}, amount=5):
  - start: [1,0,0,0,0,0]
  - coin=1 → [1,1,1,1,1,1]
  - coin=2 → [1,1,2,2,3,3]
  - coin=5 → [1,1,2,2,3,4] → ways=4


