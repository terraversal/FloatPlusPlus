# Float#

## Comments

/- This is a comment
/- This is a
multi-line comment. -/

## Variables and Constants

/- Float# declares string variables using `\ ` and ` /` (with the spaces). In the example below, `dec` is used to declare the variable, followed by the variable name, then the value, and lastly a semicolon to mark the end of the statement.

dec myVariable \ hello / ;

/- By default, variables can be changed later on with the `mod` keyword. To make an unchangeable variable, use the `@` symbol, then `dec`.

@dec myConstant \ hello / ;

mod myConstant \ world / ; /- Throws an error.
mod myVariable \ world / ; /- Works because `myVariable` is not constant and is declared without the `@` symbol.

/- Variables and constants should be declared with camelCase, but follow all other variable naming conventions.

/- A variable can have its type declared by using one of these types:

+ `[int]` - integer
+ `[flt]` - decimal (float)
+ `[str]` - string
+ `[tfn]` - boolean (true, false, null)
+ `[any]` - any

-/

dec [str] myString \ hello / ;
dec [int] myInteger 98 ;
dec [flt] myFloat 9.8 ;
dec [tfn] myBoolean true ;
dec [any] anyVariable 49 ;

/- We can assign empty variables as shown below.

dec [str] emptyVar ;
mod emptyVar \ I am not empty anymore! / ;

## Input and Output

/- We can display text using the `write` command.

write: \ hello world / ; /- Output: hello world
dec bestNumber 98 ;
write: bestNumber ;

/- We can receive text using the `read` command, declaring a variable to the value of a user's input.

write: \ What's your favorite number? / ;
dec userInput read ;
write: \ You picked: / + userInput ; /- The `+` symbol is for joining strings or variables in the same line.

/- We can also prompt a menu of specific options using `prompt`.

write: \ Pick your favorite color / ;
prompt: 
  1 \ Red / ;
  2 \ Orange / ;
  3 \ Yellow / ;
  4 \ Green / ;
  5 \ Blue / ;
  6 \ Purple / ;
end ;

## Loops

/- Below is an example of a while loop.

dec i 0 ;

while i [!=] 5 :
  write: i ;
  i ++ ; /- Increment operator
end ;

/- The `[!=]` keyword is the IS NOT comparison gate. All the comparison gates:

- [==] -=- is
- [!=] -=- is not
- [<<] -=- is less than
- [>>] -=- is greater than
- [<=] -=- is less than or equal to
- [>=] -=- is greater than or equal to
- [1?] -=- has value
- [0?] -=- has no value

-/

dec j 0 ;
dec k 10 ;

while j [!=] 5 [&&] k [!=] 5:
  write: j ;
  write: k ;

  j ++ ;
  k -- ; /- Decrement operator
end ;

/- The `[&&]` keyword is the AND logic gate. All the logic gates:

- [&&] -=- and
- [!&] -=- nand
- [??] -=- or
- [!?] -=- nor
- [!!] -=- not
- [*?] -=- xor

-/

## Arrays and Objects

/- You can declare a variable to be an array using `[as]` (array start) and `[ae]` (array end).

dec [str] stringArray [as]
\ two /
\ three /
\ five /
\ seven /
\ eleven /
[ae] ;

dec [int] integerArray [as] 2 3 5 7 11 [ae] ;

/- Items in an array of one type must only use that type. Otherwise, use [any]. By default, all items are expected to be the same type as the first type in an array.

/- To get an item from an array, use `[at]` and then the index (indexing starts at 0).

dec fifthItem stringArray [at] 4 ;

/- To declare an object, use `[os]` (object start) and `[oe]` (object end).

dec dateObject [os]
year: 1998
day: 8
month: 9
[oe] ;

/- You can access the properties of an object using `[key]` or `value`.

dec yearFromObject dateObject [key] year ; /- 1998
delete dateObject [key] year ; /- `year` is deleted from the object.
add dateObject [key] year [value] 1998 ;

## Functions

/- To declare a function, use `fn` followed by the function name, then the parameters in parentheses separated by `|`.

fn nameFunction ( firstName | lastName ):
  write: firstName + lastName ;
end ;

/- A function can have no parameters:

fn greet ():
  write: \ hello / ;
end ;

/- Running a function is similar to declaring one, but using `rn` instead.

rn greet () ; /- hello
rn nameFunction ( \ Alan / | \ Hoster /) ; /- Alan Hoster

/- We can assign a variable to a function as well.

dec [any] fullName nameFunction ( \ Alan / | \ Hoster /) ;

/- A function can have an undisclosed amount of parameters using the `...` keyword.

fn joinNumbers ( numbers: ... ): /- Creates a temporary array of parameters
  dec numLength rn lengthOf ( numbers ) ; /- Built in function
  dec counter 0 ;
  dec result \  / ;

  while counter [<<] numLength :
    mod result result + rn toString ( ( numbers [at] counter ) ) ;
    counter ++ ;
  end ;

  return result ; /- Returns something.
end ;

## Math and Grouping

/- Because the syntax of Float# is mostly whitespace separated, we can group some things together with parentheses.

/- Notice how in the example below, there are two sets of parentheses instead of one, for one argument. 

`mod result result + rn toString ( ( numbers [at] counter ) ) ;`

This is because grouping it treats it as one argument. If it had only one set of parentheses, it may be treated as two arguments: `numbers` and `counter`. Grouping it keeps it as a singular argument.

-/

/- This is useful in mathematical expressions.

rn ad ( 49 | 49 ) ; /- 98
rn sb ( 98 | 2 ) ; /- 96
rn mt ( 96 | 7 ) ; /- 672
rn dv ( 196 | 2 ) ; /- 98

/- To perform 5 + 5 * 3, we group them with parentheses.

rn a ( 5 | rn m ( 5 | 3 ) ) ;

## If Statements

/- If statements use `[ic]` (if condition), `[ec]` (else condition), and `[e]` (else).

/- Example if statement, not best practice.

write: \ Pick a number between 1 and 10 / ;
dec userChoice read ;

[ic] userChoice [0?] :
  write: \ Please enter a value / ;
[ec] userChoice [>>] 10 :
  write: \ Too high of a number / ;
[ec] userChoice [<<] 1 :
  write: \ Too low of a number / ;
end ; 