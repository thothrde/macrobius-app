'use client';

import React, { memo, useMemo, useCallback, useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

// Enhanced Lazy Loading Component
interface EnhancedLazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  once?: boolean;
}

const EnhancedLazyComponent: React.FC<EnhancedLazyComponentProps> = memo(({
  children,
  fallback = <div className="w-full h-64 glass-cosmic-enhanced rounded-2xl cosmic-loading-enhanced" />,
  threshold = 0.1,
  rootMargin = '50px',
  className,
  once = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasLoaded(true);
          
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);
  
  return (
    <div ref={elementRef} className={cn("transition-all duration-500", className)}>
      {(isVisible || hasLoaded) ? (
        <div className="animate-fade-in-enhanced">
          {children}
        </div>
      ) : (
        fallback
      )}
    </div>
  );
});

EnhancedLazyComponent.displayName = 'EnhancedLazyComponent';

// Enhanced Virtual Scrolling for Large Lists
interface VirtualScrollItem {
  id: string | number;
  height?: number;
  data: any;
}

interface EnhancedVirtualScrollProps {
  items: VirtualScrollItem[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: VirtualScrollItem, index: number) => React.ReactNode;
  overscan?: number;
  className?: string;
}

const EnhancedVirtualScroll: React.FC<EnhancedVirtualScrollProps> = memo(({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5,
  className
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollElementRef = useRef<HTMLDivElement>(null);
  
  const visibleRange = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );
    
    return { startIndex, endIndex };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);
  
  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex + 1);
  }, [items, visibleRange]);
  
  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.startIndex * itemHeight;
  
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);
  
  return (
    <div
      ref={scrollElementRef}
      className={cn(
        "overflow-auto scrollbar-cosmic-enhanced",
        className
      )}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={item.id}
              style={{
                height: item.height || itemHeight,
                overflow: 'hidden'
              }}
            >
              {renderItem(item, visibleRange.startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

EnhancedVirtualScroll.displayName = 'EnhancedVirtualScroll';

// Enhanced Image Optimization Component
interface EnhancedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  className?: string;
  fallback?: React.ReactNode;
}

const EnhancedImage: React.FC<EnhancedImageProps> = memo(({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  className,
  fallback,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => observer.disconnect();
  }, [priority]);
  
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);
  
  const handleError = useCallback(() => {
    setHasError(true);
  }, []);
  
  const imageSrc = useMemo(() => {
    if (!isInView) return '';
    return src;
  }, [src, isInView]);
  
  if (hasError && fallback) {
    return <>{fallback}</>;
  }
  
  return (
    <div ref={imgRef} className={cn("relative overflow-hidden", className)}>
      {/* Blur Placeholder */}
      {placeholder === 'blur' && blurDataURL && !isLoaded && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
          aria-hidden="true"
        />
      )}
      
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 glass-cosmic-enhanced cosmic-loading-enhanced" />
      )}
      
      {/* Main Image */}
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-500",
          {
            "opacity-0": !isLoaded,
            "opacity-100": isLoaded
          }
        )}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...props}
      />
      
      {/* Error Fallback */}
      {hasError && !fallback && (
        <div className="absolute inset-0 flex items-center justify-center glass-cosmic-enhanced">
          <div className="text-white/60 text-center p-4">
            <div className="w-12 h-12 mx-auto mb-2 opacity-50">
              📷
            </div>
            <p className="text-sm">Bild konnte nicht geladen werden</p>
          </div>
        </div>
      )}
    </div>
  );
});

EnhancedImage.displayName = 'EnhancedImage';

// Enhanced Debounced Input
interface EnhancedDebouncedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onDebouncedChange: (value: string) => void;
  debounceMs?: number;
  immediate?: boolean;
}

const EnhancedDebouncedInput: React.FC<EnhancedDebouncedInputProps> = memo(({
  onDebouncedChange,
  debounceMs = 300,
  immediate = false,
  ...props
}) => {
  const [value, setValue] = useState(props.value || '');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const debouncedCallback = useCallback(
    (newValue: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        onDebouncedChange(newValue);
      }, debounceMs);
    },
    [onDebouncedChange, debounceMs]
  );
  
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      
      if (immediate && newValue === '') {
        onDebouncedChange(newValue);
      } else {
        debouncedCallback(newValue);
      }
    },
    [debouncedCallback, immediate, onDebouncedChange]
  );
  
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  return (
    <input
      {...props}
      value={value}
      onChange={handleChange}
    />
  );
});

EnhancedDebouncedInput.displayName = 'EnhancedDebouncedInput';

// Enhanced Memoized Component Wrapper
interface EnhancedMemoWrapperProps {
  children: React.ReactNode;
  dependencies?: any[];
  deep?: boolean;
}

const EnhancedMemoWrapper: React.FC<EnhancedMemoWrapperProps> = memo(
  ({ children }) => {
    return <>{children}</>;
  },
  (prevProps, nextProps) => {
    // Custom comparison logic for deep equality if needed
    if (prevProps.dependencies && nextProps.dependencies) {
      return JSON.stringify(prevProps.dependencies) === JSON.stringify(nextProps.dependencies);
    }
    
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
  }
);

EnhancedMemoWrapper.displayName = 'EnhancedMemoWrapper';

// Enhanced Performance Monitor
interface PerformanceMetrics {
  renderTime: number;
  componentCount: number;
  memoryUsage?: number;
  timestamp: number;
}

interface EnhancedPerformanceMonitorProps {
  onMetrics?: (metrics: PerformanceMetrics) => void;
  enabled?: boolean;
  interval?: number;
}

const EnhancedPerformanceMonitor: React.FC<EnhancedPerformanceMonitorProps> = ({
  onMetrics,
  enabled = false,
  interval = 5000
}) => {
  const renderStartTime = useRef(performance.now());
  const componentCountRef = useRef(0);
  
  useEffect(() => {
    if (!enabled || !onMetrics) return;
    
    const measurePerformance = () => {
      const renderTime = performance.now() - renderStartTime.current;
      
      const metrics: PerformanceMetrics = {
        renderTime,
        componentCount: componentCountRef.current,
        timestamp: Date.now()
      };
      
      // Add memory usage if available
      if ('memory' in performance) {
        metrics.memoryUsage = (performance as any).memory.usedJSHeapSize;
      }
      
      onMetrics(metrics);
    };
    
    const intervalId = setInterval(measurePerformance, interval);
    
    return () => clearInterval(intervalId);
  }, [enabled, onMetrics, interval]);
  
  useEffect(() => {
    renderStartTime.current = performance.now();
    componentCountRef.current += 1;
  });
  
  return null;
};

// Enhanced Resource Preloader
interface EnhancedResourcePreloaderProps {
  resources: Array<{
    type: 'image' | 'font' | 'script' | 'style';
    url: string;
    priority?: 'high' | 'low';
  }>;
  onProgress?: (loaded: number, total: number) => void;
  onComplete?: () => void;
}

const EnhancedResourcePreloader: React.FC<EnhancedResourcePreloaderProps> = ({
  resources,
  onProgress,
  onComplete
}) => {
  const [loadedCount, setLoadedCount] = useState(0);
  
  useEffect(() => {
    let mounted = true;
    
    const preloadResource = (resource: { type: string; url: string; priority?: string }) => {
      return new Promise<void>((resolve, reject) => {
        switch (resource.type) {
          case 'image': {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => reject(new Error(`Failed to load image: ${resource.url}`));
            img.src = resource.url;
            break;
          }
          case 'font': {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'font';
            link.href = resource.url;
            link.crossOrigin = 'anonymous';
            link.onload = () => resolve();
            link.onerror = () => reject(new Error(`Failed to load font: ${resource.url}`));
            document.head.appendChild(link);
            break;
          }
          case 'script': {
            const script = document.createElement('script');
            script.src = resource.url;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load script: ${resource.url}`));
            document.head.appendChild(script);
            break;
          }
          case 'style': {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = resource.url;
            link.onload = () => resolve();
            link.onerror = () => reject(new Error(`Failed to load style: ${resource.url}`));
            document.head.appendChild(link);
            break;
          }
          default:
            resolve();
        }
      });
    };
    
    const loadResources = async () => {
      const promises = resources.map(async (resource, index) => {
        try {
          await preloadResource(resource);
          if (mounted) {
            setLoadedCount(prev => {
              const newCount = prev + 1;
              onProgress?.(newCount, resources.length);
              return newCount;
            });
          }
        } catch (error) {
          console.warn('Failed to preload resource:', error);
          if (mounted) {
            setLoadedCount(prev => {
              const newCount = prev + 1;
              onProgress?.(newCount, resources.length);
              return newCount;
            });
          }
        }
      });
      
      await Promise.allSettled(promises);
      
      if (mounted) {
        onComplete?.();
      }
    };
    
    loadResources();
    
    return () => {
      mounted = false;
    };
  }, [resources, onProgress, onComplete]);
  
  return null;
};

export {
  EnhancedLazyComponent,
  EnhancedVirtualScroll,
  EnhancedImage,
  EnhancedDebouncedInput,
  EnhancedMemoWrapper,
  EnhancedPerformanceMonitor,
  EnhancedResourcePreloader
};

export default {
  LazyComponent: EnhancedLazyComponent,
  VirtualScroll: EnhancedVirtualScroll,
  Image: EnhancedImage,
  DebouncedInput: EnhancedDebouncedInput,
  MemoWrapper: EnhancedMemoWrapper,
  PerformanceMonitor: EnhancedPerformanceMonitor,
  ResourcePreloader: EnhancedResourcePreloader
};