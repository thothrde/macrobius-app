import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="description" content="Advanced AI-powered educational platform for exploring Macrobius' works with Oracle Cloud integration" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Macrobius Digital Platform" />
        <meta name="keywords" content="Macrobius, Latin, Education, AI, Oracle Cloud, Ancient Literature" />
        
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Macrobius Digital" />
        
        <meta name="twitter:card" content="summary_large_image" />
        
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}