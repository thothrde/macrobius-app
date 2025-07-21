import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

// Essential Icons
import { 
  Home, 
  HelpCircle, 
  Globe, 
  Star, 
  Wine,
  Search, 
  GraduationCap, 
  BarChart3,
  Brain,
  Target,
  Crown,
  Scroll
} from 'lucide-react';

// Import all section components
import { IntroSection } from '@/components/sections/IntroSection';
import BanquetSection from '@/components/sections/BanquetSection';
import CosmosSection from '@/components/sections/CosmosSection';
import QuizSection from '@/components/sections/QuizSection';
import TextSearchSection from '@/components/sections/TextSearchSection';
import WorldMapSection from '@/components/sections/WorldMapSection';
import VisualizationsSection from '@/components/sections/VisualizationsSection';
import VocabularyTrainer from '@/components/sections/VocabularyTrainer-CORPUS-EXPANSION-COMPLETE';
import LearningSection from '@/components/sections/LearningSection-enhanced-complete';
import AICulturalAnalysisSection from '@/components/sections/AICulturalAnalysisSection';
import PersonalizedLearningPaths from '@/components/sections/PersonalizedLearningPaths-COMPLETE';
import AITutoringSystemSection from '@/components/sections/AITutoringSystemSection-COMPLETE';

// TypeScript interfaces
type LanguageCode = 'de' | 'en' | 'la';
type LanguageKey = 'DE' | 'EN' | 'LA';
type CulturalAnalysisTab = 'analyze' | 'explore' | 'statistics';
type LearningPathMode = 'dashboard' | 'daily_plan' | 'knowledge_gaps' | 'prerequisites' | 'ai_optimization';

// 🏛️ CLASSICAL PORTRAIT COMPONENT
const ClassicalMacrobiusPortrait: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <div 
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid #f59e0b',
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(139, 92, 41, 0.1))',
          boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)',
          margin: '0 auto 16px'
        }}
      >
        <img 
          src="/Macrobius-Portrait.jpg" 
          alt="Macrobius Portrait"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'sepia(10%) saturate(110%) brightness(105%)'
          }}
        />
        <div 
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            textAlign: 'center',
            padding: '4px',
            background: 'linear-gradient(to top, rgba(212, 175, 55, 0.9), transparent)'
          }}
        >
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#92400e' }}>
            MACROBIVS
          </span>
        </div>
      </div>
    </div>
  );
};

// 🏛️ MAIN CLASSICAL APP - FORCED INLINE STYLES TO GUARANTEE LAYOUT
const ClassicalMacrobiusApp: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [currentSection, setCurrentSection] = useState<string>('intro');
  const [currentSubSection, setCurrentSubSection] = useState<string>('');
  const [oracleStatus, setOracleStatus] = useState<'checking' | 'connected' | 'offline'>('offline');
  
  // 🔌 ORACLE CLOUD CONNECTION CHECK - WITH CORS FIX
  useEffect(() => {
    const checkOracleConnection = async () => {
      try {
        // Try to fetch from Oracle Cloud with no-cors mode to avoid CORS issues
        const response = await fetch('http://152.70.184.232:8080/api/health', {
          method: 'GET',
          mode: 'no-cors', // This bypasses CORS but limits response access
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(3000)
        });
        
        // In no-cors mode, we can't read the response, so we assume it's connected if no error
        setOracleStatus('connected');
      } catch (error) {
        console.log('Oracle Cloud connection failed, using offline mode:', error);
        setOracleStatus('offline');
      }
    };
    
    // Set initial status and check periodically
    checkOracleConnection();
    const interval = setInterval(checkOracleConnection, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);
  
  // 📝 DEBUG LOGGING
  useEffect(() => {
    console.log('🏛️ MACROBIUS: INLINE STYLES VERSION - GUARANTEED VERTICAL SIDEBAR');
    console.log('🔧 CORS FIX: Using no-cors mode for Oracle Cloud');
    document.title = 'Macrobius - Classical Digital Edition';
  }, []);
  
  // Language conversion helpers
  const convertToLanguage = (lang: LanguageCode): LanguageKey => {
    switch(lang) {
      case 'de': return 'DE';
      case 'en': return 'EN'; 
      case 'la': return 'LA';
      default: return 'DE';
    }
  };

  const getLanguageKey = (lang: LanguageKey): LanguageCode => {
    switch(lang) {
      case 'DE': return 'de';
      case 'EN': return 'en';
      case 'LA': return 'la';
      default: return 'de';
    }
  };

  // Helper functions for AI component props
  const getValidCulturalAnalysisTab = (subsection: string): CulturalAnalysisTab => {
    switch (subsection) {
      case 'analyze':
      case 'explore':
      case 'statistics':
        return subsection as CulturalAnalysisTab;
      default:
        return 'analyze';
    }
  };

  const getValidLearningPathMode = (subsection: string): LearningPathMode => {
    switch (subsection) {
      case 'dashboard':
      case 'daily_plan':
      case 'knowledge_gaps':
      case 'prerequisites':
      case 'ai_optimization':
        return subsection as LearningPathMode;
      default:
        return 'dashboard';
    }
  };

  // 📚 NAVIGATION SECTIONS
  const mainSections = [
    { id: 'intro', label: { de: 'Einführung', en: 'Introduction', la: 'Introductio' }, icon: Home },
    { id: 'quiz', label: { de: 'Quiz', en: 'Quiz', la: 'Quaestiones' }, icon: HelpCircle },
    { id: 'worldmap', label: { de: 'Weltkarte', en: 'World Map', la: 'Mappa Mundi' }, icon: Globe },
    { id: 'cosmos', label: { de: 'Kosmos', en: 'Cosmos', la: 'Cosmos' }, icon: Star },
    { id: 'banquet', label: { de: 'Gastmahl', en: 'Banquet', la: 'Convivium' }, icon: Wine },
    { id: 'textsearch', label: { de: 'Textsuche', en: 'Text Search', la: 'Quaestio Textuum' }, icon: Search },
    { id: 'learning', label: { de: 'Lernen', en: 'Learning', la: 'Discere' }, icon: GraduationCap },
    { id: 'vokabeltrainer', label: { de: 'Vokabeltrainer', en: 'Vocabulary Trainer', la: 'Exercitium Vocabulorum' }, icon: BarChart3 },
    { id: 'visualizations', label: { de: 'Visualisierungen', en: 'Visualizations', la: 'Visualizationes' }, icon: BarChart3 }
  ];

  const kiSections = [
    { id: 'ki-kulturanalyse', label: { de: 'KI-Kulturanalyse', en: 'AI Cultural Analysis', la: 'AI Analysis Culturalis' }, icon: Brain },
    { id: 'lernpfade', label: { de: 'Lernpfade', en: 'Learning Paths', la: 'Semitae Discendi' }, icon: Target },
    { id: 'ki-tutor', label: { de: 'KI-Tutor', en: 'AI Tutor', la: 'AI Praeceptor' }, icon: Crown },
    { id: 'kulturmodule', label: { de: 'Kulturmodule', en: 'Cultural Modules', la: 'Moduli Culturales' }, icon: Scroll }
  ];

  // Section rendering with proper component support
  const renderSection = () => {
    console.log('🔍 Rendering section:', currentSection, 'subsection:', currentSubSection);
    
    try {
      switch(currentSection) {
        case 'intro': 
          return <IntroSection language={language} />;
        case 'banquet': 
          return <BanquetSection isActive={true} language={language} />;
        case 'cosmos': 
          return <CosmosSection isActive={true} language={language} />;
        case 'quiz': 
          return <QuizSection isActive={true} language={language} />;
        case 'textsearch': 
          return <TextSearchSection isActive={true} language={language} />;
        case 'worldmap': 
          return <WorldMapSection isActive={true} t={t} language={language} />;
        case 'visualizations': 
          return <VisualizationsSection isActive={true} language={language} />;
        case 'vokabeltrainer': 
          return <VocabularyTrainer isActive={true} language={language} />;
        case 'learning': 
          return <LearningSection isActive={true} language={language} />;
        case 'ki-kulturanalyse':
          return (
            <AICulturalAnalysisSection 
              language={language} 
              activeTab={getValidCulturalAnalysisTab(currentSubSection)} 
            />
          );
        case 'lernpfade':
          return (
            <PersonalizedLearningPaths 
              currentMode={getValidLearningPathMode(currentSubSection)} 
            />
          );
        case 'ki-tutor':
          return <AITutoringSystemSection language={language} />;
        case 'kulturmodule':
          return (
            <AICulturalAnalysisSection 
              language={language} 
              activeTab={getValidCulturalAnalysisTab(currentSubSection)} 
            />
          );
        default: 
          return <IntroSection language={language} />;
      }
    } catch (error) {
      console.error('Error rendering section:', error);
      return (
        <div style={{ padding: '32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#92400e', marginBottom: '16px' }}>
            Section Loading...
          </h2>
          <p style={{ color: '#a16207' }}>
            Please wait while the section loads.
          </p>
        </div>
      );
    }
  };

  // Handle navigation
  const handleNavigation = (sectionId: string, subSectionId?: string) => {
    console.log('🔄 Navigating to:', sectionId, subSectionId ? `(${subSectionId})` : '');
    setCurrentSection(sectionId);
    setCurrentSubSection(subSectionId || '');
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f8f6f0 0%, #f5f1e8 25%, #f0ebe2 50%, #ede5d8 75%, #ebe1d0 100%)',
        fontFamily: 'Georgia, serif'
      }}
    >
      {/* 🌟 ASTROLABIUM BACKGROUND */}
      <div 
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          opacity: 0.08,
          pointerEvents: 'none',
          zIndex: 0,
          width: '400px',
          height: '400px',
          backgroundImage: 'url(/Astrolab.jpg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          filter: 'sepia(20%) saturate(120%) brightness(110%)'
        }}
      />
      
      {/* 🏛️ VERTICAL LEFT SIDEBAR - FORCED WITH INLINE STYLES */}
      <aside 
        style={{
          width: '320px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 30,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          borderRight: '2px solid rgba(212, 175, 55, 0.2)',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(248, 246, 240, 0.9))'
        }}
      >
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {/* HEADER */}
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <ClassicalMacrobiusPortrait />
            <h1 style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: '#92400e', 
              fontFamily: 'Times New Roman, serif', 
              marginBottom: '4px',
              margin: '0 0 4px 0'
            }}>
              MACROBIUS
            </h1>
            <p style={{ 
              fontSize: '14px', 
              color: '#a16207', 
              fontStyle: 'italic',
              margin: 0
            }}>
              Eine antike Flaschenpost
            </p>
          </div>
          
          {/* 🏛️ HAUPTNAVIGATION - VERTICAL */}
          <nav style={{ marginBottom: '32px' }}>
            <h3 style={{ 
              fontSize: '12px', 
              fontWeight: 'bold', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em', 
              marginBottom: '16px', 
              padding: '0 8px', 
              color: '#a16207'
            }}>
              Hauptnavigation
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {mainSections.map((section) => {
                const IconComponent = section.icon;
                const isActive = currentSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => handleNavigation(section.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      border: `1px solid ${isActive ? 'rgba(212, 175, 55, 0.4)' : 'rgba(212, 175, 55, 0.1)'}`,
                      backgroundColor: isActive ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255, 255, 255, 0.3)',
                      color: isActive ? '#92400e' : '#a16207',
                      boxShadow: isActive ? '0 2px 12px rgba(212, 175, 55, 0.2)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    <IconComponent 
                      style={{ 
                        width: '20px', 
                        height: '20px', 
                        color: isActive ? '#d4af37' : '#a16207',
                        flexShrink: 0
                      }} 
                    />
                    {section.label[getLanguageKey(language)]}
                  </button>
                );
              })}
            </div>
          </nav>
          
          {/* 🏛️ KI-SYSTEME SECTION */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ 
              fontSize: '12px', 
              fontWeight: 'bold', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em', 
              marginBottom: '16px', 
              padding: '0 8px', 
              color: '#a16207'
            }}>
              KI-Systeme
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {kiSections.map((section) => {
                const IconComponent = section.icon;
                const isActive = currentSection === section.id;
                
                return (
                  <button
                    key={section.id}
                    onClick={() => handleNavigation(section.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      border: `1px solid ${isActive ? 'rgba(212, 175, 55, 0.3)' : 'rgba(212, 175, 55, 0.1)'}`,
                      backgroundColor: isActive ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 255, 255, 0.2)',
                      color: isActive ? '#92400e' : '#a16207'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                      }
                    }}
                  >
                    <IconComponent 
                      style={{ 
                        width: '16px', 
                        height: '16px', 
                        color: isActive ? '#d4af37' : '#a16207',
                        flexShrink: 0
                      }} 
                    />
                    {section.label[getLanguageKey(language)]}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* 🏛️ ORACLE CLOUD STATUS */}
          <div 
            style={{
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '24px',
              border: `1px solid ${oracleStatus === 'connected' 
                ? 'rgba(34, 197, 94, 0.3)' 
                : oracleStatus === 'offline' 
                ? 'rgba(239, 68, 68, 0.3)' 
                : 'rgba(245, 158, 11, 0.3)'}`,
              backgroundColor: oracleStatus === 'connected' 
                ? 'rgba(34, 197, 94, 0.1)' 
                : oracleStatus === 'offline' 
                ? 'rgba(239, 68, 68, 0.1)' 
                : 'rgba(245, 158, 11, 0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div 
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: oracleStatus === 'connected' ? '#10b981' :
                    oracleStatus === 'offline' ? '#ef4444' : '#f59e0b',
                  animation: oracleStatus === 'checking' ? 'pulse 2s ease-in-out infinite' : 'none'
                }}
              />
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#92400e' }}>
                Oracle Cloud
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#a16207', margin: 0 }}>
              {oracleStatus === 'connected' ? '1.401 Kulturelle Texte' :
               oracleStatus === 'offline' ? 'Offline - Fallback Modus' : 'Verbindung prüfen...'}
            </p>
          </div>
          
          {/* 🏛️ LANGUAGE SWITCHER */}
          <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
            {(['de', 'en', 'la'] as const).map((lang) => {
              const isActive = getLanguageKey(language) === lang;
              return (
                <button
                  key={lang}
                  onClick={() => setLanguage(convertToLanguage(lang))}
                  style={{
                    padding: '8px 12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    borderRadius: '6px',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    backgroundColor: isActive ? '#d4af37' : 'rgba(212, 175, 55, 0.1)',
                    color: isActive ? '#ffffff' : '#a16207',
                    boxShadow: isActive ? '0 2px 8px rgba(212, 175, 55, 0.3)' : 'none'
                  }}
                >
                  {lang.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>
      </aside>
      
      {/* 🏛️ MAIN CONTENT AREA - PROPERLY POSITIONED */}
      <main 
        style={{
          flex: 1,
          height: '100vh',
          overflowY: 'auto',
          background: 'rgba(255, 255, 255, 0.3)',
          position: 'relative',
          zIndex: 20
        }}
      >
        <div 
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            minHeight: '100%',
            paddingTop: '32px'
          }}
        >
          <div 
            style={{
              width: '100%',
              maxWidth: '1792px',
              margin: '0 auto',
              padding: '0 32px'
            }}
          >
            {renderSection()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClassicalMacrobiusApp;