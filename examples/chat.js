import Bard from "bard-ai";

await Bard.init("YOUR_COOKIE_KEY");

let myConversation = new Bard.Chat();
console.log(await myConversation.ask("How are you?"));
console.log(await myConversation.ask("What's the last thing I said?"));
