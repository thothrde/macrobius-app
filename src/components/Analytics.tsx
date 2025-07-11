'use client';

import { useEffect } from 'react';
import Script from 'next/script';

// Better TypeScript definitions for analytics
interface GtagEvent {
  event_category?: string;
  event_label?: string;
  value?: number;
  app_name?: string;
  [key: string]: string | number | boolean | undefined;
}

interface PlausibleEventProps {
  [key: string]: string | number | boolean;
}

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: GtagEvent) => void;
    plausible: (eventName: string, options?: { props?: PlausibleEventProps }) => void;
    dataLayer: Record<string, unknown>[];
  }
}

// Google Analytics Configuration
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const ENABLE_ANALYTICS = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';

// Analytics Events with proper typing
export const trackEvent = (eventName: string, parameters?: Record<string, string | number | boolean>) => {
  if (!ENABLE_ANALYTICS) return;
  
  // Google Analytics
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', eventName, {
      ...parameters,
      app_name: 'Macrobius Frontend',
    });
  }
  
  // Plausible Analytics
  if (typeof window !== 'undefined' && window.plausible && PLAUSIBLE_DOMAIN) {
    window.plausible(eventName, {
      props: parameters,
    });
  }
};

// Page View Tracking
export const trackPageView = (url: string) => {
  if (!ENABLE_ANALYTICS) return;
  
  // Google Analytics
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_location: url,
      page_title: document.title,
    });
  }
  
  // Plausible automatically tracks page views
};

// Custom Events for Educational Platform
export const trackEducationalEvent = {
  quizStarted: (category: string) => trackEvent('quiz_started', { category }),
  quizCompleted: (category: string, score: number) => trackEvent('quiz_completed', { category, score }),
  vocabularyPracticed: (word: string, correct: boolean) => trackEvent('vocabulary_practiced', { word, correct }),
  visualizationViewed: (type: string) => trackEvent('3d_visualization_viewed', { type }),
  banquetPhaseCompleted: (phase: number) => trackEvent('banquet_phase_completed', { phase }),
  languageChanged: (language: string) => trackEvent('language_changed', { language }),
  sectionViewed: (section: string) => trackEvent('section_viewed', { section }),
};

// Main Analytics Component
const Analytics = () => {
  useEffect(() => {
    // Track initial page view
    if (typeof window !== 'undefined') {
      trackPageView(window.location.href);
    }
    
    // Track route changes for SPA navigation
    const handleRouteChange = (url: string) => {
      trackPageView(url);
    };
    
    // Listen for Next.js route changes
    if (typeof window !== 'undefined' && window.history) {
      const originalPushState = window.history.pushState;
      const originalReplaceState = window.history.replaceState;
      
      window.history.pushState = function(data: Record<string, unknown>, unused: string, url?: string | URL | null) {
        originalPushState.call(this, data, unused, url);
        handleRouteChange(window.location.href);
      };
      
      window.history.replaceState = function(data: Record<string, unknown>, unused: string, url?: string | URL | null) {
        originalReplaceState.call(this, data, unused, url);
        handleRouteChange(window.location.href);
      };
      
      window.addEventListener('popstate', () => {
        handleRouteChange(window.location.href);
      });
    }
  }, []);
  
  if (!ENABLE_ANALYTICS) return null;
  
  return null; // Analytics scripts would go here if enabled
};

export default Analytics;