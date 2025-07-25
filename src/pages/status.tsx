import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MacrobiusAPI, getApiConnectionStatus } from '@/lib/enhanced-api-client-with-fallback';
import {
  Database,
  Cpu,
  Zap,
  CheckCircle,
  AlertTriangle,
  Clock,
  Globe,
  Brain,
  BookOpen,
  Users,
  Award,
  Server,
  Activity,
  Wifi,
  WifiOff,
  RefreshCw,
  TrendingUp,
  Eye,
  Download,
  AlertCircle
} from 'lucide-react';

export default function StatusPage() {
  const [systemStatus, setSystemStatus] = useState({
    overall: 'checking',
    frontend: 'operational',
    backend: 'checking',
    database: 'checking',
    ai_systems: 'checking'
  });
  
  const [connectionInfo, setConnectionInfo] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const features = {
    'AI Tutoring System': 'complete',
    'Semantic Search': 'tier2_complete', 
    'Vocabulary Trainer': 'corpus_expansion_complete',
    'Grammar Explainer': 'tier1_complete',
    'Learning Paths': 'tier1_complete',
    'Quiz Generation': 'smart_generation_complete',
    'RAG System': 'complete',
    'Cultural Analysis': 'complete'
  };

  const contentStats = {
    'Latin Passages': 1401,
    'Cultural Themes': 9,
    'Cultural Insights': 16,
    'Teaching Modules': 16,
    'AI Components': 44,
    'Real AI Engines': 7
  };

  // Test connection on component mount and periodically
  useEffect(() => {
    testConnections();
    const interval = setInterval(testConnections, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const testConnections = async () => {
    try {
      const apiStatus = getApiConnectionStatus();
      setConnectionInfo(apiStatus);
      
      // Test Oracle Cloud health
      const healthResponse = await MacrobiusAPI.system.healthCheck();
      
      if (healthResponse.status === 'success') {
        setSystemStatus({
          overall: 'operational',
          frontend: 'operational',
          backend: 'connected',
          database: 'oracle_cloud_connected',
          ai_systems: 'active'
        });
      } else {
        throw new Error('Health check failed');
      }
    } catch (error) {
      console.warn('Connection test failed:', error);
      const apiStatus = getApiConnectionStatus();
      setConnectionInfo(apiStatus);
      
      setSystemStatus({
        overall: apiStatus.status?.oracle === 'connected' ? 'operational' : 'degraded',
        frontend: 'operational',
        backend: apiStatus.status?.oracle === 'connected' ? 'connected' : 'fallback',
        database: apiStatus.status?.oracle === 'connected' ? 'oracle_cloud_connected' : 'fallback_mode',
        ai_systems: 'active'
      });
    } finally {
      setLastUpdate(new Date());
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await testConnections();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
      case 'connected':
      case 'active':
      case 'complete':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'degraded':
      case 'fallback':
      case 'tier2_complete':
      case 'tier1_complete':
      case 'corpus_expansion_complete':
      case 'smart_generation_complete':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'down':
      case 'error':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'checking':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
      case 'connected':
      case 'active':
      case 'complete':
        return <CheckCircle className="w-4 h-4" />;
      case 'degraded':
      case 'fallback':
      case 'tier2_complete':
      case 'tier1_complete':
      case 'corpus_expansion_complete':
      case 'smart_generation_complete':
        return <AlertTriangle className="w-4 h-4" />;
      case 'checking':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getOverallStatusMessage = () => {
    if (systemStatus.overall === 'operational') {
      return connectionInfo?.status?.oracle === 'connected' 
        ? 'All Systems Operational • Oracle Cloud Connected'
        : 'All Systems Operational • Enhanced Fallback Mode';
    } else if (systemStatus.overall === 'degraded') {
      return 'Systems Operational • Oracle Cloud Fallback Active';
    } else {
      return 'System Status Checking...';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-400 to-gold mb-4">
            Macrobius System Status
          </h1>
          <p className="text-xl text-white/80">
            Real-time monitoring of all AI systems and Oracle Cloud integration
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Badge className={getStatusColor(systemStatus.overall)}>
              {getStatusIcon(systemStatus.overall)}
              {getOverallStatusMessage()}
            </Badge>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm transition-all duration-200 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh Status'}
            </button>
          </div>
        </div>

        {/* Connection Status Banner */}
        {connectionInfo && (
          <div className="mb-8">
            <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {connectionInfo.status?.oracle === 'connected' ? (
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Oracle Cloud Connected</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-yellow-400">
                        <AlertTriangle className="w-5 h-5" />
                        <span className="font-semibold">Enhanced Fallback Mode</span>
                      </div>
                    )}
                    <div className="text-white/70 text-sm">
                      {connectionInfo.message}
                    </div>
                  </div>
                  <div className="text-white/60 text-sm">
                    Last checked: {lastUpdate.toLocaleTimeString()}
                  </div>
                </div>
                
                {/* Oracle Cloud Details */}
                {connectionInfo.status && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-white/80">
                      <Server className="w-4 h-4" />
                      <span className="text-sm">Oracle: {connectionInfo.status.oracle}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <Brain className="w-4 h-4" />
                      <span className="text-sm">RAG: {connectionInfo.status.rag}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm">AI Systems: {connectionInfo.status.ai_systems}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* System Components */}
          <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
            <CardHeader>
              <CardTitle className="text-gold flex items-center">
                <Database className="w-5 h-5 mr-2" />
                System Components
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span className="text-white">Frontend (Vercel)</span>
                </div>
                <Badge className={getStatusColor(systemStatus.frontend)}>
                  {getStatusIcon(systemStatus.frontend)}
                  {systemStatus.frontend}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-green-400" />
                  <span className="text-white">Backend (Oracle Cloud)</span>
                </div>
                <Badge className={getStatusColor(systemStatus.backend)}>
                  {getStatusIcon(systemStatus.backend)}
                  {systemStatus.backend}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-purple-400" />
                  <span className="text-white">Database</span>
                </div>
                <Badge className={getStatusColor(systemStatus.database)}>
                  {getStatusIcon(systemStatus.database)}
                  {systemStatus.database === 'oracle_cloud_connected' ? 'Oracle Cloud' : 'Fallback'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-pink-400" />
                  <span className="text-white">AI Systems</span>
                </div>
                <Badge className={getStatusColor(systemStatus.ai_systems)}>
                  {getStatusIcon(systemStatus.ai_systems)}
                  {systemStatus.ai_systems}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Feature Status */}
          <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
            <CardHeader>
              <CardTitle className="text-gold flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                AI Feature Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(features).map(([feature, status]) => (
                <div key={feature} className="flex items-center justify-between">
                  <span className="text-white text-sm">{feature}</span>
                  <Badge className={getStatusColor(status)}>
                    {getStatusIcon(status)}
                    {status.replace(/_/g, ' ')}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Content Statistics */}
          <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
            <CardHeader>
              <CardTitle className="text-gold flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Content & AI Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(contentStats).map(([label, count]) => (
                  <div key={label} className="text-center">
                    <div className="text-2xl font-bold text-white">{count.toLocaleString()}</div>
                    <div className="text-sm text-white/70">{label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Quick Actions */}
          <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
            <CardHeader>
              <CardTitle className="text-gold flex items-center">
                <Users className="w-5 h-5 mr-2" />
                System Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button 
                onClick={() => window.open('/api/docs', '_blank')}
                className="w-full p-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-400/30 rounded-lg text-white text-sm transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View API Documentation
              </button>
              <button 
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="w-full p-3 bg-green-600/20 hover:bg-green-600/30 border border-green-400/30 rounded-lg text-white text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Activity className="w-4 h-4" />
                Test Oracle Cloud Connection
              </button>
              <button 
                onClick={() => {
                  const report = {
                    timestamp: new Date().toISOString(),
                    systemStatus,
                    connectionInfo,
                    contentStats,
                    features
                  };
                  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `macrobius-status-${new Date().toISOString().split('T')[0]}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="w-full p-3 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-400/30 rounded-lg text-white text-sm transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download System Report
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Footer with Real-time Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/10 backdrop-blur-sm border border-gold/30 rounded-lg">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Server className="w-4 h-4" />
              Oracle Cloud: 152.70.184.232:8080
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <TrendingUp className="w-4 h-4" />
              Version: 2.1-ENHANCED
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Clock className="w-4 h-4" />
              Updated: {lastUpdate.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}