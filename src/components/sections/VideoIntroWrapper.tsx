import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { IntroSection } from './IntroSection';
import { SkipForward, Play, Volume2, VolumeX } from 'lucide-react';

interface VideoIntroWrapperProps {
  language: 'DE' | 'EN' | 'LA';
}

/**
 * 🎬 SMART YOUTUBE PLAYER - Handles Autoplay Restrictions While Preserving Audio
 * Uses the existing YouTube video: https://youtu.be/w7h_xi_omfg
 */
export const VideoIntroWrapper: React.FC<VideoIntroWrapperProps> = ({ language }) => {
  const { t } = useLanguage();
  const [showVideo, setShowVideo] = useState(true);
  const [countdown, setCountdown] = useState(45);
  const [videoStarted, setVideoStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay compliance
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [autoplayAttempted, setAutoplayAttempted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // YouTube video ID from your link
  const YOUTUBE_VIDEO_ID = 'w7h_xi_omfg';
  
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
  
  // Smart autoplay attempt
  useEffect(() => {
    if (autoplayAttempted) return;
    
    // Try muted autoplay first (more likely to succeed)
    const attemptAutoplay = () => {
      setAutoplayAttempted(true);
      
      // Create iframe with muted autoplay
      const mutedEmbedUrl = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`;
      
      if (iframeRef.current) {
        iframeRef.current.src = mutedEmbedUrl;
        
        // Hide play button if autoplay likely works
        setTimeout(() => {
          setShowPlayButton(false);
          setVideoStarted(true);
          
          // Show unmute option after video starts
          setTimeout(() => {
            // Show controls overlay for unmuting
          }, 2000);
        }, 1500);
      }
    };
    
    // Delay autoplay attempt slightly
    setTimeout(attemptAutoplay, 1000);
  }, [autoplayAttempted]);
  
  // Handle play button click - Start with sound
  const handlePlayClick = () => {
    if (!iframeRef.current) return;
    
    // Create new iframe with sound enabled
    const audioEmbedUrl = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}&start=0`;
    
    // Replace iframe for fresh start with audio
    const newIframe = document.createElement('iframe');
    newIframe.src = audioEmbedUrl;
    newIframe.style.width = '100%';
    newIframe.style.height = '100%';
    newIframe.style.border = 'none';
    newIframe.style.borderRadius = '20px';
    newIframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen';
    newIframe.allowFullscreen = true;
    newIframe.title = 'Macrobius App Trailer';
    
    if (iframeRef.current.parentNode) {
      iframeRef.current.parentNode.replaceChild(newIframe, iframeRef.current);
      // @ts-ignore
      iframeRef.current = newIframe;
    }
    
    setVideoStarted(true);
    setShowPlayButton(false);
    setIsMuted(false);
  };
  
  // Toggle mute/unmute while video is playing
  const handleMuteToggle = () => {
    if (!iframeRef.current || !videoStarted) return;
    
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    
    // Create new iframe with updated mute state
    const toggleEmbedUrl = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=${newMuteState ? 1 : 0}&controls=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`;
    
    const newIframe = document.createElement('iframe');
    newIframe.src = toggleEmbedUrl;
    newIframe.style.width = '100%';
    newIframe.style.height = '100%';
    newIframe.style.border = 'none';
    newIframe.style.borderRadius = '20px';
    newIframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen';
    newIframe.allowFullscreen = true;
    newIframe.title = 'Macrobius App Trailer';
    
    if (iframeRef.current.parentNode) {
      iframeRef.current.parentNode.replaceChild(newIframe, iframeRef.current);
      // @ts-ignore
      iframeRef.current = newIframe;
    }
  };
  
  const skipToApp = () => {
    setShowVideo(false);
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
      
      {/* 🎬 SMART YOUTUBE VIDEO PLAYER */}
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
          
          {/* YOUTUBE IFRAME */}
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?controls=1&rel=0&modestbranding=1&playsinline=1`}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '20px',
              opacity: showPlayButton && !videoStarted ? 0.3 : 1,
              transition: 'opacity 0.5s ease'
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
            title="Macrobius App Trailer"
            loading="eager"
          />
          
          {/* SMART PLAY OVERLAY */}
          {showPlayButton && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0, 0, 0, 0.75)',
              borderRadius: '20px',
              zIndex: 20
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '30px'
              }}>
                {/* MAIN PLAY BUTTON WITH SOUND */}
                <button
                  onClick={handlePlayClick}
                  style={{
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.95), rgba(212, 175, 55, 0.8))',
                    border: '4px solid #d4af37',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 15px 40px rgba(212, 175, 55, 0.5)',
                    animation: 'playButtonPulse 2s ease-in-out infinite'
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
                  <Play style={{ width: '50px', height: '50px', color: '#1a1a1a', marginLeft: '6px' }} />
                </button>
                
                {/* SOUND INDICATOR */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 24px',
                  backgroundColor: 'rgba(34, 197, 94, 0.2)',
                  border: '2px solid rgba(34, 197, 94, 0.5)',
                  borderRadius: '25px',
                  color: '#22c55e'
                }}>
                  <Volume2 style={{ width: '20px', height: '20px' }} />
                  <span style={{ fontSize: '16px', fontWeight: 'bold' }}>With Sound!</span>
                </div>
                
                {/* INSTRUCTIONS */}
                <div style={{
                  color: '#d4af37',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
                }}>
                  Click to Start Trailer
                </div>
              </div>
            </div>
          )}
          
          {/* MUTE/UNMUTE CONTROLS (shown when video is playing) */}
          {videoStarted && !showPlayButton && (
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              zIndex: 25
            }}>
              <button
                onClick={handleMuteToggle}
                style={{
                  padding: '12px 20px',
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '2px solid rgba(212, 175, 55, 0.7)',
                  borderRadius: '25px',
                  color: '#d4af37',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
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
            pointerEvents: videoStarted ? 'none' : 'auto'
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
                backgroundColor: videoStarted ? '#22c55e' : '#d4af37',
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
              {videoStarted ? (
                <>
                  {isMuted ? (
                    <VolumeX style={{ width: '12px', height: '12px' }} />
                  ) : (
                    <Volume2 style={{ width: '12px', height: '12px' }} />
                  )}
                  {isMuted ? 'Muted' : 'With Sound'}
                </>
              ) : (
                'Ready to Play'
              )}
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
        @keyframes playButtonPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};