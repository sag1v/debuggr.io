---
title: React - Cannot read property 'map' of undefined
date: "2020-03-12"
description: When our data is not ready yet for rendering
featuredImage: './cover.png'
tags: javascript, react, frontend, undefined
---

If you are a react developer, there is a good chance that you faced this error couple of times:

> TypeError: Cannot read property 'map' of undefined

TL;DR - If you are not in the mode for reading or you just want the bottom line, then [here it is](#wrapping-up)

## The problem

In order to understand what are the possible solutions, lets first understand what is the exact issue here.

Consider this code block:

```jsx
// Just a data fetching function
const fetchURL = "https://jsonplaceholder.typicode.com/todos/";
const getItems = () => fetch(fetchURL).then(res => res.json());

function App() {
  const [items, setItems] = useState();

  useEffect(() => {
    getItems().then(data => setItems(data));
  }, []);

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
```

We have a component that manage a state of `items`, it also have an effect which inside it we run an **asynchronous** operation - `getItems`, which will return us the `data` we need from the server, then we call `setItems` with the received data as `items`.
This component also renders the `items` - it iterate over it with `.map` and returning a react element for each item.

But we wont see anything on the screen, well except the error:
> TypeError: Cannot read property 'map' of undefined

What's going on here?

We do have an `items` variable:

```jsx
const [items, setItems] = useState();
```

And we did populate it with our data returned from the server:

```jsx{2}
useEffect(() => {
    getItems().then(data => setItems(data));
  }, []);
```

Well lets examine how the react flow looks like in our example:

1. React renders (invoking) our component.
2. React "see" the `useState` call and return us `[undefined, fn]`.
3. React evaluate our return statement, when it hits the `items.map(...)` line its actually running `undefined.map(...)` which is obviously an error in JavaScript.

What about our `useEffect` call though?

React will run all effects **after** the render is committed to the screen, which means we can't avoid a first render without our data.

## Possible solutions

### #1 Initial value

One possible solution is to give your variable a default initial value, with `useState` it would look like that:

```jsx
const [items, setItems] = useState([]);
```

This means that when react runs our `useState([])` call, it will return us with

```jsx
[[], fn]
```

Which means that in the first render of our component, react will "see" our `items` as an empty array, so instead of running `undefined.map(...)` like before, it will run `[].map(...)`.

### #2 Conditional rendering

Another possible solution is to conditionally render the `items`, meaning `if` we have the items then render them, `else` don't render (or render something else).

When working with `JSX` we can't just throw some `if` `else` statements inside our tree:

```jsx{7-11}
// ⚠️ wont work!!
export default function App() {
  // ....
  return (
    <div>
      {
        if(items){
          items.map(item => (
            <div key={item.id}>{item.title}</div>
          ))
        }
      }
    </div>
  );
}
```

But instead we can create a variable outside our tree and populate it conditionally:

*Note that we removed the initial array for `items`.*

```jsx{8-13,15}
function App() {
  const [items, setItems] = useState();

  useEffect(() => {
    getItems().then(data => setItems(data));
  }, []);

  let itemsToRender;
  if (items) {
    itemsToRender = items.map(item => {
      return <div key={item.id}>{item.title}</div>;
    });
  }

  return <div>{itemsToRender}</div>;
}
```

The `undefined` or `null` values are ignored inside the context of `JSX` so its safe to pass it on for the first render.

We could also use an `else` statement if we want to render something else like a spinner or some text:

```jsx{13-15}
function App() {
  const [items, setItems] = useState();

  useEffect(() => {
    getItems().then(data => setItems(data));
  }, []);

  let itemsToRender;
  if (items) {
    itemsToRender = items.map(item => {
      return <div key={item.id}>{item.title}</div>;
    });
  } else {
    itemsToRender = "Loading...";
  }

  return <div>{itemsToRender}</div>;
}
```

### #2.5 Inline conditional rendering

Another option to conditionally render something in react, is to use the `&&` logical operator:

```jsx{10-12}
function App() {
  const [items, setItems] = useState();

  useEffect(() => {
    getItems().then(data => setItems(data));
  }, []);

  return (
    <div>
      {items && items.map(item => {
          return <div key={item.id}>{item.title}</div>;
        })}
    </div>
  );
}
```

Why it works? The [react docs](https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator) explains it well:
>It works because in JavaScript, true && expression always evaluates to expression, and false && expression always evaluates to false.
>Therefore, if the condition is true, the element right after && will appear in the output. If it is false, React will ignore and skip it.

We can also use the conditional operator `condition ? true : false` if we want to render the `Loading...` text:

```jsx{10-14}
function App() {
  const [items, setItems] = useState();

  useEffect(() => {
    getItems().then(data => setItems(data));
  }, []);

  return (
    <div>
      {items
        ? items.map(item => {
            return <div key={item.id}>{item.title}</div>;
          })
        : "Loading..."}
    </div>
  );
}
```

We can also mix both solutions, i.e: initial value with conditional rendering:
```jsx{2,10-14}
function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems().then(data => setItems(data));
  }, []);

  return (
    <div>
      {items && items.length > 0
        ? items.map(item => {
            return <div key={item.id}>{item.title}</div>;
          })
        : "Loading..."}
    </div>
  );
}
```

Though keep in mind, whenever conditions become too complex, it might be a signal for us to extract that logic to a component:

```jsx{1-9,20}
function List({ items, fallback }) {
  if (!items || items.length === 0) {
    return fallback;
  } else {
    return items.map(item => {
      return <div key={item.id}>{item.title}</div>;
    });
  }
}

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems().then(data => setItems(data));
  }, []);

  return (
    <div>
      <List items={items} fallback={"Loading..."} />
    </div>
  );
}
```

## Wrapping up

When we get such an error, we are probably getting the value in an asynchronous way. We should provide an initial value for our variable or [conditionally render it](https://reactjs.org/docs/conditional-rendering.html) or both. If our condition become too complex, it might be a good time to extract the logic to a component.

Hope you found this article helpful, if you have a different approach or any suggestions i would love to hear about them, you can tweet or DM me [@sag1v](https://mobile.twitter.com/sag1v). 🤓
