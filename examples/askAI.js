import Bard, { askAI } from "bard-ai";

await Bard.init("YOUR_COOKIE_KEY");

console.log(await askAI("Hello world!"));
