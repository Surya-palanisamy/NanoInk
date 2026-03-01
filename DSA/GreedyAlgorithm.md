## Best Time to Buy and Sell Stock (single transaction)

> You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

```java
class Solution {
    public int maxProfit(int[] prices) {
        int p=prices[0],sell=0;
        for(int i:prices){
            if(i<p) p=i;
            else if (i-p>sell) sell=i-p;
        }
     return sell;
}}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(1)** |

- Approach: Track min price and max profit.
- Dry run (prices = [7,1,5,3,6,4]):
  - p=7, sell=0
  - i=1: p=1, sell=0
  - i=2: p=1, sell=4
  - i=3: p=1, sell=4
  - i=4: p=1, sell=5
  - i=5: p=1, sell=5 → Answer is 5.

## Distribute Candies (leetcode 575)

> Alice has `n` candies, where the `ith` candy is of type `candyType[i]`. Alice noticed that she started to gain weight, so she visited a doctor. The doctor advised Alice to only eat `n / 2` of the candies she has (`n` is always even). Return the maximum number of different types of candies she can eat if she only eats `n / 2` of them.

```java 
import java.util.HashSet;

class Solution {
    public int distributeCandies(int[] candyType) {
        HashSet<Integer> set = new HashSet<>();
        for (int c : candyType) {
            set.add(c);
        }        
        int uniqueTypes = set.size();
        int canEat = candyType.length / 2;
        return Math.min(uniqueTypes, canEat);
    }
}
```

| Type  | Value    |
| ----- | -------- |
| Time  | **O(n)** |
| Space | **O(n)** |

- Approach: Use a HashSet to count unique candy types and return the minimum of unique types or `n/2`.
- Dry run (candyType = [1,1,2,3]):
  - n = 4, canEat = 2
  - set = {1, 2, 3}, uniqueTypes = 3
  - Math.min(3, 2) → Answer is 2.



