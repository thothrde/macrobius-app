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
  Settings,
  User,
  X
} from 'lucide-react';

// Enhanced Classical Astrolabe Component with Improved Animations
const ClassicalAstrolabe: React.FC<{ className?: string }> = ({ className }) => {
  const [rotation, setRotation] = useState(0);
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.3) % 360);
      setPulsePhase(prev => (prev + 0.1) % (2 * Math.PI));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("relative", className)}>
      {/* Enhanced Outer Ring with Gradient */}
      <div className="absolute inset-0 rounded-full border-2 border-gradient-to-r from-yellow-400/40 via-amber-500/40 to-yellow-400/40 animate-pulse" 
           style={{ boxShadow: '0 0 20px rgba(251, 191, 36, 0.3)' }} />
      
      {/* Secondary Ring */}
      <div className="absolute inset-1 rounded-full border border-yellow-400/30 bg-gradient-radial from-yellow-400/5 to-transparent" />
      
      {/* Inner Rotating Disc with Enhanced Visuals */}
      <div 
        className="absolute inset-3 rounded-full border border-yellow-400/60 bg-gradient-to-br from-yellow-400/15 to-amber-500/15 backdrop-blur-sm shadow-inner"
        style={{ 
          transform: `rotate(${rotation}deg)`,
          boxShadow: 'inset 0 0 10px rgba(251, 191, 36, 0.2)'
        }}
      >
        {/* Enhanced Constellation Points */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const x = 45 + 35 * Math.cos(angle);
          const y = 45 + 35 * Math.sin(angle);
          const brightness = 0.5 + 0.5 * Math.sin(pulsePhase + i * 0.5);
          return (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-sm"
              style={{ 
                left: `${x}%`, 
                top: `${y}%`,
                opacity: brightness,
                boxShadow: `0 0 4px rgba(251, 191, 36, ${brightness})`
              }}
            />
          );
        })}
        
        {/* Enhanced Central Star */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Star className="w-5 h-5 text-yellow-400 drop-shadow-glow" 
                style={{ filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.7))' }} />
        </div>
      </div>
      
      {/* Enhanced Measurement Lines */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center rotate-45">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center rotate-90">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center rotate-[135deg]">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
      </div>
    </div>
  );
};

// Enhanced Classical Macrobius Portrait Component
const ClassicalMacrobiusPortrait: React.FC<{ className?: string }> = ({ className }) => {
  const [glowIntensity, setGlowIntensity] = useState(0.5);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(0.3 + 0.4 * Math.sin(Date.now() / 2000));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("relative", className)}>
      {/* Enhanced Outer Golden Ring with Animated Glow */}
      <div className="absolute inset-0 rounded-full border-4 border-gradient-to-r from-yellow-400 to-amber-500 p-1"
           style={{ 
             boxShadow: `0 0 20px rgba(251, 191, 36, ${glowIntensity}), inset 0 0 10px rgba(251, 191, 36, 0.2)` 
           }}>
        <div className="w-full h-full rounded-full border-2 border-yellow-400/60 bg-gradient-to-br from-amber-900/90 to-yellow-900/90 backdrop-blur-sm overflow-hidden"
             style={{ boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.3)' }}>
          {/* Portrait Silhouette */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Enhanced Classical Profile */}
            <div className="relative w-16 h-16 bg-gradient-to-br from-yellow-400/25 to-amber-500/25 rounded-full border border-yellow-400/40 shadow-lg">
              {/* Enhanced Laurel Crown */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="w-22 h-5 bg-gradient-to-r from-green-400/40 to-green-500/40 rounded-full border border-green-400/50" 
                     style={{ boxShadow: '0 0 8px rgba(74, 222, 128, 0.3)' }} />
                {/* Laurel Leaves Detail */}
                <div className="absolute top-0 left-1/4 w-1 h-1 bg-green-400 rounded-full" />
                <div className="absolute top-0 right-1/4 w-1 h-1 bg-green-400 rounded-full" />
                <div className="absolute top-1 left-1/3 w-1 h-1 bg-green-500 rounded-full" />
                <div className="absolute top-1 right-1/3 w-1 h-1 bg-green-500 rounded-full" />
              </div>
              
              {/* Enhanced Face Features */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <User className="w-9 h-9 text-yellow-400/80 drop-shadow-lg" 
                      style={{ filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.5))' }} />
              </div>
              
              {/* Enhanced Classical Toga */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3">
                <div className="w-14 h-10 bg-gradient-to-b from-white/15 to-white/8 rounded-t-full border-t border-white/30"
                     style={{ boxShadow: '0 -2px 6px rgba(255, 255, 255, 0.1)' }} />
                {/* Toga Folds */}
                <div className="absolute top-2 left-1/4 w-6 h-px bg-white/20" />
                <div className="absolute top-4 left-1/3 w-4 h-px bg-white/15" />
              </div>
            </div>
          </div>
          
          {/* Enhanced Inscription with Classical Font */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <span className="text-xs font-serif text-yellow-400/90 tracking-widest drop-shadow-sm"
                  style={{ textShadow: '0 0 4px rgba(251, 191, 36, 0.5)' }}>MACROBIVS</span>
          </div>
        </div>
      </div>
      
      {/* Enhanced Rotating Outer Glow */}
      <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-yellow-400/30 via-transparent to-amber-500/30 animate-spin-slow" 
           style={{ animationDuration: '8s' }} />
      
      {/* Additional Sparkle Effects */}
      <div className="absolute top-2 right-4">
        <Sparkles className="w-3 h-3 text-yellow-400/60 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
      <div className="absolute bottom-4 left-2">
        <Sparkles className="w-2 h-2 text-amber-400/50 animate-pulse" style={{ animationDelay: '1.2s' }} />
      </div>
    </div>
  );
};

// Enhanced Classical Navigation Component
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
    <nav className={cn("space-y-3", className)}>
      {items.map((item, index) => (
        <button
          key={item.id}
          onClick={item.onClick}
          className={cn(
            "w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-500 text-left group relative overflow-hidden",
            {
              "bg-gradient-to-r from-yellow-400/25 to-amber-500/25 border border-yellow-400/50 text-yellow-100 shadow-xl shadow-yellow-400/30 scale-105": item.active,
              "text-white/75 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/30 hover:shadow-lg hover:scale-102": !item.active
            }
          )}
          style={{
            animationDelay: `${index * 0.1}s`,
            backdropFilter: item.active ? 'blur(12px)' : 'blur(8px)'
          }}
        >
          {/* Background Glow Effect */}
          {item.active && (
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-amber-500/10 animate-pulse" />
          )}
          
          <div className={cn("transition-all duration-500 relative z-10", {
            "scale-125 text-yellow-400 drop-shadow-glow": item.active,
            "group-hover:scale-110 group-hover:text-yellow-300": !item.active
          })}>
            {item.icon}
          </div>
          <span className="font-medium relative z-10 tracking-wide">{item.label[language]}</span>
          {item.active && (
            <div className="ml-auto relative z-10">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" 
                        style={{ filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.7))' }} />
            </div>
          )}
          
          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 to-amber-500/0 group-hover:from-yellow-400/5 group-hover:to-amber-500/5 transition-all duration-500" />
        </button>
      ))}
    </nav>
  );
};

// Enhanced Classical Content Grid Component
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
    <div className="grid grid-cols-2 gap-8 h-full">
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={section.onClick}
          className="group relative h-full bg-gradient-to-br from-black/50 to-black/70 rounded-xl border border-yellow-400/40 overflow-hidden transition-all duration-700 hover:border-yellow-400/80 hover:shadow-2xl hover:shadow-yellow-400/30 hover:scale-105 backdrop-blur-sm"
          style={{
            animationDelay: `${index * 0.2}s`,
            minHeight: '240px'
          }}
        >
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/8 to-amber-500/8" />
          
          {/* Classical Border Pattern */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
          <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-transparent via-yellow-400/50 to-transparent" />
          <div className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-b from-transparent via-yellow-400/50 to-transparent" />
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
            {/* Enhanced Icon */}
            <div className="mb-6 p-6 rounded-full bg-gradient-to-br from-yellow-400/25 to-amber-500/25 border-2 border-yellow-400/40 group-hover:scale-125 transition-all duration-500 shadow-lg">
              <div className="text-yellow-400 group-hover:text-yellow-300 transition-colors duration-500 drop-shadow-lg"
                   style={{ filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.4))' }}>
                {section.icon}
              </div>
            </div>
            
            {/* Enhanced Title */}
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-100 transition-colors duration-500 tracking-wide">
              {section.title[language]}
            </h3>
            
            {/* Enhanced Description */}
            <p className="text-white/80 text-sm leading-relaxed group-hover:text-white/95 transition-colors duration-500 max-w-xs">
              {section.description[language]}
            </p>
          </div>
          
          {/* Enhanced Hover Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-amber-500/0 group-hover:from-yellow-400/15 group-hover:to-amber-500/15 transition-all duration-700" />
          
          {/* Corner Sparkles */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Sparkles className="w-4 h-4 text-yellow-400/80 animate-pulse" />
          </div>
          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <Sparkles className="w-3 h-3 text-amber-400/60 animate-pulse" style={{ animationDelay: '0.3s' }} />
          </div>
        </button>
      ))}
    </div>
  );
};

// Main Enhanced Classical Layout Component
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
      {/* Enhanced Night Sky Background with Deeper Gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 via-slate-900 to-black">
        {/* Enhanced Animated Stars */}
        {[...Array(150)].map((_, i) => {
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const delay = Math.random() * 4;
          const duration = 2 + Math.random() * 3;
          const size = 0.5 + Math.random() * 1.5;
          
          return (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-twinkle"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, 0.8)`
              }}
            />
          );
        })}
        
        {/* Enhanced Constellation Patterns */}
        <div className="absolute top-1/4 right-1/4 opacity-40">
          <svg width="240" height="240" viewBox="0 0 240 240">
            <g stroke="#facc15" strokeWidth="1.5" fill="none" opacity="0.7">
              <line x1="60" y1="60" x2="120" y2="40" />
              <line x1="120" y1="40" x2="180" y2="60" />
              <line x1="180" y1="60" x2="160" y2="120" />
              <line x1="160" y1="120" x2="80" y2="120" />
              <line x1="80" y1="120" x2="60" y2="60" />
              <line x1="120" y1="40" x2="120" y2="120" />
            </g>
            <g fill="#facc15">
              <circle cx="60" cy="60" r="2.5" className="animate-pulse" />
              <circle cx="120" cy="40" r="3" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
              <circle cx="180" cy="60" r="2" className="animate-pulse" style={{ animationDelay: '1s' }} />
              <circle cx="160" cy="120" r="2.5" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
              <circle cx="80" cy="120" r="2" className="animate-pulse" style={{ animationDelay: '2s' }} />
            </g>
          </svg>
        </div>
        
        {/* Additional Nebula Effect */}
        <div className="absolute top-1/3 left-1/6 w-96 h-96 bg-gradient-radial from-purple-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-radial from-yellow-400/8 via-amber-500/4 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
      </div>
      
      {/* Main Layout Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Enhanced Top Header with Macrobius Portrait */}
        <header className="w-full py-8 backdrop-blur-sm bg-black/10">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between">
              {/* Navigation Toggle (Mobile) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-3 rounded-xl text-white hover:bg-white/15 transition-all duration-300 border border-white/20"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              {/* Central Enhanced Macrobius Portrait */}
              <div className="flex-1 flex justify-center">
                <ClassicalMacrobiusPortrait className="w-28 h-28" />
              </div>
              
              {/* Enhanced Language Selector */}
              <div className="flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-xl p-2 border border-yellow-400/30">
                {(['de', 'en', 'la'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => onLanguageChange(lang)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden",
                      {
                        "bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-400/40 scale-110": language === lang,
                        "text-white/80 hover:text-white hover:bg-white/15 border border-white/20 hover:border-white/40": language !== lang
                      }
                    )}
                  >
                    {lang.toUpperCase()}
                    {language === lang && (
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>
        
        {/* Enhanced Main Content Area */}
        <main className="flex-1 flex">
          <div className="container mx-auto px-6 flex gap-10 h-full">
            {/* Enhanced Left Navigation */}
            <aside className={cn(
              "w-80 flex-shrink-0 transition-all duration-500",
              {
                "translate-x-0": !mobileMenuOpen,
                "-translate-x-full lg:translate-x-0": mobileMenuOpen
              }
            )}>
              <div className="sticky top-8">
                <div className="bg-black/30 backdrop-blur-xl rounded-xl border border-yellow-400/40 p-8 shadow-2xl shadow-yellow-400/10">
                  {/* Enhanced Astrolabe */}
                  <div className="mb-10 flex justify-center">
                    <ClassicalAstrolabe className="w-36 h-36" />
                  </div>
                  
                  {/* Enhanced Navigation */}
                  <ClassicalNavigation items={navigationItems} />
                </div>
              </div>
            </aside>
            
            {/* Enhanced Central Content Frame */}
            <div className="flex-1 flex items-center justify-center py-10">
              <div className="w-full max-w-5xl">
                {/* Enhanced Classical Frame */}
                <div className="bg-black/40 backdrop-blur-xl rounded-xl border-2 border-yellow-400/50 p-10 shadow-2xl shadow-yellow-400/30" 
                     style={{ backdropFilter: 'blur(20px)' }}>
                  {/* Enhanced Frame Header */}
                  <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 mb-4 tracking-wide">
                      {language === 'de' && 'Macrobius - Klassische Bildung'}
                      {language === 'en' && 'Macrobius - Classical Education'}
                      {language === 'la' && 'Macrobius - Eruditio Classica'}
                    </h1>
                    <p className="text-white/80 text-lg leading-relaxed max-w-3xl mx-auto">
                      {language === 'de' && 'Eine antike Flaschenpost - Eine Nachricht aus der Antike an die Zukunft'}
                      {language === 'en' && 'An Ancient Message in a Bottle - A Message from Antiquity to the Future'}
                      {language === 'la' && 'Antiqua Epistula in Vitro - Nuntius ab Antiquitate ad Futurum'}
                    </p>
                    
                    {/* Decorative Divider */}
                    <div className="mt-6 flex items-center justify-center">
                      <div className="w-20 h-px bg-gradient-to-r from-transparent to-yellow-400/50" />
                      <Sparkles className="w-5 h-5 text-yellow-400/70 mx-4" />
                      <div className="w-20 h-px bg-gradient-to-l from-transparent to-yellow-400/50" />
                    </div>
                  </div>
                  
                  {/* Enhanced Content Area */}
                  <div className="min-h-[600px]">
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
      
      {/* Enhanced Mobile Navigation Overlay */}
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
            <ClassicalNavigation items={navigationItems} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassicalMacrobiusLayout;
export { ClassicalAstrolabe, ClassicalMacrobiusPortrait, ClassicalNavigation, ClassicalContentGrid };