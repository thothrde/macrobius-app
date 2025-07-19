'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import EnhancedClassicalButton from './EnhancedClassicalButton';
import { 
  Home, 
  Globe, 
  Star, 
  Users, 
  Search, 
  GraduationCap, 
  BarChart3,
  Menu,
  X,
  ChevronDown,
  Sparkles
} from 'lucide-react';

interface NavigationItem {
  id: string;
  label: { de: string; en: string; la: string };
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  children?: NavigationItem[];
  active?: boolean;
  badge?: string;
}

interface EnhancedClassicalNavigationProps {
  items: NavigationItem[];
  currentSection?: string;
  onSectionChange?: (sectionId: string) => void;
  className?: string;
  variant?: 'horizontal' | 'vertical' | 'floating';
  compact?: boolean;
}

const EnhancedClassicalNavigation: React.FC<EnhancedClassicalNavigationProps> = ({
  items,
  currentSection,
  onSectionChange,
  className,
  variant = 'horizontal',
  compact = false
}) => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  
  // Enhanced scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleItemClick = (item: NavigationItem) => {
    if (item.children) {
      setActiveDropdown(activeDropdown === item.id ? null : item.id);
    } else {
      if (item.onClick) {
        item.onClick();
      }
      if (onSectionChange) {
        onSectionChange(item.id);
      }
      setIsOpen(false);
      setActiveDropdown(null);
    }
  };
  
  const NavigationItem: React.FC<{ item: NavigationItem; level?: number }> = ({ 
    item, 
    level = 0 
  }) => {
    const isActive = currentSection === item.id || item.active;
    const hasChildren = item.children && item.children.length > 0;
    const isDropdownOpen = activeDropdown === item.id;
    
    return (
      <div className={cn(
        "relative",
        level === 0 ? "" : "ml-4"
      )}>
        <button
          onClick={() => handleItemClick(item)}
          className={cn(
            "group relative flex items-center gap-3 px-4 py-3 rounded-xl",
            "transition-all duration-500 transform-gpu will-change-transform",
            "focus-visible-enhanced w-full text-left",
            {
              "glass-cosmic-enhanced border border-yellow-400/50 text-yellow-100": isActive,
              "glass-enhanced border border-white/20 text-white/80 hover:border-yellow-400/40 hover:text-yellow-100": !isActive,
              "hover:scale-[1.02] hover:-translate-y-0.5": !compact,
              "px-3 py-2 text-sm": compact
            }
          )}
        >
          {/* Enhanced Icon Container */}
          <div className={cn(
            "relative flex items-center justify-center transition-all duration-300",
            {
              "w-6 h-6": !compact,
              "w-5 h-5": compact
            }
          )}>
            <div className={cn(
              "transition-all duration-300 group-hover:scale-110",
              {
                "text-yellow-400 animate-shimmer-enhanced": isActive,
                "group-hover:text-yellow-300": !isActive
              }
            )}>
              {item.icon}
            </div>
            
            {/* Active Indicator Glow */}
            {isActive && (
              <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-sm animate-cosmic-pulse-enhanced" />
            )}
          </div>
          
          {/* Enhanced Label */}
          <span className={cn(
            "flex-1 font-semibold transition-all duration-300",
            {
              "text-base": !compact,
              "text-sm": compact,
              "macrobius-text-shadow-enhanced": isActive
            }
          )}>
            {item.label[language.toLowerCase() as keyof typeof item.label]}
          </span>
          
          {/* Badge */}
          {item.badge && (
            <div className="px-2 py-1 text-xs font-bold bg-yellow-400/20 text-yellow-200 
                            rounded-full border border-yellow-400/30 animate-shimmer-enhanced">
              {item.badge}
            </div>
          )}
          
          {/* Dropdown Arrow */}
          {hasChildren && (
            <ChevronDown className={cn(
              "w-4 h-4 transition-transform duration-300",
              { "rotate-180": isDropdownOpen }
            )} />
          )}
          
          {/* Hover Effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent 
                          via-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 
                          transition-opacity duration-500" />
          
          {/* Active Border Animation */}
          {isActive && (
            <div className="absolute inset-0 rounded-xl border-2 border-yellow-400/30 
                            animate-cosmic-pulse-enhanced" />
          )}
        </button>
        
        {/* Enhanced Dropdown Menu */}
        {hasChildren && isDropdownOpen && (
          <div className={cn(
            "absolute left-0 top-full mt-2 min-w-[200px] z-50",
            "glass-cosmic-enhanced border border-yellow-400/30 rounded-xl p-2",
            "animate-fade-in-enhanced shadow-2xl",
            {
              "right-0": variant === 'horizontal'
            }
          )}>
            {item.children?.map((child) => (
              <NavigationItem key={child.id} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };
  
  // Mobile Menu Toggle
  const MobileMenuToggle = () => (
    <EnhancedClassicalButton
      variant="cosmic"
      size="md"
      onClick={() => setIsOpen(!isOpen)}
      icon={isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      className="lg:hidden"
      glow
    >
      {isOpen ? t('close') : t('menu')}
    </EnhancedClassicalButton>
  );
  
  // Horizontal Navigation (Desktop)
  if (variant === 'horizontal') {
    return (
      <nav 
        ref={navRef}
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-500",
          {
            "glass-cosmic-enhanced border-b border-yellow-400/30 backdrop-blur-xl": scrolled,
            "bg-transparent": !scrolled
          },
          className
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo/Brand */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Sparkles className="w-8 h-8 text-yellow-400 animate-shimmer-enhanced" />
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-sm animate-cosmic-pulse-enhanced" />
              </div>
              <span className="text-xl lg:text-2xl font-bold text-cosmic-enhanced">
                Macrobius
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {items.map((item) => (
                <NavigationItem key={item.id} item={item} />
              ))}
            </div>
            
            {/* Mobile Menu Toggle */}
            <MobileMenuToggle />
          </div>
          
          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden py-4 border-t border-yellow-400/30">
              <div className="space-y-2 animate-fade-in-enhanced">
                {items.map((item) => (
                  <NavigationItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Enhanced Cosmic Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r 
                        from-transparent via-yellow-400/50 to-transparent" />
      </nav>
    );
  }
  
  // Vertical Navigation (Sidebar)
  if (variant === 'vertical') {
    return (
      <nav 
        ref={navRef}
        className={cn(
          "w-64 h-screen glass-cosmic-enhanced border-r border-yellow-400/30 p-4",
          "overflow-y-auto scrollbar-cosmic-enhanced",
          className
        )}
      >
        <div className="space-y-3">
          {items.map((item) => (
            <NavigationItem key={item.id} item={item} />
          ))}
        </div>
      </nav>
    );
  }
  
  // Floating Navigation
  if (variant === 'floating') {
    return (
      <nav 
        ref={navRef}
        className={cn(
          "fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50",
          "glass-cosmic-enhanced border border-yellow-400/30 rounded-2xl p-3",
          "animate-fade-in-enhanced shadow-2xl",
          className
        )}
      >
        <div className="flex items-center gap-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={cn(
                "relative p-3 rounded-xl transition-all duration-300",
                "focus-visible-enhanced group",
                {
                  "glass-cosmic-enhanced border border-yellow-400/50 text-yellow-100": currentSection === item.id,
                  "hover:glass-enhanced text-white/70 hover:text-white": currentSection !== item.id
                }
              )}
              title={item.label[language.toLowerCase() as keyof typeof item.label]}
            >
              <div className="relative">
                {item.icon}
                {currentSection === item.id && (
                  <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-sm animate-cosmic-pulse-enhanced" />
                )}
              </div>
              
              {item.badge && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 text-black 
                                text-xs font-bold rounded-full flex items-center justify-center 
                                animate-shimmer-enhanced">
                  {item.badge}
                </div>
              )}
            </button>
          ))}
        </div>
      </nav>
    );
  }
  
  return null;
};

export default EnhancedClassicalNavigation;