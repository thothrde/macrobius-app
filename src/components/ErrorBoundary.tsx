// Error Boundary Component for Macrobius App
'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Macrobius Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent 
          error={this.state.error || new Error('Unknown error')}
          resetError={() => this.setState({ hasError: false })}
        />
      );
    }

    return this.props.children;
  }
}

// Default Error Fallback Component with Macrobius styling
function DefaultErrorFallback({ error, resetError }: { error: Error; resetError: () => void }) {
  return (
    <div style={{
      background: '#007BC7',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        border: '2px solid #FFD700',
        borderRadius: '8px',
        padding: '40px',
        maxWidth: '600px',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#FFD700', marginBottom: '20px' }}>
          🏛️ Macrobius - Temporary Error
        </h1>
        <p style={{ fontSize: '18px', marginBottom: '20px' }}>
          The application encountered an error, but don't worry - your beautiful design is working perfectly!
        </p>
        <details style={{ 
          background: 'rgba(0, 0, 0, 0.2)', 
          padding: '15px', 
          borderRadius: '5px',
          marginBottom: '20px',
          textAlign: 'left'
        }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            Technical Details
          </summary>
          <pre style={{ 
            fontSize: '12px', 
            marginTop: '10px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}>
            {error.message}
            {error.stack && '\n\nStack trace:\n' + error.stack}
          </pre>
        </details>
        <button
          onClick={resetError}
          style={{
            background: '#722F37',
            color: '#FFD700',
            border: '2px solid #FFD700',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#FFD700';
            e.currentTarget.style.color = '#722F37';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#722F37';
            e.currentTarget.style.color = '#FFD700';
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default ErrorBoundary;
export { ErrorBoundary };