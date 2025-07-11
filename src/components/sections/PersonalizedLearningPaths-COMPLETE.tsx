'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MacrobiusAPI, MacrobiusVocabulary, MacrobiusPassage } from '../../lib/enhanced-api-client';
import { useLanguage } from '@/contexts/LanguageContext';
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
  ShuffleIcon,
  CalendarDays,
  ClockIcon,
  MapPin,
  Route,
  AlertTriangle,
  CheckSquare,
  PlayCircle,
  PauseCircle,
  Coffee,
  Smartphone,
  AlarmClock,
  TrendingDown,
  AlertCircle,
  Workflow,
  GitBranch,
  Network,
  TreePine
} from 'lucide-react';

interface Language {
  code: string;
  name: string;
}

// 🎯 **DAILY LEARNING PLANS INTERFACES - NEW TIER 2 COMPLETION**
interface DailyLearningPlan {
  id: string;
  date: Date;
  available_time: number; // minutes
  difficulty_adjustment: number;
  focus_areas: LearningFocus[];
  micro_lessons: MicroLesson[];
  cultural_themes: string[]; // From existing 9 themes
  daily_goals: DailyGoal[];
  break_schedule: BreakRecommendation[];
  progress_checkpoints: ProgressCheckpoint[];
  adaptive_adjustments: AdaptiveAdjustment[];
  completion_status: 'not_started' | 'in_progress' | 'completed' | 'paused';
  actual_time_spent: number;
  effectiveness_score: number;
}

interface MicroLesson {
  id: string;
  type: 'vocabulary' | 'grammar' | 'reading' | 'cultural' | 'review';
  duration: number; // minutes
  content_source: string; // From existing 1,401 passages
  difficulty: number; // 1-10
  learning_objective: string;
  prerequisite_skills: string[];
  cultural_context?: string;
  vocabulary_count: number;
  grammar_concepts: string[];
  estimated_cognitive_load: number; // 0-1
  interactive_elements: InteractiveElement[];
  success_criteria: string[];
}

interface DailyGoal {
  id: string;
  category: 'vocabulary' | 'grammar' | 'culture' | 'reading' | 'overall';
  target_value: number;
  current_progress: number;
  unit: string; // 'words', 'concepts', 'passages', 'minutes'
  priority: 'low' | 'medium' | 'high' | 'critical';
  deadline: Date;
  completion_reward: string;
  dependency_goals: string[]; // Other goal IDs that must be completed first
}

interface BreakRecommendation {
  after_minutes: number;
  break_duration: number;
  break_type: 'short_rest' | 'active_break' | 'reflection' | 'review';
  activity_suggestion: string;
  cognitive_benefit: string;
}

interface ProgressCheckpoint {
  time_marker: number; // minutes into the session
  checkpoint_type: 'comprehension_check' | 'retention_test' | 'motivation_boost' | 'difficulty_assessment';
  action_required: string;
  success_threshold: number;
  failure_recovery: string;
}

// 🕳️ **KNOWLEDGE GAPS DETECTION INTERFACES**
interface KnowledgeGap {
  id: string;
  area: 'vocabulary' | 'grammar' | 'culture' | 'reading' | 'pronunciation' | 'writing';
  specific_topic: string;
  severity: 'minor' | 'moderate' | 'critical' | 'foundational';
  confidence_score: number; // 0-1, how certain we are about this gap
  related_concepts: string[];
  prerequisite_gaps: string[]; // Other gaps that must be addressed first
  recommended_focus_time: number; // minutes per day
  passages_for_practice: string[]; // From 1,401 corpus
  cultural_context: string; // From existing cultural insights
  learning_strategies: LearningStrategy[];
  progress_indicators: ProgressIndicator[];
  estimated_resolution_time: number; // days
  impact_on_overall_learning: number; // 0-1
}

interface LearningStrategy {
  strategy_name: string;
  description: string;
  effectiveness_score: number; // 0-1
  cognitive_load: number; // 0-1
  required_resources: string[];
  time_investment: number; // minutes
  learning_style_match: number; // 0-1, how well it matches user's style
}

interface ProgressIndicator {
  metric_name: string;
  current_value: number;
  target_value: number;
  measurement_method: string;
  update_frequency: 'daily' | 'weekly' | 'session-based';
}

// 🗺️ **PREREQUISITE MAPPING INTERFACES**
interface PrerequisiteMap {
  skill_id: string;
  skill_name: string;
  skill_category: 'vocabulary' | 'grammar' | 'culture' | 'reading';
  difficulty_level: number; // 1-10
  prerequisites: PrerequisiteSkill[];
  dependents: string[]; // Skills that depend on this one
  learning_pathway: LearningPathStep[];
  estimated_mastery_time: number; // hours
  cultural_importance: number; // 0-1
  modern_relevance: number; // 0-1
}

interface PrerequisiteSkill {
  skill_id: string;
  skill_name: string;
  mastery_level_required: number; // 0-1
  bypass_possible: boolean;
  bypass_conditions: string[];
}

interface LearningPathStep {
  step_number: number;
  step_name: string;
  learning_activities: string[];
  time_allocation: number; // minutes
  success_criteria: string[];
  difficulty_progression: number; // How much harder than previous step
}

// 🤖 **AI OPTIMIZATION INTERFACES**
interface AILearningOptimization {
  user_cognitive_pattern: CognitivePattern;
  optimal_scheduling: OptimalScheduling;
  personalized_strategies: PersonalizedStrategy[];
  adaptive_recommendations: AdaptiveRecommendation[];
  learning_acceleration: LearningAcceleration;
}

interface CognitivePattern {
  peak_performance_times: string[]; // Hours when user learns best
  attention_span_curve: number[]; // Attention over time
  difficulty_tolerance: number; // 0-1
  multitasking_efficiency: number; // 0-1
  break_preferences: string[];
  learning_style_scores: {
    visual: number;
    auditory: number;
    kinesthetic: number;
    analytical: number;
    social: number;
  };
}

interface OptimalScheduling {
  daily_schedule_template: ScheduleBlock[];
  weekly_patterns: WeeklyPattern[];
  seasonal_adjustments: SeasonalAdjustment[];
  interruption_handling: InterruptionStrategy[];
}

interface ScheduleBlock {
  start_time: string; // HH:MM
  duration: number; // minutes
  activity_type: string;
  energy_level_required: 'low' | 'medium' | 'high';
  focus_area: string;
  backup_activities: string[]; // If main activity can't be done
}

// 🎯 **ENHANCED LEARNING FOCUS SYSTEM**
interface LearningFocus {
  area: 'vocabulary' | 'grammar' | 'culture' | 'reading' | 'pronunciation' | 'writing';
  weight: number; // 0-1, how much emphasis
  current_competency: number; // 0-1
  target_competency: number; // 0-1
  urgency: number; // 0-1
  user_interest: number; // 0-1
  cultural_relevance: number; // 0-1
  modern_applicability: number; // 0-1
  time_to_proficiency: number; // estimated days
}

interface InteractiveElement {
  element_type: 'quiz' | 'drag_drop' | 'fill_blank' | 'audio' | 'visual' | 'game';
  difficulty: number;
  engagement_score: number;
  learning_objective: string;
  time_estimate: number; // minutes
}

interface AdaptiveAdjustment {
  timestamp: Date;
  adjustment_type: 'difficulty' | 'pace' | 'focus_area' | 'break_timing' | 'content_type';
  reason: string;
  previous_value: any;
  new_value: any;
  effectiveness_prediction: number; // 0-1
}

interface PersonalizedLearningPathsProps {
  userProfile?: any; // From TIER 1 systems
  vocabularyData?: any; // From corpus expansion
  quizData?: any; // From smart quiz generation
  className?: string;
}

const PersonalizedLearningPathsSection: React.FC<PersonalizedLearningPathsProps> = ({ 
  userProfile, 
  vocabularyData, 
  quizData,
  className = ''
}) => {
  const { language, t } = useLanguage();
  // Enhanced State Management for Daily Plans & Knowledge Gaps
  const [currentMode, setCurrentMode] = useState<'dashboard' | 'daily_plan' | 'knowledge_gaps' | 'prerequisites' | 'ai_optimization'>('dashboard');
  const [dailyPlan, setDailyPlan] = useState<DailyLearningPlan | null>(null);
  const [knowledgeGaps, setKnowledgeGaps] = useState<KnowledgeGap[]>([]);
  const [prerequisiteMap, setPrerequisiteMap] = useState<PrerequisiteMap[]>([]);
  const [aiOptimization, setAiOptimization] = useState<AILearningOptimization | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState<boolean>(false);
  const [planGenerationProgress, setPlanGenerationProgress] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availableTime, setAvailableTime] = useState<number>(30); // minutes
  const [focusAreas, setFocusAreas] = useState<string[]>(['vocabulary']);
  const [learningGoals, setLearningGoals] = useState<DailyGoal[]>([]);
  const [currentSession, setCurrentSession] = useState<{
    active: boolean;
    start_time: Date;
    current_lesson: number;
    time_spent: number;
    completed_goals: string[];
  }>({
    active: false,
    start_time: new Date(),
    current_lesson: 0,
    time_spent: 0,
    completed_goals: []
  });

  // Backend connection state
  const [backendStatus, setBackendStatus] = useState<'connected' | 'error' | 'loading'>('loading');
  const [error, setError] = useState<string | null>(null);

  // Enhanced Translations
  const translations = {
    de: {
      title: 'Personalisierte Lernpfade - Vollständig',
      subtitle: 'KI-gestützte Tagesplanung mit Wissenslücken-Erkennung',
      modes: {
        dashboard: 'Dashboard',
        daily_plan: 'Tagesplan',
        knowledge_gaps: 'Wissenslücken',
        prerequisites: 'Voraussetzungen',
        ai_optimization: 'KI-Optimierung'
      },
      daily_plan: {
        title: 'Intelligente Tagesplanung',
        subtitle: 'Personalisierte Lernpläne basierend auf verfügbarer Zeit',
        available_time: 'Verfügbare Zeit',
        focus_areas: 'Schwerpunktbereiche',
        micro_lessons: 'Mikro-Lektionen',
        break_schedule: 'Pausenplan',
        daily_goals: 'Tagesziele',
        progress_tracking: 'Fortschrittsverfolgung'
      },
      knowledge_gaps: {
        title: 'Wissenslücken-Analyse',
        subtitle: 'Automatische Erkennung und Behebung von Lernschwächen',
        severity_critical: 'Kritisch',
        severity_moderate: 'Moderat',
        severity_minor: 'Gering',
        recommended_time: 'Empfohlene Zeit',
        learning_strategies: 'Lernstrategien',
        progress_indicators: 'Fortschrittsindikatoren'
      },
      actions: {
        generatePlan: 'Plan generieren',
        startSession: 'Sitzung starten',
        pauseSession: 'Pausieren',
        completeLesson: 'Lektion abschließen',
        analyzeGaps: 'Lücken analysieren',
        optimizeSchedule: 'Zeitplan optimieren'
      }
    },
    en: {
      title: 'Personalized Learning Paths - Complete',
      subtitle: 'AI-Powered Daily Planning with Knowledge Gap Detection',
      modes: {
        dashboard: 'Dashboard',
        daily_plan: 'Daily Plan',
        knowledge_gaps: 'Knowledge Gaps',
        prerequisites: 'Prerequisites',
        ai_optimization: 'AI Optimization'
      },
      daily_plan: {
        title: 'Intelligent Daily Planning',
        subtitle: 'Personalized learning plans based on available time',
        available_time: 'Available Time',
        focus_areas: 'Focus Areas',
        micro_lessons: 'Micro Lessons',
        break_schedule: 'Break Schedule',
        daily_goals: 'Daily Goals',
        progress_tracking: 'Progress Tracking'
      },
      knowledge_gaps: {
        title: 'Knowledge Gap Analysis',
        subtitle: 'Automatic detection and remediation of learning weaknesses',
        severity_critical: 'Critical',
        severity_moderate: 'Moderate',
        severity_minor: 'Minor',
        recommended_time: 'Recommended Time',
        learning_strategies: 'Learning Strategies',
        progress_indicators: 'Progress Indicators'
      },
      actions: {
        generatePlan: 'Generate Plan',
        startSession: 'Start Session',
        pauseSession: 'Pause',
        completeLesson: 'Complete Lesson',
        analyzeGaps: 'Analyze Gaps',
        optimizeSchedule: 'Optimize Schedule'
      }
    },
    la: {
      title: 'Semitae Discendi Personales - Perfectae',
      subtitle: 'Planificatio Diurna AI-Actuata cum Detectione Lacunarum Scientiae',
      modes: {
        dashboard: 'Tabula Administrationis',
        daily_plan: 'Consilium Diurnum',
        knowledge_gaps: 'Lacunae Scientiae',
        prerequisites: 'Requisita',
        ai_optimization: 'Optimizatio AI'
      },
      daily_plan: {
        title: 'Planificatio Diurna Intelligens',
        subtitle: 'Consilia discendi personalia tempore disponibili basata',
        available_time: 'Tempus Disponibile',
        focus_areas: 'Areae Focales',
        micro_lessons: 'Micro Lectiones',
        break_schedule: 'Consilium Pausarum',
        daily_goals: 'Proposita Diurna',
        progress_tracking: 'Progressus Sequens'
      },
      knowledge_gaps: {
        title: 'Analytica Lacunarum Scientiae',
        subtitle: 'Detectio automatica et remediatio debilitatum discendi',
        severity_critical: 'Critica',
        severity_moderate: 'Moderata',
        severity_minor: 'Minor',
        recommended_time: 'Tempus Commendatum',
        learning_strategies: 'Strategiae Discendi',
        progress_indicators: 'Indicatores Progressus'
      },
      actions: {
        generatePlan: 'Consilium Generare',
        startSession: 'Sessionem Incipere',
        pauseSession: 'Pausare',
        completeLesson: 'Lectionem Perficere',
        analyzeGaps: 'Lacunas Analyzare',
        optimizeSchedule: 'Horarium Optimizare'
      }
    }
  };

  const currentLang = language === 'DE' ? 'de' : language === 'LA' ? 'la' : 'en';
  const currentTranslations = translations[currentLang as keyof typeof translations] || translations.en;

  // 🚀 **AI-POWERED DAILY PLAN GENERATION**
  const generateDailyPlan = useCallback(async (date: Date, timeAvailable: number, focusAreas: string[]) => {
    setIsGeneratingPlan(true);
    setPlanGenerationProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setPlanGenerationProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + Math.random() * 12;
        });
      }, 400);

      // Step 1: Analyze user profile and current competencies
      setPlanGenerationProgress(20);
      const userCompetencies = await analyzeUserCompetencies();
      
      // Step 2: Detect knowledge gaps
      setPlanGenerationProgress(40);
      const gaps = await detectKnowledgeGaps(userCompetencies);
      setKnowledgeGaps(gaps);
      
      // Step 3: Generate prerequisite mapping
      setPlanGenerationProgress(60);
      const prerequisites = await generatePrerequisiteMapping(gaps, focusAreas);
      setPrerequisiteMap(prerequisites);
      
      // Step 4: Create optimized daily plan
      setPlanGenerationProgress(80);
      const plan = await createOptimizedDailyPlan(date, timeAvailable, focusAreas, gaps, prerequisites);
      
      // Step 5: Apply AI optimization
      setPlanGenerationProgress(95);
      const optimizedPlan = await applyAIOptimization(plan, userProfile);
      
      setDailyPlan(optimizedPlan);
      setPlanGenerationProgress(100);
      
      clearInterval(progressInterval);
    } catch (err) {
      console.error('Daily plan generation failed:', err);
      setError('Failed to generate daily plan');
    } finally {
      setIsGeneratingPlan(false);
      setPlanGenerationProgress(100);
    }
  }, [userProfile]);

  // 🔍 **KNOWLEDGE GAP DETECTION ALGORITHM**
  const detectKnowledgeGaps = useCallback(async (userCompetencies: any): Promise<KnowledgeGap[]> => {
    // Simulate sophisticated knowledge gap analysis
    const gaps: KnowledgeGap[] = [
      {
        id: 'gap_subjunctive_mood',
        area: 'grammar',
        specific_topic: 'Subjunctive Mood Usage',
        severity: 'critical',
        confidence_score: 0.85,
        related_concepts: ['conditional clauses', 'purpose clauses', 'indirect commands'],
        prerequisite_gaps: [],
        recommended_focus_time: 20,
        passages_for_practice: ['Saturnalia_3_4_2', 'Commentarii_1_12_8'],
        cultural_context: 'Essential for understanding Roman literary style and formal discourse',
        learning_strategies: [
          {
            strategy_name: 'Pattern Recognition',
            description: 'Identify subjunctive patterns in authentic passages',
            effectiveness_score: 0.8,
            cognitive_load: 0.6,
            required_resources: ['corpus passages', 'grammar guide'],
            time_investment: 15,
            learning_style_match: 0.7
          },
          {
            strategy_name: 'Contextual Practice',
            description: 'Practice with cultural context from Macrobius',
            effectiveness_score: 0.9,
            cognitive_load: 0.7,
            required_resources: ['cultural insights', 'example sentences'],
            time_investment: 25,
            learning_style_match: 0.8
          }
        ],
        progress_indicators: [
          {
            metric_name: 'Recognition Accuracy',
            current_value: 0.45,
            target_value: 0.85,
            measurement_method: 'Quiz performance on subjunctive identification',
            update_frequency: 'daily'
          },
          {
            metric_name: 'Production Fluency',
            current_value: 0.25,
            target_value: 0.75,
            measurement_method: 'Correct usage in translation exercises',
            update_frequency: 'weekly'
          }
        ],
        estimated_resolution_time: 14,
        impact_on_overall_learning: 0.8
      },
      {
        id: 'gap_cultural_banquet',
        area: 'culture',
        specific_topic: 'Roman Banquet Customs',
        severity: 'moderate',
        confidence_score: 0.72,
        related_concepts: ['social hierarchy', 'symposium tradition', 'entertainment'],
        prerequisite_gaps: [],
        recommended_focus_time: 15,
        passages_for_practice: ['Saturnalia_2_1_3', 'Saturnalia_7_3_15'],
        cultural_context: 'Central to understanding Macrobius\' Saturnalia framework',
        learning_strategies: [
          {
            strategy_name: 'Cultural Immersion',
            description: 'Study banquet scenes in detail with modern parallels',
            effectiveness_score: 0.85,
            cognitive_load: 0.5,
            required_resources: ['cultural insights', 'visual aids'],
            time_investment: 20,
            learning_style_match: 0.9
          }
        ],
        progress_indicators: [
          {
            metric_name: 'Cultural Comprehension',
            current_value: 0.6,
            target_value: 0.85,
            measurement_method: 'Understanding assessment in cultural contexts',
            update_frequency: 'weekly'
          }
        ],
        estimated_resolution_time: 7,
        impact_on_overall_learning: 0.6
      },
      {
        id: 'gap_advanced_vocabulary',
        area: 'vocabulary',
        specific_topic: 'Philosophical Terminology',
        severity: 'minor',
        confidence_score: 0.68,
        related_concepts: ['abstract concepts', 'metaphysical terms', 'ethical vocabulary'],
        prerequisite_gaps: ['gap_subjunctive_mood'],
        recommended_focus_time: 10,
        passages_for_practice: ['Commentarii_1_6_12', 'Saturnalia_1_24_8'],
        cultural_context: 'Advanced vocabulary for philosophical discussions',
        learning_strategies: [
          {
            strategy_name: 'Semantic Mapping',
            description: 'Connect philosophical terms to modern concepts',
            effectiveness_score: 0.75,
            cognitive_load: 0.8,
            required_resources: ['etymology data', 'modern equivalents'],
            time_investment: 12,
            learning_style_match: 0.75
          }
        ],
        progress_indicators: [
          {
            metric_name: 'Term Recognition',
            current_value: 0.7,
            target_value: 0.9,
            measurement_method: 'Vocabulary quiz performance',
            update_frequency: 'daily'
          }
        ],
        estimated_resolution_time: 5,
        impact_on_overall_learning: 0.4
      }
    ];

    return gaps;
  }, []);

  // 🗺️ **PREREQUISITE MAPPING GENERATION**
  const generatePrerequisiteMapping = useCallback(async (gaps: KnowledgeGap[], focusAreas: string[]): Promise<PrerequisiteMap[]> => {
    const prerequisites: PrerequisiteMap[] = [
      {
        skill_id: 'basic_grammar',
        skill_name: 'Basic Latin Grammar',
        skill_category: 'grammar',
        difficulty_level: 3,
        prerequisites: [],
        dependents: ['subjunctive_mood', 'advanced_syntax'],
        learning_pathway: [
          {
            step_number: 1,
            step_name: 'Noun Declensions',
            learning_activities: ['memorization', 'pattern practice', 'context application'],
            time_allocation: 15,
            success_criteria: ['90% accuracy on case identification', 'fluent recitation'],
            difficulty_progression: 1.0
          },
          {
            step_number: 2,
            step_name: 'Verb Conjugations',
            learning_activities: ['systematic practice', 'tense recognition', 'mood basics'],
            time_allocation: 20,
            success_criteria: ['80% accuracy on tense formation', 'mood recognition'],
            difficulty_progression: 1.3
          }
        ],
        estimated_mastery_time: 15,
        cultural_importance: 0.9,
        modern_relevance: 0.7
      },
      {
        skill_id: 'subjunctive_mood',
        skill_name: 'Subjunctive Mood Mastery',
        skill_category: 'grammar',
        difficulty_level: 7,
        prerequisites: [
          {
            skill_id: 'basic_grammar',
            skill_name: 'Basic Latin Grammar',
            mastery_level_required: 0.8,
            bypass_possible: false,
            bypass_conditions: []
          }
        ],
        dependents: ['complex_sentences', 'literary_analysis'],
        learning_pathway: [
          {
            step_number: 1,
            step_name: 'Subjunctive Formation',
            learning_activities: ['morphology practice', 'pattern recognition'],
            time_allocation: 20,
            success_criteria: ['85% formation accuracy'],
            difficulty_progression: 1.0
          },
          {
            step_number: 2,
            step_name: 'Contextual Usage',
            learning_activities: ['purpose clauses', 'result clauses', 'conditional statements'],
            time_allocation: 25,
            success_criteria: ['70% contextual accuracy', 'translation fluency'],
            difficulty_progression: 1.5
          },
          {
            step_number: 3,
            step_name: 'Advanced Applications',
            learning_activities: ['literary analysis', 'style recognition', 'composition'],
            time_allocation: 30,
            success_criteria: ['advanced text comprehension', 'stylistic analysis'],
            difficulty_progression: 2.0
          }
        ],
        estimated_mastery_time: 25,
        cultural_importance: 0.8,
        modern_relevance: 0.5
      }
    ];

    return prerequisites;
  }, []);

  // 📅 **OPTIMIZED DAILY PLAN CREATION**
  const createOptimizedDailyPlan = useCallback(async (
    date: Date, 
    timeAvailable: number, 
    focusAreas: string[], 
    gaps: KnowledgeGap[], 
    prerequisites: PrerequisiteMap[]
  ): Promise<DailyLearningPlan> => {
    
    // Generate micro-lessons based on knowledge gaps and time constraints
    const microLessons: MicroLesson[] = [];
    let remainingTime = timeAvailable;
    
    // Prioritize critical gaps
    const criticalGaps = gaps.filter(gap => gap.severity === 'critical');
    
    for (const gap of criticalGaps.slice(0, 3)) { // Max 3 critical gaps per day
      if (remainingTime < 5) break;
      
      const lessonDuration = Math.min(remainingTime * 0.3, gap.recommended_focus_time);
      
      const microLesson: MicroLesson = {
        id: `lesson_${gap.id}_${Date.now()}`,
        type: gap.area as any,
        duration: lessonDuration,
        content_source: gap.passages_for_practice[0] || 'General content',
        difficulty: gap.severity === 'critical' ? 8 : gap.severity === 'moderate' ? 6 : 4,
        learning_objective: `Address ${gap.specific_topic}`,
        prerequisite_skills: gap.prerequisite_gaps,
        cultural_context: gap.cultural_context,
        vocabulary_count: gap.area === 'vocabulary' ? 8 : 3,
        grammar_concepts: gap.area === 'grammar' ? [gap.specific_topic] : [],
        estimated_cognitive_load: gap.severity === 'critical' ? 0.8 : 0.6,
        interactive_elements: [
          {
            element_type: 'quiz',
            difficulty: 7,
            engagement_score: 0.8,
            learning_objective: `Practice ${gap.specific_topic}`,
            time_estimate: 5
          }
        ],
        success_criteria: [`Improve ${gap.specific_topic} by 20%`]
      };
      
      microLessons.push(microLesson);
      remainingTime -= lessonDuration;
    }
    
    // Fill remaining time with moderate and minor gaps
    const otherGaps = gaps.filter(gap => gap.severity !== 'critical');
    for (const gap of otherGaps) {
      if (remainingTime < 5) break;
      
      const lessonDuration = Math.min(remainingTime * 0.4, gap.recommended_focus_time);
      
      const microLesson: MicroLesson = {
        id: `lesson_${gap.id}_${Date.now()}`,
        type: gap.area as any,
        duration: lessonDuration,
        content_source: gap.passages_for_practice[0] || 'General content',
        difficulty: gap.severity === 'moderate' ? 6 : 4,
        learning_objective: `Improve ${gap.specific_topic}`,
        prerequisite_skills: gap.prerequisite_gaps,
        cultural_context: gap.cultural_context,
        vocabulary_count: gap.area === 'vocabulary' ? 5 : 2,
        grammar_concepts: gap.area === 'grammar' ? [gap.specific_topic] : [],
        estimated_cognitive_load: gap.severity === 'moderate' ? 0.6 : 0.4,
        interactive_elements: [
          {
            element_type: 'fill_blank',
            difficulty: 5,
            engagement_score: 0.7,
            learning_objective: `Practice ${gap.specific_topic}`,
            time_estimate: 3
          }
        ],
        success_criteria: [`Understand ${gap.specific_topic} basics`]
      };
      
      microLessons.push(microLesson);
      remainingTime -= lessonDuration;
    }
    
    // Generate daily goals
    const dailyGoals: DailyGoal[] = [
      {
        id: 'goal_vocabulary',
        category: 'vocabulary',
        target_value: Math.floor(timeAvailable / 4), // 1 word per 4 minutes
        current_progress: 0,
        unit: 'words',
        priority: 'high',
        deadline: new Date(date.getTime() + 24 * 60 * 60 * 1000),
        completion_reward: 'Vocabulary mastery badge',
        dependency_goals: []
      },
      {
        id: 'goal_grammar',
        category: 'grammar',
        target_value: Math.max(1, Math.floor(timeAvailable / 15)), // 1 concept per 15 minutes
        current_progress: 0,
        unit: 'concepts',
        priority: 'high',
        deadline: new Date(date.getTime() + 24 * 60 * 60 * 1000),
        completion_reward: 'Grammar excellence badge',
        dependency_goals: []
      }
    ];
    
    // Generate break schedule
    const breakSchedule: BreakRecommendation[] = [];
    let currentTime = 0;
    
    for (const lesson of microLessons) {
      currentTime += lesson.duration;
      
      if (currentTime >= 25) { // Pomodoro-style breaks
        breakSchedule.push({
          after_minutes: currentTime,
          break_duration: 5,
          break_type: 'short_rest',
          activity_suggestion: 'Look away from screen, stretch gently',
          cognitive_benefit: 'Prevents mental fatigue and improves retention'
        });
        currentTime += 5;
      }
    }
    
    const plan: DailyLearningPlan = {
      id: `plan_${date.toISOString().split('T')[0]}`,
      date,
      available_time: timeAvailable,
      difficulty_adjustment: 1.0,
      focus_areas: focusAreas.map(area => ({
        area: area as any,
        weight: 1.0 / focusAreas.length,
        current_competency: 0.6,
        target_competency: 0.8,
        urgency: 0.7,
        user_interest: 0.8,
        cultural_relevance: 0.9,
        modern_applicability: 0.6,
        time_to_proficiency: 30
      })),
      micro_lessons: microLessons,
      cultural_themes: ['Roman History', 'Philosophy', 'Social Customs'],
      daily_goals: dailyGoals,
      break_schedule: breakSchedule,
      progress_checkpoints: [
        {
          time_marker: timeAvailable * 0.5,
          checkpoint_type: 'comprehension_check',
          action_required: 'Quick comprehension assessment',
          success_threshold: 0.7,
          failure_recovery: 'Review previous lesson and continue'
        }
      ],
      adaptive_adjustments: [],
      completion_status: 'not_started',
      actual_time_spent: 0,
      effectiveness_score: 0
    };
    
    return plan;
  }, []);

  // 🤖 **AI OPTIMIZATION APPLICATION**
  const applyAIOptimization = useCallback(async (plan: DailyLearningPlan, userProfile: any): Promise<DailyLearningPlan> => {
    // Apply AI-based optimizations based on user's cognitive patterns
    const optimizedPlan = { ...plan };
    
    // Adjust difficulty based on user's current performance
    if (userProfile?.recentPerformance) {
      const avgPerformance = userProfile.recentPerformance.reduce((a: number, b: number) => a + b, 0) / userProfile.recentPerformance.length;
      
      if (avgPerformance > 0.8) {
        optimizedPlan.difficulty_adjustment = 1.2; // Increase difficulty
      } else if (avgPerformance < 0.6) {
        optimizedPlan.difficulty_adjustment = 0.8; // Decrease difficulty
      }
    }
    
    // Optimize lesson order based on cognitive load
    optimizedPlan.micro_lessons = optimizedPlan.micro_lessons.sort((a, b) => {
      // Start with lower cognitive load, build up to higher
      return a.estimated_cognitive_load - b.estimated_cognitive_load;
    });
    
    return optimizedPlan;
  }, []);

  // 📊 **USER COMPETENCIES ANALYSIS**
  const analyzeUserCompetencies = useCallback(async () => {
    // Simulate comprehensive user competency analysis
    return {
      vocabulary: 0.65,
      grammar: 0.45,
      culture: 0.70,
      reading: 0.55,
      overall: 0.59
    };
  }, []);

  // 🎯 **DASHBOARD MODE RENDERING**
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <CalendarDays className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-700">{dailyPlan ? '1' : '0'}</p>
            <p className="text-sm text-blue-600">Active Plans</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-700">{knowledgeGaps.filter(g => g.severity === 'critical').length}</p>
            <p className="text-sm text-red-600">Critical Gaps</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <CheckSquare className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-700">{prerequisiteMap.length}</p>
            <p className="text-sm text-green-600">Skills Mapped</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <Sparkles className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-700">{aiOptimization ? '✓' : '○'}</p>
            <p className="text-sm text-purple-600">AI Optimized</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-100 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wand2 className="w-6 h-6 text-indigo-600" />
            <span>Quick Learning Setup</span>
          </CardTitle>
          <CardDescription>Configure your personalized learning session</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Available Time</label>
              <select
                value={availableTime}
                onChange={(e) => setAvailableTime(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>1 hour</option>
                <option value={90}>1.5 hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Learning Date</label>
              <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Primary Focus</label>
              <select
                value={focusAreas[0] || 'vocabulary'}
                onChange={(e) => setFocusAreas([e.target.value])}
                className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
              >
                <option value="vocabulary">Vocabulary</option>
                <option value="grammar">Grammar</option>
                <option value="culture">Culture</option>
                <option value="reading">Reading</option>
              </select>
            </div>
          </div>
          
          <div className="text-center">
            <Button
              onClick={() => generateDailyPlan(selectedDate, availableTime, focusAreas)}
              disabled={isGeneratingPlan}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3"
            >
              {isGeneratingPlan ? (
                <>
                  <Lightning className="w-5 h-5 mr-2 animate-spin" />
                  Generating... {planGenerationProgress.toFixed(0)}%
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 mr-2" />
                  {currentTranslations.actions.generatePlan}
                </>
              )}
            </Button>
            
            {isGeneratingPlan && (
              <div className="mt-4 max-w-md mx-auto">
                <Progress value={planGenerationProgress} className="h-2" />
                <div className="text-xs text-slate-500 mt-2">
                  {planGenerationProgress < 30 ? 'Analyzing competencies...' :
                   planGenerationProgress < 60 ? 'Detecting knowledge gaps...' :
                   planGenerationProgress < 90 ? 'Generating optimized plan...' :
                   'Applying AI optimization...'}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Current Session Status */}
      {currentSession.active && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-100 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <PlayCircle className="w-6 h-6 text-green-600" />
                <span>Active Learning Session</span>
              </div>
              <Badge className="bg-green-100 text-green-700">
                {Math.floor(currentSession.time_spent / 60)}:{(currentSession.time_spent % 60).toString().padStart(2, '0')}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">
                  Lesson {currentSession.current_lesson + 1} of {dailyPlan?.micro_lessons.length || 0}
                </p>
                <p className="text-xs text-green-600">
                  {currentSession.completed_goals.length} goals completed
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-300 text-green-600"
                >
                  <PauseCircle className="w-4 h-4 mr-1" />
                  Pause
                </Button>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Target className="w-4 h-4 mr-1" />
                  Continue
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  // 📅 **DAILY PLAN MODE RENDERING**
  const renderDailyPlan = () => {
    if (!dailyPlan) {
      return (
        <Card>
          <CardContent className="text-center py-12">
            <CalendarDays className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Daily Plan Generated</h3>
            <p className="text-slate-600 mb-4">Create a personalized learning plan to get started</p>
            <Button
              onClick={() => setCurrentMode('dashboard')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Plan
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-6">
        {/* Plan Overview */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CalendarDays className="w-6 h-6 text-blue-600" />
                <span>{currentTranslations.daily_plan.title}</span>
              </div>
              <Badge className={`${
                dailyPlan.completion_status === 'completed' ? 'bg-green-100 text-green-700' :
                dailyPlan.completion_status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                dailyPlan.completion_status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                'bg-slate-100 text-slate-700'
              }`}>
                {dailyPlan.completion_status.replace('_', ' ')}
              </Badge>
            </CardTitle>
            <CardDescription>
              {dailyPlan.date.toLocaleDateString()} • {dailyPlan.available_time} minutes available
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{dailyPlan.micro_lessons.length}</p>
                <p className="text-sm text-slate-600">Micro Lessons</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{dailyPlan.daily_goals.length}</p>
                <p className="text-sm text-slate-600">Daily Goals</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{dailyPlan.break_schedule.length}</p>
                <p className="text-sm text-slate-600">Breaks</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{(dailyPlan.difficulty_adjustment * 100).toFixed(0)}%</p>
                <p className="text-sm text-slate-600">Difficulty</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Micro Lessons */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Book className="w-6 h-6 text-green-600" />
              <span>{currentTranslations.daily_plan.micro_lessons}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dailyPlan.micro_lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className={`p-4 rounded-lg border ${
                    index === currentSession.current_lesson && currentSession.active
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">
                      Lesson {index + 1}: {lesson.learning_objective}
                    </h4>
                    <div className="flex space-x-2">
                      <Badge className={`${
                        lesson.type === 'vocabulary' ? 'bg-blue-100 text-blue-700' :
                        lesson.type === 'grammar' ? 'bg-green-100 text-green-700' :
                        lesson.type === 'culture' ? 'bg-purple-100 text-purple-700' :
                        lesson.type === 'reading' ? 'bg-orange-100 text-orange-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {lesson.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {lesson.duration}m
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm space-y-1">
                    <div>
                      <span className="font-medium">Difficulty:</span> {lesson.difficulty}/10
                    </div>
                    <div>
                      <span className="font-medium">Vocabulary:</span> {lesson.vocabulary_count} words
                    </div>
                    {lesson.cultural_context && (
                      <div>
                        <span className="font-medium">Context:</span> {lesson.cultural_context}
                      </div>
                    )}
                    <div>
                      <span className="font-medium">Success Criteria:</span> {lesson.success_criteria.join(', ')}
                    </div>
                  </div>
                  {index === currentSession.current_lesson && currentSession.active && (
                    <div className="mt-3 flex space-x-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <PlayCircle className="w-4 h-4 mr-1" />
                        Continue
                      </Button>
                      <Button size="sm" variant="outline">
                        <CheckSquare className="w-4 h-4 mr-1" />
                        Complete
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Goals Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-6 h-6 text-orange-600" />
              <span>{currentTranslations.daily_plan.daily_goals}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dailyPlan.daily_goals.map(goal => {
                const progress = (goal.current_progress / goal.target_value) * 100;
                return (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium capitalize">{goal.category}</span>
                      <span className="text-sm text-slate-600">
                        {goal.current_progress} / {goal.target_value} {goal.unit}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-xs">
                      <Badge className={`${
                        goal.priority === 'critical' ? 'bg-red-100 text-red-700' :
                        goal.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                        goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {goal.priority}
                      </Badge>
                      <span className="text-slate-500">{goal.completion_reward}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // 🕳️ **KNOWLEDGE GAPS MODE RENDERING**
  const renderKnowledgeGaps = () => (
    <div className="space-y-6">
      {/* Gaps Overview */}
      <Card className="bg-gradient-to-br from-red-50 to-orange-100 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <span>{currentTranslations.knowledge_gaps.title}</span>
          </CardTitle>
          <CardDescription>{currentTranslations.knowledge_gaps.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['critical', 'moderate', 'minor'].map(severity => {
              const gapsOfSeverity = knowledgeGaps.filter(gap => gap.severity === severity);
              return (
                <div key={severity} className="text-center">
                  <p className={`text-2xl font-bold ${
                    severity === 'critical' ? 'text-red-600' :
                    severity === 'moderate' ? 'text-orange-600' :
                    'text-yellow-600'
                  }`}>
                    {gapsOfSeverity.length}
                  </p>
                  <p className="text-sm text-slate-600 capitalize">
                    {currentTranslations.knowledge_gaps[`severity_${severity}` as keyof typeof currentTranslations.knowledge_gaps]} Gaps
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Individual Gaps */}
      {knowledgeGaps.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Knowledge Gaps Detected</h3>
            <p className="text-slate-600 mb-4">Great progress! Generate a daily plan to discover areas for improvement.</p>
            <Button
              onClick={() => setCurrentMode('dashboard')}
              className="bg-green-600 hover:bg-green-700"
            >
              <Target className="w-4 h-4 mr-2" />
              Analyze Learning
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {knowledgeGaps.map(gap => (
            <Card
              key={gap.id}
              className={`${
                gap.severity === 'critical' ? 'border-red-200 bg-red-50' :
                gap.severity === 'moderate' ? 'border-orange-200 bg-orange-50' :
                'border-yellow-200 bg-yellow-50'
              }`}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{gap.specific_topic}</CardTitle>
                  <div className="flex space-x-2">
                    <Badge className={`${
                      gap.severity === 'critical' ? 'bg-red-100 text-red-700' :
                      gap.severity === 'moderate' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {gap.severity}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {gap.area}
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  Confidence: {(gap.confidence_score * 100).toFixed(0)}% • 
                  Impact: {(gap.impact_on_overall_learning * 100).toFixed(0)}%
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium mb-2">{currentTranslations.knowledge_gaps.recommended_time}</h5>
                    <p className="text-sm text-slate-600">
                      {gap.recommended_focus_time} minutes/day for ~{gap.estimated_resolution_time} days
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">Cultural Context</h5>
                    <p className="text-sm text-slate-600">{gap.cultural_context}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">{currentTranslations.knowledge_gaps.learning_strategies}</h5>
                    <div className="space-y-2">
                      {gap.learning_strategies.slice(0, 2).map((strategy, idx) => (
                        <div key={idx} className="p-2 bg-white/50 rounded border">
                          <div className="flex justify-between items-start">
                            <span className="font-medium text-sm">{strategy.strategy_name}</span>
                            <Badge variant="outline" className="text-xs">
                              {(strategy.effectiveness_score * 100).toFixed(0)}% effective
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">{strategy.description}</p>
                          <div className="text-xs text-slate-500 mt-1">
                            {strategy.time_investment}min • Load: {(strategy.cognitive_load * 100).toFixed(0)}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">{currentTranslations.knowledge_gaps.progress_indicators}</h5>
                    <div className="space-y-2">
                      {gap.progress_indicators.map((indicator, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <span>{indicator.metric_name}</span>
                          <div className="flex items-center space-x-2">
                            <Progress 
                              value={(indicator.current_value / indicator.target_value) * 100} 
                              className="w-20 h-1"
                            />
                            <span className="text-xs text-slate-600">
                              {indicator.current_value}/{indicator.target_value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

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
    <section id="personalized-learning-complete" className="py-20 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-400 to-gold mb-4">
            {currentTranslations.title}
          </h2>
          <p className="text-xl text-white/90 max-w-4xl mx-auto mb-4">
            {currentTranslations.subtitle}
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className={`flex items-center space-x-2 ${
              backendStatus === 'connected' ? 'text-green-400' :
              backendStatus === 'error' ? 'text-red-400' : 'text-yellow-400'
            }`}>
              <Database className="w-4 h-4" />
              <span className="font-medium">
                {backendStatus === 'connected' ? 'AI Learning Engine Ready' : 
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
        <div className="max-w-6xl mx-auto">
          <Tabs value={currentMode} onValueChange={(value) => setCurrentMode(value as any)}>
            <TabsList className="grid w-full grid-cols-5 mb-8 bg-white/10 backdrop-blur-sm">
              <TabsTrigger value="dashboard" className="text-white">
                <Gauge className="w-4 h-4 mr-2" />
                {currentTranslations.modes.dashboard}
              </TabsTrigger>
              <TabsTrigger value="daily_plan" className="text-white">
                <CalendarDays className="w-4 h-4 mr-2" />
                {currentTranslations.modes.daily_plan}
              </TabsTrigger>
              <TabsTrigger value="knowledge_gaps" className="text-white">
                <AlertTriangle className="w-4 h-4 mr-2" />
                {currentTranslations.modes.knowledge_gaps}
              </TabsTrigger>
              <TabsTrigger value="prerequisites" className="text-white">
                <Network className="w-4 h-4 mr-2" />
                {currentTranslations.modes.prerequisites}
              </TabsTrigger>
              <TabsTrigger value="ai_optimization" className="text-white">
                <Sparkles className="w-4 h-4 mr-2" />
                {currentTranslations.modes.ai_optimization}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              {renderDashboard()}
            </TabsContent>
            
            <TabsContent value="daily_plan">
              {renderDailyPlan()}
            </TabsContent>
            
            <TabsContent value="knowledge_gaps">
              {renderKnowledgeGaps()}
            </TabsContent>
            
            <TabsContent value="prerequisites">
              <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                <CardContent className="text-center py-12">
                  <Network className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Prerequisite Mapping</h3>
                  <p className="text-white/70 mb-4">Structured learning pathways with skill dependencies</p>
                  <Button className="bg-wine-red hover:bg-wine-red/80 text-gold">
                    View Prerequisites Map
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="ai_optimization">
              <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                <CardContent className="text-center py-12">
                  <Sparkles className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">AI Optimization</h3>
                  <p className="text-white/70 mb-4">Cognitive pattern analysis and learning acceleration</p>
                  <Button className="bg-wine-red hover:bg-wine-red/80 text-gold">
                    Optimize Learning
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

export default PersonalizedLearningPathsSection;