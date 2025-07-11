// TIER-COMPLETE Advanced Sections
export { default as AITutoringSystemSection } from './AITutoringSystemSection-COMPLETE';
export { default as VisualizationsSection } from './VisualizationsSection-COMPLETE';
export { default as MacrobiusTextProcessor } from './MacrobiusTextProcessor-TIER2-COMPLETE';
export { default as GrammarExplainer } from './GrammarExplainer-TIER1-COMPLETE';
export { default as VocabularyTrainer } from './VocabularyTrainer-CORPUS-EXPANSION-COMPLETE';
export { default as AICulturalAnalysisSection } from './AICulturalAnalysisSection';

// Existing sections (maintained for compatibility)
export { default as TextSearchSection } from './TextSearchSection';
export { default as BanquetSection } from './BanquetSection';
export { default as WorldMapSection } from './WorldMapSection';
export { default as QuizSection } from './QuizSection';
export { default as CosmosSection } from './CosmosSection';

// Section configuration
export const SECTION_CONFIG = {
  AI_TUTORING: {
    id: 'ai-tutoring',
    title: 'KI-Tutor System',
    description: 'Personalisierte AI-Lernbegleitung',
    tier: 'COMPLETE'
  },
  VISUALIZATIONS: {
    id: 'visualizations',
    title: 'Datenvisualisierung', 
    description: 'Analytics & Erkenntnisse',
    tier: 'COMPLETE'
  },
  TEXT_PROCESSOR: {
    id: 'text-processor',
    title: 'Text Processor',
    description: 'Semantic Search & Analytics',
    tier: 'TIER-2'
  },
  GRAMMAR_EXPLAINER: {
    id: 'grammar-explainer',
    title: 'Grammar Explorer',
    description: 'Grammatik-Erklärsystem',
    tier: 'TIER-1'
  },
  VOCABULARY_TRAINER: {
    id: 'vocabulary-trainer',
    title: 'Vocabulary Trainer',
    description: 'Corpus-Expansion Vokabeln',
    tier: 'CORPUS-EXPANSION'
  },
  CULTURAL_ANALYSIS: {
    id: 'cultural-analysis',
    title: 'Cultural AI',
    description: 'KI-Kulturanalyse',
    tier: 'AI-ENHANCED'
  }
} as const;