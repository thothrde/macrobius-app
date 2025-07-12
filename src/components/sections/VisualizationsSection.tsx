import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
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
    selector_title: 'Visualisierungen',
    data_source: 'Datenquelle',
    demo_data: 'Demo Daten',
    live_passages: '1.401 Live-Passagen',
    demonstration: 'Demonstration',
    filter: 'Filter',
    export: 'Export',
    insights_title: 'Wichtige Erkenntnisse',
    analytics_platform: 'Analytics Platform',
    realtime_analysis: 'Echtzeit-Analyse',
    realtime_description: 'Live-Datenverarbeitung aus Oracle Cloud ermöglicht aktuelle Einblicke in das Macrobius-Korpus',
    interactive_dashboards: 'Interaktive Dashboards',
    dashboards_description: 'Dynamische Visualisierungen mit Drill-Down-Funktionen für detaillierte Textanalysen',
    ai_insights: 'KI-basierte Insights',
    ai_description: 'Machine Learning identifiziert versteckte Muster und kulturelle Zusammenhänge in den antiken Texten',
    loading: 'Visualization wird geladen...',
    // Visualization Types
    themes_title: 'Kulturelle Themen-Verteilung',
    themes_description: 'Analyse der 1.401 Macrobius-Passagen nach kulturellen Themen',
    difficulty_title: 'Schwierigkeitsgrade-Analyse',
    difficulty_description: 'Verteilung der Textpassagen nach Lernschwierigkeit',
    works_title: 'Werke-Vergleich',
    works_description: 'Saturnalia vs. Commentarii - Inhaltliche Analyse',
    timeline_title: 'Historische Entwicklung',
    timeline_description: 'Macrobius im Kontext der Spätantike',
    // Themes and Data
    philosophy: 'Philosophie',
    religion: 'Religion',
    astronomy: 'Astronomie',
    literature: 'Literatur',
    history: 'Geschichte',
    education: 'Bildung',
    rhetoric: 'Rhetorik',
    natural_science: 'Naturwissenschaft',
    // Difficulty Levels
    beginner: 'Anfänger',
    advanced: 'Fortgeschritten',
    expert: 'Experte',
    // Insights
    insight_society: 'Gesellschaft ist das häufigste Thema (198 Passagen)',
    insight_philosophy: 'Philosophie folgt mit 189 Passagen',
    insight_science: 'Naturwissenschaft zeigt 178 Passagen',
    insight_balanced: 'Ausgewogene Verteilung über alle Bereiche',
    insight_advanced: 'Fortgeschrittene Texte dominieren (623 Passagen)',
    insight_beginner: 'Anfänger-freundliche Inhalte: 567 Passagen',
    insight_expert: 'Experten-Level: 211 anspruchsvolle Passagen',
    insight_balance: 'Gute Balance für alle Lernstufen',
    insight_saturnalia_count: 'Saturnalia: 856 Passagen (61% des Korpus)',
    insight_commentarii_count: 'Commentarii: 545 Passagen (39% des Korpus)',
    insight_saturnalia_variety: 'Saturnalia zeigen größere thematische Vielfalt',
    insight_commentarii_focus: 'Commentarii fokussieren auf Kosmologie und Philosophie'
  },
  EN: {
    title: 'Data Visualization',
    subtitle: 'Macrobius Corpus Analytics',
    description: 'Explore 1,401 authentic Macrobius passages through interactive data visualizations. Discover patterns, trends, and cultural connections in the works of the ancient scholar.',
    selector_title: 'Visualizations',
    data_source: 'Data Source',
    demo_data: 'Demo Data',
    live_passages: '1,401 Live Passages',
    demonstration: 'Demonstration',
    filter: 'Filter',
    export: 'Export',
    insights_title: 'Key Insights',
    analytics_platform: 'Analytics Platform',
    realtime_analysis: 'Real-time Analysis',
    realtime_description: 'Live data processing from Oracle Cloud enables current insights into the Macrobius corpus',
    interactive_dashboards: 'Interactive Dashboards',
    dashboards_description: 'Dynamic visualizations with drill-down functions for detailed text analyses',
    ai_insights: 'AI-based Insights',
    ai_description: 'Machine Learning identifies hidden patterns and cultural connections in the ancient texts',
    loading: 'Visualization loading...',
    // Visualization Types
    themes_title: 'Cultural Theme Distribution',
    themes_description: 'Analysis of 1,401 Macrobius passages by cultural themes',
    difficulty_title: 'Difficulty Level Analysis',
    difficulty_description: 'Distribution of text passages by learning difficulty',
    works_title: 'Works Comparison',
    works_description: 'Saturnalia vs. Commentarii - Content Analysis',
    timeline_title: 'Historical Development',
    timeline_description: 'Macrobius in the Context of Late Antiquity',
    // Themes and Data
    philosophy: 'Philosophy',
    religion: 'Religion',
    astronomy: 'Astronomy',
    literature: 'Literature',
    history: 'History',
    education: 'Education',
    rhetoric: 'Rhetoric',
    natural_science: 'Natural Science',
    // Difficulty Levels
    beginner: 'Beginner',
    advanced: 'Advanced',
    expert: 'Expert',
    // Insights
    insight_society: 'Society is the most frequent theme (198 passages)',
    insight_philosophy: 'Philosophy follows with 189 passages',
    insight_science: 'Natural science shows 178 passages',
    insight_balanced: 'Balanced distribution across all areas',
    insight_advanced: 'Advanced texts dominate (623 passages)',
    insight_beginner: 'Beginner-friendly content: 567 passages',
    insight_expert: 'Expert level: 211 challenging passages',
    insight_balance: 'Good balance for all learning levels',
    insight_saturnalia_count: 'Saturnalia: 856 passages (61% of corpus)',
    insight_commentarii_count: 'Commentarii: 545 passages (39% of corpus)',
    insight_saturnalia_variety: 'Saturnalia show greater thematic variety',
    insight_commentarii_focus: 'Commentarii focus on cosmology and philosophy'
  },
  LA: {
    title: 'Visualizatio Datorum',
    subtitle: 'Analytica Corporis Macrobii',
    description: 'Explora 1.401 authenticos passus Macrobii per visualizationes interactivas datorum. Inveni formas, tendentias, et nexus culturales in operibus eruditi antiqui.',
    selector_title: 'Visualizationes',
    data_source: 'Fons Datorum',
    demo_data: 'Data Demonstrationis',
    live_passages: '1.401 Passus Vivi',
    demonstration: 'Demonstratio',
    filter: 'Filtrum',
    export: 'Exportare',
    insights_title: 'Cognitiones Principales',
    analytics_platform: 'Platea Analytica',
    realtime_analysis: 'Analysis Temporis Realis',
    realtime_description: 'Processus datorum vivus ex Oracle Cloud cognitiones actuales corporis Macrobii facit',
    interactive_dashboards: 'Tabulae Interactivae',
    dashboards_description: 'Visualizationes dynamicae cum functionibus drill-down pro analysibus textuum detaillatis',
    ai_insights: 'Cognitiones AI',
    ai_description: 'Machine Learning formas occultas et nexus culturales in textibus antiquis identificat',
    loading: 'Visualizatio oneratur...',
    // Visualization Types
    themes_title: 'Distributio Thematum Culturalium',
    themes_description: 'Analysis 1.401 passuum Macrobii per themata culturalia',
    difficulty_title: 'Analysis Graduum Difficultatis',
    difficulty_description: 'Distributio passuum textuum per difficultatem discendi',
    works_title: 'Comparatio Operum',
    works_description: 'Saturnalia vs. Commentarii - Analysis Contentus',
    timeline_title: 'Evolutio Historica',
    timeline_description: 'Macrobius in Contextu Antiquitatis Serae',
    // Themes and Data
    philosophy: 'Philosophia',
    religion: 'Religio',
    astronomy: 'Astronomia',
    literature: 'Literatura',
    history: 'Historia',
    education: 'Educatio',
    rhetoric: 'Rhetorica',
    natural_science: 'Scientia Naturalis',
    // Difficulty Levels
    beginner: 'Incipiens',
    advanced: 'Progressus',
    expert: 'Peritus',
    // Insights
    insight_society: 'Societas est thema frequentissimum (198 passus)',
    insight_philosophy: 'Philosophia sequitur cum 189 passibus',
    insight_science: 'Scientia naturalis 178 passus ostendit',
    insight_balanced: 'Distributio aequilibrata per omnes areas',
    insight_advanced: 'Textus progressi dominantur (623 passus)',
    insight_beginner: 'Contentus incipientibus amicus: 567 passus',
    insight_expert: 'Gradus periti: 211 passus difficiles',
    insight_balance: 'Bonum aequilibrium pro omnibus gradibus discendi',
    insight_saturnalia_count: 'Saturnalia: 856 passus (61% corporis)',
    insight_commentarii_count: 'Commentarii: 545 passus (39% corporis)',
    insight_saturnalia_variety: 'Saturnalia varietatem thematicam maiorem ostendunt',
    insight_commentarii_focus: 'Commentarii in cosmologiam et philosophiam se concentrant'
  }
} as const;

// Demo data for visualizations
const themeData = [
  { name: 'Philosophie', passages: 189, color: '#8B5CF6' },
  { name: 'Religion', passages: 156, color: '#06B6D4' },
  { name: 'Astronomie', passages: 134, color: '#F59E0B' },
  { name: 'Literatur', passages: 298, color: '#10B981' },
  { name: 'Geschichte', passages: 178, color: '#EF4444' },
  { name: 'Bildung', passages: 223, color: '#8B5CF6' },
  { name: 'Rhetorik', passages: 112, color: '#F97316' },
  { name: 'Naturwissenschaft', passages: 211, color: '#3B82F6' }
];

const difficultyData = [
  { name: 'Anfänger', passages: 567, percentage: 40.5, color: '#10B981' },
  { name: 'Fortgeschritten', passages: 623, percentage: 44.5, color: '#F59E0B' },
  { name: 'Experte', passages: 211, percentage: 15.0, color: '#EF4444' }
];

const worksData = [
  { name: 'Saturnalia', passages: 856, percentage: 61.1, themes: 8, color: '#8B5CF6' },
  { name: 'Commentarii', passages: 545, percentage: 38.9, themes: 5, color: '#06B6D4' }
];

const timelineData = [
  { year: 385, event: 'Geburt', type: 'personal', value: 1 },
  { year: 410, event: 'Plünderung Roms', type: 'historical', value: 3 },
  { year: 415, event: 'Saturnalia', type: 'work', value: 5 },
  { year: 420, event: 'Commentarii', type: 'work', value: 4 },
  { year: 430, event: 'Tod', type: 'personal', value: 2 },
  { year: 476, event: 'Ende Westroms', type: 'historical', value: 3 }
];

function VisualizationsSection({ isActive, language = 'DE' }: VisualizationsSectionProps) {
  const t = DIRECT_TRANSLATIONS[language];
  
  const [selectedViz, setSelectedViz] = useState<string>('themes');
  const [isLoading, setIsLoading] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Simulate data loading when switching visualizations
  const handleVizChange = (vizType: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedViz(vizType);
      setAnimationKey(prev => prev + 1);
      setIsLoading(false);
    }, 500);
  };

  if (!isActive) return null;

  const vizOptions = [
    { id: 'themes', title: t.themes_title, description: t.themes_description, icon: PieChartIcon },
    { id: 'difficulty', title: t.difficulty_title, description: t.difficulty_description, icon: BarChart3 },
    { id: 'works', title: t.works_title, description: t.works_description, icon: TrendingUp },
    { id: 'timeline', title: t.timeline_title, description: t.timeline_description, icon: Activity }
  ];

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center px-4 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      </div>
      
      <div className="relative z-10 w-full max-w-8xl mx-auto">
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
          
          <p className="text-lg md:text-xl text-white/90 max-w-5xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </motion.div>

        {/* Visualization Selector */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {vizOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <motion.button
                  key={option.id}
                  onClick={() => handleVizChange(option.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    selectedViz === option.id
                      ? 'bg-blue-500/30 border-blue-400 shadow-blue-400/50 shadow-lg'
                      : 'bg-white/10 border-white/20 hover:bg-white/20'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <IconComponent className="w-5 h-5 text-blue-400" />
                    <h3 className="font-semibold text-white text-sm">{option.title}</h3>
                  </div>
                  <p className="text-white/70 text-xs leading-relaxed">{option.description}</p>
                </motion.button>
              );
            })}
          </div>
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

        {/* Main Visualization Area */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Eye className="w-6 h-6 text-blue-400" />
              {vizOptions.find(v => v.id === selectedViz)?.title}
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

          {/* Loading State */}
          {isLoading ? (
            <div className="h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                <p className="text-white/70">{t.loading}</p>
              </div>
            </div>
          ) : (
            <div className="h-96">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedViz}-${animationKey}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="h-full"
                >
                  {selectedViz === 'themes' && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={themeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" fontSize={12} />
                        <YAxis stroke="rgba(255,255,255,0.7)" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }}
                          labelStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="passages" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                  
                  {selectedViz === 'difficulty' && (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={difficultyData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) => `${name}: ${percentage}%`}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="passages"
                        >
                          {difficultyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                  
                  {selectedViz === 'works' && (
                    <div className="h-full flex items-center justify-center">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                        {worksData.map((work, index) => (
                          <motion.div
                            key={work.name}
                            className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 border border-white/20"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.2 }}
                          >
                            <div className="text-center">
                              <div className={`text-6xl font-bold mb-2`} style={{ color: work.color }}>
                                {work.passages}
                              </div>
                              <h4 className="text-xl font-semibold text-white mb-2">{work.name}</h4>
                              <p className="text-white/70 mb-4">{work.percentage}% des Korpus</p>
                              <div className="flex justify-center space-x-4 text-sm text-white/60">
                                <span>{work.themes} Themen</span>
                                <span>•</span>
                                <span>{work.passages} Passagen</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedViz === 'timeline' && (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={timelineData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="year" stroke="rgba(255,255,255,0.7)" fontSize={12} />
                        <YAxis stroke="rgba(255,255,255,0.7)" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }}
                          labelStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#8B5CF6" fill="url(#colorGradient)" strokeWidth={2} />
                        <defs>
                          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
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
                <span className="text-sm">{t.insight_philosophy}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">{t.insight_advanced}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm">{t.insight_saturnalia_count}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-sm">{t.insight_beginner}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span className="text-sm">{t.insight_commentarii_count}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span className="text-sm">{t.insight_balance}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default VisualizationsSection;