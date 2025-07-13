import type { NextApiRequest, NextApiResponse } from 'next';

// ===== TYPES & INTERFACES =====
interface SuperMemoRequest {
  cardId: string;
  currentData: {
    interval: number; // current interval in days
    repetition: number; // number of successful repetitions
    easeFactor: number; // ease factor (1.3 - 2.5)
    lastReviewDate: string;
    totalReviews: number;
    correctStreak: number;
    incorrectStreak: number;
  };
  quality: number; // 0-5 scale (0=blackout, 5=perfect)
  responseTime?: number; // in seconds
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  userId?: string;
  algorithmVariant?: 'SM2' | 'SM2-Enhanced' | 'Anki-Modified';
  language?: 'de' | 'en' | 'la';
}

interface SuperMemoResult {
  cardId: string;
  newInterval: number;
  newRepetition: number;
  newEaseFactor: number;
  nextReviewDate: string;
  reviewOutcome: 'again' | 'hard' | 'good' | 'easy';
  masteryLevel: number; // 0-100
  retentionProbability: number; // 0-1
  studyLoad: number; // daily study load contribution
  recommendations: {
    studyAdvice: string;
    nextSessionTiming: string;
    difficultyAdjustment: 'easier' | 'same' | 'harder' | 'much-harder';
    estimatedRetention: number;
  };
  algorithmDetails: {
    version: string;
    calculation: string;
    factors: {
      qualityImpact: number;
      timeImpact: number;
      historyImpact: number;
    };
  };
}

interface APIResponse {
  status: 'success' | 'error' | 'fallback';
  data?: SuperMemoResult;
  error?: string;
  fallbackReason?: string;
}

// ===== ORACLE CLOUD INTEGRATION =====
const ORACLE_ENDPOINT = process.env.ORACLE_CLOUD_ENDPOINT || 'http://152.70.184.232:8080';
const REQUEST_TIMEOUT = 25000; // 25 seconds

async function calculateSuperMemoWithOracle(
  request: SuperMemoRequest
): Promise<SuperMemoResult | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await fetch(`${ORACLE_ENDPOINT}/api/vocabulary/supermemo-algorithm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Macrobius-Frontend/1.0'
      },
      body: JSON.stringify({
        cardId: request.cardId,
        currentData: request.currentData,
        quality: request.quality,
        responseTime: request.responseTime,
        difficulty: request.difficulty,
        userId: request.userId,
        algorithmVariant: request.algorithmVariant || 'SM2-Enhanced',
        language: request.language || 'en',
        requestTimestamp: new Date().toISOString(),
        enhancedFeatures: ['retention_prediction', 'mastery_calculation', 'adaptive_difficulty']
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`Oracle Cloud SuperMemo response not OK: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    
    // Validate Oracle response structure
    if (data.status === 'success' && data.superMemoResult) {
      return {
        cardId: data.superMemoResult.cardId || request.cardId,
        newInterval: data.superMemoResult.newInterval || 1,
        newRepetition: data.superMemoResult.newRepetition || 0,
        newEaseFactor: data.superMemoResult.newEaseFactor || 2.5,
        nextReviewDate: data.superMemoResult.nextReviewDate || new Date().toISOString(),
        reviewOutcome: data.superMemoResult.reviewOutcome || 'good',
        masteryLevel: data.superMemoResult.masteryLevel || 50,
        retentionProbability: data.superMemoResult.retentionProbability || 0.9,
        studyLoad: data.superMemoResult.studyLoad || 1.0,
        recommendations: data.superMemoResult.recommendations || {
          studyAdvice: 'Continue regular practice',
          nextSessionTiming: 'As scheduled',
          difficultyAdjustment: 'same',
          estimatedRetention: 0.9
        },
        algorithmDetails: data.superMemoResult.algorithmDetails || {
          version: 'Oracle-Enhanced',
          calculation: 'Advanced algorithm with user-specific optimization',
          factors: {
            qualityImpact: 0.5,
            timeImpact: 0.3,
            historyImpact: 0.2
          }
        }
      };
    }

    return null;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.warn('Oracle Cloud SuperMemo request timed out');
      } else {
        console.error('Oracle Cloud SuperMemo error:', error.message);
      }
    }
    return null;
  }
}

// ===== SUPERMEMO ALGORITHM IMPLEMENTATIONS =====
class SuperMemoAlgorithms {
  
  // Original SuperMemo-2 Algorithm
  static SM2(currentData: SuperMemoRequest['currentData'], quality: number): Partial<SuperMemoResult> {
    let { interval, repetition, easeFactor } = currentData;
    
    if (quality >= 3) {
      // Correct response
      if (repetition === 0) {
        interval = 1;
      } else if (repetition === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetition += 1;
    } else {
      // Incorrect response - reset
      repetition = 0;
      interval = 1;
    }
    
    // Update ease factor based on quality
    easeFactor = Math.max(1.3, 
      easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    );
    
    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + interval);
    
    return {
      newInterval: interval,
      newRepetition: repetition,
      newEaseFactor: easeFactor,
      nextReviewDate: nextReviewDate.toISOString()
    };
  }
  
  // Enhanced SuperMemo-2 with additional factors
  static SM2Enhanced(
    currentData: SuperMemoRequest['currentData'], 
    quality: number, 
    responseTime?: number
  ): Partial<SuperMemoResult> {
    const baseResult = this.SM2(currentData, quality);
    
    // Apply response time modifier
    let timeModifier = 1.0;
    if (responseTime) {
      // Optimal response time: 3-10 seconds
      // Too fast (< 3s): might be guessing (-10%)
      // Too slow (> 30s): struggling (-20%)
      if (responseTime < 3) {
        timeModifier = 0.9;
      } else if (responseTime > 30) {
        timeModifier = 0.8;
      } else if (responseTime > 60) {
        timeModifier = 0.7;
      }
    }
    
    // Apply streak bonuses/penalties
    let streakModifier = 1.0;
    if (currentData.correctStreak >= 5) {
      streakModifier = 1.1; // 10% bonus for good streak
    } else if (currentData.incorrectStreak >= 3) {
      streakModifier = 0.9; // 10% penalty for poor streak
    }
    
    // Calculate final interval with modifiers
    const finalInterval = Math.max(1, 
      Math.round((baseResult.newInterval || 1) * timeModifier * streakModifier)
    );
    
    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + finalInterval);
    
    return {
      ...baseResult,
      newInterval: finalInterval,
      nextReviewDate: nextReviewDate.toISOString()
    };
  }
  
  // Anki-style modified algorithm
  static AnkiModified(
    currentData: SuperMemoRequest['currentData'], 
    quality: number
  ): Partial<SuperMemoResult> {
    let { interval, repetition, easeFactor } = currentData;
    
    // Anki quality mapping: 1=again, 2=hard, 3=good, 4=easy
    const ankiQuality = Math.max(1, Math.min(4, Math.round((quality / 5) * 4)));
    
    switch (ankiQuality) {
      case 1: // Again
        repetition = 0;
        interval = 1;
        easeFactor = Math.max(1.3, easeFactor - 0.2);
        break;
        
      case 2: // Hard
        interval = Math.max(1, Math.round(interval * 1.2));
        easeFactor = Math.max(1.3, easeFactor - 0.15);
        break;
        
      case 3: // Good
        if (repetition === 0) {
          interval = 1;
        } else if (repetition === 1) {
          interval = 6;
        } else {
          interval = Math.round(interval * easeFactor);
        }
        repetition += 1;
        break;
        
      case 4: // Easy
        if (repetition === 0) {
          interval = 4;
        } else {
          interval = Math.round(interval * easeFactor * 1.3);
        }
        repetition += 1;
        easeFactor = Math.min(2.5, easeFactor + 0.15);
        break;
    }
    
    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + interval);
    
    return {
      newInterval: interval,
      newRepetition: repetition,
      newEaseFactor: easeFactor,
      nextReviewDate: nextReviewDate.toISOString()
    };
  }
  
  // Calculate mastery level (0-100)
  static calculateMasteryLevel(currentData: SuperMemoRequest['currentData'], newData: Partial<SuperMemoResult>): number {
    const { repetition, totalReviews, correctStreak } = currentData;
    const newRepetition = newData.newRepetition || repetition;
    const newEaseFactor = newData.newEaseFactor || currentData.easeFactor;
    
    // Factors for mastery calculation
    const repetitionScore = Math.min(newRepetition / 10, 1) * 40; // 0-40 points
    const easeScore = ((newEaseFactor - 1.3) / 1.2) * 20;         // 0-20 points
    const streakScore = Math.min(correctStreak / 5, 1) * 25;      // 0-25 points
    const accuracyScore = totalReviews > 0 ? 
      (correctStreak / totalReviews) * 15 : 0;                     // 0-15 points
    
    return Math.round(repetitionScore + easeScore + streakScore + accuracyScore);
  }
  
  // Calculate retention probability
  static calculateRetentionProbability(interval: number, easeFactor: number): number {
    // Exponential decay model
    const baseRetention = 0.9;
    const decayRate = 0.05;
    const easeAdjustment = (easeFactor - 2.5) * 0.1; // ±0.2 max adjustment
    
    return Math.max(0.1, Math.min(0.99, 
      baseRetention * Math.exp(-decayRate * Math.sqrt(interval)) + easeAdjustment
    ));
  }
}

// ===== INTELLIGENT FALLBACK IMPLEMENTATION =====
function calculateSuperMemoFallback(request: SuperMemoRequest): SuperMemoResult {
  const language = request.language || 'en';
  const algorithmVariant = request.algorithmVariant || 'SM2-Enhanced';
  
  // Calculate using specified algorithm
  let algorithmResult: Partial<SuperMemoResult>;
  let calculationDetails: string;
  
  switch (algorithmVariant) {
    case 'SM2':
      algorithmResult = SuperMemoAlgorithms.SM2(request.currentData, request.quality);
      calculationDetails = 'Classic SuperMemo-2 algorithm';
      break;
      
    case 'Anki-Modified':
      algorithmResult = SuperMemoAlgorithms.AnkiModified(request.currentData, request.quality);
      calculationDetails = 'Anki-style modified algorithm with 4-point scale';
      break;
      
    case 'SM2-Enhanced':
    default:
      algorithmResult = SuperMemoAlgorithms.SM2Enhanced(
        request.currentData, 
        request.quality, 
        request.responseTime
      );
      calculationDetails = 'Enhanced SuperMemo-2 with response time and streak modifiers';
      break;
  }
  
  // Calculate additional metrics
  const masteryLevel = SuperMemoAlgorithms.calculateMasteryLevel(request.currentData, algorithmResult);
  const retentionProbability = SuperMemoAlgorithms.calculateRetentionProbability(
    algorithmResult.newInterval || 1,
    algorithmResult.newEaseFactor || 2.5
  );
  
  // Determine review outcome
  let reviewOutcome: SuperMemoResult['reviewOutcome'];
  if (request.quality === 0) reviewOutcome = 'again';
  else if (request.quality <= 2) reviewOutcome = 'hard';
  else if (request.quality <= 4) reviewOutcome = 'good';
  else reviewOutcome = 'easy';
  
  // Calculate study load (daily burden)
  const studyLoad = 1 / (algorithmResult.newInterval || 1);
  
  // Generate recommendations
  const generateRecommendations = (): SuperMemoResult['recommendations'] => {
    let studyAdvice: string;
    let difficultyAdjustment: SuperMemoResult['recommendations']['difficultyAdjustment'];
    let nextSessionTiming: string;
    
    if (language === 'de') {
      if (request.quality >= 4) {
        studyAdvice = 'Ausgezeichnet! Sie beherrschen dieses Wort gut.';
        difficultyAdjustment = 'harder';
        nextSessionTiming = 'Wie geplant';
      } else if (request.quality >= 3) {
        studyAdvice = 'Gut gemacht. Weiter so!';
        difficultyAdjustment = 'same';
        nextSessionTiming = 'Regelmäßige Wiederholung';
      } else {
        studyAdvice = 'Dieses Wort braucht mehr Übung.';
        difficultyAdjustment = 'easier';
        nextSessionTiming = 'Frühere Wiederholung empfohlen';
      }
    } else if (language === 'la') {
      if (request.quality >= 4) {
        studyAdvice = 'Optime! Hoc verbum bene tenes.';
        difficultyAdjustment = 'harder';
        nextSessionTiming = 'Ut plannatum';
      } else if (request.quality >= 3) {
        studyAdvice = 'Bene factum. Perge sic!';
        difficultyAdjustment = 'same';
        nextSessionTiming = 'Repetitio regularis';
      } else {
        studyAdvice = 'Hoc verbum plus exercitationis eget.';
        difficultyAdjustment = 'easier';
        nextSessionTiming = 'Repetitio prior commendatur';
      }
    } else {
      if (request.quality >= 4) {
        studyAdvice = 'Excellent! You have mastered this word well.';
        difficultyAdjustment = 'harder';
        nextSessionTiming = 'As scheduled';
      } else if (request.quality >= 3) {
        studyAdvice = 'Good work. Keep it up!';
        difficultyAdjustment = 'same';
        nextSessionTiming = 'Regular review';
      } else {
        studyAdvice = 'This word needs more practice.';
        difficultyAdjustment = 'easier';
        nextSessionTiming = 'Earlier review recommended';
      }
    }
    
    return {
      studyAdvice,
      nextSessionTiming,
      difficultyAdjustment,
      estimatedRetention: retentionProbability
    };
  };
  
  return {
    cardId: request.cardId,
    newInterval: algorithmResult.newInterval || 1,
    newRepetition: algorithmResult.newRepetition || 0,
    newEaseFactor: algorithmResult.newEaseFactor || 2.5,
    nextReviewDate: algorithmResult.nextReviewDate || new Date().toISOString(),
    reviewOutcome,
    masteryLevel,
    retentionProbability,
    studyLoad,
    recommendations: generateRecommendations(),
    algorithmDetails: {
      version: algorithmVariant,
      calculation: calculationDetails,
      factors: {
        qualityImpact: request.quality / 5,
        timeImpact: request.responseTime ? Math.min(request.responseTime / 30, 1) : 0.5,
        historyImpact: request.currentData.totalReviews > 0 ? 
          request.currentData.correctStreak / request.currentData.totalReviews : 0.5
      }
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
    const request: SuperMemoRequest = req.body;

    // Validate required parameters
    if (!request.cardId) {
      return res.status(400).json({
        status: 'error',
        error: 'cardId is required for SuperMemo calculation.'
      });
    }

    if (!request.currentData) {
      return res.status(400).json({
        status: 'error',
        error: 'currentData is required for SuperMemo calculation.'
      });
    }

    if (request.quality === undefined || request.quality < 0 || request.quality > 5) {
      return res.status(400).json({
        status: 'error',
        error: 'quality is required and must be between 0 and 5.'
      });
    }

    // Validate currentData structure
    const requiredFields = ['interval', 'repetition', 'easeFactor', 'totalReviews', 'correctStreak', 'incorrectStreak'];
    for (const field of requiredFields) {
      if (request.currentData[field as keyof typeof request.currentData] === undefined) {
        return res.status(400).json({
          status: 'error',
          error: `currentData.${field} is required.`
        });
      }
    }

    // Validate ease factor range
    if (request.currentData.easeFactor < 1.3 || request.currentData.easeFactor > 2.5) {
      return res.status(400).json({
        status: 'error',
        error: 'easeFactor must be between 1.3 and 2.5.'
      });
    }

    // Validate optional parameters
    if (request.algorithmVariant && !['SM2', 'SM2-Enhanced', 'Anki-Modified'].includes(request.algorithmVariant)) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid algorithmVariant. Must be: SM2, SM2-Enhanced, or Anki-Modified.'
      });
    }

    if (request.language && !['de', 'en', 'la'].includes(request.language)) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid language. Must be: de, en, or la.'
      });
    }

    // Try Oracle Cloud first
    const oracleResult = await calculateSuperMemoWithOracle(request);
    
    if (oracleResult) {
      return res.status(200).json({
        status: 'success',
        data: oracleResult
      });
    }

    // Use intelligent fallback
    const fallbackResult = calculateSuperMemoFallback(request);
    
    return res.status(200).json({
      status: 'fallback',
      data: fallbackResult,
      fallbackReason: 'Oracle Cloud unavailable - using intelligent SuperMemo algorithms'
    });

  } catch (error) {
    console.error('SuperMemo calculation error:', error);
    
    // Emergency fallback
    try {
      const emergencyFallback = calculateSuperMemoFallback({
        cardId: req.body?.cardId || 'unknown',
        currentData: req.body?.currentData || {
          interval: 1,
          repetition: 0,
          easeFactor: 2.5,
          lastReviewDate: new Date().toISOString(),
          totalReviews: 0,
          correctStreak: 0,
          incorrectStreak: 0
        },
        quality: req.body?.quality || 3,
        algorithmVariant: 'SM2-Enhanced',
        language: 'en'
      });
      
      return res.status(200).json({
        status: 'fallback',
        data: emergencyFallback,
        fallbackReason: 'System error - emergency SuperMemo calculation provided'
      });
    } catch (emergencyError) {
      return res.status(500).json({
        status: 'error',
        error: 'Unable to calculate SuperMemo due to system error.'
      });
    }
  }
}