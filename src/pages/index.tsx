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
      {Array.from({ length: 60 }, (_, i) => (
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
            boxShadow: '0 0 8px rgba(251, 191, 36, 0.8)'
          }}
        />
      ))}
      
      {/* Moving Stars - Enhanced */}
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={`moving-star-${i}`}
          className="absolute rounded-full animate-pulse"
          style={{
            width: '2px',
            height: '2px',
            backgroundColor: '#ffffff',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animation: `moveLeft ${6 + Math.random() * 6}s linear infinite`,
            opacity: 0.8
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

// Main App Component
const ClassicalMacrobiusApp: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [currentSection, setCurrentSection] = useState<string>('intro');
  
  // DEBUG: Log to console to verify this component is being used
  useEffect(() => {
    console.log('🏛️ MACROBIUS: CORRECT LAYOUT LOADED - LEFT SIDEBAR + NIGHT SKY!');
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

  // Content
  const content = {
    de: {
      title: 'Macrobius',
      subtitle: 'Eine antike Flaschenpost',
      description: 'Eine Nachricht aus der Antike an die Zukunft',
      culturalTreasures: 'Kulturelle Schätze entdecken',
      macrobiusWithSon: 'Macrobius mit seinem Sohn, dem er seine Werke widmete',
      historicalText1: 'Vor 1500 Jahren, als das römische Reich dem Untergang entgegensah, fertigte Macrobius eine Flaschenpost an die Zukunft an.',
      historicalText2: 'Diese App ist unsere moderne Antwort auf Macrobius\' Vision. Durch KI-gestützte Textanalyse, interaktive Visualisierungen und multilinguale Zugänge machen wir seine "Flaschenpost" für das 21. Jahrhundert erreichbar.',
      exploreWorks: 'ERKUNDEN SIE DIE WERKE DES MACROBIUS',
      moreAboutMacrobius: 'Mehr über Macrobius',
      moreAboutPontanus: 'Mehr über Pontanus',
      clickForDetails: 'Klicken Sie auf die Bilder für detaillierte kulturelle Hintergründe'
    },
    en: {
      title: 'Macrobius',
      subtitle: 'An Ancient Message in a Bottle',
      description: 'A Message from Antiquity to the Future',
      culturalTreasures: 'Discover Cultural Treasures',
      macrobiusWithSon: 'Macrobius with his son, to whom he dedicated his works',
      historicalText1: '1500 years ago, as the Roman Empire faced decline, Macrobius created a message in a bottle for the future.',
      historicalText2: 'This app is our modern response to Macrobius\' vision. Through AI-powered text analysis, interactive visualizations, and multilingual access, we make his "message in a bottle" accessible for the 21st century.',
      exploreWorks: 'EXPLORE THE WORKS OF MACROBIUS',
      moreAboutMacrobius: 'More about Macrobius',
      moreAboutPontanus: 'More about Pontanus',
      clickForDetails: 'Click on images for detailed cultural backgrounds'
    },
    la: {
      title: 'Macrobius',
      subtitle: 'Antiqua Epistula in Lagena',
      description: 'Nuntius ab Antiquitate ad Futurum',
      culturalTreasures: 'Thesauros Culturales Inveni',
      macrobiusWithSon: 'Macrobius cum filio suo, cui opera sua dedicavit',
      historicalText1: 'Ante annos MD, cum Imperium Romanum ad occasum vergeret, Macrobius epistulam in lagena ad futurum confecit.',
      historicalText2: 'Haec app nostra moderna responsio ad visionem Macrobii est. Per analysin textuum AI adiutam, visualizationes interactivas, et accessus multilingues, suam "epistulam in lagena" saeculo XXI accessibilem facimus.',
      exploreWorks: 'OPERA MACROBII EXPLORA',
      moreAboutMacrobius: 'Plura de Macrobio',
      moreAboutPontanus: 'Plura de Pontano',
      clickForDetails: 'Imagines tangi ad contextus culturales detaliatos'
    }
  };

  const currentContent = content[getLanguageKey(language)];

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

  return (
    <div 
      className="min-h-screen max-h-screen flex relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #1a1f2e 0%, #0f172a 40%, #020617 100%)',
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.4) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%)
        `
      }}
    >
      {/* BACKGROUND ASTROLABIUM - ENHANCED */}
      <div 
        className="absolute top-8 right-8 opacity-15 pointer-events-none"
        style={{
          width: '450px',
          height: '450px',
          backgroundImage: 'url(/Astrolab.jpg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          filter: 'sepia(30%) saturate(140%) brightness(120%) contrast(110%)'
        }}
      />
      
      {/* MOVING STARS - ENHANCED */}
      <MovingStars />
      
      {/* LEFT SIDEBAR - VERTICAL NAVIGATION */}
      <aside 
        className="w-72 h-screen flex flex-col z-20"
        style={{
          backgroundColor: 'rgba(8, 12, 24, 0.98)',
          borderRight: '2px solid rgba(251, 191, 36, 0.3)',
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="flex-1 overflow-y-auto p-5">
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
                    backgroundColor: currentSection === section.id ? 'rgba(251, 191, 36, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                    color: currentSection === section.id ? '#facc15' : 'rgba(255, 255, 255, 0.85)',
                    border: currentSection === section.id ? '1px solid rgba(251, 191, 36, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: currentSection === section.id ? '0 0 15px rgba(251, 191, 36, 0.2)' : 'none'
                  }}
                >
                  <IconComponent 
                    className="w-5 h-5" 
                    style={{ color: currentSection === section.id ? '#facc15' : 'rgba(255, 255, 255, 0.7)' }} 
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
              style={{ color: 'rgba(251, 191, 36, 0.8)' }}
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
                      backgroundColor: currentSection === section.id ? 'rgba(251, 191, 36, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                      color: currentSection === section.id ? '#facc15' : 'rgba(255, 255, 255, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <IconComponent 
                      className="w-4 h-4" 
                      style={{ color: currentSection === section.id ? '#facc15' : 'rgba(255, 255, 255, 0.6)' }} 
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
              backgroundColor: 'rgba(251, 191, 36, 0.08)',
              border: '1px solid rgba(251, 191, 36, 0.25)',
              boxShadow: '0 0 10px rgba(251, 191, 36, 0.1)'
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
            <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              1.401 Kulturelle Texte
            </p>
          </div>
          
          {/* Mehr über Pontanus Link */}
          <button 
            className="w-full text-left p-4 rounded-lg transition-all duration-300 hover:bg-opacity-80"
            style={{
              backgroundColor: 'rgba(251, 191, 36, 0.06)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              color: 'rgba(255, 255, 255, 0.7)'
            }}
          >
            <span className="text-xs">{currentContent.moreAboutPontanus}</span>
          </button>
        </div>
      </aside>
      
      {/* MAIN CONTENT AREA - STRICTLY FITS IN ONE PAGE */}
      <main className="flex-1 flex flex-col h-screen max-h-screen overflow-hidden">
        {/* COMPACT TOP HEADER */}
        <header 
          className="flex items-center justify-between p-3"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderBottom: '1px solid rgba(251, 191, 36, 0.2)',
            minHeight: '60px',
            maxHeight: '60px'
          }}
        >
          <div className="flex items-center">
            <ClassicalMacrobiusPortrait className="w-12 h-12" />
          </div>
          
          <div className="flex items-center gap-2">
            {(['de', 'en'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className="px-3 py-1 text-sm font-medium rounded transition-all duration-200"
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
        </header>
        
        {/* ULTRA-COMPACT MAIN CONTENT - FITS EXACTLY IN REMAINING SPACE */}
        <div className="flex-1 overflow-y-auto p-3" style={{ maxHeight: 'calc(100vh - 60px)' }}>
          <div className="max-w-3xl mx-auto h-full">
            
            {/* Title Section - Ultra Compact */}
            <div className="text-center mb-3">
              <h1 
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{
                  background: 'linear-gradient(135deg, #facc15 0%, #f59e0b 30%, #facc15 60%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'serif'
                }}
              >
                {currentContent.title}
              </h1>
              <p 
                className="text-base mb-1 font-medium"
                style={{ color: 'rgba(251, 191, 36, 0.95)' }}
              >
                {currentContent.subtitle}
              </p>
              <p 
                className="text-sm"
                style={{ color: 'rgba(255, 255, 255, 0.85)' }}
              >
                {currentContent.description}
              </p>
            </div>
            
            {/* Cultural Treasures Header - Ultra Compact */}
            <div className="text-center mb-3">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles style={{ width: '14px', height: '14px', color: '#facc15' }} />
                <h2 
                  className="text-base font-semibold"
                  style={{ color: '#facc15' }}
                >
                  {currentContent.culturalTreasures}
                </h2>
                <Sparkles style={{ width: '14px', height: '14px', color: '#facc15' }} />
              </div>
            </div>
            
            {/* ULTRA-COMPACT 2x2+1 IMAGE GRID */}
            <div className="mb-3">
              {/* First Row */}
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div 
                  className="aspect-[4/3] rounded-md overflow-hidden cursor-pointer group"
                  style={{
                    border: '2px solid rgba(251, 191, 36, 0.7)',
                    boxShadow: '0 3px 12px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <img 
                    src="/Rome-under.jpg" 
                    alt="Declining Roman Empire"
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                    style={{
                      filter: 'sepia(15%) saturate(130%) brightness(95%) contrast(115%)'
                    }}
                  />
                </div>
                
                <div 
                  className="aspect-[4/3] rounded-md overflow-hidden cursor-pointer group"
                  style={{
                    border: '2px solid rgba(251, 191, 36, 0.7)',
                    boxShadow: '0 3px 12px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <img 
                    src="/Macrobius-and-Eustachius.jpg" 
                    alt="Macrobius with Eustachius"
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                    style={{
                      filter: 'sepia(15%) saturate(130%) brightness(100%) contrast(115%)'
                    }}
                  />
                </div>
              </div>
              
              {/* Second Row */}
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div 
                  className="aspect-[4/3] rounded-md overflow-hidden cursor-pointer group"
                  style={{
                    border: '2px solid rgba(251, 191, 36, 0.7)',
                    boxShadow: '0 3px 12px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <img 
                    src="/WandSymposion.jpg" 
                    alt="Classical Symposium Wall Painting"
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                    style={{
                      filter: 'sepia(15%) saturate(130%) brightness(100%) contrast(115%)'
                    }}
                  />
                </div>
                
                <div 
                  className="aspect-[4/3] rounded-md overflow-hidden cursor-pointer group"
                  style={{
                    border: '2px solid rgba(251, 191, 36, 0.7)',
                    boxShadow: '0 3px 12px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <img 
                    src="/Johannes-Pontanus.JPG" 
                    alt="Johannes Pontanus Portrait"
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                    style={{
                      filter: 'sepia(15%) saturate(130%) brightness(100%) contrast(115%)'
                    }}
                  />
                </div>
              </div>
              
              {/* Third Row - Centered */}
              <div className="flex justify-center mb-3">
                <div 
                  className="w-1/2 aspect-[4/3] rounded-md overflow-hidden cursor-pointer group"
                  style={{
                    border: '2px solid rgba(251, 191, 36, 0.7)',
                    boxShadow: '0 3px 12px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <img 
                    src="/Macrobius-universe.jpg" 
                    alt="Macrobius Universe Diagram"
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                    style={{
                      filter: 'sepia(15%) saturate(130%) brightness(100%) contrast(115%)'
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Caption and Text - Ultra Compact */}
            <div className="text-center mb-2">
              <p 
                className="text-xs italic mb-1"
                style={{ color: 'rgba(251, 191, 36, 0.9)' }}
              >
                {currentContent.macrobiusWithSon}
              </p>
              <p 
                className="text-xs mb-2"
                style={{ color: 'rgba(255, 255, 255, 0.7)' }}
              >
                ➤ {currentContent.clickForDetails}
              </p>
            </div>
            
            {/* Ultra Compact Historical Text */}
            <div className="mb-2">
              <p 
                className="text-xs leading-relaxed mb-1"
                style={{ color: 'rgba(255, 255, 255, 0.95)' }}
              >
                {currentContent.historicalText1}
              </p>
              <p 
                className="text-xs leading-relaxed"
                style={{ color: 'rgba(255, 255, 255, 0.85)' }}
              >
                {currentContent.historicalText2}
              </p>
            </div>
            
            {/* Action Buttons - Ultra Compact */}
            <div className="flex flex-wrap gap-2 justify-center">
              <button 
                className="px-3 py-1 rounded-md font-bold text-xs transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                  color: 'white',
                  border: '1px solid rgba(220, 38, 38, 0.6)'
                }}
                onClick={() => setCurrentSection('textsearch')}
              >
                {currentContent.exploreWorks}
              </button>
              
              <button 
                className="px-3 py-1 rounded-md font-bold text-xs transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  color: 'white',
                  border: '1px solid rgba(5, 150, 105, 0.6)'
                }}
                onClick={() => setCurrentSection('intro')}
              >
                {currentContent.moreAboutMacrobius}
              </button>
              
              <button 
                className="px-3 py-1 rounded-md font-bold text-xs transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                  color: 'white',
                  border: '1px solid rgba(124, 58, 237, 0.6)'
                }}
              >
                {currentContent.moreAboutPontanus}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClassicalMacrobiusApp;