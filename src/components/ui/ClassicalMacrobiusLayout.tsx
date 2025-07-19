'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import {
  Home,
  HelpCircle,
  Globe,
  Star,
  Users,
  Search,
  GraduationCap,
  BarChart3,
  Sparkles,
  Languages,
  Eye,
  Menu,
  BookOpen,
  MapPin,
  Compass,
  Calendar,
  MessageSquare,
  Settings
} from 'lucide-react';

// Classical Astrolabe Component
const ClassicalAstrolabe: React.FC<{ className?: string }> = ({ className }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("relative", className)}>
      {/* Outer Ring */}
      <div className="absolute inset-0 rounded-full border-2 border-yellow-400/30 animate-pulse" />
      
      {/* Inner Rotating Disc */}
      <div 
        className="absolute inset-2 rounded-full border border-yellow-400/50 bg-gradient-to-br from-yellow-400/10 to-amber-500/10 backdrop-blur-sm"
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
              className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-twinkle"
              style={{ 
                left: `${x}%`, 
                top: `${y}%`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          );
        })}
        
        {/* Central Star */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
        </div>
      </div>
      
      {/* Measurement Lines */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center rotate-90">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
      </div>
    </div>
  );
};

// Classical Macrobius Portrait Component
const ClassicalMacrobiusPortrait: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("relative", className)}>
      {/* Outer Golden Ring */}
      <div className="absolute inset-0 rounded-full border-4 border-gradient-to-r from-yellow-400 to-amber-500 p-1">
        <div className="w-full h-full rounded-full border-2 border-yellow-400/50 bg-gradient-to-br from-amber-900/80 to-yellow-900/80 backdrop-blur-sm overflow-hidden">
          {/* Portrait Silhouette */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Classical Profile */}
            <div className="relative w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-full border border-yellow-400/30">
              {/* Laurel Crown */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <div className="w-20 h-4 bg-gradient-to-r from-green-400/30 to-green-500/30 rounded-full border border-green-400/40" />
              </div>
              
              {/* Face Features */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <User className="w-8 h-8 text-yellow-400/70" />
              </div>
              
              {/* Classical Toga */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
                <div className="w-12 h-8 bg-gradient-to-b from-white/10 to-white/5 rounded-t-full border-t border-white/20" />
              </div>
            </div>
          </div>
          
          {/* Inscription */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <span className="text-xs font-serif text-yellow-400/80 tracking-wider">MACROBIVS</span>
          </div>
        </div>
      </div>
      
      {/* Rotating Outer Glow */}
      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-yellow-400/20 via-transparent to-amber-500/20 animate-spin-slow" />
    </div>
  );
};

// Classical Navigation Component
interface ClassicalNavItem {
  id: string;
  label: { de: string; en: string; la: string };
  icon: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}

const ClassicalNavigation: React.FC<{ 
  items: ClassicalNavItem[];
  className?: string;
}> = ({ items, className }) => {
  const { language } = useLanguage();
  
  return (
    <nav className={cn("space-y-2", className)}>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={item.onClick}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-left group",
            {
              "bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-400/40 text-yellow-100 shadow-lg shadow-yellow-400/20": item.active,
              "text-white/70 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20": !item.active
            }
          )}
        >
          <div className={cn("transition-transform duration-300", {
            "scale-110 text-yellow-400": item.active,
            "group-hover:scale-105": !item.active
          })}>
            {item.icon}
          </div>
          <span className="font-medium">{item.label[language]}</span>
          {item.active && (
            <div className="ml-auto">
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            </div>
          )}
        </button>
      ))}
    </nav>
  );
};

// Classical Content Grid Component
const ClassicalContentGrid: React.FC<{
  sections: Array<{
    id: string;
    title: { de: string; en: string; la: string };
    description: { de: string; en: string; la: string };
    icon: React.ReactNode;
    onClick: () => void;
    image?: string;
  }>;
}> = ({ sections }) => {
  const { language } = useLanguage();
  
  return (
    <div className="grid grid-cols-2 gap-6 h-full">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={section.onClick}
          className="group relative h-full bg-gradient-to-br from-black/40 to-black/60 rounded-lg border border-yellow-400/30 overflow-hidden transition-all duration-500 hover:border-yellow-400/60 hover:shadow-xl hover:shadow-yellow-400/20 hover:scale-105"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-amber-500/5" />
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
            {/* Icon */}
            <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-yellow-400/20 to-amber-500/20 border border-yellow-400/30 group-hover:scale-110 transition-transform duration-300">
              <div className="text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">
                {section.icon}
              </div>
            </div>
            
            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-100 transition-colors duration-300">
              {section.title[language]}
            </h3>
            
            {/* Description */}
            <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
              {section.description[language]}
            </p>
          </div>
          
          {/* Hover Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-amber-500/0 group-hover:from-yellow-400/10 group-hover:to-amber-500/10 transition-all duration-500" />
        </button>
      ))}
    </div>
  );
};

// Main Classical Layout Component
interface ClassicalMacrobiusLayoutProps {
  children?: React.ReactNode;
  navigationItems: ClassicalNavItem[];
  contentSections: Array<{
    id: string;
    title: { de: string; en: string; la: string };
    description: { de: string; en: string; la: string };
    icon: React.ReactNode;
    onClick: () => void;
    image?: string;
  }>;
  currentSection?: string;
  onLanguageChange: (lang: 'de' | 'en' | 'la') => void;
}

const ClassicalMacrobiusLayout: React.FC<ClassicalMacrobiusLayoutProps> = ({
  children,
  navigationItems,
  contentSections,
  currentSection,
  onLanguageChange
}) => {
  const { language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Night Sky Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-black">
        {/* Animated Stars */}
        {[...Array(100)].map((_, i) => {
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const delay = Math.random() * 3;
          const duration = 2 + Math.random() * 2;
          
          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`
              }}
            />
          );
        })}
        
        {/* Constellation Patterns */}
        <div className="absolute top-1/4 right-1/4 opacity-30">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <g stroke="#facc15" strokeWidth="1" fill="none" opacity="0.5">
              <line x1="50" y1="50" x2="100" y2="30" />
              <line x1="100" y1="30" x2="150" y2="50" />
              <line x1="150" y1="50" x2="130" y2="100" />
              <line x1="130" y1="100" x2="70" y2="100" />
              <line x1="70" y1="100" x2="50" y2="50" />
            </g>
            <g fill="#facc15">
              <circle cx="50" cy="50" r="2" />
              <circle cx="100" cy="30" r="2" />
              <circle cx="150" cy="50" r="2" />
              <circle cx="130" cy="100" r="2" />
              <circle cx="70" cy="100" r="2" />
            </g>
          </svg>
        </div>
      </div>
      
      {/* Main Layout Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top Header with Macrobius Portrait */}
        <header className="w-full py-6">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between">
              {/* Navigation Toggle (Mobile) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              {/* Central Macrobius Portrait */}
              <div className="flex-1 flex justify-center">
                <ClassicalMacrobiusPortrait className="w-24 h-24" />
              </div>
              
              {/* Language Selector */}
              <div className="flex items-center gap-2">
                {(['de', 'en', 'la'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => onLanguageChange(lang)}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium transition-all duration-300",
                      {
                        "bg-yellow-400 text-black shadow-lg shadow-yellow-400/30": language === lang,
                        "text-white/70 hover:text-white hover:bg-white/10 border border-white/20": language !== lang
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
        
        {/* Main Content Area */}
        <main className="flex-1 flex">
          <div className="container mx-auto px-6 flex gap-8 h-full">
            {/* Left Navigation */}
            <aside className={cn(
              "w-80 flex-shrink-0 transition-all duration-300",
              {
                "translate-x-0": !mobileMenuOpen,
                "-translate-x-full lg:translate-x-0": mobileMenuOpen
              }
            )}>
              <div className="sticky top-8">
                <div className="bg-black/20 backdrop-blur-xl rounded-lg border border-yellow-400/30 p-6">
                  {/* Astrolabe */}
                  <div className="mb-8 flex justify-center">
                    <ClassicalAstrolabe className="w-32 h-32" />
                  </div>
                  
                  {/* Navigation */}
                  <ClassicalNavigation items={navigationItems} />
                </div>
              </div>
            </aside>
            
            {/* Central Content Frame */}
            <div className="flex-1 flex items-center justify-center py-8">
              <div className="w-full max-w-4xl">
                {/* Classical Frame */}
                <div className="bg-black/30 backdrop-blur-xl rounded-lg border-2 border-yellow-400/40 p-8 shadow-2xl shadow-yellow-400/20">
                  {/* Frame Header */}
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 mb-2">
                      {language === 'de' && 'Macrobius - Klassische Bildung'}
                      {language === 'en' && 'Macrobius - Classical Education'}
                      {language === 'la' && 'Macrobius - Eruditio Classica'}
                    </h1>
                    <p className="text-white/70">
                      {language === 'de' && 'Eine antike Flaschenpost - Eine Nachricht aus der Antike an die Zukunft'}
                      {language === 'en' && 'An Ancient Message in a Bottle - A Message from Antiquity to the Future'}
                      {language === 'la' && 'Antiqua Epistula in Vitro - Nuntius ab Antiquitate ad Futurum'}
                    </p>
                  </div>
                  
                  {/* Content Area */}
                  <div className="min-h-[500px]">
                    {children || (
                      <ClassicalContentGrid sections={contentSections} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="w-80 h-full bg-black/90 backdrop-blur-xl border-r border-yellow-400/30 p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-yellow-400">Navigation</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-white hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <ClassicalNavigation items={navigationItems} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassicalMacrobiusLayout;
export { ClassicalAstrolabe, ClassicalMacrobiusPortrait, ClassicalNavigation, ClassicalContentGrid };