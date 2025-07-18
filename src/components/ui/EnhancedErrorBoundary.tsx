'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import EnhancedClassicalButton from './EnhancedClassicalButton';
import EnhancedClassicalCard from './EnhancedClassicalCard';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

interface EnhancedErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showErrorDetails?: boolean;
  enableReporting?: boolean;
  variant?: 'default' | 'cosmic' | 'minimal';
}

class EnhancedErrorBoundary extends Component<EnhancedErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: EnhancedErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    };
  }
  
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      hasError: true,
      error,
      errorId
    };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Enhanced Error Boundary');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.groupEnd();
    }
    
    // Call custom error handler
    this.props.onError?.(error, errorInfo);
    
    // Report error to monitoring service
    if (this.props.enableReporting) {
      this.reportError(error, errorInfo);
    }
  }
  
  private reportError = async (error: Error, errorInfo: ErrorInfo) => {
    try {
      // Example error reporting - replace with your preferred service
      const errorReport = {
        id: this.state.errorId,
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      
      // Send to error reporting service
      await fetch('/api/error-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(errorReport)
      });
    } catch (reportingError) {
      console.warn('Failed to report error:', reportingError);
    }
  };
  
  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    });
  };
  
  private handleGoHome = () => {
    window.location.href = '/';
  };
  
  private handleReload = () => {
    window.location.reload();
  };
  
  private copyErrorDetails = async () => {
    if (!this.state.error) return;
    
    const errorDetails = {
      id: this.state.errorId,
      message: this.state.error.message,
      stack: this.state.error.stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    try {
      await navigator.clipboard.writeText(JSON.stringify(errorDetails, null, 2));
      alert('Fehlerdetails in die Zwischenablage kopiert');
    } catch (err) {
      console.warn('Failed to copy error details:', err);
    }
  };
  
  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Render enhanced error UI
      return this.renderErrorUI();
    }
    
    return this.props.children;
  }
  
  private renderErrorUI() {
    const { variant = 'default', showErrorDetails = false } = this.props;
    const { error, errorInfo, errorId } = this.state;
    
    if (variant === 'minimal') {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <EnhancedClassicalCard variant="default" className="max-w-md text-center">
            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Etwas ist schiefgelaufen</h2>
            <p className="text-white/70 mb-6">Die Seite konnte nicht geladen werden.</p>
            <div className="flex gap-3 justify-center">
              <EnhancedClassicalButton
                variant="primary"
                onClick={this.handleRetry}
                icon={<RefreshCw className="w-4 h-4" />}
                size="sm"
              >
                Erneut versuchen
              </EnhancedClassicalButton>
              <EnhancedClassicalButton
                variant="secondary"
                onClick={this.handleGoHome}
                icon={<Home className="w-4 h-4" />}
                size="sm"
              >
                Zur Startseite
              </EnhancedClassicalButton>
            </div>
          </EnhancedClassicalCard>
        </div>
      );
    }
    
    return (
      <div className="min-h-screen macrobius-gradient-enhanced flex items-center justify-center p-4">
        {/* Cosmic Background Effects */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-dramatic-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            >
              <div className="w-1 h-1 bg-white rounded-full" />
            </div>
          ))}
        </div>
        
        <div className="relative z-10 w-full max-w-2xl">
          <EnhancedClassicalCard 
            variant={variant === 'cosmic' ? 'cosmic' : 'default'} 
            className="text-center"
            glow
          >
            {/* Error Icon */}
            <div className="mb-6">
              <div className="relative inline-flex items-center justify-center">
                <AlertTriangle className="w-16 h-16 text-red-400 animate-shimmer-enhanced" />
                <div className="absolute inset-0 bg-red-400/20 rounded-full blur-xl animate-cosmic-pulse-enhanced" />
              </div>
            </div>
            
            {/* Error Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-cosmic-enhanced mb-4">
              Oops! Ein Fehler ist aufgetreten
            </h1>
            
            {/* Error Description */}
            <div className="space-y-4 mb-8">
              <p className="text-lg text-white/80">
                Es tut uns leid, aber etwas ist bei der Ausführung der Anwendung schiefgelaufen.
              </p>
              
              {error && (
                <div className="glass-cosmic-enhanced rounded-xl p-4 text-left">
                  <h3 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                    <Bug className="w-4 h-4" />
                    Fehlerdetails:
                  </h3>
                  <p className="text-sm text-white/70 font-mono break-all">
                    {error.message}
                  </p>
                  {errorId && (
                    <p className="text-xs text-white/50 mt-2">
                      Fehler-ID: {errorId}
                    </p>
                  )}
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <EnhancedClassicalButton
                variant="primary"
                onClick={this.handleRetry}
                icon={<RefreshCw className="w-5 h-5" />}
                glow
              >
                Erneut versuchen
              </EnhancedClassicalButton>
              
              <EnhancedClassicalButton
                variant="secondary"
                onClick={this.handleReload}
                icon={<RefreshCw className="w-5 h-5" />}
              >
                Seite neu laden
              </EnhancedClassicalButton>
              
              <EnhancedClassicalButton
                variant="tertiary"
                onClick={this.handleGoHome}
                icon={<Home className="w-5 h-5" />}
              >
                Zur Startseite
              </EnhancedClassicalButton>
            </div>
            
            {/* Error Details Toggle */}
            {(showErrorDetails || process.env.NODE_ENV === 'development') && error && (
              <details className="text-left">
                <summary className="cursor-pointer text-white/60 hover:text-white transition-colors mb-3">
                  Technische Details anzeigen
                </summary>
                
                <div className="space-y-4">
                  {/* Error Stack */}
                  <div className="glass-cosmic-enhanced rounded-xl p-4">
                    <h4 className="font-semibold text-yellow-400 mb-2">Stack Trace:</h4>
                    <pre className="text-xs text-white/70 overflow-auto max-h-32 scrollbar-cosmic-enhanced">
                      {error.stack}
                    </pre>
                  </div>
                  
                  {/* Component Stack */}
                  {errorInfo?.componentStack && (
                    <div className="glass-cosmic-enhanced rounded-xl p-4">
                      <h4 className="font-semibold text-blue-400 mb-2">Component Stack:</h4>
                      <pre className="text-xs text-white/70 overflow-auto max-h-32 scrollbar-cosmic-enhanced">
                        {errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                  
                  {/* Copy Button */}
                  <EnhancedClassicalButton
                    variant="tertiary"
                    onClick={this.copyErrorDetails}
                    size="sm"
                    className="w-full"
                  >
                    Fehlerdetails kopieren
                  </EnhancedClassicalButton>
                </div>
              </details>
            )}
            
            {/* Help Text */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-sm text-white/60">
                Falls das Problem weiterhin besteht, versuchen Sie, Ihren Browser-Cache zu leeren
                oder kontaktieren Sie den Support mit der Fehler-ID.
              </p>
            </div>
          </EnhancedClassicalCard>
        </div>
      </div>
    );
  }
}

// HOC for wrapping components with error boundary
function withEnhancedErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<EnhancedErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <EnhancedErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </EnhancedErrorBoundary>
  );
  
  WrappedComponent.displayName = `withEnhancedErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

// Hook for handling async errors
function useEnhancedErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);
  
  const captureError = React.useCallback((error: Error) => {
    setError(error);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Async Error Captured:', error);
    }
  }, []);
  
  const clearError = React.useCallback(() => {
    setError(null);
  }, []);
  
  // Throw error to be caught by error boundary
  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);
  
  return { captureError, clearError, error };
}

export { withEnhancedErrorBoundary, useEnhancedErrorHandler };
export default EnhancedErrorBoundary;