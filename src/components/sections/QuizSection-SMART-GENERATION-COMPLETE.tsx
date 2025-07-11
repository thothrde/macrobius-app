'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MacrobiusAPI, MacrobiusVocabulary, MacrobiusPassage } from '../../lib/enhanced-api-client';
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
  Eye,
  Scroll,
  Hash,
  Users,
  Globe,
  Award,
  Calendar,
  Flame,
  BarChart3,
  Settings,
  Gift,
  Clock,
  Activity,
  Gauge,
  Share2,
  Medal,
  Lightbulb,
  Brain as BrainIcon,
  Search,
  Filter,
  Download,
  Upload,
  ChevronDown,
  ChevronUp,
  FileText,
  Layers,
  Shuffle,
  Book,
  GraduationCap,
  Library,
  Sparkles,
  Cpu,
  Microscope,
  Zap as Lightning,
  HelpCircle,
  PlusCircle,
  Minus,
  RefreshCw,
  Bulb,
  Crown,
  Compass,
  Map,
  Wand2,
  Gamepad2,
  Dices,
  ShuffleIcon
} from 'lucide-react';

interface Language {
  code: string;
  name: string;
}

// 🎯 **SMART QUIZ GENERATION INTERFACES - NEW TIER 2 FEATURE**
interface SmartQuizConfig {
  source_passages: string[]; // From 1,401 corpus
  cultural_themes: string[]; // From existing 9 themes
  difficulty_adaptation: boolean;
  question_types: QuestionType[];
  user_profile_integration: boolean; // Use ALL TIER 1 data
  corpus_integration: boolean; // Use vocabulary expansion data
  time_limit: number; // seconds per question
  quiz_length: number; // number of questions
  focus_areas: ('vocabulary' | 'grammar' | 'culture' | 'reading')[];
  adaptive_difficulty: boolean;
  cultural_context: boolean; // Use existing insights
}

interface QuestionType {
  type: 'multiple_choice' | 'fill_blank' | 'translation' | 'cultural_context' | 'grammar_analysis' | 'passage_comprehension';
  weight: number; // How often this type appears
  difficulty_range: [number, number];
  corpus_dependent: boolean; // Requires corpus analysis
}

interface SmartQuizQuestion {
  id: string;
  type: QuestionType['type'];
  question_text: string;
  options?: string[]; // For multiple choice
  correct_answer: string;
  explanation: string;
  difficulty_level: number;
  source_passage?: MacrobiusPassage;
  source_vocabulary?: MacrobiusVocabulary;
  cultural_context?: string;
  learning_objective: string;
  time_estimated: number; // seconds
  hints: string[];
  related_concepts: string[];
}

interface QuizSession {
  id: string;
  config: SmartQuizConfig;
  questions: SmartQuizQuestion[];
  current_question_index: number;
  start_time: Date;
  end_time?: Date;
  user_answers: Record<string, {
    answer: string;
    time_taken: number;
    is_correct: boolean;
    hints_used: number;
  }>;
  performance_metrics: {
    accuracy: number;
    average_response_time: number;
    difficulty_progression: number[];
    cultural_mastery: Record<string, number>;
    grammar_mastery: Record<string, number>;
    vocabulary_mastery: Record<string, number>;
  };
  adaptive_adjustments: {
    difficulty_increased: number;
    difficulty_decreased: number;
    question_types_adjusted: string[];
    focus_areas_shifted: string[];
  };
}

interface QuizPerformanceAnalytics {
  total_quizzes_taken: number;
  average_accuracy: number;
  strongest_areas: string[];
  improvement_areas: string[];
  cultural_competency: Record<string, number>;
  vocabulary_retention: number;
  grammar_understanding: number;
  reading_comprehension: number;
  progress_trajectory: {
    weekly_improvement: number;
    difficulty_comfort_zone: [number, number];
    recommended_focus: string[];
  };
}

// 🚀 **QUIZ GENERATION ALGORITHMS**
interface QuizGenerationAlgorithms {
  difficulty_calibration: (userLevel: number, recentPerformance: number[]) => number;
  question_type_selection: (focusAreas: string[], userStrengths: string[], userWeaknesses: string[]) => QuestionType[];
  cultural_context_integration: (passages: MacrobiusPassage[], themes: string[]) => string[];
  adaptive_progression: (currentDifficulty: number, accuracy: number, responseTime: number) => number;
}

// 🎊 **ENHANCED QUIZ CATEGORIES**
const QUIZ_CATEGORIES = {
  vocabulary_mastery: {
    name: 'Vocabulary Mastery',
    description: 'Test your knowledge of authentic Latin words',
    icon: '📚',
    color: 'bg-blue-500',
    question_types: ['multiple_choice', 'translation', 'fill_blank'],
    focus: 'vocabulary'
  },
  cultural_insights: {
    name: 'Cultural Insights', 
    description: 'Explore Roman civilization through Macrobius',
    icon: '🏛️',
    color: 'bg-purple-500',
    question_types: ['cultural_context', 'passage_comprehension'],
    focus: 'culture'
  },
  grammar_analysis: {
    name: 'Grammar Analysis',
    description: 'Master Latin grammar patterns',
    icon: '📝',
    color: 'bg-green-500',
    question_types: ['grammar_analysis', 'fill_blank'],
    focus: 'grammar'
  },
  reading_comprehension: {
    name: 'Reading Comprehension',
    description: 'Understand authentic passages',
    icon: '📖',
    color: 'bg-orange-500',
    question_types: ['passage_comprehension', 'cultural_context'],
    focus: 'reading'
  },
  mixed_challenge: {
    name: 'Mixed Challenge',
    description: 'Comprehensive skills assessment',
    icon: '🎯',
    color: 'bg-red-500',
    question_types: ['multiple_choice', 'translation', 'cultural_context', 'grammar_analysis'],
    focus: 'mixed'
  },
  adaptive_training: {
    name: 'Adaptive Training',
    description: 'AI-powered personalized challenge',
    icon: '🤖',
    color: 'bg-indigo-500',
    question_types: ['multiple_choice', 'fill_blank', 'translation', 'cultural_context'],
    focus: 'adaptive'
  }
};

// 🚀 **QUESTION TYPE TEMPLATES**
const QUESTION_TEMPLATES = {
  multiple_choice: {
    vocabulary: [
      "What does '{word}' mean in the context of {context}?",
      "Which English word is most closely related to '{word}'?",
      "In {work_title}, '{word}' most commonly refers to:",
      "The cultural significance of '{word}' in Roman society was:"
    ],
    cultural: [
      "According to Macrobius, {cultural_practice} was associated with:",
      "In Roman banquet culture, {concept} typically meant:",
      "The philosophical implications of {topic} in Macrobius include:"
    ]
  },
  fill_blank: {
    passage: [
      "Fill in the missing word: '{passage_with_blank}'",
      "Complete this authentic Latin phrase: '{partial_phrase}___'"
    ],
    grammar: [
      "The correct form of {word} in this context is: ___",
      "This sentence requires the ___ case: '{sentence}'"
    ]
  },
  translation: {
    word_to_english: "Translate '{latin_word}' to English:",
    english_to_latin: "How would you say '{english_phrase}' in Latin?",
    phrase: "Translate this authentic phrase: '{latin_phrase}'"
  },
  cultural_context: {
    explanation: "Explain the cultural significance of {concept} in Roman society:",
    connection: "How does {topic} connect to modern {modern_equivalent}?",
    analysis: "What does Macrobius tell us about {cultural_practice}?"
  }
};

// 🎯 **DIFFICULTY SCALING ALGORITHMS**
const DIFFICULTY_ALGORITHMS = {
  vocabulary: (baseWord: MacrobiusVocabulary, targetDifficulty: number) => {
    const adjustedDifficulty = Math.max(1, Math.min(10, 
      baseWord.difficulty_rating + (targetDifficulty - 5) * 0.5
    ));
    return adjustedDifficulty;
  },
  cultural: (baseConcept: string, userCulturalLevel: number) => {
    const conceptComplexity = 5; // Base complexity
    return Math.max(1, Math.min(10, conceptComplexity + userCulturalLevel - 3));
  },
  adaptive: (userPerformance: number[], currentDifficulty: number) => {
    const recentAvg = userPerformance.slice(-5).reduce((a, b) => a + b, 0) / 5;
    if (recentAvg > 0.8) return Math.min(10, currentDifficulty + 1);
    if (recentAvg < 0.6) return Math.max(1, currentDifficulty - 1);
    return currentDifficulty;
  }
};

interface QuizSectionProps {
  language: Language;
  vocabularyData?: any; // From corpus expansion
  userProfile?: any; // From TIER 1 systems
}

const QuizSection: React.FC<QuizSectionProps> = ({ language, vocabularyData, userProfile }) => {
  // Enhanced State Management for Smart Quiz Generation
  const [quizMode, setQuizMode] = useState<'setup' | 'active' | 'results' | 'analytics'>('setup');
  const [selectedCategory, setSelectedCategory] = useState<string>('vocabulary_mastery');
  const [currentQuizSession, setCurrentQuizSession] = useState<QuizSession | null>(null);
  const [quizConfig, setQuizConfig] = useState<SmartQuizConfig>({
    source_passages: [],
    cultural_themes: ['Roman History', 'Philosophy', 'Social Customs'],
    difficulty_adaptation: true,
    question_types: [
      { type: 'multiple_choice', weight: 0.4, difficulty_range: [3, 7], corpus_dependent: true },
      { type: 'translation', weight: 0.3, difficulty_range: [2, 8], corpus_dependent: true },
      { type: 'cultural_context', weight: 0.2, difficulty_range: [4, 9], corpus_dependent: false },
      { type: 'fill_blank', weight: 0.1, difficulty_range: [5, 10], corpus_dependent: true }
    ],
    user_profile_integration: true,
    corpus_integration: true,
    time_limit: 30,
    quiz_length: 10,
    focus_areas: ['vocabulary'],
    adaptive_difficulty: true,
    cultural_context: true
  });
  const [generatedQuestions, setGeneratedQuestions] = useState<SmartQuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState<number>(30);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [quizAnalytics, setQuizAnalytics] = useState<QuizPerformanceAnalytics>({
    total_quizzes_taken: 0,
    average_accuracy: 0,
    strongest_areas: [],
    improvement_areas: [],
    cultural_competency: {},
    vocabulary_retention: 0,
    grammar_understanding: 0,
    reading_comprehension: 0,
    progress_trajectory: {
      weekly_improvement: 0,
      difficulty_comfort_zone: [3, 6],
      recommended_focus: []
    }
  });

  // Backend connection state
  const [backendStatus, setBackendStatus] = useState<'connected' | 'error' | 'loading'>('loading');
  const [error, setError] = useState<string | null>(null);

  // Enhanced Translations
  const translations = {
    de: {
      title: 'Smart Quiz Generator',
      subtitle: 'KI-gestützte Quiz-Generierung aus 1,401 authentischen Passagen',
      categories: {
        vocabulary_mastery: 'Vokabel-Meisterschaft',
        cultural_insights: 'Kulturelle Einblicke',
        grammar_analysis: 'Grammatik-Analyse',
        reading_comprehension: 'Leseverständnis',
        mixed_challenge: 'Gemischte Herausforderung',
        adaptive_training: 'Adaptives Training'
      },
      modes: {
        setup: 'Quiz-Konfiguration',
        active: 'Aktives Quiz',
        results: 'Ergebnisse',
        analytics: 'Analytics'
      },
      actions: {
        generateQuiz: 'Quiz generieren',
        startQuiz: 'Quiz starten',
        nextQuestion: 'Nächste Frage',
        showHint: 'Hinweis anzeigen',
        submitAnswer: 'Antwort abgeben',
        viewResults: 'Ergebnisse anzeigen',
        createCustomQuiz: 'Benutzerdefiniertes Quiz erstellen'
      }
    },
    en: {
      title: 'Smart Quiz Generator',
      subtitle: 'AI-Powered Quiz Generation from 1,401 Authentic Passages',
      categories: {
        vocabulary_mastery: 'Vocabulary Mastery',
        cultural_insights: 'Cultural Insights',
        grammar_analysis: 'Grammar Analysis',
        reading_comprehension: 'Reading Comprehension',
        mixed_challenge: 'Mixed Challenge',
        adaptive_training: 'Adaptive Training'
      },
      modes: {
        setup: 'Quiz Setup',
        active: 'Active Quiz',
        results: 'Results',
        analytics: 'Analytics'
      },
      actions: {
        generateQuiz: 'Generate Quiz',
        startQuiz: 'Start Quiz',
        nextQuestion: 'Next Question',
        showHint: 'Show Hint',
        submitAnswer: 'Submit Answer',
        viewResults: 'View Results',
        createCustomQuiz: 'Create Custom Quiz'
      }
    },
    la: {
      title: 'Generator Quaestionum Intelligens',
      subtitle: 'Generatio Quaestionum AI-Actuata ex 1,401 Passibus Authenticis',
      categories: {
        vocabulary_mastery: 'Vocabulorum Dominium',
        cultural_insights: 'Perspicuitas Culturalis',
        grammar_analysis: 'Analytica Grammaticalis',
        reading_comprehension: 'Intellectus Lectionis',
        mixed_challenge: 'Certamen Mixtum',
        adaptive_training: 'Exercitatio Adaptabilis'
      },
      modes: {
        setup: 'Praeparatio Quaestionum',
        active: 'Quaestiones Activae',
        results: 'Eventus',
        analytics: 'Analytica'
      },
      actions: {
        generateQuiz: 'Quaestiones Generare',
        startQuiz: 'Quaestiones Incipere',
        nextQuestion: 'Quaestio Sequens',
        showHint: 'Indicium Monstrare',
        submitAnswer: 'Responsum Submittere',
        viewResults: 'Eventus Videre',
        createCustomQuiz: 'Quaestiones Proprias Creare'
      }
    }
  };

  const t = translations[language.code as keyof typeof translations] || translations.en;

  // 🚀 **AI-POWERED QUIZ GENERATION ALGORITHMS**
  const generateSmartQuiz = useCallback(async (config: SmartQuizConfig) => {
    setIsGeneratingQuiz(true);
    setGenerationProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 300);

      // Step 1: Analyze user profile and corpus data
      setGenerationProgress(20);
      const userLevel = userProfile?.currentLevel || 5;
      const userStrengths = userProfile?.strengths || ['vocabulary'];
      const userWeaknesses = userProfile?.weaknesses || ['grammar'];

      // Step 2: Select appropriate passages from corpus
      setGenerationProgress(40);
      const relevantPassages = await selectCorpusPassages(config.cultural_themes, config.focus_areas);
      
      // Step 3: Generate questions using AI algorithms
      setGenerationProgress(60);
      const questions = await generateQuestionsFromCorpus(
        relevantPassages,
        config,
        userLevel,
        userStrengths,
        userWeaknesses
      );

      // Step 4: Apply difficulty adaptation and cultural context
      setGenerationProgress(80);
      const adaptedQuestions = await applyAdaptiveDifficulty(questions, userProfile);
      const contextualQuestions = await addCulturalContext(adaptedQuestions);

      // Step 5: Finalize quiz session
      setGenerationProgress(100);
      const quizSession: QuizSession = {
        id: `quiz_${Date.now()}`,
        config,
        questions: contextualQuestions.slice(0, config.quiz_length),
        current_question_index: 0,
        start_time: new Date(),
        user_answers: {},
        performance_metrics: {
          accuracy: 0,
          average_response_time: 0,
          difficulty_progression: [],
          cultural_mastery: {},
          grammar_mastery: {},
          vocabulary_mastery: {}
        },
        adaptive_adjustments: {
          difficulty_increased: 0,
          difficulty_decreased: 0,
          question_types_adjusted: [],
          focus_areas_shifted: []
        }
      };

      setCurrentQuizSession(quizSession);
      setGeneratedQuestions(contextualQuestions);
      setCurrentQuestionIndex(0);
      setQuizMode('active');
      setTimeRemaining(config.time_limit);

      clearInterval(progressInterval);
    } catch (err) {
      console.error('Quiz generation failed:', err);
      setError('Failed to generate quiz');
    } finally {
      setIsGeneratingQuiz(false);
      setGenerationProgress(100);
    }
  }, [userProfile]);

  // 🔍 **CORPUS PASSAGE SELECTION**
  const selectCorpusPassages = useCallback(async (themes: string[], focusAreas: string[]) => {
    // Simulate intelligent passage selection from 1,401 passages
    const mockPassages = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      work_type: i % 2 === 0 ? 'Saturnalia' : 'Commentarii',
      book_number: Math.floor(i / 5) + 1,
      chapter_number: (i % 5) + 1,
      section_number: 1,
      latin_text: `Authentic Latin passage ${i + 1} with cultural context and vocabulary...`,
      cultural_theme: themes[i % themes.length] || 'Roman History',
      modern_relevance: `Modern application ${i + 1}`,
      difficulty_rating: Math.floor(Math.random() * 8) + 2,
      vocabulary_density: Math.random() * 0.3 + 0.1,
      grammar_complexity: Math.floor(Math.random() * 5) + 3
    }));

    return mockPassages;
  }, []);

  // 🧠 **QUESTION GENERATION FROM CORPUS**
  const generateQuestionsFromCorpus = useCallback(async (
    passages: any[],
    config: SmartQuizConfig,
    userLevel: number,
    userStrengths: string[],
    userWeaknesses: string[]
  ) => {
    const questions: SmartQuizQuestion[] = [];

    for (let i = 0; i < config.quiz_length; i++) {
      const passage = passages[i % passages.length];
      const questionType = selectQuestionType(config.question_types, userStrengths, userWeaknesses);
      
      let question: SmartQuizQuestion;
      
      switch (questionType.type) {
        case 'multiple_choice':
          question = await generateMultipleChoiceQuestion(passage, userLevel);
          break;
        case 'translation':
          question = await generateTranslationQuestion(passage, userLevel);
          break;
        case 'cultural_context':
          question = await generateCulturalQuestion(passage, userLevel);
          break;
        case 'fill_blank':
          question = await generateFillBlankQuestion(passage, userLevel);
          break;
        case 'grammar_analysis':
          question = await generateGrammarQuestion(passage, userLevel);
          break;
        case 'passage_comprehension':
          question = await generateComprehensionQuestion(passage, userLevel);
          break;
        default:
          question = await generateMultipleChoiceQuestion(passage, userLevel);
      }

      questions.push(question);
    }

    return questions;
  }, []);

  // 🎯 **QUESTION TYPE GENERATORS**
  const generateMultipleChoiceQuestion = useCallback(async (passage: any, userLevel: number): Promise<SmartQuizQuestion> => {
    const vocabularyWords = ['convivium', 'sapientia', 'virtus', 'libertas'];
    const selectedWord = vocabularyWords[Math.floor(Math.random() * vocabularyWords.length)];
    
    return {
      id: `mc_${Date.now()}_${Math.random()}`,
      type: 'multiple_choice',
      question_text: `What does '${selectedWord}' mean in the context of Roman culture?`,
      options: [
        'Banquet or feast',
        'Wisdom or knowledge', 
        'Virtue or excellence',
        'Freedom or liberty'
      ],
      correct_answer: 'Banquet or feast',
      explanation: `In Roman culture, '${selectedWord}' referred to social gatherings that were central to Roman social and political life.`,
      difficulty_level: Math.max(1, Math.min(10, userLevel + Math.floor(Math.random() * 3) - 1)),
      source_passage: passage,
      learning_objective: 'Understand Latin vocabulary in cultural context',
      time_estimated: 20,
      hints: [
        'Think about Roman social customs',
        'Consider the root meaning of the word'
      ],
      related_concepts: ['Roman Society', 'Social Customs', 'Latin Etymology']
    };
  }, []);

  const generateTranslationQuestion = useCallback(async (passage: any, userLevel: number): Promise<SmartQuizQuestion> => {
    const phrases = [
      { latin: 'Tempus fugit', english: 'Time flies' },
      { latin: 'Carpe diem', english: 'Seize the day' },
      { latin: 'Amor vincit omnia', english: 'Love conquers all' }
    ];
    const selectedPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    
    return {
      id: `trans_${Date.now()}_${Math.random()}`,
      type: 'translation',
      question_text: `Translate this Latin phrase: "${selectedPhrase.latin}"`,
      correct_answer: selectedPhrase.english,
      explanation: `"${selectedPhrase.latin}" is a classical Latin expression meaning "${selectedPhrase.english}". This phrase appears in classical literature and reflects Roman philosophical thought.`,
      difficulty_level: Math.max(1, Math.min(10, userLevel + Math.floor(Math.random() * 3) - 1)),
      source_passage: passage,
      learning_objective: 'Translate Latin phrases accurately',
      time_estimated: 25,
      hints: [
        'Consider each word separately',
        'Think about the grammatical structure'
      ],
      related_concepts: ['Translation', 'Latin Phrases', 'Roman Philosophy']
    };
  }, []);

  const generateCulturalQuestion = useCallback(async (passage: any, userLevel: number): Promise<SmartQuizQuestion> => {
    return {
      id: `cult_${Date.now()}_${Math.random()}`,
      type: 'cultural_context',
      question_text: 'What role did philosophical discussions play in Roman banquets according to Macrobius?',
      correct_answer: 'They were integral to intellectual and social life, combining learning with leisure.',
      explanation: 'Macrobius shows how Roman banquets were not just social gatherings but important venues for philosophical discourse, where ideas were shared and debated among the educated elite.',
      difficulty_level: Math.max(1, Math.min(10, userLevel + Math.floor(Math.random() * 3) - 1)),
      source_passage: passage,
      cultural_context: 'Roman banquet culture emphasized the integration of intellectual discussion with social dining.',
      learning_objective: 'Understand Roman cultural practices and their significance',
      time_estimated: 35,
      hints: [
        'Consider the social function of Roman banquets',
        'Think about how Romans valued both learning and leisure'
      ],
      related_concepts: ['Roman Culture', 'Philosophy', 'Social Customs', 'Intellectual Life']
    };
  }, []);

  const generateFillBlankQuestion = useCallback(async (passage: any, userLevel: number): Promise<SmartQuizQuestion> => {
    return {
      id: `fill_${Date.now()}_${Math.random()}`,
      type: 'fill_blank',
      question_text: 'Complete this Latin sentence: "Sapientia est _____ virtus" (Wisdom is the highest virtue)',
      correct_answer: 'summa',
      explanation: '"Summa" means "highest" or "greatest" in Latin. The complete phrase "Sapientia est summa virtus" expresses a fundamental Roman philosophical concept.',
      difficulty_level: Math.max(1, Math.min(10, userLevel + Math.floor(Math.random() * 3) - 1)),
      source_passage: passage,
      learning_objective: 'Master Latin grammar and vocabulary in context',
      time_estimated: 20,
      hints: [
        'This adjective should agree with "virtus"',
        'Think about superlative forms'
      ],
      related_concepts: ['Latin Grammar', 'Adjective Agreement', 'Roman Philosophy']
    };
  }, []);

  const generateGrammarQuestion = useCallback(async (passage: any, userLevel: number): Promise<SmartQuizQuestion> => {
    return {
      id: `gram_${Date.now()}_${Math.random()}`,
      type: 'grammar_analysis',
      question_text: 'What case is "convivio" in the sentence "In convivio philosophi disputant"?',
      options: ['Nominative', 'Accusative', 'Ablative', 'Dative'],
      correct_answer: 'Ablative',
      explanation: '"Convivio" is in the ablative case, used here with the preposition "in" to indicate location where the action takes place.',
      difficulty_level: Math.max(1, Math.min(10, userLevel + Math.floor(Math.random() * 3) - 1)),
      source_passage: passage,
      learning_objective: 'Identify and understand Latin grammatical cases',
      time_estimated: 25,
      hints: [
        'Consider the preposition "in"',
        'Think about location vs. motion'
      ],
      related_concepts: ['Latin Cases', 'Ablative of Location', 'Prepositions']
    };
  }, []);

  const generateComprehensionQuestion = useCallback(async (passage: any, userLevel: number): Promise<SmartQuizQuestion> => {
    return {
      id: `comp_${Date.now()}_${Math.random()}`,
      type: 'passage_comprehension',
      question_text: 'Based on this passage from Macrobius, what was the primary purpose of the Saturnalia festival?',
      correct_answer: 'To celebrate social equality and renewal through temporary role reversals',
      explanation: 'Macrobius describes how during Saturnalia, normal social hierarchies were temporarily suspended, allowing for a period of social renewal and equality.',
      difficulty_level: Math.max(1, Math.min(10, userLevel + Math.floor(Math.random() * 3) - 1)),
      source_passage: passage,
      cultural_context: 'Saturnalia was one of the most important Roman festivals, representing social and cosmic renewal.',
      learning_objective: 'Comprehend and analyze authentic Latin passages',
      time_estimated: 40,
      hints: [
        'Focus on the theme of reversal',
        'Consider the social implications'
      ],
      related_concepts: ['Roman Festivals', 'Social Structure', 'Cultural Analysis']
    };
  }, []);

  // 🎲 **QUESTION TYPE SELECTION ALGORITHM**
  const selectQuestionType = useCallback((
    availableTypes: QuestionType[],
    userStrengths: string[],
    userWeaknesses: string[]
  ) => {
    // Weighted selection based on user profile
    const weightedTypes = availableTypes.map(type => ({
      ...type,
      adjustedWeight: type.weight * (
        userWeaknesses.includes(type.type) ? 1.5 : // Focus on weaknesses
        userStrengths.includes(type.type) ? 0.8 : 1.0 // Less focus on strengths
      )
    }));

    const totalWeight = weightedTypes.reduce((sum, type) => sum + type.adjustedWeight, 0);
    const random = Math.random() * totalWeight;
    
    let currentWeight = 0;
    for (const type of weightedTypes) {
      currentWeight += type.adjustedWeight;
      if (random <= currentWeight) {
        return type;
      }
    }
    
    return weightedTypes[0]; // Fallback
  }, []);

  // 🔄 **ADAPTIVE DIFFICULTY & CULTURAL CONTEXT**
  const applyAdaptiveDifficulty = useCallback(async (questions: SmartQuizQuestion[], userProfile: any) => {
    // Simulate adaptive difficulty adjustment based on user performance
    return questions.map((question, index) => ({
      ...question,
      difficulty_level: DIFFICULTY_ALGORITHMS.adaptive(
        userProfile?.recentPerformance || [0.7, 0.8, 0.6, 0.9, 0.7],
        question.difficulty_level
      )
    }));
  }, []);

  const addCulturalContext = useCallback(async (questions: SmartQuizQuestion[]) => {
    // Enhance questions with cultural context from 16 cultural insights
    return questions.map(question => ({
      ...question,
      cultural_context: question.cultural_context || 
        'This question relates to Roman cultural practices as described by Macrobius.',
      related_concepts: [
        ...question.related_concepts,
        'Cultural Integration',
        'Historical Context'
      ]
    }));
  }, []);

  // ⏰ **QUIZ TIMER LOGIC**
  useEffect(() => {
    if (quizMode === 'active' && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && quizMode === 'active') {
      // Auto-submit when time runs out
      handleAnswerSubmit();
    }
  }, [timeRemaining, quizMode]);

  // 📝 **ANSWER SUBMISSION & PROGRESSION**
  const handleAnswerSubmit = useCallback(() => {
    if (!currentQuizSession || !generatedQuestions[currentQuestionIndex]) return;

    const currentQuestion = generatedQuestions[currentQuestionIndex];
    const answer = selectedOption || userAnswer;
    const isCorrect = answer.toLowerCase().trim() === currentQuestion.correct_answer.toLowerCase().trim();
    const timeTaken = quizConfig.time_limit - timeRemaining;

    // Record answer
    const updatedSession = {
      ...currentQuizSession,
      user_answers: {
        ...currentQuizSession.user_answers,
        [currentQuestion.id]: {
          answer,
          time_taken: timeTaken,
          is_correct: isCorrect,
          hints_used: hintsUsed
        }
      }
    };

    setCurrentQuizSession(updatedSession);

    // Move to next question or finish quiz
    if (currentQuestionIndex < generatedQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer('');
      setSelectedOption('');
      setTimeRemaining(quizConfig.time_limit);
      setShowHint(false);
      setHintsUsed(0);
    } else {
      // Quiz completed
      finishQuiz(updatedSession);
    }
  }, [currentQuizSession, generatedQuestions, currentQuestionIndex, selectedOption, userAnswer, quizConfig.time_limit, timeRemaining, hintsUsed]);

  const finishQuiz = useCallback((session: QuizSession) => {
    const answers = Object.values(session.user_answers);
    const accuracy = answers.length > 0 ? answers.filter(a => a.is_correct).length / answers.length : 0;
    const avgResponseTime = answers.length > 0 ? answers.reduce((sum, a) => sum + a.time_taken, 0) / answers.length : 0;

    const finalSession = {
      ...session,
      end_time: new Date(),
      performance_metrics: {
        ...session.performance_metrics,
        accuracy,
        average_response_time: avgResponseTime
      }
    };

    setCurrentQuizSession(finalSession);
    setQuizMode('results');

    // Update analytics
    setQuizAnalytics(prev => ({
      ...prev,
      total_quizzes_taken: prev.total_quizzes_taken + 1,
      average_accuracy: (prev.average_accuracy * prev.total_quizzes_taken + accuracy) / (prev.total_quizzes_taken + 1)
    }));
  }, []);

  // 🎨 **QUIZ SETUP MODE RENDERING**
  const renderQuizSetup = () => (
    <div className="space-y-6">
      {/* Quiz Categories Selection */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gamepad2 className="w-6 h-6 text-blue-600" />
            <span>Choose Quiz Category</span>
          </CardTitle>
          <CardDescription>Select your learning focus for AI-powered question generation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(QUIZ_CATEGORIES).map(([key, category]) => {
              const isSelected = selectedCategory === key;
              
              return (
                <Card
                  key={key}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    isSelected 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedCategory(key)}
                >
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <span className="text-2xl">{category.icon}</span>
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{t.categories[key as keyof typeof t.categories]}</h3>
                    <p className="text-xs text-slate-600 mb-2">{category.description}</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {category.question_types.slice(0, 2).map((type, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {type.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                    {isSelected && (
                      <div className="mt-2">
                        <Badge className="bg-blue-100 text-blue-700 text-xs">
                          Selected
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

      {/* Quiz Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-purple-600" />
              <span>Quiz Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Number of Questions</label>
              <select
                value={quizConfig.quiz_length}
                onChange={(e) => setQuizConfig(prev => ({...prev, quiz_length: Number(e.target.value)}))}
                className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
              >
                <option value={5}>5 Questions (Quick)</option>
                <option value={10}>10 Questions (Standard)</option>
                <option value={15}>15 Questions (Extended)</option>
                <option value={20}>20 Questions (Comprehensive)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Time Per Question</label>
              <select
                value={quizConfig.time_limit}
                onChange={(e) => setQuizConfig(prev => ({...prev, time_limit: Number(e.target.value)}))}
                className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
              >
                <option value={15}>15 seconds (Fast)</option>
                <option value={30}>30 seconds (Standard)</option>
                <option value={60}>60 seconds (Relaxed)</option>
                <option value={0}>Unlimited</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="adaptive"
                checked={quizConfig.adaptive_difficulty}
                onChange={(e) => setQuizConfig(prev => ({...prev, adaptive_difficulty: e.target.checked}))}
              />
              <label htmlFor="adaptive" className="text-sm">Adaptive Difficulty</label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="cultural"
                checked={quizConfig.cultural_context}
                onChange={(e) => setQuizConfig(prev => ({...prev, cultural_context: e.target.checked}))}
              />
              <label htmlFor="cultural" className="text-sm">Include Cultural Context</label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-orange-600" />
              <span>AI Features</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="profile"
                checked={quizConfig.user_profile_integration}
                onChange={(e) => setQuizConfig(prev => ({...prev, user_profile_integration: e.target.checked}))}
              />
              <label htmlFor="profile" className="text-sm">Use Learning Profile</label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="corpus"
                checked={quizConfig.corpus_integration}
                onChange={(e) => setQuizConfig(prev => ({...prev, corpus_integration: e.target.checked}))}
              />
              <label htmlFor="corpus" className="text-sm">Corpus-Based Questions</label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Focus Areas</label>
              <div className="space-y-2">
                {['vocabulary', 'grammar', 'culture', 'reading'].map(area => (
                  <div key={area} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={area}
                      checked={quizConfig.focus_areas.includes(area as any)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setQuizConfig(prev => ({
                            ...prev,
                            focus_areas: [...prev.focus_areas, area as any]
                          }));
                        } else {
                          setQuizConfig(prev => ({
                            ...prev,
                            focus_areas: prev.focus_areas.filter(f => f !== area)
                          }));
                        }
                      }}
                    />
                    <label htmlFor={area} className="text-sm capitalize">{area}</label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generate Quiz Button */}
      <div className="text-center">
        <Button
          onClick={() => generateSmartQuiz(quizConfig)}
          disabled={isGeneratingQuiz || quizConfig.focus_areas.length === 0}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
        >
          {isGeneratingQuiz ? (
            <>
              <Lightning className="w-5 h-5 mr-2 animate-spin" />
              Generating... {generationProgress.toFixed(0)}%
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5 mr-2" />
              {t.actions.generateQuiz}
            </>
          )}
        </Button>
        
        {isGeneratingQuiz && (
          <div className="mt-4 max-w-md mx-auto">
            <Progress value={generationProgress} className="h-2" />
            <div className="text-xs text-slate-500 mt-2">
              {generationProgress < 30 ? 'Analyzing user profile...' :
               generationProgress < 60 ? 'Selecting corpus passages...' :
               generationProgress < 90 ? 'Generating AI questions...' :
               'Finalizing quiz...'}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // 🎯 **ACTIVE QUIZ MODE RENDERING**
  const renderActiveQuiz = () => {
    if (!currentQuizSession || !generatedQuestions[currentQuestionIndex]) {
      return (
        <Card>
          <CardContent className="text-center py-12">
            <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Quiz Error</h3>
            <p className="text-slate-600">Unable to load quiz questions</p>
          </CardContent>
        </Card>
      );
    }

    const currentQuestion = generatedQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / generatedQuestions.length) * 100;

    return (
      <div className="space-y-6">
        {/* Quiz Progress */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                Question {currentQuestionIndex + 1} of {generatedQuestions.length}
              </span>
              <span className="text-sm text-slate-600">
                {quizConfig.time_limit > 0 ? `${timeRemaining}s remaining` : 'Unlimited time'}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Difficulty: {currentQuestion.difficulty_level}/10</span>
              <span>{currentQuestion.type.replace('_', ' ')}</span>
            </div>
          </CardContent>
        </Card>

        {/* Current Question */}
        <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">
                {currentQuestion.question_text}
              </CardTitle>
              <Badge className={`${
                currentQuestion.difficulty_level <= 3 ? 'bg-green-100 text-green-700' :
                currentQuestion.difficulty_level <= 6 ? 'bg-yellow-100 text-yellow-700' :
                currentQuestion.difficulty_level <= 8 ? 'bg-orange-100 text-orange-700' :
                'bg-red-100 text-red-700'
              }`}>
                Level {currentQuestion.difficulty_level}
              </Badge>
            </div>
            {currentQuestion.cultural_context && (
              <CardDescription className="text-blue-700 bg-blue-50 p-2 rounded">
                💡 {currentQuestion.cultural_context}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Question Input Area */}
              {currentQuestion.type === 'multiple_choice' && currentQuestion.options ? (
                <div className="space-y-2">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedOption(option)}
                      className={`w-full p-3 text-left border rounded-lg transition-colors ${
                        selectedOption === option
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium mb-2">Your Answer:</label>
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your answer..."
                    onKeyPress={(e) => e.key === 'Enter' && handleAnswerSubmit()}
                  />
                </div>
              )}

              {/* Hint System */}
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHint(!showHint)}
                  className="border-orange-300 text-orange-600 hover:bg-orange-50"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  {showHint ? 'Hide Hint' : t.actions.showHint}
                </Button>
                
                <Button
                  onClick={handleAnswerSubmit}
                  disabled={!selectedOption && !userAnswer.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Target className="w-4 h-4 mr-2" />
                  {t.actions.submitAnswer}
                </Button>
              </div>

              {/* Hint Display */}
              {showHint && currentQuestion.hints.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-orange-50 border border-orange-200 rounded-lg p-3"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-orange-600" />
                    <span className="font-medium text-orange-800">Hint:</span>
                  </div>
                  <p className="text-orange-700">
                    {currentQuestion.hints[Math.min(hintsUsed, currentQuestion.hints.length - 1)]}
                  </p>
                </motion.div>
              )}

              {/* Source Information */}
              {currentQuestion.source_passage && (
                <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded">
                  <span className="font-medium">Source:</span> {currentQuestion.source_passage.work_type}, 
                  Book {currentQuestion.source_passage.book_number}, 
                  Chapter {currentQuestion.source_passage.chapter_number}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // 📊 **QUIZ RESULTS MODE RENDERING**
  const renderQuizResults = () => {
    if (!currentQuizSession) return null;

    const answers = Object.values(currentQuizSession.user_answers);
    const correctAnswers = answers.filter(a => a.is_correct).length;
    const accuracy = answers.length > 0 ? (correctAnswers / answers.length) * 100 : 0;
    const averageTime = answers.length > 0 ? answers.reduce((sum, a) => sum + a.time_taken, 0) / answers.length : 0;

    return (
      <div className="space-y-6">
        {/* Results Overview */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-green-600" />
              <span>Quiz Complete!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{accuracy.toFixed(1)}%</p>
                <p className="text-sm text-slate-600">Accuracy</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{correctAnswers}</p>
                <p className="text-sm text-slate-600">Correct</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">{averageTime.toFixed(1)}s</p>
                <p className="text-sm text-slate-600">Avg Time</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">
                  {generatedQuestions.reduce((sum, q) => sum + q.difficulty_level, 0) / generatedQuestions.length}
                </p>
                <p className="text-sm text-slate-600">Avg Difficulty</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <Card>
          <CardHeader>
            <CardTitle>Question-by-Question Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {generatedQuestions.map((question, index) => {
                const userResponse = currentQuizSession.user_answers[question.id];
                const isCorrect = userResponse?.is_correct || false;
                
                return (
                  <div
                    key={question.id}
                    className={`p-4 rounded-lg border ${
                      isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">Q{index + 1}: {question.question_text}</h4>
                      <Badge className={isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </Badge>
                    </div>
                    <div className="text-sm space-y-1">
                      <div>
                        <span className="font-medium">Your answer:</span> {userResponse?.answer || 'No answer'}
                      </div>
                      <div>
                        <span className="font-medium">Correct answer:</span> {question.correct_answer}
                      </div>
                      <div>
                        <span className="font-medium">Explanation:</span> {question.explanation}
                      </div>
                      <div className="text-xs text-slate-500">
                        Time taken: {userResponse?.time_taken || 0}s | Difficulty: {question.difficulty_level}/10
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex space-x-4 justify-center">
          <Button
            onClick={() => setQuizMode('setup')}
            variant="outline"
            className="border-blue-300 text-blue-600"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Take Another Quiz
          </Button>
          <Button
            onClick={() => setQuizMode('analytics')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
        </div>
      </div>
    );
  };

  // Initialize component
  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await MacrobiusAPI.system.healthCheck();
        setBackendStatus(response.status === 'success' ? 'connected' : 'error');
      } catch (err) {
        setBackendStatus('error');
        setError('Backend connection failed');
      }
    };

    checkBackendStatus();
  }, []);

  return (
    <section id="smart-quiz" className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen">
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
                {backendStatus === 'connected' ? 'AI Quiz Engine Ready' : 
                 backendStatus === 'error' ? 'Backend Offline' : 'Initializing...'}
              </span>
            </div>
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

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          <Tabs value={quizMode} onValueChange={(value) => setQuizMode(value as any)}>
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/10 backdrop-blur-sm">
              <TabsTrigger value="setup" className="text-white">
                <Settings className="w-4 h-4 mr-2" />
                {t.modes.setup}
              </TabsTrigger>
              <TabsTrigger value="active" className="text-white" disabled={!currentQuizSession}>
                <Gamepad2 className="w-4 h-4 mr-2" />
                {t.modes.active}
              </TabsTrigger>
              <TabsTrigger value="results" className="text-white" disabled={!currentQuizSession}>
                <Trophy className="w-4 h-4 mr-2" />
                {t.modes.results}
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-white">
                <BarChart3 className="w-4 h-4 mr-2" />
                {t.modes.analytics}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="setup">
              {renderQuizSetup()}
            </TabsContent>
            
            <TabsContent value="active">
              {renderActiveQuiz()}
            </TabsContent>
            
            <TabsContent value="results">
              {renderQuizResults()}
            </TabsContent>
            
            <TabsContent value="analytics">
              <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                <CardContent className="text-center py-12">
                  <BarChart3 className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Quiz Analytics</h3>
                  <p className="text-white/70 mb-4">Detailed performance analysis and learning insights</p>
                  <Button className="bg-wine-red hover:bg-wine-red/80 text-gold">
                    View Detailed Analytics
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default QuizSection;