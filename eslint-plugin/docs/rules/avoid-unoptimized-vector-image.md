# Avoid Unoptimized Vector Images (`@ecocode/avoid-unoptimized-vector-image`)

<!-- end auto-generated rule header -->

## Rule details

Less heavy SVG images using less bandwidth

## Examples

Examples of **incorrect** code for this rule:

```js
const svg = '<svg><!-- ... --></svg>';
someFunction(svg);
```
```js
const svg = '<svg xmlns:svg="...">...</svg>';
someFunction(svg);
```
```js
const svg = '<svg><metadata>...</metadata></svg>';
someFunction(svg);
```

Examples of **correct** code for this rule:

```js
const svg = '<svg><!-- ... --></svg>';
someFunction(svg);
```
```js
const svg = '<svg xmlns:svg="...">...</svg>';
someFunction(svg);
```
```js
const svg = '<svg><metadata>...</metadata></svg>';
someFunction(svg);
```