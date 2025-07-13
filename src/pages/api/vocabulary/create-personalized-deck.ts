import type { NextApiRequest, NextApiResponse } from 'next';

// ===== TYPES & INTERFACES =====
interface VocabularyItem {
  id: string;
  word: string;
  definition: string;
  translation: {
    de?: string;
    en?: string;
    la?: string;
  };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  frequency: number;
  culturalContext: string;
  etymology?: string;
  examples: {
    latin: string;
    translation: string;
    source?: string;
    culturalNote?: string;
  }[];
  grammaticalInfo: {
    partOfSpeech: string;
    declension?: string;
    conjugation?: string;
    irregularForms?: string[];
    relatedWords?: string[];
  };
  audioUrl?: string;
  imageUrl?: string;
  mnemonicHints?: string[];
}

interface UserProfile {
  userId: string;
  proficiencyLevel: 'beginner' | 'intermediate' | 'advanced';
  learningGoals: string[];
  interests: string[];
  weakAreas: string[];
  strongAreas: string[];
  preferredDifficulty: 'beginner' | 'intermediate' | 'advanced';
  dailyTarget: number;
  availableTime: number; // minutes per day
  culturalFocus: string[];
  languagePreference: 'de' | 'en' | 'la';
}

interface DeckCreationRequest {
  userId: string;
  userProfile?: UserProfile;
  deckParameters: {
    name: string;
    description?: string;
    targetSize: number;
    difficultyRange?: ('beginner' | 'intermediate' | 'advanced')[];
    culturalThemes?: string[];
    grammarFocus?: string[];
    includeEtymology?: boolean;
    includeAudio?: boolean;
    includeMnemonics?: boolean;
    prioritizeWeaknesses?: boolean;
    balanceByFrequency?: boolean;
  };
  sourcePreferences?: {
    includeClassicalTexts?: boolean;
    includeMacrobius?: boolean;
    includeModernUsage?: boolean;
    specificAuthors?: string[];
    timePeriodsPreference?: string[];
  };
  adaptiveFeatures?: {
    enableSmartSelection?: boolean;
    personalizeDefinitions?: boolean;
    generateCustomExamples?: boolean;
    createProgressionPath?: boolean;
  };
  language?: 'de' | 'en' | 'la';
}

interface PersonalizedDeck {
  id: string;
  name: string;
  description: string;
  userId: string;
  vocabulary: VocabularyItem[];
  metadata: {
    createdDate: string;
    difficultyDistribution: Record<string, number>;
    thematicBreakdown: Record<string, number>;
    estimatedStudyTime: number;
    progressionPlan: {
      phase1: { duration: string; focus: string; cardCount: number };
      phase2: { duration: string; focus: string; cardCount: number };
      phase3: { duration: string; focus: string; cardCount: number };
    };
  };
  studyPlan: {
    dailyCards: number;
    sessionDuration: number;
    reviewSchedule: string;
    milestones: {
      week: number;
      target: string;
      expectedMastery: number;
    }[];
  };
  customizations: {
    personalizedDefinitions: boolean;
    culturalContextEnhanced: boolean;
    etymologyIncluded: boolean;
    mnemonicsGenerated: boolean;
    audioSupport: boolean;
  };
}

interface APIResponse {
  status: 'success' | 'error' | 'fallback';
  data?: PersonalizedDeck;
  error?: string;
  fallbackReason?: string;
}

// ===== ORACLE CLOUD INTEGRATION =====
const ORACLE_ENDPOINT = process.env.ORACLE_CLOUD_ENDPOINT || 'http://152.70.184.232:8080';
const REQUEST_TIMEOUT = 30000; // 30 seconds for deck creation

async function createPersonalizedDeckWithOracle(
  request: DeckCreationRequest
): Promise<PersonalizedDeck | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await fetch(`${ORACLE_ENDPOINT}/api/vocabulary/create-personalized-deck`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Macrobius-Frontend/1.0'
      },
      body: JSON.stringify({
        userId: request.userId,
        userProfile: request.userProfile,
        deckParameters: request.deckParameters,
        sourcePreferences: request.sourcePreferences || {},
        adaptiveFeatures: request.adaptiveFeatures || {},
        language: request.language || 'en',
        requestTimestamp: new Date().toISOString(),
        aiFeatures: ['smart_selection', 'difficulty_balancing', 'cultural_contextualization', 'etymology_enhancement']
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`Oracle Cloud deck creation response not OK: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    
    // Validate Oracle response structure
    if (data.status === 'success' && data.personalizedDeck) {
      return {
        id: data.personalizedDeck.id || `deck_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: data.personalizedDeck.name || request.deckParameters.name,
        description: data.personalizedDeck.description || request.deckParameters.description || '',
        userId: data.personalizedDeck.userId || request.userId,
        vocabulary: data.personalizedDeck.vocabulary || [],
        metadata: data.personalizedDeck.metadata || {
          createdDate: new Date().toISOString(),
          difficultyDistribution: {},
          thematicBreakdown: {},
          estimatedStudyTime: 0,
          progressionPlan: {
            phase1: { duration: '2 weeks', focus: 'Foundation', cardCount: 0 },
            phase2: { duration: '3 weeks', focus: 'Building', cardCount: 0 },
            phase3: { duration: '3 weeks', focus: 'Mastery', cardCount: 0 }
          }
        },
        studyPlan: data.personalizedDeck.studyPlan || {
          dailyCards: 10,
          sessionDuration: 15,
          reviewSchedule: 'Daily',
          milestones: []
        },
        customizations: data.personalizedDeck.customizations || {
          personalizedDefinitions: false,
          culturalContextEnhanced: false,
          etymologyIncluded: false,
          mnemonicsGenerated: false,
          audioSupport: false
        }
      };
    }

    return null;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.warn('Oracle Cloud deck creation request timed out');
      } else {
        console.error('Oracle Cloud deck creation error:', error.message);
      }
    }
    return null;
  }
}

// ===== INTELLIGENT FALLBACK DECK CREATION =====
function createPersonalizedDeckFallback(
  request: DeckCreationRequest
): PersonalizedDeck {
  const language = request.language || 'en';
  const targetSize = Math.min(request.deckParameters.targetSize, 50); // Limit fallback size
  
  // Base vocabulary pool (would come from Oracle Cloud's 1,401 passages in real implementation)
  const baseVocabulary: Omit<VocabularyItem, 'id'>[] = [
    {
      word: 'convivium',
      definition: 'a feast, banquet, entertainment',
      translation: {
        de: 'Gastmahl, Bankett, Unterhaltung',
        en: 'feast, banquet, entertainment',
        la: 'convivium'
      },
      difficulty: 'beginner',
      frequency: 85,
      culturalContext: 'social-customs',
      etymology: 'from con- (together) + vivere (to live)',
      examples: [
        {
          latin: 'Convivium magnificum Saturnalibus celebratur.',
          translation: 'A magnificent banquet is celebrated during Saturnalia.',
          source: 'Macrobius Saturnalia 1.10',
          culturalNote: 'Banquets were central to Roman social and religious life'
        }
      ],
      grammaticalInfo: {
        partOfSpeech: 'noun',
        declension: '2nd declension neuter',
        relatedWords: ['conviva (guest)', 'convivialis (festive)']
      },
      mnemonicHints: ['CON-VIVIUM: people come together (con) to live (viv) it up!']
    },
    {
      word: 'sapientia',
      definition: 'wisdom, knowledge, intelligence',
      translation: {
        de: 'Weisheit, Wissen, Intelligenz',
        en: 'wisdom, knowledge, intelligence',
        la: 'sapientia'
      },
      difficulty: 'intermediate',
      frequency: 92,
      culturalContext: 'philosophy',
      etymology: 'from sapere (to taste, be wise)',
      examples: [
        {
          latin: 'Sapientia omnibus artibus antecellit.',
          translation: 'Wisdom surpasses all arts.',
          source: 'Macrobius Commentarii 1.2',
          culturalNote: 'Wisdom was considered the highest virtue in Roman philosophy'
        }
      ],
      grammaticalInfo: {
        partOfSpeech: 'noun',
        declension: '1st declension feminine',
        relatedWords: ['sapiens (wise)', 'sapere (to be wise)']
      },
      mnemonicHints: ['SAPI-ENTIA: tastes (sap) wisdom!']
    },
    {
      word: 'auctoritas',
      definition: 'authority, influence, prestige, power',
      translation: {
        de: 'Autorität, Einfluss, Ansehen, Macht',
        en: 'authority, influence, prestige, power',
        la: 'auctoritas'
      },
      difficulty: 'advanced',
      frequency: 78,
      culturalContext: 'roman-politics',
      etymology: 'from auctor (originator, author, founder)',
      examples: [
        {
          latin: 'Senatus auctoritate sua rem publicam gubernat.',
          translation: 'The Senate governs the republic by its authority.',
          source: 'Historical context',
          culturalNote: 'Auctoritas was a key concept in Roman political theory'
        }
      ],
      grammaticalInfo: {
        partOfSpeech: 'noun',
        declension: '3rd declension feminine',
        relatedWords: ['auctor (author)', 'augere (to increase)']
      },
      mnemonicHints: ['AUTHOR-ITAS: the author has authority!']
    },
    {
      word: 'disciplina',
      definition: 'teaching, learning, discipline, training',
      translation: {
        de: 'Lehre, Lernen, Disziplin, Ausbildung',
        en: 'teaching, learning, discipline, training',
        la: 'disciplina'
      },
      difficulty: 'intermediate',
      frequency: 71,
      culturalContext: 'education',
      etymology: 'from discere (to learn)',
      examples: [
        {
          latin: 'Disciplina philosophiae animum excolit.',
          translation: 'The discipline of philosophy cultivates the mind.',
          source: 'Educational context',
          culturalNote: 'Roman education emphasized both intellectual and moral discipline'
        }
      ],
      grammaticalInfo: {
        partOfSpeech: 'noun',
        declension: '1st declension feminine',
        relatedWords: ['discipulus (student)', 'discere (to learn)']
      },
      mnemonicHints: ['DISCIPLINE: learning requires discipline!']
    },
    {
      word: 'religio',
      definition: 'religion, religious scruple, reverence',
      translation: {
        de: 'Religion, religiöse Skrupel, Ehrfurcht',
        en: 'religion, religious scruple, reverence',
        la: 'religio'
      },
      difficulty: 'intermediate',
      frequency: 89,
      culturalContext: 'religious-practices',
      etymology: 'possibly from religare (to bind back)',
      examples: [
        {
          latin: 'Religio deorum cultum sanctissime servat.',
          translation: 'Religion most sacredly preserves the worship of the gods.',
          source: 'Religious context',
          culturalNote: 'Roman religion was deeply integrated into civic life'
        }
      ],
      grammaticalInfo: {
        partOfSpeech: 'noun',
        declension: '3rd declension feminine',
        relatedWords: ['religiosus (religious)', 'religare (to bind)']
      },
      mnemonicHints: ['RELIGION: re-connecting (religare) to the divine!']
    },
    {
      word: 'memoria',
      definition: 'memory, remembrance, tradition',
      translation: {
        de: 'Gedächtnis, Erinnerung, Tradition',
        en: 'memory, remembrance, tradition',
        la: 'memoria'
      },
      difficulty: 'beginner',
      frequency: 94,
      culturalContext: 'literature',
      etymology: 'from memor (mindful)',
      examples: [
        {
          latin: 'Memoria maiorum exempla nobis tradit.',
          translation: 'Memory hands down to us the examples of our ancestors.',
          source: 'Literary tradition',
          culturalNote: 'Memory was crucial for preserving Roman cultural values'
        }
      ],
      grammaticalInfo: {
        partOfSpeech: 'noun',
        declension: '1st declension feminine',
        relatedWords: ['memor (mindful)', 'memorare (to remember)']
      },
      mnemonicHints: ['MEMORIA: memory for remembering!']
    }
  ];
  
  // Apply user preferences and filters
  const filteredVocabulary = baseVocabulary.filter(item => {
    // Filter by difficulty
    if (request.deckParameters.difficultyRange && 
        !request.deckParameters.difficultyRange.includes(item.difficulty)) {
      return false;
    }
    
    // Filter by cultural themes
    if (request.deckParameters.culturalThemes && 
        !request.deckParameters.culturalThemes.includes(item.culturalContext)) {
      return false;
    }
    
    return true;
  });
  
  // Smart selection based on user profile
  const selectVocabulary = (): VocabularyItem[] => {
    let selectedItems = [...filteredVocabulary];
    
    // Prioritize based on user weaknesses
    if (request.deckParameters.prioritizeWeaknesses && request.userProfile?.weakAreas) {
      selectedItems.sort((a, b) => {
        const aRelevant = request.userProfile!.weakAreas!.includes(a.culturalContext);
        const bRelevant = request.userProfile!.weakAreas!.includes(b.culturalContext);
        return bRelevant ? 1 : aRelevant ? -1 : 0;
      });
    }
    
    // Balance by frequency if requested
    if (request.deckParameters.balanceByFrequency) {
      selectedItems.sort((a, b) => b.frequency - a.frequency);
    }
    
    // Take the target number of items
    const selected = selectedItems.slice(0, targetSize);
    
    // Add IDs and apply customizations
    return selected.map((item, index) => {
      const enhancedItem: VocabularyItem = {
        ...item,
        id: `vocab_${Date.now()}_${index}`,
        examples: item.examples.map(example => ({
          ...example,
          translation: language === 'de' ? 
            (item.translation.de || example.translation) :
            language === 'la' ?
            example.latin :
            example.translation
        }))
      };
      
      // Add etymology if requested
      if (!request.deckParameters.includeEtymology) {
        delete enhancedItem.etymology;
      }
      
      // Add mnemonics if requested
      if (!request.deckParameters.includeMnemonics) {
        delete enhancedItem.mnemonicHints;
      }
      
      return enhancedItem;
    });
  };
  
  const selectedVocabulary = selectVocabulary();
  
  // Calculate metadata
  const difficultyDistribution = selectedVocabulary.reduce((acc, item) => {
    acc[item.difficulty] = (acc[item.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const thematicBreakdown = selectedVocabulary.reduce((acc, item) => {
    acc[item.culturalContext] = (acc[item.culturalContext] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const estimatedStudyTime = selectedVocabulary.length * 2; // 2 minutes per card
  
  // Create study plan
  const dailyCards = Math.max(5, Math.min(20, Math.ceil(selectedVocabulary.length / 14))); // 2 week plan
  const sessionDuration = dailyCards * 2; // 2 minutes per card
  
  // Generate milestones
  const milestones = [
    {
      week: 1,
      target: language === 'de' ? 'Grundvokabular erlernen' : 
              language === 'la' ? 'Vocabularium fundamentale discere' :
              'Learn fundamental vocabulary',
      expectedMastery: 30
    },
    {
      week: 2,
      target: language === 'de' ? 'Kulturelle Kontexte verstehen' : 
              language === 'la' ? 'Contextus culturales intellegere' :
              'Understand cultural contexts',
      expectedMastery: 60
    },
    {
      week: 4,
      target: language === 'de' ? 'Vokabular beherrschen' : 
              language === 'la' ? 'Vocabularium dominari' :
              'Master vocabulary',
      expectedMastery: 85
    }
  ];
  
  const deckId = `deck_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  return {
    id: deckId,
    name: request.deckParameters.name,
    description: request.deckParameters.description || 
      (language === 'de' ? 
        `Personalisiertes Vokabeldeck mit ${selectedVocabulary.length} sorgfältig ausgewählten Wörtern aus Macrobius` :
        language === 'la' ?
        `Libellus vocabulorum personalis cum ${selectedVocabulary.length} verbis diligenter selectis ex Macrobio` :
        `Personalized vocabulary deck with ${selectedVocabulary.length} carefully selected words from Macrobius`),
    userId: request.userId,
    vocabulary: selectedVocabulary,
    metadata: {
      createdDate: new Date().toISOString(),
      difficultyDistribution,
      thematicBreakdown,
      estimatedStudyTime,
      progressionPlan: {
        phase1: {
          duration: language === 'de' ? '2 Wochen' : language === 'la' ? '2 hebdomades' : '2 weeks',
          focus: language === 'de' ? 'Grundlagen' : language === 'la' ? 'Fundamenta' : 'Foundation',
          cardCount: Math.ceil(selectedVocabulary.length * 0.4)
        },
        phase2: {
          duration: language === 'de' ? '3 Wochen' : language === 'la' ? '3 hebdomades' : '3 weeks',
          focus: language === 'de' ? 'Aufbau' : language === 'la' ? 'Aedificatio' : 'Building',
          cardCount: Math.ceil(selectedVocabulary.length * 0.4)
        },
        phase3: {
          duration: language === 'de' ? '3 Wochen' : language === 'la' ? '3 hebdomades' : '3 weeks',
          focus: language === 'de' ? 'Meisterschaft' : language === 'la' ? 'Dominatio' : 'Mastery',
          cardCount: Math.ceil(selectedVocabulary.length * 0.2)
        }
      }
    },
    studyPlan: {
      dailyCards,
      sessionDuration,
      reviewSchedule: language === 'de' ? 'Täglich' : language === 'la' ? 'Quotidie' : 'Daily',
      milestones
    },
    customizations: {
      personalizedDefinitions: request.adaptiveFeatures?.personalizeDefinitions || false,
      culturalContextEnhanced: true,
      etymologyIncluded: request.deckParameters.includeEtymology || false,
      mnemonicsGenerated: request.deckParameters.includeMnemonics || false,
      audioSupport: request.deckParameters.includeAudio || false
    }
  };
}

// ===== MAIN API HANDLER =====
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      status: 'error',
      error: 'Method not allowed. Use POST.'
    });
  }

  try {
    const request: DeckCreationRequest = req.body;

    // Validate required parameters
    if (!request.userId) {
      return res.status(400).json({
        status: 'error',
        error: 'userId is required for deck creation.'
      });
    }

    if (!request.deckParameters) {
      return res.status(400).json({
        status: 'error',
        error: 'deckParameters is required for deck creation.'
      });
    }

    if (!request.deckParameters.name) {
      return res.status(400).json({
        status: 'error',
        error: 'deckParameters.name is required.'
      });
    }

    if (!request.deckParameters.targetSize || request.deckParameters.targetSize <= 0) {
      return res.status(400).json({
        status: 'error',
        error: 'deckParameters.targetSize must be a positive number.'
      });
    }

    if (request.deckParameters.targetSize > 100) {
      return res.status(400).json({
        status: 'error',
        error: 'deckParameters.targetSize cannot exceed 100 for performance reasons.'
      });
    }

    // Validate optional parameters
    if (request.language && !['de', 'en', 'la'].includes(request.language)) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid language. Must be: de, en, or la.'
      });
    }

    if (request.userProfile?.proficiencyLevel && 
        !['beginner', 'intermediate', 'advanced'].includes(request.userProfile.proficiencyLevel)) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid proficiencyLevel. Must be: beginner, intermediate, or advanced.'
      });
    }

    // Try Oracle Cloud first
    const oracleResult = await createPersonalizedDeckWithOracle(request);
    
    if (oracleResult) {
      return res.status(200).json({
        status: 'success',
        data: oracleResult
      });
    }

    // Use intelligent fallback
    const fallbackResult = createPersonalizedDeckFallback(request);
    
    return res.status(200).json({
      status: 'fallback',
      data: fallbackResult,
      fallbackReason: 'Oracle Cloud unavailable - using intelligent deck creation algorithms'
    });

  } catch (error) {
    console.error('Personalized deck creation error:', error);
    
    // Emergency fallback
    try {
      const emergencyFallback = createPersonalizedDeckFallback({
        userId: req.body?.userId || 'anonymous',
        deckParameters: {
          name: req.body?.deckParameters?.name || 'Emergency Deck',
          targetSize: Math.min(req.body?.deckParameters?.targetSize || 10, 20)
        },
        language: 'en'
      });
      
      return res.status(200).json({
        status: 'fallback',
        data: emergencyFallback,
        fallbackReason: 'System error - emergency deck creation provided'
      });
    } catch (emergencyError) {
      return res.status(500).json({
        status: 'error',
        error: 'Unable to create personalized deck due to system error.'
      });
    }
  }
}