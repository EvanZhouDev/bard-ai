import Bard from "bard-ai";

await Bard.init("YOUR_COOKIE_KEY");

// ! Comment out code block underneath, and uncomment this
let myConversation = new Bard.Chat();
console.log(await myConversation.ask("What is 1+1?"));
console.log(await myConversation.export());

// ! Comment out previous, and uncomment this
let continuedConversation = new Bard.Chat(/* Paste your exported JSON here */);
console.log(
    await continuedConversation.ask("What do you get if you add 1 to that?")
);
console.log(await continuedConversation.export());

// Observe how the AI remembers the previous conversation!
