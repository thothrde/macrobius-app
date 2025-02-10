import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Macrobius Interactive Application" />
        <title>Macrobius Interactive</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}