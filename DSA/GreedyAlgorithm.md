## Best Time to Buy and Sell Stock (single transaction)
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

- Approach: Track min price and max profit.
- Dry run (prices = [7,1,5,3,6,4]):
  - p=7, sell=0
  - i=1: p=1, sell=0
  - i=2: p=1, sell=4
  - i=3: p=1, sell=4
  - i=4: p=1, sell=5
  - i=5: p=1, sell=5 → Answer is 5.

## Distribute Candies (leetcode 575)

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
- Approach: Use a HashSet to count unique candy types and return the minimum of unique types or `n/2`.
- Dry run (candyType = [1,1,2,3]):
  - n = 4, canEat = 2
  - set = {1, 2, 3}, uniqueTypes = 3
  - Math.min(3, 2) → Answer is 2.



