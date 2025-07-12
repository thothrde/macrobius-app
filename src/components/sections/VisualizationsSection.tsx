import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Map, 
  Network, 
  Clock,
  Database,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface VisualizationsSectionProps {
  isActive: boolean;
  t?: (key: string) => string;
  language?: 'DE' | 'EN' | 'LA';
}

interface VisualizationData {
  id: string;
  title: string;
  description: string;
  type: 'chart' | 'network' | 'timeline' | 'heatmap';
  data: any;
  insights: string[];
}

function VisualizationsSection({ isActive, t: externalT, language = 'DE' }: VisualizationsSectionProps) {
  const { t: contextT } = useLanguage();
  const t = externalT || contextT;
  
  const [selectedVisualization, setSelectedVisualization] = useState<string>('themes');
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState<'oracle' | 'local'>('oracle');

  // Sample visualization data (would come from Oracle Cloud in production)
  const visualizations: VisualizationData[] = [
    {
      id: 'themes',
      title: t('visualizations.themes_title'),
      description: t('visualizations.themes_description'),
      type: 'chart',
      data: {
        labels: [t('themes.philosophy'), t('themes.astronomy'), t('visualizations.rhetoric'), t('themes.religion'), t('themes.history'), t('themes.literature'), t('themes.law'), t('themes.social_customs'), t('visualizations.natural_science')],
        values: [189, 167, 156, 145, 134, 123, 111, 198, 178]
      },
      insights: [
        t('visualizations.insight_society'),
        t('visualizations.insight_philosophy'),
        t('visualizations.insight_science'),
        t('visualizations.insight_balanced')
      ]
    },
    {
      id: 'difficulty',
      title: t('visualizations.difficulty_title'),
      description: t('visualizations.difficulty_description'),
      type: 'chart',
      data: {
        labels: [t('visualizations.beginner'), t('visualizations.advanced'), t('visualizations.expert')],
        values: [567, 623, 211]
      },
      insights: [
        t('visualizations.insight_advanced'),
        t('visualizations.insight_beginner'),
        t('visualizations.insight_expert'),
        t('visualizations.insight_balance')
      ]
    },
    {
      id: 'works',
      title: t('visualizations.works_title'),
      description: t('visualizations.works_description'),
      type: 'chart',
      data: {
        labels: ['Saturnalia', 'Commentarii in Somnium Scipionis'],
        values: [856, 545]
      },
      insights: [
        t('visualizations.insight_saturnalia_count'),
        t('visualizations.insight_commentarii_count'),
        t('visualizations.insight_saturnalia_variety'),
        t('visualizations.insight_commentarii_focus')
      ]
    },
    {
      id: 'timeline',
      title: t('visualizations.timeline_title'),
      description: t('visualizations.timeline_description'),
      type: 'timeline',
      data: {
        events: [
          { year: 380, event: t('visualizations.event_birth'), type: 'personal' },
          { year: 410, event: t('visualizations.event_alaric'), type: 'historical' },
          { year: 420, event: t('visualizations.event_saturnalia'), type: 'work' },
          { year: 425, event: t('visualizations.event_commentarii'), type: 'work' },
          { year: 430, event: t('visualizations.event_death'), type: 'personal' },
          { year: 476, event: t('visualizations.event_empire_end'), type: 'historical' }
        ]
      },
      insights: [
        t('visualizations.insight_crisis_time'),
        t('visualizations.insight_between_catastrophes'),
        t('visualizations.insight_cultural_preservation'),
        t('visualizations.insight_bridge')
      ]
    }
  ];

  const renderVisualization = (viz: VisualizationData) => {
    if (viz.type === 'chart') {
      return (
        <div className="space-y-6">
          {/* Bar Chart Simulation */}
          <div className="space-y-3">
            {viz.data.labels.map((label: string, index: number) => {
              const value = viz.data.values[index];
              const maxValue = Math.max(...viz.data.values);
              const percentage = (value / maxValue) * 100;
              
              return (
                <motion.div
                  key={label}
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-white/90 text-sm font-medium">{label}</span>
                    <span className="text-yellow-400 text-sm font-bold">{value}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      );
    }
    
    if (viz.type === 'timeline') {
      return (
        <div className="space-y-4">
          {viz.data.events.map((event: any, index: number) => (
            <motion.div
              key={index}
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                event.type === 'personal' ? 'bg-green-500' :
                event.type === 'work' ? 'bg-blue-500' : 'bg-red-500'
              }`}>
                {event.year}
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold">{event.event}</h4>
                <p className="text-white/60 text-sm capitalize">{t(`visualizations.type_${event.type}`)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      );
    }
    
    return <div className="text-white/80">{t('visualizations.loading')}</div>;
  };

  if (!isActive) return null;

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center px-4 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <BarChart3 className="w-8 h-8 text-blue-400" />
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200">
              {t('visualizations.title')}
            </h1>
            <TrendingUp className="w-8 h-8 text-cyan-400" />
          </div>
          
          <h2 className="text-2xl md:text-3xl text-blue-200 mb-8">
            {t('visualizations.subtitle')}
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            {t('visualizations.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Visualization Selector */}
          <div className="lg:col-span-1 space-y-4">
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-bold text-blue-200 mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                {t('visualizations.selector_title')}
              </h3>
              <div className="space-y-3">
                {visualizations.map((viz) => (
                  <button
                    key={viz.id}
                    onClick={() => setSelectedVisualization(viz.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedVisualization === viz.id
                        ? 'bg-blue-500/20 border border-blue-400/50 text-blue-200'
                        : 'bg-white/5 border border-white/10 text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <h4 className="font-semibold text-sm mb-1">{viz.title}</h4>
                    <p className="text-xs opacity-80 leading-relaxed">{viz.description}</p>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Data Source */}
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h4 className="font-semibold text-blue-200 mb-3 flex items-center gap-2">
                <Database className="w-4 h-4" />
                {t('visualizations.data_source')}
              </h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="datasource"
                    value="oracle"
                    checked={dataSource === 'oracle'}
                    onChange={(e) => setDataSource(e.target.value as 'oracle' | 'local')}
                    className="text-blue-500"
                  />
                  <span className="text-white/90 text-sm">Oracle Cloud</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="datasource"
                    value="local"
                    checked={dataSource === 'local'}
                    onChange={(e) => setDataSource(e.target.value as 'oracle' | 'local')}
                    className="text-blue-500"
                  />
                  <span className="text-white/90 text-sm">{t('visualizations.demo_data')}</span>
                </label>
              </div>
              
              <div className="mt-3 pt-3 border-t border-white/20">
                <div className={`flex items-center space-x-2 text-xs ${
                  dataSource === 'oracle' ? 'text-green-300' : 'text-yellow-300'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    dataSource === 'oracle' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
                  }`} />
                  <span>
                    {dataSource === 'oracle' ? t('visualizations.live_passages') : t('visualizations.demonstration')}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Visualization */}
          <div className="lg:col-span-3">
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {(() => {
                const currentViz = visualizations.find(v => v.id === selectedVisualization);
                if (!currentViz) return null;
                
                return (
                  <div className="space-y-8">
                    {/* Visualization Header */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-blue-200 mb-2">
                          {currentViz.title}
                        </h3>
                        <p className="text-white/80">{currentViz.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-white/10 text-white/80 rounded-lg hover:bg-white/20 transition-all flex items-center space-x-2">
                          <Filter className="w-4 h-4" />
                          <span>{t('visualizations.filter')}</span>
                        </button>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center space-x-2">
                          <Download className="w-4 h-4" />
                          <span>{t('visualizations.export')}</span>
                        </button>
                      </div>
                    </div>

                    {/* Visualization Content */}
                    <div className="min-h-[400px]">
                      {renderVisualization(currentViz)}
                    </div>

                    {/* Insights */}
                    <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-blue-300 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        {t('visualizations.insights_title')}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentViz.insights.map((insight, index) => (
                          <motion.div
                            key={index}
                            className="flex items-start space-x-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                          >
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                              {index + 1}
                            </div>
                            <p className="text-blue-200 text-sm leading-relaxed">{insight}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        </div>

        {/* Technical Info */}
        <motion.div
          className="mt-16 bg-gradient-to-br from-gray-900/20 to-gray-950/20 rounded-xl border border-gray-500/20 p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <h3 className="text-2xl font-bold text-gray-200 mb-6 text-center">
            📊 {t('visualizations.analytics_platform')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-4">🔍</div>
              <h4 className="font-semibold text-gray-200 mb-2">{t('visualizations.realtime_analysis')}</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                {t('visualizations.realtime_description')}
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">📈</div>
              <h4 className="font-semibold text-gray-200 mb-2">{t('visualizations.interactive_dashboards')}</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                {t('visualizations.dashboards_description')}
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="font-semibold text-gray-200 mb-2">{t('visualizations.ai_insights')}</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                {t('visualizations.ai_description')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default VisualizationsSection;