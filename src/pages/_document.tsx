import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* 🎬 LITE YOUTUBE EMBED - GLOBAL SCRIPTS */}
        <script 
          src="https://cdn.jsdelivr.net/npm/lite-youtube-embed@0.1.3/src/lite-yt-embed.js" 
          type="module"
        />
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/lite-youtube-embed@0.1.3/src/lite-yt-embed.css" 
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}