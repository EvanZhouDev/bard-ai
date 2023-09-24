import { expect, test } from 'vitest'
import Bard from "../index.js"
import fs from "fs"
import dotenv from "dotenv"

let COOKIES;
try {
    const envContents = fs.readFileSync(__dirname + '/.env', 'utf-8');
    const envConfig = dotenv.parse(envContents);
    COOKIES = {
        "__Secure-1PSID": envConfig.PSID,
        "__Secure-1PSIDTS": envConfig.PSIDTS,
    };
} catch {
    COOKIES = {
        "__Secure-1PSID": process.env.PSID,
        "__Secure-1PSIDTS": process.env.PSIDTS,
    };
}

test('Daily Bard Check', async () => {
    let myBard = new Bard(COOKIES, {
        verbose: true
    });
    let myChat = myBard.createChat();

    let animalInPicture = await myChat.ask(await myChat.ask("What animal is shown in this picture? Provide the name of the animal when it is an adult.", {
        image: `${__dirname}/assets/cat.jpg`
    }));

    expect(animalInPicture).toContain("cat");

    let response2 = await myChat.ask("Find some pictures of cats.", {
        format: Bard.JSON
    });

    expect(response2).toBeTypeOf("object");
    expect(response2.images.length >= 1).toBeTruthy();
}, { timeout: 30000 })