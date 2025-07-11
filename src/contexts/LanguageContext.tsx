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
    
    // Modal content translations
    'about_title': 'Macrobius Ambrosius Theodosius',
    'about_subtitle': 'Kultureller Bewahrer der spätantiken Welt (ca. 385-430 n. Chr.)',
    'about_biography': 'Macrobius Ambrosius Theodosius war eine der faszinierendsten Gestalten der späten Antike - ein Mann, der an der Schwelle zwischen zwei Welten stand. Als hoher Verwaltungsbeamter des untergehenden Weströmischen Reiches und gleichzeitig als leidenschaftlicher Gelehrter verkörperte er die dramatische Spannung seiner Zeit: den Versuch, die klassische Kultur vor dem Untergang zu bewahren.',
    'about_works': 'Macrobius\' zwei Hauptwerke "Saturnalia" und "Commentarii in Somnium Scipionis" sind Meisterwerke spätantiker Gelehrsamkeit. Die "Saturnalia" präsentieren sich als lebendige Tischgespräche während der römischen Winterfeste, in denen die gebildete Elite Roms über Literatur, Philosophie, Religion und Naturwissenschaften diskutiert. Die "Commentarii" bieten eine systematische Einführung in die antike Kosmologie und Traumdeutung.',
    'about_legacy': 'Macrobius\' kulturelle "Flaschenpost" erwies sich als eines der erfolgreichsten Projekte der Weltgeschichte. Seine Werke überdauerten den Untergang Roms, wurden von mittelalterlichen Klöstern bewahrt und prägten das geistige Leben des Mittelalters und der Renaissance nachhaltig. Durch ihn blieben zentrale Texte Ciceros, Vergils und der antiken Philosophie für die Nachwelt erhalten.',
    'about_pontanus_title': 'Johannes Isaac Pontanus & Tycho Brahe',
    'about_pontanus_subtitle': 'Astronomische Renaissance und die Wiederentdeckung des Macrobius (1571-1639)',
    'about_pontanus_bio': 'Johannes Isaac Pontanus war mehr als nur ein Assistent des großen Tycho Brahe - er war ein Brückenbauer zwischen den Welten der antiken Weisheit und moderner Wissenschaft. Geboren 1571 in Dänemark, wurde er zum Zeitzeugen einer der dramatischsten Epochen der Wissenschaftsgeschichte: der astronomischen Revolution.',
    'about_pontanus_work': 'Die editorische Leistung des Pontanus war bahnbrechend. Seine kommentierten Ausgaben der Macrobius-Werke vereinten philologische Präzision mit astronomischem Fachwissen. Er erkannte als einer der ersten, dass Macrobius\' kosmologische Texte nicht nur literarische Curiosa waren, sondern wertvolle Zeugnisse antiker Wissenschaft.',
    'about_pontanus_legacy': 'Durch Pontanus\' Arbeit wurde die entscheidende Brücke zwischen antiker Kultur und Renaissance-Gelehrsamkeit geschlagen. Seine Editionen machten Macrobius\' Werke für die Gelehrtenwelt der frühen Neuzeit zugänglich und trugen zur "Wiedergeburt" der antiken Wissenschaften bei.',
    'pontanus_historical_details': 'Die Edition des Pontanus folgt dem gedruckten Text mit 117 Seiten voller eigener gelehrter Notizen, die das astronomische Wissen seiner Zeit mit den antiken Texten verknüpfen.',
    'declining_rome_title': 'Das untergehende Römische Reich',
    'declining_rome_subtitle': 'Kultureller Niedergang und die Mission der Gelehrten (4.-5. Jahrhundert n. Chr.)',
    'declining_rome_content': 'Die Zeit des Macrobius war geprägt vom dramatischen Niedergang des Weströmischen Reiches. Barbareneinfälle, politische Instabilität und wirtschaftlicher Kollaps bedrohten nicht nur die politische Ordnung, sondern auch das gesamte kulturelle Erbe der Antike. Bibliotheken wurden zerstört, Schulen geschlossen, und jahrhundertealtes Wissen drohte für immer verloren zu gehen.\n\n**Die Mission der Kulturbewahrer**\n\nIn dieser Krisenzeit erkannten Gelehrte wie Macrobius ihre historische Verantwortung: Sie mussten das kulturelle Erbe für kommende Generationen retten. Durch systematische Sammlung, Kommentierung und Übertragung der klassischen Texte schufen sie eine Art "kulturelle Arche", die das Wissen der Antike über die dunklen Jahrhunderte hinweg bewahren sollte.',
    'cultural_story': 'Vor 1500 Jahren, als das römische Reich dem Untergang entgegensah, fertigte Macrobius eine Flaschenpost an die Zukunft an. Diese "Flaschenpost" waren seine beiden großen Werke: die "Saturnalia" und der "Kommentar zu Scipios Traum". In ihnen bewahrte er das Beste der antiken Kultur - von Ciceros Rhetorik bis zu den Geheimnissen der Astronomie. Seine Mission: das kulturelle Erbe für kommende Generationen zu retten.',
    'explore_texts': 'ERKUNDEN SIE DIE ZWEI WERKE DES MACROBIUS',
    'more_about_macrobius': 'Mehr über Macrobius',
    'more_about_pontanus': 'Mehr über Pontanus',
    'close_modal': 'Schließen',
    
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
    
    // Modal content translations
    'about_title': 'Macrobius Ambrosius Theodosius',
    'about_subtitle': 'Cultural Preserver of the Late Antique World (ca. 385-430 AD)',
    'about_biography': 'Macrobius Ambrosius Theodosius was one of the most fascinating figures of late antiquity - a man who stood at the threshold between two worlds.',
    'about_works': 'Macrobius\' two major works "Saturnalia" and "Commentarii in Somnium Scipionis" are masterpieces of late antique scholarship.',
    'about_legacy': 'Macrobius\' cultural "message in a bottle" proved to be one of the most successful projects in world history.',
    'about_pontanus_title': 'Johannes Isaac Pontanus & Tycho Brahe',
    'about_pontanus_subtitle': 'Astronomical Renaissance and the Rediscovery of Macrobius (1571-1639)',
    'about_pontanus_bio': 'Johannes Isaac Pontanus was more than just an assistant to the great Tycho Brahe - he was a bridge-builder between the worlds of ancient wisdom and modern science.',
    'about_pontanus_work': 'Pontanus\' editorial achievement was groundbreaking.',
    'about_pontanus_legacy': 'Through Pontanus\' work, the crucial bridge between ancient culture and Renaissance scholarship was built.',
    'pontanus_historical_details': 'The Pontanus edition follows the printed text with 117 pages of his own learned annotations.',
    'declining_rome_title': 'The Declining Roman Empire',
    'declining_rome_subtitle': 'Cultural Decline and the Mission of Scholars (4th-5th Century AD)',
    'declining_rome_content': 'The time of Macrobius was marked by the dramatic decline of the Western Roman Empire.',
    'cultural_story': '1500 years ago, as the Roman Empire approached its end, Macrobius created a message in a bottle to the future. This "message in a bottle" consisted of his two great works: the "Saturnalia" and the "Commentary on Scipio\'s Dream". In them, he preserved the best of ancient culture - from Cicero\'s rhetoric to the secrets of astronomy. His mission: to save the cultural heritage for future generations.',
    'explore_texts': 'EXPLORE MACROBIUS\' TWO MAJOR WORKS',
    'more_about_macrobius': 'More about Macrobius',
    'more_about_pontanus': 'More about Pontanus',
    'close_modal': 'Close',
    
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
    
    // Modal content translations
    'about_title': 'Macrobius Ambrosius Theodosius',
    'about_subtitle': 'Custos Culturae Mundi Antiquitatis Serae (ca. 385-430 p. Chr.)',
    'about_biography': 'Macrobius Ambrosius Theodosius vir fuit inter figuras fascinantissimas antiquitatis serae.',
    'about_works': 'Duo opera principalia Macrobii sunt opera magistralia eruditionis antiquitatis serae.',
    'about_legacy': 'Culturalis "epistula in lagena" Macrobii unum ex projectis successuris mundi historiae se probavit.',
    'about_pontanus_title': 'Johannes Isaac Pontanus et Tycho Brahe',
    'about_pontanus_subtitle': 'Renascentia Astronomica et Inventio Nova Macrobii (1571-1639)',
    'about_pontanus_bio': 'Johannes Isaac Pontanus plus erat quam solum adiutor magni Tychonis Brahe.',
    'about_pontanus_work': 'Opus editoriale Pontani fundamentale erat.',
    'about_pontanus_legacy': 'Per laborem Pontani, pons crucialis inter culturam antiquam et eruditionem Renascentiae aedificatus est.',
    'pontanus_historical_details': 'Editio Pontani textum impressum cum 117 paginis notationum eruditionis suae sequitur.',
    'declining_rome_title': 'Imperium Romanum Cadens',
    'declining_rome_subtitle': 'Declinatio Culturalis et Missio Eruditorum (Saec. IV-V p. Chr.)',
    'declining_rome_content': 'Tempus Macrobii declinio dramatico Imperii Romani Occidentalis signatum erat.',
    'cultural_story': 'Ante 1500 annos, cum Imperium Romanum fini appropinquaret, Macrobius epistulam in lagena ad futurum creavit. Haec "epistula in lagena" duo opera magna eius erant: "Saturnalia" et "Commentarius de Somnio Scipionis". In his optimum culturae antiquae servavit - a rhetorica Ciceronis ad secreta astronomiae. Eius missio: patrimonium culturale generationibus futuris servare.',
    'explore_texts': 'DUO OPERA MACROBII EXPLORARE',
    'more_about_macrobius': 'Magis de Macrobio',
    'more_about_pontanus': 'Magis de Pontano',
    'close_modal': 'Claudere',
    
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
  const [language, setLanguage] = useState<Language>('DE'); // Changed default to German
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
    // Mark as hydrated after first effect
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