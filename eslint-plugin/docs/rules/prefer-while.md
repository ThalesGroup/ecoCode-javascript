# A 'while' loop should be used instead of a 'for' loop (`@ecocode/prefer-while`)

⚠️ This rule _warns_ in the ✅ `recommended` config.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

:wrench: *fixable*

When only the condition expression is defined in a `for` loop, and the initialization and increment expressions are missing, a `while` loop should be used instead to increase readability.

## Noncompliant Code Example

```javascript
for (;condition;) { /*...*/ }
```

## Compliant Solution

```javascript
while (condition) { /*...*/ }
```