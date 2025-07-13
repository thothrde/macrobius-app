import type { NextApiRequest, NextApiResponse } from 'next';

// ===== TYPES & INTERFACES =====
interface LessonCreationRequest {
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration?: number; // in minutes
  userId?: string;
  learningObjectives?: string[];
  culturalContext?: string;
  includeExercises?: boolean;
  includeAssessment?: boolean;
  language?: 'de' | 'en' | 'la';
  adaptToUser?: boolean;
  sourceTexts?: string[];
}

interface LessonSection {
  id: string;
  type: 'introduction' | 'explanation' | 'examples' | 'practice' | 'cultural-context' | 'assessment';
  title: string;
  content: string;
  examples?: {
    latin: string;
    translation: string;
    analysis: string;
    culturalNote?: string;
  }[];
  exercises?: {
    id: string;
    type: string;
    instruction: string;
    content: string;
    answer: string;
  }[];
  visualAids?: {
    type: 'table' | 'diagram' | 'chart';
    title: string;
    content: string;
  }[];
  estimatedTime: number;
}

interface LearningPath {
  currentLesson: string;
  prerequisites: string[];
  nextLessons: string[];
  progressIndicators: {
    completed: boolean;
    masteryLevel: number;
    timeSpent: number;
  };
}

interface CulturalContext {
  historicalBackground: string;
  socialSignificance: string;
  literaryExamples: string[];
  modernRelevance: string;
  keyFigures?: string[];
}

interface Assessment {
  id: string;
  type: 'formative' | 'summative';
  questions: {
    id: string;
    type: 'multiple-choice' | 'short-answer' | 'essay';
    question: string;
    options?: string[];
    correctAnswer: string;
    points: number;
  }[];
  passingScore: number;
  timeLimit?: number;
}

interface GeneratedLesson {
  id: string;
  title: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number;
  learningObjectives: string[];
  sections: LessonSection[];
  culturalContext?: CulturalContext;
  learningPath: LearningPath;
  assessment?: Assessment;
  resources: {
    type: 'reference' | 'additional-reading' | 'multimedia';
    title: string;
    description: string;
    url?: string;
  }[];
  metadata: {
    createdDate: string;
    language: string;
    adaptiveFeatures: boolean;
    sourceTexts: string[];
    grammarFocus: string[];
  };
}

interface APIResponse {
  status: 'success' | 'error' | 'fallback';
  data?: GeneratedLesson;
  error?: string;
  fallbackReason?: string;
}

// ===== ORACLE CLOUD INTEGRATION =====
const ORACLE_ENDPOINT = process.env.ORACLE_CLOUD_ENDPOINT || 'http://152.70.184.232:8080';
const REQUEST_TIMEOUT = 35000; // 35 seconds for lesson creation

async function createLessonWithOracle(
  request: LessonCreationRequest
): Promise<GeneratedLesson | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await fetch(`${ORACLE_ENDPOINT}/api/grammar/create-lesson`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Macrobius-Frontend/1.0'
      },
      body: JSON.stringify({
        topic: request.topic,
        difficulty: request.difficulty,
        duration: request.duration || 30,
        userId: request.userId,
        learningObjectives: request.learningObjectives || [],
        culturalContext: request.culturalContext,
        includeExercises: request.includeExercises !== false,
        includeAssessment: request.includeAssessment !== false,
        language: request.language || 'en',
        adaptToUser: request.adaptToUser || false,
        sourceTexts: request.sourceTexts || [],
        requestTimestamp: new Date().toISOString(),
        aiFeatures: ['adaptive_content', 'cultural_integration', 'authentic_examples', 'progressive_difficulty']
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`Oracle Cloud lesson creation response not OK: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    
    // Validate Oracle response structure
    if (data.status === 'success' && data.lesson) {
      return {
        id: data.lesson.id || `lesson_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: data.lesson.title || request.topic,
        topic: data.lesson.topic || request.topic,
        difficulty: data.lesson.difficulty || request.difficulty,
        estimatedDuration: data.lesson.estimatedDuration || request.duration || 30,
        learningObjectives: data.lesson.learningObjectives || [],
        sections: data.lesson.sections || [],
        culturalContext: data.lesson.culturalContext,
        learningPath: data.lesson.learningPath || {
          currentLesson: request.topic,
          prerequisites: [],
          nextLessons: [],
          progressIndicators: {
            completed: false,
            masteryLevel: 0,
            timeSpent: 0
          }
        },
        assessment: data.lesson.assessment,
        resources: data.lesson.resources || [],
        metadata: data.lesson.metadata || {
          createdDate: new Date().toISOString(),
          language: request.language || 'en',
          adaptiveFeatures: request.adaptToUser || false,
          sourceTexts: request.sourceTexts || [],
          grammarFocus: [request.topic]
        }
      };
    }

    return null;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.warn('Oracle Cloud lesson creation request timed out');
      } else {
        console.error('Oracle Cloud lesson creation error:', error.message);
      }
    }
    return null;
  }
}

// ===== INTELLIGENT LESSON CREATION SYSTEM =====
class LatinLessonCreator {
  private static readonly LESSON_TEMPLATES = {
    'noun-declensions': {
      title: {
        de: 'Lateinische Substantivdeklination',
        en: 'Latin Noun Declensions',
        la: 'Declinationes Nominum Latinorum'
      },
      objectives: {
        de: [
          'Die fünf Deklinationen der lateinischen Substantive verstehen',
          'Kasus und Numerus korrekt identifizieren',
          'Deklinationsendungen anwenden'
        ],
        en: [
          'Understand the five Latin noun declensions',
          'Correctly identify case and number',
          'Apply declension endings'
        ],
        la: [
          'Quinque declinationes nominum Latinorum intellegere',
          'Casum et numerum recte identificare',
          'Terminationes declinationum applicare'
        ]
      },
      prerequisites: [],
      nextTopics: ['adjective-agreement', 'case-usage']
    },
    'verb-conjugations': {
      title: {
        de: 'Lateinische Verbkonjugation',
        en: 'Latin Verb Conjugations',
        la: 'Coniugationes Verborum Latinorum'
      },
      objectives: {
        de: [
          'Die vier Konjugationen verstehen',
          'Tempusformen bilden',
          'Person und Numerus erkennen'
        ],
        en: [
          'Understand the four conjugations',
          'Form tense structures',
          'Recognize person and number'
        ],
        la: [
          'Quattuor coniugationes intellegere',
          'Formas temporum facere',
          'Personam et numerum agnoscere'
        ]
      },
      prerequisites: ['noun-declensions'],
      nextTopics: ['participles', 'subjunctive-mood']
    },
    'case-usage': {
      title: {
        de: 'Kasusverwendung im Lateinischen',
        en: 'Latin Case Usage',
        la: 'Usus Casuum in Latino'
      },
      objectives: {
        de: [
          'Funktionen der sechs Kasus verstehen',
          'Kasus im Kontext erkennen',
          'Syntaktische Rollen analysieren'
        ],
        en: [
          'Understand the functions of the six cases',
          'Recognize cases in context',
          'Analyze syntactic roles'
        ],
        la: [
          'Functiones sex casuum intellegere',
          'Casus in contextu agnoscere',
          'Munera syntactica analyzare'
        ]
      },
      prerequisites: ['noun-declensions'],
      nextTopics: ['complex-syntax', 'ablative-absolute']
    }
  };

  static createIntroductionSection(
    topic: string,
    language: string = 'en'
  ): LessonSection {
    const sectionId = `intro_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    if (topic === 'noun-declensions') {
      return {
        id: sectionId,
        type: 'introduction',
        title: language === 'de' ? 'Einführung in die Substantivdeklination' :
               language === 'la' ? 'Introductio ad Declinationes Nominum' :
               'Introduction to Noun Declensions',
        content: language === 'de' ?
          'Lateinische Substantive ändern ihre Endungen je nach ihrer Funktion im Satz. Diese Veränderungen nennt man Deklination. Es gibt fünf Hauptdeklinationen, die jeweils charakteristische Endungen haben.' :
          language === 'la' ?
          'Nomina Latina terminationes suas mutant secundum functionem suam in sententia. Hae mutationes declinationes vocantur. Quinque declinationes principales sunt, quae terminationes characteristicas habent.' :
          'Latin nouns change their endings according to their function in the sentence. These changes are called declensions. There are five main declensions, each with characteristic endings.',
        examples: [
          {
            latin: 'Puella (nominative) → Puellam (accusative)',
            translation: language === 'de' ? 'Das Mädchen → das Mädchen (als Objekt)' :
                        language === 'la' ? 'Puella → Puellam (ut obiectum)' :
                        'The girl → the girl (as object)',
            analysis: language === 'de' ? '1. Deklination: -a wird zu -am im Akkusativ' :
                     language === 'la' ? 'Declinatio prima: -a fit -am in accusativo' :
                     '1st declension: -a becomes -am in accusative',
            culturalNote: language === 'de' ? 'Puella war ein häufiger Name in römischen Texten' :
                         language === 'la' ? 'Puella nomen frequens erat in textibus Romanis' :
                         'Puella was a common name in Roman texts'
          }
        ],
        estimatedTime: 5
      };
    }
    
    // Default introduction
    return {
      id: sectionId,
      type: 'introduction',
      title: language === 'de' ? `Einführung in ${topic}` :
             language === 'la' ? `Introductio ad ${topic}` :
             `Introduction to ${topic}`,
      content: language === 'de' ?
        `Dieses Thema ist fundamental für das Verständnis der lateinischen Grammatik.` :
        language === 'la' ?
        `Hoc argumentum fundamentale est ad grammaticam Latinam intellegendam.` :
        `This topic is fundamental to understanding Latin grammar.`,
      examples: [],
      estimatedTime: 3
    };
  }

  static createExplanationSection(
    topic: string,
    difficulty: 'beginner' | 'intermediate' | 'advanced',
    language: string = 'en'
  ): LessonSection {
    const sectionId = `expl_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    if (topic === 'noun-declensions') {
      return {
        id: sectionId,
        type: 'explanation',
        title: language === 'de' ? 'Die fünf Deklinationen' :
               language === 'la' ? 'Quinque Declinationes' :
               'The Five Declensions',
        content: language === 'de' ?
          'Jede Deklination hat charakteristische Endungen:\n\n**1. Deklination:** Feminin (meist), Endung -a\n**2. Deklination:** Maskulin/Neutrum, Endungen -us/-um\n**3. Deklination:** Alle Geschlechter, verschiedene Endungen\n**4. Deklination:** Maskulin/Neutrum, Endung -us\n**5. Deklination:** Feminin (meist), Endung -es' :
          language === 'la' ?
          'Quaeque declinatio terminationes characteristicas habet:\n\n**Declinatio Prima:** Feminina (plerumque), terminatio -a\n**Declinatio Secunda:** Masculina/Neutra, terminationes -us/-um\n**Declinatio Tertia:** Omnia genera, terminationes variae\n**Declinatio Quarta:** Masculina/Neutra, terminatio -us\n**Declinatio Quinta:** Feminina (plerumque), terminatio -es' :
          'Each declension has characteristic endings:\n\n**1st Declension:** Feminine (mostly), ending -a\n**2nd Declension:** Masculine/Neuter, endings -us/-um\n**3rd Declension:** All genders, various endings\n**4th Declension:** Masculine/Neuter, ending -us\n**5th Declension:** Feminine (mostly), ending -es',
        visualAids: [
          {
            type: 'table',
            title: language === 'de' ? 'Deklinationstabelle' :
                   language === 'la' ? 'Tabula Declinationum' :
                   'Declension Table',
            content: `
| Case | 1st (-a) | 2nd (-us) | 2nd (-um) | 3rd (cons.) |
|------|----------|-----------|-----------|-------------|
| Nom. | puell-a  | magistr-us| bell-um   | rex         |
| Gen. | puell-ae | magistr-i | bell-i    | reg-is      |
| Dat. | puell-ae | magistr-o | bell-o    | reg-i       |
| Acc. | puell-am | magistr-um| bell-um   | reg-em      |
| Abl. | puell-a  | magistr-o | bell-o    | reg-e       |
            `
          }
        ],
        examples: [
          {
            latin: 'Sapientia puellae magna est.',
            translation: language === 'de' ? 'Die Weisheit des Mädchens ist groß.' :
                        language === 'la' ? 'Sapientia puellae magna est.' :
                        'The wisdom of the girl is great.',
            analysis: language === 'de' ? 'puellae = Genitiv Singular (Besitz)' :
                     language === 'la' ? 'puellae = genitivus singularis (possessio)' :
                     'puellae = genitive singular (possession)'
          }
        ],
        estimatedTime: 10
      };
    }
    
    // Default explanation
    return {
      id: sectionId,
      type: 'explanation',
      title: language === 'de' ? `Erklärung: ${topic}` :
             language === 'la' ? `Explicatio: ${topic}` :
             `Explanation: ${topic}`,
      content: language === 'de' ?
        `Detaillierte Erklärung der grammatischen Konzepte zu ${topic}.` :
        language === 'la' ?
        `Explicatio detaliata conceptuum grammaticorum de ${topic}.` :
        `Detailed explanation of grammatical concepts for ${topic}.`,
      examples: [],
      estimatedTime: 8
    };
  }

  static createPracticeSection(
    topic: string,
    difficulty: 'beginner' | 'intermediate' | 'advanced',
    language: string = 'en'
  ): LessonSection {
    const sectionId = `prac_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const exercises = [
      {
        id: `ex_${sectionId}_1`,
        type: 'identification',
        instruction: language === 'de' ? 'Identifizieren Sie Kasus und Numerus:' :
                    language === 'la' ? 'Casum et numerum identifica:' :
                    'Identify case and number:',
        content: 'puellam',
        answer: language === 'de' ? 'Akkusativ Singular' :
               language === 'la' ? 'accusativus singularis' :
               'accusative singular'
      },
      {
        id: `ex_${sectionId}_2`,
        type: 'completion',
        instruction: language === 'de' ? 'Vervollständigen Sie die Deklination:' :
                    language === 'la' ? 'Declinationem comple:' :
                    'Complete the declension:',
        content: 'sapienti___ (dative singular)',
        answer: 'sapientiae'
      }
    ];
    
    return {
      id: sectionId,
      type: 'practice',
      title: language === 'de' ? 'Übungsaufgaben' :
             language === 'la' ? 'Exercitationes' :
             'Practice Exercises',
      content: language === 'de' ?
        'Wenden Sie Ihr Wissen in diesen Übungen an:' :
        language === 'la' ?
        'Scientiam tuam in his exercitationibus applica:' :
        'Apply your knowledge in these exercises:',
      exercises,
      estimatedTime: 12
    };
  }

  static createCulturalContextSection(
    topic: string,
    language: string = 'en'
  ): LessonSection {
    const sectionId = `cult_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      id: sectionId,
      type: 'cultural-context',
      title: language === 'de' ? 'Kultureller Kontext' :
             language === 'la' ? 'Contextus Culturalis' :
             'Cultural Context',
      content: language === 'de' ?
        'Die lateinische Grammatik spiegelt die römische Weltanschauung wider. Die präzisen Kasusendungen ermöglichten komplexe rechtliche und philosophische Texte, die das Fundament der westlichen Zivilisation bildeten.' :
        language === 'la' ?
        'Grammatica Latina mentem Romanam reflectit. Terminationes casuum precisae textus iuridicos et philosophicos complexos permiserunt, qui fundamentum civilizationis occidentalis constituerunt.' :
        'Latin grammar reflects the Roman worldview. The precise case endings enabled complex legal and philosophical texts that formed the foundation of Western civilization.',
      examples: [
        {
          latin: 'Senatus Populusque Romanus',
          translation: language === 'de' ? 'Der Senat und das Volk von Rom' :
                      language === 'la' ? 'Senatus Populusque Romanus' :
                      'The Senate and People of Rome',
          analysis: language === 'de' ? 'Nominativ-Konstruktion zeigt gleichberechtigte Macht' :
                   language === 'la' ? 'Constructio nominativa potestatem aequalem ostendit' :
                   'Nominative construction shows equal power',
          culturalNote: language === 'de' ? 'Offizielle Bezeichnung der römischen Republik' :
                       language === 'la' ? 'Designatio officialis rei publicae Romanae' :
                       'Official designation of the Roman Republic'
        }
      ],
      estimatedTime: 8
    };
  }
}

function createLessonFallback(request: LessonCreationRequest): GeneratedLesson {
  const language = request.language || 'en';
  const lessonId = `lesson_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const template = LatinLessonCreator['LESSON_TEMPLATES'][request.topic as keyof typeof LatinLessonCreator['LESSON_TEMPLATES']];
  
  // Create lesson sections
  const sections: LessonSection[] = [];
  
  // Introduction
  sections.push(LatinLessonCreator.createIntroductionSection(request.topic, language));
  
  // Explanation
  sections.push(LatinLessonCreator.createExplanationSection(request.topic, request.difficulty, language));
  
  // Practice (if requested)
  if (request.includeExercises !== false) {
    sections.push(LatinLessonCreator.createPracticeSection(request.topic, request.difficulty, language));
  }
  
  // Cultural context
  if (request.culturalContext) {
    sections.push(LatinLessonCreator.createCulturalContextSection(request.topic, language));
  }
  
  // Calculate total duration
  const estimatedDuration = sections.reduce((total, section) => total + section.estimatedTime, 0);
  
  // Create assessment if requested
  let assessment: Assessment | undefined;
  if (request.includeAssessment !== false) {
    assessment = {
      id: `assessment_${lessonId}`,
      type: 'formative',
      questions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: language === 'de' ? 
            `Was ist das Hauptmerkmal der ${request.topic}?` :
            language === 'la' ?
            `Quid est praecipua nota ${request.topic}?` :
            `What is the main characteristic of ${request.topic}?`,
          options: [
            language === 'de' ? 'Endungsänderungen' : language === 'la' ? 'Mutationes terminationum' : 'Ending changes',
            language === 'de' ? 'Wortstellung' : language === 'la' ? 'Ordo verborum' : 'Word order',
            language === 'de' ? 'Aussprache' : language === 'la' ? 'Pronuntiatio' : 'Pronunciation'
          ],
          correctAnswer: language === 'de' ? 'Endungsänderungen' : language === 'la' ? 'Mutationes terminationum' : 'Ending changes',
          points: 10
        }
      ],
      passingScore: 70,
      timeLimit: 10
    };
  }
  
  return {
    id: lessonId,
    title: template?.title[language as keyof typeof template.title] || 
           (language === 'de' ? `Lektion: ${request.topic}` : 
            language === 'la' ? `Lectio: ${request.topic}` :
            `Lesson: ${request.topic}`),
    topic: request.topic,
    difficulty: request.difficulty,
    estimatedDuration: request.duration || estimatedDuration,
    learningObjectives: request.learningObjectives || 
                       template?.objectives[language as keyof typeof template.objectives] || 
                       [language === 'de' ? `${request.topic} verstehen` :
                        language === 'la' ? `${request.topic} intellegere` :
                        `Understand ${request.topic}`],
    sections,
    culturalContext: request.culturalContext ? {
      historicalBackground: language === 'de' ? 
        'Römische Grammatik entwickelte sich über Jahrhunderte.' :
        language === 'la' ?
        'Grammatica Romana per saecula evoluta est.' :
        'Roman grammar evolved over centuries.',
      socialSignificance: language === 'de' ?
        'Lateinische Bildung war Zeichen des sozialen Status.' :
        language === 'la' ?
        'Eruditio Latina signum status socialis erat.' :
        'Latin education was a sign of social status.',
      literaryExamples: ['Cicero', 'Vergil', 'Ovid', 'Macrobius'],
      modernRelevance: language === 'de' ?
        'Lateinische Grammatik beeinflusst moderne Sprachen.' :
        language === 'la' ?
        'Grammatica Latina linguas modernas influit.' :
        'Latin grammar influences modern languages.'
    } : undefined,
    learningPath: {
      currentLesson: request.topic,
      prerequisites: template?.prerequisites || [],
      nextLessons: template?.nextTopics || [],
      progressIndicators: {
        completed: false,
        masteryLevel: 0,
        timeSpent: 0
      }
    },
    assessment,
    resources: [
      {
        type: 'reference',
        title: language === 'de' ? 'Lateinische Grammatik-Referenz' :
               language === 'la' ? 'Referentia Grammaticae Latinae' :
               'Latin Grammar Reference',
        description: language === 'de' ? 
          'Umfassende Referenz für lateinische Grammatik' :
          language === 'la' ?
          'Referentia comprehensiva grammaticae Latinae' :
          'Comprehensive reference for Latin grammar'
      },
      {
        type: 'additional-reading',
        title: 'Macrobius Saturnalia',
        description: language === 'de' ?
          'Authentische lateinische Texte für praktische Anwendung' :
          language === 'la' ?
          'Textus Latini authentici ad applicationem practicam' :
          'Authentic Latin texts for practical application'
      }
    ],
    metadata: {
      createdDate: new Date().toISOString(),
      language,
      adaptiveFeatures: request.adaptToUser || false,
      sourceTexts: request.sourceTexts || ['Macrobius'],
      grammarFocus: [request.topic]
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
    const request: LessonCreationRequest = req.body;

    // Validate required parameters
    if (!request.topic || request.topic.trim().length === 0) {
      return res.status(400).json({
        status: 'error',
        error: 'topic is required and cannot be empty.'
      });
    }

    if (!request.difficulty || !['beginner', 'intermediate', 'advanced'].includes(request.difficulty)) {
      return res.status(400).json({
        status: 'error',
        error: 'Valid difficulty is required. Must be: beginner, intermediate, or advanced.'
      });
    }

    // Validate optional parameters
    if (request.duration && (request.duration < 5 || request.duration > 120)) {
      return res.status(400).json({
        status: 'error',
        error: 'duration must be between 5 and 120 minutes.'
      });
    }

    if (request.language && !['de', 'en', 'la'].includes(request.language)) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid language. Must be: de, en, or la.'
      });
    }

    // Try Oracle Cloud first
    const oracleResult = await createLessonWithOracle(request);
    
    if (oracleResult) {
      return res.status(200).json({
        status: 'success',
        data: oracleResult
      });
    }

    // Use intelligent fallback
    const fallbackResult = createLessonFallback(request);
    
    return res.status(200).json({
      status: 'fallback',
      data: fallbackResult,
      fallbackReason: 'Oracle Cloud unavailable - using intelligent lesson creation algorithms'
    });

  } catch (error) {
    console.error('Lesson creation error:', error);
    
    // Emergency fallback
    try {
      const emergencyFallback = createLessonFallback({
        topic: req.body?.topic || 'basic-grammar',
        difficulty: req.body?.difficulty || 'intermediate',
        duration: Math.min(req.body?.duration || 30, 60),
        language: 'en'
      });
      
      return res.status(200).json({
        status: 'fallback',
        data: emergencyFallback,
        fallbackReason: 'System error - emergency lesson creation provided'
      });
    } catch (emergencyError) {
      return res.status(500).json({
        status: 'error',
        error: 'Unable to create lesson due to system error.'
      });
    }
  }
}