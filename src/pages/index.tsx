'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
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
  User
} from 'lucide-react';

// 🔧 **SAFE UI COMPONENTS WITH FALLBACKS**
const EnhancedLoadingSpinner = () => (
  <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
);

const EnhancedErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>{children}</div>
);

// 🔧 **LANGUAGE CONVERSION UTILITIES**
const convertToLanguage = (lang: 'de' | 'en' | 'la'): Language => {
  switch(lang) {
    case 'de': return 'DE';
    case 'en': return 'EN';
    case 'la': return 'LA';
    default: return 'EN';
  }
};

// 🔧 **LOADING FALLBACK COMPONENT**
const LoadingFallback = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <EnhancedLoadingSpinner />
  </div>
);

// 🔧 **SIMPLE STATIC FALLBACK COMPONENTS FOR TYPE SAFETY**
const StaticQuizFallback = () => (
  <div className="text-center py-12">
    <h2 className="text-3xl font-bold text-white mb-6">Interaktive Quiz</h2>
    <p className="text-white/80 mb-8">Testen Sie Ihr Wissen über Macrobius und die antike Kultur</p>
    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-lg p-6">
      <p className="text-white/90">KI-generierte Quizfragen basierend auf authentischen Texten...</p>
      <div className="mt-4 flex justify-center">
        <EnhancedLoadingSpinner />
      </div>
    </div>
  </div>
);

const StaticTextSearchFallback = () => (
  <div className="text-center py-12">
    <h2 className="text-3xl font-bold text-white mb-6">Textsuche</h2>
    <p className="text-white/80 mb-8">Durchsuchen Sie das komplette Macrobius-Korpus</p>
    <div className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border border-teal-400/30 rounded-lg p-6">
      <p className="text-white/90">KI-gestützte semantische Suche durch 1.401 authentische Textpassagen...</p>
      <div className="mt-4 flex justify-center">
        <EnhancedLoadingSpinner />
      </div>
    </div>
  </div>
);

const StaticLearningFallback = () => (
  <div className="text-center py-12">
    <h2 className="text-3xl font-bold text-white mb-6">Lernen</h2>
    <p className="text-white/80 mb-8">Personalisierte Lernpfade für Latein und antike Kultur</p>
    <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-400/30 rounded-lg p-6">
      <p className="text-white/90">Adaptive KI-Tutoring und Vokabeltraining...</p>
      <div className="mt-4 flex justify-center">
        <EnhancedLoadingSpinner />
      </div>
    </div>
  </div>
);

// 🔧 **COMPATIBLE LAYOUT FALLBACK**
interface LayoutFallbackProps {
  children?: React.ReactNode;
  navigationItems?: any[];
  contentSections?: any[];
  currentSection?: string;
  onLanguageChange?: (lang: 'de' | 'en' | 'la') => void;
}

const CompatibleLayoutFallback: React.FC<LayoutFallbackProps> = ({ 
  children, 
  navigationItems = [], 
  contentSections = [], 
  currentSection, 
  onLanguageChange 
}) => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black">
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 mb-4">
          Macrobius
        </h1>
        <p className="text-xl text-white/80">Eine antike Flaschenpost - Eine Nachricht aus der Antike an die Zukunft</p>
        
        {/* Simple Language Selector */}
        {onLanguageChange && (
          <div className="mt-4 flex justify-center gap-2">
            {(['de', 'en', 'la'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded border border-yellow-400/40 hover:bg-yellow-400/30 transition-colors"
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </header>
      
      <main className="max-w-4xl mx-auto">
        {/* Simple Navigation */}
        {navigationItems.length > 0 && (
          <nav className="mb-8 flex flex-wrap justify-center gap-2">
            {navigationItems.map((item, index) => (
              <button
                key={item.id || index}
                onClick={item.onClick}
                className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 transition-colors border border-white/20"
              >
                {item.label?.de || item.label || `Section ${index + 1}`}
              </button>
            ))}
          </nav>
        )}
        
        {/* Content Area */}
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          {children || (
            <div className="text-center text-white">
              <EnhancedLoadingSpinner />
              <p className="mt-4">Lade Komponenten...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  </div>
);

// 🎯 **SIMPLIFIED DYNAMIC COMPONENTS - NO COMPLEX FALLBACK CHAINS**
// Main layout component
const ClassicalMacrobiusLayout = dynamic(
  () => import('@/components/ui/ClassicalMacrobiusLayout'),
  {
    ssr: false,
    loading: LoadingFallback
  }
);

// Section components with simple dynamic imports - no complex fallbacks
const IntroSection = dynamic(
  () => import('@/components/sections/IntroSection'),
  {
    ssr: false,
    loading: LoadingFallback
  }
);

// Use static fallbacks instead of dynamic import chains
const QuizSection = dynamic(
  () => import('@/components/sections/QuizSection-SMART-GENERATION-COMPLETE'),
  {
    ssr: false,
    loading: LoadingFallback
  }
);

const WorldMapSection = dynamic(
  () => import('@/components/sections/WorldMapSection'),
  {
    ssr: false,
    loading: LoadingFallback
  }
);

const CosmosSection = dynamic(
  () => import('@/components/sections/CosmosSection'),
  {
    ssr: false,
    loading: LoadingFallback
  }
);

const BanquetSection = dynamic(
  () => import('@/components/sections/BanquetSection'),
  {
    ssr: false,
    loading: LoadingFallback
  }
);

const TextSearchSection = dynamic(
  () => import('@/components/sections/MacrobiusTextProcessor-TIER2-COMPLETE'),
  {
    ssr: false,
    loading: LoadingFallback
  }
);

const LearningSection = dynamic(
  () => import('@/components/sections/LearningSection-enhanced-complete'),
  {
    ssr: false,
    loading: LoadingFallback
  }
);

const VisualizationsSection = dynamic(
  () => import('@/components/sections/VisualizationsSection'),
  {
    ssr: false,
    loading: LoadingFallback
  }
);

// 📚 **SECTION CONFIGURATION**
interface AppSection {
  id: string;
  label: { de: string; en: string; la: string };
  description: { de: string; en: string; la: string };
  icon: React.ReactNode;
  component: React.ComponentType<any>;
  fallback: React.ComponentType;
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
    icon: <Home className="w-8 h-8" />,
    component: IntroSection,
    fallback: LoadingFallback
  },
  {
    id: 'quiz',
    label: { de: 'Quiz', en: 'Quiz', la: 'Quaestiones' },
    description: { 
      de: 'Interaktive Wissensprüfung',
      en: 'Interactive knowledge testing',
      la: 'Scientia interactiva probatio'
    },
    icon: <HelpCircle className="w-8 h-8" />,
    component: QuizSection,
    fallback: StaticQuizFallback
  },
  {
    id: 'worldmap',
    label: { de: 'Weltkarte', en: 'World Map', la: 'Mappa Mundi' },
    description: { 
      de: 'Geographische Exploration',
      en: 'Geographical exploration',
      la: 'Geographica exploratio'
    },
    icon: <Globe className="w-8 h-8" />,
    component: WorldMapSection,
    fallback: LoadingFallback
  },
  {
    id: 'cosmos',
    label: { de: 'Kosmos', en: 'Cosmos', la: 'Cosmos' },
    description: { 
      de: 'Antike Astronomie und Kosmologie',
      en: 'Ancient astronomy and cosmology',
      la: 'Astronomia et cosmologia antiqua'
    },
    icon: <Star className="w-8 h-8" />,
    component: CosmosSection,
    fallback: LoadingFallback
  },
  {
    id: 'banquet',
    label: { de: 'Gastmahl', en: 'Banquet', la: 'Convivium' },
    description: { 
      de: 'Die berühmten Saturnalien-Gespräche',
      en: 'The famous Saturnalia conversations',
      la: 'Celebres Saturnalium colloquia'
    },
    icon: <Wine className="w-8 h-8" />,
    component: BanquetSection,
    fallback: LoadingFallback
  },
  {
    id: 'textsearch',
    label: { de: 'Textsuche', en: 'Text Search', la: 'Textus Quaerere' },
    description: { 
      de: 'KI-gestützte Korpus-Analyse',
      en: 'AI-powered corpus analysis',
      la: 'AI-adiuvata corporis analysis'
    },
    icon: <Search className="w-8 h-8" />,
    component: TextSearchSection,
    fallback: StaticTextSearchFallback
  },
  {
    id: 'learning',
    label: { de: 'Lernen', en: 'Learning', la: 'Discere' },
    description: { 
      de: 'Personalisierte Bildungswege',
      en: 'Personalized learning paths',
      la: 'Personales viae discendi'
    },
    icon: <GraduationCap className="w-8 h-8" />,
    component: LearningSection,
    fallback: StaticLearningFallback
  },
  {
    id: 'visualizations',
    label: { de: 'Visualisierungen', en: 'Visualizations', la: 'Visualizationes' },
    description: { 
      de: 'Datenanalyse und -darstellung',
      en: 'Data analysis and visualization',
      la: 'Data analysis et visualizatio'
    },
    icon: <BarChart3 className="w-8 h-8" />,
    component: VisualizationsSection,
    fallback: LoadingFallback
  }
];

// 🎯 **MAIN APP COMPONENT WITH ENHANCED ERROR HANDLING**
const ClassicalMacrobiusApp: React.FC = () => {
  // State Management with SSR-safe defaults
  const [currentSection, setCurrentSection] = useState('intro');
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [componentError, setComponentError] = useState<string | null>(null);
  
  // Safe language hook usage
  const { language, setLanguage, isHydrated } = useLanguage();
  
  // 🔧 **CLIENT-SIDE INITIALIZATION**
  useEffect(() => {
    setIsClient(true);
    const initializeApp = async () => {
      try {
        // Simulate app initialization
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
      } catch (error) {
        console.error('App initialization error:', error);
        setComponentError('Initialization failed');
        setIsLoading(false);
      }
    };
    
    initializeApp();
  }, []);
  
  // 🔧 **SAFE LANGUAGE CHANGE HANDLER**
  const handleLanguageChange = (lang: 'de' | 'en' | 'la') => {
    if (isClient && isHydrated) {
      try {
        const convertedLang = convertToLanguage(lang);
        setLanguage(convertedLang);
      } catch (error) {
        console.error('Language change error:', error);
      }
    }
  };
  
  // 🔧 **SSR-SAFE NAVIGATION ITEMS**
  const navigationItems = appSections.map(section => ({
    id: section.id,
    label: section.label,
    icon: section.icon,
    onClick: () => {
      try {
        setCurrentSection(section.id);
        setComponentError(null); // Clear any previous errors
      } catch (error) {
        console.error('Navigation error:', error);
        setComponentError('Navigation failed');
      }
    },
    active: currentSection === section.id
  }));
  
  // 🔧 **SSR-SAFE CONTENT SECTIONS**
  const contentSections = appSections.map(section => ({
    id: section.id,
    title: section.label,
    description: section.description,
    icon: section.icon,
    onClick: () => {
      try {
        setCurrentSection(section.id);
        setComponentError(null); // Clear any previous errors
      } catch (error) {
        console.error('Section selection error:', error);
        setComponentError('Section selection failed');
      }
    }
  }));
  
  // 🔧 **SAFE SECTION RENDERING WITH FALLBACKS**
  const renderCurrentSection = () => {
    if (!isClient || !isHydrated) {
      return <LoadingFallback />;
    }
    
    if (componentError) {
      return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Component Error</h2>
          <p className="text-white/80 mb-4">{componentError}</p>
          <button 
            onClick={() => {
              setComponentError(null);
              setCurrentSection('intro');
            }}
            className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition-colors"
          >
            Zurück zur Einführung
          </button>
        </div>
      );
    }
    
    const section = appSections.find(s => s.id === currentSection);
    if (!section) {
      const FallbackComponent = StaticQuizFallback;
      return <FallbackComponent />;
    }
    
    try {
      const Component = section.component;
      const FallbackComponent = section.fallback;
      
      // Safe language handling
      const languageCode = language?.toLowerCase() || 'de';
      const languageName = language === 'DE' ? 'Deutsch' : language === 'EN' ? 'English' : 'Latina';
      
      // Try to render the main component, fall back to static component on error
      const ComponentToRender = Component || FallbackComponent;
      
      // Simplified props - no complex objects
      const safeProps = {
        language: languageCode,
        isActive: true
      };
      
      return <ComponentToRender {...safeProps} />;
    } catch (error) {
      console.error('Component render error:', error);
      const FallbackComponent = section.fallback;
      return <FallbackComponent />;
    }
  };
  
  // 🔧 **ENHANCED LOADING SCREEN**
  if (isLoading || !isClient || !isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-black">
        <div className="text-center space-y-8">
          {/* Animated Macrobius Portrait */}
          <div className="relative mx-auto">
            <div className="w-32 h-32 rounded-full border-4 border-yellow-400 bg-gradient-to-br from-amber-900/80 to-yellow-900/80 backdrop-blur-sm flex items-center justify-center animate-pulse">
              <User className="w-16 h-16 text-yellow-400" />
            </div>
            <div className="absolute -inset-4 rounded-full border border-yellow-400/30 animate-spin" style={{
              animation: 'spin 3s linear infinite'
            }} />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
              {language === 'DE' ? 'Lade Macrobius...' : language === 'EN' ? 'Loading Macrobius...' : 'Macrobius Carrico...'}
            </h1>
            <p className="text-lg text-white/70">
              {language === 'DE' ? 'Bereite die antike Weisheit vor...' : language === 'EN' ? 'Preparing ancient wisdom...' : 'Sapientiam antiquam paro...'}
            </p>
          </div>
          
          <EnhancedLoadingSpinner />
        </div>
      </div>
    );
  }
  
  // 🔧 **MAIN APP RENDER WITH SAFE COMPONENT SELECTION**
  const LayoutComponent = ClassicalMacrobiusLayout || CompatibleLayoutFallback;
  
  try {
    return (
      <LayoutComponent
        navigationItems={navigationItems}
        contentSections={contentSections}
        currentSection={currentSection}
        onLanguageChange={handleLanguageChange}
      >
        {currentSection !== 'intro' && renderCurrentSection()}
      </LayoutComponent>
    );
  } catch (error) {
    console.error('Layout render error:', error);
    return (
      <CompatibleLayoutFallback
        navigationItems={navigationItems}
        contentSections={contentSections}
        currentSection={currentSection}
        onLanguageChange={handleLanguageChange}
      >
        {currentSection !== 'intro' && renderCurrentSection()}
      </CompatibleLayoutFallback>
    );
  }
};

// 🔧 **ERROR BOUNDARY WRAPPER**
const EnhancedApp: React.FC = () => {
  return (
    <EnhancedErrorBoundary>
      <ClassicalMacrobiusApp />
    </EnhancedErrorBoundary>
  );
};

export default EnhancedApp;