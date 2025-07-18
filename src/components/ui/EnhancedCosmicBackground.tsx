'use client';

import React, { useEffect, useRef } from 'react';
import EnhancedStarfield from './EnhancedStarfield';

interface NebulaProps {
  className?: string;
  variant?: 'blue' | 'purple' | 'gold' | 'mixed';
  intensity?: number;
}

const EnhancedNebula: React.FC<NebulaProps> = ({ 
  className = '',
  variant = 'mixed',
  intensity = 0.6
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    let time = 0;
    const animate = () => {
      time += 0.01;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create multiple nebula layers
      const layers = [
        { color: 'rgba(59, 130, 246, 0.15)', scale: 1.5, speed: 0.3 },
        { color: 'rgba(147, 51, 234, 0.12)', scale: 1.2, speed: 0.5 },
        { color: 'rgba(251, 191, 36, 0.08)', scale: 0.8, speed: 0.7 }
      ];
      
      layers.forEach((layer, index) => {
        const offsetX = Math.sin(time * layer.speed) * 50;
        const offsetY = Math.cos(time * layer.speed * 0.7) * 30;
        
        // Create nebula gradient
        const gradient = ctx.createRadialGradient(
          canvas.width * 0.3 + offsetX,
          canvas.height * 0.4 + offsetY,
          0,
          canvas.width * 0.3 + offsetX,
          canvas.height * 0.4 + offsetY,
          canvas.width * layer.scale
        );
        
        const alpha = intensity * (0.8 + Math.sin(time * layer.speed * 2) * 0.2);
        const colorWithAlpha = layer.color.replace(/[^,]+(?=\))/, alpha.toString());
        
        gradient.addColorStop(0, colorWithAlpha);
        gradient.addColorStop(0.3, colorWithAlpha.replace(/[^,]+(?=\))/, (alpha * 0.6).toString()));
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [intensity, variant]);
  
  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ background: 'transparent' }}
    />
  );
};

interface EnhancedCosmicBackgroundProps {
  children: React.ReactNode;
  className?: string;
  enableParticles?: boolean;
  enableNebula?: boolean;
  starDensity?: number;
}

const EnhancedCosmicBackground: React.FC<EnhancedCosmicBackgroundProps> = ({
  children,
  className = '',
  enableParticles = true,
  enableNebula = true,
  starDensity = 200
}) => {
  return (
    <div className={`relative min-h-screen macrobius-gradient-enhanced ${className}`}>
      {/* Enhanced Nebula Layer */}
      {enableNebula && (
        <EnhancedNebula 
          variant="mixed" 
          intensity={0.4}
          className="opacity-60"
        />
      )}
      
      {/* Enhanced Starfield */}
      {enableParticles && (
        <EnhancedStarfield 
          density={starDensity}
          enableShooting={true}
          enableConstellations={true}
          className="opacity-80"
        />
      )}
      
      {/* Cosmic Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="w-full h-full opacity-[0.02]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(251, 191, 36, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
              linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '100px 100px'
          }}
        />
      </div>
      
      {/* Enhanced Astrolabe Background Element */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <div className="relative">
          {/* Main Astrolabe Ring */}
          <div className="w-96 h-96 md:w-[500px] md:h-[500px] border border-yellow-400/10 rounded-full animate-astrolabe-enhanced">
            {/* Inner Rings */}
            <div className="absolute inset-8 border border-yellow-400/8 rounded-full">
              <div className="absolute inset-8 border border-yellow-400/6 rounded-full">
                <div className="absolute inset-8 border border-yellow-400/4 rounded-full">
                  {/* Central Star */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 bg-yellow-400/30 rounded-full animate-cosmic-pulse-enhanced" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Constellation Markers */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30) * Math.PI / 180;
              const radius = 180;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400/20 rounded-full animate-shimmer-enhanced"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Cosmic Vignette Effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-[5]"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(10, 13, 31, 0.1) 70%, rgba(10, 13, 31, 0.3) 100%)`
        }}
      />
    </div>
  );
};

export default EnhancedCosmicBackground;