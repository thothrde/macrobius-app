'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

// Enhanced UI Components
import EnhancedCosmicBackground from '@/components/ui/EnhancedCosmicBackground';
import EnhancedClassicalLayout from '@/components/ui/EnhancedClassicalLayout';
import EnhancedClassicalNavigation from '@/components/ui/EnhancedClassicalNavigation';
import EnhancedClassicalCard from '@/components/ui/EnhancedClassicalCard';
import EnhancedClassicalButton from '@/components/ui/EnhancedClassicalButton';
import { EnhancedLoadingPage, EnhancedLoadingSpinner } from '@/components/ui/EnhancedLoadingStates';
import { EnhancedLazyComponent } from '@/components/ui/EnhancedPerformanceOptimizer';
import { EnhancedPWAInstall, EnhancedOfflineStatus, EnhancedSWUpdate } from '@/components/ui/EnhancedPWAFeatures';
import { EnhancedSkipLink, EnhancedAccessibilityPanel } from '@/components/ui/EnhancedAccessibility';
import { useEnhancedBreakpoint, EnhancedResponsiveContainer } from '@/components/ui/EnhancedResponsiveLayout';
import EnhancedErrorBoundary from '@/components/ui/EnhancedErrorBoundary';

// Section Components (Lazy Loaded)
const IntroSection = React.lazy(() => import('@/components/sections/IntroSection'));
const QuizSection = React.lazy(() => import('@/components/sections/QuizSection-SMART-GENERATION-COMPLETE'));
const WorldMapSection = React.lazy(() => import('@/components/sections/WorldMapSection'));
const CosmosSection = React.lazy(() => import('@/components/sections/CosmosSection'));
const BanquetSection = React.lazy(() => import('@/components/sections/BanquetSection'));
const TextSearchSection = React.lazy(() => import('@/components/sections/TextSearchSection'));
const LearningSection = React.lazy(() => import('@/components/sections/LearningSection-enhanced-complete'));
const VisualizationsSection = React.lazy(() => import('@/components/sections/VisualizationsSection'));
const AICulturalAnalysisSection = React.lazy(() => import('@/components/sections/AICulturalAnalysisSection'));
const AITutoringSystemSection = React.lazy(() => import('@/components/sections/AITutoringSystemSection-COMPLETE'));

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
  Brain,
  Bot,
  Sparkles,
  Eye,
  Languages,
  Settings,
  Menu
} from 'lucide-react';

// Enhanced Section Configuration
interface EnhancedSection {
  id: string;
  label: { de: string; en: string; la: string };
  icon: React.ReactNode;
  component: React.ComponentType;
  background?: 'cosmic' | 'nebula' | 'starfield' | 'minimal';
  priority?: boolean;
}

const enhancedSections: EnhancedSection[] = [
  {
    id: 'intro',
    label: { de: 'Einführung', en: 'Introduction', la: 'Introductio' },
    icon: <Home className="w-5 h-5" />,
    component: IntroSection,
    background: 'cosmic',
    priority: true
  },
  {
    id: 'quiz',
    label: { de: 'Quiz', en: 'Quiz', la: 'Quaestiones' },
    icon: <HelpCircle className="w-5 h-5" />,
    component: QuizSection,
    background: 'starfield'
  },
  {
    id: 'worldmap',
    label: { de: 'Weltkarte', en: 'World Map', la: 'Mappa Mundi' },
    icon: <Globe className="w-5 h-5" />,
    component: WorldMapSection,
    background: 'nebula'
  },
  {
    id: 'cosmos',
    label: { de: 'Kosmos', en: 'Cosmos', la: 'Kosmos' },
    icon: <Star className="w-5 h-5" />,
    component: CosmosSection,
    background: 'cosmic'
  },
  {
    id: 'banquet',
    label: { de: 'Gastmahl', en: 'Banquet', la: 'Convivium' },
    icon: <Users className="w-5 h-5" />,
    component: BanquetSection,
    background: 'starfield'
  },
  {
    id: 'search',
    label: { de: 'Textsuche', en: 'Text Search', la: 'Quaerere Textum' },
    icon: <Search className="w-5 h-5" />,
    component: TextSearchSection,
    background: 'minimal'
  },
  {
    id: 'learning',
    label: { de: 'Lernen', en: 'Learning', la: 'Discere' },
    icon: <GraduationCap className="w-5 h-5" />,
    component: LearningSection,
    background: 'cosmic'
  },
  {
    id: 'visualizations',
    label: { de: 'Visualisierungen', en: 'Visualizations', la: 'Visualisationes' },
    icon: <BarChart3 className="w-5 h-5" />,
    component: VisualizationsSection,
    background: 'nebula'
  },
  {
    id: 'ai-analysis',
    label: { de: 'KI-Analyse', en: 'AI Analysis', la: 'Analysis AI' },
    icon: <Brain className="w-5 h-5" />,
    component: AICulturalAnalysisSection,
    background: 'cosmic'
  },
  {
    id: 'ai-tutor',
    label: { de: 'KI-Tutor', en: 'AI Tutor', la: 'Tutor AI' },
    icon: <Bot className="w-5 h-5" />,
    component: AITutoringSystemSection,
    background: 'starfield'
  }
];

// Enhanced Main App Component
const EnhancedMacrobiusApp: React.FC = () => {
  const { language, setLanguage, translations } = useLanguage();
  const { isMobile, isTablet } = useEnhancedBreakpoint();
  
  // State Management
  const [currentSection, setCurrentSection] = useState('intro');
  const [isLoading, setIsLoading] = useState(true);
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Enhanced Loading State
  useEffect(() => {
    const initializeApp = async () => {
      // Simulate app initialization
      await new Promise(resolve => setTimeout(resolve, 2000));
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
  
  // Add utility navigation items
  const utilityItems = [
    {
      id: 'language',
      label: { de: 'Sprache', en: 'Language', la: 'Lingua' },
      icon: <Languages className="w-5 h-5" />,
      children: [
        {
          id: 'lang-de',
          label: { de: 'Deutsch', en: 'German', la: 'Germanicus' },
          icon: <span className="text-lg">🇩🇪</span>,
          onClick: () => setLanguage('de')
        },
        {
          id: 'lang-en',
          label: { de: 'Englisch', en: 'English', la: 'Anglicus' },
          icon: <span className="text-lg">🇬🇧</span>,
          onClick: () => setLanguage('en')
        },
        {
          id: 'lang-la',
          label: { de: 'Latein', en: 'Latin', la: 'Latina' },
          icon: <span className="text-lg">🏛️</span>,
          onClick: () => setLanguage('la')
        }
      ]
    },
    {
      id: 'accessibility',
      label: { de: 'Barrierefreiheit', en: 'Accessibility', la: 'Accessibilitas' },
      icon: <Eye className="w-5 h-5" />,
      onClick: () => setShowAccessibilityPanel(true)
    }
  ];
  
  const allNavigationItems = [...navigationItems, ...utilityItems];
  
  // Enhanced Section Rendering
  const renderCurrentSection = () => {
    const section = enhancedSections.find(s => s.id === currentSection);
    if (!section) return null;
    
    const Component = section.component;
    
    return (
      <EnhancedLazyComponent
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <EnhancedLoadingSpinner variant="astrolabe" size="xl" />
          </div>
        }
        threshold={0.1}
        rootMargin="50px"
      >
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <EnhancedLoadingSpinner variant="cosmic" size="xl" />
          </div>
        }>
          <Component />
        </Suspense>
      </EnhancedLazyComponent>
    );
  };
  
  // Enhanced Loading Screen
  if (isLoading) {
    return (
      <EnhancedLoadingPage
        title={language === 'de' ? 'Lade Macrobius...' : language === 'en' ? 'Loading Macrobius...' : 'Macrobius Carrico...'}
        subtitle={language === 'de' ? 'Bereite die antike Weisheit vor...' : language === 'en' ? 'Preparing ancient wisdom...' : 'Sapientiam antiquam paro...'}
        variant="cosmic"
        showProgress={true}
        progress={100}
      />
    );
  }
  
  return (
    <EnhancedErrorBoundary
      variant="cosmic"
      showErrorDetails={process.env.NODE_ENV === 'development'}
      enableReporting={true}
    >
      <div className="min-h-screen macrobius-gradient-enhanced overflow-hidden">
        {/* Enhanced Skip Links */}
        <EnhancedSkipLink href={`#${currentSection}`}>
          {language === 'de' && 'Zum Hauptinhalt springen'}
          {language === 'en' && 'Skip to main content'}
          {language === 'la' && 'Ad contentum principale'}
        </EnhancedSkipLink>
        
        {/* Enhanced Cosmic Background */}
        <EnhancedCosmicBackground
          enableNebula={true}
          enableParticles={true}
          starDensity={isMobile ? 100 : 200}
        >
          {/* Enhanced Navigation */}
          <EnhancedClassicalNavigation
            items={allNavigationItems}
            currentSection={currentSection}
            onSectionChange={setCurrentSection}
            variant={isMobile ? 'horizontal' : 'horizontal'}
          />
          
          {/* Enhanced Main Content */}
          <main 
            id={currentSection}
            className="relative z-10 pt-4"
            role="main"
            aria-live="polite"
          >
            <EnhancedResponsiveContainer size="2xl" padding={true}>
              {renderCurrentSection()}
            </EnhancedResponsiveContainer>
          </main>
          
          {/* Enhanced Floating Navigation for Mobile */}
          {isMobile && (
            <EnhancedClassicalNavigation
              items={navigationItems.slice(0, 5)}
              currentSection={currentSection}
              onSectionChange={setCurrentSection}
              variant="floating"
              compact
            />
          )}
        </EnhancedCosmicBackground>
        
        {/* Enhanced PWA Features */}
        <EnhancedPWAInstall
          onInstall={() => console.log('App installed')}
          onDismiss={() => console.log('Install dismissed')}
        />
        
        <EnhancedOfflineStatus />
        
        <EnhancedSWUpdate
          onUpdate={() => console.log('App updated')}
        />
        
        {/* Enhanced Accessibility Panel */}
        <EnhancedAccessibilityPanel
          isOpen={showAccessibilityPanel}
          onClose={() => setShowAccessibilityPanel(false)}
        />
        
        {/* Enhanced Bottom Branding (Mobile) */}
        {isMobile && (
          <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40">
            <EnhancedClassicalCard
              variant="cosmic"
              className="px-4 py-2 opacity-80"
            >
              <div className="flex items-center gap-2 text-sm">
                <Sparkles className="w-4 h-4 text-yellow-400 animate-shimmer-enhanced" />
                <span className="text-cosmic-enhanced font-semibold">
                  Macrobius
                </span>
              </div>
            </EnhancedClassicalCard>
          </div>
        )}
      </div>
    </EnhancedErrorBoundary>
  );
};

// Enhanced Error Boundary Wrapper
const EnhancedApp: React.FC = () => {
  return (
    <EnhancedErrorBoundary
      variant="cosmic"
      showErrorDetails={process.env.NODE_ENV === 'development'}
      enableReporting={true}
      onError={(error, errorInfo) => {
        console.error('App Error:', error, errorInfo);
        // Report to monitoring service
      }}
    >
      <EnhancedMacrobiusApp />
    </EnhancedErrorBoundary>
  );
};

export default EnhancedApp;