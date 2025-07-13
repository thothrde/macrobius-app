import type { NextApiRequest, NextApiResponse } from 'next';

// ===== TYPES & INTERFACES =====
interface RecommendationRequest {
  userId: string;
  currentPerformance?: {
    grammarAccuracy: number;
    vocabularyRetention: number;
    readingComprehension: number;
    culturalKnowledge: number;
    overallProgress: number;
  };
  learningHistory?: {
    topicsStudied: string[];
    timeSpent: Record<string, number>; // topic -> minutes
    averageScores: Record<string, number>; // topic -> 0-100
    strugglingAreas: string[];
    strongAreas: string[];
    lastSession: string;
    totalSessions: number;
  };
  preferences?: {
    studyTime: number; // minutes per day
    sessionFrequency: number; // per week
    difficultyPreference: 'challenging' | 'moderate' | 'comfortable';
    contentTypes: ('grammar' | 'vocabulary' | 'reading' | 'cultural' | 'exercises')[];
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading' | 'mixed';
  };
  goals?: {
    shortTerm: string[]; // 1-4 weeks
    mediumTerm: string[]; // 1-3 months 
    longTerm: string[]; // 3+ months
    priorityAreas: string[];
    timeframe: number; // weeks
  };
  contextualFactors?: {
    timeOfDay: 'morning' | 'afternoon' | 'evening';
    sessionType: 'quick-review' | 'deep-study' | 'practice' | 'assessment';
    energyLevel: 'high' | 'medium' | 'low';
    availableTime: number; // minutes
    deviceType: 'mobile' | 'tablet' | 'desktop';
  };
  language?: 'de' | 'en' | 'la';
}

interface LearningRecommendation {
  id: string;
  type: 'topic' | 'exercise' | 'review' | 'cultural-exploration' | 'assessment';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  urgency: 'immediate' | 'soon' | 'flexible';
  estimatedDuration: number; // minutes
  difficulty: 'easy' | 'medium' | 'hard';
  reasoning: {
    primaryFactor: string;
    explanation: string;
    expectedBenefit: string;
    riskIfIgnored?: string;
  };
  content: {
    topicId: string;
    resources: {
      type: 'lesson' | 'exercise' | 'quiz' | 'reading' | 'video' | 'cultural-note';
      title: string;
      description: string;
      estimatedTime: number;
      url?: string;
    }[];
    prerequisites?: string[];
    followUpActions?: string[];
  };
  adaptiveFeatures: {
    difficultyAdjustment: boolean;
    contentPersonalization: boolean;
    progressTracking: boolean;
    realTimeFeedback: boolean;
  };
  successMetrics: {
    completionCriteria: string;
    masteryThreshold: number;
    timeToMastery: number; // estimated weeks
  };
}

interface StudySession {
  id: string;
  title: string;
  description: string;
  totalDuration: number; // minutes
  structure: {
    warmUp?: {
      activity: string;
      duration: number;
    };
    mainContent: {
      activity: string;
      duration: number;
      focusAreas: string[];
    }[];
    review?: {
      activity: string;
      duration: number;
    };
    coolDown?: {
      activity: string;
      duration: number;
    };
  };
  recommendations: LearningRecommendation[];
  adaptiveElements: {
    difficultyScaling: boolean;
    contentVariation: boolean;
    paceAdjustment: boolean;
  };
}

interface PersonalizedRecommendations {
  userId: string;
  generatedDate: string;
  validUntil: string;
  immediateRecommendations: LearningRecommendation[];
  suggestedStudySession: StudySession;
  weeklyPlan: {
    week: number;
    focus: string;
    dailySessions: {
      day: string;
      sessionType: string;
      estimatedDuration: number;
      keyTopics: string[];
    }[];
    milestones: {
      description: string;
      dueDate: string;
      completionCriteria: string;
    }[];
  };
  progressPredictions: {
    nextWeek: {
      expectedProgress: number;
      likelyStruggles: string[];
      recommendations: string[];
    };
    nextMonth: {
      expectedMastery: Record<string, number>;
      suggestedMilestones: string[];
      adaptiveAdjustments: string[];
    };
  };
  motivationalElements: {
    achievements: {
      recent: string[];
      upcoming: string[];
    };
    encouragement: string[];
    challenges: {
      title: string;
      description: string;
      reward: string;
      deadline: string;
    }[];
  };
  metadata: {
    algorithmVersion: string;
    confidenceScore: number;
    factors: {
      performance: number;
      preferences: number;
      context: number;
      history: number;
    };
  };
}

interface APIResponse {
  status: 'success' | 'error' | 'fallback';
  data?: PersonalizedRecommendations;
  error?: string;
  fallbackReason?: string;
}

// ===== ORACLE CLOUD INTEGRATION =====
const ORACLE_ENDPOINT = process.env.ORACLE_CLOUD_ENDPOINT || 'http://152.70.184.232:8080';
const REQUEST_TIMEOUT = 30000; // 30 seconds

async function generateRecommendationsWithOracle(
  request: RecommendationRequest
): Promise<PersonalizedRecommendations | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await fetch(`${ORACLE_ENDPOINT}/api/learning-paths/personalized-recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Macrobius-Frontend/1.0'
      },
      body: JSON.stringify({
        userId: request.userId,
        currentPerformance: request.currentPerformance,
        learningHistory: request.learningHistory,
        preferences: request.preferences,
        goals: request.goals,
        contextualFactors: request.contextualFactors,
        language: request.language || 'en',
        requestTimestamp: new Date().toISOString(),
        aiFeatures: ['performance_analysis', 'adaptive_sequencing', 'personalization', 'predictive_modeling']
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`Oracle Cloud recommendations response not OK: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    
    if (data.status === 'success' && data.recommendations) {
      return data.recommendations;
    }

    return null;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.warn('Oracle Cloud recommendations request timed out');
      } else {
        console.error('Oracle Cloud recommendations error:', error.message);
      }
    }
    return null;
  }
}

// ===== INTELLIGENT RECOMMENDATION ENGINE =====
class PersonalizedRecommendationEngine {
  static analyzeUserState(request: RecommendationRequest): {
    strengthAreas: string[];
    weaknessAreas: string[];
    nextLogicalSteps: string[];
    urgentNeeds: string[];
  } {
    const performance = request.currentPerformance;
    const history = request.learningHistory;
    
    const strengthAreas: string[] = [];
    const weaknessAreas: string[] = [];
    
    if (performance) {
      if (performance.grammarAccuracy >= 0.8) strengthAreas.push('grammar');
      else if (performance.grammarAccuracy < 0.6) weaknessAreas.push('grammar');
      
      if (performance.vocabularyRetention >= 0.8) strengthAreas.push('vocabulary');
      else if (performance.vocabularyRetention < 0.6) weaknessAreas.push('vocabulary');
      
      if (performance.readingComprehension >= 0.8) strengthAreas.push('reading');
      else if (performance.readingComprehension < 0.6) weaknessAreas.push('reading');
      
      if (performance.culturalKnowledge >= 0.8) strengthAreas.push('cultural');
      else if (performance.culturalKnowledge < 0.6) weaknessAreas.push('cultural');
    }
    
    // Add from history
    if (history?.strongAreas) strengthAreas.push(...history.strongAreas);
    if (history?.strugglingAreas) weaknessAreas.push(...history.strugglingAreas);
    
    // Determine next logical steps
    const nextLogicalSteps: string[] = [];
    const studiedTopics = history?.topicsStudied || [];
    
    if (!studiedTopics.includes('basic-declensions') && !weaknessAreas.includes('grammar')) {
      nextLogicalSteps.push('basic-declensions');
    } else if (studiedTopics.includes('basic-declensions') && !studiedTopics.includes('verb-conjugations')) {
      nextLogicalSteps.push('verb-conjugations');
    } else if (studiedTopics.includes('verb-conjugations') && !studiedTopics.includes('case-usage')) {
      nextLogicalSteps.push('case-usage');
    }
    
    // Urgent needs based on weaknesses
    const urgentNeeds = weaknessAreas.filter(area => 
      !history?.topicsStudied?.some(topic => topic.includes(area))
    );
    
    return { strengthAreas, weaknessAreas, nextLogicalSteps, urgentNeeds };
  }

  static generateRecommendation(
    type: string,
    analysis: any,
    request: RecommendationRequest,
    language: string = 'en'
  ): LearningRecommendation {
    const recommendationId = `rec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const templates = {
      de: {
        grammar: {
          title: 'Grammatik verbessern',
          description: 'Fokussierung auf schwache Grammatikbereiche',
          reasoning: 'Ihre Grammatikleistung zeigt Verbesserungsbedarf',
          benefit: 'Stärkere grammatische Grundlage für komplexere Texte'
        },
        vocabulary: {
          title: 'Wortschatz erweitern',
          description: 'Systematischer Aufbau des lateinischen Wortschatzes',
          reasoning: 'Erweiterte Vokabelkenntnisse sind für Textverständnis essential',
          benefit: 'Besseres Verständnis authentischer lateinischer Texte'
        },
        reading: {
          title: 'Leseverständnis stärken',
          description: 'Übung mit authentischen lateinischen Texten',
          reasoning: 'Lesekompetenz ist für fortgeschrittenes Lateinlernen wichtig',
          benefit: 'Selbstständiges Lesen klassischer Werke wie Macrobius'
        }
      },
      en: {
        grammar: {
          title: 'Improve Grammar',
          description: 'Focus on weak grammar areas',
          reasoning: 'Your grammar performance shows room for improvement',
          benefit: 'Stronger grammatical foundation for complex texts'
        },
        vocabulary: {
          title: 'Expand Vocabulary',
          description: 'Systematic building of Latin vocabulary',
          reasoning: 'Enhanced vocabulary knowledge is essential for text comprehension',
          benefit: 'Better understanding of authentic Latin texts'
        },
        reading: {
          title: 'Strengthen Reading Comprehension',
          description: 'Practice with authentic Latin texts',
          reasoning: 'Reading competency is crucial for advanced Latin learning',
          benefit: 'Independent reading of classical works like Macrobius'
        }
      },
      la: {
        grammar: {
          title: 'Grammaticam meliorare',
          description: 'Concentratio in partes grammaticas debiles',
          reasoning: 'Praestatio grammatica tua melioramentum demonstrat necessarium',
          benefit: 'Fundamentum grammaticum robustius pro textibus complexis'
        },
        vocabulary: {
          title: 'Vocabularium amplificare',
          description: 'Aedificatio systematica vocabularii Latini',
          reasoning: 'Scientia vocabularii aucta essentialis est ad textus comprehendendum',
          benefit: 'Maior intellectus textuum Latinorum authenticorum'
        },
        reading: {
          title: 'Comprehensionem lectionis confirmare',
          description: 'Exercitatio cum textibus Latinis authenticis',
          reasoning: 'Competentia legendi crucialis est ad Latine provecte discendum',
          benefit: 'Lectio independens operum classicorum sicut Macrobii'
        }
      }
    };

    const template = templates[language as keyof typeof templates]?.[type as keyof typeof templates.en] || 
                    templates.en[type as keyof typeof templates.en] || 
                    templates.en.grammar;
    
    // Determine priority based on user state
    let priority: 'high' | 'medium' | 'low' = 'medium';
    let urgency: 'immediate' | 'soon' | 'flexible' = 'soon';
    
    if (analysis.urgentNeeds.includes(type)) {
      priority = 'high';
      urgency = 'immediate';
    } else if (analysis.weaknessAreas.includes(type)) {
      priority = 'high';
      urgency = 'soon';
    } else if (analysis.nextLogicalSteps.includes(type)) {
      priority = 'medium';
      urgency = 'soon';
    }
    
    // Adjust difficulty based on preferences
    let difficulty: 'easy' | 'medium' | 'hard' = 'medium';
    if (request.preferences?.difficultyPreference === 'comfortable') difficulty = 'easy';
    else if (request.preferences?.difficultyPreference === 'challenging') difficulty = 'hard';
    
    return {
      id: recommendationId,
      type: 'topic',
      title: template.title,
      description: template.description,
      priority,
      urgency,
      estimatedDuration: request.preferences?.studyTime || 30,
      difficulty,
      reasoning: {
        primaryFactor: 'performance_analysis',
        explanation: template.reasoning,
        expectedBenefit: template.benefit,
        riskIfIgnored: priority === 'high' ? 
          (language === 'de' ? 'Weitere Schwierigkeiten in diesem Bereich' :
           language === 'la' ? 'Difficultates ulteriores in hac parte' :
           'Further difficulties in this area') : undefined
      },
      content: {
        topicId: type,
        resources: [
          {
            type: 'lesson',
            title: language === 'de' ? `${template.title} - Grundlagen` :
                   language === 'la' ? `${template.title} - Fundamenta` :
                   `${template.title} - Fundamentals`,
            description: language === 'de' ? 'Strukturierte Einführung in das Thema' :
                        language === 'la' ? 'Introductio structurata in argumentum' :
                        'Structured introduction to the topic',
            estimatedTime: 15
          },
          {
            type: 'exercise',
            title: language === 'de' ? 'Praktische Übungen' :
                   language === 'la' ? 'Exercitationes practicae' :
                   'Practical Exercises',
            description: language === 'de' ? 'Interaktive Übungen zur Vertiefung' :
                        language === 'la' ? 'Exercitationes interactivae ad profunditatem' :
                        'Interactive exercises for reinforcement',
            estimatedTime: 10
          }
        ],
        prerequisites: analysis.nextLogicalSteps.indexOf(type) > 0 ? 
          [analysis.nextLogicalSteps[analysis.nextLogicalSteps.indexOf(type) - 1]] : [],
        followUpActions: [
          language === 'de' ? 'Regelmäßige Wiederholung' :
          language === 'la' ? 'Repetitio regularis' :
          'Regular review',
          language === 'de' ? 'Anwendung in komplexeren Kontexten' :
          language === 'la' ? 'Applicatio in contextibus complexioribus' :
          'Application in more complex contexts'
        ]
      },
      adaptiveFeatures: {
        difficultyAdjustment: true,
        contentPersonalization: true,
        progressTracking: true,
        realTimeFeedback: true
      },
      successMetrics: {
        completionCriteria: language === 'de' ? '80% korrekte Antworten in Übungen' :
                            language === 'la' ? '80% responsiones rectae in exercitationibus' :
                            '80% correct answers in exercises',
        masteryThreshold: 85,
        timeToMastery: difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3
      }
    };
  }

  static createStudySession(
    recommendations: LearningRecommendation[],
    request: RecommendationRequest,
    language: string = 'en'
  ): StudySession {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const availableTime = request.contextualFactors?.availableTime || request.preferences?.studyTime || 30;
    
    const priorityRecs = recommendations.filter(r => r.priority === 'high').slice(0, 2);
    const mediumRecs = recommendations.filter(r => r.priority === 'medium').slice(0, 1);
    
    const mainContent = [...priorityRecs, ...mediumRecs].map(rec => ({
      activity: rec.title,
      duration: Math.min(rec.estimatedDuration, Math.floor(availableTime * 0.6)),
      focusAreas: [rec.content.topicId]
    }));
    
    return {
      id: sessionId,
      title: language === 'de' ? 'Personalisierte Lernsitzung' :
             language === 'la' ? 'Sessio discendi personalis' :
             'Personalized Study Session',
      description: language === 'de' ? 
        `Maßgeschneiderte ${availableTime}-minütige Sitzung basierend auf Ihrer Leistung` :
        language === 'la' ?
        `Sessio ${availableTime} minutorum ad mensuram facta secundum praesentationem tuam` :
        `Tailored ${availableTime}-minute session based on your performance`,
      totalDuration: availableTime,
      structure: {
        warmUp: {
          activity: language === 'de' ? 'Kurze Wiederholung' :
                   language === 'la' ? 'Repetitio brevis' :
                   'Quick Review',
          duration: Math.floor(availableTime * 0.1)
        },
        mainContent,
        review: {
          activity: language === 'de' ? 'Zusammenfassung und Reflexion' :
                   language === 'la' ? 'Summarium et reflexio' :
                   'Summary and Reflection',
          duration: Math.floor(availableTime * 0.15)
        },
        coolDown: {
          activity: language === 'de' ? 'Nächste Schritte planen' :
                   language === 'la' ? 'Gradus proximos disponere' :
                   'Plan Next Steps',
          duration: Math.floor(availableTime * 0.05)
        }
      },
      recommendations: [...priorityRecs, ...mediumRecs],
      adaptiveElements: {
        difficultyScaling: true,
        contentVariation: true,
        paceAdjustment: true
      }
    };
  }
}

function generateRecommendationsFallback(
  request: RecommendationRequest
): PersonalizedRecommendations {
  const language = request.language || 'en';
  const analysis = PersonalizedRecommendationEngine.analyzeUserState(request);
  
  // Generate immediate recommendations
  const immediateRecommendations: LearningRecommendation[] = [];
  
  // Add recommendations based on analysis
  [...analysis.urgentNeeds, ...analysis.weaknessAreas.slice(0, 2), ...analysis.nextLogicalSteps.slice(0, 1)]
    .slice(0, 5) // Limit to 5 recommendations
    .forEach(area => {
      immediateRecommendations.push(
        PersonalizedRecommendationEngine.generateRecommendation(area, analysis, request, language)
      );
    });
  
  // Create study session
  const suggestedStudySession = PersonalizedRecommendationEngine.createStudySession(
    immediateRecommendations, request, language
  );
  
  // Generate weekly plan
  const weeklyPlan = {
    week: 1,
    focus: immediateRecommendations.length > 0 ? 
      immediateRecommendations[0].content.topicId : 'general-improvement',
    dailySessions: Array.from({ length: request.preferences?.sessionFrequency || 3 }, (_, i) => ({
      day: ['Monday', 'Wednesday', 'Friday', 'Tuesday', 'Thursday', 'Saturday', 'Sunday'][i],
      sessionType: i % 2 === 0 ? 'deep-study' : 'practice',
      estimatedDuration: request.preferences?.studyTime || 30,
      keyTopics: immediateRecommendations.slice(0, 2).map(r => r.content.topicId)
    })),
    milestones: [
      {
        description: language === 'de' ? 'Erste Verbesserungen zeigen' :
                    language === 'la' ? 'Prima melioramenta ostendere' :
                    'Show first improvements',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        completionCriteria: language === 'de' ? '70% Erfolgsrate in Übungen' :
                           language === 'la' ? '70% successus in exercitationibus' :
                           '70% success rate in exercises'
      }
    ]
  };
  
  const now = new Date();
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  
  return {
    userId: request.userId,
    generatedDate: now.toISOString(),
    validUntil: nextWeek.toISOString(),
    immediateRecommendations,
    suggestedStudySession,
    weeklyPlan,
    progressPredictions: {
      nextWeek: {
        expectedProgress: 15,
        likelyStruggles: analysis.weaknessAreas.slice(0, 2),
        recommendations: [
          language === 'de' ? 'Fokussieren Sie sich auf schwache Bereiche' :
          language === 'la' ? 'In partes debiles concentrare' :
          'Focus on weak areas',
          language === 'de' ? 'Regelmäßige kurze Sitzungen' :
          language === 'la' ? 'Sessiones breves regulares' :
          'Regular short sessions'
        ]
      },
      nextMonth: {
        expectedMastery: Object.fromEntries(
          [...analysis.strengthAreas, ...analysis.nextLogicalSteps].map(area => [
            area, Math.floor(60 + Math.random() * 30)
          ])
        ),
        suggestedMilestones: [
          language === 'de' ? 'Erste Texte selbständig lesen' :
          language === 'la' ? 'Primos textus independenter legere' :
          'Read first texts independently',
          language === 'de' ? 'Grundgrammatik beherrschen' :
          language === 'la' ? 'Grammaticam fundamentalem dominari' :
          'Master basic grammar'
        ],
        adaptiveAdjustments: [
          language === 'de' ? 'Schwierigkeitsgrad anpassen' :
          language === 'la' ? 'Gradum difficultatis adaptare' :
          'Adjust difficulty level',
          language === 'de' ? 'Inhalte personalisieren' :
          language === 'la' ? 'Contentum personalizare' :
          'Personalize content'
        ]
      }
    },
    motivationalElements: {
      achievements: {
        recent: [
          language === 'de' ? 'Erste Woche abgeschlossen' :
          language === 'la' ? 'Prima hebdomada completa' :
          'First week completed'
        ],
        upcoming: [
          language === 'de' ? 'Erste Grammatiklektion meistern' :
          language === 'la' ? 'Primam lectionem grammaticam dominari' :
          'Master first grammar lesson'
        ]
      },
      encouragement: [
        language === 'de' ? 'Sie machen großartige Fortschritte!' :
        language === 'la' ? 'Progressus magnificos facis!' :
        'You are making great progress!',
        language === 'de' ? 'Bleiben Sie dran - Erfolg kommt mit Übung' :
        language === 'la' ? 'Persevera - successus cum exercitatione venit' :
        'Keep going - success comes with practice'
      ],
      challenges: [
        {
          title: language === 'de' ? '7-Tage Streak' :
                 language === 'la' ? 'Series 7 dierum' :
                 '7-Day Streak',
          description: language === 'de' ? 'Studieren Sie 7 Tage hintereinander' :
                      language === 'la' ? 'Studia 7 dies consecutive' :
                      'Study for 7 consecutive days',
          reward: language === 'de' ? 'Spezielle Anerkennungsmedaille' :
                 language === 'la' ? 'Medalla recognitionis specialis' :
                 'Special recognition badge',
          deadline: nextWeek.toISOString()
        }
      ]
    },
    metadata: {
      algorithmVersion: 'Macrobius-Personalization-v2.1',
      confidenceScore: 0.85,
      factors: {
        performance: request.currentPerformance ? 0.9 : 0.3,
        preferences: request.preferences ? 0.8 : 0.5,
        context: request.contextualFactors ? 0.7 : 0.4,
        history: request.learningHistory ? 0.9 : 0.2
      }
    }
  };
}

// ===== MAIN API HANDLER =====
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      status: 'error',
      error: 'Method not allowed. Use POST.'
    });
  }

  try {
    const request: RecommendationRequest = req.body;

    if (!request.userId || request.userId.trim().length === 0) {
      return res.status(400).json({
        status: 'error',
        error: 'userId is required and cannot be empty.'
      });
    }

    if (request.preferences?.difficultyPreference && 
        !['challenging', 'moderate', 'comfortable'].includes(request.preferences.difficultyPreference)) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid difficultyPreference. Must be: challenging, moderate, or comfortable.'
      });
    }

    if (request.preferences?.learningStyle && 
        !['visual', 'auditory', 'kinesthetic', 'reading', 'mixed'].includes(request.preferences.learningStyle)) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid learningStyle. Must be: visual, auditory, kinesthetic, reading, or mixed.'
      });
    }

    if (request.contextualFactors?.timeOfDay && 
        !['morning', 'afternoon', 'evening'].includes(request.contextualFactors.timeOfDay)) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid timeOfDay. Must be: morning, afternoon, or evening.'
      });
    }

    if (request.language && !['de', 'en', 'la'].includes(request.language)) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid language. Must be: de, en, or la.'
      });
    }

    const oracleResult = await generateRecommendationsWithOracle(request);
    
    if (oracleResult) {
      return res.status(200).json({
        status: 'success',
        data: oracleResult
      });
    }

    const fallbackResult = generateRecommendationsFallback(request);
    
    return res.status(200).json({
      status: 'fallback',
      data: fallbackResult,
      fallbackReason: 'Oracle Cloud unavailable - using intelligent recommendation algorithms'
    });

  } catch (error) {
    console.error('Personalized recommendations error:', error);
    
    try {
      const emergencyFallback = generateRecommendationsFallback({
        userId: req.body?.userId || 'anonymous',
        language: 'en'
      });
      
      return res.status(200).json({
        status: 'fallback',
        data: emergencyFallback,
        fallbackReason: 'System error - emergency recommendations provided'
      });
    } catch (emergencyError) {
      return res.status(500).json({
        status: 'error',
        error: 'Unable to generate recommendations due to system error.'
      });
    }
  }
}