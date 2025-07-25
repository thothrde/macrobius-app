// 🚀 Performance Monitoring Component for Macrobius App
// Real-time performance tracking and optimization recommendations
// Monitors Oracle Cloud connection, loading times, and user experience metrics

import React, { useState, useEffect, useRef } from 'react';
import { MacrobiusAPI, getApiConnectionStatus } from '@/lib/enhanced-api-client-with-fallback';
import {
  Activity,
  Clock,
  Cpu,
  Database,
  Eye,
  Gauge,
  TrendingUp,
  TrendingDown,
  Wifi,
  WifiOff,
  AlertTriangle,
  CheckCircle,
  Zap,
  BarChart3,
  Monitor,
  Server
} from 'lucide-react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  apiResponseTime: number;
  memoryUsage: number;
  connectionStatus: 'connected' | 'degraded' | 'offline';
  errorCount: number;
  frameRate: number;
  networkLatency: number;
}

interface PerformanceMonitorProps {
  isVisible?: boolean;
  className?: string;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ 
  isVisible = false, 
  className = '' 
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    apiResponseTime: 0,
    memoryUsage: 0,
    connectionStatus: 'offline',
    errorCount: 0,
    frameRate: 60,
    networkLatency: 0
  });
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [historicalData, setHistoricalData] = useState<PerformanceMetrics[]>([]);
  const frameCountRef = useRef(0);
  const lastFrameTimeRef = useRef(performance.now());
  const errorCountRef = useRef(0);
  
  // Performance monitoring hook
  useEffect(() => {
    if (!isVisible) return;
    
    const startTime = performance.now();
    
    // Measure initial load time
    const measureLoadTime = () => {
      const loadTime = performance.now() - startTime;
      setMetrics(prev => ({ ...prev, loadTime }));
    };
    
    // Monitor frame rate
    const measureFrameRate = () => {
      const now = performance.now();
      frameCountRef.current++;
      
      if (now - lastFrameTimeRef.current >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / (now - lastFrameTimeRef.current));
        setMetrics(prev => ({ ...prev, frameRate: fps }));
        frameCountRef.current = 0;
        lastFrameTimeRef.current = now;
      }
      
      requestAnimationFrame(measureFrameRate);
    };
    
    // Measure memory usage (if available)
    const measureMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usedJSHeapSize = memory.usedJSHeapSize / 1024 / 1024; // Convert to MB
        setMetrics(prev => ({ ...prev, memoryUsage: Math.round(usedJSHeapSize) }));
      }
    };
    
    // Test Oracle Cloud connection and measure latency
    const testConnection = async () => {
      const startTime = performance.now();
      try {
        const status = getApiConnectionStatus();
        const healthCheck = await MacrobiusAPI.system.healthCheck();
        const endTime = performance.now();
        const responseTime = endTime - startTime;
        
        setMetrics(prev => ({
          ...prev,
          apiResponseTime: Math.round(responseTime),
          connectionStatus: status.status?.oracle === 'connected' ? 'connected' : 'degraded',
          networkLatency: Math.round(responseTime)
        }));
      } catch (error) {
        const endTime = performance.now();
        const responseTime = endTime - startTime;
        
        setMetrics(prev => ({
          ...prev,
          apiResponseTime: Math.round(responseTime),
          connectionStatus: 'offline',
          networkLatency: Math.round(responseTime),
          errorCount: prev.errorCount + 1
        }));
        
        errorCountRef.current++;
      }
    };
    
    // Error monitoring
    const originalError = window.onerror;
    window.onerror = (message, source, lineno, colno, error) => {
      errorCountRef.current++;
      setMetrics(prev => ({ ...prev, errorCount: errorCountRef.current }));
      if (originalError) originalError(message, source, lineno, colno, error);
    };
    
    // Initial measurements
    measureLoadTime();
    measureMemoryUsage();
    testConnection();
    requestAnimationFrame(measureFrameRate);
    
    // Set up intervals
    const memoryInterval = setInterval(measureMemoryUsage, 5000);
    const connectionInterval = setInterval(testConnection, 30000);
    
    // Clean up
    return () => {
      clearInterval(memoryInterval);
      clearInterval(connectionInterval);
      window.onerror = originalError;
    };
  }, [isVisible]);
  
  // Store historical data
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setHistoricalData(prev => {
        const newData = [...prev, metrics];
        return newData.slice(-20); // Keep last 20 measurements
      });
    }, 10000); // Every 10 seconds
    
    return () => clearInterval(interval);
  }, [metrics, isVisible]);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-400';
      case 'degraded': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4" />;
      case 'degraded': return <AlertTriangle className="w-4 h-4" />;
      case 'offline': return <WifiOff className="w-4 h-4" />;
      default: return <Wifi className="w-4 h-4" />;
    }
  };
  
  const getPerformanceGrade = () => {
    let score = 0;
    
    // Loading time (30% weight)
    if (metrics.loadTime < 1000) score += 30;
    else if (metrics.loadTime < 2000) score += 20;
    else if (metrics.loadTime < 3000) score += 10;
    
    // Frame rate (25% weight)
    if (metrics.frameRate >= 50) score += 25;
    else if (metrics.frameRate >= 30) score += 15;
    else if (metrics.frameRate >= 20) score += 10;
    
    // API response time (25% weight)
    if (metrics.apiResponseTime < 200) score += 25;
    else if (metrics.apiResponseTime < 500) score += 15;
    else if (metrics.apiResponseTime < 1000) score += 10;
    
    // Connection status (20% weight)
    if (metrics.connectionStatus === 'connected') score += 20;
    else if (metrics.connectionStatus === 'degraded') score += 10;
    
    if (score >= 80) return { grade: 'A', color: 'text-green-400' };
    if (score >= 60) return { grade: 'B', color: 'text-yellow-400' };
    if (score >= 40) return { grade: 'C', color: 'text-orange-400' };
    return { grade: 'D', color: 'text-red-400' };
  };
  
  const getOptimizationTips = () => {
    const tips = [];
    
    if (metrics.loadTime > 3000) {
      tips.push('🚀 Consider code splitting to improve load times');
    }
    
    if (metrics.frameRate < 30) {
      tips.push('🎬 Reduce animations or complex calculations');
    }
    
    if (metrics.apiResponseTime > 1000) {
      tips.push('⚡ Oracle Cloud may be experiencing high latency');
    }
    
    if (metrics.memoryUsage > 100) {
      tips.push('🧠 Consider optimizing memory usage');
    }
    
    if (metrics.errorCount > 5) {
      tips.push('🛠️ Check console for errors that need fixing');
    }
    
    if (tips.length === 0) {
      tips.push('✨ Performance is optimal!');
    }
    
    return tips;
  };
  
  if (!isVisible) return null;
  
  const performanceGrade = getPerformanceGrade();
  const optimizationTips = getOptimizationTips();
  
  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      {/* Minimized View */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-sm border border-gold/30 rounded-lg text-white hover:bg-black/90 transition-all duration-200"
        >
          <Activity className="w-4 h-4 text-green-400" />
          <span className={`font-bold ${performanceGrade.color}`}>
            {performanceGrade.grade}
          </span>
          <div className={`w-2 h-2 rounded-full ${getStatusColor(metrics.connectionStatus).replace('text-', 'bg-')}`} />
        </button>
      )}
      
      {/* Expanded View */}
      {isExpanded && (
        <div className="bg-black/90 backdrop-blur-sm border border-gold/30 rounded-lg p-6 w-80 max-h-96 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-400" />
              <h3 className="text-white font-semibold">Performance</h3>
              <span className={`text-xl font-bold ${performanceGrade.color}`}>
                {performanceGrade.grade}
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white/5 rounded p-3">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-white/70 text-sm">Load Time</span>
              </div>
              <div className="text-white font-bold">{metrics.loadTime.toFixed(0)}ms</div>
            </div>
            
            <div className="bg-white/5 rounded p-3">
              <div className="flex items-center gap-2 mb-1">
                <Monitor className="w-4 h-4 text-purple-400" />
                <span className="text-white/70 text-sm">Frame Rate</span>
              </div>
              <div className="text-white font-bold">{metrics.frameRate} FPS</div>
            </div>
            
            <div className="bg-white/5 rounded p-3">
              <div className="flex items-center gap-2 mb-1">
                <Server className="w-4 h-4 text-green-400" />
                <span className="text-white/70 text-sm">API Response</span>
              </div>
              <div className="text-white font-bold">{metrics.apiResponseTime}ms</div>
            </div>
            
            <div className="bg-white/5 rounded p-3">
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="w-4 h-4 text-orange-400" />
                <span className="text-white/70 text-sm">Memory</span>
              </div>
              <div className="text-white font-bold">{metrics.memoryUsage}MB</div>
            </div>
          </div>
          
          {/* Connection Status */}
          <div className="bg-white/5 rounded p-3 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-gold" />
                <span className="text-white/70 text-sm">Oracle Cloud</span>
              </div>
              <div className={`flex items-center gap-2 ${getStatusColor(metrics.connectionStatus)}`}>
                {getStatusIcon(metrics.connectionStatus)}
                <span className="text-sm font-medium capitalize">
                  {metrics.connectionStatus}
                </span>
              </div>
            </div>
            {metrics.networkLatency > 0 && (
              <div className="mt-2 text-white/60 text-xs">
                Latency: {metrics.networkLatency}ms
              </div>
            )}
          </div>
          
          {/* Error Count */}
          {metrics.errorCount > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 rounded p-3 mb-4">
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {metrics.errorCount} error{metrics.errorCount !== 1 ? 's' : ''} detected
                </span>
              </div>
            </div>
          )}
          
          {/* Optimization Tips */}
          <div className="space-y-2">
            <h4 className="text-white/80 text-sm font-medium flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              Optimization Tips
            </h4>
            {optimizationTips.map((tip, index) => (
              <div key={index} className="text-white/60 text-xs bg-white/5 rounded p-2">
                {tip}
              </div>
            ))}
          </div>
          
          {/* Historical Performance Trend */}
          {historicalData.length > 5 && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <h4 className="text-white/80 text-sm font-medium flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-green-400" />
                Performance Trend
              </h4>
              <div className="flex items-end gap-1 h-8">
                {historicalData.slice(-10).map((data, index) => {
                  const height = Math.max(10, Math.min(32, (60 - data.apiResponseTime / 20)));
                  return (
                    <div
                      key={index}
                      className="bg-green-400/60 w-2 rounded-t"
                      style={{ height: `${height}px` }}
                      title={`API Response: ${data.apiResponseTime}ms`}
                    />
                  );
                })}
              </div>
              <div className="text-white/40 text-xs mt-1">
                Last 10 measurements (API response time)
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitor;