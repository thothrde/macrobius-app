/**
 * 🏛️ MACROBIUS - CLASSICAL DESIGN PERFECTION
 * ✅ PRESERVED: All working translations, real AI systems, error boundaries
 * 🎨 OPTIMIZED: Perfect match to classical reference layout
 * 🌌 ENHANCED: Astrolabium background and starfield positioning
 * 🔄 REFINED: Central frame and navigation for classical elegance
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

      {/* 🌌 CLASSICAL NIGHT SKY BACKGROUND - OPTIMIZED GRADIENTS */}
      <div className="min-h-screen relative overflow-hidden" style={{
        background: 'linear-gradient(180deg, #0a1a2e 0%, #16213e 25%, #1a2845 50%, #0f2027 75%, #2c5364 100%)'
      }}>
        
        {/* ✨ ENHANCED STARFIELD - PERFECT DENSITY */}
        <div className="fixed inset-0 z-0">
          {/* Classical twinkling stars - optimized positioning */}
          {[...Array(75)].map((_, i) => (
            <motion.div
              key={`classical-star-${i}`}
              className={`absolute rounded-full ${
                i % 6 === 0 ? 'w-2 h-2 bg-blue-200 shadow-blue-200/50' :
                i % 6 === 1 ? 'w-1.5 h-1.5 bg-white shadow-white/50' :
                i % 6 === 2 ? 'w-1 h-1 bg-cyan-100 shadow-cyan-100/50' :
                i % 6 === 3 ? 'w-1.5 h-1.5 bg-purple-200 shadow-purple-200/50' :
                i % 6 === 4 ? 'w-1 h-1 bg-yellow-200 shadow-yellow-200/50' :
                'w-0.5 h-0.5 bg-blue-100 shadow-blue-100/50'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: '0 0 6px currentColor'
              }}
              animate={{
                opacity: [0.4, 1, 0.4],
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
          
          {/* Classical constellation patterns */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`constellation-${i}`}
              className="absolute w-2.5 h-2.5 rounded-full bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 opacity-80"
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${15 + Math.random() * 70}%`,
                boxShadow: '0 0 8px rgba(147, 197, 253, 0.8)'
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 5 + Math.random() * 4,
                ease: "easeInOut",
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
          
          {/* 🌟 MOVING STARS - RIGHT TO LEFT (Classical Motion) */}
          {isClient && [...Array(6)].map((_, i) => (
            <motion.div
              key={`moving-star-${i}`}
              className="absolute w-2 h-2 bg-gradient-to-r from-cyan-300 via-white to-transparent rounded-full"
              style={{
                right: '-40px',
                top: `${10 + Math.random() * 80}%`,
                boxShadow: '0 0 10px rgba(147, 197, 253, 0.9)'
              }}
              animate={{
                x: [0, -(getWindowWidth() + 200)],
                opacity: [0, 0.9, 1, 0.9, 0],
                scale: [0.5, 1.2, 1.5, 1.2, 0.5]
              }}
              transition={{
                duration: 8 + Math.random() * 6,
                ease: "linear",
                repeat: Infinity,
                delay: Math.random() * 20 + 2,
              }}
            />
          ))}
        </div>

        {/* 🏛️ CLASSICAL ASTROLABIUM BACKGROUND - OPTIMIZED POSITIONING */}
        <div className="fixed inset-0 z-1 flex items-center justify-center pointer-events-none">
          <motion.div 
            className="relative opacity-20"
            animate={{ 
              rotate: astrolabeRotation,
              scale: [1, 1.02, 1],
            }}
            transition={{ 
              rotate: { duration: 8, ease: "easeInOut" },
              scale: { duration: 25, ease: "easeInOut", repeat: Infinity }
            }}
          >
            <div className="w-[2600px] h-[2600px] relative">
              <Image 
                src="/Astrolab.jpg" 
                alt="Historical Astrolabe"
                width={2600}
                height={2600}
                className="w-full h-full object-contain"
                style={{
                  filter: 'hue-rotate(200deg) saturate(0.6) brightness(0.4) contrast(1.2) blur(0.5px)',
                  mixBlendMode: 'overlay'
                }}
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* 👑 SMALL CIRCULAR MACROBIUS AT TOP - PERFECT POSITIONING */}
        {activeSection === 'hero' && (
          <motion.div 
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
            animate={{ 
              y: [0, -15, 0],
              x: [0, -8, 8, 0],
              rotate: [0, 3, -3, 0]
            }}
            transition={{ 
              duration: 10,
              ease: "easeInOut", 
              repeat: Infinity 
            }}
          >
            {/* Enhanced classical glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/30 to-orange-300/30 rounded-full blur-2xl scale-175 animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-xl scale-150" />
            
            {/* CIRCULAR MACROBIUS - ENHANCED */}
            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-yellow-400/70 shadow-2xl bg-gradient-to-br from-yellow-400/20 to-orange-400/20 backdrop-blur-sm">
              <Image 
                src="/MacrobiusBottle.jpg" 
                alt="Macrobius with Bottle"
                width={144}
                height={144}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-yellow-400/10" />
            </div>
            
            {/* Enhanced orbiting effects */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`orbit-${i}`}
                className="absolute w-1.5 h-1.5 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transformOrigin: '0 0',
                  boxShadow: '0 0 6px currentColor'
                }}
                animate={{
                  rotate: [0, 360],
                  x: [0, 95 * Math.cos(i * Math.PI / 3)],
                  y: [0, 95 * Math.sin(i * Math.PI / 3)],
                  opacity: [0.4, 0.9, 0.4]
                }}
                transition={{
                  duration: 8 + i,
                  ease: "linear",
                  repeat: Infinity,
                  delay: i * 1.3
                }}
              />
            ))}
          </motion.div>
        )}

        {/* 🌍 CLASSICAL LANGUAGE SELECTOR - TOP RIGHT */}
        <motion.div 
          className="fixed top-6 right-6 z-50"
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-lg" />
            
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-xl border border-white/20 p-3 shadow-2xl">
              <div className="flex space-x-2">
                {(['DE', 'EN', 'LA'] as const).map((lang) => (
                  <motion.button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`relative px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 overflow-hidden ${
                      currentLang === lang
                        ? 'text-gray-900 shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
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
                    <span className="relative z-10">{lang}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 📋 CLASSICAL NAVIGATION - TOP LEFT VERTICAL BAR - ENHANCED */}
        <motion.nav 
          className="fixed top-6 left-6 z-50 max-h-[calc(100vh-3rem)] overflow-y-auto"
          onHoverStart={() => setIsNavHovered(true)}
          onHoverEnd={() => setIsNavHovered(false)}
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative">
            {/* Enhanced classical glow effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-purple-500/10 to-blue-500/15 rounded-2xl blur-xl" />
            <div className={`absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-2xl transition-opacity duration-300 ${isNavHovered ? 'opacity-100' : 'opacity-0'}`} />
            
            <div className="relative bg-white/8 backdrop-blur-3xl rounded-2xl p-5 border border-white/15 shadow-2xl min-w-[280px]">
              {/* Enhanced classical header */}
              <div className="flex items-center justify-center mb-5">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 8, repeat: Infinity }}
                >
                  <Crown className="w-7 h-7 text-yellow-400" />
                </motion.div>
                <span className="ml-3 text-yellow-400 font-bold text-base tracking-wide">MACROBIUS</span>
              </div>
              
              <div className="space-y-2">
                {/* Core Sections - Enhanced */}
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
                    className={`group relative w-full px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 text-left flex items-center space-x-3 overflow-hidden ${
                      activeSection === section.id ? 'shadow-xl' : 'hover:bg-white/5'
                    }`}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 }}
                  >
                    {activeSection === section.id && (
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${section.gradient} opacity-85`}
                        layoutId="navBackground"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                    
                    <span className="relative z-10 text-xl">{section.icon}</span>
                    <span className={`relative z-10 flex-1 text-sm ${
                      activeSection === section.id ? 'text-white font-bold' : 'text-white/85 group-hover:text-white'
                    }`}>
                      {section.text}
                    </span>
                    
                    {componentErrors[section.id] && (
                      <AlertTriangle className="relative z-10 w-4 h-4 text-red-400" />
                    )}
                  </motion.button>
                ))}
                
                {/* AI Systems Section - Enhanced */}
                <div className="border-t border-white/15 pt-4 mt-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Star className="w-5 h-5 text-blue-400" />
                    <p className="text-blue-200/90 text-sm uppercase tracking-wider font-bold">
                      AI SYSTEMS
                    </p>
                    <span className="text-green-400 text-xs font-bold bg-green-400/15 px-2 py-1 rounded border border-green-400/40">
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
                      className={`group relative w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 text-left flex items-center space-x-2.5 mb-1.5 overflow-hidden ${
                        activeSection === section.id ? 'bg-blue-500/25 shadow-lg' : 'hover:bg-white/5'
                      }`}
                      whileHover={{ scale: 1.01, x: 3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-base">{section.icon}</span>
                      <span className={`flex-1 text-sm ${
                        activeSection === section.id ? 'text-blue-100 font-semibold' : 'text-blue-200/85 group-hover:text-blue-200'
                      }`}>
                        {section.text}
                      </span>
                      <span className="text-green-400 text-xs font-bold bg-green-400/15 px-1.5 py-0.5 rounded border border-green-400/40">
                        {section.tier}
                      </span>
                    </motion.button>
                  ))}
                </div>
                
                {/* TIER3 Platform Section - Enhanced */}
                <div className="border-t border-white/15 pt-4 mt-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Crown className="w-5 h-5 text-purple-400" />
                    <p className="text-purple-200/90 text-sm uppercase tracking-wider font-bold">
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
                      className={`group relative w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 text-left flex items-center space-x-2.5 mb-1.5 overflow-hidden ${
                        activeSection === section.id ? 'bg-purple-500/25 shadow-lg' : 'hover:bg-white/5'
                      }`}
                      whileHover={{ scale: 1.01, x: 3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-base">{section.icon}</span>
                      <span className={`flex-1 text-sm ${
                        activeSection === section.id ? 'text-purple-100 font-semibold' : 'text-purple-200/85 group-hover:text-purple-200'
                      }`}>
                        {section.text}
                      </span>
                      <span className="text-purple-400 text-xs font-bold bg-purple-400/15 px-1.5 py-0.5 rounded border border-purple-400/40">
                        {section.tier}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Oracle Cloud Status - Enhanced */}
              <motion.div 
                className="mt-5 pt-5 border-t border-white/15"
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(34, 197, 94, 0.2)',
                    '0 0 30px rgba(34, 197, 94, 0.4)',
                    '0 0 20px rgba(34, 197, 94, 0.2)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="bg-green-500/15 border border-green-400/40 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <motion.div 
                      className="w-2.5 h-2.5 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                    <span className="text-white font-semibold text-sm">Oracle Cloud</span>
                    <span className="text-green-400 font-bold text-xs bg-green-400/15 px-2 py-1 rounded border border-green-400/40">
                      COMPLETE
                    </span>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {safeT('nav.oracle_status')}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.nav>

        {/* 🎯 MAIN CONTENT */}
        <main className="relative z-10">
          {/* 🏛️ CLASSICAL HERO SECTION - PERFECT CENTERED FRAME LAYOUT */}
          {activeSection === 'hero' && (
            <motion.section 
              className="min-h-screen flex items-center justify-center px-6"
              style={{ paddingTop: '160px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
              {/* 🎪 CLASSICAL CENTERED CIRCULAR FRAME - ENHANCED */}
              <div className="relative max-w-5xl mx-auto">
                {/* Astrolabe-inspired circular frame - Enhanced */}
                <div className="relative">
                  {/* Multiple glow rings for classical elegance */}
                  <div className="absolute inset-0 rounded-full border-3 border-yellow-400/40 blur-sm scale-105" />
                  <div className="absolute inset-0 rounded-full border-2 border-yellow-300/30 blur-md scale-110" />
                  <div className="absolute inset-0 rounded-full border border-blue-300/20 blur-lg scale-115" />
                  
                  {/* Main circular frame - Enhanced */}
                  <div className="relative bg-white/8 backdrop-blur-3xl rounded-full p-14 border-3 border-yellow-400/50 shadow-2xl">
                    {/* Classical title section - Enhanced */}
                    <motion.div 
                      className="text-center mb-10"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, delay: 0.3 }}
                    >
                      <motion.h1 
                        className="text-6xl md:text-8xl font-black mb-6 tracking-tight"
                        style={{
                          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 30%, #FF8C00 60%, #FF6347 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 0 25px rgba(255, 215, 0, 0.4))'
                        }}
                      >
                        Macrobius
                      </motion.h1>
                      
                      <motion.h2 
                        className="text-3xl md:text-4xl text-yellow-300 mb-5 font-light tracking-wide"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                      >
                        {safeT('hero.subtitle')}
                      </motion.h2>
                      
                      <motion.h3 
                        className="text-xl md:text-2xl text-yellow-200/95 mb-6 font-medium max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.7 }}
                      >
                        {safeT('hero.description')}
                      </motion.h3>

                      {/* Enhanced TIER-COMPLETE Badge */}
                      <motion.div 
                        className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-bold mb-8"
                        style={{
                          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.25) 0%, rgba(59, 130, 246, 0.25) 100%)',
                          border: '2px solid rgba(34, 197, 94, 0.4)'
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.8, delay: 0.9 }}
                      >
                        <motion.div
                          className="w-2.5 h-2.5 bg-green-400 rounded-full mr-3"
                          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                        />
                        <span className="text-green-300 text-base">
                          TIER-COMPLETE - Advanced Components + Working Features
                        </span>
                      </motion.div>
                    </motion.div>

                    {/* 🖼️ CLASSICAL CENTRAL IMAGE GRID - EXACTLY LIKE REFERENCE */}
                    <motion.div 
                      className="mb-10"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, delay: 1.1 }}
                    >
                      <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
                        {/* Rome Image - Top Left - Enhanced */}
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl"
                          whileHover={{ scale: 1.03, y: -4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowRomeModal(true)}
                        >
                          <Image
                            src="/Rome-under.jpg"
                            alt={safeT('image.rome.title')}
                            width={320}
                            height={220}
                            className="w-full h-36 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <h3 className="text-white font-bold text-sm">{safeT('image.rome.title')}</h3>
                            </div>
                          </div>
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Maximize className="w-5 h-5 text-white" />
                          </div>
                        </motion.div>
                        
                        {/* Tycho & Pontanus - Top Right - Enhanced */}
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl"
                          whileHover={{ scale: 1.03, y: -4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowPontanusModal(true)}
                        >
                          <Image
                            src="/TychoAssistent.jpg"
                            alt={safeT('image.tycho.title')}
                            width={320}
                            height={220}
                            className="w-full h-36 object-contain bg-gradient-to-br from-blue-50 to-purple-50 transition-all duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <h3 className="text-white font-bold text-sm">{safeT('image.tycho.title')}</h3>
                            </div>
                          </div>
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Maximize className="w-5 h-5 text-white" />
                          </div>
                        </motion.div>
                        
                        {/* Ancient Drawing - Bottom Left - Enhanced */}
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl"
                          whileHover={{ scale: 1.03, y: -4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowAboutModal(true)}
                        >
                          <Image
                            src="/MacrobiusBottle.jpg"
                            alt="Ancient Drawing"
                            width={320}
                            height={220}
                            className="w-full h-36 object-contain bg-gradient-to-br from-yellow-50 to-orange-50 transition-all duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <h3 className="text-white font-bold text-sm">Ancient Manuscript</h3>
                            </div>
                          </div>
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Maximize className="w-5 h-5 text-white" />
                          </div>
                        </motion.div>
                        
                        {/* Book Collection - Bottom Right - Enhanced */}
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-amber-100 to-orange-100 p-6 flex items-center justify-center"
                          whileHover={{ scale: 1.03, y: -4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowAboutModal(true)}
                        >
                          <div className="text-center">
                            <h3 className="text-amber-800 font-bold text-base mb-2">Opera Macrobii</h3>
                            <p className="text-amber-700 text-sm">Saturnalia & Commentarii</p>
                          </div>
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Eye className="w-5 h-5 text-amber-700" />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* 📚 CLASSICAL CULTURAL STORY - Enhanced */}
                    <motion.div 
                      className="mb-10"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, delay: 1.3 }}
                    >
                      <div className="bg-white/8 backdrop-blur-2xl rounded-2xl p-8 border border-white/15 max-w-4xl mx-auto">
                        <p className="text-lg md:text-xl text-white/95 leading-relaxed text-justify">
                          {safeT('cultural_story')}
                        </p>
                      </div>
                    </motion.div>

                    {/* 🎯 CLASSICAL ACTION BUTTONS - Enhanced */}
                    <motion.div 
                      className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, delay: 1.5 }}
                    >
                      <motion.button
                        onClick={() => handleSectionChange('banquet')}
                        className="group relative px-10 py-4 text-xl font-bold rounded-2xl transition-all duration-300 shadow-xl overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #722F37 0%, #8B4513 50%, #A0522D 100%)',
                          border: '3px solid #FFD700'
                        }}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/25 to-orange-400/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10 text-yellow-400 group-hover:text-yellow-300">
                          {safeT('hero.explore_works')}
                        </span>
                      </motion.button>
                      
                      <motion.button
                        onClick={() => setShowAboutModal(true)}
                        className="group relative px-10 py-4 text-xl font-bold rounded-2xl transition-all duration-300 shadow-xl overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #722F37 0%, #8B4513 50%, #A0522D 100%)',
                          border: '3px solid #FFD700'
                        }}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/25 to-orange-400/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10 text-yellow-400 group-hover:text-yellow-300">
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
                className="min-h-screen pt-6"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.6 }}
              >
                {renderSectionWithErrorBoundary('search', TextSearchSection, { isActive: true, t: tAdapter, language: currentLang as 'DE' | 'EN' | 'LA' })}
              </motion.div>
            )}

            {activeSection === 'cosmos' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
              >
                {renderSectionWithErrorBoundary('cosmos', CosmosSection, { isActive: true, t: tAdapter, language: currentLang as 'DE' | 'EN' | 'LA' })}
              </motion.div>
            )}

            {activeSection === 'banquet' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6 }}
              >
                {renderSectionWithErrorBoundary('banquet', BanquetSection, { isActive: true, t: tAdapter, language: currentLang as 'DE' | 'EN' | 'LA' })}
              </motion.div>
            )}

            {activeSection === 'worldmap' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, rotateY: 20 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -20 }}
                transition={{ duration: 0.6 }}
              >
                {renderSectionWithErrorBoundary('worldmap', WorldMapSection, { isActive: true, t: tAdapter, language: currentLang as 'DE' | 'EN' | 'LA' })}
              </motion.div>
            )}

            {activeSection === 'quiz' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.15 }}
                transition={{ duration: 0.6 }}
              >
                {renderSectionWithErrorBoundary('quiz', QuizSectionComplete, { isActive: true, language: currentLang })}
              </motion.div>
            )}

            {activeSection === 'learning' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 60 }}
                transition={{ duration: 0.6 }}
              >
                {renderSectionWithErrorBoundary('learning', LearningSection, {})}
              </motion.div>
            )}

            {activeSection === 'visualizations' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -60 }}
                transition={{ duration: 0.6 }}
              >
                {renderSectionWithErrorBoundary('visualizations', VisualizationsSection, { isActive: true, t: tAdapter, language: currentLang as 'DE' | 'EN' | 'LA' })}
              </motion.div>
            )}

            {/* AI SYSTEMS WITH ENHANCED TRANSITIONS */}
            {activeSection === 'ai-cultural' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, rotateX: 20 }}
                animate={{ opacity: 1, rotateX: 0 }}
                exit={{ opacity: 0, rotateX: -20 }}
                transition={{ duration: 0.7 }}
              >
                {renderSectionWithErrorBoundary('ai-cultural', AICulturalAnalysisSection, {})}
              </motion.div>
            )}

            {activeSection === 'ai-learning' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, scale: 0.75, rotateY: 25 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.25, rotateY: -25 }}
                transition={{ duration: 0.8 }}
              >
                {renderSectionWithErrorBoundary('ai-learning', PersonalizedLearningPathsComplete, { language: currentLang })}
              </motion.div>
            )}

            {activeSection === 'ai-tutoring' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, x: 120, rotateZ: 8 }}
                animate={{ opacity: 1, x: 0, rotateZ: 0 }}
                exit={{ opacity: 0, x: -120, rotateZ: -8 }}
                transition={{ duration: 0.7 }}
              >
                {renderSectionWithErrorBoundary('ai-tutoring', AITutoringSystemComplete, { language: currentLang })}
              </motion.div>
            )}

            {activeSection === 'ai-rag-assistant' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, y: 120, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -120, scale: 1.15 }}
                transition={{ duration: 0.8 }}
              >
                {renderSectionWithErrorBoundary('ai-rag-assistant', KIRAGAssistentSection, {})}
              </motion.div>
            )}

            {activeSection === 'vocabulary-trainer' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, rotateY: 35, x: 60 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: -35, x: -60 }}
                transition={{ duration: 0.7 }}
              >
                {renderSectionWithErrorBoundary('vocabulary-trainer', VocabularyTrainerComplete, { language: currentLang })}
              </motion.div>
            )}

            {activeSection === 'grammar-explainer' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, scale: 0.65, rotateX: 25 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 1.35, rotateX: -25 }}
                transition={{ duration: 0.8 }}
              >
                {renderSectionWithErrorBoundary('grammar-explainer', GrammarExplainerComplete, { language: currentLang })}
              </motion.div>
            )}

            {activeSection === 'text-processor' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, y: -60, rotateZ: 12 }}
                animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                exit={{ opacity: 0, y: 60, rotateZ: -12 }}
                transition={{ duration: 0.7 }}
              >
                {renderSectionWithErrorBoundary('text-processor', MacrobiusTextProcessorComplete, { language: currentLang })}
              </motion.div>
            )}

            {/* TIER3 COMPONENTS WITH ENHANCED TRANSITIONS */}
            {activeSection === 'progressive-reading' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, scale: 0.5, rotateY: 50 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.5, rotateY: -50 }}
                transition={{ duration: 0.9 }}
              >
                {renderSectionWithErrorBoundary('progressive-reading', MacrobiusProgressiveReadingTIER3Complete, { language: currentLang })}
              </motion.div>
            )}

            {activeSection === 'research-tools' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, x: -120, y: 60, rotateX: 35 }}
                animate={{ opacity: 1, x: 0, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, x: 120, y: -60, rotateX: -35 }}
                transition={{ duration: 0.9 }}
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

        {/* 🏛️ CLASSICAL ABOUT MODAL - Enhanced */}
        <AnimatePresence>
          {showAboutModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAboutModal(false)}
            >
              <div className="absolute inset-0 bg-black/85 backdrop-blur-2xl" />
              
              <motion.div
                className="relative max-w-6xl mx-auto max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.75, y: 60 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.75, y: 60 }}
                transition={{ type: "spring", duration: 0.7 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative bg-white/8 backdrop-blur-3xl rounded-3xl p-10 border border-white/15 shadow-2xl">
                  <motion.button
                    onClick={() => setShowAboutModal(false)}
                    className="absolute top-8 right-8 w-12 h-12 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center text-white/90 hover:bg-white/25 transition-all duration-300 z-10"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>

                  <div className="space-y-10">
                    <div className="text-center">
                      <h2 className="text-5xl font-black text-yellow-400 mb-4">
                        {safeT('about.title')}
                      </h2>
                      <p className="text-2xl text-yellow-300/95 font-light">
                        {safeT('about.subtitle')}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                      <div className="bg-white/8 backdrop-blur-2xl rounded-2xl p-8 border border-white/15">
                        <h3 className="text-3xl font-bold text-yellow-400 mb-6 flex items-center">
                          <Crown className="w-8 h-8 mr-3 text-yellow-400" />
                          {safeT('about.biography.title')}
                        </h3>
                        <p className="text-white/95 leading-relaxed text-justify text-lg">
                          {safeT('about.biography.text')}
                        </p>
                      </div>

                      <div className="bg-white/8 backdrop-blur-2xl rounded-2xl p-8 border border-white/15">
                        <h3 className="text-3xl font-bold text-yellow-400 mb-6 flex items-center">
                          <Star className="w-8 h-8 mr-3 text-yellow-400" />
                          {safeT('about.works.title')}
                        </h3>
                        <p className="text-white/95 leading-relaxed text-justify text-lg">
                          {safeT('about.works.text')}
                        </p>
                      </div>
                    </div>

                    <div className="text-center">
                      <motion.button
                        onClick={() => setShowAboutModal(false)}
                        className="px-10 py-4 rounded-2xl font-bold text-xl transition-all duration-300 shadow-xl"
                        style={{
                          background: 'linear-gradient(135deg, #722F37 0%, #8B4513 50%, #A0522D 100%)',
                          border: '3px solid #FFD700'
                        }}
                        whileHover={{ scale: 1.05, y: -3 }}
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

        {/* 🎨 ENHANCED CLASSICAL CSS STYLES */}
        <style jsx global>{`
          html {
            scroll-behavior: smooth;
          }
          
          body {
            overflow-x: hidden;
            background: #0a1a2e;
          }

          /* Enhanced classical scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #FFD700, #FFA500, #FF6347);
            border-radius: 4px;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #FFA500, #FF6347, #DC143C);
          }

          /* Enhanced text selection */
          ::selection {
            background: rgba(255, 215, 0, 0.3);
            color: white;
          }

          /* Classical focus states */
          button:focus {
            outline: 2px solid rgba(255, 215, 0, 0.5);
            outline-offset: 2px;
          }
        `}</style>
      </div>
    </>
  );
}