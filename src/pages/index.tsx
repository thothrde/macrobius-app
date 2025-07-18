/**
 * 🏛️ MACROBIUS - PREMIUM VISUAL DESIGN ENHANCED
 * ✅ PRESERVED: All working translations, real AI systems, error boundaries
 * 🎨 ENHANCED: Sophisticated premium visual design with advanced animations
 * 🚀 LUXURY: Professional-grade UI with cutting-edge visual effects
 * 💎 PREMIUM: Elite visual experience with sophisticated interactions
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
  
  // Modal states
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showPontanusModal, setShowPontanusModal] = useState(false);
  const [showRomeModal, setShowRomeModal] = useState(false);
  
  // Image modal state
  const [selectedImage, setSelectedImage] = useState<ImageInfo | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);

  // Mouse tracking for enhanced effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  return (
    <>
      <Head>
        <title>Macrobius - Kulturelle Schätze der Antike</title>
        <meta name="description" content="Entdecken Sie die Kulturschätze der Antike" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* PREMIUM EVENING SKY BACKGROUND WITH ADVANCED EFFECTS */}
      <div className="min-h-screen relative overflow-x-hidden" style={{
        background: 'radial-gradient(ellipse at center top, #1a1a2e 0%, #16213e 25%, #0d1b2a 50%, #0c1821 75%, #0a0e1a 100%)'
      }}>
        
        {/* Dynamic Mouse-Following Gradient */}
        <div 
          className="fixed inset-0 z-0 pointer-events-none opacity-30"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 69, 19, 0.15), rgba(218, 165, 32, 0.1), transparent 50%)`
          }}
        />

        {/* ENHANCED PREMIUM STARFIELD */}
        <div className="fixed inset-0 z-0">
          {/* Premium twinkling stars with varied sizes */}
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={`premium-star-${i}`}
              className={`absolute rounded-full ${
                i % 4 === 0 ? 'w-1 h-1 bg-yellow-300' :
                i % 4 === 1 ? 'w-0.5 h-0.5 bg-blue-200' :
                i % 4 === 2 ? 'w-1.5 h-1.5 bg-purple-300' : 
                'w-0.5 h-0.5 bg-white'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                ease: "easeInOut",
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
          
          {/* Premium constellation patterns */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`constellation-${i}`}
              className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 opacity-80"
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${15 + Math.random() * 70}%`,
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.5, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                ease: "easeInOut",
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
          
          {/* Shooting stars */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`shooting-star-${i}`}
              className="absolute w-2 h-0.5 bg-gradient-to-r from-cyan-300 to-transparent rounded-full"
              style={{
                right: '-20px',
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                x: [0, -window.innerWidth - 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                ease: "linear",
                repeat: Infinity,
                delay: Math.random() * 10 + 5,
              }}
            />
          ))}
        </div>

        {/* PREMIUM ROTATING ASTROLABE WITH ADVANCED EFFECTS */}
        <div className="fixed inset-0 z-1 flex items-center justify-center pointer-events-none">
          <motion.div 
            className="relative"
            animate={{ 
              rotate: astrolabeRotation,
              scale: [1, 1.02, 1],
            }}
            transition={{ 
              rotate: { duration: 3, ease: "easeInOut" },
              scale: { duration: 15, ease: "easeInOut", repeat: Infinity }
            }}
          >
            {/* Glow effect behind astrolabe */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-orange-400/5 to-yellow-400/10 rounded-full blur-3xl scale-110" />
            
            <div className="w-[2200px] h-[2200px] relative">
              <Image 
                src="/Astrolab.jpg" 
                alt="Historical Astrolabe"
                width={2200}
                height={2200}
                className="w-full h-full object-contain"
                style={{
                  filter: 'hue-rotate(240deg) saturate(0.7) brightness(0.4) contrast(1.3)',
                  mixBlendMode: 'overlay',
                  opacity: 0.6
                }}
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* PREMIUM FLOATING MACROBIUS CIRCLE WITH ENHANCED EFFECTS */}
        {activeSection === 'hero' && (
          <motion.div 
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
            animate={{ 
              y: [0, -20, 0],
              x: [0, -10, 10, 0],
              rotate: [0, 3, -3, 0]
            }}
            transition={{ 
              duration: 10,
              ease: "easeInOut", 
              repeat: Infinity 
            }}
          >
            {/* Enhanced glow effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 rounded-full blur-2xl scale-150 animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-red-400/20 rounded-full blur-xl scale-125" />
            
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-gradient-to-r from-yellow-400 via-orange-400 to-red-400 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20" />
              <Image 
                src="/MacrobiusBottle.jpg" 
                alt="Macrobius with Bottle"
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-yellow-400/10" />
            </div>
            
            {/* Orbiting particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transformOrigin: '0 0',
                }}
                animate={{
                  rotate: [0, 360],
                  x: [0, 120 * Math.cos(i * Math.PI / 3)],
                  y: [0, 120 * Math.sin(i * Math.PI / 3)],
                  opacity: [0.5, 1, 0.5]
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

        {/* PREMIUM LANGUAGE SELECTOR */}
        <motion.div 
          className="fixed top-6 right-6 z-50"
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl" />
            
            <div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 p-3 shadow-2xl">
              <div className="flex space-x-2">
                {(['DE', 'EN', 'LA'] as const).map((lang) => (
                  <motion.button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`relative px-4 py-2 rounded-xl text-sm font-bold transition-all duration-500 overflow-hidden ${
                      currentLang === lang
                        ? 'text-gray-900 shadow-lg'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {currentLang === lang && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400"
                        layoutId="languageBackground"
                        transition={{ type: "spring", duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{lang}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* PREMIUM LEFT-SIDE NAVIGATION WITH SOPHISTICATED DESIGN */}
        <motion.nav 
          className="fixed top-6 left-6 z-50 max-h-[calc(100vh-3rem)] overflow-y-auto"
          onHoverStart={() => setIsNavHovered(true)}
          onHoverEnd={() => setIsNavHovered(false)}
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative">
            {/* Enhanced glow effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-purple-500/10 rounded-3xl blur-2xl" />
            <div className={`absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-3xl transition-opacity duration-500 ${isNavHovered ? 'opacity-100' : 'opacity-0'}`} />
            
            <div className="relative bg-white/5 backdrop-blur-3xl rounded-3xl p-6 border border-white/10 shadow-2xl min-w-[280px]">
              {/* Crown icon for premium feel */}
              <div className="flex items-center justify-center mb-6">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Crown className="w-8 h-8 text-yellow-400" />
                </motion.div>
                <span className="ml-3 text-yellow-400 font-bold text-lg">MACROBIUS</span>
              </div>
              
              <div className="space-y-3">
                {/* Core Sections with enhanced styling */}
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
                    className={`group relative w-full px-6 py-4 rounded-2xl text-sm font-semibold transition-all duration-500 text-left flex items-center space-x-3 overflow-hidden ${
                      activeSection === section.id ? 'shadow-2xl' : 'hover:bg-white/5'
                    }`}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {activeSection === section.id && (
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${section.gradient} opacity-80`}
                        layoutId="navBackground"
                        transition={{ type: "spring", duration: 0.6 }}
                      />
                    )}
                    
                    <span className="relative z-10 text-2xl">{section.icon}</span>
                    <span className={`relative z-10 flex-1 ${
                      activeSection === section.id ? 'text-white font-bold' : 'text-white/80 group-hover:text-white'
                    }`}>
                      {section.text}
                    </span>
                    
                    {componentErrors[section.id] && (
                      <AlertTriangle className="relative z-10 w-4 h-4 text-red-400" />
                    )}
                    
                    {activeSection === section.id && (
                      <motion.div
                        className="relative z-10"
                        animate={{ rotate: [0, 180, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
                
                {/* Enhanced AI Systems Section */}
                <div className="border-t border-white/10 pt-4 mt-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Star className="w-5 h-5 text-blue-400" />
                    <p className="text-blue-200/80 text-xs uppercase tracking-wider font-bold">
                      {safeT('nav.ai_systems')}
                    </p>
                    <span className="text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded-full border border-green-400/30">
                      TIER-COMPLETE
                    </span>
                  </div>
                  
                  {[
                    { id: 'ai-cultural', text: safeT('nav.ai_cultural'), icon: '🧠', tier: 'ORACLE', gradient: 'from-cyan-500 to-blue-500' },
                    { id: 'ai-learning', text: safeT('nav.ai_learning'), icon: '🎯', tier: 'COMPLETE', gradient: 'from-blue-500 to-indigo-500' },
                    { id: 'ai-tutoring', text: safeT('nav.ai_tutoring'), icon: '📖', tier: 'COMPLETE', gradient: 'from-indigo-500 to-purple-500' },
                    { id: 'ai-rag-assistant', text: safeT('nav.ai_rag'), icon: '🤖', tier: 'ENHANCED', gradient: 'from-purple-500 to-pink-500' },
                    { id: 'vocabulary-trainer', text: 'Vokabeltrainer', icon: '📝', tier: 'CORPUS', gradient: 'from-pink-500 to-red-500' },
                    { id: 'grammar-explainer', text: 'Grammatik', icon: '📖', tier: 'TIER1', gradient: 'from-red-500 to-orange-500' },
                    { id: 'text-processor', text: 'Textprozessor', icon: '🔍', tier: 'TIER2', gradient: 'from-orange-500 to-yellow-500' }
                  ].map((section, index) => (
                    <motion.button
                      key={section.id}
                      onClick={() => handleSectionChange(section.id)}
                      className={`group relative w-full px-4 py-3 rounded-xl text-xs font-medium transition-all duration-500 text-left flex items-center space-x-3 mb-2 overflow-hidden ${
                        activeSection === section.id ? 'shadow-xl' : 'hover:bg-white/3'
                      }`}
                      whileHover={{ scale: 1.02, x: 3 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.05 }}
                    >
                      {activeSection === section.id && (
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${section.gradient} opacity-70`}
                          layoutId="aiNavBackground"
                          transition={{ type: "spring", duration: 0.6 }}
                        />
                      )}
                      
                      <span className="relative z-10 text-lg">{section.icon}</span>
                      <span className={`relative z-10 flex-1 text-xs ${
                        activeSection === section.id ? 'text-white font-bold' : 'text-blue-200/80 group-hover:text-blue-200'
                      }`}>
                        {section.text}
                      </span>
                      <span className="relative z-10 text-green-400 text-xs font-bold bg-green-400/10 px-1.5 py-0.5 rounded border border-green-400/30">
                        {section.tier}
                      </span>
                      
                      {componentErrors[section.id] && (
                        <AlertTriangle className="relative z-10 w-3 h-3 text-red-400" />
                      )}
                    </motion.button>
                  ))}
                </div>
                
                {/* Enhanced TIER3 Platform Section */}
                <div className="border-t border-white/10 pt-4 mt-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Crown className="w-5 h-5 text-purple-400" />
                    <p className="text-purple-200/80 text-xs uppercase tracking-wider font-bold">
                      TIER3 PLATTFORM
                    </p>
                    <span className="text-purple-400 text-xs font-bold bg-purple-400/10 px-2 py-1 rounded-full border border-purple-400/30">
                      FORTGESCHRITTEN
                    </span>
                  </div>
                  
                  {[
                    { id: 'progressive-reading', text: 'Progressives Lesen', icon: '📚', tier: 'TIER3', gradient: 'from-purple-600 to-violet-600' },
                    { id: 'research-tools', text: 'Forschungstools', icon: '🔬', tier: 'TIER3', gradient: 'from-violet-600 to-purple-600' }
                  ].map((section, index) => (
                    <motion.button
                      key={section.id}
                      onClick={() => handleSectionChange(section.id)}
                      className={`group relative w-full px-4 py-3 rounded-xl text-xs font-medium transition-all duration-500 text-left flex items-center space-x-3 mb-2 overflow-hidden ${
                        activeSection === section.id ? 'shadow-xl' : 'hover:bg-white/3'
                      }`}
                      whileHover={{ scale: 1.02, x: 3 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 + index * 0.1 }}
                    >
                      {activeSection === section.id && (
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${section.gradient} opacity-80`}
                          layoutId="tier3NavBackground"
                          transition={{ type: "spring", duration: 0.6 }}
                        />
                      )}
                      
                      <span className="relative z-10 text-lg">{section.icon}</span>
                      <span className={`relative z-10 flex-1 text-xs ${
                        activeSection === section.id ? 'text-white font-bold' : 'text-purple-200/80 group-hover:text-purple-200'
                      }`}>
                        {section.text}
                      </span>
                      <span className="relative z-10 text-purple-400 text-xs font-bold bg-purple-400/10 px-1.5 py-0.5 rounded border border-purple-400/30">
                        {section.tier}
                      </span>
                      
                      {componentErrors[section.id] && (
                        <AlertTriangle className="relative z-10 w-3 h-3 text-red-400" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Enhanced Oracle Cloud Status */}
              <motion.div 
                className="mt-6 pt-6 border-t border-white/10"
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(34, 197, 94, 0.2)',
                    '0 0 30px rgba(34, 197, 94, 0.4)',
                    '0 0 20px rgba(34, 197, 94, 0.2)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="bg-green-500/10 border border-green-400/30 rounded-2xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <motion.div 
                      className="w-3 h-3 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-white font-bold text-sm">Oracle Cloud</span>
                    <span className="text-green-400 font-bold text-xs bg-green-400/10 px-2 py-1 rounded border border-green-400/30">
                      TIER-COMPLETE
                    </span>
                  </div>
                  <p className="text-white/70 text-xs leading-relaxed">
                    {safeT('nav.oracle_status')}
                  </p>
                  <p className="text-green-400/90 text-xs font-semibold mt-1">
                    Real AI Systems Operational
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.nav>

        {/* MAIN CONTENT WITH ENHANCED TRANSITIONS */}
        <main className="relative z-10">
          {/* PREMIUM HERO SECTION */}
          {activeSection === 'hero' && (
            <motion.section 
              className="min-h-screen flex items-center justify-center px-6"
              style={{ paddingTop: '240px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
              <div className="text-center max-w-8xl mx-auto">
                {/* Premium main card with advanced effects */}
                <motion.div 
                  className="relative"
                  initial={{ scale: 0.9, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  {/* Multiple glow layers */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-orange-400/5 to-red-400/10 rounded-[3rem] blur-3xl scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/3 to-purple-500/5 rounded-[3rem] blur-2xl" />
                  
                  <div className="relative bg-white/5 backdrop-blur-3xl rounded-[3rem] p-12 border border-white/10 shadow-2xl">
                    {/* Premium title section */}
                    <motion.div 
                      className="mb-12"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.6 }}
                    >
                      <motion.h1 
                        className="text-7xl md:text-9xl font-black mb-6 tracking-tight"
                        style={{
                          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 25%, #FF6347 50%, #FF4500 75%, #DC143C 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.3))'
                        }}
                        animate={{ 
                          textShadow: [
                            '0 0 20px rgba(255, 215, 0, 0.5)',
                            '0 0 40px rgba(255, 215, 0, 0.8)',
                            '0 0 20px rgba(255, 215, 0, 0.5)'
                          ]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        Macrobius
                      </motion.h1>
                      
                      <motion.h2 
                        className="text-3xl md:text-5xl text-yellow-300 mb-8 font-light leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                      >
                        {safeT('hero.subtitle')}
                      </motion.h2>
                      
                      <motion.h3 
                        className="text-xl md:text-2xl text-yellow-200/90 mb-6 font-medium leading-relaxed max-w-4xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                      >
                        {safeT('hero.description')}
                      </motion.h3>

                      {/* Premium TIER-COMPLETE Badge */}
                      <motion.div 
                        className="inline-flex items-center px-6 py-3 rounded-2xl text-sm font-bold mb-8 relative overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
                          border: '2px solid rgba(34, 197, 94, 0.3)'
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.8, delay: 1.2 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
                        <motion.div
                          className="w-3 h-3 bg-green-400 rounded-full mr-3"
                          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-green-300 relative z-10">
                          HYBRID TIER-COMPLETE - Advanced Components + Working Features
                        </span>
                      </motion.div>
                    </motion.div>

                    {/* Enhanced Cultural Story */}
                    <motion.div 
                      className="max-w-5xl mx-auto mb-12"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 1.4 }}
                    >
                      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                        <p className="text-lg md:text-xl text-white/90 leading-relaxed text-justify font-light">
                          {safeT('cultural_story')}
                        </p>
                      </div>
                    </motion.div>

                    {/* Enhanced Picture Gallery */}
                    <motion.div 
                      className="mb-12"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 1.6 }}
                    >
                      <div className="flex items-center justify-center space-x-4 mb-8">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                          <ImageIcon className="w-8 h-8 text-yellow-300" />
                        </motion.div>
                        <h4 className="text-2xl font-bold text-yellow-200">
                          {safeT('hero.cultural_treasures')}
                        </h4>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <Eye className="w-8 h-8 text-yellow-300" />
                        </motion.div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {/* Enhanced Rome Image */}
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.8, duration: 0.8 }}
                          className="md:col-span-2 lg:col-span-1"
                        >
                          <motion.div
                            className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-2xl"
                            style={{
                              border: '3px solid transparent',
                              background: 'linear-gradient(135deg, rgba(255, 165, 0, 0.8), rgba(255, 69, 0, 0.8)) border-box',
                            }}
                            whileHover={{ scale: 1.03, y: -10, rotateY: 5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowRomeModal(true)}
                          >
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <Image
                              src="/Rome-under.jpg"
                              alt={safeT('image.rome.title')}
                              width={500}
                              height={350}
                              className="w-full h-72 object-cover object-center transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                              <div className="absolute bottom-0 left-0 right-0 p-8">
                                <h3 className="text-white font-bold text-2xl mb-3">{safeT('image.rome.title')}</h3>
                                <p className="text-white/95 text-sm leading-relaxed">{safeT('image.rome.subtitle')}</p>
                              </div>
                            </div>
                            
                            <motion.div 
                              className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-2xl p-3 opacity-0 group-hover:opacity-100 transition-all duration-500"
                              whileHover={{ scale: 1.2, rotate: 180 }}
                            >
                              <Maximize className="w-6 h-6 text-white" />
                            </motion.div>
                          </motion.div>
                        </motion.div>
                        
                        {/* Enhanced Macrobius Portrait */}
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2, duration: 0.8 }}
                        >
                          <motion.div
                            className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-2xl"
                            style={{
                              border: '3px solid transparent',
                              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.8), rgba(255, 140, 0, 0.8)) border-box',
                            }}
                            whileHover={{ scale: 1.03, y: -8, rotateY: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowAboutModal(true)}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <Image
                              src="/MacrobiusBottle.jpg"
                              alt={safeT('image.macrobius.title')}
                              width={500}
                              height={600}
                              className="w-full h-80 object-contain transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/90 via-yellow-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                              <div className="absolute bottom-0 left-0 right-0 p-8">
                                <h3 className="text-white font-bold text-xl mb-3">{safeT('image.macrobius.title')}</h3>
                                <p className="text-white/95 text-sm leading-relaxed">{safeT('image.macrobius.subtitle')}</p>
                              </div>
                            </div>
                            
                            <motion.div 
                              className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-2xl p-3 opacity-0 group-hover:opacity-100 transition-all duration-500"
                              whileHover={{ scale: 1.2, rotate: 180 }}
                            >
                              <Maximize className="w-6 h-6 text-white" />
                            </motion.div>
                          </motion.div>
                        </motion.div>

                        {/* Enhanced Tycho & Pontanus */}
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2.2, duration: 0.8 }}
                        >
                          <motion.div
                            className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-2xl"
                            style={{
                              border: '3px solid transparent',
                              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8)) border-box',
                            }}
                            whileHover={{ scale: 1.03, y: -8, rotateY: 5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowPontanusModal(true)}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <Image
                              src="/TychoAssistent.jpg"
                              alt={safeT('image.tycho.title')}
                              width={500}
                              height={600}
                              className="w-full h-80 object-contain transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                              <div className="absolute bottom-0 left-0 right-0 p-8">
                                <h3 className="text-white font-bold text-xl mb-3">{safeT('image.tycho.title')}</h3>
                                <p className="text-white/95 text-sm leading-relaxed">{safeT('image.tycho.subtitle')}</p>
                              </div>
                            </div>
                            
                            <motion.div 
                              className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-2xl p-3 opacity-0 group-hover:opacity-100 transition-all duration-500"
                              whileHover={{ scale: 1.2, rotate: 180 }}
                            >
                              <Maximize className="w-6 h-6 text-white" />
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Premium Action Buttons */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 2.4 }}
                >
                  <motion.button
                    onClick={() => handleSectionChange('banquet')}
                    className="group relative px-10 py-5 text-xl font-bold rounded-2xl transition-all duration-500 shadow-2xl overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #722F37 0%, #8B4513 50%, #722F37 100%)',
                      border: '2px solid #FFD700'
                    }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 text-yellow-400 group-hover:text-yellow-300">
                      {safeT('hero.explore_works')}
                    </span>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setShowAboutModal(true)}
                    className="group relative px-10 py-5 text-xl font-bold rounded-2xl transition-all duration-500 shadow-2xl overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #722F37 0%, #8B4513 50%, #722F37 100%)',
                      border: '2px solid #FFD700'
                    }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 text-yellow-400 group-hover:text-yellow-300">
                      {safeT('hero.learn_more')}
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.section>
          )}

          {/* ALL OTHER SECTIONS WITH ENHANCED TRANSITIONS */}
          <AnimatePresence mode="wait">
            {activeSection === 'search' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
              >
                {renderSectionWithErrorBoundary('search', TextSearchSection, { isActive: true, t: tAdapter, language: currentLang as 'DE' | 'EN' | 'LA' })}
              </motion.div>
            )}

            {activeSection === 'cosmos' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
              >
                {renderSectionWithErrorBoundary('cosmos', CosmosSection, { isActive: true, t: tAdapter, language: currentLang as 'DE' | 'EN' | 'LA' })}
              </motion.div>
            )}

            {activeSection === 'banquet' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
                {renderSectionWithErrorBoundary('banquet', BanquetSection, { isActive: true, t: tAdapter, language: currentLang as 'DE' | 'EN' | 'LA' })}
              </motion.div>
            )}

            {activeSection === 'worldmap' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, rotateY: 15 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -15 }}
                transition={{ duration: 0.6 }}
              >
                {renderSectionWithErrorBoundary('worldmap', WorldMapSection, { isActive: true, t: tAdapter, language: currentLang as 'DE' | 'EN' | 'LA' })}
              </motion.div>
            )}

            {activeSection === 'quiz' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                {renderSectionWithErrorBoundary('quiz', QuizSectionComplete, { isActive: true, language: currentLang })}
              </motion.div>
            )}

            {activeSection === 'learning' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.6 }}
              >
                {renderSectionWithErrorBoundary('learning', LearningSection, {})}
              </motion.div>
            )}

            {activeSection === 'visualizations' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6 }}
              >
                {renderSectionWithErrorBoundary('visualizations', VisualizationsSection, { isActive: true, t: tAdapter, language: currentLang as 'DE' | 'EN' | 'LA' })}
              </motion.div>
            )}

            {/* AI SYSTEMS WITH ENHANCED ANIMATIONS */}
            {activeSection === 'ai-cultural' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, rotateX: 15 }}
                animate={{ opacity: 1, rotateX: 0 }}
                exit={{ opacity: 0, rotateX: -15 }}
                transition={{ duration: 0.7 }}
              >
                {renderSectionWithErrorBoundary('ai-cultural', AICulturalAnalysisSection, {})}
              </motion.div>
            )}

            {activeSection === 'ai-learning' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.2, rotateY: -20 }}
                transition={{ duration: 0.8 }}
              >
                {renderSectionWithErrorBoundary('ai-learning', PersonalizedLearningPathsComplete, { language: currentLang })}
              </motion.div>
            )}

            {activeSection === 'ai-tutoring' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, x: 100, rotateZ: 5 }}
                animate={{ opacity: 1, x: 0, rotateZ: 0 }}
                exit={{ opacity: 0, x: -100, rotateZ: -5 }}
                transition={{ duration: 0.7 }}
              >
                {renderSectionWithErrorBoundary('ai-tutoring', AITutoringSystemComplete, { language: currentLang })}
              </motion.div>
            )}

            {activeSection === 'ai-rag-assistant' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -100, scale: 1.1 }}
                transition={{ duration: 0.8 }}
              >
                {renderSectionWithErrorBoundary('ai-rag-assistant', KIRAGAssistentSection, {})}
              </motion.div>
            )}

            {activeSection === 'vocabulary-trainer' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, rotateY: 30, x: 50 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: -30, x: -50 }}
                transition={{ duration: 0.7 }}
              >
                {renderSectionWithErrorBoundary('vocabulary-trainer', VocabularyTrainerComplete, { language: currentLang })}
              </motion.div>
            )}

            {activeSection === 'grammar-explainer' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, scale: 0.7, rotateX: 20 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 1.3, rotateX: -20 }}
                transition={{ duration: 0.8 }}
              >
                {renderSectionWithErrorBoundary('grammar-explainer', GrammarExplainerComplete, { language: currentLang })}
              </motion.div>
            )}

            {activeSection === 'text-processor' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, y: -50, rotateZ: 10 }}
                animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                exit={{ opacity: 0, y: 50, rotateZ: -10 }}
                transition={{ duration: 0.7 }}
              >
                {renderSectionWithErrorBoundary('text-processor', MacrobiusTextProcessorComplete, { language: currentLang })}
              </motion.div>
            )}

            {/* TIER3 COMPONENTS WITH PREMIUM ANIMATIONS */}
            {activeSection === 'progressive-reading' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, scale: 0.6, rotateY: 45 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.4, rotateY: -45 }}
                transition={{ duration: 1 }}
              >
                {renderSectionWithErrorBoundary('progressive-reading', MacrobiusProgressiveReadingTIER3Complete, { language: currentLang })}
              </motion.div>
            )}

            {activeSection === 'research-tools' && (
              <motion.div 
                className="min-h-screen pt-6"
                initial={{ opacity: 0, x: -100, y: 50, rotateX: 30 }}
                animate={{ opacity: 1, x: 0, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, x: 100, y: -50, rotateX: -30 }}
                transition={{ duration: 1 }}
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

        {/* PREMIUM ABOUT MODAL */}
        <AnimatePresence>
          {showAboutModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAboutModal(false)}
            >
              <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
              
              <motion.div
                className="relative max-w-7xl mx-auto max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.7, y: 100, rotateX: 15 }}
                animate={{ scale: 1, y: 0, rotateX: 0 }}
                exit={{ scale: 0.7, y: 100, rotateX: 15 }}
                transition={{ type: "spring", duration: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Glow effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-orange-400/5 to-red-400/10 rounded-[4rem] blur-3xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/3 to-purple-500/5 rounded-[4rem] blur-2xl" />
                
                <div className="relative bg-white/5 backdrop-blur-3xl rounded-[4rem] p-12 border border-white/10 shadow-2xl">
                  <motion.button
                    onClick={() => setShowAboutModal(false)}
                    className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/20 transition-all duration-500 z-10 group"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                  </motion.button>

                  <div className="space-y-12">
                    <motion.div 
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h2 className="text-5xl font-black text-yellow-400 mb-4 tracking-tight">
                        {safeT('about.title')}
                      </h2>
                      <p className="text-2xl text-yellow-300/90 font-light leading-relaxed">
                        {safeT('about.subtitle')}
                      </p>
                      <motion.div 
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-2xl text-green-300 text-lg font-bold mt-6"
                        animate={{ 
                          boxShadow: [
                            '0 0 20px rgba(34, 197, 94, 0.3)',
                            '0 0 40px rgba(34, 197, 94, 0.6)',
                            '0 0 20px rgba(34, 197, 94, 0.3)'
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <motion.span 
                          className="w-3 h-3 bg-green-400 rounded-full mr-3"
                          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        HYBRID TIER-COMPLETE - Advanced AI + Working Features
                      </motion.div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
                      >
                        <h3 className="text-3xl font-bold text-yellow-400 mb-6 flex items-center">
                          <Crown className="w-8 h-8 mr-3 text-yellow-400" />
                          {safeT('about.biography.title')}
                        </h3>
                        <p className="text-white/90 leading-relaxed text-justify text-lg">
                          {safeT('about.biography.text')}
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
                      >
                        <h3 className="text-3xl font-bold text-yellow-400 mb-6 flex items-center">
                          <Star className="w-8 h-8 mr-3 text-yellow-400" />
                          {safeT('about.works.title')}
                        </h3>
                        <p className="text-white/90 leading-relaxed text-justify text-lg">
                          {safeT('about.works.text')}
                        </p>
                      </motion.div>
                    </div>

                    <motion.div 
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                    >
                      <motion.button
                        onClick={() => setShowAboutModal(false)}
                        className="group relative px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-500 shadow-2xl overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #722F37 0%, #8B4513 50%, #722F37 100%)',
                          border: '2px solid #FFD700'
                        }}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="relative z-10 text-yellow-400 group-hover:text-yellow-300">
                          {safeT('about.close')}
                        </span>
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PREMIUM CSS STYLES */}
        <style jsx global>{`
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          @keyframes twinkle {
            0%, 100% { 
              opacity: 0.2; 
              transform: scale(0.8) rotate(0deg); 
            }
            50% { 
              opacity: 1; 
              transform: scale(1.2) rotate(180deg); 
            }
          }

          @keyframes moveRightToLeft {
            0% { 
              transform: translateX(0) scale(0.5);
              opacity: 0; 
            }
            10% { 
              opacity: 0.8;
              transform: scale(1);
            }
            90% { 
              opacity: 0.6;
            }
            100% { 
              transform: translateX(calc(-100vw - 50px)) scale(0.5);
              opacity: 0; 
            }
          }

          html {
            scroll-behavior: smooth;
          }
          
          body {
            overflow-x: hidden;
            background: #0a0e1a;
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #FFD700, #FFA500);
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #FFA500, #FF6347);
          }
        `}</style>
      </div>
    </>
  );
}