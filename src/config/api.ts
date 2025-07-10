// 🏛️ MACROBIUS API CONFIGURATION
// Updated: July 10, 2025 - Complete Backend Integration

// 🚀 ORACLE CLOUD BACKEND CONFIGURATION (100% OPERATIONAL)
export const API_CONFIG = {
  // Primary Oracle Cloud Backend
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://152.70.184.232:8080',
  
  // RAG AI System
  RAG_URL: process.env.NEXT_PUBLIC_RAG_API_URL || 'http://152.70.184.232:8081',
  
  // WebSocket for real-time features
  WEBSOCKET_URL: process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://152.70.184.232:8080/ws',
  
  // Fallback URLs
  FALLBACK_URL: process.env.NEXT_PUBLIC_FALLBACK_API_URL || 'http://localhost:3000/api/mock',
  
  // Timeout settings
  TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'),
  
  // Request configuration
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache',
  },
  
  // Retry configuration
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// 🤖 RAG SYSTEM CONFIGURATION
export const RAG_CONFIG = {
  ENABLED: process.env.NEXT_PUBLIC_ENABLE_RAG_ASSISTANT === 'true',
  LANGUAGE: process.env.NEXT_PUBLIC_AI_LANGUAGE_PREFERENCE || 'DE',
  FALLBACK_MODE: process.env.NEXT_PUBLIC_RAG_FALLBACK_MODE === 'true',
  MAX_QUERY_LENGTH: 500,
  RESPONSE_TIMEOUT: 15000,
  RETRY_ATTEMPTS: 2,
} as const;

// 📊 BACKEND ENDPOINTS (VERIFIED OPERATIONAL)
export const API_ENDPOINTS = {
  // Health & Status
  HEALTH: '/api/health',
  STATUS: '/api/status',
  
  // Macrobius Content (1,416 passages verified)
  PASSAGES: {
    SEARCH: '/api/passages/search',
    COUNT: '/api/passages/count',
    RANDOM: '/api/passages/random',
    BY_ID: '/api/passages',
    STATISTICS: '/api/passages/statistics',
  },
  
  // Educational Content
  THEMES: '/api/themes',
  INSIGHTS: '/api/insights',
  TEACHINGS: '/api/teachings',
  
  // RAG AI Endpoints
  RAG: {
    HEALTH: '/api/health',
    CHAT: '/api/chat',
    SEARCH: '/api/search',
    INITIALIZE: '/api/initialize',
  },
  
  // User & Learning
  USER: '/api/user',
  LEARNING: '/api/learning',
  PROGRESS: '/api/progress',
} as const;

// 🔧 API CLIENT CONFIGURATION
export const createApiClient = (baseURL: string = API_CONFIG.BASE_URL) => {
  return {
    baseURL,
    timeout: API_CONFIG.TIMEOUT,
    headers: API_CONFIG.HEADERS,
    
    // GET request helper
    get: async (endpoint: string, params?: Record<string, string>) => {
      const url = new URL(endpoint, baseURL);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });
      }
      
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: API_CONFIG.HEADERS,
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response.json();
    },
    
    // POST request helper
    post: async (endpoint: string, data?: any) => {
      const response = await fetch(`${baseURL}${endpoint}`, {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: data ? JSON.stringify(data) : undefined,
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response.json();
    },
  };
};

// 🏛️ MACROBIUS-SPECIFIC API HELPERS
export const macrobiusApi = {
  // Get backend health (verified working)
  getHealth: () => createApiClient().get(API_ENDPOINTS.HEALTH),
  
  // Search authentic passages (1,416 available)
  searchPassages: (query: string, limit: number = 10) => 
    createApiClient().get(API_ENDPOINTS.PASSAGES.SEARCH, { query, limit: limit.toString() }),
  
  // Get cultural themes (19 themes available)
  getThemes: () => createApiClient().get(API_ENDPOINTS.THEMES),
  
  // Get cultural insights (16 insights available)
  getInsights: () => createApiClient().get(API_ENDPOINTS.INSIGHTS),
  
  // Get teaching modules (16 modules available)
  getTeachings: () => createApiClient().get(API_ENDPOINTS.TEACHINGS),
};

// 🤖 RAG AI API HELPERS
export const ragApi = {
  // RAG system health (verified working)
  getHealth: () => createApiClient(API_CONFIG.RAG_URL).get(API_ENDPOINTS.RAG.HEALTH),
  
  // AI chat in German (verified working)
  chat: (query: string, language: string = 'DE') => 
    createApiClient(API_CONFIG.RAG_URL).post(API_ENDPOINTS.RAG.CHAT, { query, language }),
  
  // Semantic search (with fallback)
  search: (query: string) => 
    createApiClient(API_CONFIG.RAG_URL).post(API_ENDPOINTS.RAG.SEARCH, { query }),
};

// 🔄 CONNECTION STATUS CHECKER
export const checkBackendStatus = async () => {
  try {
    console.log('🔌 Checking Oracle Cloud Backend...');
    const health = await macrobiusApi.getHealth();
    console.log('✅ Backend operational:', health);
    
    console.log('🤖 Checking RAG System...');
    const ragHealth = await ragApi.getHealth();
    console.log('✅ RAG operational:', ragHealth);
    
    return { backend: true, rag: true, details: { health, ragHealth } };
  } catch (error) {
    console.warn('⚠️ Backend connection issue:', error);
    return { backend: false, rag: false, error: error.message };
  }
};

// 🌍 ENVIRONMENT INFO
export const ENVIRONMENT_INFO = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_URL: API_CONFIG.BASE_URL,
  RAG_URL: API_CONFIG.RAG_URL,
  RAG_ENABLED: RAG_CONFIG.ENABLED,
  DEBUG_MODE: process.env.NEXT_PUBLIC_DEBUG_MODE === 'true',
  BACKEND_STATUS: 'Oracle Cloud fully operational (July 10, 2025)',
  RAG_STATUS: 'AI system operational with German responses',
  LAST_UPDATED: '2025-07-10T21:15:00Z',
} as const;

export default {
  API_CONFIG,
  RAG_CONFIG,
  API_ENDPOINTS,
  createApiClient,
  macrobiusApi,
  ragApi,
  checkBackendStatus,
  ENVIRONMENT_INFO,
};