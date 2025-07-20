import React, { useState } from 'react';
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

// Enhanced Classical Portrait Component using real Macrobius portrait
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
        {/* Real Macrobius Portrait */}
        <img 
          src="/Macrobius-Portrait.jpg" 
          alt="Macrobius Classical Portrait"
          className="w-full h-full object-cover"
          style={{
            filter: 'sepia(20%) saturate(120%) brightness(110%)'
          }}
        />
        
        {/* Golden nameplate overlay */}
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

// Main App Component
const ClassicalMacrobiusApp: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [currentSection, setCurrentSection] = useState<string>('intro');
  
  // Language conversion functions with proper TypeScript types
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
      historicalText2: 'Diese App ist unsere moderne Antwort auf Macrobius\' Vision.',
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
      historicalText2: 'This app is our modern response to Macrobius\' vision.',
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
      historicalText2: 'Haec app nostra moderna responsio ad visionem Macrobii est.',
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
      className="min-h-screen flex"
      style={{
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f2e 25%, #2d1b4e 50%, #1a1f2e 75%, #0a0e1a 100%)'
      }}
    >
      {/* LEFT SIDEBAR */}
      <aside 
        className="w-64 h-screen flex flex-col"
        style={{
          backgroundColor: 'rgba(10, 14, 26, 0.95)',
          borderRight: '1px solid rgba(251, 191, 36, 0.2)'
        }}
      >
        <div className="flex-1 overflow-y-auto p-4">
          {/* Main Navigation */}
          <nav className="space-y-1 mb-6">
            {mainSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(section.id)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  style={{
                    backgroundColor: currentSection === section.id ? 'rgba(251, 191, 36, 0.15)' : 'transparent',
                    color: currentSection === section.id ? '#facc15' : 'rgba(255, 255, 255, 0.8)',
                    border: currentSection === section.id ? '1px solid rgba(251, 191, 36, 0.3)' : '1px solid transparent'
                  }}
                >
                  <IconComponent 
                    className="w-5 h-5" 
                    style={{ color: currentSection === section.id ? '#facc15' : 'rgba(255, 255, 255, 0.6)' }} 
                  />
                  {section.label[getLanguageKey(language)]}
                </button>
              );
            })}
          </nav>
          
          {/* KI-SYSTEME Section */}
          <div className="mb-6">
            <h3 
              className="text-xs font-bold uppercase tracking-wider mb-3 px-3"
              style={{ color: 'rgba(251, 191, 36, 0.7)' }}
            >
              KI-SYSTEME
            </h3>
            <nav className="space-y-1">
              {kiSections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(section.id)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200"
                    style={{
                      backgroundColor: currentSection === section.id ? 'rgba(251, 191, 36, 0.1)' : 'transparent',
                      color: currentSection === section.id ? '#facc15' : 'rgba(255, 255, 255, 0.7)'
                    }}
                  >
                    <IconComponent 
                      className="w-4 h-4" 
                      style={{ color: currentSection === section.id ? '#facc15' : 'rgba(255, 255, 255, 0.5)' }} 
                    />
                    {section.label[getLanguageKey(language)]}
                  </button>
                );
              })}
            </nav>
          </div>
          
          {/* Oracle Cloud Status */}
          <div 
            className="p-3 rounded-lg mb-4"
            style={{
              backgroundColor: 'rgba(251, 191, 36, 0.08)',
              border: '1px solid rgba(251, 191, 36, 0.2)'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: '#10b981' }}
              />
              <span className="text-xs font-medium" style={{ color: '#facc15' }}>
                Oracle Cloud
              </span>
            </div>
            <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              1.401 Kulturelle Texte
            </p>
          </div>
          
          {/* Mehr über Pontanus Link */}
          <button 
            className="w-full text-left p-3 rounded-lg transition-all duration-200 hover:bg-opacity-80"
            style={{
              backgroundColor: 'rgba(251, 191, 36, 0.05)',
              border: '1px solid rgba(251, 191, 36, 0.15)',
              color: 'rgba(255, 255, 255, 0.6)'
            }}
          >
            <span className="text-xs">{currentContent.moreAboutPontanus}</span>
          </button>
        </div>
      </aside>
      
      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col">
        {/* TOP HEADER */}
        <header 
          className="flex items-center justify-between p-4"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderBottom: '1px solid rgba(251, 191, 36, 0.15)'
          }}
        >
          {/* Enhanced Classical Portrait */}
          <div className="flex items-center">
            <ClassicalMacrobiusPortrait className="w-14 h-14" />
          </div>
          
          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            {(['de', 'en', 'la'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className="px-3 py-1 text-sm font-medium rounded transition-all duration-200"
                style={{
                  backgroundColor: getLanguageKey(language) === lang ? '#facc15' : 'transparent',
                  color: getLanguageKey(language) === lang ? '#000' : 'rgba(255, 255, 255, 0.7)',
                  border: '1px solid rgba(251, 191, 36, 0.3)'
                }}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </header>
        
        {/* MUSEUM-STYLE CONTENT AREA - Large Format Classical Presentation */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-full mx-auto">
            
            {/* LARGE CLASSICAL MANUSCRIPT ILLUSTRATION - Top Feature */}
            <div className="relative mb-6">
              {/* Decorative manuscript header */}
              <div 
                className="h-12 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(90deg, rgba(139, 92, 41, 0.8), rgba(180, 142, 82, 0.8))',
                  borderBottom: '2px solid rgba(251, 191, 36, 0.5)'
                }}
              >
                <span 
                  className="text-sm font-serif italic"
                  style={{ color: '#facc15', letterSpacing: '0.1em' }}
                >
                  Tho: Dring & Car: Harper in Fleet Street
                </span>
              </div>
              
              {/* Main Classical Illustration */}
              <div className="relative">
                <img 
                  src="/Macrobius-universe.jpg" 
                  alt="Macrobius Universe - AUR: THEOD: MACROBII OPERA"
                  className="w-full h-auto"
                  style={{
                    maxHeight: '70vh',
                    objectFit: 'contain',
                    filter: 'sepia(10%) saturate(110%) brightness(105%)'
                  }}
                />
                
                {/* Overlay gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>

            {/* TITLE SECTION - Over Classical Background */}
            <div 
              className="text-center py-12 px-8"
              style={{
                background: 'linear-gradient(135deg, rgba(10, 14, 26, 0.9), rgba(45, 27, 78, 0.9))',
                borderTop: '1px solid rgba(251, 191, 36, 0.3)',
                borderBottom: '1px solid rgba(251, 191, 36, 0.3)'
              }}
            >
              <h1 
                className="text-6xl md:text-8xl font-bold mb-4"
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
                className="text-2xl md:text-3xl mb-4 font-medium"
                style={{ color: 'rgba(251, 191, 36, 0.9)' }}
              >
                {currentContent.subtitle}
              </p>
              <p 
                className="text-lg md:text-xl"
                style={{ color: 'rgba(255, 255, 255, 0.8)' }}
              >
                {currentContent.description}
              </p>
            </div>
            
            {/* CULTURAL TREASURES SECTION */}
            <div 
              className="py-8 px-8"
              style={{
                background: 'linear-gradient(135deg, rgba(45, 27, 78, 0.8), rgba(10, 14, 26, 0.9))'
              }}
            >
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Sparkles style={{ width: '24px', height: '24px', color: '#facc15' }} />
                  <h2 
                    className="text-2xl md:text-3xl font-bold"
                    style={{ color: '#facc15' }}
                  >
                    {currentContent.culturalTreasures}
                  </h2>
                  <Sparkles style={{ width: '24px', height: '24px', color: '#facc15' }} />
                </div>
                <p className="text-sm mb-6" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {currentContent.clickForDetails}
                </p>
              </div>
              
              {/* LARGE FORMAT CLASSICAL ARTWORKS - Museum Style */}
              <div className="space-y-6">
                
                {/* Roman Ruins - Large Format */}
                <div className="relative rounded-lg overflow-hidden group cursor-pointer">
                  <img 
                    src="/Rome-under.jpg" 
                    alt="Declining Roman Empire"
                    className="w-full h-64 md:h-80 object-cover transition-all duration-500 group-hover:scale-105"
                    style={{
                      filter: 'sepia(15%) saturate(120%) brightness(90%) contrast(110%)'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {getLanguageKey(language) === 'de' ? 'Das untergehende Römische Reich' : 
                       getLanguageKey(language) === 'en' ? 'The Declining Roman Empire' : 
                       'Imperium Romanum Declinans'}
                    </h3>
                    <p className="text-sm text-white/80">
                      {getLanguageKey(language) === 'de' ? 'Kultureller Niedergang und die Mission der Gelehrten' : 
                       getLanguageKey(language) === 'en' ? 'Cultural decline and the mission of scholars' : 
                       'Declinatio culturalis et missio eruditorum'}
                    </p>
                  </div>
                </div>
                
                {/* Classical Symposium - Large Format */}
                <div className="relative rounded-lg overflow-hidden group cursor-pointer">
                  <img 
                    src="/Symposion.jpg" 
                    alt="Classical Symposium Scene"
                    className="w-full h-64 md:h-80 object-cover transition-all duration-500 group-hover:scale-105"
                    style={{
                      filter: 'sepia(15%) saturate(120%) brightness(95%) contrast(110%)'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {currentContent.macrobiusWithSon}
                    </h3>
                    <p className="text-sm text-white/80">
                      {getLanguageKey(language) === 'de' ? 'Gelehrte Diskussionen beim römischen Gastmahl' : 
                       getLanguageKey(language) === 'en' ? 'Scholarly discussions at the Roman banquet' : 
                       'Disputationes eruditae in convivio Romano'}
                    </p>
                  </div>
                </div>

                {/* Golden Astrolabe - Large Format */}
                <div className="relative rounded-lg overflow-hidden group cursor-pointer">
                  <div 
                    className="w-full h-64 md:h-80 flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 92, 41, 0.4), rgba(180, 142, 82, 0.4))'
                    }}
                  >
                    <img 
                      src="/Astrolab.jpg" 
                      alt="Historical Astrolabe"
                      className="max-w-full max-h-full object-contain transition-all duration-500 group-hover:scale-105"
                      style={{
                        filter: 'sepia(20%) saturate(130%) brightness(110%) contrast(120%)'
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {getLanguageKey(language) === 'de' ? 'Astronomische Instrumente' : 
                       getLanguageKey(language) === 'en' ? 'Astronomical Instruments' : 
                       'Instrumenta Astronomica'}
                    </h3>
                    <p className="text-sm text-white/80">
                      {getLanguageKey(language) === 'de' ? 'Wissenschaft und Kosmologie in der Spätantike' : 
                       getLanguageKey(language) === 'en' ? 'Science and cosmology in late antiquity' : 
                       'Scientia et cosmologia in antiquitate sera'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* ACTION BUTTONS */}
            <div 
              className="py-8 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(10, 14, 26, 0.9), rgba(45, 27, 78, 0.8))'
              }}
            >
              <div className="flex flex-wrap gap-4 justify-center px-8">
                <button 
                  className="px-8 py-4 rounded-lg font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{
                    background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                    color: 'white',
                    border: '1px solid rgba(220, 38, 38, 0.5)',
                    boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)'
                  }}
                  onClick={() => setCurrentSection('textsearch')}
                >
                  {currentContent.exploreWorks}
                </button>
                
                <button 
                  className="px-8 py-4 rounded-lg font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{
                    background: 'linear-gradient(135deg, #059669, #047857)',
                    color: 'white',
                    border: '1px solid rgba(5, 150, 105, 0.5)',
                    boxShadow: '0 4px 15px rgba(5, 150, 105, 0.3)'
                  }}
                  onClick={() => setCurrentSection('intro')}
                >
                  {currentContent.moreAboutMacrobius}
                </button>
                
                <button 
                  className="px-8 py-4 rounded-lg font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                    color: 'white',
                    border: '1px solid rgba(124, 58, 237, 0.5)',
                    boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)'
                  }}
                >
                  {currentContent.moreAboutPontanus}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClassicalMacrobiusApp;