import React, { useState } from 'react';
import { Card } from '../ui/card';
import { BookOpen, Brain, Trophy, ArrowRight, Target, TrendingUp, Award, Flame, Scroll, Zap } from 'lucide-react';

// Import Enhanced Components
import { QuizSection } from './QuizSection';
import VocabularyTrainerSection from './VocabularyTrainer-CORPUS-EXPANSION-COMPLETE';
import GrammarExplainerSection from './GrammarExplainer-TIER1-COMPLETE';
import MacrobiusTextProcessor from './MacrobiusTextProcessor-TIER2-COMPLETE';

// Enhanced interface to support translations
interface LearningEnhancedSectionProps {
  t?: (key: string) => string;
  language?: 'DE' | 'EN' | 'LA';
}

// Type definitions
interface UserStats {
  totalExperience: number;
  level: number;
  perfectQuizzes: number;
  speedChallenges: number;
  maxStreak: number;
  vocabularyMastered: {
    total: number;
    latin: number;
    philosophy: number;
    astronomy: number;
  };
  categoriesCompleted: number;
  consecutivePerfect: number;
  expEarnedToday: number;
  expFromQuizzes: number;
  expFromVocabulary: number;
  expFromGrammar: number;
  expFromTextAnalysis: number;
  expFromAchievements: number;
}

interface Achievement {
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

type TabType = 'overview' | 'quiz' | 'vocabulary' | 'grammar' | 'textprocessor' | 'progress' | 'achievements' | 'experience';

// Translation types for type safety
type LearningTranslationKey = 
  | 'learning_title'
  | 'learning_subtitle'
  | 'welcome_title'
  | 'welcome_subtitle'
  | 'platform_description'
  | 'quiz_title'
  | 'quiz_description'
  | 'quiz_action'
  | 'vocabulary_title'
  | 'vocabulary_description'
  | 'vocabulary_action'
  | 'grammar_title'
  | 'grammar_description'
  | 'grammar_action'
  | 'textprocessor_title'
  | 'textprocessor_description'
  | 'textprocessor_action'
  | 'progress_title'
  | 'progress_description'
  | 'progress_action'
  | 'achievements_title'
  | 'achievements_description'
  | 'achievements_action'
  | 'experience_title'
  | 'experience_description'
  | 'experience_action'
  | 'enhancements_title'
  | 'current_stats'
  | 'level'
  | 'experience'
  | 'vocabulary'
  | 'max_streak'
  | 'earned_today'
  | 'enhanced'
  | 'comprehensive'
  | 'new'
  | 'all_enhanced'
  | 'new_features'
  | 'enhanced_analysis'
  | 'all_components_enhanced'
  | 'production_ready'
  | 'overview'
  | 'quiz'
  | 'vocabulary_short'
  | 'grammar'
  | 'text_search'
  | 'progress'
  | 'achievements'
  | 'experience_short';

type LearningTranslationDict = Record<LearningTranslationKey, string>;

// Enhanced translation system with comprehensive Lernen section translations
const getTranslation = (key: string, language: 'DE' | 'EN' | 'LA' = 'DE'): string => {
  const translations: Record<'DE' | 'EN' | 'LA', LearningTranslationDict> = {
    DE: {
      'learning_title': 'Vollständig erweiterte Lernplattform',
      'learning_subtitle': 'Alle vier Bildungskomponenten vollständig verbessert mit authentischen Macrobius-Inhalten, fortgeschrittener Analyse und umfassender Funktionalität',
      'welcome_title': 'Willkommen im erweiterten Lernzentrum',
      'welcome_subtitle': 'Erkunde alle vier verbesserten Bildungskomponenten mit umfassenden Macrobius-Inhalten, fortgeschrittener Analyse und interaktiven Funktionen.',
      'platform_description': 'Hochwertige Bildungsplattform mit authentischen Macrobius-Texten',
      'quiz_title': 'Macrobius Quiz-System',
      'quiz_description': '30+ authentische Fragen mit umfassender Analyse',
      'quiz_action': 'Quiz starten',
      'vocabulary_title': 'Vokabeltrainer',
      'vocabulary_description': '27+ Begriffe aus Macrobius-Texten',
      'vocabulary_action': 'Lernen beginnen',
      'grammar_title': 'Grammatik-Explorer',
      'grammar_description': 'Fortgeschrittene lateinische Grammatikanalyse',
      'grammar_action': 'Grammatik erkunden',
      'textprocessor_title': 'Text-Processor',
      'textprocessor_description': 'Erweiterte Textsuche und -analyse',
      'textprocessor_action': 'Texte durchsuchen',
      'progress_title': 'Fortschrittsverfolgung',
      'progress_description': 'Überwache deinen Lernfortschritt',
      'progress_action': 'Fortschritt anzeigen',
      'achievements_title': 'Erfolge & Auszeichnungen',
      'achievements_description': '25+ Erfolge zum Freischalten',
      'achievements_action': 'Erfolge anzeigen',
      'experience_title': 'Erfahrung & Level',
      'experience_description': 'Level aufsteigen und Vorteile freischalten',
      'experience_action': 'Level anzeigen',
      'enhancements_title': 'Neue Verbesserungen!',
      'current_stats': 'Deine aktuelle Statistik',
      'level': 'Level',
      'experience': 'Erfahrung',
      'vocabulary': 'Vokabeln',
      'max_streak': 'Max. Serie',
      'earned_today': 'Heute verdient',
      'enhanced': 'Erweitert',
      'comprehensive': 'Umfassend',
      'new': 'Neu!',
      'all_enhanced': '🎉 Alle 4 Bildungskomponenten verbessert!',
      'new_features': 'Neue Funktionen:',
      'enhanced_analysis': 'Verbesserte Analyse:',
      'all_components_enhanced': 'Alle 4 Bildungskomponenten vollständig verbessert!',
      'production_ready': 'Produktionsbereit',
      'overview': 'Übersicht',
      'quiz': 'Quiz',
      'vocabulary_short': 'Vokabeln',
      'grammar': 'Grammatik',
      'text_search': 'Text-Suche',
      'progress': 'Fortschritt',
      'achievements': 'Erfolge',
      'experience_short': 'Erfahrung'
    },
    EN: {
      'learning_title': 'Fully Enhanced Learning Platform',
      'learning_subtitle': 'All four educational components fully enhanced with authentic Macrobius content, advanced analysis, and comprehensive functionality',
      'welcome_title': 'Welcome to the Enhanced Learning Center',
      'welcome_subtitle': 'Explore all four enhanced educational components with comprehensive Macrobius content, advanced analysis, and interactive features.',
      'platform_description': 'Premium educational platform with authentic Macrobius texts',
      'quiz_title': 'Macrobius Quiz System',
      'quiz_description': '30+ authentic questions with comprehensive analysis',
      'quiz_action': 'Start Quiz',
      'vocabulary_title': 'Vocabulary Trainer',
      'vocabulary_description': '27+ terms from Macrobius texts',
      'vocabulary_action': 'Start Learning',
      'grammar_title': 'Grammar Explorer',
      'grammar_description': 'Advanced Latin grammar analysis',
      'grammar_action': 'Explore Grammar',
      'textprocessor_title': 'Text Processor',
      'textprocessor_description': 'Advanced text search and analysis',
      'textprocessor_action': 'Search Texts',
      'progress_title': 'Progress Tracking',
      'progress_description': 'Monitor your learning progress',
      'progress_action': 'View Progress',
      'achievements_title': 'Achievements & Awards',
      'achievements_description': '25+ achievements to unlock',
      'achievements_action': 'View Achievements',
      'experience_title': 'Experience & Level',
      'experience_description': 'Level up and unlock benefits',
      'experience_action': 'View Level',
      'enhancements_title': 'New Enhancements!',
      'current_stats': 'Your Current Stats',
      'level': 'Level',
      'experience': 'Experience',
      'vocabulary': 'Vocabulary',
      'max_streak': 'Max Streak',
      'earned_today': 'Earned Today',
      'enhanced': 'Enhanced',
      'comprehensive': 'Comprehensive',
      'new': 'New!',
      'all_enhanced': '🎉 All 4 Educational Components Enhanced!',
      'new_features': 'New Features:',
      'enhanced_analysis': 'Enhanced Analysis:',
      'all_components_enhanced': 'All 4 Educational Components Fully Enhanced!',
      'production_ready': 'Production Ready',
      'overview': 'Overview',
      'quiz': 'Quiz',
      'vocabulary_short': 'Vocabulary',
      'grammar': 'Grammar',
      'text_search': 'Text Search',
      'progress': 'Progress',
      'achievements': 'Achievements',
      'experience_short': 'Experience'
    },
    LA: {
      'learning_title': 'Suggestus Discendi Omnino Auctus',
      'learning_subtitle': 'Omnes quattuor partes educationis omnino melioratae cum contentis Macrobii authenticis, analysi provecta et functionalitate comprehensa',
      'welcome_title': 'Salve in Centro Discendi Aucto',
      'welcome_subtitle': 'Omnes quattuor melioratas partes educationis cum contentis Macrobii comprehensis, analysi provecta et functionibus interactivis explora.',
      'platform_description': 'Suggestus educationis excellens cum textibus Macrobii authenticis',
      'quiz_title': 'Systema Quaestionum',
      'quiz_description': '30+ quaestiones authenticae cum analysi comprehensa',
      'quiz_action': 'Incipere',
      'vocabulary_title': 'Exercitator Vocabulorum',
      'vocabulary_description': '27+ vocabula ex textibus Macrobii',
      'vocabulary_action': 'Discere',
      'grammar_title': 'Explorator Grammaticus',
      'grammar_description': 'Analysis grammatica Latina provecta',
      'grammar_action': 'Explorare',
      'textprocessor_title': 'Processor Textuum',
      'textprocessor_description': 'Quaestio et analysis textuum provecta',
      'textprocessor_action': 'Quaerere',
      'progress_title': 'Progressus Sequendus',
      'progress_description': 'Progressum discendi tuum observa',
      'progress_action': 'Monstrare',
      'achievements_title': 'Victoriae et Praemia',
      'achievements_description': '25+ victoriae liberandae',
      'achievements_action': 'Victorias',
      'experience_title': 'Experientia et Gradus',
      'experience_description': 'Gradus ascendere et beneficia liberare',
      'experience_action': 'Gradum',
      'enhancements_title': 'Meliorationes Novae!',
      'current_stats': 'Statisticae tuae currentes',
      'level': 'Gradus',
      'experience': 'Experientia',
      'vocabulary': 'Vocabula',
      'max_streak': 'Series Max.',
      'earned_today': 'Hodie merita',
      'enhanced': 'Auctum',
      'comprehensive': 'Comprehensum',
      'new': 'Novum!',
      'all_enhanced': '🎉 Omnes 4 partes educationis melioratae!',
      'new_features': 'Functiones novae:',
      'enhanced_analysis': 'Analysis meliorata:',
      'all_components_enhanced': 'Omnes 4 partes educationis omnino melioratae!',
      'production_ready': 'Productioni parata',
      'overview': 'Conspectus',
      'quiz': 'Quaestiones',
      'vocabulary_short': 'Vocabula',
      'grammar': 'Grammatica',
      'text_search': 'Quaestio',
      'progress': 'Progressus',
      'achievements': 'Victoriae',
      'experience_short': 'Experientia'
    }
  };

  // Type-safe access with fallback
  const languageTranslations = translations[language];
  const translation = languageTranslations[key as LearningTranslationKey];
  return translation || key;
};

// Mock ProgressTracker Component
const ProgressTracker = ({ t, language }: { t: (key: string) => string; language: 'DE' | 'EN' | 'LA' }) => (
  <div className="p-6">
    <h3 className="text-2xl font-bold mb-4">{getTranslation('progress_title', language)}</h3>
    <div className="space-y-4">
      <div className="bg-blue-100 p-4 rounded-lg">
        <h4 className="font-semibold">{getTranslation('progress_description', language)}</h4>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">75% Complete</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-100 p-3 rounded">
          <div className="text-lg font-bold">127</div>
          <div className="text-sm">Words Learned</div>
        </div>
        <div className="bg-purple-100 p-3 rounded">
          <div className="text-lg font-bold">18</div>
          <div className="text-sm">Current Level</div>
        </div>
      </div>
    </div>
  </div>
);

// Mock AchievementSystem Component
const AchievementSystem = ({ t, language }: { t: (key: string) => string; language: 'DE' | 'EN' | 'LA' }) => {
  const achievements: Achievement[] = [
    { name: 'Quiz Master', description: 'Complete 10 quizzes', unlocked: true, icon: '🎯' },
    { name: 'Vocabulary Expert', description: 'Learn 100 words', unlocked: true, icon: '📚' },
    { name: 'Grammar Guru', description: 'Master all grammar topics', unlocked: false, icon: '🧠' },
    { name: 'Perfect Streak', description: 'Get 20 answers in a row', unlocked: true, icon: '⚡' },
    { name: 'Text Explorer', description: 'Search 50 texts', unlocked: false, icon: '🔍' },
    { name: 'Scholar', description: 'Reach level 25', unlocked: false, icon: '🎓' }
  ];

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-4">{getTranslation('achievements_title', language)}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {achievements.map((achievement, achievementIndex) => (
          <div key={achievementIndex} className={`p-4 rounded-lg border-2 ${
            achievement.unlocked ? 'bg-yellow-50 border-yellow-300' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="text-2xl mb-2">{achievement.icon}</div>
            <h4 className="font-semibold">{achievement.name}</h4>
            <p className="text-sm text-gray-600">{achievement.description}</p>
            {achievement.unlocked && (
              <div className="mt-2 text-xs text-yellow-600 font-semibold">UNLOCKED!</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Mock ExperienceSystem Component
const ExperienceSystem = ({ userStats, t, language }: { userStats: UserStats; t: (key: string) => string; language: 'DE' | 'EN' | 'LA' }) => (
  <div className="p-6">
    <h3 className="text-2xl font-bold mb-4">{getTranslation('experience_title', language)}</h3>
    <div className="space-y-6">
      <div className="text-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
        <div className="text-4xl font-bold mb-2">{getTranslation('level', language)} {userStats.level}</div>
        <div className="text-lg">{userStats.totalExperience} XP</div>
        <div className="w-full bg-white bg-opacity-30 rounded-full h-3 mt-4">
          <div className="bg-white h-3 rounded-full" style={{ width: '60%' }}></div>
        </div>
        <div className="text-sm mt-2">240 XP to next level</div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <div className="text-xl font-bold text-blue-600">{userStats.expFromQuizzes}</div>
          <div className="text-sm">Quiz XP</div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <div className="text-xl font-bold text-green-600">{userStats.expFromVocabulary}</div>
          <div className="text-sm">Vocabulary XP</div>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg text-center">
          <div className="text-xl font-bold text-purple-600">{userStats.expFromGrammar}</div>
          <div className="text-sm">Grammar XP</div>
        </div>
        <div className="bg-orange-100 p-4 rounded-lg text-center">
          <div className="text-xl font-bold text-orange-600">{userStats.expFromTextAnalysis}</div>
          <div className="text-sm">Text XP</div>
        </div>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">Next Level Benefits:</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Unlock advanced grammar exercises</li>
          <li>• Access to bonus vocabulary sets</li>
          <li>• New achievement badges</li>
          <li>• Priority support features</li>
        </ul>
      </div>
    </div>
  </div>
);

// Enhanced Learning Section with proper translation support
export function LearningSection({ t, language = 'DE' }: LearningEnhancedSectionProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [userStats] = useState<UserStats>({
    totalExperience: 3240,
    level: 18,
    perfectQuizzes: 5,
    speedChallenges: 3,
    maxStreak: 18,
    vocabularyMastered: {
      total: 127,
      latin: 65,
      philosophy: 31,
      astronomy: 31
    },
    categoriesCompleted: 6,
    consecutivePerfect: 4,
    expEarnedToday: 180,
    expFromQuizzes: 1240,
    expFromVocabulary: 890,
    expFromGrammar: 650,
    expFromTextAnalysis: 460,
    expFromAchievements: 200
  });

  // Enhanced translation function with fallback
  const translate = (key: string): string => {
    if (t) {
      const result = t(key);
      if (result !== key) return result;
    }
    return getTranslation(key, language);
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center py-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          {translate('welcome_title')}
        </h3>
        <p className="text-gray-600 max-w-3xl mx-auto mb-4">
          {translate('welcome_subtitle')}
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Scroll className="w-4 h-4" />
          <span>
            {translate('platform_description')}
          </span>
        </div>
      </div>

      {/* Enhanced Feature Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-blue-200 hover:border-blue-400" onClick={() => setActiveTab('quiz')}>
          <Target className="h-12 w-12 text-blue-500 mb-4" />
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            {translate('quiz_title')}
          </h4>
          <p className="text-gray-600 mb-4 text-sm">
            {translate('quiz_description')}
          </p>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {translate('enhanced')}
            </div>
            <div className="flex items-center text-blue-600 font-semibold text-sm">
              {translate('quiz_action')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-green-200 hover:border-green-400" onClick={() => setActiveTab('vocabulary')}>
          <BookOpen className="h-12 w-12 text-green-500 mb-4" />
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            {translate('vocabulary_title')}
          </h4>
          <p className="text-gray-600 mb-4 text-sm">
            {translate('vocabulary_description')}
          </p>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {translate('comprehensive')}
            </div>
            <div className="flex items-center text-green-600 font-semibold text-sm">
              {translate('vocabulary_action')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-purple-200 hover:border-purple-400" onClick={() => setActiveTab('grammar')}>
          <Brain className="h-12 w-12 text-purple-500 mb-4" />
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            {translate('grammar_title')}
          </h4>
          <p className="text-gray-600 mb-4 text-sm">
            {translate('grammar_description')}
          </p>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {translate('new')}
            </div>
            <div className="flex items-center text-purple-600 font-semibold text-sm">
              {translate('grammar_action')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-orange-200 hover:border-orange-400" onClick={() => setActiveTab('textprocessor')}>
          <Scroll className="h-12 w-12 text-orange-500 mb-4" />
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            {translate('textprocessor_title')}
          </h4>
          <p className="text-gray-600 mb-4 text-sm">
            {translate('textprocessor_description')}
          </p>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {translate('enhanced')}
            </div>
            <div className="flex items-center text-orange-600 font-semibold text-sm">
              {translate('textprocessor_action')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-indigo-200 hover:border-indigo-400" onClick={() => setActiveTab('progress')}>
          <TrendingUp className="h-12 w-12 text-indigo-500 mb-4" />
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            {translate('progress_title')}
          </h4>
          <p className="text-gray-600 mb-4 text-sm">
            {translate('progress_description')}
          </p>
          <div className="flex items-center text-indigo-600 font-semibold text-sm">
            {translate('progress_action')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-yellow-200 hover:border-yellow-400" onClick={() => setActiveTab('achievements')}>
          <Trophy className="h-12 w-12 text-yellow-500 mb-4" />
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            {translate('achievements_title')}
          </h4>
          <p className="text-gray-600 mb-4 text-sm">
            {translate('achievements_description')}
          </p>
          <div className="flex items-center text-yellow-600 font-semibold text-sm">
            {translate('achievements_action')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-red-200 hover:border-red-400" onClick={() => setActiveTab('experience')}>
          <Flame className="h-12 w-12 text-red-500 mb-4" />
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            {translate('experience_title')}
          </h4>
          <p className="text-gray-600 mb-4 text-sm">
            {translate('experience_description')}
          </p>
          <div className="flex items-center text-red-600 font-semibold text-sm">
            {translate('experience_action')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
          <Award className="h-12 w-12 text-blue-600 mb-4" />
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            {translate('enhancements_title')}
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>🎯 {language === 'DE' ? 'Erweiterte Quiz-Funktionen' : language === 'LA' ? 'Functiones quaestionum auctae' : 'Enhanced quiz features'}</li>
            <li>📚 {language === 'DE' ? 'Grammatik-Explorer' : language === 'LA' ? 'Explorator grammaticus' : 'Grammar explorer'}</li>
            <li>🔍 {language === 'DE' ? 'Text-Processor-System' : language === 'LA' ? 'Systema processor textuum' : 'Text processor system'}</li>
            <li>📊 {language === 'DE' ? 'Umfassende Analyse' : language === 'LA' ? 'Analysis comprehensa' : 'Comprehensive analysis'}</li>
          </ul>
        </Card>
      </div>

      {/* Current Stats Overview */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
        <h4 className="text-xl font-bold mb-4">
          {translate('current_stats')}
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{userStats.level}</div>
            <div className="text-sm opacity-80">{translate('level')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{userStats.totalExperience}</div>
            <div className="text-sm opacity-80">{translate('experience')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{userStats.vocabularyMastered.total}</div>
            <div className="text-sm opacity-80">{translate('vocabulary')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{userStats.maxStreak}</div>
            <div className="text-sm opacity-80">{translate('max_streak')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{userStats.expEarnedToday}</div>
            <div className="text-sm opacity-80">{translate('earned_today')}</div>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
        <h4 className="text-xl font-bold mb-4 text-gray-900">
          {translate('all_enhanced')}
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-semibold text-green-700 mb-2">
              {translate('new_features')}
            </h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>🎯 {language === 'DE' ? 'Macrobius-spezifische Quiz-Inhalte' : 'Quiz content specific to Macrobius'}</li>
              <li>📚 {language === 'DE' ? 'Umfassende Vokabelsammlung' : 'Comprehensive vocabulary collection'}</li>
              <li>🧠 {language === 'DE' ? 'Fortgeschrittene Grammatikanalyse' : 'Advanced grammar analysis'}</li>
              <li>🔍 {language === 'DE' ? 'Leistungsstarke Textsuche' : 'Powerful text search'}</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-blue-700 mb-2">
              {translate('enhanced_analysis')}
            </h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>📊 {language === 'DE' ? 'Detaillierte Erklärungen' : 'Detailed explanations'}</li>
              <li>🎨 {language === 'DE' ? 'Interaktive Übungen' : 'Interactive exercises'}</li>
              <li>📈 {language === 'DE' ? 'Fortschrittsverfolgung' : 'Progress tracking'}</li>
              <li>🏆 {language === 'DE' ? 'Erfolge und Belohnungen' : 'Achievements and rewards'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="learning" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {translate('learning_title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {translate('learning_subtitle')}
          </p>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          <div className="flex flex-wrap bg-white rounded-lg shadow-lg p-1 gap-1">
            {[
              { id: 'overview', icon: '🏠', label: translate('overview') },
              { id: 'quiz', icon: '🎯', label: translate('quiz') },
              { id: 'vocabulary', icon: '📖', label: translate('vocabulary_short') },
              { id: 'grammar', icon: '🧠', label: translate('grammar') },
              { id: 'textprocessor', icon: '🔍', label: translate('text_search') },
              { id: 'progress', icon: '📊', label: translate('progress') },
              { id: 'achievements', icon: '🏆', label: translate('achievements') },
              { id: 'experience', icon: '⚡', label: translate('experience_short') }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 text-sm ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto">
          {activeTab === 'overview' && renderOverview()}
          
          {activeTab === 'quiz' && (
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <QuizSection isActive={true} />
            </div>
          )}
          
          {activeTab === 'vocabulary' && (
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <VocabularyTrainerSection 
                language={{ code: language.toLowerCase(), name: language }} 
              />
            </div>
          )}

          {activeTab === 'grammar' && (
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <GrammarExplainerSection language={{ code: language.toLowerCase(), name: language }} />
            </div>
          )}

          {activeTab === 'textprocessor' && (
            <div className="rounded-lg shadow-xl overflow-hidden">
              <MacrobiusTextProcessor language={language.toLowerCase() as "de" | "en" | "la"} />
            </div>
          )}
          
          {activeTab === 'progress' && (
            <div className="bg-white rounded-lg shadow-xl p-6">
              <ProgressTracker t={translate} language={language} />
            </div>
          )}
          
          {activeTab === 'achievements' && (
            <div className="bg-white rounded-lg shadow-xl p-6">
              <AchievementSystem t={translate} language={language} />
            </div>
          )}
          
          {activeTab === 'experience' && (
            <div className="bg-white rounded-lg shadow-xl p-6">
              <ExperienceSystem userStats={userStats} t={translate} language={language} />
            </div>
          )}
        </div>

        {/* Enhanced Platform Status */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-6 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full px-8 py-4 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">
                {translate('all_components_enhanced')}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-xs">
              <Zap className="w-4 h-4" />
              <span>
                {translate('production_ready')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LearningSection;