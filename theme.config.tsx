import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import { Code } from "nextra/components";
import imageUrl from "./assets/opengraph.jpg";

const config: DocsThemeConfig = {
	logo: (
		<span>
			<Code>bard-ai</Code> Documentation
		</span>
	),
	chat: {
		link: "https://www.npmjs.com/package/bard-ai",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				id="n"
				width="24"
				height="24"
				viewBox="0 0 16 16"
			>
				<title>n</title>
				<path fill="currentColor" d="M0,16V0H16V16ZM3,3V13H8V5h3v8h2V3Z" />
				<path fill="transparent" d="M3,3H13V13H11V5H8v8H3Z" />
			</svg>
		),
	},
	project: {
		link: "https://github.com/EvanZhouDev/bard-ai",
	},
	docsRepositoryBase: "https://github.com/EvanZhouDev/bard-ai-docs",
	footer: {
		text: "GPL-3.0 2023 © EvanZhouDev",
	},
	useNextSeoProps() {
		return {
			titleTemplate: "%s – bard-ai",
		};
	},
	head: (
		<>
			<meta property="og:title" content="bard-ai Docs" />
			<meta property="og:description" content="Documentation for bard-ai" />
			<meta
				property="og:image"
				content={`https://bard-ai-docs.vercel.app${imageUrl}`}
			/>
		</>
	),
};

export default config;
