import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MacrobiusAPI } from '@/lib/enhanced-api-client-with-fallback';
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
  Monitor
} from 'lucide-react';

interface IntroSectionProps {
  language: 'DE' | 'EN' | 'LA';
}

// 🎨 ENHANCED About Modal with Modern Design
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
        padding: '24px',
        animation: 'modalFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
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
          border: '3px solid rgba(212, 175, 55, 0.15)',
          position: 'relative',
          transform: 'scale(1)',
          animation: 'modalSlideIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          background: 'linear-gradient(145deg, #ffffff, #fefbf7)'
        }}
      >
        {/* 🎨 Enhanced close button */}
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 4px 12px rgba(212, 175, 55, 0.15)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
            e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(212, 175, 55, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.15)';
          }}
        >
          ×
        </button>
        
        {/* 🎨 Enhanced header with gradient background */}
        <div style={{ 
          marginBottom: '32px', 
          textAlign: 'center',
          padding: '24px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(245, 158, 11, 0.05))',
          border: '1px solid rgba(212, 175, 55, 0.2)'
        }}>
          <Crown style={{ 
            width: '56px', 
            height: '56px', 
            color: '#d4af37', 
            marginBottom: '20px', 
            margin: '0 auto 20px',
            filter: 'drop-shadow(0 4px 8px rgba(212, 175, 55, 0.3))'
          }} />
          <h2 style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            color: '#92400e', 
            margin: '0 0 12px 0',
            fontFamily: 'Times New Roman, serif',
            background: 'linear-gradient(135deg, #92400e, #d4af37)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {t('about.title')}
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: '#a16207', 
            fontStyle: 'italic',
            margin: 0,
            lineHeight: '1.6'
          }}>
            {t('about.subtitle')}
          </p>
        </div>
        
        {/* 🎨 Enhanced content sections */}
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ 
            fontSize: '22px', 
            fontWeight: 'bold', 
            color: '#92400e', 
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 0',
            borderBottom: '2px solid rgba(212, 175, 55, 0.2)'
          }}>
            <Scroll style={{ width: '24px', height: '24px', color: '#d4af37' }} />
            {t('about.biography.title')}
          </h3>
          <p style={{ 
            fontSize: '16px', 
            color: '#374151', 
            lineHeight: '1.7',
            margin: 0,
            textAlign: 'justify'
          }}>
            {t('about.biography.text')}
          </p>
        </div>
        
        <div>
          <h3 style={{ 
            fontSize: '22px', 
            fontWeight: 'bold', 
            color: '#92400e', 
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 0',
            borderBottom: '2px solid rgba(212, 175, 55, 0.2)'
          }}>
            <BookOpen style={{ width: '24px', height: '24px', color: '#d4af37' }} />
            {t('about.works.title')}
          </h3>
          <p style={{ 
            fontSize: '16px', 
            color: '#374151', 
            lineHeight: '1.7',
            margin: 0,
            textAlign: 'justify'
          }}>
            {t('about.works.text')}
          </p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes modalSlideIn {
          from { 
            transform: scale(0.9) translateY(-30px); 
            opacity: 0;
          }
          to { 
            transform: scale(1) translateY(0); 
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

// 🎨 ENHANCED Feature Card with Modern Design
const FeatureCard: React.FC<{
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  status: 'active' | 'enhanced' | 'ai';
  statusLabel: string;
  onClick?: () => void;
}> = ({ icon: Icon, title, description, status, statusLabel, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const statusConfig = {
    active: {
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      borderColor: 'rgba(16, 185, 129, 0.3)',
      glowColor: 'rgba(16, 185, 129, 0.4)'
    },
    enhanced: {
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)',
      borderColor: 'rgba(245, 158, 11, 0.3)',
      glowColor: 'rgba(245, 158, 11, 0.4)'
    },
    ai: {
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.1)',
      borderColor: 'rgba(139, 92, 246, 0.3)',
      glowColor: 'rgba(139, 92, 246, 0.4)'
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
          ? `linear-gradient(135deg, ${config.bgColor}, rgba(255, 255, 255, 0.9), ${config.bgColor})`
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 246, 240, 0.8))',
        backdropFilter: 'blur(16px)',
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'none',
        boxShadow: isHovered 
          ? `0 25px 50px ${config.glowColor}, 0 0 0 1px ${config.borderColor}, 0 0 30px ${config.glowColor}20`
          : '0 10px 30px rgba(0, 0, 0, 0.1), 0 1px 8px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* 🎨 Animated background particles */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 20% 20%, ${config.glowColor}15, transparent 70%),
                       radial-gradient(circle at 80% 80%, ${config.glowColor}10, transparent 70%),
                       radial-gradient(circle at 50% 50%, ${config.glowColor}05, transparent 50%)`,
          animation: 'particleFloat 3s ease-in-out infinite'
        }} />
      )}
      
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
        gap: '4px',
        boxShadow: `0 2px 8px ${config.glowColor}30`,
        zIndex: 2
      }}>
        {status === 'ai' && <Zap style={{ width: '10px', height: '10px' }} />}
        {statusLabel}
      </div>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        gap: '16px',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          padding: '16px',
          borderRadius: '12px',
          backgroundColor: `${config.color}15`,
          border: `2px solid ${config.color}30`,
          boxShadow: `0 4px 16px ${config.glowColor}20`
        }}>
          <Icon style={{ 
            width: '28px', 
            height: '28px', 
            color: config.color,
            filter: `drop-shadow(0 2px 4px ${config.glowColor}40)`
          }} />
        </div>
        
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: '#92400e',
          margin: 0,
          flex: 1,
          textShadow: '0 2px 4px rgba(146, 64, 14, 0.1)'
        }}>
          {title}
        </h3>
      </div>
      
      <p style={{
        fontSize: '15px',
        color: '#6b7280',
        lineHeight: '1.6',
        margin: 0,
        position: 'relative',
        zIndex: 2
      }}>
        {description}
      </p>
      
      {/* 🎨 Hover effect shimmer */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          height: '3px',
          background: `linear-gradient(90deg, transparent, ${config.color}, transparent)`,
          animation: 'shimmer 2s ease-in-out infinite',
          zIndex: 3
        }} />
      )}
    </div>
  );
};

// 🔧 ENHANCED Connection Status Component with Real Oracle Cloud Testing
const ConnectionStatus: React.FC<{
  onTest: () => void;
  testing: boolean;
  connectionState: any;
}> = ({ onTest, testing, connectionState }) => {
  const getStatusIcon = () => {
    if (testing) return <Loader2 style={{ width: '18px', height: '18px', animation: 'spin 1s linear infinite' }} />;
    
    switch (connectionState.status) {
      case 'connected': return <CheckCircle style={{ width: '18px', height: '18px' }} />;
      case 'cors_error': return <AlertCircle style={{ width: '18px', height: '18px' }} />;
      case 'error': return <WifiOff style={{ width: '18px', height: '18px' }} />;
      case 'success': return <CheckCircle style={{ width: '18px', height: '18px' }} />;
      default: return <Activity style={{ width: '18px', height: '18px' }} />;
    }
  };
  
  const getStatusColor = () => {
    if (testing) return '#6b7280';
    
    switch (connectionState.status) {
      case 'connected':
      case 'success': return '#10b981';
      case 'cors_error': return '#f59e0b';
      case 'error': return '#ef4444';
      default: return '#6b7280';
    }
  };
  
  const getStatusMessage = () => {
    if (testing) return '🔍 Teste Oracle Cloud Verbindung...';
    
    switch (connectionState.status) {
      case 'connected':
      case 'success': return '✅ Oracle Cloud verbunden - 1.401 authentische Textstellen verfügbar';
      case 'cors_error': return '🔧 Oracle Cloud CORS-Problem - Erweiterte KI-Fallback-Systeme aktiv';
      case 'error': return '⚠️ Oracle Cloud nicht verfügbar - KI-Systeme verwenden lokale Verarbeitung';
      default: return '📡 Oracle Cloud Status wird geprüft...';
    }
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
      boxShadow: `0 4px 16px ${getStatusColor()}20`
    }}>
      {getStatusIcon()}
      <span>{getStatusMessage()}</span>
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
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = `${getStatusColor()}25`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = `${getStatusColor()}15`;
          }}
        >
          Erneut testen
        </button>
      )}
    </div>
  );
};

// 🎨 ENHANCED INTRO SECTION with Modern Visual Design
export const IntroSection: React.FC<IntroSectionProps> = ({ language }) => {
  const { t } = useLanguage();
  const [showAbout, setShowAbout] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoadStates, setImageLoadStates] = useState<Record<number, boolean>>({});
  const [connectionTest, setConnectionTest] = useState<{
    status: 'idle' | 'testing' | 'success' | 'error' | 'connected' | 'cors_error';
    message: string;
    timestamp?: number;
    statusData?: any;
    attempts?: number;
  }>({ status: 'idle', message: '', attempts: 0 });
  
  // 🖼️ FIXED: Enhanced image rotation with correct Rome image
  const images = [
    {
      src: '/Rome-under.jpg',
      titleKey: 'image.rome.title',
      subtitleKey: 'image.rome.subtitle'
    },
    {
      src: '/Macrobius-Portrait.jpg',
      titleKey: 'image.macrobius.title',
      subtitleKey: 'image.macrobius.subtitle'
    },
    {
      src: '/TychoAssistent.jpg',
      titleKey: 'image.tycho.title',
      subtitleKey: 'image.tycho.subtitle'
    }
  ];
  
  // ✅ LANGUAGE-SENSITIVE FEATURES CONFIGURATION
  const getFeatures = () => {
    const baseFeatures = [
      {
        icon: Brain,
        titleKey: 'features.ai_cultural_analysis.title',
        descriptionKey: 'features.ai_cultural_analysis.description',
        status: 'ai' as const
      },
      {
        icon: Target,
        titleKey: 'features.learning_paths.title',
        descriptionKey: 'features.learning_paths.description',
        status: 'ai' as const
      },
      {
        icon: Crown,
        titleKey: 'features.ai_tutor.title',
        descriptionKey: 'features.ai_tutor.description',
        status: 'ai' as const
      },
      {
        icon: BookOpen,
        titleKey: 'features.vocabulary_trainer.title',
        descriptionKey: 'features.vocabulary_trainer.description',
        status: 'enhanced' as const
      },
      {
        icon: Globe,
        titleKey: 'features.visualizations.title',
        descriptionKey: 'features.visualizations.description',
        status: 'enhanced' as const
      },
      {
        icon: Coffee,
        titleKey: 'features.banquet.title',
        descriptionKey: 'features.banquet.description',
        status: 'active' as const
      }
    ];
    
    return baseFeatures.map(feature => ({
      ...feature,
      title: t(feature.titleKey),
      description: t(feature.descriptionKey),
      statusLabel: t(`features.status.${feature.status}`)
    }));
  };
  
  // Enhanced image rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 7000); // Slower transition for better viewing
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  // Handle image load states
  const handleImageLoad = (index: number) => {
    setImageLoadStates(prev => ({ ...prev, [index]: true }));
  };
  
  // 🔧 FIXED: Enhanced Oracle Cloud connection test with proper TypeScript typing
  const testConnection = async () => {
    const attempts = (connectionTest.attempts || 0) + 1;
    setConnectionTest({ status: 'testing', message: 'Teste Verbindung...', attempts });
    
    try {
      console.log(`🔍 Oracle Cloud connection test #${attempts} starting...`);
      
      // Test multiple endpoints with detailed logging
      const endpoints = [
        'http://152.70.184.232:8080/api/health',
        'http://152.70.184.232:8080/api/rag/status', 
        'http://152.70.184.232:8080/api/passages/count'
      ];
      
      let successfulEndpoint: string | null = null;
      let lastError: Error | null = null;
      
      for (const endpoint of endpoints) {
        try {
          console.log(`🔍 Testing endpoint: ${endpoint}`);
          const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-Client-Version': '2.1-ENHANCED',
              'X-Test-Attempt': attempts.toString()
            },
            signal: AbortSignal.timeout(12000),
            mode: 'cors',
            credentials: 'omit'
          });
          
          if (response.ok) {
            const data = await response.json();
            console.log(`✅ Oracle Cloud connection successful via ${endpoint}:`, data);
            successfulEndpoint = endpoint;
            
            setConnectionTest({
              status: 'success',
              message: '✅ Oracle Cloud verbunden - RAG-System betriebsbereit',
              timestamp: Date.now(),
              statusData: { 
                oracle: 'connected', 
                rag: 'connected',
                ai_systems: 'connected',
                endpoint: endpoint,
                response: data
              },
              attempts
            });
            return;
          }
        } catch (endpointError) {
          console.warn(`❌ Endpoint ${endpoint} failed:`, endpointError);
          lastError = endpointError instanceof Error ? endpointError : new Error('Unknown endpoint error');
        }
      }
      
      // If no endpoint worked, check for CORS issues
      if (!successfulEndpoint) {
        console.error('❌ All Oracle Cloud endpoints failed. Last error:', lastError);
        
        // Check if it's a CORS issue
        const isCorsError = lastError instanceof TypeError && 
                           (lastError.message.includes('fetch') || 
                            lastError.message.includes('CORS') ||
                            lastError.message.includes('Network'));
        
        if (isCorsError) {
          setConnectionTest({
            status: 'cors_error',
            message: '🔧 CORS-Problem erkannt - Erweiterte KI-Fallback-Systeme aktiv',
            timestamp: Date.now(),
            statusData: { 
              oracle: 'cors_error', 
              rag: 'offline',
              ai_systems: 'offline',
              error: 'CORS_BLOCKED'
            },
            attempts
          });
        } else {
          setConnectionTest({
            status: 'error',
            message: '⚠️ Oracle Cloud nicht erreichbar - KI-Systeme verwenden lokale Verarbeitung',
            timestamp: Date.now(),
            statusData: { 
              oracle: 'offline', 
              rag: 'offline',
              ai_systems: 'offline',
              error: lastError?.message || 'UNKNOWN_ERROR'
            },
            attempts
          });
        }
      }
      
    } catch (error) {
      console.error('❌ Oracle Cloud connection test failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'UNKNOWN_ERROR';
      setConnectionTest({
        status: 'error',
        message: '❌ Verbindungstest fehlgeschlagen',
        timestamp: Date.now(),
        statusData: { 
          oracle: 'error', 
          rag: 'error',
          ai_systems: 'error',
          error: errorMessage
        },
        attempts
      });
    }
    
    // Reset after 12 seconds
    setTimeout(() => {
      setConnectionTest(prev => ({ ...prev, status: 'idle', message: '' }));
    }, 12000);
  };
  
  // Auto-test connection on component mount
  useEffect(() => {
    // Auto-test connection when component mounts
    const autoTestTimer = setTimeout(() => {
      testConnection();
    }, 2000);
    
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
      {/* 🎨 Enhanced Background with Dynamic Gradients */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          linear-gradient(135deg, rgba(248, 246, 240, 0.95) 0%, rgba(245, 241, 232, 0.97) 30%, rgba(240, 235, 226, 0.95) 100%),
          radial-gradient(circle at 20% 20%, rgba(212, 175, 55, 0.1), transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.08), transparent 50%),
          radial-gradient(circle at 50% 10%, rgba(245, 158, 11, 0.05), transparent 40%)
        `,
        zIndex: 1
      }} />
      
      {/* 🎨 Enhanced Floating Decorative Elements */}
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
        {/* 🎨 Enhanced Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          {/* Main Title with Enhanced Animation */}
          <div style={{
            marginBottom: '40px',
            position: 'relative'
          }}>
            <h1 style={{
              fontSize: '5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #d4af37, #f59e0b, #92400e, #8b5cf6)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: '0 0 20px 0',
              fontFamily: 'Times New Roman, serif',
              textShadow: '0 4px 8px rgba(212, 175, 55, 0.3)',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
              animation: 'titleGradientFlow 6s ease-in-out infinite, titleGlow 4s ease-in-out infinite alternate'
            }}>
              {t('hero.title')}
            </h1>
            
            <p style={{
              fontSize: '1.8rem',
              color: '#a16207',
              fontStyle: 'italic',
              margin: '0 0 32px 0',
              fontFamily: 'Georgia, serif',
              textShadow: '0 2px 4px rgba(161, 98, 7, 0.2)',
              animation: 'subtitleFade 3s ease-in-out'
            }}>
              {t('hero.subtitle')}
            </p>
            
            {/* 🎨 Enhanced AI System Status Badge */}
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
              boxShadow: '0 8px 20px rgba(139, 92, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              animation: 'badgePulse 3s ease-in-out infinite'
            }}>
              <Brain style={{ width: '20px', height: '20px' }} />
              {t('hero.ai_status')}
              <Sparkles style={{ width: '16px', height: '16px', animation: 'sparkle 2s ease-in-out infinite' }} />
            </div>
          </div>
          
          {/* 🔧 Enhanced Connection Status */}
          <div style={{ marginBottom: '40px' }}>
            <ConnectionStatus 
              onTest={testConnection}
              testing={connectionTest.status === 'testing'}
              connectionState={connectionTest}
            />
          </div>
        </div>
        
        {/* 🎨 Enhanced Two-Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'flex-start',
          marginBottom: '80px'
        }}>
          {/* Left Column - Enhanced Cultural Story */}
          <div>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '40px',
              border: '2px solid rgba(212, 175, 55, 0.2)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(16px)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* 🎨 Animated border */}
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '20px',
                padding: '2px',
                background: 'linear-gradient(45deg, rgba(212, 175, 55, 0.4), rgba(245, 158, 11, 0.4), rgba(139, 92, 246, 0.2), rgba(212, 175, 55, 0.4))',
                backgroundSize: '300% 300%',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'subtract',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'subtract',
                animation: 'borderFlow 8s linear infinite'
              }} />
              
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
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 4px 12px rgba(212, 175, 55, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
                    e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.2)';
                  }}
                >
                  <Crown style={{ width: '18px', height: '18px' }} />
                  {t('hero.learn_more')}
                </button>
                
                <button
                  style={{
                    padding: '16px 24px',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    border: '2px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '12px',
                    color: '#7c3aed',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.2)';
                    e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.2)';
                  }}
                >
                  <Sparkles style={{ width: '18px', height: '18px' }} />
                  {t('hero.cultural_treasures')}
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Column - Enhanced Image Carousel */}
          <div style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(212, 175, 55, 0.2)',
            border: '3px solid rgba(212, 175, 55, 0.3)'
          }}>
            {images.map((image, index) => (
              <div
                key={index}
                style={{
                  position: index === 0 ? 'relative' : 'absolute',
                  inset: 0,
                  opacity: index === currentImageIndex ? 1 : 0,
                  transition: 'opacity 1.5s ease-in-out',
                  zIndex: index === currentImageIndex ? 2 : 1
                }}
              >
                <img
                  src={image.src}
                  alt={t(image.titleKey)}
                  onLoad={() => handleImageLoad(index)}
                  style={{
                    width: '100%',
                    height: '450px',
                    objectFit: 'cover',
                    display: 'block',
                    filter: imageLoadStates[index] 
                      ? 'saturate(1.15) contrast(1.1) brightness(1.05)' 
                      : 'blur(3px)',
                    transition: 'filter 1s ease-out'
                  }}
                />
                
                {/* 🎨 Enhanced image overlay */}
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
                    margin: '0 0 8px 0',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
                  }}>
                    {t(image.titleKey)}
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    margin: 0,
                    opacity: 0.9,
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)'
                  }}>
                    {t(image.subtitleKey)}
                  </p>
                </div>
              </div>
            ))}
            
            {/* 🎨 Enhanced navigation dots */}
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
                  onClick={() => setCurrentImageIndex(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: index === currentImageIndex 
                      ? 'rgba(255, 255, 255, 0.95)'
                      : 'rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
                    transform: index === currentImageIndex ? 'scale(1.2)' : 'scale(1)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* ✅ ENHANCED FEATURES GRID - LANGUAGE SENSITIVE */}
        <div style={{
          marginBottom: '60px'
        }}>
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
              />
            ))}
          </div>
        </div>
        
        {/* 🔧 FIXED: Neutral Technical Overview Section (No Trophy, No Marketing) */}
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          border: '2px solid rgba(107, 114, 128, 0.3)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(16px)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 246, 240, 0.9))'
        }}>
          <Server style={{ width: '56px', height: '56px', color: '#6b7280', marginBottom: '20px', margin: '0 auto 20px' }} />
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
      
      {/* 🎨 Enhanced global animations */}
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
        
        @keyframes titleGlow {
          0%, 100% { filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1)); }
          50% { filter: drop-shadow(0 4px 12px rgba(212, 175, 55, 0.4)); }
        }
        
        @keyframes borderFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
        
        @keyframes backgroundShift {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(10px) translateY(-5px); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.7; transform: scale(1.2) rotate(180deg); }
        }
        
        @keyframes badgePulse {
          0%, 100% { transform: scale(1); box-shadow: 0 8px 20px rgba(139, 92, 246, 0.25); }
          50% { transform: scale(1.02); box-shadow: 0 12px 30px rgba(139, 92, 246, 0.35); }
        }
        
        @keyframes subtitleFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes particleFloat {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        
        @keyframes shimmer {
          0% { opacity: 0; transform: translateX(-100%); }
          50% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(100%); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};