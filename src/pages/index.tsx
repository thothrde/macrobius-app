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
import { Navigation } from '@/components/Navigation';
import { LanguageSelector } from '@/components/LanguageSelector';
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
        <LanguageSelector 
          currentLanguage={currentLanguage} 
          onLanguageChange={handleLanguageChange} 
        />

        {/* Navigation - Conditional visibility */}
        {isNavigationVisible && (
          <Navigation 
            currentSection={currentSection} 
            onSectionChange={handleSectionChange} 
            currentLanguage={currentLanguage}
          />
        )}

        {/* Main Content */}
        <main>
          {renderCurrentSection()}
        </main>
      </div>
    </LanguageProvider>
  );
}