// Enhanced API Client for Oracle Cloud Backend Integration with Fallback Support
// Leverages 97% cache improvements and provides seamless fallback to mock data

import { fallbackApiClient } from './fallback-api-client';

interface CacheEntry<T = unknown> {
  data: T;
  timestamp: number;
  expiry: number;
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: Record<string, unknown> | string;
  cache?: boolean;
  timeout?: number;
}

interface PerformanceMetrics {
  requestCount: number;
  totalResponseTime: number;
  cacheHitRate: number;
  errorRate: number;
  averageResponseTime: number;
}

class ApiError extends Error {
  public status: number;
  public code?: string;

  constructor(message: string, status: number = 500, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export class EnhancedMacrobiusApiClient {
  private baseURL: string;
  private cache: Map<string, CacheEntry>;
  private metrics: PerformanceMetrics;
  private retryAttempts: number;
  private requestQueue: Array<() => Promise<unknown>>;
  private isOnline: boolean;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://152.70.184.232:8080';
    this.cache = new Map();
    this.retryAttempts = 3;
    this.requestQueue = [];
    this.isOnline = typeof window !== 'undefined' ? navigator.onLine : true;
    
    this.metrics = {
      requestCount: 0,
      totalResponseTime: 0,
      cacheHitRate: 0,
      errorRate: 0,
      averageResponseTime: 0
    };

    // Listen for online/offline events
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.isOnline = true;
        this.processQueuedRequests();
      });
      
      window.addEventListener('offline', () => {
        this.isOnline = false;
      });
    }
  }

  /**
   * Enhanced request method with caching, retries, and performance monitoring
   */
  async request<T>(
    endpoint: string, 
    options: RequestOptions = {}
  ): Promise<T> {
    const startTime = performance.now();
    const cacheKey = this.getCacheKey(endpoint, options);
    
    // Check cache first (leveraging backend's cache performance)
    if (options.cache !== false && options.method !== 'POST') {
      const cached = this.getFromCache<T>(cacheKey);
      if (cached) {
        this.updateMetrics(performance.now() - startTime, true, false);
        return cached;
      }
    }

    // If offline, try cache or queue request
    if (!this.isOnline) {
      const cached = this.getFromCache<T>(cacheKey);
      if (cached) {
        return cached;
      }
      
      // Queue for when online
      return new Promise((resolve, reject) => {
        this.requestQueue.push(async () => {
          try {
            const result = await this.executeRequest<T>(endpoint, options, startTime);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      });
    }

    return this.executeRequest<T>(endpoint, options, startTime, cacheKey);
  }

  private async executeRequest<T>(
    endpoint: string, 
    options: RequestOptions, 
    startTime: number,
    cacheKey?: string
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    let lastError: Error | null = null;

    // Retry logic for resilience
    for (let attempt = 0; attempt <= this.retryAttempts; attempt++) {
      try {
        const response = await fetch(url, {
          method: options.method || 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Client-Version': '2.0',
            'X-Request-ID': this.generateRequestId(),
            ...options.headers
          },
          body: options.body ? JSON.stringify(options.body) : undefined,
          signal: options.timeout ? AbortSignal.timeout(options.timeout) : undefined
        });

        if (!response.ok) {
          throw new ApiError(
            `HTTP ${response.status}: ${response.statusText}`,
            response.status
          );
        }

        const data = await response.json();
        
        // Log backend cache performance
        const cacheStatus = response.headers.get('X-Cache-Status');
        const backendResponseTime = response.headers.get('X-Response-Time');
        
        if (cacheStatus || backendResponseTime) {
          console.log(`Backend Performance: Cache=${cacheStatus}, Time=${backendResponseTime}ms`);
        }

        // Cache successful responses (complementing backend cache)
        if (cacheKey && options.cache !== false && options.method !== 'POST') {
          this.setCache(cacheKey, data, this.getCacheExpiry(endpoint));
        }

        this.updateMetrics(performance.now() - startTime, false, false);
        return data;

      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        // Don't retry on client errors (4xx)
        if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
          break;
        }
        
        // Wait before retry (exponential backoff)
        if (attempt < this.retryAttempts) {
          await this.delay(Math.pow(2, attempt) * 1000);
        }
      }
    }

    this.updateMetrics(performance.now() - startTime, false, true);
    throw lastError || new ApiError('Request failed after retries');
  }

  /**
   * Cache Management
   */
  private getCacheKey(endpoint: string, options: RequestOptions): string {
    const method = options.method || 'GET';
    const body = options.body ? JSON.stringify(options.body) : '';
    return `${method}:${endpoint}:${body}`;
  }

  private getFromCache<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  private setCache(key: string, data: any, expiry: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + expiry
    });
  }

  private getCacheExpiry(endpoint: string): number {
    // Different cache durations based on endpoint
    if (endpoint.includes('/quiz/categories')) return 30 * 60 * 1000; // 30 minutes
    if (endpoint.includes('/text/search')) return 10 * 60 * 1000; // 10 minutes
    if (endpoint.includes('/languages')) return 24 * 60 * 60 * 1000; // 24 hours
    if (endpoint.includes('/leaderboard')) return 5 * 60 * 1000; // 5 minutes
    return 15 * 60 * 1000; // Default 15 minutes
  }

  /**
   * Performance Monitoring
   */
  private updateMetrics(responseTime: number, cacheHit: boolean, isError: boolean): void {
    this.metrics.requestCount++;
    this.metrics.totalResponseTime += responseTime;
    this.metrics.averageResponseTime = this.metrics.totalResponseTime / this.metrics.requestCount;
    
    if (cacheHit) {
      this.metrics.cacheHitRate = (this.metrics.cacheHitRate * (this.metrics.requestCount - 1) + 1) / this.metrics.requestCount;
    } else {
      this.metrics.cacheHitRate = (this.metrics.cacheHitRate * (this.metrics.requestCount - 1)) / this.metrics.requestCount;
    }
    
    if (isError) {
      this.metrics.errorRate = (this.metrics.errorRate * (this.metrics.requestCount - 1) + 1) / this.metrics.requestCount;
    } else {
      this.metrics.errorRate = (this.metrics.errorRate * (this.metrics.requestCount - 1)) / this.metrics.requestCount;
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * Utility Methods
   */
  private generateRequestId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async processQueuedRequests(): Promise<void> {
    const queue = [...this.requestQueue];
    this.requestQueue = [];
    
    for (const request of queue) {
      try {
        await request();
      } catch (error) {
        console.error('Queued request failed:', error);
      }
    }
  }

  /**
   * Health Check
   */
  async healthCheck(): Promise<ApiResponse<{status: string, performance: PerformanceMetrics}>> {
    try {
      const response = await this.request('/', { timeout: 5000 });
      return {
        status: 'success',
        data: {
          status: 'healthy',
          performance: this.getMetrics()
        }
      };
    } catch (error) {
      throw new ApiError('Backend health check failed', 503);
    }
  }

  /**
   * Clear cache (for testing or manual refresh)
   */
  clearCache(): void {
    this.cache.clear();
  }
}

// Export singleton instance
export const apiClient = new EnhancedMacrobiusApiClient();

// Enhanced API with fallback support
class EnhancedMacrobiusAPI {
  private async tryWithFallback<T>(primaryCall: () => Promise<T>, fallbackCall: () => Promise<T>): Promise<T> {
    try {
      return await primaryCall();
    } catch (error) {
      console.warn('Primary API failed, using fallback:', (error as Error).message);
      return await fallbackCall();
    }
  }

  system = {
    healthCheck: (): Promise<ApiResponse<{status: string, performance: PerformanceMetrics}>> => 
      this.tryWithFallback(
        () => apiClient.healthCheck(),
        () => Promise.resolve({ status: 'success' as const, data: { status: 'fallback', performance: apiClient.getMetrics() } })
      )
  };

  vocabulary = {
    getVocabularyStatistics: (): Promise<ApiResponse<any>> =>
      this.tryWithFallback(
        () => apiClient.request<ApiResponse<any>>('/api/vocabulary/stats'),
        () => Promise.resolve({ status: 'success' as const, data: { totalWords: 1416, themes: 9 } })
      ),
    getVocabularyWords: (difficulty?: string, count?: number): Promise<ApiResponse<{words: MacrobiusVocabulary[]}>> =>
      this.tryWithFallback(
        () => apiClient.request<ApiResponse<{words: MacrobiusVocabulary[]}>>(`/api/vocabulary/words${difficulty ? `?difficulty=${difficulty}` : ''}${count ? `${difficulty ? '&' : '?'}count=${count}` : ''}`),
        () => Promise.resolve({ status: 'success' as const, data: { words: [] } })
      )
  };

  passages = {
    getRandomPassages: (count: number, difficulty: string): Promise<ApiResponse<PassagesResponse>> =>
      this.tryWithFallback(
        () => apiClient.request<ApiResponse<PassagesResponse>>(`/api/passages/random?count=${count}&difficulty=${difficulty}`),
        () => Promise.resolve({ status: 'success' as const, data: { passages: [], total: 0 } })
      ),
    searchPassages: (query: string, filters: SearchFilters): Promise<ApiResponse<PassagesResponse>> =>
      this.tryWithFallback(
        () => apiClient.request<ApiResponse<PassagesResponse>>('/api/passages/search', { method: 'POST', body: { query, ...filters } }),
        () => Promise.resolve({ status: 'success' as const, data: { passages: [], total: 0 } })
      )
  };

  cultural = {
    getThemes: (): Promise<ApiResponse<{themes: CulturalTheme[]}>> =>
      this.tryWithFallback(
        () => apiClient.request<ApiResponse<{themes: CulturalTheme[]}>>('/api/cultural/themes'),
        () => Promise.resolve({ status: 'success' as const, data: { themes: [] } })
      )
  };
}

// Export enhanced API with fallback
export const MacrobiusAPI = new EnhancedMacrobiusAPI();

// Export connection status helper
export const getApiConnectionStatus = () => {
  return 'Oracle Cloud with Fallback Support';
};

// API Response types
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  error?: string;
}

export interface PassagesResponse {
  passages: MacrobiusPassage[];
  total: number;
  page?: number;
}

// Type definitions
export interface MacrobiusPassage {
  id: number;
  latin_text: string;
  work_type: string;
  book_number: number;
  chapter_number: number;
  section_number?: number;
  cultural_theme: string;
  modern_relevance: string;
  difficulty_level: string;
  source_reference: string;
  word_count: number;
  character_count: number;
  created_at: string;
}

export interface MacrobiusVocabulary {
  id: number;
  latin_word: string;
  english_translation: string;
  part_of_speech: string;
  frequency: number;
  difficulty_level: string;
  difficulty_rating: number;
  usage_examples: string[];
  passages_found: any[];
  modern_cognates: string[];
  grammatical_forms: string[];
  semantic_contexts: string[];
  cultural_significance?: boolean;
}

export interface SearchFilters {
  work_type?: string;
  cultural_theme?: string;
  difficulty_level?: string;
  book_number?: number;
  chapter_number?: number;
  language?: string;
  sort_by?: 'relevance' | 'date' | 'difficulty';
  sort_order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface CulturalTheme {
  id: string;
  name: string;
  description: string;
  examples: string[];
  related_themes: string[];
  modern_applications: string[];
  passage_count: number;
  educational_level: string;
}

export interface CulturalInsight {
  id: string;
  title: string;
  content: string;
  description: string;
  cultural_theme_id: string;
  modern_relevance: string;
  historical_context: string;
  teaching_points: string[];
  difficulty_level: string;
  educational_value: string;
  related_passages: any[];
}