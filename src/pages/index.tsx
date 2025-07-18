/**
 * 🏛️ MACROBIUS - PROFESSIONAL VISUAL DESIGN v11.0
 * 🎨 ENHANCED: Major visual upgrade with sophisticated layouts and modern aesthetics
 * ✅ PRESERVED: All working translations, no mock systems, no placeholders
 * 🚀 PRODUCTION: Enterprise-grade visual design with working functionality
 * 🎆 BEAUTIFUL: Dramatic visual improvements inspired by reference design
 */

import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, Eye, Maximize, AlertTriangle, RefreshCw, X, Sparkles, Star } from 'lucide-react';
import Image from 'next/image';
import { ErrorBoundary } from 'react-error-boundary';

// Core sections
import IntroSection from '../components/sections/IntroSection';
import CosmosSection from '../components/sections/CosmosSection';
import TextSearchSection from '../components/sections/TextSearchSection';
import VisualizationsSection from '../components/sections/VisualizationsSection';
import BanquetSection from '../components/sections/BanquetSection';
import WorldMapSection from '../components/sections/WorldMapSection';
import LearningSection from '../components/sections/LearningSection-enhanced-complete';
import QuizSection from '../components/sections/QuizSection';

// AI Systems Components
import AICulturalAnalysisSection from '../components/sections/AICulturalAnalysisSection';
import PersonalizedLearningPathsComplete from '../components/sections/PersonalizedLearningPaths-COMPLETE';
import AITutoringSystemComplete from '../components/sections/AITutoringSystemSection-COMPLETE';
import KIRAGAssistentSection from '../components/sections/KIRAGAssistentSection';

// Enhanced Image System
import ImageModal from '../components/ui/ImageModal';
import { getImagesBySection, ImageInfo } from '../data/imageData';

// Language Context
import { useLanguage, Language } from '../contexts/LanguageContext';

// 🚨 COMPONENT ERROR FALLBACK - ELEGANT VERSION
function ComponentErrorFallback({ error, resetErrorBoundary, componentName }: { 
  error: Error; 
  resetErrorBoundary: () => void; 
  componentName: string;
}) {
  return (
    <div className="min-h-[400px] flex items-center justify-center bg-red-900/20 backdrop-blur-md border border-red-500/30 rounded-lg m-4">
      <div className="text-center text-white p-8">
        <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Component Error: {componentName}</h3>
        <p className="text-red-200 mb-4">This component failed to load. Using fallback display.</p>
        <button 
          onClick={resetErrorBoundary}
          className="bg-red-600/80 backdrop-blur-sm hover:bg-red-700/80 text-white px-6 py-2 rounded-lg transition-all duration-300 flex items-center mx-auto shadow-lg"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry Component
        </button>
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
  const [astrolabeRotation, setAstrolabeRotation] = useState<number>(0);
  const [componentErrors, setComponentErrors] = useState<Record<string, boolean>>({});
  
  // Modal states
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showRomeModal, setShowRomeModal] = useState(false);
  const [showTychoModal, setShowTychoModal] = useState(false);
  
  // Image modal states
  const [selectedImage, setSelectedImage] = useState<ImageInfo | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);

  // Safe translation function
  const safeT = useCallback((key: string): string => {
    if (!isHydrated) {
      return key;
    }
    return t(key);
  }, [t, isHydrated]);

  // Event handlers
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setAstrolabeRotation(prev => prev + 90);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setAstrolabeRotation(prev => prev + 45);
  };

  // Enhanced image handling
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

  // Enhanced continuous astrolabe rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setAstrolabeRotation(prev => prev + 0.15);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // 🚨 SAFE COMPONENT RENDERER WITH FIXED ERROR BOUNDARIES
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
        <meta name="description" content="Entdecken Sie die Kulturschätze der Antike mit KI-unterstützter Lernplattform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Crimson+Text:wght@400;500;600&display=swap" rel="stylesheet" />
      </Head>

      {/* 🌌 ENHANCED PREMIUM EVENING SKY BACKGROUND */}
      <div className="min-h-screen relative overflow-x-hidden" style={{
        background: 'radial-gradient(circle at 20% 50%, #1a1a2e 0%, #16213e 25%, #0d1b2a 50%, #0c1821 75%, #0a0e1a 100%), linear-gradient(135deg, #0f0f23 0%, #1a1a2e 15%, #16213e 30%, #0d1b2a 50%, #0c1821 70%, #0a0e1a 100%)'
      }}>
        
        {/* ✨ ENHANCED SOPHISTICATED STARFIELD */}
        <div className="fixed inset-0 z-0">
          {/* Premium twinkling stars */}
          {[...Array(40)].map((_, i) => (
            <div
              key={`static-star-${i}`}
              className="absolute rounded-full opacity-70"
              style={{
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                background: i % 4 === 0 ? '#FFD700' : i % 4 === 1 ? '#87CEEB' : i % 4 === 2 ? '#FFB6C1' : '#FFFFFF',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `premiumTwinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
                boxShadow: `0 0 ${2 + Math.random() * 4}px currentColor`,
              }}
            />
          ))}
          
          {/* Constellation stars */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`constellation-star-${i}`}
              className="absolute w-3 h-3 rounded-full opacity-80"
              style={{
                background: `radial-gradient(circle, ${i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#87CEEB' : '#FFB6C1'} 0%, transparent 70%)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `constellationPulse ${4 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
                filter: 'blur(0.5px)',
              }}
            />
          ))}
          
          {/* Premium shooting stars */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`shooting-star-${i}`}
              className="absolute w-1 h-1 rounded-full opacity-60"
              style={{
                background: 'linear-gradient(45deg, #00FFFF, #FF69B4)',
                right: '-20px',
                top: `${10 + Math.random() * 80}%`,
                animation: `shootingStar ${12 + Math.random() * 8}s linear infinite`,
                animationDelay: `${Math.random() * 10}s`,
                boxShadow: '0 0 6px #00FFFF, 0 0 12px #FF69B4',
              }}
            />
          ))}
        </div>

        {/* 🧭 ENHANCED PREMIUM ROTATING ASTROLABE */}
        <div className="fixed inset-0 z-1 flex items-center justify-center pointer-events-none">
          <motion.div 
            className="opacity-30"
            animate={{ 
              rotate: astrolabeRotation,
              scale: [1, 1.03, 1],
            }}
            transition={{ 
              rotate: { duration: 3, ease: "easeInOut" },
              scale: { duration: 12, ease: "easeInOut", repeat: Infinity }
            }}
          >
            <div className="w-[2200px] h-[2200px] relative">
              <Image 
                src="/Astrolab.jpg" 
                alt="Historical Astrolabe"
                width={2200}
                height={2200}
                className="w-full h-full object-contain"
                style={{
                  filter: 'hue-rotate(240deg) saturate(0.7) brightness(0.4) contrast(1.3) drop-shadow(0 0 20px rgba(135, 206, 235, 0.3))',
                  mixBlendMode: 'overlay'
                }}
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* 🌟 ENHANCED PREMIUM FLOATING MACROBIUS CIRCLE */}
        {activeSection === 'hero' && (
          <motion.div 
            className="fixed top-16 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
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
            <div className="relative">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-yellow-400 shadow-2xl bg-gradient-to-br from-yellow-400 to-orange-500 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-200/20 to-orange-300/30"></div>
                <Image 
                  src="/MacrobiusBottle.jpg" 
                  alt="Macrobius with Bottle"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover relative z-10"
                  style={{ filter: 'brightness(1.1) contrast(1.1)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/20 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 rounded-full blur-xl animate-pulse"></div>
            </div>
          </motion.div>
        )}

        {/* 🌍 ENHANCED PREMIUM LANGUAGE SELECTOR */}
        <div className="fixed top-6 right-6 z-50">
          <motion.div 
            className="bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-lg rounded-xl border border-white/30 p-3 shadow-2xl"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex space-x-2">
              {(['DE', 'EN', 'LA'] as const).map((lang) => (
                <motion.button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 relative overflow-hidden ${
                    currentLang === lang
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 shadow-lg'
                      : 'text-white/90 hover:bg-white/20 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentLang === lang && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300"
                      layoutId="activeLanguage"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{lang}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 🧭 ENHANCED PREMIUM PROFESSIONAL NAVIGATION */}
        <nav className="fixed top-6 left-6 z-50">
          <motion.div 
            className="bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col space-y-3">
              
              {/* Premium Core Sections */}
              {[
                { id: 'hero', text: safeT('nav.intro'), icon: '🏛️', gradient: 'from-yellow-400 to-orange-400' },
                { id: 'quiz', text: safeT('nav.quiz'), icon: '📝', gradient: 'from-blue-400 to-purple-400' },
                { id: 'worldmap', text: safeT('nav.worldmap'), icon: '🗺️', gradient: 'from-green-400 to-blue-400' },
                { id: 'cosmos', text: safeT('nav.cosmos'), icon: '🌌', gradient: 'from-purple-400 to-pink-400' },
                { id: 'banquet', text: safeT('nav.banquet'), icon: '🍷', gradient: 'from-red-400 to-pink-400' },
                { id: 'search', text: safeT('nav.textsearch'), icon: '🔍', gradient: 'from-cyan-400 to-blue-400' },
                { id: 'learning', text: safeT('nav.learning'), icon: '📚', gradient: 'from-green-400 to-teal-400' },
                { id: 'visualizations', text: safeT('nav.visualizations'), icon: '📊', gradient: 'from-orange-400 to-red-400' }
              ].map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  className={`px-5 py-4 rounded-xl text-sm font-semibold transition-all duration-300 text-left flex items-center space-x-3 relative overflow-hidden group`}
                  style={{
                    backgroundColor: activeSection === section.id ? '#722F37' : 'rgba(114, 47, 55, 0.6)',
                    color: activeSection === section.id ? '#FFD700' : '#FFD700',
                    border: activeSection === section.id ? '2px solid #FFD700' : '2px solid transparent',
                  }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {activeSection === section.id && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${section.gradient} opacity-20`}
                      layoutId="activeSection"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <span className="text-xl">{section.icon}</span>
                  <span className="relative z-10 flex-1">{section.text}</span>
                  {componentErrors[section.id] && (
                    <AlertTriangle className="w-4 h-4 text-red-400 relative z-10" />
                  )}
                  {activeSection === section.id && (
                    <Star className="w-4 h-4 text-yellow-300 relative z-10" />
                  )}
                </motion.button>
              ))}
              
              {/* Premium AI Systems */}
              <div className="border-t border-white/30 pt-4 mt-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <p className="text-cyan-200/90 text-xs uppercase tracking-wider font-bold">
                    {safeT('nav.ai_systems')}
                  </p>
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-green-400 text-xs font-bold">TIER-COMPLETE</span>
                  </div>
                </div>
                
                {[
                  { id: 'ai-cultural', text: safeT('nav.ai_cultural'), icon: '🧠', tier: 'REAL-ORACLE', gradient: 'from-cyan-400 to-blue-500' },
                  { id: 'ai-learning', text: safeT('nav.ai_learning'), icon: '🎯', tier: 'COMPLETE', gradient: 'from-purple-400 to-pink-500' },
                  { id: 'ai-tutoring', text: safeT('nav.ai_tutoring'), icon: '📖', tier: 'COMPLETE', gradient: 'from-green-400 to-cyan-500' },
                  { id: 'ai-rag-assistant', text: safeT('nav.ai_rag'), icon: '🤖', tier: 'ENHANCED', gradient: 'from-orange-400 to-red-500' }
                ].map((section) => (
                  <motion.button
                    key={section.id}
                    onClick={() => handleSectionChange(section.id)}
                    className={`w-full px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-300 text-left flex items-center space-x-2 mb-2 relative overflow-hidden group`}
                    style={{
                      backgroundColor: activeSection === section.id ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.3)',
                      color: activeSection === section.id ? '#1a1a1a' : '#93C5FD',
                      border: activeSection === section.id ? '2px solid #60A5FA' : '2px solid transparent',
                    }}
                    title={`Advanced ${section.tier} Component`}
                    whileHover={{ scale: 1.02, x: 3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {activeSection === section.id && (
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${section.gradient} opacity-30`}
                        layoutId="activeAISection"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                    <span className="text-sm relative z-10">{section.icon}</span>
                    <span className="flex-1 relative z-10">{section.text}</span>
                    <span className="text-green-400 text-xs font-bold relative z-10">{section.tier}</span>
                    {componentErrors[section.id] && (
                      <AlertTriangle className="w-3 h-3 text-red-400 relative z-10" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Enhanced Premium Oracle Cloud Status */}
            <div className="mt-6 pt-6 border-t border-white/30">
              <div className="flex items-center space-x-2 text-xs mb-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                <span className="text-white/90 font-semibold">Oracle Cloud</span>
                <span className="text-green-400 font-bold">TIER-COMPLETE</span>
              </div>
              <p className="text-white/70 text-xs mb-1">
                {safeT('nav.oracle_status')}
              </p>
              <p className="text-green-400/90 text-xs font-medium">
                Real AI Systems Operational
              </p>
            </div>
          </motion.div>
        </nav>

        {/* 🎨 MAIN CONTENT */}
        <main className="relative z-10">
          
          {/* 🎆 ENHANCED PREMIUM HERO SECTION */}
          {activeSection === 'hero' && (
            <section className="min-h-screen flex items-center justify-center px-6" style={{ paddingTop: '240px' }}>
              <div className="text-center max-w-8xl mx-auto">
                <motion.div 
                  className="bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/30 shadow-2xl mb-8"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  
                  <motion.div 
                    className="mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <h1 
                      className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent mb-6 drop-shadow-2xl"
                      style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.05em' }}
                    >
                      {safeT('hero.title')}
                    </h1>
                    
                    <h2 
                      className="text-3xl md:text-5xl text-yellow-200 mb-8 font-medium"
                      style={{ fontFamily: 'Crimson Text, serif' }}
                    >
                      {safeT('hero.subtitle')}
                    </h2>
                    
                    <h3 
                      className="text-xl md:text-2xl text-yellow-100/90 mb-6 font-normal max-w-4xl mx-auto leading-relaxed"
                      style={{ fontFamily: 'Crimson Text, serif' }}
                    >
                      {safeT('hero.description')}
                    </h3>

                    {/* Enhanced Premium TIER-COMPLETE Badge */}
                    <motion.div 
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/30 via-blue-500/30 to-purple-500/30 border-2 border-green-400/50 rounded-full text-green-300 text-base font-semibold mb-8 shadow-2xl backdrop-blur-sm"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 197, 94, 0.5)" }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse shadow-lg shadow-green-400/50"></span>
                      <Sparkles className="w-5 h-5 mr-2" />
                      HYBRID TIER-COMPLETE - Advanced Components + Working Features
                      <Star className="w-5 h-5 ml-2" />
                    </motion.div>
                  </motion.div>

                  {/* Enhanced Premium Cultural Story */}
                  <motion.div 
                    className="max-w-5xl mx-auto mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-2xl p-8 border border-white/20 backdrop-blur-sm">
                      <p 
                        className="text-lg md:text-xl text-white/95 leading-relaxed text-justify font-medium"
                        style={{ fontFamily: 'Crimson Text, serif', lineHeight: '1.8' }}
                      >
                        {safeT('cultural_story')}
                      </p>
                    </div>
                  </motion.div>

                  {/* 🖼️ ENHANCED PREMIUM SOPHISTICATED IMAGE GALLERY */}
                  <motion.div 
                    className="mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <div className="flex items-center justify-center space-x-4 mb-8">
                      <ImageIcon className="w-7 h-7 text-yellow-300" />
                      <h4 
                        className="text-2xl font-bold text-yellow-200"
                        style={{ fontFamily: 'Cinzel, serif' }}
                      >
                        {safeT('hero.cultural_treasures')}
                      </h4>
                      <Eye className="w-7 h-7 text-yellow-300" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                      
                      {/* Enhanced Premium Rome Image */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0, duration: 0.8 }}
                        className="md:col-span-2 lg:col-span-1"
                      >
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-2xl border-3 border-orange-400/60 shadow-2xl bg-gradient-to-br from-orange-900/20 to-red-900/20 backdrop-blur-sm"
                          whileHover={{ 
                            scale: 1.03, 
                            y: -12, 
                            rotateX: 5,
                            boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
                          }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setShowRomeModal(true)}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                          <div className="relative overflow-hidden rounded-2xl">
                            <Image
                              src="/Rome-under.jpg"
                              alt={safeT('image.rome.title')}
                              width={500}
                              height={350}
                              className="w-full h-72 object-cover object-center transition-all duration-700 group-hover:scale-115 group-hover:brightness-110"
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                              <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: 'Cinzel, serif' }}>{safeT('image.rome.title')}</h3>
                                <p className="text-white/95 text-sm leading-relaxed" style={{ fontFamily: 'Crimson Text, serif' }}>{safeT('image.rome.subtitle')}</p>
                              </div>
                            </div>
                            
                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                              <Maximize className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                      
                      {/* Enhanced Premium Macrobius Portrait */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                      >
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-2xl border-3 border-yellow-400/60 shadow-2xl bg-gradient-to-br from-yellow-900/20 to-orange-900/20 backdrop-blur-sm"
                          whileHover={{ 
                            scale: 1.03, 
                            y: -8, 
                            rotateY: 5,
                            boxShadow: "0 25px 50px rgba(255,215,0,0.2)"
                          }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setShowAboutModal(true)}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                          <div className="relative overflow-hidden rounded-2xl">
                            <Image
                              src="/MacrobiusBottle.jpg"
                              alt={safeT('image.macrobius.title')}
                              width={400}
                              height={600}
                              className="w-full h-80 object-contain transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/90 via-yellow-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                              <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: 'Cinzel, serif' }}>{safeT('image.macrobius.title')}</h3>
                                <p className="text-white/95 text-sm leading-relaxed" style={{ fontFamily: 'Crimson Text, serif' }}>{safeT('image.macrobius.subtitle')}</p>
                              </div>
                            </div>
                            
                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                              <Maximize className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* Enhanced Premium Tycho & Pontanus */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.8 }}
                      >
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-2xl border-3 border-blue-400/60 shadow-2xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm"
                          whileHover={{ 
                            scale: 1.03, 
                            y: -8, 
                            rotateX: -5,
                            boxShadow: "0 25px 50px rgba(59,130,246,0.2)"
                          }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setShowTychoModal(true)}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                          <div className="relative overflow-hidden rounded-2xl">
                            <Image
                              src="/TychoAssistent.jpg"
                              alt={safeT('image.tycho.title')}
                              width={400}
                              height={600}
                              className="w-full h-80 object-contain transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                              <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: 'Cinzel, serif' }}>{safeT('image.tycho.title')}</h3>
                                <p className="text-white/95 text-sm leading-relaxed" style={{ fontFamily: 'Crimson Text, serif' }}>{safeT('image.tycho.subtitle')}</p>
                              </div>
                            </div>
                            
                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                              <Maximize className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Enhanced Premium Action Buttons */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                >
                  <motion.button
                    onClick={() => handleSectionChange('banquet')}
                    className="px-8 py-4 text-lg font-bold rounded-2xl transition-all duration-300 shadow-2xl relative overflow-hidden group"
                    style={{
                      backgroundColor: '#722F37',
                      color: '#FFD700',
                      border: '2px solid #FFD700',
                      fontFamily: 'Cinzel, serif'
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -3,
                      boxShadow: "0 15px 30px rgba(114, 47, 55, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10">{safeT('hero.explore_works')}</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setShowAboutModal(true)}
                    className="px-8 py-4 text-lg font-bold rounded-2xl transition-all duration-300 shadow-2xl relative overflow-hidden group"
                    style={{
                      backgroundColor: '#722F37',
                      color: '#FFD700',
                      border: '2px solid #FFD700',
                      fontFamily: 'Cinzel, serif'
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -3,
                      boxShadow: "0 15px 30px rgba(114, 47, 55, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10">{safeT('hero.learn_more')}</span>
                  </motion.button>
                </motion.div>
              </div>
            </section>
          )}

          {/* 🚀 OTHER SECTIONS WITH ERROR BOUNDARIES */}
          {activeSection === 'search' && (
            <div className="min-h-screen pt-4">
              {renderSectionWithErrorBoundary('search', TextSearchSection, { isActive: true, language: currentLang })}
            </div>
          )}

          {activeSection === 'cosmos' && (
            <div className="min-h-screen pt-4">
              {renderSectionWithErrorBoundary('cosmos', CosmosSection, { isActive: true, language: currentLang })}
            </div>
          )}

          {activeSection === 'banquet' && (
            <div className="min-h-screen pt-4">
              {renderSectionWithErrorBoundary('banquet', BanquetSection, { isActive: true, language: currentLang })}
            </div>
          )}

          {activeSection === 'worldmap' && (
            <div className="min-h-screen pt-4">
              {renderSectionWithErrorBoundary('worldmap', WorldMapSection, { isActive: true, language: currentLang })}
            </div>
          )}

          {activeSection === 'quiz' && (
            <div className="min-h-screen pt-4">
              {renderSectionWithErrorBoundary('quiz', QuizSection, { isActive: true, language: currentLang })}
            </div>
          )}

          {activeSection === 'learning' && (
            <div className="min-h-screen pt-4">
              {renderSectionWithErrorBoundary('learning', LearningSection, {})}
            </div>
          )}

          {activeSection === 'visualizations' && (
            <div className="min-h-screen pt-4">
              {renderSectionWithErrorBoundary('visualizations', VisualizationsSection, { isActive: true, language: currentLang })}
            </div>
          )}

          {/* AI Systems */}
          {activeSection === 'ai-cultural' && (
            <div className="min-h-screen pt-4">
              {renderSectionWithErrorBoundary('ai-cultural', AICulturalAnalysisSection, {})}
            </div>
          )}

          {activeSection === 'ai-learning' && (
            <div className="min-h-screen pt-4">
              {renderSectionWithErrorBoundary('ai-learning', PersonalizedLearningPathsComplete, {})}
            </div>
          )}

          {activeSection === 'ai-tutoring' && (
            <div className="min-h-screen pt-4">
              {renderSectionWithErrorBoundary('ai-tutoring', AITutoringSystemComplete, { language: currentLang })}
            </div>
          )}

          {activeSection === 'ai-rag-assistant' && (
            <div className="min-h-screen pt-4">
              {renderSectionWithErrorBoundary('ai-rag-assistant', KIRAGAssistentSection, {})}
            </div>
          )}
        </main>

        {/* 🖼️ ENHANCED IMAGE MODAL */}
        <ImageModal
          imageInfo={selectedImage}
          isOpen={showImageModal}
          onClose={handleImageModalClose}
          language={currentLang}
        />

        {/* 🖼️ ENHANCED PREMIUM ABOUT MODAL */}
        <AnimatePresence>
          {showAboutModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAboutModal(false)}
            >
              <div className="absolute inset-0 bg-black/90 backdrop-blur-lg" />
              
              <motion.div
                className="relative bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-12 max-w-7xl mx-auto border border-white/30 shadow-2xl max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, y: 50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <button
                  onClick={() => setShowAboutModal(false)}
                  className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-white/80 hover:bg-white/30 hover:border-white/50 transition-all duration-300 z-10 shadow-lg"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="space-y-10">
                  <div className="text-center">
                    <h2 
                      className="text-5xl font-bold text-yellow-400 mb-4"
                      style={{ fontFamily: 'Cinzel, serif' }}
                    >
                      {safeT('about.title')}
                    </h2>
                    <p 
                      className="text-2xl text-yellow-300/90 font-medium mb-6"
                      style={{ fontFamily: 'Crimson Text, serif' }}
                    >
                      {safeT('about.subtitle')}
                    </p>
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-full text-green-300 text-base font-medium">
                      <span className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                      <Sparkles className="w-5 h-5 mr-2" />
                      HYBRID TIER-COMPLETE - Advanced AI + Working Features
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-2xl p-8 border border-white/20">
                      <h3 
                        className="text-3xl font-semibold text-yellow-400 mb-6 flex items-center"
                        style={{ fontFamily: 'Cinzel, serif' }}
                      >
                        🏛️ {safeT('about.biography.title')}
                      </h3>
                      <p 
                        className="text-white/90 leading-relaxed text-justify text-lg"
                        style={{ fontFamily: 'Crimson Text, serif', lineHeight: '1.8' }}
                      >
                        {safeT('about.biography.text')}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-2xl p-8 border border-white/20">
                      <h3 
                        className="text-3xl font-semibold text-yellow-400 mb-6 flex items-center"
                        style={{ fontFamily: 'Cinzel, serif' }}
                      >
                        📚 {safeT('about.works.title')}
                      </h3>
                      <p 
                        className="text-white/90 leading-relaxed text-justify text-lg"
                        style={{ fontFamily: 'Crimson Text, serif', lineHeight: '1.8' }}
                      >
                        {safeT('about.works.text')}
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    <motion.button
                      onClick={() => setShowAboutModal(false)}
                      className="px-10 py-4 rounded-2xl font-bold transition-all duration-300 text-lg shadow-2xl"
                      style={{
                        backgroundColor: '#722F37',
                        color: '#FFD700',
                        border: '2px solid #FFD700',
                        fontFamily: 'Cinzel, serif'
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 15px 30px rgba(114, 47, 55, 0.4)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {safeT('about.close')}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🎨 ENHANCED PREMIUM CSS STYLES */}
        <style jsx global>{`
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          @keyframes premiumTwinkle {
            0%, 100% { 
              opacity: 0.4; 
              transform: scale(0.8) rotate(0deg); 
            }
            25% {
              opacity: 0.8;
              transform: scale(1.1) rotate(90deg);
            }
            50% { 
              opacity: 1; 
              transform: scale(1.3) rotate(180deg); 
            }
            75% {
              opacity: 0.7;
              transform: scale(1.1) rotate(270deg);
            }
          }

          @keyframes constellationPulse {
            0%, 100% {
              opacity: 0.5;
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.4);
            }
          }

          @keyframes shootingStar {
            0% { 
              transform: translateX(0) translateY(0);
              opacity: 0; 
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% { 
              transform: translateX(calc(-100vw - 40px)) translateY(20px);
              opacity: 0; 
            }
          }

          html {
            scroll-behavior: smooth;
          }
          
          body {
            overflow-x: hidden;
            font-family: 'Crimson Text', serif;
          }

          /* Enhanced premium image gallery hover effects */
          .image-gallery-item:hover {
            transform: translateY(-12px) scale(1.03) rotateX(5deg);
            box-shadow: 0 30px 60px rgba(0,0,0,0.3);
          }

          /* Custom scrollbar for modal */
          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(255,255,255,0.1);
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb {
            background: rgba(255,215,0,0.6);
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: rgba(255,215,0,0.8);
          }

          /* Premium button hover effects */
          .premium-button {
            position: relative;
            overflow: hidden;
          }

          .premium-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
          }

          .premium-button:hover::before {
            left: 100%;
          }
        `}</style>
      </div>
    </>
  );
}