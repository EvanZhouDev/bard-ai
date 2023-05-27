import axios from "axios";

let session, SNlM0e;

export const init = async (sessionID) => {
    session = axios.create({
        baseURL: "https://bard.google.com",
        headers: {
            Host: "bard.google.com",
            "X-Same-Domain": "1",
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            Origin: "https://bard.google.com",
            Referer: "https://bard.google.com/",
            Cookie: `__Secure-1PSID=${sessionID};`,
        },
        withCredentials: true,
    });

    const { data } = await session.get("https://bard.google.com/");

    const match = data.match(/SNlM0e":"(.*?)"/);

    if (match) SNlM0e = match[1];
    else throw new Error("Could not get Google Bard.");
}

export const queryBard = async (message, ids = {}) => {
    if (!SNlM0e) throw new Error("Make sure to call Bard.initialize(SESSION_ID) first.");

    // Parameters and POST data
    const params = {
        bl: "boq_assistant-bard-web-server_20230523.13_p0",
        _reqID: ids ? `${ids._reqID}` : "0",
        rt: "c",
    };

    const messageStruct = [
        [message],
        null,
        ids ? Object.values(ids).slice(0, 3) : [null, null, null],
    ];

    const data = {
        "f.req": JSON.stringify([null, JSON.stringify(messageStruct)]),
        at: SNlM0e,
    };

    const { data: responseData } = await session.post(
        "/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate",
        data,
        { params, timeout: 12000 }
    );

    const chatData = JSON.parse(responseData.split("\n")[3])[0][2];
    // Check if there is data
    if (!chatData) {
        return `Google Bard encountered an error ${responseData}.`;
    }

    // Get important data, and update with important data if set to do so
    const jsonChatData = JSON.parse(chatData);

    let text = jsonChatData[0][0]
    let images = jsonChatData[4][0][4] ? jsonChatData[4][0][4].map(x => ({
        tag: x[2],
        url: x[3][0][0]
    })) : undefined;
    return {
        content: formatMarkdown(text, images),
        images: images,
        ids: {
            // Make sure kept in order, because using Object.keys() to query above
            conversationID: jsonChatData[1][0],
            responseID: jsonChatData[1][1],
            choiceID: jsonChatData[4][0][0],
            _reqID: parseInt(ids._reqID) ?? 0 + 100000
        }
    }
}

const formatMarkdown = async (text, images) => {
    if (!images) return text
    for (let imageData of images) {
        text = text.replace(imageData.tag, `!${imageData.tag}(${imageData.url})`);
    }
    return text
}

export const askAI = async (message, useJSON = false) => {
    if (useJSON) return await queryBard(message);
    else return (await queryBard(message)).content;
}

export class Chat {
    constructor(ids) {
        this.ids = ids;
    }

    async ask(message, useJSON = false) {
        let request = await queryBard(message, this.ids);
        this.ids = { ...request.ids };
        if (useJSON) return request
        else return request.content
    }

    export() {
        return this.ids;
    }
}

export default { init, askAI, Chat }