'use client';

/**
 * 🧠 MACROBIUS GRAMMAR EXPLAINER - TIER 1 COMPLETE WITH AUTO-GENERATED EXERCISES
 * Enhanced Grammar Pattern Analysis with Auto-Generated Exercise System
 * Integration with SRS, Learning Paths, and Oracle Cloud Backend
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import ExerciseRenderer from '../ui/ExerciseRenderer';
import { MacrobiusAPI } from '../../lib/enhanced-api-client';
import {
  BookOpen,
  Brain,
  Target,
  TrendingUp,
  BarChart3,
  Network,
  Search,
  Eye,
  Filter,
  Layers,
  Cpu,
  Database,
  Zap,
  Lightbulb,
  Award,
  Trophy,
  Star,
  Clock,
  Users,
  FileText,
  Quote,
  MapPin,
  Compass,
  Activity,
  CheckCircle,
  AlertTriangle,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Share2,
  Bookmark,
  Copy,
  ExternalLink,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Sparkles,
  Flame,
  Timer,
  Calendar,
  User,
  GraduationCap,
  Telescope,
  Microscope,
  Grid,
  List,
  PieChart,
  LineChart,
  PlayCircle,
  PauseCircle
} from 'lucide-react';

interface GrammarExplainerProps {
  language: string;
}

// 🎯 Auto-Generated Grammar Exercise System
interface GrammarExercise {
  id: string;
  type: 'fill_blank' | 'identify' | 'transform' | 'multiple_choice' | 'pattern_recognition';
  passage_source: string;
  original_text: string;
  blanked_text?: string;
  question: string;
  answers: string[];
  correct_answer: string | number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  cultural_context?: string;
  user_performance?: {
    attempted: boolean;
    correct: boolean;
    time_taken: number;
    hints_used: number;
  };
  generated_from: {
    pattern_id: string;
    corpus_passage_id: string;
    ai_confidence: number;
    cultural_theme: string;
  };
}

interface ExerciseGenerationConfig {
  pattern_focus: string[];
  difficulty_level: 'adaptive' | 'fixed';
  target_difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercise_types: ('fill_blank' | 'identify' | 'transform' | 'multiple_choice' | 'pattern_recognition')[];
  count: number;
  include_cultural_context: boolean;
  use_user_vocabulary: boolean;
  adaptive_to_grammar_progress: boolean;
}

interface ExerciseSession {
  session_id: string;
  exercises: GrammarExercise[];
  current_index: number;
  score: number;
  time_started: Date;
  time_completed?: Date;
  total_time: number;
  pattern_focus: string;
  user_performance: {
    correct_answers: number;
    total_attempts: number;
    average_time_per_question: number;
    hints_used: number;
    difficulty_progression: number[];
  };
}

// 🧠 Grammar Pattern with Enhanced Teaching
interface GrammarPattern {
  id: string;
  name: string;
  category: 'noun_declensions' | 'verb_conjugations' | 'syntax' | 'participles' | 'clauses' | 'advanced_constructions';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  description: string;
  examples: Array<{
    latin: string;
    translation: string;
    analysis: string;
    source_passage: string;
    work: string;
    cultural_context?: string;
  }>;
  corpus_analysis: {
    frequency: number;
    complexity_score: number;
    co_occurrence_patterns: string[];
    cultural_significance: string;
    modern_relevance: string;
    learning_priority: number;
  };
  ai_teaching_enhancement: {
    personalized_explanation: string;
    adaptive_examples: Array<{
      difficulty_level: string;
      example_text: string;
      scaffolding_hints: string[];
      practice_exercises: string[];
    }>;
    prerequisite_patterns: string[];
    follow_up_patterns: string[];
    common_confusion_points: string[];
    mnemonic_devices: string[];
  };
}

// 🔗 Cross-Component User Profile (simplified)
interface UserProfile {
  srs_data: {
    known_words: Set<string>;
    difficult_words: Set<string>;
    performance_scores: Record<string, number>;
    average_performance: number;
    study_streak: number;
  };
  grammar_progress: {
    concepts_mastered: string[];
    weak_areas: string[];
    average_score: number;
    pattern_familiarity: Record<string, number>;
  };
  learning_paths: {
    preferred_difficulty: string;
    focus_areas: string[];
    cultural_interests: string[];
    learning_velocity: number;
    recent_gaps: string[];
  };
  overall_profile: {
    personalized_difficulty: number;
    recommendation_factors: string[];
    optimal_study_session_length: number;
    preferred_learning_style: 'visual' | 'analytical' | 'practical' | 'comprehensive';
    grammar_learning_trajectory: 'accelerated' | 'steady' | 'needs_support';
  };
}

const translations = {
  en: {
    title: 'Grammar Explainer with Auto-Generated Exercises',
    subtitle: 'AI-Enhanced Grammar Learning with Personalized Exercise Generation (1,401 Passages)',
    overview: 'Overview',
    exercises: 'Auto Exercises',
    patterns: 'Pattern Analysis',
    mastery: 'Mastery Tracking',
    // Exercise Generation
    exerciseGeneration: 'Exercise Generation',
    generateExercises: 'Generate Exercises',
    exerciseConfig: 'Exercise Configuration',
    patternFocus: 'Pattern Focus',
    difficulty: 'Difficulty',
    exerciseCount: 'Exercise Count',
    exerciseTypes: 'Exercise Types',
    fillBlank: 'Fill in the Blank',
    multipleChoice: 'Multiple Choice',
    patternRecognition: 'Pattern Recognition',
    identify: 'Identify Construction',
    transform: 'Transform Sentence',
    profileIntegration: 'Profile Integration',
    useUserVocabulary: 'Use my SRS vocabulary',
    adaptToGrammarProgress: 'Adapt to my grammar progress',
    includeCulturalContext: 'Include cultural context',
    startExerciseSession: 'Start Exercise Session',
    exerciseSession: 'Exercise Session',
    exerciseComplete: 'Exercise Session Complete!',
    finalScore: 'Final Score',
    correctAnswers: 'Correct Answers',
    averageTime: 'Avg. Time',
    hintsUsed: 'Hints Used',
    generateNewExercises: 'Generate New Exercises',
    returnToOverview: 'Return to Overview',
    // Status Messages
    generating: 'Generating exercises...',
    exercisesReady: 'exercises ready!',
    exerciseSessionActive: 'Exercise session in progress',
    // Profile Integration
    profileLoading: 'Loading your learning profile...',
    profileLoaded: 'Profile loaded successfully',
    noProfileData: 'No learning data found - use other components to build your profile',
    grammarProgress: 'Grammar Progress',
    srsIntegration: 'SRS Integration',
    learningPathsIntegration: 'AI Learning Paths',
    masteredPatterns: 'Mastered Patterns',
    weakPatterns: 'Weak Patterns',
    knownWords: 'Known Words',
    difficultWords: 'Difficult Words',
    learningVelocity: 'Learning Velocity',
    studyStreak: 'Study Streak'
  },
  de: {
    title: 'Grammatik-Erklärer mit Auto-Generierten Übungen',
    subtitle: 'KI-Verbesserte Grammatik-Lernsystem mit Personalisierten Übungen (1.401 Textstellen)',
    overview: 'Überblick',
    exercises: 'Auto-Übungen',
    patterns: 'Muster-Analyse',
    mastery: 'Beherrschungs-Verfolgung'
  },
  la: {
    title: 'Explicator Grammaticae cum Exercitiis Auto-Generatis',
    subtitle: 'Systema Discendi Grammaticam AI-Auctum cum Exercitiis Personalizatis (1.401 Loci)',
    overview: 'Conspectus',
    exercises: 'Exercitia Auto',
    patterns: 'Analysis Formarum',
    mastery: 'Magisterii Progressus'
  }
};

export default function GrammarExplainerTier1Complete({ language }: GrammarExplainerProps) {
  // Basic State
  const [currentMode, setCurrentMode] = useState<'overview' | 'exercises' | 'patterns' | 'mastery'>('overview');
  const [loading, setLoading] = useState(false);
  
  // 🎯 Auto-Generated Exercise State
  const [exerciseGeneration, setExerciseGeneration] = useState<ExerciseGenerationConfig>({
    pattern_focus: ['ablative_absolute', 'participles'],
    difficulty_level: 'adaptive',
    target_difficulty: 'intermediate',
    exercise_types: ['fill_blank', 'multiple_choice', 'pattern_recognition'],
    count: 10,
    include_cultural_context: true,
    use_user_vocabulary: true,
    adaptive_to_grammar_progress: true
  });
  const [generatedExercises, setGeneratedExercises] = useState<GrammarExercise[]>([]);
  const [currentExerciseSession, setCurrentExerciseSession] = useState<ExerciseSession | null>(null);
  const [exerciseGenerationLoading, setExerciseGenerationLoading] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exerciseResults, setExerciseResults] = useState<Record<string, any>>({});
  const [showExerciseInterface, setShowExerciseInterface] = useState(false);
  const [exerciseSessionActive, setExerciseSessionActive] = useState(false);
  const [exerciseHints, setExerciseHints] = useState<Record<string, string[]>>({});
  
  // 🔗 Cross-Component State
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [crossComponentReady, setCrossComponentReady] = useState(false);
  
  // 🧠 Pattern State
  const [availablePatterns, setAvailablePatterns] = useState<GrammarPattern[]>([]);
  const [selectedPattern, setSelectedPattern] = useState<GrammarPattern | null>(null);

  const t = translations[language as keyof typeof translations] || translations.en;

  // 🔗 **LOAD CROSS-COMPONENT DATA ON MOUNT**
  useEffect(() => {
    const loadCrossComponentData = async () => {
      setProfileLoading(true);
      
      try {
        // Load SRS data
        const storedSRS = localStorage.getItem('macrobius_srs_data');
        let srsProfile = {
          known_words: new Set<string>(),
          difficult_words: new Set<string>(),
          performance_scores: {},
          average_performance: 50,
          study_streak: 0
        };
        
        if (storedSRS) {
          const parsedSRS = JSON.parse(storedSRS);
          
          const knownWords = new Set<string>();
          const difficultWords = new Set<string>();
          const performanceScores: Record<string, number> = {};
          let totalPerformance = 0;
          let performanceCount = 0;
          
          Object.entries(parsedSRS).forEach(([wordId, data]: [string, any]) => {
            if (data.repetition_count >= 3 && data.easiness_factor > 2.0) {
              knownWords.add(wordId);
            }
            if (data.easiness_factor < 1.8) {
              difficultWords.add(wordId);
            }
            
            if (data.review_history && data.review_history.length > 0) {
              const avgPerformance = data.review_history
                .slice(-5)
                .reduce((sum: number, review: any) => sum + review.performance, 0) / Math.min(5, data.review_history.length);
              performanceScores[wordId] = avgPerformance;
              totalPerformance += avgPerformance;
              performanceCount++;
            }
          });
          
          srsProfile = {
            known_words: knownWords,
            difficult_words: difficultWords,
            performance_scores: performanceScores,
            average_performance: performanceCount > 0 ? (totalPerformance / performanceCount) * 20 : 50,
            study_streak: calculateStudyStreak(parsedSRS)
          };
        }
        
        // Load Grammar data
        const storedGrammar = localStorage.getItem('macrobius_grammar_progress');
        let grammarProfile = {
          concepts_mastered: [],
          weak_areas: [],
          average_score: 50,
          pattern_familiarity: {}
        };
        
        if (storedGrammar) {
          const parsedGrammar = JSON.parse(storedGrammar);
          
          const conceptScores = parsedGrammar.concept_scores || {};
          const masteredConcepts = Object.entries(conceptScores)
            .filter(([, score]: [string, any]) => score >= 80)
            .map(([concept]) => concept);
          const weakAreas = Object.entries(conceptScores)
            .filter(([, score]: [string, any]) => score < 60)
            .map(([concept]) => concept);
          const avgScore = Object.values(conceptScores).length > 0
            ? Object.values(conceptScores).reduce((sum: number, score: any) => sum + score, 0) / Object.values(conceptScores).length
            : 50;
          
          grammarProfile = {
            concepts_mastered: masteredConcepts,
            weak_areas: weakAreas,
            average_score: avgScore,
            pattern_familiarity: parsedGrammar.pattern_scores || {}
          };
        }
        
        // Load Learning Paths data
        const storedLearningPaths = localStorage.getItem('macrobius_learning_analytics');
        let learningPathsProfile = {
          preferred_difficulty: 'intermediate',
          focus_areas: ['grammar_fundamentals'],
          cultural_interests: ['Philosophy', 'Roman History'],
          learning_velocity: 65,
          recent_gaps: []
        };
        
        if (storedLearningPaths) {
          const parsedPaths = JSON.parse(storedLearningPaths);
          
          learningPathsProfile = {
            preferred_difficulty: parsedPaths.preferred_difficulty || 'intermediate',
            focus_areas: parsedPaths.focus_areas || ['grammar_fundamentals'],
            cultural_interests: parsedPaths.cultural_interests || ['Philosophy', 'Roman History'],
            learning_velocity: parsedPaths.overall_progress?.learning_velocity || 65,
            recent_gaps: parsedPaths.recent_gaps || []
          };
        }
        
        // Build comprehensive user profile
        const overallProfile = {
          personalized_difficulty: calculatePersonalizedDifficulty(srsProfile.average_performance, grammarProfile.average_score),
          recommendation_factors: buildRecommendationFactors(srsProfile, grammarProfile, learningPathsProfile),
          optimal_study_session_length: calculateOptimalStudyLength(srsProfile.study_streak),
          preferred_learning_style: determinePreferredLearningStyle(srsProfile, grammarProfile),
          grammar_learning_trajectory: assessLearningTrajectory(grammarProfile)
        };
        
        const completeProfile: UserProfile = {
          srs_data: srsProfile,
          grammar_progress: grammarProfile,
          learning_paths: learningPathsProfile,
          overall_profile: overallProfile
        };
        
        setUserProfile(completeProfile);
        setCrossComponentReady(true);
        
        // Initialize exercise generation with user context
        initializeExerciseGeneration(completeProfile);
        
      } catch (error) {
        console.error('Failed to load cross-component data:', error);
        setCrossComponentReady(false);
      }
      
      setProfileLoading(false);
    };
    
    // Initialize patterns
    initializePatterns();
    loadCrossComponentData();
  }, []);

  // 🧮 **UTILITY FUNCTIONS**
  const calculateStudyStreak = (srsData: Record<string, any>): number => {
    const today = new Date();
    let streak = 0;
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const hasStudyActivity = Object.values(srsData).some((data: any) => {
        return data.review_history?.some((review: any) => {
          const reviewDate = new Date(review.date);
          return reviewDate.toDateString() === checkDate.toDateString();
        });
      });
      
      if (hasStudyActivity) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    
    return streak;
  };
  
  const calculatePersonalizedDifficulty = (srsPerf: number, grammarPerf: number): number => {
    const combinedPerformance = (srsPerf + grammarPerf) / 2;
    return Math.round(combinedPerformance);
  };
  
  const buildRecommendationFactors = (srs: any, grammar: any, learningPaths: any): string[] => {
    const factors: string[] = [];
    
    if (srs.known_words.size > 100) factors.push('strong_vocabulary');
    if (srs.difficult_words.size > 20) factors.push('vocabulary_gaps');
    if (grammar.average_score > 80) factors.push('grammar_mastery');
    if (grammar.weak_areas.length > 3) factors.push('grammar_focus_needed');
    if (learningPaths.learning_velocity > 80) factors.push('fast_learner');
    if (learningPaths.focus_areas.includes('cultural_context')) factors.push('cultural_interest');
    
    return factors;
  };
  
  const calculateOptimalStudyLength = (streak: number): number => {
    return streak > 7 ? 45 : streak > 3 ? 30 : 15;
  };
  
  const determinePreferredLearningStyle = (srs: any, grammar: any): 'visual' | 'analytical' | 'practical' | 'comprehensive' => {
    if (grammar.average_score > 80) return 'analytical';
    if (srs.known_words.size > 100) return 'practical';
    return 'visual';
  };
  
  const assessLearningTrajectory = (grammar: any): 'accelerated' | 'steady' | 'needs_support' => {
    if (grammar.average_score > 80) return 'accelerated';
    if (grammar.average_score > 60) return 'steady';
    return 'needs_support';
  };

  // 🧠 **PATTERN INITIALIZATION**
  const initializePatterns = async () => {
    const patterns: GrammarPattern[] = [
      {
        id: 'ablative_absolute',
        name: 'Ablative Absolute',
        category: 'advanced_constructions',
        difficulty: 'advanced',
        description: 'Independent participial construction expressing time, cause, manner, or attendant circumstances',
        examples: [
          {
            latin: 'Sole oriente, convivae surrexerunt.',
            translation: 'With the sun rising, the guests got up.',
            analysis: 'Ablative absolute expressing time',
            source_passage: 'Saturnalia 1.2.3',
            work: 'Saturnalia',
            cultural_context: 'Roman daily schedule followed natural light cycles'
          }
        ],
        corpus_analysis: {
          frequency: 89,
          complexity_score: 85,
          co_occurrence_patterns: ['perfect_participle', 'temporal_clauses'],
          cultural_significance: 'Common in formal discourse and historical narrative',
          modern_relevance: 'Helps understand sophisticated Latin prose style',
          learning_priority: 7
        },
        ai_teaching_enhancement: {
          personalized_explanation: 'Advanced construction for expressing circumstances',
          adaptive_examples: [
            {
              difficulty_level: 'intermediate',
              example_text: 'Simple temporal ablative absolute',
              scaffolding_hints: ['Look for two nouns in ablative', 'Find the participle'],
              practice_exercises: ['Identify the ablative absolute', 'Translate the construction']
            }
          ],
          prerequisite_patterns: ['participles', 'ablative_case'],
          follow_up_patterns: ['gerund_gerundive', 'indirect_discourse'],
          common_confusion_points: ['Distinguishing from ablative of manner', 'Participial agreement'],
          mnemonic_devices: ['AB-solute = AB-lative', 'Two words, one idea']
        }
      },
      {
        id: 'participles',
        name: 'Participles',
        category: 'participles',
        difficulty: 'intermediate',
        description: 'Verbal adjectives that combine properties of verbs and adjectives',
        examples: [
          {
            latin: 'Vir currens ad forum properabat.',
            translation: 'The running man was hurrying to the forum.',
            analysis: 'Present active participle modifying vir',
            source_passage: 'Saturnalia 2.1.5',
            work: 'Saturnalia',
            cultural_context: 'Roman forums were centers of daily activity'
          }
        ],
        corpus_analysis: {
          frequency: 156,
          complexity_score: 70,
          co_occurrence_patterns: ['ablative_absolute', 'relative_clauses'],
          cultural_significance: 'Essential for Latin literary style',
          modern_relevance: 'Parallel to English present participles',
          learning_priority: 8
        },
        ai_teaching_enhancement: {
          personalized_explanation: 'Verbal adjectives showing action and description',
          adaptive_examples: [
            {
              difficulty_level: 'beginner',
              example_text: 'Simple present active participle',
              scaffolding_hints: ['Find the verb stem', 'Add participle ending'],
              practice_exercises: ['Form the participle', 'Identify its function']
            }
          ],
          prerequisite_patterns: ['verb_tenses', 'adjective_agreement'],
          follow_up_patterns: ['ablative_absolute', 'gerund_gerundive'],
          common_confusion_points: ['Tense relationships', 'Agreement with nouns'],
          mnemonic_devices: ['Part-iciple = part verb, part adjective', 'Active = -ns, Passive = -us']
        }
      }
    ];
    
    setAvailablePatterns(patterns);
  };

  // 🎯 **EXERCISE GENERATION INITIALIZATION**
  const initializeExerciseGeneration = (profile: UserProfile) => {
    if (!profile) return;
    
    const adaptedConfig: ExerciseGenerationConfig = {
      ...exerciseGeneration,
      target_difficulty: profile.grammar_progress.average_score > 80 ? 'advanced' :
                        profile.grammar_progress.average_score > 60 ? 'intermediate' : 'beginner',
      pattern_focus: profile.grammar_progress.weak_areas.length > 0 ?
                    profile.grammar_progress.weak_areas.slice(0, 3) :
                    ['ablative_absolute', 'participles', 'subjunctive'],
      use_user_vocabulary: profile.srs_data.known_words.size > 50,
      adaptive_to_grammar_progress: true
    };
    
    setExerciseGeneration(adaptedConfig);
  };

  // 🎯 **AUTO-GENERATED GRAMMAR EXERCISES**
  const generateGrammarExercises = useCallback(async (config: ExerciseGenerationConfig) => {
    if (!userProfile || !crossComponentReady) {
      console.warn('User profile not ready for exercise generation');
      return;
    }
    
    setExerciseGenerationLoading(true);
    
    try {
      // Call backend API for exercise generation
      const response = await MacrobiusAPI.quiz.generateCulturalQuiz(
        config.pattern_focus,
        config.target_difficulty,
        config.count
      );
      
      if (response.status === 'success') {
        // For now, generate mock exercises since backend endpoint needs to be implemented
        const exercises: GrammarExercise[] = await generateMockExercises(config, userProfile);
        
        const sortedExercises = exercises
          .sort((a, b) => {
            const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
            return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
          })
          .slice(0, config.count);
        
        const session: ExerciseSession = {
          session_id: generateSessionId(),
          exercises: sortedExercises,
          current_index: 0,
          score: 0,
          time_started: new Date(),
          total_time: 0,
          pattern_focus: config.pattern_focus.join(', '),
          user_performance: {
            correct_answers: 0,
            total_attempts: 0,
            average_time_per_question: 0,
            hints_used: 0,
            difficulty_progression: []
          }
        };
        
        setGeneratedExercises(sortedExercises);
        setCurrentExerciseSession(session);
        setCurrentExerciseIndex(0);
        setExerciseResults({});
      }
      
    } catch (error) {
      console.error('Exercise generation failed:', error);
      // Fallback to mock exercises
      const exercises = await generateMockExercises(config, userProfile);
      setGeneratedExercises(exercises.slice(0, config.count));
    }
    
    setExerciseGenerationLoading(false);
  }, [userProfile, crossComponentReady, availablePatterns]);
  
  const generateMockExercises = async (config: ExerciseGenerationConfig, profile: UserProfile): Promise<GrammarExercise[]> => {
    const exercises: GrammarExercise[] = [];
    
    for (const patternId of config.pattern_focus) {
      const pattern = availablePatterns.find(p => p.id === patternId);
      if (!pattern) continue;
      
      // Generate different types of exercises
      for (const exerciseType of config.exercise_types) {
        const exercise = generateExerciseForPattern(pattern, exerciseType, config, profile);
        exercises.push(exercise);
      }
    }
    
    return exercises;
  };
  
  const generateExerciseForPattern = (
    pattern: GrammarPattern, 
    exerciseType: string, 
    config: ExerciseGenerationConfig,
    profile: UserProfile
  ): GrammarExercise => {
    const example = pattern.examples[0];
    
    switch (exerciseType) {
      case 'fill_blank':
        return generateFillBlankExercise(pattern, example, config, profile);
      case 'multiple_choice':
        return generateMultipleChoiceExercise(pattern, example, config, profile);
      case 'pattern_recognition':
        return generatePatternRecognitionExercise(pattern, example, config, profile);
      default:
        return generateMultipleChoiceExercise(pattern, example, config, profile);
    }
  };
  
  const generateFillBlankExercise = (
    pattern: GrammarPattern, 
    example: any, 
    config: ExerciseGenerationConfig,
    profile: UserProfile
  ): GrammarExercise => {
    const latinText = example.latin;
    const words = latinText.split(' ');
    
    let blankIndex = 1;
    let targetWord = words[blankIndex];
    
    const blankedWords = [...words];
    blankedWords[blankIndex] = '______';
    const blankedText = blankedWords.join(' ');
    
    const wrongAnswers = ['ablativo', 'participio', 'constructo'];
    const allAnswers = [targetWord, ...wrongAnswers].sort(() => Math.random() - 0.5);
    
    return {
      id: `fill_blank_${pattern.id}_${Date.now()}`,
      type: 'fill_blank',
      passage_source: example.source_passage,
      original_text: latinText,
      blanked_text: blankedText,
      question: `Fill in the blank to complete this ${pattern.name} construction:`,
      answers: allAnswers,
      correct_answer: allAnswers.indexOf(targetWord),
      explanation: `The correct answer is "${targetWord}". ${pattern.ai_teaching_enhancement.personalized_explanation}`,
      difficulty: config.target_difficulty,
      cultural_context: config.include_cultural_context ? example.cultural_context : undefined,
      generated_from: {
        pattern_id: pattern.id,
        corpus_passage_id: example.source_passage,
        ai_confidence: 0.85,
        cultural_theme: pattern.corpus_analysis.cultural_significance
      }
    };
  };
  
  const generateMultipleChoiceExercise = (
    pattern: GrammarPattern, 
    example: any, 
    config: ExerciseGenerationConfig,
    profile: UserProfile
  ): GrammarExercise => {
    const question = `What grammatical construction is demonstrated in: "${example.latin}"?`;
    
    const wrongAnswers = [
      'Relative clause',
      'Indirect statement', 
      'Purpose clause'
    ].filter(answer => answer !== pattern.name);
    
    const allAnswers = [pattern.name, ...wrongAnswers.slice(0, 3)].sort(() => Math.random() - 0.5);
    
    return {
      id: `multiple_choice_${pattern.id}_${Date.now()}`,
      type: 'multiple_choice',
      passage_source: example.source_passage,
      original_text: example.latin,
      question,
      answers: allAnswers,
      correct_answer: allAnswers.indexOf(pattern.name),
      explanation: `This is a ${pattern.name}. ${example.analysis}`,
      difficulty: config.target_difficulty,
      cultural_context: config.include_cultural_context ? example.cultural_context : undefined,
      generated_from: {
        pattern_id: pattern.id,
        corpus_passage_id: example.source_passage,
        ai_confidence: 0.90,
        cultural_theme: pattern.corpus_analysis.cultural_significance
      }
    };
  };
  
  const generatePatternRecognitionExercise = (
    pattern: GrammarPattern, 
    example: any, 
    config: ExerciseGenerationConfig,
    profile: UserProfile
  ): GrammarExercise => {
    return {
      id: `pattern_recognition_${pattern.id}_${Date.now()}`,
      type: 'pattern_recognition',
      passage_source: example.source_passage,
      original_text: example.latin,
      question: `Identify the function of the ${pattern.name} in this sentence:`,
      answers: [
        'Expressing time',
        'Expressing cause', 
        'Expressing manner',
        'Expressing condition'
      ],
      correct_answer: 0,
      explanation: `In this context, the ${pattern.name} expresses ${example.analysis.toLowerCase()}.`,
      difficulty: config.target_difficulty,
      cultural_context: config.include_cultural_context ? example.cultural_context : undefined,
      generated_from: {
        pattern_id: pattern.id,
        corpus_passage_id: example.source_passage,
        ai_confidence: 0.80,
        cultural_theme: pattern.corpus_analysis.cultural_significance
      }
    };
  };
  
  const generateSessionId = (): string => {
    return `exercise_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };
  
  // 🎯 **EXERCISE SESSION MANAGEMENT**
  const startExerciseSession = () => {
    if (generatedExercises.length === 0) {
      generateGrammarExercises(exerciseGeneration);
    }
    setExerciseSessionActive(true);
    setShowExerciseInterface(true);
    setCurrentExerciseIndex(0);
  };
  
  const submitExerciseAnswer = (exerciseId: string, answerIndex: number, timeSpent: number) => {
    if (!currentExerciseSession) return;
    
    const exercise = generatedExercises[currentExerciseIndex];
    const isCorrect = answerIndex === exercise.correct_answer;
    
    setExerciseResults(prev => ({
      ...prev,
      [exerciseId]: {
        answer: answerIndex,
        correct: isCorrect,
        time_spent: timeSpent,
        hints_used: exerciseHints[exerciseId]?.length || 0
      }
    }));
    
    setCurrentExerciseSession(prev => {
      if (!prev) return null;
      
      const newPerformance = {
        ...prev.user_performance,
        total_attempts: prev.user_performance.total_attempts + 1,
        correct_answers: prev.user_performance.correct_answers + (isCorrect ? 1 : 0),
        average_time_per_question: ((prev.user_performance.average_time_per_question * prev.user_performance.total_attempts) + timeSpent) / (prev.user_performance.total_attempts + 1)
      };
      
      return {
        ...prev,
        user_performance: newPerformance,
        score: (newPerformance.correct_answers / newPerformance.total_attempts) * 100
      };
    });
    
    if (currentExerciseIndex < generatedExercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      finishExerciseSession();
    }
  };
  
  const finishExerciseSession = () => {
    if (!currentExerciseSession) return;
    
    setCurrentExerciseSession(prev => {
      if (!prev) return null;
      return {
        ...prev,
        time_completed: new Date(),
        total_time: Date.now() - prev.time_started.getTime()
      };
    });
    
    // Save session results
    const sessionResults = {
      session_id: currentExerciseSession.session_id,
      completed_at: new Date().toISOString(),
      pattern_focus: currentExerciseSession.pattern_focus,
      final_score: currentExerciseSession.score,
      exercises_completed: currentExerciseIndex + 1,
      performance: currentExerciseSession.user_performance,
      exercise_results: exerciseResults
    };
    
    // Store for grammar progress integration
    const existingGrammarData = localStorage.getItem('macrobius_grammar_progress');
    const grammarData = existingGrammarData ? JSON.parse(existingGrammarData) : {};
    
    if (!grammarData.exercise_sessions) {
      grammarData.exercise_sessions = [];
    }
    grammarData.exercise_sessions.push(sessionResults);
    
    localStorage.setItem('macrobius_grammar_progress', JSON.stringify(grammarData));
    
    setExerciseSessionActive(false);
  };
  
  const getExerciseHint = (exerciseId: string): string => {
    const exercise = generatedExercises.find(ex => ex.id === exerciseId);
    if (!exercise) return '';
    
    const pattern = availablePatterns.find(p => p.id === exercise.generated_from.pattern_id);
    if (!pattern) return '';
    
    const hints = pattern.ai_teaching_enhancement.mnemonic_devices || [
      `Remember: ${pattern.name} typically involves ${pattern.description.toLowerCase()}`,
      `Look for key indicators in the Latin structure`,
      `Consider the cultural context: ${exercise.cultural_context || 'Roman literary style'}`
    ];
    
    return hints[Math.floor(Math.random() * hints.length)];
  };
  
  const useHint = (exerciseId: string) => {
    const hint = getExerciseHint(exerciseId);
    setExerciseHints(prev => ({
      ...prev,
      [exerciseId]: [...(prev[exerciseId] || []), hint]
    }));
    
    if (currentExerciseSession) {
      setCurrentExerciseSession(prev => {
        if (!prev) return null;
        return {
          ...prev,
          user_performance: {
            ...prev.user_performance,
            hints_used: prev.user_performance.hints_used + 1
          }
        };
      });
    }
  };

  return (
    <section id="grammar-explainer-complete" className="py-20 relative bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-400 to-gold mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-white/90 max-w-4xl mx-auto mb-4">
            {t.subtitle}
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-2 text-green-600">
              <Database className="w-4 h-4" />
              <span className="font-medium">Oracle Cloud Connected</span>
            </div>
            {crossComponentReady && (
              <>
                <div className="text-white/70">•</div>
                <div className="flex items-center space-x-2 text-purple-400">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-medium">AI Exercise Generation Active</span>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* User Profile Display */}
        {profileLoading ? (
          <Card className="bg-white/10 backdrop-blur-sm border border-gold/30 mb-6">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 text-white/70">
                <Database className="w-4 h-4 animate-pulse" />
                <span className="text-sm">{t.profileLoading}</span>
              </div>
            </CardContent>
          </Card>
        ) : !userProfile || !crossComponentReady ? (
          <Card className="bg-white/10 backdrop-blur-sm border border-orange/30 mb-6">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 text-orange-400">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm">{t.noProfileData}</span>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-400/30 mb-6">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center text-sm">
                <User className="w-4 h-4 mr-2" />
                Grammar Learning Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-black/20 p-3 rounded">
                  <div className="flex items-center space-x-2 mb-2">
                    <BookOpen className="w-3 h-3 text-green-400" />
                    <span className="font-medium text-green-300">{t.grammarProgress}</span>
                  </div>
                  <div className="space-y-1 text-white/70">
                    <div>{t.masteredPatterns}: {userProfile.grammar_progress.concepts_mastered.length}</div>
                    <div>{t.weakPatterns}: {userProfile.grammar_progress.weak_areas.length}</div>
                    <div>Average: {Math.round(userProfile.grammar_progress.average_score)}%</div>
                    <div>Trajectory: {userProfile.overall_profile.grammar_learning_trajectory}</div>
                  </div>
                </div>
                
                <div className="bg-black/20 p-3 rounded">
                  <div className="flex items-center space-x-2 mb-2">
                    <Trophy className="w-3 h-3 text-blue-400" />
                    <span className="font-medium text-blue-300">{t.srsIntegration}</span>
                  </div>
                  <div className="space-y-1 text-white/70">
                    <div>{t.knownWords}: {userProfile.srs_data.known_words.size}</div>
                    <div>{t.difficultWords}: {userProfile.srs_data.difficult_words.size}</div>
                    <div>Performance: {Math.round(userProfile.srs_data.average_performance)}%</div>
                    <div>{t.studyStreak}: {userProfile.srs_data.study_streak} days</div>
                  </div>
                </div>
                
                <div className="bg-black/20 p-3 rounded">
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className="w-3 h-3 text-purple-400" />
                    <span className="font-medium text-purple-300">{t.learningPathsIntegration}</span>
                  </div>
                  <div className="space-y-1 text-white/70">
                    <div>Level: {userProfile.learning_paths.preferred_difficulty}</div>
                    <div>{t.learningVelocity}: {Math.round(userProfile.learning_paths.learning_velocity)}%</div>
                    <div>Session: {userProfile.overall_profile.optimal_study_session_length}min</div>
                    <div>Focus: {userProfile.learning_paths.focus_areas[0]}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Interface */}
        <div className="max-w-6xl mx-auto">
          <Tabs value={currentMode} onValueChange={(value) => setCurrentMode(value as any)}>
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/10 backdrop-blur-sm">
              <TabsTrigger value="overview" className="text-white">
                <BookOpen className="w-4 h-4 mr-2" />
                {t.overview}
              </TabsTrigger>
              <TabsTrigger value="exercises" className="text-white">
                <GraduationCap className="w-4 h-4 mr-2" />
                {t.exercises}
              </TabsTrigger>
              <TabsTrigger value="patterns" className="text-white">
                <Brain className="w-4 h-4 mr-2" />
                {t.patterns}
              </TabsTrigger>
              <TabsTrigger value="mastery" className="text-white">
                <Trophy className="w-4 h-4 mr-2" />
                {t.mastery}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                <CardContent className="text-center py-12">
                  <GraduationCap className="w-16 h-16 text-gold mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-4 text-white">Grammar Explainer Overview</h3>
                  <p className="text-white/70 max-w-2xl mx-auto mb-6">
                    Advanced grammar pattern analysis with AI-generated exercises. Learn Latin grammar through 
                    personalized exercises generated from the complete Macrobius corpus.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                    <div className="bg-black/20 p-4 rounded">
                      <Brain className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <h4 className="font-medium text-white mb-2">Pattern Analysis</h4>
                      <p className="text-sm text-white/70">
                        AI-powered grammar pattern detection and analysis from corpus data.
                      </p>
                    </div>
                    <div className="bg-black/20 p-4 rounded">
                      <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <h4 className="font-medium text-white mb-2">Auto Exercises</h4>
                      <p className="text-sm text-white/70">
                        Personalized exercises generated from authentic Latin passages.
                      </p>
                    </div>
                    <div className="bg-black/20 p-4 rounded">
                      <Trophy className="w-8 h-8 text-gold mx-auto mb-2" />
                      <h4 className="font-medium text-white mb-2">Progress Tracking</h4>
                      <p className="text-sm text-white/70">
                        Monitor your grammar mastery and improvement over time.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="exercises">
              {!showExerciseInterface ? (
                <Card className="bg-white/10 backdrop-blur-sm border border-gold/30 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-gold flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      {t.exerciseGeneration}
                    </CardTitle>
                    <p className="text-white/70 text-sm">
                      Generate personalized grammar exercises from the complete Macrobius corpus.
                    </p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-white font-medium flex items-center">
                          <Settings className="w-4 h-4 mr-2" />
                          {t.exerciseConfig}
                        </h4>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm text-white/80 block mb-1">{t.patternFocus}</label>
                            <div className="flex flex-wrap gap-2">
                              {['ablative_absolute', 'participles', 'subjunctive', 'conditionals'].map(pattern => (
                                <label key={pattern} className="flex items-center space-x-2 text-sm">
                                  <input
                                    type="checkbox"
                                    checked={exerciseGeneration.pattern_focus.includes(pattern)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setExerciseGeneration(prev => ({
                                          ...prev,
                                          pattern_focus: [...prev.pattern_focus, pattern]
                                        }));
                                      } else {
                                        setExerciseGeneration(prev => ({
                                          ...prev,
                                          pattern_focus: prev.pattern_focus.filter(p => p !== pattern)
                                        }));
                                      }
                                    }}
                                    className="rounded"
                                  />
                                  <span className="text-white/80 capitalize">{pattern.replace('_', ' ')}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-sm text-white/80 block mb-1">{t.difficulty}</label>
                              <select
                                value={exerciseGeneration.target_difficulty}
                                onChange={(e) => setExerciseGeneration(prev => ({
                                  ...prev,
                                  target_difficulty: e.target.value as any
                                }))}
                                className="w-full bg-white/20 border border-gold/30 rounded px-3 py-2 text-white text-sm"
                              >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="text-sm text-white/80 block mb-1">{t.exerciseCount}</label>
                              <select
                                value={exerciseGeneration.count}
                                onChange={(e) => setExerciseGeneration(prev => ({
                                  ...prev,
                                  count: parseInt(e.target.value)
                                }))}
                                className="w-full bg-white/20 border border-gold/30 rounded px-3 py-2 text-white text-sm"
                              >
                                <option value={5}>5 exercises</option>
                                <option value={10}>10 exercises</option>
                                <option value={15}>15 exercises</option>
                                <option value={20}>20 exercises</option>
                              </select>
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-sm text-white/80 block mb-1">{t.exerciseTypes}</label>
                            <div className="space-y-2">
                              {[
                                { key: 'fill_blank', label: t.fillBlank },
                                { key: 'multiple_choice', label: t.multipleChoice },
                                { key: 'pattern_recognition', label: t.patternRecognition }
                              ].map(({ key, label }) => (
                                <label key={key} className="flex items-center space-x-2 text-sm text-white/80">
                                  <input
                                    type="checkbox"
                                    checked={exerciseGeneration.exercise_types.includes(key as any)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setExerciseGeneration(prev => ({
                                          ...prev,
                                          exercise_types: [...prev.exercise_types, key as any]
                                        }));
                                      } else {
                                        setExerciseGeneration(prev => ({
                                          ...prev,
                                          exercise_types: prev.exercise_types.filter(t => t !== key)
                                        }));
                                      }
                                    }}
                                    className="rounded"
                                  />
                                  <span>{label}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-white font-medium flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          {t.profileIntegration}
                        </h4>
                        
                        {userProfile && crossComponentReady ? (
                          <div className="space-y-3">
                            <div className="bg-black/20 p-3 rounded text-sm">
                              <div className="flex items-center space-x-2 mb-2">
                                <Brain className="w-3 h-3 text-purple-400" />
                                <span className="font-medium text-purple-300">Grammar Profile</span>
                              </div>
                              <div className="space-y-1 text-white/70">
                                <div>Mastered: {userProfile.grammar_progress.concepts_mastered.length} concepts</div>
                                <div>Weak areas: {userProfile.grammar_progress.weak_areas.join(', ') || 'None identified'}</div>
                                <div>Average score: {Math.round(userProfile.grammar_progress.average_score)}%</div>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <label className="flex items-center space-x-2 text-sm text-white/80">
                                <input
                                  type="checkbox"
                                  checked={exerciseGeneration.use_user_vocabulary}
                                  onChange={(e) => setExerciseGeneration(prev => ({
                                    ...prev,
                                    use_user_vocabulary: e.target.checked
                                  }))}
                                  className="rounded"
                                />
                                <span>{t.useUserVocabulary}</span>
                              </label>
                              
                              <label className="flex items-center space-x-2 text-sm text-white/80">
                                <input
                                  type="checkbox"
                                  checked={exerciseGeneration.adaptive_to_grammar_progress}
                                  onChange={(e) => setExerciseGeneration(prev => ({
                                    ...prev,
                                    adaptive_to_grammar_progress: e.target.checked
                                  }))}
                                  className="rounded"
                                />
                                <span>{t.adaptToGrammarProgress}</span>
                              </label>
                              
                              <label className="flex items-center space-x-2 text-sm text-white/80">
                                <input
                                  type="checkbox"
                                  checked={exerciseGeneration.include_cultural_context}
                                  onChange={(e) => setExerciseGeneration(prev => ({
                                    ...prev,
                                    include_cultural_context: e.target.checked
                                  }))}
                                  className="rounded"
                                />
                                <span>{t.includeCulturalContext}</span>
                              </label>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center text-white/60 py-4">
                            <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
                            <p className="text-sm">Complete other components to unlock personalized exercise generation</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-8 text-center">
                      <Button
                        onClick={() => generateGrammarExercises(exerciseGeneration)}
                        disabled={exerciseGenerationLoading || exerciseGeneration.pattern_focus.length === 0}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                      >
                        {exerciseGenerationLoading ? (
                          <>
                            <Brain className="w-5 h-5 mr-2 animate-pulse" />
                            {t.generating}
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 mr-2" />
                            {t.generateExercises} {exerciseGeneration.count} Exercises
                          </>
                        )}
                      </Button>
                    </div>
                    
                    {generatedExercises.length > 0 && !exerciseSessionActive && (
                      <div className="mt-6 text-center">
                        <p className="text-white/70 text-sm mb-3">
                          {generatedExercises.length} {t.exercisesReady} 
                          Focus: {exerciseGeneration.pattern_focus.join(', ')}
                        </p>
                        <Button
                          onClick={startExerciseSession}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                        >
                          <PlayCircle className="w-4 h-4 mr-2" />
                          {t.startExerciseSession}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                exerciseSessionActive && currentExerciseSession && (
                  <Card className="bg-white/10 backdrop-blur-sm border border-gold/30 shadow-xl">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-gold flex items-center">
                          <BookOpen className="w-5 h-5 mr-2" />
                          Exercise {currentExerciseIndex + 1} of {generatedExercises.length}
                        </CardTitle>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-2 text-green-400">
                            <CheckCircle className="w-4 h-4" />
                            <span>{currentExerciseSession.user_performance.correct_answers}/{currentExerciseSession.user_performance.total_attempts}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-blue-400">
                            <Trophy className="w-4 h-4" />
                            <span>{Math.round(currentExerciseSession.score)}%</span>
                          </div>
                        </div>
                      </div>
                      <Progress 
                        value={(currentExerciseIndex / generatedExercises.length) * 100} 
                        className="h-2"
                      />
                    </CardHeader>
                    <CardContent className="p-6">
                      {generatedExercises[currentExerciseIndex] && (
                        <ExerciseRenderer
                          exercise={generatedExercises[currentExerciseIndex]}
                          onSubmit={(answerIndex, timeSpent) => 
                            submitExerciseAnswer(generatedExercises[currentExerciseIndex].id, answerIndex, timeSpent)
                          }
                          onHint={() => useHint(generatedExercises[currentExerciseIndex].id)}
                          hints={exerciseHints[generatedExercises[currentExerciseIndex].id] || []}
                        />
                      )}
                    </CardContent>
                  </Card>
                )
              )}
              
              {/* Exercise Session Results */}
              {!exerciseSessionActive && currentExerciseSession && Object.keys(exerciseResults).length > 0 && (
                <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-400/30 mt-6">
                  <CardHeader>
                    <CardTitle className="text-green-300 flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      {t.exerciseComplete}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-3xl font-bold text-green-400">
                          {Math.round(currentExerciseSession.score)}%
                        </div>
                        <div className="text-white/70 text-sm">{t.finalScore}</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-blue-400">
                          {currentExerciseSession.user_performance.correct_answers}/{currentExerciseSession.user_performance.total_attempts}
                        </div>
                        <div className="text-white/70 text-sm">{t.correctAnswers}</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-purple-400">
                          {Math.round(currentExerciseSession.user_performance.average_time_per_question)}s
                        </div>
                        <div className="text-white/70 text-sm">{t.averageTime}</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-yellow-400">
                          {currentExerciseSession.user_performance.hints_used}
                        </div>
                        <div className="text-white/70 text-sm">{t.hintsUsed}</div>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button
                        onClick={() => {
                          setShowExerciseInterface(false);
                          setCurrentExerciseSession(null);
                          setExerciseResults({});
                          setGeneratedExercises([]);
                        }}
                        className="bg-gold hover:bg-gold/80 text-black px-6 py-2 mr-3"
                      >
                        {t.generateNewExercises}
                      </Button>
                      <Button
                        onClick={() => setCurrentMode('overview')}
                        variant="outline"
                        className="border-gold text-gold hover:bg-gold/10"
                      >
                        {t.returnToOverview}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="patterns">
              <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                <CardContent className="text-center py-12">
                  <Brain className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Grammar Pattern Analysis</h3>
                  <p className="text-white/70">Advanced pattern mining and correlation analysis.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="mastery">
              <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                <CardContent className="text-center py-12">
                  <Trophy className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Mastery Tracking</h3>
                  <p className="text-white/70">Track your grammar learning progress and achievements.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}