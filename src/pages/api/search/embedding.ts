import type { NextApiRequest, NextApiResponse } from 'next';

interface EmbeddingRequest {
  text: string | string[];
  model?: 'multilingual' | 'latin-specialized' | 'cross-lingual';
  normalize?: boolean;
  includeMetadata?: boolean;
  language?: 'DE' | 'EN' | 'LA' | 'auto';
}

interface EmbeddingResponse {
  status: 'success' | 'error';
  data?: {
    embeddings: number[][];
    input_texts: string[];
    metadata: {
      model_used: string;
      embedding_dimension: number;
      processing_time_ms: number;
      language_detected?: string[];
      is_normalized: boolean;
      oracle_cloud_status: 'connected' | 'fallback';
    };
  };
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EmbeddingResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      status: 'error', 
      message: 'Method not allowed. Use POST for embedding generation.' 
    });
  }

  const startTime = performance.now();
  const { 
    text, 
    model = 'multilingual',
    normalize = true,
    includeMetadata = false,
    language = 'auto'
  } = req.body as EmbeddingRequest;

  // Validate input
  if (!text || (typeof text !== 'string' && !Array.isArray(text))) {
    return res.status(400).json({
      status: 'error',
      message: 'Text is required and must be a string or array of strings'
    });
  }

  const inputTexts = Array.isArray(text) ? text : [text];
  
  if (inputTexts.length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'At least one text input is required'
    });
  }

  if (inputTexts.length > 100) {
    return res.status(400).json({
      status: 'error',
      message: 'Maximum 100 texts can be processed at once'
    });
  }

  // Validate text lengths
  const maxLength = 8000; // characters
  const invalidTexts = inputTexts.filter(t => typeof t !== 'string' || t.length > maxLength);
  if (invalidTexts.length > 0) {
    return res.status(400).json({
      status: 'error',
      message: `All texts must be strings with max ${maxLength} characters`
    });
  }

  if (!['multilingual', 'latin-specialized', 'cross-lingual'].includes(model)) {
    return res.status(400).json({
      status: 'error',
      message: 'Model must be one of: multilingual, latin-specialized, cross-lingual'
    });
  }

  try {
    // Connect to Oracle Cloud backend for embedding generation
    const oracleEndpoint = process.env.ORACLE_CLOUD_ENDPOINT || 'http://152.70.184.232:8080';
    
    const response = await fetch(`${oracleEndpoint}/api/search/embedding`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Client-Version': '2.0',
        'X-Request-Source': 'macrobius-frontend',
        'X-Embedding-Model': model
      },
      body: JSON.stringify({
        text: inputTexts,
        model,
        normalize,
        include_metadata: includeMetadata,
        language
      }),
      signal: AbortSignal.timeout(60000) // 60 second timeout for batch embedding
    });

    if (response.ok) {
      const oracleData = await response.json();
      const processingTime = performance.now() - startTime;
      
      return res.status(200).json({
        status: 'success',
        data: {
          embeddings: oracleData.embeddings || [],
          input_texts: inputTexts,
          metadata: {
            model_used: oracleData.model_used || model,
            embedding_dimension: oracleData.embedding_dimension || 768,
            processing_time_ms: Math.round(processingTime),
            language_detected: oracleData.language_detected,
            is_normalized: normalize,
            oracle_cloud_status: 'connected' as const
          }
        }
      });
    } else {
      throw new Error(`Oracle Cloud responded with status ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Oracle Cloud embedding generation failed:', error);
    
    // Generate fallback embeddings using simple hashing and semantic analysis
    const fallbackEmbeddings = generateFallbackEmbeddings(inputTexts, model, normalize);
    const processingTime = performance.now() - startTime;
    
    return res.status(200).json({
      status: 'success',
      data: {
        embeddings: fallbackEmbeddings,
        input_texts: inputTexts,
        metadata: {
          model_used: `fallback-${model}`,
          embedding_dimension: 384, // Smaller dimension for fallback
          processing_time_ms: Math.round(processingTime),
          language_detected: inputTexts.map(text => detectLanguageFallback(text)),
          is_normalized: normalize,
          oracle_cloud_status: 'fallback' as const
        }
      }
    });
  }
}

function generateFallbackEmbeddings(texts: string[], model: string, normalize: boolean): number[][] {
  const embeddingDimension = 384;
  const embeddings: number[][] = [];
  
  texts.forEach(text => {
    const embedding = new Array(embeddingDimension).fill(0);
    
    // Simple feature extraction based on text characteristics
    const words = text.toLowerCase().split(/\s+/);
    const chars = text.toLowerCase();
    
    // Length features
    embedding[0] = Math.min(text.length / 1000, 1.0); // Normalized length
    embedding[1] = Math.min(words.length / 100, 1.0); // Normalized word count
    
    // Language features (Latin characteristics)
    embedding[2] = (chars.match(/[aeiou]/g) || []).length / chars.length; // Vowel ratio
    embedding[3] = (chars.match(/[bcdfghjklmnpqrstvwxyz]/g) || []).length / chars.length; // Consonant ratio
    embedding[4] = (text.match(/um\b|us\b|ae\b|is\b/g) || []).length / words.length; // Latin endings
    
    // Content features based on key concepts
    const conceptMap = {
      dreams: ['somni', 'dream', 'traum', 'vision', 'prophetic'],
      philosophy: ['sapient', 'philosoph', 'wisdom', 'virtue', 'truth'],
      religion: ['deus', 'divine', 'sacred', 'ritual', 'worship'],
      astronomy: ['stellar', 'cosmic', 'sphere', 'harmony', 'celestial'],
      social: ['convivi', 'banquet', 'social', 'custom', 'tradition']
    };
    
    let conceptIndex = 5;
    Object.entries(conceptMap).forEach(([concept, keywords]) => {
      const score = keywords.reduce((sum, keyword) => {
        return sum + (text.toLowerCase().includes(keyword) ? 1 : 0);
      }, 0) / keywords.length;
      embedding[conceptIndex++] = score;
    });
    
    // Character n-gram features for better text representation
    for (let i = 0; i < Math.min(chars.length - 2, 50); i++) {
      const trigram = chars.substr(i, 3);
      const hash = simpleHash(trigram) % (embeddingDimension - conceptIndex);
      if (hash >= 0) {
        embedding[conceptIndex + hash] += 0.1;
      }
    }
    
    // Word-level features
    words.forEach((word, index) => {
      if (word.length > 2 && index < 20) { // Process first 20 meaningful words
        const hash = simpleHash(word) % 100;
        const targetIndex = conceptIndex + 100 + hash;
        if (targetIndex < embeddingDimension) {
          embedding[targetIndex] += 1.0 / words.length;
        }
      }
    });
    
    // Add some random variation to prevent identical embeddings
    for (let i = embeddingDimension - 50; i < embeddingDimension; i++) {
      embedding[i] = (Math.random() - 0.5) * 0.1;
    }
    
    // Normalize if requested
    if (normalize) {
      const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
      if (magnitude > 0) {
        for (let i = 0; i < embedding.length; i++) {
          embedding[i] = embedding[i] / magnitude;
        }
      }
    }
    
    embeddings.push(embedding);
  });
  
  return embeddings;
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

function detectLanguageFallback(text: string): string {
  const textLower = text.toLowerCase();
  
  // Simple language detection based on characteristic patterns
  const latinIndicators = /\b(est|sunt|cum|sed|vel|aut|que|us\b|um\b|ae\b|is\b)\b/g;
  const germanIndicators = /\b(und|oder|aber|mit|von|der|die|das|ein|eine)\b/g;
  const englishIndicators = /\b(the|and|or|but|with|from|this|that|is|are)\b/g;
  
  const latinMatches = (textLower.match(latinIndicators) || []).length;
  const germanMatches = (textLower.match(germanIndicators) || []).length;
  const englishMatches = (textLower.match(englishIndicators) || []).length;
  
  if (latinMatches > germanMatches && latinMatches > englishMatches) {
    return 'LA';
  } else if (germanMatches > englishMatches) {
    return 'DE';
  } else {
    return 'EN';
  }
}