# bard-ai
## A super small (~1.2 KB[^1]) library to access Google's Bard AI
[![NPM](https://img.shields.io/npm/v/bard-ai.svg?label=NPM&logo=npm&color=CB3837)](https://www.npmjs.com/package/bard-ai)
[![NPM](https://img.shields.io/npm/dm/bard-ai?label=Downloads)](https://www.npmjs.com/package/bard-ai)


Thanks to acheong08's original [Python Bard API Code](https://github.com/acheong08/Bard).
This is just a JS transpilation of that code!

[^1]: `index.js` file minified and gzipped, excluding the only dependency, `axios`, which is used to access https easier and safer

### Why this library?

TL;DR: It's small and it's simple.

I am aware there is another amazing library, [GoogleBard by PawanOsman](https://github.com/PawanOsman/GoogleBard). However, it includes many features that are not _directly related_ to Google Bard itself. This library is designed to be the minimum code to use Bard. `bard-ai` has sufficient functionality for you to implement things like conversation saving to `localStorage`, but to make the library smaller and more flexible for the end user, I have left that part for your own application to implement.

## Obtaining Authentication

1. Log in to your Google account, and visit [Google Bard](https://bard.google.com)
2. Open the Web Inspector, and go to the "Application" tab.
3. Click open the `Cookies` dropdown on the sidebar, under storage, and click on the option that says `https://bard.google.com`.
4. Look for and copy the Cookie labeled `__Secure-1PSID`. Make sure you copy and periods at the end as well.

That's it! Now, when I refer to `COOKIE_KEY` in the following document, The `__Secure-1PSID`'s what I'm referring to.

## Installation

Go ahead and install `bard-ai` with this simple command:

```bash
npm install bard-ai
```

Or, for `pnpm`,

```bash
pnpm install bard-ai
```

## Basic Usage

## Initializing your `COOKIE_KEY`

Always start your code with this:

```javascript
import Bard from "bard-ai";

await Bard.init("COOKIE_KEY"); // Make sure to replace with your own ID!
```

That's all the setup you'll need.

## One-Time Prompt: `askAI()`

If you are doing some form of a request that only needs to ask Bard something once and be done with it (i.e. not continuing in a "chat" form), then `askAI()` is the command you are looking for.

### Import:

Import alongside the entire Bard library like this:

```javascript
import Bard, { askAI } from "bard-ai";
```

Or, alternatively, you can use:

```javascript
import Bard from "bard-ai";
await Bard.askAI("My request");
```

This second way is more verbose, so I recommend the first way

### Syntax:

`askAI(message)` takes one argument, the prompt/message you are sending to Bard. Make sure you use `await` on it.
`askAI()` returns a string with Bard's response.

### Example Usage:

```javascript
import Bard, { askAI } from "bard-ai";

await Bard.init("COOKIE_KEY");

console.log(await askAI("Hello world!"));
```

## Continued Conversation: `new Bard.Chat()`

If you are doing some form of a project that requires the user to chat and have a dialog with the AI, in which the AI remembers what the user has said, then `Bard.Chat()` is the command for you.

### Import:

`Chat()` class is under the Bard library itself, so

```javascript
import Bard from "bard-ai";
```

### Syntax:

`Bard.Chat(IDs)` takes one argument, `IDs`, which you can learn more about in the Advanced Usage section below.
Mainly, you use `Bard.Chat().ask(message)` to ask something to the AI. Bard will remember that message when you ask it again.
You can also use `Bard.Chat().export()` to export the `IDs`, which you can also read about in the Advanced usage section.

### Example Usage:

Creating a new `Bard.Chat()` instance:

```javascript
let myChat = new Bard.Chat();
```

Ask it something...

```javascript
myChat.ask("Hello there...");
```

And Bard remembers if you continue!

```javascript
myChat.ask("What's the last thing I said?");
```

Here's a similar integrated example:

```javascript
import Bard from "bard-ai";

await Bard.init("COOKIE_KEY");

let myConversation = new Bard.Chat();
console.log(await myConversation.ask("How are you?"));
console.log(await myConversation.ask("What's the last thing I said?"));
```

## Advanced Usage: `Chat.export()`

In certain cases, you may need to leave a conversation and continue it later. In this case, you can export a JSON representation of the internal IDs used to keep track of the conversation, and re-import them later.

Let's begin by starting a chat, and saying something.

```javascript
let myChat = new Bard.Chat();
myChat.ask("What's 1+1?"); // 2
```

Now, let's export the conversation.

```javascript
myChat.export();
```

You should get a JSON similar to this:

```json
{
	"conversationID": "YOUR_CONVERSATION_ID",
	"responseID": "YOUR_RESPONSE_ID",
	"choiceID": "YOUR_CHOICE_ID"
}
```

Now, we plug it back into a _new_ conversation:

```javascript
let myContinuedChat = new Bard.Chat({
	conversationID: "YOUR_CONVERSATION_ID",
	responseID: "YOUR_RESPONSE_ID",
	choiceID: "YOUR_CHOICE_ID",
});
myContinuedChat.ask("What's one more than that?"); // Should say 3!
```
