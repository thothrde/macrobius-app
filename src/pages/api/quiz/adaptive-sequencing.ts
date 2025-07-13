import type { NextApiRequest, NextApiResponse } from 'next';

// ===== TYPES & INTERFACES =====
interface UserPerformance {
  userId: string;
  correctAnswers: number;
  totalQuestions: number;
  averageResponseTime: number;
  difficultyCounts: {
    beginner: { correct: number; total: number };
    intermediate: { correct: number; total: number };
    advanced: { correct: number; total: number };
  };
  topicPerformance: Record<string, { correct: number; total: number }>;
  recentSessionAccuracy: number;
  learningStreak: number;
}

interface AdaptiveSequenceRequest {
  userId: string;
  currentPerformance?: UserPerformance;
  sessionHistory?: {
    questionId: string;
    difficulty: string;
    topic: string;
    isCorrect: boolean;
    responseTime: number;
    timestamp: string;
  }[];
  preferences?: {
    targetDifficulty?: 'beginner' | 'intermediate' | 'advanced';
    focusTopics?: string[];
    avoidTopics?: string[];
    maxDifficultyJump?: number;
    language?: 'de' | 'en' | 'la';
  };
  sessionGoals?: {
    targetAccuracy?: number;
    maxQuestions?: number;
    timeLimit?: number;
    skillFocus?: string[];
  };
}

interface NextQuestionSuggestion {
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questionType: 'multiple-choice' | 'fill-blank' | 'translation' | 'grammar';
  topic: string;
  culturalTheme?: string;
  priority: number; // 1-10 scale
  reasoning: string;
  estimatedSuccessRate: number;
  learningObjective: string;
}

interface AdaptiveSequenceResponse {
  userId: string;
  nextQuestions: NextQuestionSuggestion[];
  currentDifficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  recommendedStudyPath: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  performanceInsights: {
    strengths: string[];
    weaknesses: string[];
    improvementTips: string[];
    estimatedMastery: Record<string, number>;
  };
  adaptiveParameters: {
    difficultyAdjustment: number;
    topicWeights: Record<string, number>;
    recommendedSessionLength: number;
    nextReviewDate?: string;
  };
}

interface APIResponse {
  status: 'success' | 'error' | 'fallback';
  data?: AdaptiveSequenceResponse;
  error?: string;
  fallbackReason?: string;
}

// ===== ORACLE CLOUD INTEGRATION =====
const ORACLE_ENDPOINT = process.env.ORACLE_CLOUD_ENDPOINT || 'http://152.70.184.232:8080';
const REQUEST_TIMEOUT = 25000; // 25 seconds

async function getAdaptiveSequenceFromOracle(
  request: AdaptiveSequenceRequest
): Promise<AdaptiveSequenceResponse | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await fetch(`${ORACLE_ENDPOINT}/api/quiz/adaptive-sequencing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Macrobius-Frontend/1.0'
      },
      body: JSON.stringify({
        userId: request.userId,
        currentPerformance: request.currentPerformance,
        sessionHistory: request.sessionHistory || [],
        preferences: request.preferences || {},
        sessionGoals: request.sessionGoals || {},
        requestTimestamp: new Date().toISOString(),
        algorithmsRequested: ['difficulty_adjustment', 'topic_sequencing', 'performance_prediction']
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`Oracle Cloud adaptive sequencing response not OK: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    
    // Validate Oracle response structure
    if (data.status === 'success' && data.adaptiveSequence) {
      return {
        userId: data.adaptiveSequence.userId || request.userId,
        nextQuestions: data.adaptiveSequence.nextQuestions || [],
        currentDifficultyLevel: data.adaptiveSequence.currentDifficultyLevel || 'intermediate',
        recommendedStudyPath: data.adaptiveSequence.recommendedStudyPath || {
          immediate: [],
          shortTerm: [],
          longTerm: []
        },
        performanceInsights: data.adaptiveSequence.performanceInsights || {
          strengths: [],
          weaknesses: [],
          improvementTips: [],
          estimatedMastery: {}
        },
        adaptiveParameters: data.adaptiveSequence.adaptiveParameters || {
          difficultyAdjustment: 0,
          topicWeights: {},
          recommendedSessionLength: 15
        }
      };
    }

    return null;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.warn('Oracle Cloud adaptive sequencing request timed out');
      } else {
        console.error('Oracle Cloud adaptive sequencing error:', error.message);
      }
    }
    return null;
  }
}

// ===== INTELLIGENT FALLBACK SYSTEM =====
function calculateAdaptiveSequenceFallback(
  request: AdaptiveSequenceRequest
): AdaptiveSequenceResponse {
  const userId = request.userId;
  const performance = request.currentPerformance;
  const sessionHistory = request.sessionHistory || [];
  const preferences = request.preferences || {};
  const language = preferences.language || 'en';

  // Calculate current proficiency level
  let currentDifficultyLevel: 'beginner' | 'intermediate' | 'advanced' = 'intermediate';
  
  if (performance) {
    const overallAccuracy = performance.totalQuestions > 0 
      ? performance.correctAnswers / performance.totalQuestions 
      : 0.5;
    
    if (overallAccuracy < 0.6) {
      currentDifficultyLevel = 'beginner';
    } else if (overallAccuracy > 0.8) {
      currentDifficultyLevel = 'advanced';
    }
  }

  // Analyze recent performance trends
  const recentAccuracy = sessionHistory.length > 0 
    ? sessionHistory.slice(-5).filter(h => h.isCorrect).length / Math.min(5, sessionHistory.length)
    : 0.5;

  // Difficulty adjustment based on recent performance
  let difficultyAdjustment = 0;
  if (recentAccuracy > 0.8) {
    difficultyAdjustment = 1; // Increase difficulty
  } else if (recentAccuracy < 0.5) {
    difficultyAdjustment = -1; // Decrease difficulty
  }

  // Topic analysis
  const topicPerformance = performance?.topicPerformance || {};
  const topicWeights: Record<string, number> = {};
  
  // Identify weak topics for focused practice
  const weakTopics: string[] = [];
  const strongTopics: string[] = [];
  
  Object.entries(topicPerformance).forEach(([topic, perf]) => {
    const accuracy = perf.total > 0 ? perf.correct / perf.total : 0.5;
    topicWeights[topic] = accuracy < 0.6 ? 2.0 : accuracy > 0.8 ? 0.5 : 1.0;
    
    if (accuracy < 0.6) weakTopics.push(topic);
    if (accuracy > 0.8) strongTopics.push(topic);
  });

  // Generate next question suggestions
  const nextQuestions: NextQuestionSuggestion[] = [];
  
  // Cultural themes and topics
  const culturalThemes = [
    'religious-practices', 'social-customs', 'philosophy', 
    'education', 'roman-history', 'literature', 'astronomy'
  ];
  
  const questionTypes: ('multiple-choice' | 'fill-blank' | 'translation' | 'grammar')[] = 
    ['multiple-choice', 'fill-blank', 'translation', 'grammar'];

  // Generate suggestions based on adaptive algorithm
  for (let i = 0; i < 5; i++) {
    let suggestedDifficulty = currentDifficultyLevel;
    
    // Apply difficulty adjustment
    if (difficultyAdjustment > 0 && currentDifficultyLevel === 'beginner') {
      suggestedDifficulty = 'intermediate';
    } else if (difficultyAdjustment > 0 && currentDifficultyLevel === 'intermediate') {
      suggestedDifficulty = 'advanced';
    } else if (difficultyAdjustment < 0 && currentDifficultyLevel === 'advanced') {
      suggestedDifficulty = 'intermediate';
    } else if (difficultyAdjustment < 0 && currentDifficultyLevel === 'intermediate') {
      suggestedDifficulty = 'beginner';
    }

    // Select topic based on performance
    let selectedTopic: string;
    let selectedTheme: string;
    
    if (weakTopics.length > 0 && i < 3) {
      // Focus on weak topics for first few suggestions
      selectedTopic = weakTopics[i % weakTopics.length];
      selectedTheme = culturalThemes[Math.floor(Math.random() * culturalThemes.length)];
    } else {
      // Mix of reinforcement and new topics
      selectedTopic = ['grammar', 'vocabulary', 'cultural-analysis', 'reading-comprehension'][i % 4];
      selectedTheme = culturalThemes[i % culturalThemes.length];
    }

    const questionType = questionTypes[i % questionTypes.length];
    
    // Calculate estimated success rate
    const baseSuccessRate = currentDifficultyLevel === 'beginner' ? 0.7 : 
                           currentDifficultyLevel === 'intermediate' ? 0.6 : 0.5;
    const topicModifier = topicWeights[selectedTopic] || 1.0;
    const estimatedSuccessRate = Math.min(0.95, Math.max(0.1, baseSuccessRate * (2 - topicModifier)));

    nextQuestions.push({
      difficulty: suggestedDifficulty,
      questionType,
      topic: selectedTopic,
      culturalTheme: selectedTheme,
      priority: 10 - i * 2, // Decreasing priority
      reasoning: language === 'de' 
        ? `Basierend auf Ihrer Leistung in ${selectedTopic} (${Math.round(estimatedSuccessRate * 100)}% Erfolgswahrscheinlichkeit)`
        : language === 'la'
        ? `Secundum praesentationem tuam in ${selectedTopic} (${Math.round(estimatedSuccessRate * 100)}% probabilitas successus)`
        : `Based on your performance in ${selectedTopic} (${Math.round(estimatedSuccessRate * 100)}% success probability)`,
      estimatedSuccessRate,
      learningObjective: language === 'de'
        ? `Verbesserung in ${selectedTopic} durch ${selectedTheme}`
        : language === 'la'
        ? `Progressus in ${selectedTopic} per ${selectedTheme}`
        : `Improvement in ${selectedTopic} through ${selectedTheme}`
    });
  }

  // Generate insights
  const insights = {
    strengths: strongTopics.length > 0 
      ? (language === 'de' 
          ? [`Starke Leistung in: ${strongTopics.join(', ')}`]
          : language === 'la'
          ? [`Robusta praestatio in: ${strongTopics.join(', ')}`]
          : [`Strong performance in: ${strongTopics.join(', ')}`])
      : (language === 'de' 
          ? ['Gleichmäßige Fortschritte in allen Bereichen']
          : language === 'la'
          ? ['Progressus aequalis in omnibus partibus']
          : ['Consistent progress across all areas']),
    
    weaknesses: weakTopics.length > 0 
      ? (language === 'de' 
          ? [`Verbesserungsbedarf in: ${weakTopics.join(', ')}`]
          : language === 'la'
          ? [`Opus melioramentum in: ${weakTopics.join(', ')}`]
          : [`Areas for improvement: ${weakTopics.join(', ')}`])
      : [],
    
    improvementTips: [
      language === 'de'
        ? 'Konzentrieren Sie sich auf regelmäßige Übung der schwächeren Themen'
        : language === 'la'
        ? 'Concentrate in exercitatione regulari argumentorum debiliorum'
        : 'Focus on regular practice of weaker topics',
      language === 'de'
        ? 'Verwenden Sie kulturelle Kontexte zur besseren Einprägung'
        : language === 'la'
        ? 'Utere contextibus culturalibus ad melius memoriam'
        : 'Use cultural contexts for better retention'
    ],
    
    estimatedMastery: Object.fromEntries(
      Object.entries(topicPerformance).map(([topic, perf]) => [
        topic,
        perf.total > 0 ? Math.round((perf.correct / perf.total) * 100) : 50
      ])
    )
  };

  return {
    userId,
    nextQuestions,
    currentDifficultyLevel,
    recommendedStudyPath: {
      immediate: weakTopics.slice(0, 2),
      shortTerm: weakTopics.slice(2, 5).concat(['cultural-context', 'reading-comprehension']),
      longTerm: ['advanced-grammar', 'literary-analysis', 'historical-context']
    },
    performanceInsights: insights,
    adaptiveParameters: {
      difficultyAdjustment,
      topicWeights,
      recommendedSessionLength: recentAccuracy > 0.7 ? 20 : 15,
      nextReviewDate: new Date(Date.now() + (recentAccuracy > 0.7 ? 2 : 1) * 24 * 60 * 60 * 1000).toISOString()
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
    const request: AdaptiveSequenceRequest = req.body;

    // Validate required parameters
    if (!request.userId) {
      return res.status(400).json({
        status: 'error',
        error: 'userId is required for adaptive sequencing.'
      });
    }

    // Validate preferences if provided
    if (request.preferences?.targetDifficulty && 
        !['beginner', 'intermediate', 'advanced'].includes(request.preferences.targetDifficulty)) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid target difficulty. Must be: beginner, intermediate, or advanced.'
      });
    }

    if (request.preferences?.language && 
        !['de', 'en', 'la'].includes(request.preferences.language)) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid language preference. Must be: de, en, or la.'
      });
    }

    // Try Oracle Cloud first
    const oracleResult = await getAdaptiveSequenceFromOracle(request);
    
    if (oracleResult) {
      return res.status(200).json({
        status: 'success',
        data: oracleResult
      });
    }

    // Use intelligent fallback
    const fallbackResult = calculateAdaptiveSequenceFallback(request);
    
    return res.status(200).json({
      status: 'fallback',
      data: fallbackResult,
      fallbackReason: 'Oracle Cloud unavailable - using intelligent adaptive algorithms'
    });

  } catch (error) {
    console.error('Adaptive sequencing error:', error);
    
    // Emergency fallback
    const emergencyFallback = calculateAdaptiveSequenceFallback({
      userId: req.body?.userId || 'anonymous',
      preferences: { language: 'en' }
    });
    
    return res.status(200).json({
      status: 'fallback',
      data: emergencyFallback,
      fallbackReason: 'System error - emergency adaptive content provided'
    });
  }
}