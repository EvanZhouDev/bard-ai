import Bard from "bard-ai";

const bard = new Bard("YOUR_COOKIE_KEY");

console.log(await bard.ask("Hello world!"));
