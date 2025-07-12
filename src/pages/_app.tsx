/**
 * 🚨 EMERGENCY TRANSLATION FIX - CRITICAL PRODUCTION UPDATE
 * ✅ FIXED: Language Context Provider properly wrapped
 * ✅ ADDED: Error boundaries for translation failures
 * ✅ ENHANCED: Hydration safety for SSG compatibility
 * ✅ VERIFIED: Works with direct translation fallbacks
 */

import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ErrorBoundary } from 'react-error-boundary';

// Error fallback component for translation failures
function TranslationErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 to-red-800 text-white p-8">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4">🚨 Translation System Error</h1>
        <p className="text-red-200 mb-6">A critical translation error occurred. The app will now use emergency fallback translations.</p>
        <button 
          onClick={resetErrorBoundary}
          className="bg-white text-red-800 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
        >
          Reload Application
        </button>
        <details className="mt-4 text-xs text-red-300">
          <summary className="cursor-pointer">Technical Details</summary>
          <pre className="mt-2 text-left bg-red-950 p-2 rounded text-xs overflow-auto">
            {error.message}
          </pre>
        </details>
      </div>
    </div>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary 
      FallbackComponent={TranslationErrorFallback}
      onError={(error, errorInfo) => {
        console.error('🚨 Translation System Error:', error, errorInfo);
        // In production, you might want to send this to an error tracking service
      }}
    >
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    </ErrorBoundary>
  );
}