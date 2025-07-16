/**
 * Enhanced Macrobius API Client with Oracle Cloud Integration
 * Handles communication with Oracle Cloud Free Tier backend
 */

export interface MacrobiusPassage {
  id: string;
  text: string;
  source: string;
  book: number;
  chapter: number;
  section?: number;
  work: string;
  cultural_theme: string;
  modern_relevance: string;
  word_count: number;
  character_count: number;
  difficulty_level: number;
  created_at: string;
}

export interface MacrobiusVocabulary {
  id: string;
  word: string;
  latin_form: string;
  translation_de: string;
  translation_en: string;
  translation_la: string;
  grammatical_info: string;
  cultural_context: string;
  frequency: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  cultural_theme: string;
  passage_references: string[];
  etymology: string;
  usage_examples: string[];
  semantic_field: string;
  ai_insights: {
    learning_priority: number;
    memory_techniques: string[];
    cultural_importance: number;
    cross_references: string[];
  };
  created_at: string;
}

export interface SearchFilters {
  cultural_themes?: string[];
  difficulty_range?: [number, number];
  work_type?: 'Saturnalia' | 'Commentarii';
  word_count_range?: [number, number];
  search_type?: 'semantic' | 'keyword' | 'fuzzy';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  passage_source: string;
  cultural_theme: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface APIResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  timestamp: string;
}

class MacrobiusAPIClient {
  private baseURL: string;
  
  constructor() {
    this.baseURL = process.env.ORACLE_BACKEND_URL || 'http://152.70.184.232:8080';
  }
  
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<APIResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        status: 'success',
        data,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }
  
  // Health check
  async healthCheck(): Promise<APIResponse<{status: string}>> {
    return this.request('/api/health');
  }
  
  // Text search and retrieval
  async searchPassages(
    query: string, 
    filters?: SearchFilters,
    limit: number = 10
  ): Promise<APIResponse<MacrobiusPassage[]>> {
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString(),
      ...(filters && Object.fromEntries(
        Object.entries(filters).map(([k, v]) => [k, JSON.stringify(v)])
      ))
    });
    
    return this.request(`/api/search?${params}`);
  }
  
  async getPassage(id: string): Promise<APIResponse<MacrobiusPassage>> {
    return this.request(`/api/passages/${id}`);
  }
  
  async getRandomPassage(theme?: string): Promise<APIResponse<MacrobiusPassage>> {
    const params = theme ? `?theme=${encodeURIComponent(theme)}` : '';
    return this.request(`/api/passages/random${params}`);
  }
  
  // Cultural themes
  async getCulturalThemes(): Promise<APIResponse<string[]>> {
    return this.request('/api/cultural-themes');
  }
  
  async getThemeInsights(theme: string): Promise<APIResponse<any>> {
    return this.request(`/api/cultural-themes/${encodeURIComponent(theme)}/insights`);
  }
  
  // Quiz generation
  async generateQuiz(
    theme: string,
    difficulty: 'easy' | 'medium' | 'hard',
    count: number = 5
  ): Promise<APIResponse<QuizQuestion[]>> {
    return this.request('/api/quiz/generate', {
      method: 'POST',
      body: JSON.stringify({ theme, difficulty, count })
    });
  }
  
  async generateCulturalQuiz(
    themes: string[],
    difficulty: string,
    count: number = 10
  ): Promise<APIResponse<QuizQuestion[]>> {
    return this.request('/api/quiz/cultural', {
      method: 'POST',
      body: JSON.stringify({ themes, difficulty, count })
    });
  }
  
  // Vocabulary endpoints
  async getVocabulary(
    level?: string,
    theme?: string,
    limit?: number
  ): Promise<APIResponse<MacrobiusVocabulary[]>> {
    const params = new URLSearchParams();
    if (level) params.append('level', level);
    if (theme) params.append('theme', theme);
    if (limit) params.append('limit', limit.toString());
    
    return this.request(`/api/vocabulary?${params}`);
  }
  
  async analyzeFullCorpus(options: any): Promise<APIResponse<any>> {
    return this.request('/api/vocabulary/analyze-corpus', {
      method: 'POST',
      body: JSON.stringify(options)
    });
  }
  
  async extractVocabulary(options: any): Promise<APIResponse<any>> {
    return this.request('/api/vocabulary/extract', {
      method: 'POST',
      body: JSON.stringify(options)
    });
  }
  
  async saveCorpusAnalysis(analysis: any): Promise<APIResponse<any>> {
    return this.request('/api/vocabulary/save-analysis', {
      method: 'POST',
      body: JSON.stringify(analysis)
    });
  }
  
  async getStoredCorpusAnalysis(): Promise<APIResponse<any>> {
    return this.request('/api/vocabulary/stored-analysis');
  }
  
  // Analytics endpoints
  async getCorpusAnalytics(): Promise<APIResponse<any>> {
    return this.request('/api/analytics/corpus');
  }
  
  async getUserAnalytics(userId: string): Promise<APIResponse<any>> {
    return this.request(`/api/analytics/user/${userId}`);
  }
  
  // Grammar exercises
  async getGrammarExercises(
    pattern?: string,
    difficulty?: string
  ): Promise<APIResponse<any[]>> {
    const params = new URLSearchParams();
    if (pattern) params.append('pattern', pattern);
    if (difficulty) params.append('difficulty', difficulty);
    
    return this.request(`/api/grammar/exercises?${params}`);
  }
  
  // AI endpoints
  async generateVocabularyInsights(options: any): Promise<APIResponse<any>> {
    return this.request('/api/ai/vocabulary-insights', {
      method: 'POST',
      body: JSON.stringify(options)
    });
  }
  
  async generatePersonalizedRecommendations(options: any): Promise<APIResponse<any>> {
    return this.request('/api/ai/recommendations', {
      method: 'POST',
      body: JSON.stringify(options)
    });
  }
  
  async createPersonalizedSet(options: any): Promise<APIResponse<any>> {
    return this.request('/api/ai/create-set', {
      method: 'POST',
      body: JSON.stringify(options)
    });
  }
  
  async optimizeUserExperience(options: any): Promise<APIResponse<any>> {
    return this.request('/api/ai/optimize-experience', {
      method: 'POST',
      body: JSON.stringify(options)
    });
  }
  
  // SRS endpoints
  async processReview(options: any): Promise<APIResponse<any>> {
    return this.request('/api/srs/process-review', {
      method: 'POST',
      body: JSON.stringify(options)
    });
  }
  
  async getUserSRSData(userId: string): Promise<APIResponse<any>> {
    return this.request(`/api/srs/user/${userId}`);
  }
  
  async optimizeVocabularyOrder(options: any): Promise<APIResponse<any>> {
    return this.request('/api/srs/optimize-order', {
      method: 'POST',
      body: JSON.stringify(options)
    });
  }
  
  // System endpoints
  async systemHealthCheck(): Promise<APIResponse<any>> {
    return this.request('/api/system/health');
  }
}

// Individual service objects for better organization
export const MacrobiusAPI = {
  // Core client
  client: new MacrobiusAPIClient(),
  
  // Text services
  text: {
    search: (query: string, filters?: SearchFilters, limit?: number) => 
      new MacrobiusAPIClient().searchPassages(query, filters, limit),
    getPassage: (id: string) => new MacrobiusAPIClient().getPassage(id),
    getRandom: (theme?: string) => new MacrobiusAPIClient().getRandomPassage(theme)
  },
  
  // Cultural services
  culture: {
    getThemes: () => new MacrobiusAPIClient().getCulturalThemes(),
    getInsights: (theme: string) => new MacrobiusAPIClient().getThemeInsights(theme)
  },
  
  // Quiz services
  quiz: {
    generate: (theme: string, difficulty: 'easy' | 'medium' | 'hard', count?: number) => 
      new MacrobiusAPIClient().generateQuiz(theme, difficulty, count),
    generateCultural: (themes: string[], difficulty: string, count?: number) =>
      new MacrobiusAPIClient().generateCulturalQuiz(themes, difficulty, count)
  },
  
  // Vocabulary services
  vocabulary: {
    get: (level?: string, theme?: string, limit?: number) => 
      new MacrobiusAPIClient().getVocabulary(level, theme, limit),
    analyzeFullCorpus: (options: any) => new MacrobiusAPIClient().analyzeFullCorpus(options),
    extractVocabulary: (options: any) => new MacrobiusAPIClient().extractVocabulary(options),
    saveCorpusAnalysis: (analysis: any) => new MacrobiusAPIClient().saveCorpusAnalysis(analysis),
    getStoredCorpusAnalysis: () => new MacrobiusAPIClient().getStoredCorpusAnalysis()
  },
  
  // Analytics services
  analytics: {
    corpus: () => new MacrobiusAPIClient().getCorpusAnalytics(),
    user: (userId: string) => new MacrobiusAPIClient().getUserAnalytics(userId)
  },
  
  // Grammar services
  grammar: {
    getExercises: (pattern?: string, difficulty?: string) => 
      new MacrobiusAPIClient().getGrammarExercises(pattern, difficulty)
  },
  
  // AI services
  ai: {
    generateVocabularyInsights: (options: any) => new MacrobiusAPIClient().generateVocabularyInsights(options),
    generatePersonalizedRecommendations: (options: any) => new MacrobiusAPIClient().generatePersonalizedRecommendations(options),
    createPersonalizedSet: (options: any) => new MacrobiusAPIClient().createPersonalizedSet(options),
    optimizeUserExperience: (options: any) => new MacrobiusAPIClient().optimizeUserExperience(options)
  },
  
  // SRS services
  srs: {
    processReview: (options: any) => new MacrobiusAPIClient().processReview(options),
    getUserSRSData: (userId: string) => new MacrobiusAPIClient().getUserSRSData(userId),
    optimizeVocabularyOrder: (options: any) => new MacrobiusAPIClient().optimizeVocabularyOrder(options)
  },
  
  // System services
  system: {
    healthCheck: () => new MacrobiusAPIClient().systemHealthCheck()
  },
  
  // Health check
  health: () => new MacrobiusAPIClient().healthCheck()
};

export default MacrobiusAPI;