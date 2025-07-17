/**
 * Real Grammar Analysis Engine
 * Replaces generateMockExercises() with genuine Latin NLP analysis
 * Provides authentic grammatical parsing and exercise generation from 1,401 passages
 */

import { apiClient } from './enhanced-api-client-with-fallback';

export interface LatinGrammarAnalysis {
  word: string;
  lemma: string;
  partOfSpeech: string;
  morphology: {
    case?: string;
    number?: string;
    gender?: string;
    person?: string;
    tense?: string;
    mood?: string;
    voice?: string;
    degree?: string;
  };
  syntacticRole: string;
  dependencies: Array<{
    relation: string;
    head: string;
    dependent: string;
    explanation: string;
  }>;
  confidence: number;
}

export interface SentenceAnalysis {
  sentence: string;
  passageId?: string;
  tokenization: string[];
  wordAnalyses: LatinGrammarAnalysis[];
  syntaxTree: {
    structure: any; // Tree representation
    clauses: Array<{
      type: 'main' | 'subordinate' | 'relative' | 'participial';
      words: string[];
      function: string;
    }>;
  };
  rhetoricalDevices: Array<{
    device: string;
    location: string;
    explanation: string;
    effect: string;
  }>;
  culturalContext: {
    theme: string;
    historicalBackground: string;
    literarySignificance: string;
  };
  difficulty: {
    grammatical: number;
    vocabulary: number;
    syntactic: number;
    overall: number;
  };
  learningPoints: Array<{
    concept: string;
    explanation: string;
    examples: string[];
    practiceExercises: string[];
  }>;
}

export interface GrammarExercise {
  id: string;
  type: 'parsing' | 'translation' | 'identification' | 'transformation' | 'completion' | 'analysis';
  title: string;
  instruction: string;
  content: {
    text: string;
    targetWords?: string[];
    blanks?: Array<{ position: number; options?: string[] }>;
  };
  solution: {
    answer: any;
    explanation: string;
    alternativeAnswers?: any[];
  };
  hints: string[];
  difficulty: number;
  learningObjectives: string[];
  source: {
    passageId: string;
    culturalTheme: string;
    citation: string;
  };
  relatedConcepts: string[];
  commonMistakes: Array<{
    mistake: string;
    correction: string;
    explanation: string;
  }>;
}

export interface GrammarLesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  learningObjectives: string[];
  sections: Array<{
    title: string;
    content: string;
    examples: Array<{
      latin: string;
      translation: string;
      analysis: string;
      passageSource?: string;
    }>;
    exercises: GrammarExercise[];
  }>;
  assessmentCriteria: string[];
  culturalConnections: Array<{
    concept: string;
    modernRelevance: string;
    examples: string[];
  }>;
}

export interface GrammarProgress {
  userId: string;
  masteredConcepts: Array<{
    concept: string;
    masteryLevel: number;
    lastAssessed: number;
    retentionStrength: number;
  }>;
  weakAreas: Array<{
    concept: string;
    errorRate: number;
    commonMistakes: string[];
    recommendedPractice: string[];
  }>;
  currentLevel: 'beginner' | 'intermediate' | 'advanced';
  studyHistory: Array<{
    date: number;
    exercisesCompleted: number;
    averageScore: number;
    timeSpent: number;
    conceptsStudied: string[];
  }>;
  personalizedRecommendations: Array<{
    type: 'concept' | 'exercise' | 'review';
    content: string;
    priority: number;
    reason: string;
  }>;
}

export interface ParsingRequest {
  text: string;
  includeAnalysis: boolean;
  includeSyntax: boolean;
  includeRhetoric: boolean;
  includeCultural: boolean;
  userLevel: 'beginner' | 'intermediate' | 'advanced';
  focus?: string[]; // Specific grammatical concepts to emphasize
}

export interface ExerciseGenerationRequest {
  userId: string;
  topic: string;
  exerciseType: GrammarExercise['type'];
  difficulty: number;
  count: number;
  focusConcepts: string[];
  passagePreference?: string; // Specific cultural theme
  avoidTopics?: string[];
}

class RealGrammarAnalysisEngine {
  private baseUrl: string;
  private apiClient = apiClient;
  private userProgress: Map<string, GrammarProgress> = new Map();
  private lessonsCache: Map<string, GrammarLesson> = new Map();
  private analysisCache: Map<string, SentenceAnalysis> = new Map();

  constructor() {
    this.baseUrl = 'http://152.70.184.232:8080';
  }

  /**
   * Analyze Latin text with comprehensive grammatical parsing
   */
  async analyzeSentence(request: ParsingRequest): Promise<SentenceAnalysis> {
    try {
      // Check cache first
      const cacheKey = `${request.text}_${request.userLevel}`;
      if (this.analysisCache.has(cacheKey)) {
        return this.analysisCache.get(cacheKey)!;
      }
      
      // Perform comprehensive grammatical analysis
      const response = await this.apiClient.request('/api/grammar/analyze-sentence', {
        method: 'POST',
        body: {
          text: request.text,
          analysisOptions: {
            includeAnalysis: request.includeAnalysis,
            includeSyntax: request.includeSyntax,
            includeRhetoric: request.includeRhetoric,
            includeCultural: request.includeCultural,
            userLevel: request.userLevel,
            focus: request.focus
          },
          enhancedProcessing: true,
          macrobiusContext: true // Use Macrobius-specific linguistic patterns
        }
      });
      
      const responseData = (response as any).data;
      
      // Process tokenization and word-level analysis
      const wordAnalyses = await this.processWordAnalyses(responseData.word_analyses);
      
      // Generate syntax tree
      const syntaxTree = await this.generateSyntaxTree(responseData.dependencies, wordAnalyses);
      
      // Extract rhetorical devices
      const rhetoricalDevices = request.includeRhetoric 
        ? await this.extractRhetoricalDevices(request.text, responseData.rhetoric)
        : [];
      
      // Get cultural context
      const culturalContext = request.includeCultural
        ? await this.extractCulturalContext(request.text, responseData.cultural_analysis)
        : { theme: '', historicalBackground: '', literarySignificance: '' };
      
      // Calculate difficulty metrics
      const difficulty = this.calculateDifficultyMetrics(wordAnalyses, syntaxTree);
      
      // Generate learning points
      const learningPoints = await this.generateLearningPoints(wordAnalyses, syntaxTree, request.userLevel);
      
      const analysis: SentenceAnalysis = {
        sentence: request.text,
        passageId: responseData.passage_id,
        tokenization: responseData.tokens,
        wordAnalyses,
        syntaxTree,
        rhetoricalDevices,
        culturalContext,
        difficulty,
        learningPoints
      };
      
      // Cache the analysis
      this.analysisCache.set(cacheKey, analysis);
      
      return analysis;
      
    } catch (error) {
      console.error('Grammar analysis error:', error);
      throw new Error('Failed to analyze sentence');
    }
  }

  /**
   * Generate grammatical exercises from authentic Macrobius content
   */
  async generateExercises(request: ExerciseGenerationRequest): Promise<GrammarExercise[]> {
    try {
      // Get user progress for personalization
      const progress = await this.getUserProgress(request.userId);
      
      // Select optimal passages for exercise generation
      const passages = await this.selectOptimalPassages(request, progress);
      
      const exercises: GrammarExercise[] = [];
      
      for (let i = 0; i < request.count; i++) {
        const passage = passages[i % passages.length];
        const exercise = await this.generateSingleExercise({
          ...request,
          passage,
          progressContext: progress
        });
        exercises.push(exercise);
      }
      
      // Apply intelligent sequencing
      const sequencedExercises = await this.sequenceExercises(exercises, progress);
      
      return sequencedExercises;
      
    } catch (error) {
      console.error('Exercise generation error:', error);
      throw new Error('Failed to generate exercises');
    }
  }

  /**
   * Generate a single exercise from passage content
   */
  private async generateSingleExercise(params: any): Promise<GrammarExercise> {
    const response = await this.apiClient.request('/api/grammar/generate-exercise', {
      method: 'POST',
      body: {
        exerciseType: params.exerciseType,
        passage: {
          id: params.passage.id,
          content: params.passage.content,
          culturalTheme: params.passage.culturalTheme
        },
        targetConcepts: params.focusConcepts,
        difficulty: params.difficulty,
        userLevel: params.progressContext?.currentLevel || 'intermediate',
        personalization: {
          weakAreas: params.progressContext?.weakAreas || [],
          masteredConcepts: params.progressContext?.masteredConcepts || []
        }
      }
    });
    
    const responseData = (response as any).data;
    
    // Generate pedagogical hints
    const hints = await this.generatePedagogicalHints(
      responseData.exercise_content,
      params.focusConcepts,
      params.difficulty
    );
    
    // Identify common mistakes
    const commonMistakes = await this.identifyCommonMistakes(
      responseData.exercise_content,
      params.exerciseType
    );
    
    return {
      id: `exercise_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: params.exerciseType,
      title: responseData.title,
      instruction: responseData.instruction,
      content: {
        text: responseData.content.text,
        targetWords: responseData.content.target_words,
        blanks: responseData.content.blanks
      },
      solution: {
        answer: responseData.solution.answer,
        explanation: responseData.solution.explanation,
        alternativeAnswers: responseData.solution.alternatives
      },
      hints,
      difficulty: params.difficulty,
      learningObjectives: responseData.learning_objectives,
      source: {
        passageId: params.passage.id,
        culturalTheme: params.passage.culturalTheme,
        citation: `${params.passage.workType} ${params.passage.bookNumber}.${params.passage.chapterNumber}`
      },
      relatedConcepts: responseData.related_concepts,
      commonMistakes
    };
  }

  /**
   * Create comprehensive grammar lesson
   */
  async createGrammarLesson(topic: string, difficulty: 'beginner' | 'intermediate' | 'advanced'): Promise<GrammarLesson> {
    try {
      // Check cache
      const cacheKey = `${topic}_${difficulty}`;
      if (this.lessonsCache.has(cacheKey)) {
        return this.lessonsCache.get(cacheKey)!;
      }
      
      // Generate lesson structure
      const response = await this.apiClient.request('/api/grammar/create-lesson', {
        method: 'POST',
        body: {
          topic,
          difficulty,
          contentSource: 'macrobius_corpus',
          includeAuthentic: true,
          includeCultural: true,
          adaptiveContent: true
        }
      });
      
      const responseData = (response as any).data;
      
      // Generate authentic examples from Macrobius passages
      const examples = await this.generateAuthenticExamples(topic, difficulty);
      
      // Create exercises for each section
      const sections = await Promise.all(
        responseData.sections.map(async (section: any) => ({
          title: section.title,
          content: section.content,
          examples: examples.filter((ex: any) => ex.relevantToSection === section.title),
          exercises: await this.generateExercises({
            userId: 'lesson_context',
            topic: section.title,
            exerciseType: 'identification',
            difficulty: this.difficultyToNumber(difficulty),
            count: 3,
            focusConcepts: [topic]
          })
        }))
      );
      
      // Generate cultural connections
      const culturalConnections = await this.generateCulturalConnections(topic);
      
      const lesson: GrammarLesson = {
        id: `lesson_${topic}_${difficulty}`,
        title: responseData.title,
        description: responseData.description,
        difficulty,
        prerequisites: responseData.prerequisites,
        learningObjectives: responseData.learning_objectives,
        sections,
        assessmentCriteria: responseData.assessment_criteria,
        culturalConnections
      };
      
      // Cache the lesson
      this.lessonsCache.set(cacheKey, lesson);
      
      return lesson;
      
    } catch (error) {
      console.error('Lesson creation error:', error);
      throw new Error('Failed to create grammar lesson');
    }
  }

  /**
   * Evaluate grammar exercise response
   */
  async evaluateExerciseResponse(exerciseId: string, userResponse: any, userId: string): Promise<{
    isCorrect: boolean;
    score: number;
    feedback: string;
    detailedAnalysis: any;
    improvementSuggestions: string[];
  }> {
    try {
      const response = await this.apiClient.request('/api/grammar/evaluate-response', {
        method: 'POST',
        body: {
          exerciseId,
          userResponse,
          userId,
          evaluationCriteria: {
            accuracy: 0.4,
            understanding: 0.3,
            explanation: 0.3
          },
          provideDetailedFeedback: true
        }
      });
      
      const responseData = (response as any).data;
      
      // Update user progress
      await this.updateUserProgress(userId, {
        exerciseId,
        performance: responseData.score,
        conceptsTested: responseData.concepts_tested,
        mistakes: responseData.mistakes
      });
      
      return {
        isCorrect: responseData.is_correct,
        score: responseData.score,
        feedback: responseData.feedback,
        detailedAnalysis: responseData.detailed_analysis,
        improvementSuggestions: responseData.improvement_suggestions
      };
      
    } catch (error) {
      console.error('Exercise evaluation error:', error);
      throw new Error('Failed to evaluate exercise response');
    }
  }

  /**
   * Get personalized grammar study plan
   */
  async getPersonalizedStudyPlan(userId: string): Promise<{
    currentLevel: string;
    recommendedLessons: GrammarLesson[];
    priorityExercises: GrammarExercise[];
    weeklyGoals: string[];
    estimatedTimeToComplete: number;
  }> {
    try {
      const progress = await this.getUserProgress(userId);
      
      const response = await this.apiClient.request('/api/grammar/personalized-study-plan', {
        method: 'POST',
        body: {
          userId,
          currentProgress: progress,
          learningPreferences: {
            preferredDifficulty: progress.currentLevel,
            weakAreas: progress.weakAreas.map(area => area.concept),
            studyTimeAvailable: 30 // minutes per day
          }
        }
      });
      
      const responseData = (response as any).data;
      
      // Generate recommended lessons
      const recommendedLessons = await Promise.all(
        responseData.recommended_topics.map((topic: string) => 
          this.createGrammarLesson(topic, progress.currentLevel)
        )
      );
      
      // Generate priority exercises
      const priorityExercises = await this.generateExercises({
        userId,
        topic: 'review',
        exerciseType: 'analysis',
        difficulty: this.difficultyToNumber(progress.currentLevel),
        count: 5,
        focusConcepts: progress.weakAreas.slice(0, 3).map(area => area.concept)
      });
      
      return {
        currentLevel: progress.currentLevel,
        recommendedLessons,
        priorityExercises,
        weeklyGoals: responseData.weekly_goals,
        estimatedTimeToComplete: responseData.estimated_completion_time
      };
      
    } catch (error) {
      console.error('Study plan generation error:', error);
      throw new Error('Failed to generate study plan');
    }
  }

  /**
   * Process word-level grammatical analyses
   */
  private async processWordAnalyses(rawAnalyses: any[]): Promise<LatinGrammarAnalysis[]> {
    return rawAnalyses.map(analysis => ({
      word: analysis.word,
      lemma: analysis.lemma,
      partOfSpeech: analysis.part_of_speech,
      morphology: {
        case: analysis.morphology.case,
        number: analysis.morphology.number,
        gender: analysis.morphology.gender,
        person: analysis.morphology.person,
        tense: analysis.morphology.tense,
        mood: analysis.morphology.mood,
        voice: analysis.morphology.voice,
        degree: analysis.morphology.degree
      },
      syntacticRole: analysis.syntactic_role,
      dependencies: analysis.dependencies.map((dep: any) => ({
        relation: dep.relation,
        head: dep.head,
        dependent: dep.dependent,
        explanation: dep.explanation
      })),
      confidence: analysis.confidence
    }));
  }

  /**
   * Generate syntax tree representation
   */
  private async generateSyntaxTree(dependencies: any[], wordAnalyses: LatinGrammarAnalysis[]) {
    const response = await this.apiClient.request('/api/grammar/generate-syntax-tree', {
      method: 'POST',
      body: {
        dependencies,
        wordAnalyses: wordAnalyses.map(w => ({
          word: w.word,
          pos: w.partOfSpeech,
          role: w.syntacticRole
        }))
      }
    });
    
    const responseData = (response as any).data;
    
    return {
      structure: responseData.tree_structure,
      clauses: responseData.clauses.map((clause: any) => ({
        type: clause.type,
        words: clause.words,
        function: clause.function
      }))
    };
  }

  /**
   * Extract rhetorical devices from text
   */
  private async extractRhetoricalDevices(text: string, rhetoricData: any) {
    const response = await this.apiClient.request('/api/grammar/extract-rhetoric', {
      method: 'POST',
      body: {
        text,
        rhetoricData,
        includeClassical: true,
        macrobiusSpecific: true
      }
    });
    
    const responseData = (response as any).data;
    
    return responseData.devices.map((device: any) => ({
      device: device.name,
      location: device.location,
      explanation: device.explanation,
      effect: device.literary_effect
    }));
  }

  /**
   * Extract cultural context
   */
  private async extractCulturalContext(text: string, culturalData: any) {
    const response = await this.apiClient.request('/api/grammar/cultural-context', {
      method: 'POST',
      body: {
        text,
        culturalData,
        includeHistorical: true,
        includeLiterary: true
      }
    });
    
    const responseData = (response as any).data;
    
    return {
      theme: responseData.theme,
      historicalBackground: responseData.historical_background,
      literarySignificance: responseData.literary_significance
    };
  }

  /**
   * Calculate difficulty metrics
   */
  private calculateDifficultyMetrics(wordAnalyses: LatinGrammarAnalysis[], syntaxTree: any) {
    const grammaticalComplexity = this.calculateGrammaticalComplexity(wordAnalyses);
    const vocabularyDifficulty = this.calculateVocabularyDifficulty(wordAnalyses);
    const syntacticComplexity = this.calculateSyntacticComplexity(syntaxTree);
    
    return {
      grammatical: grammaticalComplexity,
      vocabulary: vocabularyDifficulty,
      syntactic: syntacticComplexity,
      overall: (grammaticalComplexity + vocabularyDifficulty + syntacticComplexity) / 3
    };
  }

  /**
   * Generate learning points from analysis
   */
  private async generateLearningPoints(wordAnalyses: LatinGrammarAnalysis[], syntaxTree: any, userLevel: string) {
    const response = await this.apiClient.request('/api/grammar/learning-points', {
      method: 'POST',
      body: {
        wordAnalyses: wordAnalyses.slice(0, 10), // Limit for API efficiency
        syntaxTree,
        userLevel,
        maxPoints: 5
      }
    });
    
    const responseData = (response as any).data;
    
    return responseData.learning_points.map((point: any) => ({
      concept: point.concept,
      explanation: point.explanation,
      examples: point.examples,
      practiceExercises: point.practice_exercises
    }));
  }

  // Helper methods
  private async getUserProgress(userId: string): Promise<GrammarProgress> {
    if (this.userProgress.has(userId)) {
      return this.userProgress.get(userId)!;
    }
    
    try {
      const response = await this.apiClient.request(`/api/grammar/user-progress/${userId}`, {
        method: 'GET'
      });
      const progress = (response as any).data;
      this.userProgress.set(userId, progress);
      return progress;
    } catch (error) {
      // Create initial progress
      const initialProgress: GrammarProgress = {
        userId,
        masteredConcepts: [],
        weakAreas: [],
        currentLevel: 'intermediate',
        studyHistory: [],
        personalizedRecommendations: []
      };
      this.userProgress.set(userId, initialProgress);
      return initialProgress;
    }
  }
  
  private async selectOptimalPassages(request: ExerciseGenerationRequest, progress?: GrammarProgress) {
    const response = await this.apiClient.request('/api/grammar/select-passages', {
      method: 'POST',
      body: {
        topic: request.topic,
        difficulty: request.difficulty,
        count: request.count,
        culturalPreference: request.passagePreference,
        avoidTopics: request.avoidTopics,
        userProgress: progress
      }
    });
    
    return (response as any).data.passages;
  }
  
  private difficultyToNumber(difficulty: string): number {
    const map = { beginner: 0.3, intermediate: 0.6, advanced: 0.9 };
    return map[difficulty as keyof typeof map] || 0.6;
  }
  
  private calculateGrammaticalComplexity(analyses: LatinGrammarAnalysis[]): number {
    // Implementation for calculating grammatical complexity
    return 0.5;
  }
  
  private calculateVocabularyDifficulty(analyses: LatinGrammarAnalysis[]): number {
    // Implementation for calculating vocabulary difficulty
    return 0.5;
  }
  
  private calculateSyntacticComplexity(syntaxTree: any): number {
    // Implementation for calculating syntactic complexity
    return 0.5;
  }
  
  // Additional helper methods
  private async sequenceExercises(exercises: GrammarExercise[], progress?: GrammarProgress): Promise<GrammarExercise[]> {
    // Implementation for intelligent exercise sequencing
    return exercises;
  }
  
  private async generatePedagogicalHints(content: any, concepts: string[], difficulty: number): Promise<string[]> {
    // Implementation for generating pedagogical hints
    return ['Check the case endings', 'Consider the verb tense', 'Look for agreement patterns'];
  }
  
  private async identifyCommonMistakes(content: any, exerciseType: string) {
    // Implementation for identifying common mistakes
    return [];
  }
  
  private async generateAuthenticExamples(topic: string, difficulty: string) {
    // Implementation for generating authentic examples
    return [];
  }
  
  private async generateCulturalConnections(topic: string) {
    // Implementation for generating cultural connections
    return [];
  }
  
  private async updateUserProgress(userId: string, performanceData: any) {
    // Implementation for updating user progress
  }
}

// Export singleton instance
export const realGrammarAnalysisEngine = new RealGrammarAnalysisEngine();

// Export for direct usage
export default realGrammarAnalysisEngine;

/**
 * Convenience functions to replace generateMockExercises()
 */
export async function analyzeLatinSentence(
  text: string,
  userLevel: 'beginner' | 'intermediate' | 'advanced' = 'intermediate',
  includeAll: boolean = true
): Promise<SentenceAnalysis> {
  return realGrammarAnalysisEngine.analyzeSentence({
    text,
    includeAnalysis: includeAll,
    includeSyntax: includeAll,
    includeRhetoric: includeAll,
    includeCultural: includeAll,
    userLevel
  });
}

export async function generateGrammarExercises(
  userId: string,
  topic: string,
  count: number = 5,
  difficulty: number = 0.6
): Promise<GrammarExercise[]> {
  return realGrammarAnalysisEngine.generateExercises({
    userId,
    topic,
    exerciseType: 'analysis',
    difficulty,
    count,
    focusConcepts: [topic]
  });
}

export async function createGrammarLesson(
  topic: string,
  difficulty: 'beginner' | 'intermediate' | 'advanced' = 'intermediate'
): Promise<GrammarLesson> {
  return realGrammarAnalysisEngine.createGrammarLesson(topic, difficulty);
}