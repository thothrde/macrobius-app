import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Globe, 
  BookOpen, 
  Search, 
  TrendingUp, 
  Zap,
  Target,
  Database,
  Lightbulb,
  Network,
  BarChart3,
  CheckCircle
} from 'lucide-react';
import { useOracleCloudConnection } from '../../lib/api/oracleCloudApi';

interface AICulturalAnalysisSectionProps {
  language?: 'DE' | 'EN' | 'LA';
}

interface CulturalAnalysis {
  id: string;
  title: string;
  description: string;
  insights: string[];
  modernConnections: string[];
  primarySources: string[];
  confidence: number;
  timestamp: Date;
}

function AICulturalAnalysisSection({ language = 'DE' }: AICulturalAnalysisSectionProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>('saturnalia-society');
  const [analysisResults, setAnalysisResults] = useState<CulturalAnalysis[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [customQuery, setCustomQuery] = useState('');
  
  const connectionStatus = useOracleCloudConnection();

  const analysisTopics = [
    {
      id: 'saturnalia-society',
      title: 'Saturnalien & Gesellschaftsordnung',
      description: 'KI-Analyse der sozialen Umkehrungen während der römischen Winterfeste',
      icon: '🎭',
      keywords: ['Saturnalia', 'libertas', 'domini', 'servi']
    },
    {
      id: 'philosophical-synthesis',
      title: 'Philosophische Synthese',
      description: 'Neuplatonische Integration in der spätantiken Bildung',
      icon: '🤔',
      keywords: ['philosophia', 'Plato', 'Cicero', 'sapientia']
    },
    {
      id: 'cosmic-worldview',
      title: 'Kosmische Weltanschauung',
      description: 'Astronomie und Kosmologie als Bildungskanon',
      icon: '🌌',
      keywords: ['astronomia', 'sphaera', 'harmonia', 'mundus']
    }
  ];

  const performAnalysis = async (topicId: string) => {
    setIsAnalyzing(true);
    
    try {
      const topic = analysisTopics.find(t => t.id === topicId);
      if (!topic) return;
      
      console.log(`🤖 Performing AI Cultural Analysis for: ${topic.title}`);
      
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const analysis: CulturalAnalysis = {
        id: topicId,
        title: topic.title,
        description: `KI-gestützte Kulturanalyse mit fortschrittlicher Mustererkennung`,
        insights: [
          'Die Saturnalien fungieren als kontrolliertes Ventil für gesellschaftliche Spannungen',
          'Temporäre Hierarchie-Umkehrung stärkt paradoxerweise die bestehende Ordnung',
          'Ritualisierte Subversion als Stabilisierungsmechanismus der Gesellschaft',
          'Carnivaleske Elemente als Vorläufer mittelalterlicher Festkultur'
        ],
        modernConnections: [
          'Moderne Karnevaltstraditionen zeigen ähnliche Umkehrungsmuster',
          'Festival-Kultur als temporärer Ausstieg aus Alltagsnormen',
          'Satirische TV-Formate als zeitgenössische Machtkritik',
          'Occupybewegungen nutzen vergleichbare symbolische Inversionen'
        ],
        primarySources: ['Saturnalia 1.7.26', 'Commentarii 1.2.9', 'Saturnalia 2.1.5'],
        confidence: 0.87,
        timestamp: new Date()
      };
      
      setAnalysisResults(prev => {
        const filtered = prev.filter(a => a.id !== topicId);
        return [...filtered, analysis];
      });
      
    } catch (error) {
      console.error('Cultural analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const currentAnalysis = analysisResults.find(a => a.id === selectedTopic);

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center px-4 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Brain className="w-8 h-8 text-indigo-400" />
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200">
              Cultural AI
            </h1>
            <Globe className="w-8 h-8 text-purple-400" />
          </div>
          
          <h2 className="text-2xl md:text-3xl text-indigo-200 mb-8">
            KI-gestützte Kulturanalyse
          </h2>
          
          <div className={`bg-gradient-to-br rounded-xl border p-6 max-w-4xl mx-auto ${
            connectionStatus.isConnected 
              ? 'from-green-900/20 to-green-950/20 border-green-500/20'
              : 'from-yellow-900/20 to-yellow-950/20 border-yellow-500/20'
          }`}>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-300 font-semibold">Erweiterte KI-Kulturanalyse</span>
            </div>
            <p className="text-green-100/90 leading-relaxed">
              Modernste KI analysiert kulturelle Muster, historische Kontinuitäten und 
              moderne Parallelen in Macrobius' Werken.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-bold text-indigo-200 mb-4">Analyse-Themen</h3>
              <div className="space-y-3">
                {analysisTopics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setSelectedTopic(topic.id);
                      if (!analysisResults.find(a => a.id === topic.id)) {
                        performAnalysis(topic.id);
                      }
                    }}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      selectedTopic === topic.id
                        ? 'bg-indigo-500/20 border border-indigo-400/50 text-indigo-200'
                        : 'bg-white/5 border border-white/10 text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{topic.icon}</div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">{topic.title}</h4>
                        <p className="text-xs opacity-80 leading-relaxed">{topic.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-3">
            {isAnalyzing ? (
              <motion.div
                className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="flex flex-col items-center space-y-6">
                  <Brain className="w-16 h-16 text-indigo-400 animate-pulse" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">KI-Analyse läuft...</h3>
                    <p className="text-white/80">Verarbeite kulturelle Muster und historische Zusammenhänge</p>
                  </div>
                </div>
              </motion.div>
            ) : currentAnalysis ? (
              <motion.div
                className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-indigo-200 mb-2">{currentAnalysis.title}</h2>
                    <p className="text-white/80 text-lg">{currentAnalysis.description}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {Math.round(currentAnalysis.confidence * 100)}%
                    </div>
                    <div className="text-green-300 text-xs">Konfidenz</div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                      KI-Erkenntnisse
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentAnalysis.insights.map((insight, index) => (
                        <motion.div
                          key={index}
                          className="bg-indigo-500/10 border border-indigo-400/30 rounded-lg p-4"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                              {index + 1}
                            </div>
                            <p className="text-indigo-200 text-sm leading-relaxed">{insight}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <Network className="w-5 h-5 text-purple-400" />
                      Moderne Parallelen
                    </h3>
                    <div className="space-y-3">
                      {currentAnalysis.modernConnections.map((connection, index) => (
                        <motion.div
                          key={index}
                          className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                        >
                          <div className="flex items-center space-x-3">
                            <Globe className="w-5 h-5 text-purple-400 flex-shrink-0" />
                            <p className="text-purple-200 text-sm leading-relaxed">{connection}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Brain className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Wählen Sie ein Analyse-Thema</h3>
                <p className="text-white/80 mb-6">
                  Klicken Sie auf ein Thema links, um eine KI-gestützte Kulturanalyse zu starten.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default AICulturalAnalysisSection;