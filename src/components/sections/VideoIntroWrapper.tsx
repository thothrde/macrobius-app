import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { IntroSection } from './IntroSection';
import { Play, SkipForward, Volume2, VolumeX } from 'lucide-react';
import Head from 'next/head';

// Types for lite-youtube are now globally available from src/types/lite-youtube.d.ts

interface VideoIntroWrapperProps {
  language: 'DE' | 'EN' | 'LA';
}

/**
 * 🎬 LITE YOUTUBE VIDEO INTRO COMPONENT
 * 
 * Features:
 * ✅ Uses lite-youtube-embed for instant loading
 * ✅ Loads only thumbnail initially (fast performance)
 * ✅ Full player loads only when user clicks
 * ✅ Professional YouTube appearance
 * ✅ Auto-transitions to main app after 45 seconds (reduced due to fast loading)
 * ✅ Skip button for immediate access
 * ✅ Late evening sky blue background with animated stars
 * ✅ PRESERVES ALL EXISTING FUNCTIONALITY - Safe development
 */
export const VideoIntroWrapper: React.FC<VideoIntroWrapperProps> = ({ language }) => {
  const { t } = useLanguage();
  const [showVideo, setShowVideo] = useState(true);
  const [countdown, setCountdown] = useState(45); // 🔥 REDUCED: 45 seconds due to instant loading
  
  // Auto-skip after 45 seconds (reduced due to fast lite-youtube loading)
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
  
  const skipToApp = () => {
    setShowVideo(false);
  };
  
  // 🚨 CRITICAL SAFE DEVELOPMENT: When video completes, show original IntroSection
  // This preserves ALL existing functionality, AI systems, and Oracle Cloud integration
  if (!showVideo) {
    return <IntroSection language={language} />;
  }
  
  return (
    <>
      {/* 📚 LITE YOUTUBE EMBED SCRIPTS */}
      <Head>
        <script 
          src="https://cdn.jsdelivr.net/npm/lite-youtube-embed@0.1.3/src/lite-yt-embed.js" 
          type="module"
        />
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/lite-youtube-embed@0.1.3/src/lite-yt-embed.css" 
        />
      </Head>
      
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        // 🌌 Late evening sky blue background
        background: 'linear-gradient(135deg, #1e40af 0%, #312e81 30%, #1e1b4b 60%, #0f172a 100%)',
        overflow: 'hidden'
      }}>
        {/* 🌟 Animated stars (late evening sky) */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          {/* Large slow-moving stars */}
          {Array.from({ length: 15 }, (_, i) => (
            <div
              key={`star-large-${i}`}
              style={{
                position: 'absolute',
                width: `${Math.random() * 3 + 2}px`,
                height: `${Math.random() * 3 + 2}px`,
                borderRadius: '50%',
                background: `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `twinkle ${8 + Math.random() * 12}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
                boxShadow: `0 0 ${Math.random() * 6 + 3}px rgba(255, 255, 255, 0.5)`
              }}
            />
          ))}
          
          {/* Medium moving stars */}
          {Array.from({ length: 25 }, (_, i) => (
            <div
              key={`star-medium-${i}`}
              style={{
                position: 'absolute',
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                borderRadius: '50%',
                background: `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.3})`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `slowFloat ${15 + Math.random() * 25}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 8}s`,
                boxShadow: `0 0 ${Math.random() * 4 + 2}px rgba(255, 255, 255, 0.3)`
              }}
            />
          ))}
          
          {/* Small static stars */}
          {Array.from({ length: 40 }, (_, i) => (
            <div
              key={`star-small-${i}`}
              style={{
                position: 'absolute',
                width: '1px',
                height: '1px',
                borderRadius: '50%',
                background: `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2})`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `gentleTwinkle ${4 + Math.random() * 8}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
                boxShadow: '0 0 1px rgba(255, 255, 255, 0.5)'
              }}
            />
          ))}
          
          {/* Golden accent particles */}
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={`golden-particle-${i}`}
              style={{
                position: 'absolute',
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                borderRadius: '50%',
                background: `rgba(212, 175, 55, ${Math.random() * 0.4 + 0.1})`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `goldenFloat ${20 + Math.random() * 20}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 10}s`,
                boxShadow: `0 0 ${Math.random() * 8 + 4}px rgba(212, 175, 55, 0.3)`
              }}
            />
          ))}
        </div>
        
        {/* 🎬 LITE YOUTUBE VIDEO CONTAINER - Upper Half */}
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
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6), 0 0 0 3px rgba(212, 175, 55, 0.4)',
            border: '3px solid rgba(212, 175, 55, 0.6)',
            position: 'relative',
            background: '#000'
          }}>
            {/* 🚀 LITE YOUTUBE EMBED - INSTANT LOADING! */}
            {React.createElement('lite-youtube', {
              videoid: 'w7h_xi_omfg',
              style: {
                width: '100%',
                height: '100%',
                borderRadius: '17px'
              },
              playlabel: language === 'DE' ? 'Macrobius Trailer abspielen' :
                         language === 'LA' ? 'Macrobius Trailer ludere' :
                         'Play Macrobius Trailer'
            })}
            
            {/* Overlay with app branding */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              right: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 20px',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(212, 175, 55, 0.3)'
            }}>
              <div style={{
                color: '#d4af37',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                🏛️ Macrobius App Trailer
              </div>
              <div style={{
                color: 'rgba(212, 175, 55, 0.8)',
                fontSize: '12px'
              }}>
                {language === 'DE' ? 'Klicken zum Abspielen' :
                 language === 'LA' ? 'Preme ad ludendum' :
                 'Click to play'}
              </div>
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
          background: 'linear-gradient(to bottom, transparent, rgba(30, 64, 175, 0.1))'
        }}>
          {/* App Title */}
          <h1 style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #d4af37, #f59e0b, #fbbf24)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 20px 0',
            fontFamily: 'Times New Roman, serif',
            textAlign: 'center',
            textShadow: '0 4px 12px rgba(212, 175, 55, 0.4)'
          }}>
            MACROBIUS
          </h1>
          
          <p style={{
            fontSize: '1.5rem',
            color: '#e5e7eb',
            fontStyle: 'italic',
            margin: '0 0 40px 0',
            textAlign: 'center',
            maxWidth: '600px',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            {t('video.subtitle') || 
             (language === 'DE' ? 'KI-gestützte klassische lateinische Bildungsplattform' :
              language === 'LA' ? 'Platea Educationis Latinae Classicae AI-actuata' :
              'AI-Powered Classical Latin Education Platform')}
          </p>
          
          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center'
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
                boxShadow: '0 8px 25px rgba(212, 175, 55, 0.5)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d4af37';
                e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(212, 175, 55, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.9)';
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.5)';
              }}
            >
              <SkipForward style={{ width: '20px', height: '20px' }} />
              {t('video.skip') || 
               (language === 'DE' ? 'App öffnen' :
                language === 'LA' ? 'App aperire' :
                'Enter App')}
            </button>
            
            {/* Countdown Display */}
            <div style={{
              padding: '12px 24px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              border: '2px solid rgba(212, 175, 55, 0.4)',
              borderRadius: '25px',
              color: '#d4af37',
              fontSize: '14px',
              fontWeight: '600',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
            }}>
              {t('video.auto_start') || 
               (language === 'DE' ? 'Auto-Start in' :
                language === 'LA' ? 'Auto-initium in' :
                'Auto-start in')}: {countdown}s
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
              { icon: '🤖', text: t('video.feature.ai') || (language === 'DE' ? 'KI-gestützt' : language === 'LA' ? 'AI-actuatus' : 'AI-Powered') },
              { icon: '📚', text: t('video.feature.authentic') || '1.401 Passagen' },
              { icon: '🌍', text: t('video.feature.multilingual') || 'DE/EN/LA' },
              { icon: '🏛️', text: t('video.feature.classical') || (language === 'DE' ? 'Klassische Bildung' : language === 'LA' ? 'Educatio Classica' : 'Classical Education') }
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  backgroundColor: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  borderRadius: '25px',
                  color: '#d4af37',
                  fontSize: '14px',
                  fontWeight: '500',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                }}
              >
                <span style={{ fontSize: '18px' }}>{feature.icon}</span>
                {feature.text}
              </div>
            ))}
          </div>
          
          {/* Performance Info */}
          <div style={{
            marginTop: '30px',
            padding: '8px 16px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '20px',
            color: '#10b981',
            fontSize: '12px',
            fontWeight: '500',
            textAlign: 'center'
          }}>
            ⚡ {language === 'DE' ? 'Optimierte Videoladung mit lite-youtube-embed' :
                language === 'LA' ? 'Optimizata video oneris cum lite-youtube-embed' :
                'Optimized video loading with lite-youtube-embed'}
          </div>
        </div>
        
        {/* Enhanced Global Animations */}
        <style jsx global>{`
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
          
          @keyframes slowFloat {
            0%, 100% { 
              transform: translateY(0px) translateX(0px) rotate(0deg); 
              opacity: 0.4;
            }
            25% { 
              transform: translateY(-8px) translateX(5px) rotate(90deg); 
              opacity: 0.8;
            }
            50% { 
              transform: translateY(-15px) translateX(-3px) rotate(180deg); 
              opacity: 1;
            }
            75% { 
              transform: translateY(-5px) translateX(-8px) rotate(270deg); 
              opacity: 0.6;
            }
          }
          
          @keyframes gentleTwinkle {
            0%, 100% { 
              opacity: 0.2; 
            }
            50% { 
              opacity: 0.8; 
            }
          }
          
          @keyframes goldenFloat {
            0%, 100% { 
              transform: translateY(0px) translateX(0px) rotate(0deg); 
              opacity: 0.1;
            }
            33% { 
              transform: translateY(-12px) translateX(8px) rotate(120deg); 
              opacity: 0.4;
            }
            66% { 
              transform: translateY(-8px) translateX(-6px) rotate(240deg); 
              opacity: 0.3;
            }
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          /* 🎨 LITE YOUTUBE CUSTOM STYLING */
          lite-youtube {
            border-radius: 17px !important;
          }
          
          lite-youtube > iframe {
            border-radius: 17px !important;
          }
          
          lite-youtube .lty-playbtn {
            background: rgba(212, 175, 55, 0.9) !important;
            border: 3px solid #d4af37 !important;
            transition: all 0.3s ease !important;
          }
          
          lite-youtube .lty-playbtn:hover {
            background: #d4af37 !important;
            transform: scale(1.1) !important;
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.6) !important;
          }
        `}</style>
      </div>
    </>
  );
};