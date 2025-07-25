import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { IntroSection } from './IntroSection';
import { SkipForward, Play, Pause, Volume2, VolumeX, RotateCcw, Scroll } from 'lucide-react';

interface VideoIntroWrapperProps {
  language: 'DE' | 'EN' | 'LA';
}

/**
 * 🎬 REAL HTML5 VIDEO PLAYER - Uses Your AppIntro.mov File With Sound!
 * 🔍 SIGNIFICANTLY ENLARGED - Much more prominent video frame
 * Plays your actual video file with guaranteed audio support
 */
export const VideoIntroWrapper: React.FC<VideoIntroWrapperProps> = ({ language }) => {
  const { t } = useLanguage();
  const [showVideo, setShowVideo] = useState(true);
  const [countdown, setCountdown] = useState(45);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Start unmuted for sound!
  const [isLoading, setIsLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
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
  
  // Video progress tracking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    
    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);
  
  // Handle play/pause
  const handlePlayPause = async () => {
    const video = videoRef.current;
    if (!video) return;
    
    setIsLoading(true);
    
    try {
      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
        setShowControls(true); // 🔧 FIXED: Show controls when paused
      } else {
        // Ensure video is unmuted for sound
        video.muted = isMuted;
        await video.play();
        setIsPlaying(true);
        
        // 🔧 FIXED: Hide controls IMMEDIATELY when video starts playing
        setShowControls(false);
      }
    } catch (error) {
      console.error('Video playback failed:', error);
      setVideoError(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle mute toggle
  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (!video) return;
    
    const newMuted = !isMuted;
    video.muted = newMuted;
    setIsMuted(newMuted);
  };
  
  // Restart video
  const handleRestart = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = 0;
    setProgress(0);
    if (!isPlaying) {
      handlePlayPause();
    }
  };
  
  // Skip to app
  const skipToApp = () => {
    setShowVideo(false);
  };
  
  // Handle video events
  const handleVideoLoad = () => {
    setIsLoading(false);
    setVideoError(false);
  };
  
  const handleVideoError = () => {
    setVideoError(true);
    setIsLoading(false);
    console.error('Video failed to load - check if AppIntro.mov is uploaded to /public/');
  };
  
  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowControls(true);
    // Auto-skip to app when video ends
    setTimeout(() => setShowVideo(false), 2000);
  };
  
  // 🔧 FIXED: Show controls on mouse move only when paused
  const handleMouseMove = () => {
    if (!isPlaying) {
      setShowControls(true);
    }
    // Only temporarily show controls if video is playing
    if (isPlaying) {
      setShowControls(true);
      // Hide controls again after 2 seconds
      setTimeout(() => {
        if (isPlaying) setShowControls(false);
      }, 2000);
    }
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
      
      {/* 🎬 REAL HTML5 VIDEO PLAYER - 🚀 DRAMATICALLY ENLARGED FOR MAXIMUM PROMINENCE */}
      <div style={{
        height: '75vh', // 🚀 SIGNIFICANTLY INCREASED from 60vh to 75vh (25% bigger!)
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px 20px' // 🚀 Optimized padding for better balance
      }}>
        <div 
          style={{
            width: '100%',
            maxWidth: '1600px', // 🚀 MASSIVELY INCREASED from 1400px to 1600px (200px bigger!)
            aspectRatio: '16/9',
            borderRadius: '28px', // 🚀 INCREASED border radius for premium look
            overflow: 'hidden',
            boxShadow: '0 50px 100px rgba(0, 0, 0, 0.9), 0 0 0 8px rgba(212, 175, 55, 0.7)', // 🚀 ENHANCED shadow
            border: '8px solid rgba(212, 175, 55, 0.9)', // 🚀 THICKER, more prominent border
            position: 'relative',
            background: '#000',
            cursor: showControls ? 'default' : 'none',
            transform: 'scale(1.02)', // 🚀 SUBTLE scale increase for extra prominence
            transition: 'all 0.3s ease'
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.03)'; // 🚀 ENHANCED hover effect
            e.currentTarget.style.boxShadow = '0 60px 120px rgba(0, 0, 0, 0.95), 0 0 0 8px rgba(212, 175, 55, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.boxShadow = '0 50px 100px rgba(0, 0, 0, 0.9), 0 0 0 8px rgba(212, 175, 55, 0.7)';
          }}
        >
          {videoError ? (
            /* ERROR FALLBACK */
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(/MacrobiusBottle.jpg) center/cover',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#d4af37',
              textAlign: 'center',
              padding: '50px' // 🚀 INCREASED padding
            }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '25px', fontFamily: 'Times New Roman, serif' }}> {/* 🚀 LARGER text */}
                Video wird geladen...
              </h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '35px', opacity: 0.8 }}> {/* 🚀 LARGER text */}
                Bitte stellen Sie sicher, dass AppIntro.mov hochgeladen wurde.
              </p>
              <button
                onClick={skipToApp}
                style={{
                  padding: '18px 36px', // 🚀 LARGER button
                  backgroundColor: 'rgba(212, 175, 55, 0.9)',
                  border: '3px solid #d4af37', // 🚀 THICKER border
                  borderRadius: '30px', // 🚀 MORE rounded
                  color: '#1a1a1a',
                  fontSize: '18px', // 🚀 LARGER font
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.backgroundColor = '#d4af37';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.9)';
                }}
              >
                Zur App
              </button>
            </div>
          ) : (
            /* REAL HTML5 VIDEO */
            <>
              <video
                ref={videoRef}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '24px' // 🚀 INCREASED border radius
                }}
                preload="metadata"
                onLoadedData={handleVideoLoad}
                onError={handleVideoError}
                onEnded={handleVideoEnded}
                muted={isMuted}
                playsInline
              >
                {/* YOUR ACTUAL VIDEO FILE */}
                <source src="/AppIntro.mov" type="video/quicktime" />
                <source src="/AppIntro.mp4" type="video/mp4" />
                
                {/* Fallback message */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: '#d4af37',
                  fontSize: '20px' // 🚀 LARGER font
                }}>
                  Ihr Browser unterstützt HTML5-Video nicht.
                </div>
              </video>
              
              {/* 🔧 FIXED: VIDEO CONTROLS OVERLAY - 🚀 ENLARGED CONTROLS */}
              {showControls && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isPlaying ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.7)',
                  borderRadius: '24px', // 🚀 INCREASED border radius
                  transition: 'all 0.3s ease',
                  zIndex: 20
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '25px' // 🚀 INCREASED gap
                  }}>
                    {/* MAIN PLAY/PAUSE BUTTON - 🚀 MASSIVELY ENLARGED */}
                    <button
                      onClick={handlePlayPause}
                      disabled={isLoading}
                      style={{
                        width: '180px', // 🚀 SIGNIFICANTLY INCREASED from 140px to 180px
                        height: '180px', // 🚀 SIGNIFICANTLY INCREASED from 140px to 180px
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.95), rgba(212, 175, 55, 0.8))',
                        border: '6px solid #d4af37', // 🚀 THICKER border
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // 🚀 ENHANCED easing
                        boxShadow: '0 20px 50px rgba(212, 175, 55, 0.6)', // 🚀 ENHANCED shadow
                        opacity: isLoading ? 0.7 : 1,
                        transform: 'scale(1)', // Base transform
                        filter: 'drop-shadow(0 4px 12px rgba(212, 175, 55, 0.4))' // 🚀 ADDED drop shadow
                      }}
                      onMouseEnter={(e) => {
                        if (!isLoading) {
                          e.currentTarget.style.transform = 'scale(1.15)'; // 🚀 ENHANCED scale
                          e.currentTarget.style.boxShadow = '0 25px 60px rgba(212, 175, 55, 0.8)'; // 🚀 ENHANCED shadow
                          e.currentTarget.style.filter = 'drop-shadow(0 6px 16px rgba(212, 175, 55, 0.6))';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 20px 50px rgba(212, 175, 55, 0.6)';
                        e.currentTarget.style.filter = 'drop-shadow(0 4px 12px rgba(212, 175, 55, 0.4))';
                      }}
                    >
                      {isLoading ? (
                        <div style={{
                          width: '55px', // 🚀 SIGNIFICANTLY INCREASED size
                          height: '55px',
                          border: '5px solid #1a1a1a', // 🚀 THICKER border
                          borderTop: '5px solid transparent',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }} />
                      ) : isPlaying ? (
                        <Pause style={{ width: '55px', height: '55px', color: '#1a1a1a' }} /> // 🚀 SIGNIFICANTLY INCREASED icon size
                      ) : (
                        <Play style={{ width: '55px', height: '55px', color: '#1a1a1a', marginLeft: '6px' }} /> // 🚀 SIGNIFICANTLY INCREASED icon size
                      )}
                    </button>
                    
                    {/* CONTROL BUTTONS - 🚀 ENLARGED */}
                    <div style={{
                      display: 'flex',
                      gap: '16px', // 🚀 INCREASED gap
                      alignItems: 'center'
                    }}>
                      <button
                        onClick={handleMuteToggle}
                        style={{
                          padding: '12px 20px', // 🚀 LARGER padding
                          backgroundColor: 'rgba(212, 175, 55, 0.2)',
                          border: '3px solid rgba(212, 175, 55, 0.5)', // 🚀 THICKER border
                          borderRadius: '25px', // 🚀 MORE rounded
                          color: '#d4af37',
                          fontSize: '16px', // 🚀 LARGER font
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px', // 🚀 INCREASED gap
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)' // 🚀 ADDED shadow
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                          e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
                        }}
                      >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />} {/* 🚀 LARGER icons */}
                        {isMuted ? 'Ton an' : 'Stumm'}
                      </button>
                      
                      <button
                        onClick={handleRestart}
                        style={{
                          padding: '12px 20px', // 🚀 LARGER padding
                          backgroundColor: 'rgba(212, 175, 55, 0.2)',
                          border: '3px solid rgba(212, 175, 55, 0.5)', // 🚀 THICKER border
                          borderRadius: '25px', // 🚀 MORE rounded
                          color: '#d4af37',
                          fontSize: '16px', // 🚀 LARGER font
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px', // 🚀 INCREASED gap
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)' // 🚀 ADDED shadow
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                          e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
                        }}
                      >
                        <RotateCcw size={18} /> {/* 🚀 LARGER icon */}
                        Neustart
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* PROGRESS BAR - 🚀 ENHANCED */}
              {isPlaying && (
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  height: '6px', // 🚀 THICKER progress bar
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  zIndex: 21,
                  borderRadius: '0 0 24px 24px' // 🚀 ROUNDED bottom corners
                }}>
                  <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #d4af37, #f59e0b)', // 🚀 GRADIENT progress
                    transition: 'width 0.2s ease',
                    borderRadius: '0 0 24px 0' // 🚀 ROUNDED corner
                  }} />
                </div>
              )}
            </>
          )}
          
          {/* STATUS OVERLAY - 🚀 ENHANCED */}
          <div style={{
            position: 'absolute',
            bottom: '30px', // 🚀 INCREASED spacing
            left: '30px',
            right: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 30px', // 🚀 INCREASED padding
            backgroundColor: 'rgba(0, 0, 0, 0.9)', // 🚀 DARKER background
            borderRadius: '20px', // 🚀 MORE rounded
            backdropFilter: 'blur(25px)', // 🚀 ENHANCED blur
            border: '3px solid rgba(212, 175, 55, 0.5)', // 🚀 THICKER border
            opacity: showControls ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: showControls ? 'auto' : 'none',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)' // 🚀 ADDED shadow
          }}>
            <div style={{
              color: '#d4af37',
              fontSize: '18px', // 🚀 LARGER font
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '15px' // 🚀 INCREASED gap
            }}>
              🏛️ Macrobius App Trailer
              <div style={{
                width: '10px', // 🚀 LARGER indicator
                height: '10px',
                borderRadius: '50%',
                backgroundColor: isPlaying ? '#22c55e' : videoError ? '#ef4444' : '#d4af37',
                animation: 'statusPulse 2s ease-in-out infinite',
                boxShadow: `0 0 10px ${isPlaying ? '#22c55e' : videoError ? '#ef4444' : '#d4af37'}` // 🚀 ADDED glow
              }} />
            </div>
            <div style={{
              color: 'rgba(212, 175, 55, 0.9)',
              fontSize: '15px', // 🚀 LARGER font
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '10px' // 🚀 INCREASED gap
            }}>
              {videoError ? 'Fehler beim Laden' : 
               isLoading ? 'Wird geladen...' : 
               isPlaying ? 'Wiedergabe mit Ton' : 'Bereit zum Abspielen'}
            </div>
          </div>
        </div>
      </div>
      
      {/* 🏛️ BIG MACROBIUS TITLE - BELOW VIDEO - 🚀 ENHANCED */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '25px 40px' // 🚀 INCREASED padding
      }}>
        <h1 style={{
          fontSize: '4.5rem', // 🚀 LARGER title
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #d4af37 0%, #ffd700 25%, #ffed4e 50%, #d4af37 75%, #b8860b 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0',
          fontFamily: 'Times New Roman, serif',
          textAlign: 'center',
          textShadow: '0 8px 25px rgba(212, 175, 55, 0.6)', // 🚀 ENHANCED shadow
          letterSpacing: '3px', // 🚀 INCREASED letter spacing
          animation: 'titleGlow 4s ease-in-out infinite alternate',
          filter: 'drop-shadow(0 4px 8px rgba(212, 175, 55, 0.3))' // 🚀 ADDED drop shadow
        }}>
          MACROBIUS
        </h1>
      </div>
      
      {/* 🎯 ACTION SECTION - 🚀 ENHANCED */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '25px', // 🚀 INCREASED padding
        maxWidth: '1100px', // 🚀 WIDER container
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          gap: '25px', // 🚀 INCREASED gap
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={skipToApp}
            style={{
              padding: '18px 36px', // 🚀 LARGER padding
              backgroundColor: 'rgba(212, 175, 55, 0.95)',
              border: '4px solid #d4af37', // 🚀 THICKER border
              borderRadius: '70px', // 🚀 MORE rounded
              color: '#1a1a1a',
              fontSize: '18px', // 🚀 LARGER font
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // 🚀 ENHANCED easing
              display: 'flex',
              alignItems: 'center',
              gap: '15px', // 🚀 INCREASED gap
              boxShadow: '0 10px 25px rgba(212, 175, 55, 0.7)', // 🚀 ENHANCED shadow
              textTransform: 'uppercase',
              letterSpacing: '1.5px', // 🚀 INCREASED letter spacing
              transform: 'scale(1)', // Base transform
              filter: 'drop-shadow(0 4px 8px rgba(212, 175, 55, 0.4))' // 🚀 ADDED drop shadow
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#d4af37';
              e.currentTarget.style.transform = 'scale(1.08) translateY(-3px)'; // 🚀 ENHANCED hover
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(212, 175, 55, 0.8)';
              e.currentTarget.style.filter = 'drop-shadow(0 6px 12px rgba(212, 175, 55, 0.6))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.95)';
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(212, 175, 55, 0.7)';
              e.currentTarget.style.filter = 'drop-shadow(0 4px 8px rgba(212, 175, 55, 0.4))';
            }}
          >
            <SkipForward style={{ width: '22px', height: '22px' }} /> {/* 🚀 LARGER icon */}
            App Betreten
          </button>
          
          <div style={{
            padding: '14px 24px', // 🚀 LARGER padding
            backgroundColor: 'rgba(0, 0, 0, 0.85)', // 🚀 DARKER background
            border: '3px solid rgba(212, 175, 55, 0.6)', // 🚀 THICKER border
            borderRadius: '50px', // 🚀 MORE rounded
            color: '#d4af37',
            fontSize: '16px', // 🚀 LARGER font
            fontWeight: '600',
            backdropFilter: 'blur(20px)', // 🚀 ENHANCED blur
            display: 'flex',
            alignItems: 'center',
            gap: '12px', // 🚀 INCREASED gap
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)' // 🚀 ADDED shadow
          }}>
            <div style={{
              width: '6px', // 🚀 LARGER indicator
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#d4af37',
              animation: 'statusPulse 1.5s ease-in-out infinite',
              boxShadow: '0 0 8px #d4af37' // 🚀 ADDED glow
            }} />
            Auto-Start: {countdown}s
          </div>
        </div>
      </div>
      
      {/* 🏛️ MACROBIUS HISTORICAL TEXT SECTION - OPTIMIZED FOR LARGER VIDEO */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1100px', // 🚀 WIDER to match enhanced design
        margin: '0 auto',
        padding: '35px', // 🚀 INCREASED padding
        width: '100%'
      }}>
        <div style={{
          padding: '35px', // 🚀 INCREASED padding
          backgroundColor: 'rgba(255, 255, 255, 0.96)', // 🚀 SLIGHTLY more opaque
          borderRadius: '24px', // 🚀 MORE rounded
          border: '3px solid rgba(212, 175, 55, 0.7)', // 🚀 THICKER border
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)', // 🚀 ENHANCED shadow
          backdropFilter: 'blur(25px)', // 🚀 ENHANCED blur
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* 🎨 Enhanced background pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.06), transparent 50%),
              radial-gradient(circle at 90% 80%, rgba(139, 92, 246, 0.04), transparent 50%),
              linear-gradient(45deg, transparent 49%, rgba(212, 175, 55, 0.03) 50%, transparent 51%)
            `,
            backgroundSize: '120px 120px, 180px 180px, 25px 25px', // 🚀 LARGER patterns
            animation: 'backgroundShift 20s ease-in-out infinite'
          }} />
          
          {/* Content */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            {/* Header with icon */}
            <div style={{
              textAlign: 'center',
              marginBottom: '30px' // 🚀 INCREASED margin
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '15px', // 🚀 INCREASED gap
                padding: '15px 30px', // 🚀 LARGER padding
                backgroundColor: 'rgba(212, 175, 55, 0.18)', // 🚀 SLIGHTLY more opaque
                border: '3px solid rgba(212, 175, 55, 0.5)', // 🚀 THICKER border
                borderRadius: '20px', // 🚀 MORE rounded
                marginBottom: '25px', // 🚀 INCREASED margin
                boxShadow: '0 4px 15px rgba(212, 175, 55, 0.2)' // 🚀 ADDED shadow
              }}>
                <Scroll style={{ width: '32px', height: '32px', color: '#d4af37' }} /> {/* 🚀 LARGER icon */}
                <span style={{
                  fontSize: '20px', // 🚀 LARGER font
                  fontWeight: 'bold',
                  color: '#92400e',
                  fontFamily: 'Times New Roman, serif'
                }}>
                  Die Geschichte der Flaschenpost
                </span>
              </div>
            </div>
            
            {/* Main German text - 🚀 ENHANCED */}
            <div style={{
              fontSize: '16px', // 🚀 LARGER font
              lineHeight: '1.75', // 🚀 INCREASED line height
              color: '#1f2937',
              textAlign: 'justify',
              marginBottom: '35px', // 🚀 INCREASED margin
              fontFamily: 'Georgia, serif',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' // 🚀 ENHANCED shadow
            }}>
              <p style={{ margin: '0 0 18px 0', fontWeight: '500' }}> {/* 🚀 INCREASED margin */}
                <strong>Vor 1500 Jahren, als das römische Reich dem Untergang entgegensah, 
                fertigte Macrobius, ein führender Verwaltungsbeamter und Gelehrter im 
                Norden Italiens, eine Flaschenpost an die Zukunft an. Diese 
                Flaschenpost bestand aus zwei Texten: Einer ungezwungenen Gesprächsrunde 
                gebildeter Römer und einem Traumkommentar. In beidem versuchte Macrobius 
                das, was ihm an der untergehenden Zivilisation der Antike wichtig war, 
                in einer Weise zu verpacken, die die heranziehenden dunklen Jahrhunderte 
                überstand und zukünftige Leser anregte, den Zivilisationsprozess wieder 
                in Gang zu setzen mit der Erinnerung an die antike Zivilisation als 
                Ermutigung und Materialquelle.</strong>
              </p>
              
              <p style={{ margin: '0 0 18px 0', fontWeight: '500' }}> {/* 🚀 INCREASED margin */}
                <strong>Vor 500 Jahren begann dieser Neuanfang. In Dänemark durch astronomische 
                Beobachtungen Tycho Brahes, der damit den Grundstein für Keplers Arbeit 
                und das Entstehen moderner Naturwissenschaften legte. Ein Assistent 
                Tychos erinnerte sich an Macrobius Flaschenpost und stellte erstmals 
                eine zuverlässige und kommentierte Gesamtausgabe zusammen.</strong>
              </p>
              
              <p style={{ margin: '0', fontWeight: '500' }}>
                <strong>Dieses Buch kam in meine Hände und ich auf die Idee, eine kleine App 
                für euch zu dieser Geschichte zu basteln.... Viel Spaß!</strong>
              </p>
            </div>
            
            {/* 🖼️ Two Macrobius Images Side by Side - ENHANCED */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '30px', // 🚀 INCREASED gap
              marginTop: '35px' // 🚀 INCREASED margin
            }}>
              {/* Macrobius Portrait */}
              <div style={{
                borderRadius: '16px', // 🚀 MORE rounded
                overflow: 'hidden',
                boxShadow: '0 18px 35px rgba(0, 0, 0, 0.25), 0 0 0 3px rgba(212, 175, 55, 0.5)', // 🚀 ENHANCED shadow
                border: '3px solid rgba(212, 175, 55, 0.6)', // 🚀 THICKER border
                transition: 'all 0.4s ease',
                backgroundColor: '#ffffff'
              }}>
                <img
                  src="/Macrobius-Portrait.jpg"
                  alt="Macrobius Portrait - Der Gelehrte des späten römischen Reiches"
                  style={{
                    width: '100%',
                    height: '270px', // 🚀 TALLER image
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.04)'; // 🚀 ENHANCED scale
                    e.currentTarget.parentElement!.style.boxShadow = '0 25px 45px rgba(0, 0, 0, 0.35), 0 0 0 3px rgba(212, 175, 55, 0.7)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.parentElement!.style.boxShadow = '0 18px 35px rgba(0, 0, 0, 0.25), 0 0 0 3px rgba(212, 175, 55, 0.5)';
                  }}
                />
                <div style={{
                  padding: '18px', // 🚀 INCREASED padding
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(248, 246, 240, 0.96))' // 🚀 ENHANCED gradient
                }}>
                  <h3 style={{
                    fontSize: '17px', // 🚀 LARGER font
                    fontWeight: 'bold',
                    color: '#92400e',
                    margin: '0 0 8px 0', // 🚀 INCREASED margin
                    fontFamily: 'Times New Roman, serif'
                  }}>
                    Macrobius Ambrosius Theodosius
                  </h3>
                  <p style={{
                    fontSize: '13px', // 🚀 LARGER font
                    color: '#6b7280',
                    margin: 0,
                    fontStyle: 'italic'
                  }}>
                    Römischer Gelehrter und Verfasser der Saturnalia
                  </p>
                </div>
              </div>
              
              {/* Macrobius Universe */}
              <div style={{
                borderRadius: '16px', // 🚀 MORE rounded
                overflow: 'hidden',
                boxShadow: '0 18px 35px rgba(0, 0, 0, 0.25), 0 0 0 3px rgba(212, 175, 55, 0.5)', // 🚀 ENHANCED shadow
                border: '3px solid rgba(212, 175, 55, 0.6)', // 🚀 THICKER border
                transition: 'all 0.4s ease',
                backgroundColor: '#ffffff'
              }}>
                <img
                  src="/Macrobius-universe.jpg"
                  alt="Macrobius Universum - Kosmologische Darstellung der antiken Welt"
                  style={{
                    width: '100%',
                    height: '270px', // 🚀 TALLER image
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.04)'; // 🚀 ENHANCED scale
                    e.currentTarget.parentElement!.style.boxShadow = '0 25px 45px rgba(0, 0, 0, 0.35), 0 0 0 3px rgba(212, 175, 55, 0.7)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.parentElement!.style.boxShadow = '0 18px 35px rgba(0, 0, 0, 0.25), 0 0 0 3px rgba(212, 175, 55, 0.5)';
                  }}
                />
                <div style={{
                  padding: '18px', // 🚀 INCREASED padding
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(248, 246, 240, 0.96))' // 🚀 ENHANCED gradient
                }}>
                  <h3 style={{
                    fontSize: '17px', // 🚀 LARGER font
                    fontWeight: 'bold',
                    color: '#92400e',
                    margin: '0 0 8px 0', // 🚀 INCREASED margin
                    fontFamily: 'Times New Roman, serif'
                  }}>
                    Somnium Scipionis
                  </h3>
                  <p style={{
                    fontSize: '13px', // 🚀 LARGER font
                    color: '#6b7280',
                    margin: 0,
                    fontStyle: 'italic'
                  }}>
                    Kommentar zu Ciceros Traum des Scipio
                  </p>
                </div>
              </div>
            </div>
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
        @keyframes backgroundShift {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(12px) translateY(-8px); }
        }
        @keyframes titleGlow {
          0% { text-shadow: 0 8px 25px rgba(212, 175, 55, 0.6); }
          100% { text-shadow: 0 12px 35px rgba(212, 175, 55, 0.9), 0 0 50px rgba(212, 175, 55, 0.4); }
        }
        @keyframes statusPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.15); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};