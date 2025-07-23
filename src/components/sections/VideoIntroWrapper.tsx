import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { IntroSection } from './IntroSection';
import { Play, SkipForward, Volume2, VolumeX } from 'lucide-react';

interface VideoIntroWrapperProps {
  language: 'DE' | 'EN' | 'LA';
}

/**
 * 🎬 YOUTUBE VIDEO INTRO COMPONENT
 * 
 * Features:
 * ✅ Embeds YouTube video (https://www.youtube.com/watch?v=w7h_xi_omfg)
 * ✅ Auto-plays trailer on load (if browser allows)
 * ✅ Auto-transitions to main app after 30 seconds
 * ✅ Skip button for immediate access
 * ✅ Mute/unmute toggle
 * ✅ Professional loading state
 * ✅ Responsive design
 * ✅ Smooth animations
 * ✅ PRESERVES ALL EXISTING FUNCTIONALITY - Safe development
 */
export const VideoIntroWrapper: React.FC<VideoIntroWrapperProps> = ({ language }) => {
  const { t } = useLanguage();
  const [showVideo, setShowVideo] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [countdown, setCountdown] = useState(30);
  
  // Auto-skip after 30 seconds
  useEffect(() => {
    if (!showVideo) return;
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setShowVideo(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [showVideo]);
  
  // YouTube embed URL with autoplay and controls
  const youtubeEmbedUrl = `https://www.youtube.com/embed/w7h_xi_omfg?autoplay=1&mute=${isMuted ? 1 : 0}&controls=1&modestbranding=1&rel=0&showinfo=0`;
  
  const skipToApp = () => {
    setShowVideo(false);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  // 🚨 CRITICAL SAFE DEVELOPMENT: When video completes, show original IntroSection
  // This preserves ALL existing functionality, AI systems, and Oracle Cloud integration
  if (!showVideo) {
    return <IntroSection language={language} />;
  }
  
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
      overflow: 'hidden'
    }}>
      {/* 🎨 Animated background particles */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={`particle-${i}`}
            style={{
              position: 'absolute',
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              borderRadius: '50%',
              background: `rgba(212, 175, 55, ${Math.random() * 0.4 + 0.1})`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${20 + Math.random() * 20}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
      </div>
      
      {/* 🎬 Video Container - Upper Half */}
      <div style={{
        height: '50vh',
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '800px',
          aspectRatio: '16/9',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 3px rgba(212, 175, 55, 0.3)',
          border: '3px solid rgba(212, 175, 55, 0.5)',
          position: 'relative',
          background: '#000'
        }}>
          {/* Loading State */}
          {!videoLoaded && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
              color: '#d4af37',
              gap: '20px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                border: '3px solid rgba(212, 175, 55, 0.3)',
                borderTop: '3px solid #d4af37',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <p style={{ fontSize: '18px', fontWeight: '600' }}>
                {t('video.loading') || 'Loading trailer...'}
              </p>
            </div>
          )}
          
          {/* YouTube Embed */}
          <iframe
            src={youtubeEmbedUrl}
            title="Macrobius App Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setVideoLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              display: videoLoaded ? 'block' : 'none'
            }}
          />
          
          {/* Video Controls Overlay */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            display: 'flex',
            gap: '12px',
            zIndex: 20
          }}>
            {/* Mute Toggle */}
            <button
              onClick={toggleMute}
              style={{
                padding: '12px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                border: '2px solid rgba(212, 175, 55, 0.5)',
                color: '#d4af37',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {isMuted ? 
                <VolumeX style={{ width: '20px', height: '20px' }} /> : 
                <Volume2 style={{ width: '20px', height: '20px' }} />
              }
            </button>
          </div>
        </div>
      </div>
      
      {/* 🎨 App Preview Section - Lower Half */}
      <div style={{
        height: '50vh',
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        background: 'linear-gradient(to bottom, transparent, rgba(248, 246, 240, 0.1))'
      }}>
        {/* App Title */}
        <h1 style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #d4af37, #f59e0b, #92400e)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 20px 0',
          fontFamily: 'Times New Roman, serif',
          textAlign: 'center',
          textShadow: '0 4px 8px rgba(212, 175, 55, 0.3)'
        }}>
          MACROBIUS
        </h1>
        
        <p style={{
          fontSize: '1.5rem',
          color: '#d4af37',
          fontStyle: 'italic',
          margin: '0 0 40px 0',
          textAlign: 'center',
          maxWidth: '600px'
        }}>
          {t('video.subtitle') || 'AI-Powered Classical Latin Education Platform'}
        </p>
        
        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center'
        }}>
          {/* Skip Button */}
          <button
            onClick={skipToApp}
            style={{
              padding: '16px 32px',
              backgroundColor: 'rgba(212, 175, 55, 0.9)',
              border: '2px solid #d4af37',
              borderRadius: '50px',
              color: '#1a1a1a',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 8px 25px rgba(212, 175, 55, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#d4af37';
              e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(212, 175, 55, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.9)';
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.4)';
            }}
          >
            <SkipForward style={{ width: '20px', height: '20px' }} />
            {t('video.skip') || 'Enter App'}
          </button>
          
          {/* Countdown Display */}
          <div style={{
            padding: '12px 24px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            border: '2px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '25px',
            color: '#d4af37',
            fontSize: '14px',
            fontWeight: '600',
            backdropFilter: 'blur(10px)'
          }}>
            {t('video.auto_start') || 'Auto-start in'}: {countdown}s
          </div>
        </div>
        
        {/* Features Preview */}
        <div style={{
          display: 'flex',
          gap: '30px',
          marginTop: '40px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {[
            { icon: '🤖', text: t('video.feature.ai') || 'AI-Powered' },
            { icon: '📚', text: t('video.feature.authentic') || '1,401 Passages' },
            { icon: '🌍', text: t('video.feature.multilingual') || 'DE/EN/LA' },
            { icon: '🏛️', text: t('video.feature.classical') || 'Classical Education' }
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '20px',
                color: '#d4af37',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              <span style={{ fontSize: '16px' }}>{feature.icon}</span>
              {feature.text}
            </div>
          ))}
        </div>
      </div>
      
      {/* Global Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};