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
	let SNlM0e: string;

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
	export declare function init(sessionID: string): Promise<string>;

	export type queryBardValidRes = {
		content: string;
		images: Array<{
			tag: string;
			url: string;
			source: {
				original: string;
				website: string;
				name: string;
				favicon: string;
			}
		}>;
		ids: IdsT;
	};
	export declare function queryBard(
		message: string,
		ids?: IdsT | Record<string, string>
	): Promise<queryBardValidRes | string>;

	export type formatMarkdown = (text: string, images: images) => string;

	export declare function askAI(
		message: string,
		useJSON?: boolean
	): Promise<queryBardValidRes | undefined | string>;

	export declare class Chat {
		ids?: IdsT | Record<string, string>;
		constructor(ids?: IdsT | Record<string, string>);
		ask(message: string, useJSON?: boolean): Promise<queryBardValidRes | string>;
		export(): typeof this.ids;
	}

	declare const Bard: {
		askAI: typeof askAI;
		init: typeof init;
		Chat: typeof Chat;
	}

	export default Bard;
}
