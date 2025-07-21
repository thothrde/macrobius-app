import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

// Essential Icons
import { 
  Home, 
  HelpCircle, 
  Globe, 
  Star, 
  Wine,
  Search, 
  GraduationCap, 
  BarChart3,
  User,
  Sparkles,
  BookOpen,
  Brain,
  Target,
  Scroll,
  Crown,
  Filter,
  AlertTriangle,
  Network,
  CalendarDays,
  Gauge,
  Wifi,
  WifiOff,
  ShieldAlert,
  CheckCircle,
  Zap,
  Loader2,
  RefreshCw,
  Activity
} from 'lucide-react';

// Import all section components
import { IntroSection } from '@/components/sections/IntroSection';
import BanquetSection from '@/components/sections/BanquetSection';
import CosmosSection from '@/components/sections/CosmosSection';
import QuizSection from '@/components/sections/QuizSection';
import TextSearchSection from '@/components/sections/TextSearchSection';
import WorldMapSection from '@/components/sections/WorldMapSection';
import VisualizationsSection from '@/components/sections/VisualizationsSection';
import VocabularyTrainer from '@/components/sections/VocabularyTrainer-CORPUS-EXPANSION-COMPLETE';
import LearningSection from '@/components/sections/LearningSection-enhanced-complete';
import AICulturalAnalysisSection from '@/components/sections/AICulturalAnalysisSection';
import PersonalizedLearningPaths from '@/components/sections/PersonalizedLearningPaths-COMPLETE';
import AITutoringSystemSection from '@/components/sections/AITutoringSystemSection-COMPLETE';

// Import Enhanced API Client
import { apiClient, MacrobiusAPI, getApiConnectionStatus } from '@/lib/enhanced-api-client-with-fallback';

// TypeScript interfaces
interface ClassicalPortraitProps {
  className?: string;
}

type LanguageCode = 'de' | 'en' | 'la';
type LanguageKey = 'DE' | 'EN' | 'LA';
type CulturalAnalysisTab = 'analyze' | 'explore' | 'statistics';
type LearningPathMode = 'dashboard' | 'daily_plan' | 'knowledge_gaps' | 'prerequisites' | 'ai_optimization';

type ConnectionStatus = {
  oracle: 'connected' | 'offline' | 'checking' | 'cors_error';
  rag: 'connected' | 'offline' | 'checking';
  ai_systems: 'connected' | 'offline' | 'checking';
  corsIssues: boolean;
  preferHTTPS: boolean;
  currentURL: string;
};

// 🏛️ ENHANCED CLASSICAL PORTRAIT WITH ANIMATIONS
const ClassicalMacrobiusPortrait: React.FC<ClassicalPortraitProps> = ({ className = '' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <div className={`relative ${className}`} style={{ perspective: '1000px' }}>
      <div 
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid #f59e0b',
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(139, 92, 41, 0.1))',
          boxShadow: imageLoaded 
            ? '0 8px 32px rgba(212, 175, 55, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)' 
            : '0 4px 12px rgba(212, 175, 55, 0.3)',
          margin: '0 auto 16px',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: imageLoaded ? 'translateY(-2px) rotateY(5deg)' : 'translateY(0) rotateY(0deg)',
          position: 'relative'
        }}
      >
        <img 
          src="/Macrobius-Portrait.jpg" 
          alt="Macrobius Classical Portrait"
          onLoad={() => setImageLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: imageLoaded 
              ? 'sepia(15%) saturate(120%) brightness(110%) contrast(105%)' 
              : 'sepia(10%) saturate(110%) brightness(105%)'
          }}
        />
        <div 
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            textAlign: 'center',
            padding: '4px',
            background: 'linear-gradient(to top, rgba(212, 175, 55, 0.9), transparent)',
            backdropFilter: 'blur(4px)'
          }}
        >
          <span style={{ 
            fontSize: '10px', 
            fontWeight: 'bold', 
            color: '#92400e',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
          }}>
            MACROBIVS
          </span>
        </div>
        
        {/* Subtle glow effect */}
        {imageLoaded && (
          <div 
            style={{
              position: 'absolute',
              inset: '-2px',
              borderRadius: '50%',
              background: 'conic-gradient(from 0deg, rgba(212, 175, 55, 0.3), rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.3))',
              zIndex: -1,
              animation: 'gentleRotate 8s linear infinite'
            }}
          />
        )}
      </div>
      
      <style jsx>{`
        @keyframes gentleRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// 🌟 ENHANCED FLOATING ELEMENTS WITH PHYSICS
const FloatingElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 15 }, (_, i) => {
        const size = Math.random() * 6 + 2;
        const delay = Math.random() * 8;
        const duration = 12 + Math.random() * 16;
        const xOffset = Math.random() * 40 - 20;
        
        return (
          <div
            key={`element-${i}`}
            className="absolute rounded-full"
            style={{
              width: size + 'px',
              height: size + 'px',
              backgroundColor: i % 3 === 0 ? '#d4af37' : i % 3 === 1 ? '#f59e0b' : '#92400e',
              opacity: 0.15 + Math.random() * 0.1,
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `enhancedFloat ${duration}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
              filter: 'blur(0.5px)'
            }}
          />
        );
      })}
      
      {/* Additional larger elements for depth */}
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={`large-${i}`}
          className="absolute rounded-full"
          style={{
            width: '8px',
            height: '8px',
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.05))',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animation: `largeFloat ${20 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 10}s`
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes enhancedFloat {
          0%, 100% { 
            transform: translate(0px, 0px) rotate(0deg) scale(1); 
            opacity: 0.15; 
          }
          25% { 
            transform: translate(10px, -20px) rotate(5deg) scale(1.1); 
            opacity: 0.25; 
          }
          50% { 
            transform: translate(-5px, -35px) rotate(-3deg) scale(0.9); 
            opacity: 0.1; 
          }
          75% { 
            transform: translate(-15px, -20px) rotate(7deg) scale(1.05); 
            opacity: 0.2; 
          }
        }
        
        @keyframes largeFloat {
          0%, 100% { 
            transform: translate(0px, 0px) scale(1); 
            opacity: 0.2; 
          }
          50% { 
            transform: translate(-30px, -50px) scale(1.3); 
            opacity: 0.05; 
          }
        }
      `}</style>
    </div>
  );
};

// 🏛️ MAIN ENHANCED CLASSICAL APP
const ClassicalMacrobiusApp: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [currentSection, setCurrentSection] = useState<string>('intro');
  const [currentSubSection, setCurrentSubSection] = useState<string>('');
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    oracle: 'checking',
    rag: 'checking',
    ai_systems: 'checking',
    corsIssues: false,
    preferHTTPS: true,
    currentURL: ''
  });
  const [fallbackMode, setFallbackMode] = useState<boolean>(false);
  const [isReconnecting, setIsReconnecting] = useState<boolean>(false);
  const [lastConnectionCheck, setLastConnectionCheck] = useState<number>(0);
  
  // 🔌 ENHANCED CONNECTION MONITORING WITH VISUAL FEEDBACK
  useEffect(() => {
    const checkAllConnections = async () => {
      try {
        const status = apiClient.getConnectionStatus();
        const inFallbackMode = apiClient.isInFallbackMode();
        
        setConnectionStatus(status);
        setFallbackMode(inFallbackMode);
        setLastConnectionCheck(Date.now());
        
        console.log('🏛️ ENHANCED CONNECTION STATUS:', {
          status,
          fallbackMode: inFallbackMode,
          timestamp: new Date().toLocaleTimeString()
        });
        
        // Test backend health if connected
        if (status.oracle === 'connected') {
          try {
            const healthResponse = await MacrobiusAPI.system.healthCheck();
            console.log('✅ Backend health check successful:', healthResponse.status);
          } catch (error) {
            console.log('⚠️ Backend health check failed:', error);
          }
        }
        
      } catch (error) {
        console.error('❌ Connection check failed:', error);
        setConnectionStatus({
          oracle: 'offline',
          rag: 'offline', 
          ai_systems: 'checking', // Client-side AI might still work
          corsIssues: true,
          preferHTTPS: true,
          currentURL: ''
        });
        setFallbackMode(true);
      }
    };
    
    // Initial connection check
    checkAllConnections();
    
    // Periodic connection monitoring (less frequent to avoid spam)
    const interval = setInterval(checkAllConnections, 90000); // Check every 1.5 minutes
    return () => clearInterval(interval);
  }, []);
  
  // 📝 ENHANCED STATUS LOGGING
  useEffect(() => {
    console.log('🏛️ MACROBIUS: AI-POWERED LATIN EDUCATION PLATFORM');
    console.log('✅ Core Features: RAG System, Cultural Analysis, AI Tutoring');
    console.log('🔧 Enhanced Status:', { 
      connectionStatus, 
      fallbackMode, 
      lastCheck: new Date(lastConnectionCheck).toLocaleTimeString() 
    });
    
    // Enhanced document title with connection status
    const statusEmoji = connectionStatus.oracle === 'connected' ? '🟢' : 
                       connectionStatus.oracle === 'cors_error' ? '🟡' : '🔴';
    document.title = `${statusEmoji} Macrobius - AI-Powered Latin Education`;
  }, [connectionStatus, fallbackMode, lastConnectionCheck]);
  
  const convertToLanguage = (lang: LanguageCode): LanguageKey => {
    switch(lang) {
      case 'de': return 'DE';
      case 'en': return 'EN';
      case 'la': return 'LA';
      default: return 'DE';
    }
  };

  const getLanguageKey = (lang: LanguageKey): LanguageCode => {
    switch(lang) {
      case 'DE': return 'de';
      case 'EN': return 'en';
      case 'LA': return 'la';
      default: return 'de';
    }
  };

  const handleLanguageChange = (lang: LanguageCode): void => {
    setLanguage(convertToLanguage(lang));
  };

  // ✅ Type-safe helper functions for AI component props
  const getValidCulturalAnalysisTab = (subsection: string): CulturalAnalysisTab => {
    switch (subsection) {
      case 'analyze':
      case 'explore':
      case 'statistics':
        return subsection as CulturalAnalysisTab;
      default:
        return 'analyze';
    }
  };

  const getValidLearningPathMode = (subsection: string): LearningPathMode => {
    switch (subsection) {
      case 'dashboard':
      case 'daily_plan':
      case 'knowledge_gaps':
      case 'prerequisites':
      case 'ai_optimization':
        return subsection as LearningPathMode;
      default:
        return 'dashboard';
    }
  };

  // 📚 ENHANCED NAVIGATION SECTIONS WITH DESCRIPTIONS
  const mainSections = [
    { 
      id: 'intro', 
      label: { de: 'Einführung', en: 'Introduction', la: 'Introductio' }, 
      icon: Home,
      description: { de: 'Willkommen bei Macrobius', en: 'Welcome to Macrobius', la: 'Salve in Macrobium' }
    },
    { 
      id: 'quiz', 
      label: { de: 'Quiz', en: 'Quiz', la: 'Quaestiones' }, 
      icon: HelpCircle,
      description: { de: 'Interaktive Lernkontrolle', en: 'Interactive Learning', la: 'Quaestiones Interactivae' }
    },
    { 
      id: 'worldmap', 
      label: { de: 'Weltkarte', en: 'World Map', la: 'Mappa Mundi' }, 
      icon: Globe,
      description: { de: 'Geografische Visualisierung', en: 'Geographic Visualization', la: 'Visualizatio Geographica' }
    },
    { 
      id: 'cosmos', 
      label: { de: 'Kosmos', en: 'Cosmos', la: 'Cosmos' }, 
      icon: Star,
      description: { de: 'Astronomische Konzepte', en: 'Astronomical Concepts', la: 'Conceptus Astronomici' }
    },
    { 
      id: 'banquet', 
      label: { de: 'Gastmahl', en: 'Banquet', la: 'Convivium' }, 
      icon: Wine,
      description: { de: 'Römische Gastmähler', en: 'Roman Banquets', la: 'Convivia Romana' }
    },
    { 
      id: 'textsearch', 
      label: { de: 'Textsuche', en: 'Text Search', la: 'Quaestio Textuum' }, 
      icon: Search,
      description: { de: 'Erweiterte Textanalyse', en: 'Advanced Text Analysis', la: 'Analysis Textuum Provecta' }
    },
    { 
      id: 'learning', 
      label: { de: 'Lernen', en: 'Learning', la: 'Discere' }, 
      icon: GraduationCap,
      description: { de: 'Pädagogische Werkzeuge', en: 'Educational Tools', la: 'Instrumenta Paedagogica' }
    },
    { 
      id: 'vokabeltrainer', 
      label: { de: 'Vokabeltrainer', en: 'Vocabulary Trainer', la: 'Exercitium Vocabulorum' }, 
      icon: BookOpen,
      description: { de: 'Intelligentes SRS-System', en: 'Intelligent SRS System', la: 'Systema SRS Intelligens' }
    },
    { 
      id: 'visualizations', 
      label: { de: 'Visualisierungen', en: 'Visualizations', la: 'Visualizationes' }, 
      icon: BarChart3,
      description: { de: 'Datenvisualisierung', en: 'Data Visualization', la: 'Visualizatio Datorum' }
    }
  ];

  const kiSections = [
    { 
      id: 'ki-kulturanalyse', 
      label: { de: 'KI-Kulturanalyse', en: 'AI Cultural Analysis', la: 'AI Analysis Culturalis' }, 
      icon: Brain,
      tier: 3,
      description: { de: 'Echte KI-Kulturanalyse', en: 'Real AI Cultural Analysis', la: 'Analysis AI Culturalis Vera' }
    },
    { 
      id: 'lernpfade', 
      label: { de: 'Lernpfade', en: 'Learning Paths', la: 'Semitae Discendi' }, 
      icon: Target,
      tier: 3,
      description: { de: 'KI-optimierte Lernpfade', en: 'AI-Optimized Learning Paths', la: 'Semitae AI-Optimizatae' }
    },
    { 
      id: 'ki-tutor', 
      label: { de: 'KI-Tutor', en: 'AI Tutor', la: 'AI Praeceptor' }, 
      icon: Crown,
      tier: 3,
      description: { de: 'Intelligenter AI-Tutor', en: 'Intelligent AI Tutor', la: 'AI Praeceptor Intelligens' }
    },
    { 
      id: 'kulturmodule', 
      label: { de: 'Kulturmodule', en: 'Cultural Modules', la: 'Moduli Culturales' }, 
      icon: Scroll,
      tier: 3,
      description: { de: 'Erweiterte Kulturmodule', en: 'Advanced Cultural Modules', la: 'Moduli Culturales Provecti' }
    }
  ];

  // ✅ ENHANCED SUB-NAVIGATION WITH DESCRIPTIONS
  const getSubSections = (sectionId: string) => {
    switch(sectionId) {
      case 'ki-kulturanalyse':
        return [
          { 
            id: 'analyze', 
            label: { de: 'KI-Analyse', en: 'AI Analysis', la: 'Analysis AI' }, 
            icon: Brain,
            description: { de: 'Echte NLP-Analyse', en: 'Real NLP Analysis', la: 'Analysis NLP Vera' }
          },
          { 
            id: 'explore', 
            label: { de: 'Themen-Explorer', en: 'Theme Explorer', la: 'Explorator Thematum' }, 
            icon: Search,
            description: { de: 'Kulturelle Themenexploration', en: 'Cultural Theme Exploration', la: 'Exploratio Thematum Culturalium' }
          },
          { 
            id: 'statistics', 
            label: { de: 'Statistiken', en: 'Statistics', la: 'Statistica' }, 
            icon: BarChart3,
            description: { de: 'KI-generierte Statistiken', en: 'AI-Generated Statistics', la: 'Statistica AI-Generata' }
          }
        ];
      case 'lernpfade':
        return [
          { 
            id: 'dashboard', 
            label: { de: 'Dashboard', en: 'Dashboard', la: 'Tabula Administrationis' }, 
            icon: Gauge,
            description: { de: 'KI-Lern-Dashboard', en: 'AI Learning Dashboard', la: 'Tabula AI Discendi' }
          },
          { 
            id: 'daily_plan', 
            label: { de: 'KI-Tagesplan', en: 'AI Daily Plan', la: 'Consilium AI Diurnum' }, 
            icon: CalendarDays,
            description: { de: 'Intelligente Tagesplanung', en: 'Intelligent Daily Planning', la: 'Consilium Diurnum Intelligens' }
          },
          { 
            id: 'knowledge_gaps', 
            label: { de: 'KI-Wissenslücken', en: 'AI Knowledge Gaps', la: 'Lacunae AI Scientiae' }, 
            icon: AlertTriangle,
            description: { de: 'KI-Wissenslückenanalyse', en: 'AI Knowledge Gap Analysis', la: 'Analysis AI Lacunarum Scientiae' }
          },
          { 
            id: 'prerequisites', 
            label: { de: 'KI-Voraussetzungen', en: 'AI Prerequisites', la: 'Requisita AI' }, 
            icon: Network,
            description: { de: 'Intelligente Voraussetzungsmappierung', en: 'Intelligent Prerequisites Mapping', la: 'Mappatio AI Requisitorum' }
          },
          { 
            id: 'ai_optimization', 
            label: { de: 'KI-Optimierung', en: 'AI Optimization', la: 'Optimizatio AI' }, 
            icon: Sparkles,
            description: { de: 'ML-basierte Optimierung', en: 'ML-Based Optimization', la: 'Optimizatio ML-Basata' }
          }
        ];
      default:
        return [];
    }
  };

  // ✅ SECTION RENDERING WITH ENHANCED PROPS
  const renderSection = () => {
    console.log('🔍 Rendering section with Enhanced AI:', currentSection, 'subsection:', currentSubSection);
    
    switch(currentSection) {
      case 'intro': 
        return <IntroSection language={language} />;
      case 'banquet': 
        return <BanquetSection isActive={true} language={language} />;
      case 'cosmos': 
        return <CosmosSection isActive={true} language={language} />;
      case 'quiz': 
        return <QuizSection isActive={true} language={language} />;
      case 'textsearch': 
        return <TextSearchSection isActive={true} language={language} />;
      case 'worldmap': 
        return <WorldMapSection isActive={true} t={t} language={language} />;
      case 'visualizations': 
        return <VisualizationsSection isActive={true} language={language} />;
      case 'vokabeltrainer': 
        return <VocabularyTrainer isActive={true} language={language} />;
      case 'learning': 
        return <LearningSection isActive={true} language={language} />;
      
      // ✅ TIER 3 AI COMPONENTS WITH ENHANCED INTEGRATION
      case 'ki-kulturanalyse':
        return (
          <AICulturalAnalysisSection 
            language={language} 
            activeTab={getValidCulturalAnalysisTab(currentSubSection)}
          />
        );
      case 'lernpfade':
        return (
          <PersonalizedLearningPaths 
            currentMode={getValidLearningPathMode(currentSubSection)}
          />
        );
      case 'ki-tutor':
        return (
          <AITutoringSystemSection 
            language={language}
          />
        );
      case 'kulturmodule':
        return (
          <AICulturalAnalysisSection 
            language={language} 
            activeTab={getValidCulturalAnalysisTab(currentSubSection)}
          />
        );
      
      default: 
        return <IntroSection language={language} />;
    }
  };

  // Enhanced navigation with animation feedback
  const handleNavigation = (sectionId: string, subSectionId?: string) => {
    console.log('🔄 Enhanced navigation to:', sectionId, subSectionId ? `(${subSectionId})` : '');
    setCurrentSection(sectionId);
    setCurrentSubSection(subSectionId || '');
  };

  // ✅ ENHANCED RECONNECT HANDLER WITH VISUAL FEEDBACK
  const handleReconnect = async () => {
    console.log('🔄 Enhanced reconnection initiated...');
    setIsReconnecting(true);
    
    try {
      setConnectionStatus(prev => ({
        ...prev,
        oracle: 'checking',
        rag: 'checking',
        ai_systems: 'checking'
      }));
      
      await apiClient.reconnect();
      
      // Update status after reconnection attempt
      const status = apiClient.getConnectionStatus();
      const inFallbackMode = apiClient.isInFallbackMode();
      
      setConnectionStatus(status);
      setFallbackMode(inFallbackMode);
      setLastConnectionCheck(Date.now());
      
      console.log('✅ Enhanced reconnection completed:', {
        status,
        fallbackMode: inFallbackMode,
        timestamp: new Date().toLocaleTimeString()
      });
    } catch (error) {
      console.error('❌ Enhanced reconnection failed:', error);
    } finally {
      setIsReconnecting(false);
    }
  };

  // Connection status helper
  const getConnectionStatusInfo = () => {
    if (connectionStatus.oracle === 'connected') {
      return {
        color: '#10b981',
        icon: CheckCircle,
        text: 'Verbunden',
        detail: `1.401 Texte verfügbar via ${connectionStatus.preferHTTPS ? 'HTTPS' : 'HTTP'}`
      };
    } else if (connectionStatus.corsIssues) {
      return {
        color: '#f59e0b',
        icon: ShieldAlert,
        text: 'CORS-Problem',
        detail: 'Mixed Content Issue - Fallback aktiv'
      };
    } else if (connectionStatus.oracle === 'checking') {
      return {
        color: '#f59e0b',
        icon: Loader2,
        text: 'Prüfung...',
        detail: 'Verbindungstest läuft'
      };
    } else {
      return {
        color: '#ef4444',
        icon: WifiOff,
        text: 'Offline',
        detail: 'Fallback-Modus aktiv'
      };
    }
  };

  const statusInfo = getConnectionStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <div 
      style={{
        minHeight: '100vh',
        maxHeight: '100vh',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f8f6f0 0%, #f5f1e8 25%, #f0ebe2 50%, #ede5d8 75%, #ebe1d0 100%)',
        fontFamily: 'Georgia, serif'
      }}
    >
      {/* ENHANCED ASTROLABIUM BACKGROUND WITH ANIMATION */}
      <div 
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          opacity: 0.06,
          pointerEvents: 'none',
          zIndex: 0,
          width: '400px',
          height: '400px',
          backgroundImage: 'url(/Astrolab.jpg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          filter: 'sepia(20%) saturate(120%) brightness(110%)',
          animation: 'astrolabRotate 120s linear infinite'
        }}
      />
      
      {/* ENHANCED FLOATING ELEMENTS */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 10 }}>
        <FloatingElements />
      </div>
      
      {/* ✅ ENHANCED VERTICAL LEFT SIDEBAR */}
      <aside 
        style={{
          width: '340px',
          minWidth: '340px',
          maxWidth: '340px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 30,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(16px)',
          borderRight: '2px solid rgba(212, 175, 55, 0.2)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(248, 246, 240, 0.9))',
          position: 'relative',
          flexShrink: 0
        }}
      >
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '24px' }}>
          {/* ENHANCED HEADER */}
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <ClassicalMacrobiusPortrait />
            <h1 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#92400e', 
              fontFamily: 'Times New Roman, serif', 
              marginBottom: '8px',
              margin: '0 0 8px 0',
              textShadow: '0 2px 4px rgba(146, 64, 14, 0.1)'
            }}>
              MACROBIUS
            </h1>
            <p style={{ 
              fontSize: '14px', 
              color: '#a16207', 
              fontStyle: 'italic',
              margin: '0 0 8px 0',
              lineHeight: '1.4'
            }}>
              Eine antike Flaschenpost
            </p>
            
            {/* Enhanced AI Status Badge */}
            <div style={{
              marginTop: '12px',
              padding: '6px 12px',
              background: connectionStatus.oracle === 'connected' 
                ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))'
                : 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05))',
              border: `1px solid ${connectionStatus.oracle === 'connected' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
              borderRadius: '6px',
              fontSize: '11px',
              color: connectionStatus.oracle === 'connected' ? '#059669' : '#d97706',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              backdropFilter: 'blur(8px)'
            }}>
              <Activity 
                style={{ 
                  width: '12px', 
                  height: '12px',
                  animation: connectionStatus.oracle === 'checking' ? 'pulse 2s infinite' : 'none'
                }} 
              />
              {connectionStatus.oracle === 'connected' ? 'KI-Systeme Aktiv' : 'Fallback-Modus'}
            </div>
          </div>
          
          {/* ✅ ENHANCED MAIN NAVIGATION */}
          <nav style={{ marginBottom: '32px' }}>
            <h3 style={{ 
              fontSize: '12px', 
              fontWeight: 'bold', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em', 
              marginBottom: '16px', 
              padding: '0 8px', 
              color: '#a16207',
              borderBottom: '1px solid rgba(212, 175, 55, 0.1)',
              paddingBottom: '8px'
            }}>
              Hauptnavigation
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {mainSections.map((section) => {
                const IconComponent = section.icon;
                const isActive = currentSection === section.id;
                return (
                  <div key={section.id}>
                    <button
                      onClick={() => handleNavigation(section.id)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        border: `1px solid ${isActive ? 'rgba(212, 175, 55, 0.5)' : 'rgba(212, 175, 55, 0.1)'}`,
                        backgroundColor: isActive 
                          ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(212, 175, 55, 0.15))'
                          : 'rgba(255, 255, 255, 0.3)',
                        background: isActive 
                          ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(212, 175, 55, 0.15))'
                          : 'rgba(255, 255, 255, 0.3)',
                        color: isActive ? '#92400e' : '#a16207',
                        boxShadow: isActive 
                          ? '0 8px 25px rgba(212, 175, 55, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                          : '0 2px 4px rgba(0, 0, 0, 0.02)',
                        transform: isActive ? 'translateX(6px) scale(1.02)' : 'none',
                        textAlign: 'left',
                        fontFamily: 'Georgia, serif',
                        backdropFilter: 'blur(8px)'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.15)';
                          e.currentTarget.style.transform = 'translateX(3px) scale(1.01)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.2)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                          e.currentTarget.style.transform = 'none';
                          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.02)';
                        }
                      }}
                    >
                      <IconComponent 
                        style={{ 
                          width: '18px', 
                          height: '18px', 
                          color: isActive ? '#d4af37' : '#a16207',
                          flexShrink: 0,
                          filter: isActive ? 'drop-shadow(0 2px 4px rgba(212, 175, 55, 0.3))' : 'none'
                        }} 
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600' }}>
                          {section.label[getLanguageKey(language)]}
                        </div>
                        <div style={{ 
                          fontSize: '11px', 
                          opacity: 0.7, 
                          marginTop: '2px',
                          lineHeight: '1.2'
                        }}>
                          {section.description?.[getLanguageKey(language)]}
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </nav>
          
          {/* ✅ TIER 3 AI SYSTEMS SECTION - ENHANCED */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ 
              fontSize: '12px', 
              fontWeight: 'bold', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em', 
              marginBottom: '16px', 
              padding: '0 8px', 
              color: '#a16207',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderBottom: '1px solid rgba(212, 175, 55, 0.1)',
              paddingBottom: '8px'
            }}>
              Tier 3 KI-Systeme
              <span style={{
                fontSize: '9px', 
                color: '#059669',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: '700',
                border: '1px solid rgba(16, 185, 129, 0.2)'
              }}>
                <Zap style={{ width: '8px', height: '8px', marginRight: '2px', display: 'inline' }} />
                ERWEITERT
              </span>
            </h3>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {kiSections.map((section) => {
                const IconComponent = section.icon;
                const isActive = currentSection === section.id;
                const subSections = getSubSections(section.id);
                
                return (
                  <div key={section.id}>
                    <button
                      onClick={() => handleNavigation(section.id)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        border: `1px solid ${isActive ? 'rgba(212, 175, 55, 0.4)' : 'rgba(212, 175, 55, 0.1)'}`,
                        backgroundColor: isActive 
                          ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.1))'
                          : 'rgba(255, 255, 255, 0.2)',
                        background: isActive 
                          ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.1))'
                          : 'rgba(255, 255, 255, 0.2)',
                        color: isActive ? '#92400e' : '#a16207',
                        textAlign: 'left',
                        fontFamily: 'Georgia, serif',
                        transform: isActive ? 'translateX(4px)' : 'none',
                        backdropFilter: 'blur(8px)',
                        boxShadow: isActive 
                          ? '0 6px 20px rgba(212, 175, 55, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
                          : '0 2px 4px rgba(0, 0, 0, 0.02)'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                          e.currentTarget.style.transform = 'translateX(2px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.15)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                          e.currentTarget.style.transform = 'none';
                          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.02)';
                        }
                      }}
                    >
                      <IconComponent 
                        style={{ 
                          width: '16px', 
                          height: '16px', 
                          color: isActive ? '#d4af37' : '#a16207',
                          flexShrink: 0,
                          filter: isActive ? 'drop-shadow(0 2px 4px rgba(212, 175, 55, 0.3))' : 'none'
                        }} 
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600' }}>
                          {section.label[getLanguageKey(language)]}
                        </div>
                        <div style={{ 
                          fontSize: '10px', 
                          opacity: 0.7, 
                          marginTop: '2px',
                          lineHeight: '1.2'
                        }}>
                          {section.description?.[getLanguageKey(language)]}
                        </div>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <span style={{
                          fontSize: '8px',
                          color: '#059669',
                          fontWeight: '700'
                        }}>
                          T{section.tier}
                        </span>
                        <Zap style={{ 
                          width: '12px', 
                          height: '12px', 
                          color: '#059669',
                          flexShrink: 0
                        }} />
                      </div>
                    </button>
                    
                    {/* ENHANCED SUB-NAVIGATION */}
                    {isActive && subSections.length > 0 && (
                      <div style={{ 
                        marginLeft: '24px', 
                        marginTop: '8px', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '4px',
                        borderLeft: '2px solid rgba(212, 175, 55, 0.2)',
                        paddingLeft: '12px',
                        position: 'relative'
                      }}>
                        {subSections.map((subSection, index) => {
                          const SubIconComponent = subSection.icon;
                          const isSubActive = currentSubSection === subSection.id;
                          return (
                            <button
                              key={subSection.id}
                              onClick={() => handleNavigation(section.id, subSection.id)}
                              style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 12px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: isSubActive ? '600' : '400',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                cursor: 'pointer',
                                border: `1px solid ${isSubActive ? 'rgba(212, 175, 55, 0.4)' : 'transparent'}`,
                                backgroundColor: isSubActive 
                                  ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(212, 175, 55, 0.2))'
                                  : 'rgba(255, 255, 255, 0.1)',
                                background: isSubActive 
                                  ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(212, 175, 55, 0.2))'
                                  : 'rgba(255, 255, 255, 0.1)',
                                color: isSubActive ? '#92400e' : '#a16207',
                                textAlign: 'left',
                                transform: isSubActive ? 'translateX(2px)' : 'none',
                                backdropFilter: 'blur(4px)',
                                opacity: isSubActive ? 1 : 0.8
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.opacity = '1';
                                e.currentTarget.style.backgroundColor = isSubActive 
                                  ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(212, 175, 55, 0.2))'
                                  : 'rgba(212, 175, 55, 0.15)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = isSubActive ? '1' : '0.8';
                                e.currentTarget.style.backgroundColor = isSubActive 
                                  ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(212, 175, 55, 0.2))'
                                  : 'rgba(255, 255, 255, 0.1)';
                              }}
                            >
                              <SubIconComponent 
                                style={{ 
                                  width: '12px', 
                                  height: '12px', 
                                  color: isSubActive ? '#d4af37' : '#a16207',
                                  flexShrink: 0
                                }} 
                              />
                              <div style={{ flex: 1 }}>
                                <div>
                                  {subSection.label[getLanguageKey(language)]}
                                </div>
                                <div style={{ 
                                  fontSize: '9px', 
                                  opacity: 0.6, 
                                  marginTop: '1px',
                                  lineHeight: '1.2'
                                }}>
                                  {subSection.description?.[getLanguageKey(language)]}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
          
          {/* ✅ ENHANCED BACKEND STATUS DISPLAY */}
          <div 
            style={{
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '24px',
              border: `1px solid ${statusInfo.color}40`,
              background: `linear-gradient(135deg, ${statusInfo.color}08, ${statusInfo.color}04)`,
              backdropFilter: 'blur(12px)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#92400e', margin: 0 }}>
                Verbindungsstatus
              </h4>
              <button
                onClick={handleReconnect}
                disabled={isReconnecting}
                style={{
                  fontSize: '10px',
                  padding: '6px 10px',
                  border: '1px solid #d4af37',
                  borderRadius: '6px',
                  backgroundColor: isReconnecting ? 'rgba(212, 175, 55, 0.05)' : 'rgba(212, 175, 55, 0.1)',
                  color: isReconnecting ? '#a16207' : '#92400e',
                  cursor: isReconnecting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: '600'
                }}
                onMouseEnter={(e) => {
                  if (!isReconnecting) {
                    e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isReconnecting) {
                    e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                <RefreshCw 
                  style={{ 
                    width: '10px', 
                    height: '10px',
                    animation: isReconnecting ? 'spin 1s linear infinite' : 'none'
                  }} 
                />
                {isReconnecting ? 'Verbinden...' : 'Neuverbindung'}
              </button>
            </div>
            
            {/* Main Connection Status */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px',
              padding: '12px',
              background: `linear-gradient(135deg, ${statusInfo.color}10, ${statusInfo.color}05)`,
              borderRadius: '8px',
              border: `1px solid ${statusInfo.color}20`
            }}>
              <StatusIcon 
                style={{ 
                  width: '16px', 
                  height: '16px', 
                  color: statusInfo.color,
                  flexShrink: 0,
                  animation: connectionStatus.oracle === 'checking' ? 'spin 2s linear infinite' : 'none'
                }} 
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#92400e' }}>
                  Oracle Cloud: {statusInfo.text}
                </div>
                <div style={{ fontSize: '10px', color: '#a16207', opacity: 0.8, marginTop: '2px' }}>
                  {statusInfo.detail}
                </div>
              </div>
            </div>
            
            {/* Additional Status Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div 
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: connectionStatus.oracle === 'connected' ? '#10b981' : '#ef4444',
                    boxShadow: `0 0 8px ${connectionStatus.oracle === 'connected' ? '#10b981' : '#ef4444'}40`
                  }}
                />
                <span style={{ fontSize: '10px', color: '#a16207', fontWeight: '500' }}>
                  RAG-System: {connectionStatus.oracle === 'connected' ? 'Oracle Cloud Backend' : 'Client-Side Fallback'}
                </span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div 
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981', // Client-side AI is always available
                    boxShadow: '0 0 8px #10b98140'
                  }}
                />
                <span style={{ fontSize: '10px', color: '#a16207', fontWeight: '500' }}>
                  Client-KI: Kulturanalyse & Tutoring Aktiv
                </span>
              </div>
              
              {lastConnectionCheck > 0 && (
                <div style={{ fontSize: '9px', color: '#a16207', opacity: 0.6, marginTop: '4px' }}>
                  Letzte Prüfung: {new Date(lastConnectionCheck).toLocaleTimeString('de-DE')}
                </div>
              )}
            </div>
            
            {/* Background decoration */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '200%',
              height: '200%',
              background: `radial-gradient(circle, ${statusInfo.color}05, transparent 70%)`,
              pointerEvents: 'none'
            }} />
          </div>
          
          {/* ENHANCED LANGUAGE SWITCHER */}
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
            {(['de', 'en', 'la'] as const).map((lang) => {
              const isActive = getLanguageKey(language) === lang;
              return (
                <button
                  key={lang}
                  onClick={() => setLanguage(convertToLanguage(lang))}
                  style={{
                    padding: '10px 14px',
                    fontSize: '12px',
                    fontWeight: '700',
                    borderRadius: '8px',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    border: `1px solid rgba(212, 175, 55, 0.3)`,
                    backgroundColor: isActive 
                      ? 'linear-gradient(135deg, #d4af37, #f59e0b)'
                      : 'rgba(212, 175, 55, 0.1)',
                    background: isActive 
                      ? 'linear-gradient(135deg, #d4af37, #f59e0b)'
                      : 'rgba(212, 175, 55, 0.1)',
                    color: isActive ? '#ffffff' : '#a16207',
                    boxShadow: isActive 
                      ? '0 8px 25px rgba(212, 175, 55, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                      : '0 2px 4px rgba(0, 0, 0, 0.1)',
                    transform: isActive ? 'scale(1.08) translateY(-2px)' : 'scale(1)',
                    fontFamily: 'Georgia, serif',
                    backdropFilter: 'blur(8px)',
                    textShadow: isActive ? '0 1px 2px rgba(0, 0, 0, 0.2)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
                      e.currentTarget.style.transform = 'scale(1.04) translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                >
                  {lang.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>
      </aside>
      
      {/* ENHANCED MAIN CONTENT AREA */}
      <main 
        style={{
          flex: 1,
          minWidth: 0,
          height: '100vh',
          overflowY: 'auto',
          background: 'rgba(255, 255, 255, 0.3)',
          position: 'relative',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          backdropFilter: 'blur(8px)'
        }}
      >
        <div 
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            minHeight: '100%',
            paddingTop: '32px',
            paddingBottom: '32px'
          }}
        >
          <div 
            style={{
              width: '100%',
              maxWidth: '1600px',
              margin: '0 auto',
              padding: '0 32px',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <div style={{ width: '100%', maxWidth: '1200px' }}>
              {renderSection()}
            </div>
          </div>
        </div>
      </main>
      
      {/* Global CSS animations */}
      <style jsx global>{`
        @keyframes astrolabRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* Smooth scrollbar for sidebar */
        aside div:first-child::-webkit-scrollbar {
          width: 4px;
        }
        
        aside div:first-child::-webkit-scrollbar-track {
          background: rgba(212, 175, 55, 0.1);
          border-radius: 2px;
        }
        
        aside div:first-child::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.3);
          border-radius: 2px;
        }
        
        aside div:first-child::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.5);
        }
      `}</style>
    </div>
  );
};

export default ClassicalMacrobiusApp;