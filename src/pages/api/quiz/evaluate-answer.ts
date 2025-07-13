import type { NextApiRequest, NextApiResponse } from 'next';

// ===== TYPES & INTERFACES =====
interface EvaluateAnswerRequest {
  questionId: string;
  userAnswer: string | string[];
  questionType: 'multiple-choice' | 'fill-blank' | 'translation' | 'grammar';
  correctAnswer: string | string[];
  userId?: string;
  responseTime?: number; // in seconds
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  topic?: string;
  culturalTheme?: string;
  language?: 'de' | 'en' | 'la';
  sessionId?: string;
}

interface DetailedFeedback {
  isCorrect: boolean;
  score: number; // 0-100
  explanation: string;
  mistakes?: {
    type: 'grammar' | 'vocabulary' | 'cultural' | 'comprehension';
    description: string;
    correction: string;
    learningTip: string;
  }[];
  strengthsIdentified?: string[];
  improvementAreas?: string[];
  relatedConcepts?: string[];
  nextSteps?: string[];
}

interface PerformanceMetrics {
  accuracy: number;
  speed: 'fast' | 'normal' | 'slow';
  confidence: number; // estimated 0-100
  difficultyAppropriate: boolean;
  masteryLevel: number; // 0-100
  progressIndicators: {
    improvement: boolean;
    consistency: boolean;
    readiness: 'next-level' | 'more-practice' | 'review-basics';
  };
}

interface LearningAnalytics {
  conceptsReinforced: string[];
  knowledgeGaps: string[];
  recommendedReview: string[];
  adaptiveAdjustments: {
    difficultyChange: -2 | -1 | 0 | 1 | 2;
    topicFocus: string[];
    timeAllocation: Record<string, number>;
  };
  culturalInsights?: string[];
}

interface EvaluateAnswerResponse {
  questionId: string;
  feedback: DetailedFeedback;
  performance: PerformanceMetrics;
  analytics: LearningAnalytics;
  sessionUpdate?: {
    totalQuestions: number;
    correctAnswers: number;
    currentStreak: number;
    sessionAccuracy: number;
    timeSpent: number;
  };
  recommendations: {
    nextQuestionType?: 'multiple-choice' | 'fill-blank' | 'translation' | 'grammar';
    nextDifficulty?: 'beginner' | 'intermediate' | 'advanced';
    focusTopics?: string[];
    studyMaterials?: string[];
  };
}

interface APIResponse {
  status: 'success' | 'error' | 'fallback';
  data?: EvaluateAnswerResponse;
  error?: string;
  fallbackReason?: string;
}

// ===== ORACLE CLOUD INTEGRATION =====
const ORACLE_ENDPOINT = process.env.ORACLE_CLOUD_ENDPOINT || 'http://152.70.184.232:8080';
const REQUEST_TIMEOUT = 25000; // 25 seconds

async function evaluateAnswerWithOracle(
  request: EvaluateAnswerRequest
): Promise<EvaluateAnswerResponse | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await fetch(`${ORACLE_ENDPOINT}/api/quiz/evaluate-answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Macrobius-Frontend/1.0'
      },
      body: JSON.stringify({
        questionId: request.questionId,
        userAnswer: request.userAnswer,
        questionType: request.questionType,
        correctAnswer: request.correctAnswer,
        userId: request.userId,
        responseTime: request.responseTime,
        difficulty: request.difficulty,
        topic: request.topic,
        culturalTheme: request.culturalTheme,
        language: request.language || 'en',
        sessionId: request.sessionId,
        requestTimestamp: new Date().toISOString(),
        analysisRequested: ['detailed_feedback', 'performance_metrics', 'learning_analytics', 'adaptive_recommendations']
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`Oracle Cloud answer evaluation response not OK: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    
    // Validate Oracle response structure
    if (data.status === 'success' && data.evaluation) {
      return {
        questionId: data.evaluation.questionId || request.questionId,
        feedback: data.evaluation.feedback || {
          isCorrect: false,
          score: 0,
          explanation: 'Evaluation unavailable'
        },
        performance: data.evaluation.performance || {
          accuracy: 0,
          speed: 'normal',
          confidence: 50,
          difficultyAppropriate: true,
          masteryLevel: 50,
          progressIndicators: {
            improvement: false,
            consistency: false,
            readiness: 'more-practice'
          }
        },
        analytics: data.evaluation.analytics || {
          conceptsReinforced: [],
          knowledgeGaps: [],
          recommendedReview: [],
          adaptiveAdjustments: {
            difficultyChange: 0,
            topicFocus: [],
            timeAllocation: {}
          }
        },
        sessionUpdate: data.evaluation.sessionUpdate,
        recommendations: data.evaluation.recommendations || {
          nextQuestionType: 'multiple-choice',
          nextDifficulty: 'intermediate',
          focusTopics: [],
          studyMaterials: []
        }
      };
    }

    return null;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.warn('Oracle Cloud answer evaluation request timed out');
      } else {
        console.error('Oracle Cloud answer evaluation error:', error.message);
      }
    }
    return null;
  }
}

// ===== INTELLIGENT FALLBACK EVALUATION =====
function evaluateAnswerIntelligentFallback(
  request: EvaluateAnswerRequest
): EvaluateAnswerResponse {
  const language = request.language || 'en';
  
  // Normalize answers for comparison
  const normalizeAnswer = (answer: string | string[]): string[] => {
    if (Array.isArray(answer)) {
      return answer.map(a => a.toLowerCase().trim());
    }
    return [answer.toLowerCase().trim()];
  };

  const userAnswers = normalizeAnswer(request.userAnswer);
  const correctAnswers = normalizeAnswer(request.correctAnswer);

  // Evaluate correctness
  let isCorrect = false;
  let score = 0;
  let partialCredit = 0;

  if (request.questionType === 'multiple-choice') {
    isCorrect = userAnswers[0] === correctAnswers[0];
    score = isCorrect ? 100 : 0;
  } else if (request.questionType === 'fill-blank') {
    // Check for exact matches or acceptable variations
    const correctCount = userAnswers.filter(userAns => 
      correctAnswers.some(correctAns => 
        userAns === correctAns || 
        // Allow for common variations (endings, etc.)
        (Math.abs(userAns.length - correctAns.length) <= 2 && 
         userAns.includes(correctAns.substring(0, correctAns.length - 2)))
      )
    ).length;
    
    partialCredit = correctCount / Math.max(userAnswers.length, correctAnswers.length);
    isCorrect = partialCredit >= 0.8;
    score = Math.round(partialCredit * 100);
  } else if (request.questionType === 'translation') {
    // Basic semantic similarity for translation
    const keyWords = correctAnswers[0].split(' ').filter(word => word.length > 3);
    const userText = userAnswers[0];
    const matchedKeywords = keyWords.filter(keyword => 
      userText.includes(keyword.toLowerCase()) ||
      userText.includes(keyword.substring(0, keyword.length - 1)) // stem matching
    );
    
    partialCredit = matchedKeywords.length / keyWords.length;
    isCorrect = partialCredit >= 0.7;
    score = Math.round(partialCredit * 100);
  } else if (request.questionType === 'grammar') {
    // Grammar evaluation with partial credit
    isCorrect = userAnswers.some(userAns => 
      correctAnswers.some(correctAns => userAns === correctAns)
    );
    score = isCorrect ? 100 : 30; // Some partial credit for attempt
  }

  // Performance analysis
  const responseTime = request.responseTime || 60;
  let speed: 'fast' | 'normal' | 'slow';
  
  if (responseTime < 30) speed = 'fast';
  else if (responseTime > 90) speed = 'slow';
  else speed = 'normal';

  const confidence = isCorrect ? 
    (speed === 'fast' ? 90 : speed === 'normal' ? 80 : 70) :
    (speed === 'fast' ? 30 : speed === 'normal' ? 50 : 60);

  // Generate feedback based on performance
  const generateFeedback = (): DetailedFeedback => {
    let explanation: string;
    const mistakes: DetailedFeedback['mistakes'] = [];
    const strengthsIdentified: string[] = [];
    const improvementAreas: string[] = [];
    const relatedConcepts: string[] = [];
    const nextSteps: string[] = [];

    if (language === 'de') {
      explanation = isCorrect 
        ? `Ausgezeichnet! Ihre Antwort ist korrekt (${score}/100 Punkte).`
        : `Nicht ganz richtig (${score}/100 Punkte). Die korrekte Antwort ist: ${request.correctAnswer}.`;
      
      if (isCorrect) {
        strengthsIdentified.push('Gutes Verständnis des Konzepts');
        if (speed === 'fast') strengthsIdentified.push('Schnelle Antwortzeit');
        nextSteps.push('Versuchen Sie eine schwierigere Frage');
      } else {
        improvementAreas.push('Überprüfung der Grundlagen empfohlen');
        nextSteps.push('Wiederholen Sie ähnliche Übungen');
      }
      
      relatedConcepts.push('Römische Kultur', 'Lateinische Grammatik', 'Historischer Kontext');
    } else if (language === 'la') {
      explanation = isCorrect 
        ? `Optime! Responsio tua recta est (${score}/100 puncta).`
        : `Non omnino rectum (${score}/100 puncta). Responsio recta est: ${request.correctAnswer}.`;
      
      if (isCorrect) {
        strengthsIdentified.push('Bona intellectio conceptus');
        if (speed === 'fast') strengthsIdentified.push('Tempus responsionis celerum');
        nextSteps.push('Conare quaestionem difficiliorem');
      } else {
        improvementAreas.push('Revisio fundamentorum commendatur');
        nextSteps.push('Repete exercitationes similes');
      }
      
      relatedConcepts.push('Cultura Romana', 'Grammatica Latina', 'Contextus historicus');
    } else {
      explanation = isCorrect 
        ? `Excellent! Your answer is correct (${score}/100 points).`
        : `Not quite right (${score}/100 points). The correct answer is: ${request.correctAnswer}.`;
      
      if (isCorrect) {
        strengthsIdentified.push('Good understanding of the concept');
        if (speed === 'fast') strengthsIdentified.push('Quick response time');
        nextSteps.push('Try a more challenging question');
      } else {
        improvementAreas.push('Review of fundamentals recommended');
        nextSteps.push('Practice similar exercises');
      }
      
      relatedConcepts.push('Roman culture', 'Latin grammar', 'Historical context');
    }

    // Add specific mistakes for incorrect answers
    if (!isCorrect) {
      if (request.questionType === 'grammar') {
        mistakes.push({
          type: 'grammar',
          description: language === 'de' ? 'Grammatikfehler identifiziert' 
            : language === 'la' ? 'Error grammaticus identificatus'
            : 'Grammar error identified',
          correction: Array.isArray(request.correctAnswer) ? request.correctAnswer[0] : request.correctAnswer,
          learningTip: language === 'de' ? 'Überprüfen Sie die Kasusendungen'
            : language === 'la' ? 'Inspice terminationes casuum'
            : 'Review case endings'
        });
      } else if (request.questionType === 'translation') {
        mistakes.push({
          type: 'vocabulary',
          description: language === 'de' ? 'Übersetzung benötigt Verbesserung'
            : language === 'la' ? 'Translatio melioramentum requirit'
            : 'Translation needs improvement',
          correction: Array.isArray(request.correctAnswer) ? request.correctAnswer[0] : request.correctAnswer,
          learningTip: language === 'de' ? 'Achten Sie auf Wortbedeutungen im Kontext'
            : language === 'la' ? 'Attende significationes verborum in contextu'
            : 'Pay attention to word meanings in context'
        });
      }
    }

    return {
      isCorrect,
      score,
      explanation,
      mistakes: mistakes.length > 0 ? mistakes : undefined,
      strengthsIdentified: strengthsIdentified.length > 0 ? strengthsIdentified : undefined,
      improvementAreas: improvementAreas.length > 0 ? improvementAreas : undefined,
      relatedConcepts,
      nextSteps
    };
  };

  // Generate performance metrics
  const performance: PerformanceMetrics = {
    accuracy: score,
    speed,
    confidence,
    difficultyAppropriate: true, // Default assumption
    masteryLevel: score, // Simplified for fallback
    progressIndicators: {
      improvement: isCorrect && speed !== 'slow',
      consistency: isCorrect,
      readiness: isCorrect && speed === 'fast' ? 'next-level' : 
                isCorrect ? 'more-practice' : 'review-basics'
    }
  };

  // Generate learning analytics
  const analytics: LearningAnalytics = {
    conceptsReinforced: isCorrect ? [request.topic || 'general'] : [],
    knowledgeGaps: !isCorrect ? [request.topic || 'general'] : [],
    recommendedReview: !isCorrect ? [request.culturalTheme || 'basic-concepts'] : [],
    adaptiveAdjustments: {
      difficultyChange: isCorrect && speed === 'fast' ? 1 : 
                       !isCorrect ? -1 : 0,
      topicFocus: !isCorrect && request.topic ? [request.topic] : [],
      timeAllocation: {
        [request.topic || 'general']: !isCorrect ? 1.5 : 1.0
      }
    },
    culturalInsights: request.culturalTheme ? [request.culturalTheme] : undefined
  };

  // Generate recommendations
  const recommendations = {
    nextQuestionType: request.questionType, // Stay with same type if struggling
    nextDifficulty: performance.progressIndicators.readiness === 'next-level' ? 
      (request.difficulty === 'beginner' ? 'intermediate' as const : 
       request.difficulty === 'intermediate' ? 'advanced' as const : 'advanced' as const) :
      performance.progressIndicators.readiness === 'review-basics' ?
      (request.difficulty === 'advanced' ? 'intermediate' as const :
       request.difficulty === 'intermediate' ? 'beginner' as const : 'beginner' as const) :
      request.difficulty,
    focusTopics: analytics.knowledgeGaps.length > 0 ? analytics.knowledgeGaps : 
                analytics.conceptsReinforced,
    studyMaterials: [
      language === 'de' ? 'Macrobius Saturnalia Texte' 
        : language === 'la' ? 'Textus Saturnaliorum Macrobii'
        : 'Macrobius Saturnalia texts',
      language === 'de' ? 'Kulturelle Kontexte' 
        : language === 'la' ? 'Contextus culturales'
        : 'Cultural contexts'
    ]
  };

  return {
    questionId: request.questionId,
    feedback: generateFeedback(),
    performance,
    analytics,
    recommendations
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
    const request: EvaluateAnswerRequest = req.body;

    // Validate required parameters
    if (!request.questionId) {
      return res.status(400).json({
        status: 'error',
        error: 'questionId is required for answer evaluation.'
      });
    }

    if (!request.userAnswer) {
      return res.status(400).json({
        status: 'error',
        error: 'userAnswer is required for evaluation.'
      });
    }

    if (!request.correctAnswer) {
      return res.status(400).json({
        status: 'error',
        error: 'correctAnswer is required for evaluation.'
      });
    }

    if (!request.questionType || !['multiple-choice', 'fill-blank', 'translation', 'grammar'].includes(request.questionType)) {
      return res.status(400).json({
        status: 'error',
        error: 'Valid questionType is required. Must be: multiple-choice, fill-blank, translation, or grammar.'
      });
    }

    // Validate optional parameters
    if (request.difficulty && !['beginner', 'intermediate', 'advanced'].includes(request.difficulty)) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid difficulty level. Must be: beginner, intermediate, or advanced.'
      });
    }

    if (request.language && !['de', 'en', 'la'].includes(request.language)) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid language. Must be: de, en, or la.'
      });
    }

    // Try Oracle Cloud first
    const oracleResult = await evaluateAnswerWithOracle(request);
    
    if (oracleResult) {
      return res.status(200).json({
        status: 'success',
        data: oracleResult
      });
    }

    // Use intelligent fallback
    const fallbackResult = evaluateAnswerIntelligentFallback(request);
    
    return res.status(200).json({
      status: 'fallback',
      data: fallbackResult,
      fallbackReason: 'Oracle Cloud unavailable - using intelligent evaluation algorithms'
    });

  } catch (error) {
    console.error('Answer evaluation error:', error);
    
    // Emergency fallback
    try {
      const emergencyFallback = evaluateAnswerIntelligentFallback({
        questionId: req.body?.questionId || 'unknown',
        userAnswer: req.body?.userAnswer || '',
        correctAnswer: req.body?.correctAnswer || '',
        questionType: req.body?.questionType || 'multiple-choice',
        language: 'en'
      });
      
      return res.status(200).json({
        status: 'fallback',
        data: emergencyFallback,
        fallbackReason: 'System error - emergency evaluation provided'
      });
    } catch (emergencyError) {
      return res.status(500).json({
        status: 'error',
        error: 'Unable to evaluate answer due to system error.'
      });
    }
  }
}