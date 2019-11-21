---
title: JavaScript - Closure in depth
date: "2019-11-21"
featuredImage: ./cover.png
description: Learn the concept of closure in JavaScript.
tags: javascript, webdev, node, frontend
---

In this article we will learn about the concept of closures in JavaScript, we will see how functions can be stateful with persistent data across multiple executions. We will also explore some of the popular use cases of closure and different approaches for using them.

Lets start with a quote from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures):
>A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

If you ask me, i would say that closures enables us to create stateful functions.

## Stateful functions

Stateful functions are functions that can "remember" data from previous executions. For example lets create a function that "remembers" and count how many times it got executed, each time that we will invoke it, it will log the number of times it got executed.

To do that, we will need some kind of a `counter` variable that will hold the current number of executions and will get incremented every time we invoke the function, the challenge here is to decide on where to put this variable.

Lets explore our first approach:

```jsx
function counter(){
  let numOfExecutions = 0;
  numOfExecutions++;
  console.log(numOfExecutions);
}

counter() // 1
counter() // 1
```

Obviously this won't work well, because we are re-creating the `numOfExecutions` variable every time we invoke `counter()`.

## Execution context

Every time we invoke a function, a new execution context is created, and each execution context has its own "Variable Environment" or "scope" if you will. This local variable environment is holding all arguments that got passed to it and all declarations made inside the body of the function, in our case the `numOfExecutions` variable. When the function is "done", e.g with a `return` statement or there are no more lines of code to execute, the engine will mark it to be garbage collected, meaning it's entire environment will get disposed.

This is the reason our code above doesn't work well, every time we invoke `counter` we create a new execution context with a new declaration of the `numOfExecutions` variable and incrementing it ot the value of `1`.

## Global execution context

When we start our program, the engine will create a global execution context for us, its not different from the execution context we create when we invoke a function. It also has a "Variable Environment" just like any other execution context, the difference is that the global execution context will never "die" (as long as our program is running of course), hence it's variable environment won't get disposed by the garbage collector.

So knowing that, we can maybe store our `numOfExecutions` in the global variable environment, this way we know it won't get re-created each time we invoke `counter`.

```jsx{1}
let numOfExecutions = 0;

function counter(){
  numOfExecutions++;
  console.log(numOfExecutions);
}

counter() // 1
counter() // 2
```

This works as we expect, we get the correct number of invocations, but you probably already know that storing variables on the global environment is considered as bad practice. For example see what happens if another function wants to use the exact same variable:

```jsx{9}
let numOfExecutions = 0;

function counter() {
  numOfExecutions++;
  console.log(numOfExecutions);
}

function someFunc() {
  numOfExecutions = 100;
}

someFunc()
counter() // 101
counter() // 102
```

As you can see we get some wrong numbers in here.

## Lexical Scope

Lexical Scope is basically a fancy way of saying "Static Scope", meaning we know at creation time what is the scope of our function.

Read this carefully:
> **WHERE** you define your function, determines what variables the function have access to **WHEN** it gets called.

In other words, id doesn't matter where and how you invoke the function, its all about where did it got declared.

But how do we declare a function in one place, and invoke it in another place? Well, we can create a function within a function and return it:

```jsx
function createFunc() {
  function newFunc(){
  
  }
  
  return newFunc;
}

const myFunc = createFunc();
myFunc()
```

It seems useless but lets explore the execution phase of our program:

1. We declare a new function with the `createFunc` label in the global variable environment.
2. We declare a new variable `myFunc` in the global variable environment which it's value will be the returned value from the execution of`createFunc`.
3. We invoke the `createFunc` function.
4. A new execution context is created (with a local variable environment).
5. We declare a function and giving it a label of `newFunc` (stored in the local variable environment of `createFunc`).
6. We return `newFunc`.
7. The returned *value*** from `createFunc` is stored as the value of `myFunc` in the global variable environment.
8. The variable environment of `createFunc` is marked for disposal (meaning the `newFunc` variable will not exist).
9. We invoke `myFunc`.

Note that when we return the function `newFunc`, we return the actual function definition, not the label.

OK, so what can we do with this approach?