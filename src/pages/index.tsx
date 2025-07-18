/**
 * 🏛️ MACROBIUS - DRAMATIC CLASSICAL TRANSFORMATION
 * ✅ PRESERVED: All working translations, real AI systems, error boundaries
 * 🎨 REVOLUTIONARY: Bold visual overhaul with dramatic classical impact
 * 🌌 CINEMATIC: 100+ stars, atmospheric depth, dramatic lighting
 * 🔥 BOLD: Multiple concentric frames, rich gradients, gold typography
 */

import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, Eye, Maximize, AlertTriangle, RefreshCw, X, Sparkles, Crown, Star } from 'lucide-react';
import Image from 'next/image';
import { ErrorBoundary } from 'react-error-boundary';

// Enhanced Image System
import ImageModal from '../components/ui/ImageModal';
import { getImagesBySection, ImageInfo } from '../data/imageData';

// Oracle Cloud-integrated components - ENHANCED VERSIONS
import CosmosSection from '../components/sections/CosmosSection';
import TextSearchSection from '../components/sections/TextSearchSection';  
import VisualizationsSection from '../components/sections/VisualizationsSection';
import BanquetSection from '../components/sections/BanquetSection';
import WorldMapSection from '../components/sections/WorldMapSection';
import LearningSection from '../components/sections/LearningSection-enhanced-complete';

// ✅ TIER-COMPLETE: Advanced AI Systems Components (COMPLETE VERSIONS)
import AICulturalAnalysisSection from '../components/sections/AICulturalAnalysisSection';
import PersonalizedLearningPathsComplete from '../components/sections/PersonalizedLearningPaths-COMPLETE';
import AITutoringSystemComplete from '../components/sections/AITutoringSystemSection-COMPLETE';
import KIRAGAssistentSection from '../components/sections/KIRAGAssistentSection';
import QuizSectionComplete from '../components/sections/QuizSection-SMART-GENERATION-COMPLETE';
import VocabularyTrainerComplete from '../components/sections/VocabularyTrainer-CORPUS-EXPANSION-COMPLETE';
import GrammarExplainerComplete from '../components/sections/GrammarExplainer-TIER1-COMPLETE';
import MacrobiusTextProcessorComplete from '../components/sections/MacrobiusTextProcessor-TIER2-COMPLETE';

// ✨ NEW TIER3 COMPONENTS: Advanced Educational and Research Platforms
import MacrobiusProgressiveReadingTIER3Complete from '../components/sections/MacrobiusProgressiveReading-TIER3-COMPLETE';
import MacrobiusResearchToolsTIER3Complete from '../components/sections/MacrobiusResearchTools-TIER3-COMPLETE';

// Language Context
import { useLanguage, Language, getTranslation } from '../contexts/LanguageContext';

// Component Error Fallback
function ComponentErrorFallback({ error, resetErrorBoundary, componentName }: { 
  error: Error; 
  resetErrorBoundary: () => void; 
  componentName: string;
}) {
  return (
    <div className="min-h-[400px] flex items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-red-800/10 to-red-900/20 backdrop-blur-xl border border-red-500/20 rounded-2xl" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent animate-pulse" />
      
      <div className="relative text-center text-white p-8 z-10">
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-6 drop-shadow-lg" />
        </motion.div>
        
        <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
          Component Error: {componentName}
        </h3>
        <p className="text-red-200/80 mb-6 text-lg leading-relaxed max-w-md mx-auto">
          This component encountered an issue. Using sophisticated fallback display.
        </p>
        
        <motion.button 
          onClick={resetErrorBoundary}
          className="group relative px-8 py-4 bg-gradient-to-r from-red-600/80 via-red-500/80 to-red-600/80 backdrop-blur-sm hover:from-red-500/90 hover:to-red-600/90 text-white rounded-2xl transition-all duration-500 flex items-center mx-auto shadow-2xl border border-red-400/30"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-orange-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <RefreshCw className="w-5 h-5 mr-3 group-hover:rotate-180 transition-transform duration-500" />
          <span className="font-semibold text-lg">Retry Component</span>
        </motion.button>
      </div>
    </div>
  );
}

// Main Application Component
export default function MacrobiusCulturalApp() {
  // Language context
  const { language: currentLang, setLanguage, t, isHydrated } = useLanguage();
  
  // Navigation state 
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [componentErrors, setComponentErrors] = useState<Record<string, boolean>>({});
  
  // Enhanced visual states
  const [astrolabeRotation, setAstrolabeRotation] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Modal states
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showPontanusModal, setShowPontanusModal] = useState(false);
  const [showRomeModal, setShowRomeModal] = useState(false);
  
  // Image modal state
  const [selectedImage, setSelectedImage] = useState<ImageInfo | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);

  // Client-side mounting check
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Mouse tracking for enhanced effects (client-side only)
  useEffect(() => {
    if (!isClient) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isClient]);

  // Safe translation function
  const safeT = useCallback((key: string): string => {
    if (!isHydrated) {
      return getTranslation(key, currentLang);
    }
    return t(key);
  }, [t, isHydrated, currentLang]);

  // Type adapter for components
  const tAdapter = useCallback((key: string): string => {
    return safeT(key);
  }, [safeT]);

  // Enhanced event handlers
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setAstrolabeRotation(prev => prev + 45);
  };

  const handleImageClick = useCallback((imageInfo: ImageInfo) => {
    setSelectedImage(imageInfo);
    setShowImageModal(true);
  }, []);

  const handleImageModalClose = useCallback(() => {
    setShowImageModal(false);
    setTimeout(() => {
      setSelectedImage(null);
    }, 300);
  }, []);

  // Safe component renderer with error boundaries
  const renderSectionWithErrorBoundary = (sectionId: string, SectionComponent: React.ComponentType<any>, props: any = {}) => {
    return (
      <ErrorBoundary
        FallbackComponent={(errorProps) => (
          <ComponentErrorFallback {...errorProps} componentName={sectionId} />
        )}
        onError={(error) => {
          console.error(`Section ${sectionId} failed:`, error);
          setComponentErrors(prev => ({ ...prev, [sectionId]: true }));
        }}
      >
        <SectionComponent {...props} />
      </ErrorBoundary>
    );
  };

  // Get safe window width for animations
  const getWindowWidth = () => {
    if (!isClient || typeof window === 'undefined') return 1200; // fallback for SSR
    return window.innerWidth;
  };

  return (
    <>
      <Head>
        <title>Macrobius - Eine antike Flaschenpost</title>
        <meta name="description" content="Eine Nachricht aus der Antike an die Zukunft" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 🌌 DRAMATIC ATMOSPHERIC BACKGROUND - RICH DEEP SPACE */}
      <div className="min-h-screen relative overflow-hidden" style={{
        background: `
          radial-gradient(ellipse at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 40% 40%, rgba(251, 191, 36, 0.08) 0%, transparent 50%),
          linear-gradient(180deg, 
            #0a0d1f 0%, 
            #0f1525 10%,
            #1a1b3a 20%, 
            #16213e 35%, 
            #1a2845 50%, 
            #0f2027 65%, 
            #2c3e50 80%, 
            #1a252f 95%,
            #0a0d1f 100%
          )
        `
      }}>
        
        {/* ✨ CINEMATIC STARFIELD - 120+ STARS WITH DRAMATIC EFFECTS */}
        <div className="fixed inset-0 z-0">
          {/* Major Stars - Large and Brilliant */}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={`major-star-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                width: '4px',
                height: '4px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: '0 0 12px rgba(255, 255, 255, 0.9), 0 0 24px rgba(255, 255, 255, 0.6), 0 0 36px rgba(255, 255, 255, 0.3)'
              }}
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.8, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                ease: "easeInOut",
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            />
          ))}
          
          {/* Medium Stars - Classical Points */}
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={`medium-star-${i}`}
              className="absolute rounded-full"
              style={{
                width: '2.5px',
                height: '2.5px',
                background: i % 3 === 0 ? 'rgb(147, 197, 253)' : i % 3 === 1 ? 'rgb(196, 181, 253)' : 'rgb(253, 230, 138)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: '0 0 8px currentColor, 0 0 16px rgba(255, 255, 255, 0.4)'
              }}
              animate={{
                opacity: [0.4, 0.9, 0.4],
                scale: [0.8, 1.4, 0.8],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                ease: "easeInOut",
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
          
          {/* Small Stars - Ambient Twinkle */}
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={`small-star-${i}`}
              className="absolute rounded-full bg-blue-100"
              style={{
                width: '1.5px',
                height: '1.5px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: '0 0 4px rgba(191, 219, 254, 0.8)'
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [0.6, 1.2, 0.6],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                ease: "easeInOut",
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
          
          {/* Constellation Patterns - Connecting Lines */}
          {[...Array(8)].map((_, i) => {
            const x = 20 + Math.random() * 60;
            const y = 20 + Math.random() * 60;
            return (
              <motion.div
                key={`constellation-${i}`}
                className="absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: '80px',
                  height: '80px',
                }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 40 + i * 10,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                {/* Constellation stars */}
                {[...Array(4)].map((_, j) => (
                  <div
                    key={j}
                    className="absolute w-2 h-2 bg-cyan-200 rounded-full"
                    style={{
                      left: `${j * 25}%`,
                      top: `${j % 2 * 50}%`,
                      boxShadow: '0 0 6px rgba(165, 243, 252, 0.8)'
                    }}
                  />
                ))}
              </motion.div>
            );
          })}
          
          {/* 🌟 SHOOTING STARS - RIGHT TO LEFT CINEMATIC */}
          {isClient && [...Array(8)].map((_, i) => (
            <motion.div
              key={`shooting-star-${i}`}
              className="absolute h-0.5 bg-gradient-to-r from-cyan-300 via-white to-transparent rounded-full"
              style={{
                right: '-100px',
                top: `${5 + Math.random() * 90}%`,
                width: '60px',
                boxShadow: '0 0 15px rgba(147, 197, 253, 0.9), 0 0 30px rgba(147, 197, 253, 0.6)'
              }}
              animate={{
                x: [0, -(getWindowWidth() + 300)],
                opacity: [0, 0.9, 1, 0.9, 0],
                scaleX: [0.5, 1.5, 2, 1.5, 0.5]
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                ease: "easeOut",
                repeat: Infinity,
                delay: Math.random() * 30 + 5,
              }}
            />
          ))}
          
          {/* Nebula Effects - Atmospheric Clouds */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`nebula-${i}`}
              className="absolute rounded-full opacity-20"
              style={{
                width: `${200 + Math.random() * 300}px`,
                height: `${200 + Math.random() * 300}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, rgba(${
                  i % 3 === 0 ? '59, 130, 246' : i % 3 === 1 ? '147, 51, 234' : '251, 191, 36'
                }, 0.15) 0%, transparent 70%)`,
                filter: 'blur(40px)'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.25, 0.1],
                x: [0, 30, 0],
                y: [0, -20, 0]
              }}
              transition={{
                duration: 20 + Math.random() * 15,
                ease: "easeInOut",
                repeat: Infinity,
                delay: Math.random() * 10,
              }}
            />
          ))}
        </div>

        {/* 🏛️ ENHANCED ASTROLABIUM - MORE DRAMATIC */}
        <div className="fixed inset-0 z-1 flex items-center justify-center pointer-events-none">
          <motion.div 
            className="relative opacity-30"
            animate={{ 
              rotate: astrolabeRotation,
              scale: [1, 1.03, 1],
            }}
            transition={{ 
              rotate: { duration: 12, ease: "easeInOut" },
              scale: { duration: 30, ease: "easeInOut", repeat: Infinity }
            }}
          >
            <div className="w-[3000px] h-[3000px] relative">
              <Image 
                src="/Astrolab.jpg" 
                alt="Historical Astrolabe"
                width={3000}
                height={3000}
                className="w-full h-full object-contain"
                style={{
                  filter: 'hue-rotate(220deg) saturate(0.8) brightness(0.6) contrast(1.4) blur(0.3px)',
                  mixBlendMode: 'overlay'
                }}
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* 👑 ENHANCED CIRCULAR MACROBIUS - MORE DRAMATIC */}
        {activeSection === 'hero' && (
          <motion.div 
            className="fixed top-16 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
            animate={{ 
              y: [0, -20, 0],
              x: [0, -10, 10, 0],
              rotate: [0, 4, -4, 0]
            }}
            transition={{ 
              duration: 12,
              ease: "easeInOut", 
              repeat: Infinity 
            }}
          >
            {/* DRAMATIC multiple glow layers */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/40 to-orange-300/40 rounded-full blur-3xl scale-200 animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300/25 to-purple-300/25 rounded-full blur-2xl scale-175" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/15 to-teal-300/15 rounded-full blur-xl scale-150" />
            
            {/* ENHANCED CIRCULAR MACROBIUS */}
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-yellow-400/80 shadow-2xl bg-gradient-to-br from-yellow-400/30 to-orange-400/30 backdrop-blur-sm">
              <Image 
                src="/MacrobiusBottle.jpg" 
                alt="Macrobius with Bottle"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-yellow-400/20" />
              <div className="absolute inset-0 ring-2 ring-yellow-300/60 rounded-full" />
            </div>
            
            {/* ENHANCED orbiting effects with more particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`orbit-${i}`}
                className="absolute w-2 h-2 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transformOrigin: '0 0',
                  boxShadow: '0 0 8px currentColor, 0 0 16px rgba(251, 191, 36, 0.6)'
                }}
                animate={{
                  rotate: [0, 360],
                  x: [0, 110 * Math.cos(i * Math.PI / 4)],
                  y: [0, 110 * Math.sin(i * Math.PI / 4)],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 10 + i,
                  ease: "linear",
                  repeat: Infinity,
                  delay: i * 1.5
                }}
              />
            ))}
          </motion.div>
        )}

        {/* 🌍 ENHANCED LANGUAGE SELECTOR */}
        <motion.div 
          className="fixed top-8 right-8 z-50"
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/25 to-purple-500/25 rounded-xl blur-lg" />
            
            <div className="relative bg-white/12 backdrop-blur-3xl rounded-xl border-2 border-white/25 p-4 shadow-2xl">
              <div className="flex space-x-3">
                {(['DE', 'EN', 'LA'] as const).map((lang) => (
                  <motion.button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`relative px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 overflow-hidden ${
                      currentLang === lang
                        ? 'text-gray-900 shadow-xl'
                        : 'text-white/90 hover:text-white hover:bg-white/15'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {currentLang === lang && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400"
                        layoutId="languageBackground"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10 font-bold">{lang}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 📋 DRAMATICALLY ENHANCED NAVIGATION - ANCIENT MANUSCRIPT STYLE */}
        <motion.nav 
          className="fixed top-8 left-8 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto"
          onHoverStart={() => setIsNavHovered(true)}
          onHoverEnd={() => setIsNavHovered(false)}
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative">
            {/* DRAMATIC multiple glow layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-orange-500/15 to-red-500/10 rounded-2xl blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-blue-500/20 rounded-2xl blur-lg" />
            <div className={`absolute inset-0 bg-gradient-to-r from-yellow-400/15 to-orange-400/15 rounded-2xl transition-opacity duration-300 ${isNavHovered ? 'opacity-100' : 'opacity-0'}`} />
            
            <div className="relative bg-white/10 backdrop-blur-3xl rounded-2xl p-6 border-2 border-yellow-400/30 shadow-2xl min-w-[300px]" style={{
              boxShadow: '0 0 40px rgba(251, 191, 36, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}>
              {/* DRAMATIC classical header */}
              <div className="flex items-center justify-center mb-6">
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 10, repeat: Infinity }}
                >
                  <Crown className="w-8 h-8 text-yellow-400" style={{
                    filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))'
                  }} />
                </motion.div>
                <span className="ml-3 text-yellow-400 font-black text-lg tracking-wide" style={{
                  textShadow: '0 0 10px rgba(251, 191, 36, 0.8), 0 2px 4px rgba(0, 0, 0, 0.8)'
                }}>MACROBIUS</span>
              </div>
              
              <div className="space-y-3">
                {/* Core Sections - DRAMATICALLY Enhanced */}
                {[
                  { id: 'hero', text: safeT('nav.intro'), icon: '🏛️', gradient: 'from-amber-500 to-yellow-500' },
                  { id: 'quiz', text: safeT('nav.quiz'), icon: '📝', gradient: 'from-blue-500 to-cyan-500' },
                  { id: 'worldmap', text: safeT('nav.worldmap'), icon: '🗺️', gradient: 'from-green-500 to-emerald-500' },
                  { id: 'cosmos', text: safeT('nav.cosmos'), icon: '🌌', gradient: 'from-purple-500 to-violet-500' },
                  { id: 'banquet', text: safeT('nav.banquet'), icon: '🍷', gradient: 'from-red-500 to-rose-500' },
                  { id: 'search', text: safeT('nav.textsearch'), icon: '🔍', gradient: 'from-indigo-500 to-purple-500' },
                  { id: 'learning', text: safeT('nav.learning'), icon: '📚', gradient: 'from-orange-500 to-amber-500' },
                  { id: 'visualizations', text: safeT('nav.visualizations'), icon: '📊', gradient: 'from-pink-500 to-rose-500' }
                ].map((section, index) => (
                  <motion.button
                    key={section.id}
                    onClick={() => handleSectionChange(section.id)}
                    className={`group relative w-full px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-300 text-left flex items-center space-x-3 overflow-hidden ${
                      activeSection === section.id ? 'shadow-2xl' : 'hover:bg-white/8'
                    }`}
                    whileHover={{ scale: 1.02, x: 6 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    style={{
                      border: activeSection === section.id ? '1px solid rgba(251, 191, 36, 0.3)' : '1px solid transparent'
                    }}
                  >
                    {activeSection === section.id && (
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${section.gradient} opacity-90`}
                        layoutId="navBackground"
                        transition={{ type: "spring", duration: 0.6 }}
                      />
                    )}
                    
                    <span className="relative z-10 text-xl" style={{
                      filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))'
                    }}>{section.icon}</span>
                    <span className={`relative z-10 flex-1 text-sm font-bold ${
                      activeSection === section.id ? 'text-white' : 'text-white/90 group-hover:text-white'
                    }`} style={{
                      textShadow: activeSection === section.id ? '0 1px 2px rgba(0, 0, 0, 0.8)' : 'none'
                    }}>
                      {section.text}
                    </span>
                    
                    {componentErrors[section.id] && (
                      <AlertTriangle className="relative z-10 w-4 h-4 text-red-400" />
                    )}
                  </motion.button>
                ))}
                
                {/* AI Systems Section - DRAMATICALLY Enhanced */}
                <div className="border-t-2 border-yellow-400/20 pt-5 mt-5">
                  <div className="flex items-center space-x-2 mb-5">
                    <Star className="w-6 h-6 text-blue-400" style={{
                      filter: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.8))'
                    }} />
                    <p className="text-blue-200/95 text-sm uppercase tracking-wider font-black">
                      AI SYSTEMS
                    </p>
                    <span className="text-green-400 text-xs font-bold bg-green-400/20 px-2 py-1 rounded border border-green-400/50">
                      COMPLETE
                    </span>
                  </div>
                  
                  {[
                    { id: 'ai-cultural', text: safeT('nav.ai_cultural'), icon: '🧠', tier: 'ORACLE' },
                    { id: 'ai-learning', text: safeT('nav.ai_learning'), icon: '🎯', tier: 'COMPLETE' },
                    { id: 'ai-tutoring', text: safeT('nav.ai_tutoring'), icon: '📖', tier: 'COMPLETE' },
                    { id: 'ai-rag-assistant', text: safeT('nav.ai_rag'), icon: '🤖', tier: 'ENHANCED' },
                    { id: 'vocabulary-trainer', text: 'Vokabeltrainer', icon: '📝', tier: 'CORPUS' },
                    { id: 'grammar-explainer', text: 'Grammatik', icon: '📖', tier: 'TIER1' },
                    { id: 'text-processor', text: 'Textprozessor', icon: '🔍', tier: 'TIER2' }
                  ].map((section, index) => (
                    <motion.button
                      key={section.id}
                      onClick={() => handleSectionChange(section.id)}
                      className={`group relative w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 text-left flex items-center space-x-3 mb-2 overflow-hidden ${
                        activeSection === section.id ? 'bg-blue-500/30 shadow-lg border border-blue-400/40' : 'hover:bg-white/8'
                      }`}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-base" style={{
                        filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.6))'
                      }}>{section.icon}</span>
                      <span className={`flex-1 text-sm font-semibold ${
                        activeSection === section.id ? 'text-blue-100' : 'text-blue-200/90 group-hover:text-blue-200'
                      }`}>
                        {section.text}
                      </span>
                      <span className="text-green-400 text-xs font-bold bg-green-400/20 px-2 py-1 rounded border border-green-400/50">
                        {section.tier}
                      </span>
                    </motion.button>
                  ))}
                </div>
                
                {/* TIER3 Platform Section - DRAMATICALLY Enhanced */}
                <div className="border-t-2 border-purple-400/20 pt-5 mt-5">
                  <div className="flex items-center space-x-2 mb-5">
                    <Crown className="w-6 h-6 text-purple-400" style={{
                      filter: 'drop-shadow(0 0 6px rgba(147, 51, 234, 0.8))'
                    }} />
                    <p className="text-purple-200/95 text-sm uppercase tracking-wider font-black">
                      TIER3
                    </p>
                  </div>
                  
                  {[
                    { id: 'progressive-reading', text: 'Progressives Lesen', icon: '📚', tier: 'TIER3' },
                    { id: 'research-tools', text: 'Forschungstools', icon: '🔬', tier: 'TIER3' }
                  ].map((section, index) => (
                    <motion.button
                      key={section.id}
                      onClick={() => handleSectionChange(section.id)}
                      className={`group relative w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 text-left flex items-center space-x-3 mb-2 overflow-hidden ${
                        activeSection === section.id ? 'bg-purple-500/30 shadow-lg border border-purple-400/40' : 'hover:bg-white/8'
                      }`}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-base" style={{
                        filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.6))'
                      }}>{section.icon}</span>
                      <span className={`flex-1 text-sm font-semibold ${
                        activeSection === section.id ? 'text-purple-100' : 'text-purple-200/90 group-hover:text-purple-200'
                      }`}>
                        {section.text}
                      </span>
                      <span className="text-purple-400 text-xs font-bold bg-purple-400/20 px-2 py-1 rounded border border-purple-400/50">
                        {section.tier}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Oracle Cloud Status - DRAMATICALLY Enhanced */}
              <motion.div 
                className="mt-6 pt-6 border-t-2 border-green-400/20"
                animate={{ 
                  boxShadow: [
                    '0 0 25px rgba(34, 197, 94, 0.2)',
                    '0 0 40px rgba(34, 197, 94, 0.5)',
                    '0 0 25px rgba(34, 197, 94, 0.2)'
                  ]
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <div className="bg-green-500/20 border-2 border-green-400/50 rounded-xl p-5" style={{
                  boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)'
                }}>
                  <div className="flex items-center space-x-3 mb-3">
                    <motion.div 
                      className="w-3 h-3 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.4, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{
                        boxShadow: '0 0 8px rgba(34, 197, 94, 0.8)'
                      }}
                    />
                    <span className="text-white font-bold text-sm">Oracle Cloud</span>
                    <span className="text-green-400 font-bold text-xs bg-green-400/20 px-2 py-1 rounded border border-green-400/50">
                      COMPLETE
                    </span>
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed font-medium">
                    {safeT('nav.oracle_status')}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.nav>

        {/* 🎯 MAIN CONTENT */}
        <main className="relative z-10">
          {/* 🏛️ DRAMATICALLY ENHANCED HERO SECTION - MULTIPLE CONCENTRIC FRAMES */}
          {activeSection === 'hero' && (
            <motion.section 
              className="min-h-screen flex items-center justify-center px-8"
              style={{ paddingTop: '180px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              {/* 🎪 DRAMATIC MULTIPLE CONCENTRIC CIRCULAR FRAMES */}
              <div className="relative max-w-6xl mx-auto">
                {/* OUTERMOST DRAMATIC FRAME */}
                <div className="relative">
                  {/* MULTIPLE DRAMATIC GLOW RINGS */}
                  <div className="absolute inset-0 rounded-full border-4 border-yellow-400/60 blur-sm scale-105" style={{
                    boxShadow: '0 0 40px rgba(251, 191, 36, 0.6)'
                  }} />
                  <div className="absolute inset-0 rounded-full border-3 border-yellow-300/40 blur-md scale-110" style={{
                    boxShadow: '0 0 60px rgba(251, 191, 36, 0.4)'
                  }} />
                  <div className="absolute inset-0 rounded-full border-2 border-blue-300/30 blur-lg scale-115" style={{
                    boxShadow: '0 0 80px rgba(59, 130, 246, 0.3)'
                  }} />
                  <div className="absolute inset-0 rounded-full border border-purple-300/20 blur-xl scale-120" style={{
                    boxShadow: '0 0 100px rgba(147, 51, 234, 0.2)'
                  }} />
                  
                  {/* MAIN DRAMATIC CIRCULAR FRAME */}
                  <div className="relative bg-white/12 backdrop-blur-3xl rounded-full p-16 border-4 border-yellow-400/70 shadow-2xl" style={{
                    boxShadow: '0 0 60px rgba(251, 191, 36, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.2)'
                  }}>
                    {/* INNER DECORATIVE RING */}
                    <div className="absolute inset-8 rounded-full border-2 border-yellow-300/50 opacity-60" />
                    
                    {/* DRAMATIC TITLE SECTION */}
                    <motion.div 
                      className="text-center mb-12"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.5, delay: 0.3 }}
                    >
                      <motion.h1 
                        className="text-7xl md:text-9xl font-black mb-8 tracking-tight"
                        style={{
                          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 20%, #FF8C00 40%, #FF6347 60%, #DC143C 80%, #B22222 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          textShadow: '0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 165, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.8)',
                          filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))'
                        }}
                        animate={{
                          textShadow: [
                            '0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 165, 0, 0.4)',
                            '0 0 40px rgba(255, 215, 0, 0.8), 0 0 80px rgba(255, 165, 0, 0.6)',
                            '0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 165, 0, 0.4)'
                          ]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        Macrobius
                      </motion.h1>
                      
                      <motion.h2 
                        className="text-4xl md:text-5xl text-yellow-300 mb-6 font-light tracking-wide"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        style={{
                          textShadow: '0 0 15px rgba(253, 224, 71, 0.8), 0 2px 4px rgba(0, 0, 0, 0.8)'
                        }}
                      >
                        {safeT('hero.subtitle')}
                      </motion.h2>
                      
                      <motion.h3 
                        className="text-2xl md:text-3xl text-yellow-200/95 mb-8 font-medium max-w-4xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                        style={{
                          textShadow: '0 0 10px rgba(254, 240, 138, 0.6), 0 1px 2px rgba(0, 0, 0, 0.8)'
                        }}
                      >
                        {safeT('hero.description')}
                      </motion.h3>

                      {/* DRAMATICALLY ENHANCED TIER-COMPLETE Badge */}
                      <motion.div 
                        className="inline-flex items-center px-8 py-4 rounded-xl text-base font-bold mb-10"
                        style={{
                          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%)',
                          border: '2px solid rgba(34, 197, 94, 0.6)',
                          boxShadow: '0 0 25px rgba(34, 197, 94, 0.4)'
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 1, delay: 0.9 }}
                      >
                        <motion.div
                          className="w-3 h-3 bg-green-400 rounded-full mr-4"
                          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.7, 1] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          style={{
                            boxShadow: '0 0 10px rgba(34, 197, 94, 0.8)'
                          }}
                        />
                        <span className="text-green-300 text-lg font-bold" style={{
                          textShadow: '0 0 8px rgba(34, 197, 94, 0.6)'
                        }}>
                          TIER-COMPLETE - Advanced Components + Working Features
                        </span>
                      </motion.div>
                    </motion.div>

                    {/* 🖼️ DRAMATICALLY ENHANCED CENTRAL IMAGE GRID */}
                    <motion.div 
                      className="mb-12"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.5, delay: 1.1 }}
                    >
                      <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto">
                        {/* Rome Image - DRAMATICALLY Enhanced */}
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl border-2 border-yellow-400/30"
                          whileHover={{ scale: 1.05, y: -6 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowRomeModal(true)}
                          style={{
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(251, 191, 36, 0.3)'
                          }}
                        >
                          <Image
                            src="/Rome-under.jpg"
                            alt={safeT('image.rome.title')}
                            width={350}
                            height={240}
                            className="w-full h-40 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                              <h3 className="text-white font-bold text-base" style={{
                                textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
                              }}>{safeT('image.rome.title')}</h3>
                            </div>
                          </div>
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Maximize className="w-6 h-6 text-white" style={{
                              filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))'
                            }} />
                          </div>
                        </motion.div>
                        
                        {/* Tycho & Pontanus - DRAMATICALLY Enhanced */}
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl border-2 border-yellow-400/30"
                          whileHover={{ scale: 1.05, y: -6 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowPontanusModal(true)}
                          style={{
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(251, 191, 36, 0.3)'
                          }}
                        >
                          <Image
                            src="/TychoAssistent.jpg"
                            alt={safeT('image.tycho.title')}
                            width={350}
                            height={240}
                            className="w-full h-40 object-contain bg-gradient-to-br from-blue-50 to-purple-50 transition-all duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                              <h3 className="text-white font-bold text-base" style={{
                                textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
                              }}>{safeT('image.tycho.title')}</h3>
                            </div>
                          </div>
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Maximize className="w-6 h-6 text-white" style={{
                              filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))'
                            }} />
                          </div>
                        </motion.div>
                        
                        {/* Ancient Drawing - DRAMATICALLY Enhanced */}
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl border-2 border-yellow-400/30"
                          whileHover={{ scale: 1.05, y: -6 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowAboutModal(true)}
                          style={{
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(251, 191, 36, 0.3)'
                          }}
                        >
                          <Image
                            src="/MacrobiusBottle.jpg"
                            alt="Ancient Drawing"
                            width={350}
                            height={240}
                            className="w-full h-40 object-contain bg-gradient-to-br from-yellow-50 to-orange-50 transition-all duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                              <h3 className="text-white font-bold text-base" style={{
                                textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
                              }}>Ancient Manuscript</h3>
                            </div>
                          </div>
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Maximize className="w-6 h-6 text-white" style={{
                              filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))'
                            }} />
                          </div>
                        </motion.div>
                        
                        {/* Book Collection - DRAMATICALLY Enhanced */}
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-amber-100 to-orange-100 p-8 flex items-center justify-center border-2 border-yellow-400/30"
                          whileHover={{ scale: 1.05, y: -6 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowAboutModal(true)}
                          style={{
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(251, 191, 36, 0.3)'
                          }}
                        >
                          <div className="text-center">
                            <h3 className="text-amber-800 font-bold text-xl mb-3">Opera Macrobii</h3>
                            <p className="text-amber-700 text-base font-medium">Saturnalia & Commentarii</p>
                          </div>
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Eye className="w-6 h-6 text-amber-700" style={{
                              filter: 'drop-shadow(0 0 4px rgba(245, 158, 11, 0.8))'
                            }} />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* 📚 DRAMATICALLY ENHANCED CULTURAL STORY */}
                    <motion.div 
                      className="mb-12"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.5, delay: 1.3 }}
                    >
                      <div className="bg-white/10 backdrop-blur-3xl rounded-2xl p-10 border-2 border-white/20 max-w-5xl mx-auto" style={{
                        boxShadow: '0 0 40px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      }}>
                        <p className="text-xl md:text-2xl text-white/95 leading-relaxed text-justify font-medium" style={{
                          textShadow: '0 1px 2px rgba(0, 0, 0, 0.6)'
                        }}>
                          {safeT('cultural_story')}
                        </p>
                      </div>
                    </motion.div>

                    {/* 🎯 DRAMATICALLY ENHANCED ACTION BUTTONS */}
                    <motion.div 
                      className="flex flex-col sm:flex-row gap-8 justify-center items-center"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.5, delay: 1.5 }}
                    >
                      <motion.button
                        onClick={() => handleSectionChange('banquet')}
                        className="group relative px-12 py-5 text-xl font-bold rounded-2xl transition-all duration-300 shadow-xl overflow-hidden border-2 border-yellow-400/60"
                        style={{
                          background: 'linear-gradient(135deg, #722F37 0%, #8B4513 30%, #A0522D 60%, #CD853F 100%)',
                          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 25px rgba(251, 191, 36, 0.3)'
                        }}
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10 text-yellow-400 group-hover:text-yellow-300" style={{
                          textShadow: '0 0 10px rgba(251, 191, 36, 0.8), 0 2px 4px rgba(0, 0, 0, 0.8)'
                        }}>
                          {safeT('hero.explore_works')}
                        </span>
                      </motion.button>
                      
                      <motion.button
                        onClick={() => setShowAboutModal(true)}
                        className="group relative px-12 py-5 text-xl font-bold rounded-2xl transition-all duration-300 shadow-xl overflow-hidden border-2 border-yellow-400/60"
                        style={{
                          background: 'linear-gradient(135deg, #722F37 0%, #8B4513 30%, #A0522D 60%, #CD853F 100%)',
                          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 25px rgba(251, 191, 36, 0.3)'
                        }}
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10 text-yellow-400 group-hover:text-yellow-300" style={{
                          textShadow: '0 0 10px rgba(251, 191, 36, 0.8), 0 2px 4px rgba(0, 0, 0, 0.8)'
                        }}>
                          {safeT('hero.learn_more')}
                        </span>
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* ALL OTHER SECTIONS WITH ENHANCED TRANSITIONS */}
          <AnimatePresence mode="wait">
            {activeSection === 'search' && (
              <motion.div 
                className="min-h-screen pt-8"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.8 }}
              >
                {renderSectionWithErrorBoundary('search', TextSearchSection, { isActive: true, t: tAdapter, language: currentLang as 'DE' | 'EN' | 'LA' })}
              </motion.div>
            )}

            {activeSection === 'cosmos' && (
              <motion.div 
                className="min-h-screen pt-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8 }}
              >
                {renderSectionWithErrorBoundary('cosmos', CosmosSection, { isActive: true, t: tAdapter, language: currentLang as 'DE' | 'EN' | 'LA' })}
              </motion.div>
            )}

            {activeSection === 'banquet' && (
              <motion.div 
                className="min-h-screen pt-8"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -60 }}
                transition={{ duration: 0.8 }}
              >
                {renderSectionWithErrorBoundary('banquet', BanquetSection, { isActive: true, t: tAdapter, language: currentLang as 'DE' | 'EN' | 'LA' })}
              </motion.div>
            )}

            {activeSection === 'worldmap' && (
              <motion.div 
                className="min-h-screen pt-8"
                initial={{ opacity: 0, rotateY: 30 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -30 }}
                transition={{ duration: 0.8 }}
              >
                {renderSectionWithErrorBoundary('worldmap', WorldMapSection, { isActive: true, t: tAdapter, language: currentLang as 'DE' | 'EN' | 'LA' })}
              </motion.div>
            )}

            {activeSection === 'quiz' && (
              <motion.div 
                className="min-h-screen pt-8"
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.25 }}
                transition={{ duration: 0.8 }}
              >
                {renderSectionWithErrorBoundary('quiz', QuizSectionComplete, { isActive: true, language: currentLang })}
              </motion.div>
            )}

            {activeSection === 'learning' && (
              <motion.div 
                className="min-h-screen pt-8"
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 80 }}
                transition={{ duration: 0.8 }}
              >
                {renderSectionWithErrorBoundary('learning', LearningSection, {})}
              </motion.div>
            )}

            {activeSection === 'visualizations' && (
              <motion.div 
                className="min-h-screen pt-8"
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -80 }}
                transition={{ duration: 0.8 }}
              >
                {renderSectionWithErrorBoundary('visualizations', VisualizationsSection, { isActive: true, t: tAdapter, language: currentLang as 'DE' | 'EN' | 'LA' })}
              </motion.div>
            )}

            {/* AI SYSTEMS WITH DRAMATIC TRANSITIONS */}
            {activeSection === 'ai-cultural' && (
              <motion.div 
                className="min-h-screen pt-8"
                initial={{ opacity: 0, rotateX: 30 }}
                animate={{ opacity: 1, rotateX: 0 }}
                exit={{ opacity: 0, rotateX: -30 }}
                transition={{ duration: 0.9 }}
              >
                {renderSectionWithErrorBoundary('ai-cultural', AICulturalAnalysisSection, {})}
              </motion.div>
            )}

            {activeSection === 'ai-learning' && (
              <motion.div 
                className="min-h-screen pt-8"
                initial={{ opacity: 0, scale: 0.6, rotateY: 40 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.4, rotateY: -40 }}
                transition={{ duration: 1 }}
              >
                {renderSectionWithErrorBoundary('ai-learning', PersonalizedLearningPathsComplete, { language: currentLang })}
              </motion.div>
            )}

            {activeSection === 'ai-tutoring' && (
              <motion.div 
                className="min-h-screen pt-8"
                initial={{ opacity: 0, x: 150, rotateZ: 12 }}
                animate={{ opacity: 1, x: 0, rotateZ: 0 }}
                exit={{ opacity: 0, x: -150, rotateZ: -12 }}
                transition={{ duration: 0.9 }}
              >
                {renderSectionWithErrorBoundary('ai-tutoring', AITutoringSystemComplete, { language: currentLang })}
              </motion.div>
            )}

            {activeSection === 'ai-rag-assistant' && (
              <motion.div 
                className="min-h-screen pt-8"
                initial={{ opacity: 0, y: 150, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -150, scale: 1.3 }}
                transition={{ duration: 1 }}
              >
                {renderSectionWithErrorBoundary('ai-rag-assistant', KIRAGAssistentSection, {})}
              </motion.div>
            )}

            {activeSection === 'vocabulary-trainer' && (
              <motion.div 
                className="min-h-screen pt-8"
                initial={{ opacity: 0, rotateY: 45, x: 80 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: -45, x: -80 }}
                transition={{ duration: 0.9 }}
              >
                {renderSectionWithErrorBoundary('vocabulary-trainer', VocabularyTrainerComplete, { language: currentLang })}
              </motion.div>
            )}

            {activeSection === 'grammar-explainer' && (
              <motion.div 
                className="min-h-screen pt-8"
                initial={{ opacity: 0, scale: 0.5, rotateX: 40 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 1.5, rotateX: -40 }}
                transition={{ duration: 1 }}
              >
                {renderSectionWithErrorBoundary('grammar-explainer', GrammarExplainerComplete, { language: currentLang })}
              </motion.div>
            )}

            {activeSection === 'text-processor' && (
              <motion.div 
                className="min-h-screen pt-8"
                initial={{ opacity: 0, y: -80, rotateZ: 15 }}
                animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                exit={{ opacity: 0, y: 80, rotateZ: -15 }}
                transition={{ duration: 0.9 }}
              >
                {renderSectionWithErrorBoundary('text-processor', MacrobiusTextProcessorComplete, { language: currentLang })}
              </motion.div>
            )}

            {/* TIER3 COMPONENTS WITH DRAMATIC TRANSITIONS */}
            {activeSection === 'progressive-reading' && (
              <motion.div 
                className="min-h-screen pt-8"
                initial={{ opacity: 0, scale: 0.4, rotateY: 60 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.6, rotateY: -60 }}
                transition={{ duration: 1.1 }}
              >
                {renderSectionWithErrorBoundary('progressive-reading', MacrobiusProgressiveReadingTIER3Complete, { language: currentLang })}
              </motion.div>
            )}

            {activeSection === 'research-tools' && (
              <motion.div 
                className="min-h-screen pt-8"
                initial={{ opacity: 0, x: -150, y: 80, rotateX: 45 }}
                animate={{ opacity: 1, x: 0, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, x: 150, y: -80, rotateX: -45 }}
                transition={{ duration: 1.1 }}
              >
                {renderSectionWithErrorBoundary('research-tools', MacrobiusResearchToolsTIER3Complete, { language: currentLang })}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Enhanced Image Modal */}
        <ImageModal
          imageInfo={selectedImage}
          isOpen={showImageModal}
          onClose={handleImageModalClose}
          language={currentLang}
        />

        {/* 🏛️ DRAMATICALLY ENHANCED ABOUT MODAL */}
        <AnimatePresence>
          {showAboutModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAboutModal(false)}
            >
              <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl" />
              
              <motion.div
                className="relative max-w-7xl mx-auto max-h-[95vh] overflow-y-auto"
                initial={{ scale: 0.6, y: 80 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.6, y: 80 }}
                transition={{ type: "spring", duration: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative bg-white/12 backdrop-blur-3xl rounded-3xl p-12 border-2 border-white/20 shadow-2xl" style={{
                  boxShadow: '0 0 60px rgba(251, 191, 36, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)'
                }}>
                  <motion.button
                    onClick={() => setShowAboutModal(false)}
                    className="absolute top-10 right-10 w-14 h-14 rounded-xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-white/95 hover:bg-white/30 transition-all duration-300 z-10"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <X className="w-7 h-7" />
                  </motion.button>

                  <div className="space-y-12">
                    <div className="text-center">
                      <h2 className="text-6xl font-black text-yellow-400 mb-6" style={{
                        textShadow: '0 0 20px rgba(251, 191, 36, 0.8), 0 4px 8px rgba(0, 0, 0, 0.8)'
                      }}>
                        {safeT('about.title')}
                      </h2>
                      <p className="text-3xl text-yellow-300/95 font-light" style={{
                        textShadow: '0 0 15px rgba(253, 224, 71, 0.6), 0 2px 4px rgba(0, 0, 0, 0.8)'
                      }}>
                        {safeT('about.subtitle')}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-10 border-2 border-white/20" style={{
                        boxShadow: '0 0 30px rgba(255, 255, 255, 0.1)'
                      }}>
                        <h3 className="text-4xl font-bold text-yellow-400 mb-8 flex items-center" style={{
                          textShadow: '0 0 15px rgba(251, 191, 36, 0.8)'
                        }}>
                          <Crown className="w-10 h-10 mr-4 text-yellow-400" style={{
                            filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))'
                          }} />
                          {safeT('about.biography.title')}
                        </h3>
                        <p className="text-white/95 leading-relaxed text-justify text-xl" style={{
                          textShadow: '0 1px 2px rgba(0, 0, 0, 0.6)'
                        }}>
                          {safeT('about.biography.text')}
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-10 border-2 border-white/20" style={{
                        boxShadow: '0 0 30px rgba(255, 255, 255, 0.1)'
                      }}>
                        <h3 className="text-4xl font-bold text-yellow-400 mb-8 flex items-center" style={{
                          textShadow: '0 0 15px rgba(251, 191, 36, 0.8)'
                        }}>
                          <Star className="w-10 h-10 mr-4 text-yellow-400" style={{
                            filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))'
                          }} />
                          {safeT('about.works.title')}
                        </h3>
                        <p className="text-white/95 leading-relaxed text-justify text-xl" style={{
                          textShadow: '0 1px 2px rgba(0, 0, 0, 0.6)'
                        }}>
                          {safeT('about.works.text')}
                        </p>
                      </div>
                    </div>

                    <div className="text-center">
                      <motion.button
                        onClick={() => setShowAboutModal(false)}
                        className="px-12 py-5 rounded-2xl font-bold text-2xl transition-all duration-300 shadow-xl border-2 border-yellow-400/60"
                        style={{
                          background: 'linear-gradient(135deg, #722F37 0%, #8B4513 30%, #A0522D 60%, #CD853F 100%)',
                          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 25px rgba(251, 191, 36, 0.3)',
                          textShadow: '0 0 10px rgba(251, 191, 36, 0.8), 0 2px 4px rgba(0, 0, 0, 0.8)'
                        }}
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-yellow-400">
                          {safeT('about.close')}
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🎨 DRAMATICALLY ENHANCED CSS STYLES */}
        <style jsx global>{`
          html {
            scroll-behavior: smooth;
          }
          
          body {
            overflow-x: hidden;
            background: #0a0d1f;
          }

          /* DRAMATIC classical scrollbar */
          ::-webkit-scrollbar {
            width: 10px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 5px;
            border: 1px solid rgba(251, 191, 36, 0.2);
          }

          ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #FFD700, #FFA500, #FF6347);
            border-radius: 5px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 0 10px rgba(251, 191, 36, 0.6);
          }

          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #FFA500, #FF6347, #DC143C);
            box-shadow: 0 0 15px rgba(251, 191, 36, 0.8);
          }

          /* DRAMATIC text selection */
          ::selection {
            background: rgba(255, 215, 0, 0.4);
            color: white;
            text-shadow: 0 0 8px rgba(255, 215, 0, 0.8);
          }

          /* DRAMATIC focus states */
          button:focus {
            outline: 3px solid rgba(255, 215, 0, 0.6);
            outline-offset: 3px;
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
          }
        `}</style>
      </div>
    </>
  );
}