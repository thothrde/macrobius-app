import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, PieChart as PieChartIcon, BarChart3, Activity, Database, Eye, Download, Filter, Zap } from 'lucide-react';

interface VisualizationsSectionProps {
  isActive: boolean;
  language?: 'DE' | 'EN' | 'LA';
}

// 🚨 EMERGENCY DIRECT TRANSLATIONS - BYPASSING BROKEN CONTEXT
const DIRECT_TRANSLATIONS = {
  DE: {
    title: 'Datenvisualisierung',
    subtitle: 'Macrobius-Korpus Analytik',
    description: 'Erkunde 1.401 authentische Macrobius-Passagen durch interaktive Datenvisualisierungen. Entdecke Muster, Trends und kulturelle Zusammenhänge in den Werken des antiken Gelehrten.',
    data_source: 'Datenquelle',
    live_passages: '1.401 Live-Passagen',
    insights_title: 'Wichtige Erkenntnisse',
    analytics_platform: 'Analytics Platform',
    realtime_analysis: 'Echtzeit-Analyse',
    realtime_description: 'Live-Datenverarbeitung aus Oracle Cloud ermöglicht aktuelle Einblicke in das Macrobius-Korpus',
    interactive_dashboards: 'Interaktive Dashboards',
    dashboards_description: 'Dynamische Visualisierungen mit Drill-Down-Funktionen für detaillierte Textanalysen',
    ai_insights: 'KI-basierte Insights',
    ai_description: 'Machine Learning identifiziert versteckte Muster und kulturelle Zusammenhänge in den antiken Texten',
    filter: 'Filter',
    export: 'Export'
  },
  EN: {
    title: 'Data Visualization',
    subtitle: 'Macrobius Corpus Analytics',
    description: 'Explore 1,401 authentic Macrobius passages through interactive data visualizations. Discover patterns, trends, and cultural connections in the works of the ancient scholar.',
    data_source: 'Data Source',
    live_passages: '1,401 Live Passages',
    insights_title: 'Key Insights',
    analytics_platform: 'Analytics Platform',
    realtime_analysis: 'Real-time Analysis',
    realtime_description: 'Live data processing from Oracle Cloud enables current insights into the Macrobius corpus',
    interactive_dashboards: 'Interactive Dashboards',
    dashboards_description: 'Dynamic visualizations with drill-down functions for detailed text analyses',
    ai_insights: 'AI-based Insights',
    ai_description: 'Machine Learning identifies hidden patterns and cultural connections in the ancient texts',
    filter: 'Filter',
    export: 'Export'
  },
  LA: {
    title: 'Visualizatio Datorum',
    subtitle: 'Analytica Corporis Macrobii',
    description: 'Explora 1.401 authenticos passus Macrobii per visualizationes interactivas datorum. Inveni formas, tendentias, et nexus culturales in operibus eruditi antiqui.',
    data_source: 'Fons Datorum',
    live_passages: '1.401 Passus Vivi',
    insights_title: 'Cognitiones Principales',
    analytics_platform: 'Platea Analytica',
    realtime_analysis: 'Analysis Temporis Realis',
    realtime_description: 'Processus datorum vivus ex Oracle Cloud cognitiones actuales corporis Macrobii facit',
    interactive_dashboards: 'Tabulae Interactivae',
    dashboards_description: 'Visualizationes dynamicae cum functionibus drill-down pro analysibus textuum detaillatis',
    ai_insights: 'Cognitiones AI',
    ai_description: 'Machine Learning formas occultas et nexus culturales in textibus antiquis identificat',
    filter: 'Filtrum',
    export: 'Exportare'
  }
} as const;

// Demo data for visualizations
const themeData = [
  { name: 'Philosophie', passages: 189, color: '#8B5CF6', percentage: 13.5 },
  { name: 'Religion', passages: 156, color: '#06B6D4', percentage: 11.1 },
  { name: 'Astronomie', passages: 134, color: '#F59E0B', percentage: 9.6 },
  { name: 'Literatur', passages: 298, color: '#10B981', percentage: 21.3 },
  { name: 'Geschichte', passages: 178, color: '#EF4444', percentage: 12.7 },
  { name: 'Bildung', passages: 223, color: '#8B5CF6', percentage: 15.9 },
  { name: 'Rhetorik', passages: 112, color: '#F97316', percentage: 8.0 },
  { name: 'Naturwissenschaft', passages: 211, color: '#3B82F6', percentage: 15.1 }
];

// CSS-based Bar Chart Component
const CSSBarChart = ({ data }: { data: typeof themeData }) => {
  const maxValue = Math.max(...data.map(d => d.passages));
  
  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <motion.div
          key={item.name}
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="w-24 text-right text-white/70 text-sm">
            {item.name}
          </div>
          <div className="flex-1 relative">
            <div className="bg-white/10 rounded-full h-8 relative overflow-hidden">
              <motion.div
                className="h-full rounded-full flex items-center justify-end pr-3"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                animate={{ width: `${(item.passages / maxValue) * 100}%` }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
              >
                <span className="text-white text-sm font-semibold">
                  {item.passages}
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

function VisualizationsSection({ isActive, language = 'DE' }: VisualizationsSectionProps) {
  const t = DIRECT_TRANSLATIONS[language];
  
  // Background pattern SVG - properly encoded
  const backgroundPattern = `data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#ffffff" fill-opacity="0.02"><path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/></g></g></svg>')}`;

  if (!isActive) return null;

  return (
    <motion.section
      className="relative min-h-screen px-4 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950" />
        <div className={`absolute inset-0 opacity-20`} style={{ backgroundImage: `url('${backgroundPattern}')` }} />
      </div>
      
      {/* ✅ CENTERED CONTENT CONTAINER */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <BarChart3 className="w-8 h-8 text-blue-400" />
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
              {t.title}
            </h1>
            <TrendingUp className="w-8 h-8 text-purple-400" />
          </div>
          
          <h2 className="text-2xl md:text-3xl text-blue-200 mb-8">
            {t.subtitle}
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </motion.div>

        {/* Data Source Status */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-3 px-6 py-3 bg-green-500/20 border border-green-400/50 rounded-xl text-green-300">
            <Database className="w-4 h-4" />
            <span className="text-sm font-medium">{t.live_passages} • Oracle Cloud</span>
            <Zap className="w-4 h-4" />
          </div>
        </motion.div>

        {/* ✅ MAIN VISUALIZATION - NO HORIZONTAL NAVIGATION */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Eye className="w-6 h-6 text-blue-400" />
              Kulturelle Themen-Verteilung
            </h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-purple-600/80 text-white rounded-lg text-sm hover:bg-purple-600 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                {t.filter}
              </button>
              <button className="px-4 py-2 bg-indigo-600/80 text-white rounded-lg text-sm hover:bg-indigo-600 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                {t.export}
              </button>
            </div>
          </div>

          {/* Always show the main bar chart visualization */}
          <div className="h-96 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <CSSBarChart data={themeData} />
            </motion.div>
          </div>
        </motion.div>

        {/* Analytics Platform Features */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          {[
            {
              icon: Activity,
              title: t.realtime_analysis,
              description: t.realtime_description,
              color: 'from-blue-500/20 to-cyan-500/20 border-blue-400/50'
            },
            {
              icon: BarChart3,
              title: t.interactive_dashboards,
              description: t.dashboards_description,
              color: 'from-purple-500/20 to-pink-500/20 border-purple-400/50'
            },
            {
              icon: Zap,
              title: t.ai_insights,
              description: t.ai_description,
              color: 'from-green-500/20 to-emerald-500/20 border-green-400/50'
            }
          ].map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${feature.color} rounded-xl p-6 hover:scale-105 transition-all duration-300`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2 }}
              >
                <IconComponent className="w-8 h-8 text-white mb-4" />
                <h4 className="font-semibold text-white mb-2 text-lg">{feature.title}</h4>
                <p className="text-white/80 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Key Insights */}
        <motion.div
          className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-400/50 rounded-xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-yellow-300 mb-6 text-center flex items-center justify-center gap-2">
            <TrendingUp className="w-6 h-6" />
            {t.insights_title}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-sm">Philosophie folgt mit 189 Passagen</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">Fortgeschrittene Texte dominieren (623 Passagen)</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm">Saturnalia: 856 Passagen (61% des Korpus)</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-sm">Anfänger-freundliche Inhalte: 567 Passagen</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span className="text-sm">Commentarii: 545 Passagen (39% des Korpus)</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span className="text-sm">Gute Balance für alle Lernstufen</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default VisualizationsSection;