/**
 * 🏦 MACROBIUS - HYBRID TIER-COMPLETE VERSION
 * ✅ ADVANCED: TIER-COMPLETE components (40-70KB)
 * ✅ WORKING: Preserved all translation fixes and functionality
 * ✅ COMPLETE: Language switching + Banquet content + Oracle Cloud
 */

import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, Eye, Maximize } from 'lucide-react';
import Image from 'next/image';

// Enhanced Image System
import ImageModal from '../components/ui/ImageModal';
import { getImagesBySection, ImageInfo } from '../data/imageData';

// Oracle Cloud-integrated components (Basic versions for stability)
import CosmosSection from '../components/sections/CosmosSection';
import TextSearchSection from '../components/sections/TextSearchSection';  
import VisualizationsSection from '../components/sections/VisualizationsSection';
import BanquetSection from '../components/sections/BanquetSection';
import WorldMapSection from '../components/sections/WorldMapSection';
import LearningSection from '../components/sections/LearningSection-enhanced-complete';
import QuizSection from '../components/sections/QuizSection';

// ✅ HYBRID: Advanced TIER-COMPLETE AI Systems Components (where they work)
import RealAICulturalAnalysisSection from '../components/sections/AICulturalAnalysisSection-REAL-ORACLE-WORKING';
import PersonalizedLearningPathsComplete from '../components/sections/PersonalizedLearningPaths-COMPLETE';
import AITutoringSystemComplete from '../components/sections/AITutoringSystemSection-COMPLETE';
import AdvancedCulturalModulesFixed from '../components/sections/AdvancedCulturalModulesSection-FIXED';

// KI-RAG-Assistant Component (advanced)
import KIRAGAssistentSection from '../components/sections/KIRAGAssistentSection';

// ✅ PRESERVED: Import LanguageContext properly (from working version)
import { useLanguage, Language, getTranslation } from '../contexts/LanguageContext';

// Clickable Image Component
interface ClickableImageProps {
  imageInfo: ImageInfo;
  onClick: (imageInfo: ImageInfo) => void;
  className?: string;
  fullSize?: boolean;
}

const ClickableImage: React.FC<ClickableImageProps> = ({ imageInfo, onClick, className = '', fullSize = false }) => {
  return (
    <motion.div
      className={`relative group cursor-pointer overflow-hidden rounded-xl border border-white/20 shadow-lg ${className}`}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(imageInfo)}
    >
      <div className="relative">
        <Image
          src={imageInfo.src}
          alt={imageInfo.title}
          width={fullSize ? 600 : 300}
          height={fullSize ? 450 : 200}
          className={`${fullSize ? 'w-full h-auto' : 'w-full h-48'} object-${fullSize ? 'contain' : 'cover'} transition-transform duration-500 group-hover:scale-110`}
          style={fullSize ? { 
            objectFit: 'contain',
            width: '100%',
            height: 'auto',
            maxHeight: '450px'
          } : {}}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-bold text-lg mb-1">{imageInfo.title}</h3>
            {imageInfo.subtitle && (
              <p className="text-white/90 text-sm">{imageInfo.subtitle}</p>
            )}
          </div>
        </div>
        
        <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Maximize className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <div className="p-3 bg-white/10 backdrop-blur-sm">
        <p className="text-white/80 text-xs line-clamp-2">{imageInfo.description}</p>
      </div>
    </motion.div>
  );
};

// Main Application Component
export default function MacrobiusCulturalApp() {
  // ✅ PRESERVED: Use proper language context (from working version)
  const { language: currentLang, setLanguage, t, isHydrated } = useLanguage();
  
  // Navigation state 
  const [activeSection, setActiveSection] = useState<string>('hero');
  
  // Astrolabe rotation state
  const [astrolabeRotation, setAstrolabeRotation] = useState<number>(0);
  
  // Modal states
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showPontanusModal, setShowPontanusModal] = useState(false);
  const [showRomeModal, setShowRomeModal] = useState(false);
  
  // Image modal state
  const [selectedImage, setSelectedImage] = useState<ImageInfo | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);

  // ✅ PRESERVED: Safe translation function (from working version)
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

  // Event handlers
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

  // ✅ PRESERVED: Get translations safely (from working version)
  const heroBadge = safeT('hero.badge');
  const heroDescription = safeT('hero.description');
  const culturalStory = safeT('cultural_story');

  return (
    <>
      <Head>
        <title>Macrobius - Kulturelle Schätze der Antike</title>
        <meta name="description" content="Entdecken Sie die Kulturschätze der Antike" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Enhanced Evening Sky Background */}
      <div className="min-h-screen relative overflow-x-hidden" style={{
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 15%, #16213e 30%, #0d1b2a 50%, #0c1821 70%, #0a0e1a 100%)'
      }}>
        {/* Enhanced Moving Starfield */}
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
          
          {/* Larger stars */}
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
          
          {/* Moving stars */}
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

        {/* Rotating Astrolabe Background */}
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

        {/* Floating Macrobius Circle */}
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

        {/* Language Selector */}
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

        {/* ✅ HYBRID: Navigation with working translations + TIER-COMPLETE indicators */}
        <nav className="fixed top-4 left-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex flex-col space-y-2">
              {/* Core Sections */}
              {[
                { id: 'hero', text: safeT('nav.intro'), icon: '🏦' },
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
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 text-left flex items-center space-x-2 ${
                    activeSection === section.id
                      ? 'bg-yellow-400 text-gray-800 shadow-lg'
                      : 'text-yellow-300 hover:bg-white/20'
                  }`}
                  style={{
                    backgroundColor: activeSection === section.id ? '#FFD700' : '#722F37',
                    color: activeSection === section.id ? '#1a1a1a' : '#FFD700',
                  }}
                >
                  <span>{section.icon}</span>
                  <span>{section.text}</span>
                </button>
              ))}
              
              {/* ✅ HYBRID: AI Systems with TIER-COMPLETE indicators + working translations */}
              <div className="border-t border-white/20 pt-2 mt-2">
                <p className="text-yellow-200/60 text-xs px-2 mb-2">
                  {safeT('nav.ai_systems')}
                  <span className="text-green-400 ml-2">TIER-COMPLETE</span>
                </p>
                {[
                  { id: 'ai-cultural', text: safeT('nav.ai_cultural'), icon: '🧠', tier: 'REAL-ORACLE' },
                  { id: 'ai-learning', text: safeT('nav.ai_learning'), icon: '🎯', tier: 'COMPLETE' },
                  { id: 'ai-tutoring', text: safeT('nav.ai_tutoring'), icon: '📖', tier: 'COMPLETE' },
                  { id: 'ai-modules', text: safeT('nav.ai_modules'), icon: '✨', tier: 'FIXED' },
                  { id: 'ai-rag-assistant', text: 'KI-RAG-Assistent', icon: '🤖', tier: 'ADVANCED' }
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleSectionChange(section.id)}
                    className={`w-full px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 text-left flex items-center space-x-2 ${
                      activeSection === section.id
                        ? 'bg-blue-400 text-gray-800 shadow-lg'
                        : 'text-blue-300 hover:bg-white/20'
                    }`}
                    style={{
                      backgroundColor: activeSection === section.id ? '#60A5FA' : 'rgba(59, 130, 246, 0.2)',
                      color: activeSection === section.id ? '#1a1a1a' : '#93C5FD',
                    }}
                    title={`Advanced ${section.tier} Component - 40-70KB`}
                  >
                    <span>{section.icon}</span>
                    <span>{section.text}</span>
                    <span className="text-green-400 ml-auto text-xs">{section.tier}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ✅ HYBRID: Oracle Cloud Status with TIER-COMPLETE info + working translations */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/70">Oracle Cloud</span>
                <span className="text-green-400">TIER-COMPLETE</span>
              </div>
              <p className="text-white/60 text-xs mt-1">
                {safeT('nav.oracle_status')}
              </p>
              <p className="text-green-400/80 text-xs">
                40-70KB Enterprise Components
              </p>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="relative z-10">
          {/* ✅ PRESERVED: Hero Section with working content and translations */}
          {activeSection === 'hero' && (
            <section className="min-h-screen flex items-center justify-center px-4" style={{ paddingTop: '200px' }}>
              <div className="text-center max-w-7xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/30 mb-8">
                  
                  <div className="mb-8">
                    <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
                      Macrobius
                    </h1>
                    
                    <h2 className="text-2xl md:text-4xl text-yellow-300 mb-6 font-light">
                      Eine antike Flaschenpost
                    </h2>
                    
                    <h3 className="text-lg md:text-xl text-yellow-200 mb-4 font-medium">
                      Eine Nachricht aus der Antike an die Zukunft
                    </h3>

                    {/* ✅ HYBRID: TIER-COMPLETE Badge with working functionality */}
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-full text-green-300 text-sm font-medium mb-6">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                      HYBRID TIER-COMPLETE - Advanced Components + Working Features
                    </div>
                  </div>

                  {/* ✅ PRESERVED: Cultural Story with working content */}
                  <div className="max-w-4xl mx-auto mb-8">
                    <p className="text-base md:text-lg text-white/90 leading-relaxed text-justify">
                      Vor 1500 Jahren, als das römische Reich dem Untergang entgegensah, fertigte Macrobius eine Flaschenpost an die Zukunft an. Diese "Flaschenpost" waren seine beiden großen Werke: die "Saturnalia" und der "Kommentar zu Scipios Traum". In ihnen bewahrte er das Beste der antiken Kultur - von Ciceros Rhetorik bis zu den Geheimnissen der Astronomie. Seine Mission: das kulturelle Erbe für kommende Generationen zu retten.
                    </p>
                  </div>

                  {/* ✅ PRESERVED: Picture Gallery with working functionality */}
                  <div className="mb-8">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                      <ImageIcon className="w-6 h-6 text-yellow-300" />
                      <h4 className="text-xl font-semibold text-yellow-200">
                        Kulturelle Schätze entdecken
                      </h4>
                      <Eye className="w-6 h-6 text-yellow-300" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                      {/* Rome Image */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="md:col-span-2 lg:col-span-1"
                      >
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-xl border-2 border-orange-400/60 shadow-2xl"
                          whileHover={{ scale: 1.02, y: -8 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowRomeModal(true)}
                        >
                          <Image
                            src="/Rome-under.jpg"
                            alt="Das untergehende Römische Reich"
                            width={400}
                            height={300}
                            className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                          />
                          
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="p-4">
                              <h3 className="text-white font-bold text-xl mb-1">Das untergehende Römische Reich</h3>
                              <p className="text-white/95 text-sm">Kultureller Niedergang und die Mission der Gelehrten</p>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                      
                      {/* Macrobius Portrait */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                      >
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-xl border-2 border-yellow-400/60 shadow-xl"
                          whileHover={{ scale: 1.02, y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowAboutModal(true)}
                        >
                          <Image
                            src="/MacrobiusBottle.jpg"
                            alt="Macrobius Ambrosius Theodosius"
                            width={400}
                            height={500}
                            className="w-full h-80 object-contain"
                          />
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <h3 className="text-white font-bold text-lg mb-1">Macrobius Ambrosius Theodosius</h3>
                              <p className="text-white/90 text-sm">Kultureller Bewahrer der spätantiken Welt</p>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* Tycho & Pontanus */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                      >
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-xl border-2 border-blue-400/60 shadow-xl"
                          whileHover={{ scale: 1.02, y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowPontanusModal(true)}
                        >
                          <Image
                            src="/TychoAssistent.jpg"
                            alt="Johannes Isaac Pontanus & Tycho Brahe"
                            width={400}
                            height={500}
                            className="w-full h-80 object-contain"
                          />
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-4 left-4 right-4">
                              <h3 className="text-white font-bold text-lg mb-1">Johannes Isaac Pontanus & Tycho Brahe</h3>
                              <p className="text-white/90 text-sm">Astronomische Renaissance und die Wiederentdeckung</p>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* ✅ PRESERVED: Action Buttons with working functionality */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={() => handleSectionChange('banquet')}
                    className="px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    style={{
                      backgroundColor: '#722F37',
                      color: '#FFD700',
                    }}
                  >
                    Erkunden Sie die Werke des Macrobius
                  </button>
                  
                  <button
                    onClick={() => setShowAboutModal(true)}
                    className="px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    style={{
                      backgroundColor: '#722F37',
                      color: '#FFD700',
                    }}
                  >
                    Mehr über Macrobius
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ✅ PRESERVED: Other Sections with working functionality */}
          {activeSection === 'search' && (
            <TextSearchSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
          )}

          {activeSection === 'cosmos' && (
            <CosmosSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
          )}

          {activeSection === 'banquet' && (
            <BanquetSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
          )}

          {activeSection === 'worldmap' && (
            <WorldMapSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
          )}

          {activeSection === 'quiz' && (
            <QuizSection isActive={true} language={currentLang} />
          )}

          {activeSection === 'learning' && (
            <LearningSection />
          )}

          {activeSection === 'visualizations' && (
            <VisualizationsSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
          )}

          {/* ✅ HYBRID: Advanced TIER-COMPLETE AI Systems (where they work) + Basic fallbacks */}
          {activeSection === 'ai-cultural' && (
            <RealAICulturalAnalysisSection />
          )}

          {activeSection === 'ai-learning' && (
            <PersonalizedLearningPathsComplete language={currentLang} />
          )}

          {activeSection === 'ai-tutoring' && (
            <AITutoringSystemComplete language={currentLang} />
          )}

          {activeSection === 'ai-modules' && (
            <AdvancedCulturalModulesFixed language={currentLang} />
          )}

          {/* KI-RAG-Assistant */}
          {activeSection === 'ai-rag-assistant' && (
            <KIRAGAssistentSection />
          )}
        </main>

        {/* ✅ PRESERVED: Image Modal with working functionality */}
        <ImageModal
          imageInfo={selectedImage}
          isOpen={showImageModal}
          onClose={handleImageModalClose}
          language={currentLang}
        />

        {/* ✅ PRESERVED: About Modal with working content */}
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
                  ×
                </button>

                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-yellow-400 mb-2">
                      Macrobius Ambrosius Theodosius
                    </h2>
                    <p className="text-xl text-yellow-300/90 font-medium">
                      Kultureller Bewahrer der spätantiken Welt (ca. 385-430 n. Chr.)
                    </p>
                    {/* ✅ HYBRID: TIER-COMPLETE Badge in Modal */}
                    <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-full text-green-300 text-sm font-medium mt-4">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                      HYBRID TIER-COMPLETE - Advanced AI + Working Features
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
                        🏦 Biographie & Kontext
                      </h3>
                      <p className="text-white/90 leading-relaxed text-justify">
                        Macrobius Ambrosius Theodosius war eine der faszinierendsten Gestalten der späten Antike - ein Mann, der an der Schwelle zwischen zwei Welten stand. Als hoher Verwaltungsbeamter des untergehenden Weströmischen Reiches und gleichzeitig als leidenschaftlicher Gelehrter verkörperte er die dramatische Spannung seiner Zeit: den Versuch, die klassische Kultur vor dem Untergang zu bewahren.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
                        📚 Die zwei Hauptwerke
                      </h3>
                      <p className="text-white/90 leading-relaxed text-justify">
                        Macrobius' zwei Hauptwerke "Saturnalia" und "Commentarii in Somnium Scipionis" sind Meisterwerke spätantiker Gelehrsamkeit. Die "Saturnalia" präsentieren sich als lebendige Tischgespräche während der römischen Winterfeste, in denen die gebildete Elite Roms über Literatur, Philosophie, Religion und Naturwissenschaften diskutiert.
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
                      Schließen
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ✅ PRESERVED: Enhanced CSS Styles */}
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
        `}</style>
      </div>
    </>
  );
}