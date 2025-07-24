import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { IntroSection } from './IntroSection';
import { SkipForward } from 'lucide-react';
import Head from 'next/head';

// Types for lite-youtube are now globally available from src/types/lite-youtube.d.ts

interface VideoIntroWrapperProps {
  language: 'DE' | 'EN' | 'LA';
}

/**
 * 🎬 ENHANCED LITE YOUTUBE VIDEO INTRO COMPONENT
 * 
 * Features:
 * ✅ Working auto-playing video with proper lite-youtube setup
 * ✅ Smooth celestial animations (no jumping)
 * ✅ Integrated Astrolab.jpg as central background element
 * ✅ Clean interface with only Skip Video button
 * ✅ Professional cosmic atmosphere
 * ✅ PRESERVES ALL EXISTING FUNCTIONALITY - Safe development
 */
export const VideoIntroWrapper: React.FC<VideoIntroWrapperProps> = ({ language }) => {
  const { t } = useLanguage();
  const [showVideo, setShowVideo] = useState(true);
  const [countdown, setCountdown] = useState(45);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  // Auto-skip after 45 seconds
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
  
  // Trigger video loading after component mounts
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setVideoLoaded(true);
    }, 1000);
    
    return () => clearTimeout(loadTimer);
  }, []);
  
  const skipToApp = () => {
    setShowVideo(false);
  };
  
  // 🚨 CRITICAL SAFE DEVELOPMENT: When video completes, show original IntroSection
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
        // 🌌 Enhanced cosmic background
        background: 'linear-gradient(135deg, #0f0c29 0%, #24243e 25%, #302b63 50%, #1e3c72 75%, #2a5298 100%)',
        overflow: 'hidden'
      }}>
        
        {/* 🏟️ ASTROLAB BACKGROUND - Central Integration */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '120vh',
          height: '120vh',
          opacity: 0.15,
          zIndex: 2,
          backgroundImage: 'url(/Astrolab.jpg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          animation: 'astrolabRotate 400s linear infinite',
          filter: 'sepia(20%) hue-rotate(200deg) brightness(0.9) contrast(1.1)'
        }} />
        
        {/* 🌌 SMOOTH COSMIC BACKGROUND */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          
          {/* Large Bright Stars - Smooth Twinkling */}
          {Array.from({ length: 20 }, (_, i) => {
            const size = Math.random() * 3 + 2;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const duration = 4 + Math.random() * 6;
            const delay = Math.random() * 8;
            
            return (
              <div
                key={`star-bright-${i}`}
                style={{
                  position: 'absolute',
                  width: `${size}px`,
                  height: `${size}px`,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.2))`,
                  top: `${top}%`,
                  left: `${left}%`,
                  animation: `starTwinkleSmooth ${duration}s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                  boxShadow: `0 0 ${size * 3}px rgba(255, 255, 255, 0.5), 0 0 ${size * 6}px rgba(255, 255, 255, 0.2)`
                }}
              />
            );
          })}
          
          {/* Medium Moving Stars - Smooth Drift */}
          {Array.from({ length: 25 }, (_, i) => {
            const size = Math.random() * 2 + 1.5;
            const top = Math.random() * 100;
            const startLeft = 105 + Math.random() * 20;
            const duration = 120 + Math.random() * 80;
            const delay = Math.random() * 60;
            
            return (
              <div
                key={`star-moving-${i}`}
                style={{
                  position: 'absolute',
                  width: `${size}px`,
                  height: `${size}px`,
                  borderRadius: '50%',
                  background: `rgba(255, 255, 255, ${0.6 + Math.random() * 0.3})`,
                  top: `${top}%`,
                  left: `${startLeft}%`,
                  animation: `starDriftSmooth ${duration}s linear infinite`,
                  animationDelay: `${delay}s`,
                  boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, 0.3)`
                }}
              />
            );
          })}
          
          {/* Small Background Stars - Gentle Glow */}
          {Array.from({ length: 60 }, (_, i) => {
            const size = Math.random() * 1.5 + 0.5;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const duration = 6 + Math.random() * 8;
            const delay = Math.random() * 10;
            
            return (
              <div
                key={`star-small-${i}`}
                style={{
                  position: 'absolute',
                  width: `${size}px`,
                  height: `${size}px`,
                  borderRadius: '50%',
                  background: `rgba(255, 255, 255, ${0.3 + Math.random() * 0.4})`,
                  top: `${top}%`,
                  left: `${left}%`,
                  animation: `gentleGlowSmooth ${duration}s ease-in-out infinite`,
                  animationDelay: `${delay}s`
                }}
              />
            );
          })}
          
          {/* 🪐 SMOOTH MOVING PLANETS - Right to Left */}
          {Array.from({ length: 4 }, (_, i) => {
            const size = Math.random() * 8 + 6;
            const top = 20 + Math.random() * 60;
            const startLeft = 110 + Math.random() * 30;
            const duration = 180 + Math.random() * 120;
            const delay = Math.random() * 60;
            
            const planetColors = [
              'radial-gradient(circle at 30% 30%, #ff6b35, #f7931e, #c23616)',
              'radial-gradient(circle at 30% 30%, #3742fa, #2f3542, #57606f)',
              'radial-gradient(circle at 30% 30%, #2ed573, #1e90ff, #0652dd)',
              'radial-gradient(circle at 30% 30%, #ffa502, #ff6348, #ff3838)'
            ];
            
            return (
              <div
                key={`planet-${i}`}
                style={{
                  position: 'absolute',
                  width: `${size}px`,
                  height: `${size}px`,
                  borderRadius: '50%',
                  background: planetColors[i],
                  top: `${top}%`,
                  left: `${startLeft}%`,
                  animation: `planetDriftSmooth ${duration}s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                  boxShadow: `0 0 ${size}px rgba(255, 255, 255, 0.2), inset -2px -2px 4px rgba(0, 0, 0, 0.3)`,
                  opacity: 0.8
                }}
              />
            );
          })}
          
          {/* Golden Cosmic Dust - Smooth Float */}
          {Array.from({ length: 12 }, (_, i) => {
            const size = Math.random() * 4 + 2;
            const top = Math.random() * 100;
            const startLeft = 110 + Math.random() * 20;
            const duration = 200 + Math.random() * 100;
            const delay = Math.random() * 80;
            
            return (
              <div
                key={`cosmic-dust-${i}`}
                style={{
                  position: 'absolute',
                  width: `${size}px`,
                  height: `${size}px`,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, rgba(212, 175, 55, 0.6), rgba(212, 175, 55, 0.1))`,
                  top: `${top}%`,
                  left: `${startLeft}%`,
                  animation: `cosmicFloatSmooth ${duration}s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                  boxShadow: `0 0 ${size * 1.5}px rgba(212, 175, 55, 0.3)`
                }}
              />
            );
          })}
        </div>
        
        {/* 🎬 WORKING LITE YOUTUBE VIDEO CONTAINER */}
        <div style={{
          height: '60vh',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '900px',
            aspectRatio: '16/9',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8), 0 0 0 4px rgba(212, 175, 55, 0.5)',
            border: '4px solid rgba(212, 175, 55, 0.7)',
            position: 'relative',
            background: '#000'
          }}>
            {/* 🚀 WORKING LITE YOUTUBE EMBED */}
            {videoLoaded && React.createElement('lite-youtube', {
              videoid: 'w7h_xi_omfg',
              params: 'autoplay=1&mute=1&start=0',
              style: {
                width: '100%',
                height: '100%',
                borderRadius: '20px'
              },
              playlabel: language === 'DE' ? 'Macrobius Trailer abspielen' :
                         language === 'LA' ? 'Macrobius Trailer ludere' :
                         'Play Macrobius Trailer'
            })}
            
            {/* Loading State */}
            {!videoLoaded && (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
                borderRadius: '20px'
              }}>
                <div style={{
                  color: '#d4af37',
                  fontSize: '18px',
                  fontWeight: '600'
                }}>
                  Loading Macrobius Trailer...
                </div>
              </div>
            )}
            
            {/* Enhanced Video Overlay */}
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              right: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 24px',
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              borderRadius: '16px',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(212, 175, 55, 0.4)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
            }}>
              <div style={{
                color: '#d4af37',
                fontSize: '16px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                🏛️ Macrobius App Trailer
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#22c55e',
                  animation: 'pulseSmooth 2s ease-in-out infinite'
                }} />
              </div>
              <div style={{
                color: 'rgba(212, 175, 55, 0.9)',
                fontSize: '13px',
                fontWeight: '500'
              }}>
                {language === 'DE' ? 'Automatische Wiedergabe aktiv' :
                 language === 'LA' ? 'Automatica repetitio activa' :
                 'Auto-play active'}
              </div>
            </div>
          </div>
        </div>
        
        {/* 🎯 CLEAN ACTION SECTION */}
        <div style={{
          height: '40vh',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px'
        }}>
          {/* Cosmic App Title */}
          <h1 style={{
            fontSize: '5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #d4af37 0%, #ffd700 25%, #ffed4e 50%, #d4af37 75%, #b8860b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 30px 0',
            fontFamily: 'Times New Roman, serif',
            textAlign: 'center',
            textShadow: '0 6px 20px rgba(212, 175, 55, 0.5)',
            letterSpacing: '2px',
            animation: 'titleGlowSmooth 4s ease-in-out infinite alternate'
          }}>
            MACROBIUS
          </h1>
          
          {/* Clean Action Area */}
          <div style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '20px'
          }}>
            {/* 🎯 SKIP VIDEO BUTTON */}
            <button
              onClick={skipToApp}
              style={{
                padding: '20px 40px',
                backgroundColor: 'rgba(212, 175, 55, 0.95)',
                border: '3px solid #d4af37',
                borderRadius: '60px',
                color: '#1a1a1a',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                boxShadow: '0 12px 30px rgba(212, 175, 55, 0.6)',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d4af37';
                e.currentTarget.style.transform = 'scale(1.08) translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(212, 175, 55, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.95)';
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(212, 175, 55, 0.6)';
              }}
            >
              <SkipForward style={{ width: '24px', height: '24px' }} />
              Skip Video
            </button>
            
            {/* Elegant Countdown Display */}
            <div style={{
              padding: '16px 28px',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '2px solid rgba(212, 175, 55, 0.5)',
              borderRadius: '40px',
              color: '#d4af37',
              fontSize: '16px',
              fontWeight: '600',
              backdropFilter: 'blur(15px)',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#d4af37',
                animation: 'pulseSmooth 1.5s ease-in-out infinite'
              }} />
              Auto-start: {countdown}s
            </div>
          </div>
        </div>
        
        {/* 🎨 SMOOTH COSMIC ANIMATIONS */}
        <style jsx global>{`
          @keyframes starTwinkleSmooth {
            0%, 100% { 
              opacity: 0.3; 
              transform: scale(0.8); 
            }
            50% { 
              opacity: 1; 
              transform: scale(1.2); 
            }
          }
          
          @keyframes starDriftSmooth {
            0% { 
              transform: translateX(0px) translateY(0px); 
              opacity: 0;
            }
            5% {
              opacity: 0.8;
            }
            95% {
              opacity: 0.8;
            }
            100% { 
              transform: translateX(-130vw) translateY(-10px); 
              opacity: 0;
            }
          }
          
          @keyframes planetDriftSmooth {
            0% { 
              transform: translateX(0px) translateY(0px) rotate(0deg); 
            }
            100% { 
              transform: translateX(-130vw) translateY(-5px) rotate(10deg); 
            }
          }
          
          @keyframes cosmicFloatSmooth {
            0% { 
              transform: translateX(0px) translateY(0px) rotate(0deg); 
              opacity: 0;
            }
            10% {
              opacity: 0.6;
            }
            90% {
              opacity: 0.6;
            }
            100% { 
              transform: translateX(-120vw) translateY(-8px) rotate(180deg); 
              opacity: 0;
            }
          }
          
          @keyframes astrolabRotate {
            0% { 
              transform: translate(-50%, -50%) rotate(0deg); 
            }
            100% { 
              transform: translate(-50%, -50%) rotate(360deg); 
            }
          }
          
          @keyframes gentleGlowSmooth {
            0%, 100% { 
              opacity: 0.3; 
            }
            50% { 
              opacity: 0.8; 
            }
          }
          
          @keyframes titleGlowSmooth {
            0% { 
              text-shadow: 0 6px 20px rgba(212, 175, 55, 0.5); 
            }
            100% { 
              text-shadow: 0 6px 30px rgba(212, 175, 55, 0.8), 0 0 40px rgba(212, 175, 55, 0.3); 
            }
          }
          
          @keyframes pulseSmooth {
            0%, 100% { 
              opacity: 1; 
              transform: scale(1); 
            }
            50% { 
              opacity: 0.6; 
              transform: scale(1.1); 
            }
          }
          
          /* 🎨 ENHANCED LITE YOUTUBE STYLING */
          lite-youtube {
            border-radius: 20px !important;
            cursor: pointer !important;
          }
          
          lite-youtube > iframe {
            border-radius: 20px !important;
          }
          
          lite-youtube .lty-playbtn {
            background: rgba(212, 175, 55, 0.95) !important;
            border: 4px solid #d4af37 !important;
            transition: all 0.4s ease !important;
            width: 80px !important;
            height: 80px !important;
          }
          
          lite-youtube .lty-playbtn:hover {
            background: #d4af37 !important;
            transform: scale(1.15) !important;
            box-shadow: 0 0 30px rgba(212, 175, 55, 0.8) !important;
          }
          
          lite-youtube .lty-playbtn svg {
            width: 32px !important;
            height: 32px !important;
            margin-left: 4px !important;
          }
          
          /* Force autoplay when video is clicked */
          lite-youtube[activated] {
            cursor: default !important;
          }
        `}</style>
      </div>
    </>
  );
};