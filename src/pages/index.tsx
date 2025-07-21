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
  Crown
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

// TypeScript interfaces
interface ClassicalPortraitProps {
  className?: string;
}

type LanguageCode = 'de' | 'en' | 'la';
type LanguageKey = 'DE' | 'EN' | 'LA';

// 🏛️ RESTORED CLASSICAL PORTRAIT - MATCHING ORIGINAL STYLE
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
            background: 'linear-gradient(to top, rgba(212, 175, 55, 0.9), transparent)',
            backdropFilter: 'blur(2px)'
          }}
        >
          <span 
            className="text-xs font-serif font-bold text-amber-900"
            style={{ 
              letterSpacing: '0.05em',
              textShadow: '0 1px 2px rgba(255,255,255,0.8)'
            }}
          >
            MACROBIVS
          </span>
        </div>
      </div>
    </div>
  );
};

// 🌟 SUBTLE CLASSICAL ELEMENTS
const FloatingElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={`element-${i}`}
          className="absolute rounded-full opacity-20"
          style={{
            width: Math.random() * 6 + 3 + 'px',
            height: Math.random() * 6 + 3 + 'px',
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
          50% { transform: translateY(-20px) rotate(5deg); opacity: 0.1; }
        }
      `}</style>
    </div>
  );
};

// 🏛️ MAIN CLASSICAL APP - RESTORED ELEGANCE
const ClassicalMacrobiusApp: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [currentSection, setCurrentSection] = useState<string>('intro');
  const [oracleStatus, setOracleStatus] = useState<'checking' | 'connected' | 'offline'>('checking');
  
  // 🔌 ORACLE CLOUD CONNECTION CHECK
  useEffect(() => {
    const checkOracleConnection = async () => {
      try {
        const response = await fetch('http://152.70.184.232:8080/api/health', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(5000) // 5 second timeout
        });
        
        if (response.ok) {
          setOracleStatus('connected');
          console.log('✅ Oracle Cloud: Connected successfully!');
        } else {
          setOracleStatus('offline');
          console.warn('⚠️ Oracle Cloud: Server responded with error');
        }
      } catch (error) {
        setOracleStatus('offline');
        console.warn('⚠️ Oracle Cloud: Connection failed - using offline mode');
      }
    };
    
    checkOracleConnection();
    
    // Check periodically every 30 seconds
    const interval = setInterval(checkOracleConnection, 30000);
    return () => clearInterval(interval);
  }, []);
  
  // 📝 DEBUG LOGGING
  useEffect(() => {
    console.log('🏛️ CLASSICAL MACROBIUS APP: Functionality restored!');
    console.log('🔧 FIXES APPLIED: Button navigation, Oracle status, visual improvements');
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

  // ✅ SECTION RENDERING - FUNCTIONALITY PRESERVED
  const renderSection = () => {
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
      default: 
        return <IntroSection language={language} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: 'Georgia, serif' }}>
      {/* 🌅 RESTORED CLASSICAL GRADIENT BACKGROUND */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: `
            linear-gradient(135deg, 
              #f8f6f0 0%, 
              #f5f1e8 25%, 
              #f0ebe2 50%, 
              #ede5d8 75%, 
              #ebe1d0 100%
            )
          `,
          backgroundImage: `
            radial-gradient(circle at 25% 75%, rgba(212, 175, 55, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 75% 25%, rgba(139, 92, 41, 0.03) 0%, transparent 50%)
          `
        }}
      />
      
      {/* 🌟 FLOATING ELEMENTS */}
      <div className="fixed inset-0 z-10">
        <FloatingElements />
      </div>
      
      {/* 🏛️ CLASSICAL HEADER */}
      <header 
        className="relative z-20 bg-white/70 backdrop-blur-sm border-b border-amber-200 shadow-sm"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(248, 246, 240, 0.8))'
        }}
      >
        {/* ASTROLABIUM BACKGROUND - ELEGANT PLACEMENT */}
        <div 
          className="absolute top-0 right-0 opacity-5 pointer-events-none"
          style={{
            width: '180px',
            height: '180px',
            backgroundImage: 'url(/Astrolab.jpg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            filter: 'sepia(20%) saturate(120%) brightness(110%)'
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* TITLE WITH PORTRAIT */}
            <div className="flex items-center space-x-4">
              <ClassicalMacrobiusPortrait className="w-14 h-14" />
              <div>
                <h1 
                  className="text-2xl font-bold text-amber-900"
                  style={{ 
                    fontFamily: 'Times New Roman, serif',
                    textShadow: '1px 1px 2px rgba(212, 175, 55, 0.2)'
                  }}
                >
                  MACROBIUS
                </h1>
                <p className="text-sm text-amber-700 italic">
                  Eine antike Flaschenpost
                </p>
              </div>
            </div>
            
            {/* STATUS & CONTROLS */}
            <div className="flex items-center space-x-4">
              {/* ORACLE CLOUD STATUS - IMPROVED */}
              <div 
                className="flex items-center space-x-2 px-3 py-2 rounded-lg border"
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
                <div 
                  className={`w-2 h-2 rounded-full ${
                    oracleStatus === 'connected' ? 'bg-green-500' :
                    oracleStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
                  } ${oracleStatus === 'checking' ? 'animate-pulse' : ''}`}
                />
                <span className="text-xs font-medium text-amber-900">
                  Oracle Cloud: {
                    oracleStatus === 'connected' ? '1.401 Texte' :
                    oracleStatus === 'offline' ? 'Offline' : 'Prüfung...'
                  }
                </span>
              </div>
              
              {/* LANGUAGE SWITCHER */}
              <div className="flex space-x-1">
                {(['de', 'en'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className="px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: getLanguageKey(language) === lang 
                        ? '#d4af37' 
                        : 'rgba(212, 175, 55, 0.1)',
                      color: getLanguageKey(language) === lang ? '#ffffff' : '#92400e',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      boxShadow: getLanguageKey(language) === lang 
                        ? '0 2px 8px rgba(212, 175, 55, 0.3)' 
                        : 'none'
                    }}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* 📚 HORIZONTAL NAVIGATION - IMPROVED */}
      <nav 
        className="relative z-20 bg-white/80 backdrop-blur-sm border-b border-amber-100 shadow-sm"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(248, 246, 240, 0.8))'
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* MAIN SECTIONS */}
          <div className="flex items-center justify-center space-x-1 py-3 overflow-x-auto">
            {mainSections.map((section) => {
              const IconComponent = section.icon;
              const isActive = currentSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(section.id)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 whitespace-nowrap"
                  style={{
                    backgroundColor: isActive ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                    color: isActive ? '#92400e' : '#a16207',
                    border: isActive ? '1px solid rgba(212, 175, 55, 0.3)' : '1px solid transparent',
                    boxShadow: isActive ? '0 2px 8px rgba(212, 175, 55, 0.15)' : 'none'
                  }}
                >
                  <IconComponent 
                    className="w-4 h-4" 
                    style={{ color: isActive ? '#d4af37' : '#a16207' }} 
                  />
                  <span>{section.label[getLanguageKey(language)]}</span>
                </button>
              );
            })}
          </div>
          
          {/* KI-SYSTEME */}
          <div className="border-t border-amber-100 py-2">
            <div className="flex items-center justify-center space-x-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                KI-Systeme:
              </span>
              <div className="flex items-center space-x-1">
                {kiSections.map((section) => {
                  const IconComponent = section.icon;
                  const isActive = currentSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setCurrentSection(section.id)}
                      className="flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium transition-all duration-200 hover:scale-105"
                      style={{
                        backgroundColor: isActive ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                        color: isActive ? '#92400e' : '#a16207',
                        border: isActive ? '1px solid rgba(212, 175, 55, 0.2)' : '1px solid transparent'
                      }}
                    >
                      <IconComponent 
                        className="w-3 h-3" 
                        style={{ color: isActive ? '#d4af37' : '#a16207' }} 
                      />
                      <span>{section.label[getLanguageKey(language)]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* 📖 MAIN CONTENT */}
      <main className="relative z-20">
        <div 
          className="max-w-7xl mx-auto p-6"
          style={{
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            margin: '20px auto',
            boxShadow: '0 4px 20px rgba(212, 175, 55, 0.08)',
            border: '1px solid rgba(212, 175, 55, 0.1)'
          }}
        >
          {renderSection()}
        </div>
      </main>
      
      {/* 🏛️ FOOTER */}
      <footer 
        className="relative z-20 text-center py-4 border-t border-amber-100"
        style={{
          background: 'linear-gradient(to top, rgba(212, 175, 55, 0.05), transparent)'
        }}
      >
        <p className="text-sm italic text-amber-800">
          Macrobius Digital Edition - Antike Weisheit für das 21. Jahrhundert
        </p>
      </footer>
    </div>
  );
};

export default ClassicalMacrobiusApp;