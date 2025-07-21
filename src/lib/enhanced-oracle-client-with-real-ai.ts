// 🔧 ENHANCED ORACLE CLIENT WITH REAL AI FALLBACK
// Integrates client-side AI when backend is unavailable

import { realAI, type AIResponse } from './client-side-ai-engine';
import { robustOracleClient, oracleAPI as baseOracleAPI, type ConnectionStatus, type ApiResponse } from './robust-oracle-client';

/**
 * 🚀 ENHANCED API CLIENT WITH REAL AI INTEGRATION
 * Provides seamless fallback to client-side AI when Oracle Cloud is unavailable
 */
class EnhancedOracleClient {
  private backendAvailable: boolean = false;

  constructor() {
    // Monitor backend availability
    this.monitorBackendStatus();
  }

  private async monitorBackendStatus(): Promise<void> {
    // Check if backend is available
    const status = baseOracleAPI.getConnectionStatus();
    this.backendAvailable = status.oracle === 'connected';
    
    // Update every 2 minutes
    setInterval(() => {
      const currentStatus = baseOracleAPI.getConnectionStatus();
      this.backendAvailable = currentStatus.oracle === 'connected';
    }, 120000);
  }

  /**
   * 🧠 ENHANCED CULTURAL ANALYSIS
   * Uses Oracle Cloud when available, client-side AI as fallback
   */
  public async analyzeCulture(text: string, language: 'de' | 'en' | 'la' = 'de'): Promise<ApiResponse> {
    try {
      // Try Oracle Cloud first if available
      if (this.backendAvailable) {
        console.log('🔄 Attempting Oracle Cloud cultural analysis...');
        const backendResponse = await baseOracleAPI.cultural.analyze(text, { language });
        if (backendResponse.status === 'success' && !backendResponse.fallback) {
          console.log('✅ Oracle Cloud cultural analysis successful');
          return backendResponse;
        }
      }
      
      // Use client-side AI
      console.log('🤖 Using client-side AI for cultural analysis...');
      const aiResponse = await realAI.analyzeCulture(text, language);
      
      if (aiResponse.success) {
        return {
          status: 'success',
          data: aiResponse.data,
          message: 'Analysis completed using client-side AI'
        };
      } else {
        throw new Error('Client-side AI analysis failed');
      }
      
    } catch (error) {
      console.error('❌ Cultural analysis failed:', error);
      return {
        status: 'error',
        error: 'Cultural analysis unavailable',
        message: 'Both Oracle Cloud and client-side AI analysis failed'
      };
    }
  }

  /**
   * 🎯 ENHANCED RAG SYSTEM
   * Uses Oracle Cloud RAG when available, client-side RAG as fallback
   */
  public async ragQuery(query: string, language: 'de' | 'en' | 'la' = 'de'): Promise<ApiResponse> {
    try {
      // Try Oracle Cloud RAG first if available
      if (this.backendAvailable) {
        console.log('🔄 Attempting Oracle Cloud RAG query...');
        const backendResponse = await baseOracleAPI.rag.query(query, { language });
        if (backendResponse.status === 'success' && !backendResponse.fallback) {
          console.log('✅ Oracle Cloud RAG query successful');
          return backendResponse;
        }
      }
      
      // Use client-side RAG
      console.log('🤖 Using client-side RAG system...');
      const aiResponse = await realAI.ragQuery(query, language);
      
      if (aiResponse.success) {
        return {
          status: 'success',
          data: aiResponse.data,
          message: 'RAG query processed using client-side AI'
        };
      } else {
        throw new Error('Client-side RAG query failed');
      }
      
    } catch (error) {
      console.error('❌ RAG query failed:', error);
      return {
        status: 'error',
        error: 'RAG system unavailable',
        message: 'Both Oracle Cloud and client-side RAG failed'
      };
    }
  }

  /**
   * 👨‍🏫 ENHANCED AI TUTORING
   * Uses Oracle Cloud tutoring when available, client-side AI as fallback
   */
  public async generateTutoringResponse(userInput: string, sessionContext: any, language: 'de' | 'en' | 'la' = 'de'): Promise<ApiResponse> {
    try {
      // Try Oracle Cloud tutoring first if available
      if (this.backendAvailable) {
        console.log('🔄 Attempting Oracle Cloud AI tutoring...');
        const backendResponse = await baseOracleAPI.tutoring.sendMessage('session-' + Date.now(), userInput);
        if (backendResponse.status === 'success' && !backendResponse.fallback) {
          console.log('✅ Oracle Cloud AI tutoring successful');
          return backendResponse;
        }
      }
      
      // Use client-side AI tutoring
      console.log('🤖 Using client-side AI tutoring...');
      const aiResponse = await realAI.generateTutoringResponse(userInput, sessionContext, language);
      
      if (aiResponse.success) {
        return {
          status: 'success',
          data: aiResponse.data,
          message: 'Tutoring response generated using client-side AI'
        };
      } else {
        throw new Error('Client-side AI tutoring failed');
      }
      
    } catch (error) {
      console.error('❌ AI tutoring failed:', error);
      return {
        status: 'error',
        error: 'AI tutoring unavailable',
        message: 'Both Oracle Cloud and client-side AI tutoring failed'
      };
    }
  }

  /**
   * 📚 ENHANCED PASSAGE SEARCH
   * Uses Oracle Cloud when available, intelligent client-side search as fallback
   */
  public async searchPassages(query: string, filters?: any, language: 'de' | 'en' | 'la' = 'de'): Promise<ApiResponse> {
    try {
      // Try Oracle Cloud search first if available
      if (this.backendAvailable) {
        console.log('🔄 Attempting Oracle Cloud passage search...');
        const backendResponse = await baseOracleAPI.passages.search(query, filters);
        if (backendResponse.status === 'success' && !backendResponse.fallback) {
          console.log('✅ Oracle Cloud passage search successful');
          return backendResponse;
        }
      }
      
      // Use client-side intelligent search via RAG
      console.log('🤖 Using client-side intelligent search...');
      const ragResponse = await realAI.ragQuery(`Find passages about: ${query}`, language);
      
      if (ragResponse.success && ragResponse.data.sources) {
        // Transform RAG sources into passage search format
        const passages = ragResponse.data.sources.map((source: any, index: number) => ({
          id: index + 1,
          latin_text: source.passage,
          work_type: source.work,
          book_number: source.book,
          chapter_number: source.chapter,
          relevance_score: source.relevance,
          cultural_context: 'Generated by client-side AI analysis',
          modern_relevance: 'Connected to contemporary educational contexts'
        }));
        
        return {
          status: 'success',
          data: {
            passages,
            total: passages.length,
            query: query,
            search_method: 'client-side AI semantic search'
          },
          message: 'Passage search completed using client-side AI'
        };
      } else {
        throw new Error('Client-side search failed');
      }
      
    } catch (error) {
      console.error('❌ Passage search failed:', error);
      return {
        status: 'error',
        error: 'Passage search unavailable',
        message: 'Both Oracle Cloud and client-side search failed'
      };
    }
  }

  /**
   * 🧩 ENHANCED QUIZ GENERATION
   * Uses Oracle Cloud when available, client-side generation as fallback
   */
  public async generateQuiz(options: any, language: 'de' | 'en' | 'la' = 'de'): Promise<ApiResponse> {
    try {
      // Try Oracle Cloud quiz generation first if available
      if (this.backendAvailable) {
        console.log('🔄 Attempting Oracle Cloud quiz generation...');
        const backendResponse = await baseOracleAPI.quiz.generate(options);
        if (backendResponse.status === 'success' && !backendResponse.fallback) {
          console.log('✅ Oracle Cloud quiz generation successful');
          return backendResponse;
        }
      }
      
      // Use client-side quiz generation
      console.log('🤖 Using client-side quiz generation...');
      
      // Generate quiz using cultural analysis capabilities
      const topic = options.topic || 'Roman culture';
      const difficulty = options.difficulty || 'intermediate';
      
      const analysisResponse = await realAI.analyzeCulture(topic, language);
      
      if (analysisResponse.success) {
        const themes = analysisResponse.data.themes || [];
        
        const questions = this.generateQuestionsFromThemes(themes, difficulty, language);
        
        return {
          status: 'success',
          data: {
            questions,
            total_questions: questions.length,
            difficulty,
            topic,
            generation_method: 'client-side AI'
          },
          message: 'Quiz generated using client-side AI'
        };
      } else {
        throw new Error('Client-side quiz generation failed');
      }
      
    } catch (error) {
      console.error('❌ Quiz generation failed:', error);
      return {
        status: 'error',
        error: 'Quiz generation unavailable',
        message: 'Both Oracle Cloud and client-side quiz generation failed'
      };
    }
  }

  // Helper method for quiz generation
  private generateQuestionsFromThemes(themes: any[], difficulty: string, language: 'de' | 'en' | 'la'): any[] {
    const questions: any[] = [];
    
    themes.slice(0, 3).forEach((theme, index) => {
      const questionTemplates = {
        'de': {
          question: `Was charakterisiert ${theme.name} in der römischen Kultur?`,
          options: [
            theme.description,
            'Eine moderne Erfindung ohne antike Wurzeln',
            'Ausschließlich griechischen Ursprungs',
            'Nur in der Kaiserzeit relevant'
          ],
          correct_answer: 0,
          explanation: `${theme.name} war ein wichtiger Aspekt der römischen Kultur: ${theme.description}`
        },
        'en': {
          question: `What characterizes ${theme.name} in Roman culture?`,
          options: [
            theme.description,
            'A modern invention without ancient roots',
            'Exclusively of Greek origin',
            'Only relevant in the Imperial period'
          ],
          correct_answer: 0,
          explanation: `${theme.name} was an important aspect of Roman culture: ${theme.description}`
        },
        'la': {
          question: `Quid ${theme.name} in cultura Romana significat?`,
          options: [
            theme.description,
            'Inventum modernum sine radicibus antiquis',
            'Solummodo originis Graecae',
            'Tantum aetate Imperiali relevans'
          ],
          correct_answer: 0,
          explanation: `${theme.name} erat aspectus important culturae Romanae: ${theme.description}`
        }
      };
      
      const template = questionTemplates[language] || questionTemplates['de'];
      
      questions.push({
        id: index + 1,
        type: 'multiple_choice',
        ...template,
        difficulty,
        theme: theme.name,
        confidence: theme.confidence
      });
    });
    
    return questions;
  }

  /**
   * 📊 CONNECTION STATUS
   */
  public getConnectionStatus(): ConnectionStatus & { clientAI: 'available' | 'unavailable' } {
    const baseStatus = baseOracleAPI.getConnectionStatus();
    return {
      ...baseStatus,
      clientAI: realAI.isAvailable() ? 'available' : 'unavailable'
    };
  }

  /**
   * 🔄 ENHANCED RECONNECTION
   */
  public async reconnect(): Promise<void> {
    console.log('🔄 Attempting enhanced reconnection...');
    await baseOracleAPI.reconnect();
    await this.monitorBackendStatus();
  }

  // Pass through other methods
  public healthCheck = () => baseOracleAPI.healthCheck();
  public isInFallbackMode = () => baseOracleAPI.isInFallbackMode();
  public hasCorsIssues = () => baseOracleAPI.hasCorsIssues();
}

// Export enhanced client
export const enhancedOracleClient = new EnhancedOracleClient();

// Export enhanced API with real AI integration
export const enhancedOracleAPI = {
  // Connection Management
  getConnectionStatus: () => enhancedOracleClient.getConnectionStatus(),
  isInFallbackMode: () => enhancedOracleClient.isInFallbackMode(),
  hasCorsIssues: () => enhancedOracleClient.hasCorsIssues(),
  reconnect: () => enhancedOracleClient.reconnect(),
  
  // Health Check
  healthCheck: () => enhancedOracleClient.healthCheck(),
  
  // Enhanced AI Features
  cultural: {
    analyze: (text: string, language: 'de' | 'en' | 'la' = 'de') => 
      enhancedOracleClient.analyzeCulture(text, language)
  },
  
  rag: {
    query: (query: string, language: 'de' | 'en' | 'la' = 'de') => 
      enhancedOracleClient.ragQuery(query, language)
  },
  
  tutoring: {
    generateResponse: (input: string, context: any, language: 'de' | 'en' | 'la' = 'de') => 
      enhancedOracleClient.generateTutoringResponse(input, context, language)
  },
  
  passages: {
    search: (query: string, filters?: any, language: 'de' | 'en' | 'la' = 'de') => 
      enhancedOracleClient.searchPassages(query, filters, language)
  },
  
  quiz: {
    generate: (options: any, language: 'de' | 'en' | 'la' = 'de') => 
      enhancedOracleClient.generateQuiz(options, language)
  },
  
  // Direct access to client-side AI
  clientAI: realAI
};

export type { ConnectionStatus, ApiResponse };