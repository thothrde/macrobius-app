/**
 * Real RAG (Retrieval-Augmented Generation) System Engine
 * Replaces all mock simulateRAGResponse() functions with genuine AI
 * Connects to Oracle Cloud backend with 1,401 authentic Latin passages
 */

import { enhancedApiClient } from './enhanced-api-client-with-fallback';

export interface RAGQuery {
  question: string;
  context?: string;
  language: 'de' | 'en' | 'la';
  userId?: string;
  sessionId?: string;
}

export interface RAGResponse {
  answer: string;
  citations: {
    passageId: string;
    title: string;
    content: string;
    relevanceScore: number;
    culturalTheme: string;
    workType: 'Saturnalia' | 'Commentarii';
    bookNumber: number;
    chapterNumber: number;
  }[];
  confidence: number;
  processingTime: number;
  relatedQuestions: string[];
  culturalInsights: string[];
}

export interface RAGContext {
  conversationHistory: Array<{
    query: string;
    response: string;
    timestamp: number;
  }>;
  userProfile: {
    language: string;
    learningLevel: 'beginner' | 'intermediate' | 'advanced';
    interests: string[];
  };
  activeSession: {
    sessionId: string;
    startTime: number;
    queryCount: number;
  };
}

class RealRAGSystemEngine {
  private baseUrl: string;
  private contexts: Map<string, RAGContext> = new Map();
  private apiClient = enhancedApiClient;

  constructor() {
    this.baseUrl = 'http://152.70.184.232:8080';
  }

  /**
   * Process RAG query with real AI analysis
   * Connects to Oracle Cloud backend for authentic content retrieval
   */
  async processQuery(query: RAGQuery): Promise<RAGResponse> {
    const startTime = Date.now();

    try {
      // Get user context for personalized responses
      const context = this.getOrCreateContext(query.userId || 'anonymous');
      
      // Step 1: Semantic retrieval from 1,401 authentic passages
      const relevantPassages = await this.retrieveRelevantPassages(query);
      
      // Step 2: Generate contextual answer using retrieved content
      const answer = await this.generateContextualAnswer(query, relevantPassages, context);
      
      // Step 3: Extract citations with relevance scoring
      const citations = await this.generateCitations(relevantPassages, query);
      
      // Step 4: Generate related questions and cultural insights
      const [relatedQuestions, culturalInsights] = await Promise.all([
        this.generateRelatedQuestions(query, relevantPassages),
        this.extractCulturalInsights(relevantPassages, query.language)
      ]);
      
      // Step 5: Calculate confidence based on passage relevance and semantic similarity
      const confidence = this.calculateConfidence(relevantPassages, query);
      
      // Update conversation context
      this.updateContext(query.userId || 'anonymous', query.question, answer.content);
      
      const response: RAGResponse = {
        answer: answer.content,
        citations,
        confidence,
        processingTime: Date.now() - startTime,
        relatedQuestions,
        culturalInsights
      };
      
      // Track query analytics
      await this.trackQueryAnalytics(query, response);
      
      return response;
      
    } catch (error) {
      console.error('RAG System Error:', error);
      return this.generateFallbackResponse(query, error as Error);
    }
  }

  /**
   * Retrieve semantically relevant passages from Oracle Cloud
   */
  private async retrieveRelevantPassages(query: RAGQuery) {
    const response = await this.apiClient.post('/api/rag/retrieve', {
      query: query.question,
      language: query.language,
      context: query.context,
      maxResults: 10,
      minRelevanceScore: 0.3
    });

    return response.data.passages.map((passage: any) => ({
      id: passage.id,
      content: passage.latin_text,
      culturalTheme: passage.cultural_theme,
      workType: passage.work_type,
      bookNumber: passage.book_number,
      chapterNumber: passage.chapter_number,
      sectionNumber: passage.section_number,
      relevanceScore: passage.relevance_score,
      semanticEmbedding: passage.embedding
    }));
  }

  /**
   * Generate contextual answer using real NLP analysis
   */
  private async generateContextualAnswer(query: RAGQuery, passages: any[], context: RAGContext) {
    const response = await this.apiClient.post('/api/rag/generate', {
      question: query.question,
      passages: passages.map(p => ({
        content: p.content,
        theme: p.culturalTheme,
        relevance: p.relevanceScore
      })),
      language: query.language,
      conversationHistory: context.conversationHistory.slice(-5), // Last 5 exchanges
      userProfile: context.userProfile
    });

    return {
      content: response.data.answer,
      reasoning: response.data.reasoning,
      sourceAnalysis: response.data.source_analysis
    };
  }

  /**
   * Generate authentic citations with relevance scoring
   */
  private async generateCitations(passages: any[], query: RAGQuery) {
    return passages
      .filter(p => p.relevanceScore > 0.4)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 5)
      .map(passage => ({
        passageId: passage.id,
        title: `${passage.workType} ${passage.bookNumber}.${passage.chapterNumber}.${passage.sectionNumber}`,
        content: passage.content.substring(0, 200) + '...',
        relevanceScore: passage.relevanceScore,
        culturalTheme: passage.culturalTheme,
        workType: passage.workType,
        bookNumber: passage.bookNumber,
        chapterNumber: passage.chapterNumber
      }));
  }

  /**
   * Generate related questions using content analysis
   */
  private async generateRelatedQuestions(query: RAGQuery, passages: any[]): Promise<string[]> {
    const response = await this.apiClient.post('/api/rag/related-questions', {
      originalQuery: query.question,
      culturalThemes: passages.map(p => p.culturalTheme),
      language: query.language,
      count: 3
    });

    return response.data.questions;
  }

  /**
   * Extract cultural insights from passages
   */
  private async extractCulturalInsights(passages: any[], language: string): Promise<string[]> {
    const response = await this.apiClient.post('/api/rag/cultural-insights', {
      passages: passages.map(p => ({
        theme: p.culturalTheme,
        content: p.content
      })),
      language,
      maxInsights: 2
    });

    return response.data.insights;
  }

  /**
   * Calculate confidence based on semantic similarity and passage quality
   */
  private calculateConfidence(passages: any[], query: RAGQuery): number {
    if (passages.length === 0) return 0.1;
    
    const avgRelevance = passages.reduce((sum, p) => sum + p.relevanceScore, 0) / passages.length;
    const passageQuality = Math.min(passages.length / 5, 1); // More passages = higher confidence
    const contextMatch = query.context ? 0.2 : 0; // Context provides additional confidence
    
    return Math.min(avgRelevance * 0.7 + passageQuality * 0.2 + contextMatch, 0.95);
  }

  /**
   * Get or create conversation context for user
   */
  private getOrCreateContext(userId: string): RAGContext {
    if (!this.contexts.has(userId)) {
      this.contexts.set(userId, {
        conversationHistory: [],
        userProfile: {
          language: 'en',
          learningLevel: 'intermediate',
          interests: []
        },
        activeSession: {
          sessionId: `session_${Date.now()}`,
          startTime: Date.now(),
          queryCount: 0
        }
      });
    }
    return this.contexts.get(userId)!;
  }

  /**
   * Update conversation context
   */
  private updateContext(userId: string, query: string, response: string) {
    const context = this.getOrCreateContext(userId);
    context.conversationHistory.push({
      query,
      response,
      timestamp: Date.now()
    });
    
    // Keep only last 10 exchanges
    if (context.conversationHistory.length > 10) {
      context.conversationHistory = context.conversationHistory.slice(-10);
    }
    
    context.activeSession.queryCount++;
  }

  /**
   * Track query analytics for learning optimization
   */
  private async trackQueryAnalytics(query: RAGQuery, response: RAGResponse) {
    try {
      await this.apiClient.post('/api/analytics/rag-query', {
        userId: query.userId,
        sessionId: query.sessionId,
        query: query.question,
        language: query.language,
        confidence: response.confidence,
        processingTime: response.processingTime,
        citationCount: response.citations.length,
        culturalThemes: response.citations.map(c => c.culturalTheme),
        timestamp: Date.now()
      });
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  }

  /**
   * Generate fallback response when system fails
   */
  private generateFallbackResponse(query: RAGQuery, error: Error): RAGResponse {
    const fallbackAnswers = {
      de: 'Entschuldigung, ich kann Ihre Frage momentan nicht beantworten. Das RAG-System ist temporär nicht verfügbar.',
      en: 'Sorry, I cannot answer your question at the moment. The RAG system is temporarily unavailable.',
      la: 'Ignosce, quaestionem tuam nunc respondere non possum. Systema RAG temporarie non praesto est.'
    };

    return {
      answer: fallbackAnswers[query.language] || fallbackAnswers.en,
      citations: [],
      confidence: 0.1,
      processingTime: 0,
      relatedQuestions: [],
      culturalInsights: [],
    };
  }

  /**
   * Test connection to Oracle Cloud backend
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.apiClient.get('/api/health');
      return response.status === 200;
    } catch (error) {
      console.error('Oracle Cloud connection failed:', error);
      return false;
    }
  }

  /**
   * Get system statistics
   */
  async getSystemStats() {
    try {
      const response = await this.apiClient.get('/api/rag/stats');
      return {
        totalPassages: response.data.total_passages,
        activeContexts: this.contexts.size,
        avgProcessingTime: response.data.avg_processing_time,
        successRate: response.data.success_rate
      };
    } catch (error) {
      return {
        totalPassages: 1401,
        activeContexts: this.contexts.size,
        avgProcessingTime: 0,
        successRate: 0
      };
    }
  }
}

// Export singleton instance
export const realRAGEngine = new RealRAGSystemEngine();

// Export for direct usage
export default realRAGEngine;

/**
 * Convenience function to replace simulateRAGResponse()
 * Use this in components to transition from mock to real AI
 */
export async function processRAGQuery(
  question: string, 
  language: 'de' | 'en' | 'la' = 'en',
  context?: string,
  userId?: string
): Promise<RAGResponse> {
  return realRAGEngine.processQuery({
    question,
    language,
    context,
    userId
  });
}