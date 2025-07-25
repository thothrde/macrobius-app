import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { IntroSection } from './IntroSection';
import { SkipForward, Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';

interface VideoIntroWrapperProps {
  language: 'DE' | 'EN' | 'LA';
}

/**
 * 🎬 REAL HTML5 VIDEO PLAYER - Uses Your AppIntro.mov File With Sound!
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
      } else {
        // Ensure video is unmuted for sound
        video.muted = isMuted;
        await video.play();
        setIsPlaying(true);
        
        // Hide controls after 3 seconds of playback
        setTimeout(() => {
          if (isPlaying) setShowControls(false);
        }, 3000);
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
  
  // Show controls on mouse move
  const handleMouseMove = () => {
    setShowControls(true);
    // Hide controls again after 3 seconds
    setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
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
      
      {/* 🎬 REAL HTML5 VIDEO PLAYER */}
      <div style={{
        height: '60vh',
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px'
      }}>
        <div 
          style={{
            width: '100%',
            maxWidth: '900px',
            aspectRatio: '16/9',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8), 0 0 0 4px rgba(212, 175, 55, 0.5)',
            border: '4px solid rgba(212, 175, 55, 0.7)',
            position: 'relative',
            background: '#000',
            cursor: showControls ? 'default' : 'none'
          }}
          onMouseMove={handleMouseMove}
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
              padding: '40px'
            }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '20px', fontFamily: 'Times New Roman, serif' }}>
                Video wird geladen...
              </h2>
              <p style={{ fontSize: '1rem', marginBottom: '30px', opacity: 0.8 }}>
                Bitte stellen Sie sicher, dass AppIntro.mov hochgeladen wurde.
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
                  borderRadius: '20px'
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
                  fontSize: '18px'
                }}>
                  Ihr Browser unterstützt HTML5-Video nicht.
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
                  transition: 'background 0.3s ease',
                  zIndex: 20
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px'
                  }}>
                    {/* MAIN PLAY/PAUSE BUTTON */}
                    <button
                      onClick={handlePlayPause}
                      disabled={isLoading}
                      style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.95), rgba(212, 175, 55, 0.8))',
                        border: '4px solid #d4af37',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 15px 40px rgba(212, 175, 55, 0.5)',
                        opacity: isLoading ? 0.7 : 1
                      }}
                      onMouseEnter={(e) => {
                        if (!isLoading) {
                          e.currentTarget.style.transform = 'scale(1.1)';
                          e.currentTarget.style.boxShadow = '0 20px 50px rgba(212, 175, 55, 0.7)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(212, 175, 55, 0.5)';
                      }}
                    >
                      {isLoading ? (
                        <div style={{
                          width: '40px',
                          height: '40px',
                          border: '4px solid #1a1a1a',
                          borderTop: '4px solid transparent',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }} />
                      ) : isPlaying ? (
                        <Pause style={{ width: '40px', height: '40px', color: '#1a1a1a' }} />
                      ) : (
                        <Play style={{ width: '40px', height: '40px', color: '#1a1a1a', marginLeft: '4px' }} />
                      )}
                    </button>
                    
                    {/* CONTROL BUTTONS */}
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center'
                    }}>
                      <button
                        onClick={handleMuteToggle}
                        style={{
                          padding: '10px 16px',
                          backgroundColor: 'rgba(212, 175, 55, 0.2)',
                          border: '2px solid rgba(212, 175, 55, 0.5)',
                          borderRadius: '20px',
                          color: '#d4af37',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        {isMuted ? 'Ton an' : 'Stumm'}
                      </button>
                      
                      <button
                        onClick={handleRestart}
                        style={{
                          padding: '10px 16px',
                          backgroundColor: 'rgba(212, 175, 55, 0.2)',
                          border: '2px solid rgba(212, 175, 55, 0.5)',
                          borderRadius: '20px',
                          color: '#d4af37',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <RotateCcw size={16} />
                        Neustart
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* PROGRESS BAR */}
              {isPlaying && (
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  height: '4px',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 21
                }}>
                  <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    backgroundColor: '#d4af37',
                    transition: 'width 0.2s ease'
                  }} />
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
            border: '2px solid rgba(212, 175, 55, 0.4)',
            opacity: showControls ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: showControls ? 'auto' : 'none'
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
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {videoError ? 'Fehler beim Laden' : 
               isLoading ? 'Wird geladen...' : 
               isPlaying ? 'Wiedergabe mit Ton' : 'Bereit zum Abspielen'}
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
          marginTop: '20px',
          flexWrap: 'wrap'
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
            App Betreten
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
            Auto-Start: {countdown}s
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