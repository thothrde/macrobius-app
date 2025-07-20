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

// Main App Component
const ClassicalMacrobiusApp: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [currentSection, setCurrentSection] = useState<string>('intro');
  
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
      historicalText1: 'Vor 1500 Jahren, als das römische Reich dem Untergang entgegensah, fertigte Macrobius eine Flaschenpost an die Zukunft an. Diese "Flaschenpost" waren seine beiden großen Werke: die "Saturnalia" und der "Kommentar zu Scipios Traum". In ihnen bewahrte er die Basis der antiken Kultur - von Ciceros Rhetorik bis zu den Geheimnissen der Astronomie.',
      historicalText2: 'Diese App ist unsere moderne Antwort auf Macrobius\' Vision. Durch KI-gestützte Textanalyse, interaktive Visualisierungen und multilinguale Zugänge machen wir seine "Flaschenpost" für das 21. Jahrhundert erreichbar. Entdecken Sie, wie ein spätantiker Gelehrter vor Brücken zwischen der antiken und der modernen Welt baute.',
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
      historicalText1: '1500 years ago, as the Roman Empire faced decline, Macrobius created a message in a bottle for the future. This "message in a bottle" were his two great works: the "Saturnalia" and the "Commentary on Scipio\'s Dream". In them, he preserved the foundation of ancient culture - from Cicero\'s rhetoric to the secrets of astronomy.',
      historicalText2: 'This app is our modern response to Macrobius\' vision. Through AI-powered text analysis, interactive visualizations, and multilingual access, we make his "message in a bottle" accessible for the 21st century. Discover how a late antique scholar built bridges between the ancient and modern worlds.',
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
      historicalText1: 'Ante annos MD, cum Imperium Romanum ad occasum vergeret, Macrobius epistulam in lagena ad futurum confecit. Haec "epistula in lagena" erant duo magna opera sua: "Saturnalia" et "Commentarium ad Somnium Scipionis". In his servavit fundamenta culturae antiquae - a rhetorica Ciceronis usque ad secreta astronomiae.',
      historicalText2: 'Haec app nostra moderna responsio ad visionem Macrobii est. Per analysin textuum AI adiutam, visualizationes interactivas, et accessus multilingues, suam "epistulam in lagena" saeculo XXI accessibilem facimus. Inveni quomodo eruditus antiquitatis serae pontes inter mundos antiquum et modernum aedificaverit.',
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
        background: 'radial-gradient(ellipse at center, #1e293b 0%, #0f172a 40%, #020617 100%)',
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)
        `
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
          <div className="flex items-center">
            <ClassicalMacrobiusPortrait className="w-14 h-14" />
          </div>
          
          <div className="flex items-center gap-2">
            {(['de', 'en'] as const).map((lang) => (
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
        
        {/* CONTENT CONTAINER - MATCHING EXACT TARGET LAYOUT */}
        <div 
          className="flex-1 overflow-y-auto"
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div 
            className="max-w-4xl mx-auto p-8"
            style={{
              background: 'linear-gradient(135deg, rgba(51, 65, 85, 0.8) 0%, rgba(30, 41, 59, 0.9) 100%)',
              borderRadius: '12px',
              margin: '2rem',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Portrait Section */}
            <div className="text-center mb-8">
              <ClassicalMacrobiusPortrait className="w-24 h-24 mx-auto mb-4" />
            </div>
            
            {/* Title Section */}
            <div className="text-center mb-8">
              <h1 
                className="text-4xl md:text-5xl font-bold mb-3"
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
                className="text-lg md:text-xl mb-2 font-medium"
                style={{ color: 'rgba(251, 191, 36, 0.9)' }}
              >
                {currentContent.subtitle}
              </p>
              <p 
                className="text-base"
                style={{ color: 'rgba(255, 255, 255, 0.8)' }}
              >
                {currentContent.description}
              </p>
            </div>
            
            {/* Cultural Treasures Section */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles style={{ width: '16px', height: '16px', color: '#facc15' }} />
                <h2 
                  className="text-lg font-semibold"
                  style={{ color: '#facc15' }}
                >
                  {currentContent.culturalTreasures}
                </h2>
                <Sparkles style={{ width: '16px', height: '16px', color: '#facc15' }} />
              </div>
            </div>
            
            {/* EXACT 2x2+1 IMAGE GRID - MATCHING TARGET */}
            <div className="mb-6">
              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div 
                  className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
                  style={{
                    border: '2px solid rgba(251, 191, 36, 0.6)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <img 
                    src="/Rome-under.jpg" 
                    alt="Declining Roman Empire"
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                    style={{
                      filter: 'sepia(15%) saturate(120%) brightness(90%) contrast(110%)'
                    }}
                  />
                </div>
                
                <div 
                  className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
                  style={{
                    border: '2px solid rgba(251, 191, 36, 0.6)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <img 
                    src="/Macrobius-and-Eustachius.jpg" 
                    alt="Macrobius with Eustachius"
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                    style={{
                      filter: 'sepia(15%) saturate(120%) brightness(95%) contrast(110%)'
                    }}
                  />
                </div>
              </div>
              
              {/* Row 2 */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div 
                  className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
                  style={{
                    border: '2px solid rgba(251, 191, 36, 0.6)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <img 
                    src="/WandSymposion.jpg" 
                    alt="Classical Wall Symposium"
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                    style={{
                      filter: 'sepia(15%) saturate(120%) brightness(95%) contrast(110%)'
                    }}
                  />
                </div>
                
                <div 
                  className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
                  style={{
                    border: '2px solid rgba(251, 191, 36, 0.6)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <img 
                    src="/Johannes-Pontanus.JPG" 
                    alt="Johannes Pontanus"
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                    style={{
                      filter: 'sepia(15%) saturate(120%) brightness(95%) contrast(110%)'
                    }}
                  />
                </div>
              </div>
              
              {/* Row 3 - Centered single image */}
              <div className="flex justify-center">
                <div 
                  className="w-1/2 aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
                  style={{
                    border: '2px solid rgba(251, 191, 36, 0.6)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <img 
                    src="/Macrobius-universe.jpg" 
                    alt="Macrobius Universe Diagram"
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                    style={{
                      filter: 'sepia(15%) saturate(120%) brightness(95%) contrast(110%)'
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Image Caption */}
            <div className="text-center mb-6">
              <p 
                className="text-sm italic"
                style={{ color: 'rgba(251, 191, 36, 0.8)' }}
              >
                {currentContent.macrobiusWithSon}
              </p>
              <p 
                className="text-xs mt-1"
                style={{ color: 'rgba(255, 255, 255, 0.6)' }}
              >
                ➤ {currentContent.clickForDetails}
              </p>
            </div>
            
            {/* Historical Text */}
            <div className="mb-6">
              <div className="space-y-3">
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                >
                  {currentContent.historicalText1}
                </p>
                
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  {currentContent.historicalText2}
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button 
                className="px-6 py-2 rounded-lg font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                  color: 'white',
                  border: '1px solid rgba(220, 38, 38, 0.5)',
                  boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
                }}
                onClick={() => setCurrentSection('textsearch')}
              >
                {currentContent.exploreWorks}
              </button>
              
              <button 
                className="px-6 py-2 rounded-lg font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  color: 'white',
                  border: '1px solid rgba(5, 150, 105, 0.5)',
                  boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
                }}
                onClick={() => setCurrentSection('intro')}
              >
                {currentContent.moreAboutMacrobius}
              </button>
              
              <button 
                className="px-6 py-2 rounded-lg font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                  color: 'white',
                  border: '1px solid rgba(124, 58, 237, 0.5)',
                  boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
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