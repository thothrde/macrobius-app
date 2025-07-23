import { useState, useEffect } from 'react';
import Head from 'next/head';
import { LanguageProvider } from '@/contexts/LanguageContext';
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
import KIRAGAssistentSection from '@/components/sections/KIRAGAssistentSection';

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

export default function Home({ initialSection = 'intro', initialLanguage = 'DE' }: HomeProps) {
  const [currentSection, setCurrentSection] = useState<Section>(initialSection);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(initialLanguage);
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);

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

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'intro':
        return <VideoIntroWrapper language={currentLanguage} />;
      case 'banquet':
        return <BanquetSection language={currentLanguage} />;
      case 'cosmos':
        return <CosmosSection language={currentLanguage} />;
      case 'worldmap':
        return <WorldMapSection language={currentLanguage} />;
      case 'textsearch':
        return <TextSearchSection language={currentLanguage} />;
      case 'learning':
        return <LearningSection language={currentLanguage} />;
      case 'quiz':
        return <QuizSection language={currentLanguage} />;
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
          Intro
        </button>
        <button 
          onClick={() => handleSectionChange('banquet')}
          className={`px-3 py-2 rounded ${currentSection === 'banquet' ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 hover:bg-amber-200'}`}
        >
          Banquet
        </button>
        <button 
          onClick={() => handleSectionChange('cosmos')}
          className={`px-3 py-2 rounded ${currentSection === 'cosmos' ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 hover:bg-amber-200'}`}
        >
          Cosmos
        </button>
        <button 
          onClick={() => handleSectionChange('worldmap')}
          className={`px-3 py-2 rounded ${currentSection === 'worldmap' ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 hover:bg-amber-200'}`}
        >
          World Map
        </button>
        <button 
          onClick={() => handleSectionChange('textsearch')}
          className={`px-3 py-2 rounded ${currentSection === 'textsearch' ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 hover:bg-amber-200'}`}
        >
          Text Search
        </button>
        <button 
          onClick={() => handleSectionChange('learning')}
          className={`px-3 py-2 rounded ${currentSection === 'learning' ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 hover:bg-amber-200'}`}
        >
          Learning
        </button>
        <button 
          onClick={() => handleSectionChange('quiz')}
          className={`px-3 py-2 rounded ${currentSection === 'quiz' ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 hover:bg-amber-200'}`}
        >
          Quiz
        </button>
        <button 
          onClick={() => handleSectionChange('visualizations')}
          className={`px-3 py-2 rounded ${currentSection === 'visualizations' ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 hover:bg-amber-200'}`}
        >
          Visualizations
        </button>
        <button 
          onClick={() => handleSectionChange('ai-cultural-analysis')}
          className={`px-3 py-2 rounded ${currentSection === 'ai-cultural-analysis' ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 hover:bg-amber-200'}`}
        >
          AI Analysis
        </button>
        <button 
          onClick={() => handleSectionChange('ai-tutoring')}
          className={`px-3 py-2 rounded ${currentSection === 'ai-tutoring' ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 hover:bg-amber-200'}`}
        >
          AI Tutoring
        </button>
        <button 
          onClick={() => handleSectionChange('personalized-learning')}
          className={`px-3 py-2 rounded ${currentSection === 'personalized-learning' ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 hover:bg-amber-200'}`}
        >
          Learning Paths
        </button>
        <button 
          onClick={() => handleSectionChange('ki-rag-assistant')}
          className={`px-3 py-2 rounded ${currentSection === 'ki-rag-assistant' ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 hover:bg-amber-200'}`}
        >
          RAG Assistant
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
    <LanguageProvider>
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
    </LanguageProvider>
  );
}