# Optimize Database Queries (`@ecocode/optimize-database-queries`)

⚠️ This rule _warns_ in the ✅ `recommended` config.

<!-- end auto-generated rule header -->  

## Rule details

You should optimize the Database Queries

## Examples

Examples of **non compliant** code for this rule:

```
query("SELECT raison_social, adresse, code_postal, telephone FROM clients ");
```

Examples of **compliant** code for this rule:

```
query("SELECT raison_social, adresse, code_postal, telephone FROM clients LIMIT 50");
```