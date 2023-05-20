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

const queryBard = async (message, ids) => {
    // console.log(ids)
    if (!SNlM0e) throw new Error("Make sure to call Bard.initialize(SESSION_ID) first.");

    // Parameters and POST data
    const params = {
        bl: "boq_assistant-bard-web-server_20230514.20_p0",
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

    return {
        content: jsonChatData[0][0],
        ids: {
            // Make sure kept in order, because using Object.keys() to query above
            conversationID: jsonChatData[1][0],
            responseID: jsonChatData[1][1],
            choiceID: jsonChatData[4][0][0]
        }
    }
}

export const askAI = async (message) => {
    return (await queryBard(message)).content;
}

export class Chat {
    constructor(ids) {
        this.ids = ids;
    }

    async ask(message) {
        let request = await queryBard(message, this.ids);
        this.ids = { ...request.ids, _reqID: request.ids._reqID ?? 0 + 100000 };
        return request.content;
    }

    export() {
        return this.ids;
    }
}

export default { init, askAI, Chat }