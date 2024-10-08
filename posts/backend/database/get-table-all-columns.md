# Get table all columns

## MySql

```sql
SELECT
COLUMN_NAME,
DATA_TYPE
FROM
INFORMATION_SCHEMA.COLUMNS
WHERE
TABLE_NAME = 'TableName'
AND TABLE_SCHEMA = 'DatabaseName';
```

## PostgreSQL

```sql
SELECT 
COLUMN_NAME,
data_type
FROM
information_schema.COLUMNS
WHERE
TABLE_NAME = 'TableName'
AND table_schema = 'public';
```
