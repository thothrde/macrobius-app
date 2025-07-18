'use client';

import React, { ReactNode, HTMLAttributes, useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface EnhancedClassicalCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'cosmic' | 'oracle' | 'educational' | 'interactive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  glow?: boolean;
  border?: boolean;
  gradient?: boolean;
  constellation?: boolean;
  className?: string;
}

const EnhancedClassicalCard: React.FC<EnhancedClassicalCardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  hover = true,
  glow = false,
  border = true,
  gradient = false,
  constellation = false,
  className,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Enhanced mouse tracking for 3D effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card || !hover) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePosition({ x, y });
    };
    
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      setMousePosition({ x: 0, y: 0 });
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hover]);
  
  const baseStyles = `
    relative rounded-2xl transition-all duration-500 transform-gpu
    will-change-transform overflow-hidden group
  `;
  
  const sizeStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };
  
  const variantStyles = {
    default: `
      glass-cosmic-enhanced border-2 border-white/20
      hover:border-white/40 hover:shadow-2xl
    `,
    cosmic: `
      cosmic-card-enhanced border-2 border-yellow-400/30
      hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-400/20
    `,
    oracle: `
      glass-cosmic-enhanced border-2 border-emerald-400/30
      hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-400/20
    `,
    educational: `
      glass-cosmic-enhanced border-2 border-blue-400/30
      hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-400/20
    `,
    interactive: `
      cosmic-card-enhanced border-2 border-purple-400/30
      hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-400/20
    `
  };
  
  const hoverStyles = hover ? `
    hover:scale-[1.02] hover:-translate-y-2
    cursor-pointer
  ` : '';
  
  const glowStyles = glow ? 'animate-cosmic-pulse-enhanced' : '';
  
  // Calculate 3D transform
  const transform3D = isHovered && hover 
    ? `perspective(1000px) rotateX(${mousePosition.y * -5}deg) rotateY(${mousePosition.x * 5}deg) translateZ(20px)`
    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  
  return (
    <div
      ref={cardRef}
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        hoverStyles,
        glowStyles,
        className
      )}
      style={{
        transform: transform3D,
        transformStyle: 'preserve-3d'
      }}
      {...props}
    >
      {/* Enhanced Background Gradient */}
      {gradient && (
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-br from-yellow-400/20 via-transparent to-blue-600/20 rounded-2xl" />
        </div>
      )}
      
      {/* Constellation Pattern */}
      {constellation && (
        <div className="absolute inset-0 opacity-20">
          {[...Array(8)].map((_, i) => {
            const positions = [
              { top: '15%', left: '20%' },
              { top: '25%', right: '15%' },
              { top: '45%', left: '10%' },
              { top: '35%', right: '25%' },
              { bottom: '30%', left: '25%' },
              { bottom: '20%', right: '20%' },
              { top: '60%', left: '60%' },
              { bottom: '40%', right: '40%' }
            ];
            
            return (
              <div
                key={i}
                className="absolute w-1 h-1 bg-yellow-400/60 rounded-full animate-shimmer-enhanced"
                style={{
                  ...positions[i],
                  animationDelay: `${i * 0.3}s`
                }}
              />
            );
          })}
          
          {/* Constellation Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
            <line x1="20%" y1="15%" x2="85%" y2="25%" stroke="rgba(251, 191, 36, 0.2)" strokeWidth="0.5" />
            <line x1="10%" y1="45%" x2="75%" y2="35%" stroke="rgba(251, 191, 36, 0.2)" strokeWidth="0.5" />
            <line x1="25%" y1="70%" x2="80%" y2="80%" stroke="rgba(251, 191, 36, 0.2)" strokeWidth="0.5" />
          </svg>
        </div>
      )}
      
      {/* Interactive Light Effect */}
      {hover && isHovered && (
        <div 
          className="absolute inset-0 opacity-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${(mousePosition.x + 1) * 50}% ${(mousePosition.y + 1) * 50}%, rgba(251, 191, 36, 0.2) 0%, transparent 50%)`
          }}
        />
      )}
      
      {/* Enhanced Border Effect */}
      {border && (
        <div className="absolute inset-0 rounded-2xl">
          <div className="absolute inset-0 rounded-2xl border border-yellow-400/20 
                          group-hover:border-yellow-400/40 transition-colors duration-500" />
          <div className="absolute inset-1 rounded-2xl border border-white/10 
                          group-hover:border-white/20 transition-colors duration-500" />
        </div>
      )}
      
      {/* Hover Shimmer Effect */}
      {hover && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                          -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      )}
      
      {/* Content Layer */}
      <div className="relative z-10" style={{ transform: 'translateZ(10px)' }}>
        {children}
      </div>
      
      {/* Optional Glow Effect */}
      {glow && (
        <div className="absolute inset-0 rounded-2xl bg-yellow-400/10 blur-xl 
                        scale-110 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
      )}
    </div>
  );
};

export default EnhancedClassicalCard;