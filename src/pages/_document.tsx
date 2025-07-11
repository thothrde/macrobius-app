import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Macrobius - Kulturelle Schätze der Antike" />
        <meta name="keywords" content="Macrobius, Antike, Römische Kultur, Saturnalia, Digital Humanities" />
        <meta name="author" content="Macrobius Digital Humanities Project" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Macrobius - Kulturelle Schätze der Antike" />
        <meta property="og:description" content="Entdecken Sie die Kulturschätze der Antike durch Macrobius' Werke" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://macrobius-app.vercel.app" />
        <meta property="og:image" content="/MacrobiusBottle.jpg" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Macrobius - Kulturelle Schätze der Antike" />
        <meta name="twitter:description" content="Entdecken Sie die Kulturschätze der Antike" />
        <meta name="twitter:image" content="/MacrobiusBottle.jpg" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Crimson+Text:wght@400;600&display=swap" 
          rel="stylesheet" 
        />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FFD700" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/Astrolab.jpg" as="image" />
        <link rel="preload" href="/MacrobiusBottle.jpg" as="image" />
      </Head>
      <body className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}