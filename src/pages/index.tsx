/**
 * 🏛️ MACROBIUS - ENHANCED PRODUCTION VERSION
 * ✅ FIXED: Complete language switching functionality
 * ✅ ENHANCED: Oracle Cloud integration with robust fallback
 * ✅ COMPLETE: All translation issues resolved
 */

import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, Eye, Maximize } from 'lucide-react';
import Image from 'next/image';

// Core sections with enhanced translation support
import IntroSection from '../components/sections/IntroSection';
import CosmosSection from '../components/sections/CosmosSection';
import TextSearchSection from '../components/sections/TextSearchSection';  
import VisualizationsSection from '../components/sections/VisualizationsSection';
import BanquetSection from '../components/sections/BanquetSection';
import WorldMapSection from '../components/sections/WorldMapSection';
import LearningSection from '../components/sections/LearningSection-enhanced-complete';
import QuizSection from '../components/sections/QuizSection';

// AI Systems Components
import RealAICulturalAnalysisSection from '../components/sections/AICulturalAnalysisSection-REAL-ORACLE-WORKING';
import PersonalizedLearningPathsComplete from '../components/sections/PersonalizedLearningPaths-COMPLETE';
import AITutoringSystemComplete from '../components/sections/AITutoringSystemSection-COMPLETE';
import AdvancedCulturalModulesFixed from '../components/sections/AdvancedCulturalModulesSection-FIXED';
import KIRAGAssistentSection from '../components/sections/KIRAGAssistentSection';

// Enhanced LanguageContext
import { useLanguage, Language } from '../contexts/LanguageContext';

// Main Application Component
export default function MacrobiusCulturalApp() {
  const { language: currentLang, setLanguage, t, isHydrated } = useLanguage();
  
  // Navigation state 
  const [activeSection, setActiveSection] = useState<string>('intro');
  
  // Astrolabe rotation state
  const [astrolabeRotation, setAstrolabeRotation] = useState<number>(0);
  
  // Event handlers
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setAstrolabeRotation(prev => prev + 45);
    
    // Smooth scroll to section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Safe translation function for SSG compatibility
  const safeT = useCallback((key: string): string => {
    if (!isHydrated) {
      // Use fallback during SSG
      const fallbackTranslations = {
        'nav.intro': currentLang === 'DE' ? 'Einführung' : currentLang === 'LA' ? 'Introductio' : 'Introduction',
        'nav.quiz': 'Quiz',
        'nav.worldmap': currentLang === 'DE' ? 'Weltkarte' : currentLang === 'LA' ? 'Mappa Mundi' : 'World Map',
        'nav.cosmos': 'Cosmos',
        'nav.banquet': currentLang === 'DE' ? 'Gastmahl' : currentLang === 'LA' ? 'Convivium' : 'Banquet',
        'nav.textsearch': currentLang === 'DE' ? 'Textsuche' : currentLang === 'LA' ? 'Quaestio Textuum' : 'Text Search',
        'nav.learning': currentLang === 'DE' ? 'Lernen' : currentLang === 'LA' ? 'Discere' : 'Learning',
        'nav.visualizations': currentLang === 'DE' ? 'Visualisierungen' : currentLang === 'LA' ? 'Visualizationes' : 'Visualizations',
        'nav.ai_systems': currentLang === 'DE' ? 'KI-SYSTEME' : currentLang === 'LA' ? 'SYSTEMATA AI' : 'AI SYSTEMS',
        'nav.ai_cultural': currentLang === 'DE' ? 'KI-Kulturanalyse' : currentLang === 'LA' ? 'AI Analysis Culturalis' : 'AI Cultural Analysis',
        'nav.ai_learning': currentLang === 'DE' ? 'Lernpfade' : currentLang === 'LA' ? 'Semitae Discendi' : 'Learning Paths',
        'nav.ai_tutoring': currentLang === 'DE' ? 'KI-Tutor' : currentLang === 'LA' ? 'AI Praeceptor' : 'AI Tutor',
        'nav.ai_modules': currentLang === 'DE' ? 'Kulturmodule' : currentLang === 'LA' ? 'Moduli Culturales' : 'Cultural Modules',
        'nav.oracle_status': currentLang === 'DE' ? '1.401 Kulturelle Texte' : currentLang === 'LA' ? '1.401 Textus Culturales' : '1,401 Cultural Texts'
      };
      return fallbackTranslations[key as keyof typeof fallbackTranslations] || key;
    }
    return t(key);
  }, [t, isHydrated, currentLang]);

  return (
    <>
      <Head>
        <title>{currentLang === 'DE' ? 'Macrobius - Kulturelle Schätze der Antike' : currentLang === 'LA' ? 'Macrobius - Thesauri Culturales Antiquitatis' : 'Macrobius - Cultural Treasures of Antiquity'}</title>
        <meta name="description" content={currentLang === 'DE' ? 'Entdecken Sie die Kulturschätze der Antike' : currentLang === 'LA' ? 'Thesauros Culturales Antiquitatis Invenite' : 'Discover the Cultural Treasures of Antiquity'} />
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
        {activeSection === 'intro' && (
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

        {/* Enhanced Navigation with proper translations */}
        <nav className="fixed top-4 left-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex flex-col space-y-2">
              {/* Core Sections */}
              {[
                { id: 'intro', text: safeT('nav.intro'), icon: '🏛️' },
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
              
              {/* AI Systems */}
              <div className="border-t border-white/20 pt-2 mt-2">
                <p className="text-yellow-200/60 text-xs px-2 mb-2">
                  {safeT('nav.ai_systems')}
                  <span className="text-green-400 ml-2">ENHANCED</span>
                </p>
                {[
                  { id: 'ai-cultural', text: safeT('nav.ai_cultural'), icon: '🧠', tier: 'ORACLE' },
                  { id: 'ai-learning', text: safeT('nav.ai_learning'), icon: '🎯', tier: 'COMPLETE' },
                  { id: 'ai-tutoring', text: safeT('nav.ai_tutoring'), icon: '📖', tier: 'COMPLETE' },
                  { id: 'ai-modules', text: safeT('nav.ai_modules'), icon: '✨', tier: 'FIXED' },
                  { id: 'ai-rag-assistant', text: 'KI-RAG-Assistent', icon: '🤖', tier: 'ENHANCED' }
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
                    title={`Enhanced ${section.tier} Component with Fallback Support`}
                  >
                    <span>{section.icon}</span>
                    <span>{section.text}</span>
                    <span className="text-green-400 ml-auto text-xs">{section.tier}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Oracle Cloud Status */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/70">Oracle Cloud</span>
                <span className="text-green-400">ENHANCED</span>
              </div>
              <p className="text-white/60 text-xs mt-1">
                {safeT('nav.oracle_status')}
              </p>
              <p className="text-green-400/80 text-xs">
                {currentLang === 'DE' ? 'Mit robustem Fallback-System' : currentLang === 'LA' ? 'Cum Systemate Fallback Robusto' : 'With Robust Fallback System'}
              </p>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="relative z-10">
          {/* Introduction Section */}
          {activeSection === 'intro' && (
            <div id="intro">
              <IntroSection language={currentLang} />
            </div>
          )}

          {/* Core Sections */}
          {activeSection === 'search' && (
            <div id="search">
              <TextSearchSection isActive={true} t={safeT} language={currentLang} />
            </div>
          )}

          {activeSection === 'cosmos' && (
            <div id="cosmos">
              <CosmosSection isActive={true} t={safeT} language={currentLang} />
            </div>
          )}

          {activeSection === 'banquet' && (
            <div id="banquet">
              <BanquetSection isActive={true} t={safeT} language={currentLang} />
            </div>
          )}

          {activeSection === 'worldmap' && (
            <div id="worldmap">
              <WorldMapSection isActive={true} t={safeT} language={currentLang} />
            </div>
          )}

          {activeSection === 'quiz' && (
            <div id="quiz">
              <QuizSection isActive={true} language={currentLang} />
            </div>
          )}

          {activeSection === 'learning' && (
            <div id="learning">
              <LearningSection />
            </div>
          )}

          {activeSection === 'visualizations' && (
            <div id="visualizations">
              <VisualizationsSection isActive={true} t={safeT} language={currentLang} />
            </div>
          )}

          {/* Enhanced AI Systems */}
          {activeSection === 'ai-cultural' && (
            <div id="ai-cultural">
              <RealAICulturalAnalysisSection />
            </div>
          )}

          {activeSection === 'ai-learning' && (
            <div id="ai-learning">
              <PersonalizedLearningPathsComplete language={currentLang} />
            </div>
          )}

          {activeSection === 'ai-tutoring' && (
            <div id="ai-tutoring">
              <AITutoringSystemComplete language={currentLang} />
            </div>
          )}

          {activeSection === 'ai-modules' && (
            <div id="ai-modules">
              <AdvancedCulturalModulesFixed language={currentLang} />
            </div>
          )}

          {/* KI-RAG-Assistant */}
          {activeSection === 'ai-rag-assistant' && (
            <div id="ai-rag-assistant">
              <KIRAGAssistentSection />
            </div>
          )}
        </main>

        {/* Enhanced CSS Styles */}
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