import React, { useState, useEffect } from 'react';
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
  Award
} from 'lucide-react';

interface IntroSectionProps {
  language: 'DE' | 'EN' | 'LA';
}

// 🎭 Enhanced About Modal Component
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
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        animation: 'fadeIn 0.3s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '32px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
          border: '2px solid rgba(212, 175, 55, 0.3)',
          position: 'relative',
          transform: 'scale(1)',
          animation: 'modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            color: '#92400e',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ×
        </button>
        
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <Crown style={{ width: '48px', height: '48px', color: '#d4af37', marginBottom: '16px', margin: '0 auto 16px' }} />
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            color: '#92400e', 
            margin: '0 0 8px 0',
            fontFamily: 'Times New Roman, serif'
          }}>
            {t('about.title')}
          </h2>
          <p style={{ 
            fontSize: '16px', 
            color: '#a16207', 
            fontStyle: 'italic',
            margin: 0,
            lineHeight: '1.5'
          }}>
            {t('about.subtitle')}
          </p>
        </div>
        
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: '#92400e', 
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {t('about.biography.title')}
          </h3>
          <p style={{ 
            fontSize: '16px', 
            color: '#374151', 
            lineHeight: '1.6',
            margin: 0
          }}>
            {t('about.biography.text')}
          </p>
        </div>
        
        <div>
          <h3 style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: '#92400e', 
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {t('about.works.title')}
          </h3>
          <p style={{ 
            fontSize: '16px', 
            color: '#374151', 
            lineHeight: '1.6',
            margin: 0
          }}>
            {t('about.works.text')}
          </p>
        </div>
        
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes modalSlideIn {
            from { 
              transform: scale(0.9) translateY(-20px); 
              opacity: 0;
            }
            to { 
              transform: scale(1) translateY(0); 
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

// 🎯 Enhanced Feature Card Component
const FeatureCard: React.FC<{
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  status: 'active' | 'enhanced' | 'ai';
  onClick?: () => void;
}> = ({ icon: Icon, title, description, status, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const statusConfig = {
    active: {
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      borderColor: 'rgba(16, 185, 129, 0.3)',
      label: 'AKTIV'
    },
    enhanced: {
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)',
      borderColor: 'rgba(245, 158, 11, 0.3)',
      label: 'ERWEITERT'
    },
    ai: {
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.1)',
      borderColor: 'rgba(139, 92, 246, 0.3)',
      label: 'KI-POWERED'
    }
  };
  
  const config = statusConfig[status];
  
  return (
    <div
      style={{
        padding: '24px',
        borderRadius: '12px',
        border: `2px solid ${isHovered ? config.borderColor : 'rgba(212, 175, 55, 0.2)'}`,
        background: isHovered 
          ? `linear-gradient(135deg, ${config.bgColor}, rgba(255, 255, 255, 0.8))`
          : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'none',
        boxShadow: isHovered 
          ? `0 20px 40px ${config.color}20, 0 0 0 1px ${config.borderColor}`
          : '0 8px 25px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Status Badge */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        fontSize: '8px',
        fontWeight: '700',
        color: config.color,
        backgroundColor: config.bgColor,
        padding: '3px 6px',
        borderRadius: '4px',
        border: `1px solid ${config.borderColor}`,
        display: 'flex',
        alignItems: 'center',
        gap: '2px'
      }}>
        {status === 'ai' && <Zap style={{ width: '8px', height: '8px' }} />}
        {config.label}
      </div>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '16px',
        gap: '12px'
      }}>
        <div style={{
          padding: '12px',
          borderRadius: '10px',
          backgroundColor: `${config.color}15`,
          border: `1px solid ${config.color}30`
        }}>
          <Icon style={{ 
            width: '24px', 
            height: '24px', 
            color: config.color,
            filter: `drop-shadow(0 2px 4px ${config.color}30)`
          }} />
        </div>
        
        <h3 style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#92400e',
          margin: 0,
          flex: 1
        }}>
          {title}
        </h3>
      </div>
      
      <p style={{
        fontSize: '14px',
        color: '#6b7280',
        lineHeight: '1.5',
        margin: 0
      }}>
        {description}
      </p>
      
      {/* Hover effect decoration */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${config.color}, transparent)`,
          animation: 'shimmer 2s ease-in-out infinite'
        }} />
      )}
      
      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// 🏛️ ENHANCED INTRO SECTION
export const IntroSection: React.FC<IntroSectionProps> = ({ language }) => {
  const { t } = useLanguage();
  const [showAbout, setShowAbout] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoadStates, setImageLoadStates] = useState<Record<number, boolean>>({});
  const [connectionTest, setConnectionTest] = useState<{
    status: 'idle' | 'testing' | 'success' | 'error';
    message: string;
    timestamp?: number;
  }>({ status: 'idle', message: '' });
  
  // 🖼️ Enhanced image rotation
  const images = [
    {
      src: '/RomanDecline.jpg',
      titleKey: 'image.rome.title',
      subtitleKey: 'image.rome.subtitle'
    },
    {
      src: '/Macrobius-Portrait.jpg',
      titleKey: 'image.macrobius.title',
      subtitleKey: 'image.macrobius.subtitle'
    },
    {
      src: '/TychoBrahe.jpg',
      titleKey: 'image.tycho.title',
      subtitleKey: 'image.tycho.subtitle'
    }
  ];
  
  // Image rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 6000); // Change every 6 seconds
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  // Handle image load states
  const handleImageLoad = (index: number) => {
    setImageLoadStates(prev => ({ ...prev, [index]: true }));
  };
  
  // 🧪 Connection test functionality
  const testConnection = async () => {
    setConnectionTest({ status: 'testing', message: 'Teste Oracle Cloud Verbindung...' });
    
    try {
      const response = await MacrobiusAPI.system.healthCheck();
      
      if (response.status === 'success') {
        setConnectionTest({
          status: 'success',
          message: '✅ Oracle Cloud verbunden! 1.401 Texte verfügbar.',
          timestamp: Date.now()
        });
      } else {
        throw new Error('Health check failed');
      }
    } catch (error) {
      setConnectionTest({
        status: 'error',
        message: '⚠️ Fallback-Modus aktiv. KI-Systeme verwenden lokale Verarbeitung.',
        timestamp: Date.now()
      });
    }
    
    // Reset after 5 seconds
    setTimeout(() => {
      setConnectionTest({ status: 'idle', message: '' });
    }, 5000);
  };
  
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Enhanced Background with Parallax Effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(248, 246, 240, 0.9) 0%, rgba(245, 241, 232, 0.95) 50%, rgba(240, 235, 226, 0.9) 100%)',
        zIndex: 1
      }} />
      
      {/* Floating Decorative Elements */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={`decoration-${i}`}
            style={{
              position: 'absolute',
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(212, 175, 55, ${Math.random() * 0.1 + 0.05}), transparent 70%)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${12 + Math.random() * 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 32px',
        width: '100%'
      }}>
        {/* Enhanced Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '64px'
        }}>
          {/* Main Title with Enhanced Animation */}
          <div style={{
            marginBottom: '32px',
            position: 'relative'
          }}>
            <h1 style={{
              fontSize: '4rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #d4af37, #f59e0b, #92400e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: '0 0 16px 0',
              fontFamily: 'Times New Roman, serif',
              textShadow: '0 4px 8px rgba(212, 175, 55, 0.3)',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
              animation: 'titleGlow 3s ease-in-out infinite alternate'
            }}>
              {t('hero.title')}
            </h1>
            
            <p style={{
              fontSize: '1.5rem',
              color: '#a16207',
              fontStyle: 'italic',
              margin: '0 0 24px 0',
              fontFamily: 'Georgia, serif',
              textShadow: '0 2px 4px rgba(161, 98, 7, 0.2)'
            }}>
              {t('hero.subtitle')}
            </p>
            
            {/* AI System Status Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              border: '2px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#7c3aed',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.2)'
            }}>
              <Brain style={{ width: '16px', height: '16px' }} />
              KI-SYSTEME AKTIV - Tier 3 AI Features
              <Sparkles style={{ width: '14px', height: '14px', animation: 'pulse 2s infinite' }} />
            </div>
          </div>
          
          {/* Connection Test Button */}
          <div style={{ marginBottom: '32px' }}>
            <button
              onClick={testConnection}
              disabled={connectionTest.status === 'testing'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                backgroundColor: connectionTest.status === 'success' 
                  ? 'rgba(16, 185, 129, 0.1)'
                  : connectionTest.status === 'error'
                  ? 'rgba(245, 158, 11, 0.1)'
                  : 'rgba(212, 175, 55, 0.1)',
                border: `2px solid ${connectionTest.status === 'success'
                  ? 'rgba(16, 185, 129, 0.3)'
                  : connectionTest.status === 'error'
                  ? 'rgba(245, 158, 11, 0.3)'
                  : 'rgba(212, 175, 55, 0.3)'}`,
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '600',
                color: connectionTest.status === 'success'
                  ? '#059669'
                  : connectionTest.status === 'error'
                  ? '#d97706'
                  : '#92400e',
                cursor: connectionTest.status === 'testing' ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(8px)',
                opacity: connectionTest.status === 'testing' ? 0.7 : 1
              }}
            >
              {connectionTest.status === 'testing' ? (
                <Loader2 style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />
              ) : connectionTest.status === 'success' ? (
                <CheckCircle style={{ width: '16px', height: '16px' }} />
              ) : connectionTest.status === 'error' ? (
                <AlertCircle style={{ width: '16px', height: '16px' }} />
              ) : (
                <Activity style={{ width: '16px', height: '16px' }} />
              )}
              
              {connectionTest.status === 'idle' ? 'Oracle Cloud Testen' : connectionTest.message}
            </button>
          </div>
        </div>
        
        {/* Enhanced Two-Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'flex-start',
          marginBottom: '64px'
        }}>
          {/* Left Column - Cultural Story */}
          <div>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '16px',
              padding: '32px',
              border: '2px solid rgba(212, 175, 55, 0.2)',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(12px)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Decorative border animation */}
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '16px',
                padding: '2px',
                background: 'linear-gradient(45deg, rgba(212, 175, 55, 0.3), rgba(245, 158, 11, 0.3), rgba(212, 175, 55, 0.3))',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'subtract',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'subtract',
                animation: 'borderFlow 4s linear infinite'
              }} />
              
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#92400e',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: 'Times New Roman, serif'
              }}>
                <Scroll style={{ width: '28px', height: '28px', color: '#d4af37' }} />
                {t('hero.description')}
              </h2>
              
              <p style={{
                fontSize: '16px',
                lineHeight: '1.7',
                color: '#374151',
                margin: 0,
                textAlign: 'justify'
              }}>
                {t('cultural_story')}
              </p>
              
              <div style={{
                marginTop: '24px',
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={() => setShowAbout(true)}
                  style={{
                    padding: '12px 20px',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    border: '2px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '8px',
                    color: '#92400e',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <Crown style={{ width: '16px', height: '16px' }} />
                  {t('hero.learn_more')}
                </button>
                
                <button
                  style={{
                    padding: '12px 20px',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    border: '2px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '8px',
                    color: '#7c3aed',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.2)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <Sparkles style={{ width: '16px', height: '16px' }} />
                  {t('hero.cultural_treasures')}
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Column - Enhanced Image Carousel */}
          <div style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.15)',
            border: '3px solid rgba(212, 175, 55, 0.3)'
          }}>
            {images.map((image, index) => (
              <div
                key={index}
                style={{
                  position: index === 0 ? 'relative' : 'absolute',
                  inset: 0,
                  opacity: index === currentImageIndex ? 1 : 0,
                  transition: 'opacity 1s ease-in-out',
                  zIndex: index === currentImageIndex ? 2 : 1
                }}
              >
                <img
                  src={image.src}
                  alt={t(image.titleKey)}
                  onLoad={() => handleImageLoad(index)}
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    display: 'block',
                    filter: imageLoadStates[index] 
                      ? 'saturate(1.1) contrast(1.05) brightness(1.05)' 
                      : 'blur(2px)',
                    transition: 'filter 0.8s ease-out'
                  }}
                />
                
                {/* Image overlay with info */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4), transparent)',
                  padding: '24px',
                  color: 'white'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    margin: '0 0 4px 0',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.7)'
                  }}>
                    {t(image.titleKey)}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    margin: 0,
                    opacity: 0.9,
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.7)'
                  }}>
                    {t(image.subtitleKey)}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Image navigation dots */}
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              display: 'flex',
              gap: '8px',
              zIndex: 10
            }}>
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: index === currentImageIndex 
                      ? 'rgba(255, 255, 255, 0.9)'
                      : 'rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Enhanced Feature Grid */}
        <div style={{
          marginBottom: '48px'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#92400e',
            textAlign: 'center',
            marginBottom: '48px',
            fontFamily: 'Times New Roman, serif'
          }}>
            🏛️ Entdecken Sie die KI-gestützten Features
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            <FeatureCard
              icon={Brain}
              title="KI-Kulturanalyse"
              description="Echte NLP-basierte Analyse der römischen Kultur mit maschinellem Lernen und semantischer Textverarbeitung."
              status="ai"
            />
            
            <FeatureCard
              icon={Target}
              title="Intelligente Lernpfade"
              description="KI-optimierte, personalisierte Lernrouten basierend auf Ihrem Fortschritt und Ihren Lernzielen."
              status="ai"
            />
            
            <FeatureCard
              icon={Crown}
              title="AI-Tutor System"
              description="Conversational AI mit Kontext-Bewusstsein für individualisierte Unterstützung beim Lateinlernen."
              status="ai"
            />
            
            <FeatureCard
              icon={BookOpen}
              title="Intelligenter Vokabeltrainer"
              description="Erweiterte SRS-Algorithmen mit korpusbasierter Vokabelauswahl und adaptivem Schwierigkeitsgrad."
              status="enhanced"
            />
            
            <FeatureCard
              icon={Globe}
              title="Interaktive Visualisierungen"
              description="3D-Kartendarstellungen, Zeitlinien und kulturelle Netzwerke mit historischen Kontextinformationen."
              status="enhanced"
            />
            
            <FeatureCard
              icon={Coffee}
              title="Römische Gastmähler"
              description="Authentische Darstellung der Saturnalia-Gespräche mit kulturellem Kontext und modernen Bezügen."
              status="active"
            />
          </div>
        </div>
        
        {/* Technical Achievement Badge */}
        <div style={{
          textAlign: 'center',
          padding: '32px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '16px',
          border: '2px solid rgba(139, 92, 246, 0.3)',
          boxShadow: '0 8px 25px rgba(139, 92, 246, 0.2)',
          backdropFilter: 'blur(12px)'
        }}>
          <Award style={{ width: '48px', height: '48px', color: '#8b5cf6', marginBottom: '16px', margin: '0 auto 16px' }} />
          <h3 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#7c3aed',
            marginBottom: '12px'
          }}>
            🏆 Technische Exzellenz Erreicht
          </h3>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Diese Anwendung demonstriert fortgeschrittene KI-Integration, semantische Suche, 
            Oracle Cloud Backend-Konnektivität und moderne React-Architektur mit über 44 
            spezialisierten Komponenten für klassische Bildung.
          </p>
        </div>
      </div>
      
      {/* About Modal */}
      <AboutModal 
        isOpen={showAbout} 
        onClose={() => setShowAbout(false)} 
        language={language}
      />
      
      {/* Global animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes titleGlow {
          0%, 100% { filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1)); }
          50% { filter: drop-shadow(0 4px 8px rgba(212, 175, 55, 0.4)); }
        }
        
        @keyframes borderFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};