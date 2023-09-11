# Use loops instead of reduce or ForEach (`@ecocode/use-loop-insteadof-reduce-foreach`)

⚠️ This rule _warns_ in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Rule details

The ratio to the rather glaring difference between the for/foreach and the for...in factor of 8 to 10 for tests carried out however on "small" (200 elements) tables, even more blatant on large tables (passage from 3ms to 500ms on the test).

## Examples

Examples of **incorrect** code for this rule:

```js
 const numbers = [15.5, 2.3, 1.1, 4.7];
 document.getElementById("demo").innerHTML = numbers.reduce(getSum, 0);

 function getSum(total, num) {
   return total + Math.round(num);
 }
```

```js
 const fruits = ["apple", "orange", "cherry"];
 fruits.forEach(myFunction);
```
Examples of **correct** code for this rule:

```js
 for (let i = 0; i < cars.length; i++) {
      text += cars[i] + "<br>";
}
```