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
 * ✅ Auto-playing video with lite-youtube-embed
 * ✅ Rich astronomical background with moving stars and planets
 * ✅ Integrated Astrolab.jpg as central background element
 * ✅ Clean interface with only Skip Video button
 * ✅ Smooth animations and celestial atmosphere
 * ✅ PRESERVES ALL EXISTING FUNCTIONALITY - Safe development
 */
export const VideoIntroWrapper: React.FC<VideoIntroWrapperProps> = ({ language }) => {
  const { t } = useLanguage();
  const [showVideo, setShowVideo] = useState(true);
  const [countdown, setCountdown] = useState(45);
  
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
          opacity: 0.12,
          zIndex: 2,
          backgroundImage: 'url(/Astrolab.jpg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          animation: 'astrolabRotate 300s linear infinite',
          filter: 'sepia(30%) hue-rotate(200deg) brightness(0.8)'
        }} />
        
        {/* 🌌 ENHANCED COSMIC BACKGROUND */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          
          {/* Large Bright Stars */}
          {Array.from({ length: 25 }, (_, i) => (
            <div
              key={`star-bright-${i}`}
              style={{
                position: 'absolute',
                width: `${Math.random() * 4 + 3}px`,
                height: `${Math.random() * 4 + 3}px`,
                borderRadius: '50%',
                background: `radial-gradient(circle, rgba(255, 255, 255, ${Math.random() * 0.9 + 0.3}), rgba(255, 255, 255, 0))`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `starTwinkle ${6 + Math.random() * 8}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 4}s`,
                boxShadow: `0 0 ${Math.random() * 12 + 6}px rgba(255, 255, 255, 0.6), 0 0 ${Math.random() * 24 + 12}px rgba(255, 255, 255, 0.3)`
              }}
            />
          ))}
          
          {/* Medium Moving Stars */}
          {Array.from({ length: 40 }, (_, i) => (
            <div
              key={`star-moving-${i}`}
              style={{
                position: 'absolute',
                width: `${Math.random() * 3 + 2}px`,
                height: `${Math.random() * 3 + 2}px`,
                borderRadius: '50%',
                background: `rgba(255, 255, 255, ${Math.random() * 0.7 + 0.2})`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `starDrift ${80 + Math.random() * 60}s linear infinite`,
                animationDelay: `${Math.random() * 20}s`,
                boxShadow: `0 0 ${Math.random() * 8 + 4}px rgba(255, 255, 255, 0.4)`
              }}
            />
          ))}
          
          {/* Small Background Stars */}
          {Array.from({ length: 80 }, (_, i) => (
            <div
              key={`star-small-${i}`}
              style={{
                position: 'absolute',
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                borderRadius: '50%',
                background: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `gentleGlow ${8 + Math.random() * 12}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 6}s`
              }}
            />
          ))}
          
          {/* 🪐 MOVING PLANETS - Right to Left */}
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={`planet-${i}`}
              style={{
                position: 'absolute',
                width: `${Math.random() * 12 + 8}px`,
                height: `${Math.random() * 12 + 8}px`,
                borderRadius: '50%',
                background: [
                  'radial-gradient(circle at 30% 30%, #ff6b35, #f7931e, #c23616)',
                  'radial-gradient(circle at 30% 30%, #3742fa, #2f3542, #57606f)',
                  'radial-gradient(circle at 30% 30%, #2ed573, #1e90ff, #0652dd)',
                  'radial-gradient(circle at 30% 30%, #ffa502, #ff6348, #ff3838)',
                  'radial-gradient(circle at 30% 30%, #70a1ff, #5352ed, #3742fa)',
                  'radial-gradient(circle at 30% 30%, #7bed9f, #2ed573, #0be881)'
                ][i],
                top: `${15 + Math.random() * 70}%`,
                left: `${100 + Math.random() * 50}%`,
                animation: `planetDrift ${120 + Math.random() * 80}s linear infinite`,
                animationDelay: `${Math.random() * 30}s`,
                boxShadow: `0 0 ${Math.random() * 16 + 8}px rgba(255, 255, 255, 0.3), inset -2px -2px 4px rgba(0, 0, 0, 0.3)`,
                opacity: 0.7 + Math.random() * 0.3
              }}
            />
          ))}
          
          {/* Golden Cosmic Dust */}
          {Array.from({ length: 15 }, (_, i) => (
            <div
              key={`cosmic-dust-${i}`}
              style={{
                position: 'absolute',
                width: `${Math.random() * 6 + 3}px`,
                height: `${Math.random() * 6 + 3}px`,
                borderRadius: '50%',
                background: `radial-gradient(circle, rgba(212, 175, 55, ${Math.random() * 0.6 + 0.2}), rgba(212, 175, 55, 0))`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `cosmicFloat ${150 + Math.random() * 100}s linear infinite`,
                animationDelay: `${Math.random() * 50}s`,
                boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(212, 175, 55, 0.4)`
              }}
            />
          ))}
          
          {/* Nebula-like Effects */}
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={`nebula-${i}`}
              style={{
                position: 'absolute',
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                borderRadius: '50%',
                background: `radial-gradient(circle, rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 150}, 255, 0.05), transparent)`,
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 80}%`,
                animation: `nebulaFloat ${200 + Math.random() * 150}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 100}s`,
                filter: 'blur(20px)'
              }}
            />
          ))}
        </div>
        
        {/* 🎬 LITE YOUTUBE VIDEO CONTAINER - Upper Half */}
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
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8), 0 0 0 4px rgba(212, 175, 55, 0.5), 0 0 0 8px rgba(255, 255, 255, 0.1)',
            border: '4px solid rgba(212, 175, 55, 0.7)',
            position: 'relative',
            background: '#000',
            transform: 'scale(1.02)',
            transition: 'all 0.3s ease'
          }}>
            {/* 🚀 AUTO-PLAYING LITE YOUTUBE EMBED */}
            {React.createElement('lite-youtube', {
              videoid: 'w7h_xi_omfg',
              params: 'autoplay=1&mute=1',  // 🔥 AUTO-PLAY ENABLED!
              style: {
                width: '100%',
                height: '100%',
                borderRadius: '20px'
              },
              playlabel: language === 'DE' ? 'Macrobius Trailer abspielen' :
                         language === 'LA' ? 'Macrobius Trailer ludere' :
                         'Play Macrobius Trailer'
            })}
            
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
                  animation: 'pulse 2s infinite'
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
        
        {/* 🎯 CLEAN ACTION SECTION - Lower Half */}
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
            animation: 'titleGlow 4s ease-in-out infinite alternate'
          }}>
            MACROBIUS
          </h1>
          
          {/* Clean Action Area - Only Skip Button */}
          <div style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '20px'
          }}>
            {/* 🎯 SKIP VIDEO BUTTON - Enhanced */}
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
                boxShadow: '0 12px 30px rgba(212, 175, 55, 0.6), 0 0 0 0 rgba(212, 175, 55, 0.4)',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d4af37';
                e.currentTarget.style.transform = 'scale(1.08) translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(212, 175, 55, 0.8), 0 0 0 8px rgba(212, 175, 55, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.95)';
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(212, 175, 55, 0.6), 0 0 0 0 rgba(212, 175, 55, 0.4)';
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
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#d4af37',
                animation: 'pulse 1.5s infinite'
              }} />
              Auto-start: {countdown}s
            </div>
          </div>
        </div>
        
        {/* 🎨 ENHANCED COSMIC ANIMATIONS */}
        <style jsx global>{`
          @keyframes starTwinkle {
            0%, 100% { 
              opacity: 0.3; 
              transform: scale(0.8); 
            }
            50% { 
              opacity: 1; 
              transform: scale(1.4); 
            }
          }
          
          @keyframes starDrift {
            0% { 
              transform: translateX(100vw) translateY(0px); 
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% { 
              transform: translateX(-20vw) translateY(-20px); 
              opacity: 0;
            }
          }
          
          @keyframes planetDrift {
            0% { 
              transform: translateX(0px) translateY(0px); 
            }
            100% { 
              transform: translateX(-120vw) translateY(-10px); 
            }
          }
          
          @keyframes cosmicFloat {
            0% { 
              transform: translateX(100vw) translateY(0px) rotate(0deg); 
              opacity: 0;
            }
            15% {
              opacity: 0.8;
            }
            85% {
              opacity: 0.8;
            }
            100% { 
              transform: translateX(-20vw) translateY(-5px) rotate(360deg); 
              opacity: 0;
            }
          }
          
          @keyframes nebulaFloat {
            0%, 100% { 
              transform: translateX(0px) translateY(0px) scale(1); 
              opacity: 0.05;
            }
            50% { 
              transform: translateX(-30px) translateY(-15px) scale(1.1); 
              opacity: 0.08;
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
          
          @keyframes gentleGlow {
            0%, 100% { 
              opacity: 0.2; 
            }
            50% { 
              opacity: 0.8; 
            }
          }
          
          @keyframes titleGlow {
            0% { 
              text-shadow: 0 6px 20px rgba(212, 175, 55, 0.5); 
            }
            100% { 
              text-shadow: 0 6px 30px rgba(212, 175, 55, 0.8), 0 0 40px rgba(212, 175, 55, 0.3); 
            }
          }
          
          @keyframes pulse {
            0%, 100% { 
              opacity: 1; 
              transform: scale(1); 
            }
            50% { 
              opacity: 0.5; 
              transform: scale(1.2); 
            }
          }
          
          /* 🎨 ENHANCED LITE YOUTUBE STYLING */
          lite-youtube {
            border-radius: 20px !important;
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
        `}</style>
      </div>
    </>
  );
};