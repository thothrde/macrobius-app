/**
 * 🌍 LANGUAGE CONTEXT - BULLETPROOF TRANSLATION SYSTEM
 * ✅ WORKING: Comprehensive translation support
 * ✅ STABLE: Zero dependency failures
 * ✅ COMPLETE: DE/EN/LA language support
 * 🔧 FIXED: TypeScript export type issue resolved
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'DE' | 'EN' | 'LA';

// 📚 COMPREHENSIVE TRANSLATION DATABASE
const translations = {
  DE: {
    // Navigation
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
    'nav.ai_modules': 'KI-Module',
    'nav.ai_rag': 'KI-RAG-Assistent',
    'nav.oracle_status': '1.401 Kulturelle Texte',
    
    // Hero Section
    'hero.title': 'Macrobius',
    'hero.subtitle': 'Eine antike Flaschenpost',
    'hero.description': 'Eine Nachricht aus der Antike an die Zukunft',
    'hero.badge': 'HYBRID TIER-COMPLETE - Advanced Components + Working Features',
    'hero.explore_works': 'Erkunden Sie die Werke des Macrobius',
    'hero.learn_more': 'Mehr über Macrobius',
    'hero.cultural_treasures': 'Kulturelle Schätze entdecken',
    
    // Cultural Story
    'cultural_story': 'Vor 1500 Jahren, als das römische Reich dem Untergang entgegensah, fertigte Macrobius eine Flaschenpost an die Zukunft an. Diese "Flaschenpost" waren seine beiden großen Werke: die "Saturnalia" und der "Kommentar zu Scipios Traum". In ihnen bewahrte er das Beste der antiken Kultur - von Ciceros Rhetorik bis zu den Geheimnissen der Astronomie. Seine Mission: das kulturelle Erbe für kommende Generationen zu retten.',
    
    // Images
    'image.rome.title': 'Das untergehende Römische Reich',
    'image.rome.subtitle': 'Kultureller Niedergang und die Mission der Gelehrten',
    'image.macrobius.title': 'Macrobius Ambrosius Theodosius',
    'image.macrobius.subtitle': 'Kultureller Bewahrer der spätantiken Welt',
    'image.tycho.title': 'Johannes Isaac Pontanus & Tycho Brahe',
    'image.tycho.subtitle': 'Astronomische Renaissance und die Wiederentdeckung',
    
    // About Modal
    'about.title': 'Macrobius Ambrosius Theodosius',
    'about.subtitle': 'Kultureller Bewahrer der spätantiken Welt (ca. 385-430 n. Chr.)',
    'about.biography.title': '🏛️ Biographie & Kontext',
    'about.biography.text': 'Macrobius Ambrosius Theodosius war eine der faszinierendsten Gestalten der späten Antike - ein Mann, der an der Schwelle zwischen zwei Welten stand. Als hoher Verwaltungsbeamter des untergehenden Weströmischen Reiches und gleichzeitig als leidenschaftlicher Gelehrter verkörperte er die dramatische Spannung seiner Zeit: den Versuch, die klassische Kultur vor dem Untergang zu bewahren.',
    'about.works.title': '📚 Die zwei Hauptwerke',
    'about.works.text': 'Macrobius\' zwei Hauptwerke "Saturnalia" und "Commentarii in Somnium Scipionis" sind Meisterwerke spätantiker Gelehrsamkeit. Die "Saturnalia" präsentieren sich als lebendige Tischgespräche während der römischen Winterfeste, in denen die gebildete Elite Roms über Literatur, Philosophie, Religion und Naturwissenschaften diskutiert.',
    'about.close': 'Schließen'
  },
  EN: {
    // Navigation
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
    'nav.ai_modules': 'AI Modules',
    'nav.ai_rag': 'AI-RAG Assistant',
    'nav.oracle_status': '1,401 Cultural Texts',
    
    // Hero Section
    'hero.title': 'Macrobius',
    'hero.subtitle': 'An Ancient Message in a Bottle',
    'hero.description': 'A Message from Antiquity to the Future',
    'hero.badge': 'HYBRID TIER-COMPLETE - Advanced Components + Working Features',
    'hero.explore_works': 'Explore the Works of Macrobius',
    'hero.learn_more': 'Learn More About Macrobius',
    'hero.cultural_treasures': 'Discover Cultural Treasures',
    
    // Cultural Story
    'cultural_story': '1500 years ago, as the Roman Empire faced its decline, Macrobius created a message in a bottle for the future. This "message in a bottle" consisted of his two great works: the "Saturnalia" and the "Commentary on Scipio\'s Dream". In them, he preserved the best of ancient culture - from Cicero\'s rhetoric to the secrets of astronomy. His mission: to save the cultural heritage for future generations.',
    
    // Images
    'image.rome.title': 'The Declining Roman Empire',
    'image.rome.subtitle': 'Cultural Decline and the Mission of Scholars',
    'image.macrobius.title': 'Macrobius Ambrosius Theodosius',
    'image.macrobius.subtitle': 'Cultural Preserver of the Late Ancient World',
    'image.tycho.title': 'Johannes Isaac Pontanus & Tycho Brahe',
    'image.tycho.subtitle': 'Astronomical Renaissance and Rediscovery',
    
    // About Modal
    'about.title': 'Macrobius Ambrosius Theodosius',
    'about.subtitle': 'Cultural Preserver of the Late Ancient World (ca. 385-430 AD)',
    'about.biography.title': '🏛️ Biography & Context',
    'about.biography.text': 'Macrobius Ambrosius Theodosius was one of the most fascinating figures of late antiquity - a man who stood at the threshold between two worlds. As a high administrative official of the declining Western Roman Empire and simultaneously as a passionate scholar, he embodied the dramatic tension of his time: the attempt to preserve classical culture from extinction.',
    'about.works.title': '📚 The Two Main Works',
    'about.works.text': 'Macrobius\' two main works "Saturnalia" and "Commentarii in Somnium Scipionis" are masterpieces of late ancient scholarship. The "Saturnalia" present themselves as lively table conversations during the Roman winter festivals, in which the educated elite of Rome discuss literature, philosophy, religion, and natural sciences.',
    'about.close': 'Close'
  },
  LA: {
    // Navigation
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
    'nav.ai_modules': 'AI Moduli',
    'nav.ai_rag': 'AI-RAG Auxilium',
    'nav.oracle_status': '1.401 Textus Culturales',
    
    // Hero Section
    'hero.title': 'Macrobius',
    'hero.subtitle': 'Antica Epistula in Lagena',
    'hero.description': 'Nuntius ab Antiquitate ad Futurum',
    'hero.badge': 'HYBRID TIER-COMPLETE - Componentes Provecti + Functiones Operantes',
    'hero.explore_works': 'Opera Macrobii Explora',
    'hero.learn_more': 'Plura de Macrobio Disce',
    'hero.cultural_treasures': 'Thesauros Culturales Inveni',
    
    // Cultural Story
    'cultural_story': 'Ante annos MD, cum Imperium Romanum ad occasum vergeret, Macrobius epistulam in lagena ad futurum confecit. Haec "epistula in lagena" duo eius magna opera erant: "Saturnalia" et "Commentarius in Somnium Scipionis". In his optimum culturae antiquae servavit - a rhetorica Ciceronis ad astronomiae arcana. Missio eius: patrimonium culturale pro generationibus futuris servare.',
    
    // Images
    'image.rome.title': 'Imperium Romanum Cadens',
    'image.rome.subtitle': 'Declinatio Culturalis et Missio Doctorum',
    'image.macrobius.title': 'Macrobius Ambrosius Theodosius',
    'image.macrobius.subtitle': 'Conservator Culturae Mundi Tardae Antiquitatis',
    'image.tycho.title': 'Johannes Isaac Pontanus et Tycho Brahe',
    'image.tycho.subtitle': 'Renascentia Astronomica et Reinventio',
    
    // About Modal
    'about.title': 'Macrobius Ambrosius Theodosius',
    'about.subtitle': 'Conservator Culturae Mundi Tardae Antiquitatis (ca. 385-430 p.C.)',
    'about.biography.title': '🏛️ Vita et Contextus',
    'about.biography.text': 'Macrobius Ambrosius Theodosius erat una ex figuris fascinnantissimis antiquitatis tardae - vir qui in limine inter duos mundos stabat. Ut magistratus altus Imperii Romani Occidentalis cadentis et simul ut studiosus passionatus, dramaticam tensionem sui temporis corporavit: conatum culturae classicae ab interitu conservandae.',
    'about.works.title': '📚 Duo Opera Praecipua',
    'about.works.text': 'Duo opera praecipua Macrobii "Saturnalia" et "Commentarii in Somnium Scipionis" sunt magisteria eruditionis antiquitatis tardae. "Saturnalia" se praebent ut vivida conloquia mensae durante festis hibernis Romanis, in quibus elite erudita Romae de litteris, philosophia, religione et scientiis naturalibus disputat.',
    'about.close': 'Claude'
  }
} as const;

// Language Context Interface
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isHydrated: boolean;
}

// Create Context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider Component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setCurrentLanguage] = useState<Language>('DE');
  const [isHydrated, setIsHydrated] = useState(false);

  // Translation function
  const t = (key: string): string => {
    try {
      const translation = translations[language][key as keyof typeof translations[typeof language]];
      return translation || key;
    } catch (error) {
      console.warn('Translation error for key:', key, 'language:', language);
      return key;
    }
  };

  // Language setter
  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('macrobius-language', lang);
      } catch (error) {
        console.warn('Could not save language preference:', error);
      }
    }
  };

  // Load saved language on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('macrobius-language') as Language;
        if (saved && ['DE', 'EN', 'LA'].includes(saved)) {
          setCurrentLanguage(saved);
        }
      } catch (error) {
        console.warn('Could not load language preference:', error);
      }
      setIsHydrated(true);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isHydrated }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use the context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Standalone translation function for non-hook contexts
export const getTranslation = (key: string, lang: Language): string => {
  try {
    const translation = translations[lang][key as keyof typeof translations[typeof lang]];
    return translation || key;
  } catch (error) {
    console.warn('Translation error for key:', key, 'language:', lang);
    return key;
  }
};