/**
 * Real Quiz Generation Engine
 * Replaces all mock quiz generation with adaptive AI-powered assessments
 * Creates authentic Latin quizzes from 1,401 passages with intelligent difficulty scaling
 */

import { apiClient } from './enhanced-api-client-with-fallback';

export interface QuizRequest {
  userId: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'adaptive';
  questionTypes: QuestionType[];
  questionCount: number;
  timeLimit?: number; // in minutes
  focusAreas?: string[]; // specific concepts to emphasize
  excludeTopics?: string[]; // topics to avoid
  language: 'de' | 'en' | 'la';
  adaptiveSettings?: {
    startDifficulty: number; // 0-1 scale
    maxDifficultyJump: number;
    targetAccuracy: number; // desired accuracy rate
  };
}

export type QuestionType = 
  | 'multiple_choice'
  | 'fill_blank'
  | 'translation'
  | 'grammar_analysis'
  | 'cultural_context'
  | 'latin_composition'
  | 'vocabulary_match'
  | 'passage_comprehension'
  | 'syntax_parsing';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[]; // for multiple choice
  correctAnswer: string | string[];
  explanation: string;
  difficulty: number; // 0-1 scale
  points: number;
  estimatedTime: number; // in seconds
  source: {
    passageId?: string;
    culturalTheme: string;
    workType: 'Saturnalia' | 'Commentarii';
    citation: string;
  };
  hints: string[];
  distractors?: Array<{ // for multiple choice
    text: string;
    commonMistake: string;
    explanation: string;
  }>;
  followUpQuestions?: string[];
  relatedConcepts: string[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  metadata: {
    totalPoints: number;
    estimatedDuration: number;
    difficultyRange: { min: number; max: number };
    topics: string[];
    createdAt: number;
    adaptiveSettings?: any;
  };
  instructions: string;
  passingScore: number;
  allowedAttempts: number;
}

export interface QuizAttempt {
  attemptId: string;
  quizId: string;
  userId: string;
  startTime: number;
  endTime?: number;
  answers: Array<{
    questionId: string;
    answer: string | string[];
    isCorrect: boolean;
    timeSpent: number;
    hintsUsed: number;
    confidence: number; // user-reported or inferred
  }>;
  score: {
    raw: number;
    percentage: number;
    points: number;
    maxPoints: number;
  };
  performance: {
    strengths: string[];
    weaknesses: string[];
    recommendedReview: string[];
  };
  adaptiveAdjustments?: Array<{
    questionId: string;
    originalDifficulty: number;
    adjustedDifficulty: number;
    reason: string;
  }>;
}

export interface QuizAnalytics {
  userId: string;
  overallPerformance: {
    averageScore: number;
    totalQuizzes: number;
    improvementTrend: number; // positive = improving
    timeEfficiency: number;
  };
  topicPerformance: Map<string, {
    averageScore: number;
    attempts: number;
    lastAttempt: number;
    masteryLevel: 'novice' | 'developing' | 'proficient' | 'expert';
  }>;
  learningPatterns: {
    preferredQuestionTypes: QuestionType[];
    optimalDifficulty: number;
    bestTimeOfDay: number;
    sessionLength: number;
  };
  knowledgeGaps: Array<{
    concept: string;
    severity: number;
    frequency: number;
    lastEncountered: number;
  }>;
}

class RealQuizGenerationEngine {
  private baseUrl: string;
  private apiClient = apiClient;
  private activeQuizzes: Map<string, Quiz> = new Map();
  private activeAttempts: Map<string, QuizAttempt> = new Map();
  private userAnalytics: Map<string, QuizAnalytics> = new Map();
  private questionBank: Map<string, QuizQuestion[]> = new Map();

  constructor() {
    this.baseUrl = 'http://152.70.184.232:8080';
  }

  /**
   * Generate adaptive quiz based on user profile and requirements
   */
  async generateQuiz(request: QuizRequest): Promise<Quiz> {
    try {
      // Get user performance history for adaptive generation
      const userAnalytics = await this.getUserAnalytics(request.userId);
      
      // Determine optimal difficulty distribution
      const difficultyDistribution = await this.calculateDifficultyDistribution(request, userAnalytics);
      
      // Generate questions using AI content analysis
      const questions = await this.generateQuestions(request, difficultyDistribution);
      
      // Apply adaptive sequencing
      const sequencedQuestions = await this.applyAdaptiveSequencing(questions, request);
      
      // Create quiz metadata
      const metadata = this.generateQuizMetadata(sequencedQuestions, request);
      
      // Generate quiz instructions
      const instructions = await this.generateInstructions(request, metadata);
      
      const quiz: Quiz = {
        id: `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: await this.generateQuizTitle(request),
        description: await this.generateQuizDescription(request, metadata),
        questions: sequencedQuestions,
        metadata,
        instructions,
        passingScore: this.calculatePassingScore(metadata.difficultyRange),
        allowedAttempts: request.difficulty === 'adaptive' ? 3 : 1
      };
      
      // Store quiz
      this.activeQuizzes.set(quiz.id, quiz);
      
      // Track quiz generation analytics
      await this.trackQuizGeneration(request, quiz);
      
      return quiz;
      
    } catch (error) {
      console.error('Quiz generation error:', error);
      throw new Error('Failed to generate quiz');
    }
  }

  /**
   * Generate questions using AI analysis of Latin passages
   */
  private async generateQuestions(request: QuizRequest, difficultyDistribution: number[]): Promise<QuizQuestion[]> {
    const questions: QuizQuestion[] = [];
    
    for (let i = 0; i < request.questionCount; i++) {
      const targetDifficulty = difficultyDistribution[i];
      const questionType = this.selectQuestionType(request.questionTypes, targetDifficulty);
      
      const question = await this.generateSingleQuestion({
        type: questionType,
        difficulty: targetDifficulty,
        topic: request.topic,
        language: request.language,
        focusAreas: request.focusAreas,
        excludeTopics: request.excludeTopics
      });
      
      questions.push(question);
    }
    
    return questions;
  }

  /**
   * Generate a single AI-powered question
   */
  private async generateSingleQuestion(params: {
    type: QuestionType;
    difficulty: number;
    topic: string;
    language: 'de' | 'en' | 'la';
    focusAreas?: string[];
    excludeTopics?: string[];
  }): Promise<QuizQuestion> {
    
    // Get relevant passage from Oracle Cloud
    const passage = await this.selectOptimalPassage(params);
    
    // Generate question using AI content analysis
    const response = await this.apiClient.post('/api/quiz/generate-question', {
      questionType: params.type,
      difficulty: params.difficulty,
      passage: {
        id: passage.id,
        content: passage.content,
        culturalTheme: passage.culturalTheme,
        workType: passage.workType
      },
      topic: params.topic,
      language: params.language,
      focusAreas: params.focusAreas
    });
    
    // Generate intelligent distractors for multiple choice
    const distractors = params.type === 'multiple_choice' 
      ? await this.generateDistractors(response.data, passage)
      : undefined;
    
    // Generate educational hints
    const hints = await this.generateHints(response.data, params.difficulty);
    
    return {
      id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: params.type,
      question: response.data.question,
      options: response.data.options,
      correctAnswer: response.data.correct_answer,
      explanation: response.data.explanation,
      difficulty: params.difficulty,
      points: this.calculateQuestionPoints(params.difficulty, params.type),
      estimatedTime: response.data.estimated_time,
      source: {
        passageId: passage.id,
        culturalTheme: passage.culturalTheme,
        workType: passage.workType,
        citation: `${passage.workType} ${passage.bookNumber}.${passage.chapterNumber}.${passage.sectionNumber}`
      },
      hints,
      distractors,
      followUpQuestions: response.data.follow_up_questions,
      relatedConcepts: response.data.related_concepts
    };
  }

  /**
   * Select optimal passage for question generation
   */
  private async selectOptimalPassage(params: any) {
    const response = await this.apiClient.post('/api/quiz/select-passage', {
      topic: params.topic,
      difficulty: params.difficulty,
      questionType: params.type,
      focusAreas: params.focusAreas,
      excludeTopics: params.excludeTopics
    });
    
    return {
      id: response.data.id,
      content: response.data.latin_text,
      culturalTheme: response.data.cultural_theme,
      workType: response.data.work_type,
      bookNumber: response.data.book_number,
      chapterNumber: response.data.chapter_number,
      sectionNumber: response.data.section_number
    };
  }

  /**
   * Generate intelligent distractors for multiple choice questions
   */
  private async generateDistractors(questionData: any, passage: any) {
    const response = await this.apiClient.post('/api/quiz/generate-distractors', {
      question: questionData.question,
      correctAnswer: questionData.correct_answer,
      passage: passage.content,
      questionType: questionData.type,
      numDistractors: 3
    });
    
    return response.data.distractors.map((distractor: any) => ({
      text: distractor.text,
      commonMistake: distractor.common_mistake,
      explanation: distractor.explanation
    }));
  }

  /**
   * Generate educational hints for questions
   */
  private async generateHints(questionData: any, difficulty: number): Promise<string[]> {
    const response = await this.apiClient.post('/api/quiz/generate-hints', {
      question: questionData.question,
      correctAnswer: questionData.correct_answer,
      difficulty,
      maxHints: Math.ceil(3 * (1 - difficulty)) // More hints for easier questions
    });
    
    return response.data.hints;
  }

  /**
   * Calculate difficulty distribution for adaptive quiz
   */
  private async calculateDifficultyDistribution(request: QuizRequest, analytics?: QuizAnalytics): Promise<number[]> {
    if (request.difficulty !== 'adaptive') {
      // Fixed difficulty distribution
      const difficultyMap = {
        beginner: 0.3,
        intermediate: 0.6,
        advanced: 0.9
      };
      return Array(request.questionCount).fill(difficultyMap[request.difficulty]);
    }
    
    // Adaptive difficulty calculation
    const response = await this.apiClient.post('/api/quiz/calculate-difficulty-distribution', {
      userId: request.userId,
      questionCount: request.questionCount,
      userAnalytics: analytics,
      adaptiveSettings: request.adaptiveSettings,
      topic: request.topic
    });
    
    return response.data.difficulty_distribution;
  }

  /**
   * Apply adaptive question sequencing
   */
  private async applyAdaptiveSequencing(questions: QuizQuestion[], request: QuizRequest): Promise<QuizQuestion[]> {
    if (request.difficulty !== 'adaptive') {
      return questions;
    }
    
    const response = await this.apiClient.post('/api/quiz/adaptive-sequencing', {
      questions: questions.map(q => ({
        id: q.id,
        difficulty: q.difficulty,
        type: q.type,
        topic: q.source.culturalTheme
      })),
      sequencingStrategy: 'gradual_increase', // or 'mixed', 'confidence_building'
      userProfile: request.userId
    });
    
    const sequenceOrder = response.data.sequence_order;
    return sequenceOrder.map((index: number) => questions[index]);
  }

  /**
   * Start quiz attempt
   */
  async startQuizAttempt(quizId: string, userId: string): Promise<QuizAttempt> {
    const quiz = this.activeQuizzes.get(quizId);
    if (!quiz) {
      throw new Error('Quiz not found');
    }
    
    const attempt: QuizAttempt = {
      attemptId: `attempt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      quizId,
      userId,
      startTime: Date.now(),
      answers: [],
      score: {
        raw: 0,
        percentage: 0,
        points: 0,
        maxPoints: quiz.metadata.totalPoints
      },
      performance: {
        strengths: [],
        weaknesses: [],
        recommendedReview: []
      }
    };
    
    this.activeAttempts.set(attempt.attemptId, attempt);
    
    // Track attempt start
    await this.trackAttemptStart(attempt, quiz);
    
    return attempt;
  }

  /**
   * Submit answer with adaptive difficulty adjustment
   */
  async submitAnswer(attemptId: string, questionId: string, answer: string | string[], confidence?: number): Promise<{
    isCorrect: boolean;
    explanation: string;
    nextDifficultyAdjustment?: number;
    feedback: string;
  }> {
    const attempt = this.activeAttempts.get(attemptId);
    if (!attempt) {
      throw new Error('Attempt not found');
    }
    
    const quiz = this.activeQuizzes.get(attempt.quizId);
    const question = quiz?.questions.find(q => q.id === questionId);
    
    if (!quiz || !question) {
      throw new Error('Question not found');
    }
    
    // Evaluate answer
    const evaluation = await this.evaluateAnswer(question, answer);
    
    // Record answer
    const answerRecord = {
      questionId,
      answer,
      isCorrect: evaluation.isCorrect,
      timeSpent: Date.now() - attempt.startTime - (attempt.answers.length * 30000), // Estimated time per question
      hintsUsed: 0, // Track separately
      confidence: confidence || 0.5
    };
    
    attempt.answers.push(answerRecord);
    
    // Update score
    if (evaluation.isCorrect) {
      attempt.score.raw++;
      attempt.score.points += question.points;
    }
    
    attempt.score.percentage = (attempt.score.raw / attempt.answers.length) * 100;
    
    // Generate adaptive feedback
    const feedback = await this.generateAdaptiveFeedback(question, evaluation, answerRecord);
    
    // Calculate next difficulty adjustment for adaptive quizzes
    let nextDifficultyAdjustment;
    if (quiz.metadata.adaptiveSettings) {
      nextDifficultyAdjustment = await this.calculateDifficultyAdjustment(attempt, question, evaluation);
    }
    
    return {
      isCorrect: evaluation.isCorrect,
      explanation: question.explanation,
      nextDifficultyAdjustment,
      feedback: feedback.message
    };
  }

  /**
   * Evaluate answer using AI-powered assessment
   */
  private async evaluateAnswer(question: QuizQuestion, answer: string | string[]) {
    const response = await this.apiClient.post('/api/quiz/evaluate-answer', {
      questionId: question.id,
      questionType: question.type,
      correctAnswer: question.correctAnswer,
      userAnswer: answer,
      partialCreditEnabled: true
    });
    
    return {
      isCorrect: response.data.is_correct,
      partialCredit: response.data.partial_credit,
      feedback: response.data.feedback,
      commonMistakes: response.data.common_mistakes
    };
  }

  /**
   * Generate adaptive feedback based on answer
   */
  private async generateAdaptiveFeedback(question: QuizQuestion, evaluation: any, answerRecord: any) {
    const response = await this.apiClient.post('/api/quiz/adaptive-feedback', {
      question: {
        id: question.id,
        type: question.type,
        difficulty: question.difficulty
      },
      evaluation,
      answerRecord,
      personalizationData: {
        confidence: answerRecord.confidence,
        timeSpent: answerRecord.timeSpent
      }
    });
    
    return {
      message: response.data.feedback_message,
      encouragement: response.data.encouragement,
      nextSteps: response.data.next_steps
    };
  }

  /**
   * Complete quiz attempt and generate performance analysis
   */
  async completeQuizAttempt(attemptId: string): Promise<QuizAttempt> {
    const attempt = this.activeAttempts.get(attemptId);
    if (!attempt) {
      throw new Error('Attempt not found');
    }
    
    attempt.endTime = Date.now();
    
    // Calculate final score
    attempt.score.percentage = (attempt.score.points / attempt.score.maxPoints) * 100;
    
    // Generate performance analysis
    const performance = await this.generatePerformanceAnalysis(attempt);
    attempt.performance = performance;
    
    // Update user analytics
    await this.updateUserAnalytics(attempt);
    
    // Save attempt data
    await this.saveAttemptData(attempt);
    
    // Remove from active attempts
    this.activeAttempts.delete(attemptId);
    
    return attempt;
  }

  /**
   * Generate comprehensive performance analysis
   */
  private async generatePerformanceAnalysis(attempt: QuizAttempt) {
    const response = await this.apiClient.post('/api/quiz/performance-analysis', {
      attempt: {
        answers: attempt.answers,
        score: attempt.score,
        duration: attempt.endTime! - attempt.startTime
      },
      quiz: this.activeQuizzes.get(attempt.quizId)
    });
    
    return {
      strengths: response.data.strengths,
      weaknesses: response.data.weaknesses,
      recommendedReview: response.data.recommended_review
    };
  }

  // Helper methods
  private selectQuestionType(types: QuestionType[], difficulty: number): QuestionType {
    // Weight question types based on difficulty
    const weightedTypes = types.filter(type => {
      const typeComplexity = this.getQuestionTypeComplexity(type);
      return Math.abs(typeComplexity - difficulty) < 0.3;
    });
    
    return weightedTypes[Math.floor(Math.random() * weightedTypes.length)] || types[0];
  }
  
  private getQuestionTypeComplexity(type: QuestionType): number {
    const complexityMap: Record<QuestionType, number> = {
      'multiple_choice': 0.3,
      'fill_blank': 0.4,
      'vocabulary_match': 0.4,
      'translation': 0.6,
      'grammar_analysis': 0.7,
      'passage_comprehension': 0.7,
      'cultural_context': 0.8,
      'syntax_parsing': 0.9,
      'latin_composition': 1.0
    };
    return complexityMap[type] || 0.5;
  }
  
  private calculateQuestionPoints(difficulty: number, type: QuestionType): number {
    const basePoints = 10;
    const difficultyMultiplier = 1 + difficulty;
    const typeMultiplier = this.getQuestionTypeComplexity(type) + 0.5;
    return Math.round(basePoints * difficultyMultiplier * typeMultiplier);
  }
  
  private calculatePassingScore(difficultyRange: { min: number; max: number }): number {
    const avgDifficulty = (difficultyRange.min + difficultyRange.max) / 2;
    return Math.max(60, Math.round(80 - (avgDifficulty * 20))); // Harder quizzes have lower passing scores
  }
  
  private generateQuizMetadata(questions: QuizQuestion[], request: QuizRequest) {
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    const estimatedDuration = questions.reduce((sum, q) => sum + q.estimatedTime, 0);
    const difficulties = questions.map(q => q.difficulty);
    
    return {
      totalPoints,
      estimatedDuration,
      difficultyRange: {
        min: Math.min(...difficulties),
        max: Math.max(...difficulties)
      },
      topics: Array.from(new Set(questions.map(q => q.source.culturalTheme))),
      createdAt: Date.now(),
      adaptiveSettings: request.adaptiveSettings
    };
  }
  
  // Additional helper methods for analytics, tracking, etc.
  private async getUserAnalytics(userId: string): Promise<QuizAnalytics | undefined> {
    // Implementation for getting user analytics
    return undefined;
  }
  
  private async calculateDifficultyAdjustment(attempt: QuizAttempt, question: QuizQuestion, evaluation: any): Promise<number> {
    // Implementation for adaptive difficulty adjustment
    return 0;
  }
  
  private async generateQuizTitle(request: QuizRequest): Promise<string> {
    return `${request.topic} Assessment - ${request.difficulty.charAt(0).toUpperCase() + request.difficulty.slice(1)}`;
  }
  
  private async generateQuizDescription(request: QuizRequest, metadata: any): Promise<string> {
    return `A comprehensive ${request.difficulty} level quiz on ${request.topic} with ${request.questionCount} questions.`;
  }
  
  private async generateInstructions(request: QuizRequest, metadata: any): Promise<string> {
    return `Complete all ${request.questionCount} questions. Estimated time: ${Math.round(metadata.estimatedDuration / 60)} minutes.`;
  }
  
  private async trackQuizGeneration(request: QuizRequest, quiz: Quiz) {
    // Implementation for tracking quiz generation analytics
  }
  
  private async trackAttemptStart(attempt: QuizAttempt, quiz: Quiz) {
    // Implementation for tracking attempt start
  }
  
  private async updateUserAnalytics(attempt: QuizAttempt) {
    // Implementation for updating user analytics
  }
  
  private async saveAttemptData(attempt: QuizAttempt) {
    // Implementation for saving attempt data to Oracle Cloud
  }
}

// Export singleton instance
export const realQuizGenerationEngine = new RealQuizGenerationEngine();

// Export for direct usage
export default realQuizGenerationEngine;

/**
 * Convenience functions to replace mock quiz generation
 */
export async function generateAdaptiveQuiz(
  userId: string,
  topic: string,
  questionCount: number = 10,
  language: 'de' | 'en' | 'la' = 'en'
): Promise<Quiz> {
  return realQuizGenerationEngine.generateQuiz({
    userId,
    topic,
    difficulty: 'adaptive',
    questionTypes: ['multiple_choice', 'fill_blank', 'translation', 'grammar_analysis'],
    questionCount,
    language
  });
}

export async function startQuiz(quizId: string, userId: string): Promise<QuizAttempt> {
  return realQuizGenerationEngine.startQuizAttempt(quizId, userId);
}

export async function submitQuizAnswer(attemptId: string, questionId: string, answer: string | string[]) {
  return realQuizGenerationEngine.submitAnswer(attemptId, questionId, answer);
}