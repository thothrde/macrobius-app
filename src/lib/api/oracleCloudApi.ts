/**
 * Oracle Cloud API Integration Layer
 * Handles connection to 152.70.184.232:8080 with proper fallbacks
 */

export interface MacrobiusPassage {
  id: number;
  latin_text: string;
  cultural_theme: string;
  work_type: 'Saturnalia' | 'Commentarii';
  book_number: number;
  chapter_number: number;
  section_number: number;
  difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced';
  modern_relevance: string;
  cultural_keywords?: string[];
}

export interface SearchResponse {
  passages: MacrobiusPassage[];
  total_count: number;
  search_time_ms: number;
}

export interface CulturalTheme {
  id: number;
  name: string;
  description: string;
  passage_count: number;
}

export interface ConnectionStatus {
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  lastChecked: Date;
}

class OracleCloudAPI {
  private baseUrl = 'http://152.70.184.232:8080';
  private timeout = 10000; // 10 seconds
  private connectionStatus: ConnectionStatus = {
    isConnected: false,
    isLoading: false,
    error: null,
    lastChecked: new Date()
  };

  /**
   * Test connection to Oracle Cloud backend
   */
  async testConnection(): Promise<boolean> {
    this.connectionStatus.isLoading = true;
    this.connectionStatus.error = null;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);
      
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        this.connectionStatus.isConnected = true;
        this.connectionStatus.error = null;
        console.log('✅ Oracle Cloud connection successful');
        return true;
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error: any) {
      console.error('❌ Oracle Cloud connection failed:', error);
      
      this.connectionStatus.isConnected = false;
      
      if (error.name === 'AbortError') {
        this.connectionStatus.error = 'Connection timeout - Oracle Cloud backend not responding';
      } else if (error.message.includes('NetworkError') || error.message.includes('fetch')) {
        this.connectionStatus.error = 'Network error - Check firewall settings for port 8080';
      } else {
        this.connectionStatus.error = `Connection failed: ${error.message}`;
      }
      
      return false;
    } finally {
      this.connectionStatus.isLoading = false;
      this.connectionStatus.lastChecked = new Date();
    }
  }

  /**
   * Search passages in Oracle Cloud database
   */
  async searchPassages(
    query: string, 
    filters?: {
      work_type?: 'Saturnalia' | 'Commentarii';
      cultural_theme?: string;
      difficulty_level?: 'Beginner' | 'Intermediate' | 'Advanced';
      limit?: number;
      offset?: number;
    }
  ): Promise<SearchResponse> {
    const searchParams = new URLSearchParams({
      q: query,
      limit: (filters?.limit || 10).toString(),
      offset: (filters?.offset || 0).toString()
    });
    
    if (filters?.work_type) searchParams.append('work_type', filters.work_type);
    if (filters?.cultural_theme) searchParams.append('cultural_theme', filters.cultural_theme);
    if (filters?.difficulty_level) searchParams.append('difficulty_level', filters.difficulty_level);
    
    try {
      const startTime = Date.now();
      
      const response = await fetch(`${this.baseUrl}/api/search?${searchParams}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        signal: AbortSignal.timeout(this.timeout)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      const searchTime = Date.now() - startTime;
      
      return {
        passages: data.passages || [],
        total_count: data.total_count || 0,
        search_time_ms: searchTime
      };
      
    } catch (error: any) {
      console.error('Oracle Cloud search error:', error);
      throw new Error(`Search failed: ${error.message}`);
    }
  }

  /**
   * Get cultural themes from Oracle Cloud
   */
  async getCulturalThemes(): Promise<CulturalTheme[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/cultural-themes`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        signal: AbortSignal.timeout(this.timeout)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      return data.themes || [];
      
    } catch (error: any) {
      console.error('Failed to fetch cultural themes:', error);
      // Return fallback themes
      return this.getFallbackThemes();
    }
  }

  /**
   * Get connection status
   */
  getConnectionStatus(): ConnectionStatus {
    return { ...this.connectionStatus };
  }

  /**
   * Fallback cultural themes when Oracle Cloud is not available
   */
  private getFallbackThemes(): CulturalTheme[] {
    return [
      { id: 1, name: 'Philosophie', description: 'Philosophische Diskussionen und Konzepte', passage_count: 156 },
      { id: 2, name: 'Astronomie', description: 'Himmelsmechanik und Kosmologie', passage_count: 134 },
      { id: 3, name: 'Rhetorik', description: 'Redekunst und Sprachstil', passage_count: 189 },
      { id: 4, name: 'Religion', description: 'Religiöse Praktiken und Überzeugungen', passage_count: 167 },
      { id: 5, name: 'Geschichte', description: 'Historische Ereignisse und Personen', passage_count: 145 },
      { id: 6, name: 'Literatur', description: 'Literarische Analyse und Kritik', passage_count: 178 },
      { id: 7, name: 'Recht', description: 'Rechtsprechung und Gesetze', passage_count: 123 },
      { id: 8, name: 'Gesellschaft', description: 'Soziale Strukturen und Bräuche', passage_count: 198 },
      { id: 9, name: 'Naturwissenschaft', description: 'Naturbeobachtung und -erklärung', passage_count: 111 }
    ];
  }
}

// Export singleton instance
export const oracleCloudApi = new OracleCloudAPI();

// React hooks for Oracle Cloud integration
export function useOracleCloudConnection() {
  const [status, setStatus] = React.useState<ConnectionStatus>({
    isConnected: false,
    isLoading: true,
    error: null,
    lastChecked: new Date()
  });

  React.useEffect(() => {
    const testConnection = async () => {
      await oracleCloudApi.testConnection();
      setStatus(oracleCloudApi.getConnectionStatus());
    };
    
    testConnection();
    
    // Test connection every 5 minutes
    const interval = setInterval(testConnection, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return status;
}

// Import React for hooks
import React from 'react';