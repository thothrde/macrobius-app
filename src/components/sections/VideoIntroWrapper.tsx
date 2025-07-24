import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { IntroSection } from './IntroSection';
import { SkipForward, Play, Video } from 'lucide-react';
import Head from 'next/head';

interface VideoIntroWrapperProps {
  language: 'DE' | 'EN' | 'LA';
}

/**
 * 🎬 FAILSAFE VIDEO INTRO COMPONENT
 * 
 * Features:
 * ✅ Multiple video loading strategies (lite-youtube → iframe → animated placeholder)
 * ✅ Guaranteed working solution with beautiful fallbacks
 * ✅ Smooth celestial animations
 * ✅ Integrated Astrolab.jpg background
 * ✅ Professional appearance regardless of video loading
 */
export const VideoIntroWrapper: React.FC<VideoIntroWrapperProps> = ({ language }) => {
  const { t } = useLanguage();
  const [showVideo, setShowVideo] = useState(true);
  const [countdown, setCountdown] = useState(45);
  const [videoMethod, setVideoMethod] = useState<'lite-youtube' | 'iframe' | 'placeholder'>('lite-youtube');
  const [isPlaying, setIsPlaying] = useState(false);
  
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
  
  // Fallback strategy: lite-youtube → iframe → placeholder
  useEffect(() => {
    const tryLiteYoutube = setTimeout(() => {
      // Check if lite-youtube loaded
      const liteYoutubeElement = document.querySelector('lite-youtube');
      if (!liteYoutubeElement || !window.customElements?.get('lite-youtube')) {
        console.log('Lite-youtube failed, trying iframe...');
        setVideoMethod('iframe');
        
        // If iframe also fails after 3 seconds, use placeholder
        setTimeout(() => {
          const iframe = document.querySelector('.video-iframe');
          if (!iframe || !(iframe as HTMLIFrameElement).contentWindow) {
            console.log('Iframe failed, using animated placeholder...');
            setVideoMethod('placeholder');
          }
        }, 3000);
      }
    }, 2000);
    
    return () => clearTimeout(tryLiteYoutube);
  }, []);
  
  const skipToApp = () => {
    setShowVideo(false);
  };
  
  const handlePlaceholderPlay = () => {
    setIsPlaying(true);
    // Simulate video experience
    setTimeout(() => {
      setShowVideo(false);
    }, 8000); // Auto-advance after 8 seconds of "playing"
  };
  
  // When video completes, show original IntroSection
  if (!showVideo) {
    return <IntroSection language={language} />;
  }
  
  return (
    <>
      {/* Scripts for lite-youtube (attempt 1) */}
      <Head>
        <script 
          src="https://cdn.jsdelivr.net/npm/lite-youtube-embed@0.1.3/src/lite-yt-embed.js" 
          type="module"
          onError={() => {
            console.log('Lite-youtube script failed to load');
            setVideoMethod('iframe');
          }}
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
        background: 'linear-gradient(135deg, #0f0c29 0%, #24243e 25%, #302b63 50%, #1e3c72 75%, #2a5298 100%)',
        overflow: 'hidden'
      }}>
        
        {/* 🏛️ ASTROLAB BACKGROUND */}
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
          {/* Bright Stars */}
          {Array.from({ length: 15 }, (_, i) => {
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
                  animation: `starTwinkle ${duration}s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                  boxShadow: `0 0 ${size * 3}px rgba(255, 255, 255, 0.5)`
                }}
              />
            );
          })}
          
          {/* Moving Stars */}
          {Array.from({ length: 20 }, (_, i) => {
            const size = Math.random() * 2 + 1;
            const top = Math.random() * 100;
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
                  background: `rgba(255, 255, 255, 0.7)`,
                  top: `${top}%`,
                  left: '110%',
                  animation: `starDrift ${duration}s linear infinite`,
                  animationDelay: `${delay}s`,
                  boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, 0.3)`
                }}
              />
            );
          })}
          
          {/* Planets */}
          {Array.from({ length: 3 }, (_, i) => {
            const size = Math.random() * 8 + 6;
            const top = 20 + Math.random() * 60;
            const duration = 200 + Math.random() * 100;
            const delay = Math.random() * 60;
            
            const colors = [
              'radial-gradient(circle at 30% 30%, #ff6b35, #f7931e)',
              'radial-gradient(circle at 30% 30%, #3742fa, #2f3542)',
              'radial-gradient(circle at 30% 30%, #2ed573, #1e90ff)'
            ];
            
            return (
              <div
                key={`planet-${i}`}
                style={{
                  position: 'absolute',
                  width: `${size}px`,
                  height: `${size}px`,
                  borderRadius: '50%',
                  background: colors[i],
                  top: `${top}%`,
                  left: '110%',
                  animation: `planetDrift ${duration}s linear infinite`,
                  animationDelay: `${delay}s`,
                  boxShadow: `0 0 ${size}px rgba(255, 255, 255, 0.2)`,
                  opacity: 0.8
                }}
              />
            );
          })}
        </div>
        
        {/* 🎬 FAILSAFE VIDEO CONTAINER */}
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
            
            {/* METHOD 1: LITE YOUTUBE */}
            {videoMethod === 'lite-youtube' && (
              React.createElement('lite-youtube', {
                videoid: 'w7h_xi_omfg',
                params: 'autoplay=1&mute=1',
                style: {
                  width: '100%',
                  height: '100%',
                  borderRadius: '20px'
                },
                playlabel: 'Play Macrobius Trailer'
              })
            )}
            
            {/* METHOD 2: REGULAR IFRAME */}
            {videoMethod === 'iframe' && (
              <iframe
                className="video-iframe"
                src="https://www.youtube.com/embed/w7h_xi_omfg?autoplay=1&mute=1&start=0&rel=0&modestbranding=1"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '20px'
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Macrobius App Trailer"
              />
            )}
            
            {/* METHOD 3: BEAUTIFUL ANIMATED PLACEHOLDER */}
            {videoMethod === 'placeholder' && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                {/* Animated Background Pattern */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `
                    radial-gradient(circle at 20% 20%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, rgba(66, 153, 225, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 50% 10%, rgba(167, 243, 208, 0.1) 0%, transparent 50%)
                  `,
                  animation: 'placeholderShimmer 8s ease-in-out infinite'
                }} />
                
                {/* Play Button or Playing State */}
                {!isPlaying ? (
                  <button
                    onClick={handlePlaceholderPlay}
                    style={{
                      position: 'relative',
                      zIndex: 10,
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.9), rgba(212, 175, 55, 0.7))',
                      border: '3px solid #d4af37',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 10px 30px rgba(212, 175, 55, 0.4)',
                      animation: 'playButtonPulse 2s ease-in-out infinite'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.style.boxShadow = '0 15px 40px rgba(212, 175, 55, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(212, 175, 55, 0.4)';
                    }}
                  >
                    <Play style={{ width: '40px', height: '40px', color: '#1a1a1a', marginLeft: '4px' }} />
                  </button>
                ) : (
                  <div style={{
                    position: 'relative',
                    zIndex: 10,
                    textAlign: 'center',
                    color: '#d4af37'
                  }}>
                    <Video style={{ width: '80px', height: '80px', marginBottom: '20px', animation: 'videoPlaying 1s ease-in-out infinite alternate' }} />
                    <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>Macrobius Trailer</div>
                    <div style={{ fontSize: '16px', opacity: 0.8 }}>Experience the classical journey...</div>
                    <div style={{
                      width: '200px',
                      height: '4px',
                      background: 'rgba(212, 175, 55, 0.3)',
                      borderRadius: '2px',
                      marginTop: '20px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: '60%',
                        height: '100%',
                        background: '#d4af37',
                        borderRadius: '2px',
                        animation: 'progressBar 8s linear forwards'
                      }} />
                    </div>
                  </div>
                )}
                
                {/* Floating Particles */}
                {Array.from({ length: 8 }, (_, i) => (
                  <div
                    key={`particle-${i}`}
                    style={{
                      position: 'absolute',
                      width: `${Math.random() * 4 + 2}px`,
                      height: `${Math.random() * 4 + 2}px`,
                      borderRadius: '50%',
                      background: 'rgba(212, 175, 55, 0.6)',
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animation: `floatingParticle ${5 + Math.random() * 5}s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 3}s`
                    }}
                  />
                ))}
              </div>
            )}
            
            {/* Video Info Overlay */}
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
              border: '2px solid rgba(212, 175, 55, 0.4)'
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
                  backgroundColor: videoMethod === 'placeholder' && isPlaying ? '#22c55e' : '#fbbf24',
                  animation: 'statusPulse 2s ease-in-out infinite'
                }} />
              </div>
              <div style={{
                color: 'rgba(212, 175, 55, 0.9)',
                fontSize: '13px',
                fontWeight: '500'
              }}>
                {videoMethod === 'lite-youtube' ? 'Lite YouTube' :
                 videoMethod === 'iframe' ? 'YouTube Embed' :
                 isPlaying ? 'Demo Playing' : 'Demo Ready'}
              </div>
            </div>
          </div>
        </div>
        
        {/* 🎯 ACTION SECTION */}
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
          
          <div style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '20px'
          }}>
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
                transition: 'all 0.4s ease',
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
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.95)';
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
              }}
            >
              <SkipForward style={{ width: '24px', height: '24px' }} />
              Skip Video
            </button>
            
            <div style={{
              padding: '16px 28px',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '2px solid rgba(212, 175, 55, 0.5)',
              borderRadius: '40px',
              color: '#d4af37',
              fontSize: '16px',
              fontWeight: '600',
              backdropFilter: 'blur(15px)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#d4af37',
                animation: 'statusPulse 1.5s ease-in-out infinite'
              }} />
              Auto-start: {countdown}s
            </div>
          </div>
        </div>
        
        {/* 🎨 ANIMATIONS */}
        <style jsx global>{`
          @keyframes starTwinkle {
            0%, 100% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          @keyframes starDrift {
            0% { transform: translateX(0px); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { transform: translateX(-130vw); opacity: 0; }
          }
          @keyframes planetDrift {
            0% { transform: translateX(0px); }
            100% { transform: translateX(-130vw); }
          }
          @keyframes astrolabRotate {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
          @keyframes titleGlow {
            0% { text-shadow: 0 6px 20px rgba(212, 175, 55, 0.5); }
            100% { text-shadow: 0 6px 30px rgba(212, 175, 55, 0.8), 0 0 40px rgba(212, 175, 55, 0.3); }
          }
          @keyframes statusPulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.1); }
          }
          
          /* Placeholder Animations */
          @keyframes placeholderShimmer {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.8; }
          }
          @keyframes playButtonPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes videoPlaying {
            0% { transform: scale(1); }
            100% { transform: scale(1.1); }
          }
          @keyframes progressBar {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          @keyframes floatingParticle {
            0%, 100% { transform: translateY(0px); opacity: 0.6; }
            50% { transform: translateY(-20px); opacity: 1; }
          }
        `}</style>
      </div>
    </>
  );
};