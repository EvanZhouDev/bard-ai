import Bard from "bard-ai";

const bard = new Bard(COOKIE);

console.log(await bard.ask("Hello world!"));
