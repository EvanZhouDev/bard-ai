<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/bardAIBannerDark.svg">
  <source media="(prefers-color-scheme: light)" srcset="./assets/bardAIBannerLight.svg">
  <img alt="EvanZhouDev Banner" src="./assets/bardAIBannerLight.svg">
</picture>
<h1 align="center">
    A JavaScript API for Google Bard
</h1>
<p align="center">
  <a aria-label="NPM Version" href="https://www.npmjs.com/package/bard-ai">
    <img alt="" src="https://img.shields.io/npm/v/bard-ai.svg?label=NPM&logo=npm&style=for-the-badge&color=EA8758&logoColor=white">
  </a>
  <a aria-label="NPM Download Count" href="https://www.npmjs.com/package/bard-ai">
    <img alt="" src="https://img.shields.io/npm/dt/bard-ai?label=Downloads&style=for-the-badge&color=857ACF">
  </a>
  <a aria-label="bard-ai Size" href="https://www.npmjs.com/package/bard-ai">
    <img alt="" src="https://img.shields.io/bundlephobia/minzip/bard-ai?style=for-the-badge">
  </a>
</p>

## Features
- 🌳 **Tree-shakeable**: Maximize efficiency
- 🪶 **Tiny**: Just 1.3kb minzipped
- 🚀 **Fast**: Up to 150% faster than `googlebard`
- 📚 **Typesafe**: Types included out-of-the-box
- 😍 **Straightforward API**: Learn in minutes
- 💨 **No dependencies**: Uses native `fetch`

## Introduction
`bard-ai` was built to provide free AI to everyone, through Google Bard. It's completely free, and takes minimal setup.

Originally based off of acheong08's [Python Bard API Code](https://github.com/acheong08/Bard).

## Comparison

Compared to leading JS Bard library `googlebard`, its ~99% smaller, up to 150% faster, and way easier to use!

<details>
<summary>Learn more...</summary>

The main competitor with `bard-ai` is [GoogleBard by PawanOsman](https://github.com/PawanOsman/GoogleBard). However, there are 3 main reasons why I'd advise using `bard-ai` instead.

1. `bard-ai` is 1.3KB, while `google-bard` is 112.8KB, gzipped and minified (checked with [Bundlephobia](https://bundlephobia.com/)). That makes `bard-ai` ~99% smaller!
2. This library is up to 150% faster, as tested with `hyperfine --warmup 1 --runs 3` between `bard-ai` and `googlebard`[^1].
3. `googlebard` overcomplicates many simple things, including inputting the original cookie, to importing and exporting conversations. `bard-ai` has been built to be simple, tiny, and easy to use.

</details>

[^1]:
    Run `hyperfine --warmup 1 --runs 3 --show-output` between `bard-ai` v1.2.2 and `googlebard` with following code for `googlebard` (in "googlebard.js"):

    ```javascript
    import { Bard } from "googlebard";

    let cookies = `__Secure-1PSID=XAgq7axCJiDbtdYALNI-U-L9k_hG-rGEJfkof3UrN93MQk2WHSfP-ZVibAfqTHOxeXuHVw.`;
    let bot = new Bard(cookies);

    let response = await bot.ask("Hello world!");
    console.log(response);
    ```

    And following code for `bard-ai` (in "bard-ai.js"):

    ```javascript
    import Bard, { askAI } from "bard-ai";

    await Bard.init("MY_KEY");

    console.log(await askAI("Hello world!"));
    ```

    With this benchmark output:

    ```
    Benchmark 1: node bard-ai.js
    Time (mean ± σ):      6.951 s ±  2.272 s    [User: 0.181 s, System: 0.044 s]
    Range (min … max):    5.333 s …  9.549 s    3 runs

    Benchmark 2: node googlebard.js
    Time (mean ± σ):      7.691 s ±  1.029 s    [User: 0.389 s, System: 0.073 s]
    Range (min … max):    6.510 s …  8.394 s    3 runs

    Summary
    'node bard-ai.js' ran
    1.11 ± 0.39 times faster than 'node googlebard.js'
    ```

## Obtaining Authentication

1. Log in to your Google account, and visit [Google Bard](https://bard.google.com)
2. Open the Web Inspector, and go to the "Application" tab.
3. Click open the `Cookies` dropdown on the sidebar, under storage, and click on the option that says `https://bard.google.com`.
4. Look for and copy the Cookie labeled `__Secure-1PSID`. Make sure you copy and periods at the end as well.

That's it! Now, when I refer to `COOKIE_KEY` in the following document, The `__Secure-1PSID`'s what I'm referring to.

> **Warning**
> It is probably a good idea not to commit this `COOKIE_KEY`, though there doesn't seem to be a direct way to exploit it as far as I am concerned.

## Installation

Go ahead and install `bard-ai` with this simple command:

```bash
npm install bard-ai
```

Or, for `pnpm`,

```bash
pnpm add bard-ai
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

`askAI(message, useJSON)` takes two arguments, the prompt/message you are sending to Bard, and whether or not to return as a JSON, or just a string. See Advanced Usage and Images below to learn how to use `useJSON`.
Make sure you use `await` on `askAI`.
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
Mainly, you use `Bard.Chat().ask(message, useJSON)` to ask something to the AI. Bard will remember that message when you ask it again. `Chat().ask()` has the same syntax as `askAI()`.
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

## Advanced Usage:

### `Chat.export()`

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

### `useJSON` Flag in `askAI` and `Chat().ask().`

When using `useJSON`, you will be returned a JSON with more information. The structure looks like this:

```js
{
    content, // string
    images: [
        {
            tag, // string
            url // string
        }
        // array of such objects
    ],
    ids: {
        conversationID, // string
        responseID, // string
        choiceID, // string
        _reqID, // stringified integer
    }
}
```

Content is the actual response from the AI, learn about images below, and the IDs are used to export conversations. See above.

### Images

New in Bard 2023.05.23, you are now able to see images in Bard answers (for now only in English). `bard-ai` has implemented this functionality, and you will now see image links in your Markdown. If you want the image links directly, you can use the `useJSON` flag, as shown above. It will give you an array of objects, each with a tag (e.g. `[Image of Golden Retriever dog]`) and a URL.
Here's an example of what you may see:

When asked for 5 different images of dogs...

```md
Sure, here are 5 pictures of different dogs:

1. Labrador Retriever
   ![Image of Labrador Retriever dog](http://t0.gstatic.com/images?q=tbn:ANd9GcTehx7d8JqimfYMi63YDIHDv_3g0c0uB-l0xB_Gn1zVVJcEV6TK&s)
2. Golden Retriever
   ![Image of Golden Retriever dog](http://t0.gstatic.com/images?q=tbn:ANd9GcTj60ORiFnIHF455RSnnAVWSlEbdnb9uvoOSCiRmAoq1W5oYb6E&s)
3. German Shepherd
   ![Image of German Shepherd dog](http://t0.gstatic.com/images?q=tbn:ANd9GcRTatXU41TuNCmFhcUpgMt4KjY6r46yu0uYZ1FZod7nlmWt8S9T&s)
4. Beagle
   ![Image of Beagle dog](http://t0.gstatic.com/images?q=tbn:ANd9GcRvDlNVusEoyR0QT08ayy2LA15iDjByewTmkTiOASnp8Ck38ss&s)
5. Bulldog
   ![Image of Bulldog dog](http://t0.gstatic.com/images?q=tbn:ANd9GcTSc7g0bV3fBOEeNhJ1PgMnslyi3uTTQ_nwKAp6Ac78BWl3vho&s)
```
