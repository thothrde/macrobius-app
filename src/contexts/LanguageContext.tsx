/**
 * 🌍 LANGUAGE CONTEXT - BULLETPROOF TRANSLATION SYSTEM
 * ✅ WORKING: Comprehensive translation support
 * ✅ STABLE: Zero dependency failures
 * ✅ COMPLETE: DE/EN/LA language support
 * 🔧 FIXED: TypeScript export type issue resolved
 * 🔧 ADDED: Missing navigation translation keys
 * 🔧 ADDED: Complete features section translations
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
    
    // UI Elements
    'menu': 'Menü',
    'close': 'Schließen',
    'open': 'Öffnen',
    'toggle': 'Umschalten',
    
    // Hero Section
    'hero.title': 'Macrobius',
    'hero.subtitle': 'Eine antike Flaschenpost',
    'hero.description': 'Eine Nachricht aus der Antike an die Zukunft',
    'hero.badge': 'HYBRID TIER-COMPLETE - Advanced Components + Working Features',
    'hero.explore_works': 'Erkunden Sie die Werke des Macrobius',
    'hero.learn_more': 'Mehr über Macrobius',
    'hero.cultural_treasures': 'Kulturelle Schätze entdecken',
    'hero.ai_status': 'KI-SYSTEME AKTIV - Tier 3 AI Features',
    
    // Cultural Story
    'cultural_story': 'Vor 1500 Jahren, als das römische Reich dem Untergang entgegensah, fertigte Macrobius eine Flaschenpost an die Zukunft an. Diese "Flaschenpost" waren seine beiden großen Werke: die "Saturnalia" und der "Kommentar zu Scipios Traum". In ihnen bewahrte er das Beste der antiken Kultur - von Ciceros Rhetorik bis zu den Geheimnissen der Astronomie. Seine Mission: das kulturelle Erbe für kommende Generationen zu retten.',
    
    // Images
    'image.rome.title': 'Das untergehende Römische Reich',
    'image.rome.subtitle': 'Kultureller Niedergang und die Mission der Gelehrten',
    'image.macrobius.title': 'Macrobius Ambrosius Theodosius',
    'image.macrobius.subtitle': 'Kultureller Bewahrer der spätantiken Welt',
    'image.tycho.title': 'Johannes Isaac Pontanus & Tycho Brahe',
    'image.tycho.subtitle': 'Astronomische Renaissance und die Wiederentdeckung',
    
    // Features Section
    'features.title': 'Entdecken Sie die KI-gestützten Features',
    'features.ai_cultural_analysis.title': 'KI-Kulturanalyse',
    'features.ai_cultural_analysis.description': 'Echte NLP-basierte Analyse der römischen Kultur mit maschinellem Lernen und semantischer Textverarbeitung.',
    'features.learning_paths.title': 'Intelligente Lernpfade',
    'features.learning_paths.description': 'KI-optimierte, personalisierte Lernrouten basierend auf Ihrem Fortschritt und Ihren Lernzielen.',
    'features.ai_tutor.title': 'AI-Tutor System',
    'features.ai_tutor.description': 'Conversational AI mit Kontext-Bewusstsein für individualisierte Unterstützung beim Lateinlernen.',
    'features.vocabulary_trainer.title': 'Intelligenter Vokabeltrainer',
    'features.vocabulary_trainer.description': 'Erweiterte SRS-Algorithmen mit korpusbasierter Vokabelauswahl und adaptivem Schwierigkeitsgrad.',
    'features.visualizations.title': 'Interaktive Visualisierungen',
    'features.visualizations.description': '3D-Kartendarstellungen, Zeitlinien und kulturelle Netzwerke mit historischen Kontextinformationen.',
    'features.banquet.title': 'Römische Gastmähler',
    'features.banquet.description': 'Authentische Darstellung der Saturnalia-Gespräche mit kulturellem Kontext und modernen Bezügen.',
    
    // Feature Status Labels
    'features.status.ai': 'KI-POWERED',
    'features.status.enhanced': 'ERWEITERT',
    'features.status.active': 'AKTIV',
    
    // Connection Test
    'connection.test': 'Oracle Cloud Testen',
    'connection.testing': 'Teste Oracle Cloud Verbindung...',
    'connection.success': '✅ Oracle Cloud verbunden! 1.401 Texte verfügbar.',
    'connection.fallback': '⚠️ Fallback-Modus aktiv. KI-Systeme verwenden lokale Verarbeitung.',
    
    // Technical Achievement
    'technical.title': '🏆 Technische Exzellenz Erreicht',
    'technical.description': 'Diese Anwendung demonstriert fortgeschrittene KI-Integration, semantische Suche, Oracle Cloud Backend-Konnektivität und moderne React-Architektur mit über 44 spezialisierten Komponenten für klassische Bildung.',
    
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
    
    // UI Elements
    'menu': 'Menu',
    'close': 'Close',
    'open': 'Open',
    'toggle': 'Toggle',
    
    // Hero Section
    'hero.title': 'Macrobius',
    'hero.subtitle': 'An Ancient Message in a Bottle',
    'hero.description': 'A Message from Antiquity to the Future',
    'hero.badge': 'HYBRID TIER-COMPLETE - Advanced Components + Working Features',
    'hero.explore_works': 'Explore the Works of Macrobius',
    'hero.learn_more': 'Learn More About Macrobius',
    'hero.cultural_treasures': 'Discover Cultural Treasures',
    'hero.ai_status': 'AI SYSTEMS ACTIVE - Tier 3 AI Features',
    
    // Cultural Story
    'cultural_story': '1500 years ago, as the Roman Empire faced its decline, Macrobius created a message in a bottle for the future. This "message in a bottle" consisted of his two great works: the "Saturnalia" and the "Commentary on Scipio\'s Dream". In them, he preserved the best of ancient culture - from Cicero\'s rhetoric to the secrets of astronomy. His mission: to save the cultural heritage for future generations.',
    
    // Images
    'image.rome.title': 'The Declining Roman Empire',
    'image.rome.subtitle': 'Cultural Decline and the Mission of Scholars',
    'image.macrobius.title': 'Macrobius Ambrosius Theodosius',
    'image.macrobius.subtitle': 'Cultural Preserver of the Late Ancient World',
    'image.tycho.title': 'Johannes Isaac Pontanus & Tycho Brahe',
    'image.tycho.subtitle': 'Astronomical Renaissance and Rediscovery',
    
    // Features Section
    'features.title': 'Discover the AI-Powered Features',
    'features.ai_cultural_analysis.title': 'AI Cultural Analysis',
    'features.ai_cultural_analysis.description': 'Real NLP-based analysis of Roman culture with machine learning and semantic text processing.',
    'features.learning_paths.title': 'Intelligent Learning Paths',
    'features.learning_paths.description': 'AI-optimized, personalized learning routes based on your progress and learning goals.',
    'features.ai_tutor.title': 'AI Tutor System',
    'features.ai_tutor.description': 'Conversational AI with context awareness for individualized support in Latin learning.',
    'features.vocabulary_trainer.title': 'Intelligent Vocabulary Trainer',
    'features.vocabulary_trainer.description': 'Advanced SRS algorithms with corpus-based vocabulary selection and adaptive difficulty.',
    'features.visualizations.title': 'Interactive Visualizations',
    'features.visualizations.description': '3D map representations, timelines and cultural networks with historical context information.',
    'features.banquet.title': 'Roman Banquets',
    'features.banquet.description': 'Authentic representation of Saturnalia conversations with cultural context and modern references.',
    
    // Feature Status Labels
    'features.status.ai': 'AI-POWERED',
    'features.status.enhanced': 'ENHANCED',
    'features.status.active': 'ACTIVE',
    
    // Connection Test
    'connection.test': 'Test Oracle Cloud',
    'connection.testing': 'Testing Oracle Cloud connection...',
    'connection.success': '✅ Oracle Cloud connected! 1,401 texts available.',
    'connection.fallback': '⚠️ Fallback mode active. AI systems use local processing.',
    
    // Technical Achievement
    'technical.title': '🏆 Technical Excellence Achieved',
    'technical.description': 'This application demonstrates advanced AI integration, semantic search, Oracle Cloud backend connectivity and modern React architecture with over 44 specialized components for classical education.',
    
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
    
    // UI Elements
    'menu': 'Menu',
    'close': 'Claude',
    'open': 'Aperi',
    'toggle': 'Commuta',
    
    // Hero Section
    'hero.title': 'Macrobius',
    'hero.subtitle': 'Antica Epistula in Lagena',
    'hero.description': 'Nuntius ab Antiquitate ad Futurum',
    'hero.badge': 'HYBRID TIER-COMPLETE - Componentes Provecti + Functiones Operantes',
    'hero.explore_works': 'Opera Macrobii Explora',
    'hero.learn_more': 'Plura de Macrobio Disce',
    'hero.cultural_treasures': 'Thesauros Culturales Inveni',
    'hero.ai_status': 'SYSTEMATA AI ACTIVA - Tier 3 AI Features',
    
    // Cultural Story
    'cultural_story': 'Ante annos MD, cum Imperium Romanum ad occasum vergeret, Macrobius epistulam in lagena ad futurum confecit. Haec "epistula in lagena" duo eius magna opera erant: "Saturnalia" et "Commentarius in Somnium Scipionis". In his optimum culturae antiquae servavit - a rhetorica Ciceronis ad astronomiae arcana. Missio eius: patrimonium culturale pro generationibus futuris servare.',
    
    // Images
    'image.rome.title': 'Imperium Romanum Cadens',
    'image.rome.subtitle': 'Declinatio Culturalis et Missio Doctorum',
    'image.macrobius.title': 'Macrobius Ambrosius Theodosius',
    'image.macrobius.subtitle': 'Conservator Culturae Mundi Tardae Antiquitatis',
    'image.tycho.title': 'Johannes Isaac Pontanus et Tycho Brahe',
    'image.tycho.subtitle': 'Renascentia Astronomica et Reinventio',
    
    // Features Section
    'features.title': 'Inveni Features AI-Actuatos',
    'features.ai_cultural_analysis.title': 'AI Analysis Culturalis',
    'features.ai_cultural_analysis.description': 'Analysis NLP-basata vera culturae Romanae cum machine learning et processione semantica textuum.',
    'features.learning_paths.title': 'Semitae Discendi Intelligentes',
    'features.learning_paths.description': 'Viae discendi AI-optimizatae, personalizatae basatae in progressu tuo et scopis discendi.',
    'features.ai_tutor.title': 'Systema AI Praeceptoris',
    'features.ai_tutor.description': 'AI conversationalis cum conscientia contextus pro auxilio individualizato in discendo Latinum.',
    'features.vocabulary_trainer.title': 'Exercitator Vocabulorum Intelligens',
    'features.vocabulary_trainer.description': 'Algorithmi SRS provecti cum electione vocabulorum corpus-basata et difficultate adaptiva.',
    'features.visualizations.title': 'Visualizationes Interactivae',
    'features.visualizations.description': 'Repraesentationes mappae 3D, lineae temporales et retia culturalia cum informationibus contextus historici.',
    'features.banquet.title': 'Convivia Romana',
    'features.banquet.description': 'Repraesentatio authentica colloquiorum Saturnalium cum contextu culturali et referentiis modernis.',
    
    // Feature Status Labels
    'features.status.ai': 'AI-ACTUATUM',
    'features.status.enhanced': 'AUCTUM',
    'features.status.active': 'ACTIVUM',
    
    // Connection Test
    'connection.test': 'Oracle Cloud Proba',
    'connection.testing': 'Probans connexionem Oracle Cloud...',
    'connection.success': '✅ Oracle Cloud connexum! 1.401 textus disponibiles.',
    'connection.fallback': '⚠️ Modus fallback activus. Systemata AI processione locali utuntur.',
    
    // Technical Achievement
    'technical.title': '🏆 Excellentia Technica Consecuta',
    'technical.description': 'Haec applicatio demonstrat integrationem AI provectam, quaestionem semanticam, connexivitatem backend Oracle Cloud et architecturam React modernam cum super 44 componentibus specializatis pro educatione classica.',
    
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