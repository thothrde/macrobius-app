'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2, Star, Sparkles, Globe, BookOpen } from 'lucide-react';

interface EnhancedLoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'cosmic' | 'oracle' | 'astrolabe';
  className?: string;
}

const EnhancedLoadingSpinner: React.FC<EnhancedLoadingSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  className
}) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };
  
  if (variant === 'astrolabe') {
    return (
      <div className={cn("relative", className)}>
        {/* Outer Ring */}
        <div className={cn(
          "border-2 border-yellow-400/30 rounded-full animate-astrolabe-enhanced",
          sizeMap[size]
        )}>
          {/* Inner Ring */}
          <div className="absolute inset-2 border border-yellow-400/50 rounded-full animate-spin">
            {/* Center Star */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Star className="w-2 h-2 text-yellow-400 animate-shimmer-enhanced" />
            </div>
          </div>
        </div>
        
        {/* Cosmic Glow */}
        <div className={cn(
          "absolute inset-0 bg-yellow-400/20 rounded-full blur-sm animate-cosmic-pulse-enhanced",
          sizeMap[size]
        )} />
      </div>
    );
  }
  
  if (variant === 'cosmic') {
    return (
      <div className={cn("relative", className)}>
        <div className={cn(
          "relative border-2 border-purple-400/30 rounded-full animate-spin",
          sizeMap[size]
        )}>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-1 h-1 bg-purple-400 rounded-full animate-cosmic-pulse-enhanced" />
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-cosmic-pulse-enhanced" />
          </div>
          <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-1 h-1 bg-yellow-400 rounded-full animate-cosmic-pulse-enhanced" />
          </div>
          <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
            <div className="w-1 h-1 bg-green-400 rounded-full animate-cosmic-pulse-enhanced" />
          </div>
        </div>
      </div>
    );
  }
  
  if (variant === 'oracle') {
    return (
      <div className={cn("relative", className)}>
        <div className={cn(
          "border-2 border-emerald-400/50 border-t-transparent rounded-full animate-spin",
          sizeMap[size]
        )} />
        <div className={cn(
          "absolute inset-1 border border-emerald-400/30 border-t-transparent rounded-full animate-spin",
          "animation-delay-150"
        )} />
        <div className={cn(
          "absolute inset-0 bg-emerald-400/10 rounded-full blur-sm animate-cosmic-pulse-enhanced"
        )} />
      </div>
    );
  }
  
  // Default variant
  return (
    <div className={cn("relative", className)}>
      <Loader2 className={cn(
        "animate-spin text-yellow-400",
        sizeMap[size]
      )} />
      <div className={cn(
        "absolute inset-0 bg-yellow-400/20 rounded-full blur-sm animate-cosmic-pulse-enhanced",
        sizeMap[size]
      )} />
    </div>
  );
};

interface EnhancedLoadingSkeletonProps {
  variant?: 'text' | 'card' | 'image' | 'button' | 'custom';
  width?: string;
  height?: string;
  className?: string;
  animate?: boolean;
}

const EnhancedLoadingSkeleton: React.FC<EnhancedLoadingSkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className,
  animate = true
}) => {
  const baseClasses = cn(
    "glass-cosmic-enhanced rounded-xl",
    {
      "cosmic-loading-enhanced": animate
    },
    className
  );
  
  const variants = {
    text: "h-4 w-full max-w-sm",
    card: "h-48 w-full",
    image: "h-32 w-32 rounded-2xl",
    button: "h-10 w-24 rounded-xl",
    custom: ""
  };
  
  return (
    <div 
      className={cn(baseClasses, variants[variant])}
      style={{ width, height }}
    />
  );
};

interface EnhancedLoadingPageProps {
  title?: string;
  subtitle?: string;
  variant?: 'cosmic' | 'oracle' | 'minimal';
  showProgress?: boolean;
  progress?: number;
}

const EnhancedLoadingPage: React.FC<EnhancedLoadingPageProps> = ({
  title = "Lade Macrobius...",
  subtitle = "Bereite die antike Weisheit vor...",
  variant = 'cosmic',
  showProgress = false,
  progress = 0
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Stars */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-dramatic-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            <div className="w-1 h-1 bg-white rounded-full opacity-60" />
          </div>
        ))}
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-nebula-enhanced"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`
            }}
          >
            <div className="w-2 h-2 bg-yellow-400/20 rounded-full blur-sm" />
          </div>
        ))}
      </div>
      
      {/* Loading Content */}
      <div className="relative z-10 text-center space-y-8 max-w-md mx-auto px-6">
        {/* Enhanced Loading Spinner */}
        <div className="flex justify-center">
          {variant === 'cosmic' && (
            <EnhancedLoadingSpinner variant="astrolabe" size="xl" />
          )}
          {variant === 'oracle' && (
            <EnhancedLoadingSpinner variant="oracle" size="xl" />
          )}
          {variant === 'minimal' && (
            <EnhancedLoadingSpinner variant="default" size="xl" />
          )}
        </div>
        
        {/* Enhanced Title */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-cosmic-enhanced animate-cosmic-glow-enhanced">
            {title}
          </h1>
          <p className="text-lg text-white/70 animate-fade-in-enhanced">
            {subtitle}
          </p>
        </div>
        
        {/* Enhanced Progress Bar */}
        {showProgress && (
          <div className="space-y-3">
            <div className="w-full h-2 glass-cosmic-enhanced rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full 
                           transition-all duration-500 ease-out animate-cosmic-pulse-enhanced"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-white/60">
              {Math.round(progress)}% abgeschlossen
            </p>
          </div>
        )}
        
        {/* Enhanced Loading Steps */}
        <div className="space-y-2 text-sm text-white/50">
          <div className="flex items-center justify-center gap-2 animate-fade-in-enhanced">
            <Sparkles className="w-4 h-4 animate-shimmer-enhanced" />
            <span>Initialisiere Kosmos...</span>
          </div>
          <div className="flex items-center justify-center gap-2 animate-fade-in-enhanced" style={{ animationDelay: '0.5s' }}>
            <Globe className="w-4 h-4 animate-shimmer-enhanced" />
            <span>Lade antike Weltkarte...</span>
          </div>
          <div className="flex items-center justify-center gap-2 animate-fade-in-enhanced" style={{ animationDelay: '1s' }}>
            <BookOpen className="w-4 h-4 animate-shimmer-enhanced" />
            <span>Bereite Saturnalia vor...</span>
          </div>
        </div>
      </div>
      
      {/* Enhanced Bottom Decoration */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-3 opacity-50">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-yellow-400 rounded-full animate-cosmic-pulse-enhanced"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface EnhancedLoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  variant?: 'default' | 'cosmic' | 'oracle';
  blur?: boolean;
}

const EnhancedLoadingOverlay: React.FC<EnhancedLoadingOverlayProps> = ({
  isVisible,
  message = "Lade...",
  variant = 'default',
  blur = true
}) => {
  if (!isVisible) return null;
  
  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center",
      "bg-black/50 animate-fade-in-enhanced",
      {
        "backdrop-blur-xl": blur
      }
    )}>
      <div className="glass-cosmic-enhanced rounded-2xl p-8 text-center space-y-4 max-w-sm mx-4">
        <EnhancedLoadingSpinner variant={variant} size="lg" />
        <p className="text-white/80 font-medium">{message}</p>
      </div>
    </div>
  );
};

interface EnhancedLoadingCardProps {
  title?: string;
  lines?: number;
  showImage?: boolean;
  showButton?: boolean;
  className?: string;
}

const EnhancedLoadingCard: React.FC<EnhancedLoadingCardProps> = ({
  title,
  lines = 3,
  showImage = false,
  showButton = false,
  className
}) => {
  return (
    <div className={cn("cosmic-card-enhanced p-6 space-y-4", className)}>
      {/* Image Skeleton */}
      {showImage && (
        <EnhancedLoadingSkeleton variant="image" className="mx-auto" />
      )}
      
      {/* Title Skeleton */}
      {title && (
        <EnhancedLoadingSkeleton variant="text" height="24px" width="60%" />
      )}
      
      {/* Content Lines */}
      <div className="space-y-2">
        {[...Array(lines)].map((_, i) => (
          <EnhancedLoadingSkeleton
            key={i}
            variant="text"
            width={`${60 + Math.random() * 30}%`}
          />
        ))}
      </div>
      
      {/* Button Skeleton */}
      {showButton && (
        <div className="pt-2">
          <EnhancedLoadingSkeleton variant="button" />
        </div>
      )}
    </div>
  );
};

interface EnhancedProgressIndicatorProps {
  value: number;
  max?: number;
  variant?: 'line' | 'circle' | 'cosmic';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
  label?: string;
}

const EnhancedProgressIndicator: React.FC<EnhancedProgressIndicatorProps> = ({
  value,
  max = 100,
  variant = 'line',
  size = 'md',
  showValue = true,
  className,
  label
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizeMap = {
    sm: { height: 'h-1', circle: 'w-8 h-8', text: 'text-xs' },
    md: { height: 'h-2', circle: 'w-12 h-12', text: 'text-sm' },
    lg: { height: 'h-3', circle: 'w-16 h-16', text: 'text-base' }
  };
  
  if (variant === 'circle') {
    const circumference = 2 * Math.PI * 20; // radius = 20
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className={cn("relative", className)}>
        <div className={cn("relative", sizeMap[size].circle)}>
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 44 44">
            {/* Background Circle */}
            <circle
              cx="22"
              cy="22"
              r="20"
              stroke="rgba(251, 191, 36, 0.2)"
              strokeWidth="2"
              fill="none"
            />
            {/* Progress Circle */}
            <circle
              cx="22"
              cy="22"
              r="20"
              stroke="url(#cosmicGradient)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-500 ease-out"
            />
            <defs>
              <linearGradient id="cosmicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(251, 191, 36)" />
                <stop offset="100%" stopColor="rgb(245, 158, 11)" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center Value */}
          {showValue && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={cn("font-bold text-yellow-400", sizeMap[size].text)}>
                {Math.round(percentage)}%
              </span>
            </div>
          )}
        </div>
        
        {/* Label */}
        {label && (
          <p className={cn("text-center mt-2 text-white/70", sizeMap[size].text)}>
            {label}
          </p>
        )}
      </div>
    );
  }
  
  if (variant === 'cosmic') {
    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <div className="flex justify-between items-center">
            <span className={cn("text-white/80", sizeMap[size].text)}>{label}</span>
            {showValue && (
              <span className={cn("font-bold text-yellow-400", sizeMap[size].text)}>
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        
        <div className={cn(
          "w-full glass-cosmic-enhanced rounded-full overflow-hidden",
          sizeMap[size].height
        )}>
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 
                       rounded-full transition-all duration-700 ease-out animate-cosmic-pulse-enhanced"
            style={{ width: `${percentage}%` }}
          />
          
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                          -translate-x-full animate-cosmic-loading-enhanced" />
        </div>
      </div>
    );
  }
  
  // Line variant (default)
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex justify-between items-center">
          <span className={cn("text-white/80", sizeMap[size].text)}>{label}</span>
          {showValue && (
            <span className={cn("font-bold text-yellow-400", sizeMap[size].text)}>
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      
      <div className={cn(
        "w-full bg-white/10 rounded-full overflow-hidden",
        sizeMap[size].height
      )}>
        <div 
          className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 
                     rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export {
  EnhancedLoadingSpinner,
  EnhancedLoadingSkeleton,
  EnhancedLoadingPage,
  EnhancedLoadingOverlay,
  EnhancedLoadingCard,
  EnhancedProgressIndicator
};

export default {
  Spinner: EnhancedLoadingSpinner,
  Skeleton: EnhancedLoadingSkeleton,
  Page: EnhancedLoadingPage,
  Overlay: EnhancedLoadingOverlay,
  Card: EnhancedLoadingCard,
  Progress: EnhancedProgressIndicator
};