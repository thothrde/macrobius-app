import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

// Icons
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
  Telescope
} from 'lucide-react';

// Classical Portrait Component
const ClassicalMacrobiusPortrait: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("relative", className)}>
      <div 
        className="w-full h-full rounded-full overflow-hidden"
        style={{
          border: '3px solid #facc15',
          background: 'linear-gradient(135deg, rgba(139, 92, 41, 0.9), rgba(180, 142, 82, 0.9))',
          boxShadow: '0 0 20px rgba(251, 191, 36, 0.4)'
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div 
            className="relative w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(245, 158, 11, 0.3))',
              border: '1px solid rgba(251, 191, 36, 0.5)'
            }}
          >
            <div 
              className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-16 h-3"
              style={{
                background: 'linear-gradient(to right, rgba(74, 222, 128, 0.6), rgba(34, 197, 94, 0.6))',
                borderRadius: '999px',
                border: '1px solid rgba(74, 222, 128, 0.7)'
              }}
            />
            <User style={{ width: '24px', height: '24px', color: '#facc15' }} />
          </div>
        </div>
        <div 
          className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-serif text-center"
          style={{ color: '#facc15', letterSpacing: '0.05em' }}
        >
          MACROBIVS
        </div>
      </div>
    </div>
  );
};

// Main App Component
const ClassicalMacrobiusApp: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [currentSection, setCurrentSection] = useState('intro');
  
  // Language converter
  const convertToLanguage = (lang: 'de' | 'en' | 'la') => {
    switch(lang) {
      case 'de': return 'DE';
      case 'en': return 'EN';
      case 'la': return 'LA';
      default: return 'DE';
    }
  };

  const getLanguageKey = (lang: string): 'de' | 'en' | 'la' => {
    switch(lang) {
      case 'DE': return 'de';
      case 'EN': return 'en';
      case 'LA': return 'la';
      default: return 'de';
    }
  };

  const handleLanguageChange = (lang: 'de' | 'en' | 'la') => {
    setLanguage(convertToLanguage(lang));
  };

  // Content
  const content = {
    de: {
      title: 'Macrobius',
      subtitle: 'Eine antike Flaschenpost',
      description: 'Eine Nachricht aus der Antike an die Zukunft',
      culturalTreasures: 'Kulturelle Schätze entdecken',
      imageHint: 'Klicken Sie auf die Bilder für detaillierte kulturelle Hintergründe',
      macrobiusWithSon: 'Macrobius mit seinem Sohn, dem er seine Werke widmete',
      historicalText1: 'Vor 1500 Jahren, als das römische Reich dem Untergang entgegensah, fertigte Macrobius eine Flaschenpost an die Zukunft an. Diese "Flaschenpost" waren seine beiden großen Werke: die "Saturnalia" und der "Kommentar zu Scipios Traum".',
      historicalText2: 'Diese App ist unsere moderne Antwort auf Macrobius\' Vision. Durch KI-gestützte Textanalyse, interaktive Visualisierungen und multilinguale Zugänge machen wir seine "Flaschenpost" für das 21. Jahrhundert erlebbar.',
      exploreWorks: 'ERKUNDEN SIE DIE WERKE DES MACROBIUS',
      moreAboutMacrobius: 'Mehr über Macrobius',
      moreAboutPontanus: 'Mehr über Pontanus'
    },
    en: {
      title: 'Macrobius',
      subtitle: 'An Ancient Message in a Bottle',
      description: 'A Message from Antiquity to the Future',
      culturalTreasures: 'Discover Cultural Treasures',
      imageHint: 'Click on the images for detailed cultural background',
      macrobiusWithSon: 'Macrobius with his son, to whom he dedicated his works',
      historicalText1: '1500 years ago, as the Roman Empire faced decline, Macrobius created a message in a bottle for the future. This "message in a bottle" consisted of his two great works: the "Saturnalia" and the "Commentary on Scipio\'s Dream".',
      historicalText2: 'This app is our modern response to Macrobius\' vision. Through AI-powered text analysis, interactive visualizations, and multilingual access, we make his "message in a bottle" accessible for the 21st century.',
      exploreWorks: 'EXPLORE THE WORKS OF MACROBIUS',
      moreAboutMacrobius: 'More about Macrobius',
      moreAboutPontanus: 'More about Pontanus'
    },
    la: {
      title: 'Macrobius',
      subtitle: 'Antiqua Epistula in Lagena',
      description: 'Nuntius ab Antiquitate ad Futurum',
      culturalTreasures: 'Thesauros Culturales Inveni',
      imageHint: 'Imagines preme ad culturalem contextum detaliatum',
      macrobiusWithSon: 'Macrobius cum filio suo, cui opera sua dedicavit',
      historicalText1: 'Ante annos MD, cum Imperium Romanum ad occasum vergeret, Macrobius epistulam in lagena ad futurum confecit. Haec "epistula in lagena" duo eius magna opera erant: "Saturnalia" et "Commentarius in Somnium Scipionis".',
      historicalText2: 'Haec app nostra moderna responsio ad visionem Macrobii est. Per AI-adiuvata analysis textuum, visualizationes interactivas, et accessus multilingues, eius "epistulam in lagena" pro saeculo XXI accessibilem facimus.',
      exploreWorks: 'OPERA MACROBII EXPLORA',
      moreAboutMacrobius: 'Plura de Macrobio',
      moreAboutPontanus: 'Plura de Pontano'
    }
  };

  const currentContent = content[getLanguageKey(language)];

  // Navigation sections
  const mainSections = [
    { id: 'intro', label: { de: 'Einführung', en: 'Introduction', la: 'Introductio' }, icon: <Home className="w-5 h-5" /> },
    { id: 'quiz', label: { de: 'Quiz', en: 'Quiz', la: 'Quaestiones' }, icon: <HelpCircle className="w-5 h-5" /> },
    { id: 'worldmap', label: { de: 'Weltkarte', en: 'World Map', la: 'Mappa Mundi' }, icon: <Globe className="w-5 h-5" /> },
    { id: 'cosmos', label: { de: 'Kosmos', en: 'Cosmos', la: 'Cosmos' }, icon: <Star className="w-5 h-5" /> },
    { id: 'banquet', label: { de: 'Gastmahl', en: 'Banquet', la: 'Convivium' }, icon: <Wine className="w-5 h-5" /> },
    { id: 'textsearch', label: { de: 'Textsuche', en: 'Text Search', la: 'Quaestio Textuum' }, icon: <Search className="w-5 h-5" /> },
    { id: 'learning', label: { de: 'Lernen', en: 'Learning', la: 'Discere' }, icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'vokabeltrainer', label: { de: 'Vokabeltrainer', en: 'Vocabulary Trainer', la: 'Exercitium Vocabulorum' }, icon: <BookOpen className="w-5 h-5" /> },
    { id: 'visualizations', label: { de: 'Visualisierungen', en: 'Visualizations', la: 'Visualizationes' }, icon: <BarChart3 className="w-5 h-5" /> }
  ];

  const kiSections = [
    { id: 'ki-kulturanalyse', label: { de: 'KI-Kulturanalyse', en: 'AI Cultural Analysis', la: 'AI Analysis Culturalis' }, icon: <Brain className="w-4 h-4" /> },
    { id: 'lernpfade', label: { de: 'Lernpfade', en: 'Learning Paths', la: 'Semitae Discendi' }, icon: <Target className="w-4 h-4" /> },
    { id: 'ki-tutor', label: { de: 'KI-Tutor', en: 'AI Tutor', la: 'AI Praeceptor' }, icon: <Crown className="w-4 h-4" /> },
    { id: 'kulturmodule', label: { de: 'Kulturmodule', en: 'Cultural Modules', la: 'Moduli Culturales' }, icon: <Scroll className="w-4 h-4" /> }
  ];

  return (
    <div 
      className="min-h-screen flex"
      style={{
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f2e 25%, #2d1b4e 50%, #1a1f2e 75%, #0a0e1a 100%)'
      }}
    >
      {/* SOPHISTICATED LEFT SIDEBAR */}
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
            {mainSections.map((section) => (
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
                <div style={{ color: currentSection === section.id ? '#facc15' : 'rgba(255, 255, 255, 0.6)' }}>
                  {section.icon}
                </div>
                {section.label[getLanguageKey(language)]}
              </button>
            ))}
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
              {kiSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(section.id)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200"
                  style={{
                    backgroundColor: currentSection === section.id ? 'rgba(251, 191, 36, 0.1)' : 'transparent',
                    color: currentSection === section.id ? '#facc15' : 'rgba(255, 255, 255, 0.7)'
                  }}
                >
                  <div style={{ color: currentSection === section.id ? '#facc15' : 'rgba(255, 255, 255, 0.5)' }}>
                    {section.icon}
                  </div>
                  {section.label[getLanguageKey(language)]}
                </button>
              ))}
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
          {/* Classical Portrait */}
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
        
        {/* RICH CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            {/* Main Title */}
            <div className="text-center mb-8">
              <h1 
                className="text-6xl font-bold mb-3"
                style={{
                  background: 'linear-gradient(135deg, #facc15 0%, #f59e0b 30%, #facc15 60%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {currentContent.title}
              </h1>
              <p 
                className="text-2xl mb-2 font-medium"
                style={{ color: 'rgba(251, 191, 36, 0.9)' }}
              >
                {currentContent.subtitle}
              </p>
              <p 
                className="text-lg"
                style={{ color: 'rgba(255, 255, 255, 0.8)' }}
              >
                {currentContent.description}
              </p>
            </div>
            
            {/* CULTURAL TREASURES SECTION */}
            <div 
              className="rounded-xl p-6 mb-8"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Sparkles style={{ width: '20px', height: '20px', color: '#facc15' }} />
                <h2 
                  className="text-lg font-semibold"
                  style={{ color: '#facc15' }}
                >
                  {currentContent.culturalTreasures}
                </h2>
                <Sparkles style={{ width: '20px', height: '20px', color: '#facc15' }} />
              </div>
              
              {/* CULTURAL GALLERY */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Roman Ruins */}
                <div 
                  className="aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, rgba(120, 85, 60, 0.9), rgba(160, 120, 85, 0.9))',
                    border: '2px solid rgba(251, 191, 36, 0.4)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center p-4">
                    <div 
                      className="w-12 h-12 rounded-lg mb-2 flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(251, 191, 36, 0.2)' }}
                    >
                      <Star style={{ width: '24px', height: '24px', color: '#facc15' }} />
                    </div>
                    <span className="text-xs text-center" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                      {getLanguageKey(language) === 'de' ? 'Römische Ruinen' : getLanguageKey(language) === 'en' ? 'Roman Ruins' : 'Ruinae Romanae'}
                    </span>
                  </div>
                </div>
                
                {/* Classical Scholar */}
                <div 
                  className="aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, rgba(60, 70, 90, 0.9), rgba(80, 90, 110, 0.9))',
                    border: '2px solid rgba(251, 191, 36, 0.4)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center p-4">
                    <div 
                      className="w-12 h-12 rounded-lg mb-2 flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(251, 191, 36, 0.2)' }}
                    >
                      <Crown style={{ width: '24px', height: '24px', color: '#facc15' }} />
                    </div>
                    <span className="text-xs text-center" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                      {getLanguageKey(language) === 'de' ? 'Gelehrter' : getLanguageKey(language) === 'en' ? 'Scholar' : 'Doctus'}
                    </span>
                  </div>
                </div>
                
                {/* Ancient Manuscripts */}
                <div 
                  className="aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, rgba(101, 67, 33, 0.9), rgba(139, 92, 41, 0.9))',
                    border: '2px solid rgba(251, 191, 36, 0.4)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center p-4">
                    <div 
                      className="w-12 h-12 rounded-lg mb-2 flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(251, 191, 36, 0.2)' }}
                    >
                      <Scroll style={{ width: '24px', height: '24px', color: '#facc15' }} />
                    </div>
                    <span className="text-xs text-center" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                      {getLanguageKey(language) === 'de' ? 'Manuskripte' : getLanguageKey(language) === 'en' ? 'Manuscripts' : 'Manuscripta'}
                    </span>
                  </div>
                </div>
                
                {/* Astronomical Instruments */}
                <div 
                  className="aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.9), rgba(49, 46, 129, 0.9))',
                    border: '2px solid rgba(251, 191, 36, 0.4)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center p-4">
                    <div 
                      className="w-12 h-12 rounded-lg mb-2 flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(251, 191, 36, 0.2)' }}
                    >
                      <Telescope style={{ width: '24px', height: '24px', color: '#facc15' }} />
                    </div>
                    <span className="text-xs text-center" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                      {getLanguageKey(language) === 'de' ? 'Astronomie' : getLanguageKey(language) === 'en' ? 'Astronomy' : 'Astronomia'}
                    </span>
                  </div>
                </div>
              </div>
              
              <p 
                className="text-sm text-center mb-4"
                style={{ color: 'rgba(255, 255, 255, 0.7)' }}
              >
                {currentContent.imageHint}
              </p>
            </div>
            
            {/* HISTORICAL CONTENT */}
            <div 
              className="rounded-xl p-8 mb-8"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(251, 191, 36, 0.2)'
              }}
            >
              <h3 
                className="text-xl font-semibold mb-6 text-center"
                style={{ color: '#facc15' }}
              >
                {currentContent.macrobiusWithSon}
              </h3>
              
              <div className="space-y-6">
                <p 
                  className="text-base leading-relaxed"
                  style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                >
                  {currentContent.historicalText1}
                </p>
                
                <p 
                  className="text-base leading-relaxed"
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  {currentContent.historicalText2}
                </p>
              </div>
            </div>
            
            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-4 justify-center">
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
      </main>
    </div>
  );
};

export default ClassicalMacrobiusApp;