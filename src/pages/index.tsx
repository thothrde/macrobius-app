'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

// Safe UI Components Import with Fallbacks
let EnhancedCosmicBackground: React.ComponentType<any>;
let EnhancedClassicalCard: React.ComponentType<any>;
let EnhancedClassicalButton: React.ComponentType<any>;
let EnhancedLoadingSpinner: React.ComponentType<any>;
let EnhancedErrorBoundary: React.ComponentType<any>;

try {
  EnhancedCosmicBackground = require('@/components/ui/EnhancedCosmicBackground').default;
  EnhancedClassicalCard = require('@/components/ui/EnhancedClassicalCard').default;
  EnhancedClassicalButton = require('@/components/ui/EnhancedClassicalButton').default;
  EnhancedLoadingSpinner = require('@/components/ui/EnhancedLoadingStates').EnhancedLoadingSpinner;
  EnhancedErrorBoundary = require('@/components/ui/EnhancedErrorBoundary').default;
} catch (error) {
  console.warn('Enhanced components not available, using fallbacks');
  // Fallback to basic div components
  EnhancedCosmicBackground = ({ children }: any) => <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">{children}</div>;
  EnhancedClassicalCard = ({ children, className }: any) => <div className={cn("bg-white/10 backdrop-blur rounded-lg p-6", className)}>{children}</div>;
  EnhancedClassicalButton = ({ children, onClick, className }: any) => <button onClick={onClick} className={cn("px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700", className)}>{children}</button>;
  EnhancedLoadingSpinner = () => <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />;
  EnhancedErrorBoundary = ({ children }: any) => <div>{children}</div>;
}

// Section Components (with fallbacks)
const IntroSection = React.lazy(() => 
  import('@/components/sections/IntroSection').catch(() => 
    ({ default: () => <div className="text-center py-20"><h1 className="text-4xl font-bold text-white mb-4">Willkommen bei Macrobius</h1><p className="text-xl text-white/80">Eine antike Flaschenpost - Eine Nachricht aus der Antike an die Zukunft</p></div> })
  )
);

const QuizSection = React.lazy(() => 
  import('@/components/sections/QuizSection').catch(() => 
    import('@/components/sections/QuizSection-SMART-GENERATION-COMPLETE').catch(() => 
      ({ default: () => <div className="text-center py-20"><h2 className="text-3xl font-bold text-white">Quiz Section</h2><p className="text-white/80">Quiz coming soon...</p></div> })
    )
  )
);

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
  Sparkles,
  Languages,
  Eye,
  Menu
} from 'lucide-react';

// Enhanced Section Configuration
interface EnhancedSection {
  id: string;
  label: { de: string; en: string; la: string };
  icon: React.ReactNode;
  component: React.ComponentType;
}

const enhancedSections: EnhancedSection[] = [
  {
    id: 'intro',
    label: { de: 'Einführung', en: 'Introduction', la: 'Introductio' },
    icon: <Home className="w-5 h-5" />,
    component: IntroSection
  },
  {
    id: 'quiz',
    label: { de: 'Quiz', en: 'Quiz', la: 'Quaestiones' },
    icon: <HelpCircle className="w-5 h-5" />,
    component: QuizSection
  }
];

// Enhanced Main App Component
const EnhancedMacrobiusApp: React.FC = () => {
  const { language, setLanguage, translations } = useLanguage();
  
  // State Management
  const [currentSection, setCurrentSection] = useState('intro');
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Enhanced Loading State
  useEffect(() => {
    const initializeApp = async () => {
      // Simulate app initialization
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
    };
    
    initializeApp();
  }, []);
  
  // Enhanced Navigation Items
  const navigationItems = enhancedSections.map(section => ({
    id: section.id,
    label: section.label,
    icon: section.icon,
    onClick: () => {
      setCurrentSection(section.id);
      setMobileMenuOpen(false);
    },
    active: currentSection === section.id
  }));
  
  // Enhanced Section Rendering
  const renderCurrentSection = () => {
    const section = enhancedSections.find(s => s.id === currentSection);
    if (!section) return null;
    
    const Component = section.component;
    
    return (
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <EnhancedLoadingSpinner />
        </div>
      }>
        <Component />
      </Suspense>
    );
  };
  
  // Enhanced Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="text-center space-y-8">
          <EnhancedLoadingSpinner />
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
              {language === 'de' ? 'Lade Macrobius...' : language === 'en' ? 'Loading Macrobius...' : 'Macrobius Carrico...'}
            </h1>
            <p className="text-lg text-white/70">
              {language === 'de' ? 'Bereite die antike Weisheit vor...' : language === 'en' ? 'Preparing ancient wisdom...' : 'Sapientiam antiquam paro...'}
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Enhanced Cosmic Background */}
      <EnhancedCosmicBackground>
        {/* Enhanced Navigation */}
        <nav className="sticky top-0 z-40 w-full bg-black/20 backdrop-blur-xl border-b border-yellow-400/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo/Brand */}
              <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-yellow-400" />
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                  Macrobius
                </span>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-4">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={item.onClick}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
                      {
                        "bg-yellow-400/20 text-yellow-100 border border-yellow-400/40": item.active,
                        "text-white/70 hover:text-white hover:bg-white/10": !item.active
                      }
                    )}
                  >
                    {item.icon}
                    <span>{item.label[language]}</span>
                  </button>
                ))}
                
                {/* Language Selector */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLanguage('de')}
                    className={cn("px-2 py-1 rounded text-sm", {
                      "bg-yellow-400 text-black": language === 'de',
                      "text-white/70 hover:text-white": language !== 'de'
                    })}
                  >
                    DE
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={cn("px-2 py-1 rounded text-sm", {
                      "bg-yellow-400 text-black": language === 'en',
                      "text-white/70 hover:text-white": language !== 'en'
                    })}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage('la')}
                    className={cn("px-2 py-1 rounded text-sm", {
                      "bg-yellow-400 text-black": language === 'la',
                      "text-white/70 hover:text-white": language !== 'la'
                    })}
                  >
                    LA
                  </button>
                </div>
              </div>
              
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-white hover:bg-white/10"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
            
            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-yellow-400/30">
                <div className="space-y-2">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={item.onClick}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-left",
                        {
                          "bg-yellow-400/20 text-yellow-100 border border-yellow-400/40": item.active,
                          "text-white/70 hover:text-white hover:bg-white/10": !item.active
                        }
                      )}
                    >
                      {item.icon}
                      <span>{item.label[language]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>
        
        {/* Enhanced Main Content */}
        <main className="relative z-10 pt-4" role="main">
          <div className="container mx-auto px-4">
            {renderCurrentSection()}
          </div>
        </main>
        
        {/* Enhanced Footer */}
        <footer className="relative z-10 mt-20 border-t border-yellow-400/30 bg-black/20 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                  Macrobius
                </span>
              </div>
              <p className="text-white/70">
                {language === 'de' && 'Eine antike Flaschenpost - Eine Nachricht aus der Antike an die Zukunft'}
                {language === 'en' && 'An Ancient Message in a Bottle - A Message from Antiquity to the Future'}
                {language === 'la' && 'Antiqua Epistula in Vitro - Nuntius ab Antiquitate ad Futurum'}
              </p>
              <p className="text-white/60 text-sm mt-2">
                © 2025 Macrobius App - Klassische Bildung für die moderne Welt
              </p>
            </div>
          </div>
        </footer>
      </EnhancedCosmicBackground>
    </div>
  );
};

// Enhanced Error Boundary Wrapper
const EnhancedApp: React.FC = () => {
  return (
    <EnhancedErrorBoundary>
      <EnhancedMacrobiusApp />
    </EnhancedErrorBoundary>
  );
};

export default EnhancedApp;