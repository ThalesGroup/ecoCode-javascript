# Avoid full sql request (`@ecocode/avoid-full-sql-request`)

⚠️ This rule _warns_ in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Rule details

The database server must resolve the fields according to the schema. If you know the schema, it is highly recommended to name the fields.

## Examples

Examples of **incorrect** code for this rule:

```js
const query = "SELECT * FROM clients";
```

Examples of **correct** code for this rule:

```js
const query = "SELECT raison_social, adresse, code_postal, telephone FROM clients";
```