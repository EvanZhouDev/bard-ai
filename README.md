  <img alt="EvanZhouDev Banner" src="./assets/banner@light.svg">
<picture>

  <source media="(prefers-color-scheme: dark)" srcset="./assets/banner@dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="./assets/banner@light.svg">
</picture>

<p align="center">
  <a aria-label="NPM Version" href="https://www.npmjs.com/package/bard-ai">
    <img alt="" src="https://img.shields.io/npm/v/bard-ai.svg?label=NPM&logo=npm&style=for-the-badge&color=F2984A&logoColor=white">
  </a>
  <a aria-label="NPM Download Count" href="https://www.npmjs.com/package/bard-ai">
    <img alt="" src="https://img.shields.io/npm/dt/bard-ai?label=Downloads&style=for-the-badge&color=D2667B">
  </a>
  <a aria-label="bard-ai Size" href="https://www.npmjs.com/package/bard-ai">
    <img alt="" src="https://img.shields.io/bundlephobia/minzip/bard-ai?style=for-the-badge&color=8B77CD">
  </a>
  <a aria-label="Join the community on Slack" href="https://join.slack.com/t/bard-aiworkspace/shared_invite/zt-1y1g3570m-Hx_N3IShMYBMkR6jpRyRjw">
    <img alt="" src="https://img.shields.io/badge/Slack-339AE0?style=for-the-badge&logo=slack&logoColor=white&label=Community">
  </a>
</p>
<p align="center">
  Ready to start? <a href="https://bard-ai-docs.vercel.app">Read the Docs</a>
</p>

### Features

-   🍪 **Multi-Cookie Use**: Have multiple Bard instances
-   🖼️ **Google Lens Support**: Powerful image recognition
-   📷 **Image Output**: Access images from Google
-   🌐 **Contextual Conversations**: Maintain conversation context

### Highlights

-   ⚡ **Fast Responses**: More than _2x_ faster than `googlebard`
-   🪶 **Lightweight**: Just 3.3kb minzipped
-   📚 **Typesafe**: Types included out-of-the-box

## Contributors

A special shoutout to these amazing indviduals:

<table>
<tr valign="middle">
<td width="20%" align="center" rowspan="2" colspan="2">
  <a href="https://github.com/acheong08">
  <img  style="border-radius: 50%;" src="https://github.com/acheong08.png" width="128">
  </a>
  <br>
  <a href="https://github.com/acheong08">@acheong08</a>
  <br>
  Python Bard API
</td>
<td width="20%" align="center" rowspan="2" colspan="2">
  <a href="https://github.com/thatxliner">
  <img  style="border-radius: 50%;" src="https://github.com/thatxliner.png" width="128">
  </a>
  <br>
  <a href="https://github.com/thatxliner">@ThatXliner</a>
  <br>
  Maintainer
</td>
<td width="20%" align="center" rowspan="2" colspan="2">
  <a href="https://github.com/Aldhanekaa">
  <img  style="border-radius: 50%;" src="https://github.com/Aldhanekaa.png" width="128">
  </a>
  <br>
  <a href="https://github.com/Aldhanekaa">@Aldhanekaa</a>
  <br>
  Contributor
</td>
<td width="20%" align="center" rowspan="2" colspan="2">
  <a href="https://github.com/RFS-ADRENO">
  <img  style="border-radius: 50%;" src="https://github.com/RFS-ADRENO.png" width="128">
  </a>
  <br>
  <a href="https://github.com/RFS-ADRENO">@RFS-ADRENO</a>
  <br>
  Contributor
</td>
<table>

However, we thank every person that helps in the development process of this library, no matter that be in code, ideas, or anything else.

## Comparison

Compared to leading JS Bard API [`googlebard`](https://github.com/PawanOsman/GoogleBard):

<picture>

  <source media="(prefers-color-scheme: dark)" srcset="./assets/compare@dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="./assets/compare@light.svg">
  <img alt="bard-ai Compared to GoogleBard" src="./assets/compare@light.svg">
</picture>

<details>
<summary>Learn more...</summary>
<br/>

`bard-ai` surpasses leading competition [GoogleBard by PawanOsman](https://github.com/PawanOsman/GoogleBard) for three key reasons:

#### Size
`bard-ai` is a tiny 3.3kb, approximately 97% smaller than `googlebard`. This leads to faster downloads, and maximum efficiency.

#### Speed

`bard-ai` performs up to a whopping _2.25x faster_ than `googlebard`, when subjected to 4 consecutive requests, as measured with `hyperfine`.[^1]

#### Features

`bard-ai` is updated with the latest and most advanced features available in Google Bard itself, including powerful Image Recognition with Google Lens.

</details>

[^1]:
    Run with `hyperfine --runs 3` between `bard-ai` v2.0 and `googlebard`.
    Equivalent code was used in the runs:

    **`bard-ai`**:

    ```javascript
    import Bard from "bard-ai";

    let bot = new Bard(COOKIE);

    console.log(await bot.ask("Hello world!"));
    console.log(await bot.ask("What is 1+1?"));
    console.log(await bot.ask("What about 2+2?"));
    console.log(await bot.ask("Goodbye."));
    ```

    **`googlebard`**:

    ```javascript
    import { Bard } from "googlebard";

    let bot = new Bard(`__Secure-1PSID=${COOKIE}`);

    console.log(await bot.ask("Hello world!"));
    console.log(await bot.ask("What is 1+1?"));
    console.log(await bot.ask("What about 2+2?"));
    console.log(await bot.ask("Goodbye."));
    ```

    **Result**:

    ```bash
    Benchmark 1: node bard-ai.js
    Time (mean ± σ):     18.346 s ±  0.768 s    [User: 0.307 s, System: 0.067 s]
    Range (min … max):   17.531 s … 19.057 s    3 runs

    Benchmark 2: node googlebard.js
      Time (mean ± σ):     37.179 s ±  3.714 s    [User: 1.416 s, System: 0.191 s]
      Range (min … max):   34.230 s … 41.349 s    3 runs

    Summary
    'node bard-ai.js' ran
    2.03 ± 0.22 times faster than 'node googlebard.js'
    ```

## Let's Get Started!

Read the documentation, available at [bard-ai-docs.vercel.app](https://bard-ai-docs.vercel.app/).

### Table of Contents

-   [Introduction](https://bard-ai-docs.vercel.app/)
-   Pre-Requisites
    -   [Installation](https://bard-ai-docs.vercel.app/prerequisites/installation)
    -   [Authentication](https://bard-ai-docs.vercel.app/prerequisites/authentication)
-   Basics
    -   [Quick Start](https://bard-ai-docs.vercel.app/basics/quickstart)
    -   [Initialization](https://bard-ai-docs.vercel.app/basics/initialization)
    -   [Ask AI](https://bard-ai-docs.vercel.app/basics/askAI)
    -   [Bard Chat](https://bard-ai-docs.vercel.app/basics/chat)
-   Advanced
    -   [Importing/Exporting Chats](https://bard-ai-docs.vercel.app/advanced/importExportChat)
    -   [JSON Response Flag](https://bard-ai-docs.vercel.app/advanced/useJSON)
-   [Typescript Support](https://bard-ai-docs.vercel.app/typescript)
-   [Polyfilling Fetch](https://bard-ai-docs.vercel.app/fetch)

Go ahead! It's easy to learn... Trust me!

<br/>
<br/>
<br/>
