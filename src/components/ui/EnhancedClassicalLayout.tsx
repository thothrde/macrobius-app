'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import EnhancedCosmicBackground from './EnhancedCosmicBackground';
import EnhancedClassicalNavigation from './EnhancedClassicalNavigation';
import { 
  Home, 
  Globe, 
  Star, 
  Users, 
  Search, 
  GraduationCap, 
  BarChart3,
  Sparkles,
  ArrowUp
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import EnhancedClassicalButton from './EnhancedClassicalButton';

interface LayoutSection {
  id: string;
  label: { de: string; en: string; la: string };
  icon: ReactNode;
  component: ReactNode;
  background?: 'cosmic' | 'nebula' | 'starfield' | 'minimal';
}

interface EnhancedClassicalLayoutProps {
  children?: ReactNode;
  sections?: LayoutSection[];
  currentSection?: string;
  onSectionChange?: (sectionId: string) => void;
  showNavigation?: boolean;
  navigationVariant?: 'horizontal' | 'vertical' | 'floating';
  enableScrollToTop?: boolean;
  className?: string;
}

const EnhancedClassicalLayout: React.FC<EnhancedClassicalLayoutProps> = ({
  children,
  sections = [],
  currentSection,
  onSectionChange,
  showNavigation = true,
  navigationVariant = 'horizontal',
  enableScrollToTop = true,
  className
}) => {
  const { language } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [sectionProgress, setSectionProgress] = useState(0);
  
  // Enhanced scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      
      setShowScrollTop(scrollTop > 300);
      setSectionProgress(progress * 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Default navigation items
  const defaultNavigationItems = [
    {
      id: 'intro',
      label: { 
        de: 'Einführung', 
        en: 'Introduction', 
        la: 'Introductio' 
      },
      icon: <Home className="w-5 h-5" />,
      onClick: () => onSectionChange?.('intro')
    },
    {
      id: 'worldmap',
      label: { 
        de: 'Weltkarte', 
        en: 'World Map', 
        la: 'Mappa Mundi' 
      },
      icon: <Globe className="w-5 h-5" />,
      onClick: () => onSectionChange?.('worldmap')
    },
    {
      id: 'cosmos',
      label: { 
        de: 'Kosmos', 
        en: 'Cosmos', 
        la: 'Kosmos' 
      },
      icon: <Star className="w-5 h-5" />,
      onClick: () => onSectionChange?.('cosmos')
    },
    {
      id: 'banquet',
      label: { 
        de: 'Gastmahl', 
        en: 'Banquet', 
        la: 'Convivium' 
      },
      icon: <Users className="w-5 h-5" />,
      onClick: () => onSectionChange?.('banquet')
    },
    {
      id: 'search',
      label: { 
        de: 'Textsuche', 
        en: 'Text Search', 
        la: 'Quaerere Textum' 
      },
      icon: <Search className="w-5 h-5" />,
      onClick: () => onSectionChange?.('search')
    },
    {
      id: 'learning',
      label: { 
        de: 'Lernen', 
        en: 'Learning', 
        la: 'Discere' 
      },
      icon: <GraduationCap className="w-5 h-5" />,
      onClick: () => onSectionChange?.('learning')
    },
    {
      id: 'visualizations',
      label: { 
        de: 'Visualisierungen', 
        en: 'Visualizations', 
        la: 'Visualisationes' 
      },
      icon: <BarChart3 className="w-5 h-5" />,
      onClick: () => onSectionChange?.('visualizations')
    }
  ];
  
  // Enhanced section rendering
  const renderSection = (section: LayoutSection) => {
    const backgroundMap = {
      cosmic: { enableNebula: true, enableParticles: true, starDensity: 200 },
      nebula: { enableNebula: true, enableParticles: false, starDensity: 100 },
      starfield: { enableNebula: false, enableParticles: true, starDensity: 300 },
      minimal: { enableNebula: false, enableParticles: true, starDensity: 50 }
    };
    
    const bgProps = backgroundMap[section.background || 'cosmic'];
    
    return (
      <section
        key={section.id}
        id={section.id}
        className="min-h-screen relative"
      >
        <EnhancedCosmicBackground
          enableNebula={bgProps.enableNebula}
          enableParticles={bgProps.enableParticles}
          starDensity={bgProps.starDensity}
          className="absolute inset-0"
        />
        
        <div className="relative z-10 container mx-auto px-4 py-12">
          {section.component}
        </div>
      </section>
    );
  };
  
  return (
    <div className={cn("relative min-h-screen", className)}>
      {/* Enhanced Cosmic Background */}
      <EnhancedCosmicBackground
        enableNebula={true}
        enableParticles={true}
        starDensity={150}
      >
        {/* Navigation */}
        {showNavigation && (
          <EnhancedClassicalNavigation
            items={defaultNavigationItems}
            currentSection={currentSection}
            onSectionChange={onSectionChange}
            variant={navigationVariant}
          />
        )}
        
        {/* Progress Indicator */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <div 
            className="h-1 bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-300"
            style={{ width: `${sectionProgress}%` }}
          />
          <div className="absolute inset-0 h-1 bg-gradient-to-r from-yellow-400/20 to-amber-500/20" />
        </div>
        
        {/* Main Content */}
        <main className="relative z-10">
          {/* Render sections if provided */}
          {sections.length > 0 ? (
            sections.map(renderSection)
          ) : (
            /* Render children if no sections */
            <div className="container mx-auto px-4 py-12">
              {children}
            </div>
          )}
        </main>
        
        {/* Enhanced Footer */}
        <footer className="relative z-10 border-t border-yellow-400/30 bg-black/20 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Brand Column */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Sparkles className="w-8 h-8 text-yellow-400 animate-shimmer-enhanced" />
                    <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-sm animate-cosmic-pulse-enhanced" />
                  </div>
                  <span className="text-2xl font-bold text-cosmic-enhanced">
                    Macrobius
                  </span>
                </div>
                <p className="text-white/70 leading-relaxed">
                  {language === 'DE' && 'Eine antike Flaschenpost - Eine Nachricht aus der Antike an die Zukunft'}
                  {language === 'EN' && 'An Ancient Message in a Bottle - A Message from Antiquity to the Future'}
                  {language === 'LA' && 'Antiqua Epistula in Vitro - Nuntius ab Antiquitate ad Futurum'}
                </p>
              </div>
              
              {/* Links Column */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-yellow-400">
                  {language === 'DE' && 'Entdecken'}
                  {language === 'EN' && 'Explore'}
                  {language === 'LA' && 'Explorare'}
                </h3>
                <div className="space-y-2">
                  {defaultNavigationItems.slice(0, 4).map((item) => (
                    <button
                      key={item.id}
                      onClick={item.onClick}
                      className="block text-white/70 hover:text-yellow-400 transition-colors duration-300"
                    >
                      {item.label[language.toLowerCase() as 'de' | 'en' | 'la']}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Features Column */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-yellow-400">
                  {language === 'DE' && 'Funktionen'}
                  {language === 'EN' && 'Features'}
                  {language === 'LA' && 'Functiones'}
                </h3>
                <div className="space-y-2">
                  {defaultNavigationItems.slice(4).map((item) => (
                    <button
                      key={item.id}
                      onClick={item.onClick}
                      className="block text-white/70 hover:text-yellow-400 transition-colors duration-300"
                    >
                      {item.label[language.toLowerCase() as 'de' | 'en' | 'la']}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Copyright */}
            <div className="mt-8 pt-8 border-t border-yellow-400/20 text-center text-white/60">
              <p>
                {language === 'DE' && '© 2025 Macrobius App - Klassische Bildung für die moderne Welt'}
                {language === 'EN' && '© 2025 Macrobius App - Classical Education for the Modern World'}
                {language === 'LA' && '© 2025 Macrobius App - Educatio Classica pro Mundo Moderno'}
              </p>
            </div>
          </div>
        </footer>
        
        {/* Enhanced Scroll to Top */}
        {enableScrollToTop && showScrollTop && (
          <EnhancedClassicalButton
            variant="cosmic"
            size="md"
            onClick={scrollToTop}
            icon={<ArrowUp className="w-5 h-5" />}
            glow
            pulse
            className="fixed bottom-6 right-6 z-50 animate-fade-in-enhanced"
          >
            {language === 'DE' && 'Nach oben'}
            {language === 'EN' && 'To Top'}
            {language === 'LA' && 'Sursum'}
          </EnhancedClassicalButton>
        )}
        
        {/* Floating Action Buttons (Mobile) */}
        {navigationVariant === 'floating' && (
          <div className="lg:hidden">
            <EnhancedClassicalNavigation
              items={defaultNavigationItems.slice(0, 5)}
              currentSection={currentSection}
              onSectionChange={onSectionChange}
              variant="floating"
              compact
            />
          </div>
        )}
      </EnhancedCosmicBackground>
    </div>
  );
};

export default EnhancedClassicalLayout;