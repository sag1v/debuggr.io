---
title: JavaScript == VS === The truth
published: true
description: The truth behind the double and tripple equal in JavaScript
tags: javascript, equality
---

Some of the most frequently-asked interview questions of Front-End are about Equality comparisons and sameness in JavaScript (ECMAScript).

And the queen of these questions is:
> What is the difference between the “double equals” and the “triple equals”?

Well, we all know the answer for that. The triple equal checks for types while the double equal isn’t.

That could be a short and nice answer for this question but unfortunately it is **FALSE**.

As per the specs, [7.2.14 Abstract Equality Comparison](https://tc39.github.io/ecma262/#sec-abstract-equality-comparison) you can clearly see at the first check:
> If [Type](https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values)(x) is the same as [Type](https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values)(y), then
> Return the result of performing [Strict Equality Comparison](https://tc39.github.io/ecma262/#sec-strict-equality-comparison) x === y.

Well there we have it, the “double equal” should check the type in both sides of the operator and if they are the same, it will delegate the rest of the work to the “triple equal” (Strict Equality Comparison).

Ok then, is the “triple equal” checking for types then?

YUP! we can see it on the [first line](https://tc39.github.io/ecma262/#sec-strict-equality-comparison):
> If [Type](https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values)(x) is different from [Type](https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values)(y), return false.

Ouch, so what is the difference then?

The right answer to this question is that the “double equal” allows type coercion while the “triple equal” won’t allow it.

The “Double equal” a.k.a “Abstract Equality” or “Loose equality” will use every trick in the ECMAScript specifications book to coerce a type conversion in order to perform an equality comparison:

![](https://cdn-images-1.medium.com/max/2002/0*04qYlc58heWAQGQZ)

The “Triple equal” a.k.a “Strict equality” will immediately return false if the two sides are not of the same type:

![](https://cdn-images-1.medium.com/max/2000/0*1dVbliLaELRB-6nH)

## *Bonus tip.

What will happen if we will run this block of code:

```javascript
var x = 2;

if(x == true){
  console.log('x is truthy!');
}
```

Nothing is printed to the console.

But we know that 2 is not a [“falsy” value](https://developer.mozilla.org/en-US/docs/Glossary/Falsy), so it should be loosely equal to true, Should it?

OK, maybe we are way off and 2 is a [“Falsy” value](https://developer.mozilla.org/en-US/docs/Glossary/Falsy):
```javascript
var x = 2;

if(x == false){
  console.log('x is falsy!');
}
```

Nothing again? 😲

How is it possible that a value with a type of Number is not truty or falsy?

Lets revisit the spec and notice these 2 interesting rules in the “Abstract Equality” section:
> If [Type](https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values)(x) is Boolean, return the result of the comparison ! [ToNumber](https://tc39.github.io/ecma262/#sec-tonumber)(x) == y.
> If [Type](https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values)(y) is Boolean, return the result of the comparison x == ! [ToNumber](https://tc39.github.io/ecma262/#sec-tonumber)(y).

You see, the specs says that if one of the sides is of type Boolean, the engine should perform the [Abstract ToNumber](https://tc39.github.io/ecma262/#sec-tonumber) on it, but it doesn’t say that the engine should do anything to the other side’s type.

So basically this is how it coerce:

* false becomes 0

* true becomes 1

* x is still 2

Hence none of our conditions is fulfilled => `2 != 0 && 2 != 1`.

But what if we just want to check that (x) holds a [“Truthy” value](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)? we could just pass it to an `if`:

```javascript
var x = 2;

if(x){
  console.log('x is truthy!');
}
// x is truthy!
```

Success!

## Take Away

Never ever perform a “loosely” comparison (double equal) when one side is an explicit Boolean type.

## Recap

* Both the “double equal” and “triple equal” perform a type check, while the former allows a type coercion and the latter doesn’t.

* Never use a “double equal” when you want to explicit compare against a Boolean.
