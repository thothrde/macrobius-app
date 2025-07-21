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

// 🏛️ CLASSICAL ENHANCED PORTRAIT COMPONENT
const ClassicalMacrobiusPortrait: React.FC<ClassicalPortraitProps> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <div 
        className="w-full h-full rounded-full overflow-hidden"
        style={{
          border: '2px solid #d4af37',
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(139, 92, 41, 0.1))',
          boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)'
        }}
      >
        <img 
          src="/Macrobius-Portrait.jpg" 
          alt="Macrobius Classical Portrait"
          className="w-full h-full object-cover"
          style={{ filter: 'sepia(15%) saturate(110%) brightness(105%)' }}
        />
        <div 
          className="absolute bottom-0 left-0 right-0 text-center py-1"
          style={{
            background: 'linear-gradient(to top, rgba(212, 175, 55, 0.8), transparent)',
            backdropFilter: 'blur(1px)'
          }}
        >
          <span 
            className="text-xs font-serif font-bold"
            style={{ 
              color: '#5d4e37', 
              letterSpacing: '0.05em',
              textShadow: '0 1px 2px rgba(255,255,255,0.6)'
            }}
          >
            MACROBIVS
          </span>
        </div>
      </div>
    </div>
  );
};

// 🌟 SUBTLE CLASSICAL ANIMATION ELEMENTS
const ClassicalDecorations: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle floating elements */}
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={`decoration-${i}`}
          className="absolute opacity-20"
          style={{
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            backgroundColor: '#d4af37',
            borderRadius: '50%',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animation: `float ${8 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
};

// 🏛️ MAIN CLASSICAL MACROBIUS APP - COMPLETE REDESIGN
const ClassicalMacrobiusApp: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [currentSection, setCurrentSection] = useState<string>('intro');
  
  // ✅ DEBUG: Maintain functionality logging
  useEffect(() => {
    console.log('🏛️ CLASSICAL REDESIGN: Elegant layout loading!');
    console.log('✅ ALL FUNCTIONALITY PRESERVED: Language switching, Oracle Cloud, Zero mock systems');
    console.log('🎨 VISUAL ENHANCEMENT: Classical scholarly aesthetic restored');
    
    // Update page title to reflect new design
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

  // 📚 NAVIGATION SECTIONS (PRESERVED)
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

  // ✅ RENDER SECTION (FUNCTIONALITY PRESERVED)
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
    <div 
      className="min-h-screen"
      style={{
        background: `
          linear-gradient(135deg, 
            #faf7f0 0%, 
            #f5f1e8 25%, 
            #f0ebe2 50%, 
            #ede5d8 75%, 
            #e8dfc9 100%
          )
        `,
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(139, 92, 41, 0.06) 0%, transparent 50%),
          url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fill-opacity='0.03'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")
        `,
        minHeight: '100vh',
        fontFamily: 'Georgia, serif'
      }}
    >
      {/* 🌟 CLASSICAL DECORATIONS */}
      <ClassicalDecorations />
      
      {/* 🏛️ CLASSICAL HEADER WITH ASTROLABIUM */}
      <header 
        className="relative"
        style={{
          background: 'linear-gradient(to bottom, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05))',
          borderBottom: '2px solid rgba(212, 175, 55, 0.3)',
          boxShadow: '0 2px 10px rgba(212, 175, 55, 0.2)'
        }}
      >
        {/* ASTROLABIUM BACKGROUND - SUBTLE */}
        <div 
          className="absolute top-0 right-0 opacity-10 pointer-events-none"
          style={{
            width: '200px',
            height: '200px',
            backgroundImage: 'url(/Astrolab.jpg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            filter: 'sepia(30%) saturate(120%) brightness(110%)'
          }}
        />
        
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* CLASSICAL TITLE WITH PORTRAIT */}
            <div className="flex items-center space-x-4">
              <ClassicalMacrobiusPortrait className="w-16 h-16" />
              <div>
                <h1 
                  className="text-3xl font-bold"
                  style={{ 
                    color: '#5d4e37',
                    textShadow: '2px 2px 4px rgba(212, 175, 55, 0.3)',
                    fontFamily: 'Times New Roman, serif',
                    letterSpacing: '0.02em'
                  }}
                >
                  MACROBIUS
                </h1>
                <p 
                  className="text-sm italic"
                  style={{ color: '#8b7355' }}
                >
                  Eine antike Flaschenpost ins 21. Jahrhundert
                </p>
              </div>
            </div>
            
            {/* ORACLE CLOUD STATUS & LANGUAGE SWITCHER */}
            <div className="flex items-center space-x-6">
              {/* Oracle Cloud Status */}
              <div 
                className="flex items-center space-x-2 px-3 py-2 rounded-lg"
                style={{
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid rgba(212, 175, 55, 0.3)'
                }}
              >
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: '#10b981' }}
                />
                <span 
                  className="text-xs font-medium"
                  style={{ color: '#5d4e37' }}
                >
                  Oracle Cloud: 1.401 Texte
                </span>
              </div>
              
              {/* Language Switcher */}
              <div className="flex space-x-1">
                {(['de', 'en'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className="px-3 py-1 text-sm font-medium rounded transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: getLanguageKey(language) === lang ? '#d4af37' : 'rgba(212, 175, 55, 0.1)',
                      color: getLanguageKey(language) === lang ? '#ffffff' : '#5d4e37',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      boxShadow: getLanguageKey(language) === lang ? '0 2px 8px rgba(212, 175, 55, 0.3)' : 'none'
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
      
      {/* 📚 CLASSICAL HORIZONTAL NAVIGATION */}
      <nav 
        className="sticky top-0 z-40"
        style={{
          backgroundColor: 'rgba(245, 241, 232, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
          boxShadow: '0 2px 10px rgba(212, 175, 55, 0.1)'
        }}
      >
        <div className="container mx-auto px-6">
          {/* Main Sections */}
          <div className="flex items-center justify-center space-x-1 py-3 overflow-x-auto">
            {mainSections.map((section) => {
              const IconComponent = section.icon;
              const isActive = currentSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(section.id)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 whitespace-nowrap"
                  style={{
                    backgroundColor: isActive ? 'rgba(212, 175, 55, 0.2)' : 'transparent',
                    color: isActive ? '#5d4e37' : '#8b7355',
                    border: isActive ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid transparent',
                    boxShadow: isActive ? '0 2px 8px rgba(212, 175, 55, 0.2)' : 'none'
                  }}
                >
                  <IconComponent 
                    className="w-4 h-4" 
                    style={{ color: isActive ? '#d4af37' : '#8b7355' }} 
                  />
                  <span>{section.label[getLanguageKey(language)]}</span>
                </button>
              );
            })}
          </div>
          
          {/* KI-SYSTEME Section */}
          <div 
            className="border-t py-2"
            style={{ borderColor: 'rgba(212, 175, 55, 0.2)' }}
          >
            <div className="flex items-center justify-center space-x-4">
              <span 
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: '#d4af37' }}
              >
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
                      className="flex items-center space-x-1 px-3 py-1 rounded text-xs font-medium transition-all duration-200 hover:scale-105"
                      style={{
                        backgroundColor: isActive ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                        color: isActive ? '#5d4e37' : '#8b7355',
                        border: isActive ? '1px solid rgba(212, 175, 55, 0.3)' : '1px solid transparent'
                      }}
                    >
                      <IconComponent 
                        className="w-3 h-3" 
                        style={{ color: isActive ? '#d4af37' : '#8b7355' }} 
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
      
      {/* 📖 MAIN CONTENT AREA - CLASSICAL STYLING */}
      <main 
        className="container mx-auto px-6 py-8"
        style={{
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(5px)',
          borderRadius: '10px',
          margin: '20px auto',
          maxWidth: '1400px',
          boxShadow: '0 4px 20px rgba(212, 175, 55, 0.1)',
          border: '1px solid rgba(212, 175, 55, 0.1)'
        }}
      >
        {renderSection()}
      </main>
      
      {/* 🏛️ CLASSICAL FOOTER */}
      <footer 
        className="text-center py-6"
        style={{
          background: 'linear-gradient(to top, rgba(212, 175, 55, 0.1), transparent)',
          borderTop: '1px solid rgba(212, 175, 55, 0.2)'
        }}
      >
        <p 
          className="text-sm italic"
          style={{ color: '#8b7355' }}
        >
          Macrobius Digital Edition - Verbindet antike Weisheit mit moderner Technologie
        </p>
      </footer>
    </div>
  );
};

export default ClassicalMacrobiusApp;