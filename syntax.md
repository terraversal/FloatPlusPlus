# Float++ Syntax

## Comments

/- This is a single line comment.
/- This is a 
multi 
line 
comment. -/

## Variables

/- Variable declaration follows the pattern of `[datatype] [variable name] [value];`.

[int] numberVar 98;
[flt] floatVar 9.8;
[str] stringVar s\ 98 /s; /- Use `s\` and `/s` instead of quotes.
[tfn] booleanVar T^; /- A boolean variable can be `T^` (true), `F^` (false), or `N^` (null).
[any] anytypeVar 98;

/- Variables are unchangeable by default. To allow a variable to be changed, use `[c]`  at the beginning.

[c] [int] numberVar 98;
reassign numberVar 49; /- Reassigns `number` to 49.

## Escapes

/- To escape something in a string, surround the text with `|`.

[str] string s\ Use |s\| at the beginning of a string /s;

## Input and output

/- To display text, use the `write` command.

write number; /- Displays the value of `number`. If `number` has no value, it displays `N^`.
write s\ Hello world! /s;

/- To request text, use the `read` command.

[int] userInput read;
write s\ You typed: /s;
write userInput;

/- You can put variables in strings by using `v\` and `/v`.

write s\ You typed: v\ userInput /v. /s;

## Math

/- Instead of symbols for math expressions (except for the `++` increment operator and the `--` decrement operator), you use `[ad]`, `[st]`, `[my]`, and `[dv]` for addition, subtraction, multiplication, and division.

[int] addition 49 [ad] 49;
[int] subtraction 196 [st] 98;
[int] multiplication 14 [my] 7;
[int] division 196 [dv] 2;

## Functions

/- To declare a function, use `[f]`, the name of the function, `[pars]`, the parameters (with the types), and then `[d]`.

[f] myFunction [pars] [int] parameterOne [int] parameterTwo [d]
__return parameterOne [ad] parameterTwo; /- Underscores instead of indentation, no commas between parameters.
[e];

callFunc myFunction 2 3;

## Formatting

/- Formatting in Float++ has no meaning in the code. Float++ uses Markdown-style headers.

```
# My Awesome Project

## Constants

[int] importantVar 98;
[int] importantVar2 49;
[int] importantVar3 14;

## Variables

[c] [int] counter 0;

## Functions
[f] function [pars] input rate [d]
__return input [my] rate;
[e];

```
/- `[f]` stands for "function," `[d]` stands for "do," and `[e]` means "end."

## Loops and if statements

/- This is an if statement:

[ic] userInput [GT] number [d]
__write s\ Too high /s;
[ec] userInput [LT] number [d]
__write s\ Too low /s;
[ec] [d]
__write s\ Correct! /s;
[e];

/- `[ic]` means "if condition," `[ec]` means "else condition," and `[ec]` without any condition is equivalent to "else." `[GT]` means "greater than." These are all conditional operators:

`[GT]` -=- greater than
`[LT]` -=- less than
`[IGT]` -=- inclusive greater than
`[ILT]` -=- inclusive less than
`[EQ]` -=- equals
`[DEQ]` -=- does not equal
`[HV]` -=- has value
`[NV]` -=- has no value

-/

/- This is a while loop:

[c] [int] counter 0;
while counter [LT] 5 [d]
__counter++; /- Increment operator
[e];

## Arrays and objects

/- This is an example of an array:

[int] intArray [as] 2 3 5 7 11 13 [ae]; /- array start, and array end.
[str] stringArray [as]
s\ two /s
s\ three /s
s\ five /s
s\ seven /s
s\ eleven /s
s\ thirteen /s
[ae];

/- You can change the contents of an array with several functions

callFunc remove stringArray 0; /- Removes the first element of stringArray. Negative indices are used for getting the last, second last, and so on.
callFunc add stringArray 6 0; /- Adds 6 to be index 0 of stringArray.
callFunc swap stringArray 3 6; /- Swaps index 3 and index 6.
callFunc move stringArray 3 6; forward /- Moves index 3 to index 6, pushing index 6 forward. The other parameter is `backward`.

[any] secondArrItem callFunc 2 stringArray; /- Declares `secondArrItem` to be the second item of stringArray.

## Math grouping and order

/- Math expressions can be grouped with space separated parentheses

[int] exp (2 [ad] 2) [my] 4; /- Evaluates to 16

/- Without grouping, expressions are calculated using PEMDAS by default

[int] exp 2 [ad] 2 [my] 4; /- Evaluates to 8j