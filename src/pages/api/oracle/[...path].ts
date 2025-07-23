import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingMessage } from 'http';

// 🎯 CRITICAL BUILD FIX: Proper header type handling + fetch timeout fix for Vercel deployment
// ✅ FIXED: TypeScript error with string | string[] header types
// ✅ FIXED: fetch timeout using AbortController (standard approach)
// ✅ ENHANCED: Safe header extraction with proper type checking
// ✅ MAINTAINED: All Oracle Cloud proxy functionality and CORS handling

/**
 * Enhanced Oracle Cloud API Proxy with Type-Safe Header Handling
 * 
 * Features:
 * - ✅ Type-safe header extraction (fixes Vercel build error)
 * - ✅ Proper fetch timeout implementation with AbortController
 * - ✅ Complete CORS support for browser requests
 * - ✅ Smart request forwarding with proper headers
 * - ✅ Error handling with detailed logging
 * - ✅ Support for all HTTP methods
 * - ✅ Real-time connection monitoring
 */

const ORACLE_BASE_URL = 'http://152.70.184.232:8080';
const ALLOWED_ORIGINS = [
  'https://macrobius-app.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001'
];

// 🔧 CRITICAL FIX: Safe header extraction to handle string | string[] types
const extractHeaderValue = (value: string | string[] | undefined): string => {
  if (!value) return 'unknown';
  if (Array.isArray(value)) return value[0] || 'unknown';
  return value;
};

// 🔧 Enhanced timeout implementation using AbortController
const fetchWithTimeout = async (url: string, options: RequestInit, timeoutMs: number = 30000): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

// 🔧 Enhanced CORS configuration
const setCorsHeaders = (res: NextApiResponse, origin?: string) => {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Cache-Control',
    'X-File-Name',
    'X-User-ID',
    'X-Session-ID'
  ].join(', '));
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
};

// 🔧 Enhanced request forwarding with type-safe headers
const forwardToOracle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { path: pathSegments, ...query } = req.query;
  const oraclePath = Array.isArray(pathSegments) ? pathSegments.join('/') : pathSegments || '';
  
  // Build URL with query parameters
  const queryString = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (typeof value === 'string') {
      queryString.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach(v => queryString.append(key, v));
    }
  });
  
  const targetUrl = `${ORACLE_BASE_URL}/${oraclePath}${queryString.toString() ? `?${queryString.toString()}` : ''}`;
  
  // ✅ FIXED: Type-safe header construction
  const forwardHeaders: Record<string, string> = {
    'Content-Type': extractHeaderValue(req.headers['content-type']) || 'application/json',
    'Accept': 'application/json',
    'User-Agent': 'Macrobius-Proxy/2.1',
    'X-Forwarded-For': extractHeaderValue(req.headers['x-forwarded-for']) || req.socket?.remoteAddress || 'unknown',
    'X-Forwarded-Proto': extractHeaderValue(req.headers['x-forwarded-proto']) || 'https',
    'X-Original-Host': extractHeaderValue(req.headers.host) || 'unknown',
  };
  
  // Add authorization if present
  const authHeader = extractHeaderValue(req.headers.authorization);
  if (authHeader && authHeader !== 'unknown') {
    forwardHeaders['Authorization'] = authHeader;
  }
  
  // Prepare request options
  const requestOptions: RequestInit = {
    method: req.method,
    headers: forwardHeaders,
  };
  
  // Add body for POST, PUT, PATCH requests
  if (req.method && ['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
    requestOptions.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
  }
  
  try {
    console.log(`[Oracle Proxy] ${req.method} ${targetUrl}`);
    
    // ✅ FIXED: Use fetchWithTimeout instead of fetch with timeout property
    const response = await fetchWithTimeout(targetUrl, requestOptions, 30000);
    
    // Forward response status
    res.status(response.status);
    
    // Forward response headers
    const contentType = response.headers.get('content-type') || 'application/json';
    res.setHeader('Content-Type', contentType);
    
    // Handle different response types
    if (contentType.includes('application/json')) {
      const jsonData = await response.json();
      console.log(`[Oracle Proxy] Success: ${response.status}`);
      res.json(jsonData);
    } else {
      const textData = await response.text();
      console.log(`[Oracle Proxy] Success (text): ${response.status}`);
      res.send(textData);
    }
    
  } catch (error: any) {
    console.error('[Oracle Proxy] Error:', error.message);
    
    // Enhanced error response with fallback information
    const errorResponse = {
      error: 'Oracle Cloud connection failed',
      message: error.message || 'Unknown error occurred',
      code: 'ORACLE_CONNECTION_ERROR',
      timestamp: new Date().toISOString(),
      path: oraclePath,
      fallback: {
        available: true,
        message: 'Local content available while Oracle Cloud is offline',
        features: ['Static content', 'Cached data', 'Basic functionality']
      }
    };
    
    res.status(503).json(errorResponse);
  }
};

// 🎯 Main API handler with comprehensive CORS and error handling
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const origin = extractHeaderValue(req.headers.origin);
  
  // Set CORS headers for all requests
  setCorsHeaders(res, origin);
  
  // Handle preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    console.log('[Oracle Proxy] Preflight request handled');
    res.status(200).end();
    return;
  }
  
  // Health check endpoint
  if (req.query.path === 'health') {
    console.log('[Oracle Proxy] Health check requested');
    try {
      // ✅ FIXED: Use fetchWithTimeout for health check
      const response = await fetchWithTimeout(`${ORACLE_BASE_URL}/health`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      }, 10000);
      
      if (response.ok) {
        const data = await response.json();
        res.status(200).json({
          status: 'connected',
          oracle: 'available',
          timestamp: new Date().toISOString(),
          data: data
        });
      } else {
        throw new Error(`Oracle returned ${response.status}`);
      }
    } catch (error: any) {
      console.error('[Oracle Proxy] Health check failed:', error.message);
      res.status(503).json({
        status: 'disconnected',
        oracle: 'unavailable',
        error: error.message,
        timestamp: new Date().toISOString(),
        fallback: 'Local mode available'
      });
    }
    return;
  }
  
  // Forward all other requests to Oracle Cloud
  await forwardToOracle(req, res);
}

// 🔧 Export configuration for Next.js
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
    responseLimit: '50mb',
  },
};