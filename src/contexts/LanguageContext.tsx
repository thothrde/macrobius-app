import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

const translations = {
  en: {
    'hero.title': 'Macrobius Digital Humanities Platform',
    'hero.subtitle': 'Explore Roman Culture Through AI-Enhanced Classical Texts',
    'nav.home': 'Home',
    'nav.search': 'Search',
    'nav.learn': 'Learn',
    'nav.about': 'About',
    'ai.tutor.title': 'AI Tutoring System',
    'ai.tutor.subtitle': 'Intelligent Learning Assistant',
    'ai.tutor.description': 'Advanced AI system providing context-aware guidance and personalized cultural explanations.',
    'search.title': 'Semantic Text Search',
    'search.subtitle': 'AI-Powered Search Through 1,401 Passages',
    'vocabulary.title': 'Vocabulary Trainer',
    'vocabulary.subtitle': 'Spaced Repetition System with Cultural Context',
    'grammar.title': 'Grammar Explainer',
    'grammar.subtitle': 'Interactive Grammar Learning with Examples',
    'quiz.title': 'Cultural Quiz System',
    'quiz.subtitle': 'Test Your Knowledge of Roman Culture',
    'learning.title': 'Personalized Learning Paths',
    'learning.subtitle': 'AI-Adaptive Learning Experience'
  },
  de: {
    'hero.title': 'Macrobius Digital Humanities Plattform',
    'hero.subtitle': 'Erkunde die römische Kultur durch KI-erweiterte klassische Texte',
    'nav.home': 'Startseite',
    'nav.search': 'Suchen',
    'nav.learn': 'Lernen',
    'nav.about': 'Über',
    'ai.tutor.title': 'KI-Tutorsystem',
    'ai.tutor.subtitle': 'Intelligenter Lernassistent',
    'ai.tutor.description': 'Fortschrittliches KI-System mit kontextbewusster Anleitung und personalisierten kulturellen Erklärungen.',
    'search.title': 'Semantische Textsuche',
    'search.subtitle': 'KI-gestützte Suche durch 1.401 Textstellen',
    'vocabulary.title': 'Vokabeltrainer',
    'vocabulary.subtitle': 'Spaced Repetition System mit kulturellem Kontext',
    'grammar.title': 'Grammatikerklärer',
    'grammar.subtitle': 'Interaktives Grammatiklernen mit Beispielen',
    'quiz.title': 'Kulturelles Quizsystem',
    'quiz.subtitle': 'Teste dein Wissen über die römische Kultur',
    'learning.title': 'Personalisierte Lernpfade',
    'learning.subtitle': 'KI-adaptive Lernerfahrung'
  },
  la: {
    'hero.title': 'Macrobius Humanitatum Digitalium Suggestus',
    'hero.subtitle': 'Explora Culturam Romanam per Textus Classicos AI-Auctos',
    'nav.home': 'Domus',
    'nav.search': 'Quaerere',
    'nav.learn': 'Discere',
    'nav.about': 'De',
    'ai.tutor.title': 'Systema Tutoris AI',
    'ai.tutor.subtitle': 'Auxilium Intelligens Discendi',
    'ai.tutor.description': 'Systema AI provectum praebens directionem contextualem et explicationes culturales personalizatas.',
    'search.title': 'Quaestio Semantica Textuum',
    'search.subtitle': 'Quaestio AI per 1.401 Loca',
    'vocabulary.title': 'Exercitator Vocabulorum',
    'vocabulary.subtitle': 'Systema Repetitionis Spatiosae cum Contextu Culturali',
    'grammar.title': 'Explicator Grammaticae',
    'grammar.subtitle': 'Discere Grammaticam Interactive cum Exemplis',
    'quiz.title': 'Systema Quiz Culturalis',
    'quiz.subtitle': 'Proba Scientiam Tuam Culturae Romanae',
    'learning.title': 'Itinera Discendi Personalizata',
    'learning.subtitle': 'Experientia Discendi AI-Adaptiva'
  }
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    const lang = translations[language as keyof typeof translations] || translations.en;
    return lang[key as keyof typeof lang] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}