import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const prefix = './';
  
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Macrobius Interactive Application" />
        <title>Macrobius Interactive</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__NEXT_PREFIX__ = '${prefix}';`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}