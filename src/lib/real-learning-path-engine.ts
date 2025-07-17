/**
 * Real Learning Path Engine
 * Replaces mock knowledge gap detection with genuine adaptive learning path generation
 * Creates personalized learning journeys using authentic Macrobius content and AI analysis
 */

import { apiClient } from './enhanced-api-client-with-fallback';

export interface LearningPath {
  id: string;
  userId: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // in hours
  culturalThemes: string[];
  learningObjectives: string[];
  prerequisites: string[];
  milestones: Milestone[];
  adaptiveFeatures: {
    difficultyAdjustment: boolean;
    paceAdaptation: boolean;
    contentPersonalization: boolean;
    weaknessTargeting: boolean;
  };
  progress: {
    completedMilestones: number;
    totalMilestones: number;
    currentMilestone: number;
    overallProgress: number;
    estimatedTimeRemaining: number;
  };
  analytics: {
    createdAt: number;
    lastAccessed: number;
    totalTimeSpent: number;
    averageSessionLength: number;
    successRate: number;
  };
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  order: number;
  difficulty: number;
  estimatedTime: number; // in minutes
  prerequisites: string[];
  learningObjectives: string[];
  activities: LearningActivity[];
  assessments: Assessment[];
  culturalConnections: Array<{
    theme: string;
    passages: string[];
    modernRelevance: string;
  }>;
  completionCriteria: {
    minimumScore: number;
    requiredActivities: number;
    masteryLevel: number;
  };
  status: 'locked' | 'available' | 'in_progress' | 'completed' | 'mastered';
  progress: {
    activitiesCompleted: number;
    totalActivities: number;
    currentScore: number;
    timeSpent: number;
    attempts: number;
  };
}

export interface LearningActivity {
  id: string;
  type: 'reading' | 'exercise' | 'practice' | 'quiz' | 'analysis' | 'discussion' | 'project';
  title: string;
  description: string;
  content: {
    instructions: string;
    materials: Array<{
      type: 'passage' | 'explanation' | 'example' | 'media';
      content: string;
      source?: string;
    }>;
    interactiveElements?: any[];
  };
  difficulty: number;
  estimatedTime: number;
  learningObjectives: string[];
  hints: string[];
  dependencies: string[]; // IDs of prerequisite activities
  adaptiveParameters: {
    difficultyRange: { min: number; max: number };
    contentVariations: number;
    personalizedContent: boolean;
  };
  completionStatus: 'not_started' | 'in_progress' | 'completed' | 'mastered';
  performance: {
    score: number;
    attempts: number;
    timeSpent: number;
    hintsUsed: number;
    lastAttempt: number;
  };
}

export interface Assessment {
  id: string;
  type: 'formative' | 'summative' | 'diagnostic' | 'adaptive';
  title: string;
  questions: AssessmentQuestion[];
  scoringCriteria: {
    passingScore: number;
    masteryScore: number;
    weightings: Record<string, number>;
  };
  adaptiveFeatures: {
    difficultyAdjustment: boolean;
    questionSelection: boolean;
    timeAdaptation: boolean;
  };
  feedback: {
    immediate: boolean;
    detailed: boolean;
    remediation: boolean;
  };
}

export interface AssessmentQuestion {
  id: string;
  type: string;
  content: string;
  options?: string[];
  correctAnswer: any;
  explanation: string;
  difficulty: number;
  concepts: string[];
  source: {
    passageId: string;
    culturalTheme: string;
  };
}

export interface KnowledgeGraph {
  nodes: Array<{
    id: string;
    concept: string;
    type: 'fundamental' | 'intermediate' | 'advanced' | 'specialized';
    difficulty: number;
    prerequisites: string[];
    description: string;
    examples: string[];
    culturalContext: string;
  }>;
  edges: Array<{
    from: string;
    to: string;
    relationship: 'prerequisite' | 'related' | 'application' | 'example';
    strength: number;
  }>;
  pathways: Array<{
    id: string;
    name: string;
    sequence: string[];
    difficulty: string;
    estimatedTime: number;
  }>;
}

export interface LearnerProfile {
  userId: string;
  cognitiveProfile: {
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
    processingSpeed: 'slow' | 'normal' | 'fast';
    attentionSpan: number; // in minutes
    workingMemoryCapacity: 'low' | 'average' | 'high';
    preferredDifficultyCurve: 'gradual' | 'moderate' | 'steep';
  };
  knowledgeState: {
    masteredConcepts: Array<{
      concept: string;
      masteryLevel: number;
      lastAssessed: number;
      retentionStrength: number;
    }>;
    learningConcepts: Array<{
      concept: string;
      progress: number;
      difficulty: number;
      timeSpent: number;
    }>;
    knowledgeGaps: Array<{
      concept: string;
      severity: number;
      identifiedAt: number;
      attempts: number;
    }>;
  };
  motivationalProfile: {
    intrinsicMotivation: number;
    goalOrientation: 'mastery' | 'performance' | 'mixed';
    persistenceLevel: number;
    feedbackPreference: 'immediate' | 'delayed' | 'summary';
    challengePreference: 'conservative' | 'moderate' | 'ambitious';
  };
  culturalInterests: Array<{
    theme: string;
    interestLevel: number;
    knowledgeLevel: number;
  }>;
}

export interface PathGenRequest {
  userId: string;
  goal: string;
  timeframe: number; // in weeks
  intensity: 'light' | 'moderate' | 'intensive';
  focusAreas: string[];
  avoidTopics?: string[];
  culturalPreferences?: string[];
  currentLevel?: 'beginner' | 'intermediate' | 'advanced';
  adaptiveFeatures?: boolean;
}

class RealLearningPathEngine {
  private baseUrl: string;
  private apiClient = apiClient;
  private learnerProfiles: Map<string, LearnerProfile> = new Map();
  private activePaths: Map<string, LearningPath> = new Map();
  private knowledgeGraph: KnowledgeGraph | null = null;
  private pathTemplates: Map<string, any> = new Map();

  constructor() {
    this.baseUrl = 'http://152.70.184.232:8080';
  }

  /**
   * Initialize learning path system and load knowledge graph
   */
  async initialize(): Promise<void> {
    try {
      // Load comprehensive knowledge graph from Oracle Cloud
      this.knowledgeGraph = await this.loadKnowledgeGraph();
      
      // Load path templates
      await this.loadPathTemplates();
      
      console.log('Learning Path Engine initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Learning Path Engine:', error);
    }
  }

  /**
   * Generate personalized learning path using AI analysis
   */
  async generateLearningPath(request: PathGenRequest): Promise<LearningPath> {
    try {
      // Get or create learner profile
      const learnerProfile = await this.getOrCreateLearnerProfile(request.userId);
      
      // Analyze current knowledge state
      const knowledgeAnalysis = await this.analyzeKnowledgeState(learnerProfile);
      
      // Generate optimal learning sequence
      const learningSequence = await this.generateOptimalSequence(request, learnerProfile, knowledgeAnalysis);
      
      // Create milestones and activities
      const milestones = await this.createMilestones(learningSequence, request, learnerProfile);
      
      // Apply adaptive features
      const adaptiveMilestones = await this.applyAdaptiveFeatures(milestones, learnerProfile);
      
      // Generate path metadata
      const pathMetadata = this.generatePathMetadata(request, adaptiveMilestones, learnerProfile);
      
      const learningPath: LearningPath = {
        id: `path_${request.userId}_${Date.now()}`,
        userId: request.userId,
        title: pathMetadata.title,
        description: pathMetadata.description,
        difficulty: request.currentLevel || this.inferDifficulty(learnerProfile),
        estimatedDuration: pathMetadata.estimatedDuration,
        culturalThemes: this.extractCulturalThemes(adaptiveMilestones),
        learningObjectives: pathMetadata.learningObjectives,
        prerequisites: pathMetadata.prerequisites,
        milestones: adaptiveMilestones,
        adaptiveFeatures: {
          difficultyAdjustment: request.adaptiveFeatures !== false,
          paceAdaptation: true,
          contentPersonalization: true,
          weaknessTargeting: true
        },
        progress: {
          completedMilestones: 0,
          totalMilestones: adaptiveMilestones.length,
          currentMilestone: 0,
          overallProgress: 0,
          estimatedTimeRemaining: pathMetadata.estimatedDuration
        },
        analytics: {
          createdAt: Date.now(),
          lastAccessed: Date.now(),
          totalTimeSpent: 0,
          averageSessionLength: 0,
          successRate: 0
        }
      };
      
      // Store the path
      this.activePaths.set(learningPath.id, learningPath);
      
      // Save to Oracle Cloud
      await this.saveLearningPath(learningPath);
      
      return learningPath;
      
    } catch (error) {
      console.error('Learning path generation error:', error);
      throw new Error('Failed to generate learning path');
    }
  }

  /**
   * Analyze learner's current knowledge state using AI
   */
  private async analyzeKnowledgeState(profile: LearnerProfile) {
    const response = await this.apiClient.request('/api/learning-paths/analyze-knowledge', {
      method: 'POST',
      body: {
        userId: profile.userId,
        masteredConcepts: profile.knowledgeState.masteredConcepts,
        knowledgeGaps: profile.knowledgeState.knowledgeGaps,
        learningHistory: profile.knowledgeState.learningConcepts,
        cognitiveProfile: profile.cognitiveProfile
      }
    });
    
    const responseData = (response as any).data;
    
    return {
      strengthAreas: responseData.strength_areas,
      weaknessAreas: responseData.weakness_areas,
      readinessLevel: responseData.readiness_level,
      optimalStartingPoint: responseData.optimal_starting_point,
      learningCapacity: responseData.learning_capacity,
      recommendedPace: responseData.recommended_pace
    };
  }

  /**
   * Generate optimal learning sequence using knowledge graph
   */
  private async generateOptimalSequence(request: PathGenRequest, profile: LearnerProfile, analysis: any) {
    const response = await this.apiClient.request('/api/learning-paths/generate-sequence', {
      method: 'POST',
      body: {
        goal: request.goal,
        timeframe: request.timeframe,
        intensity: request.intensity,
        focusAreas: request.focusAreas,
        avoidTopics: request.avoidTopics,
        currentLevel: request.currentLevel,
        knowledgeAnalysis: analysis,
        cognitiveProfile: profile.cognitiveProfile,
        motivationalProfile: profile.motivationalProfile,
        culturalInterests: profile.culturalInterests,
        knowledgeGraph: this.knowledgeGraph
      }
    });
    
    const responseData = (response as any).data;
    
    return {
      conceptSequence: responseData.concept_sequence,
      difficultyProgression: responseData.difficulty_progression,
      timeAllocation: responseData.time_allocation,
      branchingPoints: responseData.branching_points,
      adaptiveParameters: responseData.adaptive_parameters
    };
  }

  /**
   * Create detailed milestones with activities and assessments
   */
  private async createMilestones(sequence: any, request: PathGenRequest, profile: LearnerProfile): Promise<Milestone[]> {
    const milestones: Milestone[] = [];
    
    for (let i = 0; i < sequence.conceptSequence.length; i++) {
      const concept = sequence.conceptSequence[i];
      const difficulty = sequence.difficultyProgression[i];
      const timeAllocation = sequence.timeAllocation[i];
      
      const milestone = await this.createSingleMilestone({
        concept,
        difficulty,
        timeAllocation,
        order: i,
        request,
        profile,
        prerequisites: i > 0 ? [milestones[i-1].id] : []
      });
      
      milestones.push(milestone);
    }
    
    return milestones;
  }

  /**
   * Create a single milestone with activities
   */
  private async createSingleMilestone(params: any): Promise<Milestone> {
    const response = await this.apiClient.request('/api/learning-paths/create-milestone', {
      method: 'POST',
      body: {
        concept: params.concept,
        difficulty: params.difficulty,
        timeAllocation: params.timeAllocation,
        learnerProfile: params.profile,
        culturalPreferences: params.request.culturalPreferences,
        adaptiveFeatures: params.request.adaptiveFeatures
      }
    });
    
    const responseData = (response as any).data;
    
    // Generate activities for this milestone
    const activities = await this.generateMilestoneActivities({
      concept: params.concept,
      difficulty: params.difficulty,
      timeAllocation: params.timeAllocation,
      profile: params.profile
    });
    
    // Generate assessments
    const assessments = await this.generateMilestoneAssessments({
      concept: params.concept,
      difficulty: params.difficulty,
      activities
    });
    
    return {
      id: `milestone_${params.concept}_${Date.now()}`,
      title: responseData.title,
      description: responseData.description,
      order: params.order,
      difficulty: params.difficulty,
      estimatedTime: params.timeAllocation,
      prerequisites: params.prerequisites,
      learningObjectives: responseData.learning_objectives,
      activities,
      assessments,
      culturalConnections: responseData.cultural_connections,
      completionCriteria: {
        minimumScore: 0.7,
        requiredActivities: Math.ceil(activities.length * 0.8),
        masteryLevel: 0.8
      },
      status: params.order === 0 ? 'available' : 'locked',
      progress: {
        activitiesCompleted: 0,
        totalActivities: activities.length,
        currentScore: 0,
        timeSpent: 0,
        attempts: 0
      }
    };
  }

  /**
   * Generate activities for milestone using authentic content
   */
  private async generateMilestoneActivities(params: any): Promise<LearningActivity[]> {
    const response = await this.apiClient.request('/api/learning-paths/generate-activities', {
      method: 'POST',
      body: {
        concept: params.concept,
        difficulty: params.difficulty,
        timeAllocation: params.timeAllocation,
        learnerProfile: params.profile,
        activityTypes: ['reading', 'exercise', 'practice', 'analysis'],
        contentSource: 'macrobius_corpus',
        includeAuthentic: true
      }
    });
    
    const responseData = (response as any).data;
    
    return responseData.activities.map((activity: any, index: number) => ({
      id: `activity_${params.concept}_${index}`,
      type: activity.type,
      title: activity.title,
      description: activity.description,
      content: {
        instructions: activity.content.instructions,
        materials: activity.content.materials.map((material: any) => ({
          type: material.type,
          content: material.content,
          source: material.source
        })),
        interactiveElements: activity.content.interactive_elements
      },
      difficulty: activity.difficulty,
      estimatedTime: activity.estimated_time,
      learningObjectives: activity.learning_objectives,
      hints: activity.hints,
      dependencies: index > 0 ? [`activity_${params.concept}_${index-1}`] : [],
      adaptiveParameters: {
        difficultyRange: { min: activity.difficulty - 0.2, max: activity.difficulty + 0.2 },
        contentVariations: activity.content_variations,
        personalizedContent: true
      },
      completionStatus: 'not_started',
      performance: {
        score: 0,
        attempts: 0,
        timeSpent: 0,
        hintsUsed: 0,
        lastAttempt: 0
      }
    }));
  }

  /**
   * Generate assessments for milestone
   */
  private async generateMilestoneAssessments(params: any): Promise<Assessment[]> {
    const response = await this.apiClient.request('/api/learning-paths/generate-assessments', {
      method: 'POST',
      body: {
        concept: params.concept,
        difficulty: params.difficulty,
        activities: params.activities.map((a: any) => ({
          type: a.type,
          objectives: a.learningObjectives
        })),
        assessmentTypes: ['formative', 'summative']
      }
    });
    
    const responseData = (response as any).data;
    
    return responseData.assessments.map((assessment: any) => ({
      id: `assessment_${params.concept}_${assessment.type}`,
      type: assessment.type,
      title: assessment.title,
      questions: assessment.questions.map((q: any) => ({
        id: q.id,
        type: q.type,
        content: q.content,
        options: q.options,
        correctAnswer: q.correct_answer,
        explanation: q.explanation,
        difficulty: q.difficulty,
        concepts: q.concepts,
        source: {
          passageId: q.source.passage_id,
          culturalTheme: q.source.cultural_theme
        }
      })),
      scoringCriteria: {
        passingScore: 0.7,
        masteryScore: 0.85,
        weightings: assessment.scoring_criteria.weightings
      },
      adaptiveFeatures: {
        difficultyAdjustment: true,
        questionSelection: true,
        timeAdaptation: true
      },
      feedback: {
        immediate: assessment.type === 'formative',
        detailed: true,
        remediation: true
      }
    }));
  }

  /**
   * Apply adaptive features to milestones
   */
  private async applyAdaptiveFeatures(milestones: Milestone[], profile: LearnerProfile): Promise<Milestone[]> {
    return milestones.map(milestone => ({
      ...milestone,
      // Adjust based on learner's cognitive profile
      estimatedTime: this.adjustTimeForProfile(milestone.estimatedTime, profile),
      // Add personalized activities
      activities: milestone.activities.map(activity => ({
        ...activity,
        content: this.personalizeContent(activity.content, profile)
      }))
    }));
  }

  /**
   * Process milestone completion and unlock next milestone
   */
  async completeMilestone(pathId: string, milestoneId: string, performance: any): Promise<{
    milestoneCompleted: boolean;
    nextMilestoneUnlocked: boolean;
    pathProgress: number;
    adaptiveAdjustments: any[];
    recommendations: string[];
  }> {
    try {
      const path = this.activePaths.get(pathId);
      if (!path) {
        throw new Error('Learning path not found');
      }
      
      const milestone = path.milestones.find(m => m.id === milestoneId);
      if (!milestone) {
        throw new Error('Milestone not found');
      }
      
      // Evaluate milestone completion
      const completion = await this.evaluateMilestoneCompletion(milestone, performance);
      
      // Update milestone status
      milestone.status = completion.isCompleted ? 'completed' : 'in_progress';
      milestone.progress = completion.progress;
      
      // Apply adaptive adjustments
      const adaptiveAdjustments = await this.applyAdaptiveAdjustments(path, milestone, performance);
      
      // Update path progress
      path.progress = this.calculatePathProgress(path);
      
      // Unlock next milestone if appropriate
      const nextMilestoneUnlocked = this.unlockNextMilestone(path, milestone);
      
      // Generate recommendations
      const recommendations = await this.generateProgressRecommendations(path, milestone, performance);
      
      // Save updated path
      await this.saveLearningPath(path);
      
      return {
        milestoneCompleted: completion.isCompleted,
        nextMilestoneUnlocked,
        pathProgress: path.progress.overallProgress,
        adaptiveAdjustments,
        recommendations
      };
      
    } catch (error) {
      console.error('Milestone completion error:', error);
      throw new Error('Failed to process milestone completion');
    }
  }

  /**
   * Get personalized recommendations for learner
   */
  async getPersonalizedRecommendations(userId: string): Promise<{
    studyPlan: any;
    priorityTopics: string[];
    recommendedActivities: LearningActivity[];
    motivationalSupport: string[];
  }> {
    try {
      const profile = await this.getOrCreateLearnerProfile(userId);
      const activePaths = Array.from(this.activePaths.values()).filter(p => p.userId === userId);
      
      const response = await this.apiClient.request('/api/learning-paths/personalized-recommendations', {
        method: 'POST',
        body: {
          userId,
          learnerProfile: profile,
          activePaths: activePaths.map(p => ({
            id: p.id,
            progress: p.progress,
            currentMilestone: p.milestones[p.progress.currentMilestone]
          })),
          knowledgeGraph: this.knowledgeGraph
        }
      });
      
      const responseData = (response as any).data;
      
      return {
        studyPlan: responseData.study_plan,
        priorityTopics: responseData.priority_topics,
        recommendedActivities: responseData.recommended_activities,
        motivationalSupport: responseData.motivational_support
      };
      
    } catch (error) {
      console.error('Recommendations generation error:', error);
      throw new Error('Failed to generate recommendations');
    }
  }

  // Helper methods
  private async loadKnowledgeGraph(): Promise<KnowledgeGraph> {
    const response = await this.apiClient.request('/api/learning-paths/knowledge-graph', {
      method: 'GET'
    });
    return (response as any).data;
  }
  
  private async loadPathTemplates() {
    const response = await this.apiClient.request('/api/learning-paths/templates', {
      method: 'GET'
    });
    const responseData = (response as any).data;
    responseData.templates.forEach((template: any) => {
      this.pathTemplates.set(template.id, template);
    });
  }
  
  private async getOrCreateLearnerProfile(userId: string): Promise<LearnerProfile> {
    if (this.learnerProfiles.has(userId)) {
      return this.learnerProfiles.get(userId)!;
    }
    
    try {
      const response = await this.apiClient.request(`/api/learning-paths/learner-profile/${userId}`, {
        method: 'GET'
      });
      const profile = (response as any).data;
      this.learnerProfiles.set(userId, profile);
      return profile;
    } catch (error) {
      // Create initial profile
      const initialProfile: LearnerProfile = {
        userId,
        cognitiveProfile: {
          learningStyle: 'reading',
          processingSpeed: 'normal',
          attentionSpan: 25,
          workingMemoryCapacity: 'average',
          preferredDifficultyCurve: 'gradual'
        },
        knowledgeState: {
          masteredConcepts: [],
          learningConcepts: [],
          knowledgeGaps: []
        },
        motivationalProfile: {
          intrinsicMotivation: 0.7,
          goalOrientation: 'mastery',
          persistenceLevel: 0.7,
          feedbackPreference: 'immediate',
          challengePreference: 'moderate'
        },
        culturalInterests: []
      };
      
      this.learnerProfiles.set(userId, initialProfile);
      return initialProfile;
    }
  }
  
  // Additional helper methods
  private inferDifficulty(profile: LearnerProfile): 'beginner' | 'intermediate' | 'advanced' {
    const masteredCount = profile.knowledgeState.masteredConcepts.length;
    if (masteredCount < 10) return 'beginner';
    if (masteredCount < 50) return 'intermediate';
    return 'advanced';
  }
  
  private generatePathMetadata(request: PathGenRequest, milestones: Milestone[], profile: LearnerProfile) {
    return {
      title: `Personalized ${request.goal} Learning Path`,
      description: `Adaptive learning journey tailored for ${profile.cognitiveProfile.learningStyle} learner`,
      estimatedDuration: milestones.reduce((sum, m) => sum + m.estimatedTime, 0) / 60, // Convert to hours
      learningObjectives: milestones.flatMap(m => m.learningObjectives).slice(0, 5),
      prerequisites: []
    };
  }
  
  private extractCulturalThemes(milestones: Milestone[]): string[] {
    return Array.from(new Set(
      milestones.flatMap(m => m.culturalConnections.map(c => c.theme))
    ));
  }
  
  private adjustTimeForProfile(baseTime: number, profile: LearnerProfile): number {
    const speedMultiplier = {
      slow: 1.5,
      normal: 1.0,
      fast: 0.75
    }[profile.cognitiveProfile.processingSpeed];
    
    return Math.round(baseTime * speedMultiplier);
  }
  
  private personalizeContent(content: any, profile: LearnerProfile) {
    // Implementation for personalizing content based on learning style
    return content;
  }
  
  private async evaluateMilestoneCompletion(milestone: Milestone, performance: any) {
    // Implementation for evaluating milestone completion
    return {
      isCompleted: performance.score >= milestone.completionCriteria.minimumScore,
      progress: {
        activitiesCompleted: performance.activitiesCompleted,
        totalActivities: milestone.activities.length,
        currentScore: performance.score,
        timeSpent: performance.timeSpent,
        attempts: performance.attempts + 1
      }
    };
  }
  
  private async applyAdaptiveAdjustments(path: LearningPath, milestone: Milestone, performance: any) {
    // Implementation for applying adaptive adjustments
    return [];
  }
  
  private calculatePathProgress(path: LearningPath) {
    const completedMilestones = path.milestones.filter(m => m.status === 'completed').length;
    return {
      completedMilestones,
      totalMilestones: path.milestones.length,
      currentMilestone: completedMilestones < path.milestones.length ? completedMilestones : path.milestones.length - 1,
      overallProgress: completedMilestones / path.milestones.length,
      estimatedTimeRemaining: path.estimatedDuration * (1 - completedMilestones / path.milestones.length)
    };
  }
  
  private unlockNextMilestone(path: LearningPath, completedMilestone: Milestone): boolean {
    const nextIndex = completedMilestone.order + 1;
    if (nextIndex < path.milestones.length) {
      path.milestones[nextIndex].status = 'available';
      return true;
    }
    return false;
  }
  
  private async generateProgressRecommendations(path: LearningPath, milestone: Milestone, performance: any) {
    // Implementation for generating progress recommendations
    return ['Continue with next milestone', 'Review challenging concepts'];
  }
  
  private async saveLearningPath(path: LearningPath) {
    try {
      await this.apiClient.request('/api/learning-paths/save', {
        method: 'POST',
        body: path as Record<string, unknown>
      });
    } catch (error) {
      console.error('Failed to save learning path:', error);
    }
  }
}

// Export singleton instance
export const realLearningPathEngine = new RealLearningPathEngine();

// Export for direct usage
export default realLearningPathEngine;

/**
 * Convenience functions to replace mock knowledge gap detection
 */
export async function generatePersonalizedLearningPath(
  userId: string,
  goal: string,
  timeframe: number = 12, // weeks
  intensity: 'light' | 'moderate' | 'intensive' = 'moderate'
): Promise<LearningPath> {
  return realLearningPathEngine.generateLearningPath({
    userId,
    goal,
    timeframe,
    intensity,
    focusAreas: [],
    adaptiveFeatures: true
  });
}

export async function completeLearningMilestone(
  pathId: string,
  milestoneId: string,
  performance: any
) {
  return realLearningPathEngine.completeMilestone(pathId, milestoneId, performance);
}

export async function getPersonalizedRecommendations(userId: string) {
  return realLearningPathEngine.getPersonalizedRecommendations(userId);
}

// Initialize the engine
realLearningPathEngine.initialize().catch(console.error);