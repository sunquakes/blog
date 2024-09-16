# How to use if in shell

## Syntax

```shell
if [ expression ]
then
  commands
elif [ expression ]
then
  commands
else
  commands
fi
```

## Number check

| Operator | Meaning               |
| :------- | :-------------------- |
| -eq      | equal                 |
| -ne      | not equal             |
| -gt      | greater than          |
| -ge      | greater than or equal |
| -lt      | less than             |
| -le      | less than or equal    |

## String check

| Operator | Meaning   |
| :------- | :-------- |
| -z       | empty     |
| -n       | not empty |
| =        | equal     |
| !=       | not equal |

## File check

| Operator | Meaning    |
| :------- | :--------- |
| -e       | exist      |
| -f       | file       |
| -d       | directory  |
| -r       | readable   |
| -w       | writable   |
| -x       | executable |
| -s       | size > 0   |
| -c       | char file  |
| -b       | block file |
