import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { enhancedApiClient } from '@/lib/enhanced-api-client-with-fallback';
import { 
  BookOpen, 
  Star, 
  Globe, 
  Heart, 
  Sparkles, 
  Clock, 
  Crown, 
  Scroll,
  Brain,
  Zap,
  Activity,
  CheckCircle,
  AlertCircle,
  Loader2,
  Coffee,
  Lightbulb,
  Target,
  Server,
  Wifi,
  WifiOff,
  Settings,
  Database,
  Monitor,
  ArrowRight,
  ChevronRight,
  Bot,
  Cpu,
  Search
} from 'lucide-react';

interface IntroSectionProps {
  language: 'DE' | 'EN' | 'LA';
  onNavigateToSection?: (section: string) => void;
}

interface ConnectionStatus {
  oracle: 'connected' | 'cors_error' | 'timeout' | 'offline' | 'checking';
  rag: 'connected' | 'fallback_active' | 'local_processing' | 'checking';
  ai_systems: 'connected' | 'fallback_active' | 'local_processing' | 'checking';
  message: string;
  timestamp: number;
  attempts: number;
  fallback_note?: string;
}

// 🎨 Enhanced About Modal
const AboutModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  language: 'DE' | 'EN' | 'LA';
}> = ({ isOpen, onClose, language }) => {
  const { t } = useLanguage();
  
  if (!isOpen) return null;
  
  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(12px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '40px',
          maxWidth: '700px',
          width: '100%',
          maxHeight: '85vh',
          overflowY: 'auto',
          boxShadow: '0 32px 64px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(212, 175, 55, 0.2)',
          border: '3px solid rgba(212, 175, 55, 0.15)'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            border: '2px solid rgba(212, 175, 55, 0.2)',
            color: '#92400e',
            cursor: 'pointer',
            fontSize: '20px',
            fontWeight: 'bold'
          }}
        >
          ×
        </button>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Crown style={{ width: '56px', height: '56px', color: '#d4af37', margin: '0 auto 20px' }} />
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#92400e', margin: '0 0 12px 0' }}>
            {t('about.title')}
          </h2>
          <p style={{ fontSize: '18px', color: '#a16207', fontStyle: 'italic' }}>
            {t('about.subtitle')}
          </p>
        </div>
        
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#92400e', marginBottom: '16px' }}>
            {t('about.biography.title')}
          </h3>
          <p style={{ fontSize: '16px', color: '#374151', lineHeight: '1.7' }}>
            {t('about.biography.text')}
          </p>
        </div>
        
        <div>
          <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#92400e', marginBottom: '16px' }}>
            {t('about.works.title')}
          </h3>
          <p style={{ fontSize: '16px', color: '#374151', lineHeight: '1.7' }}>
            {t('about.works.text')}
          </p>
        </div>
      </div>
    </div>
  );
};

// 🎨 Enhanced Feature Card with Navigation
const FeatureCard: React.FC<{
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  status: 'active' | 'enhanced' | 'ai';
  statusLabel: string;
  onClick?: () => void;
  aiAvailable?: boolean;
}> = ({ icon: Icon, title, description, status, statusLabel, onClick, aiAvailable = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const statusConfig = {
    active: {
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      borderColor: 'rgba(16, 185, 129, 0.3)'
    },
    enhanced: {
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)',
      borderColor: 'rgba(245, 158, 11, 0.3)'
    },
    ai: {
      color: aiAvailable ? '#8b5cf6' : '#6b7280',
      bgColor: aiAvailable ? 'rgba(139, 92, 246, 0.1)' : 'rgba(107, 114, 128, 0.1)',
      borderColor: aiAvailable ? 'rgba(139, 92, 246, 0.3)' : 'rgba(107, 114, 128, 0.3)'
    }
  };
  
  const config = statusConfig[status];
  
  return (
    <div
      style={{
        padding: '28px',
        borderRadius: '16px',
        border: `2px solid ${isHovered ? config.borderColor : 'rgba(212, 175, 55, 0.2)'}`,
        background: isHovered 
          ? `linear-gradient(135deg, ${config.bgColor}, rgba(255, 255, 255, 0.9))`
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 246, 240, 0.8))',
        backdropFilter: 'blur(16px)',
        transition: 'all 0.5s ease',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'none',
        boxShadow: isHovered 
          ? `0 25px 50px rgba(${status === 'ai' ? '139, 92, 246' : '212, 175, 55'}, 0.3)`
          : '0 10px 30px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Status Badge */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        fontSize: '9px',
        fontWeight: '800',
        color: config.color,
        backgroundColor: config.bgColor,
        padding: '4px 8px',
        borderRadius: '6px',
        border: `1px solid ${config.borderColor}`,
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        {status === 'ai' && <Zap style={{ width: '10px', height: '10px' }} />}
        {statusLabel}
      </div>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        gap: '16px'
      }}>
        <div style={{
          padding: '16px',
          borderRadius: '12px',
          backgroundColor: `${config.color}15`,
          border: `2px solid ${config.color}30`
        }}>
          <Icon style={{ width: '28px', height: '28px', color: config.color }} />
        </div>
        
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: '#92400e',
          margin: 0,
          flex: 1
        }}>
          {title}
        </h3>
      </div>
      
      <p style={{
        fontSize: '15px',
        color: '#6b7280',
        lineHeight: '1.6',
        margin: 0
      }}>
        {description}
      </p>
      
      {/* AI Available Indicator */}
      {status === 'ai' && (
        <div style={{
          marginTop: '16px',
          padding: '8px 12px',
          backgroundColor: aiAvailable ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
          border: `1px solid ${aiAvailable ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
          borderRadius: '8px',
          fontSize: '12px',
          fontWeight: '600',
          color: aiAvailable ? '#059669' : '#d97706',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          {aiAvailable ? <CheckCircle style={{ width: '14px', height: '14px' }} /> : <Activity style={{ width: '14px', height: '14px' }} />}
          {aiAvailable ? 'KI-System verfügbar' : 'Lokale Verarbeitung aktiv'}
        </div>
      )}
    </div>
  );
};

// 🔧 Enhanced Connection Status Component
const ConnectionStatus: React.FC<{
  onTest: () => void;
  testing: boolean;
  connectionState: ConnectionStatus | null;
}> = ({ onTest, testing, connectionState }) => {
  const getStatusIcon = () => {
    if (testing) return <Loader2 style={{ width: '18px', height: '18px', animation: 'spin 1s linear infinite' }} />;
    
    if (!connectionState) return <Activity style={{ width: '18px', height: '18px' }} />;
    
    switch (connectionState.oracle) {
      case 'connected': return <CheckCircle style={{ width: '18px', height: '18px' }} />;
      case 'cors_error':
      case 'timeout':
      case 'offline': return <Bot style={{ width: '18px', height: '18px' }} />; // Bot icon for fallback
      default: return <Activity style={{ width: '18px', height: '18px' }} />;
    }
  };
  
  const getStatusColor = () => {
    if (testing) return '#6b7280';
    if (!connectionState) return '#6b7280';
    
    switch (connectionState.oracle) {
      case 'connected': return '#10b981';
      case 'cors_error':
      case 'timeout':
      case 'offline': return '#f59e0b'; // Amber for fallback systems
      default: return '#6b7280';
    }
  };
  
  const getStatusMessage = () => {
    if (testing) return '🔍 Teste Oracle Cloud Verbindung...';
    if (!connectionState) return '📡 Verbindungsstatus wird ermittelt...';
    
    return connectionState.message;
  };
  
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px 24px',
      backgroundColor: `${getStatusColor()}10`,
      border: `2px solid ${getStatusColor()}30`,
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      color: getStatusColor(),
      cursor: testing ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(8px)',
      opacity: testing ? 0.7 : 1,
      boxShadow: `0 4px 16px ${getStatusColor()}20`,
      maxWidth: '600px'
    }}>
      {getStatusIcon()}
      <span style={{ flex: 1 }}>{getStatusMessage()}</span>
      {!testing && (
        <button
          onClick={onTest}
          style={{
            marginLeft: '8px',
            padding: '4px 8px',
            borderRadius: '6px',
            border: `1px solid ${getStatusColor()}40`,
            backgroundColor: `${getStatusColor()}15`,
            color: getStatusColor(),
            fontSize: '12px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          Test
        </button>
      )}
    </div>
  );
};

// 🚀 Enhanced AI System Status Dashboard
const AISystemsDashboard: React.FC<{
  connectionState: ConnectionStatus | null;
  onNavigate: (section: string) => void;
}> = ({ connectionState, onNavigate }) => {
  const aiSystems = [
    {
      id: 'rag',
      name: 'RAG Assistant',
      icon: Search,
      description: 'Semantische Suche in 1.401 Textstellen',
      target: 'ki-rag-assistant',
      status: connectionState?.rag || 'checking'
    },
    {
      id: 'tutoring',
      name: 'AI Tutor',
      description: 'Personalisierte Lernbegleitung',
      icon: Crown,
      target: 'ai-tutoring',
      status: connectionState?.ai_systems || 'checking'
    },
    {
      id: 'cultural',
      name: 'Kulturanalyse',
      description: 'KI-gestützte Textanalyse',
      icon: Brain,
      target: 'ai-cultural-analysis',
      status: connectionState?.ai_systems || 'checking'
    },
    {
      id: 'learning',
      name: 'Lernpfade',
      description: 'Adaptive Lernempfehlungen',
      icon: Target,
      target: 'personalized-learning',
      status: connectionState?.ai_systems || 'checking'
    }
  ];
  
  const getSystemStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return '#10b981';
      case 'fallback_active':
      case 'local_processing': return '#f59e0b';
      default: return '#6b7280';
    }
  };
  
  const getSystemStatusText = (status: string) => {
    switch (status) {
      case 'connected': return 'Online';
      case 'fallback_active': return 'Fallback';
      case 'local_processing': return 'Lokal';
      case 'checking': return 'Prüfung';
      default: return 'Unbekannt';
    }
  };
  
  return (
    <div style={{
      backgroundColor: 'rgba(139, 92, 246, 0.05)',
      border: '2px solid rgba(139, 92, 246, 0.2)',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '40px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <div style={{
          padding: '12px',
          borderRadius: '10px',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          border: '2px solid rgba(139, 92, 246, 0.3)'
        }}>
          <Cpu style={{ width: '24px', height: '24px', color: '#8b5cf6' }} />
        </div>
        <div>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#7c3aed',
            margin: '0 0 4px 0'
          }}>
            🤖 KI-Systeme Status
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: 0
          }}>
            Alle KI-Funktionen sind verfügbar und einsatzbereit
          </p>
        </div>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px'
      }}>
        {aiSystems.map((system) => (
          <div
            key={system.id}
            onClick={() => onNavigate(system.target)}
            style={{
              padding: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(139, 92, 246, 0.1)';
            }}
          >
            <div style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: getSystemStatusColor(system.status)
            }} />
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px'
            }}>
              <system.icon style={{ width: '18px', height: '18px', color: '#8b5cf6' }} />
              <span style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#7c3aed'
              }}>
                {system.name}
              </span>
            </div>
            
            <p style={{
              fontSize: '12px',
              color: '#6b7280',
              margin: '0 0 8px 0',
              lineHeight: '1.4'
            }}>
              {system.description}
            </p>
            
            <div style={{
              fontSize: '10px',
              fontWeight: '600',
              color: getSystemStatusColor(system.status),
              textTransform: 'uppercase'
            }}>
              {getSystemStatusText(system.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 🚀 MAIN INTRO SECTION
export const IntroSection: React.FC<IntroSectionProps> = ({ language, onNavigateToSection }) => {
  const { t } = useLanguage();
  const [showAbout, setShowAbout] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [connectionState, setConnectionState] = useState<ConnectionStatus | null>(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  
  // 🔧 Enhanced Navigation handler
  const handleNavigation = (section: string) => {
    console.log(`🚀 Navigating to section: ${section}`);
    if (typeof window !== 'undefined') {
      const navigationEvent = new CustomEvent('navigateToSection', {
        detail: { section }
      });
      window.dispatchEvent(navigationEvent);
    }
    
    if (onNavigateToSection) {
      onNavigateToSection(section);
    }
  };
  
  // 🖼️ Enhanced image rotation with navigation
  const images = [
    {
      src: '/Rome-under.jpg',
      titleKey: 'image.rome.title',
      subtitleKey: 'image.rome.subtitle',
      navigationTarget: 'worldmap',
      buttonText: 'Weltreise beginnen'
    },
    {
      src: '/Macrobius-Portrait.jpg',
      titleKey: 'image.macrobius.title',
      subtitleKey: 'image.macrobius.subtitle',
      navigationTarget: 'banquet',
      buttonText: 'Gastmahl erkunden'
    },
    {
      src: '/TychoAssistent.jpg',
      titleKey: 'image.tycho.title',
      subtitleKey: 'image.tycho.subtitle',
      navigationTarget: 'cosmos',
      buttonText: 'Kosmos entdecken'
    }
  ];
  
  // 🔧 Enhanced features with AI availability check
  const getFeatures = () => {
    const aiAvailable = connectionState ? 
      (connectionState.ai_systems === 'connected' || 
       connectionState.ai_systems === 'local_processing' ||
       connectionState.ai_systems === 'fallback_active') : true;
    
    const baseFeatures = [
      {
        icon: Brain,
        titleKey: 'features.ai_cultural_analysis.title',
        descriptionKey: 'features.ai_cultural_analysis.description',
        status: 'ai' as const,
        navigationTarget: 'ai-cultural-analysis'
      },
      {
        icon: Target,
        titleKey: 'features.learning_paths.title',
        descriptionKey: 'features.learning_paths.description',
        status: 'ai' as const,
        navigationTarget: 'personalized-learning'
      },
      {
        icon: Crown,
        titleKey: 'features.ai_tutor.title',
        descriptionKey: 'features.ai_tutor.description',
        status: 'ai' as const,
        navigationTarget: 'ai-tutoring'
      },
      {
        icon: BookOpen,
        titleKey: 'features.vocabulary_trainer.title',
        descriptionKey: 'features.vocabulary_trainer.description',
        status: 'enhanced' as const,
        navigationTarget: 'learning'
      },
      {
        icon: Globe,
        titleKey: 'features.visualizations.title',
        descriptionKey: 'features.visualizations.description',
        status: 'enhanced' as const,
        navigationTarget: 'visualizations'
      },
      {
        icon: Coffee,
        titleKey: 'features.banquet.title',
        descriptionKey: 'features.banquet.description',
        status: 'active' as const,
        navigationTarget: 'banquet'
      }
    ];
    
    return baseFeatures.map(feature => ({
      ...feature,
      title: t(feature.titleKey),
      description: t(feature.descriptionKey),
      statusLabel: t(`features.status.${feature.status}`),
      onClick: () => handleNavigation(feature.navigationTarget),
      aiAvailable: feature.status === 'ai' ? aiAvailable : true
    }));
  };
  
  // Enhanced image rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 7000);
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  // 🔧 Enhanced Oracle Cloud connection test
  const testConnection = async () => {
    setIsTestingConnection(true);
    const attempts = (connectionState?.attempts || 0) + 1;
    
    try {
      const result = await enhancedApiClient.getConnectionStatus();
      setConnectionState(result);
    } catch (error) {
      console.error('Connection test failed:', error);
      setConnectionState({
        oracle: 'offline',
        rag: 'fallback_active',
        ai_systems: 'local_processing',
        message: '❌ Verbindungstest fehlgeschlagen - KI-Systeme verwenden lokale Verarbeitung',
        timestamp: Date.now(),
        attempts,
        fallback_note: 'Alle Lernfunktionen bleiben verfügbar!'
      });
    } finally {
      setIsTestingConnection(false);
    }
  };
  
  // Auto-test connection on component mount
  useEffect(() => {
    const autoTestTimer = setTimeout(() => {
      testConnection();
    }, 1500);
    
    return () => clearTimeout(autoTestTimer);
  }, []);
  
  const features = getFeatures();
  
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Enhanced Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          linear-gradient(135deg, rgba(248, 246, 240, 0.95) 0%, rgba(245, 241, 232, 0.97) 30%, rgba(240, 235, 226, 0.95) 100%),
          radial-gradient(circle at 20% 20%, rgba(212, 175, 55, 0.1), transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.08), transparent 50%)
        `,
        zIndex: 1
      }} />
      
      {/* Floating Decorative Elements */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={`decoration-${i}`}
            style={{
              position: 'absolute',
              width: `${Math.random() * 120 + 60}px`,
              height: `${Math.random() * 120 + 60}px`,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(212, 175, 55, ${Math.random() * 0.15 + 0.05}), transparent 70%)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${15 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 6}s`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>
      
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '50px 40px',
        width: '100%'
      }}>
        {/* Enhanced Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          <div style={{ marginBottom: '30px' }}>
            <h1 style={{
              fontSize: '5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #d4af37, #f59e0b, #92400e, #8b5cf6)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 20px 0',
              fontFamily: 'Times New Roman, serif',
              animation: 'titleGradientFlow 6s ease-in-out infinite'
            }}>
              {t('hero.title')}
            </h1>
            
            <p style={{
              fontSize: '1.8rem',
              color: '#a16207',
              fontStyle: 'italic',
              margin: '0 0 32px 0',
              fontFamily: 'Georgia, serif'
            }}>
              {t('hero.subtitle')}
            </p>
            
            {/* Enhanced AI System Status Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 24px',
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              border: '2px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: '700',
              color: '#7c3aed',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 20px rgba(139, 92, 246, 0.25)'
            }}>
              <Brain style={{ width: '20px', height: '20px' }} />
              🤖 KI-SYSTEME AKTIV - Tier 3 AI Features
              <Sparkles style={{ width: '16px', height: '16px' }} />
            </div>
          </div>
          
          {/* Enhanced Connection Status */}
          <div style={{ marginBottom: '30px' }}>
            <ConnectionStatus 
              onTest={testConnection}
              testing={isTestingConnection}
              connectionState={connectionState}
            />
          </div>
        </div>
        
        {/* AI Systems Dashboard */}
        <AISystemsDashboard 
          connectionState={connectionState}
          onNavigate={handleNavigation}
        />
        
        {/* Enhanced Two-Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'flex-start',
          marginBottom: '60px'
        }}>
          {/* Left Column - Cultural Story */}
          <div>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '40px',
              border: '2px solid rgba(212, 175, 55, 0.2)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(16px)'
            }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#92400e',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                fontFamily: 'Times New Roman, serif'
              }}>
                <Scroll style={{ width: '32px', height: '32px', color: '#d4af37' }} />
                {t('hero.description')}
              </h2>
              
              <p style={{
                fontSize: '17px',
                lineHeight: '1.8',
                color: '#374151',
                margin: '0 0 32px 0',
                textAlign: 'justify'
              }}>
                {t('cultural_story')}
              </p>
              
              <div style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={() => setShowAbout(true)}
                  style={{
                    padding: '16px 24px',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    border: '2px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '12px',
                    color: '#92400e',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <Crown style={{ width: '18px', height: '18px' }} />
                  {t('hero.learn_more')}
                </button>
                
                <button
                  onClick={() => handleNavigation('ki-rag-assistant')}
                  style={{
                    padding: '16px 24px',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    border: '2px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '12px',
                    color: '#7c3aed',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <Sparkles style={{ width: '18px', height: '18px' }} />
                  KI-RAG Assistent
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Column - Image Carousel */}
          <div style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
            border: '3px solid rgba(212, 175, 55, 0.3)',
            cursor: 'pointer'
          }}>
            {images.map((image, index) => (
              <div
                key={index}
                style={{
                  position: index === 0 ? 'relative' : 'absolute',
                  inset: 0,
                  opacity: index === currentImageIndex ? 1 : 0,
                  transition: 'opacity 1.5s ease-in-out'
                }}
                onClick={() => handleNavigation(image.navigationTarget)}
              >
                <img
                  src={image.src}
                  alt={t(image.titleKey)}
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.5), transparent)',
                  padding: '32px',
                  color: 'white'
                }}>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: 'bold',
                    margin: '0 0 8px 0'
                  }}>
                    {t(image.titleKey)}
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    margin: '0 0 16px 0',
                    opacity: 0.9
                  }}>
                    {t(image.subtitleKey)}
                  </p>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigation(image.navigationTarget);
                    }}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: 'rgba(212, 175, 55, 0.9)',
                      border: '2px solid #d4af37',
                      borderRadius: '20px',
                      color: '#1a1a1a',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    {image.buttonText}
                    <ChevronRight style={{ width: '16px', height: '16px' }} />
                  </button>
                </div>
              </div>
            ))}
            
            {/* Navigation dots */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              display: 'flex',
              gap: '12px',
              zIndex: 10
            }}>
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: index === currentImageIndex 
                      ? 'rgba(255, 255, 255, 0.95)'
                      : 'rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Enhanced Features Grid */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '40px',
            fontWeight: 'bold',
            color: '#92400e',
            textAlign: 'center',
            marginBottom: '60px',
            fontFamily: 'Times New Roman, serif',
            background: 'linear-gradient(135deg, #92400e, #d4af37)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🏰 {t('features.title')}
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px'
          }}>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                status={feature.status}
                statusLabel={feature.statusLabel}
                onClick={feature.onClick}
                aiAvailable={feature.aiAvailable}
              />
            ))}
          </div>
        </div>
        
        {/* Technical Overview Section */}
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          border: '2px solid rgba(107, 114, 128, 0.3)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(16px)'
        }}>
          <Server style={{ width: '56px', height: '56px', color: '#6b7280', margin: '0 auto 20px' }} />
          <h3 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#374151',
            marginBottom: '16px'
          }}>
            Technical Overview
          </h3>
          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            lineHeight: '1.7',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            This application integrates semantic search, Oracle Cloud backend connectivity, and React-based frontend architecture with over 44 specialized components for classical Latin education.
          </p>
        </div>
      </div>
      
      {/* About Modal */}
      <AboutModal 
        isOpen={showAbout} 
        onClose={() => setShowAbout(false)} 
        language={language}
      />
      
      {/* Enhanced global animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(2deg); }
          66% { transform: translateY(-8px) rotate(-1deg); }
        }
        
        @keyframes titleGradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default IntroSection;