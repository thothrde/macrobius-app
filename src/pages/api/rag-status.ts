import type { NextApiRequest, NextApiResponse } from 'next';

interface StatusResponse {
  status: 'healthy' | 'unhealthy';
  message: string;
  timestamp: string;
  oracle_cloud: {
    endpoint: string;
    port: number;
    status: 'connected' | 'disconnected';
  };
  rag_system: {
    status: 'available' | 'unavailable';
    model: string;
    corpus_size: number;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StatusResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      status: 'unhealthy',
      message: 'Method not allowed',
      timestamp: new Date().toISOString(),
      oracle_cloud: {
        endpoint: '152.70.184.232',
        port: 8080,
        status: 'disconnected'
      },
      rag_system: {
        status: 'unavailable',
        model: 'N/A',
        corpus_size: 0
      }
    });
  }

  try {
    // Try to connect to Oracle Cloud backend
    const oracleEndpoint = process.env.ORACLE_CLOUD_ENDPOINT || 'http://152.70.184.232:8080';
    
    const response = await fetch(`${oracleEndpoint}/api/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    if (response.ok) {
      const data = await response.json();
      
      return res.status(200).json({
        status: 'healthy',
        message: 'RAG system is operational',
        timestamp: new Date().toISOString(),
        oracle_cloud: {
          endpoint: '152.70.184.232',
          port: 8080,
          status: 'connected'
        },
        rag_system: {
          status: 'available',
          model: 'Llama 3.1:8b',
          corpus_size: 1401
        }
      });
    } else {
      throw new Error(`Oracle Cloud responded with status ${response.status}`);
    }
  } catch (error) {
    console.error('Oracle Cloud connection failed:', error);
    
    return res.status(503).json({
      status: 'unhealthy',
      message: 'Oracle Cloud backend unavailable - using fallback mode',
      timestamp: new Date().toISOString(),
      oracle_cloud: {
        endpoint: '152.70.184.232',
        port: 8080,
        status: 'disconnected'
      },
      rag_system: {
        status: 'unavailable',
        model: 'Fallback Mode',
        corpus_size: 1401
      }
    });
  }
}