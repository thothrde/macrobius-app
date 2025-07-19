'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { Volume2, VolumeX, Eye, EyeOff, Type, Contrast, Pause, Play } from 'lucide-react';
import EnhancedClassicalButton from './EnhancedClassicalButton';
import EnhancedClassicalCard from './EnhancedClassicalCard';

// Enhanced Skip Link Component
interface EnhancedSkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const EnhancedSkipLink: React.FC<EnhancedSkipLinkProps> = ({
  href,
  children,
  className
}) => {
  return (
    <a
      href={href}
      className={cn(
        "fixed top-4 left-4 z-[9999] px-4 py-2 bg-yellow-400 text-black font-bold rounded-lg",
        "transform -translate-y-20 focus:translate-y-0 transition-transform duration-300",
        "focus:outline-none focus:ring-4 focus:ring-yellow-400/50",
        className
      )}
    >
      {children}
    </a>
  );
};

// Enhanced Screen Reader Support
interface EnhancedScreenReaderProps {
  children: React.ReactNode;
  announce?: boolean;
  priority?: 'polite' | 'assertive';
  className?: string;
}

const EnhancedScreenReader: React.FC<EnhancedScreenReaderProps> = ({
  children,
  announce = false,
  priority = 'polite',
  className
}) => {
  return (
    <div
      className={cn("sr-only", className)}
      aria-live={announce ? priority : undefined}
      aria-atomic={announce ? "true" : undefined}
    >
      {children}
    </div>
  );
};

// Enhanced Focus Management
interface EnhancedFocusTrapProps {
  children: React.ReactNode;
  active: boolean;
  restoreFocus?: boolean;
  className?: string;
}

const EnhancedFocusTrap: React.FC<EnhancedFocusTrapProps> = ({
  children,
  active,
  restoreFocus = true,
  className
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    if (!active) return;
    
    // Store the currently focused element
    previousActiveElement.current = document.activeElement as HTMLElement;
    
    const container = containerRef.current;
    if (!container) return;
    
    // Get all focusable elements
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    ) as NodeListOf<HTMLElement>;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Focus the first element
    if (firstElement) {
      firstElement.focus();
    }
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };
    
    document.addEventListener('keydown', handleTabKey);
    
    return () => {
      document.removeEventListener('keydown', handleTabKey);
      
      // Restore focus to the previously focused element
      if (restoreFocus && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [active, restoreFocus]);
  
  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

// Enhanced Text-to-Speech
interface EnhancedTextToSpeechProps {
  text: string;
  autoPlay?: boolean;
  language?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  className?: string;
}

const EnhancedTextToSpeech: React.FC<EnhancedTextToSpeechProps> = ({
  text,
  autoPlay = false,
  language = 'de-DE',
  rate = 1,
  pitch = 1,
  volume = 1,
  className
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  useEffect(() => {
    setIsSupported('speechSynthesis' in window);
  }, []);
  
  useEffect(() => {
    if (autoPlay && isSupported && text) {
      speak();
    }
  }, [text, autoPlay, isSupported]);
  
  const speak = useCallback(() => {
    if (!isSupported || !text) return;
    
    // Stop any current speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    
    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };
    
    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };
    
    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };
    
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [text, language, rate, pitch, volume, isSupported]);
  
  const pause = useCallback(() => {
    if (isSupported && isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isSupported, isPlaying]);
  
  const resume = useCallback(() => {
    if (isSupported && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isSupported, isPaused]);
  
  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  }, [isSupported]);
  
  if (!isSupported) {
    return null;
  }
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {!isPlaying ? (
        <EnhancedClassicalButton
          variant="tertiary"
          size="sm"
          onClick={speak}
          icon={<Volume2 className="w-4 h-4" />}
          aria-label="Text vorlesen"
        >
          {""}
        </EnhancedClassicalButton>
      ) : (
        <div className="flex items-center gap-1">
          {isPaused ? (
            <EnhancedClassicalButton
              variant="tertiary"
              size="sm"
              onClick={resume}
              icon={<Play className="w-4 h-4" />}
              aria-label="Wiedergabe fortsetzen"
            >
              {""}
            </EnhancedClassicalButton>
          ) : (
            <EnhancedClassicalButton
              variant="tertiary"
              size="sm"
              onClick={pause}
              icon={<Pause className="w-4 h-4" />}
              aria-label="Wiedergabe pausieren"
            >
              {""}
            </EnhancedClassicalButton>
          )}
          
          <EnhancedClassicalButton
            variant="tertiary"
            size="sm"
            onClick={stop}
            icon={<VolumeX className="w-4 h-4" />}
            aria-label="Wiedergabe stoppen"
          >
            {""}
          </EnhancedClassicalButton>
        </div>
      )}
    </div>
  );
};

// Enhanced Accessibility Settings Panel
interface AccessibilitySettings {
  fontSize: number;
  contrast: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  textToSpeech: boolean;
}

interface EnhancedAccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const EnhancedAccessibilityPanel: React.FC<EnhancedAccessibilityPanelProps> = ({
  isOpen,
  onClose,
  className
}) => {
  const { language, translations } = useLanguage();
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 100,
    contrast: false,
    reducedMotion: false,
    screenReader: false,
    textToSpeech: false
  });
  
  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('accessibility-settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (error) {
        console.warn('Failed to load accessibility settings:', error);
      }
    }
  }, []);
  
  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    applySettings(settings);
  }, [settings]);
  
  const applySettings = (settings: AccessibilitySettings) => {
    const root = document.documentElement;
    
    // Font size
    root.style.fontSize = `${settings.fontSize}%`;
    
    // High contrast
    if (settings.contrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
  };
  
  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };
  
  const resetSettings = () => {
    setSettings({
      fontSize: 100,
      contrast: false,
      reducedMotion: false,
      screenReader: false,
      textToSpeech: false
    });
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in-enhanced"
        onClick={onClose}
      />
      
      {/* Panel */}
      <EnhancedFocusTrap active={isOpen}>
        <EnhancedClassicalCard
          variant="cosmic"
          className={cn("relative w-full max-w-md max-h-[80vh] overflow-y-auto", className)}
          glow
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-cosmic-enhanced">
              {language === 'de' && 'Barrierefreiheit'}
              {language === 'en' && 'Accessibility'}
              {language === 'la' && 'Accessibilitas'}
            </h2>
            <EnhancedClassicalButton
              variant="tertiary"
              size="sm"
              onClick={onClose}
              icon={<Eye className="w-4 h-4" />}
              aria-label="Panel schließen"
            >
              {""}
            </EnhancedClassicalButton>
          </div>
          
          {/* Font Size */}
          <div className="space-y-4 mb-6">
            <label className="block text-sm font-semibold text-white/80">
              {language === 'de' && 'Schriftgröße'}
              {language === 'en' && 'Font Size'}
              {language === 'la' && 'Magnitudo Litterarum'}
              : {settings.fontSize}%
            </label>
            <input
              type="range"
              min="75"
              max="150"
              step="5"
              value={settings.fontSize}
              onChange={(e) => updateSetting('fontSize', parseInt(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer
                         focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <div className="flex justify-between text-xs text-white/60">
              <span>Klein</span>
              <span>Normal</span>
              <span>Groß</span>
            </div>
          </div>
          
          {/* Toggle Settings */}
          <div className="space-y-4 mb-6">
            {/* High Contrast */}
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium text-white/80">
                {language === 'de' && 'Hoher Kontrast'}
                {language === 'en' && 'High Contrast'}
                {language === 'la' && 'Contraster Magnus'}
              </span>
              <button
                type="button"
                onClick={() => updateSetting('contrast', !settings.contrast)}
                className={cn(
                  "relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400",
                  {
                    "bg-yellow-400": settings.contrast,
                    "bg-white/20": !settings.contrast
                  }
                )}
                aria-checked={settings.contrast}
                role="switch"
              >
                <div className={cn(
                  "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300",
                  {
                    "translate-x-7": settings.contrast,
                    "translate-x-1": !settings.contrast
                  }
                )} />
              </button>
            </label>
            
            {/* Reduced Motion */}
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium text-white/80">
                {language === 'de' && 'Bewegungen reduzieren'}
                {language === 'en' && 'Reduce Motion'}
                {language === 'la' && 'Motus Reducere'}
              </span>
              <button
                type="button"
                onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
                className={cn(
                  "relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400",
                  {
                    "bg-yellow-400": settings.reducedMotion,
                    "bg-white/20": !settings.reducedMotion
                  }
                )}
                aria-checked={settings.reducedMotion}
                role="switch"
              >
                <div className={cn(
                  "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300",
                  {
                    "translate-x-7": settings.reducedMotion,
                    "translate-x-1": !settings.reducedMotion
                  }
                )} />
              </button>
            </label>
            
            {/* Text-to-Speech */}
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium text-white/80">
                {language === 'de' && 'Text-zu-Sprache'}
                {language === 'en' && 'Text-to-Speech'}
                {language === 'la' && 'Textus ad Vocem'}
              </span>
              <button
                type="button"
                onClick={() => updateSetting('textToSpeech', !settings.textToSpeech)}
                className={cn(
                  "relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400",
                  {
                    "bg-yellow-400": settings.textToSpeech,
                    "bg-white/20": !settings.textToSpeech
                  }
                )}
                aria-checked={settings.textToSpeech}
                role="switch"
              >
                <div className={cn(
                  "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300",
                  {
                    "translate-x-7": settings.textToSpeech,
                    "translate-x-1": !settings.textToSpeech
                  }
                )} />
              </button>
            </label>
          </div>
          
          {/* Actions */}
          <div className="flex gap-3">
            <EnhancedClassicalButton
              variant="secondary"
              onClick={resetSettings}
              className="flex-1"
            >
              {language === 'de' && 'Zurücksetzen'}
              {language === 'en' && 'Reset'}
              {language === 'la' && 'Restaurare'}
            </EnhancedClassicalButton>
            
            <EnhancedClassicalButton
              variant="primary"
              onClick={onClose}
              className="flex-1"
            >
              {language === 'de' && 'Anwenden'}
              {language === 'en' && 'Apply'}
              {language === 'la' && 'Applicare'}
            </EnhancedClassicalButton>
          </div>
          
          {/* Screen Reader Announcement */}
          <EnhancedScreenReader announce>
            Barrierefreiheits-Einstellungen wurden aktualisiert.
          </EnhancedScreenReader>
        </EnhancedClassicalCard>
      </EnhancedFocusTrap>
    </div>
  );
};

export {
  EnhancedSkipLink,
  EnhancedScreenReader,
  EnhancedFocusTrap,
  EnhancedTextToSpeech,
  EnhancedAccessibilityPanel
};

export default {
  SkipLink: EnhancedSkipLink,
  ScreenReader: EnhancedScreenReader,
  FocusTrap: EnhancedFocusTrap,
  TextToSpeech: EnhancedTextToSpeech,
  AccessibilityPanel: EnhancedAccessibilityPanel
};