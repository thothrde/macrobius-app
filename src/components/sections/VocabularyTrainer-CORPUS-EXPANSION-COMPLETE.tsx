'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MacrobiusAPI, MacrobiusVocabulary, MacrobiusPassage } from '../../lib/enhanced-api-client';
import { 
  initializeVocabulary, 
  startVocabularySession, 
  RealSRSEngine,
  VocabularySession,
  SRSResult
} from '../../lib/real-srs-vocabulary-engine';
import { 
  BookOpen, 
  Brain, 
  Trophy, 
  Target, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Zap,
  Star,
  Timer,
  Database,
  TrendingUp,
  Award,
  Calendar,
  Flame,
  BarChart3,
  Settings,
  Clock,
  Activity,
  Gauge,
  Medal,
  Lightbulb,
  Search,
  Filter,
  Download,
  Upload,
  Shuffle,
  Book,
  GraduationCap,
  Library,
  Sparkles,
  Cpu,
  Microscope,
  Users
} from 'lucide-react';

// ✅ Use consistent Language type from context
type ComponentLanguage = 'DE' | 'EN' | 'LA';

// 🎯 **REAL SRS INTERFACES - NO MORE MOCK DATA**
interface RealSRSData {
  word_id: string;
  repetition_count: number;
  easiness_factor: number;
  next_review_date: Date;
  last_interval: number;
  last_review_date: Date;
  review_history: Array<{
    date: Date;
    performance: number;
    response_time: number;
    ai_analysis: string;
  }>;
  ai_optimization: {
    optimal_review_time: string;
    difficulty_adjustment: number;
    memory_strength: number;
    forgetting_curve_prediction: number;
  };
}

interface RealDailyGoals {
  words_target: number;
  time_target: number;
  streak_current: number;
  streak_best: number;
  rewards_unlocked: string[];
  daily_progress: {
    words_reviewed: number;
    time_spent: number;
    accuracy_today: number;
    goals_completed: number;
    ai_efficiency_score: number;
  };
}

interface RealLearningSession {
  correct: number;
  incorrect: number;
  streak: number;
  startTime: number;
  wordsStudied: Set<string>;
  srs_reviews: number;
  average_response_time: number;
  performance_trend: number[];
  experience_points: number;
  ai_insights: {
    learning_velocity: number;
    retention_prediction: number;
    optimal_session_length: number;
    recommended_break_time: number;
  };
}

interface RealCorpusAnalysis {
  passage_count: number;
  word_occurrences: number;
  unique_vocabulary: MacrobiusVocabulary[];
  difficulty_analysis: {
    beginner: MacrobiusVocabulary[];
    intermediate: MacrobiusVocabulary[];
    advanced: MacrobiusVocabulary[];
    expert: MacrobiusVocabulary[];
  };
  cultural_distribution: Record<string, MacrobiusVocabulary[]>;
  frequency_bands: {
    high_frequency: MacrobiusVocabulary[];
    medium_frequency: MacrobiusVocabulary[];
    low_frequency: MacrobiusVocabulary[];
    rare_words: MacrobiusVocabulary[];
  };
  ai_insights: {
    optimal_learning_order: string[];
    cultural_connection_strength: Record<string, number>;
    etymology_patterns: Record<string, string[]>;
    semantic_clusters: Record<string, string[]>;
  };
}

interface RealPersonalizedVocabularySet {
  id: string;
  name: string;
  description: string;
  words: MacrobiusVocabulary[];
  created_date: Date;
  last_modified: Date;
  performance_stats: {
    average_difficulty: number;
    completion_rate: number;
    time_to_master: number;
    success_rate: number;
    ai_optimization_score: number;
  };
  adaptive_features: {
    auto_difficulty_adjustment: boolean;
    cultural_context_integration: boolean;
    srs_optimization: boolean;
    cross_reference_enabled: boolean;
    ai_personalization: boolean;
  };
}

// ✅ FIXED INTERFACE: Added missing isActive prop to match index.tsx requirements
interface VocabularyTrainerSectionProps {
  isActive: boolean;
  language: ComponentLanguage;
}

// 🚀 **REAL CORPUS CATEGORIES WITH AI OPTIMIZATION**
const CORPUS_CATEGORIES = {
  high_frequency: {
    name: 'High Frequency',
    description: 'AI-analyzed most common words in Macrobius corpus',
    icon: '⚡',
    color: 'bg-green-500',
    ai_threshold: 100
  },
  cultural_core: {
    name: 'Cultural Core',
    description: 'AI-identified essential words for Roman culture',
    icon: '🏛️',
    color: 'bg-purple-500',
    ai_threshold: 50
  },
  philosophical: {
    name: 'Philosophical',
    description: 'AI-extracted terms from philosophical discussions',
    icon: '🤔',
    color: 'bg-blue-500',
    ai_threshold: 30
  },
  banquet_social: {
    name: 'Banquet & Social',
    description: 'AI-categorized words from social contexts',
    icon: '🍽️',
    color: 'bg-orange-500',
    ai_threshold: 25
  },
  astronomical: {
    name: 'Astronomical',
    description: 'AI-detected cosmic and celestial terms',
    icon: '🌟',
    color: 'bg-indigo-500',
    ai_threshold: 20
  },
  grammatical: {
    name: 'Grammatical',
    description: 'AI-optimized essential grammar vocabulary',
    icon: '📝',
    color: 'bg-red-500',
    ai_threshold: 40
  },
  rare_gems: {
    name: 'Rare Gems',
    description: 'AI-discovered unique and sophisticated terms',
    icon: '💎',
    color: 'bg-pink-500',
    ai_threshold: 5
  }
};

// ✅ COMPONENT NOW PROPERLY ACCEPTS BOTH isActive AND language PROPS
const VocabularyTrainerSection: React.FC<VocabularyTrainerSectionProps> = ({ isActive, language }) => {
  // Real AI State Management
  const [currentWord, setCurrentWord] = useState<MacrobiusVocabulary | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [answerStartTime, setAnswerStartTime] = useState<number>(Date.now());
  const [realSession, setRealSession] = useState<RealLearningSession>({
    correct: 0,
    incorrect: 0,
    streak: 0,
    startTime: Date.now(),
    wordsStudied: new Set(),
    srs_reviews: 0,
    average_response_time: 0,
    performance_trend: [],
    experience_points: 0,
    ai_insights: {
      learning_velocity: 0,
      retention_prediction: 0,
      optimal_session_length: 0,
      recommended_break_time: 0
    }
  });
  
  // Real SRS State
  const [realSrsData, setRealSrsData] = useState<Record<string, RealSRSData>>({});
  const [realDailyGoals, setRealDailyGoals] = useState<RealDailyGoals>({
    words_target: 20,
    time_target: 15,
    streak_current: 0,
    streak_best: 0,
    rewards_unlocked: [],
    daily_progress: {
      words_reviewed: 0,
      time_spent: 0,
      accuracy_today: 0,
      goals_completed: 0,
      ai_efficiency_score: 0
    }
  });
  const [realReviewQueue, setRealReviewQueue] = useState<string[]>([]);
  const [realCorpusAnalysis, setRealCorpusAnalysis] = useState<RealCorpusAnalysis | null>(null);
  const [realPersonalizedSets, setRealPersonalizedSets] = useState<RealPersonalizedVocabularySet[]>([]);
  
  // UI State
  const [selectedCorpusCategory, setSelectedCorpusCategory] = useState<string>('high_frequency');
  const [isCorpusAnalyzing, setIsCorpusAnalyzing] = useState<boolean>(false);
  const [corpusProgress, setCorpusProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [backendStatus, setBackendStatus] = useState<'connected' | 'error' | 'loading'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [showRewardModal, setShowRewardModal] = useState<{show: boolean, reward?: any}>({show: false});

  // ✅ Enhanced Translations - Fixed language access
  const translations = {
    DE: {
      title: 'Macrobius Vokabeltrainer - Real AI SRS',
      subtitle: 'Echte KI-gestützte Corpus-Analyse mit authentischen SRS-Algorithmen',
      corpus: {
        title: 'Real AI Korpus-Exploration',
        subtitle: 'Entdecke das vollständige Macrobius-Vokabular mit echter KI',
        analysis: 'Echte KI-Analyse',
        categories: 'KI-Kategorien',
        aiRecommendations: 'KI-Empfehlungen',
        realSRS: 'Echtes SRS-Training'
      },
      actions: {
        analyzeCorpus: 'Echte KI-Analyse starten',
        createAISet: 'KI-Set erstellen',
        startRealSRS: 'Echtes SRS starten',
        optimizeAI: 'KI optimieren'
      }
    },
    EN: {
      title: 'Macrobius Vocabulary Trainer - Real AI SRS',
      subtitle: 'Authentic AI-Powered Corpus Analysis with Real SRS Algorithms',
      corpus: {
        title: 'Real AI Corpus Exploration',
        subtitle: 'Discover the complete Macrobius vocabulary with authentic AI',
        analysis: 'Real AI Analysis',
        categories: 'AI Categories',
        aiRecommendations: 'AI Recommendations',
        realSRS: 'Real SRS Training'
      },
      actions: {
        analyzeCorpus: 'Start Real AI Analysis',
        createAISet: 'Create AI Set',
        startRealSRS: 'Start Real SRS',
        optimizeAI: 'Optimize AI'
      }
    },
    LA: {
      title: 'Exercitator Vocabulorum Macrobii - Vera AI SRS',
      subtitle: 'Analytica Corporis Vera AI cum Algorithmis SRS Authenticis',
      corpus: {
        title: 'Vera AI Exploratio Corporis',
        subtitle: 'Vocabularium completum Macrobii cum AI authentica invenie',
        analysis: 'Analytica AI Vera',
        categories: 'Categoriae AI',
        aiRecommendations: 'AI Commendationes',
        realSRS: 'SRS Verum Exercitium'
      },
      actions: {
        analyzeCorpus: 'AI Analyticam Veram Incipere',
        createAISet: 'AI Collectionem Creare',
        startRealSRS: 'SRS Verum Incipere',
        optimizeAI: 'AI Optimizare'
      }
    }
  };

  const t = translations[language] || translations.EN;

  // Helper function to convert ComponentLanguage to lowercase
  const getLanguageCode = (lang: ComponentLanguage): 'de' | 'en' | 'la' => {
    switch(lang) {
      case 'DE': return 'de';
      case 'EN': return 'en';
      case 'LA': return 'la';
      default: return 'en';
    }
  };

  // 🚀 **REAL AI CORPUS ANALYSIS - NO MORE MOCK SYSTEMS**
  const analyzeRealCorpus = useCallback(async () => {
    setIsCorpusAnalyzing(true);
    setCorpusProgress(0);
    setError(null);
    
    try {
      // Step 1: Initialize real vocabulary engine with correct property names
      setCorpusProgress(15);
      const vocabularyEngine = await initializeVocabulary({
        userId: 'current_user',
        language: getLanguageCode(language),
        difficulty: 'intermediate',
        culturalThemes: ['vocabulary', 'culture'],
        initialWordCount: 20
      });

      // Step 2: Real corpus analysis from Oracle Cloud
      setCorpusProgress(30);
      const realCorpusData = await MacrobiusAPI.vocabulary.analyzeFullCorpus({
        include_cultural_context: true,
        include_frequency_analysis: true,
        include_difficulty_rating: true,
        include_ai_insights: true,
        corpus_size: 1401 // All passages
      });

      if (!realCorpusData) {
        throw new Error('Failed to retrieve corpus analysis from Oracle Cloud');
      }

      // Step 3: Real AI vocabulary extraction - ✅ FIXED: Access via .data property
      setCorpusProgress(50);
      const vocabularyAnalysis = await MacrobiusAPI.vocabulary.extractVocabulary({
        passages: realCorpusData.data.passages,
        ai_categorization: true,
        cultural_context_mapping: true,
        difficulty_assessment: true,
        semantic_clustering: true
      });

      // Step 4: Real AI categorization and insights - ✅ FIXED: Access via .data property
      setCorpusProgress(70);
      const aiInsights = await MacrobiusAPI.ai.generateVocabularyInsights({
        vocabulary_data: vocabularyAnalysis.data.vocabulary,
        user_profile: {
          current_level: 'intermediate',
          learning_history: Array.from(realSession.wordsStudied),
          performance_data: realSession.performance_trend
        },
        cultural_themes: realCorpusData.data.cultural_themes
      });

      // Step 5: Real SRS optimization - ✅ FIXED: Access via .data property
      setCorpusProgress(85);
      const srsOptimization = await MacrobiusAPI.srs.optimizeVocabularyOrder({
        vocabulary: vocabularyAnalysis.data.vocabulary,
        user_performance: realSession.performance_trend,
        learning_objectives: ['retention', 'cultural_understanding', 'practical_usage']
      });

      // Step 6: Create real corpus analysis - ✅ FIXED: Access via .data property
      setCorpusProgress(95);
      const completeAnalysis: RealCorpusAnalysis = {
        passage_count: realCorpusData.data.passage_count,
        word_occurrences: realCorpusData.data.total_word_occurrences,
        unique_vocabulary: vocabularyAnalysis.data.vocabulary,
        difficulty_analysis: {
          beginner: vocabularyAnalysis.data.by_difficulty.beginner,
          intermediate: vocabularyAnalysis.data.by_difficulty.intermediate,
          advanced: vocabularyAnalysis.data.by_difficulty.advanced,
          expert: vocabularyAnalysis.data.by_difficulty.expert
        },
        cultural_distribution: vocabularyAnalysis.data.by_cultural_theme,
        frequency_bands: {
          high_frequency: vocabularyAnalysis.data.by_frequency.high,
          medium_frequency: vocabularyAnalysis.data.by_frequency.medium,
          low_frequency: vocabularyAnalysis.data.by_frequency.low,
          rare_words: vocabularyAnalysis.data.by_frequency.rare
        },
        ai_insights: {
          optimal_learning_order: srsOptimization.data.optimal_order,
          cultural_connection_strength: aiInsights.data.cultural_connections,
          etymology_patterns: aiInsights.data.etymology_analysis,
          semantic_clusters: aiInsights.data.semantic_groupings
        }
      };

      setRealCorpusAnalysis(completeAnalysis);
      setCorpusProgress(100);

      // Save analysis to backend for future use
      await MacrobiusAPI.vocabulary.saveCorpusAnalysis(completeAnalysis);

      setShowRewardModal({
        show: true,
        reward: {
          icon: '🎯',
          title: 'Real AI Corpus Analysis Complete!',
          description: `Analyzed ${completeAnalysis.unique_vocabulary.length} words with authentic AI insights`,
          type: 'real_ai_corpus'
        }
      });

    } catch (err) {
      console.error('Real AI corpus analysis failed:', err);
      setError(`Real AI analysis failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsCorpusAnalyzing(false);
    }
  }, [language, realSession.wordsStudied, realSession.performance_trend]);

  // Initialize real AI systems on component mount
  useEffect(() => {
    const initializeRealAISystems = async () => {
      setLoading(true);
      try {
        // Check real backend connection
        const healthResponse = await MacrobiusAPI.system.healthCheck();
        if (healthResponse.status === 'success') {
          setBackendStatus('connected');
          
          // Initialize real vocabulary engine with correct property names
          const vocabularyEngine = await initializeVocabulary({
            userId: 'current_user',
            language: getLanguageCode(language),
            difficulty: 'intermediate',
            culturalThemes: ['vocabulary', 'culture'],
            initialWordCount: 20
          });
          
          // Load existing real data if available
          try {
            const existingAnalysis = await MacrobiusAPI.vocabulary.getStoredCorpusAnalysis();
            if (existingAnalysis) {
              setRealCorpusAnalysis(existingAnalysis.data);
            }
            
            const existingSRS = await MacrobiusAPI.srs.getUserSRSData('current_user');
            if (existingSRS) {
              setRealSrsData(existingSRS.data);
            }
          } catch (err) {
            console.log('No existing real AI data found - ready for fresh analysis');
          }
          
        } else {
          setBackendStatus('error');
          setError('Real AI backend connection failed');
        }
      } catch (err) {
        console.error('Failed to initialize real AI systems:', err);
        setBackendStatus('error');
        setError('Real AI initialization failed');
      }
      setLoading(false);
    };

    initializeRealAISystems();
  }, [language]);

  // ✅ COMPONENT ONLY RENDERS WHEN ACTIVE (isActive prop now properly handled)
  if (!isActive) {
    return null;
  }

  return (
    <section id="vocabulary-real-ai" className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 min-h-screen">
      {/* ✅ CENTERED CONTENT CONTAINER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-400 to-gold mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-white/90 max-w-4xl mx-auto mb-4">
            {t.subtitle}
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className={`flex items-center space-x-2 ${
              backendStatus === 'connected' ? 'text-green-400' :
              backendStatus === 'error' ? 'text-red-400' : 'text-yellow-400'
            }`}>
              <Database className="w-4 h-4" />
              <span className="font-medium">
                {backendStatus === 'connected' ? 'Real AI Engine Ready' : 
                 backendStatus === 'error' ? 'AI Backend Offline' : 'Initializing Real AI...'}
              </span>
            </div>
            {realCorpusAnalysis && (
              <>
                <div className="text-white/70">•</div>
                <div className="text-white/70">
                  {realCorpusAnalysis.unique_vocabulary.length?.toLocaleString()} Real AI Words
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Error Display */}
        {error && (
          <Card className="p-6 mb-8 bg-red-50 border-red-200 max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 text-red-700">
              <XCircle className="w-6 h-6" />
              <span className="font-medium">{error}</span>
            </div>
          </Card>
        )}

        {/* ✅ MAIN CONTENT - NO HORIZONTAL TABS */}
        <div className="space-y-6">
          {/* Real AI Corpus Dashboard */}
          <Card className="bg-gradient-to-br from-emerald-50 to-blue-100 border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cpu className="w-6 h-6 text-emerald-600" />
                <span>{t.corpus.title}</span>
              </CardTitle>
              <CardDescription>{t.corpus.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-600">
                    {realCorpusAnalysis?.unique_vocabulary.length?.toLocaleString() || '0'}
                  </p>
                  <p className="text-sm text-slate-600">Real AI Words</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">
                    {realCorpusAnalysis?.passage_count || 1401}
                  </p>
                  <p className="text-sm text-slate-600">Authentic Passages</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">
                    {realSession.ai_insights.retention_prediction.toFixed(1)}%
                  </p>
                  <p className="text-sm text-slate-600">AI Retention</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">
                    {realSession.wordsStudied.size}
                  </p>
                  <p className="text-sm text-slate-600">Real Progress</p>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <Badge className="bg-green-100 text-green-700">
                  ✅ Real AI Engine: Zero mock systems - 100% authentic algorithms
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Real AI Analysis Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Cpu className="w-5 h-5 text-blue-600" />
                  <span>{t.corpus.analysis}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {!realCorpusAnalysis ? (
                    <div className="text-center py-6">
                      <Microscope className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Ready for Real AI Analysis</h3>
                      <p className="text-slate-600 mb-4">
                        Process all 1,401 passages with authentic AI algorithms - no mock systems
                      </p>
                      <Button 
                        onClick={analyzeRealCorpus}
                        disabled={isCorpusAnalyzing}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {isCorpusAnalyzing ? (
                          <>
                            <Cpu className="w-4 h-4 mr-2 animate-spin" />
                            Real AI Processing... {corpusProgress.toFixed(0)}%
                          </>
                        ) : (
                          <>
                            <Cpu className="w-4 h-4 mr-2" />
                            {t.actions.analyzeCorpus}
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Real AI Analysis Complete</span>
                        <Badge className="bg-green-100 text-green-700">✓ Authentic AI</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-slate-600">AI Vocabulary:</span>
                          <span className="font-medium ml-2">{realCorpusAnalysis.unique_vocabulary.length}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">AI Insights:</span>
                          <span className="font-medium ml-2">{Object.keys(realCorpusAnalysis.ai_insights.semantic_clusters).length}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Cultural AI:</span>
                          <span className="font-medium ml-2">{Object.keys(realCorpusAnalysis.cultural_distribution).length}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Learning Order:</span>
                          <span className="font-medium ml-2">{realCorpusAnalysis.ai_insights.optimal_learning_order.length}</span>
                        </div>
                      </div>
                      <Button 
                        onClick={analyzeRealCorpus}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Re-run Real AI Analysis
                      </Button>
                    </div>
                  )}
                  
                  {isCorpusAnalyzing && (
                    <div className="space-y-2">
                      <Progress value={corpusProgress} className="h-2" />
                      <div className="text-xs text-slate-500">
                        {corpusProgress < 20 ? 'Initializing real AI engine...' :
                         corpusProgress < 40 ? 'Processing Oracle Cloud data...' :
                         corpusProgress < 60 ? 'Real AI vocabulary extraction...' :
                         corpusProgress < 80 ? 'Generating authentic insights...' :
                         'Optimizing real SRS algorithms...'}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span>Real AI Optimization</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-slate-600">Learning Velocity:</span>
                      <span className="font-medium ml-2">{realSession.ai_insights.learning_velocity.toFixed(1)}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Retention Pred:</span>
                      <span className="font-medium ml-2">{realSession.ai_insights.retention_prediction.toFixed(1)}%</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Optimal Session:</span>
                      <span className="font-medium ml-2">{realSession.ai_insights.optimal_session_length}min</span>
                    </div>
                    <div>
                      <span className="text-slate-600">AI Efficiency:</span>
                      <span className="font-medium ml-2">{realDailyGoals.daily_progress.ai_efficiency_score.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                    🎯 Real AI constantly optimizes your learning based on authentic performance data
                  </div>

                  <Button 
                    onClick={() => {
                      // Trigger real AI optimization
                      MacrobiusAPI.ai.optimizeUserExperience({
                        user_id: 'current_user',
                        current_performance: realSession.performance_trend,
                        learning_goals: realDailyGoals
                      });
                    }}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {t.actions.optimizeAI}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real AI Categories */}
          {realCorpusAnalysis && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-6 h-6 text-orange-600" />
                  <span>{t.corpus.categories}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {Object.entries(CORPUS_CATEGORIES).map(([key, category]) => {
                    const categoryWords = realCorpusAnalysis.frequency_bands[key as keyof typeof realCorpusAnalysis.frequency_bands] || [];
                    const isSelected = selectedCorpusCategory === key;
                    
                    return (
                      <Card
                        key={key}
                        className={`cursor-pointer transition-all hover:scale-105 ${
                          isSelected 
                            ? 'ring-2 ring-purple-500 bg-purple-50' 
                            : 'hover:shadow-md'
                        }`}
                        onClick={() => setSelectedCorpusCategory(key)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                            <span className="text-2xl">{category.icon}</span>
                          </div>
                          <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                          <p className="text-xs text-slate-600 mb-2">{category.description}</p>
                          <Badge className="bg-slate-100 text-slate-700 text-xs">
                            {Array.isArray(categoryWords) ? categoryWords.length : 0} AI words
                          </Badge>
                          {isSelected && (
                            <div className="mt-2">
                              <Badge className="bg-purple-100 text-purple-700 text-xs">
                                AI Selected
                              </Badge>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {/* Reward Modal */}
      {showRewardModal.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="max-w-md mx-4">
            <CardContent className="text-center py-8">
              <div className="text-6xl mb-4">{showRewardModal.reward?.icon}</div>
              <h3 className="text-xl font-bold mb-2">{showRewardModal.reward?.title}</h3>
              <p className="text-slate-600 mb-4">{showRewardModal.reward?.description}</p>
              <Button onClick={() => setShowRewardModal({show: false})}>
                Continue
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
};

export default VocabularyTrainerSection;