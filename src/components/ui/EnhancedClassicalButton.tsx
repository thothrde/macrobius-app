'use client';

import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface EnhancedClassicalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'cosmic' | 'oracle';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  glow?: boolean;
  pulse?: boolean;
  className?: string;
}

const EnhancedClassicalButton: React.FC<EnhancedClassicalButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  glow = false,
  pulse = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 rounded-xl font-semibold
    transition-all duration-500 transform-gpu will-change-transform
    focus-visible-enhanced relative overflow-hidden
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:transform-none disabled:shadow-none
  `;
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]',
    xl: 'px-10 py-5 text-xl min-h-[60px]'
  };
  
  const variantStyles = {
    primary: `
      cosmic-button-enhanced bg-gradient-to-r from-yellow-400/20 to-amber-500/20
      border-2 border-yellow-400/40 text-yellow-100
      hover:from-yellow-400/30 hover:to-amber-500/30 hover:border-yellow-400/60
      hover:text-white hover:shadow-lg hover:shadow-yellow-400/25
      active:scale-95
    `,
    secondary: `
      glass-cosmic-enhanced border-2 border-blue-400/40 text-blue-100
      hover:border-blue-400/60 hover:bg-blue-400/10
      hover:shadow-lg hover:shadow-blue-400/25
      active:scale-95
    `,
    tertiary: `
      glass-enhanced border-2 border-white/20 text-white/80
      hover:border-white/40 hover:bg-white/10 hover:text-white
      hover:shadow-lg hover:shadow-white/15
      active:scale-95
    `,
    cosmic: `
      cosmic-button-enhanced bg-gradient-to-r from-purple-500/20 to-blue-600/20
      border-2 border-purple-400/40 text-purple-100
      hover:from-purple-500/30 hover:to-blue-600/30 hover:border-purple-400/60
      hover:text-white hover:shadow-lg hover:shadow-purple-400/25
      active:scale-95
    `,
    oracle: `
      cosmic-button-enhanced bg-gradient-to-r from-emerald-500/20 to-teal-600/20
      border-2 border-emerald-400/40 text-emerald-100
      hover:from-emerald-500/30 hover:to-teal-600/30 hover:border-emerald-400/60
      hover:text-white hover:shadow-lg hover:shadow-emerald-400/25
      active:scale-95
    `
  };
  
  const glowStyles = glow ? 'animate-cosmic-pulse-enhanced' : '';
  const pulseStyles = pulse ? 'animate-cosmic-glow-enhanced' : '';
  
  const LoadingSpinner = () => (
    <div className="relative">
      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      <div className="absolute inset-0 w-4 h-4 border border-current/30 rounded-full animate-cosmic-pulse-enhanced" />
    </div>
  );
  
  const ButtonContent = () => (
    <>
      {icon && iconPosition === 'left' && !loading && (
        <span className="transition-transform duration-300 group-hover:scale-110">
          {icon}
        </span>
      )}
      {loading && <LoadingSpinner />}
      <span className="relative z-10 transition-all duration-300">
        {children}
      </span>
      {icon && iconPosition === 'right' && !loading && (
        <span className="transition-transform duration-300 group-hover:scale-110">
          {icon}
        </span>
      )}
    </>
  );
  
  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        glowStyles,
        pulseStyles,
        'group',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
                      -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      
      {/* Cosmic Border Enhancement */}
      <div className="absolute inset-0 rounded-xl border border-current/20 
                      group-hover:border-current/40 transition-colors duration-300" />
      
      {/* Content */}
      <ButtonContent />
      
      {/* Optional Glow Effect */}
      {glow && (
        <div className="absolute inset-0 rounded-xl bg-current/10 blur-xl 
                        scale-110 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
      )}
    </button>
  );
};

export default EnhancedClassicalButton;