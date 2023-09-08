# Disallow multiple access of same DOM element (`@ecocode/avoid-full-sql-request`)

## Rule details

When initializing the "img" tag. Do not leave the "src" attribute empty

## Examples

Examples of **incorrect** code for this rule:

```js
<img src="" alt="Logo HubSpot"/>
```

Examples of **correct** code for this rule:

```js
<img src="https://assets.codepen.io/6093409/sprockt.svg" alt="Logo HubSpot"/>
```