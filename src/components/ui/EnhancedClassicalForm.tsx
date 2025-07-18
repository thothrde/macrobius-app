'use client';

import React, { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, Search, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

// Enhanced Input Component
interface EnhancedClassicalInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: 'default' | 'cosmic' | 'oracle' | 'search';
  glow?: boolean;
}

const EnhancedClassicalInput = forwardRef<HTMLInputElement, EnhancedClassicalInputProps>((
  {
    label,
    error,
    success,
    icon,
    iconPosition = 'left',
    variant = 'default',
    glow = false,
    className,
    type,
    ...props
  },
  ref
) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  const variantStyles = {
    default: `
      glass-cosmic-enhanced border-2 border-white/20 text-white
      focus:border-yellow-400/60 focus:shadow-lg focus:shadow-yellow-400/20
    `,
    cosmic: `
      cosmic-card-enhanced border-2 border-yellow-400/40 text-yellow-100
      focus:border-yellow-400/80 focus:shadow-lg focus:shadow-yellow-400/30
    `,
    oracle: `
      glass-cosmic-enhanced border-2 border-emerald-400/40 text-emerald-100
      focus:border-emerald-400/80 focus:shadow-lg focus:shadow-emerald-400/30
    `,
    search: `
      glass-cosmic-enhanced border-2 border-blue-400/40 text-blue-100
      focus:border-blue-400/80 focus:shadow-lg focus:shadow-blue-400/30
    `
  };
  
  const getStatusColor = () => {
    if (error) return 'border-red-400/60 focus:border-red-400/80';
    if (success) return 'border-green-400/60 focus:border-green-400/80';
    return '';
  };
  
  return (
    <div className="space-y-2">
      {/* Enhanced Label */}
      {label && (
        <label className="block text-sm font-semibold text-white/80 mb-2">
          <span className="relative">
            {label}
            {props.required && (
              <span className="ml-1 text-red-400 animate-shimmer-enhanced">*</span>
            )}
            {isFocused && (
              <span className="absolute -inset-1 bg-yellow-400/20 rounded blur-sm" />
            )}
          </span>
        </label>
      )}
      
      {/* Enhanced Input Container */}
      <div className="relative group">
        {/* Left Icon */}
        {icon && iconPosition === 'left' && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 
                          group-focus-within:text-yellow-400 transition-colors duration-300 z-10">
            {icon}
          </div>
        )}
        
        {/* Enhanced Input */}
        <input
          ref={ref}
          type={inputType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full px-4 py-3 rounded-xl transition-all duration-500",
            "placeholder:text-white/40 focus:outline-none",
            "backdrop-blur-xl transform-gpu will-change-transform",
            variantStyles[variant],
            getStatusColor(),
            {
              "pl-12": icon && iconPosition === 'left',
              "pr-12": (icon && iconPosition === 'right') || type === 'password',
              "animate-cosmic-pulse-enhanced": glow && isFocused
            },
            className
          )}
          {...props}
        />
        
        {/* Right Icon */}
        {icon && iconPosition === 'right' && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 
                          group-focus-within:text-yellow-400 transition-colors duration-300">
            {icon}
          </div>
        )}
        
        {/* Password Toggle */}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 
                       hover:text-yellow-400 transition-colors duration-300 focus:outline-none"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
        
        {/* Focus Ring */}
        {isFocused && (
          <div className="absolute inset-0 rounded-xl border-2 border-yellow-400/50 
                          animate-cosmic-pulse-enhanced pointer-events-none" />
        )}
        
        {/* Enhanced Hover Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent 
                        via-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 
                        transition-opacity duration-500 pointer-events-none" />
      </div>
      
      {/* Status Messages */}
      {(error || success) && (
        <div className={cn(
          "flex items-center gap-2 text-sm animate-fade-in-enhanced",
          {
            "text-red-400": error,
            "text-green-400": success
          }
        )}>
          {error && <AlertCircle className="w-4 h-4 animate-shimmer-enhanced" />}
          {success && <CheckCircle className="w-4 h-4 animate-shimmer-enhanced" />}
          <span>{error || success}</span>
        </div>
      )}
    </div>
  );
});

EnhancedClassicalInput.displayName = 'EnhancedClassicalInput';

// Enhanced Textarea Component
interface EnhancedClassicalTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: string;
  variant?: 'default' | 'cosmic' | 'oracle';
  glow?: boolean;
  autoResize?: boolean;
}

const EnhancedClassicalTextarea = forwardRef<HTMLTextAreaElement, EnhancedClassicalTextareaProps>((
  {
    label,
    error,
    success,
    variant = 'default',
    glow = false,
    autoResize = false,
    className,
    ...props
  },
  ref
) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const variantStyles = {
    default: `
      glass-cosmic-enhanced border-2 border-white/20 text-white
      focus:border-yellow-400/60 focus:shadow-lg focus:shadow-yellow-400/20
    `,
    cosmic: `
      cosmic-card-enhanced border-2 border-yellow-400/40 text-yellow-100
      focus:border-yellow-400/80 focus:shadow-lg focus:shadow-yellow-400/30
    `,
    oracle: `
      glass-cosmic-enhanced border-2 border-emerald-400/40 text-emerald-100
      focus:border-emerald-400/80 focus:shadow-lg focus:shadow-emerald-400/30
    `
  };
  
  const getStatusColor = () => {
    if (error) return 'border-red-400/60 focus:border-red-400/80';
    if (success) return 'border-green-400/60 focus:border-green-400/80';
    return '';
  };
  
  return (
    <div className="space-y-2">
      {/* Enhanced Label */}
      {label && (
        <label className="block text-sm font-semibold text-white/80 mb-2">
          <span className="relative">
            {label}
            {props.required && (
              <span className="ml-1 text-red-400 animate-shimmer-enhanced">*</span>
            )}
            {isFocused && (
              <span className="absolute -inset-1 bg-yellow-400/20 rounded blur-sm" />
            )}
          </span>
        </label>
      )}
      
      {/* Enhanced Textarea Container */}
      <div className="relative group">
        <textarea
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full px-4 py-3 rounded-xl transition-all duration-500",
            "placeholder:text-white/40 focus:outline-none resize-y",
            "backdrop-blur-xl transform-gpu will-change-transform",
            "min-h-[100px]",
            variantStyles[variant],
            getStatusColor(),
            {
              "animate-cosmic-pulse-enhanced": glow && isFocused,
              "resize-none": autoResize
            },
            className
          )}
          {...props}
        />
        
        {/* Focus Ring */}
        {isFocused && (
          <div className="absolute inset-0 rounded-xl border-2 border-yellow-400/50 
                          animate-cosmic-pulse-enhanced pointer-events-none" />
        )}
        
        {/* Enhanced Hover Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent 
                        via-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 
                        transition-opacity duration-500 pointer-events-none" />
      </div>
      
      {/* Status Messages */}
      {(error || success) && (
        <div className={cn(
          "flex items-center gap-2 text-sm animate-fade-in-enhanced",
          {
            "text-red-400": error,
            "text-green-400": success
          }
        )}>
          {error && <AlertCircle className="w-4 h-4 animate-shimmer-enhanced" />}
          {success && <CheckCircle className="w-4 h-4 animate-shimmer-enhanced" />}
          <span>{error || success}</span>
        </div>
      )}
    </div>
  );
});

EnhancedClassicalTextarea.displayName = 'EnhancedClassicalTextarea';

// Enhanced Select Component
interface EnhancedClassicalSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  success?: string;
  variant?: 'default' | 'cosmic' | 'oracle';
  glow?: boolean;
  options: { value: string; label: string }[];
}

const EnhancedClassicalSelect = forwardRef<HTMLSelectElement, EnhancedClassicalSelectProps>((
  {
    label,
    error,
    success,
    variant = 'default',
    glow = false,
    options,
    className,
    ...props
  },
  ref
) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const variantStyles = {
    default: `
      glass-cosmic-enhanced border-2 border-white/20 text-white
      focus:border-yellow-400/60 focus:shadow-lg focus:shadow-yellow-400/20
    `,
    cosmic: `
      cosmic-card-enhanced border-2 border-yellow-400/40 text-yellow-100
      focus:border-yellow-400/80 focus:shadow-lg focus:shadow-yellow-400/30
    `,
    oracle: `
      glass-cosmic-enhanced border-2 border-emerald-400/40 text-emerald-100
      focus:border-emerald-400/80 focus:shadow-lg focus:shadow-emerald-400/30
    `
  };
  
  const getStatusColor = () => {
    if (error) return 'border-red-400/60 focus:border-red-400/80';
    if (success) return 'border-green-400/60 focus:border-green-400/80';
    return '';
  };
  
  return (
    <div className="space-y-2">
      {/* Enhanced Label */}
      {label && (
        <label className="block text-sm font-semibold text-white/80 mb-2">
          <span className="relative">
            {label}
            {props.required && (
              <span className="ml-1 text-red-400 animate-shimmer-enhanced">*</span>
            )}
            {isFocused && (
              <span className="absolute -inset-1 bg-yellow-400/20 rounded blur-sm" />
            )}
          </span>
        </label>
      )}
      
      {/* Enhanced Select Container */}
      <div className="relative group">
        <select
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full px-4 py-3 rounded-xl transition-all duration-500",
            "focus:outline-none backdrop-blur-xl transform-gpu will-change-transform",
            "appearance-none cursor-pointer",
            variantStyles[variant],
            getStatusColor(),
            {
              "animate-cosmic-pulse-enhanced": glow && isFocused
            },
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-gray-900 text-white">
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Custom Dropdown Arrow */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg
            className="w-5 h-5 text-white/60 group-focus-within:text-yellow-400 transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {/* Focus Ring */}
        {isFocused && (
          <div className="absolute inset-0 rounded-xl border-2 border-yellow-400/50 
                          animate-cosmic-pulse-enhanced pointer-events-none" />
        )}
        
        {/* Enhanced Hover Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent 
                        via-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 
                        transition-opacity duration-500 pointer-events-none" />
      </div>
      
      {/* Status Messages */}
      {(error || success) && (
        <div className={cn(
          "flex items-center gap-2 text-sm animate-fade-in-enhanced",
          {
            "text-red-400": error,
            "text-green-400": success
          }
        )}>
          {error && <AlertCircle className="w-4 h-4 animate-shimmer-enhanced" />}
          {success && <CheckCircle className="w-4 h-4 animate-shimmer-enhanced" />}
          <span>{error || success}</span>
        </div>
      )}
    </div>
  );
});

EnhancedClassicalSelect.displayName = 'EnhancedClassicalSelect';

// Enhanced Search Input Component
interface EnhancedClassicalSearchProps extends Omit<EnhancedClassicalInputProps, 'icon' | 'type'> {
  onSearch?: (value: string) => void;
  loading?: boolean;
}

const EnhancedClassicalSearch: React.FC<EnhancedClassicalSearchProps> = ({
  onSearch,
  loading = false,
  ...props
}) => {
  const [searchValue, setSearchValue] = useState('');
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(searchValue);
    }
  };
  
  return (
    <EnhancedClassicalInput
      {...props}
      type="search"
      icon={loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <Search className="w-5 h-5" />
      )}
      iconPosition="left"
      variant="search"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={props.placeholder || "Suchen..."}
    />
  );
};

export {
  EnhancedClassicalInput,
  EnhancedClassicalTextarea,
  EnhancedClassicalSelect,
  EnhancedClassicalSearch
};

export default {
  Input: EnhancedClassicalInput,
  Textarea: EnhancedClassicalTextarea,
  Select: EnhancedClassicalSelect,
  Search: EnhancedClassicalSearch
};