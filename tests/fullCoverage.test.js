import { expect, test } from 'vitest'
import Bard from "../index.js"
import fs from "fs"
import dotenv from "dotenv"

let COOKIE;
try {
    const envContents = fs.readFileSync('.env', 'utf-8');
    const envConfig = dotenv.parse(envContents);
    COOKIE = envConfig.COOKIE;
} catch {
    COOKIE = process.env.COOKIE;
}

let bard = new Bard(COOKIE, {
    verbose: true,
    context: "Answer the following as clearly as possible: "
})


test('Check Bard No-Cookie Error', async () => {
    await expect(async () => { new Bard() }).rejects.toThrowError("Please provide a Cookie when initializing Bard.")
}, { timeout: 30000 })


test('Check Bard No-SNlM0e Error', async () => {
    await expect(async () => {
        let myBard = new Bard("this_is_not_a_cookie")
        await myBard.ask("Hello!")
    }).rejects.toThrowError("Could not use your Cookie. Make sure that you copied correctly the Cookie with name __Secure-1PSID exactly. If you are sure your cookie is correct, you may also have reached your rate limit.")
}, { timeout: 30000 })


test('Check Bard Query ID', async () => {
    let bardChat1 = bard.createChat()
    await bardChat1.ask("Hello, world! This is an automated test, ran with Jest.")
    let ids = await bardChat1.export()

    let bardResponse = await bard.ask("What was the last thing I said?", {
        ids
    })
    console.log(bardResponse)
    expect(bardResponse).toContain('Hello, world! This is an automated test, ran with Jest.')
}, { timeout: 30000 })


test('Check Bard Faulty ID Error', async () => {
    await expect(async () => {
        await bard.ask("What was the last thing I said?", {
            ids: {
                conversationID: 'c_2d1f4214c77e5e4f',
                responseID: 'r_2d1f4214c77e5176',
                _reqID: '100000'
            }
        })
    }).rejects.toThrowError("Please provide the IDs exported exactly as given.")
}, { timeout: 30000 })


test('Check Bard Fetch Failed', async () => {
    await expect(async () => {
        let myBard = new Bard("this_is_not_a_cookie", {
            fetch: () => { }
        })
        await myBard.ask("Hello!")
    }).rejects.toThrowError(/Could not fetch Google Bard. You may be disconnected from internet:.*/)
}, { timeout: 30000 })


test('Check Bard Response', async () => {
    let bardResponse = await bard.ask("Repeat after me: 'Hello, world! This is an automated test, ran with Jest.'")
    expect(bardResponse).toContain("Hello, world! This is an automated test, ran with Jest.")
}, { timeout: 30000 })


test('Check Format Error', async () => {
    await expect((async () => {
        await bard.ask("Show me some images of kittens: ", { format: "not-a-format" })
    })()).rejects.toThrowError();
})


test('Check Image Failed to Upload Error', async () => {
    await expect((async () => {
        let myBard = new Bard(COOKIE, {
            fetch: async (url, config) => {
                if (url === "https://content-push.googleapis.com/upload/") {
                    throw new Error("Cannot access Google")
                } else {
                    return await fetch(url, config)
                }
            }
        });
        await myBard.ask("What animal is this? Provide the name of it when it is grown up.",
            { image: `${__dirname}/assets/cat.jpg` }
        )
    })()).rejects.toThrowError(/Could not fetch Google Bard. You may be disconnected from internet:.*/);
})


test('Check JSON format', async () => {
    let bardResponse = await bard.ask("Show me some images of kittens: ", { format: Bard.JSON })

    expect(bardResponse).toBeTypeOf("object")

    expect(bardResponse).toHaveProperty('content')

    expect(bardResponse).toHaveProperty('images')
    expect(bardResponse).toHaveProperty('images[0].tag')
    expect(bardResponse).toHaveProperty('images[0].url')
    expect(bardResponse).toHaveProperty('images[0].info')
    expect(bardResponse).toHaveProperty('images[0].info.raw')
    expect(bardResponse).toHaveProperty('images[0].info.source')
    expect(bardResponse).toHaveProperty('images[0].info.alt')
    expect(bardResponse).toHaveProperty('images[0].info.website')
    expect(bardResponse).toHaveProperty('images[0].info.favicon')

    expect(bardResponse).toHaveProperty('ids')
    expect(bardResponse).toHaveProperty('ids.conversationID')
    expect(bardResponse).toHaveProperty('ids.responseID')
    expect(bardResponse).toHaveProperty('ids.choiceID')
    expect(bardResponse).toHaveProperty('ids._reqID')
}, { timeout: 30000 })


test('Check Markdown format', async () => {
    let bardResponse = await bard.ask("Show me some images of kittens: ", { format: Bard.MD })

    expect(bardResponse).toBeTypeOf('string')
}, { timeout: 30000 })


test('Chat, Chat Import and Export', async () => {
    let bardChat1 = bard.createChat()
    await bardChat1.ask("Hello, world! This is an automated test, ran with Jest.")
    let ids = await bardChat1.export()

    expect(ids).toBeTypeOf('object')

    expect(ids).toHaveProperty('conversationID')
    expect(ids).toHaveProperty('responseID')
    expect(ids).toHaveProperty('choiceID')
    expect(ids).toHaveProperty('_reqID')

    let bardChat2 = bard.createChat(ids)
    let bardResponse = await bardChat2.ask("What was the last thing I said?")
    expect(bardResponse).toContain('Hello, world! This is an automated test, ran with Jest.')
}, { timeout: 30000 })


test('Google Lens Incorrect Image', async () => {
    await expect(async () => {
        await bard.ask("Describe this image: ",
            { image: `${__dirname}/cat.svg` }
        )
    }).rejects.toThrowError("Provide your image as a file path to a .jpeg, .jpg, .png, or .webp, or a Buffer.")

}, { timeout: 30000 })


test('Google Lens w/ File', async () => {
    let bardResponse = await bard.ask("What animal is this? Provide the name of it when it is grown up.",
        { image: `${__dirname}/cat.jpg` }
    )

    expect(bardResponse).toContain("cat")
}, { timeout: 30000 })


test('Google Lens w/ Buffer', async () => {
    const imageUrl = "https://placekitten.com/500/500";

    const imageBuffer = await fetch(imageUrl).then(res => res.arrayBuffer());

    let bardResponse = await bard.ask("What animal is this? Provide the name of it when it is grown up.",
        { image: imageBuffer }
    )

    expect(bardResponse).toContain("cat")
}, { timeout: 30000 })

