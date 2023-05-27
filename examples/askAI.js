import Bard, { askAI } from "../index.js";

await Bard.init("YOUR_COOKIE_KEY");

console.log(await askAI("Hello world!"));
