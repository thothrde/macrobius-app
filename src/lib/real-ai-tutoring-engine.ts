/**
 * Real AI Tutoring Engine
 * Replaces MockAITutoringSystem with genuine conversational AI
 * Provides authentic personalized Latin education with memory and adaptation
 */

import { apiClient } from './enhanced-api-client-with-fallback';

export interface TutoringSession {
  sessionId: string;
  userId: string;
  startTime: number;
  lastActivity: number;
  currentTopic: string;
  learningObjectives: string[];
  conversationHistory: ConversationTurn[];
  studentProfile: StudentProfile;
  sessionMetrics: SessionMetrics;
}

export interface ConversationTurn {
  id: string;
  timestamp: number;
  speaker: 'student' | 'tutor';
  message: string;
  intent?: string;
  entities?: Array<{ type: string; value: string; confidence: number }>;
  context?: {
    topic: string;
    difficulty: number;
    emotionalState: string;
    followUpNeeded: boolean;
  };
}

export interface StudentProfile {
  learningLevel: 'beginner' | 'intermediate' | 'advanced';
  strengths: string[];
  weaknesses: string[];
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  preferredPace: 'slow' | 'normal' | 'fast';
  interests: string[];
  completedLessons: string[];
  knowledgeGaps: Array<{
    concept: string;
    severity: number;
    lastAssessed: number;
  }>;
  performanceHistory: Array<{
    date: number;
    topic: string;
    score: number;
    timeSpent: number;
  }>;
}

export interface SessionMetrics {
  totalMessages: number;
  studentsQuestions: number;
  conceptsIntroduced: number;
  exercisesCompleted: number;
  mistakesCorrections: number;
  encouragementGiven: number;
  progressMade: number; // 0-1 scale
}

export interface TutoringResponse {
  message: string;
  intent: 'teach' | 'question' | 'correction' | 'encouragement' | 'assessment';
  confidence: number;
  adaptations: {
    difficultyAdjustment?: 'increase' | 'decrease' | 'maintain';
    paceAdjustment?: 'slower' | 'faster' | 'maintain';
    styleAdjustment?: string;
  };
  suggestedExercises?: Array<{
    type: string;
    content: string;
    difficulty: number;
  }>;
  resources?: Array<{
    type: 'passage' | 'grammar' | 'vocabulary' | 'cultural';
    title: string;
    content: string;
    relevance: number;
  }>;
  nextSteps: string[];
  sessionContinuation?: {
    shouldContinue: boolean;
    suggestedDuration: number;
    breakRecommended?: boolean;
  };
}

export interface LearningPath {
  pathId: string;
  title: string;
  description: string;
  prerequisites: string[];
  milestones: Array<{
    id: string;
    title: string;
    concepts: string[];
    estimatedTime: number;
    completed: boolean;
  }>;
  adaptiveAdjustments: Array<{
    timestamp: number;
    reason: string;
    change: string;
  }>;
}

class RealAITutoringEngine {
  private baseUrl: string;
  private activeSessions: Map<string, TutoringSession> = new Map();
  private studentProfiles: Map<string, StudentProfile> = new Map();
  private apiClient = apiClient;
  private conversationMemory: Map<string, any[]> = new Map();

  constructor() {
    this.baseUrl = 'http://152.70.184.232:8080';
  }

  /**
   * Start a new tutoring session with personalized setup
   */
  async startSession(userId: string, topic?: string): Promise<TutoringSession> {
    try {
      // Load or create student profile
      const studentProfile = await this.getOrCreateStudentProfile(userId);
      
      // Generate session ID and initialize
      const sessionId = `session_${userId}_${Date.now()}`;
      
      // Determine starting topic based on profile and preferences
      const startingTopic = topic || await this.determineOptimalTopic(studentProfile);
      
      // Create session
      const session: TutoringSession = {
        sessionId,
        userId,
        startTime: Date.now(),
        lastActivity: Date.now(),
        currentTopic: startingTopic,
        learningObjectives: await this.generateLearningObjectives(startingTopic, studentProfile),
        conversationHistory: [],
        studentProfile,
        sessionMetrics: {
          totalMessages: 0,
          studentsQuestions: 0,
          conceptsIntroduced: 0,
          exercisesCompleted: 0,
          mistakesCorrections: 0,
          encouragementGiven: 0,
          progressMade: 0
        }
      };
      
      // Store session
      this.activeSessions.set(sessionId, session);
      
      // Generate welcome message
      const welcomeResponse = await this.generateWelcomeMessage(session);
      
      // Add welcome to conversation history
      this.addConversationTurn(sessionId, 'tutor', welcomeResponse.message, 'teach');
      
      return session;
      
    } catch (error) {
      console.error('Error starting tutoring session:', error);
      throw new Error('Failed to start tutoring session');
    }
  }

  /**
   * Process student message and generate intelligent tutor response
   */
  async processMessage(sessionId: string, message: string): Promise<TutoringResponse> {
    try {
      const session = this.activeSessions.get(sessionId);
      if (!session) {
        throw new Error('Session not found');
      }
      
      // Update last activity
      session.lastActivity = Date.now();
      
      // Add student message to conversation
      this.addConversationTurn(sessionId, 'student', message);
      
      // Analyze student message for intent and entities
      const messageAnalysis = await this.analyzeStudentMessage(message, session);
      
      // Update student profile based on message
      await this.updateStudentProfile(session, messageAnalysis);
      
      // Generate contextualized response
      const response = await this.generateTutorResponse(session, messageAnalysis);
      
      // Add tutor response to conversation
      this.addConversationTurn(sessionId, 'tutor', response.message, response.intent);
      
      // Update session metrics
      this.updateSessionMetrics(session, messageAnalysis, response);
      
      // Apply adaptive adjustments if needed
      await this.applyAdaptiveAdjustments(session, response);
      
      return response;
      
    } catch (error) {
      console.error('Error processing tutoring message:', error);
      return this.generateFallbackResponse(sessionId, error as Error);
    }
  }

  /**
   * Analyze student message for learning insights
   */
  private async analyzeStudentMessage(message: string, session: TutoringSession) {
    const response = await this.apiClient.request('/api/tutoring/analyze-message', {
      method: 'POST',
      body: {
        message,
        conversationHistory: session.conversationHistory.slice(-10),
        studentProfile: session.studentProfile,
        currentTopic: session.currentTopic,
        language: 'la' // Assuming Latin context
      }
    });

    return {
      intent: response.data.intent, // question, answer, confusion, progress, etc.
      entities: response.data.entities,
      sentiment: response.data.sentiment,
      difficultyLevel: response.data.difficulty_assessment,
      knowledgeGaps: response.data.knowledge_gaps,
      misconceptions: response.data.misconceptions,
      learningIndicators: response.data.learning_indicators
    };
  }

  /**
   * Generate intelligent, contextual tutor response
   */
  private async generateTutorResponse(session: TutoringSession, analysis: any): Promise<TutoringResponse> {
    const response = await this.apiClient.request('/api/tutoring/generate-response', {
      method: 'POST',
      body: {
        messageAnalysis: analysis,
        session: {
          id: session.sessionId,
          topic: session.currentTopic,
          objectives: session.learningObjectives,
          history: session.conversationHistory.slice(-15), // Last 15 turns for context
          metrics: session.sessionMetrics
        },
        studentProfile: session.studentProfile,
        adaptiveContext: {
          needsDifficultyAdjustment: analysis.difficultyLevel !== session.studentProfile.learningLevel,
          needsEncouragement: analysis.sentiment < 0.3,
          needsCorrection: analysis.misconceptions.length > 0,
          needsNewConcepts: session.sessionMetrics.progressMade > 0.7
        }
      }
    });

    return {
      message: response.data.message,
      intent: response.data.intent,
      confidence: response.data.confidence,
      adaptations: response.data.adaptations,
      suggestedExercises: response.data.exercises,
      resources: await this.getRelevantResources(session.currentTopic, analysis),
      nextSteps: response.data.next_steps,
      sessionContinuation: response.data.session_continuation
    };
  }

  /**
   * Get relevant educational resources from Oracle Cloud
   */
  private async getRelevantResources(topic: string, analysis: any) {
    const response = await this.apiClient.request('/api/tutoring/resources', {
      method: 'POST',
      body: {
        topic,
        knowledgeGaps: analysis.knowledgeGaps,
        difficultyLevel: analysis.difficultyLevel,
        maxResources: 3
      }
    });

    return response.data.resources.map((resource: any) => ({
      type: resource.type,
      title: resource.title,
      content: resource.content,
      relevance: resource.relevance_score
    }));
  }

  /**
   * Update student profile based on conversation analysis
   */
  private async updateStudentProfile(session: TutoringSession, analysis: any) {
    const profile = session.studentProfile;
    
    // Update knowledge gaps
    analysis.knowledgeGaps.forEach((gap: any) => {
      const existingGap = profile.knowledgeGaps.find(g => g.concept === gap.concept);
      if (existingGap) {
        existingGap.severity = gap.severity;
        existingGap.lastAssessed = Date.now();
      } else {
        profile.knowledgeGaps.push({
          concept: gap.concept,
          severity: gap.severity,
          lastAssessed: Date.now()
        });
      }
    });
    
    // Update learning level if needed
    if (analysis.difficultyLevel && analysis.difficultyLevel !== profile.learningLevel) {
      const levelAdjustment = await this.assessLevelAdjustment(profile, analysis);
      if (levelAdjustment.shouldAdjust) {
        profile.learningLevel = levelAdjustment.newLevel;
      }
    }
    
    // Track performance
    profile.performanceHistory.push({
      date: Date.now(),
      topic: session.currentTopic,
      score: analysis.learningIndicators.comprehensionScore || 0.5,
      timeSpent: Date.now() - session.lastActivity
    });
    
    // Keep only last 50 performance records
    if (profile.performanceHistory.length > 50) {
      profile.performanceHistory = profile.performanceHistory.slice(-50);
    }
  }

  /**
   * Assess if learning level adjustment is needed
   */
  private async assessLevelAdjustment(profile: StudentProfile, analysis: any) {
    const recentPerformance = profile.performanceHistory.slice(-10);
    const avgScore = recentPerformance.reduce((sum, p) => sum + p.score, 0) / recentPerformance.length;
    
    const response = await this.apiClient.request('/api/tutoring/assess-level', {
      method: 'POST',
      body: {
        currentLevel: profile.learningLevel,
        recentPerformance: avgScore,
        difficultyFeedback: analysis.difficultyLevel,
        sessionMetrics: analysis.learningIndicators
      }
    });
    
    return {
      shouldAdjust: response.data.should_adjust,
      newLevel: response.data.recommended_level,
      confidence: response.data.confidence
    };
  }

  /**
   * Apply adaptive adjustments to tutoring approach
   */
  private async applyAdaptiveAdjustments(session: TutoringSession, response: TutoringResponse) {
    if (response.adaptations.difficultyAdjustment) {
      // Adjust current topic difficulty
      await this.adjustTopicDifficulty(session, response.adaptations.difficultyAdjustment);
    }
    
    if (response.adaptations.paceAdjustment) {
      // Adjust learning pace
      session.studentProfile.preferredPace = this.calculateNewPace(
        session.studentProfile.preferredPace,
        response.adaptations.paceAdjustment
      );
    }
    
    if (response.adaptations.styleAdjustment) {
      // Adjust teaching style based on student response patterns
      await this.adjustTeachingStyle(session, response.adaptations.styleAdjustment);
    }
  }

  /**
   * Calculate new learning pace based on student performance
   */
  private calculateNewPace(currentPace: string, adjustment: string): 'slow' | 'normal' | 'fast' {
    const paceMap = { slow: 0, normal: 1, fast: 2 };
    const currentLevel = paceMap[currentPace as keyof typeof paceMap];
    
    if (adjustment === 'slower' && currentLevel > 0) {
      return Object.keys(paceMap)[currentLevel - 1] as 'slow' | 'normal' | 'fast';
    }
    if (adjustment === 'faster' && currentLevel < 2) {
      return Object.keys(paceMap)[currentLevel + 1] as 'slow' | 'normal' | 'fast';
    }
    
    return currentPace as 'slow' | 'normal' | 'fast';
  }

  /**
   * Add conversation turn to session history
   */
  private addConversationTurn(
    sessionId: string, 
    speaker: 'student' | 'tutor', 
    message: string, 
    intent?: string
  ) {
    const session = this.activeSessions.get(sessionId);
    if (session) {
      const turn: ConversationTurn = {
        id: `turn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        speaker,
        message,
        intent
      };
      
      session.conversationHistory.push(turn);
      session.sessionMetrics.totalMessages++;
      
      if (speaker === 'student') {
        session.sessionMetrics.studentsQuestions++;
      }
    }
  }

  /**
   * Update session metrics based on interaction
   */
  private updateSessionMetrics(session: TutoringSession, analysis: any, response: TutoringResponse) {
    const metrics = session.sessionMetrics;
    
    if (response.intent === 'teach') {
      metrics.conceptsIntroduced++;
    }
    
    if (response.intent === 'correction') {
      metrics.mistakesCorrections++;
    }
    
    if (response.intent === 'encouragement') {
      metrics.encouragementGiven++;
    }
    
    if (analysis.learningIndicators?.exerciseCompleted) {
      metrics.exercisesCompleted++;
    }
    
    // Calculate progress based on learning indicators
    const progressIndicators = [
      analysis.learningIndicators?.comprehensionScore || 0,
      metrics.exercisesCompleted / (metrics.exercisesCompleted + 1),
      Math.max(0, 1 - (metrics.mistakesCorrections / metrics.totalMessages))
    ];
    
    metrics.progressMade = progressIndicators.reduce((sum, indicator) => sum + indicator, 0) / progressIndicators.length;
  }

  /**
   * Get or create student profile
   */
  private async getOrCreateStudentProfile(userId: string): Promise<StudentProfile> {
    if (this.studentProfiles.has(userId)) {
      return this.studentProfiles.get(userId)!;
    }
    
    try {
      // Try to load existing profile from Oracle Cloud
      const response = await this.apiClient.request(`/api/students/${userId}/profile`);
      const profile = response.data;
      this.studentProfiles.set(userId, profile);
      return profile;
    } catch (error) {
      // Create new profile
      const newProfile: StudentProfile = {
        learningLevel: 'intermediate',
        strengths: [],
        weaknesses: [],
        learningStyle: 'reading',
        preferredPace: 'normal',
        interests: [],
        completedLessons: [],
        knowledgeGaps: [],
        performanceHistory: []
      };
      
      this.studentProfiles.set(userId, newProfile);
      return newProfile;
    }
  }

  /**
   * Determine optimal starting topic for student
   */
  private async determineOptimalTopic(profile: StudentProfile): Promise<string> {
    const response = await this.apiClient.request('/api/tutoring/optimal-topic', {
      method: 'POST',
      body: {
        learningLevel: profile.learningLevel,
        completedLessons: profile.completedLessons,
        knowledgeGaps: profile.knowledgeGaps,
        interests: profile.interests
      }
    });
    
    return response.data.recommended_topic || 'Basic Latin Grammar';
  }

  /**
   * Generate learning objectives for session
   */
  private async generateLearningObjectives(topic: string, profile: StudentProfile): Promise<string[]> {
    const response = await this.apiClient.request('/api/tutoring/learning-objectives', {
      method: 'POST',
      body: {
        topic,
        learningLevel: profile.learningLevel,
        knowledgeGaps: profile.knowledgeGaps.slice(0, 5), // Top 5 gaps
        sessionType: 'conversational'
      }
    });
    
    return response.data.objectives;
  }

  /**
   * Generate personalized welcome message
   */
  private async generateWelcomeMessage(session: TutoringSession): Promise<TutoringResponse> {
    const response = await this.apiClient.request('/api/tutoring/welcome-message', {
      method: 'POST',
      body: {
        studentProfile: session.studentProfile,
        topic: session.currentTopic,
        objectives: session.learningObjectives,
        language: 'multilingual' // Support DE/EN/LA
      }
    });
    
    return {
      message: response.data.message,
      intent: 'teach',
      confidence: 0.9,
      adaptations: {},
      nextSteps: response.data.next_steps,
      sessionContinuation: {
        shouldContinue: true,
        suggestedDuration: 30 * 60 * 1000 // 30 minutes
      }
    };
  }

  /**
   * End tutoring session with summary
   */
  async endSession(sessionId: string): Promise<{
    summary: string;
    progress: number;
    recommendations: string[];
    nextSessionTopic?: string;
  }> {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }
    
    const response = await this.apiClient.request('/api/tutoring/session-summary', {
      method: 'POST',
      body: {
        session: {
          duration: Date.now() - session.startTime,
          metrics: session.sessionMetrics,
          conversationTurns: session.conversationHistory.length
        },
        profile: session.studentProfile,
        topic: session.currentTopic
      }
    });
    
    // Save session data
    await this.saveSessionData(session);
    
    // Remove from active sessions
    this.activeSessions.delete(sessionId);
    
    return {
      summary: response.data.summary,
      progress: session.sessionMetrics.progressMade,
      recommendations: response.data.recommendations,
      nextSessionTopic: response.data.next_topic
    };
  }

  /**
   * Save session data to Oracle Cloud
   */
  private async saveSessionData(session: TutoringSession) {
    try {
      await this.apiClient.request('/api/tutoring/save-session', {
        method: 'POST',
        body: {
          sessionId: session.sessionId,
          userId: session.userId,
          duration: Date.now() - session.startTime,
          topic: session.currentTopic,
          metrics: session.sessionMetrics,
          conversationHistory: session.conversationHistory,
          finalProfile: session.studentProfile
        }
      });
    } catch (error) {
      console.error('Failed to save session data:', error);
    }
  }

  /**
   * Generate fallback response when system fails
   */
  private generateFallbackResponse(sessionId: string, error: Error): TutoringResponse {
    return {
      message: 'I apologize, but I\'m experiencing some technical difficulties. Let\'s continue our lesson in a moment.',
      intent: 'encouragement',
      confidence: 0.3,
      adaptations: {},
      nextSteps: ['Please try asking your question again', 'Check your internet connection'],
      sessionContinuation: {
        shouldContinue: true,
        suggestedDuration: 5 * 60 * 1000 // 5 minutes
      }
    };
  }

  /**
   * Get session statistics
   */
  getSessionStats(sessionId: string) {
    const session = this.activeSessions.get(sessionId);
    if (!session) return null;
    
    return {
      duration: Date.now() - session.startTime,
      messageCount: session.conversationHistory.length,
      progress: session.sessionMetrics.progressMade,
      topic: session.currentTopic,
      studentLevel: session.studentProfile.learningLevel
    };
  }

  /**
   * Get all active sessions for monitoring
   */
  getActiveSessions(): string[] {
    return Array.from(this.activeSessions.keys());
  }

  // Additional methods for topic adjustment, teaching style adaptation, etc.
  private async adjustTopicDifficulty(session: TutoringSession, adjustment: string) {
    // Implementation for adjusting topic difficulty
  }
  
  private async adjustTeachingStyle(session: TutoringSession, style: string) {
    // Implementation for adjusting teaching style
  }
}

// Export singleton instance
export const realAITutoringEngine = new RealAITutoringEngine();

// Export for direct usage
export default realAITutoringEngine;

/**
 * Convenience functions to replace MockAITutoringSystem
 */
export async function startTutoringSession(userId: string, topic?: string): Promise<TutoringSession> {
  return realAITutoringEngine.startSession(userId, topic);
}

export async function sendMessageToTutor(sessionId: string, message: string): Promise<TutoringResponse> {
  return realAITutoringEngine.processMessage(sessionId, message);
}

export async function endTutoringSession(sessionId: string) {
  return realAITutoringEngine.endSession(sessionId);
}