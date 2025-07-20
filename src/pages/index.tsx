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

// 🎯 **UNIFIED PROP INTERFACES**
interface UnifiedComponentProps {
  language?: any;
  vocabularyData?: any;
  userProfile?: any;
  isActive?: boolean;
}

// 🔧 **LOADING FALLBACK COMPONENT**
const LoadingFallback = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <EnhancedLoadingSpinner />
  </div>
);

// 🔧 **STATIC FALLBACK COMPONENTS FOR SSR SAFETY**
const createStaticFallback = (title: string, description: string, gradientClasses: string) => () => (
  <div className="text-center py-12">
    <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
    <p className="text-white/80 mb-8">{description}</p>
    <div className={cn("border border-opacity-30 rounded-lg p-6", gradientClasses)}>
      <p className="text-white/90">Lade erweiterte Funktionen...</p>
      <div className="mt-4 flex justify-center">
        <EnhancedLoadingSpinner />
      </div>
    </div>
  </div>
);

// 🎯 **ALL DYNAMIC COMPONENTS WITH SSR DISABLED**
// Main layout component
const ClassicalMacrobiusLayout = dynamic(
  () => import('@/components/ui/ClassicalMacrobiusLayout'),
  {
    ssr: false,
    loading: LoadingFallback
  }
);

// Section components with fallbacks
const IntroSection = dynamic(
  () => import('@/components/sections/IntroSection'),
  {
    ssr: false,
    loading: LoadingFallback
  }
);

const QuizSection = dynamic(
  () => import('@/components/sections/QuizSection-SMART-GENERATION-COMPLETE')
    .catch(() => import('@/components/sections/QuizSection')),
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
  () => import('@/components/sections/MacrobiusTextProcessor-TIER2-COMPLETE')
    .catch(() => import('@/components/sections/TextSearchSection')),
  {
    ssr: false,
    loading: LoadingFallback
  }
);

const LearningSection = dynamic(
  () => import('@/components/sections/LearningSection-enhanced-complete')
    .catch(() => import('@/components/sections/LearningSection')),
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
    component: IntroSection
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
    component: QuizSection
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
    component: WorldMapSection
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
    component: CosmosSection
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
    component: BanquetSection
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
    component: TextSearchSection
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
    component: LearningSection
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
    component: VisualizationsSection
  }
];

// 🎯 **MAIN APP COMPONENT WITH SSR SAFETY**
const ClassicalMacrobiusApp: React.FC = () => {
  // State Management with SSR-safe defaults
  const [currentSection, setCurrentSection] = useState('intro');
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  // Safe language hook usage
  const { language, setLanguage, isHydrated } = useLanguage();
  
  // 🔧 **CLIENT-SIDE INITIALIZATION**
  useEffect(() => {
    setIsClient(true);
    const initializeApp = async () => {
      // Simulate app initialization
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
    };
    
    initializeApp();
  }, []);
  
  // 🔧 **SAFE LANGUAGE CHANGE HANDLER**
  const handleLanguageChange = (lang: 'de' | 'en' | 'la') => {
    if (isClient && isHydrated) {
      const convertedLang = convertToLanguage(lang);
      setLanguage(convertedLang);
    }
  };
  
  // 🔧 **SSR-SAFE NAVIGATION ITEMS**
  const navigationItems = appSections.map(section => ({
    id: section.id,
    label: section.label,
    icon: section.icon,
    onClick: () => setCurrentSection(section.id),
    active: currentSection === section.id
  }));
  
  // 🔧 **SSR-SAFE CONTENT SECTIONS**
  const contentSections = appSections.map(section => ({
    id: section.id,
    title: section.label,
    description: section.description,
    icon: section.icon,
    onClick: () => setCurrentSection(section.id)
  }));
  
  // 🔧 **SAFE SECTION RENDERING**
  const renderCurrentSection = () => {
    if (!isClient || !isHydrated) {
      return <LoadingFallback />;
    }
    
    const section = appSections.find(s => s.id === currentSection);
    if (!section) return <LoadingFallback />;
    
    const Component = section.component;
    
    // Safe language handling
    const languageCode = language?.toLowerCase() || 'de';
    const languageName = language === 'DE' ? 'Deutsch' : language === 'EN' ? 'English' : 'Latina';
    
    // Unified props for all components
    const unifiedProps = {
      language: { code: languageCode, name: languageName },
      vocabularyData: null,
      userProfile: null,
      isActive: true
    };
    
    return <Component {...unifiedProps} />;
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
  
  // 🔧 **MAIN APP RENDER WITH SSR SAFETY**
  return (
    <ClassicalMacrobiusLayout
      navigationItems={navigationItems}
      contentSections={contentSections}
      currentSection={currentSection}
      onLanguageChange={handleLanguageChange}
    >
      {currentSection !== 'intro' && renderCurrentSection()}
    </ClassicalMacrobiusLayout>
  );
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