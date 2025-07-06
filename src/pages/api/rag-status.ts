// Next.js API route - Proxy for RAG status check
// Solves CORS issue between HTTPS frontend and HTTP Oracle Cloud backend

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ORACLE_CLOUD_IP = '152.70.184.232';
  const RAG_PORT = '8081';
  const RAG_STATUS_URL = `http://${ORACLE_CLOUD_IP}:${RAG_PORT}/api/rag-status`;

  try {
    console.log(`🔍 Checking RAG status at: ${RAG_STATUS_URL}`);
    
    const response = await fetch(RAG_STATUS_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add timeout for faster failure detection
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    if (!response.ok) {
      throw new Error(`Oracle Cloud RAG response: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Forward the Oracle Cloud response
    return res.status(200).json({
      status: 'connected',
      oracle_cloud: data,
      proxy_info: {
        frontend: 'HTTPS Vercel',
        proxy: 'Next.js API Route',
        backend: `HTTP ${ORACLE_CLOUD_IP}:${RAG_PORT}`,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ RAG status check failed:', error);
    
    // Provide detailed error information for debugging
    return res.status(503).json({
      status: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
      details: {
        target_url: RAG_STATUS_URL,
        likely_causes: [
          'Oracle Cloud RAG system not running (python3 free_macrobius_rag.py)',
          'Missing dependencies (pysqlite3, chromadb, ollama)',
          'Port 8081 not accessible',
          'Firewall blocking connection'
        ],
        proxy_info: {
          frontend: 'HTTPS Vercel',
          proxy: 'Next.js API Route (working)',
          backend: `HTTP ${ORACLE_CLOUD_IP}:${RAG_PORT} (error)`,
          timestamp: new Date().toISOString()
        }
      }
    });
  }
}