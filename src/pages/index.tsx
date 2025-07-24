import { useState, useEffect } from 'react';
import Head from 'next/head';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { VideoIntroWrapper } from '@/components/sections/VideoIntroWrapper';
import BanquetSection from '@/components/sections/BanquetSection';
import CosmosSection from '@/components/sections/CosmosSection';
import WorldMapSection from '@/components/sections/WorldMapSection';
import TextSearchSection from '@/components/sections/TextSearchSection';
import LearningSection from '@/components/sections/LearningSection-enhanced-complete';
import QuizSection from '@/components/sections/QuizSection-SMART-GENERATION-COMPLETE';
import VisualizationsSection from '@/components/sections/VisualizationsSection';
import AICulturalAnalysisSection from '@/components/sections/AICulturalAnalysisSection';
import AITutoringSystemSection from '@/components/sections/AITutoringSystemSection-COMPLETE';
import PersonalizedLearningPaths from '@/components/sections/PersonalizedLearningPaths-COMPLETE';
import { KIRAGAssistentSection } from '@/components/sections/KIRAGAssistentSection';

type Section = 
  | 'intro' 
  | 'banquet' 
  | 'cosmos' 
  | 'worldmap' 
  | 'textsearch' 
  | 'learning' 
  | 'quiz'
  | 'visualizations'
  | 'ai-cultural-analysis'
  | 'ai-tutoring'
  | 'personalized-learning'
  | 'ki-rag-assistant';

type Language = 'DE' | 'EN' | 'LA';

interface HomeProps {
  initialSection?: Section;
  initialLanguage?: Language;
}

// Main Home Component that uses LanguageContext
function HomeContent({ initialSection = 'intro', initialLanguage = 'DE' }: HomeProps) {
  const [currentSection, setCurrentSection] = useState<Section>(initialSection);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(initialLanguage);
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);
  
  // 🔧 CRITICAL FIX: Get translation function from LanguageContext
  const { t } = useLanguage();

  // Handle section navigation
  const handleSectionChange = (section: Section) => {
    setCurrentSection(section);
    if (section !== 'intro') {
      setIsNavigationVisible(true);
    }
  };

  // Handle language change
  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
  };

  // Show navigation when not on intro
  useEffect(() => {
    setIsNavigationVisible(currentSection !== 'intro');
  }, [currentSection]);

  // 🔧 Helper function to create Language object for QuizSection
  const getLanguageObject = (lang: Language) => {
    const languageMap = {
      'DE': { code: 'de', name: 'Deutsch' },
      'EN': { code: 'en', name: 'English' }, 
      'LA': { code: 'la', name: 'Latina' }
    };
    return languageMap[lang];
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'intro':
        return <VideoIntroWrapper language={currentLanguage} />;
      case 'banquet':
        // ✅ FIXED: BanquetSection has its own DIRECT_TRANSLATIONS, only needs isActive and language
        return <BanquetSection isActive={true} language={currentLanguage} />;
      case 'cosmos':
        // ✅ FIXED: CosmosSection has its own DIRECT_TRANSLATIONS, only needs isActive and language
        return <CosmosSection isActive={true} language={currentLanguage} />;
      case 'worldmap':
        // ✅ CORRECT: WorldMapSection needs the 't' prop from LanguageContext
        return <WorldMapSection isActive={true} language={currentLanguage} t={t} />;
      case 'textsearch':
        // ✅ FIXED: TextSearchSection has its own DIRECT_TRANSLATIONS, only needs isActive and language
        return <TextSearchSection isActive={true} language={currentLanguage} />;
      case 'learning':
        // ✅ FIXED: LearningSection needs both isActive and language props
        return <LearningSection isActive={true} language={currentLanguage} />;
      case 'quiz':
        // ✅ FIXED: QuizSection expects Language object with code/name properties
        return <QuizSection language={getLanguageObject(currentLanguage)} />;
      case 'visualizations':
        return <VisualizationsSection language={currentLanguage} />;
      case 'ai-cultural-analysis':
        return <AICulturalAnalysisSection language={currentLanguage} />;
      case 'ai-tutoring':
        return <AITutoringSystemSection language={currentLanguage} />;
      case 'personalized-learning':
        return <PersonalizedLearningPaths language={currentLanguage} />;
      case 'ki-rag-assistant':
        return <KIRAGAssistentSection language={currentLanguage} />;
      default:
        return <VideoIntroWrapper language={currentLanguage} />;
    }
  };

  // Simple Navigation Component (inline for now)
  const SimpleNavigation = () => (
    <nav className="bg-amber-100 p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-wrap gap-2">
        <button 
          onClick={() => handleSectionChange('intro')}
          className={`px-3 py-2 rounded ${currentSection === 'intro' ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 hover:bg-amber-200'}`}
        >
          {t('nav.intro')}
        </button>
        <button 
          onClick={() => handleSectionChange('banquet')}
          className={`px-3 py-2 rounded ${currentSection === 'banquet' ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 hover:bg-amber-200'}`}
        >
          {t('nav.banquet')}
        </button>
        <button 
          onClick={() => handleSectionChange('cosmos')}
          className={`px-3 py-2 rounded ${currentSection === 'cosmos' ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 hover:bg-amber-200'}`}
        >
          {t('nav.cosmos')}
        </button>
        <button 
          onClick={() => handleSectionChange('worldmap')}
          className={`px-3 py-2 rounded ${currentSection === 'worldmap' ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 hover:bg-amber-200'}`}
        >
          {t('nav.worldmap')}
        </button>
        <button 
          onClick={() => handleSectionChange('textsearch')}
          className={`px-3 py-2 rounded ${currentSection === 'textsearch' ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 hover:bg-amber-200'}`}
        >
          {t('nav.textsearch')}
        </button>
        <button 
          onClick={() => handleSectionChange('learning')}
          className={`px-3 py-2 rounded ${currentSection === 'learning' ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 hover:bg-amber-200'}`}
        >
          {t('nav.learning')}
        </button>
        <button 
          onClick={() => handleSectionChange('quiz')}
          className={`px-3 py-2 rounded ${currentSection === 'quiz' ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 hover:bg-amber-200'}`}
        >
          {t('nav.quiz')}
        </button>
        <button 
          onClick={() => handleSectionChange('visualizations')}
          className={`px-3 py-2 rounded ${currentSection === 'visualizations' ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 hover:bg-amber-200'}`}
        >
          {t('nav.visualizations')}
        </button>
        <button 
          onClick={() => handleSectionChange('ai-cultural-analysis')}
          className={`px-3 py-2 rounded ${currentSection === 'ai-cultural-analysis' ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 hover:bg-amber-200'}`}
        >
          {t('nav.ai_cultural')}
        </button>
        <button 
          onClick={() => handleSectionChange('ai-tutoring')}
          className={`px-3 py-2 rounded ${currentSection === 'ai-tutoring' ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 hover:bg-amber-200'}`}
        >
          {t('nav.ai_tutoring')}
        </button>
        <button 
          onClick={() => handleSectionChange('personalized-learning')}
          className={`px-3 py-2 rounded ${currentSection === 'personalized-learning' ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 hover:bg-amber-200'}`}
        >
          {t('nav.ai_learning')}
        </button>
        <button 
          onClick={() => handleSectionChange('ki-rag-assistant')}
          className={`px-3 py-2 rounded ${currentSection === 'ki-rag-assistant' ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 hover:bg-amber-200'}`}
        >
          {t('nav.ai_rag')}
        </button>
      </div>
    </nav>
  );

  // Simple Language Selector (inline for now)
  const SimpleLanguageSelector = () => (
    <div className="fixed top-4 right-4 z-50">
      <select 
        value={currentLanguage} 
        onChange={(e) => handleLanguageChange(e.target.value as Language)}
        className="bg-white border border-amber-300 rounded px-3 py-2 text-amber-800 font-medium shadow-md hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
      >
        <option value="DE">🇩🇪 Deutsch</option>
        <option value="EN">🇺🇸 English</option>
        <option value="LA">🏛️ Latina</option>
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <Head>
        <title>Macrobius - AI-Powered Classical Latin Education</title>
        <meta name="description" content="Experience ancient Roman wisdom through AI-powered interactive learning. Explore Macrobius' Saturnalia with cutting-edge educational technology." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Language Selector - Always visible */}
      <SimpleLanguageSelector />

      {/* Navigation - Conditional visibility */}
      {isNavigationVisible && <SimpleNavigation />}

      {/* Main Content */}
      <main>
        {renderCurrentSection()}
      </main>
    </div>
  );
}

// Wrapper component with LanguageProvider
export default function Home(props: HomeProps) {
  return (
    <LanguageProvider>
      <HomeContent {...props} />
    </LanguageProvider>
  );
}