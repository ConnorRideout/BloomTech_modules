# The Context API Module Project

## ✨ Requirements

1. Node >= 18.x
2. Git Bash (Windows users)

## ✨ Usage

1. Fork and clone repo
2. Run `npm install`
3. Run `npm run dev`
4. Load app in `http://localhost:3003`

## ✨ Instructions

Welcome to your Module Project! In this module you learned to use the Context API to hold data and state, so they can be "teleported" to any component in the React tree, no matter how deeply nested, without any prop drilling.

In this project you will refactor an application that holds its global state at the top-level component. Your mission is to remove global state from that component and place it in context, for ready access from any component in the tree.

### 🥷 Tasks

**Important notes about your tasks:**

- Watch the first minutes of the **Solution Video** if you need help getting started.
- There is no need to install any NPM dependencies.
- You will need to make changes to five modules - this is the suggested order:
  1. [quotesContext.js](./frontend/context/quotesContext.js)
  2. [index.js](./frontend/index.js)
  3. [Quotes.js](./frontend/components/Quotes.js)
  4. [QuoteForm.js](./frontend/components/QuoteForm.js)
  5. [App.js](./frontend/components/App.js)

#### 👉 TASK 1 - Study the UI and the code

Get a feel for how the app works in **Chrome**, and study the **components** that comprise this React app.

#### 👉 TASK 2 - Create a context and wrap the React tree

1. Inside [quotesContext.js](./frontend/context/quotesContext.js) **create a context**, and a **context provider** with some dummy data as the `value` prop, and export them out.

2. Inside [index.js](./frontend/index.js) **wrap** the React tree with your context provider.

3. Try to **consume** your dummy data from one of the React components in the app.

#### 👉 TASK 3 - Move app state over to context

The [App.js](./frontend/components/App.js) component is acting as the holder of application state. The slices of state and the state-changing functions are then passed to App's child components using props.

1. Copy all the state and callbacks from App over to your context provider.

2. From inside [Quotes.js](./frontend/components/Quotes.js) and [QuoteForm.js](./frontend/components/QuoteForm.js), consume whatever quotes data and callbacks they need to function from context, instead of using the ones arriving from props. You can allow QuoteForm to manage its own internal state, since the rest of the app is not interested in the values held inside the form.

3. Clean up the [App.js](./frontend/components/App.js) by removing all state from it if you haven't already, and removing from the JSX all the props it was passing to its children in the old architecture.

#### 👉 TASK 4 - Watch the Solution Video

This step is only required if you need help getting started or get stuck at any point. HAVE FUN!

## FAQ

<details>
  <summary>I feel very stuck. What can I do?</summary>

Check out the Solution Video for this project in your learning platform. In it, an industry expert will walk you through their thinking in detail while they solve the tasks. The Solution Videos are highly recommended even if you are not stuck: you will learn lots of tricks.

</details>

<details>
  <summary>I am getting errors when I run npm install. What is going on?</summary>

This project requires Node to be correctly installed on your computer to work. Sometimes Node can be installed but misconfigured. Try deleting `node_modules` and running `npm install`. If that fails, try deleting both `node_modules` and `package-lock.json` before reinstalling. If all fails, please request support!

</details>

<details>
  <summary>Do I need to install extra libraries with NPM?</summary>

No. Everything you need should be installed already.

</details>

<details>
  <summary>Can I edit the HTML or the CSS?</summary>

You can edit the CSS of the project to give it a personal touch so you can add it to your portfolio, but only after you've finished your tasks!

</details>

<details>
  <summary>My page does not work! How do I debug it?</summary>

Remember to use console.logs and breakpoints to troubleshoot your code. Do not panic if you see errors in the console, just read them carefully looking for clues.

</details>

<details>
  <summary>How do I run tests against my code?</summary>

There are no automatic tests in this project. Feel free to write some, though! All necessary libraries are installed.

</details>

<details>
  <summary>I messed up and want to start over! How do I do that?</summary>

Do NOT delete your repository from GitHub! Instead, commit frequently as you work. This in practice creates restore points. If you find yourself in a mess, use git reset --hard to simply discard all changes to your code since your last commit. If you are dead-set on restarting the challenge from scratch, you can do this with Git as well. Research how to reset --hard to a specific commit.

</details>
