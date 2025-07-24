import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { IntroSection } from './IntroSection';
import { SkipForward, Play, Volume2, VolumeX, RefreshCw } from 'lucide-react';

interface VideoIntroWrapperProps {
  language: 'DE' | 'EN' | 'LA';
}

/**
 * 🎬 PROFESSIONAL HTML5 VIDEO PLAYER - Handles Large Video Files Properly
 * Solution: External video hosting + HTML5 video with proper autoplay handling
 */
export const VideoIntroWrapper: React.FC<VideoIntroWrapperProps> = ({ language }) => {
  const { t } = useLanguage();
  const [showVideo, setShowVideo] = useState(true);
  const [countdown, setCountdown] = useState(45);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Auto-skip timer
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
  
  // Attempt autoplay when component mounts
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const attemptAutoplay = async () => {
      try {
        // Set video to muted for autoplay compliance
        video.muted = true;
        video.volume = 0;
        
        // Attempt to play
        await video.play();
        setIsPlaying(true);
        setShowControls(false);
        console.log('🎬 Autoplay successful!');
        
        // After 2 seconds, try to unmute (user will need to interact first)
        setTimeout(() => {
          setShowControls(true);
        }, 2000);
        
      } catch (error) {
        console.log('🎬 Autoplay blocked - showing play button');
        setShowControls(true);
        setIsPlaying(false);
      }
    };
    
    // Wait for video to be ready
    if (video.readyState >= 2) {
      attemptAutoplay();
    } else {
      video.addEventListener('canplay', attemptAutoplay, { once: true });
    }
    
    return () => {
      video.removeEventListener('canplay', attemptAutoplay);
    };
  }, []);
  
  const handlePlayClick = async () => {
    const video = videoRef.current;
    if (!video) return;
    
    setIsLoading(true);
    
    try {
      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      } else {
        await video.play();
        setIsPlaying(true);
        setShowControls(false);
        // Show controls again after 3 seconds
        setTimeout(() => setShowControls(true), 3000);
      }
    } catch (error) {
      console.error('Play failed:', error);
      setVideoError(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };
  
  const skipToApp = () => {
    setShowVideo(false);
  };
  
  const handleVideoError = () => {
    setVideoError(true);
    console.error('Video failed to load');
  };
  
  const handleVideoEnded = () => {
    setIsPlaying(false);
    // Auto-skip to app when video ends
    setTimeout(() => setShowVideo(false), 1000);
  };
  
  // When video completes, show original IntroSection
  if (!showVideo) {
    return <IntroSection language={language} />;
  }
  
  return (
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
      
      {/* ⭐ COSMIC BACKGROUND */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        {/* Bright Stars */}
        {Array.from({ length: 12 }, (_, i) => {
          const size = Math.random() * 3 + 2;
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const duration = 4 + Math.random() * 6;
          const delay = Math.random() * 8;
          
          return (
            <div
              key={`star-${i}`}
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
        
        {/* Moving Elements */}
        {Array.from({ length: 8 }, (_, i) => {
          const size = Math.random() * 6 + 4;
          const top = 20 + Math.random() * 60;
          const duration = 150 + Math.random() * 100;
          const delay = Math.random() * 50;
          
          return (
            <div
              key={`moving-${i}`}
              style={{
                position: 'absolute',
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                background: i % 2 === 0 
                  ? `rgba(255, 255, 255, 0.6)`
                  : `radial-gradient(circle at 30% 30%, #ff6b35, #f7931e)`,
                top: `${top}%`,
                left: '110%',
                animation: `elementDrift ${duration}s linear infinite`,
                animationDelay: `${delay}s`,
                opacity: 0.7
              }}
            />
          );
        })}
      </div>
      
      {/* 🎬 PROFESSIONAL HTML5 VIDEO PLAYER */}
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
          {videoError ? (
            /* ERROR FALLBACK - Show beautiful classical imagery */
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(/MacrobiusBottle.jpg) center/cover',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#d4af37',
              textAlign: 'center',
              padding: '40px'
            }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', fontFamily: 'Times New Roman, serif' }}>
                MACROBIUS
              </h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: 0.9 }}>
                AI-Powered Classical Latin Education
              </p>
              <button
                onClick={skipToApp}
                style={{
                  padding: '15px 30px',
                  backgroundColor: 'rgba(212, 175, 55, 0.9)',
                  border: '2px solid #d4af37',
                  borderRadius: '25px',
                  color: '#1a1a1a',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Enter the Classical World
              </button>
            </div>
          ) : (
            /* HTML5 VIDEO ELEMENT */
            <>
              <video
                ref={videoRef}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '20px'
                }}
                muted={isMuted}
                loop
                playsInline
                preload="metadata"
                onError={handleVideoError}
                onEnded={handleVideoEnded}
                onLoadStart={() => setIsLoading(true)}
                onCanPlay={() => setIsLoading(false)}
              >
                {/* MULTIPLE VIDEO SOURCES FOR COMPATIBILITY */}
                {/* 
                   SOLUTION FOR YOUR 36MB VIDEO:
                   1. Convert AppIntro.mov to web-optimized formats (MP4, WebM)
                   2. Host on external service (Vimeo, CloudFlare, AWS S3)
                   3. Or compress to under 25MB for GitHub hosting
                */}
                
                {/* PLACEHOLDER SOURCES - Replace with your optimized video URLs */}
                <source src="https://your-cdn.com/AppIntro.mp4" type="video/mp4" />
                <source src="https://your-cdn.com/AppIntro.webm" type="video/webm" />
                
                {/* FALLBACK MESSAGE */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: '#d4af37',
                  fontSize: '18px'
                }}>
                  Your browser does not support HTML5 video.
                </div>
              </video>
              
              {/* VIDEO CONTROLS OVERLAY */}
              {showControls && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isPlaying ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.7)',
                  borderRadius: '20px',
                  transition: 'background 0.3s ease'
                }}>
                  {isLoading ? (
                    <RefreshCw style={{ 
                      width: '60px', 
                      height: '60px', 
                      color: '#d4af37',
                      animation: 'spin 1s linear infinite'
                    }} />
                  ) : (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '20px'
                    }}>
                      {/* MAIN PLAY/PAUSE BUTTON */}
                      <button
                        onClick={handlePlayClick}
                        style={{
                          width: '120px',
                          height: '120px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.95), rgba(212, 175, 55, 0.8))',
                          border: '4px solid #d4af37',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 15px 40px rgba(212, 175, 55, 0.5)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.1)';
                          e.currentTarget.style.boxShadow = '0 20px 50px rgba(212, 175, 55, 0.7)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = '0 15px 40px rgba(212, 175, 55, 0.5)';
                        }}
                      >
                        <Play style={{ 
                          width: '40px', 
                          height: '40px', 
                          color: '#1a1a1a', 
                          marginLeft: isPlaying ? '0' : '4px'
                        }} />
                      </button>
                      
                      {/* MUTE/UNMUTE BUTTON */}
                      <button
                        onClick={handleMuteToggle}
                        style={{
                          padding: '12px 24px',
                          backgroundColor: 'rgba(212, 175, 55, 0.2)',
                          border: '2px solid rgba(212, 175, 55, 0.5)',
                          borderRadius: '25px',
                          color: '#d4af37',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
                        }}
                      >
                        {isMuted ? (
                          <VolumeX style={{ width: '16px', height: '16px' }} />
                        ) : (
                          <Volume2 style={{ width: '16px', height: '16px' }} />
                        )}
                        {isMuted ? 'Unmute' : 'Mute'}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
          
          {/* STATUS OVERLAY */}
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
                backgroundColor: isPlaying ? '#22c55e' : videoError ? '#ef4444' : '#d4af37',
                animation: 'statusPulse 2s ease-in-out infinite'
              }} />
            </div>
            <div style={{
              color: 'rgba(212, 175, 55, 0.9)',
              fontSize: '13px',
              fontWeight: '500'
            }}>
              {videoError ? 'Error' : isLoading ? 'Loading...' : isPlaying ? 'Playing' : 'Ready'}
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
            Enter App
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
        @keyframes elementDrift {
          0% { transform: translateX(0px); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { transform: translateX(-130vw); opacity: 0; }
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
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};