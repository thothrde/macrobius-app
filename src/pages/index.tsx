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
        className="w-full h-full rounded-full overflow-hidden border-2 border-amber-400"
        style={{
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(139, 92, 41, 0.1))',
          boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)'
        }}
      >
        <img 
          src="/Macrobius-Portrait.jpg" 
          alt="Macrobius Classical Portrait"
          className="w-full h-full object-cover"
          style={{ filter: 'sepia(10%) saturate(110%) brightness(105%)' }}
        />
        <div 
          className="absolute bottom-0 left-0 right-0 text-center py-1"
          style={{
            background: 'linear-gradient(to top, rgba(212, 175, 55, 0.9), transparent)'
          }}
        >
          <span className="text-xs font-serif font-bold text-amber-900">
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

// 🏛️ MAIN CLASSICAL APP - FIXED WITH VERTICAL SUB-NAVIGATION
const ClassicalMacrobiusApp: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [currentSection, setCurrentSection] = useState<string>('intro');
  const [currentSubSection, setCurrentSubSection] = useState<string>(''); // For sub-navigation
  const [oracleStatus, setOracleStatus] = useState<'checking' | 'connected' | 'offline'>('checking');
  
  // 🔌 ORACLE CLOUD CONNECTION CHECK
  useEffect(() => {
    const checkOracleConnection = async () => {
      try {
        const response = await fetch('http://152.70.184.232:8080/api/health', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(5000)
        });
        
        if (response.ok) {
          setOracleStatus('connected');
        } else {
          setOracleStatus('offline');
        }
      } catch (error) {
        setOracleStatus('offline');
      }
    };
    
    checkOracleConnection();
    const interval = setInterval(checkOracleConnection, 30000);
    return () => clearInterval(interval);
  }, []);
  
  // 📝 DEBUG LOGGING
  useEffect(() => {
    console.log('🏛️ MACROBIUS: Navigation fixes applied!');
    console.log('✅ Fixed: Vertical navigation only, centered content, full page switching');
    document.title = 'Macrobius - Classical Digital Edition';
  }, []);
  
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

  return (
    <div 
      className="min-h-screen max-h-screen flex relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f8f6f0 0%, #f5f1e8 25%, #f0ebe2 50%, #ede5d8 75%, #ebe1d0 100%)',
        fontFamily: 'Georgia, serif'
      }}
    >
      {/* ASTROLABIUM BACKGROUND */}
      <div 
        className="absolute top-4 right-4 opacity-8 pointer-events-none z-0"
        style={{
          width: '400px',
          height: '400px',
          backgroundImage: 'url(/Astrolab.jpg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          filter: 'sepia(20%) saturate(120%) brightness(110%)'
        }}
      />
      
      {/* FLOATING ELEMENTS */}
      <div className="fixed inset-0 z-10">
        <FloatingElements />
      </div>
      
      {/* ✅ ENHANCED VERTICAL LEFT SIDEBAR - WITH SUB-NAVIGATION */}
      <aside 
        className="w-80 h-screen flex flex-col z-30 bg-white/90 backdrop-blur-sm border-r-2 border-amber-200 shadow-lg"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(248, 246, 240, 0.9))'
        }}
      >
        <div className="flex-1 overflow-y-auto p-6">
          {/* HEADER */}
          <div className="mb-8 text-center">
            <ClassicalMacrobiusPortrait className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-amber-900" style={{ fontFamily: 'Times New Roman, serif' }}>
              MACROBIUS
            </h1>
            <p className="text-sm text-amber-700 italic">
              Eine antike Flaschenpost
            </p>
          </div>
          
          {/* ✅ MAIN NAVIGATION - VERTICAL */}
          <nav className="space-y-2 mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4 px-2 text-amber-700">
              Hauptnavigation
            </h3>
            {mainSections.map((section) => {
              const IconComponent = section.icon;
              const isActive = currentSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => handleNavigation(section.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-102"
                  style={{
                    backgroundColor: isActive ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255, 255, 255, 0.3)',
                    color: isActive ? '#92400e' : '#a16207',
                    border: isActive ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid rgba(212, 175, 55, 0.1)',
                    boxShadow: isActive ? '0 2px 12px rgba(212, 175, 55, 0.2)' : 'none'
                  }}
                >
                  <IconComponent 
                    className="w-5 h-5" 
                    style={{ color: isActive ? '#d4af37' : '#a16207' }} 
                  />
                  {section.label[getLanguageKey(language)]}
                </button>
              );
            })}
          </nav>
          
          {/* ✅ KI-SYSTEME SECTION - WITH SUB-NAVIGATION */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4 px-2 text-amber-700">
              KI-Systeme
            </h3>
            <nav className="space-y-2">
              {kiSections.map((section) => {
                const IconComponent = section.icon;
                const isActive = currentSection === section.id;
                const subSections = getSubSections(section.id);
                
                return (
                  <div key={section.id}>
                    <button
                      onClick={() => handleNavigation(section.id)}
                      className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-200"
                      style={{
                        backgroundColor: isActive ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 255, 255, 0.2)',
                        color: isActive ? '#92400e' : '#a16207',
                        border: isActive ? '1px solid rgba(212, 175, 55, 0.3)' : '1px solid rgba(212, 175, 55, 0.1)'
                      }}
                    >
                      <IconComponent 
                        className="w-4 h-4" 
                        style={{ color: isActive ? '#d4af37' : '#a16207' }} 
                      />
                      {section.label[getLanguageKey(language)]}
                    </button>
                    
                    {/* ✅ SUB-NAVIGATION - ONLY SHOW WHEN SECTION IS ACTIVE */}
                    {isActive && subSections.length > 0 && (
                      <div className="ml-6 mt-2 space-y-1">
                        {subSections.map((subSection) => {
                          const SubIconComponent = subSection.icon;
                          const isSubActive = currentSubSection === subSection.id;
                          return (
                            <button
                              key={subSection.id}
                              onClick={() => handleNavigation(section.id, subSection.id)}
                              className="w-full flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-all duration-200"
                              style={{
                                backgroundColor: isSubActive ? 'rgba(212, 175, 55, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                                color: isSubActive ? '#92400e' : '#a16207',
                                border: isSubActive ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid transparent'
                              }}
                            >
                              <SubIconComponent 
                                className="w-3 h-3" 
                                style={{ color: isSubActive ? '#d4af37' : '#a16207' }} 
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
          
          {/* ✅ ORACLE CLOUD STATUS */}
          <div 
            className="p-4 rounded-lg mb-6 border"
            style={{
              backgroundColor: oracleStatus === 'connected' 
                ? 'rgba(34, 197, 94, 0.1)' 
                : oracleStatus === 'offline' 
                ? 'rgba(239, 68, 68, 0.1)' 
                : 'rgba(245, 158, 11, 0.1)',
              borderColor: oracleStatus === 'connected' 
                ? 'rgba(34, 197, 94, 0.3)' 
                : oracleStatus === 'offline' 
                ? 'rgba(239, 68, 68, 0.3)' 
                : 'rgba(245, 158, 11, 0.3)'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div 
                className={`w-3 h-3 rounded-full ${
                  oracleStatus === 'connected' ? 'bg-green-500' :
                  oracleStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
                } ${oracleStatus === 'checking' ? 'animate-pulse' : ''}`}
              />
              <span className="text-xs font-semibold text-amber-900">
                Oracle Cloud
              </span>
            </div>
            <p className="text-xs text-amber-800">
              {oracleStatus === 'connected' ? '1.401 Kulturelle Texte' :
               oracleStatus === 'offline' ? 'Offline - Fallback Modus' : 'Verbindung prüfen...'}
            </p>
          </div>
          
          {/* ✅ LANGUAGE SWITCHER */}
          <div className="flex gap-1 justify-center">
            {(['de', 'en', 'la'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className="px-3 py-2 text-xs font-medium rounded transition-all duration-200"
                style={{
                  backgroundColor: getLanguageKey(language) === lang ? '#d4af37' : 'rgba(212, 175, 55, 0.1)',
                  color: getLanguageKey(language) === lang ? '#ffffff' : '#a16207',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  boxShadow: getLanguageKey(language) === lang ? '0 2px 8px rgba(212, 175, 55, 0.3)' : 'none'
                }}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </aside>
      
      {/* ✅ MAIN CONTENT AREA - PROPERLY CENTERED */}
      <main className="flex-1 h-screen overflow-y-auto" style={{ background: 'rgba(255, 255, 255, 0.3)' }}>
        <div className="relative z-20 flex items-center justify-center min-h-full">
          <div className="w-full max-w-7xl mx-auto px-8 py-8">
            {renderSection()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClassicalMacrobiusApp;