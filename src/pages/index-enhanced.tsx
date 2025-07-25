import { useState, useEffect } from 'react';
import Head from 'next/head';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { VideoIntroWrapper } from '@/components/sections/VideoIntroWrapper-Enhanced';
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

// 🔧 ENHANCED: Main Home Component with GUARANTEED navigation
function HomeContent({ initialSection = 'intro', initialLanguage = 'DE' }: HomeProps) {
  const [currentSection, setCurrentSection] = useState<Section>(initialSection);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(initialLanguage);
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);
  const [forceShowNavigation, setForceShowNavigation] = useState(false); // 🔧 NEW: Force navigation option
  
  const { t } = useLanguage();

  // 🔧 ENHANCED: Handle section navigation with better state management
  const handleSectionChange = (section: Section) => {
    console.log(`🚀 Navigation: Changing from ${currentSection} to ${section}`);
    setCurrentSection(section);
    if (section !== 'intro') {
      setIsNavigationVisible(true);
    } else {
      setIsNavigationVisible(false);
    }
  };

  // Handle language change
  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
  };

  // Show navigation when not on intro
  useEffect(() => {
    setIsNavigationVisible(currentSection !== 'intro' || forceShowNavigation);
  }, [currentSection, forceShowNavigation]);

  // 🔧 ENHANCED: Listen for navigation events with better error handling
  useEffect(() => {
    const handleNavigationEvent = (event: CustomEvent) => {
      try {
        const { section } = event.detail;
        console.log(`🎯 Received navigation event for section: ${section}`);
        handleSectionChange(section as Section);
      } catch (error) {
        console.error('Navigation event error:', error);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('navigateToSection', handleNavigationEvent as EventListener);
      
      return () => {
        window.removeEventListener('navigateToSection', handleNavigationEvent as EventListener);
      };
    }
  }, []);

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
        return (
          <VideoIntroWrapper 
            language={currentLanguage} 
          />
        );
      case 'banquet':
        return <BanquetSection isActive={true} language={currentLanguage} />;
      case 'cosmos':
        return <CosmosSection isActive={true} language={currentLanguage} />;
      case 'worldmap':
        return <WorldMapSection isActive={true} language={currentLanguage} t={t} />;
      case 'textsearch':
        return <TextSearchSection isActive={true} language={currentLanguage} />;
      case 'learning':
        return <LearningSection isActive={true} language={currentLanguage} />;
      case 'quiz':
        return <QuizSection language={getLanguageObject(currentLanguage)} />;
      case 'visualizations':
        return <VisualizationsSection isActive={true} language={currentLanguage} />;
      case 'ai-cultural-analysis':
        return <AICulturalAnalysisSection language={currentLanguage} activeTab="analyze" />;
      case 'ai-tutoring':
        return <AITutoringSystemSection language={currentLanguage} />;
      case 'personalized-learning':
        return <PersonalizedLearningPaths currentMode="dashboard" />;
      case 'ki-rag-assistant':
        return <KIRAGAssistentSection language={currentLanguage} />;
      default:
        return <VideoIntroWrapper language={currentLanguage} />;
    }
  };

  // 🔧 ENHANCED Navigation Component with GUARANTEED visibility toggle
  const EnhancedNavigation = () => (
    <nav style={{
      background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.95), rgba(245, 158, 11, 0.9))',
      padding: '16px 0',
      boxShadow: '0 8px 32px rgba(212, 175, 55, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      borderBottom: '2px solid rgba(212, 175, 55, 0.4)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        padding: '0 20px',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* 🔧 CRITICAL: Always show toggle navigation button */}
        {!isNavigationVisible && (
          <button
            onClick={() => setForceShowNavigation(true)}
            style={{
              padding: '12px 20px',
              borderRadius: '25px',
              border: '3px solid #d4af37',
              backgroundColor: 'rgba(212, 175, 55, 0.9)',
              color: '#1a1a1a',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(212, 175, 55, 0.4)'
            }}
          >
            🧭 Navigation anzeigen
          </button>
        )}
        
        {/* Navigation Buttons */}
        {(isNavigationVisible || forceShowNavigation) && (
          <>
            <button 
              onClick={() => handleSectionChange('intro')}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: `2px solid ${currentSection === 'intro' ? '#92400e' : 'rgba(146, 64, 14, 0.3)'}`,
                backgroundColor: currentSection === 'intro' ? '#92400e' : 'rgba(255, 255, 255, 0.9)',
                color: currentSection === 'intro' ? 'white' : '#92400e',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              🏛️ {t('nav.intro')}
            </button>
            
            <button 
              onClick={() => handleSectionChange('banquet')}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: `2px solid ${currentSection === 'banquet' ? '#92400e' : 'rgba(146, 64, 14, 0.3)'}`,
                backgroundColor: currentSection === 'banquet' ? '#92400e' : 'rgba(255, 255, 255, 0.9)',
                color: currentSection === 'banquet' ? 'white' : '#92400e',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              🍷 {t('nav.banquet')}
            </button>
            
            <button 
              onClick={() => handleSectionChange('cosmos')}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: `2px solid ${currentSection === 'cosmos' ? '#92400e' : 'rgba(146, 64, 14, 0.3)'}`,
                backgroundColor: currentSection === 'cosmos' ? '#92400e' : 'rgba(255, 255, 255, 0.9)',
                color: currentSection === 'cosmos' ? 'white' : '#92400e',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              🌌 {t('nav.cosmos')}
            </button>
            
            <button 
              onClick={() => handleSectionChange('worldmap')}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: `2px solid ${currentSection === 'worldmap' ? '#92400e' : 'rgba(146, 64, 14, 0.3)'}`,
                backgroundColor: currentSection === 'worldmap' ? '#92400e' : 'rgba(255, 255, 255, 0.9)',
                color: currentSection === 'worldmap' ? 'white' : '#92400e',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              🗺️ {t('nav.worldmap')}
            </button>
            
            <button 
              onClick={() => handleSectionChange('textsearch')}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: `2px solid ${currentSection === 'textsearch' ? '#92400e' : 'rgba(146, 64, 14, 0.3)'}`,
                backgroundColor: currentSection === 'textsearch' ? '#92400e' : 'rgba(255, 255, 255, 0.9)',
                color: currentSection === 'textsearch' ? 'white' : '#92400e',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              🔍 {t('nav.textsearch')}
            </button>
            
            <button 
              onClick={() => handleSectionChange('learning')}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: `2px solid ${currentSection === 'learning' ? '#92400e' : 'rgba(146, 64, 14, 0.3)'}`,
                backgroundColor: currentSection === 'learning' ? '#92400e' : 'rgba(255, 255, 255, 0.9)',
                color: currentSection === 'learning' ? 'white' : '#92400e',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              📚 {t('nav.learning')}
            </button>
            
            <button 
              onClick={() => handleSectionChange('quiz')}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: `2px solid ${currentSection === 'quiz' ? '#92400e' : 'rgba(146, 64, 14, 0.3)'}`,
                backgroundColor: currentSection === 'quiz' ? '#92400e' : 'rgba(255, 255, 255, 0.9)',
                color: currentSection === 'quiz' ? 'white' : '#92400e',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              🎯 {t('nav.quiz')}
            </button>
            
            <button 
              onClick={() => handleSectionChange('visualizations')}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: `2px solid ${currentSection === 'visualizations' ? '#92400e' : 'rgba(146, 64, 14, 0.3)'}`,
                backgroundColor: currentSection === 'visualizations' ? '#92400e' : 'rgba(255, 255, 255, 0.9)',
                color: currentSection === 'visualizations' ? 'white' : '#92400e',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              📊 {t('nav.visualizations')}
            </button>
            
            {/* 🤖 AI Features Section */}
            <div style={{
              width: '2px',
              height: '24px',
              backgroundColor: 'rgba(139, 92, 246, 0.4)',
              margin: '0 8px'
            }} />
            
            <button 
              onClick={() => handleSectionChange('ai-cultural-analysis')}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: `2px solid ${currentSection === 'ai-cultural-analysis' ? '#8b5cf6' : 'rgba(139, 92, 246, 0.4)'}`,
                backgroundColor: currentSection === 'ai-cultural-analysis' ? '#8b5cf6' : 'rgba(255, 255, 255, 0.9)',
                color: currentSection === 'ai-cultural-analysis' ? 'white' : '#8b5cf6',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              🧠 {t('nav.ai_cultural')}
            </button>
            
            <button 
              onClick={() => handleSectionChange('ai-tutoring')}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: `2px solid ${currentSection === 'ai-tutoring' ? '#8b5cf6' : 'rgba(139, 92, 246, 0.4)'}`,
                backgroundColor: currentSection === 'ai-tutoring' ? '#8b5cf6' : 'rgba(255, 255, 255, 0.9)',
                color: currentSection === 'ai-tutoring' ? 'white' : '#8b5cf6',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              👑 {t('nav.ai_tutoring')}
            </button>
            
            <button 
              onClick={() => handleSectionChange('personalized-learning')}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: `2px solid ${currentSection === 'personalized-learning' ? '#8b5cf6' : 'rgba(139, 92, 246, 0.4)'}`,
                backgroundColor: currentSection === 'personalized-learning' ? '#8b5cf6' : 'rgba(255, 255, 255, 0.9)',
                color: currentSection === 'personalized-learning' ? 'white' : '#8b5cf6',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              🎯 {t('nav.ai_learning')}
            </button>
            
            <button 
              onClick={() => handleSectionChange('ki-rag-assistant')}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: `2px solid ${currentSection === 'ki-rag-assistant' ? '#8b5cf6' : 'rgba(139, 92, 246, 0.4)'}`,
                backgroundColor: currentSection === 'ki-rag-assistant' ? '#8b5cf6' : 'rgba(255, 255, 255, 0.9)',
                color: currentSection === 'ki-rag-assistant' ? 'white' : '#8b5cf6',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              🤖 {t('nav.ai_rag')}
            </button>
            
            {/* 🔧 CRITICAL: Hide navigation button when visible */}
            {forceShowNavigation && currentSection === 'intro' && (
              <button
                onClick={() => setForceShowNavigation(false)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '15px',
                  border: '1px solid rgba(107, 114, 128, 0.3)',
                  backgroundColor: 'rgba(107, 114, 128, 0.1)',
                  color: '#6b7280',
                  fontSize: '11px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                ✕ Verstecken
              </button>
            )}
          </>
        )}
      </div>
    </nav>
  );

  // 🔧 ENHANCED Language Selector with better styling
  const EnhancedLanguageSelector = () => (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 100
    }}>
      <select 
        value={currentLanguage} 
        onChange={(e) => handleLanguageChange(e.target.value as Language)}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          border: '2px solid rgba(212, 175, 55, 0.4)',
          borderRadius: '25px',
          padding: '12px 16px',
          color: '#92400e',
          fontSize: '14px',
          fontWeight: '600',
          boxShadow: '0 8px 25px rgba(212, 175, 55, 0.3)',
          cursor: 'pointer',
          outline: 'none',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(12px)'
        }}
      >
        <option value="DE">🇩🇪 Deutsch</option>
        <option value="EN">🇺🇸 English</option>
        <option value="LA">🏛️ Latina</option>
      </select>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, rgba(248, 246, 240, 0.95) 0%, rgba(245, 241, 232, 0.97) 30%, rgba(240, 235, 226, 0.95) 100%)'
    }}>
      <Head>
        <title>Macrobius - AI-Powered Classical Latin Education</title>
        <meta name="description" content="Experience ancient Roman wisdom through AI-powered interactive learning. Explore Macrobius' Saturnalia with cutting-edge educational technology." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Language Selector - Always visible */}
      <EnhancedLanguageSelector />

      {/* 🔧 CRITICAL: Navigation - ALWAYS render but conditionally show content */}
      <EnhancedNavigation />

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