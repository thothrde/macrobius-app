// Main App component for Macrobius Educational Platform
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Analytics from '@/components/Analytics'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { LanguageProvider } from '@/contexts/LanguageContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <Component {...pageProps} />
        <Analytics />
      </LanguageProvider>
    </ErrorBoundary>
  )
}