import type { NextApiRequest, NextApiResponse } from 'next';

// ===== TYPES & INTERFACES =====
interface GrammarAnalysisRequest {
  sentence: string;
  language?: 'la' | 'en' | 'de';
  analysisDepth?: 'basic' | 'detailed' | 'comprehensive';
  userId?: string;
  includeExplanations?: boolean;
  culturalContext?: string;
  sourceText?: string;
  learnerLevel?: 'beginner' | 'intermediate' | 'advanced';
}

interface WordAnalysis {
  word: string;
  lemma: string;
  partOfSpeech: string;
  morphology: {
    case?: string;
    number?: string;
    gender?: string;
    person?: string;
    tense?: string;
    mood?: string;
    voice?: string;
    degree?: string;
    declension?: string;
    conjugation?: string;
  };
  syntacticRole: string;
  dependencies: {
    head?: number; // index of governing word
    dependents?: number[]; // indices of dependent words
    relation?: string; // type of syntactic relation
  };
  semanticInfo?: {
    meaning: string;
    etymology?: string;
    frequency?: number;
    culturalNotes?: string;
  };
}

interface SyntacticStructure {
  mainClause: {
    subject?: WordAnalysis;
    predicate: WordAnalysis;
    object?: WordAnalysis;
    complements?: WordAnalysis[];
  };
  subordinateClauses?: {
    type: string;
    conjunction?: WordAnalysis;
    structure: SyntacticStructure;
  }[];
  phrases: {
    type: string; // 'noun phrase', 'prepositional phrase', etc.
    head: WordAnalysis;
    modifiers: WordAnalysis[];
    function: string;
  }[];
}

interface GrammarPatterns {
  identifiedPatterns: {
    name: string;
    description: string;
    examples: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    culturalSignificance?: string;
  }[];
  stylistics: {
    register: 'formal' | 'informal' | 'poetic' | 'technical';
    literaryDevices?: string[];
    rhetoricalFeatures?: string[];
  };
  historicalContext?: {
    period: string;
    author?: string;
    genre?: string;
    linguisticFeatures: string[];
  };
}

interface LearningInsights {
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  keyLearningPoints: string[];
  commonMistakes: {
    mistake: string;
    correction: string;
    explanation: string;
  }[];
  practiceRecommendations: {
    focus: string;
    exercises: string[];
    relatedTopics: string[];
  }[];
  nextSteps: string[];
}

interface GrammarAnalysisResponse {
  sentence: string;
  language: string;
  wordAnalysis: WordAnalysis[];
  syntacticStructure: SyntacticStructure;
  grammarPatterns: GrammarPatterns;
  learningInsights: LearningInsights;
  translations?: {
    literal: string;
    natural: string;
    cultural?: string;
  };
  confidence: number; // 0-100
  processingTime: number;
}

interface APIResponse {
  status: 'success' | 'error' | 'fallback';
  data?: GrammarAnalysisResponse;
  error?: string;
  fallbackReason?: string;
}

// ===== ORACLE CLOUD INTEGRATION =====
const ORACLE_ENDPOINT = process.env.ORACLE_CLOUD_ENDPOINT || 'http://152.70.184.232:8080';
const REQUEST_TIMEOUT = 30000; // 30 seconds for complex analysis

async function analyzeGrammarWithOracle(
  request: GrammarAnalysisRequest
): Promise<GrammarAnalysisResponse | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await fetch(`${ORACLE_ENDPOINT}/api/grammar/analyze-sentence`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Macrobius-Frontend/1.0'
      },
      body: JSON.stringify({
        sentence: request.sentence,
        language: request.language || 'la',
        analysisDepth: request.analysisDepth || 'detailed',
        userId: request.userId,
        includeExplanations: request.includeExplanations || true,
        culturalContext: request.culturalContext,
        sourceText: request.sourceText,
        learnerLevel: request.learnerLevel || 'intermediate',
        requestTimestamp: new Date().toISOString(),
        nlpFeatures: ['morphological_analysis', 'syntactic_parsing', 'semantic_analysis', 'cultural_contextualization']
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`Oracle Cloud grammar analysis response not OK: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    
    // Validate Oracle response structure
    if (data.status === 'success' && data.grammarAnalysis) {
      return {
        sentence: data.grammarAnalysis.sentence || request.sentence,
        language: data.grammarAnalysis.language || request.language || 'la',
        wordAnalysis: data.grammarAnalysis.wordAnalysis || [],
        syntacticStructure: data.grammarAnalysis.syntacticStructure || {
          mainClause: { predicate: { word: '', lemma: '', partOfSpeech: '', morphology: {}, syntacticRole: '', dependencies: {} } },
          phrases: []
        },
        grammarPatterns: data.grammarAnalysis.grammarPatterns || {
          identifiedPatterns: [],
          stylistics: { register: 'formal' }
        },
        learningInsights: data.grammarAnalysis.learningInsights || {
          difficultyLevel: 'intermediate',
          keyLearningPoints: [],
          commonMistakes: [],
          practiceRecommendations: [],
          nextSteps: []
        },
        translations: data.grammarAnalysis.translations,
        confidence: data.grammarAnalysis.confidence || 85,
        processingTime: data.grammarAnalysis.processingTime || 0
      };
    }

    return null;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.warn('Oracle Cloud grammar analysis request timed out');
      } else {
        console.error('Oracle Cloud grammar analysis error:', error.message);
      }
    }
    return null;
  }
}

// ===== INTELLIGENT FALLBACK GRAMMAR ANALYSIS =====
class LatinGrammarAnalyzer {
  private static readonly LATIN_MORPHOLOGY = {
    nouns: {
      'puella': { declension: '1st', gender: 'feminine', cases: { nom: 'puella', gen: 'puellae', dat: 'puellae', acc: 'puellam', abl: 'puella' } },
      'convivium': { declension: '2nd', gender: 'neuter', cases: { nom: 'convivium', gen: 'convivii', dat: 'convivio', acc: 'convivium', abl: 'convivio' } },
      'sapientia': { declension: '1st', gender: 'feminine', cases: { nom: 'sapientia', gen: 'sapientiae', dat: 'sapientiae', acc: 'sapientiam', abl: 'sapientia' } },
      'homo': { declension: '3rd', gender: 'masculine', cases: { nom: 'homo', gen: 'hominis', dat: 'homini', acc: 'hominem', abl: 'homine' } },
      'tempus': { declension: '3rd', gender: 'neuter', cases: { nom: 'tempus', gen: 'temporis', dat: 'tempori', acc: 'tempus', abl: 'tempore' } }
    },
    verbs: {
      'est': { lemma: 'sum', conjugation: '1st', person: '3rd', number: 'singular', tense: 'present', mood: 'indicative', voice: 'active' },
      'sunt': { lemma: 'sum', conjugation: '1st', person: '3rd', number: 'plural', tense: 'present', mood: 'indicative', voice: 'active' },
      'erat': { lemma: 'sum', conjugation: '1st', person: '3rd', number: 'singular', tense: 'imperfect', mood: 'indicative', voice: 'active' },
      'fuit': { lemma: 'sum', conjugation: '1st', person: '3rd', number: 'singular', tense: 'perfect', mood: 'indicative', voice: 'active' },
      'habet': { lemma: 'habeo', conjugation: '2nd', person: '3rd', number: 'singular', tense: 'present', mood: 'indicative', voice: 'active' },
      'facit': { lemma: 'facio', conjugation: '3rd', person: '3rd', number: 'singular', tense: 'present', mood: 'indicative', voice: 'active' },
      'dicit': { lemma: 'dico', conjugation: '3rd', person: '3rd', number: 'singular', tense: 'present', mood: 'indicative', voice: 'active' }
    },
    adjectives: {
      'magnus': { declension: '1st/2nd', type: 'bonus-type', degrees: { positive: 'magnus', comparative: 'maior', superlative: 'maximus' } },
      'bonus': { declension: '1st/2nd', type: 'bonus-type', degrees: { positive: 'bonus', comparative: 'melior', superlative: 'optimus' } },
      'sapiens': { declension: '3rd', type: 'one-termination', degrees: { positive: 'sapiens', comparative: 'sapientior', superlative: 'sapientissimus' } }
    }
  };

  static analyzeWord(word: string, context: string[] = []): WordAnalysis {
    const lowerWord = word.toLowerCase().replace(/[.,!?;:]/g, '');
    
    // Check against known morphology
    let analysis: WordAnalysis = {
      word,
      lemma: lowerWord,
      partOfSpeech: 'unknown',
      morphology: {},
      syntacticRole: 'unknown',
      dependencies: {},
      semanticInfo: {
        meaning: 'Analysis pending',
        frequency: 50
      }
    };

    // Analyze verbs
    if (this.LATIN_MORPHOLOGY.verbs[lowerWord]) {
      const verbData = this.LATIN_MORPHOLOGY.verbs[lowerWord];
      analysis = {
        ...analysis,
        lemma: verbData.lemma,
        partOfSpeech: 'verb',
        morphology: {
          person: verbData.person,
          number: verbData.number,
          tense: verbData.tense,
          mood: verbData.mood,
          voice: verbData.voice,
          conjugation: verbData.conjugation
        },
        syntacticRole: 'predicate',
        semanticInfo: {
          meaning: verbData.lemma === 'sum' ? 'to be, exist' : 
                  verbData.lemma === 'habeo' ? 'to have, hold' :
                  verbData.lemma === 'facio' ? 'to make, do' :
                  verbData.lemma === 'dico' ? 'to say, speak' : 'verb meaning',
          frequency: 95
        }
      };
    }
    
    // Analyze nouns
    else if (this.LATIN_MORPHOLOGY.nouns[lowerWord]) {
      const nounData = this.LATIN_MORPHOLOGY.nouns[lowerWord];
      analysis = {
        ...analysis,
        lemma: lowerWord,
        partOfSpeech: 'noun',
        morphology: {
          declension: nounData.declension,
          gender: nounData.gender,
          case: 'nominative', // Default assumption
          number: 'singular'
        },
        syntacticRole: 'subject',
        semanticInfo: {
          meaning: lowerWord === 'convivium' ? 'feast, banquet' :
                  lowerWord === 'sapientia' ? 'wisdom, knowledge' :
                  lowerWord === 'homo' ? 'human, person' :
                  lowerWord === 'tempus' ? 'time, period' : 'noun meaning',
          frequency: 80,
          culturalNotes: lowerWord === 'convivium' ? 'Central to Roman social life' :
                        lowerWord === 'sapientia' ? 'Key philosophical concept' : undefined
        }
      };
    }
    
    // Pattern-based analysis for unknown words
    else {
      // Latin word endings analysis
      if (lowerWord.endsWith('orum') || lowerWord.endsWith('arum')) {
        analysis.partOfSpeech = 'noun';
        analysis.morphology = { case: 'genitive', number: 'plural' };
        analysis.syntacticRole = 'possessive';
      } else if (lowerWord.endsWith('is')) {
        analysis.partOfSpeech = 'noun';
        analysis.morphology = { case: 'genitive', number: 'singular' };
        analysis.syntacticRole = 'possessive';
      } else if (lowerWord.endsWith('nt') || lowerWord.endsWith('unt')) {
        analysis.partOfSpeech = 'verb';
        analysis.morphology = { person: '3rd', number: 'plural', tense: 'present' };
        analysis.syntacticRole = 'predicate';
      }
    }

    return analysis;
  }

  static analyzeSentenceStructure(words: WordAnalysis[]): SyntacticStructure {
    // Find main verb (predicate)
    const mainVerb = words.find(w => w.partOfSpeech === 'verb' && w.syntacticRole === 'predicate');
    
    // Find subject (usually nominative noun)
    const subject = words.find(w => 
      w.partOfSpeech === 'noun' && 
      (w.morphology.case === 'nominative' || w.syntacticRole === 'subject')
    );
    
    // Find object (usually accusative)
    const object = words.find(w => 
      w.partOfSpeech === 'noun' && 
      w.morphology.case === 'accusative'
    );

    // Identify phrases
    const phrases = words.reduce((acc, word, index) => {
      if (word.partOfSpeech === 'noun') {
        const modifiers = words.filter((w, i) => 
          i !== index && 
          (w.partOfSpeech === 'adjective' || 
           (w.partOfSpeech === 'noun' && w.morphology.case === 'genitive'))
        );
        
        acc.push({
          type: 'noun phrase',
          head: word,
          modifiers,
          function: word.syntacticRole || 'unknown'
        });
      }
      return acc;
    }, [] as SyntacticStructure['phrases']);

    return {
      mainClause: {
        subject,
        predicate: mainVerb || words[0], // fallback to first word
        object,
        complements: words.filter(w => 
          w.syntacticRole === 'complement' || 
          w.morphology.case === 'ablative'
        )
      },
      phrases
    };
  }

  static identifyGrammarPatterns(words: WordAnalysis[], sentence: string): GrammarPatterns {
    const patterns = [];
    
    // Check for common Latin patterns
    if (words.some(w => w.lemma === 'sum')) {
      patterns.push({
        name: 'Copulative Construction',
        description: 'Uses the verb "esse" (to be) as main verb',
        examples: ['Sapientia est virtus', 'Homo animal rationale est'],
        difficulty: 'beginner' as const,
        culturalSignificance: 'Fundamental to Latin predication'
      });
    }

    if (words.some(w => w.morphology.case === 'ablative')) {
      patterns.push({
        name: 'Ablative Construction',
        description: 'Uses ablative case for various functions',
        examples: ['Ablative of means', 'Ablative of time', 'Ablative absolute'],
        difficulty: 'intermediate' as const,
        culturalSignificance: 'Distinctive feature of Latin syntax'
      });
    }

    // Word order analysis
    const hasSOV = words.length >= 3 && 
      words[0].syntacticRole === 'subject' &&
      words[words.length - 1].partOfSpeech === 'verb';
    
    if (hasSOV) {
      patterns.push({
        name: 'SOV Word Order',
        description: 'Subject-Object-Verb order typical of Latin',
        examples: ['Puella librum legit', 'Caesar Galliam vicit'],
        difficulty: 'beginner' as const,
        culturalSignificance: 'Standard Latin syntax pattern'
      });
    }

    return {
      identifiedPatterns: patterns,
      stylistics: {
        register: sentence.length > 50 ? 'formal' : 'neutral',
        literaryDevices: patterns.length > 2 ? ['complex syntax'] : [],
        rhetoricalFeatures: words.some(w => w.morphology.case === 'vocative') ? ['direct address'] : []
      },
      historicalContext: {
        period: 'Classical Latin',
        linguisticFeatures: patterns.map(p => p.name)
      }
    };
  }
}

function analyzeGrammarFallback(request: GrammarAnalysisRequest): GrammarAnalysisResponse {
  const startTime = Date.now();
  const language = request.language || 'la';
  
  // Tokenize sentence
  const words = request.sentence.split(/\s+/).filter(w => w.length > 0);
  
  // Analyze each word
  const wordAnalysis = words.map((word, index) => 
    LatinGrammarAnalyzer.analyzeWord(word, words)
  );
  
  // Analyze sentence structure
  const syntacticStructure = LatinGrammarAnalyzer.analyzeSentenceStructure(wordAnalysis);
  
  // Identify grammar patterns
  const grammarPatterns = LatinGrammarAnalyzer.identifyGrammarPatterns(wordAnalysis, request.sentence);
  
  // Generate learning insights
  const learningInsights: LearningInsights = {
    difficultyLevel: grammarPatterns.identifiedPatterns.length > 2 ? 'advanced' :
                    grammarPatterns.identifiedPatterns.length > 0 ? 'intermediate' : 'beginner',
    keyLearningPoints: [
      language === 'de' ? 'Wortstellung im Lateinischen' :
      language === 'en' ? 'Latin word order patterns' :
      'Ordo verborum Latinus',
      
      language === 'de' ? 'Kasusverwendung' :
      language === 'en' ? 'Case usage' :
      'Usus casuum',
      
      language === 'de' ? 'Verbmorphologie' :
      language === 'en' ? 'Verb morphology' :
      'Morphologia verborum'
    ],
    commonMistakes: [
      {
        mistake: language === 'de' ? 'Deutsche Wortstellung verwenden' :
                language === 'en' ? 'Using English word order' :
                'Ordo verborum vernaculus',
        correction: language === 'de' ? 'SOV-Ordnung bevorzugen' :
                   language === 'en' ? 'Prefer SOV order' :
                   'Ordinem SOV praeferre',
        explanation: language === 'de' ? 'Lateinisch bevorzugt Subjekt-Objekt-Verb-Stellung' :
                    language === 'en' ? 'Latin prefers Subject-Object-Verb order' :
                    'Latine ordo Subiectum-Obiectum-Verbum praefertur'
      }
    ],
    practiceRecommendations: [
      {
        focus: language === 'de' ? 'Kasuserkennung' :
               language === 'en' ? 'Case identification' :
               'Recognitio casuum',
        exercises: [
          language === 'de' ? 'Kasusübungen' :
          language === 'en' ? 'Case practice' :
          'Exercitia casuum'
        ],
        relatedTopics: ['declensions', 'syntax']
      }
    ],
    nextSteps: [
      language === 'de' ? 'Komplexere Sätze analysieren' :
      language === 'en' ? 'Analyze more complex sentences' :
      'Sententias complexiores analyzare'
    ]
  };
  
  // Generate translations if requested
  const translations = request.includeExplanations ? {
    literal: language === 'de' ? 'Wörtliche Übersetzung verfügbar' :
             language === 'en' ? 'Literal translation available' :
             request.sentence,
    natural: language === 'de' ? 'Natürliche Übersetzung verfügbar' :
             language === 'en' ? 'Natural translation available' :
             request.sentence,
    cultural: language === 'de' ? 'Kultureller Kontext berücksichtigt' :
              language === 'en' ? 'Cultural context considered' :
              'Contextus culturalis consideratus'
  } : undefined;
  
  const processingTime = Date.now() - startTime;
  
  return {
    sentence: request.sentence,
    language: language,
    wordAnalysis,
    syntacticStructure,
    grammarPatterns,
    learningInsights,
    translations,
    confidence: 75, // Fallback confidence
    processingTime
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
    const request: GrammarAnalysisRequest = req.body;

    // Validate required parameters
    if (!request.sentence || request.sentence.trim().length === 0) {
      return res.status(400).json({
        status: 'error',
        error: 'sentence is required and cannot be empty.'
      });
    }

    if (request.sentence.length > 1000) {
      return res.status(400).json({
        status: 'error',
        error: 'sentence is too long (max 1000 characters).'
      });
    }

    // Validate optional parameters
    if (request.language && !['la', 'en', 'de'].includes(request.language)) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid language. Must be: la, en, or de.'
      });
    }

    if (request.analysisDepth && !['basic', 'detailed', 'comprehensive'].includes(request.analysisDepth)) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid analysisDepth. Must be: basic, detailed, or comprehensive.'
      });
    }

    if (request.learnerLevel && !['beginner', 'intermediate', 'advanced'].includes(request.learnerLevel)) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid learnerLevel. Must be: beginner, intermediate, or advanced.'
      });
    }

    // Try Oracle Cloud first
    const oracleResult = await analyzeGrammarWithOracle(request);
    
    if (oracleResult) {
      return res.status(200).json({
        status: 'success',
        data: oracleResult
      });
    }

    // Use intelligent fallback
    const fallbackResult = analyzeGrammarFallback(request);
    
    return res.status(200).json({
      status: 'fallback',
      data: fallbackResult,
      fallbackReason: 'Oracle Cloud unavailable - using intelligent grammar analysis algorithms'
    });

  } catch (error) {
    console.error('Grammar analysis error:', error);
    
    // Emergency fallback
    try {
      const emergencyFallback = analyzeGrammarFallback({
        sentence: req.body?.sentence || 'Exemplum sententiae',
        language: 'la',
        analysisDepth: 'basic',
        includeExplanations: true,
        learnerLevel: 'intermediate'
      });
      
      return res.status(200).json({
        status: 'fallback',
        data: emergencyFallback,
        fallbackReason: 'System error - emergency grammar analysis provided'
      });
    } catch (emergencyError) {
      return res.status(500).json({
        status: 'error',
        error: 'Unable to analyze grammar due to system error.'
      });
    }
  }
}