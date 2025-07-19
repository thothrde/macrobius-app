'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  BookOpen,
  Brain,
  Target,
  Zap,
  CheckCircle,
  XCircle,
  Star,
  TrendingUp,
  Award,
  Search,
  RefreshCw,
  Play,
  Trophy
} from 'lucide-react';

// Types for Grammar Explainer
type GrammarMode = 'overview' | 'patterns' | 'exercises' | 'progress';

interface GrammarPattern {
  id: string;
  name: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  examples: {
    latin: string;
    translation: string;
    analysis: string;
  }[];
  rules: string[];
  exceptions: string[];
  relatedPatterns: string[];
  frequency: number;
  importance: number;
}

interface GrammarExercise {
  id: string;
  patternId: string;
  type: 'identification' | 'transformation' | 'completion' | 'analysis';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  points: number;
}

interface UserProgress {
  patternsLearned: string[];
  exercicesCompleted: string[];
  currentStreak: number;
  totalPoints: number;
  accuracy: number;
  timeSpent: number;
  lastActivity: Date;
  achievements: string[];
}

const GrammarExplainerTier1Complete: React.FC = () => {
  const { language, translations } = useLanguage();
  
  // State Management
  const [currentMode, setCurrentMode] = useState<GrammarMode>('overview');
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    patternsLearned: [],
    exercicesCompleted: [],
    currentStreak: 0,
    totalPoints: 0,
    accuracy: 0,
    timeSpent: 0,
    lastActivity: new Date(),
    achievements: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<GrammarExercise | null>(null);
  const [exerciseAnswer, setExerciseAnswer] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [exerciseResults, setExerciseResults] = useState<any[]>([]);

  // Mock Data - Replace with real API calls
  const grammarPatterns: GrammarPattern[] = [
    {
      id: 'nom-sing',
      name: 'Nominativ Singular',
      category: 'Deklinationen',
      difficulty: 'beginner',
      description: 'Der Nominativ bezeichnet das Subjekt des Satzes.',
      examples: [
        {
          latin: 'Puer currit.',
          translation: 'Der Junge läuft.',
          analysis: 'puer = Nominativ Singular maskulin'
        },
        {
          latin: 'Puella cantat.',
          translation: 'Das Mädchen singt.',
          analysis: 'puella = Nominativ Singular feminin'
        }
      ],
      rules: [
        'Der Nominativ ist der Fall des Subjekts',
        'Er antwortet auf die Frage "Wer oder was?"',
        'Im Deutschen entspricht er dem ersten Fall'
      ],
      exceptions: [
        'Bei unpersönlichen Verben kann der Nominativ fehlen',
        'In Ausrufen kann der Nominativ allein stehen'
      ],
      relatedPatterns: ['acc-sing', 'nom-plur'],
      frequency: 95,
      importance: 100
    },
    {
      id: 'acc-sing',
      name: 'Akkusativ Singular',
      category: 'Deklinationen',
      difficulty: 'beginner',
      description: 'Der Akkusativ bezeichnet das direkte Objekt.',
      examples: [
        {
          latin: 'Puer puellam videt.',
          translation: 'Der Junge sieht das Mädchen.',
          analysis: 'puellam = Akkusativ Singular feminin'
        }
      ],
      rules: [
        'Der Akkusativ ist der Fall des direkten Objekts',
        'Er antwortet auf die Frage "Wen oder was?"',
        'Wird auch bei Richtungsangaben verwendet'
      ],
      exceptions: [
        'Einige Verben regieren andere Fälle',
        'Bei reflexiven Verben besondere Regeln'
      ],
      relatedPatterns: ['nom-sing', 'dat-sing'],
      frequency: 88,
      importance: 95
    }
  ];

  const grammarExercises: GrammarExercise[] = [
    {
      id: 'ex-nom-1',
      patternId: 'nom-sing',
      type: 'identification',
      question: 'Identifiziere den Nominativ in: "Puer in horto ambulat."',
      options: ['Puer', 'horto', 'ambulat'],
      correctAnswer: 'Puer',
      explanation: 'Puer ist das Subjekt des Satzes und steht daher im Nominativ.',
      difficulty: 'beginner',
      points: 10
    },
    {
      id: 'ex-acc-1',
      patternId: 'acc-sing',
      type: 'transformation',
      question: 'Setze "puella" in den Akkusativ: puella → ?',
      correctAnswer: 'puellam',
      explanation: 'Die a-Deklination bildet den Akkusativ Singular mit -am.',
      difficulty: 'beginner',
      points: 15
    }
  ];

  // Filtered patterns based on search and difficulty
  const filteredPatterns = useMemo(() => {
    return grammarPatterns.filter(pattern => {
      const matchesSearch = pattern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pattern.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = difficultyFilter === 'all' || pattern.difficulty === difficultyFilter;
      return matchesSearch && matchesDifficulty;
    });
  }, [searchQuery, difficultyFilter]);

  // Start a new exercise
  const startExercise = useCallback(() => {
    const availableExercises = grammarExercises.filter(ex => 
      !userProgress.exercicesCompleted.includes(ex.id)
    );
    
    if (availableExercises.length > 0) {
      const randomExercise = availableExercises[Math.floor(Math.random() * availableExercises.length)];
      setCurrentExercise(randomExercise);
      setExerciseAnswer('');
      setShowExplanation(false);
    }
  }, [userProgress.exercicesCompleted]);

  // Submit exercise answer
  const submitAnswer = useCallback(() => {
    if (!currentExercise) return;
    
    const isCorrect = exerciseAnswer.toLowerCase().trim() === currentExercise.correctAnswer.toLowerCase();
    
    setExerciseResults(prev => [...prev, {
      exerciseId: currentExercise.id,
      correct: isCorrect,
      userAnswer: exerciseAnswer,
      correctAnswer: currentExercise.correctAnswer,
      points: isCorrect ? currentExercise.points : 0
    }]);
    
    if (isCorrect) {
      setUserProgress(prev => ({
        ...prev,
        exercicesCompleted: [...prev.exercicesCompleted, currentExercise.id],
        totalPoints: prev.totalPoints + currentExercise.points,
        currentStreak: prev.currentStreak + 1
      }));
    } else {
      setUserProgress(prev => ({
        ...prev,
        currentStreak: 0
      }));
    }
    
    setShowExplanation(true);
  }, [currentExercise, exerciseAnswer]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalExercises = exerciseResults.length;
    const correctAnswers = exerciseResults.filter(r => r.correct).length;
    const accuracy = totalExercises > 0 ? (correctAnswers / totalExercises) * 100 : 0;
    
    return {
      totalExercises,
      correctAnswers,
      accuracy: Math.round(accuracy),
      totalPoints: userProgress.totalPoints,
      currentStreak: userProgress.currentStreak,
      patternsLearned: userProgress.patternsLearned.length
    };
  }, [exerciseResults, userProgress]);

  // Render pattern card
  const renderPatternCard = (pattern: GrammarPattern) => (
    <Card key={pattern.id} className="classical-card hover:border-yellow-400/50 transition-all duration-300 cursor-pointer"
          onClick={() => setSelectedPattern(pattern.id)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">{pattern.name}</h3>
            <p className="text-sm text-gray-300 mb-2">{pattern.category}</p>
            <p className="text-white/80 text-sm">{pattern.description}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              pattern.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
              pattern.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {pattern.difficulty}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <TrendingUp className="w-3 h-3" />
              {pattern.frequency}%
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-yellow-400 mb-2">Beispiele:</h4>
            {pattern.examples.slice(0, 1).map((example, idx) => (
              <div key={idx} className="bg-black/20 rounded p-3">
                <p className="text-white font-medium ancient-text">{example.latin}</p>
                <p className="text-gray-300 text-sm">{example.translation}</p>
                <p className="text-yellow-400 text-xs mt-1">{example.analysis}</p>
              </div>
            ))}
          </div>
          
          {userProgress.patternsLearned.includes(pattern.id) && (
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <CheckCircle className="w-4 h-4" />
              Gelernt
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // Render exercise interface
  const renderExerciseInterface = () => {
    if (!currentExercise) {
      return (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-float" />
          <h3 className="text-xl font-semibold text-white mb-4 classical-heading">Bereit für Übungen?</h3>
          <p className="text-gray-300 mb-6">Teste dein Wissen mit interaktiven Grammatik-Übungen</p>
          <Button onClick={startExercise} className="classical-button">
            <Play className="w-4 h-4 mr-2" />
            Übung starten
          </Button>
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto">
        <Card className="classical-card">
          <CardContent className="p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full animate-pulse ${
                  currentExercise.difficulty === 'beginner' ? 'bg-green-400' :
                  currentExercise.difficulty === 'intermediate' ? 'bg-yellow-400' :
                  'bg-red-400'
                }`} />
                <span className="text-sm text-gray-300 capitalize">{currentExercise.difficulty}</span>
                <span className="text-sm text-gray-300">•</span>
                <span className="text-sm text-yellow-400">{currentExercise.points} Punkte</span>
              </div>
              <Button variant="outline" size="sm" onClick={startExercise}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-6">{currentExercise.question}</h3>
            
            {currentExercise.options ? (
              <div className="space-y-3 mb-6">
                {currentExercise.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => setExerciseAnswer(option)}
                    className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                      exerciseAnswer === option
                        ? 'bg-yellow-400/20 border-yellow-400 text-white shadow-golden'
                        : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className="mb-6">
                <input
                  type="text"
                  value={exerciseAnswer}
                  onChange={(e) => setExerciseAnswer(e.target.value)}
                  placeholder="Ihre Antwort..."
                  className="classical-input w-full"
                />
              </div>
            )}
            
            <div className="flex gap-3">
              <Button
                onClick={submitAnswer}
                disabled={!exerciseAnswer || showExplanation}
                className="classical-button flex-1"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Antwort prüfen
              </Button>
              <Button variant="outline" onClick={() => setCurrentExercise(null)}>
                Überspringen
              </Button>
            </div>
            
            {showExplanation && (
              <Alert className="mt-6">
                <div className="flex items-start gap-3">
                  {exerciseAnswer.toLowerCase().trim() === currentExercise.correctAnswer.toLowerCase() ? (
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium text-white mb-2">
                      {exerciseAnswer.toLowerCase().trim() === currentExercise.correctAnswer.toLowerCase()
                        ? 'Richtig!' : 'Leider falsch'}
                    </p>
                    <p className="text-gray-300 mb-2">
                      Korrekte Antwort: <span className="font-medium text-yellow-400 ancient-text">{currentExercise.correctAnswer}</span>
                    </p>
                    <AlertDescription className="text-gray-300">
                      {currentExercise.explanation}
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen night-sky-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold classical-heading mb-4">
            Grammar Explainer - TIER 1 COMPLETE
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Entdecken Sie lateinische Grammatik mit KI-gestützter Mustererkennung und adaptiven Übungen
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <Card className="classical-card">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2 animate-pulse" />
              <p className="text-sm text-gray-300">Genauigkeit</p>
              <p className="text-lg font-semibold text-white">{stats.accuracy}%</p>
            </CardContent>
          </Card>
          
          <Card className="classical-card">
            <CardContent className="p-4 text-center">
              <Award className="w-6 h-6 text-yellow-400 mx-auto mb-2 animate-pulse-gold" />
              <p className="text-sm text-gray-300">Punkte</p>
              <p className="text-lg font-semibold text-white">{stats.totalPoints}</p>
            </CardContent>
          </Card>
          
          <Card className="classical-card">
            <CardContent className="p-4 text-center">
              <Zap className="w-6 h-6 text-orange-400 mx-auto mb-2 animate-twinkle" />
              <p className="text-sm text-gray-300">Serie</p>
              <p className="text-lg font-semibold text-white">{stats.currentStreak}</p>
            </CardContent>
          </Card>
          
          <Card className="classical-card">
            <CardContent className="p-4 text-center">
              <BookOpen className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-gray-300">Muster</p>
              <p className="text-lg font-semibold text-white">{stats.patternsLearned}</p>
            </CardContent>
          </Card>
          
          <Card className="classical-card">
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-sm text-gray-300">Übungen</p>
              <p className="text-lg font-semibold text-white">{stats.totalExercises}</p>
            </CardContent>
          </Card>
          
          <Card className="classical-card">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-sm text-gray-300">Richtig</p>
              <p className="text-lg font-semibold text-white">{stats.correctAnswers}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Interface */}
        <div className="max-w-6xl mx-auto">
          <Tabs value={currentMode} onValueChange={(value: string) => setCurrentMode(value as GrammarMode)}>
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/10 backdrop-blur-sm">
              <TabsTrigger value="overview" className="text-white">
                <BookOpen className="w-4 h-4 mr-2" />
                Übersicht
              </TabsTrigger>
              <TabsTrigger value="patterns" className="text-white">
                <Brain className="w-4 h-4 mr-2" />
                Muster
              </TabsTrigger>
              <TabsTrigger value="exercises" className="text-white">
                <Target className="w-4 h-4 mr-2" />
                Übungen
              </TabsTrigger>
              <TabsTrigger value="progress" className="text-white">
                <Star className="w-4 h-4 mr-2" />
                Fortschritt
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="classical-card">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Willkommen beim Grammar Explainer</h3>
                    <p className="text-gray-300 mb-4">
                      Entdecken Sie lateinische Grammatik durch KI-gestützte Mustererkennung. Unser System 
                      analysiert authentische Texte und hilft Ihnen, grammatische Strukturen zu verstehen.
                    </p>
                    <div className="flex gap-3">
                      <Button onClick={() => setCurrentMode('patterns')} className="classical-button">
                        Muster erkunden
                      </Button>
                      <Button onClick={() => setCurrentMode('exercises')} variant="outline">
                        Übungen starten
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="classical-card">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Ihre Statistiken</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Gelernte Muster:</span>
                        <span className="text-white font-medium">{stats.patternsLearned}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Absolvierte Übungen:</span>
                        <span className="text-white font-medium">{stats.totalExercises}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Genauigkeit:</span>
                        <span className="text-white font-medium">{stats.accuracy}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Aktuelle Serie:</span>
                        <span className="text-white font-medium">{stats.currentStreak}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="patterns" className="space-y-6">
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Muster suchen..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="classical-input w-full pl-10 pr-4 py-2"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                    className="classical-input px-4 py-2"
                  >
                    <option value="all">Alle Schwierigkeiten</option>
                    <option value="beginner">Anfänger</option>
                    <option value="intermediate">Fortgeschritten</option>
                    <option value="advanced">Experte</option>
                  </select>
                </div>
              </div>
              
              {/* Pattern Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPatterns.map(renderPatternCard)}
              </div>
              
              {filteredPatterns.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Keine Muster gefunden</h3>
                  <p className="text-gray-300">Versuchen Sie andere Suchbegriffe oder Filter.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="exercises" className="space-y-6">
              {renderExerciseInterface()}
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="classical-card">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Lernfortschritt</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Gesamtfortschritt</span>
                          <span className="text-white">{Math.round((stats.patternsLearned / grammarPatterns.length) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(stats.patternsLearned / grammarPatterns.length) * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Übungsgenauigkeit</span>
                          <span className="text-white">{stats.accuracy}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-green-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${stats.accuracy}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="classical-card">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Erfolge</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-yellow-400/20 rounded-lg border border-yellow-400/30">
                        <Trophy className="w-6 h-6 text-yellow-400 animate-pulse" />
                        <div>
                          <p className="text-white font-medium">Erste Schritte</p>
                          <p className="text-gray-300 text-sm">Erstes Muster gelernt</p>
                        </div>
                      </div>
                      
                      {stats.currentStreak >= 5 && (
                        <div className="flex items-center gap-3 p-3 bg-orange-400/20 rounded-lg border border-orange-400/30">
                          <Zap className="w-6 h-6 text-orange-400 animate-twinkle" />
                          <div>
                            <p className="text-white font-medium">Im Flow</p>
                            <p className="text-gray-300 text-sm">5 richtige Antworten in Folge</p>
                          </div>
                        </div>
                      )}
                      
                      {stats.totalPoints >= 100 && (
                        <div className="flex items-center gap-3 p-3 bg-purple-400/20 rounded-lg border border-purple-400/30">
                          <Star className="w-6 h-6 text-purple-400 animate-pulse-gold" />
                          <div>
                            <p className="text-white font-medium">Punktesammler</p>
                            <p className="text-gray-300 text-sm">100 Punkte erreicht</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default GrammarExplainerTier1Complete;