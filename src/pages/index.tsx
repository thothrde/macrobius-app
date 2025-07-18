/**
 * 🏛️ MACROBIUS - CLASSICAL DESIGN RESTORATION
 * ✅ PRESERVED: All working translations, real AI systems, error boundaries
 * 🎨 RESTORED: Original classical layout with centered circular frame
 * 🌌 CLASSICAL: Night sky background, moving stars, elegant navigation
 * 🔄 PERFECT: Exact match to original sophisticated design
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
        <title>Macrobius - Kulturelle Schätze der Antike</title>
        <meta name="description" content="Entdecken Sie die Kulturschätze der Antike" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* CLASSICAL NIGHT SKY BACKGROUND - FULL PAGE */}
      <div className="min-h-screen relative overflow-hidden" style={{
        background: 'linear-gradient(180deg, #0a0e1a 0%, #1a1a2e 20%, #16213e 40%, #0d1b2a 60%, #0c1821 80%, #0a0e1a 100%)'
      }}>
        
        {/* CLASSICAL STARFIELD - ENHANCED DENSITY */}
        <div className="fixed inset-0 z-0">
          {/* Classical twinkling stars - increased density */}
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={`classical-star-${i}`}
              className={`absolute rounded-full ${
                i % 5 === 0 ? 'w-1.5 h-1.5 bg-yellow-200' :
                i % 5 === 1 ? 'w-1 h-1 bg-blue-100' :
                i % 5 === 2 ? 'w-0.5 h-0.5 bg-white' :
                i % 5 === 3 ? 'w-1 h-1 bg-purple-200' : 
                'w-0.5 h-0.5 bg-yellow-100'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.3, 0.8],
              }}
              transition={{
                duration: 2 + Math.random() * 4,
                ease: "easeInOut",
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
          
          {/* Classical constellation stars */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`constellation-${i}`}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-yellow-200 to-orange-200 opacity-90"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 6 + Math.random() * 3,
                ease: "easeInOut",
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            />
          ))}
          
          {/* MOVING STARS - RIGHT TO LEFT (as requested) */}
          {isClient && [...Array(4)].map((_, i) => (
            <motion.div
              key={`moving-star-${i}`}
              className="absolute w-1.5 h-1.5 bg-gradient-to-r from-cyan-200 via-white to-transparent rounded-full"
              style={{
                right: '-30px',
                top: `${15 + Math.random() * 70}%`,
              }}
              animate={{
                x: [0, -(getWindowWidth() + 150)],
                opacity: [0, 0.8, 1, 0.8, 0],
                scale: [0.5, 1, 1.2, 1, 0.5]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                ease: "linear",
                repeat: Infinity,
                delay: Math.random() * 15 + 3,
              }}
            />
          ))}
        </div>

        {/* CLASSICAL ASTROLABIUM BACKGROUND - FULL PAGE */}
        <div className="fixed inset-0 z-1 flex items-center justify-center pointer-events-none">
          <motion.div 
            className="relative opacity-25"
            animate={{ 
              rotate: astrolabeRotation,
              scale: [1, 1.01, 1],
            }}
            transition={{ 
              rotate: { duration: 4, ease: "easeInOut" },
              scale: { duration: 20, ease: "easeInOut", repeat: Infinity }
            }}
          >
            <div className="w-[2400px] h-[2400px] relative">
              <Image 
                src="/Astrolab.jpg" 
                alt="Historical Astrolabe"
                width={2400}
                height={2400}
                className="w-full h-full object-contain"
                style={{
                  filter: 'hue-rotate(220deg) saturate(0.5) brightness(0.3) contrast(1.1)',
                  mixBlendMode: 'overlay'
                }}
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* SMALL CIRCULAR MACROBIUS AT TOP (as requested) */}
        {activeSection === 'hero' && (
          <motion.div 
            className="fixed top-16 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
            animate={{ 
              y: [0, -12, 0],
              x: [0, -6, 6, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 8,
              ease: "easeInOut", 
              repeat: Infinity 
            }}
          >
            {/* Classical glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-full blur-xl scale-150 animate-pulse" />
            
            {/* CIRCULAR MACROBIUS (not square) */}
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-3 border-yellow-400/60 shadow-xl bg-gradient-to-br from-yellow-400/10 to-orange-400/10">
              <Image 
                src="/MacrobiusBottle.jpg" 
                alt="Macrobius with Bottle"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Subtle orbiting effect */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`orbit-${i}`}
                className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transformOrigin: '0 0',
                }}
                animate={{
                  rotate: [0, 360],
                  x: [0, 80 * Math.cos(i * Math.PI / 2)],
                  y: [0, 80 * Math.sin(i * Math.PI / 2)],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 6 + i,
                  ease: "linear",
                  repeat: Infinity,
                  delay: i * 1.5
                }}
              />
            ))}
          </motion.div>
        )}

        {/* CLASSICAL LANGUAGE SELECTOR - TOP RIGHT */}
        <motion.div 
          className="fixed top-4 right-4 z-50"
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-xl blur-lg" />
            
            <div className="relative bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-2 shadow-xl">
              <div className="flex space-x-1">
                {(['DE', 'EN', 'LA'] as const).map((lang) => (
                  <motion.button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`relative px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-300 overflow-hidden ${
                      currentLang === lang
                        ? 'text-gray-900 shadow-md'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
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

        {/* CLASSICAL NAVIGATION - TOP LEFT VERTICAL BAR (as requested) */}
        <motion.nav 
          className="fixed top-4 left-4 z-50 max-h-[calc(100vh-2rem)] overflow-y-auto"
          onHoverStart={() => setIsNavHovered(true)}
          onHoverEnd={() => setIsNavHovered(false)}
          whileHover={{ scale: 1.01 }}
        >
          <div className="relative">
            {/* Classical glow effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-blue-500/10 rounded-2xl blur-xl" />
            <div className={`absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-2xl transition-opacity duration-300 ${isNavHovered ? 'opacity-100' : 'opacity-0'}`} />
            
            <div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl p-4 border border-white/10 shadow-xl min-w-[260px]">
              {/* Classical header */}
              <div className="flex items-center justify-center mb-4">
                <motion.div
                  animate={{ rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <Crown className="w-6 h-6 text-yellow-400" />
                </motion.div>
                <span className="ml-2 text-yellow-400 font-bold text-sm">MACROBIUS</span>
              </div>
              
              <div className="space-y-2">
                {/* Core Sections */}
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
                    className={`group relative w-full px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-300 text-left flex items-center space-x-2 overflow-hidden ${
                      activeSection === section.id ? 'shadow-lg' : 'hover:bg-white/5'
                    }`}
                    whileHover={{ scale: 1.01, x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {activeSection === section.id && (
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${section.gradient} opacity-80`}
                        layoutId="navBackground"
                        transition={{ type: "spring", duration: 0.4 }}
                      />
                    )}
                    
                    <span className="relative z-10 text-lg">{section.icon}</span>
                    <span className={`relative z-10 flex-1 text-xs ${
                      activeSection === section.id ? 'text-white font-bold' : 'text-white/80 group-hover:text-white'
                    }`}>
                      {section.text}
                    </span>
                    
                    {componentErrors[section.id] && (
                      <AlertTriangle className="relative z-10 w-3 h-3 text-red-400" />
                    )}
                  </motion.button>
                ))}
                
                {/* AI Systems Section */}
                <div className="border-t border-white/10 pt-3 mt-3">
                  <div className="flex items-center space-x-1 mb-3">
                    <Star className="w-4 h-4 text-blue-400" />
                    <p className="text-blue-200/80 text-xs uppercase tracking-wider font-bold">
                      AI SYSTEMS
                    </p>
                    <span className="text-green-400 text-xs font-bold bg-green-400/10 px-1.5 py-0.5 rounded border border-green-400/30">
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
                      className={`group relative w-full px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 text-left flex items-center space-x-2 mb-1 overflow-hidden ${
                        activeSection === section.id ? 'bg-blue-500/20 shadow-md' : 'hover:bg-white/3'
                      }`}
                      whileHover={{ scale: 1.01, x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-sm">{section.icon}</span>
                      <span className={`flex-1 text-xs ${
                        activeSection === section.id ? 'text-blue-100 font-semibold' : 'text-blue-200/80 group-hover:text-blue-200'
                      }`}>
                        {section.text}
                      </span>
                      <span className="text-green-400 text-xs font-bold bg-green-400/10 px-1 py-0.5 rounded border border-green-400/30">
                        {section.tier}
                      </span>
                    </motion.button>
                  ))}
                </div>
                
                {/* TIER3 Platform Section */}
                <div className="border-t border-white/10 pt-3 mt-3">
                  <div className="flex items-center space-x-1 mb-3">
                    <Crown className="w-4 h-4 text-purple-400" />
                    <p className="text-purple-200/80 text-xs uppercase tracking-wider font-bold">
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
                      className={`group relative w-full px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 text-left flex items-center space-x-2 mb-1 overflow-hidden ${
                        activeSection === section.id ? 'bg-purple-500/20 shadow-md' : 'hover:bg-white/3'
                      }`}
                      whileHover={{ scale: 1.01, x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-sm">{section.icon}</span>
                      <span className={`flex-1 text-xs ${
                        activeSection === section.id ? 'text-purple-100 font-semibold' : 'text-purple-200/80 group-hover:text-purple-200'
                      }`}>
                        {section.text}
                      </span>
                      <span className="text-purple-400 text-xs font-bold bg-purple-400/10 px-1 py-0.5 rounded border border-purple-400/30">
                        {section.tier}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Oracle Cloud Status */}
              <motion.div 
                className="mt-4 pt-4 border-t border-white/10"
                animate={{ 
                  boxShadow: [
                    '0 0 15px rgba(34, 197, 94, 0.2)',
                    '0 0 25px rgba(34, 197, 94, 0.4)',
                    '0 0 15px rgba(34, 197, 94, 0.2)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <motion.div 
                      className="w-2 h-2 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-white font-semibold text-xs">Oracle Cloud</span>
                    <span className="text-green-400 font-bold text-xs bg-green-400/10 px-1.5 py-0.5 rounded border border-green-400/30">
                      COMPLETE
                    </span>
                  </div>
                  <p className="text-white/70 text-xs leading-relaxed">
                    {safeT('nav.oracle_status')}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.nav>

        {/* MAIN CONTENT */}
        <main className="relative z-10">
          {/* CLASSICAL HERO SECTION - CENTERED FRAME LAYOUT */}
          {activeSection === 'hero' && (
            <motion.section 
              className="min-h-screen flex items-center justify-center px-4"
              style={{ paddingTop: '140px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* CLASSICAL CENTERED CIRCULAR FRAME */}
              <div className="relative max-w-4xl mx-auto">
                {/* Astrolabe-inspired circular frame */}
                <div className="relative">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-yellow-400/30 blur-sm scale-105" />
                  <div className="absolute inset-0 rounded-full border border-yellow-300/20 blur-md scale-110" />
                  
                  {/* Main circular frame */}
                  <div className="relative bg-white/5 backdrop-blur-2xl rounded-full p-12 border-2 border-yellow-400/40 shadow-2xl">
                    {/* Classical title section */}
                    <motion.div 
                      className="text-center mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.3 }}
                    >
                      <motion.h1 
                        className="text-5xl md:text-7xl font-black mb-4 tracking-tight"
                        style={{
                          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF6347 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.3))'
                        }}
                      >
                        Macrobius
                      </motion.h1>
                      
                      <motion.h2 
                        className="text-2xl md:text-3xl text-yellow-300 mb-4 font-light"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      >
                        {safeT('hero.subtitle')}
                      </motion.h2>
                      
                      <motion.h3 
                        className="text-lg md:text-xl text-yellow-200/90 mb-4 font-medium max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.7 }}
                      >
                        {safeT('hero.description')}
                      </motion.h3>

                      {/* TIER-COMPLETE Badge */}
                      <motion.div 
                        className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold mb-6"
                        style={{
                          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
                          border: '1px solid rgba(34, 197, 94, 0.3)'
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.6, delay: 0.9 }}
                      >
                        <motion.div
                          className="w-2 h-2 bg-green-400 rounded-full mr-2"
                          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-green-300">
                          TIER-COMPLETE - Advanced Components + Working Features
                        </span>
                      </motion.div>
                    </motion.div>

                    {/* CLASSICAL CENTRAL IMAGE GRID - EXACTLY LIKE ORIGINAL */}
                    <motion.div 
                      className="mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 1.1 }}
                    >
                      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                        {/* Rome Image - Top Left */}
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg"
                          whileHover={{ scale: 1.02, y: -3 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowRomeModal(true)}
                        >
                          <Image
                            src="/Rome-under.jpg"
                            alt={safeT('image.rome.title')}
                            width={300}
                            height={200}
                            className="w-full h-32 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                              <h3 className="text-white font-bold text-sm">{safeT('image.rome.title')}</h3>
                            </div>
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Maximize className="w-4 h-4 text-white" />
                          </div>
                        </motion.div>
                        
                        {/* Tycho & Pontanus - Top Right */}
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg"
                          whileHover={{ scale: 1.02, y: -3 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowPontanusModal(true)}
                        >
                          <Image
                            src="/TychoAssistent.jpg"
                            alt={safeT('image.tycho.title')}
                            width={300}
                            height={200}
                            className="w-full h-32 object-contain bg-gradient-to-br from-blue-50 to-purple-50 transition-all duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                              <h3 className="text-white font-bold text-sm">{safeT('image.tycho.title')}</h3>
                            </div>
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Maximize className="w-4 h-4 text-white" />
                          </div>
                        </motion.div>
                        
                        {/* Ancient Drawing - Bottom Left */}
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg"
                          whileHover={{ scale: 1.02, y: -3 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowAboutModal(true)}
                        >
                          <Image
                            src="/MacrobiusBottle.jpg"
                            alt="Ancient Drawing"
                            width={300}
                            height={200}
                            className="w-full h-32 object-contain bg-gradient-to-br from-yellow-50 to-orange-50 transition-all duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                              <h3 className="text-white font-bold text-sm">Ancient Manuscript</h3>
                            </div>
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Maximize className="w-4 h-4 text-white" />
                          </div>
                        </motion.div>
                        
                        {/* Book Collection - Bottom Right */}
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg bg-gradient-to-br from-amber-100 to-orange-100 p-4 flex items-center justify-center"
                          whileHover={{ scale: 1.02, y: -3 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowAboutModal(true)}
                        >
                          <div className="text-center">
                            <h3 className="text-amber-800 font-bold text-sm mb-2">Opera Macrobii</h3>
                            <p className="text-amber-700 text-xs">Saturnalia & Commentarii</p>
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Eye className="w-4 h-4 text-amber-700" />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* CLASSICAL CULTURAL STORY */}
                    <motion.div 
                      className="mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 1.3 }}
                    >
                      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 max-w-3xl mx-auto">
                        <p className="text-base md:text-lg text-white/90 leading-relaxed text-justify">
                          {safeT('cultural_story')}
                        </p>
                      </div>
                    </motion.div>

                    {/* CLASSICAL ACTION BUTTONS */}
                    <motion.div 
                      className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 1.5 }}
                    >
                      <motion.button
                        onClick={() => handleSectionChange('banquet')}
                        className="group relative px-8 py-3 text-lg font-bold rounded-xl transition-all duration-300 shadow-lg overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #722F37 0%, #8B4513 100%)',
                          border: '2px solid #FFD700'
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10 text-yellow-400 group-hover:text-yellow-300">
                          {safeT('hero.explore_works')}
                        </span>
                      </motion.button>
                      
                      <motion.button
                        onClick={() => setShowAboutModal(true)}
                        className="group relative px-8 py-3 text-lg font-bold rounded-xl transition-all duration-300 shadow-lg overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #722F37 0%, #8B4513 100%)',
                          border: '2px solid #FFD700'
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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

          {/* ALL OTHER SECTIONS WITH TRANSITIONS */}
          <AnimatePresence mode="wait">
            {activeSection === 'search' && (
              <motion.div 
                className="min-h-screen pt-4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                {renderSectionWithErrorBoundary('search', TextSearchSection, { isActive: true, t: tAdapter, language: currentLang as 'DE' | 'EN' | 'LA' })}
              </motion.div>
            )}

            {activeSection === 'cosmos' && (
              <motion.div 
                className="min-h-screen pt-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                {renderSectionWithErrorBoundary('cosmos', CosmosSection, { isActive: true, t: tAdapter, language: currentLang as 'DE' | 'EN' | 'LA' })}
              </motion.div>
            )}

            {activeSection === 'banquet' && (
              <motion.div 
                className="min-h-screen pt-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                {renderSectionWithErrorBoundary('banquet', BanquetSection, { isActive: true, t: tAdapter, language: currentLang as 'DE' | 'EN' | 'LA' })}
              </motion.div>
            )}

            {activeSection === 'worldmap' && (
              <motion.div 
                className="min-h-screen pt-4"
                initial={{ opacity: 0, rotateY: 15 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -15 }}
                transition={{ duration: 0.5 }}
              >
                {renderSectionWithErrorBoundary('worldmap', WorldMapSection, { isActive: true, t: tAdapter, language: currentLang as 'DE' | 'EN' | 'LA' })}
              </motion.div>
            )}

            {activeSection === 'quiz' && (
              <motion.div 
                className="min-h-screen pt-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                {renderSectionWithErrorBoundary('quiz', QuizSectionComplete, { isActive: true, language: currentLang })}
              </motion.div>
            )}

            {activeSection === 'learning' && (
              <motion.div 
                className="min-h-screen pt-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                {renderSectionWithErrorBoundary('learning', LearningSection, {})}
              </motion.div>
            )}

            {activeSection === 'visualizations' && (
              <motion.div 
                className="min-h-screen pt-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                {renderSectionWithErrorBoundary('visualizations', VisualizationsSection, { isActive: true, t: tAdapter, language: currentLang as 'DE' | 'EN' | 'LA' })}
              </motion.div>
            )}

            {/* AI SYSTEMS */}
            {activeSection === 'ai-cultural' && (
              <motion.div 
                className="min-h-screen pt-4"
                initial={{ opacity: 0, rotateX: 15 }}
                animate={{ opacity: 1, rotateX: 0 }}
                exit={{ opacity: 0, rotateX: -15 }}
                transition={{ duration: 0.6 }}
              >
                {renderSectionWithErrorBoundary('ai-cultural', AICulturalAnalysisSection, {})}
              </motion.div>
            )}

            {activeSection === 'ai-learning' && (
              <motion.div 
                className="min-h-screen pt-4"
                initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.2, rotateY: -20 }}
                transition={{ duration: 0.7 }}
              >
                {renderSectionWithErrorBoundary('ai-learning', PersonalizedLearningPathsComplete, { language: currentLang })}
              </motion.div>
            )}

            {activeSection === 'ai-tutoring' && (
              <motion.div 
                className="min-h-screen pt-4"
                initial={{ opacity: 0, x: 100, rotateZ: 5 }}
                animate={{ opacity: 1, x: 0, rotateZ: 0 }}
                exit={{ opacity: 0, x: -100, rotateZ: -5 }}
                transition={{ duration: 0.6 }}
              >
                {renderSectionWithErrorBoundary('ai-tutoring', AITutoringSystemComplete, { language: currentLang })}
              </motion.div>
            )}

            {activeSection === 'ai-rag-assistant' && (
              <motion.div 
                className="min-h-screen pt-4"
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -100, scale: 1.1 }}
                transition={{ duration: 0.7 }}
              >
                {renderSectionWithErrorBoundary('ai-rag-assistant', KIRAGAssistentSection, {})}
              </motion.div>
            )}

            {activeSection === 'vocabulary-trainer' && (
              <motion.div 
                className="min-h-screen pt-4"
                initial={{ opacity: 0, rotateY: 30, x: 50 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: -30, x: -50 }}
                transition={{ duration: 0.6 }}
              >
                {renderSectionWithErrorBoundary('vocabulary-trainer', VocabularyTrainerComplete, { language: currentLang })}
              </motion.div>
            )}

            {activeSection === 'grammar-explainer' && (
              <motion.div 
                className="min-h-screen pt-4"
                initial={{ opacity: 0, scale: 0.7, rotateX: 20 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 1.3, rotateX: -20 }}
                transition={{ duration: 0.7 }}
              >
                {renderSectionWithErrorBoundary('grammar-explainer', GrammarExplainerComplete, { language: currentLang })}
              </motion.div>
            )}

            {activeSection === 'text-processor' && (
              <motion.div 
                className="min-h-screen pt-4"
                initial={{ opacity: 0, y: -50, rotateZ: 10 }}
                animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                exit={{ opacity: 0, y: 50, rotateZ: -10 }}
                transition={{ duration: 0.6 }}
              >
                {renderSectionWithErrorBoundary('text-processor', MacrobiusTextProcessorComplete, { language: currentLang })}
              </motion.div>
            )}

            {/* TIER3 COMPONENTS */}
            {activeSection === 'progressive-reading' && (
              <motion.div 
                className="min-h-screen pt-4"
                initial={{ opacity: 0, scale: 0.6, rotateY: 45 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.4, rotateY: -45 }}
                transition={{ duration: 0.8 }}
              >
                {renderSectionWithErrorBoundary('progressive-reading', MacrobiusProgressiveReadingTIER3Complete, { language: currentLang })}
              </motion.div>
            )}

            {activeSection === 'research-tools' && (
              <motion.div 
                className="min-h-screen pt-4"
                initial={{ opacity: 0, x: -100, y: 50, rotateX: 30 }}
                animate={{ opacity: 1, x: 0, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, x: 100, y: -50, rotateX: -30 }}
                transition={{ duration: 0.8 }}
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

        {/* CLASSICAL ABOUT MODAL */}
        <AnimatePresence>
          {showAboutModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAboutModal(false)}
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
              
              <motion.div
                className="relative max-w-5xl mx-auto max-h-[85vh] overflow-y-auto"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                transition={{ type: "spring", duration: 0.6 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                  <motion.button
                    onClick={() => setShowAboutModal(false)}
                    className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/20 transition-all duration-300 z-10"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>

                  <div className="space-y-8">
                    <div className="text-center">
                      <h2 className="text-4xl font-black text-yellow-400 mb-3">
                        {safeT('about.title')}
                      </h2>
                      <p className="text-xl text-yellow-300/90 font-light">
                        {safeT('about.subtitle')}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                        <h3 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center">
                          <Crown className="w-6 h-6 mr-2 text-yellow-400" />
                          {safeT('about.biography.title')}
                        </h3>
                        <p className="text-white/90 leading-relaxed text-justify">
                          {safeT('about.biography.text')}
                        </p>
                      </div>

                      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                        <h3 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center">
                          <Star className="w-6 h-6 mr-2 text-yellow-400" />
                          {safeT('about.works.title')}
                        </h3>
                        <p className="text-white/90 leading-relaxed text-justify">
                          {safeT('about.works.text')}
                        </p>
                      </div>
                    </div>

                    <div className="text-center">
                      <motion.button
                        onClick={() => setShowAboutModal(false)}
                        className="px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, #722F37 0%, #8B4513 100%)',
                          border: '2px solid #FFD700'
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
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

        {/* CLASSICAL CSS STYLES */}
        <style jsx global>{`
          html {
            scroll-behavior: smooth;
          }
          
          body {
            overflow-x: hidden;
            background: #0a0e1a;
          }

          /* Classical scrollbar */
          ::-webkit-scrollbar {
            width: 6px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
          }

          ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #FFD700, #FFA500);
            border-radius: 3px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #FFA500, #FF6347);
          }
        `}</style>
      </div>
    </>
  );
}