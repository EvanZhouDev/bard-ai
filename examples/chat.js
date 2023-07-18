import Bard from "bard-ai";

const bard = new Bard("YOUR_COOKIE_KEY");

let myConversation = bard.createChat();
console.log(await myConversation.ask("How are you?"));
console.log(await myConversation.ask("What's the last thing I said?"));
