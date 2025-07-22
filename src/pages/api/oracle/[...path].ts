// 🔧 ORACLE CLOUD PROXY API ROUTE - CORS & Mixed Content Fix
// This Next.js API route proxies requests to Oracle Cloud to bypass CORS issues
// when deploying on HTTPS (Vercel) and connecting to HTTP Oracle Cloud backend

import type { NextApiRequest, NextApiResponse } from 'next';

// 🔧 Oracle Cloud Configuration
const ORACLE_CLOUD_BASE_URL = process.env.ORACLE_CLOUD_URL || 'http://152.70.184.232:8080';
const RAG_PORT = process.env.NEXT_PUBLIC_RAG_PORT || '8080';

// 🔧 CORS Headers Configuration
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Version, X-Request-ID, X-Proxy-Target, X-RAG-Port',
  'Access-Control-Max-Age': '86400',
};

// 🔧 Enhanced Error Handling
class ProxyError extends Error {
  constructor(message: string, public status: number = 500, public code?: string) {
    super(message);
    this.name = 'ProxyError';
  }
}

// 🔧 Request Timeout Configuration
const REQUEST_TIMEOUT = 25000; // 25 seconds

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path } = req.query;
  const method = req.method || 'GET';
  
  // 🔧 Handle CORS preflight requests
  if (method === 'OPTIONS') {
    res.status(200);
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    return res.end();
  }
  
  // 🔧 Set CORS headers for all requests
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
  
  try {
    // 🔧 Construct Oracle Cloud URL
    const pathArray = Array.isArray(path) ? path : [path];
    const targetPath = pathArray.join('/');
    
    // 🔧 Smart URL construction based on request type
    let targetUrl: string;
    
    if (targetPath.includes('rag')) {
      // RAG requests - unified on port specified in headers or default
      const ragPort = req.headers['x-rag-port'] || RAG_PORT;
      const baseUrl = ORACLE_CLOUD_BASE_URL.replace(':8080', `:${ragPort}`);
      targetUrl = `${baseUrl}/api/${targetPath}`;
    } else {
      // Standard API requests
      targetUrl = `${ORACLE_CLOUD_BASE_URL}/api/${targetPath}`;
    }
    
    console.log(`🔄 Oracle Proxy: ${method} ${targetUrl}`);
    
    // 🔧 Enhanced Headers for Oracle Cloud
    const proxyHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'Macrobius-Proxy/2.1',
      'X-Forwarded-For': req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown',
      'X-Forwarded-Proto': req.headers['x-forwarded-proto'] || 'https',
      'X-Original-Host': req.headers.host || 'unknown',
    };
    
    // Forward specific headers from the original request
    const headersToForward = [
      'authorization',
      'x-client-version', 
      'x-request-id',
      'x-user-id',
      'accept-language'
    ];
    
    headersToForward.forEach(header => {
      if (req.headers[header]) {
        proxyHeaders[header] = req.headers[header] as string;
      }
    });
    
    // 🔧 Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
    
    try {
      // 🔧 Make request to Oracle Cloud
      const response = await fetch(targetUrl, {
        method,
        headers: proxyHeaders,
        body: ['GET', 'HEAD'].includes(method) ? undefined : JSON.stringify(req.body),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      // 🔧 Handle different response types
      const contentType = response.headers.get('content-type') || '';
      
      if (contentType.includes('application/json')) {
        const data = await response.json();
        
        // 🔧 Add proxy metadata to successful responses
        const responseData = {
          ...data,
          _proxy: {
            via: 'next-api',
            target: targetUrl,
            status: response.status,
            timestamp: new Date().toISOString()
          }
        };
        
        res.status(response.status).json(responseData);
      } else {
        // Handle non-JSON responses (text, binary, etc.)
        const text = await response.text();
        res.status(response.status).send(text);
      }
      
    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (controller.signal.aborted) {
        throw new ProxyError('Oracle Cloud request timeout', 504, 'TIMEOUT');
      }
      
      if (fetchError instanceof Error) {
        if (fetchError.message.includes('ECONNREFUSED')) {
          throw new ProxyError('Oracle Cloud server refused connection', 503, 'CONNECTION_REFUSED');
        }
        if (fetchError.message.includes('ENOTFOUND')) {
          throw new ProxyError('Oracle Cloud server not found', 503, 'SERVER_NOT_FOUND');
        }
        if (fetchError.message.includes('ETIMEDOUT')) {
          throw new ProxyError('Oracle Cloud server timeout', 504, 'SERVER_TIMEOUT');
        }
      }
      
      throw new ProxyError(
        `Oracle Cloud proxy error: ${fetchError instanceof Error ? fetchError.message : 'Unknown error'}`,
        502,
        'PROXY_ERROR'
      );
    }
    
  } catch (error) {
    console.error('🚨 Oracle Proxy Error:', error);
    
    if (error instanceof ProxyError) {
      res.status(error.status).json({
        error: error.message,
        code: error.code,
        status: 'error',
        fallback: true,
        timestamp: new Date().toISOString(),
        _proxy: {
          via: 'next-api',
          error: true,
          target: `${ORACLE_CLOUD_BASE_URL}/api/${Array.isArray(path) ? path.join('/') : path}`
        }
      });
    } else {
      res.status(500).json({
        error: 'Internal proxy error',
        code: 'INTERNAL_ERROR',
        status: 'error',
        fallback: true,
        timestamp: new Date().toISOString()
      });
    }
  }
}

// 🔧 Configuration for Next.js API routes
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
    responseLimit: '10mb',
  },
};