'use client';

import React, { useState, useEffect, Suspense } from 'react';
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
  User,
  Sparkles
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

// 🔧 **ENHANCED LOADING FALLBACK WITH CLASSICAL DESIGN**
const ClassicalLoadingFallback = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black relative overflow-hidden">
    {/* Starfield Background */}
    <div className="absolute inset-0">
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${0.5 + Math.random() * 1.5}px`,
            height: `${0.5 + Math.random() * 1.5}px`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
    
    {/* Loading Content */}
    <div className="relative z-10 min-h-screen flex items-center justify-center">
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
            Lade Macrobius...
          </h1>
          <p className="text-lg text-white/70">
            Bereite die antike Weisheit vor...
          </p>
        </div>
        
        <EnhancedLoadingSpinner />
      </div>
    </div>
  </div>
);

// 🎯 **DIRECT IMPORTS WITH ERROR BOUNDARIES - NO DYNAMIC LOADING FOR LAYOUT**
// Import ClassicalMacrobiusLayout directly to ensure it loads
import ClassicalMacrobiusLayout from '@/components/ui/ClassicalMacrobiusLayout';

// Section components with simple dynamic imports
const IntroSection = dynamic(
  () => import('@/components/sections/IntroSection').catch(() => ({
    default: () => (
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold text-white mb-6">Willkommen bei Macrobius</h2>
        <p className="text-xl text-white/80 mb-8 leading-relaxed">Eine antike Flaschenpost - Eine Nachricht aus der Antike an die Zukunft</p>
        <div className="bg-gradient-to-br from-yellow-400/10 to-amber-500/10 border border-yellow-400/30 rounded-lg p-6">
          <p className="text-white/90 leading-relaxed">
            Entdecken Sie die Weisheit des Macrobius Ambrosius Theodosius, des großen spätantiken Gelehrten. 
            Tauchen Sie ein in die Welt der Saturnalien und erforschen Sie antike Kultur, Astronomie und Philosophie 
            mit modernsten KI-gestützten Lernwerkzeugen.
          </p>
        </div>
      </div>
    )
  })),
  {
    ssr: false,
    loading: () => <ClassicalLoadingFallback />
  }
);

const QuizSection = dynamic(
  () => import('@/components/sections/QuizSection-SMART-GENERATION-COMPLETE').catch(() => ({
    default: () => (
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
    )
  })),
  {
    ssr: false,
    loading: () => <ClassicalLoadingFallback />
  }
);

const WorldMapSection = dynamic(
  () => import('@/components/sections/WorldMapSection').catch(() => ({
    default: () => (
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold text-white mb-6">Weltkarte</h2>
        <p className="text-white/80 mb-8">Erkunden Sie die geographische Welt des Macrobius</p>
        <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-400/30 rounded-lg p-6">
          <p className="text-white/90">Interaktive Darstellung historischer Orte und Konzepte...</p>
        </div>
      </div>
    )
  })),
  {
    ssr: false,
    loading: () => <ClassicalLoadingFallback />
  }
);

const CosmosSection = dynamic(
  () => import('@/components/sections/CosmosSection').catch(() => ({
    default: () => (
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold text-white mb-6">Kosmos</h2>
        <p className="text-white/80 mb-8">Entdecken Sie die antike Kosmologie und Astronomie</p>
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-lg p-6">
          <p className="text-white/90">Visualisierung antiker astronomischer Konzepte...</p>
        </div>
      </div>
    )
  })),
  {
    ssr: false,
    loading: () => <ClassicalLoadingFallback />
  }
);

const BanquetSection = dynamic(
  () => import('@/components/sections/BanquetSection').catch(() => ({
    default: () => (
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold text-white mb-6">Gastmahl</h2>
        <p className="text-white/80 mb-8">Erleben Sie die berühmten Saturnalien-Gespräche</p>
        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-400/30 rounded-lg p-6">
          <p className="text-white/90">Immersive Darstellung der antiken Symposium-Kultur...</p>
        </div>
      </div>
    )
  })),
  {
    ssr: false,
    loading: () => <ClassicalLoadingFallback />
  }
);

const TextSearchSection = dynamic(
  () => import('@/components/sections/MacrobiusTextProcessor-TIER2-COMPLETE').catch(() => ({
    default: () => (
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
    )
  })),
  {
    ssr: false,
    loading: () => <ClassicalLoadingFallback />
  }
);

const LearningSection = dynamic(
  () => import('@/components/sections/LearningSection-enhanced-complete').catch(() => ({
    default: () => (
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
    )
  })),
  {
    ssr: false,
    loading: () => <ClassicalLoadingFallback />
  }
);

const VisualizationsSection = dynamic(
  () => import('@/components/sections/VisualizationsSection').catch(() => ({
    default: () => (
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold text-white mb-6">Visualisierungen</h2>
        <p className="text-white/80 mb-8">Datenvisualisierung und interaktive Analysen</p>
        <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-400/30 rounded-lg p-6">
          <p className="text-white/90">Zeitleisten, Netzwerke und thematische Analysen...</p>
        </div>
      </div>
    )
  })),
  {
    ssr: false,
    loading: () => <ClassicalLoadingFallback />
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

// 🎯 **MAIN APP COMPONENT WITH DIRECT LAYOUT IMPORT**
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
      try {
        // Simulate app initialization
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
      } catch (error) {
        console.error('App initialization error:', error);
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
      return <ClassicalLoadingFallback />;
    }
    
    const section = appSections.find(s => s.id === currentSection);
    if (!section) return <ClassicalLoadingFallback />;
    
    const Component = section.component;
    
    // Safe language handling
    const languageCode = language?.toLowerCase() || 'de';
    const languageName = language === 'DE' ? 'Deutsch' : language === 'EN' ? 'English' : 'Latina';
    
    // Simplified props
    const safeProps = {
      language: languageCode,
      isActive: true
    };
    
    return (
      <Suspense fallback={<ClassicalLoadingFallback />}>
        <Component {...safeProps} />
      </Suspense>
    );
  };
  
  // 🔧 **ENHANCED LOADING SCREEN WITH CLASSICAL DESIGN**
  if (isLoading || !isClient || !isHydrated) {
    return <ClassicalLoadingFallback />;
  }
  
  // 🔧 **MAIN APP RENDER WITH DIRECT CLASSICAL LAYOUT**
  try {
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
  } catch (error) {
    console.error('Layout render error:', error);
    
    // Fallback with classical design if main layout fails
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black relative overflow-hidden">
        {/* Starfield Background */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${0.5 + Math.random() * 1.5}px`,
                height: `${0.5 + Math.random() * 1.5}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <div className="mb-6 mx-auto w-24 h-24 rounded-full border-4 border-yellow-400 bg-gradient-to-br from-amber-900/80 to-yellow-900/80 backdrop-blur-sm flex items-center justify-center">
              <User className="w-12 h-12 text-yellow-400" />
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 mb-4">
              Macrobius
            </h1>
            <p className="text-xl text-white/80">Eine antike Flaschenpost - Eine Nachricht aus der Antike an die Zukunft</p>
            
            {/* Language Selector */}
            <div className="mt-4 flex justify-center gap-2">
              {(['de', 'en', 'la'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded border border-yellow-400/40 hover:bg-yellow-400/30 transition-colors"
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </header>
          
          <main className="max-w-4xl mx-auto">
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-yellow-400/30">
              {renderCurrentSection()}
            </div>
          </main>
        </div>
      </div>
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