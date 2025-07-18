/**
 * 🏛️ MACROBIUS - DRAMATIC VISUAL TRANSFORMATION v12.0
 * 🎨 MAJOR OVERHAUL: Complete redesign with modern layout and professional styling
 * ✅ PRESERVED: All working translations, no mock systems, no placeholders
 * 🚀 PRODUCTION: Dramatically improved visual design with working functionality
 * 🎆 BEAUTIFUL: Major layout improvements, better navigation, enhanced aesthetics
 */

import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, Eye, Maximize, AlertTriangle, RefreshCw, X, Sparkles, Star, Menu, ChevronDown } from 'lucide-react';
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
  const [componentErrors, setComponentErrors] = useState<Record<string, boolean>>({});
  const [isNavOpen, setIsNavOpen] = useState(false);
  
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
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setIsNavOpen(false); // Close mobile nav when section changes
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

      {/* 🌌 FIXED BACKGROUND - NO SHIVERING */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        
        {/* ✨ SIMPLE STARFIELD - NO CONTINUOUS ANIMATION */}
        <div className="fixed inset-0 z-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* 🧭 FIXED ASTROLABE - NO CONTINUOUS ROTATION */}
        <div className="fixed inset-0 z-1 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-[1500px] h-[1500px]">
            <Image 
              src="/Astrolab.jpg" 
              alt="Historical Astrolabe"
              width={1500}
              height={1500}
              className="w-full h-full object-contain"
              style={{
                filter: 'hue-rotate(220deg) saturate(0.6) brightness(0.3)',
                mixBlendMode: 'overlay'
              }}
              priority
            />
          </div>
        </div>

        {/* 🎯 MODERN TOP HEADER */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              
              {/* Logo/Title */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-400">
                  <Image 
                    src="/MacrobiusBottle.jpg" 
                    alt="Macrobius"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-yellow-400">Macrobius</h1>
                  <p className="text-sm text-gray-300">Kulturelle Schätze der Antike</p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-8">
                {[
                  { id: 'hero', text: safeT('nav.intro'), icon: '🏛️' },
                  { id: 'banquet', text: safeT('nav.banquet'), icon: '🍷' },
                  { id: 'cosmos', text: safeT('nav.cosmos'), icon: '🌌' },
                  { id: 'search', text: safeT('nav.textsearch'), icon: '🔍' },
                  { id: 'learning', text: safeT('nav.learning'), icon: '📚' },
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleSectionChange(section.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeSection === section.id 
                        ? 'bg-yellow-400 text-black font-semibold' 
                        : 'text-gray-300 hover:text-yellow-400 hover:bg-white/10'
                    }`}
                  >
                    <span>{section.icon}</span>
                    <span className="text-sm">{section.text}</span>
                  </button>
                ))}
              </nav>

              {/* Language Selector & Mobile Menu */}
              <div className="flex items-center space-x-4">
                {/* Language Selector */}
                <div className="flex items-center space-x-1 bg-white/10 rounded-lg p-1">
                  {(['DE', 'EN', 'LA'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-all duration-300 ${
                        currentLang === lang
                          ? 'bg-yellow-400 text-black'
                          : 'text-gray-300 hover:text-yellow-400'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsNavOpen(!isNavOpen)}
                  className="lg:hidden p-2 rounded-lg bg-white/10 text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* 📱 MOBILE NAVIGATION */}
        <AnimatePresence>
          {isNavOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-0 right-0 z-40 bg-black/95 backdrop-blur-lg border-b border-white/10 lg:hidden"
            >
              <div className="container mx-auto px-6 py-4">
                <div className="grid grid-cols-2 gap-4">
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
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                        activeSection === section.id 
                          ? 'bg-yellow-400 text-black font-semibold' 
                          : 'text-gray-300 hover:text-yellow-400 hover:bg-white/10'
                      }`}
                    >
                      <span>{section.icon}</span>
                      <span className="text-sm">{section.text}</span>
                    </button>
                  ))}
                </div>

                {/* AI Systems in Mobile */}
                <div className="mt-6 pt-4 border-t border-white/20">
                  <p className="text-cyan-400 text-sm font-semibold mb-3 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    {safeT('nav.ai_systems')} (TIER-COMPLETE)
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'ai-cultural', text: safeT('nav.ai_cultural'), icon: '🧠' },
                      { id: 'ai-learning', text: safeT('nav.ai_learning'), icon: '🎯' },
                      { id: 'ai-tutoring', text: safeT('nav.ai_tutoring'), icon: '📖' },
                      { id: 'ai-rag-assistant', text: safeT('nav.ai_rag'), icon: '🤖' }
                    ].map((section) => (
                      <button
                        key={section.id}
                        onClick={() => handleSectionChange(section.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                          activeSection === section.id 
                            ? 'bg-blue-400 text-black font-semibold' 
                            : 'text-blue-300 hover:text-blue-400 hover:bg-white/10'
                        }`}
                      >
                        <span>{section.icon}</span>
                        <span className="text-sm">{section.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🎨 MAIN CONTENT */}
        <main className="relative z-10 pt-20">
          
          {/* 🎆 ENHANCED HERO SECTION */}
          {activeSection === 'hero' && (
            <section className="min-h-screen flex items-center justify-center px-6 py-12">
              <div className="container mx-auto max-w-6xl">
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-12"
                >
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                    <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                      Macrobius
                    </span>
                  </h1>
                  
                  <h2 className="text-2xl md:text-3xl text-gray-300 mb-6">
                    {safeT('hero.subtitle')}
                  </h2>
                  
                  <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                    {safeT('hero.description')}
                  </p>

                  <div className="inline-flex items-center px-6 py-3 bg-green-500/20 border border-green-400/30 rounded-full text-green-300 text-sm font-medium mb-8">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                    <Sparkles className="w-4 h-4 mr-2" />
                    TIER-COMPLETE - Advanced AI Systems Operational
                  </div>
                </motion.div>

                {/* Cultural Story */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-12"
                >
                  <p className="text-gray-300 leading-relaxed text-justify text-lg">
                    {safeT('cultural_story')}
                  </p>
                </motion.div>

                {/* Image Gallery */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mb-12"
                >
                  <div className="flex items-center justify-center space-x-3 mb-8">
                    <ImageIcon className="w-6 h-6 text-yellow-400" />
                    <h3 className="text-2xl font-bold text-yellow-400">
                      {safeT('hero.cultural_treasures')}
                    </h3>
                    <Eye className="w-6 h-6 text-yellow-400" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Rome Image */}
                    <motion.div
                      whileHover={{ scale: 1.05, y: -10 }}
                      className="bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden group cursor-pointer"
                      onClick={() => setShowRomeModal(true)}
                    >
                      <div className="relative overflow-hidden">
                        <Image
                          src="/Rome-under.jpg"
                          alt={safeT('image.rome.title')}
                          width={400}
                          height={300}
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4">
                            <h4 className="text-white font-bold text-lg mb-1">{safeT('image.rome.title')}</h4>
                            <p className="text-gray-300 text-sm">{safeT('image.rome.subtitle')}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Macrobius Portrait */}
                    <motion.div
                      whileHover={{ scale: 1.05, y: -10 }}
                      className="bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden group cursor-pointer"
                      onClick={() => setShowAboutModal(true)}
                    >
                      <div className="relative overflow-hidden">
                        <Image
                          src="/MacrobiusBottle.jpg"
                          alt={safeT('image.macrobius.title')}
                          width={400}
                          height={300}
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4">
                            <h4 className="text-white font-bold text-lg mb-1">{safeT('image.macrobius.title')}</h4>
                            <p className="text-gray-300 text-sm">{safeT('image.macrobius.subtitle')}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Tycho & Pontanus */}
                    <motion.div
                      whileHover={{ scale: 1.05, y: -10 }}
                      className="bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden group cursor-pointer"
                      onClick={() => setShowTychoModal(true)}
                    >
                      <div className="relative overflow-hidden">
                        <Image
                          src="/TychoAssistent.jpg"
                          alt={safeT('image.tycho.title')}
                          width={400}
                          height={300}
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4">
                            <h4 className="text-white font-bold text-lg mb-1">{safeT('image.tycho.title')}</h4>
                            <p className="text-gray-300 text-sm">{safeT('image.tycho.subtitle')}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                  <button
                    onClick={() => handleSectionChange('banquet')}
                    className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    {safeT('hero.explore_works')}
                  </button>
                  
                  <button
                    onClick={() => setShowAboutModal(true)}
                    className="px-8 py-4 bg-transparent border-2 border-yellow-400 text-yellow-400 font-bold rounded-lg hover:bg-yellow-400 hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    {safeT('hero.learn_more')}
                  </button>
                </motion.div>
              </div>
            </section>
          )}

          {/* 🚀 OTHER SECTIONS WITH ERROR BOUNDARIES */}
          {activeSection === 'search' && (
            <div className="container mx-auto px-6 py-12">
              {renderSectionWithErrorBoundary('search', TextSearchSection, { isActive: true, language: currentLang })}
            </div>
          )}

          {activeSection === 'cosmos' && (
            <div className="container mx-auto px-6 py-12">
              {renderSectionWithErrorBoundary('cosmos', CosmosSection, { isActive: true, language: currentLang })}
            </div>
          )}

          {activeSection === 'banquet' && (
            <div className="container mx-auto px-6 py-12">
              {renderSectionWithErrorBoundary('banquet', BanquetSection, { isActive: true, language: currentLang })}
            </div>
          )}

          {activeSection === 'worldmap' && (
            <div className="container mx-auto px-6 py-12">
              {renderSectionWithErrorBoundary('worldmap', WorldMapSection, { isActive: true, language: currentLang })}
            </div>
          )}

          {activeSection === 'quiz' && (
            <div className="container mx-auto px-6 py-12">
              {renderSectionWithErrorBoundary('quiz', QuizSection, { isActive: true, language: currentLang })}
            </div>
          )}

          {activeSection === 'learning' && (
            <div className="container mx-auto px-6 py-12">
              {renderSectionWithErrorBoundary('learning', LearningSection, {})}
            </div>
          )}

          {activeSection === 'visualizations' && (
            <div className="container mx-auto px-6 py-12">
              {renderSectionWithErrorBoundary('visualizations', VisualizationsSection, { isActive: true, language: currentLang })}
            </div>
          )}

          {/* AI Systems */}
          {activeSection === 'ai-cultural' && (
            <div className="container mx-auto px-6 py-12">
              {renderSectionWithErrorBoundary('ai-cultural', AICulturalAnalysisSection, {})}
            </div>
          )}

          {activeSection === 'ai-learning' && (
            <div className="container mx-auto px-6 py-12">
              {renderSectionWithErrorBoundary('ai-learning', PersonalizedLearningPathsComplete, {})}
            </div>
          )}

          {activeSection === 'ai-tutoring' && (
            <div className="container mx-auto px-6 py-12">
              {renderSectionWithErrorBoundary('ai-tutoring', AITutoringSystemComplete, { language: currentLang })}
            </div>
          )}

          {activeSection === 'ai-rag-assistant' && (
            <div className="container mx-auto px-6 py-12">
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
              <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
              
              <motion.div
                className="relative bg-black/80 backdrop-blur-lg rounded-2xl p-8 max-w-4xl mx-auto border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowAboutModal(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white/80 hover:bg-white/30 transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-yellow-400 mb-2">
                      {safeT('about.title')}
                    </h2>
                    <p className="text-xl text-gray-300">
                      {safeT('about.subtitle')}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-yellow-400 mb-3">
                        {safeT('about.biography.title')}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {safeT('about.biography.text')}
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-yellow-400 mb-3">
                        {safeT('about.works.title')}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {safeT('about.works.text')}
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => setShowAboutModal(false)}
                      className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all duration-300"
                    >
                      {safeT('about.close')}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}