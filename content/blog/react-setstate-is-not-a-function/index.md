---
title: React - setState is not a function
date: "2020-03-14"
description: Losing the context of this inside component's handler method
featuredImage: './cover.png'
tags: javascript, react, frontend, setState
---

If you are a react developer and using a class component, you probably faced this error at least once:

> TypeError: this.setState is not a function

TL;DR - If you are not in the mode for reading or you just want the bottom line, then [here it is](#wrapping-up)

#### Prerequisite -

- We are going to mention the `this` context quite a lot here, if you are not exactly sure on how `this` works, i strongly advice reading [JavaScript - The "this" key word in depth](http://localhost:8000/js-this-in-depth/) first.
- We are also going to touch a little bit on the prototype chain subject, if you are not exactly sure how it works or not sure how classes works under the hood, i strongly advice reading [JavaScript - The prototype chain in depth](http://localhost:8000/js-prototype-in-depth/).

---

## The problem

In order to understand what are the possible solutions, lets first understand what is the exact issue here.

Consider this code block:

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  countUp() {
    this.setState(currentState => {
      return { count: currentState.count + 1 };
    });
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <button onClick={this.countUp}>{count}</button>
      </div>
    );
  }
}
```

We have a component that manage a state with a `counter` property, we have a handler that is attach to the `onClick` of a `<button>` which will invoke the `React.Component`'s `setState` method.

unfortunately, this won't work well. When the user click the button we will get an error:

> TypeError: this.setState is not a function

We do use the `extends React.Component` which means we get access to all `React.Component` methods via `this`. So how come we can't invoke `this.setState`.

The real problem here, is that we "lost" the context of `this` inside that handler, or maybe not lost but its not pointing to where we think it should point.

What is the context of `this` in our case then?

Lets revisit our flow-chart from the [JavaScript - The "this" key word in depth](http://localhost:8000/js-this-in-depth/#the-flow-chart) article:

![this-flow-chart](https://www.debuggr.io/static/f0e49d9509fa837ca7322cedf793be6a/4815e/the-this-flow-chart.png)

Although there is no "event handlers" flow, we can place them under the "dot notation" or "object's member".

You can look at event handlers that are attached to DOM elements as if the function is a method inside the element’s object, in our case the `button` object. We can look at it as if we did button.click() or even btn.countUp(). Note that this is not exactly whats going on under the hood, but this visualization of the invocation of the handler can help us with the formation of our “mental model” regarding the setting of this. You can read more about it on the [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#As_a_DOM_event_handler).

So what is this in our case? Lets walk through the flow:

- Is countUp an arrow function? - No.
- Was countUp called with new? - No.
- Was countUp called with call / apply / bind? - No.
- Was countUp called as an object method? - Yes (sort of), in our case the actual `button` is left to the dot, hence `this` is pointing to the `button` element.

This is why we have an error, because the `button` element does not have any `setState` method on it.

## Possible solutions

### bind

One possible solution is to use `bind` and return a new function with an explicit `this` reference:

```jsx{17}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  countUp() {
    this.setState(currentState => {
      return { count: currentState.count + 1 };
    });
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <button onClick={this.countUp.bind(this)}>{count}</button>
      </div>
    );
  }
}
```

This works great and we don't get any errors, although we are creating and passing a new function on each render cycle [which may have performance implications](https://reactjs.org/docs/faq-functions.html#bind-in-render) (and might not).

We can use `bind` in the constructor which will run only once for the entire life-time of the component.

```jsx{5, 18}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.countUp = this.countUp.bind(this);
  }

  countUp() {
    this.setState(currentState => {
      return { count: currentState.count + 1 };
    });
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <button onClick={this.countUp}>{count}</button>
      </div>
    );
  }
}
```

This way, we are "overriding" the class method with an instance method, meaning we are not using the `countUp` method attached to the `App.prototype` but creating a method directly on the instance returned by `App`.

*If you are not sure you fully understand how the prototype chain works under the hood, or not sure how classes works under the hood, i strongly recommend reading the [JavaScript - The prototype chain in depth](http://localhost:8000/js-prototype-in-depth/) article*

So why is using `bind` works for us? Lets walk through the flow again:

- Is countUp an arrow function? - No.
- Was countUp called with new? - No.
- Was countUp called with call / apply / bind? - Yes.

Meaning, our `this` will reference whatever we pass to `bind`, which is the class instance.

### Arrow function

Instead of manually dealing with the `this` reference and passing it via `bind`, we can let the language / engine do it for us.

When using arrow functions, the engine will not "mutate" the `this` reference and will leave it as is, meaning whatever the `this` is pointing to at the current execution context.

```jsx{17}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  countUp() {
    this.setState(currentState => {
      return { count: currentState.count + 1 };
    });
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <button onClick={() => this.countUp()}>{count}</button>
      </div>
    );
  }
}
```

We are passing an inline arrow function and invoking `this.countUp`, this way the engine will not "mutate" our `this` reference thus it won't point to the `button` element, our function is called with a dot notation.

So lets walk through the flow again:

- Is countUp an arrow function? - No.
- Was countUp called with new? - No.
- Was countUp called with call / apply / bind? - No.
- Was countUp called as an object method? - Yes, `this` is the object left to the dot - The auto created object inside `App` in this case (the instance).

While this works great, we are again passing a new function on each render cycle, although it won't create any issue most of the time you might want to create this function once. We can do that with [class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields#Public_instance_fields) - Note that at the time this article was written, class fields are a proposal in stage 3.

```jsx{7,17}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  countUp = () => {
    this.setState(currentState => {
      return { count: currentState.count + 1 };
    });
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <button onClick={this.countUp}>{count}</button>
      </div>
    );
  }
}
```

And if we are using class fields, why not remove the constructor and just declare the `state` as a class field?

```jsx{2}
class App extends React.Component {
  state = { count: 0 };

  countUp = () => {
    this.setState(currentState => {
      return { count: currentState.count + 1 };
    });
  };

  render() {
    const { count } = this.state;
    return (
      <div>
        <button onClick={this.countUp}>{count}</button>
      </div>
    );
  }
}

```

Now back to our `this`, why does it work with arrow functions? Lets walk through the flow again:

- Is countUp an arrow function? - Yes. So whatever the `this` is in the wrapping context, which is the class instance.

## Wrapping up

Make sure you don't "lose" the context of `this` in your handlers, either explicit pass it with `bind` (inline or override in constructor) or use and arrow function (inline or class field) that won't mutate and change the reference of `this` when it gets called.

I hope it was informative and helpful, if you have any further clarifications or corrections, feel free to comment or DM me on twitter ([@sag1v](https://twitter.com/sag1v)). 🤓
