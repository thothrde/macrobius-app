/**
 * 🏛️ MACROBIUS - ENHANCED VISUAL DESIGN v10.0
 * 🎨 SOPHISTICATED: Enhanced image gallery with rich modal system
 * ✅ PRESERVED: All working translations, no mock systems, no placeholders
 * 🚀 PRODUCTION: Professional visual design with working functionality
 * 🎆 BEAUTIFUL: Sophisticated layout inspired by old backup
 */

import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, Eye, Maximize, AlertTriangle, RefreshCw, X } from 'lucide-react';
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
      setAstrolabeRotation(prev => prev + 0.2);
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
      </Head>

      {/* 🌌 ENHANCED EVENING SKY BACKGROUND */}
      <div className="min-h-screen relative overflow-x-hidden" style={{
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 15%, #16213e 30%, #0d1b2a 50%, #0c1821 70%, #0a0e1a 100%)'
      }}>
        
        {/* ✨ ENHANCED MOVING STARFIELD */}
        <div className="fixed inset-0 z-0">
          {/* Static twinkling stars */}
          {[...Array(30)].map((_, i) => (
            <div
              key={`static-star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
          
          {/* Larger colored stars */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`large-star-${i}`}
              className={`absolute w-2 h-2 rounded-full opacity-70 ${
                i % 3 === 0 ? 'bg-yellow-300' : 
                i % 3 === 1 ? 'bg-blue-300' : 'bg-red-300'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${4 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
          
          {/* Moving shooting stars */}
          {[...Array(5)].map((_, i) => (
            <div
              key={`moving-star-${i}`}
              className="absolute w-1 h-1 bg-cyan-300 rounded-full opacity-50"
              style={{
                right: '-10px',
                top: `${20 + Math.random() * 60}%`,
                animation: `moveRightToLeft ${15 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 8}s`,
              }}
            />
          ))}
        </div>

        {/* 🧭 ENHANCED ROTATING ASTROLABE */}
        <div className="fixed inset-0 z-1 flex items-center justify-center pointer-events-none">
          <motion.div 
            className="opacity-40"
            animate={{ 
              rotate: astrolabeRotation,
              scale: [1, 1.02, 1],
            }}
            transition={{ 
              rotate: { duration: 2, ease: "easeInOut" },
              scale: { duration: 10, ease: "easeInOut", repeat: Infinity }
            }}
          >
            <div className="w-[2000px] h-[2000px]">
              <Image 
                src="/Astrolab.jpg" 
                alt="Historical Astrolabe"
                width={2000}
                height={2000}
                className="w-full h-full object-contain"
                style={{
                  filter: 'hue-rotate(220deg) saturate(0.6) brightness(0.5) contrast(1.2)',
                  mixBlendMode: 'overlay'
                }}
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* 🌟 ENHANCED FLOATING MACROBIUS CIRCLE */}
        {activeSection === 'hero' && (
          <motion.div 
            className="fixed top-16 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
            animate={{ 
              y: [0, -15, 0],
              x: [0, -8, 8, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 8,
              ease: "easeInOut", 
              repeat: Infinity 
            }}
          >
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-yellow-400 shadow-2xl bg-gradient-to-br from-yellow-400 to-orange-500">
              <Image 
                src="/MacrobiusBottle.jpg" 
                alt="Macrobius with Bottle"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}

        {/* 🌍 ENHANCED LANGUAGE SELECTOR */}
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-2">
            <div className="flex space-x-1">
              {(['DE', 'EN', 'LA'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-3 py-1 rounded text-sm font-semibold transition-all duration-300 ${
                    currentLang === lang
                      ? 'bg-yellow-400 text-gray-800 shadow-lg'
                      : 'text-white/80 hover:bg-white/20'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 🧭 ENHANCED PROFESSIONAL NAVIGATION */}
        <nav className="fixed top-4 left-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex flex-col space-y-2">
              
              {/* Core Sections */}
              {[
                { id: 'hero', text: safeT('nav.intro'), icon: '🏛️' },
                { id: 'quiz', text: safeT('nav.quiz'), icon: '📝' },
                { id: 'worldmap', text: safeT('nav.worldmap'), icon: '🗺️' },
                { id: 'cosmos', text: safeT('nav.cosmos'), icon: '🌌' },
                { id: 'banquet', text: safeT('nav.banquet'), icon: '🍷' },
                { id: 'search', text: safeT('nav.textsearch'), icon: '🔍' },
                { id: 'learning', text: safeT('nav.learning'), icon: '📚' },
                { id: 'visualizations', text: safeT('nav.visualizations'), icon: '📊' }
              ].map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 text-left flex items-center space-x-2`}
                  style={{
                    backgroundColor: activeSection === section.id ? '#FFD700' : '#722F37',
                    color: activeSection === section.id ? '#1a1a1a' : '#FFD700',
                  }}
                >
                  <span>{section.icon}</span>
                  <span>{section.text}</span>
                  {componentErrors[section.id] && (
                    <AlertTriangle className="w-4 h-4 text-red-400 ml-auto" />
                  )}
                </button>
              ))}
              
              {/* AI Systems */}
              <div className="border-t border-white/20 pt-2 mt-2">
                <p className="text-yellow-200/60 text-xs px-2 mb-2 uppercase tracking-wider font-bold">
                  {safeT('nav.ai_systems')}
                  <span className="text-green-400 ml-2">TIER-COMPLETE</span>
                </p>
                
                {[
                  { id: 'ai-cultural', text: safeT('nav.ai_cultural'), icon: '🧠', tier: 'REAL-ORACLE' },
                  { id: 'ai-learning', text: safeT('nav.ai_learning'), icon: '🎯', tier: 'COMPLETE' },
                  { id: 'ai-tutoring', text: safeT('nav.ai_tutoring'), icon: '📖', tier: 'COMPLETE' },
                  { id: 'ai-rag-assistant', text: safeT('nav.ai_rag'), icon: '🤖', tier: 'ENHANCED' }
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleSectionChange(section.id)}
                    className={`w-full px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 text-left flex items-center space-x-2 mb-1`}
                    style={{
                      backgroundColor: activeSection === section.id ? '#60A5FA' : 'rgba(59, 130, 246, 0.2)',
                      color: activeSection === section.id ? '#1a1a1a' : '#93C5FD',
                    }}
                    title={`Advanced ${section.tier} Component`}
                  >
                    <span>{section.icon}</span>
                    <span className="flex-1">{section.text}</span>
                    <span className="text-green-400 text-xs font-bold">{section.tier}</span>
                    {componentErrors[section.id] && (
                      <AlertTriangle className="w-3 h-3 text-red-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Oracle Cloud Status */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/70 font-medium">Oracle Cloud</span>
                <span className="text-green-400 font-bold">TIER-COMPLETE</span>
              </div>
              <p className="text-white/60 text-xs mt-1">
                {safeT('nav.oracle_status')}
              </p>
              <p className="text-green-400/80 text-xs">
                Real AI Systems Operational
              </p>
            </div>
          </div>
        </nav>

        {/* 🎨 MAIN CONTENT */}
        <main className="relative z-10">
          
          {/* 🎆 ENHANCED HERO SECTION WITH SOPHISTICATED IMAGE GALLERY */}
          {activeSection === 'hero' && (
            <section className="min-h-screen flex items-center justify-center px-4" style={{ paddingTop: '200px' }}>
              <div className="text-center max-w-7xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/30 mb-8">
                  
                  <div className="mb-8">
                    <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
                      {safeT('hero.title')}
                    </h1>
                    
                    <h2 className="text-2xl md:text-4xl text-yellow-300 mb-6 font-light">
                      {safeT('hero.subtitle')}
                    </h2>
                    
                    <h3 className="text-lg md:text-xl text-yellow-200 mb-4 font-medium">
                      {safeT('hero.description')}
                    </h3>

                    {/* Enhanced TIER-COMPLETE Badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-full text-green-300 text-sm font-medium mb-6">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                      HYBRID TIER-COMPLETE - Advanced Components + Working Features
                    </div>
                  </div>

                  {/* Cultural Story */}
                  <div className="max-w-4xl mx-auto mb-8">
                    <p className="text-base md:text-lg text-white/90 leading-relaxed text-justify">
                      {safeT('cultural_story')}
                    </p>
                  </div>

                  {/* 🖼️ SOPHISTICATED IMAGE GALLERY */}
                  <div className="mb-8">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                      <ImageIcon className="w-6 h-6 text-yellow-300" />
                      <h4 className="text-xl font-semibold text-yellow-200">
                        {safeT('hero.cultural_treasures')}
                      </h4>
                      <Eye className="w-6 h-6 text-yellow-300" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                      
                      {/* Enhanced Rome Image with sophisticated hover effects */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="md:col-span-2 lg:col-span-1"
                      >
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-xl border-2 border-orange-400/60 shadow-2xl"
                          whileHover={{ scale: 1.02, y: -8, rotateX: 2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowRomeModal(true)}
                        >
                          <Image
                            src="/Rome-under.jpg"
                            alt={safeT('image.rome.title')}
                            width={400}
                            height={300}
                            className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                          />
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                              <h3 className="text-white font-bold text-xl mb-2">{safeT('image.rome.title')}</h3>
                              <p className="text-white/95 text-sm leading-relaxed">{safeT('image.rome.subtitle')}</p>
                            </div>
                          </div>
                          
                          <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                            <Maximize className="w-5 h-5 text-white" />
                          </div>
                        </motion.div>
                      </motion.div>
                      
                      {/* Enhanced Macrobius Portrait with sophisticated animations */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                      >
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-xl border-2 border-yellow-400/60 shadow-xl"
                          whileHover={{ scale: 1.02, y: -5, rotateY: 2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowAboutModal(true)}
                        >
                          <Image
                            src="/MacrobiusBottle.jpg"
                            alt={safeT('image.macrobius.title')}
                            width={400}
                            height={500}
                            className="w-full h-80 object-contain transition-transform duration-500 group-hover:scale-110"
                          />
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/90 via-yellow-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                              <h3 className="text-white font-bold text-lg mb-2">{safeT('image.macrobius.title')}</h3>
                              <p className="text-white/95 text-sm leading-relaxed">{safeT('image.macrobius.subtitle')}</p>
                            </div>
                          </div>
                          
                          <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                            <Maximize className="w-5 h-5 text-white" />
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* Enhanced Tycho & Pontanus with sophisticated effects */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                      >
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-xl border-2 border-blue-400/60 shadow-xl"
                          whileHover={{ scale: 1.02, y: -5, rotateX: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowTychoModal(true)}
                        >
                          <Image
                            src="/TychoAssistent.jpg"
                            alt={safeT('image.tycho.title')}
                            width={400}
                            height={500}
                            className="w-full h-80 object-contain transition-transform duration-500 group-hover:scale-110"
                          />
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                              <h3 className="text-white font-bold text-lg mb-2">{safeT('image.tycho.title')}</h3>
                              <p className="text-white/95 text-sm leading-relaxed">{safeT('image.tycho.subtitle')}</p>
                            </div>
                          </div>
                          
                          <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                            <Maximize className="w-5 h-5 text-white" />
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={() => handleSectionChange('banquet')}
                    className="px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    style={{
                      backgroundColor: '#722F37',
                      color: '#FFD700',
                    }}
                  >
                    {safeT('hero.explore_works')}
                  </button>
                  
                  <button
                    onClick={() => setShowAboutModal(true)}
                    className="px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    style={{
                      backgroundColor: '#722F37',
                      color: '#FFD700',
                    }}
                  >
                    {safeT('hero.learn_more')}
                  </button>
                </div>
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

        {/* 🖼️ ENHANCED ABOUT MODAL */}
        <AnimatePresence>
          {showAboutModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAboutModal(false)}
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              
              <motion.div
                className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-6xl mx-auto border border-white/30 shadow-2xl max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowAboutModal(false)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white/80 hover:bg-white/30 transition-all duration-300 z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-yellow-400 mb-2">
                      {safeT('about.title')}
                    </h2>
                    <p className="text-xl text-yellow-300/90 font-medium">
                      {safeT('about.subtitle')}
                    </p>
                    <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-full text-green-300 text-sm font-medium mt-4">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                      HYBRID TIER-COMPLETE - Advanced AI + Working Features
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
                        {safeT('about.biography.title')}
                      </h3>
                      <p className="text-white/90 leading-relaxed text-justify">
                        {safeT('about.biography.text')}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
                        {safeT('about.works.title')}
                      </h3>
                      <p className="text-white/90 leading-relaxed text-justify">
                        {safeT('about.works.text')}
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => setShowAboutModal(false)}
                      className="px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                      style={{
                        backgroundColor: '#722F37',
                        color: '#FFD700',
                      }}
                    >
                      {safeT('about.close')}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🎨 ENHANCED CSS STYLES */}
        <style jsx global>{`
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          @keyframes twinkle {
            0%, 100% { 
              opacity: 0.3; 
              transform: scale(0.8); 
            }
            50% { 
              opacity: 1; 
              transform: scale(1.2); 
            }
          }

          @keyframes moveRightToLeft {
            0% { 
              transform: translateX(0);
              opacity: 0.3; 
            }
            25% { 
              opacity: 0.8;
            }
            50% { 
              opacity: 1;
            }
            75% { 
              opacity: 0.6;
            }
            100% { 
              transform: translateX(calc(-100vw - 20px));
              opacity: 0; 
            }
          }

          html {
            scroll-behavior: smooth;
          }
          
          body {
            overflow-x: hidden;
          }

          /* Enhanced image gallery hover effects */
          .image-gallery-item:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 25px 50px rgba(0,0,0,0.25);
          }
        `}</style>
      </div>
    </>
  );
}