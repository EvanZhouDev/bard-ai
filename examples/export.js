import Bard from "bard-ai";

const bard = new Bard("YOUR_COOKIE_KEY");

// ! Comment out code block underneath, and uncomment this
let myConversation = bard.createChat();
console.log(await myConversation.ask("What is 1+1?"));
console.log(await myConversation.export());

// ! Comment out previous, and uncomment this
let continuedConversation =
    bard.createChat(/* Paste your exported JSON here */);

console.log(
    await continuedConversation.ask("What do you get if you add 1 to that?")
);
console.log(await continuedConversation.export());

// Observe how the AI remembers the previous conversation!
