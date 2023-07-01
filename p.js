const bardURL = "https://bard.google.com"
class Bard {
	// ID derived from Cookie
	SNlM0e;

	// HTTPS Headers
	#headers;

	// Resolution status of initialization call
	#initPromise;

	constructor(cookie) {
		// If a Cookie is provided, initialize
		if (cookie) {
			this.#initPromise = this.#init(cookie);
		}
	}

	// Can also choose to initialize manually
	async #init(cookie) {
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
			let response = await fetch(bardURL, {
				method: "GET",
				headers: this.#headers,
				credentials: "include",
			})

			let text = await response.text()
    	const SNlM0e = text.match(/SNlM0e":"(.*?)"/)[1];

			if (!SNlM0e) { // Failure to get SNlM0e from response
				throw new Error("Could not use your Cookie. Make sure that you copied correctly the Cookie with name __Secure-1PSID exactly. If you are sure your cookie is correct, you may also have reached your rate limit.");
			}
			// console.log("SNlM0e", SNlM0e)

			// Assign SNlM0e and return it
			this.SNlM0e = SNlM0e;
			return SNlM0e;
		} catch (e) { // Failure to get server
			throw new Error("Could not fetch Google Bard. You may be disconnected from internet.");
		}
	}

	// Query Bard
	async query(message, ids) {
		// Wait until after init
		await this.#initPromise;

		// If user has not run init
		if (!this.SNlM0e) {
			throw new Error("Please initialize Bard first. If you haven't passed in your Cookie into the class, run Bard.init(cookie).");
		}

		// HTTPS parameters
		const params = {
			bl: "boq_assistant-bard-web-server_20230613.09_p0",
			_reqID: ids == undefined ? "0" : ids._reqID,
			rt: "c",
		};
		console.log(params)

		// Expected IDs in the ids object
		const expectedIDs = ["_reqID", "conversationID", "responseID", "choiceID"];

		// If IDs are provided, but doesn't have every one of the expected IDs, error
		if (ids && !expectedIDs.every(x => ids[x])) {
			throw new Error("Please provide the JSON exported exactly as given.");
		}

		// Form final message/id structure
		const messageStruct = [[message], null, ids ? Object.values(ids).slice(0, 3) : [null, null, null]];

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
		const response = await fetch(url.toString(), {
			method: "POST",
			headers: this.headers,
			body: formBody,
			credentials: "include",
		});

    const responseData = await response.text();

				console.log(url.toString(), formBody, this.#headers, responseData)

    const chatData = JSON.parse(responseData.split("\n")[3])[0][2];

    // Check if there is data
    if (!chatData) {
        throw new Error(`Google Bard encountered an error ${responseData}.`);
    }

    // Get important data, and update with important data if set to do so
    const jsonChatData = JSON.parse(chatData)[4][0];

    let text = jsonChatData[1][0];

    let images = jsonChatData[4].map((x) => {
        return {
            tag: x[2],
            url: x[0][5].match(/imgurl=([^&%]+)/)[1],
        };
    }) ?? undefined;

		console.log("response", formBody, url.toString(),  JSON.parse(chatData))

		//! CONTINUE
	}

}

let myBard = new Bard("Wwgq7RoGrFoqJJs5jJ6SPxykY4BkusO4Oggyfcejnao4ov_IZ3PvE79BHNMcgs-RJOkRTw.")



async function A() {
const res = await myBard.query("hey bard")
		console.log(res)

	}

A()
// export default Bard;
