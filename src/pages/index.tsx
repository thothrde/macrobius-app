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
      <div className="absolute inset-0 rounded-full border-2 border-yellow-400/40 animate-pulse" />
      
      {/* Inner Rotating Disc */}
      <div 
        className="absolute inset-3 rounded-full border border-yellow-400/60 bg-gradient-to-br from-yellow-400/15 to-amber-500/15"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* Constellation Points */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const x = 45 + 35 * Math.cos(angle);
          const y = 45 + 35 * Math.sin(angle);
          return (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full"
              style={{ left: `${x}%`, top: `${y}%` }}
            />
          );
        })}
        
        {/* Central Star */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Star className="w-5 h-5 text-yellow-400" />
        </div>
      </div>
    </div>
  );
};

const ClassicalMacrobiusPortrait: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("relative", className)}>
      {/* Golden Ring */}
      <div className="absolute inset-0 rounded-full border-4 border-yellow-400 p-1">
        <div className="w-full h-full rounded-full border-2 border-yellow-400/60 bg-gradient-to-br from-amber-900/90 to-yellow-900/90 backdrop-blur-sm overflow-hidden">
          {/* Portrait */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-16 h-16 bg-gradient-to-br from-yellow-400/25 to-amber-500/25 rounded-full border border-yellow-400/40">
              {/* Laurel Crown */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="w-20 h-4 bg-gradient-to-r from-green-400/40 to-green-500/40 rounded-full border border-green-400/50" />
              </div>
              
              {/* Face */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <User className="w-9 h-9 text-yellow-400/80" />
              </div>
            </div>
          </div>
          
          {/* Inscription */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <span className="text-xs font-serif text-yellow-400/90 tracking-widest">MACROBIVS</span>
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
    <div className="min-h-screen relative overflow-hidden">
      {/* 🌌 **BEAUTIFUL NIGHT SKY BACKGROUND** */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 via-slate-900 to-black">
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
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                opacity: 0.3 + Math.random() * 0.7
              }}
            />
          );
        })}
        
        {/* Constellation Pattern */}
        <div className="absolute top-1/4 right-1/4 opacity-40">
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
        <div className="absolute top-1/3 left-1/6 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-yellow-400/8 rounded-full blur-3xl animate-pulse" />
      </div>
      
      {/* 🏯 **MAIN LAYOUT CONTAINER** */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* 🏰 **TOP HEADER WITH MACROBIUS PORTRAIT** */}
        <header className="w-full py-8 backdrop-blur-sm bg-black/10">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between">
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-3 rounded-xl text-white hover:bg-white/15 transition-all duration-300 border border-white/20"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              {/* 🖼️ **CENTRAL MACROBIUS PORTRAIT** */}
              <div className="flex-1 flex justify-center">
                <ClassicalMacrobiusPortrait className="w-28 h-28" />
              </div>
              
              {/* 🌍 **LANGUAGE SELECTOR** */}
              <div className="flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-xl p-2 border border-yellow-400/30">
                {(['de', 'en', 'la'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden",
                      {
                        "bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-400/40 scale-110": getLanguageKey(language) === lang,
                        "text-white/80 hover:text-white hover:bg-white/15 border border-white/20 hover:border-white/40": getLanguageKey(language) !== lang
                      }
                    )}
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
            <aside className={cn(
              "w-80 flex-shrink-0 transition-all duration-500",
              {
                "translate-x-0": !mobileMenuOpen,
                "-translate-x-full lg:translate-x-0": mobileMenuOpen
              }
            )}>
              <div className="sticky top-8">
                <div className="bg-black/30 backdrop-blur-xl rounded-xl border border-yellow-400/40 p-8 shadow-2xl shadow-yellow-400/10">
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
                        className={cn(
                          "w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-500 text-left group relative overflow-hidden",
                          {
                            "bg-gradient-to-r from-yellow-400/25 to-amber-500/25 border border-yellow-400/50 text-yellow-100 shadow-xl shadow-yellow-400/30 scale-105": currentSection === section.id,
                            "text-white/75 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/30 hover:shadow-lg": currentSection !== section.id
                          }
                        )}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {/* Active Background Glow */}
                        {currentSection === section.id && (
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-amber-500/10 animate-pulse" />
                        )}
                        
                        <div className={cn("transition-all duration-500 relative z-10", {
                          "scale-125 text-yellow-400": currentSection === section.id,
                          "group-hover:scale-110 group-hover:text-yellow-300": currentSection !== section.id
                        })}>
                          {section.icon}
                        </div>
                        <span className="font-medium relative z-10 tracking-wide">
                          {section.label[getLanguageKey(language)]}
                        </span>
                        {currentSection === section.id && (
                          <div className="ml-auto relative z-10">
                            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
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
                <div className="bg-black/40 backdrop-blur-xl rounded-xl border-2 border-yellow-400/50 p-10 shadow-2xl shadow-yellow-400/30">
                  {/* 🎆 **FRAME HEADER** */}
                  <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 mb-4 tracking-wide">
                      {getLanguageKey(language) === 'de' && 'Macrobius - Klassische Bildung'}
                      {getLanguageKey(language) === 'en' && 'Macrobius - Classical Education'}
                      {getLanguageKey(language) === 'la' && 'Macrobius - Eruditio Classica'}
                    </h1>
                    <p className="text-white/80 text-lg leading-relaxed max-w-3xl mx-auto">
                      {getLanguageKey(language) === 'de' && 'Eine antike Flaschenpost - Eine Nachricht aus der Antike an die Zukunft'}
                      {getLanguageKey(language) === 'en' && 'An Ancient Message in a Bottle - A Message from Antiquity to the Future'}
                      {getLanguageKey(language) === 'la' && 'Antiqua Epistula in Vitro - Nuntius ab Antiquitate ad Futurum'}
                    </p>
                    
                    {/* Decorative Divider */}
                    <div className="mt-6 flex items-center justify-center">
                      <div className="w-20 h-px bg-gradient-to-r from-transparent to-yellow-400/50" />
                      <Sparkles className="w-5 h-5 text-yellow-400/70 mx-4" />
                      <div className="w-20 h-px bg-gradient-to-l from-transparent to-yellow-400/50" />
                    </div>
                  </div>
                  
                  {/* 🏠 **CONTENT AREA** */}
                  <div className="min-h-[600px]">
                    {/* Content Grid */}
                    <div className="grid grid-cols-2 gap-8 h-full">
                      {appSections.map((section, index) => (
                        <button
                          key={section.id}
                          onClick={() => setCurrentSection(section.id)}
                          className="group relative h-full bg-gradient-to-br from-black/50 to-black/70 rounded-xl border border-yellow-400/40 overflow-hidden transition-all duration-700 hover:border-yellow-400/80 hover:shadow-2xl hover:shadow-yellow-400/30 hover:scale-105 backdrop-blur-sm"
                          style={{
                            animationDelay: `${index * 0.2}s`,
                            minHeight: '240px'
                          }}
                        >
                          {/* Background Pattern */}
                          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/8 to-amber-500/8" />
                          
                          {/* Border Pattern */}
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
                          <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-transparent via-yellow-400/50 to-transparent" />
                          <div className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-b from-transparent via-yellow-400/50 to-transparent" />
                          
                          {/* Content */}
                          <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
                            {/* Icon */}
                            <div className="mb-6 p-6 rounded-full bg-gradient-to-br from-yellow-400/25 to-amber-500/25 border-2 border-yellow-400/40 group-hover:scale-125 transition-all duration-500 shadow-lg">
                              <div className="text-yellow-400 group-hover:text-yellow-300 transition-colors duration-500">
                                {section.icon}
                              </div>
                            </div>
                            
                            {/* Title */}
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-100 transition-colors duration-500 tracking-wide">
                              {section.label[getLanguageKey(language)]}
                            </h3>
                            
                            {/* Description */}
                            <p className="text-white/80 text-sm leading-relaxed group-hover:text-white/95 transition-colors duration-500 max-w-xs">
                              {section.description[getLanguageKey(language)]}
                            </p>
                          </div>
                          
                          {/* Hover Glow */}
                          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-amber-500/0 group-hover:from-yellow-400/15 group-hover:to-amber-500/15 transition-all duration-700" />
                          
                          {/* Corner Sparkles */}
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <Sparkles className="w-4 h-4 text-yellow-400/80 animate-pulse" />
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
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-md">
          <div className="w-80 h-full bg-black/95 backdrop-blur-xl border-r border-yellow-400/40 p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold text-yellow-400 tracking-wide">Navigation</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl text-white hover:bg-white/15 transition-all duration-300 border border-white/20"
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
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-white/75 hover:text-white hover:bg-white/10 transition-all duration-300"
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