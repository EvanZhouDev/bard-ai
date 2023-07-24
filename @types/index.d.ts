/// <reference types="typescript" />

declare module "bard-ai" {
	declare enum EResponseType {
		JSON = "json",
		MD = "markdown",
	}

	export type TImage = `${string}.${"jpeg" | "jpg" | "png" | "webp"}` | Buffer;

	export type TIds = {
		_reqID: string;
		conversationID: string;
		responseID: string;
		choiceID: string;
	}

	export type TAskConfig = Partial<{
		format: `${EResponseType}`;
		image: TImage;
		ids: Partial<TIds>,
	}>;

	export type TBardConfig = Partial<{
		verbose: boolean;
		fetch: typeof fetch;
		context: string;
	}>

	export interface IAskResponseJSON {
		content: string;
		images: {
			tag: string;
			url: string;
			source: {
				original: string;
				website: string;
				name: string;
				favicon: string;
			}
		}[];
		ids: TIds;
	}
	
	export type Cookie = string | {
		[key: string]: string;
	}

	declare class Chat {
		ids?: TIds;

		ask(message: string, config?: TAskConfig): Promise<IAskResponseJSON | string>;
		export(): typeof this.ids;
	}

	declare class Bard {
		static JSON = EResponseType.JSON;
		static MD = EResponseType.MD;

		SNlM0e?: string;

		cookie: Cookie;

		constructor(cookie: Cookie, config?: TBardConfig)

		ask(message: string, config?: TAskConfig): Promise<IAskResponseJSON | string>;
		createChat(ids?: Partial<TIds>): Chat;
	}

	export default Bard;
}
