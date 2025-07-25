import type { NextApiRequest, NextApiResponse } from 'next';

// ===== TYPES & INTERFACES =====
interface QuizQuestionRequest {
  topic?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  questionType?: 'multiple-choice' | 'fill-blank' | 'translation' | 'grammar';
  culturalTheme?: string;
  passageId?: string;
  userId?: string;
  language?: 'de' | 'en' | 'la';
}

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

interface QuizQuestionResponse {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'translation' | 'grammar';
  question: string;
  options?: QuizOption[];
  correctAnswer?: string;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  culturalContext?: string;
  sourcePassage?: {
    id: string;
    text: string;
    work: string;
    book: number;
    chapter: number;
  };
  hints?: string[];
  timeLimit?: number;
  points: number;
}

interface APIResponse {
  status: 'success' | 'error' | 'fallback';
  data?: QuizQuestionResponse;
  error?: string;
  fallbackReason?: string;
}

// ===== ORACLE CLOUD INTEGRATION =====
const ORACLE_ENDPOINT = process.env.ORACLE_CLOUD_ENDPOINT || 'http://152.70.184.232:8080';
const REQUEST_TIMEOUT = 25000; // 25 seconds

async function generateQuestionFromOracle(
  request: QuizQuestionRequest
): Promise<QuizQuestionResponse | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await fetch(`${ORACLE_ENDPOINT}/api/quiz/generate-question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Macrobius-Frontend/1.0'
      },
      body: JSON.stringify({
        topic: request.topic || 'general',
        difficulty: request.difficulty || 'intermediate',
        questionType: request.questionType || 'multiple-choice',
        culturalTheme: request.culturalTheme,
        passageId: request.passageId,
        userId: request.userId,
        language: request.language || 'en',
        requestTimestamp: new Date().toISOString()
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`Oracle Cloud response not OK: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    
    // Validate Oracle response structure
    if (data.status === 'success' && data.question) {
      return {
        id: data.question.id || `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: data.question.type || request.questionType || 'multiple-choice',
        question: data.question.question,
        options: data.question.options || [],
        correctAnswer: data.question.correctAnswer,
        explanation: data.question.explanation || '',
        difficulty: data.question.difficulty || request.difficulty || 'intermediate',
        culturalContext: data.question.culturalContext,
        sourcePassage: data.question.sourcePassage,
        hints: data.question.hints || [],
        timeLimit: data.question.timeLimit || 60,
        points: data.question.points || 10
      };
    }

    return null;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.warn('Oracle Cloud request timed out');
      } else {
        console.error('Oracle Cloud connection error:', error.message);
      }
    }
    return null;
  }
}

// ===== INTELLIGENT FALLBACK SYSTEM =====
function generateIntelligentFallback(
  request: QuizQuestionRequest
): QuizQuestionResponse {
  const difficulty = request.difficulty || 'intermediate';
  const questionType = request.questionType || 'multiple-choice';
  const language = request.language || 'en';
  const questionId = `fallback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Cultural themes mapping
  const culturalThemes = {
    'religious-practices': {
      de: 'Religiöse Praktiken im antiken Rom',
      en: 'Religious practices in ancient Rome',
      la: 'Ritus religiosi antiqui Romani'
    },
    'social-customs': {
      de: 'Gesellschaftliche Bräuche',
      en: 'Social customs',
      la: 'Mores sociales'
    },
    'philosophy': {
      de: 'Philosophie',
      en: 'Philosophy',
      la: 'Philosophia'
    }
  };

  // Difficulty-based question pools with all question types
  const questionPools = {
    beginner: {
      'multiple-choice': {
        de: {
          question: "Was war ein wichtiges Element der römischen Saturnalia?",
          options: [
            { id: "a", text: "Geschenke austauschen", isCorrect: true, explanation: "Geschenkaustausch war zentral für die Saturnalia." },
            { id: "b", text: "Fasten", isCorrect: false, explanation: "Fasten war nicht Teil der Saturnalia." },
            { id: "c", text: "Militärische Übungen", isCorrect: false, explanation: "Militärische Aktivitäten waren suspendiert." },
            { id: "d", text: "Handel", isCorrect: false, explanation: "Geschäftstätigkeiten waren eingestellt." }
          ],
          explanation: "Die Saturnalia waren bekannt für Geschenkaustausch und gesellschaftliche Umkehrung."
        },
        en: {
          question: "What was an important element of the Roman Saturnalia?",
          options: [
            { id: "a", text: "Gift exchange", isCorrect: true, explanation: "Gift exchange was central to Saturnalia celebrations." },
            { id: "b", text: "Fasting", isCorrect: false, explanation: "Fasting was not part of Saturnalia." },
            { id: "c", text: "Military exercises", isCorrect: false, explanation: "Military activities were suspended." },
            { id: "d", text: "Trading", isCorrect: false, explanation: "Business activities were halted." }
          ],
          explanation: "Saturnalia was famous for gift exchange and social role reversal."
        },
        la: {
          question: "Quid erat elementum importante Saturnaliorum Romanorum?",
          options: [
            { id: "a", text: "Munera commutare", isCorrect: true, explanation: "Commutatio munerum centralis erat Saturnalibus." },
            { id: "b", text: "Ieiunium", isCorrect: false, explanation: "Ieiunium non erat pars Saturnaliorum." },
            { id: "c", text: "Exercitia militaria", isCorrect: false, explanation: "Actiones militares suspensae erant." },
            { id: "d", text: "Mercatura", isCorrect: false, explanation: "Negotia cessabant." }
          ],
          explanation: "Saturnalia nota erant propter commutationem munerum et inversionem socialem."
        }
      },
      'grammar': {
        de: {
          question: "Welcher Kasus wird für das direkte Objekt im Lateinischen verwendet?",
          options: [
            { id: "a", text: "Akkusativ", isCorrect: true, explanation: "Der Akkusativ ist der Kasus des direkten Objekts." },
            { id: "b", text: "Nominativ", isCorrect: false, explanation: "Der Nominativ ist der Kasus des Subjekts." },
            { id: "c", text: "Genitiv", isCorrect: false, explanation: "Der Genitiv zeigt Besitz oder Zugehörigkeit an." },
            { id: "d", text: "Dativ", isCorrect: false, explanation: "Der Dativ ist der Kasus des indirekten Objekts." }
          ],
          explanation: "Der Akkusativ kennzeichnet das direkte Objekt der Handlung."
        },
        en: {
          question: "Which case is used for the direct object in Latin?",
          options: [
            { id: "a", text: "Accusative", isCorrect: true, explanation: "The accusative case marks the direct object." },
            { id: "b", text: "Nominative", isCorrect: false, explanation: "The nominative case marks the subject." },
            { id: "c", text: "Genitive", isCorrect: false, explanation: "The genitive case shows possession or relationship." },
            { id: "d", text: "Dative", isCorrect: false, explanation: "The dative case marks the indirect object." }
          ],
          explanation: "The accusative case identifies the direct object of the action."
        },
        la: {
          question: "Quis casus adhibetur pro obiecto directo in lingua Latina?",
          options: [
            { id: "a", text: "Accusativus", isCorrect: true, explanation: "Accusativus casus obiectum directum significat." },
            { id: "b", text: "Nominativus", isCorrect: false, explanation: "Nominativus casus subiectum significat." },
            { id: "c", text: "Genitivus", isCorrect: false, explanation: "Genitivus casus possessionem vel relationem ostendit." },
            { id: "d", text: "Dativus", isCorrect: false, explanation: "Dativus casus obiectum indirectum significat." }
          ],
          explanation: "Accusativus casus obiectum directum actionis identificat."
        }
      },
      'translation': {
        de: {
          question: "Übersetzen Sie: 'Puella librum legit'",
          correctAnswer: "Das Mädchen liest das Buch",
          explanation: "Eine einfache lateinische Sentence mit Subjekt-Objekt-Verb Struktur."
        },
        en: {
          question: "Translate: 'Puella librum legit'",
          correctAnswer: "The girl reads the book",
          explanation: "A simple Latin sentence with Subject-Object-Verb structure."
        },
        la: {
          question: "Vertite: 'Puella librum legit'",
          correctAnswer: "Puella librum legit",
          explanation: "Sententia simplex Latina cum structura Subiectum-Obiectum-Verbum."
        }
      },
      'fill-blank': {
        de: {
          question: "Füllen Sie die Lücke: 'Homo sapiens _____ animal rationale.'",
          correctAnswer: "est",
          explanation: "'Est' ist die 3. Person Singular von 'esse' (sein)."
        },
        en: {
          question: "Fill in the blank: 'Homo sapiens _____ animal rationale.'",
          correctAnswer: "est",
          explanation: "'Est' is the 3rd person singular of 'esse' (to be)."
        },
        la: {
          question: "Complete lacunam: 'Homo sapiens _____ animal rationale.'",
          correctAnswer: "est",
          explanation: "'Est' tertia persona singularis verbi 'esse'."
        }
      }
    },
    intermediate: {
      'multiple-choice': {
        de: {
          question: "Welche Rolle spielte Macrobius in der Erhaltung klassischer Literatur?",
          options: [
            { id: "a", text: "Er sammelte und kommentierte antike Texte", isCorrect: true, explanation: "Macrobius war wichtig für die Transmission klassischer Werke." },
            { id: "b", text: "Er schrieb nur originale Werke", isCorrect: false, explanation: "Macrobius zitierte und kommentierte viele ältere Autoren." },
            { id: "c", text: "Er übersetzte griechische Texte", isCorrect: false, explanation: "Seine Hauptleistung war Sammlung und Kommentierung." },
            { id: "d", text: "Er kritisierte antike Autoren", isCorrect: false, explanation: "Er bewahrte und ehrte die klassische Tradition." }
          ],
          explanation: "Macrobius war ein wichtiger Vermittler klassischer Bildung in der Spätantike."
        },
        en: {
          question: "What role did Macrobius play in preserving classical literature?",
          options: [
            { id: "a", text: "He collected and commented on ancient texts", isCorrect: true, explanation: "Macrobius was crucial for transmitting classical works." },
            { id: "b", text: "He only wrote original works", isCorrect: false, explanation: "Macrobius quoted and commented on many earlier authors." },
            { id: "c", text: "He translated Greek texts", isCorrect: false, explanation: "His main contribution was collection and commentary." },
            { id: "d", text: "He criticized ancient authors", isCorrect: false, explanation: "He preserved and honored classical tradition." }
          ],
          explanation: "Macrobius was a vital mediator of classical learning in Late Antiquity."
        },
        la: {
          question: "Quod munus habuit Macrobius in conservandis litteris classicis?",
          options: [
            { id: "a", text: "Textus antiquos collegit et commentatus est", isCorrect: true, explanation: "Macrobius crucialis erat ad opera classica transmittenda." },
            { id: "b", text: "Solum opera originalia scripsit", isCorrect: false, explanation: "Macrobius multos auctores priores citavit et commentatus est." },
            { id: "c", text: "Textus Graecos transtulit", isCorrect: false, explanation: "Praecipua eius contributio erat collectio et commentarium." },
            { id: "d", text: "Auctores antiquos vituperavit", isCorrect: false, explanation: "Traditionem classicam conservavit et honoravit." }
          ],
          explanation: "Macrobius mediator vitalis erat eruditionis classicae in Antiquitate Sera."
        }
      },
      'grammar': {
        de: {
          question: "Was ist ein Ablativus Absolutus?",
          options: [
            { id: "a", text: "Eine unabhängige Partizipialkonstruktion", isCorrect: true, explanation: "Der Ablativus Absolutus ist grammatisch unabhängig vom Hauptsatz." },
            { id: "b", text: "Ein abhängiger Genitiv", isCorrect: false, explanation: "Der Ablativus Absolutus steht im Ablativ, nicht im Genitiv." },
            { id: "c", text: "Ein Akkusativ mit Infinitiv", isCorrect: false, explanation: "Das ist eine andere lateinische Konstruktion." },
            { id: "d", text: "Ein Vokativ", isCorrect: false, explanation: "Der Vokativ ist der Anredefall." }
          ],
          explanation: "Der Ablativus Absolutus drückt Nebenumstände aus."
        },
        en: {
          question: "What is an Ablativus Absolutus?",
          options: [
            { id: "a", text: "An independent participial construction", isCorrect: true, explanation: "The Ablativus Absolutus is grammatically independent from the main clause." },
            { id: "b", text: "A dependent genitive", isCorrect: false, explanation: "The Ablativus Absolutus uses ablative case, not genitive." },
            { id: "c", text: "An accusative with infinitive", isCorrect: false, explanation: "That's a different Latin construction." },
            { id: "d", text: "A vocative", isCorrect: false, explanation: "The vocative is the case of address." }
          ],
          explanation: "The Ablativus Absolutus expresses attendant circumstances."
        },
        la: {
          question: "Quid est Ablativus Absolutus?",
          options: [
            { id: "a", text: "Constructio participialis independens", isCorrect: true, explanation: "Ablativus Absolutus grammatice independens est a sententia principali." },
            { id: "b", text: "Genitivus dependens", isCorrect: false, explanation: "Ablativus Absolutus casu ablativo, non genitivo utitur." },
            { id: "c", text: "Accusativus cum infinitivo", isCorrect: false, explanation: "Haec alia constructio Latina est." },
            { id: "d", text: "Vocativus", isCorrect: false, explanation: "Vocativus casus allocutionis est." }
          ],
          explanation: "Ablativus Absolutus circumstantias concomitantes exprimit."
        }
      },
      'translation': {
        de: {
          question: "Übersetzen Sie: 'Caesar Gallos vicit'",
          correctAnswer: "Caesar besiegte die Gallier",
          explanation: "Perfekt von 'vincere' mit Akkusativobjekt."
        },
        en: {
          question: "Translate: 'Caesar Gallos vicit'",
          correctAnswer: "Caesar conquered the Gauls",
          explanation: "Perfect tense of 'vincere' with accusative object."
        },
        la: {
          question: "Vertite: 'Caesar Gallos vicit'",
          correctAnswer: "Caesar Gallos vicit",
          explanation: "Tempus perfectum verbi 'vincere' cum obiecto accusativo."
        }
      },
      'fill-blank': {
        de: {
          question: "Ergänzen Sie: 'Magistri _____ docent.' (Die Lehrer lehren die Schüler)",
          correctAnswer: "discipulos",
          explanation: "'Discipulos' ist Akkusativ Plural von 'discipulus'."
        },
        en: {
          question: "Complete: 'Magistri _____ docent.' (The teachers teach the students)",
          correctAnswer: "discipulos",
          explanation: "'Discipulos' is accusative plural of 'discipulus'."
        },
        la: {
          question: "Complete: 'Magistri _____ docent.' (Magistri discipulos docent)",
          correctAnswer: "discipulos",
          explanation: "'Discipulos' accusativus pluralis nominis 'discipulus'."
        }
      }
    },
    advanced: {
      'multiple-choice': {
        de: {
          question: "Wie integriert Macrobius neuplatonische Philosophie in die Commentarii in Somnium Scipionis?",
          options: [
            { id: "a", text: "Durch kosmologische Allegorien und Seelenlehre", isCorrect: true, explanation: "Macrobius verwendet neuplatonische Konzepte zur Interpretation von Ciceros Traum." },
            { id: "b", text: "Durch direkte Aristoteles-Zitate", isCorrect: false, explanation: "Macrobius folgt eher platonischer als aristotelischer Tradition." },
            { id: "c", text: "Durch stoische Ethik", isCorrect: false, explanation: "Neuplatonismus ist die primäre philosophische Grundlage." },
            { id: "d", text: "Durch empirische Methoden", isCorrect: false, explanation: "Macrobius' Ansatz ist metaphysisch und allegorisch." }
          ],
          explanation: "Macrobius' Kommentar zeigt tiefe Vertrautheit mit neuplatonischer Metaphysik und Kosmologie."
        },
        en: {
          question: "How does Macrobius integrate Neoplatonic philosophy in the Commentarii in Somnium Scipionis?",
          options: [
            { id: "a", text: "Through cosmological allegories and soul doctrine", isCorrect: true, explanation: "Macrobius uses Neoplatonic concepts to interpret Cicero's dream." },
            { id: "b", text: "Through direct Aristotelian quotations", isCorrect: false, explanation: "Macrobius follows Platonic rather than Aristotelian tradition." },
            { id: "c", text: "Through Stoic ethics", isCorrect: false, explanation: "Neoplatonism is the primary philosophical foundation." },
            { id: "d", text: "Through empirical methods", isCorrect: false, explanation: "Macrobius' approach is metaphysical and allegorical." }
          ],
          explanation: "Macrobius' commentary shows deep familiarity with Neoplatonic metaphysics and cosmology."
        },
        la: {
          question: "Quomodo Macrobius philosophiam Neoplatonicam integrat in Commentariis in Somnium Scipionis?",
          options: [
            { id: "a", text: "Per allegorias cosmologicas et doctrinam animae", isCorrect: true, explanation: "Macrobius conceptus Neoplatonicos adhibet ad somnium Ciceronis interpretandum." },
            { id: "b", text: "Per citationes directas Aristotelis", isCorrect: false, explanation: "Macrobius traditionem Platonicam potius quam Aristotelicam sequitur." },
            { id: "c", text: "Per ethicam Stoicam", isCorrect: false, explanation: "Neoplatonismus fundamentum philosophicum primarium est." },
            { id: "d", text: "Per methodos empiricas", isCorrect: false, explanation: "Accessus Macrobii metaphysicus et allegoricus est." }
          ],
          explanation: "Commentarium Macrobii familiaritatem profundam cum metaphysica et cosmologia Neoplantonica ostendit."
        }
      },
      'grammar': {
        de: {
          question: "Was ist der Unterschied zwischen Gerundium und Gerundivum?",
          options: [
            { id: "a", text: "Gerundium ist ein Verbalsubstantiv, Gerundivum ein Verbaladjektiv", isCorrect: true, explanation: "Gerundium fungiert als Substantiv, Gerundivum als Adjektiv mit passiver Bedeutung." },
            { id: "b", text: "Beide sind identisch", isCorrect: false, explanation: "Sie haben unterschiedliche grammatische Funktionen." },
            { id: "c", text: "Gerundivum ist nur im Plural", isCorrect: false, explanation: "Gerundivum kann in allen Numeri stehen." },
            { id: "d", text: "Gerundium ist nur im Nominativ", isCorrect: false, explanation: "Gerundium kann in verschiedenen Kasus stehen." }
          ],
          explanation: "Gerundium und Gerundivum sind verschiedene Verbalformen mit unterschiedlichen Funktionen."
        },
        en: {
          question: "What is the difference between Gerund and Gerundive?",
          options: [
            { id: "a", text: "Gerund is a verbal noun, Gerundive is a verbal adjective", isCorrect: true, explanation: "Gerund functions as a noun, Gerundive as an adjective with passive meaning." },
            { id: "b", text: "Both are identical", isCorrect: false, explanation: "They have different grammatical functions." },
            { id: "c", text: "Gerundive is only plural", isCorrect: false, explanation: "Gerundive can be in all numbers." },
            { id: "d", text: "Gerund is only nominative", isCorrect: false, explanation: "Gerund can be in various cases." }
          ],
          explanation: "Gerund and Gerundive are different verbal forms with distinct functions."
        },
        la: {
          question: "Quid est discrimen inter Gerundium et Gerundivum?",
          options: [
            { id: "a", text: "Gerundium est nomen verbale, Gerundivum adjectivum verbale", isCorrect: true, explanation: "Gerundium ut nomen, Gerundivum ut adjectivum cum significatione passiva fungitur." },
            { id: "b", text: "Ambo identica sunt", isCorrect: false, explanation: "Diversas functiones grammaticas habent." },
            { id: "c", text: "Gerundivum solum plurale est", isCorrect: false, explanation: "Gerundivum in omnibus numeris esse potest." },
            { id: "d", text: "Gerundium solum nominativum est", isCorrect: false, explanation: "Gerundium in variis casibus esse potest." }
          ],
          explanation: "Gerundium et Gerundivum formae verbales diversae sunt cum functionibus distinctis."
        }
      },
      'translation': {
        de: {
          question: "Übersetzen Sie: 'Urbe capta, cives fugerunt'",
          correctAnswer: "Nachdem die Stadt erobert worden war, flohen die Bürger",
          explanation: "Ablativus Absolutus mit perfektischem Partizip Passiv."
        },
        en: {
          question: "Translate: 'Urbe capta, cives fugerunt'",
          correctAnswer: "After the city was captured, the citizens fled",
          explanation: "Ablativus Absolutus with perfect passive participle."
        },
        la: {
          question: "Vertite: 'Urbe capta, cives fugerunt'",
          correctAnswer: "Urbe capta, cives fugerunt",
          explanation: "Ablativus Absolutus cum participio perfecto passivo."
        }
      },
      'fill-blank': {
        de: {
          question: "Ergänzen Sie: 'Orator, _____ eloquentia nota erat, ad senatum locutus est.' (dessen)",
          correctAnswer: "cuius",
          explanation: "'Cuius' ist Genitiv Singular des Relativpronomens 'qui'."
        },
        en: {
          question: "Complete: 'Orator, _____ eloquentia nota erat, ad senatum locutus est.' (whose)",
          correctAnswer: "cuius",
          explanation: "'Cuius' is genitive singular of the relative pronoun 'qui'."
        },
        la: {
          question: "Complete: 'Orator, _____ eloquentia nota erat, ad senatum locutus est.' (cuius)",
          correctAnswer: "cuius",
          explanation: "'Cuius' genitivus singularis pronominis relativi 'qui'."
        }
      }
    }
  };

  // Select appropriate question based on request parameters
  const selectedPool = questionPools[difficulty]?.[questionType]?.[language];
  
  if (!selectedPool) {
    // Default fallback
    return {
      id: questionId,
      type: questionType,
      question: language === 'de' 
        ? "Was ist ein wichtiges Thema in Macrobius' Saturnalia?" 
        : language === 'la'
        ? "Quid est argumentum importante in Saturnalibus Macrobii?"
        : "What is an important theme in Macrobius' Saturnalia?",
      options: [
        { 
          id: "a", 
          text: language === 'de' ? "Bildung und Kultur" : language === 'la' ? "Eruditio et cultura" : "Education and culture", 
          isCorrect: true,
          explanation: language === 'de' 
            ? "Bildung und kulturelle Diskussion sind zentrale Themen."
            : language === 'la'
            ? "Eruditio et discussio culturalis argumenta centralia sunt."
            : "Education and cultural discussion are central themes."
        },
        { 
          id: "b", 
          text: language === 'de' ? "Krieg" : language === 'la' ? "Bellum" : "War", 
          isCorrect: false,
          explanation: language === 'de' 
            ? "Krieg ist nicht das Hauptthema der Saturnalia."
            : language === 'la'
            ? "Bellum non est argumentum principale Saturnaliorum."
            : "War is not the main theme of Saturnalia."
        }
      ],
      explanation: language === 'de'
        ? "Die Saturnalia behandeln Bildung, Kultur und gelehrte Diskussion."
        : language === 'la'
        ? "Saturnalia eruditionem, culturam et doctam discussionem tractant."
        : "Saturnalia deals with education, culture, and learned discussion.",
      difficulty,
      culturalContext: request.culturalTheme ? 
        culturalThemes[request.culturalTheme as keyof typeof culturalThemes]?.[language] : undefined,
      sourcePassage: {
        id: "fallback_passage_1",
        text: language === 'de'
          ? "Aus den Saturnalia von Macrobius"
          : language === 'la'
          ? "Ex Saturnalibus Macrobii"
          : "From Macrobius' Saturnalia",
        work: "Saturnalia",
        book: 1,
        chapter: 1
      },
      hints: [
        language === 'de'
          ? "Denken Sie an die Symposium-Tradition"
          : language === 'la'
          ? "Cogitate de traditione symposii"
          : "Think about the symposium tradition"
      ],
      timeLimit: 90,
      points: difficulty === 'beginner' ? 5 : difficulty === 'intermediate' ? 10 : 15
    };
  }

  // ✅ FIX FOR ERROR #75: Conditional property access based on question type
  return {
    id: questionId,
    type: questionType,
    question: selectedPool.question,
    // Conditional property access: options only for multiple-choice and grammar
    options: 'options' in selectedPool ? selectedPool.options : undefined,
    // Conditional property access: correctAnswer only for translation and fill-blank
    correctAnswer: 'correctAnswer' in selectedPool ? selectedPool.correctAnswer : undefined,
    explanation: selectedPool.explanation,
    difficulty,
    culturalContext: request.culturalTheme ? 
      culturalThemes[request.culturalTheme as keyof typeof culturalThemes]?.[language] : undefined,
    sourcePassage: {
      id: "macrobius_passage_1",
      text: language === 'de'
        ? "Aus den authentischen Texten von Macrobius"
        : language === 'la'
        ? "Ex textibus authenticis Macrobii"
        : "From the authentic texts of Macrobius",
      work: "Saturnalia",
      book: 1,
      chapter: 1
    },
    hints: [
      language === 'de'
        ? "Betrachten Sie den kulturellen Kontext"
        : language === 'la'
        ? "Considerate contextum culturalem"
        : "Consider the cultural context"
    ],
    timeLimit: difficulty === 'beginner' ? 60 : difficulty === 'intermediate' ? 90 : 120,
    points: difficulty === 'beginner' ? 5 : difficulty === 'intermediate' ? 10 : 15
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
    const request: QuizQuestionRequest = req.body;

    // Validate request parameters
    if (request.difficulty && !['beginner', 'intermediate', 'advanced'].includes(request.difficulty)) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid difficulty level. Must be: beginner, intermediate, or advanced.'
      });
    }

    if (request.questionType && !['multiple-choice', 'fill-blank', 'translation', 'grammar'].includes(request.questionType)) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid question type. Must be: multiple-choice, fill-blank, translation, or grammar.'
      });
    }

    if (request.language && !['de', 'en', 'la'].includes(request.language)) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid language. Must be: de, en, or la.'
      });
    }

    // Try Oracle Cloud first
    const oracleResult = await generateQuestionFromOracle(request);
    
    if (oracleResult) {
      return res.status(200).json({
        status: 'success',
        data: oracleResult
      });
    }

    // Use intelligent fallback
    const fallbackResult = generateIntelligentFallback(request);
    
    return res.status(200).json({
      status: 'fallback',
      data: fallbackResult,
      fallbackReason: 'Oracle Cloud unavailable - using intelligent educational content'
    });

  } catch (error) {
    console.error('Quiz generation error:', error);
    
    // Emergency fallback
    const emergencyFallback = generateIntelligentFallback({
      difficulty: 'intermediate',
      questionType: 'multiple-choice',
      language: 'en'
    });
    
    return res.status(200).json({
      status: 'fallback',
      data: emergencyFallback,
      fallbackReason: 'System error - emergency educational content provided'
    });
  }
}