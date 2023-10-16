## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Create a .env.local file in the source directory containing the following keys:

```env
# Airtable API keys
AIRTABLE_API_KEY=keyXXXX
AIRTABLE_BASE_ID=appXXXX

# OpenAI GPT keys
OPENAI_API_KEY=
```

## How does it work?

The following content is meant to be read by LLUFs as a sort-of tutorial for the ILP.

To get started with your own project first run

```bash
npx create-next-app@latest
```

This will create a base nextjs app that you can modify as you wish.

Inside the src directory, every directory that has a page.js is a new page. For example, in src there's page.js that displays the / route. Inside quiz, there's a page.js that displays the /quiz page.

Nextjs is made to use SSR by default. Because of this, if you want to make stateful components or use UI frameworks, on the top of your file you need to add

```js
"use client";
```

For my project, I inside of my src directory I have three different directories: api, quiz, style.

### api

Inside of this directory, I have two directories, one for each api that I am creating. In this case, they are airtable and openAI. For each of them, I created a route.js file where I define my GET or POST queries to request to the API and the fetchData fucntion that I use to get the requested data.

Once the route is created, on your desired page.js file, you can call it to get the data as you defined it. For example, when I query GPT, I access my POST OpenAI API as follows:

```js
const response = await fetch("api/openAI", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ selectedPrompt, availableOptions }),
});
```

# quiz

The quiz directory contains the page for /quiz. Here I call the APIs that I previously defined in the api directory and render the data accordingly.

# style

In the syle directory I have the css files that I use to style the pages. After creating them, you can impot them in your page.js as:

```js
import "../app/style/style.css";
// or
import "../style/style.css";
// depending on where your page.js is situated
```
