# "switch" statements should have at least 3 "case" clauses (`@ecocode/avoid-small-switch`)

⚠️ This rule _warns_ in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

`switch` statements are useful when there are many different cases depending on the value of the same expression.

For just one or two cases however, the code will be more readable with `if` statements.

## Noncompliant Code Example

```javascript
switch (variable) {
  case 0:
    doSomething();
    break;
  default:
    doSomethingElse();
    break;
}
```

## Compliant Solution

```javascript
if (variable == 0) {
  doSomething();
} else {
  doSomethingElse();
}
```