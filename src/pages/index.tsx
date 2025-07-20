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

// Enhanced Classical Portrait Component
const ClassicalMacrobiusPortrait: React.FC<ClassicalPortraitProps> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <div 
        className="w-full h-full rounded-full overflow-hidden"
        style={{
          border: '3px solid #facc15',
          background: 'linear-gradient(135deg, rgba(139, 92, 41, 0.2), rgba(180, 142, 82, 0.2))',
          boxShadow: '0 0 20px rgba(251, 191, 36, 0.4)'
        }}
      >
        <img 
          src="/Macrobius-Portrait.jpg" 
          alt="Macrobius Classical Portrait"
          className="w-full h-full object-cover"
          style={{ filter: 'sepia(20%) saturate(120%) brightness(110%)' }}
        />
        <div 
          className="absolute bottom-0 left-0 right-0 text-center py-1"
          style={{
            background: 'linear-gradient(to top, rgba(251, 191, 36, 0.9), transparent)',
            backdropFilter: 'blur(2px)'
          }}
        >
          <span 
            className="text-xs font-serif font-bold"
            style={{ 
              color: '#1a1a1a', 
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

// Moving Stars Component with Enhanced Animation
const MovingStars: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Static Stars */}
      {Array.from({ length: 80 }, (_, i) => (
        <div
          key={`star-${i}`}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            backgroundColor: '#facc15',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            opacity: Math.random() * 0.9 + 0.1,
            boxShadow: '0 0 10px rgba(251, 191, 36, 0.9)'
          }}
        />
      ))}
      
      {/* Moving Stars - Enhanced */}
      {Array.from({ length: 25 }, (_, i) => (
        <div
          key={`moving-star-${i}`}
          className="absolute rounded-full animate-pulse"
          style={{
            width: '3px',
            height: '3px',
            backgroundColor: '#ffffff',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animation: `moveLeft ${4 + Math.random() * 8}s linear infinite`,
            opacity: 0.9
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes moveLeft {
          from {
            transform: translateX(100vw);
          }
          to {
            transform: translateX(-100px);
          }
        }
      `}</style>
    </div>
  );
};

// Main App Component - COMPLETELY OVERRIDING SECTION SYSTEM
const ClassicalMacrobiusApp: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [currentSection, setCurrentSection] = useState<string>('intro');
  
  // DEBUG: CRITICAL - Log to confirm this is loading
  useEffect(() => {
    console.log('🏛️ CRITICAL: CORRECT SIDEBAR LAYOUT IS LOADING! 🏛️');
    console.log('If you see this message, the new layout should be visible!');
    console.log('🚀 VERCEL BUILD FIX: TypeScript error resolved - forcing new deployment!');
    console.log('✅ PROP FIX: Adding required isActive prop to section components!');
    
    // Force page title update to confirm changes
    document.title = 'Macrobius - LEFT SIDEBAR LAYOUT ACTIVE';
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

  // Navigation sections
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

  // Render the correct section component
  const renderSection = () => {
    // ✅ FIXED: Use language directly (already uppercase) and add required props
    // BanquetSection requires isActive prop and language prop
    switch(currentSection) {
      case 'intro': 
        return <IntroSection language={language} />;
      case 'banquet': 
        return <BanquetSection isActive={true} language={language} />;
      case 'cosmos': 
        return <CosmosSection />;
      case 'quiz': 
        return <QuizSection />;
      case 'textsearch': 
        return <TextSearchSection />;
      case 'worldmap': 
        return <WorldMapSection />;
      case 'visualizations': 
        return <VisualizationsSection />;
      case 'vokabeltrainer': 
        return <VocabularyTrainer />;
      case 'learning': 
        return <LearningSection />;
      default: 
        return <IntroSection language={language} />;
    }
  };

  return (
    <div 
      className="min-h-screen max-h-screen flex relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #1a1f2e 0%, #0f172a 40%, #020617 100%)',
        backgroundImage: `
          radial-gradient(circle at 25% 75%, rgba(120, 119, 198, 0.5) 0%, transparent 50%),
          radial-gradient(circle at 75% 25%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)
        `
      }}
    >
      {/* BACKGROUND ASTROLABIUM - VERY PROMINENT */}
      <div 
        className="absolute top-4 right-4 opacity-20 pointer-events-none z-0"
        style={{
          width: '500px',
          height: '500px',
          backgroundImage: 'url(/Astrolab.jpg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          filter: 'sepia(40%) saturate(150%) brightness(130%) contrast(120%)'
        }}
      />
      
      {/* ENHANCED MOVING STARS */}
      <MovingStars />
      
      {/* LEFT SIDEBAR - VERTICAL NAVIGATION - PROMINENT */}
      <aside 
        className="w-80 h-screen flex flex-col z-30"
        style={{
          backgroundColor: 'rgba(6, 10, 20, 0.98)',
          borderRight: '3px solid rgba(251, 191, 36, 0.4)',
          boxShadow: '6px 0 25px rgba(0, 0, 0, 0.6)'
        }}
      >
        <div className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="mb-8 text-center">
            <ClassicalMacrobiusPortrait className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-xl font-bold" style={{ color: '#facc15' }}>
              MACROBIUS
            </h1>
            <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Eine antike Flaschenpost
            </p>
          </div>
          
          {/* Main Navigation */}
          <nav className="space-y-2 mb-8">
            {mainSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(section.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-102"
                  style={{
                    backgroundColor: currentSection === section.id ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    color: currentSection === section.id ? '#facc15' : 'rgba(255, 255, 255, 0.9)',
                    border: currentSection === section.id ? '1px solid rgba(251, 191, 36, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: currentSection === section.id ? '0 0 20px rgba(251, 191, 36, 0.3)' : 'none'
                  }}
                >
                  <IconComponent 
                    className="w-5 h-5" 
                    style={{ color: currentSection === section.id ? '#facc15' : 'rgba(255, 255, 255, 0.8)' }} 
                  />
                  {section.label[getLanguageKey(language)]}
                </button>
              );
            })}
          </nav>
          
          {/* KI-SYSTEME Section */}
          <div className="mb-8">
            <h3 
              className="text-xs font-bold uppercase tracking-wider mb-4 px-4"
              style={{ color: 'rgba(251, 191, 36, 0.9)' }}
            >
              KI-SYSTEME
            </h3>
            <nav className="space-y-2">
              {kiSections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(section.id)}
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-300"
                    style={{
                      backgroundColor: currentSection === section.id ? 'rgba(251, 191, 36, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      color: currentSection === section.id ? '#facc15' : 'rgba(255, 255, 255, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <IconComponent 
                      className="w-4 h-4" 
                      style={{ color: currentSection === section.id ? '#facc15' : 'rgba(255, 255, 255, 0.7)' }} 
                    />
                    {section.label[getLanguageKey(language)]}
                  </button>
                );
              })}
            </nav>
          </div>
          
          {/* Oracle Cloud Status */}
          <div 
            className="p-4 rounded-lg mb-4"
            style={{
              backgroundColor: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              boxShadow: '0 0 15px rgba(251, 191, 36, 0.15)'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: '#10b981' }}
              />
              <span className="text-xs font-semibold" style={{ color: '#facc15' }}>
                Oracle Cloud
              </span>
            </div>
            <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              1.401 Kulturelle Texte
            </p>
          </div>
          
          {/* Language Switcher */}
          <div className="flex gap-2 justify-center">
            {(['de', 'en'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className="px-3 py-1 text-xs font-medium rounded transition-all duration-200"
                style={{
                  backgroundColor: getLanguageKey(language) === lang ? '#facc15' : 'transparent',
                  color: getLanguageKey(language) === lang ? '#000' : 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(251, 191, 36, 0.4)'
                }}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </aside>
      
      {/* MAIN CONTENT AREA - SECTION CONTENT */}
      <main className="flex-1 h-screen overflow-y-auto bg-white">
        {renderSection()}
      </main>
    </div>
  );
};

export default ClassicalMacrobiusApp;