'use client';

import React, { useEffect, useRef, useMemo } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  color: string;
  type: 'major' | 'large' | 'medium' | 'small';
}

interface EnhancedStarfieldProps {
  density?: number;
  className?: string;
  enableShooting?: boolean;
  enableConstellations?: boolean;
}

const EnhancedStarfield: React.FC<EnhancedStarfieldProps> = ({
  density = 150,
  className = '',
  enableShooting = true,
  enableConstellations = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);
  const shootingStarRef = useRef<{
    x: number;
    y: number;
    length: number;
    speed: number;
    opacity: number;
    active: boolean;
  } | null>(null);

  // Generate enhanced star field
  const generateStars = useMemo(() => {
    const stars: Star[] = [];
    
    for (let i = 0; i < density; i++) {
      const typeRand = Math.random();
      let type: Star['type'];
      let size: number;
      let color: string;
      
      if (typeRand < 0.05) {
        type = 'major';
        size = 3 + Math.random() * 2;
        color = '#ffffff';
      } else if (typeRand < 0.2) {
        type = 'large';
        size = 2 + Math.random() * 1.5;
        color = '#93c5fd';
      } else if (typeRand < 0.5) {
        type = 'medium';
        size = 1.5 + Math.random();
        color = '#c4b5fd';
      } else {
        type = 'small';
        size = 0.5 + Math.random() * 0.5;
        color = '#fde68a';
      }
      
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size,
        opacity: 0.3 + Math.random() * 0.7,
        twinkleSpeed: 0.5 + Math.random() * 2,
        color,
        type
      });
    }
    
    return stars;
  }, [density]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      starsRef.current = generateStars;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.016; // ~60fps
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars with enhanced effects
      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed) * 0.3 + 0.7;
        const currentOpacity = star.opacity * twinkle;
        
        // Enhanced glow effect
        const glowSize = star.size * (2 + Math.sin(time * star.twinkleSpeed * 0.5));
        
        // Outer glow
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, glowSize
        );
        gradient.addColorStop(0, `${star.color}${Math.floor(currentOpacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.5, `${star.color}${Math.floor(currentOpacity * 0.3 * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Core star
        ctx.beginPath();
        ctx.fillStyle = `${star.color}${Math.floor(currentOpacity * 255).toString(16).padStart(2, '0')}`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add sparkle effect for major stars
        if (star.type === 'major' && twinkle > 0.8) {
          const sparkleLength = star.size * 3;
          ctx.strokeStyle = `${star.color}${Math.floor(currentOpacity * 0.8 * 255).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 0.5;
          
          // Cross sparkle
          ctx.beginPath();
          ctx.moveTo(star.x - sparkleLength, star.y);
          ctx.lineTo(star.x + sparkleLength, star.y);
          ctx.moveTo(star.x, star.y - sparkleLength);
          ctx.lineTo(star.x, star.y + sparkleLength);
          ctx.stroke();
        }
      });
      
      // Enhanced shooting stars
      if (enableShooting) {
        // Create new shooting star randomly
        if (!shootingStarRef.current || !shootingStarRef.current.active) {
          if (Math.random() < 0.002) {
            shootingStarRef.current = {
              x: canvas.width + 50,
              y: Math.random() * canvas.height * 0.6,
              length: 50 + Math.random() * 100,
              speed: 8 + Math.random() * 12,
              opacity: 1,
              active: true
            };
          }
        }
        
        // Draw shooting star
        if (shootingStarRef.current?.active) {
          const star = shootingStarRef.current;
          
          // Update position
          star.x -= star.speed;
          star.y += star.speed * 0.3;
          star.opacity *= 0.995;
          
          if (star.x < -star.length || star.opacity < 0.1) {
            star.active = false;
          } else {
            // Draw shooting star trail
            const gradient = ctx.createLinearGradient(
              star.x, star.y,
              star.x + star.length, star.y - star.length * 0.3
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
            gradient.addColorStop(0.3, `rgba(251, 191, 36, ${star.opacity * 0.8})`);
            gradient.addColorStop(1, 'transparent');
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(star.x + star.length, star.y - star.length * 0.3);
            ctx.stroke();
            
            // Add glow
            ctx.shadowColor = '#fbbf24';
            ctx.shadowBlur = 10;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }
      
      // Enhanced constellation connections
      if (enableConstellations && starsRef.current.length > 0) {
        const majorStars = starsRef.current.filter(star => star.type === 'major' || star.type === 'large');
        
        ctx.strokeStyle = `rgba(251, 191, 36, ${0.1 + Math.sin(time * 0.5) * 0.05})`;
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < majorStars.length; i++) {
          for (let j = i + 1; j < majorStars.length; j++) {
            const star1 = majorStars[i];
            const star2 = majorStars[j];
            const distance = Math.sqrt(
              (star1.x - star2.x) ** 2 + (star1.y - star2.y) ** 2
            );
            
            if (distance < 200) {
              const opacity = (200 - distance) / 200 * 0.3;
              ctx.strokeStyle = `rgba(251, 191, 36, ${opacity})`;
              
              ctx.beginPath();
              ctx.moveTo(star1.x, star1.y);
              ctx.lineTo(star2.x, star2.y);
              ctx.stroke();
            }
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [generateStars, enableShooting, enableConstellations]);
  
  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{
        background: 'transparent'
      }}
    />
  );
};

export default EnhancedStarfield;