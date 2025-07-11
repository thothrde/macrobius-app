import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Target, 
  TrendingUp, 
  Brain, 
  Clock,
  CheckCircle,
  X,
  RotateCcw,
  Zap,
  Award,
  Database
} from 'lucide-react';
import { oracleCloudApi, useOracleCloudConnection } from '../../lib/api/oracleCloudApi';

interface VocabularyTrainerProps {
  language?: 'DE' | 'EN' | 'LA';
}

interface VocabularyCard {
  id: string;
  latin: string;
  german: string;
  english: string;
  etymology?: string;
  usage: string[];
  frequency: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  examples: {
    latin: string;
    translation: string;
    source: string;
  }[];
  learningLevel: number;
  lastReviewed: Date;
  nextReview: Date;
  correctAnswers: number;
  totalAnswers: number;
  culturalContext?: string;
}

interface SRSSession {
  id: string;
  cards: VocabularyCard[];
  currentCardIndex: number;
  sessionType: 'new' | 'review' | 'mixed';
  startTime: Date;
  completedCards: number;
  correctAnswers: number;
}

interface LearningStats {
  totalWords: number;
  newWords: number;
  reviewWords: number;
  masteredWords: number;
  currentStreak: number;
  accuracyRate: number;
  weeklyProgress: { day: string; words: number }[];
}

function VocabularyTrainer({ language = 'DE' }: VocabularyTrainerProps) {
  const [vocabulary, setVocabulary] = useState<VocabularyCard[]>([]);
  const [currentSession, setCurrentSession] = useState<SRSSession | null>(null);
  const [learningStats, setLearningStats] = useState<LearningStats | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [corpusSize, setCorpusSize] = useState(1247);
  
  const connectionStatus = useOracleCloudConnection();

  useEffect(() => {
    const demoVocab = getDemoVocabulary();
    setVocabulary(demoVocab);
    generateLearningStats(demoVocab);
  }, []);

  const getDemoVocabulary = (): VocabularyCard[] => {
    return [
      {
        id: 'philosophia',
        latin: 'philosophia',
        german: 'Philosophie, Weisheitsliebe',
        english: 'philosophy, love of wisdom',
        etymology: 'Griechisch φιλοσοφία = φίλος ("liebend") + σοφία ("Weisheit")',
        usage: ['philosophiae studium', 'philosophia moralis'],
        frequency: 23,
        difficulty: 'Intermediate',
        category: 'Bildung & Wissenschaft',
        examples: [{
          latin: 'Philosophia vero illa, quae de moribus et de vita disceptat.',
          translation: 'Jene Philosophie aber, die über Sitten und Leben disputiert.',
          source: 'Commentarii 1.2.9'
        }],
        learningLevel: 3,
        lastReviewed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000),
        correctAnswers: 7,
        totalAnswers: 10,
        culturalContext: 'Zentraler Begriff der spätantiken Bildung'
      },
      {
        id: 'convivium',
        latin: 'convivium',
        german: 'Gastmahl, Gelage',
        english: 'banquet, feast',
        etymology: 'Von con- ("zusammen") + vivere ("leben")',
        usage: ['convivium celebrare', 'ad convivium invitare'],
        frequency: 31,
        difficulty: 'Beginner',
        category: 'Gesellschaft & Kultur',
        examples: [{
          latin: 'Saturnalium convivium multi nobiles celebrant.',
          translation: 'Das Gastmahl der Saturnalien feiern viele Adlige.',
          source: 'Saturnalia 1.7.1'
        }],
        learningLevel: 5,
        lastReviewed: new Date(Date.now() - 24 * 60 * 60 * 1000),
        nextReview: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        correctAnswers: 12,
        totalAnswers: 14,
        culturalContext: 'Zentral für römische Sozialkultur'
      }
    ];
  };

  const generateLearningStats = (vocabData = vocabulary) => {
    const stats: LearningStats = {
      totalWords: vocabData.length,
      newWords: vocabData.filter(v => v.learningLevel === 0).length,
      reviewWords: vocabData.filter(v => v.nextReview <= new Date() && v.learningLevel > 0).length,
      masteredWords: vocabData.filter(v => v.learningLevel >= 8).length,
      currentStreak: 15,
      accuracyRate: vocabData.length > 0 
        ? vocabData.reduce((sum, v) => sum + (v.totalAnswers > 0 ? v.correctAnswers / v.totalAnswers : 0), 0) / vocabData.length
        : 0,
      weeklyProgress: [
        { day: 'Mo', words: 12 },
        { day: 'Di', words: 8 },
        { day: 'Mi', words: 15 },
        { day: 'Do', words: 11 },
        { day: 'Fr', words: 19 },
        { day: 'Sa', words: 7 },
        { day: 'So', words: 14 }
      ]
    };
    setLearningStats(stats);
  };

  const startSession = (type: 'new' | 'review' | 'mixed') => {
    let sessionCards: VocabularyCard[] = [];
    
    switch (type) {
      case 'new':
        sessionCards = vocabulary.filter(v => v.learningLevel === 0).slice(0, 10);
        break;
      case 'review':
        sessionCards = vocabulary.filter(v => v.nextReview <= new Date() && v.learningLevel > 0).slice(0, 20);
        break;
      case 'mixed':
        const newCards = vocabulary.filter(v => v.learningLevel === 0).slice(0, 5);
        const reviewCards = vocabulary.filter(v => v.nextReview <= new Date() && v.learningLevel > 0).slice(0, 15);
        sessionCards = [...newCards, ...reviewCards];
        break;
    }
    
    if (sessionCards.length === 0) {
      alert('Keine Karten für diese Session verfügbar!');
      return;
    }
    
    sessionCards = sessionCards.sort(() => Math.random() - 0.5);
    
    const session: SRSSession = {
      id: `session-${Date.now()}`,
      cards: sessionCards,
      currentCardIndex: 0,
      sessionType: type,
      startTime: new Date(),
      completedCards: 0,
      correctAnswers: 0
    };
    
    setCurrentSession(session);
    setShowAnswer(false);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (!currentSession) return;
    
    const currentCard = currentSession.cards[currentSession.currentCardIndex];
    const updatedCard = { ...currentCard };
    
    updatedCard.totalAnswers += 1;
    updatedCard.lastReviewed = new Date();
    
    if (isCorrect) {
      updatedCard.correctAnswers += 1;
      updatedCard.learningLevel = Math.min(10, updatedCard.learningLevel + 1);
      const intervals = [1, 3, 7, 14, 30, 60, 120, 240, 480];
      const interval = intervals[Math.min(updatedCard.learningLevel - 1, intervals.length - 1)] || 480;
      updatedCard.nextReview = new Date(Date.now() + interval * 24 * 60 * 60 * 1000);
    } else {
      updatedCard.learningLevel = Math.max(0, updatedCard.learningLevel - 1);
      updatedCard.nextReview = new Date(Date.now() + 24 * 60 * 60 * 1000);
    }
    
    setVocabulary(prev => prev.map(v => v.id === updatedCard.id ? updatedCard : v));
    
    const updatedSession = {
      ...currentSession,
      completedCards: currentSession.completedCards + 1,
      correctAnswers: currentSession.correctAnswers + (isCorrect ? 1 : 0)
    };
    
    if (updatedSession.currentCardIndex < updatedSession.cards.length - 1) {
      updatedSession.currentCardIndex += 1;
      setCurrentSession(updatedSession);
      setShowAnswer(false);
    } else {
      setCurrentSession(null);
      generateLearningStats();
      alert(`Session abgeschlossen! Richtig: ${updatedSession.correctAnswers}/${updatedSession.cards.length}`);
    }
  };

  const currentCard = currentSession?.cards[currentSession.currentCardIndex];

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center px-4 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-950 via-red-900 to-pink-950" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <BookOpen className="w-8 h-8 text-orange-400" />
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-200 via-red-200 to-orange-200">
              Vocabulary Trainer
            </h1>
            <Brain className="w-8 h-8 text-red-400" />
          </div>
          
          <h2 className="text-2xl md:text-3xl text-orange-200 mb-8">
            CORPUS-EXPANSION Vokabel-System
          </h2>
          
          <div className="bg-gradient-to-br from-green-900/20 to-green-950/20 rounded-xl border border-green-500/20 p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-300 font-semibold">Erweiterte SRS + Korpus-Extraktion</span>
              <div className={`w-2 h-2 rounded-full ${
                connectionStatus.isConnected ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
              }`} />
            </div>
            <p className="text-green-100/90 leading-relaxed">
              Intelligentes Spaced Repetition System mit automatischer Vokabel-Extraktion 
              aus {corpusSize.toLocaleString()} Begriffen.
            </p>
          </div>
        </motion.div>

        {!currentSession ? (
          <div className="space-y-8">
            {learningStats && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-4 gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 text-center">
                  <BookOpen className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{learningStats.totalWords}</div>
                  <div className="text-orange-200 text-sm">Vokabeln Gesamt</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 text-center">
                  <Target className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{learningStats.reviewWords}</div>
                  <div className="text-blue-200 text-sm">Zu wiederholen</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 text-center">
                  <Award className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{learningStats.masteredWords}</div>
                  <div className="text-green-200 text-sm">Beherrscht</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{Math.round(learningStats.accuracyRate * 100)}%</div>
                  <div className="text-purple-200 text-sm">Genauigkeit</div>
                </div>
              </motion.div>
            )}

            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Lern-Session starten</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                  onClick={() => startSession('new')}
                  className="p-6 bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-400/50 rounded-xl hover:from-blue-500/30 hover:to-blue-600/30 transition-all"
                >
                  <Zap className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-blue-200 mb-2">Neue Vokabeln</h4>
                  <p className="text-blue-300/80 text-sm mb-4">Lerne neue Begriffe aus dem Macrobius-Korpus</p>
                  <div className="text-blue-200 font-bold">{learningStats?.newWords || 0} verfügbar</div>
                </button>
                
                <button
                  onClick={() => startSession('review')}
                  className="p-6 bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-400/50 rounded-xl hover:from-orange-500/30 hover:to-orange-600/30 transition-all"
                >
                  <RotateCcw className="w-8 h-8 text-orange-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-orange-200 mb-2">Wiederholung</h4>
                  <p className="text-orange-300/80 text-sm mb-4">Wiederhole fällige Vokabeln nach SRS-System</p>
                  <div className="text-orange-200 font-bold">{learningStats?.reviewWords || 0} fällig</div>
                </button>
                
                <button
                  onClick={() => startSession('mixed')}
                  className="p-6 bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-400/50 rounded-xl hover:from-purple-500/30 hover:to-purple-600/30 transition-all"
                >
                  <Brain className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-purple-200 mb-2">Gemischte Session</h4>
                  <p className="text-purple-300/80 text-sm mb-4">Optimale Mischung aus neuen und bekannten Vokabeln</p>
                  <div className="text-purple-200 font-bold">Empfohlen</div>
                </button>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">
                  {currentSession.sessionType === 'new' ? 'Neue Vokabeln' :
                   currentSession.sessionType === 'review' ? 'Wiederholung' : 'Gemischte Session'}
                </h2>
                <div className="flex items-center space-x-4">
                  <span className="text-white/80">
                    {currentSession.currentCardIndex + 1} / {currentSession.cards.length}
                  </span>
                  <button
                    onClick={() => setCurrentSession(null)}
                    className="p-2 text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-orange-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentSession.currentCardIndex + 1) / currentSession.cards.length) * 100}%` }}
                />
              </div>
            </div>

            {currentCard && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCard.id}
                  className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 text-center"
                  initial={{ opacity: 0, rotateY: 180 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: -180 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="mb-8">
                    <h3 className="text-4xl font-bold text-white mb-4 font-serif">
                      {currentCard.latin}
                    </h3>
                    
                    {currentCard.etymology && (
                      <p className="text-orange-300/80 text-sm mb-4">
                        {currentCard.etymology}
                      </p>
                    )}
                    
                    <div className="flex justify-center space-x-4 mb-6">
                      <span className={`px-3 py-1 rounded-lg text-sm ${
                        currentCard.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300' :
                        currentCard.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {currentCard.difficulty}
                      </span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm">
                        {currentCard.category}
                      </span>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm">
                        Level {currentCard.learningLevel}
                      </span>
                    </div>
                  </div>

                  {showAnswer ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="space-y-6 mb-8">
                        <div>
                          <h4 className="text-lg font-semibold text-orange-300 mb-2">Deutsch:</h4>
                          <p className="text-xl text-white">{currentCard.german}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-semibold text-blue-300 mb-2">English:</h4>
                          <p className="text-xl text-white">{currentCard.english}</p>
                        </div>
                        
                        {currentCard.examples.length > 0 && (
                          <div>
                            <h4 className="text-lg font-semibold text-green-300 mb-3">Beispiel:</h4>
                            <div className="bg-white/5 border border-white/20 rounded-lg p-4">
                              <p className="text-white font-serif mb-2">
                                {currentCard.examples[0].latin}
                              </p>
                              <p className="text-white/80 text-sm mb-2">
                                {currentCard.examples[0].translation}
                              </p>
                              <p className="text-green-300/80 text-xs">
                                {currentCard.examples[0].source}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-center space-x-6">
                        <button
                          onClick={() => handleAnswer(false)}
                          className="px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center space-x-2"
                        >
                          <X className="w-5 h-5" />
                          <span>Schwer</span>
                        </button>
                        <button
                          onClick={() => handleAnswer(true)}
                          className="px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex items-center space-x-2"
                        >
                          <CheckCircle className="w-5 h-5" />
                          <span>Einfach</span>
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <div>
                      <p className="text-white/80 text-lg mb-8">
                        Was bedeutet dieses lateinische Wort?
                      </p>
                      
                      <button
                        onClick={() => setShowAnswer(true)}
                        className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                      >
                        Antwort zeigen
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}

export default VocabularyTrainer;