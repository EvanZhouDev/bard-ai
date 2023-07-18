import { expect, test } from 'vitest'
import Bard from "../index.js"
import fs from "fs"
import dotenv from "dotenv"

const envContents = fs.readFileSync('.env', 'utf-8');
const envConfig = dotenv.parse(envContents);
let COOKIE = envConfig.COOKIE || process.env.COOKIE;

test('Daily Bard Check', async () => {
    let myBard = new Bard(COOKIE)
    let myChat = myBard.createChat()

    expect(await myChat.ask(await myChat.ask("What animal is shown in this picture? Provide the name of the animal when it is an adult.", {
        image: `${__dirname}/cat.jpg`
    }))).toContain("cat")

    let response2 = await myChat.ask("Find some more pictures of that animal.", {
        format: Bard.JSON
    });

    expect(response2).toBeTypeOf("object")
    expect(response2.images.length >= 1).toBeTruthy()
}, { timeout: 30000 })