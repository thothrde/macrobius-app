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
  User,
  Sparkles,
  BookOpen,
  Brain,
  Target,
  Scroll,
  Crown,
  Filter,
  AlertTriangle,
  Network,
  CalendarDays,
  Gauge
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

// Import Robust Oracle Client
import { oracleAPI, type ConnectionStatus } from '@/lib/robust-oracle-client';

// TypeScript interfaces
interface ClassicalPortraitProps {
  className?: string;
}

type LanguageCode = 'de' | 'en' | 'la';
type LanguageKey = 'DE' | 'EN' | 'LA';

// ✅ FIXED: Proper type definitions for AI component props
type CulturalAnalysisTab = 'analyze' | 'explore' | 'statistics';
type LearningPathMode = 'dashboard' | 'daily_plan' | 'knowledge_gaps' | 'prerequisites' | 'ai_optimization';

// 🏛️ CLASSICAL PORTRAIT
const ClassicalMacrobiusPortrait: React.FC<ClassicalPortraitProps> = ({ className = '' }) => {
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
          alt="Macrobius Classical Portrait"
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

// 🌟 FLOATING ELEMENTS
const FloatingElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={`element-${i}`}
          className="absolute rounded-full opacity-20"
          style={{
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            backgroundColor: '#d4af37',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animation: `gentleFloat ${12 + Math.random() * 8}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 6}s`
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-15px) rotate(3deg); opacity: 0.1; }
        }
      `}</style>
    </div>
  );
};

// 🏛️ MAIN CLASSICAL APP - WITH ROBUST ORACLE CONNECTION
const ClassicalMacrobiusApp: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [currentSection, setCurrentSection] = useState<string>('intro');
  const [currentSubSection, setCurrentSubSection] = useState<string>(''); // For sub-navigation
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    oracle: 'checking',
    rag: 'checking',
    ai_systems: 'checking'
  });
  
  // 🔌 ROBUST ORACLE CLOUD & RAG CONNECTION CHECK
  useEffect(() => {
    const checkAllConnections = async () => {
      try {
        // Get connection status from robust client
        const status = oracleAPI.getConnectionStatus();
        setConnectionStatus(status);
        
        console.log('🏛️ COMPREHENSIVE CONNECTION STATUS:', status);
        
        // Test Oracle Cloud health
        if (status.oracle === 'connected') {
          try {
            const healthResponse = await oracleAPI.healthCheck();
            console.log('✅ Oracle Cloud health check:', healthResponse);
          } catch (error) {
            console.log('⚠️ Oracle Cloud health check failed:', error);
          }
        }
        
        // Test RAG system
        if (status.rag === 'connected') {
          try {
            const ragResponse = await oracleAPI.rag.query('test query');
            console.log('✅ RAG system test:', ragResponse);
          } catch (error) {
            console.log('⚠️ RAG system test failed:', error);
          }
        }
        
        // Test AI tutoring system
        if (status.ai_systems === 'connected') {
          try {
            const tutoringResponse = await oracleAPI.tutoring.startSession('test-user');
            console.log('✅ AI tutoring test:', tutoringResponse);
          } catch (error) {
            console.log('⚠️ AI tutoring test failed:', error);
          }
        }
        
      } catch (error) {
        console.error('❌ Connection check failed:', error);
        setConnectionStatus({
          oracle: 'offline',
          rag: 'offline', 
          ai_systems: 'offline'
        });
      }
    };
    
    // Initial connection check
    checkAllConnections();
    
    // Periodic connection monitoring
    const interval = setInterval(checkAllConnections, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);
  
  // 📝 DEBUG LOGGING - COMPREHENSIVE STATUS
  useEffect(() => {
    console.log('🏛️ MACROBIUS: COMPREHENSIVE BACKEND INTEGRATION ACTIVE');
    console.log('✅ Fixed: Oracle Cloud, RAG, and all AI systems with robust fallbacks');
    console.log('🔧 Connection Status:', connectionStatus);
    document.title = 'Macrobius - Classical Digital Edition';
  }, [connectionStatus]);
  
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

  const handleLanguageChange = (lang: LanguageCode): void => {
    setLanguage(convertToLanguage(lang));
  };

  // ✅ FIXED: Type-safe helper functions for AI component props
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
    { id: 'vokabeltrainer', label: { de: 'Vokabeltrainer', en: 'Vocabulary Trainer', la: 'Exercitium Vocabulorum' }, icon: BookOpen },
    { id: 'visualizations', label: { de: 'Visualisierungen', en: 'Visualizations', la: 'Visualizationes' }, icon: BarChart3 }
  ];

  const kiSections = [
    { id: 'ki-kulturanalyse', label: { de: 'KI-Kulturanalyse', en: 'AI Cultural Analysis', la: 'AI Analysis Culturalis' }, icon: Brain },
    { id: 'lernpfade', label: { de: 'Lernpfade', en: 'Learning Paths', la: 'Semitae Discendi' }, icon: Target },
    { id: 'ki-tutor', label: { de: 'KI-Tutor', en: 'AI Tutor', la: 'AI Praeceptor' }, icon: Crown },
    { id: 'kulturmodule', label: { de: 'Kulturmodule', en: 'Cultural Modules', la: 'Moduli Culturales' }, icon: Scroll }
  ];

  // ✅ VERTICAL SUB-NAVIGATION FOR COMPLEX SECTIONS
  const getSubSections = (sectionId: string) => {
    switch(sectionId) {
      case 'ki-kulturanalyse':
        return [
          { id: 'analyze', label: { de: 'KI-Analyse', en: 'AI Analysis', la: 'Analysis AI' }, icon: Brain },
          { id: 'explore', label: { de: 'Themen-Explorer', en: 'Theme Explorer', la: 'Explorator Thematum' }, icon: Search },
          { id: 'statistics', label: { de: 'Statistiken', en: 'Statistics', la: 'Statistica' }, icon: BarChart3 }
        ];
      case 'lernpfade':
        return [
          { id: 'dashboard', label: { de: 'Dashboard', en: 'Dashboard', la: 'Tabula Administrationis' }, icon: Gauge },
          { id: 'daily_plan', label: { de: 'KI-Tagesplan', en: 'AI Daily Plan', la: 'Consilium AI Diurnum' }, icon: CalendarDays },
          { id: 'knowledge_gaps', label: { de: 'KI-Wissenslücken', en: 'AI Knowledge Gaps', la: 'Lacunae AI Scientiae' }, icon: AlertTriangle },
          { id: 'prerequisites', label: { de: 'KI-Voraussetzungen', en: 'AI Prerequisites', la: 'Requisita AI' }, icon: Network },
          { id: 'ai_optimization', label: { de: 'KI-Optimierung', en: 'AI Optimization', la: 'Optimizatio AI' }, icon: Sparkles }
        ];
      default:
        return [];
    }
  };

  // ✅ FIXED SECTION RENDERING - WITH SUB-SECTION SUPPORT AND PROPER TYPE CASTING
  const renderSection = () => {
    console.log('🔍 Rendering section:', currentSection, 'subsection:', currentSubSection);
    
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
      
      // ✅ FIXED: AI COMPONENTS WITH PROPER TYPE CASTING AND SUB-SECTION SUPPORT
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
        // For now, show cultural analysis as cultural modules are similar
        return (
          <AICulturalAnalysisSection 
            language={language} 
            activeTab={getValidCulturalAnalysisTab(currentSubSection)} 
          />
        );
      
      default: 
        return <IntroSection language={language} />;
    }
  };

  // Handle navigation with sub-section support
  const handleNavigation = (sectionId: string, subSectionId?: string) => {
    console.log('🔄 Navigating to:', sectionId, subSectionId ? `(${subSectionId})` : '');
    setCurrentSection(sectionId);
    setCurrentSubSection(subSectionId || '');
  };

  // ✅ RECONNECT HANDLER FOR TESTING CONNECTIONS
  const handleReconnect = async () => {
    console.log('🔄 Manual reconnection triggered...');
    try {
      await oracleAPI.reconnect();
      const status = oracleAPI.getConnectionStatus();
      setConnectionStatus(status);
      console.log('✅ Reconnection completed:', status);
    } catch (error) {
      console.error('❌ Reconnection failed:', error);
    }
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        maxHeight: '100vh',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f8f6f0 0%, #f5f1e8 25%, #f0ebe2 50%, #ede5d8 75%, #ebe1d0 100%)',
        fontFamily: 'Georgia, serif'
      }}
    >
      {/* ASTROLABIUM BACKGROUND */}
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
      
      {/* FLOATING ELEMENTS */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 10 }}>
        <FloatingElements />
      </div>
      
      {/* ✅ ENHANCED VERTICAL LEFT SIDEBAR - WITH SUB-NAVIGATION */}
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
          
          {/* ✅ MAIN NAVIGATION - VERTICAL */}
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
          
          {/* ✅ KI-SYSTEME SECTION - WITH SUB-NAVIGATION */}
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
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {kiSections.map((section) => {
                const IconComponent = section.icon;
                const isActive = currentSection === section.id;
                const subSections = getSubSections(section.id);
                
                return (
                  <div key={section.id}>
                    <button
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
                    
                    {/* ✅ SUB-NAVIGATION - ONLY SHOW WHEN SECTION IS ACTIVE */}
                    {isActive && subSections.length > 0 && (
                      <div style={{ marginLeft: '24px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {subSections.map((subSection) => {
                          const SubIconComponent = subSection.icon;
                          const isSubActive = currentSubSection === subSection.id;
                          return (
                            <button
                              key={subSection.id}
                              onClick={() => handleNavigation(section.id, subSection.id)}
                              style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '6px 12px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                transition: 'all 0.2s ease',
                                cursor: 'pointer',
                                border: `1px solid ${isSubActive ? 'rgba(212, 175, 55, 0.4)' : 'transparent'}`,
                                backgroundColor: isSubActive ? 'rgba(212, 175, 55, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                                color: isSubActive ? '#92400e' : '#a16207'
                              }}
                            >
                              <SubIconComponent 
                                style={{ 
                                  width: '12px', 
                                  height: '12px', 
                                  color: isSubActive ? '#d4af37' : '#a16207',
                                  flexShrink: 0
                                }} 
                              />
                              {subSection.label[getLanguageKey(language)]}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
          
          {/* ✅ COMPREHENSIVE BACKEND STATUS */}
          <div 
            style={{
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '24px',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '12px', fontWeight: '600', color: '#92400e', margin: 0 }}>
                Backend Status
              </h4>
              <button
                onClick={handleReconnect}
                style={{
                  fontSize: '10px',
                  padding: '4px 8px',
                  border: '1px solid #d4af37',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  color: '#92400e',
                  cursor: 'pointer'
                }}
              >
                Reconnect
              </button>
            </div>
            
            {/* Oracle Cloud Status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div 
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: connectionStatus.oracle === 'connected' ? '#10b981' :
                    connectionStatus.oracle === 'offline' ? '#ef4444' : '#f59e0b',
                  animation: connectionStatus.oracle === 'checking' ? 'pulse 2s ease-in-out infinite' : 'none'
                }}
              />
              <span style={{ fontSize: '10px', color: '#a16207' }}>
                Oracle Cloud: {connectionStatus.oracle === 'connected' ? '1.401 Texte' :
                 connectionStatus.oracle === 'offline' ? 'Offline' : 'Prüfung...'}
              </span>
            </div>
            
            {/* RAG System Status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div 
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: connectionStatus.rag === 'connected' ? '#10b981' :
                    connectionStatus.rag === 'offline' ? '#ef4444' : '#f59e0b',
                  animation: connectionStatus.rag === 'checking' ? 'pulse 2s ease-in-out infinite' : 'none'
                }}
              />
              <span style={{ fontSize: '10px', color: '#a16207' }}>
                RAG System: {connectionStatus.rag === 'connected' ? 'Aktiv' :
                 connectionStatus.rag === 'offline' ? 'Offline' : 'Prüfung...'}
              </span>
            </div>
            
            {/* AI Systems Status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div 
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: connectionStatus.ai_systems === 'connected' ? '#10b981' :
                    connectionStatus.ai_systems === 'offline' ? '#ef4444' : '#f59e0b',
                  animation: connectionStatus.ai_systems === 'checking' ? 'pulse 2s ease-in-out infinite' : 'none'
                }}
              />
              <span style={{ fontSize: '10px', color: '#a16207' }}>
                KI-Systeme: {connectionStatus.ai_systems === 'connected' ? 'Aktiv' :
                 connectionStatus.ai_systems === 'offline' ? 'Offline' : 'Prüfung...'}
              </span>
            </div>
          </div>
          
          {/* ✅ LANGUAGE SWITCHER */}
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
      
      {/* ✅ MAIN CONTENT AREA - PROPERLY CENTERED */}
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