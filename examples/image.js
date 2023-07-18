import Bard from "bard-ai";

const bard = new Bard(COOKIE);

const imageUrl = "https://placekitten.com/500/500";

const imageBuffer = await fetch(imageUrl).then(res => res.arrayBuffer());

console.log(
    await bard.ask("What animal is shown in this photo?", {
        image: imageBuffer,
    })
);

