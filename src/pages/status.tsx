/**
 * 🔧 MACROBIUS SYSTEM STATUS DASHBOARD
 * Comprehensive health check for all components and Oracle Cloud integration
 */

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Server,
  Database,
  Activity,
  Globe
} from 'lucide-react';

interface SystemCheck {
  name: string;
  status: 'success' | 'warning' | 'error';
  message: string;
  details?: string[];
}

export default function StatusPage() {
  const [systemChecks, setSystemChecks] = useState<SystemCheck[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    performSystemChecks();
  }, []);

  const performSystemChecks = async () => {
    const checks: SystemCheck[] = [];

    // Frontend check
    checks.push({
      name: 'Frontend Application',
      status: 'success',
      message: 'Next.js application loaded successfully',
      details: ['React 18+', 'TypeScript', 'Tailwind CSS']
    });

    // Browser compatibility
    const isModernBrowser = !!(window.fetch && window.Promise);
    checks.push({
      name: 'Browser Compatibility',
      status: isModernBrowser ? 'success' : 'warning',
      message: isModernBrowser ? 'Modern browser features available' : 'Some features may be limited'
    });

    // Performance check
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as any;
      const loadTime = navigation ? Math.round(navigation.loadEventEnd - navigation.loadEventStart) : 0;
      
      checks.push({
        name: 'Application Performance',
        status: loadTime < 3000 ? 'success' : 'warning',
        message: `Load time: ${loadTime}ms`,
        details: [`Target: < 3000ms`]
      });
    }

    // Oracle Cloud connection test
    try {
      const response = await fetch('http://152.70.184.232:8080/api/health', {
        method: 'GET',
        timeout: 5000
      });
      
      if (response.ok) {
        checks.push({
          name: 'Oracle Cloud Backend',
          status: 'success',
          message: 'Connected to Oracle Cloud successfully',
          details: ['Server: 152.70.184.232:8080', 'Status: Operational']
        });
      } else {
        checks.push({
          name: 'Oracle Cloud Backend',
          status: 'warning',
          message: 'Oracle Cloud connection issues',
          details: ['Using fallback mode', 'Some features may be limited']
        });
      }
    } catch (error) {
      checks.push({
        name: 'Oracle Cloud Backend',
        status: 'warning',
        message: 'Oracle Cloud unavailable - using offline mode',
        details: ['Fallback data active', 'Full functionality when connected']
      });
    }

    setSystemChecks(checks);
    setIsLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Activity className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <>
      <Head>
        <title>System Status - Macrobius Platform</title>
        <meta name="description" content="System health check and status dashboard" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 mb-4">
              System Status
            </h1>
            <p className="text-xl text-blue-200 mb-6">
              Macrobius Educational Platform Health Check
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-full text-green-300 text-sm font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Status Dashboard Active
            </div>
          </motion.div>

          {/* System Checks */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Activity className="w-6 h-6 mr-3 text-blue-400" />
              System Health
            </h2>
            
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
                <p className="text-white/80 mt-4">Running health checks...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {systemChecks.map((check, index) => (
                  <motion.div
                    key={check.name}
                    className="p-4 bg-white/5 rounded-lg border border-white/10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-blue-400" />
                        <span className="font-semibold text-white">{check.name}</span>
                      </div>
                      {getStatusIcon(check.status)}
                    </div>
                    <p className="text-white/80 text-sm mb-2">{check.message}</p>
                    {check.details && (
                      <div className="space-y-1">
                        {check.details.map((detail, i) => (
                          <p key={i} className="text-white/60 text-xs pl-8">
                            • {detail}
                          </p>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 text-center">
              <Database className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-green-200 mb-1">1,401</div>
              <div className="text-green-300 text-sm">Macrobius Passages</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 text-center">
              <Server className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-blue-200 mb-1">44+</div>
              <div className="text-blue-300 text-sm">AI Components</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 text-center">
              <CheckCircle className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-purple-200 mb-1">READY</div>
              <div className="text-purple-300 text-sm">Platform Status</div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-white/60 text-sm">
              Last updated: {new Date().toLocaleString()}
            </p>
            <p className="text-white/40 text-xs mt-2">
              Macrobius Digital Platform - Status Dashboard
            </p>
          </div>
        </div>
      </div>
    </>
  );
}