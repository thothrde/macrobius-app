// 🚀 MAIN APP COMPONENT - Production Ready with Error Boundaries
// ✅ COMPLETE: Full error handling and language support
// 🛡️ ENHANCED: Comprehensive error boundaries for stability
// 🎨 ENHANCED: Global styles and performance optimization

import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import '@/styles/globals.css';

// 🎨 Global Styles Component
const GlobalStyles = () => (
  <style jsx global>{`
    /* 🎨 Enhanced Global Styles for Production */
    * {
      box-sizing: border-box;
    }
    
    html {
      scroll-behavior: smooth;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      background: linear-gradient(135deg, 
        rgba(248, 246, 240, 0.95) 0%, 
        rgba(245, 241, 232, 0.97) 50%, 
        rgba(240, 235, 226, 0.95) 100%);
      color: #1f2937;
      line-height: 1.6;
      min-height: 100vh;
      overflow-x: hidden;
    }
    
    /* 🎨 Enhanced scrollbar styling */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    
    ::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.05);
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, #d4af37, #f59e0b);
      border-radius: 4px;
      transition: all 0.2s ease;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(135deg, #f59e0b, #92400e);
    }
    
    /* 🎨 Focus styles for accessibility */
    *:focus {
      outline: 2px solid rgba(139, 92, 246, 0.5);
      outline-offset: 2px;
    }
    
    button:focus,
    input:focus,
    textarea:focus,
    select:focus {
      outline: 2px solid rgba(139, 92, 246, 0.5);
      outline-offset: 2px;
    }
    
    /* 🎨 Selection styles */
    ::selection {
      background: rgba(212, 175, 55, 0.3);
      color: #92400e;
    }
    
    ::-moz-selection {
      background: rgba(212, 175, 55, 0.3);
      color: #92400e;
    }
    
    /* 🎨 Improved button and interactive element styles */
    button {
      font-family: inherit;
      cursor: pointer;
      border: none;
      background: none;
      outline: none;
      transition: all 0.2s ease;
    }
    
    button:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
    
    input, textarea {
      font-family: inherit;
      outline: none;
    }
    
    /* 🎨 Responsive image handling */
    img {
      max-width: 100%;
      height: auto;
      display: block;
    }
    
    /* 🎨 Print styles */
    @media print {
      body {
        background: white !important;
        color: black !important;
      }
      
      * {
        box-shadow: none !important;
        text-shadow: none !important;
      }
    }
    
    /* 🎨 Reduced motion for accessibility */
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
    
    /* 🎨 High contrast mode support */
    @media (prefers-contrast: high) {
      * {
        border-color: currentColor !important;
      }
    }
    
    /* 🎨 Enhanced mobile styles */
    @media (max-width: 768px) {
      body {
        font-size: 16px;
        -webkit-text-size-adjust: 100%;
      }
      
      /* Prevent zoom on input focus */
      input, select, textarea {
        font-size: 16px;
      }
    }
    
    /* 🎨 Loading indicator */
    .loading {
      opacity: 0.7;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }
    
    /* 🎨 Utility classes for common animations */
    .fade-in {
      animation: fadeIn 0.3s ease-in;
    }
    
    .slide-up {
      animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* 🎨 Skeleton loading animation */
    .skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }
    
    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `}</style>
);

// 🛡️ App Error Fallback Component
const AppErrorFallback = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    padding: '24px',
    textAlign: 'center'
  }}>
    <div style={{
      maxWidth: '400px',
      padding: '40px',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
    }}>
      <h1 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '16px'
      }}>
        🏛️ Macrobius App
      </h1>
      <p style={{
        color: '#6b7280',
        marginBottom: '24px'
      }}>
        We encountered a critical error. Please refresh the page or try again later.
      </p>
      <button
        onClick={() => window.location.reload()}
        style={{
          padding: '12px 24px',
          backgroundColor: '#8b5cf6',
          color: 'white',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '600'
        }}
      >
        Refresh Page
      </button>
    </div>
  </div>
);

// 🚀 MAIN APP COMPONENT
export default function App({ Component, pageProps }: AppProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
    
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Prevent hydration mismatches
  if (!isHydrated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(139, 92, 246, 0.2)',
            borderTopColor: '#8b5cf6',
            borderRadius: '50%',
            margin: '0 auto 20px',
            animation: 'spin 1s linear infinite'
          }} />
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '8px',
            fontFamily: 'Times New Roman, serif'
          }}>
            🏛️ Macrobius
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: '16px'
          }}>
            Loading ancient wisdom...
          </p>
        </div>
        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<AppErrorFallback />}>
      <LanguageProvider>
        <GlobalStyles />
        
        {/* 🎨 Loading Overlay */}
        {isLoading && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(248, 246, 240, 0.95)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.3s ease'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                border: '6px solid rgba(212, 175, 55, 0.2)',
                borderTopColor: '#d4af37',
                borderRadius: '50%',
                margin: '0 auto 24px',
                animation: 'spin 1s linear infinite'
              }} />
              <h2 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #d4af37, #f59e0b, #92400e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '12px',
                fontFamily: 'Times New Roman, serif'
              }}>
                Macrobius
              </h2>
              <p style={{
                color: '#6b7280',
                fontSize: '18px',
                fontStyle: 'italic'
              }}>
                Initializing AI systems...
              </p>
            </div>
          </div>
        )}
        
        {/* 🚀 Main App Component with Error Boundary */}
        <ErrorBoundary>
          <div className={isLoading ? 'loading' : 'fade-in'}>
            <Component {...pageProps} />
          </div>
        </ErrorBoundary>
        
        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </LanguageProvider>
    </ErrorBoundary>
  );
}