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

interface VisualizationsSectionProps {
  isActive: boolean;
  t: (key: string) => string;
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

function VisualizationsSection({ isActive, t, language = 'DE' }: VisualizationsSectionProps) {
  const [selectedVisualization, setSelectedVisualization] = useState<string>('themes');
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState<'oracle' | 'local'>('oracle');

  // Sample visualization data (would come from Oracle Cloud in production)
  const visualizations: VisualizationData[] = [
    {
      id: 'themes',
      title: 'Kulturelle Themen-Verteilung',
      description: 'Analyse der 1.401 Macrobius-Passagen nach kulturellen Themen',
      type: 'chart',
      data: {
        labels: ['Philosophie', 'Astronomie', 'Rhetorik', 'Religion', 'Geschichte', 'Literatur', 'Recht', 'Gesellschaft', 'Naturwissenschaft'],
        values: [189, 167, 156, 145, 134, 123, 111, 198, 178]
      },
      insights: [
        'Gesellschaft ist das häufigste Thema (198 Passagen)',
        'Philosophie folgt mit 189 Passagen',
        'Naturwissenschaft zeigt 178 Passagen',
        'Ausgewogene Verteilung über alle Bereiche'
      ]
    },
    {
      id: 'difficulty',
      title: 'Schwierigkeitsgrade-Analyse',
      description: 'Verteilung der Textpassagen nach Lernschwierigkeit',
      type: 'chart',
      data: {
        labels: ['Anfänger', 'Fortgeschritten', 'Experte'],
        values: [567, 623, 211]
      },
      insights: [
        'Fortgeschrittene Texte dominieren (623 Passagen)',
        'Anfänger-freundliche Inhalte: 567 Passagen',
        'Experten-Level: 211 anspruchsvolle Passagen',
        'Gute Balance für alle Lernstufen'
      ]
    },
    {
      id: 'works',
      title: 'Werke-Vergleich',
      description: 'Saturnalia vs. Commentarii - Inhaltliche Analyse',
      type: 'chart',
      data: {
        labels: ['Saturnalia', 'Commentarii in Somnium Scipionis'],
        values: [856, 545]
      },
      insights: [
        'Saturnalia: 856 Passagen (61% des Korpus)',
        'Commentarii: 545 Passagen (39% des Korpus)',
        'Saturnalia zeigen größere thematische Vielfalt',
        'Commentarii fokussieren auf Kosmologie und Philosophie'
      ]
    },
    {
      id: 'timeline',
      title: 'Historische Entwicklung',
      description: 'Macrobius im Kontext der Spätantike',
      type: 'timeline',
      data: {
        events: [
          { year: 380, event: 'Macrobius geboren', type: 'personal' },
          { year: 410, event: 'Plünderung Roms durch Alarich', type: 'historical' },
          { year: 420, event: 'Saturnalia verfasst', type: 'work' },
          { year: 425, event: 'Commentarii in Somnium Scipionis', type: 'work' },
          { year: 430, event: 'Macrobius gestorben', type: 'personal' },
          { year: 476, event: 'Ende des Weströmischen Reiches', type: 'historical' }
        ]
      },
      insights: [
        'Macrobius lebte in der Krisenzeit des Imperiums',
        'Seine Werke entstanden zwischen den Katastrophen',
        'Kulturbewahrung in politisch instabiler Zeit',
        'Brücke zwischen Antike und Mittelalter'
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
                <p className="text-white/60 text-sm capitalize">{event.type}</p>
              </div>
            </motion.div>
          ))}
        </div>
      );
    }
    
    return <div className="text-white/80">Visualization wird geladen...</div>;
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
              Datenvisualisierung
            </h1>
            <TrendingUp className="w-8 h-8 text-cyan-400" />
          </div>
          
          <h2 className="text-2xl md:text-3xl text-blue-200 mb-8">
            Macrobius-Korpus Analytik
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Erkunde 1.401 authentische Macrobius-Passagen durch interaktive Datenvisualisierungen. 
            Entdecke Muster, Trends und kulturelle Zusammenhänge in den Werken des antiken Gelehrten.
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
                Visualisierungen
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
                Datenquelle
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
                  <span className="text-white/90 text-sm">Demo Daten</span>
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
                    {dataSource === 'oracle' ? '1.401 Live-Passagen' : 'Demonstration'}
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
                          <span>Filter</span>
                        </button>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center space-x-2">
                          <Download className="w-4 h-4" />
                          <span>Export</span>
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
                        Wichtige Erkenntnisse
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
            📊 Analytics Platform
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-4">🔍</div>
              <h4 className="font-semibold text-gray-200 mb-2">Echtzeit-Analyse</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                Live-Datenverarbeitung aus Oracle Cloud ermöglicht aktuelle 
                Einblicke in das Macrobius-Korpus
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">📈</div>
              <h4 className="font-semibold text-gray-200 mb-2">Interaktive Dashboards</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                Dynamische Visualisierungen mit Drill-Down-Funktionen 
                für detaillierte Textanalysen
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="font-semibent text-gray-200 mb-2">KI-basierte Insights</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                Machine Learning identifiziert versteckte Muster und 
                kulturelle Zusammenhänge in den antiken Texten
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default VisualizationsSection;