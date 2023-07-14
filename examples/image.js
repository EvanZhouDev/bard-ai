import Bard from "bard-ai";
import fs from "fs";

const fileData = fs.readFileSync("./Tokyo.webp");

await Bard.init("YOUR_COOKIE_KEY");

let myConversation = new Bard.Chat();
(async function () {
    let imageLocation = await Bard.uploadImage(
        fileData.buffer.byteLength,
        "FILE_NAME.jpg",
        fileData.buffer
    );

    console.log(
        await myConversation.ask("What city is this?", true, {
            fileName: "FILE_NAME.jpg",
            imageFileLocation: imageLocation,
        })
    );
})();
