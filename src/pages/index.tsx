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

  // 🔧 ENHANCED: Handle section navigation with proper state management
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
    setIsNavigationVisible(currentSection !== 'intro');
  }, [currentSection]);

  // 🔧 FIXED: Listen for navigation events from IntroSection
  useEffect(() => {
    const handleNavigationEvent = (event: CustomEvent) => {
      const { section } = event.detail;
      console.log(`🎯 Received navigation event for section: ${section}`);
      handleSectionChange(section as Section);
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
        // ✅ FIXED: Added missing isActive prop to resolve build error
        return <VisualizationsSection isActive={true} language={currentLanguage} />;
      case 'ai-cultural-analysis':
        // 🔧 CRITICAL FIX: AICulturalAnalysisSection expects className?, language?, activeTab?
        return <AICulturalAnalysisSection language={currentLanguage} activeTab="analyze" />;
      case 'ai-tutoring':
        // 🔧 CRITICAL FIX: AITutoringSystemSection expects className?, language?
        return <AITutoringSystemSection language={currentLanguage} />;
      case 'personalized-learning':
        // 🔧 CRITICAL FIX: PersonalizedLearningPaths expects userProfile?, vocabularyData?, quizData?, className?, currentMode?
        return <PersonalizedLearningPaths currentMode="dashboard" />;
      case 'ki-rag-assistant':
        // 🔧 CRITICAL FIX: KIRAGAssistentSection expects language (required)
        return <KIRAGAssistentSection language={currentLanguage} />;
      default:
        return <VideoIntroWrapper language={currentLanguage} />;
    }
  };

  // 🔧 ENHANCED Navigation Component with better styling and all sections
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
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: currentSection === 'intro' 
              ? '0 4px 12px rgba(146, 64, 14, 0.4)' 
              : '0 2px 8px rgba(146, 64, 14, 0.2)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseEnter={(e) => {
            if (currentSection !== 'intro') {
              e.currentTarget.style.backgroundColor = 'rgba(146, 64, 14, 0.1)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentSection !== 'intro') {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
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
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: currentSection === 'banquet' 
              ? '0 4px 12px rgba(146, 64, 14, 0.4)' 
              : '0 2px 8px rgba(146, 64, 14, 0.2)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseEnter={(e) => {
            if (currentSection !== 'banquet') {
              e.currentTarget.style.backgroundColor = 'rgba(146, 64, 14, 0.1)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentSection !== 'banquet') {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
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
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: currentSection === 'cosmos' 
              ? '0 4px 12px rgba(146, 64, 14, 0.4)' 
              : '0 2px 8px rgba(146, 64, 14, 0.2)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseEnter={(e) => {
            if (currentSection !== 'cosmos') {
              e.currentTarget.style.backgroundColor = 'rgba(146, 64, 14, 0.1)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentSection !== 'cosmos') {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
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
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: currentSection === 'worldmap' 
              ? '0 4px 12px rgba(146, 64, 14, 0.4)' 
              : '0 2px 8px rgba(146, 64, 14, 0.2)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseEnter={(e) => {
            if (currentSection !== 'worldmap') {
              e.currentTarget.style.backgroundColor = 'rgba(146, 64, 14, 0.1)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentSection !== 'worldmap') {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
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
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: currentSection === 'textsearch' 
              ? '0 4px 12px rgba(146, 64, 14, 0.4)' 
              : '0 2px 8px rgba(146, 64, 14, 0.2)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseEnter={(e) => {
            if (currentSection !== 'textsearch') {
              e.currentTarget.style.backgroundColor = 'rgba(146, 64, 14, 0.1)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentSection !== 'textsearch') {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
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
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: currentSection === 'learning' 
              ? '0 4px 12px rgba(146, 64, 14, 0.4)' 
              : '0 2px 8px rgba(146, 64, 14, 0.2)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseEnter={(e) => {
            if (currentSection !== 'learning') {
              e.currentTarget.style.backgroundColor = 'rgba(146, 64, 14, 0.1)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentSection !== 'learning') {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
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
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: currentSection === 'quiz' 
              ? '0 4px 12px rgba(146, 64, 14, 0.4)' 
              : '0 2px 8px rgba(146, 64, 14, 0.2)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseEnter={(e) => {
            if (currentSection !== 'quiz') {
              e.currentTarget.style.backgroundColor = 'rgba(146, 64, 14, 0.1)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentSection !== 'quiz') {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
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
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: currentSection === 'visualizations' 
              ? '0 4px 12px rgba(146, 64, 14, 0.4)' 
              : '0 2px 8px rgba(146, 64, 14, 0.2)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseEnter={(e) => {
            if (currentSection !== 'visualizations') {
              e.currentTarget.style.backgroundColor = 'rgba(146, 64, 14, 0.1)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentSection !== 'visualizations') {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          📊 {t('nav.visualizations')}
        </button>
        
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
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: currentSection === 'ai-cultural-analysis' 
              ? '0 4px 12px rgba(139, 92, 246, 0.4)' 
              : '0 2px 8px rgba(139, 92, 246, 0.2)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseEnter={(e) => {
            if (currentSection !== 'ai-cultural-analysis') {
              e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentSection !== 'ai-cultural-analysis') {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
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
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: currentSection === 'ai-tutoring' 
              ? '0 4px 12px rgba(139, 92, 246, 0.4)' 
              : '0 2px 8px rgba(139, 92, 246, 0.2)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseEnter={(e) => {
            if (currentSection !== 'ai-tutoring') {
              e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentSection !== 'ai-tutoring') {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
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
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: currentSection === 'personalized-learning' 
              ? '0 4px 12px rgba(139, 92, 246, 0.4)' 
              : '0 2px 8px rgba(139, 92, 246, 0.2)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseEnter={(e) => {
            if (currentSection !== 'personalized-learning') {
              e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentSection !== 'personalized-learning') {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
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
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: currentSection === 'ki-rag-assistant' 
              ? '0 4px 12px rgba(139, 92, 246, 0.4)' 
              : '0 2px 8px rgba(139, 92, 246, 0.2)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseEnter={(e) => {
            if (currentSection !== 'ki-rag-assistant') {
              e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentSection !== 'ki-rag-assistant') {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          🤖 {t('nav.ai_rag')}
        </button>
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
          boxShadow: '0 8px 25px rgba(212, 175, 55, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
          cursor: 'pointer',
          outline: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backdropFilter: 'blur(12px)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 12px 35px rgba(212, 175, 55, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.8)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8)';
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

      {/* Navigation - Conditional visibility with enhanced design */}
      {isNavigationVisible && <EnhancedNavigation />}

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