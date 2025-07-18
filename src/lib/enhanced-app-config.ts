// Enhanced Macrobius App Configuration

export const ENHANCED_APP_CONFIG = {
  // App Metadata
  app: {
    name: 'Macrobius',
    version: '2.0.0',
    description: {
      de: 'Eine antike Flaschenpost - Eine Nachricht aus der Antike an die Zukunft',
      en: 'An Ancient Message in a Bottle - A Message from Antiquity to the Future',
      la: 'Antiqua Epistula in Vitro - Nuntius ab Antiquitate ad Futurum'
    },
    author: 'Macrobius Team',
    homepage: 'https://macrobius-app.vercel.app'
  },
  
  // Enhanced Performance Settings
  performance: {
    lazyLoading: {
      enabled: true,
      threshold: 0.1,
      rootMargin: '50px'
    },
    virtualization: {
      enabled: true,
      itemHeight: 100,
      overscan: 5
    },
    caching: {
      enabled: true,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      maxSize: 100 // MB
    },
    debouncing: {
      search: 300,
      resize: 100,
      scroll: 16
    }
  },
  
  // Enhanced Responsive Breakpoints
  breakpoints: {
    xs: 480,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  },
  
  // Enhanced Animation Settings
  animations: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500,
      cosmic: 1000
    },
    easing: {
      linear: 'linear',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      cosmic: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },
    reducedMotion: {
      respectSystemPreference: true,
      fallbackDuration: 0
    }
  },
  
  // Enhanced Accessibility Settings
  accessibility: {
    skipLinks: {
      enabled: true,
      targets: ['main', 'navigation', 'footer']
    },
    focusManagement: {
      enabled: true,
      trapFocus: true,
      restoreFocus: true
    },
    screenReader: {
      enabled: true,
      announcements: true,
      livePoliteness: 'polite'
    },
    textToSpeech: {
      enabled: true,
      defaultLanguage: 'de-DE',
      rate: 1,
      pitch: 1,
      volume: 1
    },
    highContrast: {
      enabled: false,
      toggleable: true
    },
    fontSize: {
      min: 75,
      max: 150,
      default: 100,
      step: 5
    }
  },
  
  // Enhanced PWA Settings
  pwa: {
    enabled: true,
    installPrompt: {
      enabled: true,
      delay: 30000, // 30 seconds
      dismissible: true
    },
    offlineSupport: {
      enabled: true,
      showStatus: true,
      cachingStrategy: 'networkFirst'
    },
    backgroundSync: {
      enabled: true,
      syncInterval: 60000, // 1 minute
      retryLimit: 3
    },
    notifications: {
      enabled: false, // Disabled by default
      requestPermission: false
    }
  },
  
  // Enhanced Oracle Cloud Integration
  backend: {
    oracle: {
      baseUrl: 'http://152.70.184.232:8080',
      timeout: 30000,
      retryAttempts: 3,
      retryDelay: 1000,
      endpoints: {
        passages: '/api/passages',
        themes: '/api/themes',
        insights: '/api/insights',
        search: '/api/search',
        rag: '/api/rag',
        analytics: '/api/analytics'
      }
    },
    fallback: {
      enabled: true,
      showErrorMessages: true,
      offlineContent: true
    }
  },
  
  // Enhanced AI Features
  ai: {
    rag: {
      enabled: true,
      endpoint: '/api/rag',
      maxTokens: 2000,
      temperature: 0.7
    },
    tutoring: {
      enabled: true,
      sessionTimeout: 1800000, // 30 minutes
      maxMessages: 100
    },
    analysis: {
      enabled: true,
      cacheResults: true,
      maxAnalysisLength: 10000
    },
    translation: {
      enabled: true,
      supportedLanguages: ['de', 'en', 'la'],
      autoDetect: false
    }
  },
  
  // Enhanced UI/UX Settings
  ui: {
    theme: {
      default: 'cosmic',
      variants: ['cosmic', 'oracle', 'minimal'],
      customizable: true
    },
    navigation: {
      sticky: true,
      autoHide: false,
      showProgress: true
    },
    cards: {
      hover3D: true,
      constellationPattern: true,
      glowEffects: true
    },
    starfield: {
      density: {
        mobile: 100,
        tablet: 150,
        desktop: 200
      },
      shootingStars: true,
      constellations: true
    }
  },
  
  // Enhanced Content Settings
  content: {
    passages: {
      total: 1401,
      wordsPerPassage: 150,
      preloadAmount: 10
    },
    themes: {
      total: 9,
      categories: [
        'Religious Practices',
        'Social Customs',
        'Philosophy',
        'Education',
        'Roman History',
        'Literature',
        'Law',
        'Astronomy',
        'General'
      ]
    },
    insights: {
      total: 16,
      difficultyLevels: ['Beginner', 'Intermediate', 'Advanced']
    },
    languages: {
      primary: 'de',
      supported: ['de', 'en', 'la'],
      fallback: 'en'
    }
  },
  
  // Enhanced Analytics & Monitoring
  analytics: {
    enabled: process.env.NODE_ENV === 'production',
    trackUserInteractions: true,
    trackPerformance: true,
    trackErrors: true,
    anonymizeData: true,
    services: {
      // Configure with your preferred analytics service
      googleAnalytics: {
        enabled: false,
        trackingId: ''
      },
      plausible: {
        enabled: false,
        domain: ''
      }
    }
  },
  
  // Enhanced Security Settings
  security: {
    csp: {
      enabled: true,
      reportOnly: false
    },
    sanitization: {
      enabled: true,
      allowedTags: ['b', 'i', 'em', 'strong', 'span'],
      allowedAttributes: ['class', 'style']
    },
    rateLimit: {
      enabled: true,
      requests: 100,
      windowMs: 900000 // 15 minutes
    }
  },
  
  // Enhanced Feature Flags
  features: {
    experimentalUI: false,
    advancedAnalytics: true,
    betaFeatures: false,
    debugMode: process.env.NODE_ENV === 'development',
    telemetry: false
  }
};

// Enhanced Environment Configuration
export const getEnhancedConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  
  const envOverrides = {
    development: {
      backend: {
        oracle: {
          baseUrl: 'http://152.70.184.232:8080'
        }
      },
      features: {
        debugMode: true,
        telemetry: false
      },
      analytics: {
        enabled: false
      }
    },
    production: {
      performance: {
        caching: {
          maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        }
      },
      features: {
        debugMode: false,
        telemetry: true
      },
      analytics: {
        enabled: true
      }
    }
  };
  
  return {
    ...ENHANCED_APP_CONFIG,
    ...envOverrides[env as keyof typeof envOverrides]
  };
};

export type EnhancedAppConfig = typeof ENHANCED_APP_CONFIG;
export default ENHANCED_APP_CONFIG;