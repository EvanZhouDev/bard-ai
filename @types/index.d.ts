/// <reference types="typescript" />

declare module "bard-ai" {
	export interface Session {
		baseURL: "https://bard.google.com";
		headers: {
			"X-Same-Domain": "1";
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36";
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8";
			Origin: "https://bard.google.com";
			Referer: "https://bard.google.com/";
			Cookie: string;
		};
	}

	let session: Session;
	let SNlM0e_Global: string;

	export type images = Array<{
		tag: string;
		url: string;
	}>;

	export type IdsT = {
		conversationID: string;
		responseID: string;
		choiceID: string;
		_reqID: string;
	};
	
	export type init = (sessionID: string) => Promise<string | Error>;

	export type queryBardValidRes = {
		content: string;
		images: Array<{
			tag: string;
			url: string;
		}>;
		ids: IdsT;
	};
	export type queryBard = (
		message: string,
		ids?: IdsT | Record<string, string>,
		SNlM0e?: string
	) => Promise<queryBardValidRes | string>;

	export type formatMarkdown = (text: string, images: images) => string;

	export type askAI = (
		message: string,
		...config: Array<boolean|string> 
	) => Promise<queryBardValidRes | undefined | string>;

	export class Chat {
		ids?: IdsT | Record<string, string>;
		SNlM0e: string

		constructor(...args: Array<boolean|string>)

		ask(
			message: string,
			useJSON: boolean
		): Promise<queryBardValidRes | string>;

		export(): typeof this.ids;
	};

	interface exportDefaults {
		askAI: askAI;
		init: init;
		Chat: Chat;
	}
	const defaults: exportDefaults;

	export default defaults;
}
