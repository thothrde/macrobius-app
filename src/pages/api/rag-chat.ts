// Next.js API route - Proxy for RAG chat requests
// Solves CORS issue between HTTPS frontend and HTTP Oracle Cloud backend

import type { NextApiRequest, NextApiResponse } from 'next';

interface ChatRequest {
  query: string;
}

interface RAGResponse {
  response: string;
  sources: Array<{
    text: string;
    source: string;
    theme: string;
    similarity: number;
  }>;
  query: string;
  timestamp: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ORACLE_CLOUD_IP = '152.70.184.232';
  const RAG_PORT = '8080';
  const RAG_CHAT_URL = `http://${ORACLE_CLOUD_IP}:${RAG_PORT}/api/chat`;

  try {
    // Validate request body
    const { query }: ChatRequest = req.body;
    
    if (!query || typeof query !== 'string' || !query.trim()) {
      return res.status(400).json({ 
        error: 'Missing or invalid query parameter',
        required: 'query (string)'
      });
    }

    console.log(`🤖 Proxying RAG chat request to: ${RAG_CHAT_URL}`);
    console.log(`📝 Query: "${query.substring(0, 100)}${query.length > 100 ? '...' : ''}"`);;
    
    const response = await fetch(RAG_CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: query.trim() }),
      // Longer timeout for AI processing
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    if (!response.ok) {
      throw new Error(`Oracle Cloud RAG response: ${response.status} ${response.statusText}`);
    }

    const data: RAGResponse = await response.json();
    
    // Forward the Oracle Cloud response with proxy metadata
    return res.status(200).json({
      ...data,
      proxy_info: {
        frontend: 'HTTPS Vercel',
        proxy: 'Next.js API Route',
        backend: `HTTP ${ORACLE_CLOUD_IP}:${RAG_PORT}`,
        processing_time: 'Success',
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ RAG chat request failed:', error);
    
    // Provide detailed error information for debugging
    return res.status(503).json({
      error: 'RAG system unavailable',
      message: error instanceof Error ? error.message : 'Unknown error',
      details: {
        target_url: RAG_CHAT_URL,
        likely_causes: [
          'Oracle Cloud RAG system not running',
          'Missing pysqlite3 dependency causing startup failure',
          'Ollama LLM not responding',
          'Vector database (Chroma) not initialized',
          'Port 8080 connection timeout'
        ],
        troubleshooting: [
          'SSH to Oracle Cloud: ssh -i ~/.ssh/ssh-key-2025-02-17.key opc@152.70.184.232',
          'Install dependencies: pip3 install --user pysqlite3-binary',
          'Start RAG system: cd /home/opc/macrobius_rag && python3 free_macrobius_rag.py &',
          'Check process: ps aux | grep python',
          'Test locally: curl http://localhost:8080/api/rag-status'
        ],
        alternative_features: [
          'KI-Kulturanalyse - Advanced cultural analysis',
          'KI-Tutor - Personal learning assistant', 
          'Textsuche - Direct passage search',
          'All working while RAG system is restored'
        ],
        proxy_info: {
          frontend: 'HTTPS Vercel (working)',
          proxy: 'Next.js API Route (working)',
          backend: `HTTP ${ORACLE_CLOUD_IP}:${RAG_PORT} (error)`,
          timestamp: new Date().toISOString()
        }
      }
    });
  }
}