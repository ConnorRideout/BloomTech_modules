# Redux Toolkit Module Project

## ✨ Requirements

1. Node >= 18.x
2. Git Bash (Windows users)
3. Redux DevTools Chrome extension

## ✨ Usage

1. Fork and clone repo
2. Run `npm install`
3. Run `npm run dev`
4. Load app in `http://localhost:3003`

## ✨ Prototype

[LINK](https://bloominstituteoftechnology.github.io/W_S10_M1_Project/) to a working prototype.

## ✨ Instructions

Welcome to your Module Project! In this module you learned to use Redux Toolkit to manage the state of large applications.

In this project you will keep working on the Quotes app. Right now the application lacks any global state: it's up to you to build a Redux store for it and make it all work!

### 🥷 Tasks

**❗ Preliminary notes about your tasks:**

- Watch the first minutes of the **Solution Video** if you need help getting started.
- There is no need to install any extra NPM dependencies.
- You will make changes to five files - roughly in this order:
  1. [quotesSlice.js](./frontend/state/quotesSlice.js)
  2. [store.js](./frontend/state/store.js)
  3. [index.js](./frontend/index.js)
  4. [Quotes.js](./frontend/components/Quotes.js)
  5. [QuoteForm.js](./frontend/components/QuoteForm.js)

#### 👉 TASK 1 - Study the UI and the code

The functionality of the app must match the one in [the prototype](https://bloominstituteoftechnology.github.io/W_S10_M1_Project/). Note that the prototype is using the reducer hook to manage state: you must achieve the same results **using Redux Toolkit**.

#### 👉 TASK 2 - Wire Redux to the application

1. Inside [quotesSlice.js](./frontend/state/quotesSlice.js) **create a `quotesSlice`**. The initial state for the slice can be found inside the file. Do not flesh out reducers at this point, just do the bare minimum to achieve a working slice of state.

2. Inside [store.js](./frontend/state/quotesSlice.js) create a **Redux store**, including the `quotesSlice` in it.

3. Inside [index.js](./frontend/index.js) **wrap the component tree** in a provider, supplying to it the Redux store.

#### 👉 TASK 3 - Fix the Quotes component so it takes global state from the Redux store

Inside [Quotes.js](./frontend/components/Quotes.js) use a selector to obtain in the two pieces of global state it needs from the Redux store.

#### 👉 TASK 4 - Flesh out the actions

❗ Note that this task and the next one (wiring actions to components) can be done in parallel.

Revisit [quotesSlice.js](./frontend/state/quotesSlice.js) and **create reducers** for the different actions that can affect global state. In order of increasing difficulty, these would be:

1. `toggleVisibility` toggles whether to show all quotes or only authentic ones.
2. `deleteQuote` removes a quote by the given id.
3. `editQuoteAuthenticity` toggles the `apocryphal` property of a quote by the given id.
4. `setHighlightedQuote` sets a quote id (or null) as the highlighted quote.
5. `createQuote` creates a quote of given `quoteText` and `authorName`, defaulting `apocryphal` to false.

#### 👉 TASK 5 - Wire actions to the components

Inside [Quotes.js](./frontend/components/Quotes.js) and [QuoteForm.js](./frontend/components/QuoteForm.js), dispatch the necessary actions to achieve full functionality, matching that of the [prototype](https://bloominstituteoftechnology.github.io/W_S10_M1_Project/).

#### 👉 TASK 6 - Watch the Solution Video

This step is only required if you need help getting started or get stuck at any point. HAVE FUN!

## FAQ

<details>
  <summary>I feel very stuck. What can I do?</summary>

Redo the Guided Project for the module, or check out the Solution Video for this project. In these recordings, an industry expert walks you through their thinking in detail, while they solve the tasks.

</details>

<details>
  <summary>I am getting errors when I run npm install. What is going on?</summary>

This project requires Node >= V18 correctly installed in order to work. Sometimes Node can be misconfigured. Try deleting `node_modules` and running `npm install`. If this fails, try deleting both `node_modules` and `package-lock.json` before reinstalling. If all fails, please request support!

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

Remember to use console.logs and breakpoints to troubleshoot your code. Do not panic if you see errors in the console, just read them carefully looking for clues. Also keep an eye on the Redux DevTools.

</details>

<details>
  <summary>How do I run tests against my code?</summary>

There are no automatic tests in this project. Feel free to write some, though! All necessary libraries are installed.

</details>

<details>
  <summary>I messed up and want to start over! How do I do that?</summary>

Do NOT delete your repository from GitHub! Instead, commit frequently as you work. This in practice creates restore points. If you find yourself in a mess, use git reset --hard to simply discard all changes to your code since your last commit. If you are dead-set on restarting the challenge from scratch, you can do this with Git as well. Research how to reset --hard to a specific commit.

</details>
