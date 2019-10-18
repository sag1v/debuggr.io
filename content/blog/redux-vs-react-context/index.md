---
title: Redux is dead! long live react’s context API(?)
date: "2018-07-25"
description: Can we really compare react's context with redux?
featuredImage: './cover.png'
tags: javascript, redux, react, frontend
---

Well, do not let the title mislead you, it is only meant to lure you in :) 
`Redux` is not dead. on the contrary it is very alive and is far from being irrelevant.

## So what are you doing here?

This post is meant to be a “counter attack” against all of the blog-posts / articles / tutorials / tweets / stories that sprang up like mushrooms after the rain when react v16.3 released and the announce about the [New Context API](https://reactjs.org/blog/2018/03/29/react-v-16-3.html).
And shockingly this is not a passing trend, people still write and post about this match-up.

Posts that shared a similar title like this post or something like:
“Redux Vs React’s new context API”

**Spoiler alert!!!**
Most of them will tell you it depends on how big is your app.

I have nothing against any of the authors of these posts, but I do think this is important enough to write about.

I think this is one of the most misleading and confusing topics for developers that are either new to react or new to `Redux`.   
When people start to learn react they get flooded with topics like npm, babel, ES6, webpack, node.js, express, `Redux` and the list goes on.

Not only are these topics not mandatory for learning react but also may lead to confusion, especially if it leads them to think that `Redux` is just a way to pass data down to react’s child components and now there’s a better way, called the new react context API.

It is impossible to compare the two, you know what? let’s try.

## Trial #1 — `Redux` Vs The new context API

* **`Redux`** is a state-manager, it helps you manage a big JavaScript object that holds the state of your application.
It’s doing it with style though, in a beautiful functional way with pure functions (reducers), plain and serializable objects as actions, great middle-ware support and an amazing pub/sub architecture.
By the way, `Redux` has nothing to do with react. OK, one of the authors of `Redux` is working at facebook and surprisingly at the react team. but really, `Redux` has no opinions about which framework or library you should use.
You can use it with AngularJS or Angular10, you can use it with jQuery or vanilla JS, you can even use it with react! Its “just” a javascript state-manager library.
Actually let’s quote the [docs](https://redux.js.org/):
“*`Redux` is a predictable state container for JavaScript apps.”*

* **The new context API** is not even a new feature in react, it was there the whole time and it just got a new face. Well a new **A**pplication-**P**rogram-**I**nterface. Think of it for a moment, if it’s not new why people compare it now? (OK maybe it was a taboo :) )
Don’t get me wrong, it’s a great improvement for the API (using the [render props](https://reactjs.org/docs/render-props.html)) and a very important feature, but it’s not a new feature.
It allows you to expose data as a **Provider** (remember this word, we will bump into it again later on) and allows you as a **Consumer** to get a hold of this data.
Now get this, no matter how deeply nested the **Consumer** is as a child component it has access to the Provider’s data as if it is **connected** to it. This means you can pass data from a parent to a great-grandchild without the use of props.
It enables you to dodge the bullet of [prop drilling](https://blog.kentcdodds.com/prop-drilling-bb62e02cb691), and the best thing about the new context API is that you wont pay the price of magical data that popped out from nowhere (well, mostly).
So basically, react’s context feature is really just another way to pass data down to children.

*Note: if you’re tired of prop-drilling don’t forget you don’t have to encapsulate child components inside their parents, you can go for the [Containment](https://reactjs.org/docs/composition-vs-inheritance.html#containment) pattern and just render the {children}.*

Well we are trying to compare a “State manager for JavaScript applications” with yet another way of react to pass data from a parent component down to it’s children.

We are trying to compare a Car with a Wheel, Impossible to compare the two.

**Provider**, **Consumer**, passing down data no matter how deeply nested, **connect** them together…. Did we actually want to compare [react-redux](https://redux.js.org/basics/usage-with-react) with the new context API and not `Redux` itself?

Well lets try…

## Trial #2 — react-redux Vs The new context API

* react-redux is an abstraction, a way to bind your `Redux` store to react.
Let’s remember what we need to do in order to bind `Redux` to react without react-redux.
in order to bind `Redux` to react you need to do couple of things:
1. **The first** is not really directly related to react, I’m talking about the subscription to the store with the [store.subscribe()](https://redux.js.org/api-reference/store#subscribe-listener) method, this is done inside a [Container component](https://redux.js.org/basics/usage-with-react#implementing-container-components).
2. **The second** is to pass the store object down the tree as a prop up until you get to the **Container** component that holds the subscription logic (it needs the actual store object to run methods like subscribe, dispatch etc…)
WoooHaaa, prop drilling!

OK, so basically react-redux is doing all of this for us (and probably doing a better job than we would do [performance wise](https://redux.js.org/basics/usage-with-react#presentational-and-container-components)).

* **The connect HOC**  
A High Order Component that creates the **Container Component** for us with all the subscription logic + great functions to pass portions of the store and action-creators to its children as props (mapStateToProps & mapDispatchToProps).

* **Provider**  
A Component that will hold and pass down our store.

WAIT! how exactly the **Provider** and the **connect HOC** are connected? how is the data being passed from the **Provider** to the **Container?**

This is where react’s context API plays a big and important role,
The **Provider** is exposing the store as a context.
The **Container** created by **connect** is grabbing this context.
Yes, via the context API.

So lets say that react’s context feature is like 10% - 20% of the logic react-redux is doing for us.

We are trying to compare a 4-Wheel-Drive with a Wheel, Impossible to compare the two.

So bottom line, don’t try to compare the new context API with `Redux` or react-redux. it’s just wrong, and misleading others.
If new comers are wrongly refer to `Redux` as `react-redux` or vise versa, don’t do the same in your articles, posts, tweets. it will just keep them from learning the real differences.
