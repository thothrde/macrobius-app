import type { AppProps } from 'next/app';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  // Remove any trailing slashes from assetPrefix
  const prefix = process.env.NEXT_PUBLIC_BASE_URL || '';
  const assetPrefix = prefix.endsWith('/') ? prefix.slice(0, -1) : prefix;

  return (
    <div data-asset-prefix={assetPrefix}>
      <Component {...pageProps} />
    </div>
  );
}