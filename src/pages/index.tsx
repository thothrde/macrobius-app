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
  X
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

// 📚 **SECTION CONFIGURATION**
interface AppSection {
  id: string;
  label: { de: string; en: string; la: string };
  description: { de: string; en: string; la: string };
  icon: React.ReactNode;
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
    icon: <Home className="w-8 h-8" />
  },
  {
    id: 'quiz',
    label: { de: 'Quiz', en: 'Quiz', la: 'Quaestiones' },
    description: { 
      de: 'Interaktive Wissensprüfung',
      en: 'Interactive knowledge testing',
      la: 'Scientia interactiva probatio'
    },
    icon: <HelpCircle className="w-8 h-8" />
  },
  {
    id: 'worldmap',
    label: { de: 'Weltkarte', en: 'World Map', la: 'Mappa Mundi' },
    description: { 
      de: 'Geographische Exploration',
      en: 'Geographical exploration',
      la: 'Geographica exploratio'
    },
    icon: <Globe className="w-8 h-8" />
  },
  {
    id: 'cosmos',
    label: { de: 'Kosmos', en: 'Cosmos', la: 'Cosmos' },
    description: { 
      de: 'Antike Astronomie und Kosmologie',
      en: 'Ancient astronomy and cosmology',
      la: 'Astronomia et cosmologia antiqua'
    },
    icon: <Star className="w-8 h-8" />
  },
  {
    id: 'banquet',
    label: { de: 'Gastmahl', en: 'Banquet', la: 'Convivium' },
    description: { 
      de: 'Die berühmten Saturnalien-Gespräche',
      en: 'The famous Saturnalia conversations',
      la: 'Celebres Saturnalium colloquia'
    },
    icon: <Wine className="w-8 h-8" />
  },
  {
    id: 'textsearch',
    label: { de: 'Textsuche', en: 'Text Search', la: 'Textus Quaerere' },
    description: { 
      de: 'KI-gestützte Korpus-Analyse',
      en: 'AI-powered corpus analysis',
      la: 'AI-adiuvata corporis analysis'
    },
    icon: <Search className="w-8 h-8" />
  },
  {
    id: 'learning',
    label: { de: 'Lernen', en: 'Learning', la: 'Discere' },
    description: { 
      de: 'Personalisierte Bildungswege',
      en: 'Personalized learning paths',
      la: 'Personales viae discendi'
    },
    icon: <GraduationCap className="w-8 h-8" />
  },
  {
    id: 'visualizations',
    label: { de: 'Visualisierungen', en: 'Visualizations', la: 'Visualizationes' },
    description: { 
      de: 'Datenanalyse und -darstellung',
      en: 'Data analysis and visualization',
      la: 'Data analysis et visualizatio'
    },
    icon: <BarChart3 className="w-8 h-8" />
  }
];

// 🎯 **MAIN APP COMPONENT WITH BUILT-IN CLASSICAL LAYOUT**
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

  // 🎯 **MAIN CLASSICAL LAYOUT - ALWAYS RENDER BEAUTIFUL DESIGN**
  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom right, #1e1b4b, #7c3aed, #1e293b, #000000)'
      }}
    >
      {/* 🌌 **BEAUTIFUL NIGHT SKY BACKGROUND** */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(to bottom right, #1e1b4b, #7c3aed, #1e293b, #000000)',
          zIndex: 1
        }}
      >
        {/* Animated Stars */}
        {[...Array(150)].map((_, i) => {
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const delay = Math.random() * 4;
          const duration = 2 + Math.random() * 3;
          const size = 0.5 + Math.random() * 1.5;
          
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
                opacity: 0.3 + Math.random() * 0.7
              }}
            />
          );
        })}
        
        {/* Constellation Pattern */}
        <div 
          className="absolute"
          style={{
            top: '25%',
            right: '25%',
            opacity: 0.4
          }}
        >
          <svg width="240" height="240" viewBox="0 0 240 240">
            <g stroke="#facc15" strokeWidth="1.5" fill="none" opacity="0.7">
              <line x1="60" y1="60" x2="120" y2="40" />
              <line x1="120" y1="40" x2="180" y2="60" />
              <line x1="180" y1="60" x2="160" y2="120" />
              <line x1="160" y1="120" x2="80" y2="120" />
              <line x1="80" y1="120" x2="60" y2="60" />
            </g>
            <g fill="#facc15">
              <circle cx="60" cy="60" r="2.5" className="animate-pulse" />
              <circle cx="120" cy="40" r="3" className="animate-pulse" />
              <circle cx="180" cy="60" r="2" className="animate-pulse" />
              <circle cx="160" cy="120" r="2.5" className="animate-pulse" />
              <circle cx="80" cy="120" r="2" className="animate-pulse" />
            </g>
          </svg>
        </div>
        
        {/* Nebula Effects */}
        <div 
          className="absolute rounded-full"
          style={{
            top: '33.33%',
            left: '16.67%',
            width: '384px',
            height: '384px',
            background: 'rgba(168, 85, 247, 0.1)',
            filter: 'blur(48px)',
            animation: 'pulse 3s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute rounded-full"
          style={{
            bottom: '25%',
            right: '16.67%',
            width: '320px',
            height: '320px',
            background: 'rgba(251, 191, 36, 0.08)',
            filter: 'blur(48px)',
            animation: 'pulse 4s ease-in-out infinite'
          }}
        />
      </div>
      
      {/* 🏯 **MAIN LAYOUT CONTAINER** */}
      <div 
        className="relative min-h-screen flex flex-col"
        style={{ zIndex: 10 }}
      >
        {/* 🏰 **TOP HEADER WITH MACROBIUS PORTRAIT** */}
        <header 
          className="w-full py-8"
          style={{
            backdropFilter: 'blur(4px)',
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between">
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-3 rounded-xl transition-all duration-300"
                style={{
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <Menu className="w-6 h-6" />
              </button>
              
              {/* 🖼️ **CENTRAL MACROBIUS PORTRAIT** */}
              <div className="flex-1 flex justify-center">
                <ClassicalMacrobiusPortrait className="w-28 h-28" />
              </div>
              
              {/* 🌍 **LANGUAGE SELECTOR** */}
              <div 
                className="flex items-center gap-3 rounded-xl p-2"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(251, 191, 36, 0.3)'
                }}
              >
                {(['de', 'en', 'la'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden"
                    style={{
                      ...(getLanguageKey(language) === lang
                        ? {
                            background: 'linear-gradient(to right, #facc15, #f59e0b)',
                            color: 'black',
                            boxShadow: '0 4px 20px rgba(251, 191, 36, 0.4)',
                            transform: 'scale(1.1)'
                          }
                        : {
                            color: 'rgba(255, 255, 255, 0.8)',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                          })
                    }}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>
        
        {/* 🏢 **MAIN CONTENT AREA** */}
        <main className="flex-1 flex">
          <div className="container mx-auto px-6 flex gap-10 h-full">
            {/* 🧭 **LEFT NAVIGATION** */}
            <aside className="w-80 flex-shrink-0 transition-all duration-500">
              <div className="sticky top-8">
                <div 
                  className="rounded-xl p-8"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    backdropFilter: 'blur(24px)',
                    border: '1px solid rgba(251, 191, 36, 0.4)',
                    boxShadow: '0 20px 50px rgba(251, 191, 36, 0.1)'
                  }}
                >
                  {/* 🎭 **ASTROLABE** */}
                  <div className="mb-10 flex justify-center">
                    <ClassicalAstrolabe className="w-36 h-36" />
                  </div>
                  
                  {/* 🧭 **NAVIGATION MENU** */}
                  <nav className="space-y-3">
                    {appSections.map((section, index) => (
                      <button
                        key={section.id}
                        onClick={() => setCurrentSection(section.id)}
                        className="w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-500 text-left group relative overflow-hidden"
                        style={{
                          ...(currentSection === section.id
                            ? {
                                background: 'linear-gradient(to right, rgba(251, 191, 36, 0.25), rgba(245, 158, 11, 0.25))',
                                border: '1px solid rgba(251, 191, 36, 0.5)',
                                color: 'rgb(254, 240, 138)',
                                boxShadow: '0 10px 40px rgba(251, 191, 36, 0.3)',
                                transform: 'scale(1.05)'
                              }
                            : {
                                color: 'rgba(255, 255, 255, 0.75)',
                                border: '1px solid transparent'
                              })
                        }}
                      >
                        <div 
                          style={{
                            color: currentSection === section.id ? '#facc15' : 'rgba(255, 255, 255, 0.75)',
                            transform: currentSection === section.id ? 'scale(1.25)' : 'scale(1)'
                          }}
                        >
                          {section.icon}
                        </div>
                        <span className="font-medium tracking-wide">
                          {section.label[getLanguageKey(language)]}
                        </span>
                        {currentSection === section.id && (
                          <div className="ml-auto">
                            <Sparkles style={{ width: '20px', height: '20px', color: '#facc15' }} />
                          </div>
                        )}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>
            
            {/* 🏦 **CENTRAL CONTENT FRAME** */}
            <div className="flex-1 flex items-center justify-center py-10">
              <div className="w-full max-w-5xl">
                {/* 🇼 **CLASSICAL FRAME** */}
                <div 
                  className="rounded-xl p-10"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(24px)',
                    border: '2px solid rgba(251, 191, 36, 0.5)',
                    boxShadow: '0 20px 50px rgba(251, 191, 36, 0.3)'
                  }}
                >
                  {/* 🎆 **FRAME HEADER** */}
                  <div className="text-center mb-10">
                    <h1 
                      className="text-4xl font-bold mb-4 tracking-wide"
                      style={{
                        background: 'linear-gradient(to right, #facc15, #f59e0b, #facc15)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      {getLanguageKey(language) === 'de' && 'Macrobius - Klassische Bildung'}
                      {getLanguageKey(language) === 'en' && 'Macrobius - Classical Education'}
                      {getLanguageKey(language) === 'la' && 'Macrobius - Eruditio Classica'}
                    </h1>
                    <p 
                      className="text-lg leading-relaxed max-w-3xl mx-auto"
                      style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                    >
                      {getLanguageKey(language) === 'de' && 'Eine antike Flaschenpost - Eine Nachricht aus der Antike an die Zukunft'}
                      {getLanguageKey(language) === 'en' && 'An Ancient Message in a Bottle - A Message from Antiquity to the Future'}
                      {getLanguageKey(language) === 'la' && 'Antiqua Epistula in Vitro - Nuntius ab Antiquitate ad Futurum'}
                    </p>
                    
                    {/* Decorative Divider */}
                    <div className="mt-6 flex items-center justify-center">
                      <div 
                        style={{
                          width: '80px',
                          height: '1px',
                          background: 'linear-gradient(to right, transparent, rgba(251, 191, 36, 0.5))'
                        }}
                      />
                      <Sparkles style={{ width: '20px', height: '20px', color: 'rgba(251, 191, 36, 0.7)', margin: '0 16px' }} />
                      <div 
                        style={{
                          width: '80px',
                          height: '1px',
                          background: 'linear-gradient(to left, transparent, rgba(251, 191, 36, 0.5))'
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* 🏠 **CONTENT AREA** */}
                  <div style={{ minHeight: '600px' }}>
                    {/* Content Grid */}
                    <div className="grid grid-cols-2 gap-8 h-full">
                      {appSections.map((section, index) => (
                        <button
                          key={section.id}
                          onClick={() => setCurrentSection(section.id)}
                          className="group relative h-full rounded-xl overflow-hidden transition-all duration-700 hover:scale-105"
                          style={{
                            background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))',
                            border: '1px solid rgba(251, 191, 36, 0.4)',
                            backdropFilter: 'blur(4px)',
                            minHeight: '240px'
                          }}
                        >
                          {/* Content */}
                          <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
                            {/* Icon */}
                            <div 
                              className="mb-6 p-6 rounded-full transition-all duration-500 group-hover:scale-125"
                              style={{
                                background: 'linear-gradient(to bottom right, rgba(251, 191, 36, 0.25), rgba(245, 158, 11, 0.25))',
                                border: '2px solid rgba(251, 191, 36, 0.4)',
                                boxShadow: '0 4px 20px rgba(251, 191, 36, 0.2)'
                              }}
                            >
                              <div style={{ color: '#facc15' }}>
                                {section.icon}
                              </div>
                            </div>
                            
                            {/* Title */}
                            <h3 
                              className="text-xl font-bold mb-3 tracking-wide transition-colors duration-500 group-hover:text-yellow-100"
                              style={{ color: 'white' }}
                            >
                              {section.label[getLanguageKey(language)]}
                            </h3>
                            
                            {/* Description */}
                            <p 
                              className="text-sm leading-relaxed max-w-xs transition-colors duration-500 group-hover:text-white"
                              style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                            >
                              {section.description[getLanguageKey(language)]}
                            </p>
                          </div>
                          
                          {/* Corner Sparkles */}
                          <div 
                            className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ top: '12px', right: '12px' }}
                          >
                            <Sparkles style={{ width: '16px', height: '16px', color: 'rgba(251, 191, 36, 0.8)' }} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* 📱 **MOBILE NAVIGATION OVERLAY** */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            zIndex: 50
          }}
        >
          <div 
            className="w-80 h-full p-8"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(24px)',
              borderRight: '1px solid rgba(251, 191, 36, 0.4)',
              boxShadow: '0 0 50px rgba(0, 0, 0, 0.8)'
            }}
          >
            <div className="flex justify-between items-center mb-10">
              <h2 
                className="text-2xl font-bold tracking-wide"
                style={{ color: '#facc15' }}
              >
                Navigation
              </h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl transition-all duration-300"
                style={{
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Mobile Navigation */}
            <nav className="space-y-3">
              {appSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setCurrentSection(section.id);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300"
                  style={{ color: 'rgba(255, 255, 255, 0.75)' }}
                >
                  {section.icon}
                  <span>{section.label[getLanguageKey(language)]}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassicalMacrobiusApp;