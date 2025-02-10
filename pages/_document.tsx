import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Macrobius Interactive Application" />
        <title>Macrobius Interactive</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var originalGetElementById = document.getElementById;
                document.getElementById = function() {
                  var element = originalGetElementById.apply(this, arguments);
                  if (element && element.tagName === 'SCRIPT') {
                    var src = element.getAttribute('src');
                    if (src && src.startsWith('/')) {
                      element.setAttribute('src', '.' + src);
                    }
                  }
                  return element;
                };
              })();
            `,
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