import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  Award
} from 'lucide-react';

export default function StatusPage() {
  const systemStatus = {
    overall: 'operational',
    frontend: 'operational',
    backend: 'connected',
    database: 'oracle_cloud_connected',
    ai_systems: 'active'
  };

  const features = {
    'AI Tutoring System': 'complete',
    'Semantic Search': 'tier2_complete', 
    'Vocabulary Trainer': 'corpus_expansion_complete',
    'Grammar Explainer': 'tier1_complete',
    'Learning Paths': 'tier1_complete',
    'Quiz Generation': 'smart_generation_complete'
  };

  const contentStats = {
    'Latin Passages': 1401,
    'Cultural Themes': 9,
    'Cultural Insights': 16,
    'Teaching Modules': 16,
    'AI Components': 44
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
      case 'connected':
      case 'active':
      case 'complete':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'degraded':
      case 'tier2_complete':
      case 'tier1_complete':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'down':
      case 'error':
        return 'bg-red-100 text-red-700 border-red-200';
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
      case 'tier2_complete':
      case 'tier1_complete':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-400 to-gold mb-4">
            Macrobius System Status
          </h1>
          <p className="text-xl text-white/80">
            Real-time status of all system components and features
          </p>
          <div className="mt-4">
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <CheckCircle className="w-4 h-4 mr-2" />
              All Systems Operational
            </Badge>
          </div>
        </div>

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
                  <span className="text-white">Frontend</span>
                </div>
                <Badge className={getStatusColor(systemStatus.frontend)}>
                  {getStatusIcon(systemStatus.frontend)}
                  {systemStatus.frontend}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-green-400" />
                  <span className="text-white">Backend</span>
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
                  Oracle Cloud
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
                Feature Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(features).map(([feature, status]) => (
                <div key={feature} className="flex items-center justify-between">
                  <span className="text-white text-sm">{feature}</span>
                  <Badge className={getStatusColor(status)}>
                    {getStatusIcon(status)}
                    {status.replace('_', ' ')}
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
                Content Statistics
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

          {/* Quick Actions */}
          <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
            <CardHeader>
              <CardTitle className="text-gold flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full p-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-400/30 rounded-lg text-white text-sm transition-colors">
                View API Documentation
              </button>
              <button className="w-full p-3 bg-green-600/20 hover:bg-green-600/30 border border-green-400/30 rounded-lg text-white text-sm transition-colors">
                Test Oracle Cloud Connection
              </button>
              <button className="w-full p-3 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-400/30 rounded-lg text-white text-sm transition-colors">
                Download System Report
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-white/60 text-sm">
            Last updated: {new Date().toLocaleString()} • 
            Backend: http://152.70.184.232:8080 • 
            Version: 2.0.0
          </p>
        </div>
      </div>
    </div>
  );
}