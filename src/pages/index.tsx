'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

// Icons
import { 
  Home, 
  HelpCircle, 
  Globe, 
  Star, 
  Users, 
  Search, 
  GraduationCap, 
  BarChart3,
  Wine,
  User,
  Sparkles,
  Menu,
  X,
  BookOpen,
  Brain,
  Target,
  Zap,
  Scroll,
  Crown,
  Telescope
} from 'lucide-react';

// 🔧 **BULLETPROOF CLASSICAL LAYOUT - BUILT INTO MAIN COMPONENT**
// Instead of importing, build the classical layout directly here to ensure it works

const convertToLanguage = (lang: 'de' | 'en' | 'la'): Language => {
  switch(lang) {
    case 'de': return 'DE';
    case 'en': return 'EN';
    case 'la': return 'LA';
    default: return 'EN';
  }
};

// 🎯 **DIRECT CLASSICAL COMPONENTS - NO EXTERNAL DEPENDENCIES**
const ClassicalAstrolabe: React.FC<{ className?: string }> = ({ className }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.3) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("relative", className)}>
      {/* Outer Ring */}
      <div 
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          border: '2px solid rgba(251, 191, 36, 0.4)'
        }}
      />
      
      {/* Inner Rotating Disc */}
      <div 
        className="absolute rounded-full"
        style={{
          top: '12px',
          left: '12px',
          right: '12px',
          bottom: '12px',
          border: '1px solid rgba(251, 191, 36, 0.6)',
          background: 'linear-gradient(to bottom right, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.15))',
          transform: `rotate(${rotation}deg)`
        }}
      >
        {/* Constellation Points */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const x = 45 + 35 * Math.cos(angle);
          const y = 45 + 35 * Math.sin(angle);
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: '6px',
                height: '6px',
                backgroundColor: '#facc15'
              }}
            />
          );
        })}
        
        {/* Central Star */}
        <div 
          className="absolute flex items-center justify-center"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Star style={{ width: '20px', height: '20px', color: '#facc15' }} />
        </div>
      </div>
    </div>
  );
};

const ClassicalMacrobiusPortrait: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("relative", className)}>
      {/* Golden Ring */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          border: '4px solid #facc15',
          padding: '4px'
        }}
      >
        <div 
          className="w-full h-full rounded-full overflow-hidden"
          style={{
            border: '2px solid rgba(251, 191, 36, 0.6)',
            background: 'linear-gradient(to bottom right, rgba(146, 64, 14, 0.9), rgba(133, 77, 14, 0.9))',
            backdropFilter: 'blur(4px)'
          }}
        >
          {/* Portrait */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div 
              className="relative rounded-full"
              style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(to bottom right, rgba(251, 191, 36, 0.25), rgba(245, 158, 11, 0.25))',
                border: '1px solid rgba(251, 191, 36, 0.4)'
              }}
            >
              {/* Laurel Crown */}
              <div 
                className="absolute"
                style={{
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80px',
                  height: '16px',
                  background: 'linear-gradient(to right, rgba(74, 222, 128, 0.4), rgba(34, 197, 94, 0.4))',
                  borderRadius: '9999px',
                  border: '1px solid rgba(74, 222, 128, 0.5)'
                }}
              />
              
              {/* Face */}
              <div 
                className="absolute flex items-center justify-center"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <User style={{ width: '36px', height: '36px', color: 'rgba(251, 191, 36, 0.8)' }} />
              </div>
            </div>
          </div>
          
          {/* Inscription */}
          <div 
            className="absolute text-center"
            style={{
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '12px',
              fontFamily: 'serif',
              color: 'rgba(251, 191, 36, 0.9)',
              letterSpacing: '0.1em'
            }}
          >
            MACROBIVS
          </div>
        </div>
      </div>
    </div>
  );
};

// 📚 **ENHANCED SECTION CONFIGURATION**
interface AppSection {
  id: string;
  label: { de: string; en: string; la: string };
  description: { de: string; en: string; la: string };
  icon: React.ReactNode;
  category?: string;
}

const appSections: AppSection[] = [
  {
    id: 'intro',
    label: { de: 'Einführung', en: 'Introduction', la: 'Introductio' },
    description: { 
      de: 'Entdecken Sie die Welt des Macrobius',
      en: 'Discover the world of Macrobius',
      la: 'Mundum Macrobii explora'
    },
    icon: <Home className="w-6 h-6" />
  },
  {
    id: 'quiz',
    label: { de: 'Quiz', en: 'Quiz', la: 'Quaestiones' },
    description: { 
      de: 'Interaktive Wissensprüfung',
      en: 'Interactive knowledge testing',
      la: 'Scientia interactiva probatio'
    },
    icon: <HelpCircle className="w-6 h-6" />
  },
  {
    id: 'worldmap',
    label: { de: 'Weltkarte', en: 'World Map', la: 'Mappa Mundi' },
    description: { 
      de: 'Geographische Exploration',
      en: 'Geographical exploration',
      la: 'Geographica exploratio'
    },
    icon: <Globe className="w-6 h-6" />
  },
  {
    id: 'cosmos',
    label: { de: 'Kosmos', en: 'Cosmos', la: 'Cosmos' },
    description: { 
      de: 'Antike Astronomie und Kosmologie',
      en: 'Ancient astronomy and cosmology',
      la: 'Astronomia et cosmologia antiqua'
    },
    icon: <Star className="w-6 h-6" />
  },
  {
    id: 'banquet',
    label: { de: 'Gastmahl', en: 'Banquet', la: 'Convivium' },
    description: { 
      de: 'Die berühmten Saturnalien-Gespräche',
      en: 'The famous Saturnalia conversations',
      la: 'Celebres Saturnalium colloquia'
    },
    icon: <Wine className="w-6 h-6" />
  },
  {
    id: 'textsearch',
    label: { de: 'Textsuche', en: 'Text Search', la: 'Textus Quaerere' },
    description: { 
      de: 'KI-gestützte Korpus-Analyse',
      en: 'AI-powered corpus analysis',
      la: 'AI-adiuvata corporis analysis'
    },
    icon: <Search className="w-6 h-6" />
  },
  {
    id: 'learning',
    label: { de: 'Lernen', en: 'Learning', la: 'Discere' },
    description: { 
      de: 'Personalisierte Bildungswege',
      en: 'Personalized learning paths',
      la: 'Personales viae discendi'
    },
    icon: <GraduationCap className="w-6 h-6" />
  },
  {
    id: 'vokabeltrainer',
    label: { de: 'Vokabeltrainer', en: 'Vocabulary Trainer', la: 'Exercitium Vocabulorum' },
    description: { 
      de: 'Lateinische Vokabeln lernen',
      en: 'Learn Latin vocabulary',
      la: 'Vocabula Latina discere'
    },
    icon: <BookOpen className="w-6 h-6" />
  },
  {
    id: 'visualizations',
    label: { de: 'Visualisierungen', en: 'Visualizations', la: 'Visualizationes' },
    description: { 
      de: 'Datenanalyse und -darstellung',
      en: 'Data analysis and visualization',
      la: 'Data analysis et visualizatio'
    },
    icon: <BarChart3 className="w-6 h-6" />
  },
  {
    id: 'ki-kulturanalyse',
    label: { de: 'KI-Kulturanalyse', en: 'AI Cultural Analysis', la: 'AI Analysis Culturalis' },
    description: { 
      de: 'Intelligente Kulturanalyse',
      en: 'Intelligent cultural analysis',
      la: 'Analysis culturalis intelligens'
    },
    icon: <Brain className="w-6 h-6" />,
    category: 'ki-systeme'
  },
  {
    id: 'lernpfade',
    label: { de: 'Lernpfade', en: 'Learning Paths', la: 'Semitae Discendi' },
    description: { 
      de: 'Personalisierte Lernwege',
      en: 'Personalized learning paths',
      la: 'Semitae discendi personales'
    },
    icon: <Target className="w-6 h-6" />,
    category: 'ki-systeme'
  },
  {
    id: 'ki-tutor',
    label: { de: 'KI-Tutor', en: 'AI Tutor', la: 'AI Praeceptor' },
    description: { 
      de: 'Intelligenter Tutor-Assistent',
      en: 'Intelligent tutor assistant',
      la: 'Praeceptor intelligens assistens'
    },
    icon: <Crown className="w-6 h-6" />,
    category: 'ki-systeme'
  },
  {
    id: 'kulturmodule',
    label: { de: 'Kulturmodule', en: 'Cultural Modules', la: 'Moduli Culturales' },
    description: { 
      de: 'Tiefgreifende Kulturanalyse',
      en: 'Deep cultural analysis',
      la: 'Analysis culturalis profunda'
    },
    icon: <Scroll className="w-6 h-6" />,
    category: 'ki-systeme'
  }
];

// 🎯 **MAIN APP COMPONENT WITH ENHANCED CLASSICAL LAYOUT**
const ClassicalMacrobiusApp: React.FC = () => {
  const { language, setLanguage, isHydrated } = useLanguage();
  const [currentSection, setCurrentSection] = useState('intro');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Helper function to get language key
  const getLanguageKey = (lang: string): 'de' | 'en' | 'la' => {
    switch(lang) {
      case 'DE': return 'de';
      case 'EN': return 'en';
      case 'LA': return 'la';
      default: return 'de';
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLanguageChange = (lang: 'de' | 'en' | 'la') => {
    const convertedLang = convertToLanguage(lang);
    setLanguage(convertedLang);
  };

  // Group sections by category
  const mainSections = appSections.filter(s => !s.category);
  const kiSections = appSections.filter(s => s.category === 'ki-systeme');

  // 🎯 **MAIN CLASSICAL LAYOUT - ENHANCED VERSION**
  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f1419 0%, #1e1b4b 25%, #312e81 50%, #1e1b4b 75%, #0f1419 100%)'
      }}
    >
      {/* 🌌 **BEAUTIFUL NIGHT SKY BACKGROUND** */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(30, 27, 75, 0.8) 0%, rgba(15, 20, 25, 0.9) 70%, rgba(0, 0, 0, 0.95) 100%)',
          zIndex: 1
        }}
      >
        {/* Animated Stars */}
        {[...Array(200)].map((_, i) => {
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const delay = Math.random() * 4;
          const duration = 2 + Math.random() * 3;
          const size = 0.5 + Math.random() * 2;
          
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: 'white',
                animation: `pulse ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
                opacity: 0.2 + Math.random() * 0.8
              }}
            />
          );
        })}
        
        {/* Enhanced Constellation Pattern */}
        <div 
          className="absolute"
          style={{
            top: '15%',
            right: '10%',
            opacity: 0.3
          }}
        >
          <svg width="300" height="300" viewBox="0 0 300 300">
            <g stroke="#facc15" strokeWidth="1" fill="none" opacity="0.6">
              <circle cx="150" cy="150" r="120" />
              <circle cx="150" cy="150" r="80" />
              <circle cx="150" cy="150" r="40" />
              <line x1="30" y1="150" x2="270" y2="150" />
              <line x1="150" y1="30" x2="150" y2="270" />
            </g>
            <g fill="#facc15">
              <circle cx="150" cy="30" r="3" className="animate-pulse" />
              <circle cx="270" cy="150" r="2.5" className="animate-pulse" />
              <circle cx="150" cy="270" r="3" className="animate-pulse" />
              <circle cx="30" cy="150" r="2.5" className="animate-pulse" />
            </g>
          </svg>
        </div>
      </div>
      
      {/* 🏯 **MAIN LAYOUT CONTAINER** */}
      <div 
        className="relative min-h-screen flex"
        style={{ zIndex: 10 }}
      >
        {/* 🧭 **ENHANCED LEFT NAVIGATION** */}
        <aside 
          className="w-80 flex-shrink-0 h-screen overflow-y-auto"
          style={{
            backgroundColor: 'rgba(15, 20, 25, 0.95)',
            borderRight: '1px solid rgba(251, 191, 36, 0.3)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="p-6">
            {/* Astrolabe */}
            <div className="mb-8 flex justify-center">
              <ClassicalAstrolabe className="w-24 h-24" />
            </div>
            
            {/* Main Navigation */}
            <nav className="space-y-2 mb-8">
              {mainSections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(section.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-left group"
                  style={{
                    backgroundColor: currentSection === section.id ? 'rgba(251, 191, 36, 0.2)' : 'transparent',
                    color: currentSection === section.id ? '#facc15' : 'rgba(255, 255, 255, 0.8)',
                    border: currentSection === section.id ? '1px solid rgba(251, 191, 36, 0.5)' : '1px solid transparent'
                  }}
                >
                  <div style={{ color: currentSection === section.id ? '#facc15' : 'rgba(255, 255, 255, 0.6)' }}>
                    {section.icon}
                  </div>
                  <span className="text-sm font-medium">
                    {section.label[getLanguageKey(language)]}
                  </span>
                </button>
              ))}
            </nav>
            
            {/* KI-SYSTEME Section */}
            <div className="mb-6">
              <h3 
                className="text-xs font-bold tracking-wider mb-3 px-4"
                style={{ color: 'rgba(251, 191, 36, 0.8)' }}
              >
                KI-SYSTEME
              </h3>
              <nav className="space-y-2">
                {kiSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(section.id)}
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 text-left"
                    style={{
                      backgroundColor: currentSection === section.id ? 'rgba(251, 191, 36, 0.15)' : 'transparent',
                      color: currentSection === section.id ? '#facc15' : 'rgba(255, 255, 255, 0.7)'
                    }}
                  >
                    <div style={{ color: currentSection === section.id ? '#facc15' : 'rgba(255, 255, 255, 0.5)' }}>
                      {section.icon}
                    </div>
                    <span className="text-sm">
                      {section.label[getLanguageKey(language)]}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Oracle Status */}
            <div 
              className="p-4 rounded-lg mb-6"
              style={{
                backgroundColor: 'rgba(251, 191, 36, 0.1)',
                border: '1px solid rgba(251, 191, 36, 0.3)'
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: '#10b981' }}
                />
                <span 
                  className="text-xs font-medium"
                  style={{ color: '#facc15' }}
                >
                  Oracle Cloud
                </span>
              </div>
              <p 
                className="text-xs"
                style={{ color: 'rgba(255, 255, 255, 0.7)' }}
              >
                1.401 Kulturelle Texte
              </p>
            </div>
            
            {/* More about Pontanus */}
            <button 
              className="w-full text-left p-3 rounded-lg transition-all duration-300"
              style={{
                backgroundColor: 'rgba(251, 191, 36, 0.05)',
                border: '1px solid rgba(251, 191, 36, 0.2)',
                color: 'rgba(255, 255, 255, 0.6)'
              }}
            >
              <span className="text-xs">
                Mehr über Pontanus
              </span>
            </button>
          </div>
        </aside>
        
        {/* 📱 **MAIN CONTENT AREA** */}
        <main className="flex-1 flex flex-col">
          {/* 🏰 **TOP HEADER WITH LANGUAGE SELECTOR** */}
          <header 
            className="w-full py-4 px-8"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderBottom: '1px solid rgba(251, 191, 36, 0.2)'
            }}
          >
            <div className="flex items-center justify-between">
              {/* Portrait */}
              <div className="flex items-center gap-4">
                <ClassicalMacrobiusPortrait className="w-16 h-16" />
              </div>
              
              {/* Language Selector */}
              <div className="flex items-center gap-2">
                {(['de', 'en'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className="px-3 py-1 rounded text-sm font-medium transition-all duration-300"
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
            </div>
          </header>
          
          {/* 🏛️ **ENHANCED CONTENT AREA** */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              {/* Main Title */}
              <div className="text-center mb-8">
                <h1 
                  className="text-5xl font-bold mb-4"
                  style={{
                    background: 'linear-gradient(135deg, #facc15 0%, #f59e0b 50%, #facc15 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Macrobius
                </h1>
                <p 
                  className="text-xl mb-2"
                  style={{ color: 'rgba(251, 191, 36, 0.9)' }}
                >
                  Eine antike Flaschenpost
                </p>
                <p 
                  className="text-lg"
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  Eine Nachricht aus der Antike an die Zukunft
                </p>
              </div>
              
              {/* Cultural Treasures Section */}
              <div 
                className="p-6 rounded-xl mb-8"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles style={{ width: '20px', height: '20px', color: '#facc15' }} />
                  <h2 
                    className="text-lg font-semibold"
                    style={{ color: '#facc15' }}
                  >
                    Kulturelle Schätze entdecken
                  </h2>
                  <Sparkles style={{ width: '20px', height: '20px', color: '#facc15' }} />
                </div>
                
                {/* Image Gallery */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {/* Placeholder for historical images */}
                  <div 
                    className="aspect-square rounded-lg overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 92, 41, 0.8), rgba(180, 142, 82, 0.8))',
                      border: '2px solid rgba(251, 191, 36, 0.3)'
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <Crown style={{ width: '40px', height: '40px', color: '#facc15' }} />
                    </div>
                  </div>
                  
                  <div 
                    className="aspect-square rounded-lg overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(55, 65, 81, 0.8), rgba(75, 85, 99, 0.8))',
                      border: '2px solid rgba(251, 191, 36, 0.3)'
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <Scroll style={{ width: '40px', height: '40px', color: '#facc15' }} />
                    </div>
                  </div>
                  
                  <div 
                    className="aspect-square rounded-lg overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(92, 57, 41, 0.8), rgba(124, 89, 64, 0.8))',
                      border: '2px solid rgba(251, 191, 36, 0.3)'
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen style={{ width: '40px', height: '40px', color: '#facc15' }} />
                    </div>
                  </div>
                  
                  <div 
                    className="aspect-square rounded-lg overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(49, 46, 129, 0.8))',
                      border: '2px solid rgba(251, 191, 36, 0.3)'
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <Telescope style={{ width: '40px', height: '40px', color: '#facc15' }} />
                    </div>
                  </div>
                </div>
                
                <p 
                  className="text-sm text-center mb-4"
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  Klicken Sie auf die Bilder für detaillierte kulturelle Hintergründe
                </p>
              </div>
              
              {/* Historical Content */}
              <div 
                className="p-6 rounded-xl mb-8"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(251, 191, 36, 0.2)'
                }}
              >
                <h3 
                  className="text-lg font-semibold mb-4"
                  style={{ color: '#facc15' }}
                >
                  Macrobius mit seinem Sohn, dem er seine Werke widmete
                </h3>
                
                <p 
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  Vor 1500 Jahren, als das römische Reich dem Untergang entgegensah, fertigte Macrobius eine Flaschenpost an 
                  die Zukunft an. Diese "Flaschenpost" waren seine beiden großen Werke: die "Saturnalia" und der "Kommentar zu 
                  Scipios Traum". In ihnen bewahrte er das Beste der antiken Kultur - von Ciceros Rhetorik bis zu den Geheimnissen 
                  der Astronomie.
                </p>
                
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  Diese App ist unsere moderne Antwort auf Macrobius' Vision. Durch KI-gestützte Textanalyse, interaktive 
                  Visualisierungen und multilinguale Zugänge machen wir seine "Flaschenpost" für das 21. Jahrhundert erlebbar. 
                  Entdecken Sie, wie ein spätantiker Gelehrter vor Erichs zwischen der ersten und der modernen Welt wurde.
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center">
                <button 
                  className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #dc2626, #991b1b)',
                    color: 'white',
                    border: '1px solid rgba(220, 38, 38, 0.5)'
                  }}
                >
                  ERKUNDEN SIE DIE WERKE DES MACROBIUS
                </button>
                
                <button 
                  className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #059669, #047857)',
                    color: 'white',
                    border: '1px solid rgba(5, 150, 105, 0.5)'
                  }}
                >
                  Mehr über Macrobius
                </button>
                
                <button 
                  className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
                    color: 'white',
                    border: '1px solid rgba(124, 58, 237, 0.5)'
                  }}
                >
                  Mehr über Pontanus
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClassicalMacrobiusApp;