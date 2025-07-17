/**
 * Real Semantic Search Engine
 * Replaces all mock semantic search with genuine vector similarity calculations
 * Connects to Oracle Cloud backend for authentic Latin text processing
 */

import { MacrobiusAPI } from './enhanced-api-client-with-fallback';

export interface SemanticQuery {
  text: string;
  language: 'de' | 'en' | 'la';
  searchType: 'semantic' | 'keyword' | 'hybrid';
  filters?: {
    culturalTheme?: string[];
    workType?: ('Saturnalia' | 'Commentarii')[];
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    timeRange?: { start?: number; end?: number };
  };
  options?: {
    maxResults?: number;
    minSimilarity?: number;
    includeContext?: boolean;
    expandQuery?: boolean;
  };
}

export interface SearchResult {
  id: string;
  content: string;
  title: string;
  similarity: number;
  culturalTheme: string;
  workType: 'Saturnalia' | 'Commentarii';
  bookNumber: number;
  chapterNumber: number;
  sectionNumber: number;
  context: {
    before: string;
    after: string;
  };
  highlights: Array<{
    text: string;
    start: number;
    end: number;
    reason: string;
  }>;
  keywords: string[];
  relatedConcepts: string[];
}

export interface SearchResponse {
  results: SearchResult[];
  totalFound: number;
  processingTime: number;
  queryExpansion: {
    originalQuery: string;
    expandedTerms: string[];
    synonyms: string[];
  };
  facets: {
    culturalThemes: Array<{ theme: string; count: number }>;
    workTypes: Array<{ type: string; count: number }>;
    difficulty: Array<{ level: string; count: number }>;
  };
  suggestions: string[];
  conceptMap: Array<{
    concept: string;
    relations: string[];
    strength: number;
  }>;
}

export interface UserSearchProfile {
  searchHistory: Array<{
    query: string;
    timestamp: number;
    clickedResults: string[];
  }>;
  preferences: {
    preferredThemes: string[];
    languagePreference: 'de' | 'en' | 'la';
    difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  };
  analytics: {
    totalSearches: number;
    avgResultsClicked: number;
    topKeywords: string[];
  };
}

class RealSemanticSearchEngine {
  private baseUrl: string;
  private userProfiles: Map<string, UserSearchProfile> = new Map();
  private apiClient = MacrobiusAPI;
  private conceptCache: Map<string, any[]> = new Map();

  constructor() {
    this.baseUrl = 'http://152.70.184.232:8080';
  }

  /**
   * Perform semantic search with real vector similarity
   */
  async search(query: SemanticQuery, userId?: string): Promise<SearchResponse> {
    const startTime = Date.now();

    try {
      // Step 1: Query expansion using real NLP
      const expandedQuery = await this.expandQuery(query);
      
      // Step 2: Generate query embedding
      const queryEmbedding = await this.generateQueryEmbedding(expandedQuery);
      
      // Step 3: Perform vector similarity search
      const rawResults = await this.performVectorSearch(queryEmbedding, query);
      
      // Step 4: Apply semantic ranking and filtering
      const rankedResults = await this.rankResults(rawResults, query, userId);
      
      // Step 5: Generate highlights and context
      const enrichedResults = await this.enrichResults(rankedResults, query);
      
      // Step 6: Generate facets and suggestions
      const [facets, suggestions, conceptMap] = await Promise.all([
        this.generateFacets(rawResults),
        this.generateSuggestions(query, rawResults),
        this.generateConceptMap(enrichedResults)
      ]);
      
      // Step 7: Update user profile
      if (userId) {
        this.updateUserProfile(userId, query, enrichedResults);
      }
      
      const response: SearchResponse = {
        results: enrichedResults,
        totalFound: rawResults.length,
        processingTime: Date.now() - startTime,
        queryExpansion: expandedQuery,
        facets,
        suggestions,
        conceptMap
      };
      
      // Track search analytics
      await this.trackSearchAnalytics(query, response, userId);
      
      return response;
      
    } catch (error) {
      console.error('Semantic Search Error:', error);
      return this.generateFallbackResponse(query, error as Error);
    }
  }

  /**
   * Expand query using real NLP and Latin linguistic analysis
   */
  private async expandQuery(query: SemanticQuery) {
    const response = await this.apiClient.post('/api/search/expand-query', {
      text: query.text,
      language: query.language,
      includeLatinForms: true,
      includeSynonyms: true,
      includeRelatedConcepts: true
    });

    return {
      originalQuery: query.text,
      expandedTerms: response.data.expanded_terms,
      synonyms: response.data.synonyms,
      latinForms: response.data.latin_forms,
      concepts: response.data.related_concepts
    };
  }

  /**
   * Generate semantic embedding for query
   */
  private async generateQueryEmbedding(expandedQuery: any) {
    const response = await this.apiClient.post('/api/search/embedding', {
      text: expandedQuery.originalQuery,
      expandedTerms: expandedQuery.expandedTerms,
      language: 'la', // Always generate Latin-optimized embedding
      modelType: 'macrobius-specialized'
    });

    return {
      vector: response.data.embedding,
      dimensions: response.data.dimensions,
      model: response.data.model_version
    };
  }

  /**
   * Perform vector similarity search against 1,401 passages
   */
  private async performVectorSearch(embedding: any, query: SemanticQuery) {
    const response = await this.apiClient.post('/api/search/vector-similarity', {
      queryVector: embedding.vector,
      filters: query.filters,
      maxResults: query.options?.maxResults || 50,
      minSimilarity: query.options?.minSimilarity || 0.3,
      searchType: query.searchType
    });

    return response.data.results.map((result: any) => ({
      id: result.id,
      content: result.latin_text,
      similarity: result.similarity_score,
      culturalTheme: result.cultural_theme,
      workType: result.work_type,
      bookNumber: result.book_number,
      chapterNumber: result.chapter_number,
      sectionNumber: result.section_number,
      embedding: result.embedding,
      metadata: result.metadata
    }));
  }

  /**
   * Apply semantic ranking using multiple factors
   */
  private async rankResults(results: any[], query: SemanticQuery, userId?: string) {
    // Get user preferences for personalized ranking
    const userProfile = userId ? this.getUserProfile(userId) : null;
    
    const response = await this.apiClient.post('/api/search/rank', {
      results: results.map(r => ({
        id: r.id,
        similarity: r.similarity,
        culturalTheme: r.culturalTheme,
        content: r.content.substring(0, 500) // Send partial content for ranking
      })),
      query: query.text,
      userPreferences: userProfile?.preferences,
      rankingFactors: {
        semanticSimilarity: 0.4,
        culturalRelevance: 0.3,
        userPreference: 0.2,
        contentQuality: 0.1
      }
    });

    return response.data.rankedResults.map((ranked: any) => {
      const originalResult = results.find(r => r.id === ranked.id);
      return {
        ...originalResult,
        finalScore: ranked.final_score,
        rankingFactors: ranked.ranking_factors
      };
    });
  }

  /**
   * Enrich results with highlights, context, and keywords
   */
  private async enrichResults(results: any[], query: SemanticQuery): Promise<SearchResult[]> {
    const enrichmentPromises = results.map(async (result) => {
      const [highlights, context, keywords] = await Promise.all([
        this.generateHighlights(result, query),
        this.getContext(result),
        this.extractKeywords(result, query)
      ]);

      return {
        id: result.id,
        content: result.content,
        title: `${result.workType} ${result.bookNumber}.${result.chapterNumber}.${result.sectionNumber}`,
        similarity: result.similarity,
        culturalTheme: result.culturalTheme,
        workType: result.workType,
        bookNumber: result.bookNumber,
        chapterNumber: result.chapterNumber,
        sectionNumber: result.sectionNumber,
        context,
        highlights,
        keywords,
        relatedConcepts: await this.getRelatedConcepts(result)
      };
    });

    return Promise.all(enrichmentPromises);
  }

  /**
   * Generate semantic highlights using NLP analysis
   */
  private async generateHighlights(result: any, query: SemanticQuery) {
    const response = await this.apiClient.post('/api/search/highlights', {
      content: result.content,
      query: query.text,
      language: query.language,
      highlightType: 'semantic' // Not just keyword matching
    });

    return response.data.highlights.map((highlight: any) => ({
      text: highlight.text,
      start: highlight.start_pos,
      end: highlight.end_pos,
      reason: highlight.reason // e.g., "semantic similarity", "cultural concept", "grammatical pattern"
    }));
  }

  /**
   * Get surrounding context for passages
   */
  private async getContext(result: any) {
    const response = await this.apiClient.get(
      `/api/passages/${result.id}/context?before=100&after=100`
    );

    return {
      before: response.data.context_before || '',
      after: response.data.context_after || ''
    };
  }

  /**
   * Extract semantic keywords using Latin NLP
   */
  private async extractKeywords(result: any, query: SemanticQuery) {
    const response = await this.apiClient.post('/api/nlp/keywords', {
      text: result.content,
      language: 'la',
      extractionMethod: 'semantic',
      maxKeywords: 10
    });

    return response.data.keywords;
  }

  /**
   * Get related concepts using knowledge graph
   */
  private async getRelatedConcepts(result: any): Promise<string[]> {
    const cacheKey = `concepts_${result.culturalTheme}`;
    
    if (this.conceptCache.has(cacheKey)) {
      return this.conceptCache.get(cacheKey)!;
    }

    const response = await this.apiClient.get(
      `/api/knowledge-graph/concepts/${result.culturalTheme}/related`
    );

    const concepts = response.data.related_concepts;
    this.conceptCache.set(cacheKey, concepts);
    
    return concepts;
  }

  /**
   * Generate search facets for filtering
   */
  private async generateFacets(results: any[]) {
    const culturalThemes = new Map<string, number>();
    const workTypes = new Map<string, number>();
    const difficulties = new Map<string, number>();

    results.forEach(result => {
      // Cultural themes
      const theme = result.culturalTheme;
      culturalThemes.set(theme, (culturalThemes.get(theme) || 0) + 1);
      
      // Work types
      const work = result.workType;
      workTypes.set(work, (workTypes.get(work) || 0) + 1);
      
      // Estimated difficulty based on content complexity
      const difficulty = this.estimateDifficulty(result.content);
      difficulties.set(difficulty, (difficulties.get(difficulty) || 0) + 1);
    });

    return {
      culturalThemes: Array.from(culturalThemes.entries()).map(([theme, count]) => ({ theme, count })),
      workTypes: Array.from(workTypes.entries()).map(([type, count]) => ({ type, count })),
      difficulty: Array.from(difficulties.entries()).map(([level, count]) => ({ level, count }))
    };
  }

  /**
   * Generate intelligent search suggestions
   */
  private async generateSuggestions(query: SemanticQuery, results: any[]): Promise<string[]> {
    const response = await this.apiClient.post('/api/search/suggestions', {
      originalQuery: query.text,
      resultThemes: results.map(r => r.culturalTheme),
      language: query.language,
      maxSuggestions: 5
    });

    return response.data.suggestions;
  }

  /**
   * Generate concept relationship map
   */
  private async generateConceptMap(results: SearchResult[]) {
    const concepts = new Set<string>();
    results.forEach(result => {
      result.keywords.forEach(keyword => concepts.add(keyword));
      result.relatedConcepts.forEach(concept => concepts.add(concept));
    });

    const response = await this.apiClient.post('/api/knowledge-graph/concept-map', {
      concepts: Array.from(concepts),
      maxRelations: 20
    });

    return response.data.concept_map;
  }

  /**
   * Estimate content difficulty using linguistic analysis
   */
  private estimateDifficulty(content: string): string {
    // Simple heuristic - will be replaced with ML model
    const wordCount = content.split(' ').length;
    const avgWordLength = content.split(' ').reduce((sum, word) => sum + word.length, 0) / wordCount;
    
    if (avgWordLength < 5 && wordCount < 50) return 'beginner';
    if (avgWordLength < 7 && wordCount < 100) return 'intermediate';
    return 'advanced';
  }

  /**
   * Get or create user search profile
   */
  private getUserProfile(userId: string): UserSearchProfile {
    if (!this.userProfiles.has(userId)) {
      this.userProfiles.set(userId, {
        searchHistory: [],
        preferences: {
          preferredThemes: [],
          languagePreference: 'en',
          difficultyLevel: 'intermediate'
        },
        analytics: {
          totalSearches: 0,
          avgResultsClicked: 0,
          topKeywords: []
        }
      });
    }
    return this.userProfiles.get(userId)!;
  }

  /**
   * Update user profile based on search behavior
   */
  private updateUserProfile(userId: string, query: SemanticQuery, results: SearchResult[]) {
    const profile = this.getUserProfile(userId);
    
    profile.searchHistory.push({
      query: query.text,
      timestamp: Date.now(),
      clickedResults: [] // Will be updated when user clicks results
    });
    
    profile.analytics.totalSearches++;
    
    // Update preferred themes based on search patterns
    const searchedThemes = results.map(r => r.culturalTheme);
    searchedThemes.forEach(theme => {
      if (!profile.preferences.preferredThemes.includes(theme)) {
        profile.preferences.preferredThemes.push(theme);
      }
    });
    
    // Keep only last 100 searches
    if (profile.searchHistory.length > 100) {
      profile.searchHistory = profile.searchHistory.slice(-100);
    }
  }

  /**
   * Track search analytics
   */
  private async trackSearchAnalytics(query: SemanticQuery, response: SearchResponse, userId?: string) {
    try {
      await this.apiClient.post('/api/analytics/search', {
        userId,
        query: query.text,
        language: query.language,
        searchType: query.searchType,
        resultsFound: response.totalFound,
        processingTime: response.processingTime,
        topThemes: response.facets.culturalThemes.slice(0, 3),
        timestamp: Date.now()
      });
    } catch (error) {
      console.warn('Search analytics tracking failed:', error);
    }
  }

  /**
   * Generate fallback response when search fails
   */
  private generateFallbackResponse(query: SemanticQuery, error: Error): SearchResponse {
    return {
      results: [],
      totalFound: 0,
      processingTime: 0,
      queryExpansion: {
        originalQuery: query.text,
        expandedTerms: [],
        synonyms: []
      },
      facets: {
        culturalThemes: [],
        workTypes: [],
        difficulty: []
      },
      suggestions: [],
      conceptMap: []
    };
  }

  /**
   * Test connection to Oracle Cloud backend
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.apiClient.get('/api/search/health');
      return response.status === 200;
    } catch (error) {
      console.error('Search engine connection failed:', error);
      return false;
    }
  }

  /**
   * Get search engine statistics
   */
  async getStats() {
    try {
      const response = await this.apiClient.get('/api/search/stats');
      return {
        totalDocuments: response.data.total_documents,
        totalSearches: response.data.total_searches,
        avgResponseTime: response.data.avg_response_time,
        activeUsers: this.userProfiles.size,
        conceptCacheSize: this.conceptCache.size
      };
    } catch (error) {
      return {
        totalDocuments: 1401,
        totalSearches: 0,
        avgResponseTime: 0,
        activeUsers: this.userProfiles.size,
        conceptCacheSize: this.conceptCache.size
      };
    }
  }
}

// Export singleton instance
export const realSemanticSearchEngine = new RealSemanticSearchEngine();

// Export for direct usage
export default realSemanticSearchEngine;

/**
 * Convenience function to replace mock semantic search
 * Use this in components to transition from mock to real AI
 */
export async function performSemanticSearch(
  text: string,
  language: 'de' | 'en' | 'la' = 'en',
  options?: {
    searchType?: 'semantic' | 'keyword' | 'hybrid';
    maxResults?: number;
    culturalTheme?: string[];
  },
  userId?: string
): Promise<SearchResponse> {
  return realSemanticSearchEngine.search({
    text,
    language,
    searchType: options?.searchType || 'semantic',
    filters: {
      culturalTheme: options?.culturalTheme
    },
    options: {
      maxResults: options?.maxResults || 20
    }
  }, userId);
}

/**
 * Generate embedding for text using real AI
 */
export async function generateEmbedding(text: string, language: 'de' | 'en' | 'la' = 'la'): Promise<number[]> {
  try {
    const response = await MacrobiusAPI.post('/api/search/embedding', {
      text,
      language,
      modelType: 'macrobius-specialized'
    });
    return response.data.embedding || [];
  } catch (error) {
    console.error('Failed to generate embedding:', error);
    return [];
  }
}

/**
 * Analyze query semantics using real NLP
 */
export async function analyzeQuerySemantics(params: {
  query: string;
  language: string;
  userProfile?: any;
  includeExpansion?: boolean;
}): Promise<any> {
  try {
    const response = await MacrobiusAPI.post('/api/search/analyze-query', {
      query: params.query,
      language: params.language,
      userProfile: params.userProfile,
      includeExpansion: params.includeExpansion
    });
    return {
      concepts: response.data.concepts || [],
      intent: response.data.intent || 'search',
      confidence: response.data.confidence || 0.8,
      suggestions: response.data.suggestions || []
    };
  } catch (error) {
    console.error('Failed to analyze query semantics:', error);
    return {
      concepts: [],
      intent: 'search',
      confidence: 0.5,
      suggestions: []
    };
  }
}

/**
 * Expand query using real AI
 */
export async function expandQuery(params: {
  originalQuery: string;
  detectedConcepts?: string[];
  userProfile?: any;
  expansionTypes?: string[];
}): Promise<any> {
  try {
    const response = await MacrobiusAPI.post('/api/search/expand-query', {
      text: params.originalQuery,
      concepts: params.detectedConcepts,
      userProfile: params.userProfile,
      expansionTypes: params.expansionTypes
    });
    return {
      synonyms: response.data.synonyms || [],
      culturalTerms: response.data.cultural_terms || [],
      grammarPatterns: response.data.grammar_patterns || [],
      vocabularyTerms: response.data.vocabulary_terms || [],
      confidence: response.data.confidence || 0.8
    };
  } catch (error) {
    console.error('Failed to expand query:', error);
    return {
      synonyms: [],
      culturalTerms: [],
      grammarPatterns: [],
      vocabularyTerms: [],
      confidence: 0.5
    };
  }
}

/**
 * Filter results using real AI
 */
export async function filterResults(params: {
  results: any[];
  userProfile?: any;
  filterTypes?: string[];
  prioritizePersonalization?: boolean;
}): Promise<any> {
  try {
    const response = await MacrobiusAPI.post('/api/search/filter-results', {
      results: params.results,
      userProfile: params.userProfile,
      filterTypes: params.filterTypes,
      prioritizePersonalization: params.prioritizePersonalization
    });
    return {
      filteredResults: response.data.filtered_results || params.results,
      filtersApplied: response.data.filters_applied || [],
      confidence: response.data.confidence || 0.8
    };
  } catch (error) {
    console.error('Failed to filter results:', error);
    return {
      filteredResults: params.results,
      filtersApplied: [],
      confidence: 0.5
    };
  }
}