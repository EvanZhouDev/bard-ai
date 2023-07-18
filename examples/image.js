import Bard from "bard-ai";

const bard = new Bard("YOUR_COOKIE_KEY");

const imageUrl =
    "https://images.unsplash.com/photo-1578973615934-8d9cdb0792b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2578&q=80";
(async function () {
    const imageRes = await fetch(imageUrl);
    const imageBuffer = await imageRes.arrayBuffer();

    console.log(
        await bard.ask("What flag country is in the photo?", {
            image: {
                buffer: imageBuffer,
            },
        })
    );
})();
