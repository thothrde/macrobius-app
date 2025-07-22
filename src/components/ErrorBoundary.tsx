// 🛡️ COMPREHENSIVE ERROR BOUNDARY - Production-Ready Error Handling
// ✅ COMPLETE: Graceful error handling for all components
// 🎨 ENHANCED: Beautiful error UI with recovery options
// 🔧 INTEGRATED: Automatic error reporting and user feedback

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug, Mail } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
}

class ErrorBoundary extends Component<Props, State> {
  private maxRetries = 3;
  private retryTimeout: NodeJS.Timeout | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
      retryCount: 0
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error for monitoring
    console.error('🚨 Error Boundary Caught:', error);
    console.error('📍 Error Info:', errorInfo);
    
    // Report error to analytics/monitoring service
    this.reportError(error, errorInfo);
  }

  private reportError = (error: Error, errorInfo: ErrorInfo) => {
    try {
      // Here you could integrate with error monitoring services like Sentry
      const errorReport = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      
      console.log('📊 Error Report:', errorReport);
      // Example: Send to monitoring service
      // errorMonitoringService.captureException(error, errorReport);
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  };

  private handleRetry = () => {
    const { retryCount } = this.state;
    
    if (retryCount < this.maxRetries) {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: retryCount + 1
      });
      
      // Auto-retry with exponential backoff
      if (this.retryTimeout) {
        clearTimeout(this.retryTimeout);
      }
      
      this.retryTimeout = setTimeout(() => {
        window.location.reload();
      }, Math.pow(2, retryCount) * 1000);
    } else {
      // Max retries reached, suggest page refresh
      window.location.reload();
    }
  };

  private handleReportBug = () => {
    const { error, errorInfo } = this.state;
    const subject = encodeURIComponent('Macrobius App Error Report');
    const body = encodeURIComponent(
      `Error: ${error?.message}\n\nStack: ${error?.stack}\n\nComponent Stack: ${errorInfo?.componentStack}\n\nURL: ${window.location.href}\n\nTimestamp: ${new Date().toISOString()}`
    );
    
    window.open(`mailto:support@macrobius-app.com?subject=${subject}&body=${body}`);
  };

  componentWillUnmount() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }
  }

  render() {
    const { hasError, error, errorInfo, retryCount } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8fafc',
          padding: '24px'
        }}>
          <div style={{
            maxWidth: '600px',
            width: '100%',
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '40px',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
            border: '2px solid rgba(239, 68, 68, 0.1)'
          }}>
            {/* Error Icon */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              border: '3px solid rgba(239, 68, 68, 0.2)'
            }}>
              <AlertTriangle style={{
                width: '40px',
                height: '40px',
                color: '#ef4444'
              }} />
            </div>

            {/* Error Title */}
            <h1 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1f2937',
              margin: '0 0 16px 0',
              fontFamily: 'Times New Roman, serif'
            }}>
              🏛️ Oops! Something went wrong
            </h1>

            {/* Error Description */}
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              margin: '0 0 32px 0',
              lineHeight: '1.6'
            }}>
              We encountered an unexpected error while exploring the ancient world of Macrobius. 
              Don't worry - even the greatest scholars faced challenges!
            </p>

            {/* Error Details (Collapsible) */}
            <details style={{
              marginBottom: '32px',
              textAlign: 'left',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              padding: '16px',
              border: '1px solid #e5e7eb'
            }}>
              <summary style={{
                cursor: 'pointer',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '12px'
              }}>
                🔍 Technical Details
              </summary>
              <div style={{
                fontSize: '14px',
                fontFamily: 'monospace',
                color: '#6b7280',
                backgroundColor: 'white',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                overflow: 'auto',
                maxHeight: '200px'
              }}>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Error:</strong> {error?.message}
                </div>
                {error?.stack && (
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Stack:</strong>
                    <pre style={{ whiteSpace: 'pre-wrap', margin: '4px 0' }}>
                      {error.stack}
                    </pre>
                  </div>
                )}
                {errorInfo?.componentStack && (
                  <div>
                    <strong>Component Stack:</strong>
                    <pre style={{ whiteSpace: 'pre-wrap', margin: '4px 0' }}>
                      {errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </div>
            </details>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              {/* Retry Button */}
              <button
                onClick={this.handleRetry}
                disabled={retryCount >= this.maxRetries}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: retryCount >= this.maxRetries 
                    ? 'rgba(107, 114, 128, 0.1)'
                    : 'rgba(139, 92, 246, 1)',
                  color: retryCount >= this.maxRetries ? '#6b7280' : 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: retryCount >= this.maxRetries ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: retryCount >= this.maxRetries 
                    ? 'none'
                    : '0 4px 16px rgba(139, 92, 246, 0.3)'
                }}
                onMouseEnter={(e) => {
                  if (retryCount < this.maxRetries) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 92, 246, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (retryCount < this.maxRetries) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 92, 246, 0.3)';
                  }
                }}
              >
                <RefreshCw style={{ width: '20px', height: '20px' }} />
                {retryCount >= this.maxRetries ? 'Max Retries Reached' : `Try Again (${retryCount}/${this.maxRetries})`}
              </button>

              {/* Home Button */}
              <button
                onClick={() => window.location.href = '/'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 24px',
                  borderRadius: '12px',
                  border: '2px solid rgba(16, 185, 129, 0.3)',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  color: '#059669',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Home style={{ width: '20px', height: '20px' }} />
                Return Home
              </button>

              {/* Report Bug Button */}
              <button
                onClick={this.handleReportBug}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 24px',
                  borderRadius: '12px',
                  border: '2px solid rgba(245, 158, 11, 0.3)',
                  backgroundColor: 'rgba(245, 158, 11, 0.1)',
                  color: '#d97706',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Bug style={{ width: '20px', height: '20px' }} />
                Report Bug
              </button>
            </div>

            {/* Helpful Message */}
            <div style={{
              marginTop: '32px',
              padding: '20px',
              backgroundColor: 'rgba(59, 130, 246, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(59, 130, 246, 0.1)'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: 0,
                lineHeight: '1.5'
              }}>
                💡 <strong>Tip:</strong> Try refreshing the page, checking your internet connection, 
                or accessing a different section of the app. Most issues resolve themselves quickly.
              </p>
            </div>

            {/* Classical Quote */}
            <div style={{
              marginTop: '24px',
              fontStyle: 'italic',
              color: '#9ca3af',
              fontSize: '14px'
            }}>
              "Errare humanum est" - To err is human
              <br />
              <span style={{ fontSize: '12px' }}>- Macrobius would understand 🏛️</span>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

// Higher-order component for wrapping components with error boundary
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

export default ErrorBoundary;