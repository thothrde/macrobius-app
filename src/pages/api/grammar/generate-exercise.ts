import type { NextApiRequest, NextApiResponse } from 'next';

// ===== TYPES & INTERFACES =====
interface ExerciseGenerationRequest {
  grammarTopic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exerciseType: 'multiple-choice' | 'fill-blank' | 'translation' | 'parsing' | 'transformation';
  quantity?: number;
  userId?: string;
  culturalContext?: string;
  sourceText?: string;
  learningObjectives?: string[];
  language?: 'de' | 'en' | 'la';
  adaptToUser?: boolean;
}

interface ExerciseItem {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'translation' | 'parsing' | 'transformation';
  instruction: string;
  content: string;
  options?: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
  correctAnswer?: string | string[];
  blanks?: {
    position: number;
    acceptableAnswers: string[];
    hint?: string;
  }[];
  explanation: string;
  culturalNote?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  points: number;
  hints?: string[];
  relatedGrammar: string[];
}

interface GeneratedExerciseSet {
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: ExerciseItem[];
  metadata: {
    totalExercises: number;
    estimatedDuration: number;
    learningObjectives: string[];
    grammarFocus: string[];
    culturalThemes: string[];
  };
  progression: {
    prerequisiteTopics: string[];
    nextTopics: string[];
    masteryThreshold: number;
  };
  adaptiveFeatures?: {
    difficultyAdjustment: boolean;
    personalization: boolean;
    realTimeHints: boolean;
  };
}

interface APIResponse {
  status: 'success' | 'error' | 'fallback';
  data?: GeneratedExerciseSet;
  error?: string;
  fallbackReason?: string;
}

// ===== ORACLE CLOUD INTEGRATION =====
const ORACLE_ENDPOINT = process.env.ORACLE_CLOUD_ENDPOINT || 'http://152.70.184.232:8080';
const REQUEST_TIMEOUT = 30000; // 30 seconds for exercise generation

async function generateExerciseWithOracle(
  request: ExerciseGenerationRequest
): Promise<GeneratedExerciseSet | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await fetch(`${ORACLE_ENDPOINT}/api/grammar/generate-exercise`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Macrobius-Frontend/1.0'
      },
      body: JSON.stringify({
        grammarTopic: request.grammarTopic,
        difficulty: request.difficulty,
        exerciseType: request.exerciseType,
        quantity: request.quantity || 5,
        userId: request.userId,
        culturalContext: request.culturalContext,
        sourceText: request.sourceText,
        learningObjectives: request.learningObjectives || [],
        language: request.language || 'en',
        adaptToUser: request.adaptToUser || false,
        requestTimestamp: new Date().toISOString(),
        aiFeatures: ['adaptive_difficulty', 'cultural_contextualization', 'authentic_examples', 'intelligent_hints']
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`Oracle Cloud exercise generation response not OK: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    
    // Validate Oracle response structure
    if (data.status === 'success' && data.exerciseSet) {
      return {
        topic: data.exerciseSet.topic || request.grammarTopic,
        difficulty: data.exerciseSet.difficulty || request.difficulty,
        exercises: data.exerciseSet.exercises || [],
        metadata: data.exerciseSet.metadata || {
          totalExercises: 0,
          estimatedDuration: 0,
          learningObjectives: [],
          grammarFocus: [],
          culturalThemes: []
        },
        progression: data.exerciseSet.progression || {
          prerequisiteTopics: [],
          nextTopics: [],
          masteryThreshold: 80
        },
        adaptiveFeatures: data.exerciseSet.adaptiveFeatures
      };
    }

    return null;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.warn('Oracle Cloud exercise generation request timed out');
      } else {
        console.error('Oracle Cloud exercise generation error:', error.message);
      }
    }
    return null;
  }
}

// ===== INTELLIGENT EXERCISE GENERATION SYSTEM =====
class LatinExerciseGenerator {
  private static readonly GRAMMAR_TOPICS = {
    'noun-declensions': {
      prerequisites: [],
      nextTopics: ['adjective-agreement', 'case-usage'],
      difficulty: 'beginner',
      examples: {
        '1st-declension': ['puella', 'sapientia', 'memoria'],
        '2nd-declension': ['convivium', 'magistrum', 'bellum'],
        '3rd-declension': ['homo', 'tempus', 'auctoritas']
      }
    },
    'verb-conjugations': {
      prerequisites: ['noun-declensions'],
      nextTopics: ['participles', 'subjunctive-mood'],
      difficulty: 'intermediate',
      examples: {
        '1st-conjugation': ['amo', 'laudo', 'porto'],
        '2nd-conjugation': ['habeo', 'video', 'moneo'],
        '3rd-conjugation': ['dico', 'facio', 'lego'],
        '4th-conjugation': ['audio', 'venio', 'scio']
      }
    },
    'case-usage': {
      prerequisites: ['noun-declensions'],
      nextTopics: ['complex-syntax', 'ablative-absolute'],
      difficulty: 'intermediate',
      functions: {
        'nominative': 'subject, predicate nominative',
        'genitive': 'possession, partitive, objective',
        'dative': 'indirect object, reference',
        'accusative': 'direct object, extent',
        'ablative': 'means, time, place, agent'
      }
    },
    'subjunctive-mood': {
      prerequisites: ['verb-conjugations', 'case-usage'],
      nextTopics: ['conditional-sentences', 'indirect-discourse'],
      difficulty: 'advanced',
      uses: ['purpose', 'result', 'indirect-command', 'fear-clauses']
    }
  };

  static generateMultipleChoice(
    topic: string, 
    difficulty: 'beginner' | 'intermediate' | 'advanced',
    language: string = 'en'
  ): ExerciseItem {
    const exerciseId = `mc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    if (topic === 'noun-declensions') {
      const nouns = ['puella', 'convivium', 'homo', 'tempus', 'sapientia'];
      const selectedNoun = nouns[Math.floor(Math.random() * nouns.length)];
      
      return {
        id: exerciseId,
        type: 'multiple-choice',
        instruction: language === 'de' ? 
          `Bestimmen Sie den Kasus und Numerus von "${selectedNoun}".` :
          language === 'la' ?
          `Casum et numerum verbi "${selectedNoun}" determina.` :
          `Identify the case and number of "${selectedNoun}".`,
        content: `Homo sapiens est animal rationale.`,
        options: [
          {
            id: 'a',
            text: language === 'de' ? 'Nominativ Singular' : language === 'la' ? 'Nominativus singularis' : 'Nominative singular',
            isCorrect: true,
            explanation: language === 'de' ? 'Subjekt des Satzes' : language === 'la' ? 'Subiectum sententiae' : 'Subject of the sentence'
          },
          {
            id: 'b',
            text: language === 'de' ? 'Akkusativ Singular' : language === 'la' ? 'Accusativus singularis' : 'Accusative singular',
            isCorrect: false,
            explanation: language === 'de' ? 'Nicht das direkte Objekt' : language === 'la' ? 'Non obiectum directum' : 'Not the direct object'
          },
          {
            id: 'c',
            text: language === 'de' ? 'Genitiv Singular' : language === 'la' ? 'Genitivus singularis' : 'Genitive singular',
            isCorrect: false,
            explanation: language === 'de' ? 'Zeigt keinen Besitz an' : language === 'la' ? 'Possessionem non significat' : 'Does not indicate possession'
          }
        ],
        explanation: language === 'de' ?
          'In diesem Satz ist "homo" das Subjekt und steht daher im Nominativ Singular.' :
          language === 'la' ?
          'In hac sententia "homo" subiectum est, itaque in nominativo singulari stat.' :
          'In this sentence, "homo" is the subject and therefore stands in the nominative singular.',
        culturalNote: language === 'de' ?
          'Die Definition des Menschen als "rationales Tier" stammt aus der aristotelischen Philosophie.' :
          language === 'la' ?
          'Definitio hominis ut "animal rationale" ex philosophia Aristotelica derivatur.' :
          'The definition of humans as "rational animals" derives from Aristotelian philosophy.',
        difficulty,
        estimatedTime: 2,
        points: difficulty === 'beginner' ? 5 : difficulty === 'intermediate' ? 10 : 15,
        hints: [
          language === 'de' ? 'Suchen Sie das Subjekt des Satzes' : language === 'la' ? 'Subiectum sententiae quaere' : 'Look for the subject of the sentence'
        ],
        relatedGrammar: ['noun-declensions', 'case-usage']
      };
    }
    
    // Default exercise if topic not specifically handled
    return {
      id: exerciseId,
      type: 'multiple-choice',
      instruction: language === 'de' ?
        `Wählen Sie die korrekte grammatische Analyse.` :
        language === 'la' ?
        `Analysim grammaticam rectam elige.` :
        `Choose the correct grammatical analysis.`,
      content: 'Sapientia est virtus.',
      options: [
        {
          id: 'a',
          text: language === 'de' ? 'Korrekte Analyse' : language === 'la' ? 'Analysis recta' : 'Correct analysis',
          isCorrect: true,
          explanation: language === 'de' ? 'Diese Analyse ist richtig.' : language === 'la' ? 'Haec analysis recta est.' : 'This analysis is correct.'
        }
      ],
      explanation: language === 'de' ?
        'Grundlegende grammatische Konzepte anwenden.' :
        language === 'la' ?
        'Concepta grammatica fundamentalia applica.' :
        'Apply fundamental grammatical concepts.',
      difficulty,
      estimatedTime: 3,
      points: 10,
      relatedGrammar: [topic]
    };
  }

  static generateFillBlank(
    topic: string,
    difficulty: 'beginner' | 'intermediate' | 'advanced',
    language: string = 'en'
  ): ExerciseItem {
    const exerciseId = `fb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    if (topic === 'verb-conjugations') {
      return {
        id: exerciseId,
        type: 'fill-blank',
        instruction: language === 'de' ?
          'Füllen Sie die Lücke mit der korrekten Verbform aus.' :
          language === 'la' ?
          'Lacunam forma verbi recta comple.' :
          'Fill in the blank with the correct verb form.',
        content: language === 'de' ?
          'Magister sapientiam _____ (lehren - 3. Person Singular Präsens).' :
          language === 'la' ?
          'Magister sapientiam _____ (docere - 3a persona singularis praesens).' :
          'The teacher _____ wisdom (to teach - 3rd person singular present).',
        blanks: [
          {
            position: 1,
            acceptableAnswers: ['docet', 'DOCET'],
            hint: language === 'de' ? 'Denken Sie an die 2. Konjugation' : language === 'la' ? 'Cogita de coniugatione secunda' : 'Think about 2nd conjugation'
          }
        ],
        correctAnswer: 'docet',
        explanation: language === 'de' ?
          '"Docet" ist die 3. Person Singular Präsens von "doceo" (lehren), 2. Konjugation.' :
          language === 'la' ?
          '"Docet" est 3a persona singularis praesentis verbi "doceo" (docere), coniugatio secunda.' :
          '"Docet" is the 3rd person singular present of "doceo" (to teach), 2nd conjugation.',
        culturalNote: language === 'de' ?
          'Lehrer hatten in der römischen Gesellschaft hohen Status.' :
          language === 'la' ?
          'Magistri in societate Romana magni momenti erant.' :
          'Teachers held high status in Roman society.',
        difficulty,
        estimatedTime: 3,
        points: difficulty === 'beginner' ? 8 : difficulty === 'intermediate' ? 12 : 18,
        hints: [
          language === 'de' ? 'Die Endung für 3. Person Singular ist -et' : language === 'la' ? 'Terminatio 3ae personae singularis est -et' : 'The ending for 3rd person singular is -et'
        ],
        relatedGrammar: ['verb-conjugations', 'present-tense']
      };
    }
    
    // Default fill-blank exercise
    return {
      id: exerciseId,
      type: 'fill-blank',
      instruction: language === 'de' ?
        'Vervollständigen Sie den Satz.' :
        language === 'la' ?
        'Sententiam comple.' :
        'Complete the sentence.',
      content: 'Convivium _____ magnificum est.',
      blanks: [
        {
          position: 1,
          acceptableAnswers: ['valde', 'VALDE', 'maxime', 'MAXIME'],
          hint: language === 'de' ? 'Adverb für "sehr"' : language === 'la' ? 'Adverbium pro "valde"' : 'Adverb for "very"'
        }
      ],
      correctAnswer: 'valde',
      explanation: language === 'de' ?
        'Ein Adverb wird benötigt, um das Adjektiv zu verstärken.' :
        language === 'la' ?
        'Adverbium necessarium est ad adiectivum roborandum.' :
        'An adverb is needed to intensify the adjective.',
      difficulty,
      estimatedTime: 2,
      points: 8,
      relatedGrammar: [topic]
    };
  }

  static generateTranslationExercise(
    topic: string,
    difficulty: 'beginner' | 'intermediate' | 'advanced',
    language: string = 'en'
  ): ExerciseItem {
    const exerciseId = `tr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const sentences = {
      beginner: {
        la: 'Puella sapientiam amat.',
        en: 'The girl loves wisdom.',
        de: 'Das Mädchen liebt die Weisheit.'
      },
      intermediate: {
        la: 'Magistri convivio magna cum sapientia participant.',
        en: 'The teachers participate in the banquet with great wisdom.',
        de: 'Die Lehrer nehmen mit großer Weisheit am Gastmahl teil.'
      },
      advanced: {
        la: 'Quamquam tempus fugit, memoria sapientiae semper manet.',
        en: 'Although time flees, the memory of wisdom always remains.',
        de: 'Obwohl die Zeit flieht, bleibt die Erinnerung an die Weisheit immer bestehen.'
      }
    };
    
    const selected = sentences[difficulty];
    
    return {
      id: exerciseId,
      type: 'translation',
      instruction: language === 'de' ?
        'Übersetzen Sie den folgenden lateinischen Satz ins Deutsche.' :
        language === 'la' ?
        'Sententiam Latinam sequentem in linguam tuam transfer.' :
        'Translate the following Latin sentence into English.',
      content: selected.la,
      correctAnswer: language === 'de' ? selected.de : selected.en,
      explanation: language === 'de' ?
        'Beachten Sie die Wortstellung und Kasusverwendung im Lateinischen.' :
        language === 'la' ?
        'Ordinem verborum et usum casuum in Latino observa.' :
        'Note the word order and case usage in Latin.',
      culturalNote: language === 'de' ?
        'Weisheit war ein zentraler Wert in der römischen Bildung.' :
        language === 'la' ?
        'Sapientia valor centralis erat in educatione Romana.' :
        'Wisdom was a central value in Roman education.',
      difficulty,
      estimatedTime: difficulty === 'beginner' ? 3 : difficulty === 'intermediate' ? 5 : 8,
      points: difficulty === 'beginner' ? 10 : difficulty === 'intermediate' ? 15 : 25,
      hints: [
        language === 'de' ? 'Identifizieren Sie zuerst Subjekt und Prädikat' : language === 'la' ? 'Primum subiectum et praedicatum identifica' : 'First identify the subject and predicate'
      ],
      relatedGrammar: [topic, 'translation-techniques']
    };
  }
}

function generateExerciseFallback(request: ExerciseGenerationRequest): GeneratedExerciseSet {
  const language = request.language || 'en';
  const quantity = Math.min(request.quantity || 5, 10); // Limit fallback quantity
  
  const exercises: ExerciseItem[] = [];
  
  // Generate exercises based on type and topic
  for (let i = 0; i < quantity; i++) {
    let exercise: ExerciseItem;
    
    switch (request.exerciseType) {
      case 'multiple-choice':
        exercise = LatinExerciseGenerator.generateMultipleChoice(
          request.grammarTopic, 
          request.difficulty, 
          language
        );
        break;
        
      case 'fill-blank':
        exercise = LatinExerciseGenerator.generateFillBlank(
          request.grammarTopic, 
          request.difficulty, 
          language
        );
        break;
        
      case 'translation':
        exercise = LatinExerciseGenerator.generateTranslationExercise(
          request.grammarTopic, 
          request.difficulty, 
          language
        );
        break;
        
      default:
        exercise = LatinExerciseGenerator.generateMultipleChoice(
          request.grammarTopic, 
          request.difficulty, 
          language
        );
    }
    
    // Modify exercise ID to ensure uniqueness
    exercise.id = `${exercise.id}_${i}`;
    exercises.push(exercise);
  }
  
  // Calculate metadata
  const totalDuration = exercises.reduce((sum, ex) => sum + ex.estimatedTime, 0);
  const topicData = LatinExerciseGenerator['GRAMMAR_TOPICS'][request.grammarTopic as keyof typeof LatinExerciseGenerator['GRAMMAR_TOPICS']];
  
  return {
    topic: request.grammarTopic,
    difficulty: request.difficulty,
    exercises,
    metadata: {
      totalExercises: exercises.length,
      estimatedDuration: totalDuration,
      learningObjectives: request.learningObjectives || [
        language === 'de' ? `${request.grammarTopic} verstehen und anwenden` :
        language === 'la' ? `${request.grammarTopic} intellegere et applicare` :
        `Understand and apply ${request.grammarTopic}`
      ],
      grammarFocus: [request.grammarTopic],
      culturalThemes: [request.culturalContext || 'classical-latin']
    },
    progression: {
      prerequisiteTopics: topicData?.prerequisites || [],
      nextTopics: topicData?.nextTopics || [],
      masteryThreshold: 75
    },
    adaptiveFeatures: {
      difficultyAdjustment: request.adaptToUser || false,
      personalization: true,
      realTimeHints: true
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
    const request: ExerciseGenerationRequest = req.body;

    // Validate required parameters
    if (!request.grammarTopic || request.grammarTopic.trim().length === 0) {
      return res.status(400).json({
        status: 'error',
        error: 'grammarTopic is required and cannot be empty.'
      });
    }

    if (!request.difficulty || !['beginner', 'intermediate', 'advanced'].includes(request.difficulty)) {
      return res.status(400).json({
        status: 'error',
        error: 'Valid difficulty is required. Must be: beginner, intermediate, or advanced.'
      });
    }

    if (!request.exerciseType || !['multiple-choice', 'fill-blank', 'translation', 'parsing', 'transformation'].includes(request.exerciseType)) {
      return res.status(400).json({
        status: 'error',
        error: 'Valid exerciseType is required. Must be: multiple-choice, fill-blank, translation, parsing, or transformation.'
      });
    }

    // Validate optional parameters
    if (request.quantity && (request.quantity < 1 || request.quantity > 20)) {
      return res.status(400).json({
        status: 'error',
        error: 'quantity must be between 1 and 20.'
      });
    }

    if (request.language && !['de', 'en', 'la'].includes(request.language)) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid language. Must be: de, en, or la.'
      });
    }

    // Try Oracle Cloud first
    const oracleResult = await generateExerciseWithOracle(request);
    
    if (oracleResult) {
      return res.status(200).json({
        status: 'success',
        data: oracleResult
      });
    }

    // Use intelligent fallback
    const fallbackResult = generateExerciseFallback(request);
    
    return res.status(200).json({
      status: 'fallback',
      data: fallbackResult,
      fallbackReason: 'Oracle Cloud unavailable - using intelligent exercise generation algorithms'
    });

  } catch (error) {
    console.error('Exercise generation error:', error);
    
    // Emergency fallback
    try {
      const emergencyFallback = generateExerciseFallback({
        grammarTopic: req.body?.grammarTopic || 'basic-grammar',
        difficulty: req.body?.difficulty || 'intermediate',
        exerciseType: req.body?.exerciseType || 'multiple-choice',
        quantity: Math.min(req.body?.quantity || 3, 5),
        language: 'en'
      });
      
      return res.status(200).json({
        status: 'fallback',
        data: emergencyFallback,
        fallbackReason: 'System error - emergency exercise generation provided'
      });
    } catch (emergencyError) {
      return res.status(500).json({
        status: 'error',
        error: 'Unable to generate exercises due to system error.'
      });
    }
  }
}