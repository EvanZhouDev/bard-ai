import fs from "fs";

const bardURL = "https://bard.google.com"
class Bard {
    static JSON = "json";
    static MD = "markdown"

    // ID derived from Cookie
    SNlM0e;

    // HTTPS Headers
    #headers;

    // Resolution status of initialization call
    #initPromise;

    constructor(cookie) {
        // If a Cookie is provided, initialize
        if (cookie) {
            this.#initPromise = this.init(cookie);
        }
        this.cookie = cookie;
    }

    // Can also choose to initialize manually
    async init(cookie) {
        if (this.SNlM0e) throw new Error("Cannot initialize same Bard object twice. Create a new Bard object if you wish to use a new Cookie.")

        // Assign headers
        this.#headers = {
            Host: "bard.google.com",
            "X-Same-Domain": "1",
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            Origin: bardURL,
            Referer: bardURL,
            Cookie: `__Secure-1PSID=${cookie};`,
        };

        // Attempt to retrieve SNlM0e
        try {
            const SNlM0e = await fetch(bardURL, {
                method: "GET",
                headers: this.#headers,
                credentials: "include",
            })
                .then(response => response.text())
                .then(text => text.match(/SNlM0e":"(.*?)"/)[1])

            if (!SNlM0e) { // Failure to get SNlM0e from response
                throw new Error("Could not use your Cookie. Make sure that you copied correctly the Cookie with name __Secure-1PSID exactly. If you are sure your cookie is correct, you may also have reached your rate limit.");
            }

            // Assign SNlM0e and return it
            this.SNlM0e = SNlM0e;
            return SNlM0e;
        } catch (e) { // Failure to get server
            throw new Error("Could not fetch Google Bard. You may be disconnected from internet: " + e);
        }
    }

    #formatMarkdown(text, images) {
        if (!images) return text;

        for (let imageData of images) {
            const formattedTag = `!${imageData.tag}(${imageData.url})`;
            text = text.replace(new RegExp(
                `(?<!\!)\[${imageData.tag.slice(1, -1)}\]`
            ), formattedTag);
        }

        return text;
    };

    async #uploadImage(name, buffer) {
        let size = buffer.buffer.byteLength;

        let formBody = [
            `${encodeURIComponent("File name")}=${encodeURIComponent([name])}`,
        ];

        try {
            let response = await fetch("https://content-push.googleapis.com/upload/", {
                method: "POST",
                headers: {
                    "X-Goog-Upload-Command": "start",
                    "X-Goog-Upload-Protocol": "resumable",
                    "X-Goog-Upload-Header-Content-Length": size,
                    "X-Tenant-Id": "bard-storage",
                    "Push-Id": "feeds/mcudyrk2a4khkz",
                },
                body: formBody,
                credentials: "include",
            });

            const uploadUrl = response.headers.get("X-Goog-Upload-URL");

            response = await fetch(uploadUrl, {
                method: "POST",
                headers: {
                    "X-Goog-Upload-Command": "upload, finalize",
                    "X-Goog-Upload-Offset": 0,
                    "X-Tenant-Id": "bard-storage",
                },
                body: buffer,
                credentials: "include",
            });

            const imageFileLocation = await response.text();

            if (response.status != 200) throw new Error("Failed to retrieve image: " + imageFileLocation);

            return imageFileLocation;
        } catch (e) {
            throw new Error("Could not fetch Google Bard. You may be disconnected from internet: " + e);
        }
    }

    // Query Bard
    async #query(message, config) {
        let { ids, image } = config;

        let imageLocation = this.#uploadImage(`bard-ai_upload.${image.extension}`, imageBuffer)

        // Wait until after init
        await this.#initPromise;

        // If user has not run init
        if (!this.SNlM0e) {
            throw new Error("Please initialize Bard first. If you haven't passed in your Cookie into the class, run Bard.init(cookie).");
        }

        // HTTPS parameters
        const params = {
            bl: "boq_assistant-bard-web-server_20230613.09_p0",
            _reqID: ids?._reqID ?? "0",
            rt: "c",
        };

        // If IDs are provided, but doesn't have every one of the expected IDs, error
        const messageStruct = [
            [
                message,
                0,
                null,
                imageConfig && [
                    [[imageConfig.imageFileLocation, 1], imageConfig.fileName],
                ],
            ],
            null,
            [null, null, null]
        ];

        if (ids) {
            try {
                const { conversationID, responseID, choiceID } = ids;
                messageStruct[2] = [conversationID, responseID, choiceID]
            } catch {
                throw new Error("Please provide the JSON exported exactly as given.");
            }
        }

        // HTTPs data
        const data = {
            "f.req": JSON.stringify([null, JSON.stringify(messageStruct)]),
            at: this.SNlM0e,
        };

        // URL that we are submitting to
        const url = new URL(
            "/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate",
            bardURL
        );

        // Append parameters to the URL
        for (const key in params) {
            url.searchParams.append(key, params[key]);
        }

        // Encode the data
        const formBody = Object.entries(data)
            .map(([property, value]) => `${encodeURIComponent(property)}=${encodeURIComponent(value)}`)
            .join("&");

        // Send the fetch request
        const chatData = await fetch(url.toString(), {
            method: "POST",
            headers: this.#headers,
            body: formBody,
            credentials: "include",
        })
            .then(response => {
                return response.text()
            })
            .then(text => {
                return JSON.parse(text.split("\n")[3])[0][2]
            })
            .then(rawData => JSON.parse(rawData))

        // Get first Bard-recommended answer
        const answer = chatData[4][0];

        // Text of that answer
        const text = answer[1][0];

        // Get data about images in that answer
        const images = answer[4]?.map((x) =>
        ({
            tag: x[2],
            url: x[3][0][0],
            source: {
                original: x[0][5].match(/imgurl=([^&%]+)/)[1],
                website: x[1][0][0],
                name: x[1][1],
                favicon: x[1][3]
            }
        })
        );

        // Put everything together and return
        return {
            content: this.#formatMarkdown(text, images),
            images: images,
            ids: {
                conversationID: chatData[1][0],
                responseID: chatData[1][1],
                choiceID: answer[0],
                _reqID: String(parseInt(ids?._reqID ?? 0) + 100000),
            },
        };
    }

    async #parseConfig(config) {
        let result = {
            useJSON: false,
            image: undefined, // Returns as {extension, filename}
            ids: undefined,
        }

        // Verify that format is one of the two types
        if (config?.format) {
            switch (config.format) {
                case Bard.JSON:
                    result.useJSON = true;
                    break;
                case Bard.MD:
                    result.useJSON = false;
                    break;
                default:
                    throw new Error("Format can obly be Bard.JSON for JSON output or Bard.MD for Markdown output.");
            }
        }

        // Verify that the image passed in is either a path to a jpeg, jpg, png, or webp, or that it is a Buffer
        if (config?.image) {
            if (typeof config.image === "object" && config.image.type && config.image.buffer) {
                if (["jpeg", "jpg", "png", "webp"].includes(config.image.type))
                    result.image = {
                        buffer: config.image.buffer,
                        type: config.image.type
                    };
            } else if (typeof config.image === 'string' && /\.(jpeg|jpg|png|webp)$/.test(config.image)) {
                result.image = {
                    buffer: fs.readFileSync(config.image),
                    type: config.image.split(".")[-1]
                };
            } else {
                throw new Error("Provide your image as a file path to a .jpeg, .jpg, .png, or .webp, or for a Buffer, provide an object: {buffer: Buffer, type: 'jpeg'|'jpg'|'png'|'webp'}")
            }
        }

        // Verify that all values in IDs exist
        if (config?.ids) {
            try {
                const { conversationID, responseID, choiceID, _reqID } = config.ids;
                result.ids = config.ids;
            } catch {
                throw new Error("Please provide the JSON exported exactly as given.");
            }
        }

        return result;
    }

    // Ask Bard a question!
    async ask(message, config) {
        let { useJSON, imageBuffer, ids } = this.#parseConfig(config);
        let response = await this.#query(message, { imageBuffer, ids });
        return useJSON ? response : response.content
    }
}

export default Bard;