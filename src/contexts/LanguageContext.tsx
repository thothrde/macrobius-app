import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'DE' | 'EN' | 'LA';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isHydrated: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 🔧 COMPLETE TRANSLATION OBJECT - SSG COMPATIBLE
const translations = {
  DE: {
    // Navigation translations
    'nav.home': 'Home',
    'nav.intro': 'Einführung',
    'nav.quiz': 'Quiz',
    'nav.worldmap': 'Weltkarte',
    'nav.cosmos': 'Kosmos',
    'nav.banquet': 'Gastmahl',
    'nav.textsearch': 'Textsuche',
    'nav.learning': 'Lernen',
    'nav.visualizations': 'Visualisierungen',
    'nav.ai_systems': 'KI-SYSTEME',
    'nav.ai_cultural': 'KI-Kulturanalyse',
    'nav.ai_learning': 'Lernpfade',
    'nav.ai_tutoring': 'KI-Tutor',
    'nav.ai_modules': 'Kulturmodule',
    'nav.oracle_status': '1.401 Kulturelle Texte',
    
    // Hero section translations
    'hero.badge': 'Kulturschätze der Antike',
    'hero.title.line1': 'Macrobius',
    'hero.title.line2': 'Digital',
    'hero.description': 'Entdecken Sie die Kulturschätze der Antike',
    
    // UI elements
    'loading': 'Wird geladen...',
    'error': 'Ein Fehler ist aufgetreten',
    'back': 'Zurück',
    'next': 'Weiter',
    'submit': 'Senden',
    'close': 'Schließen',
  },
  EN: {
    // Navigation translations
    'nav.home': 'Home',
    'nav.intro': 'Introduction',
    'nav.quiz': 'Quiz',
    'nav.worldmap': 'World Map',
    'nav.cosmos': 'Cosmos',
    'nav.banquet': 'Banquet',
    'nav.textsearch': 'Text Search',
    'nav.learning': 'Learning',
    'nav.visualizations': 'Visualizations',
    'nav.ai_systems': 'AI SYSTEMS',
    'nav.ai_cultural': 'AI Cultural Analysis',
    'nav.ai_learning': 'Learning Paths',
    'nav.ai_tutoring': 'AI Tutor',
    'nav.ai_modules': 'Cultural Modules',
    'nav.oracle_status': '1,401 Cultural Texts',
    
    // Hero section translations
    'hero.badge': 'Cultural Treasures of Antiquity',
    'hero.title.line1': 'Macrobius',
    'hero.title.line2': 'Digital',
    'hero.description': 'Discover the Cultural Treasures of Antiquity',
    
    // UI elements
    'loading': 'Loading...',
    'error': 'An error occurred',
    'back': 'Back',
    'next': 'Next',
    'submit': 'Submit',
    'close': 'Close',
  },
  LA: {
    // Navigation translations
    'nav.home': 'Domus',
    'nav.intro': 'Introductio',
    'nav.quiz': 'Quaestiones',
    'nav.worldmap': 'Mappa Mundi',
    'nav.cosmos': 'Cosmos',
    'nav.banquet': 'Convivium',
    'nav.textsearch': 'Quaestio Textuum',
    'nav.learning': 'Discere',
    'nav.visualizations': 'Visualizationes',
    'nav.ai_systems': 'SYSTEMATA AI',
    'nav.ai_cultural': 'AI Analysis Culturalis',
    'nav.ai_learning': 'Semitae Discendi',
    'nav.ai_tutoring': 'AI Praeceptor',
    'nav.ai_modules': 'Moduli Culturales',
    'nav.oracle_status': '1.401 Textus Culturales',
    
    // Hero section translations
    'hero.badge': 'Thesauri Culturales Antiquitatis',
    'hero.title.line1': 'Macrobius',
    'hero.title.line2': 'Digitalis',
    'hero.description': 'Thesauros Culturales Antiquitatis Invenite',
    
    // UI elements
    'loading': 'Oneratur...',
    'error': 'Error accidit',
    'back': 'Redire',
    'next': 'Sequens',
    'submit': 'Mittere',
    'close': 'Claudere',
  }
} as const;

// 🔧 SSG-COMPATIBLE TRANSLATION FUNCTION - Works during build and runtime
function getTranslation(key: string, language: Language = 'DE'): string {
  try {
    // Handle nested keys (like 'nav.intro')
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Translation not found - try German as fallback, then English
        if (language !== 'DE') {
          return getTranslation(key, 'DE');
        } else if (language !== 'EN') {
          return getTranslation(key, 'EN');
        }
        // Don't log warnings during build to avoid console spam
        if (typeof window !== 'undefined') {
          console.warn(`Translation missing: ${key} (${language})`);
        }
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  } catch (error) {
    if (typeof window !== 'undefined') {
      console.error('Translation error:', error);
    }
    return key;
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('DE');
  const [isHydrated, setIsHydrated] = useState(false);

  // Load language from localStorage on mount - HYDRATION SAFE
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('macrobius-language') as Language;
      if (savedLanguage && ['DE', 'EN', 'LA'].includes(savedLanguage)) {
        setLanguage(savedLanguage);
      }
    } catch (error) {
      console.warn('Error loading language preference:', error);
    }
    setIsHydrated(true);
  }, []);

  // Save language to localStorage when changed
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem('macrobius-language', language);
      } catch (error) {
        console.warn('Error saving language preference:', error);
      }
    }
  }, [language, isHydrated]);

  // Translation function - SSG compatible with hydration safety
  const t = (key: string): string => {
    return getTranslation(key, language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isHydrated }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  
  // During SSG, context might not be available, so provide fallback
  if (context === undefined) {
    // Return a fallback context for SSG
    return {
      language: 'DE' as Language,
      setLanguage: () => {},
      t: (key: string) => getTranslation(key, 'DE'),
      isHydrated: false
    };
  }
  
  return context;
}

// Export the standalone translation function for direct use
export { getTranslation };