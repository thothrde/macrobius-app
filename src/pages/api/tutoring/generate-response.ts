import type { NextApiRequest, NextApiResponse } from 'next';

interface GenerateResponseRequest {
  sessionId: string;
  message: string;
  context?: {
    current_topic?: string;
    user_level?: string;
    previous_messages?: Array<{
      speaker: 'user' | 'tutor';
      message: string;
      timestamp: string;
    }>;
    learning_goals?: string[];
    cultural_focus?: string[];
  };
  responseType?: 'explanation' | 'question' | 'feedback' | 'encouragement' | 'correction';
  language?: 'DE' | 'EN' | 'LA';
  includeReferences?: boolean;
}

interface GenerateResponseResponse {
  status: 'success' | 'error';
  data?: {
    sessionId: string;
    tutor_response: string;
    response_metadata: {
      response_type: string;
      confidence_score: number;
      language_used: string;
      pedagogical_approach: string;
      estimated_reading_time: number;
      complexity_level: string;
    };
    educational_context: {
      main_concepts: string[];
      related_topics: string[];
      difficulty_assessment: string;
      learning_objectives: string[];
      next_recommended_action: string;
    };
    references?: Array<{
      source: string;
      citation: string;
      relevance_score: number;
      passage_excerpt: string;
    }>;
    suggested_followups: Array<{
      question: string;
      difficulty: string;
      purpose: string;
    }>;
    oracle_cloud_status: 'connected' | 'fallback';
  };
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateResponseResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      status: 'error', 
      message: 'Method not allowed. Use POST for response generation.' 
    });
  }

  const { 
    sessionId, 
    message, 
    context = {},
    responseType = 'explanation',
    language = 'EN',
    includeReferences = true
  } = req.body as GenerateResponseRequest;

  // Validate input
  if (!sessionId || typeof sessionId !== 'string') {
    return res.status(400).json({
      status: 'error',
      message: 'SessionId is required and must be a string'
    });
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Message is required and must be a non-empty string'
    });
  }

  if (message.length > 2000) {
    return res.status(400).json({
      status: 'error',
      message: 'Message must be less than 2000 characters'
    });
  }

  if (!['explanation', 'question', 'feedback', 'encouragement', 'correction'].includes(responseType)) {
    return res.status(400).json({
      status: 'error',
      message: 'responseType must be one of: explanation, question, feedback, encouragement, correction'
    });
  }

  try {
    // Connect to Oracle Cloud backend for AI response generation
    const oracleEndpoint = process.env.ORACLE_CLOUD_ENDPOINT || 'http://152.70.184.232:8080';
    
    const response = await fetch(`${oracleEndpoint}/api/tutoring/generate-response`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Client-Version': '2.0',
        'X-Request-Source': 'macrobius-frontend',
        'X-Response-Type': responseType
      },
      body: JSON.stringify({
        session_id: sessionId,
        message: message.trim(),
        context: {
          current_topic: context.current_topic,
          user_level: context.user_level,
          previous_messages: context.previous_messages,
          learning_goals: context.learning_goals,
          cultural_focus: context.cultural_focus
        },
        response_type: responseType,
        language,
        include_references: includeReferences
      }),
      signal: AbortSignal.timeout(25000) // 25 second timeout for AI generation
    });

    if (response.ok) {
      const oracleData = await response.json();
      
      return res.status(200).json({
        status: 'success',
        data: {
          sessionId,
          tutor_response: oracleData.tutor_response || oracleData.response,
          response_metadata: {
            response_type: responseType,
            confidence_score: oracleData.confidence_score || 0.85,
            language_used: language,
            pedagogical_approach: oracleData.pedagogical_approach || 'socratic',
            estimated_reading_time: Math.ceil((oracleData.tutor_response || oracleData.response || '').split(' ').length / 200),
            complexity_level: oracleData.complexity_level || context.user_level || 'Intermediate'
          },
          educational_context: {
            main_concepts: oracleData.main_concepts || [],
            related_topics: oracleData.related_topics || [],
            difficulty_assessment: oracleData.difficulty_assessment || 'Appropriate',
            learning_objectives: oracleData.learning_objectives || [],
            next_recommended_action: oracleData.next_recommended_action || 'Continue discussion'
          },
          references: includeReferences ? (oracleData.references || []).map((ref: any) => ({
            source: ref.source || 'Macrobius Corpus',
            citation: ref.citation || 'Saturnalia, Book I',
            relevance_score: ref.relevance_score || 0.8,
            passage_excerpt: ref.passage_excerpt || ref.excerpt || ''
          })) : undefined,
          suggested_followups: (oracleData.suggested_followups || []).map((followup: any) => ({
            question: followup.question,
            difficulty: followup.difficulty || 'Intermediate',
            purpose: followup.purpose || 'Deepen understanding'
          })),
          oracle_cloud_status: 'connected' as const
        }
      });
    } else {
      throw new Error(`Oracle Cloud responded with status ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Oracle Cloud AI tutoring response generation failed:', error);
    
    // Generate intelligent fallback response
    const fallbackResponse = generateIntelligentTutoringResponse(
      sessionId, message, context, responseType, language, includeReferences
    );
    
    return res.status(200).json({
      status: 'success',
      data: fallbackResponse
    });
  }
}

function generateIntelligentTutoringResponse(
  sessionId: string,
  message: string,
  context: any,
  responseType: string,
  language: string,
  includeReferences: boolean
) {
  const messageLower = message.toLowerCase();
  
  // Analyze message for educational intent
  let detectedIntent = 'general';
  let mainConcepts: string[] = [];
  let relatedTopics: string[] = [];
  
  if (/dream|traum|somnium|scipio|vision/i.test(message)) {
    detectedIntent = 'dreams';
    mainConcepts = ['dreams', 'prophecy', 'spiritual vision', 'neoplatonism'];
    relatedTopics = ['cosmic hierarchy', 'soul ascent', 'divine communication'];
  } else if (/banquet|gastmahl|convivium|feast|dinner/i.test(message)) {
    detectedIntent = 'banquet';
    mainConcepts = ['Roman banquet culture', 'symposium', 'social customs'];
    relatedTopics = ['intellectual discourse', 'cultural exchange', 'Roman society'];
  } else if (/philosophy|philosophie|wisdom|virtue|truth/i.test(message)) {
    detectedIntent = 'philosophy';
    mainConcepts = ['neoplatonism', 'virtue ethics', 'wisdom tradition'];
    relatedTopics = ['metaphysics', 'moral philosophy', 'ancient wisdom'];
  } else if (/religion|götter|deus|god|ritual|worship/i.test(message)) {
    detectedIntent = 'religion';
    mainConcepts = ['Roman religion', 'divine worship', 'ritual practice'];
    relatedTopics = ['theological concepts', 'sacred tradition', 'religious philosophy'];
  } else if (/music|harmony|harmonie|sphere|cosmic/i.test(message)) {
    detectedIntent = 'cosmology';
    mainConcepts = ['harmony of spheres', 'cosmic music', 'mathematical proportion'];
    relatedTopics = ['astronomy', 'pythagorean theory', 'celestial order'];
  }
  
  // Generate pedagogically appropriate responses by language and type
  const responseTemplates = {
    DE: {
      explanation: {
        dreams: "Macrobius' Behandlung der Träume ist faszinierend komplex. In seinem Kommentar zu Scipios Traum unterscheidet er verschiedene Arten von Träumen und ihre Bedeutung für die spirituelle Entwicklung. Besonders interessant ist seine Verbindung von neuplatonischer Philosophie mit römischer Kultur.",
        banquet: "Das römische Gastmahl, wie es Macrobius in den Saturnalia darstellt, war weit mehr als nur eine Mahlzeit. Es war ein Ort der intellektuellen Begegnung, wo Gelehrte verschiedener Disziplinen zusammenkamen, um Wissen auszutauschen und kulturelle Traditionen zu pflegen.",
        philosophy: "Macrobius vereint geschickt neuplatonische Philosophie mit praktischer römischer Weisheit. Seine Darstellung zeigt, wie abstrakte philosophische Konzepte in das tägliche Leben und die kulturellen Praktiken integriert werden können.",
        religion: "Die religiösen Aspekte in Macrobius' Werk zeigen eine tiefe Ehrfurcht vor den traditionellen römischen Göttern, während gleichzeitig philosophische Interpretationen der religiösen Praktiken angeboten werden.",
        cosmology: "Die Harmonie der Sphären bei Macrobius verbindet pythagoräische Zahlenlehre mit kosmologischen Vorstellungen. Diese 'Weltmusik' ist mehr als nur Metapher - sie repräsentiert die mathematische Ordnung des Universums.",
        general: "Das ist eine sehr durchdachte Frage! Lassen Sie uns gemeinsam die relevanten Passagen in Macrobius' Werk erkunden, um eine fundierte Antwort zu entwickeln."
      },
      question: {
        dreams: "Was denken Sie denn über Macrobius' Unterscheidung zwischen verschiedenen Traumarten? Können Sie Parallelen zu modernen Traumtheorien erkennen?",
        banquet: "Wie würden Sie die Rolle des Gastmahls in der römischen Bildungskultur mit heutigen Formen des intellektuellen Austauschs vergleichen?",
        philosophy: "Welche neuplatonischen Konzepte finden Sie in Macrobius' Darstellung am überzeugendsten? Warum?",
        religion: "Wie interpretieren Sie Macrobius' Darstellung der römischen religiösen Praktiken in Bezug auf seine philosophischen Überzeugungen?",
        cosmology: "Was halten Sie von der Idee der 'Sphärenmusik'? Welche modernen wissenschaftlichen Konzepte könnten damit in Verbindung stehen?",
        general: "Was ist Ihr Hauptinteresse an diesem Aspekt von Macrobius' Werk? Welche Fragen beschäftigen Sie am meisten?"
      },
      feedback: {
        positive: "Ausgezeichnet! Ihre Analyse zeigt ein tiefes Verständnis für die Komplexität von Macrobius' Gedankenwelt. Besonders beeindruckend ist Ihre Verbindung zu...",
        constructive: "Das ist ein guter Ansatz! Lassen Sie uns das noch etwas weiter entwickeln. Haben Sie dabei auch bedacht, dass Macrobius...",
        encouraging: "Sie sind auf dem richtigen Weg! Diese Art des analytischen Denkens ist genau das, was beim Studium klassischer Texte gefragt ist."
      }
    },
    EN: {
      explanation: {
        dreams: "Macrobius's treatment of dreams is fascinatingly complex. In his commentary on Scipio's Dream, he distinguishes between different types of dreams and their significance for spiritual development. Particularly interesting is his connection of Neoplatonic philosophy with Roman culture.",
        banquet: "The Roman banquet, as depicted by Macrobius in the Saturnalia, was far more than just a meal. It was a place of intellectual encounter, where scholars from various disciplines came together to exchange knowledge and maintain cultural traditions.",
        philosophy: "Macrobius skillfully unites Neoplatonic philosophy with practical Roman wisdom. His presentation shows how abstract philosophical concepts can be integrated into daily life and cultural practices.",
        religion: "The religious aspects in Macrobius's work show deep reverence for traditional Roman gods, while simultaneously offering philosophical interpretations of religious practices.",
        cosmology: "The harmony of the spheres in Macrobius connects Pythagorean number theory with cosmological concepts. This 'world music' is more than just metaphor - it represents the mathematical order of the universe.",
        general: "That's a very thoughtful question! Let's explore the relevant passages in Macrobius's work together to develop a well-founded answer."
      },
      question: {
        dreams: "What do you think about Macrobius's distinction between different types of dreams? Can you see parallels to modern dream theories?",
        banquet: "How would you compare the role of the banquet in Roman educational culture with today's forms of intellectual exchange?",
        philosophy: "Which Neoplatonic concepts do you find most convincing in Macrobius's presentation? Why?",
        religion: "How do you interpret Macrobius's depiction of Roman religious practices in relation to his philosophical beliefs?",
        cosmology: "What do you think of the idea of 'spheric music'? Which modern scientific concepts might be connected to this?",
        general: "What is your main interest in this aspect of Macrobius's work? What questions concern you most?"
      },
      feedback: {
        positive: "Excellent! Your analysis shows a deep understanding of the complexity of Macrobius's thought world. Particularly impressive is your connection to...",
        constructive: "That's a good approach! Let's develop this a bit further. Have you also considered that Macrobius...",
        encouraging: "You're on the right track! This kind of analytical thinking is exactly what's needed when studying classical texts."
      }
    },
    LA: {
      explanation: {
        dreams: "Macrobii tractatio somniorum mirabiliter complexa est. In commentario de Somnio Scipionis varia somniorum genera eorumque significationem pro progressu spirituali distinguit. Praecipue interessans est eius coniunctio philosophiae Neoplatonicae cum cultura Romana.",
        banquet: "Convivium Romanum, sicut a Macrobio in Saturnalibus depingitur, longe plus quam cena tantum erat. Locus erat congressus intellectualis, ubi docti variarum disciplinarum conveniebant ad scientiam communicandam traditionesque culturales conservandas.",
        philosophy: "Macrobius perite philosophiam Neoplatonicam cum sapientia Romana practica unit. Eius praesentatio ostendit quomodo conceptus philosophici abstracti in vitam quotidianam culturasque practicas integrari possint.",
        religion: "Aspectus religiosi in opere Macrobii profundam reverentiam erga deos Romanos traditionalis ostendunt, simul interpretationes philosophicas practicum religiosam offerentes.",
        cosmology: "Harmonia sphaerarum apud Macrobium doctrinam numerorum Pythagoricam cum conceptibus cosmologicis coniungit. Haec 'musica mundana' plus quam metaphora est - ordinem mathematicum universi repraesentat.",
        general: "Haec quaestio valde considerata est! Locos pertinentes in opere Macrobii simul exploremus ut responsionem bene fundatam evolamus."
      },
      question: {
        dreams: "Quid de Macrobii distinctione inter varia genera somniorum sentitis? Potestisne parallela cum theoriis somniorum modernis videre?",
        banquet: "Quomodo munus convivii in cultura educationis Romanae cum formis hodierni commercii intellectualis comparetis?",
        philosophy: "Qui conceptus Neoplatonici in praesentatione Macrobii vobis maxime persuasivi videntur? Cur?",
        religion: "Quomodo descriptionem Macrobii practicum religiosam Romanarum in relatione ad eius persuasiones philosophicas interpretamini?",
        cosmology: "Quid de idea 'musicae sphaericae' sentitis? Qui conceptus scientifici moderni cum hoc conecti possint?",
        general: "Quid est vestrum principale studium in hoc aspectu operis Macrobii? Quae quaestiones vos maxime sollicitant?"
      },
      feedback: {
        positive: "Optime! Analysis vestra profundam intelligentiam complexitatis mundi cogitationum Macrobii ostendit. Praecipue impressiva est vestra coniunctio ad...",
        constructive: "Bonus accessus est! Hoc aliquantulum ulterius evolvamus. Consideravistisne etiam Macrobium...",
        encouraging: "In recta via estis! Hoc genus cogitationis analyticae exacte est quod in studio textuum classicorum requiritur."
      }
    }
  };
  
  const langTemplates = responseTemplates[language as keyof typeof responseTemplates];
  
  // Generate appropriate response based on type and intent
  let tutorResponse = '';
  if (responseType === 'question') {
    tutorResponse = langTemplates.question[detectedIntent as keyof typeof langTemplates.question] || langTemplates.question.general;
  } else if (responseType === 'feedback') {
    const sentiment = analyzeSentiment(message);
    const feedbackType = sentiment > 0.5 ? 'positive' : sentiment > 0 ? 'constructive' : 'encouraging';
    tutorResponse = langTemplates.feedback[feedbackType as keyof typeof langTemplates.feedback];
  } else {
    tutorResponse = langTemplates.explanation[detectedIntent as keyof typeof langTemplates.explanation] || langTemplates.explanation.general;
  }
  
  // Generate references if requested
  const references = includeReferences ? generateReferences(detectedIntent, language) : undefined;
  
  // Generate suggested follow-ups
  const suggestedFollowups = generateFollowupQuestions(detectedIntent, language, context.user_level || 'Intermediate');
  
  return {
    sessionId,
    tutor_response: tutorResponse,
    response_metadata: {
      response_type: responseType,
      confidence_score: 0.75, // Lower confidence for fallback
      language_used: language,
      pedagogical_approach: 'socratic',
      estimated_reading_time: Math.ceil(tutorResponse.split(' ').length / 200),
      complexity_level: assessComplexity(tutorResponse)
    },
    educational_context: {
      main_concepts: mainConcepts,
      related_topics: relatedTopics,
      difficulty_assessment: 'Appropriate for level',
      learning_objectives: generateLearningObjectives(detectedIntent, language),
      next_recommended_action: 'Continue exploring with follow-up questions'
    },
    references,
    suggested_followups: suggestedFollowups,
    oracle_cloud_status: 'fallback' as const
  };
}

function analyzeSentiment(message: string): number {
  const positiveWords = ['good', 'great', 'excellent', 'interesting', 'understand', 'clear', 'helpful'];
  const negativeWords = ['difficult', 'confused', 'unclear', 'hard', 'dont understand', "don't understand"];
  
  const messageLower = message.toLowerCase();
  const positiveCount = positiveWords.filter(word => messageLower.includes(word)).length;
  const negativeCount = negativeWords.filter(word => messageLower.includes(word)).length;
  
  return (positiveCount - negativeCount + 1) / 2; // Normalize to 0-1
}

function assessComplexity(text: string): string {
  const wordCount = text.split(' ').length;
  const avgWordLength = text.split(' ').reduce((sum, word) => sum + word.length, 0) / wordCount;
  
  if (wordCount < 50 && avgWordLength < 5) return 'Beginner';
  if (wordCount < 100 && avgWordLength < 7) return 'Intermediate';
  return 'Advanced';
}

function generateReferences(intent: string, language: string) {
  const referenceMap = {
    dreams: {
      source: 'Commentarii in Somnium Scipionis',
      citation: 'Book I, Chapter 3',
      excerpt: 'Animae autem eae quae adhuc se corporibus involvunt...'
    },
    banquet: {
      source: 'Saturnalia',
      citation: 'Book I, Chapter 5',
      excerpt: 'Convivium autem non solum corporis sed etiam animi refectio...'
    },
    philosophy: {
      source: 'Commentarii in Somnium Scipionis',
      citation: 'Book I, Chapter 8',
      excerpt: 'Virtus autem vera ex cognitione summi boni oritur...'
    },
    religion: {
      source: 'Saturnalia',
      citation: 'Book I, Chapter 7',
      excerpt: 'Saturni festa antiquissima sunt...'
    },
    cosmology: {
      source: 'Commentarii in Somnium Scipionis',
      citation: 'Book II, Chapter 4',
      excerpt: 'Harmonia autem illa caelestis ex disparibus sonis...'
    }
  };
  
  const ref = referenceMap[intent as keyof typeof referenceMap] || referenceMap.philosophy;
  
  return [
    {
      source: ref.source,
      citation: ref.citation,
      relevance_score: 0.9,
      passage_excerpt: ref.excerpt
    }
  ];
}

function generateLearningObjectives(intent: string, language: string): string[] {
  const objectivesMap = {
    DE: {
      dreams: ['Traumtheorie verstehen', 'Neuplatonische Konzepte erkunden', 'Kulturelle Bedeutung analysieren'],
      banquet: ['Römische Gastkultur verstehen', 'Soziale Strukturen analysieren', 'Bildungskultur erkunden'],
      philosophy: ['Neuplatonismus studieren', 'Ethische Konzepte verstehen', 'Antike Weisheit anwenden'],
      religion: ['Römische Religion verstehen', 'Philosophische Interpretation', 'Kulturelle Praktiken analysieren'],
      cosmology: ['Sphärenharmonie verstehen', 'Mathematische Proportionen', 'Kosmische Ordnung erkunden']
    },
    EN: {
      dreams: ['Understand dream theory', 'Explore Neoplatonic concepts', 'Analyze cultural significance'],
      banquet: ['Understand Roman banquet culture', 'Analyze social structures', 'Explore educational culture'],
      philosophy: ['Study Neoplatonism', 'Understand ethical concepts', 'Apply ancient wisdom'],
      religion: ['Understand Roman religion', 'Philosophical interpretation', 'Analyze cultural practices'],
      cosmology: ['Understand spheric harmony', 'Mathematical proportions', 'Explore cosmic order']
    },
    LA: {
      dreams: ['Theoriam somniorum intelligere', 'Conceptus Neoplatonicos explorare', 'Significationem culturalem analysi subicere'],
      banquet: ['Culturam convivii Romani intelligere', 'Structuras sociales analysi subicere', 'Culturam educationis explorare'],
      philosophy: ['Neoplatonismum studere', 'Conceptus ethicos intelligere', 'Sapientiam antiquam applicare'],
      religion: ['Religionem Romanam intelligere', 'Interpretationem philosophicam', 'Practicas culturales analysi subicere'],
      cosmology: ['Harmoniam sphaericam intelligere', 'Proportiones mathematicas', 'Ordinem cosmicum explorare']
    }
  };
  
  const langObjectives = objectivesMap[language as keyof typeof objectivesMap];
  return langObjectives[intent as keyof typeof langObjectives] || langObjectives.philosophy;
}

function generateFollowupQuestions(intent: string, language: string, userLevel: string) {
  const questionsMap = {
    DE: {
      dreams: [
        { question: 'Wie unterscheidet Macrobius zwischen wahren und falschen Träumen?', difficulty: 'Intermediate', purpose: 'Konzeptuelle Vertiefung' },
        { question: 'Welche Rolle spielt die Seelenwanderung in der Traumtheorie?', difficulty: 'Advanced', purpose: 'Philosophische Analyse' }
      ],
      banquet: [
        { question: 'Wie spiegelt das Gastmahl die römische Gesellschaftsstruktur wider?', difficulty: 'Intermediate', purpose: 'Kulturelle Analyse' },
        { question: 'Welche pädagogischen Prinzipien werden im Symposium deutlich?', difficulty: 'Advanced', purpose: 'Bildungstheorie' }
      ]
    },
    EN: [
      { question: 'How can we apply Macrobius\'s insights to modern learning?', difficulty: 'Intermediate', purpose: 'Practical application' },
      { question: 'What connections do you see with contemporary philosophy?', difficulty: 'Advanced', purpose: 'Comparative analysis' }
    ]
  };
  
  // Return appropriate questions based on language and intent
  if (language === 'DE' && questionsMap.DE[intent as keyof typeof questionsMap.DE]) {
    return questionsMap.DE[intent as keyof typeof questionsMap.DE];
  }
  
  return questionsMap.EN;
}