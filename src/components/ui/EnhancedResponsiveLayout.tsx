'use client';

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import EnhancedClassicalButton from './EnhancedClassicalButton';
import EnhancedClassicalCard from './EnhancedClassicalCard';

// Enhanced Breakpoint Hook
function useEnhancedBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>('lg');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  
  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width < 480) {
        setBreakpoint('xs');
        setIsMobile(true);
        setIsTablet(false);
        setIsDesktop(false);
      } else if (width < 640) {
        setBreakpoint('sm');
        setIsMobile(true);
        setIsTablet(false);
        setIsDesktop(false);
      } else if (width < 768) {
        setBreakpoint('md');
        setIsMobile(false);
        setIsTablet(true);
        setIsDesktop(false);
      } else if (width < 1024) {
        setBreakpoint('lg');
        setIsMobile(false);
        setIsTablet(true);
        setIsDesktop(false);
      } else if (width < 1280) {
        setBreakpoint('xl');
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true);
      } else {
        setBreakpoint('2xl');
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true);
      }
    };
    
    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);
  
  return { breakpoint, isMobile, isTablet, isDesktop };
}

// Enhanced Mobile Navigation Drawer
interface EnhancedMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: 'left' | 'right';
  overlay?: boolean;
  swipeToClose?: boolean;
}

const EnhancedMobileDrawer: React.FC<EnhancedMobileDrawerProps> = ({
  isOpen,
  onClose,
  children,
  position = 'left',
  overlay = true,
  swipeToClose = true
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const startXRef = useRef(0);
  
  // Enhanced Touch Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!swipeToClose) return;
    
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !swipeToClose) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - startXRef.current;
    
    // Only allow dragging in closing direction
    if ((position === 'left' && diff < 0) || (position === 'right' && diff > 0)) {
      setDragOffset(Math.abs(diff));
    }
  };
  
  const handleTouchEnd = () => {
    if (!isDragging || !swipeToClose) return;
    
    setIsDragging(false);
    
    // Close if dragged more than 100px
    if (dragOffset > 100) {
      onClose();
    }
    
    setDragOffset(0);
  };
  
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Enhanced Overlay */}
      {overlay && (
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in-enhanced"
          onClick={onClose}
        />
      )}
      
      {/* Enhanced Drawer */}
      <div
        ref={drawerRef}
        className={cn(
          "absolute top-0 bottom-0 w-80 max-w-[85vw] glass-cosmic-enhanced",
          "border-r border-yellow-400/30 shadow-2xl transform transition-transform duration-500",
          {
            "left-0": position === 'left',
            "right-0 border-r-0 border-l border-yellow-400/30": position === 'right',
            "animate-slide-in-enhanced": !isDragging
          }
        )}
        style={{
          transform: isDragging 
            ? `translateX(${position === 'left' ? -dragOffset : dragOffset}px)`
            : undefined
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Enhanced Header */}
        <div className="flex items-center justify-between p-4 border-b border-yellow-400/30">
          <h2 className="text-lg font-bold text-cosmic-enhanced">Navigation</h2>
          <EnhancedClassicalButton
            variant="tertiary"
            size="sm"
            onClick={onClose}
            icon={<X className="w-4 h-4" />}
          />
        </div>
        
        {/* Enhanced Content */}
        <div className="flex-1 overflow-y-auto scrollbar-cosmic-enhanced p-4">
          {children}
        </div>
        
        {/* Enhanced Swipe Indicator */}
        {swipeToClose && (
          <div className={cn(
            "absolute top-1/2 w-1 h-12 bg-yellow-400/30 rounded-full transform -translate-y-1/2",
            {
              "-right-2": position === 'left',
              "-left-2": position === 'right'
            }
          )} />
        )}
      </div>
    </div>
  );
};

// Enhanced Responsive Grid
interface EnhancedResponsiveGridProps {
  children: ReactNode;
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  gap?: number;
  className?: string;
}

const EnhancedResponsiveGrid: React.FC<EnhancedResponsiveGridProps> = ({
  children,
  cols = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5, '2xl': 6 },
  gap = 6,
  className
}) => {
  const { breakpoint } = useEnhancedBreakpoint();
  const currentCols = cols[breakpoint] || cols.lg || 4;
  
  return (
    <div 
      className={cn(
        "grid w-full",
        `gap-${gap}`,
        className
      )}
      style={{
        gridTemplateColumns: `repeat(${currentCols}, minmax(0, 1fr))`
      }}
    >
      {children}
    </div>
  );
};

// Enhanced Responsive Container
interface EnhancedResponsiveContainerProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
  className?: string;
}

const EnhancedResponsiveContainer: React.FC<EnhancedResponsiveContainerProps> = ({
  children,
  size = 'xl',
  padding = true,
  className
}) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-4xl',
    '2xl': 'max-w-6xl',
    full: 'max-w-full'
  };
  
  return (
    <div className={cn(
      "w-full mx-auto",
      sizeClasses[size],
      {
        "px-4 sm:px-6 lg:px-8": padding
      },
      className
    )}>
      {children}
    </div>
  );
};

// Enhanced Mobile Carousel
interface EnhancedMobileCarouselProps {
  children: ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  swipeable?: boolean;
  className?: string;
}

const EnhancedMobileCarousel: React.FC<EnhancedMobileCarouselProps> = ({
  children,
  autoPlay = false,
  interval = 5000,
  showDots = true,
  showArrows = true,
  swipeable = true,
  className
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  const totalSlides = children.length;
  
  // Enhanced Auto-play
  useEffect(() => {
    if (autoPlay && totalSlides > 1) {
      autoPlayRef.current = setInterval(() => {
        goToNext();
      }, interval);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, interval, currentIndex]);
  
  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };
  
  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % totalSlides;
    goToSlide(nextIndex);
  };
  
  const goToPrev = () => {
    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(prevIndex);
  };
  
  // Enhanced Touch Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!swipeable) return;
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!swipeable) return;
    touchEndX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = () => {
    if (!swipeable) return;
    
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };
  
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {/* Enhanced Carousel Container */}
      <div
        ref={carouselRef}
        className="flex transition-transform duration-500 ease-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0"
          >
            {child}
          </div>
        ))}
      </div>
      
      {/* Enhanced Navigation Arrows */}
      {showArrows && totalSlides > 1 && (
        <>
          <EnhancedClassicalButton
            variant="cosmic"
            size="md"
            onClick={goToPrev}
            disabled={isTransitioning}
            icon={<ChevronLeft className="w-5 h-5" />}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
            glow
          />
          
          <EnhancedClassicalButton
            variant="cosmic"
            size="md"
            onClick={goToNext}
            disabled={isTransitioning}
            icon={<ChevronRight className="w-5 h-5" />}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
            glow
          />
        </>
      )}
      
      {/* Enhanced Dot Indicators */}
      {showDots && totalSlides > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300 transform",
                {
                  "bg-yellow-400 scale-125 shadow-lg shadow-yellow-400/50": index === currentIndex,
                  "bg-white/30 hover:bg-white/50 hover:scale-110": index !== currentIndex
                }
              )}
            />
          ))}
        </div>
      )}
      
      {/* Enhanced Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
        <div 
          className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-500"
          style={{
            width: `${((currentIndex + 1) / totalSlides) * 100}%`
          }}
        />
      </div>
    </div>
  );
};

// Enhanced Mobile Tabs
interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  badge?: string;
}

interface EnhancedMobileTabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  variant?: 'default' | 'cosmic' | 'scrollable';
  className?: string;
}

const EnhancedMobileTabs: React.FC<EnhancedMobileTabsProps> = ({
  tabs,
  defaultTab,
  onTabChange,
  variant = 'default',
  className
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const { isMobile } = useEnhancedBreakpoint();
  const tabsRef = useRef<HTMLDivElement>(null);
  
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };
  
  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;
  
  return (
    <div className={cn("w-full", className)}>
      {/* Enhanced Tab Navigation */}
      <div 
        ref={tabsRef}
        className={cn(
          "border-b border-yellow-400/30",
          {
            "overflow-x-auto scrollbar-cosmic-enhanced": variant === 'scrollable' || isMobile,
            "flex": variant !== 'scrollable' && !isMobile
          }
        )}
      >
        <div className={cn(
          "flex",
          {
            "min-w-max": variant === 'scrollable' || isMobile,
            "w-full": variant !== 'scrollable' && !isMobile
          }
        )}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "relative flex items-center gap-2 px-4 py-3 font-medium transition-all duration-300",
                "hover:bg-yellow-400/10 focus-visible-enhanced",
                {
                  "text-yellow-400 border-b-2 border-yellow-400": activeTab === tab.id,
                  "text-white/70 hover:text-white": activeTab !== tab.id,
                  "flex-1 justify-center": variant !== 'scrollable' && !isMobile,
                  "whitespace-nowrap": variant === 'scrollable' || isMobile
                }
              )}
            >
              {/* Enhanced Icon */}
              {tab.icon && (
                <div className={cn(
                  "transition-all duration-300",
                  {
                    "text-yellow-400 animate-shimmer-enhanced": activeTab === tab.id,
                    "group-hover:scale-110": activeTab !== tab.id
                  }
                )}>
                  {tab.icon}
                </div>
              )}
              
              {/* Enhanced Label */}
              <span className={cn(
                "transition-all duration-300",
                {
                  "macrobius-text-shadow-enhanced": activeTab === tab.id
                }
              )}>
                {tab.label}
              </span>
              
              {/* Enhanced Badge */}
              {tab.badge && (
                <div className="px-2 py-1 text-xs font-bold bg-yellow-400/20 text-yellow-200 
                                rounded-full border border-yellow-400/30 animate-shimmer-enhanced">
                  {tab.badge}
                </div>
              )}
              
              {/* Active Indicator */}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r 
                                from-yellow-400 to-amber-500 animate-cosmic-pulse-enhanced" />
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Enhanced Tab Content */}
      <div className="py-6">
        <div className="animate-fade-in-enhanced">
          {activeTabContent}
        </div>
      </div>
    </div>
  );
};

export {
  useEnhancedBreakpoint,
  EnhancedMobileDrawer,
  EnhancedResponsiveGrid,
  EnhancedResponsiveContainer,
  EnhancedMobileCarousel,
  EnhancedMobileTabs
};

export default {
  useBreakpoint: useEnhancedBreakpoint,
  MobileDrawer: EnhancedMobileDrawer,
  ResponsiveGrid: EnhancedResponsiveGrid,
  ResponsiveContainer: EnhancedResponsiveContainer,
  MobileCarousel: EnhancedMobileCarousel,
  MobileTabs: EnhancedMobileTabs
};